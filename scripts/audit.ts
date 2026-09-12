/**
 * Staleness and contradiction audit. Pure function of the corpus (no network).
 * Writes public/audit.json, rendered at /audit/.
 *
 * Checks, in three families:
 *  - contradictions: status versus approvals and regional approvals, positive trials with a primary
 *    hazard ratio at or above 1, asOf older than the latest dated regulatory event, spike duplicates
 *    whose scalar fields diverge, standard-of-care and roadmap rows citing withdrawn items, future years;
 *  - sourcing: records without any external source, numbers without a source (scripts/numbers.ts);
 *  - hygiene: orphans, duplicate and near-duplicate names (Levenshtein distance 2), name or aka
 *    collisions across kinds, products sharing a development code.
 *
 * `auditEntities` runs over any list of parsed entities so the checks are unit tested
 * (scripts/audit.test.ts); `runAudit` runs them over the whole graph.
 *
 * Run: npm run audit
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { REL_FIELDS, routeFor, type Entity } from "../src/lib/schema";
import { regionalApprovals, type Region } from "../src/data/regional-approvals";
import type { Spike } from "../src/data/spikes";
import { spikeSources } from "./spike-sources";
import { numberFindings } from "./numbers";

export type Finding = { check: string; severity: "high" | "medium" | "low"; id: string; kind: string; name: string; route: string; detail: string };
export type Audit = { generated: string; today: string; total: number; findings: Finding[]; staleness: Array<{ id: string; kind: string; name: string; route: string; asOf: string; days: number }>; summary: Record<string, number> };

const APPROVED_LIKE = new Set(["approved", "standard-of-care"]);
const DEAD = new Set(["negative", "withdrawn", "historic"]);

function daysBetween(a: string, b: Date): number {
  return Math.floor((b.getTime() - new Date(a).getTime()) / 86400000);
}

function textOf(e: Entity): string {
  const parts: string[] = [e.tldr, e.summary, ...e.notes];
  if (e.kind === "drug") parts.push(e.mechanism);
  if (e.kind === "technology") parts.push(e.principle);
  if (e.kind === "cancer") parts.push(...e.stateOfArt, ...e.openProblems, ...e.standardOfCare.map((s) => s.approach));
  if (e.kind === "trial") parts.push(e.setting, e.result ?? "");
  return parts.join(" \n ");
}

export function normName(s: string): string {
  return s.toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

/** Map the free-text `approvals[].region` onto the six regions of regional-approvals.ts; null when it is some other region. */
export function regionOf(label: string): Region | null {
  const s = label.trim().toLowerCase();
  if (/^(us|usa|fda|united states)\b/.test(s)) return "US";
  if (/^(eu|ema|europe|european)\b/.test(s)) return "EU";
  if (/^(uk|mhra|united kingdom|great britain)\b/.test(s)) return "UK";
  if (/^(jp|japan|pmda|mhlw)\b/.test(s)) return "JP";
  if (/^(cn|china|nmpa|prc)\b/.test(s)) return "CN";
  if (/^(au|australia|tga)\b/.test(s)) return "AU";
  return null;
}

/** Normalise the loose `regulatoryEvents[].date` ("2026-Q2", "2024-11", "2020-04-22") to a sortable YYYY-MM-DD, using the end of the period. */
export function eventDate(d: string): string | null {
  let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
  if (m) return d;
  m = /^(\d{4})-Q([1-4])$/.exec(d);
  if (m) return `${m[1]}-${String(Number(m[2]) * 3).padStart(2, "0")}-${Number(m[2]) === 1 || Number(m[2]) === 4 ? "31" : "30"}`;
  m = /^(\d{4})-(\d{2})$/.exec(d);
  if (m) return `${m[1]}-${m[2]}-28`;
  m = /^(\d{4})$/.exec(d);
  if (m) return `${m[1]}-12-31`;
  return null;
}

/** Levenshtein distance with an early exit once it must exceed `max`. */
export function levenshteinWithin(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  if (a === b) return true;
  const prev = new Array<number>(b.length + 1);
  const cur = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    cur[0] = i;
    let rowMin = cur[0];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (cur[j] < rowMin) rowMin = cur[j];
    }
    if (rowMin > max) return false;
    for (let j = 0; j <= b.length; j++) prev[j] = cur[j];
  }
  return prev[b.length] <= max;
}

