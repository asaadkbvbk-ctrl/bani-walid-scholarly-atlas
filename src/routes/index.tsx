import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import capturedCSS from "../styles/site.css?raw";

const searchableProjects = [
  { id: "4524aff3-7843-4e12-8281-5800d1312702", department: "قسم الحاسوب", title: "نظام ذكي لإدارة الحضور باستخدام التعرف على الوجه", people: "أحمد سالم، محمد علي — إشراف: د. خالد المبروك" },
  { id: "0e142180-6db8-4e43-8544-009c54565525", department: "قسم التربية وعلم النفس", title: "أثر الألعاب التعليمية في تنمية مهارات القراءة لدى تلاميذ المرحلة الابتدائية", people: "فاطمة عمر — إشراف: د. سعاد الهادي" },
  { id: "443ce1f7-f249-4fec-83e1-3a55a8a8a46b", department: "قسم اللغة الإنجليزية", title: "صعوبات تعلم مهارة المحادثة باللغة الإنجليزية", people: "مريم عبدالله، هدى صالح — إشراف: د. نوري الطاهر" },
  { id: "5da1928f-3f94-4db7-ace1-72e32d2e8638", department: "قسم اللغة العربية", title: "الصورة الفنية في شعر الطبيعة الليبي الحديث", people: "عائشة محمد — إشراف: د. عبدالسلام فرج" },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "منظومة مشاريع التخرج والخريجين | كلية التربية - جامعة بني وليد" },
    { name: "description", content: "مشاريع التخرج وبيانات الخريجين وأقسام كلية التربية بجامعة بني وليد." },
    { property: "og:title", content: "منظومة مشاريع التخرج والخريجين | جامعة بني وليد" },
    { property: "og:description", content: "مشاريع التخرج وبيانات الخريجين وأقسام كلية التربية بجامعة بني وليد." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  staticData: { importedDocument: { html: { "dir": "rtl", "lang": "ar" }, body: {  } } },
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const results = searchableProjects.filter(project =>
    `${project.title} ${project.department} ${project.people}`.includes(query.trim()),
  );
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
          <a className="flex items-center gap-3" aria-current="page" href="/">
            <img className="h-12 w-auto" src="/site-assets/d0f6360e35312736.png" alt="شعار كلية التربية - جامعة بني وليد" />
            <span className="leading-tight">
              <span className="block font-bold text-lg text-foreground">كلية التربية</span>
              <span className="block text-xs text-muted-foreground">جامعة بني وليد</span>
            </span>
          </a>
          <nav className="flex flex-wrap gap-1 text-sm">
            <a className={"rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground \x62g-secondary !text-primary font-semibold"} aria-current="page" href="/">الرئيسية</a>
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/students">مشاريع التخرج</a>
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/graduates">الخريجين</a>
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/search">البحث المتقدم</a>
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/stats">إحصائيات الكلية</a>
            <a className={"rounded-full \x62order \x62order-primary/\x340 px-3 py-1.5 text-primary transition \x68over:\x62g-secondary"} href="/admin">لوحة التحكم</a>
          </nav>
        </div>
      </header>
      <main className="min-h-screen">
        <section className="relative z-20">
          <div className="absolute inset-0 overflow-hidden">
            <img className="h-full w-full object-cover" src="/site-assets/00fd94bb2086ccd2.jpg" alt="مكتبة أكاديمية" width="1600" height="900" />
            <div className="hero-overlay absolute inset-0" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
            <p className="text-sm font-semibold text-gold">كلية التربية - جامعة بني وليد</p>
            <h1 className={"mt-3 max-w-3xl \x66ont-display text-4xl leading-tight text-primary-foreground md:text-5xl"}>منظومة مشاريع التخرج والخريجين</h1>
            <p className="mt-5 max-w-2xl text-xl font-bold text-primary-foreground">مرحبًا بكم في منظومة بيانات الخريجين ومشاريع التخرج</p>
            <p className={"mt-2 max-w-2xl text-lg leading-loose \x74ext-primary-foreground/\x385"}>منصة تجمع الخبرات، وتحفظ الإنجازات، وتفتح آفاقًا جديدة للتواصل والمعرفة.</p>
            <div className="relative mt-8 max-w-2xl" onKeyDown={event => {
              if (event.key === "Escape") {
                setQuery("");
                searchInput.current?.focus();
              }
            }}>
              <label className={"\x73r-only"} htmlFor="quick-search">البحث السريع</label>
              <div className={"flex items-center gap-2 rounded-xl \x62g-card p-2 \x73hadow-lift"}>
                <svg className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input className={"w-full bg-transparent px-2 py-2 text-foreground \x70laceholder:\x74ext-muted-foreground \x66ocus:\x6futline-none"} ref={searchInput} id="quick-search" type="search" placeholder="ابحث بعنوان المشروع، اسم الطالب، المشرف، أو القسم..." value={query} onChange={event => setQuery(event.target.value)} aria-expanded={Boolean(query.trim())} aria-controls="quick-search-results" />
              </div>
              {query.trim() && <div id="quick-search-results" className="absolute inset-x-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-xl border bg-popover shadow-lift" aria-live="polite">
                {results.length ? <ul className="divide-y">{results.map(project => <li key={project.id}>
                  <a className="block p-4 transition hover:bg-secondary" href={`/projects/${project.id}`}>
                    <span className="text-xs font-semibold text-primary">{project.department}</span>
                    <p className="font-semibold text-popover-foreground">{project.title}</p>
                    <p className="text-sm text-muted-foreground">{project.people}</p>
                  </a>
                </li>)}</ul> : <p className="p-4 text-sm text-muted-foreground">لا توجد نتائج مطابقة لعبارة «{query}».</p>}
              </div>}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className={"rounded-lg \x62g-gold px-5 py-3 font-semibold text-gold-foreground"} href="/students">تصفّح جميع المشاريع</a>
            </div>
          </div>
        </section>
        <section className="relative z-30 mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-4 px-4 md:grid-cols-4">
          <div className={"rounded-xl \x62order \x62order-t-4 \x62order-t-gold \x62g-card p-6 text-center \x73hadow-lift"}>
            <div className="font-sans text-5xl font-bold text-primary">4</div>
            <div className="mt-2 text-base font-semibold text-foreground">مشروع منشور</div>
          </div>
          <div className={"rounded-xl \x62order \x62order-t-4 \x62order-t-gold \x62g-card p-6 text-center \x73hadow-lift"}>
            <div className="font-sans text-5xl font-bold text-primary">0</div>
            <div className="mt-2 text-base font-semibold text-foreground">خريج مسجل</div>
          </div>
          <div className={"rounded-xl \x62order \x62order-t-4 \x62order-t-gold \x62g-card p-6 text-center \x73hadow-lift"}>
            <div className="font-sans text-5xl font-bold text-primary">4</div>
            <div className="mt-2 text-base font-semibold text-foreground">قسم مشارك</div>
          </div>
          <div className={"rounded-xl \x62order \x62order-t-4 \x62order-t-gold \x62g-card p-6 text-center \x73hadow-lift"}>
            <div className="font-sans text-5xl font-bold text-primary">0</div>
            <div className="mt-2 text-base font-semibold text-foreground">ملف PDF متاح</div>
          </div>
        </section>
        <ImportedSection />
        <ImportedSection2 />
        <ImportedSection3 />
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

function ImportedSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 pt-16 md:grid-cols-2">
      <div className={"rounded-xl \x62order \x62g-card p-6 \x73hadow-soft"}>
        <h2 className="font-bold text-2xl text-primary">تعريف المنظومة</h2>
        <p className="mt-3 text-base leading-loose text-foreground">منظومة إلكترونية تهدف إلى تنظيم وحفظ بيانات خريجي كلية التربية ومشاريع تخرجهم، وإتاحتها بطريقة سهلة وموثوقة. وتوفّر المنظومة قاعدة بيانات موحّدة تساعد على الوصول إلى المعلومات، ومتابعة المشاريع، وإبراز نتاج الطلبة العلمي، بما يدعم التواصل مع الخريجين والاستفادة من خبراتهم ومشاريعهم.</p>
      </div>
      <div className={"rounded-xl \x62order \x62g-card p-6 \x73hadow-soft"}>
        <h2 className="font-bold text-2xl text-primary">أهداف المنظومة</h2>
        <ul className={"mt-3 \x73pace-y-2 text-base leading-relaxed text-foreground"}>
          <li className="flex gap-2"><span className={"mt-2 h-2 w-2 shrink-0 rounded-full \x62g-gold"} />إنشاء قاعدة بيانات محدثة ومنظمة للخريجين.</li>
          <li className="flex gap-2"><span className={"mt-2 h-2 w-2 shrink-0 rounded-full \x62g-gold"} />حفظ مشاريع التخرج وتصنيفها حسب التخصص والفصل الدراسي.</li>
          <li className="flex gap-2"><span className={"mt-2 h-2 w-2 shrink-0 rounded-full \x62g-gold"} />تسهيل البحث عن بيانات الخريجين والمشاريع والوصول إليها.</li>
          <li className="flex gap-2"><span className={"mt-2 h-2 w-2 shrink-0 rounded-full \x62g-gold"} />إبراز إنجازات الطلبة وتشجيع تبادل المعرفة والأفكار.</li>
          <li className="flex gap-2"><span className={"mt-2 h-2 w-2 shrink-0 rounded-full \x62g-gold"} />دعم التواصل بين المؤسسة وخريجيها.</li>
          <li className="flex gap-2"><span className={"mt-2 h-2 w-2 shrink-0 rounded-full \x62g-gold"} />توفير معلومات موثوقة تساعد في إعداد التقارير والتخطيط والتطوير.</li>
        </ul>
      </div>
    </section>
  );
}

