import { protocol } from "./helpers";

/*
 * Influenza in people having cancer treatment: antiviral medicines after exposure (post-exposure prophylaxis) and early
 * treatment. Vaccination and the herpes simplex and zoster antivirals have their own protocols and are linked, not
 * repeated.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - AGIHO/DGHO guideline on community acquired respiratory virus infections in patients with cancer, 2025 update
 *   (Giesen et al., Ann Hematol 2026): full text, Europe PMC full-text XML (PMC12823726). Its literature search ran to
 *   28 February 2025. It replaces the AGIHO guideline of 2016 (Eur J Cancer). Note that its text and its Table 4 print
 *   different grades for oseltamivir, zanamivir and baloxavir; both are shown.
 * - IDSA 2018 update on seasonal influenza (Uyeki et al., Clin Infect Dis 2019): full text, from the guideline page on
 *   idsociety.org (the PubMed Central page answered with a browser check and Europe PMC serves no full text). The page
 *   carries no archived notice and no later IDSA guideline on influenza treatment or chemoprophylaxis was found; the
 *   IDSA 2025 guidelines found are on vaccines. Its literature searches covered January 2009 to March 2014, and it
 *   makes no recommendation on baloxavir, which was approved after it was finalised.
 * - UKHSA, Guidance on use of antiviral agents for the treatment and prophylaxis of seasonal influenza: full text of the
 *   HTML publication on gov.uk, which prints "Updated 23 October 2026". Ungraded.
 * - NICE TA158 (prophylaxis, 2008) and TA168 (treatment, 2009): the recommendations chapters, full text.
 * - WHO Clinical practice guidelines for influenza (2024): the executive summary PDF from cdn.who.int only, with
 *   pdftotext. The full guideline, which holds the definitions of high and extremely high risk, was not read.
 * - US prescribing information from DailyMed, read as SPL XML: Tamiflu (oseltamivir, Genentech; set id
 *   ee3c9555-60f2-4f82-a760-11983c86e97b) and Xofluza (baloxavir marboxil, Genentech; set id
 *   e49e1a61-1b7c-4be5-ac84-af6240b511e7, revised 05/2025). These are the manufacturer's labels as approved by the
 *   FDA: used for licensed dose, duration and trial figures only, not as best in class.
 * - ECIL-4 influenza guideline for transplant and leukaemia patients (Engelhard et al., Transpl Infect Dis 2013):
 *   abstract only, Europe PMC. No later ECIL guideline on influenza was found.
 * - Not read and not cited: ASTCT and CDC guidance (no ASTCT influenza guideline was found; cdc.gov was not tried after
 *   the exemplar recorded that it refuses a script), the ASCO/IDSA 2018 antimicrobial prophylaxis guideline (abstract
 *   only, and its abstract does not mention influenza), and the UK summaries of product characteristics.
 *
 * The preliminary REMAP-CAP result in critical illness is reported only as UKHSA describes it; the preprint itself was
 * not read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined, nothing else changed. No record exists yet for oseltamivir, zanamivir or baloxavir, so `drugs` is empty.
 */
