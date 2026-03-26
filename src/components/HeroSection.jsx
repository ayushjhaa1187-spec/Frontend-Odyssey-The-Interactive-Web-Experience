import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { devLifeStory } from '../content/devLifeStory';

const { hero } = devLifeStory;

const HeroSection = ({ onStartClick, judgeMode, announce, motionEnabled }) => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const pRef = useRef(null);
  const btnRef = useRef(null);
  const codeBoxRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
          // Target the global main-scroll-indicator instead
          const mainInd = document.querySelector('.main-scroll-indicator');
          if (mainInd) gsap.to(mainInd, { opacity: 1, y: 0, duration: 1 });
        }
      });
      
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 1.4, ease: "expo.out" }, "-=0.8")
        .to(pRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, "-=1")
        .to(btnRef.current, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=0.8")
        .to(codeBoxRef.current, { opacity: 0.4, duration: 1.5 }, "-=0.5");

      // Floating doodles animation
      gsap.to(self.selector('.bracket'), {
          y: "random(-20, 20)",
          rotate: "random(-5, 5)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
      });

      // Hero Parallax - only on desktop for performance
      if (window.innerWidth >= 768) {
        gsap.to(self.selector('.bracket.left'), { 
            x: 100, 
            scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 }
        });
        gsap.to(self.selector('.bracket.right'), { 
            x: -100, 
            scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 }
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="main-story-content" ref={heroRef} className="section hero theme-blue">
      <div className="grid-bg" aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.03, zIndex: -2 }}></div>
      <div className="bracket left" aria-hidden="true" style={{ position: 'absolute', top: '25%', left: '8%', fontSize: 'min(15vw, 250px)', opacity: 0.05, zIndex: -1, userSelect: 'none' }}>&#123;</div>
      <div className="bracket right" aria-hidden="true" style={{ position: 'absolute', bottom: '25%', right: '8%', fontSize: 'min(15vw, 250px)', opacity: 0.05, zIndex: -1, userSelect: 'none' }}>&#125;</div>
      
      {judgeMode && <div className="judge-badge mono" style={{ position: 'absolute', top: '30%', left: '15%', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '4px 8px', fontSize: '9px', zIndex: 10 }}>[REQ: PARALLAX_EFFECT_1]</div>}

      <div className="section-inner" style={{ textAlign: 'center' }}>
        <header className="section-header">
           <span className="pill active" ref={badgeRef} style={{ opacity: 0, transform: 'translateY(40px)', marginBottom: 'var(--space-2)' }}>
              <span role="img" aria-label="Rocket">🚀</span> {hero.badge}
           </span>
          <h1 className="section-title" ref={titleRef} style={{ opacity: 0, transform: 'translateY(50px)', fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
            <span style={{ color: 'var(--accent-blue)' }}>{hero.headline.split(' ').slice(0, 1)}</span> {hero.headline.split(' ').slice(1).join(' ')}
          </h1>
          <p className="section-subtitle" ref={pRef} style={{ opacity: 0, transform: 'translateY(30px)', maxWidth: '600px', margin: '0 auto var(--space-4)' }}>
            {hero.subtitle}
          </p>
        </header>
        
        <div ref={btnRef} style={{ opacity: 0, transform: 'scale(0.8)' }}>
            <button 
                className="cta-btn" 
                onClick={onStartClick} 
                aria-label="Embark on the Developer Journey"
                style={{ 
                    background: 'var(--accent-blue)', 
                    color: 'var(--bg-primary)', padding: '18px 48px', borderRadius: 'var(--radius-full)', 
                    fontSize: 'var(--font-md)', fontWeight: '800', transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    boxShadow: '0 10px 40px rgba(0, 209, 255, 0.3)',
                    border: 'none', cursor: 'pointer'
                }}
            >
                {hero.cta}
            </button>
        </div>
      </div>

      <div id="hero-mantra-desc" className="sr-only">
        An interactive code snippet representing the developer's mantra. 
        Clicking this or pressing Enter will cycle through different humorous or insightful 
        developer quotes and code snippets.
      </div>
      <div 
        ref={codeBoxRef} 
        className="mono" 
        onClick={() => {
            const jokes = hero.jokes;
            gsap.to(codeBoxRef.current, { text: { value: jokes[Math.floor(Math.random() * jokes.length)], delimiter: "" }, duration: 0.8, ease: "power2.out" });
        }}
        onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const jokes = hero.jokes;
                gsap.to(codeBoxRef.current, { text: { value: jokes[Math.floor(Math.random() * jokes.length)], delimiter: "" }, duration: 0.8, ease: "power2.out" });
            }
        }}
        role="button"
        tabIndex="0"
        aria-label="Interactive developer mantra"
        aria-describedby="hero-mantra-desc"
        style={{ 
          position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', 
          opacity: 0, fontSize: 'var(--font-xs)', color: 'var(--text-muted)', 
          textAlign: 'center', cursor: 'help', pointerEvents: 'auto', zIndex: 10, width: '100%',
          padding: '10px'
        }}
      >
        {hero.initCode}
      </div>
      {judgeMode && <div className="judge-badge mono" style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '2px 8px', fontSize: '9px', zIndex: 20 }} aria-hidden="true">[REQ: INTERACTIVE_ELEMENT_1]</div>}
    </section>
  );
};

export default HeroSection;
