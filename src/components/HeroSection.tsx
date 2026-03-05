"use client";

import React, { useEffect, useRef } from "react";
import NeuralBrainHero from "@/components/NeuralBrainHero";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!heroRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=1500",
        scrub: true,
        pin: true
      }
    });

    /* STEP 1 — zoom network */
    tl.to(heroRef.current, {
      scale: 1.4,
      ease: "none"
    });

    /* STEP 2 — explode effect */
    tl.to(heroRef.current, {
      scale: 2,
      opacity: 0.4,
      ease: "none"
    });

    /* STEP 3 — reveal next section */
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

      {/* neural background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent z-10" >
        <NeuralBrainHero />
      </div>

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-10" />

      {/* text */}
      <div
        ref={contentRef}
        className="relative z-20 h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 w-full items-center">

          <div className="backdrop-blur-md bg-black/10 border border-white/10 p-10 rounded-2xl max-w-xl">

            <h1 className="text-white font-bold text-[clamp(3rem,6vw,5rem)]">
              <span className="text-cyan-400">SPIRE</span> INFOTECH
            </h1>

            <p className="mt-6 text-gray-300 text-lg max-w-xl">
              Every great technology begins with a human idea.
              We build intelligent software systems that empower
              businesses to scale and innovate in the digital age.
            </p>

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

        </div>
      </div>

    </section>
  );
};

export default HeroSection;