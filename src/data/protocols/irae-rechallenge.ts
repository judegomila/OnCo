import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESE_2022, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Restarting a checkpoint inhibitor after an immune-related adverse event (rechallenge).
 *
 * What was read, and how: SITC 2021 (full text: general recommendations and the organ sections' rechallenge
 * statements) and ESE 2022 (full text, R 1.1), as described in ./irae-sources.ts; the WHO VigiBase rechallenge cohort
 * (JAMA Oncology 2020; abstract from Europe PMC); the ADQI 2026 consensus on ICI-associated kidney injury. ASCO 2021
 * abstract only; ESMO 2022 not reachable. DOIs resolved through Europe PMC. Quotes checked by script against the raw
 * text on 11 November 2026.
 *
 * Second accuracy pass, 17 November 2026. Every claim was re-read against raw text and every quote re-checked by
 * script. Re-used from sibling checkers' folders, fetched on 16 and 17 November 2026: the SITC 2021 full text (Europe
 * PMC full-text XML, tags and citation numbers stripped), the ESE 2022 full text (Europe PMC full-text XML), the ASCO
 * 2021 abstract (Europe PMC core record) and the ADQI 2026 report, which now reads in full as text from its PubMed
 * Central page (its Figure 3 on rechallenge is an image; only the caption was read). Fetched here: the VigiBase
 * cohort's abstract and Crossref record. Its full text did not read: Europe PMC's full-text endpoint returned 500
 * twice, PubMed Central answered with a browser check, the publisher's PDF returned 403 and the Internet Archive 429.
 * Changed: "may" and "consider" statements that had been written as orders; the Guillain-Barré grade (LE: 1) no
 * longer sits on a step that also covered myocarditis, which SITC does not grade; the colitis monitoring sentence no
 * longer stands for all organs; reasons no source gives were replaced with what the sources say; recurrence figures
 * now carry their denominators; the gap that said no source touched on switching drug class was corrected.
 */
