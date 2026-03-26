import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { devLifeStory } from '../content/devLifeStory';

const { shipping } = devLifeStory;

const ShippingPhaseSection = ({ onShip, judgeMode }) => {
  const sectionRef = useRef(null);
  const rocketRef = useRef(null);
  const [logs, setLogs] = useState(shipping.logs);
  const [isShipping, setIsShipping] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
        // Log reveal on scroll
        logs.forEach((_, i) => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: `top+=${i * 80} center`,
                onEnter: () => setTerminalLogs(prev => [...prev, logs[i]]),
                onLeaveBack: () => setTerminalLogs(prev => prev.slice(0, -1))
            });
        });

        // Pin shipping section
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${logs.length * 80}`,
            pin: true,
            scrub: 1
        });
    }, sectionRef);

    return () => ctx.revert();
  }, [logs]);

  const handleShipClick = (e) => {
    if (isShipping) return;
    setIsShipping(true);
    
    // 1. Append final logs rapidly
    const finalLogs = ["[INFO] Initiating Final Handshake...", "[SYSTEM] Optimizing Bundles...", "[SUCCESS] Production Deploy Triggered!"];
    let i = 0;
    const interval = setInterval(() => {
        setTerminalLogs(prev => [...prev, finalLogs[i]]);
        i++;
        if (i >= finalLogs.length) clearInterval(interval);
    }, 300);

    // 2. Rocket Launch Animation
    gsap.to(rocketRef.current, {
        y: -1000,
        x: 500,
        scale: 2,
        duration: 1.5,
        ease: "expo.in",
        onComplete: () => {
            onShip && onShip();
            // Reset for next time (even though site restarts)
            setTimeout(() => {
                setIsShipping(false);
                gsap.set(rocketRef.current, { y: 0, x: 0, scale: 1 });
            }, 2000);
        }
    });

    // 3. Screen Flash
    gsap.fromTo(sectionRef.current, 
        { background: 'transparent' }, 
        { background: 'rgba(0,255,148,0.1)', duration: 0.2, repeat: 3, yoyo: true }
    );
  };

  return (
    <section id="shipping" ref={sectionRef} className="section" style={{ border: 'none' }}>
      <div className="section-inner">
        <div className="section-header">
            <h2 className="section-title" style={{ color: 'var(--success-green)' }}>{shipping.headline}</h2>
            <p className="section-subtitle">{shipping.subtitle}</p>
        </div>
        
        <div className="section-grid" style={{ position: 'relative' }}>
            {judgeMode && (
                <>
                    <div className="judge-badge mono" style={{ position: 'absolute', top: '-30px', left: '0', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '2px 8px', fontSize: '9px', zIndex: 10 }}>[REQ: TERMINAL_UI_SIM]</div>
                    <div className="judge-badge mono" style={{ position: 'absolute', top: '100px', right: '10%', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '4px 8px', fontSize: '9px', zIndex: 10 }}>[REQ: COMPLEX_GSAP_ANIMATION]</div>
                </>
            )}
            <div className="ship-control card" style={{ position: 'relative', overflow: 'hidden', padding: 'var(--space-5) 0' }}>
                <div ref={rocketRef} style={{ fontSize: '100px', marginBottom: '40px', display: 'inline-block', filter: 'drop-shadow(0 0 20px var(--success-green-glow))' }}>🚀</div>
                
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <button 
                    className={`cta-btn ${isShipping ? 'disabled' : ''}`} 
                    onClick={handleShipClick} 
                    style={{ 
                        padding: '24px 64px', background: 'var(--success-green)', border: 'none', 
                        borderRadius: 'var(--radius-full)', color: '#000', fontSize: 'var(--font-lg)', 
                        fontWeight: '900', cursor: isShipping ? 'not-allowed' : 'pointer', transition: 'all 0.4s', 
                        boxShadow: '0 20px 50px rgba(0, 255, 148, 0.3)',
                        opacity: isShipping ? 0.5 : 1,
                        transform: isShipping ? 'scale(0.95)' : (isShipping ? 'scale(1)' : 'scale(1)')
                    }}
                    >
                    {isShipping ? "LAUNCHING..." : shipping.btn}
                    </button>
                    {!isShipping && <div className="mono" style={{ marginTop: '20px', fontSize: '11px', color: 'var(--success-green)', animation: 'pulse 1s infinite' }}>[READY TO SHIP]</div>}
                </div>

                {/* Engine Flame effect when shipping */}
                {isShipping && (
                    <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '100px', background: 'linear-gradient(to top, transparent, var(--success-green))', opacity: 0.4, filter: 'blur(20px)' }} />
                )}
            </div>

            <div className="terminal card" style={{ padding: 0, background: '#0D1117', height: '400px', border: '1px solid #30363D' }}>
                <div style={{ background: '#161B22', padding: '12px 20px', fontSize: '11px', borderBottom: '1px solid #30363D', color: '#8B949E', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono">shipping_pipeline.log</span>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30363D' }}></div>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30363D' }}></div>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#30363D' }}></div>
                    </div>
                </div>
                <div className="mono" style={{ padding: '24px', fontSize: '12px', height: 'calc(100% - 40px)', overflowY: 'auto', scrollBehavior: 'smooth' }}>
                    {terminalLogs.map((log, i) => (
                        <div key={i} style={{ color: log.includes('[WARN]') ? 'var(--warning-red)' : (log.includes('[SUCCESS]') ? 'var(--success-green)' : '#C9D1D9'), marginBottom: '10px', opacity: 0.9 }}>
                            <span style={{ opacity: 0.4 }}>$ </span> {log}
                        </div>
                    ))}
                    <div className="cursor" style={{ width: '8px', height: '14px', background: 'var(--success-green)', animation: 'blink 1s step-end infinite', display: 'inline-block' }} />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingPhaseSection;
