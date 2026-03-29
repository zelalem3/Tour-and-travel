import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import { FiClock } from "react-icons/fi";
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

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).auto('format');

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
    // Added 'excerpt' to the query to ensure SEO descriptions work
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
      <div className="loading-screen">
        <div className="compass-loader"></div>
        <p>Mapping your route...</p>
      </div>
    );
  }

  // --- CRITICAL SEO VARIABLE DEFINITIONS ---
  const shareUrl = window.location.href;
  const shareTitle = `${post.title} | Travel Ethiopia`;
  const shareDesc = post.excerpt || "Discover the hidden wonders of Ethiopia through our expert travel journals.";
  const shareImg = post.mainImage 
    ? urlFor(post.mainImage._id).width(1200).height(630).url() 
    : "";

  return (
    <article className="post-view">
      <Helmet>
        <title>{shareTitle}</title>
        <meta name="description" content={shareDesc} />
        <link rel="canonical" href={shareUrl} />

        {/* Open Graph / Telegram / WhatsApp / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={shareTitle} />
        <meta property="og:description" content={shareDesc} />
        <meta property="og:image" content={shareImg} />
        <meta property="og:site_name" content="Travel Ethiopia" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={shareTitle} />
        <meta name="twitter:description" content={shareDesc} />
        <meta name="twitter:image" content={shareImg} />

        {/* Metadata for Articles */}
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content="Travel Ethiopia" />
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
            <time>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </time>
          </div>
        </header>

        {post.mainImage && (
          <div 
            className="hero-image-container blur-container"
            style={{ 
              backgroundImage: `url(${post.mainImage.metadata.lqip})`,
              backgroundSize: 'cover' 
            }}
          >
            <img
              src={urlFor(post.mainImage._id).width(1600).quality(85).url()}
              alt={post.title}
              className={`full-hero-image ${heroLoaded ? 'is-loaded' : 'is-loading'}`}
              fetchpriority="high"
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
                {/* Facebook Share */}
                <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} className="social-icon facebook" target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>
                {/* Twitter Share */}
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(post.title)}`} className="social-icon twitter" target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
                {/* Telegram Share - NOW WORKING */}
                <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} className="social-icon telegram" target="_blank" rel="noreferrer">
                  <FaTelegramPlane />
                </a>
                <a href="https://www.instagram.com/travelethiopia/" className="social-icon instagram" target="_blank" rel="noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://www.tiktok.com/@travelethiopia" className="social-icon tiktok" target="_blank" rel="noreferrer">
                  <FaTiktok />
                </a>
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