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
    // One protocol in the domain is about another kind of immunotherapy; its population says flare on checkpoint inhibitors is not covered.
    const NOT_CHECKPOINT = new Set(["tumour-flare-on-bispecific-antibodies-and-immunomodulatory-drugs"]);
    const wrong: string[] = [];
    for (const r of rows) {
      const d = g.must(r.drugId);
      if (d.kind !== "drug" || CHECKPOINT_MODALITY.test(d.modality)) continue;
      for (const id of rowProtocols(r, g)) { const p = g.must(id); if (p.kind === "protocol" && p.domain === "immunotherapy-toxicity" && !NOT_CHECKPOINT.has(id)) wrong.push(`${r.drugId}: ${r.event} -> ${id}`); }
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
    expect(forRow("datopotamab-deruxtecan", /keratitis/i)).toEqual(["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"]);
    expect(forRow("mirvetuximab-soravtansine", /keratopathy/i)).toEqual(["eye-care-with-ocular-toxic-antibody-drug-conjugates"]);
    expect(forRow("lapatinib", /diarrhoea/i)).toEqual(["treatment-induced-diarrhoea-grading-and-management"]);
    // Scalp cooling: cytotoxic chemotherapy for a solid tumour; not an antibody-drug conjugate, not a leukaemia regimen.
    expect(forRow("folfiri", /alopecia/i)).toEqual(["scalp-cooling-during-chemotherapy"]);
    expect(forRow("trastuzumab-deruxtecan", /alopecia/i)).toEqual([]);
    expect(protocolReaches(g.must("scalp-cooling-during-chemotherapy") as never, g.must("cytarabine-7-3") as never, "Alopecia", g)).toBe(false);
    // Hormone therapy and bone; aromatase inhibitor joint pain and nobody else's.
    expect(forRow("letrozole", /fracture/i)).toEqual(["bone-health-on-hormone-therapy"]);
    expect(forRow("goserelin", /bone loss/i)).toEqual(["bone-health-on-hormone-therapy"]);
    expect(forRow("letrozole", /arthralgia/i)).toEqual(["chronic-pain-in-cancer-survivors", "joint-and-muscle-pain-on-anticancer-drugs"]);
    expect(forRow("fulvestrant", /arthralgia/i)).toEqual([]);
    expect(forRow("cisplatin", /nephrotox/i)).toEqual(["renal-dose-adjustment-of-anticancer-drugs"]);
    expect(forRow("bevacizumab", /wound/i)).toEqual(["anti-vegf-drugs-around-surgery"]);
    expect(forRow("vorasidenib", /covid/i)).toEqual(["vaccination-around-cancer-treatment"]);
    expect(forRow("belzutifan", /dyspnoea/i)).toEqual(["acute-oncology-telephone-triage", "breathlessness-and-cough-during-anticancer-treatment"]);
    expect(forRow("vemurafenib", /photosens/i)).toContain("sun-protection-during-and-after-cancer-treatment");
  });

  it("reaches the targeted-drug protocols for rows that had none before they were written", () => {
    // On 16 November each of these was a named gap: no protocol in the corpus fitted. The protocols written on
    // 17 November name these products in their own `drugs`, and the row now shows that protocol and no other.
    expect(forRow("bevacizumab", /hypertension/i)).toEqual(["hypertension-and-proteinuria-on-vegf-pathway-inhibitors"]);
    expect(forRow("bevacizumab", /proteinuria/i)).toEqual(["hypertension-and-proteinuria-on-vegf-pathway-inhibitors"]);
    expect(forRow("osimertinib", /qtc/i)).toEqual(["qt-prolongation-monitoring-on-anticancer-drugs"]);
    // Lung inflammation on a drug that is not a checkpoint inhibitor: the targeted-drug protocol, never the immune-related one.
    expect(forRow("osimertinib", /interstitial lung/i)).toEqual(["interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs"]);
    expect(forRow("trastuzumab-deruxtecan", /interstitial lung/i)).toEqual(["interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs"]);
    expect(forRow("abemaciclib", /^alt/i)).toEqual(["raised-liver-enzymes-on-targeted-anticancer-drugs"]);
    expect(forRow("alpelisib", /hyperglyc/i)).toEqual(["hyperglycaemia-on-pi3k-akt-mtor-inhibitors"]);
    // Tumour flare is filed under immunotherapy toxicity and is not a checkpoint-inhibitor protocol: its four named products only.
    expect(forRow("glofitamab", /tumou?r flare/i)).toEqual(["tumour-flare-on-bispecific-antibodies-and-immunomodulatory-drugs"]);
    expect(PROTOCOL_REACH["tumour-flare-on-bispecific-antibodies-and-immunomodulatory-drugs"]).toEqual({ products: "drugs" });
  });

  it("leaves a side effect without a protocol where none in the corpus fits", () => {
    // Each of these was read against the candidate protocol and left as a gap on purpose (scripts/measure-side-effect-chain.ts --gaps).
    expect(forRow("venetoclax", /upper respiratory/i)).toEqual([]);
    // The second round's protocols name these in their own gaps: read, and no rule found for them.
    expect(forRow("tamoxifen", /cataract/i)).toEqual([]);
    expect(forRow("bemarituzumab", /corneal/i)).toEqual([]);
    expect(forRow("megestrol-progestins", /weight gain/i)).toEqual([]);
    expect(forRow("vorasidenib", /headache/i)).toEqual([]);
    // Until 25 November 2026 the example here was relacorilant. Its low-potassium row was removed on 18 November because
    // the US label's tables do not list it (CORRECTIONS.md). Lutetium-177 dotatate does carry the row, from its US label
    // (hypokalaemia 26%, grade 3 to 4 in 4%), and the low-potassium protocol's gaps say why it is not covered.
    expect(forRow("lutathera", /hypokal/i)).toEqual([]);
    expect(forRow("cretostimogene", /bladder spasm/i)).toEqual([]);
  });

  it("reaches the second round of protocols for rows that had none before they were written", () => {
    // On 17 November each of these was a named gap. The protocols written on 18 November name these products in their
    // own `drugs`, and the row now shows that protocol.
    expect(forRow("belzutifan", /hypoxia/i)).toEqual(["breathlessness-and-cough-during-anticancer-treatment"]);
    expect(forRow("sotorasib", /cough/i)).toEqual(["breathlessness-and-cough-during-anticancer-treatment"]);
    expect(forRow("acalabrutinib", /headache/i)).toEqual(["headache-on-anticancer-drugs"]);
    expect(forRow("pluvicto", /dry mouth/i)).toEqual(["dry-mouth-from-cancer-drugs-and-radionuclide-therapy"]);
    expect(forRow("olaparib", /mds/i)).toEqual(["second-cancers-after-anticancer-drug-treatment"]);
    expect(forRow("inotuzumab-ozogamicin", /veno-occlusive/i)).toEqual(["veno-occlusive-disease-on-inotuzumab-and-gemtuzumab-ozogamicin"]);
    expect(forRow("erdafitinib", /central serous/i)).toEqual(["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"]);
    expect(forRow("lorlatinib", /cognitive/i)).toEqual(["cognitive-and-mood-effects-on-lorlatinib-and-avapritinib"]);
    expect(forRow("lorlatinib", /weight gain/i)).toEqual(["raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant"]);
    expect(forRow("ifosfamide", /encephalopathy/i)).toEqual(["ifosfamide-bladder-protection-and-encephalopathy"]);
    expect(forRow("ifosfamide", /blood in the urine/i)).toEqual(["ifosfamide-bladder-protection-and-encephalopathy"]);
    expect(forRow("bcg-intravesical", /bcg infection/i)).toEqual(["bladder-symptoms-and-infection-after-intravesical-therapy"]);
    expect(forRow("asciminib", /pancreatic enzyme/i)).toEqual(["pancreatitis-and-raised-pancreatic-enzymes-on-targeted-drugs"]);
    expect(forRow("lutathera", /lymphopenia/i)).toEqual(["blood-count-and-kidney-monitoring-during-radioligand-therapy"]);
    // The heart rows of HER2-targeted drugs gain the product rules beside the general surveillance protocol.
    expect(forRow("trastuzumab", /lvef/i)).toEqual(["cardio-oncology-risk-assessment-and-cardiac-surveillance", "left-ventricular-dysfunction-on-her2-targeted-drugs"]);
    // The event patterns of the second round: low potassium is not high potassium or low magnesium, and so on.
    const kpo = PROTOCOL_REACH["low-potassium-and-low-phosphate-on-anticancer-drugs"].event as RegExp;
    expect(["Hypokalaemia", "Hypokalaemia (potassium decreased, laboratory)", "Hypophosphataemia"].every((e) => kpo.test(e))).toBe(true);
    expect(["Hyperkalaemia", "Hyperphosphataemia", "Hypomagnesaemia", "Hypoalbuminaemia (albumin decrease, laboratory)", "Hypercholesterolaemia"].some((e) => kpo.test(e))).toBe(false);
    const lipids = PROTOCOL_REACH["raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant"].event as RegExp;
    expect(["Hypercholesterolaemia", "Hypertriglyceridaemia", "Weight gain"].every((e) => lipids.test(e))).toBe(true);
    expect(["Hypokalaemia", "Weight loss", "Cognitive and mood effects", "Peripheral oedema"].some((e) => lipids.test(e))).toBe(false);
    const msk = PROTOCOL_REACH["joint-and-muscle-pain-on-anticancer-drugs"].event as RegExp;
    expect(["Arthralgia", "Myalgia/arthralgia", "Muscle cramps", "Increased CPK", "Creatine kinase (CPK) increased"].every((e) => msk.test(e))).toBe(true);
    expect(["Musculoskeletal pain", "Muscle twitching", "Rhabdomyolysis"].some((e) => msk.test(e))).toBe(false);
    const bladder = PROTOCOL_REACH["bladder-symptoms-and-infection-after-intravesical-therapy"].event as RegExp;
    expect(["BCG infection or sepsis", "Urinary tract infection", "Bladder spasm", "Micturition urgency", "Dysuria", "Haematuria", "Urinary frequency"].every((e) => bladder.test(e))).toBe(true);
    expect(["Upper respiratory infection", "Pneumonia", "Fever", "Infection"].some((e) => bladder.test(e))).toBe(false);
  });

  it("reaches a syndrome's protocol from the one blood result its steps manage, on its own products", () => {
    // Listed on 25 November 2026. Each protocol gives the rule for the result: hydroxyurea for a white cell count that
    // rises on a differentiating drug, held doses and intravenous albumin for an albumin that falls on tagraxofusp.
    const DS = "differentiation-syndrome-recognition-and-treatment";
    const CLS = "capillary-leak-syndrome-on-anticancer-drugs";
    expect(forRow("ivosidenib", /^leukocytosis/i)).toEqual([DS]);
    expect(forRow("tagraxofusp", /hypoalbumin/i)).toEqual([CLS]);
    // The rows they already reached are unchanged.
    expect(forRow("ivosidenib", /differentiation syndrome/i)).toEqual([DS]);
    expect(forRow("dinutuximab", /capillary leak/i)).toEqual([CLS]);
    // Near misses on the same products: a low count, a liver enzyme and a low potassium are not their subject.
    expect(forRow("ivosidenib", /^neutropenia/i)).not.toContain(DS);
    expect(forRow("tagraxofusp", /^alt\b/i)).toEqual([]);
    expect(forRow("dinutuximab", /hypokal/i)).toEqual(["low-potassium-and-low-phosphate-on-anticancer-drugs"]);
    // Near misses in the same group: every other product's blood chemistry row stays clear of both.
    const group = "Blood chemistry or blood count changes (other)";
    const shown = (id: string) => (byGroup[group] ?? []).find((p) => p.id === id)?.drugs;
    expect(shown(DS)).toEqual(["ivosidenib"]);
    expect(shown(CLS)).toEqual(["tagraxofusp"]);
    // Whatever either reaches, in any group, is a product its own record names.
    for (const id of [DS, CLS]) {
      expect(PROTOCOL_REACH[id].products, id).toBe("drugs");
      const rec = g.must(id);
      for (const r of rows) if (rowProtocols(r, g).includes(id)) expect(rec.kind === "protocol" && rec.drugs.includes(r.drugId), `${id} names ${r.drugId}`).toBe(true);
    }
    // The event patterns: a raised white count is not a low one, and is not hyperleukocytosis at diagnosis.
    const ds = PROTOCOL_REACH[DS].event as RegExp;
    expect(["Differentiation syndrome", "Leukocytosis", "Noninfectious leukocytosis"].every((e) => ds.test(e))).toBe(true);
    expect(["Leukocytes decreased", "Leukopenia", "Hyperleukocytosis", "Lymphocytosis", "Neutropenia", "Tumour lysis syndrome"].some((e) => ds.test(e))).toBe(false);
    // A low albumin is not another low blood salt, protein in the urine, or the swelling and low blood pressure that go with a leak.
    const cls = PROTOCOL_REACH[CLS].event as RegExp;
    expect(["Capillary leak syndrome", "Hypoalbuminaemia (albumin decrease, laboratory)", "Hypoalbuminemia"].every((e) => cls.test(e))).toBe(true);
    expect(["Hypokalaemia", "Hypocalcaemia", "Albuminuria", "Peripheral oedema", "Hypotension", "Anastomotic leak"].some((e) => cls.test(e))).toBe(false);
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

  // The sixteen protocols of the second round (18 November 2026), pinned the same way.
  const SECOND_ROUND: typeof TARGETED = [
    { group: "Headache", id: "headache-on-anticancer-drugs", beside: ["acalabrutinib", "blinatumomab", "talazoparib", "trastuzumab-emtansine"], notBeside: ["vorasidenib", "intismeran-autogene", "ivermectin", "optune", "pylarify"] },
    { group: "Muscle or joint pain", id: "joint-and-muscle-pain-on-anticancer-drugs", beside: ["letrozole", "paclitaxel", "ibrutinib", "imatinib", "vimseltinib"], notBeside: ["fulvestrant", "intismeran-autogene", "ivermectin", "optune"] },
    { group: "Blood chemistry or blood count changes (other)", id: "low-potassium-and-low-phosphate-on-anticancer-drugs", beside: ["quizartinib", "nirogacestat", "dinutuximab"], notBeside: ["lutathera", "ivosidenib", "tagraxofusp", "lorlatinib", "cetuximab", "erdafitinib"] }, // ivosidenib since 25 November 2026: relacorilant, here before, lost its only row in this group on 18 November (CORRECTIONS.md)
    { group: "Blood chemistry or blood count changes (other)", id: "raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant", beside: ["lorlatinib", "elacestrant"], notBeside: ["quizartinib", "nirogacestat", "cetuximab", "ivosidenib"] },
    { group: "Weight gain", id: "raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant", beside: ["lorlatinib"], notBeside: ["megestrol-progestins"] },
    { group: "Memory, thinking or mood changes", id: "cognitive-and-mood-effects-on-lorlatinib-and-avapritinib", beside: ["lorlatinib", "avapritinib"] },
    { group: "Taste changes", id: "taste-changes-during-cancer-treatment", general: true },
    { group: "Dry mouth", id: "dry-mouth-from-cancer-drugs-and-radionuclide-therapy", beside: ["pluvicto", "radioactive-iodine", "futibatinib", "selpercatinib", "ac225-psma"] },
    { group: "Breathlessness or cough", id: "breathlessness-and-cough-during-anticancer-treatment", beside: ["belzutifan", "dasatinib", "pazopanib", "sotorasib", "atezolizumab", "durvalumab"] },
    { group: "Bladder symptoms", id: "bladder-symptoms-and-infection-after-intravesical-therapy", beside: ["bcg-intravesical", "nadofaragene-firadenovec", "nogapendekin-alfa", "tar-200"], notBeside: ["ifosfamide", "cretostimogene"] },
    { group: "Bladder symptoms", id: "ifosfamide-bladder-protection-and-encephalopathy", beside: ["ifosfamide"], notBeside: ["bcg-intravesical", "tar-200", "cretostimogene"] },
    { group: "Infections", id: "bladder-symptoms-and-infection-after-intravesical-therapy", beside: ["bcg-intravesical", "tar-200"], notBeside: ["venetoclax", "zanubrutinib", "durvalumab", "gemtuzumab-ozogamicin", "blinatumomab"] },
    { group: "Confusion or brain effects (neurotoxicity, ICANS)", id: "ifosfamide-bladder-protection-and-encephalopathy", beside: ["ifosfamide"], notBeside: ["ivermectin", "tarlatamab", "blinatumomab"] },
    { group: "Second cancers", id: "second-cancers-after-anticancer-drug-treatment", beside: ["olaparib", "niraparib", "lutathera", "vemurafenib", "encorafenib", "ripretinib", "tamoxifen", "lenalidomide", "ciltacabtagene-autoleucel"] },
    { group: "Liver inflammation or raised liver enzymes", id: "veno-occlusive-disease-on-inotuzumab-and-gemtuzumab-ozogamicin", beside: ["inotuzumab-ozogamicin", "gemtuzumab-ozogamicin"], notBeside: ["ribociclib", "pembrolizumab", "lutathera", "ivermectin"] },
    { group: "Liver inflammation or raised liver enzymes", id: "blood-count-and-kidney-monitoring-during-radioligand-therapy", beside: ["lutathera"], notBeside: ["ribociclib", "pembrolizumab", "inotuzumab-ozogamicin", "ivermectin"] },
    { group: "Low lymphocytes (lymphopenia)", id: "blood-count-and-kidney-monitoring-during-radioligand-therapy", beside: ["lutathera", "pluvicto"], notBeside: ["ribociclib", "ryz101"] },
    { group: "Low red cells (anaemia)", id: "blood-count-and-kidney-monitoring-during-radioligand-therapy", beside: ["pluvicto"], notBeside: ["ac225-psma"] },
    { group: "Low platelets (thrombocytopenia)", id: "blood-count-and-kidney-monitoring-during-radioligand-therapy", beside: ["pluvicto"], notBeside: ["ac225-psma"] },
    { group: "Eye problems", id: "retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors", beside: ["erdafitinib", "pemigatinib", "camizestrant", "datopotamab-deruxtecan"], notBeside: ["tamoxifen", "bemarituzumab", "mirvetuximab-soravtansine", "belantamab-mafodotin"] },
    { group: "Pancreas inflammation or raised pancreatic enzymes", id: "pancreatitis-and-raised-pancreatic-enzymes-on-targeted-drugs", beside: ["asciminib", "ponatinib"] },
    { group: "Heart muscle weakness or inflammation", id: "left-ventricular-dysfunction-on-her2-targeted-drugs", beside: ["trastuzumab", "pertuzumab", "trastuzumab-emtansine", "zanidatamab", "margetuximab"], notBeside: ["doxorubicin", "carfilzomib", "osimertinib"] },
  ];

  it("lists the sixteen second-round protocols under the groups they manage, each with a reach of its own products", () => {
    expect(new Set(SECOND_ROUND.map((t) => t.id)).size).toBe(16);
    for (const t of SECOND_ROUND) {
      const spec = SYMPTOM_PROTOCOLS[t.group];
      expect((t.general ? spec?.general : spec?.specific) ?? [], `${t.group}: ${t.id}`).toContain(t.id);
      expect((t.general ? spec?.specific : spec?.general) ?? [], `${t.group}: ${t.id}`).not.toContain(t.id);
      // A specific one reaches the products its own `drugs` list names, never a shared technology.
      if (!t.general) expect(PROTOCOL_REACH[t.id]?.products, t.id).toBe("drugs");
    }
    // Adding to a group kept what was already there.
    for (const [group, id] of [["Muscle or joint pain", "chronic-pain-in-cancer-survivors"], ["Breathlessness or cough", "acute-oncology-telephone-triage"], ["Eye problems", "eye-care-with-ocular-toxic-antibody-drug-conjugates"], ["Liver inflammation or raised liver enzymes", "raised-liver-enzymes-on-targeted-anticancer-drugs"], ["Infections", "bispecific-step-up-dosing"], ["Blood chemistry or blood count changes (other)", "hyperphosphataemia-on-fgfr-inhibitors"]]) {
      expect(SYMPTOM_PROTOCOLS[group].specific, group).toContain(id);
    }
    expect(SYMPTOM_PROTOCOLS["Heart muscle weakness or inflammation"].general).toContain("cardio-oncology-risk-assessment-and-cardiac-surveillance");
  });

  it("shows each second-round protocol beside the products it names and beside no other cause of the same symptom", () => {
    for (const t of SECOND_ROUND) {
      const shown = (byGroup[t.group] ?? []).find((p) => p.id === t.id);
      expect(shown, `${t.group}: ${t.id} is shown`).toBeDefined();
      if (!shown) continue;
      expect(shown.general, t.id).toBe(Boolean(t.general));
      const inGroup = new Set(rows.filter((r) => r.group === t.group).map((r) => r.drugId));
      for (const d of t.beside ?? []) expect(shown.drugs, `${t.group}: ${t.id} beside ${d}`).toContain(d);
      for (const d of t.notBeside ?? []) {
        expect(inGroup.has(d), `${d} has a row in ${t.group}`).toBe(true);
        expect(shown.drugs, `${t.group}: ${t.id} not beside ${d}`).not.toContain(d);
      }
      const rec = g.must(t.id);
      if (rec.kind === "protocol" && !t.general) for (const d of shown.drugs) expect(rec.drugs, `${t.id} names ${d}`).toContain(d);
    }
    // The liver and fluid protocols extended on 18 November reach the products added to their own lists, and no more.
    const liver = (byGroup["Liver inflammation or raised liver enzymes"] ?? []).find((p) => p.id === "raised-liver-enzymes-on-targeted-anticancer-drugs")?.drugs ?? [];
    for (const d of ["gilteritinib", "olutasidenib", "enasidenib", "zynlonta"]) expect(liver, d).toContain(d);
    for (const d of ["inotuzumab-ozogamicin", "gemtuzumab-ozogamicin", "lutathera"]) expect(liver, d).not.toContain(d);
    const fluid = (byGroup["Fluid retention (swelling, effusions)"] ?? []).find((p) => p.id === "fluid-retention-and-effusions-on-kinase-inhibitors")?.drugs ?? [];
    for (const d of ["vimseltinib", "telisotuzumab-vedotin"]) expect(fluid, d).toContain(d);
    expect(fluid).not.toContain("zynlonta");
  });

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

