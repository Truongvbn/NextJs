"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Home,
  BookOpen,
  Users,
  BarChart2,
  Calendar,
  MessageSquare,
  Bell,
  Star,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Layers,
  Target,
  Award,
  Briefcase,
  Compass,
  FileText,
  Play,
  Book,
} from "lucide-react";

const menuGroups = [
  {
    name: "Main",
    items: [
      { name: "Dashboard", icon: Home, path: "/" },
      { name: "My Learning", icon: BookOpen, path: "/my-learning" },
      { name: "Community", icon: Users, path: "/community" },
      { name: "Analytics", icon: BarChart2, path: "/analytics" },
    ],
  },
  {
    name: "Explore",
    items: [
      { name: "Courses", icon: Book, path: "/courses" },
      { name: "Learning Paths", icon: Compass, path: "/learning-paths" },
      { name: "Live Sessions", icon: Play, path: "/live-sessions" },
      { name: "Resources", icon: FileText, path: "/resources" },
    ],
  },
  {
    name: "Personal",
    items: [
      { name: "Calendar", icon: Calendar, path: "/calendar" },
      { name: "Messages", icon: MessageSquare, path: "/messages" },
      { name: "Notifications", icon: Bell, path: "/notifications" },
      { name: "Favorites", icon: Star, path: "/favorites" },
    ],
  },
  {
    name: "Career",
    items: [
      { name: "Job Board", icon: Briefcase, path: "/job-board" },
      { name: "Skills Assessment", icon: Target, path: "/skills-assessment" },
      { name: "Certifications", icon: Award, path: "/certifications" },
    ],
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState(null);
  const { theme } = useTheme();

  const sidebarVariants = {
    open: { width: 240, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { width: 64, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <motion.div
      className={`fixed left-0 top-16 bottom-0 ${
        theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
      } shadow-lg z-40 overflow-hidden transition-all duration-300 ease-in-out`}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="flex flex-col h-full py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <nav className="flex-1 px-2 space-y-4">
          {menuGroups.map((group) => (
            <div key={group.name} className="space-y-1">
              {isOpen && (
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {group.name}
                </h3>
              )}
              {group.items.map((item) => (
                <Link href={item.path} key={item.name}>
                  <motion.div
                    className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      pathname === item.path
                        ? "bg-blue-600 text-white"
                        : `hover:bg-gray-100 hover:text-gray-900 ${
                            theme === "dark" ? "hover:bg-gray-800 hover:text-white" : ""
                          }`
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onHoverStart={() => setHoveredItem(item.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <item.icon className="w-5 h-5" />
                    <AnimatePresence>
                      {(isOpen || hoveredItem === item.name) && (
                        <motion.span
                          className="ml-3 whitespace-nowrap"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="px-2 py-4 space-y-1 border-t border-gray-200 dark:border-gray-700">
          <Link href="/settings">
            <motion.div
              className={`flex items-center p-2 rounded-lg cursor-pointer ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
              } transition-all duration-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-5 h-5" />
              {isOpen && <span className="ml-3">Settings</span>}
            </motion.div>
          </Link>
          <Link href="/help">
            <motion.div
              className={`flex items-center p-2 rounded-lg cursor-pointer ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
              } transition-all duration-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="w-5 h-5" />
              {isOpen && <span className="ml-3">Help & Support</span>}
            </motion.div>
          </Link>
          <motion.div
            className={`flex items-center p-2 rounded-lg cursor-pointer ${
              theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
            } transition-all duration-200`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span className="ml-3">Logout</span>}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
