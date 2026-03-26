import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { devLifeStory } from '../content/devLifeStory';

const { learning } = devLifeStory;

const LearningPhase = () => {
  const sectionRef = useRef(null);
  const codeBoxRef = useRef(null);
  const bgCodeRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const milestones = learning.milestones;

  const milestoneCode = [
    `console.log("Hello, World!");`,
    `const root = document.getElementById('root');\nroot.innerHTML = '<h1>Hello!</h1>';`,
    `/* styles.css */\n#app {\n  display: flex;\n  background: #00D1FF;\n}`,
    `const [count, setCount] = useState(0);\n\nfunction onInit() {\n  console.log("App Live");\n}`,
    `export default function App() {\n  return (\n    <Layout>\n      <Navbar />\n      <HeroContent />\n    </Layout>\n  );\n}`
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // IDE Panel Pinned
      ScrollTrigger.create({
        trigger: ".ide-panel-wrapper",
        start: "top 120px",
        endTrigger: sectionRef.current,
        end: "bottom 600px",
        pin: true,
        pinSpacing: false
      });

      // Background code parallax
      gsap.to(bgCodeRef.current, {
        y: -300,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      });

      // Highlight milestones
      milestones.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.milestone-${i}`,
          start: "top center",
          onEnter: () => setExpandedIndex(i),
          onEnterBack: () => setExpandedIndex(i)
        });
      });

      // Staggered reveal with Batch
      ScrollTrigger.batch(".milestone", {
        onEnter: (batch) => gsap.fromTo(batch, 
            { opacity: 0, y: 50, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 1.2, ease: "expo.out", overwrite: true }
        ),
        onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 50, overwrite: true })
      });

      // IDE Cursor blink
      gsap.to(".ide-cursor", { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });

    }, sectionRef);

    return () => ctx.revert();
  }, [milestones.length]);

  useEffect(() => {
    if (codeBoxRef.current) {
        gsap.to(codeBoxRef.current, {
            text: milestoneCode[expandedIndex],
            duration: 1,
            ease: "none"
        });
    }
  }, [expandedIndex]);

  return (
    <section id="learning" ref={sectionRef} className="section" style={{ overflow: 'hidden', paddingBottom: '30vh' }}>
      {/* Parallax Background */}
      <div 
        ref={bgCodeRef} 
        className="mono"
        style={{ 
            position: 'absolute', top: 0, right: '-5%', width: '40%', height: '150%', 
            fontSize: '11px', lineHeight: '2.5', opacity: 0.04, color: 'var(--accent-blue)', 
            whiteSpace: 'pre', pointerEvents: 'none', zIndex: 0 
        }}
      >
        {`const learn = () => {\n  const skill = fetch('wisdom');\n  return skill.json();\n};\n`.repeat(100)}
      </div>

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
            <h2 className="section-title">{learning.headline}</h2>
            <p className="section-subtitle">{learning.subtitle}</p>
        </div>
        
        <div className="section-grid">
            <aside className="ide-panel-wrapper" style={{ zIndex: 10 }}>
                <div className="ide-panel card" style={{ height: '400px', padding: 0, background: '#0D1117', border: '1px solid #30363D' }}>
                    <div className="ide-header" style={{ background: '#161B22', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #30363D' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }}></div>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }}></div>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }}></div>
                        </div>
                        <span className="mono" style={{ fontSize: '10px', color: '#8B949E' }}>Odyssey.js</span>
                    </div>
                    <div className="ide-content mono" style={{ height: 'calc(100% - 40px)', position: 'relative', padding: '24px', fontSize: '13px', color: '#C9D1D9', lineHeight: '1.6' }}>
                        <div ref={codeBoxRef} style={{ whiteSpace: 'pre-wrap' }}></div>
                        <div className="ide-cursor" style={{ display: 'inline-block', width: '8px', height: '16px', background: 'var(--accent-blue)', verticalAlign: 'middle', marginLeft: '4px' }}></div>
                    </div>
                </div>
            </aside>

            <main className="milestone-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {milestones.map((m, i) => (
                    <div 
                        key={i}
                        className={`milestone milestone-${i} card ${expandedIndex === i ? 'active' : ''}`} 
                        style={{ 
                            borderColor: expandedIndex === i ? 'var(--accent-blue)' : 'var(--border-color)',
                            background: expandedIndex === i ? 'rgba(0, 209, 255, 0.05)' : 'var(--bg-card)',
                            opacity: expandedIndex === i ? 1 : 0.6,
                            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div className="mono" style={{ fontSize: '28px', opacity: expandedIndex === i ? 1 : 0.3 }}>{m.icon}</div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ color: expandedIndex === i ? 'var(--accent-blue)' : 'inherit', marginBottom: '4px', fontSize: '15px' }}>{m.title}</h4>
                                <p style={{ fontSize: '12px', opacity: 0.6, maxWidth: '400px' }}>{m.desc}</p>
                            </div>
                            {expandedIndex === i && <div className="mono" style={{ fontSize: '10px', color: 'var(--success-green)', animation: 'pulse 1s infinite' }}>[COMPLETED]</div>}
                        </div>
                    </div>
                ))}
            </main>
        </div>
      </div>
    </section>
  );
};

export default LearningPhase;
