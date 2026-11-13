/**
 * Supportive care gaps, November 2026, part two: the devices and glossary terms the care protocols named that the
 * corpus lacked. Registered in src/data/index.ts; `supportiveCareGapTermBacklinks` maps an existing record to the new
 * records it should list (applied by the census-fill backlink step there).
 *
 * What was read, on 11 November 2026, as raw text:
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections (2011, last update October
 *   2017): the PDF, from the Internet Archive's capture of 4 October 2026 (cdc.gov refused a script). Table 1 is the
 *   source for what a midline and a tunnelled central venous catheter are.
 * - NHSN Patient Safety Component Manual, chapter 4, Bloodstream Infection Event (January 2026): the PDF, from the
 *   Internet Archive's capture of 31 October 2026. The CLABSI and MBI-LCBI definitions are quoted from it.
 * - SHEA/IDSA/APIC Strategies to prevent CLABSI in acute-care hospitals, 2022 update: Europe PMC full text (PMC9096710).
 * - Society for Endocrinology emergency guidance on acute hypercalcaemia (PMC5314807) and on severe symptomatic
 *   hyponatraemia (PMC5314809): Europe PMC full text. Endocrine Society hypercalcaemia of malignancy guideline (2023),
 *   ASCO antiemetics update (2020), MASCC/ISOO/ASCO MRONJ guideline (2019), ISOO-MASCC-ASCO osteoradionecrosis guideline
 *   (2024), Castells 2008, the EAACI position paper (2022), the Hines ASTCT IEC-HS paper (2023), the MAGIC-ONC panel
 *   (2025), Wolf 2018, the 2023 ethanol lock meta-analysis, Castillo 2012 and the 2026 neutropenic enterocolitis cohort:
 *   abstracts through the Europe PMC REST API. The Hines paper was then read in full from PMC (PMC10330221).
 * - Two open-access reviews of hypercalcaemia of malignancy, Sternlicht and Glezerman 2015 (PMC4675637) and Mirrakhimov
 *   2015 (PMC4683803), and the ATS Scholar leukostasis case review (PMC12712836): Europe PMC full text.
 * - ESMO insomnia guideline (2023, PMC10774975), MASCC/ESMO 2023 high-emetic-risk recommendations (PMC10739516), the
 *   AGIHO gastrointestinal complications guideline (2017, PMC5748412) and the CJC Open malignant pericardial effusion
 *   review (2024, PMC11357784): Europe PMC full text.
 * - NCI PDQ Cardiopulmonary Syndromes (health professional) and Oral Complications of Cancer Therapies (health
 *   professional), and the Scottish Palliative Care Guidelines page on raised intracranial pressure: HTML.
 * Every DOI below was resolved through Europe PMC and its title checked against the article.
 *
 * Not read: the ESMO 2015 central venous access guideline (Europe PMC holds no abstract) and the INS Infusion Therapy
 * Standards of Practice (no abstract); neither is cited here.
 */
import type { TechnologyInput, TermInput } from "@/lib/schema";

const asOf = "2026-11-11";
const tags = ["supportive-care-gaps-2026-11"];
const provenance = { editedBy: "OnCo supportive care gap fill (CDC, NHSN, SHEA, Society for Endocrinology, ESMO, MASCC, ASCO, ASTCT, NCI PDQ, Europe PMC)", editedOn: asOf };

type Tc = Omit<TechnologyInput, "kind" | "asOf">;
const tech = (x: Tc): TechnologyInput => ({ kind: "technology", asOf, tags, provenance, ...x } as TechnologyInput);
type Te = Omit<TermInput, "kind" | "asOf">;
const term = (x: Te): TermInput => ({ kind: "term", asOf, tags, provenance, ...x } as TermInput);

const EPMC = (pmid: string) => `https://europepmc.org/article/MED/${pmid}`;
const PMC = (id: string) => `https://europepmc.org/article/PMC/${id}`;

