/**
 * Corpus-only joins (content roadmap wave 2): links that follow from fields the records already carry, no network.
 * Every rule is a join over existing ids or text in the corpus; nothing is looked up and nothing is invented. The
 * editor in scripts/orphan-links.ts appends ids to the one array (or adds the array), skips anything already present,
 * and never removes a link. Planned edits are sorted (record, field, id) and de-duplicated before they are applied.
 *
 * Two definitions the rules share:
 *   studied agent   A drug in a trial's `drugs` counts as an agent under study, rather than a backbone or comparator, when the
 *                   trial's title names it (name, brand, code or aka of four or more characters, whole-word), or it is the
 *                   trial's only drug, or the trial is hand-written and lists it first (curated records list the studied agent
 *                   first). For registry-ingested trials (tag ctgov-ingest) the title is the brief title plus the official title
 *                   in `setting`; for curated trials it is the acronym and aka only, because a curated `setting` lists every
 *                   regimen component (dexamethasone, cisplatin) and those backbones must not transfer.
 *   modality        A drug's technology transfers to its trials when it says what the drug is (ADC, checkpoint inhibitor,
 *                   kinase inhibitor). Technologies in CONTEXT name a setting, procedure, model or test the drug is used
 *                   within (stem-cell transplant conditioning, CAR-T lymphodepletion, intravesical use, MRD testing) and
 *                   transfer only when they are the drug's only technology; angiogenesis-models (a research model) never.
 *
 * Rules, in the order they run:
 *   1. trial -> technology     A trial with no `technologies` gains the modality technologies of its studied agents.
 *   2. idea -> trial           An idea with no `trials`, whose actor is one that trials test (research, clinic, industry,
 *                              engineering or unstated), whose maturity claims clinical evidence (early-clinical or
 *                              being-tested-at-scale) and which names at least one cancer, gains trials in one of its cancers whose
 *                              studied agent is one of its `drugs`, or carries one of its `targets` (and, when the idea names
 *                              technologies, shares one: a CAR-T idea does not link to an antibody trial), provided the idea's own text
 *                              (name, tldr, summary, hypothesis, rationale, test) names that drug or target: the relation arrays on
 *                              ideas also carry loosely related examples. Technology alone never links.
 *                              At most five an idea: phase 3 first, then trials in the idea's cancers, then trials with a
 *                              result, then the largest.
 *   3. idea -> key paper       An idea with no `keyPapers` gains the key papers of its `trials`; then, for ideas whose actor trials
 *                              test, papers that list one of the `drugs` or `targets` the idea's text names in their own `drugs` or
 *                              `targets` array and share a cancer with the idea (or name no cancer, for target biology papers);
 *                              at most three.
 *   4. company -> drug         A company with no `drugs` (and no drug naming it) gains a drug that is the studied agent of a trial it
 *                              sponsors (the trial lists the company, or its sponsor string resolves to the company through
 *                              src/data/sponsor-aliases.ts) when the drug has no maker on record, is not approved (comparators are
 *                              approved drugs) and no trial of that drug resolves to another company.
 *   5. drug -> EU approval row A drug listed as "missing-row" in the EMA register snapshot (public/regional/candidates.json) whose
 *                              regional row still lacks an EU entry gains one in src/data/regional-approvals.ts written with the
 *                              file's own helpers: V(A(...)) for "Authorised", V(C(...)) for "Authorised (conditional)", W(...) for
 *                              "Withdrawn" or "Lapsed" with a date. The snapshot must be no older than EPAR_CHECKED and the register's
 *                              product or INN must match the drug's brand, name or aka. A withdrawn application with no date is not an
 *                              authorisation and is skipped. Rows are appended before the table's closing brace.
 *   6. drug -> key paper       A drug with no `keyPapers` gains the key papers of trials in which it is the studied agent, skipping
 *                              papers whose own `drugs` array names other drugs only (a trial's key papers include the comparator's
 *                              pivotal paper); at most three, phase 3 first, newest first.
 *   7. drug -> trial           A drug with no trial in either direction is added to the `drugs` of a trial whose title, aka or official
 *                              title names it (name, brand, code or aka of five or more characters, whole-word, not a token shared with
 *                              another drug and not a class name such as "GnRH agonist").
 *   8. technology -> trial     A technology with no trial in either direction is added to the `technologies` of the trials whose
 *                              studied agents carry it as a modality.
 *   9. target.drugs            A target whose `drugs` array is empty gains every drug whose `targets` names it (the reverse array).
 *  10. target -> drug          A target with no drug in either direction is added to the `targets` of a drug whose mechanism, name or
 *                              tldr names the target's symbol, name or aka as a whole word, and only when no other target's key is that
 *                              same word. (Substring hits such as CD7 inside CD70 do not count.)
 *
 *   npx tsx scripts/link-joins.ts                 dry run: counts per rule, ten examples each, and what the editor would apply
 *   npx tsx scripts/link-joins.ts --apply         write the edits in place
 *   npx tsx scripts/link-joins.ts --examples 40   more examples per rule
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { EPAR_CHECKED, regionalApprovals } from "../src/data/regional-approvals";
import { resolveSponsor } from "../src/data/sponsor-aliases";
import type { Drug, Entity, Idea, Paper, Target, Trial } from "../src/lib/schema";
import { applyEdits } from "./orphan-links";

type Edit = { targetId: string; targetKind: string; targetName: string; field: string; add: string; why: string };
type Rule = { key: string; label: string; edits: Edit[]; notes: string[] };

const IDEA_TRIAL_CAP = 5;
const IDEA_PAPER_CAP = 3;
const DRUG_PAPER_CAP = 3;
const APPROVED = new Set(["approved", "standard-of-care"]);
/** Idea actors whose proposals a drug trial can test; payer, policy, regulator, philanthropy, data and patient ideas are not tested by trials of the drugs they mention. */
const TRIAL_ACTORS = new Set(["research", "clinic", "industry", "engineering"]);
const CLINICAL_MATURITY = new Set(["early-clinical", "being-tested-at-scale"]);
/** Technologies that name where or how a drug is used rather than what it is; they transfer to a trial only as a drug's sole technology. */
const CONTEXT = new Set(["allogeneic-hsct", "autologous-stem-cell-transplant", "car-t", "bcg-and-intravesical-therapy", "hipec", "isolated-limb-perfusion", "percutaneous-hepatic-perfusion", "imrt-igrt", "mrd-testing", "liquid-biopsy", "companion-diagnostic", "psma-pet", "pet", "pet-ct", "chemoprevention", "cardio-oncology", "supportive-care", "transfusion-support", "electrochemotherapy", "survivorship-care-plan", "apheresis-starting-material"]);
/** Research models attached to a drug record; never a trial's technology. */
const NEVER = new Set(["angiogenesis-models"]);
/** An aka that names a drug class ("GnRH agonist", "PD-1 antibody") is not a name of the drug. */
const CLASS_WORD = /\b(agonists?|antagonists?|inhibitors?|blockers?|antibod(y|ies)|analog(ue)?s?|vaccines?|therap(y|ies)|agents?|regimens?|chemotherapy|conjugates?|modulators?)\b/i;
const REGIONAL_FILE = join(process.cwd(), "src", "data", "regional-approvals.ts");
const CANDIDATES_FILE = join(process.cwd(), "public", "regional", "candidates.json");

