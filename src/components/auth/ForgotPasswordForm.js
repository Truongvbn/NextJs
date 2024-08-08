'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Mail, ArrowRight, KeyRound, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    // Implement password reset logic here
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="m-auto w-full max-w-md p-8 bg-white dark:bg-gray-800 bg-opacity-10 dark:bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-3xl shadow-2xl border border-white border-opacity-20 dark:border-gray-700"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <KeyRound className="inline-block w-16 h-16 text-blue-400 dark:text-blue-300 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Forgot Password?</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">No worries, we'll send you reset instructions.</p>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative group"
          >
            <Mail className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" size={20} />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 bg-opacity-20 dark:bg-opacity-30 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center group"
            >
              Reset Password
              <ArrowRight className="ml-2 transition-transform duration-300 transform group-hover:translate-x-1" size={20} />
            </button>
          </motion.div>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <Link 
            href="/login" 
            className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Login
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
          >
            Sign up
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}