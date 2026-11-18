import { protocol } from "./helpers";

/*
 * Vaccination before, during and after cancer treatment, for adults and children, and for the people they live with.
 * The schedule for revaccination after a stem cell transplant or CAR-T is only outlined here; it is the subject of
 * rejuv-tx-revaccination.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * with curl into a scratch directory and read as text, every quote was checked verbatim by script, and each claim
 * was read against the passage it cites.
 * - ASCO guideline, Vaccination of Adults With Cancer (Kamboj et al., J Clin Oncol 2024): PubMed Central HTML
 *   (PMC11095883, one plain request, tags stripped by script), full text including Table 1 (all recommendations with
 *   evidence quality and strength) and Tables 2 to 4. Europe PMC and the NCBI E-utilities do not serve its XML.
 *   Crossref lists no update and a Europe PMC title search (2024 to 2026) found only the companion Clinical Insights
 *   paper, so this is the latest edition.
 * - UK Green Book chapter 6 (August 2017), chapter 7 (January 2020) and chapter 28a on shingles (12 August 2025):
 *   the PDFs linked from the gov.uk publication pages, pdftotext, full text. The gov.uk pages give 26 October 2017,
 *   10 January 2020 and 19 August 2025 as their last updates, so each is the current edition.
 * - CDC Advisory Committee on Immunization Practices (ACIP) statements in MMWR: 21-valent pneumococcal conjugate
 *   vaccine (2024), pneumococcal conjugate vaccines from age 50 (2025) and recombinant zoster vaccine in
 *   immunocompromised adults (2022), full text as Europe PMC XML; RSV vaccines in adults aged 60 and over (2024),
 *   abstract only. The CDC's own schedule pages answered "Access Denied" to a script.
 * - ECIL: the public slide sets on ecil-leukaemia.com, pdftotext. ECIL 7 (2017, final slide set, patients without
 *   transplant, including children with acute lymphoblastic leukaemia) and ECIL 11 Part II (revised guidelines slide
 *   set, September 2026: CAR-T, bispecific antibodies, household contacts). The Lancet Infectious Diseases paper of
 *   ECIL 7 (2019) was read as an abstract only. Slide tables are not quoted: their layout breaks sentences.
 * - Indian Academy of Pediatrics consensus (2019), SFCE French recommendations (2025), IDSA 2013 and IDSA 2025:
 *   abstracts only, from Europe PMC. The publishers' pages returned a bot challenge or HTTP 403 to a script.
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined and nothing else changed.
 */
