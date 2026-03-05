import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const heroRef = useRef(null);
    const particleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(heroRef.current, {
                scale: 1.1,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                },
            });

            // Particle animation
            const particles = particleRef.current;
            // Add your particle animation logic here
        });

        return () => ctx.revert();
    }, []);

    return (
        <div ref={heroRef} style={{ position: 'relative', overflow: 'hidden', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div ref={particleRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {/* Add your particle background here */}
            </div>
            <h1 style={{ zIndex: 1 }}>Welcome to Our Website</h1>
        </div>
    );
};

export default HeroSection;