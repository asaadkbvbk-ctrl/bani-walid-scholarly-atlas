import { Download } from 'lucide-react';

// Same-origin link + attachment header: saves the PDF immediately on phones and computers.
export function GuideDownload(_props: { url?: string }) {
  return <a href="/api/public/guide" download="دليل-مشاريع-التخرج.pdf"
    className="inline-flex items-center gap-2 rounded-md border border-gold px-5 py-3 font-medium text-primary-foreground transition hover:bg-gold hover:text-gold-foreground">
    <Download className="h-4 w-4" />تحميل دليل مشاريع التخرج
  </a>;
}
