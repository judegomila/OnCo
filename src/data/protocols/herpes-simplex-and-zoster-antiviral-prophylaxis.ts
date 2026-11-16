import { protocol } from "./helpers";

/*
 * Antiviral prophylaxis against herpes simplex (HSV) and varicella zoster (VZV) reactivation during cancer treatment.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - AGIHO/DGHO 2022 update on herpesvirus reactivations in solid tumours and haematological malignancies (Henze et
 *   al., Ann Hematol 2022), open access, full text from Europe PMC (PMC8810475, full-text XML). It replaces the AGIHO
 *   2015 antiviral guideline (PMC4525190, also read), and is the most recent edition a Europe PMC author search found.
 * - ASCO/IDSA 2018 antimicrobial prophylaxis update (Taplitz et al., J Clin Oncol 2018): abstract only, from Europe
 *   PMC; no free full text was found.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 */
export const herpesSimplexAndZosterAntiviralProphylaxis = protocol({
  id: "herpes-simplex-and-zoster-antiviral-prophylaxis",
  name: "Aciclovir prophylaxis against herpes simplex and shingles during cancer treatment",
  aka: ["acyclovir prophylaxis", "aciclovir prophylaxis", "valaciclovir prophylaxis", "HSV prophylaxis", "VZV prophylaxis", "shingles prevention bortezomib", "herpes zoster prophylaxis"],
  domain: "infection-prevention",
  tldr: "The viruses behind cold sores and shingles stay in the body for life and can flare when cancer treatment weakens the immune system. People having intensive leukaemia treatment, a stem cell transplant, or myeloma drugs such as bortezomib are usually given an antiviral tablet, aciclovir or valaciclovir, to prevent this. Most people having ordinary chemotherapy for a solid tumour do not need it.",
  simple: "Some cancer treatments make cold sores and shingles more likely. For those treatments, your team may give you a daily antiviral tablet to stop them coming back.",
  summary: "ASCO/IDSA (2018) recommend nucleoside analogue prophylaxis such as aciclovir for HSV-seropositive patients having allogeneic stem cell transplant or leukaemia induction. AGIHO (2022, adults) recommends oral aciclovir 400 mg twice or four times daily against oral HSV disease (AIIr), valaciclovir as an alternative (BI), and intravenous aciclovir 250 mg/m2 three times daily if oral medication is not tolerated (AIIr). Against VZV, oral aciclovir from 400 mg once daily to 400 mg three times daily (AII). Indications: acute leukaemia on intensive chemotherapy, from induction through neutropenia (BIIr); ALL throughout treatment (BI); acute promyelocytic leukaemia on arsenic trioxide, during treatment and 6 months after (BIIr); any proteasome inhibitor-based myeloma regimen, bortezomib strongly (AII); idelalisib (BIII); selected lymphoma and CLL by individual risk. Not generally indicated for VZV in solid tumours (DIII), where 5-year cumulative zoster incidence is about 5%; consider it with long-term corticosteroids (CIIu), continued up to 6 months after steroids stop. Serology is optional because about 90% of adults are HSV-1 and VZV seropositive, so universal prophylaxis is equally appropriate. Recombinant (non-live) zoster vaccine is recommended, with aciclovir still added in high-risk groups until comparative data exist; live zoster vaccine is contraindicated. All three nucleoside analogues need dose adjustment in renal impairment. Brivudin is contraindicated with fluoropyrimidines.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse"],
    where: ["outpatient-clinic", "ward", "chemotherapy-day-unit"],
  },
  population: "Adults with solid tumours or haematological cancers outside the transplant setting (AGIHO 2022, whose literature search was restricted to adults), and adults having allogeneic transplant or leukaemia induction (ASCO/IDSA 2018). Prophylaxis after allogeneic and autologous transplant is referred by AGIHO to its transplant guidelines. Children are not covered by either source.",
  trigger: "A treatment with a known high risk of HSV or VZV reactivation is about to start.",
  steps: [
    {
      action: "Before intensive leukaemia induction or allogeneic transplant, start a nucleoside analogue such as aciclovir in anyone who has had herpes simplex",
      why: "Without it, herpes simplex flares in a third to two thirds of people on intensive leukaemia treatment, mostly as painful mouth ulcers.",
      source: "asco-idsa-2018",
      quote: "Herpes simplex virus-seropositive patients undergoing allogeneic hematopoietic stem-cell transplantation or leukemia induction therapy should receive nucleoside analog-based antiviral prophylaxis, such as acyclovir.",
    },
    {
      action: "Do not wait for serology if it is not available: treat everyone with an indication as at risk",
      why: "About nine in ten adults already carry these viruses, so testing first changes the decision for few people.",
      source: "agiho-2022",
      quote: "We consider a universal prophylactic strategy for all patients with indication for prophylaxis of HSV as equally appropriate, because seroprevalence of HSV-1 is about 90% for adults.",
    },
    {
      action: "In acute leukaemia on intensive chemotherapy, give aciclovir or valaciclovir from the start of induction through the neutropenic phase",
      why: "In trials aciclovir cut symptomatic herpes simplex to a tenth of the rate with placebo.",
      source: "agiho-2022",
      quote: "Considering the high risk of reactivation prophylactic acyclovir or valacyclovir should be applied in patients with acute leukaemia receiving intensive chemotherapy to reduce HSV stomatitis, and to reduce other HSV reactivations (BIIr) (Table 6).",
      grade: "BIIr",
    },
    {
      action: "Use oral aciclovir 400 mg twice or four times daily against herpes simplex, or intravenous aciclovir 250 mg/m2 three times daily if tablets cannot be taken",
      why: "A network analysis of thirteen trials found these the most effective regimens, and twice daily worked almost as well as four times daily.",
      source: "agiho-2022",
      quote: "We recommend oral acyclovir 400 mg BID or 400 mg QID as prophylaxis of oral HSV disease (AIIr).",
      grade: "AIIr",
    },
    {
      action: "In acute lymphoblastic leukaemia, continue prophylaxis against both viruses for as long as treatment lasts",
      why: "ALL treatment is long and includes steroids and sometimes anti-CD20 antibodies, all of which raise the risk.",
      source: "agiho-2022",
      quote: "antiviral prophylaxis to reduce reactivation of HSV and VZV is recommended for patients with acute lymphoblastic leukaemia while on treatment (BI) (Table 6).",
      grade: "BI",
    },
    {
      action: "Give aciclovir to everyone on a bortezomib-based myeloma regimen, and to those on other proteasome inhibitors",
      why: "Shingles affected 13% of people on bortezomib in the VISTA trial, and about 3% when they also took an antiviral.",
      source: "agiho-2022",
      quote: "Therefore, we strongly recommend acyclovir prophylaxis in patients receiving bortezomib-based treatment regimens (AII) (Table 7).",
      grade: "AII",
    },
    {
      action: "For shingles prevention use oral aciclovir between 400 mg once daily and 400 mg three times daily",
      why: "All these doses have worked; no trial has compared them.",
      source: "agiho-2022",
      quote: "We recommend oral acyclovir to reduce clinical VZV reactivation; dosages from 400 mg once daily to 400 mg TID have been shown to be effective (AII).",
      grade: "AII",
    },
    {
      action: "Do not give routine shingles prophylaxis with ordinary chemotherapy for a solid tumour",
      why: "Without prophylaxis only about 5 in 100 people with solid tumours get shingles within five years.",
      source: "agiho-2022",
      quote: "Pharmacological prophylaxis to prevent disease by reactivation of VZV in patients with solid tumours is not generally indicated (DIII) (Table 5).",
      grade: "DIII",
    },
    {
      action: "Consider prophylaxis for people on high-dose corticosteroids for a long time, and continue it for up to 6 months after the steroids stop",
      why: "Steroids at 10 mg prednisolone a day or more for two weeks or longer raise the risk of shingles.",
      source: "agiho-2022",
      quote: "Antiviral prophylaxis might be continued for up to 6 months after corticosteroids have been terminated [76].",
      grade: "CIIu",
    },
    {
      action: "Offer the recombinant (non-live) shingles vaccine, and keep aciclovir going in high-risk groups alongside it",
      why: "The vaccine is safe in cancer but works less well during treatment, and no trial has yet shown it can replace the tablet.",
      source: "agiho-2022",
      quote: "Until more data are available, particularly of comparative trials for vaccination versus pharmacological prophylaxis, it is suggested to apply acyclovir additionally in high risk patient groups (for recommendations see below).",
    },
    {
      action: "Adjust the dose of aciclovir, valaciclovir or famciclovir to kidney function",
      why: "All three are cleared by the kidneys and build up when kidney function is poor.",
      source: "agiho-2022",
      quote: "Of note, all three nucleoside analogues (acyclovir, valacyclovir, famciclovir) require dose adjustment in patients with renal impairment.",
    },
  ],
  bestInClass: {
    statement: "ASCO/IDSA (2018) and AGIHO (2022) agree that HSV prophylaxis with aciclovir belongs in leukaemia induction and allogeneic transplant. AGIHO is the more detailed and more recent: oral aciclovir 400 mg twice or four times daily for HSV (AIIr), 400 mg once to three times daily for VZV (AII), for intensive leukaemia treatment, ALL throughout therapy, arsenic trioxide in acute promyelocytic leukaemia, and every proteasome inhibitor regimen in myeloma, but not routinely for solid tumours (DIII). The recombinant zoster vaccine is recommended but does not yet replace aciclovir in high-risk groups. Duration is the main unsettled point: AGIHO gives 28 to 100 days in AML trials, the whole of ALL treatment, 6 months after arsenic trioxide or after steroids, and individual extension in lymphoma where reactivations occurred up to 51 months after treatment began.",
    sources: ["agiho-2022", "asco-idsa-2018"],
  },
  variants: [
    {
      name: "Valaciclovir instead of aciclovir",
      differs: "Uses valaciclovir, a better absorbed prodrug, at 250 or 500 mg twice daily for HSV, or for VZV in myeloma.",
      evidence: "AGIHO grades valaciclovir for HSV BI, and for VZV CIIu in general and BIIu with proteasome inhibitors; the best valaciclovir dose for HSV is not defined.",
      sources: ["agiho-2022"],
    },
    {
      name: "Low-dose aciclovir with proteasome inhibitors",
      differs: "Uses 400 mg once daily, or lower, for shingles prevention during bortezomib, carfilzomib or ixazomib.",
      evidence: "Mainly retrospective series; AGIHO's 2015 edition noted that the risk of aciclovir resistance with low doses has not been assessed.",
      sources: ["agiho-2022", "agiho-2015"],
    },
  ],
  grades: [
    { claim: "Oral aciclovir 400 mg twice or four times daily against oral HSV disease", grade: "AIIr", source: "agiho-2022" },
    { claim: "Valaciclovir as an alternative against oral HSV disease", grade: "BI", source: "agiho-2022", quote: "Oral valacyclovir can be used alternatively (BI), but the best regimen (250 mg BID or 500 mg BID) has not yet been defined." },
    { claim: "Prophylaxis in acute leukaemia on intensive chemotherapy", grade: "BIIr", source: "agiho-2022" },
    { claim: "Prophylaxis in ALL throughout treatment", grade: "BI", source: "agiho-2022" },
    { claim: "Aciclovir with bortezomib-based regimens", grade: "AII", source: "agiho-2022" },
    { claim: "No routine VZV prophylaxis in solid tumours", grade: "DIII", source: "agiho-2022" },
    { claim: "Consider prophylaxis with long-term high-dose corticosteroids", grade: "CIIu", source: "agiho-2022" },
  ],
  sources: [
    { key: "agiho-2022", label: "Management of herpesvirus reactivations in patients with solid tumours and hematologic malignancies: update of the Guidelines of the Infectious Diseases Working Party (AGIHO) of the German Society for Hematology and Medical Oncology (DGHO) on herpes simplex virus type 1, herpes simplex virus type 2, and varicella zoster virus", publisher: "AGIHO/DGHO, Annals of Hematology", year: 2022, url: "https://europepmc.org/article/PMC/PMC8810475", doi: "10.1007/s00277-021-04746-y", gradingScheme: "Strength of recommendation A (strongly supports use) to D (supports a recommendation against use), quality of evidence I (randomised trial) to III (expert opinion), with an index for level II (r meta-analysis, t transferred evidence, h historical control, u uncontrolled trial), printed together, for example AIIr.", read: "full-text", accessed: "2026-11-11" },
    { key: "agiho-2015", label: "Antiviral prophylaxis in patients with solid tumours and haematological malignancies: update of the Guidelines of the Infectious Diseases Working Party (AGIHO) of the German Society for Hematology and Medical Oncology (DGHO)", publisher: "AGIHO/DGHO, Annals of Hematology", year: 2015, url: "https://europepmc.org/article/PMC/PMC4525190", doi: "10.1007/s00277-015-2447-3", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-idsa-2018", label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update", publisher: "ASCO and IDSA, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/30179565", doi: "10.1200/JCO.18.00374", read: "abstract", accessed: "2026-11-11" },
  ],
  terms: ["lymphoma-tx-pjp-and-infection-prophylaxis"],
  upgrades: [],
  gaps: [
    "The ASCO/IDSA 2018 guideline was read only as an abstract, so its doses, durations and grades for antiviral prophylaxis are not stated here.",
    "Neither source covers children; paediatric doses and indications come from local or national paediatric protocols not read for this page.",
    "Prophylaxis after allogeneic and autologous transplant, and against cytomegalovirus, is set by transplant guidelines (ECIL, EBMT, AGIHO's transplant guidelines) not read for this page.",
    "How long to continue prophylaxis is not settled outside the situations named, and no trial has compared the recombinant zoster vaccine with aciclovir.",
    "Influenza antiviral prophylaxis after exposure, which the census row also names, is not covered by these sources and is not addressed here.",
  ],
  institutions: ["asco"],
  cancers: ["aml", "all-leukemia", "multiple-myeloma", "cll"],
  drugs: ["bortezomib", "idelalisib", "valaciclovir"],
  technologies: ["allogeneic-hsct", "autologous-stem-cell-transplant"],
  related: ["lymphoma-tx-pjp-and-infection-prophylaxis"],
  sections: ["supportive-care"],
  tags: ["protocol", "antiviral-prophylaxis", "infection-prevention"],
});
