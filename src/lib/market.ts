import { graph } from "./graph";
import { GLOBOCAN, cellFor, mappingFor } from "./globocan";
import { settingShares } from "@/data/setting-shares";
import { estimate, parsePct, REGION_OPTIONS, type MarketCancer, type MarketTarget, type Range } from "./market-core";

export * from "./market-core";

/**
 * Addressable population estimator (build-time side; pure helpers live in market-core.ts).
 *
 *   patients per year = incidence(cancer site, region)
 *                     x subtype share (when GLOBOCAN reports a broader site than the OnCo cancer)
 *                     x target prevalence in that cancer (from target.prevalence, a range)
 *                     x setting share (fraction of patients who reach the chosen treatment setting)
 *
 * Every factor except incidence is a [low, high] range and the ranges multiply, so the band is wide on
 * purpose. Incidence is GLOBOCAN 2022 new cases; prevalence is the sourced figure on each target page;
 * setting and subtype shares are the editorial ranges in src/data/setting-shares.ts. Nothing here is a
 * forecast: it is the arithmetic, with every input linked so a reader can disagree with one factor.
 */

/** New cases per year for a cancer in a region option, or null when GLOBOCAN has no estimate. */
export function incidence(cancerId: string, regionKey: string): number | null {
  const codes = mappingFor(cancerId).codes;
  if (!codes.length) return null;
  if (regionKey.startsWith("C")) {
    const code = regionKey.slice(1);
    let sum = 0, any = false;
    for (const [iso, c] of Object.entries(GLOBOCAN.countries)) {
      if (iso === "WORLD" || c.region !== code) continue;
      const cell = cellFor(c, codes);
      if (cell && cell[0] !== null) { sum += cell[0]; any = true; }
    }
    return any ? sum : null;
  }
  const c = GLOBOCAN.countries[regionKey];
  if (!c) return null;
  const cell = cellFor(c, codes);
  return cell ? cell[0] : null;
}

export function marketInputs(): { cancers: MarketCancer[]; targets: MarketTarget[]; globocan: { year: number; source: string; sourceUrl: string; fetched: string } } {
  const g = graph();
  const cancers: MarketCancer[] = g.kind("cancer")
    .filter((c) => mappingFor(c.id).codes.length)
    .map((c) => {
      const m = mappingFor(c.id);
      const inc: Record<string, number | null> = {};
      for (const r of REGION_OPTIONS) inc[r.key] = incidence(c.id, r.key);
      return { id: c.id, name: c.name, route: `/cancers/${c.id}/`, siteLabel: m.label, siteNote: m.note, shared: !!m.shared, incidence: inc, shares: settingShares.find((s) => s.cancerId === c.id) ?? null };
    });
  const withData = new Set(cancers.map((c) => c.id));
  const targets: MarketTarget[] = g.kind("target")
    .map((t) => ({
      id: t.id, name: t.name, route: `/targets/${t.id}/`,
      prevalence: t.prevalence.filter((p) => withData.has(p.cancerId)).map((p) => ({ cancerId: p.cancerId, pct: String(p.pct), range: parsePct(p.pct), measure: p.measure, source: p.source, note: p.note })),
    }))
    .filter((t) => t.prevalence.some((p) => p.range));
  return { cancers, targets, globocan: { year: GLOBOCAN.year, source: GLOBOCAN.source, sourceUrl: GLOBOCAN.sourceUrl, fetched: GLOBOCAN.fetched } };
}

/**
 * World addressable patients per year for a target, summed over the cancers where its prevalence is
 * recorded, using the midpoint of each range and the first (broadest) setting for each cancer. Used by the
 * crowding index; returns null when no cancer has both incidence and a parseable prevalence.
 */
export function worldAddressable(targetId: string): { mid: number; low: number; high: number; cancers: string[]; dropped: string[] } | null {
  const g = graph();
  const t = g.get(targetId);
  if (!t || t.kind !== "target") return null;
  let low = 0, high = 0;
  const cancers: string[] = [];
  const dropped: string[] = [];
  for (const p of t.prevalence) {
    const cases = incidence(p.cancerId, "WORLD");
    const pr = parsePct(p.pct);
    if (cases === null || !pr) { dropped.push(p.cancerId); continue; }
    const shares = settingShares.find((s) => s.cancerId === p.cancerId);
    const setting: Range = shares?.settings[0]?.share ?? [1, 1];
    const sub = shares?.subtypeShare?.share ?? null;
    const e = estimate(cases, pr, setting, sub);
    low += e.low; high += e.high; cancers.push(p.cancerId);
  }
  if (!cancers.length) return null;
  return { mid: Math.round((low + high) / 2), low, high, cancers, dropped };
}
