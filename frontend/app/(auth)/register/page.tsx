import Link from "next/link";
import { Shield, Users, Zap } from "lucide-react";

import RegisterForm from "@/features/auth/components/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-1">
            Create your LeadXpert account in seconds
          </h3>
          <p className="text-sm text-muted-foreground">
            Join thousands of businesses managing their leads more efficiently
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid md:grid-cols-[1fr_380px] gap-8">
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-1">Get Started Free</h2>
              <p className="text-sm text-muted-foreground">No credit card required</p>
            </div>
            <RegisterForm />
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Why LeadXpert?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Lightning Fast</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Manage leads 10x faster with intelligent automation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Enterprise Security</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Bank-level encryption and compliance certifications
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Trusted by Multiple Teams</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Join thousands of businesses growing with LeadXpert
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-medium text-foreground mb-2">What you&apos;ll get:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Unlimited lead management
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Custom pipelines & workflows
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Team collaboration tools
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Advanced analytics & reporting
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            ©2026 LeadXpert, Inc. All Rights Reserved.{" "}
            <Link href="/" className="text-primary hover:text-primary-dark">Privacy Policy</Link>
            {" & "}
            <Link href="/" className="text-primary hover:text-primary-dark">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

