import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CaffeineCommitsSection = () => {
  const sectionRef = useRef(null);
  const [caffeineLevel, setCaffeineLevel] = useState(0);
  const [commits, setCommits] = useState([
    { id: 1, message: "fix: resolve infinite loop in login", time: "2h ago" },
    { id: 2, message: "style: upgrade glassmorphism depth", time: "4h ago" },
    { id: 3, message: "feat: add confetti physics engine", time: "6h ago" },
    { id: 4, message: "docs: update deployment checklist", time: "8h ago" },
    { id: 5, message: "chore: remove console.logs from prod", time: "10h ago" }
  ]);

  useEffect(() => {
    let ctx = gsap.context(() => {
        // Cups fade up
        gsap.from(".cup", {
            opacity: 0,
            y: 20,
            scale: 0.8,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Commits stagger in
        gsap.from(".commit-item", {
            opacity: 0,
            x: 30,
            stagger: 0.15,
            duration: 1,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCupClick = (index) => {
    const level = (index + 1) * 20;
    setCaffeineLevel(level);
    gsap.to(".caffeine-bar", { width: `${level}%`, duration: 0.5, ease: "power2.out" });
  };

  return (
    <section id="caffeine" ref={sectionRef} style={{ padding: 'var(--s5) var(--s4)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s5)', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="caffeine-sidebar" style={{ textAlign: 'center' }}>
        <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5, marginBottom: '20px' }}>Caffeine Level</h4>
        <div className="coffee-section premium-card" style={{ padding: 'var(--s4)' }}>
            <div className="coffee-cups" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
                {[0,1,2,3,4].map(i => (
                    <span 
                        key={i} 
                        className={`cup ${caffeineLevel >= (i+1)*20 ? 'active' : ''}`} 
                        onClick={() => handleCupClick(i)}
                        style={{ fontSize: '32px', cursor: 'pointer', opacity: caffeineLevel >= (i+1)*20 ? 1 : 0.2, filter: caffeineLevel >= (i+1)*20 ? 'drop-shadow(0 0 10px orange)' : 'none', transition: 'all 0.3s' }}
                    >
                        ☕
                    </span>
                ))}
            </div>
            <div className="caffeine-meter" style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px' }}>
                <div className="caffeine-bar" style={{ width: `${caffeineLevel}%`, height: '100%', background: 'linear-gradient(90deg, orange, #FF5555)', transition: 'width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
            </div>
            <span className="caffeine-text" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{caffeineLevel}% Fuel Injected</span>
        </div>
      </div>

      <div className="git-commits">
        <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5, marginBottom: '20px' }}>Recent Commits</h4>
        <div className="commit-stream" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {commits.map(c => (
                <div key={c.id} className="commit-item premium-card" style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s' }}>
                    <span style={{ fontSize: '13px', fontFamily: 'var(--font-code)', opacity: 0.8 }}>{c.message}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{c.time}</span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CaffeineCommitsSection;
