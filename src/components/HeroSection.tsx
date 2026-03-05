import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroSection = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section', // the section that triggers the animation
        start: 'top top', // when the top of the trigger hits the top of the viewport
        end: '+=2000', // total scroll distance before the trigger ends
        pin: true, // pin the section during the animation
        scrub: 1, // smooth scrubbing, takes 1 second to catch up to the scrollbar
      }
    });

    tl.to('.headline', {
      fontSize: '20vw', // zoom to 20vw
      duration: 1, // duration for the zoom effect
    });

    return () => {
      ScrollTrigger.kill(); // clean up when the component unmounts
    };
  }, []);

  return (
    <section className="hero-section">
      <h1 className="headline" style={{ fontSize: '4rem' }}>
        Your Headline Here
      </h1>
    </section>
  );
};

export default HeroSection;