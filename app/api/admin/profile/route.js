import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import connectToDatabase from '@/lib/mongodb';
import ProfileConfig from '@/models/ProfileConfig';
import { isAdmin } from '@/lib/auth';

/**
 * PUT /api/admin/profile
 * Updates the global portfolio profile content. Protected by Auth0 session + Admin RBAC.
 */
export async function PUT(req) {
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

    const body = await req.json();

    await connectToDatabase();

    let updated = await ProfileConfig.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Portfolio content saved successfully!',
      data: updated,
    });
  } catch (error) {
    console.error('API Error PUT /api/admin/profile:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
