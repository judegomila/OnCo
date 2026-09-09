import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EntitySchema, type Entity, type EntityInput } from "../src/lib/schema";
import type { Spike } from "../src/data/spikes";
import { auditEntities, eventDate, levenshteinWithin, nearDuplicateCandidates, regionOf, spikeDivergences } from "./audit";
import { extractNumbers, numberFindings } from "./numbers";
import { NON_SPIKE_FILES, SPIKE_FILES } from "./spike-sources";

const NOW = new Date("2026-09-09T12:00:00Z");
const base = { asOf: "2026-09-01", tldr: "A plain sentence for a general reader that is long enough.", summary: "A technical summary." };

function drug(id: string, x: Partial<Extract<EntityInput, { kind: "drug" }>> = {}): EntityInput {
  return { kind: "drug", id, name: id, modality: "Small molecule", mechanism: "Blocks a kinase.", ...base, ...x } as EntityInput;
}
function trial(id: string, x: Partial<Extract<EntityInput, { kind: "trial" }>> = {}): EntityInput {
  return { kind: "trial", id, name: id.toUpperCase(), phase: "3", setting: "First line", ...base, ...x } as EntityInput;
}
function term(id: string, x: Partial<Extract<EntityInput, { kind: "term" }>> = {}): EntityInput {
  return { kind: "term", id, name: id, category: "Endpoints", ...base, ...x } as EntityInput;
}
function parse(inputs: EntityInput[]): Entity[] {
  return inputs.map((i) => EntitySchema.parse(i));
}
const checks = (fs: ReturnType<typeof auditEntities>, check: string) => fs.filter((f) => f.check === check);

describe("audit helpers", () => {
  it("maps free-text approval regions onto the six regional-approvals regions", () => {
    expect(regionOf("US")).toBe("US");
    expect(regionOf("FDA (accelerated)")).toBe("US");
    expect(regionOf("EU")).toBe("EU");
    expect(regionOf("EMA")).toBe("EU");
    expect(regionOf("Japan")).toBe("JP");
    expect(regionOf("China (NMPA)")).toBe("CN");
    expect(regionOf("Canada")).toBeNull();
  });

  it("normalises loose regulatory event dates to the end of the period", () => {
    expect(eventDate("2020-04-22")).toBe("2020-04-22");
    expect(eventDate("2026-Q2")).toBe("2026-06-30");
    expect(eventDate("2026-Q1")).toBe("2026-03-31");
    expect(eventDate("2024-11")).toBe("2024-11-28");
    expect(eventDate("mid-2026")).toBeNull();
  });

  it("bounded Levenshtein exits early and agrees with the exact distance", () => {
    expect(levenshteinWithin("kitten", "sitting", 3)).toBe(true);
    expect(levenshteinWithin("kitten", "sitting", 2)).toBe(false);
    expect(levenshteinWithin("abc", "abc", 0)).toBe(true);
    expect(levenshteinWithin("trastuzumab deruxtecan", "trastuzumab deruxtecen", 2)).toBe(true);
  });

  it("only compares names that could be the same thing spelled twice", () => {
    expect(nearDuplicateCandidates("afatinib", "axitinib")).toBe(false); // INN stems share an ending
    expect(nearDuplicateCandidates("checkmate 141", "checkmate 214")).toBe(false); // digits differ
    expect(nearDuplicateCandidates("trastuzumab deruxtecan", "trastuzumab deruxtecen")).toBe(true);
    expect(nearDuplicateCandidates("b cell", "t cell")).toBe(false);
  });
});

