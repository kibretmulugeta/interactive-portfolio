import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import connectToDatabase from '@/lib/mongodb';
import ProfileConfig from '@/models/ProfileConfig';
import { isAdmin } from '@/lib/auth';

export async function POST(req) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No PDF file uploaded.' }, { status: 400 });
    }

    if (!file.name.endsWith('.pdf') && file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'File must be in PDF format (.pdf).' }, { status: 400 });
    }

    // Convert PDF file arrayBuffer to Base64 Data URI for serverless database persistence
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Pdf = `data:application/pdf;base64,${buffer.toString('base64')}`;

    await connectToDatabase();
    await ProfileConfig.findOneAndUpdate(
      {},
      {
        $set: {
          resumeDataUri: base64Pdf,
          'hero.resumeUrl': '/api/resume/download',
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'PDF Resume uploaded and stored in MongoDB successfully!',
      url: '/api/resume/download',
    });
  } catch (error) {
    console.error('Error uploading PDF resume:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
