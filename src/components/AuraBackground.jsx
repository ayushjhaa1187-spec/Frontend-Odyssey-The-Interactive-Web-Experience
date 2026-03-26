import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * AuraBackground
 * An organic, morphing background based on SVG feTurbulence.
 * Changes base color and jitter frequency based on the activeSection.
 */
const AuraBackground = ({ activeSection, emotionColor, caffeineLevel = 1 }) => {
  const filterRef = useRef(null);

  useEffect(() => {
    if (!filterRef.current) return;
    const turb = filterRef.current;
    
    // Default "Clean" state (Hero, Eureka)
    let freq = "0.01 0.01";
    let scale = 50;

    // Adjust frequency based on activeSection AND caffeineLevel
    if (activeSection === 'bugs' || activeSection === 'deadline' || caffeineLevel >= 3) {
       freq = caffeineLevel >= 4 ? "0.08 0.08" : "0.05 0.05";
       scale = caffeineLevel >= 4 ? 150 : 120;
    }

    gsap.to(turb, {
        attr: { 
            baseFrequency: freq,
            numOctaves: (activeSection === 'bugs' || caffeineLevel >= 5) ? 5 : 2 
        },
        duration: 2,
        ease: "power2.inOut"
    });

    // Animate seed for a constant "living" aura
    gsap.to(turb, {
        attr: { seed: "+=1000" },
        duration: 80 - (caffeineLevel * 10), // Faster animation with more caffeine
        repeat: -1,
        ease: "none"
    });

  }, [activeSection, caffeineLevel]);

  return (
    <div 
        className="aura-container" 
        style={{ 
            position: 'fixed', inset: 0, zIndex: -2,  // Moved further back
            background: '#05070a', 
            overflow: 'hidden',
            pointerEvents: 'none' 
        }}
    >
        <svg style={{ 
            width: '100%', height: '100%', 
            opacity: 0.1 + (caffeineLevel * 0.02), // Subtly increase opacity with caffeine
            transition: 'opacity 2s ease-in-out'
        }}>
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
            
            <circle cx="50%" cy="50%" r="65%" fill={emotionColor} filter="url(#aura-noise)" style={{ transition: 'fill 2s ease-in-out' }} />
        </svg>
        
        {/* Secondary decorative glow layer */}
        <div style={{ 
            position: 'absolute', inset: 0, 
            background: `radial-gradient(circle at 50% 50%, ${emotionColor}${Math.min(22 + caffeineLevel * 5, 50).toString(16)} 0%, transparent 70%)`,
            transition: 'background 2s ease-in-out',
            mixBlendMode: 'screen',
            opacity: 0.8
        }} />
    </div>
  );
};

export default React.memo(AuraBackground);