const g = graph();
const trials = g.kind("trial");
const drugs = g.kind("drug");
const ideas = g.kind("idea");
const companies = g.kind("company");
const targets = g.kind("target");
const technologies = g.kind("technology");

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sortIds = (a: string, b: string) => a.localeCompare(b);
const phaseRank = (t: Trial) => (t.phase === "3" ? 0 : t.phase === "2/3" ? 1 : t.phase === "platform" ? 2 : 3);
const registry = (t: Trial) => t.tags.includes("ctgov-ingest");
/** Text that names a trial's studied agents: registry titles are descriptive, so the official title counts; curated records carry an acronym and a `setting` that lists every regimen component, so only the acronym and aka count. */
const titleText = (t: Trial) => (registry(t) ? `${t.name} ${t.aka.join(" ")} ${t.setting}` : `${t.name} ${t.aka.join(" ")}`);
/** Brief title, aka and official title, for rules that ask whether a trial names a drug at all. */
const trialText = (t: Trial) => `${t.name} ${t.aka.join(" ")} ${t.setting}`;
/** Whole strings only: "Filgrastim (G-CSF)" is one token, so a parenthetical never matches on its own. */
const drugTokens = (d: Drug, min = 4): string[] => [...new Set([d.name, d.brand, d.code, ...d.aka].filter((s): s is string => typeof s === "string" && s.trim().length >= min).map((s) => s.trim()))];
const mentions = (text: string, tokens: string[]): string | undefined => tokens.find((t) => new RegExp(`(^|[^A-Za-z0-9])${esc(t)}(?=$|[^A-Za-z0-9])`, "i").test(text));
const sharesCancer = (a: { cancers: string[] }, b: { cancers: string[] }) => a.cancers.some((c) => b.cancers.includes(c));
/** An idea's own words; a drug or target is central to the idea only when the text names it, not merely the relation array. */
const ideaText = (i: Idea) => `${i.name} ${i.tldr} ${i.summary} ${i.hypothesis} ${i.rationale} ${i.test}`;
const targetKeys = (t: Target) => [t.symbol ?? "", t.name, ...t.aka].filter((k) => k.length >= 3);
const namesDrug = (text: string, d: Drug) => !!mentions(text, drugTokens(d));
const namesTarget = (text: string, t: Target) => !!mentions(text, targetKeys(t));

const trialsByDrug = new Map<string, Trial[]>();
for (const t of trials) for (const id of t.drugs) trialsByDrug.set(id, [...(trialsByDrug.get(id) ?? []), t]);
/** Trials of a drug in either direction (trial.drugs or drug.trials). */
const trialsOf = (d: Drug): Trial[] => {
  const seen = new Map<string, Trial>();
  for (const t of trialsByDrug.get(d.id) ?? []) seen.set(t.id, t);
  for (const id of d.trials) { const t = g.get(id); if (t?.kind === "trial") seen.set(t.id, t); }
  return [...seen.values()];
};
const drugsByTarget = new Map<string, Drug[]>();
for (const d of drugs) for (const id of d.targets) drugsByTarget.set(id, [...(drugsByTarget.get(id) ?? []), d]);

const studiedCache = new Map<string, boolean>();
function studied(t: Trial, d: Drug): boolean {
  const k = `${t.id}|${d.id}`;
  if (!studiedCache.has(k)) studiedCache.set(k, (t.drugs.length === 1 && t.drugs[0] === d.id) || (!registry(t) && t.drugs[0] === d.id) || !!mentions(titleText(t), drugTokens(d)));
  return studiedCache.get(k)!;
}
const studiedAgents = (t: Trial): Drug[] => t.drugs.map((id) => g.get(id) as Drug).filter((d) => d && studied(t, d));
/** Modality technologies of a drug: everything but context technologies (unless sole) and research models. */
const modalities = (d: Drug): string[] => d.technologies.filter((tech) => !NEVER.has(tech) && (!CONTEXT.has(tech) || d.technologies.length === 1));

function sponsorCompany(t: Trial): string | undefined {
  if (!t.sponsor) return undefined;
  const r = resolveSponsor(t.sponsor);
  return r.matched && r.id && g.get(r.id)?.kind === "company" ? r.id : undefined;
}
const trialCompanies = (t: Trial): string[] => { const s = sponsorCompany(t); return [...new Set(s ? [...t.companies, s] : t.companies)]; };

const rules: Rule[] = [];
const rule = (key: string, label: string): Rule => { const r: Rule = { key, label, edits: [], notes: [] }; rules.push(r); return r; };
const push = (r: Rule, target: Entity, field: string, add: string, why: string) => r.edits.push({ targetId: target.id, targetKind: target.kind, targetName: target.name, field, add, why });

