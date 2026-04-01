import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { 
  Mail, Phone, Send, Loader2, 
  CheckCircle, User, Globe, Users, PenTool 
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { client, writeClient } from "../sanityClient";

import "./contacts.css";

export default function Contact() {
  const form = useRef();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [tours, setTours] = useState([]);
  const [isLoadingTours, setIsLoadingTours] = useState(true);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    tour_interest: "custom",
    contact_method: "Email", 
    guests: "",
    message: ""
  });

  // 1. Fetch Tours for Dropdown
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const query = `*[_type == "tour"] { _id, title } | order(title asc)`;
        const data = await client.fetch(query);
        setTours(data || []);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setIsLoadingTours(false);
      }
    };
    fetchTours();
  }, []);

  // 2. Handle Logic from Navigation (e.g., clicking "Inquire" on a Tour page)
  useEffect(() => {
    if (location.state?.tour) {
      setFormData(prev => ({ ...prev, tour_interest: location.state.tour }));
    }
    window.scrollTo(0, 0);
  }, [location]);

  // 3. Form Validation
  const validateField = (name, value) => {
    switch (name) {
      case 'user_name':
        return value.trim().length < 2 ? "Name must be at least 2 characters" : "";
      case 'user_email':
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Please enter a valid email address";
      case 'user_phone':
        return value.trim().length < 8 ? "Phone number is required" : "";
      case 'guests':
        return !value || Number(value) < 1 ? "At least 1 traveler required" : "";
 
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = 
    Object.values(formErrors).every(err => err === "" || err === undefined) &&
    formData.user_name.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(formData.user_email) &&
    formData.user_phone.trim().length >= 8 &&
    Number(formData.guests) >= 1 

  const filledFields = Object.values(formData).filter(value => String(value).trim() !== "").length;
  const progress = (filledFields / 7) * 100;

  // 4. Form Submission Handler
  const sendEmail = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      // Step A: Send Email via EmailJS
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      
      // Step B: Log Inquiry in Sanity
      await writeClient.create({
        _type: 'contactInquiry',
        userName: formData.user_name,
        userEmail: formData.user_email,
        userPhone: formData.user_phone,
        tourInterest: formData.tour_interest,
        contactMethod: formData.contact_method, 
        guests: parseInt(formData.guests) || 1,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });

      // Step C: Update UI and Scroll to Top
      setIsSubmitting(false);
      setSubmitted(true);
      
      // SCROLL TO TOP: Ensures user sees the success message
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again or use WhatsApp!");
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-viewport">
        <Helmet><title>Inquiry Received | Travel Ethiopia</title></Helmet>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="contact-card success-card text-center max-w-2xl mx-auto py-20"
        >
          <CheckCircle size={80} className="mx-auto text-[#fbbf24] mb-6" />
          <h1 className="contact-title text-3xl font-bold">Your <span className="highlight">Journey</span> Begins!</h1>
          <p className="contact-description text-gray-400 mt-4">
            Request received! We'll contact you via <strong>{formData.contact_method}</strong> soon to finalize your itinerary.
          </p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({
                user_name: "", user_email: "", user_phone: "",
                tour_interest: "custom", contact_method: "Email",
                guests: "", message: ""
              });
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
      <Helmet><title>Contact | Travel Ethiopia</title></Helmet>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[5px] bg-white/5 z-[10001]">
        <motion.div animate={{ width: `${progress}%` }} className="h-full bg-[#fbbf24] shadow-[0_0_15px_#fbbf24]" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="contact-card max-w-4xl mx-auto py-20 px-4">
        <header className="text-center mb-12">
          <span className="text-[#fbbf24] uppercase tracking-[0.3em] text-[0.65rem] font-black">Request a Quote</span>
          <h1 className="text-4xl md:text-6xl font-black mt-4">Craft Your <span className="highlight">Ethiopian Odyssey</span></h1>
        </header>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-[#fbbf24] font-bold flex items-center gap-2"><User size={14}/> Name</label>
              <input type="text" name="user_name" value={formData.user_name} onChange={handleInputChange} placeholder="Full Name" className="premium-input" />
              {formErrors.user_name && <p className="error-text">{formErrors.user_name}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-[#fbbf24] font-bold flex items-center gap-2"><Mail size={14}/> Email</label>
              <input type="email" name="user_email" value={formData.user_email} onChange={handleInputChange} placeholder="Email Address" className="premium-input" />
              {formErrors.user_email && <p className="error-text">{formErrors.user_email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-[#fbbf24] font-bold flex items-center gap-2"><Phone size={14}/> Phone/WhatsApp</label>
              <input type="tel" name="user_phone" value={formData.user_phone} onChange={handleInputChange} placeholder="+..." className="premium-input" />
              {formErrors.user_phone && <p className="error-text">{formErrors.user_phone}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase text-[#fbbf24] font-bold flex items-center gap-2"><Globe size={14}/> Tour Interest</label>
              <select name="tour_interest" value={formData.tour_interest} onChange={handleInputChange} className="premium-input w-full">
                <option value="custom" className="bg-black">Tailor-Made Expedition</option>
                {tours.map(t => <option key={t._id} value={t.title} className="bg-black">{t.title}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
            <label className="text-xs uppercase text-[#fbbf24] font-bold">Preferred Contact Method</label>
            <div className="flex flex-wrap gap-6">
              {['Email', 'WhatsApp', 'Phone Call'].map((method) => (
                <label key={method} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white">
                  <input 
                    type="radio" 
                    name="contact_method" 
                    value={method} 
                    checked={formData.contact_method === method} 
                    onChange={handleInputChange} 
                    
                    className="accent-[#fbbf24] addm"
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 flex flex-col gap-2">
              <label className="text-xs uppercase text-[#fbbf24] font-bold flex items-center gap-2"><Users size={14}/> Guests</label>
              <input type="number" name="guests" value={formData.guests} onChange={handleInputChange} className="premium-input" />
              {formErrors.guests && <p className="error-text">{formErrors.guests}</p>}
            </div>
            <div className="md:col-span-3 flex flex-col gap-2">
              <label className="text-xs uppercase text-[#fbbf24] font-bold flex items-center gap-2"><PenTool size={14}/> Message</label>
              <textarea name="message" value={formData.message} rows={3} onChange={handleInputChange} className="premium-input resize-none" placeholder="Share any specific requirements or dates..."></textarea>
              {formErrors.message && <p className="error-text">{formErrors.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="submit-btn w-full py-6 rounded-xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 border transition-all"
            style={{
              background: isFormValid ? '#fbbf24' : '#1f2937',
              color: isFormValid ? '#020617' : '#9ca3af',
              borderColor: isFormValid ? '#fbbf24' : 'transparent',
              cursor: isFormValid ? 'pointer' : 'not-allowed'
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Finalizing...</span>
            ) : (
              <><Send size={18} /> Send Request</>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}