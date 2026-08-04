import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import connectToDatabase from '@/lib/mongodb';
import ContractInquiry from '@/models/ContractInquiry';
import { isAdmin } from '@/lib/auth';

/**
 * GET /api/admin/inquiries
 * Retrieves all contract inquiries. Protected by Auth0 session + Admin RBAC check.
 */
export async function GET(req) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: 'Forbidden. Access restricted to Administrator role.' },
        { status: 403 }
      );
    }

    await connectToDatabase();
    const inquiries = await ContractInquiry.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    console.error('API Error /api/admin/inquiries:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/inquiries
 * Updates status of a contract inquiry. Protected by Auth0 session + Admin RBAC check.
 */
export async function PATCH(req) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: 'Forbidden. Access restricted to Administrator role.' },
        { status: 403 }
      );
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required parameters: id and status.' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const updated = await ContractInquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Inquiry not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('PATCH Error /api/admin/inquiries:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
