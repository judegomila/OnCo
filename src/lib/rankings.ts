import { graph, type Graph } from "./graph";
import { phaseLabel, routeFor, type Kind } from "./kinds";
import type { Entity } from "./schema";
import { enrolmentLabel } from "./enrolment";
import { logoSrc } from "./logos";
import { portraitSrc } from "./portraits";
import { modalityGroup } from "./modality-group";
import { isSupportive, treatments } from "./supportive-care";

/**
 * League tables computed from corpus counts and dates only. Every ranking names the field it counts, states its
 * basis in one sentence, and discloses how completely that field is filled on the records being counted. Nothing is
 * weighted, imputed or averaged: a row's value is a count, a ratio of two counts, or a difference of two years.
 *
 * A ranking is only registered when the counted field is filled on at least MIN_COVERAGE of the records it draws
 * from (src/lib/rankings.test.ts enforces this), so a table never orders things by how much we happen to have typed in.
 */
export const MIN_COVERAGE = 0.6;
export const TOP = 50;

export type RankingRow = {
  rank: number;
  id: string;
  name: string;
  kind: Kind;
  route: string;
  /** The number the row is ordered by. */
  value: number;
  /** The value as shown ("1,581 randomised", "12", "9 years"). */
  metric: string;
  /** Second column: a short context string computed from the same record. */
  context: string;
  /** Logo or portrait for the row when one exists; otherwise the kind glyph is shown. */
  image?: string;
  round?: boolean;
};

export type Coverage = { filled: number; of: number; what: string };

export type Ranking = {
  slug: string;
  title: string;
  /** Kind of the ranked entity, for the glyph. */
  kind: Kind;
  /** One plain sentence saying what is counted and how rows are ordered. Ends with a full stop. */
  basis: string;
  metricLabel: string;
  contextLabel: string;
  /** "How this is counted": the fields read, the population, and what is excluded. */
  how: string;
  coverage: Coverage;
  rows: RankingRow[];
  /** Rows before the top-50 cut. */
  total: number;
};

type Def = Omit<Ranking, "rows" | "total" | "coverage"> & { compute: (g: Graph) => { rows: Omit<RankingRow, "rank">[]; coverage: Coverage } };

const byValueThenName = (a: { value: number; name: string }, b: { value: number; name: string }) => b.value - a.value || a.name.localeCompare(b.name);
const n = (v: number) => v.toLocaleString("en-GB");
const plural = (v: number, one: string, many = `${one}s`) => `${n(v)} ${v === 1 ? one : many}`;
const cov = (filled: number, of: number, what: string): Coverage => ({ filled, of, what });

function incoming<K extends Kind>(g: Graph, id: string, kind: K): Extract<Entity, { kind: K }>[] {
  return (g.incoming(id).get(kind) ?? []) as Extract<Entity, { kind: K }>[];
}

/** Trials linked to a record from either side: the trial names it, or the record names the trial. */
function trialsOf(g: Graph, e: Entity): Set<string> {
  const s = new Set<string>(incoming(g, e.id, "trial").map((t) => t.id));
  for (const t of e.trials) if (g.get(t)?.kind === "trial") s.add(t);
  return s;
}

function base(e: Entity, value: number, metric: string, context: string, extra: Partial<RankingRow> = {}): Omit<RankingRow, "rank"> {
  return { id: e.id, name: e.name, kind: e.kind, route: routeFor(e), value, metric, context, ...extra };
}

const companyImage = (e: Entity) => (e.kind === "company" || e.kind === "institution" ? logoSrc(e.id, e.website) : undefined);

/** Approved treatments and tests with at least one approval record; supportive care medicines are not products in these tables. */
const approvedDrugs = (g: Graph) => treatments(g).filter((d) => d.status === "approved" && d.approvals.length > 0);
const firstApproval = (d: Extract<Entity, { kind: "drug" }>) => d.approvals.reduce((a, b) => (b.year < a.year ? b : a));

