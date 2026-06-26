import Link from "next/link";
import {
  ArrowRight,
  Target,
  Heart,
  Lightbulb,
  Globe,
  Shield,
  Zap,
} from "lucide-react";

const stats = [
  { number: "2,500+", label: "Teams using LeadXpert" },
  { number: "1.2M+", label: "Leads managed" },
  { number: "98%", label: "Customer satisfaction" },
  { number: "40+", label: "Countries worldwide" },
];

const values = [
  {
    icon: Target,
    title: "Customer First",
    description:
      "Every feature we build starts with a real customer problem. We obsess over the details that make your job easier.",
  },
  {
    icon: Heart,
    title: "Built with Care",
    description:
      "We care deeply about the quality of our product. Good enough isn't good enough — we push until it's great.",
  },
  {
    icon: Lightbulb,
    title: "Always Improving",
    description:
      "We ship fast, learn from our users, and iterate relentlessly. The best version of LeadXpert is always ahead.",
  },
  {
    icon: Globe,
    title: "Open & Transparent",
    description:
      "We share our roadmap, listen to feedback publicly, and believe in earning trust through honesty.",
  },
  {
    icon: Shield,
    title: "Security by Default",
    description:
      "Your customer data is sacred. We treat security as a first-class feature, not an afterthought.",
  },
  {
    icon: Zap,
    title: "Speed Matters",
    description:
      "We believe software should be fast. Fast to load, fast to learn, and fast to get your work done.",
  },
];

const team = [
  {
    name: "Alex Morgan",
    role: "CEO & Co-founder",
    initials: "AM",
    bio: "Former VP of Sales at a Fortune 500. Built LeadXpert after years of frustration with legacy CRM tools.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Jamie Liu",
    role: "CTO & Co-founder",
    initials: "JL",
    bio: "10+ years building enterprise SaaS. Previously led engineering at two YC-backed startups.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Sam Rivera",
    role: "Head of Product",
    initials: "SR",
    bio: "Product obsessive who spent 5 years at Salesforce and HubSpot before joining to build something better.",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Dana Kim",
    role: "Head of Design",
    initials: "DK",
    bio: "Believes great design is invisible. Brings a decade of UX craft to every pixel in LeadXpert.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Chris Patel",
    role: "Head of Customer Success",
    initials: "CP",
    bio: "Champion for our customers. Makes sure every team that joins LeadXpert gets real, lasting results.",
    color: "bg-red-100 text-red-700",
  },
  {
    name: "Jordan Taylor",
    role: "Lead Engineer",
    initials: "JT",
    bio: "Full-stack expert who keeps LeadXpert fast, reliable, and secure for teams around the world.",
    color: "bg-teal-100 text-teal-700",
  },
];

const milestones = [
  {
    year: "2021",
    event:
      "LeadXpert founded in a small apartment with a single idea: CRM shouldn't be this hard.",
  },
  {
    year: "2022",
    event: "Launched beta. 200 early adopters signed up in the first week.",
  },
  {
    year: "2023",
    event: "Raised seed funding. Grew to 50+ team members and 10,000+ users.",
  },
  {
    year: "2024",
    event: "Launched enterprise tier. Crossed 1M leads managed milestone.",
  },
  {
    year: "2025",
    event:
      "Expanded globally. Now serving 40+ countries with localized features.",
  },
];

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-primary/5 via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              Company
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-5">
            We&apos;re on a mission to make
            <span className="text-primary"> selling human again</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            LeadXpert was built by salespeople for salespeople. We got tired of
            clunky, overpriced CRMs and decided to build the one we always
            wanted.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border bg-muted/20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Our story
            </h2>
            <p className="text-muted-foreground">
              From a frustrating afternoon and a whiteboard to a platform used
              by thousands.
            </p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="relative shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center z-10">
                    <span className="text-xs font-bold text-primary">
                      {m.year}
                    </span>
                  </div>
                  <div className="flex-1 pt-2.5">
                    <p className="text-foreground leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              What we stand for
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our values aren&apos;t just words on a wall. They shape every
              decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Meet the team
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A small, passionate team of builders who care deeply about your
              success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-full ${member.color} flex items-center justify-center font-bold text-lg mb-4`}
                >
                  {member.initials}
                </div>
                <h3 className="font-bold text-foreground text-lg">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Want to join us?</h2>
          <p className="opacity-80 mb-8 text-lg">
            We&apos;re always looking for talented people who care about
            building great software.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-all"
            >
              Get in touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
