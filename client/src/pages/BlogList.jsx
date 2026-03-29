import React, { useEffect, useState } from 'react';
import { client } from '../sanityClient'; 
import { Link } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import './bloglist.css'; 
import { Helmet } from 'react-helmet-async'; // ADDED

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).auto('format');

const BLOG_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  title,
  slug,
  publishedAt,
  "bodyPreview": pt::text(body)[0...120],
  "mainImage": mainImage.asset->{
    _id,
    url, // Added URL for OG image
    metadata {
      lqip
    }
  }
}`;

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
      {/* --- SEO & SOCIAL OPTIMIZATION --- */}
      <Helmet>
        <title>Ethiopia Chronicles | Travel Ethiopia Blog</title>
        <meta name="description" content="Explore stories of culture, history, and hidden landscapes in the Great Rift Valley. Your ultimate guide to authentic Ethiopian expeditions." />
        <link rel="canonical" href="https://travelethiopia.com/blog" />

        {/* Telegram / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ethiopia Chronicles - Official Travel Blog" />
        <meta property="og:description" content="Dive into the heart of the Horn of Africa with expert travel journals and cultural guides." />
        <meta property="og:url" content="https://travelethiopia.com/blog" />
        {/* Use the image from your first/latest post as the "cover" for the blog list */}
        {posts[0]?.mainImage && (
          <meta property="og:image" content={urlFor(posts[0].mainImage._id).width(1200).height(630).url()} />
        )}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ethiopia Chronicles Blog" />
      </Helmet>

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