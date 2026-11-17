/**
 * Side effect -> care protocol -> red card: how much of the chain exists.
 *
 * Reproduces section 3 of docs/proposals/cross-links-census-2026-11.md, whose own scripts were throwaway, so that
 * the figures before and after a change are measured the same way. The rule, as that section states it:
 *
 *   side effect        one distinct normalised `drug.toxicity[].event`: lower-cased, bracketed qualifiers removed,
 *                      whitespace collapsed. Its group is `symptomGroup()`.
 *   reaches a protocol for at least one product carrying it, /side-effects/ shows a protocol beside that product:
 *                      what `symptomProtocols()` returns for the group, a general one or one listing the product.
 *   red card, linked   a red-flag set names the protocol in `concernIds`, or one of its lines does in `protocols`
 *                      (the line-level link was added on 16 November 2026; before it, `concernIds` was the only one).
 *   red card, topical  a red-flag line, in any set, falls in a group the protocol is listed under. For an event:
 *                      a set that applies to one of its products (or the general set) has a line in its group.
 *                      Approximate: it reads the first symptom a line names, and puts tamoxifen's vaginal bleeding
 *                      beside the low-platelet protocol. The linked figure is the one to trust.
 *   on its own card    stricter than the census: the linking line is in a set that applies to a product carrying the
 *                      event (or in the general set), so the reader of that product's card meets the protocol.
 *
 *   npx tsx scripts/measure-side-effect-chain.ts            the counts table
 *   npx tsx scripts/measure-side-effect-chain.ts --gaps     and every side effect that reaches no protocol
 *   npx tsx scripts/measure-side-effect-chain.ts --json     everything, as JSON
 */
import { graph } from "../src/lib/graph";
import { buildSideEffectIndex, SYMPTOM_GROUPS, SYMPTOM_PROTOCOLS, symptomGroup, symptomProtocols, type SideEffectRow } from "../src/lib/side-effects";
import { GENERAL_RED_FLAGS, redFlagSets, redFlagsFor } from "../src/data/red-flags";

export function normaliseEvent(event: string): string {
  return event.toLowerCase().replace(/\([^)]*\)|\[[^\]]*\]/g, " ").replace(/\s+/g, " ").trim();
}

export type SideEffectGap = { event: string; group: string; products: number; examples: string[] };

export type SideEffectChain = {
  rows: number;
  rowsWithProtocol: number;
  events: number;
  eventsWithProtocol: number;
  groups: number;
  groupsWithEntry: number;
  protocols: number;
  protocolsLinked: number;
  protocolsTopical: number;
  eventsChainLinked: number;
  eventsChainTopical: number;
  eventsChainEither: number;
  eventsChainOnOwnCard: number;
  productsWithToxicity: number;
  productsWithUnprotocolledRow: number;
  /** Side effects that reach no protocol, most products first. */
  gaps: SideEffectGap[];
  /** Protocols in SYMPTOM_PROTOCOLS that no red card reaches, linked or topical. */
  protocolsWithNoRedCard: string[];
};

