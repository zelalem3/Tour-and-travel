import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient'; 
import { MapPin, Calendar, ArrowRight, ChevronLeft, Share2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import './DestinationDetail.css';

const DestinationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const query = `*[_type == "destination" && slug.current == $slug][0]{
      name,
      location,
      description,
      bestTimeToVisit,
      mainImage,
      "relatedTours": relatedTours[]->{
        title,
        "slug": slug.current, 
        price,
        duration,
        mainImage
      }
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
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ repeat: Infinity, duration: 1 }} 
        className="loading-text"
      >
        MAPPING THE ROUTE...
      </motion.div>
    </div>
  );

  if (!destination) return <div className="loading-screen">Destination not found.</div>;

  return (
    <div className="destination-page">
      {/* Scroll Progress Bar */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Toast */}
      <div className={`toast ${showToast ? 'show' : ''}`}>
        <Check size={16} className="toast-icon" />
        <span>LINK SECURED</span>
      </div>

      {/* Hero Section */}
      <div className="dest-hero">
        <div className="hero-controls">
          <button className="control-btn" onClick={() => navigate(-1)}><ChevronLeft size={24} /></button>
          <button className="control-btn" onClick={handleShare}><Share2 size={20} /></button>
        </div>
        
        {destination.mainImage && (
          <img src={urlFor(destination.mainImage).url()} alt="" className="dest-hero-image" />
        )}
        
        <div className="dest-hero-overlay">
          <div className="dest-hero-content">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-location-badge"
            >
              <MapPin size={14} /> {destination.location}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="dest-hero-title"
            >
              {destination.name.split(' ').map((word, i) => (
                <span key={i} className={i === destination.name.split(' ').length - 1 ? "highlight" : ""}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="dest-main">
        <div className="dest-grid">
          
          <div className="dest-left">
            <section className="dest-section">
              <span className="section-label">The Narrative</span>
              <p className="dest-description">{destination.description}</p>
            </section>

            <section className="season-box">
              <div className="calendar-icon-wrapper">
                <Calendar size={32} />
              </div>
              <div className="season-text">
                <span className="season-label">Ideal Season</span>
                <p>{destination.bestTimeToVisit}</p>
              </div>
            </section>
          </div>

          <aside className="dest-right">
            <div className="curation-card">
              <h3 className="curation-title">Curated <span className="highlight">Expeditions</span></h3>
              <div className="tours-stack">
                {destination.relatedTours?.length > 0 ? (
                  destination.relatedTours.map((tour, i) => (
                    <Link key={i} to={`/tours/${tour.slug}`} className="related-tour-item">
                      <div className="tour-thumb">
                        {tour.mainImage && <img src={urlFor(tour.mainImage).width(150).url()} alt="" />}
                      </div>
                      <div className="tour-meta">
                        <h4>{tour.title}</h4>
                        <div className="tour-stats">
                          <span className="price">${tour.price}</span>
                          <span className="divider">/</span>
                          <span className="duration">{tour.duration}</span>
                        </div>
                      </div>
                      <ArrowRight size={16} className="tour-arrow" />
                    </Link>
                  ))
                ) : (
                  <p className="no-tours">Custom routes available upon request.</p>
                )}
              </div>

              <Link to="/contact" className="dest-inquiry-btn">
                <span>Private Inquiry</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default DestinationDetail;