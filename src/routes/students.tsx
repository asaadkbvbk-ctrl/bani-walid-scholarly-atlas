import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/students.css?raw";

export const Route = createFileRoute("/students")({
  head: () => ({ meta: [{ title: "مشاريع الطلاب حسب الأقسام | كلية التربية - بني وليد" }] }),
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
            <a className={"rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground \x62g-secondary !text-primary font-semibold"} aria-current="page" href="#">مشاريع التخرج</a>
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/graduates">الخريجين</a>
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/search">البحث المتقدم</a>
            <a className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" href="/stats">إحصائيات الكلية</a>
            <a className={"rounded-full \x62order \x62order-primary/\x340 px-3 py-1.5 text-primary transition \x68over:\x62g-secondary"} href="/admin">لوحة التحكم</a>
          </nav>
        </div>
      </header>
      <main className="min-h-screen">
        <section className={"\x62order-b \x62g-secondary/\x360"}>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h1 className="font-bold text-4xl text-primary md:text-5xl">مشاريع الطلاب</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">مشاريع التخرج وأبحاث الطلاب في أقسام الكلية الثمانية عشر. اختر القسم لعرض مشاريعه فقط.</p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب القسم">
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x73hadow-sm \x68over:\x62g-accent hover:text-accent-foreground h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62order-primary \x62g-primary text-primary-foreground font-semibold"} type="button" aria-pressed="true">جميع الأقسام<span className="mr-1 opacity-75">(4)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الحاسوب<span className="mr-1 opacity-75">(1)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الفيزياء<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الكيمياء<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الأحياء<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الرياضيات<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">اللغة العربية<span className="mr-1 opacity-75">(1)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">اللغة الإنجليزية<span className="mr-1 opacity-75">(1)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">علم الاجتماع<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الخدمة الاجتماعية<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">التربية وعلم النفس<span className="mr-1 opacity-75">(1)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">رياض الأطفال<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الإدارة التعليمية والتخطيط التربوي<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">معلم الفصل<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">التربية الخاصة<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الدراسات الإسلامية<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">الجغرافيا والدراسات البيئية<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">التاريخ<span className="mr-1 opacity-75">(0)</span></button>
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62order-input \x73hadow-sm \x68over:\x62g-accent h-9 rounded-full \x62order px-3.5 py-1.5 text-sm transition \x62g-card text-foreground \x68over:\x62order-primary hover:text-primary"} type="button" aria-pressed="false">التربية البدنية<span className="mr-1 opacity-75">(0)</span></button>
          </div>
          <h2 className="mt-8 font-bold text-2xl text-foreground">جميع الأقسام <span className="text-base font-normal text-muted-foreground">(4 مشروع)</span></h2>
          <form className="mt-5 flex flex-wrap gap-2">
            <label className={"\x73r-only"} htmlFor="department-search">بحث في مشاريع التخرج</label>
            <input className={"min-w-0 flex-1 rounded-md \x62order bg-background px-3 py-2 text-foreground"} id="department-search" type="search" placeholder="عنوان المشروع، الطالب، المشرف، أو الرقم الدراسي" defaultValue="" />
            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors \x66ocus-visible:\x6futline-none \x66ocus-visible:\x72ing-1 \x66ocus-visible:\x72ing-ring \x64isabled:\x70ointer-events-none disabled:opacity-50 \x64isabled:\x63ursor-not-allowed [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73ize-4 [&\x5fsvg]:\x73hrink-0 \x62g-primary text-primary-foreground \x73hadow \x68over:\x62g-primary/\x390 h-9 px-4 py-2"} type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>بحث</button>
          </form>
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
