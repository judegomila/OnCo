import { protocol } from "./helpers";

/*
 * Malignant pericardial effusion: recognising tamponade, echocardiography, drainage, cytology, and preventing
 * recurrence (extended drainage, balloon pericardiotomy, pericardial window).
 *
 * What was read, and how (first on 11 November 2026; every claim re-read against the re-fetched raw text in a
 * second accuracy pass on 16 November 2026):
 * - PMAP randomised trial of percutaneous balloon pericardiotomy against pericardiocentesis (European Heart Journal,
 *   published online 30 July 2025, in print 2026;47(9):1118-1120): open access, full text XML from Europe PMC
 *   (PMC13017577). Its one correction notice (10.1093/eurheartj/ehaf683, PMC13058449) was also read: it corrects the
 *   spelling of the first author's name and no figure.
 * - Malignant pericardial effusion: a systematic review (CJC Open 2024): open access, full text XML from Europe PMC
 *   (PMC11357784). It is a review of 41 case reports; its statements about guidelines cite the 2015 ESC guideline.
 * - 2025 ESC Guidelines for the management of myocarditis and pericarditis and 2022 ESC Guidelines on cardio-oncology:
 *   on 16 November 2026 academic.oup.com again returned 403 to a script for both, Europe PMC holds no abstract or
 *   full text for either, and a university repository copy of the 2022 guideline also returned 403. Not read.
 * Every DOI was resolved through Crossref and its title checked. Quotes checked by script against the raw text.
 * The second pass removed symptoms and explanations that neither readable source states (a fast heartbeat,
 * faintness and low blood pressure as presenting signs; "draining even some fluid relieves it"; "only treating the
 * cancer stops the fluid being made"; "time at home") and added what the sources do say and the page had left out
 * (the trade-off of extended drainage, the cytology yield in the review's own cases, PMAP's survival figures,
 * procedural success, serious adverse events and who it excluded).
 * The patient safety-net step (which symptoms to report) was restored from the patient version of the US National
 * Cancer Institute's PDQ summary on cardiopulmonary syndromes on 17 November 2026: the page was fetched raw with curl,
 * read as text, and the quote checked by script. It says to check with your doctor and that tamponade must be treated
 * right away; it names no emergency number, so the one-line version no longer says to ring 999. No Macmillan, Cancer
 * Research UK, NHS or British Heart Foundation page on pericardial effusion was found that day.
 */
