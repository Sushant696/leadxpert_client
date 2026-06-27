"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MessageSquare,
  BookOpen,
  HelpCircle,
  AlertCircle,
  ArrowRight,
  Search,
} from "lucide-react";

function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqs = [
    {
      id: 1,
      category: "Getting Started",
      question: "How do I create my first lead?",
      answer:
        'To create a lead, go to the Leads section and click "New Lead". Fill in the required information like name, email, and phone number, then save. You can also import leads from CSV.',
    },
    {
      id: 2,
      category: "Getting Started",
      question: "What is a pipeline and how do I set one up?",
      answer:
        'A pipeline is a visual representation of your sales process with different stages. To create one, go to Settings > Pipelines and click "New Pipeline". Define your stages and set them up based on your sales process.',
    },
    {
      id: 3,
      category: "Features",
      question: "Can I assign leads to team members?",
      answer:
        'Yes! You can assign leads to any team member in your workspace. Click on a lead, then select "Assign to" and choose a team member from the dropdown.',
    },
    {
      id: 4,
      category: "Features",
      question: "How do I set up automated follow-ups?",
      answer:
        "You can set up tasks with due dates for follow-ups. Tasks can be assigned to team members and will appear on their dashboard with reminders.",
    },
    {
      id: 5,
      category: "Billing",
      question: "Can I upgrade or downgrade my plan anytime?",
      answer:
        "Yes, you can change your plan at any time from your Account Settings > Billing. Changes take effect immediately.",
    },
    {
      id: 6,
      category: "Billing",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express) and local payment methods. Invoicing is also available for enterprise plans.",
    },
    {
      id: 7,
      category: "Integration",
      question: "Can I import leads from another CRM?",
      answer:
        "Yes! You can import leads from CSV files. Go to Leads > Import and upload your CSV file. We also support integrations with popular platforms.",
    },
    {
      id: 8,
      category: "Security",
      question: "How secure is my data?",
      answer:
        "We use bank-level encryption (AES-256) to protect your data. All data is encrypted in transit and at rest. We are also fully GDPR compliant.",
    },
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Complete guides and tutorials",
      link: "#",
    },
    {
      icon: MessageSquare,
      title: "Community Forum",
      description: "Connect with other users",
      link: "#",
    },
    {
      icon: AlertCircle,
      title: "Status Page",
      description: "Check system status",
      link: "#",
    },
    {
      icon: HelpCircle,
      title: "Video Tutorials",
      description: "Learn by watching",
      link: "#",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    alert("Thank you for your message! We will get back to you soon.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="space-y-8">
      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>
            We&apos;re here to help! Reach out to us directly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">
                  support@leadxpert.com
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Response time: 2-4 hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Phone</p>
                <p className="text-sm text-muted-foreground">+977-1-4123456</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Mon-Fri, 9am-6pm NST
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <MessageSquare className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Live Chat</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
                <Button variant="link" className="text-xs h-auto p-0 mt-1">
                  Start a conversation
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send us a Message</CardTitle>
          <CardDescription>
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject*</Label>
              <Input
                id="subject"
                placeholder="How can we help?"
                value={contactForm.subject}
                onChange={(e) =>
                  setContactForm({ ...contactForm, subject: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message*</Label>
              <Textarea
                id="message"
                placeholder="Tell us what you need help with..."
                rows={5}
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                required
                className="resize-none"
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Resources Section */}
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>Helpful resources to learn more</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {resources.map((resource, idx) => {
              const Icon = resource.icon;
              return (
                <a
                  key={idx}
                  href={resource.link}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-muted transition-colors text-center group"
                >
                  <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {resource.description}
                  </p>
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search FAQ */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <details key={faq.id} className="group">
                  <summary className="flex items-center justify-between cursor-pointer p-4 rounded-lg border border-border hover:bg-muted transition-colors">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0">
                        {faq.id}
                      </span>
                      <div className="text-left">
                        <p className="font-medium text-foreground">
                          {faq.question}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {faq.category}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-4 py-3 bg-muted/30 text-sm text-muted-foreground">
                    {faq.answer}
                  </div>
                </details>
              ))
            ) : (
              <div className="p-8 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  No results found. Try a different search term.
                </p>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-center pt-4">
            Can&apos;t find what you&apos;re looking for?{" "}
            <span className="text-primary font-medium">Contact us</span> above!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SupportPage;
