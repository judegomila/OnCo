import { describe, expect, it } from "vitest";
import { dedupeLists, normaliseDoi, richness } from "./duplicate-records";

describe("dedupeLists", () => {
  it("drops a repeat inside one list", () => {
    expect(dedupeLists(`  keyPapers: ["a", "a"],`)).toBe(`  keyPapers: ["a"],`);
    expect(dedupeLists(`  keyPapers: ["a", "b", "a", "c"],`)).toBe(`  keyPapers: ["a", "b", "c"],`);
  });

  it("leaves the same id in two different lists alone", () => {
    expect(dedupeLists(`  cancers: ["a"], drugs: ["a"],`)).toBe(`  cancers: ["a"], drugs: ["a"],`);
  });

  it("leaves nested objects and object keys alone", () => {
    expect(dedupeLists(`  links: [{ label: "a", url: "u" }, { label: "a", url: "v" }],`)).toBe(`  links: [{ label: "a", url: "u" }, { label: "a", url: "v" }],`);
    expect(dedupeLists(`  { "a": 1, "b": 2 }`)).toBe(`  { "a": 1, "b": 2 }`);
  });

  it("drops the trailing repeat without leaving a dangling comma", () => {
    expect(dedupeLists(`  refs: ["a", "b", "b"] },`)).toBe(`  refs: ["a", "b"] },`);
    expect(dedupeLists(`  refs: ["b", "b"] },`)).toBe(`  refs: ["b"] },`);
  });
});

describe("normaliseDoi", () => {
  it("strips the resolver, the case and a trailing full stop", () => {
    expect(normaliseDoi("https://doi.org/10.1056/NEJMoa0810699")).toBe("10.1056/nejmoa0810699");
    expect(normaliseDoi(" 10.1056/NEJMoa0810699. ")).toBe("10.1056/nejmoa0810699");
  });
});

describe("richness", () => {
  it("scores a thin ingest below a curated record", () => {
    const ingest = { summary: "x".repeat(400), findings: [], cancers: [], journals: ["nejm"] };
    const curated = { summary: "x".repeat(400), findings: ["a", "b", "c"], caveats: ["d"], cancers: ["nsclc"], drugs: ["gefitinib"], journals: ["nejm"] };
    expect(richness(curated)).toBeGreaterThan(richness(ingest));
  });
});
