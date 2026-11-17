import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { buildSideEffectIndex, CHECKPOINT_MODALITY, PROTOCOL_REACH, protocolReaches, rowProtocols, SYMPTOM_GROUPS, SYMPTOM_PROTOCOLS, symptomGroup, symptomProtocols, T_CELL_ENGAGER_MODALITY } from "./side-effects";
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

describe("side-effect protocols", () => {
  const g = graph();
  const rows = buildSideEffectIndex();
  const byGroup = symptomProtocols(rows);

  it("names only protocols, under groups the rules produce", () => {
    const groups = new Set(SYMPTOM_GROUPS);
    const bad: string[] = [];
    for (const [group, spec] of Object.entries(SYMPTOM_PROTOCOLS)) {
      if (!groups.has(group)) bad.push(`unknown group ${group}`);
      for (const id of [...(spec.general ?? []), ...(spec.specific ?? [])]) if (g.get(id)?.kind !== "protocol") bad.push(`${group}: ${id} is not a protocol`);
    }
    expect(bad).toEqual([]);
  });

  it("gives a treatment-specific protocol only with the products it reaches", () => {
    for (const [group, list] of Object.entries(byGroup)) for (const p of list.filter((x) => !x.general)) {
      const rec = g.must(p.id);
      expect(p.drugs.length, p.id).toBeGreaterThan(0);
      // Each product listed has a row in this group that the protocol applies to.
      for (const d of p.drugs) expect(rows.some((r) => r.group === group && r.drugId === d && protocolReaches(rec as never, g.must(d) as never, r.event, g)), `${p.id} ${d}`).toBe(true);
    }
    // Colitis on a checkpoint inhibitor reaches the immune-related colitis protocol; the general diarrhoea protocol is there for everyone.
    const colitis = byGroup["Colitis (bowel inflammation)"] ?? [];
    expect(colitis.find((p) => p.id === "irae-colitis")?.drugs.some((d) => ["pembrolizumab", "nivolumab", "ipilimumab"].includes(d))).toBe(true);
    expect(colitis.some((p) => p.general && p.id === "treatment-induced-diarrhoea-grading-and-management")).toBe(true);
    // A product the protocol does not name is not listed under it: no capecitabine under immune-related colitis.
    expect(colitis.find((p) => p.id === "irae-colitis")?.drugs).not.toContain("capecitabine");
    expect((byGroup["Hand-foot syndrome"] ?? []).map((p) => p.id)).toContain("hand-foot-syndrome-prevention-and-dose-modification");
  });

  /** The protocols for one product's row, found by a word in its event. */
  const forRow = (drugId: string, eventRe: RegExp): string[] => {
    const row = rows.find((r) => r.drugId === drugId && eventRe.test(r.event));
    expect(row, `${drugId} ${eventRe}`).toBeDefined();
    return row ? rowProtocols(row, g) : [];
  };

  it("names a reach only for a protocol the table lists, with patterns that are word-bounded", () => {
    const listed = new Set(Object.values(SYMPTOM_PROTOCOLS).flatMap((x) => [...(x.general ?? []), ...(x.specific ?? [])]));
    for (const [id, reach] of Object.entries(PROTOCOL_REACH)) {
      expect(listed.has(id), id).toBe(true);
      // A fragment is not a class: `imid` once matched inside `pyrimidine`. No pattern may match in the middle of a word.
      for (const re of [reach.modality, reach.event, reach.notEvent]) if (re) for (const word of ["fluoropyrimidine", "noncytotoxicity", "antiaromatases", "pneumonias", "photosensitivitys", "xdyspnoeax", "xgnrhx", "preradiational", "arthralgias", "breathlessnesses", "disjointed"]) expect(re.test(word), `${id}: ${re} matched inside ${word}`).toBe(false);
    }
    // Checkpoint inhibitors by modality, and what is not one: a PD-L1 assay, a drug studied beside checkpoint antibodies.
    for (const m of ["Monoclonal antibody (anti-PD-1)", "Bispecific antibody (PD-1×VEGF)", "Fixed-dose bispecific combination (anti-LAG-3 + anti-PD-1)", "PD-1 antibody + oral VEGFR2 inhibitor"]) expect(CHECKPOINT_MODALITY.test(m), m).toBe(true);
    for (const m of ["PD-L1 immunohistochemistry companion diagnostic assay", (g.must("ivermectin") as { modality: string }).modality, "Monoclonal antibody (anti-PD-10)", "Small-molecule kinase inhibitor (EGFR)"]) expect(CHECKPOINT_MODALITY.test(m), m).toBe(false);
    // T-cell engagers, and the bispecific antibodies that engage no T cell.
    for (const m of ["Bispecific T-cell engager (DLL3×CD3)", "ImmTAC (TCR×CD3 bispecific)", "Bispecific T cell engager"]) expect(T_CELL_ENGAGER_MODALITY.test(m), m).toBe(true);
    for (const m of ["Bispecific antibody (EGFR×MET)", "Biparatopic bispecific antibody (HER2)", "CAR-T (CD19)", "Bispecific antibody (PD-1×VEGF)"]) expect(T_CELL_ENGAGER_MODALITY.test(m), m).toBe(false);
    // The event patterns: pneumonia is not pneumonitis, breathlessness is not cough, photosensitivity is not photopsia.
    const vaccination = PROTOCOL_REACH["vaccination-around-cancer-treatment"].event as RegExp;
    expect(["Pneumonia", "COVID-19"].every((e) => vaccination.test(e))).toBe(true);
    expect(["Pneumonitis", "Upper respiratory infection", "Urinary tract infection", "BCG infection or sepsis"].some((e) => vaccination.test(e))).toBe(false);
    const triage = PROTOCOL_REACH["acute-oncology-telephone-triage"].event as RegExp;
    expect(["Dyspnoea", "Breathlessness on exertion"].every((e) => triage.test(e))).toBe(true);
    expect(["Cough", "Hypoxia", "Pneumothorax"].some((e) => triage.test(e))).toBe(false);
    const sun = PROTOCOL_REACH["sun-protection-during-and-after-cancer-treatment"].event as RegExp;
    expect(sun.test("Photosensitivity/rash")).toBe(true);
    expect(["Visual disturbances (including photopsia)", "Rash"].some((e) => sun.test(e))).toBe(false);
    const hormone = PROTOCOL_REACH["bone-health-on-hormone-therapy"].modality as RegExp;
    expect(["Small-molecule aromatase inhibitor", "GnRH agonist depot"].every((m) => hormone.test(m))).toBe(true);
    expect(["Small-molecule SERM", "Oral SERD", "Signalling inhibitor (GNRHR2 pathway)"].some((m) => hormone.test(m))).toBe(false);
    const chemo = PROTOCOL_REACH["scalp-cooling-during-chemotherapy"].modality as RegExp;
    expect(["Cytotoxic regimen", "Cytotoxic chemotherapy (taxane)"].every((m) => chemo.test(m))).toBe(true);
    expect(["ADC", "Small-molecule kinase inhibitor (FGFR1-3)", "Small-molecule CDK4/6 inhibitor"].some((m) => chemo.test(m))).toBe(false);
  });

  it("keeps immune-related protocols for checkpoint inhibitors, whatever technology a record shares", () => {
    const wrong: string[] = [];
    for (const r of rows) {
      const d = g.must(r.drugId);
      if (d.kind !== "drug" || CHECKPOINT_MODALITY.test(d.modality)) continue;
      for (const id of rowProtocols(r, g)) { const p = g.must(id); if (p.kind === "protocol" && p.domain === "immunotherapy-toxicity") wrong.push(`${r.drugId}: ${r.event} -> ${id}`); }
    }
    expect(wrong, wrong.join("\n")).toEqual([]);
    // Ivermectin carries the checkpoint-inhibitor technology as a drug studied beside those antibodies; it is not one.
    expect(rows.filter((r) => r.drugId === "ivermectin").flatMap((r) => rowProtocols(r, g)).filter((id) => id.startsWith("irae-"))).toEqual([]);
    // The antibodies named through the technology alone still reach them.
    expect(forRow("tislelizumab", /rash/i)).toContain("irae-skin");
    expect(forRow("relatlimab-nivolumab", /myocarditis/i)).toContain("irae-myocarditis");
    expect(forRow("ivonescimab", /hypothyroid/i)).toContain("irae-thyroid");
    // The pneumonitis protocol says radiation pneumonitis is not covered.
    expect(forRow("durvalumab", /^pneumonitis/i)).toContain("irae-pneumonitis");
    expect(forRow("durvalumab", /radiation pneumonitis/i)).toEqual([]);
  });

  it("reaches a protocol by class or by event only where the protocol's own population covers it", () => {
    // Step-up dosing: every T-cell engager, not every bispecific antibody.
    expect(forRow("tarlatamab", /neurologic/i)).toEqual(["bispecific-step-up-dosing"]);
    expect(forRow("blinatumomab", /infection/i)).toEqual(["bispecific-step-up-dosing"]);
    expect(rows.filter((r) => r.drugId === "amivantamab").flatMap((r) => rowProtocols(r, g))).not.toContain("bispecific-step-up-dosing");
    // Named products only, where the protocol says the rest of the class is outside its scope.
    expect(forRow("datopotamab-deruxtecan", /keratitis/i)).toEqual([]);
    expect(forRow("mirvetuximab-soravtansine", /keratopathy/i)).toEqual(["eye-care-with-ocular-toxic-antibody-drug-conjugates"]);
    expect(forRow("lapatinib", /diarrhoea/i)).toEqual(["treatment-induced-diarrhoea-grading-and-management"]);
    // Scalp cooling: cytotoxic chemotherapy for a solid tumour; not an antibody-drug conjugate, not a leukaemia regimen.
    expect(forRow("folfiri", /alopecia/i)).toEqual(["scalp-cooling-during-chemotherapy"]);
    expect(forRow("trastuzumab-deruxtecan", /alopecia/i)).toEqual([]);
    expect(protocolReaches(g.must("scalp-cooling-during-chemotherapy") as never, g.must("cytarabine-7-3") as never, "Alopecia", g)).toBe(false);
    // Hormone therapy and bone; aromatase inhibitor joint pain and nobody else's.
    expect(forRow("letrozole", /fracture/i)).toEqual(["bone-health-on-hormone-therapy"]);
    expect(forRow("goserelin", /bone loss/i)).toEqual(["bone-health-on-hormone-therapy"]);
    expect(forRow("letrozole", /arthralgia/i)).toEqual(["chronic-pain-in-cancer-survivors"]);
    expect(forRow("fulvestrant", /arthralgia/i)).toEqual([]);
    expect(forRow("cisplatin", /nephrotox/i)).toEqual(["renal-dose-adjustment-of-anticancer-drugs"]);
    expect(forRow("bevacizumab", /wound/i)).toEqual(["anti-vegf-drugs-around-surgery"]);
    expect(forRow("vorasidenib", /covid/i)).toEqual(["vaccination-around-cancer-treatment"]);
    expect(forRow("belzutifan", /dyspnoea/i)).toEqual(["acute-oncology-telephone-triage"]);
    expect(forRow("vemurafenib", /photosens/i)).toContain("sun-protection-during-and-after-cancer-treatment");
  });

  it("leaves a side effect without a protocol where none in the corpus fits", () => {
    // Each of these was read against the candidate protocol and left as a gap on purpose (scripts/measure-side-effect-chain.ts --gaps).
    // The cardio-oncology protocol says VEGF inhibitor hypertension and arrhythmia monitoring are beyond it.
    expect(forRow("bevacizumab", /hypertension/i)).toEqual([]);
    expect(forRow("bevacizumab", /proteinuria/i)).toEqual([]);
    expect(forRow("osimertinib", /qtc/i)).toEqual([]);
    // Lung inflammation on a drug that is not a checkpoint inhibitor: the only pneumonitis protocol is the immune-related one.
    expect(forRow("osimertinib", /interstitial lung/i)).toEqual([]);
    expect(forRow("trastuzumab-deruxtecan", /interstitial lung/i)).toEqual([]);
    // The hepatic dose adjustment protocol is about dosing in a liver that already works poorly, not a drug-caused enzyme rise.
    expect(forRow("abemaciclib", /^alt/i)).toEqual([]);
    expect(forRow("alpelisib", /hyperglyc/i)).toEqual([]);
    expect(forRow("belzutifan", /hypoxia/i)).toEqual([]);
    expect(forRow("sotorasib", /cough/i)).toEqual([]);
    expect(forRow("venetoclax", /upper respiratory/i)).toEqual([]);
  });
});

