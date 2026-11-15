ALTER TABLE public.user_roles ADD COLUMN supervisor_position text NOT NULL DEFAULT 'first' CHECK (supervisor_position IN ('first', 'second'));
CREATE OR REPLACE FUNCTION public.create_user_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 INSERT INTO public.profiles(id, display_name, department) VALUES (NEW.id, left(coalesce(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', ''), 120), left(coalesce(NEW.raw_user_meta_data->>'department', ''), 120));
 INSERT INTO public.user_roles(user_id, role, supervisor_position) VALUES (NEW.id, 'supervisor', CASE WHEN NEW.raw_user_meta_data->>'supervisor_position' = 'second' THEN 'second' ELSE 'first' END) ON CONFLICT (user_id, role) DO NOTHING;
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.create_user_profile() FROM PUBLIC, anon, authenticated;
INSERT INTO public.user_roles(user_id, role, supervisor_position) SELECT id, 'supervisor', CASE WHEN raw_user_meta_data->>'supervisor_position' = 'second' THEN 'second' ELSE 'first' END FROM auth.users ON CONFLICT (user_id, role) DO NOTHING;
CREATE FUNCTION public.set_supervisor_position(_position text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF auth.uid() IS NULL OR _position IS NULL OR _position NOT IN ('first', 'second') THEN RAISE EXCEPTION 'Invalid supervisor selection'; END IF;
 UPDATE public.user_roles SET supervisor_position = _position WHERE user_id = auth.uid() AND role = 'supervisor';
 IF NOT FOUND THEN RAISE EXCEPTION 'Supervisor access required'; END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.set_supervisor_position(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_supervisor_position(text) TO authenticated;
COMMENT ON COLUMN public.user_roles.supervisor_position IS 'First or second project supervisor; does not change authorization or grant administrator rights.';