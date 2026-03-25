import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { client, urlFor } from '../sanityClient'; 
import { motion } from 'framer-motion'; 

const fadeInUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 }, // Reduced y for mobile smoothness
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5, // Faster duration for snappier mobile feel
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Faster stagger for mobile
    }
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

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#020617' }}>
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fbbf24', letterSpacing: '3px' }}
        >
          LOADING...
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '60px 15px', // Reduced padding for mobile
      backgroundColor: '#020617', 
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
    }}>
      
      {/* Header */}
      <motion.header 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
        style={{ marginBottom: '40px', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: '900', color: '#ffffff' }}>
          Our Best <span style={{ color: '#fbbf24' }}>Tours</span>
        </h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 50 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          style={{ height: '3px', background: '#fbbf24', margin: '15px auto', borderRadius: '10px' }}
        ></motion.div>
      </motion.header>

      {/* Grid - CSS Grid handles the responsive columns */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05 }}
        style={{
          display: 'grid',
          // Mobile: 1 col | Tablet: 2 cols | Desktop: 3 cols
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '25px', // Tighter gap for mobile
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {tours.map((tour) => (
          <motion.div
            key={tour._id}
            variants={fadeInUp}
            whileTap={{ scale: 0.98 }} // Haptic feedback for touch
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '24px', // Slightly smaller radius for mobile
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #1e293b',
            }}
          >
            {/* Image */}
            <Link to={`/tours/${tour.slug?.current}`} style={{ display: 'block', overflow: 'hidden' }}>
              <div style={{ height: '220px', width: '100%', position: 'relative' }}>
                {tour.mainImage && (
                  <img
                    src={urlFor(tour.mainImage).width(500).height(350).url()}
                    alt={tour.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, transparent)' }}></div>
              </div>
            </Link>

            {/* Content */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginBottom: '10px' }}>
                {tour.title}
              </h3>
              
              <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '20px' }}>
                {tour.description ? tour.description.substring(0, 80) + "..." : "Explore Ethiopia."}
              </p>

              <div style={{ 
                marginTop: 'auto', 
                paddingTop: '20px', 
                borderTop: '1px solid #1e293b', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: '#fbbf24', fontWeight: 'bold', textTransform: 'uppercase' }}>Price</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#ffffff', display: 'block' }}>
                    ${tour.price}
                  </span>
                </div>

                <button
                  style={{
                    backgroundColor: '#fbbf24',
                    color: '#020617',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    border: 'none',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase'
                  }}
                  onClick={() => navigate("/contact", { state: { tour: tour.title } })}
                >
                  Book
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}