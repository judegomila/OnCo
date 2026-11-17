import { protocol } from "./helpers";

/*
 * Dental assessment before bone-modifying agents (bisphosphonates, denosumab) in cancer, and prevention of
 * medication-related osteonecrosis of the jaw (MRONJ).
 *
 * First written on 11 November 2026 from three sources. Second accuracy pass on 17 November 2026: every source was
 * fetched again raw (curl, the Europe PMC REST API, pdftotext) into a scratch directory, read as text, and every quote
 * checked by script against the saved text (whitespace and line breaks joined, nothing else changed).
 * - MASCC/ISOO/ASCO guideline on MRONJ (Yarom et al., J Clin Oncol 2019): abstract only, from Europe PMC. ascopubs.org
 *   answered 403 again and Europe PMC lists no open copy. No newer edition found in Europe PMC or Crossref.
 * - Korean multidisciplinary task force 2025 position statement (Endocrinol Metab 2025): full text XML from Europe PMC
 *   (PMC12765892), including its four tables. It covers osteoporosis and cancer doses together.
 * - NICE NG101 (breast cancer), recommendation 1.12.3 (HTML, full text; last updated 14 April 2025).
 * - AAOMS 2022 position paper: not read in the first pass. Read in full on 17 November 2026 from the society's own
 *   open PDF on aaoms.org. Its position on drug holidays is not what the Korean statement reports of it; see below.
 * - Scottish Dental Clinical Effectiveness Programme (SDCEP) guidance, March 2017, reviewed and extant March 2024, and
 *   its March 2024 supplement: full PDFs from sdcep.org.uk. New in this pass.
 * - Labels, new in this pass: the US Xgeva label and a US zoledronic acid 4 mg label (DailyMed SPL XML), and the EMA
 *   product information for Xgeva and Zometa (PDFs from ema.europa.eu, which also hold the package leaflets).
 * - ESMO Bone health in cancer (Ann Oncol 2020): annalsofoncology.org answered 403 and Europe PMC holds no abstract
 *   and no open copy. Not read; nothing here rests on it.
 * Every DOI was resolved through Crossref or Europe PMC and its title checked.
 */
