import { describe, expect, it } from "vitest";
import { institutionCities, institutionNames, matchInstitution, normaliseSiteName, recruitingSites, type InstitutionNames } from "./trial-sites";

const inst = (id: string, name: string, city: string, aka: string[] = [], country = "GB") => institutionNames({ id, name, city, country, aka });
const index = (...l: InstitutionNames[]) => { const m = new Map<string, InstitutionNames[]>(); for (const i of l) m.set(i.country, [...(m.get(i.country) ?? []), i]); return m; };

describe("matching a registry site to an institution record", () => {
  const marsden = inst("royal-marsden", "Royal Marsden Hospital", "London", ["The Royal Marsden"]);
  const morriston = inst("morriston-swansea", "Morriston Hospital, Swansea", "Swansea", ["Swansea Bay University Health Board"]);
  const usOnc = inst("us-oncology-network", "The US Oncology Network", "The Woodlands, TX", ["Texas Oncology"], "US");
  const by = index(marsden, morriston, usOnc);

  it("normalises accents, punctuation and a leading 'the'", () => {
    expect(normaliseSiteName("Hôpital Saint-Louis")).toBe("hopital saint louis");
    expect(normaliseSiteName("The Christie NHS Foundation Trust")).toBe("christie nhs foundation trust");
  });

  it("reads every city a record writes", () => {
    expect(institutionCities("Rozzano (Milan)")).toEqual(expect.arrayContaining(["rozzano", "milan"]));
    expect(institutionCities("Calgary, AB")).toContain("calgary");
  });

  it("matches the name or an alias exactly, in the same city", () => {
    expect(matchInstitution({ facility: "The Royal Marsden", city: "London", iso2: "GB" }, by)).toBe("royal-marsden");
    expect(matchInstitution({ facility: "Texas Oncology", city: "The Woodlands", iso2: "US" }, by)).toBe("us-oncology-network");
  });

  it("does not match the same name in another city: a network shares its name", () => {
    expect(matchInstitution({ facility: "Texas Oncology", city: "Dallas", iso2: "US" }, by)).toBeUndefined();
    expect(matchInstitution({ facility: "Royal Marsden Hospital", city: "Sutton", iso2: "GB" }, by)).toBeUndefined();
  });

  it("matches a site whose name contains the institution's as whole words", () => {
    expect(matchInstitution({ facility: "Royal Marsden Hospital ( Site 0405)", city: "London", iso2: "GB" }, by)).toBe("royal-marsden");
    // "Marsden" alone is one word of a recorded name, not the name.
    expect(matchInstitution({ facility: "Marsden Road Clinic", city: "London", iso2: "GB" }, by)).toBeUndefined();
  });

  it("does not match another hospital that only names the board running both", () => {
    expect(matchInstitution({ facility: "Singleton Hospital - Swansea Bay University Health Board", city: "Swansea", iso2: "GB" }, by)).toBeUndefined();
    expect(matchInstitution({ facility: "Swansea Bay University Health Board", city: "Swansea", iso2: "GB" }, by)).toBe("morriston-swansea");
  });

  it("leaves a site two records would claim unmatched", () => {
    const twin = inst("marsden-twin", "Royal Marsden Hospital Research", "London", ["Royal Marsden Hospital"]);
    expect(matchInstitution({ facility: "Royal Marsden Hospital", city: "London", iso2: "GB" }, index(marsden, twin))).toBeUndefined();
  });

  it("counts only sites whose own status is RECRUITING, by country and city", () => {
    const s = recruitingSites([
      { facility: "Royal Marsden Hospital", city: "London", country: "United Kingdom", status: "RECRUITING" },
      { facility: "Guy's Hospital", city: "London", country: "United Kingdom", status: "RECRUITING" },
      { facility: "Christie", city: "Manchester", country: "United Kingdom", status: "NOT_YET_RECRUITING" },
      { facility: "Somewhere", city: "Paris", country: "France", status: "COMPLETED" },
      { facility: "No status", city: "Leeds", country: "United Kingdom" },
    ], by);
    expect(s.countries).toEqual({ GB: [["London", 2]] });
    expect(s.institutions).toEqual({ "royal-marsden": ["Royal Marsden Hospital"] });
  });
});
