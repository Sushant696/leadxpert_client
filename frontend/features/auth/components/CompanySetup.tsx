"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

const userRoles = [
  { id: "business_owner", label: "Business Owner", description: "Own and manage the business" },
  { id: "sales_specialist", label: "Sales Specialist", description: "Manage sales and leads" },
  { id: "manager", label: "Manager", description: "Oversee team and operations" },
  { id: "team_member", label: "Team Member", description: "Individual contributor" },
  { id: "other", label: "Other", description: "Different role" },
]

function CompanySetup() {
  const navigate = useRouter()
  const [userRole, setUserRole] = useState("")
  const [companyName, setCompanyName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className=" max-w-2xl mx-auto mt-6" >
      <div className="flex justify-end mb-2">
        <Button
          variant={'outline'}
          className="text-sm text-muted-foreground font-medium hover:text-white hover:bg-primary/90"
          onClick={() => navigate.push("/dashboard")}
        >
          Skip {'>>'}
        </Button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Set up your workspace</h1>
        <p className="text-sm text-muted-foreground">Welcome, {"sushant"} Let's get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label htmlFor="companyName" className="block text-sm font-semibold text-foreground mb-2">
            Company name
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="e.g., Acme Corporation"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground mt-1">You can change this later in settings</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            What is your role?
          </label>
          <div className="space-y-2">
            {userRoles.map((role) => (
              <label
                key={role.id}
                className="flex items-start p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <input
                  type="radio"
                  name="userRole"
                  value={role.id}
                  checked={userRole === role.id}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="mt-1 cursor-pointer"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">{role.label}</p>
                  <p className="text-xs text-muted-foreground">{role.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-4 border-t border-border">
          <button
            type="button"
            onClick={() => { }}
            className="flex-1 px-4 py-2.5 rounded border border-border text-foreground hover:bg-secondary transition-colors font-medium"
          >
            Back
          </button>
          <button
            onClick={() => navigate.push("/register/source-channel")}
            type="submit"
            className="flex-1 px-4 py-2.5 rounded text-white bg-black hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}
export default CompanySetup