export const malignantPericardialEffusion = protocol({
  id: "malignant-pericardial-effusion",
  name: "Malignant pericardial effusion: tamponade, drainage, cytology and preventing recurrence",
  aka: ["MPE", "pericardial effusion in cancer", "cardiac tamponade in cancer", "pericardiocentesis", "balloon pericardiotomy", "pericardial window"],
  domain: "emergencies",
  tldr: "Cancer can cause fluid to build up in the sac around the heart. A large amount can press on the heart (tamponade), which is an emergency; breathlessness is the commonest symptom. A heart ultrasound finds the fluid, and a needle and drain remove it. Because it often comes back, doctors may leave a drain in for a few days or make an opening in the sac.",
  simple: "If you have cancer and become short of breath, have chest pain or pressure, or feel faint, check with your doctor. Fluid pressing on the heart is life-threatening and must be treated right away; it can be drained.",
  summary: "Malignant pericardial effusion occurs in up to 21% of people with metastatic cancer (PMAP), most often from lung and breast cancer and lymphomas. In a systematic review of 41 published case reports (CJC Open 2024), breathlessness was the leading symptom (90%) and 78% had tamponade. Echocardiography is the first-line test; the review calls cytology of drained fluid the diagnostic standard (sensitivity 92%, citing the 2015 ESC guideline), although in its own 41 cases cytology found malignant cells in 39% and biopsy confirmed the diagnosis in a further 24%. Pericardiocentesis is immediate if there is tamponade; the review reports that guidelines (the 2015 ESC guideline) also recommend drainage of large confirmed or suspected malignant effusions without tamponade, with extended catheter drainage, systemic treatment of the cancer, and pericardiotomy or sclerosing agents as adjuncts.\n\nRecurrence is the problem. Observational data quoted by the review: 38% after pericardiocentesis alone, 12.1% with extended drainage, 10.8% with sclerosis, 10.3% with balloon pericardiotomy and under 7% with a pericardial window. The PMAP trial (Hong Kong, 50 patients, 98% with features of tamponade) is, in its authors' words, the first randomised trial to show balloon pericardiotomy superior to pericardiocentesis for recurrence: with extended drainage in both groups, 6-month recurrence was 12% against 60% (HR 0.15) and tamponade 4% against 40%. Survival and quality of life were no better: median survival was 88 days after balloon pericardiotomy and 180 days after pericardiocentesis (P = .238). Procedural success was 92% against 100%, with one severe adverse event in each group. The authors conclude that the aim is fewer procedures, not longer life. The 2025 ESC pericarditis guideline and the 2022 ESC cardio-oncology guideline could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "emergency-team", "multidisciplinary-team", "patient-or-carer"],
    where: ["emergency-department", "acute-oncology-service", "ward", "intensive-care"],
  },
  population: "Adults with active cancer (most often lung or breast cancer, or lymphoma) who develop a pericardial effusion. PMAP enrolled adults with histologically confirmed active cancer and an effusion of 10 mm or more reachable from below the breastbone, and excluded people with previous open-heart surgery or an earlier pericardial procedure. Effusions after radiotherapy or from drug toxicity, and children, are not covered here.",
  trigger: "New or worsening breathlessness, chest pain, swelling or raised neck veins in a person with cancer, signs that the circulation is failing (tamponade), or an effusion found on a scan.",
  steps: [
    {
      action: "Tell the person and their carers to check with their doctor if they have shortness of breath, a cough, chest pain or pressure, trouble breathing while lying flat, a fast heartbeat or fast breathing, feeling faint, pressure in the upper abdomen, hiccups, tiredness or weakness",
      why: "The US National Cancer Institute lists these as signs that may be caused by fluid around the heart or by tamponade, which it calls life-threatening and says must be treated right away. At first there may be no symptoms.",
      source: "nci-pdq-cardiopulmonary",
      quote: "These and other signs and symptoms may be caused by a pericardial effusion or cardiac tamponade. Check with your doctor if you have:",
    },
    {
      action: "Suspect a pericardial effusion in a person with cancer who becomes breathless, and look for signs of tamponade",
      why: "In published case reports breathlessness was the commonest symptom, and most people already had tamponade when they presented.",
      source: "cjc-2024",
      quote: "Dyspnea was the leading symptom (90%), and cardiac tamponade was present in 78% of cases.",
    },
    {
      action: "Do a transthoracic echocardiogram to confirm the effusion and judge its effect on the circulation",
      why: "Ultrasound shows the fluid accurately and how much it is affecting the heart's work.",
      source: "cjc-2024",
      quote: "Transthoracic echocardiography remains the first-line imaging test to detect pericardial disease.",
    },
    {
      action: "If there is tamponade, drain the fluid immediately by pericardiocentesis",
      why: "Tamponade is life-threatening, and draining the fluid can relieve it.",
      source: "cjc-2024",
      quote: "Immediate treatment with pericardiocentesis is indicated if cardiac Tamp is present.",
    },
    {
      action: "Send the drained fluid for cytology",
      why: "Finding cancer cells in the fluid confirms that the cancer is the cause. Where cytology is negative, a biopsy of the pericardium can make the diagnosis.",
      source: "cjc-2024",
      quote: "Cytologic evaluation remains the gold standard for diagnosing malignant pericardial Effs, with a sensitivity of 92%, and a specificity of nearly 100%, although the diagnosis may be made with pericardial or epicardial biopsy as well.14",
    },
    {
      action: "Leave a drain in for extended drainage rather than draining once and removing the needle",
      why: "In observational studies fluid came back in more than a third of people after a single drainage and in about one in eight with extended drainage. The PMAP authors note that a longer drain carries a higher risk of infection and a longer hospital stay.",
      source: "cjc-2024",
      quote: "Guidelines recommend management of malignant pericardial disease with systemic antineoplastic therapy, pericardiocentesis, and extended pericardial drainage.14,20",
    },
    {
      action: "For a large malignant effusion in metastatic cancer, consider balloon pericardiotomy with extended drainage to prevent the fluid returning",
      why: "In one small randomised trial, recurrence over 6 months was 12% against 60% with pericardiocentesis, and tamponade 4% against 40%.",
      source: "pmap-2025",
      quote: "In patients with metastatic malignancy and large MPE, upfront intervention using PBP with extended drainage significantly reduces MPE recurrence and incidence of cardiac tamponade at 6 months compared with PC with extended drainage.",
    },
    {
      action: "Treat the underlying cancer where possible",
      why: "Drainage deals with the fluid that is there; the review calls treatment of the underlying cancer the definitive treatment.",
      source: "cjc-2024",
      quote: "Definitive treatment, however, requires systemic treatment of the underlying malignancy with chemotherapy, radiation, and surgery (Fig. 3).",
    },
    {
      action: "Plan with the person for fewer procedures, since survival is often short",
      why: "In the trial, preventing recurrence did not lengthen life or improve quality of life, so its authors put fewer repeat procedures as the main goal.",
      source: "pmap-2025",
      quote: "Despite the reduction in recurrence and cardiac tamponade with PBP, overall survival and QoL among patients with MPE remained poor, underscoring that the primary goal in managing MPE is to reduce the frequency of interventions rather than to extend survival.",
    },
  ],
  bestInClass: {
    statement: "The current European guidelines (2025 ESC myocarditis and pericarditis; 2022 ESC cardio-oncology) could not be read, so the guideline position here is second-hand: the 2024 systematic review reports that guidelines (the 2015 ESC guideline) recommend pericardiocentesis, extended pericardial drainage and systemic treatment, with pericardiotomy or sclerosing agents as adjuncts, and drainage of large malignant effusions even without tamponade. The strongest direct evidence is now the PMAP randomised trial (2025), which its authors describe as the first randomised trial to show balloon pericardiotomy superior to pericardiocentesis for recurrence: balloon pericardiotomy plus extended drainage gave less recurrence and less tamponade than pericardiocentesis plus extended drainage. It was small (50 patients, short of its planned 148), open-label and from one region, with no survival or quality-of-life benefit; median survival was 88 days against 180 days (P = .238). A pericardial window had the lowest recurrence (under 7%) in observational data; the 2024 review notes that these methods had not been compared with each other in randomised trials.",
    sources: ["pmap-2025", "cjc-2024", "esc-2025", "esc-cardio-onc-2022"],
  },
  variants: [
    {
      name: "Pericardial window",
      differs: "An opening (a window) is made in the pericardium, instead of a needle and drain alone.",
      evidence: "Lowest recurrence (under 7%) in a systematic review of 31 observational studies quoted by the 2024 review, which notes that the methods had not been compared with each other in randomised trials.",
      sources: ["cjc-2024"],
    },
    {
      name: "Intrapericardial sclerosing or cytotoxic agents",
      differs: "Instils a cytotoxic or sclerosing drug into the pericardium to stop fluid re-forming.",
      evidence: "Recurrence 10.8% with pericardial sclerosis in observational data. The review describes these agents as having limited success and notes that many clinicians avoid them because of high rates of chest pain and constrictive pericarditis.",
      sources: ["cjc-2024"],
    },
  ],
  grades: [
    { claim: "Balloon pericardiotomy with extended drainage against pericardiocentesis with extended drainage: 6-month recurrence", grade: "randomised trial (n = 50, open-label)", source: "pmap-2025", quote: "At 6 months, MPE recurred in 12% of PBP patients compared with 60% in the PC group (hazard ratio (HR) 0.15, 95% CI 0.05–0.51, P = .001)." },
    { claim: "Recurrence by method in observational studies", grade: "systematic review of 31 observational studies (quoted)", source: "cjc-2024", quote: "In a systematic review of 31 observational studies, isolated pericardiocentesis was associated with a recurrence rate of 38%, and extended catheter drainage, pericardial sclerosis, and balloon pericardiotomy had recurrence rates of 12.1%, 10.8%, and 10.3%, respectively.18" },
  ],
  sources: [
    { key: "pmap-2025", label: "Balloon pericardiotomy for malignant pericardial effusion: the PMAP trial", publisher: "European Heart Journal", year: 2025, url: "https://europepmc.org/article/PMC/PMC13017577", doi: "10.1093/eurheartj/ehaf516", gradingScheme: "A randomised controlled trial (NCT04472468); not a graded guideline.", read: "full-text", accessed: "2026-11-16" },
    { key: "cjc-2024", label: "Malignant Pericardial Effusion: A Systematic Review", publisher: "CJC Open", year: 2024, url: "https://europepmc.org/article/PMC/PMC11357784", doi: "10.1016/j.cjco.2024.05.003", gradingScheme: "A systematic review of 41 case reports, with a discussion citing guidelines; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "nci-pdq-cardiopulmonary", label: "Cardiopulmonary Syndromes (PDQ), patient version: malignant pericardial effusion", publisher: "US National Cancer Institute", year: 2025, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/cardiopulmonary-pdq", gradingScheme: "Patient information summary; not graded. Updated 15 May 2025.", read: "full-text", accessed: "2026-11-17" },
    { key: "esc-2025", label: "2025 ESC Guidelines for the management of myocarditis and pericarditis", publisher: "European Society of Cardiology, European Heart Journal", year: 2025, url: "https://doi.org/10.1093/eurheartj/ehaf192", doi: "10.1093/eurheartj/ehaf192", read: "not-reachable", accessed: "2026-11-16" },
    { key: "esc-cardio-onc-2022", label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with EHA, ESTRO and IC-OS", publisher: "European Society of Cardiology, European Heart Journal", year: 2022, url: "https://doi.org/10.1093/eurheartj/ehac244", doi: "10.1093/eurheartj/ehac244", read: "not-reachable", accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "The 2025 ESC Guidelines for myocarditis and pericarditis, the current European standard, and the 2022 ESC cardio-oncology guideline could not be read: the publisher refused a script and Europe PMC holds no abstract. Their recommendations and classes are not stated here; the guideline statements on this page come second-hand from the 2024 review, which cites the 2015 ESC guideline. On 16 November 2026 both were tried again and the publisher again returned 403; a university repository copy of the 2022 guideline also refused, and no other open copy was found, so no recommendation on this page has been checked against either guideline.",
    "PMAP is small (50 of a planned 148 patients), open-label and from Hong Kong; seven patients did not receive the procedure they were assigned. Its authors name the small sample and a mostly Chinese population as limits on how far it generalises. Of 130 people screened, 45 were excluded because they needed urgent drainage out of hours, so the trial says little about that setting.",
    "The 2024 review reports that pericardial window, balloon pericardiotomy, sclerosis and extended drainage had not been compared with each other in randomised trials; PMAP compared only balloon pericardiotomy with pericardiocentesis.",
    "The 2024 systematic review is drawn entirely from case reports and is likely to over-represent severe cases. The cytology sensitivity of 92% is the figure it cites from the 2015 ESC guideline; in its own 41 cases cytology found malignant cells in 39%, and in PMAP in 86%.",
    "On 17 November 2026 no UK patient page on pericardial effusion in cancer was found: Cancer Research UK's site map lists none, the British Heart Foundation's lists only pericarditis, two likely addresses on Macmillan's site returned not found, and the NHS page on pericarditis is about a different problem. The warning signs on this page come from the US National Cancer Institute's patient summary, which says to check with your doctor and that tamponade must be treated right away. It gives no time limit for the other symptoms and names no emergency number, so this page does not say when to ring 999.",
    "Neither readable source says how long a drain should stay in. PMAP drained until output was below 100 mL a day, which took about 3 days.",
  ],
  technologies: ["cardio-oncology"],
  cancers: ["nsclc", "breast-cancer", "non-hodgkin-lymphoma"],
  tags: ["protocol", "acute-oncology", "oncological-emergency"],
});
