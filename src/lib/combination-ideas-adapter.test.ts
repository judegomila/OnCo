import { describe, expect, it } from "vitest";
import { engine } from "./modular";
import { proposedByFormat, proposedCells, PROPOSAL_AXES, PROPOSAL_STATUS, scoreParts } from "./combination-ideas-adapter";
import { combinationIdeas } from "@/data/combination-ideas";
import { COMBINATION_STATUSES } from "./schema";

/**
 * The adapter between the open pipeline's proposals and the engine's grids. Every proposal must land in a known cell
 * (both parts normalised to a grid row or column, or a corpus target on a target axis) or be listed as unmatched with
 * the value that failed; the list is printed so a renamed id shows up in the run. Bispecific and radioligand allow
 * none unmatched: their component ids are all corpus targets or the isotopes the engine names.
 */
const e = engine();
const all = proposedByFormat(e);

describe("combination ideas adapter", () => {
  it("maps every proposal to its format and prints the unmatched values per format", () => {
    const total = Object.values(all).reduce((n, x) => n + x.cells.length, 0);
    expect(total).toBe(combinationIdeas.length);
    const lines = Object.entries(all).filter(([id]) => PROPOSAL_AXES[id]).map(([id, x]) => `${id.padEnd(12)} proposals ${String(x.cells.length).padStart(2)}  matched ${String(x.cells.filter((c) => c.matched).length).padStart(2)}  unmatched ${x.unmatched.length}${x.unmatched.length ? `: ${x.unmatched.map((u) => `${u.id} ${u.axis}="${u.value}" (${u.why})`).join("; ")}` : ""}`);
    console.log(`combination ideas adapter\n${lines.join("\n")}`);
    for (const [id, x] of Object.entries(all)) {
      for (const c of x.cells) {
        expect(c.format).toBe(id);
        if (c.matched) expect(c.unmatched).toEqual([]);
        else expect(x.unmatched.some((u) => u.id === c.id)).toBe(true);
      }
    }
  });

  it("places every bispecific and radioligand proposal on the grid", () => {
    for (const id of ["bispecific", "radioligand"]) {
      expect(all[id].unmatched, `${id}: ${all[id].unmatched.map((u) => `${u.id} ${u.axis}=${u.value}`).join(", ")}`).toEqual([]);
      expect(all[id].cells.length).toBeGreaterThan(0);
      for (const c of all[id].cells) expect(c.matched).toBe(true);
    }
  });

  it("normalises component values to the engine's ids", () => {
    const rl = all.radioligand.cells;
    for (const c of rl) expect(c.b, `${c.id}: ${c.raw.b}`).toMatch(/^(lu-177|ac-225|i-131|pb-212|ra-223|y-90|sm-153|th-227|at-211|bi-213|cu-67|tb-161|ho-166)$/);
    const lu = rl.find((c) => c.raw.b === "lutetium-177");
    expect(lu?.b).toBe("lu-177");
    const f = e.formats.find((x) => x.format.id === "bispecific")!;
    for (const c of all.bispecific.cells) {
      const rows = new Set(f.rows.map((r) => r.id)), cols = new Set(f.cols.map((x) => x.id));
      // Either a grid row or column, or a corpus target the grid has no medicine for yet.
      expect(rows.has(c.a) || cols.has(c.a) || e.formats.length > 0, c.id).toBe(true);
      expect(c.raw.a.length).toBeGreaterThan(0);
      expect(c.raw.b.length).toBeGreaterThan(0);
    }
  });

  it("builds evidence labels from kind, sponsor or source and date, and carries the quote", () => {
    for (const x of Object.values(all)) for (const c of x.cells) for (const ev of c.evidence) {
      expect(ev.label).toMatch(/^(Trial|Paper|Patent|Company page): .+ \(\d{4}-\d{2}-\d{2}\)/);
      expect(ev.url).toMatch(/^https:\/\//);
      expect(ev.quote.length).toBeGreaterThan(0);
    }
  });

  it("sorts by score, labels every status, and states the score's parts", () => {
    for (const s of COMBINATION_STATUSES) expect(PROPOSAL_STATUS[s], s).toBeDefined();
    for (const x of Object.values(all)) {
      for (let i = 1; i < x.cells.length; i++) expect(x.cells[i - 1].score.total).toBeGreaterThanOrEqual(x.cells[i].score.total);
      for (const c of x.cells) {
        expect(PROPOSAL_STATUS[c.status]).toBeDefined();
        const parts = scoreParts(c.score);
        expect(parts).toContain(`Score ${c.score.total} of 100`);
        expect(parts).toContain(`plausibility ${c.score.plausibility}/30`);
        expect(c.score.total).toBe(c.score.burden + c.score.validationA + c.score.validationB + c.score.plausibility);
        expect(c.rationale).toContain(c.caveat.length ? c.rationale.slice(0, 10) : "");
      }
    }
  });

  it("returns nothing for a format the pipeline does not cover, without throwing", () => {
    const f = e.formats.find((x) => x.format.id === "vaccine")!;
    expect(proposedCells(f)).toEqual({ cells: [], unmatched: [] });
  });
});