export function measureSideEffectChain(): SideEffectChain {
  const g = graph();
  const rows = buildSideEffectIndex();
  const byGroup = symptomProtocols(rows);

  /** The protocols /side-effects/ shows beside this product in this row's group. */
  const protocolsForRow = (r: SideEffectRow): string[] => (byGroup[r.group] ?? []).filter((p) => p.general || p.drugs.includes(r.drugId)).map((p) => p.id);

  // Red cards. Linked: named in a set's concernIds. Topical: by the group of each line's symptom.
  const allSets = [GENERAL_RED_FLAGS, ...redFlagSets];
  const lineLinks = new Map(allSets.map((s) => [s.id, new Set(s.flags.flatMap((f) => f.protocols ?? []))]));
  const linked = new Set([...redFlagSets.flatMap((s) => s.concernIds ?? []), ...[...lineLinks.values()].flatMap((x) => [...x])]);
  const flagGroupsAnywhere = new Set(allSets.flatMap((s) => s.flags.map((f) => symptomGroup(f.symptom))));
  const setGroups = new Map(allSets.map((s) => [s.id, new Set(s.flags.map((f) => symptomGroup(f.symptom)))]));

  const groupsOfProtocol = new Map<string, Set<string>>();
  for (const [group, spec] of Object.entries(SYMPTOM_PROTOCOLS)) for (const id of [...(spec.general ?? []), ...(spec.specific ?? [])]) {
    const set = groupsOfProtocol.get(id) ?? new Set<string>();
    set.add(group);
    groupsOfProtocol.set(id, set);
  }
  const protocolIds = [...groupsOfProtocol.keys()];
  const topicalProtocol = (id: string) => [...(groupsOfProtocol.get(id) ?? [])].some((gr) => flagGroupsAnywhere.has(gr));

  type Ev = { event: string; group: string; products: Set<string>; protocols: Set<string>; topical: boolean; ownCard: boolean };
  const events = new Map<string, Ev>();
  const unprotocolledProducts = new Set<string>();
  let rowsWithProtocol = 0;
  for (const r of rows) {
    const key = normaliseEvent(r.event);
    const ev = events.get(key) ?? { event: key, group: r.group, products: new Set<string>(), protocols: new Set<string>(), topical: false, ownCard: false };
    ev.products.add(r.drugId);
    const ps = protocolsForRow(r);
    for (const p of ps) ev.protocols.add(p);
    if (ps.length) rowsWithProtocol++; else unprotocolledProducts.add(r.drugId);
    const d = g.get(r.drugId);
    const sets = [GENERAL_RED_FLAGS, ...(d?.kind === "drug" ? redFlagsFor(d.id, d.modality) : [])];
    if (sets.some((s) => setGroups.get(s.id)?.has(r.group))) ev.topical = true;
    if (sets.some((s) => ps.some((id) => lineLinks.get(s.id)?.has(id)))) ev.ownCard = true;
    events.set(key, ev);
  }
  const evs = [...events.values()];
  // The groups the corpus uses: one group the rules can produce (rhabdomyolysis) has no row.
  const presentGroups = SYMPTOM_GROUPS.filter((gr) => rows.some((r) => r.group === gr));
  const withProtocol = evs.filter((e) => e.protocols.size);
  const chainLinked = withProtocol.filter((e) => [...e.protocols].some((p) => linked.has(p)));
  const chainTopical = withProtocol.filter((e) => e.topical);
  const nameOf = (id: string) => g.get(id)?.name ?? id;

  return {
    rows: rows.length,
    rowsWithProtocol,
    events: evs.length,
    eventsWithProtocol: withProtocol.length,
    groups: presentGroups.length,
    groupsWithEntry: presentGroups.filter((gr) => SYMPTOM_PROTOCOLS[gr]).length,
    protocols: protocolIds.length,
    protocolsLinked: protocolIds.filter((p) => linked.has(p)).length,
    protocolsTopical: protocolIds.filter(topicalProtocol).length,
    eventsChainLinked: chainLinked.length,
    eventsChainTopical: chainTopical.length,
    eventsChainEither: new Set([...chainLinked, ...chainTopical]).size,
    eventsChainOnOwnCard: withProtocol.filter((e) => e.ownCard).length,
    productsWithToxicity: new Set(rows.map((r) => r.drugId)).size,
    productsWithUnprotocolledRow: unprotocolledProducts.size,
    gaps: evs.filter((e) => !e.protocols.size)
      .map((e) => ({ event: e.event, group: e.group, products: e.products.size, examples: [...e.products].sort().slice(0, 3).map(nameOf) }))
      .sort((a, b) => b.products - a.products || a.group.localeCompare(b.group) || a.event.localeCompare(b.event)),
    protocolsWithNoRedCard: protocolIds.filter((p) => !linked.has(p) && !topicalProtocol(p)).sort(),
  };
}

if (require.main === module) {
  const m = measureSideEffectChain();
  if (process.argv.includes("--json")) { console.log(JSON.stringify(m, null, 2)); process.exit(0); }
  const pct = (a: number, b: number) => `${((100 * a) / b).toFixed(1)}%`;
  const line = (label: string, a: number, b: number) => console.log(`| ${label} | ${a} | ${b} | ${pct(a, b)} |`);
  console.log("| Measure | Exists | Should exist | Share |\n|---|---:|---:|---:|");
  line("Toxicity rows (product, event) with a protocol shown", m.rowsWithProtocol, m.rows);
  line("Distinct events with a protocol for at least one carrying product", m.eventsWithProtocol, m.events);
  line("Symptom groups with any entry in `SYMPTOM_PROTOCOLS`", m.groupsWithEntry, m.groups);
  line("Side-effect protocols named by a red card (`concernIds` or a line's `protocols`)", m.protocolsLinked, m.protocols);
  line("Side-effect protocols with a topical red-flag line", m.protocolsTopical, m.protocols);
  line("Events with the full chain, linked", m.eventsChainLinked, m.events);
  line("Events with the full chain, topical", m.eventsChainTopical, m.events);
  line("Events with the full chain, either way", m.eventsChainEither, m.events);
  line("Events whose protocol is named on a card of a product carrying them", m.eventsChainOnOwnCard, m.events);
  console.log(`| Products with toxicity data and at least one row that has no protocol | ${m.productsWithUnprotocolledRow} | ${m.productsWithToxicity} | |`);
  console.log(`\nProtocols no red card reaches (${m.protocolsWithNoRedCard.length}): ${m.protocolsWithNoRedCard.join(", ")}`);
  if (process.argv.includes("--gaps")) {
    console.log(`\nSide effects that reach no protocol (${m.gaps.length}):`);
    for (const x of m.gaps) console.log(`${x.products}\t${x.group}\t${x.event}\t(${x.examples.join(", ")})`);
  }
}
