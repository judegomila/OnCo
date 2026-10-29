/**
 * Fetches organisation logos into public/logos/ for every company, institution, and collection.
 *
 * Resolution order per entity:
 *   1. Wikidata: search by name (or manual override QID), verify P31 is an organisation-like class and,
 *      when the item has P856 (official website), that its domain matches ours; take P154 (logo image)
 *      from Wikimedia Commons (SVG as-is, raster via Special:FilePath?width=512).
 *   2. Clearbit logo API by domain (PNG, 256px). Dead since the API was retired: logo.clearbit.com no longer resolves,
 *      the 2026-09-25 run returned 0 from it out of 1,692 entries, and every call is a wasted timeout. Kept only so
 *      the resolution order still reads as it was; the favicon step below carries the fallback on its own now.
 *   3. Google favicon service at 256px (quality "favicon").
 *
 * Output: public/logos/<id>.<ext> and public/logos/index.json
 *   { id: { file, source: "wikidata"|"clearbit"|"favicon", license?, attribution?, qid? } }
 *
 * Upgrade (--upgrade): a favicon of 64 pixels or less renders as a smudge. For each such entry, try in order:
 *   a. Wikidata P154 from an item whose official website (P856) is the record's own domain, found by searching
 *      P856 directly and by name; an item without a matching P856 is never used here, and when the record's
 *      website is a sub-path of a larger site (a centre on its university's domain) the item's P856 must carry
 *      the same path, so the parent's logo is not taken for the centre;
 *   b. the organisation's own home page head: an apple-touch-icon of 120 px or more, an icon link or web
 *      manifest icon of 180 px or more, or an SVG icon. The page is fetched from the record's own domain, a
 *      redirect to a different domain is refused, and nothing is ever read from web.archive.org (on 13 September
 *      2026 an archived page drove a wrong domain match and the wrong logo shipped).
 * A replacement is kept only when it is larger than the file it replaces. Every entry records the URL the file
 * came from (`url`) and how it was found (`via`).
 *
 * Audit (--audit): dimensions of every file by source, the count at 32 px or less, and any byte-identical file
 * shared by two different organisations.
 *
 * Run: npm run fetch:logos            (idempotent: existing entries in index.json are kept unless --force)
 *      npm run fetch:logos -- --only=<id>
 *      npm run fetch:logos -- --upgrade [--only=<id>]
 *      npm run fetch:logos -- --audit
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { graph } from "../src/lib/graph";
import { imageSize } from "./image-size";

const OUT = join(process.cwd(), "public", "logos");
mkdirSync(OUT, { recursive: true });
const INDEX = join(OUT, "index.json");
const UA = "OnCo logo fetcher/1.0 (https://github.com/judegomila/OnCo; contact via GitHub issues)";
const MAX_BYTES = 400 * 1024;
const force = process.argv.includes("--force");
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7)?.split(",");
const upgrade = process.argv.includes("--upgrade");
const audit = process.argv.includes("--audit");
/** Favicons at or below this many pixels (shorter side) are replaced when something better exists. */
const UPGRADE_MAX = 64;
/** Home pages whose head names a product's logo, not the organisation's (checked 29 October 2026). */
const UPGRADE_SKIP = new Set(["profound-medical"]);

type Entry = {
  file: string; source: "wikidata" | "clearbit" | "favicon"; license?: string; attribution?: string; qid?: string; name?: string;
  /** The URL the file was downloaded from. */
  url?: string;
  /** How a site-side file was found: "google-favicon", "apple-touch-icon", "icon-link", "manifest" or "svg-icon". */
  via?: string;
};
const index: Record<string, Entry> = existsSync(INDEX) ? JSON.parse(readFileSync(INDEX, "utf8")) : {};

/**
 * Manual help for ambiguous names: a better search string, or null to skip Wikidata entirely
 * (databases and services that have no logo item, or where the item's logo is not the org's).
 */
