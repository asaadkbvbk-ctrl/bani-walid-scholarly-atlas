export function canAccessAdmin(roles: readonly string[]) {
  return roles.includes('supervisor') || roles.includes('admin');
}

export function isSupervisorPosition(value: unknown): value is 'first' | 'second' {
  return value === 'first' || value === 'second';
}

// Only the server-assigned admin role (first supervisor) manages settings and other supervisors.
export function canManagePlatform(roles: readonly string[]) {
  return roles.includes('admin');
}

/** What each audience may do. Visitors browse and download only. */
export function permissionsFor(roles: readonly string[]) {
  const supervisor = canAccessAdmin(roles);
  const admin = canManagePlatform(roles);
  return { browse: true, download: true, manageContent: supervisor, manageFiles: supervisor, manageSettings: admin, manageSupervisors: admin };
}
