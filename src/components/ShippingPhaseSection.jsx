import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ShippingPhaseSection = ({ onShip }) => {
  const sectionRef = useRef(null);
  const logRef = useRef(null);
  const canvasRef = useRef(null);
  const [logs] = useState([
    "[INFO] Initializing production build...",
    "[INFO] Optimizing tree-shaking...",
    "[INFO] Minifying CSS and JavaScript assets...",
    "[INFO] Compressing image and media files...",
    "[INFO] Running final smoke tests...",
    "[WARN] Detected recursive dependency in node_modules...",
    "[INFO] Generating sourcemaps for debugging...",
    "[INFO] Finalizing build manifest..."
  ]);
  const [visibleLogs, setVisibleLogs] = useState([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
        // Log reveal on scroll
        gsap.to(sectionRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                onEnter: () => startLogreveal(),
                once: true
            }
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const startLogreveal = () => {
    logs.forEach((log, i) => {
        setTimeout(() => {
            setVisibleLogs(prev => [...prev, log]);
        }, i * 400);
    });
  };

  const runConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    const colors = ['#00D9FF', '#22FF22', '#FF5555', '#F1FA8C'];
    
    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: -Math.random() * 15 - 5,
        speedX: (Math.random() - 0.5) * 10,
        gravity: 0.2,
        rotation: Math.random() * 360
      };
    }

    for (let i = 0; i < 200; i++) particles.push(createParticle());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.speedY += p.gravity;
        p.rotation += 5;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.restore();
        if (p.y > canvas.height + 20) particles.splice(i, 1);
      });
      if (particles.length > 0) requestAnimationFrame(animate);
    }
    animate();
  };

  const handleShipClick = (e) => {
    runConfetti();
    onShip(e);
  };

  return (
    <section id="shipping" ref={sectionRef} style={{ padding: 'var(--s5) var(--s4)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="section-title success" style={{ textAlign: 'center' }}>Shipping Phase</h2>
      <div className="shipping-container" style={{ maxWidth: '800px', width: '100%', marginBottom: 'var(--s4)' }}>
        <h4 style={{ textTransform: 'uppercase', fontSize: '12px', opacity: 0.5, marginBottom: '20px' }}>Production Activity Log</h4>
        <div className="activity-log premium-card" ref={logRef} style={{ height: '350px', width: '100%', background: 'var(--bg-darker)', padding: '24px', fontFamily: 'var(--font-code)', fontSize: '13px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {visibleLogs.map((log, i) => (
            <div key={i} className={`log-line ${log.includes('[WARN]') ? 'danger' : ''}`} style={{ color: log.includes('[WARN]') ? 'var(--danger-red)' : 'var(--success-green)', opacity: 0.8 }}>
                {log}
            </div>
          ))}
          {visibleLogs.length < logs.length && <div className="cursor" style={{ width: '8px', height: '16px', background: 'var(--success-green)', animation: 'blink 1s step-end infinite' }} />}
        </div>
      </div>

      <button 
        className="ship-btn" 
        onClick={handleShipClick} 
        style={{ 
            padding: '24px 80px', background: 'var(--success-green)', border: 'none', 
            borderRadius: '50px', color: '#000', fontSize: '24px', fontWeight: '800', 
            cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 40px var(--success-green-glow)', 
            marginTop: '20px' 
        }}
      >
        SHIP IT 🚀
      </button>

      <div style={{ position: 'fixed', inset: 0, zIndex: 99, pointerEvents: 'none', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </section>
  );
};

export default ShippingPhaseSection;
