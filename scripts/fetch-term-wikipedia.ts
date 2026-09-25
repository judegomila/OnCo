/**
 * Fill `wikipedia` on glossary terms that lack one (the `term-wikipedia` health gauge), from English Wikipedia alone.
 * Nothing is guessed: a term gets a link only when an article title or redirect equals the term's name, its name
 * without a trailing "(abbreviation)" part, or one of its `aka` exactly (case-insensitive), and the article's short
 * description or first sentence is about the medical or biological sense.
 *
 * Per term, three kinds of request, one at a time and PACE_MS apart, responses cached under /tmp/wikipedia-cache:
 *   1. action API `query&titles=...&redirects=1` for every candidate (chunks of 50): which titles exist, and where
 *      the redirects land;
 *   2. action API `list=search` for the name (and the stripped name): a result title equal to a candidate, ignoring
 *      case, catches spellings the title lookup missed (MediaWiki only normalises the first letter);
 *   3. REST `page/summary/<title>` for each surviving article, in candidate order, until one passes the sense check.
 *
 * Sense check (all must hold): summary type is "standard" (disambiguation pages are rejected); the description and
 * first sentence do not read as a person, place, work or organisation (PERSON_PLACE_WORK); the description plus
 * extract mention a medical or biological word (MEDICAL); and when the match came from an alias rather than the
 * name, the extract also contains a distinctive word of the term's name, so "SCA" cannot pull in an unrelated
 * ataxia article for a chromosomal-aberration term. Composite terms (a name with a parenthetical list, a colon, a
 * comma, "and" or "versus", such as "MPN driver mutations (JAK2 V617F, CALR, MPL) and allele burden") accept only
 * name-based matches: their aliases name components, and a gene article is not an article about the marker set.
 * Terms whose candidates all fail are listed at the end in a ready-to-paste block; those reviewed by hand and
 * rejected go into SKIP with the reason, and are never retried.
 *
 * The link is inserted into the term's source file right after its `id` field (the same helper the enrich scripts
 * use); records whose id text appears more than once fall back to the line that also carries `name:`, and linker
 * terms, whose id line is a registry row in payloads.ts, get the field in their LINKER_TEXT entry in adc-chemistry.ts.
 * Terms in SKIP that carry neither `wikipedia` nor `wikipediaChecked` get `wikipediaChecked: <--date, default today>`,
 * the "looked up, no article exists" state the term-wikipedia gauge counts as explained and the term page shows as
 * "No Wikipedia article". Decisions go to --out (default /tmp/fetch-term-wikipedia.json). Usage:
 *   npx tsx scripts/fetch-term-wikipedia.ts [--dry-run] [--only=id,id] [--date=YYYY-MM-DD] [--out=/tmp/fetch-term-wikipedia.json]
 *   npx tsx scripts/fetch-term-wikipedia.ts --gauge      # print the term-wikipedia gauge and exit
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { graph } from "../src/lib/graph";
import type { Term } from "../src/lib/schema";

const ROOT = join(__dirname, "..");
const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const str = (flag: string, d: string) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? a.slice(flag.length + 3) : d; };
const OUT = str("out", "/tmp/fetch-term-wikipedia.json");
const ONLY = new Set(str("only", "").split(",").filter(Boolean));
/** Date written to `wikipediaChecked` for SKIP terms; the day the absence was last confirmed. */
const CHECKED = str("date", new Date().toISOString().slice(0, 10));
if (!/^\d{4}-\d{2}-\d{2}$/.test(CHECKED)) throw new Error(`--date must be YYYY-MM-DD, got ${CHECKED}`);
const CACHE = "/tmp/wikipedia-cache";
const PACE_MS = 200;
const UA = "OnCo glossary Wikipedia links (https://onco.world; contact via site)";
const ACTION = "https://en.wikipedia.org/w/api.php";
const REST = "https://en.wikipedia.org/api/rest_v1/page/summary/";

