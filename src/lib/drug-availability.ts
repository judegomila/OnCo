import type { Drug } from "@/lib/schema";
import { REGIONS, REGION_META, regionalApprovals, type Region, type RegionalStatus } from "@/data/regional-approvals";
import { coverageUk, NICE_STATUS_LABEL } from "@/data/coverage-uk";
import { coverageUs } from "@/data/coverage-us";
import { COUNTRY_DIVES } from "@/data/country-dives";
import whoEml from "@/data/universe-lists/who-eml-cancer.json";
import { countryName, countryPageFor } from "@/lib/country-pages";

/**
 * "Is this drug available in my country?", derived for every drug page from what the corpus already holds, with no
 * hand-written row: the seven-region regulatory table (src/data/regional-approvals.ts), the drug's own `approvals`
 * and `access` rows, the NHS and Medicare coverage tables, the WHO Model List of Essential Medicines as captured in
 * src/data/universe-lists/who-eml-cancer.json, and the country deep dives that name the drug.
 *
 * Absence is a gap in our research, never "not available": a region with no row is listed under the table as not
 * recorded, which is what src/data/regional-approvals.ts already promises ("Absent = unknown/not researched").
 */

export type AvailabilityStatus = RegionalStatus;

/** The words and chip colours of src/components/RegionMatrix.tsx, which is a client module and cannot lend them to a server one. */
export const STATUS_VIEW: Record<AvailabilityStatus, { label: string; chip: string }> = {
  approved: { label: "Approved", chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" },
  conditional: { label: "Conditional", chip: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200" },
  "under-review": { label: "Under review", chip: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200" },
  "not-filed": { label: "Not filed", chip: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" },
  withdrawn: { label: "Withdrawn", chip: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200" },
  rejected: { label: "Rejected", chip: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200" },
};

export type Cite = { text: string; href?: string };

export type AvailabilityRow = {
  /** A region code (US, EU, UK, JP, CN, AU, IN), an alpha-2 country, or WHO. Matches the reader's region choice. */
  key: string;
  where: string;
  flag?: string;
  /** The country page, when there is one. */
  route?: string;
  approval?: { status: AvailabilityStatus; year?: number; indication?: string; source?: string; note?: string };
  /** Who pays: NICE, SMC, Medicare, a recorded reimbursement line. */
  paid: Cite[];
  /** Help with the cost: a manufacturer or public programme the record names. */
  help: Cite[];
  generic?: boolean;
  /** The country deep dive that names this drug. */
  named?: { name: string; route: string };
};

export type EmlListing = { name: string; section: string; indications: string[]; url: string; equivalentTo?: string };

/** The free-text region names drug records use in `approvals` and `access`, mapped to the region or country they mean. */
const REGION_ALIAS: Record<string, string> = {
  US: "US", EU: "EU", UK: "UK", "England (NICE)": "UK", CN: "CN", China: "CN", JP: "JP", Japan: "JP", AU: "AU", Australia: "AU",
  IN: "IN", India: "IN", KR: "KR", France: "FR", DE: "DE", Germany: "DE", WHO: "WHO", Global: "WHO",
};

/** The region codes that are not alpha-2 country codes, and the country page each one has. */
const REGION_COUNTRY: Partial<Record<Region, string>> = { US: "US", UK: "GB", JP: "JP", CN: "CN", AU: "AU", IN: "IN" };

const norm = (s: string) => s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

type EmlItem = { name: string; id: string; url: string; section: string; indications: string[]; equivalentTo?: string };
const EML: EmlItem[] = (whoEml as { items: EmlItem[] }).items;
export const EML_SOURCE = (whoEml as { source: { label: string; url: string }; checked: string }).source;
export const EML_CHECKED = (whoEml as { checked: string }).checked;

/** The drug's WHO Model List entry: its name or a recorded alias is the listed medicine's name. */
export function emlListing(d: Pick<Drug, "name" | "aka">): EmlListing | undefined {
  const names = new Set([d.name, ...d.aka].map(norm));
  const hit = EML.find((i) => names.has(norm(i.name)));
  return hit && { name: hit.name, section: hit.section, indications: hit.indications, url: hit.url, equivalentTo: hit.equivalentTo };
}

let namedIndex: Map<string, Array<{ iso2: string; name: string }>> | null = null;
/** The country deep dives whose drug list names this drug. */
function namedOn(id: string): Array<{ iso2: string; name: string }> {
  if (!namedIndex) {
    namedIndex = new Map();
    for (const d of COUNTRY_DIVES) for (const drug of d.drugs) {
      const l = namedIndex.get(drug) ?? [];
      l.push({ iso2: d.iso2, name: d.name });
      namedIndex.set(drug, l);
    }
  }
  return namedIndex.get(id) ?? [];
}

const regionLabel = (key: string) => (key in REGION_META ? REGION_META[key as Region].label : key === "WHO" ? "World Health Organization" : countryName(key));
const routeOf = (key: string): string | undefined => {
  if (key === "WHO" || key === "EU") return undefined;
  const iso2 = REGION_COUNTRY[key as Region] ?? key;
  return /^[A-Z]{2}$/.test(iso2) ? countryPageFor(iso2) : undefined;
};
const flagOf = (key: string): string | undefined => (key in REGION_META ? REGION_META[key as Region].flag : /^[A-Z]{2}$/.test(key) ? String.fromCodePoint(...[...key].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : undefined);

/** Region and country rows in reading order: the seven regions as the header's switcher orders them, then countries by name, then WHO. */
const ORDER = ["US", "UK", "EU", "CN", "JP", "AU", "IN"];

export function availabilityFor(d: Drug): { rows: AvailabilityRow[]; notRecorded: string[]; eml?: EmlListing } {
  const rows = new Map<string, AvailabilityRow>();
  const row = (key: string): AvailabilityRow => {
    let r = rows.get(key);
    if (!r) { r = { key, where: regionLabel(key), flag: flagOf(key), route: routeOf(key), paid: [], help: [] }; rows.set(key, r); }
    return r;
  };

  // Marketing authorisation: the regional table first, which carries a status and a source for each region.
  const regional = regionalApprovals[d.id];
  for (const r of REGIONS) { const e = regional?.[r]; if (e) row(r).approval = { status: e.status, year: e.year, indication: e.indication, source: e.source, note: e.note }; }
  // Then the record's own approvals, for regions the table does not hold: the earliest year, with that row's indication.
  for (const a of [...d.approvals].sort((x, y) => x.year - y.year)) {
    const key = REGION_ALIAS[a.region];
    if (!key || a.region === "England (NICE)") continue;
    if (key === "WHO") {
      // An EML row is shown from the WHO list itself below; prequalification and other WHO decisions are shown here.
      if (/essential medicines/i.test(a.indication)) continue;
    }
    const r = row(key);
    if (!r.approval) r.approval = { status: "approved", year: a.year, indication: a.indication, note: a.note };
  }

  // Who pays.
  const uk = coverageUk[d.id];
  if (uk) {
    row("UK").paid.push({ text: `NICE: ${NICE_STATUS_LABEL[uk.nice.status].replace(/^NICE /, "")}${uk.nice.ta ? ` (${uk.nice.ta}${uk.nice.year ? `, ${uk.nice.year}` : ""})` : ""}`, href: uk.nice.url });
    if (uk.smc) row("UK").paid.push({ text: `Scotland (SMC): ${uk.smc.status}`, href: uk.smc.url });
  } else {
    // NICE rows recorded on the drug itself, when the coverage table has no entry for it.
    for (const a of d.approvals.filter((x) => x.region === "England (NICE)")) row("UK").paid.push({ text: `NICE ${a.year}: ${a.indication}` });
  }
  const us = coverageUs[d.id];
  if (us && us.medicare.part !== "unknown") row("US").paid.push({ text: us.medicare.part === "not covered" ? "Medicare: not covered" : `Medicare Part ${us.medicare.part}`, href: us.medicare.url });
  for (const p of us?.patientAssistance ?? []) row("US").help.push({ text: p.program, href: p.url });
  for (const a of d.access) {
    const key = REGION_ALIAS[a.country] ?? (/^[A-Z]{2}$/.test(a.country) ? a.country : undefined);
    // A row with only a list price is a cost, not availability; the Cost & access tab carries it.
    if (!key || !(a.reimbursement || a.assistance || a.generic)) continue;
    const r = row(key);
    // The same fact as a coverage table row ("Medicare Part D" twice) is said once.
    // A record line that opens with it ("Medicare Part D; generic since 2016") replaces the shorter one.
    if (a.reimbursement) {
      const t = a.reimbursement.toLowerCase();
      const i = r.paid.findIndex((p) => t.startsWith(p.text.toLowerCase()));
      if (i >= 0) r.paid[i] = { text: a.reimbursement, href: a.source ?? r.paid[i].href };
      else r.paid.push({ text: a.reimbursement, href: a.source });
    }
    if (a.assistance && !r.help.some((h) => h.href === a.assistance)) r.help.push({ text: a.assistance.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: a.assistance });
    if (a.generic) r.generic = true;
  }

  // The country pages that name the drug.
  for (const n of namedOn(d.id)) {
    const key = Object.entries(REGION_COUNTRY).find(([, c]) => c === n.iso2)?.[0] ?? n.iso2;
    row(key).named = { name: n.name, route: countryPageFor(n.iso2) };
  }

  const eml = emlListing(d);
  if (eml) {
    const r = row("WHO");
    r.paid.push({ text: `Essential Medicines List: ${eml.section.toLowerCase()}${eml.equivalentTo ? `, as an alternative to ${eml.equivalentTo}` : ""}`, href: eml.url });
  }

  const rank = (k: string) => (k === "WHO" ? 1000 : ORDER.includes(k) ? ORDER.indexOf(k) : 100);
  const out = [...rows.values()].sort((a, b) => rank(a.key) - rank(b.key) || a.where.localeCompare(b.where, "en"));
  const notRecorded = REGIONS.filter((r) => !rows.get(r)?.approval).map((r) => REGION_META[r].label);
  return { rows: out, notRecorded, eml };
}
