import { createServerFn } from '@tanstack/react-start';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { Database } from '@/integrations/supabase/types';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { canAccessAdmin, canManagePlatform } from './supervisor-access';
import { graduateSchema, MAX_IMPORT_ROWS, validateSiteFile } from './graduates';

function publicClient() {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']!;
  return createClient<Database>(process.env['SUPABASE_URL']!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const h = new Headers(init?.headers);
      if (key.startsWith('sb_') && h.get('Authorization') === `Bearer ${key}`) h.delete('Authorization');
      h.set('apikey', key); return fetch(input, { ...init, headers: h });
    } },
  });
}
async function roles(client: SupabaseClient<Database>, userId: string) {
  const { data, error } = await client.from('user_roles').select('role').eq('user_id', userId);
  if (error) throw new Error('تعذر التحقق من الصلاحية.');
  return (data ?? []).map(r => r.role);
}
async function requireSupervisor(client: SupabaseClient<Database>, userId: string) {
  if (!canAccessAdmin(await roles(client, userId))) throw new Error('هذه العملية متاحة للمشرفين فقط.');
}
async function requireAdmin(client: SupabaseClient<Database>, userId: string) {
  if (!canManagePlatform(await roles(client, userId))) throw new Error('هذه العملية متاحة للمشرف الأول فقط.');
}

// Graduates
export const getGraduates = createServerFn({ method: 'GET' }).handler(async () => {
  const { data, error } = await publicClient().from('graduates').select('id,full_name,department,graduation_year,project_title').order('graduation_year', { ascending: false }).order('full_name');
  if (error) throw new Error('تعذر تحميل الخريجين.');
  return data ?? [];
});
export const saveGraduate = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => graduateSchema.extend({ id: z.string().uuid().optional() }).parse(i))
  .handler(async ({ context, data }) => {
    await requireSupervisor(context.supabase, context.userId);
    const { id, ...row } = data;
    const q = id ? context.supabase.from('graduates').update(row).eq('id', id) : context.supabase.from('graduates').insert(row);
    const { error } = await q;
    if (error) throw new Error('تعذر حفظ بيانات الخريج.');
    return { ok: true };
  });
export const importGraduates = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ rows: z.array(graduateSchema).min(1).max(MAX_IMPORT_ROWS) }).parse(i))
  .handler(async ({ context, data }) => {
    await requireSupervisor(context.supabase, context.userId);
    const { error } = await context.supabase.from('graduates').insert(data.rows);
    if (error) throw new Error('تعذر استيراد الخريجين.');
    return { count: data.rows.length };
  });
export const deleteGraduate = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await requireSupervisor(context.supabase, context.userId);
    const { error } = await context.supabase.from('graduates').delete().eq('id', data.id);
    if (error) throw new Error('تعذر حذف الخريج.');
    return { ok: true };
  });

// Public files (guides, Excel sheets)
export const getSiteFiles = createServerFn({ method: 'GET' }).handler(async () => {
  const { data, error } = await publicClient().from('site_files').select('id,name,path,size,mime,is_guide,created_at').order('created_at', { ascending: false });
  if (error) throw new Error('تعذر تحميل الملفات.');
  return data ?? [];
});
export const registerSiteFile = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ name: z.string().min(1).max(200), path: z.string().min(1).max(400).regex(/^[\w-]+\/[\w.-]+$/), size: z.number().int().positive(), mime: z.string().max(200) }).parse(i))
  .handler(async ({ context, data }) => {
    await requireSupervisor(context.supabase, context.userId);
    const problem = validateSiteFile(data);
    if (problem) throw new Error(problem);
    const { error } = await context.supabase.from('site_files').insert(data);
    if (error) throw new Error('تعذر تسجيل الملف.');
    return { ok: true };
  });
export const setGuideFile = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid().nullable() }).parse(i))
  .handler(async ({ context, data }) => {
    await requireSupervisor(context.supabase, context.userId);
    const { error: clearError } = await context.supabase.from('site_files').update({ is_guide: false }).eq('is_guide', true);
    if (clearError) throw new Error('تعذر تحديث الدليل.');
    if (data.id) {
      const { data: file } = await context.supabase.from('site_files').select('name').eq('id', data.id).single();
      if (!file?.name.toLowerCase().endsWith('.pdf')) throw new Error('الدليل يجب أن يكون ملف PDF.');
      const { error } = await context.supabase.from('site_files').update({ is_guide: true }).eq('id', data.id);
      if (error) throw new Error('تعذر تحديث الدليل.');
    }
    return { ok: true };
  });
export const deleteSiteFile = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await requireSupervisor(context.supabase, context.userId);
    const { data: file, error } = await context.supabase.from('site_files').select('path').eq('id', data.id).single();
    if (error || !file) throw new Error('الملف غير موجود.');
    const { error: storageError } = await context.supabase.storage.from('public-files').remove([file.path]);
    if (storageError) throw new Error('تعذر حذف الملف من التخزين.');
    const { error: rowError } = await context.supabase.from('site_files').delete().eq('id', data.id);
    if (rowError) throw new Error('تعذر حذف الملف.');
    return { ok: true };
  });

// Supervisors (first supervisor only)
export const listSupervisors = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  await requireAdmin(context.supabase, context.userId);
  const { data, error } = await context.supabase.rpc('list_supervisors');
  if (error) throw new Error('تعذر تحميل المشرفين.');
  return (data ?? []).map(s => ({ ...s, is_self: s.user_id === context.userId }));
});
export const setSupervisorAdmin = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ userId: z.string().uuid(), grant: z.boolean() }).parse(i))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.rpc('set_supervisor_admin', { _user_id: data.userId, _grant: data.grant });
    if (error) throw new Error('تعذر تغيير صلاحية المشرف.');
    return { ok: true };
  });
export const removeSupervisor = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ userId: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await requireAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.rpc('remove_supervisor', { _user_id: data.userId });
    if (error) throw new Error('تعذر إزالة المشرف.');
    return { ok: true };
  });
