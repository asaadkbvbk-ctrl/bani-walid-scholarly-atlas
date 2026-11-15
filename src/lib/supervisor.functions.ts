import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { canAccessAdmin, isSupervisorPosition } from './supervisor-access';

export const getSupervisorAccount = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: roles, error } = await context.supabase.from('user_roles').select('role, supervisor_position').eq('user_id', context.userId);
    if (error) throw new Error('تعذر التحقق من صلاحية الحساب. حاول مجدداً.');
    if (!canAccessAdmin((roles ?? []).map(row => row.role))) return { approved: false as const, profile: null };
    const { data: profile, error: profileError } = await context.supabase.from('profiles').select('display_name, department').eq('id', context.userId).single();
    if (profileError) throw new Error('تعذر تحميل الملف الشخصي.');
    return { approved: true as const, profile, supervisor_position: roles?.find(row => row.role === 'supervisor')?.supervisor_position ?? 'first' };
  });

export const saveSupervisorProfile = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { display_name: string; department: string; supervisor_position: string }) => {
    if (typeof input.display_name !== 'string' || typeof input.department !== 'string' || !input.display_name.trim() || input.display_name.length > 120 || input.department.length > 120) throw new Error('تحقق من الاسم والقسم.');
    if (!isSupervisorPosition(input.supervisor_position)) throw new Error('اختر مشرف أول أو مشرف ثانٍ.');
    return { display_name: input.display_name.trim(), department: input.department.trim(), supervisor_position: input.supervisor_position };
  })
  .handler(async ({ context, data }) => {
    const { data: roles, error } = await context.supabase.from('user_roles').select('role').eq('user_id', context.userId);
    if (error || !canAccessAdmin((roles ?? []).map(row => row.role))) throw new Error('غير مصرح لك بالدخول.');
    if (roles?.some(row => row.role === 'supervisor')) {
      const { error: positionError } = await context.supabase.rpc('set_supervisor_position', { _position: data.supervisor_position });
      if (positionError) throw new Error('تعذر حفظ نوع المشرف.');
    }
    const { data: profile, error: updateError } = await context.supabase.from('profiles').update({ display_name: data.display_name, department: data.department }).eq('id', context.userId).select('display_name, department').single();
    if (updateError) throw new Error('تعذر حفظ الملف الشخصي.');
    return profile;
  });