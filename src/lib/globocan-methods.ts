import type { GeoMetric } from "./cancer-geography";

/**
 * GLOBOCAN's data-method codes, in IARC's own words from the "Data source and methods" box of the GLOBOCAN 2024
 * country fact sheets (gco.iarc.who.int/media/globocan/factsheets/populations/<code>-<country>-fact-sheet.pdf, read
 * 3 November 2026; "M:I" is spelled out). One code means different things for the two measures: under 3a to 3c,
 * incidence is derived from mortality and mortality from incidence. 5 is the one that matters most for reading the
 * map: that country's incidence colour comes from its neighbours' rates. "{year}" is the edition year.
 * Shared by the cancer geography map (src/components/CancerGeography.tsx) and the automatic country pages
 * (src/components/CountryAuto.tsx). src/components/CancerGeography.test.ts fails if public/globocan/countries.json carries a code with no entry here.
 */
export const GLOBOCAN_METHOD: Record<GeoMetric, Record<string, string>> = {
  inc: {
    "1": "trends in national rates projected to {year}",
    "2a": "national rates applied to the {year} population",
    "2b": "subnational rates applied to the {year} population",
    "3a": "national mortality estimates applied to model-based mortality-to-incidence ratios (country-specific registry data)",
    "3b": "national mortality estimates applied to model-based mortality-to-incidence ratios (neighbouring country registry data)",
    "3c": "national mortality estimates applied to model-based mortality-to-incidence ratios (registry survival data)",
    "4": "national or subnational rates scaled to regional all-cancer rates",
    "5": "rates based on incidence estimates or registry data from neighbouring countries",
  },
  mort: {
    "1": "trends in national rates projected to {year}",
    "2a": "national rates applied to the {year} population",
    "2b": "subnational rates applied to the {year} population",
    "3a": "national incidence estimates applied to model-based mortality-to-incidence ratios (country-specific registry data)",
    "3b": "national incidence estimates applied to model-based mortality-to-incidence ratios (neighbouring country registry data)",
    "3c": "national incidence estimates applied to model-based mortality-to-incidence ratios (registry survival data)",
    "4": "national or subnational rates scaled to regional all-cancer rates",
  },
};
/** The plain meaning of one method code for one measure, or null when the legend has no entry for it. */
export function methodMeaning(metric: GeoMetric, code: string | undefined, year: number): string | null {
  const m = code ? GLOBOCAN_METHOD[metric][code] : undefined;
  return m ? m.replace(/\{year\}/g, String(year)) : null;
}
