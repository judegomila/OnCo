import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESE_2022, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Thyroid dysfunction caused by an immune checkpoint inhibitor: thyroiditis with a thyrotoxic phase, hypothyroidism
 * and the rare Graves' disease.
 *
 * What was read, and how: SITC 2021 (full text, endocrine section and recommendations) and ESE 2022 (full text, thyroid
 * section and recommendations R 1.1 to R 1.3, R 2.5, R 2.6 and R 3.1 to R 3.6), both from Europe PMC as described in
 * ./irae-sources.ts. In addition, the 2025 consensus disease definitions for endocrine irAEs (J Immunother Cancer, open
 * access, full text from Europe PMC, PMC12530408). ASCO 2021 was read as its abstract; ESMO 2022 could not be read.
 *
 * Second accuracy pass, 17 November 2026. Every claim was re-read against raw text: SITC 2021 full-text XML fetched
 * again from the Europe PMC REST API (byte-identical to the copy another checker saved on 16 November); the ASCO 2021
 * abstract fetched again from Europe PMC; ESE 2022 (full-text XML saved the same day by the hypophysitis checker) and
 * the 2025 definitions paper (full-text XML saved the same day by the diabetes checker) re-used from their scratch
 * folders. The 2025 paper's DOI was resolved through Crossref and its title checked. It is not a SITC guideline: its
 * text says it comes from the "irAE Program", in partnership with Project Data Sphere, and it is only published in
 * SITC's journal, so the source was renamed. ESMO 2022 was not attempted again (a sibling checker's attempt on
 * 16 November was refused). Quotes checked by script against the raw text, tags stripped and entities decoded.
 */
