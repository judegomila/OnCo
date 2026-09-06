/**
 * Reading paths: curated sequences of OnCo pages for a purpose and an audience.
 * Every entityId is validated against the graph at build time (src/app/paths).
 */
export type ReadingPath = {
  id: string;
  title: string;
  audience: string;
  minutes: number;
  tldr: string;
  steps: Array<{ entityId: string; why: string }>;
};

export const paths: ReadingPath[] = [
  {
    id: "adcs-in-30-minutes", title: "ADCs in 30 minutes", audience: "Anyone who keeps hearing about Enhertu and wants to understand why", minutes: 30,
    tldr: "From the idea of a guided missile to the bispecific and dual-payload ADCs now in trials, in eleven pages.",
    steps: [
      { entityId: "adcs", why: "The front in one paragraph." },
      { entityId: "adc", why: "How the antibody, linker, and payload work together, and where they fail." },
      { entityId: "payload", why: "The warhead: why topoisomerase-I inhibitors took over." },
      { entityId: "linker", why: "Cleavable or not decides whether neighbouring cells die." },
      { entityId: "bystander-effect", why: "The single idea that explains HER2-low." },
      { entityId: "trastuzumab-deruxtecan", why: "The most successful ADC and what it changed." },
      { entityId: "sacituzumab-govitecan", why: "The first TROP2 ADC; now first line in TNBC." },
      { entityId: "adc-generations", why: "Twenty-five years in seven steps." },
      { entityId: "bispecific-adc", why: "The next generation, with the first positive phase 3." },
      { entityId: "adc-sequencing", why: "The unsolved clinical problem." },
      { entityId: "idea-payload-switching", why: "One proposal for solving it." },
    ],
  },
  {
    id: "understand-your-tnbc-diagnosis", title: "Understand your TNBC diagnosis", audience: "Patients and families newly facing triple-negative breast cancer", minutes: 40,
    tldr: "What 'triple-negative' means, what the standard treatment is and why, what the tests decide, and what is coming next.",
    steps: [
      { entityId: "tnbc", why: "Start here: the whole picture, standard of care by stage, and history." },
      { entityId: "her2-low", why: "Why the HER2 score of 0, 1+, or 2+ matters even in 'HER2-negative' cancer." },
      { entityId: "germline-testing", why: "Why every TNBC patient is offered inherited-gene testing." },
      { entityId: "brca", why: "What a BRCA result changes." },
      { entityId: "keynote-522", why: "The trial behind the pre-surgery chemo-immunotherapy you may be offered." },
      { entityId: "pcr", why: "What 'complete response' at surgery means for prognosis." },
      { entityId: "olympia", why: "Why some patients take a PARP inhibitor for a year afterwards." },
      { entityId: "checkpoint-inhibitor", why: "How immunotherapy works and its side effects." },
      { entityId: "cps", why: "The PD-L1 score that decides immunotherapy eligibility in metastatic disease." },
      { entityId: "tropion-breast02", why: "The 2026 first-line ADC trial with a survival benefit." },
      { entityId: "tils", why: "The immune-cell score that may let very small tumours skip chemotherapy." },
      { entityId: "tnbc-history", why: "Where the field has come from and where it is going." },
    ],
  },
  {
    id: "radiopharma-for-investors", title: "Radiopharma for investors", audience: "Analysts and investors sizing up theranostics", minutes: 35,
    tldr: "The science, the approved products, the supply bottleneck, and the alpha-emitter pipeline that drives the M&A.",
    steps: [
      { entityId: "radiopharma", why: "The front and its constraint: isotope supply." },
      { entityId: "theranostics", why: "The see-then-treat paradigm in one term." },
      { entityId: "psma-pet", why: "The gatekeeper scan that defines the treatable population." },
      { entityId: "pluvicto", why: "The best-selling radiopharmaceutical and its label history." },
      { entityId: "radioligand-therapy", why: "How beta emitters work and their limits." },
      { entityId: "alpha-vs-beta", why: "Why actinium is the prize." },
      { entityId: "targeted-alpha-therapy", why: "The phase 3 alpha programmes and the supply problem." },
      { entityId: "terrapower-isotopes", why: "Who is scaling actinium-225." },
      { entityId: "fap", why: "The pan-cancer stromal target that could widen the market." },
      { entityId: "beta-then-alpha", why: "The sequencing thesis." },
      { entityId: "radiopharma-roadmap", why: "The whole arc, historic to speculative." },
    ],
  },
  {
    id: "immunotherapy-from-zero", title: "Immunotherapy from zero", audience: "Readers with no biology background", minutes: 35,
    tldr: "How the immune system sees cancer, how tumours hide, how checkpoint inhibitors work, and where engineered immunity is heading.",
    steps: [
      { entityId: "immunotherapy", why: "The front." },
      { entityId: "pd1-checkpoint", why: "The pathway, with an analogy and a diagram." },
      { entityId: "checkpoint-inhibitor", why: "The drugs that release the brakes." },
      { entityId: "checkmate-067", why: "Ten-year survival data that proved cures are possible." },
      { entityId: "irae", why: "The cost: autoimmune side effects." },
      { entityId: "cold-vs-hot", why: "Why most patients still do not respond." },
      { entityId: "neoantigen", why: "What a personalised vaccine actually targets." },
      { entityId: "intismeran-autogene", why: "The first personalised vaccine to pass phase 3." },
      { entityId: "t-cell-engager", why: "Off-the-shelf T-cell redirection." },
      { entityId: "car-t", why: "Living drugs and their solid-tumour frontier." },
      { entityId: "immunotherapy-roadmap", why: "From Coley's toxins to in vivo CAR-T." },
    ],
  },
  {
    id: "early-detection-the-blood-test-debate", title: "Early detection: the blood test debate", audience: "Policy makers, clinicians, and curious patients", minutes: 25,
    tldr: "What a multi-cancer blood test can and cannot do, the trials that will decide, and the statistics you need to judge the claims.",
    steps: [
      { entityId: "early-detection", why: "The front and what screening has already achieved." },
      { entityId: "mced", why: "The technology, its promise, and its open questions." },
      { entityId: "galleri", why: "The test in front of the FDA in September 2026." },
      { entityId: "ppv", why: "The number that decides how many false alarms a positive test causes." },
      { entityId: "stage-shift", why: "The endpoint the NHS trial measures, and why it is not the same as saving lives." },
      { entityId: "nhs-galleri", why: "The largest cancer screening trial ever run." },
      { entityId: "pathfinder-2", why: "The US real-world study behind the FDA submission." },
      { entityId: "shield", why: "The blood test already approved for one cancer." },
      { entityId: "idea-mced-plus-fapi", why: "A proposal for what to do after a positive result." },
      { entityId: "early-detection-roadmap", why: "The path from Pap smears to a single annual draw." },
    ],
  },
  {
    id: "living-well-during-and-after-treatment", title: "Living well during and after treatment", audience: "Patients, caregivers, and survivors", minutes: 25,
    tldr: "The supportive-care tools with real evidence: exercise, heart protection, hair preservation, fitness assessment for older adults, and the questions to ask.",
    steps: [
      { entityId: "supportive-care", why: "The front that gets the least attention and changes daily life the most." },
      { entityId: "exercise-oncology", why: "Structured exercise improved survival in a randomised trial." },
      { entityId: "idea-exercise-as-adjuvant", why: "Why exercise should be prescribed like a drug." },
      { entityId: "cardio-oncology", why: "Protecting the heart from anthracyclines, HER2 drugs, and immunotherapy." },
      { entityId: "scalp-cooling", why: "Keeping hair through taxane chemotherapy." },
      { entityId: "geriatric-assessment", why: "For older patients: fewer severe side effects without losing effect." },
      { entityId: "irae", why: "Immunotherapy side effects to recognise early." },
      { entityId: "ild", why: "The lung side effect of some ADCs, and why prompt reporting matters." },
      { entityId: "mrd-testing", why: "Blood tests during follow-up and what they can and cannot yet tell you." },
      { entityId: "cancer-commons", why: "Free navigation help when options run thin." },
    ],
  },
  {
    id: "kras-the-forty-year-target", title: "KRAS: the forty-year target", audience: "Scientists and biotech watchers", minutes: 30,
    tldr: "How the most important cancer gene went from undruggable to a pan-RAS drug in pivotal trials for pancreatic cancer.",
    steps: [
      { entityId: "kras", why: "The target." },
      { entityId: "ras-mapk", why: "The pathway and the feedback loops that defeat single agents." },
      { entityId: "oncogene-addiction", why: "Why blocking one gene can collapse a tumour." },
      { entityId: "sotorasib", why: "The first KRAS drug." },
      { entityId: "kras-plus-egfr-crc", why: "Why colorectal cancer needs a partner drug." },
      { entityId: "daraxonrasib", why: "The pan-RAS inhibitor in phase 3 for pancreatic cancer." },
      { entityId: "pancreatic", why: "The cancer where this matters most." },
      { entityId: "idea-shared-kras-vaccine-adjuvant", why: "Vaccines against the same mutations." },
      { entityId: "kras-roadmap", why: "Discovery to speculation in six steps." },
    ],
  },
];
