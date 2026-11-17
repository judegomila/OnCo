import { protocol } from "./helpers";

/*
 * Chronic pain in people who have finished cancer treatment or are living with cancer long term: screening, ruling out
 * recurrence, non-drug and non-opioid treatment first, integrative therapies with evidence, and careful use of
 * opioids.
 *
 * What was read, and how. First read on 11 November 2026; re-read claim by claim on 17 November 2026 in a second
 * accuracy pass, every source fetched raw and read as text, every quote checked by script:
 * - ASCO guideline on chronic pain in survivors of adult cancers (Paice et al., J Clin Oncol 2016): abstract only, from
 *   Europe PMC; ascopubs.org refuses a script and Europe PMC lists no open copy. No later ASCO guideline on chronic pain
 *   in survivors is in Europe PMC.
 * - SIO-ASCO guideline on integrative medicine for pain management in oncology (Mao et al., J Clin Oncol 2022):
 *   abstract only, from Europe PMC. No newer edition found.
 * - ASCO guideline on use of opioids for adults with pain from cancer or cancer treatment (Paice et al., J Clin Oncol
 *   2023): abstract only, the Europe PMC record a sibling checker saved the same day. No newer edition found.
 * - Japan Society of Pain Clinicians consensus statement on chronic pain treatment in cancer survivors (J Anesth
 *   2025;39(2):161-181, online 4 December 2024): full text XML from Europe PMC (PMC11937162), with its graded
 *   statements. Its correction (10.1007/s00540-024-03441-2) was read too: it only corrects the society's name.
 * - ESMO Clinical Practice Guidelines on cancer pain in adults (Fallon et al., Ann Oncol 2018): not reachable (no
 *   abstract in Europe PMC; the publisher answered 403 to a sibling checker on 17 November and was not asked again).
 *   Europe PMC shows no newer ESMO cancer pain guideline.
 * - The update of the Australian cancer pain guideline (PMC13569014) now reads from PubMed Central and is used on the
 *   strong opioids protocol; it was not checked for this page.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the raw text
 * unchanged.
 * What the second pass changed: one step that carried three recommendations under a single [1B] grade was split so
 * that each keeps its own source and grade; reasons that no source read gives were replaced with what the sources
 * say; the drugs named in the non-opioid step are now attributed to the Japanese statement, which is where they come
 * from; and the Japanese opioid limits are scoped to pain that is not caused by cancer.
 */
