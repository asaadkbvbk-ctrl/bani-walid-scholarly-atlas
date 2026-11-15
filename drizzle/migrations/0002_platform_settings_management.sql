CREATE TABLE public.platform_settings (
 id text PRIMARY KEY DEFAULT 'main' CHECK(id='main'),
 platform_name text NOT NULL DEFAULT 'منظومة مشاريع التخرج والخريجين',
 college_name text NOT NULL DEFAULT 'كلية التربية',
 university_name text NOT NULL DEFAULT 'جامعة بني وليد',
 welcome_text text NOT NULL DEFAULT 'مرحبًا بكم في منظومة بيانات الخريجين ومشاريع التخرج',
 introduction text NOT NULL DEFAULT 'منصة تجمع الخبرات، وتحفظ الإنجازات، وتفتح آفاقًا جديدة للتواصل والمعرفة.',
 author_name text NOT NULL DEFAULT 'آية الأمين البوسيفي',
 supervisor_name text NOT NULL DEFAULT 'أ. تجديده الحوسين الهادي',
 location text NOT NULL DEFAULT 'بني وليد - ليبيا',
 guide_url text NOT NULL DEFAULT '/downloads/graduation-projects-guide.pdf',
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.platform_settings TO anon,authenticated;
GRANT INSERT,UPDATE ON public.platform_settings TO authenticated;
GRANT ALL ON public.platform_settings TO service_role;
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public platform settings" ON public.platform_settings FOR SELECT TO anon,authenticated USING(true);
CREATE POLICY "Administrators create platform settings" ON public.platform_settings FOR INSERT TO authenticated WITH CHECK(public.has_role(auth.uid(),'admin'));
CREATE POLICY "Administrators update platform settings" ON public.platform_settings FOR UPDATE TO authenticated USING(public.has_role(auth.uid(),'admin')) WITH CHECK(public.has_role(auth.uid(),'admin'));