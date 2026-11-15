import { describe, it, expect } from 'vitest';
import { defaultPlatformSettings, validatePlatformSettings, isSafeGuideUrl } from '@/lib/platform-settings';
describe('Platform settings', () => {
  it('persists a changed platform name', () => expect(validatePlatformSettings({ ...defaultPlatformSettings, platform_name: 'منصة الكلية' }).platform_name).toBe('منصة الكلية'));
  it('allows the shipped PDF guide', () => expect(isSafeGuideUrl('/downloads/graduation-projects-guide.pdf')).toBe(true));
  it('rejects executable guide links', () => expect(isSafeGuideUrl('javascript:alert(1)')).toBe(false));
  it('rejects an empty platform name', () => expect(() => validatePlatformSettings({ ...defaultPlatformSettings, platform_name: '' })).toThrow());
});