/**
 * Terms reviewed by hand after a run and left without a link, with the reason. Keys are term ids; a term listed
 * here is not looked up again. Reasons: "no article" (nothing by that name or any alias), "wrong sense" (the only
 * exact match is another meaning), "disambiguation" (the exact match is a disambiguation page), "part only" (the
 * only match is an article about one component of a composite term, which would misrepresent the term).
 */
export const SKIP: Record<string, string> = {
  "1p19q-codeletion": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "aml-myelodysplasia-related": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "b-all-cytogenetic-risk": "part only: \"hypodiploid ALL\" -> Hypodiploid acute lymphoblastic leukemia (part only); \"CNS2\" -> List of airports in Ontario (part only)",
  "bcg-unresponsive": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "abl1-kinase-domain-mutations": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "brca-reversion-mutations": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "btki-bcl2i-resistance-mutations": "part only: \"PLCG2\" -> PLCG2 (part only)",
  "cancer-in-pregnancy": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "centralisation": "part only: \"centralisation\" -> Centralisation (part only); \"regionalisation\" -> Regionalisation (part only); \"centers of excellence\" -> Center of excellence (part only)",
  "china-hgr-rules": "part only: \"HGR\" -> HGR (part only)",
  "cll-ipi": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "de-escalation": "part only: \"de-escalation\" -> De-escalation (part only); \"intensification\" -> Intensification (part only); \"less is more\" -> Less is more (part only)",
  "depth-of-invasion": "part only: \"DOI\" -> DOI (part only); \"SM1\" -> SM1 (part only); \"SM2\" -> SM2 (part only)",
  "dipss-mipss70": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "disease-volume-chaarted": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "dose-limiting-toxicity": "part only: \"DLT\" -> DLT (part only)",
  "biomarker-stratified-design": "part only: \"predictive biomarker\" -> Biomarker (part only)",
  "ependymoma-molecular-groups": "part only: \"EZHIP\" -> EZH inhibitory protein (part only)",
  "eu-hta-regulation": "part only: \"HTAR\" -> Arusha Airport (part only); \"JCA\" -> JCA (part only)",
  "eu-pharma-package": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "extent-of-resection": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "extranodal-extension": "part only: \"ENE\" -> Ene (part only); \"ECS\" -> ECS (part only)",
  "fdora-2022": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "foxo1-fusion-status": "part only: \"alveolar rhabdomyosarcoma\" -> Alveolar rhabdomyosarcoma (part only); \"embryonal rhabdomyosarcoma\" -> Embryonal rhabdomyosarcoma (part only)",
  "france-early-access": "part only: \"ATU\" -> ATU (part only)",
  "gist-risk-stratification": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "graded-prognostic-assessment": "part only: \"GPA\" -> Grading in education (part only)",
  "histological-response-induction": "part only: \"poor responder\" -> Controlled ovarian hyperstimulation (part only)",
  "hydrophilic-next-gen": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "ilap": "part only: \"EAMS\" -> EAMS (part only)",
  "irae": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "immunonutrition": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "innovative-medicines-fund": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "interferon-gamma-signature": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "ipset-thrombosis": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "japan-conditional-early-approval": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "major-pathological-response": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "malnutrition-screening": "part only: \"MUST\" -> Must (disambiguation) (part only)",
  "mcode": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "medicare-ced": "part only: \"national coverage determination\" -> National coverage determination, a stub on the parent instrument that never mentions coverage with evidence development",
  "medicines-medical-devices-act-2021": "part only: \"Human Medicines Regulations 2012\" -> Human Medicines Regulations 2012 (part only); \"Medicines Act 1968\" -> Medicines Act 1968 (part only)",
  "met-exon-14-skipping": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "curie-siopen-score": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "mipi": "wrong sense: \"MIPI\" -> MIPI Alliance (wrong sense)",
  "mlh1-promoter-methylation": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "mpn-driver-mutations": "part only: \"CALR\" -> CALR (part only)",
  "nice-methods": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "nsmp": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "oligometastatic": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "oligoprogression": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "ovarian-function-suppression": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "pcr": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "ph-like-all": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "pretext-chic": "part only: \"CHIC\" -> Chic (part only)",
  "project-frontrunner": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "project-optimus": "disambiguation: \"Optimus\" -> Optimus (disambiguation)",
  "project-orbis": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "psa-kinetics": "part only: \"PSAD\" -> Persistent genital arousal disorder (part only)",
  "race-for-children-act": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "real-time-oncology-review": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "registry-based-trial": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "eu-orphan-regulation": "part only: \"COMP\" -> Comp (part only)",
  "eu-paediatric-regulation": "part only: \"PIP\" -> Pip (part only); \"PUMA\" -> Puma (part only)",
  "eu-regulation-726-2004": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "rcb": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "sdh-deficiency": "part only: \"SDHA\" -> SDHA (part only); \"Carney-Stratakis syndrome\" -> Carney triad (part only)",
  "segmental-chromosomal-aberrations": "part only: \"SCA\" -> SCA (part only); \"NCA\" -> NCA (part only)",
  "sclc-molecular-subtypes": "part only: \"ASCL1\" -> ASCL1 (part only); \"NEUROD1\" -> NEUROD1 (part only); \"POU2F3\" -> POU2F3 (part only); \"SLFN11\" -> SLFN11 (part only)",
  "sokal-elts-scores": "part only: \"Sokal\" -> Sokal (part only)",
  "ss18-ssx-fusion": "part only: \"TLE1\" -> TLE1 (part only)",
  "state-biomarker-testing-laws": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "tumour-informed-assay": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "umbrella-trial": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  "uveal-melanoma-prognostic-markers": "part only: \"GNAQ\" -> GNAQ (part only); \"GNA11\" -> GNA11 (part only); \"DecisionDx-UM\" -> DecisionDx-UM (part only); \"EIF1AX\" -> EIF1AX (part only); \"PLCB4\" -> PLCB4 (part only); ...",
  "wilms-risk-markers": "no article: neither the name, the name without its abbreviation, nor any alias is a title or redirect",
  // Checked 2026-09-25: the wave of spike glossaries and patient-guidance terms. Each is a composite the English
  // Wikipedia has no article for (a symptom-control page, a UK benefits page, a bioinformatics file format or
  // tool name); none of the name, the name without its abbreviation, or any alias is a title or a redirect.
  "trial-or-standard-treatment-biliary": "no article: no candidate is a title or redirect",
  "anndata-h5ad": "no article: no candidate is a title or redirect",
  "biliary-stent-problems": "no article: no candidate is a title or redirect",
  "cancer-ai-vocabulary": "no article: no candidate is a title or redirect",
  "caps-consortium-pancreatic-screening": "no article: no candidate is a title or redirect",
  "carers-gallbladder-cancer-uk": "no article: no candidate is a title or redirect",
  "carers-bowel-cancer-uk": "no article: no candidate is a title or redirect",
  "citation-cff": "no article: no candidate is a title or redirect",
  "colorectal-uk-drug-access": "no article: no candidate is a title or redirect",
  "colorectal-trials-open-today": "no article: no candidate is a title or redirect",
  "colorectal-failed-programmes": "no article: no candidate is a title or redirect",
  "compass-study-pancreatic": "no article: no candidate is a title or redirect",
  "detect-a-study": "no article: no candidate is a title or redirect",
  "drug-response-splits": "no article: no candidate is a title or redirect",
  "eating-after-gallbladder-removal": "no article: no candidate is a title or redirect",
  "emotional-support-cancer-uk": "no article: no candidate is a title or redirect",
  "gallbladder-cancer-in-biliary-trials": "no article: no candidate is a title or redirect",
  "genomic-and-protein-language-models": "no article: no candidate is a title or redirect",
  "gistic": "no article: no candidate is a title or redirect",
  "hair-loss-and-scalp-cooling-breast": "no article: no candidate is a title or redirect",
  "genomic-testing-biliary-uk": "no article: no candidate is a title or redirect",
  "her2-testing-in-biliary-cancer": "no article: no candidate is a title or redirect",
  "intracholecystic-papillary-tubular-neoplasm": "no article: no candidate is a title or redirect",
  "kras-allelic-imbalance": "no article: no candidate is a title or redirect",
  "adc-side-effects-breast": "no article: no candidate is a title or redirect",
  "chemotherapy-side-effects-pancreatic": "no article: no candidate is a title or redirect",
  "chemotherapy-side-effects-colorectal": "no article: no candidate is a title or redirect",
  "jaundice-and-itch-biliary": "no article: no candidate is a title or redirect",
  "lynch-syndrome-testing-uk": "no article: no candidate is a title or redirect",
  "menopause-after-chemotherapy-breast": "no article: no candidate is a title or redirect",
  "metaplasia-dysplasia-carcinoma-sequence": "no article: no candidate is a title or redirect",
  "model-card": "no article: no candidate is a title or redirect",
  "mutsig": "no article: no candidate is a title or redirect",
  "ncit": "no article: no candidate is a title or redirect",
  "oncotree-term": "no article: no candidate is a title or redirect",
  "pain-with-biliary-cancer": "no article: no candidate is a title or redirect",
  "tnbc-symptom-control-palliation": "no article: no candidate is a title or redirect",
  "colorectal-palliation-obstruction-pain": "no article: no candidate is a title or redirect",
  "pancreatic-palliation-obstruction-pain-nutrition": "no article: no candidate is a title or redirect",
  "pancreatic-cancer-uk-drug-access": "no article: no candidate is a title or redirect",
  "pancreatic-trials-open-today": "no article: no candidate is a title or redirect",
  "pancreatic-failed-programmes": "no article: no candidate is a title or redirect",
  "prophylactic-cholecystectomy": "no article: no candidate is a title or redirect",
  "tnbc-residual-disease-decision": "no article: no candidate is a title or redirect",
  "salmonella-typhi-gallbladder-cancer": "no article: no candidate is a title or redirect",
  "sex-fertility-after-bowel-cancer": "no article: no candidate is a title or redirect",
  "single-cell-foundation-models": "no article: no candidate is a title or redirect",
  "spagcn": "no article: no candidate is a title or redirect",
  "star-salmon": "no article: no candidate is a title or redirect",
  "stent-or-bypass-for-jaundice": "no article: no candidate is a title or redirect",
  "tcga-barcode": "no article: no candidate is a title or redirect",
  "tcga-tiers": "no article: no candidate is a title or redirect",
  "tnbc-trials-open-today": "no article: no candidate is a title or redirect",
  "tumour-purity": "no article: no candidate is a title or redirect",
  "units-ontology": "no article: no candidate is a title or redirect",
  "weight-loss-and-fat-digestion-biliary": "no article: no candidate is a title or redirect",
  "urgent-help-gallbladder-cancer": "no article: no candidate is a title or redirect",
  "urgent-help-pancreatic-cancer": "no article: no candidate is a title or redirect",
  "urgent-help-tnbc": "no article: no candidate is a title or redirect",
};

