import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { devLifeStory } from '../content/devLifeStory';

const { bugs } = devLifeStory;

const BugsSection = ({ onAllSmashed, judgeMode }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [bugsSmashed, setBugsSmashed] = useState(0);
  const bugsRef = useRef([]);
  const bugIcons = ['🐛', '🪲', '🐜', '🕷️', '🦗'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const isMobile = window.innerWidth < 768;

    class Bug {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.icon = bugIcons[Math.floor(Math.random() * bugIcons.length)];
        this.size = Math.random() * 10 + (isMobile ? 30 : 20);
        this.speedX = (Math.random() - 0.5) * (isMobile ? 2 : 4);
        this.speedY = (Math.random() - 0.5) * (isMobile ? 2 : 4);
        this.opacity = 1;
        this.isSmashed = false;
        this.rotation = Math.random() * Math.PI * 2;
        this.squashScale = 1;
      }
      update() {
        if (this.isSmashed) return;
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += 0.05;
        if (this.x < 20 || this.x > canvas.width - 20) this.speedX *= -1;
        if (this.y < 20 || this.y > canvas.height - 20) this.speedY *= -1;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.squashScale, this.squashScale);
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.icon, 0, 0);
        ctx.restore();
      }
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bugCountVal = (isMobile || prefersReducedMotion) ? 8 : 15;

    const initBugs = () => {
      bugsRef.current = Array.from({ length: bugCountVal }, () => new Bug());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bugsRef.current.forEach(bug => {
        bug.update();
        bug.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    initBugs();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInput = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const isTouch = e.type === 'touchstart';
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    
    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    const hitRadius = isTouch ? 40 : 30;

    bugsRef.current.forEach(bug => {
      if (!bug.isSmashed && Math.hypot(bug.x - mx, bug.y - my) < hitRadius) {
        bug.isSmashed = true;
        setBugsSmashed(prev => {
            const next = prev + 1;
            if (next === bugsRef.current.length) {
                setTimeout(() => onAllSmashed && onAllSmashed(), 1200);
            }
            return next;
        });
        
        gsap.to(bug, { 
            squashScale: 2.5, 
            opacity: 0, 
            duration: 0.5, 
            ease: "expo.out"
        });
      }
    });

    if (isTouch) {
        // Prevent scrolling while squashing bugs
        if (e.cancelable) e.preventDefault();
    }
  };

  return (
    <section id="bugs" ref={sectionRef} className="section" style={{ background: 'linear-gradient(180deg, rgba(255,75,75,0.03), transparent)' }}>
      <div className="section-inner">
        <div className="section-header">
            <h2 className="section-title" style={{ color: 'var(--warning-red)' }}>{bugs.headline}</h2>
            <p className="section-subtitle">{bugs.subtitle}</p>
        </div>
        
        <div className="section-grid" style={{ position: 'relative' }}>
            {judgeMode && <div className="judge-badge mono" style={{ position: 'absolute', top: '-30px', left: '0', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '2px 8px', fontSize: '9px', zIndex: 10 }}>[REQ: INTERACTIVE_GAME_1]</div>}
            <div className="bug-game card" style={{ padding: 0, borderStyle: 'dashed', borderColor: 'var(--warning-red)', background: 'rgba(255,75,75,0.01)' }}>
                <div style={{ padding: '15px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }} aria-live="polite">
                        <span className="pill active" style={{ borderColor: 'var(--warning-red)', color: 'var(--warning-red)', background: 'var(--warning-red-glow)', fontSize: '10px' }}>
                            BUGS: <span aria-label={`${bugsRef.current.length - bugsSmashed} bugs remaining`}>{bugsRef.current.length - bugsSmashed}</span>
                        </span>
                        <div className="mono" style={{ fontSize: '10px', opacity: 0.6, letterSpacing: '1px' }}>{bugs.instructions}</div>
                    </div>
                    {bugsSmashed > 0 && bugsSmashed < bugsRef.current.length && (
                        <button 
                            className="mono touch-target" 
                            onClick={() => setBugsSmashed(bugsRef.current.length)}
                            style={{ fontSize: '9px', color: 'var(--accent-blue)', textDecoration: 'underline', border: 'none', background: 'none' }}
                            aria-label="Squash all bugs automatically"
                        >
                            [AUTO_CLEAN]
                        </button>
                    )}
                </div>
                <div style={{ height: 'clamp(300px, 50vh, 400px)', position: 'relative', overflow: 'hidden' }}>
                    {bugsSmashed >= (bugsRef.current.length || 1) && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(5,7,10,0.95)', zIndex: 10, backdropFilter: 'blur(8px)', textAlign: 'center', padding: '20px' }}>
                            <h3 className="mono" style={{ color: 'var(--success-green)', marginBottom: '10px' }}>BUILD SUCCESSFUL</h3>
                            <span className="pill active" style={{ background: 'var(--success-green)', color: '#000', borderColor: 'var(--success-green)', fontSize: '10px' }}>EUREKA MOMENT INBOUND</span>
                        </div>
                    )}
                    <canvas 
                        ref={canvasRef} 
                        onClick={handleInput} 
                        onTouchStart={handleInput} 
                        aria-label="Bug Squash Mini-game. Click or tap bug icons to stabilize the build."
                        role="img"
                        style={{ cursor: 'crosshair', display: 'block', width: '100%', height: '100%', touchAction: 'none' }} 
                    />
                </div>
            </div>

            <div className="console-panel card" style={{ padding: 0, background: '#000' }}>
                <div style={{ background: 'var(--bg-tertiary)', padding: '12px 20px', fontSize: '11px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Deployment Errors</span>
                </div>
                <div className="mono" style={{ padding: '20px', fontSize: '11px', color: '#FF7B7B', height: 'clamp(200px, 30vh, 400px)', overflowY: 'auto' }}>
                    {bugs.consoleErrors.map((err, i) => (
                        <div key={i} style={{ marginBottom: '8px', opacity: 0.9 }}>▶ {err}</div>
                    ))}
                    <div className="cursor" style={{ width: '8px', height: '14px', background: 'var(--warning-red)', animation: 'blink 1s step-end infinite', display: 'inline-block' }} />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BugsSection;
