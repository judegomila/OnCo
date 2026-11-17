import { protocol } from "./helpers";

/*
 * Standard radiotherapy dose and fractionation by site: the reference schedules a clinical oncologist prescribes from,
 * with the grade each carries, and where the United States guideline differs.
 *
 * What was read, and how (first on 11 November 2026; re-read claim by claim on 17 November 2026 in a second accuracy
 * pass, each source fetched raw again and read as text):
 * - The Royal College of Radiologists, Radiotherapy dose fractionation, fourth edition (January 2024): full text, the
 *   PDF linked from the RCR page, read with pdftotext. The RCR page (re-read 17 November 2026) says it supersedes the
 *   third edition, which is withdrawn, and names no later edition or update.
 * - ASTRO, Hypofractionated Radiation Therapy for Localized Prostate Cancer: An ASTRO Clinical Practice Guideline
 *   (Practical Radiation Oncology, first published 27 October 2026): abstract, Europe PMC. A 2018 ASTRO, ASCO and AUA
 *   guideline of the same title exists; the abstract does not say how the two relate.
 * - ASTRO, External Beam Radiation Therapy for Palliation of Symptomatic Bone Metastases (2024): abstract, Europe PMC.
 * - ASTRO, Radiation therapy for the whole breast, executive summary (2018): abstract, Europe PMC.
 *
 * The ASTRO full texts are in Practical Radiation Oncology; the publisher's site answers a script with a browser
 * check, so they were not read and their grades are not quoted. Every DOI was resolved through Crossref and Europe PMC
 * and its title checked. Quotes are copied from the raw text with line breaks joined, and were checked verbatim by
 * script on 17 November 2026; the RCR's bullet character is kept where it is part of the recommendation.
 *
 * Changed on 17 November 2026: schedules the RCR lists as one of several options are no longer written as the only
 * one (lung SABR, prostate, bladder); reasons the RCR does not give were reworded to what it says; "equally
 * recommended" and "not 26 Gy in 5" were removed from the ASTRO comparisons because the abstracts say neither; the
 * commissioning caveat is attributed to the RCR page, where it is printed; the RCR's own note on NICE and cord
 * compression was added.
 */
