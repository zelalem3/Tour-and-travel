const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

app.post('/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log('New booking request:', req.body);

  res.json({ success: true, message: 'Request received' });
});
app.post('/contact', (req, res) => {
  const { name, email, phone, tour, message } = req.body;

  console.log("New booking:", req.body);

  res.json({ success: true });
});

app.listen(5000, () => console.log('Server running on port 5000'));