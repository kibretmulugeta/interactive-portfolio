import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const GET = handleAuth({
  callback: async (req, ctx) => {
    try {
      return await handleCallback(req, ctx);
    } catch (error) {
      console.error('Auth0 Callback Handler Error:', error);

      // Parse returnTo path from query state parameter if present
      const searchParams = new URL(req.url).searchParams;
      const state = searchParams.get('state');
      let targetPath = '/contracting';

      if (state) {
        try {
          const decoded = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
          if (decoded && decoded.returnTo) {
            targetPath = decoded.returnTo;
          }
        } catch (e) {
          // Ignore state parsing errors
        }
      }

      // Redirect user gracefully to target path with clear query error flag
      const targetUrl = new URL(targetPath, req.url);
      targetUrl.searchParams.set('auth_error', 'callback_failed');
      return NextResponse.redirect(targetUrl);
    }
  },
});

