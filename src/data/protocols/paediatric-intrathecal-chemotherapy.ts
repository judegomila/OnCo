import { protocol } from "./helpers";

/*
 * Intrathecal chemotherapy in children: what is particular to the lumbar puncture and the injection in a child, as
 * opposed to an adult. Two existing records hold the rest and are linked, not repeated: the safety register, room,
 * labelling and double check (intrathecal-chemotherapy-and-vinca-alkaloid-safety) and the sedation itself
 * (paediatric-procedural-pain-and-sedation). Platelet thresholds in general are in
 * paediatric-platelet-transfusion-thresholds.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again raw (curl, pdftotext, Europe PMC and NCBI
 * E-utilities, the openFDA label API) and every claim re-read against the text; every quote was checked by script.
 * Where a copy saved the same day by the checker of the linked safety protocol was used, it says "re-used".
 * - HSC 2008/001 (Department of Health, England, 11 August 2008): still not readable. The UK Government Web Archive
 *   answers a script with a human-verification page, and one request to the Internet Archive for the PDF was refused
 *   (HTTP 429). Nothing rests on it. What England currently requires is taken from the NHS Specialist Pharmacy
 *   Service pages of 13 June 2025, which summarise it (re-used, full text); they say the national guidance is being
 *   updated.
 * - Scotland: CEL 21 (2009) on intrathecal chemotherapy and CEL 22 (2009) on vinca alkaloids, and DL(2025)14 on
 *   systemic anti-cancer therapy, which calls CEL 21 (2009) extant (all re-used, PDF text). These carry the
 *   provisions for children that the first version of this record said it could not read.
 * - ISMP Targeted Medication Safety Best Practices for Hospitals 2026-2027 and WHO Alert No. 115 (re-used, PDF text).
 * - NHS England National Patient Safety Alert NatPSA/2024/002/NHSPS: still an empty HTTP 202 to a script.
 * - Children's Oncology Group endorsement (version date 26 March 2026) of the 2025 AABB and ICTMG platelet
 *   guidelines: public PDF, full text; the COG guideline index (re-used) lists it as current and lists the
 *   pencil-point needle guideline as archived in August 2024. Metcalf et al., JAMA 2025: abstract only. The platelet
 *   counts carry a superscript that flattens in the raw text, so no quote carries a count.
 * - NICE NG24 (last updated 26 February 2026; platelet recommendations dated 2015): platelet chapter, full text.
 * - Rusch et al., J Pediatr Oncol Nurs 2014: full text of the author manuscript (PMC5685494) through NCBI
 *   E-utilities; the Europe PMC full-text endpoint answered HTTP 500.
 * - US labels read as raw label text from the openFDA API: Methotrexate Injection (Hospira, label effective
 *   27 October 2026) and Cytarabine Injection (Hospira, label effective 30 September 2026).
 * - Abstracts, Europe PMC: Howard 2000 and 2002, Gajjar 2000, Rech 2005, Foerster 2015, Crock 2014, Ebinger 2004,
 *   Blaney 1995, Loeffen 2020 and the Cochrane review CD011980.pub3 (2018, still the latest version). Bürger 2003 and
 *   te Loo 2006: the PubMed abstracts, because the Europe PMC copies are cut short. Setänen 2025: full text, Europe
 *   PMC XML (PMC12420885).
 * - Inaba et al., Leukemia 2026: a letter with no abstract; the publisher's page shows a preview only. Named in
 *   sources as not reachable; nothing rests on it.
 * - Pages for families, full text: Great Ormond Street Hospital on intrathecal methotrexate (last review 1 May 2020),
 *   AboutKidsHealth (last updated 6 March 2018) and the NHS page on lumbar puncture (reviewed 14 November 2023).
 * - Not found: any CCLG, SIOP, C17 or International Pediatric Oncology Guidelines document on how to carry out a
 *   lumbar puncture for intrathecal chemotherapy, on positioning afterwards, or on the timing of the first puncture.
 *
 * Nothing here rests on an Internet Archive copy. The two drug labels are written by the manufacturer and approved
 * by the regulator; no other source is industry funded so far as its text states. Every DOI came from a Europe PMC
 * record whose title was checked. Quotes are copied from the raw text with line breaks joined and nothing else
 * changed.
 */
