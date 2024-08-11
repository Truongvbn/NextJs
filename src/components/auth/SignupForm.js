'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Lock,
  User,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  Zap,
  UserCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fakeUsers = [
  { name: 'John Doe', role: 'Designer' },
  { name: 'Jane Smith', role: 'Developer' },
  { name: 'Alex Johnson', role: 'Manager' },
];

const signUpSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/\d/, 'Must contain a number')
    .matches(/\W/, 'Must contain a special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  role: Yup.string().required('Role is required'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Welcome aboard! Please check your email to verify your account.');
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const InputField = ({ icon: Icon, name, type, placeholder }) => (
    <div className="relative mb-4">
      <Icon
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
      />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="m-auto w-full max-w-5xl p-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Sign Up Form */}
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold mb-6 text-white text-center lg:text-left"
            >
              Create Your Account
            </motion.h1>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: '',
                agreeToTerms: false,
              }}
              validationSchema={signUpSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-4">
                  <InputField icon={User} name="username" type="text" placeholder="Username" />
                  {touched.username && errors.username && (
                    <div className="text-red-500 text-sm mt-1">{errors.username}</div>
                  )}

                  <InputField icon={Mail} name="email" type="email" placeholder="Email" />
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

                  <InputField
                    icon={Lock}
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                  )}

                  <div className="relative">
                    <UserCircle
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Field
                      as="select"
                      name="role"
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-300"
                    >
                      <option value="">Select Role</option>
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                    </Field>
                  </div>
                  {touched.role && errors.role && (
                    <div className="text-red-500 text-sm mt-1">{errors.role}</div>
                  )}

                  <div className="flex items-center">
                    <Field type="checkbox" name="agreeToTerms" className="mr-2" />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>
                  {touched.agreeToTerms && errors.agreeToTerms && (
                    <div className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    <ArrowRight className="ml-2" size={18} />
                  </motion.button>

                  <p className="text-center text-sm text-gray-400 mt-4">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => router.push('/login')}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      Log in
                    </button>
                  </p>
                </Form>
              )}
            </Formik>
          </div>

          {/* Right side content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-semibold mb-6 text-white text-center lg:text-left"
              >
                Join Our Community
              </motion.h2>
              <ul className="space-y-4">
                {['Collaborate with experts', 'Access exclusive content', 'Grow your network'].map(
                  (feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      className="flex items-center text-gray-300"
                    >
                      <CheckCircle className="mr-3 text-blue-400 flex-shrink-0" size={24} />
                      <span className="text-lg">{feature}</span>
                    </motion.li>
                  )
                )}
              </ul>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-8"
              >
                <h3 className="text-2xl font-semibold mb-4 text-white">Recent Signups</h3>
                <ul className="space-y-3">
                  {fakeUsers.map((user, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      className="flex items-center bg-gray-700 bg-opacity-50 p-3 rounded-lg backdrop-filter backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-3 flex-grow">
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.role}</p>
                      </div>
                      <Zap className="text-yellow-400 flex-shrink-0" size={20} />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="mt-8 pt-6 border-t border-gray-700"
            >
              <p className="text-sm text-gray-400 text-center">
                By signing up, you agree to our{' '}
                <button type="button" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <ToastContainer theme="dark" />
    </div>
  );
}
