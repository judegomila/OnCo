import { protocol } from "./helpers";

/*
 * Deciding when a patient who has had radionuclide therapy (unsealed radiopharmaceuticals such as iodine-131 or
 * lutetium-177) or a permanent radioactive implant may leave hospital, and what has to be given and
 * recorded when they do. This is the staff-side decision; what patients do at home is in the protocols for each
 * treatment (radioiodine, lutetium-177, permanent prostate seeds).
 *
 * What was read, and how. First written 11 November 2026. Second accuracy pass on 17 November 2026: every source
 * below was fetched again raw and read as text, every quote was checked verbatim by script, and each claim was
 * re-read against its passage.
 * - IAEA Specific Safety Guide SSG-46 (2018): full text, PDF read with pdftotext: Box 1 (dose limits), paras 2.46
 *   to 2.51, 4.237, 4.238, 4.246 to 4.248, 5.257 to 5.262 and 5.287 to 5.289. The IAEA catalogue page returned
 *   HTTP 403, so whether a later edition exists could not be checked there.
 * - IAEA Safety Reports Series No. 63 (2009): full text, PDF read with pdftotext (section 3.3, tables 9 to 11,
 *   sections 4.4, 5 and 6).
 * - ICRP Publication 94 (2004) and ICRP Publication 140 (2019): abstracts (and for 140 the key points) from the
 *   ICRP publication pages; the full texts were not read.
 * - 10 CFR 35.75, 35.2075, 35.310 and 35.315: full text from the eCFR versioner (title 10 current to 12 November
 *   2026), with the part 35 source note for the dates.
 * - Two NRC proposed rules, 91 FR 43456 (15 July 2026) and 91 FR 47042 (27 July 2026), and the notices on
 *   Regulatory Guide 8.39 (85 FR 19514, 91 FR 51749): full text from federalregister.gov.
 * - The Ionising Radiation (Medical Exposure) Regulations 2017, regulation 12, latest revised text (amended
 *   1 October 2024; extent England, Wales and Scotland): XML from legislation.gov.uk.
 * - Chipiga et al. (Journal of Radiological Protection 2025): abstract, through Europe PMC; DOI resolved through
 *   Crossref.
 * - Not read: NUREG-1556 Volume 9 and NRC Regulatory Guide 8.39 themselves (nrc.gov returned HTTP 403 to a
 *   script); the EU Basic Safety Standards Directive 2013/59/Euratom and European Commission Radiation Protection
 *   97; the UK Ionising Radiations Regulations 2017 and the Medical and Dental Guidance Notes.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text
 * with line breaks joined.
 */
