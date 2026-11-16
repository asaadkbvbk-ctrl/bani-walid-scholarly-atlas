import { createServerFn } from '@tanstack/react-start';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { Database } from '@/integrations/supabase/types';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { canAccessAdmin } from './supervisor-access';
import { mergeCatalog, projectSchema, validateDocument } from './project-management';
import { capturedProjects } from './captured-projects';

async function requireSupervisor(client: SupabaseClient<Database>, userId: string) {
  const { data, error } = await client.from('user_roles').select('role').eq('user_id', userId);
  if (error || !canAccessAdmin((data ?? []).map(r => r.role))) throw new Error('هذه العملية متاحة للمشرفين فقط.');
}
export const getProjectCatalog = createServerFn({ method: 'GET' }).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']!;
  const client = createClient<Database>(process.env['SUPABASE_URL']!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
      headers.set('apikey', key); return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from('managed_projects').select('id,title,department,people,year,semester,summary,deleted');
  if (error) throw new Error('تعذر تحميل المشاريع.');
  return mergeCatalog(data ?? []);
});
export const getProjectDocuments = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  await requireSupervisor(context.supabase, context.userId);
  const { data, error } = await context.supabase.from('project_documents').select('*').order('created_at', { ascending: false });
  if (error) throw new Error('تعذر تحميل الملفات.');
  return data ?? [];
});
export const saveProject = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => projectSchema.parse(input)).handler(async ({ context, data }) => {
    await requireSupervisor(context.supabase, context.userId);
    const payload: Database['public']['Tables']['managed_projects']['Insert'] = {
      title: data.title, department: data.department, people: data.people,
      year: data.year, semester: data.semester, summary: data.summary,
      deleted: false, updated_at: new Date().toISOString(),
    };
    if (data.id) payload.id = data.id;
    const { data: saved, error } = await context.supabase.from('managed_projects').upsert(payload).select().single();
    if (error) throw new Error('تعذر حفظ المشروع.');
    return saved;
  });
const idSchema = z.object({ id: z.string().uuid() });
export const deleteProject = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => idSchema.parse(input)).handler(async ({ context, data }) => {
    await requireSupervisor(context.supabase, context.userId);
    const { data: files, error: readError } = await context.supabase.from('project_documents').select('path').eq('project_id', data.id);
    if (readError) throw new Error('تعذر قراءة ملفات المشروع.');
    if (files?.length) {
      const { error } = await context.supabase.storage.from('project-documents').remove(files.map(f => f.path));
      if (error) throw new Error('تعذر حذف الملفات. لم يُحذف المشروع.');
    }
    const { error: fileError } = await context.supabase.from('project_documents').delete().eq('project_id', data.id);
    if (fileError) throw new Error('تعذر حذف سجلات الملفات.');
    const original = capturedProjects.find(p => p.id === data.id);
    const result = original
      ? await context.supabase.from('managed_projects').upsert({
          id: original.id, title: original.title, department: original.department,
          people: original.people, year: original.year, semester: '',
          summary: original.summary, deleted: true, updated_at: new Date().toISOString(),
        })
      : await context.supabase.from('managed_projects').update({ deleted: true, updated_at: new Date().toISOString() }).eq('id', data.id);
    if (result.error) throw new Error('تعذر حذف المشروع.');
    return { ok: true };
  });
export const registerDocument = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ project_id: z.string().uuid(), name: z.string().min(1).max(255), path: z.string().max(500), size: z.number().int().positive() }).parse(input))
  .handler(async ({ context, data }) => {
    await requireSupervisor(context.supabase, context.userId);
    const { extension, mime } = validateDocument(data.name, data.size);
    if (!data.path.startsWith(`${context.userId}/${data.project_id}/`) || !data.path.endsWith(`.${extension}`)) throw new Error('مسار الملف غير صالح.');
    const { data: project } = await context.supabase.from('managed_projects').select('id').eq('id', data.project_id).eq('deleted', false).maybeSingle();
    if (!project) throw new Error('احفظ المشروع قبل رفع الملف.');
    const { data: file, error: infoError } = await context.supabase.storage.from('project-documents').info(data.path);
    if (infoError || !file || Number(file.metadata?.size) !== data.size) throw new Error('تعذر التحقق من الملف المرفوع.');
    const { error } = await context.supabase.from('project_documents').insert({ ...data, mime });
    if (error) throw new Error('تعذر حفظ بيانات الملف.');
    return { ok: true };
  });
export const deleteDocument = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => idSchema.parse(input)).handler(async ({ context, data }) => {
    await requireSupervisor(context.supabase, context.userId);
    const { data: file, error } = await context.supabase.from('project_documents').select('path').eq('id', data.id).single();
    if (error) throw new Error('الملف غير موجود.');
    const { error: storageError } = await context.supabase.storage.from('project-documents').remove([file.path]);
    if (storageError) throw new Error('تعذر حذف الملف.');
    const { error: rowError } = await context.supabase.from('project_documents').delete().eq('id', data.id);
    if (rowError) throw new Error('تعذر حذف بيانات الملف.');
    return { ok: true };
  });