// 1. trial -> technology ------------------------------------------------------------------------------------------------
{
  const r = rule("trial-technology", "Trial to technology (modalities of the trial's studied agents)");
  let backbone = 0, context = 0;
  const gain = new Map<string, number>();
  for (const t of trials.filter((t) => t.technologies.length === 0 && t.drugs.length)) {
    const techs = new Map<string, string>();
    for (const id of t.drugs) {
      const d = g.get(id) as Drug;
      if (!studied(t, d)) { backbone += d.technologies.length; continue; }
      const mods = modalities(d);
      context += d.technologies.length - mods.length;
      for (const tech of mods) if (!techs.has(tech)) techs.set(tech, d.id);
    }
    for (const [tech, via] of techs) { gain.set(tech, (gain.get(tech) ?? 0) + 1); push(r, t, "technologies", tech, `studied agent ${via}`); }
  }
  r.notes.push(`held back: ${backbone} technologies of backbones or comparators (drug not named in the title), ${context} context technologies of multi-technology drugs`);
  r.notes.push(`technologies gaining most trials: ${[...gain.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => `${k} ${v}`).join(", ")}`);
}

// 2. idea -> trial -------------------------------------------------------------------------------------------------------
{
  const r = rule("idea-trial", "Idea to trial (studied agent is the idea's drug, or carries its target, in the idea's cancers)");
  let byDrug = 0, byTarget = 0, capped = 0, heldCancer = 0, heldActor = 0, heldMaturity = 0;
  let heldNoCancer = 0, heldNotCentral = 0;
  for (const i of ideas.filter((i) => i.trials.length === 0 && (i.drugs.length || i.targets.length))) {
    if (i.actor && !TRIAL_ACTORS.has(i.actor)) { heldActor++; continue; }
    if (!CLINICAL_MATURITY.has(i.maturity)) { heldMaturity++; continue; }
    if (!i.cancers.length) { heldNoCancer++; continue; }
    const central = { drugs: i.drugs.filter((id) => namesDrug(ideaText(i), g.must(id) as Drug)), targets: i.targets.filter((id) => namesTarget(ideaText(i), g.must(id) as Target)) };
    heldNotCentral += i.drugs.length + i.targets.length - central.drugs.length - central.targets.length;
    const cands = new Map<string, { t: Trial; why: string; strong: boolean }>();
    const consider = (t: Trial, why: string, strong: boolean) => {
      if (cands.has(t.id)) return;
      if (i.cancers.length && !sharesCancer(i, t)) { heldCancer++; return; }
      cands.set(t.id, { t, why, strong });
    };
    for (const did of central.drugs) { const d = g.must(did) as Drug; for (const t of trialsOf(d)) if (studied(t, d)) consider(t, `drug ${did}`, true); }
    for (const tid of central.targets) {
      // The target must sit on a studied agent (a biomarker-selection target in trial.targets is not a therapy of the target), and when the idea names a modality the agent must share one.
      for (const t of trials) if (studiedAgents(t).some((d) => d.targets.includes(tid) && (!i.technologies.length || d.technologies.some((x) => i.technologies.includes(x))))) consider(t, `target ${tid}`, false);
    }
    const ranked = [...cands.values()].sort((a, b) => phaseRank(a.t) - phaseRank(b.t) || Number(sharesCancer(i, b.t)) - Number(sharesCancer(i, a.t)) || Number(Boolean(b.t.result)) - Number(Boolean(a.t.result)) || (b.t.enrolled ?? 0) - (a.t.enrolled ?? 0) || sortIds(a.t.id, b.t.id));
    if (ranked.length > IDEA_TRIAL_CAP) capped++;
    for (const c of ranked.slice(0, IDEA_TRIAL_CAP)) { if (c.strong) byDrug++; else byTarget++; push(r, i, "trials", c.t.id, `${c.why}; phase ${c.t.phase}${sharesCancer(i, c.t) ? "; shared cancer" : ""}`); }
  }
  r.notes.push(`${byDrug} by drug, ${byTarget} by target; ${capped} ideas capped at ${IDEA_TRIAL_CAP}; held back: ${heldActor} ideas by actor, ${heldMaturity} by maturity, ${heldNoCancer} naming no cancer, ${heldNotCentral} drugs or targets the idea's text does not name, ${heldCancer} trials outside the idea's cancers`);
}

