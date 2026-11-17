// The fixture territories go in before anything reads the data: keep this import first (see the file's comment).
import { BAY_TRIALS, COAST_TRIALS, FIXTURE_ATOLL, FIXTURE_BAY, FIXTURE_CODES, FIXTURE_COAST, FIXTURE_INSTITUTION } from "@/test-utils/country-fixture";
import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import AutoCountryPage, { generateStaticParams } from "./page";
import RootLayout from "../../layout";
import { autoCountry, autoCountryCodes, countryIndex, countryRoute, deepDiveCodes, NO_AUTOMATIC_PAGES } from "@/lib/country-pages";
import { GLOBOCAN } from "@/lib/globocan";
import { siteSearchDocs } from "@/lib/search-index";
import { pageRows } from "@/lib/static-tables";
import { pagedTables } from "@/lib/tables";
import { COUNTRY_TRIALS_PAGE, countryTrialRows, countryTrials, countryTrialsTableId } from "@/lib/tables/country-trials";
import { recruitingIn } from "@/lib/trials-here";
import { nestedAnchors, structureIssues } from "@/test-utils/html-structure";

/**
 * The automatic country pages render from data alone. Every GLOBOCAN country has had a deep dive since wave 16
 * (16 November 2026), so no real country has an automatic page; Peru, Estonia, Samoa, Guam, Timor-Leste, the
 * Maldives, Montenegro and the Gaza Strip and West Bank each served as an example here until its deep dive arrived.
 * The route is kept for the next territory IARC reports, and these tests run it on three territories that do not
 * exist (src/test-utils/country-fixture.ts), added to the data the page reads so the whole path runs as it would for a
 * real newcomer. Three shapes: a small territory whose incidence IARC built from neighbouring countries and for
 * which OnCo holds nothing (Fixture Atoll), one with a few trials and an institution (Fixture Bay), and one with
 * more trials than a page of the table (Fixture Coast). Each page must state GLOBOCAN's figures and edition, cite
 * IARC, and name what OnCo does not hold, inside the markup budget the automatic pages share.
 */
vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist-sans" }), Geist_Mono: () => ({ variable: "font-geist-mono" }) }));

const router: AppRouterInstance = { push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), bfcacheId: "static" };
const render = async (iso: string) => renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, await AutoCountryPage({ params: Promise.resolve({ iso }) })));
/** 120 KB of markup without the root layout: Peru, when it was automatic, was about half of it; the trial table is paged. */
const BUDGET = 120 * 1024;
const fmt = (n: number | null | undefined) => (n ?? 0).toLocaleString("en-GB");
const lower = (c: string) => c.toLowerCase();

describe("the automatic route", () => {
  it("generates a page for each territory with no deep dive, and for nothing else", () => {
    const params = generateStaticParams().map((p) => p.iso);
    expect(params).toEqual(autoCountryCodes().map(lower));
    for (const c of FIXTURE_CODES) expect(params).toContain(lower(c));
    // With fixtures in the data the automatic pages are exactly the fixtures: every real country has a deep dive.
    expect(params.slice().sort()).toEqual(FIXTURE_CODES.map(lower).sort());
    expect(params.filter((p) => deepDiveCodes().includes(p.toUpperCase()))).toEqual([]);
    expect(params).not.toContain(NO_AUTOMATIC_PAGES);
  });

  it("lists the territory on /countries/ data, in search and nowhere twice", () => {
    const index = countryIndex();
    for (const c of FIXTURE_CODES) {
      const row = index.find((r) => r.iso2 === c)!;
      expect(row, c).toBeDefined();
      expect(row.deepDive).toBe(false);
      expect(row.route).toBe(countryRoute(c));
    }
    const routes = siteSearchDocs().filter((d) => d.kind === "page").map((d) => d.route);
    for (const c of FIXTURE_CODES) expect(routes.filter((r) => r === countryRoute(c)).length, c).toBe(1);
  });

  it("answers a deep dive's code, an unknown code, an upper-case code and the placeholder with not-found", async () => {
    // The static folder serves a deep dive; this route must never render a second page for it.
    for (const iso of ["pe", "ee", "ws", "zz", FIXTURE_ATOLL, NO_AUTOMATIC_PAGES]) await expect(render(iso), iso).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK;404|NEXT_NOT_FOUND/);
  });
});

describe("automatic country pages", () => {
  for (const iso of FIXTURE_CODES.map(lower)) {
    it(`/countries/${iso}/ states GLOBOCAN's figures, the citation and the gaps`, async () => {
      const c = autoCountry(iso)!;
      const html = await render(iso);
      expect(html).toContain(`Cancer in ${c.name}`);
      expect(c.all?.[0]).toBeGreaterThan(1000);
      expect(c.all?.[2]).toBeGreaterThan(500);
      expect(html).toContain(fmt(c.all?.[0]));
      expect(html).toContain(fmt(c.all?.[2]));
      expect(html).toContain(`GLOBOCAN ${GLOBOCAN.year}`);
      expect(html).toContain("International Agency for Research on Cancer");
      expect(html).toContain("What OnCo does not yet hold");
      expect(html).toContain("country-coverage-2026-11.md");
      expect(html).not.toMatch(/[–—]/);
      expect(Buffer.byteLength(html, "utf8"), `${iso} markup`).toBeLessThan(BUDGET);
    });
  }

  it("renders markup the HTML parser keeps as written, inside the root layout", async () => {
    // src/app/nested-anchors.test.ts scans every page the site generates. It generates no automatic page now, so
    // the scan of this page's markup is done here, on the three fixture territories.
    for (const iso of FIXTURE_CODES.map(lower)) {
      const page = await AutoCountryPage({ params: Promise.resolve({ iso }) });
      const html = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(RootLayout, null, page)));
      expect(html, `${iso} rendered no links`).toMatch(/<a[\s>]/);
      expect(nestedAnchors(html), iso).toEqual([]);
      expect(structureIssues(html), iso).toEqual([]);
    }
  });

  it("says when IARC built the estimate from neighbouring countries (Fixture Atoll, method 5)", async () => {
    expect(autoCountry(FIXTURE_ATOLL)!.methodInc).toMatchObject({ code: "5", neighbours: true });
    const html = await render(lower(FIXTURE_ATOLL));
    expect(html).toContain("Built partly from other countries");
    expect(html).toContain("neighbouring countries");
    // And does not say it of an estimate built from the territory's own registry (Fixture Bay, method 1).
    expect(autoCountry(FIXTURE_BAY)!.methodInc.neighbours).toBe(false);
    expect(await render(lower(FIXTURE_BAY))).not.toContain("Built partly from other countries");
  });

  it("lists every trial and record of a territory with under a page of trials (Fixture Bay)", async () => {
    const c = autoCountry(FIXTURE_BAY)!;
    expect(c.trials.length).toBe(BAY_TRIALS);
    expect(recruitingIn(FIXTURE_BAY).length).toBeGreaterThan(0);
    const html = await render(lower(FIXTURE_BAY));
    expect(html).toContain(`${recruitingIn(FIXTURE_BAY).length} recruiting here · ${c.trials.length} with a site here`);
    const list = countryTrials(FIXTURE_BAY);
    expect(list.map((x) => x.trial.id).sort()).toEqual(c.trials.map((t) => t.id).sort());
    // Under one page of rows, so the page carries all of them and no file is fetched.
    expect(list.length).toBeLessThanOrEqual(COUNTRY_TRIALS_PAGE);
    expect(pageRows(countryTrialsTableId(FIXTURE_BAY), countryTrialRows(list), COUNTRY_TRIALS_PAGE).more).toBeUndefined();
    for (const x of list) expect(html).toContain(`href="/trials/${x.trial.id}`);
    expect(c.institutions.map((e) => e.id)).toEqual([FIXTURE_INSTITUTION]);
    for (const e of c.institutions) expect(html).toContain(e.name.replace(/&/g, "&amp;").replace(/'/g, "&#x27;"));
    expect(html).toContain(`href="/institutions/${FIXTURE_INSTITUTION}`);
  });

  it("pages an automatic page's trial table once it is longer than a page (Fixture Coast)", async () => {
    const c = autoCountry(FIXTURE_COAST)!;
    expect(c.trials.length).toBe(COAST_TRIALS);
    const list = countryTrials(FIXTURE_COAST);
    expect(list.length).toBeGreaterThan(COUNTRY_TRIALS_PAGE);
    const paged = pageRows(countryTrialsTableId(FIXTURE_COAST), countryTrialRows(list), COUNTRY_TRIALS_PAGE);
    expect(paged.rows.length).toBe(COUNTRY_TRIALS_PAGE);
    expect(paged.more?.src).toBe("/api/v1/tables/country-trials-xc.json");
    expect(pagedTables().map((t) => t.id)).toContain("country-trials-xc");
    // The page carries the first rows and the address of the rest, not the whole table.
    const html = await render(lower(FIXTURE_COAST));
    for (const x of list.slice(0, COUNTRY_TRIALS_PAGE)) expect(html).toContain(`href="/trials/${x.trial.id}`);
    expect(html).not.toContain(`href="/trials/${list.at(-1)!.trial.id}`);
    expect(html).toContain(`${recruitingIn(FIXTURE_COAST).length} recruiting here · ${COAST_TRIALS} with a site here`);
    expect(html).toContain(`Show ${COAST_TRIALS - COUNTRY_TRIALS_PAGE} more`);
  });

  it("pages a country's trial table once it is longer than a page (Estonia, now a deep dive)", () => {
    expect(autoCountryCodes(), "Estonia has a deep dive, so no automatic page").not.toContain("EE");
    const list = countryTrials("EE");
    expect(list.length).toBeGreaterThan(COUNTRY_TRIALS_PAGE);
    const paged = pageRows(countryTrialsTableId("EE"), countryTrialRows(list), COUNTRY_TRIALS_PAGE);
    expect(paged.rows.length).toBe(COUNTRY_TRIALS_PAGE);
    expect(paged.more?.src).toBe("/api/v1/tables/country-trials-ee.json");
    expect(pagedTables().map((t) => t.id)).toContain("country-trials-ee");
  });

  it("names a trial gap rather than showing an empty table", async () => {
    const html = await render(lower(FIXTURE_ATOLL));
    expect(autoCountry(FIXTURE_ATOLL)!.trials.length).toBe(0);
    expect(html).toContain("No trial record in OnCo lists a site in Fixture Atoll");
    expect(html).toContain("OnCo holds no institution, company or person in Fixture Atoll");
  });
});

describe("/countries/ lists every country compactly", () => {
  it("links every country with a page, marks the deep dives, and stays small", async () => {
    const { default: CountriesPage } = await import("../page");
    const { CountryDirectory } = await import("@/components/CountryDirectory");
    const html = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(CountriesPage)));
    const index = countryIndex();
    // Link drops the trailing slash in a test render; the export writes it back (trailingSlash: true).
    for (const c of index) expect(html, c.iso2).toMatch(new RegExp(`href="${c.route}?"`));
    for (const c of ["re", "mq", "gp", "gf"]) expect(html).toMatch(new RegExp(`href="/countries/fr/?#overseas-${c}"`));
    expect((html.match(/>deep dive</g) ?? []).length).toBe(index.filter((c) => c.deepDive).length);
    // With three territories on automatic pages the page counts both kinds and offers the switch between them.
    const dives = index.filter((c) => c.deepDive).length;
    expect(index.length - dives).toBe(FIXTURE_CODES.length);
    expect(html).toContain(`${dives} deep dives written from each country&#x27;s own sources, and ${FIXTURE_CODES.length} pages assembled from GLOBOCAN ${GLOBOCAN.year}`);
    expect(html).toContain(`Deep dives only (${dives})`);
    for (const c of FIXTURE_CODES) expect(html).not.toMatch(new RegExp(`href="${countryRoute(c)}?"[^>]*>[^<]*</a><span[^>]*>deep dive<`));
    // The directory is names and links only: about 180 bytes a country. The ranking table below it is the page's bulk.
    const rows = index.map((c) => ({ c: c.iso2, n: c.name, r: c.region, d: c.deepDive }));
    const dir = renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router }, createElement(CountryDirectory, { rows, regions: [...new Set(index.map((c) => c.region))] })));
    expect(Buffer.byteLength(dir, "utf8"), "directory markup").toBeLessThan(40 * 1024);
    expect(JSON.stringify(rows).length, "directory props").toBeLessThan(12 * 1024);
  });
});
