import { protocol } from "./helpers";

/*
 * Neratinib: preventing diarrhoea from the first dose, either with scheduled loperamide for 56 days or with a two-week
 * dose escalation, and the label's rules for interrupting, reducing and stopping. The general approach to
 * treatment-induced diarrhoea is in its own protocol, linked in `related`.
 *
 * What was read, and how (11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch directory
 * and read as text):
 * - NERLYNX (neratinib) US prescribing information, DailyMed set d1e41dcf-e82a-47c2-a0ad-6c6eef621834, version published
 *   6 July 2026: full SPL text (2.1, 2.2, 2.3 with Tables 1 to 4, 5.1, 17).
 * - CONTROL final findings (Barcenas et al., The Breast 2023; PMC9982309): full text.
 * The EU summary of product characteristics was not read. Every DOI was resolved through Europe PMC and its title
 * checked. Quotes are copied from the raw text with nothing changed.
 */
export const neratinibDiarrhoeaProphylaxisAndDoseEscalation = protocol({
  id: "neratinib-diarrhoea-prophylaxis-and-dose-escalation",
  name: "Neratinib: diarrhoea prevention with loperamide or dose escalation",
  aka: ["neratinib diarrhoea prophylaxis", "Nerlynx loperamide schedule", "neratinib dose escalation", "CONTROL trial strategies"],
  domain: "oral-anticancer-therapy",
  tldr: "Neratinib, a tablet for HER2-positive breast cancer, causes diarrhoea in almost everyone. Prevent it in one of two ways agreed before you start: loperamide on a fixed schedule from the first tablet for eight weeks, or a lower starting dose built up over two weeks. Drink about two litres a day, and call your team at once if diarrhoea is severe or comes with weakness, dizziness or fever.",
  simple: "This cancer tablet often gives runny poo. Your team will either give you a medicine to take every day at the start or start with a smaller dose. Call them if it is bad.",
  summary: "Without prophylaxis, diarrhoea occurred in 95 per cent of people in ExteNET, grade 3 in 40 per cent, with a median onset of grade 3 or worse at day 8. The US label now offers two strategies from the first dose. Either loperamide prophylaxis for the first 56 days (4 mg three times daily in weeks 1 and 2, 4 mg twice daily in weeks 3 to 8, then as needed up to 16 mg a day, titrated to one or two bowel movements a day), or a two-week neratinib dose escalation (120 mg a day in week 1, 160 mg in week 2, 240 mg from week 3) with loperamide as needed. In the open-label phase II CONTROL trial, six non-comparative cohorts of 563 people starting extended adjuvant neratinib all had less grade 3 diarrhoea than historical controls; it was lowest with the two-week escalation (13 per cent) and highest with colestipol plus loperamide as needed (33 per cent), and diarrhoea-related discontinuations were 3 per cent with the two-week escalation against 20 per cent with loperamide alone. The label's dose modification table sets when to adjust antidiarrhoeals, interrupt, reduce or stop.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage"],
  },
  population: "Adults starting neratinib for HER2-positive breast cancer: extended adjuvant treatment of early-stage disease, or with capecitabine for metastatic disease. CONTROL enrolled only people starting extended adjuvant neratinib after trastuzumab-based therapy. The label's dose modification table read here is for neratinib monotherapy; with capecitabine, capecitabine has its own rules.",
  trigger: "Neratinib is prescribed.",
  steps: [
    {
      action: "Before the first tablet, agree one strategy: loperamide prophylaxis for the first 56 days, or a two-week neratinib dose escalation",
      why: "Diarrhoea usually starts in the first weeks; either strategy, started on day one, makes severe diarrhoea much less likely.",
      source: "nerlynx-label-2026",
      quote: "Alternatively, a 2-week NERLYNX dose escalation approach prior to initiation of the recommended treatment regimen with NERLYNX can also be considered for diarrhea management",
    },
    {
      action: "If using prophylaxis, start loperamide with the first dose: 4 mg three times daily for days 1 to 14, 4 mg twice daily for days 15 to 56, then 4 mg as needed up to 16 mg a day",
      why: "Taking loperamide on a schedule from the start keeps diarrhoea mild while the bowel adapts.",
      source: "nerlynx-label-2026",
      quote: "Weeks 1–2 (days 1–14) 4 mg three times daily Weeks 3–8 (days 15–56) 4 mg twice daily Weeks 9–Discontinuation of NERLYNX 4 mg as needed, not to exceed 16 mg per day; titrate dosing to achieve 1–2 bowel movements per day",
    },
    {
      action: "If using dose escalation, give 120 mg daily in week 1, 160 mg daily in week 2 and 240 mg daily from week 3, with antidiarrhoeals as needed",
      why: "A lower dose at first lets the bowel adjust before the full dose; in the CONTROL trial it gave the least severe diarrhoea.",
      source: "nerlynx-label-2026",
      quote: "Week 1 (days 1–7) 120 mg daily (three 40 mg tablets) Week 2 (days 8–14) 160 mg daily (four 40 mg tablets) Week 3 and onwards 240 mg daily (six 40 mg tablets, recommended dose)",
    },
    {
      action: "Titrate loperamide to one or two bowel movements a day, and ask the person to keep to that target",
      why: "One or two bowel movements a day shows the dose is right: fewer suggests too much loperamide, more that diarrhoea is building.",
      source: "nerlynx-label-2026",
      quote: "Instruct patients to maintain 1–2 bowel movements per day and on how to use antidiarrheal treatment regimens.",
    },
    {
      action: "For grade 1, grade 2 lasting up to 5 days, or grade 3 lasting up to 2 days, adjust antidiarrhoeals, change diet and keep fluid intake around 2 litres a day",
      why: "Most diarrhoea on neratinib settles with more antidiarrhoeal medicine and fluids without stopping the drug.",
      source: "nerlynx-label-2026",
      quote: "Adjust antidiarrheal treatment Diet modifications Fluid intake of ~2 L/day should be maintained to avoid dehydration",
    },
    {
      action: "Interrupt neratinib for diarrhoea with complicating features (dehydration, fever, low blood pressure, kidney failure, grade 3 or 4 neutropenia), grade 2 lasting more than 5 days or grade 3 more than 2 days despite treatment; resume at the same dose if it settles within a week, otherwise at a reduced dose",
      why: "Stopping briefly lets the bowel recover; restarting at a lower dose after a slow recovery prevents a repeat.",
      source: "nerlynx-label-2026",
      quote: "If diarrhea resolves to ≤Grade 1 in one week or less, then resume NERLYNX treatment at the same dose If diarrhea resolves to ≤Grade 1 in longer than one week, then resume NERLYNX treatment at reduced dose",
    },
    {
      action: "Stop neratinib permanently for grade 4 diarrhoea, or if grade 2 or worse diarrhoea recurs at 120 mg a day",
      why: "Life-threatening diarrhoea, or diarrhoea that persists at the lowest dose, means the drug cannot be given safely.",
      source: "nerlynx-label-2026",
      quote: "Permanently discontinue NERLYNX treatment Diarrhea recurs to Grade 2 or higher at 120 mg per day Permanently discontinue NERLYNX treatment",
    },
    {
      action: "Ask the person to call immediately for severe diarrhoea, or diarrhoea with weakness, dizziness or fever",
      why: "Severe diarrhoea on neratinib has led to dehydration, low blood pressure and kidney failure.",
      source: "nerlynx-label-2026",
      quote: "Advise patients to inform their healthcare provider immediately if severe (≥Grade 3) diarrhea or diarrhea associated with weakness, dizziness, or fever occurs during treatment with NERLYNX",
    },
  ],
  bestInClass: {
    statement: "The current US label (July 2026) makes both strategies standard from the first dose: scheduled loperamide for 56 days, or a two-week dose escalation with loperamide as needed. On the evidence read, the two-week escalation gave the lowest rates of grade 3 diarrhoea (13 per cent) and of diarrhoea-related discontinuation (3 per cent) in CONTROL, against 31 and 20 per cent with loperamide alone; but CONTROL's cohorts were not randomised against each other, so the comparison is indirect. No graded guideline on neratinib diarrhoea was found.",
    sources: ["nerlynx-label-2026", "control-2023"],
  },
  variants: [
    {
      name: "Four-week dose escalation (CONTROL DE2)",
      differs: "Neratinib 160 mg a day on days 1 to 14 and 200 mg a day on days 15 to 28, then 240 mg, with loperamide as needed.",
      evidence: "Grade 3 diarrhoea 27 per cent and diarrhoea-related discontinuation 6 per cent, both higher than the two-week schedule; not in the label. Open-label, non-comparative cohort.",
      sources: ["control-2023"],
    },
    {
      name: "Loperamide plus budesonide (CONTROL BL)",
      differs: "Adds budesonide 9 mg once daily on days 1 to 28 to scheduled loperamide.",
      evidence: "Grade 3 diarrhoea 28 per cent and diarrhoea-related discontinuation 11 per cent, against 31 and 20 per cent with loperamide alone. Open-label, non-comparative cohort.",
      sources: ["control-2023"],
    },
    {
      name: "Loperamide plus colestipol (CONTROL CL and CL-PRN)",
      differs: "Adds the bile acid binder colestipol 2 g twice daily on days 1 to 28, to scheduled loperamide (CL) or to loperamide as needed (CL-PRN).",
      evidence: "Grade 3 diarrhoea 21 per cent with scheduled loperamide and 33 per cent with loperamide as needed; discontinuations 4 and 8 per cent. Open-label, non-comparative cohorts. The label says other agents may be added to loperamide as clinically indicated.",
      sources: ["control-2023", "nerlynx-label-2026"],
    },
  ],
  grades: [
    { claim: "Grade 3 diarrhoea and discontinuation by strategy in CONTROL", grade: "open-label phase II, six non-comparative cohorts (n = 563)", source: "control-2023", quote: "All strategies reduced grade ≥3 diarrhea with the lowest incidence in DE1 (DE1 13%; colestipol + loperamide [CL] 21%, DE2 27%; budesonide + loperamide [BL] 28%; loperamide [L] 31%; colestipol + loperamide as needed [CL-PRN] 33%)." },
    { claim: "Without required prophylaxis (ExteNET), grade 3 diarrhoea occurred in 40 per cent", grade: "Label incidence from the registration trial", source: "nerlynx-label-2026", quote: "In the NERLYNX arm, Grade 3 diarrhea occurred in 40% and Grade 4 diarrhea occurred in 0.1% of patients." },
  ],
  sources: [
    { key: "nerlynx-label-2026", label: "NERLYNX (neratinib) tablets: US prescribing information", publisher: "Puma Biotechnology, via DailyMed, US National Library of Medicine", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d1e41dcf-e82a-47c2-a0ad-6c6eef621834", gradingScheme: "Product labelling; not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "control-2023", label: "Final findings from the CONTROL trial: strategies to reduce the incidence and severity of neratinib-associated diarrhea in patients with HER2-positive early-stage breast cancer", publisher: "The Breast", year: 2023, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9982309/", doi: "10.1016/j.breast.2022.12.003", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-upgrade-neratinib-two-week-dose-escalation-by-default"],
  gaps: [
    "No randomised comparison of the strategies exists in the sources read: CONTROL's cohorts were enrolled one after another and compared with historical controls.",
    "The EU summary of product characteristics was not read; whether it includes the dose escalation option is not shown here.",
    "No graded guideline on neratinib diarrhoea was found; the general ESMO diarrhoea guideline (2018) could not be read.",
    "CONTROL studied extended adjuvant neratinib only; in metastatic disease with capecitabine (NALA), anti-diarrhoeal prophylaxis was required in the first cycle and the strategies were not compared.",
  ],
  cancers: ["breast-her2-positive"],
  companies: ["puma-biotechnology"],
  technologies: ["her2-tyrosine-kinase-inhibitors"],
  drugs: ["neratinib", "loperamide"],
  trials: ["nala"],
  terms: ["ctcae-grading"],
  related: ["treatment-induced-diarrhoea-grading-and-management", "capecitabine"],
  sections: ["supportive-care"],
  tags: ["protocol", "diarrhoea", "supportive-care"],
});
