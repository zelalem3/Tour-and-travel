import React, { useEffect, useState } from 'react';
import { client } from '../sanityClient'; 
import { Link } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import './bloglist.css'; 

const builder = imageUrlBuilder(client);
// Optimization: Added .auto('format') to serve WebP/AVIF automatically
const urlFor = (source) => builder.image(source).auto('format');

// 1. Updated Query to fetch metadata (lqip)
const BLOG_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  title,
  slug,
  publishedAt,
  "bodyPreview": pt::text(body)[0...120],
  "mainImage": mainImage.asset->{
    _id,
    metadata {
      lqip
    }
  }
}`;

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // 2. State to track which images have finished loading
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    client.fetch(BLOG_POSTS_QUERY).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const handleImageLoad = (slug) => {
    setLoadedImages((prev) => ({ ...prev, [slug]: true }));
  };

  if (loading) return (
    <div className="loader-container">
      <div className="pulse"></div>
      <p>Discovering Ethiopia...</p>
    </div>
  );

  return (
    <section className="blog-section">
      <div className="max-container">
        <header className="blog-header">
          <span className="subtitle">The Great Rift Valley & Beyond</span>
          <h1>Ethiopia Chronicles</h1>
          <div className="header-line"></div>
        </header>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.slug.current} className="post-card">
              <div 
                className="image-container"
                style={{
                  // 3. Set the tiny blurred image as a background immediately
                  backgroundImage: `url(${post.mainImage?.metadata?.lqip})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <Link to={`/blog/${post.slug.current}`}>
                  {post.mainImage && (
                    <img 
                      src={urlFor(post.mainImage._id).width(800).quality(80).url()} 
                      alt={post.title}
                      // 4. Toggle class based on loading state
                      className={`card-image ${loadedImages[post.slug.current] ? 'is-loaded' : 'is-loading'}`}
                      onLoad={() => handleImageLoad(post.slug.current)}
                      loading="lazy"
                    />
                  )}
                </Link>
                <div className="card-date">
                   {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
              
              <div className="card-content">
                <span className="category-tag">Cultural Heritage</span>
                <Link to={`/blog/${post.slug.current}`} className="post-title">
                  {post.title}
                </Link>
                <p className="post-excerpt">{post.bodyPreview}...</p>
                <Link to={`/blog/${post.slug.current}`} className="read-more-link">
                  Continue Reading
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;