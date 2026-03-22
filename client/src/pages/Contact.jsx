import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { Mail, Phone, MessageSquare, Send, MapPin, Loader2, CheckCircle } from "lucide-react";
import "./contacts.css";

export default function Contact() {
  const form = useRef();
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

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const SERVICE_ID = "service_tc1igag"; 
    const TEMPLATE_ID = "template_rzluy3a";
    const PUBLIC_KEY = "DreoKBwj6n03jr4uh";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
          setIsSubmitting(false);
          setSubmitted(true);
      }, (error) => {
          alert("Error sending message. Please try WhatsApp.");
          setIsSubmitting(false);
      });
  };

  if (submitted) {
    return (
      <div className="contact-viewport">
        <div className="contact-card success-card">
          <CheckCircle size={60} className="success-icon" />
          <h1 className="contact-title">Journey Requested!</h1>
          <p className="contact-description">
            Your inquiry for <strong>{selectedTour}</strong> has been sent. 
            We'll be in touch within 24 hours.
          </p>
          <button onClick={() => setSubmitted(false)} className="submit-btn">
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-viewport">
      <div className="contact-card">
        <div className="contact-header">
          <span className="contact-subtitle">Land of Origins</span>
          <h1 className="contact-title">
            Start Your <span className="highlight">Ethiopian Journey</span>
          </h1>
          <p className="contact-description">
            Connect with our local designers to craft your itinerary.
          </p>
        </div>

        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="user_name" placeholder="Abebe Bikila" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="user_email" placeholder="explorer@email.com" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>WhatsApp / Phone</label>
              <input type="tel" name="user_phone" placeholder="+251 9xx xx xx xx" required />
            </div>
            <div className="form-group">
              <label>Preferred Contact</label>
              <select name="contact_method" className="custom-select">
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="call">Phone Call</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
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
            <div className="form-group">
              <label>Travelers</label>
              <input type="number" name="guests" min="1" placeholder="2" />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Message</label>
            <textarea name="message" rows={4} placeholder="Share your travel dates or specific interests..."></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="animate-spin" size={20} /> Sending to Addis...</>
            ) : (
              <><Send size={18} /> Start Planning My Journey</>
            )}
          </button>

          <div className="contact-footer">
            <div className="info-item">
              <Mail size={18} />
              <span>hello@travelethiopia.com</span>
            </div>
            <div className="info-item">
              <MessageSquare size={18} />
              <span>+251 911 22 33 44</span>
            </div>
            <div className="info-item">
              <MapPin size={18} />
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}