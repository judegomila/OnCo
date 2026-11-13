import { protocol } from "./helpers";

/*
 * Palliative sedation: the deliberate lowering of consciousness to relieve suffering that cannot otherwise be relieved,
 * most often in the last days of life.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Revised EAPC recommended framework on palliative sedation (Surges et al., Palliat Med 2024): full text, Europe PMC
 *   XML (PMC10865771). The 42 statements themselves are printed in Table 4, which is an image in the open copy and
 *   could not be read as text; what the steps quote is the article's own text describing the statements, and the
 *   medication table (Table 5), which is text.
 * - Korean Clinical Practice Guideline for Care in the Last Days of Life (2020): full text, Europe PMC XML.
 * - ESMO Clinical Practice Guidelines for the management of refractory symptoms at the end of life and the use of
 *   palliative sedation (Cherny, Ann Oncol 2014): not reachable (no abstract in Europe PMC, the publisher refused a
 *   script). No step rests on it.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const palliativeSedation = protocol({
  id: "palliative-sedation-for-refractory-suffering",
  name: "Palliative sedation for refractory suffering at the end of life",
  aka: ["terminal sedation", "continuous deep sedation", "proportional sedation", "respite sedation", "sedation for refractory symptoms", "midazolam infusion at the end of life"],
  domain: "palliative",
  tldr: "Very occasionally, near the end of life, suffering cannot be relieved by any other treatment. Palliative sedation uses medicines to make the person sleepy, only as deeply as needed to relieve the suffering. It is decided together with the person and their family, after specialist advice, and checked often.",
  simple: "If someone at the end of life is suffering in a way nothing else can ease, the team may give medicine to make them sleepy so they are comfortable. They use the smallest amount that works, check often, and talk with the person and family first.",
  summary: "The revised EAPC framework (2024; 42 statements, all with high or very high Delphi consensus) defines palliative sedation as the proportionate, monitored lowering of consciousness for refractory suffering, refractory meaning that the professionals can no longer relieve it by other means and the patient finds it intolerable. Suffering includes physical and psychological symptoms and existential suffering. Consultation with palliative care or other experts to confirm refractoriness is strongly recommended before sedation. Proportionality governs both depth (titrate to the lowest dose that relieves suffering, keeping interaction where possible, rather than aiming straight at unconsciousness) and timing (intermittent, transient or respite sedation earlier in the illness; deep continuous sedation generally in the final stages). No life-expectancy threshold is set, and hydration is decided separately. Apart from emergencies, a planned interruption to reassess is recommended. The framework's stepwise drugs: midazolam first (deep sedation bolus 5 to 10 mg SC or 2.5 to 5 mg IV, then about 1 mg/h, titrated; halved with risk factors), lorazepam as an alternative, levomepromazine (or chlorpromazine) added at step 2, and propofol at step 3 under an anaesthetist's supervision. The Korean guideline (2020) grades palliative sedation for severe symptoms unresponsive to available treatments D IIb.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team"],
    where: ["ward", "home", "community"],
  },
  population: "Adults with life-limiting disease, in any setting (EAPC 2024). The framework is written for adults; children are outside this record.",
  trigger: "Suffering judged refractory: the professionals can no longer relieve it by other means after appropriate attempts, and the patient finds it intolerable.",
  steps: [
    {
      action: "Confirm that the suffering is refractory, with advice from palliative care or other experts before starting",
      why: "Sedation is a last resort, and a specialist may find another way to relieve the suffering.",
      source: "eapc-2024",
      quote: "The consultation of palliative care experts and/or other healthcare experts to determine the untreatable nature of the suffering is strongly recommended before applying palliative sedation (stat. 13).",
      grade: "Delphi statement 13 (high or very high consensus)",
    },
    {
      action: "Discuss with the patient, and with their consent those close to them, which form of sedation fits their situation, and record the shared decision",
      why: "The person's own view of what is intolerable is part of deciding that suffering is refractory.",
      source: "eapc-2024",
      quote: "The physician will therefore first discuss with the patient the form of sedation which is appropriate to their individual situation.",
      grade: "Delphi statements 16, 18 and 19 (high or very high consensus)",
    },
    {
      action: "Choose intermittent or transient sedation earlier in the illness, and continuous deep sedation generally only in the final stages of life",
      why: "A temporary rest from suffering can be enough while other treatments start to work, and lets the person wake and talk again.",
      source: "eapc-2024",
      quote: "Secondly, it also encompasses proportionality in terms of timing, as intermittent sedation will be more appropriate than continuous sedation earlier in the course of the illness to provide temporary relief whilst waiting for treatment benefit from other therapeutic approaches (transient sedation) or to give the patient a break from the current burdensome situation (respite sedation) before regaining consciousness (stat. 1).",
      grade: "Delphi statement 1 (high or very high consensus)",
    },
    {
      action: "Titrate the sedative to the lowest dose that relieves the suffering, keeping the person able to interact where possible, rather than aiming straight for unconsciousness",
      why: "Deeper sedation than needed takes away time the person could still be aware of those around them.",
      source: "eapc-2024",
      quote: "First in terms of depth of sedation, with the administration of sedative medications being titrated to the lowest dosage that will provide adequate relief of suffering and maintain interactive function as far as possible, instead of aiming straight at unconsciousness (stats. 1 and 5).",
      grade: "Delphi statements 1 and 5 (high or very high consensus)",
    },
    {
      action: "Start with midazolam, by bolus and then about 1 mg an hour subcutaneously or intravenously, adjusting every 1 to 2 hours to effect; halve the doses where there are risk factors such as age over 60, low weight or severe kidney or liver disease",
      why: "Midazolam acts quickly, wears off quickly and can be given under the skin, so the depth can be adjusted.",
      source: "eapc-2024",
      quote: "Use 1 mg/h (SC and IV) and then adjust as needed.",
      grade: "Delphi statements 27 and 28, Table 5 (high or very high consensus)",
    },
    {
      action: "If midazolam is not enough, add levomepromazine (or chlorpromazine); if that fails, consider propofol under an anaesthetist's supervision",
      why: "Some people need a second drug of a different kind to settle; propofol is powerful and needs expert supervision.",
      source: "eapc-2024",
      quote: "Administration under the supervision of an anaesthesiologist is advisable.",
      grade: "Delphi statements 27 and 28, Table 5 (high or very high consensus)",
    },
    {
      action: "Decide on fluids separately from the decision to sedate",
      why: "Whether to give fluids is its own decision, based on the person's wishes and condition, not something that follows automatically from sedation.",
      source: "eapc-2024",
      quote: "No specific period of remaining life expectancy has been defined for the use of palliative sedation based on the three key principles of (1) refractoriness of suffering, (2) proportionality, which has been explicitly introduced in the definition of palliative sedation and (3) independent decision-making for hydration.",
      grade: "Delphi statements 1 and 35 (high or very high consensus)",
    },
    {
      action: "Outside emergencies, plan an interruption of sedation to reassess with the patient",
      why: "Things change; waking the person lets the team check whether sedation is still needed and still what they want.",
      source: "eapc-2024",
      quote: "Apart from emergency situations at the end of life, a planned interruption of the sedation is recommended, whenever possible, to reassess the situation with the patient.",
      grade: "Not a numbered statement in the text read",
    },
    {
      action: "Monitor comfort and depth of sedation with a validated tool, such as the Richmond Agitation Sedation Scale palliative version",
      why: "Regular, structured checks show whether the person is comfortable and whether the dose needs to change.",
      source: "eapc-2024",
      quote: "These 42 statements with their explanatory text are organised into 12 distinct domains ( Table 4 ) and include a table of medications ( Table 5 ) and four assessment tools for monitoring",
      grade: "Framework content",
    },
  ],
  bestInClass: {
    statement: "The revised EAPC framework (2024) is the most recent international standard: confirm refractoriness with expert consultation, decide with the patient, apply proportionality in depth and timing, start with midazolam and escalate stepwise, decide hydration separately, reassess through planned interruptions, and monitor with validated tools. It sets no life-expectancy threshold, unlike several earlier national guidelines. The Korean guideline (2020) agrees but grades the evidence low (D IIb). The ESMO 2014 guideline could not be read.",
    sources: ["eapc-2024", "korea-2020"],
  },
  variants: [
    {
      name: "A life-expectancy threshold for continuous deep sedation",
      differs: "Allows continuous deep sedation only when death is expected within a set period, such as hours to days or up to two weeks.",
      evidence: "The EAPC 2024 framework notes that life expectancy is handled very differently across guidelines and deliberately sets no period; its Delphi panel could not agree a definition of the final stages of life. The national guidelines it compared were not read here.",
      sources: ["eapc-2024"],
    },
    {
      name: "Mandatory specialist palliative care consultation",
      differs: "Requires a palliative care specialist to agree before any palliative sedation starts.",
      evidence: "Some EAPC experts called for it and others rejected it because access to specialist palliative care is uneven; the framework strongly recommends consultation with palliative care and/or other experts rather than making it mandatory.",
      sources: ["eapc-2024"],
    },
  ],
  grades: [
    { claim: "Palliative sedation may be considered for severe symptoms that do not improve with available treatments in the dying process", grade: "D IIb", source: "korea-2020", quote: "For severe symptoms that do not improve with available treatments in patients in the dying process, palliative sedation may be considered." },
    { claim: "All 42 EAPC statements reached high or very high consensus after two Delphi rounds", grade: "32 high, 10 very high consensus", source: "eapc-2024", quote: "Following the second Delphi round, 32 statements reached a high and 10 a very high level of consensus ( Table 3 )." },
    { claim: "Evidence base for palliative sedation", grade: "Lack of clinical trials and prospective studies (as stated by the authors)", source: "eapc-2024", quote: "The updated literature shows that there is still a lack of clinical trials and prospective studies." },
  ],
  sources: [
    {
      key: "eapc-2024",
      label: "Revised European Association for Palliative Care (EAPC) recommended framework on palliative sedation: an international Delphi study",
      publisher: "Palliative Medicine (EAPC)",
      year: 2024,
      url: "https://doi.org/10.1177/02692163231220225",
      doi: "10.1177/02692163231220225",
      gradingScheme: "Delphi consensus: low (<60% agreement), moderate (60 to 79%), high (80 to 89%), very high (>90%). Statements are not graded for evidence.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "korea-2020",
      label: "Clinical Practice Guideline for Care in the Last Days of Life",
      publisher: "Korean Journal of Hospice and Palliative Care",
      year: 2020,
      url: "https://doi.org/10.14475/kjhpc.2020.23.3.103",
      doi: "10.14475/kjhpc.2020.23.3.103",
      gradingScheme: "Evidence level (A to D) and recommendation class (I, IIa, IIb), printed in that order.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "esmo-2014",
      label: "ESMO Clinical Practice Guidelines for the management of refractory symptoms at the end of life and the use of palliative sedation",
      publisher: "ESMO (Annals of Oncology)",
      year: 2014,
      url: "https://doi.org/10.1093/annonc/mdu238",
      doi: "10.1093/annonc/mdu238",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["midazolam", "levomepromazine", "propofol"],
  technologies: ["syringe-drivers", "palliative-care"],
  terms: ["palliative-sedation", "last-days-of-life-care"],
  related: ["care-in-the-last-days-of-life"],
  upgrades: [],
  gaps: [
    "The 42 EAPC statements are printed in an image table in the open copy and could not be read as text; the steps rest on the article's own description of them and on its medication table.",
    "The ESMO 2014 guideline on refractory symptoms and palliative sedation could not be read.",
    "The evidence behind palliative sedation is consensus: the EAPC authors note a continuing lack of clinical trials and prospective studies.",
    "National law and practice differ, for example on the role of the legal representative; the framework says it may need local adaptation.",
  ],
});
