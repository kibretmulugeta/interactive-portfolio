'use client';

import React from 'react';

/**
 * CategoryIcon - Custom Handcrafted Premium Icon Badges
 * Eliminates generic AI-generated single-line look with multi-layer duotone SVGs,
 * glassmorphic background depth, ambient glow backdrops, and interactive micro-animations.
 */

export default function CategoryIcon({ type, size = 54, className = '', style = {} }) {
  // Map types to visual themes
  const configs = {
    'technical-skills': {
      label: 'Technical Skills',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
      glow: 'rgba(99, 102, 241, 0.45)',
      lightGlow: 'rgba(99, 102, 241, 0.25)',
      accent: '#a5b4fc',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Substrate & Outer Pins */}
          <rect x="5" y="5" width="14" height="14" rx="3" fill="url(#chip-grad)" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />
          
          {/* Circuit Pins */}
          <path d="M9 2V5M15 2V5M9 19V22M15 19V22M2 9H5M2 15H5M19 9H22M19 15H22" stroke="#e0e7ff" strokeWidth="1.6" strokeLinecap="round" />
          
          {/* Core Silicon Die */}
          <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="#ffffff" fillOpacity="0.25" stroke="#ffffff" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="1.8" fill="#ffffff" />
          
          {/* Trace Dots */}
          <circle cx="7" cy="7" r="0.75" fill="#a5b4fc" />
          <circle cx="17" cy="7" r="0.75" fill="#a5b4fc" />
          <circle cx="7" cy="17" r="0.75" fill="#a5b4fc" />
          <circle cx="17" cy="17" r="0.75" fill="#a5b4fc" />

          <defs>
            <linearGradient id="chip-grad" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818cf8" />
              <stop offset="1" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    'research': {
      label: 'Research & Clinical AI',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      glow: 'rgba(6, 182, 212, 0.45)',
      lightGlow: 'rgba(6, 182, 212, 0.25)',
      accent: '#67e8f9',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Microscope Base */}
          <path d="M5 21H19M9 21V18H15V21" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Arm & Body Curve */}
          <path d="M16 18C16 14.134 12.866 11 9 11V7" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" />
          
          {/* Optical Tube & Eyepiece */}
          <path d="M8 3H12M10 3V8.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="8.5" y="7" width="3" height="4" rx="1" fill="#67e8f9" />
          
          {/* Clinical Target Reticle / Brain Slice Visualizer */}
          <circle cx="14" cy="7" r="3.5" fill="url(#reticle-grad)" stroke="#ffffff" strokeWidth="1" />
          <path d="M14 4.5V9.5M11.5 7H16.5" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1 1" />
          <circle cx="14" cy="7" r="1" fill="#ffffff" />

          <defs>
            <linearGradient id="reticle-grad" x1="10.5" y1="3.5" x2="17.5" y2="10.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="1" stopColor="#0891b2" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    'projects': {
      label: 'Software & Repositories',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      glow: 'rgba(245, 158, 11, 0.45)',
      lightGlow: 'rgba(245, 158, 11, 0.25)',
      accent: '#fde047',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Folder Backing */}
          <path d="M3 7A2 2 0 0 1 5 5H9.586A2 2 0 0 1 11 5.586L12.414 7H19A2 2 0 0 1 21 9V17A2 2 0 0 1 19 19H5A2 2 0 0 1 3 17V7Z" fill="url(#folder-grad)" stroke="#ffffff" strokeWidth="1.2" />
          
          {/* Git Branch / Code Nodes */}
          <path d="M8 12V16M8 12C8 10.5 10 10.5 11.5 10.5H13.5M16 10.5V15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Git Commit Circles */}
          <circle cx="8" cy="12" r="1.5" fill="#fef08a" stroke="#ffffff" strokeWidth="1" />
          <circle cx="8" cy="16" r="1.5" fill="#ffffff" stroke="#d97706" strokeWidth="1" />
          <circle cx="16" cy="10.5" r="1.5" fill="#fef08a" stroke="#ffffff" strokeWidth="1" />
          
          {/* Code Accent < > */}
          <path d="M14 15L15.5 16.5L14 18" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

          <defs>
            <linearGradient id="folder-grad" x1="3" y1="5" x2="21" y2="19" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    'blog': {
      label: 'Technical Insights & Blog',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      glow: 'rgba(236, 72, 153, 0.45)',
      lightGlow: 'rgba(236, 72, 153, 0.25)',
      accent: '#fbcfe8',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Open Book Pages */}
          <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H12V4H6.5C5.11929 4 4 5.11929 4 6.5V19.5Z" fill="url(#book-left-grad)" stroke="#ffffff" strokeWidth="1.2" />
          <path d="M20 19.5C20 18.1193 18.8807 17 17.5 17H12V4H17.5C18.8807 4 20 5.11929 20 6.5V19.5Z" fill="url(#book-right-grad)" stroke="#ffffff" strokeWidth="1.2" />
          
          {/* Bookmark Ribbon */}
          <path d="M12 4V13L14.25 11.25L16.5 13V4" fill="#ffffff" />

          {/* Code/Article lines on page */}
          <line x1="6.5" y1="8" x2="9.5" y2="8" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="6.5" y1="11" x2="10" y2="11" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="6.5" y1="14" x2="8.5" y2="14" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

          {/* AI Research Sparkle Above Book */}
          <path d="M18 2.5L18.6 3.9L20 4.5L18.6 5.1L18 6.5L17.4 5.1L16 4.5L17.4 3.9L18 2.5Z" fill="#fbcfe8" />

          <defs>
            <linearGradient id="book-left-grad" x1="4" y1="4" x2="12" y2="19.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f472b6" />
              <stop offset="1" stopColor="#db2777" />
            </linearGradient>
            <linearGradient id="book-right-grad" x1="12" y1="4" x2="20" y2="19.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f472b6" />
              <stop offset="1" stopColor="#be185d" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    'events': {
      label: 'Events & Conferences',
      gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      glow: 'rgba(16, 185, 129, 0.45)',
      lightGlow: 'rgba(16, 185, 129, 0.25)',
      accent: '#a7f3d0',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Calendar Card Body */}
          <rect x="3.5" y="5" width="17" height="15" rx="3.5" fill="url(#cal-grad)" stroke="#ffffff" strokeWidth="1.2" />
          
          {/* Binder Rings */}
          <path d="M8 3V6.5M16 3V6.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          
          {/* Header Divider Line */}
          <path d="M3.5 9.5H20.5" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
          
          {/* Calendar Event Grid & Star */}
          <circle cx="8" cy="13" r="1" fill="#ffffff" />
          <circle cx="12" cy="13" r="1" fill="#ffffff" />
          <circle cx="16" cy="13" r="1" fill="#ffffff" />
          <circle cx="8" cy="16.5" r="1" fill="#ffffff" />
          
          {/* Highlighted Symposium Event Badge */}
          <rect x="11" y="15" width="6" height="3" rx="1.5" fill="#ffffff" />
          <circle cx="14" cy="16.5" r="0.75" fill="#047857" />

          <defs>
            <linearGradient id="cal-grad" x1="3.5" y1="5" x2="20.5" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34d399" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    'experience': {
      label: 'Experience & Education',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      glow: 'rgba(59, 130, 246, 0.45)',
      lightGlow: 'rgba(59, 130, 246, 0.25)',
      accent: '#bfdbfe',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Briefcase Main Case */}
          <rect x="3" y="8" width="18" height="12" rx="2.5" fill="url(#case-grad)" stroke="#ffffff" strokeWidth="1.2" />
          
          {/* Handle */}
          <path d="M9 8V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Locks & Stitches */}
          <path d="M3 13H21" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.6" />
          <rect x="8.5" y="11.5" width="2" height="3" rx="0.5" fill="#ffffff" />
          <rect x="13.5" y="11.5" width="2" height="3" rx="0.5" fill="#ffffff" />

          {/* Academic Cap Star Accent */}
          <path d="M19 3L19.8 4.7L21.5 5.5L19.8 6.3L19 8L18.2 6.3L16.5 5.5L18.2 4.7L19 3Z" fill="#bfdbfe" />

          <defs>
            <linearGradient id="case-grad" x1="3" y1="8" x2="21" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" />
              <stop offset="1" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>
      )
    }
  };

  const config = configs[type] || configs['technical-skills'];

  return (
    <div
      className={`icon-badge-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        ...style
      }}
    >
      {/* Outer Soft Ambient Glow Backdrop */}
      <div
        className="icon-badge-glow"
        style={{
          position: 'absolute',
          inset: '-3px',
          borderRadius: '18px',
          background: config.gradient,
          filter: 'blur(10px)',
          opacity: 0.55,
          transition: 'all 0.3s ease',
          zIndex: 0
        }}
      />

      {/* Main Glassmorphic 3D Badge Surface */}
      <div
        className="icon-badge-surface"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '16px',
          background: config.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 8px 20px -4px ${config.glow}, inset 0 1px 1px rgba(255, 255, 255, 0.45)`,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        {/* Subtle Top Glass Reflection Sheen */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
            borderRadius: '15px 15px 0 0'
          }}
        />

        {/* SVG Graphic */}
        <div
          className="icon-graphic"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
        >
          {config.icon}
        </div>
      </div>
    </div>
  );
}
