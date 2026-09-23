import { describe, expect, it } from "vitest";
import type { RegionalCandidate } from "../fetch-ema";
import type { RegionalRow } from "../../src/data/regional-approvals";
import type { EparPage } from "./ema-page";
import { ExactIndex, decideEmaCandidates, longDate, rowForPage } from "./proposals-ema";
import { bodyIsWellFormed } from "./regional-approvals-io";

const EPAR = "https://www.ema.europa.eu/en/medicines/human/EPAR/";
const page = (slug: string, p: Partial<EparPage>): EparPage => ({ url: EPAR + slug, conditional: false, biosimilar: false, generic: false, fields: {}, ...p });
const cand = (slug: string, c: Partial<RegionalCandidate> = {}): RegionalCandidate => ({ region: "EU", product: slug, reason: "missing-row", register: "Authorised", url: EPAR + slug, ...c });

const DRUGS = [
  { id: "rolapitant", name: "Rolapitant", brand: "Varuby", aka: [] },
  { id: "mirdametinib", name: "Mirdametinib", brand: "Ezmekly / Gomekli", aka: ["PD-0325901"] },
  { id: "sasanlimab", name: "Sasanlimab", aka: [] },
  { id: "resminostat", name: "Resminostat", aka: [] },
  { id: "epoetin-alfa", name: "Epoetin alfa", brand: "Eprex", aka: ["epoetin zeta"] },
  { id: "dexamethasone", name: "Dexamethasone", aka: [] },
  { id: "dexamethasone-oral", name: "Dexamethasone (oral, Neofordex)", aka: ["dexamethasone"] },
  { id: "folfox", name: "FOLFOX", aka: ["oxaliplatin"], modality: "Chemotherapy regimen" },
  { id: "ensartinib", name: "Ensartinib", brand: "Gevalka", aka: [] },
  { id: "olaratumab", name: "Olaratumab", brand: "Lartruvo", aka: [] },
];
const ROWS: Record<string, RegionalRow> = {
  rolapitant: { EU: { status: "withdrawn", year: 2019 } },
  resminostat: { EU: { status: "rejected", year: 2025 } },
  olaratumab: { EU: { status: "approved", year: 2016 } },
};
const PAGES: Record<string, EparPage> = {
  varuby: page("varuby", { name: "Varuby", inn: "rolapitant", status: "withdrawn", statusTitle: "Withdrawn", statusMessage: "This medicine's authorisation has been withdrawn", issued: "2017-04-19", withdrawn: "2019-01-14" }),
  ezmekly: page("ezmekly", { name: "Ezmekly", inn: "mirdametinib", activeSubstance: "mirdametinib", status: "authorised", statusTitle: "Authorised", statusMessage: "This medicine is authorised for use in the European Union", issued: "2025-07-17", conditional: true, holder: "Merck Europe B.V." }),
  zumrad: page("zumrad", { name: "Zumrad", inn: "sasanlimab", status: "withdrawn-application", statusTitle: "Application withdrawn", statusMessage: "The application for this medicine has been withdrawn", applicant: "Pfizer Europe MA EEIG" }),
  kinselby: page("kinselby", { name: "Kinselby", inn: "resminostat", activeSubstance: "resminostat mesilate", status: "opinion", statusTitle: "Opinion", statusMessage: "EMA has issued an opinion on this medicine", opinionAdopted: "2025-05-22", opinionStatus: "Negative", applicant: "4Sc AG" }),
  retacrit: page("retacrit", { name: "Retacrit", inn: "epoetin zeta", status: "authorised", statusTitle: "Authorised", statusMessage: "m", issued: "2007-12-18", biosimilar: true }),
  neofordex: page("neofordex", { name: "Neofordex", inn: "dexamethasone", status: "authorised", statusTitle: "Authorised", statusMessage: "m", issued: "2016-03-16" }),
  gevalka: page("gevalka", { name: "Gevalka", inn: "ensartinib", status: "opinion", statusTitle: "Opinion", statusMessage: "EMA has issued an opinion on this medicine", opinionAdopted: "2026-09-17", opinionStatus: "Positive" }),
  lartruvo: page("lartruvo", { name: "Lartruvo", inn: "olaratumab", status: "revoked", statusTitle: "Revoked", statusMessage: "This medicine's authorisation has been revoked", issued: "2016-11-09", revoked: "2019-07-22" }),
  unknownx: page("unknownx", { name: "Unknownx", inn: "nobodyumab", status: "authorised", statusTitle: "Authorised", statusMessage: "m", issued: "2020-01-01" }),
  nostatus: page("nostatus", { name: "Nostatus", inn: "rolapitant" }),
};
const fetch = async (url: string) => PAGES[url.slice(EPAR.length)] ?? null;
const ctx = { drugs: DRUGS, rows: ROWS, today: "2026-09-23", fetch };

describe("ExactIndex", () => {
  const ix = new ExactIndex(DRUGS);
  it("matches whole strings only, case-insensitively, across name, brands and aliases", () => {
    expect(ix.match(["MIRDAMETINIB"])).toEqual(["mirdametinib"]);
    expect(ix.match(["Gomekli"])).toEqual(["mirdametinib"]);
    expect(ix.match(["epoetin zeta"])).toEqual(["epoetin-alfa"]);
    expect(ix.match(["mirdametinib mesilate"])).toEqual([]);
    expect(ix.match(["oxaliplatin"])).toEqual([]);
  });
  it("reports ambiguity", () => {
    expect(ix.match(["dexamethasone"])).toEqual(["dexamethasone", "dexamethasone-oral"]);
  });
});

describe("rowForPage", () => {
  it("writes an authorised medicine as a verified A() row, C() only when the register also says conditional", () => {
    const a = rowForPage(PAGES.ezmekly, cand("ezmekly", { register: "Authorised", indication: "Ezmekly as monotherapy is indicated for the treatment of symptomatic, inoperable plexiform neurofibromas. Second sentence." }), "2026-09-23");
    expect("body" in a && a.body).toBe('{ EU: V(A(2025, epar("ezmekly"), "Ezmekly as monotherapy is indicated for the treatment of symptomatic, inoperable plexiform neurofibromas.", "EMA register: \'Authorised: This medicine is authorised for use in the European Union\'; marketing authorisation issued 17 Jul 2025; received a conditional marketing authorisation; checked 2026-09-23")) }');
    const c = rowForPage(PAGES.ezmekly, cand("ezmekly", { register: "Authorised (conditional)" }), "2026-09-23");
    expect("body" in c && c.body.startsWith('{ EU: V(C(2025, epar("ezmekly"), undefined, ')).toBe(true);
    expect("status" in c && c.status).toBe("conditional");
    expect(bodyIsWellFormed("body" in c ? c.body : "")).toBe(true);
  });
  it("writes withdrawn, application withdrawn and negative opinion with their helpers and dates", () => {
    const w = rowForPage(PAGES.varuby, cand("varuby"), "2026-09-23");
    expect(w).toMatchObject({ status: "withdrawn", year: 2019 });
    expect("body" in w && w.body).toContain('W(2019, epar("varuby"), "Varuby: authorised 19 Apr 2017; marketing authorisation withdrawn 14 Jan 2019. EMA register: \'Withdrawn: This medicine\'s authorisation has been withdrawn\'; checked 2026-09-23")');
    const app = rowForPage(PAGES.zumrad, cand("zumrad"), "2026-09-23");
    expect("body" in app && app.body).toContain('W(undefined, epar("zumrad"), "Zumrad (Pfizer Europe MA EEIG): marketing authorisation application withdrawn before a Commission decision.');
    const after = rowForPage(page("aplidin", { name: "Aplidin", inn: "plitidepsin", status: "withdrawn-application-after-chmp-opinion-", statusTitle: "Application withdrawn", statusMessage: "The application for this medicine has been withdrawn", applicant: "Pharma Mar S.A." }), cand("aplidin"), "2026-09-23");
    expect("body" in after && after.body).toContain('W(undefined, epar("aplidin"), "Aplidin (Pharma Mar S.A.): marketing authorisation application withdrawn after a CHMP opinion.');
    const r = rowForPage(PAGES.kinselby, cand("kinselby"), "2026-09-23");
    expect(r).toMatchObject({ status: "rejected", year: 2025 });
    expect("body" in r && r.body).toBe('{ EU: R(2025, "CHMP negative opinion 22 May 2025 on Kinselby (4Sc AG). EMA register: \'Opinion: EMA has issued an opinion on this medicine\', opinion status Negative; checked 2026-09-23", epar("kinselby")) }');
  });
  it("refuses statuses without a helper, pending opinions and missing dates", () => {
    expect(rowForPage(PAGES.gevalka, cand("gevalka"), "d")).toMatchObject({ reason: expect.stringContaining("CHMP opinion (Positive) without a Commission decision") });
    expect(rowForPage(PAGES.lartruvo, cand("lartruvo"), "d")).toMatchObject({ reason: expect.stringContaining('register status "Revoked" has no helper') });
    expect(rowForPage(page("x", { ...PAGES.varuby, withdrawn: undefined }), cand("x"), "d")).toMatchObject({ reason: expect.stringContaining("no \"Withdrawal of marketing authorisation\" date") });
    expect(rowForPage(PAGES.nostatus, cand("nostatus"), "d")).toMatchObject({ reason: "the register page has no status field" });
    expect(longDate("2026-09-23")).toBe("23 Sep 2026");
  });
});

