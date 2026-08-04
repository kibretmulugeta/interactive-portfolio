'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Navbar from '@/components/Navbar';

export default function AdminDashboardPage() {
  const { user, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'projects', 'blogs', 'inquiries'
  
  // Profile & Resume State
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);

  // Blogs & Analytics State
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [newBlog, setNewBlog] = useState({ title: '', excerpt: '', content: '', readTime: '5 min read' });
  const [publishingBlog, setPublishingBlog] = useState(false);
  const [blogMessage, setBlogMessage] = useState(null);

  // New Project Form State
  const [newProject, setNewProject] = useState({ title: '', description: '', image: '', tags: '', liveUrl: '#', githubUrl: 'https://github.com/kibretmulugeta' });
  const [showAddProject, setShowAddProject] = useState(false);

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [inquiriesError, setInquiriesError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProfileCMS();
      fetchBlogs();
      fetchInquiries();
    }
  }, [user]);

  const fetchProfileCMS = async () => {
    setLoadingProfile(true);
    try {
      const res = await fetch('/api/profile');
      const data = await res.json();
      if (data.data) setProfileData(data.data);
    } catch (err) {
      console.error('Error loading profile:', err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.data) setBlogs(data.data);
    } catch (err) {
      console.error('Error loading blogs:', err);
    } finally {
      setLoadingBlogs(false);
    }
  };

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

  // Profile & Resume Handlers
  const handleHeroChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const saveProfileCMS = async (e) => {
    if (e) e.preventDefault();
    setSavingProfile(true);
    setProfileMessage(null);
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to save changes.');
      setProfileMessage({ type: 'success', text: 'Profile & Resume settings saved live!' });
    } catch (err) {
      setProfileMessage({ type: 'error', text: err.message });
    } finally {
      setSavingProfile(false);
    }
  };

  // Project CRUD Handlers
  const handleAddProject = (e) => {
    e.preventDefault();
    const tagArray = typeof newProject.tags === 'string' ? newProject.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    const createdProject = { ...newProject, tags: tagArray.length > 0 ? tagArray : ['AI', 'PyTorch'] };

    setProfileData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), createdProject],
    }));

    setNewProject({ title: '', description: '', image: '', tags: '', liveUrl: '#', githubUrl: 'https://github.com/kibretmulugeta' });
    setShowAddProject(false);
    alert('Project added to list! Click "Save All Projects to MongoDB Live" to publish changes.');
  };

  const handleProjectEdit = (index, field, value) => {
    setProfileData(prev => {
      const updated = [...(prev.projects || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const handleDeleteProject = (index) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProfileData(prev => ({
        ...prev,
        projects: prev.projects.filter((_, idx) => idx !== index),
      }));
    }
  };

  // Blog CRUD & Analytics Handlers
  const handlePublishBlog = async (e) => {
    e.preventDefault();
    setPublishingBlog(true);
    setBlogMessage(null);
    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to publish blog post.');

      setBlogMessage({ type: 'success', text: 'Blog post published successfully!' });
      setNewBlog({ title: '', excerpt: '', content: '', readTime: '5 min read' });
      fetchBlogs();
    } catch (err) {
      setBlogMessage({ type: 'error', text: err.message });
    } finally {
      setPublishingBlog(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete blog post');
      fetchBlogs();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const updateInquiryStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setInquiries(prev => prev.map(item => (item._id === id ? { ...item, status: newStatus } : item)));
    } catch (err) {
      alert(`Error updating inquiry: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="main-content">
          <div className="container section text-center">
            <p>Verifying Auth0 Admin session...</p>
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
                  Please sign in with an Administrator account to access the dashboard.
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
                  Account <strong>{user.email}</strong> is not configured with Admin privileges.
                </p>
                <a href="/api/auth/logout" className="pill-btn outlined-btn">
                  Sign Out
                </a>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  const totalBlogViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);
  const totalResumeDownloads = profileData?.resumeDownloads || 0;
  const downloadLogs = profileData?.resumeDownloadLogs || [];

  return (
    <>
      <Navbar />
      <main className="main-content">
        <section className="section admin-hero">
          <div className="container">
            
            {/* Header Title & Nav Tabs */}
            <div className="section-header align-left" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 className="section-title">Admin Dashboard</h1>
                <p className="section-subtitle">
                  Logged in as <strong>{user.email}</strong>
                </p>
              </div>

              {/* Navigation Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="pill-btn"
                  style={{
                    background: activeTab === 'profile' ? 'var(--accent-color)' : 'var(--bg-secondary)',
                    color: '#fff',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <i className="fa-solid fa-id-card"></i>
                  <span>Profile & Resume ({totalResumeDownloads} Downloads)</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className="pill-btn"
                  style={{
                    background: activeTab === 'projects' ? 'var(--accent-color)' : 'var(--bg-secondary)',
                    color: '#fff',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <i className="fa-solid fa-diagram-project"></i>
                  <span>Manage Projects ({profileData?.projects?.length || 0})</span>
                </button>

                <button
                  onClick={() => setActiveTab('blogs')}
                  className="pill-btn"
                  style={{
                    background: activeTab === 'blogs' ? 'var(--accent-color)' : 'var(--bg-secondary)',
                    color: '#fff',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <i className="fa-solid fa-pen-nib"></i>
                  <span>Blogs & Analytics</span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="pill-btn"
                  style={{
                    background: activeTab === 'inquiries' ? 'var(--accent-color)' : 'var(--bg-secondary)',
                    color: '#fff',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <i className="fa-solid fa-inbox"></i>
                  <span>Proposals ({inquiries.length})</span>
                </button>
              </div>
            </div>

            {/* TAB 1: PROFILE & RESUME MANAGEMENT + DOWNLOAD NOTIFICATION LOGS */}
            {activeTab === 'profile' && (
              <div>
                {/* Resume Downloads Notification Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div className="card" style={{ padding: '1.5rem', background: 'var(--card-bg)' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Resume Downloads</span>
                    <h2 style={{ fontSize: '2.2rem', marginTop: '0.25rem', color: '#4ade80' }}>
                      <i className="fa-solid fa-file-arrow-down" style={{ marginRight: '0.5rem' }}></i>
                      {totalResumeDownloads}
                    </h2>
                  </div>

                  <div className="card" style={{ padding: '1.5rem', background: 'var(--card-bg)' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Latest Download Notification</span>
                    <h4 style={{ fontSize: '1.1rem', marginTop: '0.5rem', color: 'var(--accent-light)' }}>
                      {downloadLogs.length > 0 ? new Date(downloadLogs[downloadLogs.length - 1].downloadedAt).toLocaleString() : 'No downloads recorded yet'}
                    </h4>
                  </div>
                </div>

                {/* Live Download Activity Log Feed */}
                <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fa-solid fa-bell" style={{ color: '#facc15' }}></i>
                    <span>Client Resume Download Notifications</span>
                  </h3>

                  {downloadLogs.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No client download logs recorded yet.</p>
                  ) : (
                    <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                      {downloadLogs.slice().reverse().map((log, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                          <div>
                            <span style={{ color: '#4ade80', fontWeight: 600 }}>Client downloaded CV / Resume</span>
                            <br />
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.ip} • {log.userAgent?.split(' ')[0] || 'Browser'}</span>
                          </div>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                            {new Date(log.downloadedAt).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Edit Profile & Resume Form */}
                <div className="card" style={{ padding: '2.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Edit Profile & Resume Settings</h2>

                  {profileMessage && (
                    <div style={{ padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', background: profileMessage.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: profileMessage.type === 'success' ? '#4ade80' : '#f87171' }}>
                      {profileMessage.text}
                    </div>
                  )}

                  {loadingProfile || !profileData ? (
                    <p>Loading profile settings...</p>
                  ) : (
                    <form onSubmit={saveProfileCMS}>
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="photoUrl">Profile Headshot Image URL/Path</label>
                          <input
                            type="text"
                            id="photoUrl"
                            className="form-input"
                            value={profileData.hero?.photoUrl || ''}
                            onChange={(e) => handleHeroChange('photoUrl', e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="resumeUrl">Resume PDF / Download Route</label>
                          <input
                            type="text"
                            id="resumeUrl"
                            className="form-input"
                            value={profileData.hero?.resumeUrl || '/api/resume/download'}
                            onChange={(e) => handleHeroChange('resumeUrl', e.target.value)}
                            required
                          />
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Set to <code>/api/resume/download</code> to track every client download automatically.
                          </span>
                        </div>
                      </div>

                      <div className="form-grid" style={{ marginTop: '1rem' }}>
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

                        <div className="form-group">
                          <label htmlFor="heroTitle">Professional Subtitle</label>
                          <input
                            type="text"
                            id="heroTitle"
                            className="form-input"
                            value={profileData.hero?.title || ''}
                            onChange={(e) => handleHeroChange('title', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label htmlFor="heroBio">Hero Biography & Research Summary</label>
                        <textarea
                          id="heroBio"
                          className="form-textarea"
                          rows={4}
                          value={profileData.hero?.bio || ''}
                          onChange={(e) => handleHeroChange('bio', e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <button type="submit" className="submit-btn" disabled={savingProfile} style={{ marginTop: '1.5rem', width: '100%' }}>
                        <i className="fa-solid fa-floppy-disk"></i>
                        <span>{savingProfile ? 'Saving Settings...' : 'Save Profile & Resume Settings'}</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: FULL PROJECT MANAGER */}
            {activeTab === 'projects' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h3>Project Portfolio Manager</h3>
                  <button onClick={() => setShowAddProject(!showAddProject)} className="pill-btn outlined-btn" style={{ background: 'var(--accent-color)', color: '#fff' }}>
                    <i className="fa-solid fa-plus"></i>
                    <span>{showAddProject ? 'Close Form' : 'Add New Project'}</span>
                  </button>
                </div>

                {showAddProject && (
                  <div className="card" style={{ padding: '2rem', marginBottom: '2rem', border: '1px solid var(--accent-color)' }}>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-light)' }}>Add New Project</h4>
                    <form onSubmit={handleAddProject}>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Project Title</label>
                          <input
                            type="text"
                            className="form-input"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Project Image Path / URL</label>
                          <input
                            type="text"
                            className="form-input"
                            value={newProject.image}
                            onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                            placeholder="/assets/images/scholarxiv.png"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Description</label>
                        <textarea
                          className="form-textarea"
                          rows={3}
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          required
                        ></textarea>
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Tech Stack Tags (Comma separated)</label>
                        <input
                          type="text"
                          className="form-input"
                          value={newProject.tags}
                          onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                          placeholder="U-Net, MONAI, PyTorch, FastAPI"
                        />
                      </div>

                      <button type="submit" className="submit-btn" style={{ marginTop: '1rem' }}>
                        <i className="fa-solid fa-plus"></i>
                        <span>Add Project to Portfolio</span>
                      </button>
                    </form>
                  </div>
                )}

                {profileData?.projects?.map((proj, idx) => (
                  <div className="card" key={idx} style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-light)' }}>Project #{idx + 1}: {proj.title}</h4>
                      <button onClick={() => handleDeleteProject(idx)} className="pill-btn outlined-btn" style={{ borderColor: '#f87171', color: '#f87171' }}>
                        <i className="fa-solid fa-trash"></i>
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-input"
                          value={proj.title || ''}
                          onChange={(e) => handleProjectEdit(idx, 'title', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Image URL</label>
                        <input
                          type="text"
                          className="form-input"
                          value={proj.image || ''}
                          onChange={(e) => handleProjectEdit(idx, 'image', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '0.75rem' }}>
                      <label>Description</label>
                      <textarea
                        className="form-textarea"
                        rows={3}
                        value={proj.description || ''}
                        onChange={(e) => handleProjectEdit(idx, 'description', e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                ))}

                <button onClick={saveProfileCMS} className="submit-btn" disabled={savingProfile} style={{ width: '100%', marginTop: '1rem' }}>
                  <i className="fa-solid fa-floppy-disk"></i>
                  <span>{savingProfile ? 'Saving Changes...' : 'Save All Projects to MongoDB Live'}</span>
                </button>
              </div>
            )}

            {/* TAB 3: BLOG ENGINE & VIEW ANALYTICS */}
            {activeTab === 'blogs' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div className="card" style={{ padding: '1.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Published Blog Articles</span>
                    <h2 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>{blogs.length}</h2>
                  </div>
                  <div className="card" style={{ padding: '1.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Article Views</span>
                    <h2 style={{ fontSize: '2rem', marginTop: '0.25rem', color: 'var(--accent-light)' }}>
                      <i className="fa-solid fa-eye" style={{ marginRight: '0.5rem' }}></i>
                      {totalBlogViews}
                    </h2>
                  </div>
                </div>

                <div className="card" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Publish New Technical Article</h3>

                  {blogMessage && (
                    <div style={{ padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', background: blogMessage.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: blogMessage.type === 'success' ? '#4ade80' : '#f87171' }}>
                      {blogMessage.text}
                    </div>
                  )}

                  <form onSubmit={handlePublishBlog}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="blogTitle">Article Title</label>
                        <input
                          type="text"
                          id="blogTitle"
                          className="form-input"
                          placeholder="e.g. Advancements in U-Net DICOM Segmentation"
                          value={newBlog.title}
                          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="readTime">Estimated Read Time</label>
                        <input
                          type="text"
                          id="readTime"
                          className="form-input"
                          value={newBlog.readTime}
                          onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label htmlFor="excerpt">Short Excerpt / Teaser</label>
                      <input
                        type="text"
                        id="excerpt"
                        className="form-input"
                        placeholder="Brief summary displayed on portfolio grid..."
                        value={newBlog.excerpt}
                        onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label htmlFor="blogContent">Article Content</label>
                      <textarea
                        id="blogContent"
                        className="form-textarea"
                        rows={8}
                        placeholder="Write your research article content here..."
                        value={newBlog.content}
                        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="submit-btn" disabled={publishingBlog} style={{ marginTop: '1.5rem' }}>
                      <i className="fa-solid fa-paper-plane"></i>
                      <span>{publishingBlog ? 'Publishing Post...' : 'Publish Blog Post Live'}</span>
                    </button>
                  </form>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Blog Analytics & Reader Views</h3>
                <div className="card admin-table-wrapper">
                  {loadingBlogs ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>Loading blog articles...</div>
                  ) : blogs.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>No blog posts written yet.</div>
                  ) : (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Read Time</th>
                          <th>Views Count</th>
                          <th>Published Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.map(post => (
                          <tr key={post._id}>
                            <td>
                              <strong>{post.title}</strong>
                              <br />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/{post.slug}</span>
                            </td>
                            <td>{post.readTime}</td>
                            <td>
                              <span className="status-badge status-reviewed" style={{ fontSize: '0.85rem' }}>
                                <i className="fa-solid fa-eye" style={{ marginRight: '0.3rem' }}></i>
                                {post.views} Views
                              </span>
                            </td>
                            <td style={{ fontSize: '0.85rem' }}>
                              {new Date(post.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <button onClick={() => handleDeleteBlog(post._id)} className="pill-btn outlined-btn" style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem', color: '#f87171' }}>
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: CLIENT PROPOSALS */}
            {activeTab === 'inquiries' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3>Client Contracting Proposals</h3>
                  <button onClick={fetchInquiries} className="pill-btn outlined-btn">
                    <i className="fa-solid fa-rotate-right"></i>
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="card admin-table-wrapper">
                  {loadingInquiries ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>Loading inquiries...</div>
                  ) : inquiries.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>No inquiries submitted yet.</div>
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
                              <span className="tech-tag">{item.projectType}</span>
                            </td>
                            <td style={{ fontWeight: 600 }}>{item.budget}</td>
                            <td style={{ maxWidth: '300px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                              {item.description}
                            </td>
                            <td>
                              <span className={`status-badge status-${item.status}`}>{item.status}</span>
                            </td>
                            <td>
                              <select
                                value={item.status}
                                onChange={(e) => updateInquiryStatus(item._id, e.target.value)}
                                style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--card-border)', borderRadius: '6px', padding: '0.3rem' }}
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
