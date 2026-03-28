import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  Clock, MapPin, Users, ArrowLeft, 
  Sparkles, Compass, Globe, ShieldCheck
} from "lucide-react";
import "./tourdetail.css";

const TourDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- SCROLL TO TOP LOGIC ---
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading, slug]);

  // --- DATA FETCHING WITH METADATA ---
  useEffect(() => {
    // Optimized Query: Fetching asset metadata for LQIP placeholders
    const query = `*[ _type == "tour" && slug.current == $slug ][0] {
      ...,
      "mainImage": mainImage.asset-> {
        ...,
        metadata {
          lqip,
          dimensions
        }
      }
    }`;

    client.fetch(query, { slug })
      .then((data) => { 
        setTour(data); 
        setLoading(false); 
      })
      .catch((err) => { 
        console.error("Sanity Fetch Error:", err); 
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

  if (loading) return (
    <div className="loading-screen flex items-center justify-center min-h-screen bg-[#020617]">
      <motion.div 
        animate={{ opacity: [0.4, 1, 0.4], letterSpacing: ["0.4em", "0.6em", "0.4em"] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-[#fbbf24] font-black uppercase text-xs"
      >
        Mapping Expedition...
      </motion.div>
    </div>
  );

  if (!tour) return <div className="error-screen text-white p-20 text-center">Tour Not Found</div>;

  return (
    <div className="tour-wrapper bg-[#020617] text-white min-h-screen">
      
      <Helmet>
        <title>{`${tour.title} | TravelEthiopia`}</title>
        <meta name="description" content={tour.description?.substring(0, 160)} />
        {/* Optimized Social Media Image */}
        {tour.mainImage && (
          <meta 
            property="og:image" 
            content={urlFor(tour.mainImage).width(1200).height(630).auto('format').url()} 
          />
        )}
      </Helmet>

      {/* FLOATING BACK BUTTON */}
      <button 
        onClick={() => navigate(-1)} 
        className="fixed top-4 left-4 md:top-8 md:left-8 z-50 p-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hover:border-[#fbbf24]/50 transition-all group"
      >
        <ArrowLeft size={22} className="text-white group-hover:text-[#fbbf24] transition-colors" />
      </button>

      {/* HERO SECTION WITH OPTIMIZED IMAGE */}
      <section className="hero-container relative h-[70vh] overflow-hidden">
        <div 
          className="hero-image-wrapper absolute inset-0 bg-no-repeat bg-cover"
          style={{
            // Shows the blurred version immediately
            backgroundImage: `url(${tour.mainImage?.metadata?.lqip})`,
          }}
        >
          {tour.mainImage && (
            <img
              // CDN optimization: width 1600 + auto format + high priority
              src={urlFor(tour.mainImage).width(1600).auto('format').quality(80).url()}
              className="hero-img w-full h-full object-cover"
              alt={tour.title}
              fetchpriority="high" 
            />
          )}
          <div className="hero-gradient-overlay absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-black/20" />
        </div>

        <div className="hero-content-inner absolute bottom-20 left-4 md:left-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <span className="hero-badge flex items-center gap-2 text-[#fbbf24] font-bold text-sm tracking-widest uppercase mb-4">
              <Sparkles size={14} /> Official Expedition Portfolio
            </span>
            <h1 className="hero-title text-4xl md:text-7xl font-black uppercase leading-none">
              {tour.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="tour-main-content container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="content-left lg:col-span-2">
          
          {/* STATS STRIP */}
          <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Clock, val: tour.duration, label: "Duration" },
              { icon: Users, val: tour.groupSize || 'Private', label: "Expedition Party" },
              { icon: MapPin, val: tour.location, label: "Territory" },
              { icon: Compass, val: "Professional", label: "Guide Grade" },
            ].map((stat, i) => (
              <motion.div key={i} variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="stat-card p-6 bg-white/5 border border-white/10 rounded-2xl">
                <stat.icon size={20} className="text-[#fbbf24] mb-4" />
                <p className="stat-val font-bold text-xl">{stat.val}</p>
                <p className="stat-label text-gray-400 text-sm uppercase tracking-tighter">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* THE NARRATIVE */}
          <motion.section variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="narrative-section mb-16">
            <h2 className="section-heading flex items-center gap-4 text-3xl font-bold mb-8">
              <div className="heading-line w-12 h-1 bg-[#fbbf24]" /> 
              The <span className="text-[#fbbf24]">Narrative</span>
            </h2>
            <div className="narrative-text text-gray-300 leading-relaxed text-lg space-y-4">
              {tour.description}
            </div>
          </motion.section>
        </div>

        {/* BOOKING ASIDE */}
        <aside className="content-right">
          <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="booking-card-wrapper sticky top-28">
            <div className="booking-card relative overflow-hidden p-8 bg-[#fbbf24] text-[#020617] rounded-3xl shadow-2xl shadow-[#fbbf24]/10">
              <div className="price-display flex items-baseline gap-2 mb-6">
                <span className="price-amount text-6xl font-black">${tour.price}</span>
                <span className="price-currency font-bold">/ USD</span>
              </div>
              <Link 
                to="/contact" 
                state={{ tour: tour.title }}
                className="booking-btn block w-full py-5 text-center bg-[#020617] text-white font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all"
              >
                Reserve Departure
              </Link>
            </div>
          </motion.div>
        </aside>
      </main>
    </div>
  );
};

export default TourDetail;