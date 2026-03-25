import React from "react";
import "./cta.css"; 
import { motion } from "framer-motion";

const Cta = () => {
  // Variants for the heading "unsqueeze" effect
  const titleVariants = {
    hidden: { opacity: 0, letterSpacing: "-0.05em", y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      letterSpacing: "0em", 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="contact" className="cta-section" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Animated Background Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="cta-glow glow-1"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="cta-glow glow-2"
      ></motion.div>
      
      <div className="cta-container">
        {/* Label Slide In */}
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="cta-label"
        >
          Adventure Awaits
        </motion.span>
        
        {/* Heading with Reveal */}
        <motion.h2 
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.8 }}
          className="cta-heading"
        >
          Ready to Explore <br />
          <span className="cta-gradient-text">Ethiopia?</span>
        </motion.h2>
        
        {/* Description Fade */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4, duration: 1 }}
          className="cta-description"
        >
          From the ancient obelisks of Aksum to the colorful markets of Addis Ababa, 
          start your journey with the local experts.
        </motion.p>

        {/* Button with Pulse & Hover */}
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
        >
          <motion.a 
            href="#tours" 
            className="hero-btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // Subtle infinite pulse to draw the eye
            animate={{ 
              boxShadow: ["0px 0px 0px rgba(251,191,36,0)", "0px 0px 20px rgba(251,191,36,0.3)", "0px 0px 0px rgba(251,191,36,0)"] 
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span>Explore Tours Now</span>
            <motion.svg 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              xmlns="http://www.w3.org/2000/svg" 
              className="btn-icon" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;