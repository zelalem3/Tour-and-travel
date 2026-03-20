import React from 'react';
import './Destinations.css';

const Destinations = () => {
  const destinations = [
    {
      name: "Lalibela",
      desc: "Ancient rock-hewn churches.",
      img: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=800",
      link: "/destinations/lalibela",
      gridSpan: "md:col-span-2 lg:col-span-3" // Large featured card
    },
    {
      name: "Simien Mountains",
      desc: "The roof of Africa.",
      img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800",
      link: "/destinations/simien",
      gridSpan: "md:col-span-1 lg:col-span-2"
    },
    {
      name: "Danakil Depression",
      desc: "The hottest place on Earth.",
      img: "https://images.unsplash.com/photo-1523906630133-f74b5e1c48ef?q=80&w=800",
      link: "/destinations/danakil",
      gridSpan: "md:col-span-1 lg:col-span-2"
    },
    {
      name: "Omo Valley",
      desc: "Rich tribal heritage.",
      img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800",
      link: "/destinations/omo-valley",
      gridSpan: "md:col-span-2 lg:col-span-3"
    }
  ];

  return (
    <section id="destinations" className="dest-section">
      <div className="dest-container">
        <div className="dest-header">
          <h2 className="dest-title">Top Destinations in <span>Ethiopia</span></h2>
          <p className="dest-subtitle">Explore the most breathtaking corners of the Horn of Africa.</p>
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
                <img src={dest.img} alt={dest.name} className="dest-img" />
                <div className="dest-overlay">
                  <div className="dest-info">
                    <h3 className="dest-name">{dest.name}</h3>
                    <p className="dest-desc">{dest.desc}</p>
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