/**
 * Two normalised names are worth a Levenshtein comparison only when they could plausibly be the same
 * thing spelled twice: both at least eight characters, the same first three characters (INN stems
 * such as afatinib/axitinib share an ending, not a beginning) and the same digits (CheckMate 141 and
 * CheckMate 214 are different trials, not typos).
 */
export function nearDuplicateCandidates(a: string, b: string): boolean {
  if (a.length < 8 || b.length < 8) return false;
  if (a.slice(0, 3) !== b.slice(0, 3)) return false;
  const digits = (s: string) => s.replace(/[^0-9]/g, "");
  return digits(a) === digits(b);
}

/** Every id an entity points at, mirroring graph.ts `outgoing` (which is not exported). */
function outgoingIds(e: Entity): string[] {
  const out: string[] = [];
  for (const f of REL_FIELDS) out.push(...e[f]);
  if (e.kind === "pairing") out.push(e.a, e.b);
  if (e.kind === "roadmap") for (const s of e.steps) out.push(...s.refs);
  if (e.kind === "cancer") { for (const h of e.history) out.push(...h.refs); out.push(...e.pipeline); for (const s of e.standardOfCare) out.push(...s.refs); }
  if (e.kind === "pathway") for (const n of e.nodes) if (n.targetId) out.push(n.targetId);
  return out.filter((id) => id !== e.id);
}

