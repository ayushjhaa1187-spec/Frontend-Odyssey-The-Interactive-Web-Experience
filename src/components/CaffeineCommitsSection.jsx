import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { devLifeStory } from '../content/devLifeStory';

const { caffeine } = devLifeStory;

const CaffeineCommitsSection = () => {
  const sectionRef = useRef(null);
  const avatarRef = useRef(null);
  const [level, setLevel] = useState(1); 

  const levels = [
    { label: "Sleep", color: "var(--text-muted)", boost: 0, icon: "😴" },
    { label: "1 Cup", color: "var(--coffee-brown)", boost: 1, icon: "☕" },
    { label: "3 Cups", color: "var(--accent-pink)", boost: 2, icon: "☕☕" },
    { label: "LEGENDARY", color: "var(--accent-blue)", boost: 5, icon: "⚡☕⚡" }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
        // Commits stagger in
        gsap.from(".commit-card", {
            opacity: 0,
            x: 30,
            stagger: 0.1,
            duration: 1,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // Jitter logic - tuned down for performance
        if (level === 3) {
            gsap.to(avatarRef.current, {
                x: "random(-4, 4)",
                y: "random(-4, 4)",
                duration: 0.05,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });
            gsap.to(".section-inner", {
                x: "random(-1, 1)",
                duration: 0.1,
                repeat: -1,
                yoyo: true
            });
        } else {
            gsap.killTweensOf(avatarRef.current);
            gsap.killTweensOf(".section-inner");
            gsap.set(avatarRef.current, { x: 0, y: 0 });
            gsap.set(".section-inner", { x: 0 });
        }
    }, sectionRef);

    return () => ctx.revert();
  }, [level]);

  return (
    <section id="caffeine" ref={sectionRef} className="section" style={{ background: level === 3 ? 'rgba(0,209,255,0.02)' : 'transparent', border: 'none' }}>
      <div className="section-inner">
        <div className="section-header">
            <h2 className="section-title" style={{ transition: 'color 0.4s' }}>{caffeine.headline}</h2>
            <p className="section-subtitle">{caffeine.subtitle}</p>
        </div>

        <div className="section-grid" style={{ alignItems: 'start' }}>
            <div className="caffeine-controls card" style={{ padding: 'var(--space-3) var(--space-2)', textAlign: 'center', borderColor: levels[level].color, transition: 'all 0.4s' }}>
                <div 
                    ref={avatarRef} 
                    className="dev-avatar" 
                    role="img"
                    aria-label={`Developer avatar showing state: ${levels[level].label}`}
                    title="Coffee to LOC: 1:150"
                    style={{ fontSize: 'clamp(60px, 15vw, 100px)', marginBottom: '25px', userSelect: 'none', cursor: 'help' }}
                >
                    {level === 0 ? '😴' : (level === 3 ? '🤪' : '👨‍💻')}
                </div>
                
                <h4 className="mono" id="caffeine-heading" style={{ textTransform: 'uppercase', fontSize: 'var(--font-xs)', letterSpacing: '2px', opacity: 0.6, marginBottom: '20px' }}>CAFFEINE PROTOCOL</h4>
                <div style={{ position: 'relative' }}>
                    <div className="fuel-buttons" role="radiogroup" aria-labelledby="caffeine-heading" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {levels.map((l, i) => (
                            <button 
                                key={i} 
                                onClick={() => setLevel(i)}
                                className={`pill touch-target ${level === i ? 'active' : ''}`}
                                aria-checked={level === i}
                                role="radio"
                                aria-label={`Set caffeine level to ${l.label}`}
                                style={{ 
                                    padding: '12px', background: level === i ? l.color : 'var(--bg-tertiary)', 
                                    color: level === i ? (i === 3 ? '#fff' : '#000') : 'var(--text-secondary)',
                                    borderColor: i === 3 ? 'var(--accent-blue)' : 'var(--border-color)',
                                    cursor: 'pointer', transition: 'all 0.3s', fontWeight: '800', fontSize: '9px',
                                    boxShadow: level === i && i === 3 ? '0 0 30px var(--accent-blue-glow)' : 'none',
                                    minHeight: '44px'
                                }}
                            >
                                <span style={{ marginRight: '4px' }} aria-hidden="true">{l.icon}</span> {l.label}
                            </button>
                        ))}
                    </div>
                    {/* Secret Terminal Icon */}
                    <button 
                        onClick={() => document.body.classList.toggle('terminal-override')}
                        style={{ position: 'absolute', bottom: '-40px', right: '0', opacity: 0.1, border: 'none', background: 'none', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer' }}
                        aria-label="Toggle terminal override"
                        title="Don't click me"
                    >
                        &gt;_
                    </button>
                </div>
                {level === 3 && (
                    <div className="mono" role="alert" aria-live="assertive" style={{ marginTop: '20px', color: 'var(--accent-blue)', animation: 'pulse 1.5s infinite', fontSize: '10px', fontWeight: 'bold' }}>
                        [WARNING] SYSTEM ERROR: OVERHEATING_DETECTED
                    </div>
                )}
            </div>

            <div className="commit-stream" aria-label="Recent Commits Feed" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', width: '100%' }}>
                {caffeine.commits.map((c, i) => (
                    <div 
                        key={c.id} 
                        className="commit-card card" 
                        style={{ 
                            padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            borderColor: level === 3 ? 'var(--accent-blue)' : 'var(--border-color)',
                            transition: 'all 0.3s',
                            width: '100%'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', overflow: 'hidden' }}>
                            <span className="pill" style={{ fontSize: '8px', padding: '2px 6px', flexShrink: 0, opacity: 0.9 }}>COMMIT</span>
                            <span className="mono" style={{ fontSize: '12px', opacity: level === 0 ? 0.4 : 0.9, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-secondary)' }}>{c.message}</span>
                        </div>
                        <span className="text-muted mono" style={{ fontSize: '9px', flexShrink: 0, marginLeft: '10px', opacity: 0.7 }}>{c.time}</span>
                    </div>
                ))}
                <div className="mono" aria-live="polite" style={{ fontSize: '11px', opacity: 0.6, textAlign: 'center', marginTop: '10px' }}>
                    [SYSTEM_LOAD_REPORT: {(level * 33) + 10}%]
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CaffeineCommitsSection;
