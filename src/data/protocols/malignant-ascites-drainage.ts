import { protocol } from "./helpers";

/*
 * Draining malignant ascites: paracentesis, and an indwelling peritoneal catheter drained at home.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * with curl and read as text, and every quote was checked by script (whitespace normalised, tags stripped, nothing
 * else).
 * - NICE HealthTech guidance 282 (formerly MTG9), PeritX peritoneal catheter drainage system (published 21 March 2012,
 *   last updated 19 July 2022): overview, recommendations, information about the system, committee discussion and
 *   update information, full text from nice.org.uk. No later update is listed.
 * - Japanese Clinical Practice Guideline for peritoneal dissemination 2021, malignant ascites section (Matsusaki et al.,
 *   Int J Clin Oncol): full text, Europe PMC (PMC8732893). Graded by the Minds/GRADE grid method.
 * - Cochrane review, Management of drainage for malignant ascites in gynaecological cancer (2019 update, pub3): abstract
 *   only. The Europe PMC full-text service returned an error again and the NCBI copy says the publisher does not allow
 *   the full text to be downloaded. Europe PMC and Crossref list no later version.
 * - Becker et al., Malignant ascites: systematic review and guideline for treatment (Eur J Cancer 2006): abstract only;
 *   no open copy was found.
 * - Stephenson and Gilbert, clinical guidelines on paracentesis for malignancy-related ascites (Palliat Med 2002): abstract
 *   only; the publisher's page refused a script (403).
 * - Harding et al., daycase paracentesis with free drainage (Br J Cancer 2012): full text, Europe PMC (PMC3464770).
 * - Cancer Research UK, "Treatment for ascites" (last reviewed 3 May 2024) and "Long term drains to treat ascites" (last
 *   reviewed 8 May 2024): added in the second pass as the source for what patients are told to report, which NICE does
 *   not state. Full pages read.
 * What the second pass changed: orders softened to the sources' own strength ("can be considered", "recommended as an
 * option", "potentially"); the warning signs moved from NICE, which does not give them, to Cancer Research UK, which
 * does; a sponsor's claim no longer described as the NICE committee's statement; the 2012 series corrected to 21
 * paracenteses in 18 women; reasons the sources do not give taken out of the "why" lines.
 * No European, US or UK national clinical guideline specific to malignant ascites was found in the first pass; the
 * BSG/BASL ascites guidance is written for cirrhosis and was not used. Every DOI was resolved through Crossref and
 * Europe PMC and its title checked.
 */
export const malignantAscitesDrainage = protocol({
  id: "malignant-ascites-drainage",
  name: "Malignant ascites: paracentesis and indwelling peritoneal catheter drainage",
  aka: ["ascitic drain", "abdominal paracentesis for cancer", "ascitic tap", "PeritX drain", "Rocket peritoneal catheter", "tunnelled peritoneal catheter", "draining fluid from the abdomen in cancer", "day-case paracentesis"],
  domain: "palliative",
  tldr: "When cancer causes fluid to build up in the abdomen, draining it through a thin tube (paracentesis) relieves bloating and breathlessness quickly, for a time. It can be done as a day case. Treating the cancer may stop the fluid building up. If it keeps coming back, a soft tube can be left in so it can be drained at home in small amounts. The evidence on how to drain is weak, so practice varies.",
  simple: "Fluid in the belly from cancer can be drained with a thin tube. The tube may stay in for a few hours, or a few days if there is a lot of fluid. If the fluid keeps coming back, a tube can stay in so you, a relative or a nurse can drain it at home. With a long-term tube, ring your advice line straight away about a high temperature, belly pain, red or swollen skin around the tube, or fluid that changes colour.",
  summary: "The evidence for draining malignant ascites is weak: a 2006 systematic review found no randomised trials of paracentesis, diuretics or shunts, and the 2019 Cochrane update found one high-risk-of-bias trial (catumaxomab) and concluded there is insufficient evidence to recommend how drainage should be managed in gynaecological cancer. Paracentesis gives good, temporary relief (Becker 2006) and can be considered the first-line treatment for massive ascites (Japanese guideline 2021). Practice carried over from cirrhosis (intermittent clamping, routine intravenous fluids, admission for several days) has been questioned in malignant ascites, though the 2006 review found drainage speed and intravenous hydration not sufficiently studied: a UK hospice guideline (2002) allowed up to 5 litres to drain without clamping, left drains in for no more than 6 hours and gave fluids only when specifically indicated, and a UK series (2012) carried out 21 paracenteses in 18 women without intermittent clamping (in 4 the drain was clamped for a fall in systolic pressure below 95 mm Hg; none felt unwell) and then drained to dryness as a day case, without intravenous fluids, in 18 of 19 procedures. Diuretics should be considered and judged individually (Becker 2006). Chemotherapy is strongly recommended for ovarian cancer with massive ascites (strong, evidence A), weakly for gastric cancer after careful evaluation of the person's general condition (weak, evidence C), and generally not for other cancers (evidence D). For treatment-resistant, recurrent ascites NICE recommends an indwelling peritoneal catheter (PeritX) as an option, drained into 1-litre vacuum bottles at home; its 2022 cost model estimates a saving of £1,095 a person against inpatient large-volume paracentesis and an additional cost of £896 a person against paracentesis as an outpatient procedure. The Japanese guideline recommends against peritoneovenous (Denver) shunts because of frequent, sometimes fatal complications, and supports cell-free and concentrated ascites reinfusion (CART) with a weak grade.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer", "multidisciplinary-team"],
    where: ["chemotherapy-day-unit", "ward", "home", "community", "outpatient-clinic"],
  },
  population: "Adults with symptomatic ascites caused by cancer. It is most commonly seen in ovarian cancer; the other cancers the 2012 UK series names are primary peritoneal, endometrial, breast, pancreatic and gastrointestinal. NICE's catheter recommendation is scoped to treatment-resistant, recurrent malignant ascites, and the Japanese recommendations to massive ascites with peritoneal dissemination. Ascites from liver cirrhosis arises differently and is not covered.",
  trigger: "Abdominal swelling, discomfort, breathlessness, nausea or early fullness from malignant ascites.",
  steps: [
    {
      action: "Consider paracentesis as the first treatment for massive malignant ascites",
      why: "Draining the fluid usually gives prompt, temporary relief of symptoms, and it can be done easily at any hospital.",
      source: "jp-2021",
      quote: "However, since it can be easily performed at any facility, it can be considered as the first-line treatment for massive ascites.",
      grade: "Not graded (general statement in the guideline)",
    },
    {
      action: "Treat the underlying cancer where it is likely to respond, above all in ovarian cancer",
      why: "Ovarian cancer is very sensitive to chemotherapy, and long-term survival can be expected even with a large amount of fluid. For gastric cancer the recommendation is weak, and for other cancers chemotherapy is generally not recommended for this purpose.",
      source: "jp-2021",
      quote: "Ovarian cancer is extremely sensitive to chemotherapy. Although most patients with advanced PD have a large amount of ascites, long-term survival can be expected even from this condition. Chemotherapy is strongly recommended.",
      grade: "Strength of recommendation: Strong; strength of evidence: A; consensus 100% (ovarian). Gastric cancer: weak, C. Other cancers: not recommended, D.",
    },
    {
      action: "Consider letting the drain run freely rather than clamping it at intervals, checking blood pressure and how the person feels",
      why: "Intermittent clamping comes from experience in liver cirrhosis and a perceived risk of low blood pressure. In this series of 21 drainages the drain was clamped in 4 because systolic pressure fell below 95 mm Hg, and none of those people felt unwell.",
      source: "harding-2012",
      quote: "Free drainage of malignant ascites is safe.",
      grade: "Observational study, single centre, 21 paracenteses in 18 women (no grade)",
    },
    {
      action: "Give intravenous fluids only when there is a specific reason, not routinely",
      why: "Whether a drip during drainage helps has not been studied enough. After this hospice guideline was introduced on an oncology ward, no one in the later group had low blood pressure with symptoms.",
      source: "stephenson-2002",
      quote: "giving intravenous fluids only when specifically indicated",
      grade: "Local guideline based on limited evidence (no grade)",
    },
    {
      action: "Consider day-case paracentesis for people who are well enough, with the drain placed under ultrasound guidance early in the day and removed the same day",
      why: "In this series 18 of 19 day-case drainages were complete by the end of the day, with the drain placed before 10 in the morning, and 5 of the 7 people who had been drained as inpatients before preferred the day case. Those chosen had a performance status of 0 to 2, normal platelet counts and clotting, and were not taking warfarin.",
      source: "harding-2012",
      quote: "Daycase paracentesis is feasible, cost-effective and reduces hospital admissions, and potentially represents the standard of care for patients with malignant ascites.",
      grade: "Observational study, single centre, 19 paracenteses in 13 people (no grade)",
    },
    {
      action: "Consider diuretics, but judge their use person by person",
      why: "The published data on diuretics in malignant ascites conflict, and the review found no randomised trial.",
      source: "becker-2006",
      quote: "The use of diuretics therefore should be considered in all patients, but has to be evaluated individually.",
      grade: "Systematic review; evidence weak (no randomised trials)",
    },
    {
      action: "For treatment-resistant ascites that keeps coming back, offer an indwelling peritoneal catheter as an option, deciding together with the patient",
      why: "Draining small amounts often at home avoids regular hospital visits and inpatient stays for large-volume drainage. NICE says the decision to start should be shared between clinicians and patients.",
      source: "nice-htg282",
      quote: "The PeritX system is recommended as an option for drainage of treatment-resistant, recurrent malignant peritoneal ascites.",
      grade: "Not graded (NICE HealthTech guidance 1.1, 'recommended as an option')",
    },
    {
      action: "Train the community nurse, the patient or a carer to drain the catheter at home into the vacuum bottles, in smaller amounts more often",
      why: "The NICE committee was advised that quality of life improves mainly through avoiding hospital visits and stays, and through relief of symptoms by frequent drainage of small volumes.",
      source: "nice-htg282",
      quote: "The committee recognised that training is needed for community nurses, patients or carers to perform drainage procedures in a community setting.",
      grade: "Not graded (NICE committee consideration 3.22)",
    },
    {
      action: "Ask the patient and carers to ring their advice line straight away about a high temperature, abdominal pain, red or swollen skin around the drain, or drained fluid that changes colour, and to tell the team if fluid leaks, stops draining, or the drain falls out or seems to have moved",
      why: "These can be signs of infection, which is treated with antibiotics, or of a blocked or displaced drain. A severe infection or a blockage that does not clear may mean the drain has to come out.",
      source: "cruk-long-term-drains",
      quote: "Sometimes you can get an infection in the cuts made to put in the drain, or in your abdomen.",
      grade: "Patient information (not graded)",
    },
  ],
  bestInClass: {
    statement: "There is no high-grade guideline for draining malignant ascites, and the sources agree that the evidence is weak. The best supported approach now combines: paracentesis, which can be considered first-line relief for massive ascites (Japanese guideline 2021); free drainage without routine clamping or routine intravenous fluids (UK hospice guideline 2002 and UK series 2012, neither randomised), as a day case where the person is well enough (UK series 2012, whose authors say only that day-case drainage potentially represents the standard of care); chemotherapy where the cancer responds (strong for ovarian cancer, weak for gastric); and, for treatment-resistant recurrent ascites, an indwelling peritoneal catheter drained at home as an option (NICE HealthTech guidance 282). The Japanese guideline and NICE differ in emphasis: Japan grades CART as an option and recommends against Denver shunts; NICE assessed only the PeritX catheter.",
    sources: ["jp-2021", "harding-2012", "stephenson-2002", "nice-htg282", "cochrane-2019", "becker-2006"],
  },
  variants: [
    {
      name: "Intermittent clamping and limited volumes",
      differs: "Clamps the drain after set volumes, or drains small amounts (1 to 3 litres) at a time.",
      evidence: "Intermittent clamping rests on historical experience in liver cirrhosis (Harding 2012). The 2021 Japanese guideline reports that drainage of 1 to 3 litres can be performed safely according to the Japanese Society of Palliative Medicine, and itself notes that with large ascites a small drainage relieves symptoms poorly and the fluid returns quickly, while a large drainage raises concern about acute circulatory or renal failure. The UK series concluded free drainage is safe.",
      sources: ["harding-2012", "jp-2021"],
    },
    {
      name: "Hospice protocol: up to 5 litres, drain out within 6 hours",
      differs: "Ultrasound only when the diagnosis is uncertain, up to 5 litres without clamping, drain left no more than 6 hours.",
      evidence: "Exeter hospice guideline (2002); after its introduction on the adjoining hospital's oncology ward, prior ultrasound use, the time drains were left in and length of stay for planned procedures fell significantly, with no symptomatic hypotension in the later group. Retrospective before-and-after case note review over 6 months each side; abstract read, which gives no patient numbers.",
      sources: ["stephenson-2002"],
    },
    {
      name: "Cell-free and concentrated ascites reinfusion therapy (CART)",
      differs: "Filters and concentrates the drained fluid and returns its protein to the person intravenously; the guideline reports more than 40,000 cases a year in Japan.",
      evidence: "Japanese guideline 2021: weak recommendation, evidence C (the statement's wording says 'strongly recommended', the printed grade says weak).",
      sources: ["jp-2021"],
    },
    {
      name: "Peritoneovenous (Denver) shunt",
      differs: "A permanent shunt returns ascites to the bloodstream.",
      evidence: "Japanese guideline 2021 recommends against it because complications are frequent and can be fatal (weak against, evidence C). Becker 2006: can control ascites but must be balanced against the risks.",
      sources: ["jp-2021", "becker-2006"],
    },
    {
      name: "Intraperitoneal catumaxomab after paracentesis",
      differs: "Gives the antibody catumaxomab into the abdomen after drainage.",
      evidence: "One randomised trial (245 participants) in the Cochrane review: median time to first deterioration in quality of life 47 to 49 days with catumaxomab against 19 to 26 days with paracentesis alone, very low certainty, high risk of bias, data not suitable for analysis. The most common severe adverse events with catumaxomab were abdominal pain and lymphopenia.",
      sources: ["cochrane-2019"],
    },
  ],
  grades: [
    { claim: "Chemotherapy for gastric cancer with massive ascites", grade: "Strength of recommendation: Weak; strength of evidence: C", source: "jp-2021", quote: "Chemotherapy is recommended after careful evaluation of general condition of patients." },
    { claim: "CART for massive malignant ascites", grade: "Strength of recommendation: Weak; strength of evidence: C; consensus 100%", source: "jp-2021", quote: "It is strongly recommended to perform CART for patients with massive cancerous ascites." },
    { claim: "No peritoneovenous shunt", grade: "Strength of recommendation: Weak; strength of evidence: C; consensus 70%", source: "jp-2021", quote: "However, the complications are frequent and can be fatal and thus abdominal-venous shunting is strongly recommended not to be performed." },
    { claim: "Intraperitoneal triamcinolone", grade: "Not recommended; strength of evidence: D", source: "jp-2021", quote: "It is a treatment option that is easy to operate and accessible to patients, but no clear recommendations can be made." },
    { claim: "Evidence on drainage management in gynaecological cancer", grade: "Very low certainty (Cochrane)", source: "cochrane-2019", quote: "Currently, there is insufficient evidence to recommend the most appropriate management of drainage for malignant ascites among women with gynaecological cancer, as there was only very low-certainty evidence from one small RCT at overall high risk of bias." },
    { claim: "Speed of drainage and intravenous hydration", grade: "Not sufficiently studied (systematic review)", source: "becker-2006", quote: "Fluid withdrawal speed and concurrent intravenous hydration is not sufficiently studied." },
    { claim: "Cost of the indwelling catheter against inpatient paracentesis", grade: "NICE cost model", source: "nice-htg282", quote: "The PeritX system can lead to an estimated cost saving of £1,095 per person compared with inpatient large-volume paracentesis." },
  ],
  sources: [
    {
      key: "nice-htg282",
      label: "PeritX peritoneal catheter drainage system for vacuum-assisted drainage of treatment-resistant, recurrent malignant ascites (HealthTech guidance 282, formerly MTG9)",
      publisher: "NICE",
      year: 2012,
      url: "https://www.nice.org.uk/guidance/htg282",
      gradingScheme: "NICE does not grade recommendations; medical technologies guidance recommends a device as an option or not. Published 21 March 2012; last updated 19 July 2022 with 2020 costs.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "jp-2021",
      label: "Clinical practice guideline for the treatment of malignant ascites: section summary in Clinical Practice Guideline for peritoneal dissemination 2021 (Matsusaki et al., Int J Clin Oncol)",
      publisher: "Guideline Committee of the Clinical Practice Guideline for peritoneal dissemination (International Journal of Clinical Oncology)",
      year: 2021,
      url: "https://doi.org/10.1007/s10147-021-02077-6",
      doi: "10.1007/s10147-021-02077-6",
      gradingScheme: "Minds 2017 and the GRADE grid method: strength of recommendation strong or weak, for or against, or not graded, decided by committee vote; body of evidence in four levels (the text names them strong, medium, weak and very weak, and the statements print letters, A, C and D here); consensus rate printed.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cochrane-2019",
      label: "Management of drainage for malignant ascites in gynaecological cancer (Cochrane Database Syst Rev 2019 update)",
      publisher: "Cochrane",
      year: 2019,
      url: "https://doi.org/10.1002/14651858.CD007794.pub3",
      doi: "10.1002/14651858.cd007794.pub3",
      gradingScheme: "GRADE certainty of evidence.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "becker-2006",
      label: "Malignant ascites: systematic review and guideline for treatment (Becker et al., Eur J Cancer 2006)",
      publisher: "European Journal of Cancer",
      year: 2006,
      url: "https://doi.org/10.1016/j.ejca.2005.11.018",
      doi: "10.1016/j.ejca.2005.11.018",
      gradingScheme: "Systematic review; evidence described as weak, no formal grades in the abstract.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "stephenson-2002",
      label: "The development of clinical guidelines on paracentesis for ascites related to malignancy (Stephenson and Gilbert, Palliat Med 2002)",
      publisher: "Palliative Medicine",
      year: 2002,
      url: "https://doi.org/10.1191/0269216302pm509oa",
      doi: "10.1191/0269216302pm509oa",
      gradingScheme: "Local hospice guideline with before-and-after audit; not graded.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "harding-2012",
      label: "Safety, cost-effectiveness and feasibility of daycase paracentesis in the management of malignant ascites with a focus on ovarian cancer (Harding et al., Br J Cancer 2012)",
      publisher: "British Journal of Cancer",
      year: 2012,
      url: "https://doi.org/10.1038/bjc.2012.343",
      doi: "10.1038/bjc.2012.343",
      gradingScheme: "Single-centre audit and prospective series; no grade.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-treating-ascites",
      label: "Treatment for ascites",
      publisher: "Cancer Research UK",
      year: 2024,
      url: "https://www.cancerresearchuk.org/about-cancer/coping/physically/fluid-abdomen-ascites/treating",
      gradingScheme: "Patient information; not graded. Last reviewed 3 May 2024, next review due 3 May 2027.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-long-term-drains",
      label: "Long term drains to treat ascites",
      publisher: "Cancer Research UK",
      year: 2024,
      url: "https://www.cancerresearchuk.org/about-cancer/coping/physically/fluid-abdomen-ascites/long-term-drains",
      gradingScheme: "Patient information; not graded. Last reviewed 8 May 2024, next review due 8 May 2027.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["ovarian", "gastric", "pancreatic", "peritoneal-mesothelioma"],
  drugs: ["catumaxomab"],
  technologies: ["indwelling-peritoneal-catheters", "pleural-and-peritoneal-shunts"],
  terms: ["peritoneal-metastasis", "colorectal-peritoneal-metastases", "pleural-effusion"],
  related: ["care-in-the-last-days-of-life", "indwelling-pleural-catheter-drainage-at-home"],
  gaps: [
    "The 2006 systematic review found no randomised trial of paracentesis, diuretics or shunting and called drainage speed and intravenous hydration not sufficiently studied; the 2019 Cochrane update found one randomised trial, of catumaxomab, and none comparing ways of managing the drain in gynaecological cancer.",
    "No European, US or UK national clinical guideline specific to malignant ascites was found when this page was first written; the British Society of Gastroenterology ascites guidance is written for cirrhosis and was not read or used.",
    "The Japanese guideline's wording and printed grades disagree for CART and for shunts ('strongly recommended' beside a weak grade); the printed grades are given here.",
    "The full texts of the Cochrane review, Becker 2006 and Stephenson 2002 were not read; only their abstracts. On 17 November 2026 they were tried again: the Cochrane full text is not released for download, no open copy of Becker 2006 was found, and the Stephenson 2002 publisher page refused a script. The steps on intravenous fluids and diuretics therefore rest on abstracts, and the hospice guideline's patient numbers are not known here.",
    "NICE does not say which symptoms a person with a catheter should report or how fast. That advice on this page comes from Cancer Research UK's patient page on long term drains (last reviewed 8 May 2024), which says to call the 24 hour advice line straight away for a high temperature, red or swollen skin around the drain, abdominal pain or a change in the colour of the fluid.",
    "The day-case and free-drainage steps rest on one London centre's series (21 and 19 procedures, almost all in ovarian cancer), which selected people with good performance status for the day case. Its authors call the day case potentially the standard of care, not an established one. NICE notes that practice varies across the UK between inpatient, outpatient and day-case drainage, and that inpatient is the most common.",
    "NICE assessed the PeritX system alone; other tunnelled peritoneal catheters (Rocket, Aspira) were not part of the guidance, and the manufacturers' home drainage instructions were not read.",
    "Who should have a catheter rather than repeated day-case paracentesis is not settled. NICE recognised uncertainty about the point in the care pathway at which the catheter is appropriate and had only observational studies, with very limited comparative data; the 2012 UK series suggests long-term drains may be considered in platinum-resistant ovarian cancer with recurrent ascites. Trials published since were not searched for in this pass.",
  ],
});
