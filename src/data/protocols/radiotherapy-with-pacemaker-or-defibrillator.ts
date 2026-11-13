import { protocol } from "./helpers";

/*
 * Radiotherapy in people with a cardiac implantable electronic device (CIED): a pacemaker, an implantable
 * cardioverter-defibrillator (ICD), a cardiac resynchronisation device or a leadless pacemaker.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - Radiotherapy Board (IPEM, Society and College of Radiographers, Royal College of Radiologists), with the British
 *   Cardio-Oncology Society and the British Heart Rhythm Society: Guidance on the management of patients with cardiac
 *   implantable electronic devices receiving radiotherapy, January 2025 (replaces the 2015 Radiotherapy Board
 *   guideline): full text, PDF from rcr.ac.uk read with pdftotext. It prints no grades. Its Figure 1 (the risk
 *   category flowchart) is an image and did not survive conversion; the thresholds used here are from its text.
 * - JASTRO/JCS Guidelines for radiotherapy in patients with cardiac implantable electronic devices (Japanese Society
 *   for Radiation Oncology and Japanese Circulation Society, J Radiat Res 2021): full text, Europe PMC XML (PMC7779359).
 * - AAPM Task Group 203 report (Miften et al., Med Phys 2019): abstract only, Europe PMC. The Wiley full text returned
 *   403 to a script and was not read.
 * - Meta-analysis of radiotherapy-induced CIED malfunction (Heart Rhythm 2023, DOI 10.1016/j.hrthm.2023.01.024):
 *   abstract, Europe PMC.
 * - Italian ANMCO statement (G Ital Cardiol 2025, DOI 10.1714/4531.45340): abstract only; it is in Italian and the full
 *   text was not read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined.
 */
