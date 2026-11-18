import { protocol } from "./helpers";

/*
 * Radiotherapy in people with a cardiac implantable electronic device (CIED): a pacemaker, an implantable
 * cardioverter-defibrillator (ICD), a cardiac resynchronisation device or a leadless pacemaker.
 *
 * What was read, and how (first on 11 November 2026; every source re-read on 17 November 2026 in a second accuracy
 * pass, fetched raw and read as text, every quote re-checked by script):
 * - Radiotherapy Board (IPEM, Society and College of Radiographers, Royal College of Radiologists), with the British
 *   Cardio-Oncology Society and the British Heart Rhythm Society: Guidance on the management of patients with cardiac
 *   implantable electronic devices receiving radiotherapy, January 2025 (replaces the 2015 Radiotherapy Board
 *   guideline): full text, PDF from rcr.ac.uk read with pdftotext. It prints no grades. Its Figure 1 (the risk
 *   category flowchart) and the flowchart in its executive summary are images: on 17 November 2026 the two pages were
 *   rendered and read by eye. What is taken from the figure is said to be so on the page and nothing is quoted from it.
 * - JASTRO/JCS Guidelines for radiotherapy in patients with cardiac implantable electronic devices (Japanese Society
 *   for Radiation Oncology and Japanese Circulation Society, J Radiat Res 2021;62(1), online December 2020): full
 *   text, Europe PMC XML (PMC7779359), tags stripped by script.
 * - 2022 ESC Guidelines on cardio-oncology (with EHA, ESTRO and IC-OS), section 9.5 and Recommendation Table 50: full
 *   text, added on 17 November 2026 from the published PDF held in a university repository (a copy another checker
 *   of this pass saved on 16 November 2026), read with pdftotext. It is the only source here that grades.
 * - AAPM Task Group 203 report (Miften et al., Med Phys 2019): abstract only, Europe PMC. The Wiley full text returned
 *   403 to a script again on 17 November 2026. Its thresholds are given only as the UK guidance tabulates them.
 * - Meta-analysis of radiotherapy-induced CIED malfunction (Heart Rhythm 2023, DOI 10.1016/j.hrthm.2023.01.024):
 *   abstract, Europe PMC.
 * - Italian ANMCO statement (G Ital Cardiol 2025, DOI 10.1714/4531.45340): abstract only; it is in Italian and the full
 *   text was not read.
 * - 2017 HRS expert consensus statement (Heart Rhythm 2017): not read; the journal's free PDF link returned 403 to a
 *   script on 17 November 2026. Its position is given only as the UK and Japanese documents report it.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text
 * with line breaks joined. The second pass corrected: orders written where the UK text says "not necessary", "should
 * not be significantly" or "not recommended"; "consider raising" (JASTRO/JCS, flattening-filter-free beams) written
 * as a rule; reasons no source states; a quote that carried fused reference numbers; and the claim that nothing is
 * graded. It added the UK risk categories, the ESC and AAPM thresholds, and the two different dose limits the UK
 * guidance prints for emergency treatment.
 */
