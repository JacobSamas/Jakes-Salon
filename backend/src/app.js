const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to Jake\'s Salon API!');
});

module.exports = app;
