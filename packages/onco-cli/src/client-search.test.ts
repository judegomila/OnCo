import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildSemanticIndex, encodeSemanticIndex } from "../../../src/lib/semantic";
import { OncoClient, type SearchDoc } from "./client";

const dirs: string[] = [];
afterEach(async () => { await Promise.all(dirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true }))); });

async function fixture(conceptOnly: boolean, leadingKind: "trial" | "page" = "trial", withSemantic = conceptOnly): Promise<OncoClient> {
  const dir = await mkdtemp(join(tmpdir(), "onco-search-"));
  dirs.push(dir);
  // A common topic can have many trials before its first drug. The public --kind filter must
  // find the drugs even when they fall below the unfiltered retrieval window.
  const docs: SearchDoc[] = Array.from({ length: 65 }, (_, i) => ({
    id: `${leadingKind}-${i}`, kind: leadingKind, name: "Needle", tldr: "needle", aka: "", tags: "", route: `/${leadingKind}s/${leadingKind}-${i}/`,
  }));
  for (let i = 0; i < 2; i++) docs.push({
    id: `drug-${i}`, kind: "drug", name: `Indexed record ${i}`, tldr: conceptOnly ? "" : "needle", aka: "", tags: "", route: `/drugs/drug-${i}/`,
  });
  await writeFile(join(dir, "search.json"), JSON.stringify(docs));
  if (withSemantic) {
    const encoded = encodeSemanticIndex(buildSemanticIndex(docs.map((d) => ({
      id: d.id, kind: d.kind, text: d.kind === leadingKind ? "needle" : "needle background",
    })), { minDf: 1 }));
    await writeFile(join(dir, "embeddings.json"), JSON.stringify(encoded.meta));
    await writeFile(join(dir, "embeddings.bin"), encoded.bin);
  }
  return new OncoClient({ base: dir, local: true });
}

describe("kind-filtered API search", () => {
  it.each([false, true])("finds matching drugs beyond the unfiltered window (concept only: %s)", async (conceptOnly) => {
    const client = await fixture(conceptOnly);
    expect((await client.search("needle", { limit: 60 })).every((hit) => hit.kind === "trial")).toBe(true);
    const hits = await client.search("needle", { kind: "drug", limit: 2 });
    expect(hits.map((hit) => hit.id)).toEqual(["drug-0", "drug-1"]);
    for (const hit of hits) {
      expect(hit.matched.words).toBe(!conceptOnly);
      expect(hit.matched.concepts).toEqual(conceptOnly ? ["needle"] : []);
    }
    expect(await client.search("needle", { kind: "cancer", limit: 2 })).toEqual([]);
    expect(await client.search("needle", { kind: "drug", limit: 1 })).toHaveLength(1);
  });
});

describe("entity-only API search", () => {
  it.each([
    { mode: "lexical only", conceptOnly: false, withSemantic: false },
    { mode: "concept-only entity matches", conceptOnly: true, withSemantic: true },
    { mode: "mixed word and concept matches", conceptOnly: false, withSemantic: true },
  ])("keeps page documents out of the retrieval windows ($mode)", async ({ conceptOnly, withSemantic }) => {
    const client = await fixture(conceptOnly, "page", withSemantic);
    // Navigation pages are in search.json but cannot be returned as entity records. Even more
    // than a full candidate window of higher-ranked pages must not hide matching entities.
    for (const limit of [1, 2, 10]) {
      const hits = await client.search("needle", { limit });
      expect(hits.map((hit) => hit.id)).toEqual(["drug-0", "drug-1"].slice(0, limit));
      for (const hit of hits) {
        expect(hit.kind).toBe("drug");
        expect(hit.matched.words).toBe(!conceptOnly);
        expect(hit.matched.concepts).toEqual(withSemantic ? ["needle"] : []);
      }
    }
    expect((await client.search("needle", { kind: "drug", limit: 2 })).map((hit) => hit.id)).toEqual(["drug-0", "drug-1"]);
    expect(await client.search("needle", { kind: "trial", limit: 2 })).toEqual([]);
  });
});
