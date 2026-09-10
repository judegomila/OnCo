import Link from "next/link";
import type { Coverage } from "@/lib/completeness";
import { KIND_META } from "@/lib/schema";

const n = (x: number) => x.toLocaleString("en-GB");

function tone(pct: number | null): string {
  if (pct === null) return "bg-border";
  if (pct >= 75) return "bg-emerald-500";
  if (pct >= 40) return "bg-amber-500";
  return "bg-rose-500";
}

/** "about 1,100" for approximate denominators, "1,100" otherwise, "no denominator" when OnCo defines the kind itself. */
export function ofText(c: Coverage): string {
  if (c.den.total === null) return "no denominator";
  return `${c.den.approx ? "about " : ""}${n(c.den.total)}`;
}

/**
 * Kind, scope, in OnCo, of, coverage bar, source, missing. `compact` drops the source column and the
 * OnCo-defined rows, for the About page. Each row anchors to its section on /completeness/.
 */
export function CompletenessTable({ rows, compact = false, linkMissing = true }: { rows: Coverage[]; compact?: boolean; linkMissing?: boolean }) {
  const shown = compact ? rows.filter((r) => r.den.total !== null) : rows;
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-muted">
          <tr className="border-b border-border">
            <th className="px-3 py-2 font-medium">Kind</th>
            <th className="px-3 py-2 font-medium">Scope</th>
            <th className="px-3 py-2 font-medium text-right">In OnCo</th>
            <th className="px-3 py-2 font-medium text-right">Of</th>
            <th className="px-3 py-2 font-medium min-w-36">Coverage</th>
            {!compact && <th className="px-3 py-2 font-medium">Source</th>}
            <th className="px-3 py-2 font-medium text-right">Missing</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {shown.map((c) => {
            const kindLabel = c.den.kind === "none" ? "" : KIND_META[c.den.kind].plural;
            const anchor = `/completeness/#${c.den.id}`;
            return (
              <tr key={c.den.id} className="align-top">
                <td className="px-3 py-2 whitespace-nowrap text-muted">{kindLabel}</td>
                <td className="px-3 py-2">
                  <Link href={anchor} className="font-medium hover:underline">{c.den.scope}</Link>
                  {c.den.approx && <span className="ml-1.5 text-[11px] text-muted" title="The denominator is approximate: a round figure, a search hit count, or dependent on name matching.">approx.</span>}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">{n(c.ours)}</td>
                <td className="px-3 py-2 text-right tabular-nums whitespace-nowrap">{ofText(c)}</td>
                <td className="px-3 py-2">
                  {c.pct === null ? (
                    <span className="text-xs text-muted">OnCo-defined</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="relative h-1.5 flex-1 rounded-full bg-border overflow-hidden" role="meter" aria-label={`${c.den.scope}: ${c.pct}% covered`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={c.pct}>
                        <div className={`h-full rounded-full ${tone(c.pct)}`} style={{ width: `${Math.max(0, Math.min(100, c.pct))}%` }} />
                      </div>
                      <span className="tabular-nums text-xs w-12 text-right">{c.pct}%</span>
                    </div>
                  )}
                </td>
                {!compact && (
                  <td className="px-3 py-2 text-xs">
                    <a href={c.den.source.url} rel="noopener" className="underline decoration-foreground/25 underline-offset-[3px] hover:decoration-foreground">{c.den.source.label}</a>
                    <div className="text-muted mt-0.5">checked on {c.den.checked}</div>
                  </td>
                )}
                <td className="px-3 py-2 text-right tabular-nums whitespace-nowrap">
                  {c.den.total === null ? <span className="text-muted">n/a</span>
                    : c.listed ? (linkMissing ? <Link href={anchor} className="underline">{n(c.missing.length)} listed</Link> : <span>{n(c.missing.length)} listed</span>)
                    : <span className="text-muted" title="Count only: the source gives a total, not a list">{n(Math.max(0, (c.den.total ?? 0) - c.ours))} not listed</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
