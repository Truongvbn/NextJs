'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Users,
  Star,
  Mail,
  Book,
  ShoppingCart,
  Heart,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Eye,
} from 'lucide-react';
import { useTheme } from 'next-themes';

const StatCard = ({ title, value, icon, color }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md rounded-xl overflow-hidden shadow-lg p-6 h-full transform transition duration-500 hover:scale-105 border border-gray-200 dark:border-gray-700`}
    >
      <div className="flex justify-between items-center h-full relative">
        <div className="z-10">
          <h3
            className="text-lg font-semibold mb-2 line-clamp-2 h-12 text-gray-800 dark:text-white"
            title={title}
          >
            {title}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div
          className={`absolute right-0 top-0 w-32 h-32 ${color} opacity-10 rounded-full -mr-16 -mt-16`}
        ></div>
        <div className="z-10">
          {React.cloneElement(icon, { size: 32, className: `text-${color.split('-')[1]}-500` })}
        </div>
      </div>
    </div>
  );
};

const InstructorCard = ({ instructor }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`group h-full flex flex-col rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
        theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
      } backdrop-blur-md border border-gray-200 dark:border-gray-700 overflow-hidden`}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={instructor.ava || '/default-avatar.png'}
          alt={instructor.name || 'Instructor'}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-500/30 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3
            className="text-xl font-bold text-white mb-1 truncate"
            title={instructor.name || 'Unknown Instructor'}
          >
            {instructor.name || 'Unknown Instructor'}
          </h3>
          <p
            className="text-sm text-gray-300 truncate"
            title={instructor.sum || 'Expert Instructor'}
          >
            {instructor.sum || 'Expert Instructor'}
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
            <span className="truncate">{instructor.email || 'N/A'}</span>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-40' : 'max-h-0'}`}
        >
          <p
            className="text-sm text-gray-600 dark:text-gray-300 mb-4"
            title={instructor.description || 'No description available.'}
          >
            {instructor.description || 'No description available.'}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold mr-2">Experience:</span>
              <span>{instructor.experience || 'N/A'}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold mr-2">Languages:</span>
              <span>{instructor.languages?.join(', ') || 'N/A'}</span>
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

  return (
    <div
      className={`group h-full flex flex-col rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
        theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
      } backdrop-blur-md border border-gray-200 dark:border-gray-700 overflow-hidden`}
    >
      <div className="relative aspect-video">
        <Image
          src={course.imageUrl || '/default-course.png'}
          alt={course.title || 'Course'}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-sm transition-colors duration-200 hover:bg-white dark:hover:bg-gray-700"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`}
          />
        </button>
        <div className="absolute bottom-2 left-2 flex items-center space-x-1">
          <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
            {course.category?.name || 'Uncategorized'}
          </span>
          <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
            {course.price === 0 ? 'Free' : `$${course.price?.toFixed(2)}`}
          </span>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3
            className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2"
            title={course.title || 'Untitled Course'}
          >
            {course.title || 'Untitled Course'}
          </h3>
          <p
            className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3"
            title={course.sum || 'No summary available.'}
          >
            {course.sum || 'No summary available.'}
          </p>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-40' : 'max-h-0'}`}
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {course.description || 'No detailed description available.'}
          </p>
        </div>
        <div className="mt-auto">
          <div className="flex justify-between items-center text-sm mb-3">
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 mr-1 fill-current" />
              <span className="font-semibold">{course.rating?.toFixed(1) || 'N/A'}</span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4 mr-1" />
              <span>{course.buyNumber || 0} students</span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              <span>8h</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
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
            <button>
              <ShoppingCart className="w-4 h-4 mr-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StatCard, InstructorCard, CourseCard };
