"use client";

import React, { useEffect, useRef } from "react";
import NeuralBrainHero from "@/components/NeuralBrainHero";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {

  const heroRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (!heroRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=1200",
        scrub: true,
        pin: true
      }
    });

    /* Zoom neural background */
    tl.to(heroRef.current, {
      scale: 1.35,
      ease: "none"
    });

    /* Fade hero text */
    tl.to(textRef.current, {
      opacity: 0,
      y: -80,
      ease: "none"
    }, 0);

    /* Darken background */
    tl.to(overlayRef.current, {
      opacity: 0.7,
      ease: "none"
    }, 0);

    /* Reveal about section */
    tl.to("#about", {
      opacity: 1,
      y: 0,
      ease: "none"
    });

  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
    >

      {/* Neural Background */}
      <div className="absolute inset-0 z-0">
        <NeuralBrainHero />
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-10"
      />

      {/* Hero Content */}
      <div className="relative z-20 h-full flex items-center">

        <div
          ref={textRef}
          className="max-w-7xl mx-auto w-full px-10 grid md:grid-cols-2 items-center"
        >

          <div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-white font-bold text-[clamp(3rem,6vw,5rem)] leading-tight"
            >
              <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]">
                SPIRE
              </span>
              <br />
              INFOTECH
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="mt-6 text-gray-300 text-lg max-w-xl"
            >
              Every great technology begins with a human idea.
              We build intelligent software systems that empower
              businesses to scale and innovate in the digital age.
            </motion.p>

            <div className="mt-8 flex gap-4">

              <a
                href="#contact"
                className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
              >
                Get Started
              </a>

              <a
                href="#about"
                className="px-6 py-3 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
              >
                Learn More
              </a>

            </div>

          </div>

          <div />

        </div>

      </div>

    </section>
  );
};

export default HeroSection;