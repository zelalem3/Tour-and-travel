import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// 1. Import 'urlFor' from your shared client to fix the deprecation error
import { client, urlFor } from '../sanityClient'; 
import { PortableText } from '@portabletext/react';
import { FiClock } from "react-icons/fi";
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaTiktok, 
  FaTelegramPlane,
  FaArrowLeft 
} from "react-icons/fa";
import './BlogPost.css';
import { Helmet } from 'react-helmet-async';

// REMOVED: imageUrlBuilder and local urlFor definition from here

// Component for rendering images inside the blog body
const BodyImage = ({ value }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const lqip = value.asset?.metadata?.lqip;

  return (
    <figure className="article-figure">
      <div 
        className="blur-container" 
        style={{ backgroundImage: `url(${lqip})`, backgroundSize: 'cover' }}
      >
        <img
          // Using the shared urlFor helper
          src={urlFor(value).width(1000).quality(75).url()}
          alt={value.alt || "Ethiopia Travel"}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`body-img ${isLoaded ? 'is-loaded' : 'is-loading'}`}
        />
      </div>
      {value.caption && <figcaption>{value.caption}</figcaption>}
    </figure>
  );
};

const ptComponents = {
  types: {
    image: BodyImage,
  },
  block: {
    h2: ({ children }) => <h2 className="section-title">{children}</h2>,
    h3: ({ children }) => <h3 className="subsection-title">{children}</h3>,
    normal: ({ children }) => <p className="article-paragraph">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="editorial-quote">
        <span className="quote-mark">“</span>
        {children}
      </blockquote>
    ),
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      "mainImage": mainImage.asset->{
        _id,
        url,
        metadata { lqip }
      },
      publishedAt,
      body[]{
        ...,
        asset->{
          _id,
          metadata { lqip }
        }
      },
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }`;

    client.fetch(query, { slug }).then((data) => {
      setPost(data);
      window.scrollTo(0, 0);
    });
  }, [slug]);

  if (!post) {
    return (
     <motion.div 
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 0.8 } }}
      className="loading-screen"
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#020617',
        gap: '30px'
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Compass size={64} strokeWidth={1} />
      </motion.div>

      <div style={{ textAlign: 'center' }}>
        <motion.div 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ 
            fontSize: '0.75rem', 
            fontWeight: '900', 
            color: '#fbbf24', 
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}
        >
          Expedition Intelligence
        </motion.div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>
          MAPPING YOUR <span style={{ color: '#fbbf24' }}>ROUTE...</span>
        </div>
      </div>
    </motion.div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = `${post.title} | Travel Ethiopia`;
  const shareDesc = post.excerpt || "Discover the hidden wonders of Ethiopia.";
  const shareImg = post.mainImage 
    ? urlFor(post.mainImage._id).width(1200).height(630).url() 
    : "";

  return (
    <article className="post-view">
      <Helmet>
        <title>{shareTitle}</title>
        <meta name="description" content={shareDesc} />
        {/* Open Graph Tags */}
        <meta property="og:title" content={shareTitle} />
        <meta property="og:image" content={shareImg} />
      </Helmet>

      <div className="bg-glow-top"></div>

      <div className="article-wrapper">
        <nav className="article-nav">
          <Link to="/blog" className="back-link">
             <FaArrowLeft /> Back to Chronicles
          </Link>
          <div className="read-time-badge">
            <FiClock className="clock-icon" />
            {post.estimatedReadingTime || '5'} min read
          </div>
        </nav>

        <header className="post-header">
          <div className="category-pill">Discovery & Culture</div>
          <h1 className="post-hero-title">{post.title}</h1>
          <div className="post-meta-row">
            <span className="author">By Travel Ethiopia</span>
            <span className="dot"></span>
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
          </div>
        </header>

        {post.mainImage && (
          <div 
            className="hero-image-container blur-container"
            style={{ backgroundImage: `url(${post.mainImage.metadata.lqip})` }}
          >
            <img
              src={urlFor(post.mainImage._id).width(1600).quality(85).url()}
              alt={post.title}
              className={`full-hero-image ${heroLoaded ? 'is-loaded' : 'is-loading'}`}
              // FIX: fetchpriority -> fetchPriority (React camelCase)
              fetchPriority="high"
              loading="eager"
              onLoad={() => setHeroLoaded(true)}
            />
            <div className="image-overlay-vignette"></div>
          </div>
        )}

        <div className="content-layout">
          <aside className="social-share">
            <div className="sticky-sidebar">
              <div className="share-icons">
                <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} className="social-icon facebook" target="_blank" rel="noreferrer"><FaFacebookF /></a>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} className="social-icon twitter" target="_blank" rel="noreferrer"><FaTwitter /></a>
                <a href={`https://t.me/share/url?url=${shareUrl}`} className="social-icon telegram" target="_blank" rel="noreferrer"><FaTelegramPlane /></a>
                <a href="https://instagram.com/travelethiopia" className="social-icon instagram" target="_blank" rel="noreferrer"><FaInstagram /></a>
              </div>
            </div>
          </aside>
       
          <main className="article-main-content">
            <PortableText value={post.body} components={ptComponents} />
          </main>
        </div>

        <footer className="article-footer">
          <div className="cta-card">
            <div className="cta-content">
              <h3>Start Your Journey</h3>
              <p>Tailor-made expeditions to the heart of Ethiopia’s heritage.</p>
              <Link to="/contact" className="cta-button">Inquire Now</Link>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogPost;