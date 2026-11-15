import { useState } from 'react';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Button } from '@/components/ui/button';
import { platformOptions } from '@/lib/platform-query';
import { savePlatformSettings } from '@/lib/platform.functions';
import type { PlatformSettings } from '@/lib/platform-settings';

const fields: [keyof PlatformSettings, string][] = [
  ['platform_name', 'اسم المنصة'], ['college_name', 'اسم الكلية'], ['university_name', 'اسم الجامعة'],
  ['welcome_text', 'نص الترحيب'], ['introduction', 'النص التعريفي'], ['author_name', 'اسم مطوّر المنصة'],
  ['supervisor_name', 'اسم المشرف على المنصة'], ['location', 'الموقع'], ['guide_url', 'رابط دليل مشاريع التخرج (PDF)'],
];
export function PlatformSettingsForm({ canManage }: { canManage: boolean }) {
  const { data } = useSuspenseQuery(platformOptions);
  const save = useServerFn(savePlatformSettings);
  const client = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  return <section className="mt-10 border-t pt-6">
    <h2 className="text-xl font-bold">إعدادات المنصة</h2>
    {!canManage && <p className="mt-3 text-muted-foreground">عرض ومراجعة فقط؛ تغيير إعدادات المنصة للمشرف الأول المخوّل.</p>}
    <form className="mt-5 grid gap-4 sm:grid-cols-2" key={JSON.stringify(data)} onSubmit={async event => {
      event.preventDefault(); if (!canManage || busy) return;
      const form = new FormData(event.currentTarget);
      const values = Object.fromEntries(fields.map(([key]) => [key, String(form.get(key) ?? '')])) as PlatformSettings;
      setBusy(true); setNotice('');
      try { const saved = await save({ data: values }); client.setQueryData(platformOptions.queryKey, saved); setNotice('تم حفظ إعدادات المنصة.'); }
      catch (e) { setNotice(e instanceof Error ? e.message : 'تعذر الحفظ.'); }
      finally { setBusy(false); }
    }}>
      {fields.map(([key, label]) => <label key={key} className="block text-sm">{label}<input aria-label={label} name={key} defaultValue={data[key]} readOnly={!canManage} required maxLength={2000} dir={key === 'guide_url' ? 'ltr' : undefined} className="mt-2 w-full rounded-md border bg-card px-3 py-2" /></label>)}
      {canManage && <div className="sm:col-span-2"><Button disabled={busy}>{busy ? 'جارٍ الحفظ…' : 'حفظ إعدادات المنصة'}</Button></div>}
      {notice && <p role="status" className="sm:col-span-2 text-sm">{notice}</p>}
    </form>
  </section>;
}