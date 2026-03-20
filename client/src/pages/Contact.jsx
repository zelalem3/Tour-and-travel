import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser'; // 1. Import EmailJS
import { Mail, Phone, MessageSquare, Send, MapPin, Loader2, CheckCircle } from "lucide-react";
import "./contacts.css";

export default function Contact() {
  const form = useRef(); // 2. Create a ref for the form
  const location = useLocation();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTour, setSelectedTour] = useState("custom");

  useEffect(() => {
    if (location.state && location.state.tour) {
      setSelectedTour(location.state.tour);
    }
    window.scrollTo(0, 0);
  }, [location]);

  // 3. The EmailJS logic
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace these strings with your actual IDs from EmailJS
    const SERVICE_ID = "service_tc1igag"; 
    const TEMPLATE_ID = "template_rzluy3a";
    const PUBLIC_KEY = "DreoKBwj6n03jr4uh";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setIsSubmitting(false);
          setSubmitted(true);
      }, (error) => {
          console.log(error.text);
          alert("Something went wrong. Please try again or WhatsApp us directly.");
          setIsSubmitting(false);
      });
  };

  if (submitted) {
    return (
      <div className="contact-viewport flex items-center justify-center">
        <div className="contact-card text-center py-20 px-10">
          <CheckCircle size={60} className="text-[#fbbf24] mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-[#020617]">Journey Requested!</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Your inquiry for <strong>{selectedTour}</strong> has been sent to our Addis Ababa office. 
            We'll be in touch within 24 hours to start planning.
          </p>
          <button onClick={() => setSubmitted(false)} className="submit-btn max-w-xs mx-auto">
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-viewport">
      <section className="contact-section">
        <div className="contact-card">
          <div className="contact-header">
            <span className="contact-subtitle text-[#fbbf24] font-bold uppercase tracking-widest">Land of Origins</span>
            <h1 className="contact-title text-4xl font-black mt-2">
              Start Your <span className="highlight text-[#fbbf24]">Ethiopian Journey</span>
            </h1>
            <p className="contact-description text-gray-500 mt-4">
              Connect with our local travel designers to craft your dream itinerary.
            </p>
          </div>

          {/* 4. Add the ref to your form */}
          <form className="contact-form" ref={form} onSubmit={sendEmail}>
            <div className="form-row">
              <div className="form-group half">
                <label>Full Name</label>
                <input type="text" name="user_name" placeholder="Abebe Bikila" required />
              </div>
              <div className="form-group half">
                <label>Email Address</label>
                <input type="email" name="user_email" placeholder="explorer@email.com" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>WhatsApp / Phone</label>
                <input type="tel" name="user_phone" placeholder="+251 9xx xx xx xx" required />
              </div>
              <div className="form-group half">
                <label>Preferred Contact</label>
                <select name="contact_method" className="custom-select">
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                  <option value="call">Phone Call</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Interest</label>
                <select 
                  name="tour_interest" 
                  className="custom-select"
                  value={selectedTour}
                  onChange={(e) => setSelectedTour(e.target.value)}
                >
                  <option value="custom">Tailor-Made Journey</option>
                  <option value="Lalibela Adventure">Lalibela (Historical)</option>
                  <option value="Simien Mountains Trek">Simien Mountains (Trekking)</option>
                  <option value="Danakil Depression Tour">Danakil (Adventure)</option>
                  <option value="Omo Valley Cultural">Omo Valley (Tribal)</option>
                </select>
              </div>
              <div className="form-group half">
                <label>Travelers</label>
                <input type="number" name="guests" min="1" placeholder="2" />
              </div>
            </div>

            <div className="form-group full">
              <label>Tell us about your dream trip</label>
              <textarea 
                name="message" 
                rows={4} 
                placeholder="Share any specific dates, dietary needs, or bucket-list spots..."
              ></textarea>
            </div>

            <div className="form-button-container">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Sending to Addis...</span>
                  </>
                ) : (
                  <>
                    <span>Start Planning My Journey</span>
                    <Send size={18} className="btn-icon" />
                  </>
                )}
              </button>
            </div>

            <div className="contact-footer mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                <div className="info-item flex items-center gap-3">
                    <Mail size={18} className="text-[#fbbf24]" />
                    <span className="text-sm font-bold">hello@travelethiopia.com</span>
                </div>
                <div className="info-item flex items-center gap-3">
                    <MessageSquare size={18} className="text-[#fbbf24]" />
                    <span className="text-sm font-bold">+251 911 22 33 44</span>
                </div>
                <div className="info-item flex items-center gap-3">
                    <MapPin size={18} className="text-[#fbbf24]" />
                    <span className="text-sm font-bold">Addis Ababa, Ethiopia</span>
                </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}