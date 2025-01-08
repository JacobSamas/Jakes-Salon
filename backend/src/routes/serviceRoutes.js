const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Create a new service (Admin only)
router.post('/', async (req, res) => {
    try {
        const { name, description, price, duration, discount } = req.body;

        const service = await Service.create({ name, description, price, duration, discount });

        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();

        // Optionally, calculate final price for each service
        const servicesWithFinalPrice = services.map(service => ({
            ...service.toJSON(),
            finalPrice: service.price - (service.price * service.discount / 100),
        }));

        res.json(servicesWithFinalPrice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single service by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findByPk(id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Include final price in the response
        res.json({
            ...service.toJSON(),
            finalPrice: service.price - (service.price * service.discount / 100),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a service (Admin only)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, duration, discount } = req.body;

        const service = await Service.findByPk(id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        service.name = name || service.name;
        service.description = description || service.description;
        service.price = price || service.price;
        service.duration = duration || service.duration;
        service.discount = discount || service.discount;

        await service.save();

        // Include final price in the response
        res.json({
            ...service.toJSON(),
            finalPrice: service.price - (service.price * service.discount / 100),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a service (Admin only)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findByPk(id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        await service.destroy();

        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