const DEFS: Def[] = [
  {
    slug: "cancers-by-trials", title: "Cancers by number of trials", kind: "cancer",
    basis: "Cancers ordered by how many trial records in the corpus name them.",
    metricLabel: "Trials", contextLabel: "Approved products",
    how: "Counts trial records whose cancers field lists the cancer. Trials that name several cancers count once for each. The context column counts products with status approved that list the cancer.",
    compute: (g) => {
      const trials = g.kind("trial");
      const rows = g.kind("cancer").map((c) => {
        const t = incoming(g, c.id, "trial").length;
        const approved = incoming(g, c.id, "drug").filter((d) => !isSupportive(d) && d.status === "approved").length;
        return base(c, t, n(t), plural(approved, "approved product"));
      }).filter((r) => r.value > 0);
      return { rows, coverage: cov(trials.filter((t) => t.cancers.length).length, trials.length, "trials name at least one cancer") };
    },
  },
  {
    slug: "cancers-by-approved-drugs", title: "Cancers by number of approved products", kind: "cancer",
    basis: "Cancers ordered by how many products with status approved list them.",
    metricLabel: "Approved products", contextLabel: "Trials",
    how: "Counts drug records with status approved and at least one approval record whose cancers field lists the cancer. A product approved in several cancers counts once for each. The context column counts trial records naming the cancer.",
    compute: (g) => {
      const approved = approvedDrugs(g);
      const rows = g.kind("cancer").map((c) => {
        const a = incoming(g, c.id, "drug").filter((d) => !isSupportive(d) && d.status === "approved" && d.approvals.length).length;
        return base(c, a, n(a), plural(incoming(g, c.id, "trial").length, "trial"));
      }).filter((r) => r.value > 0);
      return { rows, coverage: cov(approved.filter((d) => d.cancers.length).length, approved.length, "approved products name at least one cancer") };
    },
  },
  {
    slug: "cancers-least-served", title: "Cancers with most trials per approved product", kind: "cancer",
    basis: "Cancers with at least ten trials, excluding umbrella records that other cancers name as their parent, ordered by trials divided by approved products, with cancers that have no approved product first.",
    metricLabel: "Trials per approved product", contextLabel: "Trials and approved products",
    how: "For each cancer with ten or more trial records, divides the trial count by the number of products with status approved that list the cancer. Cancers with no approved product cannot be divided and are placed first, ordered by their trial count. The ten-trial floor keeps a cancer with one trial and no product from topping the table, and umbrella records (any cancer that another cancer record names as its parent) are left out because their approvals sit on the subtypes.",
    compute: (g) => {
      const trials = g.kind("trial");
      const parents = new Set(g.kind("cancer").map((c) => c.parent).filter(Boolean));
      const rows = g.kind("cancer")
        .filter((c) => !parents.has(c.id))
        .map((c) => ({ c, t: incoming(g, c.id, "trial").length, a: incoming(g, c.id, "drug").filter((d) => !isSupportive(d) && d.status === "approved" && d.approvals.length).length }))
        .filter(({ t }) => t >= 10)
        .map(({ c, t, a }) => base(c, a === 0 ? 1e6 + t : t / a, a === 0 ? "no approved product" : (t / a).toLocaleString("en-GB", { maximumFractionDigits: 1 }), `${plural(t, "trial")}, ${plural(a, "approved product")}`));
      return { rows, coverage: cov(trials.filter((t) => t.cancers.length).length, trials.length, "trials name at least one cancer") };
    },
  },
  {
    slug: "targets-by-drugs", title: "Targets by number of products", kind: "target",
    basis: "Targets ordered by how many product records in the corpus aim at them, any phase.",
    metricLabel: "Products", contextLabel: "Approved",
    how: "Counts drug records whose targets field lists the target. Coverage is measured on products of a targeted modality (antibodies, conjugates, small molecules, cell therapies and the like); cytotoxics, hormonal agents, tests, devices and imaging agents have no molecular target field to fill and are not counted against it. The context column counts those products with status approved.",
    compute: (g) => {
      const untargeted = new Set(["Cytotoxic", "Test", "Device", "Imaging agent", "Hormonal"]);
      const targeted = treatments(g).filter((d) => !untargeted.has(modalityGroup(d.modality)));
      const rows = g.kind("target").map((t) => {
        const drugs = incoming(g, t.id, "drug").filter((d) => !isSupportive(d));
        return base(t, drugs.length, n(drugs.length), `${n(drugs.filter((d) => d.status === "approved").length)} approved`);
      }).filter((r) => r.value > 0);
      return { rows, coverage: cov(targeted.filter((d) => d.targets.length).length, targeted.length, "products of a targeted modality name at least one target") };
    },
  },
  {
    slug: "targets-by-cancers", title: "Targets by number of cancers", kind: "target",
    basis: "Targets ordered by how many cancers their record lists as places the target is found or acted on.",
    metricLabel: "Cancers", contextLabel: "Prevalence rows",
    how: "Counts entries in each target's cancers field. The context column counts the target's sourced prevalence rows (a percentage of a cancer carrying the alteration).",
    compute: (g) => {
      const targets = g.kind("target");
      const rows = targets.map((t) => base(t, t.cancers.length, n(t.cancers.length), plural(t.prevalence.length, "prevalence row"))).filter((r) => r.value > 0);
      return { rows, coverage: cov(targets.filter((t) => t.cancers.length).length, targets.length, "targets list at least one cancer") };
    },
  },
  {
    slug: "drugs-by-approvals", title: "Products by number of approval records", kind: "drug",
    basis: "Approved products ordered by how many approval records they carry, one per regulator and indication.",
    metricLabel: "Approval records", contextLabel: "First approval",
    how: "Counts entries in the approvals field of drug records with status approved. The same indication approved by two regulators counts twice; a label extension counts as its own record. The context column gives the earliest approval's regulator and year.",
    compute: (g) => {
      const approved = approvedDrugs(g);
      const rows = approved.map((d) => { const f = firstApproval(d); return base(d, d.approvals.length, n(d.approvals.length), `${f.region} ${f.year}`); });
      return { rows, coverage: cov(approved.length, treatments(g).filter((d) => d.status === "approved").length, "approved products carry at least one approval record") };
    },
  },
  {
    slug: "drugs-by-trials", title: "Products by number of trials", kind: "drug",
    basis: "Products ordered by how many trial records are linked to them from either side.",
    metricLabel: "Trials", contextLabel: "Status and modality",
    how: "Counts distinct trial records that either name the product in their drugs field or are named in the product's trials field. The context column gives the product's status and modality group.",
    compute: (g) => {
      const trials = g.kind("trial");
      const rows = treatments(g).map((d) => { const t = trialsOf(g, d).size; return base(d, t, n(t), `${d.status ?? "status not set"} · ${modalityGroup(d.modality)}`); }).filter((r) => r.value > 0);
      return { rows, coverage: cov(trials.filter((t) => t.drugs.length).length, trials.length, "trials name at least one product") };
    },
  },
  {
    slug: "drugs-longest-in-use", title: "Products by years since first approval", kind: "drug",
    basis: "Approved products ordered by the number of years between their earliest approval record and the current year.",
    metricLabel: "Years in use", contextLabel: "First approval",
    how: "Takes the smallest year across a product's approval records and subtracts it from the year of the build. Withdrawals are not subtracted: a product withdrawn in one region may still be in use in another. The context column names that first regulator and year.",
    compute: (g) => {
      const year = new Date().getFullYear();
      const approved = approvedDrugs(g);
      const rows = approved.map((d) => { const f = firstApproval(d); const y = year - f.year; return base(d, y, plural(y, "year"), `${f.region} ${f.year}`); });
      return { rows, coverage: cov(approved.length, treatments(g).filter((d) => d.status === "approved").length, "approved products carry a dated approval record") };
    },
  },
  {
    slug: "companies-by-trials", title: "Companies by trials sponsored", kind: "company",
    basis: "Companies ordered by how many trial records in the corpus link to them.",
    metricLabel: "Trials", contextLabel: "Products",
    how: "Counts distinct trial records that name the company in their companies field or that the company's own trials field names. Sponsor names typed as free text on trials are not matched; only linked records count. The context column counts product records naming the company.",
    compute: (g) => {
      const trials = g.kind("trial");
      const rows = g.kind("company").map((c) => { const t = trialsOf(g, c).size; return base(c, t, n(t), plural(incoming(g, c.id, "drug").filter((d) => !isSupportive(d)).length, "product"), { image: companyImage(c) }); }).filter((r) => r.value > 0);
      return { rows, coverage: cov(trials.filter((t) => t.companies.length).length, trials.length, "trials link to at least one company record") };
    },
  },
  {
    slug: "companies-by-approvals", title: "Companies by approval records", kind: "company",
    basis: "Companies ordered by the number of approval records across the products that name them.",
    metricLabel: "Approval records", contextLabel: "Approved products",
    how: "Sums the approvals field over drug records with status approved whose companies field lists the company. A product with two companies (a partnership or an acquisition) counts in full for both. The context column counts those approved products.",
    compute: (g) => {
      const approved = approvedDrugs(g);
      const rows = g.kind("company").map((c) => {
        const ds = incoming(g, c.id, "drug").filter((d) => !isSupportive(d) && d.status === "approved" && d.approvals.length);
        const a = ds.reduce((s, d) => s + d.approvals.length, 0);
        return base(c, a, n(a), plural(ds.length, "approved product"), { image: companyImage(c) });
      }).filter((r) => r.value > 0);
      return { rows, coverage: cov(approved.filter((d) => d.companies.length).length, approved.length, "approved products name at least one company") };
    },
  },
  {
    slug: "people-by-papers", title: "People by listed papers", kind: "person",
    basis: "People ordered by how many papers their record lists.",
    metricLabel: "Papers listed", contextLabel: "Role",
    how: "Counts entries in each person's papers field. These are selected publications gathered from OpenAlex and Europe PMC by institution-filtered author search, not a full bibliography, so the table reflects what has been gathered as much as what has been written. The context column is the role line on the record.",
    compute: (g) => {
      const people = g.kind("person");
      const rows = people.map((p) => base(p, p.papers.length, n(p.papers.length), p.role, { image: portraitSrc(p.id), round: true })).filter((r) => r.value > 0);
      return { rows, coverage: cov(people.filter((p) => p.papers.length).length, people.length, "people list at least one paper") };
    },
  },
  {
    slug: "biomarkers-by-cancers", title: "Biomarker terms by number of cancers", kind: "term",
    basis: "Glossary terms in the Biomarkers category ordered by how many cancers are linked to them from either side.",
    metricLabel: "Cancers", contextLabel: "Products linked",
    how: "Takes glossary terms whose category is Biomarkers and counts distinct cancer records that either appear in the term's cancers field or list the term in their own terms field. The context column counts product records that list the term.",
    compute: (g) => {
      const terms = g.kind("term").filter((t) => t.category === "Biomarkers");
      const rows = terms.map((t) => {
        const s = new Set<string>(t.cancers);
        for (const c of incoming(g, t.id, "cancer")) s.add(c.id);
        return base(t, s.size, n(s.size), plural(incoming(g, t.id, "drug").length, "product"));
      }).filter((r) => r.value > 0);
      return { rows, coverage: cov(rows.length, terms.length, "biomarker terms are linked to at least one cancer") };
    },
  },
  {
    slug: "trials-by-enrolment", title: "Trials by enrolment", kind: "trial",
    basis: "Trials ordered by the number of people their record says were enrolled, randomised, analysed or treated.",
    metricLabel: "Enrolment", contextLabel: "Phase and cancer",
    how: "Reads the enrolled field and the enrolledBasis field that says what the number counts (the registry figure by default, or the randomised, analysed, treated or registered population from the primary paper). Numbers from different bases are placed on one scale, so a registry total and a randomised count sit side by side. The context column gives the phase and the first cancer the trial names.",
    compute: (g) => {
      const trials = g.kind("trial");
      const rows = trials.filter((t) => t.enrolled).map((t) => {
        const c = t.cancers[0] ? g.get(t.cancers[0]) : undefined;
        return base(t, t.enrolled!, enrolmentLabel(t.enrolled!, t.enrolledBasis), `${phaseLabel(t.phase)}${c ? ` · ${c.name}` : ""}`);
      });
      return { rows, coverage: cov(rows.length, trials.length, "trials carry an enrolment figure") };
    },
  },
  {
    slug: "roadmaps-by-eras", title: "Roadmaps by number of eras", kind: "roadmap",
    basis: "Roadmaps ordered by how many distinct eras their steps span.",
    metricLabel: "Eras", contextLabel: "Steps and status",
    how: "Counts distinct values of the era field across each roadmap's steps. The context column counts the steps and how many of them are marked current or emerging.",
    compute: (g) => {
      const roadmaps = g.kind("roadmap");
      const rows = roadmaps.map((r) => {
        const eras = new Set(r.steps.map((s) => s.era)).size;
        const live = r.steps.filter((s) => s.status === "current" || s.status === "emerging").length;
        return base(r, eras, n(eras), `${plural(r.steps.length, "step")}, ${live} current or emerging`);
      });
      return { rows, coverage: cov(roadmaps.filter((r) => r.steps.length).length, roadmaps.length, "roadmaps carry dated steps") };
    },
  },
];

