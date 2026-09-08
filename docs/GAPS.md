# Gap audit: corpus vs "total information dominance on cancer"

Audited 2026-09-08 against the corpus at commit 2f94c7e (1,574 entities: 31 cancers, 290 products, 72 targets, ~150 technologies, 18 fronts). Method: enumerate the universe (ICD-O cancer sites, WHO classifications, FDA novel approvals 2018-2026, NCCN/ESMO guideline tables, WHO EML, supportive-care guideline bodies) and diff against existing ids. Items marked **filled** are in `src/data/gap-fill.ts` (with cancers in `src/data/spikes/gap-cancers.ts`); the rest are proposals.

Size: S = one record, M = a handful of records or a data-only feature, L = a new page/feature or a full spike.

## A. Cancers missing entirely

| Gap | Why it matters | Who needs it | Proposed fix | Size | Status |
|---|---|---|---|---|---|
| CML | Paradigm of targeted therapy; TFR is a live question; 6 approved TKIs already in corpus without a disease page | Clinicians, patients, students | Cancer record + link nilotinib/bosutinib | M | **filled** |
| MDS | Common in elderly; 2 new drugs 2020-24; 3 phase 3 failures 2023-24 | Haematologists, patients | Cancer record + luspatercept, imetelstat | M | **filled** |
| MPN (PV/ET/MF) | 4 JAK inhibitors + 2026 rusfertide approval, none in corpus | Haematologists, patients | Cancer record + 7 drugs + JAK2 target | M | **filled** |
| Follicular lymphoma | 2nd commonest NHL; 8 approved agents already in corpus lacked a disease | Everyone | Cancer record | M | **filled** |
| Mantle cell lymphoma | TRIANGLE/ECHO changed standard 2024-25; sonrotoclax 2026 | Haematologists | Cancer record + brexu-cel | M | **filled** |
| Peripheral / cutaneous T-cell lymphoma | 30+ subtypes, 5 approved drugs absent | Haematologists | Cancer record + pralatrexate, romidepsin, belinostat, mogamulizumab, CCR4 | M | **filled** |
| Primary CNS lymphoma | Distinct curable brain tumour; transplant vs WBRT debate | Neuro-oncologists | Cancer record + methotrexate | M | **filled** |
| Waldenström, hairy cell leukaemia, BPDCN | Genotype-defined rare leukaemias with dedicated drugs (2015-2026) | Haematologists, rare-disease patients | 3 cancer records + cladribine, moxetumomab, pivekimab, CXCR4 | M | **filled** |
| Merkel cell, cutaneous SCC, basal cell carcinoma | Commonest human cancers (BCC/cSCC) and the most IO-responsive rare one (MCC) had no records; 6 approved drugs absent | Dermatologists, patients | 3 cancer records + retifanlimab, cosibelimab, vismodegib, sonidegib, SMO target | M | **filled** |
| Uveal melanoma | First TCR bispecific (tebentafusp) had no disease context; liver-directed therapy | Ocular oncologists | Cancer record + PHP technology + Hepzato | M | **filled** |
| Testicular germ cell | Most curable adult solid tumour; BEP drugs (bleomycin, etoposide, vinblastine) absent | AYA patients, oncologists | Cancer record + cytotoxics | M | **filled** |
| Anal SCC | HPV-preventable; retifanlimab first-line 2025; ANCHOR screening | GI/HIV clinicians | Cancer record + mitomycin, 5-FU | M | **filled** |
| GIST | 5 TKIs in corpus with no disease record; ctDNA-guided sequencing | GI oncologists, sarcoma centres | Cancer record + PDGFRA | M | **filled** |
| Appendiceal / PMP | Rising in young adults; CRS-HIPEC exemplar | Surgical oncologists | Cancer record | S | **filled** |
| Vulvar, gestational trophoblastic | Gyn cancers without records; GTN = first solid tumour cured by chemo | Gyn oncologists | 2 cancer records | M | **filled** |
| Paediatric: medulloblastoma, osteosarcoma, Ewing, Wilms, retinoblastoma, rhabdomyosarcoma, hepatoblastoma | Paediatric oncology was represented only by neuroblastoma | Paediatric oncologists, families | 7 cancer records + vincristine, dactinomycin, cyclophosphamide, methotrexate, mifamurtide, sodium thiosulfate, EWSR1-FLI1 | L | **filled** |
| CUP | 2-3% of diagnoses; CUPISCO 2024 | Medical oncologists | Cancer record | M | **filled** |
| Nasopharyngeal | 120k cases/yr; 4 PD-1 approvals; EBV DNA screening | Asian centres, ENT | Cancer record + penpulimab + EBV DNA term | M | **filled** |
| Thymic epithelial, adrenocortical, salivary gland, Kaposi sarcoma | Rare adult cancers with distinct drugs (mitotane, pomalidomide-KS, HER2/AR/NTRK in salivary) | Rare-cancer clinics | 4 cancer records | M | **filled** |
| Penile cancer | HPV-related; centralised in UK (eUROGEN); InPACT trial | Urologists | Cancer record | S | open |
| Vaginal cancer | Rare; treated as cervical | Gyn oncologists | Fold into vulvar/cervical records | S | open |
| Gallbladder, small bowel adenocarcinoma, ampullary | Currently implicit in cholangiocarcinoma/colorectal | GI oncologists | Subtype sections in existing records, or 3 S records | S-M | open |
| Laryngeal / hypopharyngeal, oral cavity, oropharynx (HPV+) as separate records | Head-and-neck record is one entity; larynx preservation, TORS, HPV de-escalation each deserve pages | ENT, RT | Split head-and-neck into 4 subtypes via spikes | L | open |
| Marginal zone lymphoma, Burkitt, CNS-penetrant lymphoma subtypes, T-ALL vs B-ALL, CMML, systemic mastocytosis, histiocytoses, Castleman | Remaining WHO haematologic entities | Haematologists | ~8 S records | M | open |
| Paediatric: low-grade glioma, DIPG/DMG (drug dordaviprone exists), germ cell, Langerhans cell histiocytosis, infant ALL | Complete the paediatric front | Paediatric oncologists | 5 S-M records + a paediatric front page | L | open |
| Carcinoid heart / NET subtypes (pheo/paraganglioma, MTC, pituitary, parathyroid) | Endocrine oncology incomplete | Endocrinologists | 3-4 S records | M | open |
| Chordoma, chondrosarcoma, desmoid, TGCT, angiosarcoma, DFSP as separate sarcoma pages | Sarcoma record covers 70 subtypes in one | Sarcoma centres | Spike per subtype | L | open |
| Skin: dermatofibrosarcoma, sebaceous, cutaneous lymphoma covered above | Minor | Dermatology | Fold into records | S | open |
| Precancers as entities (Barrett's, CIN, MGUS, MBL, CHIP/CCUS, adenoma, DCIS, LCIS, actinic keratosis) | Interception is a stated front but precursors are terms not objects | Prevention researchers | New kind or tagged cancer records | L | open |

## B. Approved products missing (FDA novel approvals 2018-2026 + classics)

FDA pages for 2021-2026 were fetched; 2018-2020 pages returned 404 and were reconstructed from knowledge. Of ~75 oncology NMEs 2018-2026, the corpus lacked: mobocertinib, asparaginase (Rylaze/calaspargase), belumosudil, pacritinib, retifanlimab, ensartinib, cosibelimab, penpulimab, taletrectinib, sunvozertinib, treosulfan, rusfertide, pivekimab, momelotinib, imetelstat, glasdegib, larotrectinib, entrectinib, pexidartinib, fedratinib, tazemetostat, mogamulizumab, duvelisib, moxetumomab, dacomitinib, pafolacianine, pegulicianine, fluoroestradiol, Cu-64 DOTATATE, plus narsoplimab and axatilimab (transplant-related, not added). All but the last two are **filled** (status honest: withdrawn for mobocertinib, tazemetostat, moxetumomab, copanlisib, umbralisib, panobinostat).

| Gap | Why it matters | Proposed fix | Status |
|---|---|---|---|
| Classic cytotoxics absent as objects: cyclophosphamide, vincristine, vinblastine, vinorelbine, methotrexate, 5-FU, gemcitabine, oxaliplatin, irinotecan, etoposide, bleomycin, dactinomycin, mitomycin, melphalan, bendamustine, cladribine, eribulin | Regimens (FOLFOX etc.) exist but their components could not be linked, priced or shown as molecules; WHO EML backbone | 17 drug records tagged `who-essential` | **filled** |
| Older targeted agents: erlotinib, gefitinib, afatinib, dacomitinib, crizotinib, ceritinib, brigatinib, nilotinib, bosutinib, temsirolimus, idelalisib, duvelisib, ixazomib, elotuzumab, pomalidomide, thalidomide | History of targeted therapy incomplete; still in guidelines and generic | 16 records | **filled** |
| Hormonal/immunotherapy classics: leuprolide, degarelix, bicalutamide, sipuleucel-T, aldesleukin, interferon alfa, ATRA, arsenic trioxide, hydroxyurea | Foundations of ADT, IL-2, differentiation therapy | 9 records | **filled** |
| Imaging/surgical agents: pafolacianine, pegulicianine, 5-ALA, fluciclovine, FES, Ga-68/Cu-64 DOTATATE, tilmanocept | Diagnostics front lacked approved agents | 7 records | **filled** |
| Supportive agents: sodium thiosulfate, belumosudil, treosulfan, mifamurtide | Paediatric otoprotection, GVHD, conditioning | 4 records | **filled** |
| **Daraxonrasib is `phase-3` in `drugs.ts` but FDA approved it 26 Aug 2026 (Rasonque, metastatic pancreatic cancer)** | Stale status on a headline drug | Parent updates `drugs.ts` status + approvals | open (cannot edit) |
| Still missing: nab-paclitaxel, docetaxel exists but paclitaxel formulations, dexamethasone, carmustine/BCNU wafer, busulfan, fludarabine, cytarabine (single), daunorubicin, idarubicin, mitoxantrone, dacarbazine, procarbazine, streptozocin, ifosfamide exists, topotecan exists, pemetrexed exists, trifluridine exists, lutetium exists; antibodies: alemtuzumab, ofatumumab, ziv-aflibercept, necitumumab, olaratumab (failed), dinutuximab exists; TKIs: sunitinib exists, vandetanib exists, cabozantinib exists, nintedanib exists, lenvatinib exists, tivozanib exists, anlotinib/apatinib/fruquintinib (fruquintinib exists), savolitinib, furmonertinib, ensartinib filled, iruplinalkib; supportive: filgrastim/pegfilgrastim, epoetin, ondansetron/aprepitant/olanzapine, zoledronic acid, denosumab, plerixafor, rasburicase, mesna, leucovorin, dexrazoxane, palifermin, glucarpidase, defibrotide, letermovir, tocilizumab (CRS) | Supportive-care drugs are described inside technologies but not as products; hospital pharmacists and price comparisons need them | ~35 S records, mostly generic; consider a `supportive` modality filter | open |
| EMA-only / China-only approvals (sintilimab, camrelizumab exists, serplulimab exists, anlotinib, savolitinib, catumaxomab re-approval, mifamurtide filled, TNF-α Beromun, nedaplatin, S-1) | Global view of approvals | ~10 records + region filter | open |

## C. Targets and technologies

| Gap | Why it matters | Proposed fix | Status |
|---|---|---|---|
| Targets: JAK2, CD79b, CXCR4, CCR4, TIM-3, SMO, PDGFRA, CSF1R, EWSR1-FLI1, EpCAM, CLDN6, CD73/adenosine, VISTA, MUC16, LIV-1, MDM2, PRMT5/MTAP, WRN, CD52, CD7 | Approved or late-stage agents referenced targets that did not exist; negative-trial targets (TIM-3, CD73, LIV-1) document failures | 20 target records | **filled** |
| Still missing targets: PSCA, MUC1, IL-2R/CD25, IL-15 agonists, CD39, NKG2A, B7-H4, CD24, CEACAM6, DLK1, PTK7, SEZ6, GPNMB, uPAR, integrin αvβ6, FGFR1/3 (fgfr2 only), FLT3 exists, SF3B1/splicing, POLQ, PKMYT1/CCNE1, CDK2, KAT6, SMARCA2, PI3Kδ as class, HDAC as class | Complete the ADC/degrader/synthetic-lethality target map | ~25 S records | open |
| Technologies: palliative care, hospice, pain, palliative RT, psycho-oncology, nutrition/cachexia, prehabilitation, financial navigation, survivorship, fertility preservation, oncology nursing, integrative oncology, antiemetics, bone-modifying agents, G-CSF, transfusion, cancer-associated thrombosis, ePRO monitoring, tumour boards, telehealth, electrochemotherapy, isolated limb perfusion, percutaneous hepatic perfusion, IORT, global oncology access | Supportive-care front had few objects; these are the interventions most patients actually receive | 25 technology records | **filled** |
| Still missing technologies: laser ablation (beyond LITT: endoscopic laser, PDT), photodynamic therapy, cryoablation as separate from thermal-ablation, TACE variants exist, hepatic arterial infusion pump, intrathecal chemotherapy, intraperitoneal chemotherapy (non-HIPEC, PIPAC), stent/ablation for dysphagia, interventional pulmonology, plastic reconstruction (breast, head and neck), lymphoedema management, stoma care, sexual health rehabilitation, cognitive rehabilitation, return-to-work programmes, caregiver support, spiritual care, paediatric anaesthesia/sedation, dental oncology, dermato-oncology toxicity clinics, immunotherapy toxicity (irAE) clinics, oncology pharmacy/dose banding, infection prophylaxis (antifungal, antiviral, PJP), vaccination in cancer patients, blood-product pathogen reduction, registries/cancer surveillance, tumour banks/biobanks, patient-derived xenograft exists, cancer moonshot programmes | Breadth of care delivery | ~30 S-M records | open |

## D. Cross-cutting

| Gap | Why it matters | Proposed fix | Status |
|---|---|---|---|
| Paediatric oncology as a front | 7 new paediatric cancers plus neuroblastoma, ALL now exist but no `section` groups them | Parent adds `paediatric-oncology` section in `sections.ts` + nav entry; tag `paediatric` already applied | open (needs shared file) |
| Rare cancers, disparities/equity, AYA, cancer in pregnancy, hereditary syndromes (pattern: term per syndrome, here Li-Fraumeni and VHL), drug pricing, financial toxicity, workforce, WHO EML, plasma EBV DNA | Programmes and populations that shape care but had no objects | 12 term records | **filled** |
| Guidelines beyond NCCN/ESMO: NICE, ASCO, CSCO, JSMO/JSCO | Guideline mapping field (`guideline.nccn`, `esmoMcbs`) has no slot for other bodies; CSCO/Japan lead on Asian cancers | 4 collection records; propose schema `guideline.nice`, `guideline.asco`, `guideline.csco` fields | **filled** (collections); schema open |
| Patient organisations by cancer | Patients and advocates need them; the review track has an advocate role but no orgs | 14 collection records (ACS, LLS, PanCAN, MMRF, LRF, NBTS, ALSF, St Baldrick's, CRC Alliance, LUNGevity/GO2, MRA, OCRA, Komen, PCF) tagged `patient-org` | **filled** |
| Still missing patient orgs: CRUK exists as institution; Macmillan, Maggie's, Cancer Council Australia, Canadian Cancer Society, Fondation ARC, Deutsche Krebshilfe, Indian Cancer Society, UICC (global), Childhood Cancer International, driver-specific groups (ALK Positive, EGFR Resisters, KRAS Kickers) as records | Global and driver-specific advocacy | ~12 S collections | open |
| Regulatory bodies as objects (FDA OCE, EMA, PMDA, NMPA, Health Canada, TGA, ANVISA) and Project Orbis / Access Consortium | Multi-region approvals comparison needs the regulators themselves | 7 S institution/collection records | open |
| Guideline mapping for the 33 new cancers uses `version`/`url` text; NCCN category strings are best-effort | Trust layer | Reviewer pass on `standardOfCare.guideline` fields | M | open |
| Prevalence/burden numbers in new records are order-of-magnitude with sources in links, not `prevalence` objects | Trust layer | Add sourced `prevalence` rows to targets (partly done: 12 targets) and `burden` citations | M | open |
| Trials referenced by name in new records (TRIANGLE, ECHO, ASC4FIRST, VERIFY, IMerge, COMMANDS, MOMENTUM, C-POST, POD1UM-303, JUPITER-02, EURAMOS-1, rEECur, Euro Ewing 2012, AREN0533, SIOPEL-6, ARST1431, FOCUS, CUPISCO, ANCHOR, IELSG32, ZUMA-2, MAVORIC, ECHELON-2) have no `trial` entities | Trial outcomes/pictograms cannot render for the new cancers | ~25 trial records with outcomes | L | open |
| Molecule structures for the 87 new products | MoleculeThumb shows only if `public/structures/<id>` exists | Run `scripts/fetch-structures.ts` for new small molecules | S | open |
| Logos for 4 guideline bodies and 14 patient orgs | Collections page | Run `scripts/fetch-logos.ts` | S | open |
| Spanish/Chinese/Portuguese/Hindi simple TL;DRs for new records | Language layer | Translation pass | M | open |
| Foundational models, mechanism research map, supporting technologies/companies | Parallel agents are producing these; not duplicated here | — | — | other agents |

## Top 15 gaps by value (summary)

1. Haematologic malignancies beyond AML/ALL/CLL/DLBCL/HL/MM: CML, MDS, MPN, FL, MCL, PTCL, PCNSL, WM, HCL, BPDCN — filled.
2. Paediatric solid tumours: medulloblastoma, osteosarcoma, Ewing, Wilms, retinoblastoma, rhabdomyosarcoma, hepatoblastoma — filled; paediatric front section still needs the shared file.
3. Skin cancers other than melanoma: BCC, cSCC, Merkel cell — filled.
4. Classic cytotoxics as first-class products (17 WHO-essential drugs) — filled.
5. Supportive and survivorship care as objects (25 technologies) — filled.
6. FDA novel approvals 2018-2026 absent from corpus (~30 products) — filled except narsoplimab/axatilimab.
7. Daraxonrasib approval status stale in drugs.ts — open (shared file).
8. GIST, testicular, anal, uveal melanoma, CUP, nasopharyngeal — filled.
9. Rare adult cancers: thymic, adrenocortical, salivary, Kaposi, GTN, vulvar, appendiceal — filled.
10. Negative-trial and next-wave targets (TIM-3, CD73, VISTA, PRMT5/MTAP, WRN, MDM2, CLDN6, EpCAM) — filled.
11. Guidelines beyond NCCN/ESMO (NICE, ASCO, CSCO, JSMO) — filled as collections; schema slots open.
12. Patient organisations by cancer (14) — filled; international orgs open.
13. Equity, global oncology, workforce, pricing, financial toxicity, AYA, pregnancy, hereditary syndromes — filled as terms/technology.
14. Trial entities for ~25 pivotal trials named in new records — open.
15. Supportive-care drugs (G-CSF, antiemetics, bisphosphonates, denosumab etc.) as products, and precancers as entities — open.
