"use client";

import { REGION_META, useRegion } from "@/lib/region";

export type AnswerLine = { key: string; where: string; text: string };

/**
 * The row for the reader's own country, said first, when they have chosen one in the header. Nothing is shown
 * until they have: the page does not guess a country from the browser for a question about medicine.
 */
export function AvailabilityAnswer({ lines }: { lines: AnswerLine[] }) {
  const { region, ready } = useRegion();
  if (!ready || !region) return null;
  const line = lines.find((l) => l.key === region);
  return (
    <p className="text-sm mb-2" data-testid="availability-answer">
      <span className="font-medium">{REGION_META[region].label}:</span>{" "}
      {line ? line.text : <span className="text-muted">nothing recorded here yet. That is a gap in our research, not a refusal; ask the treating team or the regulator.</span>}
    </p>
  );
}
