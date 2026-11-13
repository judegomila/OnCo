import { protocol } from "./helpers";

/*
 * Vaccination before, during and after cancer treatment, for adults and children, and for the people they live with.
 * The schedule for revaccination after a stem cell transplant or CAR-T is only outlined here; it is the subject of
 * rejuv-tx-revaccination.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ASCO guideline, Vaccination of Adults With Cancer (Kamboj et al., J Clin Oncol 2024): PubMed Central HTML
 *   (PMC11095883), full text including Table 1 (all recommendations with evidence quality and strength) and Tables 2
 *   to 4. A Europe PMC title search (2024 to 2026) found only the companion Clinical Insights paper, no later edition.
 * - UK Green Book chapter 6 (Contraindications and special considerations, August 2017) and chapter 7
 *   (Immunisation of individuals with underlying medical conditions, January 2020): the PDFs linked from the gov.uk
 *   publication pages, pdftotext, full text.
 * - Indian Academy of Pediatrics consensus on immunisation of children with cancer treated with chemotherapy (2019):
 *   abstract only, from Europe PMC.
 * - ECIL 7 guidelines on vaccination in haematological malignancy without transplant (2019) and the SFCE French
 *   recommendations for children treated for acute leukaemia (2025): abstracts only, from Europe PMC; neither abstract
 *   states a recommendation, so no step rests on them.
 * - IDSA 2013 guideline on vaccination of the immunocompromised host: abstract only; the publisher's page returned a
 *   bot challenge (HTTP 403) to a script.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 */
