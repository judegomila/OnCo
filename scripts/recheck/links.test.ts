import { describe, expect, it } from "vitest";
import { SLICES, linkFindings, movedTo, probe, probeAll, sliceOf, verdict, weeklySlice } from "./links";
import { Net } from "./lib";
import { fakeFetch, fakeNet } from "./test-helpers";

describe("the weekly slice", () => {
  const urls = Array.from({ length: 2000 }, (_, i) => `https://host${i % 37}.example/paper/${i}`);
  it("covers every address exactly once over four consecutive weeks", () => {
    const weeks = ["2026-11-17", "2026-11-24", "2026-12-01", "2026-12-08"].map((d) => weeklySlice(urls, d));
    expect(weeks.flat().sort()).toEqual([...urls].sort());
    for (const w of weeks) expect(w.length).toBeGreaterThan(urls.length / SLICES / 1.3);
  });
  it("keeps an address in the same slice, and the same slice for a whole week", () => {
    expect(weeklySlice(urls, "2026-11-16")).toEqual(weeklySlice(urls, "2026-11-22"));
    expect(weeklySlice(urls, "2026-11-17")).toEqual(weeklySlice(urls, "2026-12-15"));
    expect(sliceOf(urls[5])).toBe(sliceOf(urls[5]));
  });
});

describe("probe", () => {
  it("asks for headers first, and reads no body for a page that answers", async () => {
    const { net, calls } = fakeNet(() => new Response(null, { status: 200, headers: { "content-type": "text/html", etag: "\"e\"", "last-modified": "Tue, 03 Mar 2026 10:00:00 GMT" } }));
    expect(await probe(net, "https://a.example/x")).toMatchObject({ status: 200, etag: "\"e\"", lastModified: "Tue, 03 Mar 2026 10:00:00 GMT" });
    expect(calls.map((c) => c.method)).toEqual(["HEAD"]);
  });
  it("falls back to GET where HEAD is not allowed or is refused, and takes the GET's answer", async () => {
    const { net, calls } = fakeNet((_, init) => (init.method === "HEAD" ? new Response(null, { status: 403 }) : new Response("page", { status: 200 })));
    const p = await probe(net, "https://a.example/x");
    expect(calls.map((c) => c.method)).toEqual(["HEAD", "GET"]);
    expect(verdict("https://a.example/x", p)).toBe("ok");
  });
  it("confirms a 404 with a GET, and reads a challenge page served with a 404 as a refusal", async () => {
    const gone = fakeNet(() => new Response("<title>Page not found</title>", { status: 404 }));
    expect(verdict("https://a.example/x", await probe(gone.net, "https://a.example/x"))).toBe("gone");
    expect(gone.calls.map((c) => c.method)).toEqual(["HEAD", "GET"]);
    const wall = fakeNet((_, init) => (init.method === "HEAD" ? new Response(null, { status: 404 }) : new Response("<title>Just a moment...</title>", { status: 404 })));
    expect(verdict("https://a.example/x", await probe(wall.net, "https://a.example/x"))).toBe("blocked");
  });
  it("checks a DOI at the resolver and does not follow it to the publisher", async () => {
    const { net, calls } = fakeNet(() => new Response(null, { status: 302, headers: { location: "https://publisher.example/article" } }));
    expect(verdict("https://doi.org/10.1000/x", await probe(net, "https://doi.org/10.1000/x"))).toBe("ok");
    expect(calls).toMatchObject([{ method: "HEAD", redirect: "manual" }]);
  });
});

