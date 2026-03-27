import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";

// Lazy load all main components
const Hero = lazy(() => import("../components/hero"));
const WhyChooseUs = lazy(() => import("../components/Whychooeuse"));
const Tours = lazy(() => import("../components/Tours"));
const Destinations = lazy(() => import("../components/Destinations"));
const Cta = lazy(() => import("../components/Cta"));

// A clean loading state for each section
const SectionLoader = () => (
  <div className="flex items-center justify-center py-24 bg-white">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Dynamic SEO Section */}
      <Helmet>
        <title>TravelEthiopia | Home - Discover the Cradle of Humanity</title>
        <meta 
          name="description" 
          content="Join TravelEthiopia for an unforgettable odyssey. View our most popular tours and top destinations across the country." 
        />
        <link rel="canonical" href="https://travelethiopia.com/" />
      </Helmet>

      <main className="flex-grow">
        <Suspense fallback={<SectionLoader />}>
          {/* Main Content Sections */}
          <section id="hero">
            <Hero />
          </section>

          <section id="why-us">
            <WhyChooseUs />
          </section>

          <section id="tours">
            <Tours />
          </section>

          <section id="destinations">
            <Destinations />
          </section>

          <section id="contact">
            <Cta />
          </section>
        </Suspense>
      </main>
    </div>
  );
};

export default Home;