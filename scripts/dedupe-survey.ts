/**
 * Survey: every pair or group of records that are the same thing under two ids.
 *
 * Three passes, the ones the TNBC, colorectal and lung reviews each ran by hand on their own spike:
 *   1. papers sharing a DOI or a PubMed id (the same publication written twice);
 *   2. trials sharing a registry id (the same study written twice);
 *   3. near-duplicate names within a kind (the same thing where neither record carries an identifier).
 *
 * For each group it prints where each record is defined, how much each carries (see `richness`) and how many other
 * records point at it, which is what the merge decision needs. Read-only. See docs/DUPLICATE-RECORDS.md.
 *
 *   npx tsx scripts/dedupe-survey.ts            every pass
 *   npx tsx scripts/dedupe-survey.ts --names    the name pass only
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { graph } from "@/lib/graph";
import { dataFiles, definitionsOf, normaliseDoi, richness } from "./lib/duplicate-records";

const g = graph();
const files = dataFiles();
const only = process.argv.slice(2);
const want = (pass: string) => only.length === 0 || only.includes(`--${pass}`);

function describe(id: string): string {
  const e = g.must(id) as any;
  const defs = definitionsOf(id, files);
  const where = defs.length ? defs.map((d) => `${d.file}:${d.line}`).join(" + ") : "no literal found";
  const back = [...g.incoming(id).values()].reduce((n, l) => n + l.length, 0);
  return `    ${id}\n      richness ${richness(e)}, ${back} backlinks, ${where}`;
}

function report(title: string, groups: Map<string, string[]>): number {
  const dups = [...groups.entries()].filter(([, ids]) => ids.length > 1);
  console.log(`\n== ${title}: ${dups.length} groups ==`);
  for (const [key, ids] of dups) {
    console.log(`  ${key}`);
    for (const id of ids) console.log(describe(id));
  }
  return dups.length;
}

function groupBy(entities: any[], key: (e: any) => string | undefined): Map<string, string[]> {
  const m = new Map<string, string[]>();
  for (const e of entities) {
    const k = key(e);
    if (!k) continue;
    m.set(k, [...(m.get(k) ?? []), e.id]);
  }
  return m;
}

const papers = g.kind("paper") as any[];
let total = 0;
if (want("doi")) total += report("papers sharing a DOI", groupBy(papers, (p) => (p.doi ? normaliseDoi(p.doi) : undefined)));
if (want("pmid")) total += report("papers sharing a PubMed id", groupBy(papers, (p) => (p.pmid ? p.pmid.trim() : undefined)));
if (want("nct")) total += report("trials sharing a registry id", groupBy(g.kind("trial") as any[], (t) => (t.nct ? t.nct.trim().toUpperCase() : undefined)));

if (want("names")) {
  const slug = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "");
  total += report("near-duplicate names within a kind", groupBy(g.entities as any[], (e) => `${e.kind}|${slug(e.name)}`));
}

console.log(`\n${total} groups. papers ${papers.length} (${papers.filter((p) => p.doi).length} with a DOI, ${papers.filter((p) => p.pmid).length} with a PubMed id), trials ${g.kind("trial").length}, entities ${g.entities.length}.`);
