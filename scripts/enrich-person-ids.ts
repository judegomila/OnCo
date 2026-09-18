/**
 * Fill `orcid` and `wikipedia` for person records that lack them, from the public ORCID and Wikipedia APIs.
 *
 * ORCID: one expanded-search per person (family-name AND given-names), 300 ms apart, at most ORCID_BUDGET requests.
 * A result is accepted only when exactly one hit's `institution-name` list names the person's institution (record
 * name or aka) or a centre named in the person's role or summary, judged on distinctive tokens (generic words such as
 * "university", "hospital", "cancer" never count). Everything else is skipped as ambiguous or unmatched.
 *
 * Wikipedia: one search per person ("<name> oncologist"), at most WIKI_BUDGET requests, 300 ms apart; accepted only
 * when the top result's title equals the person's name (initials and a parenthetical disambiguator ignored) and the
 * article summary mentions oncology, cancer, haematology or the person's institution.
 *
 * Every accepted ORCID is then vetted against its `/employments` record (one more request, counted in the ORCID
 * budget): a hit is rejected when any employment's role or department names a different profession without medical
 * evidence in the same employment, or when no employment shows medical or institutional evidence at all.
 *
 * Values are inserted into the source file right after the record's `id` field, `orcid` as the bare id and
 * `wikipedia` as the article URL. Decisions are written to --out (default /tmp/enrich-ids.json); people already
 * decided in the --skip logs (default the same file, when present) are not tried again. Usage:
 *   npx tsx scripts/enrich-person-ids.ts [--dry-run] [--orcid=400] [--wiki=300] [--skip=a.json,b.json] [--out=c.json]
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { PersonInput } from "../src/lib/schema";
import { ALL_INPUTS } from "../src/data";
import { peopleInvestigatorsWave } from "../src/data/people-investigators-wave";
import { peopleKeyOpinionLeaders } from "../src/data/people/key-opinion-leaders";
import { peopleLeadersWave2 } from "../src/data/people/leaders-wave2";
import { peopleLeadersWave3 } from "../src/data/people/leaders-wave3";
import { peopleLeadersWave4 } from "../src/data/people/leaders-wave4";
import { peopleEurope } from "../src/data/people/europe";
import { peopleUsEast } from "../src/data/people/us-east";
import { peopleUsWest } from "../src/data/people/us-west";
import { peopleAsiaPacific } from "../src/data/people/asia-pacific";
import { peopleIndia } from "../src/data/people/india";
import { peopleChina } from "../src/data/people/china";
import { heroes } from "../src/data/people/heroes";
import { heroesDonors } from "../src/data/people/heroes-donors";

const ROOT = join(__dirname, "..");
const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const num = (flag: string, d: number) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? Number(a.split("=")[1]) : d; };
const ORCID_BUDGET = num("orcid", 400);
const WIKI_BUDGET = num("wiki", 300);
const str = (flag: string, d: string) => { const a = args.find((x) => x.startsWith(`--${flag}=`)); return a ? a.slice(flag.length + 3) : d; };
const OUT = str("out", "/tmp/enrich-ids.json");
const SKIP_LOGS = str("skip", OUT).split(",").filter((f) => f && existsSync(f));
const PACE_MS = 300;
const UA = "OnCo corpus enrichment (https://onco.world; contact via site)";

/** People files in priority order; investigators first, then leaders and regional files, heroes last. */
const FILES: { file: string; people: PersonInput[]; researchers: boolean }[] = [
  { file: "src/data/people-investigators-wave.ts", people: peopleInvestigatorsWave, researchers: true },
  { file: "src/data/people/key-opinion-leaders.ts", people: peopleKeyOpinionLeaders, researchers: true },
  { file: "src/data/people/leaders-wave2.ts", people: peopleLeadersWave2, researchers: true },
  { file: "src/data/people/leaders-wave3.ts", people: peopleLeadersWave3, researchers: true },
  { file: "src/data/people/leaders-wave4.ts", people: peopleLeadersWave4, researchers: true },
  { file: "src/data/people/europe.ts", people: peopleEurope, researchers: true },
  { file: "src/data/people/us-east.ts", people: peopleUsEast, researchers: true },
  { file: "src/data/people/us-west.ts", people: peopleUsWest, researchers: true },
  { file: "src/data/people/asia-pacific.ts", people: peopleAsiaPacific, researchers: true },
  { file: "src/data/people/india.ts", people: peopleIndia, researchers: true },
  { file: "src/data/people/china.ts", people: peopleChina, researchers: true },
  { file: "src/data/people/heroes.ts", people: heroes, researchers: false },
  { file: "src/data/people/heroes-donors.ts", people: heroesDonors, researchers: false },
];

