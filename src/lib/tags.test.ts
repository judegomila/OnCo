import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { allTags, NO_DESCRIPTION, publicTags, relatedTags, TAG_DESCRIPTIONS, tagIndex, tagRoute, tagSlug, tagsForSlug } from "./tags";
import { entityYear, TAG_COLUMNS, TAG_FACETS, taggedRows, tagTables } from "./tables/tagged";
import { hasVisual } from "./row-visual";
import { KIND_PAGE } from "./static-tables";
import { generateStaticParams } from "@/app/tagged/[tag]/page";

/**
 * Every reader-facing tag has a page at /tagged/<slug>/ (src/app/tagged/[tag]/page.tsx). The slug is the URL-safe
 * form of the tag and several spellings may share one; the index keeps the reverse map, so a chip's slug always
 * lands on a page that lists the record it came from.
 */
describe("tag slugs round-trip", () => {
  const g = graph();
  const idx = tagIndex();

  it("slugs are URL-safe and stable", () => {
    for (const [tag, slug] of [["global oncology", "global-oncology"], ["MDS", "mds"], ["early-phase trials", "early-phase-trials"], ["  odd  ", "odd"], ["", "tag"], ["Résumé", "r-sum"]] as const) expect(tagSlug(tag)).toBe(slug);
    for (const t of idx.values()) expect(t.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(tagRoute("global oncology")).toBe("/tagged/global-oncology/");
  });

  it("every public tag on every record maps to a page that lists that record", () => {
    let checked = 0;
    for (const e of g.entities) for (const t of publicTags(e.tags)) {
      const slug = tagSlug(t);
      expect(tagsForSlug(slug), `${e.id}: ${t}`).toContain(t);
      expect(idx.get(slug)!.ids, `${e.id}: ${t}`).toContain(e.id);
      checked++;
    }
    expect(checked).toBeGreaterThan(5000);
  });

  it("the index counts each record once per slug and the static params cover every slug", () => {
    const params = new Set(generateStaticParams().map((p) => p.tag));
    expect(params.size).toBe(idx.size);
    for (const t of idx.values()) {
      expect(params).toContain(t.slug);
      expect(new Set(t.ids).size).toBe(t.count);
      expect(Object.values(t.kinds).reduce((n, x) => n + x, 0)).toBe(t.count);
      expect(t.variants[0]).toBe(t.tag);
      expect(t.description.length).toBeGreaterThan(0);
    }
    expect(idx.size).toBeGreaterThan(400);
    const spelled = [...idx.values()].filter((t) => t.variants.length > 1);
    expect(spelled.length).toBeGreaterThan(10);
    expect(allTags()[0].slug).toBe("pipeline");
  });

  it("descriptions are written for tags that exist and read as one plain sentence", () => {
    for (const [key, text] of Object.entries(TAG_DESCRIPTIONS)) {
      const slug = tagSlug(key);
      expect(idx.has(slug), `description for unknown tag ${key}`).toBe(true);
      expect(text).toMatch(/\.$/);
      expect(text).not.toContain("—");
    }
    const described = [...idx.values()].filter((t) => t.description !== NO_DESCRIPTION);
    expect(described.length).toBeGreaterThan(80);
    // The most used tags all carry a sentence.
    for (const t of allTags().slice(0, 40)) expect(t.description, t.slug).not.toBe(NO_DESCRIPTION);
  });

  it("related tags share records and never include the tag itself", () => {
    const rel = relatedTags("pipeline");
    expect(rel.length).toBeGreaterThan(0);
    for (const r of rel) { expect(r.entry.slug).not.toBe("pipeline"); expect(r.shared).toBeGreaterThan(0); expect(r.shared).toBeLessThanOrEqual(r.entry.count); }
    expect(relatedTags("no-such-tag")).toEqual([]);
  });
});

describe("tag browser rows", () => {
  it("every row has a picture, its kind, its facets and links to its other tags", () => {
    const idx = tagIndex();
    for (const slug of ["pipeline", "china", "hero", "law", "supportive"]) {
      const entry = idx.get(slug)!;
      const rows = taggedRows(entry);
      expect(rows.length).toBe(entry.count);
      expect(new Set(rows.map((r) => r.id)).size).toBe(rows.length);
      for (const r of rows) {
        expect(hasVisual(r), `${slug}: ${r.id}`).toBe(true);
        expect(r.kind).toBeDefined();
        expect(r.facets.kind).toHaveLength(1);
        for (const l of r.cols.tags as Array<{ href: string }>) expect(l.href).toMatch(/^\/tagged\/[a-z0-9-]+\/$/);
      }
      // Name order, as the page opens.
      const names = rows.map((r) => r.name);
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    }
    // A record carrying two spellings of one tag appears once and links the tag page once.
    const facetKeys = TAG_FACETS.map((f) => f.key);
    expect(facetKeys).toEqual(["kind", "cancers", "year"]);
    expect(TAG_COLUMNS.map((c) => c.key)).toContain("tags");
  });

  it("years come from the field each kind turns on", () => {
    const g = graph();
    const paper = g.kind("paper")[0], trial = g.kind("trial").find((t) => t.yearReported)!, drug = g.kind("drug").find((d) => d.approvals.length)!;
    expect(entityYear(paper)).toBe(paper.year);
    expect(entityYear(trial)).toBe(trial.yearReported);
    expect(entityYear(drug)).toBe(Math.min(...drug.approvals.map((a) => a.year)));
    expect(entityYear(g.kind("person")[0])).toBeUndefined();
  });

  it("registers a table file for every tag longer than one page, and only those", () => {
    const files = tagTables();
    const long = allTags().filter((t) => t.count > KIND_PAGE);
    expect(files.map((f) => f.id)).toEqual(long.map((t) => `tag-${t.slug}`));
    for (const f of files) { expect(f.page).toBe(KIND_PAGE); expect(f.rows.length).toBeGreaterThan(KIND_PAGE); }
    expect(files.length).toBeGreaterThan(10);
  });
});
