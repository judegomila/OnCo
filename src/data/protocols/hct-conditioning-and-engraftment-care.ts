import { protocol } from "./helpers";

/*
 * Haematopoietic cell transplant: giving the conditioning, caring for the patient through the weeks of low blood
 * counts, and documenting engraftment. The neighbouring protocols (GVHD prophylaxis, antifungal, antiviral and
 * pneumocystis prophylaxis, transfusion thresholds, the first hour of neutropenic fever, mouth care, food safety,
 * vaccination) are linked in `related` and their steps are not repeated here.
 *
 * What was read, and how (all on 16 November 2026, fetched raw and read as text):
 * - The EBMT Handbook, 8th edition (Sureda, Corbacioglu, Greco, Kroger, Carreras, editors; Springer 2024), the
 *   current edition: full text of chapters 13 (Conditioning), 21 (Documentation of engraftment and chimerism),
 *   22 (Short- and long-term controls), 24 (Transfusion support), 27 (Infection control and isolation), 41 (Graft
 *   failure) and 42 (Early complications of endothelial origin). link.springer.com answered a script with a bot
 *   challenge and the NCBI Bookshelf pages with a reCAPTCHA; neither was bypassed. The book is open access (CC BY 4.0)
 *   and NCBI publishes it as a package in its open-access literature archive
 *   (ftp.ncbi.nlm.nih.gov/pub/litarch/47/b6/spr9783031440809_NBK608238.tar.gz), which is what was read: the chapter
 *   XML stripped to text. It is a handbook of expert chapters, not a graded guideline, and is labelled so below.
 * - FACT-JACIE International Standards for Hematopoietic Cellular Therapy, Ninth Edition, version 9.1 (published
 *   17 December 2025, effective 2 February 2026), the current edition: full text, PDF from ebmt.org read with
 *   pdftotext -layout; section B7 read in full.
 * - Sureda et al., Bone Marrow Transplantation 2024: harmonised definitions of haematopoietic recovery, graft failure
 *   and chimerism for EBMT, ASTCT, CIBMTR and APBMT: full text, Europe PMC (PMC11161398).
 * - Kharfan-Dabaja et al., Transplantation and Cellular Therapy 2021, the ASTCT definitions the 2024 paper endorses:
 *   abstract only (not in PubMed Central).
 * - Tomblyn et al., Biol Blood Marrow Transplant 2009, the global guidelines for preventing infection in transplant
 *   recipients (CIBMTR, NMDP, EBMT, ASBMT, CBMTG, IDSA, SHEA, AMMI, CDC): full text, Europe PMC (PMC3103296). The
 *   sections on room ventilation, isolation, hand hygiene, growth factors and oral care were read; the pathogen
 *   chapters were not. No later edition was found; the 2024 EBMT Handbook still cites it as the dedicated guideline.
 * - Busulfex (busulfan) injection, US prescribing information (Otsuka, industry; DailyMed set id
 *   5cb9d285-1803-4a99-946a-d0b239b32df6): full text of the label XML. Used only for what a label is the right source
 *   for: premedication and monitoring with that drug.
 * - Palmer et al., Biol Blood Marrow Transplant 2016, ASBMT considerations on personalised busulfan dosing: abstract
 *   only.
 * - Greco et al., Bone Marrow Transplantation 2025, EBMT practice recommendations on indications: full text obtained
 *   from Europe PMC (PMC12583170) and searched for statements on quality standards; the disease-by-disease indication
 *   tables are not used here.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are checked by script against
 * the saved text. Neutrophil and platelet thresholds are quoted in the per-microlitre form the 2024 paper's table
 * prints, because superscripts in the SI form do not survive conversion to text.
 */
