import type { CheckpointTone } from "@/data/checkpoint-map";

/**
 * Line glyphs for the checkpoint families: one per tone (brake, accelerator, ligand, "don't eat me", metabolic,
 * soluble, gate) and one per family hub. Inline SVG, current colour, so a pill can carry it at 14 px.
 */
export type CheckpointGlyphId = CheckpointTone | "immune" | "cell-cycle" | "families";

const P: Record<CheckpointGlyphId, string> = {
  // a receptor stub with a stop bar: the brake
  inhibitory: "M12 21v-7M8 14h8M12 14a4 4 0 0 1-4-4V4h8v6a4 4 0 0 1-4 4ZM6 8h-2M18 8h2",
  // a receptor stub with an upward arrow: the accelerator
  stimulatory: "M12 21v-7a4 4 0 0 1-4-4V4h8v6a4 4 0 0 1-4 4M12 4V1M9 3l3-2 3 2",
  // a key shape offered from the other cell
  ligand: "M4 12h9M13 9v6M9 10v4M16 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z",
  // a cell with a shield: don't eat me
  innate: "M12 3 5 6v5c0 4.5 3 8.4 7 9.5 4-1.1 7-5 7-9.5V6l-7-3ZM9.5 12l2 2 3.5-4",
  // a flask: chemistry of the microenvironment
  metabolic: "M9 3h6M10 3v6l-5.5 9A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9V3M7.5 15h9",
  // ripples: a secreted signal
  soluble: "M4 8c2.5-2 5-2 8 0s5.5 2 8 0M4 13c2.5-2 5-2 8 0s5.5 2 8 0M4 18c2.5-2 5-2 8 0s5.5 2 8 0",
  // a gate across a path
  gate: "M3 12h5M16 12h5M8 5v14M16 5v14M8 8h8M8 12h8M8 16h8",
  // two cells meeting: the synapse
  immune: "M2 12a6 6 0 0 1 6-6h1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H8a6 6 0 0 1-6-6ZM22 12a6 6 0 0 0-6-6h-1a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h1a6 6 0 0 0 6-6Z",
  // a ring with ticks: the cell cycle
  "cell-cycle": "M12 3a9 9 0 1 1-9 9M12 3v3M21 12h-3M12 21v-3M3 12h3M12 3 9.5 1.5M12 3l2.5-1.5",
  // a fork: one word, two meanings
  families: "M12 21v-8M12 13 6 7M12 13l6-6M6 7V3M18 7V3",
};

export function CheckpointGlyph({ id, className = "h-4 w-4" }: { id: CheckpointGlyphId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d={P[id]} />
    </svg>
  );
}

/** Stroke and fill colours per tone, shared by both schematics (light theme; the accent marks approved members). */
export const TONE_COLOUR: Record<CheckpointTone, { stroke: string; fill: string; label: string }> = {
  inhibitory: { stroke: "#3b5bdb", fill: "#dbe4ff", label: "Inhibitory brake" },
  stimulatory: { stroke: "#2f9e44", fill: "#d3f9d8", label: "Co-stimulatory accelerator" },
  ligand: { stroke: "#e67700", fill: "#fff3bf", label: "Ligand on the other cell" },
  innate: { stroke: "#7048e8", fill: "#e5dbff", label: "Don't eat me pair" },
  metabolic: { stroke: "#0b7285", fill: "#c5f6fa", label: "Metabolic brake" },
  soluble: { stroke: "#868e96", fill: "#f1f3f5", label: "Soluble signal" },
  gate: { stroke: "#4263eb", fill: "#dbe4ff", label: "Checkpoint gate" },
};
export const ACCENT = "#d6336c";