export const radiotherapyDoseFractionationReference = protocol({
  id: "radiotherapy-dose-fractionation-reference",
  name: "Radiotherapy dose and fractionation by cancer site: UK reference schedules",
  aka: ["dose fractionation", "RCR dose fractionation fourth edition", "fractionation schedules", "radiotherapy prescription", "how many fractions", "hypofractionation schedules", "26 Gy in 5 fractions", "60 Gy in 20 fractions", "8 Gy single fraction"],
  domain: "radiotherapy",
  tldr: "Radiotherapy is given as a total dose split into a number of treatments (fractions). For most common cancers UK specialists recommend schedules backed by trials: for example one week for early breast cancer, four weeks for prostate cancer, and a single treatment for pain from bone metastases. Shorter schedules have replaced longer ones for several cancers after trials showed similar results.",
  simple: "Your radiotherapy dose is split into a set number of visits. UK specialists publish a list of the recommended schedules for each cancer, based on trials. Ask your team which schedule you are having and why.",
  summary: "The RCR's Radiotherapy dose fractionation (fourth edition, January 2024) is the UK reference: evidence-based schedules in 22 chapters (18 tumour sites, then bone metastases, brain metastases, extracranial oligometastases and spinal cord compression), graded on the Oxford CEBM scale (A consistent level 1 studies, to D level 5 evidence or inconsistent or inconclusive studies). Brachytherapy was not considered as part of the project, and it avoids specific recommendations on fields, volume or technique. It also sets out what a complete prescription should include. The RCR's publication page adds that inclusion does not imply a schedule is commissioned by the national health services in the four UK nations.\n\nExamples, as printed: adjuvant non-nodal breast or chest wall without immediate reconstruction 26 Gy in 5 fractions over 1 week (A), the same for external beam partial breast (A), regional nodes 40 Gy in 15 over 3 weeks (B); prostate only 60 Gy in 20 fractions over 4 weeks (A), with stereotactic radiotherapy 36.25 Gy in 5 also listed (A); radical bladder 55 Gy in 20 over 4 weeks as the regimen of choice (A), or 64 Gy in 32 over 6.5 weeks (B); short-course preoperative rectal 25 Gy in 5 daily fractions (A); medically inoperable T1 to T2b (5 cm or less) N0 lung cancer in a favourable position, SABR 54 Gy in 3, 55 Gy in 5 or 60 Gy in 8 (each B); glioblastoma, IDH wildtype, with good performance status, under 70 and minimal residual tumour, 60 Gy in 30 with or without temozolomide (A); initial treatment of pain from bone metastases 8 Gy single dose (A); spinal cord compression in non-ambulant patients, or ambulant patients with a prognosis under 6 months, 8 Gy single dose (A), and 20 Gy in 5 or 30 Gy in 10 for ambulant patients with a good prognosis or after spinal surgery (B).\n\nASTRO differs in places (abstracts read): its 2018 whole-breast guideline names 40 Gy in 15 or 42.5 Gy in 16 as the preferred schedule and its abstract does not mention 26 Gy in 5; its 2024 bone metastasis guideline recommends 8 Gy in 1, 20 Gy in 5, 24 Gy in 6 or 30 Gy in 10 for conventional radiotherapy, and conditionally recommends SBRT over conventional palliative radiotherapy for selected patients with good performance status without surgery or neurological symptoms or signs; its October 2026 prostate guideline recommends moderate hypofractionation over conventional fractionation across all risk groups and ultrahypofractionation as a standard option for low and intermediate risk.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "multidisciplinary-team"],
    where: ["radiotherapy-department", "outpatient-clinic"],
  },
  population: "Adults having external beam radiotherapy in the UK, for the indications the RCR lists. Brachytherapy, children's schedules beyond the RCR paediatric chapter, technique and target volumes are outside this reference. The schedules are a prescribing reference for clinical oncologists, not advice for an individual patient.",
  trigger: "A clinical oncologist prescribing a course of external beam radiotherapy.",
  steps: [
    {
      action: "Write as complete a prescription as possible: patient identity, diagnosis, site and side, prescriber, intent, date, modality, volumes, dose and fractionation, normal tissue constraints, overall time, technique and associated treatment requirements (for example chemotherapy, cardiac implantable devices and prostheses)",
      why: "The prescription is the legal record of the treatment, and providers frequently use it as evidence that the treatment was justified.",
      source: "rcr-dose-fx-2024",
      quote: "The legal record of the radiotherapy treatment to be delivered is the radiotherapy treatment prescription.",
      grade: "ungraded (introduction)",
    },
    {
      action: "For adjuvant whole breast or chest wall radiotherapy without nodes and without immediate reconstruction, prescribe 26 Gy in 5 fractions over 1 week",
      why: "Since the UK FAST-Forward trial was published in 2020, UK practice has moved from 40 Gy in 15 fractions over three weeks to one week as the standard of care.",
      source: "rcr-dose-fx-2024",
      quote: "For adjuvant radiotherapy of non-nodal breast or chest wall without immediate reconstruction: • 26 Gy in 5 fractions over 1 week (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For regional nodal irradiation in breast cancer, prescribe 40 Gy in 15 fractions over 3 weeks",
      why: "Two trials support three weeks for the lymph node areas; a UK study of a one-week schedule for the nodes had not reported its definitive five-year results when the RCR wrote.",
      source: "rcr-dose-fx-2024",
      quote: "For regional nodal irradiation: • 40 Gy in 15 fractions over 3 weeks (Grade B)",
      grade: "Grade B",
    },
    {
      action: "For radiotherapy to the prostate only, prescribe 60 Gy in 20 fractions over 4 weeks; the RCR also lists stereotactic radiotherapy of 36.25 Gy in 5 fractions",
      why: "Randomised trials in over 8,000 patients suggest that moderately shortened schedules give similar cancer outcomes, and the RCR calls 60 Gy in 20 fractions the currently recommended UK schedule.",
      source: "rcr-dose-fx-2024",
      quote: "Prostate-only RT: • 60 Gy in 20 fractions over 4 weeks (Grade A)",
      grade: "Grade A (60 Gy in 20); Grade A (36.25 Gy in 5)",
    },
    {
      action: "For radical bladder radiotherapy, prescribe 55 Gy in 20 fractions over 4 weeks as the regimen of choice",
      why: "The RCR names four weeks as its regimen of choice on its highest grade of evidence; it lists 64 Gy in 32 fractions over 6.5 weeks as the other schedule (Grade B).",
      source: "rcr-dose-fx-2024",
      quote: "For radical radiotherapy to the bladder: • 55 Gy in 20 fractions over 4 weeks is the regimen of choice (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For short-course preoperative rectal radiotherapy, prescribe 25 Gy in 5 daily fractions, followed by surgery within a week or delayed surgery",
      why: "One week of radiotherapy before surgery lowered the chance of the cancer returning in the pelvis in randomised trials. The RCR also notes that it increases long-term side effects, especially on continence.",
      source: "rcr-dose-fx-2024",
      quote: "Short-course preoperative radiotherapy: • 25 Gy in 5 daily fractions (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For medically inoperable lung cancer (T1 to T2b, 5 cm or less, N0) in a favourable anatomical position, prescribe SABR using 54 Gy in 3 fractions over 5 to 8 days, 55 Gy in 5 fractions over 10 to 14 days, or 60 Gy in 8 fractions over 10 to 20 days",
      why: "The RCR reports strong evidence for SABR in people with stage I lung cancer and a high surgical risk. It lists three schedules on the same grade and does not rank them.",
      source: "rcr-dose-fx-2024",
      quote: "SABR using: • 54 Gy in 3 fractions over 5–8 days (Grade B) • 55 Gy in 5 fractions over 10–14 days (Grade B) • 60 Gy in 8 fractions over 10–20 days (Grade B)",
      grade: "Grade B",
    },
    {
      action: "For glioblastoma (IDH wildtype) in people under 70 with good performance status (KPS 80 to 100) and minimal residual tumour, prescribe 60 Gy in 30 daily fractions over 6 weeks, with or without temozolomide",
      why: "Trials of higher doses found no survival gain above 60 Gy in 2 Gy fractions, and adding temozolomide to this schedule improved survival in tumours with MGMT methylation.",
      source: "rcr-dose-fx-2024",
      quote: "Good performance status (KPS 80–100) and aged <70 with minimal residual tumour: • 60 Gy in 30 daily fractions over 6 weeks ± temozolomide (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For the initial treatment of pain from bone metastases, prescribe a single dose of 8 Gy",
      why: "Large randomised trials and their meta-analyses support a single dose. After a single dose, around 25% of patients may need retreatment at some point.",
      source: "rcr-dose-fx-2024",
      quote: "For the initial treatment of pain from bone metastases: • 8 Gy single dose (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For spinal cord compression in people who cannot walk, or who can walk but have a prognosis under 6 months, prescribe 8 Gy single dose; for those who can walk with a good prognosis, or after spinal surgery, 20 Gy in 5 daily fractions over 1 week or 30 Gy in 10 daily fractions over 2 weeks",
      why: "A review of 14 studies found similar survival and function after short and longer courses, with better local control after longer ones, so people who can walk and have a better outlook may benefit from a longer course.",
      source: "rcr-dose-fx-2024",
      quote: "Metastatic spinal cord compression: non-ambulant patients or ambulant patients with a prognosis <6 months: • 8 Gy single dose (Grade A)",
      grade: "Grade A (single dose); Grade B (20 Gy in 5 or 30 Gy in 10)",
    },
    {
      action: "Do not read a schedule's inclusion in the RCR reference as a commissioning decision",
      why: "The RCR says the reference informs oncologists of evidence-based schedules, and that being listed does not mean the health service in a given UK nation has commissioned the schedule.",
      source: "rcr-dose-fx-page",
      quote: "However, inclusion in this guidance does not imply that a particular treatment or schedule is commissioned by the national health services in the four UK nations.",
      grade: "ungraded",
    },
  ],
  bestInClass: {
    statement: "For UK practice, the RCR fourth edition (January 2024) is the graded reference, and its publication page names no later edition. It gives Grade A schedules for the commonest indications (26 Gy in 5 for non-nodal breast, 60 Gy in 20 for prostate, 55 Gy in 20 for bladder, 25 Gy in 5 short-course rectal, 60 Gy in 30 for glioblastoma in fit people under 70, 8 Gy single dose for the initial treatment of pain from bone metastases and for cord compression in non-ambulant patients or ambulant patients with a prognosis under 6 months). Where the US guideline differs, both are shown: ASTRO (2018) names 40 Gy in 15 or 42.5 Gy in 16 as the preferred whole-breast schedule, and was published before the FAST-Forward results (2020) on which the RCR's one-week schedule rests; ASTRO (2024) recommends 8 Gy in 1, 20 Gy in 5, 24 Gy in 6 or 30 Gy in 10 for symptomatic bone metastases treated with conventional radiotherapy, and conditionally recommends SBRT over conventional palliative radiotherapy for selected patients, where the RCR names 8 Gy single dose; ASTRO (October 2026) recommends moderate hypofractionation for localized prostate cancer across risk groups and ultrahypofractionation as a standard option at low and intermediate risk, and the RCR likewise recommends a moderately hypofractionated schedule (60 Gy in 20) and lists stereotactic radiotherapy of 36.25 Gy in 5.",
    sources: ["rcr-dose-fx-2024", "rcr-dose-fx-page", "astro-breast-2018", "astro-bone-2024", "astro-prostate-2026"],
  },
  variants: [
    {
      name: "ASTRO whole-breast guideline (2018)",
      differs: "For women with invasive breast cancer having whole breast irradiation with or without the low axilla, the preferred schedule is 40 Gy in 15 fractions or 42.5 Gy in 16 fractions (printed as 4000 cGy and 4250 cGy). Its abstract does not mention 26 Gy in 5.",
      evidence: "Systematic review and graded consensus (abstract read). Published in 2018, before the FAST-Forward trial that the RCR dates to 2020 and on which its one-week schedule rests.",
      sources: ["astro-breast-2018", "rcr-dose-fx-2024"],
    },
    {
      name: "ASTRO palliative bone metastasis guideline (2024)",
      differs: "Recommends 8 Gy in 1, 20 Gy in 5, 24 Gy in 6 or 30 Gy in 10 for symptomatic bone metastases treated with conventional radiotherapy (printed in cGy); for cord or cauda equina compression in people ineligible for surgery and having conventional radiotherapy, 8 Gy in 1, 16 Gy in 2, 20 Gy in 5 or 30 Gy in 10; conditionally recommends SBRT over conventional palliative radiotherapy for selected patients with good performance status without surgery or neurological symptoms or signs; surgery then radiotherapy conditionally over radiotherapy alone for cord or cauda equina compression.",
      evidence: "Based on an AHRQ systematic review with graded consensus (abstract read). The abstract lists the schedules without ranking them.",
      sources: ["astro-bone-2024"],
    },
    {
      name: "ASTRO prostate hypofractionation guideline (October 2026)",
      differs: "Recommends moderate hypofractionation over conventional fractionation across all risk groups, and ultrahypofractionation as a standard option for low- and intermediate-risk disease; it may be considered in selected high-risk patients, preferably in clinical trials. Moderate hypofractionation may be preferred over ultrahypofractionation with significant baseline urinary dysfunction.",
      evidence: "Systematic review with graded consensus; the abstract cites high-quality randomised data for moderate hypofractionation (abstract read). The schedules it lists were not read.",
      sources: ["astro-prostate-2026"],
    },
    {
      name: "NICE on spinal cord compression, as the RCR reports it",
      differs: "The RCR notes that the updated NICE guidelines recommend a single dose of 8 Gy for all patients, with consideration of SBRT if the patient has 3 or fewer metastases. The RCR itself keeps 20 Gy in 5 or 30 Gy in 10 (Grade B) for ambulant patients with a good prognosis or after spinal surgery.",
      evidence: "Stated in the RCR's cord compression chapter. The NICE guideline was not re-read for this page; the cord compression protocol covers it.",
      sources: ["rcr-dose-fx-2024"],
    },
  ],
  grades: [
    { claim: "Non-nodal breast or chest wall without immediate reconstruction: 26 Gy in 5 fractions", grade: "Grade A", source: "rcr-dose-fx-2024" },
    { claim: "Partial breast external beam: 26 Gy in 5 fractions", grade: "Grade A", source: "rcr-dose-fx-2024", quote: "For partial breast radiotherapy using external beam radiotherapy: • 26 Gy in 5 fractions over 1 week (Grade A)" },
    { claim: "Prostate only: 60 Gy in 20 fractions", grade: "Grade A", source: "rcr-dose-fx-2024" },
    { claim: "Prostate stereotactic radiotherapy: 36.25 Gy in 5 fractions", grade: "Grade A", source: "rcr-dose-fx-2024", quote: "Stereotactic radiotherapy (SBRT): • 36.25 Gy in 5 fractions (Grade A)" },
    { claim: "Radical bladder, the other listed schedule: 64 Gy in 32 fractions over 6.5 weeks", grade: "Grade B", source: "rcr-dose-fx-2024", quote: "• 64 Gy in 32 fractions over 6.5 weeks (Grade B)" },
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
      gradingScheme: "Oxford Centre for Evidence-Based Medicine (2009): levels 1a to 5; grades A (consistent level 1 studies), B (consistent level 2 or 3, or extrapolations from level 1), C (level 4, or extrapolations from level 2 or 3), D (level 5, or troublingly inconsistent or inconclusive studies of any level).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "rcr-dose-fx-page",
      label: "Radiotherapy dose fractionation, Fourth edition (publication page)",
      publisher: "The Royal College of Radiologists",
      year: 2024,
      url: "https://www.rcr.ac.uk/our-services/all-our-publications/clinical-oncology-publications/radiotherapy-dose-fractionation-fourth-edition/",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
  ],
  cancers: ["breast-cancer", "prostate", "urothelial", "rectal-cancer", "nsclc", "glioblastoma"],
  technologies: ["sbrt"],
  terms: ["hypofractionation", "bone-metastases", "metastatic-spinal-cord-compression"],
  institutions: ["astro"],
  related: ["prostate-radiotherapy-bladder-and-rectal-preparation", "breast-radiotherapy-positioning-and-setup", "metastatic-spinal-cord-compression-emergency"],
  upgrades: ["idea-pu-five-fraction-breast-default", "idea-pu-prostate-hypofractionation-default", "idea-acc-single-fraction-palliative-radiotherapy-default"],
  gaps: [
    "Only a selection of the RCR's schedules is shown as steps; the reference has 22 chapters and many more indications, including head and neck, gynaecological, lymphoma, paediatric, skin and oligometastatic disease. Where the RCR lists several schedules for one indication, the step names them, but the boost, nodal, postoperative and palliative schedules in the same chapters are not shown.",
    "The ASTRO guidelines were read as abstracts. On 17 November 2026 their full texts in Practical Radiation Oncology (and so their grades and the full lists of schedules) could still not be read: the publisher's site answers a script with a browser check and Europe PMC lists no open copy.",
    "The ASTRO whole-breast guideline (2018) predates the FAST-Forward trial; on 17 November 2026 no newer ASTRO whole-breast guideline was found in Europe PMC. A separate ASTRO guideline on partial breast irradiation (2024) exists and was not read.",
    "The RCR and NICE differ on cord compression: the RCR reports that NICE recommends a single 8 Gy dose for all patients, and itself recommends longer courses for ambulant patients with a good prognosis or after surgery. Only the RCR's account of NICE was read for this page.",
    "ESTRO and ESMO site-specific fractionation recommendations were not compared here.",
    "The RCR reference did not consider brachytherapy and does not cover technique or target volumes.",
  ],
});
