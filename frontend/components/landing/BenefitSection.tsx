const benefits = [
  { number: "3x", label: "Faster Lead Response" },
  { number: "45%", label: "Higher Conversion Rate" },
  { number: "20hrs", label: "Saved Per Week" },
  { number: "100%", label: "Data Security" },
]

const testimonials = [
  {
    quote: "We increased our conversion rate by 40% in the first month of using this platform.",
    author: "Sarah Chen",
    role: "Sales Director",
    company: "TechVentures",
  },
  {
    quote: "The automation features alone have saved our team countless hours every week.",
    author: "Marcus Johnson",
    role: "VP of Sales",
    company: "Growth Partners",
  },
  {
    quote: "Best investment we've made for our sales pipeline. Highly recommended!",
    author: "Emily Rodriguez",
    role: "Founder",
    company: "StartupHub",
  },
]

function BenefitsSection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Stats */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12 text-balance">
            Results that speak for themselves
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center p-6 rounded-lg border border-border bg-card">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{benefit.number}</div>
                <p className="text-sm text-muted-foreground">{benefit.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12 text-balance">
            Loved by sales teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-8 rounded-lg border border-border bg-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default BenefitsSection
