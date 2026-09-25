import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { buildBrowser } from "./kind-browser";
import { PRODUCT_RANKING_SLUGS, rankings, SUPPORTIVE_NOTE } from "./rankings";
import { isSupportive, isSupportiveIndication, splitSupportive, SUPPORTIVE_FACET, SUPPORTIVE_LABEL, treatments, TREATMENT_LABEL } from "./supportive-care";
import { SUPPORTIVE_DRUGS, SUPPORTIVE_NOT_FLAGGED } from "@/data/supportive-drugs";

const g = graph();

describe("supportive care medicines", () => {
  it("every listed id is a drug record and carries the flag; nothing else does", () => {
    for (const id of Object.keys(SUPPORTIVE_DRUGS)) {
      const d = g.get(id);
      expect(d?.kind, id).toBe("drug");
      expect(d?.kind === "drug" && d.supportive, id).toBe(true);
    }
    const flagged = g.kind("drug").filter(isSupportive).map((d) => d.id).sort();
    expect(flagged).toEqual(Object.keys(SUPPORTIVE_DRUGS).sort());
    expect(flagged.length).toBeGreaterThanOrEqual(50);
  });

  it("the borderline records left as treatments exist and are not flagged", () => {
    for (const id of Object.keys(SUPPORTIVE_NOT_FLAGGED)) {
      const d = g.get(id);
      expect(d?.kind, id).toBe("drug");
      expect(d?.kind === "drug" && isSupportive(d), id).toBe(false);
      expect(id in SUPPORTIVE_DRUGS, id).toBe(false);
    }
  });

  it("the indication rule the fetchers apply agrees with the flag on the labels that are clear-cut", () => {
    expect(isSupportiveIndication("Prevention of acute and delayed nausea and vomiting with highly emetogenic chemotherapy")).toBe(true);
    expect(isSupportiveIndication("Reduction of febrile neutropenia in non-myeloid malignancies on myelosuppressive chemotherapy")).toBe(true);
    expect(isSupportiveIndication("Breakthrough pain in adults receiving maintenance opioid therapy for chronic cancer pain")).toBe(true);
    expect(isSupportiveIndication("Prevention of skeletal-related events in bone metastases from solid tumours")).toBe(true);
    expect(isSupportiveIndication("Emergency treatment after fluorouracil or capecitabine overdose or early-onset severe toxicity within 96 hours")).toBe(true);
    expect(isSupportiveIndication("Replacement therapy in hypogammaglobulinaemia with recurrent bacterial infections in CLL")).toBe(true);
    expect(isSupportiveIndication("First-line metastatic NSCLC with EGFR exon 19 del or L858R")).toBe(false);
    expect(isSupportiveIndication("Relapsed myeloma with dexamethasone")).toBe(false);
    expect(isSupportiveIndication("Anorexia, cachexia or unexplained weight loss in AIDS; palliative treatment of advanced carcinoma of the breast")).toBe(false);
    // On the corpus: a drug whose every approval reads supportive under the rule is flagged, unless an editor listed it as not flagged.
    for (const d of g.kind("drug")) {
      if (!d.approvals.length || d.id in SUPPORTIVE_NOT_FLAGGED) continue;
      if (d.approvals.every((a) => isSupportiveIndication(a.indication))) expect(isSupportive(d), `${d.id} reads supportive on every approval: ${d.approvals.map((a) => a.indication).join(" | ")}`).toBe(true);
    }
  });

  it("no supportive medicine appears in a ranking that counts products, and each such table says so", () => {
    const supportive = new Set(Object.keys(SUPPORTIVE_DRUGS));
    for (const r of rankings()) {
      if (r.kind === "drug") for (const row of r.rows) expect(supportive.has(row.id), `${r.slug}: ${row.id}`).toBe(false);
      if (PRODUCT_RANKING_SLUGS.has(r.slug)) expect(r.how.endsWith(SUPPORTIVE_NOTE), r.slug).toBe(true);
      else expect(r.how.includes(SUPPORTIVE_NOTE), r.slug).toBe(false);
    }
    for (const slug of PRODUCT_RANKING_SLUGS) expect(rankings().some((r) => r.slug === slug), slug).toBe(true);
  });

  it("treatments() is the drug kind minus the flagged records", () => {
    expect(treatments(g).length + Object.keys(SUPPORTIVE_DRUGS).length).toBe(g.kind("drug").length);
    const soc = splitSupportive(g, ["zoledronic-acid", "denosumab", "trastuzumab", "adc"]);
    expect(soc.supportive).toEqual(["zoledronic-acid", "denosumab"]);
    expect(soc.treatments).toEqual(["trastuzumab", "adc"]);
  });

  it("the drug browser carries a Purpose facet with both values", () => {
    const b = buildBrowser("drug");
    const facet = b.facets.find((f) => f.key === SUPPORTIVE_FACET);
    expect(facet?.order).toEqual([TREATMENT_LABEL, SUPPORTIVE_LABEL]);
    const values = new Set(b.rows.flatMap((r) => r.facets[SUPPORTIVE_FACET] ?? []));
    expect([...values].sort()).toEqual([SUPPORTIVE_LABEL, TREATMENT_LABEL].sort());
    expect(b.rows.filter((r) => r.facets[SUPPORTIVE_FACET]?.[0] === SUPPORTIVE_LABEL).length).toBe(Object.keys(SUPPORTIVE_DRUGS).length);
  });
});
