import Link from "next/link";
import { GLOBOCAN, rowsForCancer } from "@/lib/globocan";
import { GentleSection } from "./GentleSection";

const fmt = (n: number | null, d = 0) => n === null ? "—" : n.toLocaleString("en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });

/**
 * Server component: the top countries by new cases for one OnCo cancer, with the GLOBOCAN mapping
 * caveat and a link to the full /cases/ view. Incidence is shown; deaths sit behind a calm fold with a
 * note that survival differs by stage, subtype and year. Renders an explicit "no data" block when the
 * cancer has no direct GLOBOCAN estimate.
 */
export function CountryCasesMini({ cancerId, limit = 10 }: { cancerId: string; limit?: number }) {
  const { rows, mapping, world } = rowsForCancer(cancerId);
  const top = rows.filter((r) => r.cases !== null).slice(0, limit);
  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <div className="text-sm"><span className="kicker">Cases by country · GLOBOCAN {GLOBOCAN.year}</span></div>
        <Link href={`/cases/?cancer=${cancerId}`} className="text-sm underline">All countries →</Link>
      </div>
      {mapping.codes.length === 0 ? (
        <p className="text-sm"><span className="font-medium">No country-level case numbers.</span> <span className="text-muted">{mapping.note}</span></p>
      ) : (
        <>
          <p className="text-xs text-muted mb-2">Site: <span className="text-foreground">{mapping.label}</span>{mapping.shared ? " (shared total; subtype split not reported)" : ""}.{world ? ` World: ${fmt(world.cases)} new cases a year.` : ""}</p>
          <table className="onco">
            <thead><tr><th>#</th><th>Country</th><th>New cases</th><th className="hidden sm:table-cell">Incidence ASR</th></tr></thead>
            <tbody>{top.map((r, i) => <tr key={r.iso3}><td className="tabular-nums text-muted">{i + 1}</td><td><Link href={`/cases/?country=${r.iso3}`} className="hover:underline">{r.name}</Link></td><td className="tabular-nums">{fmt(r.cases)}</td><td className="tabular-nums hidden sm:table-cell">{fmt(r.incAsr, 1)}</td></tr>)}</tbody>
          </table>
          {mapping.note && <p className="text-xs text-muted mt-2">{mapping.note}</p>}
          <GentleSection className="mt-3 border-dashed" title="deaths by country" why="GLOBOCAN's estimated deaths for the same countries, for readers who want them."
            reassurance="Country-level death counts mix every stage, subtype and year of diagnosis, and reflect access to screening and treatment as much as the disease. Survival differs by stage, subtype and year; the cancer page above leads with what can be done.">
            <table className="onco">
              <thead><tr><th>#</th><th>Country</th><th>New cases</th><th>Deaths</th></tr></thead>
              <tbody>{top.map((r, i) => <tr key={r.iso3}><td className="tabular-nums text-muted">{i + 1}</td><td>{r.name}</td><td className="tabular-nums">{fmt(r.cases)}</td><td className="tabular-nums">{fmt(r.deaths)}</td></tr>)}</tbody>
            </table>
            {world && <p className="text-xs text-muted mt-2">World: {fmt(world.cases)} new cases and {fmt(world.deaths)} deaths a year (GLOBOCAN {GLOBOCAN.year}).</p>}
          </GentleSection>
        </>
      )}
    </div>
  );
}
