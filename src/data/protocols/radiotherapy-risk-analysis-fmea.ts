import { protocol } from "./helpers";

/*
 * Risk-based quality management of the radiotherapy process: mapping the process, finding where it can fail, scoring
 * and ranking those failures (failure mode and effects analysis, FMEA), and putting the checks where the risk is.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - AAPM Task Group 100 report, Application of risk analysis methods to radiation therapy quality management (Huq et
 *   al., Medical Physics 2016): abstract only. The full report is in PubMed Central as a PDF-only, non-open-access
 *   record; the full-text XML was not available to a script, so its method is described here as the open papers below
 *   describe it.
 * - Systematic review of prospective hazard analysis in radiation therapy (Medical Physics 2025, open access): full
 *   text, Europe PMC XML (PMC12421374).
 * - Application of an updated severity-based FMEA approach to radiation therapy QA: a multi-institutional exercise
 *   (Rangel et al., Journal of Applied Clinical Medical Physics 2026): full text, Europe PMC XML (PMC13473695).
 * - AAPM MPPG 8.b (2023), sections on risk assessment and the TG-100 working group: full text (PMC10647991).
 * - Dunscombe, Recommendations for safer radiotherapy: what's the message? (Frontiers in Oncology 2012), a mapping of
 *   seven safety documents including the UK's Towards Safer Radiotherapy: full text, Europe PMC XML (PMC3460278).
 * - Towards Safer Radiotherapy (RCR, SCoR, IPEM, NPSA, BIR, 2008) and IAEA risk matrix publications: not read; no
 *   address for the RCR document was found on the RCR site, and the IAEA site challenges scripts.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined; reference numbers inside sentences are avoided by choosing whole sentences without them.
 */
