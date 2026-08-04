import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import connectToDatabase from '@/lib/mongodb';
import ContractInquiry from '@/models/ContractInquiry';

export async function POST(req) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in via Google/Auth0 to submit contracting inquiries.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { clientName, clientEmail, projectType, budget, description } = body;

    if (!clientName || !clientEmail || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, clientEmail, and description are required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newInquiry = await ContractInquiry.create({
      clientName,
      clientEmail,
      projectType: projectType || 'Custom AI Consulting',
      budget: budget || 'Flexible',
      description,
      auth0Sub: session.user.sub,
      status: 'pending',
    });

    return NextResponse.json(
      { success: true, message: 'Contracting inquiry submitted successfully!', inquiry: newInquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error /api/contracting:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
