import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { isAdmin } from '@/lib/auth';

/**
 * Helper function to create URL slug from title
 */
function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * POST /api/admin/blogs
 * Create new blog post. Protected by Auth0 session + Admin RBAC.
 */
export async function POST(req) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
    }

    const { title, excerpt, content, readTime } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    await connectToDatabase();
    const slug = createSlug(title) || `post-${Date.now()}`;

    const newPost = await BlogPost.create({
      title,
      slug,
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

/**
 * PUT /api/admin/blogs
 * Edit an existing blog post.
 */
export async function PUT(req) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
    }

    const { id, title, excerpt, content, readTime } = await req.json();

    if (!id || !title || !content) {
      return NextResponse.json({ error: 'ID, title, and content are required.' }, { status: 400 });
    }

    await connectToDatabase();
    const updated = await BlogPost.findByIdAndUpdate(
      id,
      {
        title,
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

/**
 * DELETE /api/admin/blogs
 * Delete a blog post by id.
 */
export async function DELETE(req) {
  try {
    const res = new NextResponse();
    const session = await getSession(req, res);

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required.' }, { status: 400 });
    }

    await connectToDatabase();
    await BlogPost.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Blog post deleted.' });
  } catch (error) {
    console.error('DELETE Error /api/admin/blogs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