export const hctConditioningAndEngraftmentCare = protocol({
  id: "hct-conditioning-and-engraftment-care",
  name: "Stem cell transplant: conditioning, the low blood count phase and engraftment monitoring",
  aka: ["haematopoietic cell transplant conditioning", "HCT conditioning", "HSCT conditioning", "bone marrow transplant conditioning", "preparative regimen", "engraftment monitoring", "neutrophil engraftment", "platelet engraftment", "graft failure", "chimerism testing", "engraftment syndrome", "neutropenic phase after transplant"],
  domain: "cell-therapy-toxicity",
  tldr: "Before a stem cell transplant, a few days of strong chemotherapy, sometimes with radiotherapy, called conditioning, clear space in the bone marrow for the new cells. For about two to four weeks afterwards the blood counts are very low, so the team protects against infection, gives transfusions and checks the blood every day until the new cells start working, which is called engraftment.",
  simple: "First you have strong treatment to prepare your body. Then you are given the stem cells through a drip. For a few weeks your blood counts are very low, so you stay in a clean room, staff and visitors clean their hands, and your blood is tested every day. When the counts start to rise, the new cells have taken.",
  summary: "This protocol covers the weeks from the start of conditioning to documented engraftment; the reader's own unit's policy comes first. Before conditioning starts, the attending physician confirms that the donor or product is available and suitable, and the regimen is given from standardised orders checked by a pharmacist and verified at the bedside by two people or one person with a validated process (FACT-JACIE 9.1, B7.2 and B7.4, all 'shall' standards). Total body irradiation needs a prior radiation oncology consultation (B7.5.1). Regimen intensity (myeloablative, reduced toxicity, reduced intensity, non-myeloablative) is chosen by age, comorbidity, disease status and measurable residual disease (EBMT Handbook 2024). High-dose busulfan needs anticonvulsant cover from 12 hours before to 24 hours after and daily counts until engraftment (label). Two qualified people verify the patient, the product and the order before infusion (B7.6.5). During neutropenia: a single room (2009 global guidelines BIII; a protective environment room with HEPA filtration 'ideally', AIII for the filter), hand hygiene (AII), irradiated cellular blood components (Handbook). On growth factor after transplant the sources differ: the 2009 guidelines make no recommendation (CI); the Handbook advises considering G-CSF where the risk of graft failure is high. Neutrophil recovery is the first of 3 successive days with a count of 500 per microlitre or more; platelet recovery the first of 3 days at 20,000 per microlitre or more with no platelet transfusion for 7 days; primary graft failure is no neutrophil recovery by day +30 (blood or marrow grafts) or day +42 (cord blood), with pancytopenia, confirmed by chimerism (EBMT, ASTCT, CIBMTR and APBMT, 2024). Fever with rash or breathlessness around engraftment that is not infection may be engraftment syndrome.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team"],
    where: ["ward", "radiotherapy-department", "outpatient-clinic"],
  },
  population: "Adults and children having an autologous (own cells) or allogeneic (donor cells) haematopoietic cell transplant. The FACT-JACIE standards apply to autologous and allogeneic transplant programmes; the 2024 definitions of recovery, graft failure and chimerism were agreed for allogeneic transplants only, by adult and paediatric panels. Regimens, doses and schedules differ by disease, donor and unit and are not set out here. This page explains care that a transplant team delivers in hospital; the reader's own team's protocol comes first.",
  trigger: "A transplant date has been set and the conditioning (preparative) regimen is about to start. The protocol ends when neutrophil and platelet recovery are documented, or graft failure is diagnosed.",
  steps: [
    {
      action: "Confirm that the donor or the stored cells are available and suitable before the first dose of conditioning",
      why: "Myeloablative conditioning destroys the bone marrow, so it must never start unless the cells that will rescue it are certain to be there.",
      source: "fact-jacie-2025",
      quote: "The attending physician shall confirm the availability and suitability of a donor or cellular therapy product prior to initiating the recipient’s preparative regimen.",
      grade: "Standard B7.2 (shall)",
    },
    {
      action: "Choose the intensity of conditioning by the person's age, other illnesses and disease status, including measurable residual disease",
      why: "Stronger regimens lower the chance of the cancer returning but are harder on the body; gentler ones let older or less fit people have a transplant.",
      source: "ebmt-handbook-2024",
      quote: "The conditioning regimen pretransplantation should take into consideration patient and disease characteristics, including age, comorbidities, and disease status, including measurable residual disease.",
    },
    {
      action: "Write the conditioning on preprinted or electronic standard orders, verified by an attending physician, with current height and weight, dates, daily doses and routes",
      why: "These are among the highest drug doses used in medicine, and a standard order set removes arithmetic and transcription errors.",
      source: "fact-jacie-2025",
      quote: "Preprinted orders or electronic equivalent shall be used for protocols and standardized regimens. These orders shall be verified and documented by an attending physician.",
      grade: "Standard B7.4.2 (shall)",
    },
    {
      action: "Have the pharmacist check each dose against the protocol when verifying or preparing the drug",
      why: "An independent check by a second profession catches an error before the drug is made.",
      source: "fact-jacie-2025",
      quote: "The pharmacist verifying or preparing the drug shall check and document the dose against the protocol or standardized regimen listed on the orders.",
      grade: "Standard B7.4.3 (shall)",
    },
    {
      action: "At the bedside, verify the drug and dose against the orders and the protocol, and the identity of the patient, with two qualified people or one using a validated process",
      why: "The last check happens where the drug meets the patient, which is where a mix-up would do harm.",
      source: "fact-jacie-2025",
      quote: "Prior to administration of the preparative regimen, one (1) qualified person using a validated process or two (2) qualified persons shall verify and document:",
      grade: "Standard B7.4.4 (shall)",
    },
    {
      action: "If the regimen includes total body irradiation, arrange a consultation with a radiation oncologist before treatment starts",
      why: "The radiotherapy doctor needs to know about earlier radiotherapy and anything else that could make the radiation more harmful, and to plan how it is delivered.",
      source: "fact-jacie-2025",
      quote: "There shall be a consultation with a radiation oncologist prior to initiation of therapy if radiation treatment is used in the preparative regimen.",
      grade: "Standard B7.5.1 (shall)",
    },
    {
      action: "If the regimen includes high-dose busulfan, give an anticonvulsant from 12 hours before the first dose until 24 hours after the last, and antiemetics on a fixed schedule",
      why: "High-dose busulfan can cause seizures, and medicine given beforehand prevents them.",
      source: "busulfex-label",
      quote: "Premedicate patients with anticonvulsants (e.g., benzodiazepines, phenytoin, valproic acid or levetiracetam) to prevent seizures reported with the use of high dose BUSULFEX. Administer anticonvulsants 12 hours prior to BUSULFEX to 24 hours after the last dose of BUSULFEX",
      grade: "Prescribing information, section 2.1",
    },
    {
      action: "Before the cells are infused, have two qualified people verify the identity of the patient, the product and the order",
      why: "The cells are irreplaceable and matched to one person, so they are checked like a blood transfusion, twice.",
      source: "fact-jacie-2025",
      quote: "Two (2) qualified persons shall verify the identity of the recipient and the product and the order for administration prior to the administration of the cellular therapy product.",
      grade: "Standard B7.6.5 (shall)",
    },
    {
      action: "Nurse the patient in a single room where possible while the counts are low",
      why: "A room of one's own, with clean filtered air where the unit has it, lowers the chance of catching an infection from other people or from mould spores in the air.",
      source: "global-infection-guidelines-2009",
      quote: "HCT recipients should be placed in single-patient rooms (BIII), if possible.",
      grade: "BIII",
    },
    {
      action: "Clean your hands before and after every contact with the patient, and ask visitors to do the same",
      why: "Hands carry most hospital infections from one person to the next, and a person with no white cells cannot fight them.",
      source: "global-infection-guidelines-2009",
      quote: "Hand hygiene is the mainstay of infection prevention in the hospital, and is an essential element of Standard Precautions for all patients (AII)",
      grade: "AII",
    },
    {
      action: "Take a full blood count with differential and platelets every day until engraftment is shown",
      why: "The daily count shows when transfusions are needed and is how the first sign of the new marrow working is seen.",
      source: "busulfex-label",
      quote: "Monitor complete blood counts, including white blood cell differentials, and quantitative platelet counts daily during treatment and until engraftment is demonstrated.",
      grade: "Prescribing information, section 5.1",
    },
    {
      action: "Give only irradiated red cells, platelets and granulocytes",
      why: "Living white cells in donated blood can attack a person whose immune system has been wiped out; irradiating the blood stops them dividing.",
      source: "ebmt-handbook-2024",
      quote: "HCT recipients are at a risk of ta-GvHD and should receive irradiated cellular blood products (Kopolovic et al. 2015).",
    },
    {
      action: "Record neutrophil recovery on the first of 3 successive days with a neutrophil count of 500 per microlitre (0.5 thousand million per litre) or more",
      why: "An agreed definition lets the team, the patient and the registries mean the same thing by engraftment.",
      source: "ebmt-astct-definitions-2024",
      quote: "Both panels endorsed the existing definition of neutrophil recovery as the first of 3 successive days with an absolute neutrophil count of ≥500/μL after post-transplantation nadir.",
      grade: "Consensus (at least 70% of the panel agreeing)",
    },
    {
      action: "Record platelet recovery on the first of 3 consecutive days with a platelet count of 20,000 per microlitre or more and no platelet transfusion in the previous 7 days",
      why: "Platelets usually recover after neutrophils, and a count that holds without transfusion shows the marrow is making its own.",
      source: "ebmt-astct-definitions-2024",
      quote: "Both panels endorsed the definition of platelet recovery as the first of 3 consecutive days with a platelet count of 20,000/μL or higher in the absence of platelet transfusion for 7 consecutive days.",
      grade: "Consensus (at least 70% of the panel agreeing)",
    },
    {
      action: "If fever, a widespread rash, breathlessness or weight gain appear around the time the counts rise and no infection is found, think of engraftment syndrome: stop G-CSF, take cultures and start broad-spectrum antibiotics, then consider a corticosteroid",
      why: "The returning white cells can inflame small blood vessels. It looks like infection, so infection is treated first, and it usually settles quickly with a steroid.",
      source: "ebmt-handbook-2024",
      quote: "Stop G-CSF immediately, obtain cultures, and start broad-spectrum ATB.",
    },
    {
      action: "If the neutrophil count has not reached 500 per microlitre by day +30 after a blood or marrow graft, or day +42 after cord blood, and the other counts are low, assess for graft failure and test donor chimerism",
      why: "A graft that has not taken needs to be recognised early, because the options (stopping marrow-toxic drugs, growth factor, more donor cells or a second transplant) work better before infection or bleeding sets in.",
      source: "ebmt-astct-definitions-2024",
      quote: "PBSCs: Both panels defined graft failure as lack of achievement of an ANC ≥500/μL by day +30 with associated pancytopenia.",
      grade: "Consensus (at least 70% of the panel agreeing)",
    },
    {
      action: "After a donor transplant, measure donor chimerism in blood or marrow and report it as full (more than 95% donor), mixed (5% to 95%) or absent (less than 5%)",
      why: "Chimerism shows whether the new blood cells come from the donor, which a blood count alone cannot tell.",
      source: "ebmt-astct-definitions-2024",
      quote: "Full: Both panels endorsed the existing definition of full donor chimerism as >95% for both myeloid and lymphoid lineages.",
      grade: "Consensus (at least 70% of the panel agreeing)",
    },
  ],
  bestInClass: {
    statement: "No single graded guideline covers this stretch of care, and the page says which kind of source each part rests on. The safety checks around conditioning and cell infusion are requirements of the FACT-JACIE standards (ninth edition, version 9.1, effective February 2026), which EBMT's 2025 indications paper recommends units work to. The definitions of neutrophil and platelet recovery, graft failure and chimerism are the 2024 consensus of EBMT, ASTCT, CIBMTR and APBMT, which endorsed the 2021 ASTCT definitions with two changes (SI units, and mixed chimerism counted when it affects one lineage). Infection control rests on the 2009 global guidelines, whose infection control recommendations are almost all graded III (expert opinion), and on the EBMT Handbook (2024), a handbook of expert chapters rather than a guideline. They differ in two places, both shown: the 2009 guidelines say recipients should ideally be in protective environment rooms with HEPA filtration, while the Handbook says there is no consensus on a specific protective environment and asks for a single room with adequate ventilation; and the 2009 guidelines make no recommendation on growth factor after transplant (CI), while the Handbook advises considering it for people at high risk of graft failure. Drug-specific steps (busulfan) come from the manufacturer's label.",
    sources: ["fact-jacie-2025", "ebmt-astct-definitions-2024", "global-infection-guidelines-2009", "ebmt-handbook-2024", "ebmt-indications-2025"],
  },
  variants: [
    {
      name: "Protective environment room with HEPA-filtered air and positive pressure",
      differs: "Places every recipient, rather than only those at highest risk, in a sealed room with at least 12 air changes an hour, HEPA filtration and positive pressure. The 2009 global guidelines state: \"HCT recipients should ideally be placed in Protective Environment rooms that incorporate the following features:\" and, when such rooms are short, give them first to those at highest risk of mould infection (BIII).",
      evidence: "The EBMT Handbook (2024) takes a more reserved position: \"There is no consensus on specific protective environment, also called reverse isolation, for neutropenic patients.\" It notes that HEPA-filtered rooms are available in almost all centres while few centres meet every listed requirement, and that no clear benefit has been shown for routine footwear exchange, gloves or gowns. The 2009 guidelines grade the filter AIII and the other room features BIII, both expert opinion.",
      sources: ["global-infection-guidelines-2009", "ebmt-handbook-2024"],
    },
    {
      name: "G-CSF after the transplant to speed neutrophil recovery",
      differs: "Gives a growth factor such as filgrastim from a few days after the infusion until the neutrophil count recovers. Practice differs between units and between autologous and allogeneic transplants.",
      evidence: "The 2009 global guidelines: \"Therefore, the routine use of growth factors after HCT is controversial and no recommendation for their use can be made (CI).\" They say growth factors shorten neutropenia and may slightly reduce infection but have not been shown to reduce mortality. The EBMT Handbook's graft failure chapter, for people at high risk of graft failure, recommends measures that include to \"consider the use of G-CSF posttransplant, and closely evaluate the engraftment including marrow chimerism studies shortly after transplant (day +14)\", while calling these measures barely supported by well-designed studies. The Handbook also tells teams to stop G-CSF at once if engraftment syndrome is suspected. The ASCO guideline on white cell growth factors (2015) was read as an abstract only, and the abstract does not state its transplant recommendation, so it is not used.",
      sources: ["global-infection-guidelines-2009", "ebmt-handbook-2024"],
    },
    {
      name: "Busulfan dose adjusted to blood levels",
      differs: "Measures busulfan in the blood after an early dose and adjusts later doses to a target exposure, instead of dosing by weight alone.",
      evidence: "The US label warns of a higher risk of hepatic veno-occlusive disease above a stated exposure. The ASBMT Practice Guidelines Committee (2016) set out to grade the evidence and reported that \"the published literature was too heterogeneous and lacked adequately powered and sufficiently controlled studies for this to be feasible\", publishing answers to frequently asked questions instead; only the abstract was read. The EBMT Handbook says intravenous busulfan, with more predictable levels than tablets, reduced the need for level testing.",
      sources: ["asbmt-busulfan-2016", "busulfex-label", "ebmt-handbook-2024"],
    },
    {
      name: "How long irradiated blood components are continued",
      differs: "Some centres stop irradiated components at a set time after transplant; others continue them for life.",
      evidence: "The EBMT Handbook (2024): \"There is no consensus on the duration of the use of irradiated blood products in HCT recipients\". It gives standard practice as from at least 2 weeks before stem cell collection until at least 3 months after an autologous transplant, and from conditioning at the latest until at least 6 months after an allogeneic transplant or until immune reconstitution.",
      sources: ["ebmt-handbook-2024"],
    },
    {
      name: "Diagnostic criteria for engraftment syndrome",
      differs: "Three published sets of criteria (Spitzer 2001, Maiolino 2003, Grant 2020) weigh fever, rash, lung signs, weight gain and diarrhoea differently and use different time windows around engraftment.",
      evidence: "The EBMT Handbook reports that the three sets give an incidence anywhere from 7% to 59% after autologous and 10% to 25% after allogeneic transplants, and advises the Maiolino criteria after an autologous transplant and the stricter Spitzer criteria after an allogeneic one, where graft-versus-host disease and infection must be excluded. This is the chapter authors' advice; no guideline grades it.",
      sources: ["ebmt-handbook-2024"],
    },
  ],
  grades: [
    { claim: "Confirm donor or product availability and suitability before conditioning starts", grade: "Standard B7.2 (shall)", source: "fact-jacie-2025" },
    { claim: "Two qualified people verify recipient, product and order before the cells are given", grade: "Standard B7.6.5 (shall)", source: "fact-jacie-2025" },
    { claim: "EBMT recommends that units work to JACIE standards", grade: "Practice recommendation (ungraded)", source: "ebmt-indications-2025", quote: "We also recommend working according to JACIE certification standards to maintain quality in clinical and laboratory practice, including benchmarking of survival outcomes" },
    { claim: "Single-patient rooms for transplant recipients where possible", grade: "BIII", source: "global-infection-guidelines-2009" },
    { claim: "HEPA filtration with 99.97% efficiency in protective environment rooms", grade: "AIII", source: "global-infection-guidelines-2009" },
    { claim: "Alcohol-based hand rub as the preferred method when hands are not visibly soiled", grade: "AII", source: "global-infection-guidelines-2009", quote: "the preferred method of hand hygiene is with an alcohol-based hand rub because of its superior microbicidal activity, reduced drying of the skin, and convenience (AII)" },
    { claim: "Routine growth factor after transplant: no recommendation", grade: "CI", source: "global-infection-guidelines-2009", quote: "Therefore, the routine use of growth factors after HCT is controversial and no recommendation for their use can be made (CI)." },
    { claim: "Daily showers or baths with a mild soap during and after transplantation", grade: "BIII", source: "global-infection-guidelines-2009", quote: "To optimize skin care, HCT recipients should take daily showers or baths using a mild soap during and after transplantation (BIII)." },
    { claim: "Graft failure after cord blood: no neutrophil recovery by day +42 with pancytopenia", grade: "Consensus (at least 70% of the panel agreeing)", source: "ebmt-astct-definitions-2024", quote: "UCB: Both panels defined graft failure as lack of achievement of an ANC ≥500/μL by day +42 with associated pancytopenia." },
    { claim: "Mixed donor chimerism is 5% to 95% in one or both of the myeloid and lymphoid lineages (the 2024 revision)", grade: "Unanimous on the second vote", source: "ebmt-astct-definitions-2024", quote: "Mixed donor chimerism as 5%–95% for either one or both myeloid and lymphoid lineages" },
    { claim: "Infection control recommendations for transplant recipients rest on expert opinion", grade: "Level III", source: "ebmt-handbook-2024", quote: "Hence, recommendations on infection control could only be graded as level III." },
  ],
  sources: [
    {
      key: "fact-jacie-2025",
      label: "FACT-JACIE International Standards for Hematopoietic Cellular Therapy Product Collection, Processing, and Administration, Ninth Edition, version 9.1",
      publisher: "Foundation for the Accreditation of Cellular Therapy (FACT) and JACIE (ISCT and EBMT)",
      year: 2025,
      url: "https://www.ebmt.org/sites/default/files/2025-12/FACT-JACIE%20HCT%20Standards%209th%20Ed_V9-1.pdf",
      gradingScheme: "Accreditation standards, not graded evidence: 'shall' means the standard is to be complied with at all times; 'should' is recommended or advised, with possible effective alternatives; 'may' is permissive.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ebmt-astct-definitions-2024",
      label: "Harmonizing definitions for hematopoietic recovery, graft rejection, graft failure, poor graft function, and donor chimerism in allogeneic hematopoietic cell transplantation: a report on behalf of the EBMT, ASTCT, CIBMTR, and APBMT",
      publisher: "Bone Marrow Transplantation (Sureda et al.)",
      year: 2024,
      url: "https://doi.org/10.1038/s41409-024-02251-0",
      doi: "10.1038/s41409-024-02251-0",
      gradingScheme: "Modified Delphi: consensus was at least 70% of voting panel members strongly or somewhat agreeing. No evidence grades.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "astct-definitions-2021",
      label: "Standardizing Definitions of Hematopoietic Recovery, Graft Rejection, Graft Failure, Poor Graft Function, and Donor Chimerism in Allogeneic Hematopoietic Cell Transplantation: A Report on Behalf of the American Society for Transplantation and Cellular Therapy",
      publisher: "Transplantation and Cellular Therapy (Kharfan-Dabaja et al.)",
      year: 2021,
      url: "https://doi.org/10.1016/j.jtct.2021.04.007",
      doi: "10.1016/j.jtct.2021.04.007",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "global-infection-guidelines-2009",
      label: "Guidelines for Preventing Infectious Complications among Hematopoietic Cell Transplantation Recipients: A Global Perspective",
      publisher: "Biology of Blood and Marrow Transplantation (Tomblyn et al.; CIBMTR, NMDP, EBMT, ASBMT, CBMTG, IDSA, SHEA, AMMI, CDC)",
      year: 2009,
      url: "https://doi.org/10.1016/j.bbmt.2009.06.019",
      doi: "10.1016/j.bbmt.2009.06.019",
      gradingScheme: "Strength A (should always be offered) to E (should never be offered), with C optional; quality of evidence I (at least one randomised controlled trial), II (non-randomised trials, cohort or case-control studies) or III (expert opinion, descriptive studies).",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ebmt-handbook-2024",
      label: "The EBMT Handbook: Hematopoietic Cell Transplantation and Cellular Therapies, 8th edition (chapters 13, 21, 22, 24, 27, 41 and 42)",
      publisher: "EBMT (Springer; Sureda, Corbacioglu, Greco, Kröger and Carreras, editors). A handbook of expert chapters, not a graded guideline",
      year: 2024,
      url: "https://www.ncbi.nlm.nih.gov/books/NBK608238/",
      doi: "10.1007/978-3-031-44080-9",
      gradingScheme: "None: the chapters give their authors' advice and cite the studies behind it.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "busulfex-label",
      label: "BUSULFEX (busulfan) injection: US prescribing information (manufacturer's label)",
      publisher: "Otsuka America Pharmaceutical (industry), on DailyMed, US National Library of Medicine",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5cb9d285-1803-4a99-946a-d0b239b32df6",
      gradingScheme: "A regulator-approved label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "asbmt-busulfan-2016",
      label: "Personalizing Busulfan-Based Conditioning: Considerations from the American Society for Blood and Marrow Transplantation Practice Guidelines Committee",
      publisher: "Biology of Blood and Marrow Transplantation (Palmer et al.)",
      year: 2016,
      url: "https://doi.org/10.1016/j.bbmt.2016.07.013",
      doi: "10.1016/j.bbmt.2016.07.013",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "ebmt-indications-2025",
      label: "Indications for haematopoietic cell transplantation and CAR-T for haematological diseases, solid tumours and immune disorders: 2025 EBMT practice recommendations",
      publisher: "Bone Marrow Transplantation (Greco et al.)",
      year: 2025,
      url: "https://doi.org/10.1038/s41409-025-02701-3",
      doi: "10.1038/s41409-025-02701-3",
      gradingScheme: "Each indication is placed in a category (among them clinical option and developmental); the statement used here is a general recommendation and carries no grade.",
      read: "full-text",
      accessed: "2026-11-16",
    },
  ],
  drugs: ["busulfan"],
  technologies: ["allogeneic-hsct", "autologous-stem-cell-transplant", "total-body-irradiation"],
  terms: ["conditioning-regimen", "neutropenia", "gvhd"],
  related: [
    "allo-hct-gvhd-prophylaxis",
    "hepatic-veno-occlusive-disease-after-transplant",
    "stem-cell-mobilisation-and-collection",
    "febrile-neutropenia-first-hour",
    "antibacterial-prophylaxis-in-neutropenia",
    "antifungal-prophylaxis-in-haematology",
    "herpes-simplex-and-zoster-antiviral-prophylaxis",
    "pneumocystis-pneumonia-prophylaxis",
    "red-cell-and-platelet-transfusion-thresholds",
    "oral-mucositis-prevention-and-oral-care",
    "food-safety-and-neutropenic-diet",
    "neutropenic-precautions-and-daily-life",
    "vaccination-around-cancer-treatment",
    "car-t-lymphodepletion",
    "filgrastim",
    "melphalan",
    "treosulfan",
    "thiotepa",
    "fludarabine",
  ],
  upgrades: [],
  gaps: [
    "No graded international guideline covers the day-to-day nursing and medical care of the conditioning and neutropenic phase as a whole. The steps here are assembled from accreditation standards, a consensus on definitions, a 2009 infection guideline, a handbook and one drug label, and each is marked with its kind of source.",
    "The 2009 global infection guidelines have not been reissued. Most of their infection control recommendations are graded III (expert opinion), and the EBMT Handbook (2024) no longer endorses a specific protective environment for every neutropenic patient.",
    "When to measure chimerism is not settled by the sources read. The 2024 harmonisation paper says it did not address timing and points to the 2021 ASTCT paper, which could be read as an abstract only. The EBMT Handbook's follow-up table lists chimerism at 1 and 2 months after an allogeneic transplant and, for people at high risk of graft failure, marrow chimerism at day +14.",
    "The 2024 definitions were agreed for allogeneic transplants. Definitions of delayed engraftment, and of graft failure after G-CSF-stimulated bone marrow, did not reach consensus in 2021 and were not revisited.",
    "Growth factor after transplant: the ASCO guideline on white cell growth factors (2015) was read as an abstract, which does not state its transplant recommendation, so the page shows only the 2009 guidelines and the Handbook. No later graded recommendation was found.",
    "Daily blood counts until engraftment are stated here from the busulfan label, which speaks for that drug only; no guideline read sets the frequency for other regimens, although every unit does it.",
    "Seizure prophylaxis, hydration, mesna and antiemetic schedules for other conditioning drugs (melphalan, cyclophosphamide, thiotepa, treosulfan) and the delivery of total body irradiation were not read for this page.",
    "The personalised busulfan dosing paper (ASBMT 2016) was read as an abstract only, so its answers on target exposure and sampling are not given here.",
    "The EBMT Handbook was read from NCBI's open-access archive package because the publisher's site and the Bookshelf web pages refused a script.",
  ],
});