const CDC_2011 = { label: "CDC/HICPAC: Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017), Table 1", url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf" };
const NHSN_BSI = { label: "CDC NHSN Patient Safety Component Manual, chapter 4: Bloodstream Infection Event (CLABSI and non-central line-associated BSI), January 2026", url: "https://www.cdc.gov/nhsn/pdfs/pscmanual/4psc_clabscurrent.pdf" };
const SHEA_2022 = { label: "Buetti et al., Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 update (Infect Control Hosp Epidemiol 2022)", url: PMC("PMC9096710") };
const MAGIC_ONC = { label: "The Michigan Appropriateness Guide for Intravenous Catheters in Adult Patients With Cancer (MAGIC-ONC), Ann Intern Med 2025 (doi 10.7326/ANNALS-25-02523)", url: EPMC("41183333") };
const WOLF_2018 = { label: "Wolf et al., Treatment and secondary prophylaxis with ethanol lock therapy for CLABSI in paediatric cancer: a randomised, double-blind, controlled trial (Lancet Infect Dis 2018; NCT01472965)", url: EPMC("29884572") };
const ETHANOL_META = { label: "Ethanol lock for prevention of CVC-related bloodstream infection in pediatric patients: a systematic review and meta-analysis (J Pediatr Pharmacol Ther 2023)", url: EPMC("38130502") };
const SFE_CA = { label: "Walsh et al., Society for Endocrinology Endocrine Emergency Guidance: emergency management of acute hypercalcaemia in adult patients (Endocr Connect 2016)", url: PMC("PMC5314807") };
const ES_HCM = { label: "Treatment of Hypercalcemia of Malignancy in Adults: An Endocrine Society Clinical Practice Guideline (J Clin Endocrinol Metab 2023)", url: EPMC("36545746") };
const HCM_REVIEW = { label: "Sternlicht and Glezerman, Hypercalcemia of malignancy and new treatment options (Ther Clin Risk Manag 2015)", url: PMC("PMC4675637") };
const HCM_REVIEW_2 = { label: "Mirrakhimov, Hypercalcemia of malignancy: an update on pathogenesis and management (N Am J Med Sci 2015)", url: PMC("PMC4683803") };
const ATS_LEUK = { label: "Pais et al., Management of leukostasis in acute myeloid leukemia (ATS Scholar 2025)", url: PMC("PMC12712836") };
const JHM_LEUK = { label: "Approach to hyperleukocytosis and leukostasis: inpatient management strategies (J Hosp Med 2026)", url: EPMC("41058090") };
const CASTILLO = { label: "Castillo et al., Diagnosis and management of hyponatremia in cancer patients (Oncologist 2012)", url: EPMC("22618570") };
const SFE_NA = { label: "Ball et al., Society for Endocrinology Endocrine Emergency Guidance: emergency management of severe symptomatic hyponatraemia in adult patients (Endocr Connect 2016)", url: PMC("PMC5314809") };
const SCOT_ICP = { label: "Scottish Palliative Care Guidelines: raised intracranial pressure (ICP)", url: "https://www.palliativecareguidelines.scot.nhs.uk/scottish-palliative-care-guidelines/palliative-emergencies/raised-intracranial-pressure-icp/" };
const PDQ_CARDIO = { label: "NCI PDQ: Cardiopulmonary Syndromes, health professional version (malignant pericardial effusion)", url: "https://www.cancer.gov/about-cancer/treatment/side-effects/cardiopulmonary-hp-pdq" };
const CJC_MPE = { label: "Mudra et al., Malignant pericardial effusion: a systematic review (CJC Open 2024)", url: PMC("PMC11357784") };
const HINES_IECHS = { label: "Hines et al., Immune effector cell-associated hemophagocytic lymphohistiocytosis-like syndrome (ASTCT, Transplant Cell Ther 2023)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10330221/" };
const CASTELLS = { label: "Castells et al., Hypersensitivity reactions to chemotherapy: outcomes and safety of rapid desensitization in 413 cases (J Allergy Clin Immunol 2008)", url: EPMC("18502492") };
const EAACI = { label: "Hypersensitivity reactions to chemotherapy: an EAACI position paper (Allergy 2022)", url: EPMC("34587281") };
const MRONJ_2019 = { label: "Yarom et al., Medication-related osteonecrosis of the jaw: MASCC/ISOO/ASCO clinical practice guideline (J Clin Oncol 2019)", url: EPMC("31329513") };
const PDQ_ORAL = { label: "NCI PDQ: Oral Complications of Cancer Therapies, health professional version", url: "https://www.cancer.gov/about-cancer/treatment/side-effects/mouth-throat/oral-complications-hp-pdq" };
const ORN_2024 = { label: "Peterson et al., Prevention and management of osteoradionecrosis in patients with head and neck cancer treated with radiation therapy: ISOO-MASCC-ASCO guideline (J Clin Oncol 2024)", url: EPMC("38691821") };
const ESMO_INSOMNIA = { label: "Grassi et al., Insomnia in adult patients with cancer: ESMO Clinical Practice Guideline (ESMO Open 2023)", url: PMC("PMC10774975") };
const MASCC_HEC = { label: "Herrstedt et al., 2023 updated MASCC/ESMO consensus recommendations: prevention of nausea and vomiting following high-emetic-risk antineoplastic agents (Support Care Cancer 2023)", url: PMC("PMC10739516") };
const ASCO_AE = { label: "Hesketh et al., Antiemetics: ASCO guideline update (J Clin Oncol 2020)", url: EPMC("32658626") };
const AGIHO_GI = { label: "Schmidt-Hieber et al., Diagnosis and management of gastrointestinal complications in adult cancer patients: 2017 updated guidelines of the AGIHO/DGHO (Ann Hematol 2018)", url: PMC("PMC5748412") };
const CID_NEC = { label: "Epidemiology, risk factors and outcomes of neutropenic enterocolitis in onco-haematological patients according to chemotherapy regimen (Clin Infect Dis 2026)", url: EPMC("40112243") };

// ---------------------------------------------------------------------------------------------------------------------
// Devices
// ---------------------------------------------------------------------------------------------------------------------
export const supportiveCareGapTechnologies: TechnologyInput[] = [
  tech({ id: "midline-catheters", name: "Midline catheters (peripheral venous catheters 3 to 8 inches long)", aka: ["Midline", "Midline catheter", "Midline IV"],
    sections: ["supportive-care", "devices"], status: "standard-of-care",
    tldr: "A midline is a thin tube put into a vein near the inside of the elbow or the upper arm. It is longer than an ordinary drip but stops short of the large veins near the heart, so it suits treatments that last more than a few days but are not too harsh for a smaller vein.",
    summary: "The CDC/HICPAC catheter guideline (2011, last updated 2017) describes a midline catheter as 3 to 8 inches long, \"inserted via the antecubital fossa into the proximal basilic or cephalic veins\", one that \"does not enter central veins\". It notes lower rates of phlebitis than short peripheral catheters and lower rates of infection than central venous catheters, and cites a prospective study of 140 midlines with a bloodstream infection rate of 0.8 per 1,000 catheter days, in place for a median of 7 days and up to 49. Its recommendations are to use a midline or a PICC instead of a short peripheral catheter when intravenous therapy will likely last more than six days, and to replace midlines only when there is a specific indication.\n\nBecause the tip lies in a peripheral vein, the choice between a midline and a central line in cancer care turns on what will be infused and for how long. The MAGIC-ONC panel (2025) rated device choice for adults with cancer by cancer type, urgency, infusate and planned dwell time; for chemotherapy in solid tumours it rated a single-lumen tunnelled central venous catheter or an implanted port as appropriate.",
    principle: "A peripheral catheter long enough to sit in the larger upper-arm veins (basilic or cephalic) rather than the forearm, giving a longer dwell than a short cannula without the tip reaching the superior vena cava.",
    strengths: ["Longer dwell than a short peripheral cannula, so fewer repeated needles", "Lower phlebitis rate than short peripheral catheters and lower infection rate than central lines (CDC 2011)", "Placed in an arm vein without a central venous puncture"],
    limitations: ["The tip is not central, so infusates that need a central vein are not given through it", "Not designed for the months-long dwell a port or tunnelled line provides", "Anaphylactoid reactions have been reported with catheters made of elastomeric hydrogel (CDC 2011)"],
    technologies: ["picc-lines", "infusion-devices-vascular-access", "implanted-ports"], terms: ["central-venous-access"],
    links: [CDC_2011, MAGIC_ONC] }),

  tech({ id: "tunnelled-cuffed-central-venous-catheters", name: "Tunnelled cuffed central venous catheters (Hickman-type lines)", aka: ["Hickman line", "Hickman catheter", "Broviac catheter", "Groshong catheter", "Tunnelled central line", "Tunneled CVC", "Skin-tunnelled catheter", "Cuffed central venous catheter"],
    sections: ["chemotherapy", "supportive-care", "devices"], status: "standard-of-care",
    tldr: "A tunnelled line is a soft tube that runs under the skin of the chest for a few centimetres before entering a large vein in the neck or under the collarbone, with its end outside the body. A small cuff under the skin anchors it and helps keep germs out, so it can stay in for months of chemotherapy, blood tests and transfusions.",
    summary: "The CDC/HICPAC catheter guideline (2011, last updated 2017) lists tunnelled central venous catheters as implanted into the subclavian, internal jugular or femoral veins, at least 8 cm long depending on patient size, and notes that the \"cuff inhibits migration of organisms into catheter tract\", with a lower rate of infection than non-tunnelled central lines. Unlike an implanted port the external end stays outside the skin, so it needs regular dressing changes and flushing but no needle through the skin for each use.\n\nIn adults with cancer, the MAGIC-ONC panel (2025, RAND/UCLA appropriateness method) rated a double-lumen PICC or a tunnelled central venous catheter as appropriate for acute haematological cancers needing urgent chemotherapy, regardless of treatment intensity or infusate, and a single-lumen tunnelled catheter or implanted port as appropriate for chemotherapy in solid tumours. The infections these lines can carry are counted as central line-associated bloodstream infections, and the prevention bundles in the SHEA 2022 update apply to them.",
    principle: "A catheter passed through a tunnel under the skin before it enters a large central vein (subclavian, internal jugular or femoral), with its external end outside the skin; a cuff in the tunnel anchors it and inhibits migration of organisms along the catheter tract.",
    strengths: ["Long-term central venous access for treatment, blood tests and transfusion", "Lower infection rate than non-tunnelled central lines (CDC 2011)", "Accessed without a needle through the skin"],
    limitations: ["External end needs dressing changes and flushing", "Bloodstream infection, blood clots in the vein and blockage remain the main risks", "Placement and removal are procedures"],
    technologies: ["implanted-ports", "picc-lines", "infusion-devices-vascular-access", "catheter-lock-solutions", "needleless-connector-disinfecting-caps"], terms: ["central-venous-access"], cancers: ["aml"],
    links: [CDC_2011, MAGIC_ONC, SHEA_2022] }),

  tech({ id: "ethanol-lock-therapy", name: "Ethanol lock therapy for central venous catheters", aka: ["Ethanol lock", "ELT", "70% ethanol lock", "Alcohol lock"],
    sections: ["supportive-care", "devices"], status: "emerging",
    tldr: "An ethanol lock fills an unused central line with strong alcohol for a few hours to kill germs inside it, aiming to prevent or clear a line infection. In children with cancer a randomised trial found it did not stop treatment failing and caused more blocked lines, so it is not routine.",
    summary: "A lock is a solution left to dwell in a catheter lumen between uses; ethanol (usually 70%) is used for its antimicrobial effect. The evidence in cancer is mixed. In the randomised, double-blind trial by Wolf and colleagues (Lancet Infect Dis 2018, NCT01472965), 94 patients aged 6 months to 24 years with cancer or a haematological disorder and a new CLABSI received 70% ethanol or heparinised saline locks for 2 to 4 hours per lumen daily for 5 days, then up to 3 days a week for 24 weeks. The trial stopped for futility: treatment failure was 44% (21 of 48) with ethanol and 43% (20 of 46) with placebo, and occlusion needing thrombolysis was more common with ethanol (58% against 33%). The authors concluded that routine ethanol lock therapy for treatment or secondary prophylaxis is not recommended in that population.\n\nA 2023 meta-analysis of paediatric studies (10 in the meta-analysis) found fewer catheter-related infections with ethanol locks (odds ratio 0.42, 95% CI 0.23 to 0.75), mostly from before-and-after comparisons, with increased thrombosis and catheter breakage, repair and replacement noted in several studies. The SHEA 2022 CLABSI update lists antimicrobial locks as an additional approach for selected patients, such as those with limited venous access and recurrent CLABSI, and says the potential adverse effects of ethanol locks should be carefully considered before use.",
    principle: "Ethanol, usually 70%, is instilled to fill the catheter lumen and left to dwell for its antimicrobial effect; SHEA 2022 advises that antimicrobial lock solutions be aspirated rather than flushed after the dwell, to minimise systemic toxicity.",
    strengths: ["Fewer catheter infections in pooled paediatric before-and-after studies (2023 meta-analysis)"],
    limitations: ["No benefit over placebo for treatment or secondary prophylaxis of CLABSI in the paediatric cancer trial, with more occlusion", "Thrombosis and catheter breakage reported", "Optimal concentration, dwell and schedule are not established"],
    technologies: ["catheter-lock-solutions", "tunnelled-cuffed-central-venous-catheters", "implanted-ports"], terms: ["central-venous-access", "central-line-associated-bloodstream-infection"], cancers: ["childhood-cancers"],
    links: [WOLF_2018, ETHANOL_META, SHEA_2022] }),
];

// ---------------------------------------------------------------------------------------------------------------------
// Glossary terms
// ---------------------------------------------------------------------------------------------------------------------
export const supportiveCareGapTerms: TermInput[] = [
  term({ id: "hypercalcaemia-of-malignancy", name: "Hypercalcaemia of malignancy", category: "Side effects", aka: ["Hypercalcemia of malignancy", "HCM", "Malignant hypercalcaemia", "High calcium in cancer", "Humoral hypercalcaemia of malignancy"],
    tldr: "Some cancers raise the calcium level in the blood, either by releasing a hormone-like protein or by breaking down bone. High calcium causes thirst, passing a lot of urine, constipation, sickness and confusion. It is treated with fluids through a drip and bone-protecting drugs.",
    summary: "The Endocrine Society guideline (2023) calls hypercalcaemia of malignancy the most common metabolic complication of malignancies and notes that its incidence may be declining with more effective cancer treatment. It recommends (strong recommendation) denosumab or an intravenous bisphosphonate, suggests denosumab over a bisphosphonate, and for severe hypercalcaemia suggests calcitonin with a bisphosphonate or denosumab as initial treatment; treating the cancer itself is described as instrumental to control and prevent recurrence.\n\nThe Society for Endocrinology emergency guidance grades severity by calcium adjusted for albumin: below 3.0 mmol/L often without symptoms, 3.0 to 3.5 mmol/L usually needing prompt treatment, and above 3.5 mmol/L needing urgent correction because of the risk of dysrhythmia and coma. High calcium with a low PTH points to malignancy. Reviews describe two main mechanisms, secretion of PTH-related protein by the tumour (humoral hypercalcaemia, about 80% of cases) and bone destruction by osteolytic metastases (about 20%), with calcitriol-mediated cases in lymphoma. Multiple myeloma has the highest prevalence among cancers, breast and renal carcinomas and squamous cell carcinomas of any organ are the commonest solid-tumour causes, and breast cancer and myeloma account for most osteolytic cases.",
    cancers: ["breast-cancer", "multiple-myeloma", "lung-squamous-cell-carcinoma"], technologies: ["bone-modifying-agents"], drugs: ["denosumab", "zoledronic-acid"],
    links: [ES_HCM, SFE_CA, HCM_REVIEW, HCM_REVIEW_2] }),

  term({ id: "leukostasis", name: "Leukostasis (a very high white cell count that blocks small blood vessels)", category: "Side effects", aka: ["Hyperleucocytosis", "Leucostasis", "Leukaemic leukostasis"],
    tldr: "In some leukaemias the white cell count climbs so high that the cells clog small blood vessels, mostly in the lungs and brain, causing breathlessness, confusion or headache. It is an emergency treated by bringing the count down quickly.",
    summary: "Hyperleukocytosis is usually defined as a white blood cell count above 100,000/µL in acute or chronic leukaemia; it can lead to leukostasis, disseminated intravascular coagulation and tumour lysis syndrome. Leukostasis is end-organ injury from microvascular obstruction by leukaemic blasts, a clinical diagnosis that can also occur at counts below 100,000/µL, with pulmonary, renal and cerebral involvement the commonest presentations. Supportive care includes intravenous hydration, uric acid-lowering drugs and cautious transfusion, since raising blood viscosity can worsen leukostasis. Hydroxyurea and cytarabine are used to lower the count before definitive induction chemotherapy; the benefit of leukapheresis on early outcomes has not been definitively shown and practice varies.",
    cancers: ["aml"], terms: ["tumor-lysis-syndrome"], drugs: ["hydroxyurea", "cytarabine"],
    links: [JHM_LEUK, ATS_LEUK] }),

  term({ id: "siadh", name: "SIADH (syndrome of inappropriate antidiuretic hormone secretion)", category: "Side effects", aka: ["SIADH", "Syndrome of inappropriate antidiuresis", "SIAD", "Syndrome of inappropriate ADH", "Hyponatraemia in cancer", "Hyponatremia in cancer"],
    tldr: "SIADH is when the body makes too much of the hormone that holds on to water, so the blood becomes too dilute and its sodium falls. It is most often seen with small-cell lung cancer and with some cancer medicines, and can cause nausea, headache and confusion.",
    summary: "Castillo and colleagues (Oncologist 2012) describe hyponatraemia as a common electrolyte abnormality in oncology, usually caused in people with cancer by SIADH, which develops more often with small-cell lung cancer than with other malignancies. SIADH may come from ectopic production of arginine vasopressin by the tumour or from effects of anticancer and palliative medicines on vasopressin production or action. Treatment depends on symptom severity, speed of onset and volume status: hypertonic saline for acute symptomatic cases, fluid restriction for chronic asymptomatic hyponatraemia, and drugs such as the V2-receptor antagonist tolvaptan when restriction is not enough.\n\nThe Society for Endocrinology emergency guidance grades sodium as mild (130 to 135 mmol/L), moderate (125 to 129) and profound (below 125), and symptoms as severe (vomiting, seizures, reduced consciousness, cardiorespiratory arrest) or moderately severe (nausea without vomiting, confusion, headache), noting that the clinical picture may not match the sodium level.",
    cancers: ["sclc"],
    links: [CASTILLO, SFE_NA] }),

  term({ id: "raised-intracranial-pressure-in-cancer", name: "Raised intracranial pressure in cancer", category: "Side effects", aka: ["Raised ICP", "Raised intracranial pressure", "Increased intracranial pressure", "Intracranial hypertension"],
    tldr: "Raised pressure inside the skull happens when a tumour in or spreading to the brain, or a bleed around it, takes up space. The typical sign is a headache that builds over time and is worse in the morning, often with being sick. It needs urgent assessment and often a brain scan.",
    summary: "The Scottish Palliative Care Guidelines list the symptoms as a headache gradually increasing in severity, classically worse in the morning and on coughing, sneezing or bending, vomiting (commonly without nausea), visual disturbance, dizziness, personality change and seizures; signs such as raised blood pressure, altered consciousness, ocular palsies and papilloedema are often late, and diagnosis usually rests on the history. In people with cancer it may be caused by the tumour or by a bleed into or around it. Management in that guideline includes an urgent CT brain where appropriate, a trial of dexamethasone with gastroprotection (stopped promptly if there is no benefit and reduced gradually in responders), raising the head of the bed, stopping anticoagulants if a bleed is suspected, analgesia and antiemetics, and referral to oncology and neurosurgery.",
    cancers: ["secondary-brain-tumours", "brain-tumours"], terms: ["brain-metastases"], drugs: ["dexamethasone"],
    links: [SCOT_ICP] }),

  term({ id: "pericardial-tamponade", name: "Pericardial tamponade (cardiac tamponade)", category: "Side effects", aka: ["Cardiac tamponade", "Tamponade", "Malignant pericardial effusion with tamponade"],
    tldr: "Tamponade is when fluid builds up in the sac around the heart and squeezes it, so it cannot fill and pump properly. In cancer the fluid usually comes from cancer cells in the sac. Breathlessness is the main symptom, and the fluid is drained with a needle or a small operation.",
    summary: "NCI PDQ (Cardiopulmonary Syndromes) explains that tamponade results from progressive fluid accumulation in the pericardial sac, raising intrapericardial pressure and lowering diastolic filling, stroke volume and cardiac output. Haemodynamic compromise occurs when the normal 15 to 50 mL of pericardial fluid rises to 200 to 1,800 mL, though as little as 250 mL can cause tamponade if it gathers quickly. Signs include tachycardia, pulsus paradoxus, raised jugular venous pressure and hypotension, and echocardiography shows chamber compression. PDQ reports malignant pericardial effusions in up to 21% of people with cancer and that half of cases present with tamponade; lung cancer is the commonest cause in men and breast cancer in women.\n\nIn a 2024 systematic review of 41 published patients with malignant pericardial effusion, dyspnoea was the leading symptom (90%), tamponade was present in 78%, and pericardiocentesis or a pericardial window was performed in 98%.",
    cancers: ["breast-cancer", "lung-cancer"], terms: ["malignant-pleural-effusion", "superior-vena-cava-obstruction"], technologies: ["cardio-oncology"],
    links: [PDQ_CARDIO, CJC_MPE] }),

  term({ id: "iec-hs", name: "IEC-HS (immune effector cell-associated HLH-like syndrome)", category: "Side effects", aka: ["IEC-HS", "Immune effector cell-associated hemophagocytic lymphohistiocytosis-like syndrome", "HLH-like syndrome after CAR-T"],
    tldr: "IEC-HS is a rare, serious overreaction of the immune system after CAR-T cell treatment. It usually comes as the first reaction (cytokine release syndrome) is settling, and shows as very high ferritin, falling blood counts, clotting problems and liver changes. It is treated with drugs that calm the immune system.",
    summary: "An American Society for Transplantation and Cellular Therapy panel (Hines et al., 2023) proposed the term to describe haemophagocytic lymphohistiocytosis (HLH)-like toxicities seen across CAR-T products and patient groups, often not tied to the severity of cytokine release syndrome. It defines IEC-HS as a pathological, biochemical hyperinflammatory syndrome that manifests with features of macrophage activation/HLH, is attributable to immune effector cell therapy, and is associated with progression or new onset of cytopenias, hyperferritinaemia, coagulopathy with hypofibrinogenaemia and/or transaminitis. It is often delayed, manifesting as CRS resolves, and the term should not be used for manifestations of severe CRS alone. Hyperferritinaemia (more than twice the upper limit of normal or baseline, and/or rising rapidly) is a prerequisite for the more specific criteria, and the panel proposes a grading schema and treatment approaches: anakinra with corticosteroids as first-line agents, ruxolitinib where more is needed, and emapalumab as a possible agent whose use in adults is extrapolative.",
    terms: ["crs", "icans"], technologies: ["car-t"], drugs: ["emapalumab", "ruxolitinib"],
    links: [HINES_IECHS] }),

  term({ id: "drug-desensitisation", name: "Drug desensitisation (rapid desensitisation to anticancer drugs)", category: "Treatment jargon", aka: ["Drug desensitization", "Rapid drug desensitization", "Desensitisation protocol", "12-step desensitization", "Induction of drug tolerance"],
    tldr: "If someone has had an allergic-type reaction to a cancer drug they still need, the drug can sometimes be given again very slowly, starting with a tiny dose and stepping up over several hours under close watch. This builds temporary tolerance, so treatment can continue.",
    summary: "Desensitisation induces temporary tolerance to a drug allergen so that a first-choice drug can be continued after a hypersensitivity reaction. In the series by Castells and colleagues (2008), 98 patients who had reacted to carboplatin, cisplatin, oxaliplatin, paclitaxel, liposomal doxorubicin, doxorubicin or rituximab received 413 desensitisations with a standardised 12-step protocol, intravenously or intraperitoneally; 94% induced mild or no reactions, there were no life-threatening reactions or deaths, all patients received their full target dose, and most reactions occurred at the last step. The EAACI position paper (2022) notes that platinum compounds, taxanes, epipodophyllotoxins and asparaginase cause most chemotherapy hypersensitivity reactions, and covers skin tests, drug provocation tests and desensitisation in its recommendations. The tolerance is temporary, so the procedure is repeated for each course.",
    terms: ["extravasation-infusion-reaction"], drugs: ["carboplatin", "oxaliplatin", "paclitaxel", "rituximab"],
    links: [CASTELLS, EAACI] }),

  term({ id: "central-line-associated-bloodstream-infection", name: "Central line-associated bloodstream infection (CLABSI)", category: "Side effects", aka: ["CLABSI", "Central line infection", "Line infection", "Catheter-related bloodstream infection", "CRBSI", "MBI-LCBI"],
    tldr: "A CLABSI is a blood infection in someone who has a central line, such as a PICC, port or tunnelled line, counted when the line had been in for more than two days. Careful line care, clean hands and a chlorhexidine skin clean lower the risk.",
    summary: "For surveillance, the CDC National Healthcare Safety Network (manual chapter 4, January 2026) defines CLABSI as \"a laboratory confirmed bloodstream infection where an eligible BSI organism is identified, and an eligible central line is present on the LCBI DOE or the day before\", an eligible central line being one in place for more than two consecutive calendar days after first access in an inpatient location. Its mucosal barrier injury category (MBI-LCBI) is a subset of laboratory-confirmed bloodstream infection with specified organisms in patients who are allogeneic stem cell transplant recipients within the past year with grade III or IV gut graft-versus-host disease or heavy diarrhoea, or who have neutropenia.\n\nThe SHEA/IDSA/APIC 2022 update stresses that the surveillance definition differs from the clinical diagnosis of catheter-related bloodstream infection (CRBSI), which depends on laboratory methods, catheter removal and tip culture, and names oncology patients among the vulnerable groups prevention should reach. Its essential practices span insertion, maintenance and surveillance.",
    terms: ["central-venous-access", "febrile-neutropenia"], technologies: ["picc-lines", "implanted-ports", "tunnelled-cuffed-central-venous-catheters", "needleless-connector-disinfecting-caps", "catheter-lock-solutions"],
    links: [NHSN_BSI, SHEA_2022] }),

  term({ id: "medication-related-osteonecrosis-of-the-jaw", name: "Osteonecrosis of the jaw (medication-related, MRONJ)", category: "Side effects", aka: ["Osteonecrosis of the jaw", "ONJ", "MRONJ", "Medication-related osteonecrosis of the jaw", "Bisphosphonate-related osteonecrosis of the jaw", "BRONJ"],
    tldr: "A rare side effect of bone-strengthening drugs such as zoledronic acid and denosumab, given for cancer in the bones, in which a patch of jawbone is exposed in the mouth and does not heal. A dental check before starting and avoiding tooth extractions during treatment lower the risk.",
    summary: "The MASCC/ISOO/ASCO guideline (2019) defines medication-related osteonecrosis of the jaw by three criteria: current or previous treatment with a bone-modifying agent or angiogenic inhibitor; exposed bone, or bone that can be probed through an intraoral or extraoral fistula in the maxillofacial region, persisting for longer than 8 weeks; and no history of radiotherapy to the jaws or metastatic disease to the jaws. For people starting a bone-modifying agent, preventive care includes a comprehensive dental assessment, discussion of modifiable risk factors and avoiding elective dentoalveolar surgery during treatment; whether to pause the drug before dental surgery remains uncertain. Staging should be done by an experienced clinician, conservative measures come first, and the guideline stresses collaboration between dentist, dental specialist and oncologist. The radiotherapy exclusion is what separates it from osteoradionecrosis.",
    technologies: ["bone-modifying-agents"], drugs: ["denosumab", "zoledronic-acid", "pamidronate"], related: ["osteoradionecrosis"],
    links: [MRONJ_2019, PDQ_ORAL] }),

  term({ id: "osteoradionecrosis", name: "Osteoradionecrosis of the jaw", category: "Side effects", aka: ["ORN", "Osteoradionecrosis", "Radiation osteonecrosis", "Jaw osteoradionecrosis"],
    tldr: "Bone in the jaw that was in the path of radiotherapy for a head and neck cancer can lose its blood supply and break down, sometimes years later and often after a tooth is taken out. Dental treatment before radiotherapy and careful dental care afterwards lower the risk.",
    summary: "The ISOO-MASCC-ASCO guideline (2024) addresses osteoradionecrosis of the jaw secondary to head and neck radiotherapy. From a systematic review of 80 studies, the panel rated its recommendations on best practices for prevention and on surgical management as evidence-based with strong evidence, relied on informal consensus elsewhere, made no recommendation on leukocyte- and platelet-rich fibrin or photobiomodulation for prevention, and judged hyperbaric oxygen for prevention or management largely unjustified. NCI PDQ (Oral Complications of Cancer Therapies) sets out the dental assessment before high-dose head and neck radiotherapy, scheduled as early as possible so that any extractions can heal before treatment, and lists monitoring for osteoradionecrosis among the follow-up tasks. Medication-related osteonecrosis of the jaw is defined to exclude people who have had radiotherapy to the jaws.",
    cancers: ["head-and-neck"], terms: ["radiotherapy", "late-effects"], related: ["medication-related-osteonecrosis-of-the-jaw"],
    links: [ORN_2024, PDQ_ORAL] }),

  term({ id: "insomnia-in-cancer", name: "Insomnia in people with cancer", category: "Side effects", aka: ["Insomnia", "Sleeplessness", "Sleep problems in cancer", "Chronic insomnia"],
    tldr: "Insomnia is trouble getting to sleep or staying asleep that leaves you distressed or struggling during the day. It is about three times as common in people with cancer as in other people, and a talking treatment called CBT-I is the first thing to try.",
    summary: "The ESMO Clinical Practice Guideline (2023) defines insomnia as difficulties falling asleep and/or maintaining sleep that cause distress and have a negative impact on daily functioning; persistent insomnia means sleep difficulty on at least 3 nights a week for at least 3 months despite adequate opportunity for sleep. It is estimated at 6% to 10% in the general population and three times greater in people with cancer and survivors, is often under-recognised and inadequately treated, and the guideline recommends treating it during active treatment, in long-term survivors and in palliative care, with cognitive behavioural therapy for insomnia as first-line therapy in line with international guidelines.",
    technologies: ["cbt-insomnia-cancer", "sleep-circadian-interventions", "rejuv-mind-sleep-after-cancer"], terms: ["late-effects"],
    links: [ESMO_INSOMNIA] }),

  term({ id: "chemotherapy-induced-nausea-and-vomiting", name: "Chemotherapy-induced nausea and vomiting (CINV)", category: "Side effects", aka: ["CINV", "Chemotherapy nausea", "Chemotherapy sickness", "Emetic risk", "Emetogenicity", "Acute and delayed nausea and vomiting"],
    tldr: "Feeling or being sick after chemotherapy. Some drugs are far more likely to cause it than others, and the anti-sickness medicines given before treatment are chosen to match that risk, so most people are spared the worst of it.",
    summary: "The MASCC/ESMO 2023 recommendations define the emetic risk of an intravenous anticancer drug as the risk of vomiting within the first 24 hours in patients given no antiemetic prophylaxis; high emetic risk means a risk of more than 90%, and includes cisplatin, carmustine, dacarbazine, mechlorethamine, streptozocin, cyclophosphamide above 1,500 mg/m² and anthracycline with cyclophosphamide in breast cancer. Trials score the acute phase (0 to 24 hours) and the delayed phase (24 to 120 hours) separately. Risk also depends on the patient (women and younger people are at higher risk) and on the prophylaxis given. For high-emetic-risk chemotherapy the guidelines recommend combinations of a 5-HT3 receptor antagonist, dexamethasone, an NK1 receptor antagonist and olanzapine. The ASCO 2020 update found no evidence to warrant omitting dexamethasone when checkpoint inhibitors are added to chemotherapy, and checkpoint inhibitors given without chemotherapy need no routine prophylaxis.",
    technologies: ["antiemetic-therapy"], drugs: ["ondansetron", "aprepitant", "dexamethasone", "cisplatin"],
    links: [MASCC_HEC, ASCO_AE] }),

  term({ id: "neutropenic-enterocolitis-typhlitis", name: "Neutropenic enterocolitis (typhlitis)", category: "Side effects", aka: ["Typhlitis", "Neutropenic enterocolitis", "Neutropenic colitis"],
    tldr: "An inflammation and infection of the bowel wall, often near the start of the large bowel, in people whose white cell count is very low after chemotherapy. It causes fever, tummy pain and diarrhoea, and is treated in hospital with antibiotics, fluids and rest for the gut.",
    summary: "The AGIHO/DGHO guideline (2017) calls neutropenic enterocolitis a common chemotherapy-associated complication, particularly in acute leukaemia, with a pooled incidence of 5.3% in hospitalised patients with haematological malignancies, aplastic anaemia or high-dose chemotherapy for solid tumours; high-dose cytarabine with anthracyclines is a major risk factor. Mucosal damage lets bacteria, viruses and fungi invade the bowel wall, Gram-negative Enterobacteriaceae being the commonest organisms in blood cultures. Proposed diagnostic criteria are fever, abdominal pain and bowel wall thickening of more than 4 mm over more than 30 mm on ultrasound or CT. Endoscopy is discouraged because of the risk of perforation, and conservative management (bland diet, hydration and pain relief) is preferred in most cases, with piperacillin-tazobactam, imipenem-cilastatin or meropenem recommended as antibiotics. In a 2026 cohort of 1,259 adults, 178 episodes occurred across 1,963 intensive courses, most during AML induction (13.8% of courses) and autologous transplant conditioning (9.5%), and 30-day mortality was lower than previously reported.",
    cancers: ["aml"], terms: ["febrile-neutropenia", "neutropenia"], drugs: ["cytarabine"],
    links: [AGIHO_GI, CID_NEC] }),
];

/** Existing records that list the new ones (applied in src/data/index.ts; the field follows the new record's kind). */
export const supportiveCareGapTermBacklinks: Record<string, string[]> = {
  "picc-lines": ["midline-catheters", "tunnelled-cuffed-central-venous-catheters"],
  "implanted-ports": ["tunnelled-cuffed-central-venous-catheters"],
  "infusion-devices-vascular-access": ["midline-catheters", "tunnelled-cuffed-central-venous-catheters"],
  "catheter-lock-solutions": ["ethanol-lock-therapy"],
  "central-venous-access": ["central-line-associated-bloodstream-infection"],
  "bone-modifying-agents": ["hypercalcaemia-of-malignancy", "medication-related-osteonecrosis-of-the-jaw"],
  "multiple-myeloma": ["hypercalcaemia-of-malignancy"],
  "aml": ["leukostasis", "neutropenic-enterocolitis-typhlitis"],
  "tumor-lysis-syndrome": ["leukostasis"],
  "sclc": ["siadh"],
  "brain-metastases": ["raised-intracranial-pressure-in-cancer"],
  "malignant-pleural-effusion": ["pericardial-tamponade"],
  "crs": ["iec-hs"],
  "car-t": ["iec-hs"],
  "extravasation-infusion-reaction": ["drug-desensitisation"],
  "head-and-neck": ["osteoradionecrosis"],
  "cbt-insomnia-cancer": ["insomnia-in-cancer"],
  "antiemetic-therapy": ["chemotherapy-induced-nausea-and-vomiting"],
  "febrile-neutropenia": ["neutropenic-enterocolitis-typhlitis"],
};
