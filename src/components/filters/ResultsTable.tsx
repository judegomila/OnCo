"use client";

import type { ReactNode } from "react";
import { Tip, COLUMN_TIPS } from "@/components/Tip";

export type Column<T> = {
  key: string;
  label: string;
  render: (row: T, index: number) => ReactNode;
  sortable?: boolean;
  className?: string;
  /** Tailwind visibility classes, e.g. "hidden md:table-cell". */
  hide?: string;
  /** Plain-English explanation shown on hover of the header; falls back to COLUMN_TIPS by label. */
  tip?: string;
};

export type SortState = { key: string; dir: 1 | -1 };

/**
 * Full-width, sortable results table shared by the filterable views.
 * The header row sticks below the site header (see `--sticky-top` in globals.css); on small
 * screens the table scrolls sideways inside its card instead.
 */
export function ResultsTable<T>({ columns, rows, rowKey, sort, onSort, empty = "Nothing matches. Clear a filter.", scroll = false }: {
  columns: Column<T>[]; rows: T[]; rowKey: (r: T) => string; sort?: SortState; onSort?: (key: string) => void; empty?: string;
  /** Keep the table scrolling sideways inside its card at every width (for tables wider than the page). */
  scroll?: boolean;
}) {
  return (
    <div className={`card overflow-x-auto ${scroll ? "" : "lg:overflow-x-visible"}`}>
      <table className="onco">
        <thead>
          <tr>
            {columns.map((c) => {
              const tip = c.tip ?? COLUMN_TIPS[c.label];
              const sorted = sort?.key === c.key;
              const label = tip ? <Tip text={tip} title={c.label}><span className="underline decoration-dotted decoration-foreground/30 underline-offset-[3px] cursor-help">{c.label}</span></Tip> : c.label;
              return (
                <th key={c.key} className={`${c.hide ?? ""} ${c.className ?? ""}`} aria-sort={sorted ? (sort!.dir === -1 ? "descending" : "ascending") : undefined}>
                  {c.sortable && onSort ? (
                    <button type="button" onClick={() => onSort(c.key)} className={`group inline-flex items-center gap-1 rounded-sm ${sorted ? "text-foreground" : ""}`} title={sorted ? (sort!.dir === -1 ? "Sorted descending. Click to flip." : "Sorted ascending. Click to flip.") : `Sort by ${c.label}`}>
                      {label}
                      <span aria-hidden className={`inline-block w-3 text-center text-[11px] leading-none ${sorted ? "text-accent" : "text-muted/40 group-hover:text-muted"}`}>
                        {sorted ? (sort!.dir === -1 ? "↓" : "↑") : "↕"}
                      </span>
                    </button>
                  ) : label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={rowKey(r)}>
              {columns.map((c) => <td key={c.key} className={`${c.hide ?? ""} ${c.className ?? ""}`}>{c.render(r, i)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="px-6 py-12 text-center text-muted text-sm">{empty}</div>}
    </div>
  );
}

/** Toolbar row: filters on the left, count and controls on the right. */
export function Toolbar({ left, right, count, total, noun }: { left: ReactNode; right?: ReactNode; count: number; total?: number; noun: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      {left}
      <div className="ml-auto flex items-center gap-3 text-sm whitespace-nowrap">
        <span aria-live="polite"><span className="font-semibold tabular-nums">{count.toLocaleString("en-GB")}</span>{total !== undefined && total !== count && <span className="text-muted"> of {total.toLocaleString("en-GB")}</span>} <span className="text-muted">{noun}</span></span>
        {right}
      </div>
    </div>
  );
}
