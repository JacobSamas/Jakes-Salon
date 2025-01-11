"use client";

import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah J.",
    review: "Jakes Salon transformed my hair and my confidence! Highly recommend.",
    image: "/images/customer1.jpg",
  },
  {
    id: 2,
    name: "Mike T.",
    review: "The best spa experience I’ve ever had. Relaxing and rejuvenating!",
    image: "/images/customer2.jpg",
  },
  {
    id: 3,
    name: "Emily R.",
    review: "Loved the professional coloring service. The staff is amazing!",
    image: "/images/customer3.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-background text-primary py-16 px-6">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What Our Clients Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: testimonial.id * 0.2 }}
            >
              <div className="mb-4">
                <FaUser className="text-4xl text-primary mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
              <p className="text-gray-600">{testimonial.review}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
