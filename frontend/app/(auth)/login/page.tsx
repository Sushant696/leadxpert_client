import Link from "next/link";
import { Google } from "iconsax-reactjs";
import { Lock, Shield, Users, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import LoginForm from "@/features/auth/components/login-screen";

function Login() {
  return (
    <>
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-1">
              Login faster and safer to your LeadXpert account
            </h3>
            <p className="text-sm text-muted-foreground">
              Next time we'll remember how you'd like to sign in so you can skip entering an email.
              You can always go back to{" "}
              <Link href="/login" className="text-primary hover:text-primary-dark">classic login</Link>.
            </p>
          </div>

          {/* Split Layout */}
          <div className="grid md:grid-cols-[1fr_400px] gap-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-1">Welcome Back!</h2>
              </div>
              <LoginForm />
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full h-14 justify-center text-base font-medium hover:bg-primary/80 hover:text-white"
                  >
                    <Google variant="Bulk" className=" text-primary hover:text-primary/70" />
                    Sign in with Google
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full h-14 justify-center text-base font-medium hover:bg-accent"
                  >
                    <Lock className="h-3 w-3 text-primary" />
                    Log in with SSO
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Why LeadXpert?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-success" />
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
                      <h4 className="font-medium text-foreground text-sm">Trusted by 10,000+ Teams</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Join thousands of businesses growing with LeadXpert
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              ©2025 LeadXpert, Inc. All Rights Reserved.{" "}
              <Link href="/" className="text-primary hover:text-primary-dark">Privacy Policy</Link>
              {" & "}
              <Link href="/" className="text-primary hover:text-primary-dark">Manage Cookies</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


export default Login

