'use client'

import { useState } from "react"
import { Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email us",
    detail: "support@leadxpert.io",
    sub: "We reply within 24 hours",
  },
  {
    icon: MessageCircle,
    title: "Live chat",
    detail: "Available in-app",
    sub: "Mon–Fri, 9am–6pm UTC",
  },
  {
    icon: Clock,
    title: "Response time",
    detail: "Under 24 hours",
    sub: "For all support tickets",
  },
  {
    icon: MapPin,
    title: "Office",
    detail: "Kathmandu, Nepal",
    sub: "Remote-first company",
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In a real app: POST to your contact endpoint
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-linear-to-b from-primary/5 via-background to-background">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              Contact
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Get in touch</h1>
          <p className="text-lg text-muted-foreground">
            Have a question, a feature idea, or just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactInfo.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="p-5 rounded-xl border border-border bg-card text-center hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.title}</p>
                <p className="font-semibold text-foreground text-sm">{item.detail}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Message sent!</h2>
              <p className="text-muted-foreground mb-6">
                Thanks for reaching out. We&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: "", email: "", subject: "general", message: "" })
                }}
                className="text-primary hover:underline text-sm font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-1">Send us a message</h2>
              <p className="text-muted-foreground text-sm mb-8">
                Fill out the form below and we&apos;ll respond as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Your name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  >
                    <option value="general">General inquiry</option>
                    <option value="sales">Sales & pricing</option>
                    <option value="support">Technical support</option>
                    <option value="feature">Feature request</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all"
                >
                  Send message <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
