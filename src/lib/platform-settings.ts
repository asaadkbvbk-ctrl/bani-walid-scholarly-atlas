export const defaultPlatformSettings = {
  platform_name: 'منظومة مشاريع التخرج والخريجين',
  college_name: 'كلية التربية',
  university_name: 'جامعة بني وليد',
  welcome_text: 'مرحبًا بكم في منظومة بيانات الخريجين ومشاريع التخرج',
  introduction: 'منصة تجمع الخبرات، وتحفظ الإنجازات، وتفتح آفاقًا جديدة للتواصل والمعرفة.',
  author_name: 'آية الأمين البوسيفي',
  supervisor_name: 'أ. تجديده الحوسين الهادي',
  location: 'بني وليد - ليبيا',
  guide_url: '/downloads/graduation-projects-guide.pdf',
};
export type PlatformSettings = typeof defaultPlatformSettings;
export function validatePlatformSettings(input: PlatformSettings): PlatformSettings {
  const result = { ...defaultPlatformSettings };
  for (const key of Object.keys(result) as (keyof PlatformSettings)[]) {
    if (typeof input[key] !== 'string' || !input[key].trim() || input[key].length > 2000) throw new Error('تحقق من بيانات المنصة.');
    result[key] = input[key].trim();
  }
  if (!isSafeGuideUrl(result.guide_url)) throw new Error('اختر رابط PDF آمنًا.');
  return result;
}
export function isSafeGuideUrl(value: string) {
  if (value.startsWith('/downloads/') && !value.includes('..') && !value.includes('\\') && value.endsWith('.pdf')) return true;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password && url.pathname.toLowerCase().endsWith('.pdf'); }
  catch { return false; }
}