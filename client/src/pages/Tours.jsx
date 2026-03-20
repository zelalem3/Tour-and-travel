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

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tours.map((tour, index) => (
          <div
            key={tour._id || index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 relative"
          >
            {/* Popular Badge - logic stays the same */}
            {index === 0 && (
              <div className="badge badge-secondary absolute top-2 right-2 z-10">
                Popular
              </div>
            )}

            <figure>
              {tour.mainImage ? (
                <img
                  src={urlFor(tour.mainImage).width(600).url()}
                  alt={tour.title}
                  className="h-56 w-full object-cover"
                />
              ) : (
                <div className="h-56 w-full bg-gray-200 flex items-center justify-center">No Image</div>
              )}
            </figure>

            <div className="card-body">
              <h2 className="card-title">{tour.title}</h2>

              <p className="text-sm text-gray-500">
                {tour.description}
              </p>

              {/* Note: I added 'duration' to your Sanity schema earlier, 
                  make sure it's filled in the CMS! */}
              <p className="text-xs mt-2">
                ⏳ {tour.duration || "Contact for duration"} • Guided Tour
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-primary font-bold text-lg">
                  ${tour.price}
                </span>

                <button
                  className="btn btn-primary btn-sm"
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