'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon, LogIn, UserPlus, LayoutDashboard, Key } from 'lucide-react';

const features = [
  { name: 'Login', path: '/login', icon: LogIn },
  { name: 'Sign Up', path: '/signup', icon: UserPlus },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Forgot Password', path: '/forgot-password', icon: Key },
];

export default function Home() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Welcome to My Next.js App</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Explore our features and get started</p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          System-wide dark mode is now available!
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              onClick={() => handleNavigation(feature.path)}
              className="w-full bg-white dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl p-6 text-center hover:bg-opacity-40 dark:hover:bg-opacity-40 transition-all duration-300 border border-white border-opacity-20 dark:border-gray-700 flex items-center justify-center"
            >
              <feature.icon className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-semibold text-gray-800 dark:text-white">{feature.name}</span>
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-8"
      >
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 flex items-center"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          <span className="ml-2">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </motion.div>
    </main>
  );
}