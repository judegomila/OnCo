/**
 * Fetches portraits into public/portraits/ for every person record, from Wikimedia Commons only.
 *
 * Per person:
 *   1. Resolve a Wikidata item. When the record has a `wikipedia` URL the item is taken from that
 *      sitelink; otherwise wbsearchentities (en) over the name, then each `aka`.
 *   2. Accept only humans (P31 = Q5) whose description, occupations (P106) or employers (P108)
 *      plausibly match medicine, oncology, biology, science, advocacy or the record's own role text.
 *      Athletes, politicians, entertainers and the like are rejected unless the record is a hero /
 *      public figure whose role says so.
 *   3. Take P18 (image), read the Commons file's extmetadata (LicenseShortName, Artist, Credit,
 *      AttributionRequired, LicenseUrl) and keep only CC0, CC BY 1.0 to 4.0, CC BY-SA 1.0 to 4.0 and
 *      public-domain files.
 *   4. Download a 320px-wide thumbnail via Special:FilePath and record licence, author and
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
  "robert-stone": null, // name search lands on unrelated Robert Stones (a WWII photograph item); no Wikidata item for the City of Hope CEO
  "solomon-benjamin": null, // "Benjamin Solomon" matches Ben(jamin Solomon) Carson
  "daniel-haber": null, // matches Daniel Häberle
  "fabrice-andre": null, // matches a Gustave Van de Woestijne portrait item
  "per-hall": null, // matches Per Hallström (author)
};

/** Lower-case ASCII words of a name (diacritics stripped, hyphens split). */
const nameWords = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 1);
/** The item's English label must share the record's surname (or two name words, for reordered names). */
function labelMatches(recordName: string, label: string): boolean {
  const rec = nameWords(recordName.replace(/^(Dame|Sir|Dr\.?|Prof\.?|Professor|Lord|Baroness|Baron)\s+/i, "").replace(/"[^"]*"\s*/g, "").replace(/\s*\(.*?\)\s*/g, " ").replace(/,.*$/, ""));
  const lab = new Set(nameWords(label));
  if (!rec.length || !lab.size) return false;
  const surname = rec[rec.length - 1];
  const shared = rec.filter((w) => lab.has(w)).length;
  return lab.has(surname) || shared >= 2;
}

/** Licences we self-host. Commons LicenseShortName values (ported variants like "CC BY-SA 3.0 de" and "CC BY 3.0 igo" included). */
const LICENSE_OK = /^(CC0(?: 1\.0)?|CC BY(?:-SA)? [1-4](?:\.[05])?(?: [a-z]{2,3}(?:-[a-z]+)?)?|Public domain|PD(?:[- ].*)?|No restrictions)$/i;

/** Words on the Wikidata side that make a human item plausibly ours. */
const DOMAIN = /oncolog|cancer|tumou?r|leuk|lymphom|medic|physician|doctor|surgeon|clinic|scientist|research|professor|academic|biolog|biochem|chemist|genetic|genomic|immunolog|h(?:a)?ematolog|patholog|pharmac|radiolog|radiation|epidemiolog|nurs|health|hospital|universit|institut|laborator|virolog|microbiolog|physiolog|neurolog|paediatric|pediatric|urolog|gyn|dermatolog|gastro|pulmonolog|psycholog|bioinformatic|statistic|engineer|inventor|nobel|biotech|pharma|entrepreneur|executive|businessperson|chief executive|philanthrop|activist|advocate|patient|founder/i;

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
type Item = { qid: string; label: string; description: string; claims: Claims };
type RawEntity = { id?: string; missing?: string; claims?: Claims; labels?: Record<string, { value: string }>; descriptions?: Record<string, { value: string }> };
const WD = "https://www.wikidata.org/w/api.php";

const toItem = (e: RawEntity | undefined): Item | null => e && e.id && !("missing" in e)
  ? { qid: e.id, label: e.labels?.en?.value ?? e.labels?.mul?.value ?? e.id, description: e.descriptions?.en?.value ?? "", claims: e.claims ?? {} }
  : null;

async function itemByQid(qid: string): Promise<Item | null> {
  const j = (await getJson(`${WD}?action=wbgetentities&ids=${qid}&props=claims|labels|descriptions&languages=en|mul&format=json`)) as { entities?: Record<string, RawEntity> };
  return toItem(j.entities?.[qid]);
}
async function itemByWikipedia(url: string): Promise<Item | null> {
  const m = url.match(/^https?:\/\/([a-z-]+)\.wikipedia\.org\/wiki\/(.+)$/i);
  if (!m) return null;
  const site = `${m[1].toLowerCase().replace(/-/g, "_")}wiki`;
  const title = decodeURIComponent(m[2]).replace(/_/g, " ").split("#")[0];
  const j = (await getJson(`${WD}?action=wbgetentities&sites=${site}&titles=${encodeURIComponent(title)}&props=claims|labels|descriptions&languages=en|mul&normalize=1&format=json`)) as { entities?: Record<string, RawEntity> };
  return toItem(Object.values(j.entities ?? {})[0]);
}
type Hit = { id: string; label: string; description: string };
async function search(q: string): Promise<Hit[]> {
  const j = (await getJson(`${WD}?action=wbsearchentities&search=${encodeURIComponent(q)}&language=en&uselang=en&type=item&limit=7&format=json`)) as { search?: Array<{ id: string; label?: string; description?: string }> };
  return (j.search ?? []).map((s) => ({ id: s.id, label: s.label ?? "", description: s.description ?? "" }));
}

const claimQids = (c: Claims, p: string): string[] => (c[p] ?? []).filter((x) => x.rank !== "deprecated").map((x) => (x.mainsnak.datavalue?.value as { id?: string } | undefined)?.id).filter((v): v is string => !!v);
const claimStrs = (c: Claims, p: string): string[] => {
  const all = (c[p] ?? []).filter((x) => x.rank !== "deprecated");
  const preferred = all.filter((x) => x.rank === "preferred");
  return (preferred.length ? preferred : all).map((x) => x.mainsnak.datavalue?.value).filter((v): v is string => typeof v === "string");
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
  const clean = (s: string) => s.replace(/^(Dame|Sir|Dr\.?|Prof\.?|Professor|Lord|Baroness|Baron)\s+/i, "").replace(/"[^"]*"\s*/g, "").replace(/\s*\(.*?\)\s*/g, " ").replace(/,.*$/, "").replace(/\s+/g, " ").trim();
  const base = clean(name);
  out.add(base);
  // Drop middle initials: "Peter W. T. Pisters" -> "Peter Pisters".
  const noInitials = base.replace(/\s(?:[A-Z]\.?\s)+/g, " ").replace(/\s+/g, " ").trim();
  if (noInitials.split(" ").length >= 2) out.add(noInitials);
  for (const a of aka) { const c = clean(a); if (c.length > 3) out.add(c); }
  return [...out].filter((v) => v.length > 3);
}

const words = (s: string) => s.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3 && !STOP.has(w));
const STOP = new Set(["with", "whose", "that", "this", "from", "into", "their", "were", "have", "been", "which", "about", "after", "over", "into", "chief", "head", "director", "professor", "president", "former", "senior", "lead", "leader", "programme", "program", "division", "department", "service", "center", "centre", "cancer", "medical", "oncology", "medicine"]);

