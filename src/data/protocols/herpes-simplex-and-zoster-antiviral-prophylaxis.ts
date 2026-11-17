import { protocol } from "./helpers";

/*
 * Antiviral prophylaxis against herpes simplex (HSV) and varicella zoster (VZV) reactivation during cancer treatment.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text (curl, pdftotext for PDFs, tags stripped from XML by script) and each claim was read against it.
 * - AGIHO/DGHO 2022 on HSV and VZV outside transplant (Henze et al., Ann Hematol 2022): full text, Europe PMC REST
 *   XML (PMC8810475). Still the latest AGIHO edition in a Europe PMC title search. Table rows were read cell by cell.
 * - AGIHO/DGHO 2015 antiviral guideline (PMC4525190): full text, Europe PMC XML. Superseded by the 2022 edition for
 *   HSV and VZV; cited only for what it says about low doses, purine analogues and alemtuzumab.
 * - AGIHO/DGHO 2020 update on infections after autologous transplant (PMC7572248) and AGIHO/DGHO with DAG-KBT 2016
 *   on allogeneic transplant (PMC4972852): full text, Europe PMC XML. Added in this pass.
 * - ASTCT 2024 best practice considerations on infection after CAR T (PMC12826105): full text XML saved on
 *   17 November 2026 by the checker of car-t-infection-prevention and re-used. Added in this pass.
 * - ECIL-2 slide sets on HSV and on VZV (2007) and the ECIL 11 vaccination slide sets (September and October 2026):
 *   PDFs from ecil-leukaemia.com, read with pdftotext. Added in this pass. The ECIL-2 journal paper (Styczynski et
 *   al., Bone Marrow Transplant 2009, 10.1038/bmt.2008.386) shows only its abstract on nature.com.
 * - US prescribing information for daratumumab (DailyMed SPL XML, label revised 06/2026). Added in this pass.
 * - ASCO/IDSA 2018 (Taplitz et al., J Clin Oncol): abstract only, from the Europe PMC record a sibling checker saved
 *   on 17 November 2026; ascopubs.org refuses a script and there is no open copy.
 * - Not readable: the IMWG 2022 myeloma infection guideline (Lancet Haematology, no open copy) and the NCCN
 *   guideline on cancer-related infections (login required).
 * DOIs were resolved through Crossref or Europe PMC and titles checked. Quotes are copied from the raw text with line
 * breaks joined and nothing else changed, and were checked by script against the saved copies.
 */
