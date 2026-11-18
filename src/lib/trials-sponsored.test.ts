import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { graph } from "./graph";
import { filedUnder, institutionsSponsoring, namesInstitution, splitSponsorText, sponsoredBy, sponsorInstitution } from "./trials-sponsored";
import { INSTITUTION_SPONSORED_PAGE, institutionSponsoredRows } from "./tables/institution-sponsored";
import { InstitutionTrialsSponsored } from "@/components/TrialsSponsored";

/**
 * "Trials it sponsors or funds" is derived from the sponsor fields of the trial records, so these hold the
 * derivation to its sources: a row is there only when the source's own words name the institution, and a name the
 * sponsor map files under a better-known relative is counted, never listed.
 */
describe("reading a sponsor line", () => {
  it("credits each co-sponsor and marks what follows 'funded by' as a funder", () => {
    expect(splitSponsorText("SWOG / NCI")).toEqual([{ name: "SWOG", role: "sponsor" }, { name: "NCI", role: "sponsor" }]);
    expect(splitSponsorText("University of Leeds, funded by Cancer Research UK and Yorkshire Cancer Research")).toEqual([
      { name: "University of Leeds", role: "sponsor" },
      { name: "Cancer Research UK", role: "funder" },
      { name: "Yorkshire Cancer Research", role: "funder" },
    ]);
    expect(splitSponsorText("Agios (now Servier)")).toEqual([{ name: "Agios", role: "sponsor" }]);
  });

  it("matches an institution's name on whole words, and a short alias only as the whole name", () => {
    expect(namesInstitution("National Cancer Institute (NCI)", "nci")).toBe(true);
    expect(namesInstitution("NCI", "nci")).toBe(true);
    // A fragment is not a name: "NCI" inside another word or beside other words is someone else.
    expect(namesInstitution("NCIC Clinical Trials Group", "nci")).toBe(false);
    expect(namesInstitution("NCI Canada", "nci")).toBe(false);
    expect(namesInstitution("Cancer Research UK", "cruk")).toBe(true);
    expect(namesInstitution("Institute of Cancer Research UKRI", "cruk")).toBe(false);
  });
});

describe("the derived rows", () => {
  const g = graph();
  const ids = institutionsSponsoring();

  it("lists a trial only under an institution its sponsor or funder name actually names", () => {
    for (const id of ids) {
      expect(g.get(id)?.kind, id).toBe("institution");
      for (const s of sponsoredBy(id)) {
        expect(s.trial.kind).toBe("trial");
        expect(s.roles.length, `${s.trial.id} under ${id}`).toBeGreaterThan(0);
        expect(s.namedAs.length).toBeGreaterThan(0);
        for (const n of s.namedAs) {
          expect(sponsorInstitution(n), `${n} on ${s.trial.id}`).toBe(id);
          expect(namesInstitution(n, id), `${n} does not name ${id}`).toBe(true);
        }
      }
    }
  });

  it("lists each trial once for an institution", () => {
    for (const id of ids) { const t = sponsoredBy(id).map((s) => s.trial.id); expect(new Set(t).size, id).toBe(t.length); }
  });

  it("never lists what the sponsor map files under a better-known relative", () => {
    // "Fudan University" is filed under the Shanghai Cancer Center for the leaderboard; it is also two other hospitals.
    const fudan = sponsorInstitution("Fudan University");
    if (fudan) {
      expect(namesInstitution("Fudan University", fudan)).toBe(false);
      expect(sponsoredBy(fudan).some((s) => s.namedAs.includes("Fudan University"))).toBe(false);
    }
    for (const id of ids) for (const f of filedUnder(id)) expect(namesInstitution(f.name, id), `${f.name} under ${id}`).toBe(false);
  });

  it("reaches the funders the census named, in number", () => {
    // Measured 16 Nov 2026: 116 institutions and 612 institution-trial pairs, 116 of them linked by a record field
    // before. The National Cancer Institute lists 128 trials and Cancer Research UK 49.
    expect(ids.length).toBeGreaterThanOrEqual(110);
    expect(ids.reduce((n, id) => n + sponsoredBy(id).length, 0)).toBeGreaterThanOrEqual(590);
    expect(sponsoredBy("nci").length).toBeGreaterThanOrEqual(115);
    expect(sponsoredBy("cruk").length).toBeGreaterThanOrEqual(44);
    expect(sponsoredBy("yorkshire-cancer-research").map((s) => s.trial.id)).toContain("foxtrot");
    expect(sponsoredBy("ministry-of-health-malaysia").map((s) => s.trial.id)).toContain("nct01086488");
  });

  it("puts phase 3 first and gives every row a role and its source", () => {
    const rows = institutionSponsoredRows(sponsoredBy("nci"));
    expect(rows.length).toBeGreaterThan(INSTITUTION_SPONSORED_PAGE);
    expect(rows[0].phase).toMatch(/3/);
    for (const r of rows) { expect(r.role).toBeTruthy(); expect(String(r.namedAs)).toMatch(/\((ClinicalTrials\.gov|ISRCTN|OnCo trial record)/); }
  });

  it("stays inside its markup budget on every institution page", () => {
    const kb = (id: string) => Buffer.byteLength(renderToStaticMarkup(createElement(InstitutionTrialsSponsored, { id, name: id })), "utf8") / 1024;
    const sizes = ids.map((id) => [id, kb(id)] as const).sort((a, b) => b[1] - a[1]);
    // Measured 16 Nov 2026: 17.2 KB at the heaviest (fifteen rows of long trial names); the budget is that plus the
    // 15 per cent margin src/app/heavy-pages.test.ts uses. The hydration payload adds the same rows as JSON.
    expect(sizes[0][1], `${sizes[0][0]} is the heaviest at ${sizes[0][1].toFixed(1)} KB`).toBeLessThan(20);
  });
});
