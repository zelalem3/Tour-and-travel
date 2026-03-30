import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { 
  Mail, Phone, MessageSquare, Send, MapPin, Loader2, 
  CheckCircle, User, Globe, Users, PenTool, AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { writeClient } from "../sanityClient";

import "./contacts.css";

export default function Contact() {
  const form = useRef();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // --- NEW STATE FOR SANITY TOURS ---
  const [tours, setTours] = useState([]);
  const [isLoadingTours, setIsLoadingTours] = useState(true);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    tour_interest: "custom",
    guests: "",
    message: ""
  });

  // Fetch tours from Sanity on mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const query = `*[_type == "tour"] { _id, title } | order(title asc)`;
        const data = await writeClient.fetch(query);
        setTours(data);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setIsLoadingTours(false);
      }
    };
    fetchTours();
  }, []);

  const filledFields = Object.values(formData).filter(value => String(value).trim() !== "").length;
  const progress = (filledFields / 6) * 100;

  const validateField = (name, value) => {
    switch (name) {
      case 'user_name':
        return value.trim().length < 2 ? "Name must be at least 2 characters" : "";
      case 'user_email':
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Please enter a valid email address";
      case 'user_phone':
        return value.trim().length < 8 ? "Phone number is required" : "";
      case 'guests':
        return !value || parseInt(value) < 1 ? "At least 1 traveler required" : "";
      case 'message':
        return value.trim().length < 2 ? "Message must be at least 5 characters" : "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isFormValid = Object.keys(formErrors).length === 0 && 
    Object.values(formData).every(val => String(val).trim() !== "");

  useEffect(() => {
    if (location.state?.tour) {
      setFormData(prev => ({ ...prev, tour_interest: location.state.tour }));
    }
    window.scrollTo(0, 0);
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
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
        tourInterest: formData.tour_interest,
        guests: parseInt(formData.guests) || 1,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Connection interrupted. Please use the WhatsApp button to chat with us directly!");
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
        <Helmet><title>Inquiry Received | Travel Ethiopia</title></Helmet>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          className="contact-card success-card text-center"
        >
          <CheckCircle size={80} className="mx-auto text-[#fbbf24] mb-6" />
          <h1 className="contact-title text-3xl font-bold">Your <span className="highlight">Journey</span> Begins!</h1>
          <p className="contact-description text-gray-400 mt-4 max-w-md mx-auto">
            We've received your inquiry for the <strong>{formData.tour_interest}</strong>.
            An expedition expert will reach out within 24 hours.
          </p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({ user_name: "", user_email: "", user_phone: "", tour_interest: "custom", guests: "", message: "" });
              setFormErrors({});
            }} 
            className="submit-btn mt-8 px-8 py-4 bg-[#fbbf24] text-[#020617] font-bold rounded-xl"
          >
            Plan Another Adventure
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="contact-viewport">
      <Helmet>
        <title>Craft Your Ethiopian Odyssey | Contact Travel Ethiopia</title>
        <meta name="description" content="Connect with our local experts to design a tailor-made journey." />
      </Helmet>

      <div className="fixed top-0 left-0 w-full h-[5px] bg-white/5 z-[10001]" style={{ pointerEvents: 'none' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="h-full bg-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.6)]"
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
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#fbbf24] font-bold"><User size={14}/>  Name</label>
              <input type="text" name="user_name" value={formData.user_name} placeholder="Enter your full name" onChange={handleInputChange} className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none" />
              <AnimatePresence>{formErrors.user_name && <p className="text-red-400 text-sm mt-1">{formErrors.user_name}</p>}</AnimatePresence>
            </motion.div>
            <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#fbbf24] font-bold"><Mail size={14}/> Email Address</label>
              <input type="email" name="user_email" value={formData.user_email} placeholder="Where should we send the quote?" onChange={handleInputChange} className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none" />
              {formErrors.user_email && <p className="text-red-400 text-sm mt-1">{formErrors.user_email}</p>}
            </motion.div>
          </div>

          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#fbbf24] font-bold"><Phone size={14}/> WhatsApp / Phone</label>
              <input type="tel" name="user_phone" value={formData.user_phone} placeholder="+..." onChange={handleInputChange} className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none" />
              {formErrors.user_phone && <p className="text-red-400 text-sm mt-1">{formErrors.user_phone}</p>}
            </motion.div>
            <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#fbbf24] font-bold"><Globe size={14}/> Primary Destination</label>
              <div className="relative">
                <select 
                  name="tour_interest" 
                  value={formData.tour_interest} 
                  onChange={handleInputChange} 
                  className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none w-full appearance-none"
                  disabled={isLoadingTours}
                >
                  <option value="custom">Tailor-Made Journey</option>
                  {tours.map((tour) => (
                    <option key={tour._id} value={tour.title} className="bg-[#020617]">{tour.title}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#fbbf24]">▼</div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
            <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#fbbf24] font-bold"><Users size={14}/> Group Size</label>
            <input type="number" name="guests" value={formData.guests} min="1" placeholder="How many travelers?" onChange={handleInputChange} className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none" />
            {formErrors.guests && <p className="text-red-400 text-sm mt-1">{formErrors.guests}</p>}
          </motion.div>

          <motion.div variants={itemVars} className="form-group flex flex-col gap-2">
            <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#fbbf24] font-bold"><PenTool size={14}/> Expedition Details</label>
            <textarea name="message" value={formData.message} rows={4} placeholder="Describe your dream trip..." onChange={handleInputChange} className="premium-input bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#fbbf24] transition-all outline-none resize-none"></textarea>
            {formErrors.message && <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>}
          </motion.div>

          <motion.button
            variants={itemVars}
            whileHover={{ scale: isFormValid ? 1.02 : 1 }}
            whileTap={{ scale: isFormValid ? 0.98 : 1 }}
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="submit-btn w-full py-6 rounded-xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border"
            style={{
              background: isFormValid ? '#fbbf24' : '#1f2937',
              color: isFormValid ? '#020617' : '#9ca3af',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              boxShadow: isFormValid ? '0 0 20px rgba(251,191,36,0.6)' : 'none',
              borderColor: isFormValid ? 'transparent' : 'rgba(255,255,255,0.1)'
            }}
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Request Private Itinerary</>}
          </motion.button>
        </form>

        <motion.div variants={itemVars} className="contact-footer flex flex-wrap justify-center gap-8 mt-16 text-gray-500 text-sm font-medium">
          <div className="info-item flex items-center gap-2 hover:text-[#fbbf24] transition-colors"><Mail size={16}/> hello@travelethiopia.com</div>
          <div className="info-item flex items-center gap-2 hover:text-[#fbbf24] transition-colors"><MessageSquare size={16}/> +251 911 22 33 44</div>
          <div className="info-item flex items-center gap-2"><MapPin size={16}/> Addis Ababa, Ethiopia</div>
        </motion.div>
      </motion.div>

      <motion.a
        href="https://wa.me/251911223344"
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="whatsapp-float fixed bottom-7 right-7 bg-[#25D366] p-4 rounded-full shadow-[0_6px_20px_rgba(37,211,102,0.25)] z-50 text-white"
      >
        <MessageSquare size={20} />
      </motion.a>
    </div>
  );
}