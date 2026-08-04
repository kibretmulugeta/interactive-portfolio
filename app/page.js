'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileAndBlogs();
  }, []);

  const fetchProfileAndBlogs = async () => {
    try {
      const [profileRes, blogRes] = await Promise.all([
        fetch('/api/profile'),
        fetch('/api/blogs'),
      ]);

      const profileData = await profileRes.json();
      const blogData = await blogRes.json();

      if (profileData.data) setProfile(profileData.data);
      if (blogData.data) setBlogs(blogData.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const hero = profile?.hero || {
    name: 'Kibret Mulugeta',
    title: 'AI Engineer | Medical Imaging Researcher',
    bio: 'Passionate about designing cutting-edge deep learning solutions for complex healthcare challenges. Specialized in U-Net brain MRI segmentation and reward-driven neural plasticity-inspired optimization algorithms to enhance diagnostic precision and algorithmic learning efficiency.',
    photoUrl: '/assets/images/kibret_photo.jpg',
    resumeUrl: '/assets/Kibret_Mulugeta_Resume.pdf',
    badgeText: 'Available for Research & Contracting',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    scholarUrl: 'https://scholar.google.com',
    twitterUrl: 'https://twitter.com',
    email: 'kibret.mulugeta@example.com',
  };

  const projects = profile?.projects || [];
  const events = profile?.events || [];
  const experience = profile?.experience || [];

  return (
    <>
      <Navbar />
      <main className="main-content">
        {/* Hero / About Section */}
        <section className="hero-section" id="about">
          <div className="container">
            <div className="badge-wrapper">
              <div className="pill-badge">
                <span className="badge-pulse"></span>
                <span className="badge-text">{hero.badgeText}</span>
              </div>
            </div>

            <div className="card hero-card">
              <div className="hero-split">
                <div className="hero-image-col">
                  <div className="profile-img-container">
                    <img src={hero.photoUrl} alt={hero.name} className="profile-img" />
                    <div className="profile-glow"></div>
                  </div>
                </div>

                <div className="hero-content-col">
                  <h1 className="hero-name">{hero.name}</h1>
                  <h2 className="hero-subtitle">{hero.title}</h2>

                  <p className="hero-bio">{hero.bio}</p>

                  {/* Hero Actions & Social Links */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <a
                      href={hero.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill-btn outlined-btn"
                      style={{ background: 'var(--accent-color)', color: '#ffffff', borderColor: 'transparent' }}
                    >
                      <i className="fa-solid fa-file-arrow-down"></i>
                      <span>Download CV / Resume</span>
                    </a>

                    <div className="hero-socials">
                      <a href={hero.githubUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                        <i className="fa-brands fa-github"></i>
                      </a>
                      <a href={hero.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                      <a href={hero.scholarUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Google Scholar">
                        <i className="fa-solid fa-graduation-cap"></i>
                      </a>
                      <a href={hero.twitterUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Twitter">
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                      <a href={`mailto:${hero.email}`} className="social-icon-btn" aria-label="Email">
                        <i className="fa-regular fa-envelope"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vertical Connector */}
        <div className="vertical-connector">
          <div className="connector-line"></div>
          <span className="connector-dots">⋮</span>
          <div className="connector-line"></div>
        </div>

        {/* Blog & Insights Section */}
        <section className="section creativity-section" id="creativity">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Technical Blogs & Insights</h2>
              <p className="section-subtitle">Articles covering U-Net medical segmentation, neural plasticity principles, and modern PyTorch engineering practices.</p>
            </div>

            <div className="creativity-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
              {blogs.map((b, idx) => (
                <div className="card creativity-card" key={idx} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="pill-badge">
                        <span className="badge-text">{b.readTime}</span>
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--accent-light)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <i className="fa-solid fa-eye"></i>
                        {b.views} views
                      </span>
                    </div>
                    <h3 className="creativity-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', textAlign: 'left' }}>
                      {b.title}
                    </h3>
                    <p className="creativity-description" style={{ color: 'var(--text-secondary)', textAlign: 'left', fontSize: '0.925rem' }}>
                      {b.excerpt}
                    </p>
                  </div>

                  <Link href={`/blog/${b.slug}`} className="pill-btn outlined-btn" style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}>
                    <span>Read Article</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vertical Connector */}
        <div className="vertical-connector">
          <div className="connector-line"></div>
          <span className="connector-dots">⋮</span>
          <div className="connector-line"></div>
        </div>

        {/* AI/ML Projects Section */}
        <section className="section projects-section" id="projects">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">AI / ML Projects</h2>
              <p className="section-subtitle">Featured deep learning platforms and research frameworks.</p>
            </div>

            <div className="projects-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {projects.map((proj, idx) => (
                <div className="card project-card" key={idx} style={{ padding: '2rem' }}>
                  <div className="project-split" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <div className="project-image-col">
                      <img src={proj.image} alt={proj.title} style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />
                    </div>
                    <div className="project-content-col">
                      <h3 className="project-title" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{proj.title}</h3>
                      <p className="project-description" style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        {proj.description}
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                        {proj.tags?.map((tag, tIdx) => (
                          <span key={tIdx} className="tech-tag" style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', color: 'var(--badge-text)', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.8rem' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vertical Connector */}
        <div className="vertical-connector">
          <div className="connector-line"></div>
          <span className="connector-dots">⋮</span>
          <div className="connector-line"></div>
        </div>

        {/* Events Section */}
        <section className="section events-section" id="events">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Events & Podcasts</h2>
              <p className="section-subtitle">Conference keynotes, research podcasts, and interactive AI workshops.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {events.map((ev, idx) => (
                <div className="card" key={idx} style={{ overflow: 'hidden' }}>
                  <img src={ev.image} alt={ev.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-light)', fontWeight: 600 }}>{ev.date}</span>
                    <h4 style={{ fontSize: '1.1rem', margin: '0.4rem 0' }}>{ev.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{ev.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vertical Connector */}
        <div className="vertical-connector">
          <div className="connector-line"></div>
          <span className="connector-dots">⋮</span>
          <div className="connector-line"></div>
        </div>

        {/* Work & Education Section */}
        <section className="section experience-section" id="experience">
          <div className="container">
            <div className="section-header align-left">
              <h2 className="section-title">Work Experience & Education</h2>
            </div>

            {experience.map((exp, idx) => (
              <div className="card" key={idx} style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem' }}>{exp.jobTitle}</h3>
                    <span style={{ color: 'var(--text-secondary)' }}>{exp.company}</span>
                  </div>
                  <span className="pill-badge" style={{ padding: '0.3rem 0.8rem' }}>{exp.date}</span>
                </div>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                  {exp.bullets?.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ marginBottom: '0.5rem' }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid var(--card-border)', padding: '2rem 0', marginTop: '4rem', color: 'var(--text-muted)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p>© 2026 {hero.name}. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="/contracting">Contracting</a>
          </div>
        </div>
      </footer>
    </>
  );
}
