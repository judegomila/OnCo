import { protocol } from "./helpers";

/*
 * Standard radiotherapy dose and fractionation by site: the reference schedules a clinical oncologist prescribes from,
 * with the grade each carries, and where the United States guideline differs.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - The Royal College of Radiologists, Radiotherapy dose fractionation, fourth edition (January 2024): full text, the
 *   184-page PDF linked from the RCR page, read with pdftotext. The page says it supersedes the third edition (2019),
 *   which is withdrawn. No fifth edition or later update was found on the RCR page.
 * - ASTRO, Hypofractionated Radiation Therapy for Localized Prostate Cancer: An ASTRO Clinical Practice Guideline
 *   (Practical Radiation Oncology, first published 27 October 2026): abstract, Europe PMC. It replaces the 2018
 *   ASTRO/ASCO/AUA guideline.
 * - ASTRO, External Beam Radiation Therapy for Palliation of Symptomatic Bone Metastases (2024): abstract, Europe PMC.
 * - ASTRO, Radiation therapy for the whole breast, executive summary (2018): abstract, Europe PMC.
 *
 * The ASTRO full texts are in Practical Radiation Oncology behind a paywall and were not read; their grades are not
 * quoted. Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line
 * breaks joined; the RCR's bullet character is kept where it is part of the recommendation.
 */
