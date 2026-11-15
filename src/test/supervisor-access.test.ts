import { describe, it, expect } from 'vitest';
import { canAccessAdmin, canManagePlatform, isSupervisorPosition } from '@/lib/supervisor-access';

describe('Supervisor area permissions', () => {
  it('allows a registered supervisor without manual approval', () => expect(canAccessAdmin(['supervisor'])).toBe(true));
  it('denies accounts without a server-assigned role', () => expect(canAccessAdmin([])).toBe(false));
  it('denies unrelated roles', () => expect(canAccessAdmin(['student', 'user'])).toBe(false));
  it('allows an administrator', () => expect(canAccessAdmin(['admin'])).toBe(true));
});

describe('Supervisor registration choices', () => {
  it('accepts first supervisor', () => expect(isSupervisorPosition('first')).toBe(true));
  it('accepts second supervisor', () => expect(isSupervisorPosition('second')).toBe(true));
  it('rejects administrator as a registration choice', () => expect(isSupervisorPosition('admin')).toBe(false));
});

describe('Full platform management', () => {
  it('allows the securely assigned platform administrator', () => expect(canManagePlatform(['supervisor', 'admin'])).toBe(true));
  it('does not let a first-supervisor registration choice grant full permissions', () => expect(canManagePlatform(['supervisor', 'first'])).toBe(false));
  it('keeps the second supervisor in an assisting read-only role', () => expect(canManagePlatform(['supervisor', 'second'])).toBe(false));
});