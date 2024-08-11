'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  MessageSquare,
  Search,
  Moon,
  Sun,
  User,
  Menu,
  ChevronDown,
  Book,
  Settings,
  LogOut,
} from 'lucide-react';
import { useTheme } from 'next-themes';

const Header = ({ toggleSidebar }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 h-16 flex items-center justify-between px-4 z-50 transition-all duration-300 ${
        scrollPosition > 50 ? 'shadow-md' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
        >
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">LearnHub</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className={`relative ${isSearchOpen ? 'w-64' : 'w-10'} transition-all duration-300`}>
          <input
            type="text"
            placeholder="Search..."
            className={`w-full h-10 px-4 rounded-full bg-gray-100/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
              isSearchOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-200/50 dark:bg-gray-600/50 text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-500/50 transition-colors duration-200"
          >
            <Search size={20} />
          </button>
        </div>
        <button className="relative p-2 rounded-full bg-gray-100/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-colors duration-200 group">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
          <span className="absolute top-full mt-1 right-0 bg-white dark:bg-gray-800 text-sm py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Notifications
          </span>
        </button>
        <button className="relative p-2 rounded-full bg-gray-100/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-colors duration-200 group">
          <MessageSquare size={20} />
          <span className="absolute top-full mt-1 right-0 bg-white dark:bg-gray-800 text-sm py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Messages
          </span>
        </button>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="relative p-2 rounded-full bg-gray-100/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-colors duration-200 group"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span className="absolute top-full mt-1 right-0 bg-white dark:bg-gray-800 text-sm py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Toggle Theme
          </span>
        </button>
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center space-x-2 p-1 rounded-full bg-gray-100/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-colors duration-200"
          >
            <img src="/api/placeholder/32/32" alt="User avatar" className="w-8 h-8 rounded-full" />
            <span className="hidden md:inline text-sm">John Doe</span>
            <ChevronDown size={16} />
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-md shadow-lg py-1 z-10">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200 flex items-center"
              >
                <User size={16} className="mr-2" />
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200 flex items-center"
              >
                <Book size={16} className="mr-2" />
                My Courses
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200 flex items-center"
              >
                <Settings size={16} className="mr-2" />
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-200 flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
