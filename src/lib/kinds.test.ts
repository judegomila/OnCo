import { describe, expect, it } from "vitest";
import { buildBrowser } from "./kind-browser";
import { normalisePhaseLabel, PHASE_ORDER, phaseLabel } from "./kinds";

/**
 * Trial phases used to render as the literal template `Phase ${phase}`, so observational studies read
 * "Phase observational" and platform trials "Phase platform" on the compare, decisions and index pages.
 * phaseLabel is the single source of the human label; normalisePhaseLabel keeps old shared filter links working.
 */
describe("phaseLabel", () => {
  it("labels numeric phases and names the two non-numeric designs", () => {
    expect(phaseLabel("3")).toBe("Phase 3");
    expect(phaseLabel("2/3")).toBe("Phase 2/3");
    expect(phaseLabel("1/2")).toBe("Phase 1/2");
    expect(phaseLabel("1")).toBe("Phase 1");
    expect(phaseLabel("2")).toBe("Phase 2");
    expect(phaseLabel("4")).toBe("Phase 4");
    expect(phaseLabel("platform")).toBe("Platform trial");
    expect(phaseLabel("observational")).toBe("Observational study");
  });

  it("falls back to the raw value for anything outside the enum", () => {
    expect(phaseLabel("pilot")).toBe("pilot");
  });

  it("orders every phase value once", () => {
    expect([...PHASE_ORDER].sort()).toEqual(["1", "1/2", "2", "2/3", "3", "4", "observational", "platform"]);
  });
});

describe("normalisePhaseLabel", () => {
  it("accepts the current label, the raw enum value and the old 'Phase observational' template form", () => {
    expect(normalisePhaseLabel("Observational study")).toBe("Observational study");
    expect(normalisePhaseLabel("observational")).toBe("Observational study");
    expect(normalisePhaseLabel("Phase observational")).toBe("Observational study");
    expect(normalisePhaseLabel("Phase platform")).toBe("Platform trial");
    expect(normalisePhaseLabel("Phase 3")).toBe("Phase 3");
    expect(normalisePhaseLabel(" Phase 2/3 ")).toBe("Phase 2/3");
  });

  it("leaves unknown values alone", () => {
    expect(normalisePhaseLabel("Phase pilot")).toBe("Phase pilot");
  });
});

describe("/trials/ phase facet", () => {
  it("uses the human labels, so the facet chips match the filter links built from phaseLabel", () => {
    const { rows, facets } = buildBrowser("trial");
    const values = new Set(rows.flatMap((r) => r.facets.phase ?? []));
    expect(values.size).toBeGreaterThan(0);
    for (const v of values) {
      expect(v, `facet value ${v}`).not.toMatch(/^Phase (observational|platform)$/);
      expect(normalisePhaseLabel(v)).toBe(v);
    }
    const phase = facets.find((f) => f.key === "phase");
    expect(phase?.normalise?.("Phase observational")).toBe("Observational study");
  });
});
