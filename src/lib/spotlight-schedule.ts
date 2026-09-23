import { KIND_META, type Kind } from "./kinds";

/**
 * The home page spotlight rotates through one kind a day. This half is zod-free and graph-free so the client
 * component (src/components/Spotlight.tsx) can import it; the sets themselves are computed at build time in
 * src/lib/spotlight.ts and written to /api/v1/spotlight.json by scripts/build-api.ts.
 */

/** The kinds in rotation, in rotation order: the kinds the home counts grid features, minus fronts, pathways, glossary terms and journals. */
export const SPOTLIGHT_KINDS = ["cancer", "drug", "trial", "technology", "target", "idea", "roadmap", "person", "institution", "company", "paper", "collection", "pairing", "bottleneck"] as const satisfies readonly Kind[];
export type SpotlightKind = (typeof SPOTLIGHT_KINDS)[number];

export const SPOTLIGHT_URL = "/api/v1/spotlight.json";
export const SPOTLIGHT_QUERY = "spotlight";

/** How the hero of each kind is chosen; stated in the JSON so that the rule is auditable. */
export const SPOTLIGHT_RULE = "For each kind, the most connected record: the count of distinct records linking to or from it, ties broken by the length of its own prose. The next two by the same rule are the runners-up.";
export const SPOTLIGHT_SCHEDULE = "Day of the year (reader's local date) modulo the kinds list picks the kind; ?spotlight=<kind> on the home page overrides it.";

export type SpotlightPill = { id: string; kind: Kind; name: string; route: string };
export type SpotlightFact = { kicker: string; text: string };
export type SpotlightRecord = {
  id: string; kind: Kind; name: string; route: string; tldr: string;
  /** Three short facts, kicker plus text, in the kind's own vocabulary (state of the art, mechanism, hypothesis ...). */
  facts: SpotlightFact[];
  /** Up to eight connected records, the most connected first. */
  pills: SpotlightPill[];
  /** Distinct records linking to or from the hero. */
  connected: number;
};
export type SpotlightSet = { kind: SpotlightKind; label: string; hero: SpotlightRecord; runnersUp: Array<{ id: string; name: string; route: string }> };
export type SpotlightFile = { rule: string; schedule: string; kinds: SpotlightKind[]; buildKind: SpotlightKind; sets: Record<SpotlightKind, SpotlightSet> };

/** Public label of a kind as the counts grid shows it ("Treatments & tests", "Key papers"). */
export function spotlightKindLabel(kind: Kind): string {
  const m = KIND_META[kind];
  return m.title ?? m.plural;
}

/** Zero-based day of the year of a date, in its own calendar (no DST drift: the arithmetic is done in UTC days). */
export function dayOfYear(d: Date): number {
  return Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 1)) / 86_400_000);
}

/** The kind spotlighted on a date: the same date always gives the same kind, and a cycle of SPOTLIGHT_KINDS.length consecutive days covers every kind once. */
export function spotlightKindFor(d: Date): SpotlightKind {
  return SPOTLIGHT_KINDS[dayOfYear(d) % SPOTLIGHT_KINDS.length];
}

/** The kinds before and after `kind` in the rotation, wrapping at the ends. */
export function spotlightNeighbours(kind: SpotlightKind): { prev: SpotlightKind; next: SpotlightKind } {
  const i = SPOTLIGHT_KINDS.indexOf(kind);
  const n = SPOTLIGHT_KINDS.length;
  return { prev: SPOTLIGHT_KINDS[(i - 1 + n) % n], next: SPOTLIGHT_KINDS[(i + 1) % n] };
}

/** The kind named by `?spotlight=<kind>` (kind id or its route, e.g. drug or drugs), or null when absent or unknown. */
export function parseSpotlightQuery(search: string): SpotlightKind | null {
  const v = new URLSearchParams(search).get(SPOTLIGHT_QUERY)?.trim().toLowerCase();
  if (!v) return null;
  return SPOTLIGHT_KINDS.find((k) => k === v || KIND_META[k].route === v || KIND_META[k].plural === v) ?? null;
}

/** The home URL that shows `kind`: bare "/" for today's kind, otherwise the override query. */
export function spotlightHref(kind: SpotlightKind, today: SpotlightKind | null): string {
  return kind === today ? "/" : `/?${SPOTLIGHT_QUERY}=${kind}`;
}
