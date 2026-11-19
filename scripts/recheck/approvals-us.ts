/**
 * Weekly re-check, part 2: United States approvals. Report only; nothing here changes a record.
 *
 * Three questions, each answered from a list the FDA publishes:
 *   1. Has the FDA published an approval notice for a drug OnCo holds that is newer than the newest US approval on
 *      the record? Read from the Oncology Center of Excellence notices page with the parser
 *      scripts/fetch-universe-regulatory.ts already uses (parseOceRows, dedupeOce).
 *   2. Does a fresh reading of the FDA's four accelerated-approval tables differ from
 *      src/data/accelerated-approvals.ts? An indication the file shows as open that the agency now lists as
 *      withdrawn is the serious case. Read with the parser of scripts/fetch-accelerated.ts (parseAcceleratedTable).
 *   3. Has a decision date passed with no outcome recorded? A `pdufa` event, or a filing whose note names a decision
 *      date, that is now in the past with no later approval, refusal or withdrawal on the record. Dates are
 *      normalised with eventDate from scripts/audit.ts, the same reading the audit check
 *      `asof-before-regulatory-event` uses.
 */
import type { AcceleratedRow, AcceleratedTableId } from "../../src/lib/accelerated";
import { eventDate } from "../audit";
import { parseLongDate } from "../feed-utils";
import { ACCELERATED_BASE, ACCELERATED_SOURCES, parseAcceleratedTable } from "../fetch-accelerated";
import { FDA_OCE_LIVE, type OceApproval, dedupeOce, parseOceRows } from "../fetch-universe-regulatory";
import type { Blocked, Finding, Net } from "./lib";

export type RegEvent = { date: string; type: string; region: string; note: string };
export type DrugView = {
  id: string; name: string; aka: string[]; brand?: string; asOf: string;
  approvals: Array<{ region: string; year: number }>;
  events: RegEvent[];
  /** The whole record as JSON text, searched for a notice's address or date. */
  haystack: string;
};

// ---------------------------------------------------------------------------------------------------------------------
// 1. Notices newer than the record
// ---------------------------------------------------------------------------------------------------------------------
/** A name as a key: lower case, no biologic prefix or suffix ("fam-trastuzumab deruxtecan-nxki"), no dose form, punctuation as spaces. */
export const nameKey = (s: string): string => s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/^fam-/, "").replace(/-[a-z]{4}\b/g, "").replace(/\b(tablets?|capsules?|injection|for injection)\b/g, "").replace(/[^a-z0-9]+/g, " ").trim();

/** Every name a drug answers to, mapped to the ids that use it. A record's own name wins over an alias or a brand. */
export function drugIndex(drugs: DrugView[]): Map<string, string[]> {
  const byName = new Map<string, string[]>(), byAlias = new Map<string, string[]>();
  const add = (m: Map<string, string[]>, k: string, id: string) => { if (k.length >= 3 && !(m.get(k) ?? []).includes(id)) m.set(k, [...(m.get(k) ?? []), id]); };
  for (const d of drugs) {
    add(byName, nameKey(d.name), d.id);
    for (const a of d.aka) add(byAlias, nameKey(a), d.id);
    for (const b of (d.brand ?? "").split(/\s*[/;,]\s*|\s+and\s+/)) add(byAlias, nameKey(b.replace(/\(.*?\)/g, "")), d.id);
  }
  for (const [k, ids] of byAlias) if (!byName.has(k)) byName.set(k, ids);
  return byName;
}

const isUs = (region: string) => /^(us|usa|fda|united states)\b/i.test(region.trim());
const APPROVAL_EVENTS = new Set(["approval", "accelerated-approval", "conversion", "label-change"]);
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "2026-11-17" as the house style writes it, "17 November 2026", and as the FDA does, "November 17, 2026". */
export function writtenDates(iso: string): string[] {
  const [y, m, d] = iso.split("-").map(Number);
  return [iso, `${d} ${MONTHS[m - 1]} ${y}`, `${MONTHS[m - 1]} ${d}, ${y}`];
}

