/**
 * Weekly re-check, part 3: European Union approvals. Report only.
 *
 * One source, the EMA's downloadable table of human medicines (one spreadsheet, regenerated daily), read with the
 * reader and the comparison scripts/fetch-ema.ts already owns (readRegister, compareRegister), so this check and the
 * weekly register refresh cannot disagree about which medicine a product is judged by.
 *
 * Reported:
 *   - a product whose EU row in src/data/regional-approvals.ts is approved where the register is not, or the reverse;
 *   - a row that says approved where the register says conditional, or the reverse, and a row whose kind of
 *     non-approval differs (withdrawn, refused, under evaluation);
 *   - a product the register lists and regional-approvals.ts has no EU row for;
 *   - a CHMP opinion on a medicine of a product OnCo holds that awaits the Commission's decision, or that was
 *     adopted after the record was last checked.
 * The table holds one row per medicine, so an opinion on a new indication for a medicine already authorised is not in
 * it; that needs the CHMP meeting highlights, which are prose and are left to a reader.
 */
import type { regionalApprovals as RegionalApprovals } from "../../src/data/regional-approvals";
import { type EmaRow, compareRegister, isOncology, readRegister } from "../fetch-ema";
import type { Finding, Net } from "./lib";

export const EMA_TABLE = "https://www.ema.europa.eu/en/documents/report/medicines-output-medicines-report_en.xlsx";
const EMA_FALLBACK = "https://www.ema.europa.eu/en/medicines/download-medicine-data";

export type EuDrug = { id: string; kind: string; name: string; aka: string[]; brand?: string; modality?: string; asOf: string };

const approvedLike = (s: string) => s === "approved" || s === "conditional";

export function euDrift(register: EmaRow[], drugs: EuDrug[], regional: typeof RegionalApprovals, today: string): { findings: Finding[]; notInCorpus: number; verified: number } {
  const { candidates, verified, resolved } = compareRegister(register.filter(isOncology), drugs, regional, today);
  const asOf = new Map(drugs.map((d) => [d.id, d.asOf]));
  const out: Finding[] = [];
  const flagged = new Set<string>();
  for (const c of candidates) {
    if (!c.drugId) continue;
    flagged.add(c.drugId);
    const base = { kind: "eu-approvals" as const, recordId: c.drugId, recordKind: "drug", url: c.url ?? EMA_FALLBACK, date: c.date };
    const medicine = `${c.product}${c.inn ? ` (${c.inn})` : ""}`;
    if (c.reason === "status-mismatch") out.push({ ...base, type: "status-mismatch", severity: "high", onco: `EU ${c.recorded}`, source: `${medicine}: ${c.register}${c.withdrawn ? `, withdrawn ${c.withdrawn}` : ""}` });
    else if (c.reason === "missing-row") out.push({ ...base, type: "missing-row", severity: /^authorised/i.test(c.register) ? "medium" : "low", onco: "no EU row in regional-approvals.ts", source: `${medicine}: ${c.register}` });
    else if (c.reason === "year-mismatch") out.push({ ...base, type: "year-mismatch", severity: "low", onco: `EU first approval ${c.recorded}`, source: `${medicine}: ${c.register}` });
  }
  for (const [id, reading] of resolved) {
    const row = regional[id]?.EU;
    const base = { kind: "eu-approvals" as const, recordId: id, recordKind: "drug", url: reading.lead.url ?? EMA_FALLBACK };
    // The finer class, where the coarse comparison above saw agreement.
    // A medicine at the opinion stage is listed once, below, as an opinion awaiting the Commission.
    const awaitingOriginator = reading.medicines.some((m) => /opinion/i.test(m.status) && /positive|negative/i.test(m.opinionStatus ?? "") && !m.generic && !m.biosimilar);
    if (row && !flagged.has(id) && reading.status !== "other" && row.status !== reading.status && !(reading.status === "under-review" && awaitingOriginator)) {
      const bothApproved = approvedLike(row.status) && approvedLike(reading.status);
      out.push({ ...base, type: bothApproved ? "conditional-mismatch" : "status-class-mismatch", severity: "medium", onco: `EU ${row.status}${row.year ? ` ${row.year}` : ""}`, source: `${reading.lead.name}: ${reading.registerText}`, date: reading.lead.authorised ?? reading.lead.withdrawn ?? reading.lead.refused });
    }
    for (const m of reading.medicines) {
      if (!m.opinionStatus || !/positive|negative/i.test(m.opinionStatus)) continue;
      const awaiting = /opinion/i.test(m.status);
      const since = !!m.opinionDate && m.opinionDate > (asOf.get(id) ?? "9999");
      if (!awaiting && !since) continue;
      const known = row?.status === "under-review" || (!!m.opinionDate && JSON.stringify(row ?? {}).includes(m.opinionDate));
      out.push({ ...base, url: m.url ?? base.url, type: awaiting ? "chmp-opinion-awaiting-decision" : "chmp-opinion-since-check", severity: m.generic || m.biosimilar ? "low" : awaiting && !known && !approvedLike(row?.status ?? "") ? "high" : "medium",
        onco: `${row ? `EU ${row.status}${row.year ? ` ${row.year}` : ""}` : "no EU row"}; last checked ${asOf.get(id) ?? "unknown"}`, source: `${m.name}: CHMP opinion ${m.opinionStatus.toLowerCase()}${m.opinionDate ? ` adopted ${m.opinionDate}` : ""}; medicine status ${m.status}`, date: m.opinionDate,
        note: m.generic || m.biosimilar ? "A generic or biosimilar of the product, not the originator." : undefined });
    }
  }
  return { findings: out, notInCorpus: candidates.filter((c) => c.reason === "not-in-corpus").length, verified: verified.length };
}

export async function readEmaTable(net: Net): Promise<{ register?: EmaRow[]; generatedOn?: string; error?: string }> {
  const r = await net.get(EMA_TABLE, { body: "buffer" });
  if (r.blocked) return { error: `blocked: ${r.blocked}` };
  if (!r.ok || !r.buffer) return { error: `the EMA table answered ${r.status}${r.error ? ` (${r.error})` : ""}` };
  try { const { ema, generatedOn } = readRegister(r.buffer); return { register: ema, generatedOn }; }
  catch (e) { return { error: e instanceof Error ? e.message.replace(/; previous snapshots retained$/, "") : String(e) }; }
}
