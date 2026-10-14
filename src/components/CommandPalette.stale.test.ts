import { describe, expect, it, beforeEach } from "vitest";
import { readFileSync } from "node:fs";

/**
 * Two faults in the command palette, reported as #159 and #188 and fixed on main's current structure rather
 * than by merging #161, which was written against the open/close code that #187 has since replaced.
 *
 * Both are about a promise resolving after the world moved on. The palette loads the search index lazily, so
 * every query is a race between the reader's typing and the network.
 */
describe("the command palette discards work the reader has moved past", () => {
  let calls = 0;

  beforeEach(() => { calls = 0; });

  /** The shape of `run`: claim an id, and only paint if it is still the newest. This is the rule under test. */
  function makeRunner() {
    const request = { current: 0 };
    let painted: string | null = null;
    let failed = false;
    const run = (value: string, load: () => Promise<string>) => {
      const id = ++request.current;
      if (!value.trim()) { painted = "PAGES"; return Promise.resolve(); }
      return load().then((hits) => { if (request.current !== id) return; failed = false; painted = hits; })
        .catch(() => { if (request.current === id) failed = true; });
    };
    return { run, get painted() { return painted; }, get failed() { return failed; } };
  }

  it("a query cleared before its results land does not paint them", async () => {
    const r = makeRunner();
    let settle: (v: string) => void = () => {};
    const slow = new Promise<string>((res) => { settle = res; });
    const typing = r.run("pembro", () => slow);
    // The reader clears the box while the index is still loading.
    await r.run("", async () => "unused");
    expect(r.painted, "the cleared box shows the default pages").toBe("PAGES");
    settle("results for pembro");
    await typing;
    // Without the request id this was "results for pembro" under an empty input, and Enter opened one of them.
    expect(r.painted, "the stale query is discarded").toBe("PAGES");
  });

  it("the newest query wins even when an earlier one resolves later", async () => {
    const r = makeRunner();
    let settleFirst: (v: string) => void = () => {};
    const first = r.run("a", () => new Promise<string>((res) => { settleFirst = res; }));
    await r.run("ab", async () => "results for ab");
    settleFirst("results for a");
    await first;
    expect(r.painted).toBe("results for ab");
  });

  it("a failed load is reported, not left as a permanent loading state", async () => {
    const r = makeRunner();
    await r.run("pembro", async () => { throw new Error("index unavailable"); });
    expect(r.failed, "the palette knows it failed").toBe(true);
    // Typing again retries: loadSearch drops a failed promise from its cache (src/lib/search-client.ts).
    await r.run("pembro", async () => { calls++; return "results"; });
    expect(calls, "the retry actually asks again").toBe(1);
    expect(r.failed).toBe(false);
    expect(r.painted).toBe("results");
  });

  /**
   * The cases above lock the rule; this one holds the component to it. The mounted palette is hard to drive for
   * this: src/components/CommandPalette.focus.test.ts mocks loadSearch as a promise that never resolves, which
   * is exactly what these cases need to control. So the guard is asserted in the source, the way
   * scripts/gates-parity.test.ts asserts against ship.sh.
   */
  it("the palette itself claims a request id and checks it before painting", () => {
    const src = readFileSync("src/components/CommandPalette.tsx", "utf8");
    const run = src.slice(src.indexOf("const run = useCallback"), src.indexOf("const go = "));
    expect(run, "every run claims the next id").toContain("const id = ++request.current;");
    expect(run, "and a resolved load paints only if it is still current").toContain("if (request.current !== id) return;");
    expect(run, "a failed load is recorded against its own request").toContain("if (request.current === id)");
    // The permanent "Loading index…" is gone: it now yields to the failure line.
    expect(src).toContain("Search is unavailable. Type again to retry.");
    expect(src).toContain("{!ready && !failed && q &&");
  });
});
