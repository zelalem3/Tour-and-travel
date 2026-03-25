import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, MapPin, Users, CheckCircle, ArrowLeft, 
  ShieldCheck, Info, Calendar, Sparkles, Compass, Globe
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

  const handleBooking = () => {
    navigate("/contact", { state: { tour: tour?.title } });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-[#fbbf24] font-black tracking-[1em] text-xs uppercase"
      >
        Mapping the Expedition...
      </motion.div>
    </div>
  );

  if (!tour) return <div className="text-white bg-[#020617] h-screen flex items-center justify-center">Lost in the Highlands...</div>;

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen selection:bg-[#fbbf24] selection:text-black">
      
   
    
      {/* HERO SECTION - The Portal */}
      <section className="relative h-[90vh] flex items-end overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 10 }}
          className="absolute inset-0"
        >
          {tour.mainImage && (
            <img
              src={urlFor(tour.mainImage).width(2000).url()}
              className="w-full h-full object-cover opacity-60"
              alt={tour.title}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          >
            <span className="flex items-center gap-3 text-[#fbbf24] font-black tracking-[0.4em] uppercase text-[10px] mb-6">
              <Sparkles size={14} /> Official Expedition Portfolio
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-none tracking-tighter mb-8 italic">
              {tour.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-outline-gold" : ""}>{word} </span>
              ))}
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl leading-relaxed">
              {tour.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        <div className="lg:col-span-7 space-y-32">
          
          {/* Quick Stats Grid */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Clock, val: tour.duration, label: "Days" },
              { icon: Users, val: tour.groupSize || 'Private', label: "Expedition Party" },
              { icon: MapPin, val: tour.location, label: "Territory" },
              { icon: Compass, val: "Expert-Led", label: "Guidance" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm hover:border-[#fbbf24]/50 transition-colors">
                <stat.icon size={20} className="text-[#fbbf24] mb-4" />
                <p className="text-xl font-black text-white">{stat.val}</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Editorial Description */}
          <section className="space-y-12">
            <h2 className="text-4xl font-black text-white flex items-center gap-4">
              <div className="w-12 h-[2px] bg-[#fbbf24]" /> The Experience
            </h2>
            <div className="prose prose-invert prose-2xl max-w-none text-slate-400 font-light leading-relaxed">
              {tour.description}
            </div>
          </section>

          {/* Staggered Inclusions */}
          <section className="space-y-10">
            <h2 className="text-2xl font-black text-[#fbbf24] uppercase tracking-widest">Master-Crafted Logistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tour.includes?.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-white/[0.03] p-5 rounded-2xl border border-white/5"
                >
                  <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                  <span className="text-slate-300 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* STICKY BOOKING CARD */}
        <aside className="lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="sticky top-32 bg-[#fbbf24] p-1 rounded-[3rem] shadow-[0_0_100px_rgba(251,191,36,0.1)]"
          >
            <div className="bg-[#020617] rounded-[2.8rem] p-10 md:p-14 border border-black overflow-hidden relative">
              <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                <Globe size={150} />
              </div>

              <span className="text-[10px] uppercase tracking-[0.6em] text-[#fbbf24] font-black">All-Inclusive Passage</span>
              <div className="mt-4 mb-12 flex items-baseline gap-2">
                <span className="text-7xl md:text-8xl font-black text-white tracking-tighter">${tour.price}</span>
                <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">/ USD</span>
              </div>

              <button
                onClick={handleBooking}
                className="w-full py-6 bg-[#fbbf24] text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:bg-white transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#fbbf24]/20"
              >
                Secure Your Reservation
              </button>

              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-4 text-slate-400 group">
                  <ShieldCheck size={20} className="group-hover:text-[#fbbf24] transition-colors" />
                  <span className="text-sm font-medium">Fully Insured Local Operators</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 group">
                  <Info size={20} className="group-hover:text-[#fbbf24] transition-colors" />
                  <span className="text-sm font-medium">Tailor-Made Adjustments Available</span>
                </div>
              </div>
            </div>
          </motion.div>
        </aside>
      </main>
    </div>
  );
};

export default TourDetail;