// 3. idea -> key paper ---------------------------------------------------------------------------------------------------
{
  const r = rule("idea-paper", "Idea to key paper (papers of its trials; papers about the drugs or targets its text names, in its cancers)");
  let viaTrial = 0, viaDrug = 0, viaTarget = 0, heldCancer = 0, heldNotAbout = 0, heldActor = 0, heldNotCentral = 0;
  for (const i of ideas.filter((i) => i.keyPapers.length === 0)) {
    const picked = new Map<string, string>();
    const take = (p: string, why: string) => { if (picked.size < IDEA_PAPER_CAP && !picked.has(p)) picked.set(p, why); };
    for (const tid of i.trials) for (const p of [...(g.must(tid) as Trial).keyPapers].sort(sortIds)) take(p, `trial ${tid}`);
    const about = (ids: string[], field: "drugs" | "targets", why: string) => {
      if (i.actor && !TRIAL_ACTORS.has(i.actor)) { heldActor += ids.length; return; }
      for (const id of ids) for (const p of [...(g.must(id) as Drug | Target).keyPapers].sort(sortIds)) {
        const paper = g.must(p) as Paper;
        const node = g.must(id);
        if (!(node.kind === "drug" ? namesDrug(ideaText(i), node) : node.kind === "target" && namesTarget(ideaText(i), node))) { heldNotCentral++; continue; }
        if (!paper[field].includes(id)) { heldNotAbout++; continue; }
        if (paper.cancers.length && i.cancers.length && !sharesCancer(i, paper)) { heldCancer++; continue; }
        take(p, `${why} ${id}`);
      }
    };
    about(i.drugs, "drugs", "drug");
    about(i.targets, "targets", "target");
    for (const [p, why] of picked) { if (why.startsWith("trial")) viaTrial++; else if (why.startsWith("drug")) viaDrug++; else viaTarget++; push(r, i, "keyPapers", p, why); }
  }
  r.notes.push(`${viaTrial} via trials, ${viaDrug} via drugs, ${viaTarget} via targets; cap ${IDEA_PAPER_CAP} an idea; held back: ${heldActor} drug or target lists of payer, policy, regulator, philanthropy, data or patient ideas, ${heldNotCentral} papers where the idea's text does not name the drug or target, ${heldNotAbout} papers not listing the drug or target, ${heldCancer} papers in other cancers`);
}

// 4. company -> drug -----------------------------------------------------------------------------------------------------
{
  const r = rule("company-drug", "Company to drug (studied agent of a trial it sponsors; drug has no maker on record)");
  const companiesNoDrugs = companies.filter((c) => c.drugs.length === 0 && !drugs.some((d) => d.companies.includes(c.id)));
  let heldMaker = 0, heldApproved = 0, heldUnnamed = 0, heldAmbiguous = 0;
  for (const c of companiesNoDrugs) {
    const mine = trials.filter((t) => trialCompanies(t).includes(c.id));
    const picked = new Map<string, string>();
    for (const t of mine) for (const did of t.drugs) {
      if (picked.has(did)) continue;
      const d = g.must(did) as Drug;
      if (d.companies.length) { heldMaker++; continue; }
      if (APPROVED.has(d.status ?? "")) { heldApproved++; continue; }
      if (!studied(t, d)) { heldUnnamed++; continue; }
      const others = new Set(trialsOf(d).flatMap((x) => trialCompanies(x)).filter((id) => id !== c.id));
      if (others.size) { heldAmbiguous++; continue; }
      picked.set(did, `sponsor of ${t.id}${t.companies.includes(c.id) ? "" : ` ("${t.sponsor}")`}`);
    }
    for (const [did, why] of [...picked.entries()].sort((a, b) => sortIds(a[0], b[0]))) push(r, c, "drugs", did, why);
  }
  r.notes.push(`${companiesNoDrugs.length} companies without a drug; held back: ${heldMaker} drugs with a maker on record, ${heldApproved} approved (comparators), ${heldUnnamed} not the studied agent, ${heldAmbiguous} also tested by another sponsor`);
}