describe("contradiction checks", () => {
  it("flags approvals that disagree with regional-approvals.ts", () => {
    const es = parse([drug("a", { status: "approved", approvals: [{ region: "US", year: 2026, indication: "x" }] }), drug("b", { status: "approved", approvals: [{ region: "US", year: 2017, indication: "x" }] })]);
    const regional = { a: { US: { status: "under-review" as const, note: "NDA expected" } }, b: { US: { status: "approved" as const, year: 2013 }, EU: { status: "approved" as const, year: 2014 } } };
    const fs = checks(auditEntities(es, { now: NOW, regional, numbers: false }), "approvals-vs-regional");
    expect(fs.map((f) => [f.id, f.severity])).toEqual([["a", "high"], ["b", "medium"], ["b", "low"]]);
  });

  it("flags a positive trial whose primary hazard ratio is at or above 1, unless it is a non-inferiority design", () => {
    const hr = { endpoint: "OS", primary: true, unit: "months", arms: [{ name: "A", value: 10 }, { name: "B", value: 11 }], hr: 1.05 };
    const es = parse([trial("t1", { status: "positive", nct: "NCT00000001", outcomes: [hr] }), trial("t2", { status: "positive", nct: "NCT00000002", result: "Non-inferior on OS.", outcomes: [hr] })]);
    expect(checks(auditEntities(es, { now: NOW, numbers: false }), "positive-hr-ge-1").map((f) => f.id)).toEqual(["t1"]);
  });

  it("flags asOf older than the latest regulatory event that has already happened", () => {
    const es = parse([
      drug("old", { asOf: "2026-01-10", regulatoryEvents: [{ date: "2026-03-05", type: "approval", region: "US", note: "Approved" }] }),
      drug("future", { asOf: "2026-01-10", regulatoryEvents: [{ date: "2026-11-14", type: "pdufa", region: "US", note: "Goal date" }] }),
      drug("quarter", { asOf: "2026-09-04", regulatoryEvents: [{ date: "2026-Q2", type: "approval", region: "US", note: "Approved" }] }),
    ]);
    expect(checks(auditEntities(es, { now: NOW, numbers: false }), "asof-before-regulatory-event").map((f) => f.id)).toEqual(["old"]);
  });

  it("finds spike duplicates whose scalar fields diverge", () => {
    const a: Spike = { cancerId: "hcc", entities: [drug("lenvatinib", { modality: "Multi-kinase inhibitor" })], patch: {} };
    const b: Spike = { cancerId: "rcc", entities: [drug("lenvatinib", { modality: "TKI", cancers: ["rcc"] })], patch: {} };
    const c: Spike = { cancerId: "thyroid", entities: [drug("lenvatinib", { modality: "Multi-kinase inhibitor" })], patch: {} };
    const d = spikeDivergences([a, b, c]);
    expect(d).toHaveLength(1);
    expect(d[0].id).toBe("lenvatinib");
    expect(d[0].spikes).toEqual(["hcc", "rcc", "thyroid"]);
    expect(d[0].fields[0]).toMatch(/^modality: /);
    expect(spikeDivergences([a, c])).toHaveLength(0);
    const fs = checks(auditEntities(parse([drug("lenvatinib")]), { now: NOW, spikes: [a, b], numbers: false }), "spike-scalar-divergence");
    expect(fs).toHaveLength(1);
  });

  it("flags roadmap steps that are not historic but cite a withdrawn product", () => {
    const es = parse([
      drug("gone", { status: "withdrawn" }),
      { kind: "roadmap", id: "r", name: "Roadmap", ...base, steps: [{ era: "2010s", title: "Then", description: "d", refs: ["gone"], status: "historic" }, { era: "2020s", title: "Now", description: "d", refs: ["gone"], status: "current" }] } as EntityInput,
    ]);
    const fs = checks(auditEntities(es, { now: NOW, numbers: false }), "roadmap-cites-withdrawn");
    expect(fs).toHaveLength(1);
    expect(fs[0].detail).toContain('step "Now"');
  });
});

