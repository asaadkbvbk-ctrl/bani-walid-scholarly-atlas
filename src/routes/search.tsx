import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { filterProjects, type ProjectFilters } from "@/lib/captured-projects";
import capturedCSS from "../styles/pages/search.css?raw";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{"title": "البحث المتقدم | كلية التربية - جامعة بني وليد"}, {"name": "description", "content": "البحث المتقدم بكلية التربية بجامعة بني وليد."}, {"property": "og:title", "content": "البحث المتقدم | كلية التربية - جامعة بني وليد"}, {"property": "og:description", "content": "البحث المتقدم بكلية التربية بجامعة بني وليد."}, {"property": "og:type", "content": "website"}, {"name": "twitter:card", "content": "summary_large_image"}] }),
  staticData: { importedDocument: { html: { "dir": "rtl", "lang": "ar" }, body: {  } } },
  component: Index,
});

function Index() {
  const [filters, setFilters] = useState<ProjectFilters>({});
  const results = filterProjects(filters);
  const hasFilters = Object.values(filters).some(Boolean);

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
            <Link className={"rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground \x62g-secondary !text-primary font-semibold"} aria-current="page" to="/search">البحث المتقدم</Link>
            <Link className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" to="/stats">إحصائيات الكلية</Link>
            <Link className={"rounded-full \x62order \x62order-primary/\x340 px-3 py-1.5 text-primary transition \x68over:\x62g-secondary"} to="/admin">لوحة التحكم</Link>
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
              <input className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} placeholder="مثال: د. خالد، التعلم النشط، 2019001" type="search" value={filters.q ?? ""} onChange={event => setFilters(prev => ({ ...prev, q: event.target.value }))} />
            </label>
            <label className="block text-sm" id="bb-customSelect-4HQrp-label">
              <span className="mb-1 block font-medium text-foreground">القسم</span>
              <div>
                <select className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} value={filters.dept ?? ""} onChange={event => setFilters(prev => ({ ...prev, dept: event.target.value }))}>
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
              </div>
            </label>
            <label className="block text-sm" id="bb-customSelect-E7JPM-label">
              <span className="mb-1 block font-medium text-foreground">سنة التخرج</span>
              <div>
                <select className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} value={filters.year ?? ""} onChange={event => setFilters(prev => ({ ...prev, year: event.target.value }))}>
                  <option value="">كل السنوات</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </label>
            <label className="block text-sm" id="bb-customSelect-hdlse-label">
              <span className="mb-1 block font-medium text-foreground">الفصل</span>
              <div>
                <select className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} value={filters.semester ?? ""} onChange={event => setFilters(prev => ({ ...prev, semester: event.target.value }))}>
                  <option value="">كل الفصول</option>
                  <option value="فصل الخريف">فصل الخريف</option>
                  <option value="فصل الربيع">فصل الربيع</option>
                  <option value="الفصل الصيفي">الفصل الصيفي</option>
                </select>
              </div>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">المشرف</span>
              <input className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} list="supervisors" placeholder="اسم المشرف" value={filters.supervisor ?? ""} onChange={event => setFilters(prev => ({ ...prev, supervisor: event.target.value }))} />
              <datalist id="supervisors">
                <option value="د. خالد المبروك" />
                <option value="د. سعاد الهادي" />
                <option value="د. عبدالسلام فرج" />
                <option value="د. نوري الطاهر" />
              </datalist>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">اسم الطالب أو رقمه الدراسي</span>
              <input className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} placeholder="اسم الطالب" value={filters.student ?? ""} onChange={event => setFilters(prev => ({ ...prev, student: event.target.value }))} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">الكلمات المفتاحية</span>
              <input className={"w-full rounded-lg \x62order bg-background px-3 py-2 text-sm text-foreground \x66ocus:\x6futline-none \x66ocus:\x72ing-2 \x66ocus:\x72ing-ring"} placeholder="مثال: التحصيل الدراسي" value={filters.keywords ?? ""} onChange={event => setFilters(prev => ({ ...prev, keywords: event.target.value }))} />
            </label>
          </div>
          {hasFilters ? <div className="mt-8"><h2 className="font-bold text-2xl text-foreground">مشاريع التخرج ({results.length})</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.map(project => <Link key={project.id} to={project.to} className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"><div className="relative aspect-[16/10] bg-secondary"><div className="flex h-full items-center justify-center"><img className="h-20 w-auto opacity-40" alt="" src="/site-assets/d0f6360e35312736.png" /></div></div><div className="flex flex-1 flex-col p-5"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground">{project.department}</span><span className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground">{project.year}</span></div><h3 className="mt-3 font-bold text-lg text-foreground">{project.title}</h3><p className="mt-2 text-sm text-muted-foreground">{project.summary}</p><p className="mt-3 text-xs text-muted-foreground">إعداد: {project.people}</p></div></Link>)}</div>{!results.length && <p className="mt-6 text-muted-foreground">لا توجد مشاريع مطابقة.</p>}<h2 className="mt-8 font-bold text-2xl text-foreground">الخريجون (0)</h2><p className="mt-6 text-muted-foreground">لا توجد سجلات خريجين مطابقة.</p></div> : <p className={"mt-8 rounded-xl \x62order \x62g-card p-6 text-muted-foreground"}>اكتب أو اختر شرطاً واحداً على الأقل لعرض النتائج.</p>}
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
