const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Required for API calls
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const pool = require('./db.cjs');

// Middleware
app.use(cors({ 
  origin: ['http://localhost:5173'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use(express.json());
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Routes
app.use('/api/news', require('./routes/newsRoutes.cjs'));
app.use('/api/auth', require('./routes/authRoutes.cjs'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// reCAPTCHA Verification Route
app.post('/api/verify-captcha', async (req, res) => {
  const { token } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!token) {
    return res.status(400).json({ success: false, message: 'No reCAPTCHA token provided' });
  }

  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
      method: 'POST',
    });

    const data = await response.json();

    if (data.success) {
      res.json({ success: true, message: 'reCAPTCHA verified!' });
    } else {
      res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Simple test endpoint
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
