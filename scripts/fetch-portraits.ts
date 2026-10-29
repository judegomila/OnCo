/**
 * Fetches portraits into public/portraits/ for every person record, from Wikimedia Commons only.
 *
 * Per person:
 *   1. Resolve a Wikidata item, strongest evidence first:
 *        a. a manual QID in OVERRIDE;
 *        b. the record's own `wikipedia` URL (the sitelink names the item);
 *        c. the record's ORCID iD, matched exactly against Wikidata P496;
 *        d. a name search: wbsearchentities over the name and each `aka`, plus a full-text search
 *           restricted to humans that carry an image (haswbstatement:P31=Q5 and P18), because a common
 *           name's first seven hits are often all imageless author items and the right person sits lower.
 *      Routes a to c assert identity; route d does not, so a name-search item must pass every check:
 *        - its label shares the surname AND the first given name (or its initial);
 *        - its description, occupations (P106) or employers (P108) carry an oncology signal, an employer
 *          matching one of the record's institutions, or a specific role word the record also uses
 *          (generic words such as "researcher", "professor" or a nationality do not count);
 *        - athletes, politicians, entertainers and the like are rejected unless the record is a hero /
 *          public figure whose role says so;
 *        - an item with a date of death (P570) is rejected unless the record's own text gives that year
 *          or says the person died;
 *        - when two different name-search items pass and both have images, neither is taken.
 *      Every route still requires a human (P31 = Q5) whose label shares the record's surname.
 *   2. Take P18 (image); when the item has none, take the lead image of the person's own Wikipedia
 *      article, but only when that file is hosted on Commons. Read the Commons file's extmetadata
 *      (LicenseShortName, Artist, Credit, AttributionRequired, LicenseUrl) and keep only CC0, CC BY 1.0
 *      to 4.0, CC BY-SA 1.0 to 4.0 and public-domain files.
 *   3. Download a 320px-wide thumbnail via Special:FilePath and record licence, author and
 *      attribution in public/portraits/index.json.
 *
 * Never scrapes institutional or news photos. Polite: about 2.5 requests per second, a User-Agent
 * naming OnCo, retries with backoff. Resumable: ids fetched (or checked) under 30 days ago are skipped
 * unless --force.
 *
 * Run: npm run fetch:portraits                 (or: npx tsx scripts/fetch-portraits.ts)
 *      npm run fetch:portraits -- --force      re-check everything
 *      npm run fetch:portraits -- --only=<id>[,<id>...] --force   specific people (or --ids-file=<path>, one id per line)
 *      npm run fetch:portraits -- --limit=<n>  stop after n network lookups (for testing)
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";

const OUT = join(process.cwd(), "public", "portraits");
mkdirSync(OUT, { recursive: true });
const INDEX = join(OUT, "index.json");
const UA = "OnCo portrait fetcher/1.0 (https://github.com/judegomila/OnCo; contact via GitHub issues)";
const MAX_BYTES = 300 * 1024;
const FRESH_DAYS = 30;
const force = process.argv.includes("--force");
const idsFile = process.argv.find((a) => a.startsWith("--ids-file="))?.slice(11);
const only = new Set([
  ...(process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",") ?? []),
  ...(idsFile ? readFileSync(idsFile, "utf8").split(/[\s,]+/) : []),
].filter(Boolean));
const limit = Number(process.argv.find((a) => a.startsWith("--limit="))?.slice(8) ?? Infinity);

export type PortraitEntry = {
  id: string;
  qid: string;
  /** File under public/portraits/ (e.g. "emily-whitehead.jpg"). */
  file: string;
  /** Commons file title without the "File:" prefix. */
  commonsFile: string;
  license: string;
  licenseUrl?: string;
  author: string;
  /** Ready-to-show line, e.g. "Photo: Jane Doe, CC BY-SA 4.0, via Wikimedia Commons". */
  attribution: string;
  /** Commons file page URL. */
  source: string;
  fetched: string;
  /** How the Wikidata item was found: "override", "wikipedia", "orcid" or "name search". */
  matchedBy?: string;
  /** Where the file came from: the item's P18, or the lead image of its Wikipedia article. */
  via?: "P18" | "wikipedia lead image";
};
export type Unresolved = { reason: string; qid?: string; checked: string };
export type Rejected = { qid: string; label: string; description: string; reason: string };
export type PortraitIndex = {
  generated: string;
  portraits: Record<string, PortraitEntry>;
  unresolved: Record<string, Unresolved>;
  /** Human items that were found for a name but failed the plausibility check (for review). */
  rejected: Record<string, Rejected[]>;
};

const index: PortraitIndex = existsSync(INDEX)
  ? JSON.parse(readFileSync(INDEX, "utf8"))
  : { generated: "", portraits: {}, unresolved: {}, rejected: {} };
index.portraits ??= {}; index.unresolved ??= {}; index.rejected ??= {};

