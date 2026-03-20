import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./contacts.css";
import { Mail, Phone, MessageSquare, Send, MapPin } from "lucide-react";

export default function Contact() {
  const location = useLocation();
  const [selectedTour, setSelectedTour] = useState("custom");

  // Logic to auto-select the tour if coming from the Tours page
  useEffect(() => {
    if (location.state && location.state.tour) {
      setSelectedTour(location.state.tour);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, this just logs the data. 
    // You can connect this to EmailJS or a backend later!
    alert("Thank you! Your inquiry for " + selectedTour + " has been sent.");
  };

  return (
    <div className="contact-viewport">
      <section className="contact-section">
        <div className="contact-card">
          {/* --- HEADER --- */}
          <div className="contact-header">
            <span className="contact-subtitle">Land of Origins</span>
            <h1 className="contact-title">
              Plan Your <span className="highlight">Ethiopian Odyssey</span>
            </h1>
            <p className="contact-description">
              Our local travel experts in Addis Ababa typically respond within 12-24 hours.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* --- PERSONAL INFO --- */}
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="e.g. Zelalem Mengistu" required />
              </div>
              <div className="form-group half">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="explorer@email.com" required />
              </div>
            </div>

            {/* --- PHONE & CONTACT PREFERENCE --- */}
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="phone">Phone / WhatsApp</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="+251 9xx xx xx xx" 
                  required 
                />
              </div>
              <div className="form-group half">
                <label htmlFor="contact-method">Preferred Contact Method</label>
                <select id="contact-method" className="custom-select">
                  <option value="whatsapp">WhatsApp (Recommended)</option>
                  <option value="email">Email</option>
                  <option value="call">Direct Call</option>
                </select>
              </div>
            </div>

            {/* --- TRIP SPECIFICS --- */}
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="tour-type">Tour Interest</label>
                <select 
                  id="tour-type" 
                  className="custom-select"
                  value={selectedTour}
                  onChange={(e) => setSelectedTour(e.target.value)}
                >
                  <option value="custom">Tailor-Made Journey</option>
                  <option value="Lalibela Adventure">Lalibela Rock-Hewn Churches</option>
                  <option value="Simien Mountains Trek">Simien Mountains Trekking</option>
                  <option value="Danakil Depression Tour">Danakil Depression (Afar)</option>
                  <option value="Omo Valley Cultural">Omo Valley Tribes</option>
                </select>
              </div>
              <div className="form-group half">
                <label htmlFor="guests">Number of Travelers</label>
                <input type="number" id="guests" min="1" placeholder="2" />
              </div>
            </div>

            <div className="form-group full">
              <label htmlFor="message">Your Dream Itinerary Details</label>
              <textarea 
                id="message" 
                rows={4} 
                placeholder="Tell us about your preferences, diet, or specific dates (e.g. 'We want to visit during Meskel festival...')"
              ></textarea>
            </div>

            <div className="form-button-container">
              <button type="submit" className="submit-btn">
                <span>Request Custom Quote</span>
                <Send size={18} className="btn-icon" />
              </button>
            </div>

            {/* --- DIRECT CHANNELS --- */}
            <div className="contact-footer">
              <div className="info-item">
                <Mail size={18} className="info-icon" />
                <div>
                    <strong>Email Us</strong>
                    <p>info@travelethiopia.com</p>
                </div>
              </div>
              <div className="info-item">
                <MessageSquare size={18} className="info-icon" />
                <div>
                    <strong>WhatsApp Business</strong>
                    <p>+251 911 22 33 44</p>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={18} className="info-icon" />
                <div>
                    <strong>Office</strong>
                    <p>Bole, Addis Ababa</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}