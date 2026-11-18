import { protocol } from "./helpers";

/*
 * Quality assurance of the machine that gives most radiotherapy: the daily, weekly, monthly and annual checks a
 * medical physics team makes on a C-arm linear accelerator, and the checks after it has been repaired.
 *
 * What was read, and how (first on 11 November 2026; every source re-read on 17 November 2026 in a second accuracy
 * pass, fetched raw and read as text, each quote re-checked by script against the raw text):
 * - AAPM Medical Physics Practice Guideline 8.b, Linear accelerator performance tests (Krauss et al., Journal of
 *   Applied Clinical Medical Physics 2023): full text, Europe PMC XML (PMC10647991), including Tables 3 to 8 of
 *   tests, frequencies and action limits. It is the 5-year update of MPPG 8.a and the most recent AAPM list of
 *   linac tests found; no MPPG 8.c and no correction notice was found in Europe PMC or Crossref on 17 November.
 * - AAPM MPPG 8.a (Smith et al., 2017): full text, Europe PMC XML (PMC5874895), read on 17 November (the first
 *   pass had read the abstract only).
 * - Tassano-Smith et al., A survey and analysis of radiotherapy linear accelerator quality control in the United
 *   Kingdom (British Journal of Radiology 2025), on behalf of IPEM: full text, Europe PMC XML (PMC12377463). It is the
 *   source for how UK practice compares with IPEM Report 81.
 * - IPEM topical report on linac manufacturer integrated quality control (Physics in Medicine and Biology 2025):
 *   abstract, Europe PMC.
 * - AAPM TG-142 (2009) and TG-198 (2021): abstracts only, Europe PMC; the full reports are behind the Medical Physics
 *   paywall, and the AAPM's own copy of TG-142 answered 403 to a script on 17 November. No TG-142 tolerance is on
 *   this page.
 * - IPEM Report 81, Physics Aspects of Quality Control in Radiotherapy, 2nd edition (2018): not reachable (a priced
 *   book); its recommendations are given only as the UK survey reports them.
 *
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined; the guideline's typographic hyphens (U+2010) are kept as printed. The daily output
 * quote stops at "TG-51" because reference numbers interrupt the sentence there.
 * Each report's figures are kept apart: a limit on this page is MPPG 8.b's unless the sentence names another report.
 * The limits and figures were independently re-read on 17 November 2026 against the MPPG 8.b and 8.a full texts and
 * the UK survey's Table 4; the survey's notification and suspension counts are now given for photons and electrons.
 */
