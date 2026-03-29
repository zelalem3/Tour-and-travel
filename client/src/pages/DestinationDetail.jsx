import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient'; 
import { MapPin, Calendar, ArrowRight, ChevronLeft, Share2, Check, Compass } from 'lucide-react';
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
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [toursLoaded, setToursLoaded] = useState({});

  useEffect(() => {
    const query = `*[_type == "destination" && slug.current == $slug][0]{
      name, location, description, bestTimeToVisit, 
      "mainImage": mainImage.asset->{
        _id,
        url,
        metadata { lqip }
      },
      "relatedTours": relatedTours[]->{ 
        title, 
        "slug": slug.current, 
        price, 
        duration, 
        "mainImage": mainImage.asset->{
          _id,
          url,
          metadata { lqip }
        } 
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
    <motion.div 
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 0.8 } }}
      className="flex flex-col items-center justify-center min-h-screen bg-[#020617] gap-[30px]"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="text-[#fbbf24] flex items-center justify-center"
      >
        <Compass size={64} strokeWidth={1} />
      </motion.div>
      <div className="text-center">
        <motion.div 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-[0.75rem] font-[900] text-[#fbbf24] tracking-[6px] uppercase mb-[10px]"
        >
          Expedition Intelligence
        </motion.div>
        <div className="text-2xl font-bold text-white tracking-widest relative">
          MAPPING YOUR <span className="text-[#fbbf24]">ROUTE...</span>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="h-[2px] bg-[#fbbf24] mt-2 shadow-[0_0_10px_#fbbf24]"
          />
        </div>
      </div>
    </motion.div>
  );

  if (!destination) return <div className="loading-screen">DESTINATION NOT FOUND</div>;

  // SEO Optimization Helpers
  const seoTitle = `${destination.name}: Expedition Guide | Travel Ethiopia`;
  const seoDesc = `Explore the majesty of ${destination.name} in ${destination.location}. Best visited during ${destination.bestTimeToVisit}, this destination offers ${destination.description?.substring(0, 80)}...`;
  const shareImg = destination.mainImage ? urlFor(destination.mainImage).width(1200).height(630).url() : "";

  return (
    <div className="destination-page bg-[#020617]">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        
        {/* Social Media - Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:image" content={shareImg} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        
        <link rel="canonical" href={`https://travelethiopia.com/destinations/${slug}`} />
      </Helmet>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100]">
        <motion.div 
            className="h-full bg-[#fbbf24] shadow-[0_0_10px_#fbbf24]" 
            style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#fbbf24] text-[#020617] px-6 py-3 rounded-full font-black z-[200] flex items-center gap-2"
          >
            <Check size={16} /> LINK COPIED
          </motion.div>
        )}
      </AnimatePresence>

      <div className="dest-hero h-[80vh] relative overflow-hidden">
        <div className="hero-controls absolute top-10 left-4 md:left-20 z-50 flex gap-4">
          <button className="p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 text-white" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <button className="p-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 text-white" onClick={handleShare}>
            <Share2 size={20} />
          </button>
        </div>
        
        {destination.mainImage && (
          <div className="absolute inset-0">
             <div 
              style={{ 
                backgroundImage: `url(${destination.mainImage.metadata.lqip})`,
                backgroundSize: 'cover',
                filter: 'blur(30px)',
                position: 'absolute',
                inset: 0,
                opacity: heroLoaded ? 0 : 1,
                transition: 'opacity 1s ease'
              }}
            />
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: heroLoaded ? 1 : 1.1, opacity: heroLoaded ? 1 : 0 }}
              transition={{ duration: 1.2 }}
              onLoad={() => setHeroLoaded(true)}
              src={urlFor(destination.mainImage).url()} 
              alt={destination.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-black/20" />
          </div>
        )}
        
        <div className="absolute bottom-20 left-4 md:left-20 z-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-2 text-[#fbbf24] text-sm font-black uppercase tracking-widest mb-4">
            <MapPin size={14} /> {destination.location}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white uppercase leading-none"
          >
            {destination.name}
          </motion.h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <span className="text-[#fbbf24] text-xs font-black uppercase tracking-[0.3em] block mb-4">The Narrative</span>
              <p className="text-gray-300 text-lg leading-relaxed">{destination.description}</p>
            </section>

            <section className="bg-white/5 p-8 rounded-3xl border border-white/10 flex items-center gap-6">
              <div className="p-4 bg-[#fbbf24] rounded-2xl text-[#020617]">
                <Calendar size={32} />
              </div>
              <div>
                <span className="text-gray-500 text-xs font-black uppercase tracking-widest">Ideal Season</span>
                <p className="text-white text-xl font-bold">{destination.bestTimeToVisit}</p>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <h3 className="text-2xl font-black text-white uppercase mb-8">
              Curated <span className="text-[#fbbf24]">Expeditions</span>
            </h3>
            
            <div className="flex flex-col gap-4 mb-10">
              {destination.relatedTours?.map((tour, i) => (
                <Link key={i} to={`/tours/${tour.slug}`} className="group flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-[#fbbf24]/50 transition-all">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-900 flex-shrink-0">
                    <img src={urlFor(tour.mainImage).width(100).url()} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-white font-bold text-sm leading-tight mb-1">{tour.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-tighter">
                      <span className="text-[#fbbf24]">${tour.price}</span>
                      <span>•</span>
                      <span>{tour.duration}</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-600 group-hover:text-[#fbbf24] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>

            <Link to="/contact" className="block w-full py-5 bg-[#fbbf24] text-[#020617] text-center rounded-2xl font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all">
              Start Private Inquiry
            </Link>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DestinationDetail;