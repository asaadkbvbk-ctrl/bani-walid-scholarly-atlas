import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import capturedCSS from "../styles/pages/admin.css?raw";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{"title": "دخول المشرف | كلية التربية - جامعة بني وليد"}, {"name": "description", "content": "دخول المشرف بكلية التربية بجامعة بني وليد."}, {"property": "og:title", "content": "دخول المشرف | كلية التربية - جامعة بني وليد"}, {"property": "og:description", "content": "دخول المشرف بكلية التربية بجامعة بني وليد."}, {"property": "og:type", "content": "website"}, {"name": "twitter:card", "content": "summary_large_image"}] }),
  staticData: { importedDocument: { html: { "dir": "rtl", "lang": "ar" }, body: {  } } },
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [register, setRegister] = useState(false);
  const [notice, setNotice] = useState("");
  return (
    <>
      <style>{capturedCSS}</style>
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
          <div className={"rounded-2xl \x62order \x62g-card p-8 \x73hadow-lift"}>
            <h1 className="font-bold text-3xl text-primary">{register ? "إنشاء حساب مشرف" : "دخول المشرف"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{register ? "أدخل بريدك الإلكتروني وكلمة مرور جديدة. يمنح مدير المنظومة الصلاحية بعد إنشاء الحساب." : "لوحة التحكم الخاصة بنشر وإدارة مشاريع الطلاب"}</p>
            <button className={"mt-6 flex w-full items-center justify-center gap-[10px] rounded-lg \x62order \x62order-[#\x3747775] \x62g-[#\x46FFFFF] px-3 py-2.5 text-sm font-medium \x74ext-[#\x31F1F1F]"} type="button" onClick={() => setNotice("تسجيل الدخول غير متصل بعد في النسخة المستوردة.")}><svg aria-hidden="true" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" /><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" /><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" /><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" /></svg>المتابعة باستخدام Google</button>
            <div className="my-4 text-center text-xs text-muted-foreground">أو بالبريد الإلكتروني وكلمة المرور</div>
            <form className={"\x73pace-y-3"} onSubmit={event => { event.preventDefault(); setNotice("تسجيل الدخول غير متصل بعد في النسخة المستوردة."); }}>
              <input className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} placeholder="البريد الإلكتروني" required dir="ltr" type="email" defaultValue="" />
              <input className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} placeholder="كلمة المرور" required minLength={register ? 8 : 6} dir="ltr" type="password" defaultValue="" />
              <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x73hadow \x68over:\x62g-primary/\x390 h-9 rounded-lg \x62g-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-50 w-full"}>{register ? "إنشاء الحساب" : "تسجيل الدخول"}</button>
{register && <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground" placeholder="تأكيد كلمة المرور" required minLength={8} dir="ltr" type="password" />}
            </form>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary \x73hadow h-9 mt-4 w-full rounded-lg \x62order px-4 py-2 text-sm text-primary \x68over:\x62g-secondary"} type="button" onClick={() => { setRegister(prev => !prev); setNotice(""); }}>{register ? "لديّ حساب — تسجيل الدخول" : "إنشاء حساب مشرف"}</button>
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
    </>
  );
}
