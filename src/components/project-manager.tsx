import { useEffect, useState } from 'react';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Download, Trash2, Pencil, Plus, Upload, X } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { catalogOptions, documentsOptions } from '@/lib/project-query';
import { saveProject, deleteProject, registerDocument, deleteDocument } from '@/lib/projects.functions';
import { validateDocument, type CatalogProject, type ProjectInput } from '@/lib/project-management';
import { deliverFile } from '@/lib/file-download';
import type { Database } from '@/integrations/supabase/types';

type DocumentRow = Database['public']['Tables']['project_documents']['Row'];
function DocumentItem({ file, busy, onDelete }: { file: DocumentRow; busy: boolean; onDelete: () => void }) {
  const [ready, setReady] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true; setReady(null); setError(false);
    void supabase.storage.from('project-documents').download(file.path).then(({ data, error }) => {
      if (!active) return;
      if (error || !data?.size) { setError(true); return; }
      setReady(new File([data], file.name, { type: file.mime }));
    });
    return () => { active = false; };
  }, [file.path, file.name, file.mime, retry]);
  return <div className="flex flex-wrap items-center justify-between gap-3 border-b py-3">
    <div className="min-w-0"><p className="break-words font-medium">{file.name}</p><p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p></div>
    <div className="flex gap-2"><Button type="button" variant="outline" size="sm" disabled={!ready} onClick={() => { if (ready) void deliverFile(ready); }}><Download />{ready ? 'تنزيل الملف' : error ? 'تعذر التجهيز' : 'جارٍ التجهيز…'}</Button>{error && <Button type="button" size="sm" variant="outline" onClick={() => setRetry(r => r + 1)}>إعادة المحاولة</Button>}<Button type="button" variant="destructive" size="icon" title={`حذف ${file.name}`} aria-label={`حذف ${file.name}`} disabled={busy} onClick={onDelete}><Trash2 /></Button></div>
  </div>;
}
const blank: ProjectInput = { title: '', department: '', people: '', year: String(new Date().getFullYear()), semester: '', summary: '' };
export function ProjectManager() {
  const { data: projects } = useSuspenseQuery(catalogOptions);
  const { data: documents } = useSuspenseQuery(documentsOptions);
  const client = useQueryClient();
  const save = useServerFn(saveProject), remove = useServerFn(deleteProject), attach = useServerFn(registerDocument), removeFile = useServerFn(deleteDocument);
  const [editing, setEditing] = useState<ProjectInput | null>(null);
  const [selected, setSelected] = useState<CatalogProject | null>(null);
  const [busy, setBusy] = useState(false), [notice, setNotice] = useState(''), [query, setQuery] = useState(''), [department, setDepartment] = useState('');
  const refresh = async () => { await Promise.all([client.invalidateQueries({ queryKey: catalogOptions.queryKey }), client.invalidateQueries({ queryKey: documentsOptions.queryKey })]); };
  const run = async (action: () => Promise<void>) => {
    if (busy) return; setBusy(true); setNotice('');
    try { await action(); await refresh(); }
    catch (e) { setNotice(e instanceof Error ? e.message : 'تعذر تنفيذ العملية.'); }
    finally { setBusy(false); }
  };
  const exportProject = (project: CatalogProject) => void deliverFile(new File([JSON.stringify(project, null, 2)], `project-${project.id}.json`, { type: 'application/json' }));
  return <section className="mt-10 border-t pt-6" aria-label="إدارة المشاريع والملفات">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-bold">إدارة المشاريع والملفات</h2><Button type="button" onClick={() => { setEditing({ ...blank }); setSelected(null); }} disabled={busy}><Plus />إضافة مشروع</Button></div>
    <div className="mt-5 flex flex-wrap gap-3"><input aria-label="البحث في المشاريع" type="search" className="min-w-0 flex-1 rounded-md border bg-card px-3 py-2" placeholder="البحث في المشاريع" value={query} onChange={e => setQuery(e.target.value)} /><select aria-label="تصفية المشاريع حسب القسم" className="max-w-full rounded-md border bg-card px-3 py-2" value={department} onChange={e => setDepartment(e.target.value)}><option value="">جميع الأقسام</option>{[...new Set(projects.map(p => p.department))].sort().map(d => <option key={d}>{d}</option>)}</select></div>
    {notice && <p className="my-4" role="status">{notice}</p>}
    {editing && <form className="my-6 grid gap-4 border-y py-6 sm:grid-cols-2" onSubmit={e => { e.preventDefault(); void run(async () => { const saved = await save({ data: editing }); setEditing(null); setSelected(saved); setNotice('تم حفظ المشروع.'); }); }}>
      <h3 className="text-xl font-bold sm:col-span-2">{editing.id ? 'تعديل المشروع' : 'مشروع جديد'}</h3>
      {([['title', 'عنوان المشروع'], ['department', 'قسم المشروع'], ['people', 'الطلاب — إشراف: اسم المشرف'], ['year', 'سنة المشروع']] as const).map(([key, label]) => <label key={key} className="min-w-0">{label}<input aria-label={label} required={key !== 'people'} maxLength={key === 'title' ? 300 : key === 'people' ? 500 : key === 'year' ? 4 : 120} pattern={key === 'year' ? '[0-9]{4}' : undefined} className="mt-2 w-full rounded-md border bg-card px-3 py-2" value={editing[key]} onChange={e => setEditing({ ...editing, [key]: e.target.value })} /></label>)}
      <label>الفصل<select className="mt-2 w-full rounded-md border bg-card px-3 py-2" value={editing.semester} onChange={e => setEditing({ ...editing, semester: e.target.value })}><option value="">غير محدد</option>{['فصل الخريف', 'فصل الربيع', 'الفصل الصيفي'].map(s => <option key={s}>{s}</option>)}</select></label>
      <label className="sm:col-span-2">ملخص المشروع<textarea aria-label="ملخص المشروع" rows={4} maxLength={5000} className="mt-2 w-full rounded-md border bg-card px-3 py-2" value={editing.summary} onChange={e => setEditing({ ...editing, summary: e.target.value })} /></label>
      <div className="flex gap-3 sm:col-span-2"><Button disabled={busy}>حفظ المشروع</Button><Button type="button" variant="outline" disabled={busy} onClick={() => setEditing(null)}><X />إلغاء</Button></div>
    </form>}
    {selected && <div className="my-6 border-y py-5">
      <div className="flex flex-wrap justify-between gap-3"><h3 className="min-w-0 break-words text-xl font-bold">ملفات: {selected.title}</h3><Button type="button" size="icon" variant="ghost" title="إغلاق الملفات" aria-label="إغلاق الملفات" onClick={() => setSelected(null)}><X /></Button></div>
      <label className="my-4 block">إضافة ملف PDF أو Excel<input aria-label="إضافة ملف PDF أو Excel" type="file" accept=".pdf,.xls,.xlsx" disabled={busy} className="mt-2 block max-w-full text-sm" onChange={e => {
        const file = e.target.files?.[0]; e.target.value = ''; if (!file) return;
        void run(async () => {
          const { extension, mime } = validateDocument(file.name, file.size);
          const { data } = await supabase.auth.getUser(); if (!data.user) throw new Error('سجّل الدخول مجدداً.');
          const { id: _id, deleted: _deleted, ...values } = selected;
          await save({ data: { ...values, id: selected.id } });
          const path = `${data.user.id}/${selected.id}/${crypto.randomUUID()}.${extension}`;
          const { error } = await supabase.storage.from('project-documents').upload(path, file, { contentType: mime });
          if (error) throw new Error('تعذر رفع الملف. حاول مجدداً.');
          try { await attach({ data: { project_id: selected.id, path, name: file.name, size: file.size } }); }
          catch (error) { await supabase.storage.from('project-documents').remove([path]); throw error; }
          setNotice('تم رفع الملف.');
        });
      }} /></label>
      {documents.filter(f => f.project_id === selected.id).map(file => <DocumentItem key={file.id} file={file} busy={busy} onDelete={() => { if (window.confirm(`حذف الملف «${file.name}» نهائياً؟`)) void run(async () => { await removeFile({ data: { id: file.id } }); setNotice('تم حذف الملف.'); }); }} />)}
      {!documents.some(f => f.project_id === selected.id) && <p className="text-muted-foreground">لا توجد ملفات لهذا المشروع.</p>}
    </div>}
    <div className="mt-6 divide-y">{projects.filter(p => (!department || p.department === department) && `${p.title} ${p.people} ${p.department}`.includes(query.trim())).map(p => <article key={p.id} className="flex flex-wrap items-start justify-between gap-4 py-5"><div className="min-w-0 flex-1"><p className="text-sm text-muted-foreground">{p.department} · {p.year}</p><h3 className="mt-1 break-words text-lg font-bold">{p.title}</h3><p className="mt-2 break-words text-sm text-muted-foreground">{p.people}</p></div><div className="flex flex-wrap gap-2"><Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => { setSelected(p); setEditing(null); }}><Upload />الملفات ({documents.filter(f => f.project_id === p.id).length})</Button><Button type="button" variant="outline" size="icon" title="تعديل المشروع" aria-label={`تعديل ${p.title}`} disabled={busy} onClick={() => { setEditing(p); setSelected(null); }}><Pencil /></Button><Button type="button" variant="outline" size="icon" title="تنزيل بيانات المشروع" aria-label={`تنزيل ${p.title}`} onClick={() => exportProject(p)}><Download /></Button><Button type="button" variant="destructive" size="icon" title="حذف المشروع" aria-label={`حذف المشروع ${p.title}`} disabled={busy} onClick={() => { if (window.confirm(`حذف المشروع «${p.title}» وجميع ملفاته نهائياً؟`)) void run(async () => { await remove({ data: { id: p.id } }); if (selected?.id === p.id) setSelected(null); setNotice('تم حذف المشروع وملفاته.'); }); }}><Trash2 /></Button></div></article>)}</div>
    {!projects.length && <p className="mt-6 text-muted-foreground">لا توجد مشاريع حالياً.</p>}
  </section>;
}