import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ProfileConfig from '@/models/ProfileConfig';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await connectToDatabase();

    const userAgent = req.headers.get('user-agent') || 'Browser Client';
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'Visitor';

    // Atomically increment resumeDownloads count and append log entry
    await ProfileConfig.findOneAndUpdate(
      {},
      {
        $inc: { resumeDownloads: 1 },
        $push: {
          resumeDownloadLogs: {
            $each: [{ downloadedAt: new Date(), ip, userAgent }],
            $slice: -50, // Keep last 50 download notifications
          },
        },
      },
      { upsert: true, new: true }
    );

    // Redirect client to actual resume PDF file
    const resumePdfUrl = new URL('/assets/Kibret_Mulugeta_Resume.pdf', req.url);
    return NextResponse.redirect(resumePdfUrl);
  } catch (error) {
    console.error('API Error /api/resume/download:', error);
    // Fallback redirect even if database connection error occurs
    const resumePdfUrl = new URL('/assets/Kibret_Mulugeta_Resume.pdf', req.url);
    return NextResponse.redirect(resumePdfUrl);
  }
}
