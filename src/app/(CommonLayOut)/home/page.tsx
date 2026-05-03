import React from "react";
import HeroCarousel from "@/components/home/HeroCarousel";
import { CategoryCard } from "@/components/home/CategoryCard";
import { MedicineCard } from "@/components/home/MedicineCard";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatsSection from "@/components/home/StatsSection";
import FAQSection from "@/components/home/FAQSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* ── Hero ─────────────────────────────────── */}
      <HeroCarousel />

      {/* ── Stats strip ──────────────────────────── */}
      <StatsSection />

      {/* ── Categories ───────────────────────────── */}
      <section className="container mx-auto px-4 py-16">
        {/* .section-head — GSAP reveal target */}
        <div className="section-head mb-10 max-w-2xl mx-auto text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Categories
          </span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight">
            Browse by Category
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            Find what you need across our curated collections of medicines and healthcare products.
          </p>
        </div>
        <CategoryCard />
      </section>

      {/* ── Featured Medicines ────────────────────── */}
      <section className="container mx-auto px-4 py-16">
        {/* .section-head — GSAP reveal target */}
        <div className="section-head mb-10 max-w-2xl mx-auto text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Top Picks
          </span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight">
            Featured Medicines
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            Hand-picked by our pharmacists for quality and value.
          </p>
        </div>
        <MedicineCard />
      </section>

      {/* ── Features / Why MediStore ──────────────── */}
      <FeaturesSection />

      {/* ── How It Works ─────────────────────────── */}
      <HowItWorks />

      {/* ── Testimonials ─────────────────────────── */}
      <Testimonials />

      {/* ── FAQ ──────────────────────────────────── */}
      <FAQSection />

      {/* ── Newsletter ───────────────────────────── */}
      <NewsletterSection />

      {/* ── CTA Banner ───────────────────────────── */}
      <CTABanner />
    </div>
  );
}
