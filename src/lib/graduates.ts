import { z } from 'zod';

export const graduateSchema = z.object({
  full_name: z.string().trim().min(1, 'الاسم مطلوب').max(160),
  department: z.string().trim().max(120).default(''),
  graduation_year: z.string().trim().max(10).default(''),
  project_title: z.string().trim().max(300).default(''),
});
export type GraduateInput = z.infer<typeof graduateSchema>;
export const MAX_IMPORT_ROWS = 2000;

export const excelHeaders = { full_name: 'الاسم', department: 'القسم', graduation_year: 'سنة التخرج', project_title: 'عنوان المشروع' } as const;
const aliases: Record<keyof GraduateInput, string[]> = {
  full_name: ['الاسم', 'اسم الخريج', 'الاسم الكامل', 'name', 'full_name'],
  department: ['القسم', 'department'],
  graduation_year: ['سنة التخرج', 'السنة', 'year', 'graduation_year'],
  project_title: ['عنوان المشروع', 'المشروع', 'project', 'project_title'],
};

/** Maps spreadsheet rows (header → value) into validated graduates and a list of rejected row numbers. */
export function parseGraduateRows(rows: Record<string, unknown>[]) {
  const valid: GraduateInput[] = [];
  const rejected: { row: number; reason: string }[] = [];
  rows.slice(0, MAX_IMPORT_ROWS).forEach((raw, index) => {
    const normalized = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k.trim().toLowerCase(), v]));
    const pick = (key: keyof GraduateInput) => {
      const found = aliases[key].find(alias => normalized[alias.toLowerCase()] !== undefined);
      return found ? String(normalized[found.toLowerCase()] ?? '') : '';
    };
    const result = graduateSchema.safeParse({ full_name: pick('full_name'), department: pick('department'), graduation_year: pick('graduation_year'), project_title: pick('project_title') });
    if (result.success) valid.push(result.data);
    else rejected.push({ row: index + 2, reason: result.error.issues[0]?.message ?? 'بيانات غير صالحة' });
  });
  if (rows.length > MAX_IMPORT_ROWS) rejected.push({ row: MAX_IMPORT_ROWS + 2, reason: `الحد الأقصى ${MAX_IMPORT_ROWS} صف في المرة الواحدة` });
  return { valid, rejected };
}

export function validateSiteFile(file: { name: string; size: number }) {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!['pdf', 'xls', 'xlsx'].includes(ext)) return 'يُسمح بملفات PDF وExcel فقط.';
  if (file.size <= 0 || file.size > 20 * 1024 * 1024) return 'حجم الملف يجب أن يكون أقل من 20 ميغابايت.';
  return null;
}
