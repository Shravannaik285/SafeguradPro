import React, { useState } from "react";

import {
  FaCloudUploadAlt,
  FaExclamationTriangle,
  FaFireExtinguisher,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from '../components/Navbar.jsx';

import { motion } from "framer-motion";

function AIReportAnalysis() {

  const [file, setFile] = useState(null);

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0];

    if (selectedFile) {

      setFile(selectedFile);

      setAnalysis(null);

    }

  };

  const handleAnalyze = async () => {

    if (!file) {

      alert("Please select an image first.");

      return;

    }

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("image", file);

      const response = await fetch(
        "http://localhost:5000/api/reports/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(data.message || "Analysis failed");

      }

      //console.log(data);

      const result = JSON.parse(data.choices[0].message.content);

      setAnalysis(result)

    } catch (error) {

      console.error(error);

      alert(error.message)

      //alert("Unable to analyze the image.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div>

      <Navbar />

      <div className="min-h-screen bg-gray-50 px-4 py-6">

        {/* Header */}

        <div className="max-w-6xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900"
          >
            AI Report Analysis
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-1 text-sm text-gray-500"
          >
            AI summary of the uploaded inspection report
          </motion.p>

          {/* Main Layout */}

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Upload Section */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >

              <label
                htmlFor="reportImage"
                className="min-h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
              >

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >

                  <FaCloudUploadAlt
                    size={42}
                    className="text-gray-800"
                  />

                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="mt-4 font-semibold text-gray-800"
                >
                  Upload Inspection Report
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="mt-2 text-xs text-gray-500"
                >
                  JPG or PNG (Max 10MB)
                </motion.p>

                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2 rounded"
                >
                  Choose File
                </motion.span>

                <input
                  id="reportImage"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

              {/* Selected File */}

              {file && (

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-sm text-gray-600"
                >

                  Selected:{" "}

                  <span className="font-medium text-gray-800">
                    {file.name}
                  </span>

                </motion.div>

              )}

              {/* Analyze Button */}

              {file && (

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
                >

                  {loading ? "Analyzing..." : "Analyze With AI"}

                </motion.button>

              )}

            </motion.div>


            {/* Results */}

            <div className="space-y-5">

              {/* AI Summary */}

              {analysis ? (

                <>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
                  >

                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                      ✨REPORT
                    </h2>

                    <p className="mt-4 text-sm text-gray-600 leading-6">
                      {analysis.summary}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">

                      <p>
                        •{" "}
                        <span className="font-semibold">
                          Risk Level:
                        </span>{" "}
                        {analysis.riskLevel}
                      </p>

                      <p>
                        •{" "}
                        <span className="font-semibold">
                          Issues Found:
                        </span>{" "}
                        {analysis.issuesFound}
                      </p>

                      <p>
                        •{" "}
                        <span className="font-semibold">
                          Recommendation:
                        </span>{" "}
                        {analysis.recommendation}
                      </p>

                    </div>

                  </motion.div>


                  {/* Issues */}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
                  >

                    <h2 className="font-bold text-gray-800">
                      Issues Detected
                    </h2>

                    <div className="mt-4 space-y-4">

                      {analysis.issues?.map((issue, index) => (

                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1
                          }}
                          className="flex items-center justify-between gap-3"
                        >

                          <div className="flex items-center gap-3">

                            {issue.severity === "High" ? (

                              <FaExclamationTriangle
                                className="text-red-500"
                              />

                            ) : (

                              <FaExclamationTriangle
                                className="text-orange-400"
                              />

                            )}

                            <span className="text-sm font-medium text-gray-700">
                              {issue.name}
                            </span>

                          </div>

                          <span
                            className={`text-xs px-3 py-1 rounded-md font-medium ${
                              issue.severity === "High"
                                ? "bg-red-100 text-red-600"
                                : issue.severity === "Moderate"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {issue.severity}
                          </span>

                        </motion.div>

                      ))}

                    </div>

                  </motion.div>

                </>

              ) : (

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl border border-gray-200 p-8 flex items-center justify-center min-h-64"
                >

                  <p className="text-sm text-gray-400 text-center">
                    Upload a fire-safety image to generate an AI analysis.
                  </p>

                </motion.div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AIReportAnalysis;