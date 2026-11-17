import { protocol } from "./helpers";

/*
 * Testing for DPD deficiency before fluorouracil, capecitabine or tegafur, and what the result changes.
 *
 * Second accuracy pass on 17 November 2026: every source below was fetched again with curl into a scratch directory and
 * read as raw text, and all sixteen quotes were checked verbatim by script. The dosing by activity score was wrong: the
 * page carried CPIC's printed 2017 table, which CPIC revised on its guideline page in November 2018 so that every
 * intermediate metaboliser starts at half the standard dose. Those updates, the CPIC supplement, the French evaluation
 * of September 2023 and the NHS England commissioning statement were read for the first time and are now sources.
 *
 * What was read, and how (on 17 November 2026 unless said otherwise, fetched raw with curl into a scratch directory and
 * read as text):
 * - EMA, "EMA recommendations on DPD testing prior to treatment with fluorouracil, capecitabine, tegafur and
 *   flucytosine" (EMA/229267/2020, 30 April 2020): full text of the web page.
 * - MHRA Drug Safety Update volume 14, issue 3 (22 October 2020), the UK implementation of the EU review: full text of
 *   the gov.uk page.
 * - Xeloda (capecitabine) EU summary of product characteristics, from the EMA product-information PDF (last updated on
 *   the EPAR page 2 May 2025): full text with pdftotext; the DPD testing passage, the indicative uracil thresholds and
 *   the patient leaflet are quoted from it.
 * - Xeloda US prescribing information, DailyMed SPL (setid e702d84d-7162-4751-bf37-d724cc7e45a5, version 32, effective
 *   5 February 2026, boxed warning and sections 2.1 and 5.1 revised 10/2025): full text of the SPL XML.
 * - CPIC guideline for DPYD and fluoropyrimidine dosing, 2017 update (Amstutz et al., Clin Pharmacol Ther 2018,
 *   PMC5760397): full text from NCBI E-utilities (the Europe PMC full-text endpoint returned 500) and from CPIC's own
 *   PDF at files.cpicpgx.org, with the supplement, which defines the strength-of-recommendation scheme.
 * - CPIC's guideline page updates for fluoropyrimidines and DPYD. The page itself now serves no text without
 *   JavaScript, so the updates of November 2018, January 2024 and July 2026 and CPIC's current recommendation records
 *   were read as raw JSON from CPIC's and ClinPGx's public APIs (api.cpicpgx.org, api.clinpgx.org).
 * - DPWG guideline for DPYD and fluoropyrimidines (Lunenburg et al., Eur J Hum Genet 2020, PMC7080718): full text from
 *   the Europe PMC XML.
 * - Haute Autorite de Sante and Institut national du cancer, methods for finding DPD deficiency, validated September
 *   2023: full text of the HAS publication page.
 * - NHS England clinical commissioning urgent policy statement URN 1869 on DPYD testing: full text with pdftotext of
 *   the Internet Archive copy of 16 March 2023, the live england.nhs.uk copy answering a bot check.
 * - AMP, ACMG, CPIC, CAP, DPWG, ESPT, PharmGKB and PharmVar joint consensus on DPYD genotyping (Pratt et al., J Mol
 *   Diagn 2024): abstract only again on 17 November 2026; the Europe PMC full-text endpoint returned 500 and
 *   E-utilities returns the front matter and abstract.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed.
 */
