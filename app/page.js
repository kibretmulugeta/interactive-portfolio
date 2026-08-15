'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AnimatedSection, { AnimatedCard } from '@/components/AnimatedSection';
import CategoryIcon from '@/components/CategoryIcon';
import { Cpu, Microscope, FolderGit2, BookOpen, Calendar, Briefcase, ArrowRight, Download, Mail, Phone, MapPin, Globe, Github, Linkedin, GraduationCap, Sparkles } from 'lucide-react';

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      const data = await res.json();
      if (data.data) setProfile(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const hero = profile?.hero || {
    name: 'Kibret Mulugeta Alemu',
    title: 'AI Engineer & Medical Imaging Researcher',
    bio: 'AI Engineer and Medical Imaging Researcher specializing in deep learning, medical image segmentation, and bio-inspired optimization algorithms. Experienced in designing neural plasticity-inspired optimization frameworks for hyperparameter tuning and implementing U-Net/Attention U-Net architectures for brain MRI analysis.',
    photoUrl: '/assets/images/kibret_photo.jpg',
    resumeUrl: '/api/resume/download',
    githubUrl: 'https://github.com/kibretmulugeta',
    linkedinUrl: 'https://linkedin.com/in/kibret-mulugeta',
    scholarUrl: 'https://scholar.google.com',
    twitterUrl: 'https://twitter.com',
    email: 'kibretmail@gmail.com',
    phone: '+251 947369090',
    location: 'Addis Ababa, Ethiopia',
    website: 'https://kibretmulugeta.pro.et',
  };

  const navCategories = [
    {
      title: 'Technical Skills',
      desc: 'Deep Learning, MONAI, PyTorch, Bio-inspired Optimization, MLOps & Cloud.',
      iconType: 'technical-skills',
      link: '/skills',
      badge: 'Core Competencies',
      color: '#6366f1',
    },
    {
      title: 'Research & Clinical AI',
      desc: 'Brain MRI segmentation, Attention U-Net, and interactive slice visualizer.',
      iconType: 'research',
      link: '/research',
      badge: 'Master\'s Research',
      color: '#06b6d4',
    },
    {
      title: 'Software & Repositories',
      desc: 'Selected open-source frameworks, clinical tools, and full-stack applications.',
      iconType: 'projects',
      link: '/projects',
      badge: 'Open Source',
      color: '#f59e0b',
    },
    {
      title: 'Technical Insights & Blog',
      desc: 'Scientific publications on medical AI and reflections on computational aesthetics.',
      iconType: 'blog',
      link: '/blog',
      badge: 'Articles',
      color: '#ec4899',
    },
    {
      title: 'Events & Conferences',
      desc: 'Academic symposium defense presentations, workshops, and speaking engagements.',
      iconType: 'events',
      link: '/events',
      badge: 'Academic Gatherings',
      color: '#10b981',
    },
    {
      title: 'Experience & Education',
      desc: 'MSc in Computer Engineering qualifications and systems engineering background.',
      iconType: 'experience',
      link: '/experience',
      badge: 'Professional Path',
      color: '#3b82f6',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="main-content">
        
        {/* Hero Section */}
        <section className="hero-section" id="about">
          <div className="container">
            <AnimatedSection>
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

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.5rem 0 1.25rem 0', fontSize: '0.875rem', color: 'var(--accent-light)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><MapPin size={15} /> {hero.location || 'Addis Ababa, Ethiopia'}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Phone size={15} /> {hero.phone || '+251 947369090'}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Globe size={15} /> <a href={hero.website || 'https://kibretmulugeta.pro.et'} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-light)' }}>kibretmulugeta.pro.et</a></span>
                    </div>

                    <p className="hero-bio">{hero.bio}</p>

                    {/* Hero Actions & Social Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                      <a
                        href={hero.resumeUrl}
                        className="pill-btn outlined-btn"
                        style={{ background: 'var(--accent-color)', color: '#ffffff', borderColor: 'transparent', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <Download size={16} />
                        <span>Download CV / Resume</span>
                      </a>

                      <div className="hero-socials">
                        <a href={hero.githubUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                          <Github size={18} />
                        </a>
                        <a href={hero.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                          <Linkedin size={18} />
                        </a>
                        <a href={hero.scholarUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Google Scholar">
                          <GraduationCap size={18} />
                        </a>
                        <a href={`mailto:${hero.email}`} className="social-icon-btn" aria-label="Email">
                          <Mail size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Vertical Connector */}
        <div className="vertical-connector">
          <div className="connector-line"></div>
          <span className="connector-dots">⋮</span>
          <div className="connector-line"></div>
        </div>

        {/* Directory Navigation Overview Section */}
        <section className="section">
          <div className="container">
            <AnimatedSection>
              <div className="section-header">
                <span className="pill-badge" style={{ background: 'var(--badge-bg)', color: 'var(--accent-light)' }}>
                  Explore Portfolio Directories
                </span>
                <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Dedicated Specialty Pages</h2>
                <p className="section-subtitle">Navigate directly to comprehensive sections covering AI research, open source projects, academic events, and technical skills.</p>
              </div>
            </AnimatedSection>

            {/* Grid of Section Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              {navCategories.map((cat, idx) => {
                return (
                  <AnimatedCard key={idx} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <CategoryIcon type={cat.iconType} size={54} />
                        <span className="pill-badge" style={{ fontSize: '0.775rem' }}>{cat.badge}</span>
                      </div>

                      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.6rem' }}>{cat.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                        {cat.desc}
                      </p>
                    </div>

                    <Link
                      href={cat.link}
                      className="pill-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--card-border)',
                        padding: '0.6rem 1rem',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>Explore {cat.title}</span>
                      <ArrowRight size={16} style={{ color: cat.color }} />
                    </Link>
                  </AnimatedCard>
                );
              })}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
