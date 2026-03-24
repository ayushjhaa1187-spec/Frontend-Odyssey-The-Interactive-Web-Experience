import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const EurekaSection = () => {
  const [debugMode, setDebugMode] = useState(false);
  const sectionRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
        gsap.from(".diff-old", {
            x: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
        gsap.from(".diff-new", {
            x: 100,
            opacity: 0,
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

  return (
    <section id="eureka" ref={sectionRef} style={{ padding: 'var(--s5) var(--s4)', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(180deg, transparent, rgba(34,255,34,0.02))' }}>
      <h2 className="section-title success" style={{ textAlign: 'center' }}>Eureka! It works! 🎉</h2>
      
      <div className="diff-view" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: 'var(--s4)', maxWidth: '1200px', width: '100%', marginBottom: 'var(--s5)' }}>
        <div className="diff-old premium-card" onClick={() => setIsFlipped(!isFlipped)} style={{ padding: '24px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--danger-red)', color: '#000', padding: '4px 12px', fontSize: '10px', fontWeight: '800' }}>{isFlipped ? 'CLICK TO RESET' : 'BEFORE'}</div>
            <pre style={{ margin: 0, fontSize: '13px', fontFamily: 'var(--font-code)', whiteSpace: 'pre-wrap' }}>
                {isFlipped ? `// Optimization details applied\n// Memory overhead reduced 40%` : `function calculate(p, t) {\n  let tot = p + t;\n  return tot.toFixed(2);\n}`}
            </pre>
        </div>

        <div className="diff-new premium-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden', border: '1px solid var(--success-green)' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--success-green)', color: '#000', padding: '4px 12px', fontSize: '10px', fontWeight: '800' }}>AFTER</div>
            <pre style={{ margin: 0, fontSize: '13px', fontFamily: 'var(--font-code)', whiteSpace: 'pre-wrap' }}>{`const calculate = (price, tax) => {\n  const res = (price + tax).toFixed(2);\n  return \`Total: \$\\{res\\}\`;\n};`}</pre>
        </div>
      </div>

      <div className="message-container" style={{ textAlign: 'center' }}>
        <p className="success-msg" style={{ marginBottom: '20px', color: 'var(--success-green)', fontWeight: '700', fontSize: '20px' }}>Optimization successfully applied.</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Hint: Toggle Debug Mode</span>
            <button 
                className={`debug-toggle ${debugMode ? 'active' : ''}`} 
                onClick={() => setDebugMode(!debugMode)}
                style={{ width: '60px', height: '30px', background: debugMode ? 'var(--success-green)' : 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '4px', position: 'relative', transition: '0.4s' }}
            >
                <div style={{ width: '22px', height: '22px', background: '#fff', borderRadius: '50%', position: 'absolute', left: debugMode ? '34px' : '4px', transition: '0.4s' }} />
            </button>
        </div>

        {debugMode && (
          <div className="debug-overlay" style={{ marginTop: '20px', padding: '15px', border: '1px dashed var(--success-green)', color: 'var(--success-green)', fontSize: '11px', fontFamily: 'var(--font-code)', opacity: 0.8 }}>
            [SYSTEM] Memory dump: 0xFD34, Render call: 1, Diff size: 14KB, Mode: High-fidelity
          </div>
        )}
      </div>
    </section>
  );
};

export default EurekaSection;
