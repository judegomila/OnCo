import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { type Finding, Net, pooled, refusal, sortFindings, stableHash, weekNumber } from "./lib";
import { fakeFetch } from "./test-helpers";

const instant = { sleep: async () => undefined };

describe("Net", () => {
  it("counts every request, per host, and sends a plain user agent that names the project", async () => {
    const f = fakeFetch(() => new Response("ok"));
    const net = new Net({ fetchImpl: f.impl, ...instant });
    await net.get("https://a.example/1");
    await net.get("https://www.a.example/2");
    await net.request("https://b.example/", { method: "HEAD" });
    expect(net.requests).toBe(3);
    expect(Object.fromEntries(net.byHost)).toEqual({ "a.example": 2, "b.example": 1 });
    expect(f.calls.every((c) => /^OnCo weekly re-check/.test(c.ua))).toBe(true);
    expect(f.calls.some((c) => /Mozilla|Chrome|Safari/.test(c.ua))).toBe(false);
  });

  it("keeps requests to one host apart and never overlapping", async () => {
    let clock = 0, active = 0, peak = 0;
    const slept: number[] = [];
    const f = fakeFetch(async () => { active++; peak = Math.max(peak, active); await Promise.resolve(); clock += 10; active--; return new Response("ok"); });
    const net = new Net({ fetchImpl: f.impl, perHostDelayMs: 1000, now: () => clock, sleep: async (ms) => { slept.push(ms); clock += ms; } });
    await Promise.all([net.get("https://a.example/1"), net.get("https://a.example/2"), net.get("https://a.example/3")]);
    expect(peak).toBe(1);
    expect(slept).toEqual([1000, 1000]);
  });

  it("returns a refusal at once and does not retry it; retries a server error", async () => {
    let n = 0;
    const f = fakeFetch((url) => (url.includes("refused") ? new Response("no", { status: 403 }) : ++n < 3 ? new Response("down", { status: 503 }) : new Response("up")));
    const net = new Net({ fetchImpl: f.impl, ...instant });
    const refused = await net.get("https://a.example/refused");
    expect(refused.blocked).toBe("refused (403)");
    expect(refused.ok).toBe(false);
    expect(f.calls).toHaveLength(1);
    const up = await net.get("https://a.example/flaky");
    expect(up.ok).toBe(true);
    expect(f.calls).toHaveLength(4);
  });

  it("never throws: a network failure is status 0 with the reason", async () => {
    const net = new Net({ fetchImpl: fakeFetch(() => { throw new Error("getaddrinfo ENOTFOUND gone.example"); }).impl, ...instant });
    const r = await net.get("https://gone.example/", { tries: 1 });
    expect(r).toMatchObject({ status: 0, ok: false });
    expect(r.error).toContain("ENOTFOUND");
  });

  it("replays a recorded reading without asking the source again", async () => {
    const dir = mkdtempSync(join(tmpdir(), "onco-recheck-tape-"));
    try {
      const f = fakeFetch(() => new Response("body", { headers: { etag: "\"v1\"" } }));
      await new Net({ fetchImpl: f.impl, ...instant, recordDir: dir }).get("https://a.example/x");
      const none = fakeFetch(() => { throw new Error("the network must not be used"); });
      const replay = new Net({ fetchImpl: none.impl, ...instant, recordDir: dir, replay: true });
      const r = await replay.get("https://a.example/x");
      expect(r.text).toBe("body");
      expect(r.headers.get("etag")).toBe("\"v1\"");
      expect((await replay.get("https://a.example/never-read", { tries: 1 })).status).toBe(0);
      expect(none.calls).toHaveLength(0);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });
});

describe("refusal", () => {
  it("reads a 401, 403 and 429 as a refusal", () => {
    for (const status of [401, 403, 429]) expect(refusal({ status })).toBeTruthy();
    for (const status of [200, 301, 404, 410, 500]) expect(refusal({ status })).toBeUndefined();
  });
  it("reads a challenge page for what it is, whatever status it is served with", () => {
    expect(refusal({ status: 404, finalUrl: "https://www.accessdata.fda.gov/apology_objects/abuse-detection-apology.html" })).toBe("bot-challenge page");
    expect(refusal({ status: 200, body: "<html><title>Just a moment...</title>" })).toBe("bot-challenge page");
    expect(refusal({ status: 200, headers: new Headers({ "cf-mitigated": "challenge" }) })).toContain("challenge");
    expect(refusal({ status: 200, body: "<html><title>Clinical guideline</title>" })).toBeUndefined();
  });
});

describe("helpers", () => {
  it("hashes a string the same way every time and spreads addresses across slices", () => {
    expect(stableHash("https://example.org/a")).toBe(stableHash("https://example.org/a"));
    const counts = [0, 0, 0, 0];
    for (let i = 0; i < 4000; i++) counts[stableHash(`https://example.org/page/${i}`) % 4]++;
    for (const c of counts) expect(c).toBeGreaterThan(800);
  });
  it("moves the week number on once every seven days, on a Monday", () => {
    expect(weekNumber("2026-11-16")).toBe(weekNumber("2026-11-22")); // Monday to Sunday
    expect(weekNumber("2026-11-23")).toBe(weekNumber("2026-11-16") + 1);
  });
  it("runs a pool in order with a cap", async () => {
    let active = 0, peak = 0;
    const out = await pooled([1, 2, 3, 4, 5, 6], 2, async (n) => { active++; peak = Math.max(peak, active); await Promise.resolve(); active--; return n * 2; });
    expect(out).toEqual([2, 4, 6, 8, 10, 12]);
    expect(peak).toBeLessThanOrEqual(2);
  });
  it("sorts the most serious first, then the newest", () => {
    const f = (severity: Finding["severity"], date: string, recordId: string): Finding => ({ kind: "trials", type: "t", severity, recordId, onco: "", source: "", url: "https://x", date });
    expect(sortFindings([f("low", "2026-11-01", "a"), f("high", "2026-10-01", "b"), f("high", "2026-11-01", "c")]).map((x) => x.recordId)).toEqual(["c", "b", "a"]);
  });
});
