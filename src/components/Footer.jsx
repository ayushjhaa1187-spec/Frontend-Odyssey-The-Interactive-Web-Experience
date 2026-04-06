import React from 'react';

const Footer = ({ onBackToTop }) => (
  <footer className="site-footer" role="contentinfo">
    <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 var(--space-3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <div>
          <div className="mono" style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '2px', color: 'var(--accent-blue)', marginBottom: '12px' }}>ODYSSEY</div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '280px', lineHeight: '1.6' }}>
            An interactive scroll-driven story about the lifecycle of a frontend developer. Built by Ayush Kumar Jha.
          </p>
        </div>

        <div>
          <div className="mono" style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase' }}>Navigate</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['Dream', 'Grind', 'Chaos', 'Deploy', 'Loop'].map((label) => (
              <span key={label} style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</span>
            ))}
          </div>
        </div>

        <div>
          <div className="mono" style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase' }}>Tech Stack</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['React 19', 'Vite 8', 'GSAP 3', 'Canvas 2D'].map((tech) => (
              <span key={tech} className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tech}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span className="mono" style={{ fontSize: '10px', letterSpacing: '1px', color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} FRONTEND ODYSSEY &mdash; AYUSH KUMAR JHA
        </span>
        <button
          onClick={onBackToTop}
          className="mono"
          aria-label="Scroll back to top"
          style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1px', color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
        >
          Back to top
        </button>
      </div>
    </div>
  </footer>
);

export default React.memo(Footer);
