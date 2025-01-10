"use client";

import { motion } from "framer-motion";
import { FaCut } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="bg-background text-primary py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <FaCut className="text-9xl text-accent shadow-lg" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">About Jakes Salon</h2>
          <p className="text-lg mb-6">
            At Jakes Salon, we’re dedicated to transforming your style and
            confidence with our expert haircuts, relaxing spa treatments, and
            professional coloring services. Our team of experienced stylists
            ensures that every client leaves feeling their best.
          </p>
          <a
            href="/about"
            className="bg-primary text-white px-6 py-3 rounded-full hover:bg-secondary transition"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
