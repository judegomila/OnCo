import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { buildBrowser } from "./kind-browser";
import { COMPANY_TYPES } from "./schema";
import { COMPANY_TYPE_GLYPH, COMPANY_TYPE_LABEL, COMPANY_TYPE_TIP } from "./startups";
import { valueTone } from "./valueTone";
import { resolveSponsor, SPONSOR_PATTERNS } from "@/data/sponsor-aliases";
import { companiesCooperativeGroups } from "@/data/companies-cooperative-groups";
import { companyKeys } from "./completeness";

const g = graph();
const groups = g.kind("company").filter((c) => c.companyType === "cooperative-group");

describe("cooperative groups as company records", () => {
  it("every cooperative-group record sponsors at least one corpus trial, and every trial it lists exists", () => {
    expect(groups.length).toBeGreaterThanOrEqual(20);
    for (const c of groups) {
      const linked = new Set<string>(c.trials);
      for (const t of g.incoming(c.id).get("trial") ?? []) linked.add(t.id);
      expect(linked.size, `${c.id} sponsors no trial`).toBeGreaterThan(0);
      for (const id of c.trials) expect(g.get(id)?.kind, `${c.id} lists ${id}`).toBe("trial");
      for (const id of c.cancers) expect(g.get(id)?.kind, `${c.id} names cancer ${id}`).toBe("cancer");
      expect(c.drugs, `${c.id} has no products of its own`).toEqual([]);
    }
  });

  it("the records file holds only cooperative groups with a website or a registry link, a country and a description", () => {
    for (const c of companiesCooperativeGroups) {
      expect(c.companyType).toBe("cooperative-group");
      expect(c.country).toMatch(/^[A-Z]{2}$/);
      expect(c.links?.length ?? 0, c.id).toBeGreaterThan(0);
      expect(c.summary.length, c.id).toBeGreaterThan(200);
      if (c.founded) expect(c.summary, `${c.id} states the source of its founding year`).toMatch(new RegExp(String(c.founded)));
    }
  });

  it("the registry lead-sponsor spelling of each group is one of its company keys, so scripts/fetch-entity-trials.ts links it", () => {
    const spellings: Record<string, string> = {
      gortec: "Groupe Oncologie Radiotherapie Tete et Cou", "german-cll-study-group": "German CLL Study Group", "ago-study-group": "AGO Research GmbH", aio: "AIO-Studien-gGmbH",
      "mrc-ctu": "Medical Research Council", horg: "Hellenic Oncology Research Group", gercor: "GERCOR - Multidisciplinary Oncology Cooperative Group", "italian-sarcoma-group": "Italian Sarcoma Group",
      "scandinavian-sarcoma-group": "Scandinavian Sarcoma Group", "european-myeloma-network": "Stichting European Myeloma Network", ifm: "Intergroupe Francophone du Myelome", alfa: "Acute Leukemia French Association",
      "aids-malignancy-consortium": "AIDS Malignancy Consortium", ocog: "Ontario Clinical Oncology Group (OCOG)", kgog: "Korean Gynecologic Oncology Group", sarc: "Sarcoma Alliance for Research through Collaboration",
      "fondazione-italiana-linfomi": "Fondazione Italiana Linfomi - ETS", filo: "French Innovative Leukemia Organisation",
    };
    for (const [id, spelling] of Object.entries(spellings)) {
      const c = groups.find((x) => x.id === id);
      expect(c, id).toBeTruthy();
      const keys = companyKeys(c!);
      const hit = [...companyKeys({ name: spelling, aka: [] })].some((k) => keys.has(k));
      expect(hit, `${id}: "${spelling}" is not among ${[...keys].join(", ")}`).toBe(true);
      expect(resolveSponsor(spelling).id, `${id}: sponsor alias for "${spelling}"`).toBe(id);
    }
  });

  it("sponsor aliases that name a cooperative group point at a record", () => {
    for (const [, t] of SPONSOR_PATTERNS) if (t.kind === "cooperative-group" && t.id) expect(g.get(t.id), t.label).toBeTruthy();
    expect(resolveSponsor("Intergroupe Francophone du Myelome").id).toBe("ifm");
    expect(resolveSponsor("IFCT (France)").id).toBe("ifct");
    expect(resolveSponsor("Korean Gynecologic Oncology Group").id).toBe("kgog");
    expect(resolveSponsor("NRG Oncology").id).toBe("nrg-oncology");
    expect(resolveSponsor("Cancer and Leukemia Group B (US)").id).toBe("alliance-oncology");
    expect(resolveSponsor("Trans-Tasman Radiation Oncology Group").id).toBe("trog");
  });

  it("the company type enum is covered by every label map, the tone table and the browser facet", () => {
    for (const t of COMPANY_TYPES) {
      expect(COMPANY_TYPE_LABEL[t], t).toBeTruthy();
      expect(valueTone("type", COMPANY_TYPE_LABEL[t]), `tone for ${t}`).toBeTruthy();
    }
    expect(COMPANY_TYPE_GLYPH["cooperative-group"]).toBeTruthy();
    expect(COMPANY_TYPE_TIP["cooperative-group"]).toBeTruthy();
    const b = buildBrowser("company");
    const types = new Set(b.rows.flatMap((r) => r.facets.type ?? []));
    expect(types.has(COMPANY_TYPE_LABEL["cooperative-group"])).toBe(true);
    expect(b.rows.filter((r) => r.facets.type?.[0] === COMPANY_TYPE_LABEL["cooperative-group"]).length).toBe(groups.length);
  });
});
