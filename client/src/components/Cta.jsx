import React from "react";
import "./cta.css"; // We will create this file next

const Cta = () => {
  return (
    <section id="contact" className="cta-section">
      {/* Background Glows */}
      <div className="cta-glow glow-1"></div>
      <div className="cta-glow glow-2"></div>
      
      <div className="cta-container">
        <span className="cta-label">Adventure Awaits</span>
        
        <h2 className="cta-heading">
          Ready to Explore <br />
          <span className="cta-gradient-text">Ethiopia?</span>
        </h2>
        
        <p className="cta-description">
          From the ancient obelisks of Aksum to the colorful markets of Addis Ababa, 
          start your journey with the local experts.
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

export default Cta;