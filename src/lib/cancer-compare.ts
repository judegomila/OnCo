import { graph } from "./graph";
import { routeFor } from "./kinds";
import type { Cancer } from "./schema";
import type { ToolIcon } from "./decision-tools";
import { biliaryCompareSet } from "@/data/cancer-compare/biliary";

/**
 * Cancers compared side by side (/cancers/<anchor>/compared/): a fixed set of rows across a handful of related
 * records, every cell either read from a record field (burden, a standard-of-care row, the history, a target's
 * prevalence rows) or written by hand with the source it was read from. A hand cell that names a record field must
 * be a substring of that field, which src/lib/cancer-compare.test.ts checks; a cell with nothing behind it is empty
 * and rendered as "not recorded". Sets live in src/data/cancer-compare/<set>.ts and are registered in COMPARE_SETS.
 */

export type CompareSource = { label: string; url: string };

/** A hand-written cell: text read from a record field (`from`) and/or from a cited page (`source`). */
export type CompareCell = { text: string; from?: { id: string; field: "summary" | "tldr" | "burden" }; source?: CompareSource };

export type CompareRowKind = "hand" | "burden" | "soc" | "history" | "prevalence";

export type CompareRowDef = {
  id: string;
  label: string;
  icon: ToolIcon;
  kind: CompareRowKind;
  /** What the row shows, in a line. */
  note?: string;
  /** soc rows: the standard-of-care setting(s) to quote, per cancer id. */
  settings?: Record<string, string | string[]>;
  /** prevalence rows: the target whose prevalence rows are read. */
  targetId?: string;
  /** hand rows, and the fallback for prevalence rows with no matching prevalence row. */
  cells?: Record<string, CompareCell>;
};

export type CompareSet = {
  anchorId: string;
  ids: string[];
  title: string;
  lede: string;
  /** For records whose prevalence is recorded on a parent (intrahepatic rows on "cholangiocarcinoma"): the words a parent row's measure or note must contain. */
  prevalenceKeywords?: Record<string, string[]>;
  rows: CompareRowDef[];
  asOf: string;
};

/** A cell after resolution against the graph: lines of text with the record field or page they came from. */
export type ResolvedCell = {
  lines: string[];
  /** The record the text was read from, when it was a record field. */
  from?: { id: string; field: string; href: string; name: string };
  sources: CompareSource[];
} | null;

export type ResolvedRow = { def: CompareRowDef; cells: Record<string, ResolvedCell> };

export const COMPARE_SETS: CompareSet[] = [biliaryCompareSet];

export const compareRoute = (anchorId: string) => `/cancers/${anchorId}/compared/`;

export function compareSetFor(id: string): CompareSet | undefined {
  return COMPARE_SETS.find((s) => s.anchorId === id) ?? COMPARE_SETS.find((s) => s.ids.includes(id));
}

export function compareAnchorIds(): string[] {
  return COMPARE_SETS.map((s) => s.anchorId);
}

const asList = (x: string | string[] | undefined): string[] => (x === undefined ? [] : Array.isArray(x) ? x : [x]);

/** History events that record a trial: a ref that is a trial record, or a trial-style acronym in the title (ESPAC-3, ABC-02). */
export function trialLegacy(c: Cancer): string[] {
  const g = graph();
  return c.history
    .filter((h) => (h.refs ?? []).some((r) => g.get(r)?.kind === "trial") || /\b[A-Z][A-Z]{2,}[A-Z0-9-]*-?\d+\b|\b(ABC|BILCAP|TOPAZ|KEYNOTE|ESPAC|HERIZON|FIGHT|FOENIX|ClarIDHy)\b/.test(h.title))
    .map((h) => `${h.year}: ${h.title}`);
}

export function resolveCompare(set: CompareSet): { cancers: Cancer[]; rows: ResolvedRow[] } {
  const g = graph();
  const cancers = set.ids.map((id) => g.must(id)).filter((e): e is Cancer => e.kind === "cancer");
  const fromRecord = (c: Cancer, field: string) => ({ id: c.id, field, href: routeFor(c), name: c.name });
  const rows: ResolvedRow[] = set.rows.map((def) => {
    const cells: Record<string, ResolvedCell> = {};
    for (const c of cancers) {
      const hand = def.cells?.[c.id];
      const handCell = (): ResolvedCell => hand ? { lines: [hand.text], from: hand.from ? { ...fromRecord(g.must(hand.from.id) as Cancer, hand.from.field), id: hand.from.id } : undefined, sources: hand.source ? [hand.source] : [] } : null;
      switch (def.kind) {
        case "hand": cells[c.id] = handCell(); break;
        case "burden": cells[c.id] = c.burden ? { lines: [c.burden], from: fromRecord(c, "burden"), sources: [] } : null; break;
        case "soc": {
          const rowsFor = asList(def.settings?.[c.id]).map((s) => c.standardOfCare.find((r) => r.setting === s)).filter((r): r is Cancer["standardOfCare"][number] => !!r);
          cells[c.id] = rowsFor.length ? { lines: rowsFor.map((r) => `${r.setting}: ${r.approach}`), from: fromRecord(c, "standardOfCare"), sources: rowsFor.flatMap((r) => (r.guideline?.url ? [{ label: r.guideline.version ?? "Guideline", url: r.guideline.url }] : [])) } : null;
          break;
        }
        case "history": {
          const lines = trialLegacy(c);
          cells[c.id] = lines.length ? { lines, from: fromRecord(c, "history"), sources: [] } : null;
          break;
        }
        case "prevalence": {
          const t = def.targetId ? g.get(def.targetId) : undefined;
          if (!t || t.kind !== "target") { cells[c.id] = handCell(); break; }
          let prev = t.prevalence.filter((r) => r.cancerId === c.id);
          let onParent = false;
          if (!prev.length && c.parent) {
            const words = set.prevalenceKeywords?.[c.id] ?? [];
            prev = t.prevalence.filter((r) => r.cancerId === c.parent && words.some((w) => `${r.measure ?? ""} ${r.note ?? ""}`.toLowerCase().includes(w.toLowerCase())));
            onParent = prev.length > 0;
          }
          if (prev.length) {
            const parent = onParent && c.parent ? g.get(c.parent) : undefined;
            cells[c.id] = {
              lines: prev.map((r) => `${typeof r.pct === "number" ? `${r.pct}%` : `${r.pct}%`}${r.measure ? ` ${r.measure}` : ""}${onParent && parent ? ` (recorded on ${parent.name})` : ""}`),
              from: { id: t.id, field: "prevalence", href: routeFor(t), name: t.name },
              sources: prev.flatMap((r) => (r.source ? [{ label: sourceLabel(r.source), url: r.source }] : [])),
            };
          } else cells[c.id] = handCell();
          break;
        }
      }
    }
    return { def, cells };
  });
  return { cancers, rows };
}

/** Every https URL a set cites, for the tests. */
export function compareUrls(set: CompareSet): string[] {
  const { rows } = resolveCompare(set);
  return [...new Set(rows.flatMap((r) => Object.values(r.cells).flatMap((c) => (c ? c.sources.map((s) => s.url) : []))))];
}

export function sourceLabel(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname === "doi.org") return `doi ${u.pathname.slice(1)}`;
    return u.hostname.replace(/^www\./, "");
  } catch { return url; }
}
