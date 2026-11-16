import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { graph } from "./graph";
import type { Drug } from "./schema";
import { availabilityFor, emlListing } from "./drug-availability";
import { REGIONS, regionalApprovals } from "@/data/regional-approvals";
import { COUNTRY_DIVES } from "@/data/country-dives";
import { DrugAvailability } from "@/components/DrugAvailability";

/**
 * "Is this drug available in my country?" is derived from data the corpus holds. These hold it to that: it shows
 * everything the seven-region strip it replaced showed, every row carries a fact from a named field, a region
 * with nothing is named as a gap, and it stays small enough to sit in the overview.
 */
const drugs = graph().kind("drug") as Drug[];

describe("drug availability", () => {
  it("keeps every regional row the strip showed, with its status and year", () => {
    for (const d of drugs) {
      const row = regionalApprovals[d.id];
      if (!row) continue;
      const { rows } = availabilityFor(d);
      for (const r of REGIONS) {
        const e = row[r];
        if (!e) continue;
        const got = rows.find((x) => x.key === r)?.approval;
        expect(got?.status, `${d.id} ${r}`).toBe(e.status);
        expect(got?.year, `${d.id} ${r}`).toBe(e.year);
      }
    }
  });

  it("writes no empty row: each holds an approval, a payer, help with the cost or a country page", () => {
    for (const d of drugs) for (const r of availabilityFor(d).rows) {
      expect(!!r.approval || r.paid.length > 0 || r.help.length > 0 || !!r.named, `${d.id} ${r.key}`).toBe(true);
    }
  });

  it("says each payer fact once in a row", () => {
    for (const d of drugs) for (const r of availabilityFor(d).rows) {
      const texts = r.paid.map((p) => p.text.toLowerCase());
      expect(new Set(texts).size, `${d.id} ${r.key}: ${texts.join(" | ")}`).toBe(texts.length);
    }
  });

  it("names the regions it holds no approval for, rather than implying a refusal", () => {
    for (const d of drugs.slice(0, 400)) {
      const { rows, notRecorded } = availabilityFor(d);
      const held = new Set(rows.filter((r) => r.approval).map((r) => r.key));
      expect(notRecorded.length, d.id).toBe(REGIONS.filter((r) => !held.has(r)).length);
    }
  });

  it("finds a drug on the WHO list by its name or a recorded alias, and nothing else", () => {
    const imatinib = drugs.find((d) => d.id === "imatinib")!;
    expect(emlListing(imatinib)?.name).toBe("Imatinib");
    const listed = drugs.filter((d) => emlListing(d));
    expect(listed.length).toBeGreaterThan(40);
    for (const d of listed) {
      const names = [d.name, ...d.aka].map((n) => n.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim());
      expect(names, d.id).toContain(emlListing(d)!.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim());
    }
  });

  it("links back from every country page that keeps a drug list", () => {
    const dataDir = join(process.cwd(), "src", "data");
    const lists = readdirSync(dataDir).filter((f) => /^country-[a-z]{2}\.ts$/.test(f))
      .filter((f) => /export const [A-Z]{2}_(DIVE: CountryDive|DRUGS) =/.test(readFileSync(join(dataDir, f), "utf8")))
      .map((f) => f.slice(8, 10).toUpperCase()).sort();
    expect(COUNTRY_DIVES.map((c) => c.iso2).sort()).toEqual(lists);
    const ids = new Set(drugs.map((d) => d.id));
    const linked = COUNTRY_DIVES.flatMap((c) => c.drugs.filter((id) => ids.has(id)));
    for (const id of linked.slice(0, 50)) {
      const d = drugs.find((x) => x.id === id)!;
      expect(availabilityFor(d).rows.some((r) => r.named), id).toBe(true);
    }
  });

  it("renders a short table under a fixed budget, even for the drug with the most rows", () => {
    const most = drugs.reduce((a, b) => (availabilityFor(b).rows.length > availabilityFor(a).rows.length ? b : a));
    const html = renderToStaticMarkup(createElement(DrugAvailability, { drug: most }));
    expect(html).toContain("Is this drug available in my country?");
    // The section replaced a 2 KB strip; 24 KB of markup is about five times a paragraph and well inside a drug page.
    expect(Buffer.byteLength(html, "utf8"), most.id).toBeLessThan(24 * 1024);
  });
});
