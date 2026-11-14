import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/search.css?raw";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "البحث المتقدم | كلية التربية - جامعة بني وليد" }] }),
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
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/graduates">الخريجين</a>
            <a className={"rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground \x62g-secondary !text-primary font-semibold"} aria-current="page" href="#">البحث المتقدم</a>
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/stats">إحصائيات الكلية</a>
            <a className={"rounded-full \x62order \x62order-primary/\x340 px-3 py-1.5 text-primary transition \x68over:\x62g-secondary"} href="/admin">لوحة التحكم</a>
          </nav>
        </div>
      </header>
      <main className="min-h-screen">
        <section className={"\x62order-b \x62g-secondary/\x360"}>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h1 className="font-bold text-4xl text-primary md:text-5xl">البحث المتقدم</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">ابحث في مشاريع التخرج وسجلات الخريجين بشرط واحد أو بعدة شروط مجتمعة.</p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className={"grid gap-3 rounded-xl \x62order \x62g-card p-5 sm:grid-cols-2 lg:grid-cols-3"}>
            <label className="block text-sm sm:col-span-2 lg:col-span-3">
              <span className="mb-1 block font-medium text-foreground">كلمة عامة (عنوان، اسم، رقم دراسي...)</span>
              <input className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} placeholder="مثال: د. خالد، التعلم النشط، 2019001" type="search" defaultValue="" />
            </label>
            <label className="block text-sm" id="bb-customSelect-4HQrp-label">
              <span className="mb-1 block font-medium text-foreground">القسم</span>
              <div>
                <span role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-4HQrp-panel" aria-activedescendant="bb-customSelect-4HQrp-selectedOption" aria-labelledby="bb-customSelect-4HQrp-label" tabIndex={0}>
                  <span>كل الأقسام</span>
                </span>
                <select className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} tabIndex={-1} defaultValue="">
                  <option value="">كل الأقسام</option>
                  <option value="قسم الحاسوب">قسم الحاسوب</option>
                  <option value="قسم الفيزياء">قسم الفيزياء</option>
                  <option value="قسم الكيمياء">قسم الكيمياء</option>
                  <option value="قسم الأحياء">قسم الأحياء</option>
                  <option value="قسم الرياضيات">قسم الرياضيات</option>
                  <option value="قسم اللغة العربية">قسم اللغة العربية</option>
                  <option value="قسم اللغة الإنجليزية">قسم اللغة الإنجليزية</option>
                  <option value="قسم علم الاجتماع">قسم علم الاجتماع</option>
                  <option value="قسم الخدمة الاجتماعية">قسم الخدمة الاجتماعية</option>
                  <option value="قسم التربية وعلم النفس">قسم التربية وعلم النفس</option>
                  <option value="قسم رياض الأطفال">قسم رياض الأطفال</option>
                  <option value="قسم الإدارة التعليمية والتخطيط التربوي">قسم الإدارة التعليمية والتخطيط التربوي</option>
                  <option value="قسم معلم الفصل">قسم معلم الفصل</option>
                  <option value="قسم التربية الخاصة">قسم التربية الخاصة</option>
                  <option value="قسم الدراسات الإسلامية">قسم الدراسات الإسلامية</option>
                  <option value="قسم الجغرافيا والدراسات البيئية">قسم الجغرافيا والدراسات البيئية</option>
                  <option value="قسم التاريخ">قسم التاريخ</option>
                  <option value="قسم التربية البدنية">قسم التربية البدنية</option>
                </select>
                <div id="bb-customSelect-4HQrp-panel" role="listbox">
                  <div role="option" id="bb-customSelect-4HQrp-selectedOption">كل الأقسام</div>
                  <div role="option">قسم الحاسوب</div>
                  <div role="option">قسم الفيزياء</div>
                  <div role="option">قسم الكيمياء</div>
                  <div role="option">قسم الأحياء</div>
                  <div role="option">قسم الرياضيات</div>
                  <div role="option">قسم اللغة العربية</div>
                  <div role="option">قسم اللغة الإنجليزية</div>
                  <div role="option">قسم علم الاجتماع</div>
                  <div role="option">قسم الخدمة الاجتماعية</div>
                  <div role="option">قسم التربية وعلم النفس</div>
                  <div role="option">قسم رياض الأطفال</div>
                  <div role="option">قسم الإدارة التعليمية والتخطيط التربوي</div>
                  <div role="option">قسم معلم الفصل</div>
                  <div role="option">قسم التربية الخاصة</div>
                  <div role="option">قسم الدراسات الإسلامية</div>
                  <div role="option">قسم الجغرافيا والدراسات البيئية</div>
                  <div role="option">قسم التاريخ</div>
                  <div role="option">قسم التربية البدنية</div>
                </div>
              </div>
            </label>
            <label className="block text-sm" id="bb-customSelect-E7JPM-label">
              <span className="mb-1 block font-medium text-foreground">سنة التخرج</span>
              <div>
                <span role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-E7JPM-panel" aria-activedescendant="bb-customSelect-E7JPM-selectedOption" aria-labelledby="bb-customSelect-E7JPM-label" tabIndex={0}>
                  <span>كل السنوات</span>
                </span>
                <select className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} tabIndex={-1} defaultValue="">
                  <option value="">كل السنوات</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
                <div id="bb-customSelect-E7JPM-panel" role="listbox">
                  <div role="option" id="bb-customSelect-E7JPM-selectedOption">كل السنوات</div>
                </div>
              </div>
            </label>
            <label className="block text-sm" id="bb-customSelect-hdlse-label">
              <span className="mb-1 block font-medium text-foreground">الفصل</span>
              <div>
                <span role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-hdlse-panel" aria-activedescendant="bb-customSelect-hdlse-selectedOption" aria-labelledby="bb-customSelect-hdlse-label" tabIndex={0}>
                  <span>كل الفصول</span>
                </span>
                <select className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} tabIndex={-1} defaultValue="">
                  <option value="">كل الفصول</option>
                  <option value="فصل الخريف">فصل الخريف</option>
                  <option value="فصل الربيع">فصل الربيع</option>
                  <option value="الفصل الصيفي">الفصل الصيفي</option>
                </select>
                <div id="bb-customSelect-hdlse-panel" role="listbox">
                  <div role="option" id="bb-customSelect-hdlse-selectedOption">كل الفصول</div>
                  <div role="option">فصل الخريف</div>
                  <div role="option">فصل الربيع</div>
                  <div role="option">الفصل الصيفي</div>
                </div>
              </div>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">المشرف</span>
              <input className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} list="supervisors" placeholder="اسم المشرف" defaultValue="" />
              <datalist id="supervisors">
                <option value="د. خالد المبروك" />
                <option value="د. سعاد الهادي" />
                <option value="د. عبدالسلام فرج" />
                <option value="د. نوري الطاهر" />
              </datalist>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">اسم الطالب أو رقمه الدراسي</span>
              <input className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} placeholder="اسم الطالب" defaultValue="" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">الكلمات المفتاحية</span>
              <input className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} placeholder="مثال: التحصيل الدراسي" defaultValue="" />
            </label>
          </div>
          <p className={"mt-8 rounded-xl \x62order \x62g-card p-6 text-muted-foreground"}>اكتب أو اختر شرطاً واحداً على الأقل لعرض النتائج.</p>
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
