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
  if (!user) {
    return false;
  }

  const userEmail = (user.email || '').trim().toLowerCase();

  // Parse admin emails from hardcoded default and environment variables (supports comma-separated values)
  const envAdminEmails = [
    ...(process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').split(','),
    ...(process.env.ADMIN_EMAIL || '').split(','),
  ].map(e => e.trim().toLowerCase()).filter(Boolean);

  const adminEmails = Array.from(new Set([
    'kibretmail@gmail.com',
    ...envAdminEmails,
  ]));

  if (userEmail && adminEmails.includes(userEmail)) {
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

