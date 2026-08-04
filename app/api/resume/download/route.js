import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import connectToDatabase from '@/lib/mongodb';
import ProfileConfig from '@/models/ProfileConfig';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);

    // Enforce Google / Auth0 Authentication before allowing CV download
    if (!session || !session.user) {
      const loginUrl = new URL('/api/auth/login', req.url);
      loginUrl.searchParams.set('returnTo', '/api/resume/download');
      return NextResponse.redirect(loginUrl);
    }

    const clientName = session.user.name || session.user.nickname || 'Client Visitor';
    const clientEmail = session.user.email || 'No Email Provided';

    await connectToDatabase();

    const userAgent = req.headers.get('user-agent') || 'Browser Client';
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'Visitor';

    // Atomically increment resumeDownloads count and append client download notification log
    const config = await ProfileConfig.findOneAndUpdate(
      {},
      {
        $inc: { resumeDownloads: 1 },
        $push: {
          resumeDownloadLogs: {
            $each: [{ downloadedAt: new Date(), clientName, clientEmail, ip, userAgent }],
            $slice: -50, // Keep last 50 download notifications
          },
        },
      },
      { upsert: true, new: true }
    );

    // Stream PDF directly from MongoDB Base64 data if present
    if (config && config.resumeDataUri) {
      const base64Data = config.resumeDataUri.replace(/^data:application\/pdf;base64,/, '');
      const pdfBuffer = Buffer.from(base64Data, 'base64');

      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="Kibret_Mulugeta_Resume.pdf"',
          'Cache-Control': 'no-cache',
        },
      });
    }

    // Fallback redirect to static asset file
    const resumePdfUrl = new URL('/assets/Kibret_Mulugeta_Resume.pdf', req.url);
    return NextResponse.redirect(resumePdfUrl);
  } catch (error) {
    console.error('API Error /api/resume/download:', error);
    const resumePdfUrl = new URL('/assets/Kibret_Mulugeta_Resume.pdf', req.url);
    return NextResponse.redirect(resumePdfUrl);
  }
}
