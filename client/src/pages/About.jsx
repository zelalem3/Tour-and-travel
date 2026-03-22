import React, { useEffect } from "react";
import "./About.css";

const About = () => {
  // Ensure the page starts at the top when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* --- Section 1: Hero Header --- */}
      <section className="about-hero">
        <div className="about-hero-content animate-fade-in">
          <span className="subtitle">Our Story</span>
          <h1 className="title">
            Preserving the Soul of <span className="highlight">Ethiopia</span>
          </h1>
          <p className="description max-w-2xl mx-auto px-4 text-lg text-gray-300">
            We are more than a travel agency. We are storytellers, mountain guides, 
            and keepers of ancient history.
          </p>
        </div>
      </section>

      {/* --- Section 2: Our Mission --- */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-text animate-fade-in">
              <h2 className="section-title">Why We Do What We Do</h2>
              <p>
                Founded in the heart of Addis Ababa, our mission is to provide 
                authentic, sustainable, and transformative travel experiences. 
                We believe that Ethiopia is not just a destination—it is a 
                journey back to the roots of humanity.
              </p>
              <p>
                From the jagged peaks of the Simien Mountains to the spiritual 
                quietude of Lalibela, we ensure every traveler leaves with a 
                piece of Ethiopia in their heart.
              </p>
              
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-num">10+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">500+</span>
                  <span className="stat-label">Guided Tours</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">100%</span>
                  <span className="stat-label">Local Guides</span>
                </div>
              </div>
            </div>
            
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1523438097201-512ae7d59c44?auto=format&fit=crop&w=800" 
                alt="Ethiopian Landscape" 
                className="rounded-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 3: Values --- */}
      <section className="values-section">
        <div className="container text-center">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="icon">🌍</div>
              <h3>Authenticity</h3>
              <p>No tourist traps. We take you to the real Ethiopia, meeting the real people.</p>
            </div>
            <div className="value-card">
              <div className="icon">🤝</div>
              <h3>Community</h3>
              <p>We work directly with local tribes and villages to ensure tourism benefits everyone.</p>
            </div>
            <div className="value-card">
              <div className="icon">🛡️</div>
              <h3>Safety First</h3>
              <p>Expert guides and 24/7 support to ensure your adventure is as safe as it is exciting.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;