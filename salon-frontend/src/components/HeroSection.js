"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpa, FaPaintBrush } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

const slides = [
  {
    id: 1,
    icon: <FaScissors className="text-6xl text-accent" />,
    title: "Expert Haircuts",
    description: "Precision cuts tailored to your unique style.",
    buttonText: "Book Your Cut",
    link: "/services",
  },
  {
    id: 2,
    icon: <FaSpa className="text-6xl text-accent" />,
    title: "Relaxing Spa Treatments",
    description: "Rejuvenate your mind and body with our premium spa services.",
    buttonText: "View Spa Packages",
    link: "/services",
  },
  {
    id: 3,
    icon: <FaPaintBrush className="text-6xl text-accent" />,
    title: "Professional Coloring",
    description: "Transform your look with expert hair coloring services.",
    buttonText: "Explore Coloring Options",
    link: "/services",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-primary overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) =>
            index === currentSlide ? (
              <motion.div
                key={slide.id}
                className="absolute text-center text-white px-6"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className="mb-6">{slide.icon}</div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6">{slide.description}</p>
                <a
                  href={slide.link}
                  className="inline-block bg-accent text-primary px-6 py-3 rounded-full hover:bg-secondary hover:text-white transition"
                >
                  {slide.buttonText}
                </a>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