export const radionuclideTherapyPatientReleaseCriteria = protocol({
  id: "radionuclide-therapy-patient-release-criteria",
  name: "Release of patients after radionuclide therapy or a permanent implant: criteria, instructions and records",
  aka: ["patient release criteria", "discharge after radionuclide therapy", "release after radioiodine", "release after Lutathera", "release after Pluvicto", "10 CFR 35.75", "dose constraints for carers and comforters", "retained activity limit", "radioactive patient discharge", "release of patients with permanent implants"],
  domain: "radiotherapy",
  tldr: "After some treatments with radioactive medicines or seeds, you give off a little radiation for a while. Before you go home, the team checks that the people around you will receive a dose within set limits, taking your home and family into account, and gives you written instructions. If that is not yet possible you stay in hospital until it is.",
  simple: "Before you leave after a radioactive treatment, the team checks it is safe for the people you live with and gives you written instructions. Tell them about babies, children or anyone pregnant at home.",
  summary: "Release is governed by dose to other people. Members of the public are subject to the public dose limit (an effective dose of 1 mSv in a year); family and friends who knowingly help are carers and comforters, whose exposure is controlled by a dose constraint for each episode. IAEA SSG-46 (para 2.49) says a value commonly used for an adult is 5 mSv per episode, that children in this role and the embryo or fetus of a pregnant carer are often constrained to 1 mSv per episode, and that more lenient constraints may be used for elderly people. Before release, the medical physicist or radiation protection officer should establish that retained activity is low enough to stay within those limits and constraints; an acceptable method is to calculate the time integral of the ambient dose equivalent rate, considering the activity, energy and effective half-life. The patient's living conditions, children and pregnant women at home, excreta and incontinence should be considered, and the assumptions should be consistent with the written instructions given (SSG-46 4.247, 5.258). Carers must have received, and shown they understood, information on radiation protection and risks before they provide care (GSR Part 3 para 3.153, quoted in SSG-46). Written instructions should go to the patient or legal guardian (SSG-46 4.248); in England, Wales and Scotland the employer's procedures must provide for them, where appropriate, before the patient leaves (IR(ME)R 2017 reg 12(6) and (7)).\n\nThe US rule allows release when no other individual is likely to receive more than 5 mSv, requires instructions, including written ones, when anyone is likely to receive more than 1 mSv, and requires breastfeeding guidance when a nursing infant or child could exceed 1 mSv (10 CFR 35.75); the basis for release must be recorded when it uses retained activity, an occupancy factor below 0.25 at 1 m, a biological or effective half-life or tissue shielding, and kept for 3 years (35.2075). A patient who cannot be released is kept in a private room with a private toilet, or shares with another such patient, with the room posted, visitor time noted and items leaving the room monitored or treated as radioactive waste (35.315), by staff given radiation safety instruction at the start and at least yearly (35.310). Two NRC proposed rules of July 2026 would change these US requirements; the regulation text read on 17 November 2026 was unchanged (see the variants). Many countries also use a retained-activity limit for iodine-131 (most EU member states 400 to 600 MBq; Germany 250 MBq; Japan 500 MBq or under 30 microsieverts an hour at 1 m; IAEA SRS-63, figures from 2009). SRS-63 and ICRP Publication 94 advise that the decision is individual and that control should focus on dose limits and constraints, not secondary limits such as retained activity; SSG-46 says published data suggest systematic dose monitoring is not necessary. Permanent implants follow the same framework (SSG-46 5.257 to 5.261): written instructions should cover an expelled seed, the patient should be told that a surgeon needs to know about the implants before later surgery, a wallet card is described as useful, and precautions may be required after death (5.289).",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team"],
    where: ["ward", "outpatient-clinic"],
  },
  population: "Patients of any age treated with unsealed radiopharmaceuticals (iodine-131 for thyroid disease, lutetium-177 PSMA or dotatate, iodine-131 MIBG and others) or given permanent radioactive implants (such as iodine-125 seeds), and the members of the public, family members and carers around them. IAEA guidance gives the calculation to the medical physicist or radiation protection officer; under the US rule it is the licensee that authorises release, and in England, Wales and Scotland the employer's procedures must provide for the written instructions. What the patient does at home is covered by the protocol for each treatment.",
  trigger: "A therapeutic radiopharmaceutical has been given, or a permanent radioactive implant placed, and the patient is ready to leave the department or the ward.",
  steps: [
    {
      action: "Use the national dose limits and dose constraints: the public dose limit for members of the public, and a constraint per episode for carers and comforters (commonly 5 mSv for an adult; often 1 mSv for a child, or for the embryo or fetus of a pregnant carer)",
      why: "These limits keep the dose to the people around the patient small, while letting family help and comfort them.",
      source: "iaea-ssg46",
      quote: "For an adult carer or comforter, a value of dose constraint commonly used is 5 mSv effective dose per episode.",
    },
    {
      action: "Base the decision on the dose others could receive, decided for this patient, rather than on retained activity alone",
      why: "The report says some of the models used to estimate retained activity are unduly cautious, may overstate the dose to others and so lead to unnecessary stays in hospital.",
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
      action: "Estimate the acceptable retained activity by calculating the time integral of the ambient dose equivalent rate, considering the activity, energy and effective half-life of the radionuclide",
      why: "The guide names this as an acceptable method; it adds up the dose others could receive over the time the radioactivity lasts.",
      source: "iaea-ssg46",
      quote: "An acceptable method of estimating the acceptable retained activity for patients being discharged from hospitals is to calculate the time integral of the ambient dose equivalent rate, considering the activity, energy and effective half-life of the radionuclides.",
    },
    {
      action: "Take account of the patient's living conditions: how far they can keep apart from other family members, children and pregnant women above all, how excreta will be managed, and incontinence",
      why: "How much radiation others receive depends on the home the patient goes back to, so the guide asks for it to be considered for each patient.",
      source: "iaea-ssg46",
      quote: "Special consideration should be given to incontinent patients.",
    },
    {
      action: "Make sure carers have been given information on radiation protection and on the radiation risks, and have shown they understand it, before they provide care",
      why: "A carer or comforter is someone who helps willingly and voluntarily, which means knowing what it involves.",
      source: "iaea-ssg46",
      quote: "Registrants and licensees shall ensure that no individual incurs a medical exposure as a carer or comforter unless he or she has received, and has indicated an understanding of, relevant information on radiation protection and information on the radiation risks prior to providing care and comfort to an individual undergoing a radiological procedure.",
    },
    {
      action: "Give the patient, or the parent or other person the regulation names, written instructions on restricting doses to the people in contact with them and on the risks of radiation, before they leave (law in England, Wales and Scotland, where appropriate; IAEA guidance also says written instructions should be given and should match the assumptions in the calculation)",
      why: "The estimate assumes certain precautions, so the instructions the patient takes home need to match them.",
      source: "irmer-2017-reg12",
      quote: "In the case of patients undergoing treatment or diagnosis with radioactive substances, the employer’s procedures must provide that, where appropriate, written instructions and information are provided to—",
    },
    {
      action: "If the patient is breastfeeding and the infant could receive more than 1 mSv, include guidance on interrupting or stopping breastfeeding and information on what could happen if it is not followed (US rule)",
      why: "The rule is there to keep the dose to a nursing infant or child low.",
      source: "nrc-10cfr35-75",
      quote: "If the total effective dose equivalent to a nursing infant or child could exceed 1 mSv (0.1 rem) assuming there were no interruption of breast-feeding, the instructions must also include—",
    },
    {
      action: "Record the basis for release where it used retained activity, an occupancy factor below 0.25 at one metre, a biological or effective half-life or tissue shielding, and keep the record for 3 years after release (US rule)",
      why: "The record shows how the decision was made when the calculation departed from the simplest assumptions.",
      source: "nrc-10cfr35-2075",
      quote: "The records required by paragraphs (a) and (b) of this section must be retained for 3 years after the date of release of the individual.",
    },
    {
      action: "If the patient cannot yet be released, keep them in a private room with its own toilet (or sharing only with another such patient), post the room with a radioactive materials sign, note on the door or chart where and how long visitors may stay, and monitor items leaving the room or treat them as radioactive waste (US rule)",
      why: "These precautions limit the radiation and contamination that reach other people while the patient stays in hospital.",
      source: "nrc-10cfr35-315",
      quote: "A private room with a private sanitary facility; or",
    },
    {
      action: "Give staff who care for patients who cannot be released radiation safety instruction when they start and at least yearly, including that the radiation safety officer and an authorised user are notified if such a patient has a medical emergency or dies (US rule; 10 CFR 35.315 requires that notice as soon as possible)",
      why: "The instruction has to cover control of the patient and of visitors, contamination, waste and whom to notify.",
      source: "nrc-10cfr35-310",
      quote: "A licensee shall provide radiation safety instruction, initially and at least annually, to personnel caring for patients or human research subjects who cannot be released under § 35.75.",
    },
    {
      action: "Give the patient a small card with the treatment details and a contact for the department, to be shown to medical staff in an emergency or on admission to hospital, and to guide handling of the body if the patient dies soon after treatment",
      why: "Other medical staff, or those caring for the body, need to know what was given and whom to call.",
      source: "iaea-srs63",
      quote: "To facilitate this, the patient should be given a small card with details of their treatment and contact details for a radiation protection specialist/medical physicist associated with the department responsible for the therapy",
    },
  ],
  bestInClass: {
    statement: "An individual decision based on the dose others could receive, using dose limits for the public and dose constraints for carers (SSG-46: commonly 5 mSv per episode for adults, often 1 mSv for children and for the embryo or fetus of a pregnant carer), established by a medical physicist or radiation protection officer with the patient's living conditions considered, and with written instructions consistent with that estimate (IAEA SSG-46 2018; IAEA SRS-63 2009; ICRP 94; 10 CFR 35.75; IR(ME)R 2017 reg 12, which requires the instructions before the patient leaves). ICRP Publication 140 (2019) likewise says the decision should rest on existing guidance and regulations and on the individual patient's situation. SRS-63 says control should focus on dose limits and constraints rather than retained activity, and reports the ICRP view that where the two conflict the dose approach is the more fundamental; it adds that national regulations may not mirror that priority. None of these sources grades its recommendations.",
    sources: ["iaea-ssg46", "iaea-srs63", "icrp-94", "icrp-140", "nrc-10cfr35-75", "irmer-2017-reg12"],
  },
  variants: [
    {
      name: "Retained-activity limits (EU member states, Japan and others)",
      differs: "A patient stays until the activity left in the body is below a set value. For iodine-131, as SRS-63 listed them in 2009: most EU member states 400 to 600 MBq (range 95 to 800), Germany 250 MBq (based on 3.5 microsieverts an hour at 1 m) in table 10 but 75 MBq in table 9 of the same report, Japan 500 MBq or under 30 microsieverts an hour at 1 m, Sweden 600, Finland 800, Australia 600, and a guidance level of 1,100 MBq in the International Basic Safety Standards of the time (SRS-63 tables 9 and 10). EU radioiodine recommendations set how long instructions must be followed by the dose rate at 1 m from the patient, from 24 hours after administration under 3 microsieverts an hour to 3 weeks under 40 (table 11).",
      evidence: "SRS-63 reports that some assumptions and models used to estimate retained activity are unduly conservative, may overstate doses and so lead to unnecessary hospital stays.",
      sources: ["iaea-srs63"],
    },
    {
      name: "United States: 5 mSv to any other individual",
      differs: "Release is allowed when no other person is likely to exceed 5 mSv, with written instructions when anyone is likely to exceed 1 mSv; the regulation points to NUREG-1556 Volume 9 for methods of calculating doses and tables of activities, and Regulatory Guide 8.39 (Revision 1, April 2020) is the NRC guide on release. SRS-63 notes that the US values substantially exceed the retained-activity limits used elsewhere. Two proposed rules would change this. One (91 FR 43456, 15 July 2026) would keep 5 mSv for other individuals but count it per administration regimen, let a consenting, instructed caregiver receive up to 50 mSv per regimen, and replace the record of each release with a written procedure. The other (91 FR 47042, 27 July 2026) would remove 10 CFR 35.315 and move the precautions for patients who cannot be released to a new section 35.76. A draft Revision 2 of Regulatory Guide 8.39 was put out for comment on 11 August 2026.",
      evidence: "SRS-63 reports that competent and cooperative US patients are routinely discharged with up to 8 or 9 GBq of iodine-131, and that this has resulted in some previously unreported practices among patients which need to be kept under review. NUREG-1556 and Regulatory Guide 8.39 themselves could not be read. The proposed rules are not law: the regulation text read on 17 November 2026 was unchanged.",
      sources: ["nrc-10cfr35-75", "iaea-srs63", "nrc-proposed-rule-2026-radiation-protection", "nrc-proposed-rule-2026-medical-use", "nrc-rg-8-39"],
    },
    {
      name: "A 1 mSv constraint per administration and a stay of 4 to 6 hours",
      differs: "A 2025 modelling study comparing release approaches for lutetium-177 PSMA and dotatate, iodine-131, iodine-131 MIBG and samarium-153 recommends a dose constraint of 1 mSv per administration for members of the public in contact with the patient, and keeping patients in the nuclear medicine department for at least 4 to 6 hours after administration. It concludes that the radiation safety of members of the public in transport should be considered when release criteria are set.",
      evidence: "A single modelling study; abstract read only.",
      sources: ["chipiga-2025"],
    },
  ],
  grades: [
    { claim: "Release where no other individual is likely to exceed 5 mSv", grade: "Regulatory requirement (ungraded)", source: "nrc-10cfr35-75", quote: "A licensee may authorize the release from its control of any individual who has been administered unsealed byproduct material or implants containing byproduct material if the total effective dose equivalent to any other individual from exposure to the released individual is not likely to exceed 5 mSv (0.5 rem)." },
    { claim: "Written instructions when another individual could exceed 1 mSv", grade: "Regulatory requirement (ungraded)", source: "nrc-10cfr35-75", quote: "A licensee shall provide the released individual, or the individual's parent or guardian, with instructions, including written instructions, on actions recommended to maintain doses to other individuals as low as is reasonably achievable if the total effective dose equivalent to any other individual is likely to exceed 1 mSv (0.1 rem)." },
    { claim: "Children as carers, and the embryo or fetus of a pregnant carer, often constrained to 1 mSv per episode", grade: "Safety Guide, describing a common approach (ungraded)", source: "iaea-ssg46", quote: "The same approach of constraining the effective dose to the embryo or fetus to 1 mSv per episode is often taken." },
    { claim: "Decide hospital stay or release on an individual basis", grade: "Consensus (ungraded)", source: "icrp-94", quote: "The decision to hospitalise or release a patient should be determined on an individual basis." },
    { claim: "Young children, infants and visitors not giving care treated as members of the public", grade: "Consensus (ungraded)", source: "icrp-94", quote: "The present report recommends that young children and infants, as well as visitors not engaged in direct care or comforting, should be treated as members of the public (i.e. be subject to the public dose limit)." },
    { claim: "Published data suggest systematic dose monitoring is not necessary", grade: "Safety Guide, reporting published data (ungraded)", source: "iaea-ssg46", quote: "Published data suggest that systematic dose monitoring is not necessary" },
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
      accessed: "2026-11-17",
    },
    {
      key: "iaea-srs63",
      label: "Release of Patients After Radionuclide Therapy, Safety Reports Series No. 63 (with contributions from the ICRP)",
      publisher: "International Atomic Energy Agency",
      year: 2009,
      url: "https://www-pub.iaea.org/MTCD/Publications/PDF/pub1417_web.pdf",
      gradingScheme: "A safety report built on measured and modelled doses and on ICRP, EU and national guidance; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      key: "nrc-10cfr35-2075",
      label: "10 CFR 35.2075 Records of the release of individuals containing unsealed byproduct material or implants containing byproduct material",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2002,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-L/section-35.2075",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nrc-10cfr35-315",
      label: "10 CFR 35.315 Safety precautions (patients who cannot be released)",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2003,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-E/section-35.315",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nrc-10cfr35-310",
      label: "10 CFR 35.310 Safety instruction (staff caring for patients who cannot be released)",
      publisher: "US Nuclear Regulatory Commission (Code of Federal Regulations, via eCFR)",
      year: 2003,
      url: "https://www.ecfr.gov/current/title-10/chapter-I/part-35/subpart-E/section-35.310",
      gradingScheme: "Federal regulation; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "irmer-2017-reg12",
      label: "The Ionising Radiation (Medical Exposure) Regulations 2017, regulation 12 (optimisation), latest revised text (amended 1 October 2024; extends to England, Wales and Scotland)",
      publisher: "UK legislation (legislation.gov.uk)",
      year: 2017,
      url: "https://www.legislation.gov.uk/uksi/2017/1322/regulation/12",
      gradingScheme: "Statutory instrument; requirements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "icrp-140",
      label: "ICRP Publication 140: Radiological Protection in Therapy with Radiopharmaceuticals",
      publisher: "International Commission on Radiological Protection (Annals of the ICRP 48(1))",
      year: 2019,
      url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%20140",
      doi: "10.1177/0146645319838665",
      gradingScheme: "ICRP recommendations; not graded.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "nrc-proposed-rule-2026-radiation-protection",
      label: "Reforming and Modernizing the NRC's Radiation Protection Framework, proposed rule, 91 FR 43456 (would amend 10 CFR 35.75 and 35.2075)",
      publisher: "US Nuclear Regulatory Commission (Federal Register, 15 July 2026)",
      year: 2026,
      url: "https://www.federalregister.gov/documents/2026/07/15/2026-14208/reforming-and-modernizing-the-nrcs-radiation-protection-framework",
      gradingScheme: "A proposed federal rule, not in force; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nrc-proposed-rule-2026-medical-use",
      label: "Reducing Barriers to Medical Use Licensing, proposed rule, 91 FR 47042 (would remove 10 CFR 35.315 and add 35.76)",
      publisher: "US Nuclear Regulatory Commission (Federal Register, 27 July 2026)",
      year: 2026,
      url: "https://www.federalregister.gov/documents/2026/07/27/2026-15080/reducing-barriers-to-medical-use-licensing",
      gradingScheme: "A proposed federal rule, not in force; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nrc-rg-8-39",
      label: "Regulatory Guide 8.39, Release of Patients Administered Radioactive Material, Revision 1 (April 2020); draft Revision 2 (DG-8070) out for comment, 91 FR 51749",
      publisher: "US Nuclear Regulatory Commission",
      year: 2020,
      url: "https://www.federalregister.gov/documents/2026/08/11/2026-16344/draft-regulatory-guide-release-of-patients-administered-radioactive-material",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "nrc-nureg-1556-v9",
      label: "NUREG-1556 Volume 9, Revision 3, Program-Specific Guidance About Medical Use Licenses (patient release methods and default tables)",
      publisher: "US Nuclear Regulatory Commission",
      year: 2019,
      url: "https://www.nrc.gov/reading-rm/doc-collections/nuregs/staff/sr1556/",
      read: "not-reachable",
      accessed: "2026-11-17",
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
    "NUREG-1556 Volume 9 (Revision 3, 2019) and NRC Regulatory Guide 8.39 (Revision 1, April 2020), which give the US default release tables and calculation methods, could not be read: on 17 November 2026 nrc.gov again returned HTTP 403 to a script. Their existence and dates come from Federal Register notices. The US activity thresholds are therefore not reproduced here.",
    "On 17 November 2026 two NRC proposed rules were open: 91 FR 43456 (15 July 2026) would rewrite 10 CFR 35.75 and 35.2075, and 91 FR 47042 (27 July 2026) would remove 35.315 and add 35.76. A draft Revision 2 of Regulatory Guide 8.39 (DG-8070) was out for comment until 10 September 2026. The steps here follow the regulation in force, read from the eCFR text current to 12 November 2026; they will need re-reading if either rule is made final.",
    "The Ionising Radiation (Medical Exposure) Regulations 2017 extend to England, Wales and Scotland. The separate Northern Ireland regulations were not read.",
    "The EU Basic Safety Standards Directive (2013/59/Euratom), European Commission Radiation Protection 97, the UK Ionising Radiations Regulations 2017 and the UK Medical and Dental Guidance Notes were not read; the European and other national retained-activity figures come from the 2009 IAEA tables and may have changed.",
    "ICRP Publication 94 (2004) and ICRP Publication 140 (2019) were read only as their abstracts, and for Publication 140 its key points. Publication 140 is the newer ICRP text on therapy with radiopharmaceuticals; its detailed advice on release was not read. SRS-63 itself says there is a lack of good data on which to base patient advice for most radionuclides except radioiodine.",
    "Whether SSG-46 (2018) or SRS-63 (2009) has a later edition could not be checked on the IAEA catalogue, which returned HTTP 403 on 17 November 2026; the PDFs still download from the IAEA.",
    "No source read names radium-223 or palladium-103 seeds; the general rules for unsealed sources and permanent implants are taken to cover them.",
    "The IAEA tables disagree with each other for Germany (250 MBq in table 10, 75 MBq in table 9); the current German limit was not checked against German law.",
    "SRS-63 reports a lack of audit data on how patients behave after early release and on its consequences.",
  ],
});
