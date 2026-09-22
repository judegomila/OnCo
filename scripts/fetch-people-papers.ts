/**
 * Wave 6 of docs/CONTENT-ROADMAP.md, step 1: papers for the people who have none.
 *
 * For each person with no `papers` and no `keyPapers`, whose role is a research or clinical post rather than an
 * administrative one and who has an institution on record, ask Europe PMC for PubMed records by author name and
 * affiliation, with a cancer keyword taken from the person's record, and keep up to three most cited records on which
 * an author with the person's surname and initials carries an affiliation naming the person's institution. Where the
 * corpus already holds a paper with the same DOI or PMID the existing record is linked; otherwise a new record is written
 * to src/data/papers-people-wave6.ts with title, journal, year, DOI, PMID and authors read verbatim from Europe PMC and
 * the abstract reproduced as the summary. The person's `papers` rows and `keyPapers` ids go to
 * src/data/person-papers-wave6.ts, which src/data/index.ts merges into the person record.
 *
 *   npx tsx scripts/fetch-people-papers.ts                       dry run: report what would be linked
 *   npx tsx scripts/fetch-people-papers.ts --apply --max=60      write the data files
 *   npx tsx scripts/fetch-people-papers.ts --only=amer-zeidan --debug
 *
 * Rules (no invented facts):
 *   - administrators are never searched: chief executives, presidents, chairs, deans, provosts, directors of operations,
 *     representatives, secretaries, ministers, trustees, donors, patients, advocates, founders and public figures, unless
 *     the role also names a research or clinical post (professor, oncologist, surgeon, head of a unit, chief of a service);
 *     a bare "director" or "chief" of a whole institution is treated as an administrator too;
 *   - a person with no institution on record is not searched: the affiliation is the disambiguator;
 *   - a record counts only when its own author list holds an author whose surname and first initial are the person's
 *     (and whose second initial agrees when both give one) and whose affiliation string names the institution: a name,
 *     alias or parent university of the institution record, or one distinctive word of its name;
 *   - letters, comments, editorials, errata, retractions, news and interviews are not papers; reviews are kept;
 *   - when the matching authors across the records carry two different first names, the name is ambiguous and the
 *     person goes into PERSON_PAPER_SKIP with the reason; clear the entry to try again;
 *   - new paper records link the person and the journal only, never drugs or cancers: wave 1 measured on the Ask OnCo
 *     benchmark what copying relations onto fetched records costs.
 *
 * Europe PMC is budget-free. Requests are made one at a time, 250 ms apart, with a User-Agent naming OnCo, and every
 * raw response is cached under /tmp/europepmc-cache (scripts/wave6-shared.ts). Each new paper record also gets its Europe PMC
 * citation count written to public/citations/index.json, from the same record, so the citations gauge stays covered.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { nameParts, norm } from "../src/lib/completeness";
import { roleBucket } from "../src/lib/person-roles";
import type { Cancer, Institution, Paper, PaperInput, Person } from "../src/lib/schema";
import { papersPeopleWave6 } from "../src/data/papers-people-wave6";
import { personPapersWave6, PERSON_PAPER_SKIP, type PersonPaperEntry, type PersonPaperLinks } from "../src/data/person-papers-wave6";
import { today } from "./feed-utils";
import { abstractParagraphs, authorsOf, cancerParts, clean, epmcSearch, houseDashes, journalIndex, journalName, NOT_A_PAPER_TYPES, normDoi, paperLinks, paperTypeOf, recordCitations, recordLines, requestCount, slug, writePapersFile, type EpmcAuthor, type EpmcResult } from "./wave6-shared";

const PAPERS_FILE = join(process.cwd(), "src", "data", "papers-people-wave6.ts");
const LINKS_FILE = join(process.cwd(), "src", "data", "person-papers-wave6.ts");
const PER_PERSON = 3;

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const DEBUG = args.includes("--debug");
const FORCE = args.includes("--force");
const MAX = Number(args.find((a) => a.startsWith("--max="))?.slice(6) ?? Infinity);
const ONLY = args.find((a) => a.startsWith("--only="))?.slice(7).split(",").filter(Boolean);

// ---------------------------------------------------------------------------------------------------------------------
// Roles: who is searched at all
// ---------------------------------------------------------------------------------------------------------------------
// The role regexes live in src/lib/person-roles.ts, shared with the people-papers health gauge so the two agree on who
// is expected to have papers. A `papersExpected` override on the record wins over the role line in both places.
type Bucket = "administrator" | "institution head" | "no institution" | "search";
function bucket(p: Person): Bucket {
  const hasInst = p.institutionId || p.institutions.length;
  if (p.papersExpected === false) return "administrator";
  if (p.papersExpected === true) return hasInst ? "search" : "no institution";
  const b = roleBucket(p.role); // the role line only: tags such as "clinician-scientist" describe the record, not the post
  if (b === "researcher") return hasInst ? "search" : "no institution";
  return b;
}

// ---------------------------------------------------------------------------------------------------------------------
// Names and affiliations
// ---------------------------------------------------------------------------------------------------------------------
const HONORIFICS = /\b(Jr|Sr|II|III|IV|MD|PhD|DPhil|MBBS|OBE|CBE|MBE|DBE|KBE|FRS|FRCP|FRCS|FRCR|FACS|Dame|Sir|Dr|Prof|Professor|Lord|Baroness|Baron)\.?(?=\s|$)/g;
type ParsedName = { surname: string; compound?: string; first: string; middle: string[]; given: string[] };
/** Records from these countries write the family name first ("Zhang Shuyang", "Chen Wei-ming"); PubMed lists them as "Zhang S" and "Chen WM". */
const SURNAME_FIRST = new Set(["CN", "TW", "HK", "MO", "VN"]);
function parseName(name: string, surnameFirst = false): ParsedName | null {
  const n = name.replace(/"[^"]*"|“[^”]*”/g, " ").replace(/\([^)]*\)/g, " ").replace(/,.*$/, "").replace(HONORIFICS, " ").replace(/\s+/g, " ").trim();
  let parts = n.split(" ").filter(Boolean);
  if (parts.length < 2) return null;
  if (surnameFirst) parts = [...parts.slice(1), parts[0]];
  const surname = parts[parts.length - 1];
  const given = parts.slice(0, -1).filter((t) => /^[A-ZÀ-Ý]/.test(t));
  if (!given.length) return null;
  const first = given[0].replace(/[.-]/g, "")[0].toUpperCase();
  // "Amer M. Zeidan": a middle initial is a short token or one that ends with a full stop; "Wei-ming" gives WM.
  const middle = surnameFirst
    ? given.flatMap((t) => t.split("-").slice(1)).map((t) => t[0]?.toUpperCase()).filter(Boolean)
    : given.slice(1).filter((t) => t.length <= 2 || /\.$/.test(t)).map((t) => t.replace(/[.-]/g, "")[0].toUpperCase());
  const compound = !surnameFirst && parts.length >= 3 && !/\.$/.test(parts[parts.length - 2]) && parts[parts.length - 2].length > 2 ? `${parts[parts.length - 2]} ${surname}` : undefined;
  return { surname, compound, first, middle, given };
}

