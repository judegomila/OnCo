import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import type { Cancer } from "./schema";

/**
 * Cancer pages are navigable as families: the CancerFamily strip (src/components/EntityDetail.tsx) derives a
 * parent's children from the `parent` field on each subtype, so a child is listed on its parent page without
 * duplication; siblings a patient would compare against live in `related`.
 */

/** Plain words a subtype's tldr must use to name its parent cancer. */
const PARENT_PHRASES: Record<string, RegExp> = {
  melanoma: /melanoma/i,
  leukaemia: /leuk(a)?emia/i,
  aml: /leuk(a)?emia/i,
  "salivary-gland": /salivary/i,
  ovarian: /ovar/i,
  "cutaneous-scc": /squamous cell (carcinoma|cancer) of the skin|cutaneous squamous|skin cancer/i,
  hcc: /hepatocellular|liver cancer/i,
  endometrial: /endometrial|womb|uterine|uterus/i,
  nsclc: /lung cancer|non-small-cell/i,
  sarcoma: /sarcoma/i,
  "biliary-tract-cancer": /biliary|bile duct/i,
  gallbladder: /gallbladder/i,
  thyroid: /thyroid/i,
  "vascular-tumours": /vascular|blood vessel/i,
  glioblastoma: /glioma|glioblastoma|brain tumour/i,
  "brain-tumours": /brain|spinal|central nervous/i,
  "skin-cancer": /skin/i,
  prostate: /prostate/i,
  colorectal: /colorectal|bowel|colon|rect(al|um)/i,
  "oral-cavity-cancer": /oral|mouth/i,
  "non-hodgkin-lymphoma": /lymphoma/i,
  "childhood-cancers": /child|paediatric|infant|young/i,
  rcc: /kidney|renal/i,
  cll: /leuk(a)?emia/i,
  cml: /leuk(a)?emia/i,
  gastric: /gastric|stomach/i,
  "peripheral-t-cell-lymphoma": /lymphoma/i,
  "breast-cancer": /breast/i,
  cervical: /cervical|cervix/i,
  "breast-her2-positive": /breast/i,
  tnbc: /breast cancer/i,
  "myeloproliferative-neoplasms": /myeloproliferative|blood cancer/i,
  sclc: /small-cell lung|lung cancer/i,
  cholangiocarcinoma: /cholangiocarcinoma|bile duct|biliary/i,
  neuroendocrine: /neuroendocrine|carcinoid/i,
  medulloblastoma: /medulloblastoma/i,
  "all-leukemia": /leuk(a)?emia/i,
  "breast-hr-positive": /breast/i,
  neuroblastoma: /neuroblastoma/i,
  mds: /myelodysplastic/i,
  "head-and-neck": /head and neck/i,
  "oropharyngeal-cancer": /oropharyn|throat|tonsil/i,
  "laryngeal-cancer": /laryn|voice box|throat/i,
  gist: /GIST|stromal/,
  "basal-cell-carcinoma": /basal cell/i,
  urothelial: /bladder|urothelial/i,
  "multiple-myeloma": /myeloma/i,
  testicular: /testic|testis|germ cell/i,
  "lung-cancer": /lung/i,
  esophageal: /oesophag|esophag|gullet/i,
  mesothelioma: /mesothelioma/i,
  anal: /anal/i,
  penile: /penile|penis/i,
  vulvar: /vulva/i,
  vaginal: /vagina/i,
  "thymic-epithelial": /thym/i,
  adrenocortical: /adrenocortical|adrenal/i,
  appendiceal: /appendi/i,
  "small-bowel": /small bowel|small intestin/i,
  "cancer-of-unknown-primary": /unknown primary/i,
  histiocytoses: /histiocyt/i,
  "langerhans-cell-histiocytosis": /langerhans|histiocytosis/i,
  "systemic-mastocytosis": /mastocytosis/i,
  "hodgkin-lymphoma": /hodgkin/i,
  "gestational-trophoblastic": /trophoblastic/i,
  "pheochromocytoma-paraganglioma": /pheochromocytoma|paraganglioma/i,
  nasopharyngeal: /nasopharyn/i,
  sinonasal: /sinonasal|nasal cavity|nose|sinus/i,
  pancreatic: /pancrea/i,
};

/** At most this many same-parent siblings in `related`: a comparison set, not the whole family. */
const MAX_SIBLINGS = 6;

describe("cancer families", () => {
  const g = graph();
  const cancers = g.kind("cancer") as Cancer[];
  const subtypes = cancers.filter((c) => c.parent);
  const childrenOf = (id: string) => cancers.filter((c) => c.parent === id);

  it("has a substantial set of subtype pages", () => {
    expect(cancers.length).toBeGreaterThanOrEqual(270);
    expect(subtypes.length).toBeGreaterThanOrEqual(220);
  });

  it("every parent resolves to a cancer and lists its children by derivation (no duplicated child list)", () => {
    for (const c of subtypes) {
      const p = g.get(c.parent!);
      expect(p?.kind, `${c.id} parent ${c.parent}`).toBe("cancer");
      expect(c.parent, `${c.id} is its own parent`).not.toBe(c.id);
      // The CancerFamily strip renders children from the `parent` field, so the parent page shows this child.
      expect(childrenOf(c.parent!).map((x) => x.id), `${c.parent} children`).toContain(c.id);
    }
  });

  it("every subtype relates to at least one sibling or its parent", () => {
    for (const c of subtypes) {
      const family = new Set([c.parent!, ...childrenOf(c.parent!).map((x) => x.id)]);
      const hit = c.related.some((r) => r !== c.id && family.has(r));
      expect(hit, `${c.id} has no family member in related: ${c.related.join(", ")}`).toBe(true);
    }
  });

  it("related ids resolve, never point to self, and sibling links are capped", () => {
    for (const c of cancers) {
      for (const r of c.related) {
        expect(r, `${c.id} relates to itself`).not.toBe(c.id);
        expect(g.get(r), `${c.id} related id ${r} is missing`).toBeDefined();
      }
      expect(new Set(c.related).size, `${c.id} has duplicate related ids`).toBe(c.related.length);
      if (c.parent) {
        const sibs = new Set(childrenOf(c.parent).map((x) => x.id));
        const n = c.related.filter((r) => sibs.has(r)).length;
        expect(n, `${c.id} links ${n} siblings`).toBeLessThanOrEqual(MAX_SIBLINGS);
      }
    }
  });

  it("sibling links are reciprocal for the flagship comparisons", () => {
    const pairs: Array<[string, string]> = [
      ["egfr-mutant-nsclc", "alk-positive-nsclc"], ["egfr-mutant-nsclc", "kras-g12c-nsclc"],
      ["limited-stage-sclc", "extensive-stage-sclc"],
      ["platinum-sensitive-ovarian-cancer", "platinum-resistant-ovarian-cancer"],
      ["her2-low-metastatic-breast-cancer", "breast-her2-positive"], ["her2-low-metastatic-breast-cancer", "tnbc"],
      ["prostate-mhspc", "prostate-mcrpc"], ["aml-flt3", "aml-idh"], ["dlbcl", "follicular-lymphoma"],
    ];
    for (const [a, b] of pairs) {
      expect((g.must(a) as Cancer).related, `${a} -> ${b}`).toContain(b);
      expect((g.must(b) as Cancer).related, `${b} -> ${a}`).toContain(a);
    }
  });

  it("every subtype tldr names its parent cancer in plain words", () => {
    for (const c of subtypes) {
      const re = PARENT_PHRASES[c.parent!];
      expect(re, `no parent phrase for ${c.parent}`).toBeDefined();
      expect(re.test(c.tldr), `${c.id} tldr does not name ${c.parent}: ${c.tldr.slice(0, 80)}`).toBe(true);
    }
  });
});
