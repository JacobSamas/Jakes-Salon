"use client";

import { motion } from "framer-motion";
import { FaCut, FaSpa, FaPaintBrush } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaCut className="text-6xl text-accent" />,
    title: "Haircuts",
    description: "Precision cuts tailored to your style.",
  },
  {
    id: 2,
    icon: <FaSpa className="text-6xl text-accent" />,
    title: "Spa Treatments",
    description: "Relaxing spa experiences for mind and body.",
  },
  {
    id: 3,
    icon: <FaPaintBrush className="text-6xl text-accent" />,
    title: "Hair Coloring",
    description: "Professional coloring to match your vibe.",
  },
];

const ServiceHighlights = () => {
  return (
    <section className="bg-primary text-white py-16 px-6">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-background text-primary p-6 rounded-lg shadow-lg hover:shadow-xl transition"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: service.id * 0.2 }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-lg">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="/services"
            className="bg-accent text-primary px-6 py-3 rounded-full hover:bg-secondary hover:text-white transition"
          >
            View All Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
