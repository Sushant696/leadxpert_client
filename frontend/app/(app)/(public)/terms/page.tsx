import Link from "next/link";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using LeadXpert (the 'Service'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, do not use the Service. These Terms apply to all users, including visitors, registered users, and paying customers.",
  },
  {
    title: "2. Description of Service",
    content:
      "LeadXpert is a cloud-based customer relationship management (CRM) platform that allows individuals and teams to manage leads, pipelines, deals, tasks, and sales analytics. The Service is provided on an 'as is' and 'as available' basis. We reserve the right to modify, suspend, or discontinue any part of the Service at any time.",
  },
  {
    title: "3. Account Registration",
    content:
      "To access certain features of the Service, you must create an account. You agree to provide accurate, complete, and up-to-date information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at support@leadxpert.io if you suspect unauthorized use of your account.",
  },
  {
    title: "4. Acceptable Use",
    content:
      "You agree not to use the Service to: upload, transmit, or store unlawful, offensive, harmful, or fraudulent content; violate any applicable laws or regulations; impersonate any person or entity; send spam, unsolicited messages, or phishing attempts; attempt to gain unauthorized access to any part of the Service or its infrastructure; reverse engineer, decompile, or disassemble the Service; or use the Service to develop a competing product.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "LeadXpert and its original content, features, and functionality are owned by LeadXpert, Inc. and are protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, create derivative works, publicly display, or commercially exploit any portion of the Service without our express written permission.",
  },
  {
    title: "6. Customer Data",
    content:
      "You retain full ownership of all data you input into the Service ('Customer Data'). By using the Service, you grant us a limited, non-exclusive license to process your Customer Data solely to provide the Service. We do not sell or share your Customer Data with third parties except as described in our Privacy Policy. You are responsible for ensuring that your use of LeadXpert complies with all applicable data protection laws.",
  },
  {
    title: "7. Subscription & Payment",
    content:
      "Paid plans are billed on a monthly or annual basis. All fees are due in advance and are non-refundable except as required by law or as otherwise stated in these Terms. We reserve the right to change pricing with 30 days' advance notice. If you fail to pay, we may suspend or terminate your access to paid features. All prices are in USD unless otherwise stated.",
  },
  {
    title: "8. Free Trial",
    content:
      "We may offer a free trial period for paid plans. At the end of the trial, you will be automatically charged unless you cancel before the trial ends. We reserve the right to modify or end free trial offers at any time.",
  },
  {
    title: "9. Cancellation & Termination",
    content:
      "You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period. We may terminate or suspend your account immediately, without notice, if you violate these Terms. Upon termination, your data will be retained for 30 days before permanent deletion.",
  },
  {
    title: "10. Disclaimers & Limitation of Liability",
    content:
      "THE SERVICE IS PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND. LEADXPERT, INC. MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEADXPERT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.",
  },
  {
    title: "11. Indemnification",
    content:
      "You agree to indemnify, defend, and hold harmless LeadXpert, Inc. and its officers, directors, employees, and agents from any claims, liabilities, damages, judgments, awards, and costs (including reasonable attorneys' fees) arising from your use of the Service or violation of these Terms.",
  },
  {
    title: "12. Governing Law",
    content:
      "These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved exclusively in the state or federal courts located in Delaware.",
  },
  {
    title: "13. Changes to Terms",
    content:
      "We reserve the right to modify these Terms at any time. We will notify you of material changes at least 30 days in advance via email or a prominent notice in the Service. Continued use of the Service after the effective date constitutes your acceptance of the updated Terms.",
  },
  {
    title: "14. Contact",
    content:
      "If you have any questions about these Terms, please contact us at legal@leadxpert.io or write to: LeadXpert, Inc., Kathmandu, Nepal.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-muted/20">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              Legal
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: <strong>March 1, 2026</strong>
          </p>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Please read these Terms carefully before using LeadXpert. These
            Terms constitute a legally binding agreement between you and
            LeadXpert, Inc.
          </p>
        </div>
      </section>
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-muted/10 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">
            Quick navigation
          </p>
          <div className="flex flex-wrap gap-2">
            {sections.slice(0, 7).map((s, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 cursor-pointer transition-colors"
              >
                {s.title.split(".")[0]}.{" "}
                {s.title.split(". ")[1]?.split(" ").slice(0, 2).join(" ")}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Questions?{" "}
              <Link
                href="/contact"
                className="text-primary hover:underline font-medium"
              >
                Contact us
              </Link>
            </p>
            <Link
              href="/privacy"
              className="text-sm text-primary hover:underline font-medium"
            >
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