export const vaccinationAroundCancerTreatment = protocol({
  id: "vaccination-around-cancer-treatment",
  name: "Vaccination before, during and after cancer treatment",
  aka: ["vaccines during chemotherapy", "flu jab during chemotherapy", "live vaccines and cancer", "immunisation and chemotherapy", "household contacts vaccination", "vaccination of children with cancer"],
  domain: "infection-prevention",
  tldr: "Before cancer treatment, the team should check which vaccines a person has had and bring them up to date, ideally two to four weeks before. Non-live vaccines such as the flu jab can still be given during treatment. Live vaccines, such as MMR, chickenpox and the nasal flu spray for the patient, must be avoided during treatment and for months after. Family vaccines protect the patient too.",
  simple: "Ask your cancer team which vaccines you need before treatment starts. The flu jab and other vaccines that contain no live germs can usually be given during treatment. Vaccines that use live germs, such as MMR and chickenpox, cannot. Your family should have their normal vaccines too.",
  summary: "ASCO (2024, adults) asks clinicians to determine vaccination status and bring newly diagnosed adults up to date on seasonal and age- and risk-based vaccines (moderate, strong), ideally 2 to 4 weeks before treatment, with non-live vaccines allowed during or after chemotherapy, immunotherapy, hormonal treatment, radiation or surgery (moderate, strong). Its table for adults with cancer lists influenza every year (a high-dose, recombinant or adjuvanted vaccine from 65), COVID-19 on the latest CDC schedule for immunocompromised people, recombinant zoster vaccine from 19 as two doses at least 4 weeks apart, pneumococcal vaccine from 19 as one dose of PCV20, or PCV15 followed by PPSV23 at least 8 weeks later, and RSV vaccine once from 60. ASCO reports that studies of influenza and COVID-19 vaccines given during checkpoint inhibitor treatment have not found a higher rate of immune-related adverse events. The Green Book (UK, all ages) gives inactivated vaccines at least two weeks before immunosuppressive treatment where possible, and otherwise at any time with re-immunisation considered after recovery.\n\nLive vaccines: the Green Book says most should not be given to people immunosuppressed by acute or chronic leukaemia or lymphoma, during and for 6 months after immunosuppressive chemotherapy or radiotherapy, for 12 months after immunosuppressive biologics such as rituximab unless a specialist directs otherwise, for 24 months after a stem cell transplant (and then only without ongoing immunosuppression or GVHD after a donor transplant, or in remission after an autologous one), and for 3 months after high-dose corticosteroids (above 40 mg prednisolone a day, or 2 mg/kg/day in children under 20 kg, for more than a week). The sources differ on the interval after chemotherapy: ASCO, for solid tumours, at least 4 weeks before treatment or at least 3 months after it ends; ECIL 7, for blood cancers, usually at least 3 months after chemotherapy or 6 months after rituximab; the Green Book and the Indian Academy of Pediatrics, 6 months. Live attenuated nasal influenza vaccine cannot be given to patients with cancer (ASCO).\n\nRevaccination after transplant starts at 6 to 12 months (influenza, COVID-19 and pneumococcal from 3 months), after CD19 or BCMA CAR-T no sooner than 3 months for influenza and COVID-19 and 6 months for other non-live vaccines (very low, weak), and after B-cell depleting therapy COVID-19 only, no sooner than 6 months after treatment (moderate, strong). Household contacts should be fully vaccinated, including MMR, varicella and rotavirus, with hand washing after nappy changes for rotavirus; contacts of severely immunocompromised patients such as transplant recipients in isolation get inactivated rather than live influenza vaccine. Children with immunodeficiency attending school do not need to be kept away when classmates are immunised. For children, ASCO does not apply (it covers 19 and over); the Indian Academy of Pediatrics advises against live vaccines during and up to 6 months after chemotherapy and recommends only annual inactivated influenza vaccine for all children during chemotherapy.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "home"],
  },
  population: "Adults with solid tumours or haematological cancers, including after stem cell transplant, CAR-T and B-cell depleting therapy, and long-term survivors (ASCO 2024, which excludes people under 19 and gives no separate advice for people living with HIV); people of all ages in the UK (Green Book); children having chemotherapy (Indian Academy of Pediatrics; ECIL 7 for children with acute lymphoblastic leukaemia); and the household contacts of all of them.",
  trigger: "A new cancer diagnosis with treatment planned, each influenza season during treatment, and the end of treatment.",
  steps: [
    {
      action: "At the first visit, find out which vaccines the person has had and bring them up to date with seasonal, age-based and risk-based vaccines",
      why: "People with cancer are at higher risk of infection, and vaccines work best before treatment weakens the immune system.",
      source: "asco-2024",
      quote: "Clinicians should determine vaccination status and ensure that adults newly diagnosed with cancer and about to start treatment are up to date on seasonal vaccines as well as age- and risk-based vaccines (see Tables 2-4)",
      grade: "Evidence quality: moderate; strength of recommendation: strong",
    },
    {
      action: "Give vaccines 2 to 4 weeks before treatment where possible, but do not withhold non-live vaccines during or after treatment",
      why: "The response is best before treatment, yet a non-live vaccine is safe during treatment and still gives some protection.",
      source: "asco-2024",
      quote: "Vaccination should ideally precede any planned cancer treatment by 2-4 weeks. However, nonlive vaccines can be administered during or after chemotherapy or immunotherapy, hormonal treatment, radiation, or surgery",
      grade: "Evidence quality: moderate; strength of recommendation: strong",
    },
    {
      action: "Do not give live vaccines to anyone immunosuppressed by leukaemia or lymphoma, or during immunosuppressive chemotherapy or radiotherapy and for 6 months after it",
      why: "A weakened vaccine germ can multiply and cause severe infection when the immune system is suppressed. ASCO and ECIL allow a shorter wait of 3 months in some patients; see the variants.",
      source: "green-book-ch6",
      quote: "those who are receiving, or have received in the past 6 months, immunosuppressive chemotherapy or radiotherapy for malignant disease or non-malignant disorders",
    },
    {
      action: "Extend the live-vaccine bar to 12 months after immunosuppressive biologics such as rituximab, unless a specialist directs otherwise",
      why: "The Green Book sets a longer interval for these antibodies than for chemotherapy; ASCO notes that vaccine responses can stay absent for up to a year after B-cell targeted treatment.",
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
      action: "Offer pneumococcal vaccine to adults who have not had it: one dose of PCV20, or PCV15 followed by PPSV23 at least 8 weeks later",
      why: "Pneumococcal infection is much more common during cancer treatment, and the vaccine works best given before treatment starts. Newer US advice adds a 21-valent vaccine as a further option.",
      source: "asco-2024",
      quote: "Vaccine-naive adult patients with cancer can receive either one dose of PCV-20 only or a dose of PCV-15 followed by a dose of PPSV23, with at least 8 weeks between administrations.",
    },
    {
      action: "Offer the non-live recombinant shingles vaccine to adults with cancer as two doses; ASCO allows the second dose 4 weeks after the first",
      why: "Shingles is more common in the first two years after a cancer diagnosis. The UK and US schedules set different gaps between the doses; see the variants.",
      source: "asco-2024",
      quote: "RZV should be made available to all adults with cancer.",
    },
    {
      action: "Give COVID-19 vaccine on the current national schedule for immunocompromised people, and RSV vaccine to those old enough to be eligible",
      why: "ASCO lists both for adults with cancer but could make no RSV recommendation under 60, and national age limits have changed since.",
      source: "asco-2024",
      quote: "Patients aged 60 years and older with cancer are eligible to receive the respiratory syncytial virus (RSV) vaccine (Table 2).",
    },
    {
      action: "Record past measles and chickenpox, and the vaccines for them, so an exposure can be acted on quickly",
      why: "After contact with chickenpox or measles, a protective antibody injection or aciclovir has to be given promptly, and the history helps decide who needs it.",
      source: "green-book-ch7",
      quote: "As administration of these products should be undertaken promptly, it is important to ensure that any past history of measles and varicella disease and/or vaccination is documented, and antibody testing may be indicated.",
    },
    {
      action: "After a stem cell transplant, offer a full revaccination course starting 6 to 12 months later (influenza, COVID-19 and pneumococcal vaccines from 3 months), with live vaccines delayed at least 2 years and given only without active GVHD or immunosuppression",
      why: "Protection from earlier vaccines is lost after a transplant and has to be rebuilt.",
      source: "asco-2024",
      quote: "Complete revaccination starting 6-12 months after hematopoietic stem-cell transplant should be offered in order to restore vaccine-induced immunity.",
      grade: "Evidence quality: moderate; strength of recommendation: strong",
    },
    {
      action: "After CAR-T against CD19 or BCMA, give influenza and COVID-19 vaccines no sooner than 3 months after treatment and other non-live vaccines no sooner than 6 months",
      why: "Responses soon after CAR-T are weak, and there is very little evidence on the best timing. ECIL 11 times the other non-live vaccines by B-cell recovery instead; see the variants.",
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
      action: "Let household contacts have live vaccines such as MMR, varicella and rotavirus, with careful hand washing after nappy changes for rotavirus; a contact who gets a blistering rash after varicella vaccine should limit contact with the patient until it is dry and crusted",
      why: "The family's immunity protects the patient from the real infections. No harm from MMR or rotavirus vaccine virus in contacts has been reported; varicella vaccine virus can, rarely, pass on from a person who develops a rash.",
      source: "green-book-ch6",
      quote: "Where household contacts of immunosuppressed individuals receive rotavirus vaccine, careful hand washing should be used to minimize the risk of transmission of vaccine virus.",
    },
    {
      action: "For contacts of very severely immunocompromised patients, such as transplant recipients in isolation, use inactivated flu vaccine instead of the nasal spray",
      why: "Nasal vaccine virus has been found in the nose and throat for up to two weeks after vaccination.",
      source: "green-book-ch6",
      quote: "Household members and others who cannot avoid contact with very severely immunocompromised patients (e.g. bone marrow transplant patients and others who require isolation) should not be offered live attenuated influenza vaccine but given appropriate alternative inactivated influenza vaccines.",
    },
    {
      action: "Do not keep a child with a weakened immune system off school because classmates are being vaccinated",
      why: "For most live vaccines in the UK schedule, the vaccine virus either does not pass to contacts or can be kept from doing so by simple precautions.",
      source: "green-book-ch6",
      quote: "Children with immunodeficiency who are attending school do not require exclusion when other children are being immunised.",
    },
    {
      action: "For a child having chemotherapy, give the yearly inactivated flu vaccine and hold live vaccines until at least 6 months after chemotherapy ends",
      why: "Non-live vaccines give more lasting protection when given after treatment has finished, so most are given or repeated then.",
      source: "iap-2019",
      quote: "Live vaccines are contraindicated during and up to 6 months after end of chemotherapy.",
    },
  ],
  bestInClass: {
    statement: "For adults with any cancer, ASCO 2024 is the most recent graded guideline that covers the whole subject: check vaccination status at diagnosis, vaccinate 2 to 4 weeks before treatment where possible, give non-live vaccines during or after any treatment, avoid live vaccines, and revaccinate after transplant, CAR-T and B-cell depletion on its timetable. Its vaccine table is adapted from the CDC schedule, which has since added a 21-valent pneumococcal vaccine and changed the ages for pneumococcal and RSV vaccines. The UK Green Book agrees on the principle but times inactivated vaccines at least two weeks before immunosuppression and sets explicit live-vaccine intervals: 6 months after immunosuppressive chemotherapy or radiotherapy, 12 months after biologics such as rituximab, 24 months after transplant, 3 months after high-dose steroids. On the interval after chemotherapy the sources differ: ASCO (solid tumours) and ECIL 7 (myeloma, lymphoma and chronic lymphocytic leukaemia, graded D III) accept at least 3 months, with ECIL asking for 6 months after rituximab. For children, the Green Book applies at every age; the Indian Academy of Pediatrics consensus, read as an abstract, holds live vaccines until 6 months after chemotherapy, gives only inactivated influenza vaccine to all children during treatment, and prefers other non-live vaccines from 6 months after the end of treatment; the ECIL 7 slide set, for children with acute lymphoblastic leukaemia, grades yearly inactivated influenza vaccine A II u and postpones most other vaccines to 3 to 6 months after chemotherapy. All of them want household contacts fully vaccinated. The Green Book and ASCO both allow MMR and varicella vaccine in contacts, and nasal influenza vaccine too except for contacts of transplant recipients (ASCO) or of very severely immunocompromised patients who need isolation (Green Book).",
    sources: ["asco-2024", "green-book-ch6", "green-book-ch7", "iap-2019", "ecil7-slides-2017", "acip-pcv21-2024", "acip-pcv-2025", "acip-rsv-2024"],
  },
  variants: [
    {
      name: "UK Green Book intervals and timing",
      differs: "Inactivated vaccines at least two weeks before immunosuppressive treatment (ASCO: 2 to 4 weeks); live vaccines barred for fixed periods after each kind of treatment, with steroid doses that count as immunosuppressive given in milligrams and by weight for children under 20 kg.",
      evidence: "Ungraded national guidance from Public Health England, now the UK Health Security Agency.",
      sources: ["green-book-ch6", "green-book-ch7"],
    },
    {
      name: "A shorter wait for live vaccines after chemotherapy (ASCO for solid tumours, ECIL 7 for blood cancers)",
      differs: "ASCO's table for previously unimmunised adults says that for solid tumours varicella and MMR vaccines may be considered at least 4 weeks before cancer treatment starts, or at least 3 months after it is completed, and it cites the CDC Yellow Book for delaying travel vaccines until at least 3 months from the last chemotherapy with the disease in remission. ECIL 7 says not to give live vaccines while a patient with myeloma, lymphoma or chronic lymphocytic leukaemia is considered immunocompromised, usually at least 3 months after the end of chemotherapy or at least 6 months from rituximab. The Green Book and the Indian Academy of Pediatrics use 6 months after chemotherapy, and the Green Book 12 months after rituximab.",
      evidence: "ASCO: a table entry and narrative, not one of its graded recommendations. ECIL 7: graded D III in its slide set.",
      sources: ["asco-2024", "ecil7-slides-2017", "green-book-ch6", "iap-2019"],
    },
    {
      name: "US schedule changes since ASCO 2024 (CDC ACIP)",
      differs: "ASCO's table gives PCV20 alone, or PCV15 then PPSV23, from age 19, and RSV vaccine once from 60. In June 2024 ACIP added the 21-valent conjugate vaccine PCV21 as an option wherever PCV15 or PCV20 is recommended, and in October 2024 recommended a single dose of conjugate vaccine for all adults aged 50 and over who have not had one; for adults aged 19 to 49 with an immunocompromising condition, which in its list includes generalised malignancy, leukaemia, lymphoma, Hodgkin disease and multiple myeloma, the choice is one dose of PCV21, PCV20 or PCV15, with PPSV23 at least 8 weeks after PCV15. In June 2024 ACIP changed RSV vaccine to a single dose for all adults aged 75 and over and for adults aged 60 to 74 at increased risk of severe RSV disease. For recombinant zoster vaccine ACIP gives the second dose typically 2 to 6 months after the first, or 1 to 2 months after it for people who are or will be immunosuppressed and would benefit from a shorter schedule (ASCO: at least 4 weeks apart).",
      evidence: "ACIP recommendations published in MMWR; the pneumococcal and zoster statements were read in full, the RSV statement as an abstract.",
      sources: ["acip-pcv21-2024", "acip-pcv-2025", "acip-rsv-2024", "acip-rzv-2022", "asco-2024"],
    },
    {
      name: "UK shingles vaccine for severely immunosuppressed adults (Green Book chapter 28a)",
      differs: "From September 2025 the non-live vaccine Shingrix is offered to all severely immunosuppressed people aged 18 and over, as two doses with the second 8 weeks to 6 months after the first. The chapter's definition of severe immunosuppression includes immunosuppressive chemotherapy or radiotherapy now or in the past 6 months and a stem cell transplant in the previous 24 months. People about to start immunosuppressive treatment should begin the course preferably one month before it, and at least 14 days before. ASCO allows the two doses 4 weeks apart.",
      evidence: "Ungraded national guidance from the UK Health Security Agency, chapter dated 12 August 2025.",
      sources: ["green-book-ch28a", "asco-2024"],
    },
    {
      name: "Influenza vaccine after anti-CD20 antibodies (ECIL 7 against ASCO)",
      differs: "ECIL 7 says influenza vaccination should be postponed in patients with myeloma, lymphoma or chronic lymphocytic leukaemia who are receiving anti-CD20 antibodies or had them in the previous 6 months, because they do not respond. ASCO says these patients should have the seasonal influenza vaccine despite weaker responses, timed 4 weeks from the most recent dose for those on long-term anti-CD20 treatment.",
      evidence: "ECIL 7: graded B II u in its slide set. ASCO: narrative clinical interpretation, not separately graded.",
      sources: ["ecil7-slides-2017", "asco-2024"],
    },
    {
      name: "After CAR-T and bispecific antibodies (ECIL 11, September 2026)",
      differs: "ECIL 11 agrees with ASCO that influenza and COVID-19 vaccines can be given from 3 months after CAR-T when the virus is circulating or expected, whatever the state of immune recovery. For pneumococcal and most other non-live vaccines it sets no fixed month (ASCO: no sooner than 6 months) and vaccinates at signs of B-cell recovery, or when immunoglobulin replacement stops. It does not recommend live vaccines after CAR-T while the patient is immunosuppressed and allows them from 12 months only once several recovery criteria are met; it does not recommend live vaccines during bispecific antibody treatment. For household members it advises inactivated influenza vaccine, says the nasal vaccine should not be used by people living with a transplant recipient in the first months after transplant or with GVHD, calls the same precaution logical for CAR-T and bispecific antibody patients, and advises that after a baby's rotavirus vaccine a transplant recipient has no contact with the baby's stools or nappies for 4 weeks (ASCO: good hand hygiene and avoiding nappy changes for up to 2 weeks after the last dose; Green Book: careful hand washing).",
      evidence: "A revised guideline slide set posted on 12 October 2026, graded with letters and levels (for example B IIt for influenza timing after CAR-T, D III against live vaccines); the full paper was not found.",
      sources: ["ecil11-2026", "asco-2024", "green-book-ch6"],
    },
    {
      name: "Non-live vaccines deferred until after chemotherapy in children (Indian Academy of Pediatrics)",
      differs: "Gives only annual inactivated influenza vaccine to all children during chemotherapy, hepatitis B only to unimmunised children at risk from transfusion, and other non-live vaccines from 6 months after the end of treatment; a catch-up or re-immunisation schedule depends on what the child had before; siblings continue their vaccines but switch oral polio to the injected vaccine. ECIL 7, for children with acute lymphoblastic leukaemia, postpones most vaccines to 3 to 6 months after chemotherapy.",
      evidence: "A national consensus guideline, read here as an abstract only; ECIL 7 from its slide set.",
      sources: ["iap-2019", "ecil7-slides-2017"],
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
    { claim: "No live vaccines in myeloma, lymphoma or chronic lymphocytic leukaemia while immunocompromised, usually at least 3 months after chemotherapy or 6 months from rituximab", grade: "D III", source: "ecil7-slides-2017" },
    { claim: "Yearly inactivated influenza vaccine for children with acute lymphoblastic leukaemia on maintenance treatment", grade: "A II u, t for dose", source: "ecil7-slides-2017" },
    { claim: "Influenza vaccine from 3 months after CAR-T when the season is expected or under way", grade: "BIIt", source: "ecil11-2026" },
  ],
  sources: [
    { key: "asco-2024", label: "Vaccination of Adults With Cancer: ASCO Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11095883/", doi: "10.1200/JCO.24.00032", gradingScheme: "Evidence quality (GRADE labels: high, moderate, low, very low) and strength of recommendation, printed beside each recommendation in Table 1; the strengths printed there are strong and weak.", read: "full-text", accessed: "2026-11-17" },
    { key: "green-book-ch6", label: "Contraindications and special considerations: the Green Book, chapter 6 (August 2017)", publisher: "Public Health England (now UK Health Security Agency)", year: 2017, url: "https://www.gov.uk/government/publications/contraindications-and-special-considerations-the-green-book-chapter-6", gradingScheme: "Not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "green-book-ch7", label: "Immunisation of individuals with underlying medical conditions: the Green Book, chapter 7 (January 2020)", publisher: "Public Health England (now UK Health Security Agency)", year: 2020, url: "https://www.gov.uk/government/publications/immunisation-of-individuals-with-underlying-medical-conditions-the-green-book-chapter-7", gradingScheme: "Not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "green-book-ch28a", label: "Shingles (herpes zoster): the Green Book, chapter 28a (12 August 2025)", publisher: "UK Health Security Agency", year: 2025, url: "https://www.gov.uk/government/publications/shingles-herpes-zoster-the-green-book-chapter-28a", gradingScheme: "Not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "acip-pcv21-2024", label: "Use of 21-Valent Pneumococcal Conjugate Vaccine Among U.S. Adults: Recommendations of the Advisory Committee on Immunization Practices, United States, 2024", publisher: "CDC, Morbidity and Mortality Weekly Report", year: 2024, url: "https://europepmc.org/abstract/MED/39264843", doi: "10.15585/mmwr.mm7336a3", gradingScheme: "Not graded in the statement.", read: "full-text", accessed: "2026-11-17" },
    { key: "acip-pcv-2025", label: "Expanded Recommendations for Use of Pneumococcal Conjugate Vaccines Among Adults Aged ≥50 Years: Recommendations of the Advisory Committee on Immunization Practices, United States, 2024", publisher: "CDC, Morbidity and Mortality Weekly Report", year: 2025, url: "https://europepmc.org/abstract/MED/39773952", doi: "10.15585/mmwr.mm7401a1", gradingScheme: "Not graded in the statement.", read: "full-text", accessed: "2026-11-17" },
    { key: "acip-rsv-2024", label: "Use of Respiratory Syncytial Virus Vaccines in Adults Aged ≥60 Years: Updated Recommendations of the Advisory Committee on Immunization Practices, United States, 2024", publisher: "CDC, Morbidity and Mortality Weekly Report", year: 2024, url: "https://europepmc.org/abstract/MED/39146277", doi: "10.15585/mmwr.mm7332e1", read: "abstract", accessed: "2026-11-17" },
    { key: "acip-rzv-2022", label: "Use of Recombinant Zoster Vaccine in Immunocompromised Adults Aged ≥19 Years: Recommendations of the Advisory Committee on Immunization Practices, United States, 2022", publisher: "CDC, Morbidity and Mortality Weekly Report", year: 2022, url: "https://europepmc.org/abstract/MED/35051134", doi: "10.15585/mmwr.mm7103a2", gradingScheme: "Not graded in the statement.", read: "full-text", accessed: "2026-11-17" },
    { key: "iap-2019", label: "Immunization of Children with Cancer in India Treated with Chemotherapy: Consensus Guideline from the Pediatric Hematology-Oncology Chapter and the Advisory Committee on Vaccination and Immunization Practices of the Indian Academy of Pediatrics", publisher: "Indian Academy of Pediatrics, Indian Pediatrics", year: 2019, url: "https://europepmc.org/abstract/MED/31884436", doi: "10.1007/s13312-019-1678-0", read: "abstract", accessed: "2026-11-17" },
    { key: "ecil7-slides-2017", label: "ECIL 7 final slide set: vaccines in non-HSCT patients with hematological malignancies (2017)", publisher: "European Conference on Infections in Leukaemia (ECIL)", year: 2017, url: "https://ecil-leukaemia.com/images/resources/2017/35_ECIL_7_Vaccine_Part_I_and_II_Final.pdf", gradingScheme: "A letter for the strength of the recommendation (A to D) and a numeral for the quality of evidence (I to III) with index letters, which the slide set says follows the ESCMID system; the slide defining them is an image and was not read.", read: "full-text", accessed: "2026-11-17" },
    { key: "ecil7-2019", label: "Vaccination of patients with haematological malignancies who did not have transplantations: guidelines from the 2017 European Conference on Infections in Leukaemia (ECIL 7)", publisher: "ECIL, Lancet Infectious Diseases", year: 2019, url: "https://europepmc.org/abstract/MED/30744964", doi: "10.1016/S1473-3099(18)30601-7", read: "abstract", accessed: "2026-11-17" },
    { key: "ecil11-2026", label: "ECIL 11 revised guidelines slide set, September 2026, Part II: vaccination of CAR T cell treated patients, patients treated with bispecific antibodies, and general topics regarding vaccination", publisher: "European Conference on Infections in Leukaemia (ECIL)", year: 2026, url: "https://ecil-leukaemia.com/images/26/ressources/ECIL_11_-_Update_on_vaccination_Part_II_12Oct2026.pdf", gradingScheme: "A letter for the strength of the recommendation (A to D) and a numeral for the quality of evidence (I to III) with index letters, printed beside each recommendation; the slide defining them is an image and was not read.", read: "full-text", accessed: "2026-11-17" },
    { key: "sfce-2025", label: "Vaccination of children and adolescents treated for acute leukemia, excluding HSCT recipients: recommendations of the French Society for Childhood and Adolescent Cancer and Leukemia (SFCE)", publisher: "SFCE, Bulletin du Cancer", year: 2025, url: "https://europepmc.org/abstract/MED/39706725", doi: "10.1016/j.bulcan.2024.10.013", read: "abstract", accessed: "2026-11-17" },
    { key: "idsa-2013", label: "2013 IDSA clinical practice guideline for vaccination of the immunocompromised host", publisher: "IDSA, Clinical Infectious Diseases", year: 2014, url: "https://doi.org/10.1093/cid/cit684", doi: "10.1093/cid/cit684", read: "abstract", accessed: "2026-11-17" },
    { key: "idsa-2025", label: "IDSA 2025 Guidelines on the Use of Vaccines for the Prevention of Seasonal COVID-19, Influenza, and RSV Infections in Immunocompromised Patients", publisher: "IDSA, Clinical Infectious Diseases", year: 2026, url: "https://europepmc.org/abstract/MED/41766454", doi: "10.1093/cid/ciag114", gradingScheme: "GRADE: strength of recommendation and certainty of evidence, as the abstract describes it.", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "No current graded guideline on vaccinating children during and after chemotherapy could be read as a full paper. On 17 November 2026 the Indian Academy of Pediatrics consensus, the ECIL 7 paper (2019) and the SFCE recommendations (2025) were again readable only as abstracts, and the last two abstracts state no recommendation. The ECIL 7 recommendations used here come from its public slide set of 2017, which may differ in wording from the published paper; that paper also has an erratum that was not read.",
    "The IDSA 2013 guideline, which ASCO builds on and the Green Book points to, returned HTTP 403 to a script on 17 November 2026; its abstract states no recommendation. IDSA published new guidelines in 2026 on COVID-19, influenza and RSV vaccines for immunocompromised adults and children in the 2025 to 2026 season. Only their abstracts could be read: they strongly recommend age-appropriate COVID-19, influenza and RSV vaccines, on moderate-certainty evidence, with timing fitted to treatment. No step here rests on them.",
    "The CDC's own immunisation schedule pages returned Access Denied to a script on 17 November 2026, so the current US schedule was read only through the ACIP statements cited here, the latest of them published in January 2025. Any later change to the US COVID-19, RSV or pneumococcal schedules was not checked. ASCO's vaccine table predates those statements.",
    "The ECIL 11 recommendations (September 2026) were read as a slide set, not a paper. Its part on stem cell transplant is marked as a slide set for public consultation and was not used. The ECIL 11 slide sets found do not cover blood cancer patients treated without transplant, CAR-T or bispecific antibodies, for whom ECIL 7 is the edition used here.",
    "The Green Book chapter 6 on gov.uk is dated August 2017 and its list of live vaccines still names Zostavax. Chapter 28a (12 August 2025) records that the non-live vaccine Shingrix replaced Zostavax in the routine programme from September 2023. The chapters on pneumococcal, RSV, influenza and COVID-19 vaccines were not read, so UK eligibility for those vaccines is not stated here.",
    "ASCO notes that the best timing of inactivated influenza vaccine within chemotherapy cycles is not settled; trials gave varied results.",
    "ASCO found no data to guide RSV vaccination in patients with cancer younger than 60 and no data on live vaccines after CAR-T.",
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
