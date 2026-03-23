import React, { useEffect, useState } from 'react';
import './Destinations.css';
import { client } from '../sanityClient';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const query = `*[_type == "destination"]{
      name,
      "desc": description,
      "img": mainImage.asset->url,
      "slug": slug.current
    }`;

    client.fetch(query)
      .then((data) => {
        // Add gridSpan dynamically (same logic you had)
        const formatted = data.map((item, i) => ({
          ...item,
          link: `/destinations/${item.slug}`,
          gridSpan:
            i % 4 === 0
              ? "md:col-span-2 lg:col-span-3"
              : i % 2 === 0
              ? "md:col-span-1 lg:col-span-2"
              : "md:col-span-1 lg:col-span-2"
        }));

        setDestinations(formatted);
      })
      .catch((err) => console.error("Sanity error:", err));
  }, []);

  return (
    <section id="destinations" className="dest-section">
      <div className="dest-container">
        <div className="dest-header">
          <h2 className="dest-title">
            Top Destinations in <span>Ethiopia</span>
          </h2>
          <p className="dest-subtitle">
            Explore the most breathtaking corners of the Horn of Africa.
          </p>
        </div>

        <div className="dest-grid">
          {destinations.map((dest, i) => (
            <a
              href={dest.link}
              key={i}
              className={`dest-card ${dest.gridSpan}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="dest-image-wrapper">
                {dest.img ? (
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="dest-img"
                  />
                ) : (
                  <div className="dest-img" style={{ background: "#333" }} />
                )}

                <div className="dest-overlay">
                  <div className="dest-info">
                    <h3 className="dest-name">{dest.name}</h3>
                    <p className="dest-desc">{dest.slug}</p>
                    <span className="dest-btn">View Details →</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;