import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { devLifeStory } from '../content/devLifeStory';

const { deadline } = devLifeStory;

const developerWisdom = [
  { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { quote: "Make it work, make it right, make it fast — in that order.", author: "Kent Beck" },
  { quote: "There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.", author: "Phil Karlton" },
  { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" }
];

const DeadlineSection = ({ judgeMode }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [panicLevel, setPanicLevel] = useState(20);

  const steps = deadline.steps;

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      // Pin the section
      ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${isMobile ? 1200 : 2000}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const index = Math.floor(self.progress * (steps.length - 0.01));
            setActiveStep(index);
          }
      });

      // Panic Shake Animation
      if (panicLevel > 50) {
          gsap.to(".scrolly-card-container", {
              x: `random(${-panicLevel/12}, ${panicLevel/12})`,
              y: `random(${-panicLevel/12}, ${panicLevel/12})`,
              rotate: `random(${-panicLevel/80}, ${panicLevel/80})`,
              duration: 0.1,
              repeat: -1,
              yoyo: true,
              ease: "none"
          });
          gsap.to("body", { backgroundColor: `rgba(255, 0, 0, ${panicLevel/400})`, duration: 0.3 });
      } else {
          gsap.killTweensOf(".scrolly-card-container");
          gsap.set(".scrolly-card-container", { x: 0, y: 0, rotate: 0 });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [steps.length, panicLevel]);

  return (
    <section id="deadline" ref={sectionRef} className="section theme-red" style={{ border: 'none', background: 'transparent' }}>
      <div className="section-inner" ref={containerRef} style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div className="section-header" style={{ position: 'absolute', top: '10vh', left: '0', right: '0', zIndex: 10 }}>
            {judgeMode && <div className="judge-badge mono" style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '2px 8px', fontSize: '9px' }}>[REQ: PINNED_SCROLLYTELLING]</div>}
            <h2 className="section-title">{deadline.headline}</h2>
            
            <div className="panic-slider-wrapper card" style={{ maxWidth: '350px', margin: '20px auto 0', padding: '12px 20px', background: 'rgba(255,0,0,0.05)', borderStyle: 'dotted' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
                    {judgeMode && <div style={{ position: 'absolute', top: '-25px', right: 0, color: 'var(--accent-pink)', fontSize: '8px' }}>[REQ: INTERACTIVE_ELEMENT_2]</div>}
                    <div className="mono" style={{ fontSize: '9px', opacity: 0.5, textAlign: 'center', letterSpacing: '1px', marginBottom: '4px' }}>{deadline.instructions}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label htmlFor="panic-slider" className="mono" style={{ fontSize: '10px', color: 'var(--warning-red)' }}>PANIC LEVEL:</label>
                        <span className="mono" style={{ fontSize: '10px', color: 'var(--warning-red)' }} aria-live="polite">{panicLevel}%</span>
                    </div>
                </div>
                <input 
                    id="panic-slider"
                    type="range" 
                    min="0" 
                    max="100" 
                    value={panicLevel} 
                    onChange={(e) => setPanicLevel(parseInt(e.target.value))}
                    aria-label="Adjust your current developer panic level"
                    style={{ 
                        width: '100%', cursor: 'pointer', accentColor: 'var(--warning-red)', 
                        height: '30px'
                    }} 
                />
            </div>
            
            <aside className="developer-wisdom card" style={{ maxWidth: '350px', margin: '20px auto 0', padding: '15px', background: 'var(--bg-card)', borderStyle: 'solid', borderColor: 'var(--bg-tertiary)', textAlign: 'left' }}>
              <blockquote style={{ margin: 0 }}>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '8px' }}>
                  "{developerWisdom[activeStep % developerWisdom.length].quote}"
                </p>
                <footer className="mono" style={{ fontSize: '9px', color: 'var(--accent-blue)', textAlign: 'right' }}>
                  — {developerWisdom[activeStep % developerWisdom.length].author}
                </footer>
              </blockquote>
            </aside>
        </div>
        
        <div className="scrolly-card-container" style={{ position: 'relative', height: '350px', width: '100%', maxWidth: '500px', margin: '60px auto 0' }}>
            {steps.map((s, i) => (
                <div 
                    key={i} 
                    className={`scrolly-card card`}
                    aria-hidden={activeStep !== i}
                    style={{ 
                        position: 'absolute', top: 0, left: 0, right: 0,
                        borderColor: activeStep === i ? 'var(--warning-red)' : 'var(--border-color)',
                        padding: 'var(--space-3)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                        opacity: activeStep === i ? 1 : 0,
                        transform: activeStep === i ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                        pointerEvents: activeStep === i ? 'auto' : 'none'
                    }}
                >
                    <div style={{ fontSize: 'clamp(40px, 12vw, 70px)', marginBottom: '15px' }} aria-hidden="true">
                        {s.icon}
                    </div>
                    <div className="mono" style={{ fontSize: '9px', color: 'var(--warning-red)', marginBottom: '10px', border: '1px solid var(--warning-red)', padding: '2px 8px', borderRadius: '4px' }}>PHASE {i + 1}</div>
                    <h3 style={{ marginBottom: '8px', fontSize: 'var(--font-lg)' }}>{s.title}</h3>
                    <p style={{ fontSize: '12px', opacity: 0.8 }}>{s.sub}</p>
                    
                    <div style={{ marginTop: '20px', width: '100%', height: '3px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div 
                            style={{ width: activeStep === i ? '100%' : (i < activeStep ? '100%' : '0%'), height: '100%', background: 'var(--warning-red)', transition: 'width 0.5s ease-out' }} 
                            role="progressbar"
                            aria-valuenow={activeStep === i ? 100 : 0}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        />
                    </div>
                </div>
            ))}
        </div>

        <div className="deadline-timer mono" style={{ position: 'absolute', bottom: '10vh', left: '0', right: '0', textAlign: 'center', fontSize: '11px', opacity: 0.8, color: panicLevel > 80 ? '#FF7B7B' : 'inherit' }} aria-live="assertive">
            SYSTEM_STRESS_REPORT: {panicLevel > 80 ? "[CRITICAL] FAILING" : (panicLevel > 40 ? "[WARNING] UNSTABLE" : "[INFO] NOMINAL")} | PHASE: {activeStep + 1}
        </div>
      </div>
    </section>
  );
};

export default DeadlineSection;
