/**
 * Decide, for each EMA register candidate, whether the bot may write the EU row itself or a person must look.
 *
 * Rules (each one deterministic, each failure named so the review PR says why):
 *   1. The status comes from the register page (data-medicine-status and its dated fields), never from the snapshot
 *      diff. No page, or no status field, is residue.
 *   2. Attribution is exact only: the page's INN, active substance or medicine name equals a corpus product's name,
 *      brand or alias (case-insensitive, whole string). None or several matches is residue, with the candidates.
 *   3. Biosimilar and generic medicines never become an approval row: the originator holds the authorisation, so the
 *      residue proposes a product record instead.
 *   4. Only statuses with a helper are written: Authorised -> A() or C(), Withdrawn -> W(year of withdrawal),
 *      Application withdrawn -> W(undefined), Refused or a negative CHMP opinion -> R(). Revoked, expired, suspended
 *      and pending opinions are residue.
 *   5. The row is compared with the file on the current tree, not the snapshot: an existing EU row of the same class
 *      and year is dropped as already on main; a different class or year is residue (a hand-written row would change).
 *
 * The auto rows carry the page's status line verbatim ("Authorised: This medicine is authorised for use in the
 * European Union") in the note, so a later check can re-read the page and compare.
 */
import type { RegionalCandidate } from "../fetch-ema";
import type { RegionalRow, RegionalStatus } from "../../src/data/regional-approvals";
import { type EparPage, fetchEparPage, quotedStatus } from "./ema-page";
import { sourceExpr, tsString } from "./regional-approvals-io";

export type DrugLike = { id: string; name: string; brand?: string; aka: string[]; modality?: string };
export type AutoRow = {
  drugId: string; product: string; inn?: string; region: "EU"; status: RegionalStatus; year?: number;
  /** `expr` is the EU entry (added to a product's existing row); `body` is the whole row when the product has none. */
  key: string; expr: string; body: string; sourceUrl: string; pageStatus: string; quotedStatus: string; checkedOn: string;
};
export type Residue = {
  candidate: RegionalCandidate; kind: "regional-row" | "regional-status" | "new-product"; drugId?: string; reason: string;
  page?: Pick<EparPage, "status" | "statusTitle" | "statusMessage" | "inn" | "name" | "issued" | "withdrawn" | "revoked" | "opinionAdopted" | "opinionStatus" | "biosimilar" | "generic">;
  matches?: string[]; proposed?: string;
};
export type Dropped = { drugId: string; product: string; sourceUrl?: string; reason: string };
export type Decision = { auto: AutoRow[]; residue: Residue[]; dropped: Dropped[] };
export type DecideContext = { drugs: DrugLike[]; rows: Record<string, RegionalRow>; today: string; fetch?: (url: string) => Promise<EparPage | null> };

export const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();

/** Exact-name index: normalised name, brand(s) and aliases -> product ids. Combination regimens are not register medicines. */
export class ExactIndex {
  private map = new Map<string, Set<string>>();
  constructor(drugs: DrugLike[]) {
    for (const d of drugs) {
      if (/regimen/i.test(d.modality ?? "")) continue;
      const terms = [d.name, ...(d.brand ? d.brand.split(/\s*\/\s*/) : []), ...d.aka];
      for (const t of terms) { const k = norm(t); if (!k) continue; this.map.set(k, (this.map.get(k) ?? new Set()).add(d.id)); }
    }
  }
  /** Ids matched by any of the terms as a whole string. */
  match(terms: Array<string | undefined>): string[] {
    const out = new Set<string>();
    for (const t of terms) if (t) for (const id of this.map.get(norm(t)) ?? []) out.add(id);
    return [...out].sort();
  }
}

const classOf = (s: RegionalStatus): "authorised" | "withdrawn" | "refused" | "other" => (s === "approved" || s === "conditional" ? "authorised" : s === "withdrawn" ? "withdrawn" : s === "rejected" ? "refused" : "other");
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const longDate = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
const firstSentence = (s?: string) => { if (!s) return undefined; const t = s.replace(/\s+/g, " ").trim(); const cut = t.match(/^.{20,}?[.;](?=\s|$)/)?.[0] ?? t; return cut.length > 160 ? `${cut.slice(0, 157).trimEnd()}...` : cut; };
const pageSummary = (p: EparPage): Residue["page"] => ({ status: p.status, statusTitle: p.statusTitle, statusMessage: p.statusMessage, inn: p.inn, name: p.name, issued: p.issued, withdrawn: p.withdrawn, revoked: p.revoked, opinionAdopted: p.opinionAdopted, opinionStatus: p.opinionStatus, biosimilar: p.biosimilar, generic: p.generic });

type Verdict = { status: RegionalStatus; year?: number; expr: string; body: string } | { reason: string };
/** A decided entry: `expr` is the EU value (added to an existing row), `body` the whole row for a product without one. */
const ok = (status: RegionalStatus, year: number | undefined, expr: string): Verdict => ({ status, year, expr, body: `{ EU: ${expr} }` });

