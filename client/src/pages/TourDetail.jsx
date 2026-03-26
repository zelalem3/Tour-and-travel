import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import { motion } from "framer-motion";
import { 
  Clock, MapPin, Users, ArrowLeft, 
  Sparkles, Compass, Globe, ShieldCheck
} from "lucide-react";
import "./tourdetail.css";
import {Link} from "react-router-dom";

const TourDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
    // Only scroll to top once loading is finished
    if (!loading) {
      // Use a double-frame delay to ensure React has painted the new height
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
          });
        });
      });
    }
  }, [loading, slug]); // Trigger whenever loading finishes or slug changes

 
  useEffect(() => {
    const query = `*[ _type == "tour" && slug.current == $slug ][0]`;
    client.fetch(query, { slug })
      .then((data) => { 
        setTour(data); 
        setLoading(false); 
      })
      .catch((err) => { 
        console.error(err); 
        setLoading(false); 
      });
  }, [slug]);

  // --- ANIMATION VARIANTS ---
  const slideInLeft = {
    hidden: { opacity: 0, x: -60, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  if (loading) return (
    <div className="loading-screen">
      <motion.div 
        animate={{ opacity: [0.4, 1, 0.4], letterSpacing: ["0.4em", "0.6em", "0.4em"] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-[#fbbf24] font-black uppercase text-xs"
      >
        Mapping Expedition...
      </motion.div>
    </div>
  );

  if (!tour) return <div className="error-screen">Tour Not Found</div>;

  return (
    <div className="tour-wrapper">
      
      {/* 1. FLOATING BACK BUTTON */}
      <button 
        onClick={() => navigate(-1)} 
        className="fixed top-4 left-4 md:top-8 md:left-8 z-50 p-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hover:border-[#fbbf24]/50 transition-all group"
      >
        <ArrowLeft size={22} className="text-white group-hover:text-[#fbbf24] transition-colors" />
      </button>

      {/* 2. HERO SECTION */}
      <section className="hero-container">
        <div className="hero-image-wrapper">
          {tour.mainImage && (
            <img
              src={urlFor(tour.mainImage).width(2000).url()}
              className="hero-img"
              alt={tour.title}
            />
          )}
          <div className="hero-gradient-overlay" />
        </div>

        <div className="hero-content-inner">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.span 
              animate={{ opacity: [0.7, 1, 0.7], y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="hero-badge"
            >
              <Sparkles size={14} /> Official Expedition Portfolio
            </motion.span>
            
            <h1 className="hero-title">
              {tour.title?.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-outline-gold" : "text-white"}>
                  {word}<br className="hidden md:block" />
                </span>
              ))}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 3. CONTENT AREA */}
      <main className="tour-main-content">
        
        <div className="content-left">
          
          {/* STATS STRIP - once: false makes it repeat on scroll */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="stats-grid"
          >
            {[
              { icon: Clock, val: tour.duration, label: "Duration" },
              { icon: Users, val: tour.groupSize || 'Private', label: "Expedition Party" },
              { icon: MapPin, val: tour.location, label: "Territory" },
              { icon: Compass, val: "Professional", label: "Guide Grade" },
            ].map((stat, i) => (
              <motion.div key={i} variants={slideInLeft} className="stat-card">
                <stat.icon size={20} className="text-[#fbbf24] mb-4" />
                <p className="stat-val">{stat.val}</p>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* THE NARRATIVE */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={slideInLeft}
            className="narrative-section"
          >
            <h2 className="section-heading">
              <div className="heading-line" /> 
              The <span className="narrative-highlight">Narrative</span>
            </h2>
            <div className="narrative-text">
              {tour.description}
            </div>
          </motion.section>

          {/* MISSION MANIFEST */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={slideInLeft}
            className="manifest-section"
          >
            <h2 className="manifest-title">Mission Inclusions</h2>
            <div className="manifest-grid">
                {tour.includes?.map((item, i) => (
                <div key={i} className="manifest-item">
                    <span className="manifest-text">{item}</span>
                    <ShieldCheck size={20} className="text-[#fbbf24]" />
                </div>
                ))}
            </div>
          </motion.section>
        </div>

        {/* BOOKING ASIDE */}
        <aside className="content-right">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={slideInRight}
            className="booking-card-wrapper"
          >
            <div className="booking-card">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                className="globe-bg"
              >
                <Globe size={240} color="white" />
              </motion.div>

              <div className="price-label-group">
                <div className="price-line" />
                <span className="price-tag">Project Value</span>
              </div>

              <div className="price-display">
                <span className="price-amount">${tour.price}</span>
                <span className="price-currency">/ USD</span>
              </div>

              <p className="booking-disclaimer">
                Pricing includes all permits, professional logistics, and private expedition management.
              </p>

            <motion.div 
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="w-full" // Added to ensure the link spans the card width
>
  <Link to="/contact" className="booking-btn block text-center no-underline">
    Reserve Departure
  </Link>
</motion.div>
            </div>
          </motion.div>
        </aside>
      </main>
    </div>
  );
};

export default TourDetail;