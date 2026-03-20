import React from "react";
import "./contacts.css";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="contact-viewport">
      <section className="contact-section">
        <div className="contact-card">
          <div className="contact-header">
            <span className="contact-subtitle">Start Your Journey</span>
            <h1 className="contact-title">
              Plan Your <span className="highlight">Adventure</span>
            </h1>
            <p className="contact-description">
              Our local experts typically respond within 12-24 hours.
            </p>
          </div>

          <form className="contact-form">
            {/* --- PERSONAL INFO --- */}
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Abebe Bikila" required />
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
                  placeholder="+1 234 567 890" 
                  required 
                />
              </div>
             <div className="form-group half">
  <label htmlFor="contact-method">How should we reach you?</label>
  <select id="contact-method" className="custom-select">
    <option value="" disabled selected>Select a method...</option>
    <option value="email">Email is best</option>
    <option value="whatsapp">WhatsApp Message</option>
    <option value="call">Direct Phone Call</option>
  </select>
</div>
            </div>

            {/* --- TRIP SPECIFICS --- */}
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="tour-type">Interests</label>
                <select id="tour-type" className="custom-select">
                  <option value="historical">Historical (Lalibela/Axum)</option>
                  <option value="adventure">Adventure (Simien/Danakil)</option>
                  <option value="cultural">Cultural (Omo Valley)</option>
                  <option value="custom">Fully Tailor-Made</option>
                </select>
              </div>
              <div className="form-group half">
                <label htmlFor="guests">Number of Travelers</label>
                <input type="number" id="guests" min="1" placeholder="2" />
              </div>
            </div>

            <div className="form-group full">
              <label htmlFor="message">Your Dream Itinerary</label>
              <textarea 
                id="message" 
                rows={4} 
                placeholder="Example: We want to see the rock-hewn churches and hike the Simien mountains. We are traveling for our honeymoon..."
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
                    <p>hello@travelethiopia.com</p>
                </div>
              </div>
              <div className="info-item">
                <MessageSquare size={18} className="info-icon" />
                <div>
                    <strong>WhatsApp</strong>
                    <p>+251 911 22 33 44</p>
                </div>
              </div>
              <div className="info-item">
                <Phone size={18} className="info-icon" />
                <div>
                    <strong>Call Us</strong>
                    <p>+251 116 00 00 00</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}