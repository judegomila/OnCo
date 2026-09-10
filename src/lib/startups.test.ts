import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { CompanySchema } from "./schema";
import { investors, isStartup, mostActiveInvestors, portfolioOf, recentlyFunded, stageOf, startups, ycBatchLabel, ycCompanies } from "./startups";
import snapshot from "@/data/universe-lists/yc-oncology.json";

const g = graph();
const base = { kind: "company" as const, id: "test-co", name: "Test Co", tldr: "A test company that does something useful for people.", summary: "Longer technical summary.", asOf: "2026-09-10", hq: "Boston, MA", country: "US", companyType: "biotech" as const, website: "https://example.com" };

describe("company schema: startup and investor fields", () => {
  it("accepts stage, ycBatch, investors, funding and acquiredBy", () => {
    const parsed = CompanySchema.parse({ ...base, stage: "startup", ycBatch: "W21", investors: ["y-combinator"], acquiredBy: "merck", funding: [{ round: "Series A", year: 2024, amountUsd: 50_000_000, source: "https://example.com/pr" }, { round: "Seed", year: 2022, source: "https://example.com/seed" }] });
    expect(parsed.stage).toBe("startup");
    expect(parsed.ycBatch).toBe("W21");
    expect(parsed.investors).toEqual(["y-combinator"]);
    expect(parsed.funding).toHaveLength(2);
    expect(parsed.funding[1].amountUsd).toBeUndefined();
    expect(parsed.acquiredBy).toBe("merck");
  });

  it("defaults investors and funding to empty arrays and accepts the investor type", () => {
    const parsed = CompanySchema.parse({ ...base, companyType: "investor" });
    expect(parsed.investors).toEqual([]);
    expect(parsed.funding).toEqual([]);
    expect(parsed.companyType).toBe("investor");
  });

  it("rejects malformed batches, stages and rounds", () => {
    expect(CompanySchema.safeParse({ ...base, ycBatch: "Winter 2021" }).success).toBe(false);
    expect(CompanySchema.safeParse({ ...base, ycBatch: "w21" }).success).toBe(false);
    expect(CompanySchema.safeParse({ ...base, stage: "unicorn" }).success).toBe(false);
    expect(CompanySchema.safeParse({ ...base, funding: [{ round: "Series A", year: 2024 }] }).success).toBe(false);
    expect(CompanySchema.safeParse({ ...base, funding: [{ round: "Series A", year: 2024, amountUsd: -1, source: "https://example.com" }] }).success).toBe(false);
  });
});

describe("YC oncology snapshot", () => {
  const included = snapshot.entries.filter((e) => e.decision === "included");

  it("every included entry matches a company with the same YC batch", () => {
    const failures: string[] = [];
    for (const e of included) {
      const c = e.matchedId ? g.get(e.matchedId) : undefined;
      if (!c || c.kind !== "company") { failures.push(`${e.slug}: no company ${e.matchedId}`); continue; }
      if (c.ycBatch !== e.batchCode) failures.push(`${e.slug}: batch ${c.ycBatch} vs snapshot ${e.batchCode}`);
      if (!c.investors.includes("y-combinator")) failures.push(`${e.slug}: does not name y-combinator`);
      if (!c.links.some((l) => l.url === e.ycUrl)) failures.push(`${e.slug}: missing YC profile link`);
    }
    expect(failures).toEqual([]);
  });

  it("every company with a YC batch is in the snapshot as included, and excluded entries are not in the corpus", () => {
    const ids = new Set(included.map((e) => e.matchedId));
    const missing = ycCompanies().filter((c) => !ids.has(c.id)).map((c) => c.id);
    expect(missing).toEqual([]);
    const excludedButPresent = snapshot.entries.filter((e) => e.decision === "excluded" && g.get(e.slug)?.kind === "company" && (g.get(e.slug) as { ycBatch?: string }).ycBatch);
    expect(excludedButPresent.map((e) => e.slug)).toEqual([]);
    for (const e of snapshot.entries.filter((x) => x.decision === "excluded")) expect(e.reason, e.slug).toBeTruthy();
  });

  it("counts in the snapshot agree with its entries", () => {
    expect(snapshot.counts.included).toBe(included.length);
    expect(snapshot.counts.hits).toBe(snapshot.entries.length);
    expect(ycCompanies().length).toBeGreaterThanOrEqual(50);
  });

  it("batch labels read as seasons", () => {
    expect(ycBatchLabel("W21")).toBe("Winter 2021");
    expect(ycBatchLabel("X26")).toBe("Spring 2026");
    expect(ycBatchLabel("F25")).toBe("Fall 2025");
  });
});

describe("startup and investor records", () => {
  const companies = g.kind("company");
  const withStartupFields = companies.filter((c) => c.stage || c.ycBatch || c.investors.length || c.funding.length || c.companyType === "investor");

  it("investor ids resolve to investor records and acquirers resolve to companies", () => {
    for (const c of companies) {
      for (const id of c.investors) expect(g.get(id)?.kind === "company" && (g.get(id) as { companyType: string }).companyType === "investor", `${c.id} -> ${id}`).toBe(true);
      if (c.acquiredBy) expect(g.get(c.acquiredBy)?.kind, `${c.id} -> ${c.acquiredBy}`).toBe("company");
    }
  });

  it("portfolios are the mirror of investor links", () => {
    for (const inv of investors()) for (const c of portfolioOf(inv.id)) expect(c.investors).toContain(inv.id);
    for (const c of companies) for (const id of c.investors) expect(portfolioOf(id).some((x) => x.id === c.id), `${id} portfolio lacks ${c.id}`).toBe(true);
    const active = mostActiveInvestors();
    expect(active.length).toBeGreaterThan(0);
    expect(active[0].portfolio.length).toBeGreaterThanOrEqual(active[active.length - 1].portfolio.length);
  });

  it("funding rounds are sourced and dated, and amounts are positive", () => {
    for (const c of companies) for (const r of c.funding) {
      expect(r.source, `${c.id} ${r.round}`).toMatch(/^https:\/\//);
      expect(r.year, `${c.id} ${r.round}`).toBeGreaterThanOrEqual(1990);
      if (r.amountUsd !== undefined) expect(r.amountUsd).toBeGreaterThan(0);
    }
    for (const { round } of recentlyFunded(5)) expect(round.year).toBeGreaterThan(2000);
  });

  it("new startup and investor records follow the house style", () => {
    const failures: string[] = [];
    for (const c of withStartupFields) {
      const text = `${c.tldr} ${c.summary} ${c.notes.join(" ")}`;
      if (/[—]/.test(text)) failures.push(`${c.id}: em-dash`);
      if (/\bspike/i.test(text)) failures.push(`${c.id}: the word spike`);
      if (c.ycBatch && c.summary.length < 300) failures.push(`${c.id}: YC summary under 300 characters`);
      if (c.companyType === "investor" && !c.tags.some((t) => ["vc", "corporate-venture", "accelerator", "foundation", "public-fund"].includes(t))) failures.push(`${c.id}: investor without a kind tag`);
    }
    expect(failures).toEqual([]);
  });

  it("the startups page population excludes investors and large pharma and includes every YC company", () => {
    const list = startups();
    expect(list.every((c) => c.companyType !== "investor" && c.companyType !== "pharma")).toBe(true);
    for (const c of ycCompanies()) expect(isStartup(c), c.id).toBe(true);
    const merck = g.must("merck");
    expect(merck.kind === "company" && stageOf(merck)).toBe("public");
  });
});