/** Manual help: a Wikidata QID for ambiguous names, or null to skip a person entirely. */
const OVERRIDE: Record<string, string | null> = {
  // Identity checked by hand on 29 October 2026: the item's employer, description or a Commons file description
  // names the record's own post, but Wikidata lacks the oncology field, employer or role the name search needs.
  "bradley-bernstein": "Q41556685", // Broad / Harvard chromatin biologist; enwiki "Bradley Bernstein"
  "gunter-von-minckwitz": "Q11163000", // German gynaecologist, Goethe University Frankfurt; founded German Breast Group
  "louis-staudt": "Q47907557", // Commons file "Chief of the Lymphoid Malignancies Branch Louis Michael Staudt"
  "andrea-sironi": "Q18812274", // enwiki: Chairman of Fondazione AIRC since May 2021
  "robert-langer": "Q669597", // MIT Institute Professor, biomedical engineer
  "mark-suzman": "Q115276073", // description: CEO, Bill & Melinda Gates Foundation
  "john-arne-rottingen": "Q11978896", // Norwegian physician, now Wellcome chief executive
  "jose-luis-poveda-andres": "Q68705514", // Valencia hospital pharmacist, La Fe manager
  "lionel-collet": "Q3241841", // French physician, president of the Haute Autorité de Santé
  "ofer-merin": "Q66724655", // Israeli physician, Shaare Zedek director general
  "yitshak-kreiss": "Q6858586", // Israeli physician, Sheba director general
  "angelita-habr-gama": "Q9615295", // USP surgery professor; Commons file description names her
  "crystal-mackall": "Q64697915", // Stanford physician-immunologist (cell therapy)
  "govindan-rangarajan": "Q97457577", // Indian mathematician, director of the Indian Institute of Science
  "laurene-powell-jobs": "Q3133593", // philanthropist, Emerson Collective
  "madeline-bell": "Q108809595", // description: president and CEO of Children's Hospital of Philadelphia
  "robert-schreiber": "Q7343346", // Washington University immunologist (cancer immunoediting)
  "sid-sijbrandij": "Q73462638", // GitLab co-founder
  "uwe-haberkorn": "Q126097", // Heidelberg University nuclear medicine

  "robert-stone": null, // name search lands on unrelated Robert Stones (a WWII photograph item); no Wikidata item for the City of Hope CEO
  "solomon-benjamin": null, // "Benjamin Solomon" matches Ben(jamin Solomon) Carson
  "daniel-haber": null, // matches Daniel Häberle
  "fabrice-andre": null, // matches a Gustave Van de Woestijne portrait item
  "per-hall": null, // matches Per Hallström (author)
};

/** Lower-case ASCII words of a name (diacritics stripped, hyphens split). */
const nameWords = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 1);
const HONORIFIC = /^(Dame|Sir|Dr\.?|Prof\.?|Professor|Lord|Baroness|Baron)\s+/i;
const cleanName = (s: string) => s.replace(HONORIFIC, "").replace(/"[^"]*"\s*/g, "").replace(/\s*\(.*?\)\s*/g, " ").replace(/,.*$/, "").replace(/\s+/g, " ").trim();
/** The item's English label must share the record's surname (or two name words, for reordered names). */
function labelMatches(recordName: string, label: string): boolean {
  const rec = nameWords(cleanName(recordName));
  const lab = new Set(nameWords(label));
  if (!rec.length || !lab.size) return false;
  const surname = rec[rec.length - 1];
  const shared = rec.filter((w) => lab.has(w)).length;
  return lab.has(surname) || shared >= 2;
}
/**
 * Stricter test for items found by name search: the label must carry the surname AND the first given name,
 * or that name's initial when the label abbreviates it ("Peter W. T. Pisters" ~ "P. W. Pisters"). Names
 * written family-name first ("Im Seock-Ah") pass when every word of the label's name is in the record.
 */
/** Common English short forms and the formal names they stand for. */
const NICKNAMES: Record<string, string[]> = {
  jim: ["james"], jimmy: ["james"], bob: ["robert"], rob: ["robert"], bill: ["william"], will: ["william"], mike: ["michael"], tom: ["thomas"],
  dick: ["richard"], rick: ["richard"], tim: ["timothy"], steve: ["steven", "stephen"], chris: ["christopher", "christine", "christina"],
  dan: ["daniel"], joe: ["joseph"], ben: ["benjamin"], ed: ["edward", "edwin"], ted: ["edward", "theodore"], tony: ["anthony"], andy: ["andrew"],
  nick: ["nicholas"], pat: ["patrick", "patricia"], kate: ["katherine", "catherine", "kathryn"], liz: ["elizabeth"], beth: ["elizabeth"],
  sue: ["susan"], jo: ["joanna", "josephine"], larry: ["lawrence"], harry: ["harold", "henry"], hank: ["henry"], jack: ["john"], jon: ["jonathan"],
  peggy: ["margaret"], meg: ["margaret"], sandy: ["alexander", "sandra"], alex: ["alexander", "alexandra"], sam: ["samuel", "samantha"],
};
function labelMatchesStrict(recordName: string, label: string): boolean {
  const recRaw = cleanName(recordName).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const labRaw = label.replace(/\s*\(.*?\)\s*/g, " ").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const rec = recRaw.split(/[^a-z]+/).filter(Boolean);
  const lab = labRaw.split(/[^a-z]+/).filter(Boolean);
  const recFull = rec.filter((w) => w.length > 1);
  const labFull = lab.filter((w) => w.length > 1);
  if (!labFull.length || !rec.length) return false;
  // A record written with initials only ("L. S. Shashidhara"): the label must carry the surname and the same initials.
  if (recFull.length === 0) return false;
  if (recFull.length === 1) {
    const recInitials = rec.filter((w) => w.length === 1);
    const labFirst = lab.slice(0, -1).map((w) => w[0]);
    return recInitials.length > 0 && lab[lab.length - 1] === recFull[0] && recInitials.join("") === labFirst.join("");
  }
  const surname = recFull[recFull.length - 1];
  const given = recFull[0];
  const labSet = new Set(labFull);
  const labInitials = new Set(lab.filter((w) => w.length === 1));
  // The label's first given name may be the full form of the record's short one ("Mel" ~ "Melvyn", "Jim" ~ "James").
  const labGiven = labFull[0] === surname ? "" : labFull[0];
  const formal = NICKNAMES[given] ?? [];
  const givenOk = labSet.has(given) || labInitials.has(given[0]) || (given.length >= 3 && labGiven.startsWith(given)) || formal.includes(labGiven);
  if (labSet.has(surname) && givenOk) return true;
  // Reordered or compound names: every full word on both sides appears on the other.
  const recSet = new Set(recFull.join(" ").split(" "));
  const joinedRec = recFull.join("");
  return labFull.length >= 2 && labFull.every((w) => recSet.has(w) || joinedRec.includes(w)) && recFull.every((w) => labSet.has(w) || labFull.join("").includes(w));
}

