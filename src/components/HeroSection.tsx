import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
    const headlineRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (headlineRef.current) {
            gsap.fromTo(headlineRef.current, 
                { scale: 1, rotation: 0 }, 
                { scale: 2.5, rotation: 360, 
                    scrollTrigger: {
                        trigger: headlineRef.current,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: true,
                        pin: true,
                    },
                }
            );
        }
    }, []);

    return (
        <section className="hero-section w-full min-h-screen flex items-center justify-center bg-gray-900">
            <div className="relative z-10 text-center">
                <h1 className="headline text-white font-black text-6xl leading-tight" ref={headlineRef} style={{
                    textRendering: 'geometricPrecision',
                    WebkitFontSmoothing: 'antialiased',
                    willChange: 'transform',
                }}>
                    Every great technology begins with a human idea that refuses to stay grounded.
                </h1>
                <button className="mt-8 px-8 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors">
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default HeroSection;