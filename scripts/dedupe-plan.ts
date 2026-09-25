/* eslint-disable @typescript-eslint/no-explicit-any */
/** Temporary: proposes a survivor for each duplicate group, as a TSV plan for scripts/merge-records.ts. */
import { graph } from "@/lib/graph";
import { dataFiles, definitionsOf, normaliseDoi, richness } from "./lib/duplicate-records";

const g = graph();
const files = dataFiles();

/** Files a fetcher wrote: their headers say "Nothing here has been read by an editor" or "Do not edit by hand". */
const INGEST: Array<[RegExp, string]> = [
  [/papers-cited-wave7/, "scripts/fetch-cited-papers.ts"],
  [/papers-trials-wave1/, "scripts/fetch-trial-papers.ts"],
  [/papers-people-wave6/, "scripts/fetch-people-papers.ts"],
  [/papers-ideas-wave6/, "scripts/fetch-idea-evidence.ts"],
  [/pipeline-trials/, "a ClinicalTrials.gov ingest wave"],
];

type Rec = { id: string; file: string; ingest?: string; rich: number; back: number };
function rec(id: string): Rec {
  const defs = definitionsOf(id, files);
  const file = defs.map((d) => d.file).join("+") || "(indirect)";
  return { id, file, ingest: INGEST.find(([re]) => re.test(file))?.[1], rich: richness(g.must(id) as any), back: [...g.incoming(id).values()].reduce((n, l) => n + l.length, 0) };
}

const byKey = new Map<string, string[]>();
for (const p of g.kind("paper") as any[]) {
  const k = p.doi ? `DOI ${normaliseDoi(p.doi)}` : p.pmid ? `PubMed id ${p.pmid}` : undefined;
  if (k) byKey.set(k, [...(byKey.get(k) ?? []), p.id]);
}

for (const [key, ids] of byKey) {
  if (ids.length < 2) continue;
  const recs = ids.map(rec);
  const ranked = [...recs].sort((a, b) => Number(!!a.ingest) - Number(!!b.ingest) || b.rich - a.rich || b.back - a.back || a.id.localeCompare(b.id));
  const keep = ranked[0];
  for (const drop of ranked.slice(1)) {
    const reason = drop.ingest
      ? `The same paper: ${key}. ${drop.id} was written by ${drop.ingest} with no editor's reading; ${keep.id} is the curated record.`
      : `The same paper: ${key}. Both records were written by hand; ${keep.id} is the fuller one (${keep.rich} against ${drop.rich} on the survey's measure, ${keep.back} ${keep.back === 1 ? "backlink" : "backlinks"} against ${drop.back}).`;
    console.log([keep.id, drop.id, reason].join("\t"));
  }
}
