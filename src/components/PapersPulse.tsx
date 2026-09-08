import Link from "next/link";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { KIND_META, type Kind } from "@/lib/schema";

export type PulseEntry = { kind: string; name: string; counts: Record<string, number>; last12: number; prior12: number; growth: number | null; total: number };
export type PulseIndex = { fetched: string; source: string; entities: Record<string, PulseEntry> };

/** Server-side reader for the weekly snapshot at public/papers/index.json (written by scripts/fetch-papers.ts). */
export function readPulse(): PulseIndex | null {
  const p = join(process.cwd(), "public", "papers", "index.json");
  if (!existsSync(p)) return null;
  try { return JSON.parse(readFileSync(p, "utf8")) as PulseIndex; } catch { return null; }
}

export function readPulseEntry(id: string): PulseEntry | null {
  return readPulse()?.entities[id] ?? null;
}

const YEARS = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
const CURRENT_YEAR = String(new Date().getFullYear());

/** CSS-only sparkline: one bar per year, height relative to the entity's own maximum. */
export function Sparkline({ counts, className = "" }: { counts: Record<string, number>; className?: string }) {
  const max = Math.max(1, ...YEARS.map((y) => counts[y] ?? 0));
  return (
    <span className={`inline-flex items-end gap-px h-5 ${className}`} title={YEARS.map((y) => `${y}: ${counts[y] ?? 0}`).join("\n")} aria-label="papers per year">
      {YEARS.map((y) => (
        <span key={y} className="w-1.5 rounded-sm bg-foreground/70" style={{ height: `${Math.max(6, Math.round(((counts[y] ?? 0) / max) * 100))}%`, opacity: y === CURRENT_YEAR ? 0.55 : 1 }} />
      ))}
    </span>
  );
}

function pct(g: number | null) {
  if (g === null) return "—";
  const v = Math.round(g * 100);
  return `${v > 0 ? "+" : ""}${v}%`;
}

function route(kind: string, id: string) {
  const meta = KIND_META[kind as Kind];
  return meta ? `/${meta.route}/${id}/` : `/${kind}s/${id}/`;
}

/** Table of topics ranked by growth in the last 12 months vs the 12 before. */
export function PulseTable({ index, kind, limit = 25, minPrior = 20, sort = "growth" }: { index: PulseIndex; kind?: string; limit?: number; minPrior?: number; sort?: "growth" | "last12" | "total" }) {
  const rows = Object.entries(index.entities)
    .filter(([, e]) => (!kind || e.kind === kind) && e.prior12 >= minPrior && (sort !== "growth" || e.growth !== null))
    .sort(([, a], [, b]) => sort === "growth" ? (b.growth ?? 0) - (a.growth ?? 0) : sort === "last12" ? b.last12 - a.last12 : b.total - a.total)
    .slice(0, limit);
  if (!rows.length) return <p className="text-muted text-sm">No topics meet the minimum volume yet.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-muted">
          <tr><th className="py-1 pr-3 font-medium">#</th><th className="py-1 pr-3 font-medium">Topic</th><th className="py-1 pr-3 font-medium">Kind</th><th className="py-1 pr-3 font-medium text-right">Last 12 mo</th><th className="py-1 pr-3 font-medium text-right">Prior 12 mo</th><th className="py-1 pr-3 font-medium text-right">Change</th><th className="py-1 pr-3 font-medium">{YEARS[0]} → {YEARS[YEARS.length - 1]}</th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map(([id, e], i) => (
            <tr key={id}>
              <td className="py-1.5 pr-3 text-muted tabular-nums">{i + 1}</td>
              <td className="py-1.5 pr-3"><Link className="font-medium hover:underline" href={route(e.kind, id)}>{e.name}</Link></td>
              <td className="py-1.5 pr-3 text-muted capitalize">{e.kind}</td>
              <td className="py-1.5 pr-3 text-right tabular-nums">{e.last12.toLocaleString()}</td>
              <td className="py-1.5 pr-3 text-right tabular-nums text-muted">{e.prior12.toLocaleString()}</td>
              <td className={`py-1.5 pr-3 text-right tabular-nums font-medium ${(e.growth ?? 0) > 0 ? "text-emerald-700 dark:text-emerald-300" : (e.growth ?? 0) < 0 ? "text-rose-700 dark:text-rose-300" : ""}`}>{pct(e.growth)}</td>
              <td className="py-1.5 pr-3"><Sparkline counts={e.counts} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Compact strip for an entity page: yearly bars + 12-month change, from the weekly snapshot. Server component. */
export function PaperTrend({ id }: { id: string }) {
  const e = readPulseEntry(id);
  if (!e || e.total === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
      <span className="kicker">Literature trend</span>
      <Sparkline counts={e.counts} />
      <span><b className="text-foreground tabular-nums">{e.last12.toLocaleString()}</b> papers in the last 12 months</span>
      {e.growth !== null && <span className={e.growth >= 0 ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}>{pct(e.growth)} vs prior 12</span>}
      <Link href="/papers/" className="underline">How this is computed</Link>
    </div>
  );
}
