import { describe, expect, it } from "vitest";
import { OPEN_SOURCE_GENERATED, OPEN_SOURCE_SKIPPED, openSourceProjects } from "./open-source";
import { OPEN_SOURCE_CATEGORIES, OpenSourceProjectSchema } from "@/lib/schema";
import { graph } from "@/lib/graph";
import { DATA_SOURCES } from "@/data/data-sources";
import { CATEGORY_META, licenceFamily, OPENNESS_META } from "@/lib/open-source";
import { CURATED, SKIPPED } from "../../scripts/open-source-curated";

/**
 * The generated open-source records (src/data/open-source.ts) and the curated list they come from. The records
 * are what the page and the API serve, so the invariants are checked on them, not on the script: unique kebab ids,
 * https URLs, a licence that is an SPDX-looking id or one of the three placeholders with a note, every corpus id
 * referenced exists and is of the right kind, every record cites the URL it was fetched from with status 200, and
 * the curated list has no id the generated file lacks except those the skipped list explains.
 */
const SPDX = /^[A-Za-z0-9][A-Za-z0-9.+-]*$/;
const PLACEHOLDER = new Set(["custom", "none stated", "not stated"]);

describe("open-source projects", () => {
  it("has at least 200 records generated on a plausible date", () => {
    expect(openSourceProjects.length).toBeGreaterThanOrEqual(200);
    expect(OPEN_SOURCE_GENERATED).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("every record validates against the schema", () => {
    for (const p of openSourceProjects) expect(() => OpenSourceProjectSchema.parse(p), p.id).not.toThrow();
  });

  it("ids are unique kebab-case and names are unique", () => {
    const ids = openSourceProjects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    const names = openSourceProjects.map((p) => p.name.toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it("every URL is https and every record cites a 200 source fetched on the generation date", () => {
    for (const p of openSourceProjects) {
      for (const u of [p.repo, p.homepage, p.source.url].filter((x): x is string => !!x)) expect(u, `${p.id}: ${u}`).toMatch(/^https:\/\//);
      expect(p.source.status).toBe(200);
      expect(p.source.fetched).toBe(OPEN_SOURCE_GENERATED);
      expect(p.repo || p.homepage, `${p.id} has neither repo nor homepage`).toBeTruthy();
    }
  });

  it("licences are SPDX-looking ids, or a placeholder with a note explaining it", () => {
    for (const p of openSourceProjects) {
      if (PLACEHOLDER.has(p.licence)) expect(p.licenceNote, `${p.id}: "${p.licence}" needs a licenceNote`).toBeTruthy();
      else { expect(p.licence, p.id).toMatch(SPDX); expect(p.licence).not.toMatch(/^NOASSERTION$/); }
      expect(licenceFamily(p.licence)).toBeTruthy();
    }
  });

  it("every corpus id referenced exists and is of the right kind", () => {
    const g = graph();
    const sources = new Set(DATA_SOURCES.map((s) => s.id));
    for (const p of openSourceProjects) {
      for (const id of p.cancers) expect(g.get(id)?.kind, `${p.id}: cancer ${id}`).toBe("cancer");
      for (const id of p.targets) expect(g.get(id)?.kind, `${p.id}: target ${id}`).toBe("target");
      for (const id of p.technologies) expect(g.get(id)?.kind, `${p.id}: technology ${id}`).toBe("technology");
      for (const id of p.collections) expect(g.get(id)?.kind, `${p.id}: collection ${id}`).toBe("collection");
      for (const id of p.dataSources) expect(sources.has(id), `${p.id}: data source ${id}`).toBe(true);
      if (p.maintainerId) expect(["institution", "company"]).toContain(g.get(p.maintainerId)?.kind);
    }
  });

  it("categories and openness values all have display metadata and every category is used", () => {
    for (const c of OPEN_SOURCE_CATEGORIES) expect(CATEGORY_META[c].glyph).toMatch(/^M/);
    for (const p of openSourceProjects) { expect(CATEGORY_META[p.category]).toBeTruthy(); expect(OPENNESS_META[p.openness]).toBeTruthy(); }
    const used = new Set(openSourceProjects.map((p) => p.category));
    for (const c of OPEN_SOURCE_CATEGORIES) expect(used.has(c), `no record in category ${c}`).toBe(true);
  });

  it("repository records carry the facts the API gives, and page records do not invent them", () => {
    for (const p of openSourceProjects) {
      if (p.repo && p.source.url.startsWith("https://api.github.com/")) {
        expect(p.since, p.id).toBeGreaterThanOrEqual(2005);
        expect(p.lastCommit, p.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(p.stars, p.id).toBeGreaterThanOrEqual(0);
      } else {
        expect(p.stars, p.id).toBeUndefined();
        expect(p.lastCommit, p.id).toBeUndefined();
      }
      if (p.doi) expect(p.doi).toMatch(/^10\.\d{4,9}\//);
    }
  });

  it("the not-oncology exemplars are marked and named as such", () => {
    const notOnc = openSourceProjects.filter((p) => !p.oncology);
    expect(notOnc.map((p) => p.id)).toEqual(["open-source-malaria"]);
    for (const p of notOnc) expect(p.name.toLowerCase()).toContain("not oncology");
  });

  it("records OnCo and the Open Medical Registry honestly", () => {
    const onco = openSourceProjects.find((p) => p.id === "onco");
    expect(onco?.repo).toBe("https://github.com/judegomila/OnCo");
    expect(onco?.opennessNote).toMatch(/CC BY-NC 4\.0/);
    expect(openSourceProjects.find((p) => p.id === "open-medical-registry")?.repo).toBe("https://github.com/judegomila/openmedical");
  });

  it("every curated entry is either generated or explained in the skipped list", () => {
    const generated = new Set(openSourceProjects.map((p) => p.id));
    const skippedNames = OPEN_SOURCE_SKIPPED.map((s) => s.name.toLowerCase());
    const curatedIds = CURATED.map((c) => c.id);
    expect(new Set(curatedIds).size).toBe(curatedIds.length);
    for (const c of CURATED) {
      if (generated.has(c.id)) continue;
      const explained = skippedNames.some((n) => n.includes(c.name.toLowerCase()) || n.includes(c.id));
      expect(explained, `${c.id} (${c.name}) is neither generated nor in the skipped list`).toBe(true);
    }
    expect(OPEN_SOURCE_SKIPPED.length).toBeGreaterThanOrEqual(SKIPPED.length);
    for (const s of OPEN_SOURCE_SKIPPED) expect(s.reason.length).toBeGreaterThan(20);
  });

  it("uses UK spelling and no em-dashes in the hand-written text (proper names such as 'Brain Tumor Segmentation' excepted)", () => {
    for (const p of openSourceProjects) {
      const text = [p.summary, p.opennessNote, p.licenceNote].filter(Boolean).join(" ");
      expect(text, p.id).not.toMatch(/—/);
      expect(text, p.id).not.toMatch(/\b(license|colors?|standardized|organizations?)\b/);
    }
  });
});
