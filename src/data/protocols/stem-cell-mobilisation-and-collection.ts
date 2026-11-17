import { protocol } from "./helpers";

/*
 * Mobilising blood stem cells with G-CSF (with or without chemotherapy, plerixafor or motixafortide) and collecting
 * them by apheresis, from patients for an autologous transplant and from healthy donors for an allogeneic one.
 * Bone marrow harvest and cord blood are not covered. Collecting lymphocytes for CAR-T is a separate protocol
 * (`car-t-apheresis`).
 *
 * What was read, and how (all on 16 November 2026, fetched raw and read as text):
 * - The EBMT Handbook, 8th edition (Springer 2024), chapter 16 (Mobilization and collection of HSC, Worel, Bilgin and
 *   Wuchter), read in full, and the key points of chapter 17 (children): from NCBI's open-access literature archive
 *   package (ftp.ncbi.nlm.nih.gov/pub/litarch/47/b6/spr9783031440809_NBK608238.tar.gz), because link.springer.com and
 *   the Bookshelf web pages refused a script. A handbook of expert chapters, not a graded guideline.
 * - FACT-JACIE International Standards, Ninth Edition, version 9.1 (effective 2 February 2026): full text PDF from
 *   ebmt.org; the donor sections B6 and C6 were read.
 * - 2024 WMDA Standards (World Marrow Donor Association), the edition the WMDA standards page offered on the access
 *   date: full text PDF from wmda.info, sections 3, 7, 8 and 9 read.
 * - US prescribing information from DailyMed, full text of each label XML, all manufacturers' labels (industry):
 *   Neupogen (filgrastim, Amgen, set id 97cc73cc-b5b7-458a-a933-77b00523e193), Mozobil (plerixafor, Sanofi, set id
 *   0ed08d2b-5051-46b2-aa37-1d6275bf9003) and Aphexda (motixafortide, BioLineRx, set id
 *   f7cdc584-ebf0-a68e-e053-6294a90a9ea9).
 * - EBMT position statement on autologous mobilisation in myeloma and lymphoma (Mohty et al., Bone Marrow Transplant
 *   2014): abstract only. The nature.com page served the abstract, references and declarations but not the body. Its
 *   acknowledgements state medical writing funded by an unrestricted grant from Sanofi, the maker of plerixafor.
 * - ASBMT guidelines (Duong et al., Biol Blood Marrow Transplant 2014) and the ASBMT-era consensus (Giralt et al.
 *   2014): abstracts only, Europe PMC; neither abstract states a threshold or a target, and the publisher page gave
 *   a script nothing. Their recommendations are therefore NOT shown, and the page says so.
 * - Worldwide Network for Blood and Marrow Transplantation consensus on related donors (Worel et al. 2015) and a
 *   Spanish consensus (Bueno et al. 2020): abstracts only.
 *
 * CD34 cell doses are written out in words in the prose because the superscript in the source ("2 x 10 to the 6")
 * does not survive conversion to text; no quote contains one. Every DOI was resolved through Crossref or Europe PMC
 * and its title checked. Quotes are checked by script against the saved text.
 */