const GENERIC_WORDS = new Set(["the", "of", "and", "for", "at", "in", "de", "di", "del", "della", "des", "du", "la", "le", "el", "der", "van", "von", "cancer", "comprehensive", "center", "centre", "hospital", "hospitals", "university", "universitario", "universitaria", "universitat", "universite", "universita", "institute", "institut", "instituto", "istituto", "foundation", "fondazione", "fundacion", "trust", "nhs", "national", "medical", "school", "medicine", "health", "research", "clinic", "clinical", "general", "department", "new", "network", "group", "sciences", "science", "college", "memorial", "regional", "royal", "saint", "st", "united", "american", "european", "international", "city", "county", "state", "children", "childrens", "women", "womens", "thomas", "john", "johns", "mary", "joseph", "francis", "george", "james", "michael", "luke", "jude", "irccs", "ospedale", "ospedali", "policlinico", "krankenhaus", "klinikum", "hopital", "hospitalier", "centro", "oncology", "oncologia", "oncologico", "oncologie", "care", "system", "campus", "partners", "academic", "teaching", "faculty", "public", "agency", "service", "services", "association", "society", "program", "programme", "area", "consortium", "lutte", "contre", "haven", "regional", "hospitalier", "universitaire", "central", "greater", "north", "south", "east", "west", "santa", "facultad", "faculdade", "departamento", "dipartimento", "nazionale", "tumori", "cancro", "krebs", "zentrum", "klinik", "kliniken", "hospices", "civils", "assistance", "publique", "hopitaux", "ospedaliera", "azienda", "sanitaria", "fondation", "stiftung", "healthcare", "medizinische", "hochschule", "universitair", "ziekenhuis", "academisch", "medisch", "centrum", "sjukhus", "universitets", "hospitalet", "universitatsklinikum", "universitaetsklinikum", "medical", "center", "centre", "hospital", "national", "institute", "sciences", "foundation", "college", "research", "clinical", "specialist", "specialized", "specialised", "advanced", "projects", "agency", "authority", "ministry", "department", "district", "provincial", "municipal", "people", "peoples", "hospital", "affiliated", "first", "second", "third", "union", "cancer", "oncology", "oncologic", "oncologia", "oncological", "comprehensive", "children", "memorial", "general"]);
/** Phrases and single distinctive words that may stand for the institution in an affiliation string. */
function institutionPhrases(inst: Institution): { phrases: string[]; words: string[] } {
  const raw = [...nameParts(inst.name), ...inst.aka.flatMap(nameParts), ...(inst.university ? nameParts(inst.university) : [])];
  const phrases = [...new Set(raw.map((s) => s.trim()).filter((s) => norm(s).split(" ").some((w) => !GENERIC_WORDS.has(w)) && s.length >= 4))];
  const cityWords = new Set(norm(inst.city).split(" "));
  const words = [...new Set(raw.flatMap((s) => norm(s).split(" ")).filter((w) => w.length >= 6 && !GENERIC_WORDS.has(w) && !cityWords.has(w) && !/^\d+$/.test(w)))];
  return { phrases, words };
}
const affiliationNames = (aff: string, ph: { phrases: string[]; words: string[] }): string | undefined => {
  const a = norm(aff);
  return ph.phrases.find((p) => a.includes(norm(p))) ?? ph.words.find((w) => new RegExp(`(^|\\s)${w}(\\s|$)`).test(a));
};

