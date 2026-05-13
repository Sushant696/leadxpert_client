import Link from "next/link"

function CTASection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
          Ready to transform your sales process?
        </h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Join hundreds of teams already using our platform to close more deals and grow their business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary-foreground text-primary font-semibold hover:bg-opacity-90 transition-all"
          >
            Start Free Trial
          </Link>
          <button className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-dark transition-colors">
            Schedule a Demo
          </button>
        </div>
        <p className="text-sm opacity-75 mt-8">No credit card required. Start free today.</p>
      </div>
    </section>
  )
}
export default CTASection