export const iraeThyroid = protocol({
  id: "irae-thyroid",
  name: "Thyroid inflammation and underactive thyroid from checkpoint inhibitors",
  aka: ["checkpoint inhibitor thyroiditis", "ICI thyroiditis", "immune-related hypothyroidism", "immunotherapy thyroid problems", "ir-thyroiditis", "immune-related thyrotoxicosis"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can inflame the thyroid gland. It may briefly make the thyroid overactive (palpitations, shakiness, feeling hot) and then underactive (tiredness, feeling cold), and symptoms can be mild or absent. The underactive phase is often permanent. It is found on routine blood tests, generally treated with tablets rather than steroids, and immunotherapy usually carries on.",
  simple: "Immunotherapy can upset your thyroid gland. Your blood tests check for this. If it happens, it is treated with tablets and you can usually keep having immunotherapy.",
  summary: "The commonest endocrine irAE (ESE 2022). Hypothyroidism occurs in about 8% on PD-(L)1 inhibitors, 3% on CTLA-4 inhibitors and 15% on combinations (SITC 2021); ESE 2022 gives 3.9 to 8.5%, 2.5 to 3.8% and 10.2 to 16.4%, typically at a median 8 to 12 weeks. Thyrotoxicosis typically comes first, 4 to 6 weeks after starting and lasting about 6 weeks (ESE), and hypothyroidism is often permanent.\n\nMonitoring: TSH and free T4 every 4 to 6 weeks on treatment and every 6 to 12 months after (SITC; ESE says testing before every cycle for the first 6 months is generally advised). Symptomatic thyrotoxicosis is treated with beta-blockers; a persistently low TSH with high free T4 is evaluated for Graves' disease, and TSH receptor antibodies should be considered. SITC tests morning cortisol in people with symptoms of hypothyroidism or a high TSH with low free T4, to find adrenal insufficiency at the same time; ESE, in its hypophysitis section, says adrenal insufficiency should be excluded before levothyroxine because levothyroxine can precipitate an adrenal crisis. ESE recommends against high-dose glucocorticoids for thyroiditis except in severe thyrotoxicosis and severe thyroid eye disease (+000); SITC says thyroid toxicity generally does not need corticosteroids. Immunotherapy is generally continued; ESE suggests oncology and endocrinology discuss a possible interruption in severe thyroid eye disease (++00).\n\nThe guidelines differ on when and how much levothyroxine to start: SITC says it should be considered for a persistently raised TSH with normal free T4 and gives 1.5 to 1.6 µg/kg/day for young healthy patients; ESE suggests it when free T4 is low and TSH above 10 mIU/L (++00), recommends against routine treatment for TSH 4 to 10 with normal free T4 (+000), and starts at 1.0 µg/kg/day. ESMO 2022 could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "community"],
  },
  population: "Adults receiving or who have received an immune checkpoint inhibitor (PD-1, PD-L1 or CTLA-4), alone or in combination. Central hypothyroidism from hypophysitis is a different condition and is covered by the hypophysitis protocol. The sources read here do not address children.",
  trigger: "An abnormal TSH or free T4 on routine monitoring, or symptoms of an overactive or underactive thyroid, during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Test TSH and free T4 every 4 to 6 weeks during treatment and every 6 to 12 months after it ends",
      why: "Thyroid problems often cause no symptoms, or only vague ones, so they are found by routine blood tests.",
      source: "sitc-2021",
      quote: "Thyroid function (TSH, fT4) should be tested every 4–6 weeks during ICI treatment, and should continue to be tested every 6–12 months following the conclusion of ICI treatment.",
    },
    {
      action: "In general, continue the checkpoint inhibitor as soon as the patient is stable, often without a break, and treat the thyroid problem with hormone replacement",
      why: "A hormone problem that is under control is not a reason to stop cancer treatment. ESE suggests a discussion about pausing only for severe thyroid eye disease.",
      source: "sitc-2021",
      quote: "Patients experiencing endocrine toxicities should be treated with hormone replacement, and immunotherapy should generally be continued as soon as patients are stable (often without interruption).",
    },
    {
      action: "Do not give high-dose steroids for thyroiditis, except for severe thyrotoxicosis or severe thyroid eye disease",
      why: "ESE found no evidence that high-dose steroids work for thyroiditis, and they can themselves cause adrenal insufficiency.",
      source: "ese-2022",
      quote: "We recommend against the use of high-dose glucocorticoids for the treatment of thyroiditis; except in severe thyrotoxicosis and severe thyroid eye disease",
      grade: "+000",
    },
    {
      action: "Consider monitoring clinically and biochemically mild thyrotoxicosis or hypothyroidism without treatment, rechecking TSH and free T4 every 3 to 6 weeks in the early phase",
      why: "Most cases are mild, and the overactive phase is typically mild and passes.",
      source: "ese-2022",
      quote: "We suggest that cases of clinically and biochemically mild thyrotoxicosis or hypothyroidism can be monitored without treatment",
      grade: "good clinical practice",
    },
    {
      action: "Give a beta-blocker if symptoms of an overactive thyroid or a high free T4 develop; use a cardioselective one such as atenolol or metoprolol in asthma or COPD",
      why: "A beta-blocker eases the symptoms while the overactive phase passes.",
      source: "sitc-2021",
      quote: "Patients with low TSH and normal fT4 should receive repeat TSH and fT4 testing routinely, and if symptoms of hyperthyroidism or high fT4 develop patients should be treated with beta-blockers. Patients with asthma or chronic obstructive pulmonary disease should be treated with cardioselective beta-blockers such as atenolol or metoprolol.",
    },
    {
      action: "If TSH stays low with a high free T4, evaluate for hyperthyroidism and Graves' disease, and consider TSH receptor antibodies",
      why: "Graves' disease is rare after immunotherapy and is managed differently from thyroiditis: ESE says it needs anti-thyroid drugs. The 2025 consensus definitions say the antibody test should be considered when Graves' disease is suspected.",
      source: "sitc-2021",
      quote: "Patients with persistently low TSH and high fT4 should be evaluated for hyperthyroidism and Graves’ disease etiology.",
    },
    {
      action: "Check a morning cortisol in people with symptoms of hypothyroidism or a high TSH with low free T4",
      why: "This looks for adrenal insufficiency happening at the same time. ESE, writing about pituitary inflammation, says it should be excluded before levothyroxine is started, because levothyroxine can bring on an adrenal crisis when adrenal insufficiency is untreated.",
      source: "sitc-2021",
      quote: "Patients with symptoms of hypothyroidism and/or with elevated TSH and low fT4 should be tested for morning cortisol to identify possible concurrent adrenal insufficiency.",
    },
    {
      action: "Start levothyroxine for overt primary hypothyroidism: free T4 below the reference range with TSH above 10 mIU/L",
      why: "In overt hypothyroidism ESE judges there is a significant chance of feeling better with replacement.",
      source: "ese-2022",
      quote: "We suggest replacement with levothyroxine in primary hypothyroidism in cases with fT4 below the lower reference limit and TSH > 10 mIU/L.",
      grade: "++00",
    },
    {
      action: "Do not routinely start levothyroxine for TSH between 4 and 10 mIU/L with a normal free T4; keep testing and weigh symptoms",
      why: "ESE says the decision depends on the level and trend of free T4 and on symptoms, with regular tests and a timely weighing of benefit against risk.",
      source: "ese-2022",
      quote: "We recommend against routine replacement with levothyroxine of ICI-treated patients with a TSH between 4–10 mIU/L and a normal fT4",
      grade: "+000",
    },
    {
      action: "Adjust the levothyroxine dose on TSH and free T4 at intervals of at least 6 weeks",
      why: "Levothyroxine has a half-life of about a week, so the effect of a dose change takes several weeks to show in the blood tests.",
      source: "ese-2022",
      quote: "Regular monitoring of thyroid hormones (TSH and fT4) is needed in order to titrate levothyroxine dosage at intervals of at least 6 weeks.",
    },
    {
      action: "After immunotherapy stops, keep checking thyroid function, for example every 6 to 12 months, and if symptoms or signs appear",
      why: "Thyroid problems can develop later and the symptoms are usually non-specific. ESE says testing is needed for at least two years.",
      source: "ese-2022",
      quote: "In case of ICI cessation, ongoing monitoring of thyroid function (TSH and fT4) is still indicated, albeit less frequently (e.g. every 6–12 months and in case of symptoms and signs of thyroid dysfunction).",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 and ESE 2022 agree on regular TSH and free T4 testing, beta-blockers for symptomatic thyrotoxicosis, generally no corticosteroids for thyroid toxicity, and continuing immunotherapy. Both look for adrenal insufficiency: SITC tests morning cortisol in people with symptoms of hypothyroidism or a high TSH with low free T4, and ESE (in its hypophysitis section) says adrenal insufficiency should be excluded before levothyroxine. They disagree on when and how much levothyroxine to start. SITC says levothyroxine should be considered for a persistently raised TSH with a normal free T4 and no symptoms, and gives 1.5 to 1.6 µg/kg/day for young healthy patients (25 or 50 µg/day if older than 65 or with heart disease), with no level of evidence printed. ESE suggests replacement when free T4 is below range and TSH above 10 mIU/L (++00), recommends against routine replacement for TSH 4 to 10 with a normal free T4 (+000), and starts at 1.0 µg/kg/day (25 µg/day in elderly people or those with cardiovascular disease). ESE is the endocrine society's guideline and the only one of the three to grade these statements, on evidence it rates low (++00) and very low (+000). The 2025 consensus definitions sit between them: replacement for a TSH above 10 mIU/L whatever the free T4, at 1.45 to 1.6 µg/kg/day.",
    sources: ["ese-2022", "sitc-2021", "endocrine-irae-definitions-2025"],
  },
  variants: [
    {
      name: "Testing before every cycle for the first 6 months (ESE 2022)",
      differs: "Tests TSH and free T4 before every treatment cycle for the first 6 months, then every 2 to 3 months for 6 months, then every 6 months, instead of a flat every 4 to 6 weeks.",
      evidence: "Described in the text as what is generally advised; not a graded recommendation.",
      sources: ["ese-2022"],
    },
    {
      name: "Levothyroxine for any TSH above 10 mIU/L (2025 consensus definitions)",
      differs: "Defines overt hypothyroidism as a high TSH with low free T4, or a TSH above 10 mIU/L regardless of free T4, and says replacement should be commenced. Its management table gives levothyroxine 1.45 to 1.6 µg/kg/day based on ideal body weight for a TSH above 10 mIU/L, a lower starting dose (25 to 50 µg/day) above age 60 or with cardiac disease, and testing every 4 to 6 weeks without treatment when TSH is 10 mIU/L or below and there are no symptoms. In the thyrotoxic phase it monitors thyroid function closely, for example every 2 to 4 weeks.",
      evidence: "Modified Delphi consensus (RAND/UCLA appropriateness method) of an expert panel; not graded.",
      sources: ["endocrine-irae-definitions-2025"],
    },
    {
      name: "Higher starting dose of levothyroxine (SITC 2021)",
      differs: "Gives 1.5 to 1.6 µg/kg/day for young, healthy patients and 25 or 50 µg/day above 65 or with heart disease, and says levothyroxine should be considered for a persistent raised TSH with normal free T4.",
      evidence: "Expert consensus; no level of evidence printed for this recommendation.",
      sources: ["sitc-2021"],
    },
    {
      name: "Choice of beta-blocker (ESE 2022 and SITC 2021)",
      differs: "ESE's rationale says short-term treatment with a non-selective beta-blocker (for example propranolol) can be started to resolve symptoms. SITC names no default drug and says people with asthma or COPD should have a cardioselective one such as atenolol or metoprolol.",
      evidence: "ESE: good clinical practice, not formally graded. SITC: expert consensus, no level of evidence printed.",
      sources: ["ese-2022", "sitc-2021"],
    },
  ],
  grades: [
    { claim: "A controlled endocrinopathy is not a contraindication to starting or continuing checkpoint inhibitors", grade: "++00", source: "ese-2022", quote: "We recommend that a controlled endocrinopathy is not a contraindication for initiation and/or continuation of ICI therapy" },
    { claim: "Oncology and endocrinology discuss a possible interruption of immunotherapy in severe thyroid eye disease; for other endocrine abnormalities there is no need to interrupt or stop", grade: "++00", source: "ese-2022", quote: "We suggest a discussion between oncology and endocrinology with regard to the possible interruption of ICI in the case of severe thyroid eye disease or hypophysitis with compression of the optic chiasm or the optic nerve" },
    { claim: "No high-dose glucocorticoids for thyroiditis, except severe thyrotoxicosis and severe thyroid eye disease", grade: "+000", source: "ese-2022" },
    { claim: "Beta-blockers in symptomatic thyrotoxicosis", grade: "good clinical practice", source: "ese-2022", quote: "We recommend using beta-blockers in symptomatic thyrotoxicosis" },
    { claim: "Levothyroxine when free T4 is below range and TSH above 10 mIU/L", grade: "++00", source: "ese-2022" },
    { claim: "No routine levothyroxine for TSH 4 to 10 mIU/L with normal free T4", grade: "+000", source: "ese-2022" },
    { claim: "Consider tapering and stopping low-dose levothyroxine periodically to see whether the thyroid has recovered", grade: "+000", source: "ese-2022", quote: "In patients with low-dose replacement, we suggest considering tapering and stopping levothyroxine periodically to assess whether thyroid function has recovered" },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-17" },
    { ...ESE_2022, accessed: "2026-11-17" },
    {
      key: "endocrine-irae-definitions-2025",
      label: "Consensus-based disease definitions for endocrine immune-related adverse events of immune checkpoint inhibitors",
      publisher: "irAE Program in partnership with Project Data Sphere; published in the Journal for ImmunoTherapy of Cancer (BMJ)",
      year: 2025,
      url: "https://europepmc.org/article/PMC/PMC12530408",
      doi: "10.1136/jitc-2025-011865",
      gradingScheme: "RAND/UCLA Appropriateness Method (modified Delphi) consensus of an international expert panel; statements are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    { ...ASCO_ICI_2021, accessed: "2026-11-17" },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "The guidelines disagree on whether to treat a raised TSH (4 to 10 mIU/L) with a normal free T4, and on the levothyroxine starting dose; no trial comparing the approaches in people on immunotherapy was found in the sources read.",
    "Recovery from hypothyroidism was only rarely reported, and the proportion of transient versus permanent hypothyroidism cannot be defined from the studies ESE reviewed.",
    "ESE's statement that adrenal insufficiency should be excluded before levothyroxine is in its hypophysitis section (the rationale to R 2.5), not its thyroid section; SITC's thyroid recommendation says to test morning cortisol but does not say when relative to starting levothyroxine.",
    "The symptoms named in the patient summary are from the clinical presentation table of the 2025 consensus definitions. None of the sources read gives patients a time limit for reporting symptoms, so none is stated here.",
    "A position statement on children, from the Clinical Practice Committee of the European Society for Paediatric Endocrinology (Hormone Research in Paediatrics, 2026, DOI 10.1159/000546146), was found in Europe PMC on 17 November 2026 and has not been read; this page covers adults only.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "levothyroxine"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["immune-endocrinopathy", "irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-hypophysitis-adrenal", "checkpoint-inhibitor-baseline-and-monitoring"],
  tags: ["protocol", "irae", "endocrine"],
});
