"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader } from "lucide-react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // 'verifying', 'success', 'error'

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setVerificationStatus("error");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost/auth-service/api/user/auth/verify?token=${token}`,
          {
            method: "POST",
          },
        );

        if (response.ok) {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("error");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus("error");
      }
    };

    verifyToken();
  }, [searchParams]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { delay: 0.2, type: "spring", stiffness: 200, damping: 10 },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {verificationStatus === "verifying" && (
          <div className="text-center">
            <Loader className="w-16 h-16 text-blue-400 animate-spin mx-auto" />
            <h2 className="mt-4 text-2xl font-semibold text-white">Verifying your account...</h2>
            <p className="mt-2 text-gray-300">Please wait while we confirm your email.</p>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="text-center">
            <motion.div variants={iconVariants}>
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            </motion.div>
            <h2 className="mt-4 text-2xl font-semibold text-white">Verification Successful!</h2>
            <p className="mt-2 text-gray-300">
              Your account has been verified. You can now log in.
            </p>
            <motion.button
              className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/login")}
            >
              Go to Login
            </motion.button>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="text-center">
            <motion.div variants={iconVariants}>
              <XCircle className="w-16 h-16 text-red-400 mx-auto" />
            </motion.div>
            <h2 className="mt-4 text-2xl font-semibold text-white">Verification Failed</h2>
            <p className="mt-2 text-gray-300">
              We couldn&apos;t verify your account. The link might be invalid or expired.
            </p>
            <motion.button
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/signup")}
            >
              Back to Sign Up
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
