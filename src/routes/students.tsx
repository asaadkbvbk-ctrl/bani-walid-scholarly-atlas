import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { filterProjects } from "@/lib/captured-projects";
import capturedCSS from "../styles/pages/students.css?raw";

export const Route = createFileRoute("/students")({
  head: () => ({ meta: [{"title": "مشاريع الطلاب | كلية التربية - جامعة بني وليد"}, {"name": "description", "content": "مشاريع الطلاب بكلية التربية بجامعة بني وليد."}, {"property": "og:title", "content": "مشاريع الطلاب | كلية التربية - جامعة بني وليد"}, {"property": "og:description", "content": "مشاريع الطلاب بكلية التربية بجامعة بني وليد."}, {"property": "og:type", "content": "website"}, {"name": "twitter:card", "content": "summary_large_image"}] }),
  staticData: { importedDocument: { html: { "dir": "rtl", "lang": "ar" }, body: {  } } },
  validateSearch: (search: Record<string, unknown>): { dept?: string | undefined; q?: string | undefined } => ({ dept: typeof search['dept'] === "string" ? search['dept'] : undefined, q: typeof search['q'] === "string" ? search['q'] : undefined }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const department = search['dept'] ?? "";
  const [query, setQuery] = useState(search['q'] ?? "");
  const visibleProjects = filterProjects({ dept: department, q: search['q'] });

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
            <Link className={"rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground \x62g-secondary !text-primary font-semibold"} aria-current="page" to="/students">مشاريع التخرج</Link>
            <Link className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" to="/graduates">الخريجين</Link>
            <Link className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" to="/search">البحث المتقدم</Link>
            <Link className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" to="/stats">إحصائيات الكلية</Link>
            <Link className={"rounded-full \x62order \x62order-primary/\x340 px-3 py-1.5 text-primary transition \x68over:\x62g-secondary"} to="/admin">لوحة التحكم</Link>
          </nav>
        </div>
      </header>
      <main className="min-h-screen" data-ready={ready}>
        <section className={"\x62order-b \x62g-secondary/\x360"}>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h1 className="font-bold text-4xl text-primary md:text-5xl">مشاريع الطلاب</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">مشاريع التخرج وأبحاث الطلاب في أقسام الكلية الثمانية عشر. اختر القسم لعرض مشاريعه فقط.</p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب القسم">
            <button className={department === "" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === ""} onClick={() => navigate({ search: prev => ({ ...prev, dept: undefined }) , resetScroll: false })}>جميع الأقسام<span className="mr-1 opacity-75">(4)</span></button>
            <button className={department === "قسم الحاسوب" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم الحاسوب"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم الحاسوب" }) , resetScroll: false })}>الحاسوب<span className="mr-1 opacity-75">(1)</span></button>
            <button className={department === "قسم الفيزياء" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم الفيزياء"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم الفيزياء" }) , resetScroll: false })}>الفيزياء<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم الكيمياء" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم الكيمياء"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم الكيمياء" }) , resetScroll: false })}>الكيمياء<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم الأحياء" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم الأحياء"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم الأحياء" }) , resetScroll: false })}>الأحياء<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم الرياضيات" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم الرياضيات"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم الرياضيات" }) , resetScroll: false })}>الرياضيات<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم اللغة العربية" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم اللغة العربية"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم اللغة العربية" }) , resetScroll: false })}>اللغة العربية<span className="mr-1 opacity-75">(1)</span></button>
            <button className={department === "قسم اللغة الإنجليزية" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم اللغة الإنجليزية"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم اللغة الإنجليزية" }) , resetScroll: false })}>اللغة الإنجليزية<span className="mr-1 opacity-75">(1)</span></button>
            <button className={department === "قسم علم الاجتماع" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم علم الاجتماع"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم علم الاجتماع" }) , resetScroll: false })}>علم الاجتماع<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم الخدمة الاجتماعية" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم الخدمة الاجتماعية"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم الخدمة الاجتماعية" }) , resetScroll: false })}>الخدمة الاجتماعية<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم التربية وعلم النفس" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم التربية وعلم النفس"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم التربية وعلم النفس" }) , resetScroll: false })}>التربية وعلم النفس<span className="mr-1 opacity-75">(1)</span></button>
            <button className={department === "قسم رياض الأطفال" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم رياض الأطفال"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم رياض الأطفال" }) , resetScroll: false })}>رياض الأطفال<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم الإدارة التعليمية والتخطيط التربوي" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم الإدارة التعليمية والتخطيط التربوي"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم الإدارة التعليمية والتخطيط التربوي" }) , resetScroll: false })}>الإدارة التعليمية والتخطيط التربوي<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم معلم الفصل" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم معلم الفصل"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم معلم الفصل" }) , resetScroll: false })}>معلم الفصل<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم التربية الخاصة" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم التربية الخاصة"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم التربية الخاصة" }) , resetScroll: false })}>التربية الخاصة<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم الدراسات الإسلامية" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم الدراسات الإسلامية"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم الدراسات الإسلامية" }) , resetScroll: false })}>الدراسات الإسلامية<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم الجغرافيا والدراسات البيئية" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم الجغرافيا والدراسات البيئية"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم الجغرافيا والدراسات البيئية" }) , resetScroll: false })}>الجغرافيا والدراسات البيئية<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم التاريخ" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم التاريخ"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم التاريخ" }) , resetScroll: false })}>التاريخ<span className="mr-1 opacity-75">(0)</span></button>
            <button className={department === "قسم التربية البدنية" ? "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border px-3.5 py-1.5 text-sm transition border-primary bg-primary text-primary-foreground font-semibold" : "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 rounded-full border border-input px-3.5 py-1.5 text-sm transition bg-card text-foreground hover:border-primary hover:text-primary"} type="button" aria-pressed={department === "قسم التربية البدنية"} onClick={() => navigate({ search: prev => ({ ...prev, dept: "قسم التربية البدنية" }) , resetScroll: false })}>التربية البدنية<span className="mr-1 opacity-75">(0)</span></button>
          </div>
          <h2 className="mt-8 font-bold text-2xl text-foreground">{department || "جميع الأقسام"} <span className="text-base font-normal text-muted-foreground">({visibleProjects.length} مشروع)</span></h2>
          <form className="mt-5 flex flex-wrap gap-2" onSubmit={event => { event.preventDefault(); navigate({ search: prev => ({ ...prev, q: query || undefined }), resetScroll: false }); }}>
            <label className={"\x73r-only"} htmlFor="department-search">بحث في مشاريع التخرج</label>
            <input className={"min-w-0 flex-1 rounded-md \x62order bg-background px-3 py-2 text-foreground"} id="department-search" type="search" placeholder="عنوان المشروع، الطالب، المشرف، أو الرقم الدراسي" value={query} onChange={event => setQuery(event.target.value)} />
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 h-9 px-4 py-2"} type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</button>
          {search['q'] && <button type="button" className="rounded-md border bg-background px-4 py-2 text-sm" onClick={() => { setQuery(""); navigate({ search: prev => ({ ...prev, q: undefined }), resetScroll: false }); }}>مسح البحث</button>}
          </form>
          {!visibleProjects.length && <p className="mt-6 text-muted-foreground">لا توجد مشاريع مطابقة حالياً.</p>}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link className={"group flex flex-col overflow-hidden rounded-xl \x62order \x62g-card \x73hadow-soft transition \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-lift"} to="/projects/4524aff3-7843-4e12-8281-5800d1312702" hidden={!visibleProjects.some(project => project.id === "4524aff3-7843-4e12-8281-5800d1312702")}>
              <div className={"relative aspect-[16/10] \x62g-secondary"}>
                <div className="flex h-full items-center justify-center">
                  <img className="h-20 w-auto opacity-40" alt="" src="/site-assets/d0f6360e35312736.png" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-2">
                  <span className={"inline-block rounded-full \x62g-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"}>قسم الحاسوب</span>
                  <span className={"inline-block rounded-full \x62g-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"}>2025</span>
                </div>
                <h3 className={"mt-3 font-bold text-lg text-foreground \x67roup-hover:\x74ext-primary"}>نظام ذكي لإدارة الحضور باستخدام التعرف على الوجه</h3>
                <p className={"mt-2 \x6cine-clamp-3 flex-1 text-sm text-muted-foreground"}>تصميم نظام يعتمد على الرؤية الحاسوبية لتسجيل حضور الطلاب آلياً داخل القاعات الدراسية.</p>
                <p className="mt-3 text-xs text-muted-foreground">إعداد: أحمد سالم، محمد علي — إشراف: د. خالد المبروك</p>
                <div className="mt-3 flex gap-3 text-xs font-semibold text-primary" />
              </div>
            </Link>
            <Link className={"group flex flex-col overflow-hidden rounded-xl \x62order \x62g-card \x73hadow-soft transition \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-lift"} to="/projects/0e142180-6db8-4e43-8544-009c54565525" hidden={!visibleProjects.some(project => project.id === "0e142180-6db8-4e43-8544-009c54565525")}>
              <div className={"relative aspect-[16/10] \x62g-secondary"}>
                <div className="flex h-full items-center justify-center">
                  <img className="h-20 w-auto opacity-40" alt="" src="/site-assets/d0f6360e35312736.png" />
                </div>
                <span className={"absolute right-3 top-3 rounded-full \x62g-gold px-2.5 py-0.5 text-xs font-semibold text-gold-foreground"}>★ متميز</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-2">
                  <span className={"inline-block rounded-full \x62g-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"}>قسم التربية وعلم النفس</span>
                  <span className={"inline-block rounded-full \x62g-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"}>2025</span>
                </div>
                <h3 className={"mt-3 font-bold text-lg text-foreground \x67roup-hover:\x74ext-primary"}>أثر الألعاب التعليمية في تنمية مهارات القراءة لدى تلاميذ المرحلة الابتدائية</h3>
                <p className={"mt-2 \x6cine-clamp-3 flex-1 text-sm text-muted-foreground"}>دراسة تجريبية على عينة من تلاميذ الصف الثالث في مدارس بني وليد.</p>
                <p className="mt-3 text-xs text-muted-foreground">إعداد: فاطمة عمر — إشراف: د. سعاد الهادي</p>
                <div className="mt-3 flex gap-3 text-xs font-semibold text-primary" />
              </div>
            </Link>
            <Link className={"group flex flex-col overflow-hidden rounded-xl \x62order \x62g-card \x73hadow-soft transition \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-lift"} to="/projects/443ce1f7-f249-4fec-83e1-3a55a8a8a46b" hidden={!visibleProjects.some(project => project.id === "443ce1f7-f249-4fec-83e1-3a55a8a8a46b")}>
              <div className={"relative aspect-[16/10] \x62g-secondary"}>
                <div className="flex h-full items-center justify-center">
                  <img className="h-20 w-auto opacity-40" alt="" src="/site-assets/d0f6360e35312736.png" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-2">
                  <span className={"inline-block rounded-full \x62g-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"}>قسم اللغة الإنجليزية</span>
                  <span className={"inline-block rounded-full \x62g-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"}>2024</span>
                </div>
                <h3 className={"mt-3 font-bold text-lg text-foreground \x67roup-hover:\x74ext-primary"}>صعوبات تعلم مهارة المحادثة باللغة الإنجليزية</h3>
                <p className={"mt-2 \x6cine-clamp-3 flex-1 text-sm text-muted-foreground"}>تحليل للصعوبات التي يواجهها طلاب المرحلة الثانوية مع مقترحات علاجية.</p>
                <p className="mt-3 text-xs text-muted-foreground">إعداد: مريم عبدالله، هدى صالح — إشراف: د. نوري الطاهر</p>
                <div className="mt-3 flex gap-3 text-xs font-semibold text-primary" />
              </div>
            </Link>
            <Link className={"group flex flex-col overflow-hidden rounded-xl \x62order \x62g-card \x73hadow-soft transition \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-lift"} to="/projects/5da1928f-3f94-4db7-ace1-72e32d2e8638" hidden={!visibleProjects.some(project => project.id === "5da1928f-3f94-4db7-ace1-72e32d2e8638")}>
              <div className={"relative aspect-[16/10] \x62g-secondary"}>
                <div className="flex h-full items-center justify-center">
                  <img className="h-20 w-auto opacity-40" alt="" src="/site-assets/d0f6360e35312736.png" />
                </div>
                <span className={"absolute right-3 top-3 rounded-full \x62g-gold px-2.5 py-0.5 text-xs font-semibold text-gold-foreground"}>★ متميز</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-2">
                  <span className={"inline-block rounded-full \x62g-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"}>قسم اللغة العربية</span>
                  <span className={"inline-block rounded-full \x62g-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"}>2024</span>
                </div>
                <h3 className={"mt-3 font-bold text-lg text-foreground \x67roup-hover:\x74ext-primary"}>الصورة الفنية في شعر الطبيعة الليبي الحديث</h3>
                <p className={"mt-2 \x6cine-clamp-3 flex-1 text-sm text-muted-foreground"}>قراءة نقدية في نماذج مختارة من شعراء ليبيا المعاصرين.</p>
                <p className="mt-3 text-xs text-muted-foreground">إعداد: عائشة محمد — إشراف: د. عبدالسلام فرج</p>
                <div className="mt-3 flex gap-3 text-xs font-semibold text-primary" />
              </div>
            </Link>
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
          <Link className="mt-3 inline-block text-xs underline opacity-70" to="/admin">دخول المشرف</Link>
        </div>
      </footer>
    </>
  );
}
