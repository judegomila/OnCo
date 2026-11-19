import { describe, expect, it } from "vitest";
import { type GuidelineSource, compareGuideline, headerState } from "./guidelines";
import type { Probe } from "./links";

const READ = Date.parse("2026-11-18T05:17:00Z");
const src = (over: Partial<GuidelineSource> = {}): GuidelineSource => ({ url: "https://guidelines.example.org/antiemetics-2023.pdf", label: "Antiemetic guideline", publisher: "Example Society", year: 2023, protocols: ["antiemetic-prophylaxis-by-emetic-risk", "anticipatory-nausea-and-vomiting"], ...over });
const pdf = (over: Partial<Probe> = {}): Probe => ({ status: 200, contentType: "application/pdf", lastModified: "Tue, 03 Mar 2026 10:00:00 GMT", etag: "\"abc\"", ...over });
const types = (prev: Parameters<typeof compareGuideline>[1], p: Probe, s = src()) => compareGuideline(s, prev, p, READ).map((f) => `${f.type}:${f.severity}`);

describe("headerState", () => {
  it("keeps the status, a real redirect, the Last-Modified, and an ETag only for a file", () => {
    expect(headerState(src().url, pdf(), READ)).toEqual({ status: 200, lastModified: "Tue, 03 Mar 2026 10:00:00 GMT", etag: "\"abc\"" });
    expect(headerState("https://x.example/page", { status: 200, contentType: "text/html; charset=utf-8", etag: "W/\"per-response\"" }, READ)).toEqual({ status: 200 });
    expect(headerState("http://x.example/page", { status: 200, finalUrl: "https://www.x.example/page/" }, READ)).toEqual({ status: 200 });
    expect(headerState("https://x.example/old", { status: 200, finalUrl: "https://x.example/new" }, READ)).toEqual({ status: 200, finalUrl: "https://x.example/new" });
  });
  it("marks a Last-Modified under two days old as a render stamp", () => {
    expect(headerState("https://x.example/page", { status: 200, lastModified: "Wed, 18 Nov 2026 05:00:00 GMT" }, READ)?.fresh).toBe(true);
  });
  it("keeps nothing for a refusal or no answer, so last week's entry stands", () => {
    expect(headerState(src().url, { status: 403, blocked: "refused (403)" }, READ)).toBeUndefined();
    expect(headerState(src().url, { status: 0, error: "timeout" }, READ)).toBeUndefined();
  });
  it("does not record where a DOI resolves to as a redirect", () => {
    expect(headerState("https://doi.org/10.1000/x", { status: 302 }, READ)).toEqual({ status: 302 });
  });
});

describe("compareGuideline", () => {
  it("reports a source that is gone, with the protocols that cite it", () => {
    const [f] = compareGuideline(src(), { status: 200 }, { status: 404 }, READ);
    expect(f).toMatchObject({ kind: "guidelines", type: "source-gone", severity: "high", recordId: "antiemetic-prophylaxis-by-emetic-risk", recordKind: "protocol", url: src().url, source: "404 Not Found" });
    expect(f.onco).toBe("cites \"Antiemetic guideline\" (Example Society, 2023) and 1 other protocol");
    expect(f.note).toBe("Also: anticipatory-nausea-and-vomiting");
  });
  it("reports a PDF address that now serves a web page", () => {
    expect(types({ status: 200 }, { status: 200, contentType: "text/html" })).toEqual(["source-gone:high"]);
  });
  it("never reports a refusal as gone or changed", () => {
    expect(types({ status: 200 }, { status: 403, blocked: "refused (403)" })).toEqual([]);
    expect(types({ status: 200 }, { status: 404, blocked: "bot-challenge page", finalUrl: "https://x.example/apology_objects/abuse-detection-apology.html" })).toEqual([]);
  });
  it("reports a redirect once, when it is new", () => {
    const moved: Probe = { status: 200, contentType: "application/pdf", finalUrl: "https://guidelines.example.org/antiemetics-2026.pdf" };
    expect(compareGuideline(src(), { status: 200 }, moved, READ)).toMatchObject([{ type: "source-redirected", source: "redirects to https://guidelines.example.org/antiemetics-2026.pdf" }]);
    expect(types({ status: 200, finalUrl: "https://guidelines.example.org/antiemetics-2026.pdf" }, moved)).toEqual([]);
    expect(types(undefined, moved)).toEqual(["source-redirected:medium"]);
  });
  it("reports a changed Last-Modified, more seriously for a file than for a web page", () => {
    const [f] = compareGuideline(src(), { status: 200, lastModified: "Tue, 03 Mar 2026 10:00:00 GMT" }, pdf({ lastModified: "Mon, 09 Nov 2026 08:00:00 GMT" }), READ);
    expect(f).toMatchObject({ type: "source-changed", severity: "medium", date: "2026-11-09" });
    expect(f.source).toBe("Last-Modified Mon, 09 Nov 2026 08:00:00 GMT; it was Tue, 03 Mar 2026 10:00:00 GMT");
    expect(types({ status: 200, lastModified: "Tue, 03 Mar 2026 10:00:00 GMT" }, { status: 200, contentType: "text/html", lastModified: "Mon, 09 Nov 2026 08:00:00 GMT" }, src({ url: "https://x.example/page" }))).toEqual(["source-changed:low"]);
  });
  it("ignores a render stamp, an unchanged header, and a first reading", () => {
    expect(types({ status: 200, lastModified: "Wed, 11 Nov 2026 05:00:00 GMT", fresh: true }, pdf({ lastModified: "Wed, 18 Nov 2026 05:00:00 GMT" }))).toEqual([]);
    expect(types({ status: 200, lastModified: "Tue, 03 Mar 2026 10:00:00 GMT", etag: "\"abc\"" }, pdf())).toEqual([]);
    expect(types(undefined, pdf())).toEqual([]);
  });
  it("falls back to the ETag of a file that sends no Last-Modified", () => {
    expect(types({ status: 200, etag: "\"abc\"" }, pdf({ lastModified: undefined, etag: "\"def\"" }))).toEqual(["source-changed:medium"]);
  });
  it("lists a source that stopped answering, only if it used to", () => {
    expect(types({ status: 200 }, { status: 0, error: "ENOTFOUND" })).toEqual(["source-unreachable:low"]);
    expect(types(undefined, { status: 0, error: "ENOTFOUND" })).toEqual([]);
  });
});
