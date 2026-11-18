import { protocol } from "./helpers";

/*
 * Anticipatory nausea and vomiting before chemotherapy: prevention by controlling nausea from the first cycle, and
 * treatment with behavioural therapy and benzodiazepines. Prophylaxis by emetic risk is its own protocol, linked in
 * `related`, as is the children's protocol.
 *
 * First written 11 November 2026. Second accuracy pass, 17 November 2026: every source was read again as raw text
 * (curl, pdftotext, the Europe PMC REST API; copies another checker fetched the same day were re-used where noted) and
 * every quote was checked by script against the saved text.
 * - 2016 updated MASCC/ESMO consensus recommendations on anticipatory nausea and vomiting (Dupuis et al., Support Care
 *   Cancer 2017): abstract only, from Europe PMC. The journal page answered a script with a browser check and MASCC's
 *   2016 slide set returned HTTP 403, so the grades it gives its recommendations are not on the page. No later
 *   MASCC/ESMO statement on the subject was found in Europe PMC; the committee list of the 2023 update (MASCC's slide
 *   set, read in full) has no anticipatory working group, and the 2023 ESMO Open summary (PMC10937211, full text,
 *   copy re-used) does not mention anticipatory nausea.
 * - 2023 MASCC/ESMO antiemetic guideline update (Herrstedt et al., ESMO Open 2024; PMC10937211): full text, for the
 *   suggestion on progressive muscle relaxation.
 * - eviQ (Cancer Institute NSW) "Prevention of anti-cancer therapy induced nausea and vomiting" (ID 7, last reviewed
 *   28 August 2024, review due 31 December 2026): full public page.
 * - Children's Oncology Group summary of the guidelines it endorses (version date 15 January 2024): full PDF text
 *   (copy re-used), for the recommendations and grades of the POGO 2021 anticipatory guideline, whose own full text
 *   (Wiley) answers a script with a browser check; its abstract was read from Europe PMC.
 * - Japan Society of Clinical Oncology antiemesis guideline 2023, English update summary (Int J Clin Oncol 2024;
 *   PMC11196343): full text, new in this pass. It suggests against non-drug treatment, which the first version of this
 *   page had the wrong way round.
 * - The systematic review behind that recommendation (Int J Clin Oncol 2024): abstract.
 * - Randomised trial of nurse-delivered behavioural interventions (Hunter et al., Cancer Med 2020; PMC7050098): full
 *   text.
 * - Scottish Palliative Care Guidelines, "Nausea and vomiting" (Healthcare Improvement Scotland, 2025): full page
 *   (copy re-used).
 * The ASCO antiemetic guideline (2020) and NCCN antiemesis guideline were not read. Every DOI was resolved through
 * Europe PMC or Crossref and its title checked. Quotes are copied from the raw text with nothing changed.
 */
