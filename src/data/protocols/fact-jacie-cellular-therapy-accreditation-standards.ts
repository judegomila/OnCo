import { protocol } from "./helpers";

/*
 * What a stem cell transplant or CAR T-cell programme must have in place to be accredited: the FACT-JACIE standards.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory, pdftotext):
 * - FACT-JACIE International Standards for Hematopoietic Cellular Therapy Product Collection, Processing, and
 *   Administration, Ninth Edition, Version 9.1 (published 17 December 2025, effective 2 February 2026): the PDF linked
 *   from EBMT's JACIE standards page (ebmt.org/accreditation/jacie-standards), which lists it as the current edition.
 *   Read: the notice, introduction, Part A definitions and tenets, Part B (clinical programme) sections B1, B2, B3.1,
 *   B4 and B9, and Appendix I. Parts C and D (collection and processing facilities) were searched, not read through.
 * - FACT-JACIE International Standards for Immune Effector Cells, Third Edition, Version 3.1 (same dates, same page):
 *   the notice and Part B sections B1.7, B2.12 and B7.8 to B7.9. The rest was searched, not read through.
 * - The accreditation manuals that explain each standard, the earlier editions and the FACT summary of changes were
 *   not used for any statement here. The ebmt.org address for an earlier 9th edition file returned 404 and an EBMT
 *   news page 403; neither is cited.
 *
 * The standards print no evidence grades. Each standard is a "shall" (a requirement) or a "should" (a recommendation
 * that allows alternatives); that word and the standard's section are given in `grade`. The PDF text sets standard
 * numbers on their own lines, so where a number could not be tied to its sentence with certainty the section is given
 * instead (B3.1 for the director's experience). Appendix I is a table: only its single-site rows, which read
 * unambiguously in the layout-preserved text, are stated.
 *
 * The standards say of themselves that they are minimum guidelines and not best practice; the page says so too.
 * Quotes are copied from the raw text with line breaks joined, nothing else changed.
 */
