const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Service = require("../models/Service");
const Appointment = require("../models/Appointment");
const adminMiddleware = require("../middlewares/adminMiddleware"); 

router.get("/dashboard-metrics", adminMiddleware, async (req, res) => {
  try {
    const users = await User.count();
    const services = await Service.count();
    const appointments = await Appointment.count();

    res.json({
      users,
      services,
      appointments,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

module.exports = router;
