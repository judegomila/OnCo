import { protocol } from "./helpers";

/*
 * What a stem cell transplant or CAR T-cell programme must have in place to be accredited: the FACT-JACIE standards.
 *
 * What was read, and how. First read on 16 November 2026; every claim re-read against the sources on 17 November 2026
 * (second accuracy pass), both PDFs fetched again raw with curl from ebmt.org and turned to text with pdftotext
 * -layout, every quote checked by script (whitespace and line breaks only):
 * - FACT-JACIE International Standards for Hematopoietic Cellular Therapy Product Collection, Processing, and
 *   Administration, Ninth Edition, Version 9.1 (ninth edition published 28 October 2025, version 9.1 published
 *   17 December 2025, both effective 2 February 2026). Read: the notice, introduction, Part A terminology and
 *   definitions, Part B (clinical programme) sections B1, B2, B3.1, B4, B7.8 to B7.9 and B9, and Appendix I. Parts C
 *   and D (collection and processing facilities) were searched, not read through.
 * - FACT-JACIE International Standards for Immune Effector Cells, Third Edition, Version 3.1 (same four dates): the
 *   notice, Part B sections B1.3, B1.7, B2.11, B2.12, B3.1, B4.7, B7.8 to B7.9 and B9.2, and Appendix I. The rest was
 *   searched, not read through.
 * - Edition check on 17 November 2026: EBMT's JACIE standards page (ebmt.org/accreditation/jacie-standards) and FACT's
 *   standards page (factglobal.org/standards), both fetched raw. EBMT links version 9.1 and version 3.1 as the
 *   current files; FACT lists the Ninth Edition and the Third Edition. No newer edition is listed by either body.
 *   FACT's page also lists a separate first edition of FACT Standards for Immune Effector Cells in the Community
 *   Clinical Setting, which was not read; it is named in `bestInClass` and `gaps`.
 * - The accreditation manuals that explain each standard, the earlier editions and the FACT summary of changes were
 *   not used for any statement here.
 *
 * Changed on 17 November 2026: the page had given only the patient minimum for immune effector cell therapy inside a
 * transplant programme (3); the immune effector cell standards print a different floor (5) for a programme that does
 * not transplant, and that is now stated. Registry data collection is a 'shall' in the transplant standards and a
 * 'should' in the immune effector cell standards. The survival standard is in the transplant standards only. Reasons
 * in `why` that the standards do not give were reworded to what the standards say. The patient summary no longer
 * implies that intensive care must be available round the clock: the 24-hour wording belongs to the pharmacy.
 *
 * The standards print no evidence grades. Each standard is a "shall" (a requirement) or a "should" (a recommendation
 * that allows alternatives); that word and the standard's number are given in `grade`. Appendix I is a table: only
 * its single-site rows for programmes treating adults or children, which read unambiguously in the layout-preserved
 * text, are stated.
 *
 * The standards say of themselves that they are minimum guidelines and not best practice; the page says so too.
 * Quotes are copied from the raw text with line breaks joined, nothing else changed.
 */
