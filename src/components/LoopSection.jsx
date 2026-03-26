import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { devLifeStory } from '../content/devLifeStory';

const { loop } = devLifeStory;

const LoopSection = ({ onRestart, onBackToTop, judgeMode }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
        // Tile stagger animation
        gsap.from(".loop-tile", {
            opacity: 0,
            scale: 0.8,
            stagger: 0.1,
            duration: 1,
            ease: "back.out(2)",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // Loop animation on icons
        gsap.to(".loop-icon", {
            rotate: 360,
            duration: 10,
            repeat: -1,
            ease: "none"
        });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="loop" ref={sectionRef} className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-inner" style={{ textAlign: 'center', position: 'relative' }}>
        {judgeMode && <div className="judge-badge mono" style={{ position: 'absolute', top: '-20px', right: '0', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '2px 8px', fontSize: '9px', zIndex: 10 }}>[REQ: NARRATIVE_STORY_LOOP]</div>}
        <div className="section-header">
            <h2 className="section-title" style={{ color: 'var(--accent-pink)' }}>{loop.headline}</h2>
            <p className="section-subtitle">{loop.subtitle}</p>
        </div>

        <div className="section-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 'var(--space-5)' }}>
            {loop.tiles.map((tile, i) => (
                <div key={i} className="loop-tile card" style={{ borderColor: 'var(--accent-pink)', background: 'rgba(255,0,225,0.02)' }}>
                    <div className="loop-icon" style={{ fontSize: '32px', marginBottom: '15px' }}>{tile.icon}</div>
                    <h4 style={{ fontSize: 'var(--font-xs)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-pink)', marginBottom: '8px' }}>{tile.label}</h4>
                    <p style={{ fontSize: '11px', opacity: 0.6 }}>{tile.text}</p>
                </div>
            ))}
        </div>

        <div className="final-cta card" style={{ padding: '60px', borderStyle: 'dashed', borderColor: 'var(--accent-pink)', maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '20px' }}>{loop.footerMsg}</h3>
            <button 
                className="cta-btn pill active" 
                onClick={onRestart}
                style={{ 
                    padding: '20px 60px', background: 'var(--accent-pink)', border: 'none', 
                    borderRadius: 'var(--radius-full)', color: 'white', fontSize: 'var(--font-lg)', fontWeight: '800', 
                    cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 40px var(--accent-pink-glow)'
                }}
            >
                {loop.btn}
            </button>
            <div style={{ marginTop: '30px', opacity: 0.4, fontSize: 'var(--font-xs)' }} className="mono">
                {loop.jokes[Math.floor(Math.random() * loop.jokes.length)]}
            </div>
        </div>

        <footer style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-color)', opacity: 0.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: '12px' }}>&copy; 2026 Frontend Odyssey | Built with GSAP & Blood, Sweat, Tears</span>
                <button 
                  onClick={onBackToTop} 
                  className="mono"
                  style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-pink)', letterSpacing: '1px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Back to top ↑
                </button>
            </div>
        </footer>
      </div>
    </section>
  );
};

export default LoopSection;
