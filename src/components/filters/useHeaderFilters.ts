"use client";

import { useState } from "react";
import type { ColumnFilterSpec } from "./ColumnFilter";
import type { FacetOption } from "./FacetSelect";

/**
 * Distinct values with counts for a header filter on a hand-written table. Each entry is one row's value or
 * list of values; `labels` names a value on its pill; `order` fixes the pill order (unlisted values follow by
 * count, then alphabetically).
 */
export function countOptions(values: Iterable<string | readonly string[] | undefined | null>, opts: { labels?: Record<string, string> | ((v: string) => string); order?: readonly string[] } = {}): FacetOption[] {
  const counts = new Map<string, number>();
  for (const v of values) for (const x of Array.isArray(v) ? v : v === undefined || v === null || v === "" ? [] : [v as string]) counts.set(x, (counts.get(x) ?? 0) + 1);
  const label = (v: string) => (typeof opts.labels === "function" ? opts.labels(v) : opts.labels?.[v]) ?? v;
  const rank = (v: string) => (opts.order ? opts.order.indexOf(v) + 1 || 999 : 0);
  return [...counts.entries()].sort((a, b) => rank(a[0]) - rank(b[0]) || b[1] - a[1] || label(a[0]).localeCompare(label(b[0]))).map(([value, count]) => ({ value, label: label(value), count }));
}

/** True when the row's values for a column include one of the chosen values; an empty selection passes everything. */
export function passesFilter(want: readonly string[] | undefined, has: readonly string[]): boolean {
  return !want?.length || want.some((w) => has.includes(w));
}

/**
 * Header-filter state for a client table that already has its own controls: one selection per column key, a
 * `spec` builder for `ColumnHead`/`FilterHead`, and `pass` to apply a column's selection to a row. Columns whose
 * state lives elsewhere (an existing FacetSelect) build their spec by hand from that state instead.
 */
export function useHeaderFilters() {
  const [sel, setSel] = useState<Record<string, string[]>>({});
  const spec = (key: string, options: FacetOption[], single?: boolean): ColumnFilterSpec => ({ options, value: sel[key] ?? [], onChange: (v) => setSel((s) => ({ ...s, [key]: v })), single });
  const pass = (key: string, has: readonly string[]) => passesFilter(sel[key], has);
  const active = Object.values(sel).some((v) => v.length);
  const clear = () => setSel({});
  return { sel, setSel, spec, pass, active, clear };
}
