import { Bot, Kanban, LayoutDashboard, Smartphone } from "lucide-react"

const features = [
  {
    icon: Kanban,
    title: "Kanban Pipelines",
    description: "Visualize your sales process. Drag and drop leads from 'New' to 'Won' instantly.",
    colSpan: "md:col-span-2",
    gradient: "from-primary/10 via-primary/5 to-transparent",
    iconBg: "bg-primary",
    iconColor: "text-primary-foreground"
  },
  {
    icon: Bot,
    title: "Smart Follow-ups",
    description: "System reminds you automatically if a lead doesn't reply.",
    colSpan: "md:col-span-1",
    gradient: "from-accent/10 via-accent/5 to-transparent",
    iconBg: "bg-accent",
    iconColor: "text-accent-foreground"
  },
  {
    icon: LayoutDashboard,
    title: "Nepal-Centric Analytics",
    description: "Track sales in NPR, manage Bikram Sambat dates, and view local market trends.",
    colSpan: "md:col-span-1",
    gradient: "from-success/10 via-success/5 to-transparent",
    iconBg: "bg-success",
    iconColor: "text-white"
  },
  {
    icon: Smartphone,
    title: "Mobile CRM",
    description: "Close deals on the go. Perfect for office users to field sales agents across Nepal.",
    colSpan: "md:col-span-2",
    gradient: "from-secondary/10 via-secondary/5 to-transparent",
    iconBg: "bg-secondary",
    iconColor: "text-secondary-foreground"
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for Growth
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to streamline your sales process in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className={`${feature.colSpan} group relative overflow-hidden rounded-2xl bg-card border border-border p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Large Background Icon */}
                <div className="absolute -top-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <Icon className="w-32 h-32 text-foreground" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Decorative Corner Accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            Want to see more? <a href="#" className="text-primary hover:underline font-semibold">Explore all features →</a>
          </p>
        </div>
      </div>
    </section>
  )
}