// 5. drug -> EU approval row ---------------------------------------------------------------------------------------------
type Candidate = { region: string; drugId?: string; product: string; inn?: string; reason: string; register: string; date?: string; url?: string; indication?: string };
const euRows: Array<{ id: string; line: string }> = [];
{
  const r = rule("drug-eu-row", "Approved drug to EU approval row (EMA register snapshot)");
  const snap = JSON.parse(readFileSync(CANDIDATES_FILE, "utf8")) as { fetched: string; candidates: Candidate[] };
  const missing = snap.candidates.filter((c) => c.reason === "missing-row" && c.drugId);
  const alreadyRow = missing.filter((c) => regionalApprovals[c.drugId!]?.EU);
  let stale = 0, nameMismatch = 0, noAuthorisation = 0;
  if (snap.fetched < EPAR_CHECKED) { stale = missing.length; r.notes.push(`snapshot fetched ${snap.fetched} is older than EPAR_CHECKED ${EPAR_CHECKED}; nothing written`); }
  else for (const c of missing) {
    if (regionalApprovals[c.drugId!]?.EU) continue;
    const d = g.get(c.drugId!) as Drug | undefined;
    if (!d) continue;
    const names = new Set([d.name, d.brand ?? "", ...d.aka].map((s) => s.toLowerCase().replace(/\s*\(.*$/, "").trim()).filter(Boolean));
    const product = c.product.toLowerCase().replace(/\s*\(.*$/, "").trim();
    const inns = (c.inn ?? "").toLowerCase().split(";").map((s) => s.trim());
    if (!names.has(product) && !(inns.length === 1 && names.has(inns[0]))) { nameMismatch++; r.notes.push(`${c.drugId}: register product "${c.product}" (INN ${c.inn ?? "?"}) matches neither brand, name nor aka; skipped`); continue; }
    const slug = c.url?.split("/").pop();
    const year = c.date ? Number(c.date.slice(0, 4)) : undefined;
    const dmy = c.date ? new Date(c.date + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : undefined;
    const reg = c.register.toLowerCase();
    const ind = JSON.stringify([c.product, c.indication?.replace(/\s+/g, " ").slice(0, 160), dmy].filter(Boolean).join("; "));
    let entry: string | undefined;
    if (reg.startsWith("authorised") && year && slug) entry = `V(${reg.includes("conditional") ? "C" : "A"}(${year}, epar(${JSON.stringify(slug)}), ${ind}))`;
    else if ((reg === "withdrawn" || reg === "lapsed") && year && slug) entry = `W(${year}, epar(${JSON.stringify(slug)}), ${JSON.stringify(`${c.product} authorised ${dmy}; marketing authorisation ${reg} (EMA register ${snap.fetched})`)})`;
    if (!entry) { noAuthorisation++; r.notes.push(`${c.drugId}: register says "${c.register}"${c.date ? "" : " with no date"}; not an authorisation to record, skipped`); continue; }
    const key = /^[a-z][a-z0-9]*$/.test(c.drugId!) ? c.drugId! : JSON.stringify(c.drugId);
    euRows.push({ id: c.drugId!, line: `  ${key}: { EU: ${entry} },` });
    push(r, d, "regional-approvals.EU", entry, regionalApprovals[c.drugId!] ? "row exists without an EU entry (merge by hand)" : `register ${c.register} ${c.date ?? ""}`);
  }
  r.notes.push(`${missing.length} missing-row candidates in the snapshot (fetched ${snap.fetched}); ${alreadyRow.length} already have an EU entry in regional-approvals.ts; ${stale} stale, ${nameMismatch} name mismatches, ${noAuthorisation} without an authorisation to record`);
}

// 6. drug -> key paper via trials ----------------------------------------------------------------------------------------
{
  const r = rule("drug-paper", "Drug to key paper (papers of trials in which it is the studied agent)");
  let heldBackbone = 0, heldOtherDrug = 0;
  for (const d of drugs.filter((d) => d.keyPapers.length === 0)) {
    const ts = trialsOf(d).filter((t) => t.keyPapers.length);
    const named = ts.filter((t) => studied(t, d));
    heldBackbone += ts.length - named.length;
    const picked = new Map<string, string>();
    for (const t of named.sort((a, b) => phaseRank(a) - phaseRank(b) || (b.yearReported ?? 0) - (a.yearReported ?? 0) || sortIds(a.id, b.id))) for (const p of [...t.keyPapers].sort(sortIds)) {
      // A trial's key papers include context papers (the comparator's pivotal trial); when a paper lists drugs it must list this one.
      const paper = g.must(p) as Paper;
      if (paper.drugs.length && !paper.drugs.includes(d.id)) { heldOtherDrug++; continue; }
      if (picked.size < DRUG_PAPER_CAP && !picked.has(p)) picked.set(p, `trial ${t.id}`);
    }
    for (const [p, why] of picked) push(r, d, "keyPapers", p, why);
  }
  r.notes.push(`${heldBackbone} trial-drug pairs held back (backbone or comparator), ${heldOtherDrug} papers listing other drugs only; cap ${DRUG_PAPER_CAP} a drug`);
}

// 7. drug -> trial (trial title names the drug) --------------------------------------------------------------------------
{
  const r = rule("drug-trial", "Drug to trial (trial title or official title names the drug)");
  const tokenOwners = new Map<string, Set<string>>();
  for (const d of drugs) for (const t of drugTokens(d, 5)) tokenOwners.set(t.toLowerCase(), (tokenOwners.get(t.toLowerCase()) ?? new Set()).add(d.id));
  let heldShared = 0;
  for (const d of drugs.filter((d) => trialsOf(d).length === 0)) {
    const all = drugTokens(d, 5).filter((t) => t === d.name || !CLASS_WORD.test(t));
    const tokens = all.filter((t) => (tokenOwners.get(t.toLowerCase())?.size ?? 0) === 1);
    heldShared += all.length - tokens.length;
    if (!tokens.length) continue;
    for (const t of trials) { const hit = mentions(trialText(t), tokens); if (hit) push(r, t, "drugs", d.id, `title names "${hit}"`); }
  }
  r.notes.push(`${heldShared} name tokens shared by two or more drugs ignored`);
}

// 8. technology -> trial (through its drugs) -----------------------------------------------------------------------------
{
  const r = rule("technology-trial", "Technology to trial (trials whose studied agents carry it as a modality)");
  const techNoTrials = technologies.filter((t) => t.trials.length === 0 && !trials.some((tr) => tr.technologies.includes(t.id)));
  let gained = 0;
  for (const tech of techNoTrials) {
    const before = r.edits.length;
    for (const d of drugs.filter((d) => modalities(d).includes(tech.id))) for (const t of trialsOf(d)) if (studied(t, d) && !t.technologies.includes(tech.id)) push(r, t, "technologies", tech.id, `studied agent ${d.id}`);
    if (r.edits.length > before) gained++;
  }
  r.notes.push(`${techNoTrials.length} technologies without a trial in either direction; ${gained} gain one`);
}

// 9. target.drugs mirroring drug.targets ---------------------------------------------------------------------------------
{
  const r = rule("target-drugs-array", "Target drugs array mirroring drug.targets");
  for (const t of targets.filter((t) => t.drugs.length === 0)) for (const d of (drugsByTarget.get(t.id) ?? []).sort((a, b) => sortIds(a.id, b.id))) push(r, t, "drugs", d.id, "drug.targets names it");
}

// 10. target -> drug named in a mechanism --------------------------------------------------------------------------------
{
  const r = rule("target-drug-mechanism", "Target to drug (mechanism names the target as a whole word, unambiguously)");
  const targetsNoDrugs = targets.filter((t) => t.drugs.length === 0 && !(drugsByTarget.get(t.id) ?? []).length);
  const keysOf = (t: Target) => [t.symbol ?? "", t.name, ...t.aka].filter((k) => k.length >= 3);
  let ambiguous = 0;
  for (const t of targetsNoDrugs) {
    const keys = keysOf(t);
    for (const d of drugs) {
      const text = `${d.mechanism} ${d.name} ${d.tldr}`;
      const hit = mentions(text, keys);
      if (!hit) continue;
      const rivals = targets.filter((o) => o.id !== t.id && keysOf(o).some((k) => k.toLowerCase() === hit.toLowerCase()));
      if (rivals.length) { ambiguous++; continue; }
      push(r, d, "targets", t.id, `mechanism names "${hit}"`);
    }
  }
  r.notes.push(`${targetsNoDrugs.length} targets without a drug in either direction; ${ambiguous} mentions whose word is another target's key skipped`);
}

// ---------------------------------------------------------------- apply
const dedupe = (edits: Edit[]): Edit[] => { const seen = new Set<string>(); return edits.filter((e) => { const k = `${e.targetId}|${e.field}|${e.add}`; if (seen.has(k)) return false; seen.add(k); return true; }); };
const write = process.argv.includes("--apply");
const exArg = process.argv.indexOf("--examples");
const EXAMPLES = exArg >= 0 ? Number(process.argv[exArg + 1]) : 10;

let all: Edit[] = [];
for (const r of rules) {
  r.edits = dedupe(r.edits).sort((a, b) => sortIds(a.targetId, b.targetId) || sortIds(a.field, b.field) || sortIds(a.add, b.add));
  console.log(`\n## ${r.label}: ${r.edits.length} links, ${new Set(r.edits.map((e) => e.targetId)).size} records`);
  for (const n of r.notes) console.log(`   ${n}`);
  for (const e of r.edits.slice(0, EXAMPLES)) console.log(`   ${e.targetId}.${e.field} += ${e.add}  (${e.why})`);
  if (r.key !== "drug-eu-row") all = all.concat(r.edits);
}
all = dedupe(all);
const { changed, skipped } = applyEdits(all, write);
console.log(`\n${all.length} record edits planned, ${changed.length} ${write ? "applied" : "applicable"}, ${skipped.length} skipped by the editor`);
for (const s of skipped.slice(0, 40)) console.log("SKIP  " + s);
if (skipped.length > 40) console.log(`... ${skipped.length - 40} more`);
console.log("by rule: " + rules.map((r) => `${r.key} ${r.edits.length}`).join(", "));

// EU rows: appended before the closing brace of the regionalApprovals table, only for drugs with no row at all.
const insertable = euRows.filter((row) => !regionalApprovals[row.id]);
if (euRows.length > insertable.length) console.log(`${euRows.length - insertable.length} EU entries belong to rows that already exist; merge those by hand (the editor does not rewrite regional rows).`);
if (insertable.length) {
  const src = readFileSync(REGIONAL_FILE, "utf8");
  const at = src.indexOf("export const regionalApprovals");
  const close = at < 0 ? -1 : src.indexOf("\n};\n", at);
  if (close < 0) console.log("regional-approvals.ts: table end not found; EU rows not written");
  else {
    const block = `\n  // ================= EU entries from the EMA register snapshot (scripts/link-joins.ts) =================\n${insertable.map((r) => r.line).join("\n")}`;
    if (write) writeFileSync(REGIONAL_FILE, src.slice(0, close) + block + src.slice(close));
    console.log(`${insertable.length} EU rows ${write ? "written to" : "would be written to"} src/data/regional-approvals.ts`);
  }
}
