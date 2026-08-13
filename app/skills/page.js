'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedSection, { AnimatedCard } from '@/components/AnimatedSection';
import { Cpu, Microscope, Zap, Database, Terminal, Code2, Cloud, CheckCircle2 } from 'lucide-react';

export default function SkillsPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const skills = profile?.skills || {
    deepLearning: ['PyTorch', 'TensorFlow', 'Keras', 'MONAI', 'Scikit-learn'],
    medicalImaging: ['NIFTI', 'DICOM', 'SimpleITK', 'NiBabel', 'OpenCV'],
    optimization: ['Bio-inspired Optimization', 'Neural Plasticity Learning', 'Genetic Algorithms', 'Particle Swarm Optimization (PSO)', 'Hyperparameter Optimization'],
    dataEngineering: ['NumPy', 'Pandas', 'SciPy', 'SQL', 'Apache Spark'],
    mlops: ['Linux', 'Docker', 'MLflow', 'Git', 'Jupyter Notebook', 'Google Colab', 'Overleaf'],
    programmingLanguages: ['Python', 'C++', 'Java', 'SQL', 'LaTeX'],
    cloudPlatforms: ['AWS', 'Google Cloud Platform (GCP)', 'Microsoft Azure'],
  };

  return (
    <>
      <Navbar />
      <main className="main-content">
        <section className="section">
          <div className="container">
            <AnimatedSection>
              <div className="section-header align-left" style={{ marginBottom: '2.5rem' }}>
                <span className="pill-badge" style={{ background: 'var(--badge-bg)', color: 'var(--accent-light)' }}>
                  Technical Architecture
                </span>
                <h1 className="section-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Skills & Engineering Competencies</h1>
                <p className="section-subtitle">
                  Specialized stack in Deep Learning, Medical Imaging Pipelines, Bio-inspired Metaheuristics, MLOps, and Distributed Computing.
                </p>
              </div>
            </AnimatedSection>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              
              {/* Deep Learning */}
              <AnimatedCard className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--accent-color)' }}>
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Deep Learning & AI</h3>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Neural Networks & Frameworks</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {skills.deepLearning?.map((s, idx) => (
                    <span key={idx} className="tech-tag" style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', color: 'var(--badge-text)', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>
                      <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px', color: 'var(--accent-light)' }} />
                      {s}
                    </span>
                  ))}
                </div>
              </AnimatedCard>

              {/* Medical Imaging */}
              <AnimatedCard className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(8, 145, 178, 0.1)', color: 'var(--accent-cyan)' }}>
                    <Microscope size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Medical Imaging</h3>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>MRI, CT, DICOM & NIfTI Pipelines</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {skills.medicalImaging?.map((s, idx) => (
                    <span key={idx} className="tech-tag" style={{ background: 'rgba(8, 145, 178, 0.08)', border: '1px solid rgba(8, 145, 178, 0.25)', color: 'var(--accent-cyan)', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>
                      <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '5px' }} />
                      {s}
                    </span>
                  ))}
                </div>
              </AnimatedCard>

              {/* Optimization */}
              <AnimatedCard className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Optimization Algorithms</h3>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Bio-inspired & Neuro-Plasticity</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {skills.optimization?.map((s, idx) => (
                    <span key={idx} className="tech-tag" style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.25)', color: '#d97706', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </AnimatedCard>

              {/* Data Engineering */}
              <AnimatedCard className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                    <Database size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Data Engineering</h3>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Analytics & Processing</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {skills.dataEngineering?.map((s, idx) => (
                    <span key={idx} className="tech-tag" style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', color: 'var(--badge-text)', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </AnimatedCard>

              {/* MLOps & Tooling */}
              <AnimatedCard className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
                    <Terminal size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>MLOps & Tooling</h3>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Deployment & Research Infrastructure</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {skills.mlops?.map((s, idx) => (
                    <span key={idx} className="tech-tag" style={{ background: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.25)', color: '#db2777', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </AnimatedCard>

              {/* Programming Languages & Cloud */}
              <AnimatedCard className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-light)' }}>
                    <Code2 size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Languages & Cloud</h3>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Python, C++, Java, AWS & GCP</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {skills.programmingLanguages?.concat(skills.cloudPlatforms || []).map((s, idx) => (
                    <span key={idx} className="tech-tag" style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', color: 'var(--badge-text)', padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </AnimatedCard>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
