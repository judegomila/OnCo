import { protocol } from "./helpers";

/*
 * Intrathecal chemotherapy in children: what is particular to the lumbar puncture and the injection in a child, as
 * opposed to an adult. Two existing records hold the rest and are linked, not repeated: the safety register, room,
 * labelling and double check (intrathecal-chemotherapy-and-vinca-alkaloid-safety) and the sedation itself
 * (paediatric-procedural-pain-and-sedation). Platelet thresholds in general are in
 * paediatric-platelet-transfusion-thresholds.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - HSC 2008/001, Updated national guidance on the safe administration of intrathecal chemotherapy (Department of
 *   Health, England, August 2008): not reachable from an official host. dh.gov.uk is retired, a GOV.UK search for the
 *   title returned nothing, and the UK Government Web Archive answered plain curl with HTTP 405. Its paragraphs on
 *   children (the order of intrathecal and intravenous drugs under general anaesthetic, the extra check in theatre,
 *   batch dispensing in high-volume paediatric services) are therefore not given here; nothing rests on it.
 * - NHS England National Patient Safety Alert NatPSA/2024/002/NHSPS, Transition to NRFit connectors (31 January 2024):
 *   not reachable. england.nhs.uk answered a script with an empty HTTP 202. Named in sources; nothing rests on it.
 * - Children's Oncology Group endorsement (version date 26 March 2026) of the 2025 AABB and ICTMG platelet transfusion
 *   guidelines: public PDF, full text. Metcalf et al., JAMA 2025: abstract only. The platelet counts carry a
 *   superscript that flattens in the raw text, so no quote carries a count; the counts are stated in the prose.
 * - Rusch et al., Evidence-based practice recommendations to prevent/manage post-lumbar puncture headaches in
 *   pediatric patients receiving intrathecal chemotherapy (J Pediatr Oncol Nurs 2014; a Children's Oncology Group
 *   nursing project using GRADE): full text of the author manuscript, PubMed Central XML through NCBI E-utilities
 *   (PMC5685494). The earlier fill round found that the Children's Oncology Group archived its needle guideline in
 *   August 2024; this published review is cited as the review it is, and no newer one was found.
 * - Abstracts, Europe PMC: Howard 2000 and Howard 2002 (JAMA), Gajjar 2000 (Blood), Bürger 2003 and te Loo 2006 (J Clin
 *   Oncol), Rech 2005, Foerster 2015, Crock 2014, Ebinger 2004, Blaney 1995, the Cochrane review CD011980.pub3 (2018)
 *   and Loeffen 2020. Setänen et al., Acta Paediatr 2025: full text, Europe PMC XML (PMC12420885).
 * - Inaba et al., Leukemia 2026 (traumatic lumbar puncture at diagnosis, St Jude): the Europe PMC record has no
 *   abstract and the journal was not read. Named in sources as not reachable; nothing rests on it.
 * - As variants only: Great Ormond Street Hospital medicines information page on intrathecal methotrexate (last
 *   review 1 May 2020) and the AboutKidsHealth page of The Hospital for Sick Children, Toronto (last updated 6 March
 *   2018), both full text.
 * - Not found: any CCLG, SIOP, C17 or International Pediatric Oncology Guidelines document on how to carry out a
 *   lumbar puncture for intrathecal chemotherapy, on positioning afterwards, or on the timing of the first puncture.
 *
 * Nothing here rests on an Internet Archive copy. Because the two safety documents could not be read from an official
 * host, this record does not cover how vinca alkaloids are kept apart from intrathecal drugs in children; the linked
 * safety record does, for all ages.
 *
 * No source here is industry funded so far as its text states. Every DOI came from a Europe PMC record whose title
 * was checked. Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const paediatricIntrathecalChemotherapy = protocol({
  id: "paediatric-intrathecal-chemotherapy",
  name: "Intrathecal chemotherapy in children: the lumbar puncture, platelets, needles and care afterwards",
  aka: ["lumbar puncture with chemotherapy in children", "IT methotrexate in children", "spinal chemotherapy for childhood leukaemia", "LP and intrathecals", "intrathecal chemotherapy under general anaesthetic", "traumatic lumbar puncture", "post-lumbar puncture headache in children"],
  domain: "paediatric",
  tldr: "Children with leukaemia and some other cancers have chemotherapy injected into the fluid around the spine, through a needle in the lower back, many times during treatment. It is often done asleep. A platelet transfusion is given first only if the count is very low, and a fine needle is used to make a headache afterwards less likely.",
  simple: "Some chemotherapy has to go into the fluid around the spine. Your child will usually be asleep for it. Trained staff check the medicine more than once. Afterwards a few children get a headache that is worse sitting up and better lying down. Tell the team if that happens.",
  summary: "This record covers what is particular to children; the register, the dedicated room, labelling and the two-person check are in the intrathecal safety protocol, and the sedation in the paediatric procedural sedation protocol. Each child's treatment protocol and unit policy come first.\n\nSafety. The English national guidance on intrathecal chemotherapy (HSC 2008/001) and the 2024 NHS England alert on neuraxial connectors could not be read from an official host for this record, so what they say about children, including how the checks work when a child is anaesthetised, is not given here. The linked safety protocol describes the safeguards that keep vincristine and related drugs away from the spinal injection.\n\nPlatelets. The 2025 AABB and ICTMG guideline, endorsed by the Children's Oncology Group in 2026, recommends transfusion before lumbar puncture below 20 × 10³/μL (strong, moderate certainty). In 5,223 lumbar punctures in 958 children with leukaemia, including 199 at counts of 20 × 10⁹/L or less, no serious complication was seen (Howard 2000). The first, diagnostic puncture in leukaemia is handled with more caution in some centres, because leukaemia cells in a blood-stained first sample have been linked to worse outcome in cohort studies (variants).\n\nNeedle and headache. The Children's Oncology Group nursing review (Rusch 2014, GRADE) gives strong recommendations on moderate evidence for smaller needles and for pencil-point needles when clinically applicable, a weak one for a bevel parallel to the spine, a weak one against extended bed rest, a weak one against caffeine, extra fluids and several painkillers for an established headache, and a weak one for an epidural blood patch, with caution in leukaemia. A crossover trial in 93 children with leukaemia found little difference in headache between 22 and 25 gauge needles.\n\nPositioning afterwards. Lying flat, prone or head-down for up to an hour to spread the drug is institutional practice resting on an experiment in four monkeys; the nursing review found insufficient evidence on short bed rest and did not assess positioning for drug distribution.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "anaesthetist", "pharmacist"],
    where: ["theatre", "ward", "chemotherapy-day-unit", "outpatient-clinic"],
  },
  population: "Children and young people having chemotherapy by lumbar puncture into the spinal fluid, most often methotrexate, cytarabine or hydrocortisone for acute lymphoblastic leukaemia, and also for other leukaemias and lymphomas. The platelet and needle recommendations are international or from the United States. Drugs given through a ventricular reservoir, and intrathecal drugs other than chemotherapy, are not covered. The dose, the schedule and the timing of the first puncture are set by the child's treatment protocol, and that protocol and the unit's own policy come first.",
  trigger: "A child's treatment protocol calls for a lumbar puncture with intrathecal chemotherapy.",
  steps: [
    {
      action: "Check the platelet count beforehand and give platelets first only if it is below 20 × 10³/μL, unless the child's protocol sets another figure for that puncture",
      why: "Bleeding around the spine after a lumbar puncture has turned out to be extremely rare even with low platelets, so a lower threshold spares children transfusions they do not need.",
      source: "metcalf-2025",
      quote: "Exceedingly low incidence of spinal hematoma was identified in patients with thrombocytopenia undergoing lumbar puncture.",
      grade: "Strong recommendation, moderate certainty",
    },
    {
      action: "Choose the smallest needle that suits the child's size, the drug to be given and the operator's experience",
      why: "A finer needle leaves a smaller hole in the lining around the spinal fluid, so less fluid leaks and a headache is less likely.",
      source: "rusch-2014",
      quote: "There is a strong recommendation, based on an overall moderate quality of evidence, for the use of smaller size (higher gauge) spinal needles for performing lumbar punctures in pediatric patients to prevent PLPHs, when clinically applicable.",
      grade: "Strong recommendation, moderate quality of evidence",
    },
    {
      action: "Use a pencil-point needle where clinically applicable, and consider one for any child who has had a headache after an earlier puncture",
      why: "A pencil-point tip parts the fibres of the lining instead of cutting them, which is thought to leave a hole that closes more readily.",
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
      why: "In the trials, hours of bed rest did not prevent headache, and in one, children kept in bed for a day had more headaches than those allowed up.",
      source: "rusch-2014",
      quote: "There is a weak recommendation, based on an overall low quality of evidence, against the use of extended bed rest following lumbar puncture to prevent PLPH.",
      grade: "Weak recommendation, low quality of evidence",
    },
    {
      action: "Tell the family what a post-puncture headache is like, a headache within five days that comes on when upright and eases lying down, and ask them to report it",
      why: "It can be mistaken for a side effect of the chemotherapy or missed in a small child who just will not sit up. Once recognised it can be treated.",
      source: "rusch-2014",
      quote: "By definition, a PLPH is a headache that develops within five days of a lumbar puncture, worsens within 15 minutes of assuming the upright position and improves within 15 minutes of resuming a recumbent position",
    },
    {
      action: "For a headache that persists, consider an epidural blood patch only after weighing remission status, infection and bleeding risk",
      why: "A blood patch seals the leak with the child's own blood. In a child whose leukaemia is not in remission that blood could, in theory, carry leukaemia cells towards the spinal fluid.",
      source: "rusch-2014",
      quote: "There is a weak recommendation, based on an overall very low quality of evidence, for the use of epidural blood patch in managing PLPHs in pediatric patients.",
      grade: "Weak recommendation, very low quality of evidence",
    },
  ],
  bestInClass: {
    statement: "For the safety of the injection, see the intrathecal safety protocol; the paediatric provisions of the English national guidance could not be read for this record. For platelets, the 2025 AABB and ICTMG recommendation endorsed by the Children's Oncology Group: transfuse before lumbar puncture below 20 × 10³/μL (strong, moderate certainty). NICE NG24 takes a different position, shown with its own text in the platelet protocol. For the needle and for headache, the Children's Oncology Group nursing review of 2014: smaller and pencil-point needles (strong, moderate), no extended bed rest (weak, low). On needles the evidence in children with cancer is thinner than the grade suggests: the review found only one study of needle size and one of needle design in children having intrathecal chemotherapy and neither showed a significant difference, and a later crossover trial in 93 children with leukaemia found little difference between 22 and 25 gauge. For sedation, the international guideline's strong recommendation to offer deep sedation or general anaesthesia for every lumbar puncture, in the sedation protocol. No guideline that could be read covers positioning after the injection or the conduct of the first diagnostic puncture; both are shown as variants.",
    sources: ["cog-platelet-2026", "metcalf-2025", "rusch-2014", "crock-2014", "loeffen-2020"],
  },
  variants: [
    {
      name: "Lying prone, flat or head-down for up to an hour to spread the drug",
      differs: "Keeps the child in a set position after the injection so that the drug moves up towards the brain. Great Ormond Street Hospital's information for families says: \"It is recommended children lay on their tummy for at least one hour after an intrathecal procedure as this may help distribution of the methotrexate through the CSF.\" The Children's Oncology Group nursing review records the same practice: \"It is the practice at some institutions for patients to lay flat or in Trendelenburg position for a defined period of time to theoretically facilitate the distribution of intrathecal chemotherapy throughout the CNS.\"",
      evidence: "One experiment in four rhesus monkeys (Blaney 1995): after methotrexate into the lumbar spinal fluid, the mean peak level in ventricular fluid was 0.12 micromoles per litre when the animal sat upright at once and 2.81 when it lay prone for an hour first. No study in children was found. The nursing review states that evaluating positioning for drug distribution was outside its scope.",
      sources: ["gosh-it-methotrexate-2020", "rusch-2014", "blaney-1995"],
    },
    {
      name: "Lying down for about an hour to prevent headache",
      differs: "Gives headache prevention as the reason for the hour lying down. The Hospital for Sick Children's page for families says: \"Children lie down for approximately 1 hour after the procedure to prevent a headache.\"",
      evidence: "The trials read do not support bed rest for this purpose. In a randomised trial of 111 patients aged 2 to 17 having a diagnostic lumbar puncture (Ebinger 2004), 24 hours of bed rest was followed by more headache than free mobility (positional headache 15 against 2 per cent, any headache 39 against 21 per cent). The nursing review recommends against extended bed rest (weak, low) and says there is insufficient evidence to make a recommendation on shorter periods such as 60 minutes.",
      sources: ["aboutkidshealth-lp-2018", "ebinger-2004", "rusch-2014"],
    },
    {
      name: "A higher platelet count and the most experienced operator for the first puncture in leukaemia",
      differs: "Handles the diagnostic lumbar puncture in a child with newly diagnosed leukaemia differently from later ones, acting on the modifiable risk factors for a blood-stained sample that a St Jude cohort identified: a platelet count of 100 × 10³/μL or less, a less experienced practitioner, and the conditions of an earlier era, before a dedicated procedure area and general anaesthesia. In the Swedish centre whose series was read, first diagnostic punctures were done only by physicians, while supervised students did later ones.",
      evidence: "Cohort studies, not trials. In 5,609 lumbar punctures in 956 children at one centre (Howard 2002), 29% were traumatic (at least 10 red cells per microlitre); the odds were higher with a platelet count under 100 × 10³/μL (odds ratio 1.5), with the least against the most experienced practitioners (1.4), in infants (2.3) and when the previous puncture was a day before (10.8). In 546 children at the same centre (Gajjar 2000), leukaemia cells in a blood-stained first sample were linked to lower event-free survival, with a hazard ratio of 2.39 after two such samples. In the BFM-95 trial (2,021 children) five-year event-free survival was 73% after a traumatic puncture with blasts against 80% with a clear sample, and in a Dutch cohort of 526 it was 58% against 72.6%. A Swedish series of 130 first punctures found 13.1% traumatic and no effect of the risk factors it tested. The 2025 platelet guideline's threshold of 20 is for lumbar puncture in general; whether its panel considered the first puncture in leukaemia separately could not be read.",
      sources: ["howard-2002", "gajjar-2000", "burger-2003", "teloo-2006", "setanen-2025", "metcalf-2025"],
    },
    {
      name: "Intrathecal chemotherapy given at the first diagnostic puncture",
      differs: "Injects the first intrathecal dose at the diagnostic lumbar puncture, instead of taking a diagnostic sample alone and returning for a second puncture a day or two later.",
      evidence: "In a retrospective study of 77 children (Rech 2005), of 19 who had a traumatic first puncture and delayed intrathecal therapy, 6 had an isolated relapse in the central nervous system and 2 a combined relapse, against 1 relapse among 9 who had a traumatic puncture and early therapy (p = 0.20); its authors asked for prospective randomised confirmation. The 2002 cohort found that a puncture one day after the previous one was much more likely to be traumatic.",
      sources: ["rech-2005", "howard-2002"],
    },
    {
      name: "No routine platelet transfusion above 10 before lumbar puncture",
      differs: "Proceeds without platelets at counts between 10 and 20 × 10⁹/L.",
      evidence: "The St Jude series (Howard 2000) saw no serious complication in 5,223 punctures, 170 of them at counts of 11 to 20 and 29 at 10 or less, and concluded that prophylactic transfusion is not necessary above 10. A Brazilian series of 9,088 punctures in 440 children (Foerster 2015) included 92 at counts under 20,000 per cubic millimetre and observed no complication. The Cochrane review (2018) found no trial comparing thresholds. The 2025 guideline sets 20 as a practical figure.",
      sources: ["howard-2000", "foerster-2015", "cochrane-platelets-lp-2018", "metcalf-2025"],
    },
  ],
  grades: [
    { claim: "Platelet transfusion before lumbar puncture when the count is below 20 × 10³/μL", grade: "Strong / Moderate", source: "cog-platelet-2026", quote: "The “Platelet Transfusion 2025 AABB and ICTMG International Clinical Practice Guidelines” were endorsed by the COG Supportive Care Guidelines sub-Committee in February 2026." },
    { claim: "Serious complications of lumbar puncture in children with leukaemia, by platelet count", grade: "Retrospective cohort (958 children, 5,223 punctures)", source: "howard-2000", quote: "No serious complications were encountered, regardless of the platelet count." },
    { claim: "Trials comparing platelet thresholds before lumbar puncture", grade: "Cochrane review: none found", source: "cochrane-platelets-lp-2018", quote: "No studies compared different platelet count thresholds prior to a procedure." },
    { claim: "Smaller (higher gauge) spinal needles", grade: "Strong recommendation, moderate quality of evidence", source: "rusch-2014" },
    { claim: "Pencil-point needles", grade: "Strong recommendation, moderate quality of evidence", source: "rusch-2014" },
    { claim: "22 against 25 gauge needles in children with leukaemia", grade: "Randomised crossover trial (93 children, 341 procedures)", source: "crock-2014", quote: "There was little difference in the occurrence of post-LP headache or any headache between procedures carried out using the 22-gauge or 25-gauge needles." },
    { claim: "Bevel parallel to the long axis of the spine", grade: "Weak recommendation, low quality of evidence", source: "rusch-2014" },
    { claim: "Against extended bed rest to prevent headache", grade: "Weak recommendation, low quality of evidence", source: "rusch-2014" },
    { claim: "Shorter bed rest (60 minutes) straight after the puncture", grade: "Insufficient evidence to make a recommendation", source: "rusch-2014", quote: "There is therefore insufficient evidence to make a recommendation regarding shorter periods of bed rest (60 min) immediately following a lumbar puncture." },
    { claim: "Against caffeine, oral and intravenous hydration, frovatriptan, ibuprofen and tramadol to shorten an established headache", grade: "Weak recommendation, very low quality of evidence", source: "rusch-2014", quote: "There is a weak recommendation, based on an overall very low quality of evidence, against the use of caffeine, oral and intravenous hydration, frovatripan, ibuprofen, and tramadol to reduce the duration of PLPHs." },
    { claim: "Epidural blood patch for an established headache", grade: "Weak recommendation, very low quality of evidence", source: "rusch-2014" },
    { claim: "Deep sedation or general anaesthesia offered to all children having a lumbar puncture", grade: "Strong recommendation", source: "loeffen-2020", quote: "Strong recommendations were made for the use of topical anesthetics in all needle procedures, for offering deep sedation (DS)/general anesthesia (GA) to all children undergoing lumbar puncture" },
    { claim: "Prone position for an hour after intralumbar methotrexate raises ventricular drug levels", grade: "Experiment in four non-human primates", source: "blaney-1995", quote: "Maintaining a prone position for 1 hour after an intralumbar dose increased the peak methotrexate concentration and drug exposure in ventricular CSF." },
    { claim: "Traumatic lumbar puncture at diagnosis and outcome in childhood acute lymphoblastic leukaemia", grade: "Retrospective cohort (546 children)", source: "gajjar-2000", quote: "These data indicate that contamination of CSF with circulating leukemic blast cells during diagnostic lumbar puncture can adversely affect the treatment outcome of children with ALL and is an indication to intensify intrathecal therapy." },
  ],
  sources: [
    { key: "hsc-2008", label: "HSC 2008/001: Updated national guidance on the safe administration of intrathecal chemotherapy", publisher: "Department of Health (England)", year: 2008, url: "http://www.dh.gov.uk/en/Publicationsandstatistics/Lettersandcirculars/Healthservicecirculars/DH_086870", read: "not-reachable", accessed: "2026-11-16" },
    { key: "natpsa-2024-002", label: "National Patient Safety Alert NatPSA/2024/002/NHSPS: Transition to NRFit connectors for intrathecal and epidural procedures, and delivery of regional blocks", publisher: "NHS England National Patient Safety Team, with the Association of Anaesthetists, the Royal College of Anaesthetists and the Safe Anaesthesia Liaison Group", year: 2024, url: "https://www.england.nhs.uk/publication/national-patient-safety-alert-transition-to-nrfit-connectors-for-intrathecal-and-epidural-procedures-and-delivery-of-regional-blocks/", read: "not-reachable", accessed: "2026-11-16" },
    { key: "cog-platelet-2026", label: "Platelet Transfusion 2025 AABB and ICTMG International Clinical Practice Guidelines (COG endorsement, version date 26 March 2026)", publisher: "Children's Oncology Group", year: 2026, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/07/COG_SC_Platelet_Transfusion_Guideline_Document_26MARCH2026.pdf", gradingScheme: "GRADE, reprinted from the source guideline: strong or conditional recommendation, with high, moderate, low or very low certainty of evidence.", read: "full-text", accessed: "2026-11-16" },
    { key: "metcalf-2025", label: "Platelet Transfusion: 2025 AABB and ICTMG International Clinical Practice Guidelines", publisher: "AABB and the International Collaboration for Transfusion Medicine Guidelines, JAMA", year: 2025, url: "https://doi.org/10.1001/jama.2025.7529", doi: "10.1001/jama.2025.7529", gradingScheme: "GRADE: strong or conditional recommendations; certainty high, moderate, low or very low.", read: "abstract", accessed: "2026-11-16" },
    { key: "rusch-2014", label: "Evidence-based practice recommendations to prevent/manage post-lumbar puncture headaches in pediatric patients receiving intrathecal chemotherapy", publisher: "Journal of Pediatric Oncology Nursing (Rusch et al., a Children's Oncology Group nursing evidence-based practice project)", year: 2014, url: "https://doi.org/10.1177/1043454214532026", doi: "10.1177/1043454214532026", gradingScheme: "GRADE: strong or weak recommendations, with the quality of evidence high, moderate, low or very low; strength was set independently of quality.", read: "full-text", accessed: "2026-11-16" },
    { key: "loeffen-2020", label: "Reducing pain and distress related to needle procedures in children with cancer: a clinical practice guideline", publisher: "European Journal of Cancer (Loeffen et al., international guideline panel)", year: 2020, url: "https://doi.org/10.1016/j.ejca.2020.02.039", doi: "10.1016/j.ejca.2020.02.039", gradingScheme: "GRADE with evidence-to-decision frameworks: strong or weak recommendations.", read: "abstract", accessed: "2026-11-16" },
    { key: "howard-2000", label: "Safety of lumbar puncture for children with acute lymphoblastic leukemia and thrombocytopenia", publisher: "JAMA (Howard et al., St Jude Children's Research Hospital)", year: 2000, url: "https://doi.org/10.1001/jama.284.17.2222", doi: "10.1001/jama.284.17.2222", read: "abstract", accessed: "2026-11-16" },
    { key: "howard-2002", label: "Risk factors for traumatic and bloody lumbar puncture in children with acute lymphoblastic leukemia", publisher: "JAMA (Howard et al., St Jude Children's Research Hospital)", year: 2002, url: "https://doi.org/10.1001/jama.288.16.2001", doi: "10.1001/jama.288.16.2001", read: "abstract", accessed: "2026-11-16" },
    { key: "gajjar-2000", label: "Traumatic lumbar puncture at diagnosis adversely affects outcome in childhood acute lymphoblastic leukemia", publisher: "Blood (Gajjar et al.)", year: 2000, url: "https://doi.org/10.1182/blood.v96.10.3381", doi: "10.1182/blood.v96.10.3381", read: "abstract", accessed: "2026-11-16" },
    { key: "burger-2003", label: "Diagnostic cerebrospinal fluid examination in children with acute lymphoblastic leukemia: significance of low leukocyte counts with blasts or traumatic lumbar puncture", publisher: "Journal of Clinical Oncology (Bürger et al., BFM group)", year: 2003, url: "https://doi.org/10.1200/jco.2003.04.096", doi: "10.1200/jco.2003.04.096", read: "abstract", accessed: "2026-11-16" },
    { key: "teloo-2006", label: "Prognostic significance of blasts in the cerebrospinal fluid without pleiocytosis or a traumatic lumbar puncture in children with acute lymphoblastic leukemia: experience of the Dutch Childhood Oncology Group", publisher: "Journal of Clinical Oncology (te Loo et al.)", year: 2006, url: "https://doi.org/10.1200/jco.2005.03.9727", doi: "10.1200/jco.2005.03.9727", read: "abstract", accessed: "2026-11-16" },
    { key: "rech-2005", label: "The influence of traumatic lumbar puncture and timing of intrathecal therapy on outcome of pediatric acute lymphoblastic leukemia", publisher: "Pediatric Hematology and Oncology (Rech et al.)", year: 2005, url: "https://doi.org/10.1080/08880010591002242", doi: "10.1080/08880010591002242", read: "abstract", accessed: "2026-11-16" },
    { key: "setanen-2025", label: "Risk factors for traumatic lumbar puncture in children with ALL", publisher: "Acta Paediatrica (Setänen et al.)", year: 2025, url: "https://doi.org/10.1111/apa.70195", doi: "10.1111/apa.70195", read: "full-text", accessed: "2026-11-16" },
    { key: "foerster-2015", label: "Lumbar punctures in thrombocytopenic children with cancer", publisher: "Paediatric Anaesthesia (Foerster et al.)", year: 2015, url: "https://doi.org/10.1111/pan.12527", doi: "10.1111/pan.12527", read: "abstract", accessed: "2026-11-16" },
    { key: "cochrane-platelets-lp-2018", label: "Use of platelet transfusions prior to lumbar punctures or epidural anaesthesia for the prevention of complications in people with thrombocytopenia", publisher: "Cochrane Database of Systematic Reviews (Estcourt et al.)", year: 2018, url: "https://doi.org/10.1002/14651858.cd011980.pub3", doi: "10.1002/14651858.cd011980.pub3", read: "abstract", accessed: "2026-11-16" },
    { key: "crock-2014", label: "Headache after lumbar puncture: randomised crossover trial of 22-gauge versus 25-gauge needles", publisher: "Archives of Disease in Childhood (Crock et al.)", year: 2014, url: "https://doi.org/10.1136/archdischild-2013-305145", doi: "10.1136/archdischild-2013-305145", read: "abstract", accessed: "2026-11-16" },
    { key: "ebinger-2004", label: "Strict bed rest following lumbar puncture in children and adolescents is of no benefit", publisher: "Neurology (Ebinger et al.)", year: 2004, url: "https://doi.org/10.1212/01.wnl.0000115387.67958.0f", doi: "10.1212/01.wnl.0000115387.67958.0f", read: "abstract", accessed: "2026-11-16" },
    { key: "blaney-1995", label: "Effect of body position on ventricular CSF methotrexate concentration following intralumbar administration", publisher: "Journal of Clinical Oncology (Blaney et al.)", year: 1995, url: "https://doi.org/10.1200/jco.1995.13.1.177", doi: "10.1200/jco.1995.13.1.177", read: "abstract", accessed: "2026-11-16" },
    { key: "inaba-2026", label: "Traumatic lumbar puncture at diagnosis in children and adolescents with acute lymphoblastic leukemia", publisher: "Leukemia (Inaba et al., St Jude Children's Research Hospital)", year: 2026, url: "https://doi.org/10.1038/s41375-026-03082-2", doi: "10.1038/s41375-026-03082-2", read: "not-reachable", accessed: "2026-11-16" },
    { key: "gosh-it-methotrexate-2020", label: "Medicines information: Intrathecal methotrexate (last review 1 May 2020)", publisher: "Great Ormond Street Hospital for Children NHS Foundation Trust", year: 2020, url: "https://www.gosh.nhs.uk/conditions-and-treatments/medicines-information/medicines-directory/intrathecal-methotrexate/", gradingScheme: "A hospital's information page for families; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "aboutkidshealth-lp-2018", label: "Leukemia and lumbar puncture (last updated 6 March 2018)", publisher: "AboutKidsHealth, The Hospital for Sick Children, Toronto", year: 2018, url: "https://www.aboutkidshealth.ca/leukemia-and-lumbar-puncture", gradingScheme: "A hospital's information page for families; not graded.", read: "full-text", accessed: "2026-11-16" },
  ],
  upgrades: ["idea-upgrade-position-after-intrathecal-chemotherapy-in-children-trial"],
  gaps: [
    "No guideline that could be read says how a lumbar puncture for intrathecal chemotherapy should be carried out in a child: position during the puncture, how much spinal fluid to remove, how fast to inject, or what to do after a blood-stained tap. No CCLG, SIOP, C17 or International Pediatric Oncology Guidelines document on these was found; they are set by treatment protocols and unit policies, which were not read.",
    "Positioning afterwards to spread the drug rests on one experiment in four monkeys (1995). No study in children was found, and the Children's Oncology Group nursing review did not assess it.",
    "The handling of the first diagnostic puncture in leukaemia (platelet count, operator, sedation, and whether to give the first intrathecal dose at once) rests on retrospective cohorts from the 1980s to 2000s. A 2026 St Jude report on traumatic puncture at diagnosis has no abstract in Europe PMC and was not read.",
    "The platelet guideline was read as its abstract and as the Children's Oncology Group endorsement, which reprints the recommendation and a one-line justification. Whether the panel considered children with circulating leukaemia cells separately could not be read.",
    "The needle recommendations come from a 2014 review of 24 papers, most from general paediatrics and anaesthesia; only two were in children with cancer. The Children's Oncology Group archived its needle guideline in August 2024 according to the earlier fill round, and no replacement was found.",
    "HSC 2008/001, the English national guidance on the safe administration of intrathecal chemotherapy, could not be read from an official host: the Department of Health site is retired, a GOV.UK search found nothing, and the UK Government Web Archive refused a script. What it says about children having the injection under general anaesthetic is therefore not given here.",
    "The NHS England National Patient Safety Alert on neuraxial (NRFit) connectors for intrathecal procedures (NatPSA/2024/002) could not be read: the NHS England site returned an empty response to a script. No step on connectors is given.",
    "How vincristine and other vinca alkaloids are kept apart from intrathecal drugs in a children's unit is not covered by any source read for this record; the linked safety protocol covers it for all ages.",
    "Doses of intrathecal drugs, which in children are set by age, were not read from any source and are not given here.",
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
