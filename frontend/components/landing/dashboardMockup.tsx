"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  Briefcase,
  Clock,
  TrendingUp,
  ListTodo,
  CheckCircle2,
  Circle,
  XCircle,
  AlertCircle,
} from "lucide-react";

type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

function DashboardCard() {
  const [now] = useState(() => Date.now());

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tasks = [
    {
      id: 1,
      title: "Follow up with Tech Solutions Ltd",
      description: "Send proposal for enterprise package",
      priority: "HIGH" as TaskPriority,
      status: "IN_PROGRESS" as TaskStatus,
      dueDate: new Date(),
      isOverdue: false,
      isDueToday: true,
    },
    {
      id: 2,
      title: "Schedule demo for Himalayan Corp",
      description: "Product demo requested via email",
      priority: "MEDIUM" as TaskPriority,
      status: "PENDING" as TaskStatus,
      dueDate: new Date(now + 86400000),
      isOverdue: false,
      isDueToday: false,
    },
    {
      id: 3,
      title: "Update pipeline stages for Q1",
      description: null,
      priority: "LOW" as TaskPriority,
      status: "COMPLETED" as TaskStatus,
      dueDate: new Date(now + 86400000),
      isOverdue: false,
      isDueToday: false,
    },
    {
      id: 4,
      title: "Review contract terms with legal",
      description: "Final review before sending to Kathmandu Enterprises",
      priority: "HIGH",
      status: "PENDING" as TaskStatus,
      dueDate: new Date(now - 172800000),
      isOverdue: true,
      isDueToday: false,
    },
  ];

  const taskStatusConfig = {
    PENDING: {
      icon: Circle,
      className: "text-gray-400 border-gray-300",
      bgClass: "border-gray-300",
    },
    IN_PROGRESS: {
      icon: Clock,
      className: "text-blue-500 border-blue-500",
      bgClass: "border-blue-500 bg-blue-500/10",
    },
    COMPLETED: {
      icon: CheckCircle2,
      className: "text-green-500 border-green-500",
      bgClass: "border-green-500 bg-green-500",
    },
    CANCELLED: {
      icon: XCircle,
      className: "text-red-400 border-red-400",
      bgClass: "border-red-400 bg-red-400/10",
    },
  };


  return (
    <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl p-5 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] border border-white/70">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
        <div className="p-8 space-y-6">
          {/* Header */}
          <motion.header
            className="space-y-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-gray-600">{currentDate}</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back, User
            </h1>
            <p className="text-gray-600">
              You&apos;re viewing{" "}
              <span className="font-medium text-gray-900">Sales Team</span>{" "}
              workspace
            </p>
          </motion.header>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                label: "Total Leads",
                value: "156",
                icon: Users,
                delay: 0.1,
              },
              {
                label: "Active Deals",
                value: "23",
                icon: Briefcase,
                delay: 0.2,
              },
              {
                label: "Due Today",
                value: "5",
                icon: Clock,
                delay: 0.3,
              },
              {
                label: "Conversion Rate",
                value: "34.2%",
                icon: TrendingUp,
                delay: 0.4,
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <stat.icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Today's Tasks */}
          <section className="space-y-3">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ListTodo className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Today&apos;s Tasks
              </h2>
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold">
                {tasks.length}
              </span>
            </motion.div>

            <motion.div
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="divide-y divide-gray-200">
                {tasks.map((task, idx) => {
                  const status = taskStatusConfig[task.status];
                  const StatusIcon = status.icon;
                  const isDone =
                    task.status === "COMPLETED" || task.status === "CANCELLED";

                  return (
                    <motion.div
                      key={task.id}
                      className={`flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors ${isDone ? "opacity-50" : ""}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                    >
                      <div
                        className={`mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors ${status.bgClass}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p
                            className={`text-sm font-medium leading-none truncate ${isDone ? "line-through text-gray-500" : "text-gray-900"}`}
                          >
                            {task.title}
                          </p>
                          <span
                            className={`shrink-0 inline-block w-1.5 h-1.5 rounded-full  `}
                          />
                        </div>
                        {task.description && (
                          <p className="text-xs text-gray-500 truncate">
                            {task.description}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        {task.isOverdue ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 text-xs font-medium text-red-700">
                            <AlertCircle className="h-3 w-3" />
                            Overdue
                          </span>
                        ) : task.isDueToday ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-xs font-medium text-amber-700">
                            <Clock className="h-3 w-3" />
                            Due today
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">
                            {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString(
                                  "en-US",
                                  { month: "short", day: "numeric" },
                                )
                              : "No due date"}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                className="px-4 py-2.5 border-t bg-gray-50 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <p className="text-xs text-gray-600">
                  Showing {tasks.length} of {tasks.length} tasks
                </p>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default DashboardCard;
