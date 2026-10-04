import React from "react";

import { GiFireShield } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {

    try {

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      console.log(token);
      console.log("Logged in user: ", user);
      navigate("/equipment");

    }catch(error) {
      console.error("Google login error: ", error);
    }

  };

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4"
    >

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg"
      >

        {/* Logo */}

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >

          <GiFireShield size={48} className="text-orange-600" />

        </motion.div>

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-center text-2xl font-extrabold tracking-wide text-gray-800"
        >

          SAFEGUARD PRO

        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-center text-ms leading-7 font-semibold text-gray-700"
        >

          Manage your fire safety equipment, inspections, and safety reports
          — all in one place.

        </motion.p>

        {/* Divider */}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="my-6 flex items-center gap-3"
        >

          <div className="h-px flex-1 bg-gray-200"></div>

          <span className="text-xs text-gray-600">SECURE LOGIN</span>

          <div className="h-px flex-1 bg-gray-200"></div>

        </motion.div>

        {/* Google Button */}

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow"
        >

          <FcGoogle size={22} />

          <span>Continue with Google</span>

        </motion.button>

        {/* Footer */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-6 text-center text-xs text-gray-600"
        >

          Secure access to your fire safety management system.

        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full text-center items-center justify-center gap-3 px-2 py-4 mt-4 border-orange-400 rounded-2xl bg-orange-400 text-white font-medium hover:bg-orange-300"
        >

          <FaArrowCircleLeft size={22} />

          <Link to="/">Back to Home</Link>

        </motion.div>

      </motion.div>

    </motion.div>

  );

}

export default Login;