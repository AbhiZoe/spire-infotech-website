import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSection.css'; // Assuming there is a CSS file for styles

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null); // Reference for particles orbs

    useEffect(() => {
        if (headlineRef.current) {
            gsap.fromTo(headlineRef.current,
                { scale: 1, rotation: 0 },
                {
                    scale: 2.5,
                    rotation: 360,
                    scrollTrigger: {
                        trigger: headlineRef.current,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: true,
                    }
                });
        }
    }, []);

    return (
        <div className="hero-section">
            <div className="particles" ref={particlesRef}>
                {/* Example for orbs or particle components */}
                <div className="orb"></div>
                <div className="orb"></div>
                <div className="orb"></div>
                {/* Add more orbs as needed */}
            </div>
            <h1 className="headline" ref={headlineRef}>
                Welcome to Our Website
            </h1>
            <button className="cta-button">Get Started</button>
        </div>
    );
};

export default HeroSection;
