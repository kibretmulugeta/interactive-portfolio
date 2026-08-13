'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedSection, { AnimatedCard } from '@/components/AnimatedSection';
import { Github, ExternalLink, FolderGit2, Layers, ArrowUpRight } from 'lucide-react';

export default function ProjectsPage() {
  const [profile, setProfile] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

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

  const defaultProjects = [
    {
      title: 'Chat Platform (AI Digital Twin & RAG)',
      category: 'ai',
      description: 'Multi-Agent Personal Assistant Platform with RAG, multi-LLM support (Gemini, Claude, GPT-4), PostgreSQL pgvector, and FastAPI backend.',
      image: '/assets/images/chat_platform.png',
      tags: ['FastAPI', 'React', 'PostgreSQL', 'pgvector', 'Docker', 'RAG', 'Python'],
      liveUrl: 'https://personal-ai-assistant-six-phi.vercel.app/demo',
      githubUrl: 'https://github.com/kibretmulugeta/personal-ai-assistant',
    },
    {
      title: 'DSM-5 Psychiatry & Clinical Psychology AI Assistant',
      category: 'medical',
      description: 'Clinical decision support system and diagnostic decision aid engineered according to official APA DSM-5 / DSM-5-TR standards.',
      image: '/assets/images/psychiatry_ai_assistant.png',
      tags: ['DSM-5', 'Psychiatry AI', 'FastAPI', 'React', 'RAG', 'Clinical AI', 'Python'],
      liveUrl: 'https://psychiatry-ai-assistant-dsm-5.vercel.app/demo',
      githubUrl: 'https://github.com/kibretmulugeta/psychiatry_ai_assistant_DSM-5',
    },
    {
      title: 'CCTV Intelligent Analysis & Face Recognition',
      category: 'ai',
      description: 'Real-time monitoring system for CCTV video streams featuring object detection, activity analysis, and AI face recognition.',
      image: '/assets/images/cctv_analysis.png',
      tags: ['CNN', 'OpenCV', 'Computer Vision', 'Face Recognition', 'Python'],
      liveUrl: 'https://cctv-intelligent-analysis.vercel.app/',
      githubUrl: 'https://github.com/kibretmulugeta/cctv-intelligent-analysis',
    },
    {
      title: 'Medical Image Analysis System (U-Net & MONAI)',
      category: 'medical',
      description: 'Deep learning models for medical image understanding, Brain MRI segmentation (Attention U-Net, MONAI), and clinical diagnosis support.',
      image: '/assets/images/medical_image_analysis.png',
      tags: ['U-Net', 'MONAI', 'PyTorch', 'TensorFlow', 'Brain MRI', 'NIfTI'],
      liveUrl: 'https://github.com/kibretmulugeta',
      githubUrl: 'https://github.com/kibretmulugeta',
    },
    {
      title: 'Novel Bio-Inspired Optimization Framework',
      category: 'ai',
      description: 'Optimization engine inspired by synaptic plasticity and biological neural mechanisms applied to deep learning hyperparameter tuning.',
      image: '/assets/images/novel_optimization.png',
      tags: ['Neural Plasticity', 'Deep Learning', 'PyTorch', 'PSO', 'Optimization'],
      liveUrl: 'https://github.com/kibretmulugeta',
      githubUrl: 'https://github.com/kibretmulugeta',
    },
    {
      title: 'Speech Intelligence & Translation Systems',
      category: 'ai',
      description: 'Speech-to-Text, Text-to-Speech generation, and Amharic ↔ English machine translation models using advanced NLP transformers.',
      image: '/assets/images/speech_translation.png',
      tags: ['NLP', 'Speech Processing', 'Amharic Translation', 'PyTorch', 'Transformers'],
      liveUrl: 'https://github.com/kibretmulugeta',
      githubUrl: 'https://github.com/kibretmulugeta',
    },
    {
      title: 'OCR (Optical Character Recognition) System',
      category: 'ai',
      description: 'Intelligent OCR pipeline for extracting formatted text and structured data from complex images and scanned clinical documents.',
      image: '/assets/images/ocr_system.png',
      tags: ['OCR Models', 'Computer Vision', 'Deep Learning', 'Python'],
      liveUrl: 'https://github.com/kibretmulugeta',
      githubUrl: 'https://github.com/kibretmulugeta',
    },
    {
      title: 'Apartment Rental & Task Management Systems',
      category: 'fullstack',
      description: 'Full-stack rental platform featuring property management, search workflows, calendar integration, and automated JWT security.',
      image: '/assets/images/car_plate_detection.png',
      tags: ['Next.js', 'Node.js', 'FastAPI', 'PostgreSQL', 'React'],
      liveUrl: 'https://github.com/kibretmulugeta',
      githubUrl: 'https://github.com/kibretmulugeta',
    },
  ];

  const rawProjects = profile?.projects && profile.projects.length > 0 ? profile.projects : defaultProjects;
  
  // Ensure every project has an image thumbnail
  const projects = rawProjects.map((p, idx) => {
    const defaultImage = defaultProjects[idx % defaultProjects.length]?.image || '/assets/images/scholarxiv.png';
    return {
      ...p,
      image: p.image || p.photoUrl || defaultImage,
    };
  });

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter || (activeFilter === 'medical' && p.title.toLowerCase().includes('medical')) || (activeFilter === 'ai' && !p.category));

  return (
    <>
      <Navbar />
      <main className="main-content">
        <section className="section">
          <div className="container">
            <AnimatedSection>
              <div className="section-header align-left" style={{ marginBottom: '2rem' }}>
                <span className="pill-badge" style={{ background: 'var(--badge-bg)', color: 'var(--accent-light)' }}>
                  Software & AI Directory
                </span>
                <h1 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Projects & Open Source Repositories</h1>
                <p className="section-subtitle">
                  Selected open-source frameworks, clinical AI segmentation tools, and full-stack software systems.
                </p>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  {[
                    { id: 'all', label: 'All Projects' },
                    { id: 'ai', label: 'AI & Deep Learning' },
                    { id: 'medical', label: 'Medical Imaging' },
                    { id: 'fullstack', label: 'Full-Stack & Systems' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFilter(tab.id)}
                      className="pill-btn"
                      style={{
                        padding: '0.45rem 1rem',
                        fontSize: '0.85rem',
                        background: activeFilter === tab.id ? 'var(--accent-color)' : 'var(--card-bg)',
                        color: activeFilter === tab.id ? '#ffffff' : 'var(--text-primary)',
                        border: '1px solid var(--card-border)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Projects Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
              {filteredProjects.map((p, idx) => (
                <AnimatedCard
                  key={idx}
                  className="card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    border: '1px solid var(--card-border)',
                    borderRadius: '16px',
                  }}
                >
                  {/* Thumbnail Header Image */}
                  <div
                    style={{
                      width: '100%',
                      height: '210px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: 'var(--bg-secondary)',
                      borderBottom: '1px solid var(--card-border)',
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      onError={(e) => {
                        e.target.src = '/assets/images/scholarxiv.png';
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                      }}
                    />
                    <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="pill-badge" style={{ background: 'rgba(0,0,0,0.65)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.75rem', backdropFilter: 'blur(4px)' }}>
                        {p.category === 'medical' ? '🔬 Medical AI' : p.category === 'fullstack' ? '⚡ Full-Stack' : '🧠 Deep Learning'}
                      </span>
                    </div>
                  </div>

                  {/* Project Details Content */}
                  <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.65rem', lineHeight: '1.35', color: 'var(--text-primary)' }}>
                        {p.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.55', marginBottom: '1.25rem' }}>
                        {p.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.25rem' }}>
                        {p.tags?.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="tech-tag"
                            style={{
                              background: 'var(--badge-bg)',
                              border: '1px solid var(--badge-border)',
                              color: 'var(--badge-text)',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '9999px',
                              fontSize: '0.785rem',
                              fontWeight: 500,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.85rem', borderTop: '1px solid var(--card-border)' }}>
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pill-btn"
                            style={{
                              flex: 1,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.3rem',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              background: 'var(--accent-color)',
                              color: '#ffffff',
                              textDecoration: 'none',
                              padding: '0.5rem 0.6rem',
                              borderRadius: '10px',
                            }}
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight size={14} />
                          </a>
                        )}
                        <Link
                          href={`/contracting?project=${encodeURIComponent(p.title)}`}
                          className="pill-btn"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.3rem',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background: 'var(--badge-bg)',
                            color: 'var(--accent-light)',
                            border: '1px solid var(--badge-border)',
                            textDecoration: 'none',
                            padding: '0.5rem 0.65rem',
                            borderRadius: '10px',
                          }}
                        >
                          <span>Contract</span>
                        </Link>
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pill-btn outlined-btn"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.3rem',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              background: 'var(--bg-primary)',
                              color: 'var(--text-primary)',
                              borderColor: 'var(--card-border)',
                              textDecoration: 'none',
                              padding: '0.5rem 0.65rem',
                              borderRadius: '10px',
                            }}
                          >
                            <Github size={14} />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </AnimatedCard>
              ))}
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
