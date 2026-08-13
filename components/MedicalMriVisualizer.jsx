'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Layers, Activity, Sliders, CheckCircle2, Cpu, Zap, Download } from 'lucide-react';

export default function MedicalMriVisualizer() {
  const [sliceIndex, setSliceIndex] = useState(72);
  const [showMask, setShowMask] = useState(true);
  const [activeModel, setActiveModel] = useState('attention-unet');
  const [opacity, setOpacity] = useState(0.75);

  const modelMetrics = {
    'attention-unet': { name: 'Attention U-Net', dice: '0.942', jaccard: '0.891', precision: '0.954', inferenceTime: '12ms' },
    'unet-standard': { name: 'Standard U-Net', dice: '0.918', jaccard: '0.852', precision: '0.921', inferenceTime: '8ms' },
    'pso-plasticity': { name: 'Plasticity-PSO U-Net', dice: '0.961', jaccard: '0.924', precision: '0.972', inferenceTime: '14ms' },
  };

  const metrics = modelMetrics[activeModel];

  return (
    <div className="mri-visualizer-container card" style={{ padding: '2rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="pill-badge" style={{ background: 'rgba(8, 145, 178, 0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(8, 145, 178, 0.3)' }}>
              <Activity size={14} style={{ marginRight: '4px' }} /> Interactive Lab Demo
            </span>
            <span className="pill-badge" style={{ fontSize: '0.75rem' }}>MONAI & PyTorch Pipeline</span>
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Brain MRI Deep Learning Segmentation Visualizer</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
            Simulated high-resolution axial T1/T2 Brain MRI segmentation using bio-inspired plasticity neural optimization.
          </p>
        </div>

        {/* Model Selector Tabs */}
        <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: '0.3rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          {Object.keys(modelMetrics).map((key) => (
            <button
              key={key}
              onClick={() => setActiveModel(key)}
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.825rem',
                fontWeight: 600,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeModel === key ? 'var(--accent-color)' : 'transparent',
                color: activeModel === key ? '#ffffff' : 'var(--text-secondary)',
              }}
            >
              {modelMetrics[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Viewer + Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
        
        {/* Left: Canvas / MRI Frame */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', maxHeight: '360px', background: '#05070a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Simulated Brain Contour & Scan Canvas */}
          <svg viewBox="0 0 200 200" style={{ width: '85%', height: '85%' }}>
            <defs>
              <radialGradient id="mriBrainGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                <stop offset="70%" stopColor="#1e1b4b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#05070a" stopOpacity="0.9" />
              </radialGradient>
              <radialGradient id="lesionGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background Grid Lines */}
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            </pattern>
            <rect width="200" height="200" fill="url(#grid)" />

            {/* Skull / Brain Outer Shape */}
            <ellipse cx="100" cy="100" rx="75" ry="85" fill="url(#mriBrainGlow)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            
            {/* Brain Sulci & Tissue Contours */}
            <path d="M 100 20 C 100 60, 95 100, 100 180 M 60 40 Q 80 70 50 110 Q 75 140 65 170 M 140 40 Q 120 70 150 110 Q 125 140 135 170" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="3 2" />
            
            {/* Ventricles (CSF) */}
            <path d="M 90 80 Q 70 95 90 120 M 110 80 Q 130 95 110 120" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeOpacity="0.6" />

            {/* Deep Learning Segmentation Mask Overlay */}
            {showMask && (
              <g opacity={opacity}>
                {/* Tumor Core Lesion Mask */}
                <motion.ellipse
                  cx={125 + (sliceIndex - 72) * 0.2}
                  cy={90 - (sliceIndex - 72) * 0.15}
                  rx={22 + (sliceIndex % 5)}
                  ry={18 + (sliceIndex % 4)}
                  fill="url(#lesionGlow)"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
                
                {/* Edema Region Mask */}
                <ellipse
                  cx={122 + (sliceIndex - 72) * 0.2}
                  cy={88 - (sliceIndex - 72) * 0.15}
                  rx={32 + (sliceIndex % 5)}
                  ry={26 + (sliceIndex % 4)}
                  fill="rgba(234, 179, 8, 0.25)"
                  stroke="#eab308"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />

                {/* Gray Matter Overlay */}
                <path d="M 40 100 C 45 60 70 30 100 30 C 130 30 155 60 160 100" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="4" />
              </g>
            )}

            {/* Scan Crosshair */}
            <line x1="100" y1="0" x2="100" y2="200" stroke="rgba(8, 145, 178, 0.25)" strokeWidth="0.8" />
            <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(8, 145, 178, 0.25)" strokeWidth="0.8" />
          </svg>

          {/* Overlay Info Badges */}
          <div style={{ position: 'absolute', top: '10px', left: '12px', fontSize: '0.75rem', fontFamily: 'monospace', color: '#38bdf8' }}>
            AXIAL SLICE: {sliceIndex} / 155<br />
            FOV: 240x240 mm
          </div>

          <div style={{ position: 'absolute', bottom: '10px', right: '12px', fontSize: '0.75rem', fontFamily: 'monospace', color: showMask ? '#ef4444' : '#94a3b8' }}>
            MASK: {showMask ? 'ENABLED (U-NET OVERLAY)' : 'RAW T1-WEIGHTED'}
          </div>
        </div>

        {/* Right: Controls & Metrics */}
        <div>
          {/* Metrics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Dice Similarity (DSC)</span>
              <strong style={{ fontSize: '1.25rem', color: 'var(--accent-light)' }}>{metrics.dice}</strong>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Jaccard Index (IoU)</span>
              <strong style={{ fontSize: '1.25rem', color: 'var(--accent-cyan)' }}>{metrics.jaccard}</strong>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Precision</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{metrics.precision}</strong>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Inference Latency</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{metrics.inferenceTime}</strong>
            </div>
          </div>

          {/* Slice Depth Slider */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>MRI Slice Depth</span>
              <span style={{ fontFamily: 'monospace', color: 'var(--accent-light)' }}>Z-Axis: {sliceIndex} mm</span>
            </div>
            <input
              type="range"
              min="20"
              max="135"
              value={sliceIndex}
              onChange={(e) => setSliceIndex(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-color)', cursor: 'pointer' }}
            />
          </div>

          {/* Mask Opacity Slider */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Segmentation Mask Opacity</span>
              <span style={{ fontFamily: 'monospace', color: 'var(--accent-cyan)' }}>{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              disabled={!showMask}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer', opacity: showMask ? 1 : 0.4 }}
            />
          </div>

          {/* Toggles & Legend */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              onClick={() => setShowMask(!showMask)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1rem',
                borderRadius: '10px',
                border: '1px solid var(--badge-border)',
                background: showMask ? 'var(--badge-bg)' : 'transparent',
                color: showMask ? 'var(--accent-light)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              <Eye size={16} /> {showMask ? 'Hide Segmentation Overlay' : 'Show U-Net Overlay'}
            </button>

            {/* Mask Legend Badges */}
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
              <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '3px' }}>● Tumor Core</span>
              <span style={{ color: '#eab308', display: 'flex', alignItems: 'center', gap: '3px' }}>● Edema</span>
              <span style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '3px' }}>● Ventricle</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
