import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { graph } from "./graph";
import { UK_PATHWAYS, ukPathwayCancerIds, ukPathwayFor, ukPathwayJson, ukPathwayRoute, ukPathwayUrls } from "./uk-pathway";
import gallbladderSpike from "@/data/spikes/gallbladder-uk";
import tnbcSpike from "@/data/spikes/tnbc-uk";
import UkPage, { generateStaticParams } from "@/app/cancers/[id]/uk/page";

const SPIKES = [gallbladderSpike, tnbcSpike];

/**
 * The UK and NHS layer quotes public UK sources only. Every URL must be https and sit on one of these domains
 * (matched on the hostname suffix, so any NHS trust under nhs.uk, nhs.scot, nhs.wales or hscni.net passes).
 */
const ALLOWED_DOMAINS = [
  "nice.org.uk", "england.nhs.uk", "digital.nhs.uk", "nhs.uk", "nhs.scot", "nhsggc.scot", "nhslothian.scot", "nhs.wales", "hscni.net", "nhsbsa.nhs.uk",
  "cancerresearchuk.org", "gettingitrightfirsttime.co.uk", "gov.scot", "publichealthscotland.scot", "gov.wales", "health-ni.gov.uk", "gov.uk",
  "scottishmedicines.org.uk", "awmsg.nhs.wales", "isrctn.com", "bepartofresearch.nihr.ac.uk", "natcan.org.uk",
  "ammf.org.uk", "macmillan.org.uk", "maggies.org", "pancreaticcancer.org.uk",
  "europepmc.org", "doi.org", "ucl.ac.uk", "manchester.ac.uk", "imperial.ac.uk",
  // Second UK pass: the Northern Ireland Cancer Registry (Queen's), NHS inform, and the two public pages Hassan Malik has.
  "qub.ac.uk", "nhsinform.scot", "liverpool.ac.uk", "hcahealthcare.co.uk",
  // Triple-negative breast cancer pass: the breast charity, the US TNBC foundation, and the two universities whose staff pages are cited.
  "breastcancernow.org", "tnbcfoundation.org", "cam.ac.uk", "southampton.ac.uk",
];

const hostOk = (url: string) => {
  const u = new URL(url);
  return u.protocol === "https:" && ALLOWED_DOMAINS.some((d) => u.hostname === d || u.hostname.endsWith(`.${d}`));
};

describe("UK pathway data", () => {
  it("registers at least the gallbladder pathway, keyed to the live cancer record id", () => {
    expect(UK_PATHWAYS.length).toBeGreaterThan(0);
    const p = ukPathwayFor("gallbladder");
    expect(p?.cancerId).toBe("gallbladder");
    expect(graph().get("gallbladder")?.kind).toBe("cancer");
    expect(ukPathwayFor("nsclc")).toBeUndefined();
  });

  it("registers the triple-negative breast cancer pathway under tnbc and its subtype aliases", () => {
    const p = ukPathwayFor("tnbc");
    expect(p?.cancerId).toBe("tnbc");
    expect(ukPathwayFor("tnbc-early")?.cancerId).toBe("tnbc");
    expect(ukPathwayFor("tnbc-metastatic")?.cancerId).toBe("tnbc");
    const g = graph();
    for (const id of ["tnbc", "tnbc-early", "tnbc-metastatic"]) expect(g.get(id)?.kind, id).toBe("cancer");
    // The two UK-led trial records and the three researchers the spike adds resolve in the graph.
    for (const id of ["tnt", "partner"]) expect(g.get(id)?.kind, id).toBe("trial");
    for (const id of ["jean-abraham", "ellen-copson", "anne-armstrong"]) expect(g.get(id)?.kind, id).toBe("person");
    expect(g.get("breast-cancer-now")?.kind).toBe("institution");
  });

  it("cites only https URLs on allowed UK public domains", () => {
    for (const p of UK_PATHWAYS) {
      const urls = ukPathwayUrls(p);
      expect(urls.length).toBeGreaterThan(20);
      const bad = urls.filter((u) => !hostOk(u));
      expect(bad, `${p.cancerId}: ${bad.join(", ")}`).toEqual([]);
    }
    for (const e of SPIKES.flatMap((s) => s.entities)) {
      const urls = [...e.links ?? [], ...("profiles" in e ? e.profiles ?? [] : [])].map((l) => l.url);
      if ("website" in e && e.website) urls.push(e.website);
      const bad = urls.filter((u) => !hostOk(u));
      expect(bad, `${e.id}: ${bad.join(", ")}`).toEqual([]);
    }
  });

  it("dates every figure's source and names a nation and period", () => {
    for (const p of UK_PATHWAYS) for (const f of p.figures) {
      expect(f.source.date ?? f.period, f.label).toBeTruthy();
      expect(f.nation).toBeTruthy();
      expect(f.period).toBeTruthy();
    }
  });

  it("links every institution, trial and drug id to a record in the graph", () => {
    const g = graph();
    for (const p of UK_PATHWAYS) {
      for (const c of p.centres) if (c.institutionId) expect(g.get(c.institutionId)?.kind, c.institutionId).toBe("institution");
      for (const s of p.support) if (s.institutionId) expect(["institution", "collection"], s.institutionId).toContain(g.get(s.institutionId)?.kind);
      for (const f of p.funding) for (const id of f.refs) expect(g.get(id), `${f.line}: ${id}`).toBeDefined();
      for (const t of p.trials) if (t.trialId) expect(g.get(t.trialId)?.kind, t.trialId).toBe("trial");
      for (const l of p.legacy) for (const id of l.trialIds) expect(g.get(id)?.kind, id).toBe("trial");
    }
  });

  it("gives every funding row an England decision with a URL and every NICE row a TA reference and date", () => {
    for (const p of UK_PATHWAYS) for (const f of p.funding) {
      expect(f.england.url).toMatch(/^https:/);
      if (f.england.body === "NICE") { expect(f.england.ref, f.treatment).toMatch(/^TA\d+/); expect(f.england.date, f.treatment).toBeTruthy(); }
      if (f.scotland?.body === "SMC" && f.scotland.ref) expect(f.scotland.ref).toMatch(/^SMC\d{4}$/);
    }
  });

  it("covers every section the page promises", () => {
    for (const p of UK_PATHWAYS) {
      expect(p.presentation.length).toBeGreaterThan(1);
      expect(p.timeline.length).toBeGreaterThanOrEqual(5);
      expect(p.centres.filter((c) => c.nation === "England").length).toBeGreaterThan(5);
      for (const n of ["Scotland", "Wales", "Northern Ireland"]) expect(p.centres.some((c) => c.nation === n), n).toBe(true);
      expect(p.funding.length).toBeGreaterThanOrEqual(6);
      expect(p.tests.length).toBeGreaterThanOrEqual(5);
      expect(p.trials.length).toBeGreaterThan(0);
      expect(p.legacy.length).toBe(3);
      expect(p.support.length).toBeGreaterThan(4);
      expect(p.nations.length).toBeGreaterThan(3);
      expect(p.gaps.length).toBeGreaterThan(0);
    }
  });

  it("writes a JSON companion with the route, resolved names and the source list", () => {
    const p = ukPathwayFor("gallbladder")!;
    const j = ukPathwayJson(p) as { route: string; sources: string[]; funding: Array<{ refNames: string[] }>; centres: Array<{ institutionName?: string }> };
    expect(j.route).toBe("/cancers/gallbladder/uk/");
    expect(j.sources.length).toBe(ukPathwayUrls(p).length);
    expect(j.funding[0].refNames.length).toBe(p.funding[0].refs.length);
    expect(j.centres.find((c) => c.institutionName === "Royal Free Hospital, Royal Free London NHS Foundation Trust")).toBeDefined();
  });
});

