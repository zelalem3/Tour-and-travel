import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const cards = [
    {
      icon: "🌍",
      title: "Local Experts",
      description: "Real Ethiopian guides who were born here and love showing you both famous landmarks and secret places most tourists never see."
    },
    {
      icon: "🛡️",
      title: "Safe & Responsible",
      description: "Sustainable practices that protect Ethiopia’s nature, plus 24/7 support. We handle the logistics so you can focus on the journey."
    },
    {
      icon: "💰",
      title: "Best Possible Value",
      description: "Transparent pricing with no hidden fees. Tailor-made journeys designed to maximize your budget for truly unforgettable moments."
    }
  ];

  return (
    <section className="why-section" id="why-us">
      {/* Decorative background elements */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="container">
        <header className="section-header">
          <span className="badge">The Ethiopian Experience</span>
          <h2 className="title">Why Travelers <span>Love Us</span></h2>
          <div className="underline"></div>
        </header>

        <div className="card-grid">
          {cards.map((card, index) => (
            <div key={index} className="why-card">
              <div className="icon-wrapper">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-text">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;