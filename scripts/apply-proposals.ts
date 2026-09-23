/**
 * Apply the proposals that can be decided without a person: EU rows for src/data/regional-approvals.ts.
 *
 * Why this exists. The nightly bot (scripts/propose-updates.ts) drafted 60 EU rows from a register snapshot and a
 * review found 55 already on main by hand, four withdrawals proposed as approvals, a biosimilar flagged as a missing
 * approval, one row attributed to the wrong product, and a regex edit that swallowed a neighbouring row. Each of
 * those is a mechanical check, so this script runs them and writes only what passes; everything else stays a
 * proposal with the reason attached (scripts/lib/proposals-ema.ts holds the rules, this header summarises them):
 *
 *   status        read from the register page itself (data-medicine-status and its dated fields), not from the
 *                 snapshot; Authorised -> A()/C(), Withdrawn -> W(year withdrawn), Application withdrawn ->
 *                 W(undefined), Refused or negative CHMP opinion -> R(); Revoked, Expired, Suspended and pending
 *                 opinions wait for a person
 *   attribution   the page's INN, active substance or medicine name equals one corpus product's name, brand or alias,
 *                 whole string, case-insensitive; none or several matches wait for a person
 *   biosimilars   a biosimilar or generic page never becomes an approval row; the residue proposes a product record
 *   drift         the row is compared with regional-approvals.ts on the current tree: same class and year is dropped
 *                 as already on main, a different class or year is residue (a hand-written row would change)
 *   writing       rows go through scripts/lib/regional-approvals-io.ts, which parses the whole object and writes it
 *                 back (round trip tested to be a no-op), so a neighbouring row cannot be swallowed
 *
 * The register snapshot (public/regional/candidates.json, weekly) supplies the candidates only; every fact written
 * comes from the page read in this run, and each note quotes the page's status line so a later check can compare.
 *
 * Outputs with --apply: the rows appended under a dated comment in src/data/regional-approvals.ts and
 * public/proposals/applied.json (the rows, their source URLs and the quoted status; scripts/apply-proposals.test.ts
 * re-reads the pages in the workflow with ONCO_VERIFY_APPLIED=1). Without --apply nothing is written.
 *
 * Run: npx tsx scripts/apply-proposals.ts [--apply] [--from=<snapshot.json>]   Daily via .github/workflows/propose.yml.
 * --from replays a register snapshot or an older proposals snapshot (a past bot PR) against today's tree.
 * Pages are cached in ONCO_CACHE_DIR (default <tmpdir>/onco-cache); ONCO_OFFLINE=1 reads the cache only.
 */
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { regionalApprovals } from "../src/data/regional-approvals";
import { publicPath, readJson, today, writeJson } from "./feed-utils";
import type { RegionalCandidate, RegionalSnapshot } from "./fetch-ema";
import type { ProposalsSnapshot } from "./propose-updates";
import { type AutoRow, type Decision, decideEmaCandidates, type DecideContext } from "./lib/proposals-ema";
import { appendRow, hasRow, readRegionalApprovals, rowBody, setRegion, withRegionEntry, writeRegionalApprovals } from "./lib/regional-approvals-io";

export type AppliedSnapshot = { generated: string; register: string | null; rows: AutoRow[] };
export const APPLIED_PATH = publicPath("proposals", "applied.json");
export const APPLIED_COMMENT = (date: string) => `Proposals bot: EU rows read from the EMA register pages on ${date} (scripts/apply-proposals.ts); each note quotes the page's status line.`;

/**
 * Candidates from a register snapshot (public/regional/candidates.json) or, with --from=<file>, from an older
 * proposals snapshot (public/proposals/latest.json as a bot PR carried it): its regional-row and regional-status
 * proposals are replayed as candidates so a past PR can be re-decided against today's tree.
 */
