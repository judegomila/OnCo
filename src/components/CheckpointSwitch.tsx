"use client";

import { useState, type ReactNode } from "react";
import { CheckpointGlyph } from "./CheckpointGlyph";

/**
 * Two pills that switch the hub between the two meanings of checkpoint. Both panels are in the markup (search engines
 * and readers without JavaScript see both, one after the other); the pills hide the other when hydrated. The pills are
 * tabs in the accessibility tree and each panel is a tabpanel that names its pill.
 */
export function CheckpointSwitch({ immune, cellCycle }: { immune: ReactNode; cellCycle: ReactNode }) {
  const [tab, setTab] = useState<"immune" | "cell-cycle">("immune");
  const [ready, setReady] = useState(false);
  const pill = (id: "immune" | "cell-cycle", label: string, blurb: string) => (
    <button type="button" role="tab" id={`cp-tab-${id}`} aria-selected={tab === id} aria-controls={`cp-panel-${id}`} onClick={() => { setTab(id); setReady(true); }}
      className={`chip border inline-flex items-center gap-2 px-3 py-1.5 text-sm transition-colors ${tab === id ? "border-accent bg-accent-soft text-accent" : "bg-card border-border hover:bg-foreground/5"}`}>
      <CheckpointGlyph id={id} className="h-4 w-4" /><span><span className="font-medium">{label}</span><span className="hidden sm:inline text-muted"> · {blurb}</span></span>
    </button>
  );
  return (
    <div data-checkpoint-switch>
      <div role="tablist" aria-label="Which kind of checkpoint" className="flex flex-wrap gap-2 mb-5">
        {pill("immune", "Immune checkpoints", "brakes on immune cells")}
        {pill("cell-cycle", "Cell-cycle checkpoints", "gates inside every dividing cell")}
      </div>
      <div role="tabpanel" id="cp-panel-immune" aria-labelledby="cp-tab-immune" hidden={ready && tab !== "immune"}>{immune}</div>
      <div role="tabpanel" id="cp-panel-cell-cycle" aria-labelledby="cp-tab-cell-cycle" hidden={ready && tab !== "cell-cycle"} className={ready ? "" : "mt-10"}>{cellCycle}</div>
    </div>
  );
}
