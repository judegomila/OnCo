import { describe, expect, it } from "vitest";
import { classifyEndpoint, explainOutcome, explainPrimary, explainTrial, type Outcome } from "./trial-explain";

const setting = "HER2-positive metastatic breast cancer after one prior line";

describe("explainOutcome: percent rows", () => {
  it("gives absolute difference per 100 and a rough number needed to treat", () => {
    const o: Outcome = { endpoint: "Overall survival at 3 years", unit: "%", primary: true, arms: [{ name: "Drug A", value: 62 }, { name: "Standard", value: 51 }] };
    const x = explainOutcome(o, { setting });
    expect(x.endpointType).toBe("os");
    expect(x.sentences[0]).toBe("62 vs 51 out of 100 alive at 3 years with Drug A compared with Standard; 11 more per 100.");
    expect(x.sentences[1]).toContain("one extra person helped for every 9 treated");
    expect(x.sentences[1]).toContain("rough figure");
  });

  it("says when the first group did worse and gives no number needed to treat", () => {
    const o: Outcome = { endpoint: "Overall survival at 5 years", unit: "%", arms: [{ name: "New", value: 40 }, { name: "Old", value: 45 }] };
    const x = explainOutcome(o, { setting: "" });
    expect(x.sentences[0]).toContain("5 fewer per 100");
    expect(x.sentences.join(" ")).not.toContain("extra person helped");
    expect(x.sentences[1]).toContain("did worse");
  });

  it("accepts 'percent' and '% alive' as units", () => {
    for (const unit of ["percent", "% alive"]) {
      const x = explainOutcome({ endpoint: "Overall survival at 2 years", unit, arms: [{ name: "A", value: 70 }, { name: "B", value: 60 }] }, { setting: "" });
      expect(x.sentences[0]).toContain("70 vs 60 out of 100");
    }
  });

  it("handles a single-arm response rate with no comparison", () => {
    const o: Outcome = { endpoint: "Objective response rate", unit: "%", arms: [{ name: "Drug X", value: 34, n: 120 }] };
    const x = explainOutcome(o, { setting: "Relapsed disease" });
    expect(x.endpointType).toBe("response");
    expect(x.sentences[0]).toBe("34 out of 100 people had their tumour shrink with Drug X.");
    expect(x.caveats.some((c) => c.includes("no comparison group"))).toBe(true);
    expect(x.caveats.some((c) => c.includes("does not by itself show that people live longer"))).toBe(true);
  });
});

describe("explainOutcome: months rows", () => {
  it("explains medians as midpoints", () => {
    const o: Outcome = { endpoint: "Progression-free survival", unit: "months", arms: [{ name: "Drug A", value: 11.3 }, { name: "Chemo", value: 8.2 }], hr: 0.64, ci: [0.5, 0.8] };
    const x = explainOutcome(o, { setting });
    expect(x.sentences[0]).toBe("Median 11.3 vs 8.2 months with Drug A compared with Chemo; about 3.1 months longer for half the group.");
    expect(x.sentences[1]).toContain("midpoint");
    expect(x.sentences.some((s) => s.includes("36 percent lower chance"))).toBe(true);
  });

  it("explains a median that was not reached", () => {
    const o: Outcome = { endpoint: "Disease-free survival", unit: "months", arms: [{ name: "Osimertinib", note: "Median DFS not reached" }, { name: "Placebo", value: 19.6 }], hr: 0.17 };
    const x = explainOutcome(o, { setting: "Resected EGFR-mutant NSCLC" });
    expect(x.sentences[0]).toBe("Median 19.6 months with Placebo.");
    expect(x.sentences.some((s) => s.includes("Not reached"))).toBe(true);
    expect(x.caveats.some((c) => c.includes("EGFR"))).toBe(true);
  });
});

describe("explainOutcome: HR-only and other rows", () => {
  it("turns a hazard ratio into a relative chance and says the absolute difference is missing", () => {
    const o: Outcome = { endpoint: "Progression-free survival", unit: "HR", arms: [{ name: "Drug", note: "Medians not reported" }, { name: "Control" }], hr: 0.7, p: "<0.001" };
    const x = explainOutcome(o, { setting: "" });
    expect(x.sentences[0]).toBe("The treated group had about 30 percent lower chance of the event at any given time (hazard ratio 0.7).");
    expect(x.sentences[1]).toContain("absolute difference");
    expect(x.sentences[1]).toContain("not reported");
    expect(x.caveats.some((c) => c.includes("p-value"))).toBe(true);
  });

  it("lists event counts neutrally", () => {
    const o: Outcome = { endpoint: "Recurrences", unit: "events", arms: [{ name: "A", value: 12, n: 200 }, { name: "B", value: 30, n: 198 }] };
    const x = explainOutcome(o, { setting: "" });
    expect(x.sentences[0]).toBe("A: 12 events; B: 30 events.");
    expect(x.sentences[1]).toContain("counts of events");
  });

  it("does not invent numbers when none are recorded", () => {
    const o: Outcome = { endpoint: "Overall survival", arms: [{ name: "A", note: "pending" }] };
    const x = explainOutcome(o, { setting: "" });
    expect(x.sentences[0]).toContain("not recorded here");
    expect(x.sentences.join(" ")).not.toMatch(/\d+ out of 100/);
  });

  it("flags a confidence interval that crosses 1", () => {
    const o: Outcome = { endpoint: "Overall survival", unit: "months", arms: [{ name: "A", value: 20.1 }, { name: "B", value: 20 }], hr: 1.01, ci: [0.79, 1.3] };
    const x = explainOutcome(o, { setting: "" });
    expect(x.caveats.some((c) => c.includes("crosses 1"))).toBe(true);
  });
});

describe("endpoint classification and caveats", () => {
  it("flags PFS as a surrogate and OS as not", () => {
    expect(classifyEndpoint("Progression-free survival")).toBe("surrogate");
    expect(classifyEndpoint("Pathologic complete response")).toBe("surrogate");
    expect(classifyEndpoint("Undetectable MRD in peripheral blood")).toBe("surrogate");
    expect(classifyEndpoint("Overall survival")).toBe("os");
    expect(classifyEndpoint("Overall survival at 5 years, stage II–IIIA")).toBe("os");
    expect(classifyEndpoint("Objective response rate")).toBe("response");
    const pfs = explainOutcome({ endpoint: "Progression-free survival", unit: "months", arms: [{ name: "A", value: 10 }, { name: "B", value: 5 }] }, { setting: "" });
    expect(pfs.caveats.some((c) => c.includes("surrogate endpoint"))).toBe(true);
    const os = explainOutcome({ endpoint: "Overall survival", unit: "months", arms: [{ name: "A", value: 10 }, { name: "B", value: 5 }] }, { setting: "" });
    expect(os.caveats.some((c) => c.includes("surrogate endpoint"))).toBe(false);
    expect(os.caveats.some((c) => c.includes("most direct measure"))).toBe(true);
  });

  it("quotes the setting and adds a biomarker caveat when the setting names one", () => {
    const x = explainOutcome({ endpoint: "Overall survival", unit: "months", arms: [{ name: "A", value: 10 }, { name: "B", value: 5 }] }, { setting: "PD-L1 CPS ≥ 10 metastatic TNBC" });
    expect(x.caveats.some((c) => c.includes("apply to the people the trial enrolled: PD-L1 CPS ≥ 10 metastatic TNBC"))).toBe(true);
    expect(x.caveats.some((c) => c.includes("selected people by a biomarker (PD-L1)"))).toBe(true);
    const plain = explainOutcome({ endpoint: "Overall survival", unit: "months", arms: [{ name: "A", value: 10 }, { name: "B", value: 5 }] }, { setting: "Untreated advanced gastric cancer" });
    expect(plain.caveats.some((c) => c.includes("biomarker"))).toBe(false);
  });

  it("warns about small trials", () => {
    const x = explainOutcome({ endpoint: "Objective response rate", unit: "%", arms: [{ name: "A", value: 50 }] }, { setting: "", enrolled: 40 });
    expect(x.caveats.some((c) => c.includes("Only 40 people"))).toBe(true);
  });
});

describe("explainTrial and explainPrimary", () => {
  const trial = {
    setting: "Advanced disease",
    enrolled: 500,
    outcomes: [
      { endpoint: "Progression-free survival", unit: "months", arms: [{ name: "A", value: 10 }, { name: "B", value: 5 }] },
      { endpoint: "Overall survival at 3 years", primary: true, unit: "%", arms: [{ name: "A", value: 62 }, { name: "B", value: 51 }] },
    ] as Outcome[],
  };
  it("puts the primary endpoint first", () => {
    const xs = explainTrial(trial);
    expect(xs[0].outcome.endpoint).toBe("Overall survival at 3 years");
    expect(xs).toHaveLength(2);
  });
  it("summarises the primary endpoint in one sentence", () => {
    expect(explainPrimary(trial)).toBe("62 vs 51 out of 100 alive at 3 years with A compared with B; 11 more per 100.");
    expect(explainPrimary({ setting: "", outcomes: [] })).toBeUndefined();
  });
});
