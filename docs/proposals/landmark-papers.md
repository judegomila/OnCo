# Landmark-paper watch: proposals for review

Written by `scripts/landmark-papers.ts` for papers registered 2026-11-16 to 2026-11-23. 2389 articles read from 21 journals (Crossref and Europe PMC), 2056 about cancer, 0 already in OnCo by DOI or PubMed id. Below, highest score first: every research paper from the general journals of the first rank (NEJM, The Lancet, Nature, Science, Cell, JAMA, BMJ), whatever its score, and the best of the rest; 36 in all.

Nothing here is in the corpus. To add one: resolve the DOI, read the abstract below (it is quoted as published), write the record in a `src/data/papers-*.ts` file with tldr, summary, findings, whatItMeans and caveats taken from the abstract only, and check every suggested link: they are name matches, not judgements. Close the pull request when done; it is never merged automatically.

## 1. Natural ligand-based CAR T-cell therapy targeting BCMA and TACI for relapsed or refractory multiple myeloma (TriPRIL): a non-randomised, phase 1, first-in-human trial

The Lancet, 2026-11-01. Puliafito BR, Graham CE, Raje NS, et al.. [doi:10.1016/s0140-6736(26)01806-4](https://doi.org/10.1016/s0140-6736(26)01806-4) · [PubMed 43044617](https://pubmed.ncbi.nlm.nih.gov/43044617/)

**Score 23**: journal tier 5 (+10); randomised or phase 3 (+4); registered trial NCT05020444 (+2); 14 records named (+6); 1 citations (+1).

Suggested id `paper-puliafito-natural-ligand-based-car-lancet-2026`, paperType `rct` (a guess), journals `lancet`. Would link to cancers: `myeloma-relapsed-refractory`, `multiple-myeloma`; drugs: `cyclophosphamide`, `fludarabine`; targets: `gprc5d`, `bcma`; trials: `nct06771609`, `nct05281471`, `nct06463665`; technologies: `rejuv-tx-icans-and-neurocognition`, `t-cell-engager`, `car-t`; related: `gprc5d-expression`, `bcma-expression`.

> Background Functional loss of B-cell maturation antigen (BCMA) is a recognised mechanism of relapse after BCMA-directed chimeric antigen receptor (CAR) T-cell therapy in patients with relapsed or refractory multiple myeloma. Targeting multiple tumour antigens simultaneously with a single CAR has the potential to mitigate antigen escape and prolong disease responses. Transmembrane activator and CAML interactor (TACI) and BCMA are both highly expressed on most myeloma cells and bind to the same natural ligand-a proliferation-inducing ligand (APRIL). We designed TriPRIL, a CAR that uses an engineered trimeric form of APRIL, to target both BCMA and TACI. We aimed to establish the safety, tolerability, preliminary efficacy, and recommended phase 2 dose of autologous TriPRIL CAR T cells. Methods In this first-in-human, open-label, dose-escalation and dose-expansion, phase 1 study, we evaluated TriPRIL in patients with relapsed or refractory multiple myeloma at Massachusetts General Hospital (Boston, MA, USA). Eligible patients had received at least three previous lines of therapy or had triple-class refractory disease. Previous CAR T-cell therapy and bispecific antibody therapy exposure were permitted. Patients received 3 days of lymphodepletion with intravenous cyclophosphamide (300 mg/m 2 ) and intravenous fludarabine (30 mg/m 2 ) daily on days -5, -4, and -3 before intravenous TriPRIL infusion on day 0. In the dose escalation phase, patients received 1·0 × 10 8 or 3·0 × 10 8 TriPRIL CAR T cells to establish the recommended phase 2 dose, which was further evaluated in the dose expansion phase. The primary endpoint was the incidence of study-related adverse events (graded according to Common Terminology Criteria for Adverse Events version 5) and dose-limiting toxicities in all patients who received an infusion of TriPRIL CAR T cells, until study completion at 24 months or progressive disease. The data cutoff date was March 24, 2026, when all infused patients had completed at least one assessment of disease response. This trial was registered at ClinicalTrials.gov (NCT05020444), has fully accrued, and is ongoing. Findings Between Sept 17, 2021, and Jan 27, 2026, 16 patients were enrolled and underwent leukapheresis, with 15 patients subsequently receiving a TriPRIL cell infusion. Ten (67%) of 15 infused patients were female, five (33%)were male, and the median age was 69 years (IQR 65-75). Nine (60%) of 15 infused patients had previously received BCMA-directed CAR T-cell therapy, and four (27%) had previously received a BCMA-directed or GPRC5D-directed bispecific T-cell engager. Six patients were treated with 1·0 × 10 8 CAR T cells, and nine were treated with 3·0 × 10 8 CAR T cells; there were no dose-limiting toxicities at either dose. The most common adverse events were neutropenia (14 [93%] of 15 patients), nausea (12 [80%]), hypogammaglobulinaemia (eight [53%]), fatigue (seven [47%]), and fever (seven [47%]). Non-haematological adverse events grade 3 or worse occurred in five (33%) patients and all resolved. Cytokine release syndrome (grade 1 or 2 only) occurred in 13 (87%, 95% CI 60-98) infused patients. One (7%, 0-32) patient had grade 2 immune effector cell-associated neurotoxicity syndrome, and one (7%, 0-32) had grade 2 immune effector cell-associated haemophagocytic lymphohistiocytosis-like syndrome; both of these patients had received 3·0 × 10 8 CAR T cells, and both conditions resolved with corticosteroids. Infections occurred in six (40%, 16-68) infused patients, with a grade 3 infection in one patient (7%, 0-32). There were no treatment-related deaths. The recommended phase 2 dose of CAR T cells was set as 3·0 × 10 8 cells. Interpretation TriPRIL showed a favourable safety profile and warrants further investigation in patients with relapsed or refractory multiple myeloma, including those previously treated with BCMA-directed CAR T-cell therapy. The study findings support further development of this dual-targeted, natural ligand-based CAR T-cell approach. Funding Mass General Brigham and V Foundation.

## 2. Prostate and pelvic nodal stereotactic body radiotherapy (SBRT) versus prostate-only SBRT for high-risk, localised prostate cancer (PACE-NODES): early adverse event results from an international, open-label, phase 3, randomised controlled trial

The Lancet Oncology, 2026-11-01. Pathmanathan A, Jain S, Cafferty FH, et al.. [doi:10.1016/s1470-2045(26)00465-1](https://doi.org/10.1016/s1470-2045(26)00465-1) · [PubMed 43063962](https://pubmed.ncbi.nlm.nih.gov/43063962/)

**Score 21**: journal tier 4 (+8); randomised or phase 3 (+4); registered trial NCT05613023 (+2); 15 records named (+6); 1 citations (+1).

Suggested id `paper-pathmanathan-prostate-pelvic-nodal-stereotactic-lancet-oncology-2026`, paperType `rct` (a guess), journals `lancet-oncology`. Would link to cancers: `prostate-high-risk`, `prostate`, `urethral-adenocarcinoma`, `lung-adenocarcinoma`; targets: `klk3`; trials: `nct06949111`, `nct05281471`, `nct06463665`, `control-cipn-trial`, `nct07381309`, `nct06794086`, `nct05236972`, `nct06767007`, `nct06121505`; pathways: `prostate-cancer-signalling`.

> Background Radiotherapy to the prostate and pelvic lymph nodes compared with prostate-only radiotherapy has shown benefits for high-risk prostate cancer in some studies, but evidence remains unclear. In low-risk or intermediate-risk disease, prostate-only stereotactic body radiotherapy (P-SBRT) is safe and effective. PACE-NODES aims to demonstrate safety and efficacy of prostate and pelvic nodal SBRT (PPN-SBRT) for high-risk disease. Methods PACE-NODES is a phase 3, open-label, randomised trial conducted at 47 hospitals in the UK, Ireland, and New Zealand. The trial recruited men aged 18 years or older, with a WHO performance status of 0-2, and with high-risk (Gleason score 8-10, stage T3a-T4, or prostate-specific antigen >20 ng/mL), localised prostate adenocarcinoma, planned for at least 12 months of hormone therapy. Participants were randomly assigned (1:1), using minimisation with a random element, to P-SBRT (36·25 Gy prostate) or PPN-SBRT (36·25 Gy prostate, 25 Gy pelvic nodes) in five fractions, on alternate days. Neither participants nor researchers were masked to treatment allocation. The primary endpoint is time to biochemical or clinical failure (not yet mature). This preplanned safety analysis is on secondary endpoints, with a focus on Common Terminology Criteria for Adverse Events grade 2 or worse gastrointestinal and genitourinary adverse events within 12 weeks of treatment, analysed by treatment received. Patient-reported outcomes include Expanded Prostate Index Composite Short Form (EPIC-26), International Prostate Symptom Score (IPSS), and EQ-5D-5L. This study is registered at ClinicalTrials.gov (NCT05613023) and is ongoing. Findings Between Sept 9, 2022, and July 31, 2025, 1166 participants were recruited and randomly assigned (583 per group). The median age was 72·7 years (IQR 67·7-76·5). 18 patients did not receive radiotherapy; a further 60 (17 assigned to P-SBRT, 43 assigned to PPN-SBRT) did not receive allocated radiotherapy, mostly where planning constraints were not met. This analysis includes 555 patients receiving P-SBRT and 511 patients receiving PPN-SBRT who had completed acute follow-up. Median follow-up was 13·8 months (IQR 7·8-21·0). 118 (21·3%) of 555 patients receiving P-SBRT and 143 (28·0%) of 511 receiving PPN-SBRT had grade 2 or worse gastrointestinal events within 12 weeks (difference 6·7 percentage points [95% CI 1·6-11·9]; p=0·011; odds ratio [OR] 1·44 [95% CI 1·09-1·91]). This included grade 3 events in eight (1·4%) patients treated with P-SBRT and 11 (2·2%) treated with PPN-SBRT, and a grade 4 event in one (0·2%) patient treated with P-SBRT. 223 (40·2%) of 555 patients receiving P-SBRT and 183 (35·8%) of 511 receiving PPN-SBRT had grade 2 or worse genitourinary events (difference -4·4 percentage points [-10·2 to 1·5]; p=0·14; OR 0·83 [0·65-1·06]). This included grade 3 events in seven (1·3%) patients treated with P-SBRT and two (0·4%) treated with PPN-SBRT (no grade 4 events). Genitourinary and gastrointestinal adverse events peaked at 2 weeks and were low and similar between groups at 12 weeks. There were no treatment-related deaths. More patients receiving PPN-SBRT had important decreases in bowel function on 4-week EPIC-26 (208 [54·9%] of 379 receiving P-SBRT, 239 [65·5%] of 365 receiving PPN-SBRT). The proportion of patients reporting moderate or severe urinary symptoms on IPSS at 4 weeks was similar in those receiving P-SBRT (312 [72·4%] of 431) and those receiving PPN-SBRT (284 [71·9%] of 395), as were 4-week decreases in overall health score on EQ-5D-5L (-3·2 [99% CI -4·8 to -1·6] for P-SBRT and -2·5 [-4·1 to -0·9] for PPN-SBRT). Interpretation P-SBRT and PPN-SBRT for patients with high-risk prostate cancer were deliverable in an international multicentre trial. PPN-SBRT increased gastrointestinal but not genitourinary adverse events. Side-effects diminished rapidly, with no difference by 12 weeks. Follow-up continues for late adverse events and cancer control, which are essential for confirming a role for PPN-SBRT in this setting. Funding Prostate Cancer UK.

## 3. Carfilzomib-based strategies in transplant-eligible multiple myeloma: long-term follow-up of the phase 2 FORTE trial

Blood, 2026-11-16. Bertuglia G, D'Agostino M, Rota-Scalabrini D, et al.. [doi:10.1182/blood.2026035635](https://doi.org/10.1182/blood.2026035635) · [PubMed 43038178](https://pubmed.ncbi.nlm.nih.gov/43038178/)

**Score 20**: journal tier 4 (+8); randomised or phase 3 (+4); registered trial NCT02203643 (+2); 6 records named (+6).

Suggested id `paper-bertuglia-carfilzomib-based-strategies-transplant-blood-2026`, paperType `rct` (a guess), journals `blood`. Would link to cancers: `multiple-myeloma`; drugs: `cyclophosphamide`, `dexamethasone`, `lenalidomide`, `carfilzomib`; trials: `nct06771609`.

> In the phase 2 FORTE trial, transplant-eligible newly diagnosed multiple myeloma patients aged ≤65 years were randomized to (R1) carfilzomib-lenalidomide-dexamethasone followed by autologous stem cell transplantation (KRd-ASCT), twelve cycles of KRd (KRd12), or carfilzomib-cyclophosphamide-dexamethasone followed by ASCT (KCd-ASCT). Eligible patients were then randomized (R2) to maintenance with carfilzomib for 2 years plus lenalidomide until progression (KR) or lenalidomide alone until progression (R). With extended follow-up (median 99 months from R1 and 85 months from R2), KRd-ASCT significantly increased progression-free survival (PFS, median 98 months) versus KRd12 (median 70 months; HR 0.71, p=0.027) and KCd-ASCT (median 67 months; HR 0.66, p=0.006). A significant benefit in PFS2 was also observed versus both KRd12 (HR 0.65, p=0.02) and KCd-ASCT (HR 0.68, p=0.04) and in terms of overall survival (OS) versus KCd-ASCT (8-year OS: 76% vs 68%; HR 0.65, p=0.04). KR maintenance significantly improved PFS versus R (HR 0.67, p=0.02), with a time-dependent effect persisting up to two years after carfilzomib discontinuation; no differences in PFS2/OS were observed. KR significantly increased rate of measurable residual disease (MRD) conversion (sHR 0.47, p=0.03) during active treatment, and reduced MRD resurgence (sHR 0.53, p=0.001) versus R. Median duration of MRD negativity was 50.5 months in KR vs. 38 months in R arm. MRD-negative patients had significantly prolonged PFS with KR (HR 0.60, p=0.031); MRD-positive patients benefited from KR mainly during carfilzomib therapy (HR 0.46, p=0.05). The cumulative incidence of second primary malignancies was 6%. In conclusion, long-term follow-up confirms the high effectiveness of KRd-ASCT and KR maintenance. NCT02203643

## 4. Neoadjuvant nivolumab plus ipilimumab in surgically resectable hepatocellular carcinoma (PRIME-HCC): a prospective, phase 1b, single-arm trial and translational analyses

The Lancet Oncology, 2026-11-01. D'Alessio A, Fulgenzi CAM, Pai M, et al.. [doi:10.1016/s1470-2045(26)00331-1](https://doi.org/10.1016/s1470-2045(26)00331-1) · [PubMed 43044626](https://pubmed.ncbi.nlm.nih.gov/43044626/)

**Score 20**: journal tier 4 (+8); randomised or phase 3 (+4); registered trial NCT03682276 (+2); 19 records named (+6).

Suggested id `paper-d-neoadjuvant-nivolumab-plus-ipilimumab-lancet-oncology-2026`, paperType `rct` (a guess), journals `lancet-oncology`. Would link to cancers: `hcc-early`, `hcc-advanced`, `hcc`; drugs: `ipilimumab`, `nivolumab`, `relatlimab-nivolumab`, `ventana-confirm-er-pr`; targets: `mki67`, `pd1`; trials: `nct05281471`, `nct06463665`, `control-cipn-trial`, `nct07277842`; technologies: `spatial-transcriptomics`, `imaging-mass-cytometry`; pathways: `clonal-evolution`, `hepatocellular-carcinoma-signalling`, `tumor-microenvironment`; related: `ki-67-index`.

> Background Nivolumab plus ipilimumab improves survival in advanced hepatocellular carcinoma. We evaluated this combination as neoadjuvant therapy and investigated its effect on peripheral immunity and the tumour microenvironment. Methods PRIME-HCC is a single-arm, phase 1b trial in adults (aged ≥18 years) with early-stage resectable hepatocellular carcinoma, Child-Pugh A liver function, and Eastern Cooperative Oncology Group performance status 0-1. Patients received nivolumab (3 mg/kg intravenously on days 1 and 22 of the first and second cycle) and ipilimumab (1 mg/kg intravenously on day 1 of the first cycle only) before liver resection. The primary endpoint was safety, assessed by treatment-related delays to surgery and adverse events in the intention-to-treat population. Translational analyses included imaging mass cytometry and spatial transcriptomics on paired tumour samples, peripheral immunophenotyping, T-cell receptor (TCR) β sequencing, and longitudinal tumour-agnostic circulating tumour DNA (ctDNA) profiling. This trial was registered with EudraCT (2018-000987-27) and ClinicalTrials.gov (NCT03682276); follow-up is currently ongoing. Findings Between Sept 18, 2019, and Sept 28, 2023, of 43 patients assessed for eligibility, 33 patients were enrolled (25 [76%] male and 8 [24%] female; median age 68 years [range 38-80; IQR 63-73]); median follow-up was 25·7 months (95% CI 21·2-30·1). Any-grade adverse events occurred in 31 (94%) of patients, with treatment-related adverse events (trAEs) in 25 (76%) patients. Grade 3 trAEs occurred in three (9%) patients (transaminase elevation, anaemia, and dyspnoea). Serious adverse events were recorded in three (9%) patients, and no grade 4-5 events or treatment-related deaths occurred. 30 (91%) patients underwent surgery, including two (6%) who had immune checkpoint inhibitor-related surgical delays. Objective response rate by RECIST 1.1 was noted in eight (25%; 95% CI 13-42) patients (one complete response and seven partial responses), with 31 (97%; 84-100) patients achieving disease control. The absence of ctDNA after surgery was associated with improved 2-year recurrence-free survival (nine [82%] of 11 patients vs two [29%] of seven; p=0·049), as was at least 50% ctDNA reduction (median not reached [95% CI not reached] vs 20·9 months [95% CI 16·3-25·4]; HR 0·14 [95% CI 0·02-0·91]; p=0·039). Patients with objective responses showed expansion of peripheral PD-1-positive, Ki-67-positive, CD8-positive T cells (T-responding exhausted cells [Tresp]), associated with higher baseline intratumoral progenitor-exhausted T cells (Tpex) and increased Tresp infiltration. Patients whose disease did not respond to treatment exhibited enrichment of terminally exhausted CD8-positive T cells (Tex-term; CD8-positive PD-1-positive TOX-positive cells) and regulatory T cells. Interpretation Neoadjuvant nivolumab plus ipilimumab is feasible in early-stage resectable hepatocellular carcinoma, and later-phase randomised trials are needed to confirm the efficacy of this treatment strategy. Longitudinal ctDNA monitoring could support detection of minimal residual disease and warrants further prospective validation. Funding Bristol Myers Squibb, Cancer Research UK, Associazione Italiana per la Ricerca sul Cancro, and Foundation for Liver Research.

## 5. Etentamig in Relapsed/Refractory Multiple Myeloma: Pooled Phase 1 Data of an Investigational BCMA Bispecific Antibody

Blood, 2026-11-16. Baljevic M, Voorhees P, Rodriguez C, et al.. [doi:10.1182/blood.2026034590](https://doi.org/10.1182/blood.2026034590) · [PubMed 43038173](https://pubmed.ncbi.nlm.nih.gov/43038173/)

**Score 19**: journal tier 4 (+8); registered trial NCT03933735, NCT05650632 (+2); a trial OnCo holds: nct03933735 (+3); 7 records named (+6).

Suggested id `paper-baljevic-etentamig-relapsed-refractory-multiple-blood-2026`, paperType `translational` (a guess), journals `blood`. Would link to cancers: `multiple-myeloma`; drugs: `dexamethasone`; targets: `bcma`; trials: `nct05281471`, `nct06463665`, `nct03933735`; technologies: `t-cell-engager`; related: `bcma-expression`.

> Etentamig is an investigational B-cell maturation antigen (BCMA) x CD3 bispecific T-cell engager, composed of a low-affinity CD3 binding domain, potentially reducing cytokine release syndrome (CRS) and infections, a high-avidity bivalent BCMA-binding domain, and retained FcRn binding supporting monthly (Q4W) dosing after a single step-up dose (SUD). We report long-term efficacy and safety from the ongoing, open-label, phase 1 (dose escalation/expansion; NCT03933735) and Arm A of the phase 1b (NCT05650632) studies of etentamig in adult patients with relapsed/refractory multiple myeloma, triple-class exposure, and ≥3 prior lines of therapy (LoT). In phase 1, patients received etentamig 60 mg Q4W or 40 mg Q3W, and in phase 1b, a SUD on Day 1 and 60 mg Q4W on Day 4. Among 146 patients (median age: 68 years; median [range] prior LoT: 4 [3-23]), median follow-up was 13 months (range: 1-48). Objective responses and ≥ very good partial responses occurred in 66% and 54% of patients. Median duration of response and progression-free survival were not reached. Pooled data suggest etentamig has a manageable safety profile, with Grade 3/4 neutropenia and infection occurring in 38% and 23% of patients. In phase 1b Arm A (n=23), overall CRS incidence was 30% (26% Grade 1; 4% Grade 2) with modified dexamethasone premedication and 1 SUD; median onset was 22.3 hours (range: 5.5-29.6) hours, with resolution in 20.7 hours (range: 1.8-131.7). Etentamig's molecular design may be associated with the observed clinical efficacy and tolerability while also potentially supporting extended dosing intervals.

## 6. Computed Tomography Screening and Small Cell Lung Cancer Stage Shift and Survival

JAMA Oncology, 2026-11-19. Potter AL, Kothagundla S, Ananthanarayanan A, et al.. [doi:10.1001/jamaoncol.2026.4667](https://doi.org/10.1001/jamaoncol.2026.4667) · [PubMed 43056109](https://pubmed.ncbi.nlm.nih.gov/43056109/)

**Score 18**: journal tier 4 (+8); randomised or phase 3 (+4); 7 records named (+6).

Suggested id `paper-potter-computed-tomography-screening-small-jama-oncology-2026`, paperType `observational` (a guess), journals `jama-oncology`. Would link to cancers: `lung-cancer`, `sclc`; trials: `nct06936774`, `nct07728955`, `nct06441344`; technologies: `ct`; pathways: `sclc-signalling`.

> Importance Lung cancer screening with low-dose computed tomography (LDCT) has been shown to identify lung cancers at earlier stages and to significantly reduce lung cancer mortality in prior randomized clinical trials. However, the benefit of LDCT screening for small cell lung cancer (SCLC), an aggressive subtype of lung cancer, is unclear. Objective To investigate the characteristics and outcomes of SCLC diagnosed after a lung cancer screening examination using a large database of Medicare beneficiaries. Design, Setting, and Participants In this retrospective cohort study, Medicare data linked to the Surveillance Epidemiology End Results Program’s cancer registry data were analyzed. Patients in the US aged 65 to 78 years who were diagnosed with SCLC from 2015 to 2021 were identified for analysis, with follow-up data through 2022. Patients who underwent 1 or more LDCT lung cancer screening examinations during the 12 months preceding their SCLC diagnosis were included in the screened group. All other patients were included in the unscreened group. Data were analyzed from January to August 2026. Exposure One or more LDCT lung cancer screenings during the 12 months preceding SCLC diagnosis. Main Outcomes and Measures The primary outcomes were stage at SCLC diagnosis and overall survival after SCLC diagnosis in the screened and unscreened groups. Results A total of 17 099 patients (median [IQR] age, 72.0 [69.0-75.0] years; 8999 [52.6%] female) met study inclusion criteria, of which 949 (5.5%) were included in the screened group and 16 150 (94.5%) were included in the unscreened group. When compared with patients in the unscreened group, patients in the screened group were significantly less likely to be diagnosed with distant disease (419 of 949 [44.2%] vs 11 376 of 16 150 [70.4%]; P &amp;lt;.001). Patients in the screened group also had significantly better overall survival when compared with patients in the unscreened group (3-year overall survival, 28.0% [95% CI, 24.9%-31.2%] vs 10.8% [95% CI, 10.3%-11.3%]; P &amp;lt;.001). Both findings were consistent in propensity score–matched analysis. Conclusions and Relevance Results of this cohort study of Medicare beneficiaries diagnosed with SCLC suggest that receipt of lung cancer screening was associated with a shift toward earlier-stage SCLC at diagnosis and improved overall survival.

## 7. Partial-Breast Irradiation Versus Whole-Breast Irradiation for Low-Risk Invasive Breast Carcinoma: 5-Year Results of the Multicenter, Randomized, Phase III IRMA Trial

Journal of Clinical Oncology, 2026-11-17. Meduri B, Baldissera A, Iotti C, et al.. [doi:10.1200/jco-26-00969](https://doi.org/10.1200/jco-26-00969) · [PubMed 43044095](https://pubmed.ncbi.nlm.nih.gov/43044095/)

**Score 18**: journal tier 4 (+8); randomised or phase 3 (+4); registered trial NCT01803958 (+2); 4 records named (+4).

Suggested id `paper-meduri-partial-breast-irradiation-whole-jco-2026`, paperType `rct` (a guess), journals `jco`. Would link to cancers: `invasive-breast-carcinoma-no-special-type`, `breast-cancer`; trials: `control-cipn-trial`; pathways: `breast-cancer-signalling`.

> Purpose The aim of this study was to investigate whether external-beam accelerated partial-breast irradiation (APBI) provides noninferior local control compared with whole-breast irradiation (WBI). Patients and Methods We conducted this randomized phase III trial (ClinicalTrials.gov identifier: NCT01803958) in 35 centers. Patients age ≥49 years with invasive breast cancer, resection margins ≥2 mm, tumor diameter ≤3 cm, and pN0-1 were randomly assigned 1:1 to WBI or APBI (38.5 Gy in 10 fractions twice daily). Neither patients nor investigators were masked to treatment allocation. The primary end point was ipsilateral breast tumor recurrence (IBTR), analyzed according to the modified intention-to-treat analysis. We assumed a 5-year IBTR rate of 4% in the WBI group to exclude a 2% increase in the APBI group (90% power; noninferiority margin hazard ratio [HR], 1.5). Results Between 2007 and 2019, 3,309 patients were randomly assigned (1,652 to APBI, 1,657 to WBI); 84 were excluded from the analysis. The median follow-up was 97.5 months. The 5-year cumulative IBTR incidence was 1.0% (95% CI, 0.6 to 1.6) for APBI and 0.8% (95% CI, 0.5 to 1.4) for WBI. The HR for APBI versus WBI was 1.18 (90% CI, 0.63 to 2.20) with the upper confidence limit crossing the prespecified noninferiority margin. Conclusion At 5 years, the cumulative incidence of IBTR is exceptionally low (≤1%) in both arms. Although formal statistical noninferiority was not demonstrated because the upper confidence limit crossed the margin, the absolute difference was <0.2%. External-beam APBI therefore is a reasonable clinical alternative to WBI for low-risk patients.

## 8. 1976P Impact of bifidobacterium animalis subsp. lactis BL-04 on survival and circulating immune profiles in metastatic NSCLC patients treated with nivolumab: A randomized, placebo-controlled trial (NCT06428422)

Annals of Oncology, 2026-12-01. Ugrakli M, Ugrakli S, Tunçil YE, et al.. [doi:10.1016/j.annonc.2026.08.2267](https://doi.org/10.1016/j.annonc.2026.08.2267)

**Score 17**: journal tier 4 (+8); randomised or phase 3 (+4); registered trial NCT06428422 (+2); 6 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-ugrakli-1976p-impact-bifidobacterium-animalis-annals-of-oncology-2026`, paperType `rct` (a guess), journals `annals-of-oncology`. Would link to cancers: `nsclc`; drugs: `nivolumab`, `relatlimab-nivolumab`; trials: `nct06922591`, `nct07728955`, `nct06441344`.

_No abstract indexed yet: read the paper before writing anything._

## 9. 10P A randomized phase 3 study of disitamab vedotin (DV) versus chemotherapy (chemo) in HER2-low advanced breast cancer: overall and the liver metastasis (BCLM) subgroup results

Annals of Oncology, 2026-12-01. Wang J, Tong Z, Ouyang Q, et al.. [doi:10.1016/j.annonc.2026.08.019](https://doi.org/10.1016/j.annonc.2026.08.019)

**Score 16**: journal tier 4 (+8); randomised or phase 3 (+4); 6 records named (+6); 1 citations (+1); no abstract indexed yet (-3).

Suggested id `paper-wang-10p-disitamab-vedotin-chemotherapy-annals-of-oncology-2026`, paperType `rct` (a guess), journals `annals-of-oncology`. Would link to cancers: `breast-cancer`; drugs: `disitamab-vedotin`; targets: `her2`; trials: `nct07381309`; pathways: `breast-cancer-signalling`; related: `her2-low-ihc`.

_No abstract indexed yet: read the paper before writing anything._

## 10. Alectinib as Neoadjuvant Treatment in Potentially Resectable Stage III Anaplastic Lymphoma Kinase–Positive Non–Small Cell Lung Cancer: ALNEO Phase II Trial (GOIRC-01-2020-ML42316)

Journal of Clinical Oncology, 2026-11-20. Leonetti A, Boni L, Gnetti L, et al.. [doi:10.1200/jco-26-00854](https://doi.org/10.1200/jco-26-00854) · [PubMed 43063368](https://pubmed.ncbi.nlm.nih.gov/43063368/)

**Score 16**: journal tier 4 (+8); phase 2 (+2); 10 records named (+6).

Suggested id `paper-leonetti-alectinib-neoadjuvant-treatment-potentially-jco-2026`, paperType `translational` (a guess), journals `jco`. Would link to cancers: `lung-cancer`, `non-hodgkin-lymphoma`, `nsclc`; drugs: `alectinib`; trials: `nct05318573`, `nct07728955`, `nct06441344`; pathways: `nsclc-signalling`, `sclc-signalling`; related: `alk-fusion`.

> Purpose Stage III non–small cell lung cancer (NSCLC) is a heterogeneous disease with no single definitive therapeutic approach. The role of neoadjuvant tyrosine kinase inhibitors in stage III ALK-positive NSCLC remains unknown. The ALNEO study evaluated the activity and safety of perioperative alectinib in this population. Patients and Methods ALNEO is an open-label, single-arm, multicenter phase II study enrolling treatment-naïve patients with potentially resectable stage III ALK-positive NSCLC. Patients received neoadjuvant alectinib 600 mg twice daily for 8 weeks, followed by surgery and adjuvant alectinib for up to 96 weeks. The primary end point was major pathologic response (MPR; ≤10% residual viable tumor cells) assessed by blinded independent central review. Secondary end points included pathologic complete response (pCR), objective response rate (ORR), event-free survival (EFS), disease-free survival (DFS), overall survival (OS), and safety. Results From May 2021 to July 2024, 33 patients were enrolled. The median age was 62 years (range, 33-79), 70% were female, and 52% were never smokers. Clinical stage was IIIA in 64% and IIIB in 36%. All patients completed neoadjuvant treatment, and 28 (85%) underwent surgery, most commonly lobectomy (75%). R0 resection was achieved in 24 (86%). MPR was observed in 14 patients (42%; 95% CI, 26 to 61), including four pCRs (12%; 95% CI, 3 to 28). ORR was 67%. Adjuvant treatment was initiated in 26 (79%) patients. After a median follow-up of 26.8 months, median EFS, DFS, and OS were not reached; six patients (18%) experienced disease recurrence. Grade ≥3 adverse events occurred in 9% and 27% of patients during neoadjuvant and adjuvant treatment, respectively. Conclusion The ALNEO study met its primary end point, suggesting perioperative alectinib as a feasible and active approach in potentially resectable stage III ALK-positive NSCLC.

## 11. Organ-preserving multimodal therapy for patients with high-risk upper tract urothelial carcinoma in China (DISTINCT-I): a single-arm, phase 2 trial

The Lancet Oncology, 2026-11-01. Huang J, Hu H, Ng C, et al.. [doi:10.1016/s1470-2045(26)00445-6](https://doi.org/10.1016/s1470-2045(26)00445-6) · [PubMed 43063963](https://pubmed.ncbi.nlm.nih.gov/43063963/)

**Score 16**: journal tier 4 (+8); phase 2 (+2); registered trial NCT05912816 (+2); 4 records named (+4).

Suggested id `paper-huang-organ-preserving-multimodal-therapy-lancet-oncology-2026`, paperType `translational` (a guess), journals `lancet-oncology`. Would link to cancers: `urethral-urothelial-carcinoma`; drugs: `disitamab-vedotin`, `tislelizumab`; pathways: `bladder-cancer-signalling`.

> Background Radical nephroureterectomy is the standard treatment for patients with high-risk upper tract urothelial carcinoma, but causes irreversible nephron loss and can limit subsequent systemic therapy. We aimed to assess a response-adapted kidney-preserving strategy integrating induction disitamab vedotin plus tislelizumab, selective kidney-sparing surgery, and longitudinal circulating tumour DNA and urinary tumour DNA monitoring in patients with localised high-risk upper tract urothelial carcinoma. Methods DISTINCT-I was a single-arm, phase 2 trial conducted at two tertiary referral centres in China. Adults aged 18 years or older with histologically confirmed, localised, high-risk upper tract urothelial carcinoma (cT1-T3, N0-N1, M0), and Eastern Cooperative Oncology Group performance status 0-2 received 2·0 mg/kg intravenous disitamab vedotin plus intravenous 200 mg tislelizumab once every 3 weeks for two to four cycles, followed by response-adapted kidney-sparing surgery when feasible. The primary endpoint was the 1-year kidney-intact event-free survival rate, assessed in the intention-to-treat population. Kidney-intact event-free survival was defined as the time from enrolment to the earliest occurrence of high-risk upper tract urothelial carcinoma recurrence, death from any cause, or conversion to radical nephroureterectomy. Safety was assessed in all patients who received at least one dose of study treatment and according to Common Terminology Criteria for Adverse Events and Clavien-Dindo classification. This study is registered with ClinicalTrials.gov (NCT05912816), and is ongoing. Findings Between Sept 6, 2023, and Nov 15, 2024, 36 patients were assessed for eligibility; ten did not meet the eligibility criteria and six declined to participate. Of the 20 patients enrolled, 17 (85%) were male and three (15%) were female; all patients were Chinese. At data cutoff (Dec 31, 2025), median follow-up was 17·0 months (IQR 14·0-23·0). The 1-year kidney-intact event-free survival rate was 70% (95% CI 46-88; 14 participants). Grade 3 treatment-related adverse events occurred in two (10%) patients (fatigue in one and increased γ-glutamyl transferase in another). No grade 4-5 treatment-related adverse events, serious treatment-related adverse events, or treatment-related deaths occurred. Interpretation This structured, multimodal, response-adapted strategy was associated with kidney preservation in selected patients with high-risk upper tract urothelial carcinoma. These findings support further prospective comparative evaluation of organ-preserving strategies in patients with high-risk upper tract urothelial carcinoma. Funding Shanghai Science and Technology Commission, Shanghai Health Commission, Beijing Xisike Clinical Oncology Research Foundation, and Department of Science and Technology of Guangdong. Translation For the Chinese (Mandarin) translation of the abstract see Supplementary Materials section.

## 12. 1239O NRG-GY020: Phase III randomized trial of radiation +/- MK-3475 (pembrolizumab) for newly diagnosed early-stage high intermediate risk (HIR) mismatch repair deficient (dMMR) endometrioid endometrial cancer

Annals of Oncology, 2026-12-01. Backes F, Sill MW, Richardson DL, et al.. [doi:10.1016/j.annonc.2026.08.1533](https://doi.org/10.1016/j.annonc.2026.08.1533)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 8 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-backes-1239o-nrg-gy020-iii-annals-of-oncology-2026`, paperType `rct` (a guess), journals `annals-of-oncology`. Would link to cancers: `endometrial`; drugs: `pembrolizumab`; targets: `mmr`; trials: `nct06976944`, `nct04153734`; pathways: `endometrial-cancer-signalling`, `mismatch-repair-msi`; related: `dmmr-ihc`.

_No abstract indexed yet: read the paper before writing anything._

## 13. 1240O Iparomlimab and tuvonralimab (QL1706) plus chemotherapy with or without bevacizumab as first-line treatment for persistent, recurrent, or metastatic cervical cancer (R/M CC): Results from a double-blind, randomized, placebo-controlled phase 3 trial

Annals of Oncology, 2026-12-01. Liu J, Zhou Q, Wang D, et al.. [doi:10.1016/j.annonc.2026.08.1534](https://doi.org/10.1016/j.annonc.2026.08.1534)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 8 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-liu-1240o-iparomlimab-tuvonralimab-ql1706-annals-of-oncology-2026`, paperType `rct` (a guess), journals `annals-of-oncology`. Would link to cancers: `cervical`; drugs: `iparomlimab-tuvonralimab`, `bevacizumab-glioma`, `bevacizumab`, `ql1706`; trials: `nct07381309`, `nct06791512`, `nct07007767`.

_No abstract indexed yet: read the paper before writing anything._

## 14. 1272P Evaluation of bevacizumab (bev) contribution to efficacy outcome in first-line advanced ovarian cancer phase 3 trial FIRST/ENGOT-OV44-OV132

Annals of Oncology, 2026-12-01. Hardy-Bessard AC, Montestruc F, Asselain B, et al.. [doi:10.1016/j.annonc.2026.08.1566](https://doi.org/10.1016/j.annonc.2026.08.1566)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 7 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-hardy-1272p-evaluation-bevacizumab-bev-annals-of-oncology-2026`, paperType `basic` (a guess), journals `annals-of-oncology`. Would link to cancers: `ovarian`; drugs: `bevacizumab-glioma`, `bevacizumab`; trials: `nct06791512`, `nct07007767`, `nct05281471`, `nct06463665`.

_No abstract indexed yet: read the paper before writing anything._

## 15. 1335TiP A randomized phase 2, open-label, multicenter, study of trastuzumab deruxtecan versus investigator’s choice chemotherapy in recurrent ovarian cancer that progressed on prior PARP(poly (ADP-ribose) polymerase) inhibitor therapy: TROY (APGOT-OV14)

Annals of Oncology, 2026-12-01. Lee JY, Lim MC, Park JY, et al.. [doi:10.1016/j.annonc.2026.08.1628](https://doi.org/10.1016/j.annonc.2026.08.1628)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 6 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-lee-1335tip-open-label-multicenter-annals-of-oncology-2026`, paperType `rct` (a guess), journals `annals-of-oncology`. Would link to cancers: `ovarian`; drugs: `trastuzumab-deruxtecan`, `trastuzumab`; targets: `parp`; trials: `nct07381309`, `nct06891833`.

_No abstract indexed yet: read the paper before writing anything._

## 16. 1337TiP Symbiotic-GYN-18 (GOG-3145/ENGOT-EN37/APGOT-EN6/LACOG 0426-EVA): Phase 3 study of PF-08634404, a PD-1/VEGF bispecific antibody, in combination with chemotherapy in patients (pts) with advanced or recurrent mismatch repair proficient (pMMR) endometrial cancer (EC)

Annals of Oncology, 2026-12-01. Moore KN, Antill Y, Casarotto FC, et al.. [doi:10.1016/j.annonc.2026.08.1630](https://doi.org/10.1016/j.annonc.2026.08.1630)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 8 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-moore-1337tip-symbiotic-gyn-gog-annals-of-oncology-2026`, paperType `translational` (a guess), journals `annals-of-oncology`. Would link to cancers: `endometrial`; drugs: `pf-08634404`; targets: `mmr`, `pd1`; trials: `nct07381309`, `nct07277842`; pathways: `endometrial-cancer-signalling`, `mismatch-repair-msi`.

_No abstract indexed yet: read the paper before writing anything._

## 17. 1338TiP TroFuse-021/ENGOT-ov85/GOG-3102: Phase 3 study of maintenance sacituzumab tirumotecan (Sac-TMT) ± bevacizumab (Bev) vs standard of care (SoC) for newly diagnosed advanced non–HRD-positive ovarian cancer (OC)

Annals of Oncology, 2026-12-01. Ray-Coquard IL, Fidalgo JAP, Slomovitz BM, et al.. [doi:10.1016/j.annonc.2026.08.1631](https://doi.org/10.1016/j.annonc.2026.08.1631)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 8 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-ray-1338tip-trofuse-021-engot-annals-of-oncology-2026`, paperType `basic` (a guess), journals `annals-of-oncology`. Would link to cancers: `ovarian`; drugs: `sacituzumab-tirumotecan`, `bevacizumab-glioma`, `bevacizumab`; trials: `nct06791512`, `nct07007767`, `nct07318558`; related: `hrd-positive`.

_No abstract indexed yet: read the paper before writing anything._

## 18. 1339TiP ASPENOVA: A phase 3 study of azenosertib monotherapy versus standard of care chemotherapy in cyclin E1-positive platinum-resistant ovarian cancer (PROC)

Annals of Oncology, 2026-12-01. Simpkins F, Wilk CM, Kim D, et al.. [doi:10.1016/j.annonc.2026.08.1632](https://doi.org/10.1016/j.annonc.2026.08.1632)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 8 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-simpkins-1339tip-aspenova-azenosertib-monotherapy-annals-of-oncology-2026`, paperType `basic` (a guess), journals `annals-of-oncology`. Would link to cancers: `platinum-resistant-ovarian-cancer`, `ovarian`; drugs: `azenosertib`, `platinum-etoposide`; targets: `ccne1`; trials: `nct07381309`, `nct07546500`, `aspen-wm`.

_No abstract indexed yet: read the paper before writing anything._

## 19. 1340TiP BEHOLD-Endometrial01: A randomised phase 3 study evaluating the efficacy and safety of mocertatug rezetecan (Mo-Rez) versus chemotherapy in patients with advanced or recurrent endometrial cancer after platinum-based therapy and immunotherapy

Annals of Oncology, 2026-12-01. Oaknin A, Lee JY, Dal Molin GZ, et al.. [doi:10.1016/j.annonc.2026.08.1633](https://doi.org/10.1016/j.annonc.2026.08.1633)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 9 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-oaknin-1340tip-behold-endometrial01-evaluating-annals-of-oncology-2026`, paperType `rct` (a guess), journals `annals-of-oncology`. Would link to cancers: `advanced-recurrent-endometrial-cancer`, `endometrial`; drugs: `hs-20089`, `platinum-etoposide`; trials: `nct07286331`, `nct07381309`, `nct05281471`, `nct06463665`; pathways: `endometrial-cancer-signalling`.

_No abstract indexed yet: read the paper before writing anything._

## 20. 1443eTiP TroFuse-022/ENGOT-ov84/GOG-3103 Part 2: Phase 3 study of maintenance sacituzumab tirumotecan ± bevacizumab vs standard of care following second-line platinum-based doublet chemotherapy for platinum-sensitive recurrent ovarian cancer

Annals of Oncology, 2026-12-01. González-Martín A, Herzog TJ, Hasegawa K, et al.. [doi:10.1016/j.annonc.2026.08.1732](https://doi.org/10.1016/j.annonc.2026.08.1732)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 9 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-gonzalez-1443etip-trofuse-022-engot-annals-of-oncology-2026`, paperType `basic` (a guess), journals `annals-of-oncology`. Would link to cancers: `ovarian`; drugs: `sacituzumab-tirumotecan`, `bevacizumab-glioma`, `bevacizumab`, `platinum-etoposide`; trials: `nct07381309`, `nct06791512`, `nct07007767`, `nct06824467`.

_No abstract indexed yet: read the paper before writing anything._

## 21. 1444eTiP TroFuse-036/GOG-3123/ENGOT-cx22 part 2: A phase 3, open-label, randomized study of sacituzumab tirumotecan (sac-TMT) + pembrolizumab (pembro) ± bevacizumab (bev) vs standard of care (SoC) as first-line maintenance therapy for PD-L1–positive cervical cancer

Annals of Oncology, 2026-12-01. Van Gorp T, Monk BJ, Tewari KS, et al.. [doi:10.1016/j.annonc.2026.08.1733](https://doi.org/10.1016/j.annonc.2026.08.1733)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 11 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-van-1444etip-trofuse-036-gog-annals-of-oncology-2026`, paperType `rct` (a guess), journals `annals-of-oncology`. Would link to cancers: `cervical`; drugs: `sacituzumab-tirumotecan`, `pembrolizumab`, `bevacizumab-glioma`, `bevacizumab`; targets: `pdl1`; trials: `nct06976944`, `nct04153734`, `nct06791512`, `nct07007767`, `nct07216703`.

_No abstract indexed yet: read the paper before writing anything._

## 22. 1448eTiP FRAmework-01: A three-part phase 3 study of sofetabart mipitecan (Sofe-M) in platinum-resistant ovarian cancer (PROC), and Sofe-M plus bevacizumab (Bev) in platinum-sensitive ovarian cancer (PSOC)

Annals of Oncology, 2026-12-01. O'Cearbhaill RE, Pothuri B, Hasegawa K, et al.. [doi:10.1016/j.annonc.2026.08.1737](https://doi.org/10.1016/j.annonc.2026.08.1737)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 10 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-o-1448etip-framework-three-part-annals-of-oncology-2026`, paperType `basic` (a guess), journals `annals-of-oncology`. Would link to cancers: `platinum-sensitive-ovarian-cancer`, `platinum-resistant-ovarian-cancer`, `ovarian`; drugs: `sofetabart-mipitecan`, `bevacizumab-glioma`, `bevacizumab`, `platinum-etoposide`; trials: `nct07213804`, `nct06791512`, `nct07007767`.

_No abstract indexed yet: read the paper before writing anything._

## 23. 1449eTiP Oral metronomic chemotherapy in combination with low-dose nivolumab in recurrent cervical cancer: A phase II randomised dose-ranging study to evaluate optimal biologic dose, safety and efficacy

Annals of Oncology, 2026-12-01. Khurana S, Pramanik R, Malik PS, et al.. [doi:10.1016/j.annonc.2026.08.1738](https://doi.org/10.1016/j.annonc.2026.08.1738)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 6 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-khurana-1449etip-oral-metronomic-chemotherapy-annals-of-oncology-2026`, paperType `rct` (a guess), journals `annals-of-oncology`. Would link to cancers: `cervical`; drugs: `nivolumab`, `relatlimab-nivolumab`; trials: `nct07381309`, `nct05281471`, `nct06463665`.

_No abstract indexed yet: read the paper before writing anything._

## 24. 1536RO ctDNA analysis of the phase 3 KEYNOTE-412 trial: Pembrolizumab (pembro) or placebo (pbo) + concurrent chemoradiotherapy (CRT) for locally advanced head and neck squamous cell carcinoma (LA HNSCC)

Annals of Oncology, 2026-12-01. Machiels JP, Tao Y, Licitra LFL, et al.. [doi:10.1016/j.annonc.2026.08.1826](https://doi.org/10.1016/j.annonc.2026.08.1826)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 7 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-machiels-1536ro-ctdna-analysis-keynote-annals-of-oncology-2026`, paperType `basic` (a guess), journals `annals-of-oncology`. Would link to cancers: `head-and-neck`, `urethral-squamous-cell-carcinoma`, `lung-squamous-cell-carcinoma`; drugs: `pembrolizumab`; trials: `nct06976944`, `nct04153734`, `keynote-412`.

_No abstract indexed yet: read the paper before writing anything._

## 25. 1538RO First interim safety analysis of GORTEC 2024-03 IDEAL: Randomized phase II trial of induction treatment anti–PD-1 pucotenlimab (HX008) plus EGFR-ADC (becotatug vedotin (MRG003) versus EGFR-ADC alone followed by chemoradiotherapy in locally advanced head and neck squamous cell carcinoma

Annals of Oncology, 2026-12-01. Tao Y, Salas S, Sun XS, et al.. [doi:10.1016/j.annonc.2026.08.1828](https://doi.org/10.1016/j.annonc.2026.08.1828)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 10 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-tao-1538ro-first-interim-safety-annals-of-oncology-2026`, paperType `rct` (a guess), journals `annals-of-oncology`. Would link to cancers: `head-and-neck`, `urethral-squamous-cell-carcinoma`, `lung-squamous-cell-carcinoma`; drugs: `mrg003`, `pucotenlimab`, `jmt101`; targets: `egfr`, `pd1`; trials: `idea-collaboration`, `nct07277842`.

_No abstract indexed yet: read the paper before writing anything._

## 26. 1552P Concurrent chemoradiotherapy followed by adjuvant cisplatin-gemcitabine versus cisplatin-fluorouracil in N2-3 nasopharyngeal carcinoma: Final analysis of a multicenter, open-label, phase 3 randomised trial

Annals of Oncology, 2026-12-01. Cheng H, Liu H, Huang Y, et al.. [doi:10.1016/j.annonc.2026.08.1842](https://doi.org/10.1016/j.annonc.2026.08.1842)

**Score 15**: journal tier 4 (+8); randomised or phase 3 (+4); 7 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-cheng-1552p-concurrent-chemoradiotherapy-followed-annals-of-oncology-2026`, paperType `rct` (a guess), journals `annals-of-oncology`. Would link to cancers: `nasopharyngeal`; drugs: `fluorouracil`, `gemcitabine-nab-paclitaxel`, `gemcitabine-cisplatin`, `gemcitabine`, `cisplatin`; trials: `nct04605913`.

_No abstract indexed yet: read the paper before writing anything._

## 27. Conservation of the tumour microenvironment across organs and species

Nature, 2026-11-18. Januszyk M, Lu JM, Korah M, et al.. [doi:10.1038/s41586-026-11270-4](https://doi.org/10.1038/s41586-026-11270-4) · [PubMed 43052431](https://pubmed.ncbi.nlm.nih.gov/43052431/)

**Score 14**: journal tier 5 (+10); 3 records named (+3); 1 citations (+1).

Suggested id `paper-januszyk-conservation-tumour-microenvironment-across-nature-2026`, paperType `basic` (a guess), journals `nature`. Would link to technologies: `single-cell-spatial`, `pathology-foundation-model`; pathways: `tumor-microenvironment`.

> Current understanding of the host tissue response to solid tumours is largely based on investigations of tumour types in isolation 1 . Given the breadth and diversity of human tumour pathology and contributions of tumour microenvironment (TME) cells to disease progression, pan-cancer analysis is needed to bridge major themes of stromal and immune cell evolution. To date, however, efforts to compare the TME response across cancers have been limited in scope 2,3 . Here we conduct a comprehensive pan-cancer analysis by algorithmically screening thousands of publicly available single-cell transcriptomic datasets for stromal and immune signatures across species and tissue types. We demonstrate conserved hallmarks of host cell transcriptional programming in response to malignancy across 42 cancer types in more than 2,000 human and mouse tumour samples. These findings are codified as an interactive web atlas ( tmeatlas.stanford.edu ) and software package (scTME) that will serve as practical resources for the systematic interrogation of the TME in tumours.

## 28. Enfortumab Vedotin and Pembrolizumab for Cisplatin-Eligible Bladder Cancer

New England Journal of Medicine, 2026-11-19. Unknown. [doi:10.1056/nejmc2610895](https://doi.org/10.1056/nejmc2610895) · [PubMed 43050668](https://pubmed.ncbi.nlm.nih.gov/43050668/)

**Score 13**: journal tier 5 (+10); 9 records named (+6); no abstract indexed yet (-3).

Suggested id `paper-anon-enfortumab-vedotin-pembrolizumab-cisplatin-nejm-2026`, paperType `basic` (a guess), journals `nejm`. Would link to cancers: `urothelial`; drugs: `enfortumab-vedotin`, `pembrolizumab`, `gemcitabine-cisplatin`, `cisplatin`; trials: `nct06976944`, `nct04153734`, `nct04605913`; pathways: `bladder-cancer-signalling`.

_No abstract indexed yet: read the paper before writing anything._

## 29. Medical Imaging and Pediatric and Adolescent Brain Tumor Risk

JAMA, 2026-11-19. Miglioretti DL, Alber SA, Kwan ML, et al.. [doi:10.1001/jama.2026.20441](https://doi.org/10.1001/jama.2026.20441) · [PubMed 43056070](https://pubmed.ncbi.nlm.nih.gov/43056070/)

**Score 12**: journal tier 5 (+10); 2 records named (+2).

Suggested id `paper-miglioretti-medical-imaging-pediatric-adolescent-jama-2026`, paperType `observational` (a guess), journals `jama`. Would link to cancers: `brain-tumours`; technologies: `ct`.

> Importance Ionizing radiation from medical imaging may increase brain tumor risk. Objective To quantify brain tumor risk associated with radiation exposure from medical imaging in children and adolescents. Design, Setting, and Participants Retrospective cohort study of children born from 1996 through 2016 who were enrolled from birth in 6 US health care systems or Ontario, Canada, and were alive and cancer-free at age 2 years, with follow-up through December 31, 2017 (US sites), and December 31, 2024 (Ontario). Exposures Cumulative radiation dose to the brain from medical imaging, lagged by 2 years. Main Outcomes and Measures Incident brain or other central nervous system tumors. Hazard ratios (HRs) were estimated using Cox proportional hazards models for categorical dose, and excess relative risks (ERRs) were estimated using linear dose-response models for continuous dose. Results Among 3 704 860 children (1 900 285 [51.3%] male) followed up for 45 671 641 person-years (mean follow-up, 12.3 years), 1536 brain tumors were diagnosed. Mean radiation dose from 1 head computed tomography (CT) examination was 66.2 mGy (SD, 22.2). Among children with cumulative dose of 1 mGy or greater, mean cumulative dose was 73 mGy (SD, 95) overall and 100 mGy (SD, 105) among those diagnosed with brain tumors. Compared with no exposure, brain tumor risk increased with cumulative dose (&amp;gt;0 to &amp;lt;1 mGy: HR, 1.12 [95% CI, 1.01-1.26]; 1 to &amp;lt;5 mGy: HR, 1.71 [95% CI, 0.88-2.96]; 5 to &amp;lt;50 mGy: HR, 1.86 [95% CI, 1.16-2.81]; 50 to &amp;lt;75 mGy: HR, 2.30 [95% CI, 1.64-3.12]; 75 to &amp;lt;100 mGy: HR, 2.02 [95% CI, 1.13-3.30]; 100 to &amp;lt;150 mGy: HR, 2.81 [95% CI, 1.53-4.66]; ≥150 mGy: HR, 3.85 [95% CI, 2.43-5.75]). Cumulative dose was associated with brain tumor risk overall (ERR per 100 mGy, 1.27 [95% CI, 0.83-1.77]; P &amp;lt;.001), with stronger associations for aggressive histologies (ERR per 100 mGy, 1.51 [95% CI, 1.00-2.11]; P &amp;lt;.001). By age 21 years, exposure comparable to 1 head CT was associated with 7.9 excess brain tumors per 10 000 children, or approximately 1 excess tumor per 1266 head CT examinations. The estimated population-attributable fraction was 10.1% (95% CI, 5.8%-14.2%). Conclusions and Relevance Medical imaging in children and adolescents was associated with a dose-related increase in brain tumor risk. These findings support careful clinical justification and dose minimization when pediatric imaging using ionizing radiation is indicated.

## 30. Ferroptosis in cancer cells triggers PGE2 production for tumour immune escape

Nature, 2026-11-18. Ramsauer L, Pedde AM, Hirschberger A, et al.. [doi:10.1038/s41586-026-11333-6](https://doi.org/10.1038/s41586-026-11333-6) · [PubMed 43052444](https://pubmed.ncbi.nlm.nih.gov/43052444/)

**Score 11**: journal tier 5 (+10); 1 record named (+1).

Suggested id `paper-ramsauer-ferroptosis-cancer-cells-triggers-nature-2026`, paperType `basic` (a guess), journals `nature`. Would link to pathways: `ferroptosis-cell-death`.

> Ferroptosis, a form of cell death induced by overwhelming membrane lipid peroxidation, is a vulnerability of many cancers, including cancers resistant to current molecular and immune-based therapies. Triggering of ferroptosis therefore provides an opportunity to achieve elimination of difficult-to-treat cancers. Studies in mouse cancer models have demonstrated that anticancer immunity, mediated by dendritic cells (DCs) and CD8+ T cells, is essential for effective tumour eradication by ferroptosis-inducing strategies. However, ferroptotic cells limit this response, resulting in immune escape and tumour growth through mechanisms that remain unclear. Here we demonstrate that ferroptotic cancer cells activate a molecular program resulting in aberrant production of prostaglandin E2 (PGE2), which limits the stimulation of anticancer CD8+ T cell responses by type 1 conventional DCs (cDC1s), thereby promoting immune escape. In ferroptotic cancer cells, lipid peroxidation-mediated membrane permeabilization enables Ca2+ influx, which activates p38 MAPK signalling and thereby drives PGE2 production. This signalling axis is uncoupled from cancer cell death and can be targeted to selectively interfere with immune-inhibitory PGE2 production while preserving ferroptotic cancer cell elimination. In the context of cancer cell ferroptosis, ablation of PGE2 production or disrupting PGE2 signalling restores cDC1-mediated anticancer CD8+ T cell responses and leads to effective tumour elimination. Our findings identify a key mechanism that limits antitumour immunity and prevents tumour elimination upon ferroptosis induction in cancer cells, which could be exploited for cancer therapy.

## 31. APRIL-based CAR T-cell targeting of BCMA and TACI in multiple myeloma

The Lancet, 2026-11-01. Gyau BB, Freeman CL. [doi:10.1016/s0140-6736(26)02157-4](https://doi.org/10.1016/s0140-6736(26)02157-4) · [PubMed 43044616](https://pubmed.ncbi.nlm.nih.gov/43044616/)

**Score 10**: journal tier 5 (+10); 3 records named (+3); no abstract indexed yet (-3).

Suggested id `paper-gyau-april-based-car-cell-lancet-2026`, paperType `basic` (a guess), journals `lancet`. Would link to cancers: `multiple-myeloma`; targets: `bcma`; related: `bcma-expression`.

_No abstract indexed yet: read the paper before writing anything._

## 32. Sacituzumab tirumotecan in previously treated endometrial cancer

The Lancet, 2026-11-01. Mileshkin L, Au-Yeung G. [doi:10.1016/s0140-6736(26)02250-6](https://doi.org/10.1016/s0140-6736(26)02250-6) · [PubMed 43057255](https://pubmed.ncbi.nlm.nih.gov/43057255/)

**Score 10**: journal tier 5 (+10); 3 records named (+3); no abstract indexed yet (-3).

Suggested id `paper-mileshkin-sacituzumab-tirumotecan-previously-treated-lancet-2026`, paperType `basic` (a guess), journals `lancet`. Would link to cancers: `endometrial`; drugs: `sacituzumab-tirumotecan`; pathways: `endometrial-cancer-signalling`.

_No abstract indexed yet: read the paper before writing anything._

## 33. "Sponge on a string" cancer test is recommended by NICE

BMJ, 2026-11-16. Furneaux R. [doi:10.1136/bmj-2026-101467](https://doi.org/10.1136/bmj-2026-101467) · [PubMed 43039422](https://pubmed.ncbi.nlm.nih.gov/43039422/)

**Score 7**: journal tier 5 (+10); no abstract indexed yet (-3).

Suggested id `paper-furneaux-sponge-string-cancer-test-bmj-2026`, paperType `basic` (a guess), journals `bmj`. No record named in the title or abstract.

_No abstract indexed yet: read the paper before writing anything._

## 34. Doctor who gave cancer patient vitamin C injections in Norway is struck off in UK

BMJ, 2026-11-19. Dyer C. [doi:10.1136/bmj-2026-101517](https://doi.org/10.1136/bmj-2026-101517) · [PubMed 43057712](https://pubmed.ncbi.nlm.nih.gov/43057712/)

**Score 7**: journal tier 5 (+10); no abstract indexed yet (-3).

Suggested id `paper-dyer-doctor-who-gave-cancer-bmj-2026`, paperType `translational` (a guess), journals `bmj`. No record named in the title or abstract.

_No abstract indexed yet: read the paper before writing anything._

## 35. Pediatric Medical Imaging and Brain Tumor Risk

JAMA, 2026-11-19. Persiani F, Boldrini L, De Maria R. [doi:10.1001/jama.2026.20669](https://doi.org/10.1001/jama.2026.20669) · [PubMed 43056111](https://pubmed.ncbi.nlm.nih.gov/43056111/)

**Score 7**: journal tier 5 (+10); no abstract indexed yet (-3).

Suggested id `paper-persiani-pediatric-medical-imaging-brain-jama-2026`, paperType `basic` (a guess), journals `jama`. No record named in the title or abstract.

_No abstract indexed yet: read the paper before writing anything._

## 36. What do various cancers have in common?

Nature, 2026-11-19. Kalucka JM. [doi:10.1038/d41586-026-03379-3](https://doi.org/10.1038/d41586-026-03379-3) · [PubMed 43058282](https://pubmed.ncbi.nlm.nih.gov/43058282/)

**Score 7**: journal tier 5 (+10); no abstract indexed yet (-3).

Suggested id `paper-kalucka-what-various-cancers-have-nature-2026`, paperType `basic` (a guess), journals `nature`. No record named in the title or abstract.

_No abstract indexed yet: read the paper before writing anything._
