import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { devLifeStory } from '../content/devLifeStory';
import narration from '../content/narrationMessages';
import { useFocusRestore } from '../hooks/useFocusRestore';

const { bugs } = devLifeStory;

const BugsSection = ({ onAllSmashed, judgeMode, announce }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [bugsSmashed, setBugsSmashed] = useState(0);
  const bugsRef = useRef([]);
  const bugIcons = ['🐛', '🪲', '🐜', '🕷️', '🦗'];

  const smashBug = (index) => {
    const bug = bugsRef.current[index];
    if (bug && !bug.isSmashed) {
        bug.isSmashed = true;
        setBugsSmashed(prev => {
            const next = prev + 1;
            const remaining = bugsRef.current.length - next;
            if (next === bugsRef.current.length) {
                if (announce) announce(narration.allBugsCleared);
                setTimeout(() => onAllSmashed && onAllSmashed(), 1200);
            } else if (next % 3 === 0) {
                // Announce progress every 3 bugs
                if (announce) announce(narration.bugSquashed(remaining));
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
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const isMobile = window.innerWidth < 768;

    let mouse = { x: -1000, y: -1000 };
    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('touchstart', (e) => handleMouse(e.touches[0]));

    class Bug {
      constructor(id) {
        this.id = id;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.friction = 0.98;
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.icon = bugIcons[Math.floor(Math.random() * bugIcons.length)];
        this.size = Math.random() * 10 + (isMobile ? 30 : 20);
        this.opacity = 1;
        this.isSmashed = false;
        this.rotation = Math.random() * Math.PI * 2;
        this.squashScale = 1;
      }
      update() {
        if (this.isSmashed) return;

        // Repulsion from mouse
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
           const force = (150 - dist) / 150;
           this.vx += (dx / dist) * force * 2;
           this.vy += (dy / dist) * force * 2;
        }

        this.vx *= this.friction;
        this.vy *= this.friction;

        // Random jitter force
        this.vx += (Math.random() - 0.5) * 1.5;
        this.vy += (Math.random() - 0.5) * 1.5;

        this.x += this.vx;
        this.y += this.vy;
        
        // Rotation based on movement
        this.rotation = Math.atan2(this.vy, this.vx) + Math.PI / 2;

        // Boundary Bounce
        if (this.x < 30) { this.x = 30; this.vx *= -1; }
        if (this.x > canvas.width - 30) { this.x = canvas.width - 30; this.vx *= -1; }
        if (this.y < 30) { this.y = 30; this.vy *= -1; }
        if (this.y > canvas.height - 30) { this.y = canvas.height - 30; this.vy *= -1; }
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
      bugsRef.current = Array.from({ length: bugCountVal }, (_, i) => new Bug(i));
    };

    const animate = () => {
      const activeBugs = bugsRef.current.filter(b => !b.isSmashed);
      
      // Stop animation loop when all bugs are smashed
      if (activeBugs.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      activeBugs.forEach(bug => {
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

  const overlayBtnRef = useRef(null);
  const isOverlayOpen = bugsSmashed === bugsRef.current.length && bugsSmashed > 0;
  useFocusRestore(isOverlayOpen, overlayBtnRef);

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

    bugsRef.current.forEach((bug, index) => {
      if (!bug.isSmashed && Math.hypot(bug.x - mx, bug.y - my) < hitRadius) {
        smashBug(index);
      }
    });

    if (isTouch) {
        // Prevent scrolling while squashing bugs
        if (e.cancelable) e.preventDefault();
    }
  };

  const handleAutoClean = () => {
    if (announce) announce(narration.autoCleaned);
    bugsRef.current.forEach((_, i) => smashBug(i));
  };

  return (
    <section id="bugs" ref={sectionRef} className="section theme-red">
      <div className="section-inner">
        <div className="section-header">
            <h2 className="section-title">{bugs.headline}</h2>
            <p className="section-subtitle">{bugs.subtitle}</p>
        </div>
        
        <div className="section-grid" style={{ position: 'relative' }}>
            {judgeMode && <div className="judge-badge mono" style={{ position: 'absolute', top: '-30px', left: '0', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '2px 8px', fontSize: '9px', zIndex: 10 }}>[REQ: INTERACTIVE_GAME_1]</div>}
            <div 
                className="bug-game card" 
                role="application"
                aria-label="Interactive bug squashing game"
                aria-describedby="bug-game-desc"
                style={{ padding: 0, borderStyle: 'dashed', borderColor: 'var(--warning-red)', background: 'rgba(255,75,75,0.01)' }}
            >
                <div id="bug-game-desc" className="sr-only">
                    There are {bugsRef.current.length} total bugs crawling across the screen. 
                    Currently {bugsRef.current.length - bugsSmashed} bugs remain. 
                    {judgeMode ? 'In judge mode, use Tab to cycle through each bug and Enter to squash it.' : 'Click bugs to squash them.'}
                </div>
                <div style={{ padding: '15px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span className="pill active" style={{ borderColor: 'var(--warning-red)', color: 'var(--warning-red)', background: 'var(--warning-red-glow)', fontSize: '10px' }}>
                            BUGS: <span aria-hidden="true">{bugsRef.current.length - bugsSmashed}</span>
                        </span>
                        <div className="mono" style={{ fontSize: '10px', opacity: 0.6, letterSpacing: '1px' }} aria-hidden="true">{bugs.instructions}</div>
                    </div>
                    {bugsSmashed > 0 && bugsSmashed < bugsRef.current.length && (
                        <button 
                            className="mono touch-target" 
                            onClick={handleAutoClean}
                            style={{ fontSize: '9px', color: 'var(--accent-blue)', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}
                            aria-label="Squash all bugs automatically"
                        >
                            [AUTO_CLEAN]
                        </button>
                    )}
                </div>
                <div style={{ height: 'clamp(300px, 50vh, 400px)', position: 'relative', overflow: 'hidden' }}>
                    {/* Accessible Bug Layer */}
                    <div className="sr-only-focusable-layer" 
                         style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
                        {bugsRef.current.map((bug, index) => !bug.isSmashed && (
                            <button
                                key={bug.id}
                                className="sr-only-bug-btn"
                                onClick={() => smashBug(index)}
                                style={{ 
                                    position: 'absolute', 
                                    left: `${(bug.x / (canvasRef.current?.width || 1)) * 100}%`, 
                                    top: `${(bug.y / (canvasRef.current?.height || 1)) * 100}%`, 
                                    width: '40px', 
                                    height: '40px', 
                                    transform: 'translate(-50%, -50%)',
                                    pointerEvents: 'auto',
                                    opacity: 0,
                                    cursor: 'pointer'
                                }}
                                aria-label={`Bug ${index + 1}. Press enter to squash.`}
                            />
                        ))}
                        {bugsSmashed < bugsRef.current.length && (
                             <button
                                className="mono"
                                onClick={() => {
                                    const nextBugIdx = bugsRef.current.findIndex(b => !b.isSmashed);
                                    if (nextBugIdx !== -1) smashBug(nextBugIdx);
                                }}
                                style={{ 
                                    position: 'absolute', 
                                    bottom: '10px', 
                                    right: '10px', 
                                    opacity: 0, 
                                    pointerEvents: 'auto',
                                    cursor: 'pointer'
                                }}
                                aria-label="Find and squash next bug"
                             >
                                [SMASH_NEXT]
                             </button>
                        )}
                    </div>
                    {bugsSmashed >= (bugsRef.current.length || 1) && (
                        <div 
                            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(5,7,10,0.95)', zIndex: 10, backdropFilter: 'blur(8px)', textAlign: 'center', padding: '20px' }} 
                            role="dialog" 
                            aria-labelledby="build-success-title"
                            aria-modal="true"
                            onKeyDown={(e) => {
                                if (e.key === 'Escape' || e.key === 'Enter') {
                                    e.preventDefault();
                                    onAllSmashed && onAllSmashed();
                                }
                                if (e.key === 'Tab') {
                                    e.preventDefault();
                                    overlayBtnRef.current?.focus();
                                }
                            }}
                        >
                            <h3 id="build-success-title" className="mono" style={{ color: 'var(--success-green)', marginBottom: '10px' }}>BUILD SUCCESSFUL</h3>
                            <span className="pill active" style={{ background: 'var(--success-green)', color: '#000', borderColor: 'var(--success-green)', fontSize: '10px' }}>EUREKA MOMENT INBOUND</span>
                            <button 
                                ref={overlayBtnRef}
                                className="mono" 
                                onClick={onAllSmashed}
                                aria-label="Continue to Eureka section"
                                style={{ marginTop: '20px', background: 'transparent', border: '1px solid var(--success-green)', color: 'var(--success-green)', padding: '8px 16px', fontSize: '11px', cursor: 'pointer' }}
                            >
                                [CONTINUE_TO_EUREKA]
                            </button>
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
