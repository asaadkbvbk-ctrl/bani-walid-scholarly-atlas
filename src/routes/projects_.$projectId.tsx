import { createFileRoute, Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { catalogOptions } from '@/lib/project-query';
import { ProjectContent } from '@/components/project-catalog';
export const Route = createFileRoute('/projects_/$projectId')({
  staticData: { importedDocument: { html: { dir: 'rtl', lang: 'ar' } } },
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogOptions),
  head: ({ loaderData, params }) => {
    const project = loaderData?.find(p => p.id === params.projectId);
    const title = `${project?.title ?? 'المشروع غير متاح'} | كلية التربية - جامعة بني وليد`;
    const description = project?.summary || 'تفاصيل مشاريع التخرج بكلية التربية جامعة بني وليد.';
    return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'article' }, { name: 'twitter:card', content: 'summary' }] };
  },
  component: Project,
});
function Project() {
  const { data } = useSuspenseQuery(catalogOptions);
  const { projectId } = Route.useParams();
  return <><header className="border-b"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4"><Link to="/" className="flex items-center gap-3"><img src="/site-assets/d0f6360e35312736.png" className="h-12 w-auto" alt="شعار كلية التربية" /><span className="font-bold">كلية التربية · جامعة بني وليد</span></Link><nav className="flex gap-4"><Link to="/students">مشاريع التخرج</Link><Link to="/admin">لوحة التحكم</Link></nav></div></header><main className="min-h-screen"><ProjectContent project={data.find(p => p.id === projectId)} /></main></>;
}