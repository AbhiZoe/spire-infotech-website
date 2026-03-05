import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleCanvas from "@/components/ParticleCanvas";

gsap.registerPlugin(ScrollTrigger);

const ORBS = [
  {
    className:
      "absolute top-1/4 -left-16 w-72 h-72 rounded-full opacity-20 animate-morph-blob blur-3xl",
    style: { background: "radial-gradient(circle, #1fc7c7 0%, transparent 70%)" },
  },
  {
    className:
      "absolute bottom-1/4 -right-16 w-80 h-80 rounded-full opacity-15 animate-morph-blob blur-3xl",
    style: {
      background: "radial-gradient(circle, #0e6262 0%, transparent 70%)",
      animationDelay: "-4s",
    },
  },
  {
    className:
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 animate-morph-blob blur-3xl",
    style: {
      background: "radial-gradient(circle, #2c535e 0%, transparent 70%)",
      animationDelay: "-2s",
    },
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom animation: font-size 4rem → 20vw as user scrolls down
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          fontSize: "20vw",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Fade out the whole content block on scroll
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "20% top",
            end: "70% top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="hero-section">
      {/* Particle background */}
      <div className="hero-background" aria-hidden="true">
        <ParticleCanvas />
      </div>

      {/* Floating orbs */}
      {ORBS.map((orb, i) => (
        <div key={i} className={orb.className} style={orb.style} aria-hidden="true" />
      ))}

      {/* Hero content */}
      <div ref={contentRef} className="hero-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtitle badge */}
          <motion.p
            variants={fadeUp}
            className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-6"
          >
            Welcome to Spire Infotech
          </motion.p>

          {/* Main headline – GSAP will animate font-size on scroll */}
          <motion.h1
            ref={headlineRef}
            variants={fadeUp}
            className="hero-headline"
          >
            Every great technology begins with a{" "}
            <span className="text-gradient">human idea</span> that refuses to
            stay grounded.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We craft innovative software solutions — from custom ERP systems to
            web and mobile applications — that empower businesses to grow,
            adapt, and lead in the digital age.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <a href="#contact" className="btn-primary">
              Get Started
            </a>
            <a href="#about" className="btn-secondary">
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span className="scroll-arrow">&#8595;</span>
      </div>
    </section>
  );
};

export default HeroSection;