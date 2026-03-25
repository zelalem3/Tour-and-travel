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

  // 1. Slug Tracking Animation (The unique one you asked for)
  const slugVariant = {
    hidden: { 
      opacity: 0, 
      letterSpacing: "15px", // Start very wide
      filter: "blur(8px)",
      x: 20 
    },
    show: { 
      opacity: 1, 
      letterSpacing: "2px", // Squeeze into normal spacing
      filter: "blur(0px)",
      x: 0,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        delay: 0.4 // Appears slightly after the card pops
      }
    }
  };

  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 }
    }
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="destinations" className="dest-section" style={{ overflow: 'hidden', background: '#020617' }}>
      <div className="dest-container">
        
        {/* Header Section */}
        <div className="dest-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.h2 
            className="dest-title"
            variants={titleContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
          >
            {"Top Destinations in Ethiopia".split("").map((char, index) => (
              <motion.span key={index} variants={letterVariant} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                <span style={{ color: index > 18 ? '#fbbf24' : 'white' }}>{char}</span>
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5 }}
            className="dest-subtitle"
            style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '10px' }}
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
          style={{ display: 'grid', gap: '24px' }}
        >
          {destinations.map((dest, i) => (
            <motion.a
              href={dest.link}
              key={i}
              variants={cardVariants}
              className={`dest-card ${dest.gridSpan}`}
              whileHover={{ y: -8 }}
              style={{ display: 'block', textDecoration: 'none', borderRadius: '24px', overflow: 'hidden' }}
            >
              <div className="dest-image-wrapper" style={{ position: 'relative', height: '400px' }}>
                {dest.img ? (
                  <motion.img
                    src={dest.img}
                    alt={dest.name}
                    className="dest-img"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: "#1e293b" }} />
                )}

                <div className="dest-overlay" style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.95), transparent)' }}>
                  <div className="dest-info">
                    <h3 className="dest-name" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{dest.name}</h3>
                    
                    {/* ✅ UNIQUE SLUG ANIMATION HERE */}
                    <motion.p 
                      variants={slugVariant}
                      className="dest-desc" 
                      style={{ 
                        color: '#fbbf24', 
                        fontSize: '0.8rem', 
                        textTransform: 'uppercase', 
                        fontWeight: '700' 
                      }}
                    >
                      {dest.slug}
                    </motion.p>

                    <motion.span 
                      className="dest-btn"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.6 }}
                      style={{ color: 'white', borderBottom: '1px solid #fbbf24', paddingBottom: '2px', marginTop: '15px', display: 'inline-block' }}
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