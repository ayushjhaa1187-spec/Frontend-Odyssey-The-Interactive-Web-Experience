import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * AuraBackground
 * An organic, morphing background based on SVG feTurbulence.
 * Changes base color and jitter frequency based on the activeSection.
 */
const AuraBackground = ({ activeSection, emotionColor }) => {
  const filterRef = useRef(null);

  useEffect(() => {
    if (!filterRef.current) return;
    const turb = filterRef.current;
    
    // Default "Clean" state (Hero, Eureka)
    let freq = "0.01 0.01";
    let scale = 50;

    // "Chaos" or "Panic" state (Bugs, Deadline)
    if (activeSection === 'bugs' || activeSection === 'deadline') {
       freq = "0.05 0.05";
       scale = 120;
    }

    gsap.to(turb, {
        attr: { 
            baseFrequency: freq,
            numOctaves: activeSection === 'bugs' ? 5 : 2 
        },
        duration: 2,
        ease: "power2.inOut"
    });

    // Animate seed for a constant "living" aura
    gsap.to(turb, {
        attr: { seed: "+=1000" },
        duration: 60,
        repeat: -1,
        ease: "none"
    });

  }, [activeSection]);

  return (
    <div 
        className="aura-container" 
        style={{ 
            position: 'fixed', inset: 0, zIndex: -1, 
            background: 'var(--bg-black)', overflow: 'hidden',
            pointerEvents: 'none' 
        }}
    >
        <svg style={{ width: '100%', height: '100%', opacity: 0.15 }}>
            <filter id="aura-noise">
                <feTurbulence 
                    ref={filterRef} 
                    type="turbulence" 
                    baseFrequency="0.01" 
                    numOctaves="2" 
                    result="noise" 
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            
            <circle cx="50%" cy="50%" r="60%" fill={emotionColor} filter="url(#aura-noise)" style={{ transition: 'fill 2s ease-in-out' }} />
        </svg>
        
        {/* Secondary decorative glow layer */}
        <div style={{ 
            position: 'absolute', inset: 0, 
            background: `radial-gradient(circle at 50% 50%, ${emotionColor}22 0%, transparent 70%)`,
            transition: 'background 2s ease-in-out',
            mixBlendMode: 'screen'
        }} />
    </div>
  );
};

export default React.memo(AuraBackground);
