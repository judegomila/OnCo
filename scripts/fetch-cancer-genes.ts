/**
 * The cancer genome as target records: every gene the open catalogues tie to cancer that has no OnCo target page yet,
 * written to src/data/targets-genes-wave.ts with its identifiers, roles, evidence tier, cancers and corpus links.
 *
 * Sources (all public, all cached under --cache, one request at a time, PACE_MS apart, one User-Agent):
 *   CIViC          https://civicdb.org/api/graphql  browseFeatures(featureType: GENE): genes with clinical evidence
 *                  items, assertions, diseases and therapies. CC0.
 *   Open Targets   https://api.platform.opentargets.org/api/v4/graphql  targets associated with cancer (MONDO_0004992,
 *                  direct and indirect evidence) at or above --ot-min, and with each corpus cancer mapped to an EFO or
 *                  MONDO id at or above --ot-cancer-min; datatype scores tell drugs (clinical) from mutation cohorts.
 *                  CC0 (platform-docs.opentargets.org/licence).
 *   IntOGen        https://www.intogen.org/download  Compendium_Cancer_Genes.tsv, release 2024-09-20 (drivers called
 *                  by cohort analysis, with Act or LoF role per cohort) and cohorts.tsv (cancer type names). The
 *                  release ships LICENSE.txt: CC0 1.0. Older IntOGen archives are CC BY-NC and are not used.
 *   HGNC           hgnc_complete_set.txt (approved symbol, name, aliases, previous symbols, Ensembl, Entrez, UniProt).
 *   UniProt        https://rest.uniprot.org/uniprotkb/search  protein name, function text, keywords, locations,
 *                  disease notes, 100 accessions a request. CC BY 4.0.
 * Not used: OncoKB, COSMIC or any other licensed list.
 *
 * Rules. A gene already covered by a target record (its `hgnc`, `symbol` or `aka`, or a gene in target-xrefs.ts) is
 * skipped. Each record states where every field came from in `sources`. Cancers are linked only where a source ties
 * the gene to a corpus cancer through the id map below; disease names that map to nothing are kept in the record's
 * notes and in the report, never guessed. Corpus links are exact-token matches of the approved symbol (or an
 * unambiguous alias) in drug mechanisms, trial titles and TL;DRs and pathway node labels. Function text is UniProt's,
 * condensed and put into UK spelling; nothing is added to it.
 *
 * Usage:
 *   npx tsx scripts/fetch-cancer-genes.ts [--apply] [--max=N] [--ot-min=0.5] [--ot-cancer-min=0.5]
 *                                         [--cache=/tmp/cancer-genes] [--report=/tmp/cancer-genes/report.json]
 * Without --apply the file is written to --cache/targets-genes-wave.preview.ts instead of src/data.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ALL_INPUTS } from "../src/data";
import { targetXrefs } from "../src/data/target-xrefs";
import type { CancerInput, DrugInput, EvidenceTier, PathwayInput, TargetInput, TargetRole, TrialInput } from "../src/lib/schema";

const ROOT = join(__dirname, "..");
const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const num = (flag: string, d: number) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? Number(a.split("=")[1]) : d; };
const str = (flag: string, d: string) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? a.slice(flag.length + 3) : d; };
const MAX = num("max", Infinity);
const OT_MIN = num("ot-min", 0.5);
const OT_CANCER_MIN = num("ot-cancer-min", 0.5);
const CACHE = str("cache", "/tmp/cancer-genes");
const REPORT = str("report", join(CACHE, "report.json"));
const PACE_MS = 300;
const UA = "OnCo corpus (https://onco.cc; scripts/fetch-cancer-genes.ts)";
const TODAY = new Date().toISOString().slice(0, 10);
const INTOGEN_RELEASE = "20240920";
const INTOGEN_DIR = "2024-06-18_IntOGen-Drivers";
const INTOGEN_COHORT_DIR = "2024-06-18_IntOGen-Cohorts";
const OT_API = "https://api.platform.opentargets.org/api/v4/graphql";
const CIVIC_API = "https://civicdb.org/api/graphql";
const CANCER_ROOT = "MONDO_0004992";
const MAX_CANCERS_PER_GENE = 8;
const MAX_TRIALS_PER_GENE = 12;

mkdirSync(CACHE, { recursive: true });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
let requests = 0;
const requestLog: Record<string, number> = {};

async function http(url: string, init?: RequestInit): Promise<Response> {
  const host = new URL(url).host;
  for (let attempt = 0; attempt < 3; attempt++) {
    requests++; requestLog[host] = (requestLog[host] ?? 0) + 1;
    await sleep(PACE_MS * (attempt + 1));
    const r = await fetch(url, { ...init, headers: { "User-Agent": UA, Accept: "application/json", ...(init?.headers ?? {}) } });
    if (r.status >= 500 || r.status === 429) { if (attempt < 2) continue; throw new Error(`HTTP ${r.status} ${url}`); }
    if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
    return r;
  }
  throw new Error(`unreachable ${url}`);
}
async function gql<T>(api: string, query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const r = await http(api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query, variables }) });
  const j = (await r.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (j.errors?.length) throw new Error(`${api}: ${j.errors.map((e) => e.message).join("; ")}`);
  return j.data as T;
}
function cached<T>(file: string, load: () => Promise<T>): Promise<T> {
  const p = join(CACHE, file);
  if (existsSync(p)) return Promise.resolve(JSON.parse(readFileSync(p, "utf8")) as T);
  return load().then((v) => { writeFileSync(p, JSON.stringify(v)); return v; });
}

// ---------------------------------------------------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------------------------------------------------
const norm = (s: string) => s.toLowerCase().replace(/\([^)]*\)/g, " ")
  .replace(/tumour/g, "tumor").replace(/leukaemia/g, "leukemia").replace(/haem/g, "hem").replace(/oesophag/g, "esophag").replace(/paediatric/g, "pediatric")
  .replace(/ & /g, " and ").replace(/non-small-cell/g, "non-small cell").replace(/small-cell/g, "small cell").replace(/b-cell/g, "b cell").replace(/t-cell/g, "t cell")
  .replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const kebab = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const IZE_KEEP = new Set(["size", "sizes", "sized", "prize", "prizes", "seize", "seized", "seizes", "capsize", "capsized"]);
/** UniProt writes US English; the corpus is UK English. Word-level swaps only, no meaning changes. */
export function ukSpelling(s: string): string {
  return s
    .replace(/\b([Tt])umor(s?)\b/g, "$1umour$2").replace(/\b([Ll])eukemi/g, "$1eukaemi").replace(/\b([Hh])emat/g, "$1aemat").replace(/\b([Hh])emo/g, "$1aemo")
    .replace(/\b([Ss])ignaling\b/g, "$1ignalling").replace(/\b([Ss])ignaled\b/g, "$1ignalled").replace(/\b([Pp])ediatric/g, "$1aediatric").replace(/\b([Aa])nemi/g, "$1naemi")
    .replace(/\b([Ee])(sophag|dema|strogen)/g, (_m, e: string, rest: string) => `${e === "E" ? "Oe" : "oe"}${rest}`).replace(/\b([Cc])olor(s?|ed|ing)\b/g, "$1olour$2")
    .replace(/\b([Bb])ehavior/g, "$1ehaviour").replace(/\b([Ff])iber(s?)\b/g, "$1ibre$2").replace(/\b([Cc])enter(s?|ed)\b/g, "$1entre$2").replace(/\b([Cc])atalyz/g, "$1atalys").replace(/\b([Hh])ydrolyz/g, "$1ydrolys").replace(/\b([Aa])nalyz/g, "$1nalys")
    .replace(/\b([A-Za-z]{3,})iz(ation|ations|e|es|ed|ing)\b/g, (m, stem: string, tail: string) => (IZE_KEEP.has(m.toLowerCase()) ? m : `${stem}is${tail}`))
    // House style has no em or en dashes: a dash joining two words ("BCR-ABL1–like") becomes a hyphen, any other one a comma.
    .replace(/(\w)[–—](\w)/g, "$1-$2").replace(/\s*[—–]\s*/g, ", ");
}
/** UniProt function text without its citation brackets and inference tags, split into sentences. */
function uniprotSentences(texts: string[]): string[] {
  const out: string[] = [];
  for (const t of texts) {
    const clean = t.replace(/\s*\((?:PubMed:[^)]*|By similarity|Probable|Ref\.[^)]*|UniProtKB:[^)]*)\)/g, "").replace(/\s+/g, " ").trim();
    for (const s of clean.split(/(?<=\.)\s+(?=[A-Z(])/)) { const x = s.trim(); if (x && !x.startsWith("(Microbial infection)") && !x.startsWith("(Isoform")) out.push(x.endsWith(".") ? x : `${x}.`); }
  }
  return out;
}
const joinList = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

