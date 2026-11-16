# Care protocols: coverage of the November 2026 census

The census of 11 November 2026 (`docs/proposals/protocols-census-2026-11.json`, commit `267d219eb`, not on `main`) lists 251 protocol subjects in 16 domains. This table, written on 16 November 2026, places every row against the 190 protocols registered in `src/data/protocols/` that day, and records what the round that followed wrote.

Each row is one of three things:

- **own**: a protocol record whose subject is the row;
- **inside**: covered by named steps or variants of another protocol, which the table names;
- **not covered**: no record carried the steps. A row covered only in part counts here, with the missing part named.

The placement was made by reading each protocol's name, population, step actions and variant names, not by matching titles. Where a census row is narrower than the record that holds it (anthracycline extravasation inside the extravasation record), it is "inside" with its step numbers; where a row and a record are the same subject under different names, it is "own".

## Count per domain

| Domain | Rows | Own protocol | Inside another | Not covered on 16 November | Written this round | Still open |
|---|---|---|---|---|---|---|
| Cell therapy and bispecifics | 15 | 11 | 2 | 2 | 2 | 0 |
| Chemotherapy administration | 21 | 13 | 8 | 0 | 0 | 0 |
| Hazardous drug safety | 9 | 1 | 8 | 0 | 0 | 0 |
| Immunotherapy toxicity | 16 | 16 | 0 | 0 | 0 | 0 |
| Infection prevention | 13 | 10 | 2 | 1 | 1 | 0 |
| Oncological emergencies | 17 | 12 | 4 | 1 | 1 | 0 |
| Paediatric | 15 | 8 | 2 | 5 | 5 | 0 |
| Palliative and end of life | 13 | 7 | 4 | 2 | 2 | 0 |
| Patient self-care at home | 8 | 6 | 2 | 0 | 0 | 0 |
| Pharmacy | 6 | 5 | 1 | 0 | 0 | 0 |
| Radiotherapy | 25 | 23 | 1 | 1 | 1 | 0 |
| Screening and diagnostic procedures | 13 | 9 | 1 | 3 | 2 | 1 |
| Supportive care | 34 | 29 | 5 | 0 | 0 | 0 |
| Surgery perioperative | 22 | 17 | 2 | 3 | 3 | 0 |
| Survivorship follow-up | 6 | 5 | 1 | 0 | 0 | 0 |
| Vascular access | 18 | 10 | 8 | 0 | 0 | 0 |
| **All** | **251** | **182** | **51** | **18** | **17** | **1** |

After this round the corpus holds 212 protocols. "Written this round" counts a row once a protocol covers it; 3 of those rows are written in part, with the part still missing named in the table below. A source whose site refused a script was not read by another route and is named in the record's gaps.

## Rows not covered on 16 November, and what happened to each

| Impact | Domain | Census row | What was missing | Outcome |
|---|---|---|---|---|
| 20 | paediatric | Central line care for children with cancer at home and in hospital (Broviac/Hickman, ports) | The adult line records state adult populations; no record covered children. | Written: `paediatric-central-line-care`. The hospital bundle's own elements could not be read in full (abstracts only), so the mask and face-shielding question is a named gap. |
| 20 | paediatric | Intrathecal chemotherapy in children (lumbar puncture, positioning, vinca alkaloid separation) | The intrathecal safety record covers the register, the separate room and vinca separation, not the paediatric lumbar puncture. | Written: `paediatric-intrathecal-chemotherapy`. In part: the lumbar puncture, platelets, needles and care afterwards. The checks for an anaesthetised child and vinca separation in children stay open, because the 2008 national circular (HSC 2008/001) and the 2024 safety alert could not be read from an official host. |
| 20 | radiotherapy | Image-guided verification of daily set-up (portal imaging, cone-beam CT) and action thresholds | Site-specific parts only: steps 7 to 10 of breast-radiotherapy-positioning-and-setup and steps 8 and 9 of stereotactic-radiosurgery-and-sbrt-delivery-safeguards; no general record. | Written: `image-guided-radiotherapy-daily-setup-verification` |
| 20 | screening and diagnostic procedures | Urgent suspected cancer referral and the two-week or faster diagnosis route | No record carried it. | Written: `suspected-cancer-urgent-referral-and-faster-diagnosis`. England's waiting time percentages and its 31-day and 62-day standards are a named gap: england.nhs.uk served nothing to a script. Scotland and Wales are in full. |
| 16 | screening and diagnostic procedures | Holding anticoagulants and antiplatelets before image-guided biopsy and procedures | In part. Surgery and endoscopy have records (antithrombotic-interruption-around-surgery, anticoagulants-and-antiplatelets-before-endoscopy) and liver biopsy is step 3 of the core biopsy record; the interventional radiology rules for image-guided procedures were not covered. | Open. Not written. Every standard that defines it refused a script: the SIR 2019 consensus (403, paywalled), the CIRSE 2021 standards and their 2026 correction (bot check), the BSH 2024 guideline (403) and the ACR practice parameter (challenge page). The thresholds that could be read for lung biopsy are in the lung biopsy record. |
| 12 | infection prevention | Antiviral prophylaxis (HSV/VZV aciclovir, influenza) during treatment | In part. The herpes simplex and zoster half has its own protocol; influenza antiviral prophylaxis and treatment was not covered. | Written: `influenza-antiviral-prophylaxis-and-early-treatment` |
| 12 | paediatric | Echocardiographic surveillance after anthracyclines or chest radiotherapy in childhood cancer survivors | The adult cardio-oncology record's step 11 covers adult survivors only. | Written: `cardiomyopathy-surveillance-after-childhood-cancer`. The adult ESC guideline could not be read, so the comparison is IGHG 2022 against COG version 6.0. |
| 12 | paediatric | Long-term follow-up surveillance for survivors of childhood cancer (exposure-based) | No record carried it. | Written: `long-term-follow-up-after-childhood-cancer` |
| 12 | palliative and end of life | Advance care planning | The last-days record asks about an existing advance statement at step 5; the planning conversation itself had no protocol. | Written: `advance-care-planning-for-adults-with-cancer`. Rests on NICE and the Mental Capacity Act; the NHS England Universal Principles and the GMC guidance could not be read. |
| 12 | palliative and end of life | ReSPECT and DNACPR decisions | No record carried it. | Written: `respect-and-dnacpr-decisions` |
| 12 | surgery perioperative | Prehabilitation before cancer surgery (exercise, nutrition, smoking cessation, psychological support) | In part. Prehabilitation is a step of each enhanced recovery record (step 2 of the colorectal one) and a variant of exercise-during-and-after-cancer-treatment; the smoking cessation part was not covered. | Written: `smoking-cessation-after-a-cancer-diagnosis` |
| 12 | surgery perioperative | Stoma care, output monitoring and dehydration with a new ileostomy | No record carried it. | Written: `stoma-care-after-cancer-surgery`. In part: siting, teaching and follow-up, on the ASCRS 2022 guideline (no funding) and NICE NG151. Output monitoring and dehydration teaching stay open: the RNAO guideline that addresses them could not be read, and no independent source read says which signs to teach, how much to drink or when to call. |
| 10 | cell therapy and bispecifics | Haematopoietic cell transplant: conditioning, neutropenic phase and engraftment monitoring | No record carried it. | Written: `hct-conditioning-and-engraftment-care` |
| 10 | screening and diagnostic procedures | Image-guided core biopsy: preparation and aftercare (breast, liver, lung) | In part. Breast and liver have the record; lung biopsy was not covered. | Written: `image-guided-lung-biopsy-preparation-and-aftercare`. In part: the lung biopsy record rests on the Korean Society of Thoracic Radiology guideline. The BTS guideline could not be read, so there is no UK position and nothing sourced on discharge criteria, observation time or flying. |
| 8 | paediatric | End of life care for children and young people with cancer | The last-days record states that children and young people are outside it. | Written: `paediatric-end-of-life-care` |
| 8 | surgery perioperative | Caring for a surgical drain at home after cancer surgery | No record carried it. | Written: `surgical-drain-care-at-home-after-cancer-surgery`. The evidence is breast and axillary surgery; no guideline on drains after head and neck or abdominal surgery was found. |
| 4 | oncological emergencies | Hyperviscosity syndrome in Waldenstrom and myeloma: plasma exchange | No record carried it. | Written: `hyperviscosity-syndrome-plasma-exchange` |
| 3 | cell therapy and bispecifics | FACT-JACIE standards for cellular therapy programmes | No record carried it. | Written: `fact-jacie-cellular-therapy-accreditation-standards` |