export function candidatesFrom(file: string): { candidates: RegionalCandidate[]; fetched: string | null } {
  const raw = readJson<Partial<RegionalSnapshot> & Partial<ProposalsSnapshot>>(file);
  if (!raw) return { candidates: [], fetched: null };
  if (Array.isArray(raw.candidates)) return { candidates: raw.candidates, fetched: raw.fetched ?? null };
  const candidates: RegionalCandidate[] = [];
  for (const p of raw.proposals ?? []) {
    if (p.kind !== "regional-row" && p.kind !== "regional-status") continue;
    const m = p.evidence.match(/^EMA register: (.+?) \((.*?)\) ([^,.]+)(?:, (\d{4}-\d{2}-\d{2}))?\./);
    candidates.push({ region: "EU", drugId: p.entityId, product: m?.[1] ?? p.entityName, inn: m?.[2] || undefined, reason: p.kind === "regional-row" ? "missing-row" : "status-mismatch", register: m?.[3] ?? p.proposed, date: m?.[4], url: p.sourceUrl });
  }
  return { candidates, fetched: raw.generated ?? null };
}

/** Every EMA candidate decided against the current tree. */
export async function decideRegional(fetch?: DecideContext["fetch"], file = publicPath("regional", "candidates.json")): Promise<Decision & { candidates: number; snapshotFetched: string | null }> {
  const g = graph();
  const drugs = g.kind("drug").map((d) => ({ id: d.id, name: d.name, brand: d.brand, aka: d.aka, modality: d.modality }));
  const { candidates, fetched } = candidatesFrom(file);
  const decision = await decideEmaCandidates(candidates, { drugs, rows: regionalApprovals, today: today(), fetch });
  return { ...decision, candidates: candidates.length, snapshotFetched: fetched };
}

/**
 * Write the rows: a product with no row gets a new line under the dated comment; a product whose row lists other
 * regions only (a China-only approval, say) gets the EU entry added in region order. A row written by a helper call
 * (global(), regimen()) cannot take an entry mechanically and is skipped with the reason.
 */
export function applyRows(rows: AutoRow[], date = today()): { written: string[]; skipped: Array<{ key: string; reason: string }> } {
  let parsed = readRegionalApprovals();
  const written: string[] = [], skipped: Array<{ key: string; reason: string }> = [];
  for (const r of rows) {
    if (hasRow(parsed, r.key)) {
      const body = rowBody(parsed, r.key)!;
      const next = withRegionEntry(body, "EU", r.expr);
      if (!next) { skipped.push({ key: r.key, reason: /^\{/.test(body) ? "row already has an EU entry" : "row is a helper call (global or regimen); a person adds the EU entry" }); continue; }
      parsed = setRegion(parsed, r.key, "EU", r.expr);
    } else parsed = appendRow(parsed, r.key, r.body, APPLIED_COMMENT(date));
    written.push(r.key);
  }
  if (written.length) writeRegionalApprovals(parsed);
  return { written, skipped };
}

async function main() {
  const apply = process.argv.includes("--apply");
  const from = process.argv.find((a) => a.startsWith("--from="))?.slice(7);
  const d = await decideRegional(undefined, from ? join(process.cwd(), from) : undefined);
  console.log(`apply-proposals: ${d.candidates} EMA candidates (snapshot ${d.snapshotFetched ?? "missing"}) -> ${d.auto.length} auto, ${d.residue.length} residue, ${d.dropped.length} already on main`);
  for (const a of d.auto) console.log(`  auto     ${a.drugId}: EU ${a.status}${a.year ? ` ${a.year}` : ""} <- "${a.quotedStatus}" ${a.sourceUrl}`);
  for (const x of d.dropped) console.log(`  dropped  ${x.drugId}: ${x.reason}`);
  for (const r of d.residue) console.log(`  residue  ${r.candidate.product}${r.drugId ? ` (${r.drugId})` : ""} [${r.kind}]: ${r.reason}`);
  if (!apply) { console.log("apply-proposals: dry run, nothing written (add --apply)"); return; }
  if (!d.auto.length) { console.log("apply-proposals: nothing to apply"); return; }
  const { written, skipped } = applyRows(d.auto);
  writeJson(APPLIED_PATH, { generated: today(), register: d.snapshotFetched, rows: d.auto.filter((a) => written.includes(a.key)) } satisfies AppliedSnapshot, true);
  for (const s of skipped) console.log(`  skipped  ${s.key}: ${s.reason}`);
  console.log(`apply-proposals: wrote ${written.length} EU entries to src/data/regional-approvals.ts (${skipped.length} skipped); ${APPLIED_PATH}`);
}

if (process.argv[1]?.endsWith("apply-proposals.ts")) main().catch((e) => { console.error(e); process.exit(1); });