export const linearAcceleratorQualityAssurance = protocol({
  id: "linear-accelerator-quality-assurance",
  name: "Linear accelerator quality assurance: daily, weekly, monthly and annual machine checks",
  aka: ["linac QA", "linac quality control", "machine QA", "morning QA", "daily output check", "TG-142", "MPPG 8.b", "IPEM Report 81", "Winston-Lutz test", "picket fence test"],
  domain: "radiotherapy",
  tldr: "On each treatment day the radiotherapy team checks that the treatment machine gives the right dose, aims at the right place and that its safety systems work. Bigger checks follow every week, month and year, and after repairs. If a check fails, a medical physicist decides whether the machine can still be used.",
  simple: "The radiotherapy machine is tested on every day it treats, and no beam is used without its daily check. Physicists test it more deeply each week, month and year. If a test fails, a physicist decides whether the machine is taken out of use, used only for some treatments, or kept in use because the failure does not affect them.",
  summary: "The AAPM's current list (MPPG 8.b, 2023, written for the United States) sets a minimum for C-arm machines giving general treatment: the qualified medical physicist (QMP) designs the programme, chooses tests that fit how the machine is used, and takes responsibility for the results. Its limits are action limits: a result outside one is likely to reduce the quality of care, and the QMP then decides whether the machine is removed from service, limited to some treatments or kept in use. Daily, on the beams in use that day: photon and electron output within 3% of the device baseline, profile constancy within 2%, the patient-positioning system (each system within 2 mm for non-stereotactic treatment; lasers within 2 mm of the isocentre if used for final set-up), the distance indicator if it is used that day and one jaw setting (2 mm each), and safety: door interlock, audio and video monitoring of the patient, beam-on indicators and one anti-collision system in rotation. Weekly: quantitative multileaf collimator leaf-position accuracy within 0.5 mm, at different gantry angles or in arc mode (a quantitative picket-fence type test is acceptable; log file analysis alone is not). Monthly: output within 2% of the device baseline, energy and profile constancy, gantry and collimator angle readouts within 0.5 degrees, couch position within 2 mm and 1 degree, and a holistic sliding-window or VMAT test within 2% of the planned dose. Annually: output measured in water to TG-51 or a comparable protocol with equipment calibrated by an accredited secondary standards laboratory within the previous two years, within 1% of the expected dose and validated externally; beam profiles within 2% and photon energy within 1% of the planning system; radiation isocentre with all axes within 1 mm (a Winston-Lutz type test where possible, otherwise star shots within a 2 mm circle); small-field output factors against the planning system; a review of machine settings; the emergency features; and an end-to-end test within 5%. After maintenance the QMP's summary of return-to-service checks applies, and manufacturers' technical bulletins are reviewed immediately. SRS and SBRT follow the stereotactic tests and limits of MPPG 9 instead.\n\nIn the UK, IPEM Report 81 (2018) informs practice in 91% of centres; a 2025 IPEM survey found centres meeting or exceeding it for the majority of tests, with 26% still measuring standard output weekly against the report's monthly recommendation. MPPG 8.b did not repeat the failure mode analysis of its 2017 edition and says each institution should do its own, using its tests as the floor.",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "multidisciplinary-team"],
    where: ["radiotherapy-department"],
  },
  population: "C-arm medical linear accelerators giving external beam photon or electron radiotherapy. MPPG 8.b covers C-arm machines only and assumes a general-purpose machine, so on-board imaging equipment, machines of other designs (ring-gantry, helical, robotic, MR-guided) and stereotactic limits are outside it and are named, not detailed. The QMP directs the checks and may delegate them to qualified staff such as physics assistants, dosimetrists and radiation therapists (therapeutic radiographers in the UK); patients are affected by them but do not take part.",
  trigger: "Every treatment day, and on the weekly, monthly and annual schedule; also after maintenance or repair, after a software update or upgrade, and when a manufacturer's technical bulletin arrives.",
  steps: [
    {
      action: "Put a qualified medical physicist in charge of the machine QA programme, with defined tests, frequencies and action limits",
      why: "One accountable expert designs and directs the testing, takes professional responsibility for it and makes sure results meet the action limits.",
      source: "aapm-mppg8b",
      quote: "The qualified medical physicist (QMP) must establish routine testing to ensure that the linac's current performance has not deviated from the clinical parameters acquired at the time of acceptance and commissioning of the machine.",
      grade: "must",
    },
    {
      action: "Choose tests that match what the machine is used for",
      why: "The tests have to be able to find the errors that matter for the treatments that machine gives; the guideline's example is a couch used for prostate treatment against one used for cranial radiosurgery.",
      source: "aapm-mppg8b",
      quote: "Performance tests on each linac must be selected to fit the clinical patterns of use of the accelerator, and care must be given to selecting and performing tests that are relevant to detecting errors related to the specific use of the accelerator.",
      grade: "must",
    },
    {
      action: "On every treatment day, check the output of each beam before it is used; report any reading more than 3% from the device baseline to the physicist",
      why: "The guideline calls output one of the most important measures of accurate treatment; the daily check means no beam is used unchecked.",
      source: "aapm-mppg8b",
      quote: "Daily output checks must be performed on all clinically used beams and must fall within 3% of that dosimetry system's nominal device baseline that correlates to the reference dose output at TG‐51",
      grade: "must",
    },
    {
      action: "Every day, check the accuracy of whatever positions the patient (lasers, imaging or surface guidance): each system within 2 mm for treatment that is not stereotactic, and lasers used for final set-up within 2 mm of the isocentre",
      why: "A change in the alignment of the set-up equipment could compromise the accuracy of treatment; regular tests detect it.",
      source: "aapm-mppg8b",
      quote: "The accuracy of the device(s) used to position the patients must be evaluated daily.",
      grade: "must",
    },
    {
      action: "Every day, check that the door interlock stops the beam, that the audio and video monitoring of the patient works, that the beam-on indicators at the console and the door work, and one anti-collision system in rotation",
      why: "The door interlock must end the beam if the door is opened; the other checks confirm that the monitoring, the warning indicators and the collision guards work.",
      source: "aapm-mppg8b",
      quote: "Daily, the functionality of the door interlock must be checked to ensure that the radiation beam will terminate if the door is opened.",
      grade: "must",
    },
    {
      action: "Do not treat without at least one working audio channel and one working video channel to the patient",
      why: "Staff watch and listen to the patient through these systems; the guideline makes one channel of each a condition of using the machine clinically.",
      source: "aapm-mppg8b",
      quote: "At least one channel of audio and one channel of video monitoring are required for clinical use of the machine.",
      grade: "required",
    },
    {
      action: "Every week, check the position of all multileaf collimator leaves quantitatively, to within 0.5 mm, at different gantry angles or in arc mode; a quantitative picket-fence type test is acceptable",
      why: "Testing at more than one gantry angle detects errors caused by gravity; the guideline found the visual tests recommended before could miss errors that matter.",
      source: "aapm-mppg8b",
      quote: "The test must be performed at different gantry angles or in arc mode to detect any gravity‐induced positional errors.",
      grade: "must",
    },
    {
      action: "Do not rely on the machine's own log files alone to check leaf positions; use a test that measures the radiation field",
      why: "The guideline's position in 2023 is that log file analysis cannot yet replace a measurement of the radiation field.",
      source: "aapm-mppg8b",
      quote: "At this time, log file analysis alone is not an adequate replacement for testing that measures the radiation field to detect leaf position.",
      grade: "statement in the guideline's text (the sentence carries neither 'must' nor 'should')",
    },
    {
      action: "Every month, check the output of every clinical beam to within 2% of that measuring system's baseline",
      why: "The monthly limit is tighter than the daily one, and the guideline describes using different equipment for daily, monthly and annual checks so that a fault in one device does not go unnoticed.",
      source: "aapm-mppg8b",
      quote: "Monthly output checks must be performed on all clinically used beams and must fall within 2% of that dosimetry system's nominal baseline that correlates to the reference dose output at TG‐51 reference conditions.",
      grade: "must",
    },
    {
      action: "Every year, measure the output in water to TG-51 (or a comparable protocol) with equipment calibrated by an accredited secondary standards laboratory in the previous two years, and have the result validated externally",
      why: "The daily and monthly measuring systems take their baselines from this calibration, so every other output check depends on it.",
      source: "aapm-mppg8b",
      quote: "Annual output measurements must be performed in accordance with TG‐51, a comparable protocol, or successors in water with equipment calibrated by an accredited secondary standards laboratory within the previous two years.",
      grade: "must",
    },
    {
      action: "Every year, test that collimator, gantry and couch rotate about the same point within 1 mm, with a Winston-Lutz type test where the centre can do one; where it cannot, use star shots for each axis, each within a circle under 2 mm across",
      why: "The treatment beam rotates around this point; the test shows how far the centre of the beam moves as the gantry, collimator and couch turn.",
      source: "aapm-mppg8b",
      quote: "Annually, the radiation isocentricity must be tested to ensure all axes (collimator, gantry, and couch) rotate about the same location within 1 mm.",
      grade: "must",
    },
    {
      action: "Write a summary of the return-to-service checks for typical maintenance, and do the required tests before the machine treats again",
      why: "Service work can introduce risk if a repair did not succeed or affected another part of the machine; a set list keeps the return to service consistent.",
      source: "aapm-mppg8b",
      quote: "The QMP must create a summary of the return‐to‐service QA for typical machine maintenance activities that includes the vendor recommendations and any other tests the QMP deems necessary, thereby providing consistency in returning a linac to clinical service.",
      grade: "must",
    },
    {
      action: "Review manufacturers' technical bulletins immediately and service reports promptly, and decide whether a bulletin applies to your machine",
      why: "Bulletins warn of known possible faults; the guideline cites a finding that nearly 50% of radiotherapy device recalls in the FDA's database involved linacs or their control software.",
      source: "aapm-mppg8b",
      quote: "Therefore, customer technical bulletins or other documents that alert the linac operator to known potential issues or malfunctions of the machine must be reviewed immediately.",
      grade: "must",
    },
    {
      action: "When a result is out of limits, consider every test of that parameter before adjusting the machine or resetting a baseline",
      why: "A failed daily output check may be caused by a change in beam energy; an adjustment made without looking at the related tests can affect other values.",
      source: "aapm-mppg8b",
      quote: "Therefore, the QMP must ensure that all tests being performed for a clinical parameter are considered before making any machine adjustments and potentially changing any device baseline or reference values.",
      grade: "must",
    },
    {
      action: "When a test fails, have the physicist decide whether the machine is removed from service or limited to certain treatments",
      why: "Some failures do not matter clinically for some kinds of treatment, so the decision depends on how severe the failure is, which system failed and what is being treated.",
      source: "aapm-mppg8b",
      quote: "If a failure occurs, the QMP must decide if that machine should be removed from service, or if treatments should be limited to certain types and/or number of treatments, etc., based on the severity of the failure, the system that failed, and the types of treatments/disease.",
      grade: "must",
    },
    {
      action: "For machines treating SRS or SBRT, use the protocols written for stereotactic performance tests (MPPG 9 for the tests and action limits)",
      why: "Stereotactic treatment needs a higher degree of accuracy than regularly fractionated treatment.",
      source: "aapm-mppg8b",
      quote: "In these instances, the QMP must refer to protocols specifically designed for performance tests in a stereotactic setting in order to achieve a higher degree of accuracy than that needed for regularly fractionated patients.",
      grade: "must",
    },
  ],
  bestInClass: {
    statement: "The AAPM's MPPG 8.b (2023) is the most recent published list of minimum linac performance tests found: daily output within 3% and safety checks, weekly quantitative leaf-position testing within 0.5 mm, monthly output within 2%, annual TG-51 output measurement and radiation isocentre testing within 1 mm, plus a written summary of return-to-service checks and immediate review of technical bulletins. It is the 5-year update of MPPG 8.a (2017), written after reviewing each test in TG-142 (2009), MPPG 8.a and TG-198 (2021), and it returned some tests 8.a had left out. It is a United States guideline; in the UK the reference is IPEM Report 81 (2018), not read here, and a 2025 IPEM survey found centres meeting or exceeding it for the majority of tests. MPPG 8.b asks every centre to treat its list as the floor for a local risk analysis (TG-100) rather than a ceiling.",
    sources: ["aapm-mppg8b", "uk-survey-2025", "aapm-tg142"],
  },
  variants: [
    {
      name: "AAPM TG-142 (2009) with the TG-198 implementation guide (2021)",
      differs: "The older AAPM task group report, with tables by daily, monthly and annual review and separate tables for wedge systems, multileaf collimators and imaging checks (x-ray imaging, portal imaging and cone-beam CT), tolerances that differ for non-IMRT, IMRT and stereotactic use, and action levels for inspection, scheduled action, or immediate and corrective action. TG-198 gives procedures for the TG-142 tests, estimates of the time and staff they need and sample forms, and adds VMAT tests. Their tolerance tables were not read, so none of their figures is given here.",
      evidence: "Consensus of the task groups (abstracts read). MPPG 8.b discussed each TG-142 test and gives a list of critical tests as a minimum.",
      sources: ["aapm-tg142", "aapm-tg198", "aapm-mppg8b"],
    },
    {
      name: "AAPM MPPG 8.a (2017): risk-ranked minimum set",
      differs: "Chose tests from a failure mode and effects analysis scored by 25 participants together with committee consensus, in some cases including a lower-ranking test or excluding a high-ranking one. It worded these limits as 'should': daily and monthly output should fall within 3% and 2% of baseline, and leaf positions should be checked monthly to within 1 mm. MPPG 8.b made the output limits 'must', moved the leaf test to weekly at 0.5 mm, required it to be quantitative because the visual tests recommended before were insufficient, and returned some excluded tests.",
      evidence: "Committee FMEA and consensus (full text read). 8.b chose not to repeat the FMEA, to emphasise that risk analysis is unique to each practice.",
      sources: ["aapm-mppg8a", "aapm-mppg8b"],
    },
    {
      name: "UK practice under IPEM Report 81 (2018)",
      differs: "UK centres follow IPEM Report 81, for which the 2025 survey reports a monthly recommendation for standard output; 26% of responding centres still measured standard output weekly, and all did a daily output constancy check. The survey gives the report's guideline for standard output as 2%; the commonest local notification level was 1.5% (17 of 40 centres for photon beams, 16 of 37 for electron beams), with 2% the commonest suspension level (26 of 38 for photons, 22 of 38 for electrons). It also found a shift towards QC outside normal working hours and wide variation in the time spent per linac (median 18 hours a month on C-arm machines, from 6 to 37).",
      evidence: "National survey of 43 of 68 UK centres (63%), 2025. Report 81 itself was not read.",
      sources: ["uk-survey-2025"],
    },
    {
      name: "Manufacturer integrated quality control (Varian Machine Performance Check, Elekta machine QA and others)",
      differs: "Automated tests built into the machine, usually using the electronic portal imaging device. IPEM's 2025 topical report covers commissioning them: independence review, repeatability, baselines and tolerances, concordance with existing QC, sensitivity testing and risk assessment. In the 2025 UK survey 40% of centres did the daily output constancy check with a manufacturer-integrated device. MPPG 8.b does not rule vendor tools out, but the QMP must verify them independently before clinical use and add what they omit, such as door interlock checks.",
      evidence: "Working party experience, existing guidance, literature and a 2022 UK survey (IPEM abstract read).",
      sources: ["ipem-miqc-2025", "uk-survey-2025", "aapm-mppg8b"],
    },
  ],
  grades: [
    { claim: "Daily output of each clinical beam within 3% of the device baseline", grade: "must", source: "aapm-mppg8b" },
    { claim: "Use the guideline's tests and frequencies as a minimum for any local risk analysis", grade: "recommendation (committee)", source: "aapm-mppg8b", quote: "We recommend using the tests and frequencies outlined in this report as a minimum for any risk analysis performed and that full consideration be given to the implication of removing any of the recommended minimum components." },
    { claim: "Weekly quantitative leaf position accuracy within 0.5 mm, tested at different gantry angles or in arc mode", grade: "must", source: "aapm-mppg8b" },
    { claim: "UK centres meet or exceed IPEM Report 81 for the majority of tests; 26% still check standard output weekly against a monthly recommendation", grade: "survey finding (no grade)", source: "uk-survey-2025", quote: "Standard output was still performed weekly in 26% of centres compared to monthly recommendation in Report 81." },
  ],
  sources: [
    {
      key: "aapm-mppg8b",
      label: "AAPM Medical Physics Practice Guideline 8.b: Linear accelerator performance tests",
      publisher: "American Association of Physicists in Medicine (Krauss et al., Journal of Applied Clinical Medical Physics)",
      year: 2023,
      url: "https://doi.org/10.1002/acm2.14160",
      doi: "10.1002/acm2.14160",
      gradingScheme: "AAPM practice guideline wording: 'must' (necessary to conform to the guideline) and 'should' (prudent practice with occasional exceptions); no evidence grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aapm-mppg8a",
      label: "AAPM Medical Physics Practice Guideline 8.a.: Linear accelerator performance tests",
      publisher: "American Association of Physicists in Medicine (Journal of Applied Clinical Medical Physics)",
      year: 2017,
      url: "https://doi.org/10.1002/acm2.12080",
      doi: "10.1002/acm2.12080",
      gradingScheme: "As MPPG 8.b ('must' and 'should').",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aapm-tg142",
      label: "Task Group 142 report: quality assurance of medical accelerators",
      publisher: "American Association of Physicists in Medicine (Klein et al., Medical Physics)",
      year: 2009,
      url: "https://doi.org/10.1118/1.3190392",
      doi: "10.1118/1.3190392",
      gradingScheme: "Tolerances with action levels (inspection, scheduled action, immediate action); no evidence grades.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "aapm-tg198",
      label: "AAPM Task Group 198 Report: An implementation guide for TG 142 quality assurance of medical accelerators",
      publisher: "American Association of Physicists in Medicine (Medical Physics)",
      year: 2021,
      url: "https://doi.org/10.1002/mp.14992",
      doi: "10.1002/mp.14992",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "uk-survey-2025",
      label: "A survey and analysis of radiotherapy linear accelerator quality control in the United Kingdom, for c-arm and ring gantry systems and associated patient specific quality control",
      publisher: "IPEM Radiotherapy Special Interest Group and Interdepartmental Dosimetry Audit Sub-committee (Tassano-Smith et al., British Journal of Radiology)",
      year: 2025,
      url: "https://doi.org/10.1093/bjr/tqaf140",
      doi: "10.1093/bjr/tqaf140",
      gradingScheme: "Survey; no grades.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ipem-miqc-2025",
      label: "IPEM topical report: guidance for the use of linac manufacturer integrated quality control",
      publisher: "Institute of Physics and Engineering in Medicine (Physics in Medicine and Biology)",
      year: 2025,
      url: "https://doi.org/10.1088/1361-6560/adc8f7",
      doi: "10.1088/1361-6560/adc8f7",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "ipem-report-81",
      label: "Physics Aspects of Quality Control in Radiotherapy, IPEM Report 81, 2nd edition",
      publisher: "Institute of Physics and Engineering in Medicine",
      year: 2018,
      url: "https://www.ipem.ac.uk/",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["c-arm-linac", "radiotherapy-qa-phantoms-dosimeters", "imrt-igrt"],
  related: ["radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "IPEM Report 81 (2018), the UK reference, is a priced book and was not read; UK recommendations are given only as the 2025 IPEM survey reports them. On 17 November 2026 no open copy was found.",
    "The full TG-142 and TG-198 reports are behind the Medical Physics paywall, and on 17 November 2026 the AAPM's own copy of TG-142 refused a script; only their abstracts were read, so none of their tolerances is on this page and how they differ from MPPG 8.b test by test is not shown.",
    "MPPG 8.b excludes on-board imaging QA and covers C-arm machines only; other designs (ring-gantry, helical, robotic, MR-linac) and stereotactic limits (MPPG 9) have their own reports, not covered here.",
    "MPPG 8.b names AAPM reports still in preparation when it was published (TG-332 on vendor-provided tools, TG-314 on fault recovery, TG-312 on detector arrays); whether they have since been published was not checked.",
    "MPPG 8.b's tests, frequencies and limits were chosen by committee consensus, and its text describes no trial of one test frequency against another. A survey of physicists it cites (184 responses) found no agreement on the risk of 11 IMRT delivery failures.",
  ],
});
