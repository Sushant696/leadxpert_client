"use client"

import { useRouter } from "next/navigation"
import type React from "react"

const sourceChannels = [
  { id: "search_engine", label: "Search Engine", description: "Google, Bing, etc." },
  { id: "social_media", label: "Social Media", description: "LinkedIn, Twitter, Facebook, etc." },
  { id: "referral", label: "Referral", description: "A friend or colleague referred me" },
  { id: "ad", label: "Online Advertisement", description: "Display ads or sponsored content" },
  { id: "blog", label: "Blog or Article", description: "Content marketing or blog post" },
  { id: "event", label: "Event or Webinar", description: "Attended an event or webinar" },
  { id: "direct", label: "Direct", description: "Typed the URL directly" },
  { id: "other", label: "Other", description: "Something else" },
]

export function SourceChannel() {
  const navigate = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate.push("/dashboard")
  }

  return (
    <div className="max-w-2xl mx-auto my-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">How did you hear about us?</h1>
        <p className="text-sm text-muted-foreground">Help us understand how you found our platform</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {sourceChannels.map((channel) => (
          <label
            key={channel.id}
            className="flex items-start p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
          >
            <input
              type="radio"
              name="sourceChannel"
              value={channel.id}
              className="mt-1 cursor-pointer"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-foreground">{channel.label}</p>
              <p className="text-xs text-muted-foreground">{channel.description}</p>
            </div>
          </label>
        ))}
      </form>

      <div className="flex gap-3 mt-8 pt-4 border-t border-border">
        <button
          type="button"
          className="flex-1 px-4 py-2.5 rounded border border-border text-foreground hover:bg-secondary transition-colors font-medium"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}

          className="flex-1 px-4 py-2.5 rounded text-white bg-black hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Complete Signup
        </button>
      </div>
    </div>
  )
}
