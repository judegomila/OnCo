/**
 * Pipeline tracker: for every product in the corpus, pull phase 2/3 studies from the
 * ClinicalTrials.gov API v2 and write public/trials/<drugId>.json plus public/trials/index.json.
 *
 * Run: npm run fetch:trials     (network; resilient: retries, rate limiting, skips failures)
 * Refreshed weekly by .github/workflows/refresh-trials.yml, which opens a PR with the diff.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";

const out = join(process.cwd(), "public", "trials");
mkdirSync(out, { recursive: true });

type Study = { nct: string; title: string; status: string; phases: string[]; conditions: string[]; start?: string; primaryCompletion?: string; sponsor?: string };
type DrugTrials = { drugId: string; query: string; fetched: string; total: number; studies: Study[] };
type IndexEntry = { query: string; total: number; byPhase: Record<string, number>; byStatus: Record<string, number>; recruiting: number; fetched: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url: string, attempt = 1): Promise<unknown | null> {
  try {
    const r = await fetch(url, { headers: { Accept: "application/json", "User-Agent": "OnCo/1.0 (github.com/judegomila/OnCo)" } });
    if (r.status === 429 || r.status >= 500) throw new Error(`HTTP ${r.status}`);
    if (!r.ok) return null;
    return await r.json();
  } catch (e) {
    if (attempt >= 4) { console.warn(`  giving up: ${url} (${String(e)})`); return null; }
    await sleep(1000 * 2 ** attempt);
    return fetchJson(url, attempt + 1);
  }
}

/** Pick the search term: generic name without parenthetical/brand noise; code as fallback. */
function queryFor(name: string, code?: string): string {
  const cleaned = name.replace(/\(.*?\)/g, "").replace(/\/.*$/, "").replace(/ \+ .*$/, "").trim();
  if (cleaned.split(" ").length <= 3 && cleaned.length > 3) return cleaned;
  return code?.split(",")[0].trim() || cleaned;
}

async function main() {
  const g = graph();
  const drugs = g.kind("drug");
  const index: Record<string, IndexEntry> = {};
  const fetched = new Date().toISOString().slice(0, 10);
  let ok = 0, skipped = 0;

  for (const d of drugs) {
    const q = queryFor(d.name, d.code);
    const params = new URLSearchParams({
      "query.intr": q,
      "filter.advanced": "AREA[Phase](PHASE2 OR PHASE3)",
      fields: "NCTId,BriefTitle,OverallStatus,Phase,Condition,StartDate,PrimaryCompletionDate,LeadSponsorName",
      pageSize: "100",
      countTotal: "true",
    });
    const url = `https://clinicaltrials.gov/api/v2/studies?${params}`;
    const json = (await fetchJson(url)) as { totalCount?: number; studies?: Array<{ protocolSection?: Record<string, Record<string, unknown>> }> } | null;
    await sleep(350);
    if (!json) { skipped++; continue; }
    const studies: Study[] = (json.studies ?? []).map((s) => {
      const p = s.protocolSection ?? {};
      const id = p.identificationModule ?? {}, st = p.statusModule ?? {}, des = p.designModule ?? {}, cond = p.conditionsModule ?? {}, sp = p.sponsorCollaboratorsModule ?? {};
      return {
        nct: String(id.nctId ?? ""),
        title: String(id.briefTitle ?? ""),
        status: String(st.overallStatus ?? ""),
        phases: (des.phases as string[] | undefined) ?? [],
        conditions: ((cond.conditions as string[] | undefined) ?? []).slice(0, 5),
        start: (st.startDateStruct as { date?: string } | undefined)?.date,
        primaryCompletion: (st.primaryCompletionDateStruct as { date?: string } | undefined)?.date,
        sponsor: (sp.leadSponsor as { name?: string } | undefined)?.name,
      };
    });
    const total = json.totalCount ?? studies.length;
    const byPhase: Record<string, number> = {}, byStatus: Record<string, number> = {};
    for (const s of studies) {
      for (const ph of s.phases) byPhase[ph] = (byPhase[ph] ?? 0) + 1;
      byStatus[s.status] = (byStatus[s.status] ?? 0) + 1;
    }
    const rec: DrugTrials = { drugId: d.id, query: q, fetched, total, studies };
    writeFileSync(join(out, `${d.id}.json`), JSON.stringify(rec));
    index[d.id] = { query: q, total, byPhase, byStatus, recruiting: byStatus["RECRUITING"] ?? 0, fetched };
    ok++;
  }
  writeFileSync(join(out, "index.json"), JSON.stringify(index));
  console.log(`trials: ${ok} products written, ${skipped} skipped, to public/trials/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
