import Link from "next/link";
import { coverageUk, NICE_STATUS_LABEL, NICE_STATUS_TIP, type NiceStatus } from "@/data/coverage-uk";

/** Chip colours per NICE outcome: green for funded, teal for managed access, amber for pending, rose for refusals, grey for gaps. */
export const NICE_CHIP_CLASS: Record<NiceStatus, string> = {
  recommended: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  optimised: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  cdf: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200",
  "in development": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  "not recommended": "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  terminated: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  "not appraised": "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  unknown: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

/**
 * NHS coverage card for a drug page: NICE outcome with a link to the TA, the appraised indication, any Cancer
 * Drugs Fund note, SMC (Scotland) and AWMSG (Wales) positions, and the sources. Server component; renders
 * nothing when the product has no UK coverage record.
 */
export function CoverageUkCard({ drugId }: { drugId: string }) {
  const c = coverageUk[drugId];
  if (!c) return null;
  const { nice } = c;
  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <div className="kicker">What the NHS offers (UK)</div>
        <Link href="/coverage/uk/" className="text-xs text-muted underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground">All products and how the system works →</Link>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`chip ${NICE_CHIP_CLASS[nice.status]}`} title={NICE_STATUS_TIP[nice.status]}>{NICE_STATUS_LABEL[nice.status]}</span>
        {nice.ta && nice.url && <a href={nice.url} target="_blank" rel="noopener noreferrer" className="chip bg-foreground/5 hover:bg-foreground/10 tabular-nums">NICE {nice.ta}{nice.year ? ` · ${nice.year}` : ""}</a>}
        {!nice.ta && nice.url && <a href={nice.url} target="_blank" rel="noopener noreferrer" className="text-xs underline text-muted">Search NICE</a>}
        {c.smc && <span className="chip bg-foreground/5" title="Scottish Medicines Consortium advice for NHS Scotland">SMC: {c.smc.status}</span>}
        {c.awmsg && <span className="chip bg-foreground/5" title="All Wales Medicines Strategy Group">AWMSG: {c.awmsg}</span>}
      </div>
      <dl className="mt-3 grid gap-2 sm:grid-cols-[150px_1fr] text-[15px]">
        {nice.indication && <div className="contents"><dt className="text-muted text-sm">Appraised for</dt><dd className="leading-relaxed">{nice.indication}</dd></div>}
        {nice.note && <div className="contents"><dt className="text-muted text-sm">Notes</dt><dd className="leading-relaxed text-foreground/85">{nice.note}</dd></div>}
        {c.cdfNote && <div className="contents"><dt className="text-muted text-sm">Cancer Drugs Fund</dt><dd className="leading-relaxed text-foreground/85">{c.cdfNote}</dd></div>}
        {c.nhsEnglandCommissioned !== undefined && <div className="contents"><dt className="text-muted text-sm">NHS England</dt><dd className="leading-relaxed">{c.nhsEnglandCommissioned ? "Routinely funded for the appraised indication (or via managed access)" : "Not routinely funded"}</dd></div>}
      </dl>
      <p className="text-xs text-muted mt-3">
        Sources: {c.sources.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a className="underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></span>)}.
        {" "}Funding decisions are indication-specific and change monthly; verify with NICE and your treating team.
      </p>
    </div>
  );
}
