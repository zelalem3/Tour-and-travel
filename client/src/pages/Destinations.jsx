import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // 1. Import Helmet
import { client } from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import './Destinations.css';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).auto('format');

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const query = `*[_type == "destination" ] | order(_createdAt asc) {
         name,
         "desc": description,
         "slug": slug.current,
         "location": location,
         "mainImage": mainImage.asset->{
           _id,
           url,
           metadata { lqip }
         }
       }`;
   
    client.fetch(query).then((data) => {
      setDestinations(data);
      setLoading(false);
    });
  }, []);

  // SEO Variables
  const pageTitle = "Top Destinations in Ethiopia | Travel Ethiopia";
  const pageDesc = "From the rock-hewn churches of Lalibela to the volcanic landscapes of Danakil, explore Ethiopia's most iconic travel destinations.";
  const canonicalUrl = window.location.href;

  if (loading) return (
    <>
      <Helmet>
        <title>Loading Destinations... | Travel Ethiopia</title>
      </Helmet>
      <div className="dest-loader">
        <div className="loader-ring" />
        <p>Mapping Ethiopia...</p>
      </div>
    </>
  );

  return (
    <div className="destinations-page">
      {/* 2. Add Helmet for SEO */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
      </Helmet>

      <header className="dest-header">
        <span className="dest-subtitle">Explore the Horn of Africa</span>
        <h1>Our Destinations</h1>
      </header>

      <div className="dest-grid">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/destinations/${dest.slug}`} className="dest-card">
              <div className="dest-image-container">
                <div 
                  className="dest-placeholder"
                  style={{ backgroundImage: `url(${dest.mainImage?.metadata?.lqip})` }}
                />
                
                <img
                  src={urlFor(dest.mainImage?._id).width(800).url()}
                  alt={dest.name}
                  onLoad={() => setLoadedImages(prev => ({ ...prev, [dest.slug]: true }))}
                  className={`dest-main-img ${loadedImages[dest.slug] ? 'is-loaded' : ''}`}
                />
                
                <div className="dest-overlay-gradient" />
                
                <div className="dest-card-content">
                  <span className="dest-tag"> <MapPin size={14} />  {dest.location || "Ethiopia"}</span>
                  <h3 className="dest-card-title">{dest.name}</h3>
                  <div className="dest-footer-info">
                    <span className="dest-btn">Explore →</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;