## Subjects outside the census, written or extended this round

The owner's list for this round named subjects the census has no row for. They are recorded here so the next census can absorb them.

| Subject | Outcome |
|---|---|
| Hepatic veno-occlusive disease (sinusoidal obstruction syndrome) after transplant | Written: `hepatic-veno-occlusive-disease-after-transplant`. |
| Peripheral blood stem cell mobilisation and collection | Written: `stem-cell-mobilisation-and-collection`. The ASTCT position on CD34 targets is not shown: only abstracts could be read and they carry no figure. |
| Early palliative care referral triggers | Written: `early-palliative-care-referral`. No readable text gives a number of weeks for the time-based position; the ASCO full texts refused a script. |
| Financial toxicity screening | Written: `financial-toxicity-screening-and-support`. |
| Smoking cessation at diagnosis | Written: `smoking-cessation-after-a-cancer-diagnosis` (also closes the smoking part of the prehabilitation row). |
| Question prompt lists and recorded consultations | Written: `question-prompt-lists-and-consultation-recordings`. |
| Hair care during scalp cooling | Added to `scalp-cooling-during-chemotherapy` (one protocol, one record). |
| Cetuximab and multikinase-inhibitor skin dose modification | Added to `egfr-inhibitor-rash-prophylaxis` and `hand-foot-syndrome-prevention-and-dose-modification`. |

## Existing protocols extended this round

