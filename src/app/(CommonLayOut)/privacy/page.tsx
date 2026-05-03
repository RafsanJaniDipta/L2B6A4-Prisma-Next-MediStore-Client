import Link from "next/link"
import { Shield, Mail, Phone } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — MediStore",
  description: "How MediStore collects, uses, and protects your personal information.",
}

const sections = [
  {
    title: "1. Information We Collect",
    body: [
      "Personal identification information (name, email address, phone number) when you register or place an order.",
      "Delivery address and postal information required to fulfill your orders.",
      "Payment method details — we do not store full card numbers; only payment confirmation tokens are retained.",
      "Order history and browsing activity within the platform to improve recommendations.",
      "Technical data such as IP address, browser type, and device identifiers for security and analytics.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "To process and deliver your medicine orders, including sending order confirmations and delivery updates.",
      "To verify your identity and maintain account security.",
      "To personalize your experience and show relevant medicines and categories.",
      "To communicate important service updates, promotions, and health tips (you may opt out at any time).",
      "To comply with legal obligations, including prescription verification requirements.",
      "To improve our platform through aggregated, anonymised analytics.",
    ],
  },
  {
    title: "3. Information Sharing",
    body: [
      "We do not sell, rent, or trade your personal information to third parties.",
      "We share information with licensed pharmacists and delivery partners only to the extent required to fulfil your order.",
      "Payment processors receive only the minimum data necessary to complete transactions securely.",
      "We may disclose information to law enforcement or regulatory authorities when required by law.",
      "In the event of a merger or acquisition, customer data may be transferred as part of that transaction with prior notice.",
    ],
  },
  {
    title: "4. Data Security",
    body: [
      "All data is transmitted over HTTPS with TLS encryption.",
      "Passwords are hashed using industry-standard algorithms and never stored in plain text.",
      "Access to personal data is restricted to authorised personnel on a need-to-know basis.",
      "We conduct regular security audits and vulnerability assessments of our systems.",
      "Despite our best efforts, no method of electronic transmission or storage is 100% secure. We encourage you to use a strong, unique password.",
    ],
  },
  {
    title: "5. Cookies & Tracking",
    body: [
      "We use essential cookies to keep you signed in and maintain your cart session.",
      "Analytics cookies (anonymised) help us understand how users navigate the site so we can improve it.",
      "You may disable non-essential cookies through your browser settings without affecting core functionality.",
      "We do not use third-party advertising cookies or cross-site tracking technologies.",
    ],
  },
  {
    title: "6. Your Rights",
    body: [
      "Access: You may request a copy of the personal data we hold about you at any time.",
      "Correction: You may update your name, address, and contact details from your Profile page.",
      "Deletion: You may request account deletion by contacting our support team. Certain order records may be retained for legal compliance.",
      "Portability: You may request your data in a machine-readable format.",
      "Opt-out: You may unsubscribe from marketing emails via the link in any newsletter we send.",
    ],
  },
  {
    title: "7. Children's Privacy",
    body: [
      "MediStore is not directed at children under the age of 13. We do not knowingly collect personal information from children.",
      "If you believe a child has provided us with personal information, please contact us immediately and we will delete it.",
    ],
  },
  {
    title: "8. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on our website.",
      "The 'Last updated' date at the top of this page indicates when the policy was last revised.",
      "Continued use of MediStore after changes are posted constitutes your acceptance of the revised policy.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-primary/5 py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="size-7 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-muted-foreground">Last updated: January 1, 2026</p>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Your privacy matters to us. This policy explains how MediStore collects, uses,
            and protects your personal information when you use our platform.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-14">
        <div className="mx-auto max-w-3xl">
          {/* Intro */}
          <div className="mb-10 rounded-2xl border bg-card p-6">
            <p className="leading-relaxed text-muted-foreground">
              MediStore ("we", "our", "us") is committed to protecting the privacy of our customers,
              sellers, and all users of our platform. By using MediStore, you agree to the collection
              and use of information as described in this policy. If you do not agree, please
              discontinue use of the platform.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((sec) => (
              <section key={sec.title}>
                <h2 className="mb-4 text-xl font-bold text-foreground">{sec.title}</h2>
                <ul className="space-y-2.5">
                  {sec.body.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Contact block */}
          <div className="mt-12 rounded-2xl border bg-primary/5 p-6">
            <h2 className="mb-4 text-lg font-bold">Contact Us About Privacy</h2>
            <p className="mb-5 text-sm text-muted-foreground">
              If you have any questions about this Privacy Policy or how we handle your data,
              please reach out to our Data Protection team.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-4 text-primary" />
                <span>privacy@medistore.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="size-4 text-primary" />
                <span>+880 1234-567890</span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-8 flex flex-wrap gap-4 border-t pt-6 text-sm text-muted-foreground">
            <Link href="/terms"   className="hover:text-primary hover:underline">Terms of Service</Link>
            <Link href="/contact" className="hover:text-primary hover:underline">Contact Us</Link>
            <Link href="/home"    className="hover:text-primary hover:underline">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
