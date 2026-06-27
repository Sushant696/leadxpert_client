"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Minus,
  Zap,
  Building2,
  Rocket,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    description:
      "Perfect for freelancers and small teams just getting started.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    badge: null,
    cta: "Get started free",
    ctaHref: "/register",
    ctaVariant: "outline" as const,
    features: [
      { text: "Up to 3 users", included: true },
      { text: "1 pipeline", included: true },
      { text: "Up to 100 leads", included: true },
      { text: "Basic analytics", included: true },
      { text: "Email support", included: true },
      { text: "Custom roles", included: false },
      { text: "Advanced analytics", included: false },
      { text: "Priority support", included: false },
      { text: "API access", included: false },
      { text: "Custom integrations", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: Rocket,
    description: "For growing teams that need more power and flexibility.",
    monthlyPrice: 3000,
    yearlyPrice: 3000 * 12 * 0.8, // 20% discount
    badge: "Most Popular",
    cta: "Start free trial",
    ctaHref: "/register",
    ctaVariant: "primary" as const,
    features: [
      { text: "Up to 15 users", included: true },
      { text: "Unlimited pipelines", included: true },
      { text: "Unlimited leads", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority email & chat support", included: true },
      { text: "Custom roles & permissions", included: true },
      { text: "Task & deal management", included: true },
      { text: "File uploads & attachments", included: true },
      { text: "API access", included: false },
      { text: "Custom integrations", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    description:
      "For large organizations with custom needs and compliance requirements.",
    monthlyPrice: 7900,
    yearlyPrice: 7900 * 12 * 0.8, // 20% discount
    badge: null,
    cta: "Contact sales",
    ctaHref: "/contact",
    ctaVariant: "outline" as const,
    features: [
      { text: "Unlimited users", included: true },
      { text: "Unlimited pipelines", included: true },
      { text: "Unlimited leads", included: true },
      { text: "Enterprise analytics", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom roles & permissions", included: true },
      { text: "Task & deal management", included: true },
      { text: "File uploads & attachments", included: true },
      { text: "Full API access", included: true },
      { text: "Custom integrations & SSO", included: true },
    ],
  },
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Every paid plan comes with a 14-day free trial. No credit card required. Cancel anytime.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express) as well as bank transfers for annual Enterprise plans.",
  },
  {
    question: "Do you offer discounts for nonprofits or education?",
    answer:
      "Yes! We offer 50% off for verified nonprofit organizations and educational institutions. Contact our team to apply.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data is yours. You can export everything before canceling, and we keep your data for 30 days after cancellation in case you change your mind.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard AES-256 encryption at rest and TLS 1.3 in transit. We are SOC 2 Type II compliant.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-linear-to-b from-primary/5 via-background to-background">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              Pricing
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Start free. Scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-muted rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                !isYearly
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                isYearly
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Yearly
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 -mt-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const monthlyPrice = plan.monthlyPrice;
            const yearlyPrice = plan.yearlyPrice;
            const yearlyMonthlyEquivalent = yearlyPrice > 0 ? Math.round(yearlyPrice / 12) : 0;
            const displayPrice = isYearly ? yearlyMonthlyEquivalent : monthlyPrice;
            const isPro = plan.id === "pro";

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl border p-8 flex flex-col",
                  isPro
                    ? "border-primary bg-primary text-primary-foreground shadow-2xl scale-[1.03] z-10"
                    : "border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all",
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-background text-primary text-xs font-bold border border-primary shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                      isPro ? "bg-primary-foreground/20" : "bg-primary/10",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6",
                        isPro ? "text-primary-foreground" : "text-primary",
                      )}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p
                    className={cn(
                      "text-sm",
                      isPro
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground",
                    )}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-bold">
                      {displayPrice === 0 ? "Free" : `Rs ${displayPrice.toLocaleString()}`}
                    </span>
                    {displayPrice > 0 && (
                      <span
                        className={cn(
                          "text-sm mb-2",
                          isPro
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        /mo
                      </span>
                    )}
                  </div>
                  {isYearly && displayPrice > 0 && (
                    <p
                      className={cn(
                        "text-xs mt-1",
                        isPro
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground",
                      )}
                    >
                      Billed annually (Rs {yearlyPrice.toLocaleString()}/yr)
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={plan.ctaHref}
                  className={cn(
                    "flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all mb-8",
                    isPro
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check
                          className={cn(
                            "w-4 h-4 shrink-0",
                            isPro
                              ? "text-primary-foreground"
                              : "text-green-500",
                          )}
                        />
                      ) : (
                        <Minus
                          className={cn(
                            "w-4 h-4 shrink-0",
                            isPro
                              ? "text-primary-foreground/40"
                              : "text-muted-foreground/40",
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          !feature.included &&
                            (isPro
                              ? "text-primary-foreground/50"
                              : "text-muted-foreground/50"),
                        )}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 px-4 border-y border-border bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-sm mb-6 font-medium">
            Trusted by growing sales teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {[
              "TechVentures",
              "Growth Partners",
              "StartupHub",
              "SalesForce Pro",
              "DevAgency",
            ].map((company) => (
              <span
                key={company}
                className="text-lg font-bold text-foreground tracking-tight"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Questions? We have answers.
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <h3 className="font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Still not sure? Try it free.
          </h2>
          <p className="text-lg opacity-80 mb-8">
            14-day free trial on all paid plans. No credit card required.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-all"
          >
            Start for free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
