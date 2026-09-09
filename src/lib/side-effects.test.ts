import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { buildSideEffectIndex, SYMPTOM_GROUPS, symptomGroup } from "./side-effects";
import { sideEffectGuidance } from "@/data/side-effect-guidance";

describe("symptomGroup", () => {
  it("folds label wording into plain-language groups", () => {
    const cases: Array<[string, string]> = [
      ["ALT increased", "Liver inflammation or raised liver enzymes"],
      ["Fatigue/asthenia", "Tiredness (fatigue)"],
      ["Palmar-plantar erythrodysaesthesia (with capecitabine)", "Hand-foot syndrome"],
      ["Neutropenia (grade 3-4)", "Low white cells (neutropenia)"],
      ["Febrile neutropenia / infection", "Fever or febrile neutropenia"],
      ["Grade ≥3 treatment-related adverse events", "Any severe side effect (grade 3 or higher)"],
      ["Adrenal insufficiency (with nivolumab)", "Adrenal insufficiency"],
      ["Renal toxicity (monitor)", "Kidney problems"],
      ["Neurologic toxicity incl. ICANS", "Confusion or brain effects (neurotoxicity, ICANS)"],
      ["Cutaneous squamous cell carcinoma / keratoacanthoma", "Second cancers"],
      ["Reactive cutaneous capillary endothelial proliferation (RCCEP)", "Rash, itching or skin reactions"],
      ["QTc >500 ms", "Heart rhythm changes (QT, atrial fibrillation)"],
      ["Haemorrhagic cystitis", "Bladder symptoms"],
      ["Nausea, fatigue", "Nausea or vomiting"],
      ["Pain", "Pain"],
    ];
    for (const [event, group] of cases) expect(symptomGroup(event), event).toBe(group);
  });

  it("maps every toxicity event in the corpus to a known group (nothing falls through)", () => {
    const known = new Set(SYMPTOM_GROUPS);
    const misses: string[] = [];
    for (const d of graph().kind("drug")) for (const t of d.toxicity) if (!known.has(symptomGroup(t.event))) misses.push(`${d.id}: ${t.event}`);
    expect(misses, misses.join("\n")).toEqual([]);
  });
});

describe("side-effect guidance", () => {
  it("covers every group the rules can produce, with a source URL and no em-dashes", () => {
    const byGroup = new Map(sideEffectGuidance.map((g) => [g.group, g]));
    for (const group of SYMPTOM_GROUPS) {
      const g = byGroup.get(group);
      expect(g, group).toBeDefined();
      if (!g) continue;
      expect(g.source.url).toMatch(/^https:\/\//);
      for (const s of [g.plain, g.selfCare, g.callToday, g.emergency]) expect(s, group).not.toMatch(/—/);
    }
    const dupes = sideEffectGuidance.map((g) => g.group).filter((g, i, a) => a.indexOf(g) !== i);
    expect(dupes).toEqual([]);
  });

  it("builds an index with one row per toxicity entry, all tagged", () => {
    const rows = buildSideEffectIndex();
    const expected = graph().kind("drug").reduce((n, d) => n + d.toxicity.length, 0);
    expect(rows.length).toBe(expected);
    expect(rows.every((r) => r.group && r.drugId && r.route.startsWith("/drugs/"))).toBe(true);
  });
});
