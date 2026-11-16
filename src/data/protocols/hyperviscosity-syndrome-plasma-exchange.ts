import { protocol } from "./helpers";

/*
 * Hyperviscosity syndrome caused by a paraprotein (Waldenström macroglobulinaemia, myeloma): recognition, urgent plasma
 * exchange, and the rituximab IgM flare.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ASFA Guidelines on the Use of Therapeutic Apheresis in Clinical Practice, the Tenth Special Issue (Zantek et al.,
 *   J Clin Apher, published September 2026 per Crossref): full text of the fact sheet "Hyperviscosity in
 *   Hypergammaglobulinemia" and of the category and grade definitions, from the PubMed Central article page
 *   (PMC13580465), stripped to text. Europe PMC serves no full-text XML for it. This is the current edition: it
 *   replaces the Ninth Special Issue of 2023 (doi 10.1002/jca.22043), and its own literature search for this fact sheet
 *   is dated 6 September 2025.
 * - BSH guideline on Waldenström macroglobulinaemia (Pratt, El-Sharkawi et al., Br J Haematol 2022): full text. The
 *   publisher page (onlinelibrary.wiley.com) returned 403 to a script and Europe PMC holds no full text; the PDF of the
 *   published article hosted by the International Waldenstrom's Macroglobulinemia Foundation (iwmf.com) was read with
 *   pdftotext. Europe PMC lists no later BSH guideline on Waldenström macroglobulinaemia. Grades are quoted as printed.
 * - Gertz, "Acute hyperviscosity: syndromes and management" (Blood 2018): full text, PubMed Central article page
 *   (PMC6161773). A single-author narrative review from Mayo Clinic, ungraded; the author declares personal fees from
 *   several drug companies outside the work.
 * - Weaver, Rubinstein and Cornell, hyperviscosity in paraprotein secreting conditions (Front Oncol 2020): full text,
 *   Europe PMC full-text XML (PMC7248405). A narrative review, ungraded.
 * - Gustine et al. (Br J Haematol 2017), Abeykoon et al. (Am J Hematol 2018), Ghobrial et al. (Cancer 2004) and the
 *   report of consensus panel 1 of the 11th International Workshop on Waldenström's Macroglobulinemia (Buske et al.,
 *   Semin Hematol 2023): abstracts only, Europe PMC.
 * - ESMO Clinical Practice Guidelines on Waldenström's macroglobulinaemia (Kastritis et al., Ann Oncol 2018): not
 *   reachable. annalsofoncology.org returned 403, Europe PMC holds neither abstract nor full text, and the esmo.org
 *   guideline page serves no text to a script. Named in sources; nothing rests on it.
 * - Not read and not cited: the NCCN guideline (login), the Mayo mSMART guideline of 2016 (PubMed Central answered with
 *   a browser check), the full reports of the IWWM consensus panels, and the BSH myeloma guideline of 2021 (no abstract,
 *   publisher 403). No myeloma guideline that could be read addresses hyperviscosity; myeloma is covered here only
 *   through the ASFA fact sheet and the two reviews.
 *
 * Red cell transfusion before viscosity is lowered: the two reviews say to hold back or be cautious, and Gertz says
 * plainly that there is no scientific proof. Neither ASFA nor BSH mentions it. It is a step sourced to the reviews and
 * flagged as unproven, not a guideline recommendation.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and end-of-line hyphenation undone, nothing else changed. The ASFA and BSH texts print en dashes
 * in ranges; those appear only inside quotes.
 */
