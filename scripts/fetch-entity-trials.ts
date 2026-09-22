/**
 * Wave 5 of docs/CONTENT-ROADMAP.md, second half: registry trials for the drugs and technologies that have none.
 *
 * For every drug (or technology) with no trial in the corpus, ClinicalTrials.gov API v2 is searched by the record's own
 * name and aliases, restricted to interventional studies. A study is kept only when all of these hold:
 *
 *   phase        phase 2, 3 or 2/3. For a drug that carries a target and has no such study, phase 1 and 1/2 studies are
 *                accepted as a fallback; technologies never fall back. Withdrawn studies are never evidence.
 *   intervention for a drug, the registry's intervention list names the drug by a whole normalised name, brand, code or
 *                alias (scripts share src/lib/completeness drugKeys, so salts and FDA suffixes do not matter; a key shared
 *                by two drugs is ambiguous and never matches). For a technology, its name (or a part of it, or an alias)
 *                appears as a whole phrase in an intervention name or other name, or in the official or brief title;
 *                keys under five characters, generic words (software, therapy, test) and one-word keys matched only in a
 *                title are not enough. Many technology records are platform or supply-chain names (foundation models,
 *                manufacturing, supporting infrastructure, mathematical models); these are skipped with the reason.
 *   condition    at least one registry condition names a corpus cancer by a whole phrase (name, alias or their parts in
 *                either spelling). Single generic words ("advanced", "recurrent", "lymphoma", "neoplasms") are stop words,
 *                and a phrase that several cancers share goes to the cancers whose own name carries it.
 *
 * Cap three studies an entity: phase 3 first, then 2/3, then 2 (then the fallback phases); within a phase, studies whose
 * brief title names the entity, then recruiting or active studies, then those with results, then the largest. A study the
 * corpus already holds (same NCT id, anywhere) is linked through entityTrialLinksWave5, not rewritten. New records go to
 * src/data/trials-entities-wave5.ts with drugs, technologies, cancers and companies set to the corpus records the registry
 * fields matched; the lead sponsor becomes a company link only on an exact company name or alias (companyKeys), never by
 * pattern. The entity's own `trials` array gains the same ids through entityTrialsWave5 (merged by src/data/index.ts), so
 * the new record has an inbound link and the orphan ratchet (src/data/orphans.test.ts) holds. Entities with no kept study
 * are written to ENTITY_TRIAL_SKIP with the reason so the next run does not ask again.
 *
 *   npx tsx scripts/fetch-entity-trials.ts --kind=drug                    dry run
 *   npx tsx scripts/fetch-entity-trials.ts --kind=technology --apply --max=100
 *   npx tsx scripts/fetch-entity-trials.ts --kind=drug --only=cediranib,ceritinib --debug
 *
 * Requests go through scripts/wave6-shared.ts: ClinicalTrials.gov only, one at a time, 250 ms apart, a User-Agent naming
 * OnCo, raw responses cached under /tmp/ctgov-cache. --force refetches. Nothing is written without --apply.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { companyKey, companyKeys, drugKeys, nameParts, norm } from "../src/lib/completeness";
import type { Cancer, Company, Drug, Technology, Trial, TrialInput } from "../src/lib/schema";
import { ENTITY_TRIAL_SKIP, entityTrialLinksWave5, entityTrialsWave5, trialsEntitiesWave5 } from "../src/data/trials-entities-wave5";
import { today } from "./feed-utils";
import { clean, ctgovSearch, esc, houseDashes, requestCount, withUsSpelling, type CtgovStudy } from "./wave6-shared";

const DATA_FILE = join(process.cwd(), "src", "data", "trials-entities-wave5.ts");
const TRIAL_CAP = 3;
const MAX_QUERY_KEYS = 3;
const MAX_CANCERS = 6;

const args = process.argv.slice(2);
const KIND = (args.find((a) => a.startsWith("--kind="))?.slice(7) ?? "drug") as "drug" | "technology";
if (KIND !== "drug" && KIND !== "technology") { console.error("--kind must be drug or technology"); process.exit(1); }
const PLURAL = KIND === "drug" ? "drugs" : "technologies";
const APPLY = args.includes("--apply");
const DEBUG = args.includes("--debug");
const FORCE = args.includes("--force");
const MAX = Number(args.find((a) => a.startsWith("--max="))?.slice(6) ?? Infinity);
const ONLY = args.find((a) => a.startsWith("--only="))?.slice(7).split(",").filter(Boolean);

/** An alias that names a drug class is not a name of the drug (wave 2). */
const CLASS_WORD = /\b(agonists?|antagonists?|inhibitors?|blockers?|antibod(y|ies)|analog(ue)?s?|vaccines?|therap(y|ies)|agents?|regimens?|chemotherapy|conjugates?|modulators?|placebo|standard of care|biosimilars?|progestins?|generic)\b/i;
/** Technology records that name a platform, a model, a supplier or a piece of infrastructure rather than something a trial administers. */
const TECH_SKIP_TAGS: Record<string, string> = {
  "foundation-model": "a foundation model, not a trial intervention", "mathematical-model": "a mathematical model, not a trial intervention", "manufacturing-wave": "a manufacturing or supply-chain record, not a trial intervention",
  supporting: "supporting infrastructure, not a trial intervention", infrastructure: "infrastructure, not a trial intervention", "virtual-cell": "a virtual-cell model, not a trial intervention", benchmark: "a benchmark, not a trial intervention", "risk-model": "a risk model, not a trial intervention",
};
/** Technology keys that are single generic words in registry text. */
const GENERIC_TECH_KEYS = new Set(["software", "model", "models", "test", "tests", "testing", "screening", "therapy", "therapies", "imaging", "surgery", "exercise", "diet", "nutrition", "care", "platform", "platforms", "system", "systems", "device", "devices", "assay", "assays", "kit", "kits", "vaccine", "vaccines", "treatment", "treatments", "monitoring", "support", "education", "counselling", "counseling", "training", "programme", "program", "intervention", "standard", "usual care", "best supportive care", "observation", "surveillance", "biomarkers", "biomarker", "classifier", "sequencing", "genotyping", "profiling", "markers", "marker", "ultrasound", "mri", "ct", "pet", "spect", "pet ct", "x ray", "radiotherapy", "radiation", "chemotherapy", "immunotherapy", "cell therapy", "gene therapy", "hyperthermia", "ablation", "brachytherapy", "proton therapy", "organoids", "proteomics", "radiomics", "biobanking", "cytology", "fish", "flow cytometry", "acupuncture", "yoga", "massage", "music therapy", "mindfulness", "hypnosis", "reflexology", "aromatherapy", "homeopathy", "melatonin", "curcumin", "ginger", "honey", "probiotics", "glutamine", "vitamin c", "fish oil", "green tea", "ex vivo", "in vivo", "in vitro", "catalyst", "stride", "calcitonin", "thyroglobulin", "carcinoembryonic antigen", "cea monitoring", "cea follow up"]);
/** Technology records whose names or aliases name something else in registry text; held with the reason rather than searched. */
const ENTITY_HOLD: Record<string, string> = {
  "cea-surveillance-colorectal": "its alias is the antigen itself, so registry hits are CEA-directed vaccines and antibodies, not surveillance",
  "thyroid-cancer-markers": "its aliases are the hormone names (calcitonin, thyroglobulin), which registry text uses for the drugs, not the follow-up test",
  "functional-precision-medicine-haematology": "the record is the blood-cancer programme (EXALT) and \"functional precision medicine\" in a registry title names the field, not it",
  "stride-dna-break-detection": "STRIDE is also the registry name of the tremelimumab plus durvalumab regimen in liver cancer",
};
/** Registry condition phrases for cancers whose record carries no alias for them (the parent head and neck record has none). */
const EXTRA_CANCER_PHRASES: Record<string, string[]> = { "head-and-neck": ["head and neck cancer", "head and neck carcinoma", "head and neck squamous cell carcinoma", "squamous cell carcinoma of the head and neck", "head and neck neoplasms", "hnscc", "scchn"] };
/** Single words that are a cancer alias fragment but name no disease on their own. */
const DISEASE_WORD = /oma\b|omas\b|cancer|carcin|leuk|tumou?r|neoplas|disease|syndrome|cytosis|mycosis|thrombocyth|myelofibrosis|polycyth|malignan|metastases|macroglobulin|blastoma|glioma|lymphoma|myeloma|sarcoma|melanoma|mesothelioma|nsclc|sclc/i;
const CANCER_STOP_PHRASES = new Set(["advanced", "recurrent", "relapsed", "localised", "localized", "indolent", "secondary", "neoplasms", "neoplasm", "brain", "soles", "teenage", "ampulla", "bladder", "ureter", "oncocytic", "basaloid", "jejunal", "idh1", "group 3", "non wnt", "lymphoma", "neck cancer", "neck squamous cell carcinoma", "tumors", "tumor", "cancer", "cancers", "carcinoma", "sarcomas"]);

