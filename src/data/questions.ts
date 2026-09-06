/**
 * Hand-written "questions to ask your oncologist", keyed by cancer id.
 * Generic questions for any cancer are generated in src/lib/questions.ts.
 * Settings are free text but should match the cancer's standardOfCare settings where possible.
 */
export type Question = { setting: string; question: string; why: string };

export const questions: Record<string, Question[]> = {
  tnbc: [
    // Newly diagnosed
    { setting: "Newly diagnosed", question: "What exactly makes my cancer 'triple-negative', and was HER2 scored as 0, 1+, or 2+?", why: "HER2-low (1+ or 2+ without amplification) tumours qualify for trastuzumab deruxtecan later; the difference between 0 and 1+ matters." },
    { setting: "Newly diagnosed", question: "Have I been referred for germline genetic testing (BRCA1/2, PALB2 and others)?", why: "Guidelines recommend it for all TNBC. A BRCA result changes surgery options, opens PARP inhibitors, and matters for relatives." },
    { setting: "Newly diagnosed", question: "What is my clinical stage, and which imaging was used to determine it?", why: "Stage decides whether treatment starts with surgery or with chemo-immunotherapy; PET/CT is often used for stage II-III." },
    { setting: "Newly diagnosed", question: "What was my tumour-infiltrating lymphocyte (TIL) score, and does it change my options?", why: "Very small, TIL-rich tumours have excellent outcomes; TIL status is being used to de-escalate treatment in trials." },
    { setting: "Newly diagnosed", question: "Is fertility preservation relevant for me, and do we have time before treatment starts?", why: "Chemotherapy can affect fertility; egg or embryo freezing needs to happen before the first cycle." },
    // Before surgery
    { setting: "Before surgery (neoadjuvant)", question: "Will I receive pembrolizumab with chemotherapy before surgery, as in KEYNOTE-522, and if not, why not?", why: "This regimen improved survival for stage II-III TNBC and is the standard of care for most patients." },
    { setting: "Before surgery (neoadjuvant)", question: "Which side effects of immunotherapy should I watch for, and who do I call at any hour?", why: "Immune-related side effects (thyroid, colitis, adrenal) are treatable if caught early; some are permanent." },
    { setting: "Before surgery (neoadjuvant)", question: "Is there a clinical trial testing less chemotherapy (for example without anthracyclines) or a newer drug that I might join?", why: "SCARLET and other trials test whether some of the toughest chemotherapy can be dropped without losing effect." },
    { setting: "Before surgery (neoadjuvant)", question: "Am I a candidate for scalp cooling, and does the centre offer it?", why: "It preserves hair in about half of patients on taxane-based regimens." },
    // After surgery
    { setting: "After surgery", question: "Did I have a pathologic complete response (pCR), and if not, what was my residual cancer burden (RCB)?", why: "pCR predicts a very good outlook; residual disease means extra treatment such as capecitabine or olaparib is discussed." },
    { setting: "After surgery", question: "If I carry a BRCA mutation and had residual disease, will I be offered a year of olaparib?", why: "OlympiA showed adjuvant olaparib improves survival in this group." },
    { setting: "After surgery", question: "Will I continue pembrolizumab after surgery, and is there a trial testing whether I can stop early if I had a pCR?", why: "OptimICE-pCR is testing whether the adjuvant year of immunotherapy is needed after a complete response." },
    { setting: "After surgery", question: "Is there a role for blood tests for circulating tumour DNA (MRD) in my follow-up, in a trial or otherwise?", why: "ctDNA detects relapse months before scans; interventional trials are testing acting on it." },
    { setting: "After surgery", question: "What surveillance schedule will I have, and which symptoms should prompt an early call?", why: "TNBC relapses cluster in the first three years; knowing what to report reduces delay." },
    { setting: "After surgery", question: "Can I get a structured exercise programme and a survivorship plan, including heart health checks?", why: "Exercise improved survival in colon cancer trials and reduces fatigue; anthracyclines can affect the heart." },
    // Metastatic
    { setting: "Metastatic", question: "What is my PD-L1 combined positive score (CPS) on the most recent biopsy?", why: "CPS 10 or more opens pembrolizumab combinations, including with the ADC sacituzumab govitecan." },
    { setting: "Metastatic", question: "Which first-line option do you recommend for me: sacituzumab govitecan, datopotamab deruxtecan, or immunotherapy plus chemotherapy, and why?", why: "Two TROP2 ADCs were approved first-line in 2026 with different side-effect profiles (neutropenia and diarrhoea vs stomatitis and eye effects)." },
    { setting: "Metastatic", question: "Is my tumour HER2-low, making trastuzumab deruxtecan an option later?", why: "About a third of TNBC is HER2-low; T-DXd is approved in that setting after chemotherapy." },
    { setting: "Metastatic", question: "If one ADC stops working, what is the plan for the next one, given that they may share resistance?", why: "Back-to-back ADCs with the same payload class often work less well; sequencing is an open question worth discussing." },
    { setting: "Metastatic", question: "Was a new biopsy or liquid biopsy taken at progression to re-check receptors and look for a trial-matching mutation?", why: "Receptor status can change; comprehensive genomic profiling can reveal rare targetable alterations." },
    { setting: "Metastatic", question: "Which clinical trials, including bispecific ADCs and newer TROP2 ADCs, could I be eligible for here or at a referral centre?", why: "Izalontamab brengitecan and sacituzumab tirumotecan are in phase 3 trials that may be recruiting." },
    { setting: "Metastatic", question: "Have you screened for brain metastases, and how will we monitor for them?", why: "Brain involvement is common in metastatic TNBC and is treated differently." },
    { setting: "Metastatic", question: "What supportive-care and palliative-care resources can be involved now, not later?", why: "Early palliative care improves quality of life and sometimes survival, alongside active treatment." },
  ],
};
