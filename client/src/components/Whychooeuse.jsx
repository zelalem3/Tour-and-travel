import React, { useEffect, useRef } from 'react';
import './WhyChooseUs.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const cards = [
    { icon: "🌍", title: "Local Experts", description: "Real Ethiopian guides who were born here and love showing you secret places." },
    { icon: "🛡️", title: "Safe & Responsible", description: "Sustainable practices and 24/7 support. We handle the logistics." },
    { icon: "💰", title: "Best Possible Value", description: "Transparent pricing with no hidden fees. Tailor-made journeys." }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. SELECT ALL ANIMATE WORDS
      const words = gsap.utils.toArray(".animate-word");

      // 2. THE FLIP REVEAL (Enhanced for Repeatability)
      gsap.fromTo(words, 
        { 
          opacity: 0, 
          rotateX: -100, // Slightly more aggressive tilt
          y: 50,
          transformOrigin: "50% 0%" 
        },
        { 
          opacity: 1, 
          rotateX: 0, 
          y: 0, 
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%", // Start when top of title hits 90% of screen
            end: "bottom 10%", // Reset when bottom of title hits 10% of screen
            toggleActions: "play reverse restart reverse", // ✅ The magic string for repeat
            // markers: true, // Uncomment this line to see the trigger points during development
          }
        }
      );

      // 3. CARDS ANIMATION
      gsap.fromTo(".why-card", 
        { opacity: 0, scale: 0.9, y: 40 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".card-grid",
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <section className="why-section" id="why-us" ref={sectionRef} style={{ background: '#020617', padding: '100px 20px' }}>
      <div className="container" style={{ perspective: '1200px' }}> 
        
        <header className="section-header" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="title" ref={titleRef} style={{ color: '#fff', fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: '900', lineHeight: 1.2 }}>
            {"Why Travelers Love Us".split(" ").map((word, i) => (
              <span 
                key={i} 
                className="animate-word" 
                style={{ 
                  display: 'inline-block', 
                  marginRight: '0.35em',
                  backfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d' // Vital for the 3D rotation look
                }}
              >
                {word === "Us" ? <span style={{ color: '#fbbf24' }}>{word}</span> : word}
              </span>
            ))}
          </h2>
          
          {/* Animated Underline */}
          <motion.div 
             initial={{ scaleX: 0 }}
             whileInView={{ scaleX: 1 }}
             viewport={{ once: false }}
             transition={{ duration: 1, delay: 0.5 }}
             style={{ height: '4px', width: '80px', background: '#fbbf24', margin: '30px auto', borderRadius: '10px' }}
          />
        </header>

        <div className="card-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '30px',
          maxWidth: '1250px',
          margin: '0 auto'
        }}>
          {cards.map((card, index) => (
            <div key={index} className="why-card" style={{ 
              background: 'rgba(255, 255, 255, 0.02)', 
              padding: '50px 30px', 
              borderRadius: '32px', 
              border: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '3.8rem', marginBottom: '25px' }}>{card.icon}</div>
              <h3 style={{ color: '#fff', fontSize: '1.7rem', marginBottom: '18px', fontWeight: '800' }}>{card.title}</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '1.05rem' }}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;