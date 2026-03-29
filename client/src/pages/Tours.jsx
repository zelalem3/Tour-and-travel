import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { client, urlFor } from '../sanityClient'; 
import { Compass, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Tours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "tour"] | order(_createdAt asc) {
      _id,
      title,
      price,
      description,
      "slug": slug.current,
      mainImage {
        asset-> {
          _id,
          url,
          metadata { lqip }
        }
      }
    }`;

    client.fetch(query)
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  // --- SEO SCHEMA FOR COLLECTION ---
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": tours.map((tour, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://travelethiopia.com/tours/${tour.slug}`,
      "name": tour.title
    }))
  };

  // ... (Your existing animation variants remain the same) ...
  const pageRenderProps = {
    initial: { opacity: 0, filter: "blur(20px)", scale: 1.05 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    transition: { duration: 1.2, ease: "easeOut" }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 100, rotateX: 45, scale: 0.9, filter: "blur(10px)" },
    show: { 
      opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)",
      transition: { type: "spring", stiffness: 50, damping: 20, duration: 1 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <Helmet>
        <title>Curated Expeditions | Travel Ethiopia</title>
        <meta name="description" content="Explore our elite portfolio of Ethiopian expeditions. From the Danakil Depression to the Omo Valley, choose your legacy." />
        <link rel="canonical" href="https://travelethiopia.com/tours" />
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
      </Helmet>

      {loading ? (
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
            className="text-[#fbbf24]"
          >
            <Compass size={64} strokeWidth={1} />
          </motion.div>
          
          <div className="text-center">
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[0.75rem] font-black text-[#fbbf24] tracking-[6px] uppercase mb-[10px]"
            >
              Expedition Intelligence
            </motion.div>
            <div className="text-2xl font-bold text-white tracking-wider">
              MAPPING YOUR <span className="text-[#fbbf24]">ROUTE...</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          {...pageRenderProps}
          className="py-[120px] px-5 bg-[#020617] min-h-screen"
          style={{ perspective: '1200px' }}
        >
          <div className="text-center mb-20">
            <span className="text-[#fbbf24] font-extrabold uppercase tracking-[6px] text-[0.7rem]">
              Unrivaled Expeditions
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white mt-3 tracking-tighter leading-[0.9]">
              CHOOSE YOUR <span className="text-[#fbbf24]">LEGACY</span>
            </h1>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1400px] mx-auto"
          >
            {tours.map((tour) => (
              <motion.div
                key={tour._id}
                variants={cardVariants}
                className="bg-[#0f172a] rounded-[40px] overflow-hidden flex flex-col border border-white/5 relative group"
              >
                <Link to={`/tours/${tour.slug}`} className="block overflow-hidden relative h-[320px]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${tour.mainImage?.asset?.url})`,
                      backgroundColor: '#020617' 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                  <div className="absolute top-6 right-6 bg-[#020617]/80 backdrop-blur-md px-5 py-2 rounded-full border border-[#fbbf24]/50">
                    <span className="text-[#fbbf24] font-black">${tour.price}</span>
                  </div>
                </Link>

                <div className="p-10 flex flex-col flex-grow">
                  <h2 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:text-[#fbbf24] transition-colors">
                    {tour.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                    {tour.description?.substring(0, 120)}...
                  </p>

                  <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                    <Link to={`/tours/${tour.slug}`} className="text-[#fbbf24] font-bold text-[0.75rem] uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                      Details <ArrowRight size={14} />
                    </Link>
                    <button
                      onClick={() => navigate("/contact", { state: { tour: tour.title } })}
                      className="bg-[#fbbf24] text-[#020617] px-8 py-4 rounded-2xl font-black uppercase text-[0.7rem] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all"
                    >
                      Reserve Spot
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}