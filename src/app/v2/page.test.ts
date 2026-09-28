import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "../layout";
import V2 from "./page";
import { graph } from "@/lib/graph";

/**
 * /v2/ shows the site's best drawings instead of listing them, and the way it does that is the thing worth
 * guarding. Two failure modes would undo it:
 *
 *  1. **The band becomes a gallery.** Eight molecules is a front page; 611 is `/molecules/`, which is 1.2 MB.
 *  2. **The schematics go back to the server.** `FrontSchematic` serialises a mesh of 9.6 to 34.6 KB into the
 *     markup and again into the hydration payload; `FrontSchematicLazy` sends the front's id and builds the mesh
 *     in the browser from the chunk `Wireframe3D` fetches anyway. Measured on a dev server on 28 September 2026,
 *     that is the difference between 174 KB and 243 KB for two fronts, and the payload share between 52 and 66
 *     per cent. The mesh cannot be seen from here (renderToStaticMarkup ignores the client boundary, and the RSC
 *     payload cannot be rendered in vitest), so the markup budget below is the proxy: a serialised mesh is tens of
 *     kilobytes of coordinates and would break it long before anything else did.
 *
 * The budget is the measured markup plus room to think, in the shape `src/app/heavy-pages.test.ts` uses. Raise it
 * only with a measured reason.
 */

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;
/** Measured at 77 KB of markup on 28 September 2026, chrome included. One serialised schematic mesh would pass it. */
const MARKUP_BUDGET = 92 * KB;

describe("/v2/ shows the drawings without paying for all of them", () => {
  const html = render(createElement(V2));

  it("stays inside its markup budget", () => {
    const bytes = Buffer.byteLength(html, "utf8");
    expect(bytes, `/v2/ markup ${(bytes / KB).toFixed(0)} KB`).toBeLessThan(MARKUP_BUDGET);
  });

  it("shows a handful of molecules, not the gallery", () => {
    // next/dynamic renders its loading state here, so the canvas itself is not in this markup; the card's
    // provenance line is one per molecule shown and says which database the coordinates came from.
    const cards = (html.match(/(Protein Data Bank|PubChem) ·/g) ?? []).length;
    expect(cards, "molecule cards on the page").toBeGreaterThanOrEqual(6);
    expect(cards, "a front page is not the gallery").toBeLessThanOrEqual(12);
    // Each one is a way into the product page, not decoration.
    expect(html).toMatch(/href="\/drugs\/pembrolizumab\/?"/);
    expect(html).toMatch(/href="\/drugs\/trastuzumab-deruxtecan\/?"/);
  });

  it("names every front, and draws two of them", () => {
    for (const f of graph().kind("section")) expect(html, `${f.id} is linked`).toMatch(new RegExp(`href="/fronts/${f.id}/?"`));
    expect((html.match(/The steps in order, animated/g) ?? []).length, "schematics drawn in full").toBe(2);
  });

  it("keeps the search box and the block for someone told this week", () => {
    expect(html).toContain("Type the words you were given");
    expect(html).toContain("Told this week");
    expect(html).toContain("The first sixty days");
  });
});
