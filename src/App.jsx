import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

import HeroSection from './components/HeroSection';
import LearningPhase from './components/LearningPhase';
import BugsSection from './components/BugsSection';
import EurekaSection from './components/EurekaSection';
import DeadlineSection from './components/DeadlineSection';
import CaffeineCommitsSection from './components/CaffeineCommitsSection';
import ShippingPhaseSection from './components/ShippingPhaseSection';
import ProductionDeployedSection from './components/ProductionDeployedSection';
import LoopSection from './components/LoopSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

function App() {
  const [loading, setLoading] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Loading Screen
    const timer = setTimeout(() => {
        setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;

    let ctx = gsap.context(() => {
        // Global Progress Bar
        gsap.to('.progress-bar', {
            width: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3
            }
        });

        // Background Gradient Shifts
        gsap.to("body", {
            backgroundColor: "#0A0E12",
            scrollTrigger: {
                trigger: "#deadline",
                start: "top center",
                end: "bottom top",
                scrub: 1
            }
        });

    }, scrollRef);

    return () => ctx.revert();
  }, [loading]);

  const scrollTo = (target) => {
    gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: target, offsetY: 0 },
        ease: "power2.inOut"
    });
  };

  const handleShip = (e) => {
    const btn = e.target;
    gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    
    // Confetti effect placeholder
    console.log("SHIP IT! Executing production deploy...");
    
    // Simulate deploy then scroll to production section
    setTimeout(() => {
        scrollTo("#production");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="loading-screen" style={{ height: '100vh', width: '100%', background: 'var(--bg-dark)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '150px', height: '2px', background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%', background: 'var(--accent-blue)', animation: 'loading 2s infinite' }} />
        </div>
        <div style={{ marginTop: '20px', fontFamily: 'var(--font-code)', fontSize: '10px', color: 'var(--text-muted)' }}>Initializing Developer Journey...</div>
        <style>{`
            @keyframes loading { 0% { left: -100% } 50% { left: 100% } 100% { left: 100% } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-container" ref={scrollRef}>
      <div className="nav-progress"><div className="progress-bar"></div></div>
      <div className="scroll-indicator hidden"><span className="scroll-text">Scroll to explore</span></div>

      <HeroSection onStartClick={() => scrollTo("#learning")} />
      <LearningPhase />
      <BugsSection onAllSmashed={() => scrollTo("#eureka")} />
      <EurekaSection debugMode={debugMode} setDebugMode={setDebugMode} />
      <DeadlineSection />
      <CaffeineCommitsSection />
      <ShippingPhaseSection onShip={handleShip} />
      <ProductionDeployedSection onShipAgain={() => scrollTo("#shipping")} />
      <LoopSection onRestart={() => scrollTo("#hero")} onBackToTop={() => scrollTo("#hero")} />

      {debugMode && (
          <div className="global-debug-grid" style={{ position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(0,217,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px', border: '2px solid rgba(0,217,255,0.1)' }}></div>
      )}

      <div className="animated-blob blob-1"></div>
      <div className="animated-blob blob-2"></div>
    </div>
  );
}

export default App;
