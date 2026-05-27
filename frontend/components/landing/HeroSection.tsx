'use client'

import {
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2
} from "lucide-react"
import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"

import DashboardCard from './dashboardMockup'
import FloatingStats from './floatingElements'

function HeroSection() {
  // Mouse position motion values - only for the 3D card

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 })

  // Base tilt + mouse movement 
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "4deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "4deg"])

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = event.clientX - rect.left
    const mouseYPos = event.clientY - rect.top

    x.set(mouseXPos / width - 0.5)
    y.set(mouseYPos / height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <section className="relative flex items-center py-12 sm:py-16 px-2 sm:px-4 lg:px-6 overflow-hidden bg-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20" />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <div className="absolute inset-0" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:space-y-10 lg:col-span-5"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-600/20 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">
                #1 Lead Management for Nepal
              </span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Turn Leads Into
                <motion.span
                  className="block bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Revenue Faster
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Built for service-based businesses in Nepal. Manage leads, track deals, and close more sales with our intuitive CRM platform.
              </motion.p>
            </div>

            {/* Feature List */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                'Visual sales pipeline with drag & drop',
                'Automated follow-up reminders',
                'Real-time analytics & reporting'
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 transition-all duration-200">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-semibold hover:border-blue-600/50 hover:shadow-lg transition-all duration-200">
                <Play className="w-5 h-5 text-blue-600" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { icon: Users, value: '500+', label: 'Businesses' },
                { icon: TrendingUp, value: '85%', label: 'Conversion' },
                { icon: Zap, value: '3x', label: 'Faster Sales' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="space-y-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-5 h-5 text-blue-600" />
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Card (ONLY this moves on hover) */}
          <div className="lg:col-span-7 relative h-[800px] lg:h-[500px]" style={{ perspective: "2500px" }}>
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{
                opacity: 0,
                x: 500,
                rotateY: -45,
                rotateX: 12,
                scale: 0.85
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: -12,
                rotateX: 6,
                scale: 1
              }}
              transition={{
                duration: 1.4,
                delay: 0.4,
                ease: [0.19, 1, 0.22, 1]
              }}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              className="absolute -right-[10%] lg:-right-[80%] top-1/2 -translate-y-1/2 w-[130%] lg:w-[160%] xl:w-[170%] cursor-pointer"
            >
              {/* Main Dashboard Container */}
              <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-blue-500/40 to-purple-600/40 rounded-3xl blur-3xl scale-110 opacity-60" />
                <DashboardCard />
                <FloatingStats />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
