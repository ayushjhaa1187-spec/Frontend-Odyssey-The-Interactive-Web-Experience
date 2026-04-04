import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NeuralLabSection = () => {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        let animationFrame;
        let particles = [];

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 2 + 1,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            particles.forEach((p, i) => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0 || p.x > window.innerWidth) p.speedX *= -1;
                if (p.y < 0 || p.y > window.innerHeight) p.speedY *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 229, 255, ${0.1 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
            animationFrame = requestAnimationFrame(drawParticles);
        };

        const handleResize = () => {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            initParticles();
        };

        handleResize();
        drawParticles();
        window.addEventListener('resize', handleResize);

        // GSAP Text Animation
        gsap.fromTo(textRef.current, 
            { opacity: 0, y: 50 }, 
            { 
                opacity: 1, y: 0, duration: 1.5, ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse"
                }
            }
        );

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section 
            id="neural-lab" 
            ref={sectionRef}
            className="panel neural-lab-section active"
            style={{ position: 'relative', overflow: 'hidden', background: '#05070a' }}
        >
            <canvas 
                ref={canvasRef} 
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} 
            />
            
            <div className="content-container flex flex-col items-center justify-center h-full relative z-10 px-8">
                <div ref={textRef} className="max-w-4xl text-center">
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                        NEURAL <span className="text-accent-blue">LABORATORY</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-400 font-mono leading-relaxed uppercase tracking-widest opacity-80">
                        "The data speaks. From code to intelligence."
                    </p>
                    
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Synthetic Intelligence', value: 'Active' },
                            { label: 'Neural Mapping', value: 'Enabled' },
                            { label: 'Matrix Extraction', value: 'Complete' }
                        ].map((stat, i) => (
                            <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/5 backdrop-blur-md">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                                <p className="text-2xl font-black text-white uppercase tracking-tighter">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NeuralLabSection;