// ---------------------------------------------------------------------------------------------------------------------
// HGNC
// ---------------------------------------------------------------------------------------------------------------------
type Hgnc = { symbol: string; name: string; hgnc: string; ensembl?: string; entrez?: string; uniprot?: string; aliases: string[]; prev: string[]; locus?: string; locusGroup: string; omim?: string; cosmic?: string };
async function loadHgnc(): Promise<{ bySymbol: Map<string, Hgnc>; byAlias: Map<string, Hgnc[]>; byEnsembl: Map<string, Hgnc>; byHgnc: Map<string, Hgnc> }> {
  const p = join(CACHE, "hgnc_complete_set.txt");
  if (!existsSync(p)) { const r = await http("https://storage.googleapis.com/public-download-files/hgnc/tsv/tsv/hgnc_complete_set.txt", { headers: { Accept: "text/plain" } }); writeFileSync(p, await r.text()); }
  const lines = readFileSync(p, "utf8").split("\n").filter(Boolean);
  const head = lines[0].split("\t");
  const col = (name: string) => head.indexOf(name);
  const c = { hgnc: col("hgnc_id"), symbol: col("symbol"), name: col("name"), group: col("locus_group"), location: col("location"), alias: col("alias_symbol"), prev: col("prev_symbol"), entrez: col("entrez_id"), ensembl: col("ensembl_gene_id"), uniprot: col("uniprot_ids"), omim: col("omim_id"), cosmic: col("cosmic") };
  const bySymbol = new Map<string, Hgnc>(); const byAlias = new Map<string, Hgnc[]>(); const byEnsembl = new Map<string, Hgnc>(); const byHgnc = new Map<string, Hgnc>();
  for (const line of lines.slice(1)) {
    const f = line.split("\t");
    const split = (v: string) => (v ? v.replace(/^"|"$/g, "").split("|").map((x) => x.trim()).filter(Boolean) : []);
    const row: Hgnc = { symbol: f[c.symbol], name: f[c.name], hgnc: f[c.hgnc], ensembl: f[c.ensembl] || undefined, entrez: f[c.entrez] || undefined, uniprot: split(f[c.uniprot])[0], aliases: split(f[c.alias]), prev: split(f[c.prev]), locus: f[c.location] || undefined, locusGroup: f[c.group], omim: c.omim >= 0 ? split(f[c.omim])[0] : undefined, cosmic: c.cosmic >= 0 ? f[c.cosmic] || undefined : undefined };
    bySymbol.set(row.symbol, row); byHgnc.set(row.hgnc, row);
    if (row.ensembl) byEnsembl.set(row.ensembl, row);
    for (const a of [...row.aliases, ...row.prev]) byAlias.set(a, [...(byAlias.get(a) ?? []), row]);
  }
  return { bySymbol, byAlias, byEnsembl, byHgnc };
}

// ---------------------------------------------------------------------------------------------------------------------
// CIViC
// ---------------------------------------------------------------------------------------------------------------------
type CivicGene = { id: number; name: string; fullName?: string; featureAliases: string[]; evidenceItemCount: number; assertionCount: number; variantCount: number; molecularProfileCount: number; diseases: Array<{ name: string; doid?: string | null }>; therapies: Array<{ name: string }>; link: string; flagged: boolean; deprecated: boolean };
type CivicPage = { browseFeatures: { totalCount: number; pageInfo: { hasNextPage: boolean; endCursor: string }; edges: Array<{ node: CivicGene }> } };
const loadCivic = () => cached<{ fetched: string; total: number; genes: CivicGene[] }>("civic-genes.json", async () => {
  const genes: CivicGene[] = []; let after: string | null = null; let total = 0;
  for (;;) {
    const d: CivicPage = await gql<CivicPage>(CIVIC_API, `query($after: String) { browseFeatures(featureType: GENE, first: 100, after: $after) { totalCount pageInfo { hasNextPage endCursor } edges { node { id name fullName featureAliases evidenceItemCount assertionCount variantCount molecularProfileCount diseases { name doid } therapies { name } link flagged deprecated } } } }`, { after });
    total = d.browseFeatures.totalCount; genes.push(...d.browseFeatures.edges.map((e) => e.node));
    if (!d.browseFeatures.pageInfo.hasNextPage) break;
    after = d.browseFeatures.pageInfo.endCursor;
  }
  return { fetched: TODAY, total, genes };
});

// ---------------------------------------------------------------------------------------------------------------------
// IntOGen
// ---------------------------------------------------------------------------------------------------------------------
type IntogenRow = { symbol: string; cohort: string; cancerType: string; role: "Act" | "LoF" | "ambiguous"; samples: number; pct: number; qvalue: number };
async function loadIntogen(): Promise<{ rows: IntogenRow[]; cancerNames: Record<string, string>; licence: string }> {
  const zips: Array<[string, string]> = [[`IntOGen-Drivers-${INTOGEN_RELEASE}.zip`, "intogen-drivers"], [`IntOGen-Cohorts-${INTOGEN_RELEASE}.zip`, "intogen-cohorts"]];
  for (const [zip, dir] of zips) {
    const p = join(CACHE, zip);
    if (!existsSync(p)) { const r = await http(`https://www.intogen.org/download?file=${zip}`, { headers: { Accept: "application/zip" } }); writeFileSync(p, Buffer.from(await r.arrayBuffer())); }
    if (!existsSync(join(CACHE, dir))) execFileSync("unzip", ["-o", "-q", p, "-d", join(CACHE, dir)]);
  }
  const licence = readFileSync(join(CACHE, "intogen-drivers", INTOGEN_DIR, "LICENSE.txt"), "utf8").split("\n").slice(0, 3).join(" ").replace(/﻿/g, "").trim();
  if (!/CC0 1\.0/.test(licence)) throw new Error(`IntOGen LICENSE.txt is not CC0: ${licence.slice(0, 80)}`);
  const tsv = (p: string) => { const lines = readFileSync(p, "utf8").split("\n").filter(Boolean); const head = lines[0].split("\t"); return lines.slice(1).map((l) => { const f = l.split("\t"); return Object.fromEntries(head.map((h, i) => [h, f[i] ?? ""])); }); };
  const rows: IntogenRow[] = tsv(join(CACHE, "intogen-drivers", INTOGEN_DIR, "Compendium_Cancer_Genes.tsv")).map((r) => ({ symbol: r.SYMBOL, cohort: r.COHORT, cancerType: r.CANCER_TYPE, role: (r.ROLE as IntogenRow["role"]) || "ambiguous", samples: Number(r.SAMPLES), pct: Number(r["%_SAMPLES_COHORT"]), qvalue: Number(r.QVALUE_COMBINATION) }));
  const cancerNames: Record<string, string> = {};
  for (const r of tsv(join(CACHE, "intogen-cohorts", INTOGEN_COHORT_DIR, "cohorts.tsv"))) cancerNames[r.CANCER] = r.CANCER_NAME;
  return { rows, cancerNames, licence };
}

// ---------------------------------------------------------------------------------------------------------------------
// Open Targets
// ---------------------------------------------------------------------------------------------------------------------
type OtRow = { score: number; target: { id: string; approvedSymbol: string; approvedName: string }; datatypeScores: Array<{ id: string; score: number }> };
type OtAssoc = { disease: { id: string; name: string; associatedTargets: { count: number; rows: OtRow[] } } | null };
async function otAssociations(efoId: string, min: number, maxPages: number): Promise<{ name: string; rows: OtRow[] }> {
  const rows: OtRow[] = []; let name = "";
  for (let index = 0; index < maxPages; index++) {
    const d = await gql<OtAssoc>(OT_API, `query($id: String!, $index: Int!) { disease(efoId: $id) { id name associatedTargets(page: { index: $index, size: 500 }, enableIndirect: true, orderByScore: "score") { count rows { score target { id approvedSymbol approvedName } datatypeScores { id score } } } } }`, { id: efoId, index });
    if (!d.disease) break;
    name = d.disease.name;
    const page = d.disease.associatedTargets.rows;
    rows.push(...page.filter((r) => r.score >= min));
    if (page.length < 500 || page[page.length - 1].score < min) break;
  }
  return { name, rows };
}
type OtNames = Record<string, { name: string; synonyms: string[] }>;
const loadOtRoot = () => cached<{ name: string; rows: OtRow[] }>("ot-root-associations.json", () => otAssociations(CANCER_ROOT, Math.min(OT_MIN, OT_CANCER_MIN, 0.4), 6));
const loadOtNames = () => cached<OtNames>("ot-disease-names.json", async () => {
  const d = await gql<{ disease: { descendants: string[] } }>(OT_API, `{ disease(efoId: "${CANCER_ROOT}") { descendants } }`);
  const ids = d.disease.descendants; const out: OtNames = {};
  for (let i = 0; i < ids.length; i += 200) {
    const r = await gql<{ diseases: Array<{ id: string; name: string; synonyms: Array<{ relation: string; terms: string[] }> }> }>(OT_API, `query($ids: [String!]!) { diseases(efoIds: $ids) { id name synonyms { relation terms } } }`, { ids: ids.slice(i, i + 200) });
    for (const x of r.diseases) out[x.id] = { name: x.name, synonyms: x.synonyms.filter((s) => s.relation === "hasExactSynonym" || s.relation === "hasRelatedSynonym").flatMap((s) => s.terms) };
  }
  return out;
});

