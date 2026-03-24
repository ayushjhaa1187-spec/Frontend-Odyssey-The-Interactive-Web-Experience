import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoopSection = ({ onRestart, onBackToTop }) => {
  const sectionRef = useRef(null);
  const tilesRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
        // Tile stagger animation
        gsap.from(".loop-tile", {
            opacity: 0,
            scale: 0.8,
            stagger: 0.15,
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
            duration: 4,
            repeat: -1,
            ease: "none"
        });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="loop" ref={sectionRef} style={{ padding: 'var(--s5) var(--s4)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h2 className="section-title" style={{ color: 'var(--accent-blue)', marginBottom: 'var(--s3)' }}>And Then... It All Begins Again</h2>
      <p style={{ maxWidth: '600px', margin: '0 auto var(--s5)', fontSize: '18px', opacity: 0.7 }}>
        This isn't the end. It's just the beginning of the next phase. New features, new challenges, new bugs to crush. The journey of a developer is cyclical—always learning, always building, always shipping.
      </p>

      <div className="loop-grid" ref={tilesRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--s3)', maxWidth: '1000px', width: '100%', marginBottom: 'var(--s5)' }}>
          {[
              { label: "LEARN", text: "Every day brings new tech", icon: "📚" },
              { label: "BUILD", text: "Transform ideas into reality", icon: "🛠️" },
              { label: "SHIP", text: "Release to the world", icon: "🚀" },
              { label: "REPEAT", text: "The cycle continues...", icon: "🔁" }
          ].map((tile, i) => (
              <div key={i} className="loop-tile premium-card" style={{ padding: '30px', textAlign: 'center', transition: 'all 0.3s' }}>
                  <div className="loop-icon" style={{ fontSize: '32px', marginBottom: '15px' }}>{tile.icon}</div>
                  <h4 style={{ fontSize: '14px', letterSpacing: '2px', color: 'var(--accent-blue)', marginBottom: '8px' }}>{tile.label}</h4>
                  <p style={{ fontSize: '11px', opacity: 0.5 }}>{tile.text}</p>
              </div>
          ))}
      </div>

      <button 
        className="cta-btn" 
        onClick={onRestart} 
        style={{ 
            padding: '18px 48px', background: 'var(--accent-blue)', color: '#000', 
            borderRadius: '50px', fontSize: '18px', fontWeight: '800', 
            boxShadow: '0 0 30px var(--accent-blue-glow)', cursor: 'pointer', transition: '0.3s', 
            marginBottom: 'var(--s4)' 
        }}
      >
        Start Your Journey Again ↻
      </button>

      <footer style={{ marginTop: 'var(--s5)', borderTop: '1px solid var(--border-color)', width: '100%', padding: 'var(--s4) 0', color: 'var(--text-muted)' }}>
          <p style={{ marginBottom: '20px' }}>&copy; 2026 Frontend Odyssey | The Developer's Journey</p>
          <button 
            onClick={onBackToTop} 
            style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-blue)', letterSpacing: '2px' }}
          >
            Back to top ↑
          </button>
      </footer>
    </section>
  );
};

export default LoopSection;
