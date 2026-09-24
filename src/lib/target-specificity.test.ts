import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { graph } from "@/lib/graph";
import SpecificityExplainer from "@/app/targets/specificity/page";
import { TargetSpecificityPills } from "@/components/TargetSpecificityPills";
import { TargetWhereFound } from "@/components/TargetWhereFound";
import { TARGET_DISTRIBUTION_LABEL, TARGET_DISTRIBUTIONS, TARGET_SPECIFICITIES, TARGET_SPECIFICITY_LABEL, type Target } from "@/lib/schema";
import { targetSpecificity } from "@/data/target-specificity";
import { targetExpressionHpa } from "@/data/target-expression-hpa";
import { kindBrowser } from "@/lib/tables/kinds";
import { DISTRIBUTION_BLURB, DISTRIBUTION_GLYPH, DISTRIBUTION_MEDICINE, parseDistribution, parseSpecificity, SPECIFICITY_BLURB, SPECIFICITY_GLYPH, SPECIFICITY_MEDICINE, specificityTableHref, TUMOUR_AGNOSTIC_FACET } from "./target-specificity";

/**
 * Target specificity (scripts/fetch-target-specificity.ts, src/data/target-specificity.ts): is the target unique to
 * cancer cells, shared with normal tissue or a lineage, everywhere, inherited, or on immune cells; and in how many
 * cancer types. The generated rows must use the enums, carry a note and a source each, reach the graph, and read the
 * flagship targets the way the owner's question framed them.
 */
