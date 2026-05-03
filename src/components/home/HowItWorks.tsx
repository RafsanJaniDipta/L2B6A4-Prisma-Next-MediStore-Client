const steps = [
  { n: "01", title: "Search & Select",       desc: "Find medicines by name, brand, or condition. Filter by prescription status, form, or price." },
  { n: "02", title: "Upload Prescription",   desc: "Snap or upload your prescription — our pharmacists verify it in under 5 minutes." },
  { n: "03", title: "Pay Your Way",          desc: "Cash on delivery, card, or mobile banking. No advance payment required." },
  { n: "04", title: "Track to Your Door",    desc: "Real-time tracking from dispatch through doorstep, with live ETA updates." },
];

/**
 * HowItWorks
 * ───────────
 * .section-head → heading scroll-reveal
 * .step         → individual card scroll-reveal
 */
const HowItWorks = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* .section-head */}
      <div className="section-head mb-12 max-w-2xl mx-auto text-center">
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          How It Works
        </span>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight">
          Four steps from search to doorstep.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          /* .step — GSAP scroll-reveal target */
          <div
            key={step.n}
            className="step relative rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
              {step.n}
            </div>
            <h3 className="mb-2 text-base font-bold text-foreground">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute -right-2.5 top-9 hidden h-px w-5 bg-border lg:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
