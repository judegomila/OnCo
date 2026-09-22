"use client";

import { useCallback, useEffect, useState } from "react";
import { EDGE_FILTERS, EDGE_KIND_META, type EdgeKind } from "@/lib/edge-kinds";
import { EdgeGlyph } from "./EdgeGlyph";

type FilterId = (typeof EDGE_FILTERS)[number]["id"];
const isFilter = (s: string): s is FilterId => EDGE_FILTERS.some((f) => f.id === s);

/**
 * The only client-side part of /edge/: the kind pills. The feed itself is server-rendered; choosing a pill shows or
 * hides the rendered cards by their `data-kind` attribute, hides day groups left empty, and keeps the choice in the
 * URL hash (#papers, #results, ...) so a filtered view can be linked. Kind pills on the cards and the week strip
 * link to the same hashes, which `hashchange` picks up.
 */
export function EdgeFilter({ counts }: { counts: Partial<Record<FilterId, number>> }) {
  const [active, setActive] = useState<FilterId>("all");

  const apply = useCallback((id: FilterId) => {
    const feed = document.getElementById("edge-feed");
    if (!feed) return;
    const kinds = new Set<string>(EDGE_FILTERS.find((f) => f.id === id)?.kinds ?? []);
    feed.querySelectorAll<HTMLElement>("[data-kind]").forEach((el) => { el.style.display = kinds.has(el.dataset.kind ?? "") ? "" : "none"; });
    feed.querySelectorAll<HTMLElement>("[data-day]").forEach((sec) => { sec.style.display = [...sec.querySelectorAll<HTMLElement>("[data-kind]")].some((el) => el.style.display !== "none") ? "" : "none"; });
    const empty = document.getElementById("edge-empty");
    if (empty) empty.style.display = [...feed.querySelectorAll<HTMLElement>("[data-kind]")].some((el) => el.style.display !== "none") ? "none" : "";
    feed.dataset.filter = id;
  }, []);

  useEffect(() => {
    const fromHash = () => { const h = window.location.hash.replace(/^#/, ""); const id: FilterId = isFilter(h) ? h : "all"; setActive(id); apply(id); };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [apply]);

  const choose = (id: FilterId) => {
    window.history.replaceState(null, "", id === "all" ? window.location.pathname : `#${id}`);
    setActive(id);
    apply(id);
  };

  return (
    <div role="group" aria-label="Show only" className="flex flex-wrap gap-1.5">
      {EDGE_FILTERS.map((f) => {
        const on = active === f.id;
        const n = counts[f.id] ?? 0;
        const tip = f.id === "all" ? "Every kind of signal" : f.kinds.map((k: EdgeKind) => EDGE_KIND_META[k].plural).join(" and ");
        return (
          <button key={f.id} type="button" onClick={() => choose(f.id)} aria-pressed={on} title={tip}
            className={`chip border text-xs px-2.5 py-1 ${on ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-foreground/5"}`}>
            <EdgeGlyph kind={f.id === "all" ? "all" : f.kinds[0]} className="h-3.5 w-3.5" />
            <span>{f.label}</span>
            <span className={`tabular-nums ${on ? "opacity-80" : "text-muted"}`}>{n}</span>
          </button>
        );
      })}
    </div>
  );
}
