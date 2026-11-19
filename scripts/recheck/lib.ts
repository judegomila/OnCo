/**
 * Shared pieces of the weekly re-check (scripts/weekly-recheck.ts, docs/AUTOMATION-WEEKLY-RECHECK.md): the shape of a
 * finding, and the one way any checker talks to the network.
 *
 * Every checker is two halves. A pure half takes what OnCo holds and what a source returned and yields findings; it is
 * what the unit tests exercise, from fixtures, with no network. A thin network half reads the source through `Net`,
 * which counts every request, keeps to one request at a time per host with a pause between them, sends a plain user
 * agent that names the project, and never tries to get past a refusal: a 401, 403 or 429, a bot-challenge page or a
 * challenge header comes back marked `blocked`, the checker records it and moves on.
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export type CheckKind = "trials" | "us-approvals" | "eu-approvals" | "labels" | "guidelines" | "links";
export type Severity = "high" | "medium" | "low";

/** One row of the report: what OnCo says, what the source says, where, and when the source said it. */
export type Finding = {
  kind: CheckKind;
  /** The rule that produced the row, e.g. `status-moved`, `notice-newer-than-record`. Stable, so a consumer can route on it. */
  type: string;
  severity: Severity;
  /** The record the row is about. Empty when the source names something OnCo does not hold. */
  recordId?: string;
  recordKind?: string;
  onco: string;
  source: string;
  url: string;
  /** The source's own date for what it says (YYYY-MM-DD where the source gives a day). */
  date?: string;
  note?: string;
};

export type Blocked = { url: string; reason: string };

export type CheckResult = {
  kind: CheckKind;
  label: string;
  /** How many things were compared (trials, drugs, labels, URLs). */
  checked: number;
  findings: Finding[];
  /** Updates this checker made by itself, in plain words. Empty for a checker that only reports. */
  mechanical: string[];
  /** Sources that refused the request. Never worked round. */
  blocked: Blocked[];
  /** Things that went wrong and left part of the check undone. */
  errors: string[];
  notes: string[];
  requests: number;
  durationMs: number;
};

export const emptyResult = (kind: CheckKind, label: string): CheckResult => ({ kind, label, checked: 0, findings: [], mechanical: [], blocked: [], errors: [], notes: [], requests: 0, durationMs: 0 });

export const USER_AGENT = "OnCo weekly re-check (+https://github.com/judegomila/OnCo)";

export const hostOf = (u: string): string => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };

/**
 * Is this answer a refusal rather than an answer? A refusal is reported as blocked and is never evidence that a page
 * is gone: accessdata.fda.gov, for one, redirects a script to an "abuse detection" page and serves it with a 404.
 */
export function refusal(r: { status: number; finalUrl?: string; headers?: { get(name: string): string | null }; body?: string }): string | undefined {
  if (r.finalUrl && /\/apology_objects\/|abuse-detection|distil_r_captcha|\/cdn-cgi\/challenge|\/captcha\b|validate\.perfdrive|^https?:\/\/unblock\./i.test(r.finalUrl)) return "bot-challenge page";
  if (r.headers?.get("cf-mitigated")) return "bot challenge (cf-mitigated)";
  if (r.status === 401 || r.status === 403) return `refused (${r.status})`;
  if (r.status === 429) return "rate limited (429)";
  if (r.status === 202 && r.headers?.get("x-amzn-waf-action")) return "bot challenge (WAF)";
  if (r.body && /abuse detection|<title>\s*Just a moment|Attention Required!|Pardon Our Interruption|captcha-delivery|Request unsuccessful\. Incapsula/i.test(r.body.slice(0, 4000))) return "bot-challenge page";
  return undefined;
}

export type NetOptions = { /** Keep every answer in this directory, and with `replay` read from it instead of the network. For re-running a comparison on a reading already taken, without asking the sources again. */ recordDir?: string; replay?: boolean; userAgent?: string; perHostDelayMs?: number; timeoutMs?: number; fetchImpl?: typeof fetch; sleep?: (ms: number) => Promise<void>; now?: () => number };
export type RequestOptions = { method?: "GET" | "HEAD"; accept?: string; redirect?: "follow" | "manual"; body?: "text" | "buffer" | "none" };
export type Fetched = { status: number; ok: boolean; finalUrl?: string; headers: Headers; text?: string; buffer?: Buffer; blocked?: string; error?: string };

/** The network, counted and slowed. One per checker, so each checker's request count is its own. */
export class Net {
  requests = 0;
  readonly byHost = new Map<string, number>();
  readonly blocked: Blocked[] = [];
  private readonly tails = new Map<string, Promise<void>>();
  private readonly last = new Map<string, number>();
  private readonly ua: string;
  private readonly delay: number;
  private readonly timeout: number;
  private readonly fetchImpl: typeof fetch;
  private readonly sleep: (ms: number) => Promise<void>;
  private readonly now: () => number;
  private readonly recordDir?: string;
  private readonly replay: boolean;

