import { protocol } from "./helpers";
import { ASCO_CART_2021, ASTCT_2019, ASTCT_2026, CELL_GAPS, EBMT_2019, EBMT_2022, FDA_REMS_2025, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Cytokine release syndrome (CRS) after CAR T-cell and other immune effector cell therapy: monitoring, ASTCT grading,
 * tocilizumab, corticosteroids and third-line agents.
 *
 * What was read, and how: see ./cell-therapy-sources.ts. SITC 2020 (full text, CRS sections and panel
 * recommendations), ASTCT 2019 (full text of the author manuscript, CRS definition and Table 2), EBMT/JACIE 2019 (full
 * text), ASTCT 2026, EBMT/JACIE/EHA 2022 and ASCO 2021 (abstracts). Quotes were checked by script against the raw
 * text; SITC's evidence levels are printed as "(LE: n" followed by reference numbers, and the quotes stop before them.
 */
export const crsGradingAndManagement = protocol({
  id: "crs-grading-and-management",
  name: "Cytokine release syndrome after CAR T-cell therapy: ASTCT grading, tocilizumab and steroids",
  aka: ["CRS management", "cytokine release syndrome grading", "ASTCT CRS grading", "tocilizumab for CRS", "CAR-T fever"],
  domain: "cell-therapy-toxicity",
  tldr: "After CAR T-cell therapy, the immune cells can release a flood of chemical messengers, causing fever, low blood pressure and breathing trouble: cytokine release syndrome. Any fever after CAR T-cell therapy needs the treating centre at once. Teams grade it from 1 to 4 and treat with tocilizumab and, if needed, steroids; infection is treated at the same time because the two look alike.",
  simple: "CAR T-cell therapy can cause a high temperature and low blood pressure in the first weeks. Ring the treating hospital at once if you get a fever. There are drugs that work well when given early.",
  summary: "CRS usually starts within 1 to 2 weeks of infusion (median 2 to 3 days for tisagenlecleucel and axicabtagene ciloleucel, sometimes within 24 hours) (SITC 2020). ASTCT 2019 grading: fever of 38 °C or more not attributable to another cause, with grade set by the worse of hypotension (grade 2 no vasopressor, grade 3 one vasopressor with or without vasopressin, grade 4 several) and hypoxia (grade 2 low-flow oxygen up to 6 L/min, grade 3 high-flow, face mask or non-rebreather, grade 4 positive pressure). Once antipyretics, tocilizumab or steroids are given, fever is no longer needed to grade.\n\nSITC 2020: tocilizumab may be considered at grade 2 in adults (LE: 3) and earlier for older or comorbid patients; in children, at grade 3 (LE: 3). If one dose does not work, give steroids with a second dose (LE: 3); after two doses, consider anakinra, siltuximab or high-dose methylprednisolone (LE: 4). EBMT/JACIE 2019 limits tocilizumab to four doses per episode and names siltuximab as second line. Presume infection and treat it while investigating; neutropenic fever antibiotics are not delayed for a presumed CRS. Daily blood count, metabolic panel, magnesium, phosphate, CRP and ferritin while in hospital; cardiac assessment for prolonged severe CRS; hold G-CSF and avoid GM-CSF during CRS.\n\nThe ASTCT 2026 update to the grading and the 2022 EBMT/JACIE/EHA recommendations were read only as abstracts.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer", "multidisciplinary-team"],
    where: ["ward", "intensive-care", "outpatient-clinic", "telephone-triage", "home"],
  },
  population: "Adults and children treated with CAR T-cell therapy or another immune effector cell therapy. Thresholds for tocilizumab differ for children (SITC). Cytokine release syndrome after bispecific T-cell engagers is graded on the same ASTCT scale but managed under product-specific step-up dosing protocols, not set out here.",
  trigger: "A temperature of 38 °C or more, low blood pressure, low oxygen saturation or feeling unwell in the weeks after CAR T-cell infusion.",
  steps: [
    {
      action: "Before infusion, check CRP, ferritin, LDH, full blood count, a metabolic panel with magnesium and phosphate, and an echocardiogram or MUGA scan",
      why: "These give a baseline to compare with when CRS starts and show whether the heart can cope.",
      source: "sitc-iec-2020",
      quote: "Prior to CAR T cell therapy, treating physicians should order CRP, ferritin, lactate dehydrogenase (LDH), complete blood counts, comprehensive metabolic panel (including Mg/Pho), and transthoracic echocardiogram (TTE) or multigated acquisition (MUGA) scan.",
      grade: "LE: 4",
    },
    {
      action: "Make sure tocilizumab is on hand for every patient during the CRS risk period, with staff trained to give it",
      why: "Severe CRS can come on within hours, and the drug that treats it must be available on site.",
      source: "sitc-iec-2020",
      quote: "However, adequate staff and supportive care resources are an absolute prerequisite for proceeding with CAR T cell therapy, and it is important to ensure that tocilizumab—which, along with other interleukin (IL)-6-modulating agents, was used as an investigational intervention for COVID-19—is available for the management of CRS.",
    },
    {
      action: "Give the patient and carer written information on the symptoms of CRS and neurotoxicity and tell them to report any immediately",
      why: "Patients treated as outpatients, or after discharge, are the first to notice a fever.",
      source: "ebmt-2019",
      quote: "This should include information and education on the symptoms of CRS and serious neurological adverse reactions, the need to report any symptoms immediately to their treating physician and the need to remain in close proximity to the center in which the CAR T cells were administered for at least 4 weeks following the infusion.",
    },
    {
      action: "If treated as an outpatient, admit at the first sign of fever, low blood pressure or confusion",
      why: "CRS can worsen quickly and needs monitoring that only a ward can give.",
      source: "sitc-iec-2020",
      quote: "If patients are treated with CAR T cell products in the outpatient setting, admission should be strongly considered at the first signs of toxicity, including fever, hypotension or altered mental status.",
    },
    {
      action: "In hospital, check full blood count, metabolic panel, magnesium, phosphate, CRP and ferritin daily",
      why: "Trends help track CRS and spot organ damage, although no blood test alone decides treatment.",
      source: "sitc-iec-2020",
      quote: "In the inpatient setting, complete blood counts, comprehensive metabolic panel (CMP), Mg, Phos, CRP, and ferritin should be ordered daily for patients treated with CAR T cell therapies.",
      grade: "LE: 3",
    },
    {
      action: "Call the doctor for a first temperature above 38 °C, heart rate over 120 or under 60, breathing rate over 25 or under 12, oxygen saturation under 92% on air, tremor or confusion",
      why: "These are the early warnings SITC names for physician review.",
      source: "sitc-iec-2020",
      quote: "Events requiring physician notification should include deviations from baseline in systolic blood pressure, heart rate of >120 or <60 beats/min, arrhythmia, respiratory rate of >25 or <12 breaths/min (or values outside the normal range in pediatric patients), arterial oxygen saturation of <92% on room air, upward trend in blood creatinine levels or liver function tests, tremors or jerky movements in extremities, altered mental status, and first occurrence of temperature greater than 38°C, as per the ASTCT definition of fever.",
    },
    {
      action: "Presume infection as well, and start empiric antibiotics by local protocol without waiting for CRS to be confirmed",
      why: "CRS and sepsis look alike and can happen together; many patients are also neutropenic.",
      source: "ebmt-2019",
      quote: "Empiric antimicrobial therapy based on symptoms and institutional protocols should not be delayed based on the presumption of CRS and clinicians should consider the prior duration of neutropenia.",
    },
    {
      action: "Grade CRS by the ASTCT scale: fever of 38 °C or more, graded by the worse of hypotension and hypoxia",
      why: "One shared scale lets teams and trials compare like with like and links grade to treatment.",
      source: "astct-2019",
      quote: "CRS grade is determined by the more severe event: hypotension or hypoxia not attributable to any other cause.",
    },
    {
      action: "Once antipyretics, tocilizumab or steroids have been given, keep grading on blood pressure and oxygen alone",
      why: "Treatment can switch off the fever while CRS continues.",
      source: "astct-2019",
      quote: "In patients who have CRS then receive antipyretics or anti-cytokine therapy such as tocilizumab or steroids, fever is no longer required to grade subsequent CRS severity.",
    },
    {
      action: "In adults with grade 2 CRS, consider tocilizumab, and consider it earlier for older patients or those with significant comorbidities",
      why: "Blocking IL-6 early can stop CRS from progressing; frailer patients tolerate low blood pressure and hypoxia less well.",
      source: "sitc-iec-2020",
      quote: "For elderly patients or patients with extensive comorbidities, tocilizumab should be considered earlier in the course of CRS. For adults who develop ASTCT grade 2 CRS, tocilizumab may be considered",
      grade: "LE: 3",
    },
    {
      action: "In children, give tocilizumab at grade 3 CRS, and consider it for prolonged grade 2 or fever that cannot be tolerated",
      why: "SITC sets a different threshold for children based on paediatric experience.",
      source: "sitc-iec-2020",
      quote: "For pediatric patients, tocilizumab should be administered at ASTCT grade 3 CRS",
      grade: "LE: 3",
    },
    {
      action: "If CRS does not improve after one dose of tocilizumab, give a corticosteroid with a second dose",
      why: "Steroids add a second, broader brake on the inflammation.",
      source: "sitc-iec-2020",
      quote: "In both adults and children, if CRS does not improve after 1 dose of tocilizumab, then steroids should be administered with a second dose of tocilizumab",
      grade: "LE: 3",
    },
    {
      action: "If CRS does not improve after two doses of tocilizumab and steroids, consider anakinra, siltuximab or high-dose methylprednisolone",
      why: "Refractory CRS needs drugs that act on other parts of the cytokine cascade.",
      source: "sitc-iec-2020",
      quote: "If CRS does not improve after 2 doses of tocilizumab (and steroids), third-line agents, including anakinra, siltuximab, and high-dose methylprednisolone, should be considered",
      grade: "LE: 4",
    },
    {
      action: "Do not give tocilizumab more than four times in one episode of CRS",
      why: "Further doses add risk without evidence of benefit; EBMT names siltuximab as the second-line IL-6 drug.",
      source: "ebmt-2019",
      quote: "Tocilizumab should be administered no more than four times during one episode of CRS.",
    },
    {
      action: "For severe CRS lasting 72 hours without response, assess the heart with troponin and an echocardiogram",
      why: "Prolonged CRS can strain or inflame the heart.",
      source: "sitc-iec-2020",
      quote: "In patients with prolonged severe CRS (persisting for 72 hours without response to interventions), a cardiac assessment should be considered as described in the cardiology section; this may include measurement of cardiac biomarkers such as troponin or the performance of a TTE",
      grade: "LE: 4",
    },
    {
      action: "Consider holding G-CSF during CRS and avoid GM-CSF",
      why: "Growth factors may feed the inflammation while CRS is active.",
      source: "sitc-iec-2020",
      quote: "Consider holding G-CSF during CRS. GM-CSF should be avoided during CRS.",
      grade: "LE: 5",
    },
  ],
  bestInClass: {
    statement: "Grade with the ASTCT 2019 consensus scale, which all the sources read here use; ASTCT published an update in 2026 whose changes could not be read. For treatment, SITC 2020 is the most detailed graded guideline that could be read: tocilizumab may be considered at grade 2 in adults and earlier in older or comorbid patients (LE: 3), at grade 3 in children (LE: 3), steroids with a second dose if one fails (LE: 3), and anakinra, siltuximab or high-dose methylprednisolone after two doses (LE: 4). EBMT/JACIE 2019 agrees on tocilizumab with steroids for severe cases, caps tocilizumab at four doses per episode and names siltuximab as second line. ASCO 2021 (abstract) treats prolonged or severe CRS with tocilizumab with or without a corticosteroid. All rest on expert consensus and non-randomised data; no randomised comparison of thresholds for tocilizumab was read.",
    sources: ["astct-2019", "astct-2026", "sitc-iec-2020", "ebmt-2019", "asco-cart-2021"],
  },
  variants: [
    {
      name: "Tocilizumab for persistent fever in grade 1 (axicabtagene ciloleucel trial algorithm)",
      differs: "SITC reports that the algorithm from the axicabtagene ciloleucel trials advised considering tocilizumab 8 mg/kg intravenously for fever lasting more than 3 days and refractory in grade 1 CRS, and anti-IL-6 therapy for all grade 2 or higher CRS.",
      evidence: "A trial management algorithm reported in SITC's review, not a panel recommendation.",
      sources: ["sitc-iec-2020"],
    },
    {
      name: "Steroids only as second line (tisagenlecleucel trials)",
      differs: "Managed early CRS with tocilizumab and used corticosteroids only for refractory hypotension or severe symptoms not responding to the first dose.",
      evidence: "Trial practice reported by SITC.",
      sources: ["sitc-iec-2020"],
    },
    {
      name: "Pre-emptive or prophylactic tocilizumab (single-centre studies)",
      differs: "Gives tocilizumab, with or without dexamethasone, before CRS develops or at its earliest signs in high-risk patients. SITC cites a Fred Hutchinson study reporting a modest decrease in severe CRS and a Children's Hospital of Philadelphia study in children with high disease burden.",
      evidence: "Non-randomised studies reported by SITC; not recommended routinely.",
      sources: ["sitc-iec-2020"],
    },
    {
      name: "No regulatory requirement for on-site tocilizumab in the US since June 2025",
      differs: "The FDA ended the risk-management programme for BCMA- and CD19-directed autologous CAR T-cell products, removing the requirement that dispensing hospitals be specially certified and have on-site, immediate access to tocilizumab. SITC 2020 still treats tocilizumab availability as a prerequisite, and the clinical need for it has not changed.",
      evidence: "Regulatory decision; FDA cites established management guidelines and stable adverse event reporting.",
      sources: ["fda-rems-2025", "sitc-iec-2020"],
    },
  ],
  grades: [
    { claim: "Baseline CRP, ferritin, LDH, blood count, metabolic panel and echocardiogram before CAR T cells", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Daily blood count, metabolic panel, magnesium, phosphate, CRP and ferritin in hospital", grade: "LE: 3", source: "sitc-iec-2020" },
    { claim: "Tocilizumab may be considered for adult grade 2 CRS", grade: "LE: 3", source: "sitc-iec-2020" },
    { claim: "Tocilizumab at grade 3 CRS in children", grade: "LE: 3", source: "sitc-iec-2020" },
    { claim: "Steroids with a second tocilizumab dose if one dose fails", grade: "LE: 3", source: "sitc-iec-2020" },
    { claim: "Anakinra, siltuximab or high-dose methylprednisolone after two tocilizumab doses", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Prolonged or severe CRS treated with tocilizumab with or without a corticosteroid", grade: "expert consensus", source: "asco-cart-2021", quote: "Management of patients with prolonged or severe CAR T-cell-associated cytokine release syndrome includes treatment with tocilizumab with or without a corticosteroid." },
  ],
  sources: [SITC_IEC_2020, ASTCT_2019, ASTCT_2026, EBMT_2019, EBMT_2022, ASCO_CART_2021, FDA_REMS_2025],
  upgrades: [],
  gaps: [
    ...CELL_GAPS,
    "No randomised trial read here compares tocilizumab thresholds (grade 1 against grade 2) or prophylactic against reactive tocilizumab.",
    "The tocilizumab dose and maximum per dose are product-label matters (SmPC or US prescribing information), which were not read for this page; SITC mentions 8 mg/kg only in describing a trial algorithm.",
    "How much steroid for CRS affects CAR T-cell efficacy is uncertain; SITC cites a trend to shorter progression-free survival with prolonged corticosteroids in one axicabtagene ciloleucel cohort.",
  ],
  drugs: ["tocilizumab", "siltuximab", "dexamethasone", "axicabtagene-ciloleucel", "tisagenlecleucel", "lisocabtagene-maraleucel", "brexucabtagene-autoleucel", "idecabtagene-vicleucel", "ciltacabtagene-autoleucel", "obecabtagene-autoleucel", "methylprednisolone", "anakinra"],
  technologies: ["car-t"],
  institutions: ["sitc"],
  terms: ["crs", "lymphoma-tx-crs-icans"],
  related: ["febrile-neutropenia-first-hour"],
  tags: ["protocol", "cell-therapy", "car-t", "acute-oncology"],
});
