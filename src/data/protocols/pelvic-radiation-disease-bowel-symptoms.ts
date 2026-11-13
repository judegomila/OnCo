import { protocol } from "./helpers";

/*
 * Recognising, investigating and managing the bowel effects of pelvic radiotherapy (pelvic radiation disease:
 * radiation proctopathy, enteritis and their consequences), in the months and years after treatment.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - Andreyev et al., "Guidance: The practical management of the gastrointestinal symptoms of pelvic radiation
 *   disease", Frontline Gastroenterology 2015 (published online June 2014): full text, Europe PMC full-text XML
 *   (PMC4283714). This is the algorithm used in the ORBIT randomised trial, peer reviewed by 65 clinicians in two
 *   rounds; it is a British Society of Gastroenterology journal's guidance, not a NICE guideline, and its steps carry
 *   panel agreement rather than evidence grades. The guidance calls the trial "a recent randomised trial" without
 *   naming it; it was identified through Europe PMC as ORBIT (Andreyev et al., Lancet 2013,
 *   doi 10.1016/S0140-6736(13)61648-7, title checked, not read).
 * - MASCC/ISOO clinical practice guidelines for mucositis (Elad et al., Cancer 2020), Table 3 (gastrointestinal
 *   mucositis): full text, Europe PMC (PMC7540329).
 * - ASGE guideline on the role of endoscopy for bleeding from chronic radiation proctopathy (Gastrointest Endosc
 *   2019): abstract only.
 * - ASCRS clinical practice guidelines for the treatment of chronic radiation proctitis (Dis Colon Rectum 2018):
 *   title resolved, no abstract or text available to a script; named, nothing rests on it.
 * A Europe PMC search on 11 November 2026 for guidelines, guidance or consensus on pelvic radiation disease, radiation
 * proctitis, proctopathy or enteritis from 2015 to 2026 found only the ASGE 2019 guideline, a Chinese consensus (2018,
 * not read) and the 2015 guidance.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text.
 */
