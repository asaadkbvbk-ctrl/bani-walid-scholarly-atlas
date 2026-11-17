CREATE TABLE public.graduates (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 160),
 department text NOT NULL DEFAULT '' CHECK (char_length(department) <= 120),
 graduation_year text NOT NULL DEFAULT '' CHECK (char_length(graduation_year) <= 10),
 project_title text NOT NULL DEFAULT '' CHECK (char_length(project_title) <= 300),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.graduates TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.graduates TO authenticated;
GRANT ALL ON public.graduates TO service_role;
ALTER TABLE public.graduates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read graduates" ON public.graduates FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Supervisors manage graduates" ON public.graduates FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.site_files (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
 path text NOT NULL UNIQUE,
 size bigint NOT NULL DEFAULT 0,
 mime text NOT NULL DEFAULT '',
 is_guide boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX site_files_single_guide ON public.site_files (is_guide) WHERE is_guide;
GRANT SELECT ON public.site_files TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_files TO authenticated;
GRANT ALL ON public.site_files TO service_role;
ALTER TABLE public.site_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read site files" ON public.site_files FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Supervisors manage site files" ON public.site_files FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone downloads public files" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'public-files');
CREATE POLICY "Supervisors upload public files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'public-files' AND lower(storage.extension(name)) IN ('pdf','xls','xlsx') AND (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Supervisors delete public files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'public-files' AND (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin')));

CREATE OR REPLACE FUNCTION public.create_user_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _pos text := CASE WHEN NEW.raw_user_meta_data->>'supervisor_position' = 'second' THEN 'second' ELSE 'first' END;
BEGIN
 INSERT INTO public.profiles(id, display_name, department) VALUES (NEW.id, left(coalesce(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', ''), 120), left(coalesce(NEW.raw_user_meta_data->>'department', ''), 120));
 INSERT INTO public.user_roles(user_id, role, supervisor_position) VALUES (NEW.id, 'supervisor', _pos) ON CONFLICT (user_id, role) DO NOTHING;
 IF _pos = 'first' THEN
  PERFORM pg_advisory_xact_lock(hashtext('bootstrap_admin'));
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
   INSERT INTO public.user_roles(user_id, role, supervisor_position) VALUES (NEW.id, 'admin', 'first') ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
 END IF;
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.create_user_profile() FROM PUBLIC, anon, authenticated;

INSERT INTO public.user_roles(user_id, role, supervisor_position)
SELECT r.user_id, 'admin', 'first' FROM public.user_roles r JOIN auth.users u ON u.id = r.user_id
WHERE r.role = 'supervisor' AND r.supervisor_position = 'first' AND NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
ORDER BY u.created_at LIMIT 1 ON CONFLICT (user_id, role) DO NOTHING;

CREATE FUNCTION public.list_supervisors() RETURNS TABLE(user_id uuid, email text, display_name text, supervisor_position text, is_admin boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Administrator access required'; END IF;
 RETURN QUERY SELECT u.id, u.email::text, coalesce(p.display_name, ''), coalesce(s.supervisor_position, 'first'), EXISTS (SELECT 1 FROM public.user_roles a WHERE a.user_id = u.id AND a.role = 'admin')
 FROM auth.users u LEFT JOIN public.profiles p ON p.id = u.id LEFT JOIN public.user_roles s ON s.user_id = u.id AND s.role = 'supervisor'
 WHERE EXISTS (SELECT 1 FROM public.user_roles x WHERE x.user_id = u.id) ORDER BY u.created_at;
END; $$;

CREATE FUNCTION public.set_supervisor_admin(_user_id uuid, _grant boolean) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Administrator access required'; END IF;
 IF _user_id = auth.uid() AND NOT _grant THEN RAISE EXCEPTION 'You cannot remove your own administrator access'; END IF;
 IF _grant THEN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'supervisor') THEN RAISE EXCEPTION 'Supervisor not found'; END IF;
  INSERT INTO public.user_roles(user_id, role, supervisor_position) VALUES (_user_id, 'admin', 'first') ON CONFLICT (user_id, role) DO NOTHING;
  UPDATE public.user_roles SET supervisor_position = 'first' WHERE user_id = _user_id;
 ELSE
  DELETE FROM public.user_roles WHERE user_id = _user_id AND role = 'admin';
  UPDATE public.user_roles SET supervisor_position = 'second' WHERE user_id = _user_id;
 END IF;
END; $$;

CREATE FUNCTION public.remove_supervisor(_user_id uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Administrator access required'; END IF;
 IF _user_id = auth.uid() THEN RAISE EXCEPTION 'You cannot remove yourself'; END IF;
 DELETE FROM public.user_roles WHERE user_id = _user_id;
END; $$;

REVOKE ALL ON FUNCTION public.list_supervisors() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.set_supervisor_admin(uuid, boolean) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.remove_supervisor(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.list_supervisors() TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_supervisor_admin(uuid, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.remove_supervisor(uuid) TO authenticated;