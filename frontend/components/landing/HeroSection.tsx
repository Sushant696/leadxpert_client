'use client'

import Link from "next/link"
import { ArrowRight, Play, Sparkles, TrendingUp, Users, Zap } from "lucide-react"

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 lg:space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">
                #1 Lead Management Platform
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                Manage Your Leads
                <span className="block bg-gradient-to-r from-primary via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Like Never Before
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                Convert more prospects into customers with intelligent lead management, real-time analytics, and
                powerful automation tools that drive results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-semibold hover:border-gray-300 hover:shadow-lg transition-all duration-200">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <p className="text-2xl font-bold text-gray-900">10K+</p>
                </div>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <p className="text-2xl font-bold text-gray-900">95%</p>
                </div>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <p className="text-2xl font-bold text-gray-900">2x</p>
                </div>
                <p className="text-sm text-gray-600">Faster Closure</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4 font-medium">Trusted by industry leaders</p>
              <div className="flex flex-wrap gap-8 items-center opacity-60">
                {["TechCorp", "StartupHub", "GrowthLabs", "InnovateCo"].map((company) => (
                  <div key={company} className="text-base font-bold text-gray-600 hover:text-gray-900 transition-colors">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[55%]">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-2xl backdrop-blur-sm animate-float" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/10 rounded-2xl backdrop-blur-sm animate-float-delayed" />

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-3xl" />

              <div className="relative bg-white/40 backdrop-blur-md rounded-3xl p-3 shadow-2xl border border-white/50">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/dashboard.png"
                    alt="LeadXpert Dashboard Interface"
                    className="w-full h-auto"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl border border-gray-100 p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Conversion Rate</p>
                    <p className="text-lg font-bold text-gray-900">+32%</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl border border-gray-100 p-3 animate-float-delayed">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm font-semibold text-gray-900">5 New Leads</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 3s;
        }
      `}</style>
    </section>
  )
}

export default HeroSection
