import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LearningPhase = () => {
  const sectionRef = useRef(null);
  const codeBoxRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const milestones = [
    { id: 0, icon: '💻', title: 'Day 1: Hello World', desc: 'Your first program. Simple, elegant, life-changing.', stats: 'Memory used: 128 bytes\nExecution time: 0.001s' },
    { id: 1, icon: '🌐', title: 'Week 2: First HTML Page', desc: 'Structure. Semantics. The skeleton of the web.' },
    { id: 2, icon: '🎨', title: 'Month 1: CSS Makes It Pretty', desc: 'Colors, layouts, animations. Suddenly it looks like something.' },
    { id: 3, icon: '⚡', title: 'Month 3: JavaScript Logic', desc: 'Interactivity, state, and complex functionality. The code comes alive.' },
    { id: 4, icon: '🎉', title: 'The Big Picture', desc: "It all clicks. You're no longer just following tutorials—you're building.", stats: 'Project Size: 1.2 MB\nStatus: Ready to Ship' }
  ];

  const milestoneCode = [
    `console.log("Hello, World!");`,
    `const root = document.getElementById('root');\nroot.innerHTML = '<h1>Hello!</h1>';`,
    `/* styles.css */\n#app {\n  display: flex;\n  background: #00D9FF;\n}`,
    `const [count, setCount] = useState(0);\n\nfunction onInit() {\n  console.log("App Live");\n}`,
    `export default function App() {\n  return (\n    <Layout>\n      <Navbar />\n      <HeroContent />\n    </Layout>\n  );\n}`
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pinned Layout
      gsap.to('.ide-panel', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 15%",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: 1
        }
      });

      // Highlight milestones as you scroll
      milestones.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.milestone-${i}`,
          start: "top center",
          onEnter: () => updateCode(i),
          onEnterBack: () => updateCode(i)
        });
      });

      // Smooth revealing of milestones with alternating sides
      gsap.utils.toArray('.milestone').forEach((m, i) => {
        gsap.fromTo(m, 
          { opacity: 0, x: i % 2 === 0 ? -100 : 100 },
          { 
            opacity: 1, x: 0, duration: 1, 
            scrollTrigger: {
              trigger: m,
              start: "top bottom-=100",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const updateCode = (index) => {
    const codeArea = codeBoxRef.current;
    if (!codeArea) return;
    gsap.to(codeArea, {
      duration: 0.8,
      value: milestoneCode[index],
      ease: "power2.out"
    });
  };

  const handleMilestoneClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="learning" ref={sectionRef} className="section section-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--s5)', padding: 'var(--s5) var(--s4)', position: 'relative' }}>
      <aside className="ide-panel-wrapper" style={{ height: '100%' }}>
        <div className="ide-panel premium-card" style={{ height: '500px', width: '100%', overflow: 'hidden', padding: 0 }} onClick={() => setShowModal(true)}>
          <div className="ide-titlebar" style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)' }}>
              <span className="dot dot-r" /> <span className="dot dot-y" /> <span className="dot dot-g" />
              <span className="ide-title" style={{ fontSize: '12px', opacity: 0.5, marginLeft: '10px' }}>app.js</span>
          </div>
          <div className="ide-content" style={{ display: 'grid', gridTemplateColumns: '40px 1fr', height: 'calc(100% - 40px)', fontFamily: 'var(--font-code)', fontSize: '14px', position: 'relative' }}>
            <div className="ide-lines" style={{ padding: '20px 0', textAlign: 'center', opacity: 0.2, borderRight: '1px solid var(--border-color)' }}>
              {Array.from({length: 15}).map((_, i) => <div key={i}>{i+1}</div>)}
            </div>
            <textarea 
                ref={codeBoxRef} 
                defaultValue={`// Your code will appear here...`} 
                spellCheck="false"
                style={{ 
                    padding: '20px', margin: 0, color: 'var(--accent-blue)', background: 'transparent', 
                    border: 'none', width: '100%', height: '100%', resize: 'none', outline: 'none', 
                    whiteSpace: 'pre', fontFamily: 'inherit', fontSize: 'inherit' 
                }}
            />
            <button 
                className="btn-run" 
                onClick={() => {
                    const code = codeBoxRef.current.value;
                    try {
                        const res = eval(code.replace('//', ''));
                        if (res !== undefined) alert(`Output: ${res}`);
                        else alert("Code executed successfully!");
                    } catch(e) {
                        alert(`Error: ${e.message}`);
                    }
                }}
                style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '8px 16px', background: 'var(--success-green)', color: '#000', fontSize: '10px', fontWeight: '800', borderRadius: '4px', zIndex: 10 }}
            >
                RUN ▶
            </button>
          </div>
        </div>
      </aside>

      <main className="learning-content">
        <h2 className="section-title">The Learning Phase</h2>
        <p className="section-subtitle" style={{ marginBottom: 'var(--s4)', opacity: 0.7 }}>Every journey starts with a single line of code.</p>
        
        {milestones.map((m, i) => (
          <div 
            key={i}
            className={`milestone milestone-${i} premium-card ${expandedIndex === i ? 'expanded' : ''}`} 
            onClick={() => handleMilestoneClick(i)}
            style={{ marginBottom: 'var(--s4)', padding: 'var(--s3)', position: 'relative' }}
          >
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span className="m-icon" style={{ fontSize: '32px' }}>{m.icon}</span>
              <div className="m-text">
                <h3 style={{ color: 'var(--accent-blue)', marginBottom: '5px' }}>{m.title}</h3>
                <p style={{ opacity: 0.8 }}>{m.desc}</p>
              </div>
            </div>
            {m.stats && (
              <div 
                className="m-stats" 
                style={{ 
                  marginTop: '15px', paddingTop: '15px', borderTop: '1px solid var(--border-color)', 
                  display: expandedIndex === i ? 'block' : 'none', opacity: expandedIndex === i ? 1 : 0
                }}
              >
                {m.stats.split('\n').map((line, li) => <div key={li}>{line}</div>)}
              </div>
            )}
            <div className="m-tooltip" style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--accent-blue)', color: '#000', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', opacity: 0, transition: '0.3s' }}>
                CLICK TO EXPAND
            </div>
          </div>
        ))}
      </main>

      {showModal && (
        <div 
          className="modal-overlay" 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={() => setShowModal(false)}
        >
          <div className="ide-modal premium-card" style={{ padding: '40px', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--accent-blue)', marginBottom: '20px' }}>The Spark of Creation</h3>
            <p style={{ marginBottom: '30px' }}>Every developer remembers their first line of code. It's the moment the computer first spoke back to you and you realized you could build anything you imagined.</p>
            <button 
              className="btn-close" 
              onClick={() => setShowModal(false)}
              style={{ padding: '15px 30px', background: 'var(--accent-blue)', color: '#000', borderRadius: '8px', fontWeight: '700' }}
            >
              START YOUR STORY
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LearningPhase;
