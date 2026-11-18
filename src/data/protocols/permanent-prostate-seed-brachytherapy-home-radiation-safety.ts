import { protocol } from "./helpers";

/*
 * Radiation precautions at home after permanent (low-dose-rate) seed brachytherapy for prostate cancer, with
 * iodine-125 or palladium-103 seeds.
 *
 * What was read, and how (first on 11 November 2026; every source re-fetched or re-read as raw text in the second
 * accuracy pass on 17 November 2026, and every quote checked against the saved text by script):
 * - IAEA Specific Safety Guide SSG-46 (2018): full text, PDF read with pdftotext, paras 5.257 to 5.262 and 5.287 to
 *   5.289 (release of patients with permanent implants, expelled seeds, later surgery, death and cremation). On
 *   17 November the copy another checker of this pass had saved from the IAEA that day was re-used.
 * - ICRP Publication 98, Radiation safety aspects of brachytherapy for prostate cancer using permanently implanted
 *   sources (2005): abstract only, from the ICRP publication page (and the same abstract on Europe PMC); the SAGE
 *   full text returned HTTP 403 to a script again on 17 November. The erratum printed in Publication 99 was read: it
 *   adds an omitted name and changes no figure.
 * - Dauer et al., Less-restrictive, patient-specific radiation safety precautions can be safely prescribed after
 *   permanent seed implantation (Brachytherapy 2010; 1,279 patients at Memorial Sloan Kettering): full text, the NIH
 *   author manuscript on PMC (PMC3819139), on 17 November through the NCBI E-utilities API. Table cells run
 *   together in that text, so figures are taken from the prose only.
 * - US Nuclear Regulatory Commission, 10 CFR 35.75: full text from eCFR (17 November: the copy another checker of
 *   this pass had saved from eCFR that day).
 * - Prostate Cancer UK, Permanent seed brachytherapy (updated September 2026, due for review September 2029): the
 *   public web page, fetched with curl and read as text, for the advice UK patients are given.
 * - Not read: the ACR-ABS-ASTRO practice parameter for transperineal permanent brachytherapy (2022; on 17 November
 *   the DOI led to the publisher's abstract page only); the UK guidance on radiation protection after iodine-125
 *   seed brachytherapy (2012) that Prostate Cancer UK lists as a reference (its address at IPEM returned 404). The
 *   American Brachytherapy Society consensus guidelines (2012) and GEC-ESTRO ACROP prostate brachytherapy guideline
 *   (2022) were read as abstracts on 11 November and do not address home precautions, so they are not cited.
 *
 * The second pass corrected: most (not almost all) of the radiation is absorbed in and around the prostate; the UK
 * figures (two months, five ejaculations, 20 months) are now named as UK patient advice rather than written as
 * universal; a wallet card is "useful" in the sources, not an order; and reasons no source read states (airport
 * alarms, palladium decaying faster, contraception) were replaced with what the sources say.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text.
 */
