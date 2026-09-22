/**
 * Fill `hgnc`, `ensembl`, `uniprot` and `entrez` on target records that name a single gene, from budget-free public
 * registries. Complements scripts/fetch-xrefs.ts, which writes the per-gene "Elsewhere" strip data to a separate
 * generated file: these four ids live on the record itself, so they travel with the entity JSON, the JSON-LD
 * sameAs and the RDF triples.
 *
 *   HGNC     https://rest.genenames.org/fetch/symbol/<SYMBOL>            approved symbol, hgnc_id, ensembl_gene_id,
 *                                                                        entrez_id, uniprot_ids
 *            .../fetch/alias_symbol/<SYMBOL>, .../fetch/prev_symbol/<SYMBOL>   only when the symbol lookup is empty
 *   UniProt  https://rest.uniprot.org/uniprotkb/search?query=gene_exact:<SYMBOL>+AND+organism_id:9606+AND+reviewed:true
 *                                                                        only when HGNC lists no UniProt accession
 *
 * Rules. One lookup per target, PACE_MS apart, at most BUDGET requests in total (alias, previous-symbol and UniProt
 * fallbacks and the single retry on 5xx all count). A record is accepted only on an exact match: the HGNC approved
 * symbol equals ours, or ours appears in that record's alias or previous symbols (then the approved symbol is added
 * to `aka` as well). Anything else is a mismatch and is skipped. Symbols that are not one gene (AKT1/2/3;
 * BRCA1, BRCA2; EWSR1::FLI1; GD2 (B4GALNT1 product)) are counted as non-gene and never looked up; HGNC returning
 * nothing for a single token (BCR-ABL1) counts the same way. Targets that already carry `hgnc` are not tried again.
 *
 * Values are inserted into the source file right after the record's `symbol` field. Decisions go to --out
 * (default /tmp/enrich-target-ids.json). Usage:
 *   npx tsx scripts/enrich-target-ids.ts [--dry-run] [--budget=400] [--out=/tmp/enrich-target-ids.json]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ALL_INPUTS } from "../src/data";
import type { TargetInput } from "../src/lib/schema";

const ROOT = join(__dirname, "..");
const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const num = (flag: string, d: number) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? Number(a.split("=")[1]) : d; };
const str = (flag: string, d: string) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? a.slice(flag.length + 3) : d; };
const BUDGET = num("budget", 400);
const OUT = str("out", "/tmp/enrich-target-ids.json");
const PACE_MS = 300;
const UA = "OnCo corpus enrichment (https://onco.world; contact via site)";

/** Every source file that holds target records. Kept explicit so a stray `symbol:` elsewhere (isotopes) is never touched. */
const FILES = [
  "src/data/targets.ts",
  "src/data/targets-wave1.ts",
  "src/data/targets-wave-soc.ts",
  "src/data/gap-fill.ts",
  "src/data/spikes/aml.ts",
  "src/data/spikes/hodgkin-lymphoma.ts",
  "src/data/spikes/melanoma.ts",
  "src/data/spikes/neuroblastoma.ts",
  "src/data/spikes/nsclc.ts",
  "src/data/spikes/prostate.ts",
];

/** A single HGNC-style token: letters, digits, hyphen, no separators, no parenthetical. */
const SINGLE_GENE = /^[A-Z][A-Z0-9-]{1,12}$/;

