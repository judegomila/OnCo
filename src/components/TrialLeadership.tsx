import Link from "next/link";
import { routeFor, type Entity } from "@/lib/schema";
import type { LeadershipRow } from "@/lib/trial-leadership";
import { Logo } from "./Logo";

/** A few linked names, then a count of the rest, so rows stay one or two lines tall. */
function Few({ items, max = 3 }: { items: Entity[]; max?: number }) {
  if (!items.length) return <span className="text-muted">-</span>;
  const shown = items.slice(0, max), rest = items.length - shown.length;
  return (
    <span className="text-muted">
      {shown.map((e, i) => <span key={e.id}>{i > 0 && ", "}<Link href={routeFor(e)} className="hover:underline hover:text-foreground">{e.name.replace(/ \(.*\)$/, "")}</Link></span>)}
      {rest > 0 && <span className="text-xs"> +{rest} more</span>}
    </span>
  );
}

export function TrialLeadership({ rows, limit }: { rows: LeadershipRow[]; limit?: number }) {
  const shown = (limit ? rows.slice(0, limit) : rows).filter((r) => r.total > 0);
  return (
    <div className="card overflow-x-auto">
      <table className="onco">
        <thead><tr><th>#</th><th>Institution</th><th>Trials</th><th>Products</th><th className="text-right">Technologies</th><th className="text-right">Targets</th><th className="text-right">Score</th></tr></thead>
        <tbody>
          {shown.map((r) => (
            <tr key={r.institution.id}>
              <td className="tabular-nums text-muted w-10">{r.rank}</td>
              <td className="min-w-[240px]">
                <div className="flex items-center gap-2">
                  <Logo id={r.institution.id} website={r.institution.website} name={r.institution.name} size={28} className="shrink-0" />
                  <div><Link href={routeFor(r.institution)} className="font-medium hover:underline">{r.institution.name}</Link><div className="text-xs text-muted font-normal">{r.institution.city}, {r.institution.country}</div></div>
                </div>
              </td>
              <td className="min-w-[220px] max-w-md">{r.trials.length > 0 ? <><span className="tabular-nums font-medium">{r.trials.length}</span><span className="text-xs"> · </span><Few items={r.trials} /></> : <span className="text-muted">-</span>}</td>
              <td className="min-w-[220px] max-w-md">{r.drugs.length > 0 ? <><span className="tabular-nums font-medium">{r.drugs.length}</span><span className="text-xs"> · </span><Few items={r.drugs} /></> : <span className="text-muted">-</span>}</td>
              <td className="tabular-nums text-right">{r.technologies.length}</td>
              <td className="tabular-nums text-right">{r.targets.length}</td>
              <td className="tabular-nums text-right font-semibold">{r.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
