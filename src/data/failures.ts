import type { EntityInput } from "@/lib/schema";
import { TRIAL_OUTCOMES } from "./trial-outcomes";

/**
 * The failure museum: drugs, technologies, and trials that did not work, and what each taught.
 * Every entry carries tag "failure" and a "lesson:<category>" tag used to group the /failures/ page:
 *   lesson:wrong-drug        the molecule did not do what it was claimed to do
 *   lesson:wrong-target      the biology did not hold in humans
 *   lesson:phase-2-mirage    an encouraging phase 2 that phase 3 could not reproduce
 *   lesson:toxicity          efficacy present but the therapeutic window was not
 *   lesson:partner-and-biomarker  the combination partner or assay choice decided the outcome
 *   lesson:regulatory        approval logic, confirmatory trials, and withdrawals
 * Integrated into the corpus via src/data/index.ts (spread `failures` into ALL_INPUTS).
 */
const asOf = "2026-09-06";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;

const raw: EntityInput[] = [
  {
    id: "tiragolumab", trials: ["nct05904886", "nct05009069", "nct05805501", "nct04524871", "nct05645692", "nct04665856"], kind: "drug", name: "Tiragolumab", code: "RG6058, MTIG7192A", modality: "Monoclonal antibody (anti-TIGIT)", asOf: "2026-11-18", status: "negative",
    tldr: "An immune-brake blocker that looked excellent in a phase 2 lung cancer trial and then failed its phase 3 trials in lung cancer; one phase 3 in oesophageal cancer was positive, but against chemotherapy alone.",
    summary: "CITYSCAPE (phase 2, 2020) showed tiragolumab plus atezolizumab roughly doubled response rate in PD-L1-positive NSCLC (31.3% versus 16.2%). Phase 3 SKYSCRAPER-01 (PD-L1-high NSCLC) missed PFS and OS; SKYSCRAPER-02 (extensive-stage SCLC) was negative; SKYSCRAPER-06 (non-squamous NSCLC) was worse than control. Roche halted SKYSCRAPER-06 in July 2024. The one positive phase 3, SKYSCRAPER-08 in first-line oesophageal squamous cell carcinoma in Asia, improved survival (OS HR 0.70) against chemotherapy alone, a comparison that cannot separate the effect of tiragolumab from that of atezolizumab. Other anti-TIGIT antibodies (domvanalimab, ociperlimab) showed no clearer benefit.\n\nLesson: a small randomised phase 2 with a surrogate endpoint in a selected population can mislead; redundancy between checkpoints means blocking a second one does not necessarily add to PD-1/PD-L1 blockade.",
    mechanism: "IgG1 anti-TIGIT with intact Fc; blocks TIGIT-PVR interaction on T and NK cells.",
    targets: ["tigit", "pdl1"], technologies: ["checkpoint-inhibitor", "tigit-blockade"], companies: ["roche-genentech"], cancers: ["nsclc", "sclc"], drugs: ["atezolizumab"], related: ["tigit-plus-pd1-caution"],
    tags: ["failure", "lesson:phase-2-mirage"],
    links: [{ label: "Roche SKYSCRAPER-01 final analysis (2024)", url: "https://www.roche.com/media/releases/med-cor-2024-11-26" }],
  },
  {
    id: "magrolimab", kind: "drug", name: "Magrolimab", code: "Hu5F9-G4, GS-4721", modality: "Monoclonal antibody (anti-CD47)", asOf: "2026-11-18", status: "withdrawn",
    tldr: "The first 'don't eat me' signal blocker. Gilead paid $4.9B for it; it was stopped in 2024 after trials showed more deaths, not fewer.",
    summary: "Magrolimab blocks CD47 so macrophages can phagocytose tumour cells. Early single-arm data with azacitidine in TP53-mutant AML and MDS were striking. ENHANCE (higher-risk MDS) and ENHANCE-2 (TP53-mutant AML) were stopped for futility in 2023; ENHANCE-3 (unfit AML) was stopped in February 2024 for futility with an increased risk of death, which Gilead said the primary analyses of the other two trials had also shown; the FDA placed a full clinical hold on all magrolimab studies in MDS and AML. Gilead had acquired Forty Seven for $4.9B in 2020.\n\nLesson: a ubiquitous target (CD47 is on every red cell) plus an immunosuppressed population is a narrow window; single-arm response rates in TP53-mutant disease were not predictive of survival.",
    mechanism: "Humanised IgG4 anti-CD47; blocks the CD47-SIRPα 'don't eat me' signal, enabling macrophage phagocytosis.",
    targets: ["cd47"], technologies: ["monoclonal-antibody", "cd47-blockade"], companies: ["gilead", "forty-seven"], cancers: ["aml"],
    tags: ["failure", "lesson:toxicity"],
    links: [{ label: "Gilead statement on discontinuation of the phase 3 ENHANCE-3 study in AML (7 February 2024)", url: "https://www.gilead.com/company/company-statements/2024/gilead-statement-on-discontinuation-of-phase-3-enhance-3-study-in-aml" }], pathways: ["cd47-sirpa"],
  },
  {
    id: "rovalpituzumab-tesirine", kind: "drug", name: "Rovalpituzumab tesirine", code: "Rova-T, SC16LD6.5", modality: "ADC", asOf, status: "withdrawn", wikipedia: W("Rovalpituzumab_tesirine"),
    tldr: "Rovalpituzumab tesirine (Rova-T) was the first drug against DLL3 in small-cell lung cancer. AbbVie bought it for $5.8B and abandoned it after two failed phase 3 trials. The target later worked with a different weapon.",
    summary: "A DLL3-directed ADC with a PBD dimer payload (DAR ~2). Phase 2 TRINITY showed modest response rates with high toxicity (effusions, oedema, photosensitivity). Phase 3 TAHOE (second line vs topotecan) was stopped for shorter survival in the Rova-T arm; MERU (first-line maintenance) failed. AbbVie ended development in 2019 after the 2016 Stemcentrx acquisition. Tarlatamab, a DLL3×CD3 T-cell engager, later improved survival in the same setting (DeLLphi-304, 2025).\n\nLesson: target validation and modality are separable. DLL3 was the right address; a PBD payload with a narrow window in a frail population was the wrong weapon.",
    mechanism: "Humanised anti-DLL3 with PBD dimer (SC-DR002) via cleavable linker.",
    payload: "PBD dimer (SC-DR002)", linker: "Cleavable dipeptide",
    targets: ["dll3"], technologies: ["adc"], companies: ["abbvie", "stemcentrx"], cancers: ["sclc"], drugs: ["tarlatamab"],
    tags: ["failure", "lesson:wrong-drug"],
    links: [{ label: "TAHOE phase 3 (J Thorac Oncol 2021)", url: "https://www.jto.org/article/S1556-0864(21)02264-5/fulltext" }],
  },
  {
    id: "iniparib", kind: "drug", name: "Iniparib", code: "BSI-201, SAR240550", modality: "Small molecule given by intravenous infusion (claimed PARP inhibitor)", asOf: "2026-11-18", status: "negative", wikipedia: W("Iniparib"),
    tldr: "Billed as the first PARP inhibitor for triple-negative breast cancer, it failed its phase 3 in 2011. It turned out not to inhibit PARP at all.",
    summary: "A randomised phase 2 (O'Shaughnessy, NEJM 2011) in metastatic TNBC showed improved response, PFS, and OS when iniparib was added to gemcitabine-carboplatin. The phase 3 (n=519) missed both co-primary endpoints. Subsequent biochemistry showed iniparib does not trap or inhibit PARP1/2 at clinically relevant concentrations; it acts as a non-specific thiol-reactive compound. Sanofi (which had bought BiPar for up to $500M) discontinued it after a negative phase 3 in squamous NSCLC (2013).\n\nLesson: mechanism claims should be verified before a class label is attached; the true PARP inhibitors (olaparib, talazoparib) later succeeded in BRCA-mutant breast cancer.",
    mechanism: "Originally described as a PARP1 inhibitor; later shown to be a non-selective cysteine-modifying agent without PARP inhibition.",
    targets: ["parp"], technologies: ["parp-inhibitor"], companies: ["sanofi"], cancers: ["tnbc", "nsclc"], drugs: ["olaparib", "talazoparib"],
    tags: ["failure", "lesson:wrong-drug"],
    links: [{ label: "Iniparib is not a PARP inhibitor (Clin Cancer Res 2012)", url: "https://doi.org/10.1158/1078-0432.CCR-11-1973" }, { label: "Phase 3 trial in metastatic triple-negative breast cancer (J Clin Oncol 2014)", url: "https://doi.org/10.1200/JCO.2014.55.2984" }],
  },
  {
    id: "bempegaldesleukin", kind: "drug", name: "Bempegaldesleukin", code: "NKTR-214, bempeg", modality: "Engineered cytokine (PEGylated IL-2)", asOf: "2026-11-18", status: "negative", wikipedia: W("Bempegaldesleukin"),
    tldr: "Bempegaldesleukin was a re-engineered interleukin-2 meant to be a safer version of a famous old immunotherapy. Given with nivolumab, it failed in three trials in 2022, two of them phase 3.",
    summary: "Bempegaldesleukin is a PEGylated IL-2 prodrug biased toward the CD122 receptor to expand CD8 T cells over regulatory T cells. Phase 1/2 PIVOT-02 with nivolumab reported high response rates in melanoma. In 2022 all three trials of the combination failed: the phase 3 PIVOT IO-001 (melanoma) did not improve response, PFS or OS over nivolumab alone; the phase 3 PIVOT-09 (RCC) did not improve response or OS over sunitinib or cabozantinib; and the single-arm phase 2 PIVOT-10 (urothelial) missed its response threshold. BMS and Nektar ended the development programme (BMS had paid $1.85B upfront in 2018).\n\nLesson: single-arm combination response rates in melanoma are unreliable because nivolumab alone already produces them; biological rationale (Treg sparing) did not translate.",
    mechanism: "IL-2 with releasable PEG chains; preferential CD122 (IL-2Rβγ) engagement.",
    technologies: ["cytokine-therapy"], companies: ["bms", "nektar-therapeutics"], cancers: ["melanoma", "rcc", "urothelial"], drugs: ["nivolumab"],
    tags: ["failure", "lesson:phase-2-mirage"],
    links: [{ label: "PIVOT IO-001 (J Clin Oncol 2023)", url: "https://ascopubs.org/doi/10.1200/JCO.23.00172" }],
  },
  {
    id: "adu-s100", kind: "drug", name: "ADU-S100 (MIW815)", code: "ADU-S100", modality: "Small molecule (STING agonist, intratumoural)", asOf: "2026-11-18", status: "withdrawn",
    tldr: "ADU-S100 was a STING agonist injected directly into tumours. In phase 1 it produced few responses, alone or with a PD-1 antibody, and all three of its registered trials were stopped early.",
    summary: "A cyclic dinucleotide STING agonist from Aduro (partnered with Novartis). In its first-in-human phase 1 trial, 47 patients had weekly injections into a tumour and one had a confirmed partial response (Clinical Cancer Research 2022). Combined with the PD-1 antibody spartalizumab in 106 patients, the overall response rate was 10.4%, which the authors described as minimal anti-tumour responses (Clinical Cancer Research 2023). All three registered trials were terminated: the two Aduro trials, with or without ipilimumab and with pembrolizumab in head and neck cancer, give the reason as no substantial anti-tumour activity, and the Novartis trial with spartalizumab gives a sponsor's decision. Novartis returned rights in 2019 and Aduro discontinued the programme in 2020; these two dates were not re-verified on 18 November 2026. Merck's MK-1454 followed the same path. The pathway remains important (it mediates immune effects of radiation and ADCs), and systemic and antibody-conjugated STING agonists continue.\n\nLesson: intratumoural delivery to one lesion rarely produces systemic immunity in humans as it does in mice; pharmacology (rapid clearance, dosing) matters as much as the target.",
    mechanism: "Synthetic cyclic dinucleotide activating STING → TBK1 → IRF3 → type I interferon.",
    pathways: ["cgas-sting"], technologies: ["sting-agonist"], companies: ["novartis"], cancers: ["melanoma", "head-and-neck"],
    tags: ["failure", "lesson:wrong-drug"],
    links: [{ label: "ADU-S100 first-in-human phase 1 (Clinical Cancer Research 2022)", url: "https://doi.org/10.1158/1078-0432.CCR-21-1963" }, { label: "ADU-S100 with spartalizumab, phase 1b (Clinical Cancer Research 2023)", url: "https://doi.org/10.1158/1078-0432.CCR-22-2235" }],
  },
  {
    id: "eprenetapopt", companies: ["aprea-therapeutics"], kind: "drug", name: "Eprenetapopt", code: "APR-246", modality: "Small molecule (p53 reactivator)", asOf: "2026-11-18", status: "negative", wikipedia: W("Eprenetapopt"),
    tldr: "Eprenetapopt (APR-246) was a drug meant to refold mutant p53, the most common broken protein in cancer. Its phase 3 in blood cancer failed in 2020.",
    summary: "Eprenetapopt (APR-246) is a prodrug of methylene quinuclidinone, proposed to covalently modify mutant p53 and restore wild-type conformation. Phase 2 with azacitidine in TP53-mutant MDS reported ~50% complete remission. The phase 3 (n=154) missed its primary endpoint of complete remission rate in 2020 (33% vs 22%, not significant). Aprea pivoted away. Subsequent studies suggest much of the activity reflected glutathione depletion and oxidative stress rather than p53 refolding.\n\nLesson: TP53 remains undrugged by direct reactivation; the field moved to mutation-specific correctors (rezatapopt for Y220C) and to exploiting p53-loss dependencies (WEE1, ATR).",
    mechanism: "Converted to MQ, which alkylates cysteines in mutant p53 (claimed) and depletes glutathione.",
    targets: ["tp53"], cancers: ["aml"], pathways: ["p53-cell-cycle"],
    tags: ["failure", "lesson:wrong-target"],
    links: [{ label: "Aprea phase 3 topline (Dec 2020)", url: "https://www.globenewswire.com/news-release/2020/12/28/2150865/0/en/Aprea-Therapeutics-Announces-Results-of-Primary-Endpoint-from-Phase-3-Trial-of-Eprenetapopt-in-TP53-Mutant-Myelodysplastic-Syndromes-MDS.html" }],
  },
  {
    id: "tusamitamab-ravtansine", kind: "drug", name: "Tusamitamab ravtansine", code: "SAR408701", modality: "ADC", asOf: "2026-11-18", status: "withdrawn",
    tldr: "Tusamitamab ravtansine was Sanofi's ADC against the classic CEA tumour marker, dropped in 2023 after it failed to slow lung cancer for longer than docetaxel in a phase 3 trial.",
    summary: "A CEACAM5-directed ADC with a DM4 maytansinoid payload. Phase 3 CARMEN-LC03 (vs docetaxel in previously treated CEACAM5-high non-squamous NSCLC) did not meet its progression-free survival endpoint, and on 21 December 2023 Sanofi announced it was ending the whole programme. The results posted on ClinicalTrials.gov give a median PFS of 5.4 months with tusamitamab ravtansine against 5.9 months with docetaxel (hazard ratio 1.14, 95% CI 0.86 to 1.51) and a median OS of 12.8 against 11.5 months (hazard ratio 0.85, 95% CI 0.64 to 1.11): a trend in survival that Sanofi noted but that was not statistically significant. The registry records the trial as terminated by sponsor decision, not for a safety concern.\n\nLesson: a tubulin-inhibitor payload at an average drug-to-antibody ratio of about 4 did not beat docetaxel here, while TOP1-payload ADCs were setting the bar in lung cancer; Sanofi said it would go on exploring CEACAM5 with other tusamitamab-based ADCs.",
    mechanism: "Humanised anti-CEACAM5 IgG1 with DM4 via cleavable SPDB linker.",
    payload: "DM4 (ravtansine)", linker: "SPDB disulfide",
    targets: ["ceacam5"], technologies: ["adc"], companies: ["sanofi"], cancers: ["nsclc"],
    tags: ["failure", "lesson:wrong-drug"],
    links: [{ label: "Sanofi press release: end of the tusamitamab ravtansine programme (21 December 2023)", url: "https://www.sanofi.com/en/media-room/press-releases/2023/2023-12-21-06-30-00-2799759" }, { label: "ClinicalTrials.gov NCT04154956 (CARMEN-LC03), with results", url: "https://clinicaltrials.gov/study/NCT04154956" }],
  },
  {
    id: "impassion131", technologies: ["checkpoint-inhibitor"], kind: "trial", name: "IMpassion131", nct: "NCT03125902", phase: "3", status: "negative", yearReported: 2020, sponsor: "Roche", asOf,
    setting: "First-line metastatic TNBC: atezolizumab + paclitaxel vs paclitaxel",
    tldr: "IMpassion131 was the sister trial to the first immunotherapy success in breast cancer. It failed, and the approval it was meant to confirm was withdrawn.",
    summary: "IMpassion130 (nab-paclitaxel partner) had shown a PFS benefit in PD-L1-positive metastatic TNBC and won accelerated approval in 2019. IMpassion131 used conventional paclitaxel (which requires steroid premedication) and showed no PFS or OS benefit; OS trended worse in the atezolizumab arm. Roche withdrew the US TNBC indication in 2021. Pembrolizumab with chemotherapy (KEYNOTE-355) became the standard instead.\n\nLesson: the chemotherapy partner (steroid premedication, immunogenic cell death profile) and the PD-L1 assay (SP142 vs 22C3) can decide an immunotherapy trial; confirmatory trials must replicate the winning design.",
    result: "PFS HR 0.82 (not significant); OS trend unfavourable; US indication withdrawn 2021.",
    drugs: ["atezolizumab", "paclitaxel", "pembrolizumab"], cancers: ["tnbc", "tnbc-metastatic"], trials: ["impassion130", "keynote-355"], terms: ["cps", "accelerated-approval"],
    tags: ["failure", "lesson:partner-and-biomarker"],
    links: [{ label: "ClinicalTrials.gov NCT03125902", url: "https://clinicaltrials.gov/study/NCT03125902" }, { label: "Annals of Oncology 2021", url: "https://www.annalsofoncology.org/article/S0923-7534(21)02073-7/fulltext" }],
  },
  {
    id: "epacadostat", targets: ["ido1"], kind: "drug", name: "Epacadostat", code: "INCB024360", modality: "Small molecule (IDO1 inhibitor)", asOf: "2026-11-18", status: "negative", wikipedia: W("Epacadostat"),
    tldr: "Incyte's enzyme blocker meant to stop tumours starving T cells of tryptophan. Its phase 3 melanoma trial found no benefit in 2018, and many of the drug's other trials were then stopped or withdrawn.",
    summary: "IDO1 degrades tryptophan to kynurenine, suppressing T cells. Epacadostat is Incyte's IDO1 inhibitor, tested with Merck's pembrolizumab and Bristol Myers Squibb's nivolumab. Epacadostat plus pembrolizumab produced a response in 12 of 22 people with melanoma (55%) in the phase 1 part of ECHO-202/KEYNOTE-037, which had no comparison group. ECHO-301/KEYNOTE-252 (n=706, unresectable or metastatic melanoma not previously treated with a PD-1 or PD-L1 inhibitor) then compared the pair with pembrolizumab plus placebo and showed no difference in PFS (hazard ratio 1.00) or OS (hazard ratio 1.13); it was stopped after its second interim analysis in 2018 and published in 2019. Of Incyte's six other phase 3 trials with Merck or Bristol Myers Squibb on the registry, one was terminated after enrolling two people and one was withdrawn before it started; on ClinicalTrials.gov on 18 November 2026, 16 of the 61 registered epacadostat studies were listed as terminated and 13 as withdrawn, and three were still open. The drug may never have achieved adequate pathway inhibition in tumours.\n\nLesson: pharmacodynamic proof of target engagement in the tumour should precede phase 3; a large uncontrolled response rate on a pembrolizumab backbone in melanoma is not evidence of added benefit.",
    mechanism: "Selective, reversible IDO1 enzyme inhibitor.",
    technologies: ["checkpoint-inhibitor"], companies: ["incyte", "merck"], cancers: ["melanoma"], drugs: ["pembrolizumab"],
    tags: ["failure", "lesson:phase-2-mirage"],
    links: [{ label: "ECHO-301/KEYNOTE-252 (Lancet Oncol 2019)", url: "https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(19)30274-8/fulltext" }],
  },
  {
    id: "trastuzumab-duocarmazine", companies: ["byondis"], kind: "drug", name: "Trastuzumab duocarmazine", code: "SYD985", modality: "ADC", asOf: "2026-11-18", status: "withdrawn",
    tldr: "A HER2 ADC with a DNA-alkylating payload that held breast cancer back for longer than the doctor's choice of standard treatment in a phase 3 trial yet never reached the market: eye toxicity was frequent, survival was not clearly longer, and neither the FDA nor the EMA approved it.",
    summary: "Byondis' duocarmycin-payload HER2 ADC improved PFS over physician's choice in pretreated HER2+ metastatic breast cancer (TULIP, 437 patients; median PFS 7.0 vs 4.9 months, hazard ratio 0.64, 95% CI 0.49 to 0.84), but overall survival was not significantly longer (final analysis posted on ClinicalTrials.gov: median 21.0 vs 19.5 months, hazard ratio 0.87, 95% CI 0.68 to 1.11). Eye toxicity affected 78.1% of patients, grade 3 or higher in 21.2%, and some had pneumonitis or ILD. The FDA issued a complete response letter in May 2023 asking for additional information. In the EU the applicant, medac, withdrew the application on 12 September 2023; the EMA's provisional view was that the medicine could not have been authorised, because of the way progression-free survival had been analysed and findings from an inspection of trial sites. Trastuzumab deruxtecan's DESTINY-Breast03 result made its niche disappear.\n\nLesson: statistical significance is not enough when a competitor redefines the standard; payload toxicity profile decides whether an ADC survives.",
    mechanism: "Trastuzumab with seco-DUBA duocarmycin via cleavable Val-Cit linker; DNA alkylation.",
    payload: "seco-DUBA (duocarmycin)", linker: "Val-Cit cleavable",
    targets: ["her2"], technologies: ["adc"], cancers: ["breast-her2-positive"], drugs: ["trastuzumab-deruxtecan"],
    tags: ["failure", "lesson:toxicity"],
    links: [{ label: "TULIP (Ann Oncol 2021 abstract)", url: "https://www.annalsofoncology.org/article/S0923-7534(21)04434-8/fulltext" }, { label: "TULIP, full report (Journal of Clinical Oncology 2025)", url: "https://doi.org/10.1200/JCO.24.00529" }, { label: "EMA: Jivadco, withdrawal of the marketing authorisation application", url: "https://www.ema.europa.eu/en/medicines/human/EPAR/jivadco" }, { label: "Byondis: FDA complete response letter (15 May 2023)", url: "https://byondis.com/investors-and-media/press-releases/u-s-food-and-drug-administration-issues-complete-response-letter-for-byondis-vic-trastuzumab-duocarmazine" }],
  },
  {
    id: "melflufen", companies: ["oncopeptides"], kind: "drug", name: "Melphalan flufenamide", brand: "Pepaxto (US, withdrawn) / Pepaxti (EU)", code: "melflufen", modality: "Peptide-drug conjugate", asOf: "2026-11-18", status: "withdrawn", wikipedia: W("Melphalan_flufenamide"),
    tldr: "A myeloma drug given accelerated approval in the US in February 2021. Its maker asked to withdraw it that October after the confirmatory trial pointed to shorter survival, and the FDA withdrew the approval on 23 February 2024. It stays authorised in the EU, with a restriction after stem cell transplant.",
    summary: "Melflufen is a lipophilic peptide-conjugated alkylator activated by aminopeptidases enriched in myeloma cells. Accelerated approval (26 February 2021) rested on the single-arm HORIZON response rate. In the confirmatory OCEAN trial against pomalidomide (495 patients), the published analysis reported longer progression-free survival (median 6.8 against 4.9 months; hazard ratio 0.79, 95% CI 0.64 to 0.98), but median overall survival was shorter with melflufen (19.8 against 25.0 months; hazard ratio 1.10, 95% CI 0.85 to 1.44, not statistically significant). Later analyses of the trial placed the worse survival in patients whose myeloma had progressed within 36 months of an autologous stem cell transplant. The FDA concluded that the trial failed to show superior progression-free survival and showed lower median overall survival. Oncopeptides asked to withdraw the US application on 22 October 2021 and rescinded that request in January 2022; the FDA's advisers voted 14 to 2 on 22 September 2022 that the balance of benefit and risk was not favourable, and the FDA withdrew the approval on 23 February 2024. In the EU it has been authorised since 17 August 2022 as Pepaxti, with dexamethasone, after at least three prior lines in triple-class refractory myeloma, and for patients with a prior autologous transplant only if the time to progression was at least three years.\n\nLesson: accelerated approval on response rate carries real risk when the confirmatory trial shows harm; the same subgroup could be a true signal or noise, and regulators in the US and EU read it differently.",
    mechanism: "Peptidase-activated alkylating prodrug of melphalan.",
    technologies: ["peptide-drug-conjugate"], cancers: ["multiple-myeloma"], terms: ["accelerated-approval"],
    tags: ["failure", "lesson:regulatory"],
    links: [{ label: "FDA final decision withdrawing approval of Pepaxto (Federal Register, 18 April 2024)", url: "https://www.federalregister.gov/documents/2024/04/18/2024-08274/final-decision-on-withdrawal-of-pepaxto-melphalan-flufenamide-following-appeal-of-the-proposal-to" }, { label: "OCEAN trial (Lancet Haematology, 2022)", url: "https://doi.org/10.1016/S2352-3026(21)00381-1" }, { label: "EMA: Pepaxti", url: "https://www.ema.europa.eu/en/medicines/human/EPAR/pepaxti" }],
  },
];

export const failures: EntityInput[] = raw.map((t) => (t.kind === "trial" ? { ...t, ...TRIAL_OUTCOMES[t.id] } : t));
