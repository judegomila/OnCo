/**
 * Bulk ingestion helper: industry lead sponsors of recruiting or active phase 2 and phase 3 interventional
 * oncology trials on ClinicalTrials.gov, with their investigational products, diffed against the corpus.
 *
 *   npx tsx scripts/fetch-ctgov-pipeline.ts [--out=.claude/ctgov-cache] [--no-fetch]
 *
 * Writes <out>/studies.json (raw), <out>/missing-sponsors.json and <out>/missing-products.json.
 * Matching mirrors src/lib/completeness.ts (companyKey, drugKeys) and src/data/sponsor-aliases.ts.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { companyKey, companyKeys, drugKeys, norm } from "../src/lib/completeness";
import { resolveSponsor } from "../src/data/sponsor-aliases";

const OUT = process.argv.find((a) => a.startsWith("--out="))?.slice(6) ?? join(process.cwd(), ".claude", "ctgov-cache");
const NO_FETCH = process.argv.includes("--no-fetch");
mkdirSync(OUT, { recursive: true });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Intervention = { type?: string; name?: string; description?: string; otherNames?: string[] };
type RawStudy = {
  protocolSection?: {
    identificationModule?: { nctId?: string; briefTitle?: string; officialTitle?: string; organization?: { fullName?: string; class?: string } };
    statusModule?: { overallStatus?: string; startDateStruct?: { date?: string }; primaryCompletionDateStruct?: { date?: string } };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string; class?: string }; collaborators?: Array<{ name?: string; class?: string }> };
    designModule?: { phases?: string[]; enrollmentInfo?: { count?: number; type?: string } };
    armsInterventionsModule?: { interventions?: Intervention[] };
    conditionsModule?: { conditions?: string[]; keywords?: string[] };
    contactsLocationsModule?: { centralContacts?: Array<{ email?: string }>; locations?: Array<{ country?: string }> };
  };
  hasResults?: boolean;
};
export type Study = {
  nct: string; briefTitle: string; officialTitle?: string; status: string; phases: string[]; sponsor: string; sponsorClass?: string; org?: string;
  collaborators: string[]; enrollment?: number; enrollmentType?: string; start?: string; primaryCompletion?: string; hasResults: boolean;
  conditions: string[]; keywords: string[]; interventions: Intervention[]; contactDomains: string[]; countries: string[];
};

const FIELDS = ["NCTId", "BriefTitle", "OfficialTitle", "OverallStatus", "StartDate", "PrimaryCompletionDate", "LeadSponsorName", "LeadSponsorClass", "OrgFullName",
  "CollaboratorName", "Phase", "EnrollmentCount", "EnrollmentType", "InterventionType", "InterventionName", "InterventionDescription", "InterventionOtherName",
  "Condition", "Keyword", "CentralContactEMail", "LocationCountry", "HasResults"].join(",");
const BASE = `https://clinicaltrials.gov/api/v2/studies?query.cond=cancer&filter.overallStatus=RECRUITING,ACTIVE_NOT_RECRUITING&aggFilters=phase:2%203,studyType:int&filter.advanced=AREA%5BLeadSponsorClass%5DINDUSTRY&pageSize=1000&fields=${FIELDS}`;

async function getJson<T>(url: string, attempt = 1): Promise<T> {
  const r = await fetch(url, { headers: { Accept: "application/json", "User-Agent": "OnCo/1.0 (github.com/judegomila/OnCo)" } });
  if (r.status === 429 || r.status >= 500) {
    if (attempt >= 5) throw new Error(`HTTP ${r.status} for ${url}`);
    await sleep(1500 * 2 ** attempt);
    return getJson<T>(url, attempt + 1);
  }
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return (await r.json()) as T;
}

function flatten(s: RawStudy): Study | null {
  const p = s.protocolSection;
  const nct = p?.identificationModule?.nctId;
  const sponsor = p?.sponsorCollaboratorsModule?.leadSponsor?.name?.trim();
  if (!nct || !sponsor) return null;
  const domains = new Set<string>();
  for (const c of p?.contactsLocationsModule?.centralContacts ?? []) {
    const d = c.email?.split("@")[1]?.toLowerCase().trim();
    if (d && !/gmail|yahoo|hotmail|outlook|163\.com|qq\.com|126\.com|foxmail|icloud|sina\.com|aliyun/.test(d)) domains.add(d);
  }
  const countries = new Set<string>();
  for (const l of p?.contactsLocationsModule?.locations ?? []) if (l.country) countries.add(l.country);
  return {
    nct, briefTitle: p?.identificationModule?.briefTitle ?? "", officialTitle: p?.identificationModule?.officialTitle,
    status: p?.statusModule?.overallStatus ?? "", phases: p?.designModule?.phases ?? [], sponsor, sponsorClass: p?.sponsorCollaboratorsModule?.leadSponsor?.class,
    org: p?.identificationModule?.organization?.fullName, collaborators: (p?.sponsorCollaboratorsModule?.collaborators ?? []).map((c) => c.name ?? "").filter(Boolean),
    enrollment: p?.designModule?.enrollmentInfo?.count, enrollmentType: p?.designModule?.enrollmentInfo?.type,
    start: p?.statusModule?.startDateStruct?.date, primaryCompletion: p?.statusModule?.primaryCompletionDateStruct?.date, hasResults: Boolean(s.hasResults),
    conditions: p?.conditionsModule?.conditions ?? [], keywords: p?.conditionsModule?.keywords ?? [], interventions: p?.armsInterventionsModule?.interventions ?? [],
    contactDomains: [...domains], countries: [...countries],
  };
}

async function fetchAll(): Promise<Study[]> {
  const out: Study[] = [];
  let token: string | undefined;
  for (let page = 0; page < 20; page++) {
    const j = await getJson<{ studies?: RawStudy[]; nextPageToken?: string }>(`${BASE}${token ? `&pageToken=${token}` : ""}`);
    for (const s of j.studies ?? []) { const f = flatten(s); if (f) out.push(f); }
    console.log(`page ${page + 1}: ${out.length} studies`);
    token = j.nextPageToken;
    if (!token) break;
    await sleep(600);
  }
  return out;
}

// ---- Product name handling -------------------------------------------------------------------------
/** Generic chemotherapy, supportive and comparator agents that are never "investigational products" for this purpose. */
const GENERIC = /^(placebo|saline|standard of care|best supportive care|chemotherapy|physician'?s choice|investigator'?s choice|treatment of physician'?s choice|dexamethasone|prednisone|prednisolone|methylprednisolone|cisplatin|carboplatin|oxaliplatin|paclitaxel|docetaxel|nab-paclitaxel|gemcitabine|capecitabine|5-fu|5-fluorouracil|fluorouracil|leucovorin|levoleucovorin|folinic acid|irinotecan|etoposide|pemetrexed|vinorelbine|vincristine|vinblastine|cyclophosphamide|ifosfamide|doxorubicin|epirubicin|liposomal doxorubicin|daunorubicin|idarubicin|cytarabine|azacitidine|decitabine|fludarabine|bendamustine|melphalan|busulfan|thiotepa|temozolomide|lomustine|dacarbazine|methotrexate|mitomycin|bleomycin|topotecan|eribulin|ixabepilone|trabectedin|lenalidomide|pomalidomide|thalidomide|bortezomib|carfilzomib|rituximab|trastuzumab|pertuzumab|bevacizumab|cetuximab|panitumumab|pembrolizumab|nivolumab|atezolizumab|durvalumab|ipilimumab|tremelimumab|avelumab|cemiplimab|dostarlimab|tislelizumab|toripalimab|sintilimab|camrelizumab|serplulimab|penpulimab|zimberelimab|imatinib|dasatinib|nilotinib|ponatinib|osimertinib|gefitinib|erlotinib|afatinib|crizotinib|alectinib|lorlatinib|brigatinib|sunitinib|sorafenib|pazopanib|axitinib|cabozantinib|lenvatinib|regorafenib|everolimus|temsirolimus|abiraterone|enzalutamide|apalutamide|darolutamide|bicalutamide|leuprolide|leuprorelin|goserelin|degarelix|relugolix|tamoxifen|letrozole|anastrozole|exemestane|fulvestrant|palbociclib|ribociclib|abemaciclib|olaparib|niraparib|rucaparib|talazoparib|venetoclax|ibrutinib|acalabrutinib|zanubrutinib|daratumumab|isatuximab|elotuzumab|obinutuzumab|brentuximab vedotin|polatuzumab vedotin|trastuzumab deruxtecan|trastuzumab emtansine|sacituzumab govitecan|enfortumab vedotin|radiotherapy|radiation therapy|radiation|surgery|observation|hydroxyurea|filgrastim|pegfilgrastim|g-csf|zoledronic acid|denosumab|ondansetron|aprepitant|heparin|aspirin|metformin|vitamin d|calcium|folic acid|water|glucose|sodium chloride|normal saline|dextrose|bcg|mitomycin c|interferon|interleukin-2|aldesleukin|octreotide|lanreotide|dexrazoxane|mesna|atra|tretinoin|arsenic trioxide|all-trans retinoic acid|hydrocortisone|acetaminophen|paracetamol|diphenhydramine|famotidine|ranitidine|loperamide|magnesium|potassium|iron|epoetin|darbepoetin|eltrombopag|romiplostim|tranexamic acid|midazolam|propofol|lidocaine|fentanyl|morphine|oxycodone)$/i;

/** Strip formulation and dose noise: "SHR-A2102 for injection" -> "SHR-A2102"; "Zanidatamab (ZW25) 20 mg/kg" -> "Zanidatamab (ZW25)". */
export function cleanProduct(n: string): string {
  return n
    .replace(/\b\d+(\.\d+)?\s?(mg|mcg|µg|ug|g|ml|mg\/kg|mg\/m2|mg\/m²|iu|units?)\b.*$/i, "")
    .replace(/\b(for )?(injection|infusion|tablets?|capsules?|oral solution|solution|suspension|concentrate|lyophilized powder|powder|granules|film-coated|prolonged-release|sustained-release|extended-release|subcutaneous|intravenous|iv|sc|po|q\dw|qd|bid|arm [a-z]|dose level \w+|cohort \w+|high dose|low dose|standard dose|monotherapy|combination|plus|in combination with|\+)\b.*$/i, "")
    .replace(/[®™]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/[\s,;:(-]+$/g, "")
    .trim();
}

/** Does the name look like a named product (INN-like word or a development code) rather than a generic phrase? */
export function looksNamed(n: string): boolean {
  if (n.length < 3 || n.length > 60) return false;
  if (GENERIC.test(n)) return false;
  if (/\b(arm|cohort|group|regimen|therapy|treatment|care|placebo|control|comparator|vehicle|matching|dose|dosing|schedule|standard|experimental|investigational product|study drug|drug [a-z]|part [a-z0-9])\b/i.test(n) && !/[A-Z]{2,}-?\d{2,}/.test(n)) return false;
  // Development code: letters then digits (SHR-A2102, MK-2870, BNT327, ABBV-400) or INN-like word with a typical stem.
  if (/\b[A-Z]{1,5}-?[A-Z]?\d{2,}[A-Z]?\b/.test(n)) return true;
  if (/^[a-z]+(mab|nib|lisib|ciclib|parib|degib|rafenib|tinib|zomib|stat|platin|tecan|taxel|rubicin|vedotin|deruxtecan|govitecan|mafodotin|tesirine|ozogamicin|leucel|cabtagene|autoleucel|maleucel|tide|sertib|rasib|clax|lutamide|terone|meglumine|pegol|fusp|bart|xizumab|zumab|ximab|umab|omab|cept|kin|ase|vir|pril|dine|mide|sib|cel|gene|vec|mune)\b/i.test(n.split(/\s+/)[0])) return true;
  return false;
}

// ---- Main ----------------------------------------------------------------------------------------------
async function main() {
  const rawPath = join(OUT, "studies.json");
  let studies: Study[];
  if (NO_FETCH && existsSync(rawPath)) studies = JSON.parse(readFileSync(rawPath, "utf8"));
  else { studies = await fetchAll(); writeFileSync(rawPath, JSON.stringify(studies, null, 1)); }
  console.log(`${studies.length} studies`);

  const g = graph();
  // Company keys as completeness.ts builds them.
  const companyKeySet = new Set<string>();
  for (const c of g.kind("company")) for (const k of companyKeys(c)) companyKeySet.add(k);
  const companyMatches = (sponsor: string) => {
    const k = companyKey(sponsor);
    if (companyKeySet.has(k) || companyKeySet.has(norm(sponsor))) return true;
    for (const c of companyKeySet) if (c.length >= 5 && (k.startsWith(c + " ") || k.endsWith(" " + c) || k.includes(" " + c + " "))) return true;
    return false;
  };
  const drugKeySet = new Set<string>();
  for (const d of g.kind("drug")) for (const k of drugKeys(d)) drugKeySet.add(k);
  const drugMatches = (name: string) => {
    const n = norm(name);
    if (drugKeySet.has(n)) return true;
    const codeless = norm(name.replace(/\(.*?\)/g, ""));
    if (codeless.length >= 3 && drugKeySet.has(codeless)) return true;
    for (const m of name.matchAll(/\(([^)]+)\)/g)) if (drugKeySet.has(norm(m[1]))) return true;
    for (const tok of name.match(/\b[A-Z]{1,5}-?[A-Z]?\d{2,}[A-Z]?\b/g) ?? []) if (drugKeySet.has(norm(tok))) return true;
    return false;
  };

  // Sponsors
  type SponsorAgg = { name: string; org?: string; trials: string[]; phase3: number; phase2: number; products: Record<string, number>; conditions: Record<string, number>; domains: Record<string, number>; countries: Record<string, number>; matchedCorpus: boolean; aliasHit?: string };
  const sponsors = new Map<string, SponsorAgg>();
  const inc = (r: Record<string, number>, k: string) => { r[k] = (r[k] ?? 0) + 1; };
  for (const s of studies) {
    const a = sponsors.get(s.sponsor) ?? { name: s.sponsor, org: s.org, trials: [], phase3: 0, phase2: 0, products: {}, conditions: {}, domains: {}, countries: {}, matchedCorpus: companyMatches(s.sponsor), aliasHit: (() => { const r = resolveSponsor(s.sponsor); return r.matched ? (r.id ?? r.label) : undefined; })() };
    a.trials.push(s.nct);
    if (s.phases.includes("PHASE3")) a.phase3++; else a.phase2++;
    for (const i of s.interventions) if ((i.type === "DRUG" || i.type === "BIOLOGICAL") && i.name) { const c = cleanProduct(i.name); if (looksNamed(c)) inc(a.products, c); }
    for (const c of s.conditions) inc(a.conditions, c);
    for (const d of s.contactDomains) inc(a.domains, d);
    for (const c of s.countries) inc(a.countries, c);
    sponsors.set(s.sponsor, a);
  }
  const missingSponsors = [...sponsors.values()].filter((s) => !s.matchedCorpus && !s.aliasHit && s.trials.length >= 2).sort((a, b) => b.trials.length - a.trials.length || a.name.localeCompare(b.name));
  writeFileSync(join(OUT, "sponsors-all.json"), JSON.stringify([...sponsors.values()].sort((a, b) => b.trials.length - a.trials.length), null, 1));
  writeFileSync(join(OUT, "missing-sponsors.json"), JSON.stringify(missingSponsors, null, 1));
  console.log(`${sponsors.size} industry lead sponsors; ${[...sponsors.values()].filter((s) => s.matchedCorpus || s.aliasHit).length} matched; ${missingSponsors.length} missing with >=2 trials`);

  // Products
  type ProductAgg = { name: string; otherNames: string[]; descriptions: string[]; phase3: string[]; phase2: string[]; sponsors: Record<string, number>; conditions: Record<string, number>; inCorpus: boolean };
  const products = new Map<string, ProductAgg>();
  for (const s of studies) {
    for (const i of s.interventions) {
      if (!(i.type === "DRUG" || i.type === "BIOLOGICAL") || !i.name) continue;
      const c = cleanProduct(i.name);
      if (!looksNamed(c)) continue;
      const key = norm(c);
      const a = products.get(key) ?? { name: c, otherNames: [], descriptions: [], phase3: [], phase2: [], sponsors: {}, conditions: {}, inCorpus: drugMatches(c) || (i.otherNames ?? []).some(drugMatches) };
      for (const o of i.otherNames ?? []) if (!a.otherNames.includes(o)) a.otherNames.push(o);
      if (i.description && a.descriptions.length < 4 && !a.descriptions.includes(i.description)) a.descriptions.push(i.description);
      (s.phases.includes("PHASE3") ? a.phase3 : a.phase2).push(s.nct);
      inc(a.sponsors, s.sponsor);
      for (const cond of s.conditions) inc(a.conditions, cond);
      products.set(key, a);
    }
  }
  const missingProducts = [...products.values()].filter((p) => !p.inCorpus).sort((a, b) => b.phase3.length - a.phase3.length || b.phase2.length - a.phase2.length);
  writeFileSync(join(OUT, "products-all.json"), JSON.stringify([...products.values()], null, 1));
  writeFileSync(join(OUT, "missing-products.json"), JSON.stringify(missingProducts, null, 1));
  console.log(`${products.size} named products; ${[...products.values()].filter((p) => p.inCorpus).length} in corpus; ${missingProducts.length} missing (${missingProducts.filter((p) => p.phase3.length).length} with a phase 3 study)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
