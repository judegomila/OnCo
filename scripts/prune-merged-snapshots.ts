/**
 * Drops retired ids from the fetched snapshots under public/ that are keyed by record id.
 *
 * A merge (scripts/merge-records.ts) retires an id, but the JSON a fetcher wrote earlier still holds an entry under
 * it: public/citations/index.json is the one with a test behind it (src/lib/citations.test.ts). Re-running the
 * fetcher would fix it too, at the cost of the API calls; this does it offline. Where the survivor has no entry of
 * its own, the retired record's is moved onto it, because the two share a PubMed id and so share the count.
 *
 *   npx tsx scripts/prune-merged-snapshots.ts
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { MERGED_RECORDS } from "@/data/merged-records";

const survivorOf = new Map(MERGED_RECORDS.map((r) => [r.retired, r.survivor]));
const files = ["public/citations/index.json", "public/openalex/papers.json"];

for (const rel of files) {
  let moved = 0, dropped = 0;
  const path = join(process.cwd(), rel);
  if (!existsSync(path)) continue;
  const json = JSON.parse(readFileSync(path, "utf8")) as { papers?: Record<string, unknown>; missing?: string[] };
  const papers = json.papers;
  if (!papers) continue;
  // The OpenAlex snapshot also lists the ids it found nothing for; a retired id there becomes its survivor.
  if (json.missing) json.missing = [...new Set(json.missing.map((id) => survivorOf.get(id) ?? id))].filter((id) => !papers[id]).sort();
  for (const [id, value] of Object.entries(papers)) {
    const survivor = survivorOf.get(id);
    if (!survivor) continue;
    if (!papers[survivor]) { papers[survivor] = value; moved++; } else dropped++;
    delete papers[id];
  }
  json.papers = Object.fromEntries(Object.entries(papers).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(path, `${JSON.stringify(json)}\n`);
  console.log(`${rel}: ${moved} entries moved to a survivor, ${dropped} dropped as already held`);
}
