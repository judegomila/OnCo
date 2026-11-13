import { graph, type Graph } from "./graph";
import { PROTOCOL_DOMAINS, routeFor } from "./kinds";
import { productClass } from "./product-class";
import type { Biomarker, Cancer, Company, Drug, Entity, Kind, Protocol, Technology } from "./schema";
import { TUMOUR_TESTS, type TumourTest } from "@/data/tumour-tests";
import { assays as ASSAYS, type Assay } from "@/data/assays";
import { READOUT_TEST_RULES, type ReadoutTestRule } from "@/data/readout-test-technologies";
import { ASSAY_RECORD } from "@/data/assay-records";

/**
 * Who belongs in a hub page's sections, gathered from the corpus by a stated rule and unioned with what the hub lists
 * by hand.
 *
 * Until 3 November 2026 a section listed the ids an agent had typed into the hub record on the day it was written. The
 * MRD readout's tests came from its `drugs` field and, separately, from its `tests` and `assays` fields, so Signatera
 * rendered three times and a test added later appeared nowhere until someone edited the readout. The owner: "look for
 * opportunities to gather things like all MRD tests to run the sections so we can be more comprehensive".
 *
 * The rules, each from structured fields only (never text):
 *
 * - **Readout tests** (`biomarkerMembers().tests`): the tumour-testing rows, assays and non-medicine products the
 *   readout lists; any test record whose own relation fields name the readout; any assay whose `biomarkers` names it;
 *   and the products and tumour-testing rows whose technologies match the readout's rule in
 *   src/data/readout-test-technologies.ts.
 * - **Treatments a readout selects** (`biomarkerMembers().treatments`): the medicines a current approval threshold or
 *   an FDA companion diagnostic row names. A medicine merely listed on the readout stays in Connected: on a resistance
 *   readout that list holds the drug the mutation defeats, which the result does not select.
 * - **Technology products** (`technologyProducts`): every product whose `technologies` include it (the graph backlink)
 *   and every tumour-testing row filed under it.
 * - **Company products** (`companyProducts`): the company's `drugs`, every product whose `companies` names it, and
 *   every tumour-testing row whose `companyId` is it.
 *
 * One item per product. A tumour-testing row with `drugId: "signatera"`, the `signatera` record and the Signatera
 * assay row are one item, resolved through the structured link: a row's `drugId`, an assay's reviewed pair in
 * src/data/assay-records.ts, or an assay's single non-medicine product. Two rows can share a record (FoundationOne CDx
 * and FoundationOne Liquid CDx both point at `foundationone-cdx`, whose name covers both), and then they are one item.
 * Roles stay apart by record kind and product class (src/lib/product-class.ts): a medicine is never a test.
 */

/** A product in a section: a record, a tumour-testing row, an assay row, or several of them resolved to one. */
export type MemberItem = {
  /** Resolved identity: the record id, else `row:<id>` or `assay:<id>`. */
  key: string;
  name: string;
  href: string;
  tip?: string;
  record?: Drug;
  rows: TumourTest[];
  assays: Assay[];
  /** Named on the hub by hand. Orders the list (hand-listed first) and is never shown to the reader. */
  listed: boolean;
};

/** A readout lists at most this many tests; the rest are behind a link to the full set. */
export const READOUT_TEST_CAP = 24;

const isProduct = (e: Entity | undefined): e is Drug => !!e && e.kind === "drug";
const notMedicine = (d: Drug) => productClass(d) !== "medicine";

/** The record a tumour-testing row resolves to: the one its `drugId` names, which the row file defines as the row's OnCo record. */
export function rowRecord(row: TumourTest, g: Graph = graph()): Drug | undefined {
  const d = row.drugId ? g.get(row.drugId) : undefined;
  return isProduct(d) ? d : undefined;
}

/** The record an assay row resolves to: the reviewed pair in src/data/assay-records.ts, else its one non-medicine product when it names exactly one. */
export function assayRecord(a: Assay, g: Graph = graph()): Drug | undefined {
  const paired = ASSAY_RECORD[a.id] ? g.get(ASSAY_RECORD[a.id]) : undefined;
  if (isProduct(paired)) return paired;
  const products = a.drugs.map((id) => g.get(id)).filter(isProduct).filter(notMedicine);
  return products.length === 1 ? products[0] : undefined;
}

/** Accumulates products, merging every source that resolves to the same product into one item. */
class ItemSet {
  private items = new Map<string, MemberItem>();
  constructor(private g: Graph) {}

  private upsert(key: string, listed: boolean, make: () => MemberItem): MemberItem {
    const have = this.items.get(key);
    if (have) { have.listed ||= listed; return have; }
    const it = make();
    this.items.set(key, it);
    return it;
  }

  record(d: Drug, listed: boolean): void {
    const it = this.upsert(d.id, listed, () => ({ key: d.id, name: d.name, href: routeFor(d), tip: d.tldr, record: d, rows: [], assays: [], listed }));
    it.record = d; it.name = d.name; it.href = routeFor(d); it.tip = d.tldr;
  }

  row(r: TumourTest, listed: boolean): void {
    const d = rowRecord(r, this.g);
    if (d) { this.record(d, listed); const it = this.items.get(d.id)!; if (!it.rows.includes(r)) it.rows.push(r); return; }
    const it = this.upsert(`row:${r.id}`, listed, () => ({ key: `row:${r.id}`, name: r.name, href: `/tumour-testing/#${r.id}`, tip: r.returns, rows: [], assays: [], listed }));
    if (!it.rows.includes(r)) it.rows.push(r);
  }

  assay(a: Assay, listed: boolean): void {
    const d = assayRecord(a, this.g);
    if (d) { this.record(d, listed); const it = this.items.get(d.id)!; if (!it.assays.includes(a)) it.assays.push(a); return; }
    const it = this.upsert(`assay:${a.id}`, listed, () => ({ key: `assay:${a.id}`, name: a.name, href: `/assays/#${a.id}`, tip: a.cutoff, rows: [], assays: [], listed }));
    if (!it.assays.includes(a)) it.assays.push(a);
  }

  /** Hand-listed first in the order they were added, then the gathered ones by name. */
  list(): MemberItem[] {
    const all = [...this.items.values()];
    return [...all.filter((i) => i.listed), ...all.filter((i) => !i.listed).sort((a, b) => a.name.localeCompare(b.name))];
  }
}

const hasAll = (techs: readonly string[], group: readonly string[]) => group.every((t) => techs.includes(t));
const matchesRule = (techs: readonly string[], rule: ReadoutTestRule) => rule.match.some((grp) => hasAll(techs, grp));

/** The technology ids a rule gathers from, for the "see all" link. */
export const ruleTechnologies = (bmId: string): string[] => [...new Set((READOUT_TEST_RULES[bmId]?.match ?? []).flat())];

export type BiomarkerMembers = {
  /** Every test, deduplicated, hand-listed first. Render `tests.slice(0, READOUT_TEST_CAP)`. */
  tests: MemberItem[];
  /** Where the whole set lives when the list is capped. */
  testsMoreHref: string;
  /** Medicines a current threshold or a companion diagnostic row names, threshold order first. */
  treatments: Drug[];
};

const memo = new Map<string, BiomarkerMembers>();

/** The tests that measure a readout and the treatments it selects (rules in the file comment). */
export function biomarkerMembers(bm: Biomarker, g: Graph = graph()): BiomarkerMembers {
  const hit = memo.get(bm.id);
  if (hit && g === graph()) return hit;
  const set = new ItemSet(g);
  // Hand-listed: the tumour-testing rows, the assays, and the readout's own non-medicine products.
  for (const id of bm.tests) { const r = TUMOUR_TESTS.find((x) => x.id === id); if (r) set.row(r, true); }
  for (const id of bm.assays) { const a = ASSAYS.find((x) => x.id === id); if (a) set.assay(a, true); }
  for (const id of bm.drugs) { const d = g.get(id); if (isProduct(d) && notMedicine(d)) set.record(d, true); }
  // Gathered: products that name the readout, assays that name it, and products and rows the readout's rule matches.
  for (const d of g.incoming(bm.id).get("drug") ?? []) if (isProduct(d) && notMedicine(d)) set.record(d, false);
  for (const a of ASSAYS) if (a.biomarkers.includes(bm.id)) set.assay(a, false);
  const rule = READOUT_TEST_RULES[bm.id];
  if (rule) {
    for (const d of g.kind("drug")) {
      if (!notMedicine(d) || !matchesRule(d.technologies, rule)) continue;
      if (rule.excludeTags?.some((t) => d.tags.includes(t))) continue;
      set.record(d, false);
    }
    for (const r of TUMOUR_TESTS) {
      if (!matchesRule(r.technologies, rule) || rule.excludeScopes?.includes(r.scope)) continue;
      const d = rowRecord(r, g);
      if (d && rule.excludeTags?.some((t) => d.tags.includes(t))) continue;
      set.row(r, false);
    }
  }
  const techs = ruleTechnologies(bm.id);
  const tech = techs.length ? g.get(techs[0]) : undefined;
  const treatments: Drug[] = [];
  const seen = new Set<string>();
  const addTreatment = (id: string) => {
    if (seen.has(id)) return;
    const d = g.get(id);
    if (isProduct(d) && !notMedicine(d)) { seen.add(id); treatments.push(d); }
  };
  for (const t of bm.thresholds) if (t.status === "current") addTreatment(t.drugId);
  for (const c of bm.companionDiagnostics) for (const id of c.drugs) addTreatment(id);
  const out: BiomarkerMembers = { tests: set.list(), testsMoreHref: tech ? `${routeFor(tech)}#products` : `/drugs/?type=${encodeURIComponent("Test")}`, treatments };
  if (g === graph()) memo.set(bm.id, out);
  return out;
}