/** Words that mark a person, place, creative work or organisation in a description or first sentence. */
const PERSON_PLACE_WORK = /\b(born|died|footballer|politician|actor|actress|singer|musician|band|album|song|film|novel|poet|writer|village|town|city|river|municipality|district|county|surname|given name|television|magazine|newspaper|record label|video game|comics?)\b/i;
/** Words that mark the medical or biological sense. */
const MEDICAL = /cancer|tumou?r|oncolog|carcinom|sarcom|leuka?em|lymphom|myelo|melanom|neoplas|clinical|medic|disease|patient|\bgenes?\b|genetic|mutation|chromosom|protein|\bcells?\b|therap|treatment|diagnos|\bdrugs?\b|pharmac|surg|patholog|radiat|biolog|immun|regulat|health|hospital|nutrition|prognos|mortality|metasta|molecular|antibod|enzyme|receptor|\bdna\b|\brna\b|trial|blood|bone|organ\b|liver|kidney|lung|prostate|breast|brain|lesion|malignan|benign|infect|inflamm|syndrome|screening|biomarker|assay|resect|chemo|randomi[sz]|epidemiolog|toxicit|dose|approv/i;
const STOP = new Set(["versus", "and", "the", "for", "with", "from", "into", "score", "scores", "group", "groups", "risk", "criteria", "status", "class", "classes", "markers", "marker", "rules", "reform", "reforms", "based", "related", "specific", "other", "others", "formerly", "joint", "proposal", "general", "system", "systems", "index", "disease", "cancer", "tumour", "tumor", "assessment", "response", "syndrome", "mutation", "mutations", "gene", "genes"]);