export const stemCellMobilisationAndCollection = protocol({
  id: "stem-cell-mobilisation-and-collection",
  name: "Peripheral blood stem cell mobilisation and collection for transplant, in patients and donors",
  aka: ["stem cell harvest", "stem cell collection", "PBSC mobilisation", "PBSC collection", "stem cell mobilization", "leukapheresis for stem cells", "G-CSF mobilisation", "plerixafor", "just-in-time plerixafor", "poor mobiliser", "CD34 target", "peripheral blood stem cell donation", "donating stem cells"],
  domain: "cell-therapy-toxicity",
  tldr: "Stem cells for a transplant are usually collected from the blood rather than the bone marrow. Daily injections of a growth factor for about four to five days move stem cells out of the marrow into the blood, and a machine then filters them out over a few hours while the rest of the blood is returned. If too few cells appear in the blood, a second medicine called plerixafor can be added.",
  simple: "You have an injection under the skin each day for a few days. It makes stem cells move from your bones into your blood. Then you sit by a machine for a few hours while it collects the stem cells and gives the rest of your blood back. Bone aches are common. Tell the team at once about pain under the left ribs or in the left shoulder.",
  summary: "The reader's own unit's policy comes first. Patients (autologous): G-CSF alone ('steady state', filgrastim 10 micrograms/kg/day, apheresis usually from day 5) for those needing no further chemotherapy, or chemotherapy plus G-CSF where tumour reduction or a high yield is needed (EBMT Handbook 2024). Monitor blood CD34 from day 4 to 5 of G-CSF, or when leucocytes recover after chemotherapy; start apheresis above 20 CD34 cells per microlitre. The Handbook gives the minimum dose for one autologous transplant as 2 million CD34 cells per kg (optimal 2.5 to 5 million) and for an allogeneic transplant 4 million per kg of the recipient (optimal 5 to 8 million). Poor mobilisation (about 15% of patients): the Handbook recommends plerixafor below 10 CD34 cells per microlitre on days 4 to 5, considers it between 10 and 20, and uses it as rescue if the first apheresis yields under a third of the goal; the US label gives plerixafor to every patient with lymphoma or myeloma after 4 days of filgrastim, about 11 hours before each apheresis. Motixafortide is a US-labelled alternative in myeloma. Donors (allogeneic): fitness is assessed by a physician who is not the patient's treating physician (WMDA 3.22.3.1); pregnancy test and haemoglobinopathy risk assessment before mobilisation (FACT-JACIE B6.3.5, B6.3.6); mobilising agents given under experienced supervision (B6.3.4); a central venous catheter only in exceptional, documented circumstances (WMDA 8.05.2); a session of no more than 5 hours and no more than two consecutive sessions (Handbook); follow-up contact for at least 10 years (WMDA 9.02). Plerixafor is not approved for healthy donors. Left upper abdominal or shoulder pain during G-CSF needs assessment for splenic enlargement or rupture (label).",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer", "multidisciplinary-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "ward", "home"],
  },
  population: "Adults being prepared for an autologous transplant (most often for myeloma or lymphoma), and healthy adult related or unrelated donors giving peripheral blood stem cells for someone else. Children as patients or donors follow paediatric protocols; only the Handbook's key points on child donors are given, under variants. Bone marrow harvest, cord blood and lymphocyte collection for CAR-T are not covered. The plerixafor and motixafortide labels cover autologous collection only. This page explains what the collection team does; the reader's own team's protocol comes first.",
  trigger: "A decision to collect peripheral blood stem cells: for a patient, once the transplant plan is made; for a donor, once selected for a specific patient and before any mobilising injection is given.",
  steps: [
    {
      action: "For a donor, have fitness to donate assessed by a physician who is not the doctor looking after the patient",
      why: "The donor gains nothing medically from donating, so the doctor judging their safety must have no stake in the patient getting the cells.",
      source: "wmda-standards-2024",
      quote: "This examination must be performed or supervised by a physician who is not the primary treating physician overseeing the care of the patient.",
      grade: "Standard 3.22.3.1 (must)",
    },
    {
      action: "Before any mobilising injection, do a pregnancy test for anyone who could be pregnant and assess the risk of a haemoglobin disorder such as sickle cell disease, testing if indicated",
      why: "A pregnancy must be known about before any mobilising medicine is given, and in people with sickle cell disease G-CSF can set off a crisis, which has been fatal.",
      source: "fact-jacie-2025",
      quote: "The donor shall be evaluated for the risk of hemoglobinopathy and, if indicated, tested.",
      grade: "Standard B6.3.6 (shall)",
    },
    {
      action: "For a patient, choose G-CSF alone when no further chemotherapy is needed, and chemotherapy followed by G-CSF when the disease still needs treating or a large number of cells is needed",
      why: "G-CSF alone is gentler, predictable and can be done as an outpatient; adding chemotherapy collects more cells and treats the cancer but brings the side effects of chemotherapy.",
      source: "ebmt-handbook-2024",
      quote: "Steady-state mobilization should be considered for patients who are not in need for chemotherapy due to the underlying disease (e.g., MM) or disease status (i.e., stable remission).",
    },
    {
      action: "Give mobilising agents under the supervision of a clinician experienced in using them and in managing their complications",
      why: "Bone pain, fever and headache are the commonest side effects; the rare serious reactions need someone who knows what to look for.",
      source: "fact-jacie-2025",
      quote: "Administration of mobilization agents shall be under the supervision of a licensed health care professional experienced in the administration of these agents and management of complications in persons receiving them.",
      grade: "Standard B6.3.4 (shall)",
    },
    {
      action: "Give filgrastim by injection under the skin for at least 4 days before the first collection and continue it until the last",
      why: "Stem cells need several days of growth factor to reach the blood in useful numbers, and the injections carry on so the numbers hold up through the collection days.",
      source: "neupogen-label",
      quote: "Administer NEUPOGEN for at least 4 days before the first leukapheresis procedure and continue until the last leukapheresis.",
      grade: "Prescribing information, section 2.3",
    },
    {
      action: "Tell the person to report pain in the left upper abdomen or left shoulder straight away, and assess for an enlarged or ruptured spleen if it occurs",
      why: "G-CSF makes the spleen work harder and swell; rupture is rare but has been fatal, and pain there is the warning.",
      source: "neupogen-label",
      quote: "Evaluate patients who report left upper abdominal or shoulder pain for an enlarged spleen or splenic rupture.",
      grade: "Prescribing information, section 5.1",
    },
    {
      action: "Start measuring CD34 cells in the blood on day 4 to 5 of G-CSF alone, or when the white count recovers to 1000 per microlitre after mobilising chemotherapy",
      why: "The CD34 count in the blood is the best guide to whether enough stem cells can be collected that day.",
      source: "ebmt-handbook-2024",
      quote: "If not otherwise specified by the protocol, CD34 monitoring should be initiated at the latest if leukocytes increase up to 1000 μL during recovering from aplasia or at day 4–5 of G-CSF in steady-state mobilization.",
    },
    {
      action: "Start apheresis once the blood CD34 count is above 20 cells per microlitre",
      why: "Below that level a session is likely to collect too few cells to be worth the hours on the machine.",
      source: "ebmt-handbook-2024",
      quote: "A start of leukapheresis is indicated when a CD34+ cell count of >20/μL is reached (Mohty et al. 2014).",
    },
    {
      action: "Set the collection target before starting, by the type of transplant, the stem cell source and the disease: at least 2 million CD34 cells per kg for one autologous transplant, and at least 4 million per kg of the recipient's weight for an allogeneic one",
      why: "Enough stem cells are needed for the blood counts to recover reliably after high-dose treatment.",
      source: "ebmt-handbook-2024",
      quote: "The target number of HSC to be collected is dependent among others on the kind of transplant (e.g., autologous or allogeneic), the stem cell source (BM or PB), and the underlying disease (Table 16.2).",
    },
    {
      action: "If more than one transplant may be needed, as in some people with myeloma, collect enough for all of them before the first high-dose treatment",
      why: "After high-dose treatment the marrow releases stem cells poorly, so a later collection often fails.",
      source: "ebmt-handbook-2024",
      quote: "In these cases, it is essential to collect the required number of HSC before the first high-dose therapy since mobilization after high-dose therapy has an increased risk of failure.",
    },
    {
      action: "In a patient whose CD34 count is below 10 per microlitre on day 4 to 5 of G-CSF alone, add plerixafor; consider it between 10 and 20",
      why: "Plerixafor releases stem cells that G-CSF alone has not moved, and adding it early avoids a failed collection and a second attempt.",
      source: "ebmt-handbook-2024",
      quote: "Plerixafor is recommended when the CD34+ is <10/μL on days 4–5 of mobilization with G-CSF alone.",
    },
    {
      action: "If the first apheresis collects less than a third of the target, add plerixafor as rescue",
      why: "A poor first day predicts that the target will not be reached without extra help.",
      source: "ebmt-handbook-2024",
      quote: "Furthermore, if it is not possible to collect at least one-third of the collection goal with the first apheresis session, plerixafor should be applied as a rescue strategy because of high risk of mobilization failure (Mohty et al. 2014; Cheng et al. 2015).",
    },
    {
      action: "Give plerixafor under the skin about 11 hours before each apheresis, for up to 4 consecutive days",
      why: "The injection is timed so that the stem cell count in the blood is high when the collection starts, which in practice means an evening dose for a morning session.",
      source: "mozobil-label",
      quote: "Administer Mozobil approximately 11 hours prior to initiation of each apheresis for up to 4 consecutive days.",
      grade: "Prescribing information, section 2.1",
    },
    {
      action: "Collect through veins in the arms where possible; in a donor use a central venous catheter only in exceptional circumstances and record why",
      why: "A central line carries risks of its own that a healthy donor should not be exposed to without good reason.",
      source: "wmda-standards-2024",
      quote: "The registry must have a policy concerning the use of a central venous catheter in donors to ensure that a central venous catheter is only used in exceptional circumstances. Those circumstances must be documented.",
      grade: "Standard 8.05.2 (must)",
    },
    {
      action: "Keep a donor's apheresis session to no more than 5 hours and to no more than two consecutive sessions; in patients, stop after three consecutive sessions",
      why: "The Handbook says more sessions are futile in most cases, and a healthy donor should not be kept on the machine for little gain.",
      source: "ebmt-handbook-2024",
      quote: "In the allogeneic setting, the duration of one leukapheresis session should not exceed 5 h and two consecutive sessions.",
    },
    {
      action: "Have a written plan for a donor who does not mobilise enough cells, including whether to switch to a bone marrow collection",
      why: "The patient may already have started conditioning, so the fallback must be agreed before it is needed.",
      source: "wmda-standards-2024",
      quote: "These policies must include the procedure to follow in case of failed mobilisation, including the potential to switch to a bone marrow collection if necessary.",
      grade: "Standard 8.05.1 (must)",
    },
    {
      action: "Follow donors up straight after donation and keep a route open for them to report health concerns for at least ten years",
      why: "Donors are healthy volunteers, and any late effect of donating can only be found if someone keeps asking.",
      source: "wmda-standards-2024",
      quote: "The registry must have policies and procedures for the long-term follow-up and care of donors for conditions related to the HSC donation, including a mechanism for donors to contact the registry to report related medical concerns for a minimum of ten (10) years after donation.",
      grade: "Standard 9.02 (must)",
    },
  ],
  bestInClass: {
    statement: "Donor safety has the firmest footing: the requirements here are 'must' and 'shall' standards of the World Marrow Donor Association (2024) and FACT-JACIE (ninth edition, version 9.1), which registries and transplant programmes are accredited against. For mobilising patients there is no single graded guideline that could be read in full. The steps follow the EBMT Handbook (2024), a handbook of expert chapters that draws on the EBMT position statement of 2014, with doses and timings from the manufacturers' labels. Two positions on plerixafor are shown side by side: the Handbook's count-guided use (added only when the blood CD34 count or the first collection is low) and the US label's use in every patient with lymphoma or myeloma after 4 days of filgrastim. The American guidance of 2014 (ASBMT) could be read as abstracts only, which state no thresholds or targets, so its positions on CD34 targets and pre-emptive plerixafor are not shown; this is a named gap, not agreement.",
    sources: ["wmda-standards-2024", "fact-jacie-2025", "ebmt-handbook-2024", "ebmt-mobilisation-2014", "mozobil-label", "neupogen-label"],
  },
  variants: [
    {
      name: "Plerixafor for everyone, or only when counts are low",
      differs: "The US label gives plerixafor to all patients with non-Hodgkin lymphoma or myeloma: \"Initiate Mozobil treatment after the patient has received filgrastim once daily for 4 days.\" The count-guided ('pre-emptive' or 'just-in-time') approach in the EBMT Handbook adds it only below a blood CD34 threshold or after a poor first collection.",
      evidence: "The Handbook: \"If a patient has below 20 CD34+ cells/μL, plerixafor application should be considered.\" Between 10 and 20 it leaves the decision to disease and treatment history, and for people with known risk factors for poor mobilisation says pre-emptive use should be considered. It reports that plerixafor reduces the number of apheresis sessions. The EBMT 2014 abstract supports measuring the CD34 count before apheresis to allow pre-emptive intervention; its full text could not be read, and its medical writing was funded by a grant from the maker of plerixafor.",
      sources: ["mozobil-label", "ebmt-handbook-2024", "ebmt-mobilisation-2014"],
    },
    {
      name: "Chemotherapy with G-CSF rather than G-CSF alone",
      differs: "Gives a dose of chemotherapy (often cyclophosphamide 2 g per square metre, or the person's planned lymphoma chemotherapy) followed by G-CSF, with daily CD34 counts as the blood recovers, instead of G-CSF alone.",
      evidence: "The Handbook's key point: \"Mobilization with chemotherapy plus G-CSF is the preferred method for patients who will need decrease of tumor burden or who have to collect a high number of HSC.\" It lists the costs as chemotherapy toxicity, a hospital stay in most cases, marrow damage that may impair later mobilisation and higher cost, says relapse rates are comparable between the two strategies, and that 4 g per square metre of cyclophosphamide adds toxicity over 2 g.",
      sources: ["ebmt-handbook-2024"],
    },
    {
      name: "Motixafortide instead of plerixafor in myeloma",
      differs: "A newer injection, given once 10 to 14 hours before the first apheresis, with a possible second dose before a third apheresis.",
      evidence: "US label only: \"APHEXDA is indicated in combination with filgrastim (G-CSF) to mobilize hematopoietic stem cells to the peripheral blood for collection and subsequent autologous transplantation in patients with multiple myeloma.\" The label's safety data come from 92 patients given motixafortide and 42 given placebo, each with filgrastim, in the GENESIS study. No guideline read compares it with plerixafor, and the EBMT Handbook chapter (2024) does not mention it.",
      sources: ["aphexda-label"],
    },
    {
      name: "Collecting more than the minimum, and large-volume apheresis",
      differs: "Some centres aim for the Handbook's optimal range (2.5 to 5 million CD34 cells per kg for an autologous transplant) and process more than four times the person's blood volume in a session.",
      evidence: "The Handbook says higher yields have been associated with faster blood count recovery, shorter hospital stay and fewer transfusions, and advises: \"It may be advantageous to collect cells in this range, if the mobilization status of the patient allows it without additional leukapheresis session.\" For allogeneic grafts it also reports a study in which very high doses went with more extensive chronic graft-versus-host disease (62% against 34% at 4 years above and below 8.3 million per kg, sibling transplants).",
      sources: ["ebmt-handbook-2024"],
    },
    {
      name: "Plerixafor in healthy donors who mobilise poorly",
      differs: "Adds plerixafor to G-CSF for a donor whose CD34 count stays low, outside the licence.",
      evidence: "The Handbook: \"The use of plerixafor is not approved for allogeneic SCT.\" It puts mobilisation failure in healthy donors at an estimated 5% to 10% and cites case series in which adding plerixafor raised CD34 cells about three-fold. The WMDA standards require a failed-mobilisation procedure, including a possible switch to marrow collection, and do not name a drug.",
      sources: ["ebmt-handbook-2024", "wmda-standards-2024", "mozobil-label"],
    },
    {
      name: "Children and others who cannot consent as donors",
      differs: "A child may be asked to donate for a brother or sister, which no adult volunteer standard covers in full.",
      evidence: "FACT-JACIE: \"A donor advocate shall be available to represent allogeneic donors who are minors or who do not have the capacity to give consent, as those terms are defined by Applicable Law.\" The EBMT Handbook's paediatric chapter: \"Minors should only be recruited as HSC donors if no medically equivalent histocompatible adult is available for donation and if there is a reasonable likelihood that the recipient will benefit from the procedure.\" It adds that donors under 4 years have a higher risk of complications, including from central line placement before apheresis.",
      sources: ["fact-jacie-2025", "ebmt-handbook-2024"],
    },
  ],
  grades: [
    { claim: "Donor fitness examined or supervised by a physician independent of the patient's care", grade: "Standard 3.22.3.1 (must)", source: "wmda-standards-2024" },
    { claim: "Pregnancy test and counselling before mobilising agents for donors of childbearing potential", grade: "Standard 3.22.3.2 (must)", source: "wmda-standards-2024", quote: "Female donors of childbearing potential must have a pregnancy test and be counselled to avoid pregnancy during the workup stage before use of mobilising agents, collection or initiation of the recipient’s preparative regimen, whichever occurs first." },
    { claim: "Upper age for unrelated donors selected to donate should not exceed 60 years", grade: "Standard 3.16.1 (should)", source: "wmda-standards-2024", quote: "The upper age limit for prospective donors selected to donate haematopoietic stem cells should not exceed sixty (60) years." },
    { claim: "Rationale for central venous access in a donor to be documented", grade: "Standard C6.3.10 (shall)", source: "fact-jacie-2025", quote: "If central venous access is required, the rationale shall be documented in the donor’s records." },
    { claim: "Mobilisation appropriate to the disease and the donor", grade: "Standard B6.3.4.1 (shall)", source: "fact-jacie-2025", quote: "Appropriate mobilization shall be used for the disease being treated and for the donor being collected." },
    { claim: "Plerixafor 'clearly indicated' below 10 CD34 cells per microlitre", grade: "Handbook advice (ungraded)", source: "ebmt-handbook-2024", quote: "Below 10 CD34+ cells/μL, the use of plerixafor is clearly indicated to avoid mobilization failure." },
    { claim: "The blood CD34 count before apheresis is the strongest predictor of a poor collection", grade: "Position statement (ungraded)", source: "ebmt-mobilisation-2014", quote: "Determination of the CD34+ cell count in PB before apheresis helps to identify patients at risk of poor PBSC collection and allows pre-emptive intervention to rescue mobilisation in these patients." },
    { claim: "Plerixafor is licensed (US) with filgrastim for autologous collection in non-Hodgkin lymphoma and myeloma", grade: "Prescribing information, section 1", source: "mozobil-label", quote: "Mozobil is indicated in combination with filgrastim to mobilize hematopoietic stem cells (HSCs) to the peripheral blood for collection and subsequent autologous transplantation in patients with non-Hodgkin's lymphoma (NHL) or multiple myeloma (MM)." },
    { claim: "Filgrastim is licensed (US) for mobilising autologous progenitor cells", grade: "Prescribing information, section 1", source: "neupogen-label", quote: "NEUPOGEN is indicated for the mobilization of autologous hematopoietic progenitor cells into the peripheral blood for collection by leukapheresis" },
    { claim: "An optimal mobilisation regimen has not been defined (ASBMT 2014)", grade: "Guideline abstract (grades not read)", source: "asbmt-duong-2014", quote: "However, an optimal stem cell mobilization regimen has not been defined." },
  ],
  sources: [
    {
      key: "wmda-standards-2024",
      label: "2024 WMDA Standards (international standards for unrelated haematopoietic stem cell donor registries)",
      publisher: "World Marrow Donor Association",
      year: 2024,
      url: "https://wmda.info/wp-content/uploads/2024/01/2024-WMDA-Stnds_20240101-final.pdf",
      gradingScheme: "Accreditation standards, not graded evidence: each is worded 'must' (required) or 'should' (recommended).",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "fact-jacie-2025",
      label: "FACT-JACIE International Standards for Hematopoietic Cellular Therapy Product Collection, Processing, and Administration, Ninth Edition, version 9.1",
      publisher: "Foundation for the Accreditation of Cellular Therapy (FACT) and JACIE (ISCT and EBMT)",
      year: 2025,
      url: "https://www.ebmt.org/sites/default/files/2025-12/FACT-JACIE%20HCT%20Standards%209th%20Ed_V9-1.pdf",
      gradingScheme: "Accreditation standards, not graded evidence: 'shall' means the standard is to be complied with at all times; 'should' is recommended or advised, with possible effective alternatives.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ebmt-handbook-2024",
      label: "The EBMT Handbook: Hematopoietic Cell Transplantation and Cellular Therapies, 8th edition, chapter 16 (Mobilization and Collection of HSC) and chapter 17 (children)",
      publisher: "EBMT (Springer; Sureda, Corbacioglu, Greco, Kröger and Carreras, editors). A handbook of expert chapters, not a graded guideline",
      year: 2024,
      url: "https://www.ncbi.nlm.nih.gov/books/NBK608238/",
      doi: "10.1007/978-3-031-44080-9_16",
      gradingScheme: "None: the chapters give their authors' advice and cite the studies behind it.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ebmt-mobilisation-2014",
      label: "Autologous haematopoietic stem cell mobilisation in multiple myeloma and lymphoma patients: a position statement from the European Group for Blood and Marrow Transplantation",
      publisher: "EBMT (Bone Marrow Transplantation, Mohty et al.). Medical writing funded by an unrestricted grant from Sanofi (industry)",
      year: 2014,
      url: "https://doi.org/10.1038/bmt.2014.39",
      doi: "10.1038/bmt.2014.39",
      gradingScheme: "Expert position statement; no grades in the abstract.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "asbmt-duong-2014",
      label: "Peripheral blood progenitor cell mobilization for autologous and allogeneic hematopoietic cell transplantation: guidelines from the American Society for Blood and Marrow Transplantation",
      publisher: "Biology of Blood and Marrow Transplantation (Duong et al.)",
      year: 2014,
      url: "https://doi.org/10.1016/j.bbmt.2014.05.003",
      doi: "10.1016/j.bbmt.2014.05.003",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "asbmt-giralt-2014",
      label: "Optimizing autologous stem cell mobilization strategies to improve patient outcomes: consensus guidelines and recommendations",
      publisher: "Biology of Blood and Marrow Transplantation (Giralt et al.)",
      year: 2014,
      url: "https://doi.org/10.1016/j.bbmt.2013.10.013",
      doi: "10.1016/j.bbmt.2013.10.013",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "wbmt-related-donors-2015",
      label: "Suitability Criteria for Adult Related Donors: A Consensus Statement from the Worldwide Network for Blood and Marrow Transplantation Standing Committee on Donor Issues",
      publisher: "Biology of Blood and Marrow Transplantation (Worel et al.)",
      year: 2015,
      url: "https://doi.org/10.1016/j.bbmt.2015.08.009",
      doi: "10.1016/j.bbmt.2015.08.009",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "neupogen-label",
      label: "NEUPOGEN (filgrastim) injection: US prescribing information (manufacturer's label)",
      publisher: "Amgen (industry), on DailyMed, US National Library of Medicine",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=97cc73cc-b5b7-458a-a933-77b00523e193",
      gradingScheme: "A regulator-approved label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "mozobil-label",
      label: "MOZOBIL (plerixafor) injection: US prescribing information (manufacturer's label)",
      publisher: "Sanofi (industry), on DailyMed, US National Library of Medicine",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0ed08d2b-5051-46b2-aa37-1d6275bf9003",
      gradingScheme: "A regulator-approved label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "aphexda-label",
      label: "APHEXDA (motixafortide) for injection: US prescribing information (manufacturer's label)",
      publisher: "BioLineRx (industry), on DailyMed, US National Library of Medicine",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f7cdc584-ebf0-a68e-e053-6294a90a9ea9",
      gradingScheme: "A regulator-approved label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
  ],
  drugs: ["filgrastim", "lenograstim", "plerixafor", "motixafortide"],
  technologies: ["autologous-stem-cell-transplant", "allogeneic-hsct"],
  terms: ["apheresis"],
  related: [
    "hct-conditioning-and-engraftment-care",
    "car-t-apheresis",
    "apheresis-starting-material",
    "g-csf-growth-factors",
    "cd34",
    "wmda",
    "nmdp",
    "anthony-nolan",
  ],
  upgrades: [],
  gaps: [
    "The American guidance (ASBMT guidelines, Duong 2014, and the consensus of Giralt 2014) could be read as abstracts only, and the abstracts give no CD34 target and no plerixafor threshold. Where the American and European positions differ on targets or on pre-emptive plerixafor is therefore not shown on this page. No newer ASTCT guideline on mobilisation was found.",
    "The EBMT position statement of 2014, which the Handbook cites for the start-of-apheresis threshold and the minimum dose, was read as an abstract only. Its medical writing was funded by a grant from the maker of plerixafor.",
    "No source read grades its recommendations on mobilising patients: the Handbook is expert advice and the labels are manufacturers' documents. The count thresholds (10 and 20 CD34 cells per microlitre) are consensus figures.",
    "The European product information for plerixafor, filgrastim and lenograstim was not read; licensed indications and doses are given from the US labels and, for European doses of filgrastim and lenograstim, from the Handbook. Lenograstim has no US label.",
    "Related (family) donors are outside the WMDA registry standards. The Worldwide Network consensus on related donors who would not qualify as unrelated donors (2015) was read as an abstract only, so its criteria are not given.",
    "Motixafortide appears only in its own label; no guideline or handbook read places it against plerixafor.",
    "Daratumumab-containing induction for myeloma is reported in the Handbook to increase the need for plerixafor; how to adapt mobilisation to it is not settled by any source read.",
    "Calcium replacement during apheresis, citrate reactions, vein assessment and the day-of-collection nursing checks were not found in a guideline that could be read and are not written as steps. The CAR-T apheresis protocol covers some of the same ground for lymphocyte collection.",
    "The WMDA standards read are the 2024 edition, which the WMDA standards page offered on the access date; WMDA's separate donor medical suitability recommendations were not read.",
    "The EBMT Handbook was read from NCBI's open-access archive package because the publisher's site and the Bookshelf web pages refused a script.",
  ],
});
