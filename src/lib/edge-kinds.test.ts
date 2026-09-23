import { describe, expect, it } from "vitest";
import { EDGE_KINDS, countEdgeKinds, edgeGroupLabel, edgeHref, edgeKindFromSlug, edgeMatches, edgeQuery, edgeTypeSlug, filterEdge, parseEdgeQuery, type EdgeFilterable } from "./edge-kinds";

describe("edge filter URL state", () => {
  it("gives every kind a distinct plural slug that reads back", () => {
    const slugs = EDGE_KINDS.map(edgeTypeSlug);
    expect(new Set(slugs).size).toBe(EDGE_KINDS.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z]+(-[a-z]+)*$/);
    for (const k of EDGE_KINDS) expect(edgeKindFromSlug(edgeTypeSlug(k))).toBe(k);
    expect(edgeTypeSlug("approval")).toBe("approvals");
    expect(edgeTypeSlug("law")).toBe("law");
    expect(edgeKindFromSlug("Result")).toBe("result");
    expect(edgeKindFromSlug("nonsense")).toBeUndefined();
  });
  it("round-trips ?type= and ?for= in kind order, dropping unknown values and leaving other keys alone", () => {
    expect(parseEdgeQuery("?type=results,approvals")).toEqual({ types: ["approval", "result"], for: undefined });
    expect(parseEdgeQuery("?type=results&type=law&type=bogus")).toEqual({ types: ["result", "law"], for: undefined });
    expect(parseEdgeQuery("?for=tnbc")).toEqual({ types: [], for: "tnbc" });
    expect(parseEdgeQuery("?for=me&type=papers")).toEqual({ types: ["paper"], for: "me" });
    expect(parseEdgeQuery("?for=../etc")).toEqual({ types: [], for: undefined });
    const q = edgeQuery({ types: ["result", "approval"], for: "tnbc" }, "?q=keep");
    expect(q).toBe("?q=keep&type=approvals,results&for=tnbc");
    expect(parseEdgeQuery(q)).toEqual({ types: ["approval", "result"], for: "tnbc" });
    expect(edgeQuery({ types: [] })).toBe("");
    expect(edgeQuery({ types: [...EDGE_KINDS] })).toBe("");
    expect(edgeHref({ types: ["paper"] })).toBe("/edge/?type=papers");
  });
  it("labels groups at their precision", () => {
    expect(edgeGroupLabel("2026-09-22")).toBe("Tuesday, 22 September 2026");
    expect(edgeGroupLabel("2026-03")).toBe("March 2026, day not recorded");
    expect(edgeGroupLabel("2025")).toBe("2025, day not recorded");
  });
});

describe("edge filter matching", () => {
  const rows: EdgeFilterable[] = [
    { kind: "paper", refIds: ["tnbc"] },
    { kind: "approval", refIds: ["sacituzumab-govitecan", "breast-cancer"] },
    { kind: "result", refIds: ["nsclc"] },
    { kind: "issue", refIds: [] },
  ];
  it("unions types, intersects with the cancer set, and passes everything when nothing is chosen", () => {
    expect(filterEdge(rows, [])).toHaveLength(4);
    expect(filterEdge(rows, ["paper", "result"]).map((r) => r.kind)).toEqual(["paper", "result"]);
    const ids = new Set(["tnbc", "sacituzumab-govitecan"]);
    expect(filterEdge(rows, [], ids).map((r) => r.kind)).toEqual(["paper", "approval"]);
    expect(filterEdge(rows, ["approval"], ids).map((r) => r.kind)).toEqual(["approval"]);
    expect(filterEdge(rows, ["result"], ids)).toEqual([]);
    expect(edgeMatches(rows[3], [], ids)).toBe(false);
  });
  it("counts every kind, zero included", () => {
    const c = countEdgeKinds(rows);
    expect(c.paper).toBe(1);
    expect(c.law).toBe(0);
    expect(Object.keys(c).sort()).toEqual([...EDGE_KINDS].sort());
  });
});