export const paediatricIntrathecalChemotherapy = protocol({
  id: "paediatric-intrathecal-chemotherapy",
  name: "Intrathecal chemotherapy in children: the lumbar puncture, platelets, needles and care afterwards",
  aka: ["lumbar puncture with chemotherapy in children", "IT methotrexate in children", "spinal chemotherapy for childhood leukaemia", "LP and intrathecals", "intrathecal chemotherapy under general anaesthetic", "traumatic lumbar puncture", "post-lumbar puncture headache in children"],
  domain: "paediatric",
  tldr: "Children with leukaemia and some other cancers have chemotherapy injected into the fluid around the spine, through a needle in the lower back, many times during treatment. It is usually done asleep. Two trained staff check the drug first. Platelets are given beforehand only if the count is very low, and a fine needle makes a headache afterwards less likely.",
  simple: "Some chemotherapy has to go into the fluid around the spine. Your child will usually be asleep for it. Two trained staff check the medicine before it is given. Afterwards a few children get a headache that is worse sitting up and better lying down. Tell the team if that happens.",
  summary: "This record covers what is particular to children; the register, the dedicated room, labelling and the two-person check are in the intrathecal safety protocol, and the sedation in the paediatric procedural sedation protocol. Each child's treatment protocol and unit policy come first.\n\nSafety. A vinca alkaloid such as vincristine given into the spine causes paralysis and death, so UK guidance separates the two routes. In England the intravenous chemotherapy must be issued and given first (NHS Specialist Pharmacy Service 2025, summarising HSC 2008/001, which could not itself be read). Scotland's CEL 21 (2009) says the two should never be given at the same time and allows two exceptions to the order, both for children: intrathecal chemotherapy under general anaesthesia, and a paediatric protocol that requires the intrathecal drugs first. For children in a children's unit, UK guidance gives vinca alkaloids in a syringe of 10 mL or more, not the 50 mL minibag used for adults and adolescents; ISMP in the United States says a minibag for every patient (variants).\n\nDose. The US label for methotrexate recommends an intrathecal dose by age: 6 mg under 1 year, 8 mg from 1 to under 2 years, 10 mg from 2 to under 3 years, 12 mg from 3 to under 9 years and 12 to 15 mg from 9 years, using only the preservative-free product diluted to 1 mg/mL, with leucovorin rescue for patients with Down syndrome. The US cytarabine labels read give no age-banded intrathecal dose, and no label or guideline read gives one for hydrocortisone. Treatment protocols set their own doses.\n\nPlatelets. The 2025 AABB and ICTMG guideline, endorsed by the Children's Oncology Group in 2026, recommends transfusion before lumbar puncture below 20 × 10³/μL (strong, moderate certainty). NICE NG24 has no figure for lumbar puncture and says to consider raising the count above 50 × 10⁹/L for invasive procedures in general. In 5,223 lumbar punctures in 958 children with leukaemia, including 199 at counts of 20 × 10⁹/L or less, no serious complication was seen (Howard 2000). Some reports describe more caution at the first, diagnostic puncture in leukaemia, because leukaemia cells in a blood-stained first sample have been linked to worse outcome in cohort studies (variants).\n\nSedation. An international guideline strongly recommends offering deep sedation or general anaesthesia to all children having a lumbar puncture (Loeffen 2020).\n\nNeedle and headache. The Children's Oncology Group nursing review (Rusch 2014, GRADE) gives strong recommendations on moderate evidence for smaller needles and for pencil-point needles when clinically applicable, a weak one for a bevel parallel to the spine, a weak one against extended bed rest, a weak one against caffeine, extra fluids, frovatriptan, ibuprofen and tramadol to shorten an established headache, and a weak one for an epidural blood patch, with caution in leukaemia. A crossover trial in 93 children with leukaemia found little difference in headache between 22 and 25 gauge needles.\n\nPositioning afterwards. Lying flat, prone or head-down for a set time to spread the drug (at least an hour at Great Ormond Street Hospital) is institutional practice resting on an experiment in four non-human primates; the nursing review found insufficient evidence on short bed rest and did not assess positioning for drug distribution.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "anaesthetist", "pharmacist"],
    where: ["theatre", "ward", "chemotherapy-day-unit", "outpatient-clinic"],
  },
  population: "Children and young people having chemotherapy by lumbar puncture into the spinal fluid (methotrexate, cytarabine or hydrocortisone) for acute lymphoblastic leukaemia, acute myeloid leukaemia or non-Hodgkin lymphoma. The safety rules quoted are from England and Scotland, with the United States position on vinca alkaloids as a variant; the platelet and needle recommendations are international or from the United States; the methotrexate doses are those of the US label. Drugs given through a ventricular reservoir, and intrathecal drugs other than chemotherapy, are not covered. The dose, the schedule and the timing of the first puncture are set by the child's treatment protocol, and that protocol and the unit's own policy come first.",
  trigger: "A child's treatment protocol calls for a lumbar puncture with intrathecal chemotherapy.",
  steps: [
    {
      action: "Never give intrathecal chemotherapy at the same time as an intravenous bolus injection or a vinca alkaloid infusion",
      why: "A vinca alkaloid such as vincristine given into the spine by mistake causes paralysis and death, so the two routes are kept apart. Scotland's guidance says they should never be given together. It says intravenous chemotherapy must be issued first, with proof it was given, before the spinal dose is issued, and it allows two exceptions to that order, both for children: intrathecal chemotherapy under general anaesthesia, and a paediatric protocol that requires the intrathecal drugs first. England's summary says the intravenous chemotherapy must be issued and given first; what its full guidance says about children could not be read.",
      source: "cel-21-2009",
      quote: "Intrathecal chemotherapy and intravenous bolus injections or vinca alkaloid infusions should never be administered at the same time.",
    },
    {
      action: "In a children's unit in the UK, give vincristine and other vinca alkaloids from a syringe of 10 mL or more",
      why: "The presentation is meant to stop the drug being mistaken for an intrathecal injection. Adults and adolescents have these drugs in a 50 mL minibag for the same reason. For children in children's units, the Scottish guidance judged that the practical difficulties of infusions outweigh the benefits, does not recommend minibags, and has the dose diluted in a syringe of at least 10 mL.",
      source: "sps-vinca-2025",
      quote: "Vinca alkaloids for children are prescribed, prepared, dispensed and administered in a 10mL or greater syringe size.",
    },
    {
      action: "Take the dose from the child's age as the treatment protocol sets it, and use only preservative-free methotrexate",
      why: "The US label recommends an intrathecal methotrexate dose by age: 6 mg under 1 year, 8 mg from 1 to under 2 years, 10 mg from 2 to under 3 years, 12 mg from 3 to under 9 years and 12 to 15 mg from 9 years. It warns that the preservative benzyl alcohol can cause serious harm to the nervous system if it reaches the spinal fluid.",
      source: "methotrexate-label-2026",
      quote: "Use only preservative-free Methotrexate Injection for intrathecal use.",
    },
    {
      action: "Check the platelet count beforehand and give a platelet transfusion first if it is below 20 × 10³/μL, unless the child's protocol sets another figure for that puncture",
      why: "Bleeding around the spine after a lumbar puncture has turned out to be extremely rare even with low platelets, so this threshold keeps transfusions to a minimum. The Children's Oncology Group endorsement prints the recommendation as strong, on moderate certainty.",
      source: "metcalf-2025",
      quote: "Exceedingly low incidence of spinal hematoma was identified in patients with thrombocytopenia undergoing lumbar puncture.",
      grade: "Strong recommendation, high/moderate-certainty evidence",
    },
    {
      action: "Offer deep sedation or general anaesthesia for the lumbar puncture",
      why: "Children with cancer have needle procedures again and again, and the guideline's aim is to prevent the pain and distress they cause.",
      source: "loeffen-2020",
      quote: "Strong recommendations were made for the use of topical anesthetics in all needle procedures, for offering deep sedation (DS)/general anesthesia (GA) to all children undergoing lumbar puncture",
      grade: "Strong recommendation",
    },
    {
      action: "Use a smaller (higher gauge) needle where clinically applicable, taking account of the child's weight and build, the chemotherapy to be given and the operator's experience",
      why: "In theory a finer needle leaves a smaller hole in the lining around the spinal fluid, so less fluid leaks and a headache is less likely.",
      source: "rusch-2014",
      quote: "There is a strong recommendation, based on an overall moderate quality of evidence, for the use of smaller size (higher gauge) spinal needles for performing lumbar punctures in pediatric patients to prevent PLPHs, when clinically applicable.",
      grade: "Strong recommendation, moderate quality of evidence",
    },
    {
      action: "Use a pencil-point needle where clinically applicable, and consider one for any child who has had a headache after an earlier puncture",
      why: "A pencil-point tip is thought to part the fibres of the lining instead of cutting them, leaving a less traumatic hole.",
      source: "rusch-2014",
      quote: "There is a strong recommendation, based on an overall moderate quality of evidence, for the use of pencil point needles in pediatric patients undergoing lumbar puncture to prevent post-lumbar puncture headaches, when clinically applicable.",
      grade: "Strong recommendation, moderate quality of evidence",
    },
    {
      action: "With a cutting needle, turn the bevel parallel to the long axis of the spine",
      why: "The fibres of the lining run lengthways, so a bevel turned the same way may cut fewer of them.",
      source: "rusch-2014",
      quote: "There is a weak recommendation, based on an overall low quality of evidence, that bevel orientation of the lumbar puncture needle parallel to the long access should be used to decrease the incidence of PLPHs.",
      grade: "Weak recommendation, low quality of evidence",
    },
    {
      action: "Do not keep a child on extended bed rest afterwards in order to prevent a headache",
      why: "In the two trials the review found, 6 hours of bed rest did not prevent headache, and children kept in bed for 24 hours had more headaches than those allowed up.",
      source: "rusch-2014",
      quote: "There is a weak recommendation, based on an overall low quality of evidence, against the use of extended bed rest following lumbar puncture to prevent PLPH.",
      grade: "Weak recommendation, low quality of evidence",
    },
    {
      action: "Tell the family what a post-puncture headache is like, a headache within five days that comes on when upright and eases lying down, and ask them to tell the team about a headache that does not go away",
      why: "The hole left by the needle is thought to let spinal fluid leak, which causes pain when the child is upright. The NHS page on lumbar puncture says a headache is common and should go away after a few days, and that a headache that does not go away needs urgent advice.",
      source: "rusch-2014",
      quote: "By definition, a PLPH is a headache that develops within five days of a lumbar puncture, worsens within 15 minutes of assuming the upright position and improves within 15 minutes of resuming a recumbent position",
    },
    {
      action: "For a post-puncture headache, consider an epidural blood patch only after weighing remission status, infection and bleeding risk",
      why: "A blood patch seals the leak with a clot of the child's own blood. In a child with leukaemia that blood could, in theory, carry leukaemia cells into the central nervous system, which is why remission status is weighed first.",
      source: "rusch-2014",
      quote: "There is a weak recommendation, based on an overall very low quality of evidence, for the use of epidural blood patch in managing PLPHs in pediatric patients.",
      grade: "Weak recommendation, very low quality of evidence",
    },
  ],
  bestInClass: {
    statement: "For keeping vinca alkaloids away from the spinal injection, UK national guidance: intravenous chemotherapy issued and given first (England), the two never given at the same time, with the order relaxed only for children under general anaesthesia or where a paediatric protocol requires it (Scotland, CEL 21), and a child's vinca alkaloid in a syringe of 10 mL or more in a children's unit. ISMP in the United States disagrees on the last point and says a minibag for every patient, giving 25 mL as an example for children; both positions are shown. For the dose of methotrexate, the label's age bands, subject to the child's treatment protocol. For platelets, the 2025 AABB and ICTMG recommendation endorsed by the Children's Oncology Group: transfuse before lumbar puncture below 20 × 10³/μL (strong, moderate certainty). NICE NG24, for people aged 1 year and over, has no recommendation naming lumbar puncture; its 2015 recommendation is to consider raising the count above 50 × 10⁹/L for invasive procedures or surgery, and NICE does not grade. The 2025 international guideline is the newer and is specific to lumbar puncture. For the needle and for headache, the Children's Oncology Group nursing review of 2014: smaller and pencil-point needles (strong, moderate), no extended bed rest (weak, low). On needles the evidence in children with cancer is thinner than the grade suggests: the review found only one study of needle size and one of needle design in children with cancer and neither showed a significant difference, and a later crossover trial in 93 children with leukaemia found little difference between 22 and 25 gauge. For sedation, the international guideline's strong recommendation to offer deep sedation or general anaesthesia to all children having a lumbar puncture. No guideline that could be read covers positioning after the injection or the conduct of the first diagnostic puncture; both are shown as variants.",
    sources: ["sps-itc-2025", "cel-21-2009", "sps-vinca-2025", "ismp-bp-2026", "methotrexate-label-2026", "cog-platelet-2026", "metcalf-2025", "nice-ng24", "rusch-2014", "crock-2014", "loeffen-2020"],
  },
  variants: [
    {
      name: "A minibag for a child's vinca alkaloid, not a syringe (United States)",
      differs: "Gives vincristine and other vinca alkaloids to children, as to adults, in a minibag. ISMP's best practices for hospitals for 2026 and 2027 say to dispense them in a minibag and not in a syringe, with a volume too large for a spinal injection, giving 25 mL for children and 50 mL for adults as examples. UK guidance instead keeps the syringe for children treated in a children's unit: 10 mL or greater in England, a minimum of 10 mL in Scotland, where minibags for children in children's units are not recommended.",
      evidence: "ISMP says many organisations, children's hospitals among them, have changed to minibags, and that no accidental intrathecal dose of a vinca alkaloid dispensed in a minibag has been reported. WHO's 2007 alert recommends that syringes should not be used for vincristine, and describes an adult in Spain in 2005 given vincristine from a 20 mL syringe into the spine. The Scottish circular of 2009 gives its reason for the exception: the practical difficulties of preparing and giving infusions to children were judged to outweigh the benefits. No comparison of the two methods in children was read.",
      sources: ["ismp-bp-2026", "who-alert-115", "sps-vinca-2025", "cel-22-2009", "dl-2025-14"],
    },
    {
      name: "Lying prone, flat or head-down for a set time to spread the drug",
      differs: "Keeps the child in a set position after the injection so that the drug moves up towards the brain. Great Ormond Street Hospital's information for families says: \"It is recommended children lay on their tummy for at least one hour after an intrathecal procedure as this may help distribution of the methotrexate through the CSF.\" The Children's Oncology Group nursing review records the same practice: \"It is the practice at some institutions for patients to lay flat or in Trendelenburg position for a defined period of time to theoretically facilitate the distribution of intrathecal chemotherapy throughout the CNS.\"",
      evidence: "One experiment in four non-human primates (Blaney 1995): after methotrexate into the lumbar spinal fluid, the mean peak level in ventricular fluid was 0.12 micromoles per litre when the animal sat upright at once and 2.81 when it lay prone for an hour first. No study in children was found. The nursing review states that evaluating positioning for drug distribution was outside its scope.",
      sources: ["gosh-it-methotrexate-2020", "rusch-2014", "blaney-1995"],
    },
    {
      name: "Lying down for about an hour to prevent headache",
      differs: "Gives headache prevention as the reason for the hour lying down. The Hospital for Sick Children's page for families says: \"Children lie down for approximately 1 hour after the procedure to prevent a headache.\" The NHS page on lumbar puncture, written for adults and children alike, says the person stays for around 1 to 2 hours to be monitored and needs to lie flat and rest, without giving a reason.",
      evidence: "The trials read do not support bed rest for this purpose. In a randomised trial of 111 patients aged 2 to 17 having a diagnostic lumbar puncture (Ebinger 2004), 24 hours of bed rest was followed by more headache than free mobility (positional headache 15 against 2 per cent, any headache 39 against 21 per cent). The nursing review recommends against extended bed rest (weak, low) and says there is insufficient evidence to make a recommendation on shorter periods such as 60 minutes.",
      sources: ["aboutkidshealth-lp-2018", "nhs-lumbar-puncture-2023", "ebinger-2004", "rusch-2014"],
    },
    {
      name: "A higher platelet count and the most experienced operator for the first puncture in leukaemia",
      differs: "Handles the diagnostic lumbar puncture in a child with newly diagnosed leukaemia differently from later ones, acting on the modifiable risk factors for a blood-stained sample that a St Jude cohort identified: a platelet count of 100 × 10³/μL or less, an interval of 15 days or less between punctures, a less experienced practitioner, and the conditions of an earlier era, before a dedicated procedure area and general anaesthesia. In the Swedish centre whose series was read, first diagnostic punctures were done only by physicians, while supervised students did later ones.",
      evidence: "Cohort studies, not trials. In 5,609 lumbar punctures in 956 children at one centre (Howard 2002), 29% were traumatic (at least 10 red cells per microlitre); the odds ratios were 1.5 for the comparison of platelet counts at 100 × 10³/μL, 1.4 for the least against the most experienced practitioners, 2.3 for infants under 1 year and 10.8 when the previous puncture was a day before, against more than 15 days. In 546 children at the same centre (Gajjar 2000), leukaemia cells in a blood-stained first sample were linked to lower event-free survival, with a hazard ratio of 2.39 after two such samples. In the BFM-95 trial (2,021 children) five-year event-free survival was 73% after a traumatic puncture with blasts against 80% with a clear sample. In a Dutch cohort of 526 it was 58% after a traumatic puncture with blasts, against 82% after a traumatic puncture without blasts and 72.6% with a clear sample. A Swedish series of 130 first punctures found 13.1% traumatic and no effect of the risk factors it tested. The 2025 platelet guideline's threshold of 20 is for lumbar puncture in general; whether its panel considered the first puncture in leukaemia separately could not be read.",
      sources: ["howard-2002", "gajjar-2000", "burger-2003", "teloo-2006", "setanen-2025", "metcalf-2025"],
    },
    {
      name: "Intrathecal chemotherapy given at the first diagnostic puncture",
      differs: "Injects the first intrathecal dose at the diagnostic lumbar puncture, instead of taking a diagnostic sample alone and returning for a second puncture 24 to 48 hours later.",
      evidence: "In a retrospective study of 77 children (Rech 2005), of 19 who had a traumatic first puncture and delayed intrathecal therapy, 6 had an isolated relapse in the central nervous system and 2 a combined relapse, against 1 relapse among 9 who had a traumatic puncture and early therapy (p = 0.20); its authors asked for prospective randomised confirmation. The 2002 cohort found that a puncture one day after the previous one was much more likely to be traumatic than one more than 15 days after.",
      sources: ["rech-2005", "howard-2002"],
    },
    {
      name: "Platelets above 50 before an invasive procedure (NICE NG24)",
      differs: "Treats a lumbar puncture as one of the invasive procedures for which NICE says to consider a prophylactic transfusion to raise the count above 50 × 10⁹/L, instead of transfusing only below 20. NICE covers people aged 1 year and over and does not name lumbar puncture.",
      evidence: "NICE does not grade its recommendations. This one is marked 2015 and was not changed when the guideline was last updated on 26 February 2026. NICE also says not to offer prophylactic platelets for procedures with a low risk of bleeding, and its examples do not include lumbar puncture. The 2025 AABB and ICTMG recommendation of 20 × 10³/μL is specific to lumbar puncture and is graded strong, on moderate certainty.",
      sources: ["nice-ng24", "cog-platelet-2026", "metcalf-2025"],
    },
    {
      name: "No routine platelet transfusion above 10 before lumbar puncture",
      differs: "Proceeds without platelets at counts between 10 and 20 × 10⁹/L.",
      evidence: "The St Jude series (Howard 2000) saw no serious complication in 5,223 punctures, 170 of them at counts of 11 to 20 and 29 at 10 or less, and concluded that prophylactic transfusion is not necessary above 10, while saying that no conclusion could yet be drawn at 10 or less. A Brazilian series of 9,088 punctures in 440 children (Foerster 2015) included 25 at counts up to 10,000 per cubic millimetre and 67 between 10,000 and 20,000, and observed no complication. The Cochrane review (2018) found no study comparing thresholds. The 2025 guideline's summary calls 20 practical for implementation.",
      sources: ["howard-2000", "foerster-2015", "cochrane-platelets-lp-2018", "cog-platelet-2026"],
    },
  ],
  grades: [
    { claim: "Intrathecal chemotherapy and intravenous bolus or vinca alkaloid chemotherapy never given at the same time", grade: "National guidance (Scotland); not graded; \"should never\"", source: "cel-21-2009" },
    { claim: "Intravenous chemotherapy issued and given before the intrathecal dose is issued", grade: "National guidance summary (England); not graded; \"must\"", source: "sps-itc-2025", quote: "The IV chemotherapy must be issued and administered first." },
    { claim: "Vinca alkaloids for children in a syringe of 10 mL or greater", grade: "National guidance summary (England); not graded", source: "sps-vinca-2025" },
    { claim: "Minibags for vinca alkaloids in children's units", grade: "National guidance (Scotland); not graded; \"not recommended\"", source: "cel-22-2009", quote: "The use of minibags to administer vinca alkaloids to children and adolescents treated in a children’s unit is not recommended." },
    { claim: "Vinca alkaloids for children and young people in a children's unit: diluted, in a syringe of at least 10 mL", grade: "National guidance (Scotland, 2025); not graded", source: "dl-2025-14", quote: "When vinca alkaloids are prescribed for children or young people treated in a children’s unit the prescribed dose is dispensed diluted and presented in a minimum 10ml syringe size." },
    { claim: "Vinca alkaloids in a minibag and not a syringe, for all patients", grade: "ISMP Best Practice 1; not graded", source: "ismp-bp-2026", quote: "Dispense vinCRIStine and other vinca alkaloids in a minibag of a compatible solution and not in a syringe." },
    { claim: "Intrathecal methotrexate dose by age: 6 mg, 8 mg, 10 mg, 12 mg, and 12 to 15 mg from 9 years", grade: "US prescribing information; recommended dose", source: "methotrexate-label-2026" },
    { claim: "Intrathecal cytarabine: no age-banded dose; past use of 5 to 75 mg/m², most often 30 mg/m² every 4 days", grade: "US prescribing information; reported use, not a recommended dose", source: "cytarabine-label-2026", quote: "The frequency of administration varied from once a day for 4 days to once every 4 days." },
    { claim: "Platelet transfusion before lumbar puncture when the count is below 20 × 10³/μL", grade: "Strong / Moderate", source: "cog-platelet-2026", quote: "The “Platelet Transfusion 2025 AABB and ICTMG International Clinical Practice Guidelines” were endorsed by the COG Supportive Care Guidelines sub-Committee in February 2026." },
    { claim: "Consider raising the platelet count above 50 × 10⁹/L for invasive procedures or surgery (lumbar puncture not named)", grade: "NICE does not grade; \"consider\"; dated 2015", source: "nice-ng24" },
    { claim: "Serious complications of lumbar puncture in children with leukaemia, by platelet count", grade: "Retrospective cohort (958 children, 5,223 punctures)", source: "howard-2000", quote: "No serious complications were encountered, regardless of the platelet count." },
    { claim: "Studies comparing platelet thresholds before lumbar puncture", grade: "Cochrane review: none found", source: "cochrane-platelets-lp-2018", quote: "No studies compared different platelet count thresholds prior to a procedure." },
    { claim: "Smaller (higher gauge) spinal needles", grade: "Strong recommendation, moderate quality of evidence", source: "rusch-2014" },
    { claim: "Pencil-point needles", grade: "Strong recommendation, moderate quality of evidence", source: "rusch-2014" },
    { claim: "22 against 25 gauge needles in children with leukaemia", grade: "Randomised crossover trial (93 children, 341 procedures)", source: "crock-2014", quote: "There was little difference in the occurrence of post-LP headache or any headache between procedures carried out using the 22-gauge or 25-gauge needles." },
    { claim: "Bevel parallel to the long axis of the spine", grade: "Weak recommendation, low quality of evidence", source: "rusch-2014" },
    { claim: "Against extended bed rest to prevent headache", grade: "Weak recommendation, low quality of evidence", source: "rusch-2014" },
    { claim: "Shorter bed rest (60 minutes) straight after the puncture", grade: "Insufficient evidence to make a recommendation", source: "rusch-2014", quote: "There is therefore insufficient evidence to make a recommendation regarding shorter periods of bed rest (60 min) immediately following a lumbar puncture." },
    { claim: "Against caffeine, oral and intravenous hydration, frovatriptan, ibuprofen and tramadol to shorten an established headache", grade: "Weak recommendation, very low quality of evidence", source: "rusch-2014", quote: "There is a weak recommendation, based on an overall very low quality of evidence, against the use of caffeine, oral and intravenous hydration, frovatripan, ibuprofen, and tramadol to reduce the duration of PLPHs." },
    { claim: "Epidural blood patch for an established headache", grade: "Weak recommendation, very low quality of evidence", source: "rusch-2014" },
    { claim: "A headache after lumbar puncture that does not go away: ask for an urgent GP appointment or contact NHS 111", grade: "NHS information for the public; not graded", source: "nhs-lumbar-puncture-2023", quote: "These side effects are common and should go away after a few days." },
    { claim: "Deep sedation or general anaesthesia offered to all children having a lumbar puncture", grade: "Strong recommendation", source: "loeffen-2020" },
    { claim: "Prone position for an hour after intralumbar methotrexate raises ventricular drug levels", grade: "Experiment in four non-human primates", source: "blaney-1995", quote: "Maintaining a prone position for 1 hour after an intralumbar dose increased the peak methotrexate concentration and drug exposure in ventricular CSF." },
    { claim: "Traumatic lumbar puncture at diagnosis and outcome in childhood acute lymphoblastic leukaemia", grade: "Retrospective cohort (546 children)", source: "gajjar-2000", quote: "These data indicate that contamination of CSF with circulating leukemic blast cells during diagnostic lumbar puncture can adversely affect the treatment outcome of children with ALL and is an indication to intensify intrathecal therapy." },
  ],
  sources: [
    { key: "sps-itc-2025", label: "Managing an intrathecal chemotherapy service (published 13 June 2025)", publisher: "NHS Specialist Pharmacy Service", year: 2025, url: "https://www.sps.nhs.uk/articles/managing-an-intrathecal-chemotherapy-service/", gradingScheme: "A summary of the minimum requirements of the English national guidance; not graded. It uses must and should.", read: "full-text", accessed: "2026-11-17" },
    { key: "sps-vinca-2025", label: "Preventing harm from incorrect vinca alkaloid administration (published 13 June 2025)", publisher: "NHS Specialist Pharmacy Service", year: 2025, url: "https://www.sps.nhs.uk/articles/preventing-harm-from-incorrect-vinca-alkaloid-administration/", gradingScheme: "A summary of the minimum requirements of the English national guidance; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "cel-21-2009", label: "CEL 21 (2009): Safe administration of intrathecal cytotoxic chemotherapy (19 June 2009)", publisher: "Scottish Government Health Directorates", year: 2009, url: "https://www.publications.scot.nhs.uk/files/cel2009-21.pdf", gradingScheme: "National guidance; not graded. It uses must and should.", read: "full-text", accessed: "2026-11-17" },
    { key: "cel-22-2009", label: "CEL 22 (2009): Safe administration of vinca alkaloids (19 June 2009)", publisher: "Scottish Government Health Directorates", year: 2009, url: "https://www.publications.scot.nhs.uk/files/cel2009-22.pdf", gradingScheme: "National guidance; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "dl-2025-14", label: "DL(2025)14: Revised guidance for the safe delivery of systemic anti-cancer therapy (26 June 2025)", publisher: "Scottish Government", year: 2025, url: "https://www.publications.scot.nhs.uk/files/dl-2025-14.pdf", gradingScheme: "National guidance; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "ismp-bp-2026", label: "ISMP Targeted Medication Safety Best Practices for Hospitals, 2026-2027", publisher: "Institute for Safe Medication Practices (ECRI)", year: 2026, url: "https://online.ecri.org/hubfs/ISMP/Resources/ISMP_TargetedMedicationSafetyBestPractices_Hospitals.pdf", gradingScheme: "Consensus best practices; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "who-alert-115", label: "Information Exchange System Alert No. 115: Vincristine (and other vinca alkaloids) should only be given intravenously via a minibag (18 July 2007)", publisher: "World Health Organization", year: 2007, url: "https://cdn.who.int/media/docs/default-source/pvg/drug-alerts/da115---alert_115_vincristine.pdf", read: "full-text", accessed: "2026-11-17" },
    { key: "hsc-2008", label: "HSC 2008/001: Updated national guidance on the safe administration of intrathecal chemotherapy (11 August 2008)", publisher: "Department of Health (England)", year: 2008, url: "https://webarchive.nationalarchives.gov.uk/ukgwa/20130104175622/http:/www.dh.gov.uk/en/Publicationsandstatistics/Lettersandcirculars/Healthservicecirculars/DH_086870", read: "not-reachable", accessed: "2026-11-17" },
    { key: "natpsa-2024-002", label: "National Patient Safety Alert NatPSA/2024/002/NHSPS: Transition to NRFit connectors for intrathecal and epidural procedures, and delivery of regional blocks", publisher: "NHS England National Patient Safety Team, with the Association of Anaesthetists, the Royal College of Anaesthetists and the Safe Anaesthesia Liaison Group", year: 2024, url: "https://www.england.nhs.uk/publication/national-patient-safety-alert-transition-to-nrfit-connectors-for-intrathecal-and-epidural-procedures-and-delivery-of-regional-blocks/", read: "not-reachable", accessed: "2026-11-17" },
    { key: "methotrexate-label-2026", label: "Methotrexate Injection, USP: US prescribing information (label effective 27 October 2026)", publisher: "Hospira (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0d63ba29-b692-41b4-87e8-351265c8273f", gradingScheme: "A product label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "cytarabine-label-2026", label: "Cytarabine Injection: US prescribing information (label effective 30 September 2026)", publisher: "Hospira (DailyMed, US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=277597b0-7d85-40a3-a34a-70c6a883fc6d", gradingScheme: "A product label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-platelet-2026", label: "Platelet Transfusion 2025 AABB and ICTMG International Clinical Practice Guidelines (COG endorsement, version date 26 March 2026)", publisher: "Children's Oncology Group", year: 2026, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/07/COG_SC_Platelet_Transfusion_Guideline_Document_26MARCH2026.pdf", gradingScheme: "GRADE, reprinted from the source guideline: strong or conditional recommendation, with high, moderate, low or very low certainty of evidence.", read: "full-text", accessed: "2026-11-17" },
    { key: "metcalf-2025", label: "Platelet Transfusion: 2025 AABB and ICTMG International Clinical Practice Guidelines", publisher: "AABB and the International Collaboration for Transfusion Medicine Guidelines, JAMA", year: 2025, url: "https://doi.org/10.1001/jama.2025.7529", doi: "10.1001/jama.2025.7529", gradingScheme: "GRADE: strong or conditional recommendations; certainty high, moderate, low or very low.", read: "abstract", accessed: "2026-11-17" },
    { key: "nice-ng24", label: "Blood transfusion. NICE guideline NG24 (published 18 November 2015, last updated 26 February 2026)", publisher: "National Institute for Health and Care Excellence", year: 2026, url: "https://www.nice.org.uk/guidance/ng24/chapter/Platelet-transfusion", gradingScheme: "NICE does not grade recommendations; the wording (offer, consider) shows their strength, and each carries the year it was written.", read: "full-text", accessed: "2026-11-17" },
    { key: "rusch-2014", label: "Evidence-based practice recommendations to prevent/manage post-lumbar puncture headaches in pediatric patients receiving intrathecal chemotherapy", publisher: "Journal of Pediatric Oncology Nursing (Rusch et al., a Children's Oncology Group nursing evidence-based practice project)", year: 2014, url: "https://doi.org/10.1177/1043454214532026", doi: "10.1177/1043454214532026", gradingScheme: "GRADE: strong or weak recommendations, with the quality of evidence high, moderate, low or very low; strength was set independently of quality.", read: "full-text", accessed: "2026-11-17" },
    { key: "loeffen-2020", label: "Reducing pain and distress related to needle procedures in children with cancer: a clinical practice guideline", publisher: "European Journal of Cancer (Loeffen et al., international guideline panel)", year: 2020, url: "https://doi.org/10.1016/j.ejca.2020.02.039", doi: "10.1016/j.ejca.2020.02.039", gradingScheme: "GRADE with evidence-to-decision frameworks: strong or weak recommendations.", read: "abstract", accessed: "2026-11-17" },
    { key: "howard-2000", label: "Safety of lumbar puncture for children with acute lymphoblastic leukemia and thrombocytopenia", publisher: "JAMA (Howard et al., St Jude Children's Research Hospital)", year: 2000, url: "https://doi.org/10.1001/jama.284.17.2222", doi: "10.1001/jama.284.17.2222", read: "abstract", accessed: "2026-11-17" },
    { key: "howard-2002", label: "Risk factors for traumatic and bloody lumbar puncture in children with acute lymphoblastic leukemia", publisher: "JAMA (Howard et al., St Jude Children's Research Hospital)", year: 2002, url: "https://doi.org/10.1001/jama.288.16.2001", doi: "10.1001/jama.288.16.2001", read: "abstract", accessed: "2026-11-17" },
    { key: "gajjar-2000", label: "Traumatic lumbar puncture at diagnosis adversely affects outcome in childhood acute lymphoblastic leukemia", publisher: "Blood (Gajjar et al.)", year: 2000, url: "https://doi.org/10.1182/blood.v96.10.3381", doi: "10.1182/blood.v96.10.3381", read: "abstract", accessed: "2026-11-17" },
    { key: "burger-2003", label: "Diagnostic cerebrospinal fluid examination in children with acute lymphoblastic leukemia: significance of low leukocyte counts with blasts or traumatic lumbar puncture", publisher: "Journal of Clinical Oncology (Bürger et al., BFM group)", year: 2003, url: "https://doi.org/10.1200/jco.2003.04.096", doi: "10.1200/jco.2003.04.096", read: "abstract", accessed: "2026-11-17" },
    { key: "teloo-2006", label: "Prognostic significance of blasts in the cerebrospinal fluid without pleiocytosis or a traumatic lumbar puncture in children with acute lymphoblastic leukemia: experience of the Dutch Childhood Oncology Group", publisher: "Journal of Clinical Oncology (te Loo et al.)", year: 2006, url: "https://doi.org/10.1200/jco.2005.03.9727", doi: "10.1200/jco.2005.03.9727", read: "abstract", accessed: "2026-11-17" },
    { key: "rech-2005", label: "The influence of traumatic lumbar puncture and timing of intrathecal therapy on outcome of pediatric acute lymphoblastic leukemia", publisher: "Pediatric Hematology and Oncology (Rech et al.)", year: 2005, url: "https://doi.org/10.1080/08880010591002242", doi: "10.1080/08880010591002242", read: "abstract", accessed: "2026-11-17" },
    { key: "setanen-2025", label: "Risk factors for traumatic lumbar puncture in children with ALL", publisher: "Acta Paediatrica (Setänen et al.)", year: 2025, url: "https://doi.org/10.1111/apa.70195", doi: "10.1111/apa.70195", read: "full-text", accessed: "2026-11-17" },
    { key: "foerster-2015", label: "Lumbar punctures in thrombocytopenic children with cancer", publisher: "Paediatric Anaesthesia (Foerster et al.)", year: 2015, url: "https://doi.org/10.1111/pan.12527", doi: "10.1111/pan.12527", read: "abstract", accessed: "2026-11-17" },
    { key: "cochrane-platelets-lp-2018", label: "Use of platelet transfusions prior to lumbar punctures or epidural anaesthesia for the prevention of complications in people with thrombocytopenia", publisher: "Cochrane Database of Systematic Reviews (Estcourt et al.)", year: 2018, url: "https://doi.org/10.1002/14651858.cd011980.pub3", doi: "10.1002/14651858.cd011980.pub3", read: "abstract", accessed: "2026-11-17" },
    { key: "crock-2014", label: "Headache after lumbar puncture: randomised crossover trial of 22-gauge versus 25-gauge needles", publisher: "Archives of Disease in Childhood (Crock et al.)", year: 2014, url: "https://doi.org/10.1136/archdischild-2013-305145", doi: "10.1136/archdischild-2013-305145", read: "abstract", accessed: "2026-11-17" },
    { key: "ebinger-2004", label: "Strict bed rest following lumbar puncture in children and adolescents is of no benefit", publisher: "Neurology (Ebinger et al.)", year: 2004, url: "https://doi.org/10.1212/01.wnl.0000115387.67958.0f", doi: "10.1212/01.wnl.0000115387.67958.0f", read: "abstract", accessed: "2026-11-17" },
    { key: "blaney-1995", label: "Effect of body position on ventricular CSF methotrexate concentration following intralumbar administration", publisher: "Journal of Clinical Oncology (Blaney et al.)", year: 1995, url: "https://doi.org/10.1200/jco.1995.13.1.177", doi: "10.1200/jco.1995.13.1.177", read: "abstract", accessed: "2026-11-17" },
    { key: "inaba-2026", label: "Traumatic lumbar puncture at diagnosis in children and adolescents with acute lymphoblastic leukemia", publisher: "Leukemia (Inaba et al., St Jude Children's Research Hospital)", year: 2026, url: "https://doi.org/10.1038/s41375-026-03082-2", doi: "10.1038/s41375-026-03082-2", read: "not-reachable", accessed: "2026-11-17" },
    { key: "gosh-it-methotrexate-2020", label: "Medicines information: Intrathecal methotrexate (last review 1 May 2020)", publisher: "Great Ormond Street Hospital for Children NHS Foundation Trust", year: 2020, url: "https://www.gosh.nhs.uk/conditions-and-treatments/medicines-information/medicines-directory/intrathecal-methotrexate/", gradingScheme: "A hospital's information page for families; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "aboutkidshealth-lp-2018", label: "Leukemia and lumbar puncture (last updated 6 March 2018)", publisher: "AboutKidsHealth, The Hospital for Sick Children, Toronto", year: 2018, url: "https://www.aboutkidshealth.ca/leukemia-and-lumbar-puncture", gradingScheme: "A hospital's information page for families; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "nhs-lumbar-puncture-2023", label: "Lumbar puncture (page last reviewed 14 November 2023)", publisher: "NHS", year: 2023, url: "https://www.nhs.uk/tests-and-treatments/lumbar-puncture/", gradingScheme: "NHS information for the public, for adults and children; not graded.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-upgrade-position-after-intrathecal-chemotherapy-in-children-trial"],
  gaps: [
    "No guideline that could be read says how a lumbar puncture for intrathecal chemotherapy should be carried out in a child: position during the puncture, how much spinal fluid to remove against the volume injected, how fast to inject, or what to do after a blood-stained tap. No CCLG, SIOP, C17 or International Pediatric Oncology Guidelines document on these was found; they are set by treatment protocols and unit policies, which were not read.",
    "Doses. On 17 November 2026 the only age-banded intrathecal dose found in a source that could be read was the US label's for methotrexate. US cytarabine labels report past intrathecal use by body surface area and give no age bands, and no label or guideline read gives an intrathecal dose of hydrocortisone. The age bands that treatment protocols use for all three drugs were not read and are not given here; the BNF for Children page on methotrexate refused a script.",
    "Positioning afterwards to spread the drug rests on one experiment in four non-human primates (1995). No study in children was found, and the Children's Oncology Group nursing review did not assess it.",
    "The handling of the first diagnostic puncture in leukaemia (platelet count, operator, sedation, and whether to give the first intrathecal dose at once) rests on retrospective cohorts. A 2026 St Jude letter on traumatic puncture at diagnosis has no abstract and its publisher shows a preview only; it was not read.",
    "The platelet guideline was read as its abstract and as the Children's Oncology Group endorsement, which reprints the recommendation and a one-line justification. Whether the panel considered children with circulating leukaemia cells separately could not be read. The British Society for Haematology guideline on transfusion for fetuses, neonates and older children (2016) needs a subscription and was not read, so its figure for lumbar puncture is not given.",
    "The needle recommendations come from a 2014 review of 24 papers, mostly from the general paediatric population; only two were in children with cancer. The Children's Oncology Group lists its endorsed guideline on pencil-point needles as archived in August 2024, and no replacement was found.",
    "HSC 2008/001, the English national guidance on the safe administration of intrathecal chemotherapy, could not be read on 17 November 2026: the UK Government Web Archive answered a script with a human-verification page and the Internet Archive refused the request. What it says about children having the injection under general anaesthetic is therefore given here only from Scotland's CEL 21 (2009), which was written to follow it. The NHS Specialist Pharmacy Service says the national guidance is being updated.",
    "The NHS England National Patient Safety Alert on neuraxial (NRFit) connectors for intrathecal procedures (NatPSA/2024/002) could not be read: the NHS England site returned an empty response to a script. The NHS Specialist Pharmacy Service states the requirement, and the linked safety protocol carries the step.",
    "UK and United States guidance disagree on how a child's vinca alkaloid is presented (a syringe of 10 mL or more against a minibag), and no comparison in children was read. Wrong-route errors have been reported with vincristine in a 20 mL syringe in an adult.",
    "The symptom to report after the puncture and the route for advice come from the NHS page for the general public, not from a source written for children having chemotherapy; the unit's own contact arrangements come first.",
    "Neurological side effects of intrathecal methotrexate are outside this record.",
  ],
  institutions: [],
  companies: ["childrens-oncology-group"],
  cancers: ["childhood-cancers", "all-leukemia"],
  drugs: [],
  technologies: [],
  terms: ["intrathecal-therapy", "thrombocytopenia"],
  related: ["intrathecal-chemotherapy-and-vinca-alkaloid-safety", "paediatric-procedural-pain-and-sedation", "paediatric-platelet-transfusion-thresholds", "methotrexate", "cytarabine", "vincristine"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "intrathecal", "lumbar-puncture"],
});
