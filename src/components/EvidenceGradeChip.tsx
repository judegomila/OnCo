import { GRADE_META, gradeFromTags, type EvidenceGrade } from "@/lib/complementary";

/**
 * Evidence-grade chip for complementary and supportive approaches: strong, some, insufficient, no benefit,
 * or harm. Reads the grade from an explicit prop or from an entity's `evidence:<grade>` tag; renders nothing
 * when there is none. The title carries the one-line definition of the grade. Server-safe.
 */
export function EvidenceGradeChip({ grade, tags, size = "sm" }: { grade?: EvidenceGrade; tags?: readonly string[]; size?: "xs" | "sm" }) {
  const g = grade ?? (tags ? gradeFromTags(tags) : undefined);
  if (!g) return null;
  const m = GRADE_META[g];
  return (
    <span className={`chip ${m.tone} ${size === "xs" ? "text-[10px]" : ""}`} title={m.blurb}>
      <span aria-hidden className="opacity-70 font-normal">Evidence</span> {m.label}
    </span>
  );
}

/** Legend for pages that show many chips: one line per grade. */
export function EvidenceGradeLegend({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid gap-x-4 gap-y-2 sm:grid-cols-2 text-sm ${className}`}>
      {(Object.keys(GRADE_META) as EvidenceGrade[]).map((g) => (
        <div key={g} className="flex items-start gap-2">
          <dt className="shrink-0 mt-0.5"><span className={`chip ${GRADE_META[g].tone}`}>{GRADE_META[g].label}</span></dt>
          <dd className="text-muted leading-relaxed">{GRADE_META[g].blurb}</dd>
        </div>
      ))}
    </dl>
  );
}