function ImportedSection2() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16">
      <h2 className="font-bold text-3xl text-foreground">أقسام الكلية</h2>
      <p className="mt-2 text-muted-foreground">اختر القسم لعرض مشاريع طلابه فقط.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">الحاسوب</span>
          <span className="mt-3 text-sm text-primary">1 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم الحاسوب" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D8%AD%D8%A7%D8%B3%D9%88%D8%A8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">الفيزياء</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم الفيزياء" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D9%81%D9%8A%D8%B2%D9%8A%D8%A7%D8%A1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">الكيمياء</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم الكيمياء" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D9%83%D9%8A%D9%85%D9%8A%D8%A7%D8%A1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">الأحياء</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم الأحياء" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D8%A3%D8%AD%D9%8A%D8%A7%D8%A1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">الرياضيات</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم الرياضيات" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">اللغة العربية</span>
          <span className="mt-3 text-sm text-primary">1 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم اللغة العربية" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D9%84%D8%BA%D8%A9+%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">اللغة الإنجليزية</span>
          <span className="mt-3 text-sm text-primary">1 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم اللغة الإنجليزية" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D9%84%D8%BA%D8%A9+%D8%A7%D9%84%D8%A5%D9%86%D8%AC%D9%84%D9%8A%D8%B2%D9%8A%D8%A9"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">علم الاجتماع</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم علم الاجتماع" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%B9%D9%84%D9%85+%D8%A7%D9%84%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">الخدمة الاجتماعية</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم الخدمة الاجتماعية" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A9+%D8%A7%D9%84%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%D9%8A%D8%A9"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">التربية وعلم النفس</span>
          <span className="mt-3 text-sm text-primary">1 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم التربية وعلم النفس" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%8A%D8%A9+%D9%88%D8%B9%D9%84%D9%85+%D8%A7%D9%84%D9%86%D9%81%D8%B3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">رياض الأطفال</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم رياض الأطفال" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%B1%D9%8A%D8%A7%D8%B6+%D8%A7%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">الإدارة التعليمية والتخطيط التربوي</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم الإدارة التعليمية والتخطيط التربوي" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9+%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%D9%8A%D8%A9+%D9%88%D8%A7%D9%84%D8%AA%D8%AE%D8%B7%D9%8A%D8%B7+%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%88%D9%8A"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">معلم الفصل</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم معلم الفصل" href="/students?dept=%D9%82%D8%B3%D9%85+%D9%85%D8%B9%D9%84%D9%85+%D8%A7%D9%84%D9%81%D8%B5%D9%84"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">التربية الخاصة</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم التربية الخاصة" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%8A%D8%A9+%D8%A7%D9%84%D8%AE%D8%A7%D8%B5%D8%A9"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">الدراسات الإسلامية</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم الدراسات الإسلامية" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D8%AF%D8%B1%D8%A7%D8%B3%D8%A7%D8%AA+%D8%A7%D9%84%D8%A5%D8%B3%D9%84%D8%A7%D9%85%D9%8A%D8%A9"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">الجغرافيا والدراسات البيئية</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم الجغرافيا والدراسات البيئية" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D8%AC%D8%BA%D8%B1%D8%A7%D9%81%D9%8A%D8%A7+%D9%88%D8%A7%D9%84%D8%AF%D8%B1%D8%A7%D8%B3%D8%A7%D8%AA+%D8%A7%D9%84%D8%A8%D9%8A%D8%A6%D9%8A%D8%A9"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">التاريخ</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم التاريخ" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
        <article className={"flex flex-col justify-between rounded-lg \x62order \x62g-card p-4 \x73hadow-soft"}>
          <span className="font-semibold leading-snug text-foreground">التربية البدنية</span>
          <span className="mt-3 text-sm text-primary">0 مشروع</span>
          <a className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order \x62order-input bg-background \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 px-4 py-2 mt-3 w-full"} aria-label="بحث في قسم التربية البدنية" href="/students?dept=%D9%82%D8%B3%D9%85+%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%8A%D8%A9+%D8%A7%D9%84%D8%A8%D8%AF%D9%86%D9%8A%D8%A9"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</a>
        </article>
      </div>
    </section>
  );
}