/** The class a page's status maps to, when it has a helper; undefined for Revoked, Expired, Lapsed, Suspended and pending opinions. */
export function classOfPage(p: EparPage): "authorised" | "withdrawn" | "refused" | undefined {
  if (!p.status) return undefined;
  if (p.status === "authorised") return "authorised";
  if (p.status === "withdrawn" || p.status.startsWith("withdrawn-application")) return "withdrawn";
  if (p.status === "refused" || (p.status === "opinion" && /^negative/i.test(p.opinionStatus ?? ""))) return "refused";
  return undefined;
}
/** The year the row would carry for the page's status (issue, withdrawal or opinion year); undefined when the page has no such date. */
export function pageYearOf(p: EparPage): number | undefined {
  const cls = classOfPage(p);
  const iso = cls === "authorised" ? p.issued : cls === "withdrawn" ? (p.status === "withdrawn" ? p.withdrawn : undefined) : cls === "refused" ? (p.refusalDate ?? p.opinionAdopted) : undefined;
  return iso ? Number(iso.slice(0, 4)) : undefined;
}

/** The row for a page, or the reason none can be written. C() needs both the page's conditional marker and the register snapshot's current "(conditional)" flag, because the marker also stays on medicines later converted to a full authorisation. */
export function rowForPage(p: EparPage, c: RegionalCandidate, today: string): Verdict {
  const q = quotedStatus(p);
  if (!p.status || !q) return { reason: "the register page has no status field" };
  const src = sourceExpr(p.url);
  const checked = `checked ${today}`;
  const brand = p.name ?? c.product;
  // The register writes application withdrawals as "withdrawn-application" or, after a CHMP opinion,
  // "withdrawn-application-after-chmp-opinion-" (sic); both show the title "Application withdrawn".
  const status = p.status.startsWith("withdrawn-application") ? "withdrawn-application" : p.status;
  switch (status) {
    case "authorised": {
      if (!p.issued) return { reason: `status ${p.statusTitle} but the page has no "Marketing authorisation issued" date` };
      const conditional = p.conditional && /conditional/i.test(c.register);
      const note = `EMA register: "${q}"; marketing authorisation issued ${longDate(p.issued)}${p.conditional ? "; received a conditional marketing authorisation" : ""}; ${checked}`;
      const helper = conditional ? "C" : "A";
      const indication = firstSentence(c.indication);
      return ok(conditional ? "conditional" : "approved", Number(p.issued.slice(0, 4)), `V(${helper}(${p.issued.slice(0, 4)}, ${src}, ${indication ? tsString(indication) : "undefined"}, ${tsString(note)}))`);
    }
    case "withdrawn": {
      if (!p.withdrawn) return { reason: `status ${p.statusTitle} but the page has no "Withdrawal of marketing authorisation" date` };
      const note = `${brand}: ${p.issued ? `authorised ${longDate(p.issued)}; ` : ""}marketing authorisation withdrawn ${longDate(p.withdrawn)}. EMA register: "${q}"; ${checked}`;
      return ok("withdrawn", Number(p.withdrawn.slice(0, 4)), `W(${p.withdrawn.slice(0, 4)}, ${src}, ${tsString(note)})`);
    }
    case "withdrawn-application": {
      const who = p.applicant ?? p.holder;
      const when = /after-chmp-opinion/.test(p.status) ? "after a CHMP opinion" : "before a Commission decision";
      const note = `${brand}${who ? ` (${who})` : ""}: marketing authorisation application withdrawn ${when}. EMA register: "${q}"; ${checked}`;
      return ok("withdrawn", undefined, `W(undefined, ${src}, ${tsString(note)})`);
    }
    case "refused":
    case "opinion": {
      const negative = p.status === "refused" || /^negative/i.test(p.opinionStatus ?? "");
      if (!negative) return { reason: `CHMP opinion${p.opinionStatus ? ` (${p.opinionStatus})` : ""} without a Commission decision yet; the row would change again within weeks` };
      const date = p.refusalDate ?? p.opinionAdopted;
      if (!date) return { reason: `status ${p.statusTitle} (${p.opinionStatus ?? "negative"}) but the page carries no opinion or refusal date` };
      const who = p.applicant ?? p.holder;
      const note = `${p.status === "refused" ? "Marketing authorisation refused" : "CHMP negative opinion"} ${longDate(date)} on ${brand}${who ? ` (${who})` : ""}. EMA register: "${q}"${p.opinionStatus ? `, opinion status ${p.opinionStatus}` : ""}; ${checked}`;
      return ok("rejected", Number(date.slice(0, 4)), `R(${date.slice(0, 4)}, ${tsString(note)}, ${src})`);
    }
    default:
      return { reason: `register status "${p.statusTitle}" has no helper in regional-approvals.ts (a person picks withdrawn or a note)` };
  }
}

