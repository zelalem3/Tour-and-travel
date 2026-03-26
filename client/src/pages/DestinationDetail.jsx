import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient'; 
import { MapPin, Calendar, ArrowRight, ChevronLeft, Share2, Check } from 'lucide-react';
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
      <div className="loading-text">Exploring...</div>
    </div>
  );

  if (!destination) return <div className="loading-screen">Not found.</div>;

  return (
    <div className="destination-page">

      {/* Scroll Progress Bar */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Toast */}
      <div className={`toast ${showToast ? 'show' : ''}`}>
        <Check size={16} className="toast-icon" />
        <span>Link Secured</span>
      </div>

      {/* Hero */}
      <div className="hero-section">
        <div className="hero-controls">
          <button onClick={() => navigate(-1)}><ChevronLeft size={24} /></button>
          <button onClick={handleShare}><Share2 size={20} /></button>
        </div>
        {destination.mainImage && (
          <img src={urlFor(destination.mainImage).url()} alt="" className="hero-image" />
        )}
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-location">
              <MapPin size={14} /> {destination.location}
            </div>
            <h1 className="hero-title">{destination.name}</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="main-content">
        <section className="description-section">
          <div className="section-header">The Narrative</div>
          <p className="description">{destination.description}</p>
        </section>

        <section className="season-section">
          <div className="calendar-box">
            <Calendar size={40} />
          </div>
          <div>
            <h4>Ideal Season</h4>
            <p>{destination.bestTimeToVisit}</p>
          </div>
        </section>

        {/* Curation moved below content */}
        <section className="curation-section">
          <h3>Curated Tours</h3>
          <div className="tours-list">
            {destination.relatedTours?.length > 0 ? (
              destination.relatedTours.map((tour, i) => (
                <Link key={i} to={`/tours/${tour.slug}`} className="tour-card">
                  <div className="tour-img">
                    {tour.mainImage && <img src={urlFor(tour.mainImage).width(200).url()} alt="" />}
                  </div>
                  <div className="tour-info">
                    <h4>{tour.title}</h4>
                    <p>${tour.price} — {tour.duration}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-tours">No tours linked yet</p>
            )}
          </div>

          <Link to="/contact" className="inquiry-btn">
            Private Inquiry <ArrowRight size={18} />
          </Link>
        </section>
      </main>
    </div>
  );
};

export default DestinationDetail;