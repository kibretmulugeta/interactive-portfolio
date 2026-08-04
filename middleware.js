import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';

export default function middleware(req) {
  // Check if Auth0 environment variables are present on Edge runtime
  if (!process.env.AUTH0_SECRET || !process.env.AUTH0_BASE_URL) {
    console.warn('Auth0 Environment Variables (AUTH0_SECRET or AUTH0_BASE_URL) missing in Middleware.');
    // Redirect to login fallback gracefully
    const loginUrl = new URL('/api/auth/login', req.url);
    loginUrl.searchParams.set('returnTo', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const authMiddleware = withMiddlewareAuthRequired();
    return authMiddleware(req);
  } catch (error) {
    console.error('Middleware Auth0 error:', error);
    const loginUrl = new URL('/api/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/contracting/:path*'],
};
