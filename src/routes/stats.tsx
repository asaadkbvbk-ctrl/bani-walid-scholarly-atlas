import { Link, createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/stats.css?raw";

export const Route = createFileRoute("/stats")({
  head: () => ({ meta: [{"title": "إحصائيات الكلية | كلية التربية - جامعة بني وليد"}, {"name": "description", "content": "إحصائيات الكلية بكلية التربية بجامعة بني وليد."}, {"property": "og:title", "content": "إحصائيات الكلية | كلية التربية - جامعة بني وليد"}, {"property": "og:description", "content": "إحصائيات الكلية بكلية التربية بجامعة بني وليد."}, {"property": "og:type", "content": "website"}, {"name": "twitter:card", "content": "summary_large_image"}] }),
  staticData: { importedDocument: { html: { "dir": "rtl", "lang": "ar" }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <>
      <style>{capturedCSS}</style>
      <header className={"sticky top-0 z-40 \x62order-b \x62g-background/\x390 \x62ackdrop-blur"}>
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
            <Link className={"rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground \x62g-secondary !text-primary font-semibold"} aria-current="page" to="/stats">إحصائيات الكلية</Link>
            <Link className={"rounded-full \x62order \x62order-primary/\x340 px-3 py-1.5 text-primary transition \x68over:\x62g-secondary"} to="/admin">لوحة التحكم</Link>
          </nav>
        </div>
      </header>
      <main className="min-h-screen">
        <section className={"\x62order-b \x62g-secondary/\x360"}>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h1 className="font-bold text-4xl text-primary md:text-5xl">إحصائيات الكلية</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">مؤشرات محدثة تلقائياً من قاعدة البيانات مع كل إضافة أو تعديل من لوحة التحكم.</p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className={"rounded-xl \x62order \x62order-t-4 \x62order-t-gold \x62g-card p-6 text-center \x73hadow-lift"}>
              <div className="font-sans text-5xl font-bold text-primary">4</div>
              <div className="mt-2 text-base font-semibold text-foreground">مشروع تخرج</div>
            </div>
            <div className={"rounded-xl \x62order \x62order-t-4 \x62order-t-gold \x62g-card p-6 text-center \x73hadow-lift"}>
              <div className="font-sans text-5xl font-bold text-primary">0</div>
              <div className="mt-2 text-base font-semibold text-foreground">خريج مسجّل</div>
            </div>
            <div className={"rounded-xl \x62order \x62order-t-4 \x62order-t-gold \x62g-card p-6 text-center \x73hadow-lift"}>
              <div className="font-sans text-5xl font-bold text-primary">4</div>
              <div className="mt-2 text-base font-semibold text-foreground">قسم مشارك</div>
            </div>
            <div className={"rounded-xl \x62order \x62order-t-4 \x62order-t-gold \x62g-card p-6 text-center \x73hadow-lift"}>
              <div className="font-sans text-5xl font-bold text-primary">0</div>
              <div className="mt-2 text-base font-semibold text-foreground">ملف PDF متاح</div>
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <ImportedSection />
            <section className={"rounded-xl \x62order \x62g-card p-6"}>
              <h2 className="font-bold text-xl text-foreground">مشاريع التخرج حسب السنة</h2>
              <div className={"mt-4 \x73pace-y-2"}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
                  <span className="text-foreground">2025</span>
                  <span className="font-semibold text-primary">2</span>
                  <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="2025" value="2" max="2" />
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
                  <span className="text-foreground">2024</span>
                  <span className="font-semibold text-primary">2</span>
                  <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="2024" value="2" max="2" />
                </div>
              </div>
            </section>
            <section className={"rounded-xl \x62order \x62g-card p-6"}>
              <h2 className="font-bold text-xl text-foreground">مشاريع التخرج حسب الفصل</h2>
              <div className={"mt-4 \x73pace-y-2"}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
                  <span className="text-foreground">غير محدد</span>
                  <span className="font-semibold text-primary">4</span>
                  <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="غير محدد" value="4" max="4" />
                </div>
              </div>
            </section>
            <section className={"rounded-xl \x62order \x62g-card p-6"}>
              <h2 className="font-bold text-xl text-foreground">الخريجون حسب سنة التخرج</h2>
              <div className={"mt-4 \x73pace-y-2"}>
                <p className="text-muted-foreground">لا توجد بيانات بعد.</p>
              </div>
            </section>
            <ImportedSection2 />
            <section className={"rounded-xl \x62order \x62g-card p-6"}>
              <h2 className="font-bold text-xl text-foreground">الخريجون حسب فصل التخرج</h2>
              <div className={"mt-4 \x73pace-y-2"}>
                <p className="text-muted-foreground">لا توجد بيانات بعد.</p>
              </div>
            </section>
          </div>
          <section className={"mt-10 rounded-xl \x62order \x62g-card p-6"}>
            <h2 className="font-bold text-xl text-foreground">أكثر المشرفين إشرافاً</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className={"\x62order-b text-foreground"}>
                    <th className="px-3 py-2 text-right font-semibold">المشرف</th>
                    <th className="px-3 py-2 text-right font-semibold">عدد المشاريع</th>
                    <th className="px-3 py-2 text-right font-semibold">الأقسام</th>
                    <th className="px-3 py-2 text-right font-semibold">السنوات</th>
                  </tr>
                </thead>
                <tbody className={"\x64ivide-y"}>
                  <tr>
                    <td className="px-3 py-2 font-semibold text-foreground">د. خالد المبروك</td>
                    <td className="px-3 py-2 text-foreground">1</td>
                    <td className="px-3 py-2 text-muted-foreground">قسم الحاسوب</td>
                    <td className="px-3 py-2 text-muted-foreground">2025</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold text-foreground">د. سعاد الهادي</td>
                    <td className="px-3 py-2 text-foreground">1</td>
                    <td className="px-3 py-2 text-muted-foreground">قسم التربية وعلم النفس</td>
                    <td className="px-3 py-2 text-muted-foreground">2025</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold text-foreground">د. عبدالسلام فرج</td>
                    <td className="px-3 py-2 text-foreground">1</td>
                    <td className="px-3 py-2 text-muted-foreground">قسم اللغة العربية</td>
                    <td className="px-3 py-2 text-muted-foreground">2024</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold text-foreground">د. نوري الطاهر</td>
                    <td className="px-3 py-2 text-foreground">1</td>
                    <td className="px-3 py-2 text-muted-foreground">قسم اللغة الإنجليزية</td>
                    <td className="px-3 py-2 text-muted-foreground">2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <footer className={"mt-20 \x62g-primary text-primary-foreground"}>
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
          <p className={"mb-6 rounded-xl \x62order \x62order-gold/\x360 \x62g-primary-foreground/\x310 p-5 text-base leading-relaxed"}>تم تصميم وتطوير هذه المنصة بواسطة الطالبة: آية الأمين البوسيفي</p>
          <p className="font-bold text-lg">كلية التربية - جامعة بني وليد</p>
          <p className="mt-1 opacity-90">منصة مشاريع التخرج والخريجين © 2026</p>
          <p className="mt-1 opacity-90">تحت إشراف أ. تجديده الحوسين الهادي</p>
          <p className="mt-2 opacity-80">بني وليد - ليبيا</p>
          <Link className="mt-3 inline-block text-xs underline opacity-70" to="/admin">دخول المشرف</Link>
        </div>
      </footer>
    </>
  );
}

function ImportedSection() {
  return (
    <section className={"rounded-xl \x62order \x62g-card p-6"}>
      <h2 className="font-bold text-xl text-foreground">مشاريع التخرج حسب القسم</h2>
      <div className={"mt-4 \x73pace-y-2"}>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الأحياء</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الأحياء" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الإدارة التعليمية والتخطيط التربوي</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الإدارة التعليمية والتخطيط التربوي" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">التاريخ</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="التاريخ" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">التربية البدنية</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="التربية البدنية" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">التربية الخاصة</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="التربية الخاصة" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">التربية وعلم النفس</span>
          <span className="font-semibold text-primary">1</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="التربية وعلم النفس" value="1" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الجغرافيا والدراسات البيئية</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الجغرافيا والدراسات البيئية" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الحاسوب</span>
          <span className="font-semibold text-primary">1</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الحاسوب" value="1" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الخدمة الاجتماعية</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الخدمة الاجتماعية" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الدراسات الإسلامية</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الدراسات الإسلامية" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الرياضيات</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الرياضيات" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الفيزياء</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الفيزياء" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الكيمياء</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الكيمياء" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">اللغة الإنجليزية</span>
          <span className="font-semibold text-primary">1</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="اللغة الإنجليزية" value="1" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">اللغة العربية</span>
          <span className="font-semibold text-primary">1</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="اللغة العربية" value="1" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">رياض الأطفال</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="رياض الأطفال" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">علم الاجتماع</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="علم الاجتماع" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">معلم الفصل</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="معلم الفصل" value="0" max="1" />
        </div>
      </div>
    </section>
  );
}

function ImportedSection2() {
  return (
    <section className={"rounded-xl \x62order \x62g-card p-6"}>
      <h2 className="font-bold text-xl text-foreground">الخريجون حسب القسم</h2>
      <div className={"mt-4 \x73pace-y-2"}>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الأحياء</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الأحياء" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الإدارة التعليمية والتخطيط التربوي</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الإدارة التعليمية والتخطيط التربوي" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">التاريخ</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="التاريخ" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">التربية البدنية</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="التربية البدنية" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">التربية الخاصة</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="التربية الخاصة" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">التربية وعلم النفس</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="التربية وعلم النفس" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الجغرافيا والدراسات البيئية</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الجغرافيا والدراسات البيئية" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الحاسوب</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الحاسوب" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الخدمة الاجتماعية</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الخدمة الاجتماعية" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الدراسات الإسلامية</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الدراسات الإسلامية" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الرياضيات</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الرياضيات" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الفيزياء</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الفيزياء" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">الكيمياء</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="الكيمياء" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">اللغة الإنجليزية</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="اللغة الإنجليزية" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">اللغة العربية</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="اللغة العربية" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">رياض الأطفال</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="رياض الأطفال" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">علم الاجتماع</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="علم الاجتماع" value="0" max="1" />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-sm">
          <span className="text-foreground">معلم الفصل</span>
          <span className="font-semibold text-primary">0</span>
          <progress className={"col-span-2 h-3 w-full \x61ccent-primary"} aria-label="معلم الفصل" value="0" max="1" />
        </div>
      </div>
    </section>
  );
}