export const pelvicRadiationDiseaseBowelSymptoms = protocol({
  id: "pelvic-radiation-disease-bowel-symptoms",
  name: "Bowel effects after pelvic radiotherapy (pelvic radiation disease): assessment and management",
  aka: ["pelvic radiation disease", "radiation proctitis", "radiation proctopathy", "radiation enteritis", "bowel problems after radiotherapy", "late bowel effects of radiotherapy", "rectal bleeding after radiotherapy", "bile acid malabsorption after radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy to the pelvis (for prostate, bladder, cervix, womb, rectal or anal cancer) can change how the bowel works for months or years: urgency, loose stools, wind, leakage or bleeding. Most of it has a cause that can be found and treated, often more than one, so ask for a proper assessment rather than being told it is just something to live with.",
  simple: "After radiotherapy to the lower tummy, the bowel can work differently for a long time. Tell your team about diarrhoea, urgency, leaking, bleeding or waking at night to open your bowels. There are tests and treatments that help.",
  summary: "The reference is the 2015 Frontline Gastroenterology guidance (Andreyev et al.), the algorithm used in the ORBIT randomised trial, in which an algorithmic approach helped and trained nurses managed patients as well as a gastroenterologist; 65 clinicians reviewed it and agreed 27 of 28 sections. Its principles: patients can have many symptoms at once, each with more than one cause, so investigate systematically and order all first-line tests at the first visit; irritable bowel syndrome is rarely the right diagnosis here; endoscopy or surgery in irradiated tissue carries more risk, and irradiated areas are not biopsied. Common treatable causes are bile acid malabsorption (SeHCAT; a sequestrant for moderate or severe), small intestinal bacterial overgrowth (breath test or aspirate), carbohydrate intolerance, exocrine pancreatic insufficiency after para-aortic fields, and pelvic floor dysfunction (at least six weeks of exercises). Faecal calprotectin is not recommended in this group. Bleeding from telangiectasia usually starts 6 to 12 months after treatment and settles by 8 to 10 years: reassure if it is not affecting life; otherwise stop anticoagulants if possible and consider sucralfate enemas, then hyperbaric oxygen (RCT support; MASCC/ISOO suggests it, level II), formalin or thermal ablation such as argon plasma coagulation, which the guidance says is absolutely contraindicated after brachytherapy. The ASGE (2019) found argon plasma coagulation and other endoscopic methods effective from small observational studies. MASCC/ISOO suggests Lactobacillus probiotics to prevent radiation diarrhoea (level III).",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "home"],
  },
  population: "Adults with bowel symptoms during or after pelvic radiotherapy for any cancer (prostate, bladder, cervix, uterus, rectum, anus), including brachytherapy. The guidance was written mainly for clinical nurse specialists working with a gastroenterologist, and for general practitioners. Acute diarrhoea during treatment is covered only by the MASCC/ISOO probiotic suggestion; children are not covered.",
  trigger: "A person who has had pelvic radiotherapy reports a change in bowel function (frequency, urgency, loose stools, leakage, wind, pain, bleeding, waking at night to open the bowels), at any time after treatment.",
  steps: [
    {
      action: "Take a structured history of every bowel symptom, using a Bristol Stool Chart and, where possible, a questionnaire the patient fills in beforehand",
      why: "People often have several symptoms at once, and words like 'diarrhoea' mean different things to different people.",
      source: "andreyev-prd-2015",
      quote: "Tools such as a Bristol Stool Chart can often clarify exactly what patients mean.",
    },
    {
      action: "Ask specifically about oily, pale, floating or hard-to-flush stools, waking at night to open the bowels, rapid weight loss and links to food or new medicines",
      why: "These point to causes that can be treated, such as fat malabsorption, and are easily missed.",
      source: "andreyev-prd-2015",
      quote: "Patients and clinicians alike often miss the presence of intermittent steatorrhoea—ask:",
    },
    {
      action: "Investigate every symptom systematically, and order all first-line tests at the first visit",
      why: "Each symptom can have more than one cause; testing everything at once means treatment can start sooner and fewer visits are needed.",
      source: "andreyev-prd-2015",
      quote: "Arranging all investigations at the first consultation reduces follow-up and allows directed treatment at all causes for symptoms at the earliest opportunity.",
    },
    {
      action: "Do not settle for a diagnosis of irritable bowel syndrome",
      why: "In people who have had pelvic radiotherapy, specialist units almost always find a specific cause instead.",
      source: "andreyev-prd-2015",
      quote: "Specialist centres only very rarely reach a new diagnosis of ‘irritable bowel syndrome’ in this patient group.",
    },
    {
      action: "Do not use faecal calprotectin to look for bowel inflammation in this group",
      why: "It is too unspecific after radiotherapy to guide care.",
      source: "andreyev-prd-2015",
      quote: "Note: faecal calprotectin as a marker for bowel inflammation is too non-specific and hence not recommended in this population.",
    },
    {
      action: "Test for bile acid malabsorption (SeHCAT scan) in loose stools, and treat moderate or severe malabsorption with a bile acid sequestrant and a lower-fat diet",
      why: "Radiotherapy can damage the part of the small bowel that reabsorbs bile, and the bile then causes diarrhoea; binding it often helps a great deal.",
      source: "andreyev-prd-2015",
      quote: "For severe BAM developing after radiotherapy, most patients need a bile acid sequestrant and advice about long-term reduction in dietary fat intake.",
    },
    {
      action: "In moderate or severe bile acid malabsorption, check trace elements and fat-soluble vitamins periodically and replace them",
      why: "Long-term malabsorption and sequestrant treatment can leave people short of vitamins and minerals.",
      source: "andreyev-prd-2015",
      quote: "Many patients with moderate/severe BAM will be deficient in trace elements and fat-soluble vitamins. These should be checked periodically and supplemented as appropriate.",
    },
    {
      action: "For frequency or leakage with radiation proctopathy, start pelvic floor and toileting exercises for at least six weeks, with a stool bulking agent; refer faecal incontinence to a specialist team",
      why: "Radiotherapy weakens the muscles and stiffens the rectum; exercises and firmer stools reduce urgency and leakage.",
      source: "andreyev-prd-2015",
      quote: "Pelvic floor and toileting exercises (page 18)—min. 6 weeks.",
    },
    {
      action: "Investigate rectal bleeding with flexible endoscopy, and do not biopsy irradiated bowel",
      why: "The bleeding is usually from small fragile vessels the radiotherapy has caused, but other causes must be ruled out; biopsy of irradiated tissue can cause ulcers or fistulas that do not heal.",
      source: "andreyev-prd-2015",
      quote: "Do not biopsy irradiated areas.",
    },
    {
      action: "If the bleeding is minor and not affecting daily life, reassure and do nothing more",
      why: "Radiation bleeding usually starts 6 to 12 months after treatment, is worst at about 4 years and has gone by 8 to 10 years.",
      source: "andreyev-prd-2015",
      quote: "If bleeding is not staining clothes, causing anaemia or interfering with daily activities, reassure and do nothing.",
    },
    {
      action: "If bleeding affects quality of life, stop anticoagulants if possible and consider sucralfate enemas, with or without metronidazole",
      why: "Sucralfate coats and protects the lining of the rectum; stopping blood thinners lets it heal.",
      source: "andreyev-prd-2015",
      quote: "If bleeding affects quality of life, stop anticoagulants if possible and consider sucralfate enemas ± metronidazole 400 mg tds for 4 weeks.",
    },
    {
      action: "For persistent bleeding, discuss ablation at a specialist centre: hyperbaric oxygen, formalin, or thermal treatment such as argon plasma coagulation, which must not be used after brachytherapy",
      why: "Each option has trade-offs: hyperbaric oxygen has trial support but takes eight weeks of daily sessions; heat treatments are simple but can cause ulcers that do not heal in irradiated tissue.",
      source: "andreyev-prd-2015",
      quote: "Any thermal therapy (eg, APC): Advantages: easily available and simple; disadvantages: significant risk of non-healing ulceration/perforation as the tissue is ischaemic and unproven efficacy in heavy bleeding. Absolutely contraindicated in patients treated with brachytherapy.",
    },
    {
      action: "Treat anything the guidance marks as an emergency (for example severe colitis, heavy bleeding from another source, or very abnormal blood tests) by discussing it at once with a suitably qualified clinician",
      why: "Some findings need same-day action rather than the routine pathway.",
      source: "andreyev-prd-2015",
      quote: "Where it is stated that ‘this is an emergency’, the user of this guide must discuss the issue with a suitably qualified person for immediate action.",
    },
  ],
  bestInClass: {
    statement: "The 2015 Frontline Gastroenterology guidance (Andreyev et al.), the algorithm tested in the ORBIT randomised trial, is the most complete readable protocol: systematic investigation of every symptom with all first-line tests at the first visit, active search for bile acid malabsorption, bacterial overgrowth, carbohydrate intolerance, pancreatic insufficiency and pelvic floor dysfunction, no biopsy of irradiated tissue, and a stepped approach to bleeding (reassure, stop anticoagulants, sucralfate enemas, then ablation). On ablation the sources differ in emphasis: the guidance prefers hyperbaric oxygen for its randomised evidence and warns that thermal therapy such as argon plasma coagulation risks non-healing ulceration and is absolutely contraindicated after brachytherapy, while the ASGE (2019) found argon plasma coagulation, bipolar electrocoagulation, heater probe and radiofrequency ablation effective from small observational studies. MASCC/ISOO 2020 suggests hyperbaric oxygen for radiation proctitis (level II).",
    sources: ["andreyev-prd-2015", "mascc-isoo-2020", "asge-2019"],
  },
  variants: [
    {
      name: "Endoscopic thermal therapy first for bleeding (United States)",
      differs: "Treats bleeding radiation proctopathy with argon plasma coagulation or another endoscopic method as the usual first ablative step.",
      evidence: "ASGE 2019 (abstract read): from mostly small observational studies, argon plasma coagulation, bipolar electrocoagulation, heater probe and radiofrequency ablation were effective; the evidence was limited by a lack of controlled and comparative trials. The UK guidance warns of non-healing ulceration and perforation, and contraindicates thermal therapy after brachytherapy.",
      sources: ["asge-2019", "andreyev-prd-2015"],
    },
    {
      name: "Hyperbaric oxygen",
      differs: "About eight weeks of daily sessions in a pressure chamber for bleeding or other late radiation damage.",
      evidence: "MASCC/ISOO 2020 suggests it for radiation proctitis in pelvic cancers (level II). The UK guidance notes randomised evidence and possible benefit for urinary symptoms, against time, cost and travel.",
      sources: ["mascc-isoo-2020", "andreyev-prd-2015"],
    },
    {
      name: "Probiotics to prevent diarrhoea during pelvic radiotherapy",
      differs: "Gives a probiotic containing Lactobacillus during treatment to prevent acute radiation diarrhoea.",
      evidence: "MASCC/ISOO 2020 suggests (level III) that probiotics containing Lactobacillus may help prevent diarrhoea from radiotherapy or chemoradiotherapy in pelvic cancers.",
      sources: ["mascc-isoo-2020"],
    },
  ],
  grades: [
    { claim: "Agreement with the guidance sections (defined as 60% or more of panellists agreeing)", grade: "Consensus reached for 27 of 28 sections", source: "andreyev-prd-2015", quote: "Consensus (defined prospectively as 60% or more panellists selecting ‘strongly agree’ or ‘agree’) was reached for 27 of the original 28 sections in the guide, with a median of 75% of panellists agreeing with each section." },
    { claim: "An algorithmic approach helps and trained nurses can manage patients as well as a gastroenterologist", grade: "One randomised trial (ORBIT), as described by the guidance", source: "andreyev-prd-2015", quote: "A recent randomised trial suggested that an algorithmic approach to investigating and managing gastrointestinal symptoms of pelvic radiation disease (PRD) is beneficial and that specially trained nurses can manage patients as effectively as a gastroenterologist." },
    { claim: "Hyperbaric oxygen to treat radiation proctitis in pelvic cancers", grade: "II (suggestion)", source: "mascc-isoo-2020", quote: "The panel suggests that hyperbaric oxygen is an effective way to treat RT‐induced proctitis in patients with pelvic malignancy." },
    { claim: "Lactobacillus probiotics to prevent radiation diarrhoea in pelvic cancers", grade: "III (suggestion)", source: "mascc-isoo-2020" },
  ],
  sources: [
    {
      key: "andreyev-prd-2015",
      label: "Guidance: The practical management of the gastrointestinal symptoms of pelvic radiation disease",
      publisher: "Frontline Gastroenterology (BMJ and British Society of Gastroenterology; Andreyev et al.)",
      year: 2015,
      url: "https://doi.org/10.1136/flgastro-2014-100468",
      doi: "10.1136/flgastro-2014-100468",
      gradingScheme: "Not graded: an algorithm reviewed by 65 clinicians in two rounds, consensus defined as 60% or more agreeing with a section.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "mascc-isoo-2020",
      label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy (Table 3, gastrointestinal mucositis)",
      publisher: "MASCC and ISOO (Cancer; Elad et al.)",
      year: 2020,
      url: "https://doi.org/10.1002/cncr.33100",
      doi: "10.1002/cncr.33100",
      gradingScheme: "Level of evidence I to V; each statement a recommendation, a suggestion or no guideline possible.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "asge-2019",
      label: "ASGE guideline on the role of endoscopy for bleeding from chronic radiation proctopathy",
      publisher: "American Society for Gastrointestinal Endoscopy (Gastrointestinal Endoscopy)",
      year: 2019,
      url: "https://doi.org/10.1016/j.gie.2019.04.234",
      doi: "10.1016/j.gie.2019.04.234",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "ascrs-2018",
      label: "The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Treatment of Chronic Radiation Proctitis",
      publisher: "ASCRS (Diseases of the Colon and Rectum)",
      year: 2018,
      url: "https://doi.org/10.1097/DCR.0000000000001209",
      doi: "10.1097/DCR.0000000000001209",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["prostate", "cervical", "endometrial", "rectal-cancer", "anal"],
  technologies: ["bowel-after-pelvic-radiotherapy", "hyperbaric-oxygen-radiation-injury", "probiotics-treatment-diarrhoea", "rejuv-rehab-pelvic-floor"],
  keyPapers: ["paper-bennett-cochrane-database-syst-rev", "paper-wei-cochrane-database-syst-rev"],
  related: [],
  upgrades: ["idea-pu-nurse-led-pelvic-radiation-disease-clinic"],
  gaps: [
    "The main guidance dates from 2015 and no newer UK or European guideline on pelvic radiation disease was found; its steps rest on panel agreement and one randomised trial of the algorithm as a whole, not on graded evidence for each step.",
    "The ASCRS 2018 clinical practice guideline on chronic radiation proctitis could not be read (no abstract or text available to a script), and the ASGE 2019 guideline was read as an abstract only, so their grades are not given here.",
    "The MASCC/ISOO 2014 statements carried into 2020 unchanged on sucralfate enemas, octreotide, amifostine and sulfasalazine sit in a supplement that was not read.",
    "The ORBIT trial itself was not read; it is described here only as the guidance describes it.",
    "Rectal bleeding after pelvic radiotherapy can also be a new cancer; the guidance's algorithm sends unexplained bleeding and other findings for endoscopy and specialist review, which this summary does not reproduce in full.",
  ],
});
