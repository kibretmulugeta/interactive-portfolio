import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';

export default function middleware(req) {
  // Dynamically set AUTH0_BASE_URL on Edge runtime if missing
  if (!process.env.AUTH0_BASE_URL) {
    if (process.env.VERCEL_URL) {
      process.env.AUTH0_BASE_URL = `https://${process.env.VERCEL_URL}`;
    } else if (req.nextUrl && req.nextUrl.origin) {
      process.env.AUTH0_BASE_URL = req.nextUrl.origin;
    }
  }

  // Check if Auth0 environment secret is configured
  if (!process.env.AUTH0_SECRET) {
    console.warn('Auth0 AUTH0_SECRET is missing in Middleware runtime.');
    return NextResponse.next();
  }

  try {
    const authMiddleware = withMiddlewareAuthRequired();
    return authMiddleware(req);
  } catch (error) {
    console.error('Middleware Auth0 error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/contracting', '/contracting/:path*'],
};


