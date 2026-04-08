import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { client } from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';

// Initialize the builder
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const DestinationAlbum = () => {
  const { slug } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Updated Query: Fetch the whole image object so we can get metadata and captions
    const query = `*[_type == "gallery" && slug.current == $slug][0]{
      title,
      images[]{
        asset,
        caption,
        alt
      }
    }`;

    client
      .fetch(query, { slug })
      .then((data) => {
        setAlbum(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
        <Loader2 className="animate-spin" size={40} color="#fbbf24" />
      </div>
    );
  }

  if (!album) return <div style={{ textAlign: 'center', color: 'white' }}>Album not found</div>;

  return (
    <div className="album-page" style={{ padding: '40px 5%', color: 'white', minHeight: '100vh' }}>
      <Link to="/gallery" style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', marginBottom: '20px' }}>
        <ChevronLeft size={20} /> Back to Gallery
      </Link>

      <header style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fbbf24', marginBottom: '10px' }}>
          {album.title}
        </h1>
        <div style={{ width: '60px', height: '4px', background: '#fbbf24' }}></div>
      </header>

      <div style={{ 
        columns: '3 300px', 
        columnGap: '20px',
        width: '100%'
      }}>
        {album.images?.map((img, index) => (
          <div key={index} style={{ breakInside: 'avoid', marginBottom: '25px', position: 'relative' }}>
            {/* 2. Optimized Image Loading */}
            <img 
              src={urlFor(img.asset)
                .width(800)           // Resize to a sensible width
                .quality(80)          // Slight compression for speed
                .auto('format')       // Automatically serve WebP if the browser supports it
                .url()} 
              style={{ 
                width: '100%', 
                borderRadius: '15px 15px 0 0', 
                display: 'block',
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease'
              }} 
              alt={img.alt || album.title}
              loading="lazy"          // 3. Native Browser Lazy Loading
              onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />

            {/* 4. Caption Bar */}
            {img.caption && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '12px 15px',
                borderRadius: '0 0 15px 15px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderTop: 'none',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontStyle: 'italic'
              }}>
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationAlbum;