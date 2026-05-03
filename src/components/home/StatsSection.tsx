/**
 * StatsSection
 * ─────────────
 * Each .stat-num is targeted by GsapMotionInit for a count-up animation.
 * Each .stat card gets a scroll-triggered fade-up from GsapMotionInit.
 */
const stats = [
  { num: "200",  suffix: "k+", label: "Happy customers",    sub: "Across Bangladesh" },
  { num: "15",   suffix: "k+", label: "Medicines listed",   sub: "OTC & prescription" },
  { num: "98",   suffix: "%",  label: "On-time delivery",   sub: "Same-day in Dhaka" },
  { num: "24",   suffix: "/7", label: "Pharmacist support", sub: "Always available" },
];

const StatsSection = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mt-10 overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
          {stats.map(({ num, suffix, label, sub }) => (
            /* .stat — scroll-reveal target */
            <div
              key={label}
              className="stat flex flex-col items-center justify-center gap-1 px-6 py-8 text-center"
            >
              {/* .stat-num — counter animation target */}
              <p className="stat-num text-3xl font-black tracking-tight text-foreground md:text-4xl">
                {num}{suffix}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
