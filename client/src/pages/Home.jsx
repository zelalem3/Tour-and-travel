import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/hero"; 
import BlogList from "../components/blog";
import { motion } from "framer-motion";

// Lazy loaded sections
const WhyChooseUs = lazy(() => import("../components/Whychooeuse"));
const Tours = lazy(() => import("../components/Tours"));
const Destinations = lazy(() => import("../components/Destinations"));
const Cta = lazy(() => import("../components/Cta"));

// Updated Loader to match your Premium/Dark theme
const SectionLoader = () => (
  <div className="flex flex-col items-center justify-center py-32 bg-[#020617]">
    <div className="w-10 h-10 border-2 border-[#fbbf24]/20 border-t-[#fbbf24] rounded-full animate-spin"></div>
    <p className="mt-4 text-[10px] tracking-[0.3em] text-gray-500 uppercase font-bold">Loading Experience</p>
  </div>
);

const Home = () => {
  const siteUrl = "https://travelethiopia.com";
  const siteTitle = "Travel Ethiopia | Discover the Cradle of Humanity";
  const siteDesc = "Join Travel Ethiopia for an unforgettable odyssey. From the rock-hewn churches of Lalibela to the volcanic landscapes of Danakil.";
  // Ensure this image exists in your public folder or Sanity
  const siteImg = "https://travelethiopia.com/icon.svg"; 

  return (
    <div className="flex flex-col min-h-screen bg-[#020617]">
      {/* --- MASTER SEO & SOCIAL TAGS --- */}
      <Helmet>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDesc} />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph / Telegram / WhatsApp / FB */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:image" content={siteImg} />
        <meta property="og:site_name" content="Travel Ethiopia" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDesc} />
        <meta name="twitter:image" content={siteImg} />

        {/* Favicon & Theme Color */}
        <meta name="theme-color" content="#020617" />
      </Helmet>

      <main className="flex-grow">
        {/* Hero is usually not lazy-loaded to avoid LCP (Largest Contentful Paint) delays */}
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <section id="destinations">
              <Destinations />
            </section>

            <section id="tours">
              <Tours />
            </section>

            <section id="why-us">
              <WhyChooseUs />
            </section>

            <section id="blog" className="py-12">
              <BlogList />
            </section>

            <section id="contact">
              <Cta />
            </section>
          </motion.div>
        </Suspense>
      </main>
    </div>
  );
};

export default Home;