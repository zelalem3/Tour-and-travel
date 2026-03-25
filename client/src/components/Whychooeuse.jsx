import React, { useEffect, useRef } from 'react';
import './WhyChooseUs.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  const cards = [
    {
      icon: "🌍",
      title: "Local Experts",
      description: "Real Ethiopian guides who were born here and love showing you both famous landmarks and secret places most tourists never see."
    },
    {
      icon: "🛡️",
      title: "Safe & Responsible",
      description: "Sustainable practices that protect Ethiopia’s nature, plus 24/7 support. We handle the logistics so you can focus on the journey."
    },
    {
      icon: "💰",
      title: "Best Possible Value",
      description: "Transparent pricing with no hidden fees. Tailor-made journeys designed to maximize your budget for truly unforgettable moments."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title Animation (Split into words for a classy look)
      gsap.fromTo(".animate-word", 
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse" // ✅ This makes it happen again and again
          }
        }
      );

      // 2. Cards Animation
      gsap.fromTo(".why-card", 
        { opacity: 0, scale: 0.9, y: 50 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".card-grid",
            start: "top 80%",
            toggleActions: "play reverse play reverse" // ✅ Resets on scroll up
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <section className="why-section" id="why-us" ref={sectionRef} style={{ background: '#020617', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        
        <header className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="title" ref={titleRef} style={{ color: '#fff', fontSize: '3rem' }}>
            {/* Split title into words manually for GSAP stagger */}
            {"Why Travelers Love Us".split(" ").map((word, i) => (
              <span key={i} className="animate-word" style={{ display: 'inline-block', marginRight: '12px' }}>
                {word === "Us" ? <span style={{ color: '#fbbf24' }}>{word}</span> : word}
              </span>
            ))}
          </h2>
          <div className="underline" style={{ height: '4px', width: '60px', background: '#fbbf24', margin: '20px auto' }}></div>
        </header>

        <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {cards.map((card, index) => (
            <div key={index} className="why-card" style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              padding: '40px', 
              borderRadius: '24px', 
              border: '1px solid rgba(255, 255, 255, 0.1)' 
            }}>
              <div className="icon-wrapper" style={{ fontSize: '3rem', marginBottom: '20px' }}>{card.icon}</div>
              <h3 className="card-title" style={{ color: '#fff', marginBottom: '15px' }}>{card.title}</h3>
              <p className="card-text" style={{ color: '#94a3b8' }}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;