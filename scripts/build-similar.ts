/**
 * Writes public/api/v1/similar.json: for every record, up to eight similar records that are not directly
 * linked, with the shared links and tags that explain each match (see src/lib/similar.ts).
 *
 *   npx tsx scripts/build-similar.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { similarAll, TOP_N } from "../src/lib/similar";

const out = join(process.cwd(), "public", "api", "v1");
mkdirSync(out, { recursive: true });
const all = similarAll();
const json: Record<string, Array<{ id: string; score: number; shared: string[]; sharedTags: string[] }>> = {};
let pairs = 0;
for (const [id, list] of all) { if (list.length) { json[id] = list; pairs += list.length; } }
writeFileSync(join(out, "similar.json"), JSON.stringify({ method: `Weighted Jaccard of neighbour sets (1/log2(2+degree) per shared neighbour) plus half the Jaccard of tag sets; direct neighbours excluded; top ${TOP_N}.`, similar: json }));
console.log(`similar: ${Object.keys(json).length} records with matches, ${pairs} pairs`);
