import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import { motion } from "framer-motion";
import { 
  Clock, MapPin, Users, CheckCircle, ArrowLeft, 
  ShieldCheck, Info, Sparkles, Compass, Globe
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
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
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
    <div className="bg-[#020617] min-h-screen selection:bg-[#fbbf24] selection:text-black antialiased overflow-x-hidden mt-0 pt-0">
      
      {/* 1. FLOATING BACK BUTTON */}
      <button 
        onClick={() => navigate(-1)} 
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hover:border-[#fbbf24]/50 transition-all group"
      >
        <ArrowLeft size={20} className="text-white group-hover:text-[#fbbf24] transition-colors" />
      </button>

      {/* 2. HERO SECTION (This only happens once on load) */}
      <section className="relative h-[65vh] md:h-[90vh] flex items-end overflow-hidden mt-0 pt-0">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }} 
          animate={{ scale: 1, opacity: 0.6 }} 
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 top-0"
        >
          {tour.mainImage && (
            <img
              src={urlFor(tour.mainImage).width(2000).url()}
              className="w-full h-full object-cover object-top md:object-center"
              alt={tour.title}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-8 md:pb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="flex items-center gap-2 text-[#fbbf24] font-black tracking-[0.3em] uppercase text-[10px] mb-4">
              <Sparkles size={12} /> Expedition Portfolio
            </span>
            <h1 className="text-4xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-6 uppercase italic">
              {tour.title?.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-outline-gold" : "text-white"}>{word} </span>
              ))}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 3. CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
        
        <div className="lg:col-span-7 space-y-20 md:space-y-40">
          
          {/* STATS: Repeats on Scroll */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }} // once: false makes it repeat
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {[
              { icon: Clock, val: tour.duration, label: "Days" },
              { icon: Users, val: tour.groupSize || 'Private', label: "Party" },
              { icon: MapPin, val: tour.location, label: "Territory" },
              { icon: Compass, val: "Expert", label: "Guide" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                variants={slideInLeft}
                className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl backdrop-blur-sm"
              >
                <stat.icon size={18} className="text-[#fbbf24] mb-3" />
                <p className="text-lg font-black text-white">{stat.val}</p>
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* DESCRIPTION: Repeats on Scroll */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideInLeft}
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-4xl font-black text-white flex items-center gap-4">
              <div className="w-8 md:w-12 h-[2px] bg-[#fbbf24]" /> The Experience
            </h2>
            <div className="text-base md:text-xl text-slate-300 font-light leading-relaxed">
              {tour.description}
            </div>
          </motion.section>

          {/* INCLUSIONS: Repeats on Scroll */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={slideInLeft}
            className="space-y-8"
          >
            <h2 className="text-xl md:text-2xl font-black text-[#fbbf24] uppercase tracking-[0.3em] border-b border-white/10 pb-4">
              Mission Manifest
            </h2>
            <div className="space-y-3">
                {tour.includes?.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 md:p-6 rounded-2xl bg-white/[0.02] border-l-2 border-[#fbbf24]/20">
                    <span className="text-white text-sm md:text-lg font-light">{item}</span>
                    <CheckCircle size={18} className="text-[#fbbf24] opacity-20" />
                </div>
                ))}
            </div>
          </motion.section>
        </div>

        {/* BOOKING ASIDE: Repeats on Scroll */}
        <aside className="lg:col-span-5">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={slideInRight}
            className="sticky top-20 md:top-24 bg-[#fbbf24] p-[1px] rounded-[2.5rem] md:rounded-[3rem]"
          >
            <div className="bg-[#020617] rounded-[2.4rem] md:rounded-[2.8rem] p-8 md:p-12 overflow-hidden relative">
              <div className="absolute -top-10 -right-10 opacity-10 rotate-12 pointer-events-none">
                <Globe size={200} color="white" />
              </div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="h-[1px] w-8 bg-[#fbbf24]" />
                <span className="text-[12px] uppercase tracking-[0.5em] text-[#fbbf24] font-black">Investment</span>
              </div>

              <div className="mb-10 flex items-baseline gap-2 relative z-10">
                <span className="text-7xl md:text-8xl font-black text-white tracking-tighter italic">${tour.price}</span>
                <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">/ USD</span>
              </div>

              <button className="w-full relative z-10 bg-[#fbbf24] hover:bg-white text-[#020617] font-black py-6 rounded-2xl uppercase tracking-[0.3em] text-xs transition-all shadow-[0_0_30px_rgba(251,191,36,0.2)]">
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