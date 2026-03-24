import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = ({ onStartClick }) => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const pRef = useRef(null);
  const btnRef = useRef(null);
  const codeBoxRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to('.scroll-indicator', { opacity: 1, y: 0, duration: 1, delay: 0.5 });
        }
      });
      
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "back.out" })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.4")
        .to(pRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
        .to(btnRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" }, "-=0.4")
        .to(codeBoxRef.current, { opacity: 0.1, duration: 1 }, "-=0.8");

      // Hero Pinning & Parallax
      gsap.fromTo('.bracket.left', 
        { x: -50, rotate: -10, opacity: 0.05 },
        { 
          x: 200, rotate: 15, opacity: 0.2, 
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        }
      );
      
      gsap.fromTo('.bracket.right', 
        { x: 50, rotate: 10, opacity: 0.05 },
        { 
          x: -200, rotate: -15, opacity: 0.2, 
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} style={{ overflow: 'hidden' }}>
      <div className="bracket left" style={{ position: 'absolute', top: '20%', left: '5%', fontSize: 'min(20vw, 300px)', opacity: 0.1, zIndex: -1 }}>&#123;</div>
      <div className="bracket right" style={{ position: 'absolute', bottom: '20%', right: '5%', fontSize: 'min(20vw, 300px)', opacity: 0.1, zIndex: -1 }}>&#125;</div>
      
      <div className="hero-content" style={{ zIndex: 1, position: 'relative' }}>
        <span className="hero-badge" ref={badgeRef} style={{ opacity: 0, transform: 'translateY(30px)' }}>The Developer's Journey</span>
        <h1 ref={titleRef} style={{ opacity: 0, transform: 'translateY(40px)' }}>
          From <span className="hl" style={{ color: 'var(--accent-blue)', textShadow: '0 0 30px var(--accent-blue-glow)' }}>Hello World</span> to <span className="hl" style={{ color: 'var(--accent-blue)' }}>Shipped</span>
        </h1>
        <p ref={pRef} style={{ opacity: 0, transform: 'translateY(20px)', maxWidth: '600px', margin: '0 auto 40px', color: 'var(--text-secondary)' }}>
          A developer's journey is not just about code. It's about curiosity, frustration, breakthroughs, and the moment it all finally works.
        </p>
        <button 
          className="cta-btn" 
          ref={btnRef} 
          onClick={onStartClick} 
          style={{ 
            opacity: 0, transform: 'scale(0.8)', background: 'var(--accent-blue)', 
            color: 'var(--bg-dark)', padding: '16px 40px', borderRadius: '50px', 
            fontSize: '18px', fontWeight: '700', transition: 'all 0.3s' 
          }}
        >
          Start Coding →
        </button>
      </div>

      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.05, zIndex: -2 }}></div>
      <div 
        ref={codeBoxRef} 
        onClick={() => {
            const jokes = [
                "// Why do programmers wear glasses? Because they don't C#.",
                "// Real programmers count from 0.",
                "// I'd like to tell you a joke about UDP, but you might not get it.",
                "// !false - It's funny because it's true."
            ];
            gsap.to(codeBoxRef.current, { text: { value: jokes[Math.floor(Math.random() * jokes.length)], delimiter: "" }, duration: 0.5 });
        }}
        style={{ 
          position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', 
          opacity: 0, fontSize: '12px', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', 
          textAlign: 'left', whiteSpace: 'pre', cursor: 'help', pointerEvents: 'auto', zIndex: 10
        }}
      >
        {`// Initializing life...\nconst developer = new Human();\ndeveloper.startCoding();`}
      </div>
    </section>
  );
};

export default HeroSection;
