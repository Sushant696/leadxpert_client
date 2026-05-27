'use client'

import { motion } from "motion/react"
import { TrendingUp } from "lucide-react"

function FloatingStats() {
  return (
    <>
      <motion.div
        style={{ translateZ: "120px" }}
        className="absolute -bottom-10 -left-10 bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border border-gray-100 p-6"
        initial={{ opacity: 0, scale: 0.7, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.8, type: "spring" }}
        whileHover={{ scale: 1.08, translateZ: "140px" }}
      >
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-xl shadow-lg">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Monthly Revenue</p>
            <p className="text-3xl font-bold text-gray-900">+32%</p>
            <p className="text-xs text-green-600 font-semibold">↑ NPR 8.5L</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ translateZ: "110px" }}
        className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border border-gray-100 p-5"
        initial={{ opacity: 0, scale: 0.7, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.9, type: "spring" }}
        whileHover={{ scale: 1.08, translateZ: "130px" }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-4 h-4 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div>
            <p className="text-base font-bold text-gray-900">5 New Leads</p>
            <p className="text-xs text-gray-500">in last hour</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ translateZ: "80px" }}
        className="absolute top-1/3 -left-16 bg-white rounded-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.25)] border border-gray-100 p-5"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.08, translateZ: "100px" }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Win Rate</p>
            <p className="text-xl font-bold text-gray-900">68%</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ translateZ: "90px" }}
        className="absolute bottom-1/4 right-4 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] p-5 text-white"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.1, type: "spring" }}
        whileHover={{ scale: 1.08, translateZ: "110px" }}
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-xs opacity-90 font-medium">Avg. Response</p>
            <p className="text-xl font-bold">4.2 hrs</p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default FloatingStats
