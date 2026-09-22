/**
 * The idea rankings' per-view row files: public/api/v1/ideas/rankings/<view>.json, one per view of /ideas/rankings/,
 * each holding every row the view can rank in the page's order. The page itself carries only the first RANK_PAGE
 * rows of each view (src/lib/idea-rankings-views.ts); the browser fetches a file when the reader scrolls past them
 * or presses "Show more". Most wanted is an empty list until public/votes.json carries a thumbs-up. Called from
 * scripts/build-api.ts; exported as a function so the test can write into a temporary directory and compare counts.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { rankAll, type RankedView } from "../src/lib/idea-rankings";
import { rankingsFile, type ViewId } from "../src/lib/idea-rankings-views";

export type RankingsFile = { view: ViewId; path: string; file: string; count: number };

/** Write one file per view under `apiDir` (the public/api/v1 directory) and return what was written. */
export function writeIdeaRankingFiles(apiDir: string, views: RankedView[] = rankAll(Infinity)): RankingsFile[] {
  mkdirSync(join(apiDir, "ideas", "rankings"), { recursive: true });
  return views.map((v) => {
    const file = join(apiDir, "ideas", "rankings", `${v.view.id}.json`);
    writeFileSync(file, JSON.stringify(v.rows));
    return { view: v.view.id, path: rankingsFile(v.view.id), file, count: v.rows.length };
  });
}
