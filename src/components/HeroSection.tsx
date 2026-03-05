"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NetworkHeroCanvas from "@/components/NetworkHeroCanvas";

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {

  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const [converge, setConverge] = useState(false);
  const [formLogo, setFormLogo] = useState(false);

  useEffect(() => {

    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=700",
        scrub: 0.35,
        pin: true
      }
    });

    tl.call(() => setConverge(true));

    tl.call(() => setFormLogo(true));

    tl.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1 }
    );

    tl.to("#about", { opacity: 1, y: 0 });

  }, []);

  return (
    <section
  ref={sectionRef}
  className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden"
>

  {/* NETWORK BACKGROUND */}
 <div className="absolute inset-0 w-full h-full z-0">
  <NetworkHeroCanvas converge={converge} formLogo={formLogo} />
</div>

  {/* CONTENT */}
  <div className="relative z-10 px-6 max-w-4xl">

    <motion.h1
      ref={titleRef}
      className="text-white font-bold text-[clamp(3rem,7vw,5rem)]"
    >
      <span className="text-cyan-400">SPIRE</span> INFOTECH
    </motion.h1>

    <motion.p className="mt-6 text-gray-300 text-lg">
      Every great technology begins with a human idea.
    </motion.p>

  </div>

</section> 
  );
};

export default HeroSection;