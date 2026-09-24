/**
 * Target specificity and distribution: for every target with an approved or clinical-stage drug, is the thing the
 * medicine aims at unique to cancer cells (a mutation or fusion), more abundant on the tumour than on normal tissue
 * (HER2, TROP2), shared with one normal lineage (CD19), present nearly everywhere (tubulin, PARP), an inherited
 * variant (BRCA1/2) or on immune or stromal cells (PD-1)? And does it matter in one cancer type, a few, or many?
 * Writes src/data/target-specificity.ts (the classification, its note and sources) and src/data/target-expression-hpa.ts
 * (the Human Protein Atlas rows the classification and the "Where it is found" section rest on).
 *
 * Sources (public, cached under --cache, one request at a time, PACE_MS apart, one User-Agent):
 *   Human Protein Atlas  version 25.1 downloadable data, licence CC BY-SA 3.0 (proteinatlas.org/about/licence):
 *                        proteinatlas.tsv.zip (RNA tissue, cancer and blood lineage specificity per gene, protein class),
 *                        tsv/normal_ihc_data.tsv.zip (antibody staining level per normal tissue and cell type),
 *                        tsv/cancer_data.tsv.zip (patients per staining level per cancer type).
 *   UniProt              https://rest.uniprot.org/uniprotkb/search  disease involvement text per accession. CC BY 4.0.
 *   Open Targets         https://api.platform.opentargets.org/api/v4/graphql  diseases associated with the target;
 *                        the cancer ones at or above OT_MIN are counted. CC0.
 *   OnCo corpus          biomarker readouts and their label thresholds, drug modalities and mechanisms, prevalence
 *                        rows, cancer parent chains, target classes, roles and tags (all cited on their own pages).
 *
 * Rules, in order; the first that fires decides `specificity`, and every note says which one did:
 *   1 immune or microenvironment: target class checkpoint or stroma, tag checkpoint, a curated list of immune and
 *     stromal targets whose drugs act on immune or bone cells rather than the tumour cell, or the UniProt-derived role
 *     immune-checkpoint where no cell-killing modality (ADC, CAR-T, engager, radioligand) aims at it.
 *   2 germline variant: UniProt disease text names a hereditary cancer syndrome or cancer susceptibility, the record is
 *     a tumour suppressor, DNA repair gene or tagged germline, and it is not an oncogene driver. TP53 is excluded by
 *     name: its mutations are overwhelmingly somatic (IntOGen LoF calls across cohorts) and the corpus drugs aimed at it
 *     are mutant-selective.
 *   3 label readouts: the biomarker readouts filed under the target, where at least one carries a current label
 *     threshold. A majority measuring a sequence variant (exon 19 deletion, G12C, a fusion transcript) reads
 *     tumour-specific; a majority scoring protein level or gene copies (IHC, ISH, PET uptake) reads lineage antigen when
 *     HPA finds the gene enriched in a blood lineage at or above LINEAGE_NTPM, else tumour-associated overexpression.
 *     A tie falls through to the next rule.
 *   4 drug mechanisms, for oncogene drivers and fusion partners only: a majority of the drugs aimed at the target
 *     naming a mutant, fusion, exon or hotspot reads tumour-specific.
 *   5 antigen-directed medicines against a membrane antigen (ADC, CAR-T, T-cell engager, radioligand, tracer, or an
 *     antibody against a surface antigen or CD marker): HPA blood lineage enrichment reads lineage antigen; any other
 *     antigen reads tumour-associated overexpression. Payload targets (tubulin) and secreted ligands (VEGF) are not
 *     antigens and fall through.
 *   6 catalogue roles without a corpus drug: an IntOGen driver call (activated, lost, or both across cohorts) or a
 *     UniProt fusion partner reads tumour-specific: the alteration is somatic whichever way it runs.
 *   7 everything else, by HPA RNA tissue specificity: low tissue specificity or an essential protein reads broadly
 *     expressed; tissue- or cancer-enriched or enhanced reads tumour-associated where a corpus drug acts on the
 *     wild-type protein (AR, ESR1), and lineage antigen where the protein is confined to a blood lineage (BTK). A
 *     tissue-enhanced gene with no drug is left not established.
 *   Anything left is not written: the target stays unclassified and is listed in the report.
 * Distribution counts the cancer families (root of the parent chain, blood cancers merged into leukaemia, lymphoma and
 * myeloma) with a prevalence row, a current label threshold or a catalogue-linked cancer; approvals of single-target
 * drugs, then Open Targets cancer associations at or above OT_MIN, are fallbacks used only when the target itself has
 * none, and the Open Targets list is quoted in every note. One family reads one type, two to four a few, five or more
 * many. A tissue-agnostic approval or threshold sets `tumourAgnostic` and reads many cancer types.
 *
 * Usage:
 *   npx tsx scripts/fetch-target-specificity.ts [--apply] [--cache=/tmp/target-specificity] [--offline] [--max=N]
 * Without --apply the files go to --cache/*.preview.ts; --offline uses only what the cache holds.
 */
import { createReadStream, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { targetXrefs } from "../src/data/target-xrefs";
import type { Biomarker, Cancer, Drug, Target, TargetDistribution, TargetSpecificity } from "../src/lib/schema";

const ROOT = join(__dirname, "..");
const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const OFFLINE = args.includes("--offline");
const str = (flag: string, d: string) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? a.slice(flag.length + 3) : d; };
const num = (flag: string, d: number) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? Number(a.split("=")[1]) : d; };
const CACHE = str("cache", "/tmp/target-specificity");
const MAX = num("max", Infinity);
const PACE_MS = 300;
const UA = "OnCo corpus (https://onco.cc; scripts/fetch-target-specificity.ts)";
const TODAY = new Date().toISOString().slice(0, 10);
const HPA_VERSION = "25.1";
const HPA_LICENCE = "CC BY-SA 3.0";
const HPA_FILES: Record<string, string> = {
  "proteinatlas.tsv": "https://www.proteinatlas.org/download/proteinatlas.tsv.zip",
  "normal_ihc_data.tsv": "https://www.proteinatlas.org/download/tsv/normal_ihc_data.tsv.zip",
  "cancer_data.tsv": "https://www.proteinatlas.org/download/tsv/cancer_data.tsv.zip",
};
const OT_API = "https://api.platform.opentargets.org/api/v4/graphql";
const OT_MIN = 0.5;
const OT_CANCER_AREA = "MONDO_0045024";
/** Open Targets disease names too broad to count as a cancer type. */
const OT_GENERIC = /^(cancer|neoplasm|carcinoma|adenocarcinoma|malignant neoplasm|benign neoplasm|solid tumou?r|tumou?r|cancer or benign tumor|neoplasm of .*|.* neoplasm|metastatic .*|.* metastasis|hematologic cancer|haematological cancer|hematologic malignancy|sarcoma|carcinoma in situ|squamous cell carcinoma|childhood cancer|pediatric cancer)$/i;
/** HPA blood lineage nTPM below which enrichment is too faint to call a lineage antigen (ERBB2 is "group enriched" in T cells at 5 nTPM). */
const LINEAGE_NTPM = 25;
/** HPA tissues whose enrichment marks a blood lineage rather than an organ. */
const HAEM_TISSUE = /lymphoid tissue|bone marrow|thymus|spleen|tonsil|appendix/i;

