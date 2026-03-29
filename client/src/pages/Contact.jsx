import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { Mail, Phone, MessageSquare, Send, MapPin, Loader2, CheckCircle, User, Globe, Users, PenTool } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { writeClient } from "../sanityClient"; 
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

  const sendEmail = async (e) => {
    e.preventDefault();
    if (filledFields < 5) {
      alert("Almost there! Please fill in all details so we can craft your perfect journey.");
      return;
    }
    setIsSubmitting(true);

   
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID; 
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
     
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);

      
      await writeClient.create({
        _type: 'contactInquiry',
        userName: formData.user_name,
        userEmail: formData.user_email,
        userPhone: formData.user_phone,
        tourInterest: selectedTour,
        guests: parseInt(formData.guests),
        message: formData.message,
        createdAt: new Date().toISOString(),
      });

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Connection to Addis interrupted. Please try WhatsApp!");
      setIsSubmitting(false);
    }
  };


  const containerVars = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };
  const itemVars = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

  if (submitted) {
    return (
      <div className="contact-viewport">
        <Helmet>
          <title>Success | Journey to Ethiopia Begins</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="contact-card success-card">
          <CheckCircle size={80} className="success-icon text-[#fbbf24]" />
          <h1 className="contact-title text-3xl font-bold mt-4">Your <span className="highlight">Journey</span> Begins!</h1>
          <p className="contact-description text-gray-400 mt-2">
            We've received your inquiry for <strong>{selectedTour}</strong>. 
            A local expert will reach out within 24 hours.
          </p>
          <button onClick={() => setSubmitted(false)} className="submit-btn success-btn mt-6">
            Plan Another Adventure
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="contact-viewport">
      <Helmet>
        <title>Craft Your Ethiopian Odyssey | Contact TravelEthiopia</title>
        <meta name="description" content="Ready for an adventure? Contact our experts to plan your itinerary to Lalibela, the Simien Mountains, or the Omo Valley." />
        <link rel="canonical" href="https://travelethiopia.com/contact" />
      </Helmet>
      
      <div className="progress-bar-container h-1 bg-white/5 fixed top-0 left-0 w-full z-50">
        <motion.div animate={{ width: `${progress}%` }} className="progress-bar-fill h-full bg-[#fbbf24]" />
      </div>

      <motion.div variants={containerVars} initial="hidden" animate="show" className="contact-card max-w-4xl mx-auto py-20 px-4">
        <motion.div variants={itemVars} className="contact-header text-center mb-12">
          <span className="contact-subtitle text-[#fbbf24] uppercase tracking-widest text-xs font-bold">Expert-Led Expeditions</span>
          <h1 className="contact-title text-4xl md:text-6xl font-black mt-2">
            Craft Your <span className="highlight">Ethiopian Odyssey</span>
          </h1>
          <p className="contact-description text-gray-400 mt-4">Tell us your vision, and we'll handle the logistics.</p>
        </motion.div>

        <form ref={form} onSubmit={sendEmail} className="contact-form space-y-6">
          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-300"><User size={14}/> Adventurer Name</label>
              <input type="text" name="user_name" placeholder="Enter your full name" onChange={handleInputChange} required className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none" />
            </motion.div>
            <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-300"><Mail size={14}/> Email Address</label>
              <input type="email" name="user_email" placeholder="Where should we send the quote?" onChange={handleInputChange} required className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none" />
            </motion.div>
          </div>

          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-300"><Phone size={14}/> WhatsApp / Phone</label>
              <input type="tel" name="user_phone" placeholder="+251 ..." onChange={handleInputChange} required className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none" />
            </motion.div>
            <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-300"><Globe size={14}/> Primary Destination</label>
              <select name="tour_interest" value={selectedTour} onChange={(e) => setSelectedTour(e.target.value)} className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none">
                <option value="custom">Tailor-Made Journey</option>
                <option value="Lalibela Adventure">Lalibela (Rock-Hewn Churches)</option>
                <option value="Simien Mountains Trek">Simien Mountains (Roof of Africa)</option>
                <option value="Danakil Depression Tour">Danakil (The Salt Desert)</option>
                <option value="Omo Valley Cultural">Omo Valley (Ancient Cultures)</option>
              </select>
            </motion.div>
          </div>

          <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-300"><Users size={14}/> Group Size</label>
            <input type="number" name="guests" min="1" placeholder="How many travelers?" onChange={handleInputChange} required className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none" />
          </motion.div>

          <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-300"><PenTool size={14}/> Expedition Details</label>
            <textarea name="message" rows={4} placeholder="Describe your dream trip..." onChange={handleInputChange} required className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none resize-none"></textarea>
          </motion.div>

          <motion.button 
            variants={itemVars}
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={isSubmitting}
            className="submit-btn w-full py-5 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            style={{ 
              background: progress === 100 ? '#fbbf24' : 'rgba(255,255,255,0.05)', 
              color: progress === 100 ? '#020617' : '#64748b'
            }}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Request Your Private Itinerary</>}
          </motion.button>
        </form>

        <motion.div variants={itemVars} className="contact-footer flex flex-wrap justify-center gap-8 mt-16 text-gray-400 text-sm">
          <div className="info-item flex items-center gap-2"><Mail size={16}/> hello@travelethiopia.com</div>
          <div className="info-item flex items-center gap-2"><MessageSquare size={16}/> +251 911 22 33 44</div>
          <div className="info-item flex items-center gap-2"><MapPin size={16}/> Addis Ababa HQ</div>
        </motion.div>
      </motion.div>

      <motion.a 
        href="https://wa.me/251911223344" target="_blank"
        initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }}
        className="whatsapp-float fixed bottom-8 right-8 bg-[#25D366] p-4 rounded-full shadow-2xl z-50 text-white"
      >
        <MessageSquare size={24} />
      </motion.a>
    </div>
  );
}