import Link from "next/link";
import type { Entity } from "@/lib/schema";
import { evidenceFor, evidenceLabel } from "@/lib/evidence";

/** Evidence-strength bar with a disclosed breakdown. Renders nothing for kinds that are not scored. */
export function EvidenceBar({ e, compact = false }: { e: Entity; compact?: boolean }) {
  const ev = evidenceFor(e);
  if (!ev) return null;
  const tone = ev.score >= 75 ? "bg-emerald-500" : ev.score >= 50 ? "bg-sky-500" : ev.score >= 30 ? "bg-amber-500" : "bg-zinc-400";
  if (compact) {
    return (
      <span className="inline-flex items-center gap-2 text-xs text-muted" title={`Evidence strength ${ev.score}/100`}>
        <span className="h-1.5 w-16 rounded bg-foreground/10 overflow-hidden"><span className={`block h-full ${tone}`} style={{ width: `${ev.score}%` }} /></span>
        <span className="tabular-nums">{ev.score}</span>
      </span>
    );
  }
  return (
    <details className="card p-4 text-sm">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="kicker">Evidence strength</span>
          <span className="tabular-nums"><span className="font-semibold">{ev.score}</span><span className="text-muted">/100 · {evidenceLabel(ev.score)}</span></span>
        </div>
        <div className="h-2 rounded bg-foreground/10 overflow-hidden"><div className={`h-full ${tone}`} style={{ width: `${ev.score}%` }} /></div>
        <div className="text-[11px] text-muted mt-1.5">How much and what kind of evidence, not how big the benefit. Click for the breakdown.</div>
      </summary>
      <ul className="mt-3 space-y-1">
        {ev.parts.map((p, i) => <li key={i} className="flex justify-between gap-3"><span className="text-muted">{p.label}</span><span className={`tabular-nums ${p.points < 0 ? "text-rose-600" : ""}`}>{p.points > 0 ? "+" : ""}{p.points}</span></li>)}
      </ul>
      <p className="text-[11px] text-muted mt-3">Formula disclosed on the <Link className="underline" href="/evidence/">evidence page</Link>.</p>
    </details>
  );
}
