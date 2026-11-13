import { protocol } from "./helpers";

/*
 * Chronic pain in people who have finished cancer treatment or are living with cancer long term: screening, ruling out
 * recurrence, non-drug and non-opioid treatment first, integrative therapies with evidence, and careful use of
 * opioids.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ASCO guideline on chronic pain in survivors of adult cancers (Paice et al., J Clin Oncol 2016): abstract only, from
 *   Europe PMC; ascopubs.org refused a script and PubMed Central holds no copy. No later ASCO update on chronic pain in
 *   survivors was found in Europe PMC.
 * - SIO-ASCO guideline on integrative medicine for pain management in oncology (Mao et al., J Clin Oncol 2022):
 *   abstract only, from Europe PMC.
 * - ASCO guideline on use of opioids for adults with pain from cancer or cancer treatment (Paice et al., J Clin Oncol
 *   2023): abstract only, from Europe PMC.
 * - Japan Society of Pain Clinicians consensus statement on chronic pain treatment in cancer survivors (J Anesth
 *   2025): full text from Europe PMC (PMC11937162), with its graded statements.
 * - ESMO Clinical Practice Guidelines on cancer pain in adults (Fallon et al., Ann Oncol 2018): not reachable (no
 *   abstract in Europe PMC; publisher refused a script). The 2026 update of the Australian cancer pain guideline was
 *   found (PMC13569014) but PubMed Central releases no body text to a script; not read.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text unchanged.
 */