| Protocol | What was added |
|---|---|
| `scalp-cooling-during-chemotherapy` | Three practice steps on hair care (washing, removing shed hair, avoiding heat, dye and tight styles), five variants (the manufacturers' regimens, labelled as industry sources, and the disagreement on preparing Afro-textured hair), eight sources and one upgrade idea. |
| `egfr-inhibitor-rash-prophylaxis` | Seven dose-modification steps read from the current labels (cetuximab US label and EU product information side by side, amivantamab, lazertinib, afatinib, gefitinib, erlotinib), three variants, eight grade rows and seven sources. |
| `hand-foot-syndrome-prevention-and-dose-modification` | Three dose-modification steps (sorafenib for liver or kidney cancer, sorafenib for thyroid cancer, cabozantinib tablets), two variants (sorafenib in the EU text; sunitinib, axitinib and lenvatinib, whose labels give only a general rule), five grade rows and six sources. |

## Every census row

### Cell therapy and bispecifics (15)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 12 | Bispecific T-cell engager step-up dosing, premedication and hospitalisation | own | `bispecific-step-up-dosing` |
| 12 | Infection prophylaxis and immunoglobulin replacement after CAR-T and bispecifics | own | `car-t-infection-prevention` |
| 10 | Cytokine release syndrome: ASTCT grading and tocilizumab/steroid management | own | `crs-grading-and-management` |
| 10 | GVHD prophylaxis after allogeneic transplant (calcineurin inhibitor regimens, post-transplant cyclophosphamide) | own | `allo-hct-gvhd-prophylaxis` |
| 10 | Haematopoietic cell transplant: conditioning, neutropenic phase and engraftment monitoring | not covered | No record carried it. Written: `hct-conditioning-and-engraftment-care` |
| 10 | ICANS: ICE score, ASTCT grading, dexamethasone, seizure prophylaxis | own | `icans-grading-and-management` |
| 8 | After CAR-T: staying near the centre, carer availability and not driving | inside | `car-t-referral-and-eligibility`: step 10 (stay near a healthcare facility and do not drive for two weeks); carer availability for outpatient dosing is step 7 of bispecific-step-up-dosing |
| 8 | Bridging therapy while CAR-T is manufactured | own | `car-t-bridging` |
| 8 | CAR-T referral, eligibility and slot booking | own | `car-t-referral-and-eligibility` |
| 8 | Immune effector cell-associated haematotoxicity (ICAHT): grading, G-CSF, stem cell boost | own | `icaht-prolonged-cytopenia` |
| 8 | Lymphodepleting chemotherapy (fludarabine-cyclophosphamide) and dose adjustment for kidney function | own | `car-t-lymphodepletion` |
| 6 | CAR-T REMS removal (US, June 2025) and what still applies (boxed warning, 15-year follow-up) | inside | `car-t-referral-and-eligibility`: variant "US monitoring after the REMS (FDA 2025)"; the tocilizumab consequence is a variant of crs-grading-and-management |
| 6 | Leukapheresis for CAR-T: washout of prior therapies, line access, cell targets | own | `car-t-apheresis` |
| 5 | IEC-associated HLH-like syndrome (IEC-HS): recognition and anakinra/steroids | own | `iec-hs-management` |
| 3 | FACT-JACIE standards for cellular therapy programmes | not covered | No record carried it. Written: `fact-jacie-cellular-therapy-accreditation-standards` |

### Chemotherapy administration (21)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 25 | Bedside pre-administration checks (two patient identifiers, drug, dose, route, rate, pump programming) | own | `sact-administration-checks-at-the-chair` |
| 25 | DPYD/DPD testing before fluorouracil, capecitabine or tegafur and dose adjustment | own | `dpyd-testing-before-fluoropyrimidines` |
| 25 | Prescription and order verification before SACT (regimen, dose, cycle, labs, independent double check) | own | `sact-prescribing-and-pharmacy-verification` |
| 20 | BSA and weight-based dose calculation, rounding and re-weighing | own | `body-size-based-dose-calculation` |
| 20 | Managing an infusion or hypersensitivity reaction during SACT (stop, assess, grade, treat, rechallenge decision) | own | `infusion-reaction-management` |
| 20 | Oral anticancer medicines at home (dispensing, adherence, missed doses, handling, disposal) | own | `oral-anticancer-medicines-at-home` |
| 20 | Pre-cycle fitness check (blood count, renal and liver function, toxicity assessment) before each cycle | inside | `sact-prescribing-and-pharmacy-verification`: step 12 (blood results every cycle, with kidney and liver adjustment) and step 14; the treatment-day assessment is step 1 of sact-administration-checks-at-the-chair |
| 20 | Premedication before taxanes, antibodies and other reaction-prone agents | own | `premedication-before-reaction-prone-anticancer-drugs` |
| 16 | Carboplatin AUC dosing by the Calvert formula (GFR measurement or estimate, cap) | own | `carboplatin-dose-calculation` |
| 15 | Consent and pre-treatment education for SACT (written plan, side effects, who to call, 24-hour line) | own | `consent-and-education-before-anticancer-treatment` |
| 15 | Recognising and stopping an extravasation (generic first steps, marking, photographing, reporting) | inside | `chemotherapy-extravasation-management`: steps 1 to 7 (recognise, stop, aspirate, call, mark and photograph, remove, classify) and 27 to 30 |
| 15 | Vinca alkaloids by minibag only, never syringe (wrong-route prevention) | inside | `intrathecal-chemotherapy-and-vinca-alkaloid-safety`: steps 7 to 9 (minibag only, no large syringe, written policy) |
| 12 | Ambulatory infusion pumps at home (elastomeric 5-FU pumps: checks, disconnection, spills) | own | `ambulatory-chemotherapy-pumps-at-home` |
| 12 | Cumulative dose tracking (anthracyclines, bleomycin) before each cycle | inside | `sact-prescribing-and-pharmacy-verification`: step 10 (cumulative doses checked at cycle 1) and step 13 (lifetime maximum doses every cycle) |
| 10 | Anthracycline extravasation: dexrazoxane within the window, cold, no DMSO with dexrazoxane | inside | `chemotherapy-extravasation-management`: steps 11 to 14 (dexrazoxane window, dose and infusion; no DMSO with dexrazoxane) and step 8 (cold) |
| 10 | Intrathecal chemotherapy safety (separate time and place, trained register, checks) | own | `intrathecal-chemotherapy-and-vinca-alkaloid-safety` |
| 9 | Full weight-based dosing in obesity (no routine BSA capping) | inside | `body-size-based-dose-calculation`: steps 4 to 6 (actual weight and full doses in obesity); capping is a variant |
| 8 | Dose banding of prepared SACT doses | own | `dose-banding-of-anticancer-drugs` |
| 8 | Rapid drug desensitisation after hypersensitivity to platinum, taxane or antibody | own | `drug-desensitisation-after-anticancer-hypersensitivity` |
| 8 | Vinca alkaloid and other non-DNA-binding vesicant extravasation: hyaluronidase, warmth | inside | `chemotherapy-extravasation-management`: steps 18 and 19 (hyaluronidase) and step 9 (warmth) |
| 6 | Extravasation of alkylating agents, taxanes, platinums and irritants (class-specific measures) | inside | `chemotherapy-extravasation-management`: steps 15 to 17 and 20 to 23 (DMSO, taxanes, sodium thiosulfate, DNA-binding vesicants with no antidote, irritants) |

### Hazardous drug safety (9)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 15 | PPE for handling and administering hazardous drugs (chemotherapy gloves, gowns, eye protection) | inside | `hazardous-drug-handling-in-clinical-areas`: steps 5 and 6 (double gloves, gown, goggles; tested gloves and gowns) |
| 12 | Aseptic compounding of hazardous drugs (containment, cleaning, deactivation) | own | `aseptic-compounding-of-hazardous-anticancer-drugs` |
| 12 | Closed-system drug-transfer devices in compounding and administration | inside | `hazardous-drug-handling-in-clinical-areas`: steps 4 and 8 and the variant on closed systems for every connection; compounding use is step 6 of aseptic-compounding-of-hazardous-anticancer-drugs |
| 12 | Handling oral anticancer medicines by carers (gloves, crushing, pregnancy, disposal) | inside | `oral-anticancer-medicines-at-home`: steps 5 to 8, 11 and 14 (teaching, no crushing, no bare-hand handling, gloves for body fluids) |
| 10 | Body fluids and excreta after chemotherapy at home (toilet, laundry, sex, duration) | inside | `oral-anticancer-medicines-at-home`: steps 13 to 16 (toilet, body fluids, laundry, waste for 48 hours) with two variants on duration; staff handling is step 9 of hazardous-drug-handling-in-clinical-areas |
| 9 | Identifying hazardous drugs (NIOSH list, local assessment of risk) | inside | `hazardous-drug-handling-in-clinical-areas`: steps 1 and 2 (unit list from the NIOSH list; assessment of risk); also step 1 of aseptic-compounding-of-hazardous-anticancer-drugs |
| 9 | Reproductive risk and alternative duty for staff handling hazardous drugs | inside | `hazardous-drug-handling-in-clinical-areas`: step 13 (alternative duties for staff trying to conceive, pregnant or breastfeeding) |
| 8 | Disposal of hazardous drug waste and unused oral SACT | inside | `hazardous-drug-handling-in-clinical-areas`: step 10 (cytotoxic waste); unused oral medicines are steps 16 and 17 of oral-anticancer-medicines-at-home |
| 6 | Hazardous drug spill management (spill kit, containment, reporting) in clinic and at home | inside | `hazardous-drug-handling-in-clinical-areas`: steps 11 and 12 (spill kits, written procedure, respirator); home spills are step 5 of oral-anticancer-medicines-at-home and the ambulatory pump protocol |

### Immunotherapy toxicity (16)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 16 | Immune-related colitis and diarrhoea by grade | own | `irae-colitis` |
| 15 | Baseline tests before starting a checkpoint inhibitor (TSH, cortisol, glucose, LFTs, troponin and ECG where indicated) | own | `checkpoint-inhibitor-baseline-and-monitoring` |
| 15 | Hypophysitis and adrenal insufficiency, including sick-day rules and steroid emergency card | own | `irae-hypophysitis-adrenal` |
| 15 | Immune-related pneumonitis by grade | own | `irae-pneumonitis` |
| 12 | Immune-related hepatitis by grade | own | `irae-hepatitis` |
| 12 | Immune-related skin toxicity including SJS/TEN and DRESS | own | `irae-skin` |
| 12 | Resuming a checkpoint inhibitor after an irAE (rechallenge rules) | own | `irae-rechallenge` |
| 12 | Steroid taper after an irAE, with PJP prophylaxis, glucose and bone protection during prolonged steroids | own | `irae-steroid-taper-and-pjp` |
| 8 | Checkpoint thyroiditis and hypothyroidism monitoring and replacement | own | `irae-thyroid` |
| 6 | Immune-related nephritis | own | `irae-nephritis` |
| 5 | Checkpoint-induced diabetes and diabetic ketoacidosis | own | `irae-diabetes` |
| 5 | Immune checkpoint myocarditis (with myositis and myasthenia overlap) | own | `irae-myocarditis` |
| 5 | Immune-related myasthenia, Guillain-Barre and encephalitis | own | `irae-neurological` |
| 4 | Immune-related cytopenias, haemolysis and HLH | own | `irae-haematological` |
| 4 | Immune-related inflammatory arthritis and polymyalgia | own | `irae-rheumatological` |
| 3 | Immune-related uveitis and episcleritis | own | `irae-ocular` |

### Infection prevention (13)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 25 | Central line maintenance bundle (daily need review, hub disinfection, dressing integrity, CHG bathing) | own | `central-line-maintenance-bundle` |
| 20 | Central line insertion bundle (hand hygiene, chlorhexidine-alcohol skin prep, maximal sterile barrier, site choice, checklist) | own | `central-line-insertion-bundle` |
| 20 | Hand hygiene for staff, patients and visitors (WHO five moments) | own | `hand-hygiene-in-cancer-care` |
| 20 | Hepatitis B screening before therapy and reactivation prophylaxis | own | `hepatitis-b-screening-and-reactivation-prophylaxis` |
| 20 | Protective measures during neutropenia (isolation, visitors, plants, avoidance advice) | own | `neutropenic-precautions-and-daily-life` |
| 20 | Vaccination before and during cancer treatment (inactivated yes, live no; timing; household contacts) | own | `vaccination-around-cancer-treatment` |
| 16 | Pneumocystis (PJP) prophylaxis with co-trimoxazole | own | `pneumocystis-pneumonia-prophylaxis` |
| 15 | Antifungal (mould-active azole) prophylaxis in high-risk haematology | own | `antifungal-prophylaxis-in-haematology` |
| 15 | Food safety during treatment and the evidence against restrictive neutropenic diets | own | `food-safety-and-neutropenic-diet` |
| 12 | Antiviral prophylaxis (HSV/VZV aciclovir, influenza) during treatment | not covered | In part. The herpes simplex and zoster half has its own protocol; influenza antiviral prophylaxis and treatment was not covered. Written: `influenza-antiviral-prophylaxis-and-early-treatment` |
| 12 | Fluoroquinolone prophylaxis for expected profound neutropenia | own | `antibacterial-prophylaxis-in-neutropenia` |
| 12 | Pets, gardening, soil and household safe living during immunosuppression | inside | `neutropenic-precautions-and-daily-life`: steps 4, 6 and 10 (soil and building work, pets, plants) and steps 7, 8 and 11 |
| 12 | Revaccination after stem cell transplant, CAR-T or B-cell depletion | inside | `vaccination-around-cancer-treatment`: steps 7 and 8 (revaccination after transplant; timing after CAR-T) and step 4 (after B-cell depletion) |

### Oncological emergencies (17)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 25 | Temperature checking and when to call the 24-hour line during chemotherapy (patient self-care) | inside | `febrile-neutropenia-first-hour`: steps 1 to 4 (written information and the 24-hour number; suspect sepsis; a normal temperature does not rule it out); the telephone thresholds are steps 5 and 6 of acute-oncology-telephone-triage |
| 20 | 24-hour acute oncology telephone triage (UKONS triage tool, RAG grading) | own | `acute-oncology-telephone-triage` |
| 20 | Febrile neutropenia risk stratification (MASCC index, CISNE) and outpatient oral antibiotics | inside | `febrile-neutropenia-first-hour`: steps 15 to 17 (MASCC within 24 hours, threshold of 21, outpatient oral switch) and the CISNE variant |
| 20 | Sepsis screening for people on anticancer treatment presenting to emergency departments | inside | `febrile-neutropenia-first-hour`: steps 2 to 9 and 14 (NICE NG253 and CG151: suspect, send in, treat as an emergency, senior review within the hour) |
| 20 | Suspected febrile neutropenia: assessment and first antibiotic dose (door-to-needle) | own | `febrile-neutropenia-first-hour` |
| 15 | Metastatic spinal cord compression: red flags, MSCC coordinator, whole-spine MRI, steroids, radiotherapy or surgery | own | `metastatic-spinal-cord-compression-emergency` |
| 15 | Tumour lysis syndrome risk assessment and prophylaxis (hydration, allopurinol or rasburicase, monitoring) | own | `tumour-lysis-syndrome-prevention-and-treatment` |
| 12 | Hypercalcaemia of malignancy: recognition, fluids, bisphosphonate or denosumab, calcitonin | own | `hypercalcaemia-of-malignancy-management` |
| 10 | Established tumour lysis syndrome: treatment and dialysis criteria | inside | `tumour-lysis-syndrome-prevention-and-treatment`: steps 8 to 11 (diagnosis of laboratory TLS, hydration and rasburicase, calcium, renal replacement); one record covers prophylaxis and treatment |
| 10 | Raised intracranial pressure from brain metastases: dexamethasone, imaging, neurosurgical and radiotherapy referral | own | `raised-intracranial-pressure` |
| 8 | Hyponatraemia and SIADH in cancer (small cell lung cancer, drugs): assessment and correction rate | own | `hyponatraemia-siadh` |
| 8 | Malignant bowel obstruction in advanced cancer: decompression, octreotide, steroids, surgery or stent | own | `malignant-bowel-obstruction` |
| 8 | Superior vena cava obstruction: assessment, stenting, steroids, radiotherapy | own | `svc-obstruction` |
| 5 | Hyperleukocytosis and leukostasis in acute leukaemia: cytoreduction and avoiding transfusion-driven viscosity | own | `hyperleukocytosis-leukostasis` |
| 5 | Malignant pericardial effusion and tamponade: echocardiography, pericardiocentesis | own | `malignant-pericardial-effusion` |
| 5 | Neutropenic enterocolitis (typhlitis): bowel rest, broad-spectrum antibiotics, surgical review | own | `neutropenic-enterocolitis` |
| 4 | Hyperviscosity syndrome in Waldenstrom and myeloma: plasma exchange | not covered | No record carried it. Written: `hyperviscosity-syndrome-plasma-exchange` |

### Paediatric (15)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 20 | Central line care for children with cancer at home and in hospital (Broviac/Hickman, ports) | not covered | The adult line records state adult populations; no record covered children. Written: `paediatric-central-line-care`. The hospital bundle's own elements could not be read in full (abstracts only), so the mask and face-shielding question is a named gap. |
| 20 | Fever and neutropenia in children with cancer or after transplant | own | `paediatric-fever-and-neutropenia` |
| 20 | Intrathecal chemotherapy in children (lumbar puncture, positioning, vinca alkaloid separation) | not covered | The intrathecal safety record covers the register, the separate room and vinca separation, not the paediatric lumbar puncture. Written: `paediatric-intrathecal-chemotherapy`. In part: the lumbar puncture, platelets, needles and care afterwards. The checks for an anaesthetised child and vinca separation in children stay open, because the 2008 national circular (HSC 2008/001) and the 2024 safety alert could not be read from an official host. |
| 15 | Preventing chemotherapy nausea and vomiting in children | own | `paediatric-chemotherapy-nausea-vomiting-prevention` |
| 12 | Echocardiographic surveillance after anthracyclines or chest radiotherapy in childhood cancer survivors | not covered | The adult cardio-oncology record's step 11 covers adult survivors only. Written: `cardiomyopathy-surveillance-after-childhood-cancer`. The adult ESC guideline could not be read, so the comparison is IGHG 2022 against COG version 6.0. |
| 12 | Fertility preservation for children, adolescents and young adults before treatment | own | `paediatric-fertility-preservation` |
| 12 | Long-term follow-up surveillance for survivors of childhood cancer (exposure-based) | not covered | No record carried it. Written: `long-term-follow-up-after-childhood-cancer` |
| 12 | Procedural sedation for lumbar punctures, marrow tests and radiotherapy in children | own | `paediatric-procedural-pain-and-sedation` |
| 12 | Vaccination during and after childhood cancer treatment, and return to school | inside | `vaccination-around-cancer-treatment`: steps 12 and 13 (school and classmates' vaccines; inactivated flu vaccine, live vaccines held 6 months) and the paediatric variant; school attendance is step 5 of neutropenic-precautions-and-daily-life |
| 9 | Platelet transfusion thresholds in children with cancer | own | `paediatric-platelet-transfusion-thresholds` |
| 9 | Preventing oral mucositis in children receiving chemotherapy or HSCT | own | `paediatric-oral-mucositis-prevention` |
| 8 | End of life care for children and young people with cancer | not covered | The last-days record states that children and young people are outside it. Written: `paediatric-end-of-life-care` |
| 8 | Food restrictions to prevent infection in children with cancer (neutropenic diet question) | inside | `food-safety-and-neutropenic-diet`: steps 3 and 4 (no routine neutropenic diet for children, including after transplant) |
| 8 | Preventing cisplatin hearing loss in children (sodium thiosulfate, audiology monitoring) | own | `paediatric-cisplatin-hearing-protection` |
| 6 | Managing C. difficile infection in children with cancer | own | `paediatric-clostridioides-difficile` |

### Palliative and end of life (13)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 20 | Opioid conversion and switching (equianalgesic ratios, dose reduction for incomplete cross-tolerance) | own | `opioid-switching-and-conversion` |
| 20 | Starting and titrating strong opioids for cancer pain | own | `strong-opioids-for-cancer-pain` |
| 12 | Advance care planning | not covered | The last-days record asks about an existing advance statement at step 5; the planning conversation itself had no protocol. Written: `advance-care-planning-for-adults-with-cancer`. Rests on NICE and the Mental Capacity Act; the NHS England Universal Principles and the GMC guidance could not be read. |
| 12 | Breakthrough cancer pain: rescue dosing | inside | `strong-opioids-for-cancer-pain`: step 8 (immediate-release morphine first line for breakthrough pain) and step 7, with the variant on rescue dose as a fraction of the daily dose |
| 12 | ReSPECT and DNACPR decisions | not covered | No record carried it. Written: `respect-and-dnacpr-decisions` |
| 12 | Setting up and checking a subcutaneous syringe driver (CSCI) in palliative care | own | `syringe-driver-continuous-subcutaneous-infusion` |
| 10 | Preventing opioid-induced constipation (laxative with every opioid) | inside | `strong-opioids-for-cancer-pain`: steps 9 and 10 (regular laxative for everyone starting; optimise before switching) |
| 9 | Anticipatory (just in case) medicines for the last days of life | inside | `care-in-the-last-days-of-life`: step 14 (anticipatory medicines prescribed early and individually) and step 10 |
| 9 | Drainage of malignant ascites (paracentesis, indwelling peritoneal catheter) | own | `malignant-ascites-drainage` |
| 9 | Draining an indwelling pleural catheter at home | own | `indwelling-pleural-catheter-drainage-at-home` |
| 9 | Managing agitation, breathlessness and noisy breathing in the last days | inside | `care-in-the-last-days-of-life`: steps 11 to 13 (breathlessness, agitation and delirium, noisy breathing) with three variants |
| 9 | Recognising dying and care in the last days of life (hydration, symptoms, communication) | own | `care-in-the-last-days-of-life` |
| 4 | Palliative sedation for refractory symptoms | own | `palliative-sedation-for-refractory-suffering` |

### Patient self-care at home (8)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 12 | Bleeding precautions when platelets are low | own | `bleeding-precautions-when-platelets-are-low` |
| 12 | Sex, contraception and barrier protection during and after chemotherapy | own | `sex-and-contraception-during-chemotherapy` |
| 12 | Storing, handling and disposing of oral anticancer medicines at home | inside | `oral-anticancer-medicines-at-home`: steps 9, 10, 16 and 17 (storage, children and pets, waste, returning leftovers) |
| 10 | Mouth care at home during chemotherapy | inside | `oral-mucositis-prevention-and-oral-care`: steps 2 to 8, 10, 11 and 17 (the daily routine, rinses, food, when to call) |
| 10 | Skin and nail care on chemotherapy and targeted therapy (rash, hand-foot) | own | `skin-and-nail-care-during-cancer-drug-treatment` |
| 6 | Driving, flying and travel insurance during treatment | own | `driving-flying-and-travel-during-cancer-treatment` |
| 5 | Diet, alcohol and weight during treatment | own | `diet-alcohol-and-weight-during-cancer-treatment` |
| 4 | Sun protection on photosensitising treatments and after radiotherapy | own | `sun-protection-during-and-after-cancer-treatment` |

### Pharmacy (6)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 20 | Anticoagulation for cancer-associated VTE (DOAC vs LMWH choice, duration, bleeding risk) | own | `cancer-associated-vte-treatment` |
| 20 | Drug interaction review before and during SACT (CYP3A4, P-gp, QT, acid suppressants) | own | `anticancer-drug-interaction-review` |
| 16 | Renal dose adjustment of anticancer drugs (eGFR vs measured GFR, drug-specific rules) | own | `renal-dose-adjustment-of-anticancer-drugs` |
| 15 | Herbal, supplement and grapefruit interactions with anticancer drugs | inside | `anticancer-drug-interaction-review`: steps 1, 2 and 7 (herbal products and supplements on the list, asked about directly, taught) and the variant on specific herbs |
| 15 | Medicines reconciliation at start of treatment and admission | own | `medicines-reconciliation-in-cancer-care` |
| 12 | Hepatic dose adjustment of anticancer drugs | own | `hepatic-dose-adjustment-of-anticancer-drugs` |

### Radiotherapy (25)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 25 | Patient identification and pre-treatment time-out at the treatment machine | own | `radiotherapy-patient-identification-and-time-out` |
| 20 | Image-guided verification of daily set-up (portal imaging, cone-beam CT) and action thresholds | not covered | Site-specific parts only: steps 7 to 10 of breast-radiotherapy-positioning-and-setup and steps 8 and 9 of stereotactic-radiosurgery-and-sbrt-delivery-safeguards; no general record. Written: `image-guided-radiotherapy-daily-setup-verification` |
| 20 | Linear accelerator quality assurance (daily, monthly, annual checks) | own | `linear-accelerator-quality-assurance` |
| 16 | Deep inspiration breath-hold (DIBH) for left-sided breast radiotherapy | own | `breath-hold-left-breast-radiotherapy` |
| 16 | Radiotherapy consent and pregnancy status check before planning and treatment | own | `radiotherapy-consent` (with `radiotherapy-pregnancy-and-breastfeeding-enquiry`) |
| 15 | Bladder filling and rectal/bowel preparation for pelvic and prostate radiotherapy | own | `prostate-radiotherapy-bladder-and-rectal-preparation` |
| 15 | Breast radiotherapy positioning, immobilisation and set-up verification | own | `breast-radiotherapy-positioning-and-setup` |
| 15 | Standard dose-fractionation schedules by site (UK reference) | own | `radiotherapy-dose-fractionation-reference` |
| 12 | Dental assessment before head and neck radiotherapy and osteoradionecrosis prevention | own | `head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis` |
| 12 | HDR brachytherapy treatment-room safety and source emergency procedure | own | `hdr-brachytherapy-room-safety-and-stuck-source-emergency` |
| 12 | Mouth care and mucositis prevention during head and neck radiotherapy | own | `head-and-neck-radiotherapy-oral-mucositis` |
| 12 | Recognising and managing bowel effects of pelvic radiotherapy (radiation enteritis and proctitis) | own | `pelvic-radiation-disease-bowel-symptoms` |
| 12 | Stereotactic radiosurgery and SBRT delivery safeguards (frame or frameless immobilisation, verification) | own | `stereotactic-radiosurgery-and-sbrt-delivery-safeguards` |
| 12 | Thermoplastic immobilisation mask for head and neck and brain radiotherapy, including mask anxiety and claustrophobia | own | `head-and-neck-radiotherapy-immobilisation-mask` |
| 10 | CT simulation (planning scan): positioning, reference marks and what the patient does | own | `radiotherapy-planning-ct-simulation` |
| 10 | Skin care during radiotherapy and prevention and management of radiation dermatitis | own | `radiation-dermatitis-skin-care` |
| 9 | Radiation safety at home after lutetium-177 PSMA or DOTATATE therapy | own | `lutetium-177-therapy-home-radiation-safety` |
| 9 | Radiation safety at home after radioactive iodine (I-131) for thyroid cancer | own | `radioiodine-therapy-home-radiation-safety` |
| 9 | Release of patients after radionuclide therapy (regulatory criteria and written instructions) | own | `radionuclide-therapy-patient-release-criteria` |
| 9 | Respiratory motion management (4D-CT, gating, abdominal compression, tracking) for lung and upper abdominal radiotherapy | own | `respiratory-motion-management-4d-ct-and-gating` |
| 9 | Risk-based quality management of the radiotherapy process (FMEA) | own | `radiotherapy-risk-analysis-fmea` |
| 8 | Fertility protection before pelvic radiotherapy (ovarian transposition, gonadal shielding, gamete storage) | own | `fertility-protection-before-pelvic-radiotherapy` |
| 8 | Radiotherapy in people with a pacemaker or implanted defibrillator | own | `radiotherapy-with-pacemaker-or-defibrillator` |
| 4 | Radiation precautions at home after permanent prostate seed brachytherapy | own | `permanent-prostate-seed-brachytherapy-home-radiation-safety` |
| 4 | Skin marks and permanent tattoos for radiotherapy set-up, and tattoo-free alternatives | inside | `radiotherapy-planning-ct-simulation`: steps 8 and 9 (reference marks, permanent tattoos or temporary marks) and the tattoo-free variant; also step 6 of breast-radiotherapy-positioning-and-setup |

### Screening and diagnostic procedures (13)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 20 | Urgent suspected cancer referral and the two-week or faster diagnosis route | not covered | No record carried it. Written: `suspected-cancer-urgent-referral-and-faster-diagnosis`. England's waiting time percentages and its 31-day and 62-day standards are a named gap: england.nhs.uk served nothing to a script. Scotland and Wales are in full. |
| 16 | Holding anticoagulants and antiplatelets before image-guided biopsy and procedures | not covered | In part. Surgery and endoscopy have records (antithrombotic-interruption-around-surgery, anticoagulants-and-antiplatelets-before-endoscopy) and liver biopsy is step 3 of the core biopsy record; the interventional radiology rules for image-guided procedures were not covered. Open. Not written. Every standard that defines it refused a script: the SIR 2019 consensus (403, paywalled), the CIRSE 2021 standards and their 2026 correction (bot check), the BSH 2024 guideline (403) and the ACR practice parameter (challenge page). The thresholds that could be read for lung biopsy are in the lung biopsy record. |
| 16 | MRI safety screening with implants, ports and devices | own | `mri-safety-screening-implants` |
| 16 | Prostate biopsy: transperineal versus transrectal route and antibiotic prophylaxis | own | `prostate-biopsy-route-and-antibiotic-prophylaxis` |
| 15 | Iodinated contrast and kidney function (eGFR thresholds, hydration) | own | `iodinated-contrast-kidney-and-metformin` |
| 12 | Prior contrast reaction: premedication and alternative agents | own | `contrast-reaction-history-and-premedication` |
| 10 | Bowel preparation for colonoscopy | own | `bowel-preparation-for-colonoscopy` |
| 10 | Image-guided core biopsy: preparation and aftercare (breast, liver, lung) | not covered | In part. Breast and liver have the record; lung biopsy was not covered. Written: `image-guided-lung-biopsy-preparation-and-aftercare`. In part: the lung biopsy record rests on the Korean Society of Thoracic Radiology guideline. The BTS guideline could not be read, so there is no UK position and nothing sourced on discharge criteria, observation time or flying. |
| 10 | Preparing for FDG PET-CT (fasting, blood glucose, rest, diabetes) | own | `fdg-pet-ct-preparation` |
| 9 | Gadolinium contrast in kidney impairment (NSF risk by agent group) | own | `gadolinium-contrast-kidney-impairment` |
| 9 | Preparing for diagnostic bronchoscopy and EBUS (sedation, anticoagulants, aftercare) | own | `diagnostic-bronchoscopy-and-ebus-preparation` |
| 8 | Bone marrow aspirate and trephine biopsy: preparation, pain control and aftercare | own | `bone-marrow-aspirate-and-trephine-biopsy` |
| 6 | Metformin around contrast-enhanced CT | inside | `iodinated-contrast-kidney-and-metformin`: step 11 (metformin with an eGFR below 30, acute kidney injury or intra-arterial contrast) |

### Supportive care (34)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 16 | Cardio-oncology baseline risk assessment and surveillance (anthracyclines, HER2 therapy, ICIs, VEGF, BTK) | own | `cardio-oncology-risk-assessment-and-cardiac-surveillance` |
| 16 | Chemotherapy and targeted-therapy diarrhoea: grading, loperamide, octreotide, when to admit | own | `treatment-induced-diarrhoea-grading-and-management` |
| 16 | G-CSF primary and secondary prophylaxis by febrile neutropenia risk | own | `g-csf-prophylaxis-by-febrile-neutropenia-risk` |
| 16 | VTE risk assessment (Khorana) and primary thromboprophylaxis for ambulatory chemotherapy | own | `vte-risk-assessment-and-thromboprophylaxis-ambulatory` |
| 15 | Antiemetic prophylaxis by emetic risk (high, moderate, low, minimal), acute and delayed | own | `antiemetic-prophylaxis-by-emetic-risk` |
| 15 | Nutrition risk screening at treatment start and dietitian referral | own | `nutrition-screening-and-support-during-cancer-treatment` |
| 12 | Bone density monitoring and bone protection on aromatase inhibitors and ADT | own | `bone-health-on-hormone-therapy` |
| 12 | CIPN assessment each cycle and dose reduction, with duloxetine for painful neuropathy | own | `chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention` |
| 12 | Chemotherapy-induced anaemia: iron studies, IV iron, ESA criteria | own | `chemotherapy-induced-anaemia-esa-and-iron` |
| 12 | Dental assessment before bone-modifying agents and MRONJ prevention | own | `dental-assessment-before-bone-modifying-agents` |
| 12 | Fertility discussion and referral before gonadotoxic treatment (sperm, oocyte, embryo, tissue) | own | `fertility-preservation-before-cancer-treatment` |
| 12 | Frozen gloves and socks or surgical-glove compression during taxanes and oxaliplatin | inside | `chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention`: step 8 (frozen glove or tight surgical gloves during weekly paclitaxel) and two variants |
| 12 | Geriatric assessment before chemotherapy in older adults | own | `geriatric-assessment-before-systemic-cancer-therapy` |
| 12 | Oral cryotherapy (ice chips) during bolus 5-FU and high-dose melphalan | inside | `oral-mucositis-prevention-and-oral-care`: steps 12 and 13 (ice chips during bolus 5-fluorouracil; cryotherapy with high-dose melphalan) |
| 12 | Red cell and platelet transfusion thresholds in cancer and transplant | own | `red-cell-and-platelet-transfusion-thresholds` |
| 10 | Basic oral care during chemotherapy and transplant (brushing, rinses, dental review) | own | `oral-mucositis-prevention-and-oral-care` |
| 10 | Cancer-related fatigue screening and exercise-first management | own | `cancer-related-fatigue-screening-and-management` |
| 10 | Distress screening (distress thermometer) and referral | own | `distress-screening-and-referral` |
| 9 | Benzydamine mouthwash during head and neck radiotherapy | inside | `head-and-neck-radiotherapy-oral-mucositis`: steps 5 and 6; also step 14 of oral-mucositis-prevention-and-oral-care |
| 9 | Irinotecan early cholinergic syndrome (atropine) and late diarrhoea instructions | own | `irinotecan-early-cholinergic-syndrome-and-late-diarrhoea` |
| 8 | Hand-foot syndrome and hand-foot skin reaction prevention and dose modification | own | `hand-foot-syndrome-prevention-and-dose-modification` |
| 8 | Scalp cooling during chemotherapy: eligibility, wetting, pre- and post-infusion cooling times, hair care | own | `scalp-cooling-during-chemotherapy` |
| 6 | Anticipatory nausea and vomiting: prevention by optimal first-cycle control, behavioural therapy | own | `anticipatory-nausea-and-vomiting` |
| 6 | Chronic pain in cancer survivors | own | `chronic-pain-in-cancer-survivors` |
| 6 | Eye care with ocular-toxic ADCs (belantamab, mirvetuximab, tisotumab): exams, lubricants, steroid drops, dose holds | own | `eye-care-with-ocular-toxic-antibody-drug-conjugates` |
| 6 | GnRH agonist during chemotherapy for ovarian function protection | inside | `fertility-preservation-before-cancer-treatment`: step 9 (GnRH agonist during chemotherapy in premenopausal breast cancer) and the ASCO 2025 variant |
| 6 | Intraoral photobiomodulation to prevent oral mucositis (HSCT, head and neck radiotherapy) | inside | `oral-mucositis-prevention-and-oral-care`: steps 15 and 16; also steps 7 and 8 of head-and-neck-radiotherapy-oral-mucositis |
| 6 | Lymphoedema risk reduction, prospective surveillance and decongestive therapy | own | `lymphoedema-risk-reduction-surveillance-and-treatment` |
| 6 | Nausea and vomiting in advanced cancer not caused by chemotherapy | own | `nausea-and-vomiting-in-advanced-cancer` |
| 6 | Pre-emptive skin care and tetracycline for EGFR-inhibitor rash | own | `egfr-inhibitor-rash-prophylaxis` |
| 4 | Hot flushes on endocrine therapy and ADT: non-hormonal options | own | `hot-flushes-on-endocrine-therapy-non-hormonal-options` |
| 4 | Insomnia: CBT-I first | own | `insomnia-in-adults-with-cancer` |
| 4 | Sexual health assessment and interventions | own | `sexual-health-assessment-and-interventions` |
| 3 | Neratinib diarrhoea prophylaxis (loperamide, dose escalation) | own | `neratinib-diarrhoea-prophylaxis-and-dose-escalation` |

### Surgery perioperative (22)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 20 | Enhanced recovery after colorectal cancer surgery | own | `enhanced-recovery-after-colorectal-surgery` |
| 20 | Extended venous thromboembolism prophylaxis after major abdominal or pelvic cancer surgery | own | `vte-prophylaxis-after-cancer-surgery` |
| 20 | Stopping and restarting anticoagulants and antiplatelets around cancer surgery and biopsies | own | `antithrombotic-interruption-around-surgery` |
| 20 | Surgical site infection prevention bundle (skin preparation, antibiotic timing, normothermia, glucose) | own | `surgical-site-infection-prevention` |
| 16 | Enhanced recovery after gynaecological cancer surgery (including vulvar and vaginal) | own | `enhanced-recovery-after-gynaecological-cancer-surgery` |
| 16 | Enhanced recovery after lung cancer surgery | own | `enhanced-recovery-after-lung-surgery` |
| 12 | Enhanced recovery after breast reconstruction | own | `enhanced-recovery-after-breast-reconstruction` |
| 12 | Holding bevacizumab and other anti-VEGF agents before and after surgery (wound healing) | own | `anti-vegf-drugs-around-surgery` |
| 12 | Lymphoedema risk reduction and limb surveillance after axillary or groin node surgery | inside | `lymphoedema-risk-reduction-surveillance-and-treatment`: steps 1 to 5 and 11 to 13 (risk, baseline and repeat measurement, exercise, skin care, evidence-matched advice); the record is scoped to breast cancer, so groin node surgery is not covered |
| 12 | Prehabilitation before cancer surgery (exercise, nutrition, smoking cessation, psychological support) | not covered | In part. Prehabilitation is a step of each enhanced recovery record (step 2 of the colorectal one) and a variant of exercise-during-and-after-cancer-treatment; the smoking cessation part was not covered. Written: `smoking-cessation-after-a-cancer-diagnosis` |
| 12 | Sentinel node biopsy tracer injection and blue-dye anaphylaxis readiness | own | `sentinel-node-tracers-and-blue-dye-safety` |
| 12 | Stoma care, output monitoring and dehydration with a new ileostomy | not covered | No record carried it. Written: `stoma-care-after-cancer-surgery`. In part: siting, teaching and follow-up, on the ASCRS 2022 guideline (no funding) and NICE NG151. Output monitoring and dehydration teaching stay open: the RNAO guideline that addresses them could not be read, and no independent source read says which signs to teach, how much to drink or when to call. |
| 10 | Preoperative fasting and carbohydrate loading | inside | `enhanced-recovery-after-colorectal-surgery`: step 5 (clear fluids until 2 hours before, carbohydrate drink); the other enhanced recovery records carry their own fasting step |
| 8 | Caring for a surgical drain at home after cancer surgery | not covered | No record carried it. Written: `surgical-drain-care-at-home-after-cancer-surgery`. The evidence is breast and axillary surgery; no guideline on drains after head and neck or abdominal surgery was found. |
| 8 | Enhanced recovery after gastrectomy | own | `enhanced-recovery-after-gastrectomy` |
| 8 | Enhanced recovery after liver surgery | own | `enhanced-recovery-after-liver-surgery` |
| 8 | Enhanced recovery after major head and neck cancer surgery with free flap | own | `enhanced-recovery-after-head-and-neck-free-flap-surgery` |
| 8 | Enhanced recovery after oesophagectomy | own | `enhanced-recovery-after-oesophagectomy` |
| 8 | Enhanced recovery after pancreatoduodenectomy (Whipple) | own | `enhanced-recovery-after-pancreatoduodenectomy` |
| 8 | Enhanced recovery after radical cystectomy | own | `enhanced-recovery-after-radical-cystectomy` |
| 8 | Routine preoperative tests before elective cancer surgery | own | `routine-preoperative-tests` |
| 5 | Enhanced recovery after cytoreductive surgery with or without HIPEC | own | `enhanced-recovery-after-cytoreductive-surgery-and-hipec` |

### Survivorship follow-up (6)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 16 | Cardiac monitoring in adult survivors after anthracyclines, trastuzumab or chest radiotherapy | inside | `cardio-oncology-risk-assessment-and-cardiac-surveillance`: step 11 (after treatment: a low threshold for heart tests and imaging offered to survivors) |
| 15 | Follow-up after breast cancer treatment (mammography schedule, symptoms, endocrine side effects) | own | `breast-cancer-follow-up-after-treatment` |
| 15 | Follow-up after colorectal cancer treatment (CEA, CT, colonoscopy schedule) | own | `colorectal-cancer-follow-up-after-curative-treatment` |
| 10 | Breast cancer screening for women given chest radiotherapy when young (e.g. after Hodgkin lymphoma) | own | `breast-screening-after-chest-radiotherapy-at-a-young-age` |
| 10 | Exercise prescription during and after cancer treatment | own | `exercise-during-and-after-cancer-treatment` |
| 10 | Survivorship care plan and treatment summary at end of treatment | own | `survivorship-care-plan-and-treatment-summary` |

### Vascular access (18)

| Impact | Census row | Status | Where |
|---|---|---|---|
| 20 | Accessing an implanted port with a non-coring (Huber) needle and de-accessing it | own | `implanted-port-access-and-care` |
| 20 | CVAD dressing change and securement (CHG dressing, frequency, sutureless securement) | inside | `picc-and-tunnelled-line-care`: steps 3 to 8 (site check, chlorhexidine, dressing type and interval, chlorhexidine dressing, sutureless securement); also steps 7 to 9 of central-line-maintenance-bundle |
| 20 | Choosing the venous access device for systemic anticancer therapy (peripheral, midline, PICC, tunnelled CVC, port) | own | `venous-access-device-selection-for-anticancer-therapy` |
| 20 | Living with a line at home: showering, swimming, dressing integrity, when to call | inside | `picc-and-tunnelled-line-care`: steps 14 and 15 (water, showering, when to call); teaching before discharge is steps 1 and 2 of community-care-of-vascular-access-devices |
| 20 | Needleless connector hub disinfection ('scrub the hub') and passive disinfecting caps | inside | `central-line-maintenance-bundle`: steps 4 to 6 (scrub the hub, 5 or 15 seconds, sterile access) and step 16 (antiseptic caps); also steps 9 to 11 of picc-and-tunnelled-line-care |
| 20 | Peripheral cannula siting and checks for chemotherapy, including vesicants (site, gauge, blood return, observation) | own | `peripheral-cannula-for-anticancer-therapy` |
| 20 | Suspected line infection: paired cultures, differential time to positivity, line salvage or removal | own | `suspected-central-line-infection` |
| 16 | Implanted chest port insertion (ultrasound-guided venepuncture, tip position, pocket) | inside | `central-venous-catheter-insertion-for-anticancer-therapy`: step 8 (port placement) with steps 4 to 6 and 9, and the SIC-Port bundle variant |
| 16 | PICC insertion bundle (ultrasound guidance, tip location confirmation, maximal sterile barrier) | inside | `central-venous-catheter-insertion-for-anticancer-therapy`: steps 2 to 7 and 9 (checklist, lumens, barrier precautions, ultrasound, tip confirmation) and the ECG tip variant |
| 15 | Blood sampling from a CVAD or port (discard volume, flush, lab accuracy, paired blood cultures) | own | `blood-sampling-from-a-central-line` |
| 15 | Flushing and locking a CVAD (saline vs heparin; pulsatile flush; positive-pressure clamp) | inside | `picc-and-tunnelled-line-care`: step 12 (saline flush and lock) and the heparin lock variant; for ports, steps 8 and 11 of implanted-port-access-and-care |
| 12 | Assessing and clearing a blocked CVAD (no blood return, thrombolytic instillation) | own | `central-line-occlusion-management` |
| 12 | Catheter-related thrombosis: recognition, anticoagulation, keep or remove the line | own | `catheter-related-thrombosis-in-cancer` |
| 12 | Tunnelled central venous catheter (Hickman type) insertion and exit-site care | inside | `central-venous-catheter-insertion-for-anticancer-therapy`: steps 1 to 7 and 9 to 11; exit-site care is steps 3 to 6 of picc-and-tunnelled-line-care and its variant on a healed exit site |
| 9 | CVAD and port removal (end of treatment, infection, malposition; air-embolism precautions) | own | `central-line-removal` |
| 9 | Line care by community and district nurses (NICE primary and community care) | own | `community-care-of-vascular-access-devices` |
| 8 | Maintenance flushing of an unused port between treatments (interval) | inside | `implanted-port-access-and-care`: step 13 (four-weekly flush) and the variant on longer intervals |
| 6 | Midline catheter use and its limits for anticancer drugs | own | `midline-catheters-for-anticancer-therapy` |
