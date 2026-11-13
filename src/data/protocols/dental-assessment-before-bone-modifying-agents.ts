import { protocol } from "./helpers";

/*
 * Dental assessment before bone-modifying agents (bisphosphonates, denosumab) in cancer, and prevention of
 * medication-related osteonecrosis of the jaw (MRONJ).
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - MASCC/ISOO/ASCO clinical practice guideline on MRONJ (Yarom et al., J Clin Oncol 2019): abstract only, from Europe
 *   PMC; ascopubs.org refused a script. It is the only oncology-specific international guideline found.
 * - Korean multidisciplinary task force 2025 position statement on MRONJ (Endocrinol Metab 2025): full text from PubMed
 *   Central (PMC12765892). It covers osteoporosis and cancer doses together.
 * - NICE NG101 (breast cancer), recommendation 1.12.3 on discussing the risks of bisphosphonates (HTML, full text).
 * - The AAOMS 2022 position paper update on MRONJ (J Oral Maxillofac Surg): not located in Europe PMC as a readable
 *   record and the publisher refuses scripts. Not read; described here only through what the Korean statement says of it.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const dentalAssessmentBeforeBoneModifyingAgents = protocol({
  id: "dental-assessment-before-bone-modifying-agents",
  name: "Dental assessment before bone-modifying agents and jaw osteonecrosis prevention",
  aka: ["MRONJ prevention", "medication-related osteonecrosis of the jaw", "dental check before zoledronic acid", "dental check before denosumab", "osteonecrosis of the jaw prevention"],
  domain: "supportive-care",
  tldr: "Medicines that strengthen bone in cancer, such as zoledronic acid and denosumab, can rarely cause a patch of jawbone to break down, usually after a tooth is taken out. Before you start, see a dentist so any problem teeth can be treated first, keep your mouth very clean, and tell your dentist about the medicine. Report any jaw pain, loose teeth or exposed bone in the mouth.",
  simple: "Some bone medicines can rarely damage the jaw. See a dentist before you start. Keep your teeth clean. Tell your team about jaw pain or loose teeth.",
  summary: "MRONJ is exposed bone, or bone that can be probed through a fistula, in the jaw for more than 8 weeks in someone who has had a bone-modifying agent (BMA) or angiogenic inhibitor, with no radiotherapy or metastasis to the jaw (MASCC/ISOO/ASCO 2019). In cancer the doses are much higher than in osteoporosis (denosumab 120 mg monthly against 60 mg every 6 months), so the risk is greater: the Korean 2025 statement cites an incidence with zoledronate of 1.6 to 4 per cent in the first 2 years, rising after that, and finds that pretreatment dental care cut MRONJ by 77.3 per cent in one meta-analysis of people on high-dose bisphosphonates.\n\nMASCC/ISOO/ASCO recommend a comprehensive dental assessment when a BMA is started, discussion of modifiable risk factors, and avoiding elective dentoalveolar surgery during treatment; whether to stop the BMA before necessary surgery is uncertain. The Korean statement makes dental evaluation mandatory before high-dose therapy for cancer, ideally before it begins, with extraction of teeth that cannot be saved, treatment of gum and root infections, adjustment of ill-fitting dentures and education on oral hygiene and warning signs. NICE NG101 asks that the risk of jaw osteonecrosis be discussed before adjuvant bisphosphonates in breast cancer. Established MRONJ is staged by an experienced clinician and treated conservatively first (MASCC/ISOO/ASCO), whereas the Korean statement favours earlier surgery.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer", "multidisciplinary-team"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults with cancer starting a bone-modifying agent (zoledronic acid or other bisphosphonates, or denosumab) for bone metastases, myeloma or treatment-induced bone loss, or an angiogenic inhibitor. Risks and some recommendations differ between the high doses used for bone metastases and the lower doses used to protect bone; the sources say which.",
  trigger: "A bone-modifying agent is planned.",
  steps: [
    {
      action: "Before the first dose, arrange a comprehensive dental assessment and complete any needed dental treatment",
      why: "Most jaw osteonecrosis follows a tooth extraction or an infection; dealing with problem teeth first lowers that risk.",
      source: "mascc-isoo-asco-2019",
      quote: "In patients who initiate a BMA, preventive care includes comprehensive dental assessments, discussion of modifiable risk factors, and avoidance of elective dentoalveolar surgery (ie, surgery that involves the teeth or contiguous alveolar bone) during BMA treatment.",
    },
    {
      action: "For high-dose treatment of bone metastases or myeloma, treat the dental check as mandatory and complete it before treatment begins where possible",
      why: "The doses used in cancer carry a far higher risk than those used for osteoporosis.",
      source: "korean-2025",
      quote: "For patients scheduled to receive high-dose antiresorptives for oncologic indications, this dental evaluation is considered mandatory and should be completed ideally before therapy begins.",
    },
    {
      action: "At the dental visit, remove teeth that cannot be saved, treat gum and root infections, and adjust ill-fitting dentures",
      why: "Each of these is a way bacteria or pressure can reach the bone and start osteonecrosis.",
      source: "korean-2025",
      quote: "Extraction of non-restorable teeth or teeth with a poor prognosis",
    },
    {
      action: "Discuss the risk and the modifiable risk factors with the person before starting",
      why: "Smoking, poor oral hygiene, steroids and other drugs add to the risk, and some can be changed.",
      source: "nice-ng101",
      quote: "Discuss the benefits and risks of bisphosphonate treatment with women, particularly the risk of osteonecrosis of the jaw, atypical femoral fractures and osteonecrosis of the external auditory canal.",
    },
    {
      action: "Teach the person to keep the mouth very clean, to tell every dentist about the medicine, and to report jaw pain, loose teeth, numbness or exposed bone",
      why: "Early signs found quickly are easier to treat, and the dentist can plan care around the medicine.",
      source: "korean-2025",
      quote: "Patient education on the importance of maintaining excellent oral hygiene and the signs and symptoms of MRONJ",
    },
    {
      action: "During treatment, avoid elective tooth extractions, implants and other surgery on the jawbone",
      why: "Surgery on the jaw is the most common trigger while the medicine is in use.",
      source: "mascc-isoo-asco-2019",
      quote: "In patients who initiate a BMA, preventive care includes comprehensive dental assessments, discussion of modifiable risk factors, and avoidance of elective dentoalveolar surgery (ie, surgery that involves the teeth or contiguous alveolar bone) during BMA treatment.",
    },
    {
      action: "If jaw surgery becomes necessary, decide with the oncologist and dentist whether to pause the medicine; the evidence does not settle it",
      why: "Pausing may help the jaw heal but may raise the risk of fractures or bone problems from the cancer.",
      source: "mascc-isoo-asco-2019",
      quote: "It remains uncertain whether BMAs should be discontinued before dentoalveolar surgery.",
    },
    {
      action: "If osteonecrosis develops, have it staged by an experienced clinician and start with conservative treatment",
      why: "Conservative care, such as antimicrobial mouth rinses, comes first; surgery is for cases that do not settle.",
      source: "mascc-isoo-asco-2019",
      quote: "Staging of MRONJ should be performed by a clinician with experience in the management of MRONJ. Conservative measures comprise the initial approach to MRONJ treatment.",
    },
  ],
  bestInClass: {
    statement: "The MASCC/ISOO/ASCO guideline (2019) is the only oncology-specific international guideline and was read only as an abstract: dental assessment when a bone-modifying agent starts, attention to modifiable risk factors, no elective dentoalveolar surgery during treatment, uncertainty about pausing the drug before necessary surgery, staging by an experienced clinician and conservative treatment first. The Korean 2025 position statement, read in full, agrees on prevention and goes further: it makes the dental check mandatory before high-dose cancer treatment, sets drug-specific pauses before dental surgery, and favours early surgery for established MRONJ. It reports that the AAOMS 2022 position paper deliberately removed fixed drug holidays for lack of evidence. On pausing and on surgery, the sources disagree, and the oncology guideline leaves it open.",
    sources: ["mascc-isoo-asco-2019", "korean-2025", "nice-ng101"],
  },
  variants: [
    {
      name: "Fixed drug holidays before dental surgery (Korean 2025)",
      differs: "Sets pauses before invasive dental procedures: 2 months for oral bisphosphonates in long-term users, 6 to 12 months for intravenous zoledronate, and surgery 3 to 4 months after the last denosumab injection, with 6 to 8 weeks of healing afterwards; the denosumab timing is built around the 6-monthly osteoporosis dose.",
      evidence: "Expert consensus from literature review and three rounds of surveys; the statement itself calls drug holidays one of the most controversial issues and notes that AAOMS (2022) offered no fixed holidays. MASCC/ISOO/ASCO say it is uncertain whether to stop the drug at all.",
      sources: ["korean-2025", "mascc-isoo-asco-2019"],
    },
    {
      name: "Early surgery for established MRONJ (Korean 2025)",
      differs: "Advocates early and active surgical treatment at all stages of MRONJ, where MASCC/ISOO/ASCO start with conservative measures.",
      evidence: "The Korean statement cites better long-term outcomes with surgery than with conservative care; MASCC/ISOO/ASCO's position rests on its 2019 systematic review, which found only 10 randomised trials among 132 publications.",
      sources: ["korean-2025", "mascc-isoo-asco-2019"],
    },
  ],
  grades: [
    { claim: "Pretreatment dental evaluation and preventive care in cancer patients on high-dose bisphosphonates", grade: "meta-analysis cited by the Korean statement: 77.3 per cent fewer cases", source: "korean-2025", quote: "One meta-analysis reported that pre-treatment dental evaluation and preventive care reduced MRONJ incidence by 77.3% in cancer patients receiving high-dose BPs" },
  ],
  sources: [
    { key: "mascc-isoo-asco-2019", label: "Medication-Related Osteonecrosis of the Jaw: MASCC/ISOO/ASCO Clinical Practice Guideline", publisher: "MASCC, ISOO and ASCO, Journal of Clinical Oncology", year: 2019, url: "https://europepmc.org/abstract/MED/31329513", doi: "10.1200/JCO.19.01186", read: "abstract", accessed: "2026-11-11" },
    { key: "korean-2025", label: "Medication-Related Osteonecrosis of the Jaw: An Evidence-Based 2025 Position Statement from a Korean Multidisciplinary Task Force", publisher: "Five Korean societies, Endocrinology and Metabolism", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12765892/", doi: "10.3803/EnM.2025.2712", gradingScheme: "Position statement built on literature review and three rounds of expert surveys; recommendations are not graded individually.", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-ng101", label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations", publisher: "NICE", year: 2018, url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations. Published July 2018, last updated April 2025.", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The MASCC/ISOO/ASCO guideline was read only as an abstract, so its grades, its consensus levels and its advice on timing of the dental visit relative to the first dose are not given here.",
    "The AAOMS 2022 position paper could not be read; its position is given only as the Korean statement reports it.",
    "No guideline read settles whether to pause a bone-modifying agent before necessary dental surgery in people with bone metastases, where stopping may itself cause harm.",
    "The Korean incidence figures and drug holiday table mix osteoporosis and cancer doses; the denosumab timing in particular assumes the 6-monthly osteoporosis dose, not the monthly cancer dose.",
    "No source read gives how often to repeat dental checks during long-term treatment.",
  ],
  institutions: ["mascc", "asco", "nice"],
  technologies: ["bone-modifying-agents"],
  drugs: ["zoledronic-acid", "denosumab"],
  terms: [],
  cancers: [],
  related: ["multiple-myeloma"],
  sections: ["supportive-care"],
  tags: ["protocol", "bone-health", "oral-care", "supportive-care"],
});