export const iraeRechallenge = protocol({
  id: "irae-rechallenge",
  name: "Restarting a checkpoint inhibitor after an immune-related side effect",
  aka: ["immunotherapy rechallenge", "ICI rechallenge", "checkpoint inhibitor retreatment after irAE", "resuming immunotherapy after toxicity", "re-challenge after immune-related adverse event"],
  domain: "immunotherapy-toxicity",
  tldr: "After an immunotherapy side effect has settled, your team may offer to restart treatment. In one large database study, about 3 in 10 restarts were followed by the same side effect again. After Guillain-Barré syndrome or severe myasthenia gravis, guidelines say to stop for good, and after heart inflammation to seriously consider it. The decision weighs the cancer benefit against the risk.",
  simple: "After a side effect from immunotherapy has settled, it may be possible to restart. The decision weighs the benefit to the cancer against the risk of the side effect coming back.",
  summary: "SITC 2021: once the toxicity has resolved, generally to grade 1 or lower on 10 mg or less of prednisone equivalents a day, patients may be re-challenged. After grade 2 irAEs, rechallenge may proceed once resolved or controlled on 10 mg/day or less (LE: 3); after grade 3 to 4, the decision is risk-adjusted (LE: 3). Factors that may lean against: severe or life-threatening irAEs, prolonged or multiple immunosuppressants, long-term prior treatment, and complete response or prolonged benefit. ASCO 2021 (abstract): consider resuming after most grade 2 toxicities when symptoms revert to grade 1 or less; in general, permanently discontinue after grade 4, except endocrinopathies controlled by hormone replacement. ESE 2022: a controlled endocrinopathy is no contraindication (++00).\n\nOrgan rules in SITC: after grade 3 or higher colitis, rechallenge is possible once symptoms are stable (grade 1 or less, or baseline) on less than 10 mg/day (LE: 4), with a repeat endoscopy before resuming; after grade 2 pneumonitis, upon complete resolution of symptoms (LE: 4); after grade 3 myositis, hold until grade 1 or less while off immunosuppression. Permanent discontinuation: Guillain-Barré syndrome always (LE: 1), grade 3 to 4 myasthenia gravis, and myositis with any myocardial involvement; after myocarditis it should be seriously considered. ADQI 2026: rechallenge may be considered after treated kidney injury (recurrence under 20%).\n\nEvidence: in WHO VigiBase reports the same irAE recurred in 130 of 452 informative rechallenges (28.8%), more often after colitis, hepatitis and pneumonitis and less often after adrenal events. SITC cites two small series: 40 patients (43% recurrence, 13% new irAEs) and 38 patients with lung cancer (26% and 26%).",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "patient-or-carer", "multidisciplinary-team", "nurse"],
    where: ["outpatient-clinic"],
  },
  population: "People whose checkpoint inhibitor was paused for an immune-related adverse event that has since improved. None of the sources read makes a recommendation for children.",
  trigger: "An immune-related adverse event has improved, generally to grade 1 or less, and the patient's steroid dose is down to 10 mg prednisone a day or less.",
  steps: [
    {
      action: "Consider restarting once the side effect has resolved, generally to grade 1 or less on 10 mg prednisone a day or less",
      why: "SITC gives this as the usual point at which restarting may be tried. It says 'generally', so it is a guide and not a fixed rule.",
      source: "sitc-2021",
      quote: "Once the toxicity has sufficiently resolved (generally to grade 1 symptoms or lower with ≤10 mg prednisone equivalents per day), patients may be re-challenged.",
    },
    {
      action: "After a grade 2 side effect, consider restarting if it has resolved or is controlled on 10 mg prednisone a day or less",
      why: "SITC allows this unless its section on the organ concerned says otherwise.",
      source: "sitc-2021",
      quote: "Unless otherwise specified, patients who have experienced grade 2 irAEs may be re-challenged with ICI therapy if their signs and symptoms have resolved or are controlled with ≤10 mg of prednisone (or equivalent) per day",
      grade: "LE: 3",
    },
    {
      action: "After a grade 3 or 4 side effect, decide case by case, weighing the expected cancer benefit against the risk",
      why: "In the two small series SITC cites, the side effect came back more often after a grade 3 or higher event, though the difference was not statistically significant.",
      source: "sitc-2021",
      quote: "The decision to re-challenge a patient who has experienced grade 3 or 4 irAEs should be risk-adjusted based on anticipated benefit with therapy versus the potential for toxicity",
      grade: "LE: 3",
    },
    {
      action: "Weigh the factors against restarting: a severe or life-threatening side effect, a need for prolonged or multiple immunosuppressants, long-term prior treatment, and a complete response or prolonged benefit",
      why: "SITC lists these as things that may make clinicians lean away from restarting. It does not say any of them rules restarting out.",
      source: "sitc-2021",
      quote: "Factors that may cause clinicians to lean away from re-challenge include severe or life-threatening irAEs, requirement for prolonged or multiple immunosuppressants, and a history of long-term ICI therapy and/or patients with complete responses or prolonged clinical benefit.",
    },
    {
      action: "Do not treat an endocrine side effect that is controlled as a reason against continuing or restarting",
      why: "The European Society of Endocrinology says the cancer benefit of treatment outweighs the risk from these hormone problems in almost all instances.",
      source: "ese-2022",
      quote: "We recommend that a controlled endocrinopathy is not a contraindication for initiation and/or continuation of ICI therapy",
      grade: "++00",
    },
    {
      action: "After colitis, repeat the endoscopy before restarting",
      why: "SITC says this in its advice on grade 3 or higher colitis, where it allows restarting once symptoms are stable at grade 1 or less, or baseline, on less than 10 mg prednisone a day (LE: 4).",
      source: "sitc-2021",
      quote: "Repeat endoscopy should be performed prior to resuming ICI therapy.",
    },
    {
      action: "After grade 2 pneumonitis, consider restarting once symptoms have completely resolved, and review the patient more often",
      why: "SITC's statement covers grade 2 only. In the small series it cites, pneumonitis came back in 25% of 12 patients who restarted after complete resolution.",
      source: "sitc-2021",
      quote: "If patients have experienced grade 2 pneumonitis, they may be re-challenged with ICIs upon complete resolution of symptoms. These patients should be monitored through more frequent consultations with their physician",
      grade: "LE: 4",
    },
    {
      action: "Stop the checkpoint inhibitor permanently after Guillain-Barré syndrome",
      why: "SITC says neurological side effects can be fatal or leave lasting impairment.",
      source: "sitc-2021",
      quote: "Patients diagnosed with Guillain-Barré syndrome should always permanently discontinue ICI therapy, and should receive IVIG or PLEX with corticosteroid therapy",
      grade: "LE: 1",
    },
    {
      action: "Stop the checkpoint inhibitor permanently after grade 3 or 4 myasthenia gravis",
      why: "SITC reports a fatality rate of 20% among people who develop myasthenia gravis on these drugs. It prints no level of evidence for this sentence.",
      source: "sitc-2021",
      quote: "ICIs should be permanently discontinued, and frequent pulmonary function assessments and daily neurological review should be performed.",
    },
    {
      action: "After myocarditis, seriously consider stopping the checkpoint inhibitor permanently",
      why: "SITC describes a high mortality rate when heart side effects develop. It prints no level of evidence for this sentence.",
      source: "sitc-2021",
      quote: "Permanent discontinuation of ICI therapy should be seriously considered.",
    },
    {
      action: "Weigh the chance of the same side effect returning: 28.8% (130 of 452 informative rechallenges) in WHO VigiBase reports, higher after colitis, hepatitis or pneumonitis",
      why: "The figure comes from case reports sent to a safety database, so it is an estimate. Adrenal side effects came back less often than others.",
      source: "vigibase-2020",
      quote: "This cohort study found a 28.8% recurrence rate of the same irAE associated with the discontinuation of ICI therapy after a rechallenge with the same ICI.",
    },
    {
      action: "After restarting, monitor for the side effect returning and treat it by the standard algorithms",
      why: "SITC recommends close monitoring for recurrence after restarting following colitis, and more frequent consultations after grade 2 pneumonitis. No source read sets a schedule.",
      source: "vigibase-2020",
      quote: "Resuming ICI therapy could be considered for select patients, with appropriate monitoring and use of standard treatment algorithms to identify and treat toxic effects.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 (full text) gives the clearest rule: rechallenge may follow grade 2 once resolved or controlled on 10 mg prednisone a day or less (LE: 3), a risk-adjusted decision after grade 3 to 4 (LE: 3), and organ-specific exceptions. ASCO 2021 (abstract) is stricter at the top: in general, permanent discontinuation after grade 4, with controlled endocrinopathies the exception. ESE 2022 grades its statement that a controlled endocrinopathy is no contraindication ++00. ADQI 2026 says rechallenge may be considered after treated kidney injury (certainty of evidence: Low). The SITC statements carry LE: 3 or LE: 4, and the recurrence figures read here come from retrospective series and a pharmacovigilance database; none of the passages read cites a randomised trial of rechallenge. ESMO 2022 could not be read.",
    sources: ["sitc-2021", "asco-2021", "ese-2022", "adqi-2026", "vigibase-2020", "esmo-2022"],
  },
  variants: [
    {
      name: "Permanent discontinuation after grade 4 (ASCO 2021)",
      differs: "Recommends, in general, permanent discontinuation after grade 4 toxicities, except endocrinopathies controlled by hormone replacement, where SITC leaves grade 3 to 4 as a risk-adjusted decision.",
      evidence: "Expert consensus (a systematic review and an informal consensus process); read as abstract only.",
      sources: ["asco-2021"],
    },
    {
      name: "Rechallenge after kidney injury (ADQI 2026)",
      differs: "A multidisciplinary consensus on kidney injury alone. Its statement 13 says rechallenge may be considered once the injury has been treated, after weighing the risk of recurrence and of other immune-related adverse events against the benefit of treating progressive cancer. Its text says rechallenge should be strongly considered, the risk of recurrence having been under 20% in the largest study to evaluate it. SITC's kidney section says only that treatment can be restarted if stage 1 kidney injury resolves.",
      evidence: "ADQI consensus statement 13: strength of consensus 100%; certainty of evidence: Low. Full text read.",
      sources: ["adqi-2026", "sitc-2021"],
    },
  ],
  grades: [
    { claim: "Rechallenge after grade 2 once resolved or controlled on 10 mg prednisone a day or less", grade: "LE: 3", source: "sitc-2021" },
    { claim: "Risk-adjusted rechallenge after grade 3 or 4", grade: "LE: 3", source: "sitc-2021" },
    { claim: "Rechallenge after grade 3 or higher diarrhoea or colitis once symptoms are stable on less than 10 mg prednisone a day", grade: "LE: 4", source: "sitc-2021", quote: "These patients may be re-challenged with ICIs if their symptoms are stable (grade ≤1 or baseline) with <10 mg/day of prednisone (or equivalent)" },
    { claim: "In general, permanent discontinuation after grade 4, except controlled endocrinopathies", grade: "expert consensus", source: "asco-2021", quote: "In general, permanent discontinuation of ICPis is recommended with grade 4 toxicities, except for endocrinopathies that have been controlled by hormone replacement." },
    { claim: "A controlled endocrinopathy is no contraindication to continuing", grade: "++00", source: "ese-2022" },
    { claim: "Rechallenge may be considered after treated kidney injury (statement 13)", grade: "Strength of consensus 100%; certainty of evidence: Low", source: "adqi-2026", quote: "Once ICI-AKI has been treated, ICI rechallenge may be considered, as the risk of recurrent ICI-AKI is <20%." },
    { claim: "Recurrence of the same irAE after rechallenge", grade: "observational (pharmacovigilance cohort)", source: "vigibase-2020", quote: "One hundred thirty recurrences (28.8%; 95% CI, 24.8-33.1) of the initial irAE were observed." },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-17" },
    { ...ASCO_ICI_2021, accessed: "2026-11-17" },
    { ...ESE_2022, accessed: "2026-11-17" },
    {
      key: "vigibase-2020",
      label: "Immune Checkpoint Inhibitor Rechallenge After Immune-Related Adverse Events in Patients With Cancer",
      publisher: "JAMA Oncology",
      year: 2020,
      url: "https://europepmc.org/abstract/MED/32297899",
      doi: "10.1001/jamaoncol.2020.0726",
      gradingScheme: "An observational pharmacovigilance cohort study (WHO VigiBase); not a guideline.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "adqi-2026",
      label: "Immune Checkpoint Inhibitor-Associated Acute Kidney Injury: A Report from the 34th Acute Disease Quality Initiative (ADQI) Consensus Conference",
      publisher: "Acute Disease Quality Initiative, Journal of the American Society of Nephrology",
      year: 2026,
      url: "https://europepmc.org/article/PMC/PMC13641466",
      doi: "10.1681/ASN.0000001232",
      gradingScheme: "Consensus statements reached by a modified Delphi method, with consensus defined as agreement by more than 85% of delegates. Table 5 prints for each statement the strength of consensus (percentage agreement) and the panel's certainty of evidence (high, moderate, low or very low). No formal GRADE assessment was performed.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ASCO 2021 guideline was read only as its abstract; its organ-by-organ resumption criteria are not compared here.",
    "No randomised trial of rechallenge versus permanent discontinuation is cited in the passages read; recurrence figures come from pharmacovigilance and small retrospective series, which may over- or under-count.",
    "On 17 November 2026 the VigiBase cohort could be read only as its abstract: Europe PMC's full-text endpoint returned an error, PubMed Central answered with a browser check, the publisher's PDF refused a script and the Internet Archive refused the request. The abstract names recurrence by regimen (PD-1 or PD-L1 alone, CTLA-4 alone, or the combination) and the rate of a different irAE after rechallenge as secondary outcomes but gives no result for either, so neither is stated here.",
    "No source read recommends switching to a different checkpoint inhibitor or class to lower the risk of recurrence. SITC reports one retrospective study of colitis in which rechallenge with an anti-CTLA-4 drug was among the risk factors for recurrence, and it says switching to another checkpoint inhibitor may be considered after an infusion reaction.",
    "No source read sets a schedule of visits or tests after restarting. SITC asks for close monitoring after colitis and more frequent consultations after grade 2 pneumonitis; the VigiBase authors speak of appropriate monitoring.",
    "SITC's general steroid threshold (10 mg or less) and its colitis threshold (less than 10 mg) are worded differently, and for grade 3 myositis it asks for grade 1 or less while off immunosuppression. SITC prints no rechallenge statement for hepatitis or for grade 3 or higher pneumonitis beyond its general rule.",
    "The ADQI 2026 figure on weighing rechallenge after kidney injury (Figure 3) is an image; only its caption was read.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["rechallenge", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-colitis", "irae-pneumonitis", "irae-hepatitis", "irae-myocarditis", "irae-neurological", "irae-nephritis", "io-rechallenge-caution-rcc"],
  tags: ["protocol", "irae"],
});
