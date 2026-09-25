import { beforeAll, describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "./layout";
import RootLoading from "./loading";
import KindLoading from "./[kind]/loading";
import RecordLoading from "./[kind]/[id]/loading";
import CancerSubLoading from "./cancers/[id]/loading";
import EntityPage from "./[kind]/[id]/page";
import { graph } from "@/lib/graph";
import { KIND_META } from "@/lib/kinds";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { RouteSkeleton } from "@/components/Skeletons";

/**
 * The loading experience of a record page (owner report of 24 September 2026: opening TNBC showed nothing until the
 * whole page arrived).
 *
 * Above the fold first. The exported HTML of a record must put the header (kicker, name, TL;DR) and the first section
 * before everything else in the body, with nothing that blocks: no inline scripts of its own before them (the RSC
 * payload React inlines comes after the visible content; measured on the live TNBC page, the first payload script
 * starts at byte 535,564 of 1,312,425, after the last section), every image lazy with intrinsic sizes, no eager
 * schematic markup. The skeletons the loading.tsx files show during client-side navigations must stay tiny: they are
 * serialised into every page's payload, so they render as one client component reference each.
 *
 * Byte ceilings. Markup measured here on 24 September 2026 (uncompressed; brotli on the wire is about an eighth):
 * TNBC 536 KB visible markup live (the payload doubles it to 1.31 MB), so the ceilings below hold the four sample
 * records at their measured size plus headroom. The information-architecture work that moves Related pages
 * (171 KB, 32% of TNBC's markup), In development (83 KB) and Expert centres (31 KB) to sub-pages should lower them.
 */

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const bytes = (s: string) => Buffer.byteLength(s, "utf8");
const KB = 1024;

const SAMPLES: Array<{ id: string; ceilingKB: number }> = [
  // 692 KB on 25 Sept 2026 after the TNBC UK, evidence and living-with layers; the hub-and-sub-pages architecture brings it to about 213 KB, at which point this ceiling drops to 300.
  { id: "tnbc", ceilingKB: 720 },
  { id: "gallbladder", ceilingKB: 1100 },
  { id: "pembrolizumab", ceilingKB: 600 },
  { id: "keynote-522", ceilingKB: 260 },
];

async function recordHtml(id: string) {
  const e = graph().get(id);
  if (!e) throw new Error(`no record ${id}`);
  return { e, html: render(await EntityPage({ params: Promise.resolve({ kind: KIND_META[e.kind].route, id }) })) };
}

describe("record pages: above the fold first", () => {
  // The first render pays for the graph (a minute under load); the ship chain runs this beside the other suites.
  beforeAll(() => { graph(); }, 240_000);
  for (const { id, ceilingKB } of SAMPLES) {
    it(`${id}: header and TL;DR precede the first section, images are lazy and sized, markup within ${ceilingKB} KB`, { timeout: 120_000 }, async () => {
      const { e, html } = await recordHtml(id);
      const main = html.slice(html.indexOf('<main id="main"'), html.indexOf("</main>"));
      const h1 = main.indexOf("<h1");
      const firstSection = main.indexOf('id="sec-');
      expect(h1, "h1 present").toBeGreaterThan(0);
      expect(firstSection, "a section present").toBeGreaterThan(h1);
      // The TL;DR sits between the name and the first section (its first plain word, which survives HTML escaping).
      const word = e.tldr.split(/\s+/).find((w) => /^[A-Za-z]{5,}$/.test(w));
      if (word) { const at = main.indexOf(word, h1); expect(at, `TL;DR word "${word}" after the h1`).toBeGreaterThan(h1); expect(at, `TL;DR word "${word}" before the first section`).toBeLessThan(firstSection); }
      // The tab strip comes right after the header and before any section body.
      const tabs = main.indexOf('class="tabbar-wrap');
      if (tabs > 0) expect(tabs).toBeLessThan(firstSection);
      // Nothing of the page's own blocks before the first section: no inline script in the main column before it (JSON-LD is in the head, not here).
      expect(main.slice(0, firstSection)).not.toMatch(/<script(?![^>]*type="application\/ld\+json")/);
      // Every image is lazy and carries its intrinsic size so nothing shifts as they arrive.
      for (const img of html.match(/<img[^>]*>/g) ?? []) {
        expect(img, "lazy").toContain('loading="lazy"');
        expect(img, "width").toMatch(/\swidth="\d+"/);
        expect(img, "height").toMatch(/\sheight="\d+"/);
      }
      const kb = bytes(html) / KB;
      console.info(`${id}: ${kb.toFixed(0)} KB of markup (ceiling ${ceilingKB} KB); first section at byte ${firstSection} of ${bytes(main)} in <main>`);
      expect(kb, `${id} markup ${kb.toFixed(0)} KB`).toBeLessThan(ceilingKB);
    });
  }
});

describe("loading skeletons", () => {
  const cases = [["root", RootLoading, "page"], ["kind browser", KindLoading, "browser"], ["record", RecordLoading, "record"], ["cancer sub-page", CancerSubLoading, "record"]] as const;
  for (const [name, Loading, kind] of cases) {
    it(`${name} renders an accessible, page-shaped skeleton under 12 KB of markup`, () => {
      const html = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(Loading)));
      expect(html).toContain('role="status"');
      expect(html).toContain('aria-busy="true"');
      expect(html).toContain(`data-skeleton="${kind}"`);
      expect(html).toContain("Loading");
      expect((html.match(/class="skel /g) ?? []).length).toBeGreaterThan(8);
      expect(bytes(html), `${name} skeleton ${bytes(html)} B`).toBeLessThan(12 * KB);
      // Every loading.tsx renders a client component, so a page's payload carries a module reference, not this markup.
      expect(Loading.toString()).not.toContain("skel ");
    });
  }

  it("the shared boundaries pick the skeleton from the destination pathname", () => {
    const at = (pathname: string | null, fallback: "page" | "browser") => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(PathnameContext.Provider, { value: pathname }, createElement(RouteSkeleton, { fallback }))));
    expect(at("/cancers/tnbc/", "page")).toContain('data-skeleton="record"');
    expect(at("/drugs/pembrolizumab/", "browser")).toContain('data-skeleton="record"');
    expect(at("/cancers/", "page")).toContain('data-skeleton="browser"');
    expect(at("/cancers/map/", "page")).toContain('data-skeleton="page"');
    expect(at("/explore/", "page")).toContain('data-skeleton="page"');
    expect(at(null, "browser")).toContain('data-skeleton="browser"');
  });

  it("the record skeleton draws the tab strip and the two-column layout", () => {
    const html = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RecordLoading)));
    expect(html).toContain('class="tabstrip"');
    expect(html).toContain("lg:grid-cols-[1fr_300px]");
  });
});