export const influenzaAntiviralProphylaxisAndEarlyTreatment = protocol({
  id: "influenza-antiviral-prophylaxis-and-early-treatment",
  name: "Influenza during cancer treatment: antiviral prophylaxis after exposure and early treatment",
  aka: ["flu during chemotherapy", "oseltamivir prophylaxis", "Tamiflu after exposure", "post-exposure prophylaxis for influenza", "influenza chemoprophylaxis", "flu antivirals in immunocompromised patients", "baloxavir", "neuraminidase inhibitors"],
  domain: "infection-prevention",
  tldr: "Flu can become serious quickly when cancer or its treatment has weakened the immune system, and the flu jab may protect less well. Antiviral tablets such as oseltamivir work best started within two days, after close contact with flu to prevent it, or at the first symptoms to treat it. Tell your cancer team the same day if someone at home has flu or you get a cough, fever or aches in flu season.",
  simple: "If you are having cancer treatment and someone at home gets flu, or you start to feel fluey, phone your cancer team that day. There are tablets that can stop flu or make it milder, and they work best if started within two days.",
  summary: "All the guidelines read treat immunocompromised people with cancer as high risk and recommend starting an antiviral as early as possible for suspected or confirmed influenza without waiting for a test result: AGIHO 2025 (AIIt for early treatment, ideally within 48 hours), IDSA 2018 (A-II for immunocompromised outpatients; hospitalised patients regardless of illness duration), UKHSA 2026 (oseltamivir first line for at-risk and severe cases). A late diagnosis is not a reason to withhold treatment in the severely immunocompromised (AGIHO). Testing is by PCR, and symptoms can be atypical, often without fever (IDSA A-III).\n\nWhere they differ. Post-exposure prophylaxis: AGIHO recommends it for immunocompromised patients with cancer, ideally within 72 hours (BIIt); IDSA says clinicians can consider it for severely immunocompromised people in whom vaccination is contraindicated, unavailable or expected to work poorly (C-II), not later than 48 hours, for 7 days; UKHSA and NICE TA158 offer it to at-risk people, immunosuppression included, who are not adequately protected by vaccination, within 48 hours for oseltamivir or 36 hours for zanamivir, for 10 days; WHO 2024 gives a conditional recommendation for oseltamivir or baloxavir in people at extremely high risk. Treatment length: IDSA 5 days, longer can be considered in immunocompromise (C-III); UKHSA allows 10 days in immunosuppressed patients, citing the manufacturer; the US label states that efficacy in immunocompromised patients has not been established. Baloxavir: AGIHO gives it a lower grade than oseltamivir because it was not studied in patients with cancer; UKHSA reserves it; WHO conditionally recommends it for non-severe influenza at high risk and recommends against oseltamivir for non-severe influenza; IDSA 2018 predates it. Season-long prophylaxis: IDSA allows it to be considered after stem cell transplant (B-II); NICE does not recommend it.\n\nResistance emerges more often in immunocompromised people (US label: 27% of influenza A/H1N1 infections in a treatment study, 32% in stem cell transplant recipients), so a poor response after 5 days prompts repeat testing. UKHSA reports that preliminary results of the REMAP-CAP trial in critically ill patients, with oseltamivir started a median of 5 days after symptoms began, showed no reduction in deaths and a higher death rate than with no antiviral, and that recruitment to those arms was stopped; it has kept oseltamivir first line while that evidence is reviewed, noting that the result may not apply to people treated earlier.\n\nYour own team's protocol comes first, and local advice changes with the strains circulating each season. Vaccination of patients and their households is covered in the vaccination protocol.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["telephone-triage", "acute-oncology-service", "outpatient-clinic", "chemotherapy-day-unit", "ward", "home", "community"],
  },
  population: "Adults with cancer who are immunocompromised by a blood cancer, by current or recent chemotherapy or other immunosuppressive anticancer treatment, or by a stem cell transplant, during periods when seasonal influenza is circulating. AGIHO 2025 addresses patients with cancer directly; IDSA 2018, UKHSA 2026, NICE and WHO 2024 cover all ages and risk groups, with immunocompromised people named as high risk (UKHSA counts chemotherapy or radiotherapy for malignancy within 6 months as severe immunosuppression). Children's doses, pregnancy, avian and pandemic influenza, and outbreak control in hospitals and care homes are in those documents and are not covered here. Your own team's protocol comes first: these medicines are prescribed after an assessment, and this page is for understanding that care and knowing when to call.",
  trigger: "A person having cancer treatment has close contact with someone who has influenza, or develops a new cough, fever, sore throat or aches while influenza is circulating.",
  steps: [
    {
      action: "Agree in advance what the patient should do if they are exposed to flu or develop symptoms, including who to call and how an antiviral will be supplied quickly",
      why: "The medicines work best within two days, and a plan made beforehand saves the hours that are otherwise lost finding a prescriber and a pharmacy.",
      source: "idsa-2018",
      quote: "Clinicians can consider educating patients and arranging for early empiric initiation of antiviral treatment as an alternative to postexposure antiviral chemoprophylaxis (C-III).",
      grade: "C-III",
    },
    {
      action: "Test for influenza by PCR in any immunocompromised patient with new respiratory symptoms, with or without fever",
      why: "Flu in someone with a weakened immune system often does not look typical, and many have no fever, so it is missed unless it is tested for.",
      source: "idsa-2018",
      quote: "Clinicians should test for influenza on admission in all patients who are immunocompromised or at high risk of complications and present with acute onset of respiratory symptoms with or without fever, as the manifestations of influenza in such patients are frequently less characteristic than in immunocompetent individuals (A-III).",
      grade: "A-III",
    },
    {
      action: "Start antiviral treatment as soon as influenza is suspected, ideally within 48 hours of the first symptoms",
      why: "Early treatment lowers the chance of the infection moving down into the lungs, which is where most of the danger lies.",
      source: "agiho-2025",
      quote: "it is strongly recommended to initiate antiviral therapy as early as possible after symptom onset and diagnosis of CARV infection to prevent disease progression and reduce mortality",
      grade: "AIIt",
    },
    {
      action: "Do not wait for the test result where a rapid test is not available",
      why: "A day spent waiting for a laboratory can use up half the window in which the medicine works best.",
      source: "ukhsa-2026",
      quote: "if POCTs or rapid RT-PCR for respiratory viruses are unavailable, prompt NAI initiation prior to virological testing is recommended, as early initiation of therapy is associated with clinical benefit",
    },
    {
      action: "Still treat a severely immunocompromised patient who presents or is diagnosed late",
      why: "A weakened immune system clears the virus slowly, so the medicine can still help after the usual two days.",
      source: "agiho-2025",
      quote: "In severely immunocompromised patients, a delayed diagnosis of CARV infection should not preclude antiviral therapy.",
    },
    {
      action: "Use one neuraminidase inhibitor, usually oral oseltamivir, at the standard dose, and do not combine two of them",
      why: "Oseltamivir has the most evidence; combining drugs of the same class or doubling the dose has not been shown to help.",
      source: "idsa-2018",
      quote: "Clinicians should start antiviral treatment as soon as possible with a single neuraminidase inhibitor (NAI) (either oral oseltamivir, inhaled zanamivir, or intravenous peramivir) and not use a combination of NAIs (A-I).",
      grade: "A-I",
    },
    {
      action: "Do not routinely give higher than licensed doses",
      why: "The licensed dose is the one the trials tested, and the guideline advises against going above it as a routine.",
      source: "idsa-2018",
      quote: "Clinicians should not routinely use higher doses of US Food and Drug Administration–approved NAI drugs for the treatment of seasonal influenza (A-II).",
      grade: "A-II",
    },
    {
      action: "Consider a course longer than 5 days in an immunocompromised patient",
      why: "The virus keeps multiplying for longer when immunity is low. The guidelines allow a longer course on expert opinion; no trial has set the right length.",
      source: "idsa-2018",
      quote: "Clinicians can consider longer duration of antiviral treatment for patients with a documented or suspected immunocompromising condition or patients requiring hospitalization for severe lower respiratory tract disease (especially pneumonia or acute respiratory distress syndrome [ARDS]), as influenza viral replication is often protracted (C-III).",
      grade: "C-III",
    },
    {
      action: "If the patient is not improving after 5 days of treatment, repeat the test and ask for antiviral resistance testing",
      why: "Resistant virus appears more often in people with weakened immunity, sometimes within days, and a different medicine may then be needed.",
      source: "ukhsa-2026",
      quote: "Consider ‘follow up’ sampling and testing for antiviral resistance in patients who do not respond after 5 days of treatment especially if they are immunosuppressed or critically ill.",
    },
    {
      action: "Look for and treat bacterial infection in a patient who is severely ill at the start or who worsens after first improving",
      why: "Bacterial pneumonia on top of flu is common and needs antibiotics as well as the antiviral.",
      source: "idsa-2018",
      quote: "Clinicians should investigate and empirically treat bacterial coinfection in patients who deteriorate after initial improvement, particularly in those treated with antivirals (A-III).",
      grade: "A-III",
    },
    {
      action: "After close contact with someone who has influenza, offer an immunocompromised patient post-exposure prophylaxis promptly",
      why: "A short course started soon after contact can stop the infection taking hold in someone the vaccine may not have protected.",
      source: "agiho-2025",
      quote: "We therefore recommend to administer post-exposure prophylaxis promptly after exposure (ideally within 72 h) in immunocompromised patients with cancer (BIIt).",
      grade: "BIIt",
    },
    {
      action: "Give prophylaxis as once-daily oseltamivir started within 48 hours of the last exposure",
      why: "The once-daily preventive dose is only expected to work if it starts early; later than that, the plan changes to watching closely and treating at the first symptom.",
      source: "ukhsa-2026",
      quote: "1st line oseltamivir PO once daily for 10 days should be offered if therapy can be started within 48 hours of last exposure (or after 48 hours on advice of a consultant in health protection or other local infection specialist)",
    },
    {
      action: "If symptoms start during prophylaxis, test for influenza and change to a full treatment dose",
      why: "The preventive dose is half the treatment dose, and staying on it during a real infection undertreats it and encourages resistance.",
      source: "idsa-2018",
      quote: "Clinicians should test for influenza and switch to antiviral treatment dosing in persons receiving postexposure antiviral chemoprophylaxis who become symptomatic, preferably with an antiviral drug with a different resistance profile if not contraindicated (A-III).",
      grade: "A-III",
    },
    {
      action: "Consider treating household members who have flu symptoms, to protect the severely immunocompromised person they live with",
      why: "Treating the person with flu shortens the time they are infectious to the patient.",
      source: "idsa-2018",
      quote: "Symptomatic outpatients who are household contacts of persons who are at high risk of developing complications from influenza, particularly those who are severely immunocompromised (C-III).",
      grade: "C-III",
    },
  ],
  bestInClass: {
    statement: "Early treatment is agreed and has the strongest grades: an antiviral as soon as influenza is suspected in an immunocompromised person with cancer, without waiting for a test (AGIHO 2025 AIIt; IDSA 2018 A-II for immunocompromised outpatients and A-II for anyone hospitalised, regardless of how long they have been ill; UKHSA 2026 oseltamivir first line). On everything else the bodies differ and all positions are shown. Post-exposure prophylaxis: AGIHO recommends it for immunocompromised patients with cancer, ideally within 72 hours (BIIt); IDSA says it can be considered for the severely immunocompromised when vaccination is contraindicated, unavailable or expected to have low effectiveness (C-II), should start no later than 48 hours and lasts 7 days (A-III); UKHSA 2026 and NICE TA158 offer oseltamivir once daily for 10 days to at-risk people not adequately protected by vaccination, within 48 hours; WHO 2024 conditionally recommends oseltamivir or baloxavir for exposed people at extremely high risk. Treatment in the immunocompromised: IDSA 5 days with a longer course to be considered (C-III); UKHSA up to 10 days citing the manufacturer; AGIHO says a prolonged course might be reasonable. Baloxavir: AGIHO grades it below oseltamivir (table B IIt against A IIt; text CIIt against BIIt) because it was not studied in patients with cancer; UKHSA reserves it for where oseltamivir or zanamivir are not appropriate or for resistance; WHO 2024 conditionally recommends baloxavir for non-severe influenza at high risk of progression and makes a strong recommendation against oseltamivir for non-severe influenza, the opposite of IDSA, AGIHO and UKHSA for high-risk outpatients. The WHO full text, with its risk definitions, was not read.",
    sources: ["agiho-2025", "idsa-2018", "ukhsa-2026", "nice-ta158", "who-2024"],
  },
  variants: [
    {
      name: "Who is offered post-exposure prophylaxis, and how late it can start",
      differs: "AGIHO 2025: immunocompromised patients with cancer, promptly and ideally within 72 hours (BIIt). IDSA 2018: can be considered for people at very high risk, such as the severely immunocompromised, for whom vaccination is contraindicated, unavailable or expected to have low effectiveness, after household exposure (C-II), and \"Clinicians should not administer once-daily postexposure antiviral chemoprophylaxis if >48 hours has elapsed since exposure.\" UKHSA 2026 and NICE TA158: at-risk people, with immunosuppression on the list, exposed in the same household or residential setting and not adequately protected by vaccination, within 48 hours for oseltamivir or 36 hours for zanamivir; UKHSA allows later starts on specialist advice as off-label use. WHO 2024: a conditional recommendation for oseltamivir or baloxavir in exposed people without symptoms who are at extremely high risk of hospitalisation.",
      evidence: "AGIHO rests on studies in allogeneic transplant recipients, studies in people without cancer and a meta-analysis of 33 randomised trials of six antivirals (transferred evidence, level IIt). In the household trial in the US oseltamivir label, in contacts aged 13 or older who were not selected for immune status, laboratory-confirmed clinical influenza fell from 12% (24 of 200) with placebo to 1% (2 of 205). The same label states: \"Efficacy of TAMIFLU for the treatment or prophylaxis of influenza has not been established in immunocompromised patients\".",
      sources: ["agiho-2025", "idsa-2018", "ukhsa-2026", "nice-ta158", "who-2024", "tamiflu-label"],
    },
    {
      name: "Length of the preventive course: 7 days, 10 days or one dose",
      differs: "IDSA 2018: 7 days after the most recent exposure (A-III). UKHSA 2026: oseltamivir once daily for 10 days. US oseltamivir label: 75 mg once daily for at least 10 days after close contact. Baloxavir is a single dose under its US label, which licenses it for post-exposure prophylaxis from 5 years of age; UKHSA says it \"is not the first choice for post-exposure prophylaxis\" and keeps it for confirmed oseltamivir resistance where zanamivir cannot be given.",
      evidence: "The oseltamivir household trial in the US label used 7 days. In the baloxavir household trial in Japan (715 contacts aged 5 or over), laboratory-confirmed clinical influenza fell from 13% with placebo to 2% with baloxavir. Neither trial was in immunocompromised people.",
      sources: ["idsa-2018", "ukhsa-2026", "tamiflu-label", "xofluza-label"],
    },
    {
      name: "Watching closely and treating at the first symptom instead of prophylaxis",
      differs: "The exposed person takes no preventive course but has the medicine and instructions ready, and starts a full treatment course as soon as symptoms begin. IDSA lists this as an alternative that can be considered (C-III). UKHSA allows it only when the patient or carer has been given information and has chosen it, and \"the clinician has made arrangements in advance with a relevant pharmacy for the patient to promptly receive and start antiviral treatment within 48 hours of symptom onset (or 36 hours for zanamivir treatment)\".",
      evidence: "Expert opinion in both documents; no comparative trial is cited. It avoids giving a half dose to someone who may already be infected.",
      sources: ["idsa-2018", "ukhsa-2026"],
    },
    {
      name: "Length of treatment in immunocompromised patients: 5 days or 10 days",
      differs: "IDSA 2018 treats for 5 days and says a longer course can be considered in immunocompromise (C-III). UKHSA 2026: \"Oseltamivir PO may be given for 5 days and extended to 10 days in immunosuppressed patients\", giving the manufacturer's UK product information as its source. AGIHO 2025 says a prolonged course might be reasonable, especially in the severely immunocompromised, without a grade or a number of days. The US label gives 5 days.",
      evidence: "No trial read sets the length. UKHSA warns that prolonged treatment can be associated with resistance, particularly in immunosuppressed patients, and the US label reports treatment-associated resistance in 27% (8 of 30) of influenza A/H1N1 and 12% (6 of 52) of A/H3N2 infections in a treatment study of immunocompromised people, and in 32% (6 of 19) of stem cell transplant recipients.",
      sources: ["idsa-2018", "ukhsa-2026", "agiho-2025", "tamiflu-label"],
    },
    {
      name: "Baloxavir instead of, or added to, oseltamivir",
      differs: "A single-dose tablet with a different mechanism. AGIHO 2025 recommends it less strongly than oseltamivir: \"it was not studied in patients with cancer and is therefore only recommended with marginal strength\". UKHSA 2026 keeps oseltamivir first line and considers adding baloxavir, or switching to intravenous zanamivir, on specialist advice when the response is poor or resistance is a concern. WHO 2024 conditionally recommends baloxavir for non-severe influenza in people at high risk of progression and recommends against oseltamivir for non-severe influenza. IDSA 2018 makes no recommendation: \"As FDA approval occurred after finalization of these guidelines, the panel was unable to make recommendations on use of baloxavir.\"",
      evidence: "AGIHO notes a favourable safety profile in renal insufficiency and few drug interactions. UKHSA reports that the FLAGSTONE trial of baloxavir added to a neuraminidase inhibitor found no difference in time to clinical improvement, that resistance in trials ranged from 2% to 23%, and that \"there is insufficient data on expected rates of resistance in immunosuppressed groups\". The US label gives resistance-associated substitutions in 5% (6 of 134) of influenza A/H1N1 and 11% (53 of 485) of A/H3N2 infections in adults and adolescents.",
      sources: ["agiho-2025", "ukhsa-2026", "who-2024", "idsa-2018", "xofluza-label"],
    },
    {
      name: "Antiviral prophylaxis for the whole flu season after a stem cell transplant",
      differs: "Daily oseltamivir through the period of community influenza activity, without a known exposure. IDSA 2018 says it can be considered for those at highest risk, naming stem cell transplant recipients in the first 6 to 12 months after transplant (B-II). NICE TA158: \"Oseltamivir and zanamivir are not recommended for seasonal prophylaxis of influenza.\" The US label allows up to 12 weeks in immunocompromised patients.",
      evidence: "The US label describes a placebo-controlled trial of 12 weeks of seasonal prophylaxis in 475 immunocompromised people (388 solid organ and 87 stem cell transplant recipients) and states that safety was shown for up to 12 weeks but that efficacy in immunocompromised patients has not been established.",
      sources: ["idsa-2018", "nice-ta158", "tamiflu-label"],
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
    { claim: "Oseltamivir and zanamivir for patients with cancer and influenza, as graded in the guideline's text", grade: "BIIt", source: "agiho-2025", quote: "We therefore recommend treatment with oseltamivir and zanamivir with moderate strength in patients with cancer and influenza virus infection to shorten duration of infection and to prevent LRTD (BIIt, Table 4)." },
    { claim: "Oseltamivir and zanamivir, as graded in the same guideline's Table 4 (strength A, quality IIt), which differs from its text", grade: "A, IIt (Table 4)", source: "agiho-2025" },
    { claim: "Baloxavir for patients with cancer and influenza, as graded in the text (Table 4 prints strength B, quality IIt)", grade: "CIIt", source: "agiho-2025", quote: "Baloxavir has a favourable safety profile in renal insufficiency and has few drug-drug interactions, however, it was not studied in patients with cancer and is therefore only recommended with marginal strength (CIIt" },
    { claim: "Post-exposure prophylaxis in immunocompromised patients with cancer, ideally within 72 hours", grade: "BIIt", source: "agiho-2025" },
    { claim: "Post-exposure prophylaxis can be considered for the severely immunocompromised after household exposure", grade: "C-II", source: "idsa-2018", quote: "Clinicians can consider postexposure antiviral chemoprophylaxis for asymptomatic adults and children aged ≥3 months who are at very high risk of developing complications from influenza (eg, severely immunocompromised persons) and for whom influenza vaccination is contraindicated, unavailable, or expected to have low effectiveness, after household exposure to influenza (C-II)." },
    { claim: "Start post-exposure prophylaxis no later than 48 hours after exposure", grade: "A-III", source: "idsa-2018", quote: "If chemoprophylaxis is given, clinicians should administer postexposure antiviral chemoprophylaxis as soon as possible after exposure, ideally no later than 48 hours after exposure (A-III)." },
    { claim: "Post-exposure prophylaxis for 7 days after the most recent exposure", grade: "A-III", source: "idsa-2018", quote: "Clinicians should administer postexposure antiviral chemoprophylaxis in a nonoutbreak setting for 7 days after the most recent exposure to a close contact with influenza (A-III)." },
    { claim: "Post-exposure prophylaxis with oseltamivir or zanamivir for at-risk people, immunosuppression included, not effectively protected by vaccination", grade: "NICE technology appraisal, 2008 (ungraded)", source: "nice-ta158", quote: "Oseltamivir and zanamivir are recommended, within their marketing authorisations, for the post-exposure prophylaxis of influenza if all of the following circumstances apply." },
    { claim: "Oseltamivir or zanamivir treatment for at-risk people, including those who might be immunosuppressed, within 48 hours of symptoms", grade: "NICE technology appraisal, 2009 (ungraded)", source: "nice-ta168", quote: "People who are aged 65 years or older and people who might be immunosuppressed are also defined as 'at-risk' for the purpose of this guidance." },
    { claim: "Oseltamivir for exposed people without symptoms who are at extremely high risk", grade: "conditional recommendation for", source: "who-2024", quote: "conditional recommendation for the use of oseltamivir for asymptomatic persons at extremely high risk for hospitalization if they were to develop seasonal influenza" },
    { claim: "Baloxavir for exposed people without symptoms who are at extremely high risk", grade: "conditional recommendation for", source: "who-2024", quote: "conditional recommendation for the use of baloxavir for asymptomatic persons at extremely high risk for hospitalization if they were to develop seasonal influenza" },
    { claim: "Oseltamivir for severe influenza", grade: "conditional recommendation for", source: "who-2024", quote: "conditional recommendation for the use of oseltamivir for patients with severe influenza" },
    { claim: "Season-long prophylaxis can be considered for stem cell transplant recipients in the first 6 to 12 months and lung transplant recipients", grade: "B-II", source: "idsa-2018" },
    { claim: "A longer course of treatment can be considered in immunocompromised patients", grade: "C-III", source: "idsa-2018" },
    { claim: "Intravenous immunoglobulin can be considered when IgG is below 4 g/L", grade: "CIII", source: "agiho-2025", quote: "In hypogammaglobulinemia of IgG < 4 g/L, intravenous immunoglobulins (IVIGs) can be considered as a supportive treatment measure (CIII" },
    { claim: "Oseltamivir resistance arises more often in immunocompromised people", grade: "US prescribing information (ungraded)", source: "tamiflu-label", quote: "In immunocompromised adults and pediatrics (1 year of age and older), selection of influenza viruses resistant to oseltamivir can occur at higher frequencies than in the otherwise healthy population." },
    { claim: "Oseltamivir started a median of 5 days after symptom onset in critical illness: preliminary trial evidence of no benefit, as reported by UKHSA", grade: "ungraded; preliminary trial result", source: "ukhsa-2026", quote: "Preliminary evidence from the REMAP-CAP study conducted in critically ill patients aged over 12 years with confirmed influenza has shown a lack of benefit of oseltamivir monotherapy in established critical illness, where the drug was administered a median of 5 days after symptom onset." },
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
      accessed: "2026-11-16",
    },
    {
      key: "idsa-2018",
      label: "Clinical Practice Guidelines by the Infectious Diseases Society of America: 2018 Update on Diagnosis, Treatment, Chemoprophylaxis, and Institutional Outbreak Management of Seasonal Influenza",
      publisher: "IDSA (Clinical Infectious Diseases, Uyeki et al.)",
      year: 2019,
      url: "https://doi.org/10.1093/cid/ciy866",
      doi: "10.1093/cid/ciy866",
      gradingScheme: "US Public Health Service system: strength A (good evidence) to C (poor evidence) and quality I (at least one properly conducted randomised controlled trial) to III (opinion of respected authorities, clinical experience, descriptive studies or expert committee reports), printed as A-I to C-III.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ukhsa-2026",
      label: "Guidance on use of antiviral agents for the treatment and prophylaxis of seasonal influenza (updated 23 October 2026)",
      publisher: "UK Health Security Agency",
      year: 2026,
      url: "https://www.gov.uk/government/publications/influenza-treatment-and-prophylaxis-using-anti-viral-agents/guidance-on-use-of-antiviral-agents-for-the-treatment-and-prophylaxis-of-seasonal-influenza",
      gradingScheme: "UKHSA does not grade its recommendations; it ranks options as first, second and third line and cites the evidence beside each.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "nice-ta158",
      label: "Oseltamivir, amantadine (review) and zanamivir for the prophylaxis of influenza (TA158), recommendations",
      publisher: "NICE",
      year: 2008,
      url: "https://www.nice.org.uk/guidance/ta158/chapter/1-Guidance",
      gradingScheme: "NICE does not grade recommendations; a technology appraisal recommends a medicine or does not.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "nice-ta168",
      label: "Amantadine, oseltamivir and zanamivir for the treatment of influenza (TA168), recommendations",
      publisher: "NICE",
      year: 2009,
      url: "https://www.nice.org.uk/guidance/ta168/chapter/1-Guidance",
      gradingScheme: "NICE does not grade recommendations; a technology appraisal recommends a medicine or does not.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "who-2024",
      label: "Clinical practice guidelines for influenza: executive summary",
      publisher: "World Health Organization",
      year: 2024,
      url: "https://cdn.who.int/media/docs/default-source/health-care-readiness/clinical-guidelines-for-influenza---executive-summary.pdf",
      gradingScheme: "Strong or conditional recommendations, for or against. The executive summary does not print the certainty of evidence behind each.",
      read: "public-summary",
      accessed: "2026-11-16",
    },
    {
      key: "tamiflu-label",
      label: "TAMIFLU (oseltamivir phosphate) capsules and oral suspension: US prescribing information (manufacturer's label)",
      publisher: "Genentech (manufacturer), FDA-approved labelling published on DailyMed",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ee3c9555-60f2-4f82-a760-11983c86e97b",
      gradingScheme: "A manufacturer's label; it states licensed uses, doses and trial results and does not grade.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "xofluza-label",
      label: "XOFLUZA (baloxavir marboxil) tablets and granules: US prescribing information, revised 05/2025 (manufacturer's label)",
      publisher: "Genentech (manufacturer), FDA-approved labelling published on DailyMed",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e49e1a61-1b7c-4be5-ac84-af6240b511e7",
      gradingScheme: "A manufacturer's label; it states licensed uses, doses and trial results and does not grade.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ecil4-2013",
      label: "European guidelines for prevention and management of influenza in hematopoietic stem cell transplantation and leukemia patients: summary of ECIL-4 (2011)",
      publisher: "ECIL, a joint venture of EBMT, EORTC, ICHS and ELN (Transplant Infectious Disease, Engelhard et al.)",
      year: 2013,
      url: "https://doi.org/10.1111/tid.12054",
      doi: "10.1111/tid.12054",
      read: "abstract",
      accessed: "2026-11-16",
    },
  ],
  technologies: ["allogeneic-hsct"],
  terms: [],
  related: ["herpes-simplex-and-zoster-antiviral-prophylaxis", "vaccination-around-cancer-treatment", "neutropenic-precautions-and-daily-life", "hand-hygiene-in-cancer-care", "febrile-neutropenia-first-hour"],
  upgrades: ["idea-upgrade-influenza-post-exposure-prophylaxis-versus-early-treatment-in-cancer"],
  gaps: [
    "No randomised trial of post-exposure prophylaxis or of treatment length in people with cancer was found in the sources read. AGIHO grades on evidence transferred from other groups (IIt), and the US oseltamivir label states that efficacy for treatment or prophylaxis has not been established in immunocompromised patients.",
    "The bodies disagree on who should have post-exposure prophylaxis, when it is too late to start (72 hours in AGIHO, 48 hours in IDSA, UKHSA and NICE) and how long it lasts (7 days in IDSA, 10 days in UKHSA and the label). None of this has been compared directly.",
    "WHO 2024 recommends against oseltamivir for non-severe influenza and conditionally for baloxavir in people at high risk; only the executive summary was read, so how WHO defines high and extremely high risk, and whether people on cancer treatment fall in those groups, is not stated here.",
    "The AGIHO 2025 guideline prints different grades for the same drugs in its text and its Table 4 (oseltamivir and zanamivir BIIt in the text, strength A in the table; baloxavir CIIt in the text, strength B in the table). Both are shown; which is intended is not known.",
    "IDSA 2018 searched the literature only to March 2014 and predates baloxavir; no newer IDSA guideline on influenza treatment or prophylaxis was found.",
    "UKHSA reports preliminary REMAP-CAP results in critically ill patients (oseltamivir started a median of 5 days after symptom onset, no reduction in deaths, a higher death rate reported with oseltamivir than with no antiviral, and recruitment to the oseltamivir arms stopped in March 2026). The preprint was not read, and UKHSA notes the result may not apply to people treated earlier.",
    "The ECIL-4 influenza guideline (2013) was read as an abstract only; ASTCT and CDC guidance and the UK summaries of product characteristics were not read. The 10-day UK treatment course for immunosuppressed patients is taken from UKHSA's citation of the manufacturer, not from the product document.",
    "No record exists in this corpus for oseltamivir, zanamivir or baloxavir, so the protocol cannot yet link the medicines it is about.",
  ],
});
