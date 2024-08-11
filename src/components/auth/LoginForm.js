'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import { Lock, Mail, Eye, EyeOff, X } from 'lucide-react';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const otpSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is required').length(6, 'OTP must be 6 digits'),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost/auth-service/api/user/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      toast.success('Login successful! Please enter OTP.');
      setEmail(values.email);
      setShowOtpModal(true);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost/auth-service/api/user/auth/check-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
        },
        body: JSON.stringify({
          otp: values.otp,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error('OTP verification failed');
      }

      const data = await response.json();
      console.log('OTP verification successful:', data);
      toast.success('OTP verified successfully!');
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('OTP verification failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse, role) => {
    // ... (Google login logic remains unchanged)
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="m-auto w-full max-w-md p-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700"
      >
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}

              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </motion.button>
            </Form>
          )}
        </Formik>

        {/* Google Login buttons remain unchanged */}
        {/* ... */}

        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/signup')}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Sign up
          </button>
        </p>
      </motion.div>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full relative"
            >
              <button
                onClick={() => setShowOtpModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-white">Enter OTP</h2>
              <Formik
                initialValues={{ otp: '' }}
                validationSchema={otpSchema}
                onSubmit={handleOtpSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <Field
                      name="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {touched.otp && errors.otp && (
                      <div className="text-red-500 text-sm mt-1">{errors.otp}</div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className={`w-full mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                    </motion.button>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer theme="dark" />
    </div>
  );
}