/** Tables that count drug records as products; their "how" note states the supportive care exclusion. */
export const PRODUCT_RANKING_SLUGS = new Set(["cancers-by-trials", "cancers-by-approved-drugs", "cancers-least-served", "targets-by-drugs", "drugs-by-approvals", "drugs-by-trials", "drugs-longest-in-use", "companies-by-trials", "companies-by-approvals"]);
export const SUPPORTIVE_NOTE = "Supportive care medicines (antiemetics, growth factors, epoetins, bone-modifying agents, antidotes, opioids for cancer pain, immunoglobulin; drug records flagged supportive) are not products or treatments here and are left out.";

export const RANKING_SLUGS = DEFS.map((d) => d.slug);

let cached: Ranking[] | undefined;

/** Every ranking, computed once per process from the graph, top 50 rows each. */
export function rankings(): Ranking[] {
  if (cached) return cached;
  const g = graph();
  cached = DEFS.map((d) => {
    const { rows, coverage } = d.compute(g);
    const sorted = [...rows].sort(byValueThenName);
    const top = sorted.slice(0, TOP).map((r, i) => ({ ...r, rank: i + 1 }));
    const { compute: _compute, ...rest } = d;
    void _compute;
    return { ...rest, how: PRODUCT_RANKING_SLUGS.has(d.slug) ? `${d.how} ${SUPPORTIVE_NOTE}` : d.how, coverage, rows: top, total: sorted.length };
  });
  return cached;
}

export function ranking(slug: string): Ranking | undefined {
  return rankings().find((r) => r.slug === slug);
}

/** Share of records carrying the counted field, 0 to 1. */
export function coverageShare(c: Coverage): number {
  return c.of ? c.filled / c.of : 0;
}

/** One sentence for the "How this is counted" note: "3,516 of 3,527 trials name at least one cancer (100%)." */
export function coverageSentence(c: Coverage): string {
  return `${n(c.filled)} of ${n(c.of)} ${c.what} (${Math.round(100 * coverageShare(c))}%).`;
}

/** The JSON companion at /rankings/<slug>/data.json. */
export function rankingJson(r: Ranking) {
  return {
    slug: r.slug, title: r.title, basis: r.basis, metric: r.metricLabel, context: r.contextLabel, how: r.how,
    coverage: { ...r.coverage, share: Math.round(1000 * coverageShare(r.coverage)) / 1000 }, total: r.total, top: r.rows.length,
    rows: r.rows.map(({ rank, id, name, kind, route, value, metric, context }) => ({ rank, id, name, kind, route, value, metric, context })),
  };
}
