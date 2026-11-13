import { protocol } from "./helpers";

/*
 * Draining malignant ascites: paracentesis, and an indwelling peritoneal catheter drained at home.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE HealthTech guidance 282 (formerly MTG9), PeritX peritoneal catheter drainage system (2012, updated 2022):
 *   recommendation, device description, clinical evidence and NHS considerations chapters, full text.
 * - Japanese Clinical Practice Guideline for peritoneal dissemination 2021, malignant ascites section (Matsusaki et al.,
 *   Int J Clin Oncol 2021): full text, Europe PMC (PMC8732893). Graded by the Minds/GRADE grid method.
 * - Cochrane review, Management of drainage for malignant ascites in gynaecological cancer (2019 update): abstract only;
 *   the Europe PMC full-text service returned an error.
 * - Becker et al., Malignant ascites: systematic review and guideline for treatment (Eur J Cancer 2006): abstract only.
 * - Stephenson and Gilbert, clinical guidelines on paracentesis for malignancy-related ascites (Palliat Med 2002): abstract
 *   only.
 * - Harding et al., daycase paracentesis with free drainage (Br J Cancer 2012): full text, Europe PMC (PMC3464770).
 * No European, US or UK national clinical guideline specific to malignant ascites was found; the BSG/BASL ascites
 * guidance is written for cirrhosis and was not used. Every DOI was resolved through Crossref and Europe PMC and its
 * title checked. Quotes were checked by script.
 */
