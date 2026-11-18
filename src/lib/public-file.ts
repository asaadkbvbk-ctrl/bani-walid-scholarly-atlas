// Server-only: streams a file listed in site_files. Storage itself is closed to visitors.
export async function servePublicFile(where: { id?: string; guide?: boolean }) {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  let q = supabaseAdmin.from('site_files').select('name,path,mime');
  q = where.guide ? q.eq('is_guide', true) : q.eq('id', where.id!);
  const { data: row } = await q.maybeSingle();
  if (!row) return null;
  const { data: blob } = await supabaseAdmin.storage.from('public-files').download(row.path);
  if (!blob?.size) return null;
  return attachment(await blob.arrayBuffer(), row.name, row.mime || 'application/octet-stream');
}
export function attachment(body: ArrayBuffer, name: string, type: string) {
  const ascii = name.replace(/[^\w.-]/g, '_') || 'file';
  return new Response(body, { headers: {
    'Content-Type': type,
    'Content-Disposition': `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`,
    'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
  } });
}
