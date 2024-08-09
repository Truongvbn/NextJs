'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, BookOpen, Star } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const InstructorCard = ({ instructor }) => {
  const socialIcons = [
    { Icon: FaFacebook, color: "#1877F2" },
    { Icon: FaTwitter, color: "#1DA1F2" },
    { Icon: FaInstagram, color: "#E4405F" },
    { Icon: FaYoutube, color: "#FF0000" },
  ];

  return (
    <div className="bg-gray-800 text-gray-200 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
      <div className="bg-gray-700 p-6 text-center relative">
        <div className="w-28 h-28 rounded-full mx-auto mb-4 relative overflow-hidden">
          <Image
            src={instructor.ava || "/default-avatar.png"}
            alt={instructor.name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <Link href={`/student/instructor/${instructor.email}`}>
          <h2 className="text-xl font-bold hover:text-blue-500 transition-colors duration-200 mb-2 truncate">
            {instructor.name}
          </h2>
        </Link>
        <p className="text-sm truncate">
          {instructor.description
            ? instructor.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 50) + "..."
            : "Expert Instructor"}
        </p>
      </div>

      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center text-sm mb-3">
            <span className="flex items-center">
              <Users className="mr-2 text-blue-500" /> {instructor.e.toLocaleString()} Students
            </span>
            <span className="flex items-center">
              <BookOpen className="mr-2 text-green-500" /> {instructor.co.toLocaleString()} Courses
            </span>
          </div>
          <p className="text-sm line-clamp-3">
            {instructor.sum ||
              "Passionate about teaching and sharing knowledge in various fields of expertise."}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-3">
            {socialIcons.map(({ Icon, color }, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-lg"
                style={{ color }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
          <div className="bg-yellow-500 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center">
            <Star className="mr-1" /> {instructor.r}
          </div>
        </div>
      </div>
    </div>
  );
};

const InstructorSlider = ({ title, instructors, animationDelay = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 4 >= instructors.length ? 0 : prevIndex + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(instructors.length - 4, 0) : prevIndex - 4
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [instructors.length]);

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
          {instructors.slice(currentIndex, currentIndex + 4).map((instructor, index) => (
            <motion.div 
              key={instructor.instructorId || instructor.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <InstructorCard instructor={instructor} />
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

export default InstructorSlider;