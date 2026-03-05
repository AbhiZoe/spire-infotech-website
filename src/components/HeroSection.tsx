"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleCanvas from "@/components/ParticleCanvas";

gsap.registerPlugin(ScrollTrigger);

const ORBS = [
  {
    className:
      "absolute top-1/4 -left-16 w-72 h-72 rounded-full opacity-20 blur-3xl",
    style: { background: "radial-gradient(circle, #1fc7c7 0%, transparent 70%)" },
  },
  {
    className:
      "absolute bottom-1/4 -right-16 w-80 h-80 rounded-full opacity-15 blur-3xl",
    style: { background: "radial-gradient(circle, #0e6262 0%, transparent 70%)" },
  },
  {
    className:
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl",
    style: { background: "radial-gradient(circle, #2c535e 0%, transparent 70%)" },
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3400",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Step 1: cinematic zoom
      tl.to(headlineRef.current, {
        scale: 14,
        transformOrigin: "center center",
        ease: "none",
      });

      // Step 2: dissolve into particles
      tl.to(
        headlineRef.current,
        {
          opacity: 0,
          filter: "blur(12px)",
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Step 3: particle expansion (illusion of text dissolving)
      tl.to(
        particlesRef.current,
        {
          scale: 1.4,
          opacity: 1,
          ease: "none",
        },
        "-=0.3"
      );

      // Step 4: background depth
      tl.to(
        bgRef.current,
        {
          scale: 0.8,
          opacity: 0.3,
          ease: "none",
        },
        0
      );

      // Step 5: reveal next section
      tl.to(
        "#about",
        {
          opacity: 1,
          y: 0,
          ease: "none",
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen overflow-hidden flex items-center justify-center text-center"
      style={{ perspective: "1600px" }}
    >
      {/* Particle background */}
      <div
        ref={particlesRef}
        className="absolute inset-0 -z-10 hero-background opacity-70"
      >
        <ParticleCanvas />
      </div>

      {/* Floating gradient orbs */}
      {ORBS.map((orb, i) => (
        <div key={i} className={orb.className} style={orb.style} />
      ))}

      {/* Hero content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl px-6"
      >
        <motion.p
          variants={fadeUp}
          className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-6"
        >
          Welcome to Spire Infotech
        </motion.p>

        <motion.h1
          ref={headlineRef}
          variants={fadeUp}
          className="hero-headline font-bold leading-tight text-white text-[clamp(3rem,8vw,6rem)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          Every great technology begins with a{" "}
          <span className="text-cyan-400">human idea</span> that refuses to stay
          grounded.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          We craft innovative software solutions — from custom ERP systems to
          web and mobile applications — that empower businesses to grow, adapt,
          and lead in the digital age.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
          >
            Get Started
          </a>

          <a
            href="#about"
            className="px-6 py-3 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
          >
            Learn More
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 text-gray-400 text-sm animate-bounce">
        ↓ Scroll
      </div>
    </section>
  );
};

export default HeroSection;