import { describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { FEEDS, ageInDays, feedStatus, feedStatuses, readPublicJson } from "./feed-meta";

describe("feed-meta", () => {
  it("defines a unique id and a public path for every feed", () => {
    const ids = FEEDS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const f of FEEDS) { expect(f.path.endsWith(".json"), f.id).toBe(true); expect(f.cadenceDays).toBeGreaterThan(0); }
  });

  it("reports a missing snapshot as absent and stale", () => {
    const root = mkdtempSync(join(tmpdir(), "onco-feeds-"));
    const s = feedStatus(FEEDS.find((f) => f.id === "fda")!, new Date("2026-09-09"), root);
    expect(s.present).toBe(false);
    expect(s.stale).toBe(true);
    expect(readPublicJson("fda/recent.json", root)).toBeNull();
  });

  it("reads fetched date, count and staleness from a snapshot", () => {
    const root = mkdtempSync(join(tmpdir(), "onco-feeds-"));
    mkdirSync(join(root, "public", "fda"), { recursive: true });
    writeFileSync(join(root, "public", "fda", "recent.json"), JSON.stringify({ fetched: "2026-09-01", oce: [{}, {}, {}], notInCorpus: [{}] }));
    const fresh = feedStatus(FEEDS.find((f) => f.id === "fda")!, new Date("2026-09-09"), root);
    expect(fresh.present).toBe(true);
    expect(fresh.fetched).toBe("2026-09-01");
    expect(fresh.count).toBe(3);
    expect(fresh.ageDays).toBe(8);
    expect(fresh.stale).toBe(false);
    const old = feedStatus(FEEDS.find((f) => f.id === "fda")!, new Date("2026-10-09"), root);
    expect(old.stale).toBe(true);
  });

  it("returns one status per feed against the real public folder without throwing", () => {
    const all = feedStatuses(new Date());
    expect(all.length).toBe(FEEDS.length);
  });

  it("computes ages in whole days and tolerates bad dates", () => {
    expect(ageInDays("2026-09-01", new Date("2026-09-09T12:00:00Z"))).toBe(8);
    expect(ageInDays("not a date", new Date())).toBeUndefined();
    expect(ageInDays(undefined, new Date())).toBeUndefined();
  });
});