describe("decideEmaCandidates", () => {
  it("sorts candidates into auto rows, residue with reasons and rows already on main", async () => {
    const d = await decideEmaCandidates([
      cand("ezmekly", { drugId: "mirdametinib", register: "Authorised (conditional)" }),
      cand("zumrad", { drugId: "sasanlimab", register: "Application withdrawn" }),
      cand("varuby", { drugId: "rolapitant", register: "Withdrawn" }),
      cand("kinselby", { drugId: "resminostat", register: "Refused" }),
      cand("retacrit", { drugId: "epoetin-alfa" }),
      cand("neofordex", { drugId: "dexamethasone" }),
      cand("gevalka", { drugId: "ensartinib", register: "Opinion" }),
      cand("lartruvo", { drugId: "olaratumab", register: "Revoked (conditional)" }),
      cand("unknownx", { drugId: "nobody", reason: "missing-row" }),
      cand("nowhere"),
      cand("nostatus", { drugId: "rolapitant" }),
      { region: "EU", product: "Nourl", reason: "not-in-corpus", register: "Authorised" },
    ], ctx);
    expect(d.auto.map((a) => `${a.drugId}:${a.status}:${a.year ?? "-"}`)).toEqual(["mirdametinib:conditional:2025", "sasanlimab:withdrawn:-"]);
    expect(d.auto.every((a) => bodyIsWellFormed(a.body) && a.sourceUrl.startsWith(EPAR) && a.quotedStatus.length > 0)).toBe(true);
    expect(d.dropped.map((x) => `${x.drugId}: ${x.reason}`)).toEqual(["rolapitant: already on main: EU withdrawn 2019", "resminostat: already on main: EU rejected 2025"]);
    const reasons = Object.fromEntries(d.residue.map((r) => [r.candidate.product, [r.kind, r.reason]]));
    expect(reasons.retacrit[0]).toBe("new-product");
    expect(reasons.retacrit[1]).toContain("biosimilar of epoetin zeta");
    expect(reasons.neofordex[1]).toContain("names 2 corpus products exactly (dexamethasone, dexamethasone-oral)");
    expect(reasons.gevalka[1]).toContain("without a Commission decision");
    expect(reasons.lartruvo[0]).toBe("regional-status");
    expect(reasons.lartruvo[1]).toBe('register status "Revoked" has no helper in regional-approvals.ts; the recorded EU row says approved (2016)');
    expect(reasons.unknownx[0]).toBe("new-product");
    expect(reasons.unknownx[1]).toContain("no corpus product is named exactly nobodyumab / Unknownx (the snapshot's nearest name was nobody, a partial match)");
    expect(reasons.nowhere[1]).toBe("the register page could not be fetched in this run");
    expect(reasons.nostatus[1]).toBe("the register page has no status field");
    expect(reasons.Nourl[1]).toContain("no medicine URL");
    expect(d.auto.length + d.residue.length + d.dropped.length).toBe(12);
  });

  it("puts a recorded row that disagrees with the page into the residue rather than rewriting it", async () => {
    const d = await decideEmaCandidates([cand("varuby", { drugId: "rolapitant", reason: "status-mismatch", recorded: "approved" })], { ...ctx, rows: { rolapitant: { EU: { status: "approved", year: 2017 } } } });
    expect(d.residue[0]).toMatchObject({ kind: "regional-status", drugId: "rolapitant" });
    expect(d.residue[0].reason).toContain("the recorded EU row says approved (2017) but the register page says");
    const y = await decideEmaCandidates([cand("varuby", { drugId: "rolapitant" })], { ...ctx, rows: { rolapitant: { EU: { status: "withdrawn", year: 2012 } } } });
    expect(y.residue[0].reason).toContain("the recorded EU year 2012 disagrees with the register page's 2019");
    // A withdrawn page without a withdrawal date cannot become a new row, but it does confirm a recorded withdrawn row.
    const undated = await decideEmaCandidates([cand("varuby", { drugId: "rolapitant" })], { ...ctx, rows: { rolapitant: { EU: { status: "withdrawn", year: 2020 } } }, fetch: async () => ({ ...PAGES.varuby, withdrawn: undefined }) });
    expect(undated.dropped.map((x) => x.reason)).toEqual(["already on main: EU withdrawn 2020"]);
    const fresh = await decideEmaCandidates([cand("varuby", { drugId: "rolapitant" })], { ...ctx, rows: {}, fetch: async () => ({ ...PAGES.varuby, withdrawn: undefined }) });
    expect(fresh.residue[0].reason).toContain('no "Withdrawal of marketing authorisation" date');
  });

  it("writes one EU row per product per run", async () => {
    const d = await decideEmaCandidates([cand("zumrad", { drugId: "sasanlimab" }), cand("zumrad", { drugId: "sasanlimab", product: "Zumrad again" })], ctx);
    expect(d.auto.length).toBe(1);
    expect(d.residue.map((r) => r.reason)).toEqual(["another register medicine already produced the EU row for sasanlimab in this run"]);
  });
});
