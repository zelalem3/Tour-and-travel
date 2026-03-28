const express = require('express');
const mongoose = require('mongoose');
const emailjs = require('@emailjs/nodejs');
const Inquiry = require('./models/Inquiry');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Protect with your Vite URL

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to Ethiopia Travel Database"))
  .catch(err => console.error("DB Connection Error:", err));

// THE SECURE ROUTE
app.post('/api/contact', async (req, res) => {
  try {
    // 1. Save to MongoDB (Permanent Record)
    const newInquiry = new Inquiry(req.body);
    await newInquiry.save();

    // 2. Send via EmailJS (Instant Notification)
    // Using Private Keys from .env
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      req.body,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    res.status(200).json({ success: true, message: "Expedition request logged and sent!" });
  } catch (error) {
    console.error("System Error:", error);
    res.status(500).json({ error: "Mission control interrupted. Please retry." });
  }
});

const adminShield = (req, res, next) => {
  const adminToken = req.headers['x-admin-token'];
  
  if (adminToken === process.env.ADMIN_SECRET_KEY) {
    next(); // Pass is correct, proceed to data
  } else {
    res.status(403).json({ error: "Access Denied: Addis HQ only." });
  }
};

app.post('/api/admin/inquiries', adminShield,async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Unable to retrieve inquiries." });
  }
});
app.delete('/api/admin/leads/:id', adminShield, async (req, res) => {
  await Inquiry.findByIdAndDelete(req.params.id);
  res.json({ message: "Lead removed" });
});

app.listen(5000, () => console.log("Shield Server Active on Port 5000"));