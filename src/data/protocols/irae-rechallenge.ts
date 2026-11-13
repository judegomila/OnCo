import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESE_2022, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Restarting a checkpoint inhibitor after an immune-related adverse event (rechallenge).
 *
 * What was read, and how: SITC 2021 (full text: general recommendations and the organ sections' rechallenge
 * statements) and ESE 2022 (full text, R 1.1), as described in ./irae-sources.ts; the WHO VigiBase rechallenge cohort
 * (JAMA Oncology 2020; abstract from Europe PMC); the ADQI 2026 consensus on ICI-associated kidney injury (abstract,
 * NCBI efetch). ASCO 2021 abstract only; ESMO 2022 not reachable. DOIs resolved through Europe PMC. Quotes checked by
 * script against the raw text on 11 November 2026.
 */
export const iraeRechallenge = protocol({
  id: "irae-rechallenge",
  name: "Restarting a checkpoint inhibitor after an immune-related side effect",
  aka: ["immunotherapy rechallenge", "ICI rechallenge", "checkpoint inhibitor retreatment after irAE", "resuming immunotherapy after toxicity", "re-challenge after immune-related adverse event"],
  domain: "immunotherapy-toxicity",
  tldr: "After an immunotherapy side effect has settled, your team may offer to restart the same treatment. About 3 in 10 people who restart have the same side effect again, and some side effects (such as heart or nerve inflammation, or very severe reactions) usually mean stopping for good. It is a shared decision that weighs the cancer benefit against the risk.",
  simple: "After a side effect from immunotherapy has settled, it may be possible to restart. Your team will talk through the benefits and risks with you.",
  summary: "Rechallenge is considered once the toxicity has resolved to grade 1 or less and the patient needs no more than 10 mg prednisone a day (SITC 2021). SITC: after grade 2 irAEs, rechallenge may proceed once resolved or controlled on 10 mg/day or less (LE: 3); after grade 3 to 4, the decision is risk-adjusted (LE: 3). Factors against: severe or life-threatening irAEs, prolonged or multiple immunosuppressants, long prior treatment, and complete response or prolonged benefit. ASCO 2021 (abstract): consider resuming most grade 2 toxicities when grade 1 or less; permanently discontinue after grade 4, except endocrinopathies controlled by hormone replacement. ESE 2022: a controlled endocrinopathy is no contraindication (++00).\n\nOrgan rules in SITC: colitis needs a repeat endoscopy before resuming; pneumonitis after grade 2 only after complete resolution (LE: 4); myocarditis, Guillain-Barré syndrome and grade 3 to 4 myasthenia gravis lead to permanent or seriously considered permanent discontinuation. ADQI 2026 supports cautious rechallenge after kidney injury (recurrence under 20%).\n\nEvidence: a WHO pharmacovigilance cohort found the same irAE recurred in 28.8% of informative rechallenges, more often after colitis, hepatitis and pneumonitis and less often after adrenal events; two small SITC-cited series found 26 to 43% recurrence and 13 to 26% new irAEs.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "patient-or-carer", "multidisciplinary-team", "nurse"],
    where: ["outpatient-clinic"],
  },
  population: "Adults whose checkpoint inhibitor was paused for an immune-related adverse event that has since improved. Children are not addressed by these sources.",
  trigger: "An immune-related adverse event has improved to grade 1 or less and the patient's steroid dose is down to about 10 mg prednisone a day or less.",
  steps: [
    {
      action: "Consider restarting once the side effect is grade 1 or less and the steroid dose is 10 mg prednisone a day or less",
      why: "Restarting while the inflammation is still active or on high-dose steroids risks a flare.",
      source: "sitc-2021",
      quote: "Once the toxicity has sufficiently resolved (generally to grade 1 symptoms or lower with ≤10 mg prednisone equivalents per day), patients may be re-challenged.",
    },
    {
      action: "After a grade 2 side effect, restart if it has resolved or is controlled on 10 mg prednisone a day or less",
      why: "Most moderate side effects can be managed if they return.",
      source: "sitc-2021",
      quote: "Unless otherwise specified, patients who have experienced grade 2 irAEs may be re-challenged with ICI therapy if their signs and symptoms have resolved or are controlled with ≤10 mg of prednisone (or equivalent) per day",
      grade: "LE: 3",
    },
    {
      action: "After a grade 3 or 4 side effect, decide case by case, weighing the expected cancer benefit against the risk",
      why: "Severe side effects are more likely to return, but restarting may still be worthwhile for some.",
      source: "sitc-2021",
      quote: "The decision to re-challenge a patient who has experienced grade 3 or 4 irAEs should be risk-adjusted based on anticipated benefit with therapy versus the potential for toxicity",
      grade: "LE: 3",
    },
    {
      action: "Weigh the factors against restarting: a severe or life-threatening side effect, long or multiple immunosuppressants, long prior treatment, and a complete or lasting response",
      why: "Someone whose cancer has already responded well may gain little from restarting and risk a lot.",
      source: "sitc-2021",
      quote: "Factors that may cause clinicians to lean away from re-challenge include severe or life-threatening irAEs, requirement for prolonged or multiple immunosuppressants, and a history of long-term ICI therapy and/or patients with complete responses or prolonged clinical benefit.",
    },
    {
      action: "Continue or restart treatment when an endocrine side effect is controlled with hormone replacement",
      why: "A hormone shortage that is replaced does not get worse with more immunotherapy.",
      source: "ese-2022",
      quote: "We recommend that a controlled endocrinopathy is not a contraindication for initiation and/or continuation of ICI therapy",
      grade: "++00",
    },
    {
      action: "After colitis, repeat the endoscopy before restarting",
      why: "Bowel inflammation can persist without symptoms and is one of the side effects most likely to return.",
      source: "sitc-2021",
      quote: "Repeat endoscopy should be performed prior to resuming ICI therapy.",
    },
    {
      action: "After grade 2 pneumonitis, restart only once symptoms have completely resolved, with more frequent reviews",
      why: "Lung inflammation can recur and is among the commonest to come back.",
      source: "sitc-2021",
      quote: "If patients have experienced grade 2 pneumonitis, they may be re-challenged with ICIs upon complete resolution of symptoms. These patients should be monitored through more frequent consultations with their physician",
      grade: "LE: 4",
    },
    {
      action: "Do not restart after Guillain-Barré syndrome, and seriously consider never restarting after myocarditis",
      why: "These side effects can be fatal if they return.",
      source: "sitc-2021",
      quote: "Patients diagnosed with Guillain-Barré syndrome should always permanently discontinue ICI therapy, and should receive IVIG or PLEX with corticosteroid therapy",
      grade: "LE: 1",
    },
    {
      action: "Tell the patient that about 3 in 10 people have the same side effect again, more often after colitis, hepatitis or pneumonitis",
      why: "Knowing the size of the risk helps the patient decide and spot a recurrence early.",
      source: "vigibase-2020",
      quote: "This cohort study found a 28.8% recurrence rate of the same irAE associated with the discontinuation of ICI therapy after a rechallenge with the same ICI.",
    },
    {
      action: "After restarting, monitor closely for the side effect returning and treat it as before",
      why: "A recurrence caught early is easier to treat.",
      source: "sitc-2021",
      quote: "Close monitoring for recurrence of diarrhea or colitis symptoms is recommended after re-challenging patients with ICI therapy.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 (full text) gives the clearest rule: rechallenge after grade 2 once resolved or controlled on 10 mg prednisone a day or less (LE: 3), a risk-adjusted decision after grade 3 to 4 (LE: 3), and organ-specific exceptions. ASCO 2021 (abstract) is stricter at the top: permanent discontinuation after grade 4 in general, with controlled endocrinopathies the exception. ESE 2022 grades continuing through a controlled endocrinopathy ++00. ADQI 2026 supports cautious rechallenge after kidney injury. All rest on retrospective series and pharmacovigilance data; there are no randomised trials of rechallenge. ESMO 2022 could not be read.",
    sources: ["sitc-2021", "asco-2021", "ese-2022", "adqi-2026", "vigibase-2020", "esmo-2022"],
  },
  variants: [
    {
      name: "Permanent discontinuation after grade 4 (ASCO 2021)",
      differs: "Recommends permanent discontinuation after grade 4 toxicities in general, except endocrinopathies controlled by hormone replacement, where SITC leaves grade 3 to 4 as a risk-adjusted decision.",
      evidence: "Informal consensus of an expert panel after a systematic review; read as abstract only.",
      sources: ["asco-2021"],
    },
    {
      name: "Cautious rechallenge after kidney injury (ADQI 2026)",
      differs: "A nephrology consensus that supports rechallenge in selected patients after ICI-associated kidney injury, citing recurrence in fewer than 20%.",
      evidence: "Modified Delphi consensus; read as abstract only.",
      sources: ["adqi-2026"],
    },
  ],
  grades: [
    { claim: "Rechallenge after grade 2 once resolved or controlled on 10 mg prednisone a day or less", grade: "LE: 3", source: "sitc-2021" },
    { claim: "Risk-adjusted rechallenge after grade 3 or 4", grade: "LE: 3", source: "sitc-2021" },
    { claim: "Permanent discontinuation after grade 4, except controlled endocrinopathies", grade: "expert consensus", source: "asco-2021", quote: "In general, permanent discontinuation of ICPis is recommended with grade 4 toxicities, except for endocrinopathies that have been controlled by hormone replacement." },
    { claim: "A controlled endocrinopathy is no contraindication to continuing", grade: "++00", source: "ese-2022" },
    { claim: "Recurrence of the same irAE after rechallenge", grade: "observational (pharmacovigilance cohort)", source: "vigibase-2020", quote: "One hundred thirty recurrences (28.8%; 95% CI, 24.8-33.1) of the initial irAE were observed." },
  ],
  sources: [
    SITC_ICI_2021,
    ASCO_ICI_2021,
    ESE_2022,
    {
      key: "vigibase-2020",
      label: "Immune Checkpoint Inhibitor Rechallenge After Immune-Related Adverse Events in Patients With Cancer",
      publisher: "JAMA Oncology",
      year: 2020,
      url: "https://europepmc.org/abstract/MED/32297899",
      doi: "10.1001/jamaoncol.2020.0726",
      gradingScheme: "An observational pharmacovigilance cohort study (WHO VigiBase); not a guideline.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "adqi-2026",
      label: "Immune Checkpoint Inhibitor-Associated Acute Kidney Injury: A Report from the 34th Acute Disease Quality Initiative (ADQI) Consensus Conference",
      publisher: "Acute Disease Quality Initiative, Journal of the American Society of Nephrology",
      year: 2026,
      url: "https://europepmc.org/article/PMC/PMC13641466",
      doi: "10.1681/ASN.0000001232",
      gradingScheme: "Consensus statements reached by a modified Delphi method; the abstract does not give grades.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ASCO 2021 guideline was read only as its abstract; its organ-by-organ resumption criteria are not compared here.",
    "No randomised trial of rechallenge versus permanent discontinuation exists among the sources read; recurrence figures come from pharmacovigilance and small retrospective series, which may over- or under-count.",
    "Whether switching to a different checkpoint inhibitor (for example from a combination to a PD-1 inhibitor alone) lowers the risk is not addressed by the sources read here.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["rechallenge", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-colitis", "irae-pneumonitis", "irae-hepatitis", "irae-myocarditis", "irae-neurological", "irae-nephritis", "io-rechallenge-caution-rcc"],
  tags: ["protocol", "irae"],
});