const institutions = new Map<string, { name: string; aka: string[] }>();
for (const e of ALL_INPUTS) if (e.kind === "institution") institutions.set(e.id, { name: e.name, aka: e.aka ?? [] });

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const tokens = (s: string) => fold(s).replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter(Boolean);
/** Words too common in institution names to identify one on their own. */
const GENERIC = new Set(["university", "universitat", "universite", "universita", "universidad", "universitaire", "medical", "medicine", "center", "centre", "hospital", "hospitals", "cancer", "institute", "institut", "institution", "school", "college", "health", "research", "national", "general", "clinic", "clinical", "oncology", "society", "association", "american", "european", "international", "foundation", "department", "division", "journal", "sciences", "science", "faculty", "campus", "system", "city", "state", "group", "trust", "nhs", "royal", "children", "childrens", "comprehensive", "memorial", "regional", "district", "public", "academy", "academic", "hosp", "univ", "med", "ctr", "inst", "dept", "sch", "coll", "and", "the", "for", "des", "der", "von", "van", "del", "della", "sur", "les", "north", "south", "east", "west", "central", "new", "saint", "sankt", "st", "san", "santa", "ospedale", "krankenhaus", "hopital", "klinikum", "klinik", "college", "polytechnic", "technology", "technical", "institutes", "board", "council", "agency", "ministry", "government", "federal", "united", "states", "kingdom", "republic", "people", "peoples", "first", "second", "third", "affiliated", "teaching", "military", "army", "veterans", "affairs", "administration", "cooperative", "network", "alliance", "consortium", "program", "programme", "office", "service", "services", "care", "healthcare", "life", "biomedical", "molecular", "cellular", "biology", "genetics", "genomics", "pathology", "radiology", "surgery", "haematology", "hematology", "pediatric", "paediatric", "women", "womens", "mens", "adult", "community", "county", "province", "provincial", "metropolitan", "chinese", "japanese", "korean", "indian", "french", "german", "italian", "spanish", "british", "australian", "canadian", "dutch", "swiss", "swedish", "danish", "norwegian", "belgian", "austrian", "polish", "medizinische", "hochschule", "fakultat", "universitatsklinikum", "universitatsmedizin", "nacional", "nazionale", "nationale", "centro", "instituto", "istituto", "universitario", "universitaria", "clinica", "medica", "medico", "ospedaliera", "ospedaliero", "azienda", "fondazione", "fundacion", "hopitaux", "assistance", "publique", "universitats", "universitaets", "asco", "esmo", "aacr", "ash", "asco", "iaslc", "nci", "nih"]);
const distinctive = (s: string) => tokens(s).filter((t) => t.length >= 4 && !GENERIC.has(t) && !/^\d+$/.test(t));

