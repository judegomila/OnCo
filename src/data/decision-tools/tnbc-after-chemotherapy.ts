import type { Answers, DecisionTool, ToolCard, ToolSource } from "@/lib/decision-tools";

/**
 * TRIPLE-NEGATIVE BREAST CANCER AFTER CHEMOTHERAPY: what the pathology report at surgery means for the treatment
 * that follows. Inputs are the three items the sources turn on: the response on the pathology report (complete
 * response or the residual cancer burden class), the germline BRCA1/2 result, and whether pembrolizumab was part of
 * the treatment before surgery. Every card quotes its source word for word:
 *
 *   NICE TA886 (2023), olaparib for adjuvant treatment of BRCA mutation-positive HER2-negative high-risk early breast cancer
 *   NICE TA851 (2022), pembrolizumab for neoadjuvant and adjuvant treatment of triple-negative breast cancer
 *   NICE NG101 (updated 2025), early and locally advanced breast cancer: genetic testing (1.3.6), follow-up (1.15)
 *   Symmans et al., JCO 2017 and Yau et al., Lancet Oncology 2022 (residual cancer burden; abstracts read on Europe PMC)
 *   Masuda et al., CREATE-X, NEJM 2017; Tutt et al., OlympiA, NEJM 2021; Geyer et al., OlympiA overall survival, Annals of Oncology 2022
 *   Schmid et al., KEYNOTE-522, NEJM 2020 and 2024 (abstracts read on Europe PMC)
 *   Breast Cancer Now, genetic testing for altered breast cancer genes (the under-60 referral rule)
 *   the TNBC record's own standard-of-care row for stage II-III disease (src/data/cancers.ts), quoted and kept equal by
 *   src/lib/decision-tools.test.ts
 *
 * All read 24 September 2026. The aid does not rank or weigh: where a source is silent (a complete response in a BRCA
 * carrier; olaparib and capecitabine together) the card says so and points at the team.
 */
const asOf = "2026-09-24";

const TA886: ToolSource = { label: "NICE TA886: olaparib for adjuvant treatment of BRCA mutation-positive HER2-negative high-risk early breast cancer after chemotherapy, recommendation 1.1 (May 2023)", url: "https://www.nice.org.uk/guidance/ta886/chapter/1-Recommendations" };
const TA851: ToolSource = { label: "NICE TA851: pembrolizumab for neoadjuvant and adjuvant treatment of triple-negative early or locally advanced breast cancer, recommendation 1.1 (December 2022)", url: "https://www.nice.org.uk/guidance/ta851/chapter/1-Recommendations" };
const NG101: ToolSource = { label: "NICE NG101: early and locally advanced breast cancer, diagnosis and management, recommendations (updated April 2025)", url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations" };
const SYMMANS: ToolSource = { label: "Symmans et al., Long-term prognostic risk after neoadjuvant chemotherapy associated with residual cancer burden and breast cancer subtype, Journal of Clinical Oncology 2017", url: "https://doi.org/10.1200/JCO.2015.63.1010" };
const YAU: ToolSource = { label: "Yau et al., Residual cancer burden after neoadjuvant chemotherapy and long-term survival outcomes in breast cancer: a multicentre pooled analysis of 5161 patients, Lancet Oncology 2022", url: "https://doi.org/10.1016/S1470-2045(21)00589-1" };
const CREATE_X: ToolSource = { label: "Masuda et al., Adjuvant capecitabine for breast cancer after preoperative chemotherapy (CREATE-X), New England Journal of Medicine 2017", url: "https://doi.org/10.1056/NEJMoa1612645" };
const OLYMPIA: ToolSource = { label: "Tutt et al., Adjuvant olaparib for patients with BRCA1- or BRCA2-mutated breast cancer (OlympiA), New England Journal of Medicine 2021", url: "https://doi.org/10.1056/NEJMoa2105215" };
const OLYMPIA_OS: ToolSource = { label: "Geyer et al., Overall survival in the OlympiA phase III trial of adjuvant olaparib, Annals of Oncology 2022", url: "https://doi.org/10.1016/j.annonc.2022.09.159" };
const KN522_PCR: ToolSource = { label: "Schmid et al., Pembrolizumab for early triple-negative breast cancer (KEYNOTE-522), New England Journal of Medicine 2020", url: "https://doi.org/10.1056/NEJMoa1910549" };
const KN522_OS: ToolSource = { label: "Schmid et al., Overall survival with pembrolizumab in early-stage triple-negative breast cancer (KEYNOTE-522), New England Journal of Medicine 2024", url: "https://doi.org/10.1056/NEJMoa2409932" };
const BCN_GENETIC: ToolSource = { label: "Breast Cancer Now: genetic testing for altered breast cancer genes", url: "https://breastcancernow.org/about-breast-cancer/awareness/breast-cancer-in-families/genetic-testing-for-altered-breast-cancer-genes" };
const ROW_NCCN: ToolSource = { label: "OnCo standard-of-care row for triple-negative breast cancer, stage II-III (src/data/cancers.ts), written from NCCN Guidelines: Breast Cancer (category 1 for KEYNOTE-522; category 2A, preferred, for adjuvant olaparib in germline BRCA carriers)", url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1419" };

/** Row text quoted from the tnbc record in src/data/cancers.ts; src/lib/decision-tools.test.ts keeps this equal to the data. */
export const QUOTED_TNBC_ROWS: Record<string, string> = {
  "Stage II-III": "Neoadjuvant pembrolizumab + carboplatin/paclitaxel → AC/EC, surgery, adjuvant pembrolizumab (KEYNOTE-522). Germline BRCA + residual disease: olaparib 1 year (OlympiA). Residual disease without BRCA: capecitabine (CREATE-X). Radiation per stage.",
};

const LINKS = {
  cancer: { label: "Triple-negative breast cancer", href: "/cancers/tnbc/" },
  decisions: { label: "TNBC decisions", href: "/cancers/tnbc/decisions/" },
  first60: { label: "The first 60 days", href: "/first-60-days/tnbc/" },
  rcb: { label: "Residual cancer burden (RCB)", href: "/terms/rcb/" },
  pcr: { label: "Pathological complete response (pCR)", href: "/terms/pcr/" },
  olaparib: { label: "Olaparib", href: "/drugs/olaparib/" },
  capecitabine: { label: "Capecitabine", href: "/drugs/capecitabine/" },
  pembrolizumab: { label: "Pembrolizumab", href: "/drugs/pembrolizumab/" },
  olympia: { label: "OlympiA", href: "/trials/olympia/" },
  kn522: { label: "KEYNOTE-522", href: "/trials/keynote-522/" },
  optimice: { label: "OptimICE-pCR", href: "/trials/optimice-pcr/" },
  germline: { label: "Germline (hereditary) testing", href: "/technologies/germline-testing/" },
  brca: { label: "BRCA1 / BRCA2", href: "/targets/brca/" },
  handFoot: { label: "Hand-foot syndrome", href: "/terms/hand-foot-syndrome/" },
  irae: { label: "Immune-related adverse events", href: "/terms/irae/" },
  mastectomy: { label: "Mastectomy", href: "/terms/mastectomy/" },
};

const cards: ToolCard[] = [
  { id: "pcr", title: "No invasive cancer left in the breast or nodes: the outlook is good", tone: "watch",
    quotes: [
      { text: "Estimates of 10-year relapse-free survival rates in the four RCB classes (pathologic complete response, RCB-I, RCB-II, and RCB-III) were 86%, 81%, 55%, and 23% for triple receptor-negative", source: SYMMANS },
      { text: "Whether the addition of pembrolizumab to neoadjuvant chemotherapy would significantly increase the percentage of patients with early triple-negative breast cancer who have a pathological complete response (defined as no invasive cancer in the breast and negative nodes) at definitive surgery is unclear.", source: KN522_PCR },
    ],
    meaning: "A complete response means the chemotherapy did its work: in the long-running Symmans series 86 of 100 people with triple-negative disease and a complete response were free of relapse at 10 years. Nothing extra is added to treatment on the strength of this result; radiotherapy is decided on the stage before treatment and the operation done, and follow-up is annual mammography.",
    questions: ["Was the response complete in both the breast and the lymph nodes?", "Do I still need radiotherapy, and to which areas?"],
    links: [LINKS.pcr, LINKS.rcb, LINKS.decisions] },

  { id: "rcb-class", title: "Residual disease: the RCB class is the number that carries the outlook", tone: "info",
    quotes: [
      { text: "Estimates of 10-year relapse-free survival rates in the four RCB classes (pathologic complete response, RCB-I, RCB-II, and RCB-III) were 86%, 81%, 55%, and 23% for triple receptor-negative", source: SYMMANS },
      { text: "RCB score was prognostic within each breast cancer subtype, with higher RCB score significantly associated with worse event-free survival.", source: YAU },
    ],
    meaning: "Residual cancer burden grades what was left after chemotherapy from I (a little) to III (a lot). For triple-negative disease the 10-year relapse-free figures were 81 in 100 for RCB-I, 55 for RCB-II and 23 for RCB-III in the Symmans series, and the pooled analysis of 5,161 patients confirmed the class is prognostic in every subtype. It is the reason the treatments on the cards below are offered.",
    questions: ["What was my RCB class and index, and how many nodes still contained cancer?"],
    links: [LINKS.rcb, LINKS.decisions] },

  { id: "rcb-not-reported", title: "Residual disease but no RCB class reported: ask for it", tone: "discuss",
    quotes: [{ text: "the association we observed between RCB and a patient's residual risk suggests that prospective evaluation of RCB could be considered to become part of standard pathology reporting after neoadjuvant therapy.", source: YAU }],
    meaning: "The pooled analysis asked pathologists to report the residual cancer burden after chemotherapy. If your report gives only a tumour size or a yp-stage, the class can usually be calculated from the measurements already recorded; ask the team to state it, because it is the clearest guide to the risk the treatments below are meant to lower.",
    questions: ["Can the pathologist report the residual cancer burden class from the specimen?"],
    links: [LINKS.rcb] },

  { id: "olaparib", title: "Residual disease with a germline BRCA1 or BRCA2 variant: a year of olaparib is NICE-recommended", tone: "discuss",
    quotes: [
      { text: "Olaparib (alone or with endocrine therapy) is recommended, within its marketing authorisation, as an option for the adjuvant treatment of HER2‑negative high-risk early breast cancer that has been treated with neoadjuvant or adjuvant chemotherapy in adults with germline BRCA1 or 2 mutations.", source: TA886 },
      { text: "Among patients with high-risk, HER2-negative early breast cancer and germline BRCA1 or BRCA2 pathogenic or likely pathogenic variants, adjuvant olaparib after completion of local treatment and neoadjuvant or adjuvant chemotherapy was associated with significantly longer survival free of invasive or distant disease than was placebo.", source: OLYMPIA },
      { text: "Four-year OS was 89.8% in the olaparib group and 86.4% in the placebo group", source: OLYMPIA_OS },
      { text: `Stage II-III: ${QUOTED_TNBC_ROWS["Stage II-III"]}`, source: ROW_NCCN },
    ],
    meaning: "For people who carry an inherited BRCA1 or BRCA2 variant and still had invasive cancer at surgery, a year of olaparib tablets after surgery and radiotherapy is funded on the NHS. In OlympiA it reduced invasive recurrence (82.7% against 75.4% free of invasive disease at 4 years) and improved survival. It starts after radiotherapy, and pembrolizumab, where given, continues alongside; olaparib and capecitabine were not tested together, so ask which the team proposes and why.",
    questions: ["When would olaparib start relative to radiotherapy and pembrolizumab?", "Which blood tests will I have on olaparib, and what are the signs of anaemia to report?", "Would capecitabine ever be used as well or instead for me?"],
    links: [LINKS.olaparib, LINKS.olympia, LINKS.brca, LINKS.decisions] },

  { id: "capecitabine", title: "Residual disease without a BRCA variant: capecitabine is the usual offer", tone: "discuss",
    quotes: [
      { text: "Among patients with triple-negative disease, the rate of disease-free survival was 69.8% in the capecitabine group versus 56.1% in the control group (hazard ratio for recurrence, second cancer, or death, 0.58; 95% CI, 0.39 to 0.87), and the overall survival rate was 78.8% versus 70.3% (hazard ratio for death, 0.52; 95% CI, 0.30 to 0.90).", source: CREATE_X },
      { text: "The hand-foot syndrome, the most common adverse reaction to capecitabine, occurred in 73.4% of the patients in the capecitabine group.", source: CREATE_X },
      { text: `Stage II-III: ${QUOTED_TNBC_ROWS["Stage II-III"]}`, source: ROW_NCCN },
    ],
    meaning: "CREATE-X gave capecitabine tablets for six to eight cycles after surgery to people with HER2-negative residual disease, and the gain was clearest in triple-negative disease: 79 rather than 70 of 100 alive at 5 years. It is the OnCo record's standard for residual disease without a BRCA variant. CREATE-X predates pembrolizumab, so how the two fit together is a matter of judgement; sore, red or peeling palms and soles are common and the dose is adjusted for them.",
    questions: ["How many cycles, and does it run alongside pembrolizumab?", "What do I do at the first sign of sore hands or feet, or diarrhoea?", "Is there a trial for residual disease I could join instead?"],
    links: [LINKS.capecitabine, LINKS.handFoot, LINKS.decisions] },

  { id: "get-tested", title: "BRCA status not yet known: the result decides between olaparib and capecitabine, and matters for your family", tone: "refer",
    quotes: [
      { text: "Offer genetic testing for BRCA1 and BRCA2 mutations to women under 50 years with triple-negative breast cancer , including those with no family history of breast or ovarian cancer", source: NG101 },
      { text: "If you were diagnosed with triple negative breast cancer under the age of 60, you should be offered a referral to a specialist family history clinic or a regional genetics clinic to discuss genetic testing , regardless of your family history of breast cancer.", source: BCN_GENETIC },
      { text: "Olaparib (alone or with endocrine therapy) is recommended, within its marketing authorisation, as an option for the adjuvant treatment of HER2‑negative high-risk early breast cancer that has been treated with neoadjuvant or adjuvant chemotherapy in adults with germline BRCA1 or 2 mutations.", source: TA886 },
    ],
    meaning: "Testing is offered to everyone with triple-negative breast cancer under 60 in the UK, and the result changes what is offered after surgery: olaparib is funded only for carriers. It also tells relatives whether predictive testing is open to them. If the result is not back, ask for it to be chased before the treatment after surgery is fixed; Breast Cancer Now says results usually take 1 to 3 months.",
    questions: ["Has the germline test been sent, and when is the result due?", "If it is late, what would you offer in the meantime?"],
    links: [LINKS.germline, LINKS.brca, LINKS.olaparib] },

  { id: "pcr-brca", title: "Complete response in a BRCA carrier: olaparib was not studied here", tone: "discuss",
    quotes: [
      { text: "We conducted a phase 3, double-blind, randomized trial involving patients with human epidermal growth factor receptor 2 (HER2)-negative early breast cancer with BRCA1 or BRCA2 germline pathogenic or likely pathogenic variants and high-risk clinicopathological factors who had received local treatment and neoadjuvant or adjuvant chemotherapy.", source: OLYMPIA },
      { text: "Olaparib (alone or with endocrine therapy) is recommended, within its marketing authorisation, as an option for the adjuvant treatment of HER2‑negative high-risk early breast cancer that has been treated with neoadjuvant or adjuvant chemotherapy in adults with germline BRCA1 or 2 mutations.", source: TA886 },
    ],
    meaning: "OlympiA recruited people with high-risk features; for those treated with chemotherapy before surgery, residual disease was the high-risk feature, so a complete response after neoadjuvant treatment was not the population studied and the NICE recommendation speaks of high-risk disease. A complete response is good news; the BRCA result still matters for the other breast, the ovaries and your relatives, which is a conversation with the genetics team rather than a treatment decision.",
    questions: ["Given my complete response, does the team consider me high risk in the sense NICE uses?", "When do we discuss risk-reducing options and testing for my relatives?"],
    links: [LINKS.brca, LINKS.germline, LINKS.mastectomy] },

  { id: "brca-family", title: "A germline variant: what it means for relatives", tone: "refer",
    quotes: [
      { text: "If an altered gene is found (a positive result), this confirms your chances of developing breast cancer are higher than the general population. You may also have a higher chance of developing other types of cancer.", source: BCN_GENETIC },
      { text: "Your genetics team will know which altered gene runs in your family. They can then search for the alteration more easily in other family members, who can be tested to see if they also carry it (predictive genetic testing).", source: BCN_GENETIC },
    ],
    meaning: "Each child of a carrier has a 1 in 2 chance of inheriting the variant, and brothers and sisters may carry it too. The genetics team explains who can be offered predictive testing and how to tell them; nobody is tested without their own consent.",
    questions: ["Who in my family could be offered testing, and is there a letter I can give them?"],
    links: [LINKS.brca, LINKS.germline] },

  { id: "pembro-continues", title: "Pembrolizumab continues after surgery whatever the pathology showed", tone: "info",
    quotes: [
      { text: "Pembrolizumab is recommended, within its marketing authorisation, as an option with chemotherapy for neoadjuvant treatment and then continued alone as adjuvant treatment after surgery for adults with triple-negative: early breast cancer at high risk of recurrence or locally advanced breast cancer.", source: TA851 },
      { text: "After definitive surgery, patients received adjuvant pembrolizumab (pembrolizumab-chemotherapy group) or placebo (placebo-chemotherapy group) every 3 weeks for up to nine cycles.", source: KN522_OS },
      { text: "The estimated overall survival at 60 months was 86.6% (95% confidence interval [CI], 84.0 to 88.8) in the pembrolizumab-chemotherapy group, as compared with 81.7% (95% CI, 77.5 to 85.2) in the placebo-chemotherapy group", source: KN522_OS },
    ],
    meaning: "In KEYNOTE-522 everyone who had pembrolizumab before surgery went on to up to nine more doses afterwards, whether or not the response was complete, and that is how NICE recommends it. Whether people with a complete response can safely stop is the question the OptimICE-pCR trial is asking; ask whether it is open to you. Immune-related side effects can still begin during this phase.",
    questions: ["How many doses remain, and every 3 or 6 weeks?", "Is the OptimICE-pCR trial open to me?"],
    links: [LINKS.pembrolizumab, LINKS.kn522, LINKS.optimice, LINKS.irae] },

  { id: "no-pembro", title: "Pembrolizumab was not given before surgery: NICE's recommendation starts it before surgery", tone: "discuss",
    quotes: [{ text: "Pembrolizumab is recommended, within its marketing authorisation, as an option with chemotherapy for neoadjuvant treatment and then continued alone as adjuvant treatment after surgery for adults with triple-negative: early breast cancer at high risk of recurrence or locally advanced breast cancer.", source: TA851 }],
    meaning: "The NHS recommendation is for pembrolizumab started with chemotherapy before surgery and continued afterwards; the trial did not test starting it only after surgery. If you did not have it, there was usually a reason (a smaller tumour, surgery first, an autoimmune condition, or treatment before December 2022). Worth asking what the reason was and whether it changes anything now.",
    questions: ["Why was pembrolizumab not part of my treatment, and does that leave any option open now?"],
    links: [LINKS.pembrolizumab, LINKS.kn522] },

  { id: "follow-up", title: "Whatever the result: a written care plan and annual mammograms", tone: "info",
    quotes: [
      { text: "Offer annual mammography for 5 years to all people who have had or are being treated for breast cancer, including DCIS.", source: NG101 },
      { text: "Ensure all people who have had treatment for breast cancer have an agreed, written care plan, recorded in their notes by a named healthcare professional (or professionals) from the multidisciplinary team. Give a copy to the person and to their GP.", source: NG101 },
    ],
    meaning: "NICE asks for a written plan that names your professionals, gives the dates for reviewing any treatment after surgery, the mammography schedule, the signs to look out for and the numbers to ring. Ask for your copy. Triple-negative relapses cluster in the first three years, so knowing what to report matters more than extra scans, which NICE does not recommend routinely.",
    questions: ["Can I have my written care plan, with the signs to report and the numbers to ring?"],
    links: [LINKS.first60, LINKS.cancer] },
];

function decide(a: Answers): string[] {
  const out: string[] = [];
  const residual = a.response !== "pcr";
  if (!residual) out.push("pcr");
  else if (a.response === "unknown") out.push("rcb-not-reported");
  if (residual && a.brca === "variant") out.push("olaparib");
  if (residual && a.brca === "none") out.push("capecitabine");
  if (a.brca === "not-tested") out.push("get-tested");
  if (residual && a.response !== "unknown") out.push("rcb-class");
  if (!residual && a.brca === "variant") out.push("pcr-brca");
  if (a.brca === "variant") out.push("brca-family");
  out.push(a.pembro === "yes" ? "pembro-continues" : "no-pembro");
  out.push("follow-up");
  return out;
}

export const tnbcAfterChemotherapyTool: DecisionTool = {
  id: "tnbc-after-chemotherapy",
  cancerId: "tnbc",
  entityIds: ["tnbc", "rcb", "pcr"],
  title: "Triple-negative breast cancer after chemotherapy: what the pathology report means for the treatment that follows",
  short: "After chemotherapy aid",
  lede: "Enter what the pathology report at surgery showed, your germline BRCA result and whether pembrolizumab was part of the treatment before surgery, and read the statements that apply, quoted word for word from NICE, the trials and the residual cancer burden studies. An educational aid to prepare for the conversation with your oncologist, not advice. Nothing you enter leaves this page.",
  icon: "layers",
  guideline: TA886,
  sources: [TA886, TA851, NG101, SYMMANS, YAU, CREATE_X, OLYMPIA, OLYMPIA_OS, KN522_PCR, KN522_OS, BCN_GENETIC, ROW_NCCN],
  asOf,
  inputs: [
    { id: "response", label: "What the pathology report at surgery showed", hint: "A pathological complete response means no invasive cancer in the breast and no cancer in the lymph nodes. Residual disease is graded by residual cancer burden (RCB) class I to III.", icon: "layers",
      options: [{ value: "pcr", label: "Complete response (no invasive cancer left)" }, { value: "rcb1", label: "Residual disease, RCB class I" }, { value: "rcb23", label: "Residual disease, RCB class II or III" }, { value: "unknown", label: "Residual disease, RCB class not reported" }] },
    { id: "brca", label: "Germline BRCA1 or BRCA2 result", hint: "The blood test for an inherited variant, not the tumour test.", icon: "question",
      options: [{ value: "variant", label: "Pathogenic or likely pathogenic variant found" }, { value: "none", label: "No variant found" }, { value: "not-tested", label: "Not tested, or result awaited" }] },
    { id: "pembro", label: "Pembrolizumab given with the chemotherapy before surgery", icon: "clock",
      options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
  ],
  cards,
  decide,
  questions: [
    "Can I have a copy of the pathology report, with the residual cancer burden class if there was residual disease?",
    "Do I need radiotherapy, to which areas, and how does its timing fit with the tablets or infusions after surgery?",
    "Is there a trial for people in my situation, for example one guided by circulating tumour DNA?",
    "Who is my key worker for the year after surgery, and what is the 24-hour number?",
  ],
  notes: [
    "The aid covers the treatments NICE and the OnCo record name for triple-negative breast cancer after chemotherapy before surgery; it does not cover people who had surgery first, HER2-low status, or radiotherapy decisions, which are on the decisions page.",
    "Residual cancer burden figures are from one institution's cohorts (Symmans 2017) treated before pembrolizumab; the pooled analysis (Yau 2022) confirms the class is prognostic across settings but the exact percentages will differ for people treated today.",
    "CREATE-X and OlympiA were run before pembrolizumab became standard, so how each fits alongside it is a judgement your team makes; the cards quote what was tested.",
    "Nothing you enter is stored or sent anywhere.",
  ],
  links: [LINKS.decisions, LINKS.first60, LINKS.rcb, LINKS.pcr, LINKS.cancer],
};
