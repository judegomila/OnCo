import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { graph } from "@/lib/graph";
import { KIND_META, KINDS, routeFor, type Entity, type Kind } from "@/lib/schema";
import { Container, PageHeader } from "@/components/ui";
import { rankInstitutions } from "@/lib/ranking";
import { InstitutionsExplorer } from "@/components/InstitutionsExplorer";
import { EntityBrowser, type BrowserRow, type ColDef, type FacetDef } from "@/components/EntityBrowser";
import structureIndex from "../../../public/structures/index.json";
import { FrontSchematic } from "@/components/FrontSchematic";
import { BottleneckMap } from "@/components/BottleneckMap";
import { CancerIcon } from "@/components/CancerIcon";
import { FrontIcon } from "@/components/FrontIcon";
import { TermSchematic } from "@/components/TermSchematic";
import { logoSrc } from "@/lib/logos";

const ROUTE_TO_KIND: Record<string, Kind> = Object.fromEntries(KINDS.map((k) => [KIND_META[k].route, k])) as Record<string, Kind>;

export function generateStaticParams() {
  return KINDS.map((k) => ({ kind: KIND_META[k].route }));
}

export async function generateMetadata({ params }: { params: Promise<{ kind: string }> }): Promise<Metadata> {
  const { kind } = await params;
  const k = ROUTE_TO_KIND[kind];
  if (!k) return {};
  return { title: KIND_META[k].plural[0].toUpperCase() + KIND_META[k].plural.slice(1), description: KIND_META[k].blurb };
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const short = (s: string) => s.replace(/ \(.*\)$/, "");
const logoFor = (id: string, website?: string) => logoSrc(id, website);

/** Every kind gets the same templated table; this function decides facets, columns, and row values per kind. */
function buildBrowser(k: Kind): { rows: BrowserRow[]; facets: FacetDef[]; columns: ColDef[]; hideStatus?: boolean; hideTldr?: boolean; defaultSort?: { key: string; dir: 1 | -1 } } {
  const g = graph();
  const names = (ids: string[]) => ids.map((id) => short(g.must(id).name));
  const links = (ids: string[]) => ids.map((id) => { const x = g.must(id); return { label: short(x.name), href: routeFor(x), tip: x.tldr }; });
  const base = (e: Entity): BrowserRow => ({ id: e.id, name: e.name, tldr: e.tldr, route: routeFor(e), status: e.status, facets: {}, cols: {} });
  const frontsOf = (e: Entity) => [...new Set([...e.sections, ...e.technologies.flatMap((t) => g.must(t).sections)])].map((id) => g.must(id).name);
  const inc = (id: string, kind: Kind) => g.incoming(id).get(kind) ?? [];

  switch (k) {
    case "cancer": return {
      hideStatus: true,
      rows: g.kind("cancer").map((c) => { const drugs = (g.forCancer(c.id).get("drug") ?? []).length; return { ...base(c), facets: { group: [cap(c.group)] }, cols: { group: cap(c.group), soc: c.standardOfCare.length, pipeline: c.pipeline.length, history: c.history.length, drugs }, sortKeys: { soc: c.standardOfCare.length, pipeline: c.pipeline.length, history: c.history.length, drugs } }; }),
      facets: [{ key: "group", label: "Group", searchable: false }],
      columns: [{ key: "group", label: "Group" }, { key: "drugs", label: "Products", sortable: true, numeric: true }, { key: "soc", label: "Care settings", sortable: true, numeric: true, hide: "hidden md:table-cell" }, { key: "pipeline", label: "Pipeline", sortable: true, numeric: true, hide: "hidden md:table-cell" }, { key: "history", label: "History events", sortable: true, numeric: true, hide: "hidden lg:table-cell" }],
      defaultSort: { key: "drugs", dir: -1 },
    };
    case "section": return {
      hideStatus: true,
      rows: g.kind("section").sort((a, b) => a.order - b.order).map((s) => ({ ...base(s), facets: {}, cols: { techs: inc(s.id, "technology").length, order: s.order }, sortKeys: { techs: inc(s.id, "technology").length, order: s.order } })),
      facets: [],
      columns: [{ key: "techs", label: "Technologies", sortable: true, numeric: true }],
      defaultSort: { key: "order", dir: 1 },
    };
    case "technology": return {
      rows: g.kind("technology").map((t) => ({ ...base(t), facets: { front: t.sections.map((id) => g.must(id).name), cancers: names(t.cancers), targets: names(t.targets), tags: t.tags }, cols: { front: links(t.sections), since: t.since, generation: t.generation, drugs: inc(t.id, "drug").length }, sortKeys: { since: typeof t.since === "number" ? t.since : 0, drugs: inc(t.id, "drug").length } })),
      facets: [{ key: "front", label: "Front", searchable: false, width: "w-52" }, { key: "cancers", label: "Cancer", width: "w-52" }, { key: "targets", label: "Target" }, { key: "tags", label: "Tag", searchable: false, width: "w-40" }],
      columns: [{ key: "front", label: "Front", hide: "hidden md:table-cell" }, { key: "generation", label: "Generation", hide: "hidden lg:table-cell" }, { key: "since", label: "Since", sortable: true, numeric: true, hide: "hidden sm:table-cell" }, { key: "drugs", label: "Products", sortable: true, numeric: true }],
    };
    case "target": return {
      hideStatus: true,
      rows: g.kind("target").map((t) => ({ ...base(t), sub: t.symbol, facets: { class: [cap(t.targetClass.replace("-", " "))], cancers: names(t.cancers), tags: t.tags }, cols: { class: cap(t.targetClass.replace("-", " ")), drugs: inc(t.id, "drug").length, techs: inc(t.id, "technology").length, cancers: links(t.cancers) }, sortKeys: { drugs: inc(t.id, "drug").length, techs: inc(t.id, "technology").length } })),
      facets: [{ key: "class", label: "Class", searchable: false }, { key: "cancers", label: "Cancer", width: "w-52" }, { key: "tags", label: "Tag", searchable: false, width: "w-40" }],
      columns: [{ key: "class", label: "Class", hide: "hidden sm:table-cell" }, { key: "drugs", label: "Products", sortable: true, numeric: true }, { key: "techs", label: "Technologies", sortable: true, numeric: true, hide: "hidden md:table-cell" }, { key: "cancers", label: "Cancers", hide: "hidden lg:table-cell" }],
      defaultSort: { key: "drugs", dir: -1 },
    };
    case "drug": {
      const modalityClass = (m: string) => /bispecific adc/i.test(m) ? "Bispecific ADC" : /^adc/i.test(m) ? "ADC" : /engager|immtac/i.test(m) ? "T-cell engager" : /bispecific/i.test(m) ? "Bispecific antibody" : /monoclonal/i.test(m) ? "Monoclonal antibody" : /car-t|til|tcr-t/i.test(m) ? "Cell therapy" : /radioligand|alpha|theranostic/i.test(m) ? "Radiopharmaceutical" : /pet imaging|imaging agent/i.test(m) ? "Imaging agent" : /vaccine/i.test(m) ? "Vaccine" : /oncolytic/i.test(m) ? "Oncolytic virus" : /device/i.test(m) ? "Device" : /test|assay|profiling|detection|diagnostic|classifier/i.test(m) ? "Diagnostic test" : /cytotoxic|regimen/i.test(m) ? "Chemotherapy" : /protac|degrader/i.test(m) ? "Degrader" : /small-molecule|serd|inhibitor|antagonist/i.test(m) ? "Small molecule" : m;
      const payloadClass = (p?: string) => !p ? undefined : /top|sn-38|dxd|exatecan|belotecan|camptothecin|t030|ed-04/i.test(p) ? "Topoisomerase-I" : /mmae|mmaf|dm1|dm4|maytans|auristatin|tubulin/i.test(p) ? "Tubulin" : /pbd|calicheamicin|dna/i.test(p) ? "DNA-damaging" : "Other";
      return {
        rows: g.kind("drug").map((d) => {
          const first = d.approvals.length ? Math.min(...d.approvals.map((a) => a.year)) : undefined, last = d.approvals.length ? Math.max(...d.approvals.map((a) => a.year)) : undefined;
          const pc = payloadClass(d.payload);
          return { ...base(d), sub: [d.brand, d.code].filter(Boolean).join(" · ") + (d.id in (structureIndex as Record<string, unknown>) ? "  ⟳ 3D" : ""), facets: { cancers: names(d.cancers), modality: [modalityClass(d.modality)], targets: names(d.targets), companies: names(d.companies), front: frontsOf(d), payload: pc ? [pc] : [] }, cols: { modality: modalityClass(d.modality), targets: links(d.targets), cancers: links(d.cancers), companies: links(d.companies), approved: first ? (last && last !== first ? `${first}–${last}` : String(first)) : undefined }, sortKeys: { approved: last ?? 0 } };
        }),
        facets: [{ key: "cancers", label: "Cancer", width: "w-56" }, { key: "modality", label: "Modality", searchable: false }, { key: "targets", label: "Target", width: "w-44" }, { key: "companies", label: "Company" }, { key: "front", label: "Front", searchable: false, width: "w-44" }, { key: "payload", label: "ADC payload", searchable: false, width: "w-44" }],
        columns: [{ key: "modality", label: "Modality", sortable: true, hide: "hidden sm:table-cell" }, { key: "targets", label: "Targets", hide: "hidden md:table-cell" }, { key: "cancers", label: "Cancers", hide: "hidden lg:table-cell" }, { key: "companies", label: "Companies", hide: "hidden lg:table-cell" }, { key: "approved", label: "Approved", sortable: true, numeric: true }],
      };
    }
    case "company": {
      const label: Record<string, string> = { pharma: "Large pharma", biotech: "Biotech", diagnostics: "Diagnostics", imaging: "Imaging equipment", devices: "Devices & RT hardware", "ai-software": "AI & software", radiopharma: "Radiopharmaceuticals", "cell-therapy": "Cell therapy", "cro-services": "Services", nonprofit: "Nonprofit" };
      return {
        hideStatus: true,
        rows: g.kind("company").map((c) => { const products = new Set([...c.drugs, ...inc(c.id, "drug").map((d) => d.id)]).size; const techs = new Set([...c.technologies, ...inc(c.id, "technology").map((t) => t.id)]).size; return { ...base(c), logo: logoFor(c.id, c.website), sub: `${c.hq}, ${c.country}${c.ticker ? ` · ${c.ticker}` : ""}`, facets: { type: [label[c.companyType] ?? c.companyType], country: [c.country], front: c.sections.map((id) => g.must(id).name), cancers: names(c.cancers) }, cols: { type: label[c.companyType] ?? c.companyType, hq: c.hq, products, techs }, sortKeys: { products, techs } }; }),
        facets: [{ key: "type", label: "Type", searchable: false, width: "w-52" }, { key: "country", label: "Country", searchable: false, width: "w-40" }, { key: "front", label: "Front", searchable: false, width: "w-44" }, { key: "cancers", label: "Cancer", width: "w-52" }],
        columns: [{ key: "type", label: "Type", sortable: true, hide: "hidden sm:table-cell" }, { key: "hq", label: "HQ", hide: "hidden md:table-cell" }, { key: "products", label: "Products", sortable: true, numeric: true }, { key: "techs", label: "Technologies", sortable: true, numeric: true, hide: "hidden lg:table-cell" }],
        defaultSort: { key: "products", dir: -1 },
      };
    }
    case "institution": {
      const ranked = rankInstitutions();
      return {
        hideStatus: true, hideTldr: true,
        rows: ranked.map((r) => { const i = r.institution; return { ...base(i), logo: logoFor(i.id, i.website), sub: [i.university, `${i.city}, ${i.country}`].filter(Boolean).join(" · "), facets: { type: [cap(i.institutionType.replace("-", " "))], country: [i.country], nci: i.nci ? [cap(i.nci)] : [], cancers: names(i.cancers) }, cols: { rank: r.rank, type: cap(i.institutionType.replace("-", " ")), newsweek: i.newsweekOncology2026, nci: i.nci ? cap(i.nci) : undefined, links: r.links, score: r.score }, sortKeys: { rank: r.rank, newsweek: i.newsweekOncology2026 ?? 999, links: r.links, score: r.score } }; }),
        facets: [{ key: "type", label: "Type", searchable: false, width: "w-48" }, { key: "country", label: "Country", searchable: false, width: "w-40" }, { key: "nci", label: "NCI", searchable: false, width: "w-40" }, { key: "cancers", label: "Cancer", width: "w-52" }],
        columns: [{ key: "rank", label: "#", sortable: true, numeric: true }, { key: "type", label: "Type", hide: "hidden md:table-cell" }, { key: "newsweek", label: "Newsweek 2026", sortable: true, numeric: true, hide: "hidden sm:table-cell" }, { key: "nci", label: "NCI", hide: "hidden lg:table-cell" }, { key: "links", label: "Linked objects", sortable: true, numeric: true, hide: "hidden sm:table-cell" }, { key: "score", label: "Score", sortable: true, numeric: true }],
        defaultSort: { key: "score", dir: -1 },
      };
    }
    case "pathway": return {
      hideStatus: true,
      rows: g.kind("pathway").map((p) => ({ ...base(p), facets: { cancers: names(p.cancers) }, cols: { nodes: p.nodes.length, targets: links(p.targets), drugs: p.drugs.length }, sortKeys: { nodes: p.nodes.length, drugs: p.drugs.length } })),
      facets: [{ key: "cancers", label: "Cancer", width: "w-52" }],
      columns: [{ key: "targets", label: "Druggable nodes", hide: "hidden md:table-cell" }, { key: "drugs", label: "Products", sortable: true, numeric: true }, { key: "nodes", label: "Nodes", sortable: true, numeric: true, hide: "hidden sm:table-cell" }],
    };
    case "term": return {
      hideStatus: true,
      rows: g.kind("term").map((t) => ({ ...base(t), facets: { category: [t.category] }, cols: { category: t.category, links: g.degree(t.id) }, sortKeys: { links: g.degree(t.id) } })),
      facets: [{ key: "category", label: "Category", searchable: false, width: "w-48" }],
      columns: [{ key: "category", label: "Category", sortable: true }, { key: "links", label: "Links", sortable: true, numeric: true, hide: "hidden sm:table-cell" }],
      defaultSort: { key: "category", dir: 1 },
    };
    case "trial": return {
      rows: g.kind("trial").map((t) => ({ ...base(t), sub: t.nct, facets: { phase: [`Phase ${t.phase}`], cancers: names(t.cancers), sponsor: t.sponsor ? [t.sponsor] : [], drugs: names(t.drugs) }, cols: { phase: `Phase ${t.phase}`, cancers: links(t.cancers), drugs: links(t.drugs), sponsor: t.sponsor, year: t.yearReported }, sortKeys: { year: t.yearReported ?? 0 } })),
      facets: [{ key: "cancers", label: "Cancer", width: "w-56" }, { key: "phase", label: "Phase", searchable: false, width: "w-40" }, { key: "drugs", label: "Product", width: "w-48" }, { key: "sponsor", label: "Sponsor", width: "w-48" }],
      columns: [{ key: "phase", label: "Phase", sortable: true, hide: "hidden sm:table-cell" }, { key: "drugs", label: "Products", hide: "hidden md:table-cell" }, { key: "cancers", label: "Cancers", hide: "hidden lg:table-cell" }, { key: "sponsor", label: "Sponsor", hide: "hidden lg:table-cell" }, { key: "year", label: "Reported", sortable: true, numeric: true }],
      defaultSort: { key: "year", dir: -1 },
    };
    case "pairing": return {
      hideStatus: true,
      rows: g.kind("pairing").map((p) => ({ ...base(p), facets: { type: [cap(p.pairingType.replace("-", " → "))], cancers: names(p.cancers) }, cols: { type: cap(p.pairingType.replace("-", " → ")), a: short(g.must(p.a).name), b: short(g.must(p.b).name), cancers: links(p.cancers) } })),
      facets: [{ key: "type", label: "Type", searchable: false, width: "w-52" }, { key: "cancers", label: "Cancer", width: "w-52" }],
      columns: [{ key: "type", label: "Type", sortable: true, chip: true }, { key: "a", label: "A", hide: "hidden md:table-cell" }, { key: "b", label: "B", hide: "hidden md:table-cell" }, { key: "cancers", label: "Cancers", hide: "hidden lg:table-cell" }],
      defaultSort: { key: "type", dir: 1 },
    };
    case "roadmap": return {
      hideStatus: true,
      rows: g.kind("roadmap").map((r) => ({ ...base(r), facets: { cancers: names(r.cancers) }, cols: { steps: r.steps.length, current: r.steps.filter((s) => s.status === "current").length, emerging: r.steps.filter((s) => s.status === "emerging").length }, sortKeys: { steps: r.steps.length } })),
      facets: [{ key: "cancers", label: "Cancer", width: "w-52" }],
      columns: [{ key: "steps", label: "Steps", sortable: true, numeric: true }, { key: "current", label: "Current", numeric: true, hide: "hidden sm:table-cell" }, { key: "emerging", label: "Emerging", numeric: true, hide: "hidden sm:table-cell" }],
    };
    case "idea": return {
      hideStatus: true,
      rows: g.kind("idea").map((i) => ({ ...base(i), facets: { maturity: [cap(i.maturity.replace(/-/g, " "))], bottleneck: names(i.bottlenecks), actor: i.actor ? [cap(i.actor)] : [], cost: i.cost ? [cap(i.cost)] : [], cancers: names(i.cancers), technologies: names(i.technologies) }, cols: { maturity: cap(i.maturity.replace(/-/g, " ")), bottlenecks: links(i.bottlenecks), actor: i.actor ? cap(i.actor) : undefined, cost: i.cost ? cap(i.cost) : undefined, cancers: links(i.cancers), technologies: links(i.technologies) } })),
      facets: [{ key: "bottleneck", label: "Bottleneck", width: "w-60" }, { key: "maturity", label: "Maturity", searchable: false, width: "w-52" }, { key: "actor", label: "Who acts", searchable: false, width: "w-44" }, { key: "cost", label: "Cost to try", searchable: false, width: "w-40" }, { key: "cancers", label: "Cancer", width: "w-52" }, { key: "technologies", label: "Technology", width: "w-52" }],
      columns: [{ key: "maturity", label: "Maturity", sortable: true, chip: true }, { key: "bottlenecks", label: "Bottleneck", hide: "hidden md:table-cell" }, { key: "actor", label: "Who acts", sortable: true, hide: "hidden lg:table-cell" }, { key: "cost", label: "Cost", sortable: true, hide: "hidden xl:table-cell" }, { key: "technologies", label: "Technologies", hide: "hidden lg:table-cell" }, { key: "cancers", label: "Cancers", hide: "hidden xl:table-cell" }],
      defaultSort: { key: "maturity", dir: 1 },
    };
    case "paper": return {
      hideStatus: true,
      rows: g.kind("paper").map((p) => ({ ...base(p), sub: `${p.authors} · ${p.journal} ${p.year}`, facets: { type: [cap(p.paperType.replace(/-/g, " "))], year: [String(p.year)], journal: [p.journal], cancers: names(p.cancers), changed: [p.changedPractice ? "Changed practice" : "Did not (yet)"] }, cols: { type: cap(p.paperType.replace(/-/g, " ")), year: p.year, journal: p.journal, cancers: links(p.cancers), drugs: links(p.drugs.slice(0, 3)) }, sortKeys: { year: p.year } })),
      facets: [{ key: "type", label: "Type", searchable: false, width: "w-44" }, { key: "cancers", label: "Cancer", width: "w-52" }, { key: "journal", label: "Journal", width: "w-52" }, { key: "year", label: "Year", searchable: false, width: "w-32" }, { key: "changed", label: "Practice", searchable: false, width: "w-44" }],
      columns: [{ key: "type", label: "Type", sortable: true, chip: true }, { key: "journal", label: "Journal", sortable: true, hide: "hidden md:table-cell" }, { key: "year", label: "Year", sortable: true, numeric: true }, { key: "cancers", label: "Cancers", hide: "hidden lg:table-cell" }, { key: "drugs", label: "Products", hide: "hidden xl:table-cell" }],
      defaultSort: { key: "year", dir: -1 },
    };
    case "bottleneck": return {
      hideStatus: true,
      rows: g.kind("bottleneck").map((b) => { const ideas = inc(b.id, "idea"); return { ...base(b), facets: { stage: [cap(b.stage.replace(/-/g, " "))], severity: [cap(b.severity)], cancers: names(b.cancers) }, cols: { stage: cap(b.stage.replace(/-/g, " ")), severity: cap(b.severity), ideas: ideas.length, technologies: links(b.technologies.slice(0, 4)) }, sortKeys: { ideas: ideas.length, severity: b.severity === "critical" ? 0 : b.severity === "major" ? 1 : 2 } }; }),
      facets: [{ key: "stage", label: "Stage", searchable: false, width: "w-56" }, { key: "severity", label: "Severity", searchable: false, width: "w-40" }, { key: "cancers", label: "Cancer", width: "w-52" }],
      columns: [{ key: "stage", label: "Stage", sortable: true, chip: true }, { key: "severity", label: "Severity", sortable: true, chip: true }, { key: "ideas", label: "Ideas to fix it", sortable: true, numeric: true }, { key: "technologies", label: "Technologies that relieve it", hide: "hidden lg:table-cell" }],
      defaultSort: { key: "severity", dir: 1 },
    };
    case "person": return {
      hideStatus: true,
      rows: g.kind("person").map((p) => { const inst = p.institutionId ? g.get(p.institutionId) : undefined; return { ...base(p), sub: `${p.role}${inst ? ` · ${inst.name}` : ""}`, facets: { specialism: p.specialisms, institution: inst ? [inst.name] : [], cancers: names(p.cancers), country: inst && inst.kind === "institution" ? [inst.country] : [] }, cols: { institution: inst ? [{ label: inst.name, href: routeFor(inst) }] : undefined, specialisms: p.specialisms.join(", "), papers: p.papers.length, trials: p.trials.length }, sortKeys: { papers: p.papers.length, trials: p.trials.length } }; }),
      facets: [{ key: "specialism", label: "Specialism", width: "w-56" }, { key: "institution", label: "Institution", width: "w-56" }, { key: "cancers", label: "Cancer", width: "w-52" }, { key: "country", label: "Country", searchable: false, width: "w-40" }],
      columns: [{ key: "institution", label: "Institution", hide: "hidden md:table-cell" }, { key: "specialisms", label: "Specialisms", hide: "hidden lg:table-cell" }, { key: "papers", label: "Papers listed", sortable: true, numeric: true }, { key: "trials", label: "Trials", sortable: true, numeric: true, hide: "hidden sm:table-cell" }],
      defaultSort: { key: "name", dir: 1 },
    };
    case "collection": return {
      hideStatus: true,
      rows: g.kind("collection").map((c) => ({ ...base(c), logo: logoFor(c.id, c.url), sub: c.maintainer, facets: { license: c.license ? [c.license.split(/[;(]/)[0].trim()] : [] }, cols: { holds: c.holds, license: c.license } })),
      facets: [{ key: "license", label: "Licence", searchable: false, width: "w-56" }],
      columns: [{ key: "holds", label: "Holds", hide: "hidden md:table-cell" }, { key: "license", label: "Licence", hide: "hidden lg:table-cell" }],
    };
  }
}

export default async function KindIndex({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  const k = ROUTE_TO_KIND[kind];
  if (!k) notFound();
  const meta = KIND_META[k];
  const title = k === "section" ? "Fronts of the war on cancer" : k === "term" ? "Glossary" : k === "bottleneck" ? "Bottlenecks of the war on cancer" : cap(meta.plural);
  const { rows, facets, columns, hideStatus, hideTldr, defaultSort } = buildBrowser(k);

  const right = k === "cancer" ? <Link href="/for-me/" className="rounded-lg bg-accent text-white px-4 py-2 text-sm font-medium">Pick mine →</Link>
    : k === "drug" ? <Link href="/explore/?kind=drug" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">Rank by cancer type →</Link>
    : k === "institution" ? <Link href="/universities/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">University output →</Link>
    : k === "bottleneck" ? <Link href="/ideas/" className="rounded-lg bg-accent text-white px-4 py-2 text-sm font-medium">All ideas →</Link>
    : undefined;

  return (
    <>
      <PageHeader kicker={<span className="kicker">{meta.plural}</span>} title={title} lede={meta.blurb} right={right} />
      <Container className="pb-16">
        {k === "institution" ? (
          <InstitutionsExplorer points={institutionPoints()} rows={rows} facets={facets} columns={columns} noun={meta.plural} hideStatus={hideStatus} hideTldr={hideTldr} defaultSort={defaultSort} />
        ) : (
          <>
            {k === "section" && <FrontsGrid />}
            {k === "term" && <TermCategoryGrid />}
            {k === "bottleneck" && <BottlenecksPipeline />}
            {k === "cancer" && <CancersGrid />}
            <EntityBrowser rows={rows} facets={facets} columns={columns} noun={meta.plural} hideStatus={hideStatus} hideTldr={hideTldr} defaultSort={defaultSort} />
          </>
        )}
        {k === "institution" && (
          <p className="text-xs text-muted mt-3 max-w-3xl">Score = Newsweek points (60 − Newsweek/Statista 2026 Oncology rank, 0 if unranked) + NCI designation points (Comprehensive 15, Clinical or Basic 8) + 2 × distinct OnCo objects linked to the institution. The last term measures presence in this evidence base and grows with the corpus. A starting point for argument, not a verdict.</p>
        )}
      </Container>
    </>
  );
}

function TermCategoryGrid() {
  const g = graph();
  const counts = new Map<string, number>();
  for (const t of g.kind("term")) counts.set(t.category, (counts.get(t.category) ?? 0) + 1);
  const cats = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  return (
    <div className="mb-8">
      <p className="text-sm text-muted mb-3">Each kind of term, as a short animation. Every term page opens with the animation for its category.</p>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {cats.map(([cat, n]) => (
          <div key={cat} className="card overflow-hidden">
            <TermSchematic category={cat} compact height="h-28" />
            <div className="px-3 py-2 text-sm flex items-baseline justify-between"><span className="font-medium">{cat}</span><span className="text-xs text-muted tabular-nums">{n}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Every cancer as an icon tile, grouped, so a newcomer can find theirs by organ rather than by name. */
function CancersGrid() {
  const g = graph();
  const items = g.kind("cancer");
  const groups = [...new Set(items.map((c) => c.group))];
  return (
    <div className="mb-10 space-y-5">
      {groups.map((grp) => (
        <div key={grp}>
          <div className="kicker mb-2 capitalize">{grp}</div>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {items.filter((c) => c.group === grp).sort((a, b) => a.name.localeCompare(b.name)).map((c) => (
              <Link key={c.id} href={routeFor(c)} title={c.tldr} className="card p-3 flex flex-col items-center text-center gap-2 hover:shadow-md transition">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent"><CancerIcon cancerId={c.id} className="h-8 w-8" /></span>
                <span className="text-xs font-medium leading-snug">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BottlenecksPipeline() {
  const g = graph();
  const items = g.kind("bottleneck").map((b) => ({ id: b.id, name: b.name, tldr: b.tldr, route: routeFor(b), stage: b.stage, severity: b.severity, ideas: (g.incoming(b.id).get("idea") ?? []).length }));
  return <BottleneckMap items={items} />;
}

function FrontsGrid() {
  const g = graph();
  const items = g.kind("section").sort((a, b) => a.order - b.order);
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-8">
      {items.map((s) => (
        <Link key={s.id} href={routeFor(s)} className="card overflow-hidden hover:shadow-md transition">
          <FrontSchematic sectionId={s.id} compact height="h-28" />
          <div className="px-3 py-2 text-sm font-medium leading-snug flex items-center gap-1.5"><FrontIcon id={s.id} className="h-4 w-4 text-accent shrink-0" />{s.name}</div>
        </Link>
      ))}
    </div>
  );
}

/** Map dots for the institutions explorer; `type` uses the same label as the table's "type" facet so the legend can drive both. */
function institutionPoints() {
  return rankInstitutions().map((r) => {
    const i = r.institution;
    return { id: i.id, name: i.name, city: i.city, country: i.country, type: cap(i.institutionType.replace("-", " ")), lat: i.lat, lon: i.lng, route: routeFor(i), logo: logoFor(i.id, i.website), links: r.links };
  });
}
