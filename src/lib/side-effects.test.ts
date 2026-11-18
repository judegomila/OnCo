import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { buildSideEffectIndex, protocolNamesProduct, SYMPTOM_GROUPS, SYMPTOM_PROTOCOLS, symptomGroup, symptomProtocols } from "./side-effects";
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

  it("gives a treatment-specific protocol only with the products it names", () => {
    for (const list of Object.values(byGroup)) for (const p of list.filter((x) => !x.general)) {
      const rec = g.must(p.id);
      expect(p.drugs.length, p.id).toBeGreaterThan(0);
      for (const d of p.drugs) expect(protocolNamesProduct(rec as never, g.must(d) as never), `${p.id} ${d}`).toBe(true);
    }
    // Colitis on a checkpoint inhibitor reaches the immune-related colitis protocol; the general diarrhoea protocol is there for everyone.
    const colitis = byGroup["Colitis (bowel inflammation)"] ?? [];
    expect(colitis.find((p) => p.id === "irae-colitis")?.drugs.some((d) => ["pembrolizumab", "nivolumab", "ipilimumab"].includes(d))).toBe(true);
    expect(colitis.some((p) => p.general && p.id === "treatment-induced-diarrhoea-grading-and-management")).toBe(true);
    // A product the protocol does not name is not listed under it: no capecitabine under immune-related colitis.
    expect(colitis.find((p) => p.id === "irae-colitis")?.drugs).not.toContain("capecitabine");
    expect((byGroup["Hand-foot syndrome"] ?? []).map((p) => p.id)).toContain("hand-foot-syndrome-prevention-and-dose-modification");
  });

  // The fourteen protocols written for side effects of targeted drugs, each under the groups it manages. A specific one
  // is pinned with a product it must appear beside and, where the group holds other causes, one it must not.
  const TARGETED: Array<{ group: string; id: string; general?: true; beside?: string[]; notBeside?: string[] }> = [
    { group: "High blood pressure", id: "hypertension-and-proteinuria-on-vegf-pathway-inhibitors", beside: ["bevacizumab", "axitinib", "lenvatinib"], notBeside: ["ibrutinib", "zanubrutinib", "carfilzomib", "lorlatinib"] },
    { group: "High blood pressure", id: "atrial-fibrillation-and-bleeding-on-btk-inhibitors", beside: ["ibrutinib", "zanubrutinib"], notBeside: ["bevacizumab", "axitinib", "carfilzomib"] },
    { group: "Kidney problems", id: "hypertension-and-proteinuria-on-vegf-pathway-inhibitors", beside: ["bevacizumab", "ramucirumab"], notBeside: ["cisplatin", "nivolumab", "adagrasib"] },
    { group: "Heart rhythm changes (QT, atrial fibrillation)", id: "qt-prolongation-monitoring-on-anticancer-drugs", beside: ["ribociclib", "osimertinib", "quizartinib"], notBeside: ["ibrutinib", "acalabrutinib", "camizestrant"] },
    { group: "Heart rhythm changes (QT, atrial fibrillation)", id: "atrial-fibrillation-and-bleeding-on-btk-inhibitors", beside: ["ibrutinib", "acalabrutinib", "zanubrutinib", "pirtobrutinib"], notBeside: ["ribociclib", "osimertinib", "camizestrant"] },
    { group: "Bleeding or bruising", id: "atrial-fibrillation-and-bleeding-on-btk-inhibitors", beside: ["ibrutinib", "pirtobrutinib"], notBeside: ["bevacizumab", "trastuzumab-emtansine", "gemtuzumab-ozogamicin"] },
    { group: "High blood sugar", id: "hyperglycaemia-on-pi3k-akt-mtor-inhibitors", beside: ["alpelisib", "capivasertib", "everolimus"], notBeside: ["enfortumab-vedotin"] },
    { group: "Blood chemistry or blood count changes (other)", id: "hypomagnesaemia-on-egfr-antibodies", beside: ["cetuximab", "panitumumab"], notBeside: ["erdafitinib", "lorlatinib", "ivosidenib"] },
    { group: "Blood chemistry or blood count changes (other)", id: "hyperphosphataemia-on-fgfr-inhibitors", beside: ["erdafitinib", "pemigatinib", "futibatinib"], notBeside: ["cetuximab", "panitumumab", "nirogacestat"] },
    { group: "Thyroid changes", id: "hypothyroidism-on-tyrosine-kinase-inhibitors", beside: ["fruquintinib"], notBeside: ["pembrolizumab", "nivolumab", "ipilimumab"] },
    { group: "Liver inflammation or raised liver enzymes", id: "raised-liver-enzymes-on-targeted-anticancer-drugs", beside: ["ribociclib", "pazopanib", "sotorasib"], notBeside: ["pembrolizumab", "nivolumab", "gemtuzumab-ozogamicin"] },
    { group: "Lung inflammation (pneumonitis, ILD)", id: "interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs", beside: ["trastuzumab-deruxtecan", "osimertinib", "everolimus"], notBeside: ["pembrolizumab", "nivolumab", "durvalumab"] },
    { group: "Fluid retention (swelling, effusions)", id: "fluid-retention-and-effusions-on-kinase-inhibitors", beside: ["imatinib", "dasatinib", "avapritinib"], notBeside: ["belzutifan", "ivermectin", "lorlatinib"] },
    { group: "Differentiation syndrome", id: "differentiation-syndrome-recognition-and-treatment", beside: ["ivosidenib", "enasidenib", "gilteritinib", "revumenib"] },
    { group: "Capillary leak syndrome", id: "capillary-leak-syndrome-on-anticancer-drugs", beside: ["tagraxofusp", "dinutuximab"] },
    { group: "Tumour flare", id: "tumour-flare-on-bispecific-antibodies-and-immunomodulatory-drugs", beside: ["glofitamab"] },
    { group: "Constipation", id: "constipation-in-adults-with-cancer", general: true },
  ];

  it("lists the fourteen targeted-drug protocols under the groups they manage", () => {
    expect(new Set(TARGETED.map((t) => t.id)).size).toBe(14);
    for (const t of TARGETED) {
      const spec = SYMPTOM_PROTOCOLS[t.group];
      expect((t.general ? spec?.general : spec?.specific) ?? [], `${t.group}: ${t.id}`).toContain(t.id);
      // Never both: a protocol written for named treatments is not also offered to everyone with the symptom.
      expect((t.general ? spec?.specific : spec?.general) ?? [], `${t.group}: ${t.id}`).not.toContain(t.id);
    }
    // Adding to a group kept what was already there.
    expect(SYMPTOM_PROTOCOLS["Bleeding or bruising"].general).toContain("bleeding-precautions-when-platelets-are-low");
    for (const [group, id] of [["Kidney problems", "irae-nephritis"], ["High blood sugar", "irae-diabetes"], ["Thyroid changes", "irae-thyroid"], ["Liver inflammation or raised liver enzymes", "irae-hepatitis"], ["Lung inflammation (pneumonitis, ILD)", "irae-pneumonitis"]]) {
      expect(SYMPTOM_PROTOCOLS[group].specific, group).toContain(id);
    }
  });

  it("shows each of them beside the products it names and beside no other cause of the same symptom", () => {
    for (const t of TARGETED) {
      const shown = (byGroup[t.group] ?? []).find((p) => p.id === t.id);
      expect(shown, `${t.group}: ${t.id} is shown`).toBeDefined();
      if (!shown) continue;
      expect(shown.general, t.id).toBe(Boolean(t.general));
      const inGroup = new Set(rows.filter((r) => r.group === t.group).map((r) => r.drugId));
      for (const d of t.beside ?? []) expect(shown.drugs, `${t.group}: ${t.id} beside ${d}`).toContain(d);
      for (const d of t.notBeside ?? []) {
        // The product does carry the symptom, so its absence is the protocol's own list at work and not a missing row.
        expect(inGroup.has(d), `${d} has a row in ${t.group}`).toBe(true);
        expect(shown.drugs, `${t.group}: ${t.id} not beside ${d}`).not.toContain(d);
      }
      // Every product listed is one the protocol record names itself: none of the fourteen reaches a product through a shared technology.
      const rec = g.must(t.id);
      if (rec.kind === "protocol" && !t.general) for (const d of shown.drugs) expect(rec.drugs, `${t.id} names ${d}`).toContain(d);
    }
    // The immune-related protocols stay with the checkpoint inhibitors: the kinase-inhibitor thyroid row does not gain one.
    expect((byGroup["Thyroid changes"] ?? []).find((p) => p.id === "irae-thyroid")?.drugs).not.toContain("fruquintinib");
    expect((byGroup["Liver inflammation or raised liver enzymes"] ?? []).find((p) => p.id === "irae-hepatitis")?.drugs).not.toContain("ribociclib");
  });
});
