const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorHandler');


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require('./routes/userRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use("/api", dashboardRoutes); 
app.use('/api/users', userRoutes);


// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to Jake\'s Salon API!');
});

module.exports = app;