// ---------------------------------------------------------------------------------------------------------------------
// Corpus cancer map. Hand entries are hints checked against the live registry: an Open Targets id is kept only if it
// resolves, and its resolved name is written to the report so the mapping can be reviewed. CIViC names and IntOGen
// codes must exist in the fetched data. Everything else is matched by normalised name (name or a long alias).
// ---------------------------------------------------------------------------------------------------------------------
const OT_HAND: Record<string, string> = {
  gastric: "MONDO_0001056", glioblastoma: "MONDO_0018177", urothelial: "MONDO_0001187",
  rcc: "MONDO_0005086", "breast-hr-positive": "MONDO_0006512", "breast-her2-positive": "MONDO_0006244", tnbc: "MONDO_0005494", nsclc: "MONDO_0005233", sclc: "MONDO_0008433",
  "head-and-neck": "MONDO_0010150", mesothelioma: "MONDO_0006292", "myeloproliferative-neoplasms": "MONDO_0020076", "primary-myelofibrosis": "MONDO_0009692",
  "polycythaemia-vera": "MONDO_0009891", "essential-thrombocythaemia": "MONDO_0005029", cholangiocarcinoma: "MONDO_0019087", gallbladder: "MONDO_0005411", esophageal: "MONDO_0007576",
  anal: "MONDO_0003199", "small-bowel": "MONDO_0003198", thyroid: "MONDO_0002108", sarcoma: "MONDO_0005089", osteosarcoma: "MONDO_0009807", "ewing-sarcoma": "MONDO_0012817",
  testicular: "MONDO_0005447", cervical: "MONDO_0002974", ovarian: "MONDO_0008170", endometrial: "MONDO_0011962", prostate: "MONDO_0008315", colorectal: "MONDO_0005575",
  pancreatic: "MONDO_0005184", hcc: "MONDO_0007256", "breast-cancer": "MONDO_0007254", "lung-cancer": "MONDO_0008903", "brain-tumours": "MONDO_0001657", "skin-cancer": "MONDO_0002898",
  "uveal-melanoma": "MONDO_0006325", "pleural-mesothelioma": "MONDO_0005112", "papillary-thyroid-cancer": "MONDO_0005075", "merkel-cell-carcinoma": "EFO_1001471", "lung-adenocarcinoma": "MONDO_0005061",
};
/**
 * Cancers outside the Open Targets "cancer" branch (haematological and some solid tumours sit under "neoplasm"):
 * found with the platform's own search, and accepted only when the top hits include one of the listed names.
 */
const OT_SEARCH: Record<string, [string, string[]]> = {
  melanoma: ["melanoma", ["melanoma"]], dlbcl: ["diffuse large B-cell lymphoma", ["diffuse large B-cell lymphoma"]], cll: ["chronic lymphocytic leukemia", ["chronic lymphocytic leukemia", "B-cell chronic lymphocytic leukemia"]],
  medulloblastoma: ["medulloblastoma", ["medulloblastoma"]], neuroblastoma: ["neuroblastoma", ["neuroblastoma"]], "follicular-lymphoma": ["follicular lymphoma", ["follicular lymphoma"]],
  "mantle-cell-lymphoma": ["mantle cell lymphoma", ["mantle cell lymphoma"]], "burkitt-lymphoma": ["Burkitt lymphoma", ["Burkitt lymphoma"]], "all-leukemia": ["acute lymphoblastic leukemia", ["acute lymphoblastic leukemia", "acute lymphoblastic leukemia (ALL)", "lymphoid leukemia"]],
  gist: ["gastrointestinal stromal tumor", ["gastrointestinal stromal tumor"]], "hodgkin-lymphoma": ["Hodgkin lymphoma", ["Hodgkin lymphoma", "Hodgkins lymphoma", "classic Hodgkin lymphoma"]],
  "multiple-myeloma": ["multiple myeloma", ["multiple myeloma", "plasma cell myeloma"]], aml: ["acute myeloid leukemia", ["acute myeloid leukemia"]], cml: ["chronic myelogenous leukemia", ["chronic myelogenous leukemia", "chronic myelogenous leukemia, BCR-ABL1 positive"]],
  leukaemia: ["leukemia", ["leukemia"]], "non-hodgkin-lymphoma": ["non-Hodgkin lymphoma", ["non-Hodgkin lymphoma", "non-Hodgkins lymphoma"]], mds: ["myelodysplastic syndrome", ["myelodysplastic syndrome"]], "myelodysplastic-syndromes": ["myelodysplastic syndrome", ["myelodysplastic syndrome"]],
  "peripheral-t-cell-lymphoma": ["peripheral T-cell lymphoma", ["peripheral T-cell lymphoma", "peripheral T-cell lymphoma, not otherwise specified"]], waldenstrom: ["Waldenstrom macroglobulinemia", ["Waldenstrom macroglobulinemia", "Waldenström macroglobulinemia"]],
  "systemic-mastocytosis": ["systemic mastocytosis", ["systemic mastocytosis"]], neuroendocrine: ["neuroendocrine tumor", ["neuroendocrine tumor", "neuroendocrine neoplasm"]], glioma: ["glioma", ["glioma", "malignant glioma"]],
  "low-grade-glioma": ["low grade glioma", ["low grade glioma", "low-grade glioma"]], "cutaneous-t-cell-lymphoma": ["cutaneous T cell lymphoma", ["cutaneous T cell lymphoma", "primary cutaneous T-cell non-Hodgkin lymphoma"]], "hairy-cell-leukemia": ["hairy cell leukemia", ["hairy cell leukemia"]],
  "t-cell-lymphoma": ["T-cell non-Hodgkin lymphoma", ["T-cell non-Hodgkin lymphoma"]], "b-cell-lymphoma": ["B-cell non-Hodgkin lymphoma", ["B-cell non-Hodgkin lymphoma"]], "marginal-zone-lymphoma": ["marginal zone lymphoma", ["marginal zone lymphoma", "marginal zone B-cell lymphoma"]],
  "chordoma": ["chordoma", ["chordoma"]], "desmoid-tumour": ["desmoid tumor", ["desmoid tumor", "aggressive fibromatosis"]], "langerhans-cell-histiocytosis": ["Langerhans cell histiocytosis", ["Langerhans cell histiocytosis", "Langerhans-cell histiocytosis"]],
  "erdheim-chester-disease": ["Erdheim-Chester disease", ["Erdheim-Chester disease"]], meningioma: ["meningioma", ["meningioma"]], "inflammatory-myofibroblastic-tumour": ["inflammatory myofibroblastic tumor", ["inflammatory myofibroblastic tumor"]],
  "tenosynovial-giant-cell-tumour": ["tenosynovial giant cell tumor", ["tenosynovial giant cell tumor", "giant cell tumor of tendon sheath"]], "mucosal-melanoma": ["mucosal melanoma", ["mucosal melanoma"]],
};
/** A hand or searched Open Targets id counts only if its name shares a real word with the corpus cancer's name (guards a typo'd id). */
const FILLER = new Set(["cancer", "carcinoma", "tumor", "tumour", "malignant", "neoplasm", "cell", "acute", "chronic", "syndrome", "disease", "and", "the", "with", "type", "gland", "positive", "negative", "adenocarcinoma", "lymphoma", "leukemia", "leukaemia", "sarcoma", "all", "types"]);
const full = (s: string) => norm(s.replace(/[()]/g, " "));
const wordsOf = (s: string) => new Set(full(s).split(" ").filter((w) => w.length >= 3 && !FILLER.has(w)));
const sharesWord = (a: string, b: string[]) => { const w = wordsOf(a); return b.some((x) => full(x).includes(full(a)) || [...wordsOf(x)].some((y) => w.has(y) || [...w].some((z) => z.startsWith(y.slice(0, 5)) || y.startsWith(z.slice(0, 5))))); };
/** CIViC disease names for corpus cancers whose own names differ from CIViC's wording. */
const CIVIC_HAND: Record<string, string[]> = {
  nsclc: ["Lung Non-small Cell Carcinoma", "Lung Adenocarcinoma", "Lung Squamous Cell Carcinoma"], sclc: ["Lung Small Cell Carcinoma"],
  pancreatic: ["Pancreatic Cancer", "Pancreatic Adenocarcinoma", "Pancreatic Ductal Adenocarcinoma"], gastric: ["Gastric Adenocarcinoma", "Stomach Cancer", "Stomach Carcinoma", "Gastric Cancer"],
  urothelial: ["Bladder Urothelial Carcinoma", "Bladder Carcinoma", "Bladder Cancer", "Urothelial Carcinoma"], "breast-hr-positive": ["Estrogen Receptor-positive Breast Cancer", "Hormone Receptor-positive Breast Cancer"],
  "breast-cancer": ["Breast Cancer", "Breast Carcinoma", "HER2 Negative Breast Cancer"], melanoma: ["Melanoma", "Skin Melanoma", "Cutaneous Melanoma"], colorectal: ["Colorectal Cancer", "Colon Cancer", "Colorectal Adenocarcinoma", "Colon Adenocarcinoma", "Colon Carcinoma"],
  prostate: ["Prostate Cancer", "Castration-resistant Prostate Carcinoma", "Prostate Adenocarcinoma", "Prostate Carcinoma"], "all-leukemia": ["Acute Lymphoblastic Leukemia", "B-lymphoblastic Leukemia/lymphoma", "T-lymphoblastic Leukemia/lymphoma"],
  glioblastoma: ["Glioblastoma", "Glioblastoma Multiforme"], rcc: ["Renal Cell Carcinoma", "Kidney Cancer"], mds: ["Myelodysplastic Syndrome"], "myelodysplastic-syndromes": ["Myelodysplastic Syndrome"],
  "head-and-neck": ["Head And Neck Squamous Cell Carcinoma", "Head And Neck Cancer"], ovarian: ["Ovarian Cancer", "Epithelial Ovarian Cancer", "Ovarian Serous Carcinoma", "Ovarian Carcinoma"],
  "hodgkin-lymphoma": ["Hodgkin Lymphoma", "Hodgkin's Lymphoma", "Classical Hodgkin Lymphoma"], "lung-cancer": ["Lung Cancer", "Lung Carcinoma"], hcc: ["Hepatocellular Carcinoma", "Liver Cancer"],
  esophageal: ["Esophageal Cancer", "Esophagus Squamous Cell Carcinoma", "Esophageal Carcinoma", "Esophagus Adenocarcinoma"], thyroid: ["Thyroid Cancer", "Thyroid Gland Carcinoma"], endometrial: ["Endometrial Cancer", "Endometrial Carcinoma"],
  cholangiocarcinoma: ["Cholangiocarcinoma", "Biliary Tract Cancer"], sarcoma: ["Sarcoma", "Soft Tissue Sarcoma"], "non-hodgkin-lymphoma": ["Non-Hodgkin Lymphoma", "Lymphoma", "B-cell Lymphoma"],
  "multiple-myeloma": ["Multiple Myeloma", "Plasma Cell Myeloma"], aml: ["Acute Myeloid Leukemia"], cml: ["Chronic Myeloid Leukemia", "Chronic Myelogenous Leukemia"], glioma: ["Glioma", "Low Grade Glioma", "High Grade Glioma"],
  "paediatric-low-grade-glioma": ["Childhood Low-grade Glioma", "Pilocytic Astrocytoma"], "paediatric-high-grade-glioma": ["Childhood High-grade Glioma"], "brain-tumours": ["Brain Cancer", "Central Nervous System Cancer"],
  neuroendocrine: ["Neuroendocrine Tumor", "Neuroendocrine Carcinoma"], "uveal-melanoma": ["Uveal Melanoma", "Ocular Melanoma"], mesothelioma: ["Mesothelioma", "Malignant Pleural Mesothelioma"],
};
/** IntOGen cancer type codes for corpus cancers, where the cohort name does not equal the corpus name. */
const INTOGEN_HAND: Record<string, string[]> = {
  "breast-cancer": ["BRCA"], prostate: ["PRAD", "PROSTATE"], urothelial: ["BLCA", "BLADDER", "UTUC"], hcc: ["HCC"], dlbcl: ["DLBCLNOS"], colorectal: ["COADREAD", "COAD"], "rectal-cancer": ["READ"],
  pancreatic: ["PAAD", "PANCREAS"], nsclc: ["LUAD", "LUSC", "NSCLC"], "lung-cancer": ["LUNG"], melanoma: ["MEL", "SKCM"], "oesophageal-adenocarcinoma": ["ESCA"], "oesophageal-squamous-cell-carcinoma": ["ESCC"],
  esophageal: ["ESCA", "ESCC"], endometrial: ["UCEC"], "head-and-neck": ["HNSC"], aml: ["AML"], gastric: ["STAD", "STOMACH", "EGC"], cll: ["CLLSLL"], medulloblastoma: ["MBL"], cholangiocarcinoma: ["CHOL"],
  ovarian: ["OVT"], glioblastoma: ["GBM", "GB"], "multiple-myeloma": ["PCM"], "non-hodgkin-lymphoma": ["MLYM", "NHL", "LNM"], cervical: ["CESC", "CEAD"], thyroid: ["WDTC"], "papillary-thyroid-cancer": ["WDTC"],
  "pleural-mesothelioma": ["PLMESO"], mesothelioma: ["PLMESO"], "paediatric-low-grade-glioma": ["PAST"], nasopharyngeal: ["NPC"], sclc: ["SCLC"], "burkitt-lymphoma": ["BL"], neuroblastoma: ["NBL"],
  "basal-cell-carcinoma": ["BCC"], "all-leukemia": ["ALL"], "cutaneous-scc": ["CSCC"], "papillary-rcc": ["PRCC"], angiosarcoma: ["ANGS"], "uterine-carcinosarcoma": ["UCS"], osteosarcoma: ["OS"], rcc: ["RCC", "CCRCC", "PRCC", "CHRCC"],
  "clear-cell-rcc": ["CCRCC"], "chromophobe-rcc": ["CHRCC"], leiomyosarcoma: ["LMS"], adrenocortical: ["ACC"], "salivary-gland": ["SACA", "ACYC"], sarcoma: ["SOFT_TISSUE", "SARCNOS", "LMS", "LIPO"], anal: ["ANSC"], vulvar: ["VULVA"],
  thymoma: ["THYM"], "adenoid-cystic-carcinoma": ["ACYC"], "small-bowel": ["SIC"], "pheochromocytoma-paraganglioma": ["PGNG"], "ewing-sarcoma": ["ES"], "uveal-melanoma": ["UM"], "skin-cancer": ["SKIN"],
  testicular: ["MGCT"], gallbladder: ["GBC"], "wilms-tumor": ["WT"], neuroendocrine: ["NETNOS", "PANET"], gist: ["GIST"], liposarcoma: ["LIPO"], rhabdomyosarcoma: ["RMS"], retinoblastoma: ["RBL"], hepatoblastoma: ["LIHB"],
  ependymoma: ["EPM"], mds: ["MDS"], "myelodysplastic-syndromes": ["MDS"], atrt: ["ATRT"], cml: ["CML"], glioma: ["LGGNOS", "HGGNOS"], "low-grade-glioma": ["LGGNOS"], "high-grade-glioma": ["HGGNOS"],
};

