import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "@/app/layout";
import EntityPage from "@/app/[kind]/[id]/page";
import SectionPage, { generateStaticParams as sectionParams } from "@/app/cancers/[id]/[section]/page";
import { graph } from "@/lib/graph";
import { HUB_BUDGET_KB, INLINE_MAX_KB, SECTIONS, SECTION_IDS, SUBPAGE_BUDGET_KB, anchorHref, cancerAnchorHref, forwardedAnchors, pagedSectionParams, sectionForAnchor, sectionPlan, sectionsJson, type SectionId } from "./record-sections";
import { CancerSection } from "@/components/CancerRecord";

/**
 * The section model of a cancer record (docs/INFORMATION-ARCHITECTURE.md): ten sections in a fixed order, each
 * inline on the hub or on its own page by a weight estimate taken from the data. This test keeps the registry sound
 * (order, unique ids and anchors), keeps the hub and the section pages inside their markup budgets on the heaviest
 * cancers (gallbladder and TNBC are the spikes; NSCLC and pancreatic the largest legacy records), keeps a small rare
 * cancer whole on its hub, and keeps every deep link written in the corpus resolving: a hash on a cancer page is
 * either an element the hub renders or an anchor the hub forwards to the section page that renders it.
 */

vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));
const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const inLayout = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const bare = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, el));
const KB = 1024;
const kb = (s: string) => Buffer.byteLength(s, "utf8") / KB;
const hub = (id: string) => EntityPage({ params: Promise.resolve({ kind: "cancers", id }) });
const page = (id: string, section: string) => SectionPage({ params: Promise.resolve({ id, section }) });
const cancer = (id: string) => { const c = graph().must(id); if (c.kind !== "cancer") throw new Error(id); return c; };

const HEAVY = ["gallbladder", "tnbc", "nsclc", "pancreatic", "colorectal", "lung-cancer", "prostate"];
/** A rare cancer with little behind it: everything but the record-list sections should stay on the hub. */
const SMALL = "gallbladder-papillary-carcinoma";
/** The sections that are pages for every cancer (`alwaysPage` in the registry), in story order. */
const ALWAYS_PAGED: SectionId[] = ["where-you-are", "coming", "data"];

describe("section registry", () => {
  it("lists the ten sections once each, in story order, with unique anchors and a purpose", () => {
    expect(SECTIONS.map((s) => s.id)).toEqual([...SECTION_IDS]);
    expect(new Set(SECTIONS.map((s) => s.id)).size).toBe(10);
    expect(SECTIONS[0].id).toBe("overview");
    expect(SECTIONS[0].pinned).toBe(true);
    expect(SECTIONS.at(-1)!.id).toBe("data");
    const anchors = SECTIONS.flatMap((s) => s.anchors);
    expect(new Set(anchors).size, "anchors are unique across sections").toBe(anchors.length);
    for (const s of SECTIONS) {
      expect(s.title.length).toBeGreaterThan(2);
      expect(s.purpose).toMatch(/\.$/);
      expect(s.fields.length + s.patches.length).toBeGreaterThan(0);
      // A section id is never also an anchor of another section (sectionForAnchor would be ambiguous).
      expect(anchors.includes(s.id), s.id).toBe(false);
    }
  });

  it("maps every tab id of the previous layout to a section", () => {
    for (const legacy of ["care", "biology", "history", "changes", "pipeline", "trials", "centres", "questions", "relevant", "key-papers", "papers", "notes", "geography", "overview"]) {
      expect(sectionForAnchor(legacy), legacy).toBeDefined();
      expect(sectionForAnchor(`sec-${legacy}`), `sec-${legacy}`).toBe(sectionForAnchor(legacy));
    }
  });

  it("plans a small cancer on its hub bar the three record-list sections, and sends the heavy sections of the spikes to pages", () => {
    const small = sectionPlan(cancer(SMALL));
    // Related pages, In development and Expert centres are lists of other records and grow with the corpus: always a page.
    expect(small.filter((p) => p.placement === "page").map((p) => p.def.id)).toEqual(ALWAYS_PAGED);
    expect(SECTIONS.filter((s) => s.alwaysPage).map((s) => s.id)).toEqual(ALWAYS_PAGED);
    for (const id of ["gallbladder", "nsclc"]) {
      const plan = sectionPlan(cancer(id));
      expect(plan.find((p) => p.def.id === "overview")!.placement).toBe("inline");
      const paged = plan.filter((p) => p.placement === "page").map((p) => p.def.id);
      expect(paged, `${id} pages`).toContain("evidence");
      expect(paged, `${id} pages`).toContain("data");
      // Wave 4 (25 Sept 2026) gave lung ten histology pages, so What it is now pages for NSCLC as well: eight of ten sections page there.
      expect(paged.length, `${id} keeps the first sections inline`).toBeLessThanOrEqual(8);
    }
    // The route list the [section] page is generated from is exactly the paged sections.
    const params = sectionParams();
    expect(params).toEqual(pagedSectionParams());
    expect(params.some((p) => p.id === "gallbladder" && p.section === "evidence")).toBe(true);
    expect(params.filter((p) => p.id === SMALL).map((p) => p.section)).toEqual(ALWAYS_PAGED);
  });

  it("sections.json carries every section with its route, counts and anchors", () => {
    const c = cancer("gallbladder");
    const json = sectionsJson(c) as { sections: Array<{ id: string; placement: string; route: string | null; href: string; anchors: string[]; counts: Record<string, number> }> };
    expect(json.sections.map((s) => s.id)).toEqual([...SECTION_IDS]);
    for (const s of json.sections) {
      if (s.placement === "page") { expect(s.route).toBe(`/cancers/gallbladder/${s.id}/`); expect(s.href).toBe(s.route); }
      else { expect(s.route).toBeNull(); expect(s.href).toBe(`/cancers/gallbladder/#${s.id}`); }
      for (const a of s.anchors) expect(a.startsWith(s.placement === "page" ? s.route! : "/cancers/gallbladder/#")).toBe(true);
    }
    expect(json.sections.find((s) => s.id === "evidence")!.counts.trials).toBeGreaterThan(0);
  });
});

