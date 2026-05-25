"use client"

import { LogOut, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLogout } from "@/features/auth/hooks/useLogout"
import useAuthStore from "@/store/auth-store"

function Dashboard() {
  const logoutMutation = useLogout()
  const user = useAuthStore((s) => s.user);
  console.log(user, "user")

  const company = {
    name: "Pi Technology",
    role: "Business Owner",
  }

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              {company.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{company.name}</h1>
              <p className="text-sm text-muted-foreground">
                {user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="space-y-8">
          <section>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Welcome, <span className="text-primary">{user?.name.split(",")[0]}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              You're all set to start managing your leads with {company.name}
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-4xl font-bold text-primary mb-2">0</div>
              <p className="text-muted-foreground">Active Leads</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-4xl font-bold text-primary mb-2">0</div>
              <p className="text-muted-foreground">Conversions</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-4xl font-bold text-primary mb-2">0</div>
              <p className="text-muted-foreground">Team Members</p>
            </div>
          </div>

          <section className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Company Name</p>
                <p className="text-lg font-medium text-foreground">{company.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Role</p>
                <p className="text-lg font-medium text-foreground">{company.role}</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-3">Ready to get started?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Create your first lead list, invite team members, or explore our features to streamline your lead
              management process.
            </p>
            <div className="flex gap-3 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Create Lead List
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                Invite Team
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
export default Dashboard
