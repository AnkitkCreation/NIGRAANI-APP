const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
// Health Check Route
app.get('/api/health', async (req, res) => {
  try {
    // Try a simple query to the DB
    const [result] = await pool.query('SELECT 1 + 1 AS result');
    res.json({
      status: 'ok',
      message: 'NIGRANI Backend is live',
      db: result[0].result === 2 ? 'connected' : 'error'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// Test Endpoint: Get Wards
app.get('/api/wards', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM wards');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
