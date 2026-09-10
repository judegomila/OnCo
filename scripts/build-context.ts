/**
 * LLM-ready context files: one clean Markdown document per record at public/api/v1/context/<id>.md
 * (TL;DR, summary, structured fields, sources, neighbours), an index at public/api/v1/context/index.md,
 * and public/llms.txt following the llms.txt convention (https://llmstxt.org). Everything is derived from
 * the same graph the site is built from; nothing is added.
 *
 *   npx tsx scripts/build-context.ts
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { KIND_META, KINDS, routeFor, type Entity } from "../src/lib/schema";
import { NAV_GROUPS } from "../src/lib/nav";
import { paragraphs } from "../src/lib/text";

const SITE = "https://onco.cc";
const g = graph();
const url = (e: { kind: Entity["kind"]; id: string }) => `${SITE}${routeFor(e)}`;
const link = (e: Entity) => `[${e.name}](${url(e)})`;
const names = (ids: string[]) => ids.map((id) => link(g.must(id))).join(", ");

function fields(e: Entity): string[] {
  const out: string[] = [];
  const row = (k: string, v?: string | number | boolean | null) => { if (v !== undefined && v !== null && v !== "" && v !== false) out.push(`- ${k}: ${v}`); };
  const list = (k: string, vs: string[]) => { if (vs.length) out.push(`- ${k}: ${vs.join("; ")}`); };
  row("Kind", KIND_META[e.kind].label);
  row("Status", e.status);
  row("Last checked", e.asOf);
  list("Also known as", e.aka);
  list("Tags", e.tags);
  switch (e.kind) {
    case "cancer": row("Group", e.group); row("Burden", e.burden); list("Subtypes", e.subtypes); list("Biomarkers", e.biomarkers); break;
    case "technology": row("Principle", e.principle); row("Generation", e.generation); row("Since", e.since); list("Strengths", e.strengths); list("Limitations", e.limitations); break;
    case "target": row("Symbol", e.symbol); row("Class", e.targetClass); row("Biology", e.biology); list("Where found", e.whereFound); break;
    case "drug": row("Brand", e.brand); row("Code", e.code); row("Modality", e.modality); row("Mechanism", e.mechanism); row("Payload", e.payload); row("Linker", e.linker); list("Approvals", e.approvals.map((a) => `${a.region} ${a.year}: ${a.indication}`)); if (e.dosing) row("Dosing", `${e.dosing.route}; ${e.dosing.schedule}`); list("Toxicity (grade 3+)", e.toxicity.filter((t) => t.grade3PlusPct !== undefined).map((t) => `${t.event} ${t.grade3PlusPct}%`)); break;
    case "company": row("HQ", e.hq); row("Type", e.companyType); row("Website", e.website); row("Ticker", e.ticker); break;
    case "institution": row("City", `${e.city}, ${e.country}`); row("Type", e.institutionType); row("NCI designation", e.nci); row("Website", e.website); break;
    case "trial": row("Registry id", e.nct); row("Phase", e.phase); row("Setting", e.setting); row("Sponsor", e.sponsor); row("Enrolled", e.enrolled); row("Result", e.result); list("Outcomes", e.outcomes.map((o) => `${o.endpoint}: ${o.arms.map((a) => `${a.name}${a.value !== undefined ? ` ${a.value}${o.unit === "%" ? "%" : o.unit ? ` ${o.unit}` : ""}` : ""}`).join(" vs ")}${o.hr !== undefined ? `, HR ${o.hr}` : ""}`)); row("Replication", e.replication); break;
    case "pairing": row("Pairs", `${g.must(e.a).name} + ${g.must(e.b).name}`); row("Type", e.pairingType); row("Rationale", e.rationale); row("Evidence", e.evidence); break;
    case "idea": row("Hypothesis", e.hypothesis); row("Rationale", e.rationale); row("Proposed test", e.test); row("Maturity", e.maturity); row("Actor", e.actor); break;
    case "paper": row("Journal", e.journal); row("Year", e.year); row("DOI", e.doi); row("Authors", e.authors); list("Findings", e.findings); row("What it means", e.whatItMeans); list("Caveats", e.caveats); break;
    case "person": row("Role", e.role); list("Specialisms", e.specialisms); break;
    case "bottleneck": row("Stage", e.stage); row("Severity", e.severity); list("Metrics", e.metrics.map((m) => `${m.label}: ${m.value}${m.source ? ` (${m.source})` : ""}`)); list("Causes", e.causes); break;
    case "pathway": row("Analogy", e.analogy); list("Interventions", e.interventions); break;
    case "journal": row("Publisher", e.publisher); row("Scope", e.scope); row("Access", e.access); break;
    case "collection": row("URL", e.url); row("Holds", e.holds); row("Licence", e.license); break;
    default: break;
  }
  return out;
}

function contextMd(e: Entity): string {
  const parts: string[] = [`# ${e.name}`, "", `Source: ${url(e)}  `, `OnCo record \`${e.id}\` (${KIND_META[e.kind].label}). Data CC BY-NC 4.0, attribute "Data from OnCo (onco.cc)"; commercial use needs a licence.`, "", "## TL;DR", "", e.tldr, "", "## Summary", "", ...paragraphs(e.summary).flatMap((p) => [p, ""])];
  const f = fields(e);
  if (f.length) parts.push("## Fields", "", ...f, "");
  if (e.kind === "cancer") {
    if (e.standardOfCare.length) parts.push("## Standard of care", "", ...e.standardOfCare.map((s) => `- ${s.setting}: ${s.approach}${s.refs.length ? ` (${names(s.refs)})` : ""}`), "");
    if (e.stateOfArt.length) parts.push("## State of the art", "", ...e.stateOfArt.map((s) => `- ${s}`), "");
    if (e.openProblems.length) parts.push("## Open problems", "", ...e.openProblems.map((s) => `- ${s}`), "");
  }
  if (e.notes.length) parts.push("## Notes", "", ...e.notes.map((n) => `- ${n}`), "");
  const src: string[] = [];
  if (e.wikipedia) src.push(`- Wikipedia: ${e.wikipedia}`);
  for (const l of e.links) src.push(`- ${l.label}: ${l.url}`);
  if (src.length) parts.push("## Sources", "", ...src, "");
  const nb: string[] = [];
  for (const [k, list] of g.neighbours(e.id)) nb.push(`- ${KIND_META[k].plural}: ${list.map(link).join(", ")}`);
  if (nb.length) parts.push("## Connected records", "", ...nb, "");
  parts.push("---", `JSON: ${SITE}/api/v1/entities/${e.id}.json`);
  return parts.join("\n");
}

const dir = join(process.cwd(), "public", "api", "v1", "context");
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });
for (const e of g.entities) writeFileSync(join(dir, `${e.id}.md`), contextMd(e));

const index: string[] = ["# OnCo context files", "", `One Markdown file per record, ${g.entities.length} in total. Each has the TL;DR, technical summary, structured fields, sources and connected records.`, ""];
for (const k of KINDS) {
  const list = g.kind(k);
  if (!list.length) continue;
  index.push(`## ${KIND_META[k].plural[0].toUpperCase()}${KIND_META[k].plural.slice(1)} (${list.length})`, "");
  for (const e of list) index.push(`- [${e.name}](${SITE}/api/v1/context/${e.id}.md): ${e.tldr}`);
  index.push("");
}
writeFileSync(join(dir, "index.md"), index.join("\n"));

// llms.txt: deterministic (no timestamp) so the committed copy only changes when the corpus does.
const llms: string[] = [
  "# OnCo",
  "",
  "> A public, cited knowledge graph of oncology: cancers, technologies, targets, products, companies, institutions, pathways, trials, pairings, roadmaps, ideas, key papers and people, one page per object, with a plain-English TL;DR and a technical summary on every page. Data CC BY-NC 4.0; attribute \"OnCo (onco.cc)\".",
  "",
  `${g.entities.length.toLocaleString("en-GB")} records in ${KINDS.filter((k) => g.kind(k).length).length} kinds: ${KINDS.filter((k) => g.kind(k).length).map((k) => `${g.kind(k).length.toLocaleString("en-GB")} ${KIND_META[k].plural}`).join(", ")}. Every fact is dated and linked to a primary source; where a number is not sourced it is omitted. Not medical advice.`,
  "",
  "## Machine-readable corpus",
  "",
  `- [All records as JSON](${SITE}/api/v1/all.json): every entity with defaults applied plus a backlink map`,
  `- [One record as JSON](${SITE}/api/v1/entities/tnbc.json): /api/v1/entities/<id>.json, with neighbours grouped by kind`,
  `- [Context files index](${SITE}/api/v1/context/index.md): one clean Markdown file per record at /api/v1/context/<id>.md`,
  `- [RDF N-Triples](${SITE}/api/v1/onco.nt): schema.org terms, owl:sameAs to Wikidata`,
  `- [Search documents](${SITE}/api/v1/search.json): compact id, kind, name, TL;DR, route`,
  `- [Concept index](${SITE}/api/v1/embeddings.json): TF-IDF vectors used by the site search (binary at embeddings.bin)`,
  `- [Similar pages](${SITE}/api/v1/similar.json): top 8 similar records per id with the shared links`,
  `- [Metadata](${SITE}/api/v1/meta.json): build date, counts, schema version, licence`,
  "",
  "## Kinds",
  "",
  ...KINDS.filter((k) => g.kind(k).length).map((k) => `- [${KIND_META[k].plural[0].toUpperCase()}${KIND_META[k].plural.slice(1)}](${SITE}/${KIND_META[k].route}/): ${KIND_META[k].blurb} JSON at /api/v1/${KIND_META[k].plural}.json`),
  "",
];
for (const grp of NAV_GROUPS) {
  llms.push(`## ${grp.label}`, "", ...grp.items.filter((it) => !it.href.startsWith("http")).map((it) => `- [${it.label}](${SITE}${it.href}): ${it.blurb}`), "");
}
llms.push("## Optional", "", `- [About and methodology](${SITE}/about/): rules for facts, ranking formulas, licence`, `- [Open API](${SITE}/api/): the corpus as JSON`, `- [Corrections](${SITE}/corrections/): every factual correction and how it was found`, `- [GitHub](https://github.com/judegomila/OnCo): edit any record with a pull request`, "");
writeFileSync(join(process.cwd(), "public", "llms.txt"), llms.join("\n"));

console.log(`context: ${g.entities.length} Markdown files, index.md and llms.txt written`);