export const vaccinationAroundCancerTreatment = protocol({
  id: "vaccination-around-cancer-treatment",
  name: "Vaccination before, during and after cancer treatment",
  aka: ["vaccines during chemotherapy", "flu jab during chemotherapy", "live vaccines and cancer", "immunisation and chemotherapy", "household contacts vaccination", "vaccination of children with cancer"],
  domain: "infection-prevention",
  tldr: "Before cancer treatment, the team should check which vaccines a person has had and bring them up to date, ideally two to four weeks before. Non-live vaccines such as the flu jab can still be given during treatment. Live vaccines, such as MMR, chickenpox and the nasal flu spray for the patient, must be avoided during treatment and for months after. Family vaccines protect the patient too.",
  simple: "Ask your cancer team which vaccines you need before treatment starts. Flu and other injected vaccines are usually safe during treatment. Some vaccines that use live germs are not. Your family should have their normal vaccines too.",
  summary: "ASCO (2024, adults) asks clinicians to determine vaccination status and bring newly diagnosed adults up to date on seasonal and age- and risk-based vaccines (moderate, strong), ideally 2 to 4 weeks before treatment, with non-live vaccines allowed during or after chemotherapy, immunotherapy, hormonal treatment, radiation or surgery (moderate, strong). The Green Book (UK, all ages) gives inactivated vaccines at least two weeks before immunosuppressive treatment where possible, and otherwise at any time with re-immunisation considered after recovery. Live vaccines are contraindicated in acute and chronic leukaemia and lymphoma, during and for 6 months after immunosuppressive chemotherapy or radiotherapy, for 12 months after immunosuppressive biologics such as rituximab, for 24 months after a stem cell transplant (and longer with GVHD or ongoing immunosuppression), and for 3 months after high-dose corticosteroids (above 40 mg prednisolone a day, or 2 mg/kg/day in children under 20 kg, for more than a week). Live attenuated nasal influenza vaccine cannot be given to patients with cancer (ASCO).\n\nRevaccination after transplant starts at 6 to 12 months (influenza, COVID-19 and pneumococcal from 3 months), after CD19 or BCMA CAR-T no sooner than 3 months for influenza and COVID-19 and 6 months for other non-live vaccines (very low, weak), and after B-cell depleting therapy COVID-19 only, at 6 months (moderate, strong). Household contacts should be fully vaccinated, including MMR, varicella and rotavirus, with hand washing after nappy changes for rotavirus; contacts of severely immunocompromised patients such as transplant recipients in isolation get inactivated rather than live influenza vaccine. Children with immunodeficiency attending school do not need to be kept away when classmates are immunised. For children, ASCO does not apply (it covers 19 and over); the Indian Academy of Pediatrics advises against live vaccines during and up to 6 months after chemotherapy and recommends only annual inactivated influenza vaccine for all children during chemotherapy.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "home"],
  },
  population: "Adults with solid tumours or haematological cancers, including after stem cell transplant, CAR-T and B-cell depleting therapy, and long-term survivors (ASCO 2024, which excludes people under 19 and gives no separate advice for people living with HIV); people of all ages in the UK (Green Book); children having chemotherapy (Indian Academy of Pediatrics); and the household contacts of all of them.",
  trigger: "A new cancer diagnosis with treatment planned, each influenza season during treatment, and the end of treatment.",
  steps: [
    {
      action: "At the first visit, find out which vaccines the person has had and bring them up to date with seasonal, age-based and risk-based vaccines",
      why: "People with cancer catch infections more easily and more severely, and vaccines work best before treatment weakens the immune system.",
      source: "asco-2024",
      quote: "Clinicians should determine vaccination status and ensure that adults newly diagnosed with cancer and about to start treatment are up to date on seasonal vaccines as well as age- and risk-based vaccines (see Tables 2-4)",
      grade: "Evidence quality: moderate; strength of recommendation: strong",
    },
    {
      action: "Give vaccines 2 to 4 weeks before treatment where possible, but do not withhold non-live vaccines during or after treatment",
      why: "The response is best before treatment, yet a non-live vaccine cannot cause infection and still gives some protection later.",
      source: "asco-2024",
      quote: "Vaccination should ideally precede any planned cancer treatment by 2-4 weeks. However, nonlive vaccines can be administered during or after chemotherapy or immunotherapy, hormonal treatment, radiation, or surgery",
      grade: "Evidence quality: moderate; strength of recommendation: strong",
    },
    {
      action: "Do not give live vaccines to anyone with leukaemia or lymphoma, or within 6 months of immunosuppressive chemotherapy or radiotherapy",
      why: "A weakened vaccine germ can multiply out of control when the immune system is suppressed.",
      source: "green-book-ch6",
      quote: "those who are receiving, or have received in the past 6 months, immunosuppressive chemotherapy or radiotherapy for malignant disease or non-malignant disorders",
    },
    {
      action: "Extend the live-vaccine bar to 12 months after immunosuppressive biologics such as rituximab, unless a specialist directs otherwise",
      why: "B-cell depleting antibodies weaken immunity for longer than chemotherapy does.",
      source: "green-book-ch6",
      quote: "those who are receiving or have received in the past 12 months immunosuppressive biological therapy (e.g. anti-TNF therapy such as alemtuzumab, ofatumumab and rituximab) unless otherwise directed by a specialist",
    },
    {
      action: "Use the injected flu vaccine every year for the patient, never the nasal spray",
      why: "The nasal spray contains live virus.",
      source: "asco-2024",
      quote: "Live attenuated influenza vaccine, which is administered as a nasal spray, cannot be given to patients with cancer.",
    },
    {
      action: "Record past measles and chickenpox, and the vaccines for them, so an exposure can be acted on quickly",
      why: "After contact with chickenpox or measles, a protective antibody injection or aciclovir has to be given promptly, and the history decides who needs it.",
      source: "green-book-ch7",
      quote: "As administration of these products should be undertaken promptly, it is important to ensure that any past history of measles and varicella disease and/or vaccination is documented, and antibody testing may be indicated.",
    },
    {
      action: "After a stem cell transplant, offer a full revaccination course starting 6 to 12 months later, with live vaccines delayed at least 2 years",
      why: "A transplant wipes out most of the protection from earlier vaccines.",
      source: "asco-2024",
      quote: "Complete revaccination starting 6-12 months after hematopoietic stem-cell transplant should be offered in order to restore vaccine-induced immunity.",
      grade: "Evidence quality: moderate; strength of recommendation: strong",
    },
    {
      action: "After CAR-T against CD19 or BCMA, give influenza and COVID-19 vaccines no sooner than 3 months after treatment and other non-live vaccines no sooner than 6 months",
      why: "Too early and the vaccine produces little protection; there is very little evidence on the best timing.",
      source: "asco-2024",
      quote: "Adults with hematopoietic malignancies receiving CAR-T therapy directed against B-cell antigens (CD19, BCMA) should receive influenza and COVID-19 vaccine no sooner than 3 months after the completion of therapy.",
      grade: "Evidence quality: very low; strength of recommendation: weak",
    },
    {
      action: "Make sure everyone the patient lives with, and close contacts, are up to date on their own vaccines, including the yearly flu vaccine",
      why: "Vaccinated family members are less likely to bring infection home.",
      source: "asco-2024",
      quote: "It is recommended that all household members and close contacts, where feasible, be up to date on vaccinations",
      grade: "Evidence quality: moderate; strength of recommendation: strong",
    },
    {
      action: "Let household contacts have live vaccines such as MMR, varicella and rotavirus, with careful hand washing after nappy changes for rotavirus",
      why: "These vaccine viruses are not known to harm close contacts, and the family's immunity protects the patient from the real infections.",
      source: "green-book-ch6",
      quote: "Where household contacts of immunosuppressed individuals receive rotavirus vaccine, careful hand washing should be used to minimize the risk of transmission of vaccine virus.",
    },
    {
      action: "For contacts of very severely immunocompromised patients, such as transplant recipients in isolation, use inactivated flu vaccine instead of the nasal spray",
      why: "Nasal vaccine virus can be shed for up to two weeks.",
      source: "green-book-ch6",
      quote: "Household members and others who cannot avoid contact with very severely immunocompromised patients (e.g. bone marrow transplant patients and others who require isolation) should not be offered live attenuated influenza vaccine but given appropriate alternative inactivated influenza vaccines.",
    },
    {
      action: "Do not keep a child having cancer treatment off school because classmates are being vaccinated",
      why: "Vaccinated classmates do not pass vaccine viruses on in a way that harms the child.",
      source: "green-book-ch6",
      quote: "Children with immunodeficiency who are attending school do not require exclusion when other children are being immunised.",
    },
    {
      action: "For a child having chemotherapy, give the yearly inactivated flu vaccine and hold live vaccines until at least 6 months after chemotherapy ends",
      why: "Most routine childhood vaccines give a weaker, shorter response during chemotherapy and are better given or repeated afterwards.",
      source: "iap-2019",
      quote: "Live vaccines are contraindicated during and up to 6 months after end of chemotherapy.",
    },
  ],
  bestInClass: {
    statement: "For adults, ASCO 2024 is the most recent graded guideline: check vaccination status at diagnosis, vaccinate 2 to 4 weeks before treatment where possible, give non-live vaccines during or after any treatment, avoid live vaccines, and revaccinate after transplant, CAR-T and B-cell depletion on its timetable. The UK Green Book agrees on the principle but times inactivated vaccines at least two weeks before immunosuppression and sets explicit live-vaccine intervals: 6 months after immunosuppressive chemotherapy or radiotherapy, 12 months after biologics such as rituximab, 24 months after transplant, 3 months after high-dose steroids. For children, no graded international guideline was readable: the Green Book applies at every age, and the Indian Academy of Pediatrics consensus holds live vaccines until 6 months after chemotherapy, gives only inactivated influenza vaccine to all children during treatment, and prefers to give other non-live vaccines from 6 months after the end of treatment for durable immunity. Everyone agrees that household contacts should be fully vaccinated; the Green Book and ASCO both allow MMR, varicella and nasal influenza vaccine in contacts, except contacts of transplant recipients or patients in isolation.",
    sources: ["asco-2024", "green-book-ch6", "green-book-ch7", "iap-2019"],
  },
  variants: [
    {
      name: "UK Green Book intervals and timing",
      differs: "Inactivated vaccines at least two weeks before immunosuppressive treatment (ASCO: 2 to 4 weeks); live vaccines barred for fixed periods after each kind of treatment, with steroid doses that count as immunosuppressive given in milligrams and by weight for children under 20 kg.",
      evidence: "Ungraded national guidance from Public Health England, now the UK Health Security Agency.",
      sources: ["green-book-ch6", "green-book-ch7"],
    },
    {
      name: "Non-live vaccines deferred until after chemotherapy in children (Indian Academy of Pediatrics)",
      differs: "Gives only annual inactivated influenza vaccine to all children during chemotherapy, hepatitis B only to unimmunised children at risk from transfusion, and other non-live vaccines from 6 months after the end of treatment; a catch-up or re-immunisation schedule depends on what the child had before; siblings continue their vaccines but switch oral polio to the injected vaccine.",
      evidence: "A national consensus guideline; read here as an abstract only.",
      sources: ["iap-2019"],
    },
    {
      name: "Rotavirus vaccine with immunodeficiency other than SCID (Green Book)",
      differs: "Although rotavirus vaccine is live, the Green Book notes that outside severe combined immunodeficiency the benefit may exceed the risk.",
      evidence: "Stated in a footnote to the live-vaccine list; ungraded.",
      sources: ["green-book-ch6"],
    },
  ],
  grades: [
    { claim: "Determine vaccination status and update seasonal, age- and risk-based vaccines at diagnosis", grade: "Evidence quality: moderate; strength of recommendation: strong", source: "asco-2024" },
    { claim: "Vaccinate 2 to 4 weeks before treatment; non-live vaccines allowed during or after treatment", grade: "Evidence quality: moderate; strength of recommendation: strong", source: "asco-2024" },
    { claim: "Full revaccination from 6 to 12 months after stem cell transplant", grade: "Evidence quality: moderate; strength of recommendation: strong", source: "asco-2024" },
    { claim: "Timing after CD19 or BCMA CAR-T", grade: "Evidence quality: very low; strength of recommendation: weak", source: "asco-2024" },
    { claim: "After B-cell depleting therapy, revaccinate for COVID-19 only, no sooner than 6 months after treatment", grade: "Evidence quality: moderate; strength of recommendation: strong", source: "asco-2024", quote: "Adults who receive B-cell–depleting therapy should be revaccinated for COVID-19 only, no sooner than 6 months after completion of treatment" },
    { claim: "Household members and close contacts up to date on vaccinations", grade: "Evidence quality: moderate; strength of recommendation: strong", source: "asco-2024" },
  ],
  sources: [
    { key: "asco-2024", label: "Vaccination of Adults With Cancer: ASCO Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11095883/", doi: "10.1200/JCO.24.00032", gradingScheme: "Evidence quality (high, moderate, low, very low) and strength of recommendation (strong, weak), printed beside each recommendation in Table 1.", read: "full-text", accessed: "2026-11-11" },
    { key: "green-book-ch6", label: "Contraindications and special considerations: the Green Book, chapter 6 (August 2017)", publisher: "Public Health England (now UK Health Security Agency)", year: 2017, url: "https://www.gov.uk/government/publications/contraindications-and-special-considerations-the-green-book-chapter-6", gradingScheme: "Not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "green-book-ch7", label: "Immunisation of individuals with underlying medical conditions: the Green Book, chapter 7 (January 2020)", publisher: "Public Health England (now UK Health Security Agency)", year: 2020, url: "https://www.gov.uk/government/publications/immunisation-of-individuals-with-underlying-medical-conditions-the-green-book-chapter-7", gradingScheme: "Not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "iap-2019", label: "Immunization of Children with Cancer in India Treated with Chemotherapy: Consensus Guideline from the Pediatric Hematology-Oncology Chapter and the Advisory Committee on Vaccination and Immunization Practices of the Indian Academy of Pediatrics", publisher: "Indian Academy of Pediatrics, Indian Pediatrics", year: 2019, url: "https://europepmc.org/abstract/MED/31884436", doi: "10.1007/s13312-019-1678-0", read: "abstract", accessed: "2026-11-11" },
    { key: "ecil7-2019", label: "Vaccination of patients with haematological malignancies who did not have transplantations: guidelines from the 2017 European Conference on Infections in Leukaemia (ECIL 7)", publisher: "ECIL, Lancet Infectious Diseases", year: 2019, url: "https://europepmc.org/abstract/MED/30744964", doi: "10.1016/S1473-3099(18)30601-7", read: "abstract", accessed: "2026-11-11" },
    { key: "sfce-2025", label: "Vaccination of children and adolescents treated for acute leukemia, excluding HSCT recipients: recommendations of the French Society for Childhood and Adolescent Cancer and Leukemia (SFCE)", publisher: "SFCE, Bulletin du Cancer", year: 2025, url: "https://europepmc.org/abstract/MED/39706725", doi: "10.1016/j.bulcan.2024.10.013", read: "abstract", accessed: "2026-11-11" },
    { key: "idsa-2013", label: "2013 IDSA clinical practice guideline for vaccination of the immunocompromised host", publisher: "IDSA, Clinical Infectious Diseases", year: 2014, url: "https://doi.org/10.1093/cid/cit684", doi: "10.1093/cid/cit684", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "No current graded guideline on vaccinating children during and after chemotherapy could be read in full. The ECIL 7 (2019) and SFCE (2025) recommendations for children with leukaemia were read only as abstracts that state no recommendation, and the IDSA 2013 guideline, which covers children, returned a bot challenge to a script.",
    "The Green Book chapter 6 on gov.uk is dated August 2017 and its list of live vaccines still names Zostavax; later changes to the UK shingles programme are not reflected in that chapter and were not checked in chapter 28a.",
    "ASCO notes that the best timing of inactivated influenza vaccine within chemotherapy cycles is not settled; trials gave varied results.",
    "Evidence on vaccine timing after CAR-T is very limited (ASCO grades it very low).",
    "The detailed revaccination schedule after transplant is on the revaccination page, not repeated here.",
  ],
  institutions: ["asco"],
  cancers: ["childhood-cancers", "all-leukemia", "non-hodgkin-lymphoma", "hodgkin-lymphoma", "multiple-myeloma"],
  drugs: ["rituximab"],
  technologies: ["allogeneic-hsct", "autologous-stem-cell-transplant", "car-t"],
  terms: ["hypogammaglobulinaemia"],
  related: ["rejuv-tx-revaccination", "lymphoma-living-vaccinations"],
  sections: ["supportive-care"],
  tags: ["protocol", "vaccination", "infection-prevention", "paediatric"],
});
