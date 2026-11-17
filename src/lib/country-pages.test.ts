import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { GLOBOCAN } from "./globocan";
import { routeExists, sitemapUrls } from "./sitemap-urls";
import { autoCountry, autoCountryCodes, autoCountryParams, COUNTRY_PAGES, countryIndex, countryPageFor, countryRoute, deepDiveCodes, deepDiveQueue, namesCountry, NO_AUTOMATIC_PAGES, partAnchor } from "./country-pages";
import { NAV_GROUPS } from "./nav";
import { siteSearchDocs } from "./search-index";
import { CTGOV_COUNTRY, ISO3_TO_ISO2, PART_OF } from "@/data/country-codes";
import { generateStaticParams } from "@/app/countries/[iso]/page";

/**
 * Every GLOBOCAN country has a page: its deep dive where one exists, an automatic page otherwise, or a section of
 * its parent's page (France's overseas departments). A deep dive always wins, so the dynamic route must never
 * generate a code that has its own folder.
 *
 * This file reads the corpus as it is. Since 16 November 2026 that means no automatic page at all, so it names no
 * country as an example of one; how the route treats a territory with no deep dive is checked on fixture
 * territories in src/app/countries/[iso]/render.test.ts.
 */
describe("country pages", () => {
  const gloIso2 = Object.keys(GLOBOCAN.countries).filter((k) => k !== "WORLD").map((k) => ISO3_TO_ISO2[k]);
  const generated = generateStaticParams().map((p) => p.iso);
  // The automatic pages the route generates; the placeholder it returns when there are none is not a page.
  const params = generated.filter((iso) => iso !== NO_AUTOMATIC_PAGES).map((iso) => iso.toUpperCase());

  it("knows the alpha-2 code of every GLOBOCAN country", () => {
    const missing = Object.keys(GLOBOCAN.countries).filter((k) => k !== "WORLD" && !ISO3_TO_ISO2[k]);
    expect(missing).toEqual([]);
    expect(new Set(gloIso2).size).toBe(gloIso2.length);
  });

  it("gives every GLOBOCAN country a page: a deep dive, an automatic page or a section of its parent's", () => {
    const dives = new Set(deepDiveCodes());
    const auto = new Set(params);
    const homeless = gloIso2.filter((c) => !dives.has(c) && !auto.has(c) && !PART_OF[c]);
    expect(homeless).toEqual([]);
    for (const c of gloIso2) {
      const route = countryPageFor(c).split("#")[0];
      expect(dives.has(route.slice(11, 13).toUpperCase()) || auto.has(route.slice(11, 13).toUpperCase()), c).toBe(true);
    }
    // The deep dives found on disk are the folders the sitemap helper sees as literal routes.
    for (const d of dives) expect(routeExists(`/countries/${d.toLowerCase()}/`), d).toBe(true);
  });

  it("lets a deep dive win: no automatic page is generated for a code with its own folder", () => {
    const clash = params.filter((c) => deepDiveCodes().includes(c));
    expect(clash).toEqual([]);
    // Peru, Samoa and Timor-Leste had automatic pages until their deep dives arrived.
    expect(params).not.toContain("TL");
    expect(params).not.toContain("WS");
    expect(params).not.toContain("PE");
    expect(params).not.toContain("FR");
    expect(params).not.toContain("AR");
    expect(autoCountryCodes()).toEqual(params);
    // Each automatic page is a GLOBOCAN country with no folder, generated once, at its lower-case code.
    for (const iso of generated.filter((x) => x !== NO_AUTOMATIC_PAGES)) expect(iso).toMatch(/^[a-z]{2}$/);
    expect(new Set(generated).size).toBe(generated.length);
    for (const c of params) expect(gloIso2).toContain(c);
  });

  it("always gives the static export a param, and a placeholder only when there is no automatic page", () => {
    // Next stops a static export when a dynamic route's generateStaticParams returns an empty list.
    expect(generated.length).toBeGreaterThan(0);
    expect(generated).toEqual(autoCountryParams().map((p) => p.iso));
    expect(generated.includes(NO_AUTOMATIC_PAGES)).toBe(autoCountryCodes().length === 0);
    if (autoCountryCodes().length === 0) expect(generated).toEqual([NO_AUTOMATIC_PAGES]);
    // The placeholder can never be a country: not two letters, no data behind it, no folder, not in the sitemap or search.
    expect(NO_AUTOMATIC_PAGES).not.toMatch(/^[a-z]{2}$/i);
    expect(autoCountry(NO_AUTOMATIC_PAGES)).toBeNull();
    expect(existsSync(join(process.cwd(), "src", "app", "countries", NO_AUTOMATIC_PAGES))).toBe(false);
    expect(sitemapUrls().filter((u) => u.url.includes(NO_AUTOMATIC_PAGES))).toEqual([]);
    expect(siteSearchDocs().map((d) => d.route)).not.toContain(`/countries/${NO_AUTOMATIC_PAGES}/`);
  });

  it("counts the countries without a deep dive the same way everywhere", () => {
    // Where the corpus stands on 16 November 2026: none. Kept as an agreement between the three places that count,
    // not as a ban, because a territory IARC adds is allowed an automatic page until its deep dive is written.
    const dives = new Set(deepDiveCodes());
    const without = gloIso2.filter((c) => !dives.has(c) && !PART_OF[c]).sort();
    expect(autoCountryCodes().slice().sort()).toEqual(without);
    expect(countryIndex().filter((c) => !c.deepDive).map((c) => c.iso2).sort()).toEqual(without);
    expect(params.slice().sort()).toEqual(without);
  });

  it("puts France's overseas departments on the France page, not on pages of their own", () => {
    for (const c of ["RE", "MQ", "GP", "GF"]) {
      expect(PART_OF[c]).toBe("FR");
      expect(params).not.toContain(c);
      expect(countryPageFor(c)).toBe(`/countries/fr/#${partAnchor(c)}`);
      expect(countryIndex().some((r) => r.iso2 === c)).toBe(false);
    }
    const fr = countryIndex().find((r) => r.iso2 === "FR")!;
    expect(fr.deepDive).toBe(true);
    expect(fr.parts?.map((p) => p.iso2).sort()).toEqual(["GF", "GP", "MQ", "RE"]);
    const page = readFileSync("src/app/countries/fr/page.tsx", "utf8");
    expect(page).toContain('<CountryParts parent="FR" />');
  });

  it("maps every country name in the trial captures to a code", () => {
    const text = readFileSync("src/data/trial-participation.ts", "utf8");
    const names = new Set<string>();
    for (const m of text.matchAll(/"countries": \[([^\]]*)\]/g)) for (const n of JSON.parse(`[${m[1]}]`) as string[]) names.add(n);
    expect([...names].filter((n) => !CTGOV_COUNTRY[n])).toEqual([]);
  });

  it("matches programme and law records to a country by whole name only", () => {
    expect(namesCountry("Cervical cancer screening programme in Myanmar", "MM")).toBe(true);
    expect(namesCountry("Breast cancer screening programme in Turkey", "TR")).toBe(true);
    expect(namesCountry("Screening in Papua New Guinea", "GN")).toBe(false);
    expect(namesCountry("A law in Northern Ireland", "IE")).toBe(false);
    expect(namesCountry("Programme in Nigeria", "NE")).toBe(false);
    expect(autoCountry("PT")!.laws.map((e) => e.id)).toContain("portugal-law-75-2021-right-to-be-forgotten");
    expect(autoCountry("MM")!.programmes.map((e) => e.id)).toContain("screening-mmr-cervix");
  });

  it("reads the deep-dive queue from the coverage proposal", () => {
    const q = deepDiveQueue();
    expect(q.size).toBe(60);
    expect(q.ranks.get("PE")).toBe(24);
  });

  it("flags estimates IARC built from neighbouring countries", () => {
    const tl = autoCountry("TL")!;
    expect(tl.methodInc.code).toBe("5");
    expect(tl.methodInc.neighbours).toBe(true);
    expect(autoCountry("PE")!.methodInc.neighbours).toBe(false);
  });
});