export const chronicPainInCancerSurvivors = protocol({
  id: "chronic-pain-in-cancer-survivors",
  name: "Chronic pain in cancer survivors: assessment, non-opioid treatment first and careful opioid use",
  aka: ["chronic pain after cancer", "persistent pain in survivors", "post-treatment pain", "aromatase inhibitor joint pain", "opioids in cancer survivors", "chronic cancer-related pain"],
  domain: "survivorship",
  tldr: "Pain can last for years after cancer treatment. Tell your team about any pain, especially new pain, which should be checked for cancer coming back. Most long-lasting pain is best managed first with exercise, talking therapies, physiotherapy and non-opioid medicines; acupuncture helps joint pain from aromatase inhibitors. Opioids can be tried with care, because long-term use carries real risks.",
  simple: "Pain after cancer treatment is common. Tell your team. New pain needs checking. Many treatments help besides strong painkillers.",
  summary: "ASCO (2016) recommends screening for pain at each encounter, evaluating new pain for recurrence, a second cancer or a late effect of treatment, involving other professionals for complex needs, and using systemic non-opioid and adjuvant analgesics; a trial of opioids may be given to carefully selected survivors who do not respond to more conservative management and remain distressed or impaired, with assessment of risk and universal precautions against misuse. Many of its recommendations rest on expert consensus because high-quality evidence was scarce. The SIO-ASCO integrative guideline (2022) recommends acupuncture for aromatase inhibitor joint pain, and says acupuncture, reflexology or acupressure may be recommended for general cancer or musculoskeletal pain, hypnosis for procedural pain and massage in palliative or hospice care. For pain from active cancer or its treatment, ASCO's opioid guideline (2023) says opioids should be offered for moderate to severe pain unless contraindicated, started as needed at the lowest dose with early assessment and titration.\n\nThe Japan Society of Pain Clinicians (2025) goes further for survivors: not all survivor pain is cancer pain; pain that is not should be treated without opioids where possible, and when opioids are needed they follow the country's non-cancer chronic pain rules (up to 60 mg oral morphine equivalent a day, not above 90 mg, for a target of 3 months). It grades psychosocial approaches [1B] and exercise [1B] most highly, NSAIDs, paracetamol, gabapentinoids for cancer-related neuropathic pain and duloxetine for CIPN pain as weak recommendations [2B], and advises against long-term corticosteroids for pain [2D].",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults after cancer treatment, or living long term with cancer, who have chronic pain (ASCO 2016; JSPC 2025). Pain from active cancer or active treatment is covered by ASCO's opioid guideline (2023). SIO-ASCO found the evidence insufficient for recommendations in children.",
  trigger: "Every follow-up encounter; and any report of new or persisting pain.",
  steps: [
    {
      action: "Ask about pain at every encounter",
      why: "Long-lasting pain after cancer is common and often goes unmentioned unless someone asks.",
      source: "asco-2016",
      quote: "Clinicians should screen for pain at each encounter.",
    },
    {
      action: "Evaluate any new pain for recurrence, a second cancer or a late effect of treatment before treating it as chronic pain",
      why: "New pain can be the first sign that the cancer has come back, which changes everything that follows.",
      source: "asco-2016",
      quote: "Recurrent disease, second malignancy, or late-onset treatment effects in any patient who reports new-onset pain should be evaluated, treated, and monitored.",
    },
    {
      action: "Decide whether the pain is caused by cancer or not, and manage pain that is not cancer pain without opioids where possible",
      why: "Pain after treatment is often not caused by cancer, and long-term opioids for such pain carry risks without clear benefit.",
      source: "jspc-2025",
      quote: "Pain that is not cancer pain should be managed with analgesics other than opioids and nerve blocks, and pain that persists despite this approach should be treated as non-cancer chronic pain so as to prevent opioid overuse.",
    },
    {
      action: "Offer psychosocial treatment (CBT, self-management, psychoeducation) and exercise therapy, and bring in other professionals when needs are complex",
      why: "These improve pain, mood and quality of life; complex pain usually needs a team rather than one prescriber.",
      source: "jspc-2025",
      quote: "Psychosocial approaches such as psychotherapy, self-management, and psychoeducation are effective in treating chronic pain in cancer survivors.【1B】",
      grade: "1B",
    },
    {
      action: "Use non-opioid and adjuvant analgesics: NSAIDs or paracetamol, a gabapentinoid for neuropathic pain caused by cancer, duloxetine for painful chemotherapy nerve damage",
      why: "These can relieve pain and improve function without the risks of long-term opioids.",
      source: "asco-2016",
      quote: "Systemic nonopioid analgesics and adjuvant analgesics may be prescribed to relieve chronic pain and/or to improve function.",
    },
    {
      action: "For joint pain from aromatase inhibitors, recommend acupuncture; acupuncture, reflexology or acupressure may also be offered for general cancer or musculoskeletal pain",
      why: "Acupuncture reduced aromatase inhibitor joint pain in trials, which can help people keep taking their hormone treatment.",
      source: "sio-asco-2022",
      quote: "Among adult patients, acupuncture should be recommended for aromatase inhibitor-related joint pain. Acupuncture or reflexology or acupressure may be recommended for general cancer pain or musculoskeletal pain.",
    },
    {
      action: "Consider a trial of opioids only for carefully selected survivors whose pain has not responded to other treatment and still causes distress or impaired function, after assessing the risks",
      why: "Opioids can help some people, but long-term use brings risks of dependence, falls, hormone problems and overdose.",
      source: "asco-2016",
      quote: "Clinicians may prescribe a trial of opioids in carefully selected patients with cancer who do not respond to more conservative management and who continue to experience distress or functional impairment. Risks of adverse effects of opioids should be assessed.",
    },
    {
      action: "When opioids are used, apply universal precautions against misuse, and involve palliative care, pain or addiction specialists for anyone with a substance use disorder",
      why: "Structured safeguards lower the chance of harm; people with addiction still deserve pain relief and need specialist planning.",
      source: "opioids-2023",
      quote: "For patients with a substance use disorder, clinicians should collaborate with a palliative care, pain, and/or substance use disorder specialist to determine the optimal approach to pain management.",
    },
  ],
  bestInClass: {
    statement: "No single recent graded guideline covers chronic pain in survivors. ASCO 2016 remains the US reference (screen every visit, rule out recurrence, non-opioid and adjuvant analgesics, opioids as a selective trial with precautions), mostly on expert consensus. SIO-ASCO 2022 adds the strongest integrative recommendation, acupuncture for aromatase inhibitor joint pain. The Japan Society of Pain Clinicians statement (2025) is the most recent and most explicit: it separates cancer pain from non-cancer pain in survivors, ranks psychosocial approaches and exercise first [1B], and caps opioid doses and duration as for non-cancer chronic pain. ASCO does not set a dose cap for survivors in the parts read; JSPC does. ESMO 2018 could not be read.",
    sources: ["asco-2016", "sio-asco-2022", "jspc-2025", "opioids-2023", "esmo-2018"],
  },
  variants: [
    {
      name: "Japanese opioid limits for non-cancer pain in survivors",
      differs: "Opioids only when non-opioid analgesics and nerve blocks fail, with a recommended maximum of 60 mg a day oral morphine equivalent, an upper limit of 90 mg, and reassessment with withdrawal or dose reduction considered after a target of 3 months and at most 6 months.",
      evidence: "JSPC 2025 consensus, applying Japan's guideline for opioids in chronic non-cancer pain; tramadol is weakly recommended in carefully selected survivors [2B]. No comparable numerical limits appear in the ASCO abstracts read.",
      sources: ["jspc-2025"],
    },
    {
      name: "Nerve blocks and intrathecal analgesia",
      differs: "Interventional treatment for pain from cancer in internal organs (for example a coeliac plexus block) or intractable cancer pain.",
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
    { key: "asco-2016", label: "Management of Chronic Pain in Survivors of Adult Cancers: American Society of Clinical Oncology Clinical Practice Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2016, url: "https://europepmc.org/abstract/MED/27458286", doi: "10.1200/JCO.2016.68.5206", read: "abstract", accessed: "2026-11-11" },
    { key: "sio-asco-2022", label: "Integrative Medicine for Pain Management in Oncology: Society for Integrative Oncology-ASCO Guideline", publisher: "SIO and ASCO, Journal of Clinical Oncology", year: 2022, url: "https://europepmc.org/abstract/MED/36122322", doi: "10.1200/JCO.22.01357", read: "abstract", accessed: "2026-11-11" },
    { key: "opioids-2023", label: "Use of Opioids for Adults With Pain From Cancer or Cancer Treatment: ASCO Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2023, url: "https://europepmc.org/abstract/MED/36469839", doi: "10.1200/JCO.22.02198", read: "abstract", accessed: "2026-11-11" },
    { key: "jspc-2025", label: "Consensus statement on chronic pain treatment in cancer survivors", publisher: "Japan Society of Pain Clinicians, Journal of Anesthesia", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11937162/", doi: "10.1007/s00540-024-03427-0", gradingScheme: "GRADE-based (Minds Manual 2020): certainty A (high) to D (very low) combined with strength 1 (strong) or 2 (weak), for example [2B].", read: "full-text", accessed: "2026-11-11" },
    { key: "esmo-2018", label: "Management of cancer pain in adult patients: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2018, url: "https://doi.org/10.1093/annonc/mdy152", doi: "10.1093/annonc/mdy152", read: "not-reachable", accessed: "2026-11-11" },
  ],
  gaps: [
    "ASCO 2016, SIO-ASCO 2022 and ASCO 2023 were read only as abstracts; their individual evidence ratings, drug choices and doses are not given here.",
    "The ESMO 2018 cancer pain guideline could not be read (no abstract in Europe PMC; the publisher refused a script).",
    "The 2026 update of the Australian guideline for cancer pain in adults was found but its body text is not released by PubMed Central to a script; not read.",
    "No source read sets an opioid dose limit for survivors outside Japan; whether US or European survivors should follow non-cancer chronic pain opioid guidance is not settled in the sources read.",
    "The JSPC statement is a national consensus; its recommendations draw on studies mostly from other countries and on expert agreement.",
  ],
  institutions: ["asco", "esmo"],
  drugs: ["duloxetine"],
  technologies: ["pain-management", "acupuncture-aromatase-inhibitor-arthralgia", "cbt-fatigue-distress", "exercise-oncology", "hypnosis-cancer-care", "massage-therapy-cancer", "reflexology-cancer"],
  terms: ["peripheral-neuropathy"],
  related: ["chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention", "exercise-during-and-after-cancer-treatment"],
  sections: ["supportive-care"],
  tags: ["protocol", "pain", "survivorship", "supportive-care"],
});
