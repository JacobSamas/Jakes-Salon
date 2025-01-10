"use client";

import { motion } from "framer-motion";

const NewsletterSection = () => {
  return (
    <section className="bg-background text-primary py-16 px-6">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-bold mb-6 text-primary"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Stay Updated!
        </motion.h2>
        <motion.p
          className="text-lg mb-8 text-primary"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Subscribe to our newsletter and never miss out on exciting updates,
          exclusive deals, and more!
        </motion.p>

        {/* Subscription Form */}
        <motion.form
          className="flex flex-col md:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-2/3 px-4 py-3 rounded-lg text-primary bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-secondary text-white hover:bg-primary hover:text-white transition"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsletterSection;
