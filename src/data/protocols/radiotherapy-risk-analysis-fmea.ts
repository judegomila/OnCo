import { protocol } from "./helpers";

/*
 * Risk-based quality management of the radiotherapy process: mapping the process, finding where it can fail, scoring
 * and ranking those failures (failure mode and effects analysis, FMEA), and putting the checks where the risk is.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was re-read as raw text
 * and every claim checked against it.
 * - AAPM Task Group 100 report, Application of risk analysis methods to radiation therapy quality management (Huq et
 *   al., Medical Physics 2016): full text. On 11 November only the abstract could be read; on 17 November the PubMed
 *   Central article page (PMC4985013) read as text, in a copy another checker of this pass saved the same day. Five
 *   steps that had rested on papers describing TG-100 now quote TG-100 itself. Its Table III breaks into fragments as
 *   text, so only its numbered headings are used and nothing is quoted from it. Its supplementary appendices were
 *   not read.
 * - Systematic review of prospective hazard analysis in radiation therapy (Hindmarsh et al., Medical Physics 2025,
 *   open access): full text, Europe PMC XML (PMC12421374), fetched again.
 * - Application of an updated severity-based FMEA approach to radiation therapy QA: a multi-institutional exercise
 *   (Rangel et al., Journal of Applied Clinical Medical Physics 2026): full text, Europe PMC XML (PMC13473695),
 *   fetched again.
 * - AAPM MPPG 8.b (2023), sections on risk assessment and the TG-100 working group: full text, Europe PMC XML
 *   (PMC10647991), in a copy another checker of this pass saved the same day.
 * - Dunscombe, Recommendations for safer radiotherapy: what's the message? (Frontiers in Oncology 2012), a mapping of
 *   seven safety documents including the UK's Towards Safer Radiotherapy: full text, Europe PMC XML (PMC3460278),
 *   fetched again.
 * - Towards Safer Radiotherapy (RCR, SCoR, IPEM, NPSA, BIR, 2008): full text. The RCR's own PDF address returned 404;
 *   the PDF was read with pdftotext from the Internet Archive's capture of that address (16 September 2025).
 * - IAEA risk matrix publications: not read; the one address tried on the IAEA publications site returned 404.
 *
 * Every DOI was resolved through Crossref and its title checked; no update notice was attached to any of them. Quotes
 * were cut from the raw text by script, with line breaks joined and nothing else changed, so they keep the
 * publishers' own hyphen characters; whole sentences without reference numbers were chosen.
 */
