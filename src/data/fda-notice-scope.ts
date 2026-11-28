/**
 * Editorially reviewed entity links for exact FDA Oncology Center of Excellence notices.
 * Drug IDs name the approved product and regimen partners, not prior treatment or trial comparators.
 * Cancer IDs link to the closest established disease page; the FDA notice states the actual indication.
 * Keep separate entries for distinct approvals of the same drug.
 */
type NoticeScope = { drugIds: string[]; cancerIds: string[] };

const reviewed = new Map<string, NoticeScope>([
  ["https://www.fda.gov/drugs/cancer-approvals/fda-approves-bezuclastinib-combination-sunitinib-advanced-gastrointestinal-stromal-tumors", { drugIds: ["bezuclastinib", "sunitinib"], cancerIds: ["gist"] }],
  ["https://www.fda.gov/drugs/cancer-approvals/fda-approves-giredestrant-adjuvant-treatment-er-positive-her2-negative-stage-i-ii-and-iii-breast", { drugIds: ["giredestrant"], cancerIds: ["breast-hr-positive"] }],
  ["https://www.fda.gov/drugs/cancer-approvals/fda-grants-accelerated-approval-neladalkib-previously-treated-locally-advanced-or-metastatic-alk", { drugIds: ["neladalkib"], cancerIds: ["alk-positive-nsclc"] }],
  ["https://www.fda.gov/drugs/cancer-approvals/fda-approves-giredestrant-combination-everolimus-er-positive-her2-negative-esr1-mutated-locally", { drugIds: ["giredestrant", "everolimus"], cancerIds: ["breast-hr-positive"] }],
  ["https://www.fda.gov/drugs/cancer-approvals/fda-approves-durvalumab-enfortumab-vedotin-ejfv-muscle-invasive-bladder-cancer", { drugIds: ["durvalumab", "enfortumab-vedotin"], cancerIds: ["muscle-invasive-bladder-cancer"] }],
]);

export function reviewedFdaNoticeScope(url: string): NoticeScope | undefined {
  return reviewed.get(url.trim().replace(/\/+$/, ""));
}