/** Licences we self-host. Commons LicenseShortName values (ported variants like "CC BY-SA 3.0 de" and "CC BY 3.0 igo" included). */
const LICENSE_OK = /^(CC0(?: 1\.0)?|CC BY(?:-SA)? [1-4](?:\.[05])?(?: [a-z]{2,3}(?:-[a-z]+)?)?|Public domain|PD(?:[- ].*)?|No restrictions)$/i;

/** Words on the Wikidata side that make a human item plausibly ours. */
const DOMAIN = /oncolog|cancer|tumou?r|leuk|lymphom|medic|physician|doctor|surgeon|clinic|scientist|research|professor|academic|biolog|biochem|chemist|genetic|genomic|immunolog|h(?:a)?ematolog|patholog|pharmac|radiolog|radiation|epidemiolog|nurs|health|hospital|universit|institut|laborator|virolog|microbiolog|physiolog|neurolog|paediatric|pediatric|urolog|gyn|dermatolog|gastro|pulmonolog|psycholog|bioinformatic|statistic|engineer|inventor|nobel|biotech|pharma|entrepreneur|executive|businessperson|chief executive|philanthrop|activist|advocate|patient|founder/i;

/** Signals specific enough to identify an oncology person on their own (for name-search items). */
const ONCO = /oncolog|cancer|tumou?r|leuk(?:a)?emi|lymphom|myelom|sarcom|carcinom|melanom|glioma|h(?:a)?ematolog|radiotherap|radiation therap|chemotherap|metasta|blastoma/i;

/** Occupations and descriptions that are almost never our person unless the record says so. */
const MISMATCH = /athlete|footballer|soccer|basketball|baseball|cricketer|rugby|golfer|tennis|boxer|wrestler|swimmer|cyclist|racing driver|sprinter|skier|politician|senator|congress|governor|mayor|minister|diplomat|monarch|prince|princess|actor|actress|singer|songwriter|musician|rapper|composer|comedian|model|film director|screenwriter|television presenter|footballer|jockey|military officer|general|admiral|bishop|priest|pastor|cleric|rabbi|imam|painter|sculptor|poet|novelist|playwright|chef|fashion designer|video game|youtuber|influencer|esports|dancer|choreograph|architect/i;

/** Records allowed to match non-medical public figures: heroes, advocates, patients and other public figures. */
const PUBLIC_FIGURE = /advocate|patient|survivor|campaign|founder|philanthrop|journalist|author|writer|athlete|cyclist|actor|actress|singer|musician|politician|senator|president of the united states|first lady|celebrity|public figure|broadcaster|presenter|olympi|player|champion|entrepreneur|investor|donor|family/i;

// ------------------------------------------------------------------ HTTP helpers
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
let last = 0;
let requests = 0;
async function polite<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  const wait = 400 - (Date.now() - last); // ~2.5 requests per second
  if (wait > 0) await sleep(wait);
  last = Date.now();
  requests++;
  for (let i = 0; ; i++) {
    try { return await fn(); } catch (e) {
      if (i >= retries) throw e;
      const retryAfter = e instanceof HttpError && e.retryAfter ? e.retryAfter * 1000 : 0;
      await sleep(Math.max(retryAfter, 1000 * 2 ** i));
    }
  }
}
class HttpError extends Error { constructor(public status: number, url: string, public retryAfter = 0) { super(`${status} ${url}`); } }
async function getJson(url: string): Promise<unknown> {
  return polite(async () => {
    const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (!r.ok) throw new HttpError(r.status, url, Number(r.headers.get("retry-after") ?? 0));
    return r.json();
  });
}
async function getBytes(url: string): Promise<{ buf: Buffer; type: string } | null> {
  try {
    return await polite(async () => {
      const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
      if (r.status === 404) return null;
      if (!r.ok) throw new HttpError(r.status, url, Number(r.headers.get("retry-after") ?? 0));
      return { buf: Buffer.from(await r.arrayBuffer()), type: r.headers.get("content-type") ?? "" };
    }, 2);
  } catch { return null; }
}

