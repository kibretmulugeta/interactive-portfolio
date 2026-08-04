import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    await connectToDatabase();
    let query = {};
    if (category && ['scientific', 'aesthetic'].includes(category)) {
      query.category = category;
    }

    const blogs = await BlogPost.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    console.error('API Error /api/blogs:', error);
    return NextResponse.json({ success: true, data: [] });
  }
}