describe("/cancers/[id]/uk/ page", () => {
  it("builds static params only for cancers with a pathway", () => {
    const ids = generateStaticParams().map((x) => x.id);
    expect(ids).toEqual(ukPathwayCancerIds());
    expect(ids).toContain("gallbladder");
    expect(ids).not.toContain("nsclc");
    expect(ukPathwayRoute("gallbladder", "funding")).toBe("/cancers/gallbladder/uk/#funding");
  });

  it("renders every section for gallbladder with the standards, centres, decisions and tests", async () => {
    const el = await UkPage({ params: Promise.resolve({ id: "gallbladder" }) });
    const html = renderToStaticMarkup(createElement(() => el));
    for (const id of ["pathway", "centres", "funding", "tests", "trials", "data", "support", "nations", "gaps"]) expect(html).toContain(`id="${id}"`);
    expect(html).toContain("Faster Diagnosis Standard");
    expect(html).toContain("TA944");
    expect(html).toContain("SMC2582");
    expect(html).toContain("M220.1");
    expect(html).toContain("Royal Infirmary of Edinburgh");
    expect(html).toContain("ISRCTN13555554");
    expect(html).toContain("/api/v1/cancers/gallbladder/uk.json");
    expect(html).not.toMatch(/<a[^>]*>[^<]*<a/);
  });

  it("renders the triple-negative page with the screening caveat, the TA refusal, the SMC split, the R208 test and the UK trials", async () => {
    const el = await UkPage({ params: Promise.resolve({ id: "tnbc" }) });
    const html = renderToStaticMarkup(createElement(() => el));
    for (const id of ["pathway", "centres", "funding", "tests", "trials", "data", "support", "nations", "gaps"]) expect(html).toContain(`id="${id}"`);
    expect(html).toContain("TA851");
    expect(html).toContain("TA992");
    expect(html).toContain("SMC2608");
    expect(html).toContain("R208");
    expect(html).toContain("PHOENIX");
    expect(html).toContain("Western General");
    expect(html).toContain("Belfast City Hospital");
    expect(html).toContain("71st birthday");
    expect(html).toContain("/api/v1/cancers/tnbc/uk.json");
    expect(html).not.toMatch(/<a[^>]*>[^<]*<a/);
    // The subtype alias renders the same pathway.
    const alias = await UkPage({ params: Promise.resolve({ id: "tnbc-early" }) });
    expect(renderToStaticMarkup(createElement(() => alias))).toContain("TA851");
  });

  it("returns not-found for a cancer without a pathway", async () => {
    await expect(UkPage({ params: Promise.resolve({ id: "nsclc" }) })).rejects.toThrow();
  });
});
