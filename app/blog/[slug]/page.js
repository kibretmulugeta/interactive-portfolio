'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function BlogPostPage({ params }) {
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${slug}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Post not found');
      setPost(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="main-content">
          <div className="container section text-center">
            <p>Loading article...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <main className="main-content">
          <div className="container section text-center">
            <h2>Article Not Found</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem 0' }}>{error}</p>
            <Link href="/" className="pill-btn outlined-btn">
              ← Back to Portfolio
            </Link>
          </div>
        </main>
      </>
    );
  }

  const categoryBadge = post.category === 'aesthetic' ? '🎨 Aesthetic & Design' : '🔬 Scientific & Research';

  return (
    <>
      <Navbar />
      <main className="main-content">
        <article className="section">
          <div className="container" style={{ maxWidth: '800px' }}>
            <Link href="/#creativity" className="pill-btn outlined-btn" style={{ marginBottom: '2rem' }}>
              ← Back to Insights
            </Link>

            <header style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span className="pill-badge" style={{ background: post.category === 'aesthetic' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(99, 102, 241, 0.2)', color: post.category === 'aesthetic' ? '#f472b6' : '#a5b4fc' }}>
                  <span className="badge-text">{categoryBadge}</span>
                </span>
                <span className="pill-badge">
                  <span className="badge-text">{post.readTime}</span>
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Published {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--accent-light)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <i className="fa-solid fa-eye"></i>
                  <strong>{post.views} Views</strong>
                </span>
              </div>

              <h1 className="section-title" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
                {post.title}
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
                <img src="/assets/images/kibret_photo.jpg" alt={post.author} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>{post.author}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Engineer & Systems Researcher</span>
                </div>
              </div>
            </header>

            <div
              className="card"
              style={{
                padding: '2.5rem',
                lineHeight: '1.8',
                fontSize: '1.05rem',
                color: 'var(--text-primary)',
              }}
            >
              {post.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} style={{ fontSize: '1.4rem', margin: '1.5rem 0 0.75rem 0', color: 'var(--accent-light)' }} dangerouslySetInnerHTML={{ __html: paragraph.replace('### ', '') }}></h3>
                  );
                }
                if (paragraph.startsWith('```')) {
                  return (
                    <pre key={idx} style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', overflowX: 'auto', margin: '1rem 0', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                      <code>{paragraph.replace(/```\w*\n?/, '').replace(/```$/, '')}</code>
                    </pre>
                  );
                }
                return (
                  <p key={idx} style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                );
              })}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
