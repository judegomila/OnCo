/**
 * Regulatory and knowledge-base universe lists: the outside lists that matter most to a patient, so /completeness/
 * can say how much of each OnCo holds and name what it lacks.
 *
 *   fda-oncology-approvals   every FDA Oncology Center of Excellence approval notification since 1 January 2020,
 *                            one item per notification (one indication), with the drugs it names
 *   fda-novel-oncology       CDER novel drug approvals (new molecular entities and new therapeutic biologics) since
 *                            2020 whose approved use is a cancer, a cancer-related condition or cancer imaging
 *   fda-cdx-oncology         the FDA list of cleared or approved companion diagnostic devices, oncology rows
 *   ema-oncology             centrally authorised human medicines in oncology (EMA medicines report), originators only
 *   who-eml-cancer           WHO Model List of Essential Medicines (eEML, 2025 list): section 8.2, antineoplastics
 *                            and supportive medicines
 *   civic-genes              CIViC genes with at least one accepted evidence item
 *   civic-assertions         CIViC accepted assertions (the curated, evidence-backed biomarker claims)
 *
 * Same envelope as scripts/fetch-universe.ts: { checked, source, method, total, items, ...extras }, written to
 * src/data/universe-lists/<name>.json; a failed source keeps its previous snapshot. Every request sends the OnCo
 * User-Agent, one at a time with a pause; robots.txt of every host was read on 2026-11-03 and none disallows these paths.
 *
 * The FDA notification page lists only the most recent three or so years (19 January 2023 onwards when read on
 * 3 November 2026). The notifications from 1 January 2020 to 3 March 2023 are read once from the Internet Archive's
 * copy of the same FDA page (snapshot 7 March 2023), and each item links to its own live fda.gov notification page;
 * weekly runs keep those archived items and add whatever the live page lists.
 *
 * Sources that were tried and not used are recorded in docs/DATA-SOURCES.md (Medicare MolDX test lists sit behind the
 * AMA CPT licence; PMDA forbids automated download; NMPA is all rights reserved).
 *
 * Run: npm run fetch:universe:regulatory            Only some: -- --only=fda-cdx-oncology,who-eml-cancer
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { inflateRawSync } from "node:zlib";
import { decodeEntities, parseLongDate, sleep, stripTags, today } from "./feed-utils";

export const UA = "OnCo (https://onco.cc; hello@onco.cc)";
const OUT_DIR = join(process.cwd(), "src", "data", "universe-lists");
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",").filter(Boolean);
const PAUSE_MS = 1500;
const errors: string[] = [];
const clean = (s: string) => decodeEntities(stripTags(s)).replace(/ /g, " ").replace(/\s+/g, " ").trim();

type Envelope = { checked: string; source: { label: string; url: string }; method: string; total: number; items?: unknown[] } & Record<string, unknown>;

async function fetchRaw(url: string, init: RequestInit = {}, tries = 4): Promise<Response | null> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { ...init, headers: { "User-Agent": UA, ...(init.headers ?? {}) }, redirect: "follow" });
      await sleep(PAUSE_MS);
      if (r.status === 429 || r.status >= 500) { await sleep(3000 * (i + 1)); continue; }
      return r.ok ? r : null;
    } catch (e) {
      if (i === tries - 1) { console.warn(`  giving up ${url}: ${(e as Error).message}`); return null; }
      await sleep(2000 * (i + 1));
    }
  }
  return null;
}
async function text(url: string): Promise<string | null> { const r = await fetchRaw(url, { headers: { Accept: "text/html" } }); return r ? r.text() : null; }
async function buffer(url: string): Promise<Buffer | null> { const r = await fetchRaw(url); return r ? Buffer.from(await r.arrayBuffer()) : null; }

function save(name: string, data: Envelope): void {
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, `${name}.json`), JSON.stringify(data, null, 1) + "\n");
  console.log(`universe: ${name}: total ${data.total}${data.items ? ` (${data.items.length} items)` : ""}`);
}
function previous<T = unknown>(name: string): (Omit<Envelope, "items"> & { items?: T[] }) | null {
  const p = join(OUT_DIR, `${name}.json`);
  if (!existsSync(p)) return null;
  try { return JSON.parse(readFileSync(p, "utf8")); } catch { return null; }
}
async function source(name: string, run: () => Promise<Envelope | null>): Promise<void> {
  if (ONLY && !ONLY.includes(name)) return;
  try {
    const data = await run();
    if (!data) throw new Error("no data");
    if (data.total <= 0) throw new Error("parsed zero");
    save(name, data);
  } catch (e) {
    errors.push(`${name}: ${(e as Error).message}`);
    console.warn(`universe: FAILED ${name}: ${(e as Error).message}; keeping previous snapshot`);
  }
}

/** Table rows as arrays of cell HTML. */
function rows(html: string): string[][] {
  return (html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) ?? []).map((r) => r.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/gi) ?? []);
}
const mdy = (s: string) => { const m = s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/); return m ? `${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}` : undefined; };

/** Cancer words for filtering FDA "approved use" text and EMA indications. */
export const CANCER_TEXT = /(?:\b(?:cancers?|cancerous|neoplastic|tumou?rs?|leuka?emias?|myelodysplastic|myelofibrosis|polycythemia vera|mastocytosis|macroglobulinemia|histiocytosis|metasta\w*|oncolog\w*|malignan\w*|desmoid|GIST|plexiform neurofibromas?|chemotherapy|PSMA|somatostatin receptor|von Hippel-Lindau)\b|\w*(?:carcinomas?|neoplasms?|lymphomas?|myelomas?|melanomas?|sarcomas?|gliomas?|blastomas?|mesotheliomas?)\b)/i;

// ---------------------------------------------------------------------------------------------------
// FDA OCE approval notifications, one item per notification, 2020 onwards.
// ---------------------------------------------------------------------------------------------------
export const FDA_OCE_LIVE = "https://www.fda.gov/drugs/cancer-approvals/oncology-cancerhematologic-malignancies-approval-notifications";
export const FDA_OCE_ARCHIVE = "https://web.archive.org/web/20230307000830/https://www.fda.gov/drugs/resources-information-approved-drugs/oncology-cancer-hematologic-malignancies-approval-notifications";
export type OceDrug = { generic: string; brand?: string; sponsor?: string };
export type OceApproval = { date: string; title: string; url: string; drugs: OceDrug[]; accelerated: boolean; text: string; via: "live" | "archive" };

const STOP_WORDS = new Set(["approved", "approves", "approval", "approve", "to", "with", "and", "of", "for", "plus", "granted", "grants", "the", "a", "an", "in", "combination", "or", "administration", "food", "drug", "fda", "regular", "traditional", "accelerated", "expanded", "indication", "on", "patients", "following", "followed", "by", "after", "subcutaneous", "intravenous", "oral", "injection", "tablets", "capsules", "new", "dosing", "regimen", "formulation", "therapy", "agent", "single", "as", "use", "conversion", "converted", "label", "update", "extended", "release", "kit", "preparation"]);

/** Words that end a generic name read backwards from a bracket: disease, biology and trial vocabulary, never a drug. */
const NOT_A_DRUG = /\b(cancers?|carcinomas?|lymphomas?|leuka?emias?|tumou?rs?|neoplasms?|sarcomas?|gliomas?|myelomas?|mastocytosis|receptors?|mutations?|kinases?|inhibitors?|antigens?|domains?|sequencing|expression|radiotherapy|chemoradiotherapy|transplant|graft|refractory|diagnosed|pediatric|syndrome|spectrum|patients?|test|neck|device|dosing|regimens?|safety|labeling|adenocarcinoma|thrombocytosis|stage|risk|phase|situ|intolerant|strong|that|who|more|gene|factor|hormone|agents?|recovery|duplication|neuroblastoma|neurofibromas?|neurofibromatosis|paraganglioma|macroglobulinemia|light chain|progenitor|otherwise|every|canal|central|nervous|exon|death|membrane|nucleophosmin|methyltransferase|claudin|hematological|lymphoblastic|repair|growth)\b/i;
const ABBREVIATIONS = /\b(U\.S|Co|Inc|Ltd|Corp|L\.P|LLC|S\.A|N\.V|Dr|No|St|vs)\.$/;

/** The notification's first sentence, not cut at "U.S." or "Inc." inside a sponsor name. */
export function firstSentence(s: string): string {
  for (const m of s.matchAll(/\.\s+(?=[A-Z])/g)) {
    const end = (m.index ?? 0) + 1;
    if (ABBREVIATIONS.test(s.slice(Math.max(0, end - 8), end))) continue;
    return s.slice(0, end);
  }
  return s;
}

/** "... approved enfortumab vedotin-ejfv (Padcev, Astellas Pharma) in combination with pembrolizumab (Keytruda, Merck)" -> two drugs. */
export function oceDrugs(sentence: string): OceDrug[] {
  const out: OceDrug[] = [];
  for (const m of sentence.matchAll(/([^()]*?)\s*\(([^()]+)\)/g)) {
    const inside = m[2].split(/\s*,\s*/).map((s) => s.trim()).filter(Boolean);
    if (!inside.length) continue;
    const tokens = m[1].trim().split(/\s+/);
    const last = tokens[tokens.length - 1] ?? "";
    // Brand first: "approved Poherdy (pertuzumab-dpzb, Shanghai Henlius Biologics Co., Ltd.)".
    if (inside.length > 1 && /^[a-z][a-z0-9\- ]+$/.test(inside[0]) && /^[A-Z][A-Za-z0-9\-]+$/.test(last) && !NOT_A_DRUG.test(inside[0])) {
      out.push({ generic: inside[0], brand: last, sponsor: inside.slice(1).join(", ") });
      continue;
    }
    // Generic first: the bracket opens with a brand and either names a sponsor or is one short brand.
    // A single lowercase generic after a brand: "approves Onureg (azacitidine tablets)".
    if (inside.length === 1 && /^[a-z][a-z0-9\- ]+$/.test(inside[0]) && /^[A-Z][A-Za-z0-9\-]+$/.test(last) && !NOT_A_DRUG.test(inside[0]) && !/^(recombinant|generic)$/.test(inside[0])) {
      out.push({ generic: inside[0].replace(/\s+(tablets|capsules)$/, ""), brand: last });
      continue;
    }
    if (!/^[A-Z0-9]/.test(inside[0])) continue;
    if (inside.length === 1 && (/^[A-Z0-9\-]{1,6}$/.test(inside[0]) || inside[0].split(/\s+/).length > 3)) continue;
    const name: string[] = [];
    for (let i = tokens.length - 1; i >= 0 && name.length < 6; i--) {
      const t = tokens[i].replace(/[,;:]$/, "");
      if (!t || STOP_WORDS.has(t.toLowerCase()) || (/[,;:]$/.test(tokens[i]) && name.length)) break;
      if (!/^[a-z0-9][a-z0-9\-/]*$/.test(t) && !/^(Lu|Ga|Y|Ra|I|Cu)$/.test(t)) break;
      name.unshift(t);
    }
    if (!name.length) continue;
    const generic = name.join(" ").replace(/^(?:(?:and|of|oral|containing|combination)\s+)+/, "").replace(/\s+(tablets|capsules)$/, "");
    if (generic.length < 4 || NOT_A_DRUG.test(generic)) continue;
    out.push({ generic, brand: inside[0], sponsor: inside.slice(1).join(", ") || undefined });
  }
  const seen = new Set<string>();
  return out.filter((d) => (seen.has(d.generic) ? false : (seen.add(d.generic), true)));
}

/** Fallback when the first sentence has no (Brand, Sponsor) bracket: "FDA grants accelerated approval to sacituzumab govitecan for advanced urothelial cancer". */
export function titleDrugs(title: string): OceDrug[] {
  const m = title.match(/^FDA\s+(?:approves|grants\s+(?:\w+\s+){0,3}approval\s+(?:to|for)|expands\s+(?:\w+\s+){0,3}(?:of|for)|authorizes)\s+(.+?)\s+(?:for|in|as|to treat)\s/i);
  if (!m) return [];
  return m[1].split(/\s+(?:with|and|plus|in combination with)\s+|,\s*/)
    .map((g) => g.trim().toLowerCase().replace(/^(?:(?:and|a|an|new|oral|fixed-dose|combination|of)\s+)+/, "").replace(/\s+(tablets|capsules)$/, "").replace(/[‐-―]/g, "-"))
    .filter((g) => g.length >= 4 && /^[a-z0-9][a-z0-9\- ]+$/.test(g) && !NOT_A_DRUG.test(g) && !/^(a|an|the|new|first|updated)\b/.test(g)).map((generic) => ({ generic }));
}

export function parseOceRows(html: string, via: OceApproval["via"]): OceApproval[] {
  const out: OceApproval[] = [];
  for (const cells of rows(html)) {
    if (cells.length < 2 || !/<td/i.test(cells[0])) continue;
    const href = cells[0].match(/href="([^"]+)"/i)?.[1];
    if (!href) continue;
    const title = clean(cells[0]);
    const summary = clean(cells[1]);
    const date = parseLongDate(summary) ?? mdy(clean(cells[cells.length - 1]));
    if (!date || !title) continue;
    if (!/approv|grant|authoriz|expand|convert|clear/i.test(title + " " + summary.slice(0, 200))) continue;
    const first = firstSentence(summary);
    const url = href.startsWith("http") ? href.replace(/^https?:\/\/web\.archive\.org\/web\/\d+(?:id_)?\//, "") : `https://www.fda.gov${href}`;
    const fromText = oceDrugs(first);
    out.push({ date, title, url: url.replace(/^http:/, "https:"), drugs: fromText.length ? fromText : titleDrugs(title), accelerated: /accelerated approval/i.test(first), text: first.slice(0, 1500), via });
  }
  return out;
}

/** The path FDA publishes approval notices under since November 2026; the same notices used to sit under /drugs/resources-information-approved-drugs/. */
const OCE_CURRENT_PATH = /^https:\/\/www\.fda\.gov\/drugs\/cancer-approvals\//;
const oceTitleKey = (title: string) => title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/**
 * One item per notification. A notice is its date plus its title, not its address: when FDA moved the notices to
 * /drugs/cancer-approvals/ the same 183 notices came back under a second URL and a list keyed by URL counted each twice
 * (364 items became 548). Of two items for one notice the one at the current path is kept, then the later one in the
 * input (the newest read). Newest first, then by title.
 */
export function dedupeOce(all: OceApproval[]): OceApproval[] {
  const byNotice = new Map<string, OceApproval>();
  for (const i of all) {
    const key = `${i.date}|${oceTitleKey(i.title)}`;
    const held = byNotice.get(key);
    if (held && OCE_CURRENT_PATH.test(held.url) && !OCE_CURRENT_PATH.test(i.url)) continue;
    byNotice.set(key, i);
  }
  return [...byNotice.values()].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

async function fdaOncologyApprovals(): Promise<Envelope | null> {
  const prev = previous<OceApproval>("fda-oncology-approvals");
  let archived = (prev?.items ?? []).filter((i) => i.via === "archive");
  if (!archived.length) {
    const html = await text(FDA_OCE_ARCHIVE.replace(/\/web\/(\d+)\//, "/web/$1id_/"));
    if (!html) throw new Error("archive snapshot unreachable");
    archived = parseOceRows(html, "archive").filter((i) => i.date >= "2020-01-01");
  }
  const liveHtml = await text(FDA_OCE_LIVE);
  if (!liveHtml) return null;
  const live = parseOceRows(liveHtml, "live");
  if (!live.length) throw new Error("live page parsed zero rows");
  const items = dedupeOce([...archived, ...(prev?.items ?? []).filter((x) => x.via === "live"), ...live]).filter((i) => i.date >= "2020-01-01");
  return {
    checked: today(), source: { label: "FDA: Oncology (Cancer) / Hematologic Malignancies Approval Notifications", url: FDA_OCE_LIVE },
    method: "One item per approval notification dated 1 January 2020 or later: the live FDA page (19 January 2023 onwards when first read) plus, for 2020 to early 2023, the same FDA page as the Internet Archive kept it on 7 March 2023 (" + FDA_OCE_ARCHIVE + "). Each item links to its own fda.gov notification; a notice is identified by its date and title, so one that FDA has moved to a new address is counted once, at the newer address. Drug names are the generic names the notification's first sentence gives before a (Brand, Sponsor) bracket. Public domain (US government work).",
    total: items.length, window: { from: items[items.length - 1]?.date, to: items[0]?.date }, drugs: new Set(items.flatMap((i) => i.drugs.map((d) => d.generic))).size,
    licence: "Public domain (US government work)", items,
  };
}

// ---------------------------------------------------------------------------------------------------
// CDER novel drug approvals, oncology, 2020 onwards.
// ---------------------------------------------------------------------------------------------------
const NOVEL_URL = (y: number) => `https://www.fda.gov/drugs/novel-drug-approvals-fda/novel-drug-approvals-${y}`;
const NOVEL_2020_ARCHIVE = "https://web.archive.org/web/20210614155937/https://www.fda.gov/drugs/new-drugs-fda-cders-new-molecular-entities-and-new-therapeutic-biological-products/novel-drug-approvals-2020";
export type NovelDrug = { brand: string; generic: string; date: string; use: string; year: number; source: string };

export function parseNovel(html: string, year: number, src: string): NovelDrug[] {
  const out: NovelDrug[] = [];
  for (const cells of rows(html)) {
    if (cells.length < 5 || !/<td/i.test(cells[0])) continue;
    const c = cells.map(clean);
    const date = mdy(c[3]);
    if (!date) continue;
    const use = c[4].replace(/\s*(Press Release|Drug Trials Snapshot|Snapshot)\b.*$/i, "").trim();
    out.push({ brand: c[1].replace(/\s+$/, ""), generic: c[2], date, use, year, source: src });
  }
  return out;
}

async function fdaNovelOncology(): Promise<Envelope | null> {
  const all: NovelDrug[] = [];
  const thisYear = Number(today().slice(0, 4));
  for (let y = 2020; y <= thisYear; y++) {
    const src = y === 2020 ? NOVEL_2020_ARCHIVE : NOVEL_URL(y);
    const html = await text(y === 2020 ? src.replace(/\/web\/(\d+)\//, "/web/$1id_/") : src);
    if (!html) { if (y === thisYear) continue; throw new Error(`novel approvals ${y} unreachable`); }
    const got = parseNovel(html, y, src);
    if (!got.length) throw new Error(`novel approvals ${y} parsed zero`);
    all.push(...got);
  }
  const items = all.filter((d) => CANCER_TEXT.test(d.use)).sort((a, b) => b.date.localeCompare(a.date));
  return {
    checked: today(), source: { label: "FDA CDER: Novel Drug Approvals (2020 onwards)", url: "https://www.fda.gov/drugs/development-approval-process-drugs/novel-drug-approvals-fda" },
    method: "Every row of CDER's yearly 'Novel Drug Approvals' tables from 2020 (the 2020 page is no longer on fda.gov and is read from the Internet Archive copy of 14 June 2021) whose 'FDA-approved use on approval date' names a cancer, a myeloid or lymphoid neoplasm, cancer imaging or a cancer-treatment complication. CBER products (cell and gene therapies) are not on these tables; they are in the FDA oncology notifications list. Public domain (US government work).",
    total: items.length, novelAll: all.length, licence: "Public domain (US government work)", items,
  };
}

// ---------------------------------------------------------------------------------------------------
// FDA companion diagnostics, oncology rows.
// ---------------------------------------------------------------------------------------------------
export const FDA_CDX = "https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools";
export type CdxRow = { device: string; maker: string; indication: string; drugs: string[]; drugText: string; biomarker: string; pma: string; date?: string; group: "drug" | "class" };

export function parseCdx(html: string): CdxRow[] {
  const out: CdxRow[] = [];
  for (const cells of rows(html)) {
    if (cells.length < 4 || !/<td/i.test(cells[0])) continue;
    const c = cells.map(clean);
    const dm = c[0].match(/^(.*)\(([^()]*(?:\([^()]*\))?[^()]*)\)\s*$/);
    let device = (dm ? dm[1] : c[0]).trim(), maker = (dm ? dm[2] : "").trim();
    // An unbalanced bracket: "VENTANA MET (SP44) RxDx Assay (Ventana Medical Systems, Inc. (Roche Tissue Diagnostics)".
    if ((device.match(/\(/g) ?? []).length > (device.match(/\)/g) ?? []).length) {
      const at = device.lastIndexOf("(");
      maker = `${device.slice(at + 1).trim()} (${maker})`;
      device = device.slice(0, at).trim();
    }
    maker = maker.replace(/\s*\($/, "").trim();
    let drugText: string, biomarker: string, pma: string, group: CdxRow["group"];
    if (c.length >= 6) { drugText = c[2]; biomarker = [c[3], c[4]].filter(Boolean).join(": "); pma = c[5]; group = "drug"; }
    else { pma = c[2]; biomarker = c[3]; drugText = c[3]; group = "class"; }
    const drugs = [...drugText.matchAll(/\(([a-z][a-z0-9 \-+]+?)\)/gi)].flatMap((m) => m[1].split(/\s*\+\s*/)).map((d) => d.trim().toLowerCase()).filter((d) => /^[a-z][a-z\- ]{3,}$/.test(d) && !/^(generic|tissue|plasma|blood)$/.test(d));
    const date = mdy(pma);
    out.push({ device, maker, indication: c[1], drugs: [...new Set(drugs)], drugText: drugText.slice(0, 400), biomarker: biomarker.slice(0, 300), pma: pma.replace(/\s+/g, " "), date, group });
  }
  return out;
}

async function fdaCdx(): Promise<Envelope | null> {
  const html = await text(FDA_CDX);
  if (!html) return null;
  const all = parseCdx(html);
  const items = all.filter((r) => CANCER_TEXT.test(r.indication) || /solid tumou?rs?|NSCLC|AML|CLL|MDS|HCC/i.test(r.indication) || CANCER_TEXT.test(r.drugText));
  return {
    checked: today(), source: { label: "FDA: List of Cleared or Approved Companion Diagnostic Devices (In Vitro and Imaging Tools)", url: FDA_CDX },
    method: "Every row of the FDA list whose indication or drug names a cancer (the list also holds a few non-cancer rows, which are excluded). One item per row: a device, an indication and sample type, the drug or drugs it selects for, and the PMA, 510(k) or De Novo number with its date. The tables at the foot of the page that claim a class of drugs rather than one are kept and marked group 'class'. Public domain (US government work).",
    total: items.length, rowsAll: all.length, devices: new Set(items.map((r) => r.device.toLowerCase())).size, licence: "Public domain (US government work)", items,
  };
}

// ---------------------------------------------------------------------------------------------------
// EMA: centrally authorised medicines in oncology.
// ---------------------------------------------------------------------------------------------------
const EMA_XLSX = "https://www.ema.europa.eu/en/documents/report/medicines-output-medicines-report_en.xlsx";
export type EmaMedicine = { name: string; inn: string; holder?: string; authorised?: string; conditional: boolean; orphan: boolean; atc?: string; url?: string; indication: string };

export function zipEntries(buf: Buffer): Map<string, Buffer> {
  const out = new Map<string, Buffer>();
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error("not a zip file");
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break;
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20), nlen = buf.readUInt16LE(p + 28), elen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32), off = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nlen);
    const start = off + 30 + buf.readUInt16LE(off + 26) + buf.readUInt16LE(off + 28);
    const data = buf.subarray(start, start + csize);
    out.set(name, method === 8 ? inflateRawSync(data) : Buffer.from(data));
    p += 46 + nlen + elen + clen;
  }
  return out;
}
const cellText = (xml: string) => decodeEntities((xml.match(/<t[^>]*>([\s\S]*?)<\/t>/g) ?? []).map((t) => t.replace(/<[^>]+>/g, "")).join(""));
function parseSheet(sheetXml: string, sharedXml: string): Array<Record<string, string>> {
  const shared = (sharedXml.match(/<si>[\s\S]*?<\/si>/g) ?? []).map(cellText);
  const out: Array<Record<string, string>> = [];
  for (const row of sheetXml.match(/<row [^>]*>[\s\S]*?<\/row>/g) ?? []) {
    const rec: Record<string, string> = {};
    for (const c of row.match(/<c [^>]*?(?:\/>|>[\s\S]*?<\/c>)/g) ?? []) {
      const col = c.match(/r="([A-Z]+)\d+"/)?.[1];
      if (!col) continue;
      const type = c.match(/\st="([a-zA-Z]+)"/)?.[1];
      let v = "";
      if (type === "s") v = shared[Number(c.match(/<v>(\d+)<\/v>/)?.[1] ?? -1)] ?? "";
      else if (type === "inlineStr") v = cellText(c);
      else {
        const raw = c.match(/<v>([\s\S]*?)<\/v>/)?.[1];
        const n = Number(raw);
        v = raw === undefined ? "" : !Number.isNaN(n) && n > 20000 && n < 80000 && /s="\d+"/.test(c) ? new Date(Date.UTC(1899, 11, 30) + n * 86_400_000).toISOString().slice(0, 10) : decodeEntities(raw);
      }
      if (v) rec[col] = v.trim();
    }
    if (Object.keys(rec).length) out.push(rec);
  }
  return out;
}
const toIso = (s?: string) => { if (!s) return undefined; const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})/); return m ? `${m[3]}-${m[2]}-${m[1]}` : s.match(/^\d{4}-\d{2}-\d{2}/)?.[0]; };
/** Neoplasm words; "leuk" alone would take leukodystrophy, and "tumour" alone tumour necrosis factor. */
const EMA_ONCO = /\b(neoplas\w*|\w*carcinoma\w*|leuka?emi\w*|\w*lymphoma\w*|myeloma\w*|melanoma\w*|\w*sarcoma\w*|\w*glioma\w*|\w*blastoma\w*|cancer\w*|myelodysplas\w*|tumou?rs?(?! necrosis))\b/i;

async function emaOncology(): Promise<Envelope | null> {
  const buf = await buffer(EMA_XLSX);
  if (!buf) return null;
  const entries = zipEntries(buf);
  const sheet = entries.get("xl/worksheets/sheet1.xml"), shared = entries.get("xl/sharedStrings.xml");
  if (!sheet) throw new Error("no sheet1");
  const all = parseSheet(sheet.toString("utf8"), shared?.toString("utf8") ?? "");
  const hi = all.findIndex((r) => Object.values(r).includes("Category") && Object.values(r).includes("Name of medicine"));
  if (hi < 0) throw new Error("header row not found");
  const header = all[hi];
  const col = (re: RegExp) => Object.entries(header).find(([, v]) => re.test(v))?.[0];
  const C = { cat: col(/^Category/), name: col(/^Name of medicine/), status: col(/^Medicine status/), inn: col(/^International non-proprietary/), subst: col(/^Active substance/), area: col(/^Therapeutic area/), atc: col(/^ATC code \(human\)/), ind: col(/^Therapeutic indication/), cond: col(/^Conditional approval/), generic: col(/^Generic/), biosimilar: col(/^Biosimilar/), orphan: col(/^Orphan/), holder: col(/^Marketing authorisation (developer|holder)/), auth: col(/^Marketing authorisation date/), url: col(/^Medicine URL/) };
  const g = (r: Record<string, string>, k?: string) => (k ? r[k] ?? "" : "");
  const human = all.slice(hi + 1).filter((r) => g(r, C.cat) === "Human");
  const items: EmaMedicine[] = [];
  for (const r of human) {
    if (!/^authorised/i.test(g(r, C.status))) continue;
    if (/yes/i.test(g(r, C.generic)) || /yes/i.test(g(r, C.biosimilar))) continue;
    const atc = g(r, C.atc), ind = g(r, C.ind);
    if (!(/^L0[12]/.test(atc) || EMA_ONCO.test(g(r, C.area)))) continue;
    items.push({ name: g(r, C.name), inn: g(r, C.inn) || g(r, C.subst), holder: g(r, C.holder) || undefined, authorised: toIso(g(r, C.auth)), conditional: /yes/i.test(g(r, C.cond)), orphan: /yes/i.test(g(r, C.orphan)), atc: atc || undefined, url: g(r, C.url) || undefined, indication: ind.replace(/\s+/g, " ").slice(0, 280) });
  }
  items.sort((a, b) => a.name.localeCompare(b.name));
  return {
    checked: today(), source: { label: "European Medicines Agency: medicines report (centrally authorised human medicines)", url: "https://www.ema.europa.eu/en/medicines/download-medicine-data" },
    method: "EMA's daily 'Medicines output: medicines report' spreadsheet (" + EMA_XLSX + "): human medicines whose status is authorised, that are neither generics nor biosimilars, and whose ATC code is L01 or L02 (antineoplastic or endocrine therapy) or whose therapeutic area (MeSH) names a neoplasm, carcinoma, leukaemia, lymphoma, myeloma, melanoma, sarcoma, glioma, blastoma, myelodysplasia, tumour or cancer. One item per medicine (brand); several brands can share one active substance. Reproduced with acknowledgement of the European Medicines Agency, as its legal notice requires.",
    total: items.length, substances: new Set(items.map((i) => i.inn.toLowerCase())).size, licence: "EMA legal notice: reproduction authorised with the source acknowledged", items,
  };
}

// ---------------------------------------------------------------------------------------------------
// WHO Model List of Essential Medicines (eEML): section 8.2.
// ---------------------------------------------------------------------------------------------------
const EEML = "https://list.essentialmeds.org/";
const EML_SECTIONS = ["Cytotoxic medicines", "Targeted therapies", "Immunomodulators", "Hormones and antihormones", "Supportive medicines"];
export type EmlMedicine = { name: string; id: string; url: string; section: string; indications: string[]; equivalentTo?: string };

export function parseEeml(html: string): EmlMedicine[] {
  const out: EmlMedicine[] = [];
  for (const li of html.split(/<li>\s*<div>\s*<input class="expand-toggle"/).slice(1)) {
    const name = decodeEntities(li.match(/<h5 class="medicine-name" title="([^"]+)"/)?.[1] ?? "").trim();
    const id = li.match(/list\.essentialmeds\.org\/medicines\/(\d+)/)?.[1];
    if (!name || !id) continue;
    const sections = [...li.matchAll(/class="section-name">([^<]+)</g)].map((m) => decodeEntities(m[1]).trim());
    const section = sections.find((s) => EML_SECTIONS.includes(s));
    if (!section) continue;
    const indications = [...new Set([...li.matchAll(/class="indication-text">([^<]+)</g)].map((m) => decodeEntities(m[1]).trim()))];
    const eq = li.match(/Therapeutic equivalent to\s*<a[^>]*>\s*([^<]+?)\s*<\/a>/)?.[1];
    out.push({ name, id, url: `https://list.essentialmeds.org/medicines/${id}`, section, indications, ...(eq ? { equivalentTo: decodeEntities(eq) } : {}) });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

async function whoEml(): Promise<Envelope | null> {
  const html = await text(EEML);
  if (!html) return null;
  const items = parseEeml(html);
  const bySection: Record<string, number> = {};
  for (const i of items) bySection[i.section] = (bySection[i.section] ?? 0) + 1;
  return {
    checked: today(), source: { label: "WHO Model List of Essential Medicines (eEML), section 8.2 Antineoplastics and supportive medicines", url: EEML },
    method: "Every medicine the WHO electronic Essential Medicines List places under 8.2.1 Cytotoxic medicines, 8.2.2 Targeted therapies, 8.2.3 Immunomodulators, 8.2.4 Hormones and antihormones or 8.2.5 Supportive medicines, as the eEML home page lists them (the current list, whose medicine histories run to the 2025 decisions, TRS 1064). Medicines listed as a therapeutic equivalent of another are kept and say so. WHO eEML, World Health Organization; licence CC BY 3.0 IGO.",
    total: items.length, bySection, licence: "CC BY 3.0 IGO (WHO eEML)", items,
  };
}

// ---------------------------------------------------------------------------------------------------
// CIViC (CC0): genes with accepted evidence, and accepted assertions.
// ---------------------------------------------------------------------------------------------------
const CIVIC = "https://civicdb.org/api/graphql";
async function civicQuery<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const r = await fetchRaw(CIVIC, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ query, variables }) });
  if (!r) throw new Error("CIViC unreachable");
  const j = (await r.json()) as { data?: T; errors?: unknown };
  if (!j.data) throw new Error(`CIViC error ${JSON.stringify(j.errors).slice(0, 200)}`);
  return j.data;
}
/** A variant's feature: a gene, or a fusion whose partner genes are named when known ("v::ALK" has only a 3' partner). */
const FEATURE = "feature { id name featureType featureInstance { __typename ... on Fusion { fivePrimeGene { id name } threePrimeGene { id name } } } }";
type CivicFeature = { id: number; name: string; featureType: string; featureInstance?: { fivePrimeGene?: { id: number; name: string } | null; threePrimeGene?: { id: number; name: string } | null } };
function genesOf(variants: Array<{ feature: CivicFeature }> = []): Array<{ id: number; name: string }> {
  const out = new Map<string, { id: number; name: string }>();
  for (const { feature: f } of variants) {
    if (!f) continue;
    if (f.featureType === "GENE") out.set(f.name, { id: f.id, name: f.name });
    else if (f.featureType === "FUSION") for (const g of [f.featureInstance?.fivePrimeGene, f.featureInstance?.threePrimeGene]) if (g) out.set(g.name, g);
  }
  return [...out.values()];
}
export type CivicGene = { name: string; id: number; url: string; evidence: number; levels: Record<string, number> };
export type CivicAssertion = { id: number; name: string; url: string; type: string; significance: string; ampLevel?: string; profile: string; genes: string[]; disease?: string; therapies: string[] };

async function civicEvidenceGenes(): Promise<{ genes: CivicGene[]; evidence: number }> {
  const q = `query($after: String) { evidenceItems(first: 500, after: $after, status: ACCEPTED) { totalCount pageInfo { hasNextPage endCursor } nodes { evidenceLevel molecularProfile { variants { ${FEATURE} } } } } }`;
  const genes = new Map<string, CivicGene>();
  let after: string | null = null, total = 0;
  for (let page = 0; page < 100; page++) {
    const d: { evidenceItems: { totalCount: number; pageInfo: { hasNextPage: boolean; endCursor: string }; nodes: Array<{ evidenceLevel: string; molecularProfile: { variants: Array<{ feature: CivicFeature }> } }> } } = await civicQuery(q, { after });
    total = d.evidenceItems.totalCount;
    for (const n of d.evidenceItems.nodes) {
      for (const f of genesOf(n.molecularProfile?.variants)) {
        const gene = genes.get(f.name) ?? { name: f.name, id: f.id, url: `https://civicdb.org/features/${f.id}/summary`, evidence: 0, levels: {} };
        gene.evidence++;
        gene.levels[n.evidenceLevel] = (gene.levels[n.evidenceLevel] ?? 0) + 1;
        genes.set(f.name, gene);
      }
    }
    if (!d.evidenceItems.pageInfo.hasNextPage) break;
    after = d.evidenceItems.pageInfo.endCursor;
  }
  return { genes: [...genes.values()].sort((a, b) => b.evidence - a.evidence || a.name.localeCompare(b.name)), evidence: total };
}

async function civicGenes(): Promise<Envelope | null> {
  const { genes: all, evidence } = await civicEvidenceGenes();
  // Level A (validated) or B (clinical) evidence: the genes with clinical, not only preclinical or case-report, support.
  const genes = all.filter((g) => (g.levels.A ?? 0) + (g.levels.B ?? 0) > 0);
  return {
    checked: today(), source: { label: "CIViC: genes with accepted clinical evidence (levels A and B)", url: "https://civicdb.org/features/home" },
    method: "CIViC GraphQL API (" + CIVIC + "): every accepted evidence item, grouped by the gene of its molecular profile (a gene feature, or each named partner gene of a fusion feature); one item per gene, with its accepted evidence count and the count at each evidence level (A validated to E inferential); kept when at least one item is level A (validated) or B (clinical evidence). Fusions count for both partner genes. CIViC content is CC0 1.0; cite Griffith et al., Nat Genet 2017.",
    total: genes.length, genesAnyLevel: all.length, evidenceItems: evidence, licence: "CC0 1.0", items: genes,
  };
}

async function civicAssertions(): Promise<Envelope | null> {
  const q = `query($after: String) { assertions(first: 200, after: $after, status: ACCEPTED) { totalCount pageInfo { hasNextPage endCursor } nodes { id name assertionType significance ampLevel molecularProfile { name variants { ${FEATURE} } } disease { name } therapies { name } } } }`;
  const items: CivicAssertion[] = [];
  let after: string | null = null;
  for (let page = 0; page < 20; page++) {
    const d: { assertions: { pageInfo: { hasNextPage: boolean; endCursor: string }; nodes: Array<{ id: number; name: string; assertionType: string; significance: string; ampLevel: string | null; molecularProfile: { name: string; variants: Array<{ feature: CivicFeature }> }; disease: { name: string } | null; therapies: Array<{ name: string }> }> } } = await civicQuery(q, { after });
    for (const n of d.assertions.nodes) items.push({ id: n.id, name: n.name, url: `https://civicdb.org/assertions/${n.id}/summary`, type: n.assertionType, significance: n.significance, ...(n.ampLevel ? { ampLevel: n.ampLevel } : {}), profile: n.molecularProfile?.name ?? "", genes: genesOf(n.molecularProfile?.variants).map((g) => g.name), ...(n.disease ? { disease: n.disease.name } : {}), therapies: n.therapies.map((t) => t.name) });
    if (!d.assertions.pageInfo.hasNextPage) break;
    after = d.assertions.pageInfo.endCursor;
  }
  items.sort((a, b) => a.id - b.id);
  return {
    checked: today(), source: { label: "CIViC: accepted assertions", url: "https://civicdb.org/assertions/home" },
    method: "CIViC GraphQL API (" + CIVIC + "): every assertion with status accepted, the curated summary claims (predictive, diagnostic, prognostic, oncogenic, predisposing) built from several evidence items, with AMP/ASCO/CAP tier where given. One item per assertion: molecular profile, genes, disease and therapies. CC0 1.0.",
    total: items.length, licence: "CC0 1.0", items,
  };
}

async function main() {
  await source("fda-oncology-approvals", fdaOncologyApprovals);
  await source("fda-novel-oncology", fdaNovelOncology);
  await source("fda-cdx-oncology", fdaCdx);
  await source("ema-oncology", emaOncology);
  await source("who-eml-cancer", whoEml);
  await source("civic-genes", civicGenes);
  await source("civic-assertions", civicAssertions);
  if (errors.length) { console.warn(`universe: ${errors.length} source(s) failed:\n  ${errors.join("\n  ")}`); if (errors.length >= 7) process.exit(1); }
}

if (process.argv[1]?.endsWith("fetch-universe-regulatory.ts")) main();
