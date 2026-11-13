import { protocol } from "./helpers";

/*
 * Quality assurance of the machine that gives most radiotherapy: the daily, weekly, monthly and annual checks a
 * medical physics team makes on a C-arm linear accelerator, and the checks after it has been repaired.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - AAPM Medical Physics Practice Guideline 8.b, Linear accelerator performance tests (Krauss et al., Journal of
 *   Applied Clinical Medical Physics 2023): full text, Europe PMC XML (PMC10647991). It is the 5-year update of
 *   MPPG 8.a and the most recent AAPM list of linac tests found; the AAPM reviews each practice guideline on its fifth
 *   anniversary, and no MPPG 8.c was found in Europe PMC.
 * - AAPM MPPG 8.a (Smith et al., 2017): abstract, Europe PMC.
 * - Tassano-Smith et al., A survey and analysis of radiotherapy linear accelerator quality control in the United
 *   Kingdom (British Journal of Radiology 2025), on behalf of IPEM: full text, Europe PMC XML (PMC12377463). It is the
 *   source for how UK practice compares with IPEM Report 81.
 * - IPEM topical report on linac manufacturer integrated quality control (Physics in Medicine and Biology 2025):
 *   abstract, Europe PMC.
 * - AAPM TG-142 (2009) and TG-198 (2021): abstracts only, Europe PMC; the full reports are behind the Medical Physics
 *   paywall and were not read.
 * - IPEM Report 81, Physics Aspects of Quality Control in Radiotherapy, 2nd edition (2018): not reachable (a priced
 *   book); its recommendations are given only as the UK survey reports them.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined; the guideline's non-breaking hyphens ("TG-51") are written as plain hyphens.
 */
