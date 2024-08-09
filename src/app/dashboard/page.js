'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GenericSlider from '@/components/GenericSlider';
import Card from '@/components/ui/Card';
import Sidebar from '@/components/Sidebar';
import { mainApi } from '@/ultils/axiosconfig';
import { Book, Users, TrendingUp, Award, BarChart2 } from 'lucide-react';
import InstructorSlider from '@/components/InstructorSlider';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [popularInstructors, setPopularInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesResponse, instructorsResponse] = await Promise.all([
        mainApi.get('/courses?page=0&size=12'),
        mainApi.get('/instructors/popular'),
      ]);

      setCourses(coursesResponse.data.payload);
      setBestSellers(coursesResponse.data.payload.filter((course) => course.buyNumber > 3));
      setPopularInstructors(instructorsResponse.data.payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (courseId) => {
    console.log(`Added course ${courseId} to cart`);
  };

  const handleAddToFavorite = (courseId) => {
    console.log(`Added course ${courseId} to favorites`);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800 dark:text-white mb-12"
        >
          Dashboard
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          <StatCard title="Total Courses" value={courses.length} icon={<Book className="w-8 h-8" />} color="bg-blue-500" />
          <StatCard title="Best Sellers" value={bestSellers.length} icon={<Award className="w-8 h-8" />} color="bg-green-500" />
          <StatCard title="Popular Instructors" value={popularInstructors.length} icon={<Users className="w-8 h-8" />} color="bg-purple-500" />
          <StatCard title="Total Students" value="10,000+" icon={<TrendingUp className="w-8 h-8" />} color="bg-yellow-500" />
        </motion.div>
        <InstructorSlider
          title="Popular Instructors"
          instructors={popularInstructors}          animationDelay={0.2}
        />
        <GenericSlider
          title="Popular Courses"
          items={courses}
          animationDelay={0.4}
          renderItem={(course) => (
            <Card
              title={course.title}
              description={course.sum}
              image={course.imageUrl}
              price={course.price}
              rating={course.rating?.toFixed(1) || 'N/A'}
              onAddToCart={() => handleAddToCart(course.courseId)}
              onAddToFavorite={() => handleAddToFavorite(course.courseId)}
            />
          )}
        />

        <GenericSlider
          title="Bestseller Courses"
          items={bestSellers}
          animationDelay={0.6}
          renderItem={(course) => (
            <Card
              title={course.title}
              description={course.sum}
              image={course.imageUrl}
              price={course.price}
              rating={course.rating?.toFixed(1) || 'N/A'}
              onAddToCart={() => handleAddToCart(course.courseId)}
              onAddToFavorite={() => handleAddToFavorite(course.courseId)}
            />
          )}
        />


         
      </main>
    </div>
  );
}

const StatCard = ({ title, value, icon, color }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`${color} rounded-xl shadow-lg p-6 text-white transition-all duration-300`}
  >
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      {icon}
    </div>
  </motion.div>
);