describe("orphan and near-duplicate checks", () => {
  it("flags entities with no incoming and at most one outgoing link", () => {
    const es = parse([term("alone"), term("linked", { related: ["alone-ish"] }), term("alone-ish", { related: ["linked"] })]);
    // "linked" and "alone-ish" point at each other; "alone" has nothing.
    expect(checks(auditEntities(es, { now: NOW, numbers: false }), "orphan").map((f) => f.id)).toEqual(["alone"]);
  });

  it("flags name or aka collisions across kinds unless the records are cross-linked", () => {
    const es = parse([
      term("organoid", { name: "Organoids" }),
      { kind: "technology", id: "organoids", name: "Patient-derived organoids", aka: ["Organoids"], principle: "p", ...base } as EntityInput,
      term("linked-term", { name: "Radiotherapy", related: ["linked-tech"] }),
      { kind: "technology", id: "linked-tech", name: "Radiotherapy", principle: "p", ...base } as EntityInput,
    ]);
    const fs = checks(auditEntities(es, { now: NOW, numbers: false }), "name-collision-across-kinds");
    expect(fs.map((f) => f.id).sort()).toEqual(["organoid", "organoids"]);
  });

  it("flags near-duplicate names within a kind and suggests which to keep", () => {
    const es = parse([drug("trastuzumab-deruxtecan", { name: "Trastuzumab deruxtecan" }), drug("trastuzumab-deruxtecen", { name: "Trastuzumab deruxtecen" }), drug("afatinib", { name: "Afatinib" }), drug("axitinib", { name: "Axitinib" })]);
    const fs = checks(auditEntities(es, { now: NOW, numbers: false }), "near-duplicate-levenshtein");
    expect(fs).toHaveLength(1);
    expect(fs[0].id).toBe("trastuzumab-deruxtecan");
    expect(fs[0].detail).toContain("keep trastuzumab-deruxtecan");
  });

  it("flags products sharing a development code", () => {
    const es = parse([drug("x1", { code: "DS-8201a" }), drug("x2", { code: "DS-8201a, T-DXd" }), drug("x3", { code: "ABC-1" })]);
    expect(checks(auditEntities(es, { now: NOW, numbers: false }), "shared-code").map((f) => f.id)).toEqual(["x1", "x2"]);
  });
});

describe("unsourced numbers", () => {
  it("extracts percentages, hazard ratios, months and money but not bare years", () => {
    const hits = extractNumbers("Approved in 2020. ORR 52%, median PFS 11.1 months, HR 0.65, list price $14,000 per cycle; 1.2 million cases.");
    expect(hits.map((h) => h.kind)).toEqual(["percent", "hazard-ratio", "months", "money", "count"]);
    expect(extractNumbers("Approved in 2020 and again in 2023.")).toHaveLength(0);
  });

  it("flags records with numbers and no source, and outcomes with values but no source", () => {
    const es = parse([
      drug("unsourced", { summary: "Response rate 52% in the pivotal trial." }),
      drug("sourced", { summary: "Response rate 52% in the pivotal trial.", links: [{ label: "Label", url: "https://example.org/label" }] }),
      trial("nct-only", { nct: "NCT00000003", result: "Median OS 12 months.", outcomes: [{ endpoint: "OS", arms: [{ name: "A", value: 12 }] }] }),
    ]);
    const fs = numberFindings(es);
    expect(fs.map((f) => [f.check, f.id])).toEqual([["unsourced-numbers", "unsourced"], ["outcome-no-source", "nct-only"]]);
    expect(checks(auditEntities(es, { now: NOW }), "unsourced-numbers")).toHaveLength(1);
  });
});

describe("spike sources", () => {
  it("lists every spike file on disk, so a new spike cannot be missed by the audit", () => {
    const onDisk = readdirSync(join(process.cwd(), "src", "data", "spikes")).filter((f) => f.endsWith(".ts")).map((f) => f.replace(/\.ts$/, "")).filter((f) => !NON_SPIKE_FILES.includes(f)).sort();
    expect(Object.keys(SPIKE_FILES).sort()).toEqual(onDisk);
    for (const [file, spike] of Object.entries(SPIKE_FILES)) expect(spike.cancerId, file).toBeTruthy();
  });
});
