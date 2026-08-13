'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedSection, { AnimatedCard } from '@/components/AnimatedSection';
import MedicalMriVisualizer from '@/components/MedicalMriVisualizer';
import { Copy, Check, Atom, BookOpen, Layers } from 'lucide-react';

export default function ResearchPage() {
  const [profile, setProfile] = useState(null);
  const [copiedBib, setCopiedBib] = useState(false);

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

  const handleCopyBibTeX = (bibText) => {
    navigator.clipboard.writeText(bibText);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2000);
  };

  const researchExperience = profile?.researchExperience || [
    {
      title: "Graduate Researcher - Master's Thesis",
      role: "Graduate Researcher",
      institution: 'Bahir Dar University',
      date: '2023 - 2025',
      thesisTitle: 'Reward-Driven Neural Plasticity Inspired Optimization for Enhancing U-net Based Medical Image Segmentation',
      bullets: [
        'Designed a biologically inspired optimization algorithm based on neural plasticity and reward-driven learning.',
        'Developed deep learning pipelines using PyTorch and TensorFlow for brain MRI segmentation (tumor & stroke lesions).',
        'Implemented preprocessing workflows including normalization, resampling, and augmentation for NIfTI and DICOM datasets.',
        'Evaluated performance using Dice Coefficient, IoU, Precision, and Recall metrics.',
        'Achieved improved convergence stability and segmentation accuracy compared to Random Search and Genetic Algorithms.',
      ],
    },
    {
      title: 'Neuro-Inspired U-Net Optimization Project (Open Source)',
      role: 'Lead Developer',
      institution: 'GitHub Project',
      date: '2023 - 2025',
      bullets: [
        'Developed a reproducible Python framework integrating bio-inspired optimization into deep learning training.',
        'Implemented Attention U-Net models for fine-grained medical image segmentation.',
        'Built automated medical imaging pipelines using MONAI and SimpleITK (skull stripping, preprocessing, artifact removal).',
        'Designed modular codebase for research reproducibility and extension.',
      ],
    },
  ];

  const researchInterests = profile?.researchInterests || [
    'Medical Image Analysis (MRI / CT segmentation, neuroimaging)',
    'Bio-inspired and Neuro-inspired Learning Systems',
    'Explainable AI (XAI) for Healthcare Systems',
    'Deep Learning Optimization and Architecture Design',
    'Domain Adaptation in Clinical AI',
    'Pediatric Neuroimaging and Tumor Analysis',
  ];

  return (
    <>
      <Navbar />
      <main className="main-content">
        <section className="section">
          <div className="container">
            <AnimatedSection>
              <div className="section-header align-left" style={{ marginBottom: '2rem' }}>
                <span className="pill-badge" style={{ background: 'rgba(8, 145, 178, 0.12)', color: 'var(--accent-cyan)', border: '1px solid rgba(8, 145, 178, 0.25)' }}>
                  Academic & Clinical Research
                </span>
                <h1 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Research & Clinical AI Work</h1>
                <p className="section-subtitle">
                  Investigating reward-driven neural plasticity algorithms for medical image segmentation and Attention U-Net architectures.
                </p>
              </div>
            </AnimatedSection>

            {/* Research Experience Cards */}
            {researchExperience.map((res, idx) => (
              <AnimatedCard key={idx} className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600 }}>{res.title}</h3>
                    <span style={{ color: 'var(--accent-light)', fontSize: '0.95rem' }}>{res.role} | {res.institution}</span>
                  </div>
                  <span className="pill-badge" style={{ padding: '0.3rem 0.8rem' }}>{res.date}</span>
                </div>

                {res.thesisTitle && (
                  <div style={{ background: 'var(--bg-primary)', padding: '0.85rem 1.1rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', fontWeight: 500, margin: 0, fontSize: '0.925rem' }}>
                      <strong>Thesis Title:</strong> {res.thesisTitle}
                    </p>
                    <button
                      onClick={() => handleCopyBibTeX(`@mastersthesis{alemu2025reward,\n  title={${res.thesisTitle}},\n  author={Alemu, Kibret Mulugeta},\n  year={2025},\n  school={Bahir Dar University}\n}`)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.775rem', padding: '0.35rem 0.7rem', borderRadius: '6px', border: '1px solid var(--badge-border)', background: 'var(--badge-bg)', color: 'var(--accent-light)', cursor: 'pointer' }}
                    >
                      {copiedBib ? <Check size={14} /> : <Copy size={14} />}
                      {copiedBib ? 'BibTeX Copied!' : 'Copy BibTeX'}
                    </button>
                  </div>
                )}

                <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                  {res.bullets?.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ marginBottom: '0.5rem' }}>{bullet}</li>
                  ))}
                </ul>
              </AnimatedCard>
            ))}

            {/* Interactive MRI Visualizer */}
            <AnimatedSection delay={0.2}>
              <MedicalMriVisualizer />
            </AnimatedSection>

            {/* Research Interests Grid */}
            <AnimatedSection delay={0.3} style={{ marginTop: '3rem' }}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Primary Research Focus</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {researchInterests.map((interest, idx) => (
                  <AnimatedCard key={idx} className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <Atom size={20} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{interest}</span>
                  </AnimatedCard>
                ))}
              </div>
            </AnimatedSection>

          </div>
        </section>
      </main>
    </>
  );
}
