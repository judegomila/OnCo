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
 *
 * Second accuracy pass, 17 November 2026 (an independent re-read of every claim against the raw text):
 * - Andreyev 2015: fetched again as Europe PMC full-text XML (PMC4283714), tags stripped by script; all 15 quotes
 *   from it match character for character. Corrected against it: the referral of faecal incontinence to a specialist
 *   team (the guidance prints that only for incontinence unrelated to radiotherapy), the six-week minimum (printed
 *   for proctopathy with frequency only), the lower-fat diet (printed for severe bile acid malabsorption), and
 *   several reasons and emphases the text does not state.
 * - MASCC/ISOO 2020: a copy of the Europe PMC XML (PMC7540329) fetched on 17 November 2026 by a sibling checker was
 *   re-used; Table 3 levels and the quote match. Its supporting table still refuses a script.
 * - ASGE 2019: abstract re-read from the Europe PMC record. ASCRS 2018: still no abstract or open text.
 * - Cancer Research UK, abdominal or pelvic radiotherapy side effects (last reviewed 30 January 2024): added for the
 *   patient-facing advice; fetched with a plain request and read as text.
 * - Europe PMC searches (by title, and by the lead author) and Crossref found no newer edition of any source.
 */
export const pelvicRadiationDiseaseBowelSymptoms = protocol({
  id: "pelvic-radiation-disease-bowel-symptoms",
  name: "Bowel effects after pelvic radiotherapy (pelvic radiation disease): assessment and management",
  aka: ["pelvic radiation disease", "radiation proctitis", "radiation proctopathy", "radiation enteritis", "bowel problems after radiotherapy", "late bowel effects of radiotherapy", "rectal bleeding after radiotherapy", "bile acid malabsorption after radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy to the pelvis can change how the bowel works, sometimes for a long time: urgency, loose stools, wind, leakage or bleeding. UK guidance says each symptom can have more than one cause and should be investigated step by step, because several causes have their own treatment. Tell your doctor or radiographers about any bleeding.",
  simple: "After radiotherapy to the lower tummy, the bowel can work differently for a long time. Tell your team about diarrhoea, urgency, leaking, bleeding or waking at night to open your bowels. There are tests that look for the cause, and treatments for several of the causes.",
  summary: "The reference is the 2015 Frontline Gastroenterology guidance (Andreyev et al.), the algorithm used in the ORBIT randomised trial, which the guidance says suggested that an algorithmic approach is beneficial and that specially trained nurses can manage patients as effectively as a gastroenterologist; 65 clinicians reviewed it and agreed 27 of 28 sections. Its principles: patients can have many symptoms at once, each with more than one cause, so investigate systematically and arrange the investigations at the first visit; specialist centres only very rarely reach a new diagnosis of irritable bowel syndrome in this group; endoscopy or surgery in irradiated tissue carries more risk, and irradiated areas are not biopsied. The conditions it looks for include bile acid malabsorption (SeHCAT scan; a sequestrant generally for moderate, and for most patients with severe), small intestinal bacterial overgrowth (breath test or duodenal aspirate), carbohydrate intolerance, exocrine pancreatic insufficiency (which may follow para-aortic node irradiation), and pelvic floor dysfunction (exercises; at least six weeks where proctopathy causes frequency). Faecal calprotectin is not recommended in this group. Bleeding from telangiectasia typically starts 6 to 12 months after radiotherapy and has gone by 8 to 10 years: reassure if it is not staining clothes, causing anaemia or interfering with daily activities; if it affects quality of life, stop anticoagulants if possible and consider sucralfate enemas, and discuss ablation by hyperbaric oxygen (RCT support; MASCC/ISOO suggests it, level II), formalin or thermal therapy such as argon plasma coagulation, which the guidance says is absolutely contraindicated after brachytherapy. The ASGE (2019) found argon plasma coagulation and other endoscopic methods effective from small observational studies. MASCC/ISOO suggests Lactobacillus probiotics to prevent radiation diarrhoea (level III).",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "home"],
  },
  population: "People with gastrointestinal symptoms following pelvic radiotherapy; the guidance does not limit itself to particular cancers and includes those treated with brachytherapy. It was written mainly for clinical nurse specialists working with a gastroenterologist, and says it might also help general practitioners and generalists. Diarrhoea during treatment is covered here only by the MASCC/ISOO probiotic suggestion. The guidance does not mention children.",
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
      action: "Be slow to make a new diagnosis of irritable bowel syndrome",
      why: "The guidance lists it as a principle that specialist centres only very rarely reach that diagnosis in people who have had pelvic radiotherapy.",
      source: "andreyev-prd-2015",
      quote: "Specialist centres only very rarely reach a new diagnosis of ‘irritable bowel syndrome’ in this patient group.",
    },
    {
      action: "Do not use faecal calprotectin to look for bowel inflammation in this group",
      why: "The guidance says it is too non-specific a marker of bowel inflammation in this group.",
      source: "andreyev-prd-2015",
      quote: "Note: faecal calprotectin as a marker for bowel inflammation is too non-specific and hence not recommended in this population.",
    },
    {
      action: "Test for bile acid malabsorption (SeHCAT scan) in diarrhoea; a bile acid sequestrant is generally required when it is moderate, and most patients with severe malabsorption need one with advice on eating less fat long term",
      why: "Pelvic radiotherapy is one of the common causes the guidance lists; in one type the last part of the small bowel absorbs bile acids poorly. For mild malabsorption it says eating less fat and antidiarrhoeal medicine may be useful.",
      source: "andreyev-prd-2015",
      quote: "For severe BAM developing after radiotherapy, most patients need a bile acid sequestrant and advice about long-term reduction in dietary fat intake.",
    },
    {
      action: "In moderate or severe bile acid malabsorption, check trace elements and fat-soluble vitamins periodically and replace them",
      why: "The guidance says many of these patients will be short of trace elements and fat-soluble vitamins.",
      source: "andreyev-prd-2015",
      quote: "Many patients with moderate/severe BAM will be deficient in trace elements and fat-soluble vitamins. These should be checked periodically and supplemented as appropriate.",
    },
    {
      action: "For frequency with radiation proctopathy, start pelvic floor and toileting exercises for at least six weeks and add a stool bulking agent; the guidance lists the same exercises and stool bulking for leakage with pelvic floor dysfunction",
      why: "The guidance says exercises can strengthen the pelvic muscles and can improve faecal incontinence or leakage.",
      source: "andreyev-prd-2015",
      quote: "Pelvic floor and toileting exercises (page 18)—min. 6 weeks.",
    },
    {
      action: "Investigate rectal bleeding with flexible endoscopy, and do not biopsy irradiated bowel",
      why: "Endoscopy shows the cause of the bleeding, which may be radiation telangiectasia (small surface blood vessels) or something else such as haemorrhoids; the guidance says endoscopic or surgical intervention in irradiated tissue carries an increased risk of serious complications.",
      source: "andreyev-prd-2015",
      quote: "Do not biopsy irradiated areas.",
    },
    {
      action: "If the bleeding is not staining clothes, causing anaemia or interfering with daily activities, reassure and do nothing more",
      why: "The guidance says radiation bleeding typically starts 6 to 12 months after radiotherapy, is at its worst 4 years after the end of radiotherapy and has gone by 8 to 10 years.",
      source: "andreyev-prd-2015",
      quote: "If bleeding is not staining clothes, causing anaemia or interfering with daily activities, reassure and do nothing.",
    },
    {
      action: "If bleeding affects quality of life, stop anticoagulants if possible and consider sucralfate enemas, with or without metronidazole",
      why: "The guidance says sucralfate forms a protective layer over the fragile vessels and improves healing. Its algorithm page words the first part as stop or reduce anticoagulants if possible.",
      source: "andreyev-prd-2015",
      quote: "If bleeding affects quality of life, stop anticoagulants if possible and consider sucralfate enemas ± metronidazole 400 mg tds for 4 weeks.",
    },
    {
      action: "Discuss referral to a specialist centre for treatment to ablate the vessels: hyperbaric oxygen, formalin, or thermal therapy such as argon plasma coagulation, which the guidance says is absolutely contraindicated after brachytherapy",
      why: "The guidance sets out the trade-offs: hyperbaric oxygen has randomised trial support but takes 8 weeks of daily treatment, is expensive and may mean long journeys; thermal therapy is easily available and simple but carries a significant risk of ulcers that do not heal, or perforation.",
      source: "andreyev-prd-2015",
      quote: "Any thermal therapy (eg, APC): Advantages: easily available and simple; disadvantages: significant risk of non-healing ulceration/perforation as the tissue is ischaemic and unproven efficacy in heavy bleeding. Absolutely contraindicated in patients treated with brachytherapy.",
    },
    {
      action: "Treat anything the guidance marks as an emergency (for example severe colitis, diverticular bleeding, bleeding from the upper gut, or some blood results) by discussing it at once with a suitably qualified clinician",
      why: "The guidance marks these findings as needing immediate action rather than the routine pathway.",
      source: "andreyev-prd-2015",
      quote: "Where it is stated that ‘this is an emergency’, the user of this guide must discuss the issue with a suitably qualified person for immediate action.",
    },
  ],
  bestInClass: {
    statement: "The 2015 Frontline Gastroenterology guidance (Andreyev et al.), the algorithm used in the ORBIT randomised trial, is the most complete readable protocol: systematic investigation of every symptom with the investigations arranged at the first visit, active search for bile acid malabsorption, bacterial overgrowth, carbohydrate intolerance, pancreatic insufficiency and pelvic floor dysfunction, no biopsy of irradiated tissue, and a stepped approach to bleeding (reassure, stop anticoagulants, sucralfate enemas, then ablation). On ablation the sources differ in emphasis: the guidance states no preference among the three, noting randomised evidence for hyperbaric oxygen and warning that thermal therapy such as argon plasma coagulation risks non-healing ulceration or perforation and is absolutely contraindicated after brachytherapy, while the ASGE (2019) found argon plasma coagulation, bipolar electrocoagulation, heater probe and radiofrequency ablation effective from small observational studies. MASCC/ISOO 2020 suggests hyperbaric oxygen for radiation proctitis (level II).",
    sources: ["andreyev-prd-2015", "mascc-isoo-2020", "asge-2019"],
  },
  variants: [
    {
      name: "Endoscopic therapy for bleeding (ASGE, United States)",
      differs: "Treats bleeding from chronic radiation proctopathy with argon plasma coagulation or another endoscopic method. The abstract does not say where endoscopic therapy comes in the sequence.",
      evidence: "ASGE 2019 (abstract read): from mostly small observational studies, argon plasma coagulation, bipolar electrocoagulation, heater probe and radiofrequency ablation were effective; the evidence was limited by a lack of controlled and comparative trials. The abstract also names cryoablation as discussed, without listing it among the effective methods. The UK guidance warns of non-healing ulceration and perforation, and contraindicates thermal therapy after brachytherapy.",
      sources: ["asge-2019", "andreyev-prd-2015"],
    },
    {
      name: "Hyperbaric oxygen",
      differs: "Eight weeks of daily treatment at a medically supervised hyperbaric unit, as the UK guidance describes it, for bleeding telangiectasia.",
      evidence: "MASCC/ISOO 2020 suggests it for radiation proctitis in pelvic cancers (level II). The UK guidance notes randomised evidence and that it may improve other symptoms such as urinary ones, against time, cost and travel.",
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
      accessed: "2026-11-17",
    },
    {
      key: "mascc-isoo-2020",
      label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy (Table 3, gastrointestinal mucositis)",
      publisher: "MASCC and ISOO (Cancer; Elad et al.)",
      year: 2020,
      url: "https://doi.org/10.1002/cncr.33100",
      doi: "10.1002/cncr.33100",
      gradingScheme: "Each statement carries a level of evidence (LoE, by the criteria of Somerfield and McCrae) and one of three determinations: recommendation, suggestion or no guideline possible.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "asge-2019",
      label: "ASGE guideline on the role of endoscopy for bleeding from chronic radiation proctopathy",
      publisher: "American Society for Gastrointestinal Endoscopy (Gastrointestinal Endoscopy)",
      year: 2019,
      url: "https://doi.org/10.1016/j.gie.2019.04.234",
      doi: "10.1016/j.gie.2019.04.234",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "ascrs-2018",
      label: "The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Treatment of Chronic Radiation Proctitis",
      publisher: "ASCRS (Diseases of the Colon and Rectum)",
      year: 2018,
      url: "https://doi.org/10.1097/DCR.0000000000001209",
      doi: "10.1097/DCR.0000000000001209",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-pelvic-rt",
      label: "Abdominal or pelvic radiotherapy side effects (last reviewed 30 January 2024)",
      publisher: "Cancer Research UK",
      year: 2024,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/radiotherapy/side-effects/abdominal-or-pelvic-radiotherapy-side-effects",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["prostate", "cervical", "endometrial", "rectal-cancer", "anal"],
  technologies: ["bowel-after-pelvic-radiotherapy", "hyperbaric-oxygen-radiation-injury", "probiotics-treatment-diarrhoea", "rejuv-rehab-pelvic-floor"],
  keyPapers: ["paper-bennett-cochrane-database-syst-rev", "paper-wei-cochrane-database-syst-rev"],
  related: [],
  upgrades: ["idea-pu-nurse-led-pelvic-radiation-disease-clinic"],
  gaps: [
    "The main guidance dates from 2015. On 17 November 2026 Europe PMC searches by title and by lead author, and Crossref, found no newer edition and no newer UK or European guideline on pelvic radiation disease; its steps rest on panel agreement and one randomised trial of the algorithm as a whole, not on graded evidence for each step.",
    "On 17 November 2026 the ASCRS 2018 clinical practice guideline on chronic radiation proctitis still could not be read (no abstract or open text), and the ASGE 2019 guideline was read as an abstract only, so their grades are not given here and nothing is said about where each society places endoscopic treatment in the sequence.",
    "MASCC/ISOO 2020 says its 2014 guidelines in favour of amifostine, octreotide, sucralfate enemas and sulfasalazine, and against oral sucralfate among others, in specific settings were unchanged; the settings and levels sit in a supporting table that refused a script again on 17 November 2026, so they are not given here. The UK guidance lists oral sucralfate as an option to consider for bleeding from telangiectasia higher in the bowel; how that sits with the MASCC/ISOO statement could not be checked.",
    "The ORBIT trial itself was not read; it is described here only as the guidance describes it. Crossref lists an erratum to the trial report dated March 2024, also not read.",
    "The patient advice to report bleeding follows the Cancer Research UK page; none of the sources read gives patients a time limit for reporting bowel symptoms after pelvic radiotherapy. The six-week minimum for exercises, the 8 weeks of hyperbaric oxygen and the timings of bleeding are the UK guidance's own figures from expert consensus.",
    "Rectal bleeding after pelvic radiotherapy can also be a new cancer; the guidance's algorithm sends unexplained bleeding and other findings for endoscopy and specialist review, which this summary does not reproduce in full.",
  ],
});
