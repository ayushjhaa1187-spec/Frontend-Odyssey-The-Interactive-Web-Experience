import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { devLifeStory } from '../content/devLifeStory';
import narration from '../content/narrationMessages';

gsap.registerPlugin(ScrollTrigger);

const { eureka } = devLifeStory;

// ... (keep props)

const EurekaSection = ({ debugMode, setDebugMode, judgeMode, announce }) => {
  const sectionRef = useRef(null);
  const legacyCardRef = useRef(null);
  const duckRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [duckPos, setDuckPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [debugChoice, setDebugChoice] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
        const q = gsap.utils.selector(sectionRef);
        gsap.from(q(".diff-card"), {
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

  const handlePointerDown = (e) => {
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
      if (!isDragging) return;
      
      const newX = duckPos.x + e.movementX;
      const newY = duckPos.y + e.movementY;
      setDuckPos({ x: newX, y: newY });

      // Collision check with legacy card
      const cardRect = legacyCardRef.current?.getBoundingClientRect();
      const duckRect = duckRef.current?.getBoundingClientRect();
      
      if (cardRect && duckRect) {
          const isColliding = !(
              duckRect.right < cardRect.left || 
              duckRect.left > cardRect.right || 
              duckRect.bottom < cardRect.top || 
              duckRect.top > cardRect.bottom
          );
          
          if (isColliding && !isFlipped) {
              setIsFlipped(true);
              if (announce) announce(narration.duckCollision);
          }
      }
  };

  const handlePointerUp = (e) => {
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const askDuck = () => {
      setIsFlipped(true);
      if (announce) announce(narration.duckConsulted);
  };

  return (
    <section id="eureka" ref={sectionRef} className="section theme-green">
      <div className="section-inner" style={{ position: 'relative' }}>
        {judgeMode && <div className="judge-badge mono" style={{ position: 'absolute', top: '-10px', left: '0', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '2px 8px', fontSize: '9px', zIndex: 10 }}>[REQ: DEBUG_MODE_TOGGLE]</div>}
        <div className="section-header">
            <h2 className="section-title">{eureka.headline}</h2>
            <p className="section-subtitle">{eureka.subtitle} (Drag the duck over Legacy code if stuck)</p>
        </div>
        
        <div className="section-grid" role="region" aria-label="Code comparison: Legacy vs Optimized">
            <div id="legacy-card-desc" className="sr-only">
               {isFlipped 
                 ? "Legacy JavaScript with errors. The rubber duck's wisdom has revealed the optimization path." 
                 : "Legacy JavaScript code with inefficiencies. Drag the rubber duck here to debug or use the choices below."}
            </div>
            <div 
                ref={legacyCardRef}
                className="diff-card card mono" 
                onClick={triggerSparkle} 
                role="region"
                aria-label="Legacy Code"
                aria-describedby="legacy-card-desc"
                style={{ padding: '0', cursor: 'pointer', borderStyle: 'solid', borderColor: 'var(--warning-red)', transition: 'all 0.3s' }}
            >
                <div style={{ background: 'var(--warning-red)', color: '#000', padding: '10px 20px', fontSize: '10px', fontWeight: '800', display: 'flex', justifyContent: 'space-between' }}>
                    <span>LEGACY.JS</span>
                    <span className="pill" style={{ background: '#fff', color: '#000', fontSize: '8px', border: 'none' }} aria-hidden="true">CLICK TO DEBUG</span>
                </div>
                <div style={{ padding: '24px', fontSize: '13px', background: 'rgba(255,0,0,0.02)' }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                        {isFlipped ? eureka.messages.join('\n') : `function calculate(p, t) {\n  let tot = p + t;\n  return tot.toFixed(2);\n}`}
                    </pre>
                </div>
            </div>

            <div className="diff-card card mono" style={{ padding: '0', borderColor: 'var(--success-green)', background: 'rgba(0,255,148,0.02)', boxShadow: '0 0 30px rgba(0,255,148,0.05)' }} role="region" aria-label="Optimized Modern Code">
                <div style={{ background: 'var(--success-green)', color: '#000', padding: '10px 20px', fontSize: '10px', fontWeight: '800' }}>
                    <span>MODERN.JS (OPTIMIZED)</span>
                </div>
                <div style={{ padding: '24px', fontSize: '13px' }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`const calculate = (price, tax) => {\n  const res = (price + tax).toFixed(2);\n  return \`Total: \$\\{res\\}\`;\n};`}</pre>
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', animation: 'float 3s infinite ease-in-out' }} aria-hidden="true">⭐</div>
            </div>
        </div>

        {/* Draggable Rubber Duck */}
        <div 
          ref={duckRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="img"
          aria-label="Rubber duck for debugging. Drag over legacy code to understand it."
          style={{ 
              position: 'absolute', 
              top: '50px', 
              right: '20px', 
              fontSize: '40px', 
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              touchAction: 'none',
              transform: `translate(${duckPos.x}px, ${duckPos.y}px)`,
              zIndex: 100,
              filter: 'drop-shadow(0 0 10px rgba(255,255,0,0.3))'
          }}
        >
            🦆
        </div>

        <div className="message-container" style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
            <p className="mono" style={{ marginBottom: '20px', color: 'var(--success-green)', fontWeight: '700', fontSize: 'var(--font-sm)' }}>
                ⚡ 42% Performance Boost detected. Clean code applied.
            </p>

            {/* Branching Narrative Choice */}
            {!debugChoice ? (
              <div className="card" style={{ maxWidth: '500px', margin: '0 auto var(--space-3)', padding: 'var(--space-3)', borderStyle: 'dashed', borderColor: 'var(--accent-blue)' }}>
                <p className="mono" style={{ fontSize: '11px', marginBottom: '15px', color: 'var(--text-secondary)' }}>
                  [DECISION_POINT] Choose your debugging approach:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <button
                    className="pill touch-target"
                    onClick={() => { setDebugChoice('rubber-duck'); if (announce) announce('You chose rubber duck debugging. Classic.'); }}
                    aria-label="Debug by consulting the rubber duck"
                    style={{ padding: '12px 8px', fontSize: '10px' }}
                  >
                    <span aria-hidden="true">🦆</span> Rubber Duck
                  </button>
                  <button
                    className="pill touch-target"
                    onClick={() => { setDebugChoice('debugger'); if (announce) announce('You chose the browser debugger. Efficient.'); }}
                    aria-label="Debug using browser developer tools"
                    style={{ padding: '12px 8px', fontSize: '10px' }}
                  >
                    <span aria-hidden="true">🔍</span> Debugger
                  </button>
                  <button
                    className="pill touch-target"
                    onClick={() => { setDebugChoice('stackoverflow'); if (announce) announce('You chose Stack Overflow. A timeless move.'); }}
                    aria-label="Debug by searching Stack Overflow"
                    style={{ padding: '12px 8px', fontSize: '10px' }}
                  >
                    <span aria-hidden="true">🌐</span> Stack Overflow
                  </button>
                </div>
              </div>
            ) : (
              <div className="card mono" style={{ maxWidth: '500px', margin: '0 auto var(--space-3)', padding: 'var(--space-2)', fontSize: '11px', borderColor: 'var(--success-green)', borderStyle: 'solid', color: 'var(--text-secondary)' }}>
                {debugChoice === 'rubber-duck' && (
                  <p>"You explained the problem to the duck. Halfway through, you realised the variable was never initialised. The duck said nothing — but its silence spoke volumes."</p>
                )}
                {debugChoice === 'debugger' && (
                  <p>"Step-by-step, breakpoint-by-breakpoint, you traced the flow. The bug hid in a closure three layers deep. You cornered it. It had nowhere to run."</p>
                )}
                {debugChoice === 'stackoverflow' && (
                  <p>"The top answer from 2019 was marked [duplicate]. The linked answer was deleted. You scrolled to page 3. There, a lone comment with 2 upvotes saved your career."</p>
                )}
                <button 
                  className="mono" 
                  onClick={() => setDebugChoice(null)}
                  style={{ marginTop: '10px', fontSize: '9px', color: 'var(--accent-blue)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
                  aria-label="Choose a different debugging approach"
                >
                  [TRY_ANOTHER_PATH]
                </button>
              </div>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <span className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>{eureka.hint}</span>
                <button 
                  className={`pill active`} 
                  onClick={() => {
                    setDebugMode(!debugMode);
                    if (announce) announce(narration.debugToggled(!debugMode));
                  }}
                  style={{ background: debugMode ? 'var(--success-green)' : 'var(--bg-tertiary)', color: debugMode ? '#000' : 'inherit', border: 'none' }}
                >
                    {debugMode ? 'DEBUGGER ACTIVE' : 'OPEN DEBUGGER'}
                </button>
                <button 
                  className="pill"
                  onClick={askDuck}
                  style={{ border: '1px dashed var(--accent-pink)', color: 'var(--accent-pink)' }}
                >
                  ASK RUBBER DUCK
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
