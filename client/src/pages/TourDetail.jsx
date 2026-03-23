import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import { Clock, MapPin, Users, CheckCircle, ArrowLeft, ShieldCheck, Globe, Info } from "lucide-react";

const TourDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[ _type == "tour" && slug.current == $slug ][0]`;

    client
      .fetch(query, { slug })
      .then((data) => {
        setTour(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tour:", err);
        setLoading(false);
      });
  }, [slug]);

  const handleBooking = () => {
    navigate("/contact", {
      state: { tourTitle: tour.title, tourPrice: tour.price },
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#020617]">
        <div className="w-16 h-16 border-4 border-[#fbbf24] border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-[#fbbf24] font-black tracking-[0.3em] uppercase text-xs">
          Discovering Ethiopia...
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617] text-white font-bold">
        Tour not found.
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans selection:bg-[#fbbf24] selection:text-[#020617] pb-20">
      {/* Navigation Layer */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="pointer-events-auto bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-full text-white hover:bg-[#fbbf24] hover:text-[#020617] transition-all duration-500 shadow-2xl"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[80vh] w-full overflow-hidden">
        {tour.mainImage ? (
          <img
            src={urlFor(tour.mainImage).url()}
            alt={tour.title}
            className="w-full h-full object-cover scale-105 transition-transform duration-[3s] hover:scale-100"
          />
        ) : (
          <div className="w-full h-full bg-slate-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#fafafa]"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 max-w-7xl mx-auto w-full">
          <div className="bg-[#fbbf24] text-[#020617] w-fit px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl">
            Prime Expedition
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase leading-[0.8] tracking-tighter drop-shadow-2xl">
            {tour.title}
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 -mt-16 relative z-10">
        
        {/* Left Content Area */}
        <div className="lg:col-span-8 space-y-20">
          
          {/* Key Facts Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
            <div className="space-y-2">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Duration</p>
              <div className="flex items-center gap-3 font-black text-slate-900 text-lg">
                <Clock size={18} className="text-[#fbbf24]" /> {tour.duration}
              </div>
            </div>
            <div className="space-y-2 border-l border-slate-100 pl-6">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Max Group</p>
              <div className="flex items-center gap-3 font-black text-slate-900 text-lg">
                <Users size={18} className="text-[#fbbf24]" /> {tour.groupSize || "12"} MAX
              </div>
            </div>
            <div className="space-y-2 border-l border-slate-100 pl-6">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Region</p>
              <div className="flex items-center gap-3 font-black text-slate-900 text-lg">
                <MapPin size={18} className="text-[#fbbf24]" /> {tour.location || "Ethiopia"}
              </div>
            </div>
            <div className="space-y-2 border-l border-slate-100 pl-6">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Pace</p>
              <div className="flex items-center gap-3 font-black text-emerald-600 text-lg">
                <Globe size={18} /> Moderate
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#fbbf24]"></div>
              <h3 className="text-xs font-black text-[#fbbf24] uppercase tracking-[0.5em]">The Journey</h3>
            </div>
            <h2 className="text-5xl font-black text-[#020617] mb-10 tracking-tighter uppercase leading-none">Adventure <br/>Overview</h2>
            <p className="text-slate-600 leading-relaxed text-2xl font-medium first-letter:text-7xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-[#020617] first-letter:leading-none">
              {tour.description}
            </p>
          </section>

          {/* Inclusions */}
          <section className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-100/50">
            <h2 className="text-3xl font-black text-[#020617] mb-12 tracking-tighter uppercase">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tour.includes?.map((item, i) => (
                <div key={i} className="flex items-start gap-5 p-2 group">
                  <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <CheckCircle size={22} strokeWidth={3} />
                  </div>
                  <span className="font-bold text-slate-700 text-lg mt-1">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar - High Impact Booking Card */}
        <aside className="lg:col-span-4">
          <div className="sticky top-12 bg-[#020617] p-10 md:p-12 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden text-white">
            
            {/* Ambient Background Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#fbbf24]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 h-full flex flex-col">
              <header className="mb-12">
                <p className="text-[11px] text-[#fbbf24] font-black uppercase tracking-[0.4em] mb-6 block opacity-80">
                  Investment Summary
                </p>
                <div className="flex flex-col">
                  <div className="flex items-start">
                    <span className="text-3xl font-black text-[#fbbf24] mt-3 mr-2">$</span>
                    <h2 className="text-8xl font-black tracking-tighter leading-none text-white">
                      {tour.price}
                    </h2>
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-6 ml-1 flex items-center gap-2">
                    <Info size={14} className="text-[#fbbf24]" /> Fully inclusive per person
                  </p>
                </div>
              </header>

              {/* ✅ ENHANCED BUTTON: Height fixed at h-20 (80px) */}
              <button
                onClick={handleBooking}
                className="group relative w-full h-24 bg-[#fbbf24] text-[#020617] font-black rounded-3xl transition-all duration-500 shadow-[0_20px_50px_rgba(251,191,36,0.3)] active:scale-[0.98] text-xs uppercase tracking-[0.3em] overflow-hidden"
              >
                <span className="relative z-10 group-hover:tracking-[0.4em] transition-all duration-500">Request Booking</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </button>

              <footer className="mt-12 pt-10 border-t border-white/10">
                <div className="flex items-center gap-5 bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="bg-[#fbbf24]/10 text-[#fbbf24] p-3 rounded-2xl">
                    <ShieldCheck size={32} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-white text-xs font-black uppercase tracking-widest mb-1">Guaranteed Safety</p>
                    <p className="text-slate-500 text-[10px] font-medium leading-tight">Your expedition is managed by certified professionals.</p>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default TourDetail;