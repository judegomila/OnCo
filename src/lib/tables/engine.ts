import type { StaticColumn, StaticRow, CellObj } from "@/components/filters/StaticTable";
import { engine, type Cell, type Evidence, type FormatIndex } from "@/lib/modular";
import { COMPONENT_LABEL, engineTableId, STATE_META, type CellState } from "@/lib/modular-formats";
import type { TableFile } from "./index";

/**
 * The grid of one engine format (/pipeline/engine/<format>/) as a paged table: one row per tried combination of the
 * two axis parts, with the medicines in it, their states, the other parts seen, and the records behind the state.
 * Column keys are the component keys, so `?target=her2&payloadClass=topoisomerase-i-payloads` deep-links a cell and
 * the heat grid's click writes the same query. Small molecules have a few hundred rows, so the page carries the
 * first TABLE_PAGE and the rest lives in /api/v1/tables/engine-<format>.json (scripts/build-tables.ts).
 */
const STATE_ORDER: CellState[] = ["approved", "development", "stopped", "unclear"];
const DRUG_CHIP: Record<string, string> = { approved: "bg-accent-soft text-accent border border-accent/30 text-xs", development: "tone-live text-xs", stopped: "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100 text-xs", unclear: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 text-xs" };
const EVIDENCE_KIND: Record<Evidence["kind"], string> = { drug: "record", trial: "trial", approval: "approval", regional: "regulator", event: "event", registry: "registry" };

export function engineColumns(f: FormatIndex): StaticColumn[] {
  const [ka, kb] = f.format.axes;
  const others = f.format.components.filter((k) => k !== ka && k !== kb);
  return [
    { key: ka, label: COMPONENT_LABEL[ka], filterable: true, sortable: true, numeric: false, className: "min-w-[140px]" },
    { key: kb, label: COMPONENT_LABEL[kb], filterable: true, sortable: true, numeric: false, className: "min-w-[140px]" },
    { key: "state", label: "State", filterable: true, order: STATE_ORDER.map((s) => STATE_META[s].label), tip: "Approved if any medicine in the cell has an approval row and is not withdrawn; in development if one has a recruiting, active or planned trial or a development-phase status; tried and stopped if every medicine is withdrawn, negative or historic or its only trial evidence is a stopped or negative study." },
    { key: "drugs", label: "Medicines", className: "min-w-[200px]", tip: "Every medicine in the corpus with this combination of parts; the chip colour is the medicine's own state." },
    { key: "approved", label: "Approved", sortable: true, numeric: true, hide: "hidden lg:table-cell", className: "text-right tabular-nums" },
    { key: "development", label: "In development", sortable: true, numeric: true, hide: "hidden lg:table-cell", className: "text-right tabular-nums" },
    { key: "stopped", label: "Stopped", sortable: true, numeric: true, hide: "hidden lg:table-cell", className: "text-right tabular-nums" },
    ...others.map((k): StaticColumn => ({ key: k, label: COMPONENT_LABEL[k], filterable: true, hide: "hidden xl:table-cell", className: "text-xs" })),
    { key: "evidence", label: "Records", hide: "hidden md:table-cell", className: "min-w-[180px]", tip: "The records the state is read from: the drug record's status, approval rows, linked trials with their status, withdrawn or rejected regulatory rows, and the ClinicalTrials.gov index." },
    { key: "why", label: "Stopped, and why", hide: "hidden xl:table-cell", className: "text-xs text-muted max-w-sm", tip: "For stopped studies and withdrawn approvals, the reason as the record gives it: the registry's own whyStopped text where the sponsor wrote one, else the recorded result." },
  ];
}

const short = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/** One evidence chip per distinct record, at most `max`, most decisive first (approval rows, then trials, then the drug record). */
function evidenceChips(ev: Evidence[], max = 4): CellObj[] {
  const rank: Record<Evidence["kind"], number> = { approval: 0, regional: 0, trial: 1, event: 2, registry: 3, drug: 4 };
  const seen = new Set<string>();
  const out: CellObj[] = [];
  for (const e of [...ev].sort((x, y) => rank[x.kind] - rank[y.kind])) {
    const key = `${e.record}:${e.field ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ text: `${EVIDENCE_KIND[e.kind]}: ${short(e.label, 48)}`, href: e.href, ext: /^https?:/.test(e.href), chip: `border border-border bg-card text-xs`, title: e.quote ? `${e.label}. ${e.quote}` : e.label });
  }
  const extra = out.length - max;
  return extra > 0 ? [...out.slice(0, max), { text: `+${extra} more`, chip: "border border-dashed border-border text-muted text-xs", title: "Open the medicine's page for every record" }] : out;
}

export function engineRow(f: FormatIndex, c: Cell): StaticRow {
  const [ka, kb] = f.format.axes;
  const row: StaticRow = {
    id: `${c.a.id}|${c.b.id}`,
    [ka]: { text: c.a.name, v: c.a.id, href: c.a.href, strong: true },
    [kb]: { text: c.b.name, v: c.b.id, href: c.b.href, muted: c.b.id === "not-recorded" },
    state: { text: STATE_META[c.state].label, chip: STATE_META[c.state].chip, title: STATE_META[c.state].tip },
    drugs: c.drugs.map((d): CellObj => ({ text: d.name, href: d.route, chip: DRUG_CHIP[d.state], title: `${d.name}: ${STATE_META[d.state].label.toLowerCase()}${d.status ? ` (record status ${d.status.replace(/-/g, " ")})` : ""}` })),
    approved: c.counts.approved,
    development: c.counts.development,
    stopped: c.counts.stopped,
    evidence: evidenceChips(c.evidence),
    why: c.reasons.length ? { text: short(c.reasons[0].quote, 160), href: c.reasons[0].href, ext: /^https?:/.test(c.reasons[0].href), sub: c.reasons.length > 1 ? `and ${c.reasons.length - 1} more recorded reason${c.reasons.length > 2 ? "s" : ""}` : undefined, title: c.reasons[0].label } : undefined,
  };
  for (const k of f.format.components) {
    if (k === ka || k === kb) continue;
    const parts = c.parts[k];
    row[k] = parts?.length ? parts.map((p): CellObj => ({ text: p.name, v: p.id, href: p.href, chip: "border border-border bg-card text-xs" })) : undefined;
  }
  return row;
}

export function engineRows(f: FormatIndex): StaticRow[] {
  return f.cells.map((c) => engineRow(f, c));
}

/** Every format's grid as a table for the API writer; only those longer than a page get a file. */
export function engineTables(): TableFile[] {
  return engine().formats.map((f) => ({ id: engineTableId(f.format.id), rows: engineRows(f) }));
}
