"use client";

import { useState } from "react";
import { EntityBrowser, type BrowserRow, type ColDef, type FacetCounts, type FacetDef } from "./EntityBrowser";
import { KindIcon } from "./KindIcon";
import { Tip } from "./Tip";
import type { Kind } from "@/lib/kinds";
import type { MoreRows } from "@/lib/static-tables";
import type { SortState } from "./filters/ResultsTable";

/** A tag glyph in the site's monoline grammar: a label with a hole, for pills and headers. */
export function TagGlyph({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h8.5l9 9-7.5 7.5-9-9V4Z" /><circle cx="7.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" /></svg>;
}

export type TagKindCount = { kind: Kind; label: string; count: number };

/**
 * The browser of one tag page with its kind pills. Each pill is a deep link (`?kind=Cancer`, which the browser reads
 * on load like any other facet) and, when clicked here, sets the kind facet in place through the browser's external
 * facet channel, so the table narrows without a reload and the URL follows. Clicking the pressed pill clears it.
 */
export function TaggedBrowser({ rows, more, counts, kinds, facets, columns, defaultSort, noun }: {
  rows: BrowserRow[]; more?: MoreRows; counts?: FacetCounts; kinds: TagKindCount[]; facets: FacetDef[]; columns: ColDef[]; defaultSort: SortState; noun: string;
}) {
  const [kind, setKind] = useState<string[]>([]);
  return (
    <div>
      {kinds.length > 1 && (
        <div className="mb-4">
          <div className="kicker mb-1.5">By kind</div>
          <ul className="flex flex-wrap gap-1.5" data-tag-kinds>
            {kinds.map((k) => {
              const on = kind.includes(k.label);
              return (
                <li key={k.kind}>
                  <Tip title={k.label} text={on ? `Showing only ${k.label.toLowerCase()} records. Click to show every kind again.` : `Show only the ${k.count.toLocaleString("en-GB")} ${k.label.toLowerCase()} records with this tag.`}>
                    <a href={`?kind=${encodeURIComponent(k.label)}`} aria-current={on ? "true" : undefined} data-on={on ? "" : undefined} onClick={(e) => { e.preventDefault(); setKind(on ? [] : [k.label]); }}
                      className={`chip border inline-flex items-center gap-1.5 ${on ? "bg-accent-soft text-accent border-accent" : "bg-card border-border hover:bg-foreground/5"}`}>
                      <KindIcon kind={k.kind} className="h-3.5 w-3.5" />{k.label}<span className="tabular-nums text-muted">{k.count.toLocaleString("en-GB")}</span>
                    </a>
                  </Tip>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <EntityBrowser rows={rows} more={more} counts={counts} facets={facets} columns={columns} noun={noun} defaultSort={defaultSort}
        external={{ key: "kind", values: kind }} onExternalChange={setKind} />
    </div>
  );
}
