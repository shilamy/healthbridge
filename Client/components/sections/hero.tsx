import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  WifiOff,
  Building2,
  ShieldCheck,
  Activity,
  FlaskConical,
  Bell,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft teal wash, not a stripe/gradient-text gimmick */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_70%_0%,hsl(var(--primary)/0.07),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
        {/* Copy */}
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Built for hospitals across Africa
          </span>

          <h1 className="mt-5 text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-foreground">
            One platform for the
            <br className="hidden sm:block" /> whole patient journey.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            MediCore runs triage, consults, labs, pharmacy, and billing from a
            single system, for hospitals, clinics, and labs. It keeps working
            when the network doesn&rsquo;t, so care never stops.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <a href="#pricing">
                Book a demo <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">See how it works</a>
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <WifiOff className="h-4 w-4 text-primary" /> Works offline
            </li>
            <li className="inline-flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" /> Multi-tenant
            </li>
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> WCAG AA, audit-logged
            </li>
          </ul>
        </div>

        {/* Product mockup (real imagery: shows the product) */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

function DashboardMock() {
  const queue = [
    { name: "Amara Okafor", tag: "Triage", tone: "primary" as const, wait: "2m" },
    { name: "Kwame Mensah", tag: "Consult", tone: "muted" as const, wait: "6m" },
    { name: "Zanele Dlamini", tag: "Lab", tone: "amber" as const, wait: "11m" },
  ];
  const bars = [42, 61, 38, 74, 55, 83, 48];

  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-[0_20px_50px_-20px_hsl(185_40%_20%/0.35)]">
      {/* window chrome */}
      <div className="flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Ward overview
        </div>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* stat row */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          { label: "In queue", value: "18" },
          { label: "Beds free", value: "07" },
          { label: "Labs due", value: "12" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-background p-3">
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {s.value}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* chart */}
      <div className="mt-3 rounded-xl border border-border bg-background p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Admissions, this week
          </span>
          <span className="text-xs font-semibold text-primary">+12%</span>
        </div>
        <div className="mt-3 flex h-20 items-end gap-2">
          {bars.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={
                "flex-1 rounded-md " +
                (i === bars.length - 2 ? "bg-primary" : "bg-primary/25")
              }
            />
          ))}
        </div>
      </div>

      {/* patient queue */}
      <div className="mt-3 space-y-2">
        {queue.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2.5"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-xs font-semibold text-foreground">
                {p.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <span className="text-sm font-medium text-foreground">{p.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusPill tone={p.tone}>{p.tag}</StatusPill>
              <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
                {p.wait}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* offline banner — ties to the product's real differentiator */}
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2.5 text-xs font-medium text-primary">
        <FlaskConical className="h-4 w-4" />
        3 lab results saved offline — will sync when back online
      </div>
    </div>
  );
}

function StatusPill({
  tone,
  children,
}: {
  tone: "primary" | "muted" | "amber";
  children: React.ReactNode;
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    muted: "bg-secondary text-muted-foreground",
    amber: "bg-accent/15 text-[hsl(28_80%_30%)]",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
