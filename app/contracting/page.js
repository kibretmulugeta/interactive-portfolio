'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from '@/components/Navbar';

export default function ContractingPage() {
  const { user, isLoading } = useUser();
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    projectType: 'U-Net Brain MRI Segmentation',
    budget: '$5,000 - $15,000',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        clientName: user.name || '',
        clientEmail: user.email || '',
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
      setStatusMessage({ type: 'success', text: 'Contract inquiry submitted successfully! Kibret will review your project details.' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="main-content">
          <div className="container section text-center">
            <p>Loading authenticated session...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="main-content">
        <section className="section contracting-hero">
          <div className="container">
            <div className="section-header">
              <span className="pill-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                <span className="badge-text">Medical AI & Custom Architecture Contracting</span>
              </span>
              <h1 className="section-title">Initiate a Project Contract</h1>
              <p className="section-subtitle">
                Welcome, <strong>{user?.name || user?.email}</strong>. Please describe your medical imaging pipeline, U-Net architecture, or neural plasticity research requirements.
              </p>
            </div>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem' }}>
              {submittedInquiry ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div className="success-icon-badge" style={{ margin: '0 auto 1.5rem auto' }}>
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Contract Proposal Received!</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Your inquiry ID is <code>{submittedInquiry._id}</code>. Status: <span className="status-badge status-pending">Pending Review</span>
                  </p>
                  <button
                    onClick={() => { setSubmittedInquiry(null); setStatusMessage(null); }}
                    className="pill-btn outlined-btn"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  {statusMessage && statusMessage.type === 'error' && (
                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#f87171', marginBottom: '1.5rem' }}>
                      <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: '0.5rem' }}></i>
                      {statusMessage.text}
                    </div>
                  )}

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="clientName">Your Name</label>
                      <input
                        type="text"
                        id="clientName"
                        name="clientName"
                        className="form-input"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="clientEmail">Your Email</label>
                      <input
                        type="email"
                        id="clientEmail"
                        name="clientEmail"
                        className="form-input"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-grid" style={{ marginTop: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="projectType">Project Specialty</label>
                      <select
                        id="projectType"
                        name="projectType"
                        className="form-input"
                        value={formData.projectType}
                        onChange={handleChange}
                        style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}
                      >
                        <option value="U-Net Brain MRI Segmentation">U-Net Brain MRI Segmentation</option>
                        <option value="Medical Imaging Pipeline">Medical Imaging Pipeline</option>
                        <option value="Neural Plasticity Algorithm">Neural Plasticity Algorithm</option>
                        <option value="Custom AI Consulting">Custom AI Consulting</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="budget">Estimated Budget</label>
                      <select
                        id="budget"
                        name="budget"
                        className="form-input"
                        value={formData.budget}
                        onChange={handleChange}
                        style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}
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
                    <label htmlFor="description">Technical Scope & Requirements</label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-textarea"
                      rows={5}
                      placeholder="Please outline datasets, GPU resource availability, expected performance metrics (e.g. Dice score target), and timeline constraints..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn" disabled={submitting} style={{ marginTop: '1.5rem' }}>
                    <span>{submitting ? 'Submitting Proposal...' : 'Submit Contract Proposal'}</span>
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
