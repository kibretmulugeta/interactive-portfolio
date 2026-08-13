'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedSection, { AnimatedCard } from '@/components/AnimatedSection';
import { Github, ExternalLink, Code2, FolderGit2, Layers, Filter } from 'lucide-react';

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

  const projects = profile?.projects || [
    {
      title: 'Brain MRI Tissue Segmentation (U-Net & MONAI)',
      category: 'medical',
      description: 'End-to-end deep learning framework built on MONAI and PyTorch for multi-class axial Brain MRI tissue and lesion segmentation.',
      tags: ['PyTorch', 'MONAI', 'NIfTI', 'U-Net', 'SimpleITK'],
      githubUrl: 'https://github.com/kibretmulugeta',
      liveUrl: 'https://github.com/kibretmulugeta',
    },
    {
      title: 'Neural Plasticity Hyperparameter Optimizer',
      category: 'ai',
      description: 'Bio-inspired metaheuristic optimization engine simulating synaptic weight plastic adaptations to automate deep neural network tuning.',
      tags: ['Python', 'Bio-inspired AI', 'PSO', 'Genetic Algorithms', 'NumPy'],
      githubUrl: 'https://github.com/kibretmulugeta',
      liveUrl: 'https://github.com/kibretmulugeta',
    },
    {
      title: 'Interactive Portfolio & Contracting Portal',
      category: 'fullstack',
      description: 'Full-stack Next.js App Router portfolio with Auth0 role-based client inquiry system, MongoDB backend, and custom design system.',
      tags: ['Next.js 14', 'React', 'MongoDB', 'Auth0', 'Vanilla CSS'],
      githubUrl: 'https://github.com/kibretmulugeta/interactive-portfolio',
      liveUrl: 'https://kibretmulugeta.pro.et',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {filteredProjects.map((p, idx) => (
                <AnimatedCard key={idx} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <FolderGit2 size={24} style={{ color: 'var(--accent-light)' }} />
                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}>
                            <Github size={18} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-light)', transition: 'color 0.2s' }}>
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.6rem' }}>{p.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                      {p.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
                    {p.tags?.map((tag, tIdx) => (
                      <span key={tIdx} className="tech-tag" style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', color: 'var(--badge-text)', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
                        {tag}
                      </span>
                    ))}
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
