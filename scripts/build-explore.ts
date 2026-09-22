/**
 * The Explore page's per-kind row files: public/api/v1/explore/<plural>.json, one per kind the view shows, each
 * holding every PowerRow of that kind in the view's default order. The page itself carries only the first
 * EXPLORE_PAGE rows of each kind (src/lib/explore-kinds.ts); the browser fetches a file when the reader scrolls
 * past them, presses "Show more" or sets a filter that needs the whole set. Called from scripts/build-api.ts;
 * exported as a function so the test can write into a temporary directory and compare counts.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { KIND_META, type Kind } from "../src/lib/kinds";
import { EXPLORE_KINDS, exploreFile } from "../src/lib/explore-kinds";
import { exploreSections, type ExploreSections } from "../src/lib/relevance-rows";

export type ExploreFile = { kind: Kind; path: string; file: string; count: number };

/** Write one file per Explore kind under `apiDir` (the public/api/v1 directory) and return what was written. */
export function writeExploreFiles(apiDir: string, sections: ExploreSections = exploreSections()): ExploreFile[] {
  mkdirSync(join(apiDir, "explore"), { recursive: true });
  const out: ExploreFile[] = [];
  for (const kind of EXPLORE_KINDS) {
    const rows = sections.full[kind] ?? [];
    const file = join(apiDir, "explore", `${KIND_META[kind].plural}.json`);
    writeFileSync(file, JSON.stringify(rows));
    out.push({ kind, path: exploreFile(kind), file, count: rows.length });
  }
  return out;
}
