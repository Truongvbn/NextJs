'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Mail, Eye, EyeOff, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const fakeUsers = [
  { name: 'John Doe', role: 'Designer' },
  { name: 'Jane Smith', role: 'Developer' },
  { name: 'Alex Johnson', role: 'Manager' },
];

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const strength = password.length > 8 ? 1 : 0
                   + /[A-Z]/.test(password) ? 1 : 0
                   + /[a-z]/.test(password) ? 1 : 0
                   + /[0-9]/.test(password) ? 1 : 0
                   + /[^A-Za-z0-9]/.test(password) ? 1 : 0;
    setPasswordStrength(strength);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sign up attempted with:', email, username, password);
    // Implement sign up logic here
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="m-auto w-full max-w-6xl p-8 flex bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700"
      >
        <div className="flex-1 pr-12 border-r border-gray-700">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-bold mb-8 text-white"
          >
            Create Your Account
          </motion.h1>
          
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
                className="w-full pl-10 pr-4 py-3 bg-gray-700 bg-opacity-50 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Email"
                required
              />
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative group"
            >
              <User className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" size={20} />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 bg-opacity-50 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Username"
                required
              />
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative group"
            >
              <Lock className="absolute top-3 left-3 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" size={20} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-700 bg-opacity-50 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex space-x-1"
            >
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 w-full rounded-full ${
                    i < passwordStrength 
                      ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
                      : 'bg-gray-600'
                  } transition-all duration-300`}
                ></div>
              ))}
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center group"
              >
                Create Account
                <ArrowRight className="ml-2 transition-transform duration-300 transform group-hover:translate-x-1" size={20} />
              </button>
            </motion.div>
          </form>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 text-sm text-gray-400 text-center"
          >
            Already have an account? <button onClick={goToLogin} className="text-blue-400 hover:text-blue-300 font-semibold">Log in</button>
          </motion.p>
        </div>
        
        <div className="flex-1 pl-12 flex flex-col justify-between">
          <div>
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-semibold mb-6 text-white"
            >
              Join Our Community
            </motion.h2>
            <ul className="space-y-4">
              {['Collaborate with experts', 'Access exclusive content', 'Grow your network'].map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="flex items-center text-gray-300"
                >
                  <CheckCircle className="mr-3 text-blue-400" size={24} />
                  <span className="text-lg">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-12"
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
                    <div className="ml-3">
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.role}</p>
                    </div>
                    <Zap className="ml-auto text-yellow-400" size={20} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-auto pt-6 border-t border-gray-700"
          >
            <p className="text-sm text-gray-400 text-center">
              By signing up, you agree to our <button className="text-blue-400 hover:text-blue-300">Terms of Service</button> and <button className="text-blue-400 hover:text-blue-300">Privacy Policy</button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}