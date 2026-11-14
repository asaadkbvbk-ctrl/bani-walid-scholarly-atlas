import { describe, it, expect } from 'vitest';
import { canAccessAdmin } from '@/lib/supervisor-access';

describe('Supervisor area permissions', () => {
  it('allows an approved supervisor', () => expect(canAccessAdmin(['supervisor'])).toBe(true));
  it('denies an account without approval', () => expect(canAccessAdmin([])).toBe(false));
  it('denies unrelated roles', () => expect(canAccessAdmin(['student', 'user'])).toBe(false));
  it('allows an administrator', () => expect(canAccessAdmin(['admin'])).toBe(true));
});