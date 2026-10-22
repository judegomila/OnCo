import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * What a client component can pull into the browser. A "use client" file and everything it imports statically is
 * shipped to the reader, and an import of one constant brings the whole module and its imports with it. Measured on
 * 21 and 22 October 2026 against the live site:
 *  - /cancers/map/ shipped a 51 MB script, the entire corpus, because CancerMapBy imported METRICS from
 *    src/lib/cancer-dag.ts, which imports the graph;
 *  - every page with a technology or glossary table shipped 1.45 MB of records and 1 MB of schematic scenes, because
 *    TechThumb and TermThumb imported src/data/schematics.ts, which imported fifteen record files for their aliases;
 *  - the molecule thumbnail, mounted by the header's command palette, put the 120 KB structure index on every page.
 * Dynamic `import()` and `import type` are not followed: they are how a heavy module is loaded on demand.
 */
const FORBIDDEN: Record<string, string> = {
  "src/lib/graph.ts": "the corpus graph",
  "src/data/index.ts": "every record in the corpus",
  "src/data/schematics.ts": "every schematic scene and its aliases; load it with import() after idle, as TechThumb does",
  "public/structures/index.json": "the full structure index; MoleculeSlot and MoleculeThumb use src/lib/structure-ids.ts",
};
/** Client modules that may reach a forbidden file because nothing imports them statically: they load on demand. */
const ON_DEMAND = new Set(["src/components/MoleculeDrawing.tsx"]);
/** A data module this large in a client graph is records, not configuration. The largest legitimate one is under 200 KB. */
const MAX_DATA_BYTES = 200 * 1024;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
}
function resolve(spec: string, from: string): string | null {
  const base = spec.startsWith("@/") ? join("src", spec.slice(2)) : spec.startsWith(".") ? normalize(join(dirname(from), spec)) : null;
  if (!base) return null;
  for (const c of [base, `${base}.ts`, `${base}.tsx`, `${base}.json`, join(base, "index.ts"), join(base, "index.tsx")]) if (existsSync(c) && statSync(c).isFile()) return c;
  return null;
}
const IMPORT = /^\s*(?:import|export)\s+(?!type\b)(?:[^;]*?\bfrom\s+)?["']([^"']+)["']/gm;
const depsCache = new Map<string, string[]>();
function deps(f: string): string[] {
  if (f.endsWith(".json")) return [];
  let d = depsCache.get(f);
  if (!d) { d = [...readFileSync(f, "utf8").matchAll(IMPORT)].map((m) => resolve(m[1], f)).filter((x): x is string => !!x); depsCache.set(f, d); }
  return d;
}
function reach(start: string): Set<string> {
  const seen = new Set<string>(); const stack = [start];
  while (stack.length) { const f = stack.pop()!; if (seen.has(f)) continue; seen.add(f); stack.push(...deps(f)); }
  return seen;
}

const files = walk("src").filter((f) => /\.tsx?$/.test(f) && !/\.test\.tsx?$/.test(f));
const clients = files.filter((f) => /^\s*["']use client["']/.test(readFileSync(f, "utf8").slice(0, 200)));

describe("client bundles", () => {
  it("finds the client components", () => {
    expect(clients.length).toBeGreaterThan(100);
  });

  it("no client component statically imports the corpus, the schematic scenes or the structure index", () => {
    const bad: string[] = [];
    for (const c of clients) {
      if (ON_DEMAND.has(c)) continue;
      const r = reach(c);
      for (const [f, what] of Object.entries(FORBIDDEN)) if (r.has(f)) bad.push(`${c} reaches ${f} (${what})`);
    }
    expect(bad, bad.join("\n")).toEqual([]);
  });

  it("the on-demand modules really are only loaded on demand", () => {
    const staticImporters = files.filter((f) => !ON_DEMAND.has(f) && deps(f).some((d) => ON_DEMAND.has(d)));
    expect(staticImporters, "import these with dynamic() or import()").toEqual([]);
  });

  it(`no client component reaches a data module over ${MAX_DATA_BYTES / 1024} KB`, () => {
    const bad = new Set<string>();
    for (const c of clients) {
      if (ON_DEMAND.has(c)) continue;
      for (const f of reach(c)) if ((f.startsWith("src/data/") || f.startsWith("public/")) && statSync(f).size > MAX_DATA_BYTES) bad.add(`${c} reaches ${f} (${Math.round(statSync(f).size / 1024)} KB)`);
    }
    expect([...bad], [...bad].join("\n")).toEqual([]);
  });
});