// ---------------------------------------------------------------------------------------------------------------------
// Corpus
// ---------------------------------------------------------------------------------------------------------------------
const g = graph();
const drugs = g.kind("drug") as Drug[];
const technologies = g.kind("technology") as Technology[];
const trials = g.kind("trial") as Trial[];
const companies = g.kind("company") as Company[];
const cancers = g.kind("cancer") as Cancer[];
const usedIds = new Set<string>(g.entities.map((e) => e.id));
const uniqueId = (base: string) => { let id = base; let n = 2; while (usedIds.has(id)) id = `${base}-${n++}`; usedIds.add(id); return id; };
const trialByNct = new Map<string, { id: string }>();
for (const t of trials) if (t.nct) trialByNct.set(t.nct.toUpperCase(), t);
for (const t of trialsEntitiesWave5) if (t.nct) trialByNct.set(t.nct.toUpperCase(), t);

/** Corpus drugs by every key drugKeys() gives them; a key shared by two drugs is dropped as ambiguous. */
const drugByKey = new Map<string, Drug | null>();
for (const d of drugs) for (const k of drugKeys(d)) { if (k.length < 4 || CLASS_WORD.test(k)) continue; drugByKey.set(k, drugByKey.has(k) && drugByKey.get(k)?.id !== d.id ? null : d); }
/** Corpus drugs a registry intervention names (name or other names), by whole normalised key. */
function drugsNamedBy(intervention: { name?: string; otherNames?: string[] }): Drug[] {
  const out = new Map<string, Drug>();
  for (const k of drugKeys({ name: intervention.name ?? "", aka: intervention.otherNames ?? [] })) { const d = drugByKey.get(k); if (d) out.set(d.id, d); }
  return [...out.values()];
}
/** Companies by every key companyKeys() gives them; shared keys dropped. Exact name or alias only, no patterns. */
const companyByKey = new Map<string, Company | null>();
for (const c of companies) for (const k of companyKeys(c)) companyByKey.set(k, companyByKey.has(k) && companyByKey.get(k)?.id !== c.id ? null : c);
const sponsorCompany = (name: string): string | undefined => (companyByKey.get(companyKey(name)) ?? companyByKey.get(norm(name)))?.id;

