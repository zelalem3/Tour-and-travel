import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { Mail, Phone, MessageSquare, Send, MapPin, Loader2, CheckCircle, User, Globe, Users, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { writeClient } from "../sanityClient"; 
import "./contacts.css";

export default function Contact() {
  const form = useRef();
  const location = useLocation();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    tour_interest: "custom", // Matches the select 'name' attribute
    guests: "",
    message: ""
  });

  // Calculate form completion for the progress bar
  const filledFields = Object.values(formData).filter(value => String(value).trim() !== "").length;
  const progress = (filledFields / 6) * 100;

  useEffect(() => {
    // If coming from a specific Destination/Tour page via state
    if (location.state?.tour) {
      setFormData(prev => ({ ...prev, tour_interest: location.state.tour }));
    }
    window.scrollTo(0, 0);
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    
    if (filledFields < 6) {
      alert("Please provide all details so we can craft your perfect journey.");
      return;
    }

    setIsSubmitting(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID; 
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      // 1. Send via EmailJS (Client notification)
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);

      // 2. Save to Sanity (Database record)
      await writeClient.create({
        _type: 'contactInquiry',
        userName: formData.user_name,
        userEmail: formData.user_email,
        userPhone: formData.user_phone,
        tourInterest: formData.tour_interest,
        guests: parseInt(formData.guests),
        message: formData.message,
        createdAt: new Date().toISOString(),
      });

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Connection to Addis interrupted. Please try our WhatsApp link below!");
      setIsSubmitting(false);
    }
  };

  const containerVars = { 
    hidden: { opacity: 0 }, 
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } 
  };
  
  const itemVars = { 
    hidden: { opacity: 0, y: 20 }, 
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
  };

  if (submitted) {
    return (
      <div className="contact-viewport">
        <Helmet>
          <title>Inquiry Received | Travel Ethiopia</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
          className="contact-card success-card text-center"
        >
          <CheckCircle size={80} className="mx-auto text-[#fbbf24] mb-6" />
          <h1 className="contact-title text-3xl font-bold">Your <span className="highlight">Journey</span> Begins!</h1>
          <p className="contact-description text-gray-400 mt-4 max-w-md mx-auto">
            We've received your inquiry for the <strong>{formData.tour_interest}</strong>. 
            An expedition expert will reach out via email or WhatsApp within 24 hours.
          </p>
          <button onClick={() => setSubmitted(false)} className="submit-btn mt-8 px-8 py-4 bg-[#fbbf24] text-[#020617] font-bold rounded-xl">
            Plan Another Adventure
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="contact-viewport">
      {/* --- SEO & SOCIAL OPTIMIZATION --- */}
      <Helmet>
        <title>Craft Your Ethiopian Odyssey | Contact Travel Ethiopia</title>
        <meta name="description" content="Connect with our local experts to design a tailor-made journey through Lalibela, the Simien Mountains, or the Omo Valley." />
        <link rel="canonical" href="https://travelethiopia.com/contact" />
        
        {/* Open Graph for Telegram/WhatsApp/FB */}
        <meta property="og:title" content="Start Your Ethiopian Journey | Travel Ethiopia" />
        <meta property="og:description" content="Request a private, tailor-made itinerary from our expert local guides." />
        <meta property="og:url" content="https://travelethiopia.com/contact" />
        <meta property="og:image" content="https://travelethiopia.com/og-contact.jpg" /> 
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Progress Bar */}
      <div className="progress-bar-container h-1 bg-white/5 fixed top-0 left-0 w-full z-50">
        <motion.div 
          animate={{ width: `${progress}%` }} 
          className="progress-bar-fill h-full bg-[#fbbf24] shadow-[0_0_10px_#fbbf24]" 
        />
      </div>

      <motion.div variants={containerVars} initial="hidden" animate="show" className="contact-card max-w-4xl mx-auto py-20 px-4">
        <motion.div variants={itemVars} className="contact-header text-center mb-12">
          <span className="contact-subtitle text-[#fbbf24] uppercase tracking-[0.3em] text-[0.65rem] font-black">Expert-Led Expeditions</span>
          <h1 className="contact-title text-4xl md:text-6xl font-black mt-4 leading-tight">
            Craft Your <span className="highlight">Ethiopian Odyssey</span>
          </h1>
          <p className="contact-description text-gray-400 mt-4 text-lg">Tell us your vision, and we'll handle the logistics.</p>
        </motion.div>

        <form ref={form} onSubmit={sendEmail} className="contact-form space-y-6">
          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-bold"><User size={14}/> Adventurer Name</label>
              <input type="text" name="user_name" value={formData.user_name} placeholder="Enter your full name" onChange={handleInputChange} required className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] focus:shadow-[0_0_20px_rgba(251,191,36,0.05)] transition-all outline-none" />
            </motion.div>
            <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-bold"><Mail size={14}/> Email Address</label>
              <input type="email" name="user_email" value={formData.user_email} placeholder="Where should we send the quote?" onChange={handleInputChange} required className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none" />
            </motion.div>
          </div>

          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-bold"><Phone size={14}/> WhatsApp / Phone</label>
              <input type="tel" name="user_phone" value={formData.user_phone} placeholder="+..." onChange={handleInputChange} required className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none" />
            </motion.div>
            <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-bold"><Globe size={14}/> Primary Destination</label>
              <select name="tour_interest" value={formData.tour_interest} onChange={handleInputChange} className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none appearance-none">
                <option value="custom" className="bg-[#020617]">Tailor-Made Journey</option>
                <option value="Lalibela Adventure" className="bg-[#020617]">Lalibela (Rock-Hewn Churches)</option>
                <option value="Simien Mountains Trek" className="bg-[#020617]">Simien Mountains (Roof of Africa)</option>
                <option value="Danakil Depression Tour" className="bg-[#020617]">Danakil (The Salt Desert)</option>
                <option value="Omo Valley Cultural" className="bg-[#020617]">Omo Valley (Ancient Cultures)</option>
              </select>
            </motion.div>
          </div>

          <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
            <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-bold"><Users size={14}/> Group Size</label>
            <input type="number" name="guests" value={formData.guests} min="1" placeholder="How many travelers?" onChange={handleInputChange} required className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none" />
          </motion.div>

          <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
            <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 font-bold"><PenTool size={14}/> Expedition Details</label>
            <textarea name="message" value={formData.message} rows={4} placeholder="Describe your dream trip (dates, interests, requirements)..." onChange={handleInputChange} required className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none resize-none"></textarea>
          </motion.div>

          <motion.button 
            variants={itemVars}
            whileHover={{ scale: progress === 100 ? 1.02 : 1 }} 
            whileTap={{ scale: progress === 100 ? 0.98 : 1 }}
            type="submit" 
            disabled={isSubmitting}
            className="submit-btn w-full py-6 rounded-xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3"
            style={{ 
              background: progress === 100 ? '#fbbf24' : 'rgba(255,255,255,0.03)', 
              color: progress === 100 ? '#020617' : '#475569',
              cursor: progress === 100 ? 'pointer' : 'not-allowed'
            }}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <><Send size={18} /> Request Private Itinerary</>
            )}
          </motion.button>
        </form>

        <motion.div variants={itemVars} className="contact-footer flex flex-wrap justify-center gap-8 mt-16 text-gray-500 text-sm font-medium">
          <div className="info-item flex items-center gap-2 hover:text-[#fbbf24] transition-colors"><Mail size={16}/> hello@travelethiopia.com</div>
          <div className="info-item flex items-center gap-2 hover:text-[#fbbf24] transition-colors"><MessageSquare size={16}/> +251 911 22 33 44</div>
          <div className="info-item flex items-center gap-2"><MapPin size={16}/> Addis Ababa, Ethiopia</div>
        </motion.div>
      </motion.div>

      {/* Floating WhatsApp Button */}
     <motion.a 
  href="https://wa.me/251911223344"
  target="_blank"
  rel="noreferrer"
  initial={{ scale: 0, rotate: -45 }} 
  animate={{ scale: 1, rotate: 0 }} 
  whileHover={{ scale: 1.1 }}
  className="whatsapp-float fixed bottom-7 right-7 bg-[#25D366] p-4 rounded-full shadow-[0_6px_20px_rgba(37,211,102,0.25)] z-50 text-white"
>
  <MessageSquare size={20} />
</motion.a>
    </div>
  );
}