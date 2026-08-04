import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { writeFile } from 'fs/promises';
import path from 'path';
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save PDF file to public/assets/Kibret_Mulugeta_Resume.pdf
    const filePath = path.join(process.cwd(), 'public', 'assets', 'Kibret_Mulugeta_Resume.pdf');
    await writeFile(filePath, buffer);

    await connectToDatabase();
    await ProfileConfig.findOneAndUpdate(
      {},
      { $set: { 'hero.resumeUrl': '/api/resume/download' } },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'PDF Resume uploaded and updated successfully!',
      url: '/assets/Kibret_Mulugeta_Resume.pdf',
    });
  } catch (error) {
    console.error('Error uploading PDF resume:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
