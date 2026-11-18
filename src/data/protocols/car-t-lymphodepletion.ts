import { protocol } from "./helpers";
import { EBMT_2019, EBMT_2022, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Lymphodepleting chemotherapy before CAR T-cell infusion: checks before starting, the regimen, and when to delay or
 * repeat it.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - EBMT/JACIE 2019 best practice recommendations: full text (PMC7012497), lymphodepleting conditioning section.
 * - SITC 2020 immune effector cell guideline: full text (baseline and infection sections).
 * - US prescribing information for YESCARTA (axicabtagene ciloleucel), revised 07/2026, and KYMRIAH
 *   (tisagenlecleucel), revised 6/2025: PDFs from fda.gov, converted with pdftotext and read in the dosing and warnings
 *   sections. The label is the source for each product's regimen and dose.
 * - EBMT/JACIE/EHA 2022: abstract only (./cell-therapy-sources.ts).
 *
 * Second accuracy pass, 17 November 2026. Every claim was re-read against raw text:
 * - Both US labels were fetched again from fda.gov (PDF, pdftotext). They are still the 07/2026 and 6/2025 revisions.
 *   The DailyMed copies (YESCARTA version 23, KYMRIAH version 19 dated 26 October 2026) were also fetched as SPL XML;
 *   their lymphodepletion, delay and vaccine wording is the same.
 * - EBMT/JACIE 2019 and SITC 2020: the Europe PMC full-text XML another checker saved on 16 November was re-used. The
 *   open Haematologica PDF was fetched as well, and with pdftotext its Tables 5A and 5B, which are images in the XML,
 *   now read as text. They add the checklist items used below and a disagreement with the label on omitting
 *   lymphodepletion.
 * - Newly read: the European product information (SmPC) for Kymriah and Yescarta, PDFs from ema.europa.eu, and a US
 *   fludarabine label (Fresenius Kabi, DailyMed SPL XML) for the kidney dose rule.
 * - EBMT/JACIE/EHA 2022 was not retried: sibling checkers found the publisher returning 403 on 16 November.
 * Quotes were checked by script against the raw text (whitespace and line-break hyphenation only; XML tags stripped).
 * Table cells quoted from EBMT 2019 were checked against the PDF text in reading order.
 */
export const carTLymphodepletion = protocol({
  id: "car-t-lymphodepletion",
  name: "Lymphodepleting chemotherapy before CAR T-cell infusion",
  aka: ["lymphodepletion", "LD chemotherapy", "Flu/Cy", "fludarabine and cyclophosphamide conditioning", "lymphodepleting conditioning"],
  domain: "cell-therapy-toxicity",
  tldr: "A few days before CAR T cells are given, a short course of chemotherapy, usually fludarabine and cyclophosphamide, lowers your own white cells to make room for the CAR T cells to grow. The team first checks that your CAR T cells are ready and that you have no uncontrolled infection. The doses and timing follow the instructions for your product.",
  simple: "Before CAR T cells, you have a few days of chemotherapy to make space for them. It starts only when your cells are ready and any infection is under control.",
  summary: "EBMT/JACIE 2019: lymphodepletion creates a favourable environment for CAR T-cell expansion and survival; fludarabine-cyclophosphamide is the most widely used regimen, usually on a 3 to 5 day schedule before infusion, with admission unless the centre has a safe outpatient pathway. Its checklist before starting: the product is on site (exceptional situations aside), active infection is excluded or under control, AST and ALT are below 5 times the upper limit of normal, and creatinine clearance is above 30 mL/min, with drug doses modified to it. SITC 2020: no lymphodepletion while a suspected fungal infection is uncontrolled. If more than about 3 weeks pass between the end of lymphodepletion and infusion and the white count is above 1.0 x 10^9/L, EBMT says to consider repeating it; SITC 2020 says consider repeating after 4 weeks. The European product information is firmer: re-treat after more than 4 weeks if the white count is above 1,000 cells per microlitre (Kymriah), or give it again after more than 2 weeks (Yescarta).\n\nThe regimen and dose come from each product's label. YESCARTA (axicabtagene ciloleucel, US label revised 07/2026): cyclophosphamide 500 mg/m2 and fludarabine 30 mg/m2 intravenously on days 5, 4 and 3 before infusion. KYMRIAH (tisagenlecleucel, US label revised 6/2025): for adult DLBCL and follicular lymphoma, fludarabine 25 mg/m2 and cyclophosphamide 250 mg/m2 daily for 3 days, with bendamustine 90 mg/m2 for 2 days as the alternative after grade 4 haemorrhagic cystitis or cyclophosphamide resistance, infusion 2 to 11 days (DLBCL) or 2 to 6 days (follicular lymphoma) after the chemotherapy ends, and lymphodepletion may be omitted if the white count is under 1 x 10^9/L in the week before; for children and young adults with B-ALL, fludarabine 30 mg/m2 for 4 days and cyclophosphamide 500 mg/m2 for 2 days, infusion 2 to 14 days after. Both labels: confirm the product is available before starting; live vaccines are not recommended for at least 6 weeks before lymphodepletion. Neither label gives a kidney dose rule for the chemotherapy. A US fludarabine label, written for its licensed use in chronic lymphocytic leukaemia, reduces the dose by 20% at a creatinine clearance of 30 to 70 mL/min/1.73 m2 and says not to give it below 30.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist"],
    where: ["ward", "chemotherapy-day-unit"],
  },
  population: "Adults with large B-cell or follicular lymphoma, and children and young adults up to 25 with B-cell ALL, receiving axicabtagene ciloleucel or tisagenlecleucel, the two products whose labels were read. Regimens and doses differ by product and indication; other CAR T-cell products, including those for myeloma, have their own instructions, which were not read.",
  trigger: "The CAR T-cell product has been manufactured and an infusion date is set.",
  steps: [
    {
      action: "Confirm the CAR T-cell product is available before starting lymphodepletion",
      why: "Both US labels give this instruction without a reason. The tisagenlecleucel label reports manufacturing failure in up to 9% of attempts, and EBMT 2019 advises starting only once the product is on site, apart from exceptional situations.",
      source: "yescarta-label-2026",
      quote: "Confirm availability of YESCARTA prior to starting the lymphodepleting regimen.",
    },
    {
      action: "Treat any active infection and have it under control before lymphodepletion",
      why: "EBMT expects the cytokines released after CAR T cells to make inflammation worse, and its checklist lists active infection as a contraindication to lymphodepletion.",
      source: "ebmt-2019",
      quote: "Active infections should be fully treated and under control prior to the administration of LD conditioning and the infusion of CAR T-cell products, especially given the likely cytokine-driven exacerbation of inflammatory processes.",
    },
    {
      action: "Do not give lymphodepletion while a suspected fungal infection is uncontrolled; start antifungals first",
      why: "Lymphodepletion suppresses the immune system, which SITC describes as an expected effect of the treatment.",
      source: "sitc-iec-2020",
      quote: "If a fungal infection is suspected, lymphodepleting chemotherapy should not be administered until appropriate antifungals have been initiated and fungal infection is controlled.",
    },
    {
      action: "Avoid live vaccines for at least 6 weeks before lymphodepletion starts",
      why: "The labels say the safety of live vaccines during or after the treatment has not been studied.",
      source: "yescarta-label-2026",
      quote: "Vaccination with live virus vaccines is not recommended for at least 6 weeks prior to the start of lymphodepleting chemotherapy, during YESCARTA treatment, and until immune recovery following treatment with YESCARTA.",
    },
    {
      action: "Review blood tests before starting, including kidney function, and adjust the chemotherapy doses to creatinine clearance",
      why: "EBMT's checklist asks for a creatinine clearance above 30 mL/min and AST and ALT below 5 times the upper limit of normal. A US fludarabine label says about 40% of the drug's clearance is through the kidneys.",
      source: "ebmt-2019",
      quote: "Modify drugs doses according to creatinine clearance",
    },
    {
      action: "Use the regimen in the product's label; fludarabine with cyclophosphamide is the most widely used",
      why: "In one trial of 30 people with B-ALL, this combination was linked to longer CAR T-cell persistence and better disease-free survival than cyclophosphamide alone or with etoposide.",
      source: "ebmt-2019",
      quote: "Fludarabine-cyclophosphamide is the most widely used LD conditioning regimen.",
    },
    {
      action: "For axicabtagene ciloleucel, give cyclophosphamide 500 mg/m2 and fludarabine 30 mg/m2 intravenously on days 5, 4 and 3 before infusion",
      why: "The doses and days differ between products, so each label sets its own.",
      source: "yescarta-label-2026",
      quote: "Administer a lymphodepleting chemotherapy regimen of cyclophosphamide 500 mg/m2 intravenously and fludarabine 30 mg/m2 intravenously on the fifth, fourth, and third day before infusion of YESCARTA.",
    },
    {
      action: "For tisagenlecleucel, give the regimen for the indication and infuse within the label's window after it ends: 2 to 14 days in B-ALL, 2 to 11 days in DLBCL, 2 to 6 days in follicular lymphoma (US label)",
      why: "The label sets a different regimen and a different window for each disease; the doses are in the summary above.",
      source: "kymriah-label-2025",
      quote: "Infuse KYMRIAH 2 to 14 days after completion of the lymphodepleting chemotherapy.",
    },
    {
      action: "Admit for lymphodepletion unless the centre has an established, safe outpatient pathway",
      why: "Close monitoring and good hydration are needed during these days.",
      source: "ebmt-2019",
      quote: "If the center does not have established policies and infrastructure to allow for safe outpatient-based administration, hospitalization is recommended during this period to ensure close monitoring and optimal hydration.",
    },
    {
      action: "For tisagenlecleucel, delay the infusion if there are unresolved serious reactions to earlier chemotherapy, active uncontrolled infection, active GVHD or worsening leukaemia after lymphodepletion",
      why: "The label repeats this instruction in its section on cytokine release syndrome. The European product information for both products lists similar reasons to delay.",
      source: "kymriah-label-2025",
      quote: "Delay the infusion of KYMRIAH if a patient has unresolved serious adverse reactions (including pulmonary reactions, cardiac reactions, or hypotension) from preceding chemotherapies, active uncontrolled infection, active graft versus host disease (GVHD), or worsening of leukemia burden following lymphodepleting chemotherapy",
    },
    {
      action: "If more than about 3 weeks pass between the end of lymphodepletion and the infusion and the white count is above 1.0 x 10^9/L, consider repeating lymphodepletion",
      why: "EBMT says lymphodepletion helps CAR T cells partly through a lack of competition from the person's own T cells. The quoted threshold is 1.0 x 10^9/L; the superscript is lost in the raw text.",
      source: "ebmt-2019",
    },
  ],
  bestInClass: {
    statement: "For the regimen and dose, the product's own label is the authority, and labels differ (fludarabine 30 mg/m2 with cyclophosphamide 500 mg/m2 for three days for axicabtagene ciloleucel; fludarabine 25 mg/m2 with cyclophosphamide 250 mg/m2 for three days, or bendamustine, for tisagenlecleucel in lymphoma). For the checks around it, EBMT/JACIE 2019 is the fullest source read: product on site, infection excluded or controlled, blood tests reviewed, and admission unless a safe outpatient pathway exists. SITC 2020 adds the rule on suspected fungal infection. The sources differ on two points. On repeating lymphodepletion after a delay: EBMT says consider it after more than 3 weeks with a white count above 1.0 x 10^9/L; SITC says consider it after 4 weeks; the European Kymriah product information says the patient should be re-treated after more than 4 weeks if the white count is above 1,000 cells per microlitre; the European Yescarta product information says it must be given again after more than 2 weeks. On omitting it when counts are already low: the tisagenlecleucel label allows this, while EBMT 2019 recommends lymphodepletion for all patients regardless of white count. Neither guideline grades these points. The 2022 EBMT/JACIE/EHA update was read only as an abstract.",
    sources: ["yescarta-label-2026", "kymriah-label-2025", "ebmt-2019", "sitc-iec-2020", "kymriah-smpc-eu", "yescarta-smpc-eu", "ebmt-eha-2022"],
  },
  variants: [
    {
      name: "Bendamustine instead of fludarabine-cyclophosphamide (tisagenlecleucel, lymphoma)",
      differs: "Bendamustine 90 mg/m2 daily for 2 days when a patient had grade 4 haemorrhagic cystitis with cyclophosphamide or shows resistance to a cyclophosphamide regimen. The European product information gives the same alternative.",
      evidence: "Label instruction; in the US label's DLBCL safety population, 22 of the 107 patients given lymphodepletion received bendamustine.",
      sources: ["kymriah-label-2025", "kymriah-smpc-eu"],
    },
    {
      name: "Cytarabine and etoposide for B-ALL (tisagenlecleucel, European product information)",
      differs: "For B-ALL after grade 4 haemorrhagic cystitis with cyclophosphamide, or disease refractory to a recent cyclophosphamide regimen: cytarabine 500 mg/m2 daily for 2 days and etoposide 150 mg/m2 daily for 3 days, starting with the first dose of cytarabine. The US label gives no alternative regimen for B-ALL.",
      evidence: "Instruction in the European product information.",
      sources: ["kymriah-smpc-eu", "kymriah-label-2025"],
    },
    {
      name: "Omitting lymphodepletion when counts are already very low (tisagenlecleucel)",
      differs: "The US label says lymphodepletion may be omitted if the white count is under 1 x 10^9/L within a week before infusion; the European product information says the same at 1,000 cells per microlitre or less. EBMT 2019 recommends giving it to all patients regardless of white count or lymphocyte count.",
      evidence: "Label instruction, reflecting the trial design: in the US label's DLBCL efficacy population 10% of patients had no lymphodepletion. EBMT's position is an ungraded checklist recommendation.",
      sources: ["kymriah-label-2025", "kymriah-smpc-eu", "ebmt-2019"],
    },
    {
      name: "Repeat lymphodepletion after 4 weeks (SITC 2020)",
      differs: "Considers repeating lymphodepletion after a delay of 4 weeks, without a white count threshold.",
      evidence: "Panel recommendation without a level of evidence.",
      sources: ["sitc-iec-2020"],
    },
    {
      name: "Repeat lymphodepletion after a delay (European product information)",
      differs: "Kymriah: after more than 4 weeks between the end of lymphodepletion and infusion, with a white count above 1,000 cells per microlitre, the patient should be re-treated. Yescarta: if the infusion is delayed more than 2 weeks after lymphodepletion, the regimen must be given again. The US labels read here give no rule on repeating it.",
      evidence: "Instructions in the European product information.",
      sources: ["kymriah-smpc-eu", "yescarta-smpc-eu"],
    },
    {
      name: "Infusion window for tisagenlecleucel in DLBCL (European product information)",
      differs: "The European product information recommends infusion 2 to 14 days after lymphodepletion for B-ALL and DLBCL and 2 to 6 days for follicular lymphoma; the US label gives 2 to 11 days for DLBCL.",
      evidence: "Instructions in the product information.",
      sources: ["kymriah-smpc-eu", "kymriah-label-2025"],
    },
  ],
  grades: [
    { claim: "EBMT/JACIE 2019 recommendations", grade: "not graded (consensus)", source: "ebmt-2019" },
    { claim: "Regimen and dose", grade: "product label (regulatory instruction)", source: "yescarta-label-2026" },
  ],
  sources: [
    {
      key: "yescarta-label-2026",
      label: "YESCARTA (axicabtagene ciloleucel) US prescribing information, revised 07/2026",
      publisher: "Kite Pharma; US Food and Drug Administration",
      year: 2026,
      url: "https://www.fda.gov/media/108377/download",
      gradingScheme: "Regulatory prescribing information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "kymriah-label-2025",
      label: "KYMRIAH (tisagenlecleucel) US prescribing information, revised 6/2025",
      publisher: "Novartis; US Food and Drug Administration",
      year: 2025,
      url: "https://www.fda.gov/media/107296/download",
      gradingScheme: "Regulatory prescribing information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    { ...EBMT_2019, accessed: "2026-11-17" },
    { ...SITC_IEC_2020, accessed: "2026-11-17" },
    {
      key: "kymriah-smpc-eu",
      label: "Kymriah (tisagenlecleucel) European product information: summary of product characteristics, the PDF served on 17 November 2026",
      publisher: "Novartis Europharm; European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/kymriah-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "yescarta-smpc-eu",
      label: "Yescarta (axicabtagene ciloleucel) European product information: summary of product characteristics, the PDF served on 17 November 2026",
      publisher: "Kite Pharma EU; European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/yescarta-epar-product-information_en.pdf",
      gradingScheme: "Regulatory product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "fludarabine-label-us",
      label: "Fludarabine Phosphate Injection, USP, US prescribing information (Fresenius Kabi), DailyMed version dated October 2024",
      publisher: "Fresenius Kabi USA; US National Library of Medicine (DailyMed)",
      year: 2024,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cf5255cc-91fd-4132-973b-764dba142eae",
      gradingScheme: "Regulatory prescribing information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    EBMT_2022,
  ],
  upgrades: [],
  gaps: [
    "Only axicabtagene ciloleucel and tisagenlecleucel were read (US labels and European product information). The lymphodepletion instructions for lisocabtagene maraleucel, brexucabtagene autoleucel, idecabtagene vicleucel, ciltacabtagene autoleucel and obecabtagene autoleucel were not read and may differ.",
    "On 17 November 2026 the EBMT 2019 checklists before conditioning (Tables 5A and 5B), images in the full-text XML, were read as text from the journal's open PDF. Their bilirubin limit is left out here because the unit symbol did not survive text extraction.",
    "The EBMT/JACIE/EHA 2022 update, which is the current European edition and may have changed the 2019 lymphodepletion text used here, and the adult B-ALL Delphi consensus (Blood 2026), which includes lymphodepletion statements, were read only as abstracts. The publisher of the 2022 update refused a script on 16 November 2026 and it was not retried.",
    "Neither CAR T-cell label gives a kidney dose rule for the chemotherapy. The figures here come from one US fludarabine label, written for chronic lymphocytic leukaemia at 25 mg/m2 for 5 days; no source read says how they apply to a 3 or 4 day lymphodepletion course, and the cyclophosphamide and bendamustine labels were not read.",
    "The European product information PDFs carry no revision date in their text; they were read as served on 17 November 2026. The US labels give no rule on repeating lymphodepletion after a delay.",
  ],
  drugs: ["fludarabine", "cyclophosphamide", "bendamustine", "axicabtagene-ciloleucel", "tisagenlecleucel"],
  technologies: ["car-t"],
  cancers: ["dlbcl", "follicular-lymphoma", "all-leukemia"],
  terms: ["lymphodepletion", "lymphoma-tx-car-t-pathway"],
  related: ["car-t-bridging", "car-t-infection-prevention", "icaht-prolonged-cytopenia"],
  tags: ["protocol", "cell-therapy", "car-t"],
});
