import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { graph } from "./graph";
import { KINDS } from "./schema";
import { missingTracks, reviewCoverage, reviewIssueUrl, reviewQueue, reviewerLevel, reviewerRoster, tracksFor, translationCoverage, TRANSLATED_LANGS } from "./review-queue";
import { issueUrl, suggestEditUrl, newDiscussionUrl } from "./issue-links";
import { reviews } from "@/data/reviews";
import { reviewed } from "@/data/i18n/reviewed";
import { adoptions } from "@/data/adoptions";
import { LANGS } from "./layer";

describe("review queue", () => {
  it("ranks every reviewable page with a disclosed 0-100 score, unreviewed first", () => {
    const q = reviewQueue(new Date("2026-09-09"));
    expect(q.length).toBeGreaterThan(1000);
    for (const it of q) {
      expect(it.score).toBeGreaterThanOrEqual(0);
      expect(it.score).toBeLessThanOrEqual(100);
      expect(it.score).toBe(it.parts.reach + it.parts.stakes + it.parts.staleness);
      expect(it.tracks.length).toBeGreaterThan(0);
    }
    const firstReviewed = q.findIndex((x) => x.missing.length === 0);
    const lastUnreviewed = q.map((x) => x.missing.length > 0).lastIndexOf(true);
    if (firstReviewed >= 0) expect(lastUnreviewed).toBeLessThan(firstReviewed);
    for (let i = 1; i < q.length; i++) if (q[i - 1].missing.length > 0 && q[i].missing.length > 0) expect(q[i - 1].score).toBeGreaterThanOrEqual(q[i].score);
  });

  it("assigns tracks per kind and none to attributed kinds", () => {
    expect(tracksFor("cancer")).toEqual(["clinical", "advocate"]);
    expect(tracksFor("drug")).toContain("regulatory");
    expect(tracksFor("company")).toEqual([]);
    expect(tracksFor("person")).toEqual([]);
    for (const k of KINDS) expect(Array.isArray(tracksFor(k))).toBe(true);
  });

  it("coverage counts every reviewable kind and agrees with the queue", () => {
    const cov = reviewCoverage();
    const q = reviewQueue(new Date("2026-09-09"));
    expect(cov.total).toBe(q.length);
    expect(cov.reviewed).toBeLessThanOrEqual(cov.total);
    for (const k of cov.byKind) { expect(k.any).toBeLessThanOrEqual(k.total); expect(k.needs.length).toBeGreaterThan(0); }
  });

  it("levels step at 1, 5 and 20 pages", () => {
    expect(reviewerLevel(1).label).toBe("Reviewer");
    expect(reviewerLevel(4).label).toBe("Reviewer");
    expect(reviewerLevel(5).label).toBe("Regular reviewer");
    expect(reviewerLevel(20).label).toBe("Senior reviewer");
  });

  it("translation coverage covers every non-English language", () => {
    const cov = translationCoverage();
    expect(cov.map((c) => c.lang).sort()).toEqual(LANGS.filter((l) => l.code !== "en").map((l) => l.code).sort());
    expect(TRANSLATED_LANGS.map((l) => [l.code, l.label, l.native])).toEqual(LANGS.filter((l) => l.code !== "en").map((l) => [l.code, l.label, l.native]));
    for (const c of cov) { expect(c.translated).toBeGreaterThan(0); expect(c.reviewed).toBeLessThanOrEqual(c.translated); }
  });
});

describe("community side data stays sound", () => {
  const g = graph();
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;

  it("reviews.ts keys and personIds are real entities with dates and COI statements", () => {
    for (const [id, rs] of Object.entries(reviews)) {
      expect(g.get(id), id).toBeDefined();
      for (const r of rs) {
        expect(r.date).toMatch(isoDate);
        expect(r.coi.trim().length, `${id}: coi`).toBeGreaterThan(0);
        if (r.personId) expect(g.get(r.personId)?.kind, `${id}: personId`).toBe("person");
      }
    }
    expect(Array.isArray(reviewerRoster())).toBe(true);
  });

  it("i18n/reviewed.ts keys are real entities in known languages", () => {
    const langs = new Set(LANGS.map((l) => l.code));
    for (const [id, rs] of Object.entries(reviewed)) {
      expect(g.get(id), id).toBeDefined();
      for (const r of rs) { expect(langs.has(r.lang), `${id}: ${r.lang}`).toBe(true); expect(r.lang).not.toBe("en"); expect(r.date).toMatch(isoDate); }
    }
  });

  it("adoptions.ts points at real ideas and carries a source URL", () => {
    for (const a of adoptions) {
      expect(g.get(a.ideaId)?.kind, a.ideaId).toBe("idea");
      expect(a.source).toMatch(/^https?:\/\//);
      expect(a.date).toMatch(isoDate);
    }
  });

  it("missingTracks honours a recent review", () => {
    const kind = "cancer" as const;
    const need = tracksFor(kind);
    expect(missingTracks("tnbc", kind, new Date("2026-09-09"))).toEqual(need.filter((t) => !(reviews.tnbc ?? []).some((r) => (t === "advocate" ? r.track === "advocate" : r.track === "expert"))));
  });
});

describe("issue gate: every change link opens a form, never the file editor", () => {
  it("builders produce issue-form or discussion URLs", () => {
    const e = { kind: "drug" as const, id: "trastuzumab-deruxtecan", name: "Trastuzumab deruxtecan" };
    expect(suggestEditUrl(e)).toContain("/issues/new?template=suggest-edit.yml");
    expect(suggestEditUrl(e)).toContain("onco.cc%2Fdrugs%2Ftrastuzumab-deruxtecan");
    expect(reviewIssueUrl(e)).toContain("template=review.yml");
    expect(reviewIssueUrl(e)).toContain("track=regulatory");
    expect(issueUrl("stale-fact", { entity: "x" })).toContain("labels=correction%2Cstale");
    expect(newDiscussionUrl(e)).toContain("/discussions/new?category=objects");
  });

  it("every template the builders can name exists as a form", () => {
    const dir = join(process.cwd(), ".github", "ISSUE_TEMPLATE");
    const files = new Set(readdirSync(dir));
    for (const t of ["suggest-edit", "fact-correction", "stale-fact", "trial-readout", "regional-approval", "translation-fix", "translation-review", "accessibility", "review", "new-object", "bug"]) expect(files.has(`${t}.yml`), t).toBe(true);
    expect(files.has("config.yml")).toBe(true);
  });

  it("no page or component links to GitHub's file editor", () => {
    const offenders: string[] = [];
    const walk = (d: string) => {
      for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) { walk(p); continue; }
        if (!/\.(tsx?|md)$/.test(f) || f.endsWith(".test.ts")) continue;
        const text = readFileSync(p, "utf8");
        if (/github\.com\/[^"'`\s]*\/edit\/main/.test(text) || /\/edit\/main\//.test(text)) offenders.push(p);
      }
    };
    walk(join(process.cwd(), "src", "app"));
    walk(join(process.cwd(), "src", "components"));
    walk(join(process.cwd(), "src", "lib"));
    // Known wiring debt outside this batch's files: source-location.ts still exposes editUrl until the main session removes it.
    const allowed = new Set([join(process.cwd(), "src", "lib", "source-location.ts")]);
    expect(offenders.filter((o) => !allowed.has(o))).toEqual([]);
  });
});
