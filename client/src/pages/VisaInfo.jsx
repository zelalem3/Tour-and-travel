import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Globe, AlertTriangle, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './TravelInfo.css';

export default function VisaInfo() {
  return (
    <div className="info-page-viewport">
      <Helmet><title>Visa Requirements | Travel Ethiopia</title></Helmet>

      <div className="info-container">
        <header className="info-header">
          <span className="gold-label">Entry Requirements</span>
          <h1>Ethiopian <span className="highlight">Visa & Entry</span></h1>
          <p className="subtitle">Everything you need to know before you fly.</p>
        </header>

        <div className="visa-main-grid">
          {/* Main E-Visa Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="visa-primary-card"
          >
            <Globe className="gold-text" size={48} />
            <h2>The E-Visa Process</h2>
            <p>Most nationalities can apply for a Tourist Visa online. This is the fastest and safest method to enter Ethiopia.</p>
            <ul className="visa-list">
              <li>Valid for 30 or 90 days</li>
              <li>Processing time: 1–3 business days</li>
              <li>Standard fee: approx. $82 USD</li>
            </ul>
            <a 
              href="https://www.evisa.gov.et/" 
              target="_blank" 
              rel="noreferrer" 
              className="evisa-btn"
            >
              Official E-Visa Portal <ExternalLink size={16} />
            </a>
          </motion.div>

          {/* Requirements Sidebar */}
          <div className="visa-sidebar">
            <div className="requirement-box">
              <div className="req-head"><FileText size={20} /> <h4>Passport</h4></div>
              <p>Must be valid for at least 6 months from your date of entry.</p>
            </div>
            
            <div className="requirement-box warning">
              <div className="req-head"><AlertTriangle size={20} /> <h4>Health Note</h4></div>
              <p>Yellow Fever certificate is required if arriving from an endemic country.</p>
            </div>
          </div>
        </div>

        <section className="faq-mini">
          <h3>Common Questions</h3>
          <div className="faq-item">
            <strong>Can I get a Visa on Arrival?</strong>
            <p>Currently, Visa on Arrival is restricted for many nationalities. We strongly recommend the E-Visa to avoid boarding denials.</p>
          </div>
        </section>
      </div>
    </div>
  );
}