export const linearAcceleratorQualityAssurance = protocol({
  id: "linear-accelerator-quality-assurance",
  name: "Linear accelerator quality assurance: daily, weekly, monthly and annual machine checks",
  aka: ["linac QA", "linac quality control", "machine QA", "morning QA", "daily output check", "TG-142", "MPPG 8.b", "IPEM Report 81", "Winston-Lutz test", "picket fence test"],
  domain: "radiotherapy",
  tldr: "Before patients are treated each day, the radiotherapy team checks that the treatment machine gives the right dose, points at the right place and stops when it should. Bigger checks follow every week, month and year, and after every repair. These checks are why a machine fault very rarely reaches a patient.",
  simple: "The radiotherapy machine is tested every morning before anyone is treated. Physicists test it more deeply each month and each year. If a test fails, the machine is not used until it is fixed and checked again.",
  summary: "The AAPM's current list (MPPG 8.b, 2023) sets the minimum: the qualified medical physicist (QMP) designs the programme, chooses tests that fit how the machine is used, and owns the results. Daily, on the beams in use that day: photon and electron output within 3% of the device baseline, profile constancy, the patient-positioning system (lasers within 2 mm if used for final set-up, or the imaging or surface system that replaces them), the distance indicator and a jaw setting, and safety: door interlock, audio and video monitoring of the patient, beam-on indicators and one anti-collision system in rotation. Weekly: quantitative multileaf collimator leaf-position accuracy within 0.5 mm at several gantry angles (a measured picket-fence test; log files alone are not enough). Monthly: output within 2%, energy and profile constancy, couch and angle readouts, a holistic dynamic-delivery (sliding window or VMAT) test within 2%. Annually: absolute calibration in water to TG-51 with a chamber calibrated at an accredited standards laboratory within two years, output within 1% of nominal, beam data compared with the planning system model within 1 to 2%, radiation isocentre by a Winston-Lutz test (all axes within 1 mm), small-field output factors, a full review of machine settings and the emergency procedures. After repairs the QMP's written return-to-service checks apply, and manufacturers' technical bulletins are reviewed at once. SRS and SBRT need the tighter stereotactic tests (MPPG 9).\n\nIn the UK, IPEM Report 81 (2018) informs practice in 91% of centres; a 2025 IPEM survey found most centres meeting or exceeding it, with 26% still measuring standard output weekly against the report's monthly recommendation. MPPG 8.b deliberately did not repeat a failure mode analysis and asks each centre to do its own, using its tests as the floor.",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "multidisciplinary-team"],
    where: ["radiotherapy-department"],
  },
  population: "C-arm medical linear accelerators giving external beam photon or electron radiotherapy. On-board imaging equipment, ring-gantry, helical, robotic and MR-guided machines and stereotactic-specific tolerances are outside MPPG 8.b's scope and are named, not detailed. The checks are made by medical physicists and therapeutic radiographers (radiation therapists); patients are affected by them but do not take part.",
  trigger: "Every treatment day, and on the weekly, monthly and annual schedule; also after any maintenance, repair, software update or manufacturer's technical bulletin.",
  steps: [
    {
      action: "Put a qualified medical physicist in charge of the machine QA programme, with defined tests, frequencies and action limits",
      why: "One accountable expert has to decide what is tested and judge whether the machine is safe to treat on.",
      source: "aapm-mppg8b",
      quote: "The qualified medical physicist (QMP) must establish routine testing to ensure that the linac's current performance has not deviated from the clinical parameters acquired at the time of acceptance and commissioning of the machine.",
      grade: "must",
    },
    {
      action: "Choose tests that match what the machine is used for (for example, add stereotactic tests if it treats SRS or SBRT)",
      why: "A machine that treats tiny brain targets needs tighter checks than one that gives broad palliative fields.",
      source: "aapm-mppg8b",
      quote: "Performance tests on each linac must be selected to fit the clinical patterns of use of the accelerator, and care must be given to selecting and performing tests that are relevant to detecting errors related to the specific use of the accelerator.",
      grade: "must",
    },
    {
      action: "Every treatment day, before patients, check the output of each beam to be used; act if it is more than 3% from the baseline",
      why: "The dose the machine gives per unit can drift; a morning check catches it before anyone is treated.",
      source: "aapm-mppg8b",
      quote: "Daily output checks must be performed on all clinically used beams and must fall within 3% of that dosimetry system's nominal device baseline that correlates to the reference dose output at TG-51",
      grade: "must",
    },
    {
      action: "Every day, check that the patient-positioning system (lasers, imaging or surface guidance) is accurate; lasers used for final set-up must be within 2 mm of the isocentre",
      why: "A correct dose in the wrong place is still an error; the positioning tools are checked before they are trusted.",
      source: "aapm-mppg8b",
      quote: "The accuracy of the device(s) used to position the patients must be evaluated daily.",
      grade: "must",
    },
    {
      action: "Every day, check that the door interlock stops the beam, that the patient can be seen and heard, that beam-on lights work, and one anti-collision system in rotation",
      why: "These are the safeguards that protect patients and staff if something goes wrong in the room.",
      source: "aapm-mppg8b",
      quote: "Daily, the functionality of the door interlock must be checked to ensure that the radiation beam will terminate if the door is opened.",
      grade: "must",
    },
    {
      action: "Do not treat without at least one working audio channel and one working video channel to the patient",
      why: "The patient is alone in the room during the beam; staff must be able to see and hear them throughout.",
      source: "aapm-mppg8b",
      quote: "At least one channel of audio and one channel of video monitoring are required for clinical use of the machine.",
      grade: "required",
    },
    {
      action: "Every week, measure the position of every multileaf collimator leaf at several gantry angles, to within 0.5 mm, with a quantitative test such as a picket fence",
      why: "The leaves shape every modern treatment; small leaf errors add up to dose errors in intensity-modulated plans.",
      source: "aapm-mppg8b",
      quote: "The test must be performed at different gantry angles or in arc mode to detect any gravity-induced positional errors.",
      grade: "must",
    },
    {
      action: "Do not rely on the machine's own log files alone to check leaf positions; measure the radiation field",
      why: "Log files record what the machine thinks it did, which can miss a fault in the leaf position itself.",
      source: "aapm-mppg8b",
      quote: "At this time, log file analysis alone is not an adequate replacement for testing that measures the radiation field to detect leaf position.",
      grade: "must (as worded in the guideline)",
    },
    {
      action: "Every month, check the output of every clinical beam to within 2% of baseline, and review the daily results",
      why: "A tighter monthly check with better equipment catches slow drift the daily device might miss.",
      source: "aapm-mppg8b",
      quote: "Monthly output checks must be performed on all clinically used beams and must fall within 2% of that dosimetry system's nominal baseline that correlates to the reference dose output at TG-51 reference conditions.",
      grade: "must",
    },
    {
      action: "Every year, calibrate the absolute dose in water to TG-51 (or an equivalent protocol) with equipment calibrated by an accredited standards laboratory in the past two years",
      why: "All the other checks are relative to this one; it ties the machine to the national standard of dose.",
      source: "aapm-mppg8b",
      quote: "Annual output measurements must be performed in accordance with TG-51, a comparable protocol, or successors in water with equipment calibrated by an accredited secondary standards laboratory within the previous two years.",
      grade: "must",
    },
    {
      action: "Every year, test the radiation isocentre with a Winston-Lutz test, so that collimator, gantry and couch rotate about the same point within 1 mm",
      why: "Beams from different angles must meet at the same spot, or the target is partly missed.",
      source: "aapm-mppg8b",
      quote: "Annually, the radiation isocentricity must be tested to ensure all axes (collimator, gantry, and couch) rotate about the same location within 1 mm.",
      grade: "must",
    },
    {
      action: "After maintenance or repair, follow written return-to-service checks before the machine treats again",
      why: "Repairs can change the beam; a set list of checks means nothing is forgotten before patients return.",
      source: "aapm-mppg8b",
      quote: "The QMP must create a summary of the return-to-service QA for typical machine maintenance activities that includes the vendor recommendations and any other tests the QMP deems necessary, thereby providing consistency in returning a linac to clinical service.",
      grade: "must",
    },
    {
      action: "Read manufacturers' technical bulletins and service reports promptly and decide whether they affect your machine",
      why: "Manufacturers warn of faults found elsewhere; acting on them prevents the same fault here.",
      source: "aapm-mppg8b",
      quote: "Therefore, customer technical bulletins or other documents that alert the linac operator to known potential issues or malfunctions of the machine must be reviewed immediately.",
      grade: "must",
    },
    {
      action: "When a result is out of limits, consider every test of that parameter before adjusting the machine or resetting a baseline",
      why: "A failed output check may really be an energy change; fixing the wrong thing can hide the fault.",
      source: "aapm-mppg8b",
      quote: "Therefore, the QMP must ensure that all tests being performed for a clinical parameter are considered before making any machine adjustments and potentially changing any device baseline or reference values.",
      grade: "must",
    },
    {
      action: "For machines treating SRS or SBRT, add the stereotactic tests and tighter limits",
      why: "Very high doses to small targets leave almost no room for error.",
      source: "aapm-mppg8b",
      quote: "In these instances, the QMP must refer to protocols specifically designed for performance tests in a stereotactic setting in order to achieve a higher degree of accuracy than that needed for regularly fractionated patients.",
      grade: "must",
    },
  ],
  bestInClass: {
    statement: "The AAPM's MPPG 8.b (2023) is the most recent published list of minimum linac performance tests found: daily output within 3% and safety checks, weekly quantitative leaf-position testing within 0.5 mm, monthly output within 2%, annual TG-51 calibration and Winston-Lutz isocentre testing within 1 mm, plus written return-to-service checks and immediate review of technical bulletins. It updates TG-142 (2009), MPPG 8.a (2017) and TG-198 (2021), returning some tests 8.a had dropped. In the UK the reference is IPEM Report 81 (2018), not read here; a 2025 IPEM survey found most UK centres meeting or exceeding it. MPPG 8.b asks every centre to treat its list as the floor for a local risk analysis (TG-100) rather than a ceiling.",
    sources: ["aapm-mppg8b", "uk-survey-2025", "aapm-tg142"],
  },
  variants: [
    {
      name: "AAPM TG-142 (2009) with the TG-198 implementation guide (2021)",
      differs: "The older and longer AAPM task group list, with separate tables for non-IMRT, IMRT and stereotactic machines and for imaging devices (kV, MV and cone-beam CT), and action levels for inspection, scheduled action and immediate action. TG-198 gives step-by-step methods, staff time and sample forms for TG-142 tests and adds VMAT tests.",
      evidence: "Consensus of the task groups (abstracts read). MPPG 8.b reviewed each TG-142 test and kept a shorter minimum set.",
      sources: ["aapm-tg142", "aapm-tg198", "aapm-mppg8b"],
    },
    {
      name: "AAPM MPPG 8.a (2017): risk-ranked minimum set",
      differs: "Chose tests from an FMEA by the committee, dropping some that scored low; 8.b reinstated some and requires a quantitative leaf-position test, finding the previously recommended visual tests insufficient.",
      evidence: "Committee FMEA and consensus. 8.b chose not to repeat the FMEA because risk analysis is specific to each centre.",
      sources: ["aapm-mppg8a", "aapm-mppg8b"],
    },
    {
      name: "UK practice under IPEM Report 81 (2018)",
      differs: "UK centres follow IPEM Report 81, for which the 2025 survey reports a monthly recommendation for standard output; 26% of responding centres still measured standard output weekly. The survey also found a shift towards QC outside normal working hours and wide variation in the time spent per linac (median 18 hours a month on C-arm machines).",
      evidence: "National survey of 43 of 68 UK centres (63%), 2025. Report 81 itself was not read.",
      sources: ["uk-survey-2025"],
    },
    {
      name: "Manufacturer integrated quality control (Varian Machine Performance Check, Elekta machine QA and others)",
      differs: "Automated, mostly EPID-based tests built into the machine, used for some daily and monthly checks. IPEM's 2025 topical report covers commissioning them: independence review, repeatability, baselines and tolerances, concordance with existing QC, sensitivity testing and risk assessment. MPPG 8.b allows vendor tools where the QMP understands what they measure.",
      evidence: "Working party experience, existing guidance and a 2022 UK survey (IPEM abstract read).",
      sources: ["ipem-miqc-2025", "aapm-mppg8b"],
    },
  ],
  grades: [
    { claim: "Daily output of each clinical beam within 3% of the device baseline", grade: "must", source: "aapm-mppg8b" },
    { claim: "Use the guideline's tests and frequencies as a minimum for any local risk analysis", grade: "recommendation (committee)", source: "aapm-mppg8b", quote: "We recommend using the tests and frequencies outlined in this report as a minimum for any risk analysis performed and that full consideration be given to the implication of removing any of the recommended minimum components." },
    { claim: "Weekly quantitative leaf position accuracy within 0.5 mm; log files alone not adequate", grade: "must", source: "aapm-mppg8b" },
    { claim: "Most UK centres meet or exceed IPEM Report 81; 26% still check standard output weekly against a monthly recommendation", grade: "survey finding (no grade)", source: "uk-survey-2025", quote: "Standard output was still performed weekly in 26% of centres compared to monthly recommendation in Report 81." },
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
      accessed: "2026-11-11",
    },
    {
      key: "aapm-mppg8a",
      label: "AAPM Medical Physics Practice Guideline 8.a.: Linear accelerator performance tests",
      publisher: "American Association of Physicists in Medicine (Journal of Applied Clinical Medical Physics)",
      year: 2017,
      url: "https://doi.org/10.1002/acm2.12080",
      doi: "10.1002/acm2.12080",
      gradingScheme: "As MPPG 8.b ('must' and 'should').",
      read: "abstract",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "aapm-tg198",
      label: "AAPM Task Group 198 Report: An implementation guide for TG 142 quality assurance of medical accelerators",
      publisher: "American Association of Physicists in Medicine (Medical Physics)",
      year: 2021,
      url: "https://doi.org/10.1002/mp.14992",
      doi: "10.1002/mp.14992",
      read: "abstract",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "ipem-miqc-2025",
      label: "IPEM topical report: guidance for the use of linac manufacturer integrated quality control",
      publisher: "Institute of Physics and Engineering in Medicine (Physics in Medicine and Biology)",
      year: 2025,
      url: "https://doi.org/10.1088/1361-6560/adc8f7",
      doi: "10.1088/1361-6560/adc8f7",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "ipem-report-81",
      label: "Physics Aspects of Quality Control in Radiotherapy, IPEM Report 81, 2nd edition",
      publisher: "Institute of Physics and Engineering in Medicine",
      year: 2018,
      url: "https://www.ipem.ac.uk/",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["c-arm-linac", "radiotherapy-qa-phantoms-dosimeters", "imrt-igrt"],
  related: ["radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "IPEM Report 81 (2018), the UK reference, is a priced book and was not read; UK recommendations are given only as the 2025 IPEM survey reports them.",
    "The full TG-142 and TG-198 reports are behind the Medical Physics paywall; only their abstracts were read, so their tolerance tables are not quoted.",
    "MPPG 8.b excludes on-board imaging QA and non-C-arm machines (ring-gantry, helical, robotic, MR-linac); those have their own reports, not covered here.",
    "There is no trial evidence that any particular test frequency prevents patient harm; frequencies and limits are consensus. A survey of physicists cited by MPPG 8.b (184 responses) found they did not agree on the risk of common delivery failures.",
  ],
});
