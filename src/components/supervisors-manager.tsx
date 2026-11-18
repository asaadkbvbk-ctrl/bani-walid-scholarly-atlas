import { useState } from 'react';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { ShieldCheck, ShieldOff, UserMinus } from 'lucide-react';
import { Button } from './ui/button';
import { supervisorsOptions } from '@/lib/admin-query';
import { setSupervisorAdmin, removeSupervisor } from '@/lib/admin.functions';

export function SupervisorsManager() {
  const { data: people } = useSuspenseQuery(supervisorsOptions);
  const client = useQueryClient();
  const setAdmin = useServerFn(setSupervisorAdmin), remove = useServerFn(removeSupervisor);
  const [busy, setBusy] = useState(false), [notice, setNotice] = useState('');
  const run = async (action: () => Promise<string>) => {
    if (busy) return; setBusy(true); setNotice('');
    try { setNotice(await action()); await client.invalidateQueries({ queryKey: supervisorsOptions.queryKey }); }
    catch (e) { setNotice(e instanceof Error ? e.message : 'تعذر تنفيذ العملية.'); }
    finally { setBusy(false); }
  };
  return <section aria-label="إدارة المشرفين">
    <h2 className="text-2xl font-bold">المشرفون</h2>
    <p className="mt-2 text-sm text-muted-foreground">المشرف الأول يملك كل الصلاحيات. المشرف الثاني يدير المشاريع والملفات والخريجين فقط.</p>
    {notice && <p role="status" className="mt-3 text-sm">{notice}</p>}
    <div className="mt-5 grid gap-3 sm:grid-cols-2">{people.map(p => <article key={p.user_id} className="rounded-xl border bg-card p-4">
      <p className="break-words font-bold">{p.display_name || 'بدون اسم'} {p.is_self && <span className="text-xs text-muted-foreground">(أنت)</span>}</p>
      <p className="break-all text-sm text-muted-foreground">{p.email}</p>
      <p className="mt-2 text-sm"><span className={`rounded-full px-2 py-0.5 ${p.is_admin ? 'bg-gold text-gold-foreground' : 'bg-secondary'}`}>{p.is_admin ? 'مشرف أول — صلاحيات كاملة' : 'مشرف ثانٍ — مساعد'}</span></p>
      {!p.is_self && <div className="mt-3 flex flex-wrap gap-2">
        {p.is_admin
          ? <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => void run(async () => { await setAdmin({ data: { userId: p.user_id, grant: false } }); return 'أصبح مشرفاً ثانياً.'; })}><ShieldOff />تحويل إلى مشرف ثانٍ</Button>
          : <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => void run(async () => { await setAdmin({ data: { userId: p.user_id, grant: true } }); return 'أصبح مشرفاً أول.'; })}><ShieldCheck />ترقية إلى مشرف أول</Button>}
        <Button type="button" size="sm" variant="destructive" disabled={busy} onClick={() => { if (window.confirm('إزالة صلاحيات هذا المشرف؟')) void run(async () => { await remove({ data: { userId: p.user_id } }); return 'تمت إزالة المشرف.'; }); }}><UserMinus />إزالة</Button>
      </div>}
    </article>)}</div>
  </section>;
}
