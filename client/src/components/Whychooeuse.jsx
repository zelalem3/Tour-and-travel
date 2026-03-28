import React from 'react';
import './WhyChooseUs.css';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const cards = [
    { icon: "🌍", title: "Local Experts", description: "Real Ethiopian guides who were born here and love showing you secret places." },
    { icon: "🛡️", title: "Safe & Responsible", description: "Sustainable practices and 24/7 support. We handle the logistics." },
    { icon: "💰", title: "Best Possible Value", description: "Transparent pricing with no hidden fees. Tailor-made journeys." }
  ];

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVars = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const wordVars = {
    hidden: { opacity: 0, rotateX: -90, y: 20 },
    visible: { 
      opacity: 1, 
      rotateX: 0, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="why-section" id="why-us">
      {/* Background Blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="container">
        <header className="section-header highlight">
          <motion.h2 
            className="title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={containerVars}
          >
            {"Why Travelers Love Us".split(" ").map((word, i) => (
              <motion.span 
                key={i} 
                className="animate-word"
                variants={wordVars}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
              >
                {word === "Us" ? <span className="gold-accent">{word}</span> : word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="underline"
          />
        </header>

        <motion.div 
          className="card-grid highlight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={containerVars}
        >
          {cards.map((card, index) => (
            <motion.div 
              key={index} 
              className="why-card"
              variants={cardVars}
            >
              <div className="icon-wrapper">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-text">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;