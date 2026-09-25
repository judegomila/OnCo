import type { PersonInput } from "@/lib/schema";

/**
 * People: Israel. Until this file the corpus held nine Israeli-affiliated people, every one of them a hospital or
 * institute director; the scientists and clinicians whose work the institution pages already described by name had
 * no records of their own. These are those people.
 *
 * Public professional information only. Roles are taken from the affiliation line of the person's most recent
 * indexed papers (Europe PMC, checked 2026-09-25) or from an institutional page, and change over time; treat
 * `role` as indicative. Every record carries at least one paper with a DOI or PubMed id and a PubMed author search.
 */
const asOf = "2026-09-25";
const pm = (q: string) => ({ label: "PubMed author search", url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}` });
const epmc = (q: string) => ({ label: "Europe PMC author and affiliation search", url: `https://europepmc.org/search?query=${encodeURIComponent(q)}` });
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

export const peopleIsrael: PersonInput[] = [
  // ---------------------------------------------------------------- Weizmann Institute of Science
  p({ id: "zelig-eshhar", name: "Zelig Eshhar", role: "Immunologist; professor emeritus, Weizmann Institute of Science, latterly Immunology Laboratory, Tel Aviv Sourasky Medical Center", institutionId: "weizmann", institutions: ["weizmann", "tel-aviv-university", "tel-aviv-sourasky"],
    specialisms: ["Cancer immunology", "Chimeric antigen receptors", "Adoptive cell therapy", "T-cell engineering"],
    tldr: "The immunologist who, in 1989, first gave a T cell an antibody's aim. Every CAR-T product on the market descends from that experiment.",
    summary: "Zelig Eshhar's laboratory at the Weizmann Institute of Science built the first chimeric antigen receptor. In Gross, Waks and Eshhar's 1989 paper in the Proceedings of the National Academy of Sciences, the variable domains of an antibody against trinitrophenyl were spliced onto the constant domains of the T-cell receptor alpha and beta chains and expressed in a cytotoxic T-cell hybridoma. The transfected cells killed and made interleukin-2 in response to the hapten without needing the major histocompatibility complex to present it, across strain and species barriers, and responded to immobilised conjugates, bypassing antigen processing altogether. Eshhar called the construct a \"T-body\", and his group's 1993 single-chain variable fragment design is the format every modern CAR uses. Every approved CAR-T product, from tisagenlecleucel to the BCMA products in myeloma, descends from it, with costimulatory domains added later by Michel Sadelain, Carl June and Dario Campana.\n\nPriority is genuinely contested and this record says so. Kuwana and colleagues in Japan built an antibody-variable and T-cell-receptor-constant chimera in 1987, two years earlier, and showed antigen-triggered calcium signalling; what the 1989 Weizmann paper added was redirected killing and cytokine secretion independent of the major histocompatibility complex. Which counts as the first chimeric antigen receptor depends on whether you require function. Eshhar later published repeatedly with Steven Rosenberg's group at the National Cancer Institute, including the first-in-human CAR trial from that collaboration, in ovarian cancer, which was negative; he continued on dual-specificity CARs and on CAR dosing and safety, and his recent papers carry a Tel Aviv Sourasky Medical Center affiliation.",
    profiles: [{ label: "Weizmann Institute of Science", url: "https://www.weizmann.ac.il" }, pm("Eshhar Z[Author] chimeric")],
    papers: [
      { title: "Expression of immunoglobulin-T-cell receptor chimeric molecules as functional receptors with antibody-type specificity", journal: "Proceedings of the National Academy of Sciences", year: 1989, doi: "10.1073/pnas.86.24.10024", note: "Gross G, Waks T, Eshhar Z. The first chimeric antigen receptor." },
      { title: "Specific activation and targeting of cytotoxic lymphocytes through chimeric single chains consisting of antibody-binding domains and the gamma or zeta subunits of the immunoglobulin and T-cell receptors", journal: "Proceedings of the National Academy of Sciences", year: 1993, doi: "10.1073/pnas.90.2.720", note: "Eshhar Z, Waks T, Gross G, Schindler DG. The single-chain design modern CARs use." },
      { title: "Therapeutic potential of T cell chimeric antigen receptors (CARs) in cancer treatment: counteracting off-tumor toxicities for safe CAR T cell therapy", journal: "Annual Review of Pharmacology and Toxicology", year: 2016, doi: "10.1146/annurev-pharmtox-010814-124844" },
      { title: "Treatment of multiple myeloma using chimeric antigen receptor T cells with dual specificity", journal: "Cancer Immunology Research", year: 2020, doi: "10.1158/2326-6066.cir-20-0118" },
    ],
    keyPapers: ["paper-gross-eshhar-chimeric-receptor-pnas-1989"],
    technologies: ["car-t"], cancers: ["all-leukemia", "dlbcl", "multiple-myeloma"], targets: ["cd19"], sections: ["cell-therapy", "immunotherapy"], bottlenecks: ["b-manufacturing-cell-therapy"],
    tags: ["clinician-scientist", "immunology", "cell-therapy"] }),

  p({ id: "yardena-samuels", name: "Yardena Samuels", role: "Professor, Department of Molecular Cell Biology, Weizmann Institute of Science", institutionId: "weizmann", institutions: ["weizmann"],
    specialisms: ["Melanoma genomics", "Neoantigens and immunopeptidomics", "Cancer gene discovery", "Intratumour heterogeneity"],
    tldr: "She found that PIK3CA is one of the most frequently mutated genes in human cancer, then spent the next twenty years working out which of a melanoma's mutations the immune system can actually see.",
    summary: "Yardena Samuels was first author, working in Bert Vogelstein and Victor Velculescu's group at Johns Hopkins before she moved to the National Cancer Institute and then to Weizmann, of the 2004 Science paper that found high-frequency mutations of PIK3CA in human cancers, the work behind the PI3K-alpha inhibitors alpelisib and inavolisib and behind the E542K, E545K and H1047R hotspots that OnCo records on the PIK3CA page. Her laboratory at the Weizmann Institute now works on melanoma genomics and on the immunopeptidome: which mutated and non-canonical peptides a tumour actually displays on its MHC molecules, how intratumour heterogeneity across genetic, transcriptional and immunopeptidomic layers limits immunotherapy, and how translational recoding creates antigens that were never in the genome. That work sits directly under the neoantigen vaccine and adoptive cell therapy programmes at Sheba and elsewhere in Israel.",
    profiles: [{ label: "Samuels laboratory, Weizmann Institute", url: "https://www.weizmann.ac.il/molgen/Samuels/" }, pm("Samuels Y[Author] melanoma Weizmann")],
    papers: [
      { title: "High frequency of mutations of the PIK3CA gene in human cancers", journal: "Science", year: 2004, doi: "10.1126/science.1096502" },
      { title: "Mapping intratumor heterogeneity across layers for advancing immunotherapy", journal: "Cell", year: 2026, doi: "10.1016/j.cell.2026.03.025" },
      { title: "Translational recoding in tumors", journal: "Cold Spring Harbor Perspectives in Biology", year: 2026, doi: "10.1101/cshperspect.a041869" },
    ],
    cancers: ["melanoma"], targets: ["pik3ca"], terms: ["neoantigen"], technologies: ["neoantigen-mrna-vaccine", "til-therapy"], sections: ["immunotherapy", "drug-discovery"],
    tags: ["scientist", "genomics", "immunology"] }),

  p({ id: "yosef-yarden", name: "Yosef Yarden", role: "Professor, Department of Immunology and Regenerative Biology, Weizmann Institute of Science", institutionId: "weizmann", institutions: ["weizmann"],
    specialisms: ["ErbB/HER receptor signalling", "EGFR biology", "Antibody combinations", "Resistance to targeted therapy"],
    tldr: "One of the people who worked out what the HER family of receptors does and how antibodies against them behave, including why combining two antibodies against the same receptor works better than either alone.",
    summary: "Yosef Yarden's laboratory at the Weizmann Institute has spent four decades on the ErbB/HER receptor family: how EGFR and HER2 dimerise and signal, how the cell shuts them down, and how tumours escape drugs aimed at them. With Michael Sela he published a long series showing that pairs of antibodies against distinct epitopes of the same receptor outperform either alone, by driving receptor endocytosis and ubiquitination, including the 2009 PNAS paper on persistent elimination of HER2-overexpressing tumours. That is mechanistic evidence convergent with the clinical pairing of trastuzumab and pertuzumab, not a documented causal path to it, and this record does not claim more. His recent reviews trace how resistance to EGFR inhibitors in lung cancer emerges and how it might be pre-empted, and he also publishes on endocrine resistance in breast cancer and androgen-receptor resistance in prostate cancer.",
    profiles: [{ label: "Yarden laboratory, Weizmann Institute", url: "https://www.weizmann.ac.il/Biological_Regulation/Yarden/" }, pm("Yarden Y[Author] Weizmann EGFR")],
    papers: [
      { title: "Persistent elimination of ErbB-2/HER2-overexpressing tumors using combinations of monoclonal antibodies: relevance of receptor endocytosis", journal: "Proceedings of the National Academy of Sciences", year: 2009, doi: "10.1073/pnas.0812059106", note: "Ben-Kasus T, Schechter B, Lavi S, Yarden Y, Sela M." },
      { title: "Targeting EGFR in lung cancer: lessons in signal transduction and treatment-induced mechanisms of resistance", year: 2026, note: "Weizmann Institute of Science affiliation; indexed on Europe PMC" },
      { title: "TMPRSS2-ERG confers resistance of prostate cancer to antiandrogens", year: 2026, note: "Weizmann Institute of Science affiliation; indexed on Europe PMC" },
    ],
    targets: ["egfr", "her2"], cancers: ["breast-her2-positive", "nsclc"], technologies: ["monoclonal-antibody"], sections: ["targeted-therapy", "drug-discovery"],
    tags: ["scientist", "cancer-biology"] }),

  p({ id: "moshe-oren", name: "Moshe Oren", role: "Professor, Department of Molecular Cell Biology, Weizmann Institute of Science", institutionId: "weizmann", institutions: ["weizmann"],
    specialisms: ["p53 biology", "Mutant p53 gain of function", "Tumour suppression", "Cancer cell plasticity"],
    tldr: "Cloned p53 and then spent a career on what it does. The field's first reading of his own 1984 result, that p53 was an oncogene, turned out to be wrong, and the correction is the better story.",
    summary: "Moshe Oren cloned the p53 gene at the start of the 1980s with David Givol and Arnold Levine, and his laboratory at the Weizmann Institute has worked on it ever since, with Varda Rotter's group alongside. The two groups published back to back in the same issue of Nature in 1984, on pages 646 and 649, showing that p53 cooperates with ras to transform cells, and both read it at the time as an oncogene. It took until the end of that decade for the field to re-read the result: the clones in hand were mutant, and wild-type p53 is a tumour suppressor. That reversal is worth stating plainly rather than tidying away, because what followed from it is the modern position that mutant p53 does not merely lose the old function but acquires new and harmful ones, which is why mutant-p53 reactivators and selective degraders are a drug class at all. Oren's recent work is on how p53 restrains stemness by controlling histone modifiers.",
    profiles: [{ label: "Oren laboratory, Weizmann Institute", url: "https://www.weizmann.ac.il/mcb/oren/" }, pm("Oren M[Author] p53 Weizmann")],
    papers: [
      { title: "Participation of p53 cellular tumour antigen in transformation of normal embryonic cells", journal: "Nature", year: 1984, doi: "10.1038/312646a0", note: "Eliyahu D, Raz A, Gruss P, Givol D, Oren M. Published back to back with Parada, Land, Weinberg, Wolf and Rotter on pages 646 and 649 of the same issue." },
      { title: "Molecular cloning of a cDNA specific for the murine p53 cellular tumor antigen", journal: "Proceedings of the National Academy of Sciences", year: 1983, note: "Oren M, Levine AJ. PMID 6296874." },
      { title: "p53 regulates the expression of histone modifiers to restrict stemness and maintain differentiation", year: 2025, note: "Department of Molecular Cell Biology, Weizmann Institute of Science; indexed on Europe PMC" },
    ],
    targets: ["tp53"], sections: ["drug-discovery"], technologies: ["protac-degrader"],
    tags: ["scientist", "cancer-biology"] }),

  // ---------------------------------------------------------------- Technion
  p({ id: "aaron-ciechanover", wikipedia: "https://en.wikipedia.org/wiki/Aaron_Ciechanover", name: "Aaron Ciechanover", role: "Distinguished Research Professor, Rappaport-Technion Integrated Cancer Center and Rappaport Faculty of Medicine, Technion", institutionId: "technion", institutions: ["technion", "rambam"],
    specialisms: ["Ubiquitin-proteasome system", "Protein degradation", "Targeted protein degradation", "Cancer biochemistry"],
    tldr: "Shared the 2004 Nobel Prize in Chemistry for discovering how cells label proteins for destruction. That labelling system is what proteasome inhibitors block and what every protein degrader hijacks.",
    summary: "Aaron Ciechanover, with Avram Hershko at the Technion and Irwin Rose at the Fox Chase Cancer Center, discovered ubiquitin-mediated protein degradation: the cell tags a protein with a chain of ubiquitin molecules and the proteasome then destroys it. The three shared the 2004 Nobel Prize in Chemistry, one third each, \"for the discovery of ubiquitin-mediated protein degradation\". The clinical consequences are direct. Blocking the proteasome kills myeloma cells, which is what bortezomib and carfilzomib do. Redirecting the tagging machinery at a protein of choice is what PROTACs and molecular glues do, and it is how drugs are now being made against targets long called undruggable. Ciechanover continues to publish from the Rappaport-Technion Integrated Cancer Center on the ubiquitin-proteasome system in cancer and on degrader technology in myeloma and lymphoma.",
    profiles: [{ label: "Technion", url: "https://www.technion.ac.il/en/" }, { label: "Nobel Prize in Chemistry 2004", url: "https://api.nobelprize.org/2.1/nobelPrize/che/2004" }, pm("Ciechanover A[Author]")],
    papers: [
      { title: "The landscape of the ubiquitin-proteasome system in cancer", year: 2026, note: "Rappaport Faculty of Medicine, Technion; indexed on Europe PMC" },
      { title: "Proteolysis targeting chimeric-based technology in myeloma and lymphoma", year: 2026, note: "Department of Cell Biology and Cancer Science, Rappaport Faculty of Medicine, Technion; indexed on Europe PMC" },
    ],
    drugs: ["bortezomib", "carfilzomib"], technologies: ["protac-degrader", "molecular-glue-platforms"], cancers: ["multiple-myeloma"], sections: ["drug-discovery", "targeted-therapy"],
    tags: ["scientist", "nobel-laureate", "cancer-biology"] }),

  p({ id: "avram-hershko", wikipedia: "https://en.wikipedia.org/wiki/Avram_Hershko", name: "Avram Hershko", role: "Distinguished Professor, Department of Biochemistry, Rappaport Faculty of Medicine, Technion", institutionId: "technion", institutions: ["technion"],
    specialisms: ["Ubiquitin-proteasome system", "Cell cycle regulation", "Anaphase-promoting complex", "Biochemistry"],
    tldr: "Shared the 2004 Nobel Prize in Chemistry for the discovery of ubiquitin-mediated protein degradation, and still works on how the machinery that destroys proteins controls cell division.",
    summary: "Avram Hershko, with his then doctoral student Aaron Ciechanover and with Irwin Rose, showed in the late 1970s and early 1980s that cells destroy proteins in an energy-dependent, highly selective way by tagging them with ubiquitin. The three shared the 2004 Nobel Prize in Chemistry, one third each. Hershko's later work, still published from the Department of Biochemistry at the Technion's Rappaport Faculty of Medicine, is on the anaphase-promoting complex and the mitotic checkpoint: how the ubiquitylation of Cdc20 is controlled, how the mitotic checkpoint complex is disassembled, and therefore how a cell decides it is safe to divide. That is the biology every mitotic checkpoint and APC/C-directed drug programme rests on.",
    profiles: [{ label: "Technion", url: "https://www.technion.ac.il/en/" }, { label: "Nobel Prize in Chemistry 2004", url: "https://api.nobelprize.org/2.1/nobelPrize/che/2004" }, pm("Hershko A[Author] ubiquitin")],
    papers: [
      { title: "Mechanisms of ubiquitylation of the mitotic regulatory protein Cdc20", year: 2026, note: "Department of Biochemistry, Rappaport Faculty of Medicine, Technion; indexed on Europe PMC" },
      { title: "Role of ubiquitin-protein ligase UBR5 in the disassembly of mitotic checkpoint complexes", year: 2022, note: "Department of Biochemistry, Rappaport Faculty of Medicine, Technion; indexed on Europe PMC" },
    ],
    drugs: ["bortezomib"], technologies: ["protac-degrader"], sections: ["drug-discovery"],
    tags: ["scientist", "nobel-laureate", "cancer-biology"] }),

  // ---------------------------------------------------------------- Hebrew University and Shaare Zedek
  p({ id: "yechezkel-barenholz", name: "Yechezkel Barenholz", role: "Professor, Laboratory of Membrane and Liposome Research, Hebrew University-Hadassah Medical School", institutionId: "hebrew-university-of-jerusalem", institutions: ["hebrew-university-of-jerusalem", "hadassah"],
    specialisms: ["Liposome science", "Nanomedicine", "Drug delivery", "PEGylation"],
    tldr: "Invented the chemistry that made Doxil work, the first nanomedicine any regulator approved, which is still a standard treatment for relapsed ovarian cancer three decades later.",
    summary: "Yechezkel Barenholz's Laboratory of Membrane and Liposome Research at the Hebrew University-Hadassah Medical School devised the pegylated liposomal formulation of doxorubicin approved by the FDA in 1995 as Doxil, the first nano-drug approved anywhere. His own account in Journal of Controlled Release identifies three unrelated principles that had to work together: a polyethylene-glycol coat that keeps the liposome in circulation and away from the reticuloendothelial system, high and stable remote loading of doxorubicin driven by a transmembrane ammonium sulfate gradient that also allows release at the tumour, and a lipid bilayer held in a liquid-ordered phase by a high-melting phosphatidylcholine with cholesterol. The clinical effect is that hand-foot syndrome and mucositis replace the hair loss and heart damage of free doxorubicin. Barenholz's laboratory still publishes on liposome and PEGylation chemistry.",
    profiles: [{ label: "Laboratory of Membrane and Liposome Research, Hebrew University", url: "https://medicine.ekmd.huji.ac.il/en/research/yechezkelb/Pages/default.aspx" }, pm("Barenholz Y[Author] liposome")],
    papers: [
      { title: "Doxil, the first FDA-approved nano-drug: lessons learned", journal: "Journal of Controlled Release", year: 2012, doi: "10.1016/j.jconrel.2012.03.020" },
      { title: "PEGylation technology: addressing concerns, moving forward", year: 2025, note: "Hebrew University-Hadassah Medical School; indexed on Europe PMC" },
    ],
    drugs: ["pegylated-liposomal-doxorubicin", "doxorubicin"], cancers: ["ovarian", "kaposi-sarcoma"], sections: ["drug-discovery", "chemotherapy"],
    tags: ["scientist", "drug-delivery"] }),

  p({ id: "ephrat-levy-lahad", orcid: "0000-0003-0917-8863", name: "Ephrat Levy-Lahad", role: "Director, Medical Genetics Institute, Shaare Zedek Medical Center; professor, Hebrew University-Hadassah Medical School", institutionId: "shaare-zedek", institutions: ["shaare-zedek", "hebrew-university-of-jerusalem"],
    specialisms: ["Cancer genetics", "BRCA1 and BRCA2", "Population genetic screening", "Genetic counselling"],
    tldr: "Produced the evidence that made Israel the first country to offer BRCA testing to a whole population group, by measuring cancer risk in carriers found through healthy men rather than through cancer clinics.",
    summary: "Ephrat Levy-Lahad directs the Medical Genetics Institute at Shaare Zedek Medical Center. With Mary-Claire King she designed the study that answered the objection to population BRCA screening: that risk estimates from families referred to cancer clinics cannot be applied to people found at random. Gabai-Kapara and colleagues genotyped 8,195 healthy Ashkenazi Israeli men, found 2.17 percent carrying one of the three founder variants, then enrolled their female relatives. Cumulative risk of breast or ovarian cancer by age 80 was 0.83 for BRCA1 carriers and 0.76 for BRCA2 carriers, and 51 percent of the 167 carrier families had little or no relevant cancer history, so family-history criteria would have missed them. Israel made founder testing available to every woman of Ashkenazi origin in January 2020. Levy-Lahad's group has since published on how the programme performs in practice, comparing carriers found by population screening with those found through oncogenetics clinics, and on long-read sequencing in the diagnostic laboratory.",
    profiles: [{ label: "Shaare Zedek Medical Center, Medical Genetics Institute", url: "https://www.szmc.org.il/eng/" }, pm("Levy-Lahad E[Author] BRCA")],
    papers: [
      { title: "Population-based screening for breast and ovarian cancer risk due to BRCA1 and BRCA2", journal: "Proceedings of the National Academy of Sciences", year: 2014, doi: "10.1073/pnas.1415979111" },
      { title: "Comparative analysis of BRCA pathogenic variant detection in a real-world setting: population screening versus oncogenetic clinics", journal: "JCO Precision Oncology", year: 2026, doi: "10.1200/po-25-01023" },
    ],
    keyPapers: ["paper-gabai-kapara-population-brca-screening-pnas-2014"],
    targets: ["brca"], cancers: ["breast-hr-positive", "ovarian"], technologies: ["germline-testing"], terms: ["founder-variant"], sections: ["prevention", "diagnostics"], bottlenecks: ["b-hereditary-risk"],
    tags: ["clinician-scientist", "genetics", "prevention"] }),

  p({ id: "rachel-michaelson-cohen", name: "Rachel Michaelson-Cohen", role: "Gynaecologist and medical geneticist, Shaare Zedek Medical Center; chair of the Israeli Consortium harmonising national BRCA carrier care", institutionId: "shaare-zedek", institutions: ["shaare-zedek"],
    specialisms: ["Hereditary breast and ovarian cancer", "Risk-reducing surgery", "Health policy", "Genetic counselling"],
    tldr: "Led the work of turning nine Israeli high-risk clinics, which were each doing something different, into one national protocol for looking after the carriers the screening programme keeps finding.",
    summary: "Rachel Michaelson-Cohen works at Shaare Zedek Medical Center on hereditary breast and ovarian cancer. When Israel began offering BRCA founder testing to all women of Ashkenazi origin in 2020, the number of healthy carriers referred to high-risk surveillance clinics rose sharply and the clinics turned out to disagree with one another: only one offered six-monthly MRI to BRCA1 carriers, five continued surveillance past 75, and one recommended none during pregnancy and breastfeeding. She led the comparative analysis of all nine clinics in the Israeli Consortium for hereditary breast and ovarian cancer and the consensus process that produced a single national protocol, published in Israel Journal of Health Policy Research: annual MRI from 25, mammography added from 30, risk-reducing salpingo-oophorectomy at 35 to 40 for BRCA1 and 40 to 45 for BRCA2, pancreatic surveillance from 50 for BRCA2 carriers, and no ovarian screening after surgery. Her group also published the Israeli cost-effectiveness analysis behind the screening policy.",
    profiles: [{ label: "Shaare Zedek Medical Center", url: "https://www.szmc.org.il/eng/" }, pm("Michaelson-Cohen R[Author] BRCA")],
    papers: [
      { title: "Managing healthcare for female BRCA carriers in the population screening era: developing a harmonized national policy for surveillance and risk-reduction", journal: "Israel Journal of Health Policy Research", year: 2026, doi: "10.1186/s13584-026-00746-3" },
      { title: "Real-world cost-effectiveness of population-based BRCA screening in Israel", journal: "Cancers", year: 2022, doi: "10.3390/cancers14246113" },
    ],
    targets: ["brca"], cancers: ["breast-hr-positive", "ovarian", "pancreatic"], technologies: ["germline-testing"], terms: ["founder-variant"], sections: ["prevention"], bottlenecks: ["b-hereditary-risk"],
    tags: ["clinician-scientist", "genetics", "policy"] }),

  // ---------------------------------------------------------------- Sheba, Hadassah, Rabin
  p({ id: "eitan-friedman", name: "Eitan Friedman", role: "Oncogeneticist, Meirav High Risk Clinic, Sheba Medical Center; professor, Gray Faculty of Medical and Health Sciences, Tel Aviv University", institutionId: "sheba", institutions: ["sheba", "tel-aviv-university"],
    specialisms: ["Cancer genetics", "BRCA founder variants", "Non-Ashkenazi Jewish and Arab cancer genetics", "High-risk surveillance"],
    tldr: "Mapped which inherited cancer variants recur in which Israeli communities, and showed that outside the Ashkenazi founder panel there is no shortcut: you have to sequence.",
    summary: "Eitan Friedman's oncogenetics work at Sheba Medical Center's Meirav clinic is the systematic survey of what inherited cancer risk looks like across Israel's communities. With Laitman and colleagues he genotyped high-risk Ashkenazi, Balkan, North African, Yemenite and Asian (Iraqi and Iranian) Jews and found community-specific recurring variants: BRCA1 Tyr978X in 23 of 892 people of Iraqi and Iranian origin, BRCA1 c.981delAT in 7 of 264 of North African origin, BRCA1 A1708E in 8 of 282 of Balkan origin. The same group's study of 250 ethnically diverse high-risk Israeli families, screened after the common Jewish founders were excluded, found 19 different pathogenic BRCA1/2 variants and concluded that there are no predominant recurring variants across these populations, which is the argument for sequencing rather than a founder panel outside the Ashkenazi population. His recent work covers hormone therapy after oophorectomy, prostate screening in male carriers and breast surveillance in young carriers.",
    profiles: [{ label: "Sheba Medical Center", url: "https://www.shebaonline.org" }, pm("Friedman E[Author] BRCA Sheba")],
    papers: [
      { title: "Germline mutations in BRCA1 and BRCA2 genes in ethnically diverse high risk families in Israel", journal: "Breast Cancer Research and Treatment", year: 2011, doi: "10.1007/s10549-010-1217-0" },
      { title: "Recurring founder mutations in BRCA1 and BRCA2 in ethnically diverse Jewish populations", journal: "Breast Cancer Research and Treatment", year: 2012, doi: "10.1007/s10549-012-2006-8" },
    ],
    targets: ["brca"], cancers: ["breast-hr-positive", "ovarian"], technologies: ["germline-testing"], terms: ["founder-variant"], sections: ["prevention", "diagnostics"], bottlenecks: ["b-hereditary-risk"],
    tags: ["clinician-scientist", "genetics"] }),

  p({ id: "jacob-schachter", name: "Jacob Schachter", role: "Director, Ella Lemelbaum Institute for Immuno-Oncology and Melanoma, Sheba Medical Center", institutionId: "sheba", institutions: ["sheba", "tel-aviv-university"],
    specialisms: ["Melanoma", "Immunotherapy", "Adoptive cell therapy", "Clinical trials"],
    tldr: "Built the melanoma and immunotherapy institute at Sheba that has been growing patients' own tumour-infiltrating lymphocytes and giving them back since 2006, more than a decade before any regulator approved the idea.",
    summary: "Jacob Schachter directs the Ella Lemelbaum Institute for Immuno-Oncology and Melanoma at Sheba Medical Center, one of very few centres outside the United States to run a tumour-infiltrating lymphocyte programme at scale and for long enough to report durable outcomes. The institute's intent-to-treat analysis, published in Clinical Cancer Research with Michal Besser as first author, enrolled 80 patients with stage IV melanoma and treated 57 with unselected or \"young\" TIL and high-dose interleukin-2 after non-myeloablative lymphodepletion. The overall response rate was 29 percent for all enrolled patients and 40 percent for those treated, with five complete and 18 partial remissions; all complete responders remained in unmaintained remission at a median 28 months and three-year survival among responders was 78 percent. Twenty-three patients could not be treated, mostly because they deteriorated while the cells were being grown, which is the honest cost of a three-week manufacturing step. Schachter has also been an investigator on the pivotal pembrolizumab melanoma trials.",
    profiles: [{ label: "Ella Lemelbaum Institute, Sheba Medical Center", url: "https://www.shebaonline.org/departments/cancer-center/" }, pm("Schachter J[Author] melanoma Sheba")],
    papers: [
      { title: "Adoptive transfer of tumor-infiltrating lymphocytes in patients with metastatic melanoma: intent-to-treat analysis and efficacy after failure to prior immunotherapies", journal: "Clinical Cancer Research", year: 2013, doi: "10.1158/1078-0432.ccr-13-0380" },
      { title: "Pembrolizumab versus ipilimumab in advanced melanoma (KEYNOTE-006): post-hoc 5-year results", journal: "The Lancet", year: 2017, doi: "10.1016/S0140-6736(17)31601-X" },
    ],
    cancers: ["melanoma"], technologies: ["til-therapy", "checkpoint-inhibitor"], drugs: ["pembrolizumab"], sections: ["cell-therapy", "immunotherapy"], bottlenecks: ["b-manufacturing-cell-therapy"],
    tags: ["clinician-scientist", "immunotherapy"] }),

  p({ id: "michal-besser", name: "Michal Besser", role: "Head of the Ella Lemelbaum Institute cell therapy laboratory, Sheba Medical Center; Gray Faculty of Medical and Health Sciences, Tel Aviv University", institutionId: "sheba", institutions: ["sheba", "tel-aviv-university"],
    specialisms: ["Tumour-infiltrating lymphocytes", "Adoptive cell therapy", "T-cell manufacturing", "Genetic modification of T cells"],
    tldr: "Runs the laboratory that actually grows the cells. Her papers are the reason anyone outside the United States believed a hospital could manufacture tumour-infiltrating lymphocytes reliably.",
    summary: "Michal Besser leads cell therapy laboratory work at Sheba's Ella Lemelbaum Institute and is first author of its intent-to-treat report on tumour-infiltrating lymphocyte therapy in metastatic melanoma, which found blood lactate dehydrogenase, sex, days in culture and the number of infused CD8-positive cells to be independent predictors of outcome. Her laboratory has published the practical protocols that others copy: how to establish and expand TIL cultures, how to transduce them retrovirally with a chimeric antigen receptor or a T-cell receptor, and how microRNA expression in the infused product tracks with response. Work of this kind is why a small country with one dominant referral centre can run a cell therapy programme that larger health systems find hard to reproduce.",
    profiles: [{ label: "Sheba Medical Center cancer centre", url: "https://www.shebaonline.org/departments/cancer-center/" }, pm("Besser MJ[Author] tumor-infiltrating lymphocytes")],
    papers: [
      { title: "Adoptive transfer of tumor-infiltrating lymphocytes in patients with metastatic melanoma: intent-to-treat analysis and efficacy after failure to prior immunotherapies", journal: "Clinical Cancer Research", year: 2013, doi: "10.1158/1078-0432.ccr-13-0380" },
      { title: "Genetic modification of tumor-infiltrating lymphocytes via retroviral transduction", journal: "Frontiers in Immunology", year: 2020, doi: "10.3389/fimmu.2020.584148" },
    ],
    keyPapers: ["paper-besser-til-melanoma-intent-to-treat-ccr-2013"],
    cancers: ["melanoma"], technologies: ["til-therapy", "car-t"], sections: ["cell-therapy"], bottlenecks: ["b-manufacturing-cell-therapy"],
    tags: ["scientist", "cell-therapy"] }),

  p({ id: "gal-markel", name: "Gal Markel", role: "Director, Skin Cancer and Melanoma Center, Davidoff Cancer Center, Rabin Medical Center; Gray Faculty of Medical and Health Sciences, Tel Aviv University", institutionId: "rabin-davidoff-center", institutions: ["rabin-davidoff-center", "sheba", "tel-aviv-university"],
    specialisms: ["Melanoma", "Tumour immunology", "Checkpoint inhibitors", "Real-world outcomes"],
    tldr: "A tumour immunologist who helped build Israel's melanoma cell therapy programme at Sheba and now runs the melanoma centre at Davidoff, publishing what checkpoint drugs do outside the clean conditions of a trial.",
    summary: "Gal Markel was part of the group at Sheba's Ella Lemelbaum Institute that established tumour-infiltrating lymphocyte therapy in Israel, and now directs the Skin Cancer and Melanoma Center at the Davidoff Cancer Center, Rabin Medical Center, with an appointment in clinical microbiology and immunology at Tel Aviv University. His recent published work is largely real-world: outcomes of dual checkpoint blockade with nivolumab and ipilimumab outside trial populations, PD-1 inhibitors in cutaneous squamous cell carcinoma in organ transplant recipients, and body-composition measurements from routine computed tomography as a predictor of survival on immunotherapy. He was also an investigator on the adjuvant vibostolimab and pembrolizumab melanoma trial.",
    profiles: [{ label: "Davidoff Cancer Center, Rabin Medical Center", url: "https://hospitals.clalit.co.il/rabin" }, pm("Markel G[Author] melanoma")],
    papers: [
      { title: "Dual checkpoint blockade beyond clinical trials: real-world experience with nivolumab and ipilimumab", year: 2026, note: "Skin Cancer and Melanoma Center, Davidoff Cancer Center, Rabin Medical Center; indexed on Europe PMC" },
      { title: "Adoptive transfer of tumor-infiltrating lymphocytes in patients with metastatic melanoma: intent-to-treat analysis", journal: "Clinical Cancer Research", year: 2013, doi: "10.1158/1078-0432.ccr-13-0380" },
    ],
    cancers: ["melanoma"], technologies: ["til-therapy", "checkpoint-inhibitor"], sections: ["immunotherapy"],
    tags: ["clinician-scientist", "immunotherapy"] }),

  p({ id: "polina-stepensky", name: "Polina Stepensky", role: "Director, Department of Bone Marrow Transplantation and Cancer Immunotherapy, Hadassah Medical Center", institutionId: "hadassah", institutions: ["hadassah", "hebrew-university-of-jerusalem"],
    specialisms: ["Haematopoietic stem cell transplantation", "Academic CAR-T manufacture", "Multiple myeloma", "Paediatric immunology"],
    tldr: "Runs a hospital department that makes its own CAR-T cells and gives them fresh, without freezing, at a fraction of what a commercial product costs.",
    summary: "Polina Stepensky directs bone marrow transplantation and cancer immunotherapy at Hadassah Medical Center, which manufactures its own chimeric antigen receptor T cells on site. Its anti-BCMA product HBI0101, later licensed as NXC-201, was given fresh without cryopreservation in a phase 1 dose-escalation study (NCT04720313). The first 20 heavily pretreated patients with relapsed or refractory multiple myeloma, reported in Haematologica in 2023, had an overall response rate of 75 percent with stringent or complete response in half, cytokine release syndrome only at grade 1 or 2 in 90 percent, and no neurotoxicity of any grade. The programme has since grown: a 2025 report in Cancers analyses coagulopathy in 108 patients treated on the same single-centre trial. The point of the work is not only the product but the model, that a hospital can make cell therapy for its own region rather than shipping cells across continents.",
    profiles: [{ label: "Hadassah Medical Center", url: "https://www.hadassah.org.il/en/" }, pm("Stepensky P[Author] CAR")],
    papers: [
      { title: "Development and manufacture of novel locally produced anti-BCMA CAR T cells for the treatment of relapsed/refractory multiple myeloma: results from a phase I clinical trial (HBI0101)", journal: "Haematologica", year: 2023, doi: "10.3324/haematol.2022.281628" },
      { title: "High rate of cytokine release syndrome-related coagulopathy with low incidence of bleeding and thrombosis in patients treated with BCMA-targeted CAR-T", journal: "Cancers", year: 2025, doi: "10.3390/cancers17213551" },
    ],
    cancers: ["multiple-myeloma", "dlbcl"], technologies: ["car-t", "allogeneic-cell-therapy"], targets: ["bcma", "cd19"], trials: ["nxc-201-mm"], sections: ["cell-therapy"], bottlenecks: ["b-manufacturing-cell-therapy"],
    tags: ["clinician-scientist", "cell-therapy"] }),

  p({ id: "alberto-gabizon", name: "Alberto Gabizon", role: "Oncologist, Shaare Zedek Medical Center; professor, Hebrew University-Hadassah Medical School", institutionId: "shaare-zedek", institutions: ["shaare-zedek", "hebrew-university-of-jerusalem"],
    specialisms: ["Liposomal drug delivery", "Pharmacokinetics of nanomedicines", "Ovarian and breast cancer", "Early-phase trials"],
    tldr: "The clinician half of the partnership that turned a liposome chemistry idea into Doxil, and the person who did the trials that showed it behaved differently in patients from free doxorubicin.",
    summary: "Alberto Gabizon worked with Yechezkel Barenholz at the Hebrew University on pegylated liposomal doxorubicin and then took it into patients, establishing the pharmacokinetics that distinguish it from free doxorubicin: a long circulation half-life, accumulation in tumour tissue, and a toxicity profile in which hand-foot syndrome and mucositis replace alopecia and cardiac damage. The product was approved by the FDA in 1995 and remains standard in relapsed ovarian cancer, used as a single agent or with carboplatin, trabectedin or bevacizumab, and as the comparator arm in modern trials including MIRASOL. He continues to work at Shaare Zedek Medical Center on nanomedicine pharmacology and combination strategies.",
    profiles: [{ label: "Shaare Zedek Medical Center", url: "https://www.szmc.org.il/eng/" }, pm("Gabizon A[Author] liposomal doxorubicin"), epmc("AUTH:\"Gabizon A\" AND liposomal")],
    papers: [
      { title: "Prolonged circulation time and enhanced accumulation in malignant exudates of doxorubicin encapsulated in polyethylene-glycol coated liposomes", journal: "Cancer Research", year: 1994, url: "https://pubmed.ncbi.nlm.nih.gov/8313389/", note: "PMID 8313389. Plasma clearance 0.1 litres per hour for the liposomal form against 45 for free doxorubicin, and a volume of distribution of 4 litres against 254." },
      { title: "Doxil, the first FDA-approved nano-drug: lessons learned", journal: "Journal of Controlled Release", year: 2012, doi: "10.1016/j.jconrel.2012.03.020", note: "Barenholz Y; the retrospective covering the joint programme" },
    ],
    drugs: ["pegylated-liposomal-doxorubicin", "doxorubicin"], cancers: ["ovarian", "kaposi-sarcoma"], sections: ["drug-discovery", "chemotherapy"],
    tags: ["clinician-scientist", "drug-delivery"] }),
];
