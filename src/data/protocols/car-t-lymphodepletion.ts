import { protocol } from "./helpers";
import { EBMT_2019, EBMT_2022, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Lymphodepleting chemotherapy before CAR T-cell infusion: checks before starting, the regimen, and when to delay or
 * repeat it.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - EBMT/JACIE 2019 best practice recommendations: full text (PMC7012497), lymphodepleting conditioning section. Its
 *   Tables 5A and 5B (checklists) are images and were not read.
 * - SITC 2020 immune effector cell guideline: full text (baseline and infection sections).
 * - US prescribing information for YESCARTA (axicabtagene ciloleucel), revised 07/2026, and KYMRIAH
 *   (tisagenlecleucel), revised 6/2025: PDFs from fda.gov, converted with pdftotext and read in the dosing and warnings
 *   sections. The label is the source for each product's regimen and dose.
 * - EBMT/JACIE/EHA 2022: abstract only (./cell-therapy-sources.ts).
 * Quotes checked by script against the raw text.
 */
export const carTLymphodepletion = protocol({
  id: "car-t-lymphodepletion",
  name: "Lymphodepleting chemotherapy before CAR T-cell infusion",
  aka: ["lymphodepletion", "LD chemotherapy", "Flu/Cy", "fludarabine and cyclophosphamide conditioning", "lymphodepleting conditioning"],
  domain: "cell-therapy-toxicity",
  tldr: "A few days before CAR T cells are given, a short course of chemotherapy, usually fludarabine and cyclophosphamide, lowers your own white cells to make room for the CAR T cells to grow. The team first checks that your CAR T cells are ready and that you have no uncontrolled infection. The doses and timing follow the instructions for your product.",
  simple: "Before CAR T cells, you have a few days of chemotherapy to make space for them. It starts only when your cells are ready and you are free of serious infection.",
  summary: "EBMT/JACIE 2019: lymphodepletion favours CAR T-cell expansion and persistence; fludarabine-cyclophosphamide is the most widely used regimen, usually over 3 to 5 days before infusion, with admission unless the centre has a safe outpatient pathway. If more than about 3 weeks pass between lymphodepletion and infusion and the white count is above 1.0 x 10^9/L, consider repeating it (SITC 2020: consider after 4 weeks). Infections must be treated and controlled first; SITC 2020 does not give lymphodepletion while a suspected fungal infection is uncontrolled.\n\nThe regimen and dose come from each product's label. YESCARTA (axicabtagene ciloleucel, US label revised 07/2026): cyclophosphamide 500 mg/m2 and fludarabine 30 mg/m2 intravenously on days 5, 4 and 3 before infusion. KYMRIAH (tisagenlecleucel, revised 6/2025): for adult DLBCL and follicular lymphoma, fludarabine 25 mg/m2 and cyclophosphamide 250 mg/m2 daily for 3 days, with bendamustine 90 mg/m2 for 2 days as the alternative after grade 4 haemorrhagic cystitis or cyclophosphamide resistance, and lymphodepletion may be omitted if the white count is under 1 x 10^9/L in the week before; for children and young adults with B-ALL, fludarabine 30 mg/m2 for 4 days and cyclophosphamide 500 mg/m2 for 2 days. Both labels: confirm the product is available before starting; no live vaccines for at least 6 weeks before lymphodepletion.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist"],
    where: ["ward", "chemotherapy-day-unit"],
  },
  population: "Adults and children receiving a commercial autologous CAR T-cell product for B-cell lymphoma, B-cell ALL or myeloma. Regimens and doses differ by product and indication; the two US labels read here are examples, not the full set.",
  trigger: "The CAR T-cell product has been manufactured and an infusion date is set.",
  steps: [
    {
      action: "Confirm the CAR T-cell product is available before starting lymphodepletion",
      why: "Lymphodepletion without a product to follow leaves the person with low counts and no treatment.",
      source: "yescarta-label-2026",
      quote: "Confirm availability of YESCARTA prior to starting the lymphodepleting regimen.",
    },
    {
      action: "Treat and control any active infection first; do not give lymphodepletion while a suspected fungal infection is uncontrolled",
      why: "Lymphodepletion and the cytokine surge after CAR T cells make an existing infection much worse.",
      source: "sitc-iec-2020",
      quote: "If a fungal infection is suspected, lymphodepleting chemotherapy should not be administered until appropriate antifungals have been initiated and fungal infection is controlled.",
    },
    {
      action: "Make sure no live vaccine has been given in the 6 weeks before lymphodepletion",
      why: "Live vaccines can cause infection when the immune system is suppressed.",
      source: "yescarta-label-2026",
      quote: "Vaccination with live virus vaccines is not recommended for at least 6 weeks prior to the start of lymphodepleting chemotherapy, during YESCARTA treatment, and until immune recovery following treatment with YESCARTA.",
    },
    {
      action: "Use fludarabine with cyclophosphamide unless the product label or the patient's history says otherwise",
      why: "This combination gave better CAR T-cell persistence and disease control than older regimens.",
      source: "ebmt-2019",
      quote: "Fludarabine-cyclophosphamide is the most widely used LD conditioning regimen.",
    },
    {
      action: "Give the dose and schedule in the product's label; for axicabtagene ciloleucel, cyclophosphamide 500 mg/m2 and fludarabine 30 mg/m2 on days 5, 4 and 3 before infusion",
      why: "Each product was tested with its own regimen, and the doses differ between products.",
      source: "yescarta-label-2026",
      quote: "Administer a lymphodepleting chemotherapy regimen of cyclophosphamide 500 mg/m2 intravenously and fludarabine 30 mg/m2 intravenously on the fifth, fourth, and third day before infusion of YESCARTA.",
    },
    {
      action: "Admit for lymphodepletion unless the centre has an established, safe outpatient pathway",
      why: "Close monitoring and good hydration are needed during these days.",
      source: "ebmt-2019",
      quote: "If the center does not have established policies and infrastructure to allow for safe outpatient-based administration, hospitalization is recommended during this period to ensure close monitoring and optimal hydration.",
    },
    {
      action: "Delay the infusion if there are unresolved serious reactions to earlier chemotherapy, uncontrolled infection, active GVHD or worsening leukaemia after lymphodepletion",
      why: "These raise the risk of severe cytokine release syndrome and other harm.",
      source: "kymriah-label-2025",
      quote: "Delay the infusion of KYMRIAH if a patient has unresolved serious adverse reactions (including pulmonary reactions, cardiac reactions, or hypotension) from preceding chemotherapies, active uncontrolled infection, active graft versus host disease (GVHD), or worsening of leukemia burden following lymphodepleting chemotherapy",
    },
    {
      action: "If the infusion is delayed by more than about 3 weeks and the white count has recovered above 1.0 x 10^9/L, consider repeating lymphodepletion",
      why: "Once the person's own lymphocytes come back, the CAR T cells lose the space they need to expand.",
      source: "ebmt-2019",
      quote: "If there is a long delay (in general, more than 3 weeks) between completing LD conditioning and the subsequent CAR T-cell infusion, and the white blood cell count is >1.0×109/L, then consideration should be given to re-treating the patient with LD chemotherapy prior to administration of the CAR T cells.",
    },
  ],
  bestInClass: {
    statement: "For the regimen and dose, the product's own label is the authority, and labels differ (fludarabine 30 mg/m2 with cyclophosphamide 500 mg/m2 for three days for axicabtagene ciloleucel; fludarabine 25 mg/m2 with cyclophosphamide 250 mg/m2 for three days, or bendamustine, for tisagenlecleucel in lymphoma). For the checks around it, EBMT/JACIE 2019 and SITC 2020 agree: control infection first, confirm the product, monitor closely, and consider repeating lymphodepletion after a long delay. They differ slightly on that delay: EBMT says more than 3 weeks with a white count above 1.0 x 10^9/L; SITC says consider repeating after 4 weeks. Neither is graded on this point. The 2022 EBMT/JACIE/EHA update was read only as an abstract.",
    sources: ["yescarta-label-2026", "kymriah-label-2025", "ebmt-2019", "sitc-iec-2020", "ebmt-eha-2022"],
  },
  variants: [
    {
      name: "Bendamustine instead of fludarabine-cyclophosphamide (tisagenlecleucel label, lymphoma)",
      differs: "Bendamustine 90 mg/m2 daily for 2 days when a patient had grade 4 haemorrhagic cystitis with cyclophosphamide or shows resistance to a cyclophosphamide regimen.",
      evidence: "Label instruction; in the pivotal DLBCL trial 22 of 107 patients given lymphodepletion received bendamustine.",
      sources: ["kymriah-label-2025"],
    },
    {
      name: "Omitting lymphodepletion when counts are already very low (tisagenlecleucel label, lymphoma)",
      differs: "Lymphodepletion may be omitted if the white count is under 1 x 10^9/L within a week before infusion.",
      evidence: "Label instruction, reflecting trial eligibility.",
      sources: ["kymriah-label-2025"],
    },
    {
      name: "Repeat lymphodepletion after 4 weeks (SITC 2020)",
      differs: "Considers repeating lymphodepletion after a delay of 4 weeks, without a white count threshold.",
      evidence: "Panel recommendation without a level of evidence.",
      sources: ["sitc-iec-2020"],
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
      accessed: "2026-11-11",
    },
    {
      key: "kymriah-label-2025",
      label: "KYMRIAH (tisagenlecleucel) US prescribing information, revised 6/2025",
      publisher: "Novartis; US Food and Drug Administration",
      year: 2025,
      url: "https://www.fda.gov/media/107296/download",
      gradingScheme: "Regulatory prescribing information; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    EBMT_2019,
    SITC_IEC_2020,
    EBMT_2022,
  ],
  upgrades: [],
  gaps: [
    "Only two US labels were read; the lymphodepletion instructions for lisocabtagene maraleucel, brexucabtagene autoleucel, idecabtagene vicleucel, ciltacabtagene autoleucel and obecabtagene autoleucel, and the European SmPCs, were not read and may differ.",
    "The EBMT 2019 checklists before conditioning (Tables 5A and 5B) are images and were not read.",
    "The EBMT/JACIE/EHA 2022 update and the adult B-ALL Delphi consensus (Blood 2026), which includes lymphodepletion statements, were read only as abstracts.",
    "Dose adjustment of fludarabine for reduced kidney function is set in the labels of the chemotherapy drugs and was not read here.",
  ],
  drugs: ["fludarabine", "cyclophosphamide", "bendamustine", "axicabtagene-ciloleucel", "tisagenlecleucel"],
  technologies: ["car-t"],
  cancers: ["dlbcl", "follicular-lymphoma", "all-leukemia"],
  terms: ["lymphodepletion", "lymphoma-tx-car-t-pathway"],
  related: ["car-t-bridging", "car-t-infection-prevention", "icaht-prolonged-cytopenia"],
  tags: ["protocol", "cell-therapy", "car-t"],
});
