const express = require('express');
const { body, validationResult } = require('express-validator');
const Service = require('../models/Service');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// Validation middleware
const validateService = [
    body('name').notEmpty().withMessage('Service name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('duration').isInt({ gt: 0 }).withMessage('Duration must be a positive integer'),
    body('discount').optional().isFloat({ min: 0, max: 100 }).withMessage('Discount must be between 0 and 100'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Create a new service (Admin only)
router.post('/', adminMiddleware, validateService, async (req, res) => {
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

        // Calculate final price for each service
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
router.put('/:id', adminMiddleware, validateService, async (req, res) => {
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

        res.json({
            ...service.toJSON(),
            finalPrice: service.price - (service.price * service.discount / 100),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a service (Admin only)
router.delete('/:id', adminMiddleware, async (req, res) => {
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