// ------------------------------------------------------------------ Wikidata
type Claims = Record<string, Array<{ mainsnak: { datavalue?: { value: unknown } }; rank?: string }>>;
type Item = { qid: string; label: string; description: string; claims: Claims; sitelinks: Record<string, string> };
type RawEntity = { id?: string; missing?: string; claims?: Claims; labels?: Record<string, { value: string }>; descriptions?: Record<string, { value: string }>; sitelinks?: Record<string, { title: string }> };
const WD = "https://www.wikidata.org/w/api.php";
const ENTITY_PROPS = "props=claims|labels|descriptions|sitelinks&languages=en|mul&format=json";

const toItem = (e: RawEntity | undefined): Item | null => e && e.id && !("missing" in e)
  ? {
    qid: e.id, label: e.labels?.en?.value ?? e.labels?.mul?.value ?? e.id, description: e.descriptions?.en?.value ?? "", claims: e.claims ?? {},
    sitelinks: Object.fromEntries(Object.entries(e.sitelinks ?? {}).map(([k, v]) => [k, v.title])),
  }
  : null;

/** Whole items for up to 50 QIDs per request. */
async function itemsByQid(qids: string[]): Promise<Item[]> {
  const out: Item[] = [];
  const uniq = [...new Set(qids)];
  for (let i = 0; i < uniq.length; i += 50) {
    const batch = uniq.slice(i, i + 50);
    const j = (await getJson(`${WD}?action=wbgetentities&ids=${batch.join("|")}&${ENTITY_PROPS}`)) as { entities?: Record<string, RawEntity> };
    for (const q of batch) { const it = toItem(j.entities?.[q]); if (it) out.push(it); }
  }
  return out;
}
async function itemByQid(qid: string): Promise<Item | null> {
  return (await itemsByQid([qid]))[0] ?? null;
}
async function itemByWikipedia(url: string): Promise<Item | null> {
  const m = url.match(/^https?:\/\/([a-z-]+)\.wikipedia\.org\/wiki\/(.+)$/i);
  if (!m) return null;
  const site = `${m[1].toLowerCase().replace(/-/g, "_")}wiki`;
  const title = decodeURIComponent(m[2]).replace(/_/g, " ").split("#")[0];
  const j = (await getJson(`${WD}?action=wbgetentities&sites=${site}&titles=${encodeURIComponent(title)}&${ENTITY_PROPS}&normalize=1`)) as { entities?: Record<string, RawEntity> };
  return toItem(Object.values(j.entities ?? {})[0]);
}
type Hit = { id: string; label: string; description: string };
async function search(q: string): Promise<Hit[]> {
  const j = (await getJson(`${WD}?action=wbsearchentities&search=${encodeURIComponent(q)}&language=en&uselang=en&type=item&limit=7&format=json`)) as { search?: Array<{ id: string; label?: string; description?: string }> };
  return (j.search ?? []).map((s) => ({ id: s.id, label: s.label ?? "", description: s.description ?? "" }));
}
/** Full-text search over Wikidata (CirrusSearch); returns QIDs. */
async function fullText(q: string, max = 10): Promise<string[]> {
  const j = (await getJson(`${WD}?action=query&list=search&srsearch=${encodeURIComponent(q)}&srlimit=${max}&srnamespace=0&format=json`)) as { query?: { search?: Array<{ title: string }> } };
  return (j.query?.search ?? []).map((s) => s.title).filter((t) => /^Q\d+$/.test(t));
}
/** Humans with an image whose labels or aliases contain every word of the name. */
const imagedHumans = (name: string) => fullText(`${name.replace(/["\\]/g, " ")} haswbstatement:P31=Q5 haswbstatement:P18`);
/** Items carrying this exact ORCID iD (P496). */
const byOrcid = (orcid: string) => /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(orcid) ? fullText(`haswbstatement:P496=${orcid}`, 5) : Promise.resolve([]);

const claimQids = (c: Claims, p: string): string[] => (c[p] ?? []).filter((x) => x.rank !== "deprecated").map((x) => (x.mainsnak.datavalue?.value as { id?: string } | undefined)?.id).filter((v): v is string => !!v);
const claimStrs = (c: Claims, p: string): string[] => {
  const all = (c[p] ?? []).filter((x) => x.rank !== "deprecated");
  const preferred = all.filter((x) => x.rank === "preferred");
  return (preferred.length ? preferred : all).map((x) => x.mainsnak.datavalue?.value).filter((v): v is string => typeof v === "string");
};
/** Year of death (P570), if the item has one. */
const deathYear = (c: Claims): number | undefined => {
  const t = (c.P570 ?? []).filter((x) => x.rank !== "deprecated").map((x) => (x.mainsnak.datavalue?.value as { time?: string } | undefined)?.time).find(Boolean);
  const m = t?.match(/^[+-](\d{4})/);
  return m ? Number(m[1]) : undefined;
};

