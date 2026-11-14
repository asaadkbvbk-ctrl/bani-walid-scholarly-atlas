export function canAccessAdmin(roles: readonly string[]) {
  return roles.includes('supervisor') || roles.includes('admin');
}