export const dpydTestingBeforeFluoropyrimidines = protocol({
  id: "dpyd-testing-before-fluoropyrimidines",
  name: "DPD deficiency testing before fluorouracil, capecitabine or tegafur, and dosing by the result",
  aka: ["DPYD test", "DPD test", "DPYD genotyping before chemotherapy", "uracil test before capecitabine", "DPD deficiency screening", "fluoropyrimidine pharmacogenetic testing", "DPYD activity score dosing"],
  domain: "chemotherapy-administration",
  tldr: "Before your first dose of fluorouracil (5-FU) given into a vein, capecitabine tablets or tegafur, you should have a blood test for DPD deficiency. A few people break these drugs down very slowly, and a normal dose can make them seriously ill. If the test finds this, the dose is lowered or a different drug is chosen. A normal result does not rule out side effects, so still report them quickly.",
  simple: "Some people's bodies cannot clear 5-FU or capecitabine properly. A blood test before the first dose finds most of them, so the dose can be made safe. Ask your team whether you have had it.",
  summary: "Fluoropyrimidines are cleared by dihydropyrimidine dehydrogenase (DPD). The EU review of 2020 recommends phenotype and/or genotype testing before systemic fluorouracil, capecitabine or tegafur, contraindicates them in known complete deficiency and advises a reduced starting dose in partial deficiency; the MHRA adopted the same advice for the UK in October 2020 ('test all patients'), and NHS England has commissioned the test for every patient since August 2020. Since October 2025 the US capecitabine label also tells prescribers to test for DPYD variants before starting unless treatment is urgent, while noting no FDA-authorised test exists.\n\nThere are two ways to test. Genotyping reads the four DPYD variants named in the EU product information and in the NHS England policy: c.1905+1G>A (rs3918290, DPYD*2A), c.1679T>G (rs55886062, DPYD*13), c.2846A>T (rs67376798) and c.1236G>A/HapB3 (rs56038477, the tag for c.1129-5923C>G, rs75017182). All four are considered virtually absent in people of African or Asian ancestry. Phenotyping measures plasma uracil: the EU product information and the French evaluation of 2023 both treat 16 to under 150 ng/mL as indicative of partial and 150 ng/mL or more as indicative of complete deficiency, to be read with caution when kidney function is impaired.\n\nDosing by genotype uses an activity score from 0 to 2. CPIC's printed 2017 table reduced the dose by 50% at a score of 1 and by 25 to 50% at 1.5, but CPIC revised that on its guideline page in November 2018: every intermediate metaboliser, score 1 or 1.5, starts at half the standard dose and is then titrated, and a homozygous c.[2846A>T];[2846A>T] genotype may need more than a 50% reduction. CPIC avoids fluorouracil and its prodrugs at a score of 0 or 0.5 and makes no recommendation for tegafur. DPWG (2020) also starts at 50% at scores 1 and 1.5, avoids fluorouracil and capecitabine at 0, avoids tegafur at any score below 2, recommends phenotyping where the genotype cannot be scored, and calls testing 'essential'. In July 2026 CPIC posted that its next update will give HapB3 an allele value of 0.75, making a heterozygous carrier score 1.75 and start at 75% of the intended dose; that full update is not yet published. Every source says severe toxicity can still occur with a normal result, most often in the first cycle or after a dose increase.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "nurse"],
    where: ["outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "Adults about to start systemic fluorouracil (intravenous), capecitabine or tegafur (as in S-1) for any cancer. Not topical fluorouracil, for which the EU and UK regulators say testing is not required because so little is absorbed. Flucytosine, an antifungal, is covered by the same EU review with different advice and is out of scope. CPIC states that data in children are extremely scarce.",
  trigger: "A fluoropyrimidine-containing regimen is planned for the first time.",
  steps: [
    {
      action: "Before the first dose, send a DPD deficiency test for every patient due to start intravenous fluorouracil, capecitabine or tegafur",
      why: "In people of European ancestry, up to half of one per cent lack the enzyme completely and three to nine per cent have a partial lack (MHRA figures); at a normal dose they can have severe or fatal side effects.",
      source: "mhra-dsu-2020",
      quote: "test all patients for DPD deficiency before initiation of treatment with these products",
    },
    {
      action: "Ask the patient whether they or anyone in their family has been found to have DPD deficiency",
      why: "A known family history can identify a risk the standard test misses, and the result already known in a relative can speed the decision.",
      source: "mhra-dsu-2020",
      quote: "ask patients whether they or their family members have history of complete or partial DPD deficiency",
    },
    {
      action: "Test by genotype (the four DPYD variants), by measuring blood uracil, or both, following local guidance",
      why: "The EU recommends testing without fixing the method: genotyping reads inherited variants, while a uracil level measures how well the enzyme is working.",
      source: "xeloda-smpc",
      quote: "Phenotype and/or genotype testing prior to the initiation of treatment with Xeloda is recommended despite uncertainties regarding optimal pre-treatment testing methodologies.",
    },
    {
      action: "Read a uracil result against the EU thresholds, with caution if kidney function is reduced",
      why: "A high uracil level suggests the enzyme is not working, but poor kidney function can also raise it and give a false alarm.",
      source: "xeloda-smpc",
      quote: "Despite uncertainties on uracil thresholds defining complete and partial DPD deficiency, a blood uracil level ≥ 16 ng/mL and < 150 ng/mL should be considered indicative of partial DPD deficiency and associated with an increased risk for fluoropyrimidine toxicity.",
    },
    {
      action: "Do not give fluorouracil, capecitabine or tegafur to anyone with known complete DPD deficiency",
      why: "Without the enzyme the drug builds up to dangerous levels; no dose has been shown to be safe.",
      source: "ema-2020",
      quote: "Treatment with fluorouracil, capecitabine or tegafur-containing medicines is contraindicated in patients with known complete DPD deficiency.",
    },
    {
      action: "Treat a homozygous or compound heterozygous result as complete deficiency where the pair includes c.1905+1G>A or c.1679T>G",
      why: "Two damaged copies of the gene, where at least one of them is one of the two most damaging variants, leave almost no working enzyme.",
      source: "xeloda-smpc",
      quote: "Certain homozygous and compound heterozygous mutations in the DPYD gene locus (e.g. combinations of the four variants with at least one allele of c.1905+1G>A or c.1679T>G) are known to cause complete or near complete absence of DPD enzymatic activity.",
    },
    {
      action: "For a heterozygous carrier, start at half the standard dose, whether the activity score is 1 or 1.5, then adjust",
      why: "Half the usual first dose brings the risk of severe side effects in carriers close to that of non-carriers, and the dose is then set by how the first cycles are tolerated.",
      source: "cpic-updates",
      quote: "CPIC revised its recommendation such that all DPYD Intermediate Metabolizers should receive a 50% dose reduction from the full standard starting dose, whether the activity score is 1 or 1.5 followed by dose titration, based on clinical judgement and ideally therapeutic drug monitoring.",
      grade: "Activity score 1: Strong Activity score 1.5: Moderate",
    },
    {
      action: "Raise the dose in later cycles if the first two cycles are well tolerated, and lower it if not",
      why: "Some carriers tolerate a full dose, and staying on a reduced dose without need may make the treatment less effective.",
      source: "cpic-2017",
      quote: "Given that some patients carrying decreased or no function variants tolerate normal doses of 5-fluorouracil, to maintain effectiveness, doses should be increased in subsequent cycles in patients experiencing no or clinically tolerable toxicity in the first two chemotherapy cycles or with subtherapeutic plasma concentrations.",
    },
    {
      action: "Watch every patient closely in the first cycle and after any dose increase, whatever the test showed",
      why: "Most severe reactions from DPD deficiency appear in the first cycle, and the test does not find every person at risk.",
      source: "mhra-dsu-2020",
      quote: "monitor all patients for toxicity particularly during the first cycle of treatment or after a dose increase",
    },
    {
      action: "Tell the patient that a normal result does not rule out severe side effects, and give them the patient information leaflet",
      why: "The leaflet tells the patient to stop the tablets and contact their doctor straight away for severe diarrhoea, mouth sores, or a temperature of 38°C or greater.",
      source: "mhra-dsu-2020",
      quote: "advise patients that despite negative test results for DPD deficiency, severe toxicity may still occur and ensure they have a copy of the patient information leaflet",
    },
    {
      action: "Tell the patient that severe mouth sores, diarrhoea, infection or nerve symptoms in the first cycle may mean DPD deficiency",
      why: "These are the side effects the leaflet links to a lack of the enzyme, and they are the reason to ring the team rather than wait.",
      source: "xeloda-smpc",
      quote: "If severe stomatitis (sores in your mouth and/or throat), mucosal inflammation, diarrhoea, neutropenia (increased risk for infections), or neurotoxicity occurs during the first cycle of treatment, a DPD deficiency may be involved",
    },
    {
      action: "For an overdose, give uridine triacetate within 96 hours",
      why: "Uridine triacetate is an antidote that limits the damage fluorouracil does when there is too much of it.",
      source: "fda-xeloda-2025",
      quote: "Administer uridine triacetate within 96 hours for management of XELODA overdose.",
    },
  ],
  bestInClass: {
    statement: "Test before the first systemic dose, act on the result, and keep watching. Europe and the UK test every patient (EMA 2020, MHRA 2020), by genotype, uracil level or both, and NHS England commissions the four-variant genotype test for every patient starting a fluoropyrimidine, once only, as the result holds for later regimens; the US label has since October 2025 told prescribers to genotype before capecitabine unless treatment is urgent. Avoid fluoropyrimidines in complete deficiency. For partial deficiency by genotype the two pharmacogenetic guidelines now agree: half the standard starting dose at activity score 1 (CPIC strong) and at 1.5 (CPIC moderate), then titration by tolerance, which is CPIC's position since the November 2018 update of its guideline page and DPWG's since 2020. CPIC adds that a homozygous c.[2846A>T];[2846A>T] genotype may need more than a 50% reduction and that doses should be raised after two tolerated cycles. DPWG alone recommends phenotyping where the genotype cannot give a score and for any homozygous carrier, and avoiding tegafur in any carrier. A normal result does not remove the need to monitor the first cycle.",
    sources: ["ema-2020", "mhra-dsu-2020", "nhse-2020", "xeloda-smpc", "fda-xeloda-2025", "cpic-2017", "cpic-updates", "dpwg-2020"],
  },
  variants: [
    {
      name: "Uracil phenotyping instead of, or as well as, genotyping",
      differs: "Measures plasma uracil before treatment rather than reading DPYD variants. France chose this route: its 2023 health technology evaluation concludes that measuring plasma uracil is the test best able to find complete deficiency, with the same thresholds as the EU product information (16 to under 150 ng/mL partial, 150 ng/mL or more complete deficiency).",
      evidence: "The EU review accepted both methods because the best one is uncertain. A uracil test can find deficiency from causes other than the four common variants, but kidney impairment raises uracil and can mislead. The French evaluation sets handling conditions for the sample, says the threshold figures must be read knowing that risk rises continuously with the uracil level, and asks for the result within seven days of the request and at most ten, because a later start could harm the patient. DPWG recommends phenotyping where a genotype cannot be scored, and for any homozygous carrier.",
      sources: ["xeloda-smpc", "mhra-dsu-2020", "has-2023", "dpwg-2020"],
    },
    {
      name: "DPWG dosing: phenotyping where the score is unreliable, and no tegafur in carriers",
      differs: "The Dutch guideline starts every heterozygous carrier at half dose of fluorouracil or capecitabine, recommends avoiding tegafur at any activity score below 2, and avoids systemic and cutaneous fluorouracil or capecitabine at a score of 0.",
      evidence: "The DPWG text lists where it differs from CPIC: CPIC gives no dosing recommendation for tegafur because the evidence is too limited; at a score of 0, and where two variants make the score unreliable, DPWG recommends measuring DPD activity while CPIC recommends an alternative drug or a strongly reduced dose with early drug monitoring; and DPWG recommends phenotyping every homozygous carrier where CPIC advises a reduction of more than 50% for a homozygous c.2846A>T carrier. CPIC's printed 2017 table allowed 25 to 50% at a score of 1.5, from two small capecitabine studies with no data for infusional fluorouracil; CPIC withdrew that range in November 2018 after a prospective study, so the two guidelines no longer differ on the starting dose.",
      sources: ["dpwg-2020", "cpic-2017", "cpic-updates"],
    },
    {
      name: "United States: genotype before capecitabine unless treatment is urgent",
      differs: "The US label (boxed warning and section 2.1, revised 10/2025) tells prescribers to test for DPYD variants before capecitabine unless immediate treatment is necessary, says no FDA-authorised test is available, and gives no dose for partial deficiency beyond individualising it.",
      evidence: "Regulatory labelling, not a graded guideline. The label notes that available tests vary in which variants they detect.",
      sources: ["fda-xeloda-2025"],
    },
    {
      name: "Wider genotyping panels",
      differs: "Laboratories test a defined minimum set of DPYD variants (tier 1) and an extended list (tier 2) rather than only the four variants named in the EU product information.",
      evidence: "A 2024 joint consensus of AMP, ACMG, CPIC, CAP, DPWG and others sets out the tiers for laboratory assays; only its abstract was read, and it states its recommendations are a reference guide, not prescriptive.",
      sources: ["amp-2024"],
    },
    {
      name: "Measuring the fluorouracil blood level during a continuous infusion",
      differs: "Adjusts the dose of an infusional fluorouracil regimen by the measured blood level rather than by body surface area alone.",
      evidence: "The EU review says it may improve clinical outcomes as a complement to pre-treatment testing; the MHRA gives the target area under the curve as 20 to 30 mg x h/L.",
      sources: ["ema-2020", "mhra-dsu-2020"],
    },
  ],
  grades: [
    { claim: "Phenotype and/or genotype testing before fluoropyrimidines", grade: "Regulatory recommendation (not graded)", source: "ema-2020", quote: "Phenotype and/or genotype testing is therefore recommended before starting treatment with fluoropyrimidines." },
    { claim: "Test for DPYD variants before capecitabine unless immediate treatment is necessary (US label)", grade: "Boxed warning (10/2025)", source: "fda-xeloda-2025", quote: "Prior to initiating XELODA, test patients for genetic variants of the DPYD gene unless immediate treatment is necessary." },
    { claim: "Normal metabolisers: label dose", grade: "Strong", source: "cpic-2017", quote: "Based on genotype, there is no indication to change dose or therapy. Use label-recommended dosage and administration." },
    { claim: "Activity score 1 or 1.5: reduce the starting dose by 50%, then titrate (CPIC's current recommendation, revised November 2018)", grade: "Activity score 1: Strong Activity score 1.5: Moderate", source: "cpic-updates", quote: "Reduce starting dose by 50% followed by titration of dose based on toxicity or therapeutic drug monitoring (if available)." },
    { claim: "Activity score 1 or 1.5 as printed in the 2017 guideline table", grade: "Activity score 1: Strong Activity score 1.5: Moderate", source: "cpic-2017", quote: "Activity score 1: Reduce dose by 50% Activity score 1.5: Reduce dose by 25% to 50%" },
    { claim: "A test for all patients before a fluoropyrimidine, commissioned in England", grade: "Commissioning policy statement; not graded", source: "nhse-2020", quote: "Patients only require this test to be carried out once, at the start of their first fluoropyrimidine treatment, as the results remain applicable to subsequent fluoropyrimidine cycles and future treatment regimens containing a fluoropyrimidine." },
    { claim: "Activity score 0: avoid fluorouracil and its prodrugs", grade: "Strong", source: "cpic-2017", quote: "Activity score 0: Avoid use of 5-fluorouracil or 5-fluorouracil prodrug-based regimens." },
    { claim: "Tegafur: no CPIC recommendation", grade: "no recommendation", source: "cpic-2017", quote: "As such, tegafur is rated as a CPIC “no recommendation” (see Supplement for definition)." },
    { claim: "DPYD genotyping before fluoropyrimidines", grade: "Clinical implication score: essential", source: "dpwg-2020", quote: "This score dictates that DPYD genotyping prior to treatment must be performed for all patients initially being prescribed therapy with 5-FU, capecitabine or tegafur with DPD inhibitors, to optimize the initial dose and to prevent potentially fatal toxicity." },
  ],
  sources: [
    {
      key: "ema-2020",
      label: "EMA recommendations on DPD testing prior to treatment with fluorouracil, capecitabine, tegafur and flucytosine (EMA/229267/2020)",
      publisher: "European Medicines Agency",
      year: 2020,
      url: "https://www.ema.europa.eu/en/news/ema-recommendations-dpd-testing-prior-treatment-fluorouracil-capecitabine-tegafur-and-flucytosine",
      gradingScheme: "A regulatory recommendation; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mhra-dsu-2020",
      label: "5-fluorouracil (intravenous), capecitabine, tegafur: DPD testing recommended before initiation to identify patients at increased risk of severe and fatal toxicity (Drug Safety Update volume 14, issue 3)",
      publisher: "Medicines and Healthcare products Regulatory Agency (UK)",
      year: 2020,
      url: "https://www.gov.uk/drug-safety-update/5-fluorouracil-intravenous-capecitabine-tegafur-dpd-testing-recommended-before-initiation-to-identify-patients-at-increased-risk-of-severe-and-fatal-toxicity",
      gradingScheme: "Regulatory advice to healthcare professionals; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "xeloda-smpc",
      label: "Xeloda (capecitabine): summary of product characteristics, section 4.4",
      publisher: "European Medicines Agency (EPAR product information)",
      year: 2025,
      url: "https://www.ema.europa.eu/en/documents/product-information/xeloda-epar-product-information_en.pdf",
      gradingScheme: "Product information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "fda-xeloda-2025",
      label: "XELODA (capecitabine) prescribing information, boxed warning and sections 2.1 and 5.1 revised 10/2025",
      publisher: "US Food and Drug Administration label (DailyMed)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e702d84d-7162-4751-bf37-d724cc7e45a5",
      gradingScheme: "Product labelling; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cpic-2017",
      label: "Clinical Pharmacogenetics Implementation Consortium (CPIC) Guideline for Dihydropyrimidine Dehydrogenase Genotype and Fluoropyrimidine Dosing: 2017 Update",
      publisher: "CPIC (Clinical Pharmacology & Therapeutics, Amstutz et al.)",
      year: 2018,
      url: "https://doi.org/10.1002/cpt.911",
      doi: "10.1002/cpt.911",
      gradingScheme: "Each dosing recommendation is classified Strong, Moderate, Optional or 'no recommendation'; the supplement defines a strong recommendation as one where the evidence is high quality and the desirable effects clearly outweigh the undesirable effects, and moderate as a close or uncertain balance.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cpic-updates",
      label: "CPIC Guideline for Fluoropyrimidines and DPYD: updates posted since publication (November 2018, January 2024 and July 2026) and the current recommendation records",
      publisher: "Clinical Pharmacogenetics Implementation Consortium (served by ClinPGx)",
      year: 2026,
      url: "https://cpicpgx.org/guidelines/guideline-for-fluoropyrimidines-and-dpyd/",
      gradingScheme: "The same Strong, Moderate, Optional or 'no recommendation' classification as the published guideline.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "has-2023",
      label: "Methods for detecting dihydropyrimidine dehydrogenase deficiency before treatment including a fluoropyrimidine (health technology evaluation, validated September 2023)",
      publisher: "Haute Autorite de Sante with Institut national du cancer (France)",
      year: 2023,
      url: "https://www.has-sante.fr/jcms/c_2891090/fr/methodes-de-recherche-d-un-deficit-en-dihydropyrimidine-deshydrogenase-visant-a-prevenir-certaines-toxicites-severes-associees-aux-traitements-incluant-une-fluoropyrimidine-5-fluorouracile-ou-capecitabine",
      gradingScheme: "A health technology evaluation with conclusions; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhse-2020",
      label: "Clinical Commissioning Urgent Policy Statement: pharmacogenomic testing for DPYD polymorphisms with fluoropyrimidine therapies (URN 1869), effective August 2020",
      publisher: "NHS England",
      year: 2020,
      url: "https://www.england.nhs.uk/wp-content/uploads/2020/11/1869-dpyd-policy-statement.pdf",
      gradingScheme: "A commissioning position with implementation criteria; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "dpwg-2020",
      label: "Dutch Pharmacogenetics Working Group (DPWG) guideline for the gene-drug interaction of DPYD and fluoropyrimidines",
      publisher: "DPWG, Royal Dutch Pharmacists Association (European Journal of Human Genetics, Lunenburg et al.)",
      year: 2020,
      url: "https://doi.org/10.1038/s41431-019-0540-0",
      doi: "10.1038/s41431-019-0540-0",
      gradingScheme: "A clinical implication score for testing before treatment: essential, beneficial, potentially beneficial or not required.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "amp-2024",
      label: "DPYD Genotyping Recommendations: A Joint Consensus Recommendation of AMP, ACMG, CPIC, CAP, DPWG, ESPT, PharmGKB and PharmVar",
      publisher: "Association for Molecular Pathology and partners (Journal of Molecular Diagnostics, Pratt et al.)",
      year: 2024,
      url: "https://doi.org/10.1016/j.jmoldx.2024.05.015",
      doi: "10.1016/j.jmoldx.2024.05.015",
      read: "abstract",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["fluorouracil", "capecitabine", "tegafur-gimeracil-oteracil", "uridine-triacetate"],
  technologies: ["dpyd-genotyping", "oncology-pharmacogenomics", "fluorouracil-pharmacokinetic-dosing"],
  targets: ["dpyd"],
  terms: ["pharmacogenomics-term", "dose-modification", "neutropenia", "mucositis", "chemotherapy-side-effects-colorectal", "chemotherapy-side-effects-pancreatic"],
  keyPapers: ["paper-henricks-lancet-oncol"],
  related: [],
  upgrades: ["idea-tr1-pre-emptive-pharmacogenomic-testing"],
  gaps: [
    "The four variants in the EU product information are, in its words, considered virtually absent in people of African or Asian ancestry, so a negative four-variant genotype says less for them. CPIC names a different decreased function variant, c.557A>G (rs115232898), as relatively common in people of African ancestry, with about a 5% carrier frequency, and the US capecitabine label says DPD deficiency is estimated to be more prevalent in Black or African American populations than in White populations. Which wider panel to use is set out in the 2024 AMP consensus, of which only the abstract was read.",
    "CPIC's published 2017 paper and its guideline page now say different things, and the page is the later word: the paper prints a 25 to 50% reduction at activity score 1.5 and the page has recommended 50% since November 2018. In July 2026 CPIC posted that its next update will give HapB3 (c.1129-5923C>G) an allele value of 0.75, so a heterozygous carrier scores 1.75 and starts at 75% of the intended dose; CPIC expected the full update in autumn 2026 and on 17 November 2026 it had not been published, so that figure is not yet a recommendation and is not used in the steps here.",
    "DPWG's published guideline is the 2020 paper. ClinPGx records later DPWG releases (August 2019, May 2021, February 2022 and May 2023) that have not been published as papers; their wording was not read.",
    "On 17 November 2026 the 2024 AMP consensus on which variants a laboratory assay should carry still read as an abstract only: the Europe PMC full-text endpoint returned an error and the NCBI interface returns the front matter and abstract. The tier 1 and tier 2 variant lists are therefore not stated here.",
    "No ESMO or NCCN recommendation on DPD testing was read. ASCO and NCCN positions are not stated here.",
    "Uracil thresholds are described by the EU product information itself as uncertain, and the French evaluation asks for them to be read as points on a continuous scale rather than as a line.",
    "In the US label, no dose is given for partial deficiency and no FDA-authorised DPYD test exists.",
    "The NHS England statement was read as the Internet Archive copy of 16 March 2023 because england.nhs.uk answered a bot check on 17 November 2026; it is an urgent policy statement, reviewed through the National Genomic Test Directory, and whether it has since been revised could not be checked.",
  ],
});
