import { CONTINENT } from "./globocan-core";
import type { SettingShares } from "@/data/setting-shares";

// Pure helpers and types for the addressable population estimator. No graph or JSON imports, so the client
// component can use them without pulling the corpus into the browser bundle. See market.ts for the build-time side.

export type Range = [number, number];

export type RegionOption = { key: string; label: string; group: "World" | "Continent" | "Country" };

/** World, the six GLOBOCAN continents, and the countries most often used in market models. */
export const REGION_OPTIONS: RegionOption[] = [
  { key: "WORLD", label: "World", group: "World" },
  ...Object.entries(CONTINENT).map(([code, label]) => ({ key: `C${code}`, label, group: "Continent" as const })),
  ...[["USA", "United States"], ["CHN", "China"], ["JPN", "Japan"], ["DEU", "Germany"], ["FRA", "France"], ["GBR", "United Kingdom"], ["ITA", "Italy"], ["ESP", "Spain"], ["IND", "India"], ["BRA", "Brazil"], ["KOR", "South Korea"], ["CAN", "Canada"], ["AUS", "Australia"]].map(([key, label]) => ({ key, label, group: "Country" as const })),
];

/**
 * Parse the prevalence strings used on target pages into a percent range. Handles "15-20", ">95", "<1",
 * "~25", "100", and "n/a" (null). Composite strings like "~25 adults; ~3 children" take the first figure.
 */
export function parsePct(pct: number | string): Range | null {
  if (typeof pct === "number") return [pct, pct];
  const s = pct.trim().toLowerCase();
  if (!s || s.startsWith("n/a") || s === "unknown") return null;
  const range = s.match(/(\d+(?:\.\d+)?)\s*(?:-|–|to)\s*(\d+(?:\.\d+)?)/);
  if (range) return [Number(range[1]), Number(range[2])];
  const gt = s.match(/^[>≥]\s*(\d+(?:\.\d+)?)/);
  if (gt) return [Number(gt[1]), 100];
  const lt = s.match(/^[<≤]\s*(\d+(?:\.\d+)?)/);
  if (lt) return [0, Number(lt[1])];
  const approx = s.match(/^~\s*(\d+(?:\.\d+)?)/);
  if (approx) { const n = Number(approx[1]); return [Math.max(0, n * 0.8), Math.min(100, n * 1.2)]; }
  const plain = s.match(/(\d+(?:\.\d+)?)/);
  return plain ? [Number(plain[1]), Number(plain[1])] : null;
}

export type Estimate = {
  cases: number;
  subtype: Range | null;
  prevalence: Range;
  setting: Range;
  low: number;
  high: number;
};

/** Multiply the factors. `subtype` is optional; the other two are required. */
export function estimate(cases: number, prevalencePct: Range, setting: Range, subtype: Range | null): Estimate {
  const sub: Range = subtype ?? [1, 1];
  const low = cases * sub[0] * (prevalencePct[0] / 100) * setting[0];
  const high = cases * sub[1] * (prevalencePct[1] / 100) * setting[1];
  return { cases, subtype, prevalence: prevalencePct, setting, low: Math.round(low), high: Math.round(high) };
}

/** Serialisable inputs for the client-side estimator. */
export type MarketCancer = {
  id: string; name: string; route: string;
  siteLabel: string; siteNote?: string; shared: boolean;
  incidence: Record<string, number | null>;
  shares: SettingShares | null;
};
export type MarketTargetPrevalence = { cancerId: string; pct: string; range: Range | null; measure?: string; source?: string; note?: string };
export type MarketTarget = { id: string; name: string; route: string; prevalence: MarketTargetPrevalence[] };
