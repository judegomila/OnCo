import Link from "next/link";
import { coverageUs } from "@/data/coverage-us";

const PART_LABEL: Record<string, string> = { B: "Part B (clinician-administered)", D: "Part D (self-administered)", "B or D": "Part B or Part D", "not covered": "Not covered (not FDA-approved)", unknown: "Unknown" };
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n % 1 ? 2 : 0 });

/** Compact US coverage card for a drug page: Medicare part, commercial pattern, list price with source, assistance links. Returns null when there is no record. */
export function CoverageUsCard({ drugId }: { drugId: string }) {
  const c = coverageUs[drugId];
  if (!c) return null;
  const assist = c.patientAssistance ?? [];
  return (
    <div className="card p-4">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <div className="kicker">US coverage</div>
        <Link href="/coverage/us/" className="text-xs underline text-muted">How paying for cancer care works in the US →</Link>
      </div>
      <dl className="grid gap-4 sm:grid-cols-2 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted mb-1">Medicare</dt>
          <dd><span className="chip bg-foreground/5 mr-1">{PART_LABEL[c.medicare.part] ?? c.medicare.part}</span>{c.medicare.ncd && <span className="text-xs text-muted">NCD {c.medicare.ncd}</span>}<p className="text-muted mt-1">{c.medicare.note}</p></dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted mb-1">Commercial insurance</dt>
          <dd><span className="chip bg-foreground/5 capitalize">{c.commercial.typical}</span><p className="text-muted mt-1">{c.commercial.note}</p></dd>
        </div>
        {c.listPriceUsd && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted mb-1">List price</dt>
            <dd><span className="font-medium tabular-nums">{usd(c.listPriceUsd.value)}</span> <span className="text-muted">per {c.listPriceUsd.per}</span><p className="text-xs text-muted mt-1">{c.listPriceUsd.url ? <a className="underline" href={c.listPriceUsd.url} rel="noopener">{c.listPriceUsd.source}</a> : c.listPriceUsd.source} ({c.listPriceUsd.year}). Net prices after rebates are usually lower.</p></dd>
          </div>
        )}
        {assist.length > 0 && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted mb-1">Assistance programmes</dt>
            <dd><ul className="space-y-0.5">{assist.map((p) => <li key={p.url + p.program}><a className="underline" href={p.url} rel="noopener">{p.program}</a>{p.note && <span className="text-xs text-muted"> — {p.note}</span>}</li>)}</ul></dd>
          </div>
        )}
      </dl>
      {c.oopNote && <p className="text-xs text-muted mt-3">{c.oopNote}</p>}
      <p className="text-xs text-muted mt-2">Sources: {c.sources.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a className="underline" href={s.url} rel="noopener">{s.label}</a></span>)}. Not medical or financial advice; verify with your plan.</p>
    </div>
  );
}
