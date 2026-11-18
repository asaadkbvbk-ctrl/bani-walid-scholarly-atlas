import { createFileRoute, Link } from '@tanstack/react-router';
import { useSuspenseQuery, queryOptions, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@/components/supervisor-session';
import { getSupervisorAccount, saveSupervisorProfile } from '@/lib/supervisor.functions';
import { PlatformSettingsForm } from '@/components/platform-settings-form';
import { platformOptions } from '@/lib/platform-query';
import { catalogOptions, documentsOptions } from '@/lib/project-query';
import { ProjectManager } from '@/components/project-manager';
import { SiteFilesManager } from '@/components/site-files-manager';
import { GraduatesManager } from '@/components/graduates-manager';
import { SupervisorsManager } from '@/components/supervisors-manager';
import { graduatesOptions, siteFilesOptions, supervisorsOptions } from '@/lib/admin-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import capturedCSS from '../../styles/pages/admin.css?raw';

const accountOptions = queryOptions({ queryKey: ['supervisor-account'], queryFn: () => getSupervisorAccount(), staleTime: 0 });
export const Route = createFileRoute('/_authenticated/admin')({
  head: () => ({ meta: [
    { title: 'لوحة المشرف | كلية التربية - جامعة بني وليد' },
    { name: 'description', content: 'الحساب الخاص للمشرف بكلية التربية في جامعة بني وليد.' },
    { property: 'og:title', content: 'لوحة المشرف | كلية التربية - جامعة بني وليد' },
    { property: 'og:description', content: 'الحساب الخاص للمشرف بكلية التربية في جامعة بني وليد.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex' },
  ] }),
  staticData: { importedDocument: { html: { dir: 'rtl', lang: 'ar' } } },
  loader: async ({ context }) => { const [account] = await Promise.all([context.queryClient.ensureQueryData(accountOptions), context.queryClient.ensureQueryData(platformOptions), context.queryClient.ensureQueryData(catalogOptions), context.queryClient.ensureQueryData(graduatesOptions), context.queryClient.ensureQueryData(siteFilesOptions)]); if (account.approved) await context.queryClient.ensureQueryData(documentsOptions); if (account.approved && account.canManage) await context.queryClient.ensureQueryData(supervisorsOptions); },
  component: Admin,
});
function Admin() {
  const { data: account } = useSuspenseQuery(accountOptions);
  const saveProfile = useServerFn(saveSupervisorProfile);
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  return <><style>{capturedCSS}</style>
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
            <Link className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-foreground" to="/stats">إحصائيات الكلية</Link>
            <Link className={"rounded-full \x62order \x62order-primary/\x340 px-3 py-1.5 text-primary transition \x68over:\x62g-secondary"} aria-current="page" to="/admin">لوحة التحكم</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-12" data-ready="true">
        {!account.approved ? <section className="mx-auto max-w-lg py-12"><h1 className="text-3xl font-bold">تعذر فتح حساب المشرف</h1><p className="my-6 text-muted-foreground">تعذر التحقق من صلاحية الحساب. سجّل الدخول مجدداً وحاول مرة أخرى.</p><SignOutButton /></section> : <>
          <h1 className="text-3xl font-bold">لوحة المشرف</h1>
          <p className="mt-3 text-muted-foreground">مرحباً {account.profile?.display_name || 'بالمشرف'} — {account.canManage ? 'مشرف أول — صلاحيات كاملة' : 'مشرف ثانٍ — إدارة المشاريع والملفات'}</p>
          <Tabs defaultValue="projects" dir="rtl" className="mt-8">
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
              <TabsTrigger value="projects">المشاريع</TabsTrigger>
              <TabsTrigger value="files">الملفات</TabsTrigger>
              <TabsTrigger value="graduates">الخريجون</TabsTrigger>
              {account.canManage && <TabsTrigger value="settings">إعدادات المنصة</TabsTrigger>}
              {account.canManage && <TabsTrigger value="supervisors">المشرفون</TabsTrigger>}
              <TabsTrigger value="profile">ملفي</TabsTrigger>
            </TabsList>
            <TabsContent value="projects"><ProjectManager /></TabsContent>
            <TabsContent value="files" className="pt-6"><SiteFilesManager /></TabsContent>
            <TabsContent value="graduates" className="pt-6"><GraduatesManager /></TabsContent>
            {account.canManage && <TabsContent value="settings"><PlatformSettingsForm canManage /></TabsContent>}
            {account.canManage && <TabsContent value="supervisors" className="pt-6"><SupervisorsManager /></TabsContent>}
            <TabsContent value="profile">
          <section className="mt-6 max-w-lg">
            <h2 className="text-xl font-bold">الملف الشخصي</h2>
            <form className="mt-5 space-y-4" onSubmit={async event => {
              event.preventDefault(); setBusy(true); setNotice('');
              const form = new FormData(event.currentTarget);
              try {
                await saveProfile({ data: { display_name: String(form.get('display_name')), department: String(form.get('department')), supervisor_position: String(form.get('supervisor_position')) } });
                await queryClient.invalidateQueries({ queryKey: ['supervisor-account'] });
                setNotice('تم حفظ الملف الشخصي.');
              } catch { setNotice('تعذر حفظ الملف الشخصي. تحقق من صلاحية حسابك وحاول مجدداً.'); }
              finally { setBusy(false); }
            }}>
              <label className="block">اسم المشرف<input name="display_name" required maxLength={120} defaultValue={account.profile?.display_name} className="mt-2 w-full rounded-lg border bg-card px-3 py-2" /></label>
              <label className="block">القسم<input name="department" maxLength={120} defaultValue={account.profile?.department} className="mt-2 w-full rounded-lg border bg-card px-3 py-2" /></label>
              <input type="hidden" name="supervisor_position" value={account.canManage ? 'first' : 'second'} />
              <Button disabled={busy}>{busy ? 'جارٍ الحفظ…' : 'حفظ الملف الشخصي'}</Button>
              {notice && <p role="status" className="text-sm text-muted-foreground">{notice}</p>}
            </form>
          </section>
            </TabsContent>
          </Tabs>
        </>}
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
