'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

const RootLayoutClient = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      setIsSidebarOpen(!isMobileView);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <GoogleOAuthProvider clientId="422217154298-bjcl2qsshlj7o5cgul87bia4a4qc6uul.apps.googleusercontent.com">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex flex-1">
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ x: -256 }}
                  animate={{ x: 0 }}
                  exit={{ x: -256 }}
                  transition={{ duration: 0.3 }}
                  className="z-10"
                >
                  <Sidebar isCollapsed={!isSidebarOpen} toggleSidebar={toggleSidebar} />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.main
              className="flex-1 p-4 lg:p-8 overflow-y-auto mt-16"
              initial={false}
              animate={{
                marginLeft: isMobile ? 0 : isSidebarOpen ? 256 : 0,
                width: isMobile ? '100%' : `calc(100% - ${isSidebarOpen ? 256 : 0}px)`,
              }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.main>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default RootLayoutClient;
