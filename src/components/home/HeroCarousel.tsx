"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, CreditCard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Swiper v11
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

// ── Slide data ─────────────────────────────────────────────
const slides = [
  {
    eyebrow: "New · OTC Essentials",
    title: "Genuine medicines,\ndelivered in 90 minutes.",
    sub: "Free same-day delivery on orders over ৳500. Verified by licensed pharmacists.",
    cta: "Shop Now",
    ctaLink: "/medicines",
    ctaSecondary: "Upload prescription",
    img: "https://i.ibb.co.com/FFCw0h1/pharmacy-online-store-banner.png",
  },
  {
    eyebrow: "Free Shipping",
    title: "Skip the queue.\nOrder from home.",
    sub: "Upload your prescription — our pharmacists verify it in under 5 minutes.",
    cta: "Browse Medicines",
    ctaLink: "/medicines",
    ctaSecondary: "Learn More",
    img: "https://i.ibb.co.com/TMjrj5xX/pharmacy-online-store-banner3.png",
  },
  {
    eyebrow: "Cash on Delivery",
    title: "Pay only when\nyou receive.",
    sub: "Secure, simple, no advance payment. Trusted by 200,000+ households.",
    cta: "Order Now",
    ctaLink: "/medicines",
    ctaSecondary: "Browse Medicines",
    img: "https://i.ibb.co.com/vFJT4Rd/pharmacy-online-store-banner2.png",
  },
];

const TRUST = [
  { icon: ShieldCheck, label: "Verified pharmacy" },
  { icon: Truck,       label: "90-min delivery"   },
  { icon: CreditCard,  label: "Cash on delivery"  },
];

// ── Component ──────────────────────────────────────────────
export default function HeroCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    /* hero-wrap — GSAP parallax trigger */
    <section className="hero-wrap w-full min-h-[65vh] md:min-h-[70vh] overflow-hidden rounded-2xl bg-gradient-to-b from-primary/8 to-transparent">
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        loop={true}
        speed={700}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex min-h-[65vh] w-full flex-col justify-center pb-2 pt-8 md:min-h-[70vh] md:pt-10">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">

                  {/* ── Left: content ─────────────────────── */}
                  <div className="order-2 md:order-1">
                    {/* eyebrow — GSAP target */}
                    <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                      {s.eyebrow}
                    </span>

                    {/* title — GSAP target */}
                    <h1
                      className="hero-title mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl"
                      style={{ textWrap: "balance" } as React.CSSProperties}
                    >
                      {s.title.split("\n").map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </h1>

                    {/* subtitle — GSAP target */}
                    <p className="hero-sub mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                      {s.sub}
                    </p>

                    {/* CTAs — GSAP target */}
                    <div className="hero-actions mt-7 flex flex-wrap items-center gap-3">
                      <Button asChild size="lg" className="gap-2 px-6">
                        <Link href={s.ctaLink}>
                          {s.cta}
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="gap-2 px-6">
                        <Link href="/medicines">{s.ctaSecondary}</Link>
                      </Button>
                    </div>

                    {/* Trust — GSAP target */}
                    <div className="hero-trust mt-8 flex flex-wrap gap-5">
                      {TRUST.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <Icon className="size-4 text-primary" />
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pagination dots — synced via activeIdx state */}
                    <div className="hero-dots mt-8 flex items-center gap-2">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => swiperRef.current?.slideToLoop(i)}
                          aria-label={`Go to slide ${i + 1}`}
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            i === activeIdx ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* ── Right: image ───────────────────────── */}
                  <div className="hero-visual relative order-1 md:order-2">
                    <div className="relative w-full overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-primary/10" style={{ aspectRatio: "4/3", maxHeight: "52vh" }}>
                      {/* hero-img — GSAP parallax target */}
                      <img
                        src={s.img}
                        alt={s.title}
                        className="hero-img absolute inset-0 h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />

                      {/* Rating floating card — GSAP drift */}
                      <div className="hero-card hero-card-tl absolute left-4 top-4 flex items-center gap-3 rounded-xl border bg-background/95 p-3 shadow-lg backdrop-blur-sm">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                          <Star className="size-4 fill-yellow-500 text-yellow-500" />
                        </div>
                        <div>
                          <p className="text-base font-bold leading-none">4.9</p>
                          <p className="mt-1 text-xs text-muted-foreground">12k+ reviews</p>
                        </div>
                      </div>

                      {/* Delivery floating card — GSAP drift */}
                      <div className="hero-card hero-card-br absolute bottom-4 right-4 flex items-center gap-3 rounded-xl border bg-background/95 p-3 shadow-lg backdrop-blur-sm">
                        <span className="relative flex size-3 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                          <span className="relative inline-flex size-3 rounded-full bg-primary" />
                        </span>
                        <div>
                          <p className="text-base font-bold leading-none">90 min</p>
                          <p className="mt-1 text-xs text-muted-foreground">avg delivery</p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative glows */}
                    <div className="pointer-events-none absolute -right-10 -top-10 size-64 rounded-full bg-primary/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-10 -left-10 size-48 rounded-full bg-primary/8 blur-3xl" />
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