export const anticipatoryNauseaAndVomiting = protocol({
  id: "anticipatory-nausea-and-vomiting",
  name: "Anticipatory nausea and vomiting before chemotherapy: prevention and treatment",
  aka: ["anticipatory nausea", "ANV", "conditioned nausea before chemotherapy", "anticipatory emesis", "feeling sick before chemotherapy"],
  domain: "symptom-management",
  tldr: "Some people feel sick, or are sick, before a chemotherapy session, set off by the hospital or a smell: a learned reaction to sickness in earlier cycles. The best protection is good anti-sickness medicine from the first cycle. If it happens, tell your team: relaxation training or hypnosis may help, and a calming tablet such as lorazepam the night before and again before treatment may be offered.",
  simple: "Some people feel sick before chemo because of bad sickness last time. Good sickness medicine from the start helps stop this. Relaxing exercises and a calming tablet may help.",
  summary: "Anticipatory nausea and vomiting is a conditioned response that typically follows a bad experience of sickness in earlier treatment. MASCC/ESMO (2016, affirming their 2009 recommendations; the 2023 update did not revisit the subject) recommend preventing it by optimal control of acute and delayed chemotherapy-induced nausea and vomiting, and treating it with benzodiazepines and behavioural therapies, in particular progressive muscle relaxation training, systematic desensitisation and hypnosis; their 2016 search found no new trial meeting its criteria. eviQ (reviewed 2024) gives an adult example of lorazepam 0.5 to 1 mg orally the night before and again 1 to 2 hours before treatment. For children, POGO (2021, endorsed by the Children's Oncology Group) makes a strong recommendation to optimise acute and delayed control and conditional recommendations to consider hypnosis, systematic desensitisation or relaxation techniques, and lorazepam, for a child who has already had it; it could make no recommendation on treating an episode. The Japanese guideline (JSCO 2023) differs: benzodiazepines are given, but it suggests against non-drug interventions [strength 2, evidence D], although its own meta-analysis of two studies found that systematic desensitisation reduced anticipatory nausea (risk ratio 0.60) and vomiting (0.54), with most included studies at high or unclear risk of bias. In a randomised trial of 474 people, a 20-minute mindfulness relaxation exercise or relaxing music, taught by oncology nurses, reduced anticipatory nausea at the midpoint of chemotherapy but not at the end; its authors cite earlier studies in which anticipatory nausea and vomiting affected 10% to 30% of people having chemotherapy. The 2023 MASCC/ESMO update suggests progressive muscle relaxation, alone or with guided imagery, as an adjunct for chemotherapy-induced nausea and vomiting generally [II, B].",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "outpatient-clinic", "home"],
  },
  population: "Children and adults receiving chemotherapy. The MASCC/ESMO statement covers both; the POGO guideline covers paediatric oncology patients and haematopoietic stem cell recipients up to 18 years of age. The lorazepam dose given is eviQ's example for adults; no source read gives a dose for children. In the one trial read in full, most participants were women with early breast cancer.",
  trigger: "Before the first cycle (prevention); and whenever a person reports nausea or vomiting starting before a treatment session.",
  steps: [
    {
      action: "Give antiemetic prophylaxis suited to the emetic risk of the regimen from the first cycle, so that acute and delayed sickness are well controlled",
      why: "Anticipatory sickness is a conditioned response to sickness in earlier treatment, so good control from the start is the best protection. MASCC/ESMO say the same, and so does POGO for children.",
      source: "eviq-7",
      quote: "The best management of anticipatory emesis is to ensure good control of acute and delayed emesis, starting from the initial anti-cancer treatment cycle.",
    },
    {
      action: "Recognise anticipatory sickness: nausea or vomiting that comes on before the next treatment, after a bad experience in an earlier cycle",
      why: "It is a learned response to earlier sickness. The trial report read describes it being set off by cues such as the smell of the chemotherapy unit and the sights and sounds of the hospital.",
      source: "eviq-7",
      quote: "Anticipatory emesis: occurring before receiving next treatment of anti-cancer therapy. It is a conditioned response, typically occurring after a previous negative experience with anti-cancer therapy.",
    },
    {
      action: "Offer a behavioural therapy: progressive muscle relaxation training, systematic desensitisation or hypnosis",
      why: "MASCC/ESMO recommend these three by name. The evidence is thin, and the Japanese guideline, grading it very low, suggests against non-drug treatment.",
      source: "mascc-esmo-2016-anv",
      quote: "Benzodiazepines and behavioral therapies, in particular progressive muscle relaxation training, systematic desensitization and hypnosis, continue to be recommended for the treatment of anticipatory nausea and vomiting.",
    },
    {
      action: "Consider a benzodiazepine: eviQ's example for adults is lorazepam 0.5 to 1 mg by mouth the night before and again 1 to 2 hours before treatment",
      why: "MASCC/ESMO recommend benzodiazepines for anticipatory sickness, and the Japanese guideline says they are given. eviQ words it as something that may be useful, and gives this dose as an example.",
      source: "eviq-7",
      quote: "For patients who do develop anticipatory emesis, non-pharmacologic methods such as behavioural/psychological techniques may be useful and/or benzodiazepines e.g. lorazepam 0.5 mg to 1 mg orally on the night before and then repeated the next day 1-2 hours before anti-cancer treatment.",
    },
    {
      action: "For a child who has already had anticipatory sickness, consider hypnosis, systematic desensitisation or relaxation techniques if the child can cooperate, and consider lorazepam",
      why: "POGO found little evidence in children for the behavioural methods, which carry minimal risk, and none for benzodiazepines, so both recommendations are conditional. It makes no recommendation on treating an episode once it has started, and the summary read gives no dose.",
      source: "cog-cinv-2024",
      quote: "2.2 Consider using lorazepam for secondary prevention of anticipatory CINV.",
      grade: "Conditional recommendation, Very low-quality evidence",
    },
    {
      action: "Suggest progressive muscle relaxation, alone or with guided imagery, alongside antiemetics during chemotherapy",
      why: "MASCC/ESMO cite a review of six trials in which relaxation training reduced sickness after chemotherapy, particularly delayed sickness; three of the six trials were rated low quality.",
      source: "mascc-esmo-2023",
      quote: "The adjunctive use of PMRT (alone or with GI) is suggested for the management of CINV [II, B].",
      grade: "[II, B]",
    },
  ],
  bestInClass: {
    statement: "All four bodies read agree on prevention: control acute and delayed sickness well from the first cycle (MASCC/ESMO 2016; eviQ 2024; JSCO 2023; POGO 2021 for children, strong recommendation on moderate-quality evidence). They differ on treatment. MASCC/ESMO 2016, still their latest statement (the 2023 update did not revisit anticipatory nausea), recommend benzodiazepines and behavioural therapy (progressive muscle relaxation training, systematic desensitisation, hypnosis); eviQ agrees and gives an adult lorazepam dose; POGO makes conditional recommendations for the same behavioural methods and for lorazepam in children. JSCO 2023 says benzodiazepines are given but suggests against non-drug interventions [strength 2, evidence D]. The evidence under every treatment recommendation is thin: MASCC/ESMO found no new trial meeting its criteria in 2016, and the Japanese systematic review found six studies, most at high or unclear risk of bias.",
    sources: ["mascc-esmo-2016-anv", "mascc-2023-committees", "eviq-7", "cog-cinv-2024", "jsco-2023-guideline", "jsco-2024-anv"],
  },
  variants: [
    {
      name: "Nurse-taught mindfulness relaxation or relaxing music, started before the first cycle",
      differs: "An oncology nurse teaches a 20-minute mindfulness relaxation exercise, or gives a recording of relaxing music, before the first chemotherapy session; the person uses the recording daily at home and at each session. It is meant to prevent anticipatory sickness, without adding a mental health professional to the team.",
      evidence: "Randomised trial of 474 people (mostly women with early breast cancer): both reduced anticipatory nausea at the midpoint of chemotherapy against standard care (odds ratios 0.44 and 0.40) but not at the end, and did not change anticipatory vomiting or nausea and vomiting after chemotherapy.",
      sources: ["hunter-2020"],
    },
    {
      name: "Japanese guideline (JSCO 2023): benzodiazepines, and a suggestion against non-drug treatment",
      differs: "States that benzodiazepine anxiolytics are given for anticipatory sickness, and suggests not performing non-drug interventions for it, where MASCC/ESMO recommend behavioural therapy by name. It also suggests against non-drug interventions for chemotherapy sickness generally, where MASCC/ESMO 2023 suggest relaxation training as an adjunct.",
      evidence: "Weak recommendation against [strength of recommendation 2, quality of evidence D, agreement 95.8%]. The guideline's own systematic review found six studies. A meta-analysis of the two on systematic desensitisation gave a risk ratio of 0.60 for anticipatory nausea and 0.54 for anticipatory vomiting; hypnotherapy and yoga (two studies each) could not be pooled; most studies were at high or unclear risk of bias, and the review's authors say further research is warranted before use in clinical settings.",
      sources: ["jsco-2023-guideline", "jsco-2024-anv"],
    },
    {
      name: "Sublingual lorazepam for anticipatory or anxiety-related nausea in palliative care (Scotland)",
      differs: "In palliative care, says nausea associated with anticipation or anxiety may respond to a benzodiazepine: first line lorazepam 500 micrograms to 1 mg sublingually (not licensed for that route), second line diazepam 2 to 5 mg orally or midazolam 2 to 5 mg subcutaneously; and pairs antiemetics with assessment and treatment of anxiety.",
      evidence: "National palliative care guideline (2025), based on an evidence review and, where evidence was lacking, expert opinion; not graded for this point.",
      sources: ["scottish-palliative-nv-2025"],
    },
  ],
  grades: [
    { claim: "Anticipatory nausea is best prevented by optimal control of acute and delayed nausea (adults and children)", grade: "MASCC/ESMO consensus recommendation (grade not shown in the abstract read)", source: "mascc-esmo-2016-anv", quote: "The guideline panel continues to recommend that anticipatory nausea and vomiting are best prevented through optimization of acute and delayed phase chemotherapy-induced nausea and vomiting control." },
    { claim: "Children: optimise acute and delayed control to prevent anticipatory sickness", grade: "Strong recommendation, Moderate-quality evidence", source: "cog-cinv-2024", quote: "1.1 Optimize acute and delayed CINV control to minimize the risk of anticipatory CINV" },
    { claim: "Children who have had anticipatory sickness: consider hypnosis, systematic desensitisation or relaxation techniques", grade: "Conditional recommendation, Low-quality evidence", source: "cog-cinv-2024", quote: "2.1: Consider offering cooperative patients one or more of the following nonpharmacological interventions for secondary prevention of anticipatory CINV: hypnosis, systematic desensitization, or relaxation techniques." },
    { claim: "Children who have had anticipatory sickness: consider lorazepam", grade: "Conditional recommendation, Very low-quality evidence", source: "cog-cinv-2024", quote: "2.2 Consider using lorazepam for secondary prevention of anticipatory CINV." },
    { claim: "Japanese guideline: non-drug interventions for anticipatory sickness are not suggested", grade: "Strength of recommendation: 2; Quality of evidence: D", source: "jsco-2023-guideline", quote: "Recommendation: We suggest not to perform non-pharmacological interventions for anticipatory nausea and vomiting." },
    { claim: "Systematic desensitisation reduced anticipatory nausea", grade: "meta-analysis, RR 0.60 (95% CI 0.49 to 0.72)", source: "jsco-2024-anv", quote: "Among them, systematic desensitization significantly improved anticipatory CINV as compared to that in the control group (nausea: risk ratio [RR] = 0.60, 95% confidence interval [CI] = 0.49-0.72, p < 0.00001; vomiting: RR = 0.54, 95% CI = 0.32-0.91, p = 0.02)." },
    { claim: "Progressive muscle relaxation, alone or with guided imagery, as an adjunct for chemotherapy-induced nausea and vomiting", grade: "[II, B]", source: "mascc-esmo-2023", quote: "The adjunctive use of PMRT (alone or with GI) is suggested for the management of CINV [II, B]." },
  ],
  sources: [
    { key: "mascc-esmo-2016-anv", label: "2016 updated MASCC/ESMO consensus recommendations: Anticipatory nausea and vomiting in children and adults receiving chemotherapy", publisher: "MASCC/ESMO, Supportive Care in Cancer", year: 2017, url: "https://europepmc.org/abstract/MED/27510314", doi: "10.1007/s00520-016-3330-z", read: "abstract", accessed: "2026-11-17" },
    { key: "mascc-esmo-2023", label: "2023 MASCC and ESMO guideline update for the prevention of chemotherapy- and radiotherapy-induced nausea and vomiting", publisher: "MASCC/ESMO, ESMO Open", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10937211/", doi: "10.1016/j.esmoop.2023.102195", gradingScheme: "Levels of evidence (I to V) and grades of recommendation (A to E), adapted from the Infectious Diseases Society of America, in square brackets.", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-2023-committees", label: "MASCC/ESMO Antiemetic Guideline 2023: committee slide set", publisher: "MASCC", year: 2025, url: "https://mascc.org/wp-content/uploads/2025/04/Antiemetic-guidelines-2023-slides-v2.pdf", gradingScheme: "Slide summary of the 2023 update; lists the ten committees, none on anticipatory nausea.", read: "full-text", accessed: "2026-11-17" },
    { key: "eviq-7", label: "Prevention of anti-cancer therapy induced nausea and vomiting (AINV) (ID 7)", publisher: "eviQ, Cancer Institute NSW", year: 2024, url: "https://www.eviq.org.au/p/7", gradingScheme: "Evidence-based summary built on ASCO 2020, NCCN 2024 and MASCC/ESMO 2023; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-cinv-2024", label: "COG-endorsed guidelines on chemotherapy-induced nausea and vomiting: classification, acute, delayed, anticipatory, breakthrough and refractory (version date 15 January 2024)", publisher: "Children's Oncology Group", year: 2024, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_CINV_Guidelines_Document_15JAN2024-new-logo.pdf", gradingScheme: "GRADE, reprinted from the POGO guidelines: strong or conditional recommendation, with high, moderate, low or very low quality evidence.", read: "full-text", accessed: "2026-11-17" },
    { key: "pogo-anticipatory-2021", label: "Prevention and treatment of anticipatory chemotherapy-induced nausea and vomiting in pediatric cancer patients and hematopoietic stem cell recipients: clinical practice guideline update", publisher: "Pediatric Oncology Group of Ontario, Pediatric Blood & Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/33686754", doi: "10.1002/pbc.28947", read: "abstract", accessed: "2026-11-17" },
    { key: "jsco-2023-guideline", label: "2023 Japan Society of Clinical Oncology clinical practice guidelines update for antiemesis", publisher: "Japan Society of Clinical Oncology, International Journal of Clinical Oncology", year: 2024, url: "https://europepmc.org/article/PMC/PMC11196343", doi: "10.1007/s10147-024-02535-x", gradingScheme: "Strength of recommendation printed as 1 or 2 (two levels, strong and weak; \"we suggest\" is the weak wording) and quality of evidence A (high) to D (very low), with the panel's agreement rate.", read: "full-text", accessed: "2026-11-17" },
    { key: "jsco-2024-anv", label: "Non-pharmacological treatments for anticipatory nausea and vomiting during chemotherapy: a systematic review and meta-analysis of the Clinical Practice Guidelines for Antiemesis 2023", publisher: "International Journal of Clinical Oncology", year: 2024, url: "https://europepmc.org/abstract/MED/38722486", doi: "10.1007/s10147-024-02536-w", read: "abstract", accessed: "2026-11-17" },
    { key: "hunter-2020", label: "A randomized trial of nurse-administered behavioral interventions to manage anticipatory nausea and vomiting in chemotherapy", publisher: "Cancer Medicine", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7050098/", doi: "10.1002/cam4.2863", read: "full-text", accessed: "2026-11-17" },
    { key: "scottish-palliative-nv-2025", label: "Scottish Palliative Care Guidelines: Nausea and vomiting", publisher: "Healthcare Improvement Scotland (Right Decision Service)", year: 2025, url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/symptoms/non-pain-symptoms/nausea-and-vomiting/", gradingScheme: "Evidence review, with expert opinion where evidence was lacking; references carry methodological quality ratings; recommendations are not individually graded.", read: "full-text", accessed: "2026-11-17" },
  ],
  gaps: [
    "The 2016 MASCC/ESMO statement was read only as an abstract. On 17 November 2026 the journal page answered a script with a browser check and MASCC's 2016 slide set returned HTTP 403, so the grades it gives its recommendations, any doses, and anything it says separately about children are not shown here. No later MASCC/ESMO statement on anticipatory nausea was found in Europe PMC on that date.",
    "The POGO 2021 guideline was read as an abstract and through the Children's Oncology Group summary of its recommendations; the journal answers a script with a browser check. Neither gives a lorazepam dose for children, so none is on this page.",
    "The Japanese systematic review was read as an abstract; how many people its six studies included is not shown here.",
    "The ASCO (2020) and NCCN antiemesis guidelines' sections on anticipatory nausea were not read.",
    "The only figure for how common anticipatory sickness is comes second hand, from the introduction of the 2020 trial report (10% to 30%, citing earlier studies that were not read). The same report says sickness is less of a problem now that antiemetics have improved; no source read measures how common anticipatory sickness is with current prophylaxis.",
    "No trial in the sources read compares a benzodiazepine with a behavioural therapy, or tests either alongside olanzapine and NK1 antagonists.",
    "Advice on drowsiness, driving and falls with lorazepam is not given in the sources read, and should come from the prescriber. eviQ's table for breakthrough sickness marks lorazepam as an unlicensed indication.",
    "eviQ's page was last reviewed on 28 August 2024 and gives 31 December 2026 as its next review date.",
    "How many people are offered behavioural therapy, and who delivers it, has not been measured in any source read.",
  ],
  institutions: ["mascc", "esmo"],
  drugs: ["midazolam"],
  technologies: ["antiemetic-therapy", "relaxation-guided-imagery", "hypnosis-cancer-care"],
  related: ["antiemetic-prophylaxis-by-emetic-risk", "paediatric-chemotherapy-nausea-vomiting-prevention"],
  sections: ["supportive-care"],
  tags: ["protocol", "nausea-and-vomiting", "supportive-care"],
});
