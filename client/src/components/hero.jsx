import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-viewport">
      {/* 1. Background Image Container */}
      <div className="hero-background-container">
        <img
          src="https://t4.ftcdn.net/jpg/01/35/16/37/360_F_135163711_hRXMeVFwA20ddhBUFE9yiyirf7MhPWpw.jpg"
          alt="Ethiopian Landscape"
          className="hero-image-media interactive-zoom"
        />
        {/* Overlays for readability and branding */}
        <div className="overlay-vignette"></div>
        <div className="overlay-texture-grid"></div>
      </div>

      {/* 2. Content Container */}
      <div className="hero-content hero-entrance-animation">
        <span className="hero-subtitle">Discover the Cradle of Humanity</span>
        
        <h1 className="hero-title">
          Where <span className="highlight">History</span><br />
          Meets Adventure
        </h1>
        
        <p className="hero-text">
          Experience authentic journeys through Ethiopia's ancient wonders, 
          dramatic landscapes, and vibrant cultures.
        </p>
        
        <div className="hero-actions">
          <a href="#tours" className="hero-btn-primary">
            <span>Explore Tours Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;