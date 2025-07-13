const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const inquiryRoutes = require('./routes/inquiries');

dotenv.config();

const app = express();

// ✅ CORS configuration
const corsOptions = {
  origin: [
    "https://rental-radar-eight.vercel.app",  // ✅ No trailing slash
    "http://localhost:5173"
  ],
  credentials: true
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());

// ✅ API routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);

// ✅ Root route for health check
app.get('/', (req, res) => {
  res.send("RentalRadar backend is live!");
});

// ✅ Error handler for debugging
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB connection error:', err));

module.exports = app;
