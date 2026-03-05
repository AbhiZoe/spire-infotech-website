import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from 'react-tsparticles'; // Assuming you are using react-tsparticles

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    useEffect(() => {
        gsap.to('.headline', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
            scale: 2.5,
            rotation: 360,
            transformOrigin: 'center center',
            filter: 'blur(5px)', // Add blur on scale
        });
    }, []);

    return (
        <div className="hero">
            <Particles
                options={{
                    /* Particles configuration here */
                }}
            />
            <h1 className="headline">Epic Headline</h1>
            <div className="cta-buttons">
                <button className="cta-button">Call to Action 1</button>
                <button className="cta-button">Call to Action 2</button>
            </div>
        </div>
    );
};

export default HeroSection;