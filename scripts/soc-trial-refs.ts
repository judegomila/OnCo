/**
 * Link cancer standard-of-care rows to the trials their text names by acronym (content wave 3, docs/CONTENT-ROADMAP.md).
 *
 * For every trial tagged `soc-trials` (src/data/trials-soc-wave.ts), find each cancer's standardOfCare rows whose
 * `approach` names the trial's `name` or one of its `aka` strings as a whole token (case-sensitive, so "FoRT" does not
 * match "fort" and "CLL12" does not match "CLL12-like"), and append the trial id to that row's `refs` through the editor
 * in scripts/orphan-links.ts (append only; the row must live in the cancer's base record literal, otherwise it is
 * reported as skipped). Nothing is invented: the row already cites the trial in prose; this makes the citation a link.
 *
 *   npx tsx scripts/soc-trial-refs.ts            plan only: print every edit and every skip
 *   npx tsx scripts/soc-trial-refs.ts --apply    write the edits
 */
import { graph } from "../src/lib/graph";
import { applyEdits } from "./orphan-links";

type Edit = Parameters<typeof applyEdits>[0][number];

const g = graph();
const write = process.argv.includes("--apply");
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const edits: Edit[] = [];

for (const t of g.kind("trial")) {
  if (!t.tags.includes("soc-trials")) continue;
  const tokens = [t.name, ...t.aka].filter((s) => s.length >= 4);
  const res = tokens.map((s) => new RegExp(`(?<![A-Za-z0-9])${escape(s)}(?![A-Za-z0-9])`));
  for (const c of g.kind("cancer")) {
    for (const row of c.standardOfCare) {
      if (row.refs.includes(t.id)) continue;
      const hit = res.findIndex((re) => re.test(row.approach));
      if (hit < 0) continue;
      edits.push({ targetId: c.id, targetKind: "cancer", targetName: c.name, field: "standardOfCare.refs", soc: { setting: row.setting, approach: row.approach }, add: t.id, why: `standard-of-care text names "${tokens[hit]}"` });
    }
  }
}

const { changed, skipped } = applyEdits(edits, write);
for (const c of changed) console.log((write ? "EDIT  " : "PLAN  ") + c);
for (const s of skipped) console.log("SKIP  " + s);
console.log(`\n${edits.length} edits planned, ${changed.length} ${write ? "applied" : "applicable"}, ${skipped.length} skipped`);
