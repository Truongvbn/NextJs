import React from "react";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img className="h-8" src="/api/placeholder/160/40" alt="Company logo" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Making the world a better place through constructing elegant hierarchies.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200/30 dark:border-gray-700/30 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
      <div className="w-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 h-1"></div>
      <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        Made with <Heart className="inline-block w-4 h-4 text-red-500 mx-1" /> by Our Amazing Team
      </div>
    </footer>
  );
};

export default Footer;
