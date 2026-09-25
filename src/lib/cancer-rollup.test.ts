import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { graph } from "./graph";
import { routeFor } from "./kinds";
import { childrenOf, descendantsOf, familyRollup, isFamily, recordsOn, ROLLUP_ITEM_CAP, ROLLUP_KINDS, type RollupKind } from "./cancer-rollup";
import { sectionPlan } from "./record-sections";
import { CancerSection } from "@/components/CancerRecord";
import { FamilyRollup } from "@/components/FamilyRollup";
import type { Cancer } from "./schema";

/**
 * The family roll-up (docs/CANCER-FAMILIES.md).
 *
 * A family page showed only the records attached to the family record itself, so the 796 lung cancer trials attached
 * to NSCLC, SCLC and mesothelioma were invisible to the reader who had not yet worked out which type she had. The fix
 * is a view, not a re-tagging: each family page rolls up its descendants' trials, medicines and expert centres, named
 * by the subtype they came from. This test fails when a family page hides more than `MAX_HIDDEN_SHARE` of what its
 * subtypes hold, so the defect cannot come back quietly, and it holds the roll-up to a per-group and per-record
 * markup cost rather than to a total that would have to be raised every time the corpus learns something.
 */

vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));
const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const bare = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));
const bytes = (s: string) => Buffer.byteLength(s, "utf8");
/** Every address the markup links to, without the trailing slash Link drops when it renders. */
const hrefs = (html: string) => new Set([...html.matchAll(/href="([^"#]+)/g)].map((m) => m[1].replace(/\/$/, "")));
const linksTo = (set: ReadonlySet<string>, route: string) => set.has(route.replace(/\/$/, ""));

/** At most this share of a family's subtype records may be neither named on the page nor inside a counted group. */
const MAX_HIDDEN_SHARE = 0.05;
/** The section that carries each kind's roll-up, and the record kind it lists. */
const OWNER: Record<RollupKind, "evidence" | "coming" | "where-you-are"> = { trial: "evidence", drug: "coming", institution: "where-you-are" };
/** The six families measured on 25 September 2026: the ones whose subtypes held more than the family record did. */
const FAMILIES = ["lung-cancer", "colorectal", "breast-cancer", "leukaemia", "skin-cancer", "brain-tumours"];

const g = graph();
const cancer = (id: string): Cancer => { const c = g.must(id); if (c.kind !== "cancer") throw new Error(id); return c; };
const families = g.kind("cancer").filter((c) => isFamily(c, g));

/** What the subtypes of a family hold and the family record does not: the ids a family page used to hide. */
function hiddenOn(c: Cancer, kind: RollupKind): Set<string> {
  const own = new Set(recordsOn(c, kind, g).map((e) => e.id));
  const out = new Set<string>();
  for (const d of descendantsOf(c, g)) for (const e of recordsOn(d, kind, g)) if (!own.has(e.id)) out.add(e.id);
  return out;
}

describe("the family tree", () => {
  it("reads children from the parent field and descends the chain without looping", () => {
    const lung = cancer("lung-cancer");
    expect(childrenOf(lung, g).map((x) => x.id)).toContain("nsclc");
    const deep = descendantsOf(lung, g);
    expect(deep.map((x) => x.id)).toContain("nsclc");
    // NSCLC's own subtypes are lung cancer's descendants, which is why the roll-up descends rather than stopping at the children.
    expect(deep.length).toBeGreaterThan(childrenOf(lung, g).length);
    expect(deep.some((x) => x.id === lung.id)).toBe(false);
    expect(new Set(deep.map((x) => x.id)).size).toBe(deep.length);
    // Every family in the corpus descends to a finite set; a cycle in `parent` would hang or repeat.
    for (const f of families) expect(descendantsOf(f, g).length).toBeGreaterThan(0);
  });

  it("has 86 families, and the six measured ones are among them", () => {
    expect(families.length).toBeGreaterThanOrEqual(86);
    for (const id of FAMILIES) expect(families.some((f) => f.id === id), id).toBe(true);
  });
});

describe("the roll-up model", () => {
  it("accounts for every record the subtypes hold and the family does not, with no duplication of the family's own", () => {
    for (const c of families) for (const kind of ROLLUP_KINDS) {
      const hidden = hiddenOn(c, kind);
      const roll = familyRollup(c, kind, g);
      expect(roll.total, `${c.id} ${kind}`).toBe(hidden.size);
      const own = new Set(recordsOn(c, kind, g).map((e) => e.id));
      const seen = new Set<string>();
      for (const grp of roll.groups) {
        expect(grp.items.length, `${c.id} ${kind} empty group`).toBeGreaterThan(0);
        expect(grp.child.parent, `${c.id} ${kind} group is a child`).toBe(c.id);
        for (const it of grp.items) {
          expect(own.has(it.e.id), `${c.id} ${kind} repeats its own ${it.e.id}`).toBe(false);
          expect(hidden.has(it.e.id), `${c.id} ${kind} invents ${it.e.id}`).toBe(true);
          // The record says which subtype it is attached to: the child itself or something under it.
          expect(it.via.id === grp.child.id || descendantsOf(grp.child, g).some((d) => d.id === it.via.id), `${it.e.id} via`).toBe(true);
          seen.add(it.e.id);
        }
      }
      expect(seen.size).toBe(hidden.size);
      // Largest group first: the subtype that holds most of the field is the first thing a reader sees.
      expect(roll.groups.map((x) => x.items.length)).toEqual([...roll.groups.map((x) => x.items.length)].sort((a, b) => b - a));
    }
  }, 300_000);

  it("is empty for a cancer with no subtypes", () => {
    const leaf = g.kind("cancer").find((c) => !isFamily(c, g))!;
    for (const kind of ROLLUP_KINDS) expect(familyRollup(leaf, kind, g).total, leaf.id).toBe(0);
  });
});

describe("what a family page shows", () => {
  for (const id of FAMILIES) {
    it(`${id} surfaces its subtypes' trials, medicines and centres`, () => {
      const c = cancer(id);
      const plan = sectionPlan(c, g);
      for (const kind of ROLLUP_KINDS) {
        const hidden = hiddenOn(c, kind);
        if (!hidden.size) continue;
        const p = plan.find((x) => x.def.id === OWNER[kind])!;
        const html = bare(createElement(CancerSection, { c, id: p.def.id, plan: p }));
        const linked = hrefs(html);
        const roll = familyRollup(c, kind, g);
        let reachable = 0;
        for (const grp of roll.groups) {
          const shown = html.includes(`data-rollup-child="${grp.child.id}"`);
          const named = grp.items.filter((it) => linksTo(linked, routeFor(it.e))).length;
          if (!shown) continue;
          // Named on the page, or inside a group that carries the count and the link into the subtype's own page.
          expect(named, `${id} ${kind} ${grp.child.id} named`).toBeGreaterThanOrEqual(Math.min(ROLLUP_ITEM_CAP, grp.items.length));
          if (grp.items.length > ROLLUP_ITEM_CAP) expect(html, `${id} ${kind} ${grp.child.id} more link`).toContain(`and ${grp.items.length - ROLLUP_ITEM_CAP} more`);
          reachable += grp.items.length;
        }
        const share = (hidden.size - reachable) / hidden.size;
        expect(share, `${id} hides ${(share * 100).toFixed(0)}% of its subtypes' ${kind} records`).toBeLessThanOrEqual(MAX_HIDDEN_SHARE);
      }
    }, 600_000);
  }

  /**
   * The furniture each piece of a roll-up costs, measured 25 September 2026: a chip 260 bytes around the record's
   * name, a subtype group 500 bytes for its card, heading, link and count, and the block itself 600 for its heading
   * and its opening line. A budget that is a total would have to be raised every time a family gains a subtype, which
   * would measure the corpus rather than the page; these measure the page. A chip that gains a wrapper fails here
   * however small the family, and a wave that fills a family with trials passes, because the cap holds the chips.
   */
  const CHIP_BYTES = 260, GROUP_BYTES = 500, BLOCK_BYTES = 600;

  it("costs a fixed amount per subtype group and per named record, so it grows with the taxonomy and not with the corpus", () => {
    for (const c of families) {
      for (const kind of ROLLUP_KINDS) {
        const roll = familyRollup(c, kind, g);
        if (!roll.total) continue;
        const html = bare(createElement(FamilyRollup, { c, kind }));
        const groups = (html.match(/data-rollup-child="/g) ?? []).length;
        const chips = (html.match(/<a /g) ?? []).length;
        expect(groups, `${c.id} ${kind} groups`).toBe(roll.groups.length);
        // A group names at most the cap, plus its heading link and its "and N more" link, whatever the subtype holds.
        expect(chips, `${c.id} ${kind} links`).toBeLessThanOrEqual(roll.groups.length * (ROLLUP_ITEM_CAP + 2));
        const names = roll.groups.reduce((n, grp) => n + bytes(grp.child.name) + grp.items.slice(0, ROLLUP_ITEM_CAP).reduce((m, it) => m + bytes(it.e.name), 0), 0);
        const allowed = names + chips * CHIP_BYTES + groups * GROUP_BYTES + BLOCK_BYTES;
        expect(bytes(html), `${c.id} ${kind}: ${(bytes(html) / 1024).toFixed(1)} KB against ${(allowed / 1024).toFixed(1)} KB of names and furniture`).toBeLessThanOrEqual(allowed);
      }
    }
  }, 600_000);

  it("is wired to the `parent` field and not to a list, so a family nobody measured behaves the same", () => {
    // Sarcoma is in none of the lists above and holds the largest roll-up in the corpus.
    const c = cancer("sarcoma");
    for (const kind of ROLLUP_KINDS) {
      const roll = familyRollup(c, kind, g);
      expect(roll.total, `sarcoma ${kind}`).toBeGreaterThan(0);
      const p = sectionPlan(c, g).find((x) => x.def.id === OWNER[kind])!;
      const html = bare(createElement(CancerSection, { c, id: p.def.id, plan: p }));
      const linked = hrefs(html);
      for (const grp of roll.groups) {
        expect(html, `sarcoma ${kind} ${grp.child.id}`).toContain(`data-rollup-child="${grp.child.id}"`);
        expect(grp.items.filter((it) => linksTo(linked, routeFor(it.e))).length).toBeGreaterThanOrEqual(Math.min(ROLLUP_ITEM_CAP, grp.items.length));
      }
    }
  }, 600_000);

  it("tells the section registry what it weighs, so a heavy family pages its Evidence section", () => {
    const lung = sectionPlan(cancer("lung-cancer"), g).find((p) => p.def.id === "evidence")!;
    expect(lung.placement).toBe("page");
    expect(lung.counts.some((x) => x.label.endsWith("in the subtypes") && x.n > 0)).toBe(true);
    // A cancer with no subtypes carries no roll-up count at all.
    const leaf = g.kind("cancer").find((c) => !isFamily(c, g))!;
    for (const p of sectionPlan(leaf, g)) expect(p.counts.some((x) => x.label.endsWith("in the subtypes"))).toBe(false);
  });
});
