import React, { useEffect, useState, useRef } from 'react';
import './Destinations.css';
import { client } from '../sanityClient';
import { motion, useScroll, useTransform } from 'framer-motion';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const query = `*[_type == "destination" && Priority == 1] | order(_createdAt asc) {
      name,
      "desc": description,
      "slug": slug.current,
      "mainImage": mainImage.asset->{
        _id,
        url,
        metadata { lqip }
      }
    }`;
    client.fetch(query).then(setDestinations).catch(console.error);
  }, []);

  // 1. Scroll Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // 2. Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const imageVariants = {
    initial: { scale: 1.2 }, // Base scale for parallax room
    hover: { 
      scale: 1.4, 
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } 
    }
  };

  return (
    <section id="destinations" ref={containerRef} className="dest-section">
      <div className="dest-container">
        <header className="dest-header">
          <h2 className="dest-title">Explore Ethiopia</h2>
        </header>

        <div className="dest-dual-grid">
          {destinations.map((dest) => (
            <motion.a
              href={`/destinations/${dest.slug}`}
              key={dest.slug}
              className="dest-item-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              whileHover="hover" // This triggers 'hover' on all motion children
              viewport={{ once: true }}
            >
              <div className="dest-img-container">
                {/* LQIP Blur Layer */}
                <div 
                  className="blur-up-layer"
                  style={{ 
                    backgroundImage: `url(${dest.mainImage?.metadata?.lqip})`,
                    opacity: loadedImages[dest.slug] ? 0 : 1
                  }}
                />

                {dest.mainImage && (
                  <motion.img 
                    variants={imageVariants}
                    style={{ y: yParallax }} // Combines Scroll (y) and Hover (scale)
                    src={`${dest.mainImage.url}?w=1200&q=80&auto=format`} 
                    alt={dest.name} 
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [dest.slug]: true }))}
                    className="dest-parallax-img" 
                  />
                )}
                
                <div className="dest-content-overlay">
                  <div className="dest-text-box">
                    <span className="dest-slug-tag">/ {dest.slug}</span>
                    <h3 className="dest-display-name">{dest.name}</h3>
                    <div className="dest-link-action">Explore Territory →</div>
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