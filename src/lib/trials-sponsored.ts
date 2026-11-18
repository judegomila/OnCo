import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "./graph";
import type { Trial } from "./schema";
import { normaliseSponsor, resolveSponsor } from "@/data/sponsor-aliases";

/**
 * "Trials it sponsors or funds", derived for every institution page from what the trial records already hold, so a
 * funder reaches its trials without anyone typing them (docs/proposals/cross-links-census-2026-11.md, pair 4). On
 * 11 November 2026 only 47 of the 179 trials whose sponsor was a funder record linked to it.
 *
 * Three fields are read, and the table says which one each row rests on:
 *
 * - the lead sponsor in the ClinicalTrials.gov capture the trial record cites (`participation[].leadSponsor`);
 * - the record's own `sponsor` text, where "SWOG / NCI" credits each party and "funded by" marks a funder;
 * - the sponsor and funder lists of an ISRCTN capture (`alternateParticipation`, public/trial-participation/other/).
 *
 * A name becomes an institution through `resolveSponsor` (src/data/sponsor-aliases.ts), the map the /sponsors/ board
 * uses, or failing that when it is exactly one institution's name or recorded alias.
 *
 * The map was written for a leaderboard and files a parent under its best-known part: "Fudan University" under the
 * Shanghai Cancer Center, "Yonsei University" under Severance, "University of Washington" under Fred Hutch. That is
 * fair for a ranking and wrong for a page that says "it sponsors this trial", because the registry's "Fudan
 * University" is also Zhongshan and Huashan hospitals. So a row is listed only when the sponsor's name, as written,
 * contains the institution's own name or an alias its record lists (`namesInstitution`). The rest are counted and
 * said under the table as not told apart (`filedUnder`), never listed. Nothing is inferred from sites, authors or
 * prose. Build-time only (reads the file system).
 */

export type SponsorRole = "lead-sponsor" | "sponsor" | "funder";

export type Sponsored = {
  trial: Trial;
  /** Each role the institution has on the trial, strongest first. */
  roles: SponsorRole[];
  /** The registry's or the record's own words for it. */
  namedAs: string[];
  /** Where each role was read: ClinicalTrials.gov, ISRCTN or the trial record. */
  sources: string[];
};

export const ROLE_LABEL: Record<SponsorRole, string> = { "lead-sponsor": "Lead sponsor", sponsor: "Sponsor", funder: "Funder" };
const ROLE_ORDER: SponsorRole[] = ["lead-sponsor", "sponsor", "funder"];

/**
 * The parties in a record's sponsor text. Co-sponsors are listed with " / ", "; " or " with "; what follows
 * "funded by" is a funder, and there "and" or a comma separates one from the next. A bracketed note
 * ("(now Servier)") is dropped.
 */
export function splitSponsorText(s: string): Array<{ name: string; role: SponsorRole }> {
  const out: Array<{ name: string; role: SponsorRole }> = [];
  for (const part of s.split(/\s*[/;]\s*/)) {
    const [head, ...funded] = part.replace(/\(.*?\)/g, "").split(/,?\s+funded by\s+/i);
    for (const name of head.split(/,?\s+with\s+/i)) out.push({ name, role: "sponsor" });
    for (const tail of funded) for (const name of tail.split(/\s+and\s+|,\s+/i)) out.push({ name: name.replace(/^the\s+/i, ""), role: "funder" });
  }
  return out.map((x) => ({ ...x, name: x.name.trim() })).filter((x) => x.name.length > 2);
}

type IsrctnStudy = { study?: { sponsors?: Array<{ organisation?: string }>; funders?: Array<{ name?: string }> } };

/** Sponsor and funder names of an ISRCTN capture; a missing snapshot reads as none. */
function isrctnNames(snapshot: string): { sponsors: string[]; funders: string[] } {
  const file = join(process.cwd(), "public", snapshot);
  if (!existsSync(file)) return { sponsors: [], funders: [] };
  const { study } = JSON.parse(readFileSync(file, "utf8")) as IsrctnStudy;
  const clean = (s?: string) => (s ?? "").trim();
  return { sponsors: (study?.sponsors ?? []).map((s) => clean(s.organisation)).filter(Boolean), funders: (study?.funders ?? []).map((f) => clean(f.name)).filter(Boolean) };
}

let exact: Map<string, string | null> | null = null;
/** Institutions by exact normalised name or alias; a key two institutions share maps to null. */
function exactIndex(): Map<string, string | null> {
  if (exact) return exact;
  exact = new Map();
  for (const i of graph().kind("institution")) for (const s of new Set([i.name, ...i.aka].map(normaliseSponsor))) {
    if (s.length < 4) continue;
    exact.set(s, exact.has(s) && exact.get(s) !== i.id ? null : i.id);
  }
  return exact;
}

