'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Lock, User, Eye, EyeOff, ArrowRight, LogIn } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempted with:', username, password);
    // Implement login logic here
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
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
          <LogIn className="inline-block w-16 h-16 text-blue-400 dark:text-blue-300 mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative group"
          >
            <User className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" size={20} />
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 bg-opacity-20 dark:bg-opacity-30 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
              placeholder="Username or Email"
              required
            />
          </motion.div>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative group"
          >
            <Lock className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" size={20} />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-700 bg-opacity-20 dark:bg-opacity-30 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center group"
            >
              Log In
              <ArrowRight className="ml-2 transition-transform duration-300 transform group-hover:translate-x-1" size={20} />
            </button>
          </motion.div>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex flex-col space-y-4"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or sign in with</span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleSocialLogin('google')}
              className="flex justify-center items-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
              </svg>
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="flex justify-center items-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button
              onClick={() => handleSocialLogin('apple')}
              className="flex justify-center items-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#000000" d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.07-.5-2.06-.48-3.2 0-1.42.63-2.17.53-3.02-.42-3.95-4.35-3.69-11.07 .5-14.29 1.91-1.48 4.84-1.51 6.31.23 1.06-.6 2.87-1.11 4.38-.3 1.8.99 2.92 2.64 2.65 5.63-2.51.17-4.28 2.6-3.78 5.27 .44 2.32 2.43 3.83 4.24 3.47-.5 1.39-1.36 2.39-2.41 3.29-1.88 1.61-3.68 1.57-5.52-.03 .38-.29 .71-.56 1.93-3.26z"/>
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 flex justify-between items-center text-sm"
        >
          <Link href="/forgot-password" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
            Forgot Password?
          </Link>
          <Link href="/signup" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
            Create an account
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}