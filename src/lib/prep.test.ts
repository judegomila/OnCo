import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { clearPrep, EMPTY_PREP, groupBySetting, loadPrep, PREP_KEY, prepFileName, questionKey, savePrep, toText } from "./prep";

/** Minimal window + localStorage so the SSR-safe helpers exercise their browser branch. */
function fakeWindow() {
  const store = new Map<string, string>();
  const localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, v); },
    removeItem: (k: string) => { store.delete(k); },
  };
  return { localStorage, store };
}

describe("prep state", () => {
  let win: ReturnType<typeof fakeWindow>;
  beforeEach(() => { win = fakeWindow(); (globalThis as unknown as { window: unknown }).window = win; });
  afterEach(() => { delete (globalThis as unknown as { window?: unknown }).window; });

  it("returns the empty state without a window", () => {
    delete (globalThis as unknown as { window?: unknown }).window;
    expect(loadPrep()).toEqual(EMPTY_PREP);
    expect(() => savePrep({ ...EMPTY_PREP, notes: "x" })).not.toThrow();
  });

  it("round-trips through localStorage", () => {
    const saved = savePrep({ cancerId: "tnbc", picked: ["Newly diagnosed::What is my stage?"], custom: ["Can I keep working?"], notes: "Cough since May" });
    expect(saved.savedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(win.store.has(PREP_KEY)).toBe(true);
    const back = loadPrep();
    expect(back.cancerId).toBe("tnbc");
    expect(back.picked).toEqual(["Newly diagnosed::What is my stage?"]);
    expect(back.custom).toEqual(["Can I keep working?"]);
    expect(back.notes).toBe("Cough since May");
    clearPrep();
    expect(loadPrep()).toEqual(EMPTY_PREP);
  });

  it("tolerates corrupt or partial storage", () => {
    win.store.set(PREP_KEY, "{not json");
    expect(loadPrep()).toEqual(EMPTY_PREP);
    win.store.set(PREP_KEY, JSON.stringify({ picked: [1, "ok"], custom: "nope", notes: 5 }));
    expect(loadPrep()).toEqual({ cancerId: undefined, picked: ["ok"], custom: [], notes: "", savedAt: undefined });
  });
});

describe("prep text", () => {
  const qs = [
    { setting: "Newly diagnosed", question: "What is my stage?", why: "Everything follows from stage." },
    { setting: "Any stage", question: "Are there trials for me?", why: "Trials set the next standard." },
    { setting: "Newly diagnosed", question: "Which biomarkers were tested?", why: "They decide eligibility." },
  ];

  it("keys questions stably", () => {
    expect(questionKey(qs[0])).toBe("Newly diagnosed::What is my stage?");
  });

  it("groups by setting in first-seen order", () => {
    const g = groupBySetting(qs);
    expect(g.map(([s]) => s)).toEqual(["Newly diagnosed", "Any stage"]);
    expect(g[0][1]).toHaveLength(2);
  });

  it("renders a numbered one-page pack", () => {
    const t = toText({ cancerName: "Triple-negative breast cancer", questions: qs, custom: ["Can I travel?"], treatments: ["Pembrolizumab", "Carboplatin"], notes: "  Cough since May  ", date: "2026-09-09" });
    expect(t.startsWith("# Questions for my appointment: Triple-negative breast cancer\n")).toBe(true);
    expect(t).toContain("## Treatments so far\n- Pembrolizumab\n- Carboplatin");
    expect(t).toContain("## Newly diagnosed\n1. What is my stage?\n   Why: Everything follows from stage.\n   Answer:");
    expect(t).toContain("2. Which biomarkers were tested?");
    expect(t).toContain("## Any stage\n3. Are there trials for me?");
    expect(t).toContain("## My own questions\n4. Can I travel?");
    expect(t).toContain("## Notes to mention\nCough since May\n");
    expect(t.endsWith("\n")).toBe(true);
    expect(t).not.toContain("—");
  });

  it("omits empty sections", () => {
    const t = toText({ questions: [], custom: [], treatments: [], notes: "", date: "2026-09-09" });
    expect(t).toBe("# Questions for my appointment\nPrepared 2026-09-09 with OnCo (onco.cc). Orientation, not medical advice.\n");
  });

  it("builds a safe file name", () => {
    expect(prepFileName("HR-positive / HER2-negative breast cancer", "2026-09-09")).toBe("onco-questions-hr-positive-her2-negative-breast-cancer-2026-09-09.md");
    expect(prepFileName(undefined, "2026-09-09")).toBe("onco-questions-appointment-2026-09-09.md");
  });
});
