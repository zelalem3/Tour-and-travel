import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { client, urlFor } from '../sanityClient'; // Ensure this path is correct

export default function Tours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tours from Sanity
    const query = '*[_type == "tour"] | order(_createdAt asc)';
    
    client.fetch(query)
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return <div className="p-6 bg-base-200 min-h-screen text-center pt-20">Loading Tours...</div>;
  }

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Our Tours</h1>
        <p className="text-gray-500">
          Discover unforgettable travel experiences across Ethiopia
        </p>
      </div>

   <div className="tours-grid-container max-w-7xl mx-auto">
  {tours.map((tour, index) => (
    <div
      key={tour._id || index}
      className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 relative border border-gray-100"
    >
      {/* Popular Badge */}
      {index === 0 && (
        <div className="badge badge-secondary absolute top-4 right-4 z-10 shadow-sm">
          Popular
        </div>
      )}

      <figure className="px-0 pt-0">
        {tour.mainImage ? (
          <img
            src={urlFor(tour.mainImage).width(600).height(400).url()}
            alt={tour.title}
            className="h-64 w-full object-cover rounded-t-xl"
          />
        ) : (
          <div className="h-64 w-full bg-gray-200 flex items-center justify-center rounded-t-xl">
            No Image
          </div>
        )}
      </figure>

      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold">{tour.title}</h2>
        
        <p className="text-sm text-gray-500 line-clamp-2">
          {tour.description}
        </p>

        <div className="flex items-center gap-2 mt-2 text-gray-600">
           <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
             ⏳ {tour.duration || "Custom"}
           </span>
           <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
             📍 Guided
           </span>
        </div>

        <div className="card-actions justify-between items-center mt-6 pt-4 border-t border-gray-50">
          <span className="text-2xl font-black text-primary">
            ${tour.price}
          </span>

          <button
            className="btn btn-primary btn-md shadow-md hover:scale-105 transition-transform"
            onClick={() =>
              navigate("/contact", {
                state: { tour: tour.title },
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
  );
}
      
