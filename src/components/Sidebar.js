"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Compass,
  Layers,
  Heart,
  Book,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Users,
  BarChart,
  Bell,
  ChevronLeft,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Explore", icon: Compass, path: "/explore" },
  { name: "Categories", icon: Layers, path: "/categories" },
  { name: "Saved", icon: Heart, path: "/saved" },
  { name: "My Courses", icon: Book, path: "/my-courses" },
  { name: "Community", icon: Users, path: "/community" },
  { name: "Analytics", icon: BarChart, path: "/analytics" },
];

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const pathname = usePathname();
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setActiveSubmenu(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <motion.div
      className={`fixed left-0 top-16 bottom-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl text-gray-600 dark:text-gray-300 shadow-lg transition-all duration-300 ease-in-out z-40 border-r border-gray-200/50 dark:border-gray-700/50 ${isCollapsed ? "w-20" : "w-64"}`}
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
    >
      <div className="flex flex-col h-full py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <motion.div
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  pathname === item.path
                    ? "bg-blue-500/20 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100/60 dark:hover:bg-gray-700/60"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredItem(item.name)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <item.icon
                  size={24}
                  className={pathname === item.path ? "text-blue-600 dark:text-blue-400" : ""}
                />
                {(!isCollapsed || hoveredItem === item.name) && (
                  <AnimatePresence>
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  </AnimatePresence>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>
        <div className="px-2 py-4 space-y-1 border-t border-gray-200/50 dark:border-gray-700/50">
          <motion.div
            onClick={() => toggleSubmenu("settings")}
            className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100/60 dark:hover:bg-gray-700/60 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center">
              <Settings size={24} />
              {!isCollapsed && <span className="ml-4">Settings</span>}
            </div>
            {!isCollapsed && (
              <ChevronRight
                size={20}
                className={`transform transition-transform duration-200 ${
                  activeSubmenu === "settings" ? "rotate-90" : ""
                }`}
              />
            )}
          </motion.div>
          <AnimatePresence>
            {activeSubmenu === "settings" && !isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="ml-8 space-y-1"
              >
                {["Profile", "Account", "Notifications"].map((item) => (
                  <Link href={`/settings/${item.toLowerCase()}`} key={item}>
                    <motion.div
                      className="p-2 rounded-md hover:bg-gray-100/60 dark:hover:bg-gray-700/60 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <Link href="/help">
            <motion.div
              className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100/60 dark:hover:bg-gray-700/60 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle size={24} />
              {!isCollapsed && <span className="ml-4">Help & Support</span>}
            </motion.div>
          </Link>
          <motion.div
            className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100/60 dark:hover:bg-gray-700/60 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={24} />
            {!isCollapsed && <span className="ml-4">Logout</span>}
          </motion.div>
        </div>
      </div>
      {/* <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-blue-500/10 dark:bg-blue-400/10 rounded-lg p-4 backdrop-blur-sm"
          >
            <div className="flex items-center mb-2">
              <Bell size={20} className="text-blue-500 dark:text-blue-400 mr-2" />
              <span className="font-semibold text-blue-600 dark:text-blue-400">What's New</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Check out our latest features and updates!</p>
            <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">Learn More</button>
          </motion.div>
        )}
      </AnimatePresence> */}
    </motion.div>
  );
};

export default Sidebar;