const FILES = sourceFiles().map((p) => relative(ROOT, p));
function sourceFiles(dir = join(ROOT, "src/data")): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (name !== "i18n") out.push(...sourceFiles(p)); continue; }
    if (name.endsWith(".ts") && !name.endsWith(".test.ts")) out.push(p);
  }
  return out;
}

// ---------- polite, cached HTTP ----------
let last = 0;
async function getJson<T>(url: string): Promise<T> {
  mkdirSync(CACHE, { recursive: true });
  const key = join(CACHE, createHash("sha1").update(url).digest("hex") + ".json");
  if (existsSync(key)) return JSON.parse(readFileSync(key, "utf8")) as T;
  const wait = last + PACE_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  last = Date.now();
  const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (r.status === 404) { writeFileSync(key, "null"); return null as T; }
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  const text = await r.text();
  writeFileSync(key, text);
  return JSON.parse(text) as T;
}
const action = <T>(params: Record<string, string>) => getJson<T>(`${ACTION}?${new URLSearchParams({ format: "json", formatversion: "2", ...params })}`);

type Summary = { type: string; title: string; description?: string; extract?: string; content_urls?: { desktop?: { page?: string } } };
type Query = { query?: { normalized?: { from: string; to: string }[]; redirects?: { from: string; to: string }[]; pages?: { title: string; missing?: boolean }[]; search?: { title: string }[] } };

