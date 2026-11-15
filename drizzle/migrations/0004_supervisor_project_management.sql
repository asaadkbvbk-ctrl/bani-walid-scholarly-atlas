CREATE TABLE public.managed_projects (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL DEFAULT '', department text NOT NULL DEFAULT '', people text NOT NULL DEFAULT '', year text NOT NULL DEFAULT '', semester text NOT NULL DEFAULT '', summary text NOT NULL DEFAULT '', deleted boolean NOT NULL DEFAULT false, updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.managed_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.managed_projects TO authenticated;
GRANT ALL ON public.managed_projects TO service_role;
ALTER TABLE public.managed_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read project catalog" ON public.managed_projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Supervisors organize projects" ON public.managed_projects FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin'));
CREATE TABLE public.project_documents (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), project_id uuid REFERENCES public.managed_projects(id) NOT NULL, name text NOT NULL, path text UNIQUE NOT NULL, size bigint NOT NULL DEFAULT 0, mime text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_documents TO authenticated;
GRANT ALL ON public.project_documents TO service_role;
ALTER TABLE public.project_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Supervisors manage documents" ON public.project_documents FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Supervisors read project files" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'project-documents' AND (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Supervisors upload project files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-documents' AND (storage.foldername(name))[1] = auth.uid()::text AND lower(storage.extension(name)) IN ('pdf', 'xls', 'xlsx') AND (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Supervisors delete project files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-documents' AND (public.has_role(auth.uid(), 'supervisor') OR public.has_role(auth.uid(), 'admin')));