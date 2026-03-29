import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  Clock, MapPin, Users, ArrowLeft, 
  Sparkles, Compass, Globe, ShieldCheck, Share2, Check
} from "lucide-react";
import "./tourdetail.css";

const TourDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  // --- SCROLL TO TOP LOGIC ---
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading, slug]);

  useEffect(() => {
   const query = `*[ _type == "tour" && slug.current == $slug ][0] {
    ...,
    "location": destination->location, 
    "destinationName": destination->name,
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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

  // Optimized Share Variables
  const shareUrl = `https://travelethiopia.com/tours/${slug}`;
  const shareImg = tour.mainImage ? urlFor(tour.mainImage).width(1200).height(630).url() : "";
  const shareDesc = `Join our ${tour.duration} expedition through ${tour.location}. Professional guides, private logistics, and authentic cultural immersion for $${tour.price}.`;

  const tourSchema = {
    "@context": "https://schema.org/",
    "@type": "Product", // Changed to Product for better Price Snippets
    "name": tour.title,
    "description": tour.description,
    "image": shareImg,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": tour.price,
      "availability": "https://schema.org/InStock",
      "url": shareUrl
    }
  };

  return (
    <div className="tour-wrapper bg-[#020617] text-white min-h-screen">
      <Helmet>
        <title>{`${tour.title} | Travel Ethiopia`}</title>
        <meta name="description" content={shareDesc} />
        <link rel="canonical" href={shareUrl} />
        
        {/* Open Graph / Social Media Preview */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${tour.title} - Official Expedition`} />
        <meta property="og:description" content={shareDesc} />
        <meta property="og:image" content={shareImg} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:site_name" content="Travel Ethiopia" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={shareImg} />
        
        <script type="application/ld+json">
          {JSON.stringify(tourSchema)}
        </script>
      </Helmet>

      {/* Copy Link Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-[#fbbf24] text-[#020617] px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-2xl"
          >
            <Check size={18} /> Link Copied for Sharing
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="hero-container relative h-[80vh] overflow-hidden">
        <div className="hero-controls absolute top-10 left-4 md:left-20 z-50 flex gap-4">
          <button onClick={() => navigate(-1)} className="p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 hover:bg-[#fbbf24] hover:text-[#020617] transition-all">
            <ArrowLeft size={20} />
          </button>
          <button onClick={handleShare} className="p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 hover:bg-[#fbbf24] hover:text-[#020617] transition-all">
            <Share2 size={20} />
          </button>
        </div>

        <div className="hero-image-wrapper absolute inset-0">
          <div 
            className="absolute inset-0 z-0"
            style={{ backgroundImage: `url(${tour.mainImage?.metadata?.lqip})`, backgroundSize: 'cover', filter: 'blur(20px)' }}
          />
          {tour.mainImage && (
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
              src={urlFor(tour.mainImage).width(1600).auto('format').url()}
              className="relative z-10 w-full h-full object-cover opacity-80"
              alt={tour.title}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-black/40 z-20" />
        </div>

        <div className="hero-content-inner absolute bottom-20 left-4 md:left-20 z-30">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <span className="flex items-center gap-2 text-[#fbbf24] font-bold text-xs tracking-widest uppercase mb-4">
              <Sparkles size={14} /> Expedition Portfolio
            </span>
            <h1 className="text-5xl md:text-8xl font-black uppercase leading-tight">
              {tour.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Clock, val: tour.duration, label: "Duration" },
              { icon: Users, val: tour.groupSize || 'Private', label: "Expedition Party" },
              { icon: MapPin, val: tour.location, label: "Territory" },
              { icon: Compass, val: "Expert", label: "Guide Grade" },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#fbbf24]/50 transition-colors">
                <stat.icon size={20} className="text-[#fbbf24] mb-4" />
                <p className="font-bold text-lg">{stat.val}</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#fbbf24]"></span> The Narrative
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{tour.description}</p>
          </section>

          <section className="bg-white/5 p-10 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-8 uppercase tracking-widest text-[#fbbf24]">Expedition Inclusions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tour.includes?.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                  <span className="text-sm font-medium text-gray-200">{item}</span>
                  <ShieldCheck size={18} className="text-[#fbbf24]" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --- BOOKING ASIDE --- */}
        <aside>
          <div className="sticky top-28 bg-[#fbbf24] text-[#020617] p-8 rounded-3xl shadow-[0_20px_50px_rgba(251,191,36,0.2)]">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-black">${tour.price}</span>
              <span className="text-sm font-bold uppercase opacity-60">/ Person</span>
            </div>
            <p className="text-sm font-medium mb-8 leading-relaxed">
              Full logistics, permits, and private expedition management included.
            </p>
            
            <Link 
              to="/contact" 
              state={{ tour: tour.title }}
              className="block w-full py-5 bg-[#020617] text-white text-center font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Reserve Departure
            </Link>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
              <Globe size={12} /> Secure Global Booking
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default TourDetail;