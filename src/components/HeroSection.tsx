import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { blurFade } from "@/lib/animations";

/* ── Constants ── */
const PARTICLE_COUNT = 90;
const MAX_DIST = 140;
const PARTICLE_SPEED = 0.45;
const PARTICLE_SIZE_MAX = 1.8;
const PARTICLE_SIZE_MIN = 0.6;
const PARTICLE_OPACITY_MAX = 0.55;
const PARTICLE_OPACITY_MIN = 0.2;
const LINE_ALPHA_FACTOR = 0.28;

const CHAR_DELAY_MS = 65;
const TYPEWRITER_START_DELAY_MS = 600;

/* ── Particle canvas background ── */
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

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

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

/* ── Typewriter component ── */
interface TypewriterTextProps {
  text: string;
  charDelay?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  charDelay = CHAR_DELAY_MS,
  delay = 0,
  className = "",
  showCursor = true,
  onComplete,
}) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setDone(true);
          onCompleteRef.current?.();
        }
      }, charDelay);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, charDelay, delay]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span
          className={`inline-block w-0.5 h-[1em] bg-primary-400 ml-0.5 align-middle ${
            done ? "animate-cursor-blink" : ""
          }`}
          aria-hidden="true"
        />
      )}
    </span>
  );
};

/* ── HeroSection with GSAP ScrollTrigger zoom ── */
const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [typingDone, setTypingDone] = useState(false);
  const handleTypingDone = useCallback(() => setTypingDone(true), []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hero = heroRef.current;
    const headline = headlineRef.current;
    if (!hero || !headline) return;

    // Cinematic headline zoom: 1× → 5×, opacity 1 → 0, blur increases
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

    tl.to(headline, {
      scale: 5,
      opacity: 0,
      filter: "blur(8px)",
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-section relative min-h-screen flex items-center text-white pt-20"
      style={{ background: "#0F1419" }}
    >
      {/* Particle canvas background */}
      <div className="hero-background">
        <ParticleCanvas />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/60 via-transparent to-secondary-900/80 pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl pointer-events-none"
        animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-16 w-96 h-96 rounded-full bg-primary-400/8 blur-3xl pointer-events-none"
        animate={{ x: [0, -18, 0], y: [0, 22, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero content */}
      <div
        ref={contentRef}
        className="hero-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center"
      >
        <motion.span
          className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10"
          variants={blurFade}
          initial="hidden"
          animate="visible"
        >
          Innovative Software Solutions
        </motion.span>

        {/* Epic cinematic headline — GSAP drives the zoom on scroll */}
        <motion.div
          className="mb-6 overflow-visible"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1
            ref={headlineRef}
            className="hero-headline animate-glow-pulse"
          >
            <TypewriterText
              text="Every great technology begins with a human idea that refuses to stay grounded."
              charDelay={CHAR_DELAY_MS}
              delay={TYPEWRITER_START_DELAY_MS}
              showCursor
              onComplete={handleTypingDone}
            />
          </h1>
        </motion.div>

        <motion.p
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: typingDone ? 1 : 0, y: typingDone ? 0 : 20, filter: typingDone ? "blur(0px)" : "blur(8px)" }}
          transition={{ duration: 0.7 }}
        >
          We build custom ERP systems, web applications, and mobile solutions
          that transform how you work and accelerate your growth.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: typingDone ? 1 : 0, y: typingDone ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <motion.a
            href="#contact"
            className="btn-primary"
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 30px rgba(31,199,199,0.45)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Start Your Project
          </motion.a>
          <motion.a
            href="#projects"
            className="btn-ghost"
            whileHover={{
              scale: 1.04,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            View Our Work
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="w-6 h-10 border-2 border-primary-500/40 rounded-full flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-primary-400 rounded-full"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
