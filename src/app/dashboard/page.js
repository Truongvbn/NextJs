"use client";

import React, { useEffect, useState } from "react";
import { mainApi } from "@/ultils/axiosconfig";
import { ChevronRight, Briefcase } from "lucide-react";
import { CourseCard, InstructorCard } from "@/components/ui/Card";
import SlickSlider from "@/components/SlickSlider";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [popularInstructors, setPopularInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesResponse, instructorsResponse] = await Promise.all([
        mainApi.get("/courses?page=0&size=20"),
        // mainApi.get("/instructors/popular"),
      ]);

      setCourses(coursesResponse.data.payload);
      setBestSellers(coursesResponse.data.payload.filter((course) => course.buyNumber > 3));
      // setPopularInstructors(instructorsResponse.data.payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>
    );

  return (
    <div className="space-y-16 px-6 sm:px-8 lg:px-12 py-8">
      <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Web Development", "Data Science", "Mobile App Development"].map((path) => (
            <div key={path} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <Briefcase className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{path}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Master the skills needed for a career in {path.toLowerCase()}.
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Continue Learning</h2>
          <a
            href="/my-courses"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            View All Courses <ChevronRight size={20} />
          </a>
        </div>
        <SlickSlider
          items={courses.slice(0, 5)} // Assuming these are the user's current courses
          renderItem={(course) => <CourseCard course={course} showProgress={true} />}
        />
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Popular Instructors</h2>
          <a
            href="/instructors"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            View All <ChevronRight size={20} />
          </a>
        </div>
        <SlickSlider
          items={popularInstructors}
          renderItem={(instructor) => <InstructorCard instructor={instructor} />}
        />
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Trending Courses</h2>
          <a
            href="/courses"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            Explore All <ChevronRight size={20} />
          </a>
        </div>
        <SlickSlider items={courses} renderItem={(course) => <CourseCard course={course} />} />
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Bestseller Courses</h2>
          <a
            href="/bestsellers"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            View All <ChevronRight size={20} />
          </a>
        </div>
        <SlickSlider items={bestSellers} renderItem={(course) => <CourseCard course={course} />} />
      </section>
    </div>
  );
}
