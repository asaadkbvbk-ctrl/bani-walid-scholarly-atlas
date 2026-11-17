import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const FILENAME = 'دليل-مشاريع-التخرج.pdf';
function attachment(body: BodyInit, name: string) {
  return new Response(body, { headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="graduation-guide.pdf"; filename*=UTF-8''${encodeURIComponent(name)}`,
    'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
  } });
}

// Public read-only: returns the PDF marked as the platform guide, or the bundled default guide.
export const Route = createFileRoute('/api/public/guide')({
  server: { handlers: { GET: async ({ request }) => {
    try {
      const key = process.env['SUPABASE_PUBLISHABLE_KEY']!;
      const client = createClient<Database>(process.env['SUPABASE_URL']!, key, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith('sb_') && h.get('Authorization') === `Bearer ${key}`) h.delete('Authorization');
          h.set('apikey', key); return fetch(input, { ...init, headers: h });
        } },
      });
      const { data: row } = await client.from('site_files').select('name,path').eq('is_guide', true).maybeSingle();
      if (row) {
        const { data: blob } = await client.storage.from('public-files').download(row.path);
        if (blob?.size) return attachment(await blob.arrayBuffer(), row.name || FILENAME);
      }
    } catch (e) { console.error('guide lookup failed', e); }
    const fallback = await fetch(new URL('/downloads/graduation-projects-guide.pdf', request.url));
    if (!fallback.ok) return new Response('الدليل غير متوفر حالياً', { status: 404 });
    return attachment(await fallback.arrayBuffer(), FILENAME);
  } } },
});
