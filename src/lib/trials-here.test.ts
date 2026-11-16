import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "./graph";
import { TRIAL_SITES } from "@/data/trial-sites";
import { countriesRecruiting, institutionsRecruiting, recruitingAt, recruitingIn, sitesOf } from "./trials-here";
import { countryIndex, trialsIn } from "./country-pages";
import { countryTrials, countryTrialRows, COUNTRY_TRIALS_PAGE, HERE_RECRUITING } from "./tables/country-trials";
import type { Trial } from "./schema";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CountryTrialsSection, InstitutionTrialsHere } from "@/components/TrialsHere";

/**
 * "Trials recruiting here" is derived, so these hold the derivation to its source: the site file describes the
 * same registry reading the trial record cites, a trial is recruiting somewhere only when a site there says so,
 * and every country and institution page that should show the section does.
 */
const trials = graph().kind("trial") as Trial[];

describe("the site file and the records agree", () => {
  it("every study in the site file is a reading some trial record carries, by hash", () => {
    const shas = new Map(trials.flatMap((t) => (t.participation ?? []).map((p) => [p.nct, p.studySha256] as const)));
    const stale = Object.entries(TRIAL_SITES).filter(([nct, s]) => !shas.get(nct)?.startsWith(s.sha)).map(([nct]) => nct);
    // A participation re-fetch without re-running scripts/build-trial-sites.ts leaves studies here that the pages skip.
    expect(stale, "run npx tsx scripts/build-trial-sites.ts after scripts/fetch-trial-participation.ts").toEqual([]);
  });

  it("a trial recruiting in a country has a recruiting site there and lists the country", () => {
    for (const iso2 of countriesRecruiting()) {
      const all = new Set(trialsIn(iso2).map((t) => t.id));
      for (const h of recruitingIn(iso2)) {
        expect(h.sites, `${h.trial.id} in ${iso2}`).toBeGreaterThan(0);
        expect(all.has(h.trial.id), `${h.trial.id} recruiting in ${iso2} but not listed there`).toBe(true);
      }
    }
  });

  it("never counts a site from the study's overall status", () => {
    // Trials whose overall status is RECRUITING but no site is: each is absent from every country's recruiting list.
    const recruitingAnywhere = new Set(countriesRecruiting().flatMap((c) => recruitingIn(c).map((h) => h.trial.id)));
    for (const t of trials) {
      const hasSite = sitesOf(t).some((r) => Object.keys(r.sites.countries).length > 0);
      expect(recruitingAnywhere.has(t.id), t.id).toBe(hasSite);
    }
  });

  it("an institution's recruiting trials are recruiting in its country", () => {
    const g = graph();
    expect(institutionsRecruiting().length).toBeGreaterThan(100);
    for (const id of institutionsRecruiting()) {
      const inst = g.get(id) as { kind: string; country: string } | undefined;
      expect(inst?.kind, id).toBe("institution");
      const inCountry = new Set(recruitingIn(inst!.country).map((h) => h.trial.id));
      for (const h of recruitingAt(id)) {
        expect(inCountry.has(h.trial.id), `${h.trial.id} at ${id}`).toBe(true);
        expect(h.listedAs.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("the country table", () => {
  it("puts every trial recruiting here before every trial that is not, and loses none", () => {
    for (const { iso2 } of countryIndex()) {
      const list = countryTrials(iso2);
      expect(list.length, iso2).toBe(trialsIn(iso2).length);
      const firstNot = list.findIndex((x) => !x.here);
      if (firstNot >= 0) expect(list.slice(firstNot).every((x) => !x.here), iso2).toBe(true);
    }
  });

  it("marks recruiting rows with the filter value the Here column offers", () => {
    const rows = countryTrialRows(countryTrials("US"));
    const n = recruitingIn("US").length;
    expect(n).toBeGreaterThan(COUNTRY_TRIALS_PAGE);
    expect(rows.slice(0, n).every((r) => (r.here as { v?: string }).v === HERE_RECRUITING)).toBe(true);
  });

  it("stays inside its markup budget on every country and institution page", () => {
    // Measured 11 Nov 2026: 17.2 to 18.3 KB for a country (fifteen rows), 13.6 to 13.7 KB for an institution;
    // budgets are those plus the 15 per cent margin src/app/heavy-pages.test.ts uses. The hydration payload adds
    // the same rows as JSON, about 8 KB. /countries/us/ had about 58 KB of headroom in src/data/page-weight.json.
    const kb = (el: ReturnType<typeof createElement>) => Buffer.byteLength(renderToStaticMarkup(el), "utf8") / 1024;
    for (const { iso2 } of countryIndex()) expect(kb(createElement(CountryTrialsSection, { iso2 })), iso2).toBeLessThan(21);
    for (const id of institutionsRecruiting()) expect(kb(createElement(InstitutionTrialsHere, { id, name: id })), id).toBeLessThan(16);
  });

  it("is on every country page, deep dive or automatic", () => {
    const dir = join(process.cwd(), "src", "app", "countries");
    const dives = readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name));
    const deep = readFileSync(join(process.cwd(), "src", "components", "CountryDeepDive.tsx"), "utf8");
    for (const d of dives) {
      const src = readFileSync(join(dir, d.name, "page.tsx"), "utf8");
      const ok = src.includes(`<CountryTrialsSection iso2="${d.name.toUpperCase()}"`) || (src.includes("CountryDeepDive") && deep.includes("<CountryTrialsSection iso2={dive.iso2}"));
      expect(ok, `/countries/${d.name}/ has no Trials recruiting here`).toBe(true);
    }
  });
});
