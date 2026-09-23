"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { StaticTable, type StaticColumn, type StaticRow } from "./filters/StaticTable";
import type { MoreRows } from "@/lib/static-tables";
import { CELL_STATES, NOT_RECORDED, STATE_META, type CellState } from "@/lib/modular-formats";
import { Tip } from "./Tip";

/**
 * The permutation grid of one engine format: a compact heat grid (rows are component A, columns component B, each
 * cell coloured by what the corpus records for that pair) above the filterable table of tried cells. Clicking a
 * cell writes the pair into the query string and remounts the table with that selection, so the grid, the table
 * and the address always agree; a shared link opens the same view. Props are plain data (src/lib/tables/engine.ts
 * builds the rows on the server), so nothing crosses the server boundary but JSON.
 */
export type GridItem = { id: string; name: string; href?: string };
/** One tried cell: row index, column index, state, medicine count and up to three medicine names for the tooltip. */
export type GridCell = { r: number; c: number; s: Exclude<CellState, "untried">; n: number; d: string[] };

/** Rows shown before the reader asks for the whole grid; keeps the small-molecule page (100 targets) light. */
export const GRID_FIRST_ROWS = 40;

export function EngineView({ axisKeys, axisLabels, rows, cols, cells, table }: {
  axisKeys: [string, string]; axisLabels: [string, string];
  rows: GridItem[]; cols: GridItem[]; cells: GridCell[];
  table: { rows: StaticRow[]; more?: MoreRows; columns: StaticColumn[] };
}) {
  const [sel, setSel] = useState<Record<string, string[]>>({});
  const [key, setKey] = useState(0);
  const [allRows, setAllRows] = useState(rows.length <= GRID_FIRST_ROWS);
  const tableRef = useRef<HTMLDivElement>(null);
  const [ka, kb] = axisKeys;
  const byPos = useMemo(() => { const m = new Map<string, GridCell>(); for (const c of cells) m.set(`${c.r},${c.c}`, c); return m; }, [cells]);
  const shownRows = allRows ? rows : rows.slice(0, GRID_FIRST_ROWS);
  const realCols = cols.filter((c) => c.id !== NOT_RECORDED);

  const pick = useCallback((a?: string, b?: string) => {
    const next: Record<string, string[]> = {};
    if (a) next[ka] = [a];
    if (b) next[kb] = [b];
    const u = new URL(window.location.href);
    u.searchParams.delete(ka); u.searchParams.delete(kb); u.searchParams.delete("q"); u.searchParams.delete("sort");
    if (a) u.searchParams.set(ka, a);
    if (b) u.searchParams.set(kb, b);
    window.history.replaceState(window.history.state, "", u.pathname + u.search + u.hash);
    setSel(next);
    setKey((k) => k + 1);
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [ka, kb]);

  const counts = useMemo(() => {
    const c: Record<CellState, number> = { approved: 0, development: 0, stopped: 0, unclear: 0, untried: 0 };
    for (const x of cells) c[x.s]++;
    c.untried = Math.max(0, rows.length * realCols.length - cells.filter((x) => cols[x.c]?.id !== NOT_RECORDED).length);
    return c;
  }, [cells, rows.length, realCols.length, cols]);

  const cellHref = (a: string, b: string) => `?${ka}=${encodeURIComponent(a)}&${kb}=${encodeURIComponent(b)}`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
        {CELL_STATES.map((s) => (
          <Tip key={s} title={STATE_META[s].label} text={STATE_META[s].tip}>
            <span className={`chip ${STATE_META[s].chip} cursor-help`}><span aria-hidden className={`inline-block h-2.5 w-2.5 rounded-sm ${STATE_META[s].swatch}`} />{STATE_META[s].label} <span className="tabular-nums opacity-80">{counts[s].toLocaleString("en-GB")}</span></span>
          </Tip>
        ))}
        <span className="text-muted ms-auto">{rows.length.toLocaleString("en-GB")} {axisLabels[0].toLowerCase()} rows x {realCols.length.toLocaleString("en-GB")} {axisLabels[1].toLowerCase()} columns. Click a cell to filter the table.</span>
      </div>
      <div className="card overflow-x-auto p-3" aria-label={`${axisLabels[0]} against ${axisLabels[1]}: one square per combination, coloured by state`}>
        <div className="inline-grid gap-px" style={{ gridTemplateColumns: `minmax(150px, max-content) repeat(${cols.length}, 26px)` }}>
          <div data-col="" className="sticky left-0 bg-card text-[11px] text-muted self-end pb-1 pe-2">{axisLabels[0]} \ {axisLabels[1]}</div>
          {cols.map((c) => (
            <div key={c.id} data-col={c.id} className="h-28 flex items-end justify-center">
              {c.href
                ? <Link href={c.href} title={c.name} className="[writing-mode:vertical-rl] rotate-180 text-[11px] leading-none whitespace-nowrap max-h-28 overflow-hidden text-ellipsis hover:underline">{c.name}</Link>
                : <button type="button" onClick={() => pick(undefined, c.id)} title={`${c.name}: filter the table to this column`} className={`[writing-mode:vertical-rl] rotate-180 text-[11px] leading-none whitespace-nowrap max-h-28 overflow-hidden text-ellipsis hover:underline ${c.id === NOT_RECORDED ? "text-muted italic" : ""}`}>{c.name}</button>}
            </div>
          ))}
          {shownRows.map((r, ri) => (
            <RowCells key={r.id} r={r} ri={ri} cols={cols} byPos={byPos} pick={pick} cellHref={cellHref} />
          ))}
        </div>
        {!allRows && (
          <div className="mt-3 text-sm">
            <button type="button" onClick={() => setAllRows(true)} className="chip border border-border bg-card hover:bg-accent-soft hover:text-accent hover:border-accent">Show all {rows.length.toLocaleString("en-GB")} rows</button>
            <span className="text-xs text-muted ms-2">The first {GRID_FIRST_ROWS} rows are the {axisLabels[0].toLowerCase()}s with the most medicines; the table below already covers every row.</span>
          </div>
        )}
      </div>
      <div ref={tableRef} className="mt-8 scroll-mt-20" id="table">
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <h2 className="text-lg font-semibold tracking-tight">Every tried combination</h2>
          {Object.keys(sel).length > 0 && <button type="button" onClick={() => pick()} className="text-sm text-accent hover:underline">Show every cell</button>}
        </div>
        <StaticTable key={key} rows={table.rows} more={table.more} columns={table.columns} noun="combinations" url initial={sel} />
      </div>
    </div>
  );
}