mkdirSync(CACHE, { recursive: true });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
let lastRequest = 0;
async function polite<T>(f: () => Promise<T>): Promise<T> {
  const wait = lastRequest + PACE_MS - Date.now();
  if (wait > 0) await sleep(wait);
  lastRequest = Date.now();
  return f();
}

// ---------------------------------------------------------------------------------------------------------------
// HPA files
// ---------------------------------------------------------------------------------------------------------------
async function ensureHpaFile(name: string): Promise<string> {
  const tsv = join(CACHE, name);
  if (existsSync(tsv)) return tsv;
  if (OFFLINE) throw new Error(`offline and ${tsv} missing`);
  const zip = `${tsv}.zip`;
  console.log(`downloading ${HPA_FILES[name]}`);
  await polite(async () => {
    const res = await fetch(HPA_FILES[name], { headers: { "User-Agent": UA } });
    if (!res.ok || !(res.headers.get("content-type") ?? "").includes("zip")) throw new Error(`${HPA_FILES[name]}: ${res.status} ${res.headers.get("content-type")}`);
    writeFileSync(zip, Buffer.from(await res.arrayBuffer()));
  });
  execFileSync("unzip", ["-o", "-q", zip, "-d", CACHE]);
  if (!existsSync(tsv)) throw new Error(`${zip} did not contain ${name}`);
  return tsv;
}

type Enriched = { name: string; value: number };
const parseEnriched = (s: string): Enriched[] => s.split(";").map((x) => x.trim()).filter(Boolean).map((x) => { const i = x.lastIndexOf(":"); return { name: x.slice(0, i).trim(), value: Number(x.slice(i + 1)) }; }).filter((x) => x.name && Number.isFinite(x.value));

type HpaGene = {
  symbol: string; ensembl: string; uniprot?: string;
  proteinClass: string[];
  rnaTissue: { specificity: string; distribution: string; enriched: Enriched[] };
  rnaCancer: { specificity: string; distribution: string; enriched: Enriched[] };
  bloodLineage: { specificity: string; distribution: string; enriched: Enriched[] };
  /** Normal tissues whose antibody staining is High in at least one cell type (reliability Approved, Enhanced or Supported), with the cell type. */
  normalHigh: { tissue: string; cellType: string }[];
  /** Normal tissues with Medium staining and none High, for the same reliabilities. */
  normalMedium: string[];
  /** Cancer types with any Medium or High staining: patients per level. */
  cancers: { cancer: string; high: number; medium: number; low: number; notDetected: number }[];
};

async function readSummary(want: Set<string>): Promise<Map<string, HpaGene>> {
  const file = await ensureHpaFile("proteinatlas.tsv");
  const out = new Map<string, HpaGene>();
  const rl = createInterface({ input: createReadStream(file) });
  let cols: string[] | null = null;
  for await (const line of rl) {
    const cells = line.split("\t").map((c) => c.replace(/^"|"$/g, ""));
    if (!cols) { cols = cells; continue; }
    const row: Record<string, string> = {};
    cols.forEach((c, i) => { row[c] = cells[i] ?? ""; });
    const ensembl = row["Ensembl"];
    if (!want.has(ensembl)) continue;
    out.set(ensembl, {
      symbol: row["Gene"], ensembl, uniprot: row["Uniprot"]?.split(",")[0]?.trim() || undefined,
      proteinClass: row["Protein class"].split(",").map((s) => s.trim()).filter(Boolean),
      rnaTissue: { specificity: row["RNA tissue specificity"], distribution: row["RNA tissue distribution"], enriched: parseEnriched(row["RNA tissue specific nTPM"]) },
      rnaCancer: { specificity: row["RNA cancer specificity"], distribution: row["RNA cancer distribution"], enriched: parseEnriched(row["RNA cancer specific pTPM"]) },
      bloodLineage: { specificity: row["RNA blood lineage specificity"], distribution: row["RNA blood lineage distribution"], enriched: parseEnriched(row["RNA blood lineage specific nTPM"]) },
      normalHigh: [], normalMedium: [], cancers: [],
    });
  }
  return out;
}

const RELIABLE = new Set(["Approved", "Enhanced", "Supported"]);
async function readNormal(genes: Map<string, HpaGene>) {
  const file = await ensureHpaFile("normal_ihc_data.tsv");
  const rl = createInterface({ input: createReadStream(file) });
  const medium = new Map<string, Set<string>>();
  let first = true;
  for await (const line of rl) {
    if (first) { first = false; continue; }
    const [ensembl, , tissue, , cellType, level, reliability] = line.split("\t");
    const g = genes.get(ensembl);
    if (!g || !RELIABLE.has(reliability)) continue;
    if (level === "High") { if (!g.normalHigh.some((x) => x.tissue === tissue && x.cellType === cellType)) g.normalHigh.push({ tissue, cellType }); }
    else if (level === "Medium") (medium.get(ensembl) ?? medium.set(ensembl, new Set()).get(ensembl)!).add(tissue);
  }
  for (const [ensembl, set] of medium) {
    const g = genes.get(ensembl)!;
    const high = new Set(g.normalHigh.map((x) => x.tissue));
    g.normalMedium = [...set].filter((t) => !high.has(t)).sort();
  }
}

async function readCancer(genes: Map<string, HpaGene>) {
  const file = await ensureHpaFile("cancer_data.tsv");
  const rl = createInterface({ input: createReadStream(file) });
  let first = true;
  for await (const line of rl) {
    if (first) { first = false; continue; }
    const [ensembl, , cancer, high, medium, low, nd] = line.split("\t");
    const g = genes.get(ensembl);
    if (!g) continue;
    const row = { cancer, high: Number(high), medium: Number(medium), low: Number(low), notDetected: Number(nd) };
    if (row.high + row.medium > 0) g.cancers.push(row);
  }
  for (const g of genes.values()) g.cancers.sort((a, b) => (b.high / (b.high + b.medium + b.low + b.notDetected || 1)) - (a.high / (a.high + a.medium + a.low + a.notDetected || 1)) || b.high - a.high);
}

// ---------------------------------------------------------------------------------------------------------------
// UniProt disease text
// ---------------------------------------------------------------------------------------------------------------
async function uniprotDisease(accessions: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  const todo = [...new Set(accessions)].filter(Boolean).sort();
  for (let i = 0; i < todo.length; i += 100) {
    const batch = todo.slice(i, i + 100);
    const key = join(CACHE, `uniprot-disease-${batch[0]}-${batch[batch.length - 1]}-${batch.length}.tsv`);
    let text: string;
    if (existsSync(key)) text = readFileSync(key, "utf8");
    else if (OFFLINE) continue;
    else {
      const q = batch.map((a) => `accession:${a}`).join(" OR ");
      const url = `https://rest.uniprot.org/uniprotkb/search?query=${encodeURIComponent(q)}&fields=accession,cc_disease&format=tsv&size=100`;
      text = await polite(async () => { const r = await fetch(url, { headers: { "User-Agent": UA } }); if (!r.ok) throw new Error(`UniProt ${r.status}`); return r.text(); });
      writeFileSync(key, text);
    }
    for (const line of text.split("\n").slice(1)) { const [acc, disease] = line.split("\t"); if (acc) out.set(acc, disease ?? ""); }
  }
  return out;
}

