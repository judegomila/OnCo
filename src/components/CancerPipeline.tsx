import { graph } from "@/lib/graph";
import { phaseLabel, routeFor, facetLabel } from "@/lib/kinds";
import { type Cancer, type Drug, type Entity, type Technology, type Trial } from "@/lib/schema";
import { DrugGrid } from "./DrugCard";
import { ChipList } from "./ui";
import Link from "next/link";
import { IntentLink } from "./IntentLink";

/**
 * Everything in development for one cancer, drawn from the whole corpus rather than a hand-picked list:
 * drugs by trial phase, technologies being tested, trials under way, targets, pairings and ideas. Approved
 * treatments belong to the standard-of-care section, so they are left out here. The cancer's curated
 * `pipeline` ids are folded in so nothing a curator flagged is lost.
 */
const DRUG_ORDER: Array<[string, string]> = [["phase-3", "Phase 3"], ["phase-2", "Phase 2"], ["phase-1", "Phase 1"], ["preclinical", "Preclinical"], ["emerging", "Emerging"], ["concept", "Concept"]];
const TECH_OUT = new Set(["approved", "established", "standard-of-care", "historic", "withdrawn"]);
const TRIAL_LIVE = new Set(["recruiting", "active", "planned"]);
/** Trials listed before the "and N more" link to the trials table filtered to this cancer (page-weight cap; see docs/GALLBLADDER-QA.md). */
const TRIAL_CAP = 48;

export function CancerPipeline({ c }: { c: Cancer }) {
  const g = graph();
  const trialsHref = `/trials/?cancers=${encodeURIComponent(facetLabel(c.name))}`;
  const forMe = g.forCancer(c.id);
  const curated = c.pipeline.map((id) => g.get(id)).filter((x): x is Entity => !!x);
  const seen = new Set<string>();
  const take = <T extends Entity>(list: Entity[], kind: T["kind"]): T[] => list.filter((e): e is T => e.kind === kind && !seen.has(e.id) && (seen.add(e.id), true));
  const drugPool = [...curated, ...(forMe.get("drug") ?? [])];
  const drugs = take<Drug>(drugPool, "drug").filter((d) => !d.status || !TECH_OUT.has(d.status));
  const byStatus = DRUG_ORDER.map(([key, label]) => ({ key, label, list: drugs.filter((d) => (d.status ?? "emerging") === key) })).filter((x) => x.list.length);
  const unstaged = drugs.filter((d) => !DRUG_ORDER.some(([k]) => (d.status ?? "emerging") === k));
  const techs = take<Technology>([...curated, ...(forMe.get("technology") ?? [])], "technology").filter((t) => !TECH_OUT.has(t.status ?? ""));
  const trials = take<Trial>([...curated, ...(g.incoming(c.id).get("trial") ?? [])], "trial");
  const live = trials.filter((t) => TRIAL_LIVE.has(t.status ?? "")); const reported = trials.filter((t) => !TRIAL_LIVE.has(t.status ?? ""));
  const targets = take<Entity>(curated, "target"); const pairings = take<Entity>([...curated, ...(forMe.get("pairing") ?? [])], "pairing"); const ideas = take<Entity>([...curated, ...(forMe.get("idea") ?? [])], "idea");
  const total = drugs.length + techs.length + trials.length + targets.length + pairings.length + ideas.length;
  return (
    <div className="space-y-8">
      <p className="text-sm text-muted max-w-3xl">What is in development for {c.name}, drawn from the whole corpus: {total} items. Drugs are grouped by the most advanced trial phase they have reached anywhere; approved treatments sit under standard of care. Technologies are the methods being tested for this cancer, trials are the studies recorded here, and ideas are proposals not yet in a trial.</p>
      {byStatus.map((s) => <section key={s.key}><h3 className="font-semibold mb-2">Drugs in {s.label.toLowerCase()} <span className="text-muted font-normal">· {s.list.length}</span></h3><DrugGrid drugs={s.list} compact /></section>)}
      {unstaged.length > 0 && <section><h3 className="font-semibold mb-2">Drugs at an unstated stage <span className="text-muted font-normal">· {unstaged.length}</span></h3><DrugGrid drugs={unstaged} compact /></section>}
      {techs.length > 0 && <section><h3 className="font-semibold mb-2">Technologies being tested <span className="text-muted font-normal">· {techs.length}</span></h3><ChipList items={techs} /></section>}
      {live.length > 0 && <section><h3 className="font-semibold mb-2">Trials under way <span className="text-muted font-normal">· {live.length}</span></h3><ul className="space-y-1 text-sm">{live.slice(0, TRIAL_CAP).map((t) => <li key={t.id}><IntentLink className="underline" href={routeFor(t)}>{t.name}</IntentLink> <span className="text-muted">· {phaseLabel(t.phase).toLowerCase()}{t.sponsor ? ` · ${t.sponsor}` : ""}</span></li>)}</ul>{live.length > TRIAL_CAP && <p className="mt-2 text-sm"><Link href={trialsHref} className="underline" data-more>and {live.length - TRIAL_CAP} more in the trials table →</Link></p>}</section>}
      {reported.length > 0 && <section><h3 className="font-semibold mb-2">Trials reported <span className="text-muted font-normal">· {reported.length}</span></h3><ul className="space-y-1 text-sm">{reported.slice(0, TRIAL_CAP).map((t) => <li key={t.id}><IntentLink className="underline" href={routeFor(t)}>{t.name}</IntentLink> <span className="text-muted">· {phaseLabel(t.phase).toLowerCase()}{t.yearReported ? ` · ${t.yearReported}` : ""}{t.status ? ` · ${t.status}` : ""}</span></li>)}</ul>{reported.length > TRIAL_CAP && <p className="mt-2 text-sm"><Link href={trialsHref} className="underline" data-more>and {reported.length - TRIAL_CAP} more in the trials table →</Link></p>}</section>}
      {targets.length > 0 && <section><h3 className="font-semibold mb-2">Targets under investigation <span className="text-muted font-normal">· {targets.length}</span></h3><ChipList items={targets} /></section>}
      {pairings.length > 0 && <section><h3 className="font-semibold mb-2">Combinations being explored <span className="text-muted font-normal">· {pairings.length}</span></h3><ChipList items={pairings} /></section>}
      {ideas.length > 0 && <section><h3 className="font-semibold mb-2">Ideas not yet in a trial <span className="text-muted font-normal">· {ideas.length}</span></h3><ChipList items={ideas} /></section>}
      {total === 0 && <p className="text-sm text-muted">Nothing recorded in development for this cancer yet.</p>}
    </div>
  );
}
