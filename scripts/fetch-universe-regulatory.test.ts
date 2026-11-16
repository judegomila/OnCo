import { describe, expect, it } from "vitest";
import { dedupeOce, type OceApproval } from "./fetch-universe-regulatory";
import list from "../src/data/universe-lists/fda-oncology-approvals.json";

const item = (date: string, title: string, url: string, via: OceApproval["via"] = "live"): OceApproval => ({ date, title, url, drugs: [], accelerated: false, text: "", via });
const OLD = "https://www.fda.gov/drugs/resources-information-approved-drugs/";
const NEW = "https://www.fda.gov/drugs/cancer-approvals/";

describe("FDA oncology approval notices are counted once each", () => {
  it("keeps the notice at the current path when FDA lists it under two addresses", () => {
    const out = dedupeOce([item("2026-10-26", "FDA approves X for Y", `${OLD}fda-approves-x-y`), item("2026-10-26", "FDA approves X for Y", `${NEW}fda-approves-x-y`)]);
    expect(out).toHaveLength(1);
    expect(out[0].url).toBe(`${NEW}fda-approves-x-y`);
  });
  it("prefers the current path whichever order the two arrive in", () => {
    const out = dedupeOce([item("2026-10-26", "FDA approves X for Y", `${NEW}fda-approves-x-y`), item("2026-10-26", "FDA approves X for Y", `${OLD}fda-approves-x-y`)]);
    expect(out.map((i) => i.url)).toEqual([`${NEW}fda-approves-x-y`]);
  });
  it("normalises case, punctuation, accents and spacing in the title", () => {
    const out = dedupeOce([item("2026-10-26", "FDA approves X  for androgen pathway modulation-naïve cancer", `${OLD}a`), item("2026-10-26", "FDA Approves X for androgen pathway modulation–naive cancer.", `${NEW}a`)]);
    expect(out).toHaveLength(1);
  });
  it("keeps two notices that share a title on different dates, and two titles on one date", () => {
    expect(dedupeOce([item("2025-01-01", "FDA approves X for Y", `${OLD}a`), item("2026-01-01", "FDA approves X for Y", `${NEW}b`)])).toHaveLength(2);
    expect(dedupeOce([item("2026-01-01", "FDA approves X for Y", `${NEW}a`), item("2026-01-01", "FDA approves Z for Y", `${NEW}b`)])).toHaveLength(2);
  });
  it("the committed list holds no notice twice", () => {
    const items = list.items as OceApproval[];
    expect(dedupeOce(items)).toHaveLength(items.length);
    expect(list.total).toBe(items.length);
  });
});