/** Labels for occupation / employer items, cached across people. */
const labelCache = new Map<string, string>();
async function labels(qids: string[]): Promise<string[]> {
  const missing = [...new Set(qids)].filter((q) => !labelCache.has(q));
  for (let i = 0; i < missing.length; i += 50) {
    const batch = missing.slice(i, i + 50);
    const j = (await getJson(`${WD}?action=wbgetentities&ids=${batch.join("|")}&props=labels&languages=en|mul&format=json`)) as { entities?: Record<string, RawEntity> };
    for (const q of batch) labelCache.set(q, j.entities?.[q]?.labels?.en?.value ?? j.entities?.[q]?.labels?.mul?.value ?? "");
  }
  return qids.map((q) => labelCache.get(q) ?? "").filter(Boolean);
}

// ------------------------------------------------------------------ Matching
function nameVariants(name: string, aka: string[]): string[] {
  const out = new Set<string>();
  const base = cleanName(name);
  out.add(base);
  // Drop middle initials: "Peter W. T. Pisters" -> "Peter Pisters".
  const noInitials = base.replace(/\s(?:[A-Z]\.?\s)+/g, " ").replace(/\s+/g, " ").trim();
  if (noInitials.split(" ").length >= 2) out.add(noInitials);
  for (const a of aka) { const c = cleanName(a); if (c.length > 3) out.add(c); }
  return [...out].filter((v) => v.length > 3);
}

const words = (s: string) => s.toLowerCase().replace(/ae/g, "e").replace(/oe/g, "e").split(/[^a-z]+/).filter((w) => w.length > 3 && !STOP.has(w));
const STOP = new Set(["with", "whose", "that", "this", "from", "into", "their", "were", "have", "been", "which", "about", "after", "over", "into", "chief", "head", "director", "professor", "president", "former", "senior", "lead", "leader", "programme", "program", "division", "department", "service", "center", "centre", "cancer", "medical", "oncology", "medicine",
  // Too generic to tie a namesake to the record on their own.
  "research", "researcher", "researchers", "scientist", "scientists", "university", "institute", "hospital", "clinical", "academic", "national", "international", "society", "foundation", "school", "college", "health", "member", "fellow", "founder", "chair", "board", "executive", "officer", "company", "group", "association", "trust", "world", "global", "born", "american", "british", "english", "scottish", "irish", "welsh", "french", "german", "italian", "spanish", "japanese", "chinese", "korean", "indian", "canadian", "australian", "dutch", "swiss", "swedish", "danish", "norwegian", "finnish", "belgian", "austrian", "israeli", "brazilian", "mexican", "polish", "russian", "greek", "turkish", "physician", "doctor", "biologist", "chemist", "engineer", "writer", "author", "teacher", "lecturer", "manager", "businessperson", "entrepreneur", "studies", "science", "sciences", "scholar", "people", "person"]);

type PersonRec = { id: string; name: string; aka: string[]; role: string; tags: string[]; wikipedia?: string; orcid?: string; institutionNames: string[]; specialisms: string[]; text: string };

/** "neurosurgeon" ~ "neurosurgery", "pediatric" ~ "pediatrics": a common prefix of six or more letters reaching to within two of the shorter word's end. */
function sameStem(a: string, b: string): boolean {
  let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i >= 6 && i >= Math.min(a.length, b.length) - 2;
}

/** Place names that turn up in role lines and in namesakes' employers. */
const PLACE_WORDS = /^(columbia|british|london|paris|berlin|boston|york|texas|california|chicago|toronto|ottawa|montreal|sydney|melbourne|shanghai|beijing|tokyo|seoul|madrid|barcelona|milan|rome|munich|heidelberg|zurich|geneva|amsterdam|stockholm|oslo|copenhagen|helsinki|dublin|edinburgh|glasgow|manchester|birmingham|oxford|cambridge|harvard|stanford|yale|princeton|houston|seattle|atlanta|philadelphia|baltimore|pittsburgh|cleveland|michigan|florida|carolina|virginia|washington|jersey|massachusetts|pennsylvania|ohio|minnesota|wisconsin|colorado|arizona|georgia|tennessee|kentucky|missouri|utah|oregon|alabama|maryland|connecticut|indiana|iowa|kansas|nebraska|nevada|mexico|brazil|china|india|japan|korea|israel|france|germany|italy|spain|canada|australia|zealand|ireland|scotland|wales|england|europe|european|asia|africa|america|fudan|peking|tsinghua|sorbonne|karolinska|mayo|hopkins|sloan|kettering|dana|farber)$/;

