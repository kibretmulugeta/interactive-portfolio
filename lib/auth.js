/**
 * Helper utility to verify if an Auth0 session user possesses the 'Admin' role.
 * Auth0 roles can be present in session.user via custom claims (e.g. 'https://kibret.ai/roles')
 * or a standard 'roles' array.
 */
export function isAdmin(session) {
  if (!session || !session.user) {
    return false;
  }

  const user = session.user;

  // Check custom claim namespaces
  const customRoles = user['https://kibret.ai/roles'] || user['https://my-app.com/roles'] || user['https://schemas.auth0.com/roles'];
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

  // Optional admin email fallback via ENV if configured
  if (process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL) {
    return true;
  }

  return false;
}