export const radiotherapyRiskAnalysisFmea = protocol({
  id: "radiotherapy-risk-analysis-fmea",
  name: "Risk-based quality management of the radiotherapy process (TG-100 failure mode and effects analysis)",
  aka: ["FMEA radiotherapy", "failure mode and effects analysis", "TG-100", "prospective hazard analysis", "risk priority number", "RPN", "fault tree analysis", "process map radiotherapy", "risk-based QA", "STPA"],
  domain: "radiotherapy",
  tldr: "Most radiotherapy errors come not from broken machines but from steps in the process: a wrong image, a mistyped number, a missed message. Departments therefore map every step of the treatment pathway, ask what could go wrong at each, score how likely, how harmful and how hard to spot each failure would be, and put their safety checks where the risk is highest.",
  simple: "The radiotherapy team looks at every step of your treatment, from the first scan to the last session, and asks what could go wrong. They fix the riskiest steps first, and check again after the fix.",
  summary: "AAPM Task Group 100 (2016) set out the reference method, starting from the observation that many errors are failures of workflow and process rather than of devices and software. A multidisciplinary team maps the process in detail, lists the failure modes at each step, scores occurrence (O), severity (S) and lack of detectability (D), usually from 1 to 10, and ranks them by the risk priority number (RPN = O x S x D). TG-100 looked at the top 20% to 25% by RPN and by severity, leaving each team to set its own threshold; studies commonly treat the top quartile of RPN and any severity of 8 or more as high risk. Fault tree analysis traces how failures propagate, and the quality management programme is then designed around the high-risk failure modes. MPPG 8.b (2023) asks every centre to run its own analysis, with published RPNs used only as a guide.\n\nA 2025 systematic review found 62 prospective hazard analyses in external beam radiotherapy: FMEA in 75%, STPA in 10%; 579 high-risk failure modes, half in treatment delivery sessions and a quarter in contouring and planning; and mitigations that tended to add workload and sit low on the hierarchy of effective interventions. A 2026 Ontario multi-institution exercise by nine physicists found the automotive-industry 'action priority' table, which weights severity and occurrence over detectability, picked out the same critical failures with less scoring disagreement. Incident learning, checklists, training and staffing are the commonest other safety recommendations across seven international documents.",
  asOf: "2026-11-11",
  setting: {
    who: ["multidisciplinary-team", "radiographer", "doctor"],
    where: ["radiotherapy-department"],
  },
  population: "Radiotherapy departments: the whole treatment process (referral, simulation, contouring, planning, checking, delivery) or a new technique or machine before it is introduced. It concerns staff and systems; patients benefit but do not take part.",
  trigger: "Introducing a new technique, machine or software; redesigning a quality management programme; or a periodic review of an existing process.",
  steps: [
    {
      action: "Analyse the whole process, not only the equipment, because most errors happen in workflow and process",
      why: "Machine checks alone miss the commonest causes of error, such as wrong data passed between steps.",
      source: "aapm-tg100",
      quote: "Many errors that occur in radiation oncology are not due to failures in devices and software; rather they are failures in workflow and process.",
      grade: "ungraded (task group report)",
    },
    {
      action: "Assemble a multidisciplinary team (physicists, doctors, radiographers or dosimetrists, and ideally a facilitator) to do the analysis",
      why: "Each profession sees different ways a step can go wrong.",
      source: "pha-review-2025",
      quote: "Disciplines involved in the studies were physicists (92%), physicians (75%), radiation therapists or dosimetrists (71%), external experts (38%), and facilitators (33%).",
      grade: "systematic review finding",
    },
    {
      action: "Draw a detailed process map, list the failure modes at each step, and score each for occurrence, detectability and severity",
      why: "Writing every step down makes hidden weak points visible before they hurt anyone.",
      source: "pha-review-2025",
      quote: "involves generating a process map detailing the linear sequence of events involved in the process through analytical reduction, identifying the failure modes (FM) in each step of the process, assessing the effects of each FM in terms of their occurrence (O), detectability (D) and severity (S), and generating the risk priority number (RPN = O × S × D).",
      grade: "method as described (TG-100)",
    },
    {
      action: "Rank failure modes by RPN (each score from 1 to 10) and treat the top quartile, and any with severity 8 or more, as high risk; set the threshold for your own system",
      why: "A rare but catastrophic failure needs attention even when its overall score is modest.",
      source: "fmea-ap-2026",
      quote: "As suggested in TG-100, PFMs that were in the top quartile of RPN scores and/or with a severity score greater than or equal to eight were deemed to be high risk profile PFMs.",
      grade: "method as described (TG-100)",
    },
    {
      action: "Use fault tree analysis alongside FMEA to see how failures combine and spread",
      why: "Some harms happen only when two small failures line up; a fault tree shows where one check can block both.",
      source: "pha-review-2025",
      quote: "Of the included studies, 11 used fault tree analysis, however, only two studies used FTA alone, the rest of the studies used it alongside FMEA in the way described in TG-100.",
      grade: "systematic review finding",
    },
    {
      action: "Do your own analysis of your own process; use published scores only as a guide",
      why: "Departments differ in equipment, staffing and workflow, so another centre's risk scores do not transfer.",
      source: "aapm-mppg8b",
      quote: "Each center should conduct their own risk analysis of their site-specific QA procedures.",
      grade: "should",
    },
    {
      action: "Choose mitigations that prevent the failure (forcing functions, automation) before ones that only try to detect it, and avoid piling on extra manual checks",
      why: "Preventing an error is more reliable than hoping a busy person spots it later.",
      source: "fmea-ap-2026",
      quote: "The AP framework's emphasis on prevention over detection aligns with established hierarchies of intervention effectiveness.",
      grade: "study discussion (no grade)",
    },
    {
      action: "Re-score the process after the mitigations are in place",
      why: "A fix can fail or create a new risk; checking again shows whether it worked.",
      source: "pha-review-2025",
      quote: "PHA involves the use of a formalized method of assessing and/or defining a system, technology, or technique, evaluating it for hazards, prioritizing the identified hazards and reassessment following the development of mitigation strategies to reduce the risk of the identified hazards.",
      grade: "method as described",
    },
    {
      action: "Run the analysis before a new technique or machine treats patients",
      why: "Risks can be found and designed out before anyone is exposed to them.",
      source: "pha-review-2025",
      quote: "A benefit of PHA is that it can be performed during development of a system, technology, or technique.",
      grade: "review statement",
    },
    {
      action: "Keep the other safety foundations in place alongside risk analysis: training, staffing, documentation, incident learning, communication and checklists",
      why: "Risk analysis is one of several layers; across international safety reports these others are named more often.",
      source: "dunscombe-2012",
      quote: "They are, in order of most to least cited: training, staffing, documentation, incident learning, communication, check lists, quality control and preventive maintenance, dosimetric audit, accreditation, minimizing interruptions, prospective risk assessment, and safety culture.",
      grade: "mapping of seven documents (no grade)",
    },
  ],
  bestInClass: {
    statement: "AAPM TG-100 (2016) is the reference method: a multidisciplinary team maps the process, scores failure modes for occurrence, severity and detectability, ranks them, adds fault tree analysis, and builds the quality management programme around the high-risk failures; MPPG 8.b (2023) asks each centre to do this locally rather than borrow published scores. The 2025 systematic review shows FMEA in three-quarters of published analyses and warns that mitigations often add workload and sit low on the hierarchy of interventions. Where methods differ, both are shown: TG-100's RPN with a severity threshold, or the action priority table that weights severity and occurrence over detectability (Ontario multi-institution exercise, 2026). No trial shows that any risk analysis method reduces patient harm; the evidence is methodological and observational.",
    sources: ["aapm-tg100", "aapm-mppg8b", "pha-review-2025", "fmea-ap-2026"],
  },
  variants: [
    {
      name: "Action priority (AP) instead of the risk priority number",
      differs: "Uses a look-up table from the automotive industry's updated FMEA that ranks failures High, Medium or Low, weighting occurrence over detectability, rather than multiplying O x S x D and applying a quartile and severity cut-off.",
      evidence: "In an exercise by nine physicists from different Ontario cancer centres on 63 failure modes, AP selected 7 high-risk failures and RPN 30; all 7 were among the RPN set; AP was less affected by scoring variability and easier to apply.",
      sources: ["fmea-ap-2026"],
    },
    {
      name: "System theoretic process analysis (STPA)",
      differs: "A top-down method based on system theory: it starts from the events to be prevented and works through how they could come about, focusing on control loops and feedback, instead of listing failure modes step by step.",
      evidence: "Used in 10% of the 62 studies in the 2025 systematic review.",
      sources: ["pha-review-2025"],
    },
    {
      name: "Risk and benefit balance impact template (RABBIT)",
      differs: "A high-level assessment, developed in Australia, of the risks and benefits of a new technology or process before work to introduce it starts.",
      evidence: "Described in the 2025 systematic review; no comparative outcome data.",
      sources: ["pha-review-2025"],
    },
    {
      name: "Prescriptive QA lists without local risk analysis",
      differs: "Following task group tolerance tables (TG-142, MPPG 8.b) as written, without a local FMEA. MPPG 8.b treats its list as the minimum and asks for local risk analysis on top.",
      evidence: "TG-100 argues prescriptive device-focused QA cannot keep pace with complex modern processes; MPPG 8.b keeps a minimum list and cites a survey in which physicists did not agree on the risk of common failures.",
      sources: ["aapm-tg100", "aapm-mppg8b"],
    },
  ],
  grades: [
    { claim: "TG-100 considered the top 20% to 25% of failure modes by RPN and severity, leaving the threshold to each team", grade: "method as reported", source: "pha-review-2025", quote: "TG-100 chose to consider the top 20%–25% of RPN and severity ranked failure modes but indicates that it is up to each individual team to determine the threshold appropriate for their system." },
    { claim: "Published mitigations tend to add workload", grade: "systematic review finding", source: "pha-review-2025", quote: "The mitigation strategies recommended by studies tended to add to the departmental workload." },
    { claim: "Use the MPPG 8.b tests as a minimum for any local risk analysis", grade: "recommendation (committee)", source: "aapm-mppg8b", quote: "We recommend using the tests and frequencies outlined in this report as a minimum for any risk analysis performed and that full consideration be given to the implication of removing any of the recommended minimum components." },
  ],
  sources: [
    {
      key: "aapm-tg100",
      label: "The report of Task Group 100 of the AAPM: Application of risk analysis methods to radiation therapy quality management",
      publisher: "American Association of Physicists in Medicine (Huq et al., Medical Physics)",
      year: 2016,
      url: "https://doi.org/10.1118/1.4947547",
      doi: "10.1118/1.4947547",
      gradingScheme: "Task group report; consensus, not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "pha-review-2025",
      label: "Systematic review of prospective hazard analysis in radiation therapy",
      publisher: "Medical Physics (open access)",
      year: 2025,
      url: "https://doi.org/10.1002/mp.18110",
      doi: "10.1002/mp.18110",
      gradingScheme: "Systematic review (PRISMA); no grades.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "fmea-ap-2026",
      label: "Application of an updated severity-based FMEA approach to Radiation Therapy QA: A multi-institutional exercise",
      publisher: "Rangel et al., Journal of Applied Clinical Medical Physics",
      year: 2026,
      url: "https://doi.org/10.1002/acm2.70674",
      doi: "10.1002/acm2.70674",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "aapm-mppg8b",
      label: "AAPM Medical Physics Practice Guideline 8.b: Linear accelerator performance tests (sections 6.2 to 6.5, risk assessment)",
      publisher: "American Association of Physicists in Medicine (Krauss et al., Journal of Applied Clinical Medical Physics)",
      year: 2023,
      url: "https://doi.org/10.1002/acm2.14160",
      doi: "10.1002/acm2.14160",
      gradingScheme: "AAPM practice guideline wording: 'must' and 'should'.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "dunscombe-2012",
      label: "Recommendations for safer radiotherapy: what's the message?",
      publisher: "Dunscombe, Frontiers in Oncology",
      year: 2012,
      url: "https://doi.org/10.3389/fonc.2012.00129",
      doi: "10.3389/fonc.2012.00129",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "towards-safer-rt",
      label: "Towards Safer Radiotherapy",
      publisher: "The Royal College of Radiologists, Society and College of Radiographers, IPEM, National Patient Safety Agency and British Institute of Radiology",
      year: 2008,
      url: "https://www.rcr.ac.uk/",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["c-arm-linac", "imrt-igrt"],
  related: ["linear-accelerator-quality-assurance", "radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "The full TG-100 report was not read: PubMed Central holds it as a non-open PDF and the publisher's copy is paywalled. Its method is described from its abstract and from open papers that quote it.",
    "Towards Safer Radiotherapy (UK, 2008) and the IAEA risk matrix publications were not read; the UK document is known here only through a 2012 mapping paper.",
    "No study shows that prospective risk analysis reduces patient harm; the evidence is that it finds failure modes, not that outcomes improve.",
    "Scoring is subjective: published studies vary in scales, thresholds and team make-up, and physicists in one survey did not agree on the risk of common failures.",
  ],
});
