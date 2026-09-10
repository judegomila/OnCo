import { describe, expect, it } from "vitest";
import { UNIVERSE, UNIVERSE_LISTS } from "@/data/universe";
import { cancerKeys, companyKey, companyKeys, completeness, drugKeys, headline, host, institutionKeys, KEGG_TO_ONCO, nameParts, norm, pctOf, personKey, targetKeys } from "./completeness";
import { graph } from "./graph";
import { KINDS } from "./schema";
import { parseKeggCancer, parseNciDrugs, parseNciTypes, parseNhsAlliances, sponsorFromOceSummary } from "../../scripts/fetch-universe";

const ISO = /^\d{4}-\d{2}-\d{2}$/;

describe("universe denominators", () => {
  it("every denominator has a stable id, a checkable https source, a method and a checked date", () => {
    const ids = new Set<string>();
    for (const d of UNIVERSE) {
      expect(d.id, "id").toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(ids.has(d.id), `duplicate id ${d.id}`).toBe(false);
      ids.add(d.id);
      expect(d.source.url, d.id).toMatch(/^https:\/\//);
      expect(d.source.label.length, d.id).toBeGreaterThan(3);
      expect(d.method.length, d.id).toBeGreaterThan(20);
      expect(d.checked, d.id).toMatch(ISO);
      expect(d.scope.length, d.id).toBeGreaterThan(3);
      expect(d.ours.length, d.id).toBeGreaterThan(3);
      if (d.kind !== "none") expect(KINDS).toContain(d.kind);
    }
  });

  it("totals are positive integers, or null only for OnCo-defined kinds", () => {
    for (const d of UNIVERSE) {
      if (d.total === null) {
        expect(d.method, d.id).toMatch(/OnCo-defined/);
        expect(["technology", "section", "pairing", "roadmap", "idea", "bottleneck", "collection"]).toContain(d.kind);
      } else {
        expect(Number.isInteger(d.total), d.id).toBe(true);
        expect(d.total, d.id).toBeGreaterThan(0);
      }
    }
  });

  it("every kind in the schema has at least one row", () => {
    for (const k of KINDS) {
      if (k === "term" || k === "person") continue; // covered below
      expect(UNIVERSE.some((d) => d.kind === k), k).toBe(true);
    }
    expect(UNIVERSE.some((d) => d.kind === "term")).toBe(true);
    expect(UNIVERSE.some((d) => d.kind === "person")).toBe(true);
  });

  it("list-backed denominators point at a snapshot whose item count matches the total (or the derived scope)", () => {
    for (const d of UNIVERSE) {
      if (!d.list) continue;
      const snap = UNIVERSE_LISTS[d.list as keyof typeof UNIVERSE_LISTS];
      expect(snap, d.id).toBeDefined();
      expect(snap.source.url, d.id).toMatch(/^https:\/\//);
      expect(snap.checked, d.id).toMatch(ISO);
      expect(Array.isArray(snap.items), d.id).toBe(true);
    }
    expect(UNIVERSE_LISTS["nci-cancer-drugs"].items.length).toBe(UNIVERSE_LISTS["nci-cancer-drugs"].total);
    expect(UNIVERSE_LISTS["nci-cancer-centers"].items.length).toBe(UNIVERSE_LISTS["nci-cancer-centers"].total);
    expect(UNIVERSE_LISTS["globocan-sites"].items.length).toBe(36);
    expect(UNIVERSE_LISTS["hallmarks-2022"].items.length).toBe(14);
  });

  it("hallmark and KEGG hand-mappings only name pathway pages that exist", () => {
    const g = graph();
    for (const h of UNIVERSE_LISTS["hallmarks-2022"].items) {
      expect(h.oncoIds.length, h.name).toBeGreaterThan(0);
      for (const id of h.oncoIds) expect(g.get(id)?.kind, `${h.name}: ${id}`).toBe("pathway");
    }
    const keggIds = new Set(UNIVERSE_LISTS["kegg-cancer-pathways"].items.map((k) => k.id));
    for (const [kegg, ids] of Object.entries(KEGG_TO_ONCO)) {
      expect(keggIds.has(kegg), kegg).toBe(true);
      for (const id of ids) expect(g.get(id)?.kind, `${kegg}: ${id}`).toBe("pathway");
    }
  });
});

describe("completeness maths", () => {
  it("pctOf rounds to one decimal, caps at 100 and is null without a denominator", () => {
    expect(pctOf(248, 382)).toBe(64.9);
    expect(pctOf(1, 3)).toBe(33.3);
    expect(pctOf(0, 10)).toBe(0);
    expect(pctOf(20, 10)).toBe(100);
    expect(pctOf(5, null)).toBeNull();
    expect(pctOf(5, 0)).toBeNull();
  });

  it("every row is internally consistent", () => {
    const rows = completeness();
    expect(rows.length).toBe(UNIVERSE.length);
    for (const r of rows) {
      expect(Number.isInteger(r.ours), r.den.id).toBe(true);
      expect(r.ours, r.den.id).toBeGreaterThanOrEqual(0);
      if (r.den.total === null) {
        expect(r.pct, r.den.id).toBeNull();
        expect(r.missing, r.den.id).toEqual([]);
      } else {
        expect(r.pct, r.den.id).toBe(pctOf(r.ours, r.den.total));
        expect(r.pct as number, r.den.id).toBeGreaterThanOrEqual(0);
        expect(r.pct as number, r.den.id).toBeLessThanOrEqual(100);
      }
      if (r.listed) {
        // matched + missing = the list, so nothing is silently dropped or double counted
        expect(r.ours + r.missing.length, r.den.id).toBe(r.den.total);
        for (const m of r.missing) expect(m.name.length, r.den.id).toBeGreaterThan(0);
        const names = r.missing.map((m) => `${m.name}|${m.url ?? ""}|${m.detail ?? ""}`);
        expect(new Set(names).size, `${r.den.id} has duplicate missing items`).toBe(names.length);
      } else {
        expect(r.missing, r.den.id).toEqual([]);
      }
    }
  });

  it("the headline sums only list-backed scopes", () => {
    const rows = completeness();
    const h = headline(rows);
    const listed = rows.filter((r) => r.listed);
    expect(h.total).toBe(listed.reduce((s, r) => s + (r.den.total ?? 0), 0));
    expect(h.ours).toBe(listed.reduce((s, r) => s + r.ours, 0));
    expect(h.pct).toBe(pctOf(h.ours, h.total));
  });

  it("known corpus members are matched, so the missing lists are gaps not matcher misses", () => {
    const rows = completeness();
    const missing = (id: string) => rows.find((r) => r.den.id === id)!.missing.map((m) => m.name);
    expect(missing("drugs-nci-az")).not.toContain("Abemaciclib");
    expect(missing("drugs-nci-az")).not.toContain("Trastuzumab Deruxtecan");
    expect(missing("institutions-nci")).not.toContain("The University of Texas MD Anderson Cancer Center");
    expect(missing("institutions-nci")).not.toContain("Memorial Sloan-Kettering Cancer Center");
    expect(missing("companies-fda-oce")).not.toContain("AstraZeneca");
    expect(missing("cancers-nci-az")).not.toContain("Prostate Cancer");
    expect(missing("pathways-hallmarks")).toEqual([]);
    expect(rows.find((r) => r.den.id === "institutions-nci")!.pct as number).toBeGreaterThan(80);
  });
});

describe("normalisation", () => {
  it("treats UK and US spellings and punctuation as equal", () => {
    expect(norm("Acute lymphoblastic leukaemia")).toBe(norm("Acute Lymphoblastic Leukemia"));
    expect(norm("Oesophageal cancer")).toBe(norm("Esophageal Cancer"));
    expect(norm("Wnt / β-catenin")).toBe("wnt catenin");
    expect(norm("Bladder & urothelial cancer")).toBe("bladder and urothelial cancer");
  });

  it("splits names into parts", () => {
    expect(nameParts("Enhertu (fam-trastuzumab deruxtecan-nxki)")).toEqual(["Enhertu", "fam-trastuzumab deruxtecan-nxki"]);
    expect(nameParts("Gleolan / Gliolan")).toEqual(["Gleolan", "Gliolan"]);
    expect(nameParts("Abramson Cancer Center, University of Pennsylvania")).toEqual(["Abramson Cancer Center", "University of Pennsylvania"]);
  });

  it("drug keys ignore salts, FDA suffixes and brand brackets", () => {
    const keys = drugKeys({ name: "Trastuzumab deruxtecan (T-DXd)", aka: [], brand: "Enhertu", code: "DS-8201" });
    expect(keys.has("trastuzumab deruxtecan")).toBe(true);
    expect(keys.has("enhertu")).toBe(true);
    expect(keys.has("t dxd")).toBe(true);
    expect(drugKeys({ name: "Abiraterone acetate", aka: [], brand: "Zytiga (generic)" }).has("abiraterone")).toBe(true);
    expect(drugKeys({ name: "Fam-trastuzumab deruxtecan-nxki", aka: [] }).has("trastuzumab deruxtecan")).toBe(true);
  });

  it("company keys strip corporate words and follow aliases", () => {
    expect(companyKey("Merck Sharp & Dohme LLC")).toBe("merck");
    expect(companyKey("Eli Lilly and Company")).toBe("eli lilly");
    expect(companyKey("Hoffmann-La Roche")).toBe("roche");
    expect(companyKey("GlaxoSmithKline")).toBe("gsk");
    expect(companyKeys({ name: "Pfizer (incl. Seagen)", aka: [] }).has("seagen")).toBe(true);
    expect(companyKeys({ name: "Roche / Genentech", aka: [] }).has("genentech")).toBe(true);
  });

  it("target keys expand fused and numbered symbols", () => {
    expect(targetKeys({ name: "AKT", aka: [], symbol: "AKT1/2/3" })).toEqual(new Set(["akt", "akt1", "akt2", "akt3", "akt1 2 3"]));
    expect(targetKeys({ name: "BCR::ABL1 (Philadelphia chromosome)", aka: [], symbol: "BCR-ABL1" }).has("abl1")).toBe(true);
    expect(targetKeys({ name: "BRCA1 / BRCA2 (HRD)", aka: [], symbol: "BRCA1, BRCA2" }).has("brca2")).toBe(true);
  });

  it("cancer, institution and person keys", () => {
    expect(cancerKeys({ name: "Bladder & urothelial cancer", aka: [] }).has("bladder")).toBe(true);
    expect(cancerKeys({ name: "Gastric (stomach) cancer", aka: [] }).has("stomach")).toBe(true);
    const inst = institutionKeys({ name: "UCLA Jonsson Comprehensive Cancer Center", aka: [], website: "https://www.cancer.ucla.edu/" });
    expect(inst.has("host:cancer.ucla.edu")).toBe(true);
    expect(inst.has("ucla jonsson cancer center")).toBe(true);
    expect(host("http://www.mdanderson.org/path")).toBe("mdanderson.org");
    expect(host(undefined)).toBeUndefined();
    expect(personKey("Prof. Dr Shahrokh Shariat")).toBe("shahrokh shariat");
    expect(personKey("Mrs Charlotte Symmons, PhD")).toBe("charlotte symmons");
  });
});

describe("fetch-universe parsers", () => {
  it("folds NCI brand entries into their generic page", () => {
    const html = `<ul><li><a href="/about-cancer/treatment/drugs/abemaciclib" data-entity-type="node">Abemaciclib</a></li>
      <li><a href="/about-cancer/treatment/drugs/abemaciclib" data-entity-type="node">Verzenio (Abemaciclib)</a></li>
      <li><a href="/about-cancer/treatment/drugs/abvd" data-entity-type="node">ABVD</a></li>
      <li><a href="/about-cancer/treatment/drugs/cancer-type">Drugs Approved for Different Types of Cancer</a></li></ul>`;
    const { items, entries } = parseNciDrugs(html);
    expect(entries).toBe(3);
    expect(items.map((i) => i.slug)).toEqual(["abemaciclib", "abvd"]);
    expect(items[0].names).toEqual(["Abemaciclib", "Verzenio (Abemaciclib)"]);
  });

  it("reads NCI cancer types from the combo box and NHS alliances from the map list", () => {
    expect(parseNciTypes(`<option value="">Select</option><option value="Breast Cancer" data-link="/types/breast">Breast Cancer</option><option value="Breast Cancer" data-link="/types/breast">Breast Cancer</option><option value="Anal Cancer" data-link="/types/anal">Anal Cancer</option>`)).toEqual([
      { name: "Anal Cancer", link: "https://www.cancer.gov/types/anal" }, { name: "Breast Cancer", link: "https://www.cancer.gov/types/breast" },
    ]);
    expect(parseNhsAlliances(`<h2>Map of Cancer Alliances in England</h2><ol><li><a href="https://a.nhs.uk">Northern Cancer Alliance</a></li><li><a href="https://rmpartners.nhs.uk/">Royal Marsden Partners</a></li></ol>`)).toHaveLength(2);
  });

  it("reads KEGG cancer maps and FDA OCE sponsors", () => {
    const kegg = parseKeggCancer("A<b>Human Diseases</b>\nB  Cancer: overview\nC    05200  Pathways in cancer\nB  Cancer: specific types\nC    05210  Colorectal cancer\nB  Immune disease\nC    05310  Asthma\n");
    expect(kegg).toEqual([{ id: "hsa05200", name: "Pathways in cancer", group: "overview" }, { id: "hsa05210", name: "Colorectal cancer", group: "specific" }]);
    expect(sponsorFromOceSummary("On June 3, 2026, the Food and Drug Administration approved daraxonrasib (RASONQUE, Revolution Medicines, Inc.), an inhibitor")).toBe("Revolution Medicines, Inc.");
    expect(sponsorFromOceSummary("the Food and Drug Administration approved penpulimab-kcqx (Akeso Biopharma Co., Ltd.) with cisplatin")).toBe("Akeso Biopharma Co., Ltd.");
    expect(sponsorFromOceSummary("granted accelerated approval to adagrasib (Krazati; Mirati Therapeutics, Inc.) plus cetuximab")).toBe("Mirati Therapeutics, Inc.");
    expect(sponsorFromOceSummary("granted accelerated approval to sunvozertinib (Zegfrovy, Dizal (Jiangsu) Pharmaceutical Co., Ltd.) for adult")).toBe("Dizal (Jiangsu) Pharmaceutical Co., Ltd.");
    expect(sponsorFromOceSummary("The FDA is providing this communication about capecitabine (Xeloda) and fluorouracil (5-FU)")).toBeUndefined();
  });
});
