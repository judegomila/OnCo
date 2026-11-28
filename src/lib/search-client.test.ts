import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const names = "/api/v1/search-names.json";
const full = "/api/v1/search.json";
const document = { id: "pembrolizumab", name: "Pembrolizumab", kind: "drug", route: "/drugs/pembrolizumab/" };
let fetchIndex: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.resetModules();
  fetchIndex = vi.fn((url: string) => Promise.resolve(new Response(JSON.stringify([url === names ? document : { ...document, aka: "", tldr: "An immunotherapy", tags: "" }]))));
  vi.stubGlobal("fetch", fetchIndex);
});
afterEach(() => vi.unstubAllGlobals());

describe("incremental search index", () => {
  it("serves a direct palette lookup without requesting the full index", async () => {
    const { loadQuickSearch, searchRanked } = await import("./search-client");
    const index = await loadQuickSearch({ preloadFull: false });
    expect(index.full).toBe(false);
    expect(searchRanked(index.ms, "Pembrolizumab")[0].id).toBe(document.id);
    expect(fetchIndex.mock.calls).toEqual([[names]]);
  });

  it("still upgrades a warm names-only palette cache when full results are needed", async () => {
    const { loadQuickSearch, loadSearch, searchRanked } = await import("./search-client");
    await loadQuickSearch({ preloadFull: false });
    await loadQuickSearch();
    const index = await loadSearch();
    expect(fetchIndex.mock.calls).toEqual([[names], [full]]);
    expect(index.full).toBe(true);
    expect(searchRanked(index.ms, "immunotherapy")[0].id).toBe(document.id);
  });
});
