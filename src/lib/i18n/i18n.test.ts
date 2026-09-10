import { describe, expect, it } from "vitest";
import { EN, UI_DICTS, t, tl, statusLabel, tNoun, kindName, type UiKey } from "./ui";
import { NAV_DICTS, groupKey } from "./nav";
import { NAV_GROUPS } from "@/lib/nav";
import { LANGS } from "@/lib/layer";
import { KIND_META, KINDS, STATUSES } from "@/lib/schema";
import { STATUS_LABEL } from "@/lib/text";

const OTHER = LANGS.map((l) => l.code).filter((c) => c !== "en");
const KEYS = Object.keys(EN) as UiKey[];

/** House style: no em-dashes, no "as of" stamps, never the word "spike", in any language file. */
const banned = (s: string) => /—|\bas of\b|\bspike\b/i.test(s);

describe("ui chrome dictionary", () => {
  it("covers eight languages besides English", () => {
    expect(OTHER).toHaveLength(8);
    for (const l of OTHER) expect(UI_DICTS[l]).toBeDefined();
  });

  it("every English key exists, non-empty, in all eight other languages", () => {
    for (const l of OTHER) {
      const d = UI_DICTS[l] as Record<string, string>;
      const missing = KEYS.filter((k) => typeof d[k] !== "string" || d[k].trim() === "");
      expect(missing, `${l} missing: ${missing.join(", ")}`).toEqual([]);
      const extra = Object.keys(d).filter((k) => !(k in EN));
      expect(extra, `${l} has keys not in English: ${extra.join(", ")}`).toEqual([]);
    }
  });

  it("keeps the same {placeholders} in every translation", () => {
    const holes = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
    for (const l of OTHER) for (const k of KEYS) {
      expect(holes(UI_DICTS[l][k]), `${l}: ${k}`).toEqual(holes(EN[k]));
    }
  });

  it("follows house style in every language", () => {
    for (const l of [...OTHER, "en" as const]) for (const k of KEYS) expect(banned(UI_DICTS[l][k]), `${l}: ${k}`).toBe(false);
  });

  it("has a label and plural for every kind and a label for every status", () => {
    for (const k of KINDS) {
      expect(EN[`kind.${k}.label` as UiKey]).toBe(KIND_META[k].label);
      expect(EN[`kind.${k}.plural` as UiKey]).toBe(KIND_META[k].plural);
      if (KIND_META[k].title) expect(EN[`kind.${k}.title` as UiKey]).toBe(KIND_META[k].title);
    }
    for (const s of STATUSES) expect(EN[`status.${s}` as UiKey]).toBe(STATUS_LABEL[s]);
  });

  it("helpers fall back to English or pass unknown text through", () => {
    expect(t("home", "es")).toBe("Inicio");
    expect(t("toolbar.countOf", "fr", { count: 3, total: 10, noun: "essais" })).toBe("3 sur 10 essais");
    expect(tl("Open problems", "de")).toBe("Offene Probleme");
    expect(tl("Something bespoke", "de")).toBe("Something bespoke");
    expect(statusLabel("phase-3", "ja")).toBe("第 3 相");
    expect(statusLabel("weird", "ja")).toBe("weird");
    expect(tNoun("drugs", "pt")).toBe("produtos");
    expect(tNoun("things", "pt")).toBe("things");
    expect(kindName("drug", "title", "ar")).toBe("العلاجات والفحوصات");
    expect(kindName("cancer", "title", "zh")).toBe("癌症");
  });
});

describe("navigation dictionary", () => {
  it("translates every group and every item in all eight languages", () => {
    for (const l of OTHER) {
      const d = NAV_DICTS[l];
      const missing: string[] = [];
      for (const g of NAV_GROUPS) {
        const gk = groupKey(g);
        if (!d[gk]?.[0] || !d[gk]?.[1]) missing.push(gk);
        if (g.short && !d[gk]?.[2]) missing.push(`${gk} (short)`);
        for (const it of g.items) if (!d[it.href]?.[0] || !d[it.href]?.[1]) missing.push(it.href);
      }
      expect(missing, `${l} missing: ${missing.join(", ")}`).toEqual([]);
      const known = new Set([...NAV_GROUPS.map(groupKey), ...NAV_GROUPS.flatMap((g) => g.items.map((i) => i.href))]);
      const orphans = Object.keys(d).filter((k) => !known.has(k));
      expect(orphans, `${l} has entries for unknown hrefs: ${orphans.join(", ")}`).toEqual([]);
    }
  });

  it("follows house style", () => {
    for (const l of OTHER) for (const [k, v] of Object.entries(NAV_DICTS[l])) for (const s of v) if (s) expect(banned(s), `${l}: ${k}`).toBe(false);
  });
});
