import Link from "next/link"

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Account Information",
        text: "When you create an account, we collect your name, email address, and password. If you sign up through a third-party OAuth provider (e.g., Google), we receive the information that provider makes available according to your privacy settings.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with LeadXpert, including pages visited, features used, time spent, and error logs. This helps us improve the product.",
      },
      {
        subtitle: "Customer Data",
        text: "LeadXpert is a CRM tool. Any leads, contacts, deals, notes, and files you store in LeadXpert are your data. We process this data solely to provide the service to you.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: null,
        text: "We use the information we collect to: provide, maintain, and improve LeadXpert; process transactions and send related information; send technical notices, security alerts, and support messages; respond to your comments and questions; monitor usage patterns to improve user experience; and comply with legal obligations.",
      },
    ],
  },
  {
    title: "3. Data Sharing",
    content: [
      {
        subtitle: "We never sell your data.",
        text: "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted third-party service providers who assist us in operating our platform (e.g., cloud hosting, email delivery, analytics). All such providers are bound by strict confidentiality agreements.",
      },
      {
        subtitle: "Legal Disclosure",
        text: "We may disclose your information if required by law, court order, or other governmental authority, or if we believe disclosure is necessary to protect our rights or the safety of others.",
      },
    ],
  },
  {
    title: "4. Data Storage & Security",
    content: [
      {
        subtitle: null,
        text: "Your data is stored on servers located in the EU and US. We use AES-256 encryption at rest and TLS 1.3 in transit. We implement industry-standard security measures including access controls, regular security audits, and intrusion detection systems. No method of transmission over the internet is 100% secure, but we take every reasonable precaution to protect your data.",
      },
    ],
  },
  {
    title: "5. Data Retention",
    content: [
      {
        subtitle: null,
        text: "We retain your account data for as long as your account is active or as needed to provide services. If you close your account, we will retain your data for 30 days in case you change your mind, after which it will be permanently deleted. You can request immediate deletion at any time by contacting support@leadxpert.io.",
      },
    ],
  },
  {
    title: "6. Your Rights (GDPR & CCPA)",
    content: [
      {
        subtitle: null,
        text: "Depending on your location, you may have the following rights regarding your personal data: the right to access a copy of your data; the right to correct inaccurate data; the right to delete your data ('right to be forgotten'); the right to restrict processing; the right to data portability; and the right to object to processing. To exercise any of these rights, contact us at privacy@leadxpert.io.",
      },
    ],
  },
  {
    title: "7. Cookies",
    content: [
      {
        subtitle: null,
        text: "We use cookies and similar tracking technologies to maintain your session and remember your preferences. We do not use third-party advertising cookies. You can control cookie settings through your browser. Disabling cookies may affect the functionality of LeadXpert.",
      },
    ],
  },
  {
    title: "8. Changes to This Policy",
    content: [
      {
        subtitle: null,
        text: "We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by displaying a prominent notice in the application at least 30 days before the changes take effect. Continued use of LeadXpert after the effective date constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    title: "9. Contact Us",
    content: [
      {
        subtitle: null,
        text: "If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer at privacy@leadxpert.io.",
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-muted/20">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              Legal
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: <strong>March 1, 2026</strong>
          </p>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            LeadXpert, Inc. (&quot;LeadXpert&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your
            privacy. This Privacy Policy explains what information we collect, how we use it, and
            your rights regarding that information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((block, j) => (
                    <div key={j}>
                      {block.subtitle && (
                        <p className="font-semibold text-foreground mb-1">{block.subtitle}</p>
                      )}
                      <p className="text-muted-foreground leading-relaxed text-sm">{block.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation links */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Questions?{" "}
              <Link href="/contact" className="text-primary hover:underline font-medium">
                Contact us
              </Link>
            </p>
            <Link href="/terms" className="text-sm text-primary hover:underline font-medium">
              View Terms of Service →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
