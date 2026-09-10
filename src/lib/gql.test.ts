import { describe, expect, it } from "vitest";
import { complete, describe as describeQuery, GqlError, parse, query, resolveKind, type GqlData } from "./gql";

const data: GqlData = {
  nodes: [
    { id: "tnbc", kind: "cancer", name: "TNBC", route: "/cancers/tnbc/", tags: [], tldr: "Triple-negative breast cancer", degree: 3 },
    { id: "nsclc", kind: "cancer", name: "NSCLC", route: "/cancers/nsclc/", tags: [], tldr: "Lung cancer", degree: 1 },
    { id: "sg", kind: "drug", name: "Sacituzumab govitecan", route: "/drugs/sg/", status: "approved", tags: ["adc"], tldr: "TROP2 ADC", degree: 3 },
    { id: "dato", kind: "drug", name: "Datopotamab deruxtecan", route: "/drugs/dato/", status: "phase-3", tags: ["adc"], tldr: "TROP2 ADC", degree: 2 },
    { id: "trop2", kind: "target", name: "TROP2", route: "/targets/trop2/", tags: ["adc-target"], tldr: "Surface antigen", degree: 3 },
    { id: "her2", kind: "target", name: "HER2", route: "/targets/her2/", tags: ["adc-target", "pet-target"], tldr: "Receptor", degree: 1 },
    { id: "pet", kind: "technology", name: "TROP2 PET", route: "/technologies/pet/", status: "phase-1", tags: ["pet"], tldr: "Imaging", degree: 1 },
  ],
  edges: [[0, 2], [0, 3], [0, 4], [2, 4], [3, 4], [1, 5], [4, 6]],
};

describe("gql parse", () => {
  it("parses hops, ids, filters and limit", () => {
    const q = parse("cancer:tnbc -> drugs(status:approved) -> targets | limit:5");
    expect(q.stages.length).toBe(3);
    expect(q.stages[0]).toMatchObject({ kind: "cancer", id: "tnbc" });
    expect(q.stages[1].filters).toEqual([{ key: "status", negate: false, value: "approved" }]);
    expect(q.limit).toBe(5);
  });

  it("parses has/no existence clauses and negated filters", () => {
    const q = parse('targets has drugs(status:approved) no technologies(tag!:"x")');
    expect(q.stages[0].exists.map((e) => e.negate)).toEqual([false, true]);
    expect(q.stages[0].exists[1].filters[0]).toEqual({ key: "tag", negate: true, value: "x" });
  });

  it("accepts plural, singular and aliases for kinds", () => {
    expect(resolveKind("drugs")).toBe("drug");
    expect(resolveKind("products")).toBe("drug");
    expect(resolveKind("key-papers")).toBe("paper");
    expect(resolveKind("*")).toBe("*");
    expect(resolveKind("wibble")).toBeUndefined();
  });

  it("rejects bad input with a position", () => {
    expect(() => parse("wibble -> drugs")).toThrow(GqlError);
    expect(() => parse("drugs(colour:red)")).toThrow(/Unknown filter/);
    expect(() => parse("drugs | limit:x")).toThrow(/positive whole number/);
    try { parse("drugs -> "); } catch (e) { expect((e as GqlError).position).toBeGreaterThan(0); }
  });
});

describe("gql run", () => {
  it("walks hops and applies filters", () => {
    const r = query("cancer:tnbc -> drugs(status:approved) -> targets", data);
    expect(r.counts).toEqual([1, 1, 1]);
    expect(r.nodes.map((n) => n.id)).toEqual(["trop2"]);
  });

  it("keeps items by existence of neighbours", () => {
    expect(query("targets has drugs(status:approved)", data).nodes.map((n) => n.id)).toEqual(["trop2"]);
    expect(query("targets no drugs", data).nodes.map((n) => n.id)).toEqual(["her2"]);
    expect(query("cancers no drugs(status:phase-3)", data).nodes.map((n) => n.id)).toEqual(["nsclc"]);
  });

  it("supports or-values, text and minlinks, and the wildcard kind", () => {
    expect(query("drugs(status:approved+phase-3)", data).nodes.length).toBe(2);
    expect(query("*(text:trop2, minlinks:3)", data).nodes.map((n) => n.id).sort()).toEqual(["sg", "trop2"]);
    expect(query("target:trop2 -> *", data).nodes.length).toBe(4);
  });

  it("describes itself in English", () => {
    expect(describeQuery(parse("cancer:tnbc -> drugs(status:approved) -> targets"))).toBe("cancer tnbc, then their drugs with status approved, then their targets");
    expect(describeQuery(parse("targets no technologies(tag:pet)"))).toBe("all targets without a linked technology with tag pet");
  });
});

describe("gql complete", () => {
  it("suggests kinds at the start and after an arrow", () => {
    expect(complete("", data).options.map((o) => o.value)).toContain("drugs");
    expect(complete("cancer:tnbc -> dr", data).options.map((o) => o.value)).toEqual(["drugs"]);
  });
  it("suggests ids after kind: and filter keys inside parentheses", () => {
    expect(complete("cancer:t", data).options.map((o) => o.value)).toEqual(["tnbc"]);
    expect(complete("drugs(", data).options.map((o) => o.value)).toContain("status:");
    expect(complete("drugs(status:ap", data).options.map((o) => o.value)).toEqual(["approved"]);
    expect(complete("drugs(status:approved, ta", data).options.map((o) => o.value)).toEqual(["tag:"]);
  });
  it("suggests connectors after a complete reference", () => {
    expect(complete("drugs ", data).options.map((o) => o.value)).toContain("->");
  });
});