const OVERRIDE: Record<string, string | null> = {
  merck: "Merck & Co.",
  aveo: null, // name search returns "Aveos Fleet Performance"; no Wikidata logo for AVEO Oncology
  "roche-genentech": "Hoffmann-La Roche",
  gilead: "Gilead Sciences",
  bms: "Bristol Myers Squibb",
  "johnson-johnson": "Johnson & Johnson",
  "eli-lilly": "Eli Lilly and Company",
  gsk: "GSK plc",
  mskcc: "Memorial Sloan Kettering Cancer Center",
  "md-anderson": "University of Texas MD Anderson Cancer Center",
  "johns-hopkins": "Johns Hopkins Hospital",
  "dana-farber": "Dana–Farber Cancer Institute",
  mgh: "Massachusetts General Hospital",
  "heidelberg-nct": "Heidelberg University Hospital",
  stanford: "Stanford Health Care",
  ucsf: "UCSF Medical Center",
  "penn-abramson": "Abramson Cancer Center",
  "wustl-siteman": "Siteman Cancer Center",
  "michigan-rogel": "University of Michigan Rogel Cancer Center",
  "ucla-jonsson": "Jonsson Comprehensive Cancer Center",
  "icr-london": "Institute of Cancer Research",
  cruk: "Cancer Research UK",
  nki: "Netherlands Cancer Institute",
  nci: "National Cancer Institute",
  "curie-nki-eortc": "European Organisation for Research and Treatment of Cancer",
  "ge-healthcare": "GE HealthCare",
  varian: "Varian Medical Systems",
  tempus: "Tempus AI",
  "10x-genomics": "10x Genomics",
  "cancer-commons": null,
  oncokb: null, civic: null, cbioportal: null, depmap: null, "open-targets": null, cosmic: null, ttd: null, adcdb: null,
  "esmo-guidelines": "European Society for Medical Oncology",
  "fda-approvals": "Food and Drug Administration",
  seer: null, globocan: "International Agency for Research on Cancer", "cancer-gov-pdq": "National Cancer Institute",
  "awesome-cancer-variant-resources": null, genie: "American Association for Cancer Research", hpa: "Human Protein Atlas", cptac: "National Cancer Institute",
  "cellxgene-hca": "Chan Zuckerberg Initiative", "cancer-models": null, "pubmed-europepmc": "PubMed", "eudract-ctis": "European Medicines Agency",
  "newsweek-hospitals": "Newsweek", "nature-index": "Nature Portfolio", "scimago-oncology": "SCImago Journal Rank", "nci-cancer-centers": "National Cancer Institute",
  "tcga-gdc": "National Cancer Institute", clinvar: "National Center for Biotechnology Information", "drugbank-chembl": "ChEMBL", nccn: "National Comprehensive Cancer Network", "clinicaltrials-gov": "ClinicalTrials.gov",
};

const DESC_HINT = /compan|corporat|hospital|universit|institut|organi[sz]ation|agency|society|association|foundation|charity|centre|center|laborator|manufacturer|database|publisher|journal|conglomerate|enterprise|firm|clinic|school|registry|consortium|trust|group/i;

const ORG_CLASSES = new Set([
  "Q4830453", "Q783794", "Q6881511", "Q891723", "Q43229", "Q16917", "Q1774898", "Q3918", "Q875538", "Q31855", "Q1371037", "Q7075", "Q327333", "Q484652", "Q79913", "Q163740", "Q1785271", "Q2085381", "Q1048835", "Q2659904", "Q15911314", "Q5341295", "Q1194970", "Q4287745", "Q1497649", "Q33506", "Q7278", "Q19967801", "Q294163", "Q1391145", "Q12140", "Q2385804", "Q210272", "Q17127659", "Q1616075", "Q3055655", "Q3243212", "Q44652", "Q8148", "Q2485448", "Q157031", "Q31728", "Q2668072", "Q11229656", "Q159334", "Q902104", "Q28843648", "Q17232649",
]);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
let last = 0;
async function polite<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  const wait = 500 - (Date.now() - last);
  if (wait > 0) await sleep(wait);
  last = Date.now();
  for (let i = 0; ; i++) {
    try { return await fn(); } catch (e) { if (i >= retries) throw e; await sleep(1000 * (i + 1)); }
  }
}
async function getJson(url: string): Promise<unknown> {
  return polite(async () => { const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } }); if (!r.ok) throw new Error(`${r.status} ${url}`); return r.json(); });
}
async function getBytes(url: string): Promise<{ buf: Buffer; type: string } | null> {
  try {
    return await polite(async () => {
      const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
      if (!r.ok) throw new Error(`${r.status}`);
      const type = r.headers.get("content-type") ?? "";
      const buf = Buffer.from(await r.arrayBuffer());
      return { buf, type };
    }, 1);
  } catch { return null; }
}

// Acquired companies whose recorded website now redirects to the acquirer; a match there would show the acquirer's logo.
const NO_LOGO_IDS = new Set(["future-of-cancer-care-today", "sijbrandij-foundation", "invocata", "invoke-bio", "perita-bio", "protom",
  // A collection's `url` is the page its list was read from, not an organisation's home page, so a favicon there
  // belongs to whoever published the page. "UK specialist HPB cancer centres" is a list OnCo assembled from a page
  // on pancreaticcancer.org.uk; taking the favicon gave it Pancreatic Cancer UK's mark, byte for byte the charity's
  // own logo on a record that is not the charity. Check a collection's url before letting one through.
  "uk-hpb-specialist-centres",
  "sunesis",
  "infinity-pharmaceuticals",
  "threshold-pharmaceuticals",
  "capio-st-goran",
  "aidport",
  // Generic NHS, ICB, health-service or platform favicons, or 16 to 20 pixel icons (audited 15 Sept 2026)
  "cheshire-merseyside-cancer-alliance",
  "east-of-england-cancer-alliance",
  "peninsula-cancer-alliance",
  "swag-cancer-alliance",
  "south-east-london-cancer-alliance",
  "surrey-sussex-cancer-alliance",
  "west-yorkshire-harrogate-cancer-alliance",
  "greater-manchester-cancer-alliance",
  "gc-cell",
  "hacettepe-cancer-institute",
  "iasi-regional-oncology-institute",
  "mater-misericordiae",
  "mediterranean-institute-of-oncology",
  "partner-therapeutics",
  "bank-of-cyprus-oncology-centre",
  "lancashire-south-cumbria-cancer-alliance","emergence-therapeutics", "mablink-bioscience", "point-biopharma",
  // Audited 29 October 2026 by md5: byte-identical files on unrelated domains. A website builder's stock icon (the
  // Vercel triangle; the WordPress "W") is nobody's logo, and the upgrade pass found nothing of their own to use.
  "more-health", "mission-bio", "horg", "inc-chile", "ighg", "intensity-therapeutics", "imerman-angels",
  // A news article as the website: the favicon was the news site's (BioSpace) or another company's (Evergreen).
  "abdera-therapeutics", "ariceum-therapeutics", "precirix"]);
const NOT_OWN_HOST = /(^|\.)(archive\.org|sec\.gov|ycombinator\.com|biorxiv\.org|medrxiv\.org|linkedin\.com|crunchbase\.com|clinicaltrials\.gov|wikipedia\.org|github\.com|biospace\.com|fiercebiotech\.com|businesswire\.com|prnewswire\.com|globenewswire\.com|statnews\.com|endpts\.com)$/;
const domainOf = (u?: string) => { try { if (!u) return ""; const h = new URL(u).hostname.replace(/^www\./, "").toLowerCase(); return NOT_OWN_HOST.test(h) ? "" : h; } catch { return ""; } };
const sameDomain = (a: string, b: string) => !!a && !!b && (a === b || a.endsWith("." + b) || b.endsWith("." + a));

type Claims = Record<string, Array<{ mainsnak: { datavalue?: { value: unknown } } }>>;
async function wikidataEntity(qid: string): Promise<{ claims: Claims; label: string } | null> {
  const j = (await getJson(`https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`)) as { entities: Record<string, { claims: Claims; labels?: Record<string, { value: string }> }> };
  const ent = j.entities?.[qid];
  if (!ent) return null;
  return { claims: ent.claims ?? {}, label: ent.labels?.en?.value ?? qid };
}
const claimStr = (c: Claims, p: string): string[] => (c[p] ?? []).map((x) => x.mainsnak.datavalue?.value).filter((v): v is string => typeof v === "string");
const claimQids = (c: Claims, p: string): string[] => (c[p] ?? []).map((x) => (x.mainsnak.datavalue?.value as { id?: string } | undefined)?.id).filter((v): v is string => !!v);

type Hit = { id: string; description: string };
async function searchByName(name: string): Promise<Hit[]> {
  const j = (await getJson(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(name)}&language=en&type=item&limit=6&format=json`)) as { search?: Array<{ id: string; description?: string }> };
  return (j.search ?? []).map((s) => ({ id: s.id, description: s.description ?? "" }));
}
async function searchByWebsite(website: string): Promise<Hit[]> {
  const d = domainOf(website); if (!d) return [];
  const variants = new Set<string>();
  for (const scheme of ["https://", "http://"]) for (const w of ["www.", ""]) for (const slash of ["", "/"]) variants.add(`${scheme}${w}${d}${slash}`);
  variants.add(website.replace(/\/$/, "")); variants.add(website.endsWith("/") ? website : website + "/");
  // One query: CirrusSearch reads "P856=a|P856=b" as either.
  const q = "haswbstatement:" + [...variants].map((v) => `P856=${v}`).join("|");
  const j = (await getJson(`https://www.wikidata.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&srlimit=3`)) as { query?: { search?: Array<{ title: string; snippet: string }> } };
  return (j.query?.search ?? []).map((x) => ({ id: x.title, description: x.snippet.replace(/<[^>]+>/g, "") }));
}
function nameVariants(name: string): string[] {
  const out = new Set<string>();
  const noParen = name.replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+/g, " ").trim();
  out.add(noParen);
  for (const part of noParen.split(/\s*(?:\/|–|—|,)\s*/)) if (part.length > 2) out.add(part.trim());
  out.add(noParen.replace(/\b(Inc\.?|plc|AG|SA|Ltd\.?|Co\.?|Corporation|Pharmaceuticals?|Therapeutics|Biotherapeutics|Medicines|Oncology|Biosciences|Biotech(nology)?|Medical|Group|Holdings)\b\.?/gi, "").replace(/\s+/g, " ").trim());
  return [...out].filter((v) => v.length > 2);
}

/** Path of a website beyond the root, lower-cased without a trailing slash ("" for a home page). */
const pathOf = (u?: string) => { try { return u ? new URL(u).pathname.replace(/\/+$/, "").toLowerCase() : ""; } catch { return ""; } };

/**
 * `strict` (the upgrade pass): only an item whose own P856 matches the record's domain, and its path when the
 * record's website is a sub-path, may lend its logo.
 */
async function wikidataLogo(id: string, name: string, website: string, strict = false): Promise<Entry | null> {
  const override = OVERRIDE[id];
  if (override === null) return null;
  const myDomain = domainOf(website);
  const tried = new Set<string>();
  const candidates: Array<{ hit: Hit; viaSite: boolean }> = [];
  for (const h of await searchByWebsite(website)) candidates.push({ hit: h, viaSite: true });
  for (const q of override ? [override, ...nameVariants(name)] : nameVariants(name)) for (const h of await searchByName(q)) candidates.push({ hit: h, viaSite: false });
  for (const { hit, viaSite } of candidates) {
    if (tried.has(hit.id)) continue; tried.add(hit.id);
    const ent = await wikidataEntity(hit.id);
    if (!ent) continue;
    const p31 = claimQids(ent.claims, "P31");
    const siteUrls = claimStr(ent.claims, "P856");
    const sites = siteUrls.map(domainOf);
    const domainMatch = sites.some((d) => sameDomain(d, myDomain));
    if (strict) {
      const myPath = pathOf(website);
      const ok = siteUrls.some((u) => sameDomain(domainOf(u), myDomain) && (!myPath || pathOf(u) === myPath));
      if (!ok) continue;
    }
    const orgLike = p31.some((q) => ORG_CLASSES.has(q)) || DESC_HINT.test(hit.description);
    if (!viaSite && !domainMatch) { if (sites.length || !orgLike) continue; }
    if (!orgLike && !domainMatch && !viaSite) continue;
    const logos = claimStr(ent.claims, "P154");
    if (!logos.length) continue;
    const file = logos[0];
    const isSvg = /\.svg$/i.test(file);
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}${isSvg ? "" : "?width=512"}`;
    const got = await getBytes(url);
    if (!got || got.buf.length === 0 || got.buf.length > MAX_BYTES || got.type.includes("text/html")) continue;
    const ext = isSvg ? "svg" : got.type.includes("png") ? "png" : got.type.includes("jpeg") ? "jpg" : "png";
    const out = `${id}.${ext}`;
    writeFileSync(join(OUT, out), got.buf);
    let license: string | undefined, attribution: string | undefined;
    try {
      const info = (await getJson(`https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(file)}&prop=imageinfo&iiprop=extmetadata&format=json`)) as { query?: { pages?: Record<string, { imageinfo?: Array<{ extmetadata?: Record<string, { value: string }> }> }> } };
      const meta = Object.values(info.query?.pages ?? {})[0]?.imageinfo?.[0]?.extmetadata;
      license = meta?.LicenseShortName?.value; attribution = meta?.Artist?.value?.replace(/<[^>]+>/g, "").slice(0, 120);
    } catch { /* optional */ }
    return { file: out, source: "wikidata", license, attribution: attribution || `Wikimedia Commons: File:${file}`, qid: hit.id, name: ent.label, url: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}` };
  }
  return null;
}

async function clearbitLogo(id: string, website: string): Promise<Entry | null> {
  const d = domainOf(website); if (!d) return null;
  const got = await getBytes(`https://logo.clearbit.com/${d}?size=256`);
  if (!got || got.buf.length < 200 || got.buf.length > MAX_BYTES || !got.type.startsWith("image/")) return null;
  const ext = got.type.includes("svg") ? "svg" : got.type.includes("jpeg") ? "jpg" : "png";
  const out = `${id}.${ext}`; writeFileSync(join(OUT, out), got.buf);
  return { file: out, source: "clearbit" };
}

async function faviconLogo(id: string, website: string): Promise<Entry | null> {
  const d = domainOf(website); if (!d) return null;
  const src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=256`;
  const got = await getBytes(src);
  if (!got || got.buf.length < 200) return null;
  // Reject tiny icons: a PNG stores its width in bytes 16 to 19 of the IHDR chunk; anything under 24 px is a 16 px favicon upscaled by nothing.
  if (got.type.includes("png") && got.buf.length > 24 && got.buf.readUInt32BE(16) < 24) return null;
  const ext = got.type.includes("png") ? "png" : got.type.includes("svg") ? "svg" : got.type.includes("jpeg") ? "jpg" : "ico";
  const out = `${id}.${ext}`; writeFileSync(join(OUT, out), got.buf);
  return { file: out, source: "favicon", url: src, via: "google-favicon" };
}

// ------------------------------------------------------------------ Site icons (upgrade pass)
const ARCHIVE = /(^|\.)archive\.org$|(^|\.)archive\.(today|is|ph)$/i;
const hostOf = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, "").toLowerCase(); } catch { return ""; } };
/** Same organisation's host: equal, a subdomain either way, or the same name under another public suffix is NOT enough. */
const sameSite = (a: string, b: string) => sameDomain(a, b);

async function getPage(url: string): Promise<{ text: string; finalUrl: string } | null> {
  try {
    return await polite(async () => {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 15000);
      try {
        const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,application/json" }, redirect: "follow", signal: ctl.signal });
        if (!r.ok) throw new Error(`${r.status}`);
        const text = (await r.text()).slice(0, 400_000);
        return { text, finalUrl: r.url || url };
      } finally { clearTimeout(t); }
    }, 1);
  } catch { return null; }
}
async function getImage(url: string): Promise<{ buf: Buffer; type: string; finalUrl: string } | null> {
  try {
    return await polite(async () => {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 15000);
      try {
        const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow", signal: ctl.signal });
        if (!r.ok) throw new Error(`${r.status}`);
        return { buf: Buffer.from(await r.arrayBuffer()), type: r.headers.get("content-type") ?? "", finalUrl: r.url || url };
      } finally { clearTimeout(t); }
    }, 1);
  } catch { return null; }
}

type IconCandidate = { url: string; via: string; declared: number; minPx: number };
/** Website builders' stock icons: the same file on thousands of unrelated sites, never the organisation's mark. */
const PLATFORM_DEFAULT = /assets\.squarespace\.com\/universal\/default-favicon|static\.wixstatic\.com\/ficons\/|wix\.com\/favicon|website-files\.com\/img\/(favicon|webclip)|s\.w\.org\/|wp-includes\/images\/w-logo|cdn\.shopify\.com\/s\/files\/.*shopify-favicon|godaddy.*favicon/i;
const attrOf = (tag: string, name: string) => tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"))?.slice(1).find((v) => v !== undefined);
const decodeHtml = (s: string) => s.replace(/&amp;/g, "&").replace(/&#x2F;/gi, "/").replace(/&#47;/g, "/");
const largestSize = (sizes?: string) => Math.max(0, ...(sizes ?? "").split(/\s+/).map((s) => Number(s.toLowerCase().split("x")[0]) || 0));
/** An SVG we self-host must be a plain drawing: no script, event handler, foreign object or external reference. */
const safeSvg = (buf: Buffer) => { const t = buf.toString("utf8"); return buf.length <= 100 * 1024 && /\sviewBox\s*=/i.test(t.match(/<svg\b[^>]*>/i)?.[0] ?? "") && !/<script|\son\w+\s*=|<foreignObject|javascript:|xlink:href\s*=\s*["']\s*(?:https?:|\/\/)|href\s*=\s*["']\s*(?:https?:|\/\/)/i.test(t); };

/** The record's own home page head: apple-touch-icon, large icon links, manifest icons and SVG icons. */
async function siteIcon(id: string, website: string, beat: number): Promise<Entry | null> {
  const d = domainOf(website);
  if (!d) return null;
  const home = `https://${hostOf(website) === d ? new URL(website).host : d}/`;
  if (ARCHIVE.test(hostOf(home))) return null;
  const page = await getPage(home);
  const cands: IconCandidate[] = [];
  let base = home;
  if (page) {
    const finalHost = hostOf(page.finalUrl);
    if (ARCHIVE.test(finalHost) || !sameSite(finalHost, d)) {
      console.log(`  ${id}: home page redirects off the record's domain (${finalHost}); site icons skipped`);
      return null;
    }
    base = page.finalUrl;
    const head = page.text.split(/<\/head>/i)[0];
    const baseHref = head.match(/<base\b[^>]*>/i)?.[0];
    if (baseHref) { const h = attrOf(baseHref, "href"); if (h) { try { base = new URL(decodeHtml(h), base).href; } catch { /* keep */ } } }
    // A logo image the page names as its own (Squarespace and others put the site logo in image_src), taken only
    // when its file name says it is a logo; a social card or photograph is not.
    for (const tag of head.match(/<(?:link|meta)\b[^>]*>/gi) ?? []) {
      const isImageSrc = /^<link/i.test(tag) && (attrOf(tag, "rel") ?? "").toLowerCase() === "image_src";
      const isOg = /^<meta/i.test(tag) && /^og:image$/i.test(attrOf(tag, "property") ?? "");
      if (!isImageSrc && !isOg) continue;
      const href = attrOf(tag, isImageSrc ? "href" : "content");
      if (!href) continue;
      let url: string; try { url = new URL(decodeHtml(href), base).href; } catch { continue; }
      if (/logo/i.test(decodeURIComponent(new URL(url).pathname))) cands.push({ url, via: "page-logo", declared: 150, minPx: 120 });
    }
    for (const tag of head.match(/<link\b[^>]*>/gi) ?? []) {
      const rel = (attrOf(tag, "rel") ?? "").toLowerCase();
      const href = attrOf(tag, "href");
      if (!href || href.startsWith("data:")) continue;
      let url: string; try { url = new URL(decodeHtml(href), base).href; } catch { continue; }
      const type = (attrOf(tag, "type") ?? "").toLowerCase();
      const declared = largestSize(attrOf(tag, "sizes"));
      if (/apple-touch-icon/.test(rel)) cands.push({ url, via: "apple-touch-icon", declared: declared || 180, minPx: 120 });
      else if (/(^|\s)icon(\s|$)/.test(rel) && (type.includes("svg") || /\.svg(\?|$)/i.test(url))) cands.push({ url, via: "svg-icon", declared: 10_000, minPx: 0 });
      else if (/(^|\s)icon(\s|$)/.test(rel) && declared >= 180) cands.push({ url, via: "icon-link", declared, minPx: 180 });
      else if (rel === "manifest") {
        const man = await getPage(url);
        if (!man) continue;
        try {
          const icons = (JSON.parse(man.text).icons ?? []) as Array<{ src?: string; sizes?: string; type?: string; purpose?: string }>;
          for (const ic of icons) {
            if (!ic.src || (ic.purpose && !/\bany\b/.test(ic.purpose) && /maskable|monochrome/.test(ic.purpose))) continue;
            const sz = largestSize(ic.sizes);
            let u: string; try { u = new URL(ic.src, man.finalUrl).href; } catch { continue; }
            if ((ic.type ?? "").includes("svg") || /\.svg(\?|$)/i.test(u)) cands.push({ url: u, via: "manifest", declared: 10_000, minPx: 0 });
            else if (sz >= 180) cands.push({ url: u, via: "manifest", declared: sz, minPx: 180 });
          }
        } catch { /* not JSON */ }
      }
    }
  }
  // The conventional location, which many sites serve without declaring it.
  if (!cands.some((c) => c.via === "apple-touch-icon")) cands.push({ url: new URL("/apple-touch-icon.png", base).href, via: "apple-touch-icon", declared: 180, minPx: 120 });
  // Largest declared first; SVG (declared 10,000) leads.
  cands.sort((a, b) => b.declared - a.declared);
  const seen = new Set<string>();
  for (const c of cands.slice(0, 6)) {
    if (seen.has(c.url)) continue; seen.add(c.url);
    if (ARCHIVE.test(hostOf(c.url)) || !/^https?:/.test(c.url)) continue;
    const got = await getImage(c.url);
    if (!got || got.buf.length < 100 || got.buf.length > MAX_BYTES || ARCHIVE.test(hostOf(got.finalUrl))) continue;
    const size = imageSize(got.buf);
    if (!size) continue;
    if (PLATFORM_DEFAULT.test(c.url) || PLATFORM_DEFAULT.test(got.finalUrl)) continue;
    if (size.format === "svg") { if (!safeSvg(got.buf)) continue; }
    else if (Math.max(size.width, size.height) < Math.max(c.minPx, beat + 1)) continue;
    // Icons are square; only a file named as a logo may be a wide wordmark.
    else if (c.via !== "page-logo" && Math.min(size.width, size.height) < 0.5 * Math.max(size.width, size.height)) continue;
    if (size.format === "ico" || size.format === "gif") continue; // an ICO in a big slot is rarely big; skip rather than guess
    const norm = normalise(got.buf, size.format, Math.max(size.width, size.height));
    if (!norm) continue;
    const out = `${id}.${norm.ext}`;
    writeFileSync(join(OUT, out), norm.buf);
    return { file: out, source: "favicon", url: got.finalUrl, via: c.via };
  }
  return null;
}

/**
 * A site raster as a PNG no larger than 256 px on its longer side, via macOS `sips` (no npm dependency). A home
 * page's logo can be 1,500 px and arrive as WebP; a 56 px tile needs neither. Returns null when sips fails.
 */
const MAX_PX = 256;
function normalise(buf: Buffer, format: string, longer: number): { buf: Buffer; ext: string } | null {
  if (format === "svg") return { buf, ext: "svg" };
  if ((format === "png" || format === "jpg") && longer <= MAX_PX) return { buf, ext: format };
  const src = join(tmpdir(), `onco-logo-${process.pid}.${format}`), dst = join(tmpdir(), `onco-logo-${process.pid}.png`);
  try {
    writeFileSync(src, buf);
    execFileSync("sips", ["-s", "format", "png", ...(longer > MAX_PX ? ["-Z", String(MAX_PX)] : []), src, "--out", dst], { stdio: "ignore" });
    return { buf: readFileSync(dst), ext: "png" };
  } catch { return null; } finally { for (const f of [src, dst]) if (existsSync(f)) unlinkSync(f); }
}

/**
 * Longer side in pixels; Infinity for a scalable SVG, 0 when unreadable. The longer side, so a 512 x 60 wordmark
 * counts as the sharp logo it is; a favicon is square, so for one the two sides agree.
 */
function longSide(file: string): number {
  try {
    const s = imageSize(readFileSync(join(OUT, file)));
    if (!s) return 0;
    return s.format === "svg" ? Infinity : Math.max(s.width, s.height);
  } catch { return 0; }
}

function runAudit(names: Map<string, string>) {
  const buckets: Record<string, Record<string, number>> = {};
  const small: string[] = [];
  const byHash = new Map<string, string[]>();
  for (const [id, e] of Object.entries(index)) {
    const f = join(OUT, e.file);
    if (!existsSync(f)) continue;
    const m = longSide(e.file);
    const b = m === Infinity ? "svg" : m === 0 ? "unreadable" : m <= 32 ? "<=32" : m <= 64 ? "33-64" : m < 180 ? "65-179" : ">=180";
    const key = `${e.source}${e.via && e.via !== "google-favicon" ? ":" + e.via : ""}`;
    (buckets[key] ??= {})[b] = (buckets[key][b] ?? 0) + 1;
    if (m <= 32) small.push(id);
    const h = createHash("md5").update(readFileSync(f)).digest("hex");
    byHash.set(h, [...(byHash.get(h) ?? []), id]);
  }
  console.log("by source and shorter side:", buckets);
  console.log(`at 32 px or less: ${small.length}`);
  const dups = [...byHash.entries()].filter(([, ids]) => ids.length > 1);
  console.log(`byte-identical files shared by more than one record: ${dups.length} groups`);
  for (const [h, ids] of dups) console.log(`  ${h.slice(0, 10)} ${ids.map((i) => `${i} (${names.get(i) ?? "?"})`).join(" | ")}`);
}

async function main() {
  const g = graph();
  const targets = [...g.kind("company"), ...g.kind("institution"), ...g.kind("collection")].map((e) => ({ id: e.id, kind: e.kind, name: e.name, website: e.kind === "collection" ? e.url : e.website }));
  const names = new Map(targets.map((t) => [t.id, t.name]));
  const sites = new Map(targets.map((t) => [t.id, domainOf(t.website)]));
  if (audit) { runAudit(names); return; }
  if (upgrade) {
    const counts = { wikidata: 0, site: 0, kept: 0, skipped: 0 };
    const byHash = new Map<string, string[]>();
    for (const [id, e] of Object.entries(index)) { const f = join(OUT, e.file); if (existsSync(f)) { const h = createHash("md5").update(readFileSync(f)).digest("hex"); byHash.set(h, [...(byHash.get(h) ?? []), id]); } }
    const sharedBy = new Map<string, string[]>();
    for (const ids of byHash.values()) if (ids.length > 1) for (const id of ids) sharedBy.set(id, ids.filter((x) => x !== id));
    const via: Record<string, number> = {};
    for (const t of targets) {
      if (only && !only.includes(t.id)) continue;
      const e = index[t.id];
      if (!e || e.source !== "favicon" || NO_LOGO_IDS.has(t.id)) continue;
      // A collection's url is the page its list came from, not an organisation's home page.
      if (t.kind === "collection" || UPGRADE_SKIP.has(t.id)) { counts.skipped++; continue; }
      const now = longSide(e.file);
      // Also a favicon byte-identical to one on an unrelated domain: a website builder's stock icon.
      const stock = (sharedBy.get(t.id) ?? []).some((o) => { const a = sites.get(o) ?? "", b = sites.get(t.id) ?? ""; return !!a && !!b && !sameDomain(a, b); });
      if (now > UPGRADE_MAX && !stock) continue;
      const original = readFileSync(join(OUT, e.file));
      let entry: Entry | null = null;
      try { entry = await wikidataLogo(t.id, t.name, t.website ?? "", true); } catch (err) { console.warn(`wikidata failed for ${t.id}: ${String(err).slice(0, 80)}`); }
      if (!entry) entry = await siteIcon(t.id, t.website ?? "", now);
      if (!entry) {
        // Put the original back in case a candidate was written under the same name.
        writeFileSync(join(OUT, e.file), original);
        counts.kept++; console.log(`${t.id}: kept ${now}px favicon${stock ? " (shared with an unrelated domain)" : ""}`);
        continue;
      }
      for (const ext of ["svg", "png", "jpg", "ico", "webp"]) { const f = join(OUT, `${t.id}.${ext}`); if (f !== join(OUT, entry.file) && existsSync(f)) unlinkSync(f); }
      index[t.id] = entry;
      if (entry.source === "wikidata") counts.wikidata++; else { counts.site++; via[entry.via ?? "?"] = (via[entry.via ?? "?"] ?? 0) + 1; }
      console.log(`${t.id}: ${now}px -> ${entry.source === "wikidata" ? `wikidata ${entry.qid} (${entry.name})` : entry.via} ${longSide(entry.file) === Infinity ? "svg" : longSide(entry.file) + "px"} ${entry.url}`);
      writeFileSync(INDEX, JSON.stringify(index, null, 0));
    }
    writeFileSync(INDEX, JSON.stringify(index, null, 0));
    console.log("upgrade:", counts, via);
    runAudit(names);
    return;
  }
  const counts = { wikidata: 0, clearbit: 0, favicon: 0, none: 0, kept: 0 };
  for (const t of targets) {
    if (only && !only.includes(t.id)) continue;
    if (NO_LOGO_IDS.has(t.id)) { counts.none++; continue; }
    if (!force && index[t.id] && existsSync(join(OUT, index[t.id].file))) { counts.kept++; continue; }
    let entry: Entry | null = null;
    try { entry = await wikidataLogo(t.id, t.name, t.website ?? ""); } catch (e) { console.warn(`wikidata failed for ${t.id}: ${String(e).slice(0, 80)}`); }
    if (!entry) entry = await clearbitLogo(t.id, t.website ?? "");
    if (!entry) entry = await faviconLogo(t.id, t.website ?? "");
    if (entry) {
      // remove stale files with other extensions
      for (const ext of ["svg", "png", "jpg", "ico"]) { const f = join(OUT, `${t.id}.${ext}`); if (f !== join(OUT, entry.file) && existsSync(f)) unlinkSync(f); }
      index[t.id] = entry; counts[entry.source]++;
      console.log(`${t.id}: ${entry.source}${entry.qid ? ` (${entry.qid} ${entry.name})` : ""}`);
    } else { counts.none++; console.log(`${t.id}: no logo`); }
    writeFileSync(INDEX, JSON.stringify(index, null, 0));
  }
  const total = Object.values(index).reduce((a, e) => a + (existsSync(join(OUT, e.file)) ? statSync(join(OUT, e.file)).size : 0), 0);
  console.log(`logos: ${Object.keys(index).length} entries, ${(total / 1024 / 1024).toFixed(1)} MB;`, counts);
}

main().catch((e) => { console.error(e); process.exit(1); });
