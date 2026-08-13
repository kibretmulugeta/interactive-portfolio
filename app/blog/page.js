'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AnimatedSection, { AnimatedCard } from '@/components/AnimatedSection';
import { BookOpen, Sparkles, Clock, ArrowRight } from 'lucide-react';

export default function BlogIndexPage() {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.data) setBlogs(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBlogs = activeCategory === 'all'
    ? blogs
    : blogs.filter(b => b.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="main-content">
        <section className="section">
          <div className="container">
            <AnimatedSection>
              <div className="section-header align-left" style={{ marginBottom: '2rem' }}>
                <span className="pill-badge" style={{ background: 'var(--badge-bg)', color: 'var(--accent-light)' }}>
                  Technical & Aesthetic Insights
                </span>
                <h1 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Articles & Reflections</h1>
                <p className="section-subtitle">
                  Scientific papers on medical imaging deep learning alongside reflections on bio-inspired optimization and design aesthetic balance.
                </p>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="pill-btn"
                    style={{
                      background: activeCategory === 'all' ? 'var(--accent-color)' : 'var(--card-bg)',
                      color: activeCategory === 'all' ? '#ffffff' : 'var(--text-primary)',
                      border: '1px solid var(--card-border)',
                      cursor: 'pointer',
                    }}
                  >
                    All Articles ({blogs.length})
                  </button>
                  <button
                    onClick={() => setActiveCategory('scientific')}
                    className="pill-btn"
                    style={{
                      background: activeCategory === 'scientific' ? 'var(--accent-color)' : 'var(--card-bg)',
                      color: activeCategory === 'scientific' ? '#ffffff' : 'var(--text-primary)',
                      border: '1px solid var(--card-border)',
                      cursor: 'pointer',
                    }}
                  >
                    🔬 Scientific & Research ({blogs.filter(b => b.category === 'scientific').length})
                  </button>
                  <button
                    onClick={() => setActiveCategory('aesthetic')}
                    className="pill-btn"
                    style={{
                      background: activeCategory === 'aesthetic' ? 'var(--accent-color)' : 'var(--card-bg)',
                      color: activeCategory === 'aesthetic' ? '#ffffff' : 'var(--text-primary)',
                      border: '1px solid var(--card-border)',
                      cursor: 'pointer',
                    }}
                  >
                    🎨 Aesthetic & Design ({blogs.filter(b => b.category === 'aesthetic').length})
                  </button>
                </div>
              </div>
            </AnimatedSection>

            {/* Articles Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {filteredBlogs.map((b, idx) => (
                <AnimatedCard key={idx} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span className="pill-badge" style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)' }}>
                        <span className="badge-text">{b.category === 'aesthetic' ? '🎨 Aesthetic' : '🔬 Scientific'}</span>
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} /> {b.readTime || '5 min read'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.6rem' }}>
                      <Link href={`/blog/${b.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                        {b.title}
                      </Link>
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                      {b.excerpt}
                    </p>
                  </div>

                  <Link href={`/blog/${b.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-light)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                    Read Article <ArrowRight size={16} />
                  </Link>
                </AnimatedCard>
              ))}
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
