import React from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  CreditCard, 
  CheckCircle2, 
  PlaneTakeoff, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './TravelInfo.css';

const steps = [
  {
    icon: <Map size={32} />,
    title: "1. Select & Inquire",
    desc: "Choose from our curated expeditions—whether it's the rock-hewn churches of Lalibela, the Simien Mountains, or the Danakil Depression. Need something unique? Request a custom itinerary."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "2. Refine & Confirm",
    desc: "We finalize your route, securing reliable 4x4 Land Cruisers for rugged terrain and expert local guides. Once you approve the itinerary, we issue a formal booking quote."
  },
  {
    icon: <CreditCard size={32} />,
    title: "3. Secure Your Spot",
    desc: "A 30% deposit is required to secure hotels and domestic flights. Pro Tip: Booking your international arrival with Ethiopian Airlines unlocks up to 50% off your internal flights."
  },
  {
    icon: <PlaneTakeoff size={32} />,
    title: "4. Final Prep & Visas",
    desc: "Balance is due 30 days prior. We’ll send a Welcome Pack with the official e-Visa link (evisa.gov.et), altitude packing lists, and Yellow Fever vaccination guidelines."
  }
];

export default function BookingGuide() {
  return (
    <div className="info-page-viewport">
      <Helmet>
        <title>Booking Guide | Travel Ethiopia</title>
        <meta name="description" content="Step-by-step guide to booking your Ethiopian expedition, including payment details, e-Visa prep, and cancellation policies." />
      </Helmet>
      
      <div className="info-container">
        <header className="info-header">
          <span className="gold-label">Seamless Experience</span>
          <h1>How to Book Your <span className="highlight">Ethiopian Expedition</span></h1>
          <p className="subtitle">From the highlands to the Rift Valley, we ensure transparency at every stage.</p>
        </header>

        <section className="booking-steps">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="step-card"
            >
              <div className="step-icon-box">{step.icon}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="policy-grid">
          <div className="policy-card">
            <CheckCircle2 className="gold-text" size={24} />
            <div className="policy-text">
              <h4>Cancellation Policy</h4>
              <p>Free cancellation up to 45 days before departure. 50% refund between 45-15 days. Note: Domestic flight tickets and specific National Park permits are strictly non-refundable once issued.</p>
            </div>
          </div>
          
          <div className="policy-card">
            <CheckCircle2 className="gold-text" size={24} />
            <div className="policy-text">
              <h4>Secure Payments</h4>
              <p>We accept SWIFT International Bank Transfers and major Credit Cards via secure gateway. All invoices are provided with official Ethiopian tourism tax documentation for your records.</p>
            </div>
          </div>

          <div className="policy-card warning-card">
            <AlertTriangle className="gold-text" size={24} />
            <div className="policy-text">
              <h4>Health & Entry Requirements</h4>
              <p>All visitors must apply for an e-Visa online prior to arrival. A Yellow Fever vaccination certificate is mandatory if arriving from a country with risk of transmission, and highly recommended for all travelers.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}