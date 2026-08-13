'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Sun, Moon, Menu, X, LogIn, LogOut, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

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
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.4rem' }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-links-wrapper ${mobileOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link href="/#about" className="nav-link" onClick={() => setMobileOpen(false)}>About</Link></li>
            <li><Link href="/#skills" className="nav-link" onClick={() => setMobileOpen(false)}>Skills</Link></li>
            <li><Link href="/#research" className="nav-link" onClick={() => setMobileOpen(false)}>Research</Link></li>
            <li><Link href="/#creativity" className="nav-link" onClick={() => setMobileOpen(false)}>Insights</Link></li>
            <li><Link href="/#projects" className="nav-link" onClick={() => setMobileOpen(false)}>Projects</Link></li>
            <li><Link href="/#events" className="nav-link" onClick={() => setMobileOpen(false)}>Events</Link></li>
            <li><Link href="/#experience" className="nav-link" onClick={() => setMobileOpen(false)}>Experience</Link></li>
            <li><Link href="/contracting" className="nav-link" onClick={() => setMobileOpen(false)} style={{ color: 'var(--accent-light)', fontWeight: 600 }}>Client Portal</Link></li>
            
            {!isLoading && (
              <li>
                {user ? (
                  <a href="/api/auth/logout" className="auth-nav-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <LogOut size={16} />
                    <span>Logout ({user.given_name || user.name?.split(' ')[0] || 'User'})</span>
                  </a>
                ) : (
                  <a href="/api/auth/login" className="auth-nav-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <LogIn size={16} />
                    <span>Client Login / Register</span>
                  </a>
                )}
              </li>
            )}
          </ul>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle light and dark theme"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--badge-bg)',
            border: '1px solid var(--badge-border)',
            color: 'var(--accent-light)',
            borderRadius: '9999px',
            width: '38px',
            height: '38px',
            cursor: 'pointer',
          }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
      </nav>
    </header>
  );
}
