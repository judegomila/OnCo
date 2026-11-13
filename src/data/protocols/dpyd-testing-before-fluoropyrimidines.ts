import { protocol } from "./helpers";

/*
 * Testing for DPD deficiency before fluorouracil, capecitabine or tegafur, and what the result changes.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or urllib into a scratch directory and read as
 * text):
 * - EMA, "EMA recommendations on DPD testing prior to treatment with fluorouracil, capecitabine, tegafur and
 *   flucytosine" (EMA/229267/2020, 30 April 2020): full text of the web page.
 * - MHRA Drug Safety Update volume 14, issue 3 (22 October 2020), the UK implementation of the EU review: full text of
 *   the gov.uk page.
 * - Xeloda (capecitabine) EU summary of product characteristics, from the EMA product-information PDF: full text with
 *   pdftotext; the DPD testing passage and the indicative uracil thresholds are quoted from section 4.4.
 * - Xeloda US prescribing information, DailyMed SPL (setid e702d84d-7162-4751-bf37-d724cc7e45a5, published 6 February
 *   2026, boxed warning and sections 2.1 and 5.1 revised 10/2025): full text of the SPL XML.
 * - CPIC guideline for DPYD and fluoropyrimidine dosing, 2017 update (Amstutz et al., Clin Pharmacol Ther 2018,
 *   PMC5760397): full text from the PMC XML. The supplement, which defines the strength-of-recommendation scheme, was
 *   not read. The CPIC website now redirects to ClinPGx, which serves no text without JavaScript, so whether a newer
 *   CPIC update exists could not be checked there; no newer CPIC paper was found in Europe PMC.
 * - DPWG guideline for DPYD and fluoropyrimidines (Lunenburg et al., Eur J Hum Genet 2020, PMC7080718): full text from
 *   the PMC XML.
 * - AMP, ACMG, CPIC, CAP, DPWG, ESPT, PharmGKB and PharmVar joint consensus on DPYD genotyping (Pratt et al., J Mol
 *   Diagn 2024): abstract only (PMC holds the abstract and a PDF the script did not read).
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
  summary: "Fluoropyrimidines are cleared by dihydropyrimidine dehydrogenase (DPD). The EU review of 2020 recommends phenotype and/or genotype testing before systemic fluorouracil, capecitabine or tegafur, contraindicates them in known complete deficiency and advises a reduced starting dose in partial deficiency; the MHRA adopted the same advice for the UK in October 2020 ('test all patients'). Since October 2025 the US capecitabine label also tells prescribers to test for DPYD variants before starting unless treatment is urgent, while noting no FDA-authorised test exists.\n\nThere are two ways to test. Genotyping reads the four DPYD variants named in the EU product information (c.1905+1G>A, c.1679T>G, c.2846A>T, c.1236G>A/HapB3), which are considered virtually absent in people of African or Asian ancestry. Phenotyping measures plasma uracil: the EU product information treats 16 to under 150 ng/mL as indicative of partial and 150 ng/mL or more as indicative of complete deficiency, to be read with caution when kidney function is impaired.\n\nDosing by genotype uses an activity score. CPIC (2017 update) recommends a 50% reduction at activity score 1 (strong) and 25 to 50% at 1.5 (moderate), avoiding fluorouracil and its prodrugs at 0 or 0.5, with the dose raised in later cycles if the first two are tolerated. DPWG (2020) recommends 50% at both 1 and 1.5 and avoiding tegafur below 2, and calls testing 'essential'. Every source says severe toxicity can still occur with a normal result, most often in the first cycle or after a dose increase.",
  asOf: "2026-11-11",
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
      action: "For a heterozygous carrier, reduce the starting dose by activity score: by 50% at a score of 1, by 25 to 50% at a score of 1.5",
      why: "A lower first dose brings the risk of severe side effects in carriers close to that of non-carriers.",
      source: "cpic-2017",
      quote: "Activity score 1: Reduce dose by 50% Activity score 1.5: Reduce dose by 25% to 50%",
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
      why: "Severe diarrhoea, mouth sores, fever or infection still need same-day contact with the team.",
      source: "mhra-dsu-2020",
      quote: "advise patients that despite negative test results for DPD deficiency, severe toxicity may still occur and ensure they have a copy of the patient information leaflet",
    },
    {
      action: "For an overdose, give uridine triacetate within 96 hours",
      why: "Uridine triacetate is an antidote that limits the damage fluorouracil does when there is too much of it.",
      source: "fda-xeloda-2025",
      quote: "Administer uridine triacetate within 96 hours for management of XELODA overdose.",
    },
  ],
  bestInClass: {
    statement: "Test before the first systemic dose, act on the result, and keep watching. Europe and the UK test every patient (EMA 2020, MHRA 2020), by genotype, uracil level or both; the US label has since October 2025 told prescribers to genotype before capecitabine unless treatment is urgent. Avoid fluoropyrimidines in complete deficiency. For partial deficiency by genotype, the two pharmacogenetic guidelines differ at activity score 1.5: CPIC (2017) allows a 25 to 50% reduction (moderate) and DPWG (2020) recommends 50%; both reduce by 50% at activity score 1 (CPIC strong). CPIC adds titration upwards after two tolerated cycles. DPWG alone recommends phenotyping where the genotype cannot give a score, and avoiding tegafur in any carrier. A normal result does not remove the need to monitor the first cycle.",
    sources: ["ema-2020", "mhra-dsu-2020", "xeloda-smpc", "fda-xeloda-2025", "cpic-2017", "dpwg-2020"],
  },
  variants: [
    {
      name: "Uracil phenotyping instead of, or as well as, genotyping",
      differs: "Measures plasma uracil before treatment rather than reading DPYD variants; France is the country best known for it, and the EU product information gives the thresholds (16 to under 150 ng/mL partial, 150 ng/mL or more complete deficiency).",
      evidence: "The EU review accepted both methods because the best one is uncertain. A uracil test can find deficiency from causes other than the four common variants, but kidney impairment raises uracil and can mislead. DPWG recommends phenotyping where a genotype cannot be scored, and for any homozygous carrier.",
      sources: ["xeloda-smpc", "mhra-dsu-2020", "dpwg-2020"],
    },
    {
      name: "DPWG dosing: 50% at activity scores 1 and 1.5, and no tegafur in carriers",
      differs: "The Dutch guideline starts every heterozygous carrier at half dose of fluorouracil or capecitabine, recommends avoiding tegafur at any activity score below 2, and avoids systemic and cutaneous fluorouracil at a score of 0.",
      evidence: "The DPWG text compares itself with CPIC: CPIC allows 25 to 50% at a score of 1.5 on the basis of small capecitabine studies and makes no tegafur recommendation because evidence is too limited.",
      sources: ["dpwg-2020", "cpic-2017"],
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
    { claim: "Activity score 1: reduce the starting dose by 50%; 1.5: by 25 to 50%", grade: "Activity score 1: Strong Activity score 1.5: Moderate", source: "cpic-2017" },
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
      accessed: "2026-11-11",
    },
    {
      key: "mhra-dsu-2020",
      label: "5-fluorouracil (intravenous), capecitabine, tegafur: DPD testing recommended before initiation to identify patients at increased risk of severe and fatal toxicity (Drug Safety Update volume 14, issue 3)",
      publisher: "Medicines and Healthcare products Regulatory Agency (UK)",
      year: 2020,
      url: "https://www.gov.uk/drug-safety-update/5-fluorouracil-intravenous-capecitabine-tegafur-dpd-testing-recommended-before-initiation-to-identify-patients-at-increased-risk-of-severe-and-fatal-toxicity",
      gradingScheme: "Regulatory advice to healthcare professionals; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "xeloda-smpc",
      label: "Xeloda (capecitabine): summary of product characteristics, section 4.4",
      publisher: "European Medicines Agency (EPAR product information)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/xeloda-epar-product-information_en.pdf",
      gradingScheme: "Product information; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "fda-xeloda-2025",
      label: "XELODA (capecitabine) prescribing information, boxed warning and sections 2.1 and 5.1 revised 10/2025",
      publisher: "US Food and Drug Administration label (DailyMed)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e702d84d-7162-4751-bf37-d724cc7e45a5",
      gradingScheme: "Product labelling; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "cpic-2017",
      label: "Clinical Pharmacogenetics Implementation Consortium (CPIC) Guideline for Dihydropyrimidine Dehydrogenase Genotype and Fluoropyrimidine Dosing: 2017 Update",
      publisher: "CPIC (Clinical Pharmacology & Therapeutics, Amstutz et al.)",
      year: 2018,
      url: "https://doi.org/10.1002/cpt.911",
      doi: "10.1002/cpt.911",
      gradingScheme: "Strength of each dosing recommendation printed as Strong or Moderate, or 'no recommendation' where evidence is too limited; the scheme is defined in the guideline's supplement, which was not read.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "amp-2024",
      label: "DPYD Genotyping Recommendations: A Joint Consensus Recommendation of AMP, ACMG, CPIC, CAP, DPWG, ESPT, PharmGKB and PharmVar",
      publisher: "Association for Molecular Pathology and partners (Journal of Molecular Diagnostics, Pratt et al.)",
      year: 2024,
      url: "https://doi.org/10.1016/j.jmoldx.2024.05.015",
      doi: "10.1016/j.jmoldx.2024.05.015",
      read: "abstract",
      accessed: "2026-11-11",
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
    "The four variants in the EU product information are, in its words, considered virtually absent in people of African or Asian ancestry, so a negative four-variant genotype says less for them; which wider panel to use is set out in the 2024 AMP consensus, of which only the abstract was read.",
    "The guidelines disagree on the reduction at activity score 1.5 (CPIC 25 to 50%, DPWG 50%), and CPIC notes the 25% figure comes from small capecitabine studies with no data for infusional fluorouracil.",
    "The CPIC guideline read is the 2017 update. Its website now redirects to ClinPGx, which serves no text to a script, so a newer CPIC revision could not be ruled out; none was found in Europe PMC.",
    "The CPIC supplement defining its recommendation strengths was not read; grades are quoted as printed in the main table.",
    "No ESMO or NCCN recommendation on DPD testing was read. ASCO and NCCN positions are not stated here.",
    "Uracil thresholds are described by the EU product information itself as uncertain, and the turnaround time of testing, which can delay a first cycle, is not addressed by any source read.",
    "In the US label, no dose is given for partial deficiency and no FDA-authorised DPYD test exists.",
  ],
});
