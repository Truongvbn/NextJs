"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  Bell,
  ShoppingCart,
  Sun,
  Moon,
  User,
  ChevronDown,
  Book,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut,
  Calendar,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";

const Header = ({ toggleSidebar }) => {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState("/api/placeholder/32/32");
  useEffect(() => {
    const UserData = localStorage.getItem("Userdata");
    if (UserData) {
      try {
        const parsedUserData = JSON.parse(UserData);
        if (parsedUserData.ava) {
          setUserAvatar(parsedUserData.ava);
        }
      } catch (error) {
        console.error("Failed to parse Userdata from localStorage", error);
      }
    }
  }, []);
  const notifications = [
    { id: 1, text: "New course available", type: "info" },
    { id: 2, text: "Your assignment is due soon", type: "warning" },
    { id: 3, text: "You've earned a new badge", type: "success" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm z-50">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Learn<span className="text-blue-600">Hub</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex space-x-4 flex-1 justify-center">
          {["Courses", "Paths", "Mentors", "Community"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full h-10 px-4 pr-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                isSearchOpen ? "w-40 sm:w-60 opacity-100" : "w-0 opacity-0"
              }`}
            />
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          <button className="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Calendar className="h-6 w-6" />
          </button>

          <button className="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <MessageSquare className="h-6 w-6" />
          </button>

          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Bell className="h-6 w-6" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            )}
          </button>

          <button className="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <ShoppingCart className="h-6 w-6" />
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Image
                src={userAvatar}
                alt="User avatar"
                width={48} // Increased width
                height={48} // Increased height
                className="rounded-full border-2 border-gray-300 dark:border-gray-700 object-cover aspect-square" // Added aspect-square for circular appearance
              />
              <ChevronDown className="h-4 w-4" />
            </button>

            <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  {[
                    { text: "Your Profile", icon: User, href: "/profile" },
                    { text: "Your Courses", icon: Book, href: "/courses" },
                    { text: "Achievements", icon: TrendingUp, href: "/achievements" },
                    { text: "Settings", icon: Settings, href: "/settings" },
                    { text: "Help Center", icon: HelpCircle, href: "/help" },
                    { text: "Sign out", icon: LogOut, href: "/logout" },
                  ].map((item) => (
                    <Link
                      key={item.text}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      <item.icon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                      {item.text}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isNotificationOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="px-4 py-2 font-semibold text-gray-900 dark:text-white">
              Notifications
            </div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {notification.text}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
