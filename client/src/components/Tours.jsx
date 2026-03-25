import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { client, urlFor } from '../sanityClient'; 
import { motion, AnimatePresence } from 'framer-motion'; 

// Refined Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1] // Smooth out-expo easing
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Tours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "tour"] | order(_createdAt asc)';
    client.fetch(query)
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#020617' }}>
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.98, 1, 0.98] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fbbf24', letterSpacing: '4px' }}
        >
          LOADING TOURS...
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '100px 20px', 
      backgroundColor: '#020617', 
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
    }}>
      
      {/* Header - Repeats on Scroll */}
      <motion.header 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // ✅ once: false makes it repeat
        variants={fadeInUp}
        className="section-header"
        style={{ marginBottom: '60px' }}
      >
        <h2 className="title" style={{ textAlign: 'center' }}>
          Our Most Popular <span style={{ color: '#fbbf24' }}>Tours</span>
        </h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ height: '4px', background: '#fbbf24', margin: '20px auto', borderRadius: '10px' }}
        ></motion.div>
      </motion.header>

      {/* Grid - Staggered items repeat on scroll */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }} // ✅ Triggers when 10% of the grid is visible
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          maxWidth: '1300px',
          margin: '0 auto'
        }}
      >
        {tours.map((tour) => (
          <motion.div
            key={tour._id}
            variants={fadeInUp}
            whileHover={{ 
              y: -15, 
              transition: { duration: 0.4, ease: "easeOut" } 
            }}
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '32px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #1e293b',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
          >
            {/* Image Section */}
            <Link to={`/tours/${tour.slug?.current}`} style={{ overflow: 'hidden', display: 'block' }}>
              <div style={{ height: '280px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                {tour.mainImage ? (
                  <motion.img
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.8 }}
                    src={urlFor(tour.mainImage).width(600).height(400).url()}
                    alt={tour.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#1e293b' }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, transparent)' }}></div>
              </div>
            </Link>

            {/* Content Section */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ffffff', marginBottom: '12px' }}>
                {tour.title}
              </h2>
              
              <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.8', marginBottom: '30px', flexGrow: 1 }}>
                {tour.description ? tour.description.substring(0, 100) + "..." : "Explore the beauty of Ethiopia."}
              </p>

              <div style={{ 
                marginTop: 'auto', 
                paddingTop: '24px', 
                borderTop: '1px solid #1e293b', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: '800', textTransform: 'uppercase' }}>Price</span>
                  <span style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff', display: 'block' }}>
                    ${tour.price}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(251, 191, 36, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    backgroundColor: '#fbbf24',
                    color: '#020617',
                    padding: '16px 28px',
                    borderRadius: '16px',
                    fontWeight: '900',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                  onClick={() => navigate("/contact", { state: { tour: tour.title } })}
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}