export const hyperviscositySyndromePlasmaExchange = protocol({
  id: "hyperviscosity-syndrome-plasma-exchange",
  name: "Hyperviscosity syndrome in Waldenström macroglobulinaemia and myeloma: recognition and plasma exchange",
  aka: ["hyperviscosity syndrome", "HVS", "plasmapheresis for hyperviscosity", "therapeutic plasma exchange for hyperviscosity", "IgM flare", "rituximab flare", "thick blood from a paraprotein", "paraprotein hyperviscosity"],
  domain: "emergencies",
  tldr: "In Waldenström macroglobulinaemia, and less often in myeloma, the abnormal antibody protein in the blood can build up until the blood becomes too thick to flow easily through small vessels. The warning signs are nosebleeds or bleeding gums that will not stop, blurred or lost vision, and headache, dizziness or drowsiness. It is an emergency: a machine removes the protein-rich plasma and replaces it (plasma exchange), which eases symptoms quickly, and treatment of the underlying cancer follows because the protein otherwise builds up again.",
  simple: "Too much of an abnormal protein can make the blood thick. Nosebleeds that will not stop, blurry sight, headache or sleepiness are the signs. Call your team or go to hospital the same day. A machine can wash the protein out of the blood, and then the cancer itself is treated.",
  summary: "Hyperviscosity syndrome (HVS) is a clinical diagnosis (BSH 2022): mucosal bleeding, visual disturbance and neurological symptoms in someone with a high paraprotein. ASFA 2026 puts it in 10% to 30% of people with Waldenström macroglobulinaemia and 2% to 6% with myeloma (typically IgA or IgG3). In two retrospective cohorts it occurred in 14% of 825 and 13% of 997 patients with Waldenström macroglobulinaemia and did not change overall survival. Fundoscopy is part of the assessment: retinal changes can be present without visual symptoms and are themselves a reason to treat (Gertz 2018, Weaver 2020). Plasma exchange is not held for a viscosity result (Gertz 2018).\n\nBoth guidelines read give plasma exchange their top rating for symptomatic HVS: ASFA category I, grade 1B, with no randomised trial behind it (3 controlled trials and more than 10 case series); BSH Grade A1, calling it a haematological emergency and also an indication for definitive treatment. ASFA: 1 to 1.5 total plasma volumes, daily or every other day, albumin or plasma replacement, generally 1 to 3 procedures, with viscosity and immunoglobulin monitored; IgG is less intravascular than IgM, so 4 to 5 exchanges may be needed, with fluid shifts after the procedure. Exchange does not treat the disease: ASFA says IgM returns to baseline about 3 to 5 weeks later, so systemic treatment follows.\n\nThe sources differ on three points. Viscosity threshold: ASFA says most patients are symptomatic at 6 to 7 cp and that HVS can occur above 4 cP; BSH says it should be considered above 3 mPas, citing a series in which about half of 85 symptomatic patients were below 4 mPas; Gertz says no level can be specified for exchange without symptoms. Rituximab IgM flare: ASFA (category I, grade 1C, from 3 case series and 3 case reports) says to consider exchange first when viscosity is above 3.5 cp or IgM above 4 g/dL (40 g/L), or else to hold rituximab for 1 to 3 cycles; BSH (Grade C1) says to defer rituximab or perform prophylactic plasmapheresis when IgM is above 40 g/L; Gertz calls pre-emptive exchange unproven against close monitoring. Whether an IgM above 60 g/L alone should start treatment: one cohort says yes, another no (variants).\n\nBoth reviews advise holding red cell transfusion in stable patients until viscosity is lowered; Gertz states there is no scientific proof for this, and neither guideline mentions it. The reader's own haematology team's protocol comes first; this page is for understanding the care, not for directing it.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "emergency-team", "patient-or-carer"],
    where: ["emergency-department", "acute-oncology-service", "ward", "intensive-care", "telephone-triage"],
  },
  population: "Adults with hyperviscosity caused by a blood protein: Waldenström macroglobulinaemia (monoclonal IgM), myeloma (the ASFA fact sheet names IgA and IgG3), and, in the ASFA fact sheet, polyclonal causes such as Sjögren's syndrome. The BSH guideline covers Waldenström macroglobulinaemia only. Thick blood from a very high white cell count in leukaemia or a high red cell count is a different condition with its own protocol (linked), as is cryoglobulinaemia. None of the sources read addresses children. Your own team's protocol comes first: the steps describe what hospital teams do and are not instructions for care at home, apart from knowing the warning signs and calling early.",
  trigger: "A person with Waldenström macroglobulinaemia, myeloma or a known high paraprotein develops bleeding from the nose or gums, a change in vision, or headache, dizziness, drowsiness or confusion; or rituximab is about to be started in someone with a high IgM.",
  steps: [
    {
      action: "Suspect hyperviscosity in anyone with a high paraprotein who has nose or gum bleeding, a change in vision, or new neurological symptoms",
      why: "These three kinds of symptom are how thick blood shows itself, and nosebleeds that keep coming back are often treated several times before anyone checks the blood.",
      source: "gertz-2018",
      quote: "The classic triad of hyperviscosity includes mucosal bleeding, visual abnormalities, and neurological abnormalities.",
    },
    {
      action: "Treat symptomatic hyperviscosity as an emergency and act the same day",
      why: "Acting early stops the damage going further; bleeding or a blocked vein in the eye or brain can leave lasting harm.",
      source: "bsh-wm-2022",
      quote: "Hyperviscosity is a haematological emergency and is an indication for therapeutic plasma exchange.",
      grade: "Grade A1",
    },
    {
      action: "Look at the back of both eyes (fundoscopy) whenever hyperviscosity is suspected",
      why: "The small veins of the retina show the strain first, sometimes before sight is affected, and what is seen there is a reason to treat.",
      source: "gertz-2018",
      quote: "Whenever HVS is suspected, ophthalmoscopy should be performed.",
    },
    {
      action: "Make the diagnosis on the symptoms and signs, and measure the paraprotein and the plasma or serum viscosity to support it",
      why: "No single viscosity number separates people with symptoms from people without, so the picture in front of the doctor decides.",
      source: "bsh-wm-2022",
      quote: "The diagnosis of HVS remains a clinical one.",
    },
    {
      action: "Send the viscosity sample but do not wait for the result before starting plasma exchange",
      why: "The test can take time to come back, and the treatment is what stops the bleeding and protects sight.",
      source: "gertz-2018",
      quote: "Plasma exchange should not be delayed awaiting viscosity results, but a sample should be sent for confirmation of the clinical impression.",
    },
    {
      action: "Arrange urgent therapeutic plasma exchange, then systemic treatment of the underlying disease",
      why: "Plasma exchange removes the protein that is thickening the blood and eases symptoms quickly; it does nothing to the cells that make the protein.",
      source: "asfa-2026",
      quote: "The recommended treatment approach is TPE followed by systemic treatment.",
      grade: "Category I, Grade 1B",
    },
    {
      action: "Secure venous access that gives enough blood flow for the exchange, usually a central line",
      why: "The machine has to draw and return blood quickly, which small veins in the arm often cannot support.",
      source: "weaver-2020",
      quote: "Central line placement is used to allow adequate blood flow.",
    },
    {
      action: "Exchange 1 to 1.5 plasma volumes daily or every other day, replacing with albumin or plasma, until the acute symptoms settle",
      why: "Most of the IgM protein is inside the blood vessels, so one to three sessions are usually enough in Waldenström macroglobulinaemia.",
      source: "asfa-2026",
      quote: "Daily or every other day TPE should be done until acute symptoms abate (generally 1–3 procedures).",
      grade: "Category I, Grade 1B",
    },
    {
      action: "Recheck symptoms, viscosity and the IgM or IgG level between sessions to decide whether another exchange is needed",
      why: "The number of sessions is set by how the person responds, not fixed in advance.",
      source: "asfa-2026",
      quote: "Clinical monitoring of viscosity and IgM or IgG levels is recommended during treatment to determine if subsequent TPE procedures are necessary.",
    },
    {
      action: "Where the protein is IgG, as in some myeloma, plan for more sessions and watch fluid balance at the end of and after each one",
      why: "Much of the IgG protein sits outside the blood vessels and moves back in after an exchange, so the level rebounds and fluid shifts with it.",
      source: "asfa-2026",
      quote: "In IgG‐associated HVS, IgG is 45%–65% intravascular. Therefore, 4–5 TPE may be needed.",
    },
    {
      action: "In a stable patient, hold back red cell transfusion until plasma exchange has lowered the viscosity",
      why: "Added red cells thicken the blood further, and the anaemia is partly dilution from expanded plasma. This rests on reasoning, not trials: Gertz writes that there is no scientific proof for it.",
      source: "weaver-2020",
      quote: "Caution should be taken to avoid excessive packed red blood cell or platelet transfusions until TPE has successfully reduced hyperviscosity",
    },
    {
      action: "Start definitive treatment of the Waldenström macroglobulinaemia or myeloma promptly after the exchange",
      why: "Without treatment the protein climbs back to where it was within weeks and the symptoms return.",
      source: "asfa-2026",
      quote: "For this reason, following TPE, it is important to initiate definitive systemic treatment (chemotherapy and/or immunotherapy).",
    },
    {
      action: "Before giving rituximab to someone with an IgM above 40 g/L, either defer the rituximab or perform plasma exchange first",
      why: "Rituximab can push the IgM up for a few weeks before it brings it down (the IgM flare), which can tip a person with a high level into hyperviscosity.",
      source: "bsh-wm-2022",
      quote: "The introduction of rituximab should be deferred (or prophylactic plasmapheresis performed) in patients considered at a higher risk of hyperviscosity, this being defined by an IgM/ M-protein >40 g/L",
      grade: "Grade C1",
    },
    {
      action: "After any rituximab dose in Waldenström macroglobulinaemia, follow the IgM level and check for symptoms of hyperviscosity",
      why: "A flare cannot be predicted from the person's features, so everyone given rituximab is watched for it.",
      source: "bsh-wm-2022",
      quote: "Given the risk of IgM flare, careful monitoring of all patients receiving rituximab is required with monitoring of sequential IgM levels, clinical assessment for hyperviscosity syndrome (HVS) and monitoring of plasma viscosity if available",
      grade: "Grade A1",
    },
    {
      action: "Tell the person and their family which symptoms mean thick blood, and to call the haematology team or go to hospital the same day if they appear",
      why: "The first signs happen at home, and a nosebleed or blurred sight is easy to put down to something else.",
      practice: "No source read states patient teaching as a recommendation. All of them rest on early recognition: ASFA writes that symptomatic HVS 'requires prompt recognition and intervention', and Gertz describes patients sent home repeatedly after cautery for nosebleeds before a blood count was taken.",
    },
  ],
  bestInClass: {
    statement: "For hyperviscosity with symptoms, the two guidelines read agree and give their highest ratings: urgent therapeutic plasma exchange (ASFA 2026 category I, grade 1B; BSH 2022 Grade A1), 1 to 1.5 plasma volumes daily or every other day until symptoms settle, generally 1 to 3 procedures, followed by systemic treatment because exchange does not treat the disease. No randomised trial supports this: ASFA counts 3 controlled trials and more than 10 case series. The diagnosis is clinical, the retina is examined, and exchange is not delayed for a viscosity result (Gertz 2018). On preventing a rituximab IgM flare the positions differ. ASFA (category I, grade 1C) says plasma exchange should be considered before rituximab when viscosity is above 3.5 cp or IgM above 4 g/dL, or rituximab held for 1 to 3 cycles until IgM is below 4 g/dL. BSH (Grade C1) says to defer rituximab or perform prophylactic plasmapheresis when IgM or M-protein is above 40 g/L, and to monitor everyone given rituximab (Grade A1). Gertz 2018 says pre-emptive exchange is unproven against close monitoring and that a flare from below 4000 mg/dL is unlikely to cause symptoms. On the viscosity at which to think of the syndrome, ASFA says most patients have symptoms at 6 to 7 cp, BSH says to consider it above 3 mPas, and Gertz says no threshold applies to everyone. Holding red cell transfusion until viscosity is lowered is advised by two reviews and is, in Gertz's words, without scientific proof; neither guideline addresses it.",
    sources: ["asfa-2026", "bsh-wm-2022", "gertz-2018", "weaver-2020"],
  },
  variants: [
    {
      name: "Preventing the rituximab IgM flare: plasma exchange first, rituximab later, or close watching",
      differs: "Three approaches are in use for a person with a high IgM who needs a rituximab regimen. Plasma exchange before the first rituximab dose: ASFA says \"Prophylactic TPE is performed to lower IgM to < 4 g/dL prior to rituximab therapy.\" Leaving rituximab out of the first cycles: ASFA says rituximab can be held at first, with the chemotherapy component given for 1 to 3 cycles until the serum IgM is below 4 g/dL, and BSH allows either route above 40 g/L. Close monitoring with treatment only if symptoms develop, which Gertz describes as the comparator that pre-emptive exchange has not been shown to beat.",
      evidence: "No trial compares them. ASFA grades prophylactic exchange 1C on 3 case series and 3 case reports; BSH grades its recommendation C1. Gertz: \"It is unproven that preemptive plasma exchange in asymptomatic patients with IgM levels >5000 prevent complications when compared with close monitoring following rituximab and the initiation of treatment if symptoms develop.\" How often a flare happens also differs by source: ASFA says 30% to 70% of patients within 4 weeks of starting rituximab; Gertz says 22%; in an Eastern Cooperative Oncology Group study of rituximab alone, IgM rose in 29 of 54 patients (54%) and was still raised at 4 months in 4 of 15, and no predicting factor was found.",
      sources: ["asfa-2026", "bsh-wm-2022", "gertz-2018", "ghobrial-2004"],
    },
    {
      name: "The viscosity level at which to consider the syndrome or to exchange without symptoms",
      differs: "ASFA: the syndrome can occur when IgM exceeds 4 g/dL and relative plasma viscosity exceeds 4 cP, and most patients are symptomatic at 6 to 7 cp. BSH: it should be considered above 3 mPas, and hyperviscosity rarely occurs with a paraprotein below 30 g/L. Gertz: each patient has their own threshold, so no viscosity level can be named above which people without symptoms should have prophylactic exchange, and \"Asymptomatic patients with an elevation in the serum viscosity do not require plasma exchange\". ASFA does describe exchange for retinal changes in people otherwise free of symptoms.",
      evidence: "Retrospective series. BSH cites a study in which about half of 85 patients with symptomatic hyperviscosity had a serum viscosity under 4 mPas. ASFA notes that viscosity does not consistently match symptoms between patients but that the level at which symptoms appear is generally reproducible in the same patient.",
      sources: ["asfa-2026", "bsh-wm-2022", "gertz-2018"],
    },
    {
      name: "Starting treatment for a very high IgM alone, before any symptoms",
      differs: "Some centres start treatment of Waldenström macroglobulinaemia when IgM is above 60 g/L (6000 mg/dL) even without symptoms, to head off hyperviscosity; others observe.",
      evidence: "Two retrospective cohorts point in opposite directions. Dana-Farber (Gustine 2017, 825 patients, 113 with symptomatic hyperviscosity): an IgM above 60 g/L at diagnosis was associated with a median of 3 months to symptomatic hyperviscosity, and the authors support it as a criterion to start therapy. Mayo Clinic (Abeykoon 2018, 997 patients, 130 with symptomatic hyperviscosity): of 13 people with smouldering disease and IgM above 6000 mg/dL who were observed, 15% later developed hyperviscosity symptoms and the median time to first therapy was 6.9 years; serum viscosity at diagnosis, not IgM, was the independent predictor, and the authors conclude such patients can be safely observed. In both cohorts hyperviscosity did not change overall survival.",
      sources: ["gustine-2017", "abeykoon-2018"],
    },
    {
      name: "Double (cascade) filtration instead of centrifugal plasma exchange",
      differs: "Plasma is separated and then passed through a second filter that holds back large proteins such as IgM and returns albumin, so less replacement fluid is needed. Gertz reports it is used mainly in Japan and is not approved in the United States.",
      evidence: "ASFA: \"Cascade filtration and membrane filtration techniques have been described and may have similar efficacy in removing M‐protein.\" Gertz cites a single-centre report of 260 procedures, 61% centrifugal and 39% double filtration, with similar reduction in viscosity and the same rate of adverse reactions.",
      sources: ["asfa-2026", "gertz-2018"],
    },
    {
      name: "Maintenance plasma exchange where systemic treatment cannot be given",
      differs: "Repeated exchange every 1 to 4 weeks, guided by symptoms or retinal changes, to keep a person below the level at which their own symptoms appear. ASFA: \"Pregnant patients and those who are unable to receive systemic therapy may be candidates for maintenance TPE.\"",
      evidence: "Described in the ASFA fact sheet without a separate grade. It holds the protein down while it lasts and does not treat the disease.",
      sources: ["asfa-2026"],
    },
    {
      name: "Fast-acting drug treatment without plasma exchange when there are no symptoms",
      differs: "For a person with a raised viscosity, a reason to treat and no symptoms, Gertz describes going straight to a regimen that lowers the protein quickly, and for myeloma names bortezomib-based triplets as the fastest.",
      evidence: "Review opinion drawing on response-time data from treatment trials: \"For patients who have hyperviscosity, an indication for therapy, and no symptoms, rapid-acting systemic chemotherapy can reduce the serum viscosity and obviate the need for plasma exchange.\" The 2023 international workshop panel states the shared principle of reducing tumour and abnormal protein burden rapidly and deeply; its full report was not read.",
      sources: ["gertz-2018", "iwwm11-cp1-2023"],
    },
  ],
  grades: [
    { claim: "Therapeutic plasma exchange for symptomatic hyperviscosity in hypergammaglobulinaemia", grade: "Category I, Grade 1B", source: "asfa-2026", quote: "Symptomatic HVS is a potentially life‐threatening medical emergency." },
    { claim: "Therapeutic plasma exchange as prophylaxis before rituximab", grade: "Category I, Grade 1C", source: "asfa-2026", quote: "Therefore, in patients with serum viscosity > 3.5 cp or IgM level > 4 g/dL, TPE should be considered prior to rituximab." },
    { claim: "What ASFA category I means", grade: "Category I", source: "asfa-2026", quote: "Disorders for which apheresis is accepted as first‐line therapy, either as a primary standalone treatment or in conjunction with other modes of treatment." },
    { claim: "Hyperviscosity is an emergency, an indication for plasma exchange and an indication for definitive treatment", grade: "Grade A1", source: "bsh-wm-2022", quote: "This is also an indication for definitive treatment" },
    { claim: "Defer rituximab or perform prophylactic plasmapheresis when IgM or M-protein is above 40 g/L", grade: "Grade C1", source: "bsh-wm-2022" },
    { claim: "Monitor IgM, symptoms and plasma viscosity in everyone given rituximab", grade: "Grade A1", source: "bsh-wm-2022" },
    { claim: "A single-volume exchange lowers the paraprotein by about 40%, and 1 to 3 procedures are usually needed", grade: "ungraded text", source: "bsh-wm-2022", quote: "Single-volume plasma exchange will reduce the paraprotein by approximately 40%. It usually takes 1–3 procedures for symptoms and viscosity to reduce." },
    { claim: "Consider hyperviscosity when viscosity is above 3 mPas", grade: "ungraded text", source: "bsh-wm-2022", quote: "approximately half of 85 patients with symptomatic HVS had a serum viscosity less that 4 mPas and so it should be considered if greater than 3 mPas" },
    { claim: "Each exchange lowers viscosity by 20% to 30%, so about 1 to 2 are needed for IgM", grade: "ungraded text", source: "asfa-2026", quote: "Each TPE reduces viscosity by 20%–30%. Therefore, only about 1–2 TPE are needed." },
    { claim: "IgM returns to baseline about 3 to 5 weeks after exchange", grade: "ungraded text", source: "asfa-2026", quote: "After about 3–5 weeks following TPE, serum IgM levels return to baseline." },
    { claim: "Withholding red cell transfusion in stable patients until viscosity is normal has no trial evidence", grade: "ungraded (narrative review)", source: "gertz-2018", quote: "Although there is no scientific proof, there is a theoretical argument that could be made to withhold transfusion in hemodynamically stable patients until serum viscosity is normalized in order to avoid the rheological impact of adding red cells to the circulation." },
    { claim: "Retinal signs can be present without visual symptoms and are a reason to treat", grade: "ungraded (narrative review)", source: "weaver-2020", quote: "Due to the high prevalence of ophthalmologic manifestations of HVS, a fundoscopic examination should be performed in any patient with suspected HVS or with a serum IgM > 3 g/dL." },
    { claim: "Add rituximab only once IgM is below 4,000 mg/dL", grade: "ungraded (narrative review)", source: "weaver-2020", quote: "However, given the risk of rituximab induced IgM flare, the addition of rituximab is recommended only when the serum IgM level is <4,000 mg/dL." },
    { claim: "Severe adverse events with plasma exchange: 1.0% in a European registry of over 7,000 patients", grade: "ungraded (narrative review)", source: "weaver-2020", quote: "In general, TPE is a safe procedure, with a severe adverse event rate of 1.0% in a European registry study of over 7,000 patients undergoing filtration-based exchange" },
  ],
  sources: [
    {
      key: "asfa-2026",
      label: "Guidelines on the Use of Therapeutic Apheresis in Clinical Practice, Evidence-Based Approach From the Writing Committee of the American Society for Apheresis: The Tenth Special Issue (fact sheet: Hyperviscosity in Hypergammaglobulinemia)",
      publisher: "American Society for Apheresis (Journal of Clinical Apheresis, Zantek et al.)",
      year: 2026,
      url: "https://doi.org/10.1002/jca.70141",
      doi: "10.1002/jca.70141",
      gradingScheme: "ASFA category I to IV for the role of apheresis (I: accepted as first-line therapy, alone or with other treatment) and a GRADE-based grade: 1 strong or 2 weak recommendation, with A high, B moderate, C low or very low quality evidence (1B: strong recommendation, moderate quality evidence; 1C: strong recommendation, low-quality or very low-quality evidence).",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "bsh-wm-2022",
      label: "Guidelines on the diagnosis and management of Waldenström macroglobulinaemia: a British Society for Haematology guideline",
      publisher: "British Society for Haematology (British Journal of Haematology, Pratt, El-Sharkawi et al.)",
      year: 2022,
      url: "https://doi.org/10.1111/bjh.18036",
      doi: "10.1111/bjh.18036",
      gradingScheme: "GRADE nomenclature for the level of evidence and the strength of the recommendation, printed after each recommendation as a letter and a number (Grade A1, Grade B1, Grade C1, Grade B2); statements in the body text carry no grade.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "gertz-2018",
      label: "Acute hyperviscosity: syndromes and management",
      publisher: "Blood (Gertz, Mayo Clinic; narrative review, the author declares personal fees from drug companies outside the work)",
      year: 2018,
      url: "https://doi.org/10.1182/blood-2018-06-846816",
      doi: "10.1182/blood-2018-06-846816",
      gradingScheme: "Narrative review; its statements are not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "weaver-2020",
      label: "Hyperviscosity Syndrome in Paraprotein Secreting Conditions Including Waldenstrom Macroglobulinemia",
      publisher: "Frontiers in Oncology (Weaver, Rubinstein and Cornell; narrative review)",
      year: 2020,
      url: "https://doi.org/10.3389/fonc.2020.00815",
      doi: "10.3389/fonc.2020.00815",
      gradingScheme: "Narrative review; its statements are not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "gustine-2017",
      label: "Serum IgM level as predictor of symptomatic hyperviscosity in patients with Waldenström macroglobulinaemia",
      publisher: "British Journal of Haematology (Gustine et al., Dana-Farber Cancer Institute)",
      year: 2017,
      url: "https://doi.org/10.1111/bjh.14743",
      doi: "10.1111/bjh.14743",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "abeykoon-2018",
      label: "Predictors of symptomatic hyperviscosity in Waldenström macroglobulinemia",
      publisher: "American Journal of Hematology (Abeykoon et al., Mayo Clinic)",
      year: 2018,
      url: "https://doi.org/10.1002/ajh.25254",
      doi: "10.1002/ajh.25254",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "ghobrial-2004",
      label: "Initial immunoglobulin M 'flare' after rituximab therapy in patients diagnosed with Waldenstrom macroglobulinemia: an Eastern Cooperative Oncology Group Study",
      publisher: "Cancer (Ghobrial et al.)",
      year: 2004,
      url: "https://doi.org/10.1002/cncr.20658",
      doi: "10.1002/cncr.20658",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "iwwm11-cp1-2023",
      label: "Report of consensus panel 1 from the 11th International Workshop on Waldenstrom's Macroglobulinemia on management of symptomatic, treatment-naïve patients",
      publisher: "Seminars in Hematology (Buske et al.)",
      year: 2023,
      url: "https://doi.org/10.1053/j.seminhematol.2023.03.005",
      doi: "10.1053/j.seminhematol.2023.03.005",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "esmo-wm-2018",
      label: "Waldenström's macroglobulinaemia: ESMO Clinical Practice Guidelines for diagnosis, treatment and follow-up",
      publisher: "ESMO (Annals of Oncology, Kastritis et al.)",
      year: 2018,
      url: "https://doi.org/10.1093/annonc/mdy146",
      doi: "10.1093/annonc/mdy146",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
  ],
  cancers: ["waldenstrom", "multiple-myeloma"],
  drugs: ["rituximab"],
  terms: ["m-protein-free-light-chains", "apheresis"],
  related: ["hyperleukocytosis-leukostasis", "red-cell-and-platelet-transfusion-thresholds"],
  upgrades: ["idea-upgrade-rituximab-igm-flare-prevention-comparison"],
  gaps: [
    "No randomised trial of plasma exchange for hyperviscosity exists in the sources read: the ASFA fact sheet counts 0 randomised trials, 3 controlled trials and more than 10 case series for symptomatic disease, and 3 case series and 3 case reports for prophylaxis before rituximab.",
    "Whether plasma exchange before rituximab prevents harm better than deferring rituximab or watching closely has not been tested; ASFA and BSH recommend acting at an IgM of 4 g/dL (40 g/L) on low-grade evidence and Gertz 2018 calls pre-emptive exchange unproven.",
    "Holding red cell transfusion until viscosity is lowered rests on a theoretical argument. Gertz 2018 says there is no scientific proof; neither the ASFA fact sheet nor the BSH guideline mentions transfusion in this setting.",
    "The ESMO guideline on Waldenström's macroglobulinaemia (2018) could not be read: the journal site returned 403 to a script, Europe PMC holds no abstract or full text, and the ESMO page serves no text to a script. Nothing here rests on it.",
    "The full reports of the International Workshop consensus panels (2020 and 2023), the NCCN guideline and the Mayo mSMART guideline were not read; only the abstract of the 2023 panel 1 report is cited.",
    "No myeloma guideline that could be read addresses hyperviscosity. The BSH myeloma guideline of 2021 could not be read (no abstract, publisher 403), and the myeloma content here comes from the ASFA fact sheet and two reviews.",
    "The sources print viscosity in different units and against different references (cp or cP relative to water in ASFA, mPas in BSH, plasma in some places and serum in others), so their thresholds cannot be lined up exactly.",
    "None of the sources read gives a time target, such as hours from recognition to the first exchange, and none addresses children.",
  ],
});
