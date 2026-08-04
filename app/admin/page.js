'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from '@/components/Navbar';

export default function AdminDashboardPage() {
  const { user, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState('cms'); // 'cms' or 'inquiries'
  
  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [inquiriesError, setInquiriesError] = useState(null);

  // Profile CMS State
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  useEffect(() => {
    if (user) {
      fetchInquiries();
      fetchProfileCMS();
    }
  }, [user]);

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    setInquiriesError(null);
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}: Access Denied`);
      setInquiries(data.data || []);
    } catch (err) {
      setInquiriesError(err.message);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const fetchProfileCMS = async () => {
    setLoadingProfile(true);
    try {
      const res = await fetch('/api/profile');
      const data = await res.json();
      if (data.data) {
        setProfileData(data.data);
      }
    } catch (err) {
      console.error('Error loading profile CMS:', err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(`Failed to update status: ${err.error}`);
        return;
      }
      setInquiries(prev => prev.map(item => (item._id === id ? { ...item, status: newStatus } : item)));
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  const handleHeroChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setProfileData(prev => {
      const updated = [...(prev.projects || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const saveProfileCMS = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setSaveMessage(null);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to save portfolio content.');
      }

      setSaveMessage({ type: 'success', text: 'Portfolio content saved successfully! All updates are live.' });
    } catch (err) {
      setSaveMessage({ type: 'error', text: err.message });
    } finally {
      setSavingProfile(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="main-content">
          <div className="container section text-center">
            <p>Verifying Auth0 session credentials...</p>
          </div>
        </main>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="main-content">
          <section className="section">
            <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
              <div className="card" style={{ padding: '3rem 2rem' }}>
                <i className="fa-solid fa-lock" style={{ fontSize: '3rem', color: 'var(--accent-color)', marginBottom: '1rem' }}></i>
                <h2>Authentication Required</h2>
                <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem 0' }}>
                  You must be logged in with an Administrator account to view and edit the contracting dashboard.
                </p>
                <a href="/api/auth/login" className="pill-btn outlined-btn" style={{ background: 'var(--accent-color)', color: '#fff' }}>
                  Sign In via Auth0 / Google
                </a>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  if (inquiriesError && (inquiriesError.includes('Forbidden') || inquiriesError.includes('403'))) {
    return (
      <>
        <Navbar />
        <main className="main-content">
          <section className="section">
            <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
              <div className="card" style={{ padding: '3rem 2rem', borderColor: 'rgba(239, 68, 68, 0.4)' }}>
                <i className="fa-solid fa-shield-halved" style={{ fontSize: '3rem', color: '#f87171', marginBottom: '1rem' }}></i>
                <h2 style={{ color: '#f87171' }}>403 Access Denied</h2>
                <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem 0' }}>
                  Logged in as <strong>{user.email}</strong>, but this account lacks the <code>Admin</code> role claim required to view or edit portfolio content.
                </p>
                <a href="/api/auth/logout" className="pill-btn outlined-btn">
                  Sign Out / Switch Account
                </a>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="main-content">
        <section className="section admin-hero">
          <div className="container">
            <div className="section-header align-left" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 className="section-title">Admin Dashboard</h1>
                <p className="section-subtitle">
                  Manage portfolio content CMS & client contract proposals.
                </p>
              </div>

              {/* Navigation Tabs */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setActiveTab('cms')}
                  className={`pill-btn ${activeTab === 'cms' ? 'outlined-btn' : ''}`}
                  style={{
                    background: activeTab === 'cms' ? 'var(--accent-color)' : 'var(--bg-secondary)',
                    color: '#fff',
                  }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Edit Portfolio CMS</span>
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`pill-btn ${activeTab === 'inquiries' ? 'outlined-btn' : ''}`}
                  style={{
                    background: activeTab === 'inquiries' ? 'var(--accent-color)' : 'var(--bg-secondary)',
                    color: '#fff',
                  }}
                >
                  <i className="fa-solid fa-inbox"></i>
                  <span>Client Inquiries ({inquiries.length})</span>
                </button>
              </div>
            </div>

            {/* TAB 1: PORTFOLIO CONTENT CMS EDITOR */}
            {activeTab === 'cms' && (
              <div className="card" style={{ padding: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Edit Live Portfolio Content</h2>

                {saveMessage && (
                  <div
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      marginBottom: '1.5rem',
                      background: saveMessage.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      border: saveMessage.type === 'success' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                      color: saveMessage.type === 'success' ? '#4ade80' : '#f87171',
                    }}
                  >
                    {saveMessage.text}
                  </div>
                )}

                {loadingProfile || !profileData ? (
                  <p>Loading profile configuration...</p>
                ) : (
                  <form onSubmit={saveProfileCMS}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-light)' }}>1. Profile Photo & Hero Bio</h3>

                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="photoUrl">Profile Photo Image URL / Path</label>
                        <input
                          type="text"
                          id="photoUrl"
                          className="form-input"
                          value={profileData.hero?.photoUrl || ''}
                          onChange={(e) => handleHeroChange('photoUrl', e.target.value)}
                          placeholder="e.g. /assets/images/kibret_photo.jpg"
                          required
                        />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Current Photo: {profileData.hero?.photoUrl}
                        </span>
                      </div>

                      <div className="form-group">
                        <label htmlFor="heroName">Full Name</label>
                        <input
                          type="text"
                          id="heroName"
                          className="form-input"
                          value={profileData.hero?.name || ''}
                          onChange={(e) => handleHeroChange('name', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-grid" style={{ marginTop: '1rem' }}>
                      <div className="form-group">
                        <label htmlFor="heroTitle">Professional Title</label>
                        <input
                          type="text"
                          id="heroTitle"
                          className="form-input"
                          value={profileData.hero?.title || ''}
                          onChange={(e) => handleHeroChange('title', e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="badgeText">Availability Badge Text</label>
                        <input
                          type="text"
                          id="badgeText"
                          className="form-input"
                          value={profileData.hero?.badgeText || ''}
                          onChange={(e) => handleHeroChange('badgeText', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label htmlFor="heroBio">Hero Bio / Research Focus</label>
                      <textarea
                        id="heroBio"
                        className="form-textarea"
                        rows={4}
                        value={profileData.hero?.bio || ''}
                        onChange={(e) => handleHeroChange('bio', e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', margin: '2rem 0 1rem 0', color: 'var(--accent-light)' }}>2. Featured Projects</h3>
                    
                    {profileData.projects?.map((proj, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--card-border)' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Project #{idx + 1}</h4>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Project Title</label>
                            <input
                              type="text"
                              className="form-input"
                              value={proj.title || ''}
                              onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label>Project Image Path / URL</label>
                            <input
                              type="text"
                              className="form-input"
                              value={proj.image || ''}
                              onChange={(e) => handleProjectChange(idx, 'image', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group" style={{ marginTop: '1rem' }}>
                          <label>Description</label>
                          <textarea
                            className="form-textarea"
                            rows={3}
                            value={proj.description || ''}
                            onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={savingProfile}
                      style={{ marginTop: '1.5rem', background: 'var(--accent-color)', width: '100%' }}
                    >
                      <i className="fa-solid fa-floppy-disk"></i>
                      <span>{savingProfile ? 'Saving Changes to MongoDB...' : 'Save Portfolio Changes Live'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: CLIENT CONTRACTING INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3>Client Contract Proposals</h3>
                  <button onClick={fetchInquiries} className="pill-btn outlined-btn">
                    <i className="fa-solid fa-rotate-right"></i>
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="card admin-table-wrapper">
                  {loadingInquiries ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                      <p>Loading inquiries from MongoDB...</p>
                    </div>
                  ) : inquiries.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                      <i className="fa-solid fa-folder-open" style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}></i>
                      <p>No contract inquiries submitted yet.</p>
                    </div>
                  ) : (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Client</th>
                          <th>Project Specialty</th>
                          <th>Budget</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.map(item => (
                          <tr key={item._id}>
                            <td style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <strong>{item.clientName}</strong>
                              <br />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.clientEmail}</span>
                            </td>
                            <td>
                              <span className="tech-tag" style={{ display: 'inline-block' }}>{item.projectType}</span>
                            </td>
                            <td style={{ fontWeight: 600 }}>{item.budget}</td>
                            <td style={{ maxWidth: '300px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                              {item.description}
                            </td>
                            <td>
                              <span className={`status-badge status-${item.status}`}>
                                {item.status}
                              </span>
                            </td>
                            <td>
                              <select
                                value={item.status}
                                onChange={(e) => updateStatus(item._id, e.target.value)}
                                style={{
                                  background: 'var(--bg-secondary)',
                                  color: 'var(--text-primary)',
                                  border: '1px solid var(--card-border)',
                                  borderRadius: '6px',
                                  padding: '0.3rem 0.5rem',
                                  fontSize: '0.8rem',
                                  cursor: 'pointer',
                                }}
                              >
                                <option value="pending">Pending</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

          </div>
        </section>
      </main>
    </>
  );
}
