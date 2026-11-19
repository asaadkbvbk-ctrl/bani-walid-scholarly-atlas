import { useState } from 'react';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { FileDown, FileUp, Pencil, Plus, Trash2, X } from 'lucide-react';
import { Button } from './ui/button';
import { graduatesOptions } from '@/lib/admin-query';
import { saveGraduate, deleteGraduate, importGraduates } from '@/lib/admin.functions';
import { excelHeaders, parseGraduateRows, type GraduateInput } from '@/lib/graduates';
import { deliverFile } from '@/lib/file-download';

type Editing = GraduateInput & { id?: string };
const blank: Editing = { full_name: '', department: '', graduation_year: String(new Date().getFullYear()), project_title: '' };

async function toXlsx(rows: GraduateInput[], name: string) {
  const XLSX = await import('xlsx');
  const sheet = XLSX.utils.json_to_sheet(rows.map(r => ({ [excelHeaders.full_name]: r.full_name, [excelHeaders.department]: r.department, [excelHeaders.graduation_year]: r.graduation_year, [excelHeaders.project_title]: r.project_title })), { header: Object.values(excelHeaders) });
  const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, 'الخريجون');
  const out = XLSX.write(book, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer;
  deliverFile(new File([out], name, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
}

export function GraduatesManager() {
  const { data: graduates } = useSuspenseQuery(graduatesOptions);
  const client = useQueryClient();
  const save = useServerFn(saveGraduate), remove = useServerFn(deleteGraduate), bulk = useServerFn(importGraduates);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [preview, setPreview] = useState<ReturnType<typeof parseGraduateRows> | null>(null);
  const [busy, setBusy] = useState(false), [notice, setNotice] = useState(''), [query, setQuery] = useState('');
  const run = async (action: () => Promise<string>) => {
    if (busy) return; setBusy(true); setNotice('');
    try { setNotice(await action()); await client.invalidateQueries({ queryKey: graduatesOptions.queryKey }); }
    catch (e) { setNotice(e instanceof Error ? e.message : 'تعذر تنفيذ العملية.'); }
    finally { setBusy(false); }
  };
  const readExcel = async (file: File) => {
    setNotice('');
    try {
      const XLSX = await import('xlsx');
      const book = XLSX.read(await file.arrayBuffer());
      const first = book.Sheets[book.SheetNames[0]!];
      if (!first) throw new Error();
      setPreview(parseGraduateRows(XLSX.utils.sheet_to_json<Record<string, unknown>>(first, { defval: '' })));
    } catch { setNotice('تعذر قراءة ملف Excel. تأكد من أنه ملف .xlsx أو .xls صالح.'); }
  };
  const shown = graduates.filter(g => `${g.full_name} ${g.department} ${g.project_title} ${g.graduation_year}`.includes(query.trim()));
  return <section aria-label="إدارة الخريجين">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-2xl font-bold">الخريجون ({graduates.length})</h2>
      <div className="flex flex-wrap gap-2">
        <Button type="button" disabled={busy} onClick={() => setEditing({ ...blank })}><Plus />إضافة خريج</Button>
        <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium"><FileUp className="h-4 w-4" />استيراد Excel<input type="file" accept=".xlsx,.xls" className="sr-only" onChange={e => { const f = e.target.files?.[0]; e.target.value = ''; if (f) void readExcel(f); }} /></label>
        <Button type="button" variant="outline" disabled={!graduates.length} onClick={() => void toXlsx(graduates, 'الخريجون.xlsx')}><FileDown />تصدير Excel</Button>
        <Button type="button" variant="ghost" onClick={() => void toXlsx([], 'قالب-الخريجين.xlsx')}>تنزيل قالب فارغ</Button>
      </div>
    </div>
    {notice && <p role="status" className="mt-3 text-sm">{notice}</p>}
    {preview && <div className="my-5 rounded-xl border bg-card p-4">
      <p className="font-bold">معاينة الاستيراد: {preview.valid.length} صف صالح، {preview.rejected.length} مرفوض</p>
      {preview.rejected.length > 0 && <ul className="mt-2 max-h-32 overflow-auto text-sm text-destructive">{preview.rejected.map(r => <li key={r.row}>الصف {r.row}: {r.reason}</li>)}</ul>}
      <ul className="mt-2 max-h-40 overflow-auto text-sm text-muted-foreground">{preview.valid.slice(0, 10).map((r, i) => <li key={i}>{r.full_name} — {r.department} {r.graduation_year}</li>)}</ul>
      <div className="mt-3 flex gap-2"><Button type="button" disabled={busy || !preview.valid.length} onClick={() => void run(async () => { const res = await bulk({ data: { rows: preview.valid } }); setPreview(null); return `تم استيراد ${res.count} خريج.`; })}>تأكيد الاستيراد</Button><Button type="button" variant="outline" onClick={() => setPreview(null)}>إلغاء</Button></div>
    </div>}
    {editing && <form className="my-5 grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-2" onSubmit={e => { e.preventDefault(); void run(async () => { await save({ data: editing }); setEditing(null); return 'تم حفظ الخريج.'; }); }}>
      {(Object.keys(excelHeaders) as (keyof GraduateInput)[]).map(k => <label key={k} className="min-w-0 text-sm">{excelHeaders[k]}<input required={k === 'full_name'} maxLength={k === 'project_title' ? 300 : 160} className="mt-1 w-full rounded-md border bg-background px-3 py-2" value={editing[k]} onChange={e => setEditing({ ...editing, [k]: e.target.value })} /></label>)}
      <div className="flex gap-2 sm:col-span-2"><Button disabled={busy}>حفظ</Button><Button type="button" variant="outline" onClick={() => setEditing(null)}><X />إلغاء</Button></div>
    </form>}
    <input type="search" aria-label="البحث في الخريجين" placeholder="ابحث بالاسم أو القسم أو المشروع" className="mt-5 w-full rounded-md border bg-card px-3 py-2" value={query} onChange={e => setQuery(e.target.value)} />
    <div className="mt-4 grid gap-3 md:hidden">{shown.map(g => <article key={g.id} className="rounded-xl border bg-card p-4"><p className="font-bold">{g.full_name}</p><p className="text-sm text-muted-foreground">{g.department} · {g.graduation_year}</p><p className="mt-1 text-sm">{g.project_title}</p><Row g={g} busy={busy} onEdit={() => setEditing(g)} onDelete={() => { if (window.confirm(`حذف ${g.full_name}؟`)) void run(async () => { await remove({ data: { id: g.id } }); return 'تم الحذف.'; }); }} /></article>)}</div>
    <div className="mt-4 overflow-x-auto rounded-xl border max-md:hidden"><table className="w-full text-sm"><thead className="bg-secondary text-right"><tr>{Object.values(excelHeaders).map(h => <th key={h} className="p-3">{h}</th>)}<th className="p-3">إجراءات</th></tr></thead>
      <tbody>{shown.map(g => <tr key={g.id} className="border-t"><td className="p-3 font-medium">{g.full_name}</td><td className="p-3">{g.department}</td><td className="p-3">{g.graduation_year}</td><td className="p-3">{g.project_title}</td><td className="p-3"><Row g={g} busy={busy} onEdit={() => setEditing(g)} onDelete={() => { if (window.confirm(`حذف ${g.full_name}؟`)) void run(async () => { await remove({ data: { id: g.id } }); return 'تم الحذف.'; }); }} /></td></tr>)}</tbody></table></div>
    {!shown.length && <p className="mt-6 text-muted-foreground">لا يوجد خريجون.</p>}
  </section>;
}
function Row({ busy, onEdit, onDelete }: { g: unknown; busy: boolean; onEdit: () => void; onDelete: () => void }) {
  return <div className="mt-2 flex gap-2"><Button type="button" size="sm" variant="outline" disabled={busy} onClick={onEdit}><Pencil />تعديل</Button><Button type="button" size="sm" variant="destructive" disabled={busy} onClick={onDelete}><Trash2 />حذف</Button></div>;
}
