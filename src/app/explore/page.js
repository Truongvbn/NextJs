'use client';

import React, { useState, useEffect } from 'react';
import { mainApi } from '@/ultils/axiosconfig';
import { CourseCard } from '@/components/ui/Card';
import Pagination from '@/components/ui/Pagination';

export default function ExplorePage() {
    const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 12;

  useEffect(() => {
    fetchCourses();
    fetchTotalCourses();
  }, [currentPage]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await mainApi.get(`/courses?page=${currentPage - 1}&size=${pageSize}`);
      setCourses(response.data.payload);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalCourses = async () => {
    try {
      const response = await mainApi.get('/courses/total');
      const total = response.data.payload;
      setTotalPages(Math.ceil(total / pageSize));
    } catch (err) {
      setError('Failed to fetch total courses');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Explore Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.courseId} course={course} />
          ))}
        </div>
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
  );
}