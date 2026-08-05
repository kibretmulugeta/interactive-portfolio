/**
 * Helper utility to verify if an Auth0 session user possesses the 'Admin' role.
 * Auth0 roles can be present in session.user via custom claims (e.g. 'https://kibret.ai/roles')
 * or a standard 'roles' array, or email match.
 */
export function isAdmin(session) {
  if (!session) {
    return false;
  }

  // Handle both session object ({ user: ... }) and direct user object
  const user = session.user || session;
  if (!user || !user.email) {
    return false;
  }

  const userEmail = user.email ? user.email.toLowerCase() : '';

  // Explicit Admin Email grant for kibretmail@gmail.com
  const adminEmails = [
    'kibretmail@gmail.com',
    (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').toLowerCase(),
    (process.env.ADMIN_EMAIL || '').toLowerCase(),
  ].filter(Boolean);

  if (adminEmails.includes(userEmail)) {
    return true;
  }

  // Check custom claim namespaces
  const customRoles =
    user['https://kibret.ai/roles'] ||
    user['https://my-app.com/roles'] ||
    user['https://schemas.auth0.com/roles'];
  if (Array.isArray(customRoles) && customRoles.includes('Admin')) {
    return true;
  }

  // Check direct roles property
  if (Array.isArray(user.roles) && user.roles.includes('Admin')) {
    return true;
  }

  // String check fallback
  if (typeof user.role === 'string' && user.role.toLowerCase() === 'admin') {
    return true;
  }

  return false;
}
