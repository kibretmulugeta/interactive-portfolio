'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { isAdmin } from '@/lib/auth';

export default function Navbar() {
  const { user, isLoading } = useUser();
  const [theme, setTheme] = useState('light');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('km_portfolio_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('km_portfolio_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <header className="navbar-container">
      <nav className="navbar" id="navbar">
        <Link href="/" className="logo">
          <span className="logo-text">Kibret Mulugeta</span>
          <span className="logo-dot">.</span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className={`nav-links-wrapper ${mobileOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link href="/#about" className="nav-link">About</Link></li>
            <li><Link href="/#creativity" className="nav-link">Creativity</Link></li>
            <li><Link href="/#projects" className="nav-link">Projects</Link></li>
            <li><Link href="/#events" className="nav-link">Events</Link></li>
            <li><Link href="/#experience" className="nav-link">Experience</Link></li>
            <li><Link href="/contracting" className="nav-link" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>Client Portal</Link></li>
            
            {!isLoading && user && isAdmin(user) && (
              <li>
                <Link href="/admin" className="nav-link" style={{ color: '#facc15', fontWeight: 600 }}>
                  Admin
                </Link>
              </li>
            )}

            {!isLoading && (
              <li>
                {user ? (
                  <a href="/api/auth/logout" className="auth-nav-btn">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout ({user.given_name || user.name?.split(' ')[0] || 'User'})</span>
                  </a>
                ) : (
                  <a href="/api/auth/login" className="auth-nav-btn">
                    <i className="fa-solid fa-right-to-bracket"></i>
                    <span>Client Login / Register</span>
                  </a>
                )}
              </li>
            )}
          </ul>
        </div>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light and dark theme">
          <i className="fa-solid fa-moon icon-moon"></i>
          <i className="fa-solid fa-sun icon-sun"></i>
        </button>
      </nav>
    </header>
  );
}
