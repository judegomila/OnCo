import { protocol } from "./helpers";

/*
 * Radiation precautions at home after permanent (low-dose-rate) seed brachytherapy for prostate cancer, with
 * iodine-125 or palladium-103 seeds.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - IAEA Specific Safety Guide SSG-46 (2018): full text, PDF read with pdftotext, paras 5.257 to 5.261 and 5.287 to
 *   5.289 (release of patients with permanent implants, expelled seeds, later surgery, death and cremation).
 * - ICRP Publication 98, Radiation safety aspects of brachytherapy for prostate cancer using permanently implanted
 *   sources (2005): abstract only, from the ICRP publication page; the SAGE full text returned HTTP 403 to a script.
 * - Dauer et al., Less-restrictive, patient-specific radiation safety precautions can be safely prescribed after
 *   permanent seed implantation (Brachytherapy 2010; 1,279 patients at Memorial Sloan Kettering): full text, the NIH
 *   author manuscript on PMC (PMC3819139).
 * - US Nuclear Regulatory Commission, 10 CFR 35.75: full text from eCFR.
 * - Prostate Cancer UK, Permanent seed brachytherapy (updated September 2026, due for review September 2029): the
 *   public web page, read as text, for the advice UK patients are given.
 * - Not read: the ACR-ABS-ASTRO practice parameter for transperineal permanent brachytherapy (2022; the ACR address
 *   served a JavaScript shell and the journal version was not reached); the American Brachytherapy Society consensus
 *   guidelines (2012) and GEC-ESTRO ACROP prostate brachytherapy guideline (2022) were read as abstracts and do not
 *   address home precautions, so they are not cited.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text.
 */