describe("verdict", () => {
  it("counts only 404, 410 and a PDF address serving a web page as gone", () => {
    expect(verdict("https://a.example/x", { status: 404 })).toBe("gone");
    expect(verdict("https://a.example/x", { status: 410 })).toBe("gone");
    expect(verdict("https://a.example/file.pdf", { status: 200, contentType: "text/html" })).toBe("gone");
    expect(verdict("https://a.example/file.pdf", { status: 200, contentType: "application/pdf" })).toBe("ok");
    // A web archive wraps a PDF in its own page.
    expect(verdict("https://web.archive.org/web/20250916233706/https://www.rcr.ac.uk/media/towards-safer-radiotherapy.pdf", { status: 200, contentType: "text/html" })).toBe("ok");
  });
  it("never counts a refusal, a server error or no answer as gone", () => {
    expect(verdict("https://a.example/x", { status: 403, blocked: "refused (403)" })).toBe("blocked");
    expect(verdict("https://a.example/x", { status: 404, blocked: "bot-challenge page" })).toBe("blocked");
    expect(verdict("https://a.example/x", { status: 503 })).toBe("error");
    expect(verdict("https://a.example/x", { status: 0 })).toBe("unreachable");
  });
  it("tells a real move from the same page over https, with www or a trailing slash", () => {
    expect(movedTo("http://a.example/page", "https://www.a.example/page/")).toBeUndefined();
    expect(movedTo("https://a.example/page", "https://b.example/elsewhere")).toBe("https://b.example/elsewhere");
    expect(movedTo("https://a.example/page", undefined)).toBeUndefined();
  });
});

describe("linkFindings", () => {
  const refs = new Map([["https://a.example/gone", [{ id: "pembrolizumab", kind: "drug", field: "links", label: "Prescribing information" }, { id: "keynote-189", kind: "trial", field: "links" }]], ["https://a.example/blocked", [{ id: "x", kind: "drug", field: "links" }]]]);
  it("lists a dead link with the record and field that cite it, and leaves a blocked one out", () => {
    const out = linkFindings([{ url: "https://a.example/gone", probe: { status: 404 } }, { url: "https://a.example/blocked", probe: { status: 403, blocked: "refused (403)" } }, { url: "https://a.example/fine", probe: { status: 200 } }], refs);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({ kind: "links", type: "link-gone", severity: "medium", recordId: "pembrolizumab", recordKind: "drug", url: "https://a.example/gone", source: "404 Not Found", note: "Also: keynote-189" });
    expect(out[0].onco).toBe("cited in links (\"Prescribing information\") and by 1 other record");
  });
  it("is most serious for an urgent-advice source", () => {
    const out = linkFindings([{ url: "https://nhs.example/triage.pdf", probe: { status: 200, contentType: "text/html" } }], new Map([["https://nhs.example/triage.pdf", [{ id: "red-flags", kind: "data", field: "redFlags.source" }]]]));
    expect(out).toMatchObject([{ type: "pdf-address-serves-a-web-page", severity: "high" }]);
  });
});

describe("probeAll", () => {
  it("stands back from a host that says too many requests before asking it again", async () => {
    let clock = 0;
    const slept: number[] = [];
    let n = 0;
    const f = fakeFetch(() => (++n === 1 ? new Response(null, { status: 429 }) : new Response(null, { status: 200 })));
    const net = new Net({ fetchImpl: f.impl, perHostDelayMs: 1000, now: () => clock, sleep: async (ms) => { slept.push(ms); clock += ms; } });
    const out = await probeAll(net, ["https://busy.example/1", "https://busy.example/2"], { restMs: 30_000 });
    expect(slept).toEqual([30_000]);
    expect(out.map((r) => verdict(r.url, r.probe))).toEqual(["blocked", "ok"]);
  });

  it("leaves a host alone after it has refused five requests running", async () => {
    const urls = Array.from({ length: 12 }, (_, i) => `https://walled.example/${i}`).concat(["https://open.example/1"]);
    const { net, calls } = fakeNet((url) => (url.includes("walled") ? new Response(null, { status: 403 }) : new Response(null, { status: 200 })));
    const out = await probeAll(net, urls, { concurrency: 1 });
    expect(out.filter((r) => verdict(r.url, r.probe) === "blocked")).toHaveLength(12);
    expect(new Set(calls.filter((c) => c.url.includes("walled")).map((c) => c.url)).size).toBe(5);
    expect(out.filter((r) => r.probe.blocked?.includes("not asked again"))).toHaveLength(7);
    expect(verdict("https://open.example/1", out.find((r) => r.url === "https://open.example/1")!.probe)).toBe("ok");
  });
});