// ---------- matching ----------
const norm = (s: string) => s.replace(/[_\s]+/g, " ").trim().toLowerCase();
const strippedName = (name: string) => name.replace(/\s*\([^()]*\)\s*$/, "").trim();
/** A name that bundles several concepts; its aliases are components, so only the name itself may match. */
const composite = (name: string) => /[(:,]|\band\b|\bversus\b/.test(name);
/** Candidate titles in priority order: the name, the name without its trailing parenthetical, then the aliases. */
function candidates(t: Term): { text: string; fromName: boolean }[] {
  const out: { text: string; fromName: boolean }[] = [{ text: t.name, fromName: true }];
  const s = strippedName(t.name);
  if (s !== t.name) out.push({ text: s, fromName: true });
  for (const a of t.aka) out.push({ text: a, fromName: false });
  const seen = new Set<string>();
  return out.filter((c) => c.text.length >= 3 && !/^\d+$/.test(c.text) && !seen.has(norm(c.text)) && seen.add(norm(c.text)));
}
/** Distinctive words of the name (five or more letters, not a stopword) that an alias-matched extract must mention. */
function distinctive(name: string): string[] {
  return [...new Set(name.toLowerCase().match(/[a-z][a-z0-9-]{4,}/g) ?? [])].filter((w) => !STOP.has(w));
}
function mentions(text: string, words: string[]): string | null {
  const t = text.toLowerCase();
  return words.find((w) => t.includes(w) || t.includes(w.replace(/e?s$/, ""))) ?? null;
}

type Decision = { id: string; name: string; status: "added" | "skip" | "none" | "rejected" | "file"; wikipedia?: string; via?: string; title?: string; note: string; rejected?: { title: string; via: string; reason: string }[] };

/** Resolve every candidate to an existing article title (following redirects), via the title lookup and the search endpoint. */
async function resolve(t: Term, cands: { text: string; fromName: boolean }[]): Promise<Map<string, { title: string; via: string; fromName: boolean }>> {
  const found = new Map<string, { title: string; via: string; fromName: boolean }>();
  for (let i = 0; i < cands.length; i += 50) {
    const chunk = cands.slice(i, i + 50);
    const j = await action<Query>({ action: "query", titles: chunk.map((c) => c.text).join("|"), redirects: "1" });
    const to = new Map<string, string>();
    for (const n of j.query?.normalized ?? []) to.set(n.from, n.to);
    for (const r of j.query?.redirects ?? []) to.set(r.from, r.to);
    const exists = new Set((j.query?.pages ?? []).filter((p) => !p.missing).map((p) => p.title));
    for (const c of chunk) {
      let title = c.text;
      for (let hop = 0; hop < 4 && to.has(title); hop++) title = to.get(title)!;
      if (exists.has(title) && !found.has(norm(c.text))) found.set(norm(c.text), { title, via: c.text, fromName: c.fromName });
    }
  }
  // Search: a result title equal to a candidate, ignoring case, for spellings the title lookup missed.
  const byNorm = new Map(cands.map((c) => [norm(c.text), c]));
  for (const q of [...new Set([t.name, strippedName(t.name)])]) {
    const j = await action<Query>({ action: "query", list: "search", srsearch: q, srlimit: "10", srprop: "" });
    for (const s of j.query?.search ?? []) {
      const c = byNorm.get(norm(s.title));
      if (c && !found.has(norm(c.text))) found.set(norm(c.text), { title: s.title, via: c.text, fromName: c.fromName });
    }
  }
  return found;
}

function senseCheck(s: Summary | null, fromName: boolean, name: string): string | null {
  if (!fromName && composite(name)) return "part only: alias of a composite term";
  if (!s) return "no summary";
  if (s.type !== "standard") return `type ${s.type}`;
  const head = `${s.description ?? ""}. ${(s.extract ?? "").split(/(?<=\.)\s/)[0] ?? ""}`;
  const m = PERSON_PLACE_WORK.exec(head);
  if (m) return `reads as person/place/work (${m[0]})`;
  if (!MEDICAL.test(`${s.description ?? ""} ${s.extract ?? ""}`)) return `not the medical sense: ${s.description ?? (s.extract ?? "").slice(0, 80)}`;
  if (!fromName && !mentions(`${s.description ?? ""} ${s.extract ?? ""}`, distinctive(name))) return `alias match, extract does not mention the term: ${s.description ?? (s.extract ?? "").slice(0, 80)}`;
  return null;
}

async function decide(t: Term): Promise<Decision> {
  const base = { id: t.id, name: t.name };
  const cands = candidates(t);
  const found = await resolve(t, cands);
  if (!found.size) return { ...base, status: "none", note: "no article: no candidate is a title or redirect" };
  const rejected: { title: string; via: string; reason: string }[] = [];
  const tried = new Set<string>();
  for (const c of cands) {
    const f = found.get(norm(c.text));
    if (!f || tried.has(f.title)) continue;
    tried.add(f.title);
    const s = await getJson<Summary | null>(REST + encodeURIComponent(f.title.replace(/ /g, "_")));
    const reason = senseCheck(s, f.fromName, t.name);
    if (reason) { rejected.push({ title: f.title, via: f.via, reason }); continue; }
    const url = s!.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encodeURI(f.title.replace(/ /g, "_"))}`;
    return { ...base, status: "added", wikipedia: url, via: f.via, title: f.title, note: `${f.fromName ? "name" : "alias"} "${f.via}" -> ${f.title}: ${s!.description ?? ""}`, rejected };
  }
  const kinds = new Set(rejected.map((r) => (r.reason.startsWith("type") ? "disambiguation" : r.reason.startsWith("part only") ? "part only" : "wrong sense")));
  return { ...base, status: "rejected", note: `${[...kinds].join("/")}: ${rejected.map((r) => `${r.via} -> ${r.title} (${r.reason})`).join("; ")}`, rejected };
}

// ---------- writing ----------
const texts = new Map<string, string>();
const fileText = (f: string) => { if (!texts.has(f)) texts.set(f, readFileSync(join(ROOT, f), "utf8")); return texts.get(f)!; };
/**
 * Insert a field right after the record's `id` in its source file. With several id lines (lookup tables repeat term
 * ids), the one whose line carries the term's exact `name:` wins, then any line carrying `name:`.
 */
function insertField(id: string, field: string, value: string, name: string): boolean {
  const re = new RegExp(`\\bid: "${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",`, "g");
  const hits: { file: string; index: number }[] = [];
  for (const f of FILES) for (const m of fileText(f).matchAll(re)) hits.push({ file: f, index: m.index! });
  const line = (h: { file: string; index: number }) => { const src = fileText(h.file); const eol = src.indexOf("\n", h.index); return src.slice(h.index, eol < 0 ? undefined : eol); };
  let pick = hits;
  if (pick.length > 1) pick = hits.filter((h) => line(h).includes(` name: ${JSON.stringify(name)},`));
  if (pick.length !== 1 && hits.length > 1) pick = hits.filter((h) => line(h).includes(" name: \""));
  if (pick.length !== 1) { console.warn(`  ! ${id}: id text not unique (${hits.map((h) => h.file).join(", ") || "none"})`); return false; }
  let { file, index } = pick[0];
  let re2 = re;
  if (file === "src/data/payloads.ts") {
    // A linker or payload registry row, not a term record: the term fields live in the text maps in adc-chemistry.ts.
    file = "src/data/adc-chemistry.ts";
    re2 = new RegExp(`^  "?${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"?: \\{`, "gm");
    const m = [...fileText(file).matchAll(re2)];
    if (m.length !== 1) { console.warn(`  ! ${id}: no single text entry in ${file}`); return false; }
    index = m[0].index!;
  }
  const src = fileText(file);
  const end = index + src.slice(index).match(re2)![0].length;
  texts.set(file, `${src.slice(0, end)} ${field}: "${value}",${src.slice(end)}`);
  if (!DRY) writeFileSync(join(ROOT, file), texts.get(file)!);
  return true;
}

async function main() {
  const g = graph();
  const terms = g.kind("term") as Term[];
  if (args.includes("--gauge")) {
    const linked = terms.filter((t) => t.wikipedia).length;
    const absent = terms.filter((t) => !t.wikipedia && t.wikipediaChecked).length;
    console.log(`term-wikipedia: ${linked + absent} of ${terms.length} explained (${linked} linked, ${absent} have no article, ${terms.length - linked - absent} not yet looked up)`);
    return;
  }
  const todo = terms.filter((t) => !t.wikipedia && (ONLY.size ? ONLY.has(t.id) : true));
  const decisions: Decision[] = [];
  const counts = { added: 0, skip: 0, checked: 0, none: 0, rejected: 0, file: 0 };
  for (const t of todo) {
    if (SKIP[t.id] && !ONLY.size) {
      const d: Decision = { id: t.id, name: t.name, status: "skip", note: SKIP[t.id] };
      if (!t.wikipediaChecked) {
        if (insertField(t.id, "wikipediaChecked", CHECKED, t.name)) { counts.checked++; d.note = `wikipediaChecked: ${CHECKED}; ${d.note}`; console.log(`checked  ${t.id}: ${d.note}`); }
        else { d.status = "file"; counts.file++; }
      }
      decisions.push(d); counts.skip++; continue;
    }
    const d = await decide(t);
    if (d.status === "added" && !insertField(t.id, "wikipedia", d.wikipedia!, t.name)) { d.status = "file"; }
    counts[d.status]++;
    decisions.push(d);
    console.log(`${d.status.padEnd(8)} ${t.id}: ${d.note}`);
  }
  writeFileSync(OUT, JSON.stringify({ ranAt: new Date().toISOString(), counts, decisions }, null, 2));
  console.log(`\nterm-wikipedia: ${counts.added} added${DRY ? " (dry run, nothing written)" : ""}, ${counts.skip} in SKIP (${counts.checked} newly marked wikipediaChecked ${CHECKED}), ${counts.none} with no article, ${counts.rejected} rejected on sense, ${counts.file} not writable; log at ${OUT}`);
  const open = decisions.filter((d) => d.status === "none" || d.status === "rejected");
  if (open.length) {
    console.log("\nUnresolved (review, then add to SKIP with the reason):");
    for (const d of open) console.log(`  "${d.id}": ${JSON.stringify(d.note.slice(0, 160))},`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
