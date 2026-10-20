import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { isLabelKey, isNotAProductKey } from "../../scripts/drug-key-guard";
import type { Trial } from "@/lib/schema";

/**
 * Two ingest faults found on 19 October 2026, held here so a re-run cannot bring them back.
 *
 * Small-cell lung cancer was matched inside "non-small cell lung cancer", so 252 trials of non-small-cell lung cancer
 * were also filed under small-cell, sat on its page and its trial counts, and their TL;DRs said "in non-small-cell
 * lung cancer and small-cell lung cancer". JROSG 99-1, a brain-metastasis trial the small-cell spike cites on
 * purpose, is the one exception.
 *
 * Products were matched on keys that are not products: a radiolabel ("177Lu" made six trials of other
 * radioligands into FAP-2286 trials) or a target name ("mesothelin", "EGFR"). scripts/drug-key-guard.ts drops them.
 */
const DELIBERATE = new Set(["jrosg-99-1"]);

describe("trial matching", () => {
  const trials = graph().entities.filter((e): e is Trial => e.kind === "trial");

  it("no trial that names only non-small-cell lung cancer is filed under small-cell", () => {
    const bad = trials.filter((t) => t.cancers.includes("sclc") && t.cancers.includes("nsclc") && !DELIBERATE.has(t.id)).filter((t) => {
      const text = [t.name, t.setting, ...t.aka, t.summary.replace(/A phase [^.]*trial of [^.]*\./, "")].join(" ");
      const rest = text.replace(/non[- ]?small[- ]cell/gi, "").replace(/NSCLC/g, "");
      return /non[- ]?small[- ]cell|NSCLC/i.test(text) && !/small[- ]cell|SCLC|neuroendocrine/i.test(rest);
    }).map((t) => t.id);
    expect(bad, `filed under sclc but only about NSCLC: ${bad.slice(0, 10).join(", ")}`).toEqual([]);
  });

  it("FAP-2286 is linked only to trials of FAP-2286", () => {
    const linked = trials.filter((t) => t.drugs.includes("fap-2286"));
    for (const t of linked) expect([t.name, t.setting].join(" "), t.id).toMatch(/FAP-?2286/i);
  });

  it("a radiolabel or a target name is never a product key", () => {
    for (const k of ["177lu", "68ga", "18f", "lu 177", "i 131"]) expect(isLabelKey(k), k).toBe(true);
    for (const k of ["mesothelin", "egfr", "kras", "vegf"]) expect(isNotAProductKey(k), k).toBe(true);
    for (const k of ["fap 2286", "ak117", "tc011", "at101", "th 302", "pembrolizumab", "opdualag"]) expect(isNotAProductKey(k), k).toBe(false);
  });
});
