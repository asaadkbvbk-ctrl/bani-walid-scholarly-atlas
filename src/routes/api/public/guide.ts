import { createFileRoute } from '@tanstack/react-router';
import { attachment, servePublicFile } from '@/lib/public-file';

// Public read-only: the PDF marked as platform guide, else the bundled default guide.
export const Route = createFileRoute('/api/public/guide')({
  server: { handlers: { GET: async ({ request }) => {
    try { const res = await servePublicFile({ guide: true }); if (res) return res; }
    catch (e) { console.error('guide lookup failed', e); }
    const fallback = await fetch(new URL('/downloads/graduation-projects-guide.pdf', request.url));
    if (!fallback.ok) return new Response('الدليل غير متوفر حالياً', { status: 404 });
    return attachment(await fallback.arrayBuffer(), 'دليل-مشاريع-التخرج.pdf', 'application/pdf');
  } } },
});