export const factJacieCellularTherapyAccreditationStandards = protocol({
  id: "fact-jacie-cellular-therapy-accreditation-standards",
  name: "Accreditation standards for stem cell transplant and CAR T-cell programmes (FACT-JACIE)",
  aka: ["FACT-JACIE standards", "JACIE accreditation", "FACT accreditation", "accredited transplant centre", "accredited CAR-T centre", "cellular therapy programme accreditation", "FACT-JACIE International Standards"],
  domain: "cell-therapy-toxicity",
  tldr: "Hospitals that give stem cell transplants or CAR T-cell therapy can be inspected against international standards. To pass, a programme must show an experienced team, a minimum number of patients each year, round-the-clock access to medicines and intensive care, a quality plan, and that it checks its own results. The standards say they describe a minimum: accreditation shows a floor has been met.",
  simple: "Transplant and CAR-T centres can be checked by outside inspectors against a rulebook. The rules cover the team, how many patients they treat, emergency back-up, and whether they measure their results. You can ask a centre whether it is accredited.",
  summary: "The FACT-JACIE standards (haematopoietic cellular therapy, 9th edition version 9.1; immune effector cells, 3rd edition version 3.1; both effective 2 February 2026) are requirements for accreditation, not graded clinical recommendations. Each standard is a 'shall' (to be complied with at all times) or a 'should' (recommended, alternatives allowed, an explanation required for deviation). The notice in both documents states that they provide minimum guidelines and are not intended to establish best practices.\n\nFor a clinical programme the core requirements are: a designated team of a Clinical Program Director, a Quality Manager and at least one further attending physician, in place and treating for at least twelve months before first accreditation (B1.3); a director with at least two years as an attending physician managing transplant and cellular therapy patients (B3.1); a minimum number of new patients (Appendix I: at a single adult or paediatric site, 5 autologous recipients for an autologous-only programme, 10 allogeneic recipients for an allogeneic and autologous programme, and 3 immune effector cell recipients within a transplant programme, in the twelve months before accreditation and on average each year after); access to intensive care or emergency services (B2.11); a pharmacy with 24-hour availability and prompt access to medicines for expected complications including cytokine release syndrome (B2.12); a written quality management plan (B4.2); complete data for the CIBMTR or EBMT registry forms (B9.2); and, for immune effector cells, regular assessment for cytokine release syndrome and neurological complications with a written escalation plan (B7.8).\n\nOn outcomes the wording is 'should': one-year survival within or above the expected range against national or international data, with a corrective action plan required ('shall') if it is not met (B4.7.5).\n\nThe two bodies differ on the cycle: three years for FACT-accredited programmes and four years for JACIE-certified programmes. Whether accreditation is required for a centre to give a licensed CAR T-cell product, or to be paid for a transplant, is decided by regulators, manufacturers and payers in each country and is not in the standards.",
  asOf: "2026-11-16",
  setting: {
    who: ["multidisciplinary-team", "doctor", "nurse", "pharmacist"],
    where: ["ward", "outpatient-clinic", "intensive-care", "aseptic-unit"],
  },
  population: "Clinical programmes, collection facilities and processing laboratories that give stem cell transplants (autologous or allogeneic) or immune effector cell therapy such as CAR T cells, for adults or children, and that apply for FACT accreditation or JACIE certification. This page covers the clinical programme standards a patient would notice; the collection and laboratory parts are named and not detailed. It describes what an accredited centre has had to show. It is not a way to judge the care of one patient, and your own team can tell you their centre's status.",
  trigger: "A programme applies for accreditation for the first time, or comes up for renewal at the end of its cycle; or a patient is referred for a transplant or CAR T-cell therapy and wants to know what accreditation means.",
  steps: [
    {
      action: "Establish a designated team with a programme director, a quality manager and at least one more attending physician, working together for a year before applying",
      why: "Transplant and cell therapy depend on a team that has already worked through complications together, not on one expert.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program shall have a designated cellular therapy team that includes a Clinical Program Director, a Quality Manager, and a minimum of one (1) additional transplant or cellular therapy attending physician, as applicable.",
      grade: "shall (B1.3)",
    },
    {
      action: "Appoint a programme director with at least two years of experience as the senior doctor directly managing transplant and cell therapy patients",
      why: "The person answerable for every patient's care has to have managed these treatments from start to finish themselves.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program Director shall have a minimum of two (2) years of experience as an attending physician responsible for the direct clinical management of HPC transplant and cellular therapy patients throughout the continuum of care.",
      grade: "shall (section B3.1)",
    },
    {
      action: "Treat at least the minimum number of new patients in the year before applying, and on average each year afterwards",
      why: "A team that does a procedure regularly keeps its skills and its systems in working order.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program shall comply with the minimum number of new patients for accreditation as defined in Appendix I.",
      grade: "shall (B1.7)",
    },
    {
      action: "Have intensive care or emergency services available, with written guidance for moving a patient there quickly",
      why: "Complications of these treatments can become serious within hours, and the route to intensive care should be settled before it is needed.",
      source: "fact-jacie-hct-9",
      quote: "There shall be access to an intensive care unit or emergency services.",
      grade: "shall (B2.11)",
    },
    {
      action: "Keep a pharmacy service that can supply the needed medicines at any hour, including those for cytokine release syndrome",
      why: "The treatment for a severe immune reaction has to be on hand for each patient, not ordered when the reaction starts.",
      source: "fact-jacie-hct-9",
      quote: "The pharmacy shall have prompt access to medications adequate to treat expected complications of cellular therapy, including cytokine release syndrome (CRS), for each recipient of a cellular therapy product.",
      grade: "shall (B2.12.1)",
    },
    {
      action: "Write and maintain a quality management plan, with the programme director responsible for it",
      why: "A written plan is how a centre shows that errors and near misses are found, reviewed and acted on.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program shall establish and maintain a written Quality Management Plan (QM Plan).",
      grade: "shall (B4.2)",
    },
    {
      action: "Compare the programme's one-year survival with national or international figures, and act if it falls short",
      why: "A centre that measures its own results against others can see a problem that no single case would show.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program should achieve one-year survival outcome within or above the expected range when compared to national or international outcome data.",
      grade: "should (B4.7.5)",
    },
    {
      action: "Collect complete and accurate data for the international transplant registries",
      why: "The registries are where the comparison figures come from, so they are only as good as what each centre sends.",
      source: "fact-jacie-hct-9",
      quote: "The Clinical Program shall collect and maintain complete and accurate data necessary to complete the Transplant Essential Data Forms of the CIBMTR or the Data Collection Forms of the EBMT.",
      grade: "shall (B9.2)",
    },
    {
      action: "For CAR T-cell and other immune effector cell therapy, assess each patient regularly for cytokine release syndrome and neurological complications",
      why: "These two reactions are the main early dangers of the treatment and are easier to treat when caught early.",
      source: "fact-jacie-iec-3",
      quote: "There shall be regular assessment of the recipient to detect complications, including CRS and neurologic dysfunction.",
      grade: "shall (B7.8.2)",
    },
    {
      action: "Have a written plan for stepping up monitoring and care quickly when a complication appears",
      why: "Staff on any shift should know who to call and what to do without having to work it out at the time.",
      source: "fact-jacie-iec-3",
      quote: "There shall be a written plan for rapid escalation of care, increased intensity of monitoring, and relevant workup to address complications.",
      grade: "shall (B7.8.3)",
    },
    {
      action: "Give the patient, their carers and their other doctors specific instructions for care after discharge",
      why: "Late reactions happen at home, and the people there need to know what to look for and whom to ring.",
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
    statement: "There is one international standard and no competing one was found: the FACT-JACIE International Standards, 9th edition version 9.1 for haematopoietic cellular therapy and 3rd edition version 3.1 for immune effector cells, both effective 2 February 2026; the two bodies have reviewed and developed the standards jointly since the second edition in 2002. They are requirements for accreditation, not graded evidence, and they state their own limit: they are minimum guidelines and are not intended to establish best practices. The two bodies apply them on different cycles, three years for FACT and four years for JACIE. The firmest requirements are worded 'shall': the team and its experience, the minimum patient numbers, intensive care and pharmacy cover, the quality plan, registry data, and monitoring for cytokine release syndrome and neurological complications. Meeting an expected one-year survival is worded 'should', with a corrective action plan required when it is not met.",
    sources: ["fact-jacie-hct-9", "fact-jacie-iec-3"],
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
      differs: "Appendix I sets different floors. At a single site treating adults or children: 5 autologous recipients for an autologous-only programme, 10 allogeneic recipients for a programme doing both, and 3 immune effector cell recipients within a transplant programme, in the twelve months before first accreditation and as a yearly average within the cycle. Programmes on several sites, or treating both adults and children, have their own rows, which are not reproduced here.",
      evidence: "The appendix introduces the table with: \"Clinical Programs shall transplant at least the following number of new patients\". The standards give no evidence for the particular numbers.",
      sources: ["fact-jacie-hct-9"],
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
      accessed: "2026-11-16",
    },
    {
      key: "fact-jacie-iec-3",
      label: "FACT-JACIE International Standards for Immune Effector Cells, Third Edition, Version 3.1",
      publisher: "Foundation for the Accreditation of Cellular Therapy (FACT) and the Joint Assurance Committee of ISCT and EBMT (JACIE)",
      year: 2025,
      url: "https://www.ebmt.org/sites/default/files/2025-12/FACT-JACIE%20IEC%20Standards%203rd%20Ed_V3-1.pdf",
      gradingScheme: "No evidence grades. Each standard is worded 'shall', 'should' or 'may', as in the haematopoietic cellular therapy standards.",
      read: "full-text",
      accessed: "2026-11-16",
    },
  ],
  terms: ["apheresis"],
  related: ["fact-cellular-therapy", "rejuv-tx-long-term-follow-up-frameworks", "car-t-referral-and-eligibility", "car-t-apheresis", "crs-grading-and-management", "icans-grading-and-management", "allo-hct-gvhd-prophylaxis", "allogeneic-hsct", "autologous-stem-cell-transplant"],
  upgrades: [],
  gaps: [
    "The standards give no evidence for their thresholds (the minimum patient numbers, the two years of director experience) and print no evidence grades. Whether accredited programmes have better outcomes than others is not addressed in the two documents read, and no study of that question was read for this page.",
    "The standards call themselves minimum guidelines and say they are not intended to establish best practices, so accreditation shows a floor has been met and nothing more.",
    "Only the clinical programme parts were read through (Part B sections B1, B2, B3.1, B4 and B9 and Appendix I of the haematopoietic standards; B1.7, B2.12, B7.8 and B7.9 of the immune effector cell standards). The collection and processing facility standards (Parts C and D), the remaining clinical sections on donors, consent and nursing, and the accreditation manuals were not.",
    "Appendix I is a table whose multi-site and combined adult and paediatric rows could not be read with certainty from the extracted text; only the single-site figures are stated.",
    "Whether accreditation is a condition for giving a licensed CAR T-cell product or for payment in any country is set outside the standards and was not researched.",
    "The lists of accredited programmes that FACT and JACIE publish were not read, so the page cannot say which centres are accredited.",
  ],
});
