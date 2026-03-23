import React from "react";
import Hero from "../components/hero";
import WhyChooseUs from "../components/Whychooeuse";
import Tours from "../components/Tours";
import Destinations from "../components/Destinations";
import Cta from "../components/Cta";
 // Using your styled-components footer

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* The Navbar usually stays in App.jsx so it shows on ALL pages.
          If it's inside Home, it will disappear when you go to a "Details" page.
      */}
      
      <main className="flex-grow">
        {/* Each component should have an ID that matches your Navbar links */}
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
      </main>


    </div>
  );
};

export default Home;