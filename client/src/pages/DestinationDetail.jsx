import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient'; 
import { MapPin, Calendar, ArrowRight, ChevronLeft, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './DestinationDetail.css';
import { Helmet } from 'react-helmet-async';

const DestinationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // --- ANIMATION VARIANTS ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  useEffect(() => {
    const query = `*[_type == "destination" && slug.current == $slug][0]{
      name, location, description, bestTimeToVisit, mainImage,
      "relatedTours": relatedTours[]->{ title, "slug": slug.current, price, duration, mainImage }
    }`;

    client.fetch(query, { slug })
      .then((data) => {
        setDestination(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const updateScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (loading) return (
    <div className="loading-screen">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} 
        transition={{ repeat: Infinity, duration: 2 }} 
        className="loading-text"
      >
        MAPPING THE ROUTE...
      </motion.div>
    </div>
  );

  if (!destination) return <div className="loading-screen">DESTINATION NOT FOUND</div>;

  return (
    <div className="destination-page">
      <Helmet>
      <title>{`${destination.name} | TravelEthiopia`}</title>
      <meta 
        name="description" 
        content={`Discover ${destination.name} in ${destination.location}. ${destination.description?.substring(0, 150)}...`} 
      />
      
      {/* Open Graph (Social Media) */}
      <meta property="og:title" content={`${destination.name} - Explore Ethiopia`} />
      <meta property="og:description" content={`Plan your visit to ${destination.name}. Best time to visit: ${destination.bestTimeToVisit}.`} />
      {destination.mainImage && (
        <meta property="og:image" content={urlFor(destination.mainImage).width(1200).url()} />
      )}
      <link rel="canonical" href={`https://travelethiopia.com/destinations/${slug}`} />
    </Helmet>
      {/* Scroll Progress Bar */}
      <div className="progress-bar">
        <motion.div 
            className="progress" 
            style={{ width: `${scrollProgress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
        ></motion.div>
      </div>

      {/* Toast Notification with AnimatePresence */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="toast show"
          >
            <Check size={16} />
            <span>LINK COPIED TO CLIPBOARD</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <div className="dest-hero">
        <div className="hero-controls">
          <motion.button 
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="control-btn" onClick={() => navigate(-1)}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="control-btn" onClick={handleShare}
          >
            <Share2 size={20} />
          </motion.button>
        </div>
        
        {destination.mainImage && (
          <motion.img 
            initial={{ scale: 1.2, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={urlFor(destination.mainImage).url()} 
            alt={destination.name} 
            className="dest-hero-image" 
          />
        )}
        
        <div className="dest-hero-overlay">
          <div className="dest-hero-content">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="hero-location-badge"
            >
              <MapPin size={14} /> {destination.location}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 50, skewY: 7 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="dest-hero-title"
            >
              {destination.name}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT WRAPPER */}
      <main className="dest-main">
        <div className="dest-grid">
          
          {/* NARRATIVE SECTION */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="dest-left"
          >
            <motion.section variants={fadeInUp} className="dest-section">
              <span className="section-label">The Narrative</span>
              <p className="dest-description">{destination.description}</p>
            </motion.section>

            <motion.section variants={fadeInUp} className="season-box">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="calendar-icon-wrapper"
              >
                <Calendar size={28} />
              </motion.div>
              <div className="season-text">
                <span className="season-label">Ideal Season</span>
                <p>{destination.bestTimeToVisit}</p>
              </div>
            </motion.section>
          </motion.div>

          {/* RELATED TOURS SECTION */}
          <section className="dest-right">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="curation-title"
            >
              Curated <span className="highlight">Expeditions</span>
            </motion.h3>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="tours-stack"
            >
              {destination.relatedTours?.length > 0 ? (
                destination.relatedTours.map((tour, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <Link to={`/tours/${tour.slug}`} className="related-tour-item">
                      <div className="tour-thumb">
                        {tour.mainImage && (
                          <img src={urlFor(tour.mainImage).width(200).url()} alt={tour.title} />
                        )}
                      </div>
                      <div className="tour-meta">
                        <h4>{tour.title}</h4>
                        <div className="tour-stats">
                          <span className="price">${tour.price}</span>
                          <span className="divider">•</span>
                          <span className="duration">{tour.duration}</span>
                        </div>
                      </div>
                      <ArrowRight size={18} className="tour-arrow" />
                    </Link>
                  </motion.div>
                ))
              ) : (
                <p className="no-tours">Custom itineraries available upon private request.</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/contact" className="dest-inquiry-btn">
                <motion.span
                  whileHover={{ x: 5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                    Start Private Inquiry <ArrowRight size={20} />
                </motion.span>
              </Link>
            </motion.div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default DestinationDetail;