import { describe, expect, it } from "vitest";
import { anc, ancGrade, anthracyclineRisk, bsaDose, bsaDuBois, bsaMosteller, calvert, cockcroftGault, correctedCalcium, correctedCalciumMgdl, creatinineMgdlToUmol, cumulativeAnthracycline, doseBand, recist } from "./calculators";

describe("body surface area", () => {
  it("Mosteller: 170 cm, 70 kg is 1.82 m²", () => {
    expect(bsaMosteller(170, 70)).toBeCloseTo(1.818, 2);
  });
  it("Du Bois agrees with Mosteller to within 2% for an average adult", () => {
    const m = bsaMosteller(170, 70), d = bsaDuBois(170, 70);
    expect(Math.abs(m - d) / m).toBeLessThan(0.02);
  });
  it("BSA dose caps at the protocol BSA", () => {
    expect(bsaDose(100, 2.4, 2.0)).toEqual({ dose: 200, bsaUsed: 2.0, capped: true });
    expect(bsaDose(100, 1.8).dose).toBe(180);
  });
});

describe("renal function and carboplatin", () => {
  it("Cockcroft-Gault: 60-year-old 70 kg man with creatinine 88.4 µmol/L (1.0 mg/dL) clears about 78 mL/min", () => {
    expect(cockcroftGault(60, 70, 88.4, false)).toBeCloseTo(77.8, 0);
    expect(cockcroftGault(60, 70, 88.4, true)).toBeCloseTo(66.1, 0);
  });
  it("converts creatinine units", () => {
    expect(creatinineMgdlToUmol(1)).toBeCloseTo(88.4, 5);
  });
  it("Calvert: AUC 5 with GFR 75 gives 500 mg; GFR is capped at 125", () => {
    expect(calvert(5, 75).dose).toBe(500);
    expect(calvert(5, 150)).toEqual({ dose: 750, gfrUsed: 125, capped: true });
    expect(calvert(5, 150, false).dose).toBe(875);
  });
});

describe("haematology and chemistry", () => {
  it("ANC from WBC and differential, with CTCAE grade", () => {
    expect(anc(4.0, 50, 5)).toBeCloseTo(2.2, 5);
    expect(ancGrade(2.2)).toBe(0);
    expect(ancGrade(1.6)).toBe(1);
    expect(ancGrade(1.2)).toBe(2);
    expect(ancGrade(0.7)).toBe(3);
    expect(ancGrade(0.3)).toBe(4);
  });
  it("albumin-corrected calcium", () => {
    expect(correctedCalcium(2.2, 30)).toBeCloseTo(2.4, 5);
    expect(correctedCalciumMgdl(8.5, 3.0)).toBeCloseTo(9.3, 5);
  });
});

describe("RECIST 1.1", () => {
  it("partial response at 30% shrinkage from baseline", () => {
    expect(recist(100, 100, 70).response).toBe("PR");
    expect(recist(100, 100, 71).response).toBe("SD");
  });
  it("progression needs 20% and 5 mm from nadir", () => {
    expect(recist(100, 20, 24).response).toBe("PR"); // 20% from nadir but only 4 mm: still a PR from baseline
    expect(recist(100, 20, 25).response).toBe("PD"); // 25% and 5 mm
    expect(recist(100, 60, 72).response).toBe("PD");
    expect(recist(100, 60, 71).response).toBe("SD");
  });
  it("new lesions are progression regardless of size; zero sum is complete response", () => {
    expect(recist(100, 50, 40, true).response).toBe("PD");
    expect(recist(100, 10, 0).response).toBe("CR");
  });
});

describe("anthracyclines and dose banding", () => {
  it("cumulative doxorubicin equivalent uses ESC 2022 factors", () => {
    const r = cumulativeAnthracycline([{ agent: "doxorubicin", mgPerM2: 240 }, { agent: "epirubicin", mgPerM2: 100 }]);
    expect(r.equivalent).toBeCloseTo(320, 5);
    expect(anthracyclineRisk(r.equivalent)).toBe("raised");
    expect(anthracyclineRisk(100)).toBe("standard");
    expect(anthracyclineRisk(450)).toBe("high");
  });
  it("dose banding rounds to the band and reports deviation", () => {
    expect(doseBand(147, 10)).toEqual({ banded: 150, deviationPct: expect.closeTo(2.04, 1), withinTolerance: true });
    expect(doseBand(23, 10).withinTolerance).toBe(false);
  });
});
