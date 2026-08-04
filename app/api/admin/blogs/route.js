import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { isAdmin } from '@/lib/auth';

function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(req) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
    }

    const { title, category, excerpt, content, readTime } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    await connectToDatabase();
    const slug = createSlug(title) || `post-${Date.now()}`;

    const newPost = await BlogPost.create({
      title,
      slug,
      category: category || 'scientific',
      excerpt: excerpt || title,
      content,
      readTime: readTime || '5 min read',
      author: session.user.name || 'Kibret Mulugeta',
      views: 0,
    });

    return NextResponse.json({ success: true, message: 'Blog post published!', data: newPost }, { status: 201 });
  } catch (error) {
    console.error('POST Error /api/admin/blogs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
    }

    const { id, title, category, excerpt, content, readTime } = await req.json();

    if (!id || !title || !content) {
      return NextResponse.json({ error: 'ID, title, and content are required.' }, { status: 400 });
    }

    await connectToDatabase();
    const updated = await BlogPost.findByIdAndUpdate(
      id,
      {
        title,
        category: category || 'scientific',
        excerpt,
        content,
        readTime,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, message: 'Blog post updated!', data: updated });
  } catch (error) {
    console.error('PUT Error /api/admin/blogs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const clearAll = searchParams.get('clearAll');

    await connectToDatabase();

    if (clearAll === 'true') {
      await BlogPost.deleteMany({});
      return NextResponse.json({ success: true, message: 'All blog posts cleared.' });
    }

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required.' }, { status: 400 });
    }

    await BlogPost.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Blog post deleted.' });
  } catch (error) {
    console.error('DELETE Error /api/admin/blogs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
