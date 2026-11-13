import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESE_2022, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Thyroid dysfunction caused by an immune checkpoint inhibitor: thyroiditis with a thyrotoxic phase, hypothyroidism
 * and the rare Graves' disease.
 *
 * What was read, and how: SITC 2021 (full text, endocrine section and recommendations) and ESE 2022 (full text, thyroid
 * section and recommendations R 1.1 and R 3.1 to R 3.6), both from Europe PMC as described in ./irae-sources.ts. In
 * addition, the SITC 2025 consensus disease definitions for endocrine irAEs (J Immunother Cancer, open access, full
 * text from Europe PMC, PMC12530408). ASCO 2021 was read as its abstract; ESMO 2022 could not be read. DOIs resolved
 * through Europe PMC and titles checked. Quotes checked by script against the raw text on 11 November 2026.
 */
export const iraeThyroid = protocol({
  id: "irae-thyroid",
  name: "Thyroid inflammation and underactive thyroid from checkpoint inhibitors",
  aka: ["checkpoint inhibitor thyroiditis", "ICI thyroiditis", "immune-related hypothyroidism", "immunotherapy thyroid problems", "ir-thyroiditis", "immune-related thyrotoxicosis"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy often inflames the thyroid gland. It can briefly make the thyroid overactive (racing heart, sweating, shakiness) and then underactive (tiredness, feeling cold), and the underactive phase is often permanent. It is found on routine blood tests, treated with tablets rather than steroids, and immunotherapy usually carries on.",
  simple: "Immunotherapy can upset your thyroid gland. Your blood tests check for this. If it happens, it is treated with tablets and you can usually keep having immunotherapy.",
  summary: "The commonest endocrine irAE. Hypothyroidism occurs in about 8% on PD-(L)1 inhibitors, 3% on CTLA-4 inhibitors and 15% on combinations (SITC 2021); ESE 2022 gives 3.9 to 8.5%, 2.5 to 3.8% and 10.2 to 16.4%, with onset at a median 8 to 12 weeks. A thyrotoxic phase, typically 4 to 6 weeks after starting and lasting about 6 weeks, often precedes it, and hypothyroidism is often permanent.\n\nMonitoring: TSH and free T4 every 4 to 6 weeks on treatment and every 6 to 12 months after (SITC; ESE suggests before every cycle for the first 6 months). Thyrotoxicosis is treated with beta-blockers for symptoms; persistent thyrotoxicosis needs assessment for Graves' disease with TSH receptor antibodies. Morning cortisol is checked before levothyroxine, because replacing thyroid hormone in untreated adrenal insufficiency can precipitate a crisis. High-dose glucocorticoids are not used for thyroiditis (ESE, +000). Immunotherapy is usually continued.\n\nThe two guidelines differ on when and how much levothyroxine to start: SITC considers it for a persistently raised TSH with normal free T4 and starts at 1.5 to 1.6 µg/kg/day in young healthy patients; ESE suggests it when free T4 is low and TSH above 10 mIU/L (++00), advises against routine treatment for TSH 4 to 10 with normal free T4 (+000), and starts at 1.0 µg/kg/day. ESMO 2022 could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "community"],
  },
  population: "Adults receiving or who have received an immune checkpoint inhibitor (PD-1, PD-L1 or CTLA-4), alone or in combination. Central hypothyroidism from hypophysitis is a different condition and is covered by the hypophysitis protocol. Children are not addressed by these sources.",
  trigger: "An abnormal TSH or free T4 on routine monitoring, or symptoms of an overactive or underactive thyroid, during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Test TSH and free T4 every 4 to 6 weeks during treatment and every 6 to 12 months after it ends",
      why: "Thyroid problems are often silent and can start months after the last dose.",
      source: "sitc-2021",
      quote: "Thyroid function (TSH, fT4) should be tested every 4–6 weeks during ICI treatment, and should continue to be tested every 6–12 months following the conclusion of ICI treatment.",
    },
    {
      action: "Keep giving the checkpoint inhibitor once the patient is stable, treating the thyroid with hormone replacement or symptom relief",
      why: "A controlled thyroid problem is not a reason to stop cancer treatment.",
      source: "sitc-2021",
      quote: "Patients experiencing endocrine toxicities should be treated with hormone replacement, and immunotherapy should generally be continued as soon as patients are stable (often without interruption).",
    },
    {
      action: "Do not give high-dose steroids for thyroiditis, except for severe thyrotoxicosis or severe thyroid eye disease",
      why: "Steroids have not been shown to save the thyroid, and they bring their own side effects.",
      source: "ese-2022",
      quote: "We recommend against the use of high-dose glucocorticoids for the treatment of thyroiditis; except in severe thyrotoxicosis and severe thyroid eye disease",
      grade: "+000",
    },
    {
      action: "Watch mild thyrotoxicosis or mild hypothyroidism without treatment, rechecking TSH and free T4 every 3 to 6 weeks early on",
      why: "Most cases are mild, and the overactive phase usually passes on its own.",
      source: "ese-2022",
      quote: "We suggest that cases of clinically and biochemically mild thyrotoxicosis or hypothyroidism can be monitored without treatment",
      grade: "good clinical practice",
    },
    {
      action: "Give a beta-blocker for symptoms of an overactive thyroid; use a cardioselective one such as atenolol or metoprolol in asthma or COPD",
      why: "A beta-blocker calms a racing heart and shakiness while the inflammation settles.",
      source: "sitc-2021",
      quote: "Patients with low TSH and normal fT4 should receive repeat TSH and fT4 testing routinely, and if symptoms of hyperthyroidism or high fT4 develop patients should be treated with beta-blockers. Patients with asthma or chronic obstructive pulmonary disease should be treated with cardioselective beta-blockers such as atenolol or metoprolol.",
    },
    {
      action: "If TSH stays low with a high free T4, assess for Graves' disease, including TSH receptor antibodies",
      why: "Graves' disease is rare after immunotherapy but needs different treatment (anti-thyroid drugs) from thyroiditis.",
      source: "sitc-2025-endocrine",
      quote: "TSH receptor antibody should be considered in patients with suspected ir-Graves’ disease, as the condition is managed differently from ir-thyroiditis.",
    },
    {
      action: "Before starting levothyroxine for symptoms or a high TSH with low free T4, check a morning cortisol",
      why: "Replacing thyroid hormone when adrenal insufficiency is untreated can trigger an adrenal crisis.",
      source: "sitc-2021",
      quote: "Patients with symptoms of hypothyroidism and/or with elevated TSH and low fT4 should be tested for morning cortisol to identify possible concurrent adrenal insufficiency.",
    },
    {
      action: "Start levothyroxine for overt primary hypothyroidism: free T4 below the reference range with TSH above 10 mIU/L",
      why: "Treating an underactive thyroid improves tiredness and other symptoms.",
      source: "ese-2022",
      quote: "We suggest replacement with levothyroxine in primary hypothyroidism in cases with fT4 below the lower reference limit and TSH > 10 mIU/L.",
      grade: "++00",
    },
    {
      action: "Do not routinely start levothyroxine for TSH between 4 and 10 mIU/L with a normal free T4; repeat the tests and weigh symptoms",
      why: "A mildly raised TSH often settles or stays harmless.",
      source: "ese-2022",
      quote: "We recommend against routine replacement with levothyroxine of ICI-treated patients with a TSH between 4–10 mIU/L and a normal fT4",
      grade: "+000",
    },
    {
      action: "Adjust the levothyroxine dose on TSH and free T4 no more often than every 6 weeks",
      why: "Levothyroxine takes weeks to reach a steady level, so earlier changes overshoot.",
      source: "ese-2022",
      quote: "Regular monitoring of thyroid hormones (TSH and fT4) is needed in order to titrate levothyroxine dosage at intervals of at least 6 weeks.",
    },
    {
      action: "After immunotherapy stops, keep checking thyroid function every 6 to 12 months, and sooner if symptoms appear",
      why: "Thyroid problems can develop late and the symptoms are vague.",
      source: "ese-2022",
      quote: "In case of ICI cessation, ongoing monitoring of thyroid function (TSH and fT4) is still indicated, albeit less frequently (e.g. every 6–12 months and in case of symptoms and signs of thyroid dysfunction).",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 and ESE 2022 agree on regular TSH and free T4 testing, beta-blockers for symptomatic thyrotoxicosis, a check for adrenal insufficiency before levothyroxine, no high-dose steroids for thyroiditis, and continuing immunotherapy. They disagree on when and how much levothyroxine to start. SITC considers levothyroxine for a persistently raised TSH with a normal free T4 (subclinical hypothyroidism) and starts at 1.5 to 1.6 µg/kg/day in young healthy patients (25 or 50 µg/day if older than 65 or with heart disease), without a grade. ESE suggests replacement only when free T4 is below range and TSH above 10 mIU/L (++00), recommends against routine replacement for TSH 4 to 10 with a normal free T4 (+000), and starts at 1.0 µg/kg/day (25 µg/day in older people or those with heart disease). ESE is a GRADE-based endocrine guideline with a systematic review behind it, so its thresholds are the better supported; SITC's are expert consensus. The SITC 2025 endocrine definitions take a middle line: replacement for a TSH above 10 mIU/L whatever the free T4.",
    sources: ["ese-2022", "sitc-2021", "sitc-2025-endocrine"],
  },
  variants: [
    {
      name: "Testing before every cycle for the first 6 months (ESE 2022)",
      differs: "Tests TSH and free T4 before every treatment cycle for the first 6 months, then every 2 to 3 months for 6 months, then every 6 months, instead of a flat every 4 to 6 weeks.",
      evidence: "Described in the text as general advice; not a graded recommendation.",
      sources: ["ese-2022"],
    },
    {
      name: "Levothyroxine for any TSH above 10 mIU/L (SITC 2025 endocrine definitions)",
      differs: "Defines overt hypothyroidism as a high TSH with low free T4, or a TSH above 10 mIU/L regardless of free T4, and starts replacement in either case.",
      evidence: "Modified Delphi consensus (RAND/UCLA appropriateness method) of an expert panel; not graded.",
      sources: ["sitc-2025-endocrine"],
    },
    {
      name: "Higher starting dose of levothyroxine (SITC 2021)",
      differs: "Starts 1.5 to 1.6 µg/kg/day for young, healthy patients and 25 or 50 µg/day above 65 or with heart disease, and considers treating a persistent raised TSH with normal free T4.",
      evidence: "Expert consensus; no level of evidence printed for this recommendation.",
      sources: ["sitc-2021"],
    },
  ],
  grades: [
    { claim: "A controlled endocrinopathy is not a contraindication to starting or continuing checkpoint inhibitors", grade: "++00", source: "ese-2022", quote: "We recommend that a controlled endocrinopathy is not a contraindication for initiation and/or continuation of ICI therapy" },
    { claim: "No high-dose glucocorticoids for thyroiditis, except severe thyrotoxicosis or thyroid eye disease", grade: "+000", source: "ese-2022" },
    { claim: "Beta-blockers in symptomatic thyrotoxicosis", grade: "good clinical practice", source: "ese-2022", quote: "We recommend using beta-blockers in symptomatic thyrotoxicosis" },
    { claim: "Levothyroxine when free T4 is below range and TSH above 10 mIU/L", grade: "++00", source: "ese-2022" },
    { claim: "No routine levothyroxine for TSH 4 to 10 mIU/L with normal free T4", grade: "+000", source: "ese-2022" },
    { claim: "Consider tapering and stopping low-dose levothyroxine periodically to see whether the thyroid has recovered", grade: "+000", source: "ese-2022", quote: "We suggest considering tapering and stopping levothyroxine periodically in patients with low-dose replacement to assess whether thyroid function has recovered" },
  ],
  sources: [
    SITC_ICI_2021,
    ESE_2022,
    {
      key: "sitc-2025-endocrine",
      label: "Consensus-based disease definitions for endocrine immune-related adverse events of immune checkpoint inhibitors",
      publisher: "Journal for ImmunoTherapy of Cancer",
      year: 2025,
      url: "https://europepmc.org/article/PMC/PMC12530408",
      doi: "10.1136/jitc-2025-011865",
      gradingScheme: "RAND/UCLA Appropriateness Method (modified Delphi) consensus of a multidisciplinary panel; statements are not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    ASCO_ICI_2021,
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ASCO 2021 guideline was read only as its abstract, which says permanent discontinuation after grade 4 toxicity does not apply to endocrinopathies controlled by hormone replacement, but does not give its thyroid table.",
    "The guidelines disagree on whether to treat a raised TSH (4 to 10 mIU/L) with a normal free T4, and on the levothyroxine starting dose; no trial compares the approaches in people on immunotherapy.",
    "Recovery is uncommon and the proportion of transient versus permanent hypothyroidism cannot be defined from the studies ESE reviewed.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "levothyroxine"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["immune-endocrinopathy", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-hypophysitis-adrenal", "checkpoint-inhibitor-baseline-and-monitoring"],
  tags: ["protocol", "irae", "endocrine"],
});
