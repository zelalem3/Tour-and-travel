import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import './Destinations.css';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).auto('format');

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const query = `*[_type == "destination"] | order(title asc) {
      title,
      slug,
      "mainImage": mainImage.asset->{
        _id,
        metadata { lqip }
      },
      region,
      "tourCount": count(*[_type == "tour" && references(^._id)])
    }`;

    client.fetch(query).then((data) => {
      setDestinations(data);
      setLoading(false);
    });
  }, []);

  const handleImageLoad = (slug) => {
    setLoadedImages((prev) => ({ ...prev, [slug]: true }));
  };

  if (loading) return (
    <div className="dest-loader">
      <div className="loader-ring"></div>
      <p>Mapping Ethiopia...</p>
    </div>
  );

  return (
    <div className="destinations-page">
      <header className="dest-header">
        <span className="dest-subtitle">Explore the Horn of Africa</span>
        <h1>Our Destinations</h1>
        <p>From the volcanic craters of Dallol to the medieval rock-hewn churches of Lalibela.</p>
      </header>

      <div className="dest-grid">
        {destinations.map((dest) => (
          <Link 
            to={`/destinations/${dest.slug.current}`} 
            key={dest.slug.current} 
            className="dest-card"
          >
            {/* 1. Background Image Wrapper */}
            <div 
              className="dest-image-wrapper"
              style={{ 
                backgroundImage: `url(${dest.mainImage?.metadata?.lqip})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <img
                src={urlFor(dest.mainImage?._id).width(800).quality(80).url()}
                alt={dest.title}
                onLoad={() => handleImageLoad(dest.slug.current)}
                className={`dest-img ${loadedImages[dest.slug.current] ? 'is-loaded' : 'is-loading'}`}
              />
              
              <div className="dest-overlay"></div>
              
             
              <div className="dest-content">
                <span className="dest-region">{dest.region}</span>
                <h3 className="dest-title">{dest.title}</h3>
                <div className="dest-card-footer">
                  <span className="dest-count">{dest.tourCount || 0} Expeditions</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Destinations;