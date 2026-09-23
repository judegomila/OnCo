/**
 * Read one EMA medicine page (https://www.ema.europa.eu/en/medicines/human/EPAR/<slug>) into the fields the
 * proposals bot decides on. The page carries a machine-readable status
 * (`<div data-medicine-status="authorised" ...><p class="status-title">Authorised</p><div class="status-message"><p>...`)
 * and a definition list of dated facts ("Marketing authorisation issued", "Withdrawal of marketing authorisation",
 * "Revocation of marketing authorisation", "Opinion adopted", "Opinion status"). Nothing here is inferred: every
 * value is the page's own text, dates converted from dd/mm/yyyy to ISO.
 *
 * Pages are cached on disk (ONCO_CACHE_DIR, default <tmpdir>/onco-cache) so a run, its tests and a re-run within a
 * day read the register once. ONCO_OFFLINE=1 reads the cache only.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { decodeEntities, getText, sleep } from "../feed-utils";

/** `data-medicine-status` values seen on the register: authorised, withdrawn, revoked, expired, suspended, refused, opinion, withdrawn-application. */
export type EparPage = {
  url: string;
  name?: string; inn?: string; activeSubstance?: string; productNumber?: string; holder?: string; applicant?: string;
  /** The page's data-medicine-status attribute, lower case. */
  status?: string;
  /** The visible status title ("Authorised", "Withdrawn", "Application withdrawn") and its one-line explanation. */
  statusTitle?: string; statusMessage?: string;
  issued?: string; withdrawn?: string; revoked?: string; expired?: string; suspended?: string; refusalDate?: string;
  opinionAdopted?: string; opinionStatus?: string;
  conditional: boolean; biosimilar: boolean; generic: boolean;
  fields: Record<string, string>;
};

const text = (html: string) => decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const isoDate = (s?: string) => { const m = s?.match(/(\d{2})\/(\d{2})\/(\d{4})/); return m ? `${m[3]}-${m[2]}-${m[1]}` : undefined; };

export function parseEparPage(html: string, url: string): EparPage {
  const fields: Record<string, string> = {};
  for (const m of html.matchAll(/<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g)) {
    const k = text(m[1]), v = text(m[2]);
    if (k && v && !(k in fields)) fields[k] = v;
  }
  const status = html.match(/data-medicine-status="([^"]+)"/)?.[1]?.toLowerCase();
  const statusTitle = html.match(/class="h5 status-title">([^<]+)</)?.[1]?.trim();
  const statusMessage = html.match(/class="status-message">\s*<p>([^<]+)</)?.[1]?.trim();
  const flat = text(html);
  const has = (re: RegExp) => re.test(flat);
  return {
    url,
    name: fields["Name of medicine"], inn: fields["International non-proprietary name (INN) or common name"], activeSubstance: fields["Active substance"],
    productNumber: fields["EMA product number"], holder: fields["Marketing authorisation holder"], applicant: fields["Marketing authorisation applicant"],
    status, statusTitle: statusTitle && decodeEntities(statusTitle), statusMessage: statusMessage && decodeEntities(statusMessage),
    issued: isoDate(fields["Marketing authorisation issued"]), withdrawn: isoDate(fields["Withdrawal of marketing authorisation"]), revoked: isoDate(fields["Revocation of marketing authorisation"]),
    expired: isoDate(fields["Expiry of marketing authorisation"] ?? fields["Marketing authorisation expired"]), suspended: isoDate(fields["Suspension of marketing authorisation"]), refusalDate: isoDate(fields["Refusal of marketing authorisation"] ?? fields["Date of refusal"]),
    opinionAdopted: isoDate(fields["Opinion adopted"]), opinionStatus: fields["Opinion status"],
    conditional: has(/Conditional approval This medicine received a conditional marketing authorisation/i),
    biosimilar: has(/Biosimilar This is a biosimilar medicine/i),
    generic: has(/Generic This is a generic medicine/i),
    fields,
  };
}

/** "Authorised: This medicine is authorised for use in the European Union", the line quoted into each row's note. */
export function quotedStatus(p: EparPage): string | undefined {
  if (!p.statusTitle) return undefined;
  return p.statusMessage ? `${p.statusTitle}: ${p.statusMessage}` : p.statusTitle;
}

export const cacheDir = () => process.env.ONCO_CACHE_DIR ?? join(tmpdir(), "onco-cache");
const DAY = 24 * 60 * 60 * 1000;
let lastFetch = 0;

/** The page HTML from the cache (fresher than maxAgeMs) or the network, politely spaced; null when unreachable. */
export async function fetchEparHtml(url: string, opts: { maxAgeMs?: number; offline?: boolean; pauseMs?: number } = {}): Promise<{ html: string; cached: boolean } | null> {
  const dir = join(cacheDir(), "ema");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${createHash("sha1").update(url).digest("hex")}.html`);
  const maxAge = opts.maxAgeMs ?? 20 * 60 * 60 * 1000;
  if (existsSync(file)) {
    const age = Date.now() - statSync(file).mtimeMs;
    if (age < maxAge || opts.offline || process.env.ONCO_OFFLINE) return { html: readFileSync(file, "utf8"), cached: true };
  }
  if (opts.offline || process.env.ONCO_OFFLINE) return null;
  const wait = (opts.pauseMs ?? 1000) - (Date.now() - lastFetch);
  if (wait > 0) await sleep(wait);
  lastFetch = Date.now();
  const html = await getText(url, { tries: 3, accept: "text/html", timeoutMs: 30_000 });
  if (!html) return null;
  writeFileSync(file, html);
  return { html, cached: false };
}

export async function fetchEparPage(url: string, opts?: Parameters<typeof fetchEparHtml>[1]): Promise<EparPage | null> {
  const r = await fetchEparHtml(url, opts);
  return r ? parseEparPage(r.html, url) : null;
}

export { DAY };
