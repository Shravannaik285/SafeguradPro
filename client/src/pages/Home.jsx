import react from "react";

import { GiFireShield } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { FaFireExtinguisher } from "react-icons/fa";
import { FcInspection } from "react-icons/fc";
import { FaRobot } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoLocationSharp } from "react-icons/io5";

function Home() {

  const navigate = useNavigate();

  const safety = [
    {
      icon: <FaFireExtinguisher />,
      name: "Equipment",
      content: "Keep track of all your fire safety equipment",
    },
    {
      icon: <FcInspection />,
      name: "Inspection",
      content: "Create and manage inspections easily",
    },
    {
      icon: <FaRobot />,
      name: "AI Analysis",
      content: "Get AI Insights from inspection reports",
    },
    {
      icon: <IoLocationSharp />,
      name: "Locations",
      content: "Manage your locations and their equipment",
    }
  ];

  return (

    <div className="max-w-full h-full mx-auto">

      <div className="flex flex-col items-center text-center px-6 py-16">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2 bg-amber-200 rounded-2xl p-4 mb-4"
        >
          <GiFireShield size={36} className="text-orange-500" />

          <h1 className="text-3xl font-extrabold text-slate-900">
            SAFEGUARD PRO
          </h1>

        </motion.div>


        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl sm:text-5xl mt-8 font-bold tracking-tight text-slate-900 lg:"
        >
          FIRE SAFETY MADE SIMPLE
        </motion.h2>


        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl text-xl leading-10 text-gray-600 font-semibold"
        >
          Manage your fire safety equipment, inspections, locations, and
          AI-powered analysis from one place.
        </motion.p>


        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="mt-8 flex items-center gap-3 rounded-xl bg-orange-500 px-6 py-3 text-lg font-semibold text-white transition hover:bg-orange-600 hover:shadow-lg"
        >
          Get Started
          <FaArrowRight size={16} />
        </motion.button>


        {/* Video Introduction */}

        <div className="mx-auto mt-12 max-w-5xl px-6 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-5xl font-bold text-slate-900 lg:"
          >
            See Safeguard Pro in Action
          </motion.h2>


          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-3 text-xl max-w-2xl leading-10 text-gray-600 font-semibold"
          >
            A simple platform to manage your fire safety equipment, inspections,
            locations, and AI-powered safety analysis.
          </motion.p>


          <motion.video
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            src="/safeguardpro.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="mt-8 w-full rounded-2xl shadow-xl"
          />


          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-5xl lg:mt-16 font-bold text-slate-900 mt-8 lg:"
          >
            Everything You Need for Fire Safety
          </motion.h3>


          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-3xl mt-3 text-large text-xl leading-10 text-gray-600 font-semibold"
          >
            Safeguard Pro brings your buildings, safety equipment, inspections,
            location information, and AI insights together in one organized
            platform.
          </motion.p>

        </div>

      </div>


      {/* Why Safeguard Pro */}

      <div className="mx-auto mt-10 max-w-6xl px-6">

        <motion.div
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7 }}
          className="text-center"
        >

          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 lg:">
            Why Safeguard Pro?
          </h2>

          <p className="text-xl leading-10 mx-auto mt-3 max-w-2xl text-gray-600 font-semibold">
            Everything you need to keep your fire safety management organized
            and accessible.
          </p>

        </motion.div>


        {/* Cards */}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {safety.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15
              }}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* Icon */}

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">

                <span className="text-3xl">
                  {item.icon}
                </span>

              </div>


              {/* Title */}

              <h3 className="mt-5 text-2xl font-bold text-slate-900">
                {item.name}
              </h3>


              {/* Description */}

              <p className="mt-3 text-sm leading-8 text-gray-600 font-semibold">
                {item.content}
              </p>

            </motion.div>

          ))}

        </div>

      </div>


      {/* Footer */}

      <footer className="mt-20 border-t border-gray-200 bg-gray-50">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-6xl px-6 py-10"
        >

          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">

            {/* Brand */}

            <div>

              <div className="flex items-center justify-center gap-2 sm:justify-start">

                <GiFireShield size={28} className="text-orange-500" />

                <h2 className="text-xl font-extrabold text-slate-900">
                  SAFEGUARD PRO
                </h2>

              </div>

              <p className="mt-2 text-sm text-gray-500">
                Fire safety management, simplified.
              </p>

            </div>

          </div>


          {/* Copyright */}

          <div className="flex w-full mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-400">

            © 2026 Safeguard Pro. Built for smarter fire safety management.

          </div>

        </motion.div>

      </footer>

    </div>

  );

}

export default Home;