const HEREDITARY = /(hereditary|familial|susceptibility|predisposition|syndrome)/i;
const CANCER_WORD = /(cancer|carcinoma|tumou?r|neoplasia|polyposis|lynch|li-fraumeni|cowden|melanoma|leuk|lymphoma|pheochromocytoma|paraganglioma|retinoblastoma|neurofibromatosis|sarcoma|myeloma|glioma|nephroblastoma|hamartoma)/i;
/** Does the UniProt disease text carry a hereditary cancer syndrome or cancer susceptibility entry? Returns the first such entry's name. */
function hereditaryCancer(disease: string): string | null {
  for (const block of disease.split(/DISEASE:\s*/).map((b) => b.trim()).filter(Boolean)) {
    if (HEREDITARY.test(block) && CANCER_WORD.test(block)) return block.split(/\[MIM|:/)[0].trim();
  }
  return null;
}

// ---------------------------------------------------------------------------------------------------------------
// Open Targets associations
// ---------------------------------------------------------------------------------------------------------------
type OtAssoc = { count: number; cancers: { id: string; name: string; score: number }[] };
async function openTargets(ensembl: string): Promise<OtAssoc | null> {
  const key = join(CACHE, "ot", `${ensembl}.json`);
  mkdirSync(join(CACHE, "ot"), { recursive: true });
  let data: { rows?: { score: number; disease: { id: string; name: string; therapeuticAreas: { id: string }[] } }[]; count?: number } | null = null;
  if (existsSync(key)) data = JSON.parse(readFileSync(key, "utf8"));
  else if (!OFFLINE) {
    const query = `{ target(ensemblId: "${ensembl}") { associatedDiseases(page: {index: 0, size: 150}) { count rows { score disease { id name therapeuticAreas { id } } } } } }`;
    data = await polite(async () => {
      const r = await fetch(OT_API, { method: "POST", headers: { "Content-Type": "application/json", "User-Agent": UA }, body: JSON.stringify({ query }) });
      if (!r.ok) throw new Error(`Open Targets ${r.status} for ${ensembl}`);
      const j = await r.json() as { data?: { target?: { associatedDiseases?: { count: number; rows: never[] } } } };
      return j.data?.target?.associatedDiseases ?? { count: 0, rows: [] };
    });
    writeFileSync(key, JSON.stringify(data));
  }
  if (!data) return null;
  const cancers = (data.rows ?? []).filter((r) => r.score >= OT_MIN && r.disease.therapeuticAreas.some((a) => a.id === OT_CANCER_AREA) && !OT_GENERIC.test(r.disease.name)).map((r) => ({ id: r.disease.id, name: r.disease.name, score: r.score }));
  return { count: data.count ?? 0, cancers };
}

// ---------------------------------------------------------------------------------------------------------------
// Corpus signals
// ---------------------------------------------------------------------------------------------------------------
const g = graph();
const cancersById = new Map((g.kind("cancer") as Cancer[]).map((c) => [c.id, c]));
/** The top of a cancer's parent chain: the family the distribution count runs over. */
function familyOf(id: string): string {
  let c = cancersById.get(id);
  const seen = new Set<string>();
  while (c?.parent && cancersById.has(c.parent) && !seen.has(c.parent)) { seen.add(c.parent); c = cancersById.get(c.parent); }
  return coarseFamily(c?.id ?? id);
}
/** Blood cancers share a family whatever the corpus parent chain says: CML and Ph+ ALL are both leukaemias. */
const BLOOD_FAMILY: [RegExp, string][] = [[/leuk|\baml\b|\bcml\b|\bcll\b/i, "leukaemia"], [/lymphoma|hodgkin|dlbcl|follicular|mantle|waldenstr|burkitt/i, "lymphoma"], [/myeloma|plasmacytoma/i, "multiple-myeloma"], [/myelodysplastic|\bmds\b|myeloproliferative|polycythaemia|myelofibrosis|mastocytosis/i, "myeloid-neoplasm"]];
const FAMILY_NAME: Record<string, string> = { leukaemia: "Leukaemia", lymphoma: "Lymphoma", "multiple-myeloma": "Multiple myeloma", "myeloid-neoplasm": "Myeloid neoplasms" };
function coarseFamily(rootId: string): string {
  const name = `${rootId} ${cancersById.get(rootId)?.name ?? ""}`;
  for (const [re, fam] of BLOOD_FAMILY) if (re.test(name)) return fam;
  return rootId;
}
/** Umbrella "cancers" that are not a type: they carry the tumour-agnostic thresholds. */
const AGNOSTIC_CANCER_IDS = new Set(["metastatic-cancer"]);

const readoutsByTarget = new Map<string, Biomarker[]>();
for (const b of g.kind("biomarker") as Biomarker[]) if (b.target) (readoutsByTarget.get(b.target) ?? readoutsByTarget.set(b.target, []).get(b.target)!).push(b);
const VARIANT_MEASURES = new Set(["sequencing-variant", "methylation"]);
const EXPRESSION_MEASURES = new Set(["ihc-score", "copy-number", "fish-ratio", "pet-tracer-expression", "combined-positive-score", "tumour-proportion-score", "immune-cell-score", "tumour-cell-score"]);

function drugsFor(t: Target): Drug[] {
  const ids = new Set<string>([...t.drugs, ...(g.incoming(t.id).get("drug") ?? []).map((d) => d.id)]);
  return [...ids].map((id) => g.get(id)).filter((d): d is Drug => !!d && d.kind === "drug");
}

/** Cell-killing or cell-finding modalities: the medicine goes wherever the antigen is, so normal tissue with the antigen is hit too. */
const CYTOTOXIC_RE = /\bADCs?\b|antibody[- ]drug|drug conjugate|conjugate|\bCAR[- ]?T\b|CAR-NK|CAR T|CAR-M|bispecific[^.;]*(CD3|T[- ]cell|engag)|engager|trispecific|radioligand|radiopharm|177Lu|Lu-177|225Ac|Ac-225|alpha therapy|targeted alpha|\bTCR\b|T-cell receptor|PET\b|tracer|imaging agent|radioconjugate|immunotoxin|depleting/i;
const ANTIBODY_RE = /antibody|\bmAb\b|monoclonal|-mab\b/i;
const VARIANT_RE = /mutant|mutation|mutated|fusion|rearrange|translocation|exon ?(19|20|14|18)|G12[CDVR]|V600|T315I|D816|\bITD\b|Y220C|skipping|insertion|deletion|R132|R140|R172|H1047|E545|E542|L858R|T790M|C797S|neoantigen|neoepitope|variant/i;
const OVEREXPRESSION_RE = /overexpress|amplif|IHC|expression|-positive|positive tum|high levels|abundant on|copies/i;
const ESSENTIAL_CLASS = "Essential proteins";

/** Immune and microenvironment targets whose medicines act on immune, stromal or bone cells rather than on the tumour cell. Existence in the corpus is checked at run time. */
const IMMUNE_IDS = new Set(["pd1", "pdl1", "ctla4", "lag3", "tigit", "tim3", "cd47", "cd73-adenosine", "ido1", "csf1r", "fap", "il6", "tlr7", "cd137", "cd28", "cd25", "cd3", "ifnar1", "cxcr4", "rankl", "vista", "cd80", "cd40", "ox40", "gitr", "sting", "tgf-beta", "tgfb", "ccr8", "il2", "il15", "il11ra", "nkg2a", "sirpa", "cd39", "a2ar", "adora2a", "arg1", "stat3", "cd27", "icos", "b7-h4", "b7h4", "btla", "pvrig", "cd96", "cd200", "cd112r", "kir", "tnfr2", "il1b"]);
const TP53_EXCLUDED = "TP53";

// ---------------------------------------------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------------------------------------------
type Source = { label: string; url: string; note?: string };
type Result = { specificity: TargetSpecificity; rule: number; basis: string; sources: Source[] };
/** Why no rule fired: written into the note so the page says "not established" and why, with the data seen. */
type NoResult = { reason: string; sources: Source[] };
const isResult = (r: Result | NoResult): r is Result => "specificity" in r;

const hpaTissueUrl = (ensembl: string, symbol: string) => `https://www.proteinatlas.org/${ensembl}-${symbol}/tissue`;
const hpaPathologyUrl = (ensembl: string, symbol: string) => `https://www.proteinatlas.org/${ensembl}-${symbol}/pathology`;
const fmtEnriched = (e: Enriched[], unit: string) => e.map((x) => `${x.name} ${x.value.toLocaleString("en-GB", { maximumFractionDigits: 0 })} ${unit}`).join(", ");

/** The HPA sentence quoted in every note: normal tissue picture, then the cancers with high staining. */
function hpaSentence(genes: HpaGene[]): string {
  return genes.map((h) => {
    const parts: string[] = [];
    parts.push(`RNA ${h.rnaTissue.specificity.toLowerCase()}${h.rnaTissue.enriched.length ? ` (${fmtEnriched(h.rnaTissue.enriched.slice(0, 3), "nTPM")})` : ""}`);
    if (h.bloodLineage.enriched.length) parts.push(`blood lineage ${h.bloodLineage.specificity.toLowerCase()} (${fmtEnriched(h.bloodLineage.enriched.slice(0, 3), "nTPM")})`);
    const highTissues = [...new Set(h.normalHigh.map((x) => x.tissue))];
    parts.push(highTissues.length ? `high antibody staining in ${highTissues.length} normal tissue${highTissues.length === 1 ? "" : "s"}` : "no normal tissue stained high");
    const top = h.cancers.filter((c) => c.high > 0)[0];
    if (top) parts.push(`highest cancer staining ${top.cancer} (${top.high} of ${top.high + top.medium + top.low + top.notDetected} high)`);
    return `HPA ${h.symbol}: ${parts.join("; ")}`;
  }).join(". ");
}
const hpaSources = (genes: HpaGene[], withPathology: boolean): Source[] => genes.flatMap((h) => [
  { label: `Human Protein Atlas ${h.symbol} tissue`, url: hpaTissueUrl(h.ensembl, h.symbol), note: `RNA tissue and blood lineage specificity, normal tissue antibody staining (version ${HPA_VERSION}, ${HPA_LICENCE})` },
  ...(withPathology ? [{ label: `Human Protein Atlas ${h.symbol} pathology`, url: hpaPathologyUrl(h.ensembl, h.symbol), note: `patients per staining level per cancer type (version ${HPA_VERSION}, ${HPA_LICENCE})` }] : []),
]);

function classify(t: Target, hpa: HpaGene[], disease: Map<string, string>, drugs: Drug[]): Result | NoResult {
  const readouts = readoutsByTarget.get(t.id) ?? [];
  const cytotoxic = drugs.filter((d) => CYTOTOXIC_RE.test(`${d.modality} ${d.mechanism}`) || CYTOTOXIC_RE.test(d.name));
  const antibody = drugs.filter((d) => ANTIBODY_RE.test(`${d.modality} ${d.mechanism}`));
  // A composite target (VEGFA, KDR, FLT1, FLT4, PGF) is judged by its first gene: the one the record is named for.
  const primary = hpa[0];
  const cdMarker = !!primary && primary.proteinClass.includes("CD markers");
  /** A membrane protein a medicine can reach from outside the cell; payload targets (tubulin) and secreted ligands (VEGF) are not. */
  const membrane = t.targetClass === "surface-antigen" || cdMarker || (!!primary && primary.proteinClass.includes("Predicted membrane proteins") && !primary.proteinClass.includes("Predicted secreted proteins"));
  const antigenDirected = membrane && (cytotoxic.length > 0 || t.targetClass === "surface-antigen" || (antibody.length > 0 && cdMarker) || t.tags.some((x) => /adc-target|car-t|engager-target|antibody-target|pet-target|radioligand/.test(x)));
  const haem = (h: HpaGene) => /enriched|enhanced/i.test(h.rnaTissue.specificity) && h.rnaTissue.enriched.length > 0 && h.rnaTissue.enriched.every((e) => HAEM_TISSUE.test(e.name));
  const lineage = hpa.filter((h) => (/enriched|enhanced/i.test(h.bloodLineage.specificity) && h.bloodLineage.enriched.some((e) => e.value >= LINEAGE_NTPM)) || haem(h));
  const lineageCells = [...new Set(lineage.flatMap((h) => [...h.bloodLineage.enriched.filter((e) => e.value >= LINEAGE_NTPM).map((e) => e.name), ...(haem(h) ? h.rnaTissue.enriched.map((e) => `${e.name} cells`) : [])]))];
  const hpaS = hpa.length ? ` ${hpaSentence(hpa)}.` : "";
  const driverLike = t.role.includes("oncogene-driver") || t.role.includes("fusion-partner") || t.tags.includes("driver") || t.tags.includes("fusion") || t.targetClass === "oncogene";
  const alterationLike = driverLike || t.targetClass === "tumor-suppressor" || t.role.includes("tumour-suppressor");
  const uniprotSources = (): Source[] => hpa.filter((h) => h.uniprot).map((h) => ({ label: `UniProt ${h.uniprot}`, url: `https://www.uniprot.org/uniprotkb/${h.uniprot}/entry`, note: "involvement in disease" }));

  // 1 immune or microenvironment
  const immuneByClass = t.targetClass === "checkpoint" || t.targetClass === "stroma" || t.tags.includes("checkpoint") || IMMUNE_IDS.has(t.id);
  const immuneByRole = t.role.includes("immune-checkpoint") && cytotoxic.length === 0;
  if (immuneByClass || immuneByRole) {
    const why = t.targetClass === "checkpoint" || t.tags.includes("checkpoint") ? "the record's class is immune checkpoint" : t.targetClass === "stroma" ? "the record's class is stroma" : IMMUNE_IDS.has(t.id) ? "its medicines act on immune, stromal or bone cells rather than on the tumour cell (drug mechanisms in the corpus)" : "UniProt describes it as an immune checkpoint and no cell-killing medicine aims at it";
    return { specificity: "immune-microenvironment", rule: 1, basis: `Immune or microenvironment target: ${why}.${hpaS}`, sources: [...hpaSources(hpa, false), ...uniprotSources()] };
  }

  // 2 germline
  const hereditary = hpa.map((h) => (h.uniprot ? hereditaryCancer(disease.get(h.uniprot) ?? "") : null)).filter(Boolean) as string[];
  const suppressorLike = t.targetClass === "tumor-suppressor" || t.tags.includes("germline") || t.role.includes("dna-repair") || (t.role.includes("tumour-suppressor") && !t.role.includes("oncogene-driver"));
  const symbols = hpa.map((h) => h.symbol);
  if (hereditary.length && suppressorLike && !symbols.includes(TP53_EXCLUDED) && !t.role.includes("oncogene-driver") && !t.tags.includes("driver")) {
    return { specificity: "germline-variant", rule: 2, basis: `Germline variant: UniProt lists ${hereditary.join("; ")} under involvement in disease, and the record is a ${t.targetClass === "tumor-suppressor" || t.role.includes("tumour-suppressor") ? "tumour suppressor" : t.role.includes("dna-repair") ? "DNA repair gene" : "germline-tagged gene"}; the medicines linked to it act through the loss (synthetic lethality) or use the variant to pick patients.${hpaS}`, sources: [...uniprotSources(), ...hpaSources(hpa, false)] };
  }

  // 3 label readouts
  const variantReadouts = readouts.filter((b) => VARIANT_MEASURES.has(b.measurement));
  const exprReadouts = readouts.filter((b) => EXPRESSION_MEASURES.has(b.measurement));
  const thresholded = (bs: Biomarker[]) => bs.some((b) => b.thresholds.some((x) => x.status === "current"));
  if ((variantReadouts.length || exprReadouts.length) && (thresholded(readouts) || (alterationLike && variantReadouts.length > exprReadouts.length))) {
    const cite = (bs: Biomarker[]): Source[] => bs.flatMap((b) => (b.thresholds.find((x) => x.status === "current") ? [{ label: `${b.name} label threshold`, url: b.thresholds.find((x) => x.status === "current")!.source, note: b.thresholds.find((x) => x.status === "current")!.value }] : [{ label: b.name, url: b.scoringRule.source, note: b.scoringRule.sourceLabel }])).slice(0, 4);
    if (variantReadouts.length > exprReadouts.length && (thresholded(variantReadouts) || alterationLike)) return { specificity: "tumour-specific", rule: 3, basis: `Tumour-specific alteration: ${variantReadouts.length} of ${readouts.length} label readouts filed under it measure a sequence variant (${variantReadouts.map((b) => b.name).slice(0, 4).join(", ")}${variantReadouts.length > 4 ? " and more" : ""}) absent from normal cells${exprReadouts.length ? `; ${exprReadouts.length} score expression (${exprReadouts.map((b) => b.name).join(", ")}), so some medicines aimed at it also act on the wild-type protein` : ""}.${hpaS}`, sources: [...cite(variantReadouts), ...hpaSources(hpa, false)] };
    if (exprReadouts.length > variantReadouts.length && thresholded(exprReadouts)) {
      if (lineage.length && membrane) return { specificity: "lineage-antigen", rule: 3, basis: `Lineage antigen shared with normal ${lineageCells.join(" and ")}: the label readouts filed under it score its expression (${exprReadouts.map((b) => b.name).slice(0, 3).join(", ")}), and HPA finds the gene ${lineage.map((h) => h.bloodLineage.specificity.toLowerCase()).join(", ")} in that blood lineage at or above ${LINEAGE_NTPM} nTPM, so medicines aimed at it clear the normal lineage too.${hpaS}`, sources: [...cite(exprReadouts), ...hpaSources(hpa, true)] };
      return { specificity: "tumour-associated", rule: 3, basis: `Tumour-associated overexpression or amplification: ${exprReadouts.length} of ${readouts.length} label readouts filed under it score protein level or gene copies (${exprReadouts.map((b) => b.name).slice(0, 4).join(", ")}${exprReadouts.length > 4 ? " and more" : ""}), so the medicines rely on the tumour carrying more of it than normal tissue${variantReadouts.length ? `; ${variantReadouts.length} measure a variant (${variantReadouts.map((b) => b.name).join(", ")})` : ""}.${hpaS}`, sources: [...cite(exprReadouts), ...hpaSources(hpa, true)] };
    }
  }

  // 4 drug mechanisms
  const variantDrugs = drugs.filter((d) => VARIANT_RE.test(`${d.modality} ${d.mechanism} ${d.name}`));
  const exprDrugs = drugs.filter((d) => OVEREXPRESSION_RE.test(`${d.modality} ${d.mechanism}`) && !VARIANT_RE.test(`${d.modality} ${d.mechanism} ${d.name}`));
  if (driverLike && drugs.length && variantDrugs.length * 2 > drugs.length && variantDrugs.length > exprDrugs.length) {
    return { specificity: "tumour-specific", rule: 4, basis: `Tumour-specific alteration: ${variantDrugs.length} of ${drugs.length} medicines aimed at it name a mutant, fusion, exon or hotspot in their mechanism (${variantDrugs.slice(0, 4).map((d) => d.name).join(", ")}${variantDrugs.length > 4 ? " and more" : ""}), an alteration absent from normal cells.${hpaS}`, sources: [...variantDrugs.slice(0, 3).flatMap((d) => d.links.slice(0, 1)), ...hpaSources(hpa, false)] };
  }

  // 5 antigen-directed medicines
  if (antigenDirected) {
    const modal = cytotoxic.length ? `${cytotoxic.length} cell-killing or cell-finding medicine${cytotoxic.length === 1 ? "" : "s"} (${cytotoxic.slice(0, 3).map((d) => d.name).join(", ")}${cytotoxic.length > 3 ? " and more" : ""})` : antibody.length ? `${antibody.length} antibod${antibody.length === 1 ? "y" : "ies"} (${antibody.slice(0, 3).map((d) => d.name).join(", ")})` : "surface-antigen class";
    if (lineage.length) {
      return { specificity: "lineage-antigen", rule: 5, basis: `Lineage antigen shared with normal ${lineageCells.join(" and ")}: HPA blood lineage ${lineage.map((h) => h.bloodLineage.specificity.toLowerCase()).join(", ")} at or above ${LINEAGE_NTPM} nTPM, and ${modal} aim at it, so normal cells of the lineage are hit too.${hpaS}`, sources: hpaSources(hpa, true) };
    }
    const lowNormal = hpa.every((h) => h.normalHigh.length === 0);
    return { specificity: "tumour-associated", rule: 5, basis: `Tumour-associated overexpression: ${modal} aim at the antigen, which HPA finds ${lowNormal ? "with no normal tissue stained high" : `stained high in ${[...new Set(hpa.flatMap((h) => h.normalHigh.map((x) => x.tissue)))].length} normal tissue${[...new Set(hpa.flatMap((h) => h.normalHigh.map((x) => x.tissue)))].length === 1 ? "" : "s"}`}; the medicine relies on the tumour carrying more of it than the normal tissue it shares it with.${hpaS}`, sources: hpaSources(hpa, true) };
  }

  // 4b majority overexpression drugs without an antigen modality (rare)
  if (membrane && drugs.length && exprDrugs.length * 2 > drugs.length) {
    return { specificity: "tumour-associated", rule: 4, basis: `Tumour-associated overexpression or amplification: ${exprDrugs.length} of ${drugs.length} medicines aimed at it name overexpression or amplification in their mechanism (${exprDrugs.slice(0, 4).map((d) => d.name).join(", ")}).${hpaS}`, sources: [...exprDrugs.slice(0, 3).flatMap((d) => d.links.slice(0, 1)), ...hpaSources(hpa, true)] };
  }

  // 6 catalogue roles without a corpus drug
  if (!drugs.length) {
    const driver = t.role.includes("oncogene-driver") || t.tags.includes("driver");
    const fusion = t.role.includes("fusion-partner") || t.tags.includes("fusion");
    const suppressor = t.role.includes("tumour-suppressor") || t.targetClass === "tumor-suppressor";
    if (driver || fusion || suppressor) {
      const calls = [driver ? "an oncogene driver (IntOGen cohort analysis finds it activated more often than chance)" : "", suppressor ? "a tumour suppressor (IntOGen finds it knocked out more often than chance)" : "", fusion ? "a fusion partner (UniProt records a translocation)" : ""].filter(Boolean);
      return { specificity: "tumour-specific", rule: 6, basis: `Tumour-specific alteration: the catalogues call it ${calls.join(" and ")}${driver && suppressor ? ", so the direction differs between cohorts but the alteration is somatic either way" : ""}; what a medicine would aim at or exploit is the altered form or its loss, absent from normal cells; no corpus medicine is aimed at it yet.${hpaS}`, sources: [...t.sources.filter((s) => /IntOGen|UniProt|CIViC/.test(s.label)).slice(0, 3), ...hpaSources(hpa, false)] };
    }
  }

  // 7 HPA expression pattern for wild-type inhibitors and the rest
  if (!hpa.length) return { reason: `Specificity not established: the Human Protein Atlas has no row for ${t.symbol ?? t.name}${drugs.length ? "" : " and no corpus medicine is aimed at it"}${readouts.length ? `; its ${readouts.length} readout${readouts.length === 1 ? "" : "s"} carr${readouts.length === 1 ? "ies" : "y"} no current label threshold` : ""}.`, sources: uniprotSources() };
  const essential = hpa.some((h) => h.proteinClass.includes(ESSENTIAL_CLASS));
  const lowSpec = hpa.filter((h) => /low tissue specificity/i.test(h.rnaTissue.specificity)).length * 2 >= hpa.length;
  if (essential || lowSpec) {
    return { specificity: "broadly-expressed", rule: 7, basis: `Broadly expressed or essential: HPA ${essential ? `lists ${hpa.filter((h) => h.proteinClass.includes(ESSENTIAL_CLASS)).map((h) => h.symbol).join(", ")} among essential proteins` : ""}${essential && lowSpec ? " and " : ""}${lowSpec ? "finds the RNA at low tissue specificity" : ""}${drugs.length ? `; the ${drugs.length} medicine${drugs.length === 1 ? "" : "s"} aimed at it (${drugs.slice(0, 3).map((d) => d.name).join(", ")}${drugs.length > 3 ? " and more" : ""}) act on the wild-type protein, so normal tissue is exposed and the therapeutic window comes from the tumour's faster division or its dependence on the protein` : "; a medicine acting on the wild-type protein would expose normal tissue too"}.${hpaS}`, sources: hpaSources(hpa, false) };
  }
  if (drugs.length && lineage.length) {
    return { specificity: "lineage-antigen", rule: 7, basis: `Lineage antigen shared with normal ${lineageCells.join(" and ")}: HPA finds the gene ${lineage.map((h) => haem(h) ? `${h.rnaTissue.specificity.toLowerCase()} in ${h.rnaTissue.enriched.map((e) => e.name).join(", ")}` : `${h.bloodLineage.specificity.toLowerCase()} in that blood lineage`).join("; ")}, and the ${drugs.length} medicine${drugs.length === 1 ? "" : "s"} aimed at it (${drugs.slice(0, 3).map((d) => d.name).join(", ")}${drugs.length > 3 ? " and more" : ""}) act on the wild-type protein, so the normal lineage is hit too.${hpaS}`, sources: hpaSources(hpa, true) };
  }
  const enrichedTissue = hpa.filter((h) => /enriched|enhanced/i.test(h.rnaTissue.specificity));
  const enrichedCancer = hpa.filter((h) => /enriched|enhanced/i.test(h.rnaCancer.specificity));
  if (drugs.length && (enrichedTissue.length || enrichedCancer.length)) {
    return { specificity: "tumour-associated", rule: 7, basis: `Tumour-associated overexpression: HPA finds the RNA ${enrichedCancer.length ? `${enrichedCancer.map((h) => h.rnaCancer.specificity.toLowerCase()).join(", ")} in cancer (${enrichedCancer.flatMap((h) => h.rnaCancer.enriched.map((e) => e.name)).slice(0, 4).join(", ")})` : ""}${enrichedCancer.length && enrichedTissue.length ? " and " : ""}${enrichedTissue.length ? `${enrichedTissue.map((h) => h.rnaTissue.specificity.toLowerCase()).join(", ")} in normal ${enrichedTissue.flatMap((h) => h.rnaTissue.enriched.map((e) => e.name)).slice(0, 4).join(", ")}` : ""}, so the tumour and the normal tissue it comes from share the target and the medicine relies on the difference in level.${hpaS}`, sources: hpaSources(hpa, true) };
  }
  const why = drugs.length ? `the ${drugs.length} corpus medicine${drugs.length === 1 ? "" : "s"} aimed at it (${drugs.slice(0, 3).map((d) => d.name).join(", ")}) name no variant, overexpression or antigen mechanism${readouts.length ? " and its readouts carry no current label threshold" : ""}` : `no corpus medicine is aimed at it and the catalogues give it ${t.role.length ? `only the role${t.role.length === 1 ? "" : "s"} ${t.role.join(", ")}` : "no role"}`;
  return { reason: `Specificity not established: ${why}; HPA finds the RNA ${hpa.map((h) => h.rnaTissue.specificity.toLowerCase()).join(", ")}, which says where the protein sits but not whether the tumour differs from normal tissue.${hpaS}`, sources: hpaSources(hpa, false) };
}

// ---------------------------------------------------------------------------------------------------------------
// Distribution
// ---------------------------------------------------------------------------------------------------------------
const AGNOSTIC_RE = /(tumou?r|tissue|site|histology)[- ]agnostic|solid tumou?rs? (with|harbou?ring|carrying|that|whose)|(fusion|MSI|dMMR|IHC ?3\+|V600|TMB|mismatch)[^.;]*solid tumou?rs|solid tumou?rs[^.;]*(fusion|MSI|dMMR|IHC ?3\+|V600|TMB|mismatch)/i;
function agnosticEvidence(t: Target, drugs: Drug[]): { yes: boolean; why: string[]; sources: Source[] } {
  const why: string[] = []; const sources: Source[] = [];
  for (const b of readoutsByTarget.get(t.id) ?? []) for (const th of b.thresholds) if (th.status === "current" && AGNOSTIC_CANCER_IDS.has(th.cancerId)) { why.push(`${b.name} threshold "${th.value}" for ${g.get(th.drugId)?.name ?? th.drugId} is tissue-agnostic`); sources.push({ label: `${b.name} label`, url: th.source, note: th.value }); }
  const mention = new RegExp(`\\b(${[t.symbol, t.name, ...t.aka].filter(Boolean).map((s) => s!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "i");
  for (const d of drugs) for (const a of d.approvals) if (AGNOSTIC_RE.test(a.indication) && (d.targets.length === 1 || mention.test(a.indication))) why.push(`${d.name} ${a.region} ${a.year}: "${a.indication.replace(/\s+/g, " ").slice(0, 120)}"`);
  return { yes: why.length > 0, why: [...new Set(why)], sources };
}

type Dist = { distribution: TargetDistribution; tumourAgnostic: boolean; basis: string; sources: Source[] };
function distribution(t: Target, drugs: Drug[], ot: OtAssoc | null, ensembls: string[]): Dist {
  const evidence = new Map<string, Set<string>>();
  const add = (cancerId: string, why: string) => { if (!cancersById.has(cancerId) || AGNOSTIC_CANCER_IDS.has(cancerId)) return; const fam = familyOf(cancerId); (evidence.get(fam) ?? evidence.set(fam, new Set()).get(fam)!).add(why); };
  for (const p of t.prevalence) add(p.cancerId, "prevalence row");
  for (const c of t.cancers) add(c, "linked cancer");
  for (const b of readoutsByTarget.get(t.id) ?? []) for (const th of b.thresholds) if (th.status === "current") add(th.cancerId, "label threshold");
  const approvals = new Map<string, Set<string>>();
  for (const d of drugs) if (d.targets.length === 1 && (d.status === "approved" || d.status === "standard-of-care" || d.status === "established" || d.approvals.length)) for (const c of d.cancers) { if (!cancersById.has(c) || AGNOSTIC_CANCER_IDS.has(c)) continue; const fam = familyOf(c); (approvals.get(fam) ?? approvals.set(fam, new Set()).get(fam)!).add(`approval of ${d.name}`); }
  // A single-target medicine's approvals count only where the target itself has no prevalence row, threshold or catalogue link: imatinib's GIST label says nothing about BCR::ABL1.
  if (!evidence.size) for (const [fam, why] of approvals) evidence.set(fam, why);
  const approvalOnly = [...approvals.keys()].filter((f) => !evidence.has(f)).map((f) => FAMILY_NAME[f] ?? cancersById.get(f)?.name ?? f);
  const agn = agnosticEvidence(t, drugs);
  const weight = (why: Set<string>) => (why.has("prevalence row") ? 4 : 0) + (why.has("label threshold") ? 3 : 0) + ([...why].some((w) => w.startsWith("approval")) ? 2 : 0) + (why.has("linked cancer") ? 1 : 0);
  const families = [...evidence.keys()].sort((a, b) => weight(evidence.get(b)!) - weight(evidence.get(a)!));
  const famNames = families.map((f) => FAMILY_NAME[f] ?? cancersById.get(f)?.name ?? f);
  const otN = ot?.cancers.length ?? 0;
  const otNames = (ot?.cancers ?? []).slice(0, 6).map((c) => c.name);
  let distribution: TargetDistribution;
  if (agn.yes) distribution = "many-types";
  else if (families.length >= 5) distribution = "many-types";
  else if (families.length >= 2) distribution = "few-types";
  else if (families.length === 1) distribution = "one-type";
  else if (otN >= 5) distribution = "many-types";
  else if (otN >= 2) distribution = "few-types";
  else if (otN === 1) distribution = "one-type";
  else distribution = "not-established";
  const corpus = families.length ? `${families.length} cancer famil${families.length === 1 ? "y" : "ies"} in the corpus carr${families.length === 1 ? "ies" : "y"} a prevalence row, label threshold or catalogue link for it (${famNames.slice(0, 7).join(", ")}${famNames.length > 7 ? " and more" : ""})${approvalOnly.length ? `; approvals of single-target medicines aimed at it also list ${approvalOnly.slice(0, 4).join(", ")}${approvalOnly.length > 4 ? " and more" : ""}, not counted` : ""}` : "no corpus cancer carries a prevalence row, threshold or catalogue link for it";
  const otS = ot ? `; Open Targets associates it with ${otN} specific cancer type${otN === 1 ? "" : "s"} at or above ${OT_MIN}${otNames.length ? ` (${otNames.join(", ")}${otN > 6 ? " and more" : ""})` : ""}` : "";
  const agnS = agn.yes ? `. Tissue-agnostic: ${agn.why.slice(0, 3).join("; ")}` : "";
  const oneNote = distribution === "one-type" && families.length === 1 && otN > 1 ? "; the corpus evidence decides and the Open Targets list is quoted for comparison" : "";
  const basis = `Distribution: ${corpus}${otS}${oneNote}${agnS}.`;
  const sources: Source[] = [...agn.sources, ...ensembls.slice(0, 2).map((e) => ({ label: `Open Targets ${e} associations`, url: `https://platform.opentargets.org/target/${e}/associations`, note: `cancer associations at or above ${OT_MIN} (CC0)` }))];
  return { distribution, tumourAgnostic: agn.yes, basis, sources };
}

// ---------------------------------------------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------------------------------------------
type Row = { specificity?: TargetSpecificity; distribution: TargetDistribution; tumourAgnostic?: true; specificityNote: string; specificitySources: Source[] };
type HpaOut = { version: string; licence: string; genes: HpaGene[] };
/** The side file keeps what the page shows: protein classes that matter, tissues stained high with their cell types, up to 12 medium tissues and 12 cancers. */
function slim(h: HpaGene): HpaGene {
  const tissues = [...new Set(h.normalHigh.map((x) => x.tissue))];
  return {
    ...h,
    proteinClass: h.proteinClass.filter((c) => /Essential|CD markers|FDA approved|membrane|secreted|Cancer-related/.test(c)),
    normalHigh: tissues.map((tissue) => ({ tissue, cellType: h.normalHigh.filter((x) => x.tissue === tissue).map((x) => x.cellType).join(", ") })),
    normalMedium: h.normalMedium.slice(0, 8),
    cancers: [...h.cancers.filter((c) => c.high > 0).slice(0, 8), ...h.cancers.filter((c) => c.high === 0).slice(0, 4)],
  };
}

async function main() {
  const targets = (g.kind("target") as Target[]).filter((t) => t.evidenceTier === "approved-drug" || t.evidenceTier === "clinical-evidence" || drugsFor(t).length > 0).slice(0, MAX);
  console.log(`${targets.length} targets in scope (approved-drug or clinical-evidence tier, or a corpus drug aimed at them)`);
  const genesOf = (t: Target): { symbol: string; ensembl: string }[] => {
    const x = targetXrefs[t.id]?.genes.filter((gn) => gn.ensembl).map((gn) => ({ symbol: gn.symbol, ensembl: gn.ensembl! })) ?? [];
    if (x.length) return x;
    return t.ensembl ? [{ symbol: t.symbol ?? t.name, ensembl: t.ensembl }] : [];
  };
  const want = new Set(targets.flatMap((t) => genesOf(t).map((gn) => gn.ensembl)));
  console.log(`reading HPA for ${want.size} genes`);
  const hpaAll = await readSummary(want);
  await readNormal(hpaAll);
  await readCancer(hpaAll);
  console.log(`HPA rows for ${hpaAll.size} genes`);
  const disease = await uniprotDisease([...hpaAll.values()].map((h) => h.uniprot!).filter(Boolean));
  console.log(`UniProt disease text for ${disease.size} accessions`);

  const rows: Record<string, Row> = {};
  const hpaOut: Record<string, HpaOut> = {};
  const counts: Record<string, number> = {};
  const dcounts: Record<string, number> = {};
  const unclassified: string[] = [];
  let i = 0;
  for (const t of targets) {
    i++;
    const genes = genesOf(t);
    const hpa = genes.map((gn) => hpaAll.get(gn.ensembl)).filter((h): h is HpaGene => !!h);
    const drugs = drugsFor(t);
    let ot: OtAssoc | null = null;
    for (const gn of genes.slice(0, 2)) { const o = await openTargets(gn.ensembl); if (o) ot = ot ? { count: ot.count + o.count, cancers: [...ot.cancers, ...o.cancers.filter((c) => !ot!.cancers.some((x) => x.id === c.id))] } : o; }
    if (i % 50 === 0) console.log(`${i}/${targets.length} ${t.id}`);
    if (hpa.length) hpaOut[t.id] = { version: HPA_VERSION, licence: HPA_LICENCE, genes: hpa.map(slim) };
    const spec = classify(t, hpa, disease, drugs);
    const dist = distribution(t, drugs, ot, genes.map((gn) => gn.ensembl));
    const seen = new Set<string>();
    // A target the atlas, UniProt and Open Targets do not cover (a composite with no Ensembl id) cites its own record's sources.
    const own = [...t.sources, ...t.links].slice(0, 2).map((s) => ({ label: s.label, url: s.url, note: "the target record's own source" }));
    const sources = [...spec.sources, ...dist.sources, ...(spec.sources.length + dist.sources.length ? [] : own)].filter((s) => s.url && !seen.has(s.url) && seen.add(s.url));
    if (!isResult(spec)) {
      unclassified.push(`${t.id} (${t.role.join("/") || t.targetClass}; ${drugs.length} drugs; HPA ${hpa.map((h) => h.rnaTissue.specificity).join("/") || "none"})`);
      rows[t.id] = { distribution: dist.distribution, ...(dist.tumourAgnostic ? { tumourAgnostic: true as const } : {}), specificityNote: `${spec.reason} ${dist.basis} (No rule of scripts/fetch-target-specificity.ts fired.)`, specificitySources: sources };
      counts["not-established"] = (counts["not-established"] ?? 0) + 1;
      dcounts[dist.distribution] = (dcounts[dist.distribution] ?? 0) + 1;
      continue;
    }
    rows[t.id] = { specificity: spec.specificity, distribution: dist.distribution, ...(dist.tumourAgnostic ? { tumourAgnostic: true as const } : {}), specificityNote: `${spec.basis} ${dist.basis} (Rule ${spec.rule} of scripts/fetch-target-specificity.ts.)`, specificitySources: sources };
    counts[spec.specificity] = (counts[spec.specificity] ?? 0) + 1;
    dcounts[dist.distribution] = (dcounts[dist.distribution] ?? 0) + 1;
  }
  console.log("specificity", counts);
  console.log("distribution", dcounts, "tumour-agnostic", Object.values(rows).filter((r) => r.tumourAgnostic).length);
  console.log(`unclassified ${unclassified.length}:`, unclassified.join("\n  "));

  const header = (what: string) => `/**\n * GENERATED by scripts/fetch-target-specificity.ts on ${TODAY}; do not edit by hand, re-run the script (its header lists the\n * sources, licences and rules). ${what}\n */\n`;
  const specFile = `${header(`Specificity and distribution for ${Object.keys(rows).length} targets with an approved or clinical-stage drug:\n * ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(", ")}; ${Object.entries(dcounts).map(([k, v]) => `${k} ${v}`).join(", ")}; tumour-agnostic ${Object.values(rows).filter((r) => r.tumourAgnostic).length}.\n * Merged onto the target records by src/data/index.ts where the record has none of its own. Human Protein Atlas data\n * (version ${HPA_VERSION}) is used under ${HPA_LICENCE}; the HPA rows themselves are in target-expression-hpa.ts.`)}import type { TargetDistribution, TargetSpecificity } from "@/lib/kinds";\n\nexport const TARGET_SPECIFICITY_GENERATED = "${TODAY}";\n\nexport type TargetSpecificityRow = { specificity?: TargetSpecificity; distribution: TargetDistribution; tumourAgnostic?: true; specificityNote: string; specificitySources: { label: string; url: string; note?: string }[] };\n\nexport const targetSpecificity: Record<string, TargetSpecificityRow> = {\n${Object.entries(rows).map(([id, r]) => `  ${JSON.stringify(id)}: ${JSON.stringify(r)},`).join("\n")}\n};\n`;
  const hpaFile = `${header(`Human Protein Atlas rows (version ${HPA_VERSION}, licence ${HPA_LICENCE}, https://www.proteinatlas.org/about/licence) for ${Object.keys(hpaOut).length} targets:\n * RNA tissue, cancer and blood lineage specificity from proteinatlas.tsv; normal tissues with High (and Medium) antibody staining\n * at reliability Approved, Enhanced or Supported from normal_ihc_data.tsv; patients per staining level per cancer type from\n * cancer_data.tsv (rows with any Medium or High staining). Rendered as "Where it is found" on target pages.`)}\nexport const TARGET_EXPRESSION_HPA_VERSION = "${HPA_VERSION}";\nexport const TARGET_EXPRESSION_HPA_LICENCE = "${HPA_LICENCE}";\nexport const TARGET_EXPRESSION_HPA_LICENCE_URL = "https://www.proteinatlas.org/about/licence";\n\nexport type HpaEnriched = { name: string; value: number };\nexport type HpaGeneExpression = {\n  symbol: string; ensembl: string; uniprot?: string;\n  proteinClass: string[];\n  rnaTissue: { specificity: string; distribution: string; enriched: HpaEnriched[] };\n  rnaCancer: { specificity: string; distribution: string; enriched: HpaEnriched[] };\n  bloodLineage: { specificity: string; distribution: string; enriched: HpaEnriched[] };\n  normalHigh: { tissue: string; cellType: string }[];\n  normalMedium: string[];\n  cancers: { cancer: string; high: number; medium: number; low: number; notDetected: number }[];\n};\nexport type TargetHpaExpression = { version: string; licence: string; genes: HpaGeneExpression[] };\n\nexport const targetExpressionHpa: Record<string, TargetHpaExpression> = {\n${Object.entries(hpaOut).map(([id, r]) => `  ${JSON.stringify(id)}: ${JSON.stringify(r)},`).join("\n")}\n};\n`;
  const specPath = APPLY ? join(ROOT, "src/data/target-specificity.ts") : join(CACHE, "target-specificity.preview.ts");
  const hpaPath = APPLY ? join(ROOT, "src/data/target-expression-hpa.ts") : join(CACHE, "target-expression-hpa.preview.ts");
  writeFileSync(specPath, specFile);
  writeFileSync(hpaPath, hpaFile);
  writeFileSync(join(CACHE, "report.json"), JSON.stringify({ generated: TODAY, scope: targets.length, counts, dcounts, unclassified }, null, 2));
  console.log(`wrote ${specPath} (${(specFile.length / 1024).toFixed(0)} KB) and ${hpaPath} (${(hpaFile.length / 1024).toFixed(0)} KB)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
