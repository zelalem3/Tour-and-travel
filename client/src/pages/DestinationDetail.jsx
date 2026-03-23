import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient'; 
import { 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Info, 
  ChevronLeft, 
  Share2, 
  Check, 
  AlertCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import './DestinationDetail.css';

const DestinationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // --- STATE DECLARATIONS ---
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false); // ✅ FIXED: Added missing state
  const [scrollProgress, setScrollProgress] = useState(0); // ✅ Added for the progress bar

  // Fetch Data from Sanity
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
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [slug]);

  // Handle Scroll Progress
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
    <div className="h-screen flex items-center justify-center bg-[#020617]">
      <div className="text-[#fbbf24] font-black tracking-[0.4em] animate-pulse uppercase">Exploring Ethiopia...</div>
    </div>
  );

  if (!destination) return (
    <div className="h-screen flex items-center justify-center bg-[#020617] text-white">
       Destination not found.
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-[#fbbf24] selection:text-[#020617] relative">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-gray-100">
        <div 
          className="h-full bg-[#fbbf24] transition-all duration-150" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* --- SUCCESS TOAST --- */}
      <div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-[#020617] text-white px-8 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-700 ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-emerald-500 p-1.5 rounded-full">
          <Check size={14} strokeWidth={4} />
        </div>
        <span className="text-xs font-black uppercase tracking-widest">Link Secured</span>
      </div>

      {/* --- HERO HEADER --- */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute top-10 left-10 right-10 z-30 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-4 bg-black/20 backdrop-blur-xl rounded-full text-white border border-white/10 hover:bg-[#fbbf24] hover:text-[#020617] transition-all duration-500 group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={handleShare}
            className="p-4 bg-black/20 backdrop-blur-xl rounded-full text-white border border-white/10 hover:bg-white/20 transition-all duration-500"
          >
            <Share2 size={20} />
          </button>
        </div>

        {destination.mainImage && (
          <img 
            src={urlFor(destination.mainImage).url()} 
            className="w-full h-full object-cover" 
            alt={destination.name} 
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-black/20 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-28 w-full">
            <div className="flex items-center gap-3 text-[#fbbf24] font-black uppercase tracking-[0.4em] text-[10px] mb-6">
              <MapPin size={14} strokeWidth={3} /> {destination.location}
            </div>
            <h1 className="dest-detail-title text-7xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter drop-shadow-2xl">
              {destination.name}
            </h1>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8 space-y-16">
            <section className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-50">
              <div className="flex items-center gap-5 mb-12">
                <div className="w-12 h-[2px] bg-[#fbbf24]"></div>
                <h2 className="text-xs font-black text-[#fbbf24] uppercase tracking-[0.5em]">The Experience</h2>
              </div>
              <p className="destination-description text-slate-600 text-2xl leading-relaxed font-medium">
                {destination.description}
              </p>
            </section>

            <div className="pulse-amber bg-[#020617] p-12 rounded-[4rem] flex flex-col md:flex-row items-center gap-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/5">
              <div className="bg-[#fbbf24] p-8 rounded-[2.5rem] text-[#020617] shadow-2xl shadow-[#fbbf24]/20 rotate-3">
                <Calendar size={48} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-[#fbbf24] font-black text-[10px] uppercase tracking-[0.4em] mb-4 opacity-80">Ideal Season</h4>
                <p className="text-white text-4xl font-black tracking-tight leading-none uppercase">{destination.bestTimeToVisit}</p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-12 space-y-8">
              <div className="glass-sidebar p-12 rounded-[3.5rem] shadow-2xl">
                <h3 className="text-sm font-black text-[#020617] uppercase tracking-[0.4em] mb-10 block">
                  Curation
                </h3>

                <div className="space-y-6 max-h-[550px] overflow-y-auto custom-scrollbar pr-4">
                  {destination.relatedTours?.length > 0 ? (
                    destination.relatedTours.map((tour, index) => (
                      <Link 
                        to={`/tours/${tour.slug}`} 
                        key={index}
                        className="group block bg-white/50 hover:bg-white p-5 rounded-[2rem] border border-slate-100 transition-all duration-500 hover:shadow-xl"
                      >
                        <div className="flex items-center gap-5">
                          <div className="zoom-container w-24 h-24 flex-shrink-0 rounded-[1.5rem] overflow-hidden shadow-lg">
                            <img 
                              src={urlFor(tour.mainImage).width(200).height(200).url()} 
                              className="w-full h-full object-cover" 
                              alt={tour.title}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-black text-slate-900 leading-tight mb-3 text-lg group-hover:text-blue-700 transition-colors uppercase tracking-tighter">
                              {tour.title}
                            </h4>
                            <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{tour.duration}</span>
                              <span className="text-md font-black text-[#020617]">${tour.price}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-10 opacity-40">
                      <p className="text-xs uppercase font-black tracking-widest">No tours linked yet</p>
                    </div>
                  )}
                </div>
                
                <Link 
  to="/contact" 
  className="group flex items-center justify-center gap-6 w-full text-center mt-12 bg-[#020617] text-white h-24 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm hover:bg-[#fbbf24] hover:text-[#020617] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[#fbbf24]/30 active:scale-[0.98]"
>
  <span className="relative z-10">Private Inquiry</span>
  <ArrowRight 
    size={22} 
    strokeWidth={3} 
    className="group-hover:translate-x-3 transition-transform duration-500 ease-out" 
  />
</Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DestinationDetail;