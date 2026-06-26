import Link from "next/link"
import {
  Kanban,
  BarChart3,
  Users,
  Bot,
  Bell,
  FileText,
  CheckSquare,
  Tag,
  Search,
  Shield,
  Smartphone,
  Zap,
  ArrowRight,
  Check,
} from "lucide-react"

const mainFeatures = [
  {
    badge: "Pipeline Management",
    headline: "See your entire sales pipeline at a glance",
    description:
      "Visualize every deal moving through your funnel with our Kanban-style pipeline. Drag and drop leads between stages, assign owners, and never lose track of an opportunity again.",
    icon: Kanban,
    color: "text-blue-600",
    bg: "bg-blue-50",
    points: [
      "Unlimited customizable pipeline stages",
      "Drag-and-drop lead management",
      "Bulk actions and filters",
      "Stage conversion analytics",
    ],
    align: "left",
  },
  {
    badge: "Analytics & Reporting",
    headline: "Data-driven decisions start here",
    description:
      "Get real-time insights into your sales performance. Track conversion rates, revenue forecasts, team productivity, and pipeline health — all in one beautiful dashboard.",
    icon: BarChart3,
    color: "text-purple-600",
    bg: "bg-purple-50",
    points: [
      "Real-time pipeline dashboards",
      "Revenue forecasting",
      "Team leaderboards",
      "Custom report builder",
    ],
    align: "right",
  },
  {
    badge: "Team Collaboration",
    headline: "Your whole team, one platform",
    description:
      "Assign leads, leave notes, create tasks, and collaborate in real-time. Role-based permissions ensure everyone sees exactly what they need — nothing more, nothing less.",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-50",
    points: [
      "Role-based access control",
      "Internal notes & @mentions",
      "Activity timeline per lead",
      "Workspace invitations",
    ],
    align: "left",
  },
]

const featureGrid = [
  { icon: Bot, title: "Smart Reminders", description: "Auto-follow-up reminders when leads go cold." },
  { icon: Bell, title: "Real-time Notifications", description: "Instant alerts on lead updates and task deadlines." },
  { icon: FileText, title: "Notes & Attachments", description: "Attach files, PDFs, and notes directly to leads." },
  { icon: CheckSquare, title: "Task Management", description: "Create and assign tasks with priority and due dates." },
  { icon: Tag, title: "Custom Tags", description: "Label and segment leads with custom tags and filters." },
  { icon: Search, title: "Global Search", description: "Find any lead, deal, or contact in seconds." },
  { icon: Shield, title: "Enterprise Security", description: "SOC 2 compliant with AES-256 data encryption." },
  { icon: Smartphone, title: "Mobile Friendly", description: "Full-featured experience on any device, anywhere." },
  { icon: Zap, title: "Blazing Fast", description: "Sub-100ms response times. No lag, no frustration." },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-linear-to-b from-primary/5 via-background to-background">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              Product
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-5">
            Everything you need to
            <span className="text-primary"> close more deals</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            LeadXpert is a modern CRM built for speed. Pipeline management, analytics, team
            collaboration, and automation — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              Get started free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 border border-border px-7 py-3 rounded-lg font-semibold hover:bg-muted transition-all"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Main Feature Alternating Sections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-28">
          {mainFeatures.map((feature, i) => {
            const Icon = feature.icon
            const isRight = feature.align === "right"
            return (
              <div
                key={i}
                className={`flex flex-col ${isRight ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-20`}
              >
                {/* Text side */}
                <div className="flex-1 space-y-5">
                  <span className={`inline-flex items-center gap-2 text-sm font-semibold ${feature.color} ${feature.bg} px-3 py-1.5 rounded-full`}>
                    <Icon className="w-4 h-4" />
                    {feature.badge}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                    {feature.headline}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2.5 pt-2">
                    {feature.points.map((point, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-foreground">
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mockup/Visual side */}
                <div className="flex-1 w-full">
                  <div className={`rounded-2xl border border-border ${feature.bg} aspect-4/3 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-linear-to-br from-transparent to-background/20" />
                    <Icon className={`w-28 h-28 ${feature.color} opacity-20`} />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-lg ${feature.bg} flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 ${feature.color}`} />
                          </div>
                          <div>
                            <div className="h-2.5 w-24 bg-foreground/20 rounded-full" />
                            <div className="h-2 w-16 bg-foreground/10 rounded-full mt-1.5" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          {[80, 60, 90, 45].map((w, k) => (
                            <div key={k} className="h-1.5 bg-foreground/10 rounded-full" style={{ width: `${w}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              And so much more
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every detail has been thought through so your team can focus on selling, not managing software.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureGrid.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-200">
                    <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-200" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to supercharge your sales?
          </h2>
          <p className="text-lg opacity-80 mb-8">
            Join thousands of sales teams using LeadXpert to close more deals, faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-all"
            >
              Start free trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/40 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-all"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
