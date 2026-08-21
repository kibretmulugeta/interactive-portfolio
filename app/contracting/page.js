'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from '@/components/Navbar';
import { defaultProjects } from '@/lib/projects';
import { Send, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Briefcase, FileText } from 'lucide-react';

function ContractingContent() {
  const { user, isLoading } = useUser();
  const searchParams = useSearchParams();
  const preselectedProject = searchParams.get('project');

  const [projectsList, setProjectsList] = useState(defaultProjects);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    projectType: defaultProjects[0].title,
    budget: '$5,000 - $15,000',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);

  // Fetch dynamic projects list from API profile
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        if (data.data?.projects && data.data.projects.length > 0) {
          setProjectsList(data.data.projects);

          // If a project parameter was passed in URL (e.g. /contracting?project=Chat%20Platform)
          if (preselectedProject) {
            const matched = data.data.projects.find(p =>
              p.title === preselectedProject ||
              p.title.toLowerCase().includes(preselectedProject.toLowerCase())
            );
            if (matched) {
              setFormData(prev => ({ ...prev, projectType: matched.title }));
              return;
            }
          }
        }
      } catch (err) {
        console.error('Error loading projects list:', err);
      }
    }

    loadProjects();
  }, [preselectedProject]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        clientName: user.name || prev.clientName,
        clientEmail: user.email || prev.clientEmail,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/contracting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit inquiry.');
      }

      setSubmittedInquiry(result.inquiry);
      setStatusMessage({ type: 'success', text: 'Contract proposal submitted successfully! Kibret will review your project requirements.' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container section text-center">
        <p>Loading session...</p>
      </div>
    );
  }

  return (
    <section className="section contracting-hero">
      <div className="container">
        <div className="section-header">
          <span className="pill-badge" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} style={{ color: 'var(--accent-light)' }} />
            <span className="badge-text">Clinical AI & Custom Architecture Contracting</span>
          </span>
          <h1 className="section-title">Initiate a Project Contract</h1>
          <p className="section-subtitle">
            Welcome{user?.name ? `, ${user.name}` : ''}. Select a project specialty from the portfolio directory below or outline custom AI architecture requirements.
          </p>
        </div>

        <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem', borderRadius: '20px' }}>
          {submittedInquiry ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <CheckCircle2 size={32} />
              </div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Contract Proposal Received!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Your proposal reference ID is <code>{submittedInquiry._id}</code>.<br />
                Target Project: <strong>{submittedInquiry.projectType}</strong><br />
                Status: <span className="pill-badge" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#d97706', border: '1px solid rgba(234, 179, 8, 0.3)' }}>Pending Review</span>
              </p>
              <button
                onClick={() => { setSubmittedInquiry(null); setStatusMessage(null); }}
                className="pill-btn outlined-btn"
                style={{ cursor: 'pointer' }}
              >
                Submit Another Contract Proposal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              {!user && (
                <div style={{ padding: '1.2rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.25rem' }}>Authentication Required</strong>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Please sign in via Auth0 / Google to initiate a project proposal.</p>
                  </div>
                  <a
                    href={`/api/auth/login?returnTo=${encodeURIComponent(preselectedProject ? `/contracting?project=${encodeURIComponent(preselectedProject)}` : '/contracting')}`}
                    className="pill-btn"
                    style={{ background: 'var(--accent-color)', color: '#ffffff', textDecoration: 'none', padding: '0.55rem 1.25rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
                  >
                    Sign In to Continue
                  </a>
                </div>
              )}

              {statusMessage && statusMessage.type === 'error' && (
                <div style={{ padding: '1rem 1.25rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={18} />
                    <span>{statusMessage.text}</span>
                  </div>
                  {statusMessage.text.toLowerCase().includes('sign in') && (
                    <a
                      href={`/api/auth/login?returnTo=${encodeURIComponent(preselectedProject ? `/contracting?project=${encodeURIComponent(preselectedProject)}` : '/contracting')}`}
                      className="pill-btn"
                      style={{ background: '#ef4444', color: '#ffffff', textDecoration: 'none', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                    >
                      Sign In Now
                    </a>
                  )}
                </div>
              )}


              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="clientName">Your Full Name</label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    className="form-input"
                    placeholder="Dr. Jane Doe / Tech Lead"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="clientEmail">Your Email Address</label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    className="form-input"
                    placeholder="client@organization.com"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-grid" style={{ marginTop: '1rem' }}>
                
                {/* Dynamic Project Selection Dropdown */}
                <div className="form-group">
                  <label htmlFor="projectType" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Briefcase size={14} style={{ color: 'var(--accent-light)' }} />
                    <span>Project Specialty</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="form-input"
                    value={formData.projectType}
                    onChange={handleChange}
                    style={{ background: 'var(--card-bg)', color: 'var(--text-primary)', cursor: 'pointer' }}
                  >
                    {projectsList.map((p, idx) => (
                      <option key={idx} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                    <option value="Custom AI Architecture & Consulting">Custom AI Architecture & Consulting</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Estimated Project Budget</label>
                  <select
                    id="budget"
                    name="budget"
                    className="form-input"
                    value={formData.budget}
                    onChange={handleChange}
                    style={{ background: 'var(--card-bg)', color: 'var(--text-primary)', cursor: 'pointer' }}
                  >
                    <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                    <option value="$30,000+">$30,000+</option>
                    <option value="Flexible / Grant Funded">Flexible / Grant Funded</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label htmlFor="description">Technical Scope & Project Requirements</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  rows={5}
                  placeholder="Outline your target dataset specifications, model architecture requirements, GPU resources, expected Dice performance target, or delivery timeline..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={submitting}
                style={{
                  marginTop: '1.5rem',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.5rem',
                  borderRadius: '12px',
                  background: 'var(--accent-color)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                <Send size={18} />
                <span>{submitting ? 'Submitting Proposal...' : 'Submit Contract Proposal'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ContractingPage() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<div className="container section text-center"><p>Loading Contracting Portal...</p></div>}>
          <ContractingContent />
        </Suspense>
      </main>
    </>
  );
}