describe("target specificity data", () => {
  const g = graph();
  const targets = g.kind("target") as Target[];
  const byId = new Map(targets.map((t) => [t.id, t]));
  const rows = Object.entries(targetSpecificity);

  it("classifies several hundred targets with the enum values only", () => {
    expect(rows.length).toBeGreaterThan(500);
    const specs = new Set<string>(); const dists = new Set<string>();
    for (const [id, r] of rows) {
      expect(byId.has(id), `${id} is a target`).toBe(true);
      if (r.specificity) { expect(TARGET_SPECIFICITIES.includes(r.specificity), `${id} specificity ${r.specificity}`).toBe(true); specs.add(r.specificity); }
      expect(TARGET_DISTRIBUTIONS.includes(r.distribution), `${id} distribution ${r.distribution}`).toBe(true);
      dists.add(r.distribution);
    }
    // Every class is populated, so the explainer and the facets have members to show.
    for (const s of TARGET_SPECIFICITIES) expect(specs.has(s), `class ${s} populated`).toBe(true);
    for (const d of TARGET_DISTRIBUTIONS) expect(dists.has(d), `distribution ${d} populated`).toBe(true);
    expect(rows.filter(([, r]) => r.specificity).length).toBeGreaterThan(500);
  });

  it("every row carries a note naming the rule and at least one https source", () => {
    for (const [id, r] of rows) {
      expect(r.specificityNote.length, `${id} note`).toBeGreaterThan(40);
      expect(r.specificityNote, `${id} names the script`).toContain("fetch-target-specificity.ts");
      expect(r.specificityNote, `${id} distribution sentence`).toContain("Distribution:");
      expect(r.specificitySources.length, `${id} sources`).toBeGreaterThan(0);
      for (const s of r.specificitySources) { expect(s.url, `${id} source ${s.label}`).toMatch(/^https:\/\//); expect(s.label.length).toBeGreaterThan(0); }
      if (r.tumourAgnostic) { expect(r.distribution).toBe("many-types"); expect(r.specificityNote).toContain("Tissue-agnostic"); }
    }
  });

  it("reaches the target records through the graph", () => {
    for (const [id, r] of rows) {
      const t = byId.get(id)!;
      expect(t.specificity, id).toBe(r.specificity);
      expect(t.distribution, id).toBe(r.distribution);
      expect(t.specificityNote, id).toBe(r.specificityNote);
      expect(t.specificitySources.length, id).toBe(r.specificitySources.length);
      expect(!!t.tumourAgnostic, id).toBe(!!r.tumourAgnostic);
    }
    // Only targets with an approved or clinical-stage medicine are classified; a target outside that scope has nothing.
    const unclassified = targets.filter((t) => !targetSpecificity[t.id]);
    for (const t of unclassified) { expect(t.specificity, t.id).toBeUndefined(); expect(t.distribution, t.id).toBeUndefined(); }
  });

  it("reads the flagship targets the way the question framed them", () => {
    const her2 = byId.get("her2")!;
    expect(her2.specificity).toBe("tumour-associated");
    expect(her2.distribution).toBe("many-types");
    expect(her2.tumourAgnostic).toBe(true);
    const bcrAbl = byId.get("bcr-abl")!;
    expect(bcrAbl.specificity).toBe("tumour-specific");
    expect(bcrAbl.distribution).toBe("one-type");
    expect(byId.get("cd19")!.specificity).toBe("lineage-antigen");
    expect(byId.get("cd20")!.specificity).toBe("lineage-antigen");
    expect(byId.get("pd1")!.specificity).toBe("immune-microenvironment");
    expect(byId.get("pdl1")!.specificity).toBe("immune-microenvironment");
    expect(byId.get("ctla4")!.specificity).toBe("immune-microenvironment");
    expect(byId.get("kras")!.specificity).toBe("tumour-specific");
    expect(byId.get("egfr")!.specificity).toBe("tumour-specific");
    expect(byId.get("brca")!.specificity).toBe("germline-variant");
    expect(byId.get("mlh1")!.specificity).toBe("germline-variant");
    expect(byId.get("tubulin")!.specificity).toBe("broadly-expressed");
    expect(byId.get("parp")!.specificity).toBe("broadly-expressed");
    expect(byId.get("cdk4-6")!.specificity).toBe("broadly-expressed");
    expect(byId.get("vegf")!.specificity).toBe("broadly-expressed");
    expect(byId.get("trop2")!.specificity).toBe("tumour-associated");
    expect(byId.get("psma")!.specificity).toBe("tumour-associated");
    // Tissue-agnostic labels: NTRK and RET fusions, BRAF V600E, HER2 IHC 3+, the PD-1 antibodies for MSI-H.
    for (const id of ["ntrk", "ret", "braf", "pd1"]) { expect(byId.get(id)!.tumourAgnostic, id).toBe(true); expect(byId.get(id)!.distribution, id).toBe("many-types"); }
  });

  it("keeps the Human Protein Atlas rows it used, with the licence, for every classified target the atlas covers", () => {
    const hpa = Object.entries(targetExpressionHpa);
    expect(hpa.length).toBeGreaterThan(500);
    for (const [id, x] of hpa) {
      expect(byId.has(id), id).toBe(true);
      expect(x.licence).toBe("CC BY-SA 3.0");
      expect(x.version).toMatch(/^\d+\.\d+$/);
      expect(x.genes.length).toBeGreaterThan(0);
      for (const gene of x.genes) { expect(gene.ensembl).toMatch(/^ENSG\d{11}$/); expect(gene.symbol.length).toBeGreaterThan(0); expect(gene.rnaTissue.specificity.length).toBeGreaterThan(0); }
    }
    // HER2: no normal tissue stained high, breast cancer stained high in some patients; CD19: the B-cell lineage.
    const erbb2 = targetExpressionHpa.her2.genes[0];
    expect(erbb2.normalHigh).toEqual([]);
    expect(erbb2.cancers.find((c) => c.cancer === "breast cancer")?.high).toBeGreaterThan(0);
    expect(targetExpressionHpa.cd19.genes[0].bloodLineage.enriched.some((e) => e.name === "B-cells")).toBe(true);
    // A note that leans on the atlas names the gene it read.
    for (const [id, r] of rows) if (r.specificityNote.includes("HPA ")) expect(targetExpressionHpa[id], `${id} has HPA rows`).toBeTruthy();
  });
});

describe("target specificity in the pages", () => {
  it("has a blurb, a medicine sentence and a glyph for every class, in UK spelling without em-dashes", () => {
    for (const s of TARGET_SPECIFICITIES) {
      for (const text of [SPECIFICITY_BLURB[s], SPECIFICITY_MEDICINE[s], TARGET_SPECIFICITY_LABEL[s]]) { expect(text.length).toBeGreaterThan(10); expect(text).not.toMatch(/—|tumor\b|tumors\b/); }
      expect(SPECIFICITY_GLYPH[s]).toMatch(/^M/);
    }
    for (const d of TARGET_DISTRIBUTIONS) {
      for (const text of [DISTRIBUTION_BLURB[d], DISTRIBUTION_MEDICINE[d], TARGET_DISTRIBUTION_LABEL[d]]) { expect(text.length).toBeGreaterThan(10); expect(text).not.toMatch(/—|tumor\b/); }
      expect(DISTRIBUTION_GLYPH[d]).toMatch(/^M/);
    }
  });

  it("parses deep links by id or label and writes browser links the facets read", () => {
    expect(parseSpecificity("lineage-antigen")).toBe("lineage-antigen");
    expect(parseSpecificity("Lineage antigen")).toBe("lineage-antigen");
    expect(parseSpecificity("tumour-associated overexpression")).toBe("tumour-associated");
    expect(parseSpecificity("kinase")).toBeNull();
    expect(parseDistribution("Many cancer types")).toBe("many-types");
    expect(parseDistribution(null)).toBeNull();
    expect(specificityTableHref("tumour-specific")).toBe("/targets/?specificity=Tumour-specific%20alteration");
  });

  it("the target browser facets carry every class with the same counts as the data, and the tumour-agnostic tag", () => {
    const b = kindBrowser("target");
    const g = graph();
    const targets = g.kind("target") as Target[];
    expect(b.facets.map((f) => f.key)).toEqual(expect.arrayContaining(["specificity", "distribution"]));
    for (const s of TARGET_SPECIFICITIES) {
      const n = targets.filter((t) => t.specificity === s).length;
      expect(b.counts.specificity.find(([v]) => v === TARGET_SPECIFICITY_LABEL[s])?.[1] ?? 0, s).toBe(n);
    }
    for (const d of TARGET_DISTRIBUTIONS) {
      const n = targets.filter((t) => t.distribution === d).length;
      expect(b.counts.distribution.find(([v]) => v === TARGET_DISTRIBUTION_LABEL[d])?.[1] ?? 0, d).toBe(n);
    }
    expect(b.counts.tags.find(([v]) => v === TUMOUR_AGNOSTIC_FACET)?.[1]).toBe(targets.filter((t) => t.tumourAgnostic).length);
  });

  it("the explainer names every class with a count, a browser link and examples, and lists the tumour-agnostic targets", () => {
    const html = renderToStaticMarkup(createElement(SpecificityExplainer));
    for (const s of TARGET_SPECIFICITIES) {
      expect(html).toContain(`data-specificity-class="${s}"`);
      expect(html).toContain(TARGET_SPECIFICITY_LABEL[s]);
      // next/link drops the trailing slash before a query in tests: /targets/?x= renders as /targets?x=.
      expect(html).toMatch(new RegExp(`href="/targets/?\\?specificity=${encodeURIComponent(TARGET_SPECIFICITY_LABEL[s])}"`));
    }
    for (const d of TARGET_DISTRIBUTIONS) expect(html).toContain(`data-distribution-class="${d}"`);
    expect(html).toContain("data-tumour-agnostic-list");
    for (const id of ["her2", "bcr-abl", "cd19", "pd1"]) expect(html).toMatch(new RegExp(`href="/targets/${id}/?"`));
    expect(html).toContain("CC BY-SA 3.0");
    expect(html).not.toContain("—");
  });

  it("a target page shows the pills with tooltips and links, and the HPA rows it rests on", () => {
    const g = graph();
    const her2 = g.get("her2") as Target;
    const pills = renderToStaticMarkup(createElement(TargetSpecificityPills, { target: her2 }));
    expect(pills).toContain('data-specificity="tumour-associated"');
    expect(pills).toContain('data-distribution="many-types"');
    expect(pills).toContain("data-tumour-agnostic");
    expect(pills).toMatch(/href="\/targets\/?\?specificity=Tumour-associated%20overexpression"/);
    expect(pills).toContain("fetch-target-specificity.ts");
    expect(pills).toContain("proteinatlas.org");
    const where = renderToStaticMarkup(createElement(TargetWhereFound, { targetId: "her2" }));
    expect(where).toContain("data-target-hpa");
    expect(where).toContain("breast cancer");
    expect(where).toContain("CC BY-SA 3.0");
    // An unclassified target renders nothing rather than an empty block.
    const bare = g.kind("target").find((t) => !(t as Target).specificity && !(t as Target).distribution) as Target;
    expect(renderToStaticMarkup(createElement(TargetSpecificityPills, { target: bare }))).toBe("");
  });
});
