import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const BugsSection = ({ onAllSmashed }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [bugsSmashed, setBugsSmashed] = useState(0);
  const [isBugAnimating, setIsBugAnimating] = useState(false);
  const bugsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    class Bug {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 3;
        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;
        this.opacity = 1;
        this.isSmashed = false;
      }
      update() {
        if (this.isSmashed) return;
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.isSmashed ? 'transparent' : `rgba(255, 85, 85, ${this.opacity})`;
        ctx.fill();
        if (!this.isSmashed) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(255, 85, 85, 0.5)';
        }
      }
    }

    const initBugs = () => {
      bugsRef.current = Array.from({ length: 20 }, () => new Bug());
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
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    initBugs();
    animate();

    // GSAP Scroll effect: Bugs drift up when scrolling
    gsap.to(bugsRef.current, {
        y: "-=200",
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 1
        }
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    bugsRef.current.forEach(bug => {
      if (!bug.isSmashed && Math.hypot(bug.x - mx, bug.y - my) < 20) {
        bug.isSmashed = true;
        setBugsSmashed(prev => {
            const next = prev + 1;
            if (next === 15) onAllSmashed();
            return next;
        });
        // Smashed effect
        gsap.to(bug, { opacity: 0, size: 20, duration: 0.3 });
      }
    });
  };

  return (
    <section id="bugs" ref={sectionRef} style={{ padding: 'var(--s5) var(--s4)', background: 'linear-gradient(180deg, rgba(255,85,85,0.05), transparent)' }}>
      <h2 className="section-title danger" style={{ textAlign: 'center' }}>THEN CAME THE BUGS...</h2>
      
      <div className="debug-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s3)', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="left-panel">
            <div className="code-header danger" style={{ background: 'var(--danger-red)', color: '#000', padding: '10px', borderRadius: '8px 8px 0 0', fontSize: '12px', fontWeight: '700' }}>APP.JS — BROKEN</div>
            <div className="premium-card" style={{ padding: '20px', borderRadius: '0 0 8px 8px', minHeight: '300px', fontFamily: 'var(--font-code)', fontSize: '13px', borderTop: 'none' }}>
{`function calculateTotal(price, tax) {
  const total = price + ta; // SyntaxError: ta is not defined
  return total.toFixd(2);  // TypeError: toFixd is not a fn
}`}
            </div>
        </div>

        <div className="right-panel">
            <div className="console-header" style={{ padding: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>Console</div>
            <div className="premium-card" style={{ padding: '20px', height: '300px', color: 'var(--danger-red)', fontFamily: 'var(--font-code)', fontSize: '12px' }}>
                <div style={{ animation: 'glitch 0.5s infinite' }}>[ERROR] ReferenceError: ta is not defined</div>
                <div style={{ opacity: 0.5, marginTop: '10px' }}>{'>'} Stack trace: line 2, line 15, line 42...</div>
            </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--s4)' }}>
        <h3 style={{ marginBottom: '10px', color: 'var(--danger-red)' }}>CATCH THE BUGS TO SQUASH THEM!</h3>
        <p className="bug-counter" style={{ fontFamily: 'var(--font-code)', opacity: 0.6 }}>Bugs Smashed: <span style={{ color: 'var(--danger-red)', fontWeight: '700' }}>{bugsSmashed}</span> / 15</p>
        {bugsSmashed >= 15 && <div className="eureka-hint success" style={{ marginTop: '10px', fontSize: '12px', animation: 'pulse 1s infinite' }}>All bugs squashed! Eureka section unlocked. Scroll down!</div>}
        <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '300px', margin: '20px auto', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <canvas ref={canvasRef} onClick={handleCanvasClick} style={{ cursor: 'crosshair', display: 'block' }} />
        </div>
      </div>
    </section>
  );
};

export default BugsSection;
