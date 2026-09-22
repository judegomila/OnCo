"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useT, type UiKey } from "@/lib/i18n/ui";
import { isViewId, VIEWS, type ViewId } from "@/lib/idea-rankings-views";
import { RankGlyph } from "./RankGlyph";

/**
 * The view pills on /ideas/rankings/. The lists themselves are rendered on the server and handed in as `panels`;
 * this component only decides which one is showing. Deep links (`?view=hardest`) are read once after mount, the
 * way the other URL-backed views do it, and a click writes the view back into the URL without a navigation. A view
 * that is not available (Most wanted before the first vote) has no pill; its deep link falls back to the default.
 */
export function IdeaRankings({ available, counts, panels, initial = "bang-for-buck" }: {
  available: Record<ViewId, boolean>;
  counts: Record<ViewId, number>;
  panels: Record<ViewId, ReactNode>;
  initial?: ViewId;
}) {
  const [active, setActive] = useState<ViewId>(initial);
  const { t } = useT();

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const v = new URLSearchParams(window.location.search).get("view");
      if (isViewId(v) && available[v]) setActive(v);
    });
    return () => cancelAnimationFrame(raf);
  }, [available]);

  const pick = (id: ViewId) => {
    setActive(id);
    const p = new URLSearchParams(window.location.search);
    p.set("view", id);
    window.history.replaceState(null, "", `?${p.toString()}`);
  };

  return (
    <div>
      <nav aria-label={t("rank.viewsAria")} className="flex flex-wrap gap-2">
        {VIEWS.filter((v) => available[v.id]).map((v) => {
          const on = v.id === active;
          return (
            <a key={v.id} href={`/ideas/rankings/?view=${v.id}`} aria-current={on ? "true" : undefined} onClick={(e) => { e.preventDefault(); pick(v.id); }}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${on ? "bg-accent text-white border-accent" : "bg-card border-border hover:border-border-strong hover:shadow-sm"}`}>
              <RankGlyph name={v.glyph} className="h-4 w-4" />
              <span>{t(`rank.view.${v.id}` as UiKey)}</span>
              <span className={`text-xs tabular-nums ${on ? "text-white/80" : "text-muted"}`}>{counts[v.id].toLocaleString("en-GB")}</span>
            </a>
          );
        })}
      </nav>
      {!available["most-wanted"] && <p className="text-xs text-muted mt-2 max-w-3xl">{t("rank.noVotes")}</p>}
      <div className="mt-6">{panels[active]}</div>
    </div>
  );
}
