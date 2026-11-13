import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Neurological immune-related adverse events of checkpoint inhibitors: myasthenia gravis, Guillain-Barré syndrome and
 * other neuropathies, aseptic meningitis and encephalitis.
 *
 * What was read, and how: SITC 2021 (full text: neurological section and recommendations, and the general
 * myositis/myocarditis/myasthenia recommendations), as described in ./irae-sources.ts; the 2021 consensus disease
 * definitions for neurologic irAEs (J Immunother Cancer, open access, full text from Europe PMC, PMC8291304). ASCO 2021
 * abstract only; ESMO 2022 not reachable. DOIs resolved through Europe PMC. Quotes checked by script against the raw
 * text on 11 November 2026.
 */
export const iraeNeurological = protocol({
  id: "irae-neurological",
  name: "Neurological side effects of checkpoint inhibitors: myasthenia gravis, Guillain-Barré syndrome, meningitis and encephalitis",
  aka: ["neurologic irAEs", "irAE-N", "checkpoint inhibitor myasthenia gravis", "immune-related Guillain-Barré syndrome", "checkpoint inhibitor encephalitis", "immune-related aseptic meningitis", "immune-related neuropathy"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy rarely inflames the nerves, the brain or the junction between nerve and muscle. Drooping eyelids, double vision, trouble swallowing or speaking, weakness spreading up the legs, numbness, severe headache with a stiff neck, confusion or a seizure need urgent assessment. Treatment is quick high-dose steroids, often with immunoglobulin or plasma exchange, and a neurologist.",
  simple: "Rarely, immunotherapy affects the nerves or brain. Drooping eyelids, double vision, new weakness, confusion or a bad headache with a stiff neck need urgent help.",
  summary: "Neurological irAEs occur in about 6% on PD-(L)1 inhibitors, 4% on CTLA-4 inhibitors and 12% on combinations, mostly grade 1 to 2; grade 3 or more is under 1% but can be fatal or permanent, usually within the first 3 months (SITC 2021). Myasthenia gravis carries about 20% mortality and clusters with myositis and myocarditis.\n\nSITC 2021: refer every neurological irAE to a specialist whatever the grade. Myasthenia: antibody testing, a search for myositis, myocarditis and thyroid dysfunction, negative inspiratory force and vital capacity; stop the checkpoint inhibitor; steroids (prednisone 1 to 1.5 mg/kg for grade 2), pyridostigmine, and IVIG or plasma exchange (LE: 1); admission and possibly intensive care for grade 3 to 4. Guillain-Barré: spine MRI, lumbar puncture, EMG and nerve conduction; permanent discontinuation with IVIG or plasma exchange plus steroids (LE: 1). Encephalitis: MRI, lumbar puncture, EEG, autoimmune and paraneoplastic panels and infection PCR, empirical antivirals; pulse methylprednisolone 1000 mg for 3 to 5 days with IVIG or plasma exchange, then rituximab if refractory (LE: 1). Aseptic meningitis: MRI, lumbar puncture, cortisol and ACTH, antibiotics until bacterial meningitis is excluded, prednisone 0.5 to 1 mg/kg (LE: 4). The 2021 neurologic consensus definitions (seven core disorders, graded by certainty) standardise the diagnosis and advise brain imaging before lumbar puncture.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "emergency-team", "patient-or-carer", "multidisciplinary-team"],
    where: ["emergency-department", "acute-oncology-service", "telephone-triage", "ward", "intensive-care", "outpatient-clinic"],
  },
  population: "Adults who have received an immune checkpoint inhibitor, alone or in combination. Guillain-Barré syndrome and meningitis are more frequent with CTLA-4 or combined blockade; myasthenia gravis and encephalitis with PD-(L)1 blockade. People with pre-existing neurological autoimmune disease are at risk of a flare. Children are not addressed by these sources.",
  trigger: "New weakness, drooping eyelids, double vision, difficulty swallowing or speaking, breathlessness from weakness, ascending numbness or weakness, severe headache with neck stiffness or fever, confusion, behaviour change or seizure during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Refer every neurological side effect to a neurologist, whatever its grade",
      why: "These conditions overlap, can worsen quickly and need specialist tests to tell apart.",
      source: "sitc-2021",
      quote: "Patients diagnosed with neurological irAEs should be referred to a specialist, regardless of severity.",
    },
    {
      action: "For any myasthenia symptoms, test myasthenia antibodies, look for myositis, myocarditis and thyroid disease, and measure negative inspiratory force and vital capacity",
      why: "Myasthenia often comes with heart and muscle inflammation, and weak breathing muscles can fail.",
      source: "sitc-2021",
      quote: "Workup should include diagnostic antibody testing for myasthenia gravis and evaluation for concurrent myositis, myocarditis, and thyroid dysfunction. Electrodiagnostic studies may be performed to distinguish myasthenia gravis from myositis. Pulmonary function should be assessed with negative inspiratory force (NIF) and vital capacity (VC).",
    },
    {
      action: "For myasthenia gravis, stop the checkpoint inhibitor and give IVIG or plasma exchange with steroids and pyridostigmine, with frequent breathing assessments",
      why: "Prompt immune treatment and close watch on breathing reduce the risk of respiratory failure.",
      source: "sitc-2021",
      quote: "Patients diagnosed with myasthenia gravis should discontinue ICI therapy and should receive IVIG or PLEX with corticosteroid therapy and pyridostigmine. These patients should receive frequent pulmonary assessments",
      grade: "LE: 1",
    },
    {
      action: "Admit grade 3 to 4 myasthenia, possibly to intensive care, stop the checkpoint inhibitor permanently and review daily",
      why: "Severe myasthenia can stop the breathing muscles working.",
      source: "sitc-2021",
      quote: "Patients with grade 3 or 4 myasthenia gravis should be admitted to the hospital and may need ICU-level monitoring. ICIs should be permanently discontinued, and frequent pulmonary function assessments and daily neurological review should be performed.",
    },
    {
      action: "For suspected Guillain-Barré syndrome, obtain spine MRI, lumbar puncture, EMG, nerve conduction studies and ganglioside antibodies",
      why: "These exclude spinal cord compression and confirm nerve root inflammation.",
      source: "sitc-2021",
      quote: "Workup for patients with suspected Guillain-Barré syndrome should include MRI of the spine to rule out a compressive lesion, LP, EMG, nerve conduction studies, and ganglioside antibody panel of blood and CSF.",
    },
    {
      action: "For Guillain-Barré syndrome, stop the checkpoint inhibitor permanently and give IVIG or plasma exchange with steroids",
      why: "Ascending weakness can reach the breathing muscles; immunoglobulin or plasma exchange is the standard treatment.",
      source: "sitc-2021",
      quote: "Patients diagnosed with Guillain-Barré syndrome should always permanently discontinue ICI therapy, and should receive IVIG or PLEX with corticosteroid therapy",
      grade: "LE: 1",
    },
    {
      action: "Image the brain before lumbar puncture",
      why: "A mass in the brain can make lumbar puncture dangerous, and the puncture can itself alter the scan.",
      source: "neuro-definitions-2021",
      quote: "Head imaging (CT or MRI) should be performed prior to lumbar puncture (LP) to exclude mass lesions that may cause herniation and because LP can cause pachymeningeal enhancement.",
    },
    {
      action: "For suspected aseptic meningitis, obtain brain and pituitary MRI, lumbar puncture, cortisol and ACTH, and give antibiotics until bacterial meningitis is excluded",
      why: "Infection, cancer in the meninges and hypophysitis can all look the same.",
      source: "sitc-2021",
      quote: "Workup for patients with suspected aseptic meningitis should include MRI of the brain and pituitary with and without contrast, lumbar puncture (LP), cortisol, and ACTH.",
    },
    {
      action: "For suspected encephalitis, obtain brain MRI, lumbar puncture, EEG, blood tests, autoimmune and paraneoplastic panels and infection PCR, and give an antiviral until viral encephalitis is excluded",
      why: "Viral encephalitis must be treated while the cause is found.",
      source: "sitc-2021",
      quote: "Workup for patients with suspected encephalitis should include MRI of the brain, LP, CBC, CMP, autoimmune encephalopathy and paraneoplastic panels of blood and cerebrospinal fluid (CSF), PCR for infectious encephalitis, thyroid panel, and electroencephalogram (EEG).",
    },
    {
      action: "For encephalitis or Guillain-Barré syndrome of any grade, give pulse methylprednisolone 1000 mg IV daily for 3 to 5 days plus IVIG or plasma exchange",
      why: "These are the most dangerous neurological side effects and are treated at full strength from the start.",
      source: "sitc-2021",
      quote: "Patients with any grade of encephalitis or Guillain-Barré syndrome should receive pulse-dose methylprednisolone at 1000 mg IV daily for 3–5 days, and should additionally receive IVIG or PLEX.",
    },
    {
      action: "If encephalitis does not respond to pulse steroids, give IVIG, plasma exchange or rituximab",
      why: "Steroid-resistant encephalitis needs another immune treatment.",
      source: "sitc-2021",
      quote: "If ICI-related encephalitis does not respond to pulse-dose corticosteroids, patients may receive IVIG (2 g/kg in divided doses over the course of 5 days), PLEX (one session every other day for 5–7 cycles), or rituximab (375 mg/m2 weekly infusion for 4 weeks)",
      grade: "LE: 1",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 is the guideline read in full, and it grades its key treatments LE: 1: IVIG or plasma exchange with steroids and pyridostigmine for myasthenia gravis, IVIG or plasma exchange with steroids and permanent discontinuation for Guillain-Barré syndrome, and IVIG, plasma exchange or rituximab for steroid-refractory encephalitis. These grades describe the evidence for the treatments in the non-immunotherapy forms of these diseases; there are no trials in checkpoint inhibitor patients. The 2021 neurologic consensus definitions do not give treatment but standardise the diagnosis into seven core disorders with a certainty level, and note that treatment often starts at probable or possible certainty. ASCO 2021 (abstract) makes neurological toxicity an exception to continuing treatment at grade 1. ESMO 2022 could not be read.",
    sources: ["sitc-2021", "neuro-definitions-2021", "asco-2021", "esmo-2022"],
  },
  variants: [
    {
      name: "Seven core disorders with diagnostic certainty (2021 neurologic consensus definitions)",
      differs: "Classifies each event as immune-related meningitis, encephalitis, demyelinating disease, vasculitis, neuropathy, neuromuscular junction disorder or myopathy, each as definite, probable or possible, with severity, antibody status and any concurrent irAE recorded.",
      evidence: "Modified Delphi consensus of 27 panellists from 15 academic centres; definitions, not graded recommendations.",
      sources: ["neuro-definitions-2021"],
    },
  ],
  grades: [
    { claim: "Myasthenia gravis: stop the checkpoint inhibitor; IVIG or plasma exchange with steroids and pyridostigmine", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Guillain-Barré syndrome: permanent discontinuation; IVIG or plasma exchange with steroids", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Steroid-refractory encephalitis: IVIG, plasma exchange or rituximab", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Ocular myasthenia or non-Guillain-Barré polyneuropathy of grade 2 or less: prednisone 0.5 to 1 mg/kg/day", grade: "LE: 2", source: "sitc-2021" },
    { claim: "Aseptic meningitis: prednisone 0.5 to 1 mg/kg/day", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Painful peripheral neuropathy: gabapentin, pregabalin or duloxetine until it resolves", grade: "LE: 1", source: "sitc-2021", quote: "Patients diagnosed with painful peripheral neuropathy should receive neuropathic pain medication such as gabapentin, pregabalin, or duloxetine until neuropathy resolves" },
    { claim: "Neurological toxicity is an exception to continuing treatment at grade 1", grade: "expert consensus", source: "asco-2021" },
  ],
  sources: [
    SITC_ICI_2021,
    {
      key: "neuro-definitions-2021",
      label: "Consensus disease definitions for neurologic immune-related adverse events of immune checkpoint inhibitors",
      publisher: "Journal for ImmunoTherapy of Cancer",
      year: 2021,
      url: "https://europepmc.org/article/PMC/PMC8291304",
      doi: "10.1136/jitc-2021-002890",
      gradingScheme: "Modified Delphi consensus using the RAND/UCLA Appropriateness Method; disease definitions, not graded recommendations.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    ASCO_ICI_2021,
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ASCO 2021 guideline was read only as its abstract and its neurological tables are not compared here.",
    "There are no randomised trials in checkpoint inhibitor neurological toxicity; SITC's LE: 1 grades rest on evidence from the same diseases outside immunotherapy.",
    "Whether a checkpoint inhibitor can ever be restarted after myasthenia gravis, encephalitis or Guillain-Barré syndrome is not addressed beyond SITC's permanent discontinuation for Guillain-Barré and grade 3 to 4 myasthenia.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "methylprednisolone", "human-normal-immunoglobulin", "rituximab", "gabapentin", "duloxetine"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-myocarditis", "irae-hypophysitis-adrenal", "irae-ocular"],
  tags: ["protocol", "irae", "acute-oncology", "neurology"],
});