/** The products a technology page lists: every record filed under it, and every tumour-testing row filed under it. */
export function technologyProducts(tech: Technology, g: Graph = graph()): MemberItem[] {
  const set = new ItemSet(g);
  for (const d of g.incoming(tech.id).get("drug") ?? []) if (isProduct(d)) set.record(d, false);
  for (const r of TUMOUR_TESTS) if (r.technologies.includes(tech.id)) set.row(r, false);
  return set.list();
}

/** The products a company page lists: its own list, every record naming it, and every tumour-testing row it runs. */
export function companyProducts(co: Company, g: Graph = graph()): MemberItem[] {
  const set = new ItemSet(g);
  for (const id of co.drugs) { const d = g.get(id); if (isProduct(d)) set.record(d, true); }
  for (const d of g.incoming(co.id).get("drug") ?? []) if (isProduct(d)) set.record(d, false);
  for (const r of TUMOUR_TESTS) if (r.companyId === co.id) set.row(r, false);
  return set.list();
}

/** The sections a hub page gathers, by name; one entry point for the pages and the measuring script. */
export function membersFor(hub: Entity, section: "tests" | "treatments" | "products", g: Graph = graph()): Array<MemberItem | Drug> {
  if (hub.kind === "biomarker" && section === "tests") return biomarkerMembers(hub, g).tests;
  if (hub.kind === "biomarker" && section === "treatments") return biomarkerMembers(hub, g).treatments;
  if (hub.kind === "technology" && section === "products") return technologyProducts(hub, g);
  if (hub.kind === "company" && section === "products") return companyProducts(hub, g);
  return [];
}

/** A protocol on a record's page, with the record that brought it there when that is not the page itself. */
export type ProtocolMember = { protocol: Protocol; via?: Entity };

/** Protocol domains a supportive medicine can bring to a cancer page: the ones about giving that medicine well. */
const SUPPORTIVE_ROUTE_DOMAINS: ReadonlySet<Protocol["domain"]> = new Set(["supportive-care", "symptom-management", "nutrition", "palliative", "survivorship"]);

/** A medicine given to treat or prevent what other treatment causes: tagged `supportive`, or a corticosteroid. */
const supportiveMedicine = (d: Drug) => d.tags.includes("supportive") || /\b(?:gluco)?corticosteroid\b|\bglucocorticoid\b/i.test(d.modality);

/**
 * Whether a cancer's treatment brings a protocol to the cancer's page. The protocol must name the treatment as one of
 * its own medicines or devices, not only in `related` or `terms`: the antiemetic protocol named cisplatin only in
 * `related`, as did the diarrhoea protocols octreotide, which put them on neuroendocrine pages through a cancer
 * treatment they use as a remedy. A supportive medicine (`supportiveMedicine`) brings only the supportive, symptom,
 * nutrition, palliative and survivorship protocols: dexamethasone, listed on the triple-negative breast cancer record as
 * an antiemetic, otherwise put CRS, ICANS and IEC-HS management on that page, and prednisone in R-CHOP put the
 * immune-related toxicity protocols on lymphoma pages, because those protocols treat with them (11 November 2026).
 * The emergencies and toxicities a steroid treats come to a page through what causes them.
 */
export function reachesThrough(p: Protocol, via: Entity): boolean {
  if (via.kind === "drug") return p.drugs.includes(via.id) && (!supportiveMedicine(via) || SUPPORTIVE_ROUTE_DOMAINS.has(p.domain));
  if (via.kind === "technology") return p.technologies.includes(via.id);
  return false;
}

/**
 * The care protocols a record page lists (docs/PROTOCOLS.md), from structured fields only:
 *
 * - **Any record**: every protocol whose relation arrays name it (the graph backlink): a drug its administration
 *   protocols, a device such as `implanted-ports` its care protocols, a glossary term the protocols filed under it.
 * - **A cancer**, as well: protocols naming a cancer above it in the family (a breast cancer protocol is on the
 *   triple-negative page), and protocols naming a medicine or technology the cancer's own record lists (in its
 *   relation arrays or its standard-of-care rows), each with that record as `via` so the page can say why (`reachesThrough` says which count), unless
 *   the protocol is scoped to other cancers only (it names cancers, none of them in this cancer's family). A protocol
 *   naming no cancer and none of the cancer's treatments is general and is not repeated on every cancer page; it is
 *   on /protocols/.
 *
 * Ordered by domain (care-pathway order), then name; direct links before the ones reached through a treatment.
 */
