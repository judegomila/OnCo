import { describe, expect, it } from "vitest";
import globocan from "../../public/globocan/countries.json";
import { countryExtras } from "./country-extras";

/**
 * The research-ranking context rows claim GLOBOCAN rates (2024 since 3 November 2026), and on 3 November 2026 the accuracy sweep found 28 of
 * 32 rows carried a value that matched neither GLOBOCAN nor the World Bank (Saudi Arabia incidence 122 against 87,
 * Korea 300 against 235). The file was written from memory, not from its source. The source is in the repository, so
 * the check is mechanical: every incidence and mortality figure must be the GLOBOCAN all-cancers (code 39)
 * age-standardised rate in public/globocan/countries.json for that country, rounded to a whole number. When the site moves to a new edition, refresh
 * public/globocan/countries.json and this file together; this test is what keeps them in step.
 */
type Country = { name: string; isonum: number; data: Record<string, Array<number | null>> };
const byIsoNum = new Map(Object.values((globocan as unknown as { countries: Record<string, Country> }).countries).map((c) => [c.isonum, c]));

describe("country-extras incidence and mortality", () => {
  it("are the GLOBOCAN code-39 rates for the country the row's fact sheet names", () => {
    const wrong: string[] = [];
    for (const [code, row] of Object.entries(countryExtras)) {
      if (row.incidence === undefined && row.mortality === undefined) continue;
      const iso = Number(/populations\/(\d+)-/.exec(row.gcoUrl ?? "")?.[1]);
      const c = byIsoNum.get(iso);
      if (!c) { wrong.push(`${code}: a rate with no GLOBOCAN country to check it against (gcoUrl ${row.gcoUrl ?? "missing"})`); continue; }
      const [, incAsr, , mortAsr] = c.data["39"] ?? [];
      if (row.incidence !== undefined && (typeof incAsr !== "number" || Math.abs(row.incidence - incAsr) > 0.51)) wrong.push(`${code} incidence ${row.incidence}, GLOBOCAN ${incAsr}`);
      if (row.mortality !== undefined && (typeof mortAsr !== "number" || Math.abs(row.mortality - mortAsr) > 0.51)) wrong.push(`${code} mortality ${row.mortality}, GLOBOCAN ${mortAsr}`);
    }
    expect(wrong).toEqual([]);
  });

  it("link every fact sheet by its slug, not \"<code>-undefined-\"", () => {
    // The wave 4 rows were added without a GCO_SLUG entry and linked ten fact sheets IARC does not serve.
    const unslugged = Object.entries(countryExtras).filter(([, r]) => r.gcoUrl?.includes("undefined")).map(([code]) => code);
    expect(unslugged).toEqual([]);
  });
});
