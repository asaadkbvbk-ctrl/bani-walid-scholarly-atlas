import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { servePublicFile } from '@/lib/public-file.server';

// Public read-only: only files a supervisor published in the files list can be downloaded.
export const Route = createFileRoute('/api/public/files/$fileId')({
  server: { handlers: { GET: async ({ params }) => {
    const id = z.string().uuid().safeParse(params.fileId);
    if (!id.success) return new Response('Not found', { status: 404 });
    const res = await servePublicFile({ id: id.data });
    return res ?? new Response('Not found', { status: 404 });
  } } },
});
