"use client";

import { useLayer } from "@/lib/layer";

/**
 * Wrap server-rendered technical content. Hidden when the reader has chosen Plain or Simple,
 * replaced by a one-line note with a switch back to Technical.
 */
export function LayerAware({ children, label = "technical summary" }: { children: React.ReactNode; label?: string }) {
  const [layer, update] = useLayer();
  if (layer.level === "technical") return <>{children}</>;
  return (
    <div className="card p-3 text-sm text-muted flex flex-wrap items-center gap-2">
      <span>The {label} is hidden in {layer.level === "simple" ? "Simple" : "Plain"} mode.</span>
      <button type="button" onClick={() => update({ level: "technical" })} className="underline">Show technical</button>
    </div>
  );
}
