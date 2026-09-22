import { describe, expect, it, vi } from "vitest";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import RootLayout from "./layout";
import Explore from "./explore/page";
import ForMe from "./for-me/page";
import NavigatorPage from "./navigator/page";
import ExplainedPage from "./explained/page";
import IdeaRankingsPage from "./ideas/rankings/page";
import { EXPLORE_PAGE } from "@/lib/explore-kinds";
import { RANK_PAGE, rankAll } from "@/lib/idea-rankings";
import EvidencePage from "./evidence/page";
import ChinaPage from "./countries/cn/page";
import Universities from "./universities/page";
import AuditPage from "./audit/page";
import PathwayDrugsPage from "./pathway-drugs/page";
import DossierPage from "./dossiers/[id]/page";
import Startups from "./startups/page";
import { SECTION_PAGE, TABLE_PAGE } from "@/lib/static-tables";
import { EXPLAINED_PAGE, explainedGroups } from "@/lib/explained-data";
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

  it("explained renders every cancer heading, the first ten rows of each section and the Show more sentinel", () => {
    const html = render(createElement(ExplainedPage));
    const groups = explainedGroups(graph());
    const placements = groups.reduce((n, grp) => n + grp.trials.length, 0);
    const unique = new Set(groups.flatMap((grp) => grp.trials.map((t) => t.id)));
    expect(placements).toBeGreaterThan(1000);
    // Listed once: every trial's full row is in the first cancer section it appears in (`own`); the later sections
    // list it as a pill (`refs`) that opens that row.
    expect(groups.reduce((n, grp) => n + grp.own.length, 0)).toBe(unique.size);
    expect(groups.reduce((n, grp) => n + grp.refs.length, 0)).toBe(placements - unique.size);
    // One section per cancer, in order, each with its heading, trial count and at most EXPLAINED_PAGE full rows
    // (heading, summary, page link, Open explanation pill); the rest of the rows come from /api/v1/explained/<id>.json.
    const sections = html.split('<section id="cancer-').slice(1);
    expect(sections).toHaveLength(groups.length);
    sections.forEach((s, i) => {
      const grp = groups[i];
      expect(s.startsWith(`${grp.key}"`), grp.key).toBe(true);
      expect((s.match(/<details[\s>]/g) ?? []).length, grp.key).toBe(Math.min(EXPLAINED_PAGE, grp.own.length));
      expect(s, grp.key).toContain(`>${grp.trials.length} trial`);
    });
    const firstPage = groups.reduce((n, grp) => n + Math.min(EXPLAINED_PAGE, grp.own.length), 0);
    expect(firstPage).toBeLessThan(unique.size);
    expect((html.match(/<details[\s>]/g) ?? []).length).toBe(firstPage);
    // The row's markup is bare (one class; the card, arrow and "Open explanation" pill are CSS in globals.css).
    expect((html.match(/class="explained-row"><summary><h3><a /g) ?? []).length).toBe(firstPage);
    expect(html).not.toContain("Open explanation");
    // Every section with more rows carries the IntersectionObserver sentinel and the Show more pill, and a noscript
    // list of the rows beyond the first page so that crawlers and readers without JavaScript see every trial's name
    // and page link. Pills beyond the first page also come from the file.
    const paged = groups.filter((grp) => grp.own.length > EXPLAINED_PAGE);
    expect(paged.length).toBeGreaterThan(0);
    expect((html.match(/data-more/g) ?? []).length).toBe(paged.length);
    expect(html).toContain(`Show ${EXPLAINED_PAGE} more`);
    expect((html.match(/<noscript>/g) ?? []).length).toBe(paged.length);
    expect((html.match(/<a href="#[a-z0-9-]+" class="chip explained-ref"/g) ?? []).length).toBe(groups.reduce((n, grp) => n + Math.min(EXPLAINED_PAGE, grp.refs.length), 0));
    const linked = new Set([...html.matchAll(/href="\/trials\/([a-z0-9-]+)\/?"/g)].map((m) => m[1]));
    for (const id of unique) expect(linked.has(id), id).toBe(true);
    // The explainer's own kicker and disclaimer only appear once a row is opened and its section file fetched.
    expect(html).not.toContain("In plain words</div>");
    expect(html).not.toContain("Numbers are from the trial as recorded here");
    // 14.2 MB of HTML before; 981 KB of markup with every row as a client component's props (the hydration payload
    // then adds compact JSON rather than a second copy of the tree); 1,135 KB after the standard-of-care and registry
    // waves of 22 Sept 2026. Paging the sections at EXPLAINED_PAGE rows, one sprite for the organ drawings and CSS
    // classes for the section furniture brought it under this budget, which now grows only with the number of
    // cancers that have trials, not with the number of trials.
    expect(Buffer.byteLength(html, "utf8"), "explained markup").toBeLessThan(600 * KB);
  });

  it("idea rankings renders the first page of every view plus the Show more sentinel", () => {
    const html = render(createElement(IdeaRankingsPage));
    const views = rankAll(RANK_PAGE).filter((v) => v.available);
    const lists = (html.match(/<ol[^>]*data-rank-list[^>]*>[\s\S]*?<\/ol>/g) ?? []).map((l) => (l.match(/<li[\s>]/g) ?? []).length);
    // One list per available view, each capped at the first page; the default view fills its page.
    expect(lists).toHaveLength(views.length);
    expect(lists).toEqual(views.map((v) => Math.min(RANK_PAGE, v.ranked)));
    expect(lists[0]).toBe(RANK_PAGE);
    for (const v of views) expect(html).toContain(`id="h-${v.view.id}"`);
    // Every view but the default is hidden until picked; readers without JavaScript see them all through the noscript rule.
    expect((html.match(/<section[^>]*data-rank-panel[^>]*hidden/g) ?? []).length).toBe(views.length - 1);
    expect(html).toContain("[data-rank-panel][hidden]{display:block}");
    expect(html).toContain("data-more");
    expect(html).toContain("Show 30 more");
    // Real rows for search engines: named ideas with their pages and cancers.
    expect(html).toMatch(/href="\/ideas\/[a-z0-9-]+\/?"/);
    expect(html).toMatch(/href="\/cancers\/[a-z0-9-]+\/?"/);
    // 2.2 MB of HTML before (the top 50 of every view as rendered trees, twice over); 559 KB of markup when written, with the
    // first 30 of each view as compact props (155 KB) and the chip glyphs as one sprite sheet.
    expect(Buffer.byteLength(html, "utf8"), "idea rankings markup").toBeLessThan(700 * KB);
  });

  it("navigator renders the profile bar and nothing per cancer", () => {
    const html = render(createElement(NavigatorPage));
    expect(html).toContain("Not medical advice.");
    expect(Buffer.byteLength(html, "utf8"), "navigator markup").toBeLessThan(200 * KB);
  });
});

/**
 * The hand-written tables moved onto a client StaticTable in chain 97, which put every row into the page twice
 * (rendered HTML plus the hydration payload): /evidence/ 6.2 MB, /pathway-drugs/ 4.0 MB, /dossiers/pd1/ 2.1 MB,
 * /countries/cn/ 1.9 MB, /audit/ 1.6 MB, /universities/ 1.5 MB when measured on 22 Sept 2026 (docs/TABLES.md).
 * Each now carries the first TABLE_PAGE rows of every long table and fetches the rest from /api/v1/tables/
 * (src/lib/static-tables.ts, scripts/build-tables.ts). The budgets here are on the markup; the payload follows it.
 */
describe("paged tables carry one page of rows", () => {
  const pagedTable = (html: string, rows: number[], total: number) => {
    expect(rows.length).toBeGreaterThan(0);
    for (const n of rows) expect(n).toBeLessThanOrEqual(TABLE_PAGE);
    expect(html).toContain("data-more");
    expect(html).toContain(`Show ${TABLE_PAGE} more`);
    expect(html).toContain(total.toLocaleString("en-GB"));
  };

  it("evidence renders the first 30 trials of 3,000+ and the Show more sentinel", () => {
    const html = render(createElement(EvidencePage));
    const total = graph().kind("trial").length;
    expect(total).toBeGreaterThan(3000);
    pagedTable(html, bodyRows(html), total);
    expect(html).toMatch(/href="\/trials\/[a-z0-9-]+\/?"/);
    // 131 KB when written (the twelve pictograms are most of it), against 6.2 MB of HTML before.
    expect(Buffer.byteLength(html, "utf8"), "evidence markup").toBeLessThan(160 * KB);
  });

  it("china renders the first 30 key trials and every deal", () => {
    const html = render(createElement(ChinaPage));
    const rows = bodyRows(html);
    expect(rows.some((n) => n === TABLE_PAGE)).toBe(true);
    expect(html).toContain("data-more");
    expect(html).toContain(`Show ${TABLE_PAGE} more`);
    expect(Buffer.byteLength(html, "utf8"), "china markup").toBeLessThan(300 * KB);
  });

  it("universities renders one page of each of its three tables", () => {
    const html = render(createElement(Universities));
    const rows = bodyRows(html);
    expect(rows.length).toBe(3);
    for (const n of rows) expect(n).toBe(TABLE_PAGE);
    expect((html.match(/data-more/g) ?? []).length).toBe(3);
    expect(html).toMatch(/href="\/institutions\/[a-z0-9-]+\/?"/);
    expect(Buffer.byteLength(html, "utf8"), "universities markup").toBeLessThan(200 * KB);
  });

  it("audit renders at most one page per findings table", () => {
    const html = render(createElement(AuditPage));
    const rows = bodyRows(html);
    expect(rows.length).toBeGreaterThan(5);
    // The "moved links" table is plain and capped at 150; every StaticTable is paged.
    for (const n of rows) expect(n).toBeLessThanOrEqual(150);
    expect(rows.filter((n) => n > TABLE_PAGE).length).toBeLessThanOrEqual(1);
    expect(html).toContain("data-more");
    expect(Buffer.byteLength(html, "utf8"), "audit markup").toBeLessThan(450 * KB);
  });

  it("pathway drugs renders the first 30 pathways in the matrix and the first 10 node sections", () => {
    const html = render(createElement(PathwayDrugsPage));
    const rows = bodyRows(html);
    expect(rows[0]).toBe(TABLE_PAGE);
    // The matrix plus one node table per section on the page (the largest sections come first, so fewer of them).
    expect(rows.length).toBe(1 + SECTION_PAGE);
    expect((html.match(/data-more/g) ?? []).length).toBe(2);
    expect(html).toContain(`Show ${SECTION_PAGE} more`);
    expect(html).toMatch(/href="\/pathways\/[a-z0-9-]+\/?"/);
    // 320 KB when written (ten sections of the largest pathways), against 4.0 MB of HTML before.
    expect(Buffer.byteLength(html, "utf8"), "pathway drugs markup").toBeLessThan(400 * KB);
  });

  it("startups renders the first 30 startups in the browser and the investors table", () => {
    const html = render(createElement(Startups));
    const rows = bodyRows(html);
    expect(rows[0]).toBe(TABLE_PAGE);
    for (const n of rows) expect(n).toBeLessThanOrEqual(TABLE_PAGE);
    expect(html).toContain("data-more");
    expect(html).toContain(`Show ${TABLE_PAGE} more`);
    expect(html).toMatch(/href="\/companies\/[a-z0-9-]+\/?"/);
    // 1.2 MB of HTML before, the browser's rows shipped twice; the budget is on the markup.
    expect(Buffer.byteLength(html, "utf8"), "startups markup").toBeLessThan(250 * KB);
  });

  it("the PD-1 dossier renders the first 30 of its hundreds of trials", async () => {
    const html = render(await DossierPage({ params: Promise.resolve({ id: "pd1" }) }));
    expect(html).toContain('id="trials"');
    const trials = bodyRows(html);
    for (const n of trials) expect(n).toBeLessThanOrEqual(TABLE_PAGE);
    expect(html).toContain("data-more");
    // 377 KB when written (the products matrix and resistance routes are most of it), against 2.1 MB of HTML before.
    expect(Buffer.byteLength(html, "utf8"), "pd1 dossier markup").toBeLessThan(450 * KB);
  });
});
