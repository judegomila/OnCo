import { protocol } from "./helpers";

/*
 * Metastatic spinal cord compression (MSCC): recognition, the MSCC coordinator, whole-spine MRI, dexamethasone,
 * immobilisation, radiotherapy and surgery.
 *
 * What was read, and how (11 November 2026, fetched raw with curl and read as text):
 * - NICE NG234 (September 2023, minor changes March 2026), the recommendations page in full and the update-information
 *   page. NG234 replaced CG75 (2008); its bisphosphonate recommendations are still the 2008 text.
 * - ASTRO 2024 clinical practice guideline on external beam radiotherapy for symptomatic bone metastases: abstract only
 *   from the Europe PMC REST API; the publisher page was not tried after Elsevier journals refused a script elsewhere
 *   in this round.
 * - SCORAD III (JAMA 2019) and Patchell et al. (Lancet 2005): abstracts from Europe PMC.
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes checked by script.
 */
export const metastaticSpinalCordCompression = protocol({
  id: "metastatic-spinal-cord-compression-emergency",
  name: "Metastatic spinal cord compression: recognition, MSCC coordinator, MRI, dexamethasone, radiotherapy and surgery",
  aka: ["MSCC protocol", "malignant spinal cord compression", "spinal cord compression emergency", "cauda equina compression in cancer", "NICE NG234"],
  domain: "emergencies",
  tldr: "Cancer that has spread to the spine can press on the spinal cord. New back or neck pain that is severe, worse at night or on coughing, or any weakness, numbness, or trouble passing urine or stools, needs a same-day call to your cancer team. The hospital should do an MRI of the whole spine within 24 hours, give dexamethasone, and plan radiotherapy or surgery quickly, to keep you walking.",
  simple: "If cancer is in your spine, it can squeeze the nerves. Back pain that keeps you awake, weak or numb legs, or trouble with your bladder or bowels is an emergency. Ring your cancer team at once.",
  summary: "NICE NG234 (2023) sets out the UK pathway. Anyone with a past or current cancer who develops symptoms or signs of cord compression (bladder or bowel dysfunction, gait disturbance, limb weakness, sensory loss, radicular pain) is an oncological emergency: contact the MSCC coordinator immediately, a service that must be covered 24 hours a day. Pain suggesting spinal metastases alone (severe, progressive, mechanical, worse on straining, waking at night, localised tenderness) needs coordinator advice within 24 hours and an MRI within a week.\n\nSuspected MSCC: MRI as soon as possible and always within 24 hours, locally, with sagittal T1 and/or STIR of the whole spine; overnight MRI only if treatment would start immediately; CT if MRI is contraindicated; never a plain X-ray. Immobilise without delay if there are neurological signs or suspected instability, lying flat. Give dexamethasone 16 mg as soon as possible and daily until surgery or radiotherapy, then taper, with glucose monitoring and a proton pump inhibitor; stop it if MSCC is ruled out.\n\nTreatment is planned by the MSCC multidisciplinary team. Surgery to halt or reverse neurological decline as soon as possible after onset (Patchell 2005: 84% walking after surgery plus radiotherapy against 57% after radiotherapy alone). Otherwise urgent radiotherapy within 24 hours, 8 Gy in one fraction unless at high risk of side effects; NICE excludes people with complete paralysis for 2 weeks or more with controlled pain, or a poor prognosis. SCORAD III found single-fraction 8 Gy narrowly missed non-inferiority to 20 Gy in 5 fractions for walking at 8 weeks (69.3% against 72.7%). ASTRO 2024 recommends 8 Gy/1, 16 Gy/2, 20 Gy/5 or 30 Gy/10 for patients not having surgery, and conditionally recommends surgery with postoperative radiotherapy over radiotherapy alone.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "radiographer", "surgical-team", "multidisciplinary-team", "emergency-team"],
    where: ["home", "telephone-triage", "acute-oncology-service", "emergency-department", "ward", "radiotherapy-department", "theatre"],
  },
  population: "Adults with a past, current or suspected cancer who develop back or neck pain suggesting spinal metastases or symptoms and signs of spinal cord or cauda equina compression. NICE NG234 applies also to direct malignant infiltration of the spine. People with haematological cancers (lymphoma, myeloma) have specific steroid advice. Children are not covered by NG234.",
  trigger: "A person with cancer reports new or worsening back pain with the features in NICE's box 1, or any limb weakness, numbness, unsteadiness, or bladder or bowel change.",
  steps: [
    {
      action: "Make sure people with spinal metastases, and their families, know which symptoms to report and whom to contact",
      why: "Most cord compression starts at home, and time to treatment decides whether someone keeps walking.",
      source: "nice-ng234",
      quote: "Ensure that people with suspected or confirmed spinal metastases or MSCC and their families and carers know who to contact if they develop new symptoms or signs (see box 1 ) or if their existing symptoms worsen.",
    },
    {
      action: "If a person with cancer has symptoms or signs of cord compression, contact the MSCC coordinator immediately and treat it as an emergency",
      why: "Weakness, numbness or bladder and bowel problems mean the cord is already under pressure.",
      source: "nice-ng234",
      quote: "Immediately contact the MSCC coordinator if a person with a past or current diagnosis of cancer presents with the symptoms or signs of cord compression listed in box 1. Treat this as an oncological emergency.",
    },
    {
      action: "If there is only pain suggesting spinal metastases, seek advice through the MSCC coordinator within 24 hours",
      why: "Pain often comes before compression; finding the metastasis early allows treatment before nerves are damaged.",
      source: "nice-ng234",
      quote: "Seek advice through the MSCC coordinator (within 24 hours) if a person with a past or current diagnosis of cancer presents with pain with the characteristics suggesting spinal metastases listed in box 1.",
    },
    {
      action: "Immobilise without delay, including for transfer, anyone with suspected MSCC and neurological signs or signs of spinal instability, nursing them flat",
      why: "An unstable spine can collapse further with movement.",
      source: "nice-ng234",
      quote: "Start immobilisation without delay (including for transfer to hospital) for people with: suspected or confirmed MSCC and neurological symptoms or signs suggesting spinal instability",
    },
    {
      action: "Give pain relief straight away, including while waiting for scans or treatment",
      why: "Pain is usually severe and should not wait for the diagnosis.",
      source: "nice-ng234",
      quote: "Ensure pain relief is provided promptly for people with suspected or confirmed spinal metastases or MSCC, including while the person is waiting for investigations or treatment.",
    },
    {
      action: "Give dexamethasone 16 mg by mouth (or the equivalent by injection) as soon as possible to people with neurological symptoms or signs, then 16 mg daily until surgery or radiotherapy",
      why: "Dexamethasone reduces swelling around the cord while definitive treatment is arranged.",
      source: "nice-ng234",
      quote: "Offer 16 mg of oral dexamethasone (or equivalent parenteral dose) as soon as possible.",
    },
    {
      action: "While on dexamethasone, monitor blood glucose and give a proton pump inhibitor; reduce it gradually after surgery or once radiotherapy starts, and stop it if MSCC is ruled out",
      why: "High-dose steroids raise blood sugar and irritate the stomach, and are not needed once the cause is treated or excluded.",
      source: "nice-ng234",
      quote: "If dexamethasone is given before imaging, and spinal metastases and MSCC are subsequently ruled out, discontinue it.",
    },
    {
      action: "Arrange an MRI as soon as possible and always within 24 hours, at the local hospital where possible",
      why: "MRI shows where and how badly the cord is compressed, which decides surgery or radiotherapy.",
      source: "nice-ng234",
      quote: "Offer an MRI scan to people with suspected MSCC (see recommendation 1.3.2 ), to be done: as soon as possible (and always within 24 hours) at the local hospital or appropriate centre with direct access to imaging facilities.",
    },
    {
      action: "Scan the whole spine, with sagittal T1 and/or STIR, sagittal T2 and axial images through any abnormality",
      why: "Metastases are often at more than one level.",
      source: "nice-ng234",
      quote: "MRI of the spine should include: sagittal T1 and/or short TI inversion recovery (STIR) sequences of the whole spine, to identify spinal metastases",
    },
    {
      action: "Do overnight MRI only when treatment would start immediately; use CT if MRI is contraindicated, and never a plain X-ray",
      why: "Plain X-rays miss most spinal metastases and cord compression.",
      source: "nice-ng234",
      quote: "Do not do a plain X-ray of the spine to diagnose or rule out spinal metastases or MSCC.",
    },
    {
      action: "Plan treatment in the MSCC multidisciplinary team, including an oncologist and a spinal surgeon",
      why: "The choice between surgery and radiotherapy depends on stability, neurology, the cancer and prognosis.",
      source: "nice-ng234",
      quote: "Before an invasive intervention is offered, make a treatment plan in discussion with the appropriate specialists (such as an oncologist and spinal surgeon) within the MSCC service multidisciplinary team.",
    },
    {
      action: "Offer surgery intended to halt or reverse neurological decline as soon as possible after neurological symptoms start, where suitable",
      why: "In a randomised trial, more people walked after surgery followed by radiotherapy than after radiotherapy alone.",
      source: "nice-ng234",
      quote: "Offer surgical intervention intended to halt or reverse neurological decline as soon as possible after the onset of neurological symptoms or signs indicating MSCC.",
    },
    {
      action: "If surgery is not suitable, give urgent radiotherapy within 24 hours, usually 8 Gy in a single fraction",
      why: "Radiotherapy shrinks the tumour pressing on the cord; a single dose means one visit.",
      source: "nice-ng234",
      quote: "Use 8 Gy single fraction radiotherapy for people with MSCC having radiotherapy unless they are at high risk of side effects.",
    },
    {
      action: "After surgery, give postoperative radiotherapy once the person has recovered",
      why: "Radiotherapy after surgery treats the tumour left behind.",
      source: "nice-ng234",
      quote: "Offer postoperative radiotherapy after the person has recovered from surgery for spinal metastases or MSCC.",
    },
    {
      action: "Test spinal stability with graded sitting and then weight bearing, watching neurology and pain throughout",
      why: "Getting up safely and early prevents the harms of bed rest; a rise in pain or new weakness means stop and reassess.",
      source: "nice-ng234",
      quote: "If assessment, including imaging, suggests spinal stability is likely (before or after treatment), start testing this by graded sitting followed by weight bearing.",
    },
    {
      action: "Plan discharge and rehabilitation from admission",
      why: "Many people need equipment, carers' training and community support to go home.",
      source: "nice-ng234",
      quote: "Start planning for discharge and ongoing care, including rehabilitation, on admission to hospital.",
    },
  ],
  bestInClass: {
    statement: "NICE NG234 (2023) is the most recent full guideline that could be read: immediate MSCC coordinator contact for neurological signs, MRI of the whole spine within 24 hours, dexamethasone 16 mg as soon as possible, immobilisation for suspected instability, surgery as soon as possible after neurological onset where suitable, and otherwise radiotherapy within 24 hours as 8 Gy in one fraction. ASTRO 2024 agrees on dexamethasone for cord compression and conditionally recommends surgery with postoperative radiotherapy over radiotherapy alone, but accepts four schedules (8 Gy/1, 16 Gy/2, 20 Gy/5, 30 Gy/10) for those not having surgery, where NICE prefers the single fraction. The trial evidence behind the choice: SCORAD III found 8 Gy in one fraction did not formally meet non-inferiority against 20 Gy in 5 fractions for walking at 8 weeks (69.3% against 72.7%; lower confidence bound -11.5% against a -11% margin), and Patchell 2005 found surgery plus radiotherapy kept more people walking than radiotherapy alone (84% against 57%).",
    sources: ["nice-ng234", "astro-2024", "scorad-2019", "patchell-2005"],
  },
  variants: [
    {
      name: "Four accepted radiotherapy schedules (ASTRO 2024)",
      differs: "For cord or cauda equina compression in people not eligible for surgery, recommends 8 Gy in 1 fraction, 16 Gy in 2, 20 Gy in 5 or 30 Gy in 10, chosen after a whole-person assessment and shared decision making, rather than a default single fraction.",
      evidence: "Recommendation strength and evidence quality assessed by the ASTRO task force from an AHRQ systematic review; only the abstract was read, so the printed grades are not quoted.",
      sources: ["astro-2024"],
    },
    {
      name: "Multiple fractions for people at high risk of side effects (NICE NG234)",
      differs: "Considers multiple-fraction radiotherapy when a large treatment field is needed or there has been previous radiotherapy.",
      evidence: "NICE recommendation; NICE does not grade.",
      sources: ["nice-ng234"],
    },
    {
      name: "Single fraction against five fractions (SCORAD III trial)",
      differs: "Randomised 686 people in UK and Australian centres to 8 Gy once or 20 Gy in 5 daily fractions. Walking at 8 weeks was 69.3% against 72.7%, narrowly missing the non-inferiority criterion; at 1, 4 and 12 weeks single fraction met it, and survival at 12 weeks was similar.",
      evidence: "Randomised controlled trial (abstract read).",
      sources: ["scorad-2019"],
    },
  ],
  grades: [
    { claim: "MRI within 24 hours for suspected MSCC", grade: "not graded (NICE uses wording, 'offer')", source: "nice-ng234" },
    { claim: "Dexamethasone 16 mg as soon as possible for neurological symptoms or signs", grade: "not graded (NICE uses wording, 'offer')", source: "nice-ng234" },
    { claim: "8 Gy single fraction unless at high risk of side effects", grade: "not graded (NICE uses wording, 'use')", source: "nice-ng234" },
    { claim: "Surgery and postoperative radiotherapy over radiotherapy alone for cord or cauda equina compression", grade: "conditional recommendation", source: "astro-2024", quote: "Regarding other modalities with RT, for patients with spine metastases causing spinal cord or cauda equina compression, surgery and postoperative RT are conditionally recommended over RT alone." },
    { claim: "Dexamethasone for spine metastases with cord or cauda equina compression", grade: "recommended (strength not stated in abstract)", source: "astro-2024", quote: "Furthermore, dexamethasone is recommended for spine metastases with spinal cord or cauda equina compression." },
  ],
  sources: [
    { key: "nice-ng234", label: "Spinal metastases and metastatic spinal cord compression (NG234), recommendations", publisher: "NICE", year: 2023, url: "https://www.nice.org.uk/guidance/ng234/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; strength is in the wording ('offer', 'consider', 'do not'). Each is dated [2023] or [2008]. Published September 2023, replacing CG75; minor changes August 2024 and March 2026.", read: "full-text", accessed: "2026-11-11" },
    { key: "astro-2024", label: "External Beam Radiation Therapy for Palliation of Symptomatic Bone Metastases: An ASTRO Clinical Practice Guideline", publisher: "ASTRO, Practical Radiation Oncology", year: 2024, url: "https://europepmc.org/abstract/MED/38788923", doi: "10.1016/j.prro.2024.04.018", gradingScheme: "ASTRO consensus methodology with evidence quality and recommendation strength (strong or conditional); grades per recommendation were not read, only the abstract.", read: "abstract", accessed: "2026-11-11" },
    { key: "scorad-2019", label: "Effect of Single-Fraction vs Multifraction Radiotherapy on Ambulatory Status Among Patients With Spinal Canal Compression From Metastatic Cancer: The SCORAD Randomized Clinical Trial", publisher: "JAMA", year: 2019, url: "https://europepmc.org/abstract/MED/31794625", doi: "10.1001/jama.2019.17913", read: "abstract", accessed: "2026-11-11" },
    { key: "patchell-2005", label: "Direct decompressive surgical resection in the treatment of spinal cord compression caused by metastatic cancer: a randomised trial", publisher: "The Lancet", year: 2005, url: "https://europepmc.org/abstract/MED/16112300", doi: "10.1016/S0140-6736(05)66954-1", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "NICE's bisphosphonate recommendations for spinal metastases were last reviewed in 2008, and NICE says it will review them later; they are not used as steps here.",
    "The ASTRO 2024 guideline was read only as its abstract, so the evidence quality and strength printed beside each schedule are not quoted.",
    "The ESMO guideline on bone health in cancer was not looked at for this page; a European position on MSCC is therefore missing.",
    "NICE gives no evidence grade for the 16 mg dexamethasone dose; trials comparing lower doses were not read here.",
    "The best timing of surgery after complete paraplegia is unsettled; NICE says not to use a time limit as the only factor.",
  ],
  drugs: ["dexamethasone"],
  technologies: ["palliative-radiotherapy", "sbrt", "mri"],
  cancers: ["prostate", "breast-cancer", "lung-cancer", "multiple-myeloma"],
  institutions: ["nice", "astro"],
  terms: ["metastatic-spinal-cord-compression", "bone-metastases"],
  keyPapers: ["paper-hoskin-jama"],
  tags: ["protocol", "acute-oncology", "oncological-emergency"],
});
