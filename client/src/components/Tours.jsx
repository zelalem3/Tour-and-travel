import React from "react"
import Card from "./Card";
import "./tours.css";

const Tours = () => {
  const    tours = [
    {
      name: "Lalibela Rock Churches Adventure",
      price: "$280",
      duration: "4 Days",
      imgSrc: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
      description: "Discover the extraordinary 12th-century rock-hewn churches, a UNESCO World Heritage site.",
      badge: "Cultural Highlight",
    },
    {
      name: "Simien Mountains Trek",
      price: "$420",
      duration: "5 Days",
      imgSrc: "https://images.unsplash.com/photo-1617196039195-cbe6b2d8f59b?auto=format&fit=crop&w=800&q=80",
      description: "Trek dramatic escarpments, spot endemic wildlife like the Gelada baboon and Ethiopian wolf.",
      badge: "Adventure",
    },
    {
      name: "Omo Valley Tribes Experience",
      price: "$380",
      duration: "4 Days",
      imgSrc: "https://images.unsplash.com/photo-1593157904342-5ab6a0d5c70d?auto=format&fit=crop&w=800&q=80",
      description       : "Meet the diverse ethnic groups of the Lower Omo Valley and witness ancient traditions.",
      badge: "Cultural Immersion",
    },
    {
      name: "Danakil Depression & Erta Ale",
      price: "$650",
      duration: "6 Days",
      imgSrc: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=800&q=80",
      description: "Explore one of the hottest, most surreal places on Earth with active volcanoes and salt lakes.",
      badge: "Extreme Adventure",
    },
  ];

  return (


<section id="tours" className="py-20 md:py-28 bg-gray-100">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
      Our Most Popular Tours
    </h2>
    
    {/* 
        grid-cols-1: Default (Small phones)
        md:grid-cols-2: Tablets
        lg:grid-cols-3: Large screens/Desktops 
    */}
    <div className="grid-container">
      {tours.map((tour, index) => (
        <div
          key={index}
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 relative flex flex-col h-full"
        >
          {/* Badge */}
          {index === 0 && (
            <div className="badge badge-secondary absolute top-4 right-4 z-10">
              Popular
            </div>
          )}

          <figure>
            <img
              src={tour.imgSrc} /* Fixed from tour.image */
              alt={tour.name}
              className="h-64 w-full object-cover"
            />
          </figure>

          <div className="card-body flex flex-col flex-grow p-6">
            <h2 className="card-title text-xl font-bold mb-2">{tour.name}</h2>

            <p className="text-sm text-gray-500 flex-grow">
              {tour.description}
            </p>

            <p className="text-xs mt-4 font-medium text-gray-400 uppercase tracking-wider">
              ⏳ {tour.duration} • Guided Tour
            </p>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
              <span className="text-blue-700 font-bold text-xl">
                {tour.price}
              </span>

              <button
                className="btn btn-primary btn-md shadow-md"
                onClick={() =>
                  navigate("/contact", {
                    state: { tour: tour.name },
                  })
                }
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

        );
};

export default Tours;
