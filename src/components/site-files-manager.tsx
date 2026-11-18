import { useState } from 'react';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Download, Star, Trash2, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { siteFilesOptions } from '@/lib/admin-query';
import { registerSiteFile, deleteSiteFile, setGuideFile } from '@/lib/admin.functions';
import { validateSiteFile } from '@/lib/graduates';

const mimeFor = (ext: string) => ext === 'pdf' ? 'application/pdf' : ext === 'xls' ? 'application/vnd.ms-excel' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export function SiteFilesManager() {
  const { data: files } = useSuspenseQuery(siteFilesOptions);
  const client = useQueryClient();
  const register = useServerFn(registerSiteFile), remove = useServerFn(deleteSiteFile), setGuide = useServerFn(setGuideFile);
  const [busy, setBusy] = useState(false), [notice, setNotice] = useState('');
  const run = async (action: () => Promise<string>) => {
    if (busy) return; setBusy(true); setNotice('');
    try { setNotice(await action()); await client.invalidateQueries({ queryKey: siteFilesOptions.queryKey }); }
    catch (e) { setNotice(e instanceof Error ? e.message : 'تعذر تنفيذ العملية.'); }
    finally { setBusy(false); }
  };
  const upload = (file: File) => run(async () => {
    const problem = validateSiteFile(file); if (problem) throw new Error(problem);
    const ext = file.name.split('.').pop()!.toLowerCase();
    const { data } = await supabase.auth.getUser(); if (!data.user) throw new Error('سجّل الدخول مجدداً.');
    const path = `${data.user.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('public-files').upload(path, file, { contentType: mimeFor(ext) });
    if (error) throw new Error('تعذر رفع الملف.');
    try { await register({ data: { name: file.name, path, size: file.size, mime: mimeFor(ext) } }); }
    catch (e) { await supabase.storage.from('public-files').remove([path]); throw e; }
    return 'تم رفع الملف.';
  });
  return <section aria-label="الملفات العامة">
    <h2 className="text-2xl font-bold">الملفات العامة (PDF وExcel)</h2>
    <p className="mt-2 text-sm text-muted-foreground">ملفات يمكن للزوار تحميلها. اختر ملف PDF كـ«دليل المنصة» ليصبح زر التحميل في الرئيسية.</p>
    <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-md border bg-card px-4 py-2 font-medium">
      <Upload className="h-4 w-4" />رفع ملف PDF أو Excel
      <input type="file" accept=".pdf,.xls,.xlsx" className="sr-only" disabled={busy} onChange={e => { const f = e.target.files?.[0]; e.target.value = ''; if (f) void upload(f); }} />
    </label>
    {notice && <p role="status" className="mt-3 text-sm">{notice}</p>}
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {files.map(f => <li key={f.id} className="rounded-xl border bg-card p-4">
        <p className="break-words font-medium">{f.name}</p>
        <p className="mt-1 text-xs text-muted-foreground">{(f.size / 1024).toFixed(1)} KB {f.is_guide && <span className="ms-2 rounded-full bg-gold px-2 py-0.5 text-gold-foreground">دليل المنصة</span>}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button asChild size="sm" variant="outline"><a href={`/api/public/files/${f.id}`} download={f.name}><Download />تنزيل</a></Button>
          {f.name.toLowerCase().endsWith('.pdf') && <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => void run(async () => { await setGuide({ data: { id: f.is_guide ? null : f.id } }); return f.is_guide ? 'تم إلغاء الدليل.' : 'تم تعيين دليل المنصة.'; })}><Star />{f.is_guide ? 'إلغاء كدليل' : 'تعيين كدليل'}</Button>}
          <Button type="button" size="sm" variant="destructive" disabled={busy} onClick={() => { if (window.confirm(`حذف «${f.name}» نهائياً؟`)) void run(async () => { await remove({ data: { id: f.id } }); return 'تم حذف الملف.'; }); }}><Trash2 />حذف</Button>
        </div>
      </li>)}
    </ul>
    {!files.length && <p className="mt-6 text-muted-foreground">لا توجد ملفات مرفوعة بعد.</p>}
  </section>;
}