export const radiotherapyWithPacemakerOrDefibrillator = protocol({
  id: "radiotherapy-with-pacemaker-or-defibrillator",
  name: "Radiotherapy with a pacemaker or implanted defibrillator",
  aka: ["CIED and radiotherapy", "pacemaker and radiotherapy", "ICD and radiotherapy", "cardiac implantable electronic device radiotherapy", "TG-203", "defibrillator radiotherapy", "pacing-dependent radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy can sometimes upset a pacemaker or an implanted defibrillator, mostly through software faults that may reset it. The team will ask whether you have a device; tell them early. They will contact your heart device clinic, plan the treatment to keep dose to the device low, and may watch your heart rhythm during treatment. Your device is checked within two weeks of finishing.",
  simple: "If you have a pacemaker or a defibrillator, tell the radiotherapy team straight away. They will talk to your heart team, keep the rays away from the device, and get it checked after treatment.",
  summary: "The UK Radiotherapy Board guidance (January 2025, with the British Cardio-Oncology Society and the British Heart Rhythm Society) and the JASTRO/JCS guideline (2021) take a similar approach: identify the device before treatment, obtain its settings, arrhythmia history and pacing dependency from the cardiology team, consent the patient to the risk of malfunction, and classify risk as low, medium or high. The UK guidance says pacing dependency mainly determines the impact of a failure, while cumulative dose and neutrons, protons or heavy ions are associated with the risk of malfunction. It lists the risks as cumulative dose (error thresholds from 0.1 to 10 Gy), neutrons (photons of 10 MV or more, electrons of 20 MeV or more, protons and heavy ions) and high dose rates, and also says malfunctions correlate only weakly with dose. A meta-analysis of 17 retrospective studies (2,454 patients) linked radiotherapy to more malfunctions in ICDs (odds ratio 2.75), concluded that ICDs are more likely to be affected than pacemakers, and found reset more likely with neutron-producing radiotherapy.\n\nUK planning rules: energies below 10 MV (if 10 MV or above cannot be avoided, the patient must be managed as high risk), flattened beams where possible, direct irradiation of the device avoided including the exit beam, the device outlined with a margin (CIED PRV) when it is visible on the CT and within 10 cm (superiorly or inferiorly) of a field edge, and a recommended near-maximum dose (D0.035cc) to the CIED PRV below 5 Gy; a device more than 10 cm superiorly or inferiorly from the beam edge can be assumed to receive under 2 Gy. The dose estimate is cumulative and includes previous radiotherapy and verification imaging (about 0.01 Gy per cone-beam CT when the device is in the field of view). Relocating the device is not recommended below 5 Gy. A cardiac arrest trolley with an AED able to pace externally and trained staff must be in the department; cardiac monitoring is strongly recommended for pacing-dependent patients, a device nearing end of battery life and ICDs, and on the first day a trained person in addition to the treatment team must watch the monitor. A cardiac physiologist interrogates the device mid-course if required, or weekly once it has received more than 5 Gy, and the device must be checked within 2 weeks of the course.\n\nThe UK risk categories are printed only as a flowchart (Figure 1, an image, read by eye). High risk: a neutron-producing, flattening-filter-free or high-energy electron beam where no other beam quality is possible; a device expected to receive 5 Gy or more that cannot be re-sited; or a pacing-dependent patient with an ICD. Medium risk: a pacing-dependent pacemaker patient, or an ICD patient who is not pacing dependent. Everyone else is low risk. The figure asks for audio-visual monitoring with a magnet, pulse oximetry and an AED nearby at low risk, and adds continuous 3-lead ECG monitoring at every fraction, with a magnet or reprogramming, at medium and high risk. The appendix text agrees: a magnet (or reprogramming) is advisable for stable pacing in pacing-dependent pacemaker patients, it is important that an ICD’s shock function is deactivated during treatment (a magnet is acceptable if the patient is monitored), and a pacing-dependent ICD patient needs reprogramming.\n\nJASTRO/JCS classify high risk as any of: photons of 10 MV or more, electrons of 20 MeV or more, protons or carbon ions, pacing dependency, device dose above 10 Gy, previous ventricular fibrillation or ICD intervention; low risk needs all of: photons below 10 MV or electrons below 20 MeV, not pacing dependent, no chest irradiation, device dose below 2 Gy and no history of ventricular tachycardia. The 2022 ESC cardio-oncology guideline sets a lower dose aim (cumulative dose should not exceed 2 Gy to a pacemaker or 1 Gy to an ICD) and is the only document read that grades: risk stratification before treatment, a device check before and after radiotherapy, and ECG or pulse oximetry monitoring at every session for high-risk patients are each Class I, Level C. The UK and Japanese documents print no grades; JASTRO/JCS says it set no evidence levels because each event is relatively rare.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "radiographer", "multidisciplinary-team", "patient-or-carer"],
    where: ["radiotherapy-department", "outpatient-clinic"],
  },
  population: "People with a permanent pacemaker, implantable cardioverter-defibrillator (including subcutaneous ICD), cardiac resynchronisation device (CRT-P managed as a pacemaker, CRT-D as an ICD) or leadless pacemaker who are referred for external beam radiotherapy, kilovoltage radiotherapy or brachytherapy. MR simulation and MR-linac treatment follow MR conditional rules for the device and are noted, not detailed. The sources read do not say anything separate about children.",
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
      action: "Contact the device clinic for the last device check report and all programmed settings, and ask about previous ventricular arrhythmia or ICD therapy",
      why: "The team needs to know how the device is set and how the heart behaves before any treatment.",
      source: "rcr-cied-2025",
      quote: "Ensure the CIED is under regular follow-up and request a report of the last device check and documentation of all programmed parameters",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Discuss the possibility of device malfunction, and how it would be managed, with the patient and record it on the referral and the consent form",
      why: "The patient should know what could happen and what the team will do about it before agreeing to treatment.",
      source: "rcr-cied-2025",
      quote: "Ensure an appropriately trained practitioner has had a risk-benefit discussion with the patient regarding possible device malfunction and management during radiotherapy.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "At the planning scan, ask every patient whether they have a cardiac device, and note that a device more than 10 cm from a potential field edge need not be included in the scan, though the scan is not cut short if the area is needed for planning",
      why: "Smaller and leadless devices need extra vigilance to spot. A planning CT scan poses a low risk to the device, but the guidance still asks for dose to it to be kept down.",
      source: "rcr-cied-2025",
      quote: "If a device is more than 10cm from a potential field edge it is not necessary to include in the planning CT scan (radiotherapy dose will be <2Gy).",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Plan with photon energies below 10 MV, avoid direct irradiation of the device including the exit beam, and prefer flattened beams over high dose-rate beams",
      why: "Higher energies produce neutrons, which are linked to device faults such as a reset; keeping the beam off the device keeps its dose low.",
      source: "rcr-cied-2025",
      quote: "Use energies <10MV to minimise neutron production. If energies at 10MV and above cannot be avoided, then the patient must be managed within the high-risk category.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Outline the device with a margin when it is visible on the scan and within 10 cm of a field edge, record the near-maximum cumulative dose (including earlier radiotherapy and imaging), and aim for less than 5 Gy",
      why: "The total dose the device receives over the whole course is one of the things linked to the chance of a fault.",
      source: "rcr-cied-2025",
      quote: "Recommended near-maximum dose (eg. D0.035cc) to CIED PRV is <5Gy.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Do not significantly compromise the cancer treatment plan to spare the device; if the device would sit in the high-dose volume, consider other techniques, or moving the device, with the patient, the cardiologist and a medical physics expert. Relocation is not recommended for a device dose below 5 Gy",
      why: "The guidance does not want the quality of cancer treatment traded away to protect the device, and moving a device is a procedure with its own risks.",
      source: "rcr-cied-2025",
      quote: "The quality of the treatment plan should not be significantly compromised for the sake of sparing the device.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Before the first treatment, check that the dose estimate, device report and consent are in place, that a cardiac arrest trolley with an automated defibrillator able to pace externally is in the department, and that trained staff are arranged if monitoring is needed",
      why: "If the device fails, the team must be able to support the heart at once.",
      source: "rcr-cied-2025",
      quote: "A cardiac arrest trolley equipped with an automated external defibrillator (AED) capable of delivering external pacing is available within the department and staff are adequately trained to use the equipment.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Use cardiac (ECG) monitoring during treatment for pacing-dependent patients, devices near the end of battery life and ICDs; the guidance strongly recommends it while saying data on its benefit are lacking",
      why: "Watching the heart rhythm lets staff recognise a device malfunction at once.",
      source: "rcr-cied-2025",
      quote: "The goal of continuous cardiac monitoring with electrocardiogram (ECG) during radiotherapy is to aid immediate recognition of device malfunction that may lead to life-threatening arrhythmia.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "On the first day of treatment, have a trained member of staff, in addition to the treatment team, assess the patient and watch the cardiac monitor",
      why: "This person advises when the beam can be switched on and, if needed, when to switch it off.",
      source: "rcr-cied-2025",
      quote: "An appropriately-trained member of staff (in addition to the treatment team) must assess and monitor the patient using the cardiac monitor, advising on when to switch the beam on and, if necessary, switch the beam off.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "If an ICD appears to be shocking inappropriately, a magnet placed over it stops the shocks; seek urgent advice from a cardiologist, and remove the magnet if the patient has a fast heart rhythm and becomes unstable",
      why: "A magnet pauses the defibrillator's shocks without stopping its pacing, but the shocks may be needed if the rhythm is truly dangerous.",
      source: "rcr-cied-2025",
      quote: "If an ICD appears to be delivering shocks inappropriately, a magnet positioned over the device will stop the delivery of shocks and anti-tachycardia therapy but will not affect the pacemaker function of the ICD.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Have a cardiac physiologist interrogate the device mid-course if required, or weekly once it has received more than 5 Gy, and arrange a device check at the referring hospital within 2 weeks of the last treatment, with an advice letter and cardiology follow-up instructions by the last day",
      why: "Device manufacturers quoted in the Japanese guideline warn that a malfunction may appear later, so the device is checked again after treatment ends.",
      source: "rcr-cied-2025",
      quote: "The patient must have their CIED checked at their referring hospital within 2 weeks of completing treatment.",
      grade: "Guidance (ungraded)",
    },
    {
      action: "Record any unexpected device event in the incident reporting system and explain it to the patient",
      why: "Relatively few device events have been reported, and the guidance wants more of them recorded and published so that advice can improve.",
      source: "rcr-cied-2025",
      quote: "All unexpected CIED events detected during the radiotherapy course and in the follow-up period must be systematically recorded using the centre’s incident reporting system and explained to the patient.",
      grade: "Guidance (ungraded)",
    },
  ],
  bestInClass: {
    statement: "Identify the device at referral, obtain its settings and pacing dependency from the device clinic, consent to the risk, and classify risk from pacing dependency, device type, cumulative device dose and neutron production (UK Radiotherapy Board 2025; JASTRO/JCS 2021; ESC 2022, Class I, Level C; the AAPM TG-203 abstract describes a framework built on the devices’ failure modes). Plan below 10 MV with flattened beams where possible, keep the beam off the device and aim for a near-maximum cumulative device dose below 5 Gy (UK), without significantly compromising the cancer plan; use cardiac monitoring for pacing-dependent patients, ICDs and devices near end of battery life (UK, strongly recommended) with resuscitation and external pacing to hand; check the device within 2 weeks of the course (UK and ESC). The bodies differ on thresholds, and each is kept apart here. Dose: the UK recommends below 5 Gy; ESC says the cumulative dose should not exceed 2 Gy to a pacemaker or 1 Gy to an ICD; JASTRO/JCS calls a device dose above 10 Gy high risk and below 2 Gy (with no chest irradiation) one condition of low risk; AAPM TG-203, as the UK guidance tabulates it, has low risk below 2 Gy, medium 2 to 5 Gy and high above 5 Gy or with neutrons. Energy: the UK and JASTRO/JCS count photons of 10 MV or more as high risk, ESC says keep below 10 MV, AAPM as tabulated accepts energies up to and including 10 MV, and the Italian AIAC/AIRO/AIFM line is 6 MV. JASTRO/JCS says to consider raising the category one level for flattening-filter-free beams. The UK and JASTRO/JCS repeat the 2017 HRS position that relocation is not recommended for a device dose below 5 Gy, and ESC says the same. Only ESC grades its recommendations; its three on devices are all Level C.",
    sources: ["rcr-cied-2025", "jastro-jcs-2021", "esc-cardio-onc-2022", "aapm-tg203-2019", "meta-hrthm-2023"],
  },
  variants: [
    {
      name: "JASTRO/JCS (Japan): three risk levels with a 10 Gy high-risk threshold and monitoring by risk",
      differs: "Low risk requires photons below 10 MV or electrons below 20 MeV, no pacing dependency, no chest irradiation, device dose below 2 Gy and no history of ventricular tachycardia; high risk is any of photons of 10 MV or more, electrons of 20 MeV or more, protons, carbon ions, pacing dependency, device dose above 10 Gy, previous ventricular fibrillation or ICD therapy. Medium-risk patients are monitored by ECG or pulse oximeter at the first session and, if necessary, after; high-risk patients at every session. Function is checked after the first session in everyone, about half way through at medium risk and every week at high risk. For FFF beams the guideline says to consider raising the category by one level, depending on the patient’s condition.",
      evidence: "Joint guideline of the Japanese radiation oncology and cardiology societies after a literature search; it sets no evidence levels because each event is relatively rare.",
      sources: ["jastro-jcs-2021"],
    },
    {
      name: "Italian AIAC/AIRO/AIFM and ANMCO: a 6 MV energy line",
      differs: "As tabulated by the UK and JASTRO/JCS documents, the 2018 Italian AIAC/AIRO/AIFM classification counts as low risk only photons or electrons of 6 MV or less with device dose of 2 Gy or less and no pacing dependency (and, for an ICD, no frequent ICD interventions). Its high-risk group includes a device dose above 10 Gy and several combinations of pacing dependency with dose or energy. The 2025 ANMCO statement, by its abstract, discusses risk stratification, the timing of cardiology assessments during treatment and follow-up.",
      evidence: "Expert consensus. The ANMCO statement was read as an abstract only.",
      sources: ["rcr-cied-2025", "anmco-2025"],
    },
    {
      name: "Emergency palliative radiotherapy without dose or device information (UK)",
      differs: "Proceed with radiotherapy even if no device information is available. Use continuous cardiac monitoring where available and refer for a device check within 2 weeks. For an ICD, the appendix says a therapeutic magnet must be placed over the device during the exposure and removed afterwards. The guidance prints two dose limits for this situation: its executive summary says keep doses below 2 Gy, and its Appendix D says keep the device dose below 5 Gy; both ask departments to set rules for a safe distance from field edge to device when dose is not calculated.",
      evidence: "Pragmatic guidance; ungraded.",
      sources: ["rcr-cied-2025"],
    },
    {
      name: "ESC 2022 cardio-oncology guideline: lower dose aims, and graded",
      differs: "The cumulative dose should not exceed 2 Gy to a pacemaker or 1 Gy to an ICD, and photon energy should be kept below 10 MV. Risk is set by whether the device is in the treatment volume, dose, neutron production, and pacing dependency or frequent ICD therapies. High-risk patients have ECG or pulse oximetry monitoring with external pacing available at every session and a weekly device check; everyone has a device check before radiotherapy (if the last was more than 3 months earlier) and after it. Relocation is not recommended for a maximum cumulative dose below 5 Gy.",
      evidence: "Class I, Level C for risk stratification, device checks and monitoring of high-risk patients.",
      sources: ["esc-cardio-onc-2022"],
    },
    {
      name: "AAPM TG-203 (United States), as tabulated by the UK guidance",
      differs: "Low risk is a device dose below 2 Gy, medium 2 to 5 Gy, high above 5 Gy or with neutrons. Energies lower than or equal to 10 MV should be used; above 10 MV the patient is managed as high risk. The generator should be kept at least 5 cm from the field edge where feasible, external lead shielding is not recommended, and a device more than 10 cm from the treatment area needs no in vivo dosimetry. The device is interrogated before the first and after the last fraction at low risk, at mid-treatment at medium risk, and weekly once it has received more than 5 Gy at high risk.",
      evidence: "Task group report; ungraded. Read here only through the UK guidance’s Appendix A, not from the report itself.",
      sources: ["rcr-cied-2025", "aapm-tg203-2019"],
    },
  ],
  grades: [
    { claim: "Radiotherapy is associated with more malfunctions in implantable defibrillators; the authors conclude ICDs are more likely to be affected than pacemakers", grade: "Meta-analysis of 17 retrospective observational studies (2,454 patients)", source: "meta-hrthm-2023", quote: "The meta-analysis showed that RT was associated with an increased risk of ICD malfunctions (odds ratio [OR] 2.75; 95% confidence interval [CI] 1.74-4.33)." },
    { claim: "Neutron-producing radiotherapy raises the risk of device malfunction", grade: "Meta-analysis of observational studies", source: "meta-hrthm-2023", quote: "Neutron-generating RT significantly increased the risk of CIED malfunctions (OR 3.97; 95% CI 1.70-9.26), especially the risk of reset (OR 5.79; 95% CI 2.37-14.12; P = .0001)." },
    { claim: "Monitoring by ECG or pulse oximeter for high-risk patients at every session", grade: "Guideline (ungraded)", source: "jastro-jcs-2021", quote: "For high-risk patients, monitor the circulation using an electrocardiogram or pulse oximeter for pulse abnormalities in every radiotherapy session." },
    { claim: "Consider raising the risk category by one level for flattening-filter-free beams", grade: "Guideline (ungraded)", source: "jastro-jcs-2021", quote: "When using flattening filter-free (FFF) beams, consider raising the risk classification by one level depending on the patient’s condition." },
    { claim: "A device more than 10 cm superiorly or inferiorly from the beam edge can be assumed to receive under 2 Gy", grade: "Guidance (ungraded)", source: "rcr-cied-2025", quote: "If the CIED is >10cm superiorly or inferiorly from the edge of the treatment beam, it can be assumed that the near-maximum dose (eg. D0.035cc) to the CIED PRV will be <2Gy." },
    { claim: "A device check before and after radiotherapy for everyone, and during it according to risk", grade: "Class I, Level C", source: "esc-cardio-onc-2022", quote: "In patients undergoing RT, a CIED check is recommended in all patients before and after completing RT, and during RT according to individual risk." },
    { claim: "ECG or pulse oximetry monitoring at every session for high-risk patients", grade: "Class I, Level C", source: "esc-cardio-onc-2022", quote: "In patients with a CIED undergoing RT at high risk of arrhythmia and/or device dysfunction, ECG monitoring and/or pulse oximetry are recommended during every RT session." },
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "esc-cardio-onc-2022",
      label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS)",
      publisher: "European Society of Cardiology (European Heart Journal)",
      year: 2022,
      url: "https://doi.org/10.1093/eurheartj/ehac244",
      doi: "10.1093/eurheartj/ehac244",
      gradingScheme: "ESC classes of recommendation (I, IIa, IIb, III) and levels of evidence (A, B, C); Level C is consensus of opinion of the experts and/or small studies, retrospective studies or registries.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "meta-hrthm-2023",
      label: "Radiotherapy-induced malfunctions of cardiac implantable electronic devices: A meta-analysis",
      publisher: "Heart Rhythm",
      year: 2023,
      url: "https://doi.org/10.1016/j.hrthm.2023.01.024",
      doi: "10.1016/j.hrthm.2023.01.024",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "anmco-2025",
      label: "Management of cardiac implantable electronic devices in cancer patients undergoing radiotherapy. An Italian Association of Hospital Cardiologists (ANMCO) statement",
      publisher: "ANMCO (Giornale Italiano di Cardiologia)",
      year: 2025,
      url: "https://doi.org/10.1714/4531.45340",
      doi: "10.1714/4531.45340",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["imrt-igrt", "in-room-imaging-systems"],
  terms: ["radiotherapy"],
  related: ["mri-safety-screening-implants", "radiotherapy-patient-identification-and-time-out"],
  upgrades: [],
  gaps: [
    "The AAPM TG-203 report could not be read in full: the publisher returned 403 to a script on 11 November and again on 17 November 2026, and no open copy was found. Its risk categories and thresholds are given here only as the UK guidance tabulates them in its Appendix A, so they are second-hand.",
    "The 2017 HRS expert consensus statement was not read: on 17 November 2026 the journal’s free PDF link returned 403 to a script. Its rule that relocation is not recommended below 5 Gy is reported as the UK and Japanese documents state it.",
    "Thresholds differ between bodies (UK aim below 5 Gy; ESC 2 Gy for a pacemaker and 1 Gy for an ICD; JASTRO/JCS high risk above 10 Gy and low risk below 2 Gy; Italian energy line at 6 MV). No prospective trial comparing the strategies is cited by the documents read, and the UK guidance says there is a paucity of clinical reports and that malfunctions correlate only weakly with dose.",
    "The UK guidance itself says there is a lack of data on the benefit of continuous cardiac monitoring; it strongly recommends monitoring anyway for those at greatest risk.",
    "The UK risk flowchart (Figure 1) is an image. On 17 November 2026 it was read by eye from the rendered page, so the UK risk categories and what each requires are stated in the summary but not quoted, and no step rests on the figure alone.",
    "The UK guidance prints two dose limits for emergency treatment without device information: below 2 Gy in its executive summary and below 5 Gy in its Appendix D. It does not explain the difference.",
    "Proton and heavy ion therapy are treated as high risk by the UK and Japanese guidelines; device-specific evidence for particle therapy was not examined.",
    "The ESC 2022 figures are flowcharts whose layout does not survive conversion to text; the ESC thresholds here are from its section 9.5 text, figure footnotes and Recommendation Table 50. A Europe PMC title search on 17 November 2026 found no newer edition of the Japanese or ESC document, and the UK guidance still serves at its January 2025 address.",
    "The ANMCO 2025 statement was read as an abstract only (the full text is in Italian and behind the publisher’s site), so its own thresholds are not given.",
  ],
});
