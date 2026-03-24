import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DeadlineSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    { title: 'Day -3', sub: 'Final feature merge', icon: '✅', id: 0 },
    { title: 'Day -2', sub: 'Code review passed', icon: '✅', id: 1 },
    { title: 'Day -1', sub: 'Performance optimization', icon: '⚡', id: 2 },
    { title: 'Day 0', sub: 'Production deploy', icon: '⏳', id: 3 },
    { title: 'Go Live!', sub: 'Deployed to production', icon: '🎯', id: 4 }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pinned section
      gsap.to('.timeline-container', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: 1
        }
      });

      // Timeline nodes sequentially reveal on scroll
      steps.forEach((_, i) => {
        gsap.fromTo(`.t-node-${i}`, 
          { opacity: 0.2, x: -30, scale: 0.9 },
          { 
            opacity: 1, x: 0, scale: 1, 
            duration: 0.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top center+=${i * 100}`,
              onEnter: () => setActiveStep(i),
              onEnterBack: () => setActiveStep(i),
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

      // Background gets redder as deadline approaches
      gsap.to(sectionRef.current, {
        backgroundColor: "rgba(255, 85, 85, 0.05)",
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="deadline" ref={sectionRef} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--s5)', padding: 'var(--s5) var(--s4)', position: 'relative' }}>
      <div className="deadline-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-title danger" style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '4px' }}>The deadline is approaching...</h2>
        <p className="deadline-subtitle" style={{ color: 'var(--danger-red)', fontSize: '24px', fontWeight: '800', marginBottom: 'var(--s5)' }}>3 days left to ship</p>
        
        <div className="timeline-container" style={{ position: 'relative', height: 'fit-content' }}>
            <svg className="timeline-svg" viewBox="0 0 40 600" style={{ position: 'absolute', left: '-40px', top: '0', height: '100%', width: '40px', padding: '10px' }}>
                <line x1="20" y1="0" x2="20" y2="600" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5,5" />
                <path className="timeline-line-active" d="M 20 0 L 20 600" stroke="var(--accent-blue)" strokeWidth="4" strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.1s', strokeDasharray: '600', strokeDashoffset: 600 - (activeStep * 150) }} />
            </svg>
            <div className="timeline-nodes" style={{ display: 'flex', flexDirection: 'column', gap: '40px', textAlign: 'left' }}>
                {steps.map((s, i) => (
                    <div 
                        key={i} 
                        className={`t-node t-node-${i} premium-card ${activeStep === i ? 'active' : ''} ${i < activeStep ? 'done' : ''}`}
                        onClick={() => setActiveStep(i)}
                        style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.3s', maxWidth: '400px', opacity: activeStep >= i ? 1 : 0.3 }}
                    >
                        <span className="t-icon" style={{ fontSize: '24px', filter: activeStep === i ? 'drop-shadow(0 0 8px var(--accent-blue-glow))' : 'none' }}>{s.icon}</span>
                        <div className="t-text">
                            <strong style={{ display: 'block', fontSize: '18px' }}>{s.title}</strong>
                            <span style={{ fontSize: '14px', opacity: 0.6 }}>{s.sub}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default DeadlineSection;
