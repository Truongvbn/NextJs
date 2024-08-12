/* eslint-disable react/prop-types */
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Users, Star, Mail, Book, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  ShoppingCartIcon,
  StarIcon,
  UserGroupIcon,
  HeartIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useCartData } from "@/hooks/useCartdata";

const InstructorCard = ({ instructor }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`group h-full flex flex-col rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
        theme === "dark" ? "bg-gray-800/50" : "bg-white/50"
      } backdrop-blur-md border border-gray-200 dark:border-gray-700 overflow-hidden`}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={instructor.ava || "/default-avatar.png"}
          alt={instructor.name || "Instructor"}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-500/30 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3
            className="text-xl font-bold text-white mb-1 truncate"
            title={instructor.name || "Unknown Instructor"}
          >
            {instructor.name || "Unknown Instructor"}
          </h3>
          <p
            className="text-sm text-gray-300 truncate"
            title={instructor.sum || "Expert Instructor"}
          >
            {instructor.sum || "Expert Instructor"}
          </p>
        </div>
      </div>
      <div className="flex-grow p-6 flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Users className="w-4 h-4 mr-2 text-blue-500" />
            <span>{instructor.e || 0} Students</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Book className="w-4 h-4 mr-2 text-green-500" />
            <span>{instructor.co || 0} Courses</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            <span>{instructor.r || 0} Reviews</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Mail className="w-4 h-4 mr-2 text-purple-500" />
            <span className="truncate">{instructor.email || "N/A"}</span>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-40" : "max-h-0"}`}
        >
          <p
            className="text-sm text-gray-600 dark:text-gray-300 mb-4"
            title={instructor.description || "No description available."}
          >
            {instructor.description || "No description available."}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold mr-2">Experience:</span>
              <span>{instructor.experience || "N/A"}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold mr-2">Languages:</span>
              <span>{instructor.languages?.join(", ") || "N/A"}</span>
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <button
            onClick={toggleExpand}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show More
              </>
            )}
          </button>
          <div className="flex space-x-4">
            <button className="group relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Book className="w-5 h-5 text-green-600" />
              <span className="absolute top-10 right-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View Courses
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const CourseCard = ({ course }) => {
  const { theme } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const { cartItems, addToCart, isAddingToCart } = useCartData();

  const isInCart = useMemo(
    () => Array.isArray(cartItems) && cartItems.some((item) => item.id === course.courseId),
    [cartItems, course.courseId],
  );

  const handleAddToCart = () => {
    if (isInCart) return;
    addToCart(course.courseId);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group h-full flex flex-col rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden
        ${theme === "dark" ? "bg-gray-800/30" : "bg-white/30"} 
        backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50`}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.imageUrl || "/default-course.png"}
          alt={course.title || "Course"}
          layout="fill"
          objectFit="cover"
          className="transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 p-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-full shadow-lg transition-colors duration-200 hover:bg-white/40 dark:hover:bg-gray-700/40"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <HeartIcon
            className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-current" : "text-white"}`}
          />
        </motion.button>
        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-md text-white text-xs font-medium rounded-full">
            {course.category?.name || "Uncategorized"}
          </span>
          <span className="px-3 py-1 bg-green-500/80 backdrop-blur-md text-white text-xs font-medium rounded-full">
            {course.price === 0 ? "Free" : `$${course.price?.toFixed(2)}`}
          </span>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div>
          <h3
            className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
            title={course.title || "Untitled Course"}
          >
            {course.title || "Untitled Course"}
          </h3>
          <p
            className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2"
            title={course.sum || "No summary available."}
          >
            {course.sum || "No summary available."}
          </p>
        </div>
        <motion.div
          animate={{ height: isExpanded ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {course.description || "No detailed description available."}
          </p>
        </motion.div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-yellow-500">
            <StarIcon className="w-5 h-5 mr-1 fill-current" />
            <span className="font-semibold">{course.rating?.toFixed(1) || "N/A"}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <UserGroupIcon className="w-5 h-5 mr-1" />
            <span>{course.buyNumber || 0} students</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <ClockIcon className="w-5 h-5 mr-1" />
            <span>8h</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleExpand}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                <ChevronUpIcon className="w-5 h-5 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-5 h-5 mr-1" />
                Show More
              </>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 ${
              isInCart ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-full transition-colors duration-200`}
            onClick={handleAddToCart}
            disabled={isAddingToCart || isInCart}
          >
            {isAddingToCart ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : isInCart ? (
              <CheckIcon className="w-5 h-5" />
            ) : (
              <ShoppingCartIcon className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
export { InstructorCard, CourseCard };
