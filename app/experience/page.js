'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedSection, { AnimatedCard } from '@/components/AnimatedSection';
import CategoryIcon from '@/components/CategoryIcon';
import { Briefcase, GraduationCap, Calendar, Building, CheckCircle2 } from 'lucide-react';

export default function ExperiencePage() {
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

  const experience = profile?.experience || [
    {
      jobTitle: 'AI & Systems Engineer',
      company: 'Freelance & Research Consulting',
      date: '2021 - Present',
      bullets: [
        'Designed custom deep learning pipelines and neural plasticity hyperparameter tuning algorithms for client models.',
        'Developed full-stack web applications using Next.js, React, Node.js, and MongoDB.',
        'Provided technical consulting on medical image analysis, DICOM/NIfTI data preprocessing, and MLOps deployments.',
      ],
    },
  ];

  const education = profile?.education || [
    {
      degree: 'Master of Science in Computer Engineering (AI & Data Engineering)',
      institution: 'Bahir Dar University, Ethiopia',
      date: '2025',
      thesis: 'GPA: 3.45/4.0',
    },
    {
      degree: 'Bachelor of Science in Electrical and Computer Engineering',
      institution: 'Debre Berhan University, Ethiopia',
      date: '2021',
      thesis: '',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="main-content">
        <section className="section">
          <div className="container">
            <AnimatedSection>
              <div className="section-header align-left" style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <CategoryIcon type="experience" size={54} />
                  <div>
                    <span className="pill-badge" style={{ background: 'var(--badge-bg)', color: 'var(--accent-light)' }}>
                      Professional Background
                    </span>
                    <h1 className="section-title" style={{ fontSize: '2.2rem', marginTop: '0.25rem' }}>Experience & Education</h1>
                  </div>
                </div>
                <p className="section-subtitle">
                  Academic qualifications in Computer Engineering alongside industry experience in AI, Systems Architecture, and Consulting.
                </p>
              </div>
            </AnimatedSection>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              
              {/* Experience Column */}
              <div>
                <AnimatedSection>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    <Briefcase style={{ color: 'var(--accent-color)' }} />
                    <h2 className="section-title" style={{ textAlign: 'left', margin: 0, fontSize: '1.5rem' }}>Work Experience</h2>
                  </div>
                </AnimatedSection>

                {experience.map((exp, idx) => (
                  <AnimatedCard key={idx} className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{exp.jobTitle}</h3>
                        <span style={{ color: 'var(--accent-light)', fontSize: '0.9rem' }}>{exp.company}</span>
                      </div>
                      <span className="pill-badge" style={{ padding: '0.2rem 0.7rem' }}>{exp.date}</span>
                    </div>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                      {exp.bullets?.map((bullet, bIdx) => (
                        <li key={bIdx} style={{ marginBottom: '0.4rem' }}>{bullet}</li>
                      ))}
                    </ul>
                  </AnimatedCard>
                ))}
              </div>

              {/* Education Column */}
              <div>
                <AnimatedSection>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    <GraduationCap style={{ color: 'var(--accent-cyan)' }} />
                    <h2 className="section-title" style={{ textAlign: 'left', margin: 0, fontSize: '1.5rem' }}>Education</h2>
                  </div>
                </AnimatedSection>

                {education.map((edu, idx) => (
                  <AnimatedCard key={idx} className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span className="pill-badge" style={{ padding: '0.2rem 0.7rem' }}>{edu.date}</span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.4rem' }}>{edu.degree}</h3>
                    <p style={{ color: 'var(--accent-light)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{edu.institution}</p>
                    {edu.thesis ? (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{edu.thesis}</p>
                    ) : null}
                  </AnimatedCard>
                ))}
              </div>

            </div>

          </div>
        </section>
      </main>
    </>
  );
}
