import { describe, expect, it } from "vitest";
import { redFlagSourceUrls } from "../src/data/red-flags";
import { graph } from "../src/lib/graph";
import { collectUrls, isBlocked, isBotWall, isGone, isSoftPdf404, isUnreachable } from "./check-links";

describe("soft 404 detection", () => {
  it("a .pdf URL answering with HTML is a soft 404, whatever the status says", () => {
    // The trap this exists for: the old UKONS triage URL answered with a CMS "page not found" page.
    expect(isSoftPdf404("https://example.org/a/triage.pdf", "text/html; charset=UTF-8")).toBe(true);
    expect(isSoftPdf404("https://example.org/a/TRIAGE.PDF", "text/html")).toBe(true);
    expect(isSoftPdf404("https://example.org/a/triage.pdf?dm=1756386672", "text/html")).toBe(true);
  });

  it("a real PDF, a non-PDF URL and a missing content type are not soft 404s", () => {
    expect(isSoftPdf404("https://example.org/a/triage.pdf", "application/pdf")).toBe(false);
    expect(isSoftPdf404("https://example.org/a/triage.pdf", "application/octet-stream")).toBe(false);
    expect(isSoftPdf404("https://example.org/page", "text/html")).toBe(false);
    expect(isSoftPdf404("https://example.org/a/triage.pdf", undefined)).toBe(false);
    expect(isSoftPdf404("not a url", "text/html")).toBe(false);
  });

  it("a soft 404 counts as gone, not as a site blocking the bot", () => {
    const soft = { ok: false, status: 200, softPdf404: true };
    expect(isGone(soft)).toBe(true);
    expect(isBlocked(soft)).toBe(false);
    expect(isUnreachable(soft)).toBe(false);
    expect(isGone({ ok: false, status: 403 })).toBe(false);
    expect(isBlocked({ ok: false, status: 403 })).toBe(true);
  });

  it("a bot wall is a refusal, not a dead citation, even when it comes back as 404", () => {
    // accessdata.fda.gov does this to every one of the 62 FDA labels the corpus cites.
    const fda = { ok: false, status: 404, finalUrl: "https://www.accessdata.fda.gov/apology_objects/abuse-detection-apology.html" };
    expect(isBotWall(fda.finalUrl)).toBe(true);
    expect(isGone(fda)).toBe(false);
    expect(isBlocked(fda)).toBe(true);
    expect(isBotWall(undefined)).toBe(false);
    expect(isBotWall("https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/125085s340lbl.pdf")).toBe(false);
    // The interstitial is HTML at a .pdf URL, but it must not be logged as a soft 404 as well.
    expect(isGone({ ok: false, status: 404, softPdf404: true, finalUrl: fda.finalUrl })).toBe(false);
  });
});

describe("red flag sources are link-checked", () => {
  it("every red-flag source URL is collected for the weekly run", () => {
    const urls = collectUrls(graph().entities);
    for (const url of redFlagSourceUrls()) {
      expect(urls.has(url), url).toBe(true);
      expect(urls.get(url)?.some((r) => r.field === "redFlags.source"), url).toBe(true);
    }
  });
});
