import React from "react";
import { Github, Twitter, Linkedin, Heart, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const contactInfo = [
    { icon: Mail, text: "contact@learnhub.com" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: MapPin, text: "123 Education St, Knowledge City" },
  ];

  const footerLinks = [
    { title: "Company", items: ["About Us", "Careers", "Partners", "Contact Us"] },
    { title: "Resources", items: ["Blog", "Newsletters", "Help Center", "FAQs"] },
    { title: "Legal", items: ["Terms of Service", "Privacy Policy", "Cookie Policy"] },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-white/30 to-gray-100/30 dark:from-gray-800/30 dark:to-gray-900/30 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-10"
              src="/api/placeholder/200/50"
              alt="LearnHub logo"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Empowering minds, shaping futures. Join us on a journey of lifelong learning and
              growth.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <span className="sr-only">{link.label}</span>
                  <link.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, index) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.items.map((item, itemIndex) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-base text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200/30 dark:border-gray-700/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600 dark:text-gray-400">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center">
                  <info.icon className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                  <span>{info.text}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
              &copy; 2024 LearnHub, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 h-1"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50"
      >
        Crafted with <Heart className="inline-block w-4 h-4 text-red-500 mx-1" /> by Our Passionate
        Team
      </motion.div>
    </footer>
  );
};

export default Footer;
