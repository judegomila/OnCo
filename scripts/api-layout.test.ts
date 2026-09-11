import { describe, expect, it } from "vitest";
import { KINDS, KIND_META, type Kind } from "../src/lib/schema";
import { apiFiles, openApiDocument, FEEDS } from "./api-layout";

const counts = Object.fromEntries(KINDS.map((k, i) => [k, i + 1])) as Record<Kind, number>;
const isKindFile = (p: string) => KINDS.some((k) => p === `/api/v1/${KIND_META[k].plural}.json` || p === `/api/v1/${KIND_META[k].plural}.csv`);

describe("api layout", () => {
  it("lists one JSON and one CSV file per kind plus the whole-corpus files", () => {
    const paths = apiFiles(counts).map((f) => f.path);
    for (const k of KINDS) {
      expect(paths).toContain(`/api/v1/${KIND_META[k].plural}.json`);
      expect(paths).toContain(`/api/v1/${KIND_META[k].plural}.csv`);
    }
    for (const p of ["/api/v1/all.json", "/api/v1/all.ndjson", "/api/v1/schema.json", "/api/v1/openapi.json", "/api/v1/meta.json", "/api/v1/entities/<id>.json", "/api/v1/context/<id>.md"]) expect(paths).toContain(p);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("describes every file in the layout as an OpenAPI 3.1 path", () => {
    const doc = openApiDocument(counts, { version: "0.0.0-test", built: "2026-09-11" });
    expect(doc.openapi).toBe("3.1.0");
    const paths = doc.paths as Record<string, unknown>;
    for (const f of apiFiles(counts)) {
      const templated = isKindFile(f.path) ? `/api/v1/{plural}.${f.path.endsWith(".csv") ? "csv" : "json"}` : f.path.replace("<id>", "{id}");
      expect(paths, f.path).toHaveProperty([templated]);
    }
    for (const feed of FEEDS) expect(paths).toHaveProperty([feed.startsWith("/feeds/") ? "/feeds/{feed}.xml" : feed]);
    expect(paths).toHaveProperty(["/llms.txt"]);
    for (const p of Object.values(paths)) expect(Object.keys(p as object)).toEqual(["get"]);
  });

  it("states the CC BY-NC licence and points the entity schema at schema.json", () => {
    const doc = openApiDocument(counts, { built: "2026-09-11" });
    const info = doc.info as { license: { name: string; url: string }; description: string; version: string };
    expect(info.license.url).toBe("https://creativecommons.org/licenses/by-nc/4.0/");
    expect(info.description).toContain("commercial use must contact OnCo");
    expect(info.description).not.toContain("CC BY 4.0");
    expect(info.version).toBe("1");
    const schemas = (doc.components as { schemas: Record<string, { $ref?: string; enum?: string[] }> }).schemas;
    expect(schemas.Entity.$ref).toBe("https://onco.cc/api/v1/schema.json");
    expect(schemas.Kind.enum).toEqual([...KINDS]);
    const listKind = (doc.paths as Record<string, { get: { parameters: Array<{ schema: { enum: string[] } }> } }>)["/api/v1/{plural}.json"];
    expect(listKind.get.parameters[0].schema.enum).toEqual(KINDS.map((k) => KIND_META[k].plural));
  });

  it("is deterministic for the same inputs and contains no em-dashes", () => {
    const a = JSON.stringify(openApiDocument(counts, { built: "2026-09-11" }));
    const b = JSON.stringify(openApiDocument(counts, { built: "2026-09-11" }));
    expect(a).toBe(b);
    expect(a).not.toMatch(/—/);
  });
});
