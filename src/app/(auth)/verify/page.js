"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Loader } from "lucide-react";

const VerifyPageContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verificationStatus, setVerificationStatus] = useState("verifying");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(
          `http://localhost/auth-service/api/user/auth/verify?token=${token}`,
        );
        if (response.ok) {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("failed");
        }
      } catch (error) {
        setVerificationStatus("failed");
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5 } },
  };

  return (
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
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
          </motion.div>
          <h2 className="mt-4 text-2xl font-semibold text-white">Verification Successful!</h2>
          <p className="mt-2 text-gray-300">Your account has been verified. You can now log in.</p>
          <motion.button
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/login")}
          >
            Go to Login
          </motion.button>
        </div>
      )}

      {verificationStatus === "failed" && (
        <div className="text-center">
          <h2 className="mt-4 text-2xl font-semibold text-red-500">Verification Failed</h2>
          <p className="mt-2 text-gray-300">
            There was an issue verifying your account. Please try again.
          </p>
        </div>
      )}
    </motion.div>
  );
};

const VerifyPage = () => {
  return (
    <Suspense fallback={<Loader className="w-16 h-16 text-blue-400 animate-spin mx-auto" />}>
      <VerifyPageContent />
    </Suspense>
  );
};

export default VerifyPage;