type CancerMap = { id: string; name: string; topLevel: boolean; ot?: { id: string; name: string; how: "hand" | "name" | "search" }; civic: string[]; intogen: string[]; rejected?: string[] };
async function mapCancers(cancers: CancerInput[], otNames: OtNames, civicDiseases: Set<string>, intogenNames: Record<string, string>): Promise<CancerMap[]> {
  // Exact normalised name only: synonyms and short aliases matched the wrong diseases (an acronym shared by two cancers).
  const otNameIndex = new Map<string, string>(); for (const [id, v] of Object.entries(otNames)) otNameIndex.set(norm(v.name), id);
  const civicIndex = new Map<string, string>(); for (const d of civicDiseases) civicIndex.set(norm(d), d);
  const intogenIndex = new Map<string, string[]>(); for (const [code, name] of Object.entries(intogenNames)) { const k = norm(name); intogenIndex.set(k, [...(intogenIndex.get(k) ?? []), code]); }
  const handIds = [...new Set(Object.values(OT_HAND))];
  const resolved = await cached<Record<string, string>>("ot-hand-names.json", async () => {
    const out: Record<string, string> = {};
    for (let i = 0; i < handIds.length; i += 100) { const r = await gql<{ diseases: Array<{ id: string; name: string }> }>(OT_API, `query($ids: [String!]!) { diseases(efoIds: $ids) { id name } }`, { ids: handIds.slice(i, i + 100) }); for (const d of r.diseases) out[d.id] = d.name; }
    return out;
  });
  const searched = await cached<Record<string, Array<{ id: string; name: string }>>>("ot-search.json", async () => {
    const out: Record<string, Array<{ id: string; name: string }>> = {};
    for (const [cid, [q]] of Object.entries(OT_SEARCH)) { const r = await gql<{ search: { hits: Array<{ id: string; name: string; entity: string }> } }>(OT_API, `query($q: String!) { search(queryString: $q, entityNames: ["disease"], page: { index: 0, size: 8 }) { hits { id name entity } } }`, { q }); out[cid] = r.search.hits.filter((h) => h.entity === "disease").map((h) => ({ id: h.id, name: h.name })); }
    return out;
  });
  const out: CancerMap[] = [];
  for (const c of cancers) {
    const key = norm(c.name);
    const m: CancerMap = { id: c.id, name: c.name, topLevel: !c.parent, civic: [], intogen: [] };
    const hand = OT_HAND[c.id];
    if (hand && resolved[hand] && sharesWord(resolved[hand], [c.name, ...(c.aka ?? [])])) m.ot = { id: hand, name: resolved[hand], how: "hand" };
    else if (hand) m.rejected = [...(m.rejected ?? []), `Open Targets hand id ${hand} resolved to "${resolved[hand] ?? "nothing"}"`];
    if (!m.ot && OT_SEARCH[c.id]) {
      const want = new Set(OT_SEARCH[c.id][1].map(norm));
      const hit = (searched[c.id] ?? []).find((h) => want.has(norm(h.name)));
      if (hit) m.ot = { id: hit.id, name: hit.name, how: "search" };
      else m.rejected = [...(m.rejected ?? []), `Open Targets search "${OT_SEARCH[c.id][0]}" returned ${(searched[c.id] ?? []).map((h) => h.name).join(", ") || "nothing"}`];
    }
    if (!m.ot) { const pick = otNameIndex.get(key); if (pick) m.ot = { id: pick, name: otNames[pick].name, how: "name" }; }
    m.civic = [...new Set([...(CIVIC_HAND[c.id] ?? []).filter((d) => civicDiseases.has(d)), ...(civicIndex.has(key) ? [civicIndex.get(key)!] : [])])];
    m.intogen = [...new Set([...(INTOGEN_HAND[c.id] ?? []).filter((code) => code in intogenNames), ...(intogenIndex.get(key) ?? [])])];
    if (m.ot || m.civic.length || m.intogen.length || m.rejected) out.push(m);
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// UniProt
// ---------------------------------------------------------------------------------------------------------------------
type UniProtEntry = { primaryAccession: string; proteinDescription?: { recommendedName?: { fullName?: { value: string } }; submissionNames?: Array<{ fullName?: { value: string } }> }; genes?: Array<{ geneName?: { value: string }; synonyms?: Array<{ value: string }> }>; comments?: Array<{ commentType: string; texts?: Array<{ value: string }>; subcellularLocations?: Array<{ location?: { value: string } }>; disease?: { diseaseId?: string; description?: string }; note?: { texts?: Array<{ value: string }> } }>; keywords?: Array<{ name: string; category?: string }> };
async function loadUniprot(accessions: string[]): Promise<Record<string, UniProtEntry>> {
  const p = join(CACHE, "uniprot-entries.json");
  const have: Record<string, UniProtEntry> = existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : {};
  const missing = accessions.filter((a) => !(a in have));
  for (let i = 0; i < missing.length; i += 100) {
    const chunk = missing.slice(i, i + 100);
    const q = chunk.map((a) => `(accession:${a})`).join("%20OR%20");
    const r = await http(`https://rest.uniprot.org/uniprotkb/search?query=${q}&fields=accession,gene_primary,gene_synonym,protein_name,cc_function,keyword,cc_subcellular_location,cc_disease&format=json&size=100`);
    const j = (await r.json()) as { results: UniProtEntry[] };
    for (const e of j.results) have[e.primaryAccession] = e;
    writeFileSync(p, JSON.stringify(have));
  }
  return have;
}

// ---------------------------------------------------------------------------------------------------------------------
// Gene universe
// ---------------------------------------------------------------------------------------------------------------------
type Gene = {
  h: Hgnc; civic?: CivicGene; intogen: IntogenRow[]; otRoot?: OtRow; otCancers: Array<{ cancerId: string; score: number; clinical: number; otId: string; otName: string }>;
  civicCancers: Set<string>; civicUnmapped: Set<string>; intogenCancers: Map<string, IntogenRow[]>; intogenUnmapped: Set<string>;
};
const otDatatype = (r: OtRow | undefined, id: string) => r?.datatypeScores.find((d) => d.id === id)?.score ?? 0;

// Symbols that read as ordinary words or acronyms in prose; never matched against corpus text.
const STOP_SYMBOLS = new Set(["SET", "MAX", "REST", "CAT", "IMPACT", "CLOCK", "ACE", "ADA", "CAMP", "ARC", "AND", "NOT", "FOR", "ALL", "MET", "KIT", "ATM", "CAR", "PET", "ADC", "ARID", "MRI", "PER", "SHE", "HIS", "OUT", "LAT", "CAST", "STAR", "GAS", "FLOW", "GRID", "CAP", "MAP", "MASS", "COPE", "FATE", "GAP", "HOOK", "LIGHT", "MICE", "PIGS", "RAB", "SAFE", "WAS", "WISP", "CAD", "CBS", "CCL", "NHS", "TIE", "ASS", "CANT", "COIL", "DISC", "FAST", "FLII", "GAL", "HAND", "MEN", "PIN", "SLIT", "SON", "SPEN", "TANK", "BAD", "BID", "BIK", "BOK", "HR", "OS", "PR", "CR", "CI", "AR", "T", "TH", "TTN", "NF", "ABL", "RAS", "RAF", "AKT", "PIK", "MYC", "ERB", "IL", "CD", "FGF", "TNF"]);
function symbolPatterns(h: Hgnc): RegExp[] {
  const tokens = [h.symbol, ...h.aliases.filter((a) => a.length >= 4 && /^[A-Z][A-Z0-9-]+$/.test(a) && /\d/.test(a))].filter((t) => t.length >= 3 && !STOP_SYMBOLS.has(t));
  return tokens.map((t) => new RegExp(`(^|[^A-Za-z0-9])${esc(t)}(?![A-Za-z0-9])`));
}
function labelTokens(label: string): string[] { return label.split(/[\s/,+()]+|\bto\b|\band\b/).map((t) => t.trim()).filter((t) => t.length >= 3); }

async function main() {
  const t0 = Date.now();
  const cancers = ALL_INPUTS.filter((e): e is CancerInput => e.kind === "cancer");
  // The script's own previous output does not count as coverage: it is regenerated whole on every --apply.
  const own = (e: { tags?: string[] }) => (e.tags ?? []).includes("cancer-genes-wave");
  const targets = ALL_INPUTS.filter((e): e is TargetInput => e.kind === "target" && !own(e));
  const drugs = ALL_INPUTS.filter((e): e is DrugInput => e.kind === "drug");
  const trials = ALL_INPUTS.filter((e): e is TrialInput => e.kind === "trial");
  const pathways = ALL_INPUTS.filter((e): e is PathwayInput => e.kind === "pathway");
  const allIds = new Set(ALL_INPUTS.filter((e) => !own(e)).map((e) => e.id));
  const cancerIds = new Set(cancers.map((c) => c.id));

  console.log("HGNC complete set...");
  const hgnc = await loadHgnc();
  console.log("CIViC genes...");
  const civic = await loadCivic();
  console.log("IntOGen driver catalogue...");
  const intogen = await loadIntogen();
  console.log("Open Targets: cancer root associations and disease names...");
  const otRoot = await loadOtRoot();
  const otNames = await loadOtNames();

  // Genes already covered by a target record.
  const covered = new Set<string>();
  for (const t of targets) { if (t.hgnc) covered.add(t.hgnc); for (const s of [t.symbol ?? "", ...(t.aka ?? [])]) { const h = hgnc.bySymbol.get(s); if (h) covered.add(h.hgnc); for (const part of s.split(/[\/,;]| and /)) { const hp = hgnc.bySymbol.get(part.trim()); if (hp) covered.add(hp.hgnc); } } }
  const ownIds = new Set(ALL_INPUTS.filter((e) => e.kind === "target" && own(e)).map((e) => e.id));
  for (const [id, x] of Object.entries(targetXrefs)) if (!ownIds.has(id)) for (const g of x.genes) covered.add(g.hgnc);

  // Cancer map.
  const civicDiseases = new Set(civic.genes.flatMap((g) => g.diseases.map((d) => d.name)));
  const cmap = await mapCancers(cancers, otNames, civicDiseases, intogen.cancerNames);
  const byOt = new Map<string, CancerMap[]>(); const byCivic = new Map<string, CancerMap[]>(); const byIntogen = new Map<string, CancerMap[]>();
  for (const m of cmap) {
    if (m.ot) byOt.set(m.ot.id, [...(byOt.get(m.ot.id) ?? []), m]);
    for (const d of m.civic) byCivic.set(d, [...(byCivic.get(d) ?? []), m]);
    for (const code of m.intogen) byIntogen.set(code, [...(byIntogen.get(code) ?? []), m]);
  }
  console.log(`corpus cancers mapped: ${cmap.length} (Open Targets ${cmap.filter((m) => m.ot).length}, CIViC ${cmap.filter((m) => m.civic.length).length}, IntOGen ${cmap.filter((m) => m.intogen.length).length})`);

  // Open Targets associations per mapped cancer.
  const otCancerRows = new Map<string, { name: string; rows: OtRow[] }>();
  const otIds = [...byOt.keys()];
  for (let i = 0; i < otIds.length; i++) {
    const id = otIds[i];
    otCancerRows.set(id, await cached(`ot-assoc-${id}.json`, () => otAssociations(id, OT_CANCER_MIN, 2)));
    if (i % 10 === 0) console.log(`  Open Targets per cancer ${i + 1}/${otIds.length} (${requests} requests)`);
  }

  // Universe keyed by HGNC id.
  const genes = new Map<string, Gene>();
  const get = (h: Hgnc): Gene => { let g = genes.get(h.hgnc); if (!g) { g = { h, intogen: [], otCancers: [], civicCancers: new Set(), civicUnmapped: new Set(), intogenCancers: new Map(), intogenUnmapped: new Set() }; genes.set(h.hgnc, g); } return g; };
  const resolveSymbol = (s: string): Hgnc | undefined => hgnc.bySymbol.get(s) ?? (hgnc.byAlias.get(s)?.length === 1 ? hgnc.byAlias.get(s)![0] : undefined);
  const unresolved: string[] = [];
  for (const c of civic.genes) {
    if (c.deprecated || c.evidenceItemCount === 0) continue;
    const h = resolveSymbol(c.name); if (!h) { unresolved.push(`civic:${c.name}`); continue; }
    const g = get(h); g.civic = c;
    for (const d of c.diseases) { const ms = byCivic.get(d.name); if (ms) for (const m of ms) g.civicCancers.add(m.id); else g.civicUnmapped.add(d.name); }
  }
  for (const r of intogen.rows) {
    const h = resolveSymbol(r.symbol); if (!h) { unresolved.push(`intogen:${r.symbol}`); continue; }
    const g = get(h); g.intogen.push(r);
    const ms = byIntogen.get(r.cancerType);
    if (ms) for (const m of ms) g.intogenCancers.set(m.id, [...(g.intogenCancers.get(m.id) ?? []), r]); else g.intogenUnmapped.add(intogen.cancerNames[r.cancerType] ?? r.cancerType);
  }
  for (const r of otRoot.rows) {
    if (r.score < OT_MIN) continue;
    const h = hgnc.byEnsembl.get(r.target.id) ?? resolveSymbol(r.target.approvedSymbol); if (!h) { unresolved.push(`ot:${r.target.approvedSymbol}`); continue; }
    get(h).otRoot = r;
  }
  for (const [otId, { rows }] of otCancerRows) for (const r of rows) {
    const h = hgnc.byEnsembl.get(r.target.id) ?? resolveSymbol(r.target.approvedSymbol); if (!h) continue;
    const g = get(h);
    if (!g.otRoot && otRoot.rows.find((x) => x.target.id === r.target.id)) g.otRoot = otRoot.rows.find((x) => x.target.id === r.target.id);
    for (const m of byOt.get(otId) ?? []) g.otCancers.push({ cancerId: m.id, score: r.score, clinical: otDatatype(r, "clinical"), otId, otName: m.ot!.name });
  }
  // Keep only protein-coding or well-known loci with at least one source; drop genes already covered.
  const universe = [...genes.values()].filter((g) => !covered.has(g.h.hgnc) && (g.civic || g.intogen.length || g.otRoot || g.otCancers.length));
  console.log(`gene universe ${genes.size}, already covered ${genes.size - universe.length - [...genes.values()].filter((g) => !covered.has(g.h.hgnc) && !(g.civic || g.intogen.length || g.otRoot || g.otCancers.length)).length}, new ${universe.length}`);

  // Corpus text links.
  const approvedDrug = (d: DrugInput) => d.status === "approved" || d.status === "standard-of-care" || (d.approvals?.length ?? 0) > 0;
  // Tests, assays and devices that name a gene are linked but do not make it a drug target.
  const isDiagnostic = (d: DrugInput) => /test|assay|diagnostic|panel|kit|imaging|device|tracer|sequencing|software/i.test(d.modality);
  const drugText = drugs.map((d) => ({ d, text: `${d.mechanism} ${d.name}` }));
  const trialText = trials.map((t) => ({ t, text: `${t.name} ${t.tldr}` }));
  const pathwayTokens = pathways.map((p) => ({ p, tokens: new Set(p.nodes.flatMap((n) => labelTokens(n.label)).map((t) => t.toUpperCase())) }));

  // Tier and ordering.
  const tierOf = (g: Gene, drugHits: DrugInput[]): EvidenceTier => {
    const clinical = Math.max(otDatatype(g.otRoot, "clinical"), ...g.otCancers.map((c) => c.clinical));
    if (clinical >= 0.7 || drugHits.some((d) => approvedDrug(d) && !isDiagnostic(d))) return "approved-drug";
    if ((g.civic?.evidenceItemCount ?? 0) > 0 || clinical > 0) return "clinical-evidence";
    if (g.intogen.length) return "cohort-driver";
    return "association-only";
  };
  const TIER_ORDER: EvidenceTier[] = ["approved-drug", "clinical-evidence", "cohort-driver", "association-only"];
  const strength = (g: Gene) => (g.otRoot?.score ?? 0) + (g.civic?.evidenceItemCount ?? 0) / 100 + g.intogen.length / 1000;

  const prepared = universe.map((g) => {
    const patterns = symbolPatterns(g.h);
    const hit = (text: string) => patterns.some((re) => re.test(text));
    const drugHits = drugText.filter((x) => hit(x.text)).map((x) => x.d);
    const trialHits = trialText.filter((x) => hit(x.text)).map((x) => x.t);
    const tokens = new Set([g.h.symbol, ...g.h.aliases.filter((a) => a.length >= 3 && /\d|^[A-Z]{4,}$/.test(a) && !STOP_SYMBOLS.has(a.toUpperCase()))].map((t) => t.toUpperCase()));
    const pathwayHits = pathwayTokens.filter((x) => [...tokens].some((t) => x.tokens.has(t))).map((x) => x.p);
    return { g, drugHits, trialHits, pathwayHits, tier: tierOf(g, drugHits) };
  }).sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier) || strength(b.g) - strength(a.g) || a.g.h.symbol.localeCompare(b.g.h.symbol));
  const chosen = prepared.slice(0, MAX);

  console.log(`UniProt entries for ${chosen.length} genes...`);
  const uniprot = await loadUniprot(chosen.map((x) => x.g.h.uniprot).filter((a): a is string => !!a));

  // Records.
  const usedIds = new Set<string>();
  const records: string[] = [];
  const xrefsOut: Record<string, { genes: Array<Record<string, string | undefined>> }> = {};
  const bySource = { civic: [] as string[], "open-targets": [] as string[], intogen: [] as string[] };
  const report = { generated: TODAY, requests: 0, requestLog: {} as Record<string, number>, written: 0, byTier: {} as Record<string, number>, byRole: {} as Record<string, number>, orphansWithoutCorpusLink: 0, unmappedDiseases: {} as Record<string, number>, cancerMap: cmap, unresolvedSymbols: unresolved, licences: { civic: "CC0 (civicdb.org)", openTargets: "CC0 (platform-docs.opentargets.org/licence)", intogen: intogen.licence, hgnc: "HGNC data are freely available (genenames.org/about/license)", uniprot: "CC BY 4.0 (uniprot.org/help/license)" } };
  const DENY = /^(PFS|OS|ORR|DFS|EFS|DOR|CR|PR|CI|ITT|TEAE|DLT|MTD|SOC|HR|IO|AE|SAE|NNT)$/i;

  for (const { g, drugHits, trialHits, pathwayHits, tier } of chosen) {
    const h = g.h;
    let id = kebab(h.symbol); if (allIds.has(id) || usedIds.has(id)) id = `${id}-gene`; usedIds.add(id);
    const u = h.uniprot ? uniprot[h.uniprot] : undefined;
    const uniprotName = u?.proteinDescription?.recommendedName?.fullName?.value ?? u?.proteinDescription?.submissionNames?.[0]?.fullName?.value;
    const proteinName = !uniprotName || /^(Protein|Uncharacterized protein|Putative uncharacterized protein) [A-Z0-9orf-]+$/i.test(uniprotName) ? h.name : uniprotName;
    const functionTexts = (u?.comments ?? []).filter((c) => c.commentType === "FUNCTION").flatMap((c) => c.texts?.map((t) => t.value) ?? []);
    const sentences = uniprotSentences(functionTexts).map(ukSpelling);
    const keywords = new Set((u?.keywords ?? []).map((k) => k.name));
    const locations = [...new Set((u?.comments ?? []).filter((c) => c.commentType === "SUBCELLULAR LOCATION").flatMap((c) => c.subcellularLocations?.map((l) => l.location?.value ?? "") ?? []).filter(Boolean))].slice(0, 4);
    const diseaseNotes = (u?.comments ?? []).filter((c) => c.commentType === "DISEASE").map((c) => `${c.disease?.description ?? ""} ${c.note?.texts?.map((t) => t.value).join(" ") ?? ""}`).join(" ");

    // Roles, each from a named source.
    const roles: TargetRole[] = []; const roleWhy: string[] = [];
    const clinical = Math.max(otDatatype(g.otRoot, "clinical"), ...g.otCancers.map((c) => c.clinical));
    const act = g.intogen.filter((r) => r.role === "Act").length; const lof = g.intogen.filter((r) => r.role === "LoF").length;
    const therapeuticHits = drugHits.filter((d) => !isDiagnostic(d));
    if (clinical > 0 || (g.civic?.therapies.length ?? 0) > 0 || therapeuticHits.length) { roles.push("drug-target"); roleWhy.push(clinical > 0 ? `Open Targets known-drug datatype score ${clinical.toFixed(2)}` : g.civic?.therapies.length ? `CIViC lists ${g.civic.therapies.length} therapies` : `${therapeuticHits.length} OnCo product record${therapeuticHits.length === 1 ? "" : "s"} name${therapeuticHits.length === 1 ? "s" : ""} it`); }
    if (act) { roles.push("oncogene-driver"); roleWhy.push(`IntOGen calls it an activating (Act) driver in ${act} cohort${act === 1 ? "" : "s"}`); }
    if (lof) { roles.push("tumour-suppressor"); roleWhy.push(`IntOGen calls it a loss-of-function (LoF) driver in ${lof} cohort${lof === 1 ? "" : "s"}`); }
    if ((g.civic?.evidenceItemCount ?? 0) > 0) { roles.push("biomarker"); roleWhy.push(`CIViC holds ${g.civic!.evidenceItemCount} clinical evidence items on its variants`); }
    if (/translocation t\(|gene fusion|fusion (?:protein|gene|transcript|oncoprotein)|in-frame fusion|chimeric (?:protein|transcript|gene)/i.test(diseaseNotes)) { roles.push("fusion-partner"); roleWhy.push("UniProt disease notes describe a translocation or gene fusion involving the gene"); }
    if (keywords.has("DNA repair") || keywords.has("DNA damage")) { roles.push("dna-repair"); roleWhy.push(`UniProt keyword "${keywords.has("DNA repair") ? "DNA repair" : "DNA damage"}"`); }
    if (/immune checkpoint/i.test(functionTexts.join(" "))) { roles.push("immune-checkpoint"); roleWhy.push("UniProt function text names it an immune checkpoint"); }
    const antigenDrugs = drugHits.filter((d) => /ADC|antibody|CAR|bispecific|radioligand|engager|conjugate/i.test(d.modality));
    if (antigenDrugs.length && (keywords.has("Cell membrane") || keywords.has("Membrane") || keywords.has("Secreted"))) { roles.push("antigen"); roleWhy.push(`a membrane or secreted protein (UniProt keywords) that ${antigenDrugs.length} antibody-based OnCo product${antigenDrugs.length === 1 ? "" : "s"} name`); }

    // Class from UniProt keywords, then IntOGen role.
    const targetClass: TargetInput["targetClass"] = keywords.has("Kinase") || keywords.has("Tyrosine-protein kinase") || keywords.has("Serine/threonine-protein kinase") ? "kinase"
      : lof && !act ? "tumor-suppressor" : act && !lof ? "oncogene"
      : keywords.has("Transcription regulation") || keywords.has("Transcription") || keywords.has("Activator") || keywords.has("Repressor") ? "transcription"
      : keywords.has("Receptor") && keywords.has("Nucleus") ? "nuclear-receptor"
      : ["Hydrolase", "Transferase", "Oxidoreductase", "Ligase", "Isomerase", "Lyase", "Methyltransferase", "Protease", "Helicase"].some((k) => keywords.has(k)) ? "enzyme"
      : roles.includes("antigen") ? "surface-antigen" : lof || act ? (lof >= act ? "tumor-suppressor" : "oncogene") : "other";
    const classPhrase: Record<string, string> = { kinase: "a protein kinase, an enzyme that switches other proteins on by adding phosphate groups", "tumor-suppressor": "a gene whose normal job is to hold cell growth in check", oncogene: "a gene that drives cell growth when it is altered", transcription: "a protein that switches other genes on and off", "nuclear-receptor": "a receptor that reads hormone signals inside the cell nucleus", enzyme: "an enzyme", "surface-antigen": "a protein on the cell surface", other: "a gene" };

    // Cancers: Open Targets per-cancer scores, CIViC disease names, IntOGen cohorts; top-level cancers first, then by score.
    const cancerScore = new Map<string, { score: number; why: string[] }>();
    const bump = (cid: string, score: number, why: string) => { if (!cancerIds.has(cid)) return; const cur = cancerScore.get(cid) ?? { score: 0, why: [] }; cur.score = Math.max(cur.score, score); cur.why.push(why); cancerScore.set(cid, cur); };
    for (const c of g.otCancers) bump(c.cancerId, c.score, `Open Targets association ${c.score.toFixed(2)} with ${c.otName} (${c.otId})`);
    for (const cid of g.civicCancers) bump(cid, 0.6, "CIViC evidence names this disease");
    for (const [cid, rows] of g.intogenCancers) bump(cid, 0.55 + Math.min(rows.length, 5) / 50, `IntOGen driver in ${rows.length} cohort${rows.length === 1 ? "" : "s"} (${[...new Set(rows.map((r) => r.cancerType))].join(", ")})`);
    const topLevel = new Set(cmap.filter((m) => m.topLevel).map((m) => m.id));
    const cancerList = [...cancerScore.entries()].sort((a, b) => Number(topLevel.has(b[0])) - Number(topLevel.has(a[0])) || b[1].score - a[1].score).slice(0, MAX_CANCERS_PER_GENE);
    const cancerLinks = cancerList.map(([cid]) => cid);
    const cancerName = (cid: string) => cancers.find((c) => c.id === cid)!.name.replace(/ \(.*\)$/, "");
    const whereFound = cancerList.slice(0, 6).map(([cid, v]) => ukSpelling(`${cancerName(cid)}: ${v.why.slice(0, 2).join("; ")}`));
    const unmapped = [...new Set([...g.civicUnmapped, ...g.intogenUnmapped])].filter((d) => !/^(Cancer|Solid Tumor|Malignant Tumor|Neoplasm)$/i.test(d));
    for (const d of unmapped) report.unmappedDiseases[d] = (report.unmappedDiseases[d] ?? 0) + 1;

    // Sources.
    const sources: Array<{ label: string; url: string; note?: string }> = [
      { label: `HGNC ${h.hgnc}`, url: `https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${h.hgnc}`, note: "approved symbol, name, aliases, locus and cross-references (hgnc_complete_set.txt)" },
    ];
    if (h.uniprot) sources.push({ label: `UniProt ${h.uniprot}`, url: `https://www.uniprot.org/uniprotkb/${h.uniprot}/entry`, note: "protein name, function text, keywords and locations (REST API)" });
    if (g.civic) sources.push({ label: `CIViC gene ${g.civic.name}`, url: `https://civicdb.org${g.civic.link}`, note: `${g.civic.evidenceItemCount} evidence items, ${g.civic.assertionCount} assertions, ${g.civic.variantCount} variants; diseases: ${g.civic.diseases.map((d) => d.name).slice(0, 5).join(", ")}${g.civic.diseases.length > 5 ? ` and ${g.civic.diseases.length - 5} more` : ""} (GraphQL API, CC0)` });
    if (g.otRoot || g.otCancers.length) sources.push({ label: `Open Targets ${h.ensembl ?? h.symbol}`, url: `https://platform.opentargets.org/target/${h.ensembl ?? h.symbol}/associations`, note: `${g.otRoot ? `association with cancer (${CANCER_ROOT}) ${g.otRoot.score.toFixed(2)}; ` : ""}${g.otCancers.length ? `per-cancer scores at or above ${OT_CANCER_MIN}: ${g.otCancers.slice(0, 6).map((c) => `${c.otName} ${c.score.toFixed(2)}`).join(", ")}` : ""} (GraphQL API, CC0)`.trim() });
    if (g.intogen.length) sources.push({ label: `IntOGen ${h.symbol}`, url: `https://www.intogen.org/search?gene=${encodeURIComponent(h.symbol)}`, note: `driver in ${g.intogen.length} cohort${g.intogen.length === 1 ? "" : "s"} (Act ${act}, LoF ${lof}); Compendium_Cancer_Genes.tsv release ${INTOGEN_RELEASE}, CC0 1.0` });

    // Text.
    const nameForProse = DENY.test(h.symbol) ? proteinName : h.symbol;
    const tierPhrase: Record<EvidenceTier, string> = { "approved-drug": "an approved or late-stage drug is recorded against it", "clinical-evidence": "clinical evidence ties its variants to diagnosis, prognosis or drug response", "cohort-driver": "it is called a cancer driver by mutation analysis of patient cohorts", "association-only": "the evidence so far is association rather than a proven role" };
    const rolePhrase = roles.length ? `The public catalogues list it as ${joinList(roles.map((r) => ({ "drug-target": "a drug target", "oncogene-driver": "an oncogene driver", "tumour-suppressor": "a tumour suppressor", biomarker: "a biomarker", "fusion-partner": "a fusion partner", "dna-repair": "a DNA repair gene", "immune-checkpoint": "an immune checkpoint", antigen: "an antigen" })[r]))}, and ${tierPhrase[tier]}.` : `In the public catalogues ${tierPhrase[tier]}.`;
    const cancerPhrase = cancerLinks.length ? ` Tied to ${cancerLinks.length > 3 ? `${cancerLinks.slice(0, 3).map(cancerName).join(", ")} and ${cancerLinks.length - 3} more` : joinList(cancerLinks.map(cancerName))}.` : "";
    let tldr = `${nameForProse} (${ukSpelling(proteinName === h.symbol ? h.name : proteinName)}) is ${classPhrase[targetClass]}. ${rolePhrase}${cancerPhrase}`;
    if (tldr.length > 400) tldr = `${nameForProse} is ${classPhrase[targetClass]}. ${rolePhrase}`;
    if (tldr.length > 400) tldr = `${nameForProse} is ${classPhrase[targetClass]}. In the public catalogues ${tierPhrase[tier]}.`;
    const functionPara = sentences.length ? sentences.slice(0, 3).join(" ") : ukSpelling(`UniProt has no function text for ${h.uniprot ?? "this gene"}; HGNC names it "${h.name}".`);
    const evidencePara = [
      g.civic ? `CIViC holds ${g.civic.evidenceItemCount} clinical evidence item${g.civic.evidenceItemCount === 1 ? "" : "s"} and ${g.civic.assertionCount} assertion${g.civic.assertionCount === 1 ? "" : "s"} across ${g.civic.variantCount} variant${g.civic.variantCount === 1 ? "" : "s"}${g.civic.therapies.length ? `, naming ${joinList(g.civic.therapies.slice(0, 4).map((t) => t.name))}${g.civic.therapies.length > 4 ? " and others" : ""}` : ""}.` : "",
      g.otRoot ? `Open Targets scores its association with cancer at ${g.otRoot.score.toFixed(2)} (direct and indirect evidence; datatypes ${g.otRoot.datatypeScores.map((d) => `${d.id.replace(/_/g, " ")} ${d.score.toFixed(2)}`).join(", ")}).` : "",
      g.intogen.length ? `IntOGen calls it a driver in ${g.intogen.length} cohort${g.intogen.length === 1 ? "" : "s"} (${act} activating, ${lof} loss-of-function), covering ${[...new Set(g.intogen.map((r) => intogen.cancerNames[r.cancerType] ?? r.cancerType))].slice(0, 6).join(", ")}${new Set(g.intogen.map((r) => r.cancerType)).size > 6 ? " and others" : ""}.` : "",
      drugHits.length ? `In OnCo, ${drugHits.length} product record${drugHits.length === 1 ? "" : "s"} name${drugHits.length === 1 ? "s" : ""} it (${joinList(drugHits.slice(0, 4).map((d) => d.name))}${drugHits.length > 4 ? " and others" : ""}).` : "",
    ].filter(Boolean).map(ukSpelling).join(" ");
    const summary = `${functionPara}\n\n${evidencePara}`;
    const biology = `${sentences.slice(0, 6).join(" ") || functionPara}${locations.length ? ` Location: ${locations.join("; ")} (UniProt).` : ""}${h.locus ? ` Locus ${h.locus} (HGNC).` : ""}`;
    const notes = [
      `Written by scripts/fetch-cancer-genes.ts from CIViC, Open Targets, IntOGen, HGNC and UniProt; the function text is UniProt's, condensed and in UK spelling. Roles: ${roleWhy.join("; ") || "none stated by the sources"}. Evidence tier "${tier}" is the strongest of those signals.`,
      "Prevalence not recorded: none of the sources gives a positivity rate.",
      ...(unmapped.length ? [`Diseases the sources name that have no OnCo cancer page yet, so they are not linked: ${unmapped.slice(0, 12).join("; ")}${unmapped.length > 12 ? ` and ${unmapped.length - 12} more` : ""}.`] : []),
      ...(trialHits.length > MAX_TRIALS_PER_GENE ? [`${trialHits.length} OnCo trial records name this gene; the first ${MAX_TRIALS_PER_GENE} by name are linked.`] : []),
    ].map(ukSpelling);
    for (const s of sources) if (s.note) s.note = ukSpelling(s.note);
    const related = [...(g.civic ? ["civic"] : []), ...(g.otRoot || g.otCancers.length ? ["open-targets"] : []), ...(g.intogen.length ? ["intogen"] : [])];
    if (g.civic) bySource.civic.push(id); if (g.otRoot || g.otCancers.length) bySource["open-targets"].push(id); if (g.intogen.length) bySource.intogen.push(id);
    // Short all-caps aliases (RAMP, MAX, SET) read as words or trial acronyms elsewhere in the corpus; keep the rest.
    const aka = [...new Set([h.name, ...(proteinName !== h.name ? [proteinName] : []), ...h.aliases, ...h.prev])].filter((a) => a && a !== h.symbol && !(/^[A-Z]{1,4}$/.test(a)));
    const links = [
      { label: `HGNC ${h.hgnc}`, url: `https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${h.hgnc}` },
      ...(h.uniprot ? [{ label: `UniProt ${h.uniprot}`, url: `https://www.uniprot.org/uniprotkb/${h.uniprot}/entry` }] : []),
      ...(h.entrez ? [{ label: `NCBI Gene ${h.entrez}`, url: `https://www.ncbi.nlm.nih.gov/gene/${h.entrez}` }] : []),
      ...(h.ensembl ? [{ label: `Ensembl ${h.ensembl}`, url: `https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=${h.ensembl}` }] : []),
    ];
    const rec: TargetInput = {
      id, kind: "target", name: h.symbol, symbol: h.symbol, aka, hgnc: h.hgnc, ensembl: h.ensembl, uniprot: h.uniprot, entrez: h.entrez, targetClass, role: roles, evidenceTier: tier, sources, asOf: TODAY,
      tldr, summary, biology, whereFound, cancers: cancerLinks, drugs: drugHits.map((d) => d.id).sort(), trials: trialHits.map((t) => t.id).sort().slice(0, MAX_TRIALS_PER_GENE), pathways: pathwayHits.map((p) => p.id).sort(), related,
      tags: ["cancer-genes-wave"], links, notes, provenance: { editedBy: "scripts/fetch-cancer-genes.ts (CIViC, Open Targets, IntOGen, HGNC, UniProt)", editedOn: TODAY },
    };
    xrefsOut[id] = { genes: [{ symbol: h.symbol, name: h.name, hgnc: h.hgnc, ensembl: h.ensembl, uniprot: h.uniprot, entrez: h.entrez, cosmic: h.cosmic, omim: h.omim, locus: h.locus }] };
    if (!drugHits.length && !trialHits.length && !pathwayHits.length) report.orphansWithoutCorpusLink++;
    report.byTier[tier] = (report.byTier[tier] ?? 0) + 1;
    for (const r of roles) report.byRole[r] = (report.byRole[r] ?? 0) + 1;
    records.push(`  // ${tier}: ${h.symbol}\n  t(${JSON.stringify(rec)}),`);
  }

  const header = `/**
 * GENERATED by scripts/fetch-cancer-genes.ts on ${TODAY}; do not edit by hand, re-run the script (see its header for the
 * sources, licences and rules). ${records.length} genes and proteins the open catalogues tie to cancer that had no target page:
 * CIViC (CC0), Open Targets (CC0; cancer ${CANCER_ROOT} association at or above ${OT_MIN}, per-cancer at or above ${OT_CANCER_MIN}),
 * IntOGen driver catalogue release ${INTOGEN_RELEASE} (CC0 1.0), identifiers from HGNC, function text from UniProt (CC BY 4.0).
 * Ordered by evidence tier, strongest first: ${TIER_ORDER.map((t) => `${t} ${report.byTier[t] ?? 0}`).join(", ")}.
 * Every record names its sources in \`sources\`; cancers are linked only through the id map in the script; unmapped disease
 * names stay in \`notes\`. \`cancerGeneIdsBySource\` lets the CIViC, Open Targets and IntOGen collection records list them.
 */
import type { TargetInput } from "@/lib/schema";

export const TARGETS_GENES_WAVE_GENERATED = "${TODAY}";

/** Types each record on its own so the compiler never has to form a union over every object literal in the array. */
const t = (x: TargetInput): TargetInput => x;

export const targetsGenesWave: TargetInput[] = [
${records.join("\n")}
];

/** Record ids by the catalogue that lists the gene, for the collection records in src/data/collections.ts. */
export const cancerGeneIdsBySource: Record<"civic" | "open-targets" | "intogen", string[]> = ${JSON.stringify(bySource)};
`;
  const outPath = APPLY ? join(ROOT, "src/data/targets-genes-wave.ts") : join(CACHE, "targets-genes-wave.preview.ts");
  writeFileSync(outPath, header);
  // Cross-references for the same records, merged into targetXrefs by src/data/target-xrefs.ts (its generator, scripts/fetch-xrefs.ts, writes the merge line).
  const xrefBody = `/**
 * GENERATED by scripts/fetch-cancer-genes.ts on ${TODAY} from hgnc_complete_set.txt: external identifiers for the gene
 * records in targets-genes-wave.ts, in the shape of target-xrefs.ts, which spreads them into \`targetXrefs\`. ChEMBL ids
 * are not looked up here; scripts/fetch-xrefs.ts adds them when it next runs. Do not edit by hand.
 */
import type { TargetXref } from "./target-xrefs";

export const targetXrefsGenes: Record<string, TargetXref> = ${JSON.stringify(xrefsOut)};
`;
  writeFileSync(APPLY ? join(ROOT, "src/data/target-xrefs-genes.ts") : join(CACHE, "target-xrefs-genes.preview.ts"), xrefBody);
  report.written = records.length; report.requests = requests; report.requestLog = requestLog;
  writeFileSync(REPORT, JSON.stringify(report, null, 2));
  console.log(`\n${APPLY ? "" : "[preview] "}wrote ${records.length} records to ${outPath} in ${Math.round((Date.now() - t0) / 1000)} s; ${requests} requests ${JSON.stringify(requestLog)}`);
  console.log(`tiers ${JSON.stringify(report.byTier)}\nroles ${JSON.stringify(report.byRole)}\nwithout any drug, trial or pathway link: ${report.orphansWithoutCorpusLink}\nunmapped diseases: ${Object.keys(report.unmappedDiseases).length} (top: ${Object.entries(report.unmappedDiseases).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([d, n]) => `${d} ${n}`).join("; ")})\nunresolved symbols: ${unresolved.length}\nreport ${REPORT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
