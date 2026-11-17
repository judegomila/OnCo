import { protocol } from "./helpers";

/*
 * Influenza in people having cancer treatment: antiviral medicines after exposure (post-exposure prophylaxis) and early
 * treatment. Vaccination and the herpes simplex and zoster antivirals have their own protocols and are linked, not
 * repeated.
 *
 * Second accuracy pass, 17 November 2026. Every source below was fetched again raw with curl into a scratch directory
 * and read as text (HTML and XML with the tags stripped by script, PDFs with pdftotext). Every quote in this file was
 * checked verbatim by script against that text, normalising whitespace only. What was read:
 * - AGIHO/DGHO guideline on community acquired respiratory virus infections in patients with cancer, 2025 update
 *   (Giesen et al., Ann Hematol 2026): full text, Europe PMC full-text XML (PMC12823726). It evaluated publications that
 *   appeared online until 28 February 2025. Its reference list cites the AGIHO guideline of 2016 (Eur J Cancer). Its
 *   text and its Table 4 print different grades for oseltamivir, zanamivir and baloxavir; both are shown. Its AIIt
 *   grade is for starting antivirals as early as possible "after symptom onset and diagnosis"; it does not say to
 *   treat before a test result, and the first pass had credited it with that.
 * - IDSA 2018 update on seasonal influenza (Uyeki et al., Clin Infect Dis 2019): full text, from the guideline page on
 *   idsociety.org. The page carries no archived notice, and no later IDSA guideline on influenza treatment or
 *   chemoprophylaxis was found in Europe PMC. The page lists a correction (Clin Infect Dis 2019;68:1790, DOI
 *   10.1093/cid/ciz044); its text is behind a subscription and was not read. Literature searches covered January 2009
 *   to March 2014; no recommendation on baloxavir. Table 1 (the grading scheme) did not come through as text, so the
 *   scheme is described from the methods paragraph.
 * - UKHSA, Guidance on use of antiviral agents for the treatment and prophylaxis of seasonal influenza: full text of the
 *   HTML publication on gov.uk, which prints "Updated 23 October 2026"; the publication page says that update brought
 *   in new evidence on oseltamivir in critical illness and new renal dosing. Ungraded.
 * - NICE TA158 (prophylaxis, 2008) and TA168 (treatment, 2009): the recommendations chapters, full text. Both overview
 *   pages print "Last reviewed: 30 November 2014".
 * - WHO Clinical practice guidelines for influenza (2024): the executive summary PDF from cdn.who.int only, with
 *   pdftotext. The full guideline was tried again on iris.who.int: the page is a script application that returns no
 *   text to curl, and its search interface did not answer. Not read.
 * - CDC, Influenza Antiviral Medications: Summary for Clinicians (page "Updated: March 10, 2026"): cdc.gov answers a
 *   script with "Access Denied", so the page was read from the Internet Archive capture of 13 November 2026, one request.
 * - US prescribing information from DailyMed, read as SPL XML: Tamiflu (oseltamivir, Genentech; set id
 *   ee3c9555-60f2-4f82-a760-11983c86e97b, version 45) and Xofluza (baloxavir marboxil, Genentech; set id
 *   e49e1a61-1b7c-4be5-ac84-af6240b511e7, revised 05/2025). Manufacturer's labels: used for licensed dose, duration
 *   and trial figures only, not as best in class.
 * - Tamiflu product information (summary of product characteristics) from the European Medicines Agency: the PDF, with
 *   pdftotext. It prints no revision date; the file's own properties are dated 27 March 2025. The UK summary of
 *   product characteristics that UKHSA cites was not read.
 * - NHS, Flu (nhs.uk, page last reviewed 3 February 2026): full text, for the advice given to the public.
 * - ECIL-4 influenza guideline for transplant and leukaemia patients (Engelhard et al., Transpl Infect Dis 2013):
 *   abstract only, Europe PMC (subscription required for the full text). A title search of Europe PMC found no later
 *   ECIL guideline on influenza.
 * - Not read and not cited: any ASTCT influenza guideline (none was found) and the REMAP-CAP preprint, which is
 *   reported only as UKHSA describes it.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined, nothing else changed. No record exists yet for oseltamivir, zanamivir or baloxavir, so `drugs` is empty.
 */