export const radiotherapyRiskAnalysisFmea = protocol({
  id: "radiotherapy-risk-analysis-fmea",
  name: "Risk-based quality management of the radiotherapy process (TG-100 failure mode and effects analysis)",
  aka: ["FMEA radiotherapy", "failure mode and effects analysis", "TG-100", "prospective hazard analysis", "risk priority number", "RPN", "fault tree analysis", "process map radiotherapy", "risk-based QA", "STPA"],
  domain: "radiotherapy",
  tldr: "Many radiotherapy errors come not from broken machines but from the way the work is done, such as a misread image or a mistyped number. Departments therefore map each step of the treatment pathway, ask what could go wrong at each, score how likely, how harmful and how hard to spot each failure would be, and put their safety checks where the risk is highest.",
  simple: "The radiotherapy team looks at every step of your treatment, from the first scan to the last session, and asks what could go wrong. They deal with the riskiest steps first, and look again after a change.",
  summary: "AAPM Task Group 100 (2016) set out the reference method, starting from the observation that many errors are failures of workflow and process rather than of devices and software. A team drawn from every staff group maps the process, lists the failure modes at each step, scores occurrence (O), severity (S) and lack of detectability (D), each from 1 to 10 on TG-100's scales, and ranks them by the risk priority number (RPN = O x S x D). As an example, TG-100 marked the steps with the highest 20% to 25% of RPN values and, irrespective of RPN, those with a severity of 8 or more; the 2025 review notes that it leaves each team to set its own threshold. Fault tree analysis then traces how failures propagate, and the quality management programme is built from the result. TG-100 ranks quality tools by effectiveness, with forcing functions first and education last, and says the FMEA needs updating after a redesign. MPPG 8.b (2023) says each centre should run its own analysis, with published RPNs used only as a guide. In the UK, Towards Safer Radiotherapy (2008) recommends a risk assessment whenever a new or changed technique or process is introduced.\n\nA 2025 systematic review found 62 prospective hazard analyses in X-ray external beam radiotherapy: FMEA in 75%, methods derived from FMEA in 10% and STPA in 10%; physicists took part in 92% and physicians in 75%. Most used scales of 1 to 10, and the thresholds for high risk varied: an RPN above 100 was the commonest fixed cut-off and the top 20% the commonest percentage. The review extracted 579 high-risk failure modes, 50% in treatment delivery sessions and 25% in contouring and planning, and found that the mitigations recommended tended to add workload and that many sat low on the hierarchy of effective interventions. A 2026 exercise by nine physicists from Ontario cancer centres compared the RPN with the automotive industry's 'action priority' table, which weights severity most and detectability least: it selected 7 high-risk failure modes, all of them among the 30 selected by the top RPN quartile or a severity of 8 or more, and appeared less affected by scoring variability. Across seven safety documents mapped in 2012, the topics cited most often were training, staffing, documentation and incident learning; prospective risk assessment was cited in three of the seven.",
  asOf: "2026-11-17",
  setting: {
    who: ["multidisciplinary-team", "radiographer", "doctor"],
    where: ["radiotherapy-department"],
  },
  population: "Radiotherapy departments: the whole treatment process (referral, simulation, contouring, planning, checking, delivery) or a new or changed technique before it is introduced. It concerns staff and systems; patients do not take part. TG-100's worked example is intensity modulated radiotherapy, and the 2025 review covers X-ray external beam radiotherapy only (it excluded brachytherapy, intraoperative radiotherapy and electrons).",
  trigger: "A new or changed technique or process (Towards Safer Radiotherapy, UK); TG-100 gives priority to high-risk, high-severity, new and resource-intensive procedures, then recommends risk analysis as an ongoing activity, with each institution deciding how often to repeat it.",
  steps: [
    {
      action: "Analyse the whole process, not only the equipment, because many errors are failures of workflow and process",
      why: "Traditional guidelines have focused on checking equipment against tolerances, which does not address failures in the way the work is done.",
      source: "aapm-tg100",
      quote: "Many errors that occur in radiation oncology are not due to failures in devices and software; rather they are failures in workflow and process.",
      grade: "ungraded (task group report)",
    },
    {
      action: "Assemble a team with representatives of every staff group in the treatment team: doctors, physicists, dosimetrists, radiographers, nurses, IT support, machine maintenance and administration",
      why: "Team members contribute most to the analysis of the steps and failure modes that involve their own work. TG-100 also says each FMEA team should have a facilitator.",
      source: "aapm-tg100",
      quote: "TG 100 recommends a team-based approach that requires active participation of representatives from all treatment team member categories (physicians, physicists, dosimetrists, therapists, nurses, IT support, machine maintenance, administration, etc.).",
      grade: "recommended by the task group (ungraded)",
    },
    {
      action: "Draw a detailed process map, list the failure modes at each step, and score each for occurrence, detectability and severity",
      why: "Failure modes are identified step by step, so the process has to be written down first.",
      source: "pha-review-2025",
      quote: "involves generating a process map detailing the linear sequence of events involved in the process through analytical reduction, identifying the failure modes (FM) in each step of the process, assessing the effects of each FM in terms of their occurrence (O), detectability (D) and severity (S), and generating the risk priority number (RPN = O × S × D).",
      grade: "method as described (TG-100)",
    },
    {
      action: "Rank failure modes by RPN, mark the highest-ranked steps and, whatever their RPN, the steps with high severity",
      why: "A failure that would do severe harm is given special attention even when its overall RPN is not high. TG-100's own examples are the highest 20% to 25% of RPN values and a severity of 8 or more on its scale of 1 to 10; it gives them as examples, not as fixed rules.",
      source: "aapm-tg100",
      quote: "Irrespective of the RPN values, the steps with high severity rankings should also be marked.",
      grade: "should (task group, ungraded)",
    },
    {
      action: "Follow the FMEA with a fault tree analysis to see how failures propagate",
      why: "On a fault tree, an error in a step that is checked gets through only if the check fails too, so the tree shows which steps are not covered by quality management.",
      source: "aapm-tg100",
      quote: "The third step in the overall analysis is to evaluate the propagation of failures using a fault tree analysis.",
      grade: "method as described (task group, ungraded)",
    },
    {
      action: "Do your own analysis of your own process; use published scores only as a guide",
      why: "Each centre has unique features in its processes, so published RPNs are not absolute measures of its risk.",
      source: "aapm-mppg8b",
      quote: "Each center should conduct their own risk analysis of their site‐specific QA procedures.",
      grade: "should",
    },
    {
      action: "When possible, choose the most effective quality tools: forcing functions such as interlocks first, then automation, ahead of checks, rules and education",
      why: "TG-100 says the greatest efficacy lies in forcing functions that prevent a wrong action, and that even with the best training humans fail. It adds that resources and practicality often lead to the lower-ranked tools, that education is still essential, and that any of the tools has value used judiciously.",
      source: "aapm-tg100",
      quote: "When possible, the most effective tools should be used, but resources and practicality often lead to tools from later in the table.",
      grade: "should (task group, ungraded)",
    },
    {
      action: "Update the FMEA after a process is redesigned, and re-evaluate the process once it has run for some time",
      why: "A new process could create new, unexpected hazards, and re-evaluation shows how well the quality measures are working.",
      source: "aapm-tg100",
      quote: "Following a redesign, updating the FMEA becomes necessary since the new process could create some new unexpected hazards.",
      grade: "method as described (task group, ungraded)",
    },
    {
      action: "Carry out a risk assessment when a new or changed technique or process is to be introduced, and consider extra verification for the first patients (UK recommendation)",
      why: "The UK report says the introduction of a new technique needs careful planning: a thorough risk assessment, a review of staffing and skills, and updated documentation.",
      source: "towards-safer-rt",
      quote: "When new or changed treatment techniques or processes are to be introduced, a risk assessment should be undertaken and consideration given to additional verification procedures for the initial cohort of patients.",
      grade: "Recommendation (consensus of the five bodies, ungraded)",
    },
    {
      action: "Keep the other safety foundations in place alongside risk analysis: training, staffing, documentation, incident learning, communication and checklists",
      why: "Risk analysis is one of several safety measures; across seven safety documents these others were cited more often.",
      source: "dunscombe-2012",
      quote: "They are, in order of most to least cited: training, staffing, documentation, incident learning, communication, check lists, quality control and preventive maintenance, dosimetric audit, accreditation, minimizing interruptions, prospective risk assessment, and safety culture.",
      grade: "mapping of seven documents (no grade)",
    },
  ],
  bestInClass: {
    statement: "AAPM TG-100 (2016) is the reference method: a team from every staff group maps the process, scores failure modes for occurrence, severity and detectability, ranks them, adds fault tree analysis, and builds the quality management programme around the highest-ranked and most severe failures, using the most effective tools where possible; MPPG 8.b (2023) says each centre should do this locally rather than borrow published scores, and the UK's Towards Safer Radiotherapy (2008) recommends a risk assessment for any new or changed technique or process. The 2025 systematic review shows FMEA in three-quarters of published analyses and reports that the mitigations recommended tended to add workload and often sat low on the hierarchy of effective interventions. Where methods differ, both are shown: TG-100's RPN with a severity cut-off, or the action priority table that weights severity most and detectability least (Ontario multi-institution exercise, 2026). None of the sources read reports a study showing that a risk analysis method reduces harm to patients: the recommendations are consensus, the review collected methods and recommendations, not outcomes, and TG-100 itself says the benefit of a risk-based approach should eventually be validated at the local clinic.",
    sources: ["aapm-tg100", "aapm-mppg8b", "towards-safer-rt", "pha-review-2025", "fmea-ap-2026"],
  },
  variants: [
    {
      name: "Action priority (AP) instead of the risk priority number",
      differs: "Uses a look-up table from the automotive industry's 2019 FMEA update (AIAG and VDA) that classes failures as High, Medium or Low, weighting severity most heavily and detectability least, rather than multiplying O x S x D and applying a quartile and severity cut-off.",
      evidence: "In an exercise by nine physicists from different Ontario cancer centres on 63 failure modes of a generic workflow, AP (High or Medium) selected 7 high-risk failure modes and the RPN method those 7 and a further 23. The authors report that AP appeared less affected by scoring variability and was generally easier to apply. It is a scoring exercise, not a study of outcomes.",
      sources: ["fmea-ap-2026"],
    },
    {
      name: "System theoretic process analysis (STPA)",
      differs: "A top-down method based on system theory: it starts from the events to be prevented and works through how they could come about, focusing on control loops and feedback, instead of listing failure modes step by step.",
      evidence: "Used in six of the 62 studies (10%) in the 2025 systematic review, which calls it the most developed alternative to FMEA.",
      sources: ["pha-review-2025"],
    },
    {
      name: "Risk and benefit balance impact template (RABBIT)",
      differs: "A high-level assessment, developed in Australia, of the risks and benefits of a new technology or process before work to introduce it starts.",
      evidence: "Described in the 2025 systematic review, in which one of the 62 studies used it.",
      sources: ["pha-review-2025"],
    },
    {
      name: "Prescriptive QA lists without local risk analysis",
      differs: "Following task group tolerance tables (TG-142, MPPG 8.b) as written, without a local FMEA. MPPG 8.b recommends its list as the minimum for any local risk analysis.",
      evidence: "TG-100 says the increasing complexity of planning and delivery challenges prescriptive, equipment-focused quality management, and also that prescriptive approaches will continue to play a role. MPPG 8.b keeps a minimum list and cites a survey with 184 responses in which the risk of common failures was not agreed upon.",
      sources: ["aapm-tg100", "aapm-mppg8b"],
    },
  ],
  grades: [
    { claim: "TG-100 considered the top 20% to 25% of failure modes by RPN and severity, leaving the threshold to each team", grade: "method as reported", source: "pha-review-2025", quote: "TG‐100 chose to consider the top 20%–25% of RPN and severity ranked failure modes but indicates that it is up to each individual team to determine the threshold appropriate for their system." },
    { claim: "TG-100's own severity cut-off was 8, given as an example", grade: "example (task group, ungraded)", source: "aapm-tg100", quote: "For example, TG 100 chose a severity value of 8 for this cut-off." },
    { claim: "The Ontario exercise treated the top quartile by RPN, or a severity of 8 or more, as high risk, citing TG-100", grade: "study method (no grade)", source: "fmea-ap-2026", quote: "As suggested in TG‐100, PFMs that were in the top quartile of RPN scores and/or with a severity score greater than or equal to eight were deemed to be high risk profile PFMs." },
    { claim: "Published mitigations tend to add workload", grade: "systematic review finding", source: "pha-review-2025", quote: "The mitigation strategies recommended by studies tended to add to the departmental workload." },
    { claim: "Use the MPPG 8.b tests as a minimum for any local risk analysis", grade: "recommendation (committee)", source: "aapm-mppg8b", quote: "We recommend using the tests and frequencies outlined in this report as a minimum for any risk analysis performed and that full consideration be given to the implication of removing any of the recommended minimum components." },
    { claim: "Who took part in published analyses", grade: "systematic review finding", source: "pha-review-2025", quote: "Disciplines involved in the studies were physicists (92%), physicians (75%), radiation therapists or dosimetrists (71%), external experts (38%), and facilitators (33%)." },
    { claim: "Fault tree analysis was used in 11 of 62 published analyses, mostly alongside FMEA", grade: "systematic review finding", source: "pha-review-2025", quote: "Of the included studies, 11 used fault tree analysis, however, only two studies used FTA alone, the rest of the studies used it alongside FMEA in the way described in TG‐100." },
    { claim: "The action priority approach directs mitigation towards prevention", grade: "study discussion (no grade)", source: "fmea-ap-2026", quote: "The AP framework's emphasis on prevention over detection aligns with established hierarchies of intervention effectiveness." },
    { claim: "Reassessment after mitigation is part of prospective hazard analysis", grade: "method as described", source: "pha-review-2025", quote: "PHA involves the use of a formalized method of assessing and/or defining a system, technology, or technique, evaluating it for hazards, prioritizing the identified hazards and reassessment following the development of mitigation strategies to reduce the risk of the identified hazards." },
    { claim: "The analysis can be done while a system is still being developed", grade: "review statement", source: "pha-review-2025", quote: "A benefit of PHA is that it can be performed during development of a system, technology, or technique." },
    { claim: "Each FMEA team should have a facilitator", grade: "should (task group, ungraded)", source: "aapm-tg100", quote: "Each FMEA team should have a facilitator, preferably someone not intimately involved in the process under review." },
    { claim: "The benefit of a risk-based approach still needs validating locally", grade: "should (task group, ungraded)", source: "aapm-tg100", quote: "Eventually, validation of the benefit of using a risk-based QM approach should be performed at the local clinic." },
  ],
  sources: [
    {
      key: "aapm-tg100",
      label: "The report of Task Group 100 of the AAPM: Application of risk analysis methods to radiation therapy quality management",
      publisher: "American Association of Physicists in Medicine (Huq et al., Medical Physics)",
      year: 2016,
      url: "https://doi.org/10.1118/1.4947547",
      doi: "10.1118/1.4947547",
      gradingScheme: "Task group report; consensus, not graded. Its recommendations are worded 'it is recommended' and 'should'.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "pha-review-2025",
      label: "Systematic review of prospective hazard analysis in radiation therapy",
      publisher: "Hindmarsh et al., Medical Physics (open access)",
      year: 2025,
      url: "https://doi.org/10.1002/mp.18110",
      doi: "10.1002/mp.18110",
      gradingScheme: "Systematic review (PRISMA); no grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "fmea-ap-2026",
      label: "Application of an updated severity-based FMEA approach to Radiation Therapy QA: A multi-institutional exercise",
      publisher: "Rangel et al., Journal of Applied Clinical Medical Physics",
      year: 2026,
      url: "https://doi.org/10.1002/acm2.70674",
      doi: "10.1002/acm2.70674",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aapm-mppg8b",
      label: "AAPM Medical Physics Practice Guideline 8.b: Linear accelerator performance tests (sections 6.2 to 6.5, risk assessment)",
      publisher: "American Association of Physicists in Medicine (Krauss et al., Journal of Applied Clinical Medical Physics)",
      year: 2023,
      url: "https://doi.org/10.1002/acm2.14160",
      doi: "10.1002/acm2.14160",
      gradingScheme: "AAPM practice guideline wording: 'must' (adherence is considered necessary) and 'should' (a prudent practice to which exceptions may occasionally be made).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "dunscombe-2012",
      label: "Recommendations for safer radiotherapy: what's the message?",
      publisher: "Dunscombe, Frontiers in Oncology",
      year: 2012,
      url: "https://doi.org/10.3389/fonc.2012.00129",
      doi: "10.3389/fonc.2012.00129",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "towards-safer-rt",
      label: "Towards Safer Radiotherapy",
      publisher: "The Royal College of Radiologists, Society and College of Radiographers, IPEM, National Patient Safety Agency and British Institute of Radiology",
      year: 2008,
      url: "https://web.archive.org/web/20250916233706/https://www.rcr.ac.uk/media/zbtjvtsr/rcr-publications_towards-safer-radiotherapy_april-2008.pdf",
      gradingScheme: "Not graded: sections end with a boxed recommendation agreed by the five bodies.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["c-arm-linac", "imrt-igrt"],
  related: ["linear-accelerator-quality-assurance", "radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "The full TG-100 report could not be read by a script on 11 November 2026 and was read in full on 17 November 2026 from its PubMed Central article page. Its table ranking quality tools breaks into fragments as text, so only its numbered headings were used, and its supplementary appendices (the complete failure mode lists for its worked example) were not read.",
    "Towards Safer Radiotherapy (UK, 2008) was read on 17 November 2026 from the Internet Archive's capture of the Royal College of Radiologists' PDF, because the College's own address returned 404; whether a later edition exists was not established. The IAEA risk matrix publications were not read: on 17 November 2026 the one address tried on the IAEA publications site returned 404.",
    "None of the sources read reports a study showing that prospective risk analysis reduces harm to patients. The 2025 review had no comparator and collected methods and recommendations, not outcomes; the 2012 mapping paper says six of its seven documents rest on the consensus opinions of expert groups; TG-100 names the lack of measured data on how often failures occur and are detected as a major limitation.",
    "Scoring is subjective: published studies vary in scales, thresholds and team make-up, and in one survey cited by MPPG 8.b the risk of common failures was not agreed upon.",
    "No newer edition of, or update notice for, TG-100, MPPG 8.b or the three papers was found in Crossref or Europe PMC on 17 November 2026.",
    "Only the UK source read says when a risk assessment is required (for a new or changed technique or process). The American sources recommend the method and leave timing and frequency to each institution.",
  ],
});
