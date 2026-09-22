"use client";

import { useEffect, useState, type ReactNode } from "react";
import { KindIcon } from "./KindIcon";
import { METRICS, type Metric } from "@/lib/cancer-dag";

/**
 * The badge switch for the cancer map. The SVG is rendered on the server with all four badges on every node; this
 * component only decides which one shows, by setting `data-by` on the wrapper (a stylesheet in the page hides the
 * others). The choice is mirrored in `?by=` so a link can open the map counting products or ideas, and read back
 * from the URL after mount so the first render matches the static HTML.
 */

export const METRIC_LABEL: Record<Metric, string> = { trials: "Trials", drugs: "Products", approvals: "Approved products", ideas: "Ideas" };
const TIP: Record<Metric, string> = {
  trials: "Badge: trials linked to the cancer or any of its subtypes",
  drugs: "Badge: products (drugs, tests, devices) linked to the cancer or any of its subtypes",
  approvals: "Badge: linked products with at least one recorded approval",
  ideas: "Badge: ideas linked to the cancer or any of its subtypes",
};

const isMetric = (s: string | null): s is Metric => !!s && (METRICS as readonly string[]).includes(s);

/** Small monoline stamp for the approvals pill; the other three reuse the kind glyphs. */
export function StampGlyph({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M8 3h8v5H8zM6 8h12l-1 5H7L6 8Zm1 5v8h10v-8M10 17l1.5 1.5L15 15" /></svg>;
}

export function MetricGlyph({ m, className = "h-3.5 w-3.5" }: { m: Metric; className?: string }) {
  if (m === "approvals") return <StampGlyph className={className} />;
  return <KindIcon kind={m === "drugs" ? "drug" : m === "ideas" ? "idea" : "trial"} className={className} />;
}

export function CancerMapBy({ children }: { children: ReactNode }) {
  const [by, setBy] = useState<Metric>("trials");
  // Initial metric from ?by=, deferred so the first render matches the static HTML.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const q = new URLSearchParams(window.location.search).get("by");
      if (isMetric(q)) setBy(q);
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  const choose = (m: Metric) => {
    setBy(m);
    const p = new URLSearchParams(window.location.search);
    if (m === "trials") p.delete("by"); else p.set("by", m);
    const q = p.toString();
    window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
  };
  return (
    <div data-by={by}>
      <div className="flex flex-wrap items-center gap-1.5 mb-3" role="group" aria-label="Which count the badges show">
        <span className="text-xs text-muted me-1">Badges count</span>
        {METRICS.map((m) => (
          <a key={m} href={m === "trials" ? "/cancers/map/" : `/cancers/map/?by=${m}`} onClick={(ev) => { ev.preventDefault(); choose(m); }} aria-current={by === m ? "true" : undefined} title={TIP[m]}
            className={`chip border inline-flex items-center gap-1 text-xs ${by === m ? "bg-accent text-white border-accent" : "bg-card border-border hover:bg-foreground/5"}`}>
            <MetricGlyph m={m} />
            <span>{METRIC_LABEL[m]}</span>
          </a>
        ))}
      </div>
      {children}
    </div>
  );
}
