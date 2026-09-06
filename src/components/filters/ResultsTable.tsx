"use client";

import type { ReactNode } from "react";

export type Column<T> = {
  key: string;
  label: string;
  render: (row: T, index: number) => ReactNode;
  sortable?: boolean;
  className?: string;
  /** Tailwind visibility classes, e.g. "hidden md:table-cell". */
  hide?: string;
};

export type SortState = { key: string; dir: 1 | -1 };

/** Full-width, sortable results table shared by the filterable views. */
export function ResultsTable<T>({ columns, rows, rowKey, sort, onSort, empty = "Nothing matches. Clear a filter." }: {
  columns: Column<T>[]; rows: T[]; rowKey: (r: T) => string; sort?: SortState; onSort?: (key: string) => void; empty?: string;
}) {
  return (
    <div className="card overflow-x-auto">
      <table className="onco">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={`${c.hide ?? ""} ${c.className ?? ""}`}>
                {c.sortable && onSort ? (
                  <button type="button" onClick={() => onSort(c.key)} className={`inline-flex items-center gap-1 ${sort?.key === c.key ? "text-foreground" : ""}`}>
                    {c.label}{sort?.key === c.key && <span aria-hidden>{sort.dir === -1 ? "↓" : "↑"}</span>}
                  </button>
                ) : c.label}
              </th>
            ))}
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
      {rows.length === 0 && <div className="p-8 text-center text-muted text-sm">{empty}</div>}
    </div>
  );
}

/** Toolbar row: filters on the left, count and controls on the right. */
export function Toolbar({ left, right, count, total, noun }: { left: ReactNode; right?: ReactNode; count: number; total?: number; noun: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      {left}
      <div className="ml-auto flex items-center gap-3 text-sm">
        <span><span className="font-semibold tabular-nums">{count}</span>{total !== undefined && <span className="text-muted"> of {total}</span>} <span className="text-muted">{noun}</span></span>
        {right}
      </div>
    </div>
  );
}
