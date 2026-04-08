import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Loader2, Camera, MapPin } from 'lucide-react';
import { client } from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import './DestinationGallery.css';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source).auto('format').quality(85);
}

const DestinationAlbum = () => {
  const { slug } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "gallery" && slug.current == $slug][0]{
      title,
      location,
      description,
      images[]{ asset, caption, alt }
    }`;

    client.fetch(query, { slug })
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
      <div className="album-loader">
        <Loader2 className="spinner" size={48} />
        <p>Developing the Expedition...</p>
      </div>
    );
  }

  if (!album) return <div className="error-state">Album not found</div>;

  return (
    <div className="album-page-container">
      <div className="album-content">
        
        <Link to="/gallery" className="back-link">
          <ChevronLeft size={20} />
          <span>Back to All Expeditions</span>
        </Link>

        <header className="album-header">
          <div className="header-badge">
            <Camera size={18} />
            <span>Photo Expedition</span>
          </div>
          
          {album.location && (
            <div className="album-location">
              <MapPin size={18} /> {album.location}
            </div>
          )}

          <h1 className="album-title">{album.title}</h1>
          
          {album.description && (
            <p className="album-description">{album.description}</p>
          )}
          
          <div className="title-underline"></div>
        </header>

        <div className="masonry-grid">
          {album.images?.map((img, index) => (
            <div key={index} className="masonry-item">
              <div className="image-card">
                <img 
                  src={urlFor(img.asset).width(1200).url()} 
                  alt={img.alt || album.title}
                  loading="lazy"
                />
                {img.caption && (
                  <div className="caption-overlay">
                    <p>{img.caption}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationAlbum;