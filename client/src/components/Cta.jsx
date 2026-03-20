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

        <a href="mailto:info@travelethiopia.com" className="cta-button">
          Contact Us Now
          <span className="cta-arrow">→</span>
        </a>
      </div>
    </section>
  );
};

export default Cta;