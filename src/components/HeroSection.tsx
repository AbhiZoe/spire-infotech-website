import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
const PARTICLE_COUNT = 90;
const MAX_DIST = 140;
const PARTICLE_SPEED = 0.45;
const PARTICLE_SIZE_MAX = 1.8;
const PARTICLE_SIZE_MIN = 0.6;
const PARTICLE_OPACITY_MAX = 0.55;
const PARTICLE_OPACITY_MIN = 0.2;
const LINE_ALPHA_FACTOR = 0.28;
const ParticleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; }> = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * PARTICLE_SPEED,
                vy: (Math.random() - 0.5) * PARTICLE_SPEED,
                size: Math.random() * PARTICLE_SIZE_MAX + PARTICLE_SIZE_MIN,
                opacity: Math.random() * PARTICLE_OPACITY_MAX + PARTICLE_OPACITY_MIN,
            });
        }
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MAX_DIST) {
                        const alpha = (1 - dist / MAX_DIST) * LINE_ALPHA_FACTOR;
                        ctx.strokeStyle = `rgba(31, 199, 199, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            for (const p of particles) {
                ctx.fillStyle = `rgba(31, 199, 199, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            }
            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
        const handleResize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};
const HeroSection: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const [typingDone, setTypingDone] = useState(false);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const hero = heroRef.current;
        const headline = headlineRef.current;
        if (!hero || !headline) return;
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const endFontSize = isMobile ? "15vw" : "20vw";
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "+=600",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });
        tl.to(headline, { fontSize: endFontSize, ease: "none", });
        tl.to( headline, { opacity: 0.3, ease: "none", }, 0.5 );
        return () => {
            const triggers = ScrollTrigger.getAll();
            triggers.forEach((trigger) => trigger.kill());
        };
    }, []);
    return (
        <section id="hero" ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center text-white pt-20" style={{ background: "#0F1419" }}>
            <div className="absolute inset-0">
                <ParticleCanvas />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/60 via-transparent to-secondary-900/80 pointer-events-none" />
            <motion.div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" animate={{ x: [0, 25, 0], y: [0, -18, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-primary-400/5 blur-3xl pointer-events-none" animate={{ x: [0, -25, 0], y: [0, 25, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
            <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} >
                    <span className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-6"> Welcome to Spire Infotech </span>
                </motion.div>
                <h1 ref={headlineRef} className="text-white font-black leading-tight mb-6" style={{ fontSize: "4rem", textRendering: "geometricPrecision", WebkitFontSmoothing: "antialiased", willChange: "font-size", }}>
                    Every great technology begins with a human idea that refuses to stay grounded.
                </h1>
                <motion.p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                    Transform your business with innovative software solutions tailored to your needs
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
                    <button className="px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"> Get Started </button>
                    <button className="px-8 py-3 border border-primary-500 text-primary-400 rounded-lg font-semibold hover:bg-primary-500/10 transition-colors"> Learn More </button>
                </motion.div>
            </div>
            <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <span className="text-gray-400 text-sm">Scroll to explore</span>
                <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </motion.div>
        </section>
    );
};
export default HeroSection;