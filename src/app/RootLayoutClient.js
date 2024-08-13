"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "react-query";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const RootLayoutClient = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setIsSidebarOpen(!isMobileView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="422217154298-bjcl2qsshlj7o5cgul87bia4a4qc6uul.apps.googleusercontent.com">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
              <Header toggleSidebar={toggleSidebar} />
              <div className="flex flex-1 pt-16">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <motion.main
                  className="flex-1 overflow-y-auto transition-all duration-300"
                  initial={false}
                  animate={{
                    marginLeft: isMobile ? 0 : isSidebarOpen ? 240 : 64,
                    width: isMobile ? "100%" : `calc(100% - ${isSidebarOpen ? 240 : 64}px)`,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="p-4 lg:p-8">
                    <motion.div
                      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-lg p-6 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {children}
                    </motion.div>
                  </div>
                </motion.main>
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default RootLayoutClient;
