import { describe, expect, it } from 'vitest';
import { permissionsFor } from '@/lib/supervisor-access';
import { parseGraduateRows, validateSiteFile } from '@/lib/graduates';

describe('permissions', () => {
  it('first supervisor (admin) manages settings and supervisors', () => {
    expect(permissionsFor(['supervisor', 'admin'])).toMatchObject({ manageContent: true, manageSettings: true, manageSupervisors: true });
  });
  it('second supervisor manages projects and files only', () => {
    expect(permissionsFor(['supervisor'])).toMatchObject({ manageContent: true, manageFiles: true, manageSettings: false, manageSupervisors: false });
  });
  it('visitors only browse and download', () => {
    expect(permissionsFor([])).toEqual({ browse: true, download: true, manageContent: false, manageFiles: false, manageSettings: false, manageSupervisors: false });
  });
});

describe('graduate Excel import', () => {
  it('maps Arabic headers and rejects rows without a name', () => {
    const { valid, rejected } = parseGraduateRows([{ 'الاسم': 'أحمد', 'القسم': 'الرياضيات', 'سنة التخرج': 2024 }, { 'الاسم': '' }]);
    expect(valid).toEqual([{ full_name: 'أحمد', department: 'الرياضيات', graduation_year: '2024', project_title: '' }]);
    expect(rejected).toEqual([{ row: 3, reason: 'الاسم مطلوب' }]);
  });
  it('allows only PDF and Excel under 20MB', () => {
    expect(validateSiteFile({ name: 'a.pdf', size: 10 })).toBeNull();
    expect(validateSiteFile({ name: 'a.exe', size: 10 })).not.toBeNull();
    expect(validateSiteFile({ name: 'a.xlsx', size: 21 * 1024 * 1024 })).not.toBeNull();
  });
});