/**
 * The institution a sponsor or funder name means, or undefined. ISRCTN writes a country after the name
 * ("Nordic Cancer Union (Norway)"); the bracket is dropped for the exact match only.
 */
export function sponsorInstitution(name: string): string | undefined {
  const g = graph();
  const t = resolveSponsor(name);
  if (t.matched) return t.id && g.get(t.id)?.kind === "institution" ? t.id : undefined;
  for (const n of [name, name.replace(/\s*\([^)]*\)\s*/g, " ")]) {
    const id = exactIndex().get(normaliseSponsor(n));
    if (id) return id;
  }
  return undefined;
}

const plain = (s: string) => s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

let ownNames: Map<string, string[]> | null = null;
/** Whether a sponsor name, as written, contains the institution's own name or an alias its record lists, as whole words. */
export function namesInstitution(sponsor: string, institutionId: string): boolean {
  if (!ownNames) {
    ownNames = new Map();
    // The bracket of a name is not the institution's own: "National Cancer Institute (NIH)" names its parent there.
    for (const i of graph().kind("institution")) ownNames.set(i.id, [...new Set([i.name, i.name.replace(/\s+\(.*?\)\s*$/, ""), ...i.aka].map(plain))].filter(Boolean));
  }
  const text = plain(sponsor);
  // A short alias ("NCI", "UCL") counts only as the whole name; a longer one anywhere in it, between word breaks.
  return (ownNames.get(institutionId) ?? []).some((n) => (n.length < 6 ? text === n : ` ${text} `.includes(` ${n} `)));
}

let byInstitution: Map<string, Sponsored[]> | null = null;
let filed: Map<string, Map<string, Set<string>>> | null = null;

function build() {
  byInstitution = new Map();
  filed = new Map();
  for (const t of graph().kind("trial")) {
    const found = new Map<string, { roles: Set<SponsorRole>; names: Set<string>; sources: Set<string> }>();
    const credit = (name: string, role: SponsorRole, source: string) => {
      const id = sponsorInstitution(name);
      if (!id) return;
      if (!namesInstitution(name, id)) {
        const m = filed!.get(id) ?? new Map<string, Set<string>>();
        m.set(name.trim(), (m.get(name.trim()) ?? new Set<string>()).add(t.id));
        filed!.set(id, m);
        return;
      }
      const f = found.get(id) ?? { roles: new Set(), names: new Set(), sources: new Set() };
      f.roles.add(role); f.names.add(name.trim()); f.sources.add(source);
      found.set(id, f);
    };
    for (const p of t.participation ?? []) if (p.leadSponsor) credit(p.leadSponsor, "lead-sponsor", "ClinicalTrials.gov");
    for (const a of t.alternateParticipation ?? []) {
      const { sponsors, funders } = isrctnNames(a.snapshot);
      for (const s of sponsors.length ? sponsors : a.sponsors) credit(s, "sponsor", "ISRCTN");
      for (const f of funders) credit(f, "funder", "ISRCTN");
    }
    if (t.sponsor) for (const s of splitSponsorText(t.sponsor)) credit(s.name, s.role, "OnCo trial record");
    for (const [id, f] of found) {
      // The registry's lead sponsor and the record's sponsor text are one fact said twice.
      const roles = ROLE_ORDER.filter((r) => f.roles.has(r) && !(r === "sponsor" && f.roles.has("lead-sponsor")));
      const list = byInstitution!.get(id) ?? [];
      list.push({ trial: t, roles, namedAs: [...f.names].sort(), sources: [...f.sources].sort() });
      byInstitution!.set(id, list);
    }
  }
  const phaseRank = (t: Trial) => (t.phase === "3" ? 0 : t.phase === "2/3" ? 1 : 2);
  for (const l of byInstitution.values()) l.sort((a, b) => phaseRank(a.trial) - phaseRank(b.trial) || a.trial.name.localeCompare(b.trial.name, "en"));
}

/** Trial records the institution sponsors or funds, phase 3 first, then by name. */
export function sponsoredBy(institutionId: string): Sponsored[] {
  if (!byInstitution) build();
  return byInstitution!.get(institutionId) ?? [];
}

/** Institution ids with at least one trial they sponsor or fund. */
export function institutionsSponsoring(): string[] {
  if (!byInstitution) build();
  return [...byInstitution!.keys()].sort();
}

/**
 * Sponsor names the map files under the institution that are not its own, with the number of trial records under
 * each that the table does not already list: said under the table as a gap, never listed as its trials.
 */
export function filedUnder(institutionId: string): Array<{ name: string; trials: number }> {
  if (!byInstitution) build();
  const listed = new Set(sponsoredBy(institutionId).map((s) => s.trial.id));
  return [...(filed!.get(institutionId) ?? [])].map(([name, ids]) => ({ name, trials: [...ids].filter((id) => !listed.has(id)).length })).filter((x) => x.trials).sort((a, b) => b.trials - a.trials || a.name.localeCompare(b.name, "en"));
}