export const radiotherapyDoseFractionationReference = protocol({
  id: "radiotherapy-dose-fractionation-reference",
  name: "Radiotherapy dose and fractionation by cancer site: UK reference schedules",
  aka: ["dose fractionation", "RCR dose fractionation fourth edition", "fractionation schedules", "radiotherapy prescription", "how many fractions", "hypofractionation schedules", "26 Gy in 5 fractions", "60 Gy in 20 fractions", "8 Gy single fraction"],
  domain: "radiotherapy",
  tldr: "Radiotherapy is given as a total dose split into a number of treatments (fractions). For most common cancers there is a standard schedule backed by trials: for example one week for early breast cancer, four weeks for prostate cancer, and often a single treatment for painful bone metastases. Fewer, larger treatments are now standard for many cancers because trials showed they work as well.",
  simple: "Your radiotherapy dose is split into a set number of visits. UK specialists publish a list of the standard schedules for each cancer, based on trials. Ask your team which schedule you are having and why.",
  summary: "The RCR's Radiotherapy dose fractionation (fourth edition, January 2024) is the UK reference: evidence-based schedules for 22 sites, each graded on the Oxford CEBM scale (A consistent level 1 studies to D expert opinion). It covers external beam only (brachytherapy is excluded), avoids recommending fields, volumes or technique, and states that inclusion does not mean a schedule is commissioned by the NHS in any of the four nations. It also sets out what a complete prescription contains.\n\nExamples, as printed: adjuvant non-nodal breast or chest wall without immediate reconstruction 26 Gy in 5 fractions over 1 week (A), the same for external beam partial breast (A), regional nodes 40 Gy in 15 (B); prostate only 60 Gy in 20 fractions over 4 weeks (A); radical bladder 55 Gy in 20 (A); short-course preoperative rectal 25 Gy in 5 (A); medically inoperable peripheral T1 to T2b N0 lung SABR 54 Gy in 3 (B); glioblastoma with good performance status under 70, 60 Gy in 30 with or without temozolomide (A); painful bone metastases 8 Gy single dose (A); spinal cord compression in non-ambulant patients or a prognosis under 6 months 8 Gy single dose (A), and 20 Gy in 5 or 30 Gy in 10 for ambulant patients with a good prognosis or after surgery (B).\n\nASTRO differs in places: its 2018 whole-breast guideline prefers 40 Gy in 15 or 42.5 Gy in 16 (not 26 Gy in 5); its 2024 bone metastasis guideline lists 8 Gy in 1, 20 Gy in 5, 24 Gy in 6 or 30 Gy in 10 as equally recommended and conditionally prefers SBRT for selected patients with good performance status; its October 2026 prostate guideline recommends moderate hypofractionation over conventional fractionation for all risk groups and ultrahypofractionation as a standard option for low and intermediate risk.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "multidisciplinary-team"],
    where: ["radiotherapy-department", "outpatient-clinic"],
  },
  population: "Adults having external beam radiotherapy in the UK, for the indications the RCR lists. Brachytherapy, children's schedules beyond the RCR paediatric chapter, technique and target volumes are outside this reference. The schedules are a prescribing reference for clinical oncologists, not advice for an individual patient.",
  trigger: "A clinical oncologist prescribing a course of external beam radiotherapy.",
  steps: [
    {
      action: "Write a complete prescription: patient identity, diagnosis, site and side, prescriber, intent, date, modality, volumes, dose and fractionation, normal tissue limits, overall time, technique and associated treatments (including chemotherapy, pacemakers and prostheses)",
      why: "The prescription is the legal record of the treatment and is used as evidence that the treatment was justified and checked.",
      source: "rcr-dose-fx-2024",
      quote: "The legal record of the radiotherapy treatment to be delivered is the radiotherapy treatment prescription.",
      grade: "ungraded (introduction)",
    },
    {
      action: "For adjuvant whole breast or chest wall radiotherapy without nodes and without immediate reconstruction, prescribe 26 Gy in 5 fractions over 1 week",
      why: "Since the UK FAST-Forward trial in 2020, one week has replaced three weeks as standard for early breast cancer.",
      source: "rcr-dose-fx-2024",
      quote: "For adjuvant radiotherapy of non-nodal breast or chest wall without immediate reconstruction: • 26 Gy in 5 fractions over 1 week (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For regional nodal irradiation in breast cancer, prescribe 40 Gy in 15 fractions over 3 weeks",
      why: "Three weeks remains the standard when the lymph node areas are treated.",
      source: "rcr-dose-fx-2024",
      quote: "For regional nodal irradiation: • 40 Gy in 15 fractions over 3 weeks (Grade B)",
      grade: "Grade B",
    },
    {
      action: "For radiotherapy to the prostate only, prescribe 60 Gy in 20 fractions over 4 weeks",
      why: "Four weeks controls the cancer as well as the older seven-and-a-half-week course.",
      source: "rcr-dose-fx-2024",
      quote: "Prostate-only RT: • 60 Gy in 20 fractions over 4 weeks (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For radical bladder radiotherapy, prescribe 55 Gy in 20 fractions over 4 weeks as the regimen of choice",
      why: "Four weeks is the UK regimen of choice for curative bladder radiotherapy, graded on the strongest level of evidence.",
      source: "rcr-dose-fx-2024",
      quote: "For radical radiotherapy to the bladder: • 55 Gy in 20 fractions over 4 weeks is the regimen of choice (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For short-course preoperative rectal radiotherapy, prescribe 25 Gy in 5 daily fractions",
      why: "One week of radiotherapy before surgery lowers the chance of the cancer returning in the pelvis.",
      source: "rcr-dose-fx-2024",
      quote: "Short-course preoperative radiotherapy: • 25 Gy in 5 daily fractions (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For medically inoperable small peripheral lung cancer (T1 to T2b, 5 cm or less, N0) in a favourable position, prescribe SABR 54 Gy in 3 fractions over 5 to 8 days",
      why: "A few very precise high doses control small lung cancers in people who cannot have surgery.",
      source: "rcr-dose-fx-2024",
      quote: "SABR using: • 54 Gy in 3 fractions over 5–8 days (Grade B)",
      grade: "Grade B",
    },
    {
      action: "For glioblastoma (IDH wild-type) in people under 70 with good performance status and minimal residual tumour, prescribe 60 Gy in 30 daily fractions over 6 weeks, with or without temozolomide",
      why: "Six weeks of radiotherapy, usually with temozolomide, is the standard for fit people with this tumour.",
      source: "rcr-dose-fx-2024",
      quote: "Good performance status (KPS 80–100) and aged <70 with minimal residual tumour: • 60 Gy in 30 daily fractions over 6 weeks ± temozolomide (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For pain from bone metastases, prescribe a single 8 Gy treatment",
      why: "Trials and their meta-analyses support a single treatment for pain; around a quarter of people need a further treatment later.",
      source: "rcr-dose-fx-2024",
      quote: "For the initial treatment of pain from bone metastases: • 8 Gy single dose (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For spinal cord compression in people who cannot walk or have a prognosis under 6 months, prescribe 8 Gy single dose; for those who can walk with a good prognosis, or after spinal surgery, 20 Gy in 5 or 30 Gy in 10",
      why: "A single treatment spares people with little time from extra visits; longer courses suit those expected to live longer.",
      source: "rcr-dose-fx-2024",
      quote: "Metastatic spinal cord compression: non-ambulant patients or ambulant patients with a prognosis <6 months: • 8 Gy single dose (Grade A)",
      grade: "Grade A (single dose); Grade B (20 Gy in 5 or 30 Gy in 10)",
    },
    {
      action: "Check that the schedule is commissioned locally before offering it; inclusion in the RCR reference is not a commissioning decision",
      why: "A schedule can be evidence-based and still not yet funded in a given UK nation.",
      source: "rcr-dose-fx-page",
      quote: "However, inclusion in this guidance does not imply that a particular treatment or schedule is commissioned by the national health services in the four UK nations.",
      grade: "ungraded",
    },
  ],
  bestInClass: {
    statement: "For UK practice, the RCR fourth edition (January 2024) is the current graded reference, with Grade A schedules for the commonest indications (26 Gy in 5 for non-nodal breast, 60 Gy in 20 for prostate, 55 Gy in 20 for bladder, 25 Gy in 5 short-course rectal, 60 Gy in 30 for fit glioblastoma, 8 Gy single dose for painful bone metastases and for cord compression with poor mobility or prognosis). Where the US guideline differs, both are shown: ASTRO (2018) prefers 40 Gy in 15 or 42.5 Gy in 16 for whole breast, predating the five-year FAST-Forward results the RCR grades A; ASTRO (2024) recommends 8 Gy in 1, 20 Gy in 5, 24 Gy in 6 or 30 Gy in 10 for painful bone metastases, conditionally preferring SBRT for selected fit patients, where the RCR names 8 Gy single dose; ASTRO (October 2026) recommends moderate hypofractionation for localized prostate cancer across risk groups and ultrahypofractionation as a standard option at low and intermediate risk, consistent with the RCR's 60 Gy in 20.",
    sources: ["rcr-dose-fx-2024", "astro-breast-2018", "astro-bone-2024", "astro-prostate-2026"],
  },
  variants: [
    {
      name: "ASTRO whole-breast guideline (2018)",
      differs: "Preferred whole-breast schedule is 40 Gy in 15 fractions or 42.5 Gy in 16 fractions; 26 Gy in 5 is not the preferred option.",
      evidence: "Systematic review and graded consensus (abstract read). Published before the five-year FAST-Forward results on which the RCR's Grade A rests.",
      sources: ["astro-breast-2018", "rcr-dose-fx-2024"],
    },
    {
      name: "ASTRO palliative bone metastasis guideline (2024)",
      differs: "Recommends 8 Gy in 1, 20 Gy in 5, 24 Gy in 6 or 30 Gy in 10 for symptomatic bone metastases; for cord or cauda equina compression in people ineligible for surgery, 8 Gy in 1, 16 Gy in 2, 20 Gy in 5 or 30 Gy in 10; conditionally recommends SBRT over conventional radiotherapy for selected patients with good performance status without surgery or neurological signs; surgery then radiotherapy conditionally over radiotherapy alone for cord compression.",
      evidence: "Based on an AHRQ systematic review with graded consensus (abstract read).",
      sources: ["astro-bone-2024"],
    },
    {
      name: "ASTRO prostate hypofractionation guideline (October 2026)",
      differs: "Recommends moderate hypofractionation over conventional fractionation for all risk groups and ultrahypofractionation as a standard option for low- and intermediate-risk disease, to be considered in selected high-risk patients, preferably in trials; moderate hypofractionation may be preferred with significant baseline urinary problems.",
      evidence: "Systematic review with graded consensus; high-quality randomised data (abstract read). The schedules it lists were not read.",
      sources: ["astro-prostate-2026"],
    },
  ],
  grades: [
    { claim: "Non-nodal breast or chest wall without immediate reconstruction: 26 Gy in 5 fractions", grade: "Grade A", source: "rcr-dose-fx-2024" },
    { claim: "Partial breast external beam: 26 Gy in 5 fractions", grade: "Grade A", source: "rcr-dose-fx-2024", quote: "For partial breast radiotherapy using external beam radiotherapy: • 26 Gy in 5 fractions over 1 week (Grade A)" },
    { claim: "Prostate only: 60 Gy in 20 fractions", grade: "Grade A", source: "rcr-dose-fx-2024" },
    { claim: "Ambulant cord compression with a good prognosis, or after surgery: 20 Gy in 5 or 30 Gy in 10", grade: "Grade B", source: "rcr-dose-fx-2024", quote: "Metastatic spinal cord compression: ambulant patients with a good prognosis or post-spinal surgery: • 20 Gy in 5 daily fractions over 1 week (Grade B) or • 30 Gy in 10 daily fractions over 2 weeks (Grade B)" },
    { claim: "Reirradiation of bone metastases: 8 Gy single dose or 20 Gy in 5", grade: "Grade B", source: "rcr-dose-fx-2024", quote: "For the reirradiation of bone metastases: • 8 Gy single dose (Grade B) • 20 Gy in 5 daily fractions (or 8 fractions over the spinal cord) over 1 week (Grade B)" },
  ],
  sources: [
    {
      key: "rcr-dose-fx-2024",
      label: "Radiotherapy dose fractionation, fourth edition (January 2024)",
      publisher: "The Royal College of Radiologists",
      year: 2024,
      url: "https://www.rcr.ac.uk/media/0d4mrqi5/radiotherapy-dose-fractionation-fourth-edition.pdf",
      gradingScheme: "Oxford Centre for Evidence-Based Medicine (2009): levels 1a to 5; grades A (consistent level 1 studies), B (consistent level 2 or 3, or extrapolations from level 1), C (level 4, or extrapolations from level 2 or 3), D (level 5, or inconsistent or inconclusive studies).",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "rcr-dose-fx-page",
      label: "Radiotherapy dose fractionation, Fourth edition (publication page)",
      publisher: "The Royal College of Radiologists",
      year: 2024,
      url: "https://www.rcr.ac.uk/our-services/all-our-publications/clinical-oncology-publications/radiotherapy-dose-fractionation-fourth-edition/",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "astro-prostate-2026",
      label: "Hypofractionated Radiation Therapy for Localized Prostate Cancer: An ASTRO Clinical Practice Guideline",
      publisher: "American Society for Radiation Oncology (Practical Radiation Oncology)",
      year: 2026,
      url: "https://doi.org/10.1016/j.prro.2026.09.017",
      doi: "10.1016/j.prro.2026.09.017",
      gradingScheme: "ASTRO grading of quality of evidence and strength of recommendation (full text not read).",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "astro-bone-2024",
      label: "External Beam Radiation Therapy for Palliation of Symptomatic Bone Metastases: An ASTRO Clinical Practice Guideline",
      publisher: "American Society for Radiation Oncology (Practical Radiation Oncology)",
      year: 2024,
      url: "https://doi.org/10.1016/j.prro.2024.04.018",
      doi: "10.1016/j.prro.2024.04.018",
      gradingScheme: "ASTRO evidence quality and recommendation strength (full text not read).",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "astro-breast-2018",
      label: "Radiation therapy for the whole breast: Executive summary of an American Society for Radiation Oncology (ASTRO) evidence-based guideline",
      publisher: "American Society for Radiation Oncology (Practical Radiation Oncology)",
      year: 2018,
      url: "https://doi.org/10.1016/j.prro.2018.01.012",
      doi: "10.1016/j.prro.2018.01.012",
      gradingScheme: "ASTRO evidence quality and recommendation strength (full text not read).",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["breast-cancer", "prostate", "urothelial", "rectal-cancer", "nsclc", "glioblastoma"],
  technologies: ["sbrt"],
  terms: ["hypofractionation", "bone-metastases", "metastatic-spinal-cord-compression"],
  institutions: ["astro"],
  related: ["prostate-radiotherapy-bladder-and-rectal-preparation", "breast-radiotherapy-positioning-and-setup"],
  upgrades: ["idea-pu-five-fraction-breast-default", "idea-pu-prostate-hypofractionation-default", "idea-acc-single-fraction-palliative-radiotherapy-default"],
  gaps: [
    "Only a selection of the RCR's schedules is shown as steps; the reference covers 22 sites and many more indications, including head and neck, gynaecological, lymphoma, paediatric, skin and oligometastatic disease.",
    "The ASTRO guidelines were read as abstracts; their full texts (and so their grades and the full lists of schedules) are behind the Practical Radiation Oncology paywall.",
    "The ASTRO whole-breast guideline (2018) predates the five-year FAST-Forward results; no newer ASTRO whole-breast guideline was found in Europe PMC.",
    "ESTRO and ESMO site-specific fractionation recommendations were not compared here.",
    "The RCR reference excludes brachytherapy and does not cover technique or target volumes.",
  ],
});