export const influenzaAntiviralProphylaxisAndEarlyTreatment = protocol({
  id: "influenza-antiviral-prophylaxis-and-early-treatment",
  name: "Influenza during cancer treatment: antiviral prophylaxis after exposure and early treatment",
  aka: ["flu during chemotherapy", "oseltamivir prophylaxis", "Tamiflu after exposure", "post-exposure prophylaxis for influenza", "influenza chemoprophylaxis", "flu antivirals in immunocompromised patients", "baloxavir", "neuraminidase inhibitors"],
  domain: "infection-prevention",
  tldr: "Flu is more likely to become serious when cancer or its treatment has weakened the immune system. Antiviral medicines such as oseltamivir are meant to be started early, within 48 hours of the first symptoms or of close contact with flu. The NHS says to get urgent advice if you have flu symptoms and a weakened immune system. Tell your cancer team promptly if someone at home has flu.",
  simple: "If you are having cancer treatment and you start to feel fluey, get advice urgently: the NHS says so for anyone with a weakened immune system. If someone at home gets flu, tell your cancer team promptly. There are medicines that can prevent flu or treat it, and they are meant to be started within two days.",
  summary: "The guidelines read treat immunocompromised people with cancer as high risk and recommend an antiviral as early as possible. AGIHO 2025: as early as possible after symptom onset and diagnosis (AIIt), ideally within 48 hours. IDSA 2018: for documented or suspected influenza in immunocompromised outpatients (A-II) and in anyone hospitalised, regardless of illness duration (A-II). UKHSA 2026: oseltamivir first line for at-risk and severe cases, started before testing where no rapid test is available. CDC: decisions about starting treatment should not wait for laboratory confirmation. The licensed adult dose of oseltamivir is 75 mg twice daily for 5 days.\n\nThe 48-hour limit is the licensed one (NICE TA168 and the labels) and the guidelines do not apply it as a cut-off in this group. AGIHO says a late diagnosis should not preclude treatment in the severely immunocompromised. IDSA treats hospitalised people, and outpatients with severe or progressive illness, regardless of illness duration. UKHSA calls treatment beyond 48 hours off-label but possibly valuable up to 5 days from symptom onset in critical illness. Testing uses a molecular assay, and IDSA recommends testing immunocompromised people who have respiratory symptoms with or without fever (A-III), because their illness is frequently less characteristic.\n\nWhere they differ. Post-exposure prophylaxis: AGIHO recommends it for immunocompromised patients with cancer, ideally within 72 hours (BIIt); IDSA says clinicians can consider it for severely immunocompromised people in whom vaccination is contraindicated, unavailable or expected to work poorly (C-II), ideally no later than 48 hours after exposure, for 7 days (CDC also gives 7 days); UKHSA and NICE TA158 offer it to at-risk people, immunosuppression included, who are not adequately protected by vaccination, within 48 hours for oseltamivir or 36 hours for zanamivir, and UKHSA and the labels give 10 days; WHO 2024 gives a conditional recommendation for oseltamivir or baloxavir in people at extremely high risk. Treatment length: IDSA gives 5 days for uncomplicated influenza in otherwise healthy outpatients and says longer can be considered in immunocompromise (C-III); the European product information recommends 10 days in immunocompromised patients and UKHSA allows it; the US label gives 5 days and states that efficacy in immunocompromised patients has not been established. Kidney function: UKHSA 2026 keeps 75 mg twice daily down to a creatinine clearance of 31 mL/min, where the US label, CDC and the European product information reduce to 30 mg twice daily. Baloxavir: AGIHO gives it a lower grade than oseltamivir because it was not studied in patients with cancer; UKHSA reserves it; CDC does not recommend it as monotherapy in severely immunosuppressed people; WHO conditionally recommends it for non-severe influenza at high risk and recommends against oseltamivir for non-severe influenza; IDSA 2018 predates it. Season-long prophylaxis: IDSA allows it to be considered after stem cell transplant (B-II); NICE does not recommend it.\n\nResistance emerges more often in immunocompromised people (US label: 27% of influenza A/H1N1 infections in a treatment study, 32% in stem cell transplant recipients), and UKHSA advises considering repeat sampling and resistance testing when there is no response after 5 days. UKHSA reports that preliminary results of the REMAP-CAP trial in critically ill patients, with oseltamivir started a median of 5 days after symptoms began, showed no reduction in deaths and a higher death rate than with no antiviral, and that recruitment to those arms was stopped; it has kept oseltamivir first line while that evidence is reviewed, noting that the result may not apply to people treated earlier.\n\nYour own team's protocol comes first, and local advice changes with the strains circulating each season. Vaccination of patients and their households is covered in the vaccination protocol.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["telephone-triage", "acute-oncology-service", "outpatient-clinic", "chemotherapy-day-unit", "ward", "home", "community"],
  },
  population: "Adults with cancer who are immunocompromised by a blood cancer, by current or recent chemotherapy or other immunosuppressive anticancer treatment, or by a stem cell transplant, during periods when seasonal influenza is circulating. AGIHO 2025 addresses patients with cancer directly; IDSA 2018, UKHSA 2026, NICE, CDC and WHO 2024 cover all ages and risk groups (UKHSA lists current or recent chemotherapy or radiotherapy for malignancy, within 6 months, among its examples of severe immunosuppression). Children's doses, pregnancy, avian and pandemic influenza, and outbreak control in hospitals and care homes are in those documents and are not covered here. Your own team's protocol comes first: these medicines are prescribed after an assessment, and this page is for understanding that care and knowing when to call.",
  trigger: "A person having cancer treatment has close contact with someone who has influenza, or develops a new cough, fever, sore throat or aches while influenza is circulating.",
  steps: [
    {
      action: "Consider agreeing in advance what the patient should do if they are exposed to flu or develop symptoms, including how an antiviral will be supplied quickly",
      why: "The medicines are licensed to start within 48 hours. IDSA offers this as something clinicians can consider as an alternative to a preventive course, and UKHSA asks for arrangements with a pharmacy to be made in advance when it is used.",
      source: "idsa-2018",
      quote: "Clinicians can consider educating patients and arranging for early empiric initiation of antiviral treatment as an alternative to postexposure antiviral chemoprophylaxis (C-III).",
      grade: "C-III",
    },
    {
      action: "Test for influenza with a molecular (PCR-type) test in an immunocompromised patient who has new respiratory symptoms, with or without fever",
      why: "Flu in someone with a weakened immune system often does not look typical and fever may be absent, so it is missed unless it is tested for. The quoted recommendation is for people admitted to hospital; IDSA gives outpatients the same grade where the result will change management, and AGIHO strongly recommends respiratory panel testing as soon as even mild symptoms occur (AIIu).",
      source: "idsa-2018",
      quote: "Clinicians should test for influenza on admission in all patients who are immunocompromised or at high risk of complications and present with acute onset of respiratory symptoms with or without fever, as the manifestations of influenza in such patients are frequently less characteristic than in immunocompetent individuals (A-III).",
      grade: "A-III",
    },
    {
      action: "Start antiviral treatment as early as possible after symptoms begin, ideally within 48 hours",
      why: "In the studies the guideline cites, treatment within 48 hours was linked to fewer deaths, and treatment while the infection was still in the upper airways to fewer infections reaching the lungs. The grade is for starting as early as possible; the 48 hours is the guideline's stated ideal.",
      source: "agiho-2025",
      quote: "it is strongly recommended to initiate antiviral therapy as early as possible after symptom onset and diagnosis of CARV infection to prevent disease progression and reduce mortality",
      grade: "AIIt",
    },
    {
      action: "Do not wait for the test result where a rapid test is not available",
      why: "UKHSA links early treatment to clinical benefit and asks for the need for treatment to be reassessed once results are back. CDC likewise says the decision to treat should not wait for laboratory confirmation.",
      source: "ukhsa-2026",
      quote: "if POCTs or rapid RT-PCR for respiratory viruses are unavailable, prompt NAI initiation prior to virological testing is recommended, as early initiation of therapy is associated with clinical benefit",
    },
    {
      action: "Still treat a severely immunocompromised patient who presents or is diagnosed late",
      why: "The guideline does not let a late diagnosis rule out treatment in this group. IDSA notes that the virus often keeps multiplying for longer when immunity is low, and treats hospitalised patients however long they have been ill.",
      source: "agiho-2025",
      quote: "In severely immunocompromised patients, a delayed diagnosis of CARV infection should not preclude antiviral therapy.",
    },
    {
      action: "Use a single neuraminidase inhibitor and do not combine two of them",
      why: "IDSA names oral oseltamivir, inhaled zanamivir or intravenous peramivir. UKHSA puts oral oseltamivir first because its evidence base is the largest, with inhaled zanamivir second.",
      source: "idsa-2018",
      quote: "Clinicians should start antiviral treatment as soon as possible with a single neuraminidase inhibitor (NAI) (either oral oseltamivir, inhaled zanamivir, or intravenous peramivir) and not use a combination of NAIs (A-I).",
      grade: "A-I",
    },
    {
      action: "Give adults oseltamivir 75 mg twice daily for 5 days as the licensed treatment course, and check kidney function for the dose",
      why: "This is the licensed adult dose. UKHSA and the European product information print the same adult dose, and UKHSA suggests 60 mg twice daily for an adult weighing 40 kg or less. The sources differ on the dose when kidney function is reduced; see the variants.",
      source: "tamiflu-label",
      quote: "The recommended oral dosage of TAMIFLU for treatment of influenza in adults and adolescents 13 years and older is 75 mg twice daily (one 75 mg capsule or 12.5 mL of oral suspension twice daily) for 5 days.",
    },
    {
      action: "Do not routinely give higher than licensed doses",
      why: "IDSA found no data to support higher doses, and UKHSA does not recommend an increase for lack of evidence that it works any better.",
      source: "idsa-2018",
      quote: "Clinicians should not routinely use higher doses of US Food and Drug Administration–approved NAI drugs for the treatment of seasonal influenza (A-II).",
      grade: "A-II",
    },
    {
      action: "Consider a course longer than 5 days in an immunocompromised patient",
      why: "The virus often keeps multiplying for longer when immunity is low. IDSA allows a longer course on expert opinion and says the data to set the best length are limited; the European product information recommends 10 days for immunocompromised patients.",
      source: "idsa-2018",
      quote: "Clinicians can consider longer duration of antiviral treatment for patients with a documented or suspected immunocompromising condition or patients requiring hospitalization for severe lower respiratory tract disease (especially pneumonia or acute respiratory distress syndrome [ARDS]), as influenza viral replication is often protracted (C-III).",
      grade: "C-III",
    },
    {
      action: "If the patient is not improving after 5 days of treatment, consider repeating the test and asking for antiviral resistance testing",
      why: "Resistant virus appears more often in people with weakened immunity, and UKHSA notes it has been described as early as 48 hours after starting treatment. A different medicine may then be needed.",
      source: "ukhsa-2026",
      quote: "Consider ‘follow up’ sampling and testing for antiviral resistance in patients who do not respond after 5 days of treatment especially if they are immunosuppressed or critically ill.",
    },
    {
      action: "Look for and treat bacterial infection in a patient who is severely ill at the start or who worsens after first improving",
      why: "AGIHO describes bacterial and fungal infections on top of a respiratory virus as frequent in patients with cancer and as a risk for a worse outcome. They need their own treatment as well as the antiviral.",
      source: "idsa-2018",
      quote: "Clinicians should investigate and empirically treat bacterial coinfection in patients who deteriorate after initial improvement, particularly in those treated with antivirals (A-III).",
      grade: "A-III",
    },
    {
      action: "After close contact with someone who has influenza, offer an immunocompromised patient post-exposure prophylaxis promptly",
      why: "A preventive course started soon after contact lowers the chance of flu developing. This is AGIHO's position for patients with cancer; IDSA grades the same step lower and for a narrower group (see the variants).",
      source: "agiho-2025",
      quote: "We therefore recommend to administer post-exposure prophylaxis promptly after exposure (ideally within 72 h) in immunocompromised patients with cancer (BIIt).",
      grade: "BIIt",
    },
    {
      action: "Give prophylaxis as once-daily oseltamivir (75 mg for adults) for 10 days, started within 48 hours of the last exposure",
      why: "This is the UK schedule. UKHSA allows a later start only as off-label use on specialist advice, IDSA advises against once-daily prophylaxis once more than 48 hours have passed, and IDSA and CDC give 7 days where UKHSA and the labels give 10.",
      source: "ukhsa-2026",
      quote: "1st line oseltamivir PO once daily for 10 days should be offered if therapy can be started within 48 hours of last exposure (or after 48 hours on advice of a consultant in health protection or other local infection specialist)",
    },
    {
      action: "If symptoms start during prophylaxis, test for influenza and change to a full treatment dose",
      why: "The preventive dose is given once a day where treatment is twice a day. IDSA warns that an under-dosed infection may carry a higher risk of resistant virus, most of all in the severely immunocompromised.",
      source: "idsa-2018",
      quote: "Clinicians should test for influenza and switch to antiviral treatment dosing in persons receiving postexposure antiviral chemoprophylaxis who become symptomatic, preferably with an antiviral drug with a different resistance profile if not contraindicated (A-III).",
      grade: "A-III",
    },
    {
      action: "Consider treating household members who have flu symptoms, to protect the severely immunocompromised person they live with",
      why: "UKHSA makes the same allowance, noting that antiviral treatment has been shown to reduce transmission from the person with flu to others.",
      source: "idsa-2018",
      quote: "Symptomatic outpatients who are household contacts of persons who are at high risk of developing complications from influenza, particularly those who are severely immunocompromised (C-III).",
      grade: "C-III",
    },
  ],
  bestInClass: {
    statement: "Early treatment is agreed and has the strongest grades: an antiviral as early as possible for an immunocompromised person with cancer and influenza (AGIHO 2025 AIIt, after symptom onset and diagnosis; IDSA 2018 A-II for documented or suspected influenza in immunocompromised outpatients and A-II for anyone hospitalised, regardless of how long they have been ill; UKHSA 2026 oseltamivir first line). UKHSA and CDC say not to wait for a test result; AGIHO does not address that. On everything else the bodies differ and all positions are shown. Post-exposure prophylaxis: AGIHO recommends it for immunocompromised patients with cancer, ideally within 72 hours (BIIt); IDSA says it can be considered for the severely immunocompromised when vaccination is contraindicated, unavailable or expected to have low effectiveness (C-II), ideally no later than 48 hours after exposure (A-III), for 7 days (A-III); UKHSA 2026 and NICE TA158 offer it to at-risk people not adequately protected by vaccination, within 48 hours for oseltamivir, and UKHSA gives oseltamivir once daily for 10 days; WHO 2024 conditionally recommends oseltamivir or baloxavir for exposed people at extremely high risk. Treatment in the immunocompromised: IDSA says a longer course than 5 days can be considered (C-III); the European product information recommends 10 days and UKHSA allows it, citing the manufacturer; AGIHO says a prolonged course might be reasonable; CDC says longer regimens might be necessary. Baloxavir: AGIHO grades it below oseltamivir (table B IIt against A IIt; text CIIt against BIIt) because it was not studied in patients with cancer; UKHSA reserves it for where oseltamivir or zanamivir are not appropriate or for resistance; CDC does not recommend it as monotherapy in severely immunosuppressed people; WHO 2024 conditionally recommends baloxavir for non-severe influenza at high risk of progression and makes a strong recommendation against oseltamivir for non-severe influenza, which differs from IDSA, AGIHO, CDC and UKHSA for high-risk outpatients. The WHO full text, with its risk definitions, was not read.",
    sources: ["agiho-2025", "idsa-2018", "ukhsa-2026", "nice-ta158", "who-2024", "cdc-2026", "tamiflu-smpc-ema"],
  },
  variants: [
    {
      name: "Who is offered post-exposure prophylaxis, and how late it can start",
      differs: "AGIHO 2025: immunocompromised patients with cancer, promptly and ideally within 72 hours (BIIt). IDSA 2018: can be considered for people at very high risk, such as the severely immunocompromised, for whom vaccination is contraindicated, unavailable or expected to have low effectiveness, after household exposure (C-II), as soon as possible and ideally no later than 48 hours after exposure, and \"Clinicians should not administer once-daily postexposure antiviral chemoprophylaxis if >48 hours has elapsed since exposure.\" UKHSA 2026 and NICE TA158: at-risk people, with immunosuppression on the list, exposed in the same household or residential setting and not adequately protected by vaccination, within 48 hours for oseltamivir or 36 hours for zanamivir; UKHSA allows later starts on specialist advice as off-label use. WHO 2024: a conditional recommendation for oseltamivir or baloxavir in exposed people without symptoms who are at extremely high risk of hospitalisation.",
      evidence: "AGIHO rests on studies in allogeneic transplant recipients, studies in people without cancer and a meta-analysis of 33 randomised trials of six antivirals (transferred evidence, level IIt). In the household trial in the US oseltamivir label, in contacts aged 13 or older, laboratory-confirmed clinical influenza fell from 12% (24 of 200) with placebo to 1% (2 of 205). The same label states: \"Efficacy of TAMIFLU for the treatment or prophylaxis of influenza has not been established in immunocompromised patients\".",
      sources: ["agiho-2025", "idsa-2018", "ukhsa-2026", "nice-ta158", "who-2024", "tamiflu-label"],
    },
    {
      name: "Length of the preventive course: 7 days, 10 days or one dose",
      differs: "IDSA 2018: 7 days after the most recent exposure (A-III). CDC: 7 days after the last known exposure. UKHSA 2026 and the European product information: oseltamivir 75 mg once daily for 10 days in adults. US oseltamivir label: 75 mg once daily for at least 10 days after close contact. Baloxavir is a single dose under its US label, which licenses it for post-exposure prophylaxis from 5 years of age; UKHSA says it \"is not the first choice for post-exposure prophylaxis\" and gives confirmed oseltamivir resistance where zanamivir cannot be given as the example of when to consider it.",
      evidence: "The oseltamivir household trial in the US label used 7 days. In the baloxavir household trial in Japan (715 contacts aged 5 or over), laboratory-confirmed clinical influenza fell from 13% with placebo to 2% with baloxavir. Neither label describes its trial as including immunocompromised people.",
      sources: ["idsa-2018", "cdc-2026", "ukhsa-2026", "tamiflu-smpc-ema", "tamiflu-label", "xofluza-label"],
    },
    {
      name: "Watching closely and treating at the first symptom, or a treatment dose, instead of once-daily prophylaxis",
      differs: "The exposed person takes no preventive course but has the medicine and instructions ready, and starts a full treatment course as soon as symptoms begin. IDSA lists this as an alternative that can be considered (C-III). UKHSA recommends it only when the patient or carer has been given information and has chosen it, and \"the clinician has made arrangements in advance with a relevant pharmacy for the patient to promptly receive and start antiviral treatment within 48 hours of symptom onset (or 36 hours for zanamivir treatment)\". IDSA also records a third course, without a grade: \"To reduce the risk of subtherapeutic dosing if influenza virus infection has occurred following exposure, antiviral treatment (twice-daily dosing) rather than once-daily chemoprophylaxis dosing has been recommended by some experts, particularly in immunocompromised patients, when postexposure antiviral chemoprophylaxis is indicated.\"",
      evidence: "IDSA grades early empiric treatment C-III, which is expert opinion; UKHSA does not grade. No comparative trial is cited in either. IDSA adds that treatment dosing may also be appropriate once more than 48 hours have passed since exposure, because infection may already be established.",
      sources: ["idsa-2018", "ukhsa-2026"],
    },
    {
      name: "Length of treatment in immunocompromised patients: 5 days or 10 days",
      differs: "IDSA 2018 gives 5 days for uncomplicated influenza in otherwise healthy outpatients and says a longer course can be considered in immunocompromise (C-III). The European product information: \"For treatment of influenza, the recommended duration for immunocompromised patients is 10 days\". UKHSA 2026: \"Oseltamivir PO may be given for 5 days and extended to 10 days in immunosuppressed patients\", giving the manufacturer's UK product information as its source, and it describes treatment for longer than 5 days as off-label in other patients. AGIHO 2025 says a prolonged course might be reasonable, especially in the severely immunocompromised, without a grade or a number of days. CDC: \"Longer treatment regimens might be necessary in immunocompromised patients who may have prolonged influenza viral replication.\" The US label gives 5 days.",
      evidence: "No trial read sets the length. IDSA says retrospectively collected data suggest treatment can safely extend to 10 days or longer. UKHSA warns that prolonged treatment can be associated with resistance, particularly in immunosuppressed patients, and the US label reports treatment-associated resistance in 27% (8 of 30) of influenza A/H1N1 and 12% (6 of 52) of A/H3N2 infections in a treatment study of immunocompromised people, and in 32% (6 of 19) of stem cell transplant recipients.",
      sources: ["idsa-2018", "tamiflu-smpc-ema", "ukhsa-2026", "agiho-2025", "cdc-2026", "tamiflu-label"],
    },
    {
      name: "Oseltamivir dose when kidney function is reduced",
      differs: "The sources print different adult doses. Treatment: UKHSA 2026, in renal dosing it revised on 23 October 2026, gives 75 mg twice daily when creatinine clearance is above 30 mL/min, 75 mg once daily at 11 to 30 mL/min, and at 10 mL/min or less a single 75 mg dose, with a second 75 mg dose 7 days later in immunocompromised patients; in mild to moderate impairment it says \"standard-dose oseltamivir (75 mg twice daily) should be retained\". The US label, CDC and the European product information give 75 mg twice daily above 60 mL/min, 30 mg twice daily at more than 30 to 60 mL/min and 30 mg once daily at more than 10 to 30 mL/min, and do not recommend oseltamivir at 10 mL/min or less without dialysis. Prophylaxis: UKHSA gives 75 mg once daily above 30 mL/min and 75 mg every 48 hours at 11 to 30 mL/min; the US label and the European product information give 30 mg once daily at more than 30 to 60 mL/min and 30 mg every other day at more than 10 to 30 mL/min. The dialysis schedules differ again and are in each document. Baloxavir: UKHSA says no dose change is needed in renal dysfunction.",
      evidence: "UKHSA says patients with mild to moderate impairment tolerate standard dosing and need it for adequate antiviral exposure, and bases its advice for 10 mL/min or less and for dialysis on expert opinion. It describes its table as consistent with the manufacturer's summary of product characteristics, citing the version updated April 2020; the European product information read here prints the lower doses, and the UK document was not read. No comparative study is cited in the sources read.",
      sources: ["ukhsa-2026", "tamiflu-label", "cdc-2026", "tamiflu-smpc-ema"],
    },
    {
      name: "Baloxavir instead of, or added to, oseltamivir",
      differs: "A single-dose tablet with a different mechanism. AGIHO 2025 recommends it less strongly than oseltamivir: \"it was not studied in patients with cancer and is therefore only recommended with marginal strength\". UKHSA 2026 keeps oseltamivir first line and, in severe influenza, considers adding baloxavir or switching to intravenous zanamivir on specialist advice when the response is poor or resistance is a concern. CDC: \"CDC does not recommend use of baloxavir for monotherapy of influenza in severely immunosuppressed persons.\" WHO 2024 conditionally recommends baloxavir for non-severe influenza in people at high risk of progression and recommends against oseltamivir for non-severe influenza. IDSA 2018 makes no recommendation: \"As FDA approval occurred after finalization of these guidelines, the panel was unable to make recommendations on use of baloxavir.\"",
      evidence: "AGIHO notes a favourable safety profile in renal insufficiency and few drug interactions. CDC says there are no efficacy, safety or resistance data for baloxavir alone in severely immunosuppressed patients and that resistance emerging during treatment is a concern. UKHSA reports that the FLAGSTONE trial of baloxavir added to a neuraminidase inhibitor found no difference in time to clinical improvement, that resistance in trials ranged from 2% to 23%, and that \"there is insufficient data on expected rates of resistance in immunosuppressed groups\". The US label gives resistance-associated substitutions in 5% (6 of 134) of influenza A/H1N1 and 11% (53 of 485) of A/H3N2 infections in adults and adolescents.",
      sources: ["agiho-2025", "ukhsa-2026", "cdc-2026", "who-2024", "idsa-2018", "xofluza-label"],
    },
    {
      name: "Antiviral prophylaxis for the whole flu season after a stem cell transplant",
      differs: "Daily oseltamivir through the period of community influenza activity, without a known exposure. IDSA 2018 says it can be considered for those at highest risk, naming stem cell transplant recipients in the first 6 to 12 months after transplant (B-II). NICE TA158: \"Oseltamivir and zanamivir are not recommended for seasonal prophylaxis of influenza.\" The US label and the European product information allow up to 12 weeks in immunocompromised patients.",
      evidence: "The US label describes a placebo-controlled trial of 12 weeks of seasonal prophylaxis in 475 immunocompromised people (388 solid organ and 87 stem cell transplant recipients), in which confirmed clinical influenza occurred in 3% (7 of 238) with placebo and 2% (5 of 237) with oseltamivir, a difference that was not statistically significant. It states that safety was shown for up to 12 weeks but that efficacy in immunocompromised patients has not been established.",
      sources: ["idsa-2018", "nice-ta158", "tamiflu-label", "tamiflu-smpc-ema"],
    },
    {
      name: "Intravenous immunoglobulin as an added treatment",
      differs: "AGIHO 2025 says immunoglobulin can be considered as a supportive measure when IgG is below 4 g/L (CIII). IDSA 2018: \"Clinicians should not routinely administer immunomodulation using immunoglobulin preparations such as intravenous immunoglobulin for treatment of adults or children with suspected or confirmed seasonal influenza (A-III).\"",
      evidence: "Expert opinion on both sides (level III in each scheme). The AGIHO statement is limited to people with low antibody levels; the IDSA statement is about routine use.",
      sources: ["agiho-2025", "idsa-2018"],
    },
  ],
  grades: [
    { claim: "Start antiviral therapy as soon as possible in immunocompromised patients with cancer and a symptomatic respiratory virus infection", grade: "AIIt", source: "agiho-2025" },
    { claim: "Antiviral treatment for outpatients at high risk, including immunocompromised patients", grade: "A-II", source: "idsa-2018", quote: "Outpatients who are at high risk of complications from influenza, including those with chronic medical conditions and immunocompromised patients (A-II)." },
    { claim: "Antiviral treatment for anyone hospitalised with influenza, however long they have been ill", grade: "A-II", source: "idsa-2018", quote: "Persons of any age who are hospitalized with influenza, regardless of illness duration prior to hospitalization (A-II)." },
    { claim: "Antiviral treatment for outpatients with severe or progressive illness, however long they have been ill", grade: "A-III", source: "idsa-2018", quote: "Outpatients of any age with severe or progressive illness, regardless of illness duration (A-III)." },
    { claim: "Treatment decisions should not wait for laboratory confirmation", grade: "CDC clinical summary (ungraded)", source: "cdc-2026", quote: "Decisions about starting antiviral treatment should not wait for laboratory confirmation of influenza" },
    { claim: "Treatment more than 48 hours after symptoms began, in critical illness", grade: "UKHSA guidance (ungraded)", source: "ukhsa-2026", quote: "Treatment beyond 48 hours from symptom onset is off label but may be valuable if initiated up to 5 days from symptom onset." },
    { claim: "Respiratory panel testing as soon as even mild symptoms or signs occur in immunocompromised patients", grade: "AIIu", source: "agiho-2025", quote: "we strongly recommend respiratory panel testing as soon as even mild symptoms or signs occur (AIIu" },
    { claim: "Oseltamivir and zanamivir for patients with cancer and influenza, as graded in the guideline's text", grade: "BIIt", source: "agiho-2025", quote: "We therefore recommend treatment with oseltamivir and zanamivir with moderate strength in patients with cancer and influenza virus infection to shorten duration of infection and to prevent LRTD (BIIt, Table 4)." },
    { claim: "Oseltamivir and zanamivir, as graded in the same guideline's Table 4 (strength A, quality IIt), which differs from its text", grade: "A, IIt (Table 4)", source: "agiho-2025" },
    { claim: "Baloxavir for patients with cancer and influenza, as graded in the text (Table 4 prints strength B, quality IIt)", grade: "CIIt", source: "agiho-2025", quote: "Baloxavir has a favourable safety profile in renal insufficiency and has few drug-drug interactions, however, it was not studied in patients with cancer and is therefore only recommended with marginal strength (CIIt" },
    { claim: "Baloxavir alone is not recommended in severely immunosuppressed people", grade: "CDC clinical summary (ungraded)", source: "cdc-2026", quote: "CDC does not recommend use of baloxavir for monotherapy of influenza in severely immunosuppressed persons." },
    { claim: "Post-exposure prophylaxis in immunocompromised patients with cancer, ideally within 72 hours", grade: "BIIt", source: "agiho-2025" },
    { claim: "Post-exposure prophylaxis can be considered for the severely immunocompromised after household exposure", grade: "C-II", source: "idsa-2018", quote: "Clinicians can consider postexposure antiviral chemoprophylaxis for asymptomatic adults and children aged ≥3 months who are at very high risk of developing complications from influenza (eg, severely immunocompromised persons) and for whom influenza vaccination is contraindicated, unavailable, or expected to have low effectiveness, after household exposure to influenza (C-II)." },
    { claim: "Start post-exposure prophylaxis as soon as possible, ideally no later than 48 hours after exposure", grade: "A-III", source: "idsa-2018", quote: "If chemoprophylaxis is given, clinicians should administer postexposure antiviral chemoprophylaxis as soon as possible after exposure, ideally no later than 48 hours after exposure (A-III)." },
    { claim: "Post-exposure prophylaxis for 7 days after the most recent exposure", grade: "A-III", source: "idsa-2018", quote: "Clinicians should administer postexposure antiviral chemoprophylaxis in a nonoutbreak setting for 7 days after the most recent exposure to a close contact with influenza (A-III)." },
    { claim: "Post-exposure prophylaxis with oseltamivir or zanamivir for at-risk people, immunosuppression included, not effectively protected by vaccination", grade: "NICE technology appraisal, 2008 (ungraded)", source: "nice-ta158", quote: "Oseltamivir and zanamivir are recommended, within their marketing authorisations, for the post-exposure prophylaxis of influenza if all of the following circumstances apply." },
    { claim: "Oseltamivir or zanamivir treatment for at-risk people, including those who might be immunosuppressed, within 48 hours of symptoms", grade: "NICE technology appraisal, 2009 (ungraded)", source: "nice-ta168", quote: "People who are aged 65 years or older and people who might be immunosuppressed are also defined as 'at-risk' for the purpose of this guidance." },
    { claim: "Oseltamivir for exposed people without symptoms who are at extremely high risk", grade: "conditional recommendation for", source: "who-2024", quote: "conditional recommendation for the use of oseltamivir for asymptomatic persons at extremely high risk for hospitalization if they were to develop seasonal influenza" },
    { claim: "Baloxavir for exposed people without symptoms who are at extremely high risk", grade: "conditional recommendation for", source: "who-2024", quote: "conditional recommendation for the use of baloxavir for asymptomatic persons at extremely high risk for hospitalization if they were to develop seasonal influenza" },
    { claim: "Oseltamivir for severe influenza", grade: "conditional recommendation for", source: "who-2024", quote: "conditional recommendation for the use of oseltamivir for patients with severe influenza" },
    { claim: "Season-long prophylaxis can be considered for stem cell transplant recipients in the first 6 to 12 months and lung transplant recipients", grade: "B-II", source: "idsa-2018" },
    { claim: "A longer course of treatment can be considered in immunocompromised patients", grade: "C-III", source: "idsa-2018" },
    { claim: "Ten days of treatment for immunocompromised patients", grade: "European product information (ungraded)", source: "tamiflu-smpc-ema", quote: "For treatment of influenza, the recommended duration for immunocompromised patients is 10 days" },
    { claim: "Ten days of oseltamivir 75 mg twice daily for severely immunosuppressed patients, as UKHSA reports the manufacturer's recommendation", grade: "UKHSA guidance (ungraded)", source: "ukhsa-2026", quote: "The manufacturer of oseltamivir recommends a longer treatment course of 75mg PO twice daily for 10 days for severely immunosuppressed patients" },
    { claim: "Intravenous immunoglobulin can be considered when IgG is below 4 g/L", grade: "CIII", source: "agiho-2025", quote: "In hypogammaglobulinemia of IgG < 4 g/L, intravenous immunoglobulins (IVIGs) can be considered as a supportive treatment measure (CIII" },
    { claim: "Oseltamivir resistance arises more often in immunocompromised people", grade: "US prescribing information (ungraded)", source: "tamiflu-label", quote: "In immunocompromised adults and pediatrics (1 year of age and older), selection of influenza viruses resistant to oseltamivir can occur at higher frequencies than in the otherwise healthy population." },
    { claim: "Oseltamivir started a median of 5 days after symptom onset in critical illness: preliminary trial evidence of no benefit, as reported by UKHSA", grade: "ungraded; preliminary trial result", source: "ukhsa-2026", quote: "Preliminary evidence from the REMAP-CAP study conducted in critically ill patients aged over 12 years with confirmed influenza has shown a lack of benefit of oseltamivir monotherapy in established critical illness, where the drug was administered a median of 5 days after symptom onset." },
    { claim: "People with flu symptoms and a weakened immune system are told to ask for an urgent GP appointment or get help from NHS 111", grade: "NHS advice to the public (ungraded)", source: "nhs-flu", quote: "you have a weakened immune system – for example, because of chemotherapy or HIV" },
  ],
  sources: [
    {
      key: "agiho-2025",
      label: "Prevention, diagnosis and management of community acquired respiratory virus infections including COVID-19 in patients with cancer: 2025 updated evidence-based guideline of the infectious diseases working party (AGIHO) of the German society for hematology and medical oncology (DGHO)",
      publisher: "AGIHO/DGHO (Annals of Hematology, Giesen et al.)",
      year: 2026,
      url: "https://doi.org/10.1007/s00277-026-06769-9",
      doi: "10.1007/s00277-026-06769-9",
      gradingScheme: "ESCMID scale: strength of recommendation A (strongly supports use), B (moderately), C (marginally), D (against use); quality of evidence I (at least one randomised trial), II (non-randomised trials, cohort or case-control studies), III (expert opinion), with an added index for level II: r meta-analysis or systematic review of randomised trials, t transferred evidence from other patient groups, h historical control, u uncontrolled trial, a abstract or preprint.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "idsa-2018",
      label: "Clinical Practice Guidelines by the Infectious Diseases Society of America: 2018 Update on Diagnosis, Treatment, Chemoprophylaxis, and Institutional Outbreak Management of Seasonal Influenza",
      publisher: "IDSA (Clinical Infectious Diseases, Uyeki et al.)",
      year: 2019,
      url: "https://doi.org/10.1093/cid/ciy866",
      doi: "10.1093/cid/ciy866",
      gradingScheme: "US Public Health Service grading system, printed as a letter and a numeral from A-I to C-III. The guideline's methods describe the two ends: A-I is good evidence for or against use, from properly conducted randomised controlled trials; C-III is poor evidence to support a recommendation, resting on the opinions of respected authorities, clinical experience, descriptive studies or expert committee reports.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ukhsa-2026",
      label: "Guidance on use of antiviral agents for the treatment and prophylaxis of seasonal influenza (updated 23 October 2026)",
      publisher: "UK Health Security Agency",
      year: 2026,
      url: "https://www.gov.uk/government/publications/influenza-treatment-and-prophylaxis-using-anti-viral-agents/guidance-on-use-of-antiviral-agents-for-the-treatment-and-prophylaxis-of-seasonal-influenza",
      gradingScheme: "UKHSA does not grade its recommendations; it ranks options as first, second and third line and cites the evidence beside each.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ta158",
      label: "Oseltamivir, amantadine (review) and zanamivir for the prophylaxis of influenza (TA158), recommendations; published 24 September 2008, last reviewed 30 November 2014",
      publisher: "NICE",
      year: 2008,
      url: "https://www.nice.org.uk/guidance/ta158/chapter/1-Guidance",
      gradingScheme: "NICE does not grade recommendations; a technology appraisal recommends a medicine or does not.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ta168",
      label: "Amantadine, oseltamivir and zanamivir for the treatment of influenza (TA168), recommendations; published 25 February 2009, last reviewed 30 November 2014",
      publisher: "NICE",
      year: 2009,
      url: "https://www.nice.org.uk/guidance/ta168/chapter/1-Guidance",
      gradingScheme: "NICE does not grade recommendations; a technology appraisal recommends a medicine or does not.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "who-2024",
      label: "Clinical practice guidelines for influenza: executive summary",
      publisher: "World Health Organization",
      year: 2024,
      url: "https://cdn.who.int/media/docs/default-source/health-care-readiness/clinical-guidelines-for-influenza---executive-summary.pdf",
      gradingScheme: "Strong or conditional recommendations, for or against. The executive summary does not print the certainty of evidence behind each.",
      read: "public-summary",
      accessed: "2026-11-17",
    },
    {
      key: "cdc-2026",
      label: "Influenza Antiviral Medications: Summary for Clinicians (page updated 10 March 2026; read from the Internet Archive capture of 13 November 2026)",
      publisher: "US Centers for Disease Control and Prevention",
      year: 2026,
      url: "https://www.cdc.gov/flu/hcp/antivirals/summary-clinicians.html",
      gradingScheme: "CDC does not grade the recommendations on this page.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "tamiflu-label",
      label: "TAMIFLU (oseltamivir phosphate) capsules and oral suspension: US prescribing information (manufacturer's label)",
      publisher: "Genentech (manufacturer), FDA-approved labelling published on DailyMed",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ee3c9555-60f2-4f82-a760-11983c86e97b",
      gradingScheme: "A manufacturer's label; it states licensed uses, doses and trial results and does not grade.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "tamiflu-smpc-ema",
      label: "Tamiflu (oseltamivir): product information, Annex I, summary of product characteristics (European marketing authorisation; the PDF prints no revision date and its file properties are dated 27 March 2025)",
      publisher: "Roche (manufacturer), published by the European Medicines Agency",
      year: 2025,
      url: "https://www.ema.europa.eu/en/documents/product-information/tamiflu-epar-product-information_en.pdf",
      gradingScheme: "A manufacturer's product information as authorised in the European Union; it states licensed uses and doses and does not grade.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "xofluza-label",
      label: "XOFLUZA (baloxavir marboxil) tablets and granules: US prescribing information, revised 05/2025 (manufacturer's label)",
      publisher: "Genentech (manufacturer), FDA-approved labelling published on DailyMed",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e49e1a61-1b7c-4be5-ac84-af6240b511e7",
      gradingScheme: "A manufacturer's label; it states licensed uses, doses and trial results and does not grade.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhs-flu",
      label: "Flu (page last reviewed 3 February 2026)",
      publisher: "NHS",
      year: 2026,
      url: "https://www.nhs.uk/conditions/flu/",
      gradingScheme: "Advice to the public; ungraded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ecil4-2013",
      label: "European guidelines for prevention and management of influenza in hematopoietic stem cell transplantation and leukemia patients: summary of ECIL-4 (2011)",
      publisher: "ECIL, a joint venture of EBMT, EORTC, ICHS and ELN (Transplant Infectious Disease, Engelhard et al.)",
      year: 2013,
      url: "https://doi.org/10.1111/tid.12054",
      doi: "10.1111/tid.12054",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["allogeneic-hsct"],
  terms: [],
  related: ["herpes-simplex-and-zoster-antiviral-prophylaxis", "vaccination-around-cancer-treatment", "neutropenic-precautions-and-daily-life", "hand-hygiene-in-cancer-care", "febrile-neutropenia-first-hour"],
  upgrades: ["idea-upgrade-influenza-post-exposure-prophylaxis-versus-early-treatment-in-cancer"],
  gaps: [
    "No randomised trial of post-exposure prophylaxis or of treatment length in people with cancer was found in the sources read. AGIHO grades on evidence transferred from other groups (IIt), and the US oseltamivir label states that efficacy for treatment or prophylaxis has not been established in immunocompromised patients.",
    "The bodies disagree on who should have post-exposure prophylaxis, how late it can start (ideally within 72 hours in AGIHO; ideally within 48 hours in IDSA; 48 hours in UKHSA and NICE) and how long it lasts (7 days in IDSA and CDC, 10 days in UKHSA and the product information). None of this has been compared directly.",
    "The oseltamivir dose in reduced kidney function differs between sources. UKHSA's guidance of 23 October 2026 keeps 75 mg at a creatinine clearance of 11 to 60 mL/min (twice daily above 30, once daily at 11 to 30), where the US label, CDC and the European product information give 30 mg. UKHSA describes its table as consistent with the manufacturer's summary of product characteristics; the UK document was not read on 17 November 2026, so this page cannot say which the UK product information prints.",
    "WHO 2024 recommends against oseltamivir for non-severe influenza and conditionally for baloxavir in people at high risk; only the executive summary was read. On 17 November 2026 the full guideline on iris.who.int returned no text to a script, so how WHO defines high and extremely high risk, and whether people on cancer treatment fall in those groups, is not stated here.",
    "The AGIHO 2025 guideline prints different grades for the same drugs in its text and its Table 4 (oseltamivir and zanamivir BIIt in the text, strength A in the table; baloxavir CIIt in the text, strength B in the table). Both are shown; which is intended is not known. Its AIIt grade is for starting antivirals as early as possible after symptom onset and diagnosis; its 48 hours is stated as an ideal in the text, without a grade of its own.",
    "IDSA 2018 searched the literature only to March 2014 and predates baloxavir; no newer IDSA guideline on influenza treatment or prophylaxis was found. A correction to it was published in 2019 (DOI 10.1093/cid/ciz044); on 17 November 2026 its text was behind a subscription, so what it corrects is not known here. The recommendations were read from IDSA's own guideline page.",
    "UKHSA reports preliminary REMAP-CAP results in critically ill patients (oseltamivir started a median of 5 days after symptom onset, no reduction in deaths, a higher death rate reported with oseltamivir than with no antiviral, and recruitment to the oseltamivir arms stopped in March 2026). The preprint was not read, and UKHSA notes the result may not apply to people treated earlier.",
    "CDC's website refuses a script, so its clinician summary was read from the Internet Archive capture of 13 November 2026, which prints \"Updated: March 10, 2026\". A later change to the live page would not be seen here. Its list of who counts as higher risk is on a separate page that was not read.",
    "The ECIL-4 influenza guideline (2013) was read as an abstract only, which prints no grades, so ECIL's position cannot be set beside the others; no later ECIL influenza guideline was found. No ASTCT influenza guideline was found.",
    "No source read tells a person on cancer treatment how fast to report contact with flu. The NHS page tells people with flu symptoms and a weakened immune system to ask for an urgent GP appointment or get help from NHS 111, and the 48-hour and 36-hour limits for starting prophylaxis come from UKHSA and NICE. An earlier version of this page said \"the same day\"; that wording had no source and was changed on 17 November 2026.",
    "No record exists in this corpus for oseltamivir, zanamivir or baloxavir, so the protocol cannot yet link the medicines it is about.",
  ],
});