/** `rejected`: the search accepted the id but the employment record named another profession or showed no medical evidence. */
type Decision = { id: string; name: string; field: "orcid" | "wikipedia"; status: "added" | "ambiguous" | "none" | "error" | "rejected"; value?: string; note?: string };
const decisions: Decision[] = [];
let orcidRequests = 0;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getJson(url: string, headers: Record<string, string>): Promise<unknown> {
  const r = await fetch(url, { headers: { "User-Agent": UA, ...headers } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

/** Split a display name into the given name used for search and the surname (particles kept with the surname). */
function splitName(name: string): { given: string; surname: string } | null {
  const parts = name.replace(/,?\s+(Jr\.?|Sr\.?|III|II|MD|PhD)$/i, "").trim().split(/\s+/);
  if (parts.length < 2) return null;
  let i = parts.length - 1;
  while (i > 1 && /^(van|von|de|der|den|del|della|di|da|dos|le|la|du|ter|te|af|al|el|bin|ibn|st\.?)$/i.test(parts[i - 1])) i--;
  const surname = parts.slice(i).join(" ");
  const given = parts[0].replace(/\.$/, "");
  if (given.length < 2) return null; // an initial alone is not searchable
  return { given, surname };
}

/** Text that may name the person's centre: institution record name and aka, then role and summary. */
function centreText(p: PersonInput): { strong: string[]; weak: string } {
  const strong: string[] = [];
  for (const iid of [p.institutionId, ...(p.institutions ?? [])]) {
    const inst = iid ? institutions.get(iid) : undefined;
    if (inst) strong.push(inst.name, ...inst.aka);
  }
  return { strong, weak: `${p.role ?? ""} ${p.summary ?? ""}` };
}

/** Does an ORCID institution string name the person's centre? Judged on distinctive tokens only. */
function institutionMatches(orcidInst: string, p: PersonInput): boolean {
  const oi = distinctive(orcidInst);
  if (!oi.length) return false;
  const { strong, weak } = centreText(p);
  const oiSet = new Set(oi);
  for (const s of strong) {
    const d = distinctive(s);
    // every distinctive token of the record name appears in the ORCID string, or vice versa for short names
    if (d.length && d.every((t) => oiSet.has(t))) return true;
    const sSet = new Set(d);
    if (oi.length <= 2 && oi.every((t) => sSet.has(t))) return true;
  }
  // centre named in role or summary: the ORCID string's distinctive tokens all appear there (at least one, max three)
  const weakSet = new Set(tokens(weak));
  const need = oi.slice(0, 3);
  return need.length > 0 && need.every((t) => weakSet.has(t));
}

type OrcidResult = { "orcid-id": string; "given-names": string | null; "family-names": string | null; "institution-name": string[] | null };

async function lookupOrcid(p: PersonInput): Promise<Decision> {
  const base: Decision = { id: p.id, name: p.name, field: "orcid", status: "none" };
  const parts = splitName(p.name);
  if (!parts) return { ...base, note: "unsplittable name" };
  const q = `family-name:"${fold(parts.surname)}" AND given-names:"${fold(parts.given)}"`;
  const url = `https://pub.orcid.org/v3.0/expanded-search/?q=${encodeURIComponent(q)}&rows=30`;
  try {
    orcidRequests++;
    const j = (await getJson(url, { Accept: "application/json" })) as { "expanded-result": OrcidResult[] | null; "num-found": number };
    const results = (j["expanded-result"] ?? []).filter((r) => fold(r["family-names"] ?? "") === fold(parts.surname));
    if (!results.length) return { ...base, note: `no results (${j["num-found"]} found)` };
    const matched = results.filter((r) => (r["institution-name"] ?? []).some((i) => institutionMatches(i, p)));
    if (matched.length === 1) return { ...base, status: "added", value: matched[0]["orcid-id"], note: (matched[0]["institution-name"] ?? []).join("; ") };
    if (matched.length > 1) return { ...base, status: "ambiguous", note: `${matched.length} of ${results.length} results match the institution` };
    return { ...base, status: results.length > 1 ? "ambiguous" : "none", note: `${results.length} results, none names the institution` };
  } catch (e) {
    return { ...base, status: "error", note: String(e) };
  }
}

/** Words in an employment role or department that place the holder in medicine or the life sciences. */
const MEDICAL = /oncolog|cancer|tumou?r|carcinom|sarcom|melanom|gliom|neoplas|ha?ematolog|leuka?em|lymphom|myelom|medic|physician|clinic|hospital|surg|radiat|radiolog|radiother|patholog|p(a)?ediatric|immunolog|genetic|genom|biolog|biomedic|pharmac|health|epidemiolog|nurs|bioinformat|biostatist|transplant|urolog|gyn(a)?ecolog|dermatolog|neurolog|gastroenterolog|pulmon|thoracic|breast|prostate|lung|hepat|endocrin|virolog|microbiolog|molecular|translational|therap|onkolog|krebs|cancerolog|tumor/i;
/** Words that mark a different profession when no medical evidence accompanies them in the same employment. */
const OTHER = /student|estudiante|etudiant|studierende|humanities|humanidades|engineer|econom|\blaw\b|legal|attorney|accountant|accounting|financ|marketing|business|architect|physic(s|ist)\b|chemist|mathemat|\bstatistic|computer|software|informatic|linguist|histor|philosoph|sociolog|psycholog|politic|literature|music|\barts?\b|geolog|geograph|agricultur|veterinar|dentist|dental|theolog|religio|anthropolog|arch(a)?eolog|astronom|ecolog|mechanical|electrical|civil|aerospace|material|nuclear|petroleum|mining|forestry|fisher|tourism|hospitality|sport|journalis|media|communication|education|teacher|librar/i;

type Employment = { org: string; dept: string; role: string };
type EmploymentsJson = { "affiliation-group"?: { summaries?: { "employment-summary"?: { "department-name"?: string | null; "role-title"?: string | null; organization?: { name?: string | null } } }[] }[] };

/** Second look at an accepted ORCID: fetch its employments and reject a different profession or a record with no medical or institutional evidence. */
async function vetOrcid(orcid: string, p: PersonInput): Promise<{ ok: boolean; note: string }> {
  orcidRequests++;
  const j = (await getJson(`https://pub.orcid.org/v3.0/${orcid}/employments`, { Accept: "application/json" })) as EmploymentsJson;
  const jobs: Employment[] = [];
  for (const g of j["affiliation-group"] ?? []) for (const s of g.summaries ?? []) {
    const e = s["employment-summary"];
    if (e) jobs.push({ org: e.organization?.name ?? "", dept: e["department-name"] ?? "", role: e["role-title"] ?? "" });
  }
  const describe = jobs.map((e) => [e.role, e.dept, e.org].filter(Boolean).join(", ")).join(" | ").slice(0, 200);
  if (!jobs.length) return { ok: false, note: "no employments to vet against" };
  // an employment whose role or department names another profession with no medical word beside it
  const other = jobs.filter((e) => OTHER.test(`${e.role} ${e.dept}`) && !MEDICAL.test(`${e.role} ${e.dept} ${e.org}`));
  // medical evidence: a medical word, or the linked institution record, or a centre named in the role or summary on two or more distinctive tokens
  const medical = jobs.filter((e) => MEDICAL.test(`${e.role} ${e.dept} ${e.org}`) || strongInstitutionMatch(e.org, p) || (distinctive(e.org).length >= 2 && institutionMatches(e.org, p)));
  // ORCID lists the current employment first: a different profession there, or in at least as many posts as medicine, is a different person
  if (other.length && (other.includes(jobs[0]) || other.length >= medical.length)) return { ok: false, note: `different profession: ${describe}` };
  return medical.length ? { ok: true, note: describe } : { ok: false, note: `no medical or institutional evidence: ${describe}` };
}

/** Person name without initials, folded, for title comparison. */
const nameKey = (s: string) => tokens(s.replace(/\s*\([^)]*\)\s*$/, "")).filter((t) => t.length > 1).join(" ");
const initialsFree = (name: string) => name.split(/\s+/).filter((w) => !/^[A-Z]\.?$/.test(w) && !/^([A-Z]\.){1,3}$/.test(w)).join(" ");

async function lookupWikipedia(p: PersonInput): Promise<Decision> {
  const base: Decision = { id: p.id, name: p.name, field: "wikipedia", status: "none" };
  try {
    const sUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(`${p.name} oncologist`)}&format=json`;
    const j = (await getJson(sUrl, {})) as { query?: { search?: { title: string }[] } };
    const top = j.query?.search?.[0];
    if (!top) return { ...base, note: "no results" };
    const acceptable = new Set([nameKey(initialsFree(p.name)), nameKey(p.name), ...(p.aka ?? []).map((a) => nameKey(initialsFree(a)))]);
    if (!acceptable.has(nameKey(top.title))) return { ...base, note: `top result "${top.title}"` };
    await sleep(PACE_MS);
    const sum = (await getJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(top.title.replace(/ /g, "_"))}`, {})) as { type?: string; extract?: string; description?: string; content_urls?: { desktop?: { page?: string } } };
    if (sum.type === "disambiguation") return { ...base, status: "ambiguous", note: "disambiguation page" };
    const text = fold(`${sum.description ?? ""} ${sum.extract ?? ""}`);
    const { strong } = centreText(p);
    const instHit = strong.some((s) => { const d = distinctive(s); return d.length && d.every((t) => text.includes(t)); });
    const fieldHit = /oncolog|cancer|haematolog|hematolog/.test(text);
    if (!fieldHit && !instHit) return { ...base, status: "ambiguous", note: `"${top.title}" summary does not mention oncology or the institution` };
    const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(top.title.replace(/ /g, "_"))}`;
    return { ...base, status: "added", value: url, note: sum.description ?? "" };
  } catch (e) {
    return { ...base, status: "error", note: String(e) };
  }
}

/** Insert a field right after the record's `id` in its source file; skipped when the id line is not unique. */
function insertField(file: string, id: string, field: string, value: string): boolean {
  const path = join(ROOT, file);
  const src = readFileSync(path, "utf8");
  const re = new RegExp(`(^[ \\t]*(?:p\\(\\{ |\\{ )?id: "${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",)`, "gm");
  const hits = src.match(re);
  if (!hits || hits.length !== 1) { console.warn(`  ! ${id}: id line not unique in ${file} (${hits?.length ?? 0})`); return false; }
  writeFileSync(path, src.replace(re, `$1 ${field}: "${value}",`));
  return true;
}

/** Does an ORCID institution string name the person's linked institution record (name or aka)? The stricter path. */
function strongInstitutionMatch(orcidInst: string, p: PersonInput): boolean {
  const oi = distinctive(orcidInst);
  if (!oi.length) return false;
  const oiSet = new Set(oi);
  return centreText(p).strong.some((s) => {
    const d = distinctive(s);
    const sSet = new Set(d);
    return (d.length > 0 && d.every((t) => oiSet.has(t))) || (oi.length <= 2 && oi.every((t) => sSet.has(t)));
  });
}

/** --review: list accepted ORCIDs from the last run whose only evidence was a centre named in the role or summary. */
function review() {
  const decisions = JSON.parse(readFileSync(OUT, "utf8")) as Decision[];
  const byId = new Map(FILES.flatMap((f) => f.people.map((p) => [p.id, p] as const)));
  for (const d of decisions) {
    if (d.field !== "orcid" || d.status !== "added") continue;
    const p = byId.get(d.id);
    if (!p) continue;
    const insts = (d.note ?? "").split("; ").filter(Boolean);
    if (insts.some((i) => strongInstitutionMatch(i, p))) continue;
    console.log(`WEAK ${p.id} ${d.value} | ${p.role ?? ""} | ${insts.join("; ").slice(0, 160)}`);
  }
}

/** --recheck[=id,id]: re-vet ORCIDs rejected in the last run under the current rules and insert those now accepted. */
async function recheck(ids: string[]) {
  const log = JSON.parse(readFileSync(OUT, "utf8")) as Decision[];
  const byId = new Map(FILES.flatMap((f) => f.people.map((p) => [p.id, { p, file: f.file }] as const)));
  for (const d of log) {
    if (d.field !== "orcid" || d.status !== "rejected" || !d.value || (ids.length && !ids.includes(d.id))) continue;
    const rec = byId.get(d.id);
    if (!rec) continue;
    const v = await vetOrcid(d.value, rec.p);
    console.log(`recheck ${v.ok ? "added" : "rejected"} ${rec.p.name} ${d.value} (${v.note.slice(0, 120)})`);
    if (v.ok) { d.status = "added"; d.note = `rechecked => ${v.note}`; if (!DRY) insertField(rec.file, rec.p.id, "orcid", d.value); }
    await sleep(PACE_MS);
  }
  writeFileSync(OUT, JSON.stringify(log, null, 2));
}

async function main() {
  if (args.includes("--review")) return review();
  const rc = args.find((a) => a.startsWith("--recheck"));
  if (rc) return recheck(rc.includes("=") ? rc.split("=")[1].split(",") : []);
  const prior: Decision[] = SKIP_LOGS.flatMap((f) => JSON.parse(readFileSync(f, "utf8")) as Decision[]);
  const tried = { orcid: new Set<string>(), wikipedia: new Set<string>() };
  for (const d of prior) tried[d.field].add(d.id);
  const orcidQueue: { file: string; p: PersonInput }[] = [];
  const wikiQueue: { file: string; p: PersonInput }[] = [];
  for (const f of FILES) for (const p of f.people) {
    if (f.researchers && !p.orcid && !tried.orcid.has(p.id)) orcidQueue.push({ file: f.file, p });
    if (!p.wikipedia && !tried.wikipedia.has(p.id)) wikiQueue.push({ file: f.file, p });
  }
  if (prior.length) console.log(`skipping ${tried.orcid.size} people already tried for ORCID and ${tried.wikipedia.size} for Wikipedia (${SKIP_LOGS.join(", ")})`);
  // heroes lacking Wikipedia are the likeliest to have articles: place them right after the investigators
  const invCount = peopleInvestigatorsWave.filter((p) => !p.wikipedia).length;
  const heroesFirst = wikiQueue.filter((x) => x.file.includes("heroes"));
  const others = wikiQueue.filter((x) => !x.file.includes("heroes"));
  const wikiOrdered = [...others.slice(0, invCount), ...heroesFirst, ...others.slice(invCount)];
  console.log(`people lacking orcid: ${orcidQueue.length}, lacking wikipedia: ${wikiQueue.length}; budgets ${ORCID_BUDGET}/${WIKI_BUDGET}${DRY ? " (dry run)" : ""}`);

  let orcidTried = 0;
  const runOrcid = async () => {
    for (const { file, p } of orcidQueue) {
      if (orcidRequests + 2 > ORCID_BUDGET) break; // leave room for the search and its vetting request
      orcidTried++;
      let d = await lookupOrcid(p);
      if (d.status === "added" && d.value) {
        await sleep(PACE_MS);
        try {
          const v = await vetOrcid(d.value, p);
          d = v.ok ? { ...d, note: `${d.note} => ${v.note}` } : { ...d, status: "rejected", note: v.note };
        } catch (e) {
          d = { ...d, status: "error", note: `vetting failed: ${String(e)}` };
        }
      }
      decisions.push(d);
      console.log(`orcid ${d.status.padEnd(9)} ${p.name} ${d.value ?? ""} ${d.note ? `(${d.note.slice(0, 120)})` : ""}`);
      if (d.status === "added" && d.value && !DRY) insertField(file, p.id, "orcid", d.value);
      await sleep(PACE_MS);
    }
  };
  const runWiki = async () => {
    for (const { file, p } of wikiOrdered.slice(0, WIKI_BUDGET)) {
      const d = await lookupWikipedia(p);
      decisions.push(d);
      console.log(`wiki  ${d.status.padEnd(9)} ${p.name} ${d.value ?? ""} ${d.note ? `(${d.note.slice(0, 90)})` : ""}`);
      if (d.status === "added" && d.value && !DRY) insertField(file, p.id, "wikipedia", d.value);
      await sleep(PACE_MS);
    }
  };
  await Promise.all([runOrcid(), runWiki()]);

  writeFileSync(OUT, JSON.stringify(decisions, null, 2));
  const count = (field: string, status: string) => decisions.filter((d) => d.field === field && d.status === status).length;
  console.log(`\nORCID: ${count("orcid", "added")} added, ${count("orcid", "rejected")} rejected after vetting, ${count("orcid", "ambiguous")} ambiguous, ${count("orcid", "none")} none, ${count("orcid", "error")} errors; ${orcidRequests} requests, ${orcidQueue.length - orcidTried} people still untried`);
  const wikiTried = Math.min(WIKI_BUDGET, wikiOrdered.length);
  console.log(`Wikipedia: ${count("wikipedia", "added")} added, ${count("wikipedia", "ambiguous")} ambiguous, ${count("wikipedia", "none")} none, ${count("wikipedia", "error")} errors; ${wikiOrdered.length - wikiTried} people still untried`);
  console.log(`decisions: ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
