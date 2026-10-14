/**
 * Build-time retrieval dates for the per-record snapshots behind an aggregate index.
 *
 * An index file carries one `fetched` date: when the aggregation ran. The records it aggregates are refreshed in
 * batches, so that date vouches for work that can be much older. Measured on 14 October 2026: the papers index
 * claimed 25 September while 2,143 of its 3,683 topics were read on the 22nd, and the institution research index
 * claimed one date while its 571 snapshots spanned 11 September to 8 October. Reading each record's own date
 * makes a feed's age and staleness run off the oldest contributor, which is what a freshness page should say.
 *
 * From #200 and #211 (Milbaxter), by way of PR 208; the per-page date ranges that PR also proposed are not here.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type LiteratureDates = { oldest?: string; newest?: string; unknown: number; total: number };

function calendarDate(value: unknown): string | undefined {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : undefined;
}

/** The same, for any directory of per-record snapshots: `public/<dir>/<id>.json`. */
export function snapshotDates(dir: string, entries: unknown, root = process.cwd()): LiteratureDates {
  const ids = entries && typeof entries === "object" && !Array.isArray(entries) ? Object.keys(entries) : [];
  const dates: string[] = [];
  for (const id of ids) {
    // Index keys are record IDs, never paths; the aggregate's own run date is not a topic retrieval.
    if (!/^[a-zA-Z0-9_-]+$/.test(id) || id === "index") continue;
    try {
      const snapshot = JSON.parse(readFileSync(join(root, "public", dir, `${id}.json`), "utf8"));
      const date = calendarDate(snapshot?.fetched);
      if (date) dates.push(date);
    } catch { /* Missing, unreadable or malformed legacy snapshots have an unknown retrieval date. */ }
  }
  dates.sort();
  return { oldest: dates[0], newest: dates.at(-1), unknown: ids.length - dates.length, total: ids.length };
}

export function literatureDates(feed: "papers" | "preprints", entities: unknown, root = process.cwd()): LiteratureDates {
  return snapshotDates(feed, entities, root);
}

export function literatureDateLabel(dates: LiteratureDates): string {
  if (!dates.total) return "Unknown (no topic snapshots)";
  if (!dates.oldest) return `Unknown (${dates.unknown} topic ${dates.unknown === 1 ? "date" : "dates"} unknown)`;
  const range = dates.oldest === dates.newest ? dates.oldest : `${dates.oldest} to ${dates.newest}`;
  return dates.unknown ? `${range}; ${dates.unknown} of ${dates.total} topic dates unknown` : range;
}