export const dentalAssessmentBeforeBoneModifyingAgents = protocol({
  id: "dental-assessment-before-bone-modifying-agents",
  name: "Dental assessment before bone-modifying agents and jaw osteonecrosis prevention",
  aka: ["MRONJ prevention", "medication-related osteonecrosis of the jaw", "dental check before zoledronic acid", "dental check before denosumab", "osteonecrosis of the jaw prevention"],
  domain: "supportive-care",
  tldr: "Medicines that strengthen bone in cancer, such as zoledronic acid and denosumab, can make a patch of jawbone break down in a small number of people, most often after a tooth is taken out. See a dentist before you start so problem teeth are treated first, keep your mouth very clean, and tell your team straight away about loose teeth, jaw pain or swelling, or sores that do not heal.",
  simple: "Some bone medicines can damage the jaw in a small number of people. See a dentist before you start. Keep your teeth clean. Tell your team straight away about jaw pain, loose teeth or sores that do not heal.",
  summary: "MRONJ is exposed bone, or bone that can be probed through a fistula, in the jaw or face for longer than 8 weeks in someone who has had a bone-modifying agent (BMA) or angiogenic inhibitor, with no radiotherapy or metastatic disease to the jaws (MASCC/ISOO/ASCO 2019; AAOMS 2022 and the Scottish dental guidance print the same 8 weeks). The Korean 2025 statement adds that it can be diagnosed sooner where necrotic bone is confirmed clinically or on imaging. AAOMS stages it: at risk; stage 0, no exposed bone but non-specific symptoms or findings; stage 1, exposed bone or a fistula with no symptoms or infection; stage 2, with infection or inflammation and symptoms; stage 3, with infection and one or more of necrotic bone beyond the alveolar region, pathological fracture, an extraoral fistula, a communication with the nose or sinus, or osteolysis reaching the lower border of the jaw or the sinus floor. In cancer the doses are higher than in osteoporosis: denosumab 120 mg every 4 weeks (Xgeva labels) against 60 mg every 6 months (Korean statement), and zoledronic acid 4 mg every 3 to 4 weeks (Zometa label). AAOMS puts the risk in cancer below 5 per cent in most studies, with a range of 0 to 18 per cent for zoledronate. The Korean statement, citing a review that AAOMS also cites, gives 1.6 to 4 per cent within the first 2 years of zoledronate and 3.8 to 18 per cent beyond, and 1.9 and 6.9 per cent for denosumab. The US denosumab label reports confirmed cases in 1.8 per cent on denosumab and 1.3 per cent on zoledronic acid in the main bone metastasis trials. The Korean statement cites one meta-analysis in which pretreatment dental care cut MRONJ by 77.3 per cent in people on high-dose bisphosphonates.\n\nEvery source read asks for dental assessment and any needed dental treatment before a BMA starts in cancer, good oral hygiene, and avoidance of elective surgery on the teeth and jawbone during treatment. They differ in strength: the Korean statement calls the check mandatory, the Scottish guidance says preferably before the drug (strong recommendation, low quality evidence), the US labels say to do it, and the European labels recommend it, for zoledronic acid in people with other risk factors. AAOMS advises delaying the first dose, if the cancer allows, until extraction sites have healed; no source read gives that wait in days or weeks. They disagree on pausing the drug before necessary dental surgery and on how early to operate on established MRONJ; both are set out below.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer", "multidisciplinary-team"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults with cancer starting a bone-modifying agent (zoledronic acid or other bisphosphonates, or denosumab) for bone metastases, myeloma or treatment-induced bone loss, or an angiogenic inhibitor. Risks and some recommendations differ between the high doses used for bone metastases and the lower doses used to protect bone; the sources say which. NICE's recommendation is for women offered adjuvant bisphosphonates for early breast cancer.",
  trigger: "A bone-modifying agent is planned.",
  steps: [
    {
      action: "Arrange a comprehensive dental assessment for anyone starting a bone-modifying agent",
      why: "AAOMS says most people who get jaw osteonecrosis get it after surgery on the teeth or jawbone, so problem teeth are best found and treated first.",
      source: "mascc-isoo-asco-2019",
      quote: "In patients who initiate a BMA, preventive care includes comprehensive dental assessments, discussion of modifiable risk factors, and avoidance of elective dentoalveolar surgery (ie, surgery that involves the teeth or contiguous alveolar bone) during BMA treatment.",
    },
    {
      action: "Get the mouth as healthy as possible before the medicine starts, or as soon as possible afterwards; in cancer, preferably do the assessment and any dental treatment before the first dose",
      why: "Preventive dental care can lower the need for extractions later. The Scottish guidance says the evidence for this is of low quality.",
      source: "sdcep-2017",
      quote: "Before commencement of anti-resorptive or anti-angiogenic drug therapy, or as soon as possible thereafter, aim to get the patient as dentally fit as feasible, prioritising preventive care. Higher risk cancer patients should preferably undergo a thorough dental assessment, with remedial dental treatment where required, prior to commencement of the drug therapy.",
      grade: "Strong recommendation; low quality evidence",
    },
    {
      action: "For high-dose treatment of bone metastases or myeloma, treat the dental check as mandatory and complete it before treatment begins where possible",
      why: "The doses used in cancer carry a far higher risk than those used for osteoporosis.",
      source: "korean-2025",
      quote: "For patients scheduled to receive high-dose antiresorptives for oncologic indications, this dental evaluation is considered mandatory and should be completed ideally before therapy begins.",
    },
    {
      action: "At the dental visit, remove teeth that cannot be saved, treat gum and root infections, and adjust or replace ill-fitting dentures",
      why: "The aim is to remove sources of infection and inflammation, and rubbing from dentures, before the medicine starts.",
      source: "korean-2025",
      quote: "Extraction of non-restorable teeth or teeth with a poor prognosis",
    },
    {
      action: "If teeth are removed, delay the first dose, where the cancer allows, until the gum has closed over or the bone has healed enough",
      why: "The medicine slows healing of the jawbone. AAOMS gives no number of days or weeks; the European labels say to delay starting while there are unhealed open wounds in the mouth.",
      source: "aaoms-2022",
      quote: "It remains advisable that antiresorptive therapy should be delayed, if systemic conditions permit, until the surgical site(s) have mucosalized or until there is adequate osseous healing.",
    },
    {
      action: "Discuss the benefits and risks of the medicine, including the risk to the jaw, before starting",
      why: "NICE says this for women offered bisphosphonates after early breast cancer. Smoking and poor oral hygiene are among the risk factors the labels and the Korean statement list, and they can be changed.",
      source: "nice-ng101",
      quote: "Discuss the benefits and risks of bisphosphonate treatment with women, particularly the risk of osteonecrosis of the jaw, atypical femoral fractures and osteonecrosis of the external auditory canal.",
    },
    {
      action: "Teach the person to keep the mouth very clean, to tell the dentist about the medicine, and to contact the doctor and dentist straight away about loose teeth, pain or swelling, sores that do not heal or discharge",
      why: "These can be the first signs of jaw osteonecrosis. The Scottish dental guidance adds exposed bone, tingling and numbness to the list.",
      source: "xgeva-ema",
      quote: "Contact your doctor and dentist immediately if you experience any problems with your mouth or teeth such as loose teeth, pain or swelling, non-healing of sores or discharge, as these could be signs of osteonecrosis of the jaw.",
    },
    {
      action: "During treatment, avoid elective tooth extractions, implants and other surgery on the jawbone",
      why: "The Korean statement calls surgery on the teeth and jawbone the most common trigger. AAOMS says implants should be avoided in people having these medicines by injection for cancer.",
      source: "mascc-isoo-asco-2019",
      quote: "In patients who initiate a BMA, preventive care includes comprehensive dental assessments, discussion of modifiable risk factors, and avoidance of elective dentoalveolar surgery (ie, surgery that involves the teeth or contiguous alveolar bone) during BMA treatment.",
    },
    {
      action: "Keep dental check-ups and preventive dental care going throughout treatment",
      why: "Regular care lowers the chance of needing an extraction later, the Scottish guidance says. The labels say periodically or routinely and give no interval.",
      source: "xgeva-us",
      quote: "Perform an oral examination and appropriate preventive dentistry prior to the initiation of Xgeva and periodically during Xgeva therapy.",
    },
    {
      action: "If jaw surgery becomes necessary, decide with the oncologist and dentist whether to pause the medicine; the evidence does not settle it",
      why: "Pausing has not been shown to protect the jaw, and AAOMS notes it may leave the skeleton less protected against fractures and other bone problems from the cancer.",
      source: "mascc-isoo-asco-2019",
      quote: "It remains uncertain whether BMAs should be discontinued before dentoalveolar surgery.",
    },
    {
      action: "If denosumab is paused or stopped, assess the person's risk of fractures of the spine",
      why: "Bone loss can rebound when denosumab wears off. AAOMS and the Korean statement, writing about the 6-monthly osteoporosis dose, keep any gap short for this reason.",
      source: "xgeva-us",
      quote: "Multiple vertebral fractures (MVF) have been reported following discontinuation of treatment with denosumab.",
    },
    {
      action: "If osteonecrosis develops, have it staged by a clinician experienced in managing it and start with conservative treatment",
      why: "AAOMS describes antiseptic mouth care and better oral hygiene for early disease, and says surgery is an option at every stage and is recommended early where conservative care fails.",
      source: "mascc-isoo-asco-2019",
      quote: "Staging of MRONJ should be performed by a clinician with experience in the management of MRONJ. Conservative measures comprise the initial approach to MRONJ treatment.",
    },
  ],
  bestInClass: {
    statement: "The MASCC/ISOO/ASCO guideline (2019) is the oncology guideline devoted to MRONJ and was read only as an abstract: dental assessment when a bone-modifying agent starts, attention to modifiable risk factors, no elective dentoalveolar surgery during treatment, uncertainty about pausing the drug before necessary surgery, staging by an experienced clinician and conservative treatment first. The sources read in full agree on prevention and say more about timing. The Scottish dental guidance (2017, confirmed extant in 2024) is the only one that grades it: dental fitness before the drug or as soon as possible after, preferably before in cancer, as a strong recommendation on low quality evidence. The Korean 2025 statement makes the check mandatory before high-dose cancer treatment. AAOMS 2022 calls a comprehensive dental examination prudent for everyone before treatment for cancer and advises delaying the first dose, if the cancer allows, until extraction sites have healed. The US labels say to carry out an oral or dental examination with preventive dentistry before starting; the European labels recommend it, the zoledronic acid label in people with other risk factors. On pausing the drug the sources differ: the Scottish guidance does not recommend it, the AAOMS working group was evenly split, the Korean statement sets drug-specific pauses, and the oncology guideline leaves it open. The ESMO 2020 bone health guideline could not be read.",
    sources: ["mascc-isoo-asco-2019", "sdcep-2017", "korean-2025", "aaoms-2022", "xgeva-us", "zoledronic-acid-us", "xgeva-ema", "zometa-ema", "nice-ng101"],
  },
  variants: [
    {
      name: "Fixed drug holidays before dental surgery (Korean 2025)",
      differs: "Sets pauses before invasive dental procedures: 2 months may be considered for alendronate, risedronate or ibandronate in people with long-term use or other risk factors, about 6 to 12 months is recommended for intravenous zoledronate before an elective procedure, and surgery is timed 3 to 4 months after the last denosumab injection. Treatment resumes about 6 to 8 weeks after the procedure. The denosumab timing is built around the 6-monthly osteoporosis dose.",
      evidence: "Expert consensus from literature review and three rounds of surveys; the statement itself calls drug holidays one of the most controversial issues and says the evidence that they lower the risk is inconclusive. MASCC/ISOO/ASCO say it is uncertain whether to stop the drug at all.",
      sources: ["korean-2025", "mascc-isoo-asco-2019"],
    },
    {
      name: "No drug holiday (Scottish dental guidance 2017, extant 2024)",
      differs: "Does not recommend drug holidays to avoid the risk from dental care, and says any decision to pause belongs to the prescriber. For people on 6-monthly denosumab for osteoporosis it accepts delaying non-urgent invasive dental treatment until the month before the next injection, and restarting once the socket and soft tissue have healed.",
      evidence: "The guidance says there is no evidence that stopping a bisphosphonate before an invasive dental procedure lowers the risk, since the drug may persist in bone for years. The zoledronic acid labels say there are no data to suggest whether stopping reduces the risk. The US denosumab label says to consider a temporary pause if an invasive dental procedure must be performed, and that there are no data on how long.",
      sources: ["sdcep-2017", "zoledronic-acid-us", "zometa-ema", "xgeva-us"],
    },
    {
      name: "No agreed position on drug holidays (AAOMS 2022)",
      differs: "The working group could not reach a consensus and was evenly split between offering a pause case by case and never recommending one. Where denosumab is to be suspended in someone with osteoporosis, it says surgery can be done 3 to 4 months after the last dose and the drug restarted 6 to 8 weeks after surgery, to limit the rebound in bone loss. For people with cancer already on treatment it says the benefit of a pause remains unsubstantiated.",
      evidence: "AAOMS calls the evidence for or against drug holidays inconclusive. The Korean statement describes AAOMS 2022 as offering no fixed time-based recommendation; the paper itself does print the denosumab timing above.",
      sources: ["aaoms-2022", "korean-2025"],
    },
    {
      name: "Earlier surgery for established MRONJ (Korean 2025, AAOMS 2022)",
      differs: "The Korean statement recommends that surgery be considered at every stage, including stage 1, particularly if the lesion persists or quality of life is affected. AAOMS says non-operative care remains an option, that surgery is a viable option at all stages, and that early surgery is recommended where non-operative care fails. MASCC/ISOO/ASCO start with conservative measures.",
      evidence: "The Korean statement cites higher rates of complete resolution with surgery than with conservative care; MASCC/ISOO/ASCO's position rests on its 2019 systematic review, which found only 10 randomised trials among 132 publications. The US denosumab label cautions that extensive dental surgery to treat osteonecrosis may make it worse.",
      sources: ["korean-2025", "aaoms-2022", "mascc-isoo-asco-2019", "xgeva-us"],
    },
  ],
  grades: [
    { claim: "Dental fitness before the drug starts or as soon as possible after, and preferably before in people with cancer", grade: "Strong recommendation; low quality evidence", source: "sdcep-2017", quote: "Before commencement of anti-resorptive or anti-angiogenic drug therapy, or as soon as possible thereafter, aim to get the patient as dentally fit as feasible, prioritising preventive care. Higher risk cancer patients should preferably undergo a thorough dental assessment, with remedial dental treatment where required, prior to commencement of the drug therapy." },
    { claim: "Pretreatment dental evaluation and preventive care in cancer patients on high-dose bisphosphonates", grade: "Not graded; one meta-analysis cited by the Korean statement: 77.3 per cent fewer cases", source: "korean-2025", quote: "One meta-analysis reported that pre-treatment dental evaluation and preventive care reduced MRONJ incidence by 77.3% in cancer patients receiving high-dose BPs" },
  ],
  sources: [
    { key: "mascc-isoo-asco-2019", label: "Medication-Related Osteonecrosis of the Jaw: MASCC/ISOO/ASCO Clinical Practice Guideline", publisher: "MASCC, ISOO and ASCO, Journal of Clinical Oncology", year: 2019, url: "https://europepmc.org/abstract/MED/31329513", doi: "10.1200/JCO.19.01186", gradingScheme: "Systematic review and formal consensus with two rounds of voting; the abstract prints no grades.", read: "abstract", accessed: "2026-11-17" },
    { key: "korean-2025", label: "Medication-Related Osteonecrosis of the Jaw: An Evidence-Based 2025 Position Statement from a Korean Multidisciplinary Task Force", publisher: "Five Korean societies, Endocrinology and Metabolism", year: 2025, url: "https://europepmc.org/article/PMC/PMC12765892", doi: "10.3803/EnM.2025.2712", gradingScheme: "Position statement built on literature review and three rounds of expert surveys; recommendations are not graded individually.", read: "full-text", accessed: "2026-11-17" },
    { key: "aaoms-2022", label: "American Association of Oral and Maxillofacial Surgeons' Position Paper on Medication-Related Osteonecrosis of the Jaws: 2022 Update", publisher: "AAOMS, Journal of Oral and Maxillofacial Surgery", year: 2022, url: "https://aaoms.org/wp-content/uploads/2024/03/mronj_position_paper.pdf", doi: "10.1016/j.joms.2022.02.008", gradingScheme: "Position paper by a working group; recommendations are not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "sdcep-2017", label: "Oral Health Management of Patients at Risk of Medication-related Osteonecrosis of the Jaw: Dental Clinical Guidance (March 2017, reviewed and extant March 2024), with the March 2024 supplement", publisher: "Scottish Dental Clinical Effectiveness Programme, NHS Education for Scotland", year: 2017, url: "https://www.sdcep.org.uk/published-guidance/medication-related-osteonecrosis-of-the-jaw/", gradingScheme: "GRADE: each key recommendation is strong or conditional, with the quality of evidence stated after it. Other advice is consensus and expert opinion.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ng101", label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations", publisher: "NICE", year: 2018, url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations. Published July 2018, last updated April 2025.", read: "full-text", accessed: "2026-11-17" },
    { key: "xgeva-us", label: "Xgeva (denosumab) injection, US prescribing information, label version effective 23 June 2026", publisher: "Amgen, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=628f0998-1206-4001-aeee-18133aa9f3bf", read: "full-text", accessed: "2026-11-17" },
    { key: "zoledronic-acid-us", label: "Zoledronic acid injection 4 mg per 5 mL, US prescribing information (Avenacy), label version effective 12 November 2026", publisher: "Avenacy, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4b699dd8-d232-4bdb-88ce-9b42ed93e036", read: "full-text", accessed: "2026-11-17" },
    { key: "xgeva-ema", label: "Xgeva (denosumab): EPAR product information, summary of product characteristics and package leaflet (PDF dated 21 April 2026)", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/xgeva-epar-product-information_en.pdf", read: "full-text", accessed: "2026-11-17" },
    { key: "zometa-ema", label: "Zometa (zoledronic acid): EPAR product information, summary of product characteristics and package leaflet (PDF dated 14 October 2024)", publisher: "European Medicines Agency", year: 2024, url: "https://www.ema.europa.eu/en/documents/product-information/zometa-epar-product-information_en.pdf", read: "full-text", accessed: "2026-11-17" },
    { key: "esmo-2020", label: "Bone health in cancer: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2020, url: "https://doi.org/10.1016/j.annonc.2020.07.019", doi: "10.1016/j.annonc.2020.07.019", read: "not-reachable", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The MASCC/ISOO/ASCO guideline was read only as an abstract, so its grades, its consensus levels and its advice on timing of the dental visit relative to the first dose are not given here. On 17 November 2026 the publisher's site again refused a script and no open copy was found.",
    "On 17 November 2026 the ESMO 2020 bone health guideline could not be read: the publisher refused a script and Europe PMC holds no abstract. Anything it says about dental checks, pausing treatment or a 12-weekly zoledronic acid schedule is not given here. The labels read print zoledronic acid every 3 to 4 weeks and denosumab every 4 weeks.",
    "No source read gives, in days or weeks, how long to wait between a tooth extraction and the first dose. AAOMS says until the site has closed over or the bone has healed enough; the European labels say to delay while there are unhealed open wounds in the mouth. The 6 to 8 weeks in the Korean statement and AAOMS is the wait before restarting after a procedure.",
    "No guideline read settles whether to pause a bone-modifying agent before necessary dental surgery in people with bone metastases, where stopping may itself cause harm. The denosumab timings in the Korean statement, AAOMS and the Scottish guidance all assume the 6-monthly osteoporosis dose, not the 4-weekly cancer dose.",
    "The Korean statement reports that AAOMS 2022 offered no fixed drug holiday recommendation. Read directly, AAOMS records a split working group and does print a timing for denosumab; this page follows the AAOMS text.",
    "The incidence figures come from studies with different doses, follow-up and definitions, and the bodies summarise them differently: the Scottish supplement and AAOMS say typically below 5 per cent in cancer, the European denosumab leaflet says up to 1 in 10 people, and the European zoledronic acid label says uncommon in its clinical trials.",
    "No source read gives how often to repeat dental checks during long-term treatment; the labels say periodically or routinely.",
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
