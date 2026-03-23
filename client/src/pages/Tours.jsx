import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom"; // ✅ Added Link
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

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#020617' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fbbf24', letterSpacing: '2px' }} className="animate-pulse">
          LOADING TOURS...
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '100px 20px', 
      backgroundColor: '#020617', 
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ color: '#fbbf24', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.75rem' }}>
          Land of Origins
        </span>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', color: '#ffffff', marginTop: '15px', letterSpacing: '-2px' }}>
          OUR <span style={{ color: '#fbbf24' }}>TOURS</span>
        </h1>
      </div>

      {/* THE GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '40px',
        maxWidth: '1300px',
        margin: '0 auto'
      }}>
        {tours.map((tour) => (
          <div
            key={tour._id}
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '32px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #1e293b',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.borderColor = '#fbbf24';
                e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#1e293b';
                e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* ✅ Image Wrap with Link */}
            <Link to={`/tours/${tour.slug?.current}`} style={{ textDecoration: 'none', display: 'block', overflow: 'hidden' }}>
              <div style={{ height: '280px', width: '100%', position: 'relative' }}>
                {tour.mainImage ? (
                  <img
                    src={urlFor(tour.mainImage).width(600).height(400).url()}
                    alt={tour.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    No Image
                  </div>
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, transparent)' }}></div>
              </div>
            </Link>

            {/* Content Section */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              
              {/* ✅ Title Wrap with Link */}
              <Link to={`/tours/${tour.slug?.current}`} style={{ textDecoration: 'none' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ffffff', marginBottom: '12px', lineHeight: '1.1' }}>
                  {tour.title}
                </h2>
              </Link>
              
              <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.8', marginBottom: '30px', flexGrow: 1 }}>
                {tour.description ? tour.description.substring(0, 100) + "..." : "Explore the beauty of Ethiopia on this curated tour."}
              </p>

              {/* Price & Button Row */}
              <div style={{ 
                marginTop: 'auto', 
                paddingTop: '24px', 
                borderTop: '1px solid #1e293b', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>Investment</span>
                  <span style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff' }}>
                    ${tour.price}
                  </span>
                </div>

                <button
                  style={{
                    backgroundColor: '#fbbf24',
                    color: '#020617',
                    padding: '16px 32px',
                    borderRadius: '18px',
                    fontWeight: '900',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate("/contact", { state: { tour: tour.title } })}
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