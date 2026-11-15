export function canAccessAdmin(roles: readonly string[]) {
  return roles.includes('supervisor') || roles.includes('admin');
}

export function isSupervisorPosition(value: unknown): value is 'first' | 'second' {
  return value === 'first' || value === 'second';
}

// First/second are registration preferences, not authority to change the platform.
export function canManagePlatform(roles: readonly string[]) {
  return roles.includes('admin');
}