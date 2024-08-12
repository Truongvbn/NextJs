"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  SunIcon,
  MoonIcon,
  PencilIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  BookOpenIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const email = localStorage.getItem("usermail");
    if (email) {
      fetchUserData(email);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      const response = await fetch(
        `http://localhost/main-service/api/users?email=${encodeURIComponent(email)}`,
      );
      const data = await response.json();
      if (data.success) {
        setUserData(data.payload);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the API call to update user data here
    setIsEditing(false);
  };

  if (!mounted) return null;

  const editableFields = [
    "name",
    "ava",
    "description",
    "phoneNumber",
    "dob",
    "gender",
    "address",
    "educationLevel",
  ];

  const statCards = [
    { title: "Purchases", value: userData?.p || 0, icon: ShoppingBagIcon },
    { title: "Courses", value: userData?.c || 0, icon: BookOpenIcon },
    { title: "My Reviews", value: userData?.mr || 0, icon: ChartBarIcon },
    { title: "Subscriptions", value: userData?.s || 0, icon: CreditCardIcon },
  ];

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`backdrop-blur-lg ${theme === "dark" ? "bg-gray-800/30" : "bg-white/30"} rounded-3xl shadow-xl overflow-hidden`}
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0 p-8 relative">
              <div className="relative w-48 h-48 mx-auto">
                <Image
                  src={userData?.ava || "/placeholder-avatar.png"}
                  alt={userData?.name || "User"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full shadow-lg"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <input
                      type="text"
                      name="ava"
                      value={userData?.ava || ""}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                      className="w-full p-2 bg-white bg-opacity-75 rounded text-sm"
                    />
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <h1
                  className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {userData?.name || "User Profile"}
                </h1>
                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {userData?.role}
                </p>
              </div>
            </div>
            <div className="p-8 flex-grow">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Profile Information
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className={`p-2 rounded-full ${theme === "dark" ? "bg-yellow-400" : "bg-gray-800"}`}
                  >
                    {theme === "dark" ? (
                      <SunIcon className="h-5 w-5 text-gray-900" />
                    ) : (
                      <MoonIcon className="h-5 w-5 text-white" />
                    )}
                  </button>
                  <button
                    onClick={handleEdit}
                    className={`flex items-center px-4 py-2 rounded ${
                      theme === "dark"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white transition-colors duration-300`}
                  >
                    <PencilIcon className="h-5 w-5 mr-2" />
                    {isEditing ? "Save" : "Edit Profile"}
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {editableFields.map((field) => (
                  <div key={field} className="flex flex-col">
                    <label
                      className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name={field}
                        value={userData?.[field] || ""}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md ${
                          theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                        } border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                      />
                    ) : (
                      <p className={`mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        {userData?.[field] || "Not provided"}
                      </p>
                    )}
                  </div>
                ))}
              </form>
            </div>
          </div>
          <div className="p-8">
            <h3
              className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Activity Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statCards.map((card, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-white"} shadow-md`}
                >
                  <card.icon
                    className={`h-8 w-8 ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`}
                  />
                  <h4
                    className={`mt-2 font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
                  >
                    {card.title}
                  </h4>
                  <p
                    className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
