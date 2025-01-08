const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Create an appointment
router.post('/', async (req, res) => {
    try {
        const { userId, service, date, time } = req.body;

        const appointment = await Appointment.create({
            userId,
            service,
            date,
            time,
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get appointments for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await Appointment.findAll({ where: { userId } });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update appointment status
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = status;
        await appointment.save();

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
