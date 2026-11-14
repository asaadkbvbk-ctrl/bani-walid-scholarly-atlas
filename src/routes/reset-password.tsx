import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/reset-password')({
  head: () => ({ meta: [
    { title: 'تعيين كلمة المرور | كلية التربية - جامعة بني وليد' },
    { name: 'description', content: 'استعادة كلمة المرور لحساب المشرف بكلية التربية.' },
    { property: 'og:title', content: 'تعيين كلمة المرور | كلية التربية - جامعة بني وليد' },
    { property: 'og:description', content: 'استعادة كلمة المرور لحساب المشرف بكلية التربية.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
  ] }),
  staticData: { importedDocument: { html: { dir: 'rtl', lang: 'ar' } } },
  component: ResetPassword,
});
function ResetPassword() {
  const [valid, setValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const recovery = hash.get('type') === 'recovery';
    void supabase.auth.getUser().then(({ data, error }) => {
      setValid(recovery && !error && !!data.user);
      setChecked(true);
    });
  }, []);
  return <main className="mx-auto min-h-screen max-w-sm px-4 py-20">
    <img src="/site-assets/d0f6360e35312736.png" alt="كلية التربية" className="mb-6 h-16 w-auto" />
    <h1 className="text-3xl font-bold">تعيين كلمة المرور</h1>
    {!checked ? <p className="mt-5">جارٍ التحقق…</p> : !valid ? <p role="alert" className="mt-5">رابط الاستعادة غير صالح أو انتهت صلاحيته. اطلب رابطاً جديداً.</p> : <form className="mt-6 space-y-4" onSubmit={async event => {
      event.preventDefault(); setBusy(true); setNotice('');
      const form = new FormData(event.currentTarget);
      const password = String(form.get('password'));
      if (password !== form.get('confirm')) { setNotice('كلمتا المرور غير متطابقتين.'); setBusy(false); return; }
      try {
        const { error } = await supabase.auth.updateUser({ password });
        setNotice(error ? 'تعذر تغيير كلمة المرور. حاول مجدداً.' : 'تم تغيير كلمة المرور بنجاح.');
      } catch { setNotice('تعذر الاتصال. حاول مجدداً.'); }
      finally { setBusy(false); }
    }}>
      <input name="password" aria-label="كلمة المرور الجديدة" placeholder="كلمة المرور الجديدة" type="password" autoComplete="new-password" minLength={8} required dir="ltr" className="w-full rounded-lg border bg-card px-3 py-2" />
      <input name="confirm" aria-label="تأكيد كلمة المرور" placeholder="تأكيد كلمة المرور" type="password" autoComplete="new-password" minLength={8} required dir="ltr" className="w-full rounded-lg border bg-card px-3 py-2" />
      <Button disabled={busy} className="w-full">حفظ كلمة المرور</Button>
      {notice && <p role="status">{notice}</p>}
    </form>}
    <Button asChild variant="link" className="mt-6"><Link to="/auth">العودة لتسجيل الدخول</Link></Button>
  </main>;
}