/** Edit distance, for first names that differ by one typed letter ("Anthony", "Anthonny"). */
function editDistance(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array<number>(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
/** First names that are really different: one is not a prefix or a one-letter misspelling of another. */
function distinctNames(names: string[]): string[] {
  const out: string[] = [];
  for (const n of [...new Set(names)].sort((a, b) => b.length - a.length)) if (!out.some((o) => o.startsWith(n) || n.startsWith(o) || editDistance(o, n) <= 1)) out.push(n);
  return out;
}

/** Authors on the record who are this person by surname and initials. */
function matchingAuthors(authors: EpmcAuthor[], n: ParsedName): EpmcAuthor[] {
  const sur = norm(n.surname), comp = n.compound ? norm(n.compound) : undefined;
  return authors.filter((a) => {
    const last = norm(a.lastName ?? "");
    if (!last) return false;
    const exact = last === sur || (comp !== undefined && last === comp);
    if (!exact && !last.endsWith(` ${sur}`)) return false;
    const ini = (a.initials ?? "").replace(/[^A-Za-z]/g, "").toUpperCase();
    if (!ini || ini[0] !== n.first) return false;
    if (exact && last === sur && n.middle.length && ini.length >= 2 && ini[1] !== n.middle[0]) return false;
    return true;
  });
}
const affiliationsOf = (a: EpmcAuthor, r: EpmcResult, isFirst: boolean): string[] => {
  const own = (a.authorAffiliationDetailsList?.authorAffiliation ?? []).map((x) => x.affiliation ?? "").filter(Boolean);
  if (own.length) return own;
  return isFirst && r.affiliation ? [r.affiliation] : [];
};

// ---------------------------------------------------------------------------------------------------------------------
// Corpus
// ---------------------------------------------------------------------------------------------------------------------
const g = graph();
const cancers = g.kind("cancer") as Cancer[];
const papersByDoi = new Map<string, Paper>();
const papersByPmid = new Map<string, Paper>();
for (const p of g.kind("paper") as Paper[]) { const d = normDoi(p.doi); if (d) papersByDoi.set(d, p); if (p.pmid) papersByPmid.set(p.pmid, p); }
const journalByName = journalIndex(g.kind("journal"));
const usedIds = new Set<string>(g.entities.map((e) => e.id));
const uniqueId = (base: string) => { let id = base; let n = 2; while (usedIds.has(id)) id = `${base}-${n++}`; usedIds.add(id); return id; };

const everyone = (g.kind("person") as Person[])
  .filter((p) => (ONLY ? ONLY.includes(p.id) : p.papers.length === 0 && p.keyPapers.length === 0))
  .filter((p) => !(p.id in PERSON_PAPER_SKIP) && !(p.id in personPapersWave6))
  .sort((a, b) => a.id.localeCompare(b.id));
const buckets = new Map<Bucket, Person[]>();
for (const p of everyone) { const b = ONLY ? "search" : bucket(p); buckets.set(b, [...(buckets.get(b) ?? []), p]); }
const toSearch = (buckets.get("search") ?? []).slice(0, MAX);
console.log(`${everyone.length} people without papers: ${[...buckets.entries()].map(([b, l]) => `${b} ${l.length}`).join(", ")}; searching ${toSearch.length}; ${Object.keys(personPapersWave6).length} already linked by this wave, ${Object.keys(PERSON_PAPER_SKIP).length} skipped`);
if (DEBUG) for (const [b, l] of buckets) if (b !== "search") for (const p of l) console.log(`  [${b}] ${p.id}: ${p.role}`);

const cancerWords = (p: Person): string[] => {
  const names = [...new Set(p.cancers.map((id) => g.get(id) as Cancer | undefined).filter((c): c is Cancer => !!c).flatMap((c) => cancerParts(c.name)))];
  if (names.length) return names.slice(0, 6);
  const spec = p.specialisms.filter((s) => /cancer|oncolog|tumou?r|leuka?emia|lymphoma|myeloma|melanoma|sarcoma|carcinoma|glioma|neoplas/i.test(s)).map((s) => s.replace(/\s*\(.*$/, ""));
  if (spec.length) return spec.slice(0, 4);
  return ["cancer", "oncology", "tumour", "tumor", "neoplasm", "leukaemia", "leukemia", "lymphoma", "myeloma", "carcinoma"];
};
void cancers;

// ---------------------------------------------------------------------------------------------------------------------
// Record writer
// ---------------------------------------------------------------------------------------------------------------------
const asOf = today();
type Kept = { r: EpmcResult; author: EpmcAuthor; affiliation: string; named: string; cited: number; year: number; title: string };

function buildPaper(person: Person, inst: Institution, k: Kept): PaperInput {
  const r = k.r;
  const { journal, abbrev, id: journalId } = journalName(r, journalByName);
  const pubTypes = r.pubTypeList?.pubType ?? [];
  const abstract = r.abstractText ? abstractParagraphs(r.abstractText) : "";
  const plainAbstract = r.abstractText ? clean(r.abstractText) : "";
  const provenance = houseDashes(`Indexed on Europe PMC as PubMed record ${r.pmid}${r.doi ? ` (DOI ${r.doi})` : ""}. Its author list gives "${clean(k.author.fullName ?? `${k.author.lastName} ${k.author.initials}`)}" with the affiliation "${clean(k.affiliation).replace(/\.$/, "")}", which names ${inst.name}; that is how the record was matched to ${person.name}, and no figure has been checked by an editor.`);
  const summary = (abstract ? `${abstract}\n\n` : `Europe PMC indexes no abstract for this record; the title is the only text available.\n\n`) + provenance;
  const tldr = houseDashes(`Paper by ${person.name} indexed on Europe PMC as PubMed record ${r.pmid}, in ${journal} (${k.year}), one of the most cited records naming an author with this name at ${inst.name}.`);
  const whatItMeans = houseDashes(`One of the most cited papers Europe PMC returns for ${person.name} at ${inst.name}, so it is a natural starting point for reading their work. The record was linked automatically from the author list and affiliation; read the abstract above and the paper itself before relying on any figure.`);
  const caveats = [
    "Matched to the person by surname, initials and an affiliation string naming the institution on the Europe PMC record; the summary reproduces the record's abstract and no figure has been verified against the full paper.",
    "Two authors sharing a surname, initials and institution cannot be told apart by this method; the person's profile links are the place to confirm authorship.",
  ];
  const id = uniqueId(`paper-${slug(person.id)}-${slug(abbrev).slice(0, 40) || "journal"}-${k.year}`);
  return {
    kind: "paper", asOf, id, name: k.title.replace(/\.$/, ""), tldr, summary, journal, year: k.year, ...(r.doi ? { doi: r.doi } : {}), pmid: r.pmid!, authors: authorsOf(r.authorString),
    paperType: paperTypeOf(pubTypes, k.title, plainAbstract), findings: [], whatItMeans, caveats, links: paperLinks(r, k.year, abbrev), tags: ["europepmc-ingest"],
    // Only the person and the journal: copying cancers or drugs onto fetched records dilutes those pages' search vectors (wave 1, Ask OnCo benchmark).
    people: [person.id], ...(journalId ? { journals: [journalId] } : {}),
  };
}
const entryFor = (paper: { name: string; journal: string; year: number; doi?: string; pmid?: string }, inst: Institution, cited: number): PersonPaperEntry => ({
  title: paper.name, journal: paper.journal, year: paper.year, ...(paper.doi ? { doi: paper.doi } : {}),
  url: paper.doi ? `https://doi.org/${paper.doi}` : `https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`,
  note: houseDashes(`Europe PMC author record matched by affiliation (${inst.name}); ${cited} citations on Europe PMC.`),
});

// ---------------------------------------------------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------------------------------------------------
type Outcome = { person: string; note: string; skip?: string; papers?: string[] };
async function main(): Promise<void> {
  const outcomes: Outcome[] = [];
  const newPapers: PaperInput[] = [];
  const citationRows: Array<{ paperId: string; r: EpmcResult }> = [];
  const newLinks: Record<string, PersonPaperLinks> = {};
  const newSkips: Record<string, string> = {};
  const tally = { linked: 0, created: 0, existing: 0, noHits: 0, noneVerified: 0, ambiguous: 0, unparsable: 0, failed: 0 };

  for (const person of toSearch) {
    const inst = ((person.institutionId && g.get(person.institutionId)) || (person.institutions[0] && g.get(person.institutions[0]))) as Institution | undefined;
    if (!inst || inst.kind !== "institution") { tally.unparsable++; outcomes.push({ person: person.id, note: "institution id does not resolve" }); continue; }
    const n = parseName(person.name, SURNAME_FIRST.has(inst.country));
    if (!n) { tally.unparsable++; outcomes.push({ person: person.id, note: `name "${person.name}" has no surname and given name to search` }); continue; }
    const ph = institutionPhrases(inst);
    if (!ph.phrases.length && !ph.words.length) { tally.unparsable++; outcomes.push({ person: person.id, note: `institution "${inst.name}" has no distinctive word to anchor the affiliation` }); continue; }
    const authForms = [...new Set([`${n.surname} ${n.first}`, ...(n.middle.length ? [`${n.surname} ${n.first}${n.middle[0]}`] : []), ...(n.compound ? [`${n.compound} ${n.first}`] : [])])];
    const affTerms = [...ph.phrases.slice(0, 4).map((p) => `"${p.replace(/"/g, "")}"`), ...ph.words.slice(0, 3)];
    const kw = cancerWords(person);
    const query = `(${authForms.map((a) => `AUTH:"${a}"`).join(" OR ")}) AND AFF:(${affTerms.join(" OR ")}) AND (${kw.map((k) => `"${k}"`).join(" OR ")}) AND SRC:MED`;
    if (DEBUG) console.log(`\n${person.id}: ${query}`);
    const res = await epmcSearch(query, { pageSize: 25, force: FORCE });
    if (!res) { tally.failed++; outcomes.push({ person: person.id, note: "request failed" }); continue; }
    const results = res.resultList?.result ?? [];
    if (!results.length) { tally.noHits++; outcomes.push({ person: person.id, note: `no PubMed record names ${authForms[0]} at ${inst.name} with a cancer keyword` }); continue; }
    const kept: Kept[] = [];
    for (const r of results) {
      if (r.source !== "MED" || !r.pmid || !r.title) continue;
      const pubTypes = r.pubTypeList?.pubType ?? [];
      if (pubTypes.some((t) => NOT_A_PAPER_TYPES.includes(t))) { if (DEBUG) console.log(`  ${r.pmid}: not a paper (${pubTypes.join("; ")})`); continue; }
      const authors = r.authorList?.author ?? [];
      const mine = matchingAuthors(authors, n);
      if (!mine.length) { if (DEBUG) console.log(`  ${r.pmid}: no author ${n.surname} ${n.first} on the record`); continue; }
      let hit: Kept | undefined;
      for (const a of mine) {
        for (const aff of affiliationsOf(a, r, authors[0] === a)) {
          const named = affiliationNames(aff, ph);
          if (named) { hit = { r, author: a, affiliation: aff, named, cited: r.citedByCount ?? 0, year: Number(r.pubYear ?? 0), title: clean(r.title) }; break; }
        }
        if (hit) break;
      }
      if (!hit) { if (DEBUG) console.log(`  ${r.pmid}: author matched but no affiliation names ${inst.name}`); continue; }
      if (DEBUG) console.log(`  ${r.pmid} ${hit.year} cited ${hit.cited} via "${hit.named}" | ${hit.title.slice(0, 100)}`);
      kept.push(hit);
    }
    if (!kept.length) { tally.noneVerified++; outcomes.push({ person: person.id, note: `${res.hitCount} records found but none names both the author and ${inst.name}` }); continue; }
    // Ambiguity: the matching authors carry different first names, so at least two people share the surname and initials at the institution.
    const firstNames = distinctNames(kept.map((k) => norm(k.author.firstName ?? "").split(" ")[0]).filter((f) => f.length > 1));
    if (firstNames.length > 1) {
      const reason = `authors with different first names (${firstNames.join(", ")}) share the surname ${n.surname} and initial ${n.first} at ${inst.name}`;
      tally.ambiguous++; newSkips[person.id] = reason; outcomes.push({ person: person.id, note: "skipped", skip: reason }); continue;
    }
    const givenFirst = norm(n.given[0]);
    if (firstNames.length === 1 && n.given[0].length > 2 && firstNames[0] !== givenFirst && !firstNames[0].startsWith(givenFirst) && !givenFirst.startsWith(firstNames[0]) && editDistance(firstNames[0], givenFirst) > 1) {
      const reason = `the matching author is "${kept[0].author.fullName}" with first name ${firstNames[0]}, not ${n.given[0]}`;
      tally.ambiguous++; newSkips[person.id] = reason; outcomes.push({ person: person.id, note: "skipped", skip: reason }); continue;
    }
    kept.sort((a, b) => b.cited - a.cited || b.year - a.year);
    const chosen = kept.slice(0, PER_PERSON);
    const links: PersonPaperLinks = { papers: [], keyPapers: [] };
    for (const k of chosen) {
      const existing = (k.r.doi && papersByDoi.get(normDoi(k.r.doi)!)) || papersByPmid.get(k.r.pmid!);
      if (existing) { tally.existing++; links.keyPapers.push(existing.id); links.papers.push(entryFor(existing, inst, k.cited)); continue; }
      const paper = buildPaper(person, inst, k);
      newPapers.push(paper);
      citationRows.push({ paperId: paper.id, r: k.r });
      const d = normDoi(paper.doi); if (d) papersByDoi.set(d, paper as unknown as Paper); papersByPmid.set(paper.pmid!, paper as unknown as Paper);
      tally.created++;
      links.keyPapers.push(paper.id); links.papers.push(entryFor(paper as unknown as Paper, inst, k.cited));
    }
    newLinks[person.id] = links;
    tally.linked++;
    outcomes.push({ person: person.id, note: `linked ${chosen.length} of ${kept.length} verified (${res.hitCount} hits)`, papers: chosen.map((k) => `${k.r.pmid} (${k.cited}, ${k.year})`) });
  }

  for (const o of outcomes) console.log(`${o.person.padEnd(36)} ${o.note}${o.papers ? `  ${o.papers.join("; ")}` : ""}${o.skip ? `  ${o.skip}` : ""}`);
  console.log(`\n${toSearch.length} people searched, ${requestCount()} requests made (the rest from cache).`);
  console.log(`linked ${tally.linked} people (${tally.created} new paper records, ${tally.existing} existing records reused); no record ${tally.noHits}; none verified ${tally.noneVerified}; skipped as ambiguous ${tally.ambiguous}; unparsable ${tally.unparsable}; failed ${tally.failed}`);
  console.log(`not searched by rule: ${[...buckets.entries()].filter(([b]) => b !== "search").map(([b, l]) => `${b} ${l.length}`).join(", ")}`);

  if (!APPLY) { console.log("\nDry run: pass --apply to write src/data/papers-people-wave6.ts and src/data/person-papers-wave6.ts"); return; }

  const allPapers = [...papersPeopleWave6, ...newPapers];
  writePapersFile(PAPERS_FILE, "papersPeopleWave6", asOf, `/**
 * Wave 6 of docs/CONTENT-ROADMAP.md: papers for people who had none. Written by scripts/fetch-people-papers.ts, which
 * asks Europe PMC for PubMed records by author name and affiliation (plus a cancer keyword from the person's record)
 * and keeps up to three most cited records on which an author with the person's surname and initials carries an
 * affiliation naming the person's institution. Title, journal, year, DOI, PMID and authors are read from the Europe
 * PMC record; the summary reproduces the record's abstract with markup removed and house-style dashes; the TL;DR,
 * "what it means" and caveats say only how the record was matched. Nothing here has been read by an editor:
 * findings are left empty on purpose. People link to these records through src/data/person-papers-wave6.ts.
 * Do not edit by hand; re-run the script.
 */`, allPapers);
  const allLinks = { ...personPapersWave6, ...newLinks };
  const allSkips = { ...PERSON_PAPER_SKIP, ...newSkips };
  writeFileSync(LINKS_FILE, `/**
 * Person to paper links written by scripts/fetch-people-papers.ts (wave 6 of docs/CONTENT-ROADMAP.md). Each entry
 * carries the \`papers\` rows a person's page should list (title, journal, year, DOI, URL and a note saying how the
 * record was matched) and the ids of the paper records behind them, in src/data/papers-people-wave6.ts or elsewhere
 * in the corpus. src/data/index.ts merges both into the person record. PERSON_PAPER_SKIP lists people the script
 * will not retry because the Europe PMC match was ambiguous, with the reason; clear an entry to try again.
 * Do not edit by hand; re-run the script.
 */
export type PersonPaperEntry = { title: string; journal?: string; year?: number; url?: string; doi?: string; note?: string };
export type PersonPaperLinks = { papers: PersonPaperEntry[]; keyPapers: string[] };

export const personPapersWave6: Record<string, PersonPaperLinks> = {
${recordLines(allLinks)}
};

export const PERSON_PAPER_SKIP: Record<string, string> = {
${recordLines(allSkips)}
};
`);
  const counts = recordCitations(citationRows, asOf);
  console.log(`\nWrote ${allPapers.length} paper records and ${Object.keys(allLinks).length} person links (${Object.keys(allSkips).length} skips); ${counts} citation counts added to public/citations/index.json.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
