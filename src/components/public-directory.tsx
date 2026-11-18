import { useQuery } from '@tanstack/react-query';
import { Download } from 'lucide-react';
import { graduatesOptions, siteFilesOptions } from '@/lib/admin-query';
import { useState } from 'react';

export function GraduatesDirectory() {
  const { data = [] } = useQuery(graduatesOptions);
  const [q, setQ] = useState(''), [dept, setDept] = useState('');
  if (!data.length) return null;
  const shown = data.filter(g => (!dept || g.department === dept) && `${g.full_name} ${g.project_title} ${g.graduation_year}`.includes(q.trim()));
  return <section className="mx-auto max-w-6xl px-4 py-12" aria-label="سجل الخريجين">
    <h2 className="text-2xl font-bold">سجل الخريجين</h2>
    <div className="sticky top-16 z-10 mt-4 grid gap-2 bg-background/95 py-2 sm:grid-cols-[1fr_auto]">
      <input type="search" aria-label="ابحث في سجل الخريجين" placeholder="ابحث بالاسم أو المشروع أو السنة" className="min-w-0 rounded-md border bg-card px-3 py-2" value={q} onChange={e => setQ(e.target.value)} />
      <select aria-label="القسم" className="rounded-md border bg-card px-3 py-2" value={dept} onChange={e => setDept(e.target.value)}><option value="">جميع الأقسام</option>{[...new Set(data.map(g => g.department).filter(Boolean))].sort().map(d => <option key={d}>{d}</option>)}</select>
    </div>
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{shown.map(g => <article key={g.id} className="rounded-xl border bg-card p-4"><p className="font-bold">{g.full_name}</p><p className="text-sm text-muted-foreground">{g.department}{g.graduation_year && ` · ${g.graduation_year}`}</p>{g.project_title && <p className="mt-2 text-sm">{g.project_title}</p>}</article>)}</div>
    {!shown.length && <p className="mt-4 text-muted-foreground">لا توجد نتائج.</p>}
  </section>;
}

export function PublicDownloads() {
  const { data = [] } = useQuery(siteFilesOptions);
  if (!data.length) return null;
  return <section className="mx-auto max-w-6xl px-4 py-12" aria-label="ملفات للتحميل">
    <h2 className="text-2xl font-bold">ملفات للتحميل</h2>
    <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{data.map(f => <li key={f.id}><a href={`/api/public/files/${f.id}`} download={f.name} className="flex items-center gap-3 rounded-xl border bg-card p-4 transition hover:border-primary"><Download className="h-5 w-5 shrink-0 text-primary" /><span className="min-w-0 break-words">{f.name}</span></a></li>)}</ul>
  </section>;
}