describe("budgets", () => {
  for (const id of HEAVY) {
    it(`${id}: the hub is under ${HUB_BUDGET_KB} KB of markup and each section page under ${SUBPAGE_BUDGET_KB} KB`, async () => {
      const c = cancer(id);
      const html = inLayout(await hub(id));
      expect(kb(html), `${id} hub ${kb(html).toFixed(0)} KB`).toBeLessThan(HUB_BUDGET_KB);
      const plan = sectionPlan(c);
      for (const p of plan) {
        // Every section is a tab of the strip; inline ones carry their body, paged ones their summary card and a link to the page.
        expect(html, `${id} tab ${p.def.id}`).toContain(`data-id="${p.def.id}"`);
        expect(html, `${id} section ${p.def.id}`).toContain(`id="sec-${p.def.id}"`);
        if (p.placement === "page") {
          expect(html, `${id} card ${p.def.id}`).toContain(`data-section-card="${p.def.id}"`);
          expect(html, `${id} see all ${p.def.id}`).toContain(`data-see-all="${p.def.id}"`);
          const sub = inLayout(await page(id, p.def.id));
          expect(kb(sub), `${id}/${p.def.id} ${kb(sub).toFixed(0)} KB`).toBeLessThan(SUBPAGE_BUDGET_KB);
          expect(sub).toContain(`id="sec-${p.def.id}"`);
          expect(sub, "the strip is on the section page too").toContain(`data-id="overview"`);
          expect(sub, "the strip highlights the current section").toMatch(new RegExp(`data-id="${p.def.id}"[^>]*aria-current="true"`));
        } else {
          expect(html).not.toContain(`data-section-card="${p.def.id}"`);
        }
      }
    }, 300_000);
  }

  it(`a small rare cancer renders every section inline except the three record-list sections, which are summary cards`, async () => {
    const html = inLayout(await hub(SMALL));
    expect([...html.matchAll(/data-section-card="([a-z-]+)"/g)].map((m) => m[1])).toEqual(ALWAYS_PAGED);
    for (const id of SECTION_IDS) expect(html).toContain(`id="sec-${id}"`);
    expect(kb(html)).toBeLessThan(HUB_BUDGET_KB);
  }, 120_000);

  it("the hub of every heavy cancer carries Related pages, In development and Expert centres as cards, never in full", async () => {
    for (const id of [...HEAVY, "male-breast-cancer"]) {
      const html = inLayout(await hub(id));
      for (const s of ALWAYS_PAGED) expect(html, `${id} ${s}`).toContain(`data-section-card="${s}"`);
      // The full lists would carry these ids; the cards do not.
      for (const anchor of ["relevant", "pipeline", "centres"]) expect(html, `${id} #${anchor} on hub`).not.toContain(`id="${anchor}"`);
    }
  }, 300_000);

  it("the estimate is honest: no inline section of the heavy cancers renders past twice the inline line", () => {
    for (const id of [...HEAVY, SMALL]) {
      const c = cancer(id);
      for (const p of sectionPlan(c)) {
        if (p.placement !== "inline" || p.def.pinned) continue;
        const actual = kb(bare(createElement(CancerSection, { c, id: p.def.id, plan: p })));
        expect(actual, `${id}/${p.def.id} inline at ${actual.toFixed(0)} KB (estimate ${p.estimate.kb.toFixed(0)})`).toBeLessThan(INLINE_MAX_KB * 2);
      }
    }
  }, 300_000);
});