export const permanentProstateSeedBrachytherapyHomeRadiationSafety = protocol({
  id: "permanent-prostate-seed-brachytherapy-home-radiation-safety",
  name: "Radiation precautions at home after permanent prostate seed brachytherapy",
  aka: ["prostate seed implant precautions", "LDR brachytherapy precautions", "iodine-125 seeds at home", "palladium-103 seeds precautions", "after seed brachytherapy", "seed implant and children", "seed implant and pregnancy", "passing a seed", "seed brachytherapy cremation"],
  domain: "radiotherapy",
  tldr: "The seeds stay in the prostate and give off most of their radiation in the first few months, almost all of it absorbed inside you. You can be around other people normally. For about two months, avoid having children on your lap for long and avoid long close contact with anyone pregnant, use a condom for the first few ejaculations in case a seed comes out, and carry the card you are given.",
  simple: "It is safe to be around other people. For about two months, do not hold children on your lap for long and do not sit close to a pregnant woman for hours. Use a condom the first few times you ejaculate. Carry your seed card, and tell any surgeon you have seeds.",
  summary: "Release follows the same framework as other radioactive treatments: before discharge the physicist or radiation protection officer confirms that doses to others will stay within public limits and carer constraints, with assumptions matching the written instructions (IAEA SSG-46 5.258; in the US no other person likely to exceed 5 mSv, 10 CFR 35.75). ICRP 98 found that in the vast majority of cases the dose to carers stays well below 1 mSv a year, and that only a partner who is pregnant at the time of implantation may need specific precautions. Measured dose rates from 1,279 patients (Dauer 2010) found no precautions needed for a typical palladium-103 patient, and for a typical iodine-125 patient only avoiding sleeping in contact with a pregnant partner and long periods holding a child on the lap, for about two months; Prostate Cancer UK gives the same two months, with 50 cm from children beyond a few minutes a day and from pregnant women beyond three hours.\n\nWritten instructions also cover a seed coming out (rare; most likely in the first month) and what to do (SSG-46 5.260; ICRP 98); UK patients are told to use a condom for the first five ejaculations and not to pick up a seed passed in urine but to flush it away. A wallet card carries the implant details for later pelvic or abdominal surgery, for radiation security monitors and in case of death (SSG-46 5.261; ICRP 98). Cremation is the one point where sources differ widely: ICRP 98 allows it once 12 months have passed after iodine-125 (3 months after palladium-103), while Prostate Cancer UK says cremation is not possible in the first 20 months and to carry the card for at least 20 months. ICRP 98 notes that fathering a child remains possible after an implant.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "home"],
  },
  population: "Men with prostate cancer who have had permanent low-dose-rate seed brachytherapy with iodine-125 or palladium-103 seeds, alone or as a boost, and the people they live with. Caesium-131 seeds, temporary high-dose-rate brachytherapy and seed implants elsewhere in the body are not covered. The day counts are typical values; centres may set them from a dose-rate measurement on the patient.",
  trigger: "A permanent prostate seed implant has been placed and the patient is about to go home.",
  steps: [
    {
      action: "Before the patient leaves, have the physicist or radiation protection officer confirm that doses to the public and to carers will stay within limits, using assumptions that match the written instructions",
      why: "The precautions given only need to be as strict as the measured activity requires.",
      source: "iaea-ssg46",
      quote: "In the case of carers and comforters, the assumptions made for the calculations should be consistent with the written instructions that will be given at the time the patient is discharged from the facility.",
    },
    {
      action: "Give the patient written instructions on keeping doses to others low, with particular attention to children and a pregnant partner",
      why: "Children and unborn babies are the most sensitive to radiation; for adults the dose is very small.",
      source: "iaea-ssg46",
      quote: "Individuals of particular concern are children and pregnant partners of patients.",
    },
    {
      action: "Reassure the patient that being around other people is safe, and that a partner who is pregnant at the time of the implant is the case that may need specific precautions",
      why: "Measured doses to the people around a patient with seeds are well below the yearly public limit.",
      source: "icrp-98",
      quote: "The available data show that, in the vast majority of cases, the dose to comforters and carers remains well below the recommended limit of 1 mSv/year. Only the (rare) case where the patient's partner is pregnant at the time of implantation may need specific precautions.",
    },
    {
      action: "With iodine-125 seeds, for about two months avoid sleeping pressed against a pregnant partner and avoid holding children on the lap for long periods; with palladium-103 seeds a typical patient needs no precautions",
      why: "Palladium-103 decays faster and gives a lower dose rate; for iodine-125 only long, very close contact matters.",
      source: "dauer-2010",
      quote: "For the typical Pd-103 patient, no radiation-safety precautions are required.",
    },
    {
      action: "Include in the instructions what to do if a seed comes out",
      why: "Seeds occasionally come out in urine or semen, most often in the first month; a single seed is low in activity but should be handled properly.",
      source: "iaea-ssg46",
      quote: "There is a low probability of an implanted seed being expelled, for example with prostate treatment. The written instructions should cover this possibility and should provide guidance on what to do and what not to do.",
    },
    {
      action: "Give the patient a wallet card with the implant details, and tell them to inform any surgeon before later pelvic or abdominal surgery",
      why: "A surgeon needs to know about the seeds, and the card explains a radiation detector alarm at an airport.",
      source: "iaea-ssg46",
      quote: "The patient with permanent brachytherapy implants should be informed that, if he or she is to undergo subsequent surgery, the surgeon should be informed of the presence of the implants; for example, a prostate cancer patient undergoing subsequent pelvic or abdominal surgery.",
    },
    {
      action: "Tell the patient and family how death and cremation are handled in the first months after an implant, and that the card is needed then",
      why: "Ashes may hold radioactivity if cremation happens soon after the implant, so it may need to wait.",
      source: "icrp-98",
      quote: "Review of available data shows that cremation can be allowed if 12 months have elapsed since implantation with I-125 (3 months for Pd-103).",
    },
    {
      action: "Explain that the implant reduces fertility but that fathering a child is still possible",
      why: "Men who do not want a child need to know contraception still matters.",
      source: "icrp-98",
      quote: "However, although the therapy-related modifications of the semen reduce fertility, patients must be aware of the possibility of fathering children after such a permanent implantation, with a limited risk of genetic effects for the child.",
    },
  ],
  bestInClass: {
    statement: "Release after a physicist's check that doses to others stay within public limits and carer constraints, with written instructions focused on children and a pregnant partner, advice on a seed being expelled, and a wallet card for later surgery, security monitors and death (IAEA SSG-46 2018; ICRP 98 2005; 10 CFR 35.75). Measured dose rates support short, light precautions: none for a typical palladium-103 patient and about two months of avoiding long close contact with children and pregnant women for iodine-125 (Dauer 2010; Prostate Cancer UK 2026). The sources disagree on cremation: ICRP 98 allows it 12 months after iodine-125 and 3 months after palladium-103; UK patient information says not within 20 months. None of the sources grades its advice.",
    sources: ["iaea-ssg46", "icrp-98", "dauer-2010", "nrc-10cfr35-75", "pcuk-seeds"],
  },
  variants: [
    {
      name: "UK patient advice (Prostate Cancer UK, 2026)",
      differs: "For the first two months: no closer than 50 cm to children for more than a few minutes a day (a quick cuddle is fine, not on the lap), not this close to pregnant women for more than three hours, and no pets on the lap. Avoid sex for a few days, use a condom for the first five ejaculations and double-wrap used condoms in the bin. A seed passed in urine at home is flushed away, not picked up. No cremation within 20 months; carry the card for at least 20 months.",
      evidence: "Patient information reviewed by a consultant clinical scientist; it gives no evidence grades. The 20-month cremation interval is longer than the ICRP's 12 months for iodine-125, and the page does not say why.",
      sources: ["pcuk-seeds"],
    },
    {
      name: "Patient-specific precautions from a dose-rate measurement",
      differs: "The dose rate at 30 cm from the skin is measured after the implant and put into an equation that gives the precaution time for each situation (pregnant partner, children on the lap), keeping doses to others below half the public limits. Most patients then need far shorter precautions than a fixed rule; a rare iodine-125 patient at the highest measured rate would need much longer ones.",
      evidence: "Measurements from 1,279 patients at one US centre; the authors found the resulting precaution times significantly less restrictive than those generally prescribed, which they report as 1 to 3 months for palladium-103 and 2 to 6 months for iodine-125.",
      sources: ["dauer-2010"],
    },
  ],
  grades: [
    { claim: "Release with written instructions; children and pregnant partners of particular concern", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "As indicated in para. 5.258, the patient or the legal guardian of the patient should be provided with written instructions on how to keep doses to members of the public and carers and comforters as low as reasonably achievable." },
    { claim: "Systematic dose monitoring of family members is not necessary after permanent prostate implants", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "Published data suggest that systematic dose monitoring, at least in the case of permanent brachytherapy implanted sources for the treatment of prostate cancer, is not necessary" },
    { claim: "A wallet card with the implant details", grade: "Consensus (ungraded)", source: "icrp-98", quote: "A 'wallet card' with all relevant information about the implant is useful." },
    { claim: "Release where no other individual is likely to exceed 5 mSv (US), which covers implants as well as unsealed sources", grade: "Regulatory requirement (ungraded)", source: "nrc-10cfr35-75", quote: "A licensee may authorize the release from its control of any individual who has been administered unsealed byproduct material or implants containing byproduct material if the total effective dose equivalent to any other individual from exposure to the released individual is not likely to exceed 5 mSv (0.5 rem)." },
  ],
  sources: [
    {
      key: "iaea-ssg46",
      label: "Radiation Protection and Safety in Medical Uses of Ionizing Radiation, Specific Safety Guide No. SSG-46 (release of patients after permanent brachytherapy implants)",
      publisher: "International Atomic Energy Agency, jointly sponsored by PAHO and WHO",
      year: 2018,
      url: "https://www-pub.iaea.org/MTCD/Publications/PDF/PUB1775_web.pdf",
      gradingScheme: "An IAEA Safety Guide: recommendations ('should'); not graded by evidence.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "icrp-98",
      label: "ICRP Publication 98: Radiation Safety Aspects of Brachytherapy for Prostate Cancer using Permanently Implanted Sources",
      publisher: "International Commission on Radiological Protection (Annals of the ICRP 35(3))",
      year: 2005,
      url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%2098",
      gradingScheme: "ICRP recommendations; not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "dauer-2010",
      label: "Less-restrictive, patient-specific radiation safety precautions can be safely prescribed after permanent seed implantation",
      publisher: "Dauer et al., Brachytherapy (NIH author manuscript PMC3819139)",
      year: 2010,
      url: "https://doi.org/10.1016/j.brachy.2009.06.006",
      doi: "10.1016/j.brachy.2009.06.006",
      gradingScheme: "Single-centre measurement study; not a guideline.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nrc-10cfr35-75",
      label: "10 CFR 35.75 Release of individuals containing unsealed byproduct material or implants containing byproduct material",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2007,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-C/section-35.75",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "pcuk-seeds",
      label: "Permanent seed brachytherapy (patient information, updated September 2026)",
      publisher: "Prostate Cancer UK",
      year: 2026,
      url: "https://prostatecanceruk.org/prostate-information-and-support/treatments/permanent-seed-brachytherapy",
      gradingScheme: "Patient information; not graded.",
      read: "public-summary",
      accessed: "2026-11-11",
    },
    {
      key: "acr-abs-astro-ldr-2022",
      label: "ACR-ABS-ASTRO Practice Parameter for Transperineal Permanent Brachytherapy of Prostate Cancer",
      publisher: "American College of Radiology, American Brachytherapy Society and ASTRO (American Journal of Clinical Oncology)",
      year: 2022,
      url: "https://doi.org/10.1097/coc.0000000000000915",
      doi: "10.1097/coc.0000000000000915",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["ldr-seed-brachytherapy", "brachytherapy"],
  terms: ["brachytherapy-term"],
  cancers: ["prostate"],
  institutions: ["prostate-cancer-uk"],
  related: ["radionuclide-therapy-patient-release-criteria", "prostate-radiotherapy-bladder-and-rectal-preparation"],
  upgrades: [],
  gaps: [
    "ICRP 98 was read only as its abstract; its sample information sheet, which SSG-46 points to for detail, was not read.",
    "The condom advice (first five ejaculations) and the instruction to flush a seed passed in urine come from UK patient information; no guideline text read states either, and the number of ejaculations is not explained.",
    "The sources disagree on cremation (12 months for iodine-125 in ICRP 98, 20 months in UK patient information), and the reason for the UK figure was not found.",
    "The ACR-ABS-ASTRO practice parameter (2022), the most recent US professional standard for the procedure, could not be read.",
    "The measurement study behind the patient-specific precautions is from one centre, with patients treated from 1995 to 2008.",
  ],
});
