import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
// Import Hero synchronously to prevent "white screen" on landing
import Hero from "../components/hero"; 
import BlogList from "../components/blog";

const WhyChooseUs = lazy(() => import("../components/Whychooeuse"));
const Tours = lazy(() => import("../components/Tours"));
const Destinations = lazy(() => import("../components/Destinations"));
const Cta = lazy(() => import("../components/Cta"));

const SectionLoader = () => (
  <div className="flex items-center justify-center py-20 bg-white">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Helmet>
        <title>TravelEthiopia | Discover the Cradle of Humanity</title>
        <meta name="description" content="Join TravelEthiopia for an unforgettable odyssey..." />
      </Helmet>

      <main className="flex-grow">
        {/* Rendered immediately for better LCP (Largest Contentful Paint) */}
        <Hero />

        {/* Lazy load the rest of the page */}
        <Suspense fallback={<SectionLoader />}>
          <section id="destinations">
            <Destinations />
          </section>

          <section id="tours">
            <Tours />
          </section>

          <section id="why-us">
            <WhyChooseUs />
          </section>

          <section id="blog" className="py-12 bg-white">
            <BlogList />
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