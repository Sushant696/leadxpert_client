"use client"

import type React from "react"
import { useState } from "react"

interface PersonalDetailsProps {
  email: string
  onSubmit: (data: { firstName: string; lastName: string; dob: string }) => void
  onBack: () => void
}

function PersonalDetailsForm({ email, onSubmit, onBack }: PersonalDetailsProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dob, setDob] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!firstName.trim() || !lastName.trim() || !dob) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      onSubmit({ firstName, lastName, dob })
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="w-full max-w-md mt-6 md:mt-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tell us about yourself</h1>
        <p className="text-sm text-muted-foreground">We need some basic information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-2">
              First name <span className="text-destructive">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-foreground mb-2">
              Last name <span className="text-destructive">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full px-3 py-2.5 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm font-semibold text-foreground mb-2">
            Date of birth <span className="text-destructive">*</span>
          </label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex gap-3 mt-8 pt-4 border-t border-border">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-4 py-2.5 rounded border border-border text-foreground hover:bg-secondary transition-colors font-medium"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded text-white bg-black hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? "Continue..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetailsForm
