import React, { useEffect, useState } from 'react';
import './Destinations.css';
import { client } from '../sanityClient';
import { motion } from 'framer-motion';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const query = `*[_type == "destination"]{
      name,
      "desc": description,
      "img": mainImage.asset->url,
      "slug": slug.current
    }`;

    client.fetch(query)
      .then((data) => {
        setDestinations(data);
      })
      .catch((err) => console.error("Sanity error:", err));
  }, []);

  // --- HEADER ANIMATIONS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  // --- NEW SLUG RENDER EFFECT ---
  const slugRenderVariant = {
    hidden: { 
      opacity: 0, 
      x: 40, 
      letterSpacing: "1.5em", 
      filter: "blur(12px)" 
    },
    show: { 
      opacity: 1, 
      x: 0, 
      letterSpacing: "0.3em", 
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for "sliding into place"
        delay: 0.4 
      }
    }
  };

  return (
    <section id="destinations" className="dest-section font-inter">
      <div className="dest-container">
        
        <header className="dest-header">
          <motion.h2 
            className="dest-title font-black uppercase italic"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
          >
            <span className="word-wrapper">
              {"Explore".split("").map((char, i) => (
                <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </span>

            <span className="word-wrapper font-playfair gold-text normal-case">
              {"Ethiopia".split("").map((char, i) => (
                <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="dest-subtitle font-light tracking-wide"
          >
            Curated territories for the modern explorer.
          </motion.p>
        </header>

        {/* DUAL GRID */}
        <div className="dest-dual-grid">
          {destinations.map((dest, i) => (
            <motion.a
              href={`/destinations/${dest.slug}`}
              key={i}
              className="dest-item-card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
            >
              <div className="dest-img-container">
                {dest.img && (
                  <img src={dest.img} alt={dest.name} className="dest-parallax-img" />
                )}
                <div className="dest-content-overlay">
                  <div className="dest-text-box">
                    
                    {/* THE SLUG EFFECT: Renders from side on scroll */}
                    <motion.span 
                      variants={slugRenderVariant}
                      className="dest-slug-tag font-bold font-inter"
                    >
                      {dest.slug}
                    </motion.span>

                    <h3 className="dest-display-name font-black font-inter italic uppercase">
                      {dest.name}
                    </h3>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.6 }}
                      transition={{ delay: 1 }}
                      className="dest-link-action font-bold uppercase text-[10px] tracking-widest"
                    >
                      Explore Territory →
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;