/** Does the record already hold this notice: its address, an event on its day, or its date written out? */
export function holdsNotice(d: DrugView, n: { date: string; url: string }): boolean {
  const slug = n.url.replace(/[?#].*$/, "").replace(/\/$/, "").split("/").pop() ?? "";
  if (slug.length >= 12 && d.haystack.includes(slug)) return true;
  if (d.events.some((e) => isUs(e.region) && e.date === n.date)) return true;
  return writtenDates(n.date).some((w) => d.haystack.includes(w));
}

/** The newest US approval the record holds: the latest dated approval event, and the latest year in `approvals`. */
export function newestUsApproval(d: DrugView): { dated?: string; year?: number } {
  const dated = d.events.filter((e) => isUs(e.region) && APPROVAL_EVENTS.has(e.type)).map((e) => eventDate(e.date)).filter((x): x is string => !!x).sort().pop();
  const years = d.approvals.filter((a) => isUs(a.region)).map((a) => a.year);
  return { dated, year: years.length ? Math.max(...years) : undefined };
}

export function noticesNewerThanRecord(notices: OceApproval[], drugs: DrugView[], today: string): Finding[] {
  const index = drugIndex(drugs);
  const byId = new Map(drugs.map((d) => [d.id, d]));
  const out: Finding[] = [];
  const recent = new Date(Date.parse(`${today}T00:00:00Z`) - 180 * 86_400_000).toISOString().slice(0, 10);
  for (const n of notices) {
    let matchedAny = false;
    n.drugs.forEach((nd, position) => {
      const ids = index.get(nameKey(nd.generic)) ?? (nd.brand ? index.get(nameKey(nd.brand)) : undefined) ?? [];
      for (const id of ids) {
        matchedAny = true;
        const d = byId.get(id)!;
        if (holdsNotice(d, n)) continue;
        const newest = newestUsApproval(d);
        const year = Number(n.date.slice(0, 4));
        if (newest.dated && n.date <= newest.dated) continue;
        if (newest.year && year < newest.year) continue;
        // A year row with no dated event in that year may be this very approval: say so rather than assert a gap.
        const ambiguous = newest.year === year && newest.dated?.slice(0, 4) !== String(year);
        const held = newest.dated ? `newest US approval event ${newest.dated}` : newest.year ? `newest US approval row ${newest.year}, with no dated event` : "no US approval recorded";
        out.push({
          kind: "us-approvals", type: "notice-newer-than-record", severity: position > 0 ? "low" : ambiguous ? "medium" : "high", recordId: id, recordKind: "drug",
          onco: `${held}; last checked ${d.asOf}`, source: n.title, url: n.url, date: n.date,
          note: position > 0 ? "Named in the notice beside the drug it is about; may be a combination partner only." : ambiguous ? `The record has a US approval row for ${year} with no date; check whether it is this one.` : undefined,
        });
      }
    });
    if (!matchedAny && n.date >= recent) out.push({ kind: "us-approvals", type: "notice-drug-not-held", severity: "medium", onco: n.drugs.length ? `no record answers to ${n.drugs.map((x) => x.generic).join(", ")}` : "no drug name could be read from the notice", source: n.title, url: n.url, date: n.date });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// 2. Accelerated approvals: a fresh reading against the generated file
// ---------------------------------------------------------------------------------------------------------------------
type FreshRow = Omit<AcceleratedRow, "drugId">;
const rowKey = (r: { drugName: string; granted: string; indication: string }) => `${r.drugName.toLowerCase()}|${r.granted}|${r.indication.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()}`;
const looseKey = (r: { drugName: string; granted: string }) => `${r.drugName.toLowerCase()}|${r.granted}`;
const tableUrl = (id: AcceleratedTableId) => `${ACCELERATED_BASE}/${ACCELERATED_SOURCES.find((s) => s.id === id)!.slug}`;
const outcomeWords = (r: { outcome: string; outcomeDate?: string }) => (r.outcome === "open" ? "accelerated approval still open" : `${r.outcome === "converted" ? "converted to traditional approval" : "withdrawn"}${r.outcomeDate ? ` on ${r.outcomeDate}` : ""}`);

/**
 * `held` is every row of src/data/accelerated-approvals.ts; `fresh` is today's reading of the same tables. A row is
 * the same row when the drug cell, grant date and indication agree, or, where the agency has reworded the indication,
 * when the drug cell and grant date pick out exactly one row on each side.
 */
export function acceleratedDrift(fresh: FreshRow[], held: AcceleratedRow[]): Finding[] {
  const out: Finding[] = [];
  const exact = new Map(held.map((h) => [rowKey(h), h]));
  const count = (rows: Array<{ drugName: string; granted: string }>) => { const m = new Map<string, number>(); for (const r of rows) m.set(looseKey(r), (m.get(looseKey(r)) ?? 0) + 1); return m; };
  const heldLoose = count(held), freshLoose = count(fresh);
  const matched = new Set<AcceleratedRow>();
  for (const f of fresh) {
    const h = exact.get(rowKey(f)) ?? (heldLoose.get(looseKey(f)) === 1 && freshLoose.get(looseKey(f)) === 1 ? held.find((x) => looseKey(x) === looseKey(f)) : undefined);
    const base = { kind: "us-approvals" as const, recordKind: "drug", url: tableUrl(f.table), date: f.outcomeDate ?? f.granted };
    const what = `${f.drugName}: ${f.indication}`;
    if (!h) {
      out.push({ ...base, type: f.outcome === "withdrawn" ? "indication-withdrawn" : "accelerated-row-new", severity: f.outcome === "withdrawn" ? "high" : "medium", onco: "not in src/data/accelerated-approvals.ts", source: `${what} (granted ${f.granted}; ${outcomeWords(f)})` });
      continue;
    }
    matched.add(h);
    if (h.outcome === f.outcome && h.outcomeDate === f.outcomeDate) continue;
    const type = f.outcome === "withdrawn" ? "indication-withdrawn" : f.outcome === "converted" ? "accelerated-converted" : "accelerated-outcome-changed";
    out.push({ ...base, type, severity: f.outcome === "withdrawn" ? "high" : "medium", recordId: h.drugId, onco: `${outcomeWords(h)} (granted ${h.granted})`, source: `${what}: ${outcomeWords(f)}`, note: "Regenerate with scripts/fetch-accelerated.ts --apply, then read the product's text and approvals rows against the change." });
  }
  for (const h of held) if (!matched.has(h)) out.push({ kind: "us-approvals", type: "accelerated-row-gone", severity: "low", recordId: h.drugId, recordKind: "drug", onco: `${h.drugName}: ${h.indication} (granted ${h.granted}; ${outcomeWords(h)})`, source: "no longer in the FDA's tables, or reworded", url: tableUrl(h.table), date: h.outcomeDate ?? h.granted });
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// 3. Decision dates that have passed
// ---------------------------------------------------------------------------------------------------------------------
const DECISION_PHRASE = /\b(PDUFA|target action date|action date|goal date|decision date|decision (?:is )?(?:expected|due))\b/i;
const LONG_DATE = /(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})|(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}/gi;
/** Events that settle a pending decision. A designation or a committee meeting does not. */
const SETTLES = new Set(["approval", "accelerated-approval", "conversion", "crl", "withdrawal", "label-change", "filing"]);

/** A decision date a note states after a phrase such as "PDUFA" or "decision date": "… decision date 30 November 2026" -> 2026-11-30. */
export function decisionDateInNote(note: string): string | undefined {
  const phrase = DECISION_PHRASE.exec(note);
  if (!phrase) return undefined;
  const after = note.slice(phrase.index, phrase.index + 90);
  for (const m of after.matchAll(LONG_DATE)) {
    if (m[1]) return `${m[3]}-${String(MONTHS.findIndex((x) => x.toLowerCase() === m[2].toLowerCase()) + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
    const us = parseLongDate(m[0]);
    if (us) return us;
  }
  return undefined;
}

export function overdueDecisions(drugs: DrugView[], today: string): Finding[] {
  const out: Finding[] = [];
  for (const d of drugs) {
    const dated = d.events.map((e) => ({ e, at: eventDate(e.date) })).filter((x): x is { e: RegEvent; at: string } => !!x.at);
    const pending: Array<{ e: RegEvent; due: string; from: string }> = [];
    for (const { e, at } of dated) {
      if (e.type === "pdufa") pending.push({ e, due: at, from: at });
      else if (e.type === "filing") { const due = decisionDateInNote(e.note); if (due && due > at) pending.push({ e, due, from: at }); }
    }
    for (const p of pending) {
      if (p.due >= today) continue;
      // Settled by anything recorded after the pending event itself that is an outcome: an approval, a refusal, a new filing.
      if (dated.some((x) => x.e !== p.e && SETTLES.has(x.e.type) && x.at > p.from && (x.e.type !== "filing" || x.at >= p.due))) continue;
      out.push({ kind: "us-approvals", type: "decision-date-passed", severity: "high", recordId: d.id, recordKind: "drug", onco: `${p.e.type} event (${p.e.region}) dated ${p.e.date}: ${p.e.note.slice(0, 160)}; no later outcome recorded; last checked ${d.asOf}`, source: `the decision date ${p.due} has passed`, url: FDA_OCE_LIVE, date: p.due, note: "Look for the approval notice or a complete response letter and record the outcome." });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------------------------------
// Network
// ---------------------------------------------------------------------------------------------------------------------
export async function readNotices(net: Net): Promise<{ notices: OceApproval[]; blocked?: Blocked; error?: string }> {
  const r = await net.get(FDA_OCE_LIVE, { accept: "text/html" });
  if (r.blocked) return { notices: [], blocked: { url: FDA_OCE_LIVE, reason: r.blocked } };
  if (!r.ok || !r.text) return { notices: [], error: `FDA notices page answered ${r.status}${r.error ? ` (${r.error})` : ""}` };
  const notices = dedupeOce(parseOceRows(r.text, "live"));
  return notices.length ? { notices } : { notices, error: "FDA notices page parsed to zero rows; its layout may have changed" };
}

export async function readAcceleratedTables(net: Net): Promise<{ rows: FreshRow[]; complete: boolean; blocked: Blocked[]; errors: string[] }> {
  const rows: FreshRow[] = [], blocked: Blocked[] = [], errors: string[] = [];
  for (const src of ACCELERATED_SOURCES) {
    const url = `${ACCELERATED_BASE}/${src.slug}`;
    const r = await net.get(url, { accept: "text/html" });
    if (r.blocked) { blocked.push({ url, reason: r.blocked }); continue; }
    if (!r.ok || !r.text) { errors.push(`${src.id} table answered ${r.status}${r.error ? ` (${r.error})` : ""}`); continue; }
    const parsed = parseAcceleratedTable(src.id, r.text);
    if (!parsed.rows.length) { errors.push(`${src.id} table parsed to zero rows`); continue; }
    rows.push(...parsed.rows);
  }
  return { rows, complete: !blocked.length && !errors.length, blocked, errors };
}
