import Link from "next/link";
import { routeFor } from "@/lib/schema";
import type { LeadershipRow } from "@/lib/trial-leadership";
import { ChipList } from "./ui";

export function TrialLeadership({ rows, limit }: { rows: LeadershipRow[]; limit?: number }) {
  const shown = (limit ? rows.slice(0, limit) : rows).filter((r) => r.total > 0);
  return (
    <div className="overflow-x-auto">
      <table className="onco">
        <thead><tr><th>#</th><th>Institution</th><th>Trials</th><th>Products</th><th>Technologies</th><th>Targets</th><th>Score</th></tr></thead>
        <tbody>
          {shown.map((r) => (
            <tr key={r.institution.id}>
              <td className="tabular-nums text-muted">{r.rank}</td>
              <td className="min-w-[200px]"><Link href={routeFor(r.institution)} className="font-medium hover:underline">{r.institution.name}</Link><div className="text-xs text-muted">{r.institution.city}, {r.institution.country}</div></td>
              <td className="min-w-[180px]">{r.trials.length ? <ChipList items={r.trials} /> : <span className="text-muted">—</span>}</td>
              <td className="min-w-[180px]">{r.drugs.length ? <ChipList items={r.drugs} /> : <span className="text-muted">—</span>}</td>
              <td className="tabular-nums">{r.technologies.length}</td>
              <td className="tabular-nums">{r.targets.length}</td>
              <td className="tabular-nums font-semibold">{r.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
