import type { TermInput } from "@/lib/schema";

const asOf = "2026-09-04";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
type T = Omit<TermInput, "kind" | "asOf"> & { asOf?: string };
const t = (x: T): TermInput => ({ kind: "term", asOf, links: x.wikipedia ? [{ label: "Wikipedia", url: x.wikipedia }] : undefined, ...x });

export const terms: TermInput[] = [
  // ---- ADC vocabulary ----
  t({ id: "payload", name: "Payload (ADC)", category: "ADC", tldr: "A payload is the active cargo carried by a delivery product. Its identity and action are different from the molecule used to reach a target.", summary: "Cytotoxic antibody-drug conjugates carry an active small-molecule drug attached to an antibody. Examples include the topoisomerase I inhibitors SN-38 and DXd and the microtubule-directed drugs MMAE and DM1. The complete product, its attachment chemistry and the chemical species released after processing matter alongside the nominal payload class. Membrane permeability can contribute to local bystander activity, but permeability alone does not establish neighbouring-cell exposure, killing, tumour coverage or clinical benefit.", wikipedia: W("Antibody-drug_conjugate"), technologies: ["adc", "topoisomerase-inhibitors"] ,
"notes": [
  "Class effects versus product figures. US labels report brentuximab vedotin peripheral neuropathy of any grade in 62 per cent of patients in monotherapy studies; mirvetuximab soravtansine ocular adverse reactions in 59 per cent of patients with ovarian cancer, grade 3 in 11 per cent; belantamab mafodotin dosage modification for ocular toxicity in 83 per cent of patients in its clinical study, with a boxed warning and a restricted programme; and tisotumab vedotin a boxed warning for severe ocular toxicity, including severe vision loss and corneal ulceration, with an ophthalmic examination before every cycle for the first nine. Datopotamab deruxtecan: stomatitis in 63 per cent and ocular adverse reactions in 38 per cent of 1,365 patients treated as a single agent at 6 mg/kg in the pooled label population. Trastuzumab emtansine carries a boxed warning for hepatotoxicity, cardiac toxicity and embryo-fetal toxicity. The sacituzumab govitecan, trastuzumab deruxtecan and trastuzumab emtansine rates, and the datopotamab deruxtecan lung-disease rates, are in the record on ADC side effects in breast cancer. The figures come from different trials and populations and cannot be compared head to head, and sharing a payload class does not make products equivalent."
,
"A new strategy is a hypothesis about a specified failure. A different microtubule-directed payload tests another action; a redesigned TOP1 payload can change transport or potency while retaining vulnerabilities. A repair or checkpoint inhibitor proposes changing the response to damage and remains a chemical intervention. A transcription inhibitor needs drug- and model-specific evidence, including any claim about noncycling cells. An immune-stimulating conjugate needs evidence for useful immune activation, its harms and any durable effect after exposure ends. Alpha-emitter proposals still need carrier distribution, retention, radiation dose and response evidence. Two-address or biparatopic binding can change delivery, but neither uniquely exhausts delivery strategies nor guarantees productive uptake. These categories overlap; a diagram does not establish exclusive failure classes or rank how predictable their safety will be.",
"For any proposed cargo, state its biological bet, why antibody delivery might improve on the active material alone, and what would falsify the explanation. Then separate adequate loading and exposure, appropriate resistant models, functional target or response measurements, heterogeneous tumour coverage, normal-tissue effects and a clinical comparison matching the claim. One study does not settle mechanism, safety and benefit at once. Immune memory, rescue of resistance and clinical superiority need their own results rather than being consequences of a platform name.",
"In a fictional Company B report, a repair- or checkpoint-directed conjugate has model activity and six dose-escalation patients, without a comparative benefit result. Ask whether the intended response pathway was changed at adequate exposure, with what harm, and whether the proposed biomarker modifies treatment effect in an appropriate comparison. Responses concentrated in one marker group do not alone prove predictive validity or mechanism; responses scattered across groups do not alone disprove a mechanism.",
"In a separate fictional checkpoint-payload report, four shrinkages among 18 patients describe uncontrolled activity. They do not establish improved survival, a validated biomarker or the cause of each response. A post-TOP1 claim needs the earlier agents and actual progression history; interpret dose-limiting harm, active exposure and target or response measurements separately. A meaningful active-material comparison and full-conjugate comparison can test the delivery rationale. Neither the small response count nor one experiment settles all these questions."
],
"asOf": "2026-11-11"
,
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Antibody-drug_conjugate"
  },
  {
    "label": "FDA: clinical pharmacology considerations for cytotoxic antibody-drug conjugates (March 2024)",
    "url": "https://www.fda.gov/media/155997/download"
  },
  {
    "label": "TRODELVY U.S. label: indications, mechanism and named pharmacokinetic measurements",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=57a597d2-03f0-472e-b148-016d7169169d"
  },
  {
    "label": "ENHERTU U.S. label: indications, mechanism, pharmacokinetics and cardiac assessment",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"
  },
  {
    "label": "PADCEV U.S. label: skin warning, MMAE transport and release-limited pharmacokinetics",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5631d3e-4604-4363-8f20-11dfc5a4a8ed"
  },
  {
    "label": "Drago et al.: ADC design, resistance and unresolved clinical questions (2021 review)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/33558752/"
  }
]
}),
  t({
    notes:["The T-DM1 catabolite has low membrane permeability in the cited comparison; that is not a chemical rule that every noncleavable catabolite is impermeable. Bystander activity depends on release, diffusion, local concentration and neighboring-cell susceptibility. Linker hydrophilicity can mitigate hydrophobicity in particular designs without guaranteeing freedom from aggregation or toxicity.",
"In a fictional controlled comparison, Models A and B have similar measured binding and uptake, but B has less active material at the payload action site and more surviving cells later. The measured difference is after uptake; it does not uniquely identify the linker, because processing, transport and other model differences remain possible. Testing free active material with verified exposure at its action site can help: a response supports investigating delivery or processing, while persistent insensitivity motivates tests of payload action and cellular response. Neither result selects a treatment for a person.",
"Goldenberg and colleagues, working at Immunomedics, studied SG release of SN-38 in serum at 37 degrees Celsius. Their 2020 correction changed the human-serum release half-life from 23.98 to 18.82 hours after a data-entry error. They proposed contributions from intracellular delivery and local extracellular release. That preclinical chemistry and delivery rationale is not a direct map of release in a human tumour or the same parameter as the conjugate's human elimination half-life. Active drug still needs adequate local exposure and susceptible cells; it does not necessarily kill wherever it travels."
], links:[{"label":"Goldenberg et al.: sacituzumab govitecan and gradual SN-38 release (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/26101915/"},{"label":"Tomabechi et al.: lysosomal transport of a T-DM1 catabolite (2022)","url":"https://pubmed.ncbi.nlm.nih.gov/36741448/"},{"label":"Ogitani et al.: released-species permeability and local bystander killing in models (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/27166974/"},{"label":"Lyon et al.: hydrophobicity, loading and conjugate pharmacokinetics (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/26076429/"},{"label":"Goldenberg et al.: correction of the human-serum release half-life (2020)","url":"https://doi.org/10.18632/oncotarget.27512"}], asOf:"2026-11-11", id: "linker", name: "Linker (ADC)", category: "ADC", tldr: "The linker connects antibody and payload. Its chemistry affects where the drug separates and which active chemical species becomes available.", summary: "Cleavable linkers can respond to enzymes, reduction or hydrolysis under specified conditions. Release is construct-specific and need not occur exclusively inside a cancer cell. A noncleavable linker can remain on the payload while the antibody is broken down, leaving an active amino-acid-linker-payload catabolite. For T-DM1, Lys-SMCC-DM1 must leave the lysosome to reach its intracellular site of action; SLC46A3 directly transports this catabolite in experimental systems. The released species can differ from the unconjugated parent drug in transport and permeability.", wikipedia: W("Antibody-drug_conjugate"), technologies: ["adc", "site-specific-conjugation"] }),
  t({
    notes:["Site-directed attachment can improve control, but occupancy, remaining heterogeneity, stability and function still need measurement. Hydrophobic-interaction chromatography and suitable mass-spectrometric methods can characterize loading; an average alone cannot establish product equivalence or clinical benefit. For multiple payload types, retain each component’s loading instead of inventing its share from total DAR.",
"Hamblett's 2004 comparison used the anti-CD30 antibody cAC10 carrying MMAE. Eight-drug constructs were more potent in the cell assays, but the four-drug construct had comparable antitumour activity at equal antibody doses in the tested mouse xenografts. In the mouse pharmacokinetic experiments the eight-drug construct cleared three times faster than the four-drug version. Keep the antibody, attached chemical species, loading, assay and mouse setting with those ratios; they do not set an optimal loading or a human dose."
], links:[{"label":"Hamblett et al.: drug loading in one anti-CD30 conjugate, cell and mouse experiments (2004)","url":"https://pubmed.ncbi.nlm.nih.gov/15501986/"},{"label":"Junutula et al.: engineered-cysteine conjugation and animal therapeutic index (2008)","url":"https://pubmed.ncbi.nlm.nih.gov/18641636/"},{"label":"Lyon et al.: hydrophobicity, loading and conjugate pharmacokinetics (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/26076429/"}], asOf:"2026-11-11", id: "dar", wikipedia: W("Antibody-drug_conjugate"), aka: ["drug-to-antibody ratios"], name: "Drug-to-antibody ratio (DAR)", category: "ADC", tldr: "DAR usually reports the average number of payload molecules attached per antibody. The average can hide a mixture of differently loaded molecules.", summary: "Drug-to-antibody ratio describes payload loading. A preparation can contain antibodies with different numbers and sites of attachment, so the reported mean does not specify every molecule. Two preparations with the same mean can differ in their loading distribution and attachment chemistry. Higher loading can increase cell-assay potency while also changing hydrophobicity, aggregation, clearance and tolerated exposure. Hamblett and colleagues separated differently loaded versions of one anti-CD30 conjugate and found that greater cell-assay potency did not translate into a proportional mouse treatment advantage. That experiment does not set one optimal DAR for every product.", technologies: ["adc", "site-specific-conjugation"] }),
  t({
    notes:["Neither a cleavable-linker label nor a permeability result alone proves bystander killing in a tumor. More chemical spread can also expose normal cells, so it is not an efficacy ranking."], asOf:"2026-11-08", id: "bystander-effect", wikipedia: W("Antibody-drug_conjugate"), links: [{"label":"Ogitani et al.: released-species permeability and local bystander killing in models (2016)","url":"https://pubmed.ncbi.nlm.nih.gov/27166974/"},{"label":"Goldenberg et al.: sacituzumab govitecan and gradual SN-38 release (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/26101915/"}], name: "Bystander effect (ADC)", category: "ADC", tldr: "A conjugate can harm neighboring cells when an active released species reaches them, including neighbors with little or none of the delivery target.", summary: "Bystander killing is a local drug effect, distinct from radiation crossfire or immune memory. It depends on the chemical species actually released, its transport through membranes and tissue, the concentration reaching neighboring cells and their susceptibility. Ogitani and colleagues compared a permeable DXd species, a poorly permeable alternative and the T-DM1 catabolite Lys-SMCC-DM1. Their coculture and mixed-tumor mouse experiments showed neighboring target-negative-cell killing with the permeable DXd construct; a separate target-negative tumor on the opposite flank did not respond in that experiment. These findings support a local mechanism in those models, not a universal safety or patient-benefit claim.", technologies: ["adc", "topoisomerase-inhibitors"], drugs: ["trastuzumab-deruxtecan"] }),
  t({ id: "ild", name: "Interstitial lung disease (ILD) / pneumonitis", category: "Toxicity", tldr: "Interstitial lung disease (ILD) is lung inflammation, a serious side effect of some ADCs (especially Enhertu) and immunotherapy.", summary: "Occurs in ~10-15% of T-DXd patients (grade 5 in ~1%); also with Dato-DXd, HER3-DXd, checkpoint inhibitors, and mTOR inhibitors. Requires monitoring, prompt steroids, and permanent discontinuation for grade ≥2 with T-DXd. Mechanism with DXd is incompletely understood (alveolar macrophage uptake proposed).", wikipedia: W("Interstitial_lung_disease"), drugs: ["trastuzumab-deruxtecan", "datopotamab-deruxtecan"] ,
"notes": [
  "Label and trial figures differ by product, disease pool and definition. The trastuzumab deruxtecan label (5.4 mg/kg monotherapy pool) reports ILD in 12 per cent, fatal in 0.9 per cent, and DESTINY-Breast04 adjudicated 12.1 per cent with 0.8 per cent grade 5. The datopotamab deruxtecan label reports 3.0 per cent (0.2 per cent fatal) in 841 people with breast cancer and 7 per cent (1.7 per cent fatal) in 484 with non-small-cell lung cancer. The separate 15.4 per cent pooled-analysis figure below has another denominator and should not be compared directly. The datopotamab deruxtecan trials excluded people with a history of ILD or pneumonitis that needed steroids, so prior lung injury can bear on eligibility for later treatment."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Interstitial_lung_disease"
  },
  {
    "label": "Trastuzumab deruxtecan prescribing information (DailyMed)",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"
  },
  {
    "label": "Datopotamab deruxtecan prescribing information (DailyMed)",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2950227c-6230-4ca4-a135-46e44d9424a0"
  },
  {
    "label": "Modi et al., trastuzumab deruxtecan in HER2-low breast cancer, DESTINY-Breast04 (2022)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/35665782/"
  },
  {
    "label": "Powell et al., pooled analysis of interstitial lung disease in nine trastuzumab deruxtecan studies (ESMO Open 2022)",
    "url": "https://doi.org/10.1016/j.esmoop.2022.100554"
  },
  {
    "label": "Macmillan: pembrolizumab",
    "url": "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/pembrolizumab"
  }
],
"asOf": "2026-11-11"
}),
  t({ id: "efflux-pump", name: "Drug efflux pumps (ABC transporters)", category: "Resistance", tldr: "An efflux pump moves particular substances out of cells. Some pumps can reduce exposure to chemotherapy drugs or released antibody-drug-conjugate payloads.", summary: "Drug efflux pumps can export particular medicines or released antibody-drug-conjugate payloads that are their substrates. Important examples include ABCB1 (P-glycoprotein or MDR1), ABCG2 (BCRP) and ABCC1 (MRP1). The same transporter can handle several unrelated compounds, but a pump name does not establish that every medicine is a substrate.\n\nExpression and transport activity are different measurements. A high RNA signal does not by itself show that enough active transporter reaches the membrane to alter drug exposure. Cell-line resistance and restoration by an inhibitor can support a mechanism in that model; they do not establish a validated clinical selection test or make switching payloads effective in every tumour.", wikipedia: W("P-glycoprotein"), pathways: ["emt"], technologies: ["adc", "cytotoxic-chemotherapy"] ,
"notes": [
  "How to read evidence about pumps. Pump RNA is not pump function: function depends on protein at the membrane and on whether a particular drug is a substrate. It is tested with fluorescent substrates that cells retain less when a pump is active, with and without an inhibitor, or by measuring intracellular drug; in SN-38-resistant breast and gastric cell lines, functional ABCG2 but not ABCB1 was found, and ABCG2 inhibitors restored SN-38 toxicity (Chang et al.). Substrate status is specific to each drug, so being pumped for one topoisomerase I payload does not establish it for another. A pump acts on a drug after it arrives and is not the drug's target, and a cell can keep an ADC's target protein, take the ADC up normally and still resist by exporting the released payload."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/P-glycoprotein"
  },
  {
    "label": "Chang et al., ABCG2 inhibitors with sacituzumab govitecan (IMMU-132) overcome SN-38 resistance (2016)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27207776/"
  }
],
"asOf": "2026-11-11"
}),
  t({ id: "resistance", aka: ["acquired resistance", "primary resistance", "adaptive resistance", "pre-existing resistance", "resistance mechanism", "resistance mechanisms", "resistant clone", "resistant clones", "resistant subclone", "resistant subclones", "bypass pathways", "bypass signalling", "bypass resistance", "chemoresistance", "chemoresistant", "chemotherapy resistance", "TKI resistance", "TKI-resistant", "drug-resistant", "therapy-resistant", "become resistant", "becomes resistant", "escape mechanism", "escape mechanisms", "escape mutation", "escape mutations", "reversion mutations", "BRCA reversion", "on-target mutations", "compound resistance mutations", "confers resistance", "emergence of resistance", "overcome resistance", "resistance alteration", "resistance pathway", "resistant disease"], name: "Drug resistance (primary and acquired)", category: "Resistance", tldr: "A cancer may respond less to a medicine from the start or after an earlier response. The cause can involve cell populations, drug exposure or several mechanisms.", summary: "Drug resistance describes reduced treatment effect in a specified setting. Primary and acquired resistance describe the timing of response, rather than proving a single biological cause. Changes in the target, alternative signalling, drug handling and reversible cell states can contribute. Sampling, exposure and controlled functional evidence are needed to distinguish a plausible explanation from a demonstrated treatment-specific mechanism.", wikipedia: W("Drug_resistance"), technologies: ["kinase-inhibitors", "liquid-biopsy"] ,
  asOf: "2026-11-12",
  notes: [
    "Drug resistance is reduced effect for a specified medicine, cancer population and setting. A garden analogy can describe selection: removing susceptible plants leaves a larger share of survivors, without showing that the treatment created those survivors. Intrinsic resistance describes poor initial effect; acquired resistance describes lost effect after an earlier response. These timing labels do not identify one permanent mechanism. A rare pre-existing population can become easier to detect, and sequence change, reversible cell state, exposure and the surrounding tissue can contribute together.",
    "NCI describes changes that prevent a medicine interacting with its target and alternative growth routes that no longer depend on that target. Investigation can also ask whether the required target is still present and accessible, whether drug efflux or inadequate local exposure changes the amount reaching cells, whether death signalling is bypassed, and whether the surrounding tissue changes exposure or survival. These are competing or coexisting hypotheses, rather than a mechanism established by a failed scan response. Cross-resistance needs evidence for the actual drugs and the attributed mechanism; a shared class name does not establish it.",
    "Sharma 2010 found small drug-tolerant populations in human cancer-cell cultures. In PC9 lung cancer cells, persisters propagated without drug regained sensitivity within nine doublings; expanded persister populations required roughly 90 doublings or 20 to 30 passages. The observations supported a reversible chromatin-associated state in those systems, distinct from assuming a new permanent resistance mutation. They do not establish that a treatment break is safe or beneficial for a person. Drug withdrawal and re-exposure are experimental tests of reversibility, with matched conditions and controls.",
    "A fictional population starts with 990 sensitive and 10 resistant cells, total 1,000. Removing 90 per cent of the sensitive cells leaves 99 sensitive plus 10 resistant cells, total 109. The resistant share rises from 10/1,000 = 1 per cent to 10/109, about 9.2 per cent, although the absolute resistant count stays at 10. No division, mutation or state switching is included. To display this honestly, compare absolute counts on one 0 to 1,000 scale and resistant fractions on a separately labelled 0 to 10 per cent scale. A larger fraction alone does not prove growth of that population, a newly induced mutation or a clinical treatment effect.",
    "A useful investigation first checks exposure, assay performance and what the sample represents. It then compares earlier and later specimens, the sampled sites, coverage and detection limits, and candidate target, pathway, state or environmental changes. Controlled models can test target engagement, pathway activity, damage and survival separately. Genetic perturbation or rescue, an appropriate comparison compound, and removal/re-exposure can strengthen a causal explanation, but off-target effects and altered growth can confound it. Culture does not reproduce every tissue, immune, exposure or human-safety condition; clinical response assessment and mechanistic research remain distinct.",
    "Combining drugs is a hypothesis that must address the measured failure at useful exposures and tolerable harm. NCI notes both the rationale for combinations and the possibility of serious targeted-treatment side effects. Different pathway targets do not guarantee nonoverlapping toxicity or clinical rescue. A later variant found in a fictional progression sample is especially hard to interpret if the earlier sample lacked enough coverage to detect it: it may have been present but undetected, arisen later or be unrelated to the observed failure. First check the comparison and detection limit, then test its treatment-specific function. Detection, origin, timing and causation are separate conclusions."
  ],
  links: [
    {"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Drug_resistance"},
    {"label":"NCI: targeted cancer therapies, resistance and adverse effects","url":"https://www.cancer.gov/about-cancer/treatment/types/targeted-therapies"},
    {"label":"Sharma et al.: reversible drug-tolerant states in cancer-cell models (2010)","url":"https://pubmed.ncbi.nlm.nih.gov/20371346/"},
    {"label":"Sakai et al.: BRCA2 depletion and resistance in ovarian cancer models (2009)","url":"https://pubmed.ncbi.nlm.nih.gov/19654294/"}
  ],
  related: [
    "dna-damage-response-inhibitors"
  ]
}),

  // ---- Trial endpoints & stats ----
  t({
    asOf:"2026-11-12", notes:["DCR and CBR may add protocol-defined stable disease and minimum-duration conditions; adding those participants changes the endpoint rather than increasing ORR. Duration of response concerns the responding population and its own starting time.","Fictional response example: among 20 people with complete assessment, four partial responses and six additional stable-disease outcomes give an objective response rate of 4/20, or 20%, and a disease-control rate of 10/20, or 50%. A clinical-benefit rate that requires durable stable disease cannot be calculated until the duration rule and follow-up are supplied. These are participant-level outcomes, not a fraction of tumour cells killed. Response criteria, confirmation, assessment period, denominator and missing-result rules stay with the number; neither label alone establishes survival or quality-of-life benefit."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Response_evaluation_criteria_in_solid_tumors"},{"label":"FDA 2018: response, duration and clinical endpoint context","url":"https://www.fda.gov/media/71195/download?attachment="},{"label":"RECIST 1.1 primary guideline: definitions and confirmation, 2009","url":"https://pubmed.ncbi.nlm.nih.gov/19097774/"},{"label":"RECIST 1.1 full guideline: overall categories and duration sections","url":"https://project.eortc.org/recist/wp-content/uploads/sites/4/2015/03/RECISTGuidelines.pdf"},{"label":"FDA: oncology clinical endpoints, nonbinding guidance (December 2018)","url":"https://www.fda.gov/media/71195/download"}], id: "orr", aka: ["objective response", "objective responses", "objective response rates", "overall response rate", "overall response", "confirmed responses", "radiographic response", "radiological response"], name: "Objective response rate (ORR)", category: "Endpoints", tldr: "Objective response rate is the proportion of a stated analysis population meeting complete or partial response criteria. It is not the percentage by which every tumour shrank.", summary: "Objective response rate, also called overall response rate, counts participants meeting the specified complete or partial response criteria. Stable disease is excluded. Keep the denominator, measurable-disease requirements, biomarker rules, assessment window, reviewer, confirmation, data cutoff and missing-data handling with the percentage and confidence interval. A lesion-level fraction has a different denominator from a participant-level rate.\n\nUnder RECIST 1.1, the target partial-response measurement uses a decline in selected diameters from baseline; overall response also considers non-target and new disease. A 30 percent ORR means that proportion met the response definition, rather than every tumour shrinking 30 percent or the total tumour volume falling by that amount. Best response over follow-up and status at a fixed visit are different measures.\n\nConfirmed and unconfirmed rates must retain their definitions. RECIST requires confirmation in non-randomised response-primary trials, while other designs and protocols have their own stated rules. Response magnitude and duration can support regulatory decisions in a specified context; a response rate is not automatically comparative survival benefit or a personal forecast.", wikipedia: W("Response_evaluation_criteria_in_solid_tumors"), terms: ["recist"], related: ["recist", "duration-of-response-term", "single-arm", "basket-trial", "surrogate-validation", "surrogate-endpoint", "accelerated-approval", "bicr"], trials: ["navigate", "l-mind", "roar-atc", "announce", "atlantis"] }),
  t({
    asOf:"2026-11-09", notes:["In a fictional target-sum sequence of 100, 60 and 73 millimetres, the last value is 27 percent below baseline but 13 millimetres, about 21.7 percent, above nadir. Under the stated assumption of comparable measurements and no outside progression, it meets both target-progression increases. This arithmetic is not a clinical decision rule for an unassessed person."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Response_evaluation_criteria_in_solid_tumors"},{"label":"RECIST 1.1 primary guideline: definitions and confirmation, 2009","url":"https://pubmed.ncbi.nlm.nih.gov/19097774/"},{"label":"RECIST 1.1 full guideline: overall categories and duration sections","url":"https://project.eortc.org/recist/wp-content/uploads/sites/4/2015/03/RECISTGuidelines.pdf"},{"label":"FDA 2018: response, duration and clinical endpoint context","url":"https://www.fda.gov/media/71195/download?attachment="}], id: "recist", keyPapers: ["paper-therasse-recist-jnci-2000"], aka: ["RECIST 1.1", "measurable disease", "new lesion", "new lesions", "sum of longest diameters", "30% decrease", "≥30% decrease", "20% increase", "≥20% increase", "30% reduction"], name: "RECIST", category: "Endpoints", tldr: "RECIST 1.1 uses predefined anatomical measurements and other disease findings to classify response. A target sum is not every cancer site or total tumour volume.", summary: "RECIST 1.1 selects up to five measurable target lesions, with at most two per organ. Ordinary lesions contribute longest diameters; qualifying lymph nodes contribute short-axis measurements. Other disease is recorded separately, along with new lesions. The target sum is a selected measurement, rather than a complete inventory or volume of cancer.\n\nFor target lesions, partial response requires at least a 30 percent decrease from the baseline sum. Progression requires at least a 20 percent increase from the smallest sum on study, together with at least a five-millimetre absolute increase. Baseline is the progression reference if it remains the smallest sum. Unequivocal non-target progression or an unequivocal new malignant lesion can change the overall category despite shrinking targets.\n\nOverall complete response requires the applicable target, non-target and new-lesion conditions, including short-axis reduction below ten millimetres for pathological nodes. Missing or equivocal findings require the protocol’s handling. Confirmation of response is not mandatory in every design: the guideline requires it for non-randomised trials whose primary endpoint is response.\n\nRecord the framework/version, selected lesions, dates, baseline, nadir, current values, acquisition comparability and findings outside the sum. iRECIST and metabolic PET criteria add different rules; an anatomical response does not establish tissue clearance, cure or a treatment decision.", wikipedia: W("Response_evaluation_criteria_in_solid_tumors"), technologies: ["ct", "mri"], related: ["orr", "bicr", "pfs", "duration-of-response-term", "surrogate-validation", "irecist", "mrecist", "rano-criteria", "pcwg3", "percist", "choi-criteria", "irrc", "imrecist", "itrecist", "mrecist-mesothelioma", "itmig-mrecist", "gcig-ca125", "inrc-2017", "rano-bm", "recip-1"] }),
  t({ id: "pfs", aka: ["progression-free", "mPFS", "progression or death"], name: "Progression-free survival (PFS)", category: "Endpoints", tldr: "Progression-free survival (PFS) is how long patients live without their cancer growing.", summary: "Progression-free survival (PFS) measures the time from random assignment until the cancer progresses or the patient dies, whichever comes first. It is a common primary endpoint because a trial can read out with fewer patients and in less time than one powered for overall survival, but a PFS gain does not always translate into an OS benefit, as TROPION-Breast01 illustrated; PFS2 tracks progression on the next therapy. PFS is referenced by the Small-cell lung cancer, Sarcomas and Hodgkin lymphoma entries, the POLARIX trial and Michael LeBlanc, and it features in the bottlenecks on trial design, real-world evidence and quality of life. Ideas engaging with it include clonal clearance as an endpoint, a six-week ctDNA switch and seamless phase 2/3 designs with pre-registered go rules.", wikipedia: W("Progression-free_survival"), related: ["os", "surrogate-endpoint", "surrogate-validation", "crossover", "recist", "bicr", "kaplan-meier-curve", "hazard-ratio", "estimand", "trial-failure-modes"], trials: ["tropion-breast01", "codebreak-200", "checkmate-9er"] }),
  t({ id: "os", aka: ["OS", "overall-survival", "mOS", "survival benefit", "survival advantage", "survival detriment", "live longer", "lived longer", "longer survival", "death from any cause"], name: "Overall survival (OS)", category: "Endpoints", tldr: "Overall survival (OS) is how long patients live, full stop. It is the gold-standard endpoint.", summary: "Overall survival (OS) is the time from random assignment to death from any cause, and it remains the gold-standard endpoint in oncology trials. Its interpretation is confounded by crossover and by therapies given after progression, and it requires long follow-up. Regulators increasingly want to see that OS is not harmed even when PFS is the primary endpoint. The term is cited by the Small-cell lung cancer and Hodgkin lymphoma entries, the ZUMA-7 trial and Michael LeBlanc, and it runs through the bottlenecks on trial design, weak real-world evidence, patient voice and quality of life. Related ideas include randomising the next line of treatment before the first fails, a regulatory endpoint for antimetastatic drugs and seamless phase 2/3 trials with pre-registered go rules.", wikipedia: W("Survival_rate"), related: ["pfs", "crossover", "surrogate-validation", "kaplan-meier-curve", "hazard-ratio", "median-survival", "landmark-survival", "quality-adjusted-survival", "absolute-benefit", "estimand"], trials: ["checkmate-067", "adaura", "tropion-breast01", "keynote-564"] }),
  t({ id: "efs", aka: ["EFS", "DFS", "iDFS", "RFS", "event-free survival", "recurrence-free survival", "recurrence-free", "relapse-free survival", "relapse-free", "invasive disease-free survival", "distant disease-free survival", "distant recurrence-free", "failure-free survival", "time to recurrence"], wikipedia: "https://en.wikipedia.org/wiki/Disease-free_survival", name: "Event-free / disease-free survival (EFS, DFS, iDFS, RFS)", category: "Endpoints", tldr: "In early-stage cancer: how long patients stay free of recurrence, progression, or death.", summary: "Event-free survival and its relatives, disease-free survival, invasive disease-free survival and recurrence-free survival, are the endpoints used in early-stage cancer to measure how long patients stay free of recurrence, progression or death. Event definitions differ by trial: EFS in KEYNOTE-522 counts progression that precludes surgery, iDFS in monarchE and NATALEE counts invasive recurrence, second cancers and death, and RFS is the measure in INTerpath-001 (V940-001). Use of an endpoint to support a particular approval does not make every endpoint with that name a validated substitute for overall survival. FDA guidance distinguishes direct clinical benefit, established surrogate evidence and the less established surrogate evidence that can support accelerated approval, with confirmatory obligations. They appear in the NADINA, KEYNOTE-716, KEYNOTE-689, MATTERHORN, ZUMA-7, ASCENT-05 / OptimICE-RD and TROPION-Breast03 trial records, in the Neuroblastoma (paediatric) entry and in the KEYNOTE-522 and CheckMate 816 papers.", trials: ["keynote-522", "natalee", "interpath-001", "monarche", "keynote-564", "adaura", "challenge"], related: ["surrogate-validation", "surrogate-endpoint", "pcr", "mrd", "os", "group-sequential-design", "absolute-benefit"] ,
"asOf": "2026-11-10",
"links": [
  {
    "label": "FDA: oncology clinical-trial endpoints (2018)",
    "url": "https://www.fda.gov/media/71195/download"
  },
  {
    "label": "Updated Standardized Definitions for Efficacy End Points (STEEP) in Adjuvant Breast Cancer Clinical Trials: STEEP Version 2.0.",
    "url": "https://doi.org/10.1200/JCO.20.03613"
  },
  {
    "label": "Proposal for standardized definitions for efficacy end points in adjuvant breast cancer trials: the STEEP system.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17513820/"
  },
  {
    "label": "Event-free Survival with Pembrolizumab in Early Triple-Negative Breast Cancer.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/35139274/"
  },
  {
    "label": "Introduction to the Analysis of Survival Data in the Presence of Competing Risks.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26858290/"
  },
  {
    "label": "Conroy, N Engl J Med 2018: PRODIGE 24, modified FOLFIRINOX or gemcitabine as adjuvant therapy (disease-free survival primary endpoint)",
    "url": "https://doi.org/10.1056/nejmoa1809775"
  },
  {
    "label": "Punt, JNCI 2007: endpoints in adjuvant treatment trials, systematic review and proposed definitions (disease-free survival)",
    "url": "https://doi.org/10.1093/jnci/djm024"
  },
  {
    "label": "OncoGuide: survival-endpoints (pinned teaching source)",
    "url": "https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/concepts/evidence-and-statistics/endpoints/survival-endpoints.md"
  },
  {
    "label": "Therneau, Crowson and Atkinson: multi-state models and competing risks (September 2026)",
    "url": "https://cran.r-project.org/web/packages/survival/vignettes/compete.pdf"
  }
],
"notes": [
  "Disease-free survival is the primary endpoint of the adjuvant pancreatic cancer trials: in PRODIGE 24 median disease-free survival was 21.6 months with modified FOLFIRINOX against 12.8 months with gemcitabine (hazard ratio 0.58 for a cancer-related event, second cancer or death), and overall survival followed (Conroy 2018). The definition, time from randomisation to any event irrespective of cause, follows the adjuvant-trial consensus (Punt 2007).",
  "A survival endpoint defines when the clock starts and which outcomes stop it, usually at the first qualifying event. Overall survival counts death from any cause. Event-free survival uses its protocol's prespecified event set; a neoadjuvant trial may include progression preventing definitive surgery, recurrence, a second primary cancer and death. Disease-free survival is also study-defined and cannot automatically be exchanged for event-free or invasive disease-free survival. Progression-free survival usually counts objective progression or death, with scan criteria, assessment times and missing-assessment rules attached. Participant dates, event types, follow-up status, censoring and cutoff determine the resulting curve, time-specific estimate or rate comparison and its uncertainty. An acronym or a second operation alone does not establish which events count. FDA's December 2018 nonbinding guidance discusses evidence by indication and pathway. It describes progression-free survival as able, depending on disease, context and effect size, to support accelerated approval, support traditional approval or represent direct clinical benefit. This does not universally validate it as a substitute for overall survival. A favourable distant-event endpoint does not settle local control or overall survival. An endpoint association also differs from proof that acting on a biomarker improves outcomes.",
  "In the event table reproduced by STEEP 2.0 in 2021, invasive disease-free survival counts invasive local, regional, distant and contralateral breast events, a second nonbreast invasive primary, and death from any cause; in situ disease is excluded. STEEP 2.0 defines invasive breast cancer-free survival as a distinct endpoint excluding second nonbreast primaries, rather than silently removing them from invasive disease-free survival. Distant recurrence-free interval counts distant recurrence or breast-cancer death under STEEP, whereas its distant relapse-free survival row counts death from any cause. The paper's actual rules remain essential. A person alive after a local invasive recurrence with no distant recurrence can therefore have an invasive disease-free-survival event without an overall-survival or distant-recurrence-free-interval event. These rules are read from the 2021 table; the trial's own starting clock, first-event and competing-event rules still need checking.",
  "The starting date may be randomisation, consent, surgery or biomarker assessment. KEYNOTE-522 used pathological complete response and event-free survival as co-primary endpoints; renaming its event-free-survival result invasive disease-free survival changes the claim. For a fictional participant with progression at month 12 and death at month 30, both measured from randomisation, progression-free survival stops at month 12 while overall survival continues to month 30. Those dates describe a known individual history, not censoring or a survival-probability estimate. A postoperative cohort or another endpoint requires its own origin and event rules.",
  "Among 1,000 fictional participants, suppose 50 first recurrences are recorded and 20 are assigned to site X, with some follow-up incomplete. The calculation 20/50 = 40% describes the share of recorded first recurrences assigned to X. The calculation 20/1,000 = 2% describes a crude fraction of enrolled participants with that recorded event. Neither supplies five-year risk. Death before recurrence prevents recurrence, and another first site prevents X from being the first site; later recurrence at X is a different endpoint. A cumulative-incidence analysis can account for follow-up and competing events under its assumptions. The nonparametric Aalen-Johansen estimator supplies that estimate, while Fine-Gray regression models covariate effects on the subdistribution hazard. The method-name attribution comes from Therneau, Crowson and Atkinson's technical vignette, separately from Austin's competing-risk discussion. Turning the 40% site share into everyone's five-year risk changes both denominator and horizon without a supporting analysis."
]
}),
  t({ id: "hazard-ratio", aka: ["HR 0", "HR 1", "HR of", "HR for death", "HR for progression", "HR for recurrence", "HRs", "Cox proportional hazards", "proportional hazards"], name: "Hazard ratio (HR)", category: "Endpoints", tldr: "A hazard ratio is a number comparing the rate of bad events in two groups. A treatment-versus-control ratio of 0.5 means half the instantaneous event rate among those still at risk under that comparison; it does not mean half the cumulative event probability.", summary: "The hazard ratio (HR) is a single number comparing the rate of bad events, such as death or progression, between two groups in a trial; an HR of one half describes half the instantaneous event rate among those still at risk under that comparison. It comes from Cox proportional hazards models, an HR below 1 favours the numerator group for an undesirable event, when that group is the experimental arm, and a confidence interval excluding 1 indicates statistical significance. The HR says nothing about absolute benefit or how long it lasts, so it features in ideas on powering trials for a benefit patients would value, crossover-adjusted survival and Bayesian shrinkage for subgroup claims. The term is referenced by the Pancreatic ductal adenocarcinoma entry, Michael LeBlanc, the bottlenecks on trial design and trial diversity, and ideas on Bayesian borrowing and a rulebook for external control arms.", wikipedia: W("Hazard_ratio"), related: ["hazard-ratio-basics", "confidence-interval", "p-value", "kaplan-meier-curve", "absolute-benefit", "os", "pfs", "crossover", "sample-size-re-estimation"], trials: ["checkmate-067", "adaura", "challenge"] ,
"asOf": "2026-11-12",
"links": [{"label":"Regression Models and Life-Tables","url":"https://doi.org/10.1111/j.2517-6161.1972.tb00899.x"},{"label":"NIST: exponential-model formulas","url":"https://www.itl.nist.gov/div898/handbook/apr/section1/apr161.htm"},{"label":"The hazards of hazard ratios.","url":"https://pubmed.ncbi.nlm.nih.gov/20010207/"},{"label":"OncoGuide: hazard-ratio (pinned teaching source)","url":"https://github.com/jasonlaster/oncoguide/blob/c96896452386202405c435aa161bc5047919337a/wiki/education/concepts/evidence-and-statistics/effect-measures/hazard-ratio.md"},{"label":"Boyd et al., 2012: average hazard-ratio interpretation and censoring","url":"https://pubmed.ncbi.nlm.nih.gov/22763957/"},{"label":"Altman and Andersen: time-specific number needed to treat and hazard-ratio limits (1999)","url":"https://doi.org/10.1136/bmj.319.7223.1492"}],
"notes": ["A hazard is an instantaneous event rate among people still at risk, rather than the fraction of everyone enrolled who has had an event by a date. A hazard ratio divides one group's hazard by its reference group's hazard for a defined endpoint. A true ratio of one at a time means equal hazards at that time; the numerator determines the direction. As arithmetic from that definition, treatment/control HR 0.70 describes a 30% lower hazard under the model. It does not mean 30 percentage points fewer events, 30% longer survival or a 30% reduction in each person's probability. Reversing the comparison gives 1/0.70, about 1.43. Neither direction supplies five-year absolute benefit without further outcome information and assumptions.","In a Cox proportional-hazards model, proportionality means the ratio stays constant over time; the two hazards themselves need not be constant. An adjusted estimate depends on the included covariates and their coding, and adjustment does not remove unmeasured confounding. Read event and censoring times, comparison direction, analysis population and confidence interval with the model assessment. A reported HR may average changing effects, and an estimated HR of one does not establish that the curves are identical. Crossing curves can raise concern about proportionality without diagnosing every model failure. Time-specific rates or other prespecified summaries may be more informative. Cause-specific and subdistribution hazard ratios answer different competing-risk questions and cannot be substituted for one another.","A fictional exponential model makes the distinction between rate and risk visible. Assume constant control and treatment hazards of 0.10 and 0.07 per year, one event type and no competing events. The hazard ratio is 0.70, but the risk by time t is 1 - exp(-hazard × t). At five years, risks are about 39.3% and 29.5%: a risk ratio of about 0.75 and a difference of about 9.8 percentage points. Constant hazard lines therefore coexist with rising accumulated risks. Real studies need their actual curves and model checks. Only under the constant-hazard exponential assumptions does treatment median survival divided by control median survival equal 1/HR; an HR is not generally a ratio of medians. These invented numbers are not personal prognosis estimates.","Randomisation balances baseline groups in expectation, without guaranteeing identical realised groups or later risk sets. As follow-up proceeds, an HR compares people who have remained event-free, and treatment can change who those people are. Hernán's 2010 critique explains why that selection complicates a causal interpretation and recommends appropriately adjusted survival curves or risks at fixed times. Read the endpoint, curves, absolute outcomes and uncertainty beside the ratio. An adjusted biomarker association does not demonstrate that using the marker to select treatment improves outcomes. Boyd, Kittelson and Gillen (2012) argue that a marginal hazard ratio can still be useful as an average description over the observed data when hazards are not proportional. They also explain that the usual unweighted estimate can depend on the censoring distribution and study an estimator intended to remove that dependence under their assumptions. A defined average summary therefore needs its estimand, observation period, estimation method and censoring assumptions stated; it does not automatically become a fixed-time risk contrast or an individual causal effect.","A separate fictional proportional-hazards example estimates a treatment-versus-control hazard ratio of 0.68 with a 95% confidence interval of 0.50 to 0.92 for first recurrence or death. Under that fitted model, the point estimate describes a 32% lower instantaneous event rate among those still at risk. It is different from the 30% five-year relative risk reduction in the fictional 20% versus 14% risk example. Neither 1/HR nor 1/(1 - HR) is number needed to treat; the actual time-specific absolute outcomes and relevant assumptions are needed."]
}),
  t({ id: "pcr", wikipediaChecked: "2026-09-22", links: [
  {
    "label": "ClinicalTrials.gov NCT03036488: KEYNOTE-522",
    "url": "https://clinicaltrials.gov/study/NCT03036488"
  },
  {
    "label": "ClinicalTrials.gov NCT05812807: OptimICE-pCR (A012103)",
    "url": "https://clinicaltrials.gov/study/NCT05812807"
  },
  {
    "label": "FDA breast pCR endpoint guidance, July 2020",
    "url": "https://www.fda.gov/media/83507/download"
  },
  {
    "label": "Pathological complete response and long-term clinical benefit in breast cancer: the CTNeoBC pooled analysis.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24529560/"
  },
  {
    "label": "KEYNOTE-522 primary pCR analysis, Schmid et al. 2020",
    "url": "https://doi.org/10.1056/NEJMoa1910549"
  },
  {
    "label": "KEYNOTE-522 final overall survival, Schmid et al. 2024",
    "url": "https://doi.org/10.1056/NEJMoa2409932"
  }
], aka: ["pathological complete response", "ypT0", "ypN0", "non-pCR", "residual invasive disease", "residual disease after neoadjuvant"], name: "Pathologic complete response (pCR)", category: "Endpoints", tldr: "Pathological complete response records the absence of specified residual cancer in tissue after preoperative treatment. The specimen and response definition must accompany the result.", summary: "In breast cancer, pCR must retain its named definition and specimens. FDA trial guidance describes two combined breast-and-sampled-node endpoints after neoadjuvant treatment: one permits residual ductal carcinoma in situ and the other excludes it. Older studies have also used breast-only definitions, so their response rates cannot be assumed to describe the combined endpoint. Response in sampled tissue, margin status, imaging, blood tests and long-term outcomes answer different questions.", cancers: [
  "tnbc",
  "breast-her2-positive"
], trials: ["keynote-522", "optimice-pcr"], related: [
  "surrogate-validation",
  "surrogate-endpoint",
  "efs",
  "window-of-opportunity-trial",
  "neoadjuvant-adjuvant",
  "response-adaptive-randomisation",
  "treatment-effect-in-pathology"
] ,
"asOf": "2026-11-12",
"notes": [
  "In FDA breast-trial guidance, ypT0/Tis ypN0 means no residual invasive cancer on haematoxylin and eosin (H&E) examination of the complete resected breast specimen and all sampled regional nodes after neoadjuvant systemic treatment. Residual DCIS is permitted. The stricter ypT0 ypN0 definition also excludes in situ cancer. Preserve the actual protocol and nodal assessment rules.",
  "Breast-only clearance is not the combined breast-and-node endpoint. Residual invasive cancer in a sampled node prevents that combined pCR result even when breast invasion is absent or a blood assay is negative. A small negative biopsy, imaging response and negative circulating tumour DNA are different observations.",
  "Residual DCIS can meet the invasive-clearance definition while still requiring separate margin assessment. In an otherwise qualifying specimen with DCIS but no breast invasion and no residual sampled-node cancer, the permissive definition is met and the stricter one is not. Neither pCR nor a negative local edge certifies cure or absence at every body site.",
  "Cortazar and colleagues' CTNeoBC analysis pooled 11955 patients from 12 trials. In triple-negative disease, attaining ypT0/is ypN0 was associated with event-free-survival HR 0.24 and overall-survival HR 0.16 versus not attaining pCR. This patient-level association is not a guaranteed personal outcome. The 95% confidence intervals were 0.18 to 0.33 for the triple-negative EFS association and 0.11 to 0.25 for OS.",
  "Trial-level increases in pCR had little association with event-free or overall-survival effects in CTNeoBC (R squared 0.03 and 0.24 respectively). The analysis could not validate pCR as a surrogate for improved long-term outcomes. A study reporting a pCR gain without mature survival comparison cannot infer the size of a survival benefit from the responder association.",
  "FDA's July 2020 revision 1 guidance concerns pCR endpoints for trial design and accelerated approval in high-risk early-stage breast cancer. It is not an individual treatment or cure rule. In the notation, y denotes assessment after neoadjuvant treatment and p denotes pathological assessment. Sections and stains consume finite tissue; incomplete sampling, unexamined nodes and mixed endpoint definitions can invalidate comparisons.",
  "KEYNOTE-522 separately demonstrated endpoint and survival results for the whole perioperative regimen in previously untreated stage II or III TNBC. In the 2020 primary pCR analysis of the first 602 randomised participants, pembrolizumab plus neoadjuvant chemotherapy yielded 64.8% pCR versus 51.2% with placebo plus chemotherapy (difference 13.6 percentage points, 95% CI 5.4 to 21.8). The final 2024 overall-survival report covered all 1,174 randomised participants, including postoperative pembrolizumab or placebo: at 60 months, overall survival was 86.6% versus 81.7% (P = 0.002; median follow-up 75.1 months). Survival was measured directly; the pCR gain did not mathematically predict it or isolate which perioperative component produced the benefit.",
  "In fictional case A, no breast invasion, residual DCIS and no residual cancer in sampled nodes meet ypT0/Tis ypN0 but not ypT0 ypN0. In fictional case B, the same breast finding plus a 4-mm residual invasive nodal deposit meets neither combined endpoint. Identical DCIS-at-ink findings in either case remain a separate margin question."
,
"Subtract within the same endpoint and analysis: 64.8 minus 51.2 gives a 13.6-percentage-point pCR difference in the first 602 participants; 86.6 minus 81.7 gives 4.9 points in the separately reported 60-month survival estimates for all 1,174. The latter is often rounded to about five more people alive per hundred under the trial comparison. These time-to-event estimates are not literal counts from a complete hundred-person group, an individual forecast or a conversion from the pCR difference."
]
}),
  t({ id: "rcb", wikipediaChecked: "2026-09-22", links: [
  {
    "label": "Residual cancer burden index (Symmans et al., J Clin Oncol 2007)",
    "url": "https://doi.org/10.1200/JCO.2007.10.6823"
  },
  {
    "label": "MD Anderson detailed RCB pathology methods",
    "url": "https://www.mdanderson.org/content/dam/mdanderson/documents/for-physicians/clinical-calculators/PLM_protocol_RCB_calculators_BRO.pdf"
  },
  {
    "label": "CAP invasive breast resection protocol 4.11.0.0, June 2026",
    "url": "https://www.cap.org/wp-content/uploads/2026/06/Breast.Invasive.Res_4.11.0.0.REL_CAPCP.pdf?download=true"
  },
  {
    "label": "Measurement of residual breast cancer burden to predict survival after neoadjuvant chemotherapy.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17785706/"
  },
  {
    "label": "Residual cancer burden after neoadjuvant chemotherapy and long-term survival outcomes in breast cancer: a multicentre pooled analysis of 5161 patients.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34902335/"
  },
  {
    "label": "MD Anderson RCB calculator",
    "url": "https://www3.mdanderson.org/app/medcalc/index.cfm?pagename=jsconvert3"
  },
  {
    "label": "NCI BOLD preoperative data elements, June 2014: RCB class boundaries",
    "url": "https://www.cancer.gov/about-nci/organization/ccct/steering-committees/nctn/breast-cancer/boldtfpreoperativecdes-rev.pdf"
  }
], name: "Residual cancer burden (RCB)", category: "Endpoints", tldr: "Residual cancer burden combines breast and regional-node pathology measurements after preoperative chemotherapy into a continuous score and four response classes.", summary: "Residual cancer burden (RCB) combines measurements from the treated breast tumour bed and regional lymph nodes after neoadjuvant chemotherapy. The continuous index and its four classes are different outputs: RCB-0, RCB-I, RCB-II and RCB-III. It is not an anatomical stage or a percentage recurrence risk.\n\nThe six inputs are two residual tumour-bed dimensions in millimetres, overall cancer cellularity, the percentage of that cancer that is in situ, the positive-node count and the largest nodal metastasis diameter in millimetres. Overall cellularity uses tumour-bed area as its denominator; the in situ percentage uses the cancer component. In a fictional 100-unit bed with 20 units of cancer, of which 25% is in situ, invasive cancer occupies 15 units: 20 × (1 - 0.25). The 25% in situ input is fictional denominator teaching outside the MD Anderson protocol's listed nearest-10% estimates with low 1% and 5% choices. These are area fractions, not counted-cell fractions or sequencing purity.\n\nMicroscopic examination can revise the bed dimensions initially estimated at gross examination. Cellularity is averaged across the defined bed rather than taken only from the densest focus. A sparse breast bed cannot establish the nodal inputs, final margins or distant-disease status. The original study evaluated 382 patients in two chemotherapy cohorts and found prognostic information in the combined index. An association with later outcomes does not establish the benefit of a proposed additional treatment or supply an individual forecast.", cancers: [
  "tnbc"
] ,
"asOf": "2026-11-10",
"notes": [
  "RCB combines six post-treatment pathology inputs: two breast-bed dimensions in millimetres, overall cancer area percentage, in situ percentage of the cancer component, positive-node count and largest nodal metastasis diameter in millimetres. Distinguish continuous index from classes 0, I, II and III, and both from ypTNM stage or recurrence percentages.",
  "CAP 4.11 describes the RCB breast span as the two-dimensional extent of residual invasive carcinoma, excluding DCIS from the span. The MD Anderson microscopy protocol instead starts with the gross tumour bed, revises its boundaries microscopically and estimates invasive plus in situ cancer area in that bed, using the largest bed for multicentric disease. State the protocol and denominator rather than merging these wordings. The largest contiguous residual invasive focus without adjacent treatment fibrosis supplies ypT; the gross scar, that focus and an RCB bed are different measurements.",
  "RCB nodal measurement includes intervening treatment-related fibrosis and extranodal extension within the residual metastatic area, whereas ypN uses the largest contiguous residual focus without that fibrosis. Separate deposits divided by normal nodal tissue remain separate. Routine-stain ITC-only nodes enter RCB calculations although they are excluded from the AJCC positive-node count. Do not move a nodal number between these methods without its definition.",
  "CAP states that RCB was not designed or validated for neoadjuvant endocrine treatment and advises against reporting its score or class there. Individual measurements such as cellularity may still describe residual disease. Use the official pathology assessment and calculator for unusual findings; low breast cellularity alone cannot establish nodal clearance or pCR.",
  "Yau and colleagues pooled 5161 chemotherapy-treated stage I to III patients from 12 institutes and trials. Across receptor subtypes, the unadjusted event hazard ratio per RCB unit ranged from 1.55 to 2.16. The adjusted range was 1.52 to 2.09. In the complete-covariate triple-negative model (1585 patients), the adjusted HR was 1.93 (95% CI 1.74 to 2.13). Adjustment included age and baseline T category, nodal status and grade; these are prognostic associations, not treatment-benefit estimates.",
  "For a fictional 20 by 10 mm bed, 20% overall cancer cellularity, 50% in situ share of cancer, two positive nodes and a 3-mm largest nodal metastasis, d_prim is 14.1421356 mm and f_inv is 0.10. The breast term is 1.4849628 and nodal term 1.3256445, summing to 2.8106074, approximately 2.811 and RCB-II. With zero involved nodes the nodal term is zero and the breast term remains approximately 1.485, also RCB-II. This is not stage II or a recurrence percentage; the separate 25% in situ denominator illustration is not this specimen.",
  "RCB classes use the continuous index without rounding at a boundary: 0 is RCB-0; greater than 0 through 1.36 is RCB-I; greater than 1.36 through 3.28 is RCB-II; and greater than 3.28 is RCB-III. The NCI BOLD data elements record these cutoffs. Residual in situ disease can be compatible with RCB-0 under the method; use the specified nodal and pathological assessment rather than equating any ypN0 modifier with complete response.",
  "Symmans and colleagues' 2007 typeset equation defines d_prim = sqrt(d1 × d2), f_inv = (C/100) × (1 - S/100), and RCB = 1.4 × (f_inv × d_prim)^0.17 + [4 × (1 - 0.75^N) × d_met]^0.17. The entire nodal bracket is raised to 0.17. Here N originally counts involved axillary nodes and d_met is the largest axillary metastasis diameter. Because only the largest deposit was measured, the model assumed each additional metastasis had 75% of the diameter of the next largest. Preserve full precision near class boundaries.",
  "The 2007 study derived the index in 241 patients treated with paclitaxel followed by fluorouracil, doxorubicin and cyclophosphamide, and validated it in 141 treated with the latter combination: 382 patients with T1 to T3, N0 to N1, M0 disease. Class boundaries here come from NCI BOLD data elements, not the equation itself. This empirically fitted prognostic index is neither a cell count nor a personal probability.",
  "Use the official calculator with the pathology team's protocol-specific assessment for unusual findings; low breast cellularity cannot establish negative nodes. A per-unit hazard ratio compares event rates under a study model, not a recurrence percentage or an estimate of benefit from adding treatment."
],
"related": [
  "tumor-bed-cellularity",
  "treatment-effect-in-pathology"
]
}),
  t({ id: "ppv", name: "Positive predictive value (PPV)", category: "Diagnostics", tldr: "Positive predictive value is the fraction of positive results that match the reference condition rather than being false positive calls. It depends on prevalence and the test's actual performance.", summary: "Positive predictive value is the proportion of positive test calls that meet a specified reference condition: true positives divided by true plus false positives. A positive result can be a true positive or a false positive; a false positive is a positive call in someone without that reference condition. Negative predictive value uses negative calls as its denominator. These differ from sensitivity and specificity, which start with reference-condition groups. The population base rate, reference standard, threshold and actual assay performance determine how the fractions should be interpreted.", wikipedia: W("Positive_and_negative_predictive_values"), technologies: ["mced"] ,
"notes": ["Separate the index-test result from a defined reference condition. Sensitivity is TP/(TP+FN), the positive fraction among reference cases; specificity is TN/(TN+FP), the negative fraction among reference non-cases. PPV is TP/(TP+FP), the reference-case fraction among positive calls; NPV is TN/(TN+FN), the reference-noncase fraction among negative calls. Base rate means prevalence of that reference condition in the intended tested population. Regrouping the same people by positive calls changes a denominator without adding participants.","Fictional groups each contain 1,000 people, with complete reference assessment, no indeterminate results and assumed sensitivity 80 per cent and specificity 90 per cent. At 10 per cent prevalence there are TP 80, FN 20, FP 90 and TN 810: PPV is 80/170, about 47.1 per cent, and NPV 810/830, about 97.6 per cent. At 50 per cent prevalence the counts are 400, 100, 50 and 450: PPV is 88.9 and NPV 81.8 per cent. At 5 per cent prevalence there are 40 true and 95 false positive calls, giving PPV 29.6 per cent. The examples hold performance fixed to isolate base rate; real populations can change performance too. High NPV can coexist with missed cases and is not a universal absence-of-disease guarantee.","Use test results and suitable independent reference outcomes in the intended population. Keep the locked threshold, condition definition, assay version, all four counts, confidence intervals and handling of missing or indeterminate results. Verifying only positive calls, using an imperfect comparator or borrowing another population's prevalence can mislead. Without a reference that establishes the condition, positive and negative percent agreement may be the appropriate descriptions; agreement does not prove either method correct. Imaging and pathological response are different assessments, so a comparison needs the population, regimen, definition, timing and surgical reference. Accuracy alone establishes neither treatment benefit nor safe surgery omission, and population fractions are not automatic personal probabilities.","Fictional examples hold sensitivity at 90 per cent and specificity at 95 per cent to isolate the base rate, with complete reference assessment and no indeterminate tests. Among 1,000 people with condition prevalence 10 per cent, 100 have the condition: 90 test positive, while 45 of the 900 without it test positive. PPV is 90/(90 + 45), about 67 per cent. At 2 per cent prevalence, 20 have the condition: 18 test positive and 49 of the other 980 test positive. PPV is 18/(18 + 49), about 27 per cent. The same assumed sensitivity and specificity therefore yield very different positive-call fractions. Actual performance can also change across populations. A negative test retains its detection limits, specimen timing and pretest context rather than guaranteeing absence of disease."],
"links": [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Positive_and_negative_predictive_values"},{"label":"FDA: statistical guidance for reporting diagnostic-test studies","url":"https://www.fda.gov/media/71147/download"}],
"asOf": "2026-11-12"
}),
  t({ id: "stage-shift", wikipedia: W("Cancer_staging"), name: "Stage shift", category: "Diagnostics", tldr: "Stage shift means finding more cancers early and fewer late; it is the measurable goal of screening.", summary: "Stage shift is the observable goal of screening: more cancers found at an early stage and fewer found late. It is the primary endpoint of the NHS-Galleri trial, defined as a reduction in the incidence of stage III and IV disease. A stage shift does not by itself prove that a screening test saves lives, because lead-time bias, length-time bias and overdiagnosis can all produce one, but it is a necessary precondition for any such benefit. The term is linked to the Multi-cancer early detection (MCED) and Mammography & tomosynthesis technologies and is referenced by UKCTOCS, High-risk pancreatic surveillance, the early detection roadmap, the bottleneck on late-found cancers and an idea on letting MCED trials read out on late-stage incidence.", technologies: ["mced", "mammography"], trials: ["nhs-galleri"] }),
  t({ id: "suv", name: "Standardised uptake value (SUV)", category: "Imaging", tldr: "The standardised uptake value (SUV) is a number for how brightly a spot lights up on a PET scan.", summary: "The standardised uptake value (SUV) is the number radiologists use to say how brightly a spot lights up on a PET scan. It is tissue radioactivity normalised to the injected dose and body weight, and SUVmax is the most widely used version. Values are affected by the scanner, the uptake time and blood glucose, and the PERCIST response criteria use SUL, a lean-body variant, instead. The term belongs to the PET (positron emission tomography) and FDG PET technology entries and to the Fludeoxyglucose F-18 (FDG) drug record, and it is referenced by the Cancer metabolism pathway, the Warburg effect, the Society of Nuclear Medicine and Molecular Imaging, and ideas on de-acidifying tumours so T cells can work and on a phase 0 fund using microdoses and imaging.", wikipedia: W("Standardized_uptake_value"), technologies: ["pet", "fdg-pet"] }),

  // ---- Biomarkers ----
  t({ id: "ihc", aka: ["0/1+", "1+/2+", "2+/3+", "membrane staining", "membranous staining", "staining intensity"], name: "Immunohistochemistry (IHC)", category: "Diagnostics", tldr: "Staining a tissue slice with antibodies so a protein shows up in colour under the microscope.", summary: "Immunohistochemistry (IHC) uses antibody binding and signal development to show a selected protein in a prepared tissue section. Interpretation retains which cells and compartments stain, the intensity and distribution, and the named marker-specific method. A percentage, intensity category or composite score can describe different aspects of the result. Fixation, retrieval, controls, sampling and observer variation affect interpretation. Automated quantification also needs validation for its marker, specimens and intended use. A research stain or generic score does not replace a validated clinical selection assay.", wikipedia: W("Immunohistochemistry"), technologies: ["histopathology-ihc", "digital-pathology-ai"] ,
"notes": [
  "There is no universal IHC scoring scale or positivity threshold. Retain antibody clone, retrieval and detection method, controls, eligible cells, subcellular location, intensity, distribution and intended use. A research stain does not automatically replace a clinical selection assay.",
  "An H-score under the intensity-weighted convention is weak-cell percentage plus twice moderate-cell percentage plus three times strong-cell percentage, on a 0 to 300 scale. Fictional example: 50 unstained, 10 weak, 20 moderate and 20 strong cells out of 100 give 50% positive and H-score 110. Neither is a molecule count.",
  "Bulk receptor abundance and staining mainly on blood vessels can both be correct: one measures a mixture and the other locates signal. Neither establishes target accessibility or treatment benefit. Staining also does not establish protein activity or cancer-cell dependence on that protein.",
  "IHC makes selected proteins visible through antibody binding and signal development in a prepared section. Specificity, retrieval, detection, positive controls, internal controls and background matter. Nuclear and membrane signals answer different questions. Multiplex fluorescence adds markers but still needs validated antibody performance and cell-boundary assignment.",
  "In the conventional Allred scheme, proportion categories are 0 for no positive cells, 1 for less than 1%, 2 for 1% to 10%, 3 for 11% to 33%, 4 for 34% to 66% and 5 for 67% to 100%. Intensity is 0 for absent staining or 1, 2 and 3 for weak, moderate and strong staining. The total is 0 or 2 to 8. In a fictional separate example, 30% positive cells with moderate staining give 3 + 2 = 5. These integer bins are a named convention, not a universal positivity rule.",
  "Equal H-scores can conceal different intensity distributions. A negative clinical category does not establish zero protein molecules. HER2 and hormone-receptor assays have marker-specific reporting rules; current CAP breast reporting retains percentage and intensity even when an optional composite score is given.",
  "A useful IHC result identifies the block, fixation and section, antibody clone, retrieval and detection system, eligible cells and scored compartment. Cutting and staining use finite tissue. Report the percentage, intensity, location and named scoring scale, together with expected-positive tissue, relevant internal controls and background assessment. Poor preservation, nonspecific binding, few eligible cells, heterogeneous staining and observer variation can limit interpretation. Validation must fit the assay and its intended use; a research measurement is not automatically a clinical selection test."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Immunohistochemistry"
  },
  {
    "label": "Measurement method and interpretation source",
    "url": "https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"
  },
  {
    "label": "RCPath breast dataset, Table 8, Allred and H-score conventions",
    "url": "https://www.rcpath.org/static/d255f34c-176a-490d-9b5a7d58ac85f3a6/b4cf9184-33ff-4662-b33990b3701c3d87/G148-Dataset-for-histopathological-reporting-of-breast-disease-in-surgical-excision-specimens-of-breast-cancer.pdf"
  }
],
"asOf": "2026-11-10"
}),
  t({
    notes:["In a historical study of 18 pathologists reading 170 selected biopsies, concordance in the 0 versus 1+ range was lower than for 2+ versus 3+ (Fernandez 2022). That is a result of that study, not the probability that an individual report is wrong. Tissue, sampling time, reader and assay matter; a second review or a different specimen needs clinical and laboratory context and does not guarantee a changed result or access to a medicine.",
"HER2-low generally means IHC 1+ or 2+/ISH-negative in the specified breast-cancer context. The faint incomplete pattern historically within IHC 0 and described as ultralow is separately recorded as negative 0+ in the September 2026 CAP template. Low expression is not the same as HER2 overexpression/amplification and is not necessarily one biological disease. Keep the actual test, integrated result, sample date and treatment setting; one score does not promise response to every antibody-drug conjugate."
,
"Denkert's 2021 pooled analysis included 2,310 patients with HER2-non-amplified primary breast cancer treated in four prospective neoadjuvant chemotherapy trials. HER2-low meant IHC 1+ or 2+/ISH-negative. Among the 1,162 hormone receptor-negative tumours, 395 were HER2-low, about 34.0%. That is a tested category in this selected population, not a different HER2 protein, a universal TNBC prevalence or an independent treatment-eligibility rule.",
"Expression and clinical eligibility are different from organ-risk assessment. The U.S. ENHERTU label calls for assessment of left-ventricular ejection fraction before treatment and at regular intervals during treatment as clinically indicated. It does not turn a HER2 score into a personal monitoring schedule or establish that a tumour-expression category predicts cardiac injury."
], asOf:"2026-11-11", id: "her2-low", tags: ["precision"], aka: ["HER2-low", "HER2 low", "HER2-ultralow", "HER2 ultralow", "HER2-ultra-low", "HER2 IHC 1+", "IHC 1+", "IHC 2+ ISH-negative", "HER2 IHC 0", "HER2-zero", "HER2 0", "HER2 immunohistochemistry score", "HER2-low status"], wikipedia: W("HER2"), links: [{"label":"NCI Dictionary of Cancer Terms: HER2-low breast cancer","url":"https://www.cancer.gov/publications/dictionaries/cancer-terms/def/her2-low-breast-cancer"},{"label":"Quinn et al., Histopathology 2026;89(2):199 to 218: World Health Organization classification of tumours of the breast, 6th edition 2026","url":"https://doi.org/10.1111/his.70149"},{"label":"CAP breast biomarker template, September 2026: specimen, scoring method and interpretation","url":"https://www.cap.org/wp-content/uploads/2026/09/Breast.Bmk_1.6.2.0.REL_CAPCP.pdf?download=true"},{"label":"Current U.S. ENHERTU prescribing information: indications and patient selection","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e67e73e-ddf4-4e4d-8b50-09d7514910b6"},{"label":"FDA: current companion diagnostic intended uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools"},{"label":"DESTINY-Breast04 primary report","url":"https://pubmed.ncbi.nlm.nih.gov/35665782/"},{"label":"DESTINY-Breast06 primary report","url":"https://pubmed.ncbi.nlm.nih.gov/39282896/"},{"label":"Historical HER2 reader-concordance study","url":"https://pubmed.ncbi.nlm.nih.gov/35113160/"},
{
  "label": "cap her2 recommendations 2023",
  "url": "https://www.cap.org/wp-content/uploads/documents/her2_breast_update_sor_2023.pdf?download=true"
}
,
{
  "label": "Denkert et al.: pooled assay-defined groups from four neoadjuvant trials (2021)",
  "url": "https://pubmed.ncbi.nlm.nih.gov/34252375/"
}
], name: "HER2-low and HER2-ultralow", category: "Biomarkers", tldr: "HER2-low and HER2-ultralow describe particular staining categories used in breast-cancer studies and specified treatment labels. They do not mean that everyone in a category has the same biology or qualifies for the same treatment.", summary: "HER2-low generally denotes IHC 1+ or IHC 2+ with a negative ISH result in the relevant breast-cancer context. HER2-ultralow denotes the IHC 0 pattern with membrane staining used in DESTINY-Breast06 and the corresponding U.S. ENHERTU label. These are measured categories with assay and reporting context. The September 2026 CAP template records the membrane-staining pattern as negative score 0+, separately from negative score 0 with no detected membrane staining.\n\nDESTINY-Breast04 studied previously chemotherapy-treated HER2-low metastatic disease, including hormone receptor-positive and hormone receptor-negative participants. DESTINY-Breast06 studied hormone receptor-positive disease after endocrine therapy without prior chemotherapy for metastatic disease; its primary comparison concerned HER2-low disease and its ultralow analysis was exploratory. Neither trial establishes that every low-expression category is one biological disease or validates a cutoff for every ADC. The U.S. ENHERTU HER2-low and HER2-ultralow breast indications require an FDA-authorized HER2 test and unresectable or metastatic disease. One use is HR-positive HER2-low or HER2-ultralow disease that has progressed on one or more endocrine therapies in the metastatic setting. A separate HER2-low use requires prior chemotherapy in the metastatic setting, or recurrence during or within six months after adjuvant chemotherapy. The latter low-expression use does not require HR-positive disease; the ultralow indication does. The score alone does not establish eligibility or individual benefit.", drugs: ["trastuzumab-deruxtecan"], trials: ["destiny-breast04", "destiny-breast06"], cancers: ["tnbc", "breast-hr-positive"] }),
  t({ id: "cps", wikipedia: W("PD-L1"), name: "Combined positive score (CPS)", category: "Biomarkers", tldr: "CPS is a PD-L1 score based on eligible stained tumour cells and certain immune cells divided by viable tumour cells. Its clinical meaning depends on the assay and treatment setting.", summary: "The combined positive score (CPS) counts eligible PD-L1-stained tumour cells, lymphocytes and macrophages, divides by all viable tumour cells and multiplies by 100. The cited 22C3 TNBC method caps the reported whole-number score at 100. In unresectable locally advanced or metastatic TNBC, CPS at least 10 is part of the selection criteria for specified pembrolizumab combinations; the score alone does not establish eligibility. TPS counts qualifying tumour cells alone, while the SP142 immune-cell score uses an area denominator. Thresholds and eligible-cell rules must stay with the relevant assay, cancer and regimen.", targets: ["pdl1"], drugs: ["pembrolizumab"], trials: ["keynote-355"] ,
"notes": [
  "For 22C3 TNBC CPS, the denominator is all viable invasive tumour cells, while eligible stained tumour cells, lymphocytes and macrophages enter the numerator. Raw arithmetic can exceed 100, but the reported whole-number CPS is capped at 100. A CPS of 100 does not mean all tumour cells stain. Retain the assay and clinical setting."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/PD-L1"
  },
  {
    "label": "Agilent US TNBC quick scoring guide",
    "url": "https://www.agilent.com/cs/library/flyers/public/29390-d62312-pd-l1-22c3-tnbc-qsg-us.pdf"
  }
],
"asOf": "2026-11-10",
"related": [
  "pd-l1-cps"
]
}),
  t({ id: "tils", aka: ["tumor-infiltrating lymphocytes", "tumour-infiltrating lymphocyte"], name: "Tumour-infiltrating lymphocytes (TILs)", category: "Biomarkers", tldr: "Tumour-infiltrating lymphocytes are lymphocytes found in tumour tissue. Their identity, location, measurement denominator and function answer different questions.", summary: "Tumour-infiltrating lymphocytes (TILs) are lymphocytes found in sampled tumour tissue, including T- and B-cell populations. The breast stromal TIL method estimates the area occupied by a defined mononuclear inflammatory infiltrate within eligible tumour-associated stroma on H&E sections. Higher pretreatment scores were associated with better outcomes in the cited early triple-negative breast cancer cohorts, but those associations do not guarantee an individual outcome or establish extra benefit from pembrolizumab. Intratumoral location, stromal area, immune-cell counts and cells expanded for TIL therapy are different measurements or uses.", wikipedia: W("Tumor-infiltrating_lymphocytes"), cancers: ["tnbc"], technologies: ["til-therapy", "digital-pathology-ai"] ,
"notes": [
  "The breast stromal TIL method estimates the area occupied by mononuclear inflammatory cells, including lymphocytes and plasma cells, as a percentage of eligible tumour-associated stroma. It is not the percentage of all cells, a CD8-cell count or the fraction of cancer cells being killed.",
  "Define the eligible region and treatment setting before estimating the percentage. Use the specified exclusions for normal structures, in-situ disease, necrosis, crush damage and biopsy-site changes, and assess the region overall rather than only its hottest spot. A prognostic association does not establish added benefit from a particular treatment.",
  "In the pooled analysis of 2,148 early-stage TNBC patients given anthracycline-based chemotherapy with or without taxanes, each 10 percentage-point increase in pretreatment stromal TILs corresponded to an adjusted invasive disease-free survival hazard ratio of 0.87 (95% confidence interval 0.83 to 0.91) and overall survival hazard ratio of 0.84 (0.79 to 0.89). These associations do not establish an added pembrolizumab benefit by TIL level.",
  "Among 906 TNBC patients from six neoadjuvant chemotherapy trials, pathological complete response occurred in 80 of 260 with low TILs (0% to 10%), 117 of 373 with intermediate TILs (11% to 59%) and 136 of 273 with high TILs (at least 60%): about 31%, 31% and 50%. These categories describe that analysis and are not universal treatment cutoffs.",
  "Fictional area exercise: region A has 4 units of eligible stroma with 0.4 occupied by infiltrate; region B has 1 unit with 0.6 occupied. Pooled occupied area is (0.4 + 0.6)/(4 + 1) = 20%. Averaging the regional percentages without area weighting gives (10% + 60%)/2 = 35%. This arithmetic illustrates the denominator; it does not prescribe a pixel workflow for clinical semiquantitative scoring.",
  "A fictional sTIL estimate of 30% means that the defined mononuclear infiltrate occupies about 30% of eligible stromal area. It does not mean 30% of all cells are lymphocytes or CD8 cells, or that 30% of cancer cells are being killed. Intratumoral TILs, positive-nucleus fractions, cells per square millimetre and bulk immune RNA measure different things. Additional stains change the measurement rather than silently changing its denominator.",
  "Residual-disease recommendations assess the residual tumour bed rather than simply reusing untreated invasive borders. Keep specimen type, site, treatment setting and observer calibration. A high score does not prove tumour-specific recognition, entry into every malignant nest or a permanent hot-tumour state.",
  "To interpret a stromal TIL estimate, retain the block, sampled site, specimen type and treatment setting, then define the eligible stromal region and its exclusions. The output is a continuous estimated percentage of that area occupied by the specified infiltrate. State whether a trained observer or a computational method produced it, with calibration and regional sampling where relevant. Artifacts, sparse stroma, heterogeneity, observer variation and an unrepresentative sample can limit the result. The section uses finite tissue, and measurement reproducibility is a separate question from validation for clinical treatment selection.",
  "TIL is a location label, CD8 is a phenotype and antigen specificity is another property. Simoni found bystander CD8 cells recognizing viral rather than cancer epitopes in human lung and colorectal tumours; the study’s CD39 associations are not a universal test of every cell’s target. A functional assay compares defined effectors and targets with recognition and target-survival controls. Neither presence, cytokine release nor one killing assay reproduces every access barrier or establishes clinical benefit.",
  "The Loi analysis pooled nine studies. In its node-negative subgroup with at least 30% stromal TILs, three-year overall survival was 99% (95% CI 97% to 100%) after the specified adjuvant chemotherapy. Denkert’s pooled neoadjuvant population contained 3,771 patients overall, including the 906 TNBC patients described above. These population and subgroup findings do not make the study categories universal beneficial-TIL thresholds or establish additional pembrolizumab benefit by score.",
  "In a fictional section, 0.4 square millimetres of mononuclear infiltrate within 2 square millimetres of eligible stroma gives 20% by area. Separately, 30 CD8 cells among 100 counted lymphocytes gives 30% of those counted lymphocytes. Neither is the fraction of all tumour cells, a measure of cancer specificity or evidence of useful killing. One occupied unit among five equal eligible stromal-area units also gives 20%; the drawing illustrates a denominator rather than prescribing pixel counting for semiquantitative breast scoring.",
  "Fixed sections and morphology or selected stains can measure identity, compartment and abundance; viable-cell assays ask about phenotype and function. Dissociation loses native location, culture can select populations and tests consume finite material. Keep cells per square millimetre, specified cell fractions, stromal-area percentages and assay-specific function distinct. TIL therapy is a manufactured expanded-cell product: a tissue count does not establish product yield, composition, potency or treatment success. Sampling, damage, mixed compartments, unsuitable markers and culture selection are different failure modes, and descriptive pathology, research function and clinical treatment selection require different validation."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Tumor-infiltrating_lymphocytes"
  },
  {
    "label": "International TILs Working Group breast assessment recommendations",
    "url": "https://tilsinbreastcancer.org/wp-content/uploads/2017/11/Salgado-et-al.-Annals-of-Oncology-2015.pdf"
  },
  {
    "label": "Loi et al., pooled early TNBC prognostic analysis, 2019",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30650045/"
  },
  {
    "label": "Denkert et al., neoadjuvant TIL response analysis, 2018",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29233559/"
  },
  {
    "label": "Working Group residual-disease assessment recommendations",
    "url": "https://tilsinbreastcancer.org/wp-content/uploads/2017/10/Suppl-File-3-Recommendations-for-assessing-tumor-infiltrating-lymphocytes-TILs-in-RD.pdf"
  },
  {
    "label": "Bystander CD8&lt;sup&gt;+&lt;/sup&gt; T cells are abundant and phenotypically distinct in human tumour infiltrates.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29769722/"
  },
  {
    "label": "The evaluation of tumor-infiltrating lymphocytes (TILs) in breast cancer: recommendations by an International TILs Working Group 2014.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25214542/"
  }
],
"asOf": "2026-11-11",
"related": [
  "tumor-stroma-ratio",
  "cold-vs-hot",
  "cd4-t-cell-subsets"
]
}),
  t({ id: "tmb", name: "Tumour mutational burden (TMB)", category: "Biomarkers", tldr: "Tumour mutational burden is an assay-defined density of eligible DNA mutations, usually reported per million bases.", summary: "Tumour mutational burden divides eligible somatic mutation counts by an eligible DNA territory, commonly in mutations per megabase. Counting, origin filtering, calibration, specimen and quality rules affect the estimate. It does not directly measure immune recognition, copy-number instability or treatment response. A clinical threshold applies only within its validated assay and disease setting.", wikipedia: W("Tumor_mutational_burden"), technologies: ["cgp"], drugs: ["pembrolizumab"] ,
"links": [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Tumor_mutational_burden"},{"label":"FDA pembrolizumab label revised July 2026","url":"https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/125514s194lbl.pdf"},{"label":"Merino et al. (2020), in-silico TMB harmonization","url":"https://friendsofcancerresearch.org/wp-content/uploads/JITC_Establishing_guidelines_to_harmonize-TMB_2.pdf"},{"label":"FDA, 16 October 2026: traditional approval and updated TMB-H indication","url":"https://www.fda.gov/drugs/cancer-approvals/fda-grants-traditional-approval-pembrolizumab-or-pembrolizumab-and-berahyaluronidase-alfa-pmph"},{"label":"KEYTRUDA current prescribing information, sections 1.18 and 2.1","url":"https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9333c79b-d487-4538-a9f0-71b91a02b287"},{"label":"Barroso-Sousa et al.: mutation-burden distributions in breast-cancer samples (2020)","url":"https://pubmed.ncbi.nlm.nih.gov/32067680/"}],
"notes": ["TMB is the density of eligible somatic mutations over the assay reporting region, in mut/Mb (Mb = one million bases); the numerator rules, filters and any calibration are method-specific.","Panel, exome and genome examine different regions; a cancer-gene-enriched region need not behave as a random genomic sample.","When laboratories analysed the same exome data with their own regions and pipelines panel TMB estimates varied; this was a computational comparison, not proof of interchangeability for treatment selection.","More mutations offer more candidate neoantigens, but processing, HLA display and immune function still matter; high TMB neither guarantees checkpoint benefit nor establishes benefit in every cancer.","On 16 October 2026, FDA converted the U.S. tumour-agnostic pembrolizumab indication to traditional approval and changed its TMB-H criterion from 10 to at least 13 mutations per megabase. Section 1.18 covers adults and children with unresectable or metastatic solid tumours, measured by an FDA-authorised test, that have progressed after prior treatment and have no satisfactory alternative treatment options. This criterion does not replace thresholds in other indications or historical studies.","Fictional teaching exercise: 24 eligible mutations over 2 Mb is 12 mut/Mb and over 1 Mb is 24 mut/Mb; not comparable clinically without counting and calibration rules; a research result does not establish authorised-test eligibility.","TMB differs from copy-number instability and from MSI, and a TMB category does not settle an individual outcome.","Retain specimen type, DNA consumption, eligible mutation classes and reporting territory, germline/artefact filtering, calibration, mut/Mb, quality and uncertainty. Blood and tissue estimates need separate validation. Low tumour signal and uneven coverage can bias the count; both analytical performance and clinical applicability must match the assay, cancer and setting.","The July 2026 pembrolizumab label describes the TMB supporting KEYNOTE-158 analysis as a prospectively planned retrospective analysis of ten nonrandomized cohorts. That design does not establish TMB-based selection for early triple-negative breast cancer; retain the population, endpoint and clinical setting with the evidence.","Barroso-Sousa and colleagues analysed 3,969 primary or metastatic breast-cancer samples from six public studies using exome or panel sequencing. Median mutation burden differed across their receptor-defined groups, with the triple-negative group above HER2-positive and hormone-receptor-positive/HER2-negative groups. This is a group comparison with mixed specimen and assay contexts. It does not assign an individual's TMB-high category, predict how many HLA-associated peptides an assay will recover, establish presentation, determine treatment eligibility or show benefit. The study's research threshold belongs to its analysis and does not replace a later label or another assay's rule."],
"asOf": "2026-11-11"
}),
  t({ id: "msi", name: "Microsatellite instability (MSI-H) / mismatch repair deficiency (dMMR)", category: "Biomarkers", aka: ["MSI-high", "microsatellite instability-high", "mismatch repair-deficient", "mismatch repair deficient", "MMR-deficient", "MMR deficiency", "MMRd", "MMR immunohistochemistry", "mismatch repair immunohistochemistry", "MMR IHC", "mismatch repair proteins", "MLH1, MSH2, MSH6 and PMS2", "MSI by PCR", "microsatellite instability testing", "MSI testing"], tldr: "Microsatellite instability describes altered DNA repeats; mismatch-repair deficiency concerns the machinery that corrects copying errors.", summary: "Mismatch repair normally corrects certain DNA copying errors. Defects can produce unstable short repeats, measured by defined DNA tests. Repair-protein staining examines another layer and requires appropriate controls. MSI-high, stable and indeterminate results retain their own assay definitions. Neither a tumour finding nor a retained stain alone diagnoses inherited risk, proves all repair function or guarantees treatment response.", wikipedia: W("Microsatellite_instability"), drugs: ["pembrolizumab", "dostarlimab"], cancers: [
  "colorectal",
  "endometrial"
] ,
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Microsatellite_instability"
  },
  {
    "label": "FDA pembrolizumab label revised July 2026",
    "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/125514s194lbl.pdf"
  },
  {
    "label": "CAP 2022 MMR/MSI recommendations",
    "url": "https://www.cap.org/wp-content/uploads/documents/mmr-msi-summary-recommendations.pdf"
  }
],
"notes": [
  "Microsatellites are short repeats; MSI is altered repeats in tumour DNA; MMR corrects some copying errors; dMMR lets repeat changes accumulate.",
  "PCR or validated sequencing observes repeat instability; IHC observes staining for MLH1, PMS2, MSH2 and MSH6; they ask different questions and neither is a complete repair test.",
  "MSI-H, MSS and indeterminate are assay labels; an inadequate or indeterminate specimen must keep that label rather than become MSS.",
  "CAP recommends cancer-type-specific validation for cancers outside better-established settings and says TMB should not be used as a surrogate for MMR status.",
  "A tumour MSI or dMMR finding does not alone diagnose Lynch syndrome; some colorectal tumours lose MLH1 by methylation.",
  "The U.S. pembrolizumab label section 1.8 covers unresectable or metastatic MSI-H or dMMR solid tumours, as determined by an FDA-authorised test, that progressed after prior treatment with no satisfactory alternatives; this is a reason to measure accurately, not a guarantee of response.",
  "Fictional teaching exercise: Retained IHC staining with an indeterminate DNA MSI result cannot be reported as confirmed MSS; keep both results.",
  "DNA repeat analysis and repair-protein staining use different material and controls: extraction consumes DNA; staining consumes tissue sections. Keep the named repeat algorithm or each protein stain, adequate tumour content, controls, quality and any discordance. No universal instability fraction or staining shortcut fits all cancers; inadequate material, failed controls and degraded samples need explicit labels and review."
],
"asOf": "2026-11-10"
}),
  t({ id: "hrd", name: "Homologous recombination deficiency (HRD)", category: "Biomarkers", tldr: "Homologous recombination deficiency means that a template-guided DNA repair process is impaired. A gene finding, a genomic scar and current repair function provide different evidence.", summary: "A repair-gene finding suggests a possible cause, a genomic scar records accumulated consequences, and a functional assay tests present behavior. A variant is not automatically damaging, loss of one copy is not automatically loss of both, and repair can recover while historical scars persist. None of these observations alone is the probability of clinical benefit.\n\nHomologous recombination uses sufficiently matching DNA, often the sister chromatid after copying, to repair certain breaks. BRCA1 helps coordinate repair; BRCA2 helps RAD51 assemble on prepared single-stranded DNA to search and pair with a template. Template availability and cell-cycle state matter. In a fictional model with both functional BRCA2 copies lost, template-guided repair is impaired and alternative joining can leave deletions and rearrangements, but the sequence of a scar does not uniquely identify the cause or every protein that acted.\n\nA low RAD51-focus count is interpretable only with adequate tumor cells, an appropriate cycling population and evidence that the cells experienced damage. Cruz 2018 assessed RAD51 with geminin as an S/G2 marker and gamma-H2AX as a damage marker in patient-derived models and retrospective tumor specimens. Fixed tissue can support this functional-surrogate approach; functional does not always mean live drug culture. An inadequate sample is uninformative, and a research assay needs analytical and clinical validation for its intended use.\n\nTelli tested scar-score associations with response to platinum-containing chemotherapy before surgery in triple-negative breast cancer; that result does not establish a universal PARP-inhibitor cutoff. Farmer demonstrated sensitivity to PARP inhibition in BRCA-deficient cell models, a separate evidence setting. The U.S. olaparib early-breast-cancer label specifies deleterious or suspected deleterious germline BRCA findings, HER2-negative high-risk disease, prior neoadjuvant or adjuvant chemotherapy and companion-diagnostic selection. A tumor-only result or high scar score does not replace those criteria.", wikipedia: W("Homologous_recombination"), targets: ["brca", "parp"], technologies: ["hrd-testing"] ,
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Homologous_recombination"
  },
  {
    "label": "Sister chromatid gene conversion is a prominent double-strand break repair pathway in mammalian cells. (primary abstract; 2000)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10880452/"
  },
  {
    "label": "Reversion and non-reversion mechanisms of resistance to PARP inhibitor or platinum chemotherapy in BRCA1/2-mutant metastatic breast cancer. (primary abstract; 2020)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32245699/"
  },
  {
    "label": "RAD51 foci as a functional biomarker of homologous recombination repair and PARP inhibitor resistance in germline BRCA-mutated breast cancer. (primary abstract; 2018)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29635390/"
  },
  {
    "label": "Homologous Recombination Deficiency (HRD) Score Predicts Response to Platinum-Containing Neoadjuvant Chemotherapy in Patients with Triple-Negative Breast Cancer. (primary abstract; 2016)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26957554/"
  },
  {
    "label": "NCI: BRCA findings and test interpretation",
    "url": "https://www.cancer.gov/about-cancer/causes-prevention/genetics/brca-fact-sheet"
  },
  {
    "label": "Brca1 controls homology-directed DNA repair. (1999; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10549283/"
  },
  {
    "label": "Purified human BRCA2 stimulates RAD51-mediated recombination. (2010; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/20729832/"
  },
  {
    "label": "Mechanism of microhomology-mediated end-joining promoted by human DNA polymerase θ. (2015; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25643323/"
  },
  {
    "label": "Targeting the DNA repair defect in BRCA mutant cells as a therapeutic strategy. (2005; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15829967/"
  },
  {
    "label": "DailyMed Lynparza prescribing information: section 1.4",
    "url": "https://dailymed.awsprod.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=741ff3e3-dc1a-45a6-84e5-2481b27131aa&type=display"
  }
],
"asOf": "2026-11-10"
}),
  t({ id: "ctdna", tags: ["precision"], aka: ["circulating tumor DNA", "ctDNA-positive", "ctDNA-negative", "ctDNA-based", "ctDNA-directed", "tumour fraction"], name: "Circulating tumour DNA (ctDNA)", category: "Biomarkers", tldr: "Circulating tumour DNA (ctDNA) consists of fragments of DNA shed by tumour cells into the blood, detectable with sensitive sequencing.", summary: "Circulating tumour DNA (ctDNA) is made up of DNA fragments shed by tumour cells into the bloodstream, where they form only a small fraction of all cell-free DNA and are detected with sensitive sequencing. Its uses span genotyping for companion diagnostics, tracking resistance mutations such as EGFR T790M and ESR1, molecular residual disease, early detection and response monitoring. Shedding varies with tumour type and burden, and clonal haematopoiesis can confound results. The term underpins the Liquid biopsy (ctDNA), MRD / molecular residual disease testing and Multi-cancer early detection (MCED) technologies, and it appears in the SERENA-6, CIRCULATE-Japan and IMvigor011 trials and in ideas on molecular-progression switching beyond ESR1 and HPV ctDNA to guide cervical cancer therapy.", wikipedia: W("Circulating_tumor_DNA"), technologies: ["liquid-biopsy", "mrd-testing", "mced"], notes: ["Detection depends on stage and tumour type: with digital PCR-based methods in 640 patients, ctDNA was found in more than 75% of people with advanced pancreatic, ovarian, colorectal, bladder, gastro-oesophageal, breast, melanoma, hepatocellular and head and neck cancers, and in fewer than 50% of primary brain, renal, prostate or thyroid cancers. In localised disease it was found in 73% of colorectal, 57% of gastro-oesophageal, 48% of pancreatic and 50% of breast adenocarcinomas, and it was often present in people with no detectable circulating tumour cells (Bettegowda 2014). The assay, specimen and population are part of each figure.", "ctDNA is a subset of cell-free DNA, and not every plasma variant is tumour-derived: in paired plasma and white-blood-cell sequencing, 53.2% of cfDNA mutations in 124 people with metastatic cancer and 81.6% in 47 people without cancer had features of clonal haematopoiesis (Razavi 2019). A ctDNA result is also a quantity with a unit (molecules per millilitre, a fraction, or a call), and the same number means different things under each."],
"related": [
  "ctdna-units",
  "ctdna-monitoring-lead-time"
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Circulating_tumor_DNA"
  },
  {
    "label": "Detection of Circulating Tumor DNA in Early- and Late-Stage Human Malignancies",
    "url": "https://doi.org/10.1126/scitranslmed.3007094"
  },
  {
    "label": "High-intensity sequencing reveals the sources of plasma circulating cell-free DNA variants",
    "url": "https://doi.org/10.1038/s41591-019-0652-7"
  }
],
"asOf": "2026-11-10"
}),
  t({ id: "mrd", tags: ["precision"], aka: ["MRD-directed", "MRD-negativity", "measurable residual disease", "minimal residual disease", "molecular remission"], name: "Minimal / molecular residual disease (MRD)", category: "Biomarkers", tldr: "Residual disease testing looks for small amounts of disease after treatment using a specified sample and method. A negative result means no qualifying signal was detected under that test, rather than proof that no cancer remains.", summary: "Minimal, measurable and molecular residual disease (MRD) are related terms for small amounts of disease assessed after treatment with a specified method and specimen. Blood-cancer studies can use cell-based or molecular measurements, while solid-tumour studies can look for tumour-associated features in plasma. The disease, specimen, technique, time point and threshold define the result. A negative result means no qualifying signal was detected under that method, not proof that every cancer cell is absent. Associations with recurrence, benefit from a test-guided treatment strategy, and validation of a surrogate endpoint are separate questions; evidence for one setting does not establish the others.", wikipedia: W("Minimal_residual_disease"), technologies: ["mrd-testing"], trials: ["imvigor011", "dynamic"], notes: [
  "The name has three expansions: minimal residual disease (small remaining amounts), measurable residual disease (used in blood-cancer guidance, stressing what the method can detect) and molecular residual disease (tumour-associated molecular signals after treatment, mostly ctDNA in solid tumours). Check which one a paper means. Cell-frequency thresholds in leukaemia, molecular ratios and plasma detection rules are different quantities, and the European LeukemiaNet update on acute myeloid leukaemia sets disease-specific techniques, materials, time points and thresholds that are not transferable to a solid tumour (Heuser 2021).",
  "Residual disease on a surgical specimen is a different measurement: residual cancer burden is a defined tissue endpoint and is not interchangeable with a blood MRD call. In a fictional study a postoperative plasma test is negative but surgery shows residual invasive cancer. Neither must be wrong, because pathology examined tissue at surgery and the plasma assay sought a qualifying signal in a later blood sample, so dates, specimen and assay limits need reconciling before the pair is read. MRD negative means a method found no qualifying signal in one specimen and not that no cancer cell remains anywhere.",
  "A residual-disease signal can select a research group at higher observed recurrence risk without showing which treatment helps that group. Clinical utility asks whether a test-guided strategy improves a meaningful outcome against an appropriate alternative. Disappearance of a marker is a separate proposed surrogate: it needs validation against the outcome for that setting, rather than becoming proof of cure. These are interpretation distinctions in the FDA November 2024 drug-development guidance, not a universal rule to change treatment.",
  "There is no universal MRD unit or cut-off across diseases and samples. The intended target, background and artefact controls, specimen adequacy and sampling time belong with the call; an unsuitable target or failed preparation must not silently become a negative result. A positive molecular signal does not directly demonstrate a living tumour cell, identify a lesion or guarantee recurrence. The source and the studied clinical context still need to be established.",
  "Read an MRD report by identifying the finite specimen and collection burden first: blood, marrow or another named material. Then name the output, such as a cell percentage, molecular ratio, concentration or assay-defined call, and its disease-specific units and rules. Validation belongs to that disease, treatment setting, specimen, time point and intended decision; a threshold in one combination does not become a universal MRD cut-off."
],
"related": [
  "ctdna-imaging-discordance",
  "ctdna-monitoring-lead-time"
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Minimal_residual_disease"
  },
  {
    "label": "2021 Update on MRD in acute myeloid leukemia: a consensus document from the European LeukemiaNet MRD Working Party",
    "url": "https://doi.org/10.1182/blood.2021013626"
  },
  {
    "label": "FDA: ctDNA for curative-intent solid tumour drug development (November 2024)",
    "url": "https://www.fda.gov/media/183874/download"
  },
  {
    "label": "Powles et al.: ctDNA-guided adjuvant atezolizumab in muscle-invasive bladder cancer (IMvigor011, 2025)",
    "url": "https://doi.org/10.1056/NEJMoa2511885"
  }
],
"asOf": "2026-11-10"
}),
  t({
    asOf:"2026-11-10", related:["alleles-and-zygosity","germline-vs-somatic","gene-amplification"], id: "vaf", wikipedia: W("Allele_frequency"), links: [{"label":"Li et al., Standards and guidelines for the interpretation and reporting of sequence variants in cancer: AMP, ASCO and CAP joint consensus (Journal of Molecular Diagnostics 2017)","url":"https://doi.org/10.1016/j.jmoldx.2016.10.002"},{"label":"Absolute quantification of somatic DNA alterations in human cancer.","url":"https://pubmed.ncbi.nlm.nih.gov/22544022/"},{"label":"Allele-specific genomic data elucidate the role of somatic gain and copy-number neutral loss of heterozygosity in cancer.","url":"https://pubmed.ncbi.nlm.nih.gov/34731645/"},{"label":"High-intensity sequencing reveals the sources of plasma circulating cell-free DNA variants.","url":"https://pubmed.ncbi.nlm.nih.gov/31768066/"}], name: "Variant allele frequency (VAF)", category: "Genomics", tldr: "Variant allele frequency is the fraction of informative reads or molecules that support a variant under a test’s definition. It is not directly the fraction of cancer cells.", summary: "Read-based VAF divides variant-supporting reads by informative reads at the locus. Some assays instead report a molecule-based measure, so keep the laboratory’s definition. Tumor purity, local allele-specific copy number, ploidy, subclonal mixture and assay behavior affect the value. VAF alone cannot assign zygosity, variant origin, the number of clones or a cancer-cell percentage. Changes over time in plasma also require attention to specimen and non-tumor DNA contributors.", technologies: ["cgp", "liquid-biopsy"] ,
"notes": [
  "VAF is the proportion of usable reads or assay-defined molecules supporting the alternate sequence; keep the denominator: 25 of 100 usable observations is 25%.",
  "CCF is carrier cancer cells over all sampled cancer cells; its inputs have distinct denominators: cell purity p, DNA contribution, pathology cellularity (method-defined, for RCB the tumour-bed area), global ploidy P, local copy number C, mutant multiplicity m.",
  "With equal recovery per genome copy and diploid normals, tumour DNA contribution is p*P/[p*P+2*(1-p)]; half the cells at ploidy four contribute two thirds of DNA.",
  "For uniform local copies, expected VAF is p*f*m/[p*C+(1-p)*2]; assumptions: two normal copies, uniform cancer copies, fixed multiplicity, unbiased observations; subclonal copy change needs a richer model.",
  "Same 50 cancer plus 50 normal cells, every cancer cell carrying one variant copy: expected VAF 50/200=25% with two local cancer copies and 50/150 about 33% with one; CCF stays 100% and purity 50%.",
  "Purity 0.5, one mutant copy: four local copies with CCF 100% and two local copies with CCF 2/3 both predict VAF 1/6 (about 16.7%); copy evidence separates them; CCF above 100% signals incompatible assumptions.",
  "High VAF alone cannot establish truncal ancestry or origin or function; a rise after treatment can reflect mixture or copy change as well as carrier expansion; uncertain inputs give alternative CCF fits, not counted cells.",
  "Retain DNA and copy-state inputs, filtered support denominators, fractions, local copies, multiplicity, purity, model version and alternative fits. New extraction consumes material; reanalysis alone does not. Artifacts, few molecules, recovery bias and uncertain copy/mixture estimates limit conversion. Detection thresholds and model-fit criteria do not establish a universal clonal-target cutoff or treatment benefit."
]
}),
  t({ id: "vus", name: "Variant of uncertain significance (VUS)", category: "Genomics", tldr: "A variant of uncertain significance (VUS) is a genetic change that has been found but nobody yet knows whether it matters.", summary: "A variant of uncertain significance (VUS) is a genetic change that has been detected but whose effect on disease is not yet known. Such findings are common on germline panels and in tumour sequencing, and they should not drive treatment decisions; over time many are reclassified through ClinVar, functional assays and population data. The term is linked to the Germline (hereditary) testing and Comprehensive genomic profiling technologies, to the ClinVar collection and AlphaMissense, and to the terms Mutation, Genomic profiling and Hereditary cancer syndromes. It appears in the bottleneck on unidentified inherited risk, and ideas that respond to it include testing every possible mutation in every cancer gene so no result is uncertain, and a plain-language version of every genomic report.", wikipedia: W("Variant_of_uncertain_significance"), technologies: ["germline-testing", "cgp"] }),
  t({ id: "founder-variant", aka: ["founder mutation", "founder mutations", "founder variants", "founder allele", "founder alleles", "founder effect", "recurring founder variant", "founder panel"], name: "Founder variant", category: "Genomics", wikipedia: W("Founder_effect"),
    tldr: "A disease-causing genetic change that is common in one population because many of its members descend from a small group of ancestors who happened to carry it. It says nothing about whether any particular person has it, and a negative founder test does not mean no inherited risk.",
    summary: "A founder variant is a pathogenic variant inherited from a common ancestor together with the surrounding stretch of chromosome, and found at unusually high frequency in a population descended from a small founding group (Ahmad et al., Hereditary Cancer in Clinical Practice 2023). The NHGRI describes the underlying founder effect as \"the reduction in genomic variability that occurs when a small group of individuals becomes separated from a larger population\". The evidence that a recurring variant is a founder allele rather than the same mutation arising repeatedly is a shared haplotype: the markers flanking the variant travel with it, as Neuhausen and colleagues showed for BRCA1 in 1996 and Laitman and colleagues showed again for BRCA1 c.68_69delAG in 2013, dating it to roughly 750 to 1,500 years ago.\n\nWhy it matters practically: where three variants account for about 90 percent of the BRCA alterations found in a population, a three-variant panel costing a few pounds can do what full-gene sequencing does, which is what makes population-wide testing affordable. Israel used exactly this to become the first country to offer BRCA founder testing to a whole population group, and the Israeli cohort of 8,195 healthy Ashkenazi men gave the risk estimates that justified it (Gabai-Kapara et al., PNAS 2014).\n\nWhat a founder variant is not. It is not ethnicity as destiny: it is one allele with a history, carried by some individuals and not others, and the same variant turns up on non-founder haplotypes in unrelated families. A negative founder panel does not exclude inherited risk, because most pathogenic variants in the same genes are not founders; in 250 ethnically diverse high-risk Israeli families screened after the common founders were excluded, 19 different pathogenic BRCA1/2 variants were found and none recurred often enough to panel for. Carrier frequencies are estimates from particular cohorts and differ between them, and penetrance measured in families referred to clinics is higher than penetrance measured in the general population. The clinical consequence is that a founder panel is a cheap first pass, not a substitute for sequencing.",
    links: [
      { label: "Ahmad et al., Founder variants and population genomes (Hereditary Cancer in Clinical Practice 2023)", url: "https://doi.org/10.1186/s13053-023-00256-2" },
      { label: "NHGRI Talking Glossary: founder effect", url: "https://www.genome.gov/genetics-glossary/Founder-Effect" },
      { label: "Laitman et al., The spectrum of BRCA1 c.68_69delAG haplotypes (Eur J Hum Genet 2013)", url: "https://doi.org/10.1038/ejhg.2012.124" },
      { label: "Gabai-Kapara et al., Population-based screening for breast and ovarian cancer risk due to BRCA1 and BRCA2 (PNAS 2014)", url: "https://doi.org/10.1073/pnas.1415979111" },
      { label: "Laitman et al., No predominant recurring germline mutations among ethnically diverse Israeli high-risk families (Breast Cancer Res Treat 2011)", url: "https://doi.org/10.1007/s10549-010-1217-0" },
    ],
    technologies: ["germline-testing", "cgp"], targets: ["brca"], terms: ["vus", "hereditary-cancer-syndromes"], bottlenecks: ["b-hereditary-risk"] }),
  t({ id: "ngs", name: "Next-generation sequencing (NGS)", category: "Genomics", tldr: "Next-generation sequencing reads many prepared DNA or RNA-derived fragments in parallel, with detection limited by the chosen workflow.", summary: "Sequencing infers base order from prepared material. Panels target selected regions; exomes primarily target exons; genomes cover coding and noncoding territory broadly. None guarantees uniform usable local evidence or analysis of every alteration class. Read length, territory, molecule independence, quality and validated use are separate features. Methylation requires an appropriate preparation and analysis rather than a sequencing category name.", wikipedia: W("DNA_sequencing"), technologies: ["cgp", "wes-wgs", "rna-seq"] ,
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/DNA_sequencing"
  },
  {
    "label": "Targeted capture and massively parallel sequencing of 12 human exomes.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19684571/"
  },
  {
    "label": "Mutational landscape of metastatic cancer revealed from prospective clinical sequencing of 10,000 patients.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28481359/"
  },
  {
    "label": "Characterizing reduced coverage regions through comparison of exome and genome sequencing data across 10 centers.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29144510/"
  },
  {
    "label": "Guidelines for Validation of Next-Generation Sequencing-Based Oncology Panels: A Joint Consensus Recommendation of the Association for Molecular Pathology and College of American Pathologists.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28341590/"
  },
  {
    "label": "NCI exon definition",
    "url": "https://www.cancer.gov/publications/dictionaries/genetics-dictionary/def/exon"
  }
],
"notes": [
  "Keep read counts distinct from independent molecules: paired ends and amplified copies can share a fragment. Base quality and mapping quality address different uncertainties. Usable local depth depends on explicit filters, including treatment of duplicate and overlapping reads. Source: https://www.htslib.org/doc/samtools-depth.html, samtools 1.25 manual.",
  "Fictional coverage exercise: if 900 of 1,000 target bases reach a stated 20-read criterion, breadth at that criterion is 90%. A mean of 100 reads per position does not establish adequate measurement at a particular position with four usable reads. These are teaching values, not diagnostic thresholds.",
  "Targeted panel, exome and genome differ in intended territory; check exact coordinates and analysed change classes rather than gene count.",
  "Exons include untranslated sequence; exome does not mean every captured base codes for protein nor that regulatory regions or rearrangement breakpoints were examined.",
  "Ng et al. (2009) introductory scale estimates: Human genome is about 3,000 Mb; protein-coding sequence is about 1%, roughly 30 Mb across about 180,000 exons.",
  "Zehir et al. (2017), prospective advanced-cancer cohort and computational downsampling: One hospital panel (MSK-IMPACT) covered 341 genes (2,809 tumours) then 410 (8,136 tumours) at mean 718x; downsampling to 150x exome depth would have missed at least 9% of mutations.",
  "At a fixed budget broader territory commonly spreads reads thinner, but actual depth depends on design and usable yield; broader territory guarantees neither uniform sensitivity nor all-variant detection.",
  "Territory labels do not specify performance for small variants, copy number or rearrangements, and conventional WGS does not automatically measure methylation.",
  "Reduced-coverage regions exist even in clinical exome and genome workflows, including clinically relevant genes.",
  "Fictional teaching exercise: A research genome negative at a repeat does not supersede a validated panel; a panel that never examines a fusion breakpoint cannot exclude it by a negative report.",
  "Compare assays by accepted specimen, input consumption, designed coordinates, analysed alteration classes, local usable depth and breadth, quality filters and validated detection limits. Degradation, capture gaps and ambiguous repeats can defeat broad designs. Extraction uses material; the name panel, exome or genome supplies neither a tissue requirement nor clinical validation."
],
"asOf": "2026-11-10",
"related": [
  "sequencing-depth-and-coverage",
  "sequencing-reads",
  "tumor-normal-vs-tumor-only-sequencing",
  "hla-loh"
]
}),
  t({ id: "gene-fusion", aka: ["gene fusions", "fusion gene", "fusion genes", "fusion-driven", "fusion-positive", "fusions", "oncogenic fusions", "rearrangement", "chromosomal translocation", "chromosomal rearrangements"], name: "Gene fusion", category: "Genomics", tldr: "A gene fusion is two genes broken and joined together, creating a hybrid protein that can drive cancer. Fusion-driven cancers are often exquisitely drug-sensitive.", summary: "A gene fusion joins two broken genes into one, producing a hybrid protein that can drive cancer, and fusion-driven cancers are often exquisitely drug-sensitive. Well-known examples include EML4-ALK, ROS1, RET, NTRK, FGFR2, NRG1 and BCR-ABL, and the ALK, RET, NTRK and FGFR2 targets are linked here. Fusions are best detected by RNA sequencing & expression profiling, define tumour-agnostic indications for NTRK and RET, and are the archetype of oncogene addiction. The term is cited by the Biliary tract cancer and Ewing sarcoma entries, by FGFR2 fusions and rearrangements, by Janet Rowley, Arul M. Chinnaiyan and Olivier Delattre, and by ideas on degraders for the fusion proteins that drive childhood sarcomas and a standard for tumour-agnostic approvals.", wikipedia: W("Fusion_gene"), targets: ["alk", "ret", "ntrk", "fgfr2"], technologies: ["rna-seq"] }),
  t({ id: "mutational-signature", aka: ["mutational signatures"], name: "Mutational signature", category: "Genomics", tldr: "An inferred pattern of mutations that supports hypotheses about the processes that produced them. Its interpretation depends on the data, comparison patterns and method.", summary: "A mutational signature is a distribution over mutation categories inferred from a catalog of calls. It does not attach an observed cause to every mutation. Several processes can overlap, some causes remain unknown, and a classifier of BRCA-related repair deficiency is not a model of a patient's probability of drug response. Its endpoint and validation population must be named.\n\nSingle-base substitutions change one base, doublet substitutions change adjacent bases, and indels insert or delete sequence. In a fictional four-category exercise, template A has percentages 40, 30, 20, 10 and B has 30, 40, 20, 10. For 100 mutations, a 50/50 mixture gives 35, 35, 20, 10; a 60/40 mixture gives 36, 34, 20, 10. The close reconstructions illustrate ambiguity; these are arithmetic examples, not fitted SBS3 data or observed biological results.\n\nHRDetect combines six weighted features, including microhomology-associated deletions, substitution signatures 3 and 8, rearrangement signatures 3 and 5 and a scar index. It is not simply an SBS3-positive call. In the original study, applying genome-trained weights to exome-like data reduced sensitivity to 46.8%; retraining improved it to 73% while adding calls not made by the genome model. Missing rearrangements and sparse substitutions are consequential, so panel, exome and whole-genome implementations require separate validation, uncertainty and fit checks.\n\nRoberts analyzed 954,247 mutations across 2,680 exomes from 14 cancer types; the APOBEC pattern reached 68% of mutations in some samples, not in every breast cancer. HRDetect reported 98.7% sensitivity and 124 high-scoring tumors among 560 breast cancers, about 22%, under its study definition. That selected cohort estimate is not a population prevalence or a clinical response probability. DNA quality, variant-calling errors, signature competition, catalog and software versions remain part of interpretation.", wikipedia: W("Mutational_signatures"), technologies: ["wes-wgs"] ,
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Mutational_signatures"
  },
  {
    "label": "Signatures of mutational processes in human cancer. (2013; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23945592/"
  },
  {
    "label": "The repertoire of mutational signatures in human cancer. (2020; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32025018/"
  },
  {
    "label": "HRDetect is a predictor of BRCA1 and BRCA2 deficiency based on mutational signatures. (2017; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28288110/"
  },
  {
    "label": "An APOBEC cytidine deaminase mutagenesis pattern is widespread in human cancers. (2013; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23852170/"
  }
],
"asOf": "2026-11-10"
}),
  t({
    asOf:"2026-11-09", notes:["Record named tissue, collection relative to treatment, tumour content, RNA qualification, platform, classifier/version, gene coverage, normalisation and reference data. A failed qualification is not a subtype. No universal RNA-quality number makes every preparation and pipeline suitable.","Bulk tissue includes malignant, immune, stromal and normal-cell RNA. In Elloumi's paired-tissue study, simulated normal admixture changed classifications and risk estimates. A normal-like call does not prove benign tissue, and a changed call between preparations or timepoints need not establish a biological subtype switch.","Similarity/correlation scores are not automatically calibrated probabilities. Use the classifier's actual scores, competing calls and quality rules. An expression pattern or a prognostic association does not independently establish benefit from a chosen drug."], id: "pam50", aka: ["PAM50 molecular subtypes", "PAM50 gene set", "PAM50 subtypes", "intrinsic subtype", "Basal-like", "PAM50 Basal", "basal-like subtype", "HER2-enriched", "PAM50 Her2", "HER2-enriched subtype", "Normal-like", "PAM50 Normal", "normal-like subtype"], wikipedia: W("Breast_cancer_classification"), links: [{"label":"PAM50 intrinsic-subtype predictor (Parker et al., J Clin Oncol 2009)","url":"https://doi.org/10.1200/JCO.2008.18.1370"},{"label":"Perou 2000: original expression-pattern study","url":"https://pubmed.ncbi.nlm.nih.gov/10963602/"},{"label":"Parker 2009: classifier development and separate subtype/risk models","url":"https://pubmed.ncbi.nlm.nih.gov/19204204/"},{"label":"Bastien 2012: PAM50 and incomplete receptor-test concordance","url":"https://pubmed.ncbi.nlm.nih.gov/23035882/"},{"label":"Elloumi 2011: paired normal-tissue simulations and systematic classification bias","url":"https://pubmed.ncbi.nlm.nih.gov/21718502/"},{"label":"Lehmann 2011: original expression profiles and cell-model experiments","url":"https://pubmed.ncbi.nlm.nih.gov/21633166/"},{"label":"Lehmann 2016: tissue attribution and TNBCtype-4 refinement","url":"https://pubmed.ncbi.nlm.nih.gov/27310713/"},{"label":"Chen 2012: TNBCtype input and reported correlation/permutation statistics","url":"https://pubmed.ncbi.nlm.nih.gov/22872785/"}], name: "PAM50 / intrinsic subtypes", category: "Genomics", tldr: "PAM50 compares a breast-tumour RNA expression pattern with reference patterns. The resulting subtype, receptor tests and a recurrence-risk score answer different questions.", summary: "PAM50 is a 50-gene expression classifier that compares a sample's pattern across genes with reference patterns. Its development used microarray and quantitative reverse-transcription PCR data. An intrinsic subtype is a classification output, not a percentage of tumour cells, an inherited trait or proof of the tumour's exact cell of origin.\n\nThe core labels are luminal A, luminal B, HER2-enriched and basal-like; research workflows can also include a normal-like reference category. Luminal A and B describe relative luminal/proliferation patterns. HER2-enriched is not the same measurement as HER2 IHC or gene amplification, and basal-like is not synonymous with receptor-defined TNBC or Lehmann BL1. One highly expressed gene or an IHC surrogate does not reproduce the full classifier.\n\nA subtype and a risk-of-recurrence model are different outputs. A risk model can combine expression and clinical information under a particular endpoint, time horizon and validation population. A clinical product implementing related biology can have different permitted outputs, preprocessing and intended use. Prosigna's dated regulatory context therefore belongs to its own product record.", technologies: ["rna-seq"], cancers: ["tnbc", "breast-hr-positive"] }),
  t({
    "related":["neoantigen-candidate-selection"],
    "notes":["Once the recognition mechanism is clear, a candidate source list precedes HLA matching, target selection and product construction. Confirm alteration identity, tumour specificity and biological support first. DNA, RNA and protein answer different questions, and a longer list can add uncertain calls as well as genuine candidates. A DNA alteration can nominate a possible sequence without establishing the processed peptide that a conventional T cell will recognise.","For tumour DNA, retain local usable coverage, artefacts, tumour fraction and copy number with the call. For matched normal DNA, absence is conditional on suitable sampling, coverage and detection limits. Tumour RNA can support an altered transcript, but comes from a mixture of cells and depends on expression depth and processing. Protein or peptide detection is a further observation with its own method coverage, cell-of-origin question and detection limits; none of these measurements can simply stand in for the others.","A cancer-cell fraction estimate describes the sampled cancer cells, whereas truncal describes ancestry shared across sampled branches; a subclonal alteration belongs to a subset. One small biopsy need not establish the distribution across every site. Read fraction and ancestry do not show that a peptide is displayed, and an unobserved region or insufficiently sampled alteration remains a gap rather than a demonstrated negative.","In an invented comparison, candidate A has a supported tumour DNA alteration, no support in adequately assessed normal DNA and observed mutant RNA. It has progressed further as a source candidate, but processing, HLA display and T-cell recognition remain untested. Candidate B has tumour DNA support but inadequate normal coverage, so tumour specificity is still unresolved. These are evidence questions, not a numerical ranking algorithm.","Two more fictional candidates illustrate bounded negatives. Candidate C has only a weakly supported RNA junction and needs reproducibility and artefact checks. Candidate D has strong DNA support but no RNA detection in a shallow assay, which cannot establish that the transcript is absent. None of A to D has demonstrated HLA presentation or T-cell recognition merely from these starting observations.","Prepared specimens and analysis can introduce misleading candidates through fixation damage, contamination, misalignment or uncertain junctions. The chosen reference transcript also matters when translating an altered sequence. Preserve specimen identity, coordinates and alleles, transcript/reference, method and software versions, usable coverage, thresholds and manual decisions so the result can be traced to its source. A filter or annotation is not independent proof of function."],
    "links":[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Neoantigen"},{"label":"Wells et al.: TESLA prediction, binding and pre-existing T-cell assays (2020)","url":"https://pubmed.ncbi.nlm.nih.gov/33038342/"},{"label":"Jones et al.: paired tumour-normal sequencing and interpretation (2015)","url":"https://pubmed.ncbi.nlm.nih.gov/25877891/"},{"label":"Carter et al.: purity, ploidy and mutation multiplicity (2012)","url":"https://pubmed.ncbi.nlm.nih.gov/22544022/"},{"label":"Wong et al.: formalin-related sequence artefacts (2014)","url":"https://pubmed.ncbi.nlm.nih.gov/24885028/"},{"label":"NHGRI: DNA sequencing overview","url":"https://www.genome.gov/about-genomics/fact-sheets/DNA-Sequencing-Fact-Sheet"}],
    "asOf":"2026-11-11", id: "neoantigen", aka: ["neoantigens"], name: "Neoantigen", category: "Immunology", tldr: "A peptide arising from altered tumour sequence can be an immune target if it is displayed and recognised. Prediction alone does not show safe tumour killing.", summary: "A tumour sequence change can produce a new peptide sequence, but the altered sequence, its expression, HLA presentation and T-cell recognition are separate findings. Candidate sources include substitutions, frameshifts, fusions and altered RNA joins; a workflow that assessed one class has not necessarily assessed the others.\n\nComputational ranking can consider binding, expression and clonality. In the TESLA study, Wells and colleagues combined tumour-normal exomes, tumour RNA and HLA typing, then tested selected peptides for HLA binding and recognition by existing patient-matched T cells. The study focused on small somatic variants and class I antigens; it did not validate every fusion or splice source, every new response a vaccine might induce, or clinical benefit from a vaccine. A candidate peptide and a favourable prediction do not establish safe recognition of naturally presenting tumour cells.", wikipedia: W("Neoantigen"), technologies: ["neoantigen-mrna-vaccine", "tcr-t"], drugs: ["intismeran-autogene"] }),
  t({ id: "oncogene-addiction", name: "Oncogene addiction", category: "Biology", tldr: "Oncogene addiction is dependence on an activated driver in a defined context. A mutation or high expression alone does not demonstrate that dependence or a safe treatment window.", summary: "Some cancer cells rely strongly on an activated growth or survival driver. This differs from a conditional vulnerability caused by another loss and from dependence on a normal stress-support function. Controlled perturbations, appropriate comparators and clinical evidence answer different parts of the treatment question.", wikipedia: W("Oncogene_addiction"), technologies: ["kinase-inhibitors"] ,
"notes": [
  "A dependency is supported by a growth or survival effect when a function is perturbed in a defined context. Oncogene addiction concerns dependence on an activated driver; synthetic lethality concerns a conditional interaction between two losses; non-oncogene addiction concerns a normal support function under cancer-associated stress. A mutation, stain or high RNA level does not by itself establish any of them or a therapeutic window relative to normal cells.",
  "Weinstein introduced the addiction concept; Luo’s framework describes normal stress-support functions and discusses the proteasome in myeloma. The evidence type matters: a conceptual framework is not a clinical selection assay. In Druker’s early chronic-phase CML study after interferon failure, 53 of 54 people treated at at least 300 mg/day had complete haematological responses. This historical dose-group observation is neither prescribing advice nor a comparative-survival estimate.",
  "BCR-ABL/imatinib and HER2/trastuzumab are named driver-dependence examples. Farmer and Bryant demonstrated sensitivity of BRCA-deficient laboratory models to PARP inhibition. Those model results do not make every BRCA variant, inherited finding or high expression a functional loss or a prediction of patient benefit. Dependency, target engagement and clinical actionability are separate levels of evidence.",
  "A synthetic-lethal design compares the relevant single losses with the paired loss. A backup-pathway analogy is useful but does not make every interaction simple redundancy. Most drug combinations are not established synthetic-lethal pairs; a tumour’s existing loss plus one intervention differs from inducing two losses experimentally. PARP and ATR inhibition should not be called a universal synthetic-lethal pair; each experiment must establish the interaction in its specified context. In Smith’s 2024 laboratory panel, ATR inhibition impaired homologous-recombination repair and sensitised repair-proficient cells to rucaparib; matched BRCA-mutant and corrected cells were among the models. The authors called this induced synthetic lethality. It is model evidence, with no patient-benefit claim.",
  "In a fictional repair-loss experiment, cells lacking one function die after a second perturbation, while matched restored cells survive. The restoration comparison supports conditionality rather than general toxicity, with exposure and off-target controls still needed. The same tumour may have driver, conditional and normal-support dependencies. A decision diagram classifies the function removed; it does not demonstrate that the dependency exists or establish treatment benefit."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Oncogene_addiction"
  },
  {
    "label": "Druker et al., Efficacy and safety of a specific inhibitor of the BCR-ABL tyrosine kinase in chronic myeloid leukemia. (2001)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11287972/"
  },
  {
    "label": "Luo et al., Principles of cancer therapy: oncogene and non-oncogene addiction. (2009)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19269363/"
  },
  {
    "label": "Farmer et al., Targeting the DNA repair defect in BRCA mutant cells as a therapeutic strategy. (2005)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15829967/"
  },
  {
    "label": "Bryant et al., Specific killing of BRCA2-deficient tumours with inhibitors of poly(ADP-ribose) polymerase. (2005)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15829966/"
  },
  {
    "label": "Smith et al., induced synthetic lethality with PARP inhibitors in laboratory models (2024)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38965423/"
  }
],
"asOf": "2026-11-10"
}),
  t({ id: "synthetic-lethality", name: "Synthetic lethality", category: "Biology", tldr: "Synthetic lethality means that two impairments together kill a cell even though either alone is tolerated; finding one genetic change does not establish that a particular drug will produce that interaction.", summary: "Synthetic lethality is a lethal interaction between two impairments, each of which can be tolerated alone in the tested system. One impairment may already be present in a cancer and an experimental intervention can create the second, so the concept does not require two drugs. Genetic identity, loss of function, target engagement and the lethal outcome each need evidence.\n\nThe 2005 Farmer and Bryant studies found sensitivity to PARP inhibition in BRCA-impaired experimental systems. Murai and colleagues later distinguished PARP trapping from catalytic inhibition. These findings support particular mechanisms; they do not make every BRCA-related finding a clinical selection rule. Candidate pairs such as MTAP with PRMT5, mismatch-repair deficiency with WRN, or repair deficiency with POLQ need their own model, exposure, selectivity and clinical evidence.", wikipedia: W("Synthetic_lethality"), technologies: ["synthetic-lethality-approaches", "parp-inhibitor", "crispr-screens"] ,
"notes": [
  "What has to be shown. Compare matched cells with neither impairment, each alone and both, and check that the intended functions changed. Measure death separately from slower growth, because a viability signal can fall when cells divide less or change metabolism; pair a suitable death assay with long-term survival or colony formation, and record concentration, time and denominator, remembering that colony formation measures reproductive survival and not the way cells die. Synthetic lethality is not oncogene addiction, which is dependence on an active driver: in Src-, BCR-ABL- and EGF receptor-dependent cells, unequal attenuation of survival and pro-apoptotic signals after the driver is inactivated contributes to death (Sharma et al.). It is also not synergy, since a score above a reference model does not identify which losses interact. In the BRCA/PARP example, homologous recombination is a DNA repair process and HRD means deficiency of that process. Trapping PARP on DNA and inhibiting its catalytic activity are different perturbations, while repair restoration or changes in replication stress can change sensitivity. The first impairment can pre-exist, so a two-loss interaction does not require two drugs.",
  "Rescue, restoration and what each test can show. A rescue experiment restores a relevant function and asks whether the predicted harm falls; that strengthens attribution, but a failed rescue is not automatic disproof, because the restored function may not be expressed, localised or timed adequately (a reading rule, not a result from these experiments). A real example of functional restoration involved secondary BRCA2 mutations, often described as reversions. Ovarian cancer lines PEO1, PEO4 and PEO6 came from one BRCA2 mutation carrier: PEO1 was BRCA2 deficient and sensitive to cisplatin and a PARP inhibitor, while a secondary BRCA2 mutation that cancelled the inherited one arose in the patient (PEO4, PEO6) and, under cisplatin and PARP-inhibitor selection of PEO1, in the dish, restoring BRCA2 and resistance. Function was shown by homologous recombination assays after transfecting wild-type or mutant BRCA2 cDNA into reporter cells, and transient siRNA depletion (two siRNAs against a non-targeting control) re-sensitised the restored clones and PEO4 (Sakai et al. 2009). That is a secondary-mutation restoration plus knockdown in one patient's lineage, not a designed rescue of a knockout, and depleting a protein is not the same as inhibiting it with a drug. BRCA and PARP evidence is experimental: BRCA1 or BRCA2 dysfunction sensitised cells to PARP inhibition (Farmer et al.), BRCA2-deficient cells and tumours were acutely sensitive (Bryant et al.), and PARP inhibitors trap PARP1 and PARP2 on damaged DNA, with trapping potency (niraparib above olaparib, far above veliparib) not tracking catalytic inhibition (Murai et al.). Normal tissue can share the vulnerability: normal Brca2-deficient mouse intestinal epithelium showed very high apoptosis within hours of PARP inhibition (Hay et al.). None of this establishes clinical benefit.",
  "A fictional test uses matched cultures over the same interval: neither impairment, A alone, B alone and A plus B. Each single impairment is tolerated and only the pair causes death measured by a validated assay, with independent perturbations reproducing it. In a separate rescue culture, restoring A while B remains impaired reduces death; this tests attribution and does not revive already dead cells. If a short assay instead shows fewer cells, slower division and cell loss remain unresolved. Other cell backgrounds and normal cells are separate tests of context and selectivity."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Synthetic_lethality"
  },
  {
    "label": "Farmer et al., targeting the DNA repair defect in BRCA mutant cells (2005)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15829967/"
  },
  {
    "label": "Bryant et al., specific killing of BRCA2-deficient tumours with PARP inhibitors (2005)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15829966/"
  },
  {
    "label": "Murai et al., trapping of PARP1 and PARP2 by clinical PARP inhibitors (2012)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/23118055/"
  },
  {
    "label": "Hay et al., normal Brca2-deficient intestinal epithelium deleted by PARP inhibition (2005)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/16287996/"
  },
  {
    "label": "Sakai et al., functional restoration of BRCA2 protein by secondary BRCA2 mutations in ovarian carcinoma (2009)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19654294/"
  },
  {
    "label": "Sharma et al., a common signaling cascade may underlie addiction to Src, BCR-ABL and EGF receptor oncogenes (2006)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17097564/"
  }
],
"asOf": "2026-11-11"
}),

  // ---- Immunology / toxicity ----
  t({ id: "crs", name: "Cytokine release syndrome (CRS)", category: "Toxicity", tldr: "Cytokine release syndrome is systemic inflammation after immune activation, assessed through clinical findings and competing causes rather than a cytokine level alone.", summary: "Cytokine release syndrome can follow activation by engineered immune cells or T-cell-engaging treatments. Signals from several cell types can contribute to fever, hypotension, hypoxia and other organ effects. Infection or other conditions can produce similar findings or coexist with the syndrome.\n\nThe 2019 ASTCT consensus defines and grades CRS using attributed clinical findings, including fever at onset and the blood-pressure or oxygen support required. Its scale is a reporting framework, not a management algorithm. The 2026 ASTCT consensus expands the toxicity framework, but its detailed criteria were not accessible for this entry; the numerical grading below is explicitly the 2019 version. Product, disease, preparation, observation window and treated denominator must accompany any incidence estimate.", wikipedia: W("Cytokine_release_syndrome"), technologies: ["car-t", "t-cell-engager"] ,
"notes": [
  "How CRS is graded, from the ASTCT 2019 consensus. The definition requires a fever of 38 degrees Celsius or higher that cannot be attributed to another cause. Severity is then the more severe of two findings, again not attributable to another cause. Grade 1 has neither. Grade 2 is low blood pressure that does not need vasopressors and/or oxygen by low-flow nasal cannula (up to 6 litres a minute) or blow-by. Grade 3 is one vasopressor, with or without vasopressin, and/or high-flow cannula, face mask, non-rebreather mask or Venturi mask. Grade 4 is multiple vasopressors, excluding vasopressin, and/or positive pressure such as CPAP, BiPAP or intubation. Once someone has had a fever-lowering or anti-cytokine treatment such as tocilizumab or steroids, fever is no longer needed to grade later severity: the grade then follows blood pressure and oxygen, and the person still counts as having CRS until the signs resolve. Organ toxicities linked to CRS are graded separately and do not change the CRS grade, and neurotoxicity during or after CRS is scored on the neurotoxicity scale, not added here. The 2026 ASTCT update (Perales et al.) convened experts to consider updating CRS, ICANS and haemophagocytic-lymphohistiocytosis-like grading, but only its abstract could be read, so whether it keeps, changes or relaxes any of these 2019 rules is not stated here; a report should say which version graded it.",
  "Reading CRS without over-reading a cytokine level. CRS is a clinical syndrome, graded from attributed findings and not from a cytokine concentration. In a mouse model of CD19 CAR T-cell CRS, severity was mediated not by CAR T-cell-derived cytokines but by IL-6, IL-1 and nitric oxide from the recipient's macrophages, and IL-1 blockade abated it (Giavridis et al.); that supports a multicell amplification mechanism and does not show the same sources or shares in every human product. Infection and other conditions can cause or accompany the same findings, so the cause of a fever cannot be read from timing alone. A comparable report gives its grading version, observation window and treated denominator, with onset, maximum grade, interventions and resolution. Safety belongs to the product, disease, tumour burden and preparation, so experience with one blood-cancer product does not supply a solid-tumour product's rate, and no severe CRS in a small early study does not rule out uncommon events. CRS is a different problem from injury to healthy tissue that carries the target (on-target, off-tumour) and from neurotoxicity (ICANS). The treatment need not carry a cytokine payload to trigger endogenous inflammatory signalling. Tumour response does not establish acceptable inflammatory risk, and mild CRS does not establish lack of anticancer activity. Stopping a treatment input does not guarantee immediate removal of released signals or established injury. In a fictional early study, no severe CRS and a modest cytokine rise would not make every fever harmless CRS: attribution, clinical findings, a named grading framework, treated denominator and observation window are still needed.",
  "Use the named consensus version when classifying immune-effector-cell toxicities. The 2026 ASTCT abstract describes updates to CRS, ICANS and IEC-HS and consensus work on haematotoxicity, non-ICANS neurologic events such as parkinsonism or cranial-nerve palsies, enterocolitis, tumour-inflammation-associated neurotoxicity and on-target off-tumour toxicity. It covers immune-effector-cell and T-cell-engager therapy. These category names do not diagnose an event from timing alone or supply the detailed grading criteria; clinical assessment still has to distinguish other causes. The absence of an added cytokine payload does not rule out inflammatory syndromes."
],
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Cytokine_release_syndrome"
  },
  {
    "label": "Lee et al., ASTCT consensus grading for CRS and neurologic toxicity (2019)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30592986/"
  },
  {
    "label": "Perales et al., ASTCT consensus grading for toxicities after immune effector cell therapy (2026)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/42711241/"
  },
  {
    "label": "Giavridis et al., macrophages mediate CRS in a mouse CAR T model (2018)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29808005/"
  },
  {
    "label": "Baumeister et al., CRS and associated acute toxicities in paediatric patients after immune effector cell therapy (2022)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/35402259/"
  },
  {
    "label": "Lee et al., ASTCT consensus grading, accepted-manuscript text (PMC)",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12180426/"
  },
  {
    "label": "Lymphoma Action: CAR-T cell therapy",
    "url": "https://lymphoma-action.org.uk/information-and-support/lymphoma-treatment/car-t-cell-therapy"
  },
  {
    "label": "NCCN Guidelines for Patients: Immunotherapy Side Effects: CAR T-Cell and Lymphocyte Engager Therapies",
    "url": "https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients/guidelines-for-patients-details?patientGuidelineId=45"
  },
  {
    "label": "Patient education sheet (ONS, NCODA, HOPA and ACCC): Understanding Cytokine Release Syndrome (CRS) During Cancer Treatment",
    "url": "https://ncoda.org/pes/understanding-and-managing-cytokine-release-syndrome/"
  }
],
"asOf": "2026-11-12"
}),
  t({ id: "icans", wikipedia: W("Cytokine_release_syndrome"), links: [
  {
    "label": "Patient education sheet (ONS, NCODA, HOPA and ACCC): Understanding Immune Effector Cell-Associated Neurotoxicity Syndrome (ICANS)",
    "url": "https://ncoda.org/pes/understanding-and-managing-immune-effector-cell-associated-neurotoxicity-syndrome-icans/"
  },
  {
    "label": "NCCN Guidelines for Patients: Immunotherapy Side Effects: CAR T-Cell and Lymphocyte Engager Therapies",
    "url": "https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients/guidelines-for-patients-details?patientGuidelineId=45"
  },
  {
    "label": "Lymphoma Action: CAR-T cell therapy",
    "url": "https://lymphoma-action.org.uk/information-and-support/lymphoma-treatment/car-t-cell-therapy"
  },
  {
    "label": "ASTCT consensus grading for CRS and ICANS (Lee et al., Biol Blood Marrow Transplant 2019)",
    "url": "https://doi.org/10.1016/j.bbmt.2018.12.758"
  },
  {
    "label": "Perales et al., ASTCT consensus grading for toxicities after immune effector cell therapy (2026)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/42711241/"
  },
  {
    "label": "Gust et al., endothelial activation and blood-brain barrier disruption in neurotoxicity after CD19 CAR T cells (2017)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29025771/"
  },
  {
    "label": "Lee et al., ASTCT consensus grading, accepted-manuscript text (PMC)",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12180426/"
  }
], name: "ICANS (neurotoxicity)", category: "Toxicity", tldr: "Immune effector cell-associated neurotoxicity syndrome can affect language, attention, awareness or other brain functions; a cognitive score is one part of clinical assessment.", summary: "Immune effector cell-associated neurotoxicity syndrome, or ICANS, is a neurologic syndrome associated with immune-effector-cell therapy. Changes in language, attention, handwriting or awareness and more severe findings such as seizures need assessment against baseline and alternative explanations. An immune-marker plot does not establish the syndrome.\n\nThe 2019 ASTCT adult framework combines the immune effector cell-associated encephalopathy (ICE) score with consciousness, seizures, motor findings and raised intracranial pressure or cerebral oedema. Children require age-appropriate assessment. The 2026 consensus also addresses non-ICANS neurologic toxicities; its detailed tables were not accessible for this entry. Neurologic events and recovery need their own record rather than being inferred from resolution of CRS.", technologies: ["car-t", "t-cell-engager"] ,
"notes": [
  "How ICANS is graded, from the ASTCT 2019 consensus. For adults, the grade is the most severe of five findings, none attributable to another cause. The 10-point ICE screen of orientation, naming, command-following, writing and attention scores 7 to 9 for grade 1, 3 to 6 for grade 2, 0 to 2 for grade 3, and 0 because the person is unarousable and cannot be tested for grade 4; an ICE of 0 in someone who is awake with global aphasia can still be grade 3. Level of consciousness counts only if no other cause such as a sedating medicine explains it: awakens spontaneously, awakens to voice, only to touch, or unarousable or requiring vigorous or repeated tactile stimulation. Any seizure that resolves rapidly, or EEG-only seizures that resolve with treatment, is grade 3, and prolonged (over 5 minutes) or repeated seizures without return to baseline are grade 4. Deep focal motor weakness is grade 4, while tremor and myoclonus may be graded on CTCAE but do not change the ICANS grade. Focal oedema on imaging is grade 3; diffuse oedema, posturing, cranial nerve VI palsy, papilloedema or Cushing's triad is grade 4; intracranial haemorrhage is excluded from ICANS grading. So ICE is a screen for encephalopathy and one input, not the whole examination: a person with an ICE of 3 who has a generalised seizure is grade 3, and headache alone is not a useful marker. The 2026 ASTCT consensus abstract adds categories such as non-ICANS neurological toxicities (parkinsonism, cranial nerve palsies, polyneuropathies) and tumour inflammation-associated neurotoxicity; their criteria, and any change to how ICE is used, were not readable here.",
  "What is known about mechanism, timing and attribution. In 133 adults given CD19 CAR T cells, Gust et al. found that those with severe neurotoxicity had endothelial activation (disseminated intravascular coagulation, capillary leak) and increased blood-brain barrier permeability, and that the permeable barrier failed to protect the cerebrospinal fluid from high systemic cytokine concentrations including interferon-gamma. Higher risk went with acute lymphoblastic leukaemia, high marrow CD19-positive burden, high CAR T-cell dose, CRS and pre-existing neurological disease, and markers of endothelial activation before lymphodepletion were higher in people who later had grade 4 or worse neurotoxicity. That is an association in one product class and population, not a complete mechanism for every treatment. ICANS can accompany CRS or follow its own timetable, and neurotoxicity after CRS is scored separately, so recovery of blood pressure and oxygen does not show neurological recovery. If a person is confused while taking a sedating medicine and the ICE score falls, the grading rule requires that sedation be excluded, so the fall calls for clinical assessment, neither ignored nor diagnosed from the score alone. Clinical assessment also considers infection, metabolic disturbances, medicines and pre-existing neurologic disease. A safety report should retain onset, severity, attributed cause, interventions, duration, recovery and how many people were adequately observed. Separate fictional CRS and neurologic timelines can end at different times; they do not specify a typical order or duration. Stopping an engineered input does not guarantee immediate reversal of established neurologic injury."
],
"asOf": "2026-11-11"
}),
  t({ id: "irae", wikipediaChecked: "2026-09-22", links: [
  {
    "label": "NCCN Guidelines for Patients: Management of Immune Checkpoint Inhibitor-Related Toxicities - Immunotherapy Side Effects: Immune Checkpoint Inhibitors",
    "url": "https://www.nccn.org/patientresources/patient-resources/guidelines-for-patients/guidelines-for-patients-details?patientGuidelineId=46"
  },
  {
    "label": "Macmillan: atezolizumab (Tecentriq)",
    "url": "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/atezolizumab"
  },
  {
    "label": "Macmillan: durvalumab (Imfinzi)",
    "url": "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/durvalumab"
  },
  {
    "label": "Schneider et al., ASCO guideline on immune-related adverse events (JCO 2021)",
    "url": "https://doi.org/10.1200/JCO.21.01440"
  },
  {
    "label": "Breast Cancer Now: pembrolizumab (Keytruda)",
    "url": "https://breastcancernow.org/about-breast-cancer/treatment/targeted-therapy/pembrolizumab-keytruda"
  },
  {
    "label": "Macmillan: pembrolizumab",
    "url": "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/pembrolizumab"
  },
  {
    "label": "Haanen et al., Management of toxicities from immunotherapy: ESMO Clinical Practice Guideline (Annals of Oncology 2022)",
    "url": "https://doi.org/10.1016/j.annonc.2022.10.001"
  },
  {
    "label": "NCI CTEP: adverse events, grading and attribution",
    "url": "https://dctd.cancer.gov/research/ctep-trials/for-sites/adverse-events"
  },
  {
    "label": "Pembrolizumab prescribing information (DailyMed)",
    "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9333c79b-d487-4538-a9f0-71b91a02b287"
  },
  {
    "label": "Brahmer et al., SITC clinical practice guideline on immune checkpoint inhibitor-related adverse events (2021)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34172516/"
  },
  {
    "label": "Pardoll, immune checkpoints, self-tolerance and peripheral responses (2012 review)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22437870/"
  }
], aka: ["immune-related adverse event","checkpoint inhibitor side effects","immunotherapy side effects"], name: "Immune-related adverse events (irAEs)", category: "Toxicity", tldr: "Checkpoint inhibitors can cause immune-related adverse events such as colitis, rash, hepatitis, pneumonitis and thyroid problems. Management depends on the organ and severity and may involve steroids, other immunosuppression or hormone replacement.", summary: "Immune-related adverse events are injuries attributed to treatment-related immune activity, commonly discussed with checkpoint inhibitors. They can affect the bowel, lung, skin, liver, hormone-producing glands and other organs. A symptom or laboratory change during treatment does not by itself establish an immune cause.\n\nClinical assessment identifies the organ, severity, timing and competing explanations. Reactions can arise after treatment stops, and some endocrine injury leaves lasting loss of function. Organ-specific management can include different measures, such as treatment interruption, immunosuppression or hormone replacement. An adverse event, an attributed immune injury and a cancer-response result are separate findings.", technologies: ["checkpoint-inhibitor"] ,
"notes": [
  "What the label does and does not say. An adverse event is any unfavourable and unintended sign, symptom or abnormal laboratory finding that occurs during treatment, whether or not the treatment caused it; grading records that it occurred and how severe it was, and the clinical team assigns attribution to the drug, the intervention or something else (NCI Cancer Therapy Evaluation Program). An irAE is the narrower attribution of harm to treatment-related immune activity, so a symptom during immunotherapy is not automatically an irAE, and the abbreviation names a suspected mechanism, not an organ, a severity or a treatment. The SITC 2021 guideline uses the same wording, grades events including irAEs on a scale such as CTCAE version 5, and says that some irAEs need organ-specific management while overarching principles apply to all checkpoint-inhibitor toxicity. Checkpoint regulation helps limit responses against healthy tissue, part of peripheral tolerance; disrupting that protection can contribute to immune injury, but no single mechanism explains every event. Colitis names bowel inflammation and pneumonitis lung inflammation. A symptom or the suffix \"-itis\" does not establish its cause.",
  "Timing and neighbouring syndromes. Immune-mediated reactions to PD-1 or PD-L1 antibodies can occur in any organ system at any time after starting and can also appear after treatment stops (pembrolizumab prescribing information), so the infusion calendar does not define the observation window; onset differs by organ, with a SITC median of 5 to 10 weeks for diarrhoea or colitis and rash typically presenting 2 to 5 weeks after the first treatment. Cytokine release syndrome and ICANS after immune effector cell therapy are separate syndromes with their own ASTCT definitions and grading, not substitute labels for checkpoint-related organ injury, and stopping a treatment does not guarantee the immune effect has stopped.",
  "Report symptoms using the care team's plan and tell evaluating clinicians about current and previous immunotherapy. New or worsening breathing difficulty, chest pain or confusion can need urgent assessment. A person with a new cough after checkpoint treatment should neither dismiss the possible relationship because dosing ended nor infer pneumonitis without evaluation. The organ-inflammation guidance from NCI advises reporting concerning changes rather than waiting for another infusion or starting immune-suppressing treatment independently. Suspected immune injury does not show that the cancer treatment is working."
],
"asOf": "2026-11-11"
}),
  t({
    asOf:"2026-11-11", links:[
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Abscopal_effect"
  },
  {
    "label": "ICD consensus: adaptive immunity and experimental abscopal models",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32209603/"
  },
  {
    "label": "CURB: population-specific randomised progression endpoint",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38104577/"
  },
  {
    "label": "Ionizing radiation inhibition of distant untreated tumors (abscopal effect) is immune mediated.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/14967443/"
  },
  {
    "label": "Immunologic correlates of the abscopal effect in a patient with melanoma.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22397654/"
  },
  {
    "label": "Radiotherapy induces responses of lung cancer to CTLA-4 blockade.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30397353/"
  }
], id: "abscopal-effect", aka: ["abscopal effects"], name: "Abscopal effect", category: "Immunology", tldr: "An abscopal response is regression outside an irradiated area, studied as a possible systemic effect of local radiation. Observing it does not by itself establish the cause or an added survival benefit.", summary: "Responses at non-irradiated sites motivate investigation of immune effects of local radiation. Keep the irradiated and unirradiated lesions, other treatments and observation times explicit. A proposed immune mechanism needs more than local injury or circulating markers.\n\nA case or uncontrolled combination cannot isolate the added effect of radiation. Comparative local-treatment studies must retain their populations and endpoints: a response outside the field, progression-free survival, overall survival and symptom relief are different outcomes.", wikipedia: W("Abscopal_effect"), technologies: ["sbrt", "checkpoint-inhibitor"], pathways: ["cgas-sting"] ,
"notes": [
  "First define the irradiated field and the actual exposure of each lesion. A local response does not demonstrate a distant response. An uninjected-lesion response in an injection study is a different route-defined observation. During concurrent systemic treatment, distant shrinkage does not by itself isolate radiation’s contribution or demonstrate immune causation; local control, distant response, survival, symptoms and harms require separate assessment.",
  "Demaria’s bilateral 67NR mammary-tumour mouse experiment combined local radiation with Flt3 ligand. The distant tumour grew more slowly under the combination, whereas radiation alone affected the irradiated tumour; antigen-mismatched and T-cell-deficient comparisons supported an immune-dependent component. This is a defined combined animal intervention, not a human response rate. Postow’s ipilimumab-plus-radiation melanoma report was one case with temporal immune correlates, not a study of frequency.",
  "Formenti enrolled 39 people with chemotherapy-refractory metastatic non-small-cell lung cancer in a single-arm radiation-plus-ipilimumab study. At day 88, 21 had completed treatment and response assessment. Seven responses were 7/39, about 18% of those enrolled, or 7/21, about 33% of those evaluable. Seventeen received fewer than four cycles because they progressed or died before day 88; another completed four cycles without response assessment. These denominators answer different questions and neither estimates radiation-alone activity or an individual breast-cancer response probability.",
  "To assess a distant effect, retain lesion exposure, serial imaging, prespecified response rules, timing and concurrent therapies. Report lesion changes separately from patient response proportions and their eligible denominators. Imaging is an input; optional tissue and immune tests use finite samples. Exposure misclassification, missing assessments, selected evaluable groups and concurrent-drug attribution can distort interpretation. There is no universal abscopal cutoff or percentage across cancers and regimens; case observations, model mechanisms and comparative clinical outcomes are different evidence tiers.",
  "In a fictional combination study, an irradiated site is controlled while a lesion outside the field shrinks during systemic therapy. The observation is a distant response under that treatment context. It does not prove that radiation vaccinated the whole body, establish which component caused it or supply a general response frequency. Test exposure, relevant comparisons and the proposed immune mechanism separately."
],
"related": [
  "in-situ-vaccination",
  "cancer-immunity-cycle"
]
}),
  t({
    asOf:"2026-11-09", notes:[
  "In a local-treatment study, follow injury and signals through presentation, priming, recognition and measured tumour outcomes. Circulating cytokines or proliferating T cells alone do not establish tumour-specific killing, distant control or an optimal radiation dose.",
  "Immunogenic cell death is regulated death capable of initiating antigen-specific adaptive immunity in a compatible responding host. Antigenicity and appropriately timed adjuvant signals are both necessary considerations. It is an immune consequence, not an exclusive machine opposed to apoptosis or necrotic appearance.",
  "Surface calreticulin, released ATP and HMGB1 have distinct mechanistic roles in defined experiments. Calreticulin supported dying-cell uptake, ATP signalled through dendritic-cell P2X7/inflammasome pathways, and HMGB1/TLR4 supported processing and presentation. These are examples rather than a universal sufficient three-marker checklist. A DAMP is not automatically a tumour-specific antigen.",
  "In the consensus vaccination assay, remove residual inducing chemical and add no separate adjuvant before vaccinating immunocompetent syngeneic mice with dying tumour cells. Compare later challenge with living matched tumour cells in vaccinated and unvaccinated hosts, and test specificity with unrelated compatible tumour cells. Incidence and growth are functional readouts. Immune-competent versus deficient comparisons alone cannot isolate immunogenic death from other immunostimulation. Assays consume tumour-cell aliquots, supernatant or host-model material and report separate dead-cell fractions, signal concentrations or surface staining and challenge incidence or growth. Residual inducer, contamination, incompatible antigens and poor death confirmation can invalidate attribution. No universal DAMP cutoff establishes immunogenicity.",
  "Death plus extracellular ATP does not establish a cancer vaccine. Danger signals, cross-priming, functional protection, distant control and patient benefit are separate claims. Even a positive mouse vaccination assay remains model-bound and does not select a clinical treatment."
], links:[
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Immunogenic_cell_death"
  },
  {
    "label": "Consensus definition, assay interpretation and model limits, 2020",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32209603/"
  },
  {
    "label": "BOOSTER: exploratory peripheral cytokines are separate from clinical endpoints",
    "url": "https://pubmed.ncbi.nlm.nih.gov/41213939/"
  },
  {
    "label": "Source identity and scope, PMID 32209603",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32209603/"
  },
  {
    "label": "Source identity and scope, PMID 17187072",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17187072/"
  },
  {
    "label": "Source identity and scope, PMID 19767732",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19767732/"
  },
  {
    "label": "Source identity and scope, PMID 17704786",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17704786/"
  }
], id: "immunogenic-cell-death", name: "Immunogenic cell death", category: "Immunology", tldr: "Immunogenic cell death is regulated cell death that can initiate adaptive immunity against the dying cells in a suitable host and context. Injury alone does not establish it.", summary: "The 2020 consensus defines immunogenic cell death through the adaptive immune response, not merely the appearance of dead cells. Antigens, appropriately timed danger signals, antigen-presenting cells and a responsive host all matter. Apoptotic or other death machinery does not by itself classify the immune outcome.\n\nCalreticulin exposure, ATP or HMGB1 release and interferon-related signals are useful mechanistic readouts, but none alone proves protective immunity. Functional cross-priming and appropriate in-vivo immune tests address later steps. The consensus distinguishes mouse vaccination models from established disease; neither a surrogate marker nor a positive mouse assay establishes clinical benefit in a person.", wikipedia: W("Immunogenic_cell_death"), technologies: ["adc", "oncolytic-virus", "photoimmunotherapy"] }),
  t({ id: "adcc", name: "ADCC (antibody-dependent cellular cytotoxicity)", category: "Immunology", tldr: "In ADCC, immune effector cells attack an antibody-coated target. NK cells are a familiar example; coating alone does not show completed killing.", summary: "ADCC, antibody-dependent cellular cytotoxicity, is the process in which an antibody flags a cell and NK cells recognise the flag and kill it. In the familiar NK-cell route, the antibody Fc region interacts with FcγRIIIa (CD16). Changes to Fc sequence or glycans can alter receptor interactions; the resulting activity needs measurement in a defined system. ADCC contributes to the activity of trastuzumab, rituximab and cetuximab, and the mechanism belongs to the Monoclonal antibodies technology entry. Drug records that cite it include Margetuximab, Zolbetuximab, Obinutuzumab, Rituximab, Tafasitamab, Daratumumab, Mogamulizumab, Elotuzumab and Dinutuximab (ch14.18) / dinutuximab beta, and it is referenced by the Gastric & gastro-oesophageal junction cancer and Neuroblastoma (paediatric) entries. NK cells are the familiar example, not the only one: other immune cells can contribute antibody-dependent cytotoxicity, and phagocytes can instead engulf a coated cell (ADCP) or complement can damage its membrane (CDC). Receptor binding or contact does not show completed killing.", wikipedia: W("Antibody-dependent_cellular_cytotoxicity"), technologies: ["monoclonal-antibody"] ,
"asOf": "2026-11-09",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Antibody-dependent_cellular_cytotoxicity"
  },
  {
    "label": "Inhibitory Fc receptors modulate in vivo cytotoxicity against tumor targets.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/10742152/"
  },
  {
    "label": "Macrophages eliminate circulating tumor cells after monoclonal antibody therapy.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24430180/"
  },
  {
    "label": "Complement is activated by IgG hexamers assembled at the cell surface.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/24626930/"
  }
],
"related": [
  "adcc-adcp-cdc"
]
}),
  t({ id: "fc-effector", wikipedia: W("Fragment_crystallizable_region"), name: "Fc engineering / effector function", category: "Immunology", tldr: "Fc engineering changes selected antibody interactions with immune cells, complement or recycling receptors. Each interaction needs its own measurement.", summary: "Fc engineering means tweaking the antibody's tail, the Fc region, so that it recruits immune cells more strongly, or not at all. Fc sequence and glycan changes can alter effector recruitment. Fc-silencing variants reduce selected interactions in a defined system; an IgG4 backbone or an engineering label alone does not establish complete silence or human safety. FcRn-mediated recycling is a separate property. The term is linked to the Monoclonal antibodies and Bispecific antibodies technologies and to the terms Antibody, NK cell and Half-life. It is cited by the drug records for Margetuximab, Tislelizumab and Mogamulizumab, by the pathways on myeloid suppression, complement in cancer and NK-cell recognition, and by an idea on bispecific antibodies that engage macrophages instead of T cells. Reduced binding to one receptor does not establish silence everywhere: neonatal Fc receptor binding, which governs recycling and half-life, needs its own measurement, and IgG4 is not a universal synonym for a fully silent Fc.", technologies: ["monoclonal-antibody", "bispecific-antibody"] ,
"asOf": "2026-11-09",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Fragment_crystallizable_region"
  },
  {
    "label": "Effector-attenuating Substitutions That Maintain Antibody Stability and Reduce Toxicity in Mice.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28077575/"
  },
  {
    "label": "Divergent immunoglobulin g subclass activity through selective Fc receptor binding.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/16322460/"
  },
  {
    "label": "IgG subclasses and allotypes: from structure to effector functions.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25368619/"
  }
],
"related": [
  "isotypes-and-fc-silencing"
]
}),

  // ---- Clinical / regulatory ----
  t({ id: "oligometastatic", wikipediaChecked: "2026-09-22", links: [{ label: "NCI Dictionary of Cancer Terms: oligometastasis", url: "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/oligometastasis" }, { label: "Lievens et al., Defining oligometastatic disease from a radiation oncology perspective: an ESTRO-ASTRO consensus (Radiotherapy and Oncology 2020)", url: "https://doi.org/10.1016/j.radonc.2020.04.003" },
{
  "label": "lievens consensus",
  "url": "https://repub.eur.nl/pub/130575/Repub_130575_O-A.pdf"
},
{
  "label": "Guckenberger M et al. (2020): Characterisation and classification of oligometastatic disease: a European Society for Radiotherapy and Oncology and European Organisation for Research and Treatment of Cancer consensus recommendation",
  "url": "https://pubmed.ncbi.nlm.nih.gov/31908301/"
},
{
  "label": "Harrow S et al. (2022): Stereotactic Radiation for the Comprehensive Treatment of Oligometastases (SABR-COMET): Extended Long-Term Outcomes",
  "url": "https://pubmed.ncbi.nlm.nih.gov/35643253/"
},
{
  "label": "Chmura SJ et al. (2026): NRG-BR002: A Randomized Phase II/III Trial of Metastasis-Directed Ablation With First-Line Systemic Therapy for Oligometastatic Breast Cancer",
  "url": "https://pubmed.ncbi.nlm.nih.gov/42842849/"
},
{
  "label": "nci prognosis",
  "url": "https://www.cancer.gov/about-cancer/diagnosis-staging/prognosis"
}
], name: "Oligometastatic disease", category: "Clinical", tldr: "Oligometastatic disease means a limited number of detected distant metastases under a stated definition. The count alone does not establish all disease is visible or that treating each site will produce a cure.", summary: "Oligometastatic disease describes limited detected distant spread, under a specified clinical or study definition. It is a hypothesis that some limited patterns may be amenable to treatment directed at all visible sites; a few visible lesions do not prove a distinct biology or the absence of microscopic disease. Regional lymph nodes alone are not distant metastases.\n\nThe ESTRO-ASTRO consensus describes one to five lesions, with every site safely treatable, while acknowledging that there is no universally established maximum. A consensus definition is not proof of added benefit. Treatment decisions require the cancer setting, prior burden and treatment, comparator, endpoint, safety and the person's goals.", technologies: ["sbrt", "psma-pet"] ,
"asOf": "2026-11-11",
"notes": [
  "A few lit windows show what is detectable, not a census of every room. This analogy does not mean that every limited pattern conceals widespread disease. Synchronous metastases are detected near the initial diagnosis; metachronous metastases are detected later, with the interval defined by the author or protocol. Induced limited disease follows previously widespread disease and systemic treatment. Oligoprogression means a growing subset while other disease remains controlled during treatment. Limited residual or persistent disease means limited visible disease remains after treatment; specify whether it is stable or progressing. These labels are not universal synonyms.",
  "The SABR-COMET randomised phase 2 study enrolled 99 selected patients with different primary cancers, including 18 with breast cancer, a controlled primary and one to five treatable metastases. Its extended follow-up found eight-year overall survival of 27.2% with SABR plus standard care versus 13.6% with standard care alone, with grade 2 or higher acute or late toxicity of 30.3% versus 9.1%. This mixed-cancer result is not a definitive TNBC treatment effect. Control of an irradiated site, delay in progression, survival and symptom relief are different outcomes.",
  "NRG-BR002 tested adding ablation to first-line systemic therapy in breast cancer with at most four metastases, controlled primary disease, at most 12 months of first-line therapy without progression, and all visible sites amenable to SBRT or resection. Of 129 enrolled patients, 125 were eligible for analysis and 79% had HR-positive/HER2-negative disease. Median progression-free survival was 23.0 months without ablation and 19.5 months with it; the hazard ratio was 0.92, with a 95% confidence interval of 0.57 to 1.47. Overall survival did not differ significantly and the study did not proceed to phase 3. This does not supply a definitive effect for every subtype or erase a separate symptom-relief goal.",
  "Classification uses the imaging and its coverage and sensitivity, lesion and organ counts, locations, sizes, dates, previous burden, systemic treatment and response or progression history. A biopsy may be needed to confirm a finding, but classification is not inherently a tumour-consuming molecular assay. Benign mimics, undetected lesions and missing earlier records can mislead. Keep a protocol's count, timing, primary-control and treatability requirements; five lesions is not a cure cutoff and a molecular result does not universally establish this state.",
  "Three fictional histories can each contain two lesions now: two newly detected metastases with no earlier distant disease, two residual lesions after treatment of many, or two growing sites amid many stable sites during therapy. The numeral counts a different subset in each history. Keep the earlier burden and dates rather than merging these groups. A response-selected group and a progression-selected group answer different questions; curative intent is a documented goal whose success needs long-term outcome measurement, not an inference from the current count."
]
}),
  t({ id: "neoadjuvant-adjuvant", aka: ["adjuvant vs neoadjuvant therapy", "adjuvant versus neoadjuvant therapy", "neoadjuvant vs adjuvant", "pre-operative", "preoperative", "post-operative", "postoperative", "post-surgical"], name: "Neoadjuvant / adjuvant / perioperative", category: "Clinical", tldr: "Neoadjuvant treatment comes before the main treatment, usually surgery; adjuvant treatment follows it to lower recurrence risk. These words describe roles in a plan, while its goal and actual delivery need separate assessment.", summary: "Neoadjuvant treatment precedes the main treatment, usually surgery; adjuvant treatment follows the main treatment to reduce recurrence risk. Perioperative treatment spans the period around an operation. Neoadjuvant therapy can aim to reduce disease before an operation and provides response information from treated tissue. Adjuvant therapy aims to reduce risk from disease that may remain. A pathological response and a later clinical outcome are different endpoints.\n\nTiming comparisons need the actual population, intervention and comparator. Liu’s two mouse breast-cancer models supported testing preoperative immunotherapy, not a universal human timing rule or proof that retained tumour antigen explains every clinical result. KEYNOTE-522 assigned a complete before-and-after pembrolizumab regimen against its comparator; that design does not independently randomize the two phases and cannot isolate each phase’s contribution.", wikipedia: W("Neoadjuvant_therapy"), trials: ["keynote-522"] ,
"asOf": "2026-11-12",
"links": [
  {
    "label": "Improved Efficacy of Neoadjuvant Compared to Adjuvant Immunotherapy to Eradicate Metastatic Disease.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27663893/"
  },
  {
    "label": "Pembrolizumab for Early Triple-Negative Breast Cancer.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32101663/"
  },
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Neoadjuvant_therapy"
  }
,
{
  "label": "KEYTRUDA U.S. prescribing information: sections 1.20, 5.1, 12.1 and 14.20",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9333c79b-d487-4538-a9f0-71b91a02b287"
},
{
  "label": "NCI: triple-negative breast cancer treatment",
  "url": "https://www.cancer.gov/types/breast/treatment/triple-negative-breast-cancer"
}
,
    {"label":"NCI: neoadjuvant therapy","url":"https://www.cancer.gov/publications/dictionaries/cancer-terms/def/neoadjuvant-therapy"},
    {"label":"NCI: adjuvant therapy","url":"https://www.cancer.gov/publications/dictionaries/cancer-terms/def/adjuvant-therapy"},
    {"label":"NCI: palliative care with or without curative care","url":"https://www.cancer.gov/about-cancer/advanced-cancer/care-choices/palliative-care-fact-sheet"},
    {"label":"FDA: vaccine adjuvants and other ingredients","url":"https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/common-ingredients-fda-approved-vaccines"},
    {"label":"Masuda et al., CREATE-X (2017)","url":"https://pubmed.ncbi.nlm.nih.gov/28564564/"},
    {"label":"Tutt et al., OlympiA eligibility and comparison (2021)","url":"https://pubmed.ncbi.nlm.nih.gov/34081848/"}
  ],
"related": [
  "perioperative-immune-window",
  "keynote-522"
]
,
"notes": [
  "KEYNOTE-522 tested a selected high-risk, previously untreated early-TNBC population, with chemotherapy plus pembrolizumab or placebo before surgery and pembrolizumab or placebo afterwards. Eight planned 3-week preoperative cycles and nine postoperative cycles correspond to about 24 and 27 weeks; delays and clinical decisions can alter actual timing. The U.S. label describes tumour-size and nodal eligibility and enrolment regardless of PD-L1 expression. A stage label alone is not a personal treatment instruction. The complete regimen comparison did not independently randomise its two phases.",
  "Neoadjuvant treatment can reduce a tumour before an operation and leave treated tissue for response assessment. Subsequent breast and nodal pathology, radiation indications and further systemic options answer separate questions. Residual disease does not automatically choose one added medicine: prior treatment, biomarker eligibility, the population actually studied and uncertainty about sequencing or combination remain relevant. A pathological response is not a survival estimate or proof that a treatment component can be omitted."
,
    "Either, both or neither surrounding phase may appear in a plan. Chemotherapy, radiation, endocrine and other treatments can have preoperative or postoperative roles in appropriate settings. Systemic therapy travels through the bloodstream; neither timing word means chemotherapy alone. An adjuvant plan can aim to reduce risk even when there is no measurable tumour, and it does not guarantee that recurrence is impossible.",
    "A drug that happens before a procedure is not automatically neoadjuvant. In a fictional curative-intent plan, systemic treatment precedes definitive breast surgery and additional treatment afterwards aims to reduce recurrence risk. In a different advanced-disease plan, a later procedure relieves a symptom. Both calendars say drug then procedure, but the documented main-treatment role and goal distinguish them.",
    "Preoperative treatment can provide examination and imaging observations and treated surgical tissue for assessing response. CREATE-X selected residual invasive disease after preoperative chemotherapy; OlympiA included eligible high-risk germline BRCA1/2-associated disease after either neoadjuvant or adjuvant chemotherapy, using different entry rules. These studies show why treatment history and response can affect the next question. They do not make a favourable response a validated surgery-omission rule or prove that every postoperative add-on helps.",
    "Keep specimen collection, treatment administration and report issue as three dates. A biopsy collected before treatment remains a pretreatment sample even if its report arrives after surgery. Likewise, a planned treatment phase is not proof of administration: holds, substitutions and cancelled visits belong in the delivered record. Timing of a report cannot manufacture a post-treatment observation.",
    "Treatment timing does not itself establish curative or palliative anticancer intent. Palliative care addresses symptoms, distress and quality of life and can accompany curative care. Thus a fictional postoperative risk-reduction plan is adjuvant even without visible tumour, and a supportive-care visit does not turn it into palliative anticancer treatment. Neoadjuvant chemotherapy (NAC) is one neoadjuvant class; a vaccine adjuvant instead means an ingredient that enhances an immune response."
  ]
}),
  t({ id: "first-line", wikipedia: W("Therapy#Lines_of_therapy"), links: [{ label: "NCI Dictionary of Cancer Terms: first-line therapy", url: "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/first-line-therapy" },
    {"label":"NCI: second-line therapy","url":"https://www.cancer.gov/publications/dictionaries/cancer-terms/def/second-line-therapy"},
    {"label":"Cortes et al., KEYNOTE-355 population and previous early-disease exposure (2020)","url":"https://pubmed.ncbi.nlm.nih.gov/33278935/"},
    {"label":"NCI: chemotherapy cycles and delivery","url":"https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"}
  ], aka: ["first-line", "second-line", "third-line", "later-line", "later lines", "1L", "2L", "3L", "first line", "second line", "third line", "line of therapy", "front-line", "frontline", "previously untreated", "prior lines", "treatment-naive"], name: "Lines of therapy", category: "Clinical", tldr: "A line of therapy is a treatment strategy counted within a specified disease setting. First-line means the initial strategy in that setting; it does not mean the first medicine a person has ever received.", summary: "Lines of therapy describe successive treatment strategies under a clinical record or study's stated counting rule. First-line is the initial strategy for the specified disease setting. A later strategy may follow because treatment does not work, stops working or causes intolerable harm. The setting and reason for change belong beside the number.\n\nIn an advanced-cancer trial, first-line can mean no earlier systemic treatment for advanced disease, while previous treatment around surgery remains part of the exposure history and eligibility assessment. Several medicines, repeating cycles and planned blocks can belong to one strategy. A line count does not measure remaining life or establish that treatment options are exhausted." ,
  asOf: "2026-11-12",
  notes: [
    "A regimen specifies the treatment plan; a cycle is a defined interval of treatment and recovery. Neither a third infusion nor a third medicine automatically means third-line treatment. A planned switch between blocks differs from changing strategy after progression. Neoadjuvant and adjuvant describe roles around the main treatment, rather than first and second line.",
    "Keep four entries together: disease setting, strategy with start and stop dates, reason for change, and the counting convention. Maintenance, a pause, dose reduction or removal of one component must be interpreted under that convention. A database algorithm can draw boundaries differently from the clinical account, so preserve the actual events before assigning a number.",
    "The 2020 KEYNOTE-355 report studied previously untreated locally recurrent inoperable or metastatic triple-negative breast cancer, while stratifying randomisation by previous exposure to the same chemotherapy class in the neoadjuvant or adjuvant setting. Those descriptions are compatible: prior early-disease treatment and prior advanced-disease treatment are different variables. The example explains the study population, not a current prescribing choice.",
    "In a fictional history, combination A precedes definitive surgery and medicine B follows it as part of one planned early-disease strategy. Years later, the first systemic strategy for metastatic disease is first-line metastatic under the stated rule of no earlier systemic metastatic treatment. A and B remain in the exposure history. The setting boundary changes what is being counted; it is not a universal rule for every switch or maintenance phase.",
    "Before comparing studies labelled first-line or later-line, check prior exposure, eligibility, resistance history, tolerability and the comparator. Matching a drug name does not match the populations. To explain a line number, name the disease setting, earlier strategy and counting rule, rather than turning that history label into an individual forecast."
  ]
}),
  t({ id: "standard-of-care", aka: ["SoC", "standard-of-care", "standard therapy", "standard therapies", "standard treatment", "standard treatments", "standard care", "standard chemotherapy", "standard regimen", "current standard", "guideline-recommended", "guideline-concordant"], name: "Standard of care", category: "Clinical", tldr: "The standard of care is the treatment that guidelines and experts currently consider the best-proven option.", summary: "The standard of care is the treatment that guidelines and expert consensus currently regard as the best-proven option; SoC, standard therapy, standard regimen and guideline-concordant care are its aliases. It is defined by NCCN, ESMO and ASCO guidelines on the basis of randomised evidence, shifts with each positive phase 3 trial, and varies by region according to approvals and reimbursement. The term is linked to the NCCN Guidelines collection, the National Comprehensive Cancer Network (NCCN), the NCCN Compendium and Nathan Cherny. It runs through the bottlenecks on slow trial enrolment, regulatory divergence, prices and value, fragmented care, slow knowledge diffusion and misaligned incentives, and it underpins the idea that sponsors must justify every exclusion criterion.", wikipedia: W("Standard_of_care") }),
  t({
    asOf: "2026-11-08", id: "accelerated-approval", aka: ["accelerated approvals", "accelerated-approval", "Project Confirm"], name: "Accelerated approval", category: "Regulatory", tldr: "This FDA pathway can authorize a specified use based on an endpoint reasonably likely to predict clinical benefit. Further studies must confirm the anticipated benefit.", summary: "Accelerated approval is a marketing approval for an indication, distinct from a development designation. FDA can use a surrogate or intermediate clinical endpoint reasonably likely to predict benefit for an eligible serious condition. Required studies must confirm the anticipated benefit; the use can receive traditional approval or undergo withdrawal through the applicable process. A preliminary laboratory signal, a product name or a historical announcement does not establish current approval for a particular use.", wikipedia: W("Accelerated_approval_(FDA)"), links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Accelerated_approval_(FDA)"},{"label":"FDA: accelerated approval program","url":"https://www.fda.gov/drugs/nda-and-bla-approvals/accelerated-approval-program"},{"label":"FDA: expedited programs guidance, including surrogate endpoints","url":"https://www.fda.gov/media/86377/download"}], related: ["fdora-2022","fdca","fdasia-2012","conditional-approval","japan-conditional-early-approval","china-drug-administration-law","full-approval","approval-withdrawal","confirmatory-trial","surrogate-endpoint","expanded-access","cancer-drugs-fund","abigail-alliance","label-indication","fast-track-rmat"] }),
  t({ id: "breakthrough-designation", wikipedia: "https://en.wikipedia.org/wiki/Breakthrough_therapy", name: "Breakthrough Therapy / Priority Review / Priority Voucher", category: "Regulatory", tldr: "Breakthrough Therapy, Priority Review and the Priority Voucher are FDA fast lanes for drugs that look substantially better than existing options.", summary: "Breakthrough Therapy, Priority Review and the Priority Voucher are the FDA's fast lanes for drugs that appear substantially better than existing options. Breakthrough Therapy, created in 2012, provides intensive regulatory guidance; Priority Review shortens the review clock to six months; and the Commissioner's National Priority Voucher pilot launched in 2025 promises reviews of one to two months for selected products, with Sacituzumab tirumotecan receiving one in July 2026. These pathways sit alongside Real-Time Oncology Review (RTOR), Fast Track and RMAT designations and Orphan drug designation under the FDA Oncology Center of Excellence. The term appears in the bottleneck on regulatory divergence and in an idea on transferable priority vouchers for first-in-class drugs.", drugs: ["sacituzumab-tirumotecan"] }),
  t({
    notes:["An invalid, failed or inadequate test is not a valid negative biomarker result. The specimen and assay must meet the relevant acceptance criteria. U.S. CLIA control rules require applicable control results to be acceptable before patient results are reported. Whether to repeat a measurement or use another specimen depends on the actual test and laboratory criteria."],
    related: ["companion-diagnostic","laboratory-certification-test-authorization","label-indication"], asOf: "2026-11-09", links: [{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Companion_diagnostic"},{"label":"FDA: companion diagnostics","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/companion-diagnostics"},{"label":"FDA: in vitro companion diagnostic devices","url":"https://www.fda.gov/media/81309/download"},{"label":"FDA: authorized companion diagnostic devices and intended uses","url":"https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools"},{"label":"42 CFR 493.1256(f): acceptable controls before reporting patient results","url":"https://www.ecfr.gov/current/title-42/section-493.1256"},{"label":"GovInfo: published 2025 control-procedure rule, independently read","url":"https://www.govinfo.gov/content/pkg/CFR-2025-title42-vol5/pdf/CFR-2025-title42-vol5-sec493-1256.pdf"}], id: "companion-diagnostic-term", wikipedia: "https://en.wikipedia.org/wiki/Companion_diagnostic", name: "Companion diagnostic", category: "Regulatory", tldr: "A companion diagnostic provides information required for a corresponding treatment to be used safely and effectively within its specified context. The result is one part of a treatment decision.", summary: "The category concerns a device and a corresponding treatment use. FDA describes roles involving likely benefit, serious-adverse-effect risk or specified treatment monitoring. Check both the treatment and diagnostic labeling, including specimen, disease, biomarker and decision rule. A molecular report listing a drug is not by itself a companion-diagnostic authorization. Similar gene names do not establish assay interchangeability, and a positive result does not promise a response.", technologies: ["companion-diagnostic"] }),
  t({ id: "tumour-agnostic", name: "Tumour-agnostic (tissue-agnostic) approval", category: "Regulatory", tldr: "A tumour-agnostic approval lets a drug be used for any cancer carrying a specific molecular feature, regardless of where it started.", summary: "A tumour-agnostic, or tissue-agnostic, approval allows a drug to be used for any cancer carrying a specific molecular feature, regardless of the organ in which it started. Examples are Pembrolizumab for MSI-H disease in 2017 and TMB-high disease in 2020, larotrectinib, entrectinib and repotrectinib for NTRK fusions, Dabrafenib + trametinib for BRAF V600E, Selpercatinib for RET, and Trastuzumab deruxtecan for HER2 IHC 3+ tumours in 2024. Such approvals rest on basket trials and broad genomic testing, which is why DESTINY-PanTumor02 and DESTINY-CRC02 are linked. The term is referenced by the Non-small-cell lung cancer, Colorectal, Biliary tract, Endometrial and Cervical cancer entries and by the bottleneck on rare and paediatric cancers without markets.", wikipedia: W("Tissue-agnostic_drug"), drugs: ["pembrolizumab", "selpercatinib", "trastuzumab-deruxtecan"] }),
  t({ id: "basket-umbrella-platform", name: "Basket, umbrella, and platform trials", category: "Trials", tldr: "Trial designs that test one drug across several cancers sharing a mutation (basket, such as NCI-MATCH), several drugs each matched to a biomarker within one cancer (umbrella, such as Lung-MAP), or keep adding and dropping arms over time (platform, such as I-SPY 2). Basket results underpin tumour-agnostic approvals.", summary: "Basket, umbrella and platform trials are designs that respectively test one drug across several cancers, several drugs within one cancer, or keep adding and dropping arms over time. Basket trials such as NCI-MATCH and TAPUR enable tumour-agnostic approvals; umbrella trials such as Lung-MAP allow efficient biomarker-driven testing; and platform trials such as I-SPY 2 in breast cancer randomise adaptively, graduating drugs on predicted pCR. The term is referenced by the STAMPEDE and myeloMATCH trials, by the technologies Digital twins and virtual control arms and N-of-1 and rapid platform trials, and by Nicholas James, Zhi-Ming Shao, Angela DeMichele and Laura J. Esserman. It addresses the bottlenecks on rare cancers without markets, slow trial enrolment and trial design and cost.", wikipedia: W("Basket_trial"), aka: ["basket trial", "basket trials", "umbrella trial", "umbrella trials", "platform trial", "platform trials", "master protocol trial", "multi-arm multi-stage", "MAMS", "shared control arm", "common control arm", "perpetual trial"], related: ["basket-trial", "umbrella-trial", "seamless-adaptive", "response-adaptive-randomisation", "tumour-agnostic", "single-arm", "trial-protocol", "master-protocol"], trials: ["navigate", "roar-atc", "stampede", "myelomatch", "pediatric-match"] }),
  t({ id: "real-world-evidence", name: "Real-world evidence", category: "Trials", tldr: "Evidence about use, benefit or risk derived from analysis of routinely collected health data. Treatment assignment and comparison design determine what it can establish.", summary: "Real-world data are routinely collected information about health and care; real-world evidence is clinical evidence about a product's use, benefits or risks derived from analysing such data. Records, claims and registries can describe care beyond tightly selected trials. An observational comparison does not assign treatment, so its causal interpretation depends on how groups, outcomes and follow-up are constructed, measured and analysed. More data can improve precision while leaving systematic bias.", wikipedia: W("Real_world_evidence"), links: [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Real_world_evidence"
  },
  {
    "label": "FDA real-world evidence programme",
    "url": "https://www.fda.gov/science-research/science-and-research-special-topics/real-world-evidence"
  },
  {
    "label": "The Strengthening the Reporting of Observational Studies in Epidemiology (STROBE) statement: guidelines for reporting observational studies.",
    "url": "https://doi.org/10.1371/journal.pmed.0040296"
  },
  {
    "label": "Specifying a target trial prevents immortal time bias and other self-inflicted injuries in observational analyses",
    "url": "https://doi.org/10.1016/j.jclinepi.2016.04.014"
  },
  {
    "label": "Empirical confidence interval calibration for population-level effect estimation studies in observational healthcare data",
    "url": "https://doi.org/10.1073/pnas.1708282114"
  }
], aka: ["RWE", "real world evidence", "real-world data", "RWD", "real-world study", "real-world studies", "real-world outcomes", "observational study", "observational studies", "target trial emulation", "electronic health records", "claims data", "clinico-genomic database"], related: ["external-control-arm", "pragmatic-trial", "registry-based-trial", "randomised-trial", "hta", "trial-failure-modes", "decentralised-trial"], trials: ["pathfinder-2", "l-mind", "nmtrc003", "circulate-japan"] ,
"notes": [
  "An observational study records or reconstructs exposures without assigning them. A cohort follows a defined group over time; a case-control design selects people with and without an outcome and examines earlier exposures; a cross-sectional design measures a population at a time point. Prospective means forward follow-up, not randomized assignment. Such data can describe uncommon harms, care patterns and underrepresented populations. A causal claim about changing treatment requires more than an association. Random assignment reduces treatment-selection bias but cannot guarantee complete follow-up or applicability. In a fictional database, following treated and untreated groups forward from different dates does not randomize them.",
  "When emulating a trial, align eligibility, treatment-strategy assignment and the start of follow-up. Requiring treated people to survive until treatment while starting comparison follow-up earlier can build in a survival advantage. Matching, restriction and statistical adjustment require suitable measurements, assumptions and overlap; poorly measured or unmeasured factors can remain. A large database does not remove systematic error from confounding, selection or measurement. Inspect missing outcomes and follow-up as well as the starting clock.",
  "Two reading rules follow from asking which comparison is being estimated. A consequence of treatment is not automatically a baseline cause of treatment selection, so adjusting for every recorded variable is not a universal remedy and can change the question. Also check the proposed direction of time and causation: developing disease might change an exposure rather than the exposure initiating the disease. These are alternative explanations to examine in a particular study, not findings that either occurred in every observational dataset."
],
"asOf": "2026-11-11"
}),
  t({
    asOf:"2026-11-12", notes:["Uptake, administered activity and absorbed dose are different quantities. In its then-approved prostate-cancer setting, the 2023 joint EANM/SNMMI guideline describes fixed activities and says individual dosimetry is not mandatory for in-label lutetium-177 PSMA-617 use. This is a product- and setting-specific statement, not a rule for every radionuclide or indication; benefit from adapting treatment by dosimetry still needs clinical evidence.",
    "A target-directed PET product combines a targeting vector with a positron-emitting label and, where its chemistry uses them, a linker or chelator. Vectors include small molecules, peptides and antibodies. The accessible interaction and target location depend on the product; normal and stromal tissues may contribute signal. A labelled-key analogy is useful only if access and nonmalignant locks remain visible: RNA or total protein in one sample does not establish accessible target throughout the body. Observed uptake combines delivery, binding, retention, clearance and background.",
    "Keep three questions separate: was tracer detected, is target sufficiently available for a specified product, and does the matched treatment have a useful benefit-harm balance? Theranostic imaging connects a diagnostic result to a related treatment strategy through evidence. Radioligand therapy delivers the therapeutic radionuclide's radiation. The 68Ga-PSMA imaging and mainly beta-emitting 177Lu-PSMA therapy example belongs to prostate cancer and named products; it is not a breast-cancer eligibility or access claim. Shared targeting does not make different vectors, molecular masses, radionuclides, retention or emissions interchangeable.",
    "A fictional small-molecule tracer carrying isotope A lights up target M, and someone proposes an antibody carrying therapeutic isotope B. The scan shows that tracer's distribution at its recorded time. It cannot fill in the antibody's time course. The missing bridge includes therapeutic-product distribution and retention over time, decay and emissions, energy deposition and tissue dose, safety, and outcomes in the intended setting. Two curves with different shapes or durations can have different integrated activity; curve area alone is still not absorbed dose. The drawing has no calibrated numeric axes from which to calculate a dose.",
    "The measurement ledger names tracer, vector, isotope, administered activity, administered mass, injection and image times, scan coverage and the defined uptake region. A bright focus can include nonmalignant target sites, while low signal can reflect limited access, small size, background, low target or the protocol. Heterogeneity among visible lesions can add information beyond one tissue sample, without describing every unseen lesion. The PSMA imaging and therapy guidelines concern their named products and prostate settings; FDA's August 2019 document concerns nonclinical oncology therapeutic-radiopharmaceutical development. None is a personal clinical protocol for an arbitrary target-positive scan."
  ], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Theranostics"},{"label":"FDA 2019: nonclinical biodistribution, dosimetry and bridging","url":"https://www.fda.gov/media/129547/download"},{"label":"Joint EANM/SNMMI guideline, 2023: selection and dosimetry scope","url":"https://pubmed.ncbi.nlm.nih.gov/37246997/"},{"label":"FDA dated PSMA therapy/diagnostic selection notice, July 31, 2026","url":"https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-lutetium-lu-177-vipivotide-tetraxetan-androgen-receptor-pathway-inhibitor-therapy"}], id: "theranostics", aka: ["theranostic"], name: "Theranostics", category: "Radiopharma", tldr: "Theranostics links a diagnostic test to treatment through a shared target and supporting evidence for the particular products and clinical setting.", summary: "A diagnostic tracer and a therapeutic product may use the same targeting molecule, or different molecules with a supported relationship to a shared target. Changing the carrier, chelator, radionuclide or administered mass can change distribution and retention. Shared targeting is a rationale for a pair, rather than proof that it is validated.\n\nA positive scan is a measurement with a particular tracer and acquisition method. It does not establish complete lesion coverage, absorbed dose, safety or individual benefit. Small lesions, heterogeneous expression and test sensitivity also limit negative-scan interpretation. Keep the exact diagnostic and therapeutic products, selection rule, population and outcomes.\n\nAs a dated example, the July 2026 U.S. FDA notice describes lutetium Lu 177 vipivotide tetraxetan with an androgen receptor pathway inhibitor for adults with PSMA-positive metastatic androgen pathway modulation-naive or -sensitive prostate cancer. It specifies gallium Ga 68 gozetotide or another approved PSMA PET product for selection. That announcement does not establish an indication for another target-positive cancer.", wikipedia: W("Theranostics"), technologies: ["radioligand-therapy", "psma-pet", "targeted-alpha-therapy"] }),
  t({ id: "alpha-vs-beta", wikipedia: W("Targeted_alpha-particle_therapy"), name: "Alpha vs beta emitters", category: "Radiopharma", tldr: "Beta particles (lutetium-177) travel millimetres and are good for bulky disease; alpha particles (actinium-225) travel a few cells' width and kill with far higher energy.", summary: "This is about alpha particles versus beta particles in radioligand therapy, not the alpha/beta ratio of the linear-quadratic model used in external-beam fractionation. Beta and alpha emitters are the two kinds of particle used in radioligand therapy. Beta particles from lutetium-177 have low linear energy transfer and a range of 1 to 10 mm, so their crossfire helps in heterogeneous bulky tumours at the cost of marrow toxicity. Alpha particles from actinium-225 have very high linear energy transfer, around 100 keV per micrometre, travel only 50 to 100 micrometres and cause oxygen-independent DNA breaks, though daughter recoil redistributes dose and actinium-225 supply is the bottleneck. The distinction underlies the Radioligand therapy (beta emitters) and Targeted alpha therapy technologies and the pairing Beta radioligand to alpha radioligand, and it is referenced by Radium-223 dichloride and the Neuroendocrine tumours entry.", technologies: ["radioligand-therapy", "targeted-alpha-therapy"], related: ["alpha-beta-ratio"], terms: ["linear-energy-transfer", "relative-biological-effectiveness"] }),
  t({
    asOf:"2026-11-08", notes:["Report the method, time sampling, target volume and uncertainty. An organ-average dose can hide uneven cellular exposure, especially for short-range alpha emissions. Absorbed dose and clinical outcome remain distinct; no single organ threshold or schedule applies to all products."], links:[{"label":"EPA: activity, absorbed dose and their units","url":"https://www.epa.gov/radiation/radiation-terms-and-units"},{"label":"MIRD pamphlet 22: alpha-particle radiobiology and dosimetry (2010)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC5680544/"},{"label":"FDA: nonclinical development of oncology therapeutic radiopharmaceuticals (2019)","url":"https://www.fda.gov/media/129547/download"}], id: "dosimetry", wikipedia: "https://en.wikipedia.org/wiki/Dosimetry", name: "Dosimetry", category: "Radiopharma", tldr: "Dosimetry estimates the radiation energy deposited per unit mass in a specified tissue or target. The estimate depends on measurements, geometry and a stated model.", summary: "Absorbed dose is reported in gray, equivalent to joules per kilogram. It differs from radioactive activity in becquerels, which describes decays per second. For a radiopharmaceutical, dose estimation uses the location and time course of radioactivity, the emissions and the target’s mass and geometry. Suitable calibrated serial imaging can inform the estimate; it does not turn one uptake value into a measured tumor dose. External-beam and internal-emitter methods answer related dose questions using different inputs.", technologies: ["spect", "radioligand-therapy"] }),
  t({
    asOf:"2026-11-08", notes:["Suitable tumor/normal comparison can help attribute origin, but blood can carry acquired hematopoietic clones. Plasma variants can arise from those clones as well as a tumor. Mosaicism, contamination, specimen suitability and assay limits require assessment rather than automatic subtraction of every blood-matching variant.","Tumor sequencing is distinct from a clinical hereditary test. A negative result is bounded by its specimen, covered genes, detectable change classes and method; research matched-normal analysis does not automatically supply a hereditary-risk report."], links:[{"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Germline_mutation"},{"label":"MedlinePlus Genetics: inherited, de novo and mosaic variants","url":"https://medlineplus.gov/genetics/understanding/mutationsanddisorders/genemutation/"},{"label":"NHGRI: Mosaicism","url":"https://www.genome.gov/genetics-glossary/Mosaicism"},{"label":"Personalized genomic analyses for cancer mutation discovery and interpretation.","url":"https://pubmed.ncbi.nlm.nih.gov/25877891/"},{"label":"High-intensity sequencing reveals the sources of plasma circulating cell-free DNA variants.","url":"https://pubmed.ncbi.nlm.nih.gov/31768066/"},{"label":"NCI: inherited-cancer testing, tumor testing and bounded negative results","url":"https://www.cancer.gov/about-cancer/causes-prevention/genetics/genetic-testing-fact-sheet"}], related:["alleles-and-zygosity","vaf","clonal-haematopoiesis"], id: "germline-vs-somatic", aka: ["germline", "somatic", "inherited mutations", "tumour-normal"], name: "Germline vs somatic mutations", category: "Genomics", tldr: "A DNA change can be inherited, newly constitutional or acquired in a cell lineage. A change found in a tumor is not automatically tumor-specific.", summary: "Inherited germline variants came through an egg or sperm and are generally present across many tissues. A de novo constitutional variant need not have been inherited from a parent. Changes arising after fertilization can create mosaic distributions. Somatic variants occur in body-cell lineages, including normal tissues as well as cancers. Origin, distribution, harmfulness and transmissibility are separate questions; neither a variant class nor a large read fraction settles them.", wikipedia: W("Germline_mutation"), technologies: ["germline-testing"] }),
  t({ id: "tnm-staging", aka: ["TNM", "T stage", "N stage", "T1a", "T1b", "T1c", "pT2", "T1-2", "T3-4", "N2-3", "M0 disease", "clinical stage"], name: "TNM staging", category: "Clinical", tldr: "TNM describes primary tumour extent, regional nodes and distant metastasis under rules specific to the cancer and staging edition.", summary: "Interpret TNM with the organ, system, edition, evidence and treatment moment attached. Clinical, surgery-first pathological and post-neoadjuvant categories describe different assessments. Anatomical groups and prognostic groups are distinct, and a stage does not independently predict an individual outcome or choose a treatment.", wikipedia: W("TNM_staging_system") ,
"asOf": "2026-11-10",
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/TNM_staging_system"
  },
  {
    "label": "CAP invasive breast resection protocol 4.11.0.0, June 2026",
    "url": "https://www.cap.org/wp-content/uploads/2026/06/Breast.Invasive.Res_4.11.0.0.REL_CAPCP.pdf?download=true"
  },
  {
    "label": "NCI professional PDQ: AJCC eighth-edition breast staging tables",
    "url": "https://www.cancer.gov/types/breast/hp/breast-treatment-pdq"
  },
  {
    "label": "AJCC current staging-system table, 2026",
    "url": "https://www.facs.org/media/c5ik5tkr/ajcc-current-staging-system-2026.pdf"
  }
],
"notes": [
  "TNM uses cancer-specific rules for primary tumour extent, regional nodal findings and distant metastasis. State system and disease-specific edition; AJCC breast remains eighth edition in the 2026 current-system table. In breast rules, T3 is larger than 5 cm, whereas T4 requires qualifying skin or chest-wall extension. Size alone cannot establish T4 or an overall stage group.",
  "c denotes clinical assessment using examination, imaging and available biopsy evidence; p incorporates surgical pathological evidence. yc and yp identify clinical and pathological assessments after neoadjuvant treatment. Preserve the full treatment/specimen context: a later addendum on an old pretreatment biopsy still concerns that old sample.",
  "Keep pretreatment and residual T/N records rather than splicing a pretreatment T to a post-treatment N. CAP applies the y prefix to a formal months-long preoperative endocrine course, but not a brief exposure of days or weeks. Negative breast and regional-node specimens cannot supply pM0; M0 is clinical and pM1 requires the applicable pathological evidence.",
  "TNM categories do not alone specify a prognostic stage incorporating grade and receptors. Post-treatment extent and response are related but distinct. Regional nodal disease or extranodal extension does not by itself establish M1. In a fictional 6-cm pretreatment breast tumour without qualifying T4 features, cT3 can coexist with later ypT2 ypN1a without erasing the original extent.",
  "In breast clinical classification, cN3b denotes combined ipsilateral internal mammary and axillary involvement, not a count of ten surgical nodes. With M0, anatomical IIIB comprises T4 with N0, N1 or N2; a T3 size alone does not make IIIB. These anatomical groups differ from grade/receptor-specific clinical prognostic groups.",
  "Residual cancer burden combines breast-bed dimensions and cellularity with nodal count and metastasis diameter under its own protocol. It complements residual ypTNM rather than replacing it: a largest contiguous invasive focus for ypT is not interchangeable with a two-dimensional RCB bed."
]
}),
  t({ id: "cold-vs-hot", wikipedia: W("Tumor_microenvironment"), links: [
  {
    "label": "NCI Dictionary of Cancer Terms: hot tumor",
    "url": "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/hot-tumor"
  },
  {
    "label": "Elements of cancer immunity and the cancer-immune set point.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/28102259/"
  },
  {
    "label": "Bystander CD8&lt;sup&gt;+&lt;/sup&gt; T cells are abundant and phenotypically distinct in human tumour infiltrates.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29769722/"
  },
  {
    "label": "Tumor-Infiltrating Lymphocytes and Prognosis: A Pooled Individual Patient Analysis of Early-Stage Triple-Negative Breast Cancers.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30650045/"
  },
  {
    "label": "Colocalization of inflammatory response with B7-h1 expression in human melanocytic lesions supports an adaptive resistance mechanism of immune escape.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/22461641/"
  },
  {
    "label": "The evaluation of tumor-infiltrating lymphocytes (TILs) in breast cancer: recommendations by an International TILs Working Group 2014.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25214542/"
  },
  {
    "label": "Pitfalls in assessing stromal tumor infiltrating lymphocytes (sTILs) in breast cancer.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32411819/"
  },
  {
    "label": "In situ tumour arrays reveal early environmental control of cancer immunity.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/37258670/"
  }
], name: "Hot vs cold tumours", category: "Immunology", tldr: "Hot, excluded and desert describe where specified immune cells were found in sampled tissue. Their location alone does not establish tumour recognition, effective killing or benefit from a particular drug.", summary: "An inflamed or hot pattern has specified immune cells within sampled tumour regions. In an excluded pattern, cells concentrate in surrounding stroma or at a boundary with less entry into malignant nests. A desert has few relevant cells in the examined regions. Cold is used for desert alone or for both desert and excluded patterns, so state the definition. A macrophage-rich sample is not automatically T-cell inflamed.\n\nThese are observations about identity and location. Some infiltrating T cells recognize viral or other non-cancer antigens; others restrain responses. Region, specimen, disease site and sampling time matter, and treatment can change the pattern. Neither a small biopsy nor a pattern label describes every site in a person or selects an immunotherapy. Exclusion suggests questions about recruitment, vessels, matrix and local cells, rather than proving one causal wall.", technologies: ["checkpoint-inhibitor", "sting-agonist", "oncolytic-virus"] ,
"asOf": "2026-11-11",
"notes": [
  "In a fictional comparison, inflamed and excluded fields each contain eight specified T-cell symbols, relocated from mainly within malignant regions to surrounding stroma; a desert field has two. Equal counts can conceal different locations. Region outlines do not prove a physical barrier, these counts do not describe all mononuclear cells used in stromal TIL scoring, and they cannot be converted to an sTIL area percentage. The example depicts neither lymph-node follicles nor tertiary lymphoid organization and supplies no clinical cutoff or response rate.",
  "Routine pathology can score a defined infiltrate, multiplex imaging adds selected cell identities and coordinates, and mixed-tissue gene expression describes programmes without directly retaining each cell’s location. Report the preparation, section, sampled regions, staining and cell-assignment rules, regional variation, output and denominator. Descriptive labels, cells per area and method-defined stromal scores are different outputs. Sectioning and staining use finite tissue. Damage, staining error, incorrect boundaries and an unrepresentative region can limit the result. A research classifier needs separate validation for a clinical selection use.",
  "In Loi’s pooled analysis of 2,148 early TNBC patients given anthracycline-based adjuvant chemotherapy with or without taxanes, each 10 percentage-point increase in stromal TILs was associated with iDFS HR 0.87 and OS HR 0.84. This is prognosis in that population, not proof of additional checkpoint-drug benefit by hot/cold category. Taube’s tissue study also supports coexistence of lymphocyte infiltration and induced inhibitory PD-L1; hot does not mean every later immune step succeeds."
],
"related": [
  "immune-exclusion",
  "immune-desert-exclusion",
  "tils",
  "adaptive-immune-resistance"
]
}),
  t({
    notes:["Mechanism experiments can compare an intact conjugate with its free payload, measure uptake and released species, and perturb a suspected transporter or resistance gene. These experiments require controls and do not by themselves validate a clinical test for choosing the next ADC. A trial in ADC-naive patients cannot establish effectiveness specifically after progression on a prior TOP1 ADC.",
"Three fictional resistant models motivate different tests. If M is lost but the active payload still works with verified delivery to its action site, investigate another accessible address and the finished product's delivery. If M remains but the tested TOP1 material does not work while a microtubule-directed material does, investigate another action rather than predicting a probability of failure for every TOP1 ADC. If a pump inhibitor restores activity, test the specific export hypothesis with suitable controls: the inhibitor can have other effects. PADCEV's label identifies MMAE as a P-glycoprotein substrate, so a microtubule class name alone does not promise escape from export.",
"A fictional report of 25% responses after a prior ADC needs the response denominator and duration, actual earlier agents and payload classes, the reason for stopping, target entry criteria, dose and harms. Retained M supports a measured address, not an automatic bypass or a safety advantage. A shorter response on a later treatment does not by itself identify cross-resistance; disease history and selection into later therapy also matter. A comparison matched to progression on a prior TOP1 ADC answers a different question from activity in ADC-naive patients. The two cited mechanism studies do not themselves randomise patients to a payload-switch strategy; that is a bounded description of those studies, not a claim that no such trial exists."
], links:[{"label":"Abelman et al.: selected patient samples and functional TOP1-mutant experiments (2025)","url":"https://pubmed.ncbi.nlm.nih.gov/39745368/"},{"label":"Rampa et al.: acquired ADC resistance and payload switching in breast cancer models (2026)","url":"https://pubmed.ncbi.nlm.nih.gov/41591991/"},{"label":"Kinneer et al.: lysosomal-transporter loss and resistance to noncleavable conjugates (2018)","url":"https://pubmed.ncbi.nlm.nih.gov/30131388/"},
{
  "label": "PADCEV U.S. label: skin warning, MMAE transport and release-limited pharmacokinetics",
  "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5631d3e-4604-4363-8f20-11dfc5a4a8ed"
}
], asOf:"2026-11-11", id: "adc-sequencing", wikipedia: W("Antibody-drug_conjugate"), name: "ADC sequencing", category: "ADC", tldr: "ADC sequencing asks whether a second conjugate can help after the first fails, especially when it carries the same payload class. The earlier response and reason for stopping matter.", summary: "A second conjugate may retain activity after a first, but neither shared nor different target names settle the outcome. Payload cross-resistance, altered delivery and tumor evolution can all matter. Retrospective treatment sequences are affected by who lived long enough and remained fit to receive another drug, treatment line, prior response and clinician selection. A selected cohort with post-treatment plasma profiling and laboratory TOP1-mutant experiments supports a resistance hypothesis; cell and mouse payload-switching experiments test a different question. Neither design establishes the best clinical sequence.", technologies: ["adc", "topoisomerase-inhibitors"], cancers: ["tnbc", "breast-hr-positive"] }),
];
