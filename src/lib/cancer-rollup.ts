import { graph } from "./graph";
import { centreInputsFor } from "./centre-table";
import type { Cancer, Entity } from "./schema";

/**
 * The family roll-up (docs/CANCER-FAMILIES.md).
 *
 * A cancer family page used to show only the records attached to the family record itself. A trial in non-small-cell
 * lung cancer is attached to `nsclc`, not to `lung-cancer`, which is right as data and wrong as a page: the reader who
 * lands on the family is exactly the one who does not yet know which type they have, and 796 of lung cancer's 851 trials
 * were invisible to her. Re-tagging the records onto the family would be a lie (and would break the page budgets), so
 * the fix lives here, in what the page shows.
 *
 * The rule: a family page surfaces its descendants' **trials, medicines and expert centres** as a labelled roll-up that
 * names the subtype each came from, and surfaces nothing else. Prose, standard-of-care rows, milestones, key papers and
 * open problems stay where they were written; copying those onto the parent is the duplication three review passes have
 * spent their effort undoing.
 *
 * Shape: one group per direct child that contributes, holding the records attached to that child or to anything under
 * it along the `parent` chain, minus anything already attached to the family (no repetition on the page). A record
 * that two children share appears under both, because it is genuinely relevant to both. The renderer names the first
 * `ROLLUP_ITEM_CAP` of a group and links the rest into the child's own page, so the markup grows with the number of
 * subtypes rather than with the number of trials; `rollupEstimate` reports that weight to the section registry, which
 * is what sends a heavy family's Evidence section to its own page.
 */

export const ROLLUP_KINDS = ["trial", "drug", "institution"] as const;
export type RollupKind = (typeof ROLLUP_KINDS)[number];

/** Records named per subtype before the "and N more" link into that subtype's own page. */
export const ROLLUP_ITEM_CAP = 8;

export type RollupItem = { e: Entity; /** The descendant the record is attached to: the child itself, or a type under it. */ via: Cancer };
export type RollupGroup = { child: Cancer; items: RollupItem[] };
export type Rollup = {
  kind: RollupKind;
  /** One per direct child that contributes, largest first. */
  groups: RollupGroup[];
  /** Distinct records across the groups (a shared record is counted once). */
  total: number;
};

type G = ReturnType<typeof graph>;

/** Records of one kind attached to one cancer, in the same selection the cancer's own page renders. */
export function recordsOn(c: Cancer, kind: RollupKind, g: G = graph()): Entity[] {
  if (kind === "trial") return g.incoming(c.id).get("trial") ?? [];
  if (kind === "drug") return g.forCancer(c.id).get("drug") ?? [];
  return centreInputsFor(c).map((i) => i.inst);
}

const childIndex = new WeakMap<G, Map<string, Cancer[]>>();
function childMap(g: G): Map<string, Cancer[]> {
  let m = childIndex.get(g);
  if (m) return m;
  m = new Map();
  for (const c of g.kind("cancer")) if (c.parent) m.set(c.parent, [...(m.get(c.parent) ?? []), c]);
  for (const list of m.values()) list.sort((a, b) => a.name.localeCompare(b.name));
  childIndex.set(g, m);
  return m;
}

/** The cancers whose `parent` is this one, by name. */
export function childrenOf(c: Cancer, g: G = graph()): Cancer[] {
  return childMap(g).get(c.id) ?? [];
}

/** Everything under a cancer along the `parent` chain, nearest first. Cycle-safe; the cancer itself is not included. */
export function descendantsOf(c: Cancer, g: G = graph()): Cancer[] {
  const out: Cancer[] = [];
  const seen = new Set<string>([c.id]);
  for (let queue = childrenOf(c, g); queue.length; ) {
    const next: Cancer[] = [];
    for (const x of queue) {
      if (seen.has(x.id)) continue;
      seen.add(x.id);
      out.push(x);
      next.push(...childrenOf(x, g));
    }
    queue = next;
  }
  return out;
}

/** True for a cancer with types of its own: the pages the roll-up is for. */
export const isFamily = (c: Cancer, g: G = graph()) => childrenOf(c, g).length > 0;

const rollupCache = new WeakMap<G, Map<string, Rollup>>();

/** The roll-up of one kind for one family: the descendants' records the family record does not carry, grouped by child. */
export function familyRollup(c: Cancer, kind: RollupKind, g: G = graph()): Rollup {
  const cache = rollupCache.get(g) ?? rollupCache.set(g, new Map()).get(g)!;
  const key = `${c.id}:${kind}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const own = new Set(recordsOn(c, kind, g).map((e) => e.id));
  const groups: RollupGroup[] = [];
  const total = new Set<string>();
  for (const child of childrenOf(c, g)) {
    const items = new Map<string, RollupItem>();
    for (const d of [child, ...descendantsOf(child, g)]) {
      for (const e of recordsOn(d, kind, g)) {
        if (own.has(e.id) || items.has(e.id)) continue;
        items.set(e.id, { e, via: d });
        total.add(e.id);
      }
    }
    if (items.size) groups.push({ child, items: [...items.values()] });
  }
  groups.sort((a, b) => b.items.length - a.items.length || a.child.name.localeCompare(b.child.name));
  const out: Rollup = { kind, groups, total: total.size };
  cache.set(key, out);
  return out;
}

/**
 * The weight of a rendered roll-up, for the section registry's placement estimate. Per-group and per-named-record
 * costs measured on the six affected families (src/lib/cancer-rollup.test.ts holds them to these numbers), so a
 * family that gains subtypes gains weight here and its section pages itself.
 */
export function rollupEstimate(c: Cancer, kind: RollupKind, g: G = graph()): { rows: number; kb: number } {
  const roll = familyRollup(c, kind, g);
  if (!roll.total) return { rows: 0, kb: 0 };
  const named = roll.groups.reduce((n, grp) => n + Math.min(ROLLUP_ITEM_CAP, grp.items.length), 0);
  return { rows: named + roll.groups.length, kb: 1 + roll.groups.length * 0.45 + named * 0.2 };
}
