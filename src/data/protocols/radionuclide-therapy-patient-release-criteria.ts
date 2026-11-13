import { protocol } from "./helpers";

/*
 * Deciding when a patient who has had radionuclide therapy (unsealed radiopharmaceuticals such as iodine-131,
 * lutetium-177 or radium-223) or a permanent radioactive implant may leave hospital, and what has to be given and
 * recorded when they do. This is the staff-side decision; what patients do at home is in the protocols for each
 * treatment (radioiodine, lutetium-177, permanent prostate seeds).
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - IAEA Specific Safety Guide SSG-46 (2018): full text, PDF read with pdftotext: paras 2.46 to 2.51 (dose
 *   constraints for carers and comforters, release criteria), 4.235 to 4.248 (nuclear medicine) and 5.257 to 5.261
 *   and 5.287 to 5.289 (permanent brachytherapy implants).
 * - IAEA Safety Reports Series No. 63, Release of Patients After Radionuclide Therapy (2009): full text, PDF.
 * - ICRP Publication 94 (2004): abstract only, from the ICRP publication page; the SAGE full text returned HTTP 403.
 * - US Nuclear Regulatory Commission, 10 CFR 35.75 (release), 35.2075 (records of release), 35.310 (safety
 *   instruction) and 35.315 (safety precautions for patients who cannot be released): full text from eCFR.
 * - The Ionising Radiation (Medical Exposure) Regulations 2017, regulation 12, latest revised text: full text from
 *   legislation.gov.uk.
 * - Chipiga et al., Harmonization of practice of release of patients after radiopharmaceutical therapy (Journal of
 *   Radiological Protection 2025): abstract, through Europe PMC.
 * - Not read: NUREG-1556 Volume 9 and NRC Regulatory Guide 8.39 (nrc.gov returned HTTP 403 to a script); the EU
 *   Basic Safety Standards Directive 2013/59/Euratom and European Commission Radiation Protection 97; UK Ionising
 *   Radiations Regulations 2017 and the Medical and Dental Guidance Notes.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text
 * with line breaks joined.
 */
export const radionuclideTherapyPatientReleaseCriteria = protocol({
  id: "radionuclide-therapy-patient-release-criteria",
  name: "Release of patients after radionuclide therapy or a permanent implant: criteria, instructions and records",
  aka: ["patient release criteria", "discharge after radionuclide therapy", "release after radioiodine", "release after Lutathera", "release after Pluvicto", "10 CFR 35.75", "dose constraints for carers and comforters", "retained activity limit", "radioactive patient discharge", "release of patients with permanent implants"],
  domain: "radiotherapy",
  tldr: "After some treatments with radioactive medicines or seeds, you give off a little radiation for a while. Before you go home, the team checks that the people around you will receive only a small, safe dose, taking your home and family into account, and gives you written instructions. If that is not yet possible you stay in a single room until it is.",
  simple: "Before you leave after a radioactive treatment, the team checks it is safe for the people you live with and gives you written instructions. Tell them about babies, children or anyone pregnant at home.",
  summary: "Release is governed by dose to other people. Members of the public are subject to the public dose limit (1 mSv a year); family and friends who knowingly help are carers and comforters, whose exposure is controlled by a dose constraint, commonly 5 mSv per episode for an adult and 1 mSv for children and for the embryo or fetus of a pregnant carer, with more lenient values possible for elderly people (IAEA SSG-46 para 2.49). Before release, the medical physicist or radiation protection officer establishes that retained activity is low enough to stay within those limits and constraints, for example by integrating the measured dose rate over the activity, energy and effective half-life, taking into account the patient's living conditions, children and pregnant women at home, excreta and incontinence; the assumptions must match the written instructions given (SSG-46 4.247, 5.258). Carers must have received and understood information on radiation risks before they provide care (GSR Part 3 para 3.153, quoted in SSG-46). Written instructions go to the patient or guardian (SSG-46 4.248; UK IR(ME)R 2017 reg 12(6) and (7), before leaving).\n\nThe US rule allows release when no other individual is likely to receive more than 5 mSv, requires written instructions when anyone could receive more than 1 mSv, and requires breastfeeding guidance when a nursing infant could exceed 1 mSv (10 CFR 35.75); the basis for release must be recorded when it uses retained activity, an occupancy factor below 0.25 at 1 m, an effective half-life or tissue shielding, and kept for 3 years (35.2075). A patient who cannot be released is kept in a private room with a private toilet, the door posted, visitor time noted and items leaving the room surveyed or treated as radioactive waste (35.315), by staff given annual radiation safety instruction (35.310). Many countries also use a retained-activity limit for iodine-131 (most EU member states 400 to 600 MBq; Germany 250 MBq; Japan 500 MBq or under 30 microsieverts an hour at 1 m) (IAEA SRS-63). The IAEA and ICRP advise that the decision is individual and that dose limits and constraints, not secondary limits such as retained activity, should drive it; SSG-46 notes that systematic dose monitoring of family members is not necessary. Permanent implants follow the same framework (SSG-46 5.257 to 5.261), with a wallet card and advice about seed expulsion, later surgery and death.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team"],
    where: ["ward", "outpatient-clinic"],
  },
  population: "Patients of any age treated with unsealed radiopharmaceuticals (iodine-131 for thyroid disease, lutetium-177 PSMA or dotatate, iodine-131 MIBG, radium-223 and others) or given permanent radioactive implants (iodine-125 or palladium-103 seeds), and the members of the public, family members and carers around them. Medical physicists or radiation protection officers usually make the calculation; the treating physician (in the UK the IR(ME)R practitioner, in the US the authorised user) is responsible for the release. What the patient does at home is covered by the protocol for each treatment.",
  trigger: "A therapeutic radiopharmaceutical has been given, or a permanent radioactive implant placed, and the patient is ready to leave the department or the ward.",
  steps: [
    {
      action: "Use the national dose limits and dose constraints: the public dose limit for members of the public, and a constraint per episode for carers and comforters (commonly 5 mSv for an adult, 1 mSv for a child or for the fetus of a pregnant carer)",
      why: "These limits keep the dose to the people around the patient small, while letting family help and comfort them.",
      source: "iaea-ssg46",
      quote: "For an adult carer or comforter, a value of dose constraint commonly used is 5 mSv effective dose per episode.",
    },
    {
      action: "Base the decision on the dose others could receive, decided for this patient, rather than on retained activity alone",
      why: "Fixed retained-activity limits rest on worst-case models and can keep people in hospital who could safely go home.",
      source: "iaea-srs63",
      quote: "The control arrangements should focus on the dose limits or dose constraints that are generally applied, rather than on secondary limits, such as retained activity.",
    },
    {
      action: "Before release, have the medical physicist or radiation protection officer establish that the retained activity keeps doses to others within limits and constraints",
      why: "A qualified person checks the numbers for each patient before they leave.",
      source: "iaea-ssg46",
      quote: "The medical physicist or RPO at the nuclear medicine facility should establish prior to the release of a patient that the retained radioactivity in the patient is such that the doses that could be received by members of the public would not exceed public dose limits, and would be unlikely to exceed the relevant dose constraints for both members of the public and carers and comforters.",
    },
    {
      action: "Estimate the dose from the measured dose rate integrated over time, using the activity, energy and effective half-life of the radionuclide",
      why: "A measurement on the patient, decayed forward, gives a realistic estimate rather than a worst case.",
      source: "iaea-ssg46",
      quote: "An acceptable method of estimating the acceptable retained activity for patients being discharged from hospitals is to calculate the time integral of the ambient dose equivalent rate, considering the activity, energy and effective half-life of the radionuclides.",
    },
    {
      action: "Take account of the patient's home: whether they can keep apart from children and pregnant women, how excreta will be managed, and incontinence",
      why: "The same treatment is safe to go home with in one household and not yet in another.",
      source: "iaea-ssg46",
      quote: "Special consideration should be given to incontinent patients.",
    },
    {
      action: "Make sure carers have been told about the radiation risks and how to limit them, and have understood, before they provide care",
      why: "A carer's exposure is accepted because they choose to help knowing what it involves.",
      source: "iaea-ssg46",
      quote: "Registrants and licensees shall ensure that no individual incurs a medical exposure as a carer or comforter unless he or she has received, and has indicated an understanding of, relevant information on radiation protection and information on the radiation risks prior to providing care and comfort to an individual undergoing a radiological procedure.",
    },
    {
      action: "Give the patient, or their parent, guardian or representative, written instructions on keeping others' doses low and on the risks, before they leave, consistent with the assumptions used in the calculation",
      why: "The calculation only holds if the patient knows and follows the precautions it assumed.",
      source: "irmer-2017-reg12",
      quote: "In the case of patients undergoing treatment or diagnosis with radioactive substances, the employer’s procedures must provide that, where appropriate, written instructions and information are provided to—",
    },
    {
      action: "If the patient is breastfeeding and the infant could receive more than 1 mSv, include guidance on interrupting or stopping breastfeeding and what happens if it is not followed (US rule)",
      why: "Some radioactive medicines pass into breast milk.",
      source: "nrc-10cfr35-75",
      quote: "If the total effective dose equivalent to a nursing infant or child could exceed 1 mSv (0.1 rem) assuming there were no interruption of breast-feeding, the instructions must also include—",
    },
    {
      action: "Record the basis for release where it used retained activity, an occupancy factor below 0.25 at one metre, an effective half-life or tissue shielding, and keep the record (US: 3 years)",
      why: "A record shows how the decision was made if it is questioned later.",
      source: "nrc-10cfr35-2075",
      quote: "The records required by paragraphs (a) and (b) of this section must be retained for 3 years after the date of release of the individual.",
    },
    {
      action: "If the patient cannot yet be released, keep them in a private room with its own toilet, post the door, note how long visitors may stay, and survey items leaving the room or treat them as radioactive waste",
      why: "This protects other patients, visitors and staff until the activity falls.",
      source: "nrc-10cfr35-315",
      quote: "A private room with a private sanitary facility; or",
    },
    {
      action: "Give staff who care for patients who cannot be released radiation safety instruction when they start and at least yearly, and tell the radiation safety officer at once if such a patient has a medical emergency or dies",
      why: "Nurses need to know how to care for the patient safely, and an emergency or death needs specific precautions.",
      source: "nrc-10cfr35-310",
      quote: "A licensee shall provide radiation safety instruction, initially and at least annually, to personnel caring for patients or human research subjects who cannot be released under § 35.75.",
    },
    {
      action: "Give the patient a card with the treatment details and the department's contact, to show if admitted elsewhere or if they die soon after treatment",
      why: "Staff elsewhere, or funeral directors, need to know what was given and whom to call.",
      source: "iaea-srs63",
      quote: "To facilitate this, the patient should be given a small card with details of their treatment and contact details for a radiation protection specialist/medical physicist associated with the department responsible for the therapy",
    },
  ],
  bestInClass: {
    statement: "An individual decision based on the dose others could receive, using dose limits for the public and dose constraints for carers (commonly 5 mSv per episode for adults and 1 mSv for children and for the fetus of a pregnant carer), estimated by a physicist from measured dose rates and the patient's home circumstances, with written instructions consistent with that estimate, given before the patient leaves (IAEA SSG-46 2018; IAEA SRS-63 2009; ICRP 94; 10 CFR 35.75; IR(ME)R 2017 reg 12). The IAEA and ICRP favour the dose approach over retained-activity limits and say that where they conflict the dose approach is the more fundamental; many European countries still apply retained-activity limits in law, and a patient there is bound by them. None of these sources grades its recommendations.",
    sources: ["iaea-ssg46", "iaea-srs63", "icrp-94", "nrc-10cfr35-75", "irmer-2017-reg12"],
  },
  variants: [
    {
      name: "Retained-activity limits (many European and Asian countries)",
      differs: "A patient stays until the activity left in the body is below a set value. For iodine-131: most EU member states 400 to 600 MBq (range about 95 to 800), Germany 250 MBq (3.5 microsieverts an hour at 1 m) in table 10 but 75 MBq in table 9 of the same report, Japan 500 MBq or under 30 microsieverts an hour at 1 m, Sweden 600, Finland 800, Australia 600, the former IAEA guidance level 1,100 MBq (SRS-63 tables 9 and 10). EU recommendations then set how long instructions apply by dose rate at release, from 24 hours under 3 microsieverts an hour at 1 m to 3 weeks under 40 (table 11).",
      evidence: "SRS-63 reports that some retained-activity models are unduly conservative, overstate doses and lead to unnecessary hospital stays.",
      sources: ["iaea-srs63"],
    },
    {
      name: "United States: 5 mSv to any other individual",
      differs: "Release is allowed when no other person is likely to exceed 5 mSv, with written instructions above 1 mSv; NUREG-1556 Volume 9 gives default activity tables and methods for patient-specific calculation. This allows considerably higher activities to be released than retained-activity limits do.",
      evidence: "SRS-63 reports that competent and cooperative US patients are routinely discharged with up to 8 or 9 GBq of iodine-131, and that this has produced some previously unreported practices that need to be kept under review. NUREG-1556 itself could not be read.",
      sources: ["nrc-10cfr35-75", "iaea-srs63"],
    },
    {
      name: "A 1 mSv constraint per administration and a stay of 4 to 6 hours",
      differs: "A 2025 modelling study comparing release approaches for lutetium-177 PSMA and dotatate, iodine-131, iodine-131 MIBG and samarium-153 recommends a dose constraint of 1 mSv per administration for people in contact with the patient, and keeping patients in the department for at least 4 to 6 hours, because exposure of other passengers on public transport should be considered.",
      evidence: "A single modelling study; abstract read only.",
      sources: ["chipiga-2025"],
    },
  ],
  grades: [
    { claim: "Release where no other individual is likely to exceed 5 mSv", grade: "Regulatory requirement (ungraded)", source: "nrc-10cfr35-75", quote: "A licensee may authorize the release from its control of any individual who has been administered unsealed byproduct material or implants containing byproduct material if the total effective dose equivalent to any other individual from exposure to the released individual is not likely to exceed 5 mSv (0.5 rem)." },
    { claim: "Written instructions when another individual could exceed 1 mSv", grade: "Regulatory requirement (ungraded)", source: "nrc-10cfr35-75", quote: "A licensee shall provide the released individual, or the individual's parent or guardian, with instructions, including written instructions, on actions recommended to maintain doses to other individuals as low as is reasonably achievable if the total effective dose equivalent to any other individual is likely to exceed 1 mSv (0.1 rem)." },
    { claim: "Children as carers, and the fetus of a pregnant carer, constrained to 1 mSv per episode", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "The same approach of constraining the effective dose to the embryo or fetus to 1 mSv per episode is often taken." },
    { claim: "Decide hospital stay or release on an individual basis", grade: "Consensus (ungraded)", source: "icrp-94", quote: "The decision to hospitalise or release a patient should be determined on an individual basis." },
    { claim: "Young children, infants and visitors not giving care treated as members of the public", grade: "Consensus (ungraded)", source: "icrp-94", quote: "The present report recommends that young children and infants, as well as visitors not engaged in direct care or comforting, should be treated as members of the public (i.e. be subject to the public dose limit)." },
    { claim: "Systematic dose monitoring of others is not necessary", grade: "Safety Guide recommendation (ungraded)", source: "iaea-ssg46", quote: "Published data suggest that systematic dose monitoring is not necessary" },
  ],
  sources: [
    {
      key: "iaea-ssg46",
      label: "Radiation Protection and Safety in Medical Uses of Ionizing Radiation, Specific Safety Guide No. SSG-46",
      publisher: "International Atomic Energy Agency, jointly sponsored by PAHO and WHO",
      year: 2018,
      url: "https://www-pub.iaea.org/MTCD/Publications/PDF/PUB1775_web.pdf",
      gradingScheme: "An IAEA Safety Guide: recommendations ('should') on meeting the Safety Requirements (GSR Part 3, whose requirements it quotes as 'shall'); not graded by evidence.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "iaea-srs63",
      label: "Release of Patients After Radionuclide Therapy, Safety Reports Series No. 63 (with contributions from the ICRP)",
      publisher: "International Atomic Energy Agency",
      year: 2009,
      url: "https://www-pub.iaea.org/MTCD/Publications/PDF/pub1417_web.pdf",
      gradingScheme: "A safety report built on measured and modelled doses and on ICRP, EU and national guidance; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "icrp-94",
      label: "ICRP Publication 94: Release of Patients after Therapy with Unsealed Radionuclides",
      publisher: "International Commission on Radiological Protection (Annals of the ICRP 34(2))",
      year: 2004,
      url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%2094",
      doi: "10.1016/j.icrp.2004.08.001",
      gradingScheme: "ICRP recommendations; not graded.",
      read: "abstract",
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
      key: "nrc-10cfr35-2075",
      label: "10 CFR 35.2075 Records of the release of individuals containing unsealed byproduct material or implants containing byproduct material",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2005,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-L/section-35.2075",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nrc-10cfr35-315",
      label: "10 CFR 35.315 Safety precautions (patients who cannot be released)",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2003,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-E/section-35.315",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nrc-10cfr35-310",
      label: "10 CFR 35.310 Safety instruction (staff caring for patients who cannot be released)",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2003,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-E/section-35.310",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "irmer-2017-reg12",
      label: "The Ionising Radiation (Medical Exposure) Regulations 2017, regulation 12 (optimisation), latest revised text",
      publisher: "UK legislation (legislation.gov.uk)",
      year: 2017,
      url: "https://www.legislation.gov.uk/uksi/2017/1322/regulation/12",
      gradingScheme: "Statutory instrument; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "chipiga-2025",
      label: "Harmonization of practice of release of patients after radiopharmaceutical therapy",
      publisher: "Chipiga et al., Journal of Radiological Protection",
      year: 2025,
      url: "https://doi.org/10.1088/1361-6498/adba70",
      doi: "10.1088/1361-6498/adba70",
      gradingScheme: "Modelling study; not a guideline.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "nrc-nureg-1556-v9",
      label: "NUREG-1556 Volume 9, Program-Specific Guidance About Medical Use Licenses (patient release methods and default tables)",
      publisher: "US Nuclear Regulatory Commission",
      year: 2019,
      url: "https://www.nrc.gov/reading-rm/doc-collections/nuregs/staff/sr1556/",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["radioactive-iodine", "pluvicto", "lutathera", "radium-223"],
  technologies: ["radioiodine-therapy", "lu177-radioligand-therapy", "radioligand-therapy", "mibg-theranostics", "ldr-seed-brachytherapy"],
  terms: ["radioiodine-term"],
  institutions: ["iaea"],
  related: ["radioiodine-therapy-home-radiation-safety", "lutetium-177-therapy-home-radiation-safety", "permanent-prostate-seed-brachytherapy-home-radiation-safety"],
  upgrades: [],
  gaps: [
    "No source read grades these requirements; they are safety standards, consensus and regulation built on measured and modelled doses.",
    "NUREG-1556 Volume 9 and NRC Regulatory Guide 8.39, which give the US default release tables and calculation methods, could not be read: nrc.gov returned HTTP 403 to a script. The US activity thresholds are therefore not reproduced here.",
    "The EU Basic Safety Standards Directive (2013/59/Euratom), European Commission Radiation Protection 97, the UK Ionising Radiations Regulations 2017 and the UK Medical and Dental Guidance Notes were not read; the European retained-activity figures come from the 2009 IAEA tables and may have changed.",
    "ICRP Publication 94 was read only as its abstract. ICRP and IAEA guidance on release predates the wide use of lutetium-177 therapies; SRS-63 itself says there is a lack of good data on which to base advice for most radionuclides other than iodine-131.",
    "The IAEA tables disagree with each other for Germany (250 MBq in table 10, 75 MBq in table 9); the current German limit was not checked against German law.",
    "SRS-63 reports a lack of audit data on how patients behave after early release and on its consequences.",
  ],
});
