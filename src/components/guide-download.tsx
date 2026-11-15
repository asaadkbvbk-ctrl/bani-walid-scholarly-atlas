import { useEffect, useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GuideDownload({ url }: { url: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setFile(null); setError(false);
    void fetch(url, { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('download');
      const blob = await response.blob();
      if (!blob.size || (await blob.slice(0, 5).text()) !== '%PDF-') throw new Error('pdf');
      if (!controller.signal.aborted) setFile(new File([blob], 'دليل-مشاريع-التخرج.pdf', { type: 'application/pdf' }));
    }).catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, [url]);
  const download = async () => {
    if (!file) return;
    if (matchMedia('(pointer: coarse)').matches && navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'دليل مشاريع التخرج' }); return; }
      catch (e) { if ((e as DOMException).name === 'AbortError') return; }
    }
    const blobUrl = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = blobUrl; anchor.download = file.name;
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);
  };
  return <div className="flex flex-wrap items-center gap-3">
    <Button type="button" variant="outline" className="h-auto border-gold bg-transparent px-5 py-3 text-primary-foreground hover:bg-gold hover:text-gold-foreground" disabled={!file} onClick={() => void download()}><Download />{error ? 'تعذر تجهيز الدليل' : file ? 'تحميل دليل مشاريع التخرج' : 'جارٍ تجهيز الدليل…'}</Button>
    {error && <Button asChild variant="outline"><a href={url} target="_blank" rel="noopener noreferrer"><ExternalLink />فتح الدليل</a></Button>}
  </div>;
}