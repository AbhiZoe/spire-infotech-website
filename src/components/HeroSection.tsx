import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

const HeroSection = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Replace ScrollTrigger.kill() with ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    const scrollTriggers = ScrollTrigger.getAll();
    scrollTriggers.forEach((trigger) => trigger.kill());

    return () => {
      scrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* Your hero section content */}
    </div>
  );
};

export default HeroSection;