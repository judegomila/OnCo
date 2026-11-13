import { protocol } from "./helpers";

/*
 * Choosing the venous access device for anticancer treatment: an implanted port, a PICC, a tunnelled central line or a
 * peripheral cannula.
 *
 * What was read, and how (all on 11 November 2026, raw text in scratch directories):
 * - CAVA randomised trial (Moss et al., Lancet 2021): abstract, Europe PMC.
 * - MAGIC-ONC, the Michigan Appropriateness Guide for Intravenous Catheters in Adult Patients With Cancer (Major et al.,
 *   Ann Intern Med 2025): abstract only, Europe PMC; the full appropriateness tables were not read.
 * - ITAC 2022 international clinical practice guidelines on cancer-associated thrombosis (Farge et al., Lancet Oncol
 *   2022, PMC9236567): full text; its recommendations on catheter-related thrombosis prophylaxis.
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (Sousa et al., Ann Oncol 2015): full text,
 *   Internet Archive capture of academic.oup.com.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text with
 * line breaks joined; where a sentence carries an inline reference, the quote stops before it.
 */
export const venousAccessDeviceSelectionForAnticancerTherapy = protocol({
  id: "venous-access-device-selection-for-anticancer-therapy",
  name: "Choosing a venous access device for anticancer treatment: port, PICC, tunnelled line or cannula",
  aka: ["port or PICC", "PICC versus port", "Hickman versus port", "choice of central line for chemotherapy", "vascular access device selection", "CAVA trial", "MAGIC-ONC"],
  domain: "vascular-access",
  tldr: "If you need many months of treatment into a vein, a central line saves repeated needles. For most people with solid tumours, a randomised trial found an implanted port under the skin had fewer problems than a PICC in the arm or a tunnelled line in the chest. For urgent treatment of leukaemia and similar cancers, a PICC or tunnelled line with two channels may suit better.",
  simple: "For long treatment, a port under the skin usually causes fewer problems than a PICC or a line in the chest. Ask which device you will have and why.",
  summary: "The CAVA trial (UK, 1061 adults, 2021) compared Hickman-type tunnelled catheters, PICCs and implanted ports for at least 12 weeks of anticancer therapy. Ports had fewer complications (a composite of infection, venous thrombosis, pulmonary embolus, inability to aspirate, mechanical failure and others) than Hickman lines (29% against 43%, OR 0.54) and than PICCs (32% against 47%, OR 0.52); PICCs and Hickman lines had similar rates, with non-inferiority not confirmed. The authors concluded that most patients receiving anticancer therapy for solid tumours should receive a port in the NHS.\n\nMAGIC-ONC (2025, RAND/UCLA appropriateness method, 1422 scenarios) rated a single-lumen tunnelled CVC or a port appropriate for chemotherapy for solid tumours regardless of intensity, urgency or duration, and a double-lumen PICC or tunnelled CVC appropriate for urgent chemotherapy in acute haematological cancers; in advanced chronic kidney disease it advises coordinating with a nephrologist to preserve veins. ITAC (2022) suggests ports over PICCs where a central line is needed (guidance) and right-sided jugular insertion with the tip at the cavoatrial junction (1B). ESMO (2015) notes that PICCs' main limitation is shorter longevity from a higher risk of thrombosis and advises avoiding the femoral vein [I, A].",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "Adults starting intravenous anticancer treatment expected to last weeks to months. CAVA enrolled adults receiving at least 12 weeks of treatment for solid or haematological cancers in UK oncology units. Children, people needing apheresis or transplant lines, and dialysis patients have other considerations.",
  trigger: "A course of intravenous anticancer treatment is planned, or peripheral veins are becoming hard to use.",
  steps: [
    {
      action: "Plan the device before treatment starts, taking into account the cancer type, how urgent treatment is, how long the device must stay in and the person's other conditions",
      why: "The best device differs between an urgent leukaemia course and months of outpatient treatment for a solid tumour.",
      source: "magic-onc-2025",
      quote: "Appropriateness of VAD selection varied by type of cancer, treatment urgency, and planned dwell time.",
    },
    {
      action: "For most people with solid tumours needing central access, offer an implanted port",
      why: "In a randomised trial ports had about a third fewer complications than PICCs or tunnelled lines.",
      source: "cava-2021",
      quote: "For most patients receiving SACT, PORTs are more effective and safer than both Hickman and PICCs.",
    },
    {
      action: "For urgent chemotherapy in acute leukaemia and similar cancers, consider a double-lumen PICC or tunnelled central line",
      why: "These can be placed quickly and give two channels for chemotherapy, blood products and antibiotics at the same time.",
      source: "magic-onc-2025",
      quote: "For patients with acute hematologic cancers requiring urgent chemotherapy, placement of a double-lumen peripherally inserted central catheter (PICC) or a tunneled central venous catheter (CVC) was rated as appropriate, regardless of treatment intensity or infusate characteristics.",
    },
    {
      action: "Where a central line is needed, prefer a port to a PICC, inserted on the right in the jugular vein with the tip at the junction of the superior vena cava and right atrium",
      why: "PICCs in the arm are more prone to clots, and the right jugular route with a correctly placed tip lowers clot risk.",
      source: "itac-2022",
      quote: "Catheters should be inserted on the right side, in the jugular vein, and the distal extremity of the central catheter should be located at the junction of the superior vena cava and the right atrium (grade 1B).",
      grade: "1B",
    },
    {
      action: "Avoid the femoral vein unless the other sites cannot be used",
      why: "Lines in the groin carry more infection and clot risk.",
      source: "esmo-2015",
      quote: "There is insufficient evidence to recommend a specific insertion site, but the femoral vein should be avoided unless there is a contraindication to the other sites (e.g. SVC syndrome), due to the increased risk of infection and concerns about thrombosis [I, A]",
      grade: "[I, A]",
    },
    {
      action: "In advanced chronic kidney disease, involve a kidney specialist before placing a PICC or line, to protect veins needed for dialysis",
      why: "Arm veins used for a PICC may be needed later for dialysis access.",
      source: "magic-onc-2025",
      quote: "In patients with advanced chronic kidney disease, coordination of care with a nephrologist to ensure vein preservation in the context of cancer prognosis was recommended.",
    },
  ],
  bestInClass: {
    statement: "For solid tumours needing central access, an implanted port: the CAVA randomised trial found fewer complications than with PICCs or Hickman lines, ITAC (2022) suggests ports over PICCs (guidance), and MAGIC-ONC (2025) rates a port or single-lumen tunnelled line appropriate. For urgent treatment of acute haematological cancers, a double-lumen PICC or tunnelled line (MAGIC-ONC). Right-sided jugular insertion with the tip at the cavoatrial junction (ITAC 1B); avoid the femoral vein (ESMO [I, A]). The sources agree in direction; MAGIC-ONC rates the tunnelled line alongside the port for solid tumours, while CAVA found ports superior to Hickman lines.",
    sources: ["cava-2021", "magic-onc-2025", "itac-2022", "esmo-2015"],
  },
  variants: [
    {
      name: "PICC as the default device",
      differs: "Places a PICC for most courses because it is quick, done by nurses at the bedside and needs no surgery.",
      evidence: "CAVA: PICCs had more complications than ports (47% against 32%, OR 0.52 for ports) and similar rates to Hickman lines; ESMO 2015 notes their shorter longevity from higher thrombosis risk; ITAC suggests ports over PICCs. The trial abstract does not report patient preference or waiting times, which can favour PICCs in practice.",
      sources: ["cava-2021", "esmo-2015", "itac-2022"],
    },
  ],
  grades: [
    { claim: "Ports superior to Hickman lines for complications", grade: "Randomised trial result (OR 0.54, 95% CI 0.37 to 0.77)", source: "cava-2021", quote: "PORTs were superior to Hickman with a complication rate of 29% (73 of 253) versus 43% (131 of 303; OR 0·54 [95% CI 0·37-0·77])." },
    { claim: "Ports superior to PICCs for complications", grade: "Randomised trial result (OR 0.52, 95% CI 0.33 to 0.83)", source: "cava-2021", quote: "PORTs were superior to PICCs with a complication rate of 32% (47 of 147) versus 47% (93 of 199; OR 0·52 [0·33-0·83])." },
    { claim: "Ports suggested over PICCs where a central line is needed", grade: "guidance", source: "itac-2022", quote: "In patients requiring central venous catheters, we suggest the use of implanted ports over peripherally inserted central catheter lines (guidance)." },
    { claim: "Solid tumours: single-lumen tunnelled CVC or port appropriate for chemotherapy", grade: "Rated appropriate (RAND/UCLA)", source: "magic-onc-2025", quote: "For patients with malignant solid tumors, a single-lumen tunneled CVC or implanted port was rated as appropriate for delivering chemotherapy, regardless of treatment intensity, urgency, or duration." },
  ],
  sources: [
    {
      key: "cava-2021",
      label: "Central venous access devices for the delivery of systemic anticancer therapy (CAVA): a randomised controlled trial",
      publisher: "The Lancet (Moss et al.)",
      year: 2021,
      url: "https://doi.org/10.1016/S0140-6736(21)00766-2",
      doi: "10.1016/S0140-6736(21)00766-2",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "magic-onc-2025",
      label: "The Michigan Appropriateness Guide for Intravenous Catheters in Adult Patients With Cancer (MAGIC-ONC): Results From a Multispecialty Panel Using the RAND/UCLA Appropriateness Method",
      publisher: "Annals of Internal Medicine (Major et al.)",
      year: 2025,
      url: "https://doi.org/10.7326/ANNALS-25-02523",
      doi: "10.7326/ANNALS-25-02523",
      gradingScheme: "RAND/UCLA appropriateness method: each scenario rated appropriate, neutral or uncertain, or inappropriate by a 9-member panel.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "itac-2022",
      label: "2022 international clinical practice guidelines for the treatment and prophylaxis of venous thromboembolism in patients with cancer, including patients with COVID-19",
      publisher: "International Initiative on Thrombosis and Cancer (ITAC), endorsed by the ISTH (Lancet Oncology, Farge et al.)",
      year: 2022,
      url: "https://doi.org/10.1016/S1470-2045(22)00160-7",
      doi: "10.1016/S1470-2045(22)00160-7",
      gradingScheme: "GRADE: evidence A (high) to D (very low); recommendation grade 1 (strong) or 2 (weak); 'guidance' (best clinical practice) where there is no clear evidence, based on expert consensus.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "esmo-2015",
      label: "Central venous access in oncology: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology, Sousa et al.)",
      year: 2015,
      url: "https://doi.org/10.1093/annonc/mdv296",
      doi: "10.1093/annonc/mdv296",
      gradingScheme: "[level, grade]: levels I (large good-quality RCT or meta-analysis) to V (no control group, case reports, expert opinion); grades A (strongly recommended) to E (never recommended), adapted from the IDSA/USPHS system.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["implanted-ports", "picc-lines", "infusion-devices-vascular-access"],
  terms: ["central-venous-access"],
  related: ["implanted-port-access-and-care", "picc-and-tunnelled-line-care", "catheter-related-thrombosis-in-cancer"],
  upgrades: [],
  gaps: [
    "CAVA and MAGIC-ONC were read as abstracts only; CAVA's subgroup results (haematological cancers, treatment mode) and MAGIC-ONC's full appropriateness tables, including when a peripheral cannula or midline is appropriate, were not read.",
    "When a peripheral cannula is enough, and whether midlines have any role for anticancer drugs, are not settled by the sources read here.",
    "The INS Infusion Therapy Standards of Practice (2024), which address device selection, could not be read.",
    "The ESMO guideline on venous access dates from 2015.",
  ],
});