type PersonRec = { id: string; name: string; aka: string[]; role: string; tags: string[]; wikipedia?: string; institutionName?: string; specialisms: string[] };

/** Does a human Wikidata item plausibly correspond to our record? Returns a reason when it does not. */
function plausibility(p: PersonRec, item: Item, occ: string[], emp: string[]): string | null {
  const hay = [item.description, ...occ, ...emp].join(" | ");
  const isPublicFigure = p.tags.includes("hero") || PUBLIC_FIGURE.test(p.role);
  const domain = DOMAIN.test(hay);
  const mismatch = MISMATCH.test(hay);
  // Role words shared between the record and the item (e.g. "cyclist", "senator", "surgeon").
  const roleWords = new Set(words(`${p.role} ${p.specialisms.join(" ")}`));
  const shared = words(hay).filter((w) => roleWords.has(w) || [...roleWords].some((r) => r.length > 5 && (w.startsWith(r.slice(0, -1)) || r.startsWith(w.slice(0, -1)))));
  const instMatch = !!p.institutionName && emp.some((e) => e.toLowerCase().includes(p.institutionName!.toLowerCase().split(/[\s,(]+/).filter((w) => w.length > 4)[0] ?? " "));
  if (mismatch && !domain && !isPublicFigure) return `occupation mismatch (${hay.slice(0, 90)})`;
  if (mismatch && isPublicFigure && !shared.length && !/cancer|tumou?r|leuk|lymphom|patient|advoca|surviv/i.test(hay)) return `public figure but no shared role words (${hay.slice(0, 90)})`;
  if (!domain && !instMatch && !shared.length) return hay.trim() ? `no medical/scientific signal (${hay.slice(0, 90)})` : "human item without description or occupation";
  return null;
}

/** Find a plausible Wikidata human for the record; records rejections along the way. */
async function resolve(p: PersonRec): Promise<{ item: Item } | { reason: string; qid?: string }> {
  const ov = OVERRIDE[p.id];
  if (ov === null) return { reason: "skipped by override" };
  const candidates: Item[] = [];
  const tried = new Set<string>();
  /** `trusted`: the item came from the record's own Wikipedia link or a manual QID, so identity is asserted by the corpus and only the human check applies. */
  const consider = async (item: Item | null, trusted = false): Promise<{ item: Item } | null> => {
    if (!item || tried.has(item.qid)) return null;
    tried.add(item.qid);
    const p31 = claimQids(item.claims, "P31");
    if (!p31.includes("Q5")) return null; // not a human
    if (!trusted && !labelMatches(p.name, item.label) && !p.aka.some((a) => labelMatches(a, item.label))) {
      (index.rejected[p.id] ??= []).push({ qid: item.qid, label: item.label, description: item.description, reason: "label does not share the surname" });
      return null;
    }
    const occ = trusted ? [] : await labels(claimQids(item.claims, "P106"));
    const emp = trusted ? [] : await labels(claimQids(item.claims, "P108"));
    const why = trusted ? null : plausibility(p, item, occ, emp);
    if (why) { (index.rejected[p.id] ??= []).push({ qid: item.qid, label: item.label, description: item.description, reason: why }); return null; }
    candidates.push(item);
    return claimStrs(item.claims, "P18").length ? { item } : null;
  };
  if (ov) { const r = await consider(await itemByQid(ov), true); if (r) return r; }
  if (p.wikipedia) { const r = await consider(await itemByWikipedia(p.wikipedia), true); if (r) return r; }
  for (const q of nameVariants(p.name, p.aka)) {
    for (const h of await search(q)) {
      if (tried.has(h.id)) continue;
      // Cheap pre-filter on the search description before fetching the whole item.
      if (h.description && MISMATCH.test(h.description) && !DOMAIN.test(h.description) && !p.tags.includes("hero") && !PUBLIC_FIGURE.test(p.role)) {
        tried.add(h.id); (index.rejected[p.id] ??= []).push({ qid: h.id, label: h.label, description: h.description, reason: "search description mismatch" }); continue;
      }
      const r = await consider(await itemByQid(h.id));
      if (r) return r;
    }
    if (candidates.length) break; // a plausible item exists but has no image; stop searching wider
  }
  if (candidates.length) return { reason: `matched ${candidates[0].qid} (${candidates[0].label}) but it has no image (P18)`, qid: candidates[0].qid };
  return { reason: index.rejected[p.id]?.length ? "no plausible human item (candidates rejected)" : "no Wikidata item found" };
}

// ------------------------------------------------------------------ Commons
type ExtMeta = Record<string, { value: string }>;
async function commonsMeta(file: string): Promise<ExtMeta | null> {
  const j = (await getJson(`https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(file)}&prop=imageinfo&iiprop=extmetadata|mime&iiextmetadatafilter=LicenseShortName|Artist|Credit|AttributionRequired|LicenseUrl|Attribution&format=json`)) as { query?: { pages?: Record<string, { imageinfo?: Array<{ extmetadata?: ExtMeta }> }> } };
  return Object.values(j.query?.pages ?? {})[0]?.imageinfo?.[0]?.extmetadata ?? null;
}
const strip = (s?: string) => (s ?? "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#39;|&apos;/g, "'").replace(/\s+/g, " ").trim();

async function fetchPortrait(p: PersonRec, item: Item): Promise<PortraitEntry | { reason: string; qid: string }> {
  const files = claimStrs(item.claims, "P18");
  const reasons: string[] = [];
  for (const file of files) {
    const meta = await commonsMeta(file);
    if (!meta) { reasons.push(`${file}: no metadata`); continue; }
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
    const inst = p.institutionId ? g.get(p.institutionId) : undefined;
    return { id: p.id, name: p.name, aka: p.aka, role: p.role, tags: p.tags, wikipedia: p.wikipedia, institutionName: inst?.name, specialisms: p.specialisms };
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
      const got = "item" in r ? await fetchPortrait(p, r.item) : r;
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
