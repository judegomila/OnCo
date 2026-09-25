/**
 * Cooperative trials groups have one home (docs/IMPROVEMENTS-100.md row 251, 25 September 2026): company records of type
 * cooperative-group. The 35 groups that were institution records of type consortium moved with their ids, research
 * output, people and links; these tests keep any group from coming back as an institution and keep the moved records
 * reachable from their old routes.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { companiesCooperativeGroupsMigrated } from "@/data/companies-cooperative-groups-migrated";
import { SPONSOR_PATTERNS } from "@/data/sponsor-aliases";

const g = graph();
const MIGRATED = companiesCooperativeGroupsMigrated.map((c) => c.id);
const companyIds = new Set(g.kind("company").map((c) => c.id));
const institutionIds = new Set(g.kind("institution").map((i) => i.id));
/** Names that mark an academic trials group rather than a society, charity, network or alliance of hospitals. */
const TRIALS_GROUP = /\b(study|trials?|oncology|cooperative|lymphoma|leuk\w*|myeloma|sarcoma|breast|gyn\w*|radiation|research) group\b|\bintergroup\b|\bcooperative group\b|\btrials unit\b|\bstudy association\b|\bstudiengruppe\b/i;

describe("cooperative groups have one home", () => {
  it("the 35 migrated groups are cooperative-group companies under their old ids, and none is an institution", () => {
    expect(MIGRATED.length).toBe(35);
    for (const id of ["swog", "ecog-acrin", "nrg-oncology", "alliance-oncology", "curie-nki-eortc", "childrens-oncology-group", "jcog", "anzup", "ctong", "itcc"]) expect(MIGRATED, id).toContain(id);
    for (const id of MIGRATED) {
      const e = g.get(id);
      expect(e?.kind, id).toBe("company");
      expect(e?.kind === "company" && e.companyType, id).toBe("cooperative-group");
      expect(institutionIds.has(id), `${id} still has an institution record`).toBe(false);
    }
  });

  it("no institution of type consortium is a trials group by name; those are companies", () => {
    const offenders = g.kind("institution").filter((i) => i.institutionType === "consortium" && [i.name, ...i.aka].some((n) => TRIALS_GROUP.test(n))).map((i) => `${i.id} (${i.name})`);
    expect(offenders, "institution records that read as cooperative trials groups").toEqual([]);
  });

  it("sponsor aliases of kind cooperative-group point only at cooperative-group companies, and no institution alias points at a consortium", () => {
    for (const [, t] of SPONSOR_PATTERNS) {
      if (!t.id) continue;
      const e = g.get(t.id);
      if (t.kind === "cooperative-group") expect(e?.kind === "company" && e.companyType, t.label).toBe("cooperative-group");
      if (t.kind === "institution") expect(e?.kind === "institution" && e.institutionType, t.label).not.toBe("consortium");
    }
  });

  it("typed relation arrays hold the kind they name: no company id sits in `institutions`, no institution id in `companies`", () => {
    const misfiledCompanies: string[] = [], misfiledInstitutions: string[] = [];
    for (const e of g.entities) {
      for (const id of e.institutions) if (companyIds.has(id)) misfiledCompanies.push(`${e.id} lists company ${id} under institutions`);
      for (const id of e.companies) if (institutionIds.has(id)) misfiledInstitutions.push(`${e.id} lists institution ${id} under companies`);
    }
    expect(misfiledCompanies).toEqual([]);
    expect(misfiledInstitutions).toEqual([]);
  });

  it("a person's primary affiliation is an institution or a cooperative-group company", () => {
    for (const p of g.kind("person")) {
      if (!p.institutionId) continue;
      const a = g.get(p.institutionId);
      const ok = a?.kind === "institution" || (a?.kind === "company" && a.companyType === "cooperative-group");
      expect(ok, `${p.id} is affiliated to ${p.institutionId} (${a?.kind ?? "missing"})`).toBe(true);
    }
  });

  it("the old /institutions/<id>/ routes redirect to /companies/<id>/ in vercel.json and as static stubs", () => {
    const cfg = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8")) as { redirects: Array<{ source: string; destination: string }> };
    for (const id of MIGRATED) {
      const r = cfg.redirects.find((x) => x.source === `/institutions/${id}/:path*`);
      expect(r?.destination, id).toBe(`/companies/${id}/:path*`);
      expect(existsSync(join(process.cwd(), "public", "institutions", id, "index.html")), `stub for ${id}`).toBe(true);
    }
  });

  it("the research output that the institution records had stays readable under the same id", () => {
    const withSnapshot = MIGRATED.filter((id) => existsSync(join(process.cwd(), "public", "openalex", "research", `${id}.json`)));
    expect(withSnapshot.length).toBeGreaterThanOrEqual(20);
    for (const id of withSnapshot) {
      const r = JSON.parse(readFileSync(join(process.cwd(), "public", "openalex", "research", `${id}.json`), "utf8")) as { institutionId: string; works: number };
      expect(r.institutionId).toBe(id);
    }
  });

  it("migrated records keep what the institution records carried: people, links, notes from programmes, a seat and a founding year where stated", () => {
    for (const c of companiesCooperativeGroupsMigrated) {
      expect(c.hq, c.id).toBeTruthy();
      expect(c.links?.length ?? 0, c.id).toBeGreaterThan(0);
      expect(c.drugs ?? [], `${c.id} lists products; the drugs a group tested belong in related`).toEqual([]);
      expect(c.tags, c.id).toContain("cooperative-group");
    }
    const swog = g.get("swog");
    expect(swog?.people.length).toBeGreaterThan(3);
    expect(swog?.kind === "company" && swog.founded).toBe(1956);
    expect((g.incoming("swog").get("trial") ?? []).length).toBeGreaterThan(0);
  });
});
