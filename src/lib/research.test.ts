import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "./graph";
import { acronymMatches, bareDoi, matchAuthorToPerson, nameSimilarity, sameAuthor, type InstitutionResearch, type ResearchIndex } from "./research";

const DIR = join(process.cwd(), "public", "openalex", "research");
const INDEX = join(process.cwd(), "public", "openalex", "research-index.json");
const DOI_URL = /^https:\/\/doi\.org\/10\.\d{4,9}\/\S+$/;

const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith(".json")) : [];

describe("institution research snapshots", () => {
  it("every research file names an existing institution and every DOI carries the doi.org prefix", () => {
    const g = graph();
    for (const f of files) {
      const id = f.replace(/\.json$/, "");
      const e = g.get(id);
      expect(e?.kind, `${f} should belong to an institution record`).toBe("institution");
      const r = JSON.parse(readFileSync(join(DIR, f), "utf8")) as InstitutionResearch;
      expect(r.institutionId).toBe(id);
      expect(r.openalexId).toMatch(/^I\d+$/);
      expect(r.years[1] - r.years[0]).toBe(4);
      expect(Object.keys(r.byYear).length).toBe(5);
      for (const w of r.topWorks) {
        expect(w.id).toMatch(/^W\d+$/);
        if (w.doi !== null) expect(w.doi, `${f}: ${w.doi}`).toMatch(DOI_URL);
        expect(w.cited).toBeGreaterThanOrEqual(0);
      }
      for (const a of r.topAuthors) expect(a.id).toMatch(/^A\d+$/);
      expect(r.topWorks.length).toBeLessThanOrEqual(15);
      expect(r.topAuthors.length).toBeLessThanOrEqual(10);
    }
  });

  it("the index lists exactly the institutions with a research file, with counts that agree", () => {
    if (!existsSync(INDEX)) return;
    const index = JSON.parse(readFileSync(INDEX, "utf8")) as ResearchIndex;
    const g = graph();
    const ids = new Set(files.map((f) => f.replace(/\.json$/, "")));
    expect(new Set(Object.keys(index.institutions))).toEqual(ids);
    for (const [id, row] of Object.entries(index.institutions)) {
      expect(g.get(id)?.kind).toBe("institution");
      const r = JSON.parse(readFileSync(join(DIR, `${id}.json`), "utf8")) as InstitutionResearch;
      expect(row.works).toBe(r.works);
      expect(row.cited).toBe(r.cited);
      expect(row.openalexId).toBe(r.openalexId);
    }
    for (const id of Object.keys(index.unresolved)) expect(g.get(id)?.kind).toBe("institution");
  });

  it("keeps each research file small", () => {
    for (const f of files) expect(readFileSync(join(DIR, f)).length, f).toBeLessThan(20 * 1024);
  });
});

describe("author and institution matching", () => {
  it("matches names across initials, suffixes and diacritics but not different people", () => {
    expect(sameAuthor("Luis A. Diaz Jr.", "Luis Diaz")).toBe(true);
    expect(sameAuthor("Luis A. Diaz Jr.", "L. A. Diaz")).toBe(true);
    expect(sameAuthor("Luis A. Diaz Jr.", "Laura Diaz")).toBe(false);
    expect(sameAuthor("José Baselga", "Jose Baselga")).toBe(true);
    expect(sameAuthor("Shailesh V. Shrikhande", "Shailesh Shrikhande")).toBe(true);
    expect(sameAuthor("Andrea Cercek", "Andrea Cercek")).toBe(true);
    expect(sameAuthor("Andrea Cercek", "Andrew Cercek")).toBe(false);
    expect(sameAuthor("Kim Yong", "Yong Kim")).toBe(true);
    expect(sameAuthor("Cercek", "Andrea Cercek")).toBe(false);
  });

  it("links a top author only to a person at the same institution and only when unique", () => {
    const people = [
      { id: "a", name: "Andrea Cercek", institutionId: "mskcc" },
      { id: "b", name: "Andrea Cercek", institutionId: "other" },
      { id: "c", name: "Avanish Saklani", institutions: ["tata-memorial"] },
      { id: "d", name: "Luis A. Diaz Jr.", institutionId: "mskcc", orcid: "0000-0001-0000-0002" },
    ];
    expect(matchAuthorToPerson({ name: "Andrea Cercek" }, "mskcc", people)?.id).toBe("a");
    expect(matchAuthorToPerson({ name: "Andrea Cercek" }, "tata-memorial", people)).toBeUndefined();
    expect(matchAuthorToPerson({ name: "Avanish Saklani" }, "tata-memorial", people)?.id).toBe("c");
    expect(matchAuthorToPerson({ name: "L. Diaz", orcid: "https://orcid.org/0000-0001-0000-0002" }, "elsewhere", people)?.id).toBe("d");
  });

  it("scores institution names by shared tokens", () => {
    expect(nameSimilarity("Tata Memorial Hospital", "Tata Memorial Hospital")).toBe(1);
    expect(nameSimilarity("The Royal Marsden", "Royal Marsden NHS Foundation Trust")).toBeGreaterThan(0.3);
    expect(nameSimilarity("Jilin Cancer Hospital", "Peking University")).toBe(0);
    expect(nameSimilarity("A.C. Camargo Cancer Center", "AC Camargo Hospital")).toBe(1);
    expect(nameSimilarity("ASST Spedali Civili di Brescia", "Azienda Socio Sanitaria Territoriale degli Spedali Civili di Brescia")).toBeGreaterThanOrEqual(0.8);
    expect(nameSimilarity("University of Texas", "University of Texas MD Anderson Cancer Center")).toBeLessThan(0.6);
    expect(acronymMatches("AIIMS", "All India Institute of Medical Sciences")).toBe(true);
    expect(acronymMatches("WEHI", "Walter and Eliza Hall Institute of Medical Research")).toBe(true);
    expect(acronymMatches("MSK", "Mayo Clinic")).toBe(false);
    expect(bareDoi("https://doi.org/10.1000/ABC")).toBe("10.1000/ABC");
  });
});
