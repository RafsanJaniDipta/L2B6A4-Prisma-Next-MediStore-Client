import Link from "next/link"
import { FileText, Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service — MediStore",
  description: "Read MediStore's terms and conditions for using our online pharmacy platform.",
}

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using MediStore, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
      "If you do not agree with any of these terms, you are prohibited from using or accessing this platform.",
      "We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.",
      "These terms apply to all users including customers, sellers, and administrators.",
    ],
  },
  {
    title: "2. Use of the Platform",
    body: [
      "You must be at least 18 years of age to create an account and place orders on MediStore.",
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You agree not to use the platform for any unlawful purpose or in violation of any regulations.",
      "Automated scraping, crawling, or data extraction without written permission is prohibited.",
      "You must not attempt to gain unauthorised access to any part of the platform or its related systems.",
    ],
  },
  {
    title: "3. Orders & Payments",
    body: [
      "All prices are listed in Bangladeshi Taka (৳) and are inclusive of applicable taxes unless stated otherwise.",
      "We reserve the right to refuse or cancel any order at our discretion, including orders that appear fraudulent.",
      "Cash on Delivery (COD) orders must be paid in full upon receipt. Refused deliveries may incur a handling fee.",
      "Prescription medicines require a valid prescription uploaded at the time of order. Orders without valid prescriptions will be cancelled.",
      "Order confirmation does not guarantee availability. We will notify you promptly if an item becomes unavailable after order placement.",
    ],
  },
  {
    title: "4. Delivery",
    body: [
      "Delivery times are estimates and not guaranteed. MediStore is not liable for delays caused by third-party couriers or force majeure events.",
      "Free delivery applies to orders over ৳500 within our standard delivery zones. Additional charges apply for remote areas.",
      "Risk of loss and title for products pass to you upon delivery to the specified address.",
      "If you are unavailable at the time of delivery, the courier may attempt re-delivery or leave the package at a safe location.",
    ],
  },
  {
    title: "5. Returns & Refunds",
    body: [
      "Eligible items may be returned within 7 days of delivery, provided they are unopened, undamaged, and in original packaging.",
      "Prescription medicines, temperature-sensitive products, and personalised items are non-returnable.",
      "Refunds are processed to the original payment method within 5–7 business days of return approval.",
      "MediStore reserves the right to reject returns that do not meet the eligibility criteria.",
    ],
  },
  {
    title: "6. Seller Responsibilities",
    body: [
      "Sellers must be licensed pharmaceutical entities or individuals with appropriate regulatory approvals.",
      "All medicines listed must be genuine, unexpired, and sourced from verified manufacturers.",
      "Sellers are responsible for accurate stock information, pricing, and product descriptions.",
      "MediStore reserves the right to suspend or terminate seller accounts that violate platform policies or regulatory requirements.",
      "Sellers agree to a platform commission as specified in the Seller Agreement entered at registration.",
    ],
  },
  {
    title: "7. Intellectual Property",
    body: [
      "All content on MediStore — including logos, text, images, and software — is the property of MediStore or its licensors.",
      "You may not reproduce, distribute, or create derivative works from our content without prior written consent.",
      "User-generated content (reviews, comments) remains the property of the user but grants MediStore a licence to display it.",
    ],
  },
  {
    title: "8. Limitation of Liability",
    body: [
      "MediStore is not liable for any indirect, incidental, or consequential damages arising from use of the platform.",
      "Our total liability to you for any claim shall not exceed the value of the order giving rise to the claim.",
      "We do not provide medical advice. Always consult a qualified healthcare professional before starting any medication.",
      "MediStore is not responsible for adverse reactions resulting from the misuse of medicines purchased on the platform.",
    ],
  },
  {
    title: "9. Termination",
    body: [
      "We may terminate or suspend your account immediately, without prior notice, if you breach these Terms.",
      "You may close your account at any time by contacting our support team.",
      "Upon termination, your right to use the platform ceases immediately. Outstanding orders will be fulfilled or refunded as appropriate.",
    ],
  },
  {
    title: "10. Governing Law",
    body: [
      "These Terms are governed by the laws of the People's Republic of Bangladesh.",
      "Any disputes arising from the use of MediStore shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.",
      "If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force.",
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-primary/5 py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <FileText className="size-7 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-3 text-muted-foreground">Last updated: January 1, 2026</p>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Please read these terms carefully before using MediStore. They govern your use of our
            online pharmacy platform and services.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-14">
        <div className="mx-auto max-w-3xl">
          {/* Intro */}
          <div className="mb-10 rounded-2xl border bg-card p-6">
            <p className="leading-relaxed text-muted-foreground">
              Welcome to MediStore. These Terms of Service ("Terms") constitute a legally binding
              agreement between you and MediStore governing your access to and use of our website,
              mobile applications, and related services. By creating an account or placing an order,
              you acknowledge that you have read, understood, and agree to be bound by these Terms.
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
            <h2 className="mb-4 text-lg font-bold">Questions About These Terms?</h2>
            <p className="mb-5 text-sm text-muted-foreground">
              If you have any questions or concerns about these Terms of Service, please contact
              our legal team.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="size-4 text-primary" />
              <span>legal@medistore.com</span>
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-8 flex flex-wrap gap-4 border-t pt-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary hover:underline">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-primary hover:underline">Contact Us</Link>
            <Link href="/home"    className="hover:text-primary hover:underline">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
