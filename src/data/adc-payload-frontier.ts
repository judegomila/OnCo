import type { TermInput } from "@/lib/schema";

const asOf = "2026-11-08";
type Concept = Omit<TermInput, "kind" | "asOf" | "category"> & Partial<Pick<TermInput, "asOf">>;
const t = (x: Concept): TermInput => ({ kind: "term", asOf, category: "ADC chemistry", technologies: ["adc"], terms: ["payload"], ...x });
const paper = (label: string, doi: string) => ({ label, url: `https://doi.org/${doi}` });
const registry = (nct: string) => ({ label: `ClinicalTrials.gov: ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });

// These are sourced mechanism concepts, not entries in the payload/linker comparison registry.
// Many experimental payloads lack measured permeability, loading or human toxicity data.
// Keep those properties unknown; named observations need the exact species and source context.
export const adcPayloadFrontier: TermInput[] = [
  t({
  "id": "exatecan",
  "name": "Exatecan",
  "aka": [
    "DX-8951",
    "DX8951"
  ],
  "tldr": "Exatecan is a camptothecin-class TOP1 poison. It has been studied as a free drug and as cargo in delivery products; those formulations have different evidence and exposure.",
  "summary": "Exatecan is a defined chemical, commonly called DX-8951. DXd and other related payloads are separate chemical species or drug-linker systems, not interchangeable names for exatecan. Structure, attachment and the species actually released matter when interpreting potency, transport or safety.\n\nIn a randomized first-line advanced-pancreatic-cancer trial, adding exatecan to gemcitabine did not improve overall survival and increased specified severe blood-cell toxicities. That regimen does not establish that every standalone use failed solely because of toxicity or that attaching exatecan automatically supplies a useful therapeutic window.",
  "notes": ["The Abou-Alfa phase 3 report randomized 349 people to exatecan plus gemcitabine or gemcitabine alone. Median survival was 6.7 versus 6.2 months (P=.52); grade 3/4 neutropenia and thrombocytopenia were more frequent with the combination. This is one defined regimen and comparison.","Jo reported stronger experimental TOP1-DNA trapping by exatecan than comparison TOP1 inhibitors. Weng evaluated specific traceless antibody-exatecan constructs in resistant models. Neither observation by itself establishes superior patient outcomes or benefit from switching between all related ADCs.","A phosphonamidate-linker study and a separate camptothecin-derivative study changed solubility, loading or released chemical forms and measured bystander behavior in their own models. A family name does not provide a shared permeability, drug loading, efflux profile or clinical toxicity value.","Keep the delivery antigen, linker/attached form, released exatecan or derivative, exposure and prior resistance setting separate. Shared TOP1 action can allow cross-resistance, but its frequency and the effect of another treatment depend on the mechanism and clinical context.","Permeability, transporter handling and payload loading need the exact chemical or construct. No universal derivative profile follows from the exatecan name. The CLIO-8221 source identifies exatecan among two cargoes and supplies trial design, rather than a clinical-benefit result."],
  "links": [
    {
      "label": "PubChem: independently resolved exatecan chemical identity",
      "url": "https://pubchem.ncbi.nlm.nih.gov/compound/151115"
    },
    {
      "label": "Abou-Alfa et al.: exatecan/gemcitabine versus gemcitabine randomized trial (2006)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/16983112/"
    },
    {
      "label": "Jo et al.: exatecan TOP1-DNA trapping and experimental combinations (2022)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/35439320/"
    },
    {
      "label": "Weng et al.: antibody-exatecan conjugates in resistant models (2023)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/36693125/"
    },
    {
      "label": "Schmitt et al.: phosphonamidate-linked exatecan constructs (2023)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/37828728/"
    },
    {
      "label": "Li et al.: distinct camptothecin derivatives and released species (2019)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/31620223/"
    }
  ],
  "technologies": [
    "adc"
  ],
  "terms": [
    "payload",
    "topoisomerase-i-payloads"
  ],
  "drugs": [
    "clio-8221"
  ],
  "related": [
    "topoisomerase-i-payloads",
    "dxd",
    "adc-sequencing"
  ]
}),
  t({
    id: "next-generation-adc-payloads", name: "Next-generation antibody-conjugate payloads", asOf: "2026-11-09", aka: ["non-TOP1 payloads", "novel ADC payload mechanisms", "ADC payload diversification"],
    tldr: "Antibodies can carry drugs that block gene reading, remove proteins, interrupt cell signals or activate immune cells. Each approach needs its own evidence that the drug reaches its target and helps people safely.",
    summary: "Payload diversification changes what an antibody delivers, independently of which surface antigen it binds. This map includes transcription and splicing inhibitors, repair-checkpoint inhibitors, metabolic and apoptosis agents, targeted protein degraders, immune agonists, signaling inhibitors, and additional tubulin and DNA-interacting scaffolds. Bispecific targeting is a delivery format; dual payload means distinct agents on one construct. Neither label alone establishes a new payload mechanism. Protein toxins, radionuclides, oligonucleotides, photosensitizers and antibody-directed nanocarriers have related delivery questions but retain their own format definitions. Evidence ranges from cell experiments and animal models to early clinical studies; a mechanism change does not by itself establish benefit after a TOP1 antibody-drug conjugate.",
    technologies: ["adc", "dual-payload-adc", "bispecific-adc", "degrader-antibody-conjugate", "immune-stimulating-adc", "radioimmunotherapy", "antibody-oligonucleotide-conjugates", "photoimmunotherapy"],
    related: ["af-hpa", "dm21-c-maytansinoid-system", "transcription-inhibitor-payloads", "amanitin-payloads", "triptolide-payloads", "spliceosome-inhibitor-payloads", "cdk-inhibitor-payloads", "ddr-inhibitor-payloads", "atr-inhibitor-payloads", "nampt-inhibitor-payloads", "bcl-xl-inhibitor-payloads", "mcl1-inhibitor-payloads", "hdac-inhibitor-payloads", "gspt1-degrader-payloads", "brd4-degrader-payloads", "kif11-degrader-payloads", "ksp-inhibitor-payloads", "sting-agonist-payloads", "tlr-agonist-payloads", "gq11-inhibitor-payloads", "pi3k-pikk-inhibitor-payloads", "tubulysin-payloads", "hemiasterlin-payloads", "eribulin-payload", "cryptophycin-payloads", "anthracycline-payloads", "ign-payloads", "pdd-payloads", "protein-alkylator-payloads", "proteasome-inhibitor-payloads", "ferroptosis-conjugate-payloads", "protein-toxin-payloads"],
    links: [{"label": "Dolaflexin: AF-HPA and auristatin F in preclinical models (2021)", "url": "https://pubmed.ncbi.nlm.nih.gov/33722857/"},{"label": "XMT-1536 preclinical composition and NaPi2b-directed models (2021)", "url": "https://pubmed.ncbi.nlm.nih.gov/33722858/"},{"label": "IMGC936 with DM21-C: preclinical studies (2022)", "url": "https://pubmed.ncbi.nlm.nih.gov/35511740/"}, paper("Yamazaki et al., dual-payload conjugates in breast cancer models (2021)", "10.1038/s41467-021-23793-7"), paper("Carlino et al., Gq/11 inhibitor conjugate phase 1 study (2026)", "10.1038/s41591-026-04518-z")],
    notes: ["This is a map of publicly described mechanisms, not an exhaustive list of proprietary payload molecules or a ranking of treatments. Follow each concept to the experiment or trial supporting it.", "Chemical redesign also matters within an existing mechanism. The Dolaflexin studies distinguish AF-HPA from its active auristatin F metabolite. The IMGC936 preclinical report describes a peptide-linked DM21-C maytansinoid system. These are distinct cargo designs within the tubulin category, rather than proof that every redesign introduces a new mechanism or avoids clinical resistance."],
  }),
  t({
    notes:[
  "Transcription makes RNA from a DNA template; replication copies DNA. Amanitin acts on RNA polymerase II, while triptolide-directed designs interfere with other transcription machinery. A transcription-directed cargo is not automatically the same chemical or target as another member of the category.",
  "The Figueroa-Vazquez HDP-101 study included proliferating and resting myeloma cells, with BCMA-negative controls and animal models. This establishes an experimental cell-state scope, not eradication of every dormant clone, intrinsic tumor specificity or human benefit.",
  "The POLR2A dosage hypothesis concerns measured loss of a neighboring essential gene, sometimes with TP53-region deletion. A TP53 point mutation alone does not establish POLR2A loss or a clinical response rule. The colorectal amanitin-conjugate report and the TNBC siRNA-nanoparticle report used different delivery formats.",
  "Healthy cells also rely on transcription. The chemical species released from a conjugate, linker stability, antigen access, cellular uptake and normal-organ exposure remain relevant. OATP1B3-mediated uptake was studied for amatoxins; it does not give a permeability or toxicity value for every attached derivative.",
  "The 2015 colorectal dosage report and the 2019 TNBC nanoparticle paper have published corrections. Separate prostate/17p-loss and HER2-low/17p-loss reports were retracted in 2026 and are excluded from support. A corrected or retracted preclinical report must not become an unqualified clinical claim.",
  "A registry establishes a study design and dated status. Sponsor response reports, model regressions, patient-derived laboratory material and randomized patient outcomes are different evidence types. None should be substituted for an independently reviewed human benefit result.",
  "RNA polymerase II makes RNA from protein-coding genes; POLR2A encodes its largest catalytic subunit. Bushnell’s alpha-amanitin co-crystal study used yeast polymerase and supported a mechanism for blocking translocation. Transcription is different from copying DNA before division, but non-dividing healthy cells still need it. The Figueroa-Vazquez BCMA-directed amanitin work affected proliferating and resting myeloma cells while sparing BCMA-negative controls. In its mouse models, single intravenous doses produced durable complete remissions; this is not proof of eliminating dormant human disease. In the dosage hypothesis, hemizygous loss means one copy remains at the locus, unlike loss of both copies. The proposed vulnerability concerns reduced capacity of an essential gene co-deleted with TP53, rather than dependence on an activating cancer driver. POLR2A lies beside TP53 on chromosome 17p. In Liu’s colorectal models, expression tracked copy number, suppression acted independently of p53 itself, and an EpCAM-directed amanitin conjugate produced complete regressions in mice. Xu instead tested POLR2A siRNA nanoparticles in TNBC models with hemizygous loss. A TP53 mutation does not establish that copy state, and two copies do not by themselves guarantee a normal-tissue safety margin.",
  "The 2015 colorectal POLR2A-dosage paper has a 2021 correction replacing two caspase-3 staining panels; the authors state those images were not used for quantitative analysis and the original article was not corrected online. The 2019 TNBC siRNA paper has a 2019 correction to supplementary material and a 2020 correction replacing the Fig. 5j siNT@NPs image. These are distinct from the separate reports retracted in 2026. POLR2A copy loss, a TP53 point mutation, siRNA delivery and an amanitin conjugate remain different biological and delivery questions.",
  "Liu’s 2020 review concerned N-acetylcysteine treatment in 506 amatoxin-poisoned patients across 13 studies. It is not an incidence study of an antibody conjugate. Letschert’s transporter experiments identified OATP1B3 uptake in engineered cells and human hepatocytes. That helps explain an organ-exposure concern for the studied amatoxin species; it does not prove that every derivative has the same transport, that poisoning predicts conjugate toxicity, or that an antibody automatically creates a safety margin. A transporter-uptake experiment does not quantify passive membrane passage or bystander killing by a released derivative. Those require the actual chemical and appropriately controlled neighbouring-cell experiments; neither potency nor low payload loading substitutes for a measured release and exposure profile.",
  "Heidelberg Pharma’s October 2026 sponsor update reported that HDP-101 dose escalation had ended in April after 53 treated patients in ten cohorts. In pooled cohorts 5 to 9 it reported 13 responses among 31 evaluable people, about 42%; at the selected phase 2 dose, cohort 9 had 2 among 5, 40%. These counts use different denominators and the report does not establish confirmation or comparative benefit. The two refreshed HDP-101 registry records are recruiting; dated status and sponsor-reported responses are different evidence. These are myeloma reports, not human breast-cancer efficacy evidence. A clinical test of the gene-dosage hypothesis would pre-specify the copy-number or expression measurement, compare outcomes by that measurement, and report liver and other dose-limiting harms against delivered exposure. Laboratory selectivity is not a validated patient-selection rule.",
  "Singh’s 2024 myeloma study is a preprint using engineered TP53/POLR2A models, not a validated 17p patient-selection test. Papacharisi’s TROP2-amanitin experiments concern pancreatic and breast models. Their abstract reports picomolar cellular EC50 values, mouse xenograft activity and a 9.7 to 10.7 day half-life with no premature payload release in serum for the tested constructs. In the tested refractory pancreatic and TNBC xenografts, the authors reported complete tumour eradication and greater activity than Trodelvy. These are preclinical comparisons, not human efficacy or safety estimates. Ren’s exatecan/triptolide platform report is another preclinical design; its abstract does not establish the TROP2 target or an early human result attributed to it elsewhere. New mechanism, delivery antigen, normal-tissue exposure, released chemical and prior resistance must be assessed separately before inferring a useful next treatment."
], targets:["polr2a"],
    id: "transcription-inhibitor-payloads", name: "Transcription-inhibitor payloads", aka: ["RNA polymerase inhibitor payloads", "gene transcription payloads"],
    tldr: "Transcription-directed payloads interfere with the machinery that makes RNA. Antibody delivery is being studied to limit exposure, but each design needs evidence of useful activity and tolerability.",
    summary: "Transcription inhibition interrupts RNA production, unlike TOP1 poisons or tubulin inhibitors. Amanitin directly inhibits RNA polymerase II; triptolide interferes with the transcription factor TFIIH. The HDP-101 preclinical study included proliferating and resting myeloma cells. That result does not establish activity against every dormant tumor or clinical resistance mechanism. Targeted delivery, intracellular activity and tolerability must be demonstrated for each construct.",
    related: ["amanitin-payloads", "triptolide-payloads", "cdk-inhibitor-payloads", "spliceosome-inhibitor-payloads"],
    links: [
  {
    "label": "HDP-101 in proliferating and resting myeloma models (2021)",
    "url": "https://doi.org/10.1158/1535-7163.MCT-20-0287"
  },
  {
    "label": "Hayashi et al., CD26-directed triptolide conjugate (2019)",
    "url": "https://doi.org/10.3390/cancers11081138"
  },
  {
    "label": "Bushnell et al.: amanitin/RNA polymerase II structural study (2002)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/11805306/"
  },
  {
    "label": "Liu et al.: POLR2A dosage hypothesis in colorectal models (2015)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/25901683/"
  },
  {
    "label": "Xu et al.: POLR2A siRNA nanoparticles in TNBC models (2019)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30804480/"
  },
  {
    "label": "Author correction to the colorectal POLR2A report (2021)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/34433970/"
  },
  {
    "label": "Publisher correction to the TNBC nanoparticle report (2019)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/30837690/"
  },
  {
    "label": "Author correction to the TNBC nanoparticle report (2020)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/31953520/"
  },
  {
    "label": "Retraction notice for a separate HER2-low/17p-loss report (2026)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/41984934/"
  },
  {
    "label": "Letschert et al.: amatoxin transport in cells and human hepatocytes (2006)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/16495352/"
  },
  {
    "label": "Retraction notice for the separate prostate/17p-loss report (2026)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/42414292/"
  },
  {
    "label": "Liu et al., N-acetylcysteine in amatoxin poisoning (2020 systematic review)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32609548/"
  },
  {
    "label": "Singh et al., engineered myeloma amanitin-conjugate models (2024 preprint)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/38260385/"
  },
  {
    "label": "Papacharisi et al., TROP2-amanitin preclinical studies (2025)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/39564769/"
  },
  {
    "label": "Ren et al., exatecan/triptolide preclinical platform (2026)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/41121984/"
  },
  {
    "label": "Author correction: colorectal POLR2A report (2021)",
    "url": "https://www.nature.com/articles/s41586-021-03664-3"
  },
  {
    "label": "Author correction: TNBC nanoparticle report (2020)",
    "url": "https://www.nature.com/articles/s41565-020-0635-3"
  },
  {
    "label": "Heidelberg Pharma sponsor update, 15 October 2026",
    "url": "https://heidelberg-pharma.com/en/press-investors/announcements/press-releases-and-ad-hoc-announcements/pr-heidelberg-pharma-reports-on-the-first-nine-months-of-financial-year-2026"
  },
  {
    "label": "HDP-101 trial: dated registry status",
    "url": "https://clinicaltrials.gov/study/NCT04879043"
  },
  {
    "label": "HDP-101 China trial: dated registry status",
    "url": "https://clinicaltrials.gov/study/NCT07529782"
  }
],

"asOf": "2026-11-11"
}),
  t({
    targets:["polr2a"], notes:["The active target is RNA polymerase II, whose largest subunit is encoded by POLR2A. BCMA or TROP2 can instead be the antibody delivery address. A source identifying one does not identify the other.","Papacharisi tested TROP2-directed amanitin conjugates in cells and pancreatic/TNBC xenografts. Potency, reported serum stability and tumor eradication belong to those constructs and models. Their comparison with Trodelvy is not a randomized human comparison.","The Letschert uptake experiments identified OATP1B3-mediated amatoxin transport in engineered cells and primary human hepatocytes. Passive permeability, bystander activity and normal-organ toxicity still need evaluation for the actual released species; they cannot be assigned from the toxin-family name.","HDP-101 is being evaluated in separately registered dose-finding/expansion studies. The registry does not establish response benefit, a safe dose or prospective validation of POLR2A or 17p selection. The Chinese study has a source age-field inconsistency, described on the drug record; a generated eligibility summary is not sufficient."],
    id: "amanitin-payloads", name: "Amanitin payloads", aka: ["alpha-amanitin payload", "amatoxin payloads", "antibody-targeted amanitin conjugates", "ATAC payloads", "tismanitin"],
    tldr: "Amanitin payloads block the machinery that copies genes into messages. Attaching them to an antibody aims to direct their cell-killing action toward cancer cells.",
    summary: "Amanitin derivatives inhibit RNA polymerase II. HDP-101, also called pamlectabart tismanitin, links an amanitin derivative to an antibody against BCMA. Published preclinical work found activity in proliferating and resting myeloma cells and tumor regression in mouse models. The linked human trial is a separate safety and activity study. The toxicity of free amanitin and preclinical tolerability of a conjugate must not be treated as the same safety evidence.",
    drugs: ["pamlectabart-tismanitin"], terms: ["payload", "transcription-inhibitor-payloads"],
    links: [{"label":"HDP-101 preclinical study (2021)","url":"https://doi.org/10.1158/1535-7163.MCT-20-0287"},{"label":"ClinicalTrials.gov: NCT04879043","url":"https://clinicaltrials.gov/study/NCT04879043"},{"label":"Papacharisi et al.: TROP2 amanitin-conjugate preclinical study (2025)","url":"https://pubmed.ncbi.nlm.nih.gov/39564769/"},{"label":"Letschert et al.: human-hepatocyte amatoxin transport (2006)","url":"https://pubmed.ncbi.nlm.nih.gov/16495352/"},{"label":"HDP-101 Chinese phase 1 study and source eligibility discrepancy","url":"https://clinicaltrials.gov/study/NCT07529782"}],
  }),
  t({
    id: "triptolide-payloads", name: "Triptolide payloads", aka: ["TFIIH inhibitor payloads", "Y-TR1", "Y-TR-1"],
    tldr: "Triptolide payloads interfere with the cell's ability to make messages from its genes. An antibody-linked version has been studied in cancer cells and mice.",
    summary: "Y-TR1 combines the CD26-directed antibody YS110 with a triptolide derivative that inhibits the general transcription factor TFIIH. The published study reported altered RNA synthesis and antitumor activity in CD26-positive experimental models. This is preclinical evidence for a transcription-directed conjugate, not evidence that triptolide is an established antibody payload in clinical care.",
    terms: ["payload", "transcription-inhibitor-payloads"],
    links: [paper("Hayashi et al., Y-TR1 transcription-inhibitor conjugate (2019)", "10.3390/cancers11081138")],
  }),
  t({
    id: "spliceosome-inhibitor-payloads", name: "Spliceosome-inhibitor payloads", aka: ["RNA splicing inhibitor payloads", "thailanstatin", "thialanstatin", "spliceostatin payloads"],
    tldr: "These payloads disrupt the editing of gene messages before the cell uses them. Antibody-linked versions have shown activity in laboratory cancer models.",
    summary: "Thailanstatin and related spliceostatin-class agents inhibit pre-mRNA splicing. Primary studies demonstrated altered splicing and antigen-dependent killing with thailanstatin antibody conjugates, including activity in a gastric cancer xenograft model. Conjugation method and drug loading affected activity. This is distinct from stopping transcription and from degrading a translation protein. Laboratory activity in resistant cell lines does not establish clinical benefit after another antibody-drug conjugate.",
    targets: ["sf3b1"],
    links: [paper("Puthenveetil et al., splicing inhibitors as conjugate payloads (2016)", "10.1021/acs.bioconjchem.6b00291"), paper("Site-specific thailanstatin conjugates (2017)", "10.1371/journal.pone.0178452")],
  }),
  t({
    id: "cdk-inhibitor-payloads", name: "Cyclin-dependent kinase inhibitor payloads", aka: ["CDK inhibitor payloads", "CDK2/7/9 inhibitor conjugates", "SNS-032 payload", "CDK9 inhibitor payloads"],
    tldr: "These payloads block enzymes that help cells divide or read genes. An antibody may help deliver them to cancer cells that depend on those processes.",
    summary: "A cetuximab conjugate carrying SNS-032 was tested in EGFR-expressing triple-negative breast cancer cells, spheroids and xenograft models. SNS-032 inhibits CDK2, CDK7 and CDK9; it should not be described as a selective CDK9 payload. The study supports preclinical cell-cycle-directed delivery. A CDK inhibitor payload is also different from a degrader payload that removes a CDK protein.",
    related: ["transcription-inhibitor-payloads"],
    links: [paper("Cetuximab-SNS-032 in breast cancer models (2024)", "10.1158/1078-0432.CCR-23-3110")],
  }),
  t({
    id: "ddr-inhibitor-payloads", name: "DNA damage response inhibitor payloads", aka: ["DDR inhibitor payloads", "repair-checkpoint inhibitor payloads"],
    tldr: "These payloads block the systems cells use to cope with damaged DNA. One strategy puts a damage-causing drug and a repair-checkpoint inhibitor on the same antibody.",
    summary: "DNA damage response inhibition is a payload mechanism only when the inhibitor is carried by the conjugate. CLIO-8221 combines exatecan with the ATR inhibitor berzosertib on a HER2-directed antibody. Its published trial-design abstract describes preclinical rationale and a phase 1/2 study, not clinical proof that the combination overcomes resistance. Giving a separate PARP, ATR or WEE1 inhibitor alongside an antibody-drug conjugate is a combination regimen, not evidence of that inhibitor being an attached payload.",
    technologies: ["adc", "dual-payload-adc"], related: ["atr-inhibitor-payloads"], trials: ["nct07300943"],
    links: [paper("CLIO-8221 phase 1/2 trial-design abstract (2026)", "10.1200/JCO.2026.44.16_suppl.TPS3162"), paper("Azenosertib plus conjugates: a separate-drug combination study (2026)", "10.1016/j.isci.2026.116390")],
    notes: ["PARP and WEE1 combination studies retrieved in this review were not relabelled as payload studies. Each proposed repair-inhibitor payload needs a source identifying what is physically carried."],
  }),
  t({
    id: "atr-inhibitor-payloads", name: "ATR inhibitor payloads", aka: ["berzosertib payload", "TOP1 plus ATR dual payload", "CLIO-8221 payloads"],
    tldr: "An ATR inhibitor blocks a checkpoint that helps cells survive stress while copying DNA. Combining it with a DNA-damaging payload on one antibody is being tested in early research.",
    summary: "CLIO-8221 carries exatecan and berzosertib, pairing TOP1-mediated damage with ATR checkpoint inhibition. The primary trial-design abstract describes preclinical activity and the planned assessment of safety, dosing and activity in people. The direct registry records a phase 1/2 trial. These sources establish the construct and its evaluation, not comparative benefit or a validated biomarker for choosing it after TOP1 treatment.",
    technologies: ["adc", "dual-payload-adc"], terms: ["payload", "ddr-inhibitor-payloads"], trials: ["nct07300943"],
    links: [paper("CLIO-8221 trial-design abstract (2026)", "10.1200/JCO.2026.44.16_suppl.TPS3162"), registry("NCT07300943")],
  }),
  t({
    id: "nampt-inhibitor-payloads", name: "NAMPT inhibitor payloads", aka: ["NAD depletion payloads", "nicotinamide phosphoribosyltransferase inhibitor payloads"],
    tldr: "These payloads cut off a supply route for a molecule cells need to keep their metabolism working. Antibody delivery is being studied to direct that effect toward tumors.",
    summary: "NAMPT inhibitors interfere with nicotinamide adenine dinucleotide, or NAD, salvage. Anti-c-KIT conjugates showed target-dependent efficacy in a gastrointestinal stromal tumor xenograft study. A later primary study examined physicochemical and metabolic optimization of NAMPT inhibitor conjugates for blood and solid tumor models. These are preclinical payload studies; the dependence of healthy tissues on NAD makes selective delivery and tolerability central questions.",
    links: [paper("Karpov et al., NAMPT inhibitors as conjugate payloads (2018)", "10.1021/acsmedchemlett.8b00254"), paper("Ruedas et al., NAMPT payload optimization (2026)", "10.1021/acsbiomedchemau.6c00047")],
  }),
  t({
    id: "bcl-xl-inhibitor-payloads", name: "BCL-XL inhibitor payloads", aka: ["clezutoclax", "mirzotamab clezutoclax", "ABBV-155"],
    tldr: "These payloads release a brake that can stop damaged cells from dying. Attaching the drug to an antibody aims to concentrate that effect in cancer cells.",
    summary: "BCL-XL is an anti-apoptotic protein. Primary preclinical research tested BCL-XL inhibitor conjugates and showed that drug-linker changes altered cardiovascular, kidney and platelet toxicities in animal studies. The resulting linker-payload was incorporated into the B7-H3-directed mirzotamab clezutoclax, or ABBV-155. The original solid-tumor trial is completed in the registry. This represents an apoptosis-directed payload, not proof that antibody targeting removes all toxicity from BCL-XL inhibition.",
    related: ["mcl1-inhibitor-payloads"],
    links: [paper("Judd et al., BCL-XL inhibitor conjugates (2024)", "10.1126/sciadv.ado7120"), registry("NCT03595059")],
  }),
  t({
    id: "mcl1-inhibitor-payloads", name: "MCL-1 inhibitor payloads", aka: ["S64315 payload", "MIK665 payload", "S227928 payload"],
    tldr: "These payloads block another protein that can protect cancer cells from dying. Antibody delivery is being studied to direct that effect toward selected blood cancers.",
    summary: "S227928 links the MCL-1 inhibitor S64315, also called MIK665, to a CD74-directed antibody. The primary ASH abstract reported intracellular payload release and target engagement in leukemia models. Single-agent activity was modest in the reported models, while combining the conjugate with the separate BCL-2 inhibitor venetoclax increased activity. This is an MCL-1 payload plus a separate drug, not a dual-payload construct. Preclinical results and a registered early trial do not establish clinical benefit or removal of the safety concerns associated with MCL-1 inhibition.",
    targets: ["mcl1"], related: ["bcl-xl-inhibitor-payloads"],
    links: [paper("Maragno et al., S227928 preclinical ASH abstract (2024)", "10.1182/blood-2024-210048"), registry("NCT06563804")],
    notes: ["The antibody binds CD74 on the cell surface; the payload acts on MCL-1 inside the cell. Approval of a different medicine linked to MCL1 does not establish approval of this conjugate."],
  }),
  t({
    id: "hdac-inhibitor-payloads", name: "Histone deacetylase inhibitor payloads", aka: ["HDAC inhibitor payloads", "ST7612AA1"],
    tldr: "These payloads alter how tightly genetic instructions are packaged and used. Researchers have attached them to antibodies to test targeted control of cancer-cell behavior.",
    summary: "Cetuximab conjugates carrying the histone deacetylase inhibitor ST7612AA1 were studied with cleavable and non-cleavable linkers. The primary report demonstrated changes in histone and tubulin acetylation and antitumor activity in animal models. This supports an epigenetic payload concept even when the unconjugated molecule is less cytotoxic than conventional payloads. Human safety and benefit require separate evaluation.",
    links: [paper("Cini et al., antibody delivery of an HDAC inhibitor (2018)", "10.1039/c7sc05266a")],
  }),
  t({
    id: "gspt1-degrader-payloads", name: "GSPT1 degrader payloads", aka: ["SMol006", "GSPT1 molecular glue payloads", "translation termination degrader payloads"],
    tldr: "These payloads tell the cell to destroy a protein used to finish making other proteins. The antibody directs the protein-removing drug toward cells carrying its target.",
    summary: "ORM-5029 delivers the GSPT1 molecular glue degrader SMol006 using pertuzumab. Its primary preclinical abstract describes GSPT1 depletion, stress responses and antitumor activity in models. GSPT1 acts in translation termination, not RNA transcription. ORM-5029 and the CD33-directed ORM-6151 reached human studies; their linked trials are now terminated. Those trial outcomes must remain visible when describing the promise of this mechanism.",
    technologies: ["adc", "degrader-antibody-conjugate"], drugs: ["orm-5029", "orm-6151"],
    links: [paper("Palacino et al., ORM-5029 preclinical abstract (2022)", "10.1158/1538-7445.AM2022-3933"), registry("NCT05511844"), registry("NCT06419634")],
  }),
  t({
    id: "brd4-degrader-payloads", name: "BRD4 degrader payloads", aka: ["BET degrader antibody payloads", "antibody-PROTAC payloads"],
    tldr: "These payloads cause the cell to remove a protein that helps control gene activity. Antibody-linked versions have been tested in cancer cells and mice.",
    summary: "BRD4-directed heterobifunctional degraders recruit the cell's protein-disposal machinery rather than simply occupying an enzyme. Primary work demonstrated antigen-dependent BRD4 depletion and antitumor activity with degrader-antibody conjugates in mouse xenografts. This evidence supports antibody-mediated delivery of a degrader but does not establish that every intracellular protein can be reached or that a clinical therapeutic window follows from protein removal.",
    technologies: ["adc", "degrader-antibody-conjugate", "protac-degrader"], targets: ["brd4"],
    links: [paper("Dragovich et al., antibody delivery of BRD4 degraders, part 2 (2021)", "10.1021/acs.jmedchem.0c01846")],
  }),
  t({
    id: "kif11-degrader-payloads", name: "KIF11 degrader payloads", aka: ["dKIF976", "Eg5 degrader payloads", "KSP degrader payloads"],
    tldr: "These experimental payloads remove a motor protein needed for cell division. They differ from drugs that block the same motor without removing it.",
    summary: "An ASCO preclinical abstract described dKIF976, a cereblon-recruiting KIF11 degrader, and antibody conjugates with antigen-dependent protein degradation and cell-growth inhibition. KIF11 is also called Eg5 or kinesin spindle protein. The reported conjugate experiments were cellular studies; the abstract does not demonstrate clinical activity or an established safety advantage over KIF11 inhibitors.",
    technologies: ["adc", "degrader-antibody-conjugate"], related: ["ksp-inhibitor-payloads"],
    links: [paper("Feng et al., KIF11 degrader conjugate, ASCO abstract (2025)", "10.1200/JCO.2025.43.16_suppl.3092")],
  }),
  t({
    id: "ksp-inhibitor-payloads", name: "Kinesin spindle protein inhibitor payloads", aka: ["KSP inhibitor payloads", "Eg5 inhibitor payloads", "KIF11 inhibitor payloads", "pyrrole-based KSP payloads"],
    tldr: "These payloads block a motor that cells need to separate their chromosomes. They interrupt division through a different target from drugs that bind the cell's scaffolding.",
    summary: "Kinesin spindle protein, also called Eg5 or KIF11, is a motor involved in spindle formation. Primary research linked pyrrole-based inhibitors to antibodies against HER2 and TWEAKR/Fn14 and demonstrated selective activity in cell and animal tumor models. The study emphasized stable conjugation and sustained intracellular exposure. Blocking this motor remains a mitosis-directed strategy; it is not a tubulin-binding mechanism and should not be classified as one.",
    related: ["kif11-degrader-payloads", "tubulin-inhibitor-payloads"],
    links: [paper("Lerchen et al., pyrrole-based KSP inhibitor conjugates (2018)", "10.1002/anie.201807619")],
  }),
  t({
    id: "sting-agonist-payloads", name: "STING agonist payloads", aka: ["Immunosynthen", "XMT-2056 payload"],
    tldr: "These payloads activate an internal alarm that can bring immune cells into action. Antibody delivery aims to trigger the alarm near tumors while limiting activation elsewhere.",
    summary: "STING is an intracellular sensor pathway involved in innate immunity. XMT-2056 is a HER2-directed conjugate whose STING agonist activated cancer cells and tumor-resident immune cells in preclinical studies. Its development study must be distinguished from its human trial, which the registry now lists as terminated. STING activation is not equivalent to TLR activation, and tumor-directed delivery does not guarantee freedom from systemic inflammation.",
    technologies: ["adc", "immune-stimulating-adc", "sting-agonist"],
    links: [paper("XMT-2056 preclinical pharmacology (2025)", "10.1158/1078-0432.CCR-24-2449"), paper("STING agonist conjugate platform development (2023)", "10.1021/acs.jmedchem.3c00907"), registry("NCT05514717")],
  }),
  t({
    id: "tlr-agonist-payloads", name: "Toll-like receptor agonist payloads", aka: ["TLR7/8 agonist payloads", "TLR8 agonist conjugates", "TLR7 agonist conjugates"],
    tldr: "These payloads stimulate immune-cell sensors that recognize danger. The goal is to direct immune activation toward a tumor using an antibody.",
    summary: "TLR7/8 agonist antibody conjugates have induced myeloid activation and adaptive immune responses in preclinical studies. The Ackerman study required tumor-antigen recognition, Fc-receptor-dependent phagocytosis and TLR activation, rather than payload toxicity alone. BDC-1001 and SBT6050 are human-study examples. The BDC-1001 registry studies are terminated; one SBT6050 study is of unknown status and another is terminated. Unknown status should not be presented as recruiting.",
    technologies: ["adc", "immune-stimulating-adc"],
    links: [paper("Ackerman et al., immune-stimulating conjugates (2021)", "10.1038/s43018-020-00136-x"), registry("NCT04278144"), registry("NCT05954143"), registry("NCT04460456"), registry("NCT05091528")],
  }),
  t({
    id: "gq11-inhibitor-payloads", name: "Gq/11 inhibitor payloads", aka: ["SDZ475", "DYP688 payload", "GNAQ GNA11 inhibitor conjugates"],
    tldr: "These payloads block a cell signal that drives some melanomas. An antibody carries the inhibitor into cells bearing a melanoma-associated surface protein.",
    summary: "DYP688 targets the surface protein PMEL and delivers the Gq/11 inhibitor SDZ475. A published phase 1 study in metastatic uveal melanoma and other GNAQ/GNA11-mutant melanomas reported human safety and preliminary activity. This is direct pathway inhibition rather than a conventional tubulin or DNA-damaging payload. The study was an early dose-escalation trial, so it does not establish a comparative survival benefit or approval.",
    trials: ["nct05415072"],
    links: [paper("DYP688 phase 1 clinical study (2026)", "10.1038/s41591-026-04518-z"), registry("NCT05415072")],
  }),
  t({
    id: "pi3k-pikk-inhibitor-payloads", name: "PI3K/PIKK inhibitor payloads", aka: ["HMPL-A580 payload", "PI3K/PIKK antibody-targeted therapy conjugates"],
    tldr: "These payloads block enzymes that support cancer-cell growth and stress responses. Antibody delivery is being studied as a way to direct those effects toward tumors.",
    summary: "The primary AACR abstract for HMPL-A580 describes an EGFR-directed antibody carrying a PI3K/PIKK inhibitor through a cleavable linker. Cell and xenograft experiments reported intracellular delivery, pathway inhibition and antitumor activity. PI3K and PIKK denote different kinase families; this broad payload label must not be reduced to a single selective kinase target without supporting data. The cited evidence is a preclinical conference abstract, not a clinical efficacy report.",
    links: [paper("Cai et al., HMPL-A580 preclinical AACR abstract (2026)", "10.1158/1538-7445.AM2026-4549")],
  }),
  t({
    id: "anthracycline-payloads", name: "Anthracycline payloads", aka: ["PNU-159682", "nemorubicin metabolite payloads", "anthracycline antibody conjugates"],
    tldr: "Antibodies can carry potent relatives of an established chemotherapy family called anthracyclines. Researchers are testing these payloads as another way to kill targeted cancer cells.",
    summary: "PNU-159682 is an anthracycline derivative used in experimental antibody conjugates. A primary study of a uPAR-directed PNU-159682 conjugate reported tumor suppression and changes in the immune environment in pancreatic cancer models. It is a distinct scaffold from camptothecin TOP1 payloads. An anthracycline label alone does not establish the dominant mechanism, resistance profile or clinical safety of each derivative.",
    links: [paper("uPAR-directed anthracycline conjugate in pancreatic cancer models (2025)", "10.1126/sciadv.adq0513")],
  }),
  t({
    id: "eribulin-payload", name: "Eribulin as an antibody-conjugate payload", aka: ["ecteribulin payload", "MORAb-202 payload", "halichondrin-derived payloads"],
    tldr: "Eribulin is a drug that disrupts the scaffolding needed for cell division. Linking it to an antibody changes how it is delivered and needs separate evidence from eribulin given on its own.",
    summary: "Farletuzumab ecteribulin, or MORAb-202, combines a folate receptor alpha antibody with eribulin through a cleavable linker. Primary preclinical work reported target-dependent activity, bystander killing in coculture, and activity in breast cancer xenografts. Eribulin represents another tubulin-directed scaffold, not a new biological target beyond tubulin. Evidence and toxicity of the conjugate must be kept separate from those of free eribulin.",
    drugs: ["eribulin", "farletuzumab-ecteribulin"], terms: ["payload", "tubulin-inhibitor-payloads"],
    links: [paper("MORAb-202 in breast cancer models (2021)", "10.1111/cas.14898")],
  }),
  t({
    id: "tubulysin-payloads", name: "Tubulysin payloads", aka: ["tubulysin antibody conjugates", "tubulysin analog payloads"],
    tldr: "Tubulysins are another family of drugs that disrupt the cell's scaffolding. Antibody-linked versions are being studied to deliver their cell-killing action more selectively.",
    summary: "Tubulysin derivatives are tubulin-directed payloads distinct from auristatins and maytansinoids. A primary comparison of tubulysin antibody conjugates found that conjugation mode and site changed payload stability, pharmacokinetics and efficacy in a gastric cancer xenograft model. Results from a peptide or small-molecule tubulysin conjugate should not be described as antibody-conjugate evidence.",
    terms: ["payload", "tubulin-inhibitor-payloads"],
    links: [paper("Tubulysin conjugation site, stability and efficacy study (2025)", "10.1002/open.202400522")],
  }),
  t({
    id: "hemiasterlin-payloads", name: "Hemiasterlin payloads", aka: ["SC209", "tazevibulin payload", "3-aminophenyl hemiasterlin", "SC239 linker-payload"],
    tldr: "Hemiasterlin-derived payloads disrupt the scaffolding used in cell division. One is carried by the experimental antibody drug luveltamab tazevibulin.",
    summary: "Luveltamab tazevibulin, or STRO-002, uses the folate receptor alpha antibody to deliver the tubulin-targeting hemiasterlin derivative SC209. SC239 is the linker-warhead used to assemble the conjugate, not a synonym for the released SC209 alone. The primary discovery study reported antigen-dependent killing, bystander activity and efficacy in xenograft models. This is a different scaffold within the tubulin class, not a mechanism unrelated to tubulin.",
    drugs: ["luveltamab-tazevibulin"], terms: ["payload", "tubulin-inhibitor-payloads"],
    links: [paper("Discovery of STRO-002 and its hemiasterlin payload (2023)", "10.1158/1535-7163.MCT-22-0322")],
  }),
  t({
    id: "cryptophycin-payloads", name: "Cryptophycin payloads", aka: ["cryptophycin-55", "cryptophycin-52", "aza-cryptophycin payloads"],
    tldr: "Cryptophycin payloads are powerful blockers of cell division. Antibody-linked versions are being investigated to improve how these drugs reach tumors.",
    summary: "Cryptophycin-55 derivatives have been attached to trastuzumab and tested in HER2-positive cell lines and mouse xenografts. Cryptophycin-52 is a tubulin inhibitor; the primary conjugate study investigated release and conversion of the cryptophycin-55 prodrug. This is an experimental tubulin-directed scaffold. Activity of the free molecule, prodrug and intact antibody conjugate must be distinguished.",
    terms: ["payload", "tubulin-inhibitor-payloads"],
    links: [paper("Lai et al., cryptophycin-55/52 antibody conjugates (2020)", "10.1016/j.ejmech.2020.112364")],
  }),
  t({
    id: "ign-payloads", name: "Indolinobenzodiazepine payloads", aka: ["IGN payloads", "indolinobenzodiazepine dimers", "monoimine IGN"],
    tldr: "These payloads attach a chemical group to DNA and can prevent a cancer cell from surviving. Their chemistry differs from related payloads that join two DNA strands together.",
    summary: "Indolinobenzodiazepine dimers, or IGNs, include monoimine DNA alkylators. A primary mechanistic study showed stable DNA adducts and distinguished monoimine IGNs from diimine crosslinking analogues. Sharing a dimer scaffold does not mean that an IGN makes the same DNA crosslinks as a PBD dimer. The mechanism of the particular payload and released catabolite should be recorded.",
    terms: ["payload", "dna-alkylator-payloads"], related: ["pbd-dimer-payloads", "pdd-payloads"],
    links: [paper("IGN DNA-binding and catabolite mechanism study (2019)", "10.1021/acs.molpharmaceut.9b00675")],
  }),
  t({
    id: "pdd-payloads", name: "Pyridinobenzodiazepine payloads", aka: ["PDD payloads", "sequence-selective DNA mono-alkylating payloads"],
    tldr: "These experimental payloads are designed to damage selected DNA sequences. They are related to other DNA-binding payloads but have their own chemistry and evidence.",
    summary: "Pyridinobenzodiazepines, or PDDs, are sequence-selective DNA mono-alkylators. A primary study linked a PDD monomer derivative to trastuzumab and reported activity in a pancreatic cancer xenograft model. The results support a preclinical payload concept. They do not establish a clinical advantage over TOP1 conjugates or justify assigning the crosslinking mechanism of PBD dimers to PDD monomers.",
    terms: ["payload", "dna-alkylator-payloads"], related: ["ign-payloads", "pbd-dimer-payloads"],
    links: [paper("Andriollo et al., sequence-selective PDD payload (2025)", "10.1039/d4md01040j")],
  }),
  t({
    id: "protein-alkylator-payloads", name: "Protein-alkylating payloads", aka: ["PA289", "ProAlk payloads", "cytosolic protein alkylator payloads"],
    tldr: "These experimental payloads are proposed to kill cells by chemically modifying proteins. The reported mechanism is still being investigated.",
    summary: "An AACR abstract described PA289, a seco-CBI-based prodrug linker-payload with a glucuronide trigger. The authors proposed alkylation of one or more cytosolic proteins and reported activity in cell and xenograft experiments, with exploratory monkey toxicology. The protein target was not established in the abstract. Protein alkylation should remain an attributed mechanism hypothesis, not be silently recast as proven DNA alkylation or human safety.",
    links: [paper("Mysliwy et al., PA289 preclinical AACR abstract (2025)", "10.1158/1538-7445.AM2025-1579")],
  }),
  t({
    id: "proteasome-inhibitor-payloads", name: "Proteasome inhibitor payloads", aka: ["carfilzomib conjugate payload", "lysosomal payload inactivation"],
    tldr: "Blocking a cell's protein-disposal machinery is one proposed payload strategy. A study of antibody-linked carfilzomib shows why a drug that works on its own can lose activity after delivery.",
    summary: "Carfilzomib was attached to antibodies against CD22 or HER2, but the resulting conjugates lost their cell-killing potency. The primary study found that lysosomal enzymes could release carfilzomib and then inactivate it. This is negative evidence for those constructs, not evidence that proteasome inhibition can never work as a payload. Intracellular chemical stability must be tested alongside release and target potency.",
    drugs: ["carfilzomib"], related: ["proteasome-inhibitor"], tags: ["failure"],
    links: [paper("Carfilzomib conjugates and lysosomal inactivation (2019)", "10.1124/dmd.119.086595")],
  }),
  t({
    id: "ferroptosis-conjugate-payloads", name: "Ferroptosis-inducing payloads and antibody-directed carriers", aka: ["ferroptosis payloads", "sulfasalazine payload", "IKE antibody nanogel conjugate"],
    tldr: "Ferroptosis is cell death caused by damage to fatty molecules in cell membranes. Antibody-directed carriers are being studied to deliver drugs that trigger it in tumors.",
    summary: "A primary study linked an FGFR4 antibody to the ferroptosis inducer sulfasalazine through a cleavable linker and reported target-dependent activity in liver cancer models. A separate study used an anti-PD-L1 antibody linked to a nanogel encapsulating imidazole ketone erastin, or IKE, with ferroptosis and tumor suppression in experimental models. The former is a directly conjugated small-molecule payload; the latter is an antibody-directed nanocarrier. Both are preclinical evidence and should retain their different delivery formats.",
    links: [paper("FGFR4 conjugate carrying sulfasalazine (2025)", "10.1016/j.isci.2025.113718"), paper("Antibody nanogel delivery of a ferroptosis inducer (2024)", "10.1016/j.chembiol.2024.10.014")],
    notes: ["These studies concern sulfasalazine and IKE. They do not establish that every inhibitor of the ferroptosis-defense protein GPX4 can be made into a conventional antibody payload."],
  }),
  t({
    id: "protein-toxin-payloads", name: "Protein toxin payloads and immunotoxins", aka: ["ribosome-inactivating protein payloads", "deBouganin", "bouganin conjugates"],
    tldr: "An antibody can deliver a protein toxin that stops a cell making proteins. These larger payloads belong to the related field of immunotoxins and need different delivery and safety studies.",
    summary: "DeBouganin is a modified ribosome-inactivating protein. A primary study tested trastuzumab-deBouganin conjugates and an antibody-fragment fusion protein in cells resistant to tubulin-payload conjugates. Both chemical conjugation and fusion-protein delivery were examined. These protein toxins are different from small-molecule degraders such as GSPT1 payloads and from conventional chemotherapy payloads. The cited cellular results do not establish clinical activity after antibody-drug conjugate treatment.",
    links: [paper("DeBouganin conjugates and fusion proteins in resistant cells (2016)", "10.3390/molecules21121741")],
  }),
];
