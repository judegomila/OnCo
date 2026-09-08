import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor, type Target } from "@/lib/schema";

type Row = { cancerId: string; pct: number | string; measure?: string; source?: string; note?: string };

/** Parse "15-20", ">90", "<1", "n/a", or a number into a 0-100 midpoint for the bar (null when not numeric). */
export function pctValue(pct: number | string): number | null {
  if (typeof pct === "number") return Math.max(0, Math.min(100, pct));
  const s = pct.trim();
  if (/^n\/?a$/i.test(s)) return null;
  const range = s.match(/^(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)$/);
  if (range) return (parseFloat(range[1]) + parseFloat(range[2])) / 2;
  const gt = s.match(/^[>≥]\s*(\d+(?:\.\d+)?)$/);
  if (gt) return Math.min(100, parseFloat(gt[1]) + 3);
  const lt = s.match(/^[<≤]\s*(\d+(?:\.\d+)?)$/);
  if (lt) return Math.max(0, parseFloat(lt[1]) / 2);
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : null;
}

function Bar({ pct }: { pct: number | string }) {
  const v = pctValue(pct);
  return (
    <div className="flex items-center gap-2 min-w-[160px]">
      <div className="h-2 flex-1 rounded bg-foreground/10 overflow-hidden" aria-hidden>
        {v !== null && <div className="h-full bg-violet-500/80" style={{ width: `${v}%` }} />}
      </div>
      <span className="tabular-nums text-sm w-14 text-right">{typeof pct === "number" ? `${pct}%` : /^n\/?a$/i.test(pct) ? "n/a" : `${pct}%`}</span>
    </div>
  );
}

/** Per target: one bar per cancer. */
export function PrevalenceTable({ target }: { target: Target }) {
  const g = graph();
  if (!target.prevalence.length) return null;
  const rows = [...target.prevalence].sort((a, b) => (pctValue(b.pct) ?? -1) - (pctValue(a.pct) ?? -1));
  return (
    <div className="card overflow-x-auto">
      <table className="onco">
        <thead><tr><th>Cancer</th><th>Prevalence</th><th className="hidden md:table-cell">Measure</th><th className="hidden lg:table-cell">Note</th><th>Source</th></tr></thead>
        <tbody>
          {rows.map((r, i) => { const c = g.get(r.cancerId); return (
            <tr key={i}>
              <td>{c ? <Link href={routeFor(c)} className="font-medium hover:underline">{c.name.replace(/ \(.*\)$/, "")}</Link> : r.cancerId}</td>
              <td><Bar pct={r.pct} /></td>
              <td className="hidden md:table-cell text-muted">{r.measure}</td>
              <td className="hidden lg:table-cell text-muted">{r.note}</td>
              <td>{r.source && <a className="underline text-muted text-xs break-all" href={r.source} rel="noopener">{sourceLabel(r.source)}</a>}</td>
            </tr>); })}
        </tbody>
      </table>
      <p className="px-3 py-2 text-xs text-muted">Approximate, population-level figures; the measure column says what was counted. Ranges show the midpoint as a bar.</p>
    </div>
  );
}

/** Per cancer: which targets are present and how often. */
export function CancerPrevalence({ cancerId }: { cancerId: string }) {
  const g = graph();
  const rows: Array<{ target: Target; row: Row }> = [];
  for (const t of g.kind("target")) for (const r of t.prevalence) if (r.cancerId === cancerId) rows.push({ target: t, row: r });
  if (!rows.length) return null;
  rows.sort((a, b) => (pctValue(b.row.pct) ?? -1) - (pctValue(a.row.pct) ?? -1));
  return (
    <div className="card overflow-x-auto">
      <table className="onco">
        <thead><tr><th>Target / alteration</th><th>Prevalence</th><th className="hidden md:table-cell">Measure</th><th>Source</th></tr></thead>
        <tbody>
          {rows.map(({ target, row }, i) => (
            <tr key={i}>
              <td><Link href={routeFor(target)} className="font-medium hover:underline">{target.name}</Link>{row.note && <div className="text-xs text-muted">{row.note}</div>}</td>
              <td><Bar pct={row.pct} /></td>
              <td className="hidden md:table-cell text-muted">{row.measure}</td>
              <td>{row.source && <a className="underline text-muted text-xs" href={row.source} rel="noopener">{sourceLabel(row.source)}</a>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 py-2 text-xs text-muted">How common each drug target or alteration is in this cancer. Population-level and approximate; see the target page for detail. <Link className="underline" href="/prevalence/">Full matrix</Link>.</p>
    </div>
  );
}

export function sourceLabel(url: string): string {
  try {
    const h = new URL(url).hostname.replace(/^www\./, "");
    if (h.includes("cbioportal")) return "cBioPortal (TCGA)";
    if (h.includes("wikipedia")) return "Wikipedia";
    if (h.includes("ncbi") || h.includes("pmc")) return "PMC";
    if (h.includes("nature.com")) return "Nature";
    if (h.includes("fda.gov")) return "FDA";
    return h;
  } catch { return "source"; }
}
