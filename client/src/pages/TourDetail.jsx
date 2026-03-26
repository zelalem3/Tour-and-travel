import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import { motion } from "framer-motion";
import { 
  Clock, MapPin, Users, CheckCircle, ArrowLeft, 
  Sparkles, Compass, Globe, ShieldCheck
} from "lucide-react";
import "./tourdetail.css";

const TourDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // ANIMATION VARIANTS
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
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-[#fbbf24] font-black tracking-[0.5em] text-xs uppercase"
      >
        Mapping Expedition...
      </motion.div>
    </div>
  );

  if (!tour) return <div className="text-white bg-[#020617] h-screen flex items-center justify-center font-black uppercase tracking-widest">Tour Not Found</div>;

  return (
    <div className="bg-[#020617] min-h-screen selection:bg-[#fbbf24] selection:text-black antialiased overflow-x-hidden">
      
      {/* 1. FLOATING BACK BUTTON */}
      <button 
        onClick={() => navigate(-1)} 
        className="fixed top-4 left-4 md:top-8 md:left-8 z-50 p-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hover:border-[#fbbf24]/50 transition-all group"
      >
        <ArrowLeft size={22} className="text-white group-hover:text-[#fbbf24] transition-colors" />
      </button>

      {/* 2. HERO SECTION */}
      <section className="relative h-[70vh] md:h-[95vh] flex items-end overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }} 
          animate={{ scale: 1, opacity: 0.5 }} 
          transition={{ duration: 2.5, ease: "circOut" }}
          className="absolute inset-0"
        >
          {tour.mainImage && (
            <img
              src={urlFor(tour.mainImage).width(2000).url()}
              className="w-full h-full object-cover object-center"
              alt={tour.title}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 md:pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="flex items-center gap-3 text-[#fbbf24] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6">
              <Sparkles size={14} /> Official Expedition Portfolio
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mb-8 uppercase italic">
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
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
        
        <div className="lg:col-span-7 space-y-24 md:space-y-48">
          
          {/* STATS STRIP */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Clock, val: tour.duration, label: "Duration" },
              { icon: Users, val: tour.groupSize || 'Private', label: "Expedition Party" },
              { icon: MapPin, val: tour.location, label: "Territory" },
              { icon: Compass, val: "Professional", label: "Guide Grade" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                variants={slideInLeft}
                className="bg-white/[0.03] border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md hover:border-[#fbbf24]/30 transition-colors"
              >
                <stat.icon size={20} className="text-[#fbbf24] mb-4" />
                <p className="text-xl font-black text-white">{stat.val}</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* THE NARRATIVE */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={slideInLeft}
            className="space-y-10"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white flex items-center gap-6">
              <div className="w-12 md:w-20 h-[3px] bg-[#fbbf24]" /> 
              The <span className="highlight font-serif italic lowercase text-6xl">Narrative</span>
            </h2>
            <div className="text-lg md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl">
              {tour.description}
            </div>
          </motion.section>

          {/* MISSION MANIFEST */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={slideInLeft}
            className="space-y-10"
          >
            <h2 className="text-xl md:text-2xl font-black text-[#fbbf24] uppercase tracking-[0.4em] border-b border-white/10 pb-6">
              Mission Inclusions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.includes?.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                    <span className="text-white text-base md:text-lg font-medium">{item}</span>
                    <ShieldCheck size={20} className="text-[#fbbf24]" />
                </div>
                ))}
            </div>
          </motion.section>
        </div>

        {/* BOOKING ASIDE */}
        <aside className="lg:col-span-5">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={slideInRight}
            className="sticky top-32 bg-[#fbbf24] p-[1.5px] rounded-[3.5rem] shadow-[0_0_60px_rgba(251,191,36,0.1)]"
          >
            <div className="bg-[#020617] rounded-[3.4rem] p-10 md:p-14 overflow-hidden relative">
              <div className="absolute -top-12 -right-12 opacity-5 pointer-events-none">
                <Globe size={240} color="white" />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-10 bg-[#fbbf24]" />
                <span className="text-xs uppercase tracking-[0.6em] text-[#fbbf24] font-black">Project Value</span>
              </div>

              <div className="mb-12 flex items-baseline gap-3">
                <span className="text-8xl md:text-9xl font-black text-white tracking-tighter italic">${tour.price}</span>
                <span className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">/ USD</span>
              </div>

              <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">
                Pricing includes all permits, professional logistics, and private expedition management for your journey.
              </p>

              <button className="w-full bg-[#fbbf24] hover:bg-white text-[#020617] font-black py-7 rounded-3xl uppercase tracking-[0.4em] text-xs transition-all shadow-xl active:scale-95">
                Reserve Departure
              </button>
            </div>
          </motion.div>
        </aside>
      </main>
    </div>
  );
};

export default TourDetail;