import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/graduates.css?raw";

export const Route = createFileRoute("/graduates")({
  head: () => ({ meta: [{ title: "دليل الخريجين | كلية التربية - جامعة بني وليد" }] }),
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
          <a className="flex items-center gap-3" href="/">
            <img className="h-12 w-auto" src="/site-assets/d0f6360e35312736.png" alt="شعار كلية التربية - جامعة بني وليد" />
            <span className="leading-tight">
              <span className="block font-bold text-lg text-foreground">كلية التربية</span>
              <span className="block text-xs text-muted-foreground">جامعة بني وليد</span>
            </span>
          </a>
          <nav className="flex flex-wrap gap-1 text-sm">
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/">الرئيسية</a>
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/students">مشاريع التخرج</a>
            <a className={"rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground \x62g-secondary !text-primary font-semibold"} aria-current="page" href="#">الخريجين</a>
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/search">البحث المتقدم</a>
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/stats">إحصائيات الكلية</a>
            <a className={"rounded-full \x62order \x62order-primary/\x340 px-3 py-1.5 text-primary transition \x68over:\x62g-secondary"} href="/admin">لوحة التحكم</a>
          </nav>
        </div>
      </header>
      <main className="min-h-screen">
        <section className={"\x62order-b \x62g-secondary/\x360"}>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h1 className="font-bold text-4xl text-primary md:text-5xl">دليل الخريجين</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">سجلات خريجي الكلية المرتبطة بمشاريع تخرجهم. ابحث بالاسم أو الرقم الدراسي، أو صفِّ حسب القسم والسنة والفصل.</p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب القسم">
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62order-primary \x62g-primary text-primary-foreground font-semibold"} type="button" aria-pressed="true">جميع الأقسام<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الحاسوب<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الفيزياء<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الكيمياء<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الأحياء<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الرياضيات<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">اللغة العربية<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">اللغة الإنجليزية<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">علم الاجتماع<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الخدمة الاجتماعية<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">التربية وعلم النفس<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">رياض الأطفال<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الإدارة التعليمية والتخطيط التربوي<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">معلم الفصل<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">التربية الخاصة<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الدراسات الإسلامية<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الجغرافيا والدراسات البيئية<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">التاريخ<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">التربية البدنية<span className="mr-1 opacity-75">(0)</span></button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <input className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} placeholder="ابحث بالاسم أو الرقم الدراسي..." type="search" defaultValue="" />
            <div>
              <span role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-Hb3tC-panel" aria-activedescendant="bb-customSelect-Hb3tC-selectedOption" tabIndex={0}>
                <span>كل السنوات</span>
              </span>
              <select className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} tabIndex={-1} defaultValue="">
                <option value="">كل السنوات</option>
              </select>
              <div id="bb-customSelect-Hb3tC-panel" role="listbox">
                <div role="option" id="bb-customSelect-Hb3tC-selectedOption">كل السنوات</div>
              </div>
            </div>
            <div>
              <span role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-Oag8X-panel" aria-activedescendant="bb-customSelect-Oag8X-selectedOption" tabIndex={0}>
                <span>كل الفصول</span>
              </span>
              <select className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} tabIndex={-1} defaultValue="">
                <option value="">كل الفصول</option>
                <option value="فصل الخريف">فصل الخريف</option>
                <option value="فصل الربيع">فصل الربيع</option>
                <option value="الفصل الصيفي">الفصل الصيفي</option>
              </select>
              <div id="bb-customSelect-Oag8X-panel" role="listbox">
                <div role="option" id="bb-customSelect-Oag8X-selectedOption">كل الفصول</div>
                <div role="option">فصل الخريف</div>
                <div role="option">فصل الربيع</div>
                <div role="option">الفصل الصيفي</div>
              </div>
            </div>
          </div>
          <h2 className="mt-8 font-bold text-2xl text-foreground">جميع الأقسام <span className="text-base font-normal text-muted-foreground">(0 خريج)</span></h2>
          <p className={"mt-6 rounded-xl \x62order \x62g-card p-6 text-muted-foreground"}>لا توجد سجلات مطابقة حالياً.</p>
        </div>
      </main>
      <footer className={"mt-20 \x62g-primary text-primary-foreground"}>
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
          <p className={"mb-6 rounded-xl \x62order \x62order-gold/\x360 \x62g-primary-foreground/\x310 p-5 text-base leading-relaxed"}>تم تصميم وتطوير هذه المنصة بواسطة الطالبة: آية الأمين البوسيفي</p>
          <p className="font-bold text-lg">كلية التربية - جامعة بني وليد</p>
          <p className="mt-1 opacity-90">منظومة مشاريع التخرج والخريجين © 2026</p>
          <p className="mt-1 opacity-90">تحت إشراف أ. تجديده الحوسين الهادي</p>
          <p className="mt-2 opacity-80">بني وليد - ليبيا</p>
          <a className="mt-3 inline-block text-xs underline opacity-70" href="/admin">دخول المشرف</a>
        </div>
      </footer>
    </>
  );
}
