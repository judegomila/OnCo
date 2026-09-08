/**
 * Cancer "spikes": deep dives that add entities and patch a cancer record without editing
 * the shared cancers.ts file. Each spike lives in its own file so several people (or agents)
 * can work in parallel.
 *
 * A spike exports:
 *   entities: EntityInput[]              new drugs, trials, technologies, targets, ideas, institutions…
 *   patch:    CancerPatch                fields merged into the existing cancer record
 *
 * Merge rules (see mergeSpikes): scalar fields override; array fields are appended and
 * de-duplicated (history is sorted by year after merge).
 */
import type { CancerInput, EntityInput } from "@/lib/schema";
import { TRIAL_OUTCOMES } from "../trial-outcomes";

export type CancerPatch = Partial<Omit<CancerInput, "id" | "kind">>;
export type Spike = { cancerId: string; entities: EntityInput[]; patch: CancerPatch };

// Register spikes here. Each file default-exports a Spike.
import nsclc from "./nsclc";
import prostate from "./prostate";
import pancreatic from "./pancreatic";
import glioblastoma from "./glioblastoma";
import breastHr from "./breast-hr-positive";
import breastHer2 from "./breast-her2-positive";
import hcc from "./hcc";
import cholangiocarcinoma from "./cholangiocarcinoma";
import neuroendocrine from "./neuroendocrine";
import melanoma from "./melanoma";
import headAndNeck from "./head-and-neck";
import thyroid from "./thyroid";
import colorectal from "./colorectal";
import gastric from "./gastric";
import esophageal from "./esophageal";
import sclc from "./sclc";
import mesothelioma from "./mesothelioma";
import urothelial from "./urothelial";
import rcc from "./rcc";
import ovarian from "./ovarian";
import endometrial from "./endometrial";
import cervical from "./cervical";
import aml from "./aml";
import allLeukemia from "./all-leukemia";
import cll from "./cll";
import dlbcl from "./dlbcl";
import multipleMyeloma from "./multiple-myeloma";
import hodgkin from "./hodgkin-lymphoma";
import sarcoma from "./sarcoma";
import neuroblastoma from "./neuroblastoma";
const spikes: Spike[] = [nsclc, prostate, pancreatic, glioblastoma, breastHr, breastHer2, hcc, cholangiocarcinoma, neuroendocrine, melanoma, headAndNeck, thyroid, colorectal, gastric, esophageal, sclc, mesothelioma, urothelial, rcc, ovarian, endometrial, cervical, aml, allLeukemia, cll, dlbcl, multipleMyeloma, hodgkin, sarcoma, neuroblastoma];

/** Spikes may overlap (two cancers adding the same drug). Duplicates are merged: first record's scalars win, array fields are appended and de-duplicated. */
function mergeDuplicates(list: EntityInput[]): EntityInput[] {
  const byId = new Map<string, Record<string, unknown>>();
  for (const e of list) {
    const prev = byId.get(e.id);
    if (!prev) { byId.set(e.id, { ...e }); continue; }
    if (prev.kind !== e.kind) throw new Error(`Spike duplicate "${e.id}" has conflicting kinds ${String(prev.kind)} vs ${e.kind}`);
    for (const [k, v] of Object.entries(e)) {
      if (Array.isArray(v) && Array.isArray(prev[k])) prev[k] = dedupe([...(prev[k] as unknown[]), ...v]);
      else if (prev[k] === undefined) prev[k] = v;
    }
  }
  return [...byId.values()] as EntityInput[];
}

export const spikeEntities: EntityInput[] = mergeDuplicates(spikes.flatMap((s) => s.entities.map((e) => (e.kind === "trial" && TRIAL_OUTCOMES[e.id] ? { ...e, ...TRIAL_OUTCOMES[e.id] } : e))));

const ARRAY_FIELDS = ["aka", "links", "tags", "related", "cancers", "sections", "technologies", "targets", "drugs", "companies", "institutions", "pathways", "terms", "trials", "notes", "subtypes", "biomarkers", "standardOfCare", "stateOfArt", "history", "pipeline", "openProblems"] as const;

function dedupe<T>(arr: T[]): T[] {
  const seen = new Set<string>();
  return arr.filter((x) => { const k = typeof x === "string" ? x : JSON.stringify(x); if (seen.has(k)) return false; seen.add(k); return true; });
}

export function mergeSpikes(cancers: CancerInput[]): CancerInput[] {
  return cancers.map((c) => {
    const patches = spikes.filter((s) => s.cancerId === c.id).map((s) => s.patch);
    if (!patches.length) return c;
    const out: Record<string, unknown> = { ...c };
    for (const p of patches) {
      for (const [k, v] of Object.entries(p)) {
        if (v === undefined) continue;
        if ((ARRAY_FIELDS as readonly string[]).includes(k) && Array.isArray(v)) out[k] = dedupe([...((out[k] as unknown[]) ?? []), ...v]);
        else out[k] = v;
      }
    }
    if (Array.isArray(out.history)) (out.history as Array<{ year: number | string }>).sort((a, b) => Number(a.year) - Number(b.year));
    return out as CancerInput;
  });
}