export const chronicPainInCancerSurvivors = protocol({
  id: "chronic-pain-in-cancer-survivors",
  name: "Chronic pain in cancer survivors: assessment, non-opioid treatment first and careful opioid use",
  aka: ["chronic pain after cancer", "persistent pain in survivors", "post-treatment pain", "aromatase inhibitor joint pain", "opioids in cancer survivors", "chronic cancer-related pain"],
  domain: "survivorship",
  tldr: "Pain can persist after cancer treatment. Tell your team about any pain, especially new pain, which should be checked for cancer coming back or a late effect of treatment. Guidelines put talking therapies, exercise and non-opioid medicines ahead of opioids for long-lasting pain; acupuncture is recommended for joint pain from aromatase inhibitors. Opioids may be tried with care in selected people.",
  simple: "Pain can go on after cancer treatment. Tell your team. New pain needs checking. There are treatments besides strong painkillers.",
  summary: "ASCO (2016) recommends screening for pain at each encounter, evaluating new pain for recurrence, a second cancer or a late effect of treatment, involving other professionals for complex needs, and using systemic non-opioid and adjuvant analgesics; a trial of opioids may be given to carefully selected survivors who do not respond to more conservative management and remain distressed or impaired, with assessment of risk and universal precautions against misuse. Many of its recommendations rest on expert consensus because high-quality evidence was scarce. The SIO-ASCO integrative guideline (2022) recommends acupuncture for aromatase inhibitor joint pain, and says acupuncture, reflexology or acupressure may be recommended for general cancer or musculoskeletal pain, hypnosis for procedural pain and massage in palliative or hospice care. For pain from active cancer or its treatment, ASCO's opioid guideline (2023) says opioids should be offered for moderate to severe pain unless contraindicated, started as needed at the lowest possible dose that achieves acceptable pain relief and the patient's goals, with early assessment and frequent titration.\n\nThe Japan Society of Pain Clinicians (2025), which counts anyone from diagnosis to the end of life as a survivor, goes further: not all survivor pain is cancer pain; pain that is not should be managed with analgesics other than opioids and with nerve blocks, and when opioids are needed for such pain they follow Japan's non-cancer chronic pain guideline (a recommended maximum of 60 mg oral morphine equivalent a day, not above 90 mg, for a target of 3 months and no more than 6). Its only strong recommendations are psychosocial approaches [1B] and exercise therapy [1B]; it gives NSAIDs, paracetamol, gabapentinoids for cancer-related neuropathic pain and duloxetine (chosen for pain from chemotherapy nerve damage) weak recommendations [2B], and advises against long-term corticosteroids for pain [2D].",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adult cancer survivors with chronic pain (ASCO 2016). JSPC 2025 defines a survivor as a person at any stage from the time cancer is diagnosed or suspected to the end of life, not only a person whose cancer is cured, and covers all their chronic pain, whether or not cancer caused it. ASCO's opioid guideline (2023) covers adults with pain from cancer or cancer treatment. SIO-ASCO found the evidence insufficient for recommendations in children.",
  trigger: "Each encounter (ASCO 2016); and any report of new-onset pain.",
  steps: [
    {
      action: "Ask about pain at each encounter",
      why: "Asking every time is how pain gets noticed and assessed. JSPC says prolonged pain in cancer survivors is chronic pain and should be addressed.",
      source: "asco-2016",
      quote: "Clinicians should screen for pain at each encounter.",
    },
    {
      action: "Evaluate, treat and monitor any new pain for recurrence, a second cancer or a late effect of treatment",
      why: "New pain may come from the cancer returning, from a second cancer or from a late effect of treatment, so ASCO asks that each be looked for.",
      source: "asco-2016",
      quote: "Recurrent disease, second malignancy, or late-onset treatment effects in any patient who reports new-onset pain should be evaluated, treated, and monitored.",
    },
    {
      action: "Decide whether the pain is caused by cancer or not, and manage pain that is not cancer pain with analgesics other than opioids and with nerve blocks",
      why: "JSPC stresses that not all pain in a cancer survivor is cancer pain, and draws this line so that opioids are not overused.",
      source: "jspc-2025",
      quote: "Pain that is not cancer pain should be managed with analgesics other than opioids and nerve blocks, and pain that persists despite this approach should be treated as non-cancer chronic pain so as to prevent opioid overuse.",
    },
    {
      action: "Determine whether other health professionals are needed for a person with complex needs",
      why: "ASCO asks for this so that pain care is comprehensive. JSPC separately says to consider a multidisciplinary approach built on educating patients and their families, a weak recommendation on low-certainty evidence [2C].",
      source: "asco-2016",
      quote: "Clinicians should determine the need for other health professionals to provide comprehensive pain management care in patients with complex needs.",
    },
    {
      action: "Offer psychosocial approaches such as psychotherapy, self-management and psychoeducation",
      why: "JSPC's summary says these improve pain and physical and mental wellbeing. It grades cognitive behavioural therapy separately, as something that should be considered [2C].",
      source: "jspc-2025",
      quote: "Psychosocial approaches such as psychotherapy, self-management, and psychoeducation are effective in treating chronic pain in cancer survivors.【1B】",
      grade: "1B",
    },
    {
      action: "Consider exercise therapy",
      why: "JSPC recommends it for its potential to improve quality of life. It notes that only a few studies report its effect on pain itself, most of them in breast cancer survivors.",
      source: "jspc-2025",
      quote: "Consider exercise therapy because of its potential to improve health-related quality of life in cancer survivors. [1B]",
      grade: "1B",
    },
    {
      action: "Consider non-opioid and adjuvant analgesics; JSPC weakly recommends NSAIDs or paracetamol, a gabapentinoid for neuropathic pain directly related to cancer, and duloxetine",
      why: "ASCO says these may be prescribed to relieve chronic pain or improve function; its abstract names no drugs. The named drugs and their weak [2B] grades are JSPC's, which adds that NSAIDs and paracetamol have not been shown to work for neuropathic pain.",
      source: "asco-2016",
      quote: "Systemic nonopioid analgesics and adjuvant analgesics may be prescribed to relieve chronic pain and/or to improve function.",
    },
    {
      action: "For joint pain from aromatase inhibitors, recommend acupuncture; acupuncture, reflexology or acupressure may be recommended for general cancer pain or musculoskeletal pain",
      why: "SIO-ASCO bases these recommendations on an intermediate level of evidence, with benefit outweighing risk and a moderate strength of recommendation.",
      source: "sio-asco-2022",
      quote: "Among adult patients, acupuncture should be recommended for aromatase inhibitor-related joint pain. Acupuncture or reflexology or acupressure may be recommended for general cancer pain or musculoskeletal pain.",
    },
    {
      action: "Consider a trial of opioids only for carefully selected survivors whose pain has not responded to more conservative management and still causes distress or impaired function, after assessing the risks",
      why: "ASCO allows a trial, not routine use. JSPC lists constipation, confusion, hormone disturbances and sleep-related breathing problems among the reported effects of long-term opioid use, and describes a US study of older breast cancer survivors in which opioids raised the risks of drug abuse, falls and fractures.",
      source: "asco-2016",
      quote: "Clinicians may prescribe a trial of opioids in carefully selected patients with cancer who do not respond to more conservative management and who continue to experience distress or functional impairment. Risks of adverse effects of opioids should be assessed.",
    },
    {
      action: "When opioids are used, apply universal precautions to minimise abuse, addiction and adverse consequences",
      why: "ASCO also asks clinicians to be clear about what tolerance, dependence, abuse and addiction each mean. JSPC says universal precautions matter as much for people with cancer as for people without.",
      source: "asco-2016",
      quote: "Clinicians should clearly understand terminology such as tolerance, dependence, abuse, and addiction as it relates to the use of opioids and should incorporate universal precautions to minimize abuse, addiction, and adverse consequences.",
    },
    {
      action: "For a person with a substance use disorder, work with a palliative care, pain or substance use disorder specialist to decide the best approach to pain",
      why: "This comes from ASCO's guideline on opioids for pain from cancer or cancer treatment, which asks for a shared plan for these patients; the abstract gives no further detail.",
      source: "opioids-2023",
      quote: "For patients with a substance use disorder, clinicians should collaborate with a palliative care, pain, and/or substance use disorder specialist to determine the optimal approach to pain management.",
    },
  ],
  bestInClass: {
    statement: "No guideline that could be read in full here both covers chronic pain in survivors and comes from an international body. ASCO 2016 remains ASCO's guideline for survivors (screen at each encounter, evaluate new pain for recurrence, non-opioid and adjuvant analgesics, opioids as a trial in carefully selected patients with universal precautions); its abstract says many recommendations rest on expert consensus. SIO-ASCO 2022 adds the integrative recommendations, the firmest being acupuncture for aromatase inhibitor joint pain. The Japan Society of Pain Clinicians statement (2025) is the most recent and the only one read with a grade on each recommendation: it separates cancer pain from non-cancer pain in survivors, gives its only strong recommendations to psychosocial approaches and exercise therapy [1B], and for pain not caused by cancer applies Japan's dose and duration limits for opioids in chronic non-cancer pain. The ASCO abstracts read print no dose limit; JSPC does. ESMO 2018 could not be read.",
    sources: ["asco-2016", "sio-asco-2022", "jspc-2025", "opioids-2023", "esmo-2018"],
  },
  variants: [
    {
      name: "Japanese opioid limits for non-cancer pain in survivors",
      differs: "For pain not caused by cancer, opioids only when non-opioid analgesics and nerve blocks are ineffective, with a recommended maximum of 60 mg a day oral morphine equivalent, a dose that should not exceed 90 mg a day, a target duration of 3 months that should not exceed 6 months, and then withdrawal or dose reduction and re-evaluation. For pain directly caused by cancer JSPC sets no such limit and points to the WHO analgesic guidelines.",
      evidence: "JSPC 2025 summary statement (no grade printed for it), applying Japan's Guidelines for Prescribing Opioid Analgesics for Chronic Non-Cancer Pain. Tramadol is weakly recommended in carefully selected survivors who do not respond to treatment other than opioid analgesics and who have pain-related distress and functional impairment [2B]. No comparable numerical limits appear in the ASCO abstracts read.",
      sources: ["jspc-2025"],
    },
    {
      name: "Nerve blocks and intrathecal analgesia",
      differs: "Interventional treatment: nerve blocks with neurolytic agents for cancer-related pain in internal organs (JSPC describes a study of coeliac plexus block), and intrathecal analgesia for intractable cancer pain.",
      evidence: "JSPC 2025: neurolytic nerve blocks may be considered because they can reduce opioid use [2C]; intrathecal analgesia may be considered for intractable cancer pain [2C].",
      sources: ["jspc-2025"],
    },
    {
      name: "Hypnosis and massage",
      differs: "Hypnosis for pain during procedures; massage for pain in palliative or hospice care.",
      evidence: "SIO-ASCO 2022: each may be recommended, on an intermediate level of evidence with moderate strength.",
      sources: ["sio-asco-2022"],
    },
  ],
  grades: [
    { claim: "Exercise therapy for chronic pain in survivors", grade: "1B", source: "jspc-2025", quote: "Consider exercise therapy because of its potential to improve health-related quality of life in cancer survivors. [1B]" },
    { claim: "Duloxetine for chronic pain, especially painful CIPN", grade: "2B", source: "jspc-2025", quote: "Duloxetine is weakly recommended for chronic pain in cancer survivors because it is more effective for pain due to chemotherapy-induced peripheral neuropathy (CIPN) than other adjuvant analgesics. [2B]" },
    { claim: "No long-term corticosteroids for chronic pain alone", grade: "2D", source: "jspc-2025", quote: "Corticosteroids should not be used long term in cancer survivors for the sole purpose of relieving chronic pain. [2D]" },
    { claim: "SIO-ASCO integrative recommendations", grade: "intermediate evidence; benefit outweighs risk; moderate strength", source: "sio-asco-2022", quote: "These recommendations are based on an intermediate level of evidence, benefit outweighing risk, and with moderate strength of recommendation." },
    { claim: "Opioids for moderate to severe pain from active cancer or its treatment", grade: "not given in the abstract", source: "opioids-2023", quote: "Opioids should be offered to patients with moderate-to-severe pain related to cancer or active cancer treatment unless contraindicated." },
  ],
  sources: [
    { key: "asco-2016", label: "Management of Chronic Pain in Survivors of Adult Cancers: American Society of Clinical Oncology Clinical Practice Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2016, url: "https://europepmc.org/abstract/MED/27458286", doi: "10.1200/JCO.2016.68.5206", read: "abstract", accessed: "2026-11-17" },
    { key: "sio-asco-2022", label: "Integrative Medicine for Pain Management in Oncology: Society for Integrative Oncology-ASCO Guideline", publisher: "SIO and ASCO, Journal of Clinical Oncology", year: 2022, url: "https://europepmc.org/abstract/MED/36122322", doi: "10.1200/JCO.22.01357", read: "abstract", accessed: "2026-11-17" },
    { key: "opioids-2023", label: "Use of Opioids for Adults With Pain From Cancer or Cancer Treatment: ASCO Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2023, url: "https://europepmc.org/abstract/MED/36469839", doi: "10.1200/JCO.22.02198", read: "abstract", accessed: "2026-11-17" },
    { key: "jspc-2025", label: "Consensus statement on chronic pain treatment in cancer survivors", publisher: "Japan Society of Pain Clinicians, Journal of Anesthesia", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11937162/", doi: "10.1007/s00540-024-03427-0", gradingScheme: "GRADE-based (Minds Manual for Guideline Development 2020 ver. 3.0): certainty of evidence A (high), B (moderate), C (low) or D (very low), combined with strength of recommendation 1 (strong) or 2 (weak), for example [2B]. Summary statements carry no grade.", read: "full-text", accessed: "2026-11-17" },
    { key: "esmo-2018", label: "Management of cancer pain in adult patients: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2018, url: "https://doi.org/10.1093/annonc/mdy152", doi: "10.1093/annonc/mdy152", read: "not-reachable", accessed: "2026-11-11" },
  ],
  gaps: [
    "ASCO 2016, SIO-ASCO 2022 and ASCO 2023 were read only as abstracts, again on 17 November 2026 (the publisher refuses a script and no open copy is listed); their individual evidence ratings, drug choices and doses are not given here, and the non-opioid drugs named on this page come from the Japanese statement.",
    "On 17 November 2026 the ESMO 2018 cancer pain guideline still could not be read (no abstract in Europe PMC; the publisher answered 403). No step rests on it, and no newer ESMO cancer pain guideline was found in Europe PMC.",
    "The update of the Australian guideline for cancer pain in adults (Asia-Pacific Journal of Clinical Oncology, PMC13569014) now reads as text from PubMed Central and is used on the strong opioids protocol. It names ASCO 2016 among its source guidelines; its recommendations were not checked for this page on 17 November 2026.",
    "No source read sets an opioid dose limit for survivors outside Japan; whether US or European survivors should follow non-cancer chronic pain opioid guidance is not settled in the sources read. The 60 mg and 90 mg figures are Japan's rule for pain not caused by cancer and are not a general limit.",
    "No source read says how common chronic pain is after cancer treatment or how long it lasts, so this page gives no figure for either.",
    "No source read gives a list of pain symptoms a survivor should report urgently or a time limit for reporting them; ASCO's abstract says only that new-onset pain should be evaluated.",
    "The JSPC statement is a national consensus (agreement of at least 80% of its working group); it says evidence in survivors is scarce and that it drew on studies in other adult populations as well.",
  ],
  institutions: ["asco", "esmo"],
  drugs: ["duloxetine"],
  technologies: ["pain-management", "acupuncture-aromatase-inhibitor-arthralgia", "cbt-fatigue-distress", "exercise-oncology", "hypnosis-cancer-care", "massage-therapy-cancer", "reflexology-cancer"],
  terms: ["peripheral-neuropathy"],
  related: ["chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention", "exercise-during-and-after-cancer-treatment"],
  sections: ["supportive-care"],
  tags: ["protocol", "pain", "survivorship", "supportive-care"],
});
