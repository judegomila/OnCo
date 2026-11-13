import { protocol } from "./helpers";

/*
 * MRI safety screening for people with implants, devices, patches and other metal, as it applies to people with cancer
 * (ports, drug pumps, pain patches, pacemakers, surgical clips).
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - MHRA, Safety Guidelines for Magnetic Resonance Imaging Equipment in Clinical Use, version 5.0 (gov.uk publication
 *   page last updated 30 September 2026; PDF MHRA_MRI_Guidance_v5-0-04.pdf): full text, read with pdftotext. The
 *   guidance is ungraded; its key recommendations are printed in boxes, and where a box restates a body sentence the
 *   body sentence is quoted.
 * - ACR Manual on MR Safety (2024) and the Radiology commentary on it (2025, DOI 10.1148/radiol.242954, no abstract in
 *   Europe PMC): not read. The ACR site serves a JavaScript shell to a script.
 *
 * The guidance names no implanted port, tissue expander or other cancer-specific device; it defers device-specific
 * advice to manufacturers and professional bodies. Statements about specific devices are therefore not made here.
 */
export const mriSafetyScreeningImplants = protocol({
  id: "mri-safety-screening-implants",
  name: "MRI safety screening for implants, devices and medicine patches",
  aka: ["MRI safety checklist", "MRI screening form", "MRI with a port", "MRI with a pacemaker", "MR conditional implant", "MRI and fentanyl patch", "metal and MRI", "MRI implant card"],
  domain: "screening-diagnostics",
  tldr: "An MRI scanner is a very strong magnet, so before every scan you will be asked about any implant, device, patch or metal in or on your body, even if you have had MRI before. Bring any implant card. Many implants, including most ports, can be scanned safely under set conditions, but the team needs to know the exact device. Tell the radiographer at once if you feel warmth or tingling.",
  simple: "Before an MRI you fill in a safety form every time. Tell them about ports, pumps, pacemakers, clips, skin patches, tattoos and any metal. Bring your implant card. If anything feels warm or tingly in the scanner, press the call button.",
  summary: "MHRA guidance version 5.0 (2026) recommends four screening stages: targeted MRI questions on the referral (the referrer must identify implants and contraindications), questions at booking, a full screening form reviewed with the patient by an MR Authorised Person on arrival, and visual and verbal screening just before entering the magnet room; screening is repeated at every visit and completed before any sedation. Implant make and model should be in the operation notes and on an implant card, and the information should reach the unit before the appointment. Sites should have generic implant safety procedures for low-risk passive implants that do not need make and model, and otherwise identify the device and follow the manufacturer's MR Conditional terms. Where a condition cannot be met, the device is MR Unsafe, unlabelled or unknown, scanning may still proceed if benefit outweighs risk, after a documented multidisciplinary risk assessment (MR radiographer, MR safety expert, MR clinician, and a specialist such as a cardiologist for cardiac devices) with precautions and post-scan checks. Medicine patches with metal can burn, and heated fentanyl patches can cause overdose, so sites need a process for removing and replacing them. Patients with tattoos or permanent make-up report warmth at once. Burns can occur without immediate pain and are reported to the MHRA. Advice about specific devices is left to manufacturers and professional bodies (for cardiac devices, the Joint British Societies' recommendations, which were not read here).",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward"],
  },
  population: "Adults and children referred for MRI, including people with cancer who have implanted ports, central lines, drug pumps, cardiac devices, surgical clips, markers or other implants, or who use medicine patches. Specific devices are not covered: their manufacturer's MR safety information and the relevant professional body guidance decide whether and how they are scanned.",
  trigger: "An MRI is requested.",
  steps: [
    {
      action: "On the referral, answer the MRI safety questions and name any implanted device, so the unit can check it before the appointment",
      why: "Finding out about a device early gives time to confirm it is safe rather than cancelling on the day.",
      source: "mhra-2026",
      quote: "It is the responsibility of the referrer to identify those patients with implants and/or contraindications to MR before referral.",
      grade: "ungraded",
    },
    {
      action: "Record the make and model of every implant in the operation notes, and give the patient the implant card",
      why: "Whether a device can go in a scanner depends on its exact make and model.",
      source: "mhra-2026",
      quote: "Surgeons and other medical practitioners should provide patients with accurate documentation and information about the medical devices implanted into them, for example, providing them with an implant card and patient information provided by the implant manufacturer.",
      grade: "ungraded",
    },
    {
      action: "Screen at booking, again with a full form reviewed with the patient on arrival, and again in person just before the magnet room, and do it at every visit",
      why: "Several checks give several chances to catch something missed, and things change between scans.",
      source: "mhra-2026",
      quote: "Screening must take place every time the patient attends the MRI unit, even if the patient has already had a previous MRI examination either locally or at another facility.",
      grade: "ungraded",
    },
    {
      action: "Complete screening before any sedation or anaesthetic, and for people who cannot answer, use family, records, previous imaging or an X-ray to find implants",
      why: "Once someone is asleep or cannot speak for themselves, they cannot warn staff about metal.",
      source: "mhra-2026",
      quote: "If a patient is to undergo sedation or anaesthesia for the scan, all required safety screening should be completed prior to its administration.",
      grade: "ungraded",
    },
    {
      action: "For a low-risk passive implant, follow the site's generic implant safety procedure; otherwise identify the make and model and follow the manufacturer's MR conditions",
      why: "Many common implants are safe under known conditions; others need their own settings or limits.",
      source: "mhra-2026",
      quote: "Where a local GISP does not exist, sites should have a process for identifying the make and model of the implant.",
      grade: "ungraded",
    },
    {
      action: "If a condition cannot be met, or the device is unsafe, unlabelled or unknown, scan only after a documented multidisciplinary risk assessment shows benefit outweighs risk, with precautions and a check of the patient and device afterwards",
      why: "Some people need an MRI that their device was not tested for; a team decision with safeguards makes that possible without ruling them out.",
      source: "mhra-2026",
      quote: "If the benefit to the patient of this off-label procedure outweighs the potential risk, then scanning can be undertaken.",
      grade: "ungraded",
    },
    {
      action: "Remove medicine patches that contain metal, following the site's process for taking them off and replacing them",
      why: "Metal in a patch can heat up and burn, and a heated fentanyl patch can release too much drug.",
      source: "mhra-2026",
      quote: "For example, patches containing fentanyl may result in a serious overdose if exposed to heat",
      grade: "ungraded",
    },
    {
      action: "Remove anything removable before entering the scanner room, and change the person into the unit's clothing",
      why: "Loose metal can be pulled into the magnet, and some fabrics heat up.",
      source: "mhra-2026",
      quote: "Patients should be scanned in appropriate MR SAFE clothing. Ideally, patients should be changed into clothing provided by the MRI unit to minimise the risk of burns.",
      grade: "ungraded",
    },
    {
      action: "Ask the person to report any warmth or tingling straight away, especially over tattoos or permanent make-up, and give them the call button",
      why: "Burns can start before they hurt, so an early warning matters.",
      source: "mhra-2026",
      quote: "However, patients should be instructed to inform staff immediately if they feel any focal warming or tingling on their skin.",
      grade: "ungraded",
    },
    {
      action: "Report any burn through the local incident system and to the MHRA, and consider an aftercare leaflet because a burn can appear later",
      why: "Reporting finds patterns that make scanning safer for others.",
      source: "mhra-2026",
      quote: "Any patient burns must be reported via local incident reporting systems, and also to the MHRA.",
      grade: "ungraded",
    },
  ],
  bestInClass: {
    statement: "MHRA Safety Guidelines for MRI Equipment in Clinical Use, version 5.0 (2026): four-stage screening repeated at every visit; implant make and model documented and known before the appointment; generic implant safety procedures for low-risk passive implants; manufacturer MR Conditional terms otherwise; a documented multidisciplinary risk assessment for off-label or unknown devices so that people with implants are not refused MRI by default; removal of metal-containing medicine patches; and instructions to report warmth. The guidance is ungraded and defers device-specific advice to manufacturers and professional bodies.",
    sources: ["mhra-2026"],
  },
  variants: [],
  grades: [
    { claim: "Generic implant safety procedures for low-risk implants", grade: "ungraded (key recommendation box)", source: "mhra-2026", quote: "It is recommended that sites establish local generic implant safety procedures (GISPs) to allow scanning of low-risk implants without needing to establish the make and model." },
    { claim: "Off-label scanning decided by a multidisciplinary team", grade: "ungraded", source: "mhra-2026", quote: "As a minimum this should involve an MR RADIOGRAPHER, an MR SAFETY EXPERT and the MR CLINICIAN." },
    { claim: "Do not rely on generative AI for MR safety advice", grade: "ungraded (key recommendation box)", source: "mhra-2026", quote: "Caution is advised regarding use of MR safety advice obtained using generative artificial intelligence" },
  ],
  sources: [
    {
      key: "mhra-2026",
      label: "Safety Guidelines for Magnetic Resonance Imaging Equipment in Clinical Use, version 5.0",
      publisher: "Medicines and Healthcare products Regulatory Agency (MHRA)",
      year: 2026,
      url: "https://www.gov.uk/government/publications/safety-guidelines-for-magnetic-resonance-imaging-equipment-in-clinical-use",
      gradingScheme: "Guidance, not graded; key recommendations are printed in boxes.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "acr-mr-safety",
      label: "ACR Manual on MR Safety (and the 2025 Radiology commentary on its update)",
      publisher: "American College of Radiology",
      year: 2024,
      url: "https://doi.org/10.1148/radiol.242954",
      doi: "10.1148/radiol.242954",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["fentanyl"],
  technologies: ["mri", "implanted-ports"],
  related: [],
  upgrades: [],
  gaps: [
    "The MHRA guidance names no cancer-specific device. Whether a particular implanted port, PICC, breast tissue expander with a magnetic port, intrathecal drug pump or radiotherapy marker can be scanned depends on its manufacturer's MR safety information, which is not summarised here.",
    "The Joint British Societies' recommendations for MRI with cardiac implantable devices, cited by MHRA, were not read.",
    "The ACR Manual on MR Safety and the 2025 Radiology commentary on it could not be read (the ACR site served a JavaScript shell; Europe PMC holds no abstract for the commentary).",
    "The guidance is ungraded consensus.",
  ],
});
