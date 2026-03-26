import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { devLifeStory } from '../content/devLifeStory';

const { eureka } = devLifeStory;

const EurekaSection = ({ debugMode, setDebugMode, judgeMode }) => {
  const sectionRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    let ctx = gsap.context((self) => {
        gsap.from(self.selector(".diff-card"), {
            y: 50,
            opacity: 0,
            stagger: 0.2,
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

  const triggerSparkle = (e) => {
    setIsFlipped(!isFlipped);
    
    // Sparkle burst effect
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        sparkle.style.zIndex = '1000';
        document.body.appendChild(sparkle);

        gsap.to(sparkle, {
            x: `random(-100, 100)`,
            y: `random(-100, 100)`,
            opacity: 0,
            scale: `random(0.5, 2)`,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => sparkle.remove()
        });
    }
  };

  return (
    <section id="eureka" ref={sectionRef} className="section theme-green">
      <div className="section-inner" style={{ position: 'relative' }}>
        {judgeMode && <div className="judge-badge mono" style={{ position: 'absolute', top: '-10px', left: '0', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '2px 8px', fontSize: '9px', zIndex: 10 }}>[REQ: DEBUG_MODE_TOGGLE]</div>}
        <div className="section-header">
            <h2 className="section-title">{eureka.headline}</h2>
            <p className="section-subtitle">{eureka.subtitle}</p>
        </div>
        
        <div className="section-grid">
            <div className="diff-card card mono" onClick={triggerSparkle} style={{ padding: '0', cursor: 'pointer', borderStyle: 'solid', borderColor: 'var(--warning-red)', transition: 'all 0.3s' }}>
                <div style={{ background: 'var(--warning-red)', color: '#000', padding: '10px 20px', fontSize: '10px', fontWeight: '800', display: 'flex', justifyContent: 'space-between' }}>
                    <span>LEGACY.JS</span>
                    <span className="pill" style={{ background: '#fff', color: '#000', fontSize: '8px', border: 'none' }}>CLICK TO DEBUG</span>
                </div>
                <div style={{ padding: '24px', fontSize: '13px', background: 'rgba(255,0,0,0.02)' }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                        {isFlipped ? eureka.messages.join('\n') : `function calculate(p, t) {\n  let tot = p + t;\n  return tot.toFixed(2);\n}`}
                    </pre>
                </div>
                {isFlipped && <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '10px', opacity: 0.4 }}>Reset via click</div>}
            </div>

            <div className="diff-card card mono" style={{ padding: '0', borderColor: 'var(--success-green)', background: 'rgba(0,255,148,0.02)', boxShadow: '0 0 30px rgba(0,255,148,0.05)' }}>
                <div style={{ background: 'var(--success-green)', color: '#000', padding: '10px 20px', fontSize: '10px', fontWeight: '800' }}>
                    <span>MODERN.JS (OPTIMIZED)</span>
                </div>
                <div style={{ padding: '24px', fontSize: '13px' }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`const calculate = (price, tax) => {\n  const res = (price + tax).toFixed(2);\n  return \`Total: \$\\{res\\}\`;\n};`}</pre>
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', animation: 'float 3s infinite ease-in-out' }}>⭐</div>
            </div>
        </div>

        <div className="message-container" style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
            <p className="mono" style={{ marginBottom: '20px', color: 'var(--success-green)', fontWeight: '700', fontSize: 'var(--font-sm)' }}>
                ⚡ 42% Performance Boost detected. Clean code applied.
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
                <span className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>{eureka.hint}</span>
                <button 
                  className={`pill active`} 
                  onClick={() => setDebugMode(!debugMode)}
                  style={{ background: debugMode ? 'var(--success-green)' : 'var(--bg-tertiary)', color: debugMode ? '#000' : 'inherit', border: 'none' }}
                >
                    {debugMode ? 'DEBUGGER ACTIVE' : 'OPEN DEBUGGER'}
                </button>
            </div>

            {debugMode && (
              <div className="debug-container card" style={{ marginTop: 'var(--space-3)', borderStyle: 'dashed', borderColor: 'var(--success-green)', maxWidth: '600px', margin: 'var(--space-3) auto' }}>
                <div className="mono" style={{ fontSize: '10px', color: 'var(--success-green)', textAlign: 'left', opacity: 0.8 }}>
                    <div>[SYSTEM] Memory dump: 0xFD34, Render call: 1, Diff size: 14KB</div>
                    <div>[SYSTEM] Vibe Check: EXCELLENT</div>
                </div>
              </div>
            )}
        </div>
      </div>
      <style>{`
        @keyframes float { 0% { transform: translateY(0) } 50% { transform: translateY(-10px) } 100% { transform: translateY(0) } }
      `}</style>
    </section>
  );
};

export default EurekaSection;
