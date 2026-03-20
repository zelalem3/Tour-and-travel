// App.jsx
import "../styles.css";
import Card from "../components/Card";
import "./home.css";
import WhyChooseUs from "../components/Whychooeuse";
import Destinations from "../components/Destinations";
import Tours from "../components/Tours";
import Cta from "../components/Cta";
import Hero from "../components/hero";


export default function App() {
  

  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col bg-gray-50">
      {/* 1. Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-950 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Travel<span className="text-yellow-400">Ethiopia</span></h1>
          <ul className="hidden md:flex gap-8">
            <li><a href="#tours" className="hover:text-yellow-400 transition">Tours</a></li>
            <li><a href="#destinations" className="hover:text-yellow-400 transition">Destinations</a></li>
            <li><a href="#why-us" className="hover:text-yellow-400 transition">Why Us</a></li>
            <li><a href="#contact" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
         {/* Mobile menu button – can expand later */}
        </div>
      </nav>
    <Hero />
      {/* 3. Why Choose Us */}

        <WhyChooseUs />
         {/* 4. Featured Tours */}
        <Tours />
        {/* 5. Destinations */}
        <Destinations />
        
      {/* 6. Contact / CTA */}
      <Cta />
     


      {/* 7. Footer 
       <footer className="bg-black text-gray-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-white mb-6">TravelEthiopia</h3>
          <p className="mb-4">Authentic • Responsible • Unforgettable</p>
          <p className="text-sm">
            © {new Date().getFullYear()} TravelEthiopia. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
}