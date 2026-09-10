import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { openmedical } from "./openmedical";
import { openMedicalBySection, openMedicalForSection, openMedicalForTechnology } from "@/lib/openmedical";
import { sections } from "./sections";
import { blurbOf, licenceOf } from "@/lib/openmedical-text";

/**
 * The Open Medical Registry snapshot is joined to the graph by id: every front, technology and cancer it names must
 * exist and be of that kind, and every entry must carry both a registry record link and a project homepage.
 */
describe("open medical registry snapshot", () => {
  const g = graph();
  const url = (u: string, where: string) => { expect(() => new URL(u), `${where}: bad url ${u}`).not.toThrow(); expect(u.startsWith("http"), `${where}: ${u}`).toBe(true); };

  it("has a sensible number of entries with unique ids", () => {
    expect(openmedical.length).toBeGreaterThanOrEqual(60);
    expect(openmedical.length).toBeLessThanOrEqual(150);
    expect(new Set(openmedical.map((e) => e.id)).size).toBe(openmedical.length);
  });

  it("maps every entry to existing fronts, technologies and cancers", () => {
    for (const e of openmedical) {
      expect(e.sections.length, `${e.id} has no front`).toBeGreaterThan(0);
      for (const s of e.sections) expect(g.get(s)?.kind, `${e.id}: front ${s}`).toBe("section");
      for (const t of e.technologies ?? []) expect(g.get(t)?.kind, `${e.id}: technology ${t}`).toBe("technology");
      for (const c of e.cancers ?? []) expect(g.get(c)?.kind, `${e.id}: cancer ${c}`).toBe("cancer");
    }
  });

  it("carries both links, a registry record URL, a licence and a one-line blurb", () => {
    for (const e of openmedical) {
      url(e.url, e.id); url(e.homepage, e.id);
      expect(e.url, e.id).toMatch(/^https:\/\/openmedical\.sh\/registry\/[a-z]+\/[a-z0-9-]+\/$/);
      expect(e.url.endsWith(`/${e.category}/${e.id}/`), `${e.id}: record url does not match category and id`).toBe(true);
      expect(e.licence.length, e.id).toBeGreaterThan(0);
      expect(e.blurb.length, e.id).toBeGreaterThan(0);
      expect(e.blurb.length, `${e.id} blurb too long`).toBeLessThanOrEqual(160);
      expect(e.blurb, e.id).not.toMatch(/[—\n]/);
      expect(typeof e.verified).toBe("boolean");
      expect(e.fetched).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("covers the fronts the owner asked for", () => {
    for (const s of ["imaging", "radiation", "diagnostics", "early-detection", "surgery", "ai-computation", "supportive-care", "drug-discovery"]) expect(openMedicalForSection(s).length, s).toBeGreaterThan(0);
    expect(openMedicalForTechnology("mri").length).toBeGreaterThan(0);
    const groups = openMedicalBySection(sections.map((s) => s.id));
    expect(groups.every((x) => x.entries.length > 0)).toBe(true);
    expect(openMedicalForSection("imaging")[0].verified, "verified records rank first").toBe(true);
  });

  it("normalises blurbs and licences", () => {
    expect(blurbOf("[ECCV 2026] A model — for slides. Second sentence.")).toBe("A model, for slides.");
    expect(blurbOf("⚡ Open-source software for deep learning-based digital pathology")).toBe("Open-source software for deep learning-based digital pathology");
    expect(blurbOf("x".repeat(200)).length).toBeLessThanOrEqual(160);
    expect(licenceOf(["NOASSERTION"])).toBe("not stated");
    expect(licenceOf(["LicenseRef-Slicer-1.0"])).toBe("Slicer-1.0");
    expect(licenceOf(["CERN-OHL-W-2.0", "GPL-3.0"])).toBe("CERN-OHL-W-2.0 / GPL-3.0");
  });
});
