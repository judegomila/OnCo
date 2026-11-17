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
 *
 * Second accuracy pass, 17 November 2026: every claim was re-read against raw text. SITC 2021 from the Europe PMC
 * full-text XML (PMC8237720) and the ASCO 2021 abstract from the Europe PMC core record, both saved by the
 * irae-myocarditis checker on 16 November 2026 and re-used; the consensus definitions re-fetched from Europe PMC
 * (PMC8291304 full-text XML) with its DOI re-resolved through Crossref, and its December 2021 erratum (PMC8671977,
 * a missing section of table 6 restored) read. Quotes re-checked by script after stripping XML tags and citation
 * numbers. Corrected: a 20% myasthenia mortality figure that neither source prints was removed; "rarely" and several
 * reasons the sources do not give were reworded; SITC's "may receive" for refractory encephalitis is no longer
 * written as an order; the ASCO exception is "some" neurological toxicities; the steroid doses SITC prints were
 * added as steps. ESMO 2022 and the ASCO full text were not retried (a sibling checker found both still 403 on
 * 16 November 2026).
 */
export const iraeNeurological = protocol({
  id: "irae-neurological",
  name: "Neurological side effects of checkpoint inhibitors: myasthenia gravis, Guillain-Barré syndrome, meningitis and encephalitis",
  aka: ["neurologic irAEs", "irAE-N", "checkpoint inhibitor myasthenia gravis", "immune-related Guillain-Barré syndrome", "checkpoint inhibitor encephalitis", "immune-related aseptic meningitis", "immune-related neuropathy"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can inflame the nerves, the brain or the junction between nerve and muscle. Serious cases are uncommon. Drooping eyelids, double vision, trouble swallowing or speaking, weakness spreading up the legs, numbness, a headache with a stiff neck, confusion or a seizure need urgent assessment. Treatment is steroids, often with immunoglobulin or plasma exchange, and a neurologist.",
  simple: "Sometimes immunotherapy affects the nerves or brain. Serious cases are uncommon. Drooping eyelids, double vision, new weakness, confusion or a headache with a stiff neck need urgent help.",
  summary: "In the systematic review SITC 2021 cites, neurological irAEs occurred in 6% on PD-(L)1 inhibitors, 4% on CTLA-4 inhibitors and 12% on combinations, mostly non-specific and grade 1 to 2; grade 3 or more was under 1% (1.5% in a single-institution series). They can be fatal or leave lasting impairment and typically start within the first 3 months. SITC describes myasthenia gravis as having a high potential for fatality, and it can occur together with myositis and myocarditis.\n\nSITC 2021: refer every neurological irAE to a specialist whatever the grade. Myasthenia: neurology consultation, antibody testing, a search for myositis, myocarditis and thyroid dysfunction, negative inspiratory force and vital capacity; discontinue the checkpoint inhibitor; IVIG or plasma exchange with steroids and pyridostigmine, and frequent pulmonary assessments (LE: 1). At grade 2, prednisone 1 to 1.5 mg/kg daily, tapered on improvement, and pyridostigmine may be considered from 30 mg three times a day to at most 120 mg four times a day. At grade 3 to 4, admission and possibly intensive care, permanent discontinuation, continued steroids (LE: 3), and IVIG 2 g/kg over 5 days (0.4 g/kg/day) or plasmapheresis for 5 days may be considered. Guillain-Barré: spine MRI, lumbar puncture, EMG, nerve conduction and ganglioside antibodies; permanent discontinuation with IVIG or plasma exchange plus steroids (LE: 1) and frequent pulmonary assessments. Encephalitis: MRI, lumbar puncture, EEG, blood count and metabolic panel, thyroid panel, autoimmune and paraneoplastic panels and infection PCR, empirical antivirals. Encephalitis or Guillain-Barré of any grade: pulse methylprednisolone 1000 mg IV daily for 3 to 5 days with IVIG or plasma exchange; if encephalitis does not respond, IVIG (2 g/kg over 5 days), plasma exchange (every other day for 5 to 7 cycles) or rituximab (375 mg/m2 weekly for 4 weeks) may be given (LE: 1). Aseptic meningitis: brain and pituitary MRI, lumbar puncture, cortisol and ACTH, antibiotics until bacterial meningitis is excluded, prednisone 0.5 to 1 mg/kg/day (LE: 4). The same prednisone dose applies to ocular myasthenia and non-Guillain-Barré polyneuropathy of grade 2 or less. The 2021 neurologic consensus definitions (seven core disorders, each with a level of diagnostic certainty) standardise the diagnosis and advise head imaging before lumbar puncture.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "emergency-team", "patient-or-carer", "multidisciplinary-team"],
    where: ["emergency-department", "acute-oncology-service", "telephone-triage", "ward", "intensive-care", "outpatient-clinic"],
  },
  population: "Adults who have received an immune checkpoint inhibitor, alone or in combination. SITC 2021 reports Guillain-Barré syndrome and meningitis more often with CTLA-4 or combined blockade, myasthenia gravis more often with PD-(L)1 blockade, and encephalitis more often with PD-(L)1 blockade or combinations than with CTLA-4 blockade alone. The consensus definitions note that myasthenia gravis can be a new illness or an exacerbation of myasthenia the person already had, and that people with a known immune-mediated neurological disorder may benefit from a neurological evaluation before or soon after starting. Children are not addressed by these sources.",
  trigger: "New weakness, drooping eyelids, double vision, difficulty swallowing or speaking, breathlessness from weakness, ascending numbness or weakness, headache with neck stiffness, sensitivity to light or low-grade fever, confusion, behaviour change or seizure during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Refer every neurological side effect to a neurologist, whatever its grade",
      why: "The symptoms of these conditions overlap and can be ambiguous, and they can be fatal or leave lasting harm.",
      source: "sitc-2021",
      quote: "Patients diagnosed with neurological irAEs should be referred to a specialist, regardless of severity.",
    },
    {
      action: "For any myasthenia symptoms, consult neurology, test myasthenia antibodies, look for myositis, myocarditis and thyroid disease, and measure negative inspiratory force and vital capacity",
      why: "Myasthenia can come together with heart and muscle inflammation, and weakness of the diaphragm can compromise breathing.",
      source: "sitc-2021",
      quote: "Workup should include diagnostic antibody testing for myasthenia gravis and evaluation for concurrent myositis, myocarditis, and thyroid dysfunction. Electrodiagnostic studies may be performed to distinguish myasthenia gravis from myositis. Pulmonary function should be assessed with negative inspiratory force (NIF) and vital capacity (VC).",
    },
    {
      action: "For diagnosed myasthenia gravis, stop the checkpoint inhibitor and give IVIG or plasma exchange with steroids and pyridostigmine, with frequent breathing assessments",
      why: "SITC calls immunoglobulin and plasma exchange the standard of care for myasthenia gravis, and the breathing muscles can be affected.",
      source: "sitc-2021",
      quote: "Patients diagnosed with myasthenia gravis should discontinue ICI therapy and should receive IVIG or PLEX with corticosteroid therapy and pyridostigmine. These patients should receive frequent pulmonary assessments",
      grade: "LE: 1",
    },
    {
      action: "For grade 2 myasthenia gravis, give prednisone 1 to 1.5 mg/kg by mouth daily (or equivalent), taper as symptoms improve, and consider pyridostigmine from 30 mg three times a day up to at most 120 mg four times a day",
      why: "The steroid dose is tapered by how the symptoms improve, and pyridostigmine is raised gradually as tolerated.",
      source: "sitc-2021",
      quote: "For patients with grade 2 myasthenia gravis, in addition to consultation with neurology and discontinuation of ICI, corticosteroids should be administered (prednisone, 1–1.5 mg/kg oral or equivalent daily) and tapered based on symptom improvement. Pyridostigmine may be considered, starting at 30 mg orally three times a day and gradually increase to a maximum of 120 mg orally four times a day as tolerated and based on symptoms",
      grade: "LE: 1",
    },
    {
      action: "Admit grade 3 to 4 myasthenia, possibly to intensive care, stop the checkpoint inhibitor permanently and review daily",
      why: "SITC describes myasthenia gravis as having a high potential for fatality; steroids are continued, and IVIG 2 g/kg over 5 days or plasmapheresis for 5 days may be considered.",
      source: "sitc-2021",
      quote: "Patients with grade 3 or 4 myasthenia gravis should be admitted to the hospital and may need ICU-level monitoring. ICIs should be permanently discontinued, and frequent pulmonary function assessments and daily neurological review should be performed.",
    },
    {
      action: "For suspected Guillain-Barré syndrome, obtain spine MRI, lumbar puncture, EMG, nerve conduction studies and ganglioside antibodies",
      why: "The spine MRI is there to rule out a lesion pressing on the spinal cord, which can look similar.",
      source: "sitc-2021",
      quote: "Workup for patients with suspected Guillain-Barré syndrome should include MRI of the spine to rule out a compressive lesion, LP, EMG, nerve conduction studies, and ganglioside antibody panel of blood and CSF.",
    },
    {
      action: "For diagnosed Guillain-Barré syndrome, stop the checkpoint inhibitor permanently, give IVIG or plasma exchange with steroids, and assess breathing frequently",
      why: "SITC always stops the checkpoint inhibitor for good after Guillain-Barré syndrome, and asks for frequent pulmonary assessments.",
      source: "sitc-2021",
      quote: "Patients diagnosed with Guillain-Barré syndrome should always permanently discontinue ICI therapy, and should receive IVIG or PLEX with corticosteroid therapy",
      grade: "LE: 1",
    },
    {
      action: "Image the head (CT or MRI) before lumbar puncture",
      why: "A mass in the head can make lumbar puncture dangerous, and the puncture can itself change how the lining of the brain looks on a scan.",
      source: "neuro-definitions-2021",
      quote: "Head imaging (CT or MRI) should be performed prior to lumbar puncture (LP) to exclude mass lesions that may cause herniation and because LP can cause pachymeningeal enhancement.",
    },
    {
      action: "For suspected aseptic meningitis, obtain brain and pituitary MRI, lumbar puncture, cortisol and ACTH, and give antibiotics until bacterial meningitis is excluded",
      why: "Infectious meningitis, cancer in the meninges and, where there is headache, hypophysitis all have to be ruled out.",
      source: "sitc-2021",
      quote: "Workup for patients with suspected aseptic meningitis should include MRI of the brain and pituitary with and without contrast, lumbar puncture (LP), cortisol, and ACTH.",
    },
    {
      action: "For aseptic meningitis of any grade, and for ocular myasthenia or non-Guillain-Barré polyneuropathy of grade 2 or less, give prednisone 0.5 to 1 mg/kg/day or equivalent, by severity",
      why: "These milder forms are treated with a lower steroid dose than encephalitis or Guillain-Barré syndrome.",
      source: "sitc-2021",
      quote: "Patients with ocular myasthenia of grade ≤2, non-Guillain-Barré polyneuropathy of grade ≤2 (LE: 2), or aseptic meningitis (LE: 4) of any grade should receive 0.5–1 mg/kg/day of prednisone or equivalent depending on severity.",
    },
    {
      action: "For suspected encephalitis, obtain brain MRI, lumbar puncture, EEG, blood count, metabolic and thyroid panels, autoimmune and paraneoplastic panels of blood and spinal fluid and infection PCR, and give an empirical antiviral until viral encephalitis is excluded",
      why: "Viral encephalitis is covered with treatment until the tests rule it out.",
      source: "sitc-2021",
      quote: "Workup for patients with suspected encephalitis should include MRI of the brain, LP, CBC, CMP, autoimmune encephalopathy and paraneoplastic panels of blood and cerebrospinal fluid (CSF), PCR for infectious encephalitis, thyroid panel, and electroencephalogram (EEG).",
    },
    {
      action: "For encephalitis or Guillain-Barré syndrome of any grade, give pulse methylprednisolone 1000 mg IV daily for 3 to 5 days plus IVIG or plasma exchange",
      why: "SITC treats these two conditions with pulse-dose steroids and a second immune treatment at any grade, rather than stepping up by grade.",
      source: "sitc-2021",
      quote: "Patients with any grade of encephalitis or Guillain-Barré syndrome should receive pulse-dose methylprednisolone at 1000 mg IV daily for 3–5 days, and should additionally receive IVIG or PLEX.",
    },
    {
      action: "If encephalitis does not respond to pulse steroids, consider IVIG, plasma exchange or rituximab",
      why: "SITC says these patients may receive one of three further immune treatments, and prints a schedule for each.",
      source: "sitc-2021",
      quote: "If ICI-related encephalitis does not respond to pulse-dose corticosteroids, patients may receive IVIG (2 g/kg in divided doses over the course of 5 days), PLEX (one session every other day for 5–7 cycles), or rituximab (375 mg/m2 weekly infusion for 4 weeks)",
      grade: "LE: 1",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 is the guideline read in full, and it grades its key treatments LE: 1: IVIG or plasma exchange with steroids and pyridostigmine for myasthenia gravis, IVIG or plasma exchange with steroids and permanent discontinuation for Guillain-Barré syndrome, and IVIG, plasma exchange or rituximab (as options that may be given) for encephalitis that does not respond to pulse steroids. The references SITC cites for these grades are systematic reviews of the same diseases outside immunotherapy: a Cochrane review of corticosteroids for myasthenia gravis, a systematic review of immune therapy in autoimmune encephalitis and a systematic review of immunotherapy for Guillain-Barré syndrome. SITC is not fully consistent on strength: its headline myasthenia statement says patients should receive IVIG or plasma exchange and pyridostigmine, while its grade-specific text says pyridostigmine (grade 2) and IVIG or plasmapheresis (grade 3 to 4) may be considered. The 2021 neurologic consensus definitions do not give treatment but standardise the diagnosis into seven core disorders with a level of certainty, and say the panel would generally treat probable and sometimes possible cases. The ASCO 2021 abstract makes some neurological toxicities an exception to continuing treatment at grade 1. ESMO 2022 could not be read.",
    sources: ["sitc-2021", "neuro-definitions-2021", "asco-2021", "esmo-2022"],
  },
  variants: [
    {
      name: "Seven core disorders with diagnostic certainty (2021 neurologic consensus definitions)",
      differs: "Classifies each event as immune-related meningitis, encephalitis, demyelinating disease, vasculitis, neuropathy, neuromuscular junction disorder or myopathy, each as definite, probable or possible, with subtype, severity, antibody association, whether it is new or an exacerbation of an earlier condition, and any concurrent irAE recorded.",
      evidence: "Modified Delphi consensus of 27 panellists from 15 academic centres; definitions, not graded recommendations.",
      sources: ["neuro-definitions-2021"],
    },
  ],
  grades: [
    { claim: "Myasthenia gravis: stop the checkpoint inhibitor; IVIG or plasma exchange with steroids and pyridostigmine; frequent pulmonary assessments", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Grade 2 myasthenia gravis: prednisone 1 to 1.5 mg/kg daily, tapered on improvement; pyridostigmine may be considered, 30 mg three times a day up to 120 mg four times a day", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Grade 3 to 4 myasthenia gravis: corticosteroids should be continued", grade: "LE: 3", source: "sitc-2021", quote: "Corticosteroids should be continued (LE: 3). Additionally, IVIG 2 g/kg over 5 days (0.4 g/kg/day) or plasmapheresis for 5 days may be considered." },
    { claim: "Guillain-Barré syndrome: permanent discontinuation; IVIG or plasma exchange with steroids", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Encephalitis not responding to pulse-dose steroids: IVIG, plasma exchange or rituximab may be given", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Ocular myasthenia or non-Guillain-Barré polyneuropathy of grade 2 or less: prednisone 0.5 to 1 mg/kg/day (the LE is printed after the polyneuropathy clause)", grade: "LE: 2", source: "sitc-2021" },
    { claim: "Aseptic meningitis of any grade: prednisone 0.5 to 1 mg/kg/day", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Painful peripheral neuropathy: gabapentin, pregabalin or duloxetine until it resolves", grade: "LE: 1", source: "sitc-2021", quote: "Patients diagnosed with painful peripheral neuropathy should receive neuropathic pain medication such as gabapentin, pregabalin, or duloxetine until neuropathy resolves" },
    { claim: "Some neurological toxicities are an exception to continuing the checkpoint inhibitor with close monitoring at grade 1", grade: "expert consensus", source: "asco-2021", quote: "in general, ICPi therapy should be continued with close monitoring for grade 1 toxicities, except for some neurologic, hematologic, and cardiac toxicities" },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-17" },
    {
      key: "neuro-definitions-2021",
      label: "Consensus disease definitions for neurologic immune-related adverse events of immune checkpoint inhibitors",
      publisher: "Journal for ImmunoTherapy of Cancer",
      year: 2021,
      url: "https://europepmc.org/article/PMC/PMC8291304",
      doi: "10.1136/jitc-2021-002890",
      gradingScheme: "Modified Delphi consensus using the RAND/UCLA Appropriateness Method; disease definitions, not graded recommendations.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    { ...ASCO_ICI_2021, accessed: "2026-11-17" },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ASCO 2021 guideline was read only as its abstract and its neurological tables are not compared here. Which neurological toxicities are its exceptions at grade 1 is therefore not stated here.",
    "SITC's LE: 1 grades cite systematic reviews of myasthenia gravis, autoimmune encephalitis and Guillain-Barré syndrome outside immunotherapy; the sources read give no trial of these treatments in checkpoint inhibitor patients, and the consensus definitions call themselves a step towards future evidence-based management.",
    "SITC sets permanent discontinuation for Guillain-Barré syndrome and for grade 3 to 4 myasthenia gravis, and discontinuation (without the word permanently) for myasthenia gravis in general. For encephalitis, aseptic meningitis and other neuropathies it prints no neurology-specific rule on stopping or restarting, so its general rules apply: withhold at grade 2, and weigh any rechallenge after grade 3 or 4 against the expected benefit (LE: 3).",
    "Neither source read gives a list of medicines to avoid in myasthenia gravis, a threshold of negative inspiratory force or vital capacity for intensive care or ventilation, or a mortality figure for checkpoint inhibitor myasthenia; SITC says only that it has a high potential for fatality. On 17 November 2026 a figure of about 20% mortality that this page had carried was removed because neither source prints it.",
    "SITC asks for pulse methylprednisolone with IVIG or plasma exchange for any grade of encephalitis, and then lists IVIG and plasma exchange again among the options if pulse steroids fail; it does not say how the two statements fit together.",
    "The consensus definitions paper carries a December 2021 correction (a missing section of its table 6 was restored); no later edition was found in Europe PMC on 17 November 2026.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "methylprednisolone", "human-normal-immunoglobulin", "rituximab", "gabapentin", "duloxetine"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-myocarditis", "irae-hypophysitis-adrenal", "irae-ocular"],
  tags: ["protocol", "irae", "acute-oncology", "neurology"],
});
