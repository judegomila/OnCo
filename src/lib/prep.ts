/**
 * Appointment prep pack: the questions a reader has chosen to bring, their own additions, and notes.
 * Browser-only state in localStorage under one key; nothing is sent anywhere. SSR-safe like profile.ts.
 */
export type PrepQuestion = { setting: string; question: string; why: string };

export type PrepState = {
  cancerId?: string;
  /** Keys of ticked corpus questions, see `questionKey`. */
  picked: string[];
  /** Questions the reader typed themselves. */
  custom: string[];
  /** Free text: symptoms, dates, medicines, things to mention. */
  notes: string;
  /** ISO timestamp of the last save. */
  savedAt?: string;
};

export const PREP_KEY = "onco:prep:v1";
export const EMPTY_PREP: PrepState = { picked: [], custom: [], notes: "" };

/** Stable key for a corpus question so ticks survive reorders. */
export const questionKey = (q: { setting: string; question: string }) => `${q.setting}::${q.question}`;

export function loadPrep(): PrepState {
  if (typeof window === "undefined") return EMPTY_PREP;
  try {
    const raw = window.localStorage.getItem(PREP_KEY);
    if (!raw) return EMPTY_PREP;
    const p = JSON.parse(raw) as Partial<PrepState>;
    return {
      cancerId: typeof p.cancerId === "string" ? p.cancerId : undefined,
      picked: Array.isArray(p.picked) ? p.picked.filter((x): x is string => typeof x === "string") : [],
      custom: Array.isArray(p.custom) ? p.custom.filter((x): x is string => typeof x === "string") : [],
      notes: typeof p.notes === "string" ? p.notes : "",
      savedAt: typeof p.savedAt === "string" ? p.savedAt : undefined,
    };
  } catch {
    return EMPTY_PREP;
  }
}

export function savePrep(p: PrepState): PrepState {
  const next = { ...p, savedAt: new Date().toISOString() };
  if (typeof window !== "undefined") window.localStorage.setItem(PREP_KEY, JSON.stringify(next));
  return next;
}

export function clearPrep() {
  if (typeof window !== "undefined") window.localStorage.removeItem(PREP_KEY);
}

export type PrepPack = {
  cancerName?: string;
  questions: PrepQuestion[];
  custom: string[];
  treatments: string[];
  notes: string;
  /** YYYY-MM-DD. */
  date: string;
};

/** Group questions by setting, keeping first-seen order. */
export function groupBySetting(qs: PrepQuestion[]): Array<[string, PrepQuestion[]]> {
  const m = new Map<string, PrepQuestion[]>();
  for (const q of qs) m.set(q.setting, [...(m.get(q.setting) ?? []), q]);
  return [...m.entries()];
}

/** Plain Markdown for download or paste: one page, numbered, with room to write answers. */
export function toText(p: PrepPack): string {
  const lines: string[] = [];
  lines.push(`# Questions for my appointment${p.cancerName ? `: ${p.cancerName}` : ""}`);
  lines.push(`Prepared ${p.date} with OnCo (onco.cc). Orientation, not medical advice.`);
  lines.push("");
  if (p.treatments.length) {
    lines.push("## Treatments so far");
    for (const t of p.treatments) lines.push(`- ${t}`);
    lines.push("");
  }
  let n = 0;
  for (const [setting, qs] of groupBySetting(p.questions)) {
    lines.push(`## ${setting}`);
    for (const q of qs) {
      n += 1;
      lines.push(`${n}. ${q.question}`);
      lines.push(`   Why: ${q.why}`);
      lines.push("   Answer:");
      lines.push("");
    }
  }
  if (p.custom.length) {
    lines.push("## My own questions");
    for (const c of p.custom) {
      n += 1;
      lines.push(`${n}. ${c}`);
      lines.push("   Answer:");
      lines.push("");
    }
  }
  if (p.notes.trim()) {
    lines.push("## Notes to mention");
    lines.push(p.notes.trim());
    lines.push("");
  }
  return lines.join("\n").replace(/\n+$/, "\n");
}

/** Safe file name for the download. */
export function prepFileName(cancerName: string | undefined, date: string): string {
  const slug = (cancerName ?? "appointment").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `onco-questions-${slug || "appointment"}-${date}.md`;
}
