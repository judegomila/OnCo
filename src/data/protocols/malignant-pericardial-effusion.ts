import { protocol } from "./helpers";

/*
 * Malignant pericardial effusion: recognising tamponade, echocardiography, drainage, cytology, and preventing
 * recurrence (extended drainage, balloon pericardiotomy, pericardial window).
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - PMAP randomised trial of percutaneous balloon pericardiotomy against pericardiocentesis (European Heart Journal,
 *   published online July 2025, in print 2026): open access, full text from Europe PMC (PMC13017577).
 * - Malignant pericardial effusion: a systematic review (CJC Open 2024): open access, full text from Europe PMC
 *   (PMC11357784). It is a review of 41 case reports; its statements about guidelines cite the 2015 ESC guideline.
 * - 2025 ESC Guidelines for the management of myocarditis and pericarditis and 2022 ESC Guidelines on cardio-oncology:
 *   academic.oup.com returned 403 to a script; Europe PMC holds no abstract for either. Not read.
 * Every DOI was resolved through Crossref and its title checked. Quotes checked by script against the raw text.
 */
export const malignantPericardialEffusion = protocol({
  id: "malignant-pericardial-effusion",
  name: "Malignant pericardial effusion: tamponade, drainage, cytology and preventing recurrence",
  aka: ["MPE", "pericardial effusion in cancer", "cardiac tamponade in cancer", "pericardiocentesis", "balloon pericardiotomy", "pericardial window"],
  domain: "emergencies",
  tldr: "Cancer can cause fluid to build up in the sac around the heart. When there is a lot, the heart cannot fill properly: breathlessness, a fast heartbeat, feeling faint or low blood pressure need emergency care. A heart ultrasound finds the fluid, and a needle and drain remove it. Because it often comes back, doctors may leave a drain in for a few days or make an opening in the sac.",
  simple: "If you have cancer and become very breathless or faint, with a fast heartbeat, call 999. Fluid around the heart can be drained.",
  summary: "Malignant pericardial effusion occurs in up to 21% of people with metastatic cancer (PMAP), most often from lung and breast cancer and lymphomas. In a systematic review of 41 published cases (CJC Open 2024), breathlessness was the leading symptom (90%) and 78% had tamponade. Echocardiography is the first-line test; cytology of drained fluid is the diagnostic standard (sensitivity 92%). Pericardiocentesis is immediate if there is tamponade; the review reports that guidelines (the 2015 ESC guideline) also recommend drainage of large confirmed or suspected malignant effusions without tamponade, with extended catheter drainage, systemic treatment of the cancer, and pericardiotomy or sclerosing agents as adjuncts.\n\nRecurrence is the problem. Observational data quoted by the review: 38% after pericardiocentesis alone, 12.1% with extended drainage, 10.8% with sclerosis, 10.3% with balloon pericardiotomy and under 7% with a surgical window. The PMAP trial (Hong Kong, 50 patients, 98% with features of tamponade) is the first randomised comparison: balloon pericardiotomy with extended drainage cut 6-month recurrence from 60% to 12% (HR 0.15) and tamponade from 40% to 4%, without improving survival or quality of life. Median survival with malignant pericardial effusion is short, so the aim is fewer procedures, not longer life. The 2025 ESC pericarditis guideline and the 2022 ESC cardio-oncology guideline could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "emergency-team", "multidisciplinary-team"],
    where: ["emergency-department", "acute-oncology-service", "ward", "intensive-care"],
  },
  population: "Adults with active cancer (most often lung or breast cancer, or lymphoma) who develop a pericardial effusion. PMAP enrolled adults with histologically confirmed active cancer and an effusion of 10 mm or more reachable from below the breastbone. Effusions after radiotherapy or from drug toxicity, and children, are not covered here.",
  trigger: "New or worsening breathlessness, chest discomfort, a fast heart rate, low blood pressure or raised neck veins in a person with cancer, or an effusion found on a scan.",
  steps: [
    {
      action: "Suspect a pericardial effusion in a person with cancer who becomes breathless, and look for signs of tamponade",
      why: "Breathlessness is the commonest symptom, and most people are already in tamponade when they present.",
      source: "cjc-2024",
      quote: "Dyspnea was the leading symptom (90%), and cardiac tamponade was present in 78% of cases.",
    },
    {
      action: "Do a transthoracic echocardiogram to confirm the effusion and judge its effect on the heart",
      why: "Ultrasound shows the fluid and whether it is stopping the heart from filling.",
      source: "cjc-2024",
      quote: "Transthoracic echocardiography remains the first-line imaging test to detect pericardial disease.",
    },
    {
      action: "If there is tamponade, drain the fluid immediately by pericardiocentesis",
      why: "Tamponade can stop the heart from pumping; draining even some fluid relieves it.",
      source: "cjc-2024",
      quote: "Immediate treatment with pericardiocentesis is indicated if cardiac Tamp is present.",
    },
    {
      action: "Send the drained fluid for cytology",
      why: "Finding cancer cells confirms the cause and guides treatment.",
      source: "cjc-2024",
      quote: "Cytologic evaluation remains the gold standard for diagnosing malignant pericardial Effs, with a sensitivity of 92%, and a specificity of nearly 100%, although the diagnosis may be made with pericardial or epicardial biopsy as well.14",
    },
    {
      action: "Leave a drain in for extended drainage rather than draining once and removing the needle",
      why: "Fluid comes back in more than a third of people after a single drainage.",
      source: "cjc-2024",
      quote: "Guidelines recommend management of malignant pericardial disease with systemic antineoplastic therapy, pericardiocentesis, and extended pericardial drainage.14,20",
    },
    {
      action: "For a large malignant effusion, consider balloon pericardiotomy with extended drainage to prevent the fluid returning",
      why: "In a randomised trial it cut recurrence from 60% to 12% and tamponade from 40% to 4% over 6 months.",
      source: "pmap-2025",
      quote: "In patients with metastatic malignancy and large MPE, upfront intervention using PBP with extended drainage significantly reduces MPE recurrence and incidence of cardiac tamponade at 6 months compared with PC with extended drainage.",
    },
    {
      action: "Treat the underlying cancer where possible",
      why: "Drainage relieves the pressure, but only treating the cancer stops the fluid being made.",
      source: "cjc-2024",
      quote: "Definitive treatment, however, requires systemic treatment of the underlying malignancy with chemotherapy, radiation, and surgery (Fig. 3).",
    },
    {
      action: "Plan with the person for fewer procedures and time at home, since survival is often short",
      why: "Preventing repeat drainage matters more than any effect on survival, which none of these procedures has shown.",
      source: "pmap-2025",
      quote: "Despite the reduction in recurrence and cardiac tamponade with PBP, overall survival and QoL among patients with MPE remained poor, underscoring that the primary goal in managing MPE is to reduce the frequency of interventions rather than to extend survival.",
    },
  ],
  bestInClass: {
    statement: "The current European guidelines (2025 ESC myocarditis and pericarditis; 2022 ESC cardio-oncology) could not be read, so the guideline position here is second-hand: the 2024 systematic review reports that guidelines (the 2015 ESC guideline) recommend pericardiocentesis, extended pericardial drainage and systemic treatment, with pericardiotomy or sclerosing agents as adjuncts, and drainage of large malignant effusions even without tamponade. The strongest direct evidence is now the PMAP randomised trial (2025), the first to compare procedures: balloon pericardiotomy plus extended drainage was superior to pericardiocentesis plus extended drainage for recurrence and tamponade, though small (50 patients, short of its planned 148), open-label and from one region, with no survival or quality-of-life benefit. A surgical pericardial window had the lowest recurrence (under 7%) in observational data but has not been compared in a trial.",
    sources: ["pmap-2025", "cjc-2024", "esc-2025", "esc-cardio-onc-2022"],
  },
  variants: [
    {
      name: "Surgical pericardial window",
      differs: "A surgeon makes an opening in the pericardium so that fluid drains away continuously, instead of a needle and drain.",
      evidence: "Lowest recurrence (under 7%) in a systematic review of 31 observational studies quoted by the 2024 review; not tested in a randomised trial against the other methods.",
      sources: ["cjc-2024"],
    },
    {
      name: "Intrapericardial sclerosing or cytotoxic agents",
      differs: "Instils a cytotoxic or sclerosing drug into the pericardium after drainage to stop fluid re-forming.",
      evidence: "Recurrence 10.8% in observational data; the review notes many clinicians avoid it because of high rates of chest pain and constrictive pericarditis.",
      sources: ["cjc-2024"],
    },
  ],
  grades: [
    { claim: "Balloon pericardiotomy with extended drainage against pericardiocentesis with extended drainage: 6-month recurrence", grade: "randomised trial (n = 50, open-label)", source: "pmap-2025", quote: "At 6 months, MPE recurred in 12% of PBP patients compared with 60% in the PC group (hazard ratio (HR) 0.15, 95% CI 0.05–0.51, P = .001)." },
    { claim: "Recurrence by method in observational studies", grade: "systematic review of 31 observational studies (quoted)", source: "cjc-2024", quote: "In a systematic review of 31 observational studies, isolated pericardiocentesis was associated with a recurrence rate of 38%, and extended catheter drainage, pericardial sclerosis, and balloon pericardiotomy had recurrence rates of 12.1%, 10.8%, and 10.3%, respectively.18" },
  ],
  sources: [
    { key: "pmap-2025", label: "Balloon pericardiotomy for malignant pericardial effusion: the PMAP trial", publisher: "European Heart Journal", year: 2025, url: "https://europepmc.org/article/PMC/PMC13017577", doi: "10.1093/eurheartj/ehaf516", gradingScheme: "A randomised controlled trial (NCT04472468); not a graded guideline.", read: "full-text", accessed: "2026-11-11" },
    { key: "cjc-2024", label: "Malignant Pericardial Effusion: A Systematic Review", publisher: "CJC Open", year: 2024, url: "https://europepmc.org/article/PMC/PMC11357784", doi: "10.1016/j.cjco.2024.05.003", gradingScheme: "A systematic review of 41 case reports, with a discussion citing guidelines; not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "esc-2025", label: "2025 ESC Guidelines for the management of myocarditis and pericarditis", publisher: "European Society of Cardiology, European Heart Journal", year: 2025, url: "https://doi.org/10.1093/eurheartj/ehaf192", doi: "10.1093/eurheartj/ehaf192", read: "not-reachable", accessed: "2026-11-11" },
    { key: "esc-cardio-onc-2022", label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with EHA, ESTRO and IC-OS", publisher: "European Society of Cardiology, European Heart Journal", year: 2022, url: "https://doi.org/10.1093/eurheartj/ehac244", doi: "10.1093/eurheartj/ehac244", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The 2025 ESC Guidelines for myocarditis and pericarditis, the current European standard, and the 2022 ESC cardio-oncology guideline could not be read: the publisher refused a script and Europe PMC holds no abstract. Their recommendations and classes are not stated here; the guideline statements on this page come second-hand from the 2024 review, which cites the 2015 ESC guideline.",
    "PMAP is small (50 of a planned 148 patients), open-label and from Hong Kong; seven patients crossed over. A larger trial is needed before balloon pericardiotomy is standard.",
    "No randomised trial compares a surgical pericardial window with balloon pericardiotomy or extended drainage.",
    "The 2024 systematic review is drawn entirely from case reports and is likely to over-represent severe cases.",
    "How long to leave a drain in is not settled; PMAP drained until output was below 100 mL a day.",
  ],
  technologies: ["cardio-oncology"],
  cancers: ["nsclc", "breast-cancer", "non-hodgkin-lymphoma"],
  tags: ["protocol", "acute-oncology", "oncological-emergency"],
});
