import { Star } from "lucide-react";

const testimonials = [
  {
    q: "My mom's medicines arrive before we run out. The auto-refill feature genuinely saved us a hospital visit.",
    name: "Tasnim R.", role: "Customer · 2 years", initial: "T",
  },
  {
    q: "The pharmacist chat helped me understand a drug interaction my doctor didn't mention. Tremendously thorough.",
    name: "Karim H.", role: "Customer · 8 months", initial: "K",
  },
  {
    q: "I've ordered hundreds of times. Genuine medicines, fair prices, and they actually show up when promised.",
    name: "Nadia A.", role: "Customer · 4 years", initial: "N",
  },
];

/**
 * Testimonials
 * ─────────────
 * .section-head → heading reveal
 * .testi        → individual card reveal
 */
const Testimonials = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* .section-head */}
      <div className="section-head mb-12 max-w-2xl mx-auto text-center">
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          From our customers
        </span>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight">
          Trusted by 200,000+ households.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          /* .testi — GSAP scroll-reveal target */
          <figure
            key={t.name}
            className="testi flex flex-col gap-4 rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex gap-1 text-yellow-400">
              {[0,1,2,3,4].map((i) => <Star key={i} className="size-4 fill-current" />)}
            </div>
            <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
              &ldquo;{t.q}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3 border-t pt-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                {t.initial}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
