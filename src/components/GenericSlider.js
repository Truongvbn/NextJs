'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GenericSlider = ({ title, items, renderItem, animationDelay = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 4 >= items.length ? 0 : prevIndex + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(items.length - 4, 0) : prevIndex - 4
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className="w-full mb-16"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">{title}</h2>
      <div className="relative">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {items.slice(currentIndex, currentIndex + 4).map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </motion.div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 z-10 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 z-10 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
      </div>
    </motion.div>
  );
};

export default GenericSlider;