export const radiotherapyWithPacemakerOrDefibrillator = protocol({
  id: "radiotherapy-with-pacemaker-or-defibrillator",
  name: "Radiotherapy with a pacemaker or implanted defibrillator",
  aka: ["CIED and radiotherapy", "pacemaker and radiotherapy", "ICD and radiotherapy", "cardiac implantable electronic device radiotherapy", "TG-203", "defibrillator radiotherapy", "pacing-dependent radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy can occasionally upset a pacemaker or an implanted defibrillator, usually by resetting it. Tell the team about your device at your first appointment. They will contact your heart device clinic, plan the treatment to keep dose to the device low, and may watch your heart rhythm during treatment. Your device is checked within two weeks of finishing.",
  simple: "If you have a pacemaker or a defibrillator, tell the radiotherapy team straight away. They will talk to your heart team, keep the rays away from the device, and get it checked after treatment.",
  summary: "The UK Radiotherapy Board guidance (January 2025, with the British Cardio-Oncology Society and the British Heart Rhythm Society) and the JASTRO/JCS guideline (2021) take the same approach: identify the device at referral, obtain the last device check and pacing dependency from the device clinic, consent the patient to the risk of malfunction, and stratify risk by pacing dependency, cumulative device dose and neutron production. Risk of malfunction rises with neutron-producing beams (photons of 10 MV or more, electrons of 20 MeV or more, protons and heavy ions), with high dose rates (flattening-filter-free beams) and with cumulative dose. A meta-analysis of 17 retrospective studies (2,454 patients) found ICDs more often affected than pacemakers (odds ratio 2.75) and reset more likely with neutron-producing radiotherapy.\n\nUK planning rules: energies below 10 MV where possible (otherwise high risk), no direct irradiation of the device including exit beam, the device outlined with a margin (CIED PRV) when within 10 cm of a field edge, and a near-maximum dose (D0.035cc) to the CIED PRV below 5 Gy; a device more than 10 cm from the field edge can be assumed to receive under 2 Gy. Cumulative dose includes previous radiotherapy and cone-beam CT (about 0.01 Gy per scan). Relocating the device is not recommended below 5 Gy. A defibrillator, an AED able to pace and trained staff must be available; continuous ECG monitoring is strongly recommended for pacing-dependent patients, a device nearing end of battery life and ICDs, with an extra trained person on the first day. The device is interrogated weekly once it has received more than 5 Gy and checked within 2 weeks of the course. JASTRO/JCS classify high risk as any of: photons of 10 MV or more, electrons of 20 MeV or more, protons or carbon ions, pacing dependency, device dose above 10 Gy, previous ventricular fibrillation or ICD therapy; low risk needs all of: lower energies, not pacing dependent, no chest irradiation, device dose below 2 Gy and no ventricular tachycardia. None of this is graded; the evidence is case series and laboratory studies.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "radiographer", "multidisciplinary-team", "patient-or-carer"],
    where: ["radiotherapy-department", "outpatient-clinic"],
  },
  population: "Adults with a permanent pacemaker, implantable cardioverter-defibrillator (including subcutaneous ICD), cardiac resynchronisation device (CRT-P managed as a pacemaker, CRT-D as an ICD) or leadless pacemaker who are referred for external beam radiotherapy, kilovoltage radiotherapy or brachytherapy. MR simulation and MR-linac treatment follow MR conditional rules for the device and are noted, not detailed. Children are not addressed by the sources read.",
  trigger: "Referral for radiotherapy of a person who has, or may have, a cardiac implantable electronic device.",
  steps: [
    {
      action: "At referral, confirm whether the patient has a cardiac device and which type, identify their device clinic, and find out whether they are pacing dependent",
      why: "Whether the heart relies on the device decides how serious a malfunction would be.",
      source: "rcr-cied-2025",
      quote: "It is imperative to identify patients with CIEDs as early as possible within the radiotherapy pathway.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Contact the device clinic for the last device check report and all programmed settings, and ask about previous ventricular arrhythmia or ICD shocks",
      why: "The team needs to know how the device is set and how the heart behaves before any treatment.",
      source: "rcr-cied-2025",
      quote: "Ensure the CIED is under regular follow-up and request a report of the last device check and documentation of all programmed parameters",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Discuss the small risk of device malfunction with the patient and record it on the referral and the consent form",
      why: "The patient should know what could happen and what the team will do about it before agreeing to treatment.",
      source: "rcr-cied-2025",
      quote: "Ensure an appropriately trained practitioner has had a risk-benefit discussion with the patient regarding possible device malfunction and management during radiotherapy.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "At the planning scan, ask every patient whether they have a cardiac device, and leave a device more than 10 cm from any field edge out of the scan unless it is needed for planning",
      why: "Small or leadless devices are easy to miss, and a short CT scan carries very little risk to the device.",
      source: "rcr-cied-2025",
      quote: "If a device is more than 10cm from a potential field edge it is not necessary to include in the planning CT scan (radiotherapy dose will be <2Gy).",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Plan with photon energies below 10 MV, avoid direct irradiation of the device including the exit beam, and prefer flattened beams over high dose-rate beams",
      why: "Higher energies make neutrons that can scramble the device's memory; keeping the beam off the device keeps its dose low.",
      source: "rcr-cied-2025",
      quote: "Use energies <10MV to minimise neutron production. If energies at 10MV and above cannot be avoided, then the patient must be managed within the high-risk category.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Outline the device with a margin when it is within 10 cm of the field, record the near-maximum cumulative dose (including earlier radiotherapy and imaging), and aim for less than 5 Gy",
      why: "The total dose the device receives over the whole course is what raises the chance of a fault.",
      source: "rcr-cied-2025",
      quote: "Recommended near-maximum dose (eg. D0.035cc) to CIED PRV is <5Gy.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Do not compromise the cancer treatment plan to spare the device; if the device would receive too much dose, discuss other techniques or moving the device with the cardiologist, but do not move it for a dose below 5 Gy",
      why: "Treating the cancer properly comes first, and moving a device is an operation with its own risks.",
      source: "rcr-cied-2025",
      quote: "The quality of the treatment plan should not be significantly compromised for the sake of sparing the device.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Before the first treatment, check that the dose estimate, device report and consent are in place, that a defibrillator able to pace is in the department, and that trained staff are arranged if monitoring is needed",
      why: "If the device fails, the team must be able to support the heart at once.",
      source: "rcr-cied-2025",
      quote: "A cardiac arrest trolley equipped with an automated external defibrillator (AED) capable of delivering external pacing is available within the department and staff are adequately trained to use the equipment.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Monitor the heart continuously by ECG during treatment for pacing-dependent patients, devices near the end of battery life and ICDs, with an extra trained person on the first day",
      why: "Watching the heart rhythm lets staff stop the beam the moment something goes wrong.",
      source: "rcr-cied-2025",
      quote: "There is a lack of data on the benefit of continuous cardiac monitoring during radiotherapy2, but it is strongly recommended to use cardiac monitoring for patients who are pacing dependent, those whose device battery is nearing end of life or those with ICDs24.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "If an ICD shocks inappropriately, place a magnet over it to stop shocks and call a cardiologist urgently; remove the magnet if the patient becomes unstable with a fast heart rhythm",
      why: "A magnet pauses the defibrillator's shocks without stopping its pacing, but the shocks may be needed if the rhythm is truly dangerous.",
      source: "rcr-cied-2025",
      quote: "If an ICD appears to be delivering shocks inappropriately, a magnet positioned over the device will stop the delivery of shocks and anti-tachycardia therapy but will not affect the pacemaker function of the ICD.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Have the device interrogated weekly once it has received more than 5 Gy, and arrange a device check at the referring hospital within 2 weeks of the last treatment, with an advice letter by the last day",
      why: "Some faults appear only later, so the device is checked again after treatment ends.",
      source: "rcr-cied-2025",
      quote: "The patient must have their CIED checked at their referring hospital within 2 weeks of completing treatment.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Record any unexpected device event in the incident reporting system and explain it to the patient",
      why: "Faults are rare, and reporting them is how guidance improves.",
      source: "rcr-cied-2025",
      quote: "All unexpected CIED events detected during the radiotherapy course and in the follow-up period must be systematically recorded using the centre’s incident reporting system and explained to the patient.",
      grade: "Guidance (ungraded)",
    },
  ],
  bestInClass: {
    statement: "Identify the device at referral, obtain its settings and pacing dependency from the device clinic, consent to the risk, and stratify risk by pacing dependency, cumulative device dose and neutron production (UK Radiotherapy Board 2025; JASTRO/JCS 2021; AAPM TG-203 2019 frames the same process as a failure-mode analysis). Plan below 10 MV with flattened beams, keep the beam off the device and aim for a near-maximum cumulative device dose below 5 Gy (UK), without compromising the cancer plan; monitor pacing-dependent patients, ICDs and devices near end of life by ECG with resuscitation and external pacing to hand; check the device within 2 weeks of the course. The guidelines differ on thresholds: the UK counts any treatment at 10 MV or above as high risk and sets 5 Gy as the dose aim, while JASTRO/JCS calls a device dose above 10 Gy high risk and below 2 Gy (with no chest irradiation) low risk, and raises risk one level for flattening-filter-free beams; Italian AIAC/AIRO/AIFM draws its energy line at 6 MV. None of these is graded, because the evidence is case series and laboratory studies.",
    sources: ["rcr-cied-2025", "jastro-jcs-2021", "aapm-tg203-2019", "meta-hrthm-2023"],
  },
  variants: [
    {
      name: "JASTRO/JCS (Japan): three risk levels with a 10 Gy high-risk threshold and monitoring by risk",
      differs: "Low risk requires photons below 10 MV or electrons below 20 MeV, no pacing dependency, no chest irradiation, device dose below 2 Gy and no history of ventricular tachycardia; high risk is any of photons of 10 MV or more, electrons of 20 MeV or more, protons, carbon ions, pacing dependency, device dose above 10 Gy, previous ventricular fibrillation or ICD therapy. Medium-risk patients are monitored by ECG or pulse oximeter at the first session and as needed after; high-risk patients at every session. FFF beams can raise the category by one level.",
      evidence: "Consensus of the Japanese radiation oncology and cardiology societies, based on case reports and laboratory studies; ungraded.",
      sources: ["jastro-jcs-2021"],
    },
    {
      name: "Italian AIAC/AIRO/AIFM and ANMCO: a 6 MV energy line",
      differs: "As tabulated by the UK and JASTRO/JCS documents, the Italian classification counts as low risk only photons or electrons of 6 MV or less with device dose of 2 Gy or less and no pacing dependency, and as high risk a device dose above 10 Gy; the 2025 ANMCO statement adds timing of cardiology assessments during and after treatment.",
      evidence: "Expert consensus. The ANMCO statement was read as an abstract only.",
      sources: ["rcr-cied-2025", "anmco-2025"],
    },
    {
      name: "Emergency palliative radiotherapy without dose or device information (UK)",
      differs: "Use continuous cardiac monitoring where available, keep doses below 2 Gy (departments set rules for a safe distance from field edge to device when dose is not calculated), and refer for a device check within 2 weeks.",
      evidence: "Pragmatic guidance; ungraded.",
      sources: ["rcr-cied-2025"],
    },
  ],
  grades: [
    { claim: "Implantable defibrillators are more often affected by radiotherapy than pacemakers", grade: "Meta-analysis of 17 retrospective observational studies (2,454 patients)", source: "meta-hrthm-2023", quote: "The meta-analysis showed that RT was associated with an increased risk of ICD malfunctions (odds ratio [OR] 2.75; 95% confidence interval [CI] 1.74-4.33)." },
    { claim: "Neutron-producing radiotherapy raises the risk of device malfunction", grade: "Meta-analysis of observational studies", source: "meta-hrthm-2023", quote: "Neutron-generating RT significantly increased the risk of CIED malfunctions (OR 3.97; 95% CI 1.70-9.26), especially the risk of reset (OR 5.79; 95% CI 2.37-14.12; P = .0001)." },
    { claim: "Continuous monitoring for high-risk patients at every session", grade: "Guideline (ungraded)", source: "jastro-jcs-2021", quote: "For high-risk patients, monitor the circulation using an electrocardiogram or pulse oximeter for pulse abnormalities in every radiotherapy session." },
    { claim: "Flattening-filter-free beams raise the risk category", grade: "Guideline (ungraded)", source: "jastro-jcs-2021", quote: "When using flattening filter-free (FFF) beams, consider raising the risk classification by one level depending on the patient’s condition." },
    { claim: "A device more than 10 cm from the field edge can be assumed to receive under 2 Gy", grade: "Guidance (ungraded)", source: "rcr-cied-2025", quote: "If the CIED is >10cm superiorly or inferiorly from the edge of the treatment beam, it can be assumed that the near-maximum dose (eg. D0.035cc) to the CIED PRV will be <2Gy." },
  ],
  sources: [
    {
      key: "rcr-cied-2025",
      label: "Guidance on the management of patients with cardiac implantable electronic devices receiving radiotherapy (January 2025)",
      publisher: "Radiotherapy Board (IPEM, Society and College of Radiographers, Royal College of Radiologists), with the British Cardio-Oncology Society and the British Heart Rhythm Society",
      year: 2025,
      url: "https://rcr.ac.uk/media/0mdltaed/management-of-patients-with-cieds-receiving-rt_jan2025_.pdf",
      gradingScheme: "Guidance without graded recommendations.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "jastro-jcs-2021",
      label: "JASTRO/JCS Guidelines for radiotherapy in patients with cardiac implantable electronic devices",
      publisher: "Japanese Society for Radiation Oncology and Japanese Circulation Society (Journal of Radiation Research)",
      year: 2021,
      url: "https://doi.org/10.1093/jrr/rraa102",
      doi: "10.1093/jrr/rraa102",
      gradingScheme: "Consensus guideline; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "aapm-tg203-2019",
      label: "Management of radiotherapy patients with implanted cardiac pacemakers and defibrillators: A Report of the AAPM TG-203",
      publisher: "American Association of Physicists in Medicine (Miften et al., Medical Physics)",
      year: 2019,
      url: "https://doi.org/10.1002/mp.13838",
      doi: "10.1002/mp.13838",
      gradingScheme: "Task group report; recommendations are not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "meta-hrthm-2023",
      label: "Radiotherapy-induced malfunctions of cardiac implantable electronic devices: A meta-analysis",
      publisher: "Heart Rhythm",
      year: 2023,
      url: "https://doi.org/10.1016/j.hrthm.2023.01.024",
      doi: "10.1016/j.hrthm.2023.01.024",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "anmco-2025",
      label: "Management of cardiac implantable electronic devices in cancer patients undergoing radiotherapy. An Italian Association of Hospital Cardiologists (ANMCO) statement",
      publisher: "ANMCO (Giornale Italiano di Cardiologia)",
      year: 2025,
      url: "https://doi.org/10.1714/4531.45340",
      doi: "10.1714/4531.45340",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["imrt-igrt", "in-room-imaging-systems"],
  terms: ["radiotherapy"],
  related: ["mri-safety-screening-implants", "radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "The AAPM TG-203 report could not be read in full: the publisher returned 403 to a script. Its position is taken from its abstract and from the UK and Japanese documents that summarise it.",
    "Thresholds differ between guidelines (UK aim below 5 Gy; JASTRO/JCS high risk above 10 Gy, low risk below 2 Gy; Italian energy line at 6 MV) because the evidence is case reports, retrospective series and laboratory irradiation of devices; no prospective trial compares the strategies.",
    "The UK guidance itself says there is a lack of data on the benefit of continuous cardiac monitoring; it recommends monitoring anyway for those at greatest risk.",
    "The UK risk flowchart (Figure 1) is an image and was not read; the categories here are taken from the guidance text and appendix.",
    "Proton and heavy ion therapy are treated as high risk by both guidelines read; device-specific evidence for particle therapy was not examined.",
    "The 2017 HRS expert consensus on MRI and radiation exposure in patients with cardiac devices and the 2022 ESC cardio-oncology guideline were not read; the UK guidance cites the HRS statement for its 5 Gy relocation rule.",
  ],
});
