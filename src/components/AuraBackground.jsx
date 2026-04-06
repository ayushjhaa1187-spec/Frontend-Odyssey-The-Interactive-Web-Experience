import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * AuraBackground (Redesigned as "River of Code")
 * A subtle, flowing background with waves and moving "electron" particles.
 * Ensures 100% visibility of content while providing a premium, dynamic feel.
 */
const AuraBackground = ({ emotionColor, caffeineLevel = 1, motionEnabled = true }) => {
  const containerRef = useRef(null);
  const wave1Ref = useRef(null);
  const wave2Ref = useRef(null);

  useEffect(() => {
    if (!motionEnabled) return;

    // Wave 1 animation (Slower)
    gsap.to(wave1Ref.current, {
      attr: { d: "M0 50 Q25 40 50 50 T100 50" },
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Wave 2 animation (Faster)
    gsap.to(wave2Ref.current, {
      attr: { d: "M0 60 Q25 70 50 60 T100 60" },
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Horizontal "flowing" motion based on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const moveX = (scrollY % 1000) / 10;
      if (wave1Ref.current) wave1Ref.current.style.transform = `translateX(${-moveX}%)`;
      if (wave2Ref.current) wave2Ref.current.style.transform = `translateX(${moveX}%)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [motionEnabled]);

  // Electrons: Small moving particles (Left to Right)
  const [electrons] = useState(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${8 + Math.random() * 12}s`
    }))
  );

  return (
    <div ref={containerRef} className="river-container" aria-hidden="true">
        {/* The "River" Waves */}
        <svg 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none" 
            style={{ width: '400%', height: '100%', position: 'absolute', top: 0, left: '-150%' }}
        >
            <path 
                ref={wave1Ref}
                className="river-wave" 
                d="M0 50 Q25 60 50 50 T100 50" 
                stroke={emotionColor} 
                style={{ opacity: 0.04 + (caffeineLevel * 0.01) }}
            />
            <path 
                ref={wave2Ref}
                className="river-wave" 
                d="M0 60 Q25 50 50 60 T100 60" 
                stroke={emotionColor}
                style={{ opacity: 0.02 + (caffeineLevel * 0.01) }}
            />
        </svg>

        {/* Electron Particles Stream */}
        {motionEnabled && electrons.map(e => (
            <div 
                key={e.id}
                className="river-electron"
                style={{
                    top: e.top,
                    animationDelay: e.delay,
                    animationDuration: e.duration
                }}
            />
        ))}

        {/* Global base glow - very subtle */}
        <div style={{ 
            position: 'absolute', inset: 0, 
            background: `radial-gradient(circle at 50% 50%, ${emotionColor}05 0%, transparent 80%)`,
            transition: 'background 2s ease-in-out'
        }} />
    </div>
  );
};

export default React.memo(AuraBackground);