  constructor(o: NetOptions = {}) {
    this.ua = o.userAgent ?? USER_AGENT;
    this.delay = o.perHostDelayMs ?? 1000;
    this.timeout = o.timeoutMs ?? 30_000;
    this.fetchImpl = o.fetchImpl ?? fetch;
    this.sleep = o.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms)));
    this.now = o.now ?? Date.now;
    this.recordDir = o.recordDir;
    this.replay = !!o.replay && !!o.recordDir;
    if (this.recordDir && !this.replay) mkdirSync(this.recordDir, { recursive: true });
  }

  /** Wait for this host's turn: requests to one host never overlap and are `perHostDelayMs` apart. */
  private async turn(host: string): Promise<() => void> {
    const prev = this.tails.get(host) ?? Promise.resolve();
    let release!: () => void;
    const mine = new Promise<void>((r) => { release = r; });
    this.tails.set(host, prev.then(() => mine));
    await prev;
    const wait = (this.last.get(host) ?? -Infinity) + this.delay - this.now();
    if (wait > 0) await this.sleep(wait);
    return () => { this.last.set(host, this.now()); release(); };
  }

  /** One request. Never throws: a network failure comes back as status 0 with `error`. */
  async request(url: string, init: RequestOptions = {}): Promise<Fetched> {
    const host = hostOf(url);
    const want = init.method === "HEAD" ? "none" : init.body ?? "text";
    const tape = this.recordDir ? join(this.recordDir, `${createHash("sha256").update(`${init.method ?? "GET"} ${init.redirect ?? "follow"} ${want} ${url}`).digest("hex").slice(0, 32)}.json`) : undefined;
    if (this.replay) {
      this.requests++;
      this.byHost.set(host, (this.byHost.get(host) ?? 0) + 1);
      if (!tape || !existsSync(tape)) return { status: 0, ok: false, headers: new Headers(), error: "not in the recorded reading" };
      const t = JSON.parse(readFileSync(tape, "utf8")) as { status: number; ok: boolean; finalUrl?: string; headers: Record<string, string>; text?: string; buffer?: string; blocked?: string; error?: string };
      return { status: t.status, ok: t.ok, finalUrl: t.finalUrl, headers: new Headers(t.headers), text: t.text, buffer: t.buffer ? Buffer.from(t.buffer, "base64") : undefined, blocked: t.blocked, error: t.error };
    }
    const done = await this.turn(host);
    this.requests++;
    this.byHost.set(host, (this.byHost.get(host) ?? 0) + 1);
    const keep = (out: Fetched): Fetched => {
      if (tape) writeFileSync(tape, JSON.stringify({ url, status: out.status, ok: out.ok, finalUrl: out.finalUrl, headers: Object.fromEntries(["content-type", "etag", "last-modified", "cf-mitigated", "x-amzn-waf-action"].flatMap((h) => (out.headers.get(h) ? [[h, out.headers.get(h)!]] : []))), text: out.text, buffer: out.buffer?.toString("base64"), blocked: out.blocked, error: out.error }));
      return out;
    };
    try {
      const r = await this.fetchImpl(url, { method: init.method ?? "GET", redirect: init.redirect ?? "follow", headers: { "User-Agent": this.ua, Accept: init.accept ?? "*/*" }, signal: AbortSignal.timeout(this.timeout) });
      const finalUrl = r.url && r.url !== url ? r.url : undefined;
      const out: Fetched = { status: r.status, ok: r.status >= 200 && r.status < 300, finalUrl, headers: r.headers };
      if (want === "buffer") out.buffer = Buffer.from(await r.arrayBuffer());
      else if (want === "text") out.text = await r.text();
      else await r.body?.cancel().catch(() => undefined);
      out.blocked = refusal({ status: r.status, finalUrl, headers: r.headers, body: out.text });
      if (out.blocked) out.ok = false;
      return keep(out);
    } catch (e) {
      return keep({ status: 0, ok: false, headers: new Headers(), error: String(e instanceof Error ? e.message : e).slice(0, 160) });
    } finally { done(); }
  }

  /** Record that a source refused, once per address. The caller decides: a HEAD refused and a GET answered is not a refusal. */
  noteBlocked(url: string, reason: string): void { if (!this.blocked.some((b) => b.url === url)) this.blocked.push({ url, reason }); }

  /** GET with a few patient retries on 5xx and network failure. A refusal is returned at once, not retried. */
  async get(url: string, init: RequestOptions & { tries?: number } = {}): Promise<Fetched> {
    const tries = init.tries ?? 3;
    let r = await this.request(url, init);
    for (let i = 1; i < tries && !r.blocked && (r.status === 0 || r.status >= 500); i++) { await this.sleep(2000 * i); r = await this.request(url, init); }
    return r;
  }
}

/** Run `fn` over `items`, at most `concurrency` at a time. Order of results follows order of items. */
export async function pooled<T, R>(items: T[], concurrency: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const out = new Array<R>(items.length);
  let next = 0;
  const worker = async () => { while (next < items.length) { const i = next++; out[i] = await fn(items[i], i); } };
  await Promise.all(Array.from({ length: Math.max(1, Math.min(concurrency, items.length)) }, worker));
  return out;
}

const SEVERITY_ORDER: Record<Severity, number> = { high: 0, medium: 1, low: 2 };
/** Most serious first, then the newest source date, then by record, so two runs over the same facts give the same file. */
export function sortFindings(f: Finding[]): Finding[] {
  return [...f].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] || a.type.localeCompare(b.type) || (b.date ?? "").localeCompare(a.date ?? "") || (a.recordId ?? "").localeCompare(b.recordId ?? "") || a.url.localeCompare(b.url) || a.source.localeCompare(b.source));
}

/** A 32-bit FNV-1a hash: the same string lands in the same weekly slice on every machine, with no dependency. */
export function stableHash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h >>> 0;
}

/** Whole weeks since Monday 5 January 1970 (UTC), so a slice number moves on once a week whatever day the run falls on. */
export function weekNumber(isoDate: string): number {
  return Math.floor((Date.parse(`${isoDate}T00:00:00Z`) / 86_400_000 - 4) / 7);
}
