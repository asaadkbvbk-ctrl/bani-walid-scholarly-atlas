CREATE TABLE public.profiles (
 id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 display_name text NOT NULL DEFAULT '',
 department text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TYPE public.app_role AS ENUM ('admin', 'supervisor');
CREATE TABLE public.user_roles (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 role public.app_role NOT NULL,
 UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
 SELECT _user_id = auth.uid() AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
CREATE FUNCTION public.create_user_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 INSERT INTO public.profiles(id, display_name, department) VALUES (NEW.id, left(coalesce(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', ''), 120), left(coalesce(NEW.raw_user_meta_data->>'department', ''), 120));
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.create_user_profile() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER create_profile_after_signup AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_user_profile();
INSERT INTO public.profiles(id, display_name) SELECT id, left(coalesce(raw_user_meta_data->>'display_name', raw_user_meta_data->>'full_name', ''),120) FROM auth.users ON CONFLICT (id) DO NOTHING;