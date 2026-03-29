import React, { useEffect, useState } from 'react';
import { client } from '../sanityClient'; 
import { Link } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import { motion } from 'framer-motion'; 
import './bloglist.css';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);
const BLOG_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) [0...3] {
  title,
  slug,
  mainImage,
  publishedAt,
  "bodyPreview": pt::text(body)[0...120]
}`;

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(BLOG_POSTS_QUERY).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.215, 0.61, 0.355, 1] 
      } 
    }
  };

  if (loading) return <div className="loading-state">Exploring Ethiopia...</div>;

  return (
    <section className="blog-section">
      <div className="max-container">
        
        {/* Animated Header */}
        <motion.header 
          className="blog-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="">Traveler's Guide to Ethiopia</h1>
          <p className="font-inter uppercase tracking-widest text-xs opacity-60">
            Expert insights and cultural stories for your next journey.
          </p>
        </motion.header>

        {/* Animated Grid */}
        <motion.div 
          className="blog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }} 
        >
          {posts.map((post) => (
            <motion.article 
              key={post.slug.current} 
              className="post-card group"
              variants={cardVariants}
              whileHover={{ y: -10 }} // Subtle lift on hover
            >
              <Link to={`/blog/${post.slug.current}`} className="image-wrapper overflow-hidden">
                {post.mainImage && (
                  <motion.img 
                    src={urlFor(post.mainImage).width(600).url()} 
                    alt={post.title}
                    className="card-image transition-transform duration-700 group-hover:scale-110"
                  />
                )}
              </Link>
              
              <div className="card-content">
                <span className="category-tag">Destination Guide</span>
                <Link to={`/blog/${post.slug.current}`} className="post-title font-inter font-bold">
                  {post.title}
                </Link>
                <p className="post-excerpt">{post.bodyPreview}...</p>
                <Link to={`/blog/${post.slug.current}`} className="read-more-btn font-bold">
                  Read Article <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogList;