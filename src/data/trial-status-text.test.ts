import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { simple } from "@/data/simple";
import { tldr_zh } from "@/data/i18n/zh";
import type { Trial } from "@/lib/schema";

/**
 * A trial's words must not contradict its status chip. The chip is kept in step with ClinicalTrials.gov by
 * scripts/fetch-registry-status.ts, but the TL;DR and the plain-language sentence were written once, at ingest, with
 * the status of that day. On 19 October 2026 the registry pass had not run for 25 days, and 104 TL;DRs said a trial
 * was in a different state from the registry, among them "now recruiting" on trials that had terminated or been
 * withdrawn. A reader who acts on that writes to a trial that has closed.
 *
 * Only the stock phrases the ingest scripts wrote are checked, at the end of the sentence where they wrote them, so
 * "has finished enrolling a phase 3 trial... and the study is still active" is not mistaken for a completed trial.
 * A result status (positive, negative, mixed) is a verdict rather than a lifecycle stage, so a positive trial may
 * still say "now completed" but may not say it is recruiting.
 */
const LIFECYCLE = ["recruiting", "active", "planned", "completed", "withdrawn"] as const;
type Lifecycle = (typeof LIFECYCLE)[number];

const TLDR_END: [RegExp, Lifecycle][] = [
  [/(?:, |reports that it is )now recruiting\.$|reports that it is recruiting\.$|the registry reported that it is recruiting\.$/, "recruiting"],
  [/(?:, |reports that it is )not yet recruiting\.$/, "planned"],
  [/, active and no longer recruiting\.$/, "active"],
  [/, now completed\.$/, "completed"],
  [/, (?:stopped early|withdrawn before enrolling anyone)\.$/, "withdrawn"],
];
const SIMPLE_END: [RegExp, Lifecycle][] = [
  [/(?:,? and (?:it|the trial) is (?:now |still )?recruiting(?: now)?|; it is still recruiting)\.$/, "recruiting"],
  [/(?:,? and (?:it|the trial|the study) is (?:still )?(?:active|running) but no longer recruiting|,? and (?:it|the trial) is no longer recruiting|, no longer recruiting)\.$/, "active"],
  [/,? and it has completed\.$/, "completed"],
  [/,? and it was (?:stopped early|withdrawn before anyone joined)\.$/, "withdrawn"],
];

/** The Chinese TL;DRs end in the same stock clauses, translated. */
const ZH_END: [RegExp, Lifecycle][] = [
  [/，正在招募。$/, "recruiting"],
  [/，尚未开始招募。$/, "planned"],
  [/，已停止招募。$/, "active"],
  [/，已完成。$/, "completed"],
  [/，(?:已提前终止|已撤回，未入组任何患者)。$/, "withdrawn"],
];

const said = (text: string | undefined, rules: [RegExp, Lifecycle][]): Lifecycle | undefined =>
  rules.find(([re]) => re.test((text ?? "").trim()))?.[1];

/** True when the words are compatible with the chip. A result status allows only words for a finished trial. */
function agrees(words: Lifecycle, status: Trial["status"]): boolean {
  if (!status) return true;
  if ((LIFECYCLE as readonly string[]).includes(status)) return words === status;
  return words === "completed" || words === "withdrawn" || words === "active";
}

describe("trial status in the words", () => {
  const trials = graph().entities.filter((e): e is Trial => e.kind === "trial");

  it("no TL;DR states a different lifecycle from the chip", () => {
    const bad = trials.flatMap((t) => { const w = said(t.tldr, TLDR_END); return w && !agrees(w, t.status) ? [`${t.id}: says ${w}, chip ${t.status}`] : []; });
    expect(bad, `re-run scripts/fetch-registry-status.ts --apply, or correct the TL;DR by hand:\n${bad.slice(0, 15).join("\n")}`).toEqual([]);
  });

  it("no plain-language sentence states a different lifecycle from the chip", () => {
    const bad = trials.flatMap((t) => { const w = said(simple[t.id], SIMPLE_END); return w && !agrees(w, t.status) ? [`${t.id}: says ${w}, chip ${t.status}`] : []; });
    expect(bad, `correct the sentence in src/data/simple/:\n${bad.slice(0, 15).join("\n")}`).toEqual([]);
  });

  it("no Chinese TL;DR states a different lifecycle from the chip", () => {
    const bad = trials.flatMap((t) => { const w = said(tldr_zh[t.id], ZH_END); return w && !agrees(w, t.status) ? [`${t.id}: says ${w}, chip ${t.status}`] : []; });
    expect(bad, `correct the line in src/data/i18n/zh.ts:\n${bad.slice(0, 15).join("\n")}`).toEqual([]);
  });

  it("recognises the phrasing it polices", () => {
    expect(said("A phase 2 trial of X, run by Y, now recruiting.", TLDR_END)).toBe("recruiting");
    expect(said("Y runs this phase 2 trial of X, and it is now recruiting.", SIMPLE_END)).toBe("recruiting");
    expect(said("Y has finished enrolling a phase 3 trial of X, and the study is still active.", SIMPLE_END)).toBeUndefined();
    expect(agrees("recruiting", "positive")).toBe(false);
    expect(agrees("completed", "positive")).toBe(true);
  });
});
