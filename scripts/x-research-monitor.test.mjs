import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { emptyQueue, scan, tokensFromPost } from "./x-research-monitor.ts";

const now = new Date("2026-11-17T18:00:00Z");
const token = "fixture-x-credential";
const created_at = "2026-11-17T14:45:00Z";
const author_id = "121212";
const firstId = "2122702569667444925";
const json = (data) => Response.json(data);
const html = (data) => new Response(data, { headers: { "content-type": "text/html; charset=utf-8" } });
const response = (data) => json({ data, meta: { result_count: data.length } });
const base = { author_id, created_at };

test("MSK short link leads through approved sources to an existing trial, not a new record", async () => {
  const calls = [];
  const newsroom = "https://www.mskcc.org/news/vaccine-improves-survival-in-people-with-acute-myeloid-leukemia-aml";
  const sponsor = "https://ir.sellaslifesciences.com/news/RE-GAL";
  const fetcher = async (url, init) => {
    calls.push(url.href);
    assert.equal(init.redirect, "error");
    assert.equal(new Headers(init.headers).get("authorization"), url.hostname === "api.x.com" ? `Bearer ${token}` : null);
    if (url.pathname.includes("/by/username/")) return json({ data: { id: author_id } });
    if (url.pathname.endsWith("/tweets")) {
      assert.equal(url.searchParams.get("post.fields"), "created_at,entities");
      assert.equal(url.searchParams.get("expansions"), "author_id");
      if (url.searchParams.has("since_id")) {
        assert.equal(url.searchParams.get("since_id"), firstId);
        return response([]);
      }
      assert.equal(url.searchParams.get("start_time"), "2026-11-16T18:00:00Z");
      return response([{ ...base, id: firstId, text: "Fixture only; do not quote.",
        entities: { urls: [{ expanded_url: "https://bit.ly/fixture", unwound_url: newsroom + "?source=x" }] } }]);
    }
    if (url.href === newsroom) return html(`<script>NCT00000000</script><a href="${sponsor}?source=x">Sponsor readout</a>`);
    if (url.href === sponsor) return html("<p>NCT04229979</p>");
    if (url.pathname === "/api/v2/studies/NCT04229979") return json({ protocolSection: {
      identificationModule: { nctId: "NCT04229979", briefTitle: "REGAL" },
      sponsorCollaboratorsModule: { leadSponsor: { name: "SELLAS", class: "INDUSTRY" } },
      armsInterventionsModule: { interventions: [{ type: "BIOLOGICAL", name: "Galinpepimut-S" }, { type: "DRUG", name: "Placebo" }] },
    } });
    if (url.pathname === "/api/v1/entities/nct04229979.json") return json({ entity: { kind: "trial", nct: "NCT04229979" }, route: "/trials/nct04229979/" });
    assert.fail(`Unexpected request: ${url}`);
  };
  const next = await scan(emptyQueue(), { token, now, fetcher });
  assert.equal(next.accounts.mskcancercenter.sinceId, firstId);
  assert.equal(next.candidates.length, 1);
  const row = next.candidates[0];
  assert.equal(row.state, "resolved-source-review");
  assert.equal(row.evidence.existingOncoUrl, "https://onco.cc/trials/nct04229979/");
  assert.equal(row.evidence.url, "https://clinicaltrials.gov/study/NCT04229979");
  assert.deepEqual(row.evidence.entities, [{ kind: "trial", name: "REGAL" }, { kind: "company", name: "SELLAS" }, { kind: "product", name: "Galinpepimut-S" }]);
  assert.deepEqual(row.leads[0].landingPages, [newsroom, sponsor]);
  assert.ok(!JSON.stringify(next).includes("Fixture only"));
  assert.ok(!JSON.stringify(next).includes(token));
  assert.deepEqual(await scan(next, { token, now, fetcher }), next);
  assert.equal(calls.filter((u) => u.includes("/by/username/")).length, 1);
});

test("resolves and groups DOI and PMID aliases across posts; leaves no-source leads for manual review", async () => {
  const fake = async (url) => {
    if (url.pathname.includes("/by/username/")) return json({ data: { id: author_id } });
    if (url.pathname.endsWith("/tweets")) return response([
      { ...base, id: "272", text: "New trial at https://attacker.example/?q=NCT12345678" },
      { ...base, id: "271", text: "Paper https://doi.org/10.1234/DEMO" },
      { ...base, id: "270", text: "Paper https://pubmed.ncbi.nlm.nih.gov/12345678/" },
      { ...base, id: "269", text: "Join the annual fundraiser", entities: { urls: [{ expanded_url: "https://attacker.example/" }] } },
    ]);
    if (url.hostname === "www.ebi.ac.uk") return json({ resultList: { result: [{ id: "12345678", source: "MED", title: "Fixture title", doi: "10.1234/demo" }] } });
    if (url.hostname === "clinicaltrials.gov") return new Response(null, { status: 404 });
    assert.fail(`Unexpected request: ${url}`);
  };
  const next = await scan(emptyQueue(), { token, now, fetcher: fake });
  assert.deepEqual(next.candidates.map((row) => row.key), ["doi:10.1234/demo", "post:272"]);
  assert.equal(next.candidates[0].leads.length, 2);
  assert.equal(next.candidates[1].state, "unverified-lead");
  assert.deepEqual(tokensFromPost({ ...base, id: "1", entities: { urls: [{ expanded_url: "https://clinicaltrials.gov.evil.example/study/NCT12345678" }] } }), []);
});

test("incomplete pages or HTTP limits cannot move a cursor", async () => {
  const q = emptyQueue();
  q.accounts.mskcancercenter = { userId: author_id, sinceId: "9" };
  const original = structuredClone(q);
  const fake = async (url) => {
    assert.equal(url.searchParams.get("since_id"), "9");
    return json({ data: [{ ...base, id: "10", text: "test" }], meta: { result_count: 1, next_token: "still-more" } });
  };
  await assert.rejects(scan(q, { token, now, fetcher: fake, maxPages: 1 }), /cursor unchanged/);
  await assert.rejects(scan(q, { token, now, fetcher: async () => new Response(null, { status: 429 }) }), /429/);
  assert.deepEqual(q, original);
});

test("no token or opt-in causes a safe stop", async () => {
  await assert.rejects(scan(emptyQueue(), { token: "", fetcher: async () => assert.fail("network used") }), /disabled/);
  const run = spawnSync(process.execPath, ["scripts/x-research-monitor.ts"], {
    env: { ...process.env, X_RESEARCH_BEARER_TOKEN: token, ONCO_X_MONITOR_ENABLED: "0" }, encoding: "utf8",
  });
  assert.equal(run.status, 1);
  assert.match(run.stderr, /Live collection disabled/);
  assert.ok(!run.stderr.includes(token));
});
