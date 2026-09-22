import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "./layout";
import Explore from "./explore/page";
import ForMe from "./for-me/page";
import NavigatorPage from "./navigator/page";
import ExplainedPage from "./explained/page";
import { EXPLORE_PAGE } from "@/lib/explore-kinds";
import { explainedGroups } from "@/lib/explained-data";
import { graph } from "@/lib/graph";

/**
 * The four heaviest exported pages used to ship every row in the HTML (and again in the hydration payload):
 * /explore/ 10.5 MB, /for-me/ 13.2 MB, /navigator/ 8.8 MB. They now carry a first page of rows (Explore) or the
 * chooser list alone (For me, Navigator) and fetch the rest per section from static JSON. This test keeps it so.
 *
 * The RSC payload cannot be produced in vitest, but its size follows the props the pages pass, and those are what
 * the static markup renders from; a budget on the markup guards both.
 */

// next/font needs the Next compiler; the layout only reads the class-name variables.
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = (el: ReactElement) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, el)));
const KB = 1024;
const bodyRows = (html: string) => (html.match(/<tbody[^>]*>[\s\S]*?<\/tbody>/g) ?? []).map((t) => (t.match(/<tr[\s>]/g) ?? []).length);

describe("heavy pages page their sections", () => {
  it("explore renders at most one page of rows per section plus the Show more sentinel", () => {
    const html = render(createElement(Explore));
    const rows = bodyRows(html);
    expect(rows.length).toBeGreaterThan(0);
    for (const n of rows) expect(n).toBeLessThanOrEqual(EXPLORE_PAGE);
    expect(rows[0]).toBe(EXPLORE_PAGE);
    expect(html).toContain("data-more");
    expect(html).toContain("Show 30 more");
    // Real rows for search engines: named products with their pages.
    expect(html).toMatch(/href="\/drugs\/[a-z0-9-]+\/?"/);
    expect(Buffer.byteLength(html, "utf8"), "explore markup").toBeLessThan(400 * KB);
  });

  it("for me renders the cancer tiles and none of the per-cancer lists", () => {
    const html = render(createElement(ForMe));
    expect(html).toContain("Start by choosing a cancer type above.");
    // The tile grid is real content (every cancer named with its one-line TL;DR); the lists behind each tile are not.
    expect(html).toContain("Or tap one");
    expect(html).toContain("Triple-negative breast cancer");
    expect(html).not.toContain("Coming down the pipeline");
    // 328 tiles with a TL;DR and an organ icon each: 441 KB when written, against 13.2 MB before.
    expect(Buffer.byteLength(html, "utf8"), "for me markup").toBeLessThan(600 * KB);
  });

  it("explained renders every trial heading and summary but no explainer body", () => {
    const html = render(createElement(ExplainedPage));
    const groups = explainedGroups(graph());
    const placements = groups.reduce((n, grp) => n + grp.trials.length, 0);
    const unique = new Set(groups.flatMap((grp) => grp.trials.map((t) => t.id)));
    expect(placements).toBeGreaterThan(1000);
    // Every trial has one full row (heading, summary, page link, Open explanation pill), in the first cancer section it
    // appears in; its other cancer sections list it as a pill that opens that row.
    expect((html.match(/<details[\s>]/g) ?? []).length).toBe(unique.size);
    expect((html.match(/Open explanation/g) ?? []).length).toBe(unique.size);
    expect((html.match(/class="chip border border-border bg-card hover:bg-accent-soft hover:text-accent"/g) ?? []).length).toBe(placements - unique.size);
    for (const grp of groups) expect(html).toContain(`id="cancer-${grp.key}"`);
    for (const id of unique) expect(html, id).toContain(`id="${id}"`);
    expect(html).toMatch(/href="\/trials\/[a-z0-9-]+\/?"/);
    // The explainer's own kicker and disclaimer only appear once a row is opened and its section file fetched.
    expect(html).not.toContain("In plain words</div>");
    expect(html).not.toContain("Numbers are from the trial as recorded here");
    // 14.2 MB of HTML before; 981 KB of markup when written. The rows are a client component's props, so the hydration
    // payload adds compact JSON rather than a second copy of this tree.
    expect(Buffer.byteLength(html, "utf8"), "explained markup").toBeLessThan(1100 * KB);
  });

  it("navigator renders the profile bar and nothing per cancer", () => {
    const html = render(createElement(NavigatorPage));
    expect(html).toContain("Not medical advice.");
    expect(Buffer.byteLength(html, "utf8"), "navigator markup").toBeLessThan(200 * KB);
  });
});
