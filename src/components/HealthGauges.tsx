import Link from "next/link";
import type { HealthMetric } from "@/lib/health";
import { KIND_META } from "@/lib/schema";

const n = (x: number) => x.toLocaleString("en-GB");

function tone(m: HealthMetric): { bar: string; chip: string; word: string } {
  if (m.met) return { bar: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200", word: "met" };
  if (m.pct >= m.target * 0.6) return { bar: "bg-amber-500", chip: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200", word: "needs work" };
  return { bar: "bg-rose-500", chip: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200", word: "needs work" };
}

/** One gauge: value over total, a thin bar with the target marked, the plain sentence, the action, and the worst offenders. */
export function HealthGauge({ m }: { m: HealthMetric }) {
  const t = tone(m);
  const failing = m.total - m.value;
  return (
    <article id={`metric-${m.id}`} className="card p-4 flex flex-col gap-2.5 scroll-mt-24">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium leading-snug text-balance">
          <a href={`#metric-${m.id}`} className="hover:underline">{m.label}</a>
          {m.kind && <span className="ml-1.5 text-xs text-muted font-normal">{KIND_META[m.kind].plural}</span>}
        </h3>
        <span className={`chip shrink-0 ${t.chip}`}>{t.word}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold tabular-nums leading-none">{n(m.value)}</span>
        <span className="text-sm text-muted tabular-nums">/ {n(m.total)}</span>
        <span className="ml-auto text-sm font-medium tabular-nums">{m.pct}%</span>
      </div>
      <div className="relative h-1 rounded-full bg-border overflow-visible" role="meter" aria-label={m.label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={m.pct} title={`${m.pct}% of ${n(m.total)}; target ${m.target}%`}>
        <div className={`h-full rounded-full ${t.bar}`} style={{ width: `${Math.max(0, Math.min(100, m.pct))}%` }} />
        <div className="absolute -top-0.5 h-2 w-px bg-foreground/60" style={{ left: `${m.target}%` }} aria-hidden title={`target ${m.target}%`} />
      </div>
      <p className="text-sm text-muted leading-relaxed">{m.plain}</p>
      <div className="text-sm leading-relaxed">
        <span className="kicker">What to do</span>
        <p className="mt-0.5">{m.action}</p>
      </div>
      <div className="flex flex-wrap gap-2 text-xs mt-auto">
        <a href={m.issueUrl} rel="noopener" className="rounded-lg bg-foreground text-background px-2.5 py-1 font-medium hover:brightness-110">Open an issue for this gap</a>
        <a href={m.code} rel="noopener" className="rounded-lg border border-border px-2.5 py-1 hover:bg-foreground/5" title="The metric definition in src/lib/health.ts">How it is counted</a>
      </div>
      {m.worst.length > 0 && (
        <details className="text-sm">
          <summary className="cursor-pointer text-muted hover:text-foreground">
            {failing > m.worst.length ? `Worst ${m.worst.length} of ${n(failing)} failing` : `All ${n(failing)} failing`}
          </summary>
          <ol className="mt-2 divide-y divide-border rounded-lg border border-border">
            {m.worst.map((w) => (
              <li key={w.id} className="px-3 py-1.5 flex flex-wrap items-baseline gap-x-2">
                <Link href={w.route} className="font-medium hover:underline">{w.name}</Link>
                {w.detail && <span className="text-xs text-muted">{w.detail}</span>}
              </li>
            ))}
          </ol>
        </details>
      )}
    </article>
  );
}

/** Grid of gauge cards, with a one-line tally at the top. */
export function HealthGauges({ metrics }: { metrics: HealthMetric[] }) {
  const met = metrics.filter((m) => m.met).length;
  const sorted = [...metrics].sort((a, b) => (a.met === b.met ? a.pct - a.target - (b.pct - b.target) : a.met ? 1 : -1));
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
        <span className="chip bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">{met} met</span>
        <span className="chip bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200">{metrics.length - met} need work</span>
        <span className="text-muted">Sorted worst first. The tick on each bar is the target; a &ldquo;shipped&rdquo; idea below its target is shown as &ldquo;needs work&rdquo; in the list below.</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((m) => <HealthGauge key={m.id} m={m} />)}
      </div>
    </div>
  );
}
