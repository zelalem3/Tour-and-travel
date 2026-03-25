import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { Mail, Phone, MessageSquare, Send, MapPin, Loader2, CheckCircle, User, Globe, Users, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./contacts.css";

export default function Contact() {
  const form = useRef();
  const location = useLocation();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTour, setSelectedTour] = useState("custom");
  
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    guests: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filledFields = Object.values(formData).filter(value => value.trim() !== "").length;
  const progress = (filledFields / 5) * 100;

  useEffect(() => {
    if (location.state && location.state.tour) {
      setSelectedTour(location.state.tour);
    }
    window.scrollTo(0, 0);
  }, [location]);

  const sendEmail = (e) => {
    e.preventDefault();
    if (filledFields < 5) {
      alert("Almost there! Please fill in all details so we can craft your perfect journey.");
      return;
    }
    setIsSubmitting(true);

    const SERVICE_ID = "service_tc1igag"; 
    const TEMPLATE_ID = "template_rzluy3a";
    const PUBLIC_KEY = "DreoKBwj6n03jr4uh";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
          setIsSubmitting(false);
          setSubmitted(true);
      }, (error) => {
          alert("Connection to Addis interrupted. Please try WhatsApp!");
          setIsSubmitting(false);
      });
  };

  // Staggered Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (submitted) {
    return (
      <div className="contact-viewport">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="contact-card success-card"
        >
          <CheckCircle size={80} className="success-icon" style={{ color: '#fbbf24', margin: '0 auto 20px' }} />
          <h1 className="contact-title">Your Journey Begins!</h1>
          <p className="contact-description">
            We've received your inquiry for <strong>{selectedTour}</strong>. 
            A local expert will reach out within 24 hours to finalize your itinerary.
          </p>
          <button onClick={() => setSubmitted(false)} className="submit-btn">Plan Another Adventure</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="contact-viewport">
      
      {/* --- DYNAMIC PROGRESS BAR --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', zIndex: 1000 }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{ height: '100%', background: '#fbbf24', boxShadow: '0 0 15px #fbbf24' }}
        />
      </div>

      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="contact-card"
      >
        <motion.div variants={itemVars} className="contact-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="contact-subtitle">Expert-Led Expeditions</span>
          <h1 className="contact-title">
            Craft Your <span className="highlight">Ethiopian Odyssey</span>
          </h1>
          <p className="contact-description">Tell us your vision, and we'll handle the logistics across the Land of Origins.</p>
        </motion.div>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          
          <div className="form-row">
            <motion.div variants={itemVars} className="form-group">
              <label><User size={14}/> Adventurer Name</label>
              <input type="text" name="user_name" placeholder="Enter your full name" onChange={handleInputChange} required className="premium-input" />
            </motion.div>
            <motion.div variants={itemVars} className="form-group">
              <label><Mail size={14}/> Email</label>
              <input type="email" name="user_email" placeholder="where should we send the quote?" onChange={handleInputChange} required className="premium-input" />
            </motion.div>
          </div>

          <div className="form-row">
            <motion.div variants={itemVars} className="form-group">
              <label><Phone size={14}/> WhatsApp / Phone</label>
              <input type="tel" name="user_phone" placeholder="+251 ..." onChange={handleInputChange} required className="premium-input" />
            </motion.div>
            <motion.div variants={itemVars} className="form-group">
              <label><Globe size={14}/> Primary Destination</label>
              <select name="tour_interest" value={selectedTour} onChange={(e) => setSelectedTour(e.target.value)} className="premium-input custom-select">
                <option value="custom">Tailor-Made Journey</option>
                <option value="Lalibela Adventure">Lalibela (Rock-Hewn Churches)</option>
                <option value="Simien Mountains Trek">Simien Mountains (The Roof of Africa)</option>
                <option value="Danakil Depression Tour">Danakil (The Salt Desert & Volcanoes)</option>
                <option value="Omo Valley Cultural">Omo Valley (Ancient Cultures)</option>
              </select>
            </motion.div>
          </div>

          <motion.div variants={itemVars} className="form-group">
            <label><Users size={14}/> Group Size</label>
            <input type="number" name="guests" min="1" placeholder="How many travelers?" onChange={handleInputChange} required className="premium-input" />
          </motion.div>

          <motion.div variants={itemVars} className="form-group">
            <label><PenTool size={14}/> The Details</label>
            <textarea name="message" rows={4} placeholder="Describe your dream trip: dates, interests, or special requirements..." onChange={handleInputChange} required className="premium-input" style={{ resize: 'none' }}></textarea>
          </motion.div>

          <motion.button 
            variants={itemVars}
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={isSubmitting}
            className="submit-btn"
            style={{ 
              background: progress === 100 ? '#fbbf24' : '#1e293b', 
              color: progress === 100 ? '#020617' : '#94a3b8', 
            }}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Request Your Private Itinerary</>}
          </motion.button>
        </form>

        <motion.div variants={itemVars} className="contact-footer">
          <div className="info-item"><Mail size={16}/> hello@travelethiopia.com</div>
          <div className="info-item"><MessageSquare size={16}/> WhatsApp: +251 911 22 33 44</div>
          <div className="info-item"><MapPin size={16}/> Addis Ababa HQ</div>
        </motion.div>
      </motion.div>

      {/* --- FLOATING WHATSAPP --- */}
      <motion.a 
        href="https://wa.me/251911223344" target="_blank"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="whatsapp-float"
      >
        <MessageSquare size={20} /> Chat with a Guide
      </motion.a>
    </div>
  );
}