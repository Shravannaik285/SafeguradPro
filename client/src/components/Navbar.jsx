import React, { useState } from "react";

import { GiFireShield } from "react-icons/gi";

import { FaBars, FaTimes } from "react-icons/fa";

import { Link, useNavigate } from 'react-router-dom';

import { auth } from "../firebase";

import { signOut } from "firebase/auth";

import { motion, AnimatePresence } from "framer-motion";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

      await signOut(auth);

      navigate("/login");

    } catch (error) {

      console.error("Logout error: ", error)

    }

  }

  return (

    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="m-2 mt-3 rounded-xl border-2 border-gray-200 p-4 shadow-xl"
    >

      {/* Top section */}

      <div className="flex items-center justify-between">

        {/* Logo */}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2"
        >

          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <GiFireShield
              size={28}
              className="rounded-xl bg-orange-300 p-1"
            />
          </motion.div>

          <h3 className="text-xl font-bold">
            SAFEGUARD PRO
          </h3>

        </motion.div>


        {/* Mobile menu button */}

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-xl hover:bg-gray-100 sm:hidden"
        >

          {menuOpen ? <FaTimes /> : <FaBars />}

        </motion.button>


        {/* Desktop navigation */}

        <motion.ul
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden items-center gap-20 font-semibold leading-5 text-xm sm:flex"
        >

          <Link to="/equipment">

            <motion.li
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer hover:text-orange-500 hover:underline hover:decoration-2 decoration-orange-500 underline-offset-8 transition-all duration-200 aria-current:text-orange-500"
            >
              Equipment
            </motion.li>

          </Link>


          <Link to="/inspection">

            <motion.li
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer hover:text-orange-500 hover:underline hover:decoration-2 decoration-orange-500 underline-offset-8 transition-all duration-200"
            >
              Inspection
            </motion.li>

          </Link>


          <Link to="/report">

            <motion.li
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer hover:text-orange-500 hover:underline hover:decoration-2 decoration-orange-500 underline-offset-8 transition-all duration-200"
            >
              Reports
            </motion.li>

          </Link>


          <li>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Sign out
            </motion.button>

          </li>

        </motion.ul>

      </div>


      {/* Mobile navigation */}

      <AnimatePresence>

        {menuOpen && (

          <motion.ul
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex flex-col gap-4 border-t border-gray-200 pt-4 text-center font-semibold lg:hidden"
          >

            <Link to="/equipment">

              <motion.li
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer rounded-lg p-2 hover:bg-orange-50 hover:text-orange-500"
              >
                Equipment
              </motion.li>

            </Link>


            <Link to="/inspection">

              <motion.li
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer rounded-lg p-2 hover:bg-orange-50 hover:text-orange-500"
              >
                Inspection
              </motion.li>

            </Link>


            <Link to="/report">

              <motion.li
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer rounded-lg p-2 hover:bg-orange-50 hover:text-orange-500"
              >
                Reports
              </motion.li>

            </Link>


            <li>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Sign out
              </motion.button>

            </li>

          </motion.ul>

        )}

      </AnimatePresence>

    </motion.div>

  );

}

export default Navbar;