export const factJacieCellularTherapyAccreditationStandards = protocol({
  id: "fact-jacie-cellular-therapy-accreditation-standards",
  name: "Accreditation standards for stem cell transplant and CAR T-cell programmes (FACT-JACIE)",
  aka: ["FACT-JACIE standards", "JACIE accreditation", "FACT accreditation", "accredited transplant centre", "accredited CAR-T centre", "cellular therapy programme accreditation", "FACT-JACIE International Standards"],
  domain: "cell-therapy-toxicity",
  tldr: "Hospitals that give stem cell transplants or CAR T-cell therapy can be inspected against international standards. To pass, a programme must show an experienced team, a minimum number of new patients a year, medicines available at any hour, access to intensive care or emergency services, a quality plan, and that it reviews its results. The standards describe a minimum, not best practice.",
  simple: "Transplant and CAR-T centres can be checked by outside inspectors against a rulebook. The rules cover the team, how many patients they treat, emergency back-up, and whether they measure their results. You can ask a centre whether it is accredited.",
  summary: "The FACT-JACIE standards (haematopoietic cellular therapy, 9th edition version 9.1; immune effector cells, 3rd edition version 3.1; both effective 2 February 2026) are requirements for accreditation, not graded clinical recommendations. Each standard is a 'shall' (to be complied with at all times) or a 'should' (recommended, alternatives allowed, an explanation required for deviation). The notice in both documents states that they provide minimum guidelines and are not intended to establish best practices.\n\nFor a clinical programme the core requirements are: a designated team of a Clinical Program Director, a Quality Manager and at least one further attending physician, in place and treating for at least twelve months before first accreditation (B1.3); a director with at least two years as an attending physician managing transplant and cellular therapy patients (B3.1.1.1); a minimum number of new patients (Appendix I: at a single adult or paediatric site, 5 autologous recipients for an autologous-only programme, 10 allogeneic recipients for an allogeneic and autologous programme, and 3 immune effector cell recipients within a transplant programme, in the twelve months before accreditation and on average each year after; the immune effector cell standards, written for programmes that do not transplant, set 5 new patients at a single adult or paediatric site); access to intensive care or emergency services (B2.11); a pharmacy with 24-hour availability and prompt access to medicines for expected complications including cytokine release syndrome (B2.12); a written quality management plan (B4.2); complete data for the CIBMTR or EBMT registry forms (B9.2, a 'shall' in the transplant standards and a 'should' in the immune effector cell standards); and, for immune effector cells, regular assessment for cytokine release syndrome and neurological complications with a written escalation plan (B7.8).\n\nOn outcomes the transplant standards say 'should': one-year survival within or above the expected range against national or international data, with a corrective action plan required ('shall') if it is not met (B4.7.5). The immune effector cell standards have no survival standard; they require review of outcomes against criteria the programme sets (B4.7).\n\nThe two bodies differ on the cycle: three years for FACT-accredited programmes and four years for JACIE-certified programmes. Whether accreditation is required for a centre to give a licensed CAR T-cell product, or to be paid for a transplant, is decided by regulators, manufacturers and payers in each country and is not in the standards.",
  asOf: "2026-11-17",
  setting: {
    who: ["multidisciplinary-team", "doctor", "nurse", "pharmacist"],
    where: ["ward", "outpatient-clinic", "intensive-care", "aseptic-unit"],
  },
  population: "Clinical programmes, collection facilities and processing laboratories that give stem cell transplants (autologous or allogeneic) or immune effector cell therapy such as CAR T cells, for adults or children, and that apply for FACT accreditation or JACIE certification. This page covers the clinical programme standards a patient would notice; the collection and laboratory parts are named and not detailed. It describes what an accredited centre has had to show. It is not a way to judge the care of one patient, and your own team can tell you their centre's status.",
  trigger: "A programme applies for accreditation for the first time, or comes up for renewal at the end of its cycle; or a patient is referred for a transplant or CAR T-cell therapy and wants to know what accreditation means.",
  steps: [
    {
      action: "Establish a designated team with a programme director, a quality manager and at least one more attending physician, in place and treating patients for at least twelve months before first accreditation",
      why: "The standards ask for a team, not one expert, and for that team to have been giving cellular therapy for at least twelve months before it is first accredited.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program shall have a designated cellular therapy team that includes a Clinical Program Director, a Quality Manager, and a minimum of one (1) additional transplant or cellular therapy attending physician, as applicable.",
      grade: "shall (B1.3)",
    },
    {
      action: "Appoint a programme director with at least two years of experience as the senior doctor directly managing transplant and cell therapy patients",
      why: "The director oversees the medical care given by everyone in the programme, so the standards ask that they have managed these patients themselves through the whole course of care.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program Director shall have a minimum of two (2) years of experience as an attending physician responsible for the direct clinical management of HPC transplant and cellular therapy patients throughout the continuum of care.",
      grade: "shall (B3.1.1.1)",
    },
    {
      action: "Treat at least the minimum number of new patients in the year before applying, and on average each year afterwards",
      why: "The standards set a floor on how many new patients a programme treats. They give no reason for the particular numbers.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program shall comply with the minimum number of new patients for accreditation as defined in Appendix I.",
      grade: "shall (B1.7)",
    },
    {
      action: "Have intensive care or emergency services available, with written guidance for moving a patient there quickly",
      why: "The standards ask for written guidelines on communication, monitoring and prompt triage or transfer, so the route to intensive care is settled before it is needed.",
      source: "fact-jacie-hct-9",
      quote: "There shall be access to an intensive care unit or emergency services.",
      grade: "shall (B2.11)",
    },
    {
      action: "Keep a pharmacy service that can supply the needed medicines at any hour, including those for cytokine release syndrome",
      why: "The standards ask that the pharmacy can get the medicines for expected complications promptly for each patient who receives a cell product.",
      source: "fact-jacie-hct-9",
      quote: "The pharmacy shall have prompt access to medications adequate to treat expected complications of cellular therapy, including cytokine release syndrome (CRS), for each recipient of a cellular therapy product.",
      grade: "shall (B2.12.1)",
    },
    {
      action: "Write and maintain a quality management plan, with the programme director responsible for it",
      why: "The plan has to cover, among other things, how errors, accidents, adverse events and complaints are detected, investigated and recorded.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program shall establish and maintain a written Quality Management Plan (QM Plan).",
      grade: "shall (B4.2)",
    },
    {
      action: "Compare the programme's one-year survival with national or international figures, and act if it falls short",
      why: "This is a recommendation in the transplant standards, not a requirement; what is required is a corrective action plan when the expected survival is not met.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program should achieve one-year survival outcome within or above the expected range when compared to national or international outcome data.",
      grade: "should (B4.7.5)",
    },
    {
      action: "Collect complete and accurate data for the international transplant registries",
      why: "Transplant programmes must also submit these data to a national or international database. In the immune effector cell standards, for programmes that do not transplant, collecting them is recommended, not required.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program shall collect and maintain complete and accurate data necessary to complete the Transplant Essential Data Forms of the CIBMTR or the Data Collection Forms of the EBMT.",
      grade: "shall (B9.2)",
    },
    {
      action: "For CAR T-cell and other immune effector cell therapy, assess each patient regularly for cytokine release syndrome and neurological complications",
      why: "The standards name these two complications as the ones regular assessment must be able to detect.",
      source: "fact-jacie-iec-3",
      quote: "There shall be regular assessment of the recipient to detect complications, including CRS and neurologic dysfunction.",
      grade: "shall (B7.8.2)",
    },
    {
      action: "Have a written plan for stepping up monitoring and care quickly when a complication appears",
      why: "A plan written in advance means staff do not have to work out whom to call and what to do at the time. The standards also ask that the ward, intensive care, the emergency department and pharmacy are told in a timely way.",
      source: "fact-jacie-iec-3",
      quote: "There shall be a written plan for rapid escalation of care, increased intensity of monitoring, and relevant workup to address complications.",
      grade: "shall (B7.8.3)",
    },
    {
      action: "Give the patient, their carers and their other doctors specific instructions for care after discharge",
      why: "After discharge the patient, their carers and other doctors may be the ones looking after them, so the standards ask that each is given instructions specific to the cell therapy.",
      source: "fact-jacie-iec-3",
      quote: "There shall be a process to provide cellular therapy-specific instructions for post-discharge care to the recipient, caregivers, and other health care providers who may provide care.",
      grade: "shall (B7.9.1.1)",
    },
    {
      action: "As a patient, ask the centre whether it holds FACT accreditation or JACIE certification for the treatment you are being offered",
      why: "A centre can tell you whether it is accredited, and for which treatments, and what that covers.",
      practice: "The standards are written for programmes and say nothing to patients. FACT and JACIE each publish which programmes they have accredited; those lists were not read for this page.",
    },
  ],
  bestInClass: {
    statement: "The joint international standards are the FACT-JACIE International Standards, 9th edition version 9.1 for haematopoietic cellular therapy and 3rd edition version 3.1 for immune effector cells, both effective 2 February 2026 and both listed as current by FACT and by EBMT on 17 November 2026. FACT says the immune effector cell standards are for programmes that do not transplant, and that programmes doing both should use the haematopoietic standards. FACT alone also publishes a first edition of standards for immune effector cells in community clinics, which was not read. No competing standard from another body was found; the two bodies have reviewed and developed the standards jointly since the second edition in 2002. They are requirements for accreditation, not graded evidence, and they state their own limit: they are minimum guidelines and are not intended to establish best practices. The two bodies apply them on different cycles, three years for FACT and four years for JACIE. The firmest requirements are worded 'shall': the team and its experience, the minimum patient numbers, intensive care and pharmacy cover, the quality plan, registry data (in the transplant standards; 'should' in the immune effector cell standards), and monitoring for cytokine release syndrome and neurological complications. Meeting an expected one-year survival is worded 'should' in the transplant standards, with a corrective action plan required when it is not met.",
    sources: ["fact-jacie-hct-9", "fact-jacie-iec-3", "fact-standards-page"],
  },
  variants: [
    {
      name: "FACT accreditation and JACIE certification: the same standards on different cycles",
      differs: "FACT began its inspection and accreditation programme in North America in 1997; JACIE was established in 1999 by EBMT and ISCT. The standards are shared; the length of the cycle is not: \"At publication of these Standards, this period is three (3) years for FACT-accredited programs and four (4) years for JACIE-certified programs.\"",
      evidence: "A definition in the standards themselves. No comparison of outcomes under the two cycles is given.",
      sources: ["fact-jacie-hct-9"],
    },
    {
      name: "'Shall' standards and 'should' standards",
      differs: "A 'shall' has to be met at all times. A 'should' is recommended and a programme may do something else: \"When an applicant deviates from a “should” standard, an explanation, but no change in practice, is required.\" Survival against expected results, and setting a benchmark for deaths not due to relapse at 100 days, are 'should' standards.",
      evidence: "The standards' own definitions (introduction and A1.1). The corrective action plan after a missed survival expectation is a 'shall'.",
      sources: ["fact-jacie-hct-9"],
    },
    {
      name: "Minimum patient numbers by type of programme",
      differs: "Appendix I sets different floors. At a single site treating adults or children: 5 autologous recipients for an autologous-only programme, 10 allogeneic recipients for a programme doing both, and 3 immune effector cell recipients within a transplant programme, in the twelve months before first accreditation and as a yearly average within the cycle. Programmes on several sites, or treating both adults and children, have their own rows, which are not reproduced here. The immune effector cell standards have their own Appendix I for a clinical service that gives immune effector cell therapy and does not transplant: 5 new patients at a single site treating adults or children, on the same two time frames. That appendix also describes an optional provisional accreditation, for which no patient number is required.",
      evidence: "The haematopoietic appendix introduces the table with: \"Clinical Programs shall transplant at least the following number of new patients\". A new patient is one who received a first transplant, or a first immune effector cell product, of that type in the period. The standards give no evidence for the particular numbers.",
      sources: ["fact-jacie-hct-9", "fact-jacie-iec-3"],
    },
  ],
  grades: [
    { claim: "What 'shall' and 'should' mean in the standards", grade: "definition (A1.1)", source: "fact-jacie-hct-9", quote: "For purposes of these Standards, the term “shall” means that the Standard is to be complied with at all times." },
    { claim: "The standards are a minimum and not best practice", grade: "notice (both documents)", source: "fact-jacie-hct-9", quote: "These Standards are designed to provide minimum guidelines for programs, facilities, and individuals performing cellular therapy or providing support services for such procedures." },
    { claim: "The same notice opens the immune effector cell standards", grade: "notice", source: "fact-jacie-iec-3", quote: "These Standards are not intended to establish best practices or include all procedures and practices that a program, facility, or individual should implement if the standard of practice in the community or applicable governmental laws establish additional requirements." },
    { claim: "The team must have been in place and treating for at least twelve months before first accreditation", grade: "shall (B1.3)", source: "fact-jacie-hct-9", quote: "The designated team shall have been in place and performing cellular therapy for at least twelve (12) months preceding initial accreditation." },
    { claim: "Written guidance for triage or transfer to intensive care", grade: "shall (B2.11.1)", source: "fact-jacie-hct-9", quote: "There shall be written guidelines for communication, patient monitoring, and prompt triage or transfer of patients to an intensive care unit, emergency department, or equivalent when appropriate." },
    { claim: "A pharmacy with 24-hour availability", grade: "shall (B2.12)", source: "fact-jacie-hct-9", quote: "There shall be a pharmacy providing 24-hour availability of medications needed for the care of cellular therapy patients." },
    { claim: "A corrective action plan when expected one-year survival is not met", grade: "shall (B4.7.5.1)", source: "fact-jacie-hct-9", quote: "If expected one-year survival outcome is not met, the Clinical Program shall implement a Corrective Action Plan that meets FACT or JACIE requirements." },
    { claim: "Benchmarks for non-relapse mortality at 100 days", grade: "should (B4.7.6)", source: "fact-jacie-hct-9", quote: "The Clinical Program should set benchmarks for non-relapse mortality at one hundred (100) days after cellular therapy product administration and describe the rationale and process for review in the QM Plan." },
    { claim: "The immune effector cell standards carry the same pharmacy requirement for cytokine release syndrome medicines", grade: "shall (B2.12.1)", source: "fact-jacie-iec-3", quote: "The pharmacy shall have prompt access to medications adequate to treat expected complications of cellular therapy, including cytokine release syndrome (CRS), for each recipient of a cellular therapy product." },
    { claim: "Minimum new patient numbers apply to immune effector cell programmes as well", grade: "shall (B1.7)", source: "fact-jacie-iec-3", quote: "The Clinical Program shall comply with the minimum number of new patients for accreditation as defined in Appendix I." },
    { claim: "Registry data collection is recommended, not required, in the immune effector cell standards", grade: "should (B9.2)", source: "fact-jacie-iec-3", quote: "The Clinical Program should collect and maintain complete and accurate data necessary to complete the Cellular Therapy Essential Data forms of the CIBMTR or the Data Collection Forms of the EBMT." },
    { claim: "Transplant programmes submit their data to a national or international database", grade: "shall (B9.2.1)", source: "fact-jacie-hct-9", quote: "Clinical Programs shall submit the data specified in B9.2 for allogeneic and autologous transplants to a national or international database." },
  ],
  sources: [
    {
      key: "fact-jacie-hct-9",
      label: "FACT-JACIE International Standards for Hematopoietic Cellular Therapy Product Collection, Processing, and Administration, Ninth Edition, Version 9.1",
      publisher: "Foundation for the Accreditation of Cellular Therapy (FACT) and the Joint Assurance Committee of ISCT and EBMT (JACIE)",
      year: 2025,
      url: "https://www.ebmt.org/sites/default/files/2025-12/FACT-JACIE%20HCT%20Standards%209th%20Ed_V9-1.pdf",
      gradingScheme: "No evidence grades. Each standard is worded 'shall' (to be complied with at all times), 'should' (recommended or advised, with possible effective alternatives) or 'may' (permissive); the word and the standard's number are given here.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "fact-jacie-iec-3",
      label: "FACT-JACIE International Standards for Immune Effector Cells, Third Edition, Version 3.1",
      publisher: "Foundation for the Accreditation of Cellular Therapy (FACT) and the Joint Assurance Committee of ISCT and EBMT (JACIE)",
      year: 2025,
      url: "https://www.ebmt.org/sites/default/files/2025-12/FACT-JACIE%20IEC%20Standards%203rd%20Ed_V3-1.pdf",
      gradingScheme: "No evidence grades. Each standard is worded 'shall', 'should' or 'may', as in the haematopoietic cellular therapy standards.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "fact-standards-page",
      label: "FACT Standards (the page listing the current edition of each set of FACT standards)",
      publisher: "Foundation for the Accreditation of Cellular Therapy (FACT)",
      year: 2026,
      url: "https://www.factglobal.org/standards/",
      gradingScheme: "A publisher's listing page; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  terms: ["apheresis"],
  related: ["fact-cellular-therapy", "rejuv-tx-long-term-follow-up-frameworks", "car-t-referral-and-eligibility", "car-t-apheresis", "crs-grading-and-management", "icans-grading-and-management", "allo-hct-gvhd-prophylaxis", "allogeneic-hsct", "autologous-stem-cell-transplant"],
  upgrades: [],
  gaps: [
    "The standards give no evidence for their thresholds (the minimum patient numbers, the two years of director experience) and print no evidence grades. Whether accredited programmes have better outcomes than others is not addressed in the two documents read, and no study of that question was read for this page.",
    "The standards call themselves minimum guidelines and say they are not intended to establish best practices, so accreditation shows a floor has been met and nothing more.",
    "Only the clinical programme parts were read through (Part B sections B1, B2, B3.1, B4, B7.8 to B7.9 and B9 and Appendix I of the haematopoietic standards; B1.3, B1.7, B2.11, B2.12, B3.1, B4.7, B7.8, B7.9, B9.2 and Appendix I of the immune effector cell standards). The collection and processing facility standards (Parts C and D), the remaining clinical sections on donors, consent and nursing, and the accreditation manuals were not.",
    "Appendix I is a table whose multi-site and combined adult and paediatric rows could not be read with certainty from the extracted text; only the single-site figures for programmes treating adults or children are stated.",
    "Whether accreditation is a condition for giving a licensed CAR T-cell product or for payment in any country is set outside the standards and was not researched.",
    "The lists of accredited programmes that FACT and JACIE publish were not read, so the page cannot say which centres are accredited.",
    "On 17 November 2026 EBMT's JACIE standards page and FACT's standards page both listed the 9th edition (version 9.1 on the EBMT page) and the 3rd edition (version 3.1) as current, and no newer edition. FACT's page also lists a first edition of FACT Standards for Immune Effector Cells in the Community Clinical Setting, for community clinics outside academic centres and large health systems; that document was not read, and nothing here describes what it requires.",
  ],
});