/** Every `/cancers/<id>/#hash` or `/cancers/<id>/<sub>/#hash` written in the source and the data. */
function corpusDeepLinks(): Array<{ file: string; id: string; sub: string; hash: string }> {
  const out: Array<{ file: string; id: string; sub: string; hash: string }> = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) { walk(p); continue; }
      if (!/\.(ts|tsx)$/.test(name) || name.endsWith(".test.ts")) continue;
      const text = readFileSync(p, "utf8");
      for (const m of text.matchAll(/\/cancers\/([a-z0-9-]+)\/(?:([a-z0-9-]+)\/)?#([a-z0-9-]+)/g)) out.push({ file: p, id: m[1], sub: m[2] ?? "", hash: m[3] });
    }
  };
  walk(join(process.cwd(), "src"));
  return out;
}

describe("deep links", () => {
  it("every hash link into a cancer page in src resolves to an element the hub renders or forwards", async () => {
    const links = corpusDeepLinks().filter((l) => !l.sub && l.id !== "map");
    expect(links.length).toBeGreaterThan(0);
    const g = graph();
    const byCancer = new Map<string, Set<string>>();
    for (const l of links) { if (!g.get(l.id)) continue; (byCancer.get(l.id) ?? byCancer.set(l.id, new Set()).get(l.id)!).add(l.hash); }
    for (const [id, hashes] of byCancer) {
      const c = cancer(id);
      const html = inLayout(await hub(id));
      const fwd = forwardedAnchors(c);
      for (const h of hashes) {
        const bareHash = h.replace(/^sec-/, "");
        const onHub = html.includes(`id="${h}"`) || html.includes(`id="${bareHash}"`) || html.includes(`id="sec-${bareHash}"`);
        const forwarded = fwd[h] ?? fwd[bareHash];
        expect(onHub || !!forwarded, `${id}#${h}`).toBe(true);
        if (!onHub && forwarded) {
          const [route, hash] = forwarded.split("#");
          const section = route.split("/").filter(Boolean).at(-1) as SectionId;
          const sub = inLayout(await page(id, section));
          expect(sub, `${forwarded} renders #${hash}`).toMatch(new RegExp(`id="(sec-)?${hash}"`));
        }
      }
    }
  }, 600_000);

  it("anchorHref sends a link to the hub when the section is inline and to the section page when it is not", () => {
    const gb = cancer("gallbladder");
    const plan = sectionPlan(gb);
    for (const p of plan) for (const a of p.def.anchors) {
      const href = anchorHref(gb, a);
      expect(href).toBe(p.placement === "inline" ? `/cancers/gallbladder/#${a}` : `/cancers/gallbladder/${p.def.id}/#${a}`);
      expect(cancerAnchorHref("gallbladder", `sec-${a}`)).toBe(href);
    }
    // The forwarded map covers the section ids and anchors of every paged section, in both spellings, and nothing inline.
    const fwd = forwardedAnchors(gb);
    for (const p of plan) {
      const has = p.def.id in fwd && `sec-${p.def.id}` in fwd;
      expect(has, p.def.id).toBe(p.placement === "page");
    }
    expect(cancerAnchorHref("not-a-cancer", "sec-care")).toBe("/cancers/not-a-cancer/#care");
  });

  it("the anchors a section declares are rendered by it on at least one of the heavy cancers", () => {
    const seen = new Set<string>();
    for (const id of [...HEAVY, SMALL]) {
      const c = cancer(id);
      for (const p of sectionPlan(c)) {
        const html = bare(createElement(CancerSection, { c, id: p.def.id, plan: p }));
        for (const a of p.def.anchors) if (html.includes(`id="${a}"`)) seen.add(a);
      }
    }
    const missing = SECTIONS.flatMap((s) => s.anchors).filter((a) => !seen.has(a));
    expect(missing).toEqual([]);
  }, 300_000);
});