/** Does a piece of prose name this entity? Its name (without a parenthetical), any aka, or the leading acronym of a trial name, compared with punctuation and case removed. */
export function mentions(text: string, e: Entity): boolean {
  const flat = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const hay = flat(text);
  const base = e.name.replace(/\(.*?\)/g, " ");
  // A name that lists several things ("Extended pleurectomy/decortication & radical mesothelioma surgery") counts when any one part is named.
  const names = [base, ...base.split(/\s*(?:&|;|,|\band\b)\s*/).filter((p) => p.length >= 8), ...e.aka];
  if (e.kind === "trial") names.push(e.name.split(/[\s(/&]/)[0]);
  if (e.kind === "drug") names.push(e.name.split(/[\s(/&,]/)[0]);
  return names.map(flat).filter((n) => n.length >= 4).some((n) => hay.includes(n));
}

const SCALAR_SKIP = new Set(["id", "kind", "asOf", "provenance"]);
const short = (v: unknown) => { const s = typeof v === "string" ? v : JSON.stringify(v); return s.length > 60 ? s.slice(0, 57) + "..." : s; };

/** Spike duplicates: the same id defined in two spike files with different scalar values. `mergeDuplicates` keeps the first and hides the rest. */
export function spikeDivergences(spikes: Spike[]): Array<{ id: string; kind: string; name: string; fields: string[]; spikes: string[] }> {
  const seen = new Map<string, Array<{ spike: string; rec: Record<string, unknown> }>>();
  for (const s of spikes) for (const e of s.entities) seen.set(e.id, [...(seen.get(e.id) ?? []), { spike: s.cancerId, rec: e as unknown as Record<string, unknown> }]);
  const out: Array<{ id: string; kind: string; name: string; fields: string[]; spikes: string[] }> = [];
  for (const [id, copies] of seen) {
    if (copies.length < 2) continue;
    const first = copies[0].rec;
    const fields = new Set<string>();
    for (const c of copies.slice(1)) {
      for (const [k, v] of Object.entries(c.rec)) {
        if (SCALAR_SKIP.has(k) || Array.isArray(v) || (typeof v === "object" && v !== null)) continue;
        const a = first[k];
        if (a !== undefined && a !== v) fields.add(`${k}: "${short(a)}" vs "${short(v)}"`);
      }
    }
    if (fields.size) out.push({ id, kind: String(first.kind), name: String(first.name), fields: [...fields], spikes: [...new Set(copies.map((c) => c.spike))] });
  }
  return out;
}

export type AuditOptions = { now?: Date; spikes?: Spike[]; regional?: typeof regionalApprovals; /** Include the number-sourcing checks from scripts/numbers.ts (default true). */ numbers?: boolean };

export function auditEntities(entities: Entity[], opts: AuditOptions = {}): Finding[] {
  const now = opts.now ?? new Date();
  const today = now.toISOString().slice(0, 10);
  const year = now.getFullYear();
  const regional = opts.regional ?? regionalApprovals;
  const byId = new Map(entities.map((e) => [e.id, e] as const));
  const get = (id: string) => byId.get(id);
  const findings: Finding[] = [];
  const add = (check: string, severity: Finding["severity"], e: Entity, detail: string) => findings.push({ check, severity, id: e.id, kind: e.kind, name: e.name, route: routeFor(e), detail });

  const trialsByDrug = new Map<string, Entity[]>();
  for (const t of entities) if (t.kind === "trial") for (const d of t.drugs) trialsByDrug.set(d, [...(trialsByDrug.get(d) ?? []), t]);

  const incoming = new Map<string, number>();
  const outDegree = new Map<string, number>();
  for (const e of entities) {
    const ids = [...new Set(outgoingIds(e))];
    outDegree.set(e.id, ids.length);
    for (const to of ids) incoming.set(to, (incoming.get(to) ?? 0) + 1);
  }

  for (const e of entities) {
    if (e.kind === "drug") {
      const hasApprovals = e.approvals.length > 0;
      // A regimen (FOLFOX, FLOT) has no marketing authorisation of its own; its standing comes from guidelines, not a licence.
      const isRegimen = /\bregimen\b/i.test(e.modality);
      // Tests, assays and software are cleared or CE-marked rather than approved, and "established" is their approved-like status.
      const isTest = /\b(test|assay|classifier|software|device|imaging agent|panel|score)\b/i.test(e.modality);
      if (APPROVED_LIKE.has(e.status ?? "") && !hasApprovals && !isRegimen) add("status-vs-approvals", "high", e, `status "${e.status}" but no approvals recorded`);
      const majorApprovals = e.approvals.filter((a) => /^(US|EU|FDA|EMA)/i.test(a.region));
      const approvedLikeStatus = APPROVED_LIKE.has(e.status ?? "") || e.status === "withdrawn" || e.status === "historic" || (isTest && e.status === "established");
      if (majorApprovals.length && !approvedLikeStatus) add("status-vs-approvals", "medium", e, `US/EU approvals recorded (${majorApprovals.map((a) => `${a.region} ${a.year}`).join(", ")}) but status is "${e.status ?? "unset"}"`);
      else if (hasApprovals && !majorApprovals.length && !APPROVED_LIKE.has(e.status ?? "")) add("regional-approval-only", "low", e, `approved only outside US/EU (${e.approvals.map((a) => `${a.region} ${a.year}`).join(", ")}); status "${e.status ?? "unset"}" describes the global stage`);
      if (!APPROVED_LIKE.has(e.status ?? "") && e.status !== "withdrawn" && !isTest && /\b(was|is|were|been) approved\b|\bFDA approved\b|\bapproval (in|for) \d{4}/i.test(e.tldr + " " + e.summary) && !/\bChina\b|\bNMPA\b|\bJapan\b|\bEU\b|\bEMA\b/i.test(e.summary))
        add("text-says-approved", "low", e, `text mentions approval but status is "${e.status ?? "unset"}"`);
      const approvalYears = e.approvals.map((a) => a.year);
      if (approvalYears.some((y) => y > year)) add("future-approval", "high", e, `approval year in the future: ${approvalYears.filter((y) => y > year).join(", ")}`);

      // approvals[] versus the six-region table in regional-approvals.ts.
      const row = regional[e.id];
      if (row) {
        for (const [region, entry] of Object.entries(row) as Array<[Region, NonNullable<typeof row[Region]>]>) {
          const ours = e.approvals.filter((a) => regionOf(a.region) === region);
          if (ours.length && (entry.status === "not-filed" || entry.status === "under-review" || entry.status === "rejected"))
            add("approvals-vs-regional", "high", e, `approvals list ${region} ${Math.min(...ours.map((a) => a.year))} but regional-approvals.ts says ${entry.status}${entry.note ? ` (${entry.note})` : ""}`);
          else if (ours.length && entry.year && (entry.status === "approved" || entry.status === "conditional") && Math.min(...ours.map((a) => a.year)) !== entry.year)
            add("approvals-vs-regional", "medium", e, `${region} first approval year ${Math.min(...ours.map((a) => a.year))} in approvals but ${entry.year} in regional-approvals.ts`);
          else if (!ours.length && (region === "US" || region === "EU") && (entry.status === "approved" || entry.status === "conditional") && entry.year)
            add("approvals-vs-regional", "low", e, `regional-approvals.ts records ${region} ${entry.status} ${entry.year} but approvals[] has no ${region} row`);
        }
      }

      // asOf older than the latest regulatory event that has already happened.
      const past = e.regulatoryEvents.map((ev) => ({ ev, d: eventDate(ev.date) })).filter((x): x is { ev: typeof x.ev; d: string } => !!x.d && x.d <= today).sort((a, b) => a.d.localeCompare(b.d));
      const latest = past[past.length - 1];
      if (latest && latest.d > e.asOf) add("asof-before-regulatory-event", "medium", e, `asOf ${e.asOf} predates the ${latest.ev.type} dated ${latest.ev.date} (${latest.ev.region}): ${latest.ev.note.slice(0, 80)}`);
    }

    if (e.kind === "drug" && APPROVED_LIKE.has(e.status ?? "")) {
      // An approved product whose every linked trial is still running has no pivotal evidence in the corpus.
      const linked = [...new Set([...(trialsByDrug.get(e.id) ?? []), ...e.trials.map(get).filter((x): x is Entity => !!x && x.kind === "trial")])];
      if (linked.length && linked.every((t) => ["recruiting", "active", "planned"].includes(t.status ?? "")))
        add("approved-only-live-trials", "low", e, `status "${e.status}" but every linked trial is still running (${linked.map((t) => `${t.name}: ${t.status}`).join(", ")}); link the pivotal trial or note that the approval was accelerated on earlier data`);
    }

    // Numbers in the prose versus the record's own structured fields.
    if (e.kind === "drug" && e.approvals.length) {
      const prose = `${e.tldr} ${e.summary}`;
      const eventYears = e.regulatoryEvents.filter((r) => r.type === "approval").map((r) => Number(r.date.slice(0, 4))).filter((y) => Number.isFinite(y));
      const earliest = Math.min(...e.approvals.map((a) => a.year), ...eventYears);
      // "approved in 2004", "approval (2004)"; a designation, filing or trial dated between the word and the year is not an approval year.
      const early = [...prose.matchAll(/\bapprov(?:ed|al)s?\b([^.;:]{0,60}?)\b((?:19|20)\d{2})\b/gi)].filter((m) => !/designation|filed|filing|submitted|application|review|trial|study|since|until|withdrawn|withdrew|generic|biosimilar/i.test(m[1])).map((m) => Number(m[2])).filter((y) => y < earliest);
      if (early.length) add("text-vs-structured", "low", e, `text mentions approval in ${[...new Set(early)].join(", ")} but the earliest recorded approval is ${earliest}; add the missing approvals[] row or correct the year`);
    }
    if (e.kind === "trial") {
      const prose = [e.tldr, e.summary, e.result ?? ""].join(" ");
      const textHrs = [...prose.matchAll(/\b(?:HR|hazard ratio)\s*(?:of|=|:)?\s*(\d?\.\d+)\b/gi)].map((m) => Number(m[1]));
      const withHr = e.outcomes.filter((o) => o.hr !== undefined);
      if (textHrs.length === 1 && withHr.length === 1 && Math.abs(textHrs[0] - withHr[0].hr!) > 0.005)
        add("text-vs-structured", "medium", e, `text says HR ${textHrs[0]} but the structured outcome "${withHr[0].endpoint}" has HR ${withHr[0].hr}`);
      if (e.enrolled !== undefined) {
        for (const m of prose.matchAll(/\b(enrolled|randomi[sz]ed)\s+(a total of\s+|some\s+|about\s+|around\s+|roughly\s+|nearly\s+|over\s+|more than\s+|almost\s+)?(\d{1,3}(?:,\d{3})+|\d{2,6})\b(?![-\d]|\s*(?:%|percent|per cent|sites|centres|centers|countries|hospitals|arms|to\s))/gi)) {
          if (m[2]) continue; // hedged figures are rounded on purpose
          const n = Number(m[3].replace(/,/g, ""));
          if (n >= 1990 && n <= 2035 && !m[3].includes(",")) continue; // a year, not a count
          if (m[1].toLowerCase().startsWith("enrol") ? n !== e.enrolled : n > e.enrolled)
            add("text-vs-structured", "medium", e, `text says ${m[1]} ${m[3]} but enrolled is ${e.enrolled}`);
        }
      }
      if (e.status === "positive" && !e.result && e.outcomes.length === 0) add("positive-no-result", "medium", e, "status positive but neither result text nor structured outcomes");
      if (e.yearReported && e.yearReported > year) add("future-year", "high", e, `yearReported ${e.yearReported} is in the future`);
      const primaryHr = e.outcomes.filter((o) => o.primary && o.hr !== undefined && o.hr >= 1);
      if (e.status === "positive" && primaryHr.length && !/non-inferior|noninferior|de-escalat|omit|skip|spar(e|ing)|shorter|equivalen/i.test(textOf(e)))
        add("positive-hr-ge-1", "medium", e, `status positive but primary endpoint hazard ratio ${primaryHr.map((o) => `${o.hr} (${o.endpoint})`).join(", ")}; not described as a non-inferiority or de-escalation trial`);
    }

    // Any entity: years beyond the current year in text (e.g. "approved in 2027") that are not clearly forward-looking.
    const text = textOf(e);
    const futureYears = [...text.matchAll(/\b(20[2-9]\d)\b/g)].map((m) => Number(m[1])).filter((y) => y > year);
    if (futureYears.length) {
      const fwd = /expected|planned|will|projected|by 20|target|readout|pending|anticipat|due|deadline|forecast|ongoing/i.test(text);
      add("future-year-in-text", fwd ? "low" : "medium", e, `mentions ${[...new Set(futureYears)].join(", ")}${fwd ? " (looks forward-looking)" : ""}`);
    }

    if (e.kind === "cancer") {
      // A negative trial or withdrawn product cited as the evidence against a practice ("not recommended after MARS 2")
      // is a legitimate reference when the row's text names it; an unexplained citation is the contradiction.
      for (const row of e.standardOfCare) for (const id of row.refs) {
        const r = get(id);
        if (!r || !(DEAD.has(r.status ?? "") || r.tags.includes("failure"))) continue;
        if (mentions(row.approach, r)) continue;
        add("soc-cites-dead", "high", e, `standard-of-care row "${row.setting}" cites ${r.name} (status ${r.status ?? "unset"}) without saying so in the text; explain the negative result or drop the reference`);
      }
      for (const id of e.pipeline) {
        const r = get(id);
        if (r && (DEAD.has(r.status ?? "") || r.tags.includes("failure"))) add("pipeline-cites-dead", "medium", e, `pipeline lists ${r.name} (status ${r.status ?? "unset"})`);
      }
    }

    // Roadmap steps that are current, emerging or speculative but cite a withdrawn or failed product.
    if (e.kind === "roadmap") {
      for (const step of e.steps) {
        if (step.status === "historic") continue;
        for (const id of step.refs) {
          const r = get(id);
          if (r && r.kind === "drug" && (r.status === "withdrawn" || r.status === "negative" || r.tags.includes("failure")) && !mentions(step.description, r)) add("roadmap-cites-withdrawn", "medium", e, `step "${step.title}" (${step.status}) cites ${r.name} (status ${r.status ?? "unset"}) without saying so; mark the step historic, explain the failure in the text or replace the reference`);
        }
      }
    }

    // Sourcing: no external link, no wikipedia, and no trial registry.
    if (e.links.length === 0 && !e.wikipedia && !(e.kind === "trial" && e.nct) && !(e.kind === "collection") && !(e.kind === "company") && !(e.kind === "institution"))
      add("unsourced", "low", e, "no external link or Wikipedia reference");

    // Orphans: nothing links here and this record links to at most one other thing.
    if ((incoming.get(e.id) ?? 0) === 0 && (outDegree.get(e.id) ?? 0) <= 1 && e.kind !== "section")
      add("orphan", "low", e, `no incoming links and ${outDegree.get(e.id) ?? 0} outgoing; link it from a cancer, target, technology or company page, or merge it into an existing record`);
  }

  // Duplicates by normalised name.
  const byName = new Map<string, Entity[]>();
  for (const e of entities) { const k = normName(e.name); byName.set(k, [...(byName.get(k) ?? []), e]); }
  for (const [, list] of byName) if (list.length > 1) for (const e of list) add("duplicate-name", "medium", e, `same normalised name as ${list.filter((x) => x.id !== e.id).map((x) => `${x.id} (${x.kind})`).join(", ")}`);

  // Name or aka collisions across kinds (a term and a technology both called "Organoids", say).
  const anyName = new Map<string, Entity[]>();
  for (const e of entities) for (const n of new Set([e.name, ...e.aka].map(normName))) if (n.length >= 4) anyName.set(n, [...(anyName.get(n) ?? []), e]);
  const collided = new Set<string>();
  for (const [n, list] of anyName) {
    const kinds = new Set(list.map((x) => x.kind));
    if (kinds.size < 2) continue;
    for (const e of list) {
      const others = list.filter((x) => x.id !== e.id && x.kind !== e.kind);
      if (!others.length) continue;
      const key = `${e.id}|${others.map((x) => x.id).sort().join(",")}`;
      if (collided.has(key)) continue;
      collided.add(key);
      const linked = others.every((o) => e.related.includes(o.id) || o.related.includes(e.id) || outgoingIds(e).includes(o.id) || outgoingIds(o).includes(e.id));
      if (linked) continue;
      add("name-collision-across-kinds", "low", e, `"${n}" is also ${others.map((x) => `${x.name} (${x.id}, ${x.kind})`).join(", ")}; cross-link them with \`related\` or merge if they describe one thing`);
    }
  }

  // Near-duplicates inside a kind: one name contains the other, or Levenshtein distance at most 2.
  const sameKind = new Map<string, Entity[]>();
  for (const e of entities) sameKind.set(e.kind, [...(sameKind.get(e.kind) ?? []), e]);
  for (const list of sameKind.values()) {
    const names = list.map((e) => [e, normName(e.name)] as const).sort((a, b) => a[1].length - b[1].length);
    for (let i = 0; i < names.length; i++) {
      const [a, na] = names[i];
      for (let j = i + 1; j < names.length; j++) {
        const [b, nb] = names[j];
        if (na === nb) continue;
        if (na.length >= 9 && nb.length >= 9 && (na.includes(nb) || nb.includes(na))) add("near-duplicate-name", "low", a.id < b.id ? a : b, `name overlaps with ${a.id < b.id ? b.name : a.name} (${a.id < b.id ? b.id : a.id})`);
        else if (nb.length - na.length > 2) break; // sorted by length: nothing further can be within distance 2
        else if (nearDuplicateCandidates(na, nb) && levenshteinWithin(na, nb, 2)) {
          const [keep, fold] = a.id < b.id ? [a, b] : [b, a];
          add("near-duplicate-levenshtein", "medium", keep, `"${keep.name}" and "${fold.name}" (${fold.id}) differ by at most two characters; if they are one thing, keep ${keep.id}, move "${fold.name}" into its aka and repoint links`);
        }
      }
    }
  }

  // Products sharing a development code.
  const byCode = new Map<string, Entity[]>();
  for (const e of entities) if (e.kind === "drug" && e.code) for (const c of e.code.split(/[,;/]/).map((s) => s.trim().toUpperCase()).filter((s) => s.length >= 4)) byCode.set(c, [...(byCode.get(c) ?? []), e]);
  for (const [code, list] of byCode) if (list.length > 1) for (const e of list) add("shared-code", "medium", e, `code ${code} is also on ${list.filter((x) => x.id !== e.id).map((x) => `${x.name} (${x.id})`).join(", ")}; one code, one product`);

  // Spike duplicates whose scalars diverge.
  for (const d of spikeDivergences(opts.spikes ?? [])) {
    const e = get(d.id);
    if (!e) continue;
    add("spike-scalar-divergence", "medium", e, `defined in the ${d.spikes.join(" and ")} spikes with different values; the first wins and hides the rest: ${d.fields.join("; ")}`);
  }

  if (opts.numbers !== false) findings.push(...numberFindings(entities));

  const order = { high: 0, medium: 1, low: 2 };
  findings.sort((a, b) => order[a.severity] - order[b.severity] || a.check.localeCompare(b.check) || a.name.localeCompare(b.name));
  return findings;
}

export function runAudit(now = new Date()): Audit {
  const g = graph();
  const today = now.toISOString().slice(0, 10);
  const findings = auditEntities(g.entities, { now, spikes: spikeSources });
  const staleness = g.entities.map((e) => ({ id: e.id, kind: e.kind, name: e.name, route: routeFor(e), asOf: e.asOf, days: daysBetween(e.asOf, now) })).sort((a, b) => b.days - a.days);
  const summary: Record<string, number> = {};
  for (const f of findings) summary[f.check] = (summary[f.check] ?? 0) + 1;
  return { generated: now.toISOString(), today, total: g.entities.length, findings, staleness, summary };
}

if (process.argv[1]?.endsWith("audit.ts")) {
  const audit = runAudit();
  const out = join(process.cwd(), "public");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, "audit.json"), JSON.stringify(audit, null, 0));
  console.log(`audit: ${audit.findings.length} findings across ${audit.total} entities`);
  for (const [k, n] of Object.entries(audit.summary).sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${n}`);
}
