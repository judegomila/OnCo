import type { ReactNode } from "react";
import type { Stage } from "@/lib/schema";

/**
 * One monoline icon per company stage (see STAGES in schema.ts), in the same 24x24, 1.5px stroke style as
 * FrontIcon. Server-safe, no hooks. Unknown stages fall back to a plain circle.
 */

function Svg({ className, children }: { className: string; children: ReactNode }) {
  return (
    <svg aria-hidden focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {children}
    </svg>
  );
}

const ICONS: Record<Stage, (p: { className: string }) => ReactNode> = {
  // Startup: a seedling.
  startup: (p) => (
    <Svg {...p}>
      <path d="M12 21v-8" />
      <path d="M12 13c0-3.5 2.5-6 6-6 0 3.5-2.5 6-6 6Z" />
      <path d="M12 13c0-3.5-2.5-6-6-6 0 3.5 2.5 6 6 6Z" />
      <path d="M6 21h12" />
    </Svg>
  ),
  // Growth: a rising staircase with an arrow.
  growth: (p) => (
    <Svg {...p}>
      <path d="M4 19h4v-4h4v-4h4V7h4" />
      <path d="M17 4h3v3" />
    </Svg>
  ),
  // Public: a ticker board.
  public: (p) => (
    <Svg {...p}>
      <rect x={3} y={5} width={18} height={14} rx={2} />
      <path d="M6 15l3.5-4 2.5 2.5L15 10l3 3" />
    </Svg>
  ),
  // Large private: a building with a closed door.
  "private-large": (p) => (
    <Svg {...p}>
      <path d="M4 21V5l8-2 8 2v16" />
      <path d="M3 21h18" />
      <path d="M10 21v-5h4v5" />
      <path d="M8 9h2M14 9h2M8 13h2M14 13h2" />
    </Svg>
  ),
  // Acquired: two arrows merging into one.
  acquired: (p) => (
    <Svg {...p}>
      <path d="M4 6h4l8 12h4" />
      <path d="M4 18h4l8-12h4" />
      <path d="M17 3l3 3-3 3" />
      <path d="M17 15l3 3-3 3" />
    </Svg>
  ),
  // Wound down: a circle with a bar.
  defunct: (p) => (
    <Svg {...p}>
      <circle cx={12} cy={12} r={8} />
      <path d="M8 12h8" />
    </Svg>
  ),
};

export function StageIcon({ stage, className = "h-4 w-4" }: { stage?: Stage; className?: string }) {
  const Icon = stage ? ICONS[stage] : undefined;
  if (!Icon) return <Svg className={className}><circle cx={12} cy={12} r={8} /></Svg>;
  return <Icon className={className} />;
}
