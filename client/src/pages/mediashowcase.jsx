import React, { useState, useEffect } from 'react';
import { Maximize2, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import {client} from '../sanityClient'; 
import './mediashowcase.css';

const MediaShowcase = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GROQ Query to fetch both Galleries and Videos
    const query = `
      {
        "galleries": *[_type == "gallery"]{
          _id,
          title,
          "slug": slug.current,
          "url": mainImage.asset->url
        },
        "videos": *[_type == "youtubeVideo"]{
          _id,
          title,
          videoId
        }
      }
    `;

    client
      .fetch(query)
      .then((data) => {
        setPhotos(data.galleries);
        setVideos(data.videos);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <div className="loading-state">Loading your journey...</div>;

  return (
    <div className="media-page">
      <div className="media-header">
        <h1>Visual Journey</h1>
        <p>Explore Ethiopia through the lenses of our travelers</p>
      </div>

      {/* PHOTO GALLERY SECTION */}
      <section className="gallery-section">
        <h2 className="section-subtitle">Photo Gallery</h2>
        <div className="photo-grid">
          {photos.map((photo) => (
            <Link 
              to={`/gallery/${photo.slug}`} 
              key={photo._id} 
              className="photo-card"
            >
              <img src={photo.url} alt={photo.title} />
              <div className="photo-overlay">
                <ImageIcon color="white" size={24} />
                <span className="view-album-text">View Full Album</span>
                <h3 className="photo-title">{photo.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="video-section">
        <h2 className="section-subtitle">Featured Expeditions</h2>
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video._id} className="video-card">
              <div className="iframe-container">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                ></iframe>
              </div>
              <h3>{video.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MediaShowcase;