'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedSection, { AnimatedCard } from '@/components/AnimatedSection';
import CategoryIcon from '@/components/CategoryIcon';
import { Calendar, MapPin, Award, Presentation } from 'lucide-react';

export default function EventsPage() {
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

  const events = profile?.events || [
    {
      title: 'Master\'s Thesis Defense & Presentation',
      date: '2025',
      location: 'Bahir Dar University, Ethiopia',
      description: 'Presented research on "Reward-Driven Neural Plasticity Inspired Optimization for Enhancing U-Net Based Medical Image Segmentation".',
    },
    {
      title: 'Ethiopian AI & Healthcare Symposium',
      date: '2024',
      location: 'Addis Ababa, Ethiopia',
      description: 'Participated in clinical AI sessions focusing on medical image diagnostics and bio-inspired optimization algorithms in developing nations.',
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
                  <CategoryIcon type="events" size={54} />
                  <div>
                    <span className="pill-badge" style={{ background: 'var(--badge-bg)', color: 'var(--accent-light)' }}>
                      Academic & Professional Gatherings
                    </span>
                    <h1 className="section-title" style={{ fontSize: '2.2rem', marginTop: '0.25rem' }}>Events, Conferences & Speaking</h1>
                  </div>
                </div>
                <p className="section-subtitle">
                  Academic symposiums, thesis defense presentations, workshops, and AI engineering community discussions.
                </p>
              </div>
            </AnimatedSection>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {events.map((evt, idx) => (
                <AnimatedCard key={idx} className="card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                    <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--accent-color)' }}>
                      <Presentation size={22} />
                    </div>
                    <span className="pill-badge" style={{ fontSize: '0.8rem' }}>{evt.date}</span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{evt.title}</h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-light)', fontSize: '0.875rem', marginBottom: '0.85rem' }}>
                    <MapPin size={15} />
                    <span>{evt.location}</span>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.5' }}>
                    {evt.description}
                  </p>
                </AnimatedCard>
              ))}
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
