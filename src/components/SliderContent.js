'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SliderContent = ({ items, currentIndex, renderItem }) => {
  return (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: `${-currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SliderContent;