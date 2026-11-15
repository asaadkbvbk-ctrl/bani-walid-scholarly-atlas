import { describe, it, expect } from 'vitest';
import { mergeCatalog, validateDocument, filterCatalog, projectSchema } from '@/lib/project-management';
import { capturedProjects } from '@/lib/captured-projects';
import { canAccessAdmin } from '@/lib/supervisor-access';
describe('Supervisor project management', () => {
  it('allows both supervisor positions to manage projects through their supervisor role', () => {
    expect(canAccessAdmin(['supervisor', 'first'])).toBe(true);
    expect(canAccessAdmin(['supervisor', 'second'])).toBe(true);
    expect(canAccessAdmin(['first'])).toBe(false);
  });
  it('accepts PDF uploads', () => expect(validateDocument('guide.pdf', 100).extension).toBe('pdf'));
  it('accepts both Excel formats', () => { expect(validateDocument('data.xls', 100).extension).toBe('xls'); expect(validateDocument('data.xlsx', 100).extension).toBe('xlsx'); });
  it('rejects executable files', () => expect(() => validateDocument('test.exe', 100)).toThrow());
  it('rejects empty and oversized files', () => { expect(() => validateDocument('test.pdf', 0)).toThrow(); expect(() => validateDocument('test.pdf', 20 * 1024 * 1024 + 1)).toThrow(); });
  it('removes deleted imported projects from the public catalog', () => {
    const original = capturedProjects[0];
    expect(mergeCatalog([{ ...original, semester: '', deleted: true }]).some(p => p.id === original.id)).toBe(false);
  });
  it('uses edited data instead of captured data', () => { const original = capturedProjects[0]; expect(mergeCatalog([{ ...original, title: 'Updated', semester: '', deleted: false }]).find(p => p.id === original.id)?.title).toBe('Updated'); });
  it('filters new project records by department and semester', () => { const projects = mergeCatalog([{ ...capturedProjects[0], semester: 'فصل الخريف', deleted: false }]); expect(filterCatalog(projects, { dept: capturedProjects[0].department, semester: 'فصل الخريف' })).toHaveLength(1); expect(filterCatalog(projects, { semester: 'فصل الربيع' })).toHaveLength(0); });
  it('rejects projects without a title', () => expect(projectSchema.safeParse({ ...capturedProjects[0], title: '', semester: '' }).success).toBe(false));
});