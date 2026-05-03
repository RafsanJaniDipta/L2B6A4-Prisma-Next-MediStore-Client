"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Are all medicines on MediStore genuine?",
    answer:
      "Yes. Every medicine listed on MediStore is sourced directly from licensed manufacturers and verified distributors. We conduct regular quality checks to ensure you receive only genuine, safe products.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "We offer same-day delivery within Dhaka for orders placed before 2 PM. For other cities, delivery typically takes 1–3 business days depending on your location.",
  },
  {
    question: "Can I order without a prescription?",
    answer:
      "MediStore specializes in over-the-counter (OTC) medicines that do not require a prescription. For prescription-only medicines, you will need to upload a valid prescription during checkout.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently accept Cash on Delivery (COD) for all orders. Online payment options including bKash and card payments are coming soon.",
  },
  {
    question: "How do I track my order?",
    answer:
      "After placing an order, you can track its status in real-time from your dashboard under 'My Orders'. You will also receive SMS updates at each stage of delivery.",
  },
  {
    question: "Can I return a medicine if I change my mind?",
    answer:
      "Yes. We offer a 7-day return policy for eligible products that are unopened and in original condition. Contact our support team to initiate a return.",
  },
  {
    question: "How do I become a seller on MediStore?",
    answer:
      "Register an account and select 'Seller' as your role. After email verification, your account will be reviewed by our admin team. Once approved, you can start listing and selling medicines.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          FAQ
        </span>
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Everything you need to know about MediStore. Can&apos;t find the answer? Contact our support team.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border transition-all",
              openIndex === i ? "border-primary/30 bg-primary/5" : "bg-card"
            )}
          >
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-sm font-semibold md:text-base">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  openIndex === i && "rotate-180 text-primary"
                )}
              />
            </button>

            {openIndex === i && (
              <div className="px-5 pb-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