export const malignantAscitesDrainage = protocol({
  id: "malignant-ascites-drainage",
  name: "Malignant ascites: paracentesis and indwelling peritoneal catheter drainage",
  aka: ["ascitic drain", "abdominal paracentesis for cancer", "ascitic tap", "PeritX drain", "Rocket peritoneal catheter", "tunnelled peritoneal catheter", "draining fluid from the abdomen in cancer", "day-case paracentesis"],
  domain: "palliative",
  tldr: "When cancer causes fluid to build up in the abdomen, draining it through a thin tube (paracentesis) quickly relieves bloating and breathlessness, often as a day case. Treating the cancer can slow it down. If the fluid keeps coming back, a soft tube can be left in place so it can be drained at home in small amounts. The evidence for the details of drainage is weak, so practice varies.",
  simple: "Fluid in the belly from cancer can be drained with a thin tube, usually in a day. If it keeps coming back, a tube can stay in so a nurse or your family can drain it at home. Tell your team about fever, belly pain or fluid leaking around the tube.",
  summary: "The evidence for draining malignant ascites is weak: a 2006 systematic review found no randomised trials of paracentesis, diuretics or shunts, and the 2019 Cochrane update found one high-risk-of-bias trial (catumaxomab) and concluded there is insufficient evidence to recommend how drainage should be managed in gynaecological cancer. Paracentesis gives good, temporary relief and is the first-line treatment (Japanese guideline 2021). Practice carried over from cirrhosis (intermittent clamping, routine intravenous fluids or albumin, admission for several days) is not supported in malignant ascites: a UK hospice guideline (2002) drained up to 5 litres without clamping, removed drains within 6 hours and gave fluids only when indicated, and a UK series (2012) drained 21 people without clamping (4 had an asymptomatic fall in systolic pressure below 95 mm Hg, none felt unwell) and then drained to dryness as a day case, without intravenous fluids, in 18 of 19 procedures. Diuretics should be considered and judged individually (Becker 2006). Systemic treatment is strongly recommended for ovarian cancer with massive ascites (strong, evidence A) and weakly for gastric cancer. For treatment-resistant, recurrent ascites NICE recommends an indwelling peritoneal catheter (PeritX) drained into 1-litre vacuum bottles at home, which saves an estimated £1,095 a person against inpatient large-volume paracentesis. The Japanese guideline recommends against peritoneovenous (Denver) shunts because of frequent, sometimes fatal complications, and supports cell-free and concentrated ascites reinfusion (CART) with a weak grade.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer", "multidisciplinary-team"],
    where: ["chemotherapy-day-unit", "ward", "home", "community", "outpatient-clinic"],
  },
  population: "Adults with symptomatic ascites caused by cancer in the peritoneum, most often ovarian, gastric, pancreatic, colorectal or breast cancer. Ascites from cirrhosis, including in people with liver cancer, is managed differently and is not covered.",
  trigger: "Abdominal swelling, discomfort, breathlessness, nausea or early fullness from malignant ascites.",
  steps: [
    {
      action: "Offer paracentesis as the first treatment for symptomatic, massive malignant ascites",
      why: "Draining the fluid relieves bloating and breathlessness quickly, and it can be done almost anywhere.",
      source: "jp-2021",
      quote: "However, since it can be easily performed at any facility, it can be considered as the first-line treatment for massive ascites.",
      grade: "Not graded (general statement in the guideline)",
    },
    {
      action: "Treat the underlying cancer where it is likely to respond, above all in ovarian cancer",
      why: "Shrinking the cancer can stop the fluid coming back, and people with ovarian cancer can live a long time even with a lot of fluid.",
      source: "jp-2021",
      quote: "Ovarian cancer is extremely sensitive to chemotherapy. Although most patients with advanced PD have a large amount of ascites, long-term survival can be expected even from this condition. Chemotherapy is strongly recommended.",
      grade: "Strength of recommendation: Strong; strength of evidence: A (ovarian). Gastric cancer: weak, C. Other cancers: not recommended, D.",
    },
    {
      action: "Let the drain run freely rather than clamping it at set volumes, watching blood pressure and how the person feels",
      why: "Clamping comes from liver disease, where large drainage can drop blood pressure; in cancer, free drainage has been safe in the studies done so far.",
      source: "harding-2012",
      quote: "Free drainage of malignant ascites is safe.",
      grade: "Observational study (no grade)",
    },
    {
      action: "Give intravenous fluids only when there is a specific reason, not routinely",
      why: "Routine drips keep people in hospital and have not been shown to help in malignant ascites.",
      source: "stephenson-2002",
      quote: "giving intravenous fluids only when specifically indicated",
      grade: "Local guideline based on limited evidence (no grade)",
    },
    {
      action: "Plan paracentesis as a day case where possible, with the drain placed early in the day under image guidance and removed the same day",
      why: "Most people can be drained completely in a working day and go home, which is what most patients prefer.",
      source: "harding-2012",
      quote: "Daycase paracentesis is feasible, cost-effective and reduces hospital admissions, and potentially represents the standard of care for patients with malignant ascites.",
      grade: "Observational study (no grade)",
    },
    {
      action: "Consider diuretics, but judge their use person by person",
      why: "Some people's ascites responds to diuretics and many do not; the trials have not been done.",
      source: "becker-2006",
      quote: "The use of diuretics therefore should be considered in all patients, but has to be evaluated individually.",
      grade: "Systematic review; evidence weak (no randomised trials)",
    },
    {
      action: "For ascites that keeps coming back despite treatment, offer an indwelling peritoneal catheter",
      why: "Draining small amounts often at home avoids repeated hospital visits and long drainage stays.",
      source: "nice-htg282",
      quote: "The PeritX system is recommended as an option for drainage of treatment-resistant, recurrent malignant peritoneal ascites.",
      grade: "Not graded (NICE HealthTech guidance 1.1, 'recommended as an option')",
    },
    {
      action: "Drain the catheter at home into the vacuum bottles, in smaller amounts more often, by a community nurse, the patient or a carer",
      why: "Frequent small drainages keep symptoms down instead of waiting for the abdomen to fill.",
      source: "nice-htg282",
      quote: "Better symptom control by frequent drainage of smaller quantities of ascitic fluid.",
      grade: "Not graded (NICE committee's statement of expected benefit)",
    },
    {
      action: "Ask the patient and carers to report fever, abdominal pain, redness or leakage at the exit site, and drainage that stops",
      why: "Infection, leakage and blockage are the common catheter problems, and most can be treated.",
      source: "nice-htg282",
      quote: "adverse events (catheter site infections, peritonitis, catheter occlusion, and haemorrhage or bowel perforation when the device is inserted)",
      grade: "Not graded (outcomes the NICE evidence review collected)",
    },
  ],
  bestInClass: {
    statement: "There is no high-grade guideline for draining malignant ascites, and the sources agree that the evidence is weak. The best supported approach now combines: paracentesis as first-line relief (Japanese guideline 2021); free drainage as a day case without routine clamping or intravenous fluids (UK hospice guideline 2002 and UK series 2012, both small and non-randomised); treatment of the cancer where it responds (strong for ovarian cancer); and, for treatment-resistant recurrent ascites, an indwelling peritoneal catheter drained at home (NICE HealthTech guidance 282). The Japanese guideline and NICE differ in emphasis: Japan grades CART as an option and recommends against Denver shunts; NICE assessed only the PeritX catheter.",
    sources: ["jp-2021", "harding-2012", "stephenson-2002", "nice-htg282", "cochrane-2019", "becker-2006"],
  },
  variants: [
    {
      name: "Intermittent clamping and limited volumes",
      differs: "Clamps the drain after set volumes, or drains small amounts (1 to 3 litres) at a time.",
      evidence: "Derived from cirrhosis practice (Harding 2012). The Japanese Society of Palliative Medicine guidance cited in the 2021 guideline drains 1 to 3 litres, while noting small drainages relieve symptoms poorly and refill quickly; free drainage was safe in the UK series.",
      sources: ["harding-2012", "jp-2021"],
    },
    {
      name: "Hospice protocol: up to 5 litres, drain out within 6 hours",
      differs: "Ultrasound only when the diagnosis is uncertain, up to 5 litres without clamping, drain left no more than 6 hours.",
      evidence: "Exeter hospice guideline (2002); after its introduction, ultrasound use, drain time and length of stay fell, with no symptomatic hypotension. Before-and-after case note review, abstract read.",
      sources: ["stephenson-2002"],
    },
    {
      name: "Cell-free and concentrated ascites reinfusion therapy (CART)",
      differs: "Filters and concentrates the drained fluid and returns its protein to the person intravenously; widely used in Japan.",
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
      evidence: "One randomised trial (245 participants) in the Cochrane review: longer time to deterioration in quality of life, very low certainty, high risk of bias.",
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
      gradingScheme: "NICE does not grade recommendations; medical technologies guidance recommends a device as an option or not.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "jp-2021",
      label: "Clinical practice guideline for the treatment of malignant ascites: section summary in Clinical Practice Guideline for peritoneal dissemination 2021 (Matsusaki et al., Int J Clin Oncol)",
      publisher: "Japanese Society for Peritoneal Dissemination guideline committee (International Journal of Clinical Oncology)",
      year: 2021,
      url: "https://doi.org/10.1007/s10147-021-02077-6",
      doi: "10.1007/s10147-021-02077-6",
      gradingScheme: "Minds 2017 and GRADE: strength of recommendation strong or weak, for or against, or not graded; strength of evidence A to D; consensus rate printed.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
  ],
  cancers: ["ovarian", "gastric", "pancreatic", "peritoneal-mesothelioma"],
  drugs: ["catumaxomab"],
  technologies: ["indwelling-peritoneal-catheters", "pleural-and-peritoneal-shunts"],
  terms: ["peritoneal-metastasis", "colorectal-peritoneal-metastases", "pleural-effusion"],
  related: ["care-in-the-last-days-of-life", "indwelling-pleural-catheter-drainage-at-home"],
  gaps: [
    "No randomised trial has compared drainage volumes, drainage speed, clamping, albumin or intravenous fluids in malignant ascites; the 2006 systematic review and the 2019 Cochrane update both found the evidence insufficient.",
    "No European, US or UK national clinical guideline specific to malignant ascites was found; the British Society of Gastroenterology ascites guidance is written for cirrhosis and was not read or used.",
    "The Japanese guideline's wording and printed grades disagree for CART and for shunts ('strongly recommended' beside a weak grade); the printed grades are given here.",
    "The full texts of the Cochrane review, Becker 2006 and Stephenson 2002 were not read; only their abstracts.",
    "NICE assessed the PeritX system alone; other tunnelled peritoneal catheters (Rocket, Aspira) were not part of the guidance, and the manufacturers' home drainage instructions were not read.",
    "Who should have a catheter rather than repeated day-case paracentesis (for example platinum-sensitive versus platinum-resistant ovarian cancer) has not been tested in a trial.",
  ],
});
