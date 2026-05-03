import {
  Truck, ShieldCheck, CreditCard, Clock, BadgeCheck, Headphones,
} from "lucide-react";

const features = [
  { icon: Truck,       title: "Same-day delivery",    desc: "90-minute delivery in Dhaka, free over ৳500. Live tracking from dispatch to door." },
  { icon: ShieldCheck, title: "100% genuine",         desc: "Sourced from licensed manufacturers and verified by our in-house pharmacists." },
  { icon: CreditCard,  title: "Cash on delivery",     desc: "Pay only when you receive. No advance payment, no hidden fees, no surprises." },
  { icon: Clock,       title: "Order anytime",        desc: "Round-the-clock ordering with overnight processing for early-morning dispatch." },
  { icon: BadgeCheck,  title: "Easy returns",         desc: "7-day returns on eligible items. Free pickup and instant refund to your wallet." },
  { icon: Headphones,  title: "Pharmacist support",   desc: "Free chat with certified pharmacists about dosage, interactions, and alternatives." },
];

/**
 * FeaturesSection
 * ────────────────
 * .section-head → scroll-reveal (heading block)
 * .feat         → individual scroll-reveal (each feature card)
 */
const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* .section-head — GSAP reveal target */}
      <div className="section-head mb-12 max-w-2xl mx-auto text-center">
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          Why MediStore
        </span>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          A pharmacy that actually shows up.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          The basics, done right — so you can focus on getting better.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          /* .feat — GSAP scroll-reveal target */
          <div
            key={title}
            className="feat group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <Icon className="size-6 text-primary" />
            </div>
            <h3 className="mb-2 text-base font-bold">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
