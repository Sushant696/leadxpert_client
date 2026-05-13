import { BarChart3, Zap, Users, Settings } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track lead sources, conversion rates, and pipeline health in real-time with intuitive dashboards.",
  },
  {
    icon: Zap,
    title: "Smart Automation",
    description: "Automate follow-ups, lead scoring, and task assignments to save time and stay organized.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with built-in comments, shared notes, and activity feeds.",
  },
  {
    icon: Settings,
    title: "Easy Integration",
    description: "Connect with your favorite tools and sync data automatically across your tech stack.",
  },
]

function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything you need to win more deals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help your sales team close more deals faster
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="p-8 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default FeaturesSection
