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
 *
 * Second accuracy pass, 16 November 2026: SITC 2020 (Europe PMC full-text XML, PMC7745688), EBMT/JACIE 2019 (Europe PMC
 * full-text XML, PMC7012497), ASTCT 2019 (author manuscript PMC12180426 through NCBI efetch; the Europe PMC XML
 * endpoint returned 500) and the FDA page were fetched again with curl and every quote, dose, threshold and evidence
 * level was checked against the raw text by script and by reading the passage. ASTCT 2026, EBMT/JACIE/EHA 2022 and
 * ASCO 2021 were tried again at their publishers (all three returned a bot check, HTTP 403) and remain abstracts from
 * Europe PMC. Corrected: "should be considered" recommendations that had been written as orders (admission, cardiac
 * assessment, holding G-CSF), the list of warning signs (blood pressure, arrhythmia and blood tests had been left
 * out), the scope of the tocilizumab availability statement, reasons that the sources do not give, and the wording of
 * three variants. Added: SITC's steroid doses, the rapid taper and the second look for infection.
 */
export const crsGradingAndManagement = protocol({
  id: "crs-grading-and-management",
  name: "Cytokine release syndrome after CAR T-cell therapy: ASTCT grading, tocilizumab and steroids",
  aka: ["CRS management", "cytokine release syndrome grading", "ASTCT CRS grading", "tocilizumab for CRS", "CAR-T fever"],
  domain: "cell-therapy-toxicity",
  tldr: "After CAR T-cell therapy, the immune cells can release a flood of chemical messengers, causing fever, low blood pressure and breathing trouble: cytokine release syndrome. Any fever after CAR T-cell therapy needs the treating centre at once. Teams grade it from 1 to 4 and treat with tocilizumab and, if needed, steroids; infection is treated at the same time because the two look alike.",
  simple: "CAR T-cell therapy can cause a high temperature and low blood pressure in the first weeks. Ring the treating hospital at once if you get a fever. There are drugs that treat it.",
  summary: "CRS usually starts within 1 to 2 weeks of infusion (median 2 to 3 days for tisagenlecleucel and axicabtagene ciloleucel, sometimes within 24 hours) (SITC 2020). ASTCT 2019 grading: fever of 38 °C or more not attributable to another cause, with grade set by the worse of hypotension (grade 2 no vasopressor, grade 3 one vasopressor with or without vasopressin, grade 4 more than one vasopressor, not counting vasopressin) and hypoxia (grade 2 low-flow nasal cannula at 6 L/min or less, or blow-by oxygen; grade 3 high-flow nasal cannula, face mask, non-rebreather mask or Venturi mask; grade 4 positive pressure). Grade 1 is fever alone, and grade 5 is by convention death due to CRS. Once antipyretics, tocilizumab or steroids are given, fever is no longer needed to grade.\n\nSITC 2020: tocilizumab may be considered at grade 2 in adults (LE: 3) and should be considered earlier for older or comorbid patients; in children it should be given at grade 3 (LE: 3) and may be given for prolonged grade 2 or intolerance to fever (LE: 4). If one dose does not work, give steroids with a second dose (LE: 3); after two doses and steroids, consider anakinra, siltuximab or high-dose methylprednisolone (LE: 4). SITC describes methylprednisolone 2 mg/kg/day and dexamethasone 0.5 mg/kg (maximum 10 mg per dose) as the commonly used corticosteroids, does not recommend high-dose steroids as a first steroid, and advises a rapid taper once symptoms begin to improve. EBMT/JACIE 2019 limits tocilizumab to four doses per episode and says siltuximab can be used as second line. Presume infection and manage it while investigating (SITC); empiric antimicrobials are not delayed on the presumption of CRS (EBMT/JACIE 2019). Daily blood count, metabolic panel, magnesium, phosphate, CRP and ferritin while in hospital; consider a cardiac assessment for severe CRS persisting for 72 hours; consider holding G-CSF and avoid GM-CSF during CRS.\n\nThe ASTCT 2026 update to the grading and the 2022 EBMT/JACIE/EHA recommendations were read only as abstracts.",
  asOf: "2026-11-16",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer", "multidisciplinary-team"],
    where: ["ward", "intensive-care", "outpatient-clinic", "telephone-triage", "home"],
  },
  population: "Adults and children treated with CAR T-cell therapy or another immune effector cell therapy. Thresholds for tocilizumab differ for children (SITC). ASTCT says its definition of cytokine release syndrome applies to any immune effector cell engaging therapy, not just CAR T cells, but the management steps here come from CAR T-cell guidelines; cytokine release syndrome after bispecific T-cell engagers is not set out here.",
  trigger: "A temperature of 38 °C or more, low blood pressure, low oxygen saturation or feeling unwell in the weeks after CAR T-cell infusion.",
  steps: [
    {
      action: "Before infusion, check CRP, ferritin, LDH, full blood count, a metabolic panel with magnesium and phosphate, and an echocardiogram or MUGA scan",
      why: "Baseline values let the team recognise CRS and other toxicities at their earliest onset. SITC leaves the required levels to each institution.",
      source: "sitc-iec-2020",
      quote: "Prior to CAR T cell therapy, treating physicians should order CRP, ferritin, lactate dehydrogenase (LDH), complete blood counts, comprehensive metabolic panel (including Mg/Pho), and transthoracic echocardiogram (TTE) or multigated acquisition (MUGA) scan.",
      grade: "LE: 4",
    },
    {
      action: "Before going ahead, make sure tocilizumab is available to treat CRS and that staffing and supportive care are adequate",
      why: "CRS can develop suddenly and progress quickly. SITC says this in its section on the COVID-19 pandemic, when tocilizumab was also being tried as a treatment for COVID-19, and points to consortium guidance on having tocilizumab doses available for each patient during the CRS risk period.",
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
      action: "If treated as an outpatient, strongly consider admission at the first sign of fever, low blood pressure or confusion",
      why: "The toxicities of CAR T-cell therapy can develop suddenly and progress quickly.",
      source: "sitc-iec-2020",
      quote: "If patients are treated with CAR T cell products in the outpatient setting, admission should be strongly considered at the first signs of toxicity, including fever, hypotension or altered mental status.",
    },
    {
      action: "In hospital, check full blood count, metabolic panel, magnesium, phosphate, CRP and ferritin daily",
      why: "Daily tests track the patient through the risk period. SITC adds fibrinogen and uric acid as required, and says neither cytokine levels nor CRP have been validated for clinical decisions.",
      source: "sitc-iec-2020",
      quote: "In the inpatient setting, complete blood counts, comprehensive metabolic panel (CMP), Mg, Phos, CRP, and ferritin should be ordered daily for patients treated with CAR T cell therapies.",
      grade: "LE: 3",
    },
    {
      action: "Call the doctor for a first temperature above 38 °C, a change from baseline in systolic blood pressure, heart rate over 120 or under 60, an arrhythmia, breathing rate over 25 or under 12, oxygen saturation under 92% on air, rising creatinine or liver tests, tremor or jerky movements, or confusion",
      why: "These are the events SITC lists for telling a physician. For children, heart and breathing rates outside the normal range for age count.",
      source: "sitc-iec-2020",
      quote: "Events requiring physician notification should include deviations from baseline in systolic blood pressure, heart rate of >120 or <60 beats/min, arrhythmia, respiratory rate of >25 or <12 breaths/min (or values outside the normal range in pediatric patients), arterial oxygen saturation of <92% on room air, upward trend in blood creatinine levels or liver function tests, tremors or jerky movements in extremities, altered mental status, and first occurrence of temperature greater than 38°C, as per the ASTCT definition of fever.",
    },
    {
      action: "Presume infection as well, and start empiric antibiotics by local protocol without waiting for CRS to be confirmed",
      why: "SITC says CRS and sepsis can coexist, so patients are presumed infected and managed accordingly while infection is looked for. EBMT asks clinicians to take the prior duration of neutropenia into account.",
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
      why: "Treatment can mask the fever while low blood pressure and low oxygen take longer to resolve.",
      source: "astct-2019",
      quote: "In patients who have CRS then receive antipyretics or anti-cytokine therapy such as tocilizumab or steroids, fever is no longer required to grade subsequent CRS severity.",
    },
    {
      action: "In adults with grade 2 CRS, consider tocilizumab, and consider it earlier for older patients or those with significant comorbidities",
      why: "Tocilizumab blocks the IL-6 receptor, and IL-6 is the main cytokine targeted in CRS. SITC advises earlier intervention where the risk is higher.",
      source: "sitc-iec-2020",
      quote: "For elderly patients or patients with extensive comorbidities, tocilizumab should be considered earlier in the course of CRS. For adults who develop ASTCT grade 2 CRS, tocilizumab may be considered",
      grade: "LE: 3",
    },
    {
      action: "In children, give tocilizumab at grade 3 CRS, and consider it for prolonged grade 2 or fever that cannot be tolerated",
      why: "SITC sets a separate threshold for children. The grade 3 recommendation is LE: 3; giving it for prolonged grade 2 CRS or intolerance to fever is a \"may\" at LE: 4.",
      source: "sitc-iec-2020",
      quote: "For pediatric patients, tocilizumab should be administered at ASTCT grade 3 CRS",
      grade: "LE: 3",
    },
    {
      action: "If CRS does not improve after one dose of tocilizumab, give a corticosteroid with a second dose",
      why: "This is the point at which SITC's panel adds steroids. It describes methylprednisolone 2 mg/kg/day and dexamethasone 0.5 mg/kg (maximum 10 mg per dose) as commonly used, and does not recommend high-dose steroids as a first steroid because they risk destroying the CAR T cells.",
      source: "sitc-iec-2020",
      quote: "In both adults and children, if CRS does not improve after 1 dose of tocilizumab, then steroids should be administered with a second dose of tocilizumab",
      grade: "LE: 3",
    },
    {
      action: "If CRS does not improve after two doses of tocilizumab and steroids, consider anakinra, siltuximab or high-dose methylprednisolone",
      why: "SITC says the benefit of more tocilizumab is unclear when CRS has not responded to 2 to 3 doses. Siltuximab binds IL-6 itself and anakinra blocks IL-1; SITC notes that data on how well anakinra works in people are lacking.",
      source: "sitc-iec-2020",
      quote: "If CRS does not improve after 2 doses of tocilizumab (and steroids), third-line agents, including anakinra, siltuximab, and high-dose methylprednisolone, should be considered",
      grade: "LE: 4",
    },
    {
      action: "Do not give tocilizumab more than four times in one episode of CRS",
      why: "EBMT/JACIE 2019 states this limit without giving a reason, and says siltuximab can be used as a second-line treatment.",
      source: "ebmt-2019",
      quote: "Tocilizumab should be administered no more than four times during one episode of CRS.",
    },
    {
      action: "For severe CRS persisting for 72 hours without response to treatment, consider a cardiac assessment, which may include troponin or an echocardiogram",
      why: "SITC reports heart complications after CAR T-cell therapy, including new or worsening heart failure and arrhythmias.",
      source: "sitc-iec-2020",
      quote: "In patients with prolonged severe CRS (persisting for 72 hours without response to interventions), a cardiac assessment should be considered as described in the cardiology section; this may include measurement of cardiac biomarkers such as troponin or the performance of a TTE",
      grade: "LE: 4",
    },
    {
      action: "Consider holding G-CSF during CRS and avoid GM-CSF",
      why: "SITC notes the tisagenlecleucel package insert's reasoning that GM-CSF may theoretically aggravate CRS.",
      source: "sitc-iec-2020",
      quote: "Consider holding G-CSF during CRS. GM-CSF should be avoided during CRS.",
      grade: "LE: 5",
    },
    {
      action: "If CRS does not improve after tocilizumab and steroids, look again for infection and treat it",
      why: "Infection can look like CRS that is not responding to treatment.",
      source: "sitc-iec-2020",
      quote: "If CRS does not improve after tocilizumab and steroids, infections should be considered again in the differential diagnosis and managed appropriately.",
    },
    {
      action: "If steroids were used, taper them rapidly once symptoms begin to improve",
      why: "SITC cites a trend to shorter progression-free survival with prolonged corticosteroids in one axicabtagene ciloleucel cohort.",
      source: "sitc-iec-2020",
      quote: "If steroids are used in the management of CRS, a rapid taper should be used once symptoms begin to improve.",
    },
  ],
  bestInClass: {
    statement: "Grade with the ASTCT 2019 consensus scale, which SITC 2020 and EBMT/JACIE 2019 both use; ASTCT published an update in 2026 whose changes could not be read. For treatment, SITC 2020 is the most detailed graded guideline that could be read: tocilizumab may be considered at grade 2 in adults (LE: 3) and should be considered earlier in older or comorbid patients, should be given at grade 3 in children (LE: 3), steroids with a second dose if one fails (LE: 3), and anakinra, siltuximab or high-dose methylprednisolone considered after two doses and steroids (LE: 4). EBMT/JACIE 2019 treats severe cases with tocilizumab and, sometimes, corticosteroids, caps tocilizumab at four doses per episode and says siltuximab can be used as second line. ASCO 2021 (abstract) treats prolonged or severe CRS with tocilizumab with or without a corticosteroid, on expert consensus. SITC's levels for these recommendations are 3 and 4 (non-randomised cohorts and case series); no randomised comparison of thresholds for tocilizumab was read.",
    sources: ["astct-2019", "astct-2026", "sitc-iec-2020", "ebmt-2019", "asco-cart-2021"],
  },
  variants: [
    {
      name: "Tocilizumab for persistent fever in grade 1 (axicabtagene ciloleucel trial algorithm)",
      differs: "SITC reports that the algorithm from the axicabtagene ciloleucel trials advised considering tocilizumab 8 mg/kg intravenously for fever lasting more than 3 days and refractory in grade 1 CRS, and recommended anti-IL-6 therapy for managing hypotension, hypoxia and organ toxicity in all cases of grade 2 or higher.",
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
      differs: "Gives tocilizumab early, before CRS becomes severe. SITC cites a Fred Hutchinson report of early tocilizumab with and without dexamethasone after a 4-1BB CAR T-cell product, with a modest decrease in severe CRS, and a Children's Hospital of Philadelphia trial that gave tocilizumab at the time of fever to children with leukaemia and high disease burden (more than 40% marrow blasts) and met its endpoint of reducing grade 4 CRS, by one third.",
      evidence: "Two single-centre studies described in SITC's review; SITC's panel made no recommendation for or against the approach.",
      sources: ["sitc-iec-2020"],
    },
    {
      name: "US risk-management programme (REMS) requirement for on-site tocilizumab ended in June 2025",
      differs: "The FDA ended the risk-management programme for BCMA- and CD19-directed autologous CAR T-cell products, removing the requirement that dispensing hospitals be specially certified and have on-site, immediate access to tocilizumab. Product labels keep a boxed warning for CRS. SITC 2020, written before this, says it is important to ensure tocilizumab is available for the management of CRS.",
      evidence: "Regulatory decision of 26 June 2025; FDA cites established management guidelines, the experience of the haematology and oncology community, and stable adverse event reporting for CRS and neurological toxicity.",
      sources: ["fda-rems-2025", "sitc-iec-2020"],
    },
  ],
  grades: [
    { claim: "Baseline CRP, ferritin, LDH, blood count, metabolic panel and echocardiogram before CAR T cells", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Daily blood count, metabolic panel, magnesium, phosphate, CRP and ferritin in hospital", grade: "LE: 3", source: "sitc-iec-2020" },
    { claim: "Tocilizumab may be considered for adult grade 2 CRS", grade: "LE: 3", source: "sitc-iec-2020" },
    { claim: "Tocilizumab at grade 3 CRS in children", grade: "LE: 3", source: "sitc-iec-2020" },
    { claim: "Tocilizumab may be given to children with prolonged grade 2 CRS or intolerance to fever", grade: "LE: 4", source: "sitc-iec-2020", quote: "For pediatric patients who develop prolonged ASTCT grade 2 CRS or intolerance to fever, tocilizumab may be administered" },
    { claim: "Cardiac assessment considered for severe CRS persisting 72 hours", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Consider holding G-CSF and avoid GM-CSF during CRS", grade: "LE: 5", source: "sitc-iec-2020" },
    { claim: "Steroids with a second tocilizumab dose if one dose fails", grade: "LE: 3", source: "sitc-iec-2020" },
    { claim: "Anakinra, siltuximab or high-dose methylprednisolone considered after two tocilizumab doses and steroids", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Prolonged or severe CRS treated with tocilizumab with or without a corticosteroid", grade: "expert consensus", source: "asco-cart-2021", quote: "Management of patients with prolonged or severe CAR T-cell-associated cytokine release syndrome includes treatment with tocilizumab with or without a corticosteroid." },
  ],
  // Each source was fetched again on 16 November 2026 (see the header); the shared constants carry the first-pass date.
  sources: [SITC_IEC_2020, ASTCT_2019, ASTCT_2026, EBMT_2019, EBMT_2022, ASCO_CART_2021, FDA_REMS_2025].map((s) => ({ ...s, accessed: "2026-11-16" })),
  upgrades: [],
  gaps: [
    ...CELL_GAPS,
    "No randomised trial read here compares tocilizumab thresholds (grade 1 against grade 2) or prophylactic against reactive tocilizumab.",
    "The tocilizumab dose, the maximum per dose and the interval between doses are product-label matters (SmPC or US prescribing information), which were not read for this page; SITC mentions 8 mg/kg intravenously only in describing a trial algorithm, and EBMT/JACIE 2019 gives no dose in its text. The EBMT/JACIE 2019 management algorithm is a figure and was not read as text.",
    "The steroid doses given here (methylprednisolone 2 mg/kg/day; dexamethasone 0.5 mg/kg, maximum 10 mg per dose) are what SITC describes as commonly used, not a graded panel recommendation, and SITC does not define the dose it means by high-dose methylprednisolone as a third-line agent.",
    "How much steroid for CRS affects CAR T-cell efficacy is uncertain; SITC cites a trend to shorter progression-free survival with prolonged corticosteroids in one retrospective cohort of 100 patients given axicabtagene ciloleucel.",
    "SITC prints an evidence level at the end of a run of recommendations. For the baseline tests, the daily blood tests and the growth factor advice, the level shown here is printed after the next sentence of the same run and is read as covering it. SITC's statement that tocilizumab should be available appears in its section on the COVID-19 pandemic and carries no evidence level.",
    "On 16 November 2026 the ASTCT 2026 grading paper, the EBMT/JACIE/EHA 2022 recommendations and the ASCO 2021 guideline were tried again: each publisher page returned a bot check and Europe PMC holds no full text, so all three are still read only as abstracts. The ASCO statement on tocilizumab with or without a corticosteroid is the abstract's sentence; its definitions of prolonged and severe could not be read. A Europe PMC title search on the same day found no later edition of the SITC, EBMT/JACIE/EHA or ASCO guideline.",
  ],
  drugs: ["tocilizumab", "siltuximab", "dexamethasone", "axicabtagene-ciloleucel", "tisagenlecleucel", "lisocabtagene-maraleucel", "brexucabtagene-autoleucel", "idecabtagene-vicleucel", "ciltacabtagene-autoleucel", "obecabtagene-autoleucel", "methylprednisolone", "anakinra"],
  technologies: ["car-t"],
  institutions: ["sitc"],
  terms: ["crs", "lymphoma-tx-crs-icans"],
  related: ["febrile-neutropenia-first-hour"],
  tags: ["protocol", "cell-therapy", "car-t", "acute-oncology"],
});
