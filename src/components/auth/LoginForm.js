'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Lock, User, Eye, EyeOff, ArrowRight, LogIn } from 'lucide-react';
import { FaChalkboardTeacher, FaEnvelope, FaUserGraduate, FaUserPlus, FaQuestionCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authApi } from '@/ultils/axiosconfig';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const { theme } = useTheme();

  const parseJwt = useCallback((token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }, []);

  const navigateBasedOnRole = useCallback((role) => {
    const routes = {
      STUDENT: '/dashboard',
      INSTRUCTOR: '/instructor',
      SUPER_ADMIN: '/super_admin',
    };
    setTimeout(() => router.push(routes[role] || '/login'), 1000);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showOtpField) {
      try {
        const response = await authApi.post('/auth/login', { email, password });
        if (response.status === 200) {
          if (email === 'admin@admin.com') {
            processLoginResponse(response.data.payload);
          } else {
            setShowOtpField(true);
            toast.info('OTP has been sent to your email.');
          }
        }
      } catch (error) {
        toast.error('Login failed. Please check your credentials and try again.');
      }
    } else {
      try {
        const response = await authApi.post('/auth/check-otp', { otp, email });
        processLoginResponse(response.data.payload);
      } catch (error) {
        toast.error('OTP verification failed. Please try again.');
      }
    }
  };

  const processLoginResponse = (payload) => {
    const { AccessToken, RefreshToken } = payload;
    localStorage.setItem('accessToken', AccessToken);
    localStorage.setItem('refreshToken', RefreshToken);

    const decodedToken = parseJwt(AccessToken);
    if (decodedToken) {
      localStorage.setItem('userInfo', JSON.stringify({
        email: decodedToken.sub,
        role: decodedToken.role,
      }));
    }

    toast.success('Login successful!');
    navigateBasedOnRole(decodedToken.role);
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
        
        <AnimatePresence mode="wait">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative group"
            >
              <FaEnvelope className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 bg-opacity-20 dark:bg-opacity-30 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                placeholder="Email address"
                required
              />
            </motion.div>
            {!showOtpField ? (
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative group"
              >
                <Lock className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
                <input
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
            ) : (
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative group"
              >
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 bg-opacity-20 dark:bg-opacity-30 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                  placeholder="Enter OTP"
                  required
                />
              </motion.div>
            )}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              {showOtpField ? "Verify OTP" : "Sign in"}
              <ArrowRight className="ml-2 transition-transform duration-300 transform group-hover:translate-x-1" size={20} />
            </motion.button>
          </form>
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 flex justify-between items-center text-sm"
        >
          <Link href="/forgot-password" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 flex items-center">
            <FaQuestionCircle className="mr-1" />
            Forgot Password?
          </Link>
          <Link href="/signup" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 flex items-center">
            <FaUserPlus className="mr-1" />
            Create an account
          </Link>
        </motion.div>
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  );
}