"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

function CTASection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-background to-muted/40">
      <div className="max-w-6xl mx-auto">
        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/95 via-primary/90 to-primary-dark border border-primary-light/30 p-12 sm:p-16 lg:p-20 shadow-2xl"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-light rounded-full blur-3xl opacity-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-dark rounded-full blur-3xl opacity-10" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="text-center mb-8 sm:mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light/20 border border-primary-light/40 backdrop-blur-sm mb-6"
              >
                <Check className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-semibold text-primary-foreground">
                  Join 500+ growing businesses
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-primary-foreground leading-tight tracking-tight"
              >
                Start selling smarter today
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed"
              >
                Get instant access to your CRM. No credit card required. Set up
                in minutes.
              </motion.p>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-primary-foreground/75 text-sm"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>No credit card required</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-primary-foreground/20" />
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>Setup in under 5 minutes</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-primary-foreground/20" />
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>30-day free trial</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;