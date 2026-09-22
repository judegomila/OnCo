/**
 * Server side of the line-of-therapy navigator: one file per cancer (/api/v1/navigator/<id>.json) with its standard
 * of care, the match rows relevant to it, caregiver details and questions, plus one shared file
 * (/api/v1/navigator/lines.json) for the "already tried" chooser. Written by scripts/build-api.ts and fetched by
 * src/components/Navigator.tsx once the reader's profile names a cancer. The page used to serialise all of it for
 * every cancer (8.8 MB of HTML); now it carries the cancer chooser and the support links alone.
 */
import type { Graph } from "./graph";
import { routeFor, type Cancer } from "./schema";
import type { MatchRow } from "./biomarker-match";
import { questionsFor } from "./questions";
import type { NavCancer, NavigatorCancerFile, SocRef } from "@/components/Navigator";
import type { CareDetail } from "@/components/CaregiverPanel";
import type { ProfileLine } from "@/components/ProfileBar";

/** Products and technologies offered as "already tried", with the cancers each is relevant to. */
export function navigatorLines(rows: MatchRow[]): ProfileLine[] {
  return rows.filter((r) => r.kind === "drug" || r.kind === "technology").map((r) => ({ id: r.id, name: r.name, kind: r.kind as "drug" | "technology", cancers: r.cancers })).sort((a, b) => a.name.localeCompare(b.name));
}

/** Caregiver detail for one product or technology: structured toxicity where present, else the technology's characteristic limitations. */
function careDetail(g: Graph, id: string): CareDetail | null {
  const e = g.get(id);
  if (!e) return null;
  if (e.kind === "drug") {
    const techLimits = e.technologies.flatMap((t) => { const x = g.get(t); return x && x.kind === "technology" ? x.limitations : []; });
    return { id: e.id, name: e.name, route: routeFor(e), kind: "drug", modality: e.modality, toxicity: e.toxicity.map((t) => ({ event: t.event, anyGradePct: t.anyGradePct, grade3PlusPct: t.grade3PlusPct, note: t.note })), limitations: techLimits, monitoring: e.dosing?.monitoring };
  }
  if (e.kind === "technology") return { id: e.id, name: e.name, route: routeFor(e), kind: "technology", toxicity: [], limitations: e.limitations };
  return null;
}

export function navigatorCancerFile(g: Graph, c: Cancer, all: MatchRow[]): NavigatorCancerFile {
  const cancer: NavCancer = {
    id: c.id, name: c.name, group: c.group, route: routeFor(c), tldr: c.tldr, stateOfArt: c.stateOfArt, pipeline: c.pipeline,
    soc: c.standardOfCare.map((r) => ({
      setting: r.setting, approach: r.approach,
      refs: r.refs.map((id) => g.get(id)).filter((x): x is NonNullable<typeof x> => !!x).map((x): SocRef => ({ id: x.id, name: x.name, route: routeFor(x), status: x.status, kind: x.kind, technologies: x.technologies })),
    })),
  };
  // The cancer's own rows, plus every caution pairing (cautions match on what was tried, whichever cancer it was for).
  const rows = all.filter((r) => r.cancers.includes(c.id) || r.pair?.caution);
  const details: Record<string, CareDetail> = {};
  for (const id of [...rows.map((r) => r.id), ...cancer.soc.flatMap((r) => r.refs.map((x) => x.id))]) {
    if (details[id]) continue;
    const d = careDetail(g, id);
    if (d) details[id] = d;
  }
  const questions = questionsFor(c).items.map((q) => ({ setting: q.setting, question: q.question, why: q.why }));
  return { cancer, rows, details, questions };
}
