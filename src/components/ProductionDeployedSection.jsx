import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { devLifeStory } from '../content/devLifeStory';

const { production } = devLifeStory;

const ProductionDeployedSection = ({ onShipAgain, judgeMode, announce }) => {
  const sectionRef = useRef(null);
  const [usersOnline, setUsersOnline] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => {
    let ctx = gsap.context((self) => {
        // Count up online users
        gsap.to(sectionRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                onEnter: () => startCounting(self),
                once: true
            }
        });

        // Cards stagger
        gsap.from(self.selector(".card"), {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const startCounting = (self) => {
    gsap.to(self.selector(".stat-users"), {
        innerText: 1247,
        duration: 2.5,
        snap: { innerText: 1 },
        ease: "power2.out",
        onUpdate: function() {
            setUsersOnline(Math.floor(this.targets()[0].innerText));
        },
        onComplete: () => {
            if (!hasCounted) {
                setHasCounted(true);
                if (announce) announce("Production is live! 1247 users online. System running at 99.9% uptime.");
            }
        }
    });
  };

  return (
    <section id="production" ref={sectionRef} className="section theme-green">
      <div className="section-inner" style={{ position: 'relative' }}>
        {judgeMode && <div className="judge-badge mono" style={{ position: 'absolute', top: '-10px', left: '0', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '2px 8px', fontSize: '9px', zIndex: 10 }}>[REQ: LIVE_STAT_COUNTER]</div>}
        <div className="section-header">
            <h2 className="section-title">{production.headline}</h2>
            <p className="section-subtitle">{production.subtitle} <span className="pill active" style={{ marginLeft: '10px' }}>LIVE</span></p>
        </div>
        
        <div className="section-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 'var(--space-4)' }} role="group" aria-label="Production Metrics">
            <div className="card" style={{ textAlign: 'center', borderColor: 'var(--success-green)' }}>
                <span className="mono stat-users" style={{ display: 'block', fontSize: 'var(--font-xl)', fontWeight: '800', color: 'var(--success-green)' }} aria-live="polite">{usersOnline}</span>
                <span style={{ fontSize: 'var(--font-xs)', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>{production.metrics[0].label}</span>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
                <span className="mono" style={{ display: 'block', fontSize: 'var(--font-xl)', fontWeight: '800' }}>{production.metrics[1].val}</span>
                <span style={{ fontSize: 'var(--font-xs)', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>{production.metrics[1].label}</span>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
                <span className="mono" style={{ display: 'block', fontSize: 'var(--font-xl)', fontWeight: '800' }}>{production.metrics[2].val}</span>
                <span style={{ fontSize: 'var(--font-xs)', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>{production.metrics[2].label}</span>
            </div>
        </div>

        <div className="section-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {production.cards.map((c, i) => (
                <div 
                    key={i} 
                    className="card" 
                    onClick={i === 2 ? onShipAgain : null}
                    onKeyDown={i === 2 ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onShipAgain(); } } : null}
                    tabIndex={i === 2 ? 0 : undefined}
                    role={i === 2 ? 'button' : undefined}
                    aria-label={i === 2 ? 'Ship again. Start the deployment loop over.' : undefined}
                    style={{ 
                        textAlign: 'center', cursor: i === 2 ? 'pointer' : 'default',
                        borderColor: i === 2 ? 'var(--accent-blue)' : 'var(--border-color)',
                        background: i === 2 ? 'rgba(0,209,255,0.02)' : 'var(--bg-card)'
                    }}
                >
                    <div style={{ fontSize: '40px', marginBottom: '15px' }} aria-hidden="true">{c.icon}</div>
                    <h4 style={{ marginBottom: '8px' }}>{c.title}</h4>
                    <p style={{ fontSize: 'var(--font-sm)', opacity: 0.6 }}>{c.desc}</p>
                    {i === 2 && <span className="pill" style={{ marginTop: '15px', display: 'inline-block', fontSize: '9px' }}>START OVER</span>}
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductionDeployedSection;
