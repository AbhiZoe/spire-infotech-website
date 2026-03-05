// Code for HeroSection with cinematic zoom scroll animation

import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div className='hero-container'>
            <video src='/videos/hero-video.mp4' autoPlay loop muted />
            <h1>Welcome to Our Website</h1>
            <p>Experience cinematic zoom scroll!</p>
        </div>
    );
};

export default HeroSection;