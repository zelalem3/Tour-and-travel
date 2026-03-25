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
        const formatted = data.map((item, i) => ({
          ...item,
          link: `/destinations/${item.slug}`,
          gridSpan: i % 4 === 0 ? "md:col-span-2 lg:col-span-3" : "md:col-span-1 lg:col-span-2"
        }));
        setDestinations(formatted);
      })
      .catch((err) => console.error("Sanity error:", err));
  }, []);

  // --- ANIMATION VARIANTS ---
  const slugVariant = {
    hidden: { opacity: 0, letterSpacing: "15px", filter: "blur(8px)", x: 20 },
    show: { 
      opacity: 1, letterSpacing: "2px", filter: "blur(0px)", x: 0,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.4 }
    }
  };

  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { 
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(8px)" },
    show: { 
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="destinations" className="dest-section">
      <div className="dest-container">
        
        {/* Header Section */}
        <div className="dest-header">
          <motion.h2 
            className="dest-title"
            variants={titleContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
          >
            {"Top Destinations in Ethiopia".split(" ").map((word, wordIndex) => (
              /* Wrap each word in a span to prevent it from breaking mid-word */
              <span key={wordIndex} className="word-wrapper">
                {word.split("").map((char, charIndex) => (
                  <motion.span 
                    key={charIndex} 
                    variants={letterVariant} 
                    style={{ 
                      display: 'inline-block',
                      color: wordIndex === 3 ? '#fbbf24' : 'white' 
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                {/* Add a space after each word except the last one */}
                <span style={{ display: 'inline-block' }}>&nbsp;</span>
              </span>
            ))}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5 }}
            className="dest-subtitle"
          >
            Explore the most breathtaking corners of the Horn of Africa.
          </motion.p>
        </div>

        {/* The Grid */}
        <motion.div
          className="dest-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          {destinations.map((dest, i) => (
            <motion.a
              href={dest.link}
              key={i}
              variants={cardVariants}
              className={`dest-card ${dest.gridSpan}`}
              whileHover={{ y: -8 }}
            >
              <div className="dest-image-wrapper">
                {dest.img ? (
                  <motion.img
                    src={dest.img}
                    alt={dest.name}
                    className="dest-img"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  />
                ) : (
                  <div className="dest-img-placeholder" />
                )}

                <div className="dest-overlay">
                  <div className="dest-info">
                    <h3 className="dest-name">{dest.name}</h3>
                    
                    <motion.p variants={slugVariant} className="dest-desc-slug">
                      {dest.slug}
                    </motion.p>

                    <motion.span 
                      className="dest-btn-link"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      View Details →
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Destinations;