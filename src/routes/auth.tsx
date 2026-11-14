import { Link, createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useSupervisorSession } from '@/components/supervisor-session';
import capturedCSS from '../styles/pages/admin.css?raw';
export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{"title": "دخول المشرف | كلية التربية - جامعة بني وليد"}, {"name": "description", "content": "دخول المشرف بكلية التربية بجامعة بني وليد."}, {"property": "og:title", "content": "دخول المشرف | كلية التربية - جامعة بني وليد"}, {"property": "og:description", "content": "دخول المشرف بكلية التربية بجامعة بني وليد."}, {"property": "og:type", "content": "website"}, {"name": "twitter:card", "content": "summary_large_image"}] }),
  staticData: { importedDocument: { html: { "dir": "rtl", "lang": "ar" }, body: {  } } },
  component: Index,
});

function Index() {
  const navigate = Route.useNavigate();
  const { user, ready } = useSupervisorSession();
  const [register, setRegister] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (ready && user) void navigate({ to: '/admin', replace: true }); }, [ready, user, navigate]);
  return <><style>{capturedCSS}</style>
      <header className={"sticky top-0 z-40 \x62order-b \x62g-background/\x390 \x62ackdrop-blur"}>
        <div className={"\x62order-b \x62g-primary text-primary-foreground"}>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs">
            <span className="font-semibold">منظومة مشاريع التخرج والخريجين</span>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link className="flex items-center gap-3" to="/">
            <img className="h-12 w-auto" src="/site-assets/d0f6360e35312736.png" alt="شعار كلية التربية - جامعة بني وليد" />
            <span className="leading-tight">
              <span className="block font-bold text-lg text-foreground">كلية التربية</span>
              <span className="block text-xs text-muted-foreground">جامعة بني وليد</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-1 text-sm">
            <Link className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" to="/">الرئيسية</Link>
            <Link className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" to="/students">مشاريع التخرج</Link>
            <Link className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" to="/graduates">الخريجين</Link>
            <Link className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" to="/search">البحث المتقدم</Link>
            <Link className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" to="/stats">إحصائيات الكلية</Link>
            <Link className={"rounded-full \x62order \x62order-primary/\x340 px-3 py-1.5 text-primary transition \x68over:\x62g-secondary"} aria-current="page" to="/admin">لوحة التحكم</Link>
          </nav>
        </div>
      </header>
      <main className="min-h-screen" data-ready={ready}>
        <div className="mx-auto max-w-sm px-4 py-20">
          <div className="rounded-2xl border bg-card p-8 shadow-lift">
            <h1 className="font-bold text-3xl text-primary">{forgot ? 'استعادة كلمة المرور' : register ? 'إنشاء حساب مشرف' : 'دخول المشرف'}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{register ? 'يتطلب الدخول إلى لوحة التحكم موافقة على صلاحية المشرف.' : 'كلية التربية — جامعة بني وليد'}</p>
            <form className="mt-5 space-y-3" onSubmit={async event => {
              event.preventDefault(); setBusy(true); setNotice('');
              const form = new FormData(event.currentTarget);
              const email = String(form.get('email')).trim();
              const password = String(form.get('password') ?? '');
              try {
                if (forgot) {
                  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
                  setNotice(error ? 'تعذر إرسال الرسالة. حاول مجدداً.' : 'إذا كان البريد مسجلاً، ستصلك رسالة لاستعادة كلمة المرور.');
                } else if (register) {
                  if (password !== form.get('confirm')) { setNotice('كلمتا المرور غير متطابقتين.'); return; }
                  const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + '/auth', data: { display_name: String(form.get('display_name')), department: String(form.get('department')) } } });
                  setNotice(error ? 'تعذر إنشاء الحساب. تحقق من البيانات أو حاول لاحقاً.' : 'تحقق من بريدك الإلكتروني لتأكيد الحساب. صلاحية المشرف تتطلب موافقة منفصلة.');
                } else {
                  const { error } = await supabase.auth.signInWithPassword({ email, password });
                  if (error) setNotice('تعذر الدخول. تحقق من البريد وكلمة المرور وتأكيد البريد.');
                  else await navigate({ to: '/admin', replace: true });
                }
              } catch { setNotice('تعذر الاتصال. حاول مجدداً.'); }
              finally { setBusy(false); }
            }}>
              {register && !forgot && <><input name="display_name" aria-label="اسم المشرف" placeholder="اسم المشرف" required maxLength={120} className="w-full rounded-lg border bg-background px-3 py-2 text-sm"/><input name="department" aria-label="القسم" placeholder="القسم" maxLength={120} className="w-full rounded-lg border bg-background px-3 py-2 text-sm"/></>}
              <input name="email" aria-label="البريد الإلكتروني" placeholder="البريد الإلكتروني" autoComplete="email" required dir="ltr" type="email" className="w-full rounded-lg border bg-background px-3 py-2 text-sm"/>
              {!forgot && <input name="password" aria-label="كلمة المرور" placeholder="كلمة المرور" autoComplete={register ? 'new-password' : 'current-password'} required minLength={register ? 8 : 6} dir="ltr" type="password" className="w-full rounded-lg border bg-background px-3 py-2 text-sm"/>}
              {register && !forgot && <input name="confirm" aria-label="تأكيد كلمة المرور" placeholder="تأكيد كلمة المرور" autoComplete="new-password" required minLength={8} dir="ltr" type="password" className="w-full rounded-lg border bg-background px-3 py-2 text-sm"/>}
              <Button className="w-full" disabled={busy || !ready}>{busy ? 'جارٍ المعالجة…' : forgot ? 'إرسال رابط الاستعادة' : register ? 'إنشاء الحساب' : 'تسجيل الدخول'}</Button>
            </form>
            <Button variant="outline" className="mt-4 w-full" disabled={busy} onClick={() => { setRegister(!register); setForgot(false); setNotice(''); }}>{register || forgot ? 'لديّ حساب — تسجيل الدخول' : 'إنشاء حساب مشرف'}</Button>
            {!register && <Button variant="link" className="mt-2 w-full" disabled={busy} onClick={() => { setForgot(!forgot); setNotice(''); }}>{forgot ? 'العودة لتسجيل الدخول' : 'نسيت كلمة المرور؟'}</Button>}
            {notice && <p role="status" className="mt-4 text-sm text-muted-foreground">{notice}</p>}
          </div>
        </div>
      </main>
      <footer className={"mt-20 \x62g-primary text-primary-foreground"}>
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
          <p className={"mb-6 rounded-xl \x62order \x62order-gold/\x360 \x62g-primary-foreground/\x310 p-5 text-base leading-relaxed"}>تم تصميم وتطوير هذه المنصة بواسطة الطالبة: آية الأمين البوسيفي</p>
          <p className="font-bold text-lg">كلية التربية - جامعة بني وليد</p>
          <p className="mt-1 opacity-90">منظومة مشاريع التخرج والخريجين © 2026</p>
          <p className="mt-1 opacity-90">تحت إشراف أ. تجديده الحوسين الهادي</p>
          <p className="mt-2 opacity-80">بني وليد - ليبيا</p>
          <Link className="mt-3 inline-block text-xs underline opacity-70" aria-current="page" to="/admin">دخول المشرف</Link>
        </div>
      </footer>
  </>;
}
