import React, { useEffect, useRef, useState, useCallback } from "react";
import Head from "next/head";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Services from "@/components/Services";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import {
  staggerContainer,
  blurFade,
  slideInFromBottom,
  viewportConfig,
} from "@/lib/animations";

/* ── Particle canvas background for Hero ── */
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

/* ── Typewriter text component ── */
/** Delay between each typed character in milliseconds */
const CHAR_DELAY_MS = 65;
/** Delay before the typewriter starts (allows entry animation to settle) */
const TYPEWRITER_START_DELAY_MS = 600;
/**
 * Approximate time (seconds) for both hero lines to finish typing:
 * start_delay + line1_chars * char_delay + line2_chars * char_delay
 * ≈ 0.6s + 21*0.065s + 21*0.065s ≈ 3.3s → 3.5s with buffer
 */
const HERO_TYPING_DONE_S = 3.5;

/** Scroll distance (px) over which the quote zooms from 1× to 5× */
const QUOTE_ZOOM_SCROLL_RANGE = 500;
/** Scroll distance (px) over which the quote fades from fully visible to hidden */
const QUOTE_FADE_SCROLL_RANGE = 350;

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

/* ── Hero with animated canvas background ── */
const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [line2Started, setLine2Started] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { scrollY } = useScroll();
  const handleLine1Complete = useCallback(() => setLine2Started(true), []);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Epic quote zoom effect: scale 1→5, opacity 1→0, blur 0→8px
  const quoteScale = useTransform(scrollY, [0, QUOTE_ZOOM_SCROLL_RANGE], [1, 5]);
  const quoteOpacity = useTransform(scrollY, [0, QUOTE_FADE_SCROLL_RANGE], [1, 0]);
  const quoteBlur = useTransform(
    scrollY,
    [0, QUOTE_ZOOM_SCROLL_RANGE],
    ["blur(0px)", "blur(8px)"]
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center text-white pt-20 overflow-hidden"
      style={{ background: "#0F1419" }}
    >
      {/* Particle canvas */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <ParticleCanvas />
      </motion.div>

      {/* Subtle gradient overlay */}
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

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        style={{ opacity }}
      >
        <motion.span
          className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10"
          variants={blurFade}
          initial="hidden"
          animate="visible"
        >
          Innovative Software Solutions
        </motion.span>

        {/* Epic quote zoom wrapper */}
        <motion.div
          className="zoom-text-trigger mb-6"
          style={{
            scale: quoteScale,
            opacity: quoteOpacity,
            filter: quoteBlur,
            transformOrigin: "center center",
          }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-glow-pulse">
            <motion.span
              className="block text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TypewriterText
                text="Empowering Businesses"
                charDelay={CHAR_DELAY_MS}
                delay={TYPEWRITER_START_DELAY_MS}
                showCursor={!line2Started}
                onComplete={handleLine1Complete}
              />
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: line2Started ? 1 : 0, y: line2Started ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <TypewriterText
                text="with Smart Technology"
                charDelay={CHAR_DELAY_MS}
                delay={0}
                showCursor={line2Started}
              />
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: HERO_TYPING_DONE_S }}
        >
          We build custom ERP systems, web applications, and mobile solutions
          that transform how you work and accelerate your growth.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: HERO_TYPING_DONE_S + 0.3 }}
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
      </motion.div>
    </section>
  );
};

/* ── Why Choose Us ── */
const whyItems = [
  {
    title: "Expert Team",
    desc: "Seasoned professionals with expertise across multiple technology stacks.",
  },
  {
    title: "On-Time Delivery",
    desc: "We respect your deadlines and consistently deliver projects on schedule.",
  },
  {
    title: "Quality Assured",
    desc: "Rigorous testing and quality assurance processes for every project.",
  },
  {
    title: "24/7 Support",
    desc: "Round-the-clock support to ensure your systems run smoothly.",
  },
  {
    title: "Competitive Pricing",
    desc: "Enterprise-quality solutions at prices that fit your budget.",
  },
  {
    title: "Long-term Partnership",
    desc: "We build lasting relationships and grow with your business.",
  },
];

const WhyChooseUs: React.FC = () => (
  <section id="why-us" className="section-padding gradient-dark text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        label="Why Spire"
        title="Why Choose Us"
        subtitle="We combine technical excellence with business acumen to deliver solutions that truly make a difference."
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {whyItems.map(({ title, desc }) => (
          <motion.div
            key={title}
            variants={slideInFromBottom}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all duration-300 group"
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 group-hover:bg-primary-500/40 flex items-center justify-center mb-4 transition-colors duration-300">
              <motion.div
                className="w-3 h-3 rounded-full bg-primary-400"
                whileHover={{ scale: 1.3 }}
              />
            </div>
            <h3 className="font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Spire Infotech – Innovative Software Solutions</title>
        <meta
          name="description"
          content="Spire Infotech delivers custom ERP, web and mobile software solutions for businesses across India and globally."
        />
        <meta
          property="og:title"
          content="Spire Infotech – Innovative Software Solutions"
        />
        <meta
          property="og:description"
          content="Custom ERP, web & mobile development for modern businesses."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Technologies />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
