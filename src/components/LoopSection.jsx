import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { devLifeStory } from '../content/devLifeStory';
import narration from '../content/narrationMessages';

gsap.registerPlugin(ScrollTrigger);

const { loop } = devLifeStory;

// ... (keep props)

const LoopSection = ({ onRestart, onBackToTop, judgeMode, announce, loopCount = 0 }) => {
  const sectionRef = useRef(null);
  const [jokeIndex] = React.useState(() => Math.floor(Math.random() * loop.jokes.length));

  useEffect(() => {
    let ctx = gsap.context(() => {
        const q = gsap.utils.selector(sectionRef);
        // Tile stagger animation
        gsap.from(q(".loop-tile"), {
            opacity: 0,
            scale: 0.8,
            stagger: 0.1,
            duration: 1,
            ease: "back.out(2)",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // Loop animation on icons
        gsap.to(q(".loop-icon"), {
            rotate: 360,
            duration: 10,
            repeat: -1,
            ease: "none"
        });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [hasAscended, setHasAscended] = React.useState(false);

  const handleRestart = () => {
    if (announce) announce(narration.loopRestart(loopCount + 1));
    onRestart && onRestart();
  };

  const handleAscend = () => {
    setHasAscended(true);
    if (announce) announce("Breaking the cycle. You have ascended to Seniority. Credits rolling.");
    gsap.to(window, { scrollTo: "#loop", duration: 1, ease: "power2.inOut" });
  };

  return (
    <section id="loop" ref={sectionRef} className="section theme-pink" style={{ minHeight: hasAscended ? '100vh' : 'auto' }}>
      <div className="section-inner" style={{ textAlign: 'center', position: 'relative' }}>
        {judgeMode && <div className="judge-badge mono" style={{ position: 'absolute', top: '-20px', right: '0', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)', padding: '2px 8px', fontSize: '9px', zIndex: 10 }}>[REQ: NARRATIVE_STORY_LOOP]</div>}
        
        {!hasAscended ? (
          <>
            <div className="section-header">
                <h2 className="section-title">{loop.headline}</h2>
                <p className="section-subtitle">{loop.subtitle}</p>
            </div>

            <div className="section-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: 'var(--space-5)' }}>
                {loop.tiles.map((tile, i) => (
                    <div key={i} className="loop-tile card" style={{ borderColor: 'var(--accent-pink)', background: 'rgba(255,0,225,0.02)', padding: 'var(--space-3)' }}>
                        <div className="loop-icon" style={{ fontSize: '32px', marginBottom: '15px' }} aria-hidden="true">{tile.icon}</div>
                        <h4 style={{ fontSize: 'var(--font-xs)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-pink)', marginBottom: '8px' }}>{tile.label}</h4>
                        <p style={{ fontSize: '11px', opacity: 0.6 }}>{tile.text}</p>
                    </div>
                ))}
            </div>

            <div className="final-cta card" style={{ padding: 'clamp(40px, 10vw, 60px)', borderStyle: 'dashed', borderColor: 'var(--accent-pink)', maxWidth: '800px', margin: '0 auto' }}>
                <h3 style={{ marginBottom: '20px', fontSize: 'var(--font-lg)' }}>{loop.footerMsg}</h3>
                <div id="ending-choice-desc" className="sr-only">
                    This is the final choice of the story. You can choose to 'Restart the Cycle', which takes you back to the beginning to experience the developer's journey again. 
                    Alternatively, you can choose to 'Ascend and Break the Cycle', which concludes the journey with a special credits sequence.
                </div>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button 
                        className="cta-btn pill active" 
                        onClick={handleRestart}
                        aria-label="Restart the developer journey cycle"
                        aria-describedby="ending-choice-desc"
                        style={{ 
                            padding: '16px 40px', background: 'var(--accent-pink)', border: 'none', 
                            borderRadius: 'var(--radius-full)', color: 'white', fontSize: 'var(--font-md)', fontWeight: '800', 
                            cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 0 20px var(--accent-pink-glow)'
                        }}
                    >
                        {loop.btn}
                    </button>
                    <button 
                        className="pill" 
                        onClick={handleAscend}
                        aria-label="Ascend and Break the Cycle. View credits."
                        aria-describedby="ending-choice-desc"
                        style={{ 
                            padding: '16px 40px', background: 'transparent', border: '1px solid var(--accent-pink)', 
                            borderRadius: 'var(--radius-full)', color: 'var(--accent-pink)', fontSize: 'var(--font-md)', fontWeight: '800', 
                            cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        BREAK CYCLE
                    </button>
                </div>
                <div style={{ marginTop: '30px', opacity: 0.4, fontSize: 'var(--font-xs)' }} className="mono" aria-hidden="true">
                    {loop.jokes[jokeIndex]}
                </div>
            </div>
          </>
        ) : (
          <div className="credits-roll card mono" style={{ maxWidth: '600px', margin: '100px auto', padding: '60px', opacity: 1, transform: 'scale(1)', transition: 'all 0.8s' }}>
             <h3 style={{ color: 'var(--accent-pink)', marginBottom: '40px' }}>[ ASCENDANCE_COMPLETE ]</h3>
             <div style={{ fontSize: '13px', lineHeight: '2', color: 'var(--text-secondary)' }}>
                <p>YOU HAVE SUCCESSFULLY REACHED SENIORITY.</p>
                <p>THE LOOP HAS BEEN BROKEN.</p>
                <br />
                <p>DIRECTED BY: ALEX CHEN</p>
                <p>PRODUCED BY: COFFE & CURIOSITY</p>
                <p>STARRING: THE JUDGES & THE USER</p>
                <p>MUSIC: MECHANICAL KEYBOARD CLACKS</p>
                <br />
                <p style={{ color: 'var(--accent-pink)' }}>THANKS FOR PLAYING!</p>
             </div>
             <button 
                className="mono touch-target" 
                onClick={() => setHasAscended(false)}
                style={{ marginTop: '40px', background: 'none', border: 'none', color: 'var(--accent-pink)', textDecoration: 'underline', cursor: 'pointer', fontSize: '11px' }}
                aria-label="Return to loop selection"
             >
                [BACK_TO_VALLEY]
             </button>
          </div>
        )}

        <footer role="contentinfo" style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-color)', opacity: 0.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <span className="mono" style={{ fontSize: '11px' }}>&copy; 2026 Frontend Odyssey | Built with GSAP & Pure Focus</span>
                <nav aria-label="Footer navigation">
                    <button 
                      onClick={onBackToTop} 
                      className="mono touch-target"
                      aria-label="Scroll back to top of the page"
                      style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-pink)', letterSpacing: '1px', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Back to top ↑
                    </button>
                </nav>
            </div>
        </footer>
      </div>
    </section>
  );
};

export default LoopSection;
