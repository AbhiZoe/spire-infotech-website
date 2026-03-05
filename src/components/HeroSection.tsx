import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const headlineRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];

        const createParticles = () => {
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 5 + 1,
                    color: 'rgba(255, 255, 255, 0.8)',
                });
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
            requestAnimationFrame(animateParticles);
        };

        createParticles();
        animateParticles();

        gsap.fromTo(headlineRef.current, { scale: 1, rotation: 0 }, {
            scale: 2.5,
            rotation: 360,
            scrollTrigger: {
                trigger: headlineRef.current,
                start: 'top 80%',
                end: 'top 30%',
                scrub: true,
            },
        });

        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, []);

    return (
        <section className="hero-section">
            <canvas ref={canvasRef} className="particles-canvas"></canvas>
            <div className="gradient-overlay"></div>
            <h1 ref={headlineRef} className="headline">Every great technology begins with a human idea that refuses to stay grounded.</h1>
            <h2 className="subtitle">Subtitle goes here</h2>
            <div className="cta-buttons">
                <button className="cta-button">Call to Action 1</button>
                <button className="cta-button">Call to Action 2</button>
            </div>
        </section>
    );
};

export default HeroSection;