/** Decide one candidate against one page (null when the page could not be fetched). */
export function decideCandidate(c: RegionalCandidate, page: EparPage | null, index: ExactIndex, ctx: Pick<DecideContext, "rows" | "today">, takenThisRun: Set<string>): { auto?: AutoRow; residue?: Residue; dropped?: Dropped } {
  if (!c.url) return { residue: { candidate: c, kind: c.drugId ? "regional-row" : "new-product", drugId: c.drugId, reason: "the register snapshot carries no medicine URL to read the status from" } };
  if (!page) return { residue: { candidate: c, kind: c.drugId ? "regional-row" : "new-product", drugId: c.drugId, reason: "the register page could not be fetched in this run" } };
  const summary = pageSummary(page);
  if (!page.status) return { residue: { candidate: c, kind: c.drugId ? "regional-row" : "new-product", drugId: c.drugId, reason: "the register page has no status field", page: summary } };
  const matches = index.match([page.inn, page.activeSubstance, page.name]);
  const named = [page.inn, page.activeSubstance, page.name].filter(Boolean).join(" / ");
  if (matches.length === 0) {
    const bio = page.biosimilar || page.generic;
    return { residue: { candidate: c, kind: "new-product", drugId: undefined, matches: c.drugId ? [c.drugId] : [], page: summary, reason: `no corpus product is named exactly ${named}${c.drugId ? ` (the snapshot's nearest name was ${c.drugId}, a partial match)` : ""}${bio ? "; a biosimilar or generic medicine, so the originator is what would be missing" : ""}` } };
  }
  if (matches.length > 1) return { residue: { candidate: c, kind: "regional-row", drugId: c.drugId, matches, page: summary, reason: `${named} names ${matches.length} corpus products exactly (${matches.join(", ")})` } };
  const drugId = matches[0];
  if (page.biosimilar || page.generic) {
    const existing = ctx.rows[drugId]?.EU;
    return { residue: { candidate: c, kind: "new-product", drugId, page: summary, reason: `${page.name} is a ${page.biosimilar ? "biosimilar" : "generic"} of ${page.inn ?? drugId}; ${existing ? `the EU row for ${drugId} already stands (${existing.status}${existing.year ? ` ${existing.year}` : ""}), so this is an additional product, not a missing approval` : `${drugId} has no EU row and a ${page.biosimilar ? "biosimilar" : "generic"} page cannot stand for the originator's authorisation`}` } };
  }
  const existing = ctx.rows[drugId]?.EU;
  const recorded = existing ? `the recorded EU row says ${existing.status}${existing.year ? ` (${existing.year})` : ""}` : "";
  if (existing) {
    // A hand-written row exists: the bot never rewrites it. Same class as the page (and no year contradiction) is
    // already on main; anything else is residue for a person.
    const pageClass = classOfPage(page);
    if (!pageClass) return { residue: { candidate: c, kind: "regional-status", drugId, page: summary, reason: `register status "${page.statusTitle}" has no helper in regional-approvals.ts; ${recorded}` } };
    if (pageClass !== classOf(existing.status)) return { residue: { candidate: c, kind: "regional-status", drugId, page: summary, reason: `${recorded} but the register page says "${quotedStatus(page)}"; changing a hand-written row` } };
    const pageYear = pageYearOf(page);
    if (existing.year !== undefined && pageYear !== undefined && Math.abs(existing.year - pageYear) > 1) return { residue: { candidate: c, kind: "regional-status", drugId, page: summary, reason: `the recorded EU year ${existing.year} disagrees with the register page's ${pageYear} (${existing.status}); changing a hand-written row` } };
    return { dropped: { drugId, product: page.name ?? c.product, sourceUrl: page.url, reason: `already on main: EU ${existing.status}${existing.year ? ` ${existing.year}` : ""}` } };
  }
  const verdict = rowForPage(page, c, ctx.today);
  if ("reason" in verdict) return { residue: { candidate: c, kind: "regional-row", drugId, page: summary, reason: verdict.reason } };
  if (takenThisRun.has(drugId)) return { residue: { candidate: c, kind: "regional-row", drugId, page: summary, proposed: verdict.body, reason: `another register medicine already produced the EU row for ${drugId} in this run` } };
  takenThisRun.add(drugId);
  return { auto: { drugId, product: page.name ?? c.product, inn: page.inn, region: "EU", status: verdict.status, year: verdict.year, key: drugId, expr: verdict.expr, body: verdict.body, sourceUrl: page.url, pageStatus: page.status, quotedStatus: quotedStatus(page)!, checkedOn: ctx.today } };
}

/** Decide every candidate, reading each register page once (cache in scripts/lib/ema-page.ts). */
export async function decideEmaCandidates(candidates: RegionalCandidate[], ctx: DecideContext): Promise<Decision> {
  const index = new ExactIndex(ctx.drugs);
  const fetch = ctx.fetch ?? ((url: string) => fetchEparPage(url));
  const out: Decision = { auto: [], residue: [], dropped: [] };
  const taken = new Set<string>();
  const pages = new Map<string, EparPage | null>();
  for (const c of candidates) {
    let page: EparPage | null = null;
    if (c.url) { if (!pages.has(c.url)) pages.set(c.url, await fetch(c.url)); page = pages.get(c.url) ?? null; }
    const d = decideCandidate(c, page, index, ctx, taken);
    if (d.auto) out.auto.push(d.auto);
    if (d.residue) out.residue.push(d.residue);
    if (d.dropped) out.dropped.push(d.dropped);
  }
  return out;
}