/** Distinctive words of an institution name, for matching against Wikidata employer labels. */
const INST_STOP = new Set(["university", "hospital", "hospitals", "institute", "centre", "center", "cancer", "medical", "college", "school", "national", "foundation", "health", "research", "clinic", "general", "royal", "trust", "sciences", "science", "medicine", "memorial", "comprehensive", "system", "group", "service", "services"]);
const instWords = (n: string) => n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/[^a-z]+/).filter((w) => w.length > 3 && !INST_STOP.has(w));
function employerMatches(p: PersonRec, emp: string[]): boolean {
  const empText = emp.join(" | ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (p.institutionNames.some((n) => { const ws = instWords(n); return ws.length > 0 && ws.every((w) => empText.includes(w)); })) return true;
  // The other way round: an employer whose distinctive words all sit in the record's institution ("Broad Institute"
  // within "Broad Institute of MIT and Harvard"). Place words do not count, so "Harvard University" does not.
  const recText = p.institutionNames.join(" | ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return emp.some((e) => { const ws = instWords(e).filter((w) => !PLACE_WORDS.test(w)); return ws.length > 0 && ws.every((w) => new RegExp(`\\b${w}\\b`).test(recText)); });
}

/**
 * Does a human Wikidata item found by name search correspond to our record? Returns a reason when it does not.
 * Needs a matching field (an oncology signal), employer or role word; a generic medical or academic description
 * is not enough, because that is exactly what a namesake also has.
 */
function plausibility(p: PersonRec, item: Item, occ: string[], emp: string[]): string | null {
  const hay = [item.description, ...occ, ...emp].join(" | ");
  const isPublicFigure = p.tags.includes("hero") || PUBLIC_FIGURE.test(p.role);
  const domain = DOMAIN.test(hay);
  const onco = ONCO.test(hay); // includes employers: a cancer centre or cancer institute as employer is a matching field
  const mismatch = MISMATCH.test(hay);
  // Role words shared between the record and the item (e.g. "cyclist", "senator", "surgeon").
  // Only what the person does counts here: a place or institution word in the role line ("University of British
  // Columbia", "Fudan") matched an art historian at Columbia and a geneticist at Fudan. Employers are instMatch's job.
  const instWordSet = new Set(p.institutionNames.flatMap((n) => n.toLowerCase().split(/[^a-z]+/)));
  const roleWords = new Set(words(`${p.role} ${p.specialisms.join(" ")}`).filter((w) => !instWordSet.has(w) && !PLACE_WORDS.test(w)));
  const shared = [...new Set(words([item.description, ...occ].join(" | ")))].filter((w) => roleWords.has(w) || [...roleWords].some((r) => sameStem(r, w)));
  const instMatch = employerMatches(p, emp);
  if (mismatch && !domain && !isPublicFigure) return `occupation mismatch (${hay.slice(0, 90)})`;
  if (mismatch && isPublicFigure && !shared.length && !/cancer|tumou?r|leuk|lymphom|patient|advoca|surviv/i.test(hay)) return `public figure but no shared role words (${hay.slice(0, 90)})`;
  // One shared occupation word is not enough on its own: two immunologists called John Bell, both Canadian-born, exist.
  if (!onco && !instMatch && shared.length < 2) return hay.trim() ? `no oncology, employer or role match (${hay.slice(0, 90)})` : "human item without description or occupation";
  return null;
}

/** An item with a date of death is only ours if the record's own text gives that year or a life span. */
function deathConsistent(p: PersonRec, item: Item): string | null {
  const y = deathYear(item.claims);
  if (!y) return null;
  if (p.text.includes(String(y)) || /\b(died|dies|death of)\b/i.test(p.text)) return null;
  return `item records a death in ${y}; the record does not`;
}

type Resolved = { item: Item; matchedBy: string };
type Candidate = Resolved & { trusted: boolean };

/** Find a plausible Wikidata human for the record; records rejections along the way. */
async function resolve(p: PersonRec): Promise<Resolved | { reason: string; qid?: string }> {
  const ov = OVERRIDE[p.id];
  if (ov === null) return { reason: "skipped by override" };
  const accepted: Candidate[] = [];
  const tried = new Set<string>();
  const reject = (item: { qid: string; label: string; description: string }, reason: string) => (index.rejected[p.id] ??= []).push({ qid: item.qid, label: item.label, description: item.description, reason });
  /**
   * `trusted`: the item came from the record's own Wikipedia link, its ORCID iD or a manual QID, so identity is
   * asserted by the corpus and only the human and surname checks apply (plus the death check, for ORCID).
   */
  const consider = async (item: Item | null, matchedBy: string, trusted: boolean): Promise<void> => {
    if (!item || tried.has(item.qid)) return;
    tried.add(item.qid);
    if (!claimQids(item.claims, "P31").includes("Q5")) return; // not a human
    const names = [p.name, ...p.aka];
    if (!names.some((n) => labelMatches(n, item.label))) { reject(item, "label does not share the surname"); return; }
    if (!trusted && !names.some((n) => labelMatchesStrict(n, item.label))) { reject(item, "label does not share the first name"); return; }
    if (matchedBy !== "override" && matchedBy !== "wikipedia") {
      const dead = deathConsistent(p, item);
      if (dead) { reject(item, dead); return; }
    }
    if (!trusted) {
      const occ = await labels(claimQids(item.claims, "P106"));
      const emp = await labels(claimQids(item.claims, "P108"));
      const why = plausibility(p, item, occ, emp);
      if (why) { reject(item, why); return; }
    }
    accepted.push({ item, matchedBy, trusted });
  };
  const hasImage = (c: Candidate) => claimStrs(c.item.claims, "P18").length > 0;
  /** First trusted item with an image (or else the first trusted item, whose Wikipedia lead image may serve). */
  const pickTrusted = (): Resolved | null => {
    const t = accepted.filter((c) => c.trusted);
    return t.find(hasImage) ?? t[0] ?? null;
  };

  if (ov) await consider(await itemByQid(ov), "override", true);
  if (p.wikipedia) await consider(await itemByWikipedia(p.wikipedia), "wikipedia", true);
  if (p.orcid) for (const it of await itemsByQid(await byOrcid(p.orcid))) await consider(it, "orcid", true);
  // The corpus's own link or ORCID names the person; a name search could only add a namesake.
  const t = pickTrusted();
  if (t) return t;

  for (const q of nameVariants(p.name, p.aka)) {
    const ids: string[] = [];
    for (const h of await search(q)) {
      if (tried.has(h.id)) continue;
      // Cheap pre-filter on the search description before fetching the whole item.
      if (h.description && MISMATCH.test(h.description) && !DOMAIN.test(h.description) && !p.tags.includes("hero") && !PUBLIC_FIGURE.test(p.role)) {
        tried.add(h.id); reject({ qid: h.id, label: h.label, description: h.description }, "search description mismatch"); continue;
      }
      ids.push(h.id);
    }
    // Humans with an image under this name, which a common name's first seven hits may not reach.
    if (q.split(" ").length >= 2) for (const id of await imagedHumans(q)) if (!tried.has(id) && !ids.includes(id)) ids.push(id);
    for (const it of await itemsByQid(ids)) await consider(it, "name search", false);
  }
  const imaged = accepted.filter((c) => hasImage(c) || c.item.sitelinks.enwiki);
  if (!accepted.length) return { reason: index.rejected[p.id]?.length ? "no plausible human item (candidates rejected)" : "no Wikidata item found" };
  if (imaged.length > 1) {
    return { reason: `ambiguous: ${imaged.length} different name-search items pass with an image or article (${imaged.map((c) => c.item.qid).join(", ")})`, qid: imaged[0].item.qid };
  }
  if (imaged.length === 1) return imaged[0];
  return { reason: `matched ${accepted[0].item.qid} (${accepted[0].item.label}) but it has no image (P18)`, qid: accepted[0].item.qid };
}

// ------------------------------------------------------------------ Commons
type ExtMeta = Record<string, { value: string }>;
async function commonsMeta(file: string): Promise<ExtMeta | null> {
  const j = (await getJson(`https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(file)}&prop=imageinfo&iiprop=extmetadata|mime&iiextmetadatafilter=LicenseShortName|Artist|Credit|AttributionRequired|LicenseUrl|Attribution&format=json`)) as { query?: { pages?: Record<string, { missing?: string; imageinfo?: Array<{ extmetadata?: ExtMeta }> }> } };
  // A file that exists only on a local Wikipedia comes back "missing" here: Commons only.
  const page = Object.values(j.query?.pages ?? {})[0];
  if (!page || "missing" in page) return null;
  return page.imageinfo?.[0]?.extmetadata ?? null;
}
/** Lead image of the person's Wikipedia article, restricted by the API to freely licensed files. */
async function leadImage(item: Item, recordWikipedia?: string): Promise<string | null> {
  let site = "en", title = item.sitelinks.enwiki;
  const m = recordWikipedia?.match(/^https?:\/\/([a-z-]+)\.wikipedia\.org\/wiki\/(.+)$/i);
  const key = m ? `${m[1].toLowerCase().replace(/-/g, "_")}wiki` : "";
  if (m && item.sitelinks[key]) { site = m[1].toLowerCase(); title = item.sitelinks[key]; }
  if (!title) return null;
  const j = (await getJson(`https://${site}.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=name&pilicense=free&titles=${encodeURIComponent(title)}&format=json`)) as { query?: { pages?: Record<string, { pageimage?: string }> } };
  const f = Object.values(j.query?.pages ?? {})[0]?.pageimage;
  return f ? f.replace(/_/g, " ") : null;
}
const strip = (s?: string) => (s ?? "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#39;|&apos;/g, "'").replace(/\s+/g, " ").trim();

async function fetchPortrait(p: PersonRec, { item, matchedBy }: Resolved): Promise<PortraitEntry | { reason: string; qid: string }> {
  const files: Array<{ file: string; via: "P18" | "wikipedia lead image" }> = claimStrs(item.claims, "P18").map((file) => ({ file, via: "P18" as const }));
  if (!files.length) { const lead = await leadImage(item, p.wikipedia); if (lead) files.push({ file: lead, via: "wikipedia lead image" }); }
  const reasons: string[] = [];
  for (const { file, via } of files) {
    if (via !== "P18" && !/\.(jpe?g|png|tiff?|webp)$/i.test(file)) { reasons.push(`${file}: lead image is not a photograph file type`); continue; }
    // A file named for two or more people ("John and Linda Burn") shows more than one face unless it was cropped.
    if (/\band\b|&/i.test(file) && !/cropped/i.test(file)) { reasons.push(`${file}: names more than one person and is not cropped`); continue; }
    if (via !== "P18") {
      // A Wikipedia lead image is not always a portrait: one person's article led with a banner thanking him.
      if (!nameWords(file).includes(nameWords(cleanName(p.name)).pop() ?? "")) { reasons.push(`${file}: lead image does not carry the surname`); continue; }
      if (/announcement|banner|plaque|grave|tomb|signature|logo|building|skybridge|campus|sign\b|poster|book cover|cover/i.test(file)) { reasons.push(`${file}: lead image looks like an object, not a portrait`); continue; }
    }
    const meta = await commonsMeta(file);
    if (!meta) { reasons.push(`${file}: not on Commons or no metadata`); continue; }
    const license = strip(meta.LicenseShortName?.value);
    if (!LICENSE_OK.test(license)) { reasons.push(`${file}: licence "${license || "unknown"}" not in allow-list`); continue; }
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=320`;
    const got = await getBytes(url);
    if (!got || !got.buf.length || got.type.includes("text/html")) { reasons.push(`${file}: download failed`); continue; }
    const ext = got.type.includes("png") ? "png" : got.type.includes("jpeg") || got.type.includes("jpg") ? "jpg" : null;
    if (!ext) { reasons.push(`${file}: unsupported thumbnail type ${got.type}`); continue; }
    if (got.buf.length > MAX_BYTES) { reasons.push(`${file}: ${Math.round(got.buf.length / 1024)} KB exceeds ${MAX_BYTES / 1024} KB`); continue; }
    const out = `${p.id}.${ext}`;
    for (const e of ["jpg", "png"]) { const f = join(OUT, `${p.id}.${e}`); if (e !== ext && existsSync(f)) unlinkSync(f); }
    writeFileSync(join(OUT, out), got.buf);
    const author = strip(meta.Artist?.value) || strip(meta.Credit?.value) || strip(meta.Attribution?.value) || "unknown author";

    const attribution = `Photo: ${author}, ${license}, via Wikimedia Commons`;
    return {
      id: p.id, qid: item.qid, file: out, commonsFile: file, license,
      licenseUrl: meta.LicenseUrl?.value || undefined,
      author: author.slice(0, 160), attribution: attribution.slice(0, 240),
      source: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`,
      fetched: new Date().toISOString().slice(0, 10),
      matchedBy, via,
    };
  }
  return { reason: reasons.join("; ") || "no image files on item", qid: item.qid };
}

// ------------------------------------------------------------------ Main
const daysSince = (iso?: string) => iso ? (Date.now() - new Date(iso).getTime()) / 86_400_000 : Infinity;
const save = () => { index.generated = new Date().toISOString().slice(0, 10); writeFileSync(INDEX, JSON.stringify(index, null, 1)); };

async function main() {
  const g = graph();
  const people: PersonRec[] = g.kind("person").map((p) => {
    const instNames = [...new Set([p.institutionId, ...p.institutions])].flatMap((i) => { const e = i ? g.get(i) : undefined; return e ? [e.name, ...e.aka] : []; });
    return { id: p.id, name: p.name, aka: p.aka, role: p.role, tags: p.tags, wikipedia: p.wikipedia, orcid: p.orcid?.replace(/^https?:\/\/orcid\.org\//, ""), institutionNames: instNames, specialisms: p.specialisms, text: `${p.role} ${p.tldr} ${p.summary}` };
  });
  // Drop index entries for people no longer in the corpus.
  const ids = new Set(people.map((p) => p.id));
  for (const k of Object.keys(index.portraits)) if (!ids.has(k)) delete index.portraits[k];
  for (const k of Object.keys(index.unresolved)) if (!ids.has(k)) delete index.unresolved[k];

  const counts = { resolved: 0, unresolved: 0, kept: 0, looked: 0 };
  for (const p of people) {
    if (only.size && !only.has(p.id)) continue;
    const have = index.portraits[p.id];
    if (!force && have && existsSync(join(OUT, have.file)) && daysSince(have.fetched) < FRESH_DAYS) { counts.kept++; continue; }
    if (!force && !have && daysSince(index.unresolved[p.id]?.checked) < FRESH_DAYS) { counts.kept++; continue; }
    if (counts.looked >= limit) break;
    counts.looked++;
    delete index.rejected[p.id];
    try {
      const r = await resolve(p);
      const got = "item" in r ? await fetchPortrait(p, r) : r;
      if ("file" in got) {
        index.portraits[p.id] = got; delete index.unresolved[p.id]; counts.resolved++;
        console.log(`${p.id}: ${got.qid} ${got.license} (${got.author.slice(0, 40)})`);
      } else {
        delete index.portraits[p.id];
        index.unresolved[p.id] = { reason: got.reason, qid: got.qid, checked: new Date().toISOString().slice(0, 10) };
        counts.unresolved++;
        console.log(`${p.id}: - ${got.reason}`);
      }
    } catch (e) {
      index.unresolved[p.id] = { reason: `error: ${String(e).slice(0, 100)}`, checked: new Date().toISOString().slice(0, 10) };
      counts.unresolved++;
      console.warn(`${p.id}: error ${String(e).slice(0, 100)}`);
    }
    if (!index.rejected[p.id]?.length) delete index.rejected[p.id];
    save();
  }
  save();
  // Remove files no longer referenced by the index (rejected on re-check, renamed, or removed people).
  const referenced = new Set(Object.values(index.portraits).map((e) => e.file));
  for (const f of readdirSync(OUT)) if (f !== "index.json" && !referenced.has(f)) { unlinkSync(join(OUT, f)); console.log(`removed orphan ${f}`); }
  const byLicense: Record<string, number> = {};
  for (const e of Object.values(index.portraits)) byLicense[e.license] = (byLicense[e.license] ?? 0) + 1;
  console.log(`portraits: ${Object.keys(index.portraits).length} of ${people.length} people; ${Object.keys(index.unresolved).length} unresolved; ${requests} requests;`, counts);
  console.log("licences:", byLicense);
}

main().catch((e) => { console.error(e); process.exit(1); });
