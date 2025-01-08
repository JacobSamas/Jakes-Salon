const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to Jake\'s Salon API!');
});

module.exports = app;
