import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Mail, Phone, MessageSquare, Send, MapPin, Loader2 } from "lucide-react";
import "./contacts.css";

export default function Contact() {
  const location = useLocation();
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // State for the selected tour (defaults to "custom")
  const [selectedTour, setSelectedTour] = useState("custom");

  // Auto-fill logic: If user clicked "Book Now" on a specific tour
  useEffect(() => {
    if (location.state && location.state.tour) {
      setSelectedTour(location.state.tour);
    }
    window.scrollTo(0, 0); // Ensure page starts at top
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending an email (Replace this with EmailJS or your API later)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="contact-viewport flex items-center justify-center">
        <div className="contact-card text-center py-20 px-10">
          <div className="bg-[#fbbf24] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={40} className="text-[#020617]" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Request Received!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for choosing us. One of our Ethiopian travel experts will contact you 
            via your preferred method within 24 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="submit-btn max-w-xs mx-auto"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

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
              Our local experts in Addis Ababa typically respond within 12-24 hours.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* --- PERSONAL INFO --- */}
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="e.g. Zelalem Getnet" required />
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
                <input type="tel" id="phone" placeholder="+251 9xx xx xx xx" required />
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
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Request Custom Quote</span>
                    <Send size={18} className="btn-icon" />
                  </>
                )}
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