/** norm() with possessives dropped, so "Hodgkin's Lymphoma" and "Hodgkin lymphoma" are one phrase. */
const normP = (s: string) => norm(s.replace(/['’]s\b/g, ""));
/** Cancer phrases: name, aliases, their parts, both spellings; a shared phrase goes to the cancers whose own name carries it. */
const cancerByPhrase = new Map<string, Cancer[]>();
{
  const ranked = new Map<string, Array<{ c: Cancer; rank: number }>>();
  const strip = (s: string) => normP(s.replace(/\s*\(.*$/, ""));
  // A name or alias that lists diseases ("Glioma & glioblastoma", "Polycythaemia vera, essential thrombocythaemia") also
  // counts part by part, but only when every part names a disease itself: "Head and neck cancer", "Stage IIB and IIC
  // melanoma" and "Metastatic and recurrent anal cancer" are one phrase each. The whole name or alias always counts.
  const fragments = (s: string): string[] => {
    const full = s.replace(/\s*\(.*$/, "").trim();
    const parts = full.split(/\s*(?:&|\/|,|\band\b|\bor\b)\s*/).map((x) => x.trim()).filter(Boolean);
    if (parts.length < 2 || !parts.every((x) => x.length >= 5 && DISEASE_WORD.test(x))) return [];
    return parts.flatMap(withUsSpelling);
  };
  for (const c of cancers) {
    const fromName = [c.name, ...fragments(c.name)].map(strip);
    const fromAka = [...c.aka, ...c.aka.flatMap(fragments), ...(EXTRA_CANCER_PHRASES[c.id] ?? [])].map(strip);
    const seen = new Set<string>();
    for (const [list, rank] of [[fromName, 0], [fromAka, 1]] as Array<[string[], number]>) for (const p of list) {
      if (p.length < 3 || seen.has(p) || CANCER_STOP_PHRASES.has(p)) continue;
      seen.add(p);
      ranked.set(p, [...(ranked.get(p) ?? []), { c, rank }]);
    }
  }
  for (const [p, list] of ranked) { const best = Math.min(...list.map((x) => x.rank)); cancerByPhrase.set(p, list.filter((x) => x.rank === best).map((x) => x.c)); }
}
const phraseList = [...cancerByPhrase.keys()].sort((a, b) => b.length - a.length);
/** Corpus cancers a registry condition names: whole phrase, whole words; phrases of four characters or fewer must be the whole condition. */
function cancersNamedBy(condition: string): Cancer[] {
  const t = normP(condition);
  const hits: string[] = [];
  for (const p of phraseList) {
    const hit = p.length <= 4 ? t === p : new RegExp(`(^|\\s)${esc(p)}(\\s|$)`).test(t);
    // Longest phrase wins: "non small cell lung cancer" in a condition is not also "small cell lung cancer" or "lung cancer".
    if (hit && !hits.some((h) => h.includes(p))) hits.push(p);
  }
  const out = new Map<string, Cancer>();
  for (const p of hits) for (const c of cancerByPhrase.get(p)!) out.set(c.id, c);
  return [...out.values()];
}

// ---------------------------------------------------------------------------------------------------------------------
// Entities to work on
// ---------------------------------------------------------------------------------------------------------------------
type Entity = { id: string; name: string; kind: "drug" | "technology"; record: Drug | Technology; queryKeys: string[]; matchKeys: string[] };
const hasTrial = (id: string, field: "drugs" | "technologies") => (g.get(id)?.trials.length ?? 0) > 0 || trials.some((t) => t[field].includes(id)) || trialsEntitiesWave5.some((t) => (t[field] ?? []).includes(id)) || Object.values(entityTrialLinksWave5).some((l) => (l[field] ?? []).includes(id));
const shortName = (s: string) => s.replace(/\s*\(.*$/, "").trim();

function drugEntity(d: Drug): Entity | { skip: string } {
  const own = new Set([...drugKeys(d)].filter((k) => drugByKey.get(k) === d));
  if (!own.size) return { skip: "no key of its own: every name it carries is shared with another drug or is a class word" };
  const raw = [...nameParts(d.name), ...(d.code ? d.code.split(/\s*[,;]\s*/) : []), ...(d.brand ? nameParts(d.brand.replace(/\(generic\)/i, "")) : []), ...d.aka.flatMap(nameParts)];
  const queryKeys = [...new Set(raw.map((s) => s.trim()).filter((s) => s.length >= 4 && !CLASS_WORD.test(s) && [...drugKeys({ name: s, aka: [] })].some((k) => own.has(k))))].slice(0, MAX_QUERY_KEYS);
  if (!queryKeys.length) return { skip: "no name of its own to search by" };
  return { id: d.id, name: shortName(d.name), kind: "drug", record: d, queryKeys, matchKeys: [...own] };
}
function techEntity(t: Technology): Entity | { skip: string } {
  if (ENTITY_HOLD[t.id]) return { skip: ENTITY_HOLD[t.id] };
  const skipTag = t.tags.find((x) => TECH_SKIP_TAGS[x]);
  if (skipTag) return { skip: TECH_SKIP_TAGS[skipTag] };
  const raw = [...nameParts(t.name), ...t.aka.flatMap(nameParts)].map((s) => s.replace(/^(the|a|an)\s+/i, "").trim());
  const keys = [...new Set(raw.map(norm).filter((k) => k.length >= 5 && k.split(" ").length <= 6 && !GENERIC_TECH_KEYS.has(k) && !CLASS_WORD.test(k) && !drugByKey.has(k)))];
  if (!keys.length) return { skip: "its name and aliases are generic words or descriptive titles the registry would not carry as an intervention" };
  const queryKeys = [...new Set(raw.filter((s) => keys.includes(norm(s))))].slice(0, MAX_QUERY_KEYS);
  return { id: t.id, name: shortName(t.name), kind: "technology", record: t, queryKeys, matchKeys: keys };
}

let entities: Entity[] = [];
const held: Record<string, number> = {};
const newSkips: Record<string, string> = {};
const source = KIND === "drug" ? drugs.filter((d) => !hasTrial(d.id, "drugs")) : technologies.filter((t) => !hasTrial(t.id, "technologies"));
for (const e of source) {
  if (ONLY && !ONLY.includes(e.id)) continue;
  if (!ONLY && e.id in ENTITY_TRIAL_SKIP) { held.alreadySkipped = (held.alreadySkipped ?? 0) + 1; continue; }
  const ent = KIND === "drug" ? drugEntity(e as Drug) : techEntity(e as Technology);
  if ("skip" in ent) { newSkips[e.id] = ent.skip; held[ent.skip] = (held[ent.skip] ?? 0) + 1; continue; }
  entities.push(ent);
}
entities.sort((a, b) => a.id.localeCompare(b.id));
entities = entities.slice(0, MAX);
console.log(`${source.length} ${PLURAL} without a trial; ${entities.length} to look up${Object.keys(ENTITY_TRIAL_SKIP).length ? `, ${held.alreadySkipped ?? 0} in ENTITY_TRIAL_SKIP from an earlier run` : ""}`);
for (const [why, n] of Object.entries(held)) if (why !== "alreadySkipped") console.log(`  held ${n}: ${why}`);

// ---------------------------------------------------------------------------------------------------------------------
// Verification
// ---------------------------------------------------------------------------------------------------------------------
type Match = { s: CtgovStudy; nct: string; phase: TrialInput["phase"]; drugs: Drug[]; cancers: Cancer[]; how: string; inTitle: boolean; active: boolean; results: boolean; enrolled: number };
const PHASE_MAP: Record<string, TrialInput["phase"]> = { PHASE2: "2", PHASE3: "3", "PHASE2|PHASE3": "2/3" };
const FALLBACK_PHASE_MAP: Record<string, TrialInput["phase"]> = { PHASE1: "1", "PHASE1|PHASE2": "1/2" };
const PHASE_RANK: Record<string, number> = { "3": 0, "2/3": 1, "2": 2, "1/2": 3, "1": 4 };
const STATUS_MAP: Record<string, Trial["status"] | undefined> = { RECRUITING: "recruiting", ACTIVE_NOT_RECRUITING: "active", ENROLLING_BY_INVITATION: "active", NOT_YET_RECRUITING: "planned", COMPLETED: "completed", WITHDRAWN: "withdrawn" };
const ACTIVE = new Set(["RECRUITING", "ACTIVE_NOT_RECRUITING", "ENROLLING_BY_INVITATION"]);
const statusPhrase: Record<string, string> = { RECRUITING: "now recruiting", ACTIVE_NOT_RECRUITING: "active and no longer recruiting", ENROLLING_BY_INVITATION: "enrolling by invitation", NOT_YET_RECRUITING: "not yet recruiting", COMPLETED: "completed", TERMINATED: "recorded as terminated on the registry", SUSPENDED: "recorded as suspended on the registry", UNKNOWN: "with a status the registry has not verified recently" };

const rejected = new Map<string, number>();
const reject = (why: string) => { rejected.set(why, (rejected.get(why) ?? 0) + 1); return null; };
const phraseIn = (text: string, key: string) => new RegExp(`(^|\\s)${esc(key)}(\\s|$)`).test(norm(text));

function verify(s: CtgovStudy, e: Entity, fallback: boolean): Match | null {
  const p = s.protocolSection;
  const nct = p?.identificationModule?.nctId;
  if (!nct || p?.designModule?.studyType !== "INTERVENTIONAL") return reject("not interventional");
  const phases = [...(p.designModule?.phases ?? [])].sort();
  const phase = PHASE_MAP[phases.join("|")] ?? (fallback ? FALLBACK_PHASE_MAP[phases.join("|")] : undefined);
  if (!phase) return reject(`phase ${phases.join("/") || "not given"}`);
  const status = p.statusModule?.overallStatus ?? "";
  if (status === "WITHDRAWN") return reject("withdrawn");
  const interventions = p.armsInterventionsModule?.interventions ?? [];
  const named = new Map<string, Drug>();
  for (const iv of interventions) for (const d of drugsNamedBy(iv)) named.set(d.id, d);
  const brief = p.identificationModule?.briefTitle ?? "";
  const official = p.identificationModule?.officialTitle ?? "";
  let how: string;
  if (e.kind === "drug") {
    if (!named.has(e.id)) return reject(`interventions do not name the ${KIND}`);
    how = "the registry names it among its interventions";
  } else {
    const ivText = interventions.flatMap((iv) => [iv.name ?? "", ...(iv.otherNames ?? [])]);
    const ivKey = e.matchKeys.find((k) => ivText.some((x) => phraseIn(x, k)));
    const titleKey = ivKey ? undefined : e.matchKeys.find((k) => (k.split(" ").length >= 2 || k.length >= 8) && (phraseIn(official, k) || phraseIn(brief, k)));
    if (!ivKey && !titleKey) return reject(`neither an intervention nor the title names the ${KIND}`);
    how = ivKey ? `the registry names it ("${ivKey}") among its interventions` : `the registry's title names it ("${titleKey}")`;
  }
  const cancerHits = new Map<string, Cancer>();
  for (const c of p.conditionsModule?.conditions ?? []) for (const x of cancersNamedBy(c)) cancerHits.set(x.id, x);
  if (!cancerHits.size) return reject("conditions name no corpus cancer");
  const inTitle = e.matchKeys.some((k) => phraseIn(brief, k));
  return { s, nct, phase, drugs: [...named.values()], cancers: [...cancerHits.values()].slice(0, MAX_CANCERS), how, inTitle, active: ACTIVE.has(status), results: !!s.hasResults, enrolled: p.designModule?.enrollmentInfo?.count ?? 0 };
}
const rank = (a: Match, b: Match) => PHASE_RANK[a.phase] - PHASE_RANK[b.phase] || Number(b.inTitle) - Number(a.inTitle) || Number(b.active) - Number(a.active) || Number(b.results) - Number(a.results) || b.enrolled - a.enrolled || a.nct.localeCompare(b.nct);

const asOf = today();
const joinNames = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
function buildTrial(e: Entity, m: Match): TrialInput {
  const p = m.s.protocolSection!;
  const brief = clean(p.identificationModule?.briefTitle ?? m.nct).replace(/\.$/, "");
  const official = clean(p.identificationModule?.officialTitle ?? brief);
  const sponsor = clean(p.sponsorCollaboratorsModule?.leadSponsor?.name ?? "").trim();
  const status = p.statusModule?.overallStatus ?? "";
  const interventions = (p.armsInterventionsModule?.interventions ?? []).map((iv) => clean(iv.name ?? "")).filter(Boolean);
  const conditions = (p.conditionsModule?.conditions ?? []).map(clean);
  const subject = e.kind === "drug" ? joinNames(m.drugs.map((d) => shortName(d.name))) : e.name;
  const cancerNames = m.cancers.map((c) => shortName(c.name));
  const enrolled = p.designModule?.enrollmentInfo?.count;
  const start = p.statusModule?.startDateStruct?.date;
  const done = p.statusModule?.primaryCompletionDateStruct?.date;
  const tldr = houseDashes(`A phase ${m.phase} trial of ${subject} in ${joinNames(cancerNames)}, run by ${sponsor || "the sponsor named on the registry"}, ${statusPhrase[status] ?? "listed on the registry"}.`);
  const summary = houseDashes(`${brief} is a phase ${m.phase} interventional study registered as ${m.nct}${sponsor ? ` by ${sponsor}` : ""}${enrolled ? `, with ${enrolled} participants ${status === "COMPLETED" || status === "TERMINATED" ? "recorded" : "planned"}` : ""}${start ? `, started ${start}` : ""}${done ? ` and ${status === "COMPLETED" ? "reaching" : "due to reach"} its primary completion in ${done}` : ""}. Interventions recorded: ${interventions.join(", ") || "none listed"}. Conditions recorded: ${conditions.join(", ") || "none listed"}.\n\nLinked to the ${e.kind} ${e.name} because ${m.how} and ${joinNames(cancerNames)} among its conditions. Registry record only: no result has been read by an editor.`);
  const mapped = STATUS_MAP[status];
  const companyId = sponsor ? sponsorCompany(sponsor) : undefined;
  return {
    kind: "trial", asOf, id: uniqueId(m.nct.toLowerCase()), name: brief, nct: m.nct, phase: m.phase, ...(mapped ? { status: mapped } : {}), ...(sponsor ? { sponsor } : {}), ...(enrolled ? { enrolled } : {}),
    setting: houseDashes(official), tldr, summary, tags: ["pipeline", "ctgov-ingest"],
    drugs: m.drugs.map((d) => d.id), ...(e.kind === "technology" ? { technologies: [e.id] } : {}), cancers: m.cancers.map((c) => c.id), ...(companyId ? { companies: [companyId] } : {}),
    links: [{ label: `ClinicalTrials.gov ${m.nct}`, url: `https://clinicaltrials.gov/study/${m.nct}` }],
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------------------------------------------------
const INTERVENTIONAL = "AREA[StudyType]INTERVENTIONAL";
const LATE = `AREA[Phase](PHASE2 OR PHASE3) AND ${INTERVENTIONAL}`;
const EARLY = `AREA[Phase](PHASE1) AND ${INTERVENTIONAL}`;
const quote = (s: string) => (/\s/.test(s) ? `"${s.replace(/"/g, "")}"` : s);

async function search(e: Entity, fallback: boolean, seen: Set<string>): Promise<Map<string, Match>> {
  const matches = new Map<string, Match>();
  for (const key of e.queryKeys) {
    const params: Record<string, string> = e.kind === "drug" ? { "query.intr": quote(key), "filter.advanced": fallback ? EARLY : LATE } : { "query.term": quote(key), "filter.advanced": LATE };
    const res = await ctgovSearch(params, { pageSize: 50, force: FORCE });
    if (!res) continue;
    for (const s of res.studies ?? []) {
      const nct = s.protocolSection?.identificationModule?.nctId;
      if (!nct || seen.has(nct)) continue;
      seen.add(nct);
      const m = verify(s, e, fallback);
      if (m) matches.set(m.nct, m);
    }
    if (DEBUG) { console.log(`  CT.gov ${JSON.stringify(params)}: ${res.totalCount ?? 0} hits, ${matches.size} verified so far`); for (const [w, n] of [...rejected.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)) console.log(`    rejected ${n}: ${w}`); }
    rejected.clear();
    if (matches.size >= TRIAL_CAP * 2) break;
  }
  return matches;
}

async function main(): Promise<void> {
  const newTrials: TrialInput[] = [];
  const newLinks: Record<string, { drugs?: string[]; technologies?: string[] }> = {};
  const newEntityTrials: Record<string, string[]> = {};
  const field = KIND === "drug" ? "drugs" : "technologies";
  const tally = { linked: 0, trialsNew: 0, trialsExisting: 0, fallback: 0, none: 0, studiesSeen: 0 };
  const lines: string[] = [];

  for (const e of entities) {
    const seen = new Set<string>();
    let matches = await search(e, false, seen);
    let usedFallback = false;
    if (!matches.size && e.kind === "drug" && (e.record as Drug).targets.length) { matches = await search(e, true, seen); usedFallback = matches.size > 0; }
    tally.studiesSeen += seen.size;
    const ranked = [...matches.values()].sort(rank).slice(0, TRIAL_CAP);
    if (!ranked.length) {
      tally.none++;
      newSkips[e.id] = `no interventional phase 2 or 3 study on ClinicalTrials.gov names it${e.kind === "drug" && (e.record as Drug).targets.length ? " (nor phase 1)" : ""} with a corpus cancer as condition (${seen.size} studies checked, searched by ${e.queryKeys.join(", ")})`;
      lines.push(`${e.id.padEnd(44)} none (${seen.size} studies checked)`);
      continue;
    }
    if (usedFallback) tally.fallback++;
    const ids: string[] = [];
    for (const m of ranked) {
      const existing = trialByNct.get(m.nct);
      if (existing) {
        tally.trialsExisting++;
        const cur = newLinks[existing.id] ?? entityTrialLinksWave5[existing.id] ?? {};
        newLinks[existing.id] = { ...cur, [field]: [...new Set([...(cur[field] ?? []), e.id])] };
        ids.push(`${existing.id} (corpus)`);
        continue;
      }
      const t = buildTrial(e, m);
      newTrials.push(t); trialByNct.set(m.nct, t); tally.trialsNew++;
      ids.push(`${t.id} (phase ${m.phase}${m.drugs.length && e.kind === "technology" ? `, drugs ${m.drugs.map((d) => d.id).join("/")}` : ""}, ${m.cancers.map((c) => c.id).join("/")}${t.companies?.length ? `, sponsor ${t.companies[0]}` : ""})`);
    }
    tally.linked++;
    newEntityTrials[e.id] = ranked.map((m) => trialByNct.get(m.nct)!.id);
    lines.push(`${e.id.padEnd(44)} ${ids.join("; ")}${usedFallback ? "  [phase 1 fallback]" : ""}`);
  }

  for (const l of lines) console.log(l);
  console.log(`\n${entities.length} ${PLURAL} looked up, ${requestCount()} requests made (the rest from cache), ${tally.studiesSeen} studies checked.`);
  console.log(`${PLURAL} gaining a trial ${tally.linked} (${tally.trialsNew} registry records written, ${tally.trialsExisting} links to corpus trials${tally.fallback ? `, ${tally.fallback} through the phase 1 fallback` : ""}); ${tally.none} with no matching study; ${Object.keys(newSkips).length - tally.none} held before searching.`);

  if (!APPLY) { console.log(`\nDry run: pass --apply to write ${DATA_FILE}`); return; }

  const trialLine = (t: TrialInput): string => { const { kind: _k, asOf: _a, ...rest } = t; void _k; void _a; return `  t({ ${Object.entries(rest).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(", ")} }),`; };
  const allTrials = [...trialsEntitiesWave5, ...newTrials];
  const allLinks: Record<string, { drugs?: string[]; technologies?: string[] }> = { ...entityTrialLinksWave5, ...newLinks };
  const allSkips: Record<string, string> = { ...ENTITY_TRIAL_SKIP, ...newSkips };
  const allEntityTrials: Record<string, string[]> = { ...entityTrialsWave5, ...newEntityTrials };
  const sortedKeys = (o: Record<string, unknown>) => Object.keys(o).sort();
  writeFileSync(DATA_FILE, `import type { TrialInput } from "@/lib/schema";

const asOf = "${asOf}";
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, ...x });

/**
 * Wave 5 of docs/CONTENT-ROADMAP.md, second half: registry trials for drugs and technologies that had none. Written by
 * scripts/fetch-entity-trials.ts, which searches ClinicalTrials.gov API v2 by the record's name and aliases and keeps an
 * interventional phase 2 or 3 study (phase 1 or 1/2 only when nothing later exists and the drug carries a target) only
 * when the registry's own intervention list names the drug, or names the technology in an intervention or the official
 * title, and its condition list names a corpus cancer. Title, phase, status, sponsor, enrolment, dates, interventions and
 * conditions come from the registry; drugs, technologies, cancers and companies are the corpus records those fields
 * matched, the sponsor only on an exact company name or alias. No outcomes: nothing here has been read by an editor.
 * Corpus trials that already carried the registry id are linked through entityTrialLinksWave5 instead. Do not edit by
 * hand; re-run the script.
 */
export const trialsEntitiesWave5: TrialInput[] = [
${allTrials.map(trialLine).join("\n")}
];

/** Each drug or technology looked up, with the trial ids it gained (records above or corpus trials); merged into its \`trials\` by src/data/index.ts. */
export const entityTrialsWave5: Record<string, string[]> = {
${sortedKeys(allEntityTrials).map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(allEntityTrials[k])},`).join("\n")}
};

/** Existing corpus trials (by id) that gain a drug or technology because the registry record names it; merged by src/data/index.ts. */
export const entityTrialLinksWave5: Record<string, { drugs?: string[]; technologies?: string[] }> = {
${sortedKeys(allLinks).map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(allLinks[k])},`).join("\n")}
};

/** Drugs and technologies the script looked up and will not retry, with the reason; clear an entry to try again. */
export const ENTITY_TRIAL_SKIP: Record<string, string> = {
${sortedKeys(allSkips).map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(allSkips[k])},`).join("\n")}
};
`);
  console.log(`Wrote ${DATA_FILE}: ${allTrials.length} trial records, ${Object.keys(allEntityTrials).length} entities linked, ${Object.keys(allLinks).length} linked corpus trials, ${Object.keys(allSkips).length} skips.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
