"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * NewsletterSection
 * ──────────────────
 * .news-card — GSAP scroll-reveal target (fade-up when scrolled into view)
 */
const NewsletterSection = () => {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError("Please enter a valid email address."); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="container mx-auto px-4 pb-16">
      {/* .news-card — GSAP scroll-reveal target */}
      <div className="news-card relative overflow-hidden rounded-3xl bg-foreground px-8 py-14 md:px-14">
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left: copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Stay informed
            </span>
            <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Health tips, new arrivals,<br className="hidden sm:block" />
              and exclusive deals.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
              One email a week. No spam, ever. Unsubscribe with one click.
            </p>
          </div>

          {/* Right: form */}
          <div className="relative z-10">
            {submitted ? (
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-6 py-5 backdrop-blur-sm">
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                <p className="text-sm font-medium text-white">
                  You&apos;re subscribed! Check your inbox soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@example.com"
                  className="h-12 flex-1 min-w-0 rounded-xl border border-white/15 bg-white/8 px-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-primary focus:bg-white/12"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="h-12 shrink-0 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {loading
                    ? <Loader2 className="size-4 animate-spin" />
                    : <><span>Subscribe</span><ArrowRight className="size-4" /></>
                  }
                </Button>
              </form>
            )}
            {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
            {!submitted && <p className="mt-3 text-xs text-white/40">No spam, ever. Unsubscribe at any time.</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
