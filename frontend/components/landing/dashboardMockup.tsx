'use client'

import { motion } from "motion/react"

function DashboardCard() {
  return (
    <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-5 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] border border-white/70">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
        <div className="p-10 space-y-7">
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-gray-200">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Sales Pipeline</h3>
                <p className="text-sm text-gray-500 mt-1">42 active deals • NPR 2.4M in progress</p>
              </div>
            </div>
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-green-700">Live Updates</span>
            </motion.div>
          </div>

          {/* Pipeline Stages */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'New Leads', count: 12, value: 'NPR 480K', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', icon: '🎯' },
              { label: 'Contacted', count: 8, value: 'NPR 720K', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', icon: '📞' },
              { label: 'Proposal', count: 5, value: 'NPR 560K', color: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-50', icon: '📄' },
              { label: 'Closed Won', count: 3, value: 'NPR 640K', color: 'from-green-500 to-green-600', bg: 'bg-green-50', icon: '✅' }
            ].map((stage, idx) => (
              <motion.div
                key={idx}
                className={`p-5 rounded-xl ${stage.bg} border border-gray-200 hover:shadow-lg transition-all cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + idx * 0.1 }}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${stage.color}`} />
                  <span className="text-lg">{stage.icon}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">{stage.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stage.count}</p>
                <p className="text-xs text-gray-500 font-medium">{stage.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Recent Activity</h4>
              <button className="text-xs text-blue-600 font-semibold hover:underline">View All</button>
            </div>
            {[
              { name: 'Rajesh Kumar', action: 'moved to Proposal stage', time: '2m ago', avatar: 'bg-blue-500', amount: 'NPR 85K' },
              { name: 'Sita Sharma', action: 'added new lead from website', time: '15m ago', avatar: 'bg-green-500', amount: 'NPR 120K' },
              { name: 'Anil Thapa', action: 'closed deal successfully', time: '1h ago', avatar: 'bg-purple-500', amount: 'NPR 220K' }
            ].map((activity, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + i * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-full ${activity.avatar} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                  {activity.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-bold">{activity.name}</span> {activity.action}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <span className="text-gray-300">•</span>
                    <p className="text-xs font-semibold text-blue-600">{activity.amount}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardCard
