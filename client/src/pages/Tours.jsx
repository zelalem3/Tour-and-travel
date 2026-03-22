import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { client, urlFor } from '../sanityClient'; 

export default function Tours() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "tour"] | order(_createdAt asc)';
    client.fetch(query)
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  // Loading State - Dark Version
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#020617' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fbbf24' }}>Loading Tours...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '60px 20px', 
      backgroundColor: '#020617', // Midnight Navy Background
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ color: '#fbbf24', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>
          Explore Ethiopia
        </span>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#ffffff', marginTop: '10px', marginBottom: '15px' }}>
          Our <span style={{ color: '#fbbf24' }}>Tours</span>
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Discover unforgettable travel experiences across the Land of Origins.
        </p>
      </div>

      {/* THE GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {tours.map((tour, index) => (
          <div
            key={tour._id || index}
            style={{
              backgroundColor: '#0f172a', // Dark Card Background
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #1e293b', // Subtle border
              transition: 'transform 0.3s ease'
            }}
          >
            {/* Image Section */}
            <div style={{ height: '250px', width: '100%', overflow: 'hidden', position: 'relative' }}>
              {tour.mainImage ? (
                <img
                  src={urlFor(tour.mainImage).width(600).height(400).url()}
                  alt={tour.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                  No Image
                </div>
              )}
              {/* Optional: Dark gradient overlay on bottom of image */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(15,23,42,0.8), transparent)' }}></div>
            </div>

            {/* Content Section */}
            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', marginBottom: '12px' }}>
                {tour.title}
              </h2>
              
              <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.7', marginBottom: '25px', flexGrow: 1 }}>
                {tour.description}
              </p>

              {/* Price & Button Row */}
              <div style={{ 
                marginTop: 'auto', 
                paddingTop: '20px', 
                borderTop: '1px solid #1e293b', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '700', textTransform: 'uppercase' }}>From</span>
                  <span style={{ fontSize: '1.75rem', fontWeight: '900', color: '#ffffff' }}>
                    ${tour.price}
                  </span>
                </div>

                <button
                  style={{
                    backgroundColor: '#fbbf24', // Golden Button
                    color: '#020617', // Midnight Navy Text
                    padding: '14px 28px',
                    borderRadius: '14px',
                    fontWeight: '800',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => navigate("/contact", { state: { tour: tour.title } })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fcd34d';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fbbf24';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
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