function ImportedSection3() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16">
      <div className="flex items-end justify-between gap-3">
        <h2 className="font-bold text-3xl text-foreground">أحدث المشاريع</h2>
        <a className={"text-sm font-semibold text-primary \x68over:\x75nderline"} href="/students">عرض الكل ←</a>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <a className={"group flex flex-col overflow-hidden rounded-xl \x62order \x62g-card \x73hadow-soft transition \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-lift"} href="/projects/4524aff3-7843-4e12-8281-5800d1312702">
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
        </a>
        <a className={"group flex flex-col overflow-hidden rounded-xl \x62order \x62g-card \x73hadow-soft transition \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-lift"} href="/projects/0e142180-6db8-4e43-8544-009c54565525">
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
        </a>
        <a className={"group flex flex-col overflow-hidden rounded-xl \x62order \x62g-card \x73hadow-soft transition \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-lift"} href="/projects/443ce1f7-f249-4fec-83e1-3a55a8a8a46b">
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
        </a>
        <a className={"group flex flex-col overflow-hidden rounded-xl \x62order \x62g-card \x73hadow-soft transition \x68over:\x2dtranslate-y-0.\x35 \x68over:\x73hadow-lift"} href="/projects/5da1928f-3f94-4db7-ace1-72e32d2e8638">
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
        </a>
      </div>
    </section>
  );
}
