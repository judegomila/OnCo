import { protocol } from "./helpers";

/*
 * Preventing and treating Clostridioides difficile infection in children with cancer and after haematopoietic cell
 * transplant.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw with
 * curl into a scratch directory and read as text, and every quote was checked against that text by script.
 * - Patel et al., Guideline for the management of Clostridioides difficile infection in pediatric patients with cancer
 *   and hematopoietic cell transplantation recipients: 2024 update (eClinicalMedicine 2024), open access, full text
 *   from Europe PMC (PMC11046252, full-text XML). It replaces the 2018 guideline (Journal of Clinical Oncology), which
 *   the COG supportive care page lists as archived in August 2024 (page copy saved by a sibling checker on
 *   16 November 2026, re-used). Europe PMC and Crossref show no later edition. It prints no doses.
 * - Children's Oncology Group endorsement document (version date 10 September 2024; endorsed August 2024), public PDF
 *   from the COG supportive care page (pdftotext, full text). Its table prints "Low quality evidence" for the
 *   fidaxomicin-for-recurrence and monoclonal antibody recommendations, where the guideline itself prints moderate.
 * - IDSA and SHEA 2017 update for adults and children (Clinical Infectious Diseases 2018): full text as HTML from
 *   PubMed Central (PMC6018983, one plain request; Europe PMC and E-utilities do not release its XML). The paediatric
 *   dose table was read cell by cell from the HTML. idsociety.org marks it "CURRENT".
 * - IDSA and SHEA 2021 focused update (adults only): unreadable beyond its abstract on 11 November; on 17 November the
 *   full text read from idsociety.org, where it is marked "CURRENT".
 * - NICE guideline NG199 (July 2021; last reviewed 11 July 2024, with an update planned): recommendations page from
 *   nice.org.uk.
 * - ESCMID 2021 treatment guidance (adults): abstract only, from Europe PMC; the full text is not open.
 * - Fidaxomicin (Dificid) US label from DailyMed and the EMA page for bezlotoxumab (Zinplava).
 * The DOIs were resolved through Crossref or Europe PMC and their titles checked. Quotes are copied from the raw text
 * with line breaks joined and nothing else changed.
 * Doses independently re-read on 17 November 2026 against Table 2 of the IDSA and SHEA 2017 guideline (PubMed Central
 * text) and the Dificid label fetched again from DailyMed; the summary now says which episode its doses are for and
 * gives their maxima.
 */
