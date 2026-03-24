import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProductionDeployedSection = ({ onShipAgain }) => {
  const sectionRef = useRef(null);
  const [usersOnline, setUsersOnline] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
        // Count up online users
        gsap.to(sectionRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                onEnter: () => startCounting(),
                once: true
            }
        });

        // Metrics cards stagger
        gsap.from(".stat-item", {
            opacity: 0,
            y: 30,
            scale: 0.9,
            stagger: 0.2,
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

  const startCounting = () => {
    gsap.to(".stat-users", {
        innerText: 1247,
        duration: 2.5,
        snap: { innerText: 1 },
        ease: "power2.out",
        onUpdate: function() {
            setUsersOnline(Math.floor(this.targets()[0].innerText));
        }
    });
  };

  return (
    <section id="production" ref={sectionRef} style={{ padding: 'var(--s5) var(--s4)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="section-title success" style={{ textAlign: 'center' }}>Production Deployed!</h2>
      <p style={{ maxWidth: '600px', margin: '0 auto var(--s5)', textAlign: 'center', opacity: 0.8, fontSize: '18px' }}>Your application is now globally distributed and serving live traffic.</p>
      
      <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s3)', maxWidth: '900px', width: '100%', marginBottom: 'var(--s5)' }}>
          <div className="stat-item premium-card" style={{ padding: 'var(--s3)', textAlign: 'center', border: '1px solid rgba(34, 255, 34, 0.2)' }}>
              <span className="stat-num stat-users" style={{ display: 'block', fontSize: '32px', fontWeight: '800', color: 'var(--success-green)' }}>{usersOnline}</span>
              <span className="stat-label" style={{ fontSize: '12px', opacity: 0.5, textTransform: 'uppercase' }}>Users Online</span>
          </div>
          <div className="stat-item premium-card" style={{ padding: 'var(--s3)', textAlign: 'center', border: '1px solid rgba(34, 255, 34, 0.2)' }}>
              <span className="stat-num" style={{ display: 'block', fontSize: '32px', fontWeight: '800', color: 'var(--success-green)' }}>99.9%</span>
              <span className="stat-label" style={{ fontSize: '12px', opacity: 0.5, textTransform: 'uppercase' }}>Uptime</span>
          </div>
          <div className="stat-item premium-card" style={{ padding: 'var(--s3)', textAlign: 'center', border: '1px solid rgba(34, 255, 34, 0.2)' }}>
              <span className="stat-num" style={{ display: 'block', fontSize: '32px', fontWeight: '800', color: 'var(--success-green)' }}>23s</span>
              <span className="stat-label" style={{ fontSize: '12px', opacity: 0.5, textTransform: 'uppercase' }}>Deploy Time</span>
          </div>
      </div>

      <div className="next-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s4)', maxWidth: '1000px', width: '100%' }}>
          <div className="next-card premium-card" style={{ padding: '30px', textAlign: 'center' }}>
              <div style={{ fontSize: '30px', marginBottom: '15px' }}>📊</div>
              <h4 style={{ marginBottom: '10px' }}>Monitor</h4>
              <p style={{ fontSize: '13px', opacity: 0.6 }}>Tracking performance and health in real-time.</p>
          </div>
          <div className="next-card premium-card" style={{ padding: '30px', textAlign: 'center' }}>
              <div style={{ fontSize: '30px', marginBottom: '15px' }}>📈</div>
              <h4 style={{ marginBottom: '10px' }}>Scale</h4>
              <p style={{ fontSize: '13px', opacity: 0.6 }}>Preparing for the next million users seamlessly.</p>
          </div>
          <div className="next-card premium-card" onClick={onShipAgain} style={{ padding: '30px', textAlign: 'center', cursor: 'pointer', border: '1px solid var(--accent-blue)' }}>
              <div style={{ fontSize: '30px', marginBottom: '15px' }}>🚀</div>
              <h4 style={{ marginBottom: '10px' }}>Ship Again</h4>
              <p style={{ fontSize: '13px', opacity: 0.6 }}>Building the future, one commit at a time.</p>
          </div>
      </div>
    </section>
  );
};

export default ProductionDeployedSection;