export const herpesSimplexAndZosterAntiviralProphylaxis = protocol({
  id: "herpes-simplex-and-zoster-antiviral-prophylaxis",
  name: "Aciclovir prophylaxis against herpes simplex and shingles during cancer treatment",
  aka: ["acyclovir prophylaxis", "aciclovir prophylaxis", "valaciclovir prophylaxis", "HSV prophylaxis", "VZV prophylaxis", "shingles prevention bortezomib", "herpes zoster prophylaxis"],
  domain: "infection-prevention",
  tldr: "The viruses behind cold sores and shingles stay in the body for life and can flare when cancer treatment weakens the immune system. People having intensive leukaemia treatment, a stem cell transplant, CAR T cells, or myeloma drugs such as bortezomib are usually given an antiviral tablet, aciclovir or valaciclovir, to prevent this. Routine use is not advised with most solid tumour treatment.",
  simple: "Some cancer treatments make cold sores and shingles more likely. For those treatments, your team may give you a daily antiviral tablet to stop them coming back.",
  summary: "ASCO/IDSA (2018, abstract only): HSV-seropositive patients having allogeneic transplant or leukaemia induction should receive a nucleoside analogue such as aciclovir. AGIHO (2022, adults outside transplant and cell therapy): oral aciclovir 400 mg twice or four times daily against oral HSV disease (AIIr), valaciclovir as an alternative (BI; 250 mg or 500 mg twice daily, best regimen not defined), intravenous aciclovir 250 mg/m2 three times daily if oral medication is not tolerated (AIIr). Against VZV, oral aciclovir from 400 mg once daily to 400 mg three times daily (AII); valaciclovir CIIu. With normal renal function its tables give aciclovir 400 mg twice daily (twice or four times daily in the lymphoma and myeloma table) and valaciclovir 500 mg twice daily. Indications: acute leukaemia on intensive chemotherapy (BIIr), in AML from the start of induction through the neutropenic phase; ALL while on treatment (BI in the text; the table gives B III for zoster); acute promyelocytic leukaemia on arsenic trioxide, during treatment and until 6 months after (BIIr); myeloma on bortezomib (AII; valaciclovir BIIu), carfilzomib (AIIu) or ixazomib (AIIh), but only selected cases on lenalidomide (CIIh), daratumumab or elotuzumab (CIIt); idelalisib (BIII); non-Hodgkin lymphoma (BIIu) and CLL (BIIuh) on immunochemotherapy, after individual risk assessment; BTK or BCL2 inhibitors on individual risk (CIIu). Not generally indicated in solid tumours (DIII), where the 5-year cumulative incidence of zoster is 5%; it might be considered with long-term high-dose corticosteroids (CIIu) and might be continued for up to 6 months after they stop. The US daratumumab label goes further than AGIHO: start antiviral prophylaxis within 1 week of starting and continue for 3 months after treatment ends.\n\nTransplant and CAR T: AGIHO (2020) strongly recommends aciclovir for at least 6 months after autologous transplant (A IIt against HSV, A IIu against VZV). AGIHO (2016) after allogeneic transplant: aciclovir 400 mg three times daily up to day 30 against HSV (A II) and, for VZV-seropositive recipients, 800 mg twice daily up to 1 year (A I), longer while on intensified immunosuppression (BIII). The ECIL-2 slide sets (2007) give 3 to 5 weeks against HSV and one year against VZV after allogeneic transplant (AII), and call prophylaxis after autologous transplant controversial. ASTCT (2024) gives aciclovir 400 mg or valaciclovir 500 mg twice daily from lymphodepletion until at least 6 months after CAR T infusion.\n\nAGIHO 2022 calls serology useful before intensive leukaemia treatment (BIII) and universal prophylaxis equally appropriate, because about 90% of adults are HSV-1 and VZV seropositive. It recommends the recombinant (non-live) zoster vaccine, with aciclovir still added in high-risk groups until comparative data exist; the live zoster vaccine is contraindicated in immunocompromised people. The ECIL 11 slide sets (2026) give two doses 2 months apart after autologous transplant (AI), not before 2 months after transplant, and keep val/aciclovir going for at least 1 month after the second dose. All three nucleoside analogues need dose adjustment in renal impairment; no source read prints the adjusted doses. Brivudin is contraindicated with 5-fluorouracil and its prodrugs.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse"],
    where: ["outpatient-clinic", "ward", "chemotherapy-day-unit"],
  },
  population: "Adults with solid tumours or haematological cancers who are not having a transplant or cell therapy (AGIHO 2022, whose literature search was restricted to adults); adults having allogeneic transplant or leukaemia induction (ASCO/IDSA 2018); adults having high-dose chemotherapy with autologous transplant (AGIHO 2020) or allogeneic transplant (AGIHO 2016, which does not address cord blood or haplo-identical transplants; ECIL-2); and people having CAR T cells for haematological cancers (ASTCT 2024). Children are not covered, except that ASTCT notes they are usually given a shorter course after CAR T.",
  trigger: "A treatment with a known high risk of HSV or VZV reactivation is about to start.",
  steps: [
    {
      action: "For leukaemia induction or allogeneic transplant, give a nucleoside analogue such as aciclovir to anyone who is HSV seropositive (a blood test showing past infection)",
      why: "AGIHO 2022 reports that herpes simplex flares in 37 to 68 of every 100 people having intensive chemotherapy for acute leukaemia, in most of them as mouth ulcers.",
      source: "asco-idsa-2018",
      quote: "Herpes simplex virus-seropositive patients undergoing allogeneic hematopoietic stem-cell transplantation or leukemia induction therapy should receive nucleoside analog-based antiviral prophylaxis, such as acyclovir.",
    },
    {
      action: "Use serology to find who is at risk before intensive leukaemia treatment, or give prophylaxis to everyone with an indication without testing",
      why: "AGIHO calls serology useful (BIII) but says about nine in ten adults already carry these viruses, so treating everyone with an indication is equally appropriate.",
      source: "agiho-2022",
      quote: "We consider a universal prophylactic strategy for all patients with indication for prophylaxis of HSV as equally appropriate, because seroprevalence of HSV-1 is about 90% for adults.",
    },
    {
      action: "In acute leukaemia on intensive chemotherapy, give aciclovir or valaciclovir; in acute myeloid leukaemia start with induction and continue through the neutropenic phase",
      why: "In trials aciclovir cut symptomatic herpes simplex to a tenth of the rate with placebo. How long it was given varied from 28 to 100 days.",
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
      why: "ALL treatment is long and includes steroids and sometimes anti-CD20 antibodies. The guideline's text prints BI for both viruses; its table gives B I against herpes simplex and B III against shingles.",
      source: "agiho-2022",
      quote: "antiviral prophylaxis to reduce reactivation of HSV and VZV is recommended for patients with acute lymphoblastic leukaemia while on treatment (BI) (Table 6).",
      grade: "BI",
    },
    {
      action: "In acute promyelocytic leukaemia treated with arsenic trioxide, give prophylaxis during treatment and until 6 months afterwards",
      why: "In a retrospective study of 112 people, varicella zoster disease occurred in 17.5% without prophylaxis and 4.1% with aciclovir or valaciclovir.",
      source: "agiho-2022",
      quote: "Therefore, pharmacological prophylaxis for this patient group during the time of treatment till 6 months thereafter is recommended to reduce VZV disease (BIIr) (Table 6).",
      grade: "BIIr",
    },
    {
      action: "Give aciclovir to people on a bortezomib-based myeloma regimen",
      why: "Shingles affected 13% of people on bortezomib in the VISTA trial, and 3% of those who also took an antiviral. Valaciclovir is the alternative (BIIu).",
      source: "agiho-2022",
      quote: "Therefore, we strongly recommend acyclovir prophylaxis in patients receiving bortezomib-based treatment regimens (AII) (Table 7).",
      grade: "AII",
    },
    {
      action: "Give antiviral prophylaxis, mainly aciclovir, with the other proteasome inhibitors too (carfilzomib, ixazomib)",
      why: "AGIHO judges the shingles risk to belong to the whole drug class. Its table grades carfilzomib A IIu and ixazomib A IIh, and notes that how long to continue has not been determined.",
      source: "agiho-2022",
      quote: "As a consequence, we also recommend the use of antiviral prophylaxis, mainly with acyclovir, in patients receiving proteasome inhibitors other than bortezomib (AIIu; AIIh) (Table 7).",
      grade: "AIIu; AIIh",
    },
    {
      action: "With daratumumab, follow the product label: start antiviral prophylaxis within 1 week of starting and continue for 3 months after treatment ends",
      why: "The US label reports shingles in 3% of people in single-drug studies and 2 to 5% in combination studies. AGIHO 2022 is more reserved: for myeloma antibodies it recommends prophylaxis only in selected cases, on individual risk (CIIt).",
      source: "darzalex-label",
      quote: "Initiate antiviral prophylaxis to prevent herpes zoster reactivation within 1 week after starting DARZALEX and continue for 3 months following the end of treatment",
    },
    {
      action: "For shingles prevention use oral aciclovir between 400 mg once daily and 400 mg three times daily",
      why: "All these doses have been used and shown to work; no randomised trial has compared them.",
      source: "agiho-2022",
      quote: "We recommend oral acyclovir to reduce clinical VZV reactivation; dosages from 400 mg once daily to 400 mg TID have been shown to be effective (AII).",
      grade: "AII",
    },
    {
      action: "Do not give routine shingles prophylaxis with ordinary systemic treatment for a solid tumour",
      why: "Without prophylaxis about 5 in 100 people with solid tumours get shingles within five years.",
      source: "agiho-2022",
      quote: "Pharmacological prophylaxis to prevent disease by reactivation of VZV in patients with solid tumours is not generally indicated (DIII) (Table 5).",
      grade: "DIII",
    },
    {
      action: "Consider prophylaxis for people on high-dose corticosteroids for a long time; it may be continued for up to 6 months after the steroids stop",
      why: "Steroids at 10 mg prednisolone a day or more for at least 14 days have been described to raise the risk of shingles. There is no randomised evidence, and the guideline's wording is that this might be reasonable.",
      source: "agiho-2022",
      quote: "Therefore, even though no evidence from randomized trials exists, it might be reasonable to consider patients on corticosteroids, particularly with high doses long term (and/or if concomitantly treated or heavily pre-treated with immunosuppressive agents) for antiviral pharmacological prophylaxis (CIIu) (Table 5).",
      grade: "CIIu",
    },
    {
      action: "After high-dose chemotherapy with an autologous stem cell transplant, give aciclovir for at least 6 months",
      why: "Shingles often occurred more than 6 months after transplant in a vaccine trial, particularly in unvaccinated people. The guideline's table grades aciclovir or valaciclovir A IIt against herpes simplex and aciclovir A IIu against varicella zoster.",
      source: "agiho-auto-2020",
      quote: "Thus, we strongly recommend acyclovir prophylaxis for at least 6 months, in particular, if CD34-selected grafts are used [34, 72].",
      grade: "A IIt (HSV); A IIu (VZV)",
    },
    {
      action: "After an allogeneic transplant, start aciclovir early: up to day 30 against herpes simplex, and up to 1 year in people who carry varicella zoster",
      why: "Without prophylaxis about 80% reactivate herpes simplex, mainly in the first 4 weeks. The table gives aciclovir 400 mg three times daily or valaciclovir 500 mg twice daily against HSV (A II), and aciclovir 800 mg twice daily for VZV-seropositive recipients (A I), with lower doses graded B II.",
      source: "agiho-allo-2016",
      quote: "As a consequence, patients should receive acyclovir early on for the prevention of disease to reduce mortality (AI) [138–141] (Table 3).",
      grade: "AI",
    },
    {
      action: "For CAR T cell therapy, give aciclovir or valaciclovir from the start of lymphodepletion until at least 6 months after the infusion",
      why: "ASTCT's table gives aciclovir 400 mg or valaciclovir 500 mg by mouth twice daily, and says children are usually given a shorter course. Its recommendations are not graded.",
      source: "astct-inf-2024",
      quote: "HSV and VZV should be prevented with acyclovir or valacyclovir from the start of lymphodepletion therapy until at least 6 mo postinfusion.",
    },
    {
      action: "Offer the recombinant (non-live) shingles vaccine, and keep aciclovir going in high-risk groups alongside it",
      why: "The vaccine has been shown to be safe in the cancer groups studied, but responses seemed lower during treatment, and no trial has compared it with the tablet.",
      source: "agiho-2022",
      quote: "Until more data are available, particularly of comparative trials for vaccination versus pharmacological prophylaxis, it is suggested to apply acyclovir additionally in high risk patient groups (for recommendations see below).",
    },
    {
      action: "Adjust the dose of aciclovir, valaciclovir or famciclovir when kidney function is reduced",
      why: "AGIHO states this for all three medicines but does not print the adjusted doses; they come from each product's prescribing information.",
      source: "agiho-2022",
      quote: "Of note, all three nucleoside analogues (acyclovir, valacyclovir, famciclovir) require dose adjustment in patients with renal impairment.",
    },
  ],
  bestInClass: {
    statement: "AGIHO 2022 is the most recent and most detailed graded guideline outside transplant: oral aciclovir 400 mg twice or four times daily against HSV (AIIr), 400 mg once to three times daily against VZV (AII), for intensive acute leukaemia treatment (BIIr), ALL while on treatment (BI), arsenic trioxide in acute promyelocytic leukaemia (BIIr) and proteasome inhibitor regimens in myeloma (AII for bortezomib), and not routinely for solid tumours (DIII). ASCO/IDSA 2018 (abstract) agrees on leukaemia induction and adds allogeneic transplant, which AGIHO 2022 leaves to transplant guidelines while calling aciclovir standard of care there. For transplant the graded sources read are AGIHO 2020 (autologous: at least 6 months) and AGIHO 2016 and ECIL-2 (allogeneic: about a month against HSV, a year against VZV in seropositive recipients, longer on immunosuppression); for CAR T, ASTCT 2024 (at least 6 months). The recombinant zoster vaccine is recommended but does not yet replace aciclovir in high-risk groups. Duration is the main unsettled point outside transplant: AGIHO 2022 gives 28 to 100 days in AML trials, the whole of ALL treatment, 6 months after arsenic trioxide, up to 6 months after steroids, no determined duration in myeloma, and individual extension in lymphoma, where reactivations occurred up to 51.3 months after treatment began.",
    sources: ["agiho-2022", "asco-idsa-2018", "agiho-auto-2020", "agiho-allo-2016", "ecil-2-hsv-2007", "ecil-2-vzv-2007", "astct-inf-2024"],
  },
  variants: [
    {
      name: "Valaciclovir instead of aciclovir",
      differs: "Uses valaciclovir, which has better oral bioavailability: 250 mg or 500 mg twice daily against HSV in the text, 500 mg twice daily with normal renal function in the tables.",
      evidence: "AGIHO 2022 grades valaciclovir BI against HSV, with the best regimen not yet defined, and against VZV CIIu in general and BIIu with bortezomib. AGIHO 2016 grades valaciclovir 500 mg twice daily A II against HSV and B II against VZV after allogeneic transplant; ECIL-2 grades it AII for HSV prophylaxis.",
      sources: ["agiho-2022", "agiho-allo-2016", "ecil-2-hsv-2007"],
    },
    {
      name: "Low-dose aciclovir with proteasome inhibitors",
      differs: "Uses doses as low as 200 to 400 mg of aciclovir once or twice daily for shingles prevention during proteasome inhibitor treatment.",
      evidence: "AGIHO 2015 reported these doses as successfully used, from phase II trials and retrospective analyses, and noted that no randomised trial has compared doses and that the risk of aciclovir resistance with low doses has not been assessed. AGIHO 2022 names 400 mg once daily as the lowest dose in its recommendation.",
      sources: ["agiho-2022", "agiho-2015"],
    },
    {
      name: "ECIL-2 regimens for leukaemia and transplant (2007)",
      differs: "Against HSV: intravenous aciclovir 250 mg/m2 or 5 mg/kg every 12 hours, or oral aciclovir from 200 mg three times daily to 800 mg twice daily, or valaciclovir 500 mg twice daily, for 3 to 5 weeks after the start of chemotherapy or after transplant, and longer with graft-versus-host disease or immunosuppression. Against zoster after allogeneic transplant: aciclovir 800 mg twice daily or valaciclovir 500 mg once or twice daily for one year.",
      evidence: "ECIL-2 grades prophylaxis AI for HSV-seropositive allogeneic recipients, but only 'should be considered' (BIII) for acute leukaemia treated by chemotherapy alone, where AGIHO 2022 says BIIr. It gives intravenous aciclovir every 12 hours (AI) where AGIHO 2022 gives three times daily. It calls prophylaxis after autologous transplant controversial, where AGIHO 2020 strongly recommends it. These slide sets are from 2007 and no later ECIL edition on HSV or VZV drug prophylaxis was found.",
      sources: ["ecil-2-hsv-2007", "ecil-2-vzv-2007", "agiho-2022", "agiho-auto-2020"],
    },
    {
      name: "Daratumumab: label against guideline",
      differs: "The US label tells prescribers to start antiviral prophylaxis within 1 week of starting daratumumab and continue for 3 months after treatment ends.",
      evidence: "AGIHO 2022 grades aciclovir with daratumumab C IIt, says the zoster risk with myeloma antibodies and immunomodulatory drugs seems rather low (under 5% in most controlled trials) and recommends prophylaxis only in selected cases. The label reports zoster in 3% of people in monotherapy studies and 2 to 5% in combination studies.",
      sources: ["darzalex-label", "agiho-2022"],
    },
    {
      name: "Purine analogues, bendamustine and alemtuzumab",
      differs: "AGIHO 2015 said primary aciclovir prophylaxis cannot be recommended for first-line purine analogue treatment (fludarabine, pentostatin), and that aciclovir had become standard with alemtuzumab.",
      evidence: "AGIHO 2022 does not mention alemtuzumab. For CLL it asks for special consideration of people treated with rituximab plus bendamustine or rituximab with fludarabine and cyclophosphamide, in whom reactivation was reported frequently and up to 3 years after treatment, and grades prophylaxis with immunochemotherapy BIIuh after individual risk assessment.",
      sources: ["agiho-2015", "agiho-2022"],
    },
    {
      name: "Recombinant zoster vaccine after transplant or CAR T (ECIL 11 slide sets, 2026)",
      differs: "After autologous transplant: two doses 2 months apart, not before 2 months after transplant (AI). After allogeneic transplant: may be considered in people without graft-versus-host disease or immunosuppression (BII hu), preferably from 12 months and before val/aciclovir is stopped (BIIu). After CAR T: two doses (BIIt), the first once the CD4 count is above 200 cells per cubic millimetre (CIII). In each case val/aciclovir continues for at least 1 month after the second dose.",
      evidence: "ECIL 11 says val/aciclovir is highly protective and that vaccination should not shorten it. It does not recommend the vaccine for transplanted children, in whom there is no experience. Part I was posted as a slide set for public consultation, not yet as a paper. AGIHO 2020 strongly recommends vaccination of VZV-seropositive autologous recipients (A I); AGIHO 2016, written before this vaccine, does not recommend routine zoster vaccination of seropositive allogeneic recipients (DIII).",
      sources: ["ecil-11-vaccines-hct-2026", "ecil-11-vaccines-cart-2026", "agiho-auto-2020", "agiho-allo-2016"],
    },
  ],
  grades: [
    { claim: "Oral aciclovir 400 mg twice or four times daily against oral HSV disease", grade: "AIIr", source: "agiho-2022" },
    { claim: "Valaciclovir as an alternative against oral HSV disease", grade: "BI", source: "agiho-2022", quote: "Oral valacyclovir can be used alternatively (BI), but the best regimen (250 mg BID or 500 mg BID) has not yet been defined." },
    { claim: "Intravenous aciclovir 250 mg/m2 three times daily when oral medication is not tolerated", grade: "AIIr", source: "agiho-2022" },
    { claim: "Valaciclovir against VZV reactivation", grade: "CIIu", source: "agiho-2022", quote: "Valacyclovir may also be effective by mechanism of action and due to transferred evidence, but has rarely been systematically tested [63, 64] (CIIu)." },
    { claim: "Prophylaxis in acute leukaemia on intensive chemotherapy", grade: "BIIr", source: "agiho-2022" },
    { claim: "Prophylaxis in ALL while on treatment (the table gives B III for zoster)", grade: "BI", source: "agiho-2022" },
    { claim: "Prophylaxis with arsenic trioxide in acute promyelocytic leukaemia, until 6 months after treatment", grade: "BIIr", source: "agiho-2022" },
    { claim: "Aciclovir with bortezomib-based regimens", grade: "AII", source: "agiho-2022" },
    { claim: "Valaciclovir with bortezomib-based regimens", grade: "BIIu", source: "agiho-2022", quote: "Alternatively valacyclovir might be used [63, 64, 119, 120] (BIIu) (Table 7)." },
    { claim: "Prophylaxis with myeloma antibodies and immunomodulatory drugs only in selected cases", grade: "CIIh; CIIt", source: "agiho-2022", quote: "In summary, we recommend their use only in selected cases, taking in account the patient’s individual VZV disease risk [124] (CIIh; CIIt) (Table 7)." },
    { claim: "Prophylaxis with idelalisib", grade: "BIII", source: "agiho-2022" },
    { claim: "No routine VZV prophylaxis in solid tumours", grade: "DIII", source: "agiho-2022" },
    { claim: "Consider prophylaxis with long-term high-dose corticosteroids", grade: "CIIu", source: "agiho-2022" },
    { claim: "Serology before intensive chemotherapy for acute leukaemia", grade: "BIII", source: "agiho-2022", quote: "Serology testing for HSV-1, HSV-2, and VZV is useful to ascertain prior infection in patients with acute leukaemia undergoing intensive chemotherapy and therefore identify patients at risk of reactivation (BIII) [11, 37] (Tables 3 and 4)." },
    { claim: "HSV prophylaxis for up to 30 days after allogeneic transplant", grade: "AI", source: "agiho-allo-2016", quote: "The duration of prophylaxis should last for up to 30 days after allo-HCT (AI) [139, 141]." },
    { claim: "Zoster prophylaxis for one year in seropositive allogeneic transplant recipients", grade: "AII", source: "ecil-2-vzv-2007", quote: "Prophylaxis with oral acyclovir (800mgx2 daily) or valacyclovir (500 mg 1-2 daily) is recommended for seropositive allogeneic SCT recipients, for one year (AII), or longer in the presence of GVHD and immunosuppressive therapy (BII)" },
    { claim: "Antiviral prophylaxis for HSV-seropositive people treated for acute leukaemia by chemotherapy alone", grade: "BIII", source: "ecil-2-hsv-2007", quote: "HSV seropositive patients treated for acute leukemia by chemotherapy alone should be considered for antiviral drug prophylaxis (BIII)." },
  ],
  sources: [
    { key: "agiho-2022", label: "Management of herpesvirus reactivations in patients with solid tumours and hematologic malignancies: update of the Guidelines of the Infectious Diseases Working Party (AGIHO) of the German Society for Hematology and Medical Oncology (DGHO) on herpes simplex virus type 1, herpes simplex virus type 2, and varicella zoster virus", publisher: "AGIHO/DGHO, Annals of Hematology", year: 2022, url: "https://europepmc.org/article/PMC/PMC8810475", doi: "10.1007/s00277-021-04746-y", gradingScheme: "ESCMID criteria. Strength of recommendation A (strongly supports use), B (moderately), C (marginally), D (supports a recommendation against use); quality of evidence I (at least one randomised controlled trial), II (well-designed non-randomised or observational studies), III (expert opinion), with an index for level II (r meta-analysis or systematic review of randomised trials, t transferred evidence, h historical control, u uncontrolled trial, a published abstract). Printed together in the text (AIIr) and in separate columns in the tables (A, IIr).", read: "full-text", accessed: "2026-11-17" },
    { key: "agiho-2015", label: "Antiviral prophylaxis in patients with solid tumours and haematological malignancies: update of the Guidelines of the Infectious Diseases Working Party (AGIHO) of the German Society for Hematology and Medical Oncology (DGHO)", publisher: "AGIHO/DGHO, Annals of Hematology", year: 2015, url: "https://europepmc.org/article/PMC/PMC4525190", doi: "10.1007/s00277-015-2447-3", read: "full-text", accessed: "2026-11-17" },
    { key: "agiho-auto-2020", label: "Prophylaxis, diagnosis and therapy of infections in patients undergoing high-dose chemotherapy and autologous haematopoietic stem cell transplantation. 2020 update of the recommendations of the Infectious Diseases Working Party (AGIHO) of the German Society of Hematology and Medical Oncology (DGHO)", publisher: "AGIHO/DGHO, Annals of Hematology", year: 2020, url: "https://europepmc.org/article/PMC/PMC7572248", doi: "10.1007/s00277-020-04297-8", gradingScheme: "ESCMID and ECMM criteria: strength A to D and quality of evidence I to III with an index for level II, as in AGIHO 2022; printed in separate table columns (A, IIt).", read: "full-text", accessed: "2026-11-17" },
    { key: "agiho-allo-2016", label: "Infectious diseases in allogeneic haematopoietic stem cell transplantation: prevention and prophylaxis strategy guidelines 2016", publisher: "AGIHO/DGHO and DAG-KBT, Annals of Hematology", year: 2016, url: "https://europepmc.org/article/PMC/PMC4972852", doi: "10.1007/s00277-016-2711-1", gradingScheme: "ESCMID criteria as modified by AGIHO and DAG-KBT: strength A (strongly supports use) to D (supports a recommendation against use), quality of evidence I to III with an added index for level II (r, t, h, u, a).", read: "full-text", accessed: "2026-11-17" },
    { key: "astct-inf-2024", label: "Best Practice Considerations by The American Society of Transplant and Cellular Therapy: Infection Prevention and Management After Chimeric Antigen Receptor T Cell Therapy for Hematological Malignancies", publisher: "ASTCT Infectious Diseases Special Interest Group, Transplantation and Cellular Therapy", year: 2024, url: "https://europepmc.org/article/PMC/PMC12826105", doi: "10.1016/j.jtct.2024.07.018", gradingScheme: "Expert panel best practice considerations; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "ecil-2-hsv-2007", label: "Recommendations for HSV management in patients with leukemia (ECIL-2 final slide set)", publisher: "European Conference on Infections in Leukaemia (ECIL)", year: 2007, url: "https://www.ecil-leukaemia.com/images/resources/2007/41_ECIL2_2007_HSV_recommendations.pdf", gradingScheme: "A letter for strength of recommendation (A to E on these slides) and a numeral I to III for quality of evidence, printed together (AI, BIII). The slide sets do not print the definitions; the abstract of the journal version says the grading follows Centers for Disease Control criteria.", read: "full-text", accessed: "2026-11-17" },
    { key: "ecil-2-vzv-2007", label: "Recommendations for VZV management in patients with leukemia (ECIL-2 final slide set)", publisher: "European Conference on Infections in Leukaemia (ECIL)", year: 2007, url: "https://www.ecil-leukaemia.com/images/resources/2007/42_ECIL2_2007_VZV_recommendations.pdf", gradingScheme: "As for the ECIL-2 HSV slide set: strength A to E with quality of evidence I to III, printed together (AII).", read: "full-text", accessed: "2026-11-17" },
    { key: "ecil-11-vaccines-hct-2026", label: "ECIL 11 vaccination guidelines update, Part I: HCT (slide set for public consultation, 25 September 2026)", publisher: "European Conference on Infections in Leukaemia (ECIL)", year: 2026, url: "https://www.ecil-leukaemia.com/images/26/ressources/ECIL11_-_Update_on_vaccination_Part_I_-_HCT_12Oct2026pdf.pdf", gradingScheme: "ESCMID grading, cited on the slides to Ullmann et al. 2012: strength A to D and quality of evidence I to III with an index for level II, printed together (AI, BIIu).", read: "full-text", accessed: "2026-11-17" },
    { key: "ecil-11-vaccines-cart-2026", label: "ECIL 11 revised guidelines slide set, Part II: vaccination of CAR T cell treated patients, patients treated with bispecific antibodies, and general topics regarding vaccination (September 2026)", publisher: "European Conference on Infections in Leukaemia (ECIL)", year: 2026, url: "https://www.ecil-leukaemia.com/images/26/ressources/ECIL_11_-_Update_on_vaccination_Part_II_12Oct2026.pdf", gradingScheme: "As for Part I; some rows are marked 'Not graded'.", read: "full-text", accessed: "2026-11-17" },
    { key: "darzalex-label", label: "DARZALEX (daratumumab) injection: US prescribing information, revised 06/2026", publisher: "Janssen Biotech, Inc., through DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a4d0efe9-5e54-467e-9eb4-56fa7d53b60b", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-idsa-2018", label: "Antimicrobial Prophylaxis for Adult Patients With Cancer-Related Immunosuppression: ASCO and IDSA Clinical Practice Guideline Update", publisher: "ASCO and IDSA, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/30179565", doi: "10.1200/JCO.18.00374", read: "abstract", accessed: "2026-11-17" },
    { key: "imwg-2022", label: "Consensus guidelines and recommendations for infection prevention in multiple myeloma: a report from the International Myeloma Working Group", publisher: "International Myeloma Working Group, The Lancet Haematology", year: 2022, url: "https://europepmc.org/abstract/MED/35114152", doi: "10.1016/S2352-3026(21)00283-0", read: "not-reachable", accessed: "2026-11-17" },
  ],
  terms: ["lymphoma-tx-pjp-and-infection-prophylaxis"],
  upgrades: [],
  gaps: [
    "The ASCO/IDSA 2018 guideline was read only as an abstract, again on 17 November 2026, so its doses, durations and grades for antiviral prophylaxis are not stated here. No later ASCO/IDSA edition for adults was found in Europe PMC.",
    "On 17 November 2026 the IMWG 2022 guideline on infection prevention in myeloma had no open copy (Europe PMC lists the record without full text), and the NCCN guideline on cancer-related infections sits behind a login. What either says about aciclovir with proteasome inhibitors or anti-CD38 antibodies is therefore not on this page; the myeloma steps rest on AGIHO 2022 and the daratumumab label.",
    "The ECIL-2 recommendations are quoted from the 2007 slide sets on the ECIL site. The journal version (Styczynski and colleagues, Bone Marrow Transplantation 2009) showed only its abstract on 17 November 2026, and no later ECIL edition on HSV or VZV drug prophylaxis was found. The ECIL 11 vaccination recommendations are slide sets from September and October 2026, Part I marked for public consultation, so they may change before publication.",
    "No source read prints the adjusted aciclovir or valaciclovir doses for reduced kidney function; AGIHO 2022 says only that adjustment is required.",
    "No source read covers children in any detail; paediatric doses and indications come from local or national paediatric protocols not read for this page.",
    "The AGIHO allogeneic transplant guideline dates from 2016 and no newer edition was found; it predates the recombinant zoster vaccine. Prophylaxis against cytomegalovirus is outside this page.",
    "How long to continue prophylaxis is not settled outside the situations named: AGIHO 2022 says the duration with myeloma treatment has not been determined. Outside transplant and CAR T, no source read says when during treatment the recombinant zoster vaccine should be given, and no trial has compared the vaccine with aciclovir.",
    "The daratumumab step rests on the US label for the intravenous product, revised 06/2026. The European product information and the labels of bortezomib, carfilzomib and ixazomib were not read for this page.",
    "Influenza antiviral prophylaxis after exposure, which the census row also names, is not covered by these sources and is not addressed here.",
  ],
  institutions: ["asco"],
  cancers: ["aml", "all-leukemia", "multiple-myeloma", "cll"],
  drugs: ["bortezomib", "carfilzomib", "ixazomib", "daratumumab", "arsenic-trioxide", "idelalisib", "valaciclovir"],
  technologies: ["allogeneic-hsct", "autologous-stem-cell-transplant", "car-t"],
  related: ["lymphoma-tx-pjp-and-infection-prophylaxis", "car-t-infection-prevention"],
  sections: ["supportive-care"],
  tags: ["protocol", "antiviral-prophylaxis", "infection-prevention"],
});
