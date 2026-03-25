import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import {
  Clock,
  MapPin,
  Users,
  CheckCircle,
  ArrowLeft,
  ShieldCheck,
  Globe,
  Info,
  Calendar,
} from "lucide-react";

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
      state: { tourTitle: tour?.title, tourPrice: tour?.price },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 to-[#020617]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#fbbf24]/30 border-t-[#fbbf24] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#fbbf24] rounded-full animate-ping"></div>
          </div>
        </div>
        <p className="mt-8 text-[#fbbf24] font-medium tracking-[0.35em] uppercase text-sm">
          Exploring Ethiopia’s Wonders...
        </p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white text-2xl font-bold">
        Tour not found.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#fafafa] to-white min-h-screen font-sans selection:bg-[#fbbf24]/80 selection:text-[#020617] antialiased">
      {/* Floating Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="group bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-2xl text-white hover:bg-[#fbbf24] hover:text-[#020617] hover:border-[#fbbf24]/40 transition-all duration-400 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft size={28} strokeWidth={2.5} className="transition-transform group-hover:-translate-x-1" />
        </button>
      </div>

      {/* Hero – larger title, better overlay, subtle vignette */}
      <header className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
        {tour.mainImage ? (
          <img
            src={urlFor(tour.mainImage).width(1800).url()}
            alt={tour.title}
            className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-[8s] hover:scale-100"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black" />
        )}

        {/* Stronger but elegant overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa]/95 via-black/60 to-black/40" />

        <div className="absolute inset-0 flex items-end pb-16 md:pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="w-full">
            <div className="inline-block mb-5 px-6 py-2 bg-[#fbbf24]/90 backdrop-blur-sm text-[#020617] font-black text-xs md:text-sm uppercase tracking-[0.4em] rounded-full shadow-lg">
              Prime Ethiopian Expeditions
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.82] tracking-[-0.04em] drop-shadow-2xl [text-wrap:balance]">
              {tour.title}
            </h1>

            {tour.tagline && (
              <p className="mt-6 text-xl md:text-2xl text-white/90 font-medium max-w-3xl">
                {tour.tagline}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 -mt-24 md:-mt-32 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16 lg:space-y-24">
            {/* Key Facts – glassmorphism style */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-8 bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl shadow-black/10 rounded-3xl p-8 md:p-10">
              {[
                { icon: Clock, label: "Duration", value: tour.duration },
                { icon: Users, label: "Max Group", value: `${tour.groupSize || 12} people` },
                { icon: MapPin, label: "Region", value: tour.location || "Ethiopia" },
                { icon: Calendar, label: "Pace", value: "Moderate", color: "text-emerald-600" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`space-y-2 ${i > 0 ? "border-l border-slate-200/60 pl-5 md:pl-8" : ""}`}
                >
                  <p className="text-xs text-slate-500 font-black uppercase tracking-[0.25em]">
                    {item.label}
                  </p>
                  <div className={`flex items-center gap-3 text-lg md:text-xl font-black ${item.color || "text-slate-900"}`}>
                    <item.icon size={20} className="text-[#fbbf24]" />
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Overview */}
            <section className="space-y-10">
              <div className="flex items-center gap-5">
                <div className="h-0.5 w-16 bg-gradient-to-r from-[#fbbf24] to-amber-300 rounded-full"></div>
                <h3 className="text-sm font-black text-[#fbbf24] uppercase tracking-[0.45em]">Experience</h3>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#020617] tracking-tight leading-none">
                Journey <span className="text-[#fbbf24]/80">Overview</span>
              </h2>
              <p className="text-lg md:text-2xl text-slate-700 leading-relaxed font-medium first-letter:text-6xl first-letter:font-black first-letter:text-[#020617] first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]">
                {tour.description}
              </p>
            </section>

            {/* Inclusions – nicer cards */}
            <section className="bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-slate-100/80">
              <h2 className="text-4xl font-black text-[#020617] mb-12 tracking-tight">What’s Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {tour.includes?.map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-5 p-5 rounded-2xl hover:bg-emerald-50/60 transition-colors duration-300 border border-transparent hover:border-emerald-100"
                  >
                    <div className="bg-emerald-100 text-emerald-700 p-3 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <CheckCircle size={24} strokeWidth={2.8} />
                    </div>
                    <span className="font-semibold text-slate-800 text-lg leading-relaxed mt-1">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Sidebar – premium dark card */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 lg:top-12 z-20">
              <div className="bg-gradient-to-br from-[#020617] to-slate-950 p-10 md:p-12 rounded-4xl shadow-2xl shadow-black/50 border border-white/5 overflow-hidden text-white">
                {/* Subtle ambient glow */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#fbbf24]/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col">
                  <p className="text-xs text-[#fbbf24] font-black uppercase tracking-[0.45em] opacity-80 mb-5">
                    Starting From
                  </p>

                  <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-4xl font-black text-[#fbbf24]">$</span>
                    <span className="text-8xl md:text-9xl font-black tracking-tighter leading-none">
                      {tour.price}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm font-medium mb-12 flex items-center gap-2">
                    <Info size={16} className="text-[#fbbf24]" />
                    Per person • Fully inclusive pricing
                  </p>

                  <button
                    onClick={handleBooking}
                    className="group relative w-full h-20 bg-gradient-to-r from-[#fbbf24] to-amber-300 text-[#020617] font-black text-sm uppercase tracking-[0.35em] rounded-3xl shadow-2xl shadow-[#fbbf24]/30 hover:shadow-[#fbbf24]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-400 overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:tracking-[0.5em] transition-all duration-500">
                      Request Your Journey
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </button>

                  <div className="mt-12 pt-10 border-t border-white/10">
                    <div className="flex items-center gap-6 bg-white/5 p-6 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="bg-[#fbbf24]/10 text-[#fbbf24] p-4 rounded-2xl">
                        <ShieldCheck size={36} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="font-black uppercase text-sm tracking-wider mb-1.5">
                          Peace of Mind Travel
                        </p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          Expert guides • Insured • Small groups
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default TourDetail;