export const paediatricClostridioidesDifficile = protocol({
  id: "paediatric-clostridioides-difficile",
  name: "Clostridioides difficile infection in children with cancer or after stem cell transplant",
  aka: ["C. difficile in children with cancer", "C diff paediatric oncology", "CDI children", "Clostridium difficile children cancer"],
  domain: "paediatric",
  tldr: "C. difficile is a gut germ that can cause bad diarrhoea, often after antibiotics. In children having cancer treatment it is treated with an antibiotic by mouth, chosen by how severe it is. Children with it are kept apart from others to stop it spreading, and probiotics and faecal transplants are not used routinely.",
  simple: "Antibiotics can let a gut germ called C. difficile cause diarrhoea. The child gets a medicine by mouth and is kept apart from other patients, in a single room where there is one. Teams try not to give antibiotics the child does not need.",
  summary: "The 2024 update from an international panel led by the Pediatric Oncology Group of Ontario (96 randomised trials in any population, GRADE), endorsed by the Children's Oncology Group in August 2024, covers children and adolescents aged 1 to 18 with cancer or undergoing haematopoietic cell transplant; infants under 1 are excluded because C. difficile detected in them typically represents colonisation without symptoms. Treat non-severe infection with oral metronidazole or oral vancomycin (strong, low) and severe infection (which the panel says may be defined as colitis, pneumatosis intestinalis, pseudomembranous colitis, ileus or surgery) with oral vancomycin or, new in 2024, oral fidaxomicin (strong, low): across eight trials, one of them in children that included children with cancer, fidaxomicin gave more cures at the end of follow-up and fewer recurrences than vancomycin. Consider fidaxomicin for recurrence (conditional, moderate). Do not use faecal microbiota transplantation routinely (strong, low), though it may be a reasonable option once treatment is over and the child is no longer immunosuppressed. Do not use probiotics routinely for prevention or treatment (conditional, low), because of documented invasive infections attributed to probiotics in children with cancer, nor monoclonal antibodies such as bezlotoxumab (conditional, moderate); bezlotoxumab's European marketing authorisation was withdrawn on 20 October 2026 at the company's request. Two new good practice statements: isolate according to local policy, and minimise systemic antibiotics, especially after a previous episode. The guideline gives no doses and no rules on testing. For children in general, IDSA and SHEA (2017 update) advise against routinely testing infants aged 12 months or under, and print doses; for a non-severe first episode these are metronidazole 7.5 mg/kg per dose three or four times a day (maximum 500 mg a dose), or vancomycin 10 mg/kg per dose four times a day (maximum 125 mg a dose), each by mouth for 10 days.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist"],
    where: ["ward", "outpatient-clinic"],
  },
  population: "Children and adolescents aged 1 to 18 with cancer and those undergoing haematopoietic cell transplant. Infants under 1 year are excluded by the guideline. Adults are not covered. The steps on testing, single rooms and hand washing come from IDSA and SHEA guidance written for adults and children in general, not for children with cancer.",
  trigger: "A child having cancer treatment or a transplant has diarrhoea and C. difficile toxin is detected, or is at risk because of antibiotics.",
  steps: [
    {
      action: "Do not routinely test babies aged 12 months or under for C. difficile",
      why: "Many healthy babies carry the germ without being ill, so a positive test often does not explain the diarrhoea. IDSA and SHEA also advise against routine testing at 1 to 2 years unless other causes have been excluded (weak recommendation, low quality of evidence). This is guidance for children in general.",
      source: "idsa-shea-2017",
      quote: "Because of the high prevalence of asymptomatic carriage of toxigenic C. difficile in infants, testing for CDI should never be routinely recommended for neonates or infants ≤12 months of age with diarrhea",
      grade: "strong recommendation, moderate quality of evidence",
    },
    {
      action: "From 2 years of age, test a child whose diarrhoea is prolonged or worsening and who has risk factors or relevant exposures",
      why: "IDSA and SHEA name a weakened immune system as a risk factor and recent antibiotics or contact with the healthcare system as exposures, which describes most children having cancer treatment.",
      source: "idsa-shea-2017",
      quote: "In children ≥2 years of age, C. difficile testing is recommended for patients with prolonged or worsening diarrhea and risk factors (eg, underlying inflammatory bowel disease or immunocompromising conditions) or relevant exposures (eg, contact with the healthcare system or recent antibiotics)",
      grade: "weak recommendation, moderate quality of evidence",
    },
    {
      action: "Use a stool toxin test within a multistep algorithm where the laboratory has no agreed criteria for which stools it accepts",
      why: "IDSA and SHEA discuss evidence that a DNA (molecular) test used alone is likely to lead to overdiagnosis and overtreatment. Where there are agreed criteria for which stools are sent, IDSA and SHEA accept a DNA test alone or a multistep algorithm rather than a toxin test alone (weak recommendation, low quality of evidence). They also say not to repeat the test within 7 days in the same episode. None of this is specific to children.",
      source: "idsa-shea-2017",
      quote: "Use a stool toxin test as part of a multistep algorithm (ie, glutamate dehydrogenase [GDH] plus toxin; GDH plus toxin, arbitrated by nucleic acid amplification test [NAAT]; or NAAT plus toxin) rather than a NAAT alone for all specimens received in the clinical laboratory when there are no preagreed institutional criteria for patient stool submission",
      grade: "weak recommendation, low quality of evidence",
    },
    {
      action: "Isolate a child with C. difficile infection and follow the local infection control policy",
      why: "Isolation limits spread of C. difficile to other children; the exact rules differ by country and hospital.",
      source: "patel-cdi-2024",
      quote: "In pediatric patients with cancer and HCT recipients experiencing CDI, follow infection control practices including isolation according to jurisdictional policies.",
      grade: "Good practice statement",
    },
    {
      action: "Nurse the child in a single room with their own toilet where one is available",
      why: "This lowers the chance of passing the germ to other patients. Where single rooms are short, IDSA and SHEA give priority to patients with stool incontinence, and suggest keeping contact precautions for at least 48 hours after the diarrhoea has stopped (weak recommendation, low quality of evidence). This is guidance for all patients.",
      source: "idsa-shea-2017",
      quote: "Accommodate patients with CDI in a private room with a dedicated toilet to decrease transmission to other patients.",
      grade: "strong recommendation, moderate quality of evidence",
    },
    {
      action: "Wash hands with soap and water after contact with faeces or a soiled area",
      why: "Soap and water remove C. difficile spores better than alcohol hand rub. In routine settings IDSA and SHEA accept either soap and water or an alcohol-based product before and after contact with the patient and after removing gloves (strong recommendation, moderate quality of evidence); in outbreaks or where rates stay high they prefer soap and water (weak recommendation, low quality of evidence).",
      source: "idsa-shea-2017",
      quote: "Handwashing with soap and water is preferred if there is direct contact with feces or an area where fecal contamination is likely (eg, the perineal region)",
      grade: "good practice recommendation",
    },
    {
      action: "Keep systemic antibiotics to those the child needs, especially after a previous episode",
      why: "Exposure to antibiotics is a known risk factor for C. difficile in children with cancer.",
      source: "patel-cdi-2024",
      quote: "In pediatric patients with cancer and HCT recipients, especially those who have experienced CDI, minimize systemic antibacterial administration where feasible.",
      grade: "Good practice statement",
    },
    {
      action: "Do not give probiotics routinely to prevent C. difficile",
      why: "No trial has included children having cancer treatment, and three invasive infections in children having cancer treatment were attributed to a probiotic by the doctors who reported them. The panel says probiotics in this group should stay within research.",
      source: "patel-cdi-2024",
      quote: "We suggest that probiotics not be used routinely for the prevention of CDI in pediatric patients with cancer and HCT recipients",
      grade: "conditional recommendation, low quality evidence",
    },
    {
      action: "Treat non-severe infection with oral metronidazole or oral vancomycin",
      why: "Adult trials found similar cure and recurrence rates with the two; none of those trials included children. The guideline prints no dose.",
      source: "patel-cdi-2024",
      quote: "Use either oral metronidazole or oral vancomycin for the treatment of non-severe CDI in pediatric patients with cancer and HCT recipients",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "Treat severe infection with oral vancomycin or oral fidaxomicin",
      why: "In adult trials vancomycin cured more severe cases than metronidazole. Across eight trials, one of them in children that included children with cancer, fidaxomicin gave more cures at the end of follow-up and fewer recurrences than vancomycin; the panel kept vancomycin as an option because cure rates at the end of treatment were comparable.",
      source: "patel-cdi-2024",
      quote: "Use either oral vancomycin or oral fidaxomicin for the treatment of severe CDI in pediatric patients with cancer and HCT recipients",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "Consider fidaxomicin for a recurrence",
      why: "Fidaxomicin lowers the chance of a further recurrence, but it has not been studied specifically in recurrent infection, and many children treated with oral vancomycin for a recurrence are expected to do well.",
      source: "patel-cdi-2024",
      quote: "Consider fidaxomicin for the treatment of recurrent CDI in pediatric patients with cancer and HCT recipients",
      grade: "conditional recommendation, moderate quality evidence",
    },
    {
      action: "Do not use faecal microbiota transplantation routinely",
      why: "Its benefit over vancomycin is uncertain, the products and routes vary, there are no data in children with low white cell counts, and the safety concern is highest while the child is neutropenic or immunosuppressed.",
      source: "patel-cdi-2024",
      quote: "Do not use FMT routinely for the treatment of CDI in pediatric patients with cancer and HCT recipients",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "Do not use bezlotoxumab or other monoclonal antibodies routinely as treatment",
      why: "Bezlotoxumab showed no benefit in the one children's trial, in which most children were immunocompromised and some had cancer; it needs a drip, and vancomycin and fidaxomicin are available.",
      source: "patel-cdi-2024",
      quote: "We suggest that monoclonal antibodies not be used routinely for the treatment of CDI in pediatric patients with cancer and HCT recipients",
      grade: "conditional recommendation, moderate quality evidence",
    },
    {
      action: "Do not add probiotics routinely to treatment",
      why: "No treatment trial of probiotics included children, and the same risk of invasive infection applies in severely immunocompromised children.",
      source: "patel-cdi-2024",
      quote: "We suggest that probiotics not be used routinely for the treatment of CDI in pediatric patients with cancer and HCT recipients",
      grade: "conditional recommendation, low quality evidence",
    },
  ],
  bestInClass: {
    statement: "The 2024 international paediatric guideline (Patel et al.), endorsed by the Children's Oncology Group, is the only guideline read here that is written for children with cancer and transplant recipients, and it is the latest edition (it replaces the 2018 one): oral metronidazole or vancomycin for non-severe infection, oral vancomycin or fidaxomicin for severe infection, fidaxomicin considered for recurrence, isolation and antibiotic stewardship, and no routine probiotics, faecal transplant or monoclonal antibodies. Its evidence is mostly from adult trials, which is why most grades are low. It gives no doses and no testing rules; for those this page uses the IDSA and SHEA 2017 update, which covers children in general and is marked current by IDSA. The two differ: IDSA and SHEA recommend vancomycin over metronidazole for severe infection and for a second or later recurrence and, writing before fidaxomicin was approved for children, do not recommend fidaxomicin routinely. NICE (NG199, 2021) bases the choice for under-18s on its adult table, where vancomycin is first line and fidaxomicin second line.",
    sources: ["patel-cdi-2024", "cog-cdi-2024", "idsa-shea-2017", "nice-ng199"],
  },
  variants: [
    {
      name: "IDSA and SHEA 2017 update: treatment and doses for children in general",
      differs: "Non-severe first episode or first recurrence: metronidazole 7.5 mg/kg per dose by mouth three or four times a day for 10 days (maximum 500 mg three or four times a day), or vancomycin 10 mg/kg per dose by mouth four times a day for 10 days (maximum 125 mg four times a day). Severe or fulminant first episode: vancomycin 10 mg/kg per dose four times a day for 10 days by mouth or rectally (maximum 500 mg four times a day), with or without intravenous metronidazole 10 mg/kg per dose three times a day for 10 days (maximum 500 mg three times a day), the addition to be considered in critical illness. Second or later recurrence: vancomycin in a tapered and pulsed regimen, or vancomycin for 10 days followed by rifaximin (for which it prints no paediatric dose), or faecal microbiota transplantation.",
      evidence: "Either drug for non-severe infection is a weak recommendation on low quality evidence. Oral vancomycin over metronidazole for a severe first episode is strong, moderate; for a second or later recurrence it is weak, low. Faecal microbiota transplantation is to be considered after multiple recurrences following standard antibiotics (weak, very low). Fidaxomicin is not recommended for routine use in severe infection in children because it was not then approved under 18 years. On probiotics for prevention it makes no recommendation, citing insufficient data. The 2021 focused update leaves these paediatric recommendations unchanged because its scope is adults only.",
      sources: ["idsa-shea-2017", "idsa-shea-2021"],
    },
    {
      name: "NICE NG199 (England): under-18s follow the adult choices with specialist advice",
      differs: "Offers an oral antibiotic to children and young people under 18, started by or after advice from a microbiologist, paediatric infectious diseases specialist or paediatric gastroenterologist. The choice is based on the adult table: vancomycin first line, fidaxomicin second line if vancomycin is ineffective, and fidaxomicin for a further episode within 12 weeks. Oral metronidazole is not in the table. Doses for children are left to the BNF for Children.",
      evidence: "NICE does not grade its recommendations. It also says not to offer bezlotoxumab because it is not cost effective, not to offer antibiotics to prevent C. difficile infection, and not to advise prebiotics or probiotics for people taking antibiotics; it considers a faecal microbiota transplant only for adults who have had 2 or more previous episodes. NICE reviewed the guideline on 11 July 2024 and plans to update it.",
      sources: ["nice-ng199"],
    },
    {
      name: "Adult guidance (IDSA and SHEA 2021, ESCMID 2021): fidaxomicin preferred",
      differs: "For adults, IDSA and SHEA suggest fidaxomicin rather than a standard course of vancomycin for a first episode (conditional recommendation, moderate certainty of evidence) and for recurrences (conditional, low certainty), with vancomycin an acceptable alternative. The ESCMID abstract says metronidazole is no longer recommended when fidaxomicin or vancomycin is available.",
      evidence: "Neither covers children. Both also give bezlotoxumab a place in adults with recurrence (IDSA and SHEA: conditional, very low certainty), which the paediatric oncology guideline and NICE do not. ESCMID was read as an abstract only.",
      sources: ["idsa-shea-2021", "escmid-cdi-2021"],
    },
    {
      name: "Faecal microbiota transplantation after treatment ends",
      differs: "Uses faecal transplant for recurrent infection once the child has finished cancer treatment and is no longer immunosuppressed.",
      evidence: "The guideline's strong recommendation is against routine use; its rationale says the highest concern is during neutropenia and immunosuppression, and that faecal transplant may be a reasonable option once patients have completed therapy and are no longer immunosuppressed. No trial in children with cancer supports it; only one trial included any children.",
      sources: ["patel-cdi-2024"],
    },
    {
      name: "Fidaxomicin dose from the US product label",
      differs: "The label covers children from 6 months of age: one 200 mg tablet by mouth twice a day for 10 days for a child weighing at least 12.5 kg who can swallow tablets; otherwise the oral suspension twice a day for 10 days at a dose set by weight band from 4 kg, in a table in the label.",
      evidence: "This is the manufacturer's label, not a guideline. The label says safety and effectiveness are not established under 6 months of age.",
      sources: ["dificid-label"],
    },
  ],
  grades: [
    { claim: "Oral metronidazole or vancomycin for non-severe infection", grade: "strong recommendation, low quality evidence", source: "patel-cdi-2024" },
    { claim: "Oral vancomycin or fidaxomicin for severe infection", grade: "strong recommendation, low quality evidence", source: "patel-cdi-2024" },
    { claim: "Fidaxomicin for recurrence", grade: "conditional recommendation, moderate quality evidence", source: "patel-cdi-2024" },
    { claim: "No routine faecal microbiota transplantation", grade: "strong recommendation, low quality evidence", source: "patel-cdi-2024" },
    { claim: "No routine probiotics for prevention", grade: "conditional recommendation, low quality evidence", source: "patel-cdi-2024" },
    { claim: "No routine probiotics for treatment", grade: "conditional recommendation, low quality evidence", source: "patel-cdi-2024", quote: "We suggest that probiotics not be used routinely for the treatment of CDI in pediatric patients with cancer and HCT recipients" },
    { claim: "No routine monoclonal antibodies (bezlotoxumab)", grade: "conditional recommendation, moderate quality evidence", source: "patel-cdi-2024" },
    { claim: "Children in general, non-severe first episode or first recurrence: metronidazole or vancomycin", grade: "weak recommendation, low quality of evidence", source: "idsa-shea-2017", quote: "Either metronidazole or vancomycin is recommended for the treatment of children with an initial episode or first recurrence of nonsevere CDI" },
    { claim: "Children in general, severe first episode: oral vancomycin over metronidazole", grade: "strong recommendation, moderate quality of evidence", source: "idsa-shea-2017", quote: "For children with an initial episode of severe CDI, oral vancomycin is recommended over metronidazole" },
    { claim: "Children in general, second or later recurrence: oral vancomycin over metronidazole", grade: "weak recommendation, low quality of evidence", source: "idsa-shea-2017", quote: "For children with a second or greater episode of recurrent CDI, oral vancomycin is recommended over metronidazole" },
    { claim: "Children in general: consider faecal microbiota transplantation after multiple recurrences", grade: "weak recommendation, very low quality of evidence", source: "idsa-shea-2017", quote: "Consider fecal microbiota transplantation for pediatric patients with multiple recurrences of CDI following standard antibiotic treatments" },
    { claim: "No routine testing at 1 to 2 years unless other causes are excluded", grade: "weak recommendation, low quality of evidence", source: "idsa-shea-2017", quote: "Clostridium difficile testing should not be routinely performed in children with diarrhea who are 1–2 years of age unless other infectious or noninfectious causes have been excluded" },
    { claim: "Under-18s in England: oral antibiotic on specialist advice", grade: "Not graded (NICE does not grade recommendations)", source: "nice-ng199", quote: "For children and young people under 18 years, offer an oral antibiotic to treat suspected or confirmed C. difficile infection." },
  ],
  sources: [
    { key: "patel-cdi-2024", label: "Guideline for the management of Clostridioides difficile infection in pediatric patients with cancer and hematopoietic cell transplantation recipients: 2024 update", publisher: "International panel (Pediatric Oncology Group of Ontario), eClinicalMedicine", year: 2024, url: "https://europepmc.org/article/PMC/PMC11046252", doi: "10.1016/j.eclinm.2024.102604", gradingScheme: "GRADE: recommendations strong or conditional, evidence high, moderate, low or very low, printed after each recommendation; good practice statements are ungraded.", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-cdi-2024", label: "Guideline for the Management of Clostridioides difficile Infection in Pediatric Patients with Cancer and Hematopoietic Cell Transplantation Recipients (COG endorsement, version date 10 September 2024)", publisher: "Children's Oncology Group", year: 2024, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_C_diff_Guideline_Document_10SEPT2024-new-logo.pdf", gradingScheme: "Reprints the source guideline's GRADE strength and quality for each recommendation, but prints low quality evidence for two recommendations that the source guideline grades moderate.", read: "full-text", accessed: "2026-11-17" },
    { key: "idsa-shea-2017", label: "Clinical Practice Guidelines for Clostridium difficile Infection in Adults and Children: 2017 Update by the Infectious Diseases Society of America (IDSA) and Society for Healthcare Epidemiology of America (SHEA)", publisher: "IDSA and SHEA, Clinical Infectious Diseases", year: 2018, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6018983/", doi: "10.1093/cid/cix1085", gradingScheme: "GRADE: strong or weak recommendation, with high, moderate, low or very low quality of evidence, printed after each recommendation; some statements are ungraded good practice recommendations or 'no recommendation'.", read: "full-text", accessed: "2026-11-17" },
    { key: "idsa-shea-2021", label: "Clinical Practice Guideline by IDSA and SHEA: 2021 Focused Update Guidelines on Management of Clostridioides difficile Infection in Adults", publisher: "IDSA and SHEA, Clinical Infectious Diseases", year: 2021, url: "https://www.idsociety.org/practice-guideline/clostridioides-difficile-2021-focused-update/", doi: "10.1093/cid/ciab549", gradingScheme: "GRADE: strong or conditional recommendation, with the certainty of evidence printed after each.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ng199", label: "Clostridioides difficile infection: antimicrobial prescribing (NICE guideline NG199)", publisher: "National Institute for Health and Care Excellence", year: 2021, url: "https://www.nice.org.uk/guidance/ng199/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the verb (offer, consider, do not offer) carries the strength.", read: "full-text", accessed: "2026-11-17" },
    { key: "escmid-cdi-2021", label: "European Society of Clinical Microbiology and Infectious Diseases: 2021 update on the treatment guidance document for Clostridioides difficile infection in adults", publisher: "ESCMID, Clinical Microbiology and Infection", year: 2021, url: "https://europepmc.org/abstract/MED/34678515", doi: "10.1016/j.cmi.2021.09.038", read: "abstract", accessed: "2026-11-17" },
    { key: "dificid-label", label: "DIFICID (fidaxomicin) tablets and granules for oral suspension: US prescribing information (DailyMed, label version 22)", publisher: "Merck Sharp & Dohme LLC, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dd966338-c820-4270-b704-09ef75fa3ceb", read: "full-text", accessed: "2026-11-17" },
    { key: "ema-zinplava", label: "Zinplava (bezlotoxumab): European public assessment report page, marked withdrawn", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/medicines/human/EPAR/zinplava", read: "public-summary", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The paediatric oncology guideline sets no criteria for diagnosing C. difficile infection (which test, and which symptoms); the panel names this as needed. The testing steps here come from IDSA and SHEA guidance for adults and children in general.",
    "The paediatric oncology guideline gives no doses and no treatment length. The doses on this page are those IDSA and SHEA printed in 2017 for children in general, and the fidaxomicin dose is from the US label. NICE leaves children's doses to the BNF for Children, which was not read on 17 November 2026.",
    "Most evidence is from adult trials; few trials include neutropenic children. The panel also lists as unsettled the definition of severe infection in this group and what to do for a child who cannot take medicine by mouth.",
    "The Children's Oncology Group endorsement document prints low quality evidence for fidaxomicin in recurrence and for monoclonal antibodies, where the guideline it endorses prints moderate. This page gives the guideline's own grades.",
    "The European Medicines Agency page says the European Commission withdrew the marketing authorisation for bezlotoxumab (Zinplava) on 20 October 2026, at the company's request, after it decided to stop marketing the product for commercial reasons. Its status in the United States and elsewhere was not checked on 17 November 2026.",
    "The IDSA and SHEA 2021 focused update was unreadable beyond its abstract on 11 November 2026; on 17 November 2026 its full text read from idsociety.org. It covers adults only and says the 2017 paediatric recommendations are outside its scope, so the paediatric advice from IDSA and SHEA dates from before fidaxomicin was approved for children.",
    "The ESCMID 2021 guidance covers adults only and was read as an abstract on 17 November 2026, because the full text is not open. No ESCMID guidance for children was found.",
    "NICE NG199 was last reviewed on 11 July 2024 and NICE says it plans to update it; no update had been published by 17 November 2026.",
    "No guideline read here recommends an antibiotic to prevent C. difficile infection in children; NICE says not to offer one, and the paediatric oncology guideline lists prevention strategies as a research gap.",
  ],
  cancers: ["childhood-cancers"],
  technologies: ["allogeneic-hsct"],
  companies: ["childrens-oncology-group"],
  related: ["paediatric-fever-and-neutropenia"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "infection"],
});