export const permanentProstateSeedBrachytherapyHomeRadiationSafety = protocol({
  id: "permanent-prostate-seed-brachytherapy-home-radiation-safety",
  name: "Radiation precautions at home after permanent prostate seed brachytherapy",
  aka: ["prostate seed implant precautions", "LDR brachytherapy precautions", "iodine-125 seeds at home", "palladium-103 seeds precautions", "after seed brachytherapy", "seed implant and children", "seed implant and pregnancy", "passing a seed", "seed brachytherapy cremation"],
  domain: "radiotherapy",
  tldr: "The seeds stay in the prostate and release most of their radiation in the first three months; most of it is absorbed by the prostate and nearby tissue. It is safe to be around other people. UK patient advice for the first two months: no children or pets on your lap and no long close contact with pregnant women. Use a condom for the first five ejaculations and carry your advice card.",
  simple: "It is safe to be around other people. For about two months, do not have children on your lap and do not sit close to a pregnant woman for hours. UK advice is to use a condom the first five times you ejaculate. Carry your seed card, and tell any surgeon you have seeds. Your own hospital's instructions come first.",
  summary: "Release follows the same framework as other radioactive treatments: before discharge the medical physicist or radiation protection officer should establish that doses to members of the public would not exceed the dose limits and would be unlikely to exceed the dose constraints for the public and for carers, with assumptions matching the written instructions (IAEA SSG-46 5.258). In the US, release is allowed where no other person is likely to receive more than 5 mSv, and written instructions are required where another person is likely to receive more than 1 mSv (10 CFR 35.75). The ICRP 98 abstract says that in the vast majority of cases the dose to carers stays well below 1 mSv a year, and that only the rare case of a partner who is pregnant at the time of implantation may need specific precautions. Measurements on 1,279 patients at one US centre (Dauer 2010) found no precautions needed for a typical palladium-103 patient, and that a typical iodine-125 patient should only need to avoid sleeping in contact with a pregnant partner and holding a child on the lap for long periods, for about 2 months (84 and 42 days at the median measured rate). Prostate Cancer UK, which does not name the isotope, gives UK patients two months: no closer than 50 cm to children for more than a few minutes a day, or to pregnant women for more than three hours.\n\nWritten instructions should also cover a seed being expelled and what to do (SSG-46 5.260). ICRP 98 calls expulsion rare; Prostate Cancer UK says it is most likely in the first month, and tells UK patients to use a condom for the first five ejaculations and, at home, not to pick up a seed passed in urine but to flush it away. The patient should be told to inform the surgeon before later pelvic or abdominal surgery, and both SSG-46 and ICRP 98 call a wallet card with the implant details useful, including for security radiation monitors (SSG-46 5.261; ICRP 98). Cremation is the one point where the sources read differ widely: ICRP 98 says it can be allowed once 12 months have passed after iodine-125 (3 months after palladium-103) and that specific measures must be taken if the patient dies sooner, while Prostate Cancer UK says cremation is not possible in the first 20 months and to carry the card for at least 20 months. ICRP 98 says patients must be aware that fathering a child remains possible after an implant.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "home"],
  },
  population: "Men with prostate cancer who have had permanent low-dose-rate seed brachytherapy with iodine-125 or palladium-103 seeds, alone or as a boost, and the people they live with. Caesium-131 seeds, temporary high-dose-rate brachytherapy and seed implants elsewhere in the body are not covered. The day counts are one UK charity's patient advice and one US centre's typical values; a centre may set its own, for example from a dose-rate measurement on the patient.",
  trigger: "A permanent prostate seed implant has been placed and the patient is about to go home.",
  steps: [
    {
      action: "Before the patient leaves, have the medical physicist or radiation protection officer establish that doses to the public would not exceed the dose limits and would be unlikely to exceed the dose constraints for the public and for carers, using assumptions that match the written instructions",
      why: "The calculation assumes the patient will follow the instructions he is given, so the two have to say the same thing.",
      source: "iaea-ssg46",
      quote: "In the case of carers and comforters, the assumptions made for the calculations should be consistent with the written instructions that will be given at the time the patient is discharged from the facility.",
    },
    {
      action: "Give the patient written instructions on keeping doses to others low, with particular attention to children and a pregnant partner",
      why: "The guide names children and pregnant partners as the people of particular concern; UK patient information says these groups are more sensitive to radiation and that the risk is still very low.",
      source: "iaea-ssg46",
      quote: "Individuals of particular concern are children and pregnant partners of patients.",
    },
    {
      action: "Explain that the dose to the people around the patient is, in the vast majority of cases, well below the public limit, and that a partner who is pregnant at the time of the implant is the case that may need specific precautions",
      why: "Doses to the people around patients with seeds have been measured or calculated, and in the vast majority of cases stay well below 1 mSv a year.",
      source: "icrp-98",
      quote: "The available data show that, in the vast majority of cases, the dose to comforters and carers remains well below the recommended limit of 1 mSv/year. Only the (rare) case where the patient's partner is pregnant at the time of implantation may need specific precautions.",
    },
    {
      action: "Where precautions are set from measurements, expect a typical iodine-125 patient to need only to avoid sleeping in contact with a pregnant partner and holding a child on the lap for long periods, for about 2 months, and a typical palladium-103 patient to need none; follow the centre's own periods where they differ",
      why: "In one US centre's measurements the dose rate 30 cm from palladium-103 patients was lower than from iodine-125 patients, and for a typical iodine-125 patient only long, very close contact with a pregnant woman or a child needed a precaution.",
      source: "dauer-2010",
      quote: "For the typical Pd-103 patient, no radiation-safety precautions are required.",
    },
    {
      action: "Include in the instructions what to do if a seed comes out",
      why: "ICRP 98 says a seed coming out in urine, semen or through the bowel is rare, that a single seed is low in activity, and that no incident linked to a lost seed has been recorded. UK patient information says it is most likely in the first month.",
      source: "iaea-ssg46",
      quote: "There is a low probability of an implanted seed being expelled, for example with prostate treatment. The written instructions should cover this possibility and should provide guidance on what to do and what not to do.",
    },
    {
      action: "Tell the patient to inform the surgeon before any later surgery, such as pelvic or abdominal surgery; a wallet card with the implant details is useful",
      why: "A surgeon needs to know the seeds are there. ICRP 98 adds that the seeds can trigger certain types of security radiation monitors, and that the card may help then.",
      source: "iaea-ssg46",
      quote: "The patient with permanent brachytherapy implants should be informed that, if he or she is to undergo subsequent surgery, the surgeon should be informed of the presence of the implants; for example, a prostate cancer patient undergoing subsequent pelvic or abdominal surgery.",
    },
    {
      action: "Allow for a waiting period before cremation if the patient dies after an implant: ICRP 98 gives 12 months after iodine-125 and 3 months after palladium-103, with specific measures if death comes sooner; UK patient information says 20 months",
      why: "In the first months some activity remains in the ashes, and crematorium staff or the public could breathe in a dose from the air.",
      source: "icrp-98",
      quote: "Review of available data shows that cremation can be allowed if 12 months have elapsed since implantation with I-125 (3 months for Pd-103).",
    },
    {
      action: "Explain that the implant reduces fertility but that fathering a child is still possible",
      why: "ICRP 98 says patients must be aware of this, and describes the risk of genetic effects for the child as limited.",
      source: "icrp-98",
      quote: "However, although the therapy-related modifications of the semen reduce fertility, patients must be aware of the possibility of fathering children after such a permanent implantation, with a limited risk of genetic effects for the child.",
    },
  ],
  bestInClass: {
    statement: "Release after a physicist's or radiation protection officer's check that doses to others stay within public limits and are unlikely to exceed the dose constraints, with written instructions that give particular attention to children and a pregnant partner and cover a seed being expelled, advice to tell the surgeon before later surgery, and a wallet card, which the sources call useful (IAEA SSG-46 2018; ICRP 98 2005; in the US, 10 CFR 35.75). Measured dose rates from one US centre support short, light precautions: none for a typical palladium-103 patient and about 2 months of avoiding long, very close contact with children and a pregnant partner for iodine-125 (Dauer 2010); UK patient information also gives two months (Prostate Cancer UK 2026). The sources disagree on cremation: ICRP 98 allows it 12 months after iodine-125 and 3 months after palladium-103; UK patient information says not within 20 months. None of the sources grades its advice.",
    sources: ["iaea-ssg46", "icrp-98", "dauer-2010", "nrc-10cfr35-75", "pcuk-seeds"],
  },
  variants: [
    {
      name: "UK patient advice (Prostate Cancer UK, 2026)",
      differs: "For the first two months: no closer than 50 cm to children for more than a few minutes a day (a quick cuddle is fine, not on the lap), not this close to pregnant women for more than three hours, and no pets on the lap. Avoid sex for a few days, use a condom for the first five ejaculations and double-wrap used condoms in the bin. A seed passed in urine at home is flushed away, not picked up; in hospital it is left where it is and staff are told. Tell the doctor, nurse or radiographer if a seed may have been passed. No cremation within 20 months; carry the advice card for at least 20 months, especially when travelling. The page does not name the isotope.",
      evidence: "Patient information reviewed by a consultant clinical scientist, a clinical oncologist, a urologist and a nurse specialist; it gives no evidence grades. The 20-month cremation interval is longer than the ICRP's 12 months for iodine-125, and the page does not say why.",
      sources: ["pcuk-seeds"],
    },
    {
      name: "Patient-specific precautions from a dose-rate measurement",
      differs: "The dose rate at 30 cm from the skin is measured after the implant and put into an equation that gives the precaution time for each situation (pregnant partner, children on the lap), keeping the dose to each person below half the limit the authors set for that situation. At the median measured rate an iodine-125 patient avoids sleeping in contact with a pregnant partner for 84 days and holding children on the lap for long periods (the paper's example is more than 1 to 3 hours) for 42 days. At the highest rate measured, which the authors call exceedingly rare, the same precautions run to 253 and 211 days.",
      evidence: "Measurements from 1,279 patients at one US centre (the 30 cm reading was taken in 1,018 of them); the authors found the resulting precaution times significantly less restrictive than those generally prescribed, which they report as 1 to 3 months for palladium-103 and 2 to 6 months for iodine-125. It is a single study, not a guideline.",
      sources: ["dauer-2010"],
    },
  ],
  grades: [
    { claim: "Release with written instructions; children and pregnant partners of particular concern", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "As indicated in para. 5.258, the patient or the legal guardian of the patient should be provided with written instructions on how to keep doses to members of the public and carers and comforters as low as reasonably achievable." },
    { claim: "Systematic dose monitoring of family members is not necessary after permanent prostate implants", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "Published data suggest that systematic dose monitoring, at least in the case of permanent brachytherapy implanted sources for the treatment of prostate cancer, is not necessary" },
    { claim: "A wallet card with the implant details", grade: "ICRP recommendation (ungraded)", source: "icrp-98", quote: "A 'wallet card' with all relevant information about the implant is useful." },
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
      accessed: "2026-11-17",
    },
    {
      key: "icrp-98",
      label: "ICRP Publication 98: Radiation Safety Aspects of Brachytherapy for Prostate Cancer using Permanently Implanted Sources",
      publisher: "International Commission on Radiological Protection (Annals of the ICRP 35(3))",
      year: 2005,
      url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%2098",
      gradingScheme: "ICRP recommendations; not graded.",
      read: "abstract",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "nrc-10cfr35-75",
      label: "10 CFR 35.75 Release of individuals containing unsealed byproduct material or implants containing byproduct material",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2007,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-C/section-35.75",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "pcuk-seeds",
      label: "Permanent seed brachytherapy (patient information, updated September 2026)",
      publisher: "Prostate Cancer UK",
      year: 2026,
      url: "https://prostatecanceruk.org/prostate-information-and-support/treatments/permanent-seed-brachytherapy",
      gradingScheme: "Patient information; not graded.",
      read: "public-summary",
      accessed: "2026-11-17",
    },
    {
      key: "acr-abs-astro-ldr-2022",
      label: "ACR-ABS-ASTRO Practice Parameter for Transperineal Permanent Brachytherapy of Prostate Cancer",
      publisher: "American College of Radiology, American Brachytherapy Society and ASTRO (American Journal of Clinical Oncology)",
      year: 2022,
      url: "https://doi.org/10.1097/coc.0000000000000915",
      doi: "10.1097/coc.0000000000000915",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["ldr-seed-brachytherapy", "brachytherapy"],
  terms: ["brachytherapy-term"],
  cancers: ["prostate"],
  institutions: ["prostate-cancer-uk"],
  related: ["radionuclide-therapy-patient-release-criteria", "prostate-radiotherapy-bladder-and-rectal-preparation"],
  upgrades: [],
  gaps: [
    "ICRP 98 was read only as its abstract; on 17 November 2026 the full text again returned HTTP 403 to a script. Its sample information sheet, which SSG-46 points to for detail, and its reasoning for the 12-month and 3-month cremation intervals were not read. No later ICRP publication replacing it was found on the ICRP page.",
    "The two-month contact periods, the 50 cm distance, the condom advice (first five ejaculations) and the instruction to flush a seed passed in urine come from UK patient information; no guideline text read states any of them, and the number of ejaculations is not explained. The UK guidance on radiation protection after iodine-125 seed brachytherapy (2012) that Prostate Cancer UK lists as a reference could not be read on 17 November 2026 (its address returned 404).",
    "The sources disagree on cremation (12 months for iodine-125 in ICRP 98, 20 months in UK patient information), and the reason for the UK figure was not found.",
    "The ACR-ABS-ASTRO practice parameter (2022), the most recent US professional standard for the procedure, could not be read: on 17 November 2026 its DOI led to the publisher's abstract page only. Nothing on this page rests on it.",
    "10 CFR 35.75 sets the US release limit but no list of precautions; the measurement study notes that the instructions are left to the facility. On 11 August 2026 the NRC published for comment a draft guide (DG-8070), a proposed Revision 2 of Regulatory Guide 8.39 on the release of patients, which covers implants; it was not final when this page was checked on 17 November 2026.",
    "The measurement study behind the patient-specific precautions is from one centre, with patients treated from 1995 to 2008. Its abstract gives about 2 months for both iodine-125 precautions; its conclusion gives about 2 months for a pregnant partner and about 1.5 months for children on the lap.",
  ],
});
