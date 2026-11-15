import { z } from 'zod';
import { capturedProjects, type ProjectFilters } from './captured-projects';

export const projectSchema = z.object({
  id: z.string().uuid().optional(), title: z.string().trim().min(1).max(300),
  department: z.string().trim().min(1).max(120), people: z.string().trim().max(500),
  year: z.string().regex(/^\d{4}$/), semester: z.string().max(40), summary: z.string().trim().max(5000),
});
export type ProjectInput = z.infer<typeof projectSchema>;
export type CatalogProject = ProjectInput & { id: string; deleted: boolean };
export const documentTypes: Record<string, string> = {
  pdf: 'application/pdf', xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};
export function validateDocument(name: string, size: number) {
  const extension = name.split('.').pop()?.toLowerCase() ?? '';
  if (!documentTypes[extension] || size <= 0 || size > 20 * 1024 * 1024) throw new Error('اختر ملف PDF أو Excel لا يتجاوز 20 ميجابايت.');
  return { extension, mime: documentTypes[extension] };
}
export function mergeCatalog(rows: CatalogProject[]) {
  const projects = new Map<string, CatalogProject>(capturedProjects.map(p => [p.id, { ...p, semester: '', deleted: false }]));
  rows.forEach(p => projects.set(p.id, p));
  return [...projects.values()].filter(p => !p.deleted);
}
export function filterCatalog(projects: CatalogProject[], filters: ProjectFilters) {
  const contains = (text: string, q?: string) => text.toLocaleLowerCase().includes((q ?? '').trim().toLocaleLowerCase());
  return projects.filter(p => (!filters.dept || p.department === filters.dept) && (!filters.year || p.year === filters.year) && (!filters.semester || p.semester === filters.semester) && contains(`${p.title} ${p.people} ${p.department} ${p.summary}`, filters.q) && contains(p.people.split(' — ')[1] ?? '', filters.supervisor) && contains(p.people.split(' — ')[0] ?? '', filters.student) && contains(`${p.title} ${p.summary}`, filters.keywords));
}