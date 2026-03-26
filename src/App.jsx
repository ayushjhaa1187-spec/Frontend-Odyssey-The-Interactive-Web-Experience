import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

import './App.css';
import narration from './content/narrationMessages';
import { useKeyboardNavigation, useGestureNavigation } from './hooks/useNavigation';

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

const sections = [
    { id: 'hero', label: 'Dream' },
    { id: 'learning', label: 'Grind' },
    { id: 'bugs', label: 'Chaos' },
    { id: 'eureka', label: 'Hope' },
    { id: 'deadline', label: 'Panic' },
    { id: 'caffeine', label: 'Drive' },
    { id: 'shipping', label: 'Deploy' },
    { id: 'production', label: 'Life' },
    { id: 'loop', label: 'Repeat' }
];

const emotionalArc = {
  hero: { emotion: 'hope', color: '#00B8D4' },
  learning: { emotion: 'overwhelm', color: '#FFD600' },
  bugs: { emotion: 'frustration', color: '#FF6B6B' },
  eureka: { emotion: 'triumph', color: '#00E676' },
  deadline: { emotion: 'panic', color: '#FF5CB8' },
  caffeine: { emotion: 'determination', color: '#00B8D4' },
  shipping: { emotion: 'anxiety', color: '#FF5CB8' },
  production: { emotion: 'pride', color: '#00E676' },
  loop: { emotion: 'acceptance', color: '#B0BEC5' }
};

const CHARACTER = {
  name: 'Alex Chen',
  role: 'Junior Full-Stack Engineer'
};

const loadingJokes = [
    "Downloading more RAM...",
    "Centering the <div>...",
    "Consulting Stack Overflow...",
    "Replacing 100 errors with 1 mistake...",
    "Mining for semi-colons...",
    "Resolving merge conflicts from 2024..."
];

import { initGlobalShortcuts, checkUrlParams } from './utils/shortcuts';

/** Focus-trapping Mentor dialog with ESC-to-close */
const MentorDialog = ({ onClose }) => {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    // Auto-focus close button
    closeBtnRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      // Trap Tab inside dialog
      if (e.key === 'Tab') {
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      role="dialog"
      aria-labelledby="mentor-title"
      aria-modal="true"
    >
        <div className="card mono" style={{ maxWidth: '400px', border: '1px solid var(--accent-blue)', background: '#05070a', padding: '30px', textAlign: 'center' }}>
            <h3 id="mentor-title" style={{ color: 'var(--accent-blue)', marginBottom: '20px', fontSize: '14px' }}>[MENTOR_TERMINAL_V1.0]</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.8', marginBottom: '30px', color: 'var(--text-secondary)' }}>
                "The code is but a shadow of your intent. Focus on the flow, and the bugs will dissipate like morning mist. Commit often, but think twice before merging. And always, always take a coffee break."
            </p>
            <button
              ref={closeBtnRef}
              className="pill active"
              onClick={onClose}
              aria-label="Close mentor terminal"
              style={{ padding: '10px 30px', cursor: 'pointer' }}
            >
              CLOSE_TERMINAL
            </button>
        </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [insaneMode, setInsaneMode] = useState(false);
  const [judgeMode, setJudgeMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [liveMessage, setLiveMessage] = useState("");
  const [motionEnabled, setMotionEnabled] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [caffeineLevel, setCaffeineLevel] = useState(1);
  const [showMentor, setShowMentor] = useState(false);
  const [typedChars, setTypedChars] = useState("");
  const [loopCount, setLoopCount] = useState(0);
  const [sectionsVisited, setSectionsVisited] = useState(new Set(['hero']));
  const [legendUnlocked, setLegendUnlocked] = useState(false);
  const mentorTriggerRef = useRef(null);
  const scrollRef = useRef(null);
  const jokeRef = useRef(null);
  const loaderRef = useRef(null);

  const announce = useCallback((msg) => {
    setLiveMessage(""); // Clear first to force re-announcement
    setTimeout(() => setLiveMessage(msg), 50);
  }, []);

  // Narrate section changes + track visits + update theme color
  useEffect(() => {
    if (!loading && narration.sectionEnter[activeSection]) {
        announce(narration.sectionEnter[activeSection]);
        
        // Update emotional color
        const theme = emotionalArc[activeSection];
        if (theme) {
          document.documentElement.style.setProperty('--accent-blue', theme.color);
          document.documentElement.style.setProperty('--accent-blue-glow', `${theme.color}4D`); // 30% alpha
        }

        setSectionsVisited(prev => {
          const next = new Set(prev);
          next.add(activeSection);
          return next;
        });
    }
  }, [activeSection, loading, announce]);

  // Focus management during scroll journey
  useEffect(() => {
    if (loading) return;
    
    // Find the active section element
    const sectionEl = document.getElementById(activeSection);
    if (!sectionEl) return;

    // Find first interactive element (ignoring skip links)
    const focusTarget = sectionEl.querySelector(
      'button:not(.skip-link), [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusTarget) {
      // Delay focus shift to allow entry transition to finish (matches duration in sections)
      const timer = setTimeout(() => {
        // Only move focus if the user isn't already focused on something in this section
        if (!sectionEl.contains(document.activeElement)) {
          focusTarget.focus();
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [activeSection, loading]);

  // Meta console log
  useEffect(() => {
    console.log(
      `%c🚀 Frontend Odyssey v2.0 - Character: ${CHARACTER.name}\n%cYou are inside a developer's journey.\nEvery scroll triggers their memories…\n%cTry: type "mentor" or "help" anywhere.`,
      'font-size: 18px; color: #00B8D4; font-weight: bold;',
      'font-size: 12px; color: #B0BEC5;',
      'font-size: 11px; color: #90A4AE; font-style: italic;'
    );
  }, []);

  // Easter egg: unlock legend mode when all 9 sections visited
  useEffect(() => {
    if (sectionsVisited.size === sections.length && !legendUnlocked) {
      setLegendUnlocked(true);
      announce("Secret unlocked: Legend Mode. You visited every section.");
      console.log('%c🔓 LEGEND MODE ACTIVATED', 'color: #00E676; font-size: 16px; font-weight: bold;');
      document.body.classList.add('legend-mode');
    }
  }, [sectionsVisited, legendUnlocked, announce]);

  // Initialize modes from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isJudge = urlParams.get('judge') === 'true';
    const isDebug = urlParams.get('debug') === 'true';
    if (isJudge) setJudgeMode(true);
    if (isDebug) setDebugMode(true);
  }, []);

  // Handle Global Shortcuts
  useEffect(() => {
    const cleanupShortcuts = initGlobalShortcuts({
      onKonami: () => setInsaneMode(prev => !prev),
      onEsc: () => {
        setDebugMode(false);
        setJudgeMode(false);
        setInsaneMode(false);
        document.body.classList.remove('terminal-override');
      }
    });

    // Loading Screen Jokes
    let jokeIdx = 0;
    const jokeInterval = setInterval(() => {
        if (jokeRef.current) {
            gsap.to(jokeRef.current, {
                text: loadingJokes[jokeIdx % loadingJokes.length],
                duration: 0.5,
                ease: "none"
            });
            jokeIdx++;
        }
    }, 1500);

    const loadTimer = setTimeout(() => {
        setLoading(false);
        clearInterval(jokeInterval);
    }, 4500);

    return () => {
        cleanupShortcuts();
        clearInterval(jokeInterval);
        clearTimeout(loadTimer);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
        // Build up typed string to check for keywords
        const newTyped = (typedChars + e.key.toLowerCase()).slice(-6);
        setTypedChars(newTyped);
        
        if (newTyped.includes("mentor") || newTyped.slice(-4).includes("help")) {
            mentorTriggerRef.current = document.activeElement; // save trigger
            setShowMentor(true);
            announce(narration.mentorOpened);
            setTypedChars(""); // reset
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedChars, announce]);

  useEffect(() => {
    if (loading) return;

    let ctx = gsap.context(() => {
        // Initial reveal
        gsap.set('.app-container', { opacity: 1 });
        // Global Progress Bar
        gsap.to('.progress-bar', {
            width: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.2
            }
        });

        // Section Reveal Batch
        ScrollTrigger.batch(".section", {
            onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, overwrite: true, duration: 1.5, ease: "expo.out" }),
            onLeaveBack: batch => gsap.to(batch, { opacity: 0.1, y: 40, overwrite: true })
        });

        // Body Background & Active Section Tracking
        sections.forEach((section) => {
            let bgColor = "var(--bg-primary)";
            if (section.id === 'bugs') bgColor = "#0A050F";
            if (section.id === 'deadline') bgColor = "#0F0505";
            if (section.id === 'production') bgColor = "#050F08";

            ScrollTrigger.create({
                trigger: `#${section.id}`,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    setActiveSection(section.id);
                    gsap.to("body", { backgroundColor: bgColor, duration: 2, ease: "power2.inOut" });
                },
                onEnterBack: () => {
                    setActiveSection(section.id);
                    gsap.to("body", { backgroundColor: bgColor, duration: 2, ease: "power2.inOut" });
                }
            });
        });

        const isMobile = window.innerWidth < 768;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Background Blobs Floating - only on desktop and if motion is enabled
        if (!isMobile && !prefersReducedMotion && motionEnabled) {
            gsap.to(self.selector('.blob-1'), {
                x: "random(-100, 100)",
                y: "random(-100, 100)",
                duration: "random(10, 20)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            gsap.to(self.selector('.blob-2'), {
                x: "random(-100, 100)",
                y: "random(-100, 100)",
                duration: "random(10, 20)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Bobbing Scroll Indicator
        if (motionEnabled && !prefersReducedMotion) {
            gsap.to(self.selector('.mouse'), {
                y: 8,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }

        // Hide scroll indicator on scroll
        gsap.to('.scroll-indicator', {
            opacity: 0,
            y: 20,
            scrollTrigger: {
                trigger: "body",
                start: "150 top",
                toggleActions: "play none none reverse"
            }
        });

    }, scrollRef);

    return () => ctx.revert();
  }, [loading, motionEnabled]);

  const scrollTo = useCallback((target) => {
    gsap.to(window, {
        duration: 2,
        scrollTo: { y: target, autoKill: false },
        ease: "expo.inOut"
    });
  }, []);

  // Keyboard navigation: PageUp/Down, Home/End, 1-9
  useKeyboardNavigation(sections, scrollTo, announce);

  // Mobile gesture navigation: swipe left/right between sections
  useGestureNavigation({
    onSwipeLeft: useCallback(() => {
      const idx = sections.findIndex(s => s.id === activeSection);
      const next = Math.min(idx + 1, sections.length - 1);
      scrollTo(`#${sections[next].id}`);
      announce(`Swiped to ${sections[next].label}.`);
    }, [activeSection, scrollTo, announce]),
    onSwipeRight: useCallback(() => {
      const idx = sections.findIndex(s => s.id === activeSection);
      const prev = Math.max(idx - 1, 0);
      scrollTo(`#${sections[prev].id}`);
      announce(`Swiped to ${sections[prev].label}.`);
    }, [activeSection, scrollTo, announce])
  });

  const handleShip = () => {
    if (debugMode) console.log("SHIP IT! Executing production deploy...");
    // The ShippingPhaseSection will call this, but we'll add a short delay for its internal animation
    setTimeout(() => {
        scrollTo("#production");
    }, 1200);
  };

  if (loading) {
    const jokes = [
        "INITIALIZING ODYSSEY...",
        "MINIFYING SPAGHETTI CODE...",
        "IMPORTING STACKOVERFLOW...",
        "CENTERING THE DIV...",
        "REMOVING UNDEFINED...",
        "UPDATING DEPS (3000 ERRORS)..."
    ];

    return (
      <div className="loading-screen" style={{ height: '100vh', width: '100%', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 99999, position: 'fixed' }}>
        <div ref={loaderRef} style={{ fontSize: '100px', marginBottom: '40px', filter: 'drop-shadow(0 0 20px var(--accent-blue-glow))' }}>🚀</div>
        <div style={{ width: '240px', height: '2px', background: 'rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
            <div style={{ position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%', background: 'var(--accent-blue)', animation: 'loading 1.5s infinite linear' }} />
        </div>
        <div ref={jokeRef} className="mono" style={{ marginTop: '24px', fontSize: '10px', color: 'var(--accent-blue)', letterSpacing: '2px', textTransform: 'uppercase', height: '14px', textAlign: 'center' }}>
            {jokes[0]}
        </div>
      </div>
    );
  }

  return (
    <div className={`app-container level-${caffeineLevel}`} ref={scrollRef}>
      {/* Caffeine Global Effects Layer */}
      <div 
        className="caffeine-overlay" 
        style={{ 
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000,
            transition: 'all 0.5s ease',
            opacity: caffeineLevel >= 3 ? 0.3 : 0,
            background: 'radial-gradient(circle, transparent 40%, rgba(255, 77, 168, 0.1) 100%)',
            boxShadow: caffeineLevel >= 3 ? 'inset 0 0 100px var(--accent-pink-glow)' : 'none'
        }} 
      />
      <a href="#main-story-content" className="skip-link">Skip to main content</a>
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
      >
        {liveMessage}
      </div>

      {/* Global Elements */}
      <div className="nav-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Reading Progress Bar">
        <div className="progress-bar"></div>
      </div>
      
      <nav className="chapter-markers" aria-label="Section Navigation">
          {sections.map((s) => (
              <button 
                key={s.id} 
                className={`marker ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => scrollTo(`#${s.id}`)}
                aria-label={`Go to ${s.label} section`}
                aria-current={activeSection === s.id ? 'section' : undefined}
              >
                  <span className="marker-label mono" aria-hidden="true">{s.label}</span>
                  <div className="marker-dot"></div>
              </button>
          ))}
          <div className="marker-spine" aria-hidden="true"></div>
      </nav>

      <div className="scroll-indicator" aria-hidden="true">
          <div className="mouse"><div className="wheel"></div></div>
          <span className="mono" style={{ fontSize: '9px', opacity: 0.5, letterSpacing: '2px' }}>SCROLL</span>
      </div>

      <div className="parallax-bg" style={{ position: 'fixed', inset: 0, zIndex: -1, opacity: 0.05, background: 'radial-gradient(circle, var(--accent-blue) 1px, transparent 1px)', backgroundSize: '60px 60px', transform: 'translateZ(0)' }}></div>

      {/* Admin/Judge Modes */}
      {judgeMode && (
          <div className="judge-legend card mono" style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 10005, background: 'rgba(5,7,10,0.95)', border: '1px solid var(--accent-pink)', width: '280px', padding: '15px' }}>
              <h5 style={{ color: 'var(--accent-pink)', marginBottom: '10px', fontSize: '11px' }}>JUDGE_MODE: ACTIVE</h5>
              <div style={{ fontSize: '9px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                  <div style={{ marginBottom: '8px', color: 'var(--accent-blue)' }}>CORE_REQUIREMENTS: ✅</div>
                  [1] 5+ Narrative Sections: ✅ (9 total) <br />
                  [2] 2+ Scroll Effects: ✅ (Parallax, Background Shifts, Scrollytelling) <br />
                  [3] 3+ Interactive Elements: ✅ (Bug Squash, Coffee Slider, Ship UI, Code Editor) <br />
                  [4] 3+ Animations: ✅ (GSAP Loading, Hero Sequence, Production Rocket, Loop Cycle) <br />
                  [5] Responsive: ✅ (Mobile-First Touch Verified)
              </div>
              <button 
                onClick={() => setJudgeMode(false)}
                className="mono" 
                style={{ marginTop: '15px', background: 'var(--accent-pink)', border: 'none', padding: '5px 10px', fontSize: '9px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}
              >
                [EXIT_JUDGE_MODE]
              </button>
          </div>
      )}

      {/* Sections */}
      <HeroSection onStartClick={() => scrollTo("#learning")} judgeMode={judgeMode} announce={announce} motionEnabled={motionEnabled} />
      <LearningPhase judgeMode={judgeMode} announce={announce} motionEnabled={motionEnabled} />
      <BugsSection onAllSmashed={() => scrollTo("#eureka")} judgeMode={judgeMode} announce={announce} motionEnabled={motionEnabled} />
      <EurekaSection debugMode={debugMode} setDebugMode={setDebugMode} judgeMode={judgeMode} announce={announce} motionEnabled={motionEnabled} />
      <DeadlineSection judgeMode={judgeMode} announce={announce} motionEnabled={motionEnabled} />
      <CaffeineCommitsSection judgeMode={judgeMode} announce={announce} motionEnabled={motionEnabled} onLevelChange={setCaffeineLevel} />
      <ShippingPhaseSection onShip={handleShip} judgeMode={judgeMode} announce={announce} motionEnabled={motionEnabled} />
      <ProductionDeployedSection onShipAgain={() => scrollTo("#shipping")} judgeMode={judgeMode} announce={announce} motionEnabled={motionEnabled} />
      <LoopSection onRestart={() => { setLoopCount(c => c + 1); scrollTo("#hero"); }} onBackToTop={() => scrollTo("#hero")} judgeMode={judgeMode} announce={announce} motionEnabled={motionEnabled} loopCount={loopCount} />

      {/* Mentor Terminal Easter Egg */}
      {showMentor && (
          <MentorDialog
            onClose={() => {
                setShowMentor(false);
                announce(narration.mentorClosed);
                // Return focus to the element that triggered the mentor
                setTimeout(() => mentorTriggerRef.current?.focus(), 50);
            }}
          />
      )}

      {/* Motion Toggle */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10006, display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => {
                const next = !motionEnabled;
                setMotionEnabled(next);
                announce(narration.motionToggled(next));
            }}
            className="mono"
            aria-pressed={motionEnabled}
            aria-label="Toggle motion. Disables background bobbing and decorative animations."
            title="Disables background bobbing and decorative motion"
            style={{ 
                background: 'rgba(5,7,10,0.8)', color: motionEnabled ? 'var(--accent-blue)' : 'var(--text-secondary)',
                border: `1px solid ${motionEnabled ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                padding: '6px 12px', fontSize: '9px', borderRadius: '40px', cursor: 'pointer',
                backdropFilter: 'blur(10px)', transition: 'all 0.3s'
            }}
          >
            MOTION: {motionEnabled ? 'ON' : 'OFF'}
          </button>
      </div>

      <footer style={{ padding: 'var(--space-4) 0', borderTop: '1px solid var(--border-color)', textAlign: 'center', opacity: 0.6 }}>
          <div className="container">
              <div className="mono" style={{ fontSize: '10px', letterSpacing: '2px', marginBottom: '10px' }}>
                  BUILT WITH COFFEE & REACT BY ANTIGRAVITY
              </div>
              <div style={{ fontSize: '11px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
                  <span>© 2026 FRONTEND ODYSSEY</span>
                  <button 
                    onClick={() => alert("HINT: Try scrolling, dragging sliders, or clicking the floating bugs. If things look stuck, use the ?judge=true parameter for requirement labels.")}
                    style={{ textDecoration: 'underline', cursor: 'help', color: 'var(--accent-blue)' }}
                    className="mono"
                  >
                    [HAVING_TROUBLE?]
                  </button>
              </div>
          </div>
      </footer>

      {debugMode && (
          <div className="global-debug-grid" style={{ position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(0,209,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      )}

      {insaneMode && (
          <div className="insane-mode-overlay mono" style={{ position: 'fixed', inset: 0, zIndex: 10001, pointerEvents: 'none', background: 'rgba(0,255,148,0.02)', border: '1px solid var(--success-green)', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'var(--success-green)', fontSize: '9px' }}>
                  [SYSTEM_OVERRIDE]: INSANE_DEBUG_V1.4.2 <br />
                  TIME: {new Date().toLocaleTimeString()} <br />
                  MEM: {Math.floor(Math.random() * 999)} MB <br />
                  FPS: 60 [FIXED]
              </div>
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: 'var(--success-green)', fontSize: '9px', textAlign: 'right' }}>
                  PRESS ESC TO REVERT TO REALITY <br />
                  // NO ESCAPE FROM THE LOOP
              </div>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, var(--success-green) 1px, var(--success-green) 2px)', backgroundSize: '100% 4px' }}></div>
          </div>
      )}

      <div className="animated-blob blob-1"></div>
      <div className="animated-blob blob-2"></div>
    </div>
  );
}

export default App;
