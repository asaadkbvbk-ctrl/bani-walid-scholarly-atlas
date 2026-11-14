import { Link, createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/projects.5da1928f-3f94-4db7-ace1-72e32d2e8638.css?raw";

export const Route = createFileRoute("/projects_/5da1928f-3f94-4db7-ace1-72e32d2e8638")({
  head: () => ({ meta: [{"title": "الصورة الفنية في شعر الطبيعة الليبي الحديث | كلية التربية - جامعة بني وليد"}, {"name": "description", "content": "الصورة الفنية في شعر الطبيعة الليبي الحديث بكلية التربية بجامعة بني وليد."}, {"property": "og:title", "content": "الصورة الفنية في شعر الطبيعة الليبي الحديث | كلية التربية - جامعة بني وليد"}, {"property": "og:description", "content": "الصورة الفنية في شعر الطبيعة الليبي الحديث بكلية التربية بجامعة بني وليد."}, {"property": "og:type", "content": "website"}, {"name": "twitter:card", "content": "summary_large_image"}] }),
  staticData: { importedDocument: { html: { "dir": "rtl", "lang": "ar" }, body: {  } } },
  component: Index,
});

function Index() {
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
            <Link className={"rounded-full \x62order \x62order-primary/\x340 px-3 py-1.5 text-primary transition \x68over:\x62g-secondary"} to="/admin">لوحة التحكم</Link>
          </nav>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <Link className={"text-sm text-primary \x68over:\x75nderline"} to="/students" search={{"dept": "قسم اللغة العربية"}}>→ مشاريع قسم اللغة العربية</Link>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={"inline-block rounded-full \x62g-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"}>قسم اللغة العربية</span>
            <span className={"inline-block rounded-full \x62g-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"}>2024</span>
            <span className={"rounded-full \x62g-gold px-2.5 py-0.5 text-xs font-semibold text-gold-foreground"}>★ مسابقة البحث العلمي بجامعة بني وليد</span>
          </div>
          <h1 className="mt-3 font-bold text-3xl leading-snug text-primary md:text-4xl">الصورة الفنية في شعر الطبيعة الليبي الحديث</h1>
          <p className="mt-3 leading-loose text-muted-foreground">إعداد: <span><strong className="text-foreground">عائشة محمد</strong></span> — إشراف: <strong className="text-foreground">د. عبدالسلام فرج</strong></p>
          <section className={"mt-6 \x62order-y py-4"}>
            <h2 className="font-semibold">سجلات الطلبة المرتبطة</h2>
            <p className="mt-2 text-sm text-muted-foreground">لا توجد سجلات خريجين مرتبطة بالمشروع حالياً.</p>
          </section>
          <section className="mt-8">
            <h2 className="font-bold text-xl text-foreground">ملخص المشروع</h2>
            <p className="mt-3 whitespace-pre-line leading-loose text-foreground">قراءة نقدية في نماذج مختارة من شعراء ليبيا المعاصرين.</p>
          </section>
        </div>
      </main>
      <footer className={"mt-20 \x62g-primary text-primary-foreground"}>
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
          <p className={"mb-6 rounded-xl \x62order \x62order-gold/\x360 \x62g-primary-foreground/\x310 p-5 text-base leading-relaxed"}>تم تصميم وتطوير هذه المنصة بواسطة الطالبة: آية الأمين البوسيفي</p>
          <p className="font-bold text-lg">كلية التربية - جامعة بني وليد</p>
          <p className="mt-1 opacity-90">منظومة مشاريع التخرج والخريجين © 2026</p>
          <p className="mt-1 opacity-90">تحت إشراف أ. تجديده الحوسين الهادي</p>
          <p className="mt-2 opacity-80">بني وليد - ليبيا</p>
          <Link className="mt-3 inline-block text-xs underline opacity-70" to="/admin">دخول المشرف</Link>
        </div>
      </footer>
    </>
  );
}
