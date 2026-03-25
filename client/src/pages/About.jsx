import React, { useEffect, useRef } from "react";
import "./About.css";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // GSAP Counter Animation for Stats
    const ctx = gsap.context(() => {
      const stats = gsap.utils.toArray(".stat-num");
      
      stats.forEach((stat) => {
        const target = parseInt(stat.innerText);
        gsap.fromTo(stat, 
          { innerText: 0 }, 
          { 
            innerText: target, 
            duration: 2, 
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse" 
            }
          }
        );
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  // Framer Motion Variants
  const revealSide = (direction) => ({
    hidden: { opacity: 0, x: direction === "left" ? -50 : 50, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 } 
    }
  };

  return (
    <div className="about-page" style={{ backgroundColor: "#020617", color: "white", overflow: "hidden" }}>
      
      {/* --- Section 1: Hero Header --- */}
      <section className="about-hero" style={{ padding: "120px 20px", textAlign: "center", background: "linear-gradient(to bottom, #0f172a, #020617)" }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="about-hero-content"
        >
          <span className="subtitle" style={{ color: "#fbbf24", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "bold" }}>Our Story</span>
          <h1 className="title" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: "900", margin: "20px 0" }}>
            Preserving the Soul of <span className="highlight" style={{ color: "#fbbf24" }}>Ethiopia</span>
          </h1>
          <p className="description" style={{ maxWidth: "700px", margin: "0 auto", color: "#94a3b8", fontSize: "1.1rem", lineHeight: "1.8" }}>
            We are more than a travel agency. We are storytellers, mountain guides, 
            and keepers of ancient history.
          </p>
        </motion.div>
      </section>

      {/* --- Section 2: Our Mission --- */}
      <section className="mission-section" style={{ padding: "100px 20px" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="mission-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
            
            <motion.div 
              variants={revealSide("left")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="mission-text"
            >
              <h2 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Why We Do What We Do</h2>
              <p style={{ color: "#94a3b8", marginBottom: "20px", lineHeight: "1.8" }}>
                Founded in the heart of Addis Ababa, our mission is to provide 
                authentic, sustainable, and transformative travel experiences. 
              </p>
              
              <div className="stats-grid" ref={statsRef} style={{ display: "flex", gap: "30px", marginTop: "40px" }}>
                <div className="stat-item">
                  <span className="stat-num" style={{ fontSize: "2.5rem", fontWeight: "900", color: "#fbbf24", display: "block" }}>10</span>
                  <span className="stat-label" style={{ color: "#94a3b8", fontSize: "0.8rem", textTransform: "uppercase" }}>Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num" style={{ fontSize: "2.5rem", fontWeight: "900", color: "#fbbf24", display: "block" }}>500</span>
                  <span className="stat-label" style={{ color: "#94a3b8", fontSize: "0.8rem", textTransform: "uppercase" }}>Guided Tours</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={revealSide("right")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="mission-image"
            >
              <img 
                src="https://images.unsplash.com/photo-1523438097201-512ae7d59c44?auto=format&fit=crop&w=800" 
                alt="Ethiopian Landscape" 
                style={{ width: "100%", borderRadius: "30px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Section 3: Values --- */}
      <section className="values-section" style={{ padding: "100px 20px", backgroundColor: "rgba(255,255,255,0.02)" }}>
        <div className="container text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="section-title" 
            style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "60px" }}
          >
            Our Core Values
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="values-grid" 
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}
          >
            {[
              { icon: "🌍", title: "Authenticity", desc: "No tourist traps. We take you to the real Ethiopia." },
              { icon: "🤝", title: "Community", desc: "We work directly with local tribes to ensure benefits for all." },
              { icon: "🛡️", title: "Safety First", desc: "Expert guides and 24/7 support for your peace of mind." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                variants={cardVariants}
                className="value-card" 
                style={{ background: "#0f172a", padding: "40px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="icon" style={{ fontSize: "3rem", marginBottom: "20px" }}>{value.icon}</div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>{value.title}</h3>
                <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;