/**
 * Country deep dives are found through search and through /countries/, not through the site menu. The menu is in the
 * root layout, so anything it lists ships with every page; listing each country there made the menu's cost grow with
 * every country added (about 37 KB at 117 countries). These checks keep the menu at one Countries entry and make sure
 * no country page is lost from search when it is not in the menu.
 */
const APP = join(process.cwd(), "src", "app", "countries");
const codes = readdirSync(APP, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name) && existsSync(join(APP, d.name, "page.tsx")))
  .map((d) => `/countries/${d.name}/`);

describe("country deep dives", () => {
  it("every country page has a line for search, and every line has a page", () => {
    const listed = new Set(COUNTRY_PAGES.map((c) => c.href));
    expect(codes.filter((h) => !listed.has(h)), "country pages with no line in src/lib/country-pages.ts").toEqual([]);
    expect([...listed].filter((h) => !codes.includes(h)), "lines with no page").toEqual([]);
    expect(listed.size, "one line per page").toBe(COUNTRY_PAGES.length);
  });

  it("search reaches every country page, deep dive or automatic, once each", () => {
    const pageRoutes = siteSearchDocs().filter((d) => d.kind === "page").map((d) => d.route);
    const routes = new Set(pageRoutes);
    expect(codes.filter((h) => !routes.has(h)), "deep dives search cannot reach").toEqual([]);
    expect(autoCountryCodes().map(countryRoute).filter((h) => !routes.has(h)), "automatic pages search cannot reach").toEqual([]);
    const countryRoutes = pageRoutes.filter((r) => /^\/countries\/[a-z]{2}\/$/.test(r));
    expect(countryRoutes.length, "a country indexed twice").toBe(new Set(countryRoutes).size);
  });

  it("the site menu does not list the deep dives one by one", () => {
    // A country can keep a menu entry for a reason of its own (India's paying-for-care line is shown to readers who
    // chose India), but the menu must not grow with the number of countries.
    const inMenu = NAV_GROUPS.flatMap((g) => g.items).filter((i) => /^\/countries\/[a-z]{2}\/$/.test(i.href));
    expect(inMenu.length).toBeLessThanOrEqual(3);
  });
});