function RowCells({ r, ri, cols, byPos, pick, cellHref }: { r: GridItem; ri: number; cols: GridItem[]; byPos: Map<string, GridCell>; pick: (a?: string, b?: string) => void; cellHref: (a: string, b: string) => string }) {
  return (
    <>
      <div data-row={r.id} className="sticky left-0 bg-card text-xs leading-none flex items-center pe-2 h-[26px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[220px]">
        {r.href ? <Link href={r.href} className="hover:underline" title={r.name}>{r.name}</Link> : <span title={r.name}>{r.name}</span>}
        <button type="button" onClick={() => pick(r.id)} className="ms-1.5 text-[10px] text-muted hover:text-accent" title={`Filter the table to ${r.name}`} aria-label={`Filter the table to ${r.name}`}>▸</button>
      </div>
      {cols.map((c, ci) => {
        const cell = byPos.get(`${ri},${ci}`);
        const state: CellState = cell?.s ?? (c.id === NOT_RECORDED ? "untried" : "untried");
        const meta = STATE_META[state];
        // Untried cells are decoration for the eye (the legend explains the colour) and stay out of the accessibility tree; their
        // title still answers a hover. Tried cells are links whose title is their accessible name.
        if (!cell) return <div key={c.id} aria-hidden title={`${r.name} x ${c.name}: untried in this corpus`} className={`h-[26px] w-[26px] rounded-sm ${c.id === NOT_RECORDED ? "bg-transparent" : meta.swatch}`} />;
        const title = `${r.name} x ${c.name}: ${meta.label.toLowerCase()}. ${cell.n} medicine${cell.n === 1 ? "" : "s"}: ${cell.d.join(", ")}${cell.n > cell.d.length ? ` and ${cell.n - cell.d.length} more` : ""}. Click to filter the table.`;
        return (
          <a key={c.id} href={cellHref(r.id, c.id)} onClick={(e) => { e.preventDefault(); pick(r.id, c.id); }} title={title}
            className={`h-[26px] w-[26px] rounded-sm flex items-center justify-center text-[10px] font-medium tabular-nums leading-none hover:ring-2 hover:ring-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${meta.swatch} ${state === "approved" || state === "stopped" ? "text-white" : "text-foreground"}`}>
            {cell.n > 1 ? cell.n : ""}
          </a>
        );
      })}
    </>
  );
}