type HgncDoc = { hgnc_id: string; symbol: string; ensembl_gene_id?: string; entrez_id?: string; uniprot_ids?: string[]; alias_symbol?: string[]; prev_symbol?: string[] };
type Ids = { hgnc: string; ensembl?: string; uniprot?: string; entrez?: string };
type Decision = { id: string; symbol: string; status: "added" | "already" | "non-gene" | "mismatch" | "error" | "budget"; ids?: Ids; approved?: string; note?: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
let requests = 0;

/** One GET with a single retry on 5xx; 404 and other 4xx are returned as-is so callers can treat them as empty. */
async function getJson<T>(url: string): Promise<T | null> {
  for (let attempt = 0; attempt < 2; attempt++) {
    if (requests >= BUDGET) throw new Error("budget");
    requests++;
    await sleep(PACE_MS);
    const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (r.status >= 500) { if (attempt === 0) continue; throw new Error(`HTTP ${r.status}`); }
    if (r.status === 404) return null;
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return (await r.json()) as T;
  }
  return null;
}

type HgncResponse = { response: { docs: HgncDoc[] } };
const hgncFetch = async (field: string, symbol: string) => (await getJson<HgncResponse>(`https://rest.genenames.org/fetch/${field}/${encodeURIComponent(symbol)}`))?.response.docs ?? [];

/** Exact-match resolution: approved symbol first, then alias and previous symbols. Returns the doc and whether we matched an alias. */
async function resolve(symbol: string): Promise<{ doc: HgncDoc; viaAlias: boolean } | { mismatch: string } | null> {
  const direct = await hgncFetch("symbol", symbol);
  if (direct.length) {
    const doc = direct.find((d) => d.symbol === symbol);
    return doc ? { doc, viaAlias: false } : { mismatch: direct.map((d) => d.symbol).join(", ") };
  }
  for (const field of ["alias_symbol", "prev_symbol"] as const) {
    const docs = await hgncFetch(field, symbol);
    if (!docs.length) continue;
    const hits = docs.filter((d) => (d[field] ?? []).includes(symbol));
    if (hits.length === 1) return { doc: hits[0], viaAlias: true };
    return { mismatch: `${field}: ${docs.map((d) => d.symbol).join(", ")}` };
  }
  return null;
}

async function uniprotFallback(symbol: string): Promise<string | undefined> {
  const q = `gene_exact:${symbol}+AND+organism_id:9606+AND+reviewed:true`;
  const j = await getJson<{ results: Array<{ primaryAccession: string }> }>(`https://rest.uniprot.org/uniprotkb/search?query=${q}&fields=accession&format=json`);
  const acc = (j?.results ?? []).map((r) => r.primaryAccession);
  return acc.length === 1 ? acc[0] : undefined;
}

/** Insert the id fields (and, for alias matches, the approved symbol into `aka`) right after `symbol: "<S>"` of the record with this id. */
function insert(src: string, t: TargetInput, ids: Ids, approved?: string): string | null {
  const idAt = src.search(new RegExp(`(?<![A-Za-z])id: "${t.id}",`));
  if (idAt < 0) return null;
  const nextId = src.slice(idAt + 1).search(/(?<![A-Za-z])id: "/);
  const end = nextId < 0 ? src.length : idAt + 1 + nextId;
  const block = src.slice(idAt, end);
  const symbolRe = new RegExp(`symbol: "${t.symbol!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",`);
  const m = block.match(symbolRe);
  if (!m || m.index === undefined) return null;
  const fields = (["hgnc", "ensembl", "uniprot", "entrez"] as const).filter((k) => ids[k]).map((k) => `${k}: "${ids[k]}"`).join(", ");
  let out = block.slice(0, m.index + m[0].length) + ` ${fields},` + block.slice(m.index + m[0].length);
  if (approved && !(t.aka ?? []).includes(approved)) {
    const akaAt = out.search(/(?<![A-Za-z])aka: \[/);
    out = akaAt >= 0
      ? out.slice(0, akaAt + "aka: [".length) + `"${approved}", ` + out.slice(akaAt + "aka: [".length)
      : out.replace(` ${fields},`, ` ${fields}, aka: ["${approved}"],`);
  }
  return src.slice(0, idAt) + out + src.slice(end);
}

async function main() {
  const targets = ALL_INPUTS.filter((e): e is TargetInput => e.kind === "target");
  const sources = new Map(FILES.map((f) => [f, readFileSync(join(ROOT, f), "utf8")] as const));
  const fileOf = (t: TargetInput) => FILES.find((f) => new RegExp(`(?<![A-Za-z])id: "${t.id}",`).test(sources.get(f)!));
  const decisions: Decision[] = [];
  let stopped = false;

  for (const t of targets) {
    const symbol = t.symbol ?? "";
    if (t.hgnc) { decisions.push({ id: t.id, symbol, status: "already", ids: { hgnc: t.hgnc, ensembl: t.ensembl, uniprot: t.uniprot, entrez: t.entrez } }); continue; }
    if (!SINGLE_GENE.test(symbol)) { decisions.push({ id: t.id, symbol, status: "non-gene", note: "composite or non-gene symbol" }); continue; }
    if (stopped) { decisions.push({ id: t.id, symbol, status: "budget" }); continue; }
    try {
      const r = await resolve(symbol);
      if (!r) { decisions.push({ id: t.id, symbol, status: "non-gene", note: "no HGNC record" }); console.log(`${t.id}: ${symbol} → no HGNC record`); continue; }
      if ("mismatch" in r) { decisions.push({ id: t.id, symbol, status: "mismatch", note: r.mismatch }); console.log(`${t.id}: ${symbol} → mismatch (${r.mismatch})`); continue; }
      const { doc, viaAlias } = r;
      let uniprot = doc.uniprot_ids?.[0];
      let note: string | undefined;
      if (!uniprot) { uniprot = await uniprotFallback(doc.symbol); note = uniprot ? "uniprot via UniProt REST" : "no reviewed UniProt entry"; }
      const ids: Ids = { hgnc: doc.hgnc_id, ensembl: doc.ensembl_gene_id, uniprot, entrez: doc.entrez_id };
      const file = fileOf(t);
      if (!file) { decisions.push({ id: t.id, symbol, status: "error", note: "record not found in FILES" }); continue; }
      const next = insert(sources.get(file)!, t, ids, viaAlias ? doc.symbol : undefined);
      if (!next) { decisions.push({ id: t.id, symbol, status: "error", note: `could not place fields in ${file}` }); continue; }
      sources.set(file, next);
      decisions.push({ id: t.id, symbol, status: "added", ids, approved: viaAlias ? doc.symbol : undefined, note });
      console.log(`${t.id}: ${symbol} → ${doc.hgnc_id} ${ids.ensembl ?? "-"} ${ids.uniprot ?? "-"} ${ids.entrez ?? "-"}${viaAlias ? ` (alias of ${doc.symbol})` : ""}`);
    } catch (e) {
      const msg = (e as Error).message;
      if (msg === "budget") { stopped = true; decisions.push({ id: t.id, symbol, status: "budget" }); continue; }
      decisions.push({ id: t.id, symbol, status: "error", note: msg });
      console.warn(`${t.id}: ${symbol} → error ${msg}`);
    }
  }

  if (!DRY) for (const [f, text] of sources) writeFileSync(join(ROOT, f), text);
  writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), requests, decisions }, null, 2));

  const count = (s: Decision["status"]) => decisions.filter((d) => d.status === s).length;
  console.log(`\n${DRY ? "[dry run] " : ""}targets ${targets.length}: filled ${count("added")}, already had ids ${count("already")}, non-gene ${count("non-gene")}, mismatches skipped ${count("mismatch")}, errors ${count("error")}, over budget ${count("budget")}; ${requests} requests; decisions → ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
