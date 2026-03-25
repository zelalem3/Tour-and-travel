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
      .then((data) => { setTour(data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [slug]);

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

  if (!tour) return <div className="text-white bg-[#020617] h-screen flex items-center justify-center">Tour Not Found</div>;

  return (
    /* Forced dark theme styles added to the main container */
    <div 
      className="bg-[#020617] min-h-screen selection:bg-[#fbbf24] selection:text-black antialiased"
      style={{ colorScheme: 'dark', color: '#ffffff' }}
    >
      
      {/* 1. FLOATING BACK BUTTON */}
      <button 
        onClick={() => navigate(-1)} 
        className="fixed top-6 left-6 z-50 p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 hover:border-[#fbbf24]/50 transition-all group"
      >
        <ArrowLeft size={20} className="text-white group-hover:text-[#fbbf24] transition-colors" />
      </button>

      {/* 2. HERO SECTION */}
      <section className="relative h-[75vh] md:h-[90vh] flex items-end overflow-hidden pt-0 mt-0">
        <motion.div 
          initial={{ scale: 1.1 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0 top-0"
        >
          {tour.mainImage && (
            <img
              src={urlFor(tour.mainImage).width(2000).url()}
              className="w-full h-full object-cover opacity-60 object-top md:object-center"
              alt={tour.title}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <span className="flex items-center gap-2 text-[#fbbf24] font-black tracking-[0.3em] uppercase text-[10px] mb-4">
              <Sparkles size={12} /> Expedition Portfolio
            </span>
            <h1 className="text-4xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-6 uppercase italic">
              {tour.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-outline-gold" : "text-white"}>{word} </span>
              ))}
            </h1>
            <p className="text-base md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
              {tour.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
        
        <div className="lg:col-span-7 space-y-16 md:space-y-32">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: Clock, val: tour.duration, label: "Days" },
              { icon: Users, val: tour.groupSize || 'Private', label: "Party" },
              { icon: MapPin, val: tour.location, label: "Territory" },
              { icon: Compass, val: "Expert", label: "Guide" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl backdrop-blur-sm">
                <stat.icon size={18} className="text-[#fbbf24] mb-3" />
                <p className="text-lg font-black text-white">{stat.val}</p>
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <section className="space-y-8">
            <h2 className="text-2xl md:text-4xl font-black text-white flex items-center gap-4">
              <div className="w-8 md:w-12 h-[2px] bg-[#fbbf24]" /> The Experience
            </h2>
            <div className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              {tour.description}
            </div>
          </section>

          {/* Inclusions */}
          <section className="space-y-8">
            <h2 className="text-xl md:text-2xl font-black text-[#fbbf24] uppercase tracking-widest">Inclusions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tour.includes?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-slate-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

       {/* 4. BOOKING ASIDE */}
<aside className="lg:col-span-5">
  <div className="sticky top-24 bg-[#fbbf24] p-[1px] rounded-[2.5rem] md:rounded-[3rem]">
    {/* Explicitly set background and text color here */}
    <div className="bg-[#020617] rounded-[2.4rem] md:rounded-[2.8rem] p-8 md:p-12 overflow-hidden relative" style={{ backgroundColor: '#020617' }}>
      
      {/* Globe Background Icon */}
      <div className="absolute -top-10 -right-10 opacity-10 rotate-12 pointer-events-none">
        <Globe size={200} color="white" />
      </div>

      {/* "Investment" Label */}
      <span className="text-[9px] uppercase tracking-[0.4em] text-[#fbbf24] font-black block mb-4" style={{ color: '#fbbf24' }}>
        Investment
      </span>

      {/* Price Section */}
      <div className="mb-8 md:mb-12 flex items-baseline gap-2">
        <span className="text-6xl md:text-8xl font-black text-white tracking-tighter" style={{ color: '#ffffff' }}>
          ${tour.price}
        </span>
        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]" style={{ color: '#64748b' }}>
          / USD
        </span>
      </div>

      {/* Button - Text MUST be dark for contrast against yellow */}
      <button
        onClick={() => navigate("/contact", { state: { tour: tour.title } })}
        className="w-full py-5 bg-[#fbbf24] font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#fbbf24]/10"
        style={{ backgroundColor: '#fbbf24', color: '#020617' }}
      >
        Secure Passage
      </button>

      {/* Bottom Features */}
      <div className="mt-8 space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center gap-3">
          <ShieldCheck size={18} className="text-[#fbbf24]" style={{ color: '#fbbf24' }} />
          <span className="text-xs font-medium uppercase tracking-wider text-slate-300" style={{ color: '#cbd5e1' }}>
            Insured Expedition
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Info size={18} className="text-[#fbbf24]" style={{ color: '#fbbf24' }} />
          <span className="text-xs font-medium uppercase tracking-wider text-slate-300" style={{ color: '#cbd5e1' }}>
            Customizable Route
          </span>
        </div>
      </div>
    </div>
  </div>
</aside>
      </main>
    </div>
  );
};

export default TourDetail;