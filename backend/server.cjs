const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const pool = require('./db.cjs');
const path = require('path');

require('dotenv').config();

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

// Auth route
app.use('/api/auth', require('./routes/authRoutes.cjs'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple endpoints
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Start the server (without SSL handling here)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

