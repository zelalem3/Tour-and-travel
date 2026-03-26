import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { client, urlFor } from '../sanityClient'; 
import { motion } from 'framer-motion'; 

// 1. Zipper Slide Variants
const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? -100 : 100, // Even cards from left, odd from right
    rotate: i % 2 === 0 ? -5 : 5,  // Slight tilt while sliding
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      duration: 1
    }
  },
  hover: {
    y: -15,
    scale: 1.02,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function Tours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "tour"] | order(_createdAt asc)';
    client.fetch(query).then((data) => {
      setTours(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="text-[#fbbf24] font-black tracking-widest text-xs">
        LOADING EXPEDITIONS...
      </motion.div>
    </div>
  );

  return (
    <div style={{ padding: '120px 20px', backgroundColor: '#020617', minHeight: '100vh', overflowX: 'hidden' }}>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: '50px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {tours.map((tour, i) => (
          <motion.div
            key={tour._id}
            custom={i} // Pass the index to the variant for the L/R logic
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: false, amount: 0.1 }}
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '48px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.03)',
              position: 'relative',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              cursor: 'pointer'
            }}
          >
            {/* Image Section */}
            <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                transition={{ duration: 0.8 }} 
                style={{ height: '100%', width: '100%' }}
              >
                {tour.mainImage && (
                  <img
                    src={urlFor(tour.mainImage).width(800).url()}
                    alt={tour.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, transparent)' }} />
            </div>

            {/* Content Section */}
            <div style={{ padding: '40px' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff', marginBottom: '10px', letterSpacing: '-1px' }}>
                {tour.title}
              </h3>
              
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '30px' }}>
                {tour.description ? tour.description.substring(0, 100) + "..." : "A masterclass in exploration."}
              </p>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderTop: '1px solid rgba(255,255,255,0.05)', 
                paddingTop: '30px' 
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#ffffff' }}>${tour.price}</span>
                  <span style={{ fontSize: '10px', color: '#fbbf24', fontWeight: 'bold', textTransform: 'uppercase' }}>Per Person</span>
                </div>
                
                <button
                  onClick={() => navigate(`/tours/${tour.slug?.current}`)}
                  style={{
                    backgroundColor: '#fbbf24',
                    color: '#020617',
                    padding: '16px 32px',
                    borderRadius: '24px',
                    fontWeight: '900',
                    border: 'none',
                    fontSize: '12px',
                    letterSpacing: '1px',
                    boxShadow: '0 10px 20px rgba(251,191,36,0.1)'
                  }}
                >
                  VIEW MISSION
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}