export function protocolsFor(e: Entity, g: Graph = graph()): ProtocolMember[] {
  const out = new Map<string, ProtocolMember>();
  const direct = (id: string) => (g.incoming(id).get("protocol") ?? []) as Protocol[];
  for (const p of direct(e.id)) out.set(p.id, { protocol: p });
  if (e.kind === "cancer") {
    let parent = (e as Cancer).parent;
    for (let hops = 0; parent && hops < 8; hops++) {
      for (const p of direct(parent)) if (!out.has(p.id)) out.set(p.id, { protocol: p });
      const up = g.get(parent);
      parent = up?.kind === "cancer" ? up.parent : undefined;
    }
    // A protocol scoped to other cancers is not this cancer's, even when it shares a treatment: breast radiotherapy
    // positioning names breast cancer and imrt-igrt, and reached the prostate page through imrt-igrt, as colorectal
    // follow-up did through the survivorship care plan (11 November 2026, when the fill rounds took the corpus to 190
    // protocols). It still counts when it names this cancer's family above or below it.
    const ancestors = (id: string): string[] => {
      const out: string[] = [];
      let up = g.get(id);
      for (let hops = 0; up?.kind === "cancer" && up.parent && hops < 8; hops++) { out.push(up.parent); up = g.get(up.parent); }
      return out;
    };
    const family = new Set([e.id, ...ancestors(e.id)]);
    const scopedElsewhere = (p: Protocol) => p.cancers.length > 0 && !p.cancers.some((id) => family.has(id) || ancestors(id).includes(e.id));
    const treatments = [...new Set([...e.drugs, ...e.technologies, ...e.standardOfCare.flatMap((s) => s.refs)])];
    for (const id of treatments) {
      const via = g.get(id);
      if (!via || (via.kind !== "drug" && via.kind !== "technology")) continue;
      for (const p of direct(id)) if (!out.has(p.id) && !scopedElsewhere(p) && reachesThrough(p, via)) out.set(p.id, { protocol: p, via });
    }
  }
  const order = (m: ProtocolMember) => PROTOCOL_DOMAINS.indexOf(m.protocol.domain);
  return [...out.values()].sort((a, b) => Number(!!a.via) - Number(!!b.via) || order(a) - order(b) || a.protocol.name.localeCompare(b.protocol.name));
}

/**
 * The Connected groups of a record page, less what the page's own sections already list. On a readout page the tests
 * and the treatments it selects have their own sections above, so Connected keeps only the products it alone shows.
 */
export function connectedGroups(e: Entity, g: Graph = graph()): Map<Kind, Entity[]> {
  const groups = g.neighbours(e.id);
  // A record whose page has a Protocols section (protocolsFor) does not list the same protocols again in Connected.
  if (e.kind !== "protocol" && groups.has("protocol")) {
    const shown = new Set(protocolsFor(e, g).map((m) => m.protocol.id));
    const rest = groups.get("protocol")!.filter((p) => !shown.has(p.id));
    if (rest.length) groups.set("protocol", rest); else groups.delete("protocol");
  }
  // A protocol page lists its upgrades in their own block; Connected keeps only the other ideas.
  if (e.kind === "protocol" && e.upgrades.length && groups.has("idea")) {
    const rest = groups.get("idea")!.filter((i) => !e.upgrades.includes(i.id));
    if (rest.length) groups.set("idea", rest); else groups.delete("idea");
  }
  if (e.kind !== "biomarker") return groups;
  const m = biomarkerMembers(e, g);
  const shown = new Set<string>([...m.tests.map((i) => i.record?.id).filter((x): x is string => !!x), ...m.treatments.map((d) => d.id)]);
  const drugs = (groups.get("drug") ?? []).filter((d) => !shown.has(d.id));
  const out = new Map(groups);
  if (drugs.length) out.set("drug", drugs); else out.delete("drug");
  return out;
}

/** Readout ids whose test list holds each product record or tumour-testing row id, for the reverse links. */
let measuredBy: Map<string, string[]> | undefined;
export function readoutsMeasuredBy(id: string): string[] {
  if (!measuredBy) {
    measuredBy = new Map();
    const add = (k: string, bm: string) => { const l = measuredBy!.get(k) ?? []; if (!l.includes(bm)) l.push(bm); measuredBy!.set(k, l); };
    for (const bm of graph().kind("biomarker")) for (const it of biomarkerMembers(bm).tests) {
      if (it.record) add(it.record.id, bm.id);
      for (const r of it.rows) add(r.id, bm.id);
    }
  }
  return measuredBy.get(id) ?? [];
}
