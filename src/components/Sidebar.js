'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, Layers, Heart, Book, DollarSign, Settings, LogOut } from 'lucide-react';
import { useTranslation } from 'next-i18next';

const iconComponents = {
  FaHome: Home,
  FaCompass: Compass,
  FaLayerGroup: Layers,
  FaHeart: Heart,
  FaBook: Book,
  FaDollarSign: DollarSign,
};

export default function Sidebar({ isCollapsed, toggleSidebar, roles = 'STUDENT' }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const items = [
      {
        name: t("Home"),
        icon: "FaHome",
        path: roles === "STUDENT" ? `/${roles.toLowerCase()}/` : "/",
      },
      {
        name: t("Explore"),
        icon: "FaCompass",
        path: roles === "STUDENT" ? `/${roles.toLowerCase()}/explore` : "/explore",
      },
      {
        name: t("Categories"),
        icon: "FaLayerGroup",
        path: roles === "STUDENT" ? `/${roles.toLowerCase()}/categoryHome` : "/categoryHome",
      },
    ];

    if (roles === "STUDENT") {
      items.push(
        { name: t("Save courses"), icon: "FaHeart", path: `/${roles.toLowerCase()}/saveCourses` },
        { name: t("My courses"), icon: "FaBook", path: `/${roles.toLowerCase()}/my-courses` },
      );
    } else if (roles === "INSTRUCTOR") {
      items.push({ name: t("Earnings"), icon: "FaDollarSign", path: "/instructor/Store-Credit" });
    }

    setMenuItems(items);
  }, [roles, t]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 
                  shadow-lg overflow-hidden z-50 flex flex-col
                  transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              MyApp
            </motion.h1>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {isCollapsed ? <Compass className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
        </button>
      </div>
      <nav className="flex-grow overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const Icon = iconComponents[item.icon];
            return (
              <li key={item.name}>
                <Link href={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200
                              ${isCollapsed ? 'justify-center' : ''}
                              ${pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  <Icon className="w-6 h-6" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="ml-3 text-sm font-medium"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={handleLogout}
          className={`flex items-center p-3 rounded-lg transition-all duration-200 w-full
                      ${isCollapsed ? 'justify-center' : ''}
                      text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
        >
          <LogOut className="w-6 h-6" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 text-sm font-medium"
              >
                {t("Logout")}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}