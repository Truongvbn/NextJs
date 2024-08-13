"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  SunIcon,
  MoonIcon,
  PencilIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  BookOpenIcon,
  CreditCardIcon,
  CameraIcon,
  AcademicCapIcon,
  PhoneIcon,
  CalendarIcon,
  UserIcon,
  MapPinIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { mainApi } from "@/ultils/axiosconfig";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [saveStatus, setSaveStatus] = useState(null); // 'success', 'error', or null

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
        localStorage.setItem("Userdata", JSON.stringify(data.payload));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      handleSubmit();
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await mainApi.post("/file/upload", formData);
        console.log("File uploaded:", response.data.filePath);
        setUserData({ ...userData, ava: response.data.filePath });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await mainApi.put("/users", {
        ava: userData.ava,
        name: userData.name,
        sum: userData.sum,
        description: userData.description,
        phoneNumber: userData.phoneNumber,
        dob: userData.dob,
        gender: userData.gender,
        address: userData.address,
        educationLevel: userData.educationLevel,
      });
      if (response.data.success) {
        setIsEditing(false);
        setSaveStatus("success");
        setTimeout(() => setSaveStatus(null), 3000); // Clear status after 3 seconds
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000); // Clear status after 3 seconds
    }
  };

  if (!mounted) return null;

  const editableFields = [
    { name: "name", icon: UserIcon, label: "Full Name" },
    { name: "sum", icon: BriefcaseIcon, label: "Summary" },
    { name: "description", icon: PencilIcon, label: "Description" },
    { name: "phoneNumber", icon: PhoneIcon, label: "Phone Number" },
    { name: "dob", icon: CalendarIcon, label: "Date of Birth" },
    { name: "gender", icon: UserIcon, label: "Gender" },
    { name: "address", icon: MapPinIcon, label: "Address" },
    { name: "educationLevel", icon: AcademicCapIcon, label: "Education Level" },
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
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`backdrop-blur-lg ${theme === "dark" ? "bg-gray-800/30" : "bg-white/30"} rounded-3xl shadow-2xl overflow-hidden`}
        >
          <div className="md:flex">
            <div className="md:w-1/3 p-12 relative">
              <div className="relative w-64 h-64 mx-auto">
                <Image
                  src={userData?.ava || "/placeholder-avatar.png"}
                  alt={userData?.name || "User"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full shadow-lg"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <CameraIcon className="h-16 w-16 text-white" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                )}
              </div>
              <div className="mt-8 text-center">
                <h1
                  className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {userData?.name || "User Profile"}
                </h1>
                <p
                  className={`text-lg mt-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                >
                  {userData?.role}
                </p>
                <div className="mt-6 relative">
                  <button
                    onClick={handleEdit}
                    className={`flex items-center px-6 py-3 rounded-full mx-auto text-lg ${
                      theme === "dark"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white transition-colors duration-300 shadow-lg`}
                  >
                    <PencilIcon className="h-6 w-6 mr-2" />
                    {isEditing ? "Save Profile" : "Edit Profile"}
                  </button>
                  {saveStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 mt-2"
                    >
                      {saveStatus === "success" ? (
                        <div className="flex items-center justify-center text-green-500">
                          <CheckCircleIcon className="h-5 w-5 mr-1" />
                          <span>Saved successfully!</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center text-red-500">
                          <XCircleIcon className="h-5 w-5 mr-1" />
                          <span>Error saving. Please try again.</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-12">
              <div className="flex justify-between items-center mb-8">
                <div className="flex space-x-6">
                  {["overview", "activity", "settings"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 rounded-full text-lg ${
                        activeTab === tab
                          ? theme === "dark"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-600 hover:bg-gray-200"
                      } transition-colors duration-300 shadow-md`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`p-3 rounded-full ${theme === "dark" ? "bg-yellow-400" : "bg-gray-800"} shadow-lg`}
                >
                  {theme === "dark" ? (
                    <SunIcon className="h-8 w-8 text-gray-900" />
                  ) : (
                    <MoonIcon className="h-8 w-8 text-white" />
                  )}
                </button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {editableFields.map((field) => (
                        <div key={field.name} className="flex flex-col">
                          <label
                            className={`text-lg font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                          >
                            <field.icon className="h-6 w-6 inline mr-2" />
                            {field.label}
                          </label>
                          {isEditing ? (
                            field.name === "description" ? (
                              <textarea
                                name={field.name}
                                value={userData?.[field.name] || ""}
                                onChange={handleInputChange}
                                rows="4"
                                className={`mt-1 block w-full rounded-lg text-lg ${
                                  theme === "dark"
                                    ? "bg-gray-700 text-white"
                                    : "bg-white text-gray-900"
                                } border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                              />
                            ) : (
                              <input
                                type={field.name === "dob" ? "date" : "text"}
                                name={field.name}
                                value={userData?.[field.name] || ""}
                                onChange={handleInputChange}
                                className={`mt-1 block w-full rounded-lg text-lg ${
                                  theme === "dark"
                                    ? "bg-gray-700 text-white"
                                    : "bg-white text-gray-900"
                                } border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                              />
                            )
                          ) : (
                            <p
                              className={`mt-1 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                            >
                              {userData?.[field.name] || "Not provided"}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "activity" && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {statCards.map((card, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`p-6 rounded-2xl ${theme === "dark" ? "bg-gray-700" : "bg-white"} shadow-xl`}
                        >
                          <card.icon
                            className={`h-12 w-12 ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`}
                          />
                          <h4
                            className={`mt-4 font-semibold text-xl ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
                          >
                            {card.title}
                          </h4>
                          <p
                            className={`text-4xl font-bold mt-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                          >
                            {card.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {activeTab === "settings" && (
                    <div
                      className={`p-8 rounded-2xl ${theme === "dark" ? "bg-gray-700" : "bg-white"} shadow-xl`}
                    >
                      <h3
                        className={`text-2xl font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        Account Settings
                      </h3>
                      {/* Add account settings options here */}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
