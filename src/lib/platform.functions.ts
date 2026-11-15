import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { defaultPlatformSettings, validatePlatformSettings, type PlatformSettings } from './platform-settings';

export const getPlatformSettings = createServerFn({ method: 'GET' }).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']!;
  const client = createClient<Database>(process.env['SUPABASE_URL']!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from('platform_settings').select('*').eq('id', 'main').maybeSingle();
  if (error) throw new Error('تعذر تحميل إعدادات المنصة.');
  return data ? validatePlatformSettings(data) : defaultPlatformSettings;
});

export const savePlatformSettings = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: PlatformSettings) => validatePlatformSettings(input))
  .handler(async ({ context, data }) => {
    const { data: admin, error: roleError } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
    if (roleError || !admin) throw new Error('تغيير إعدادات المنصة متاح للمشرف الأول المخوّل فقط.');
    const { data: saved, error } = await context.supabase.from('platform_settings').upsert({ ...data, id: 'main', updated_at: new Date().toISOString() }).select('*').single();
    if (error) throw new Error('تعذر حفظ إعدادات المنصة.');
    return validatePlatformSettings(saved);
  });