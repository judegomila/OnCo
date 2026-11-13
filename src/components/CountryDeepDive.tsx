import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor, type Entity, type Kind } from "@/lib/schema";
import { Container, EntityCard, GroupKicker, PageHeader, Section } from "@/components/ui";
import { CountryTrialsSection } from "@/components/TrialsHere";
import { GLOBOCAN, sitesForCountry } from "@/lib/globocan";
import { regionalApprovals, REGION_META, type Region } from "@/data/regional-approvals";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";
import type { CountryCard, CountryDive, DiveTable } from "@/data/country-dive";

/**
 * Renders a wave 2 country deep dive from its data file (src/data/country-<iso2>.ts). The prose and the hand-built
 * tables are the country file's; this component adds the GLOBOCAN table, the approvals count and the entity lists
 * resolved from the graph, so every page in the wave reads the same way.
 */
const fmt = (n: number | null | undefined) => (n == null ? "n/a" : n.toLocaleString("en-GB"));
const fmt1 = (n: number | null | undefined) => (n == null ? "n/a" : n.toFixed(1));
const num = (n: number | null, d = 0) => (n === null ? { text: "n/a", v: -1, muted: true } : { text: d ? n.toFixed(d) : n.toLocaleString("en-GB"), v: n });

const SITE_COLUMNS: StaticColumn[] = [
  { key: "site", label: "Site" },
  { key: "cases", label: "New cases", sortable: true, numeric: true, className: "text-right" },
  { key: "deaths", label: "Deaths", sortable: true, numeric: true, className: "text-right" },
  { key: "incAsr", label: "Incidence ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "mortAsr", label: "Mortality ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "pages", label: "OnCo cancer page" },
];

function Cards({ cards }: { cards: CountryCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((s) => (
        <article key={s.id} id={s.id} className="card p-5 flex flex-col">
          <h3 className="font-semibold leading-snug text-balance">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed">{s.plain}</p>
          <details className="mt-3 group">
            <summary className="cursor-pointer text-sm text-muted hover:text-foreground select-none">More detail</summary>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">{s.detail}</p>
          </details>
          <ul className="mt-auto pt-2 flex flex-wrap gap-x-3 text-xs">
            {s.links.map((l) => <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-block py-1 underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{l.label}</a></li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}

function HandTable({ t }: { t: DiveTable }) {
  const columns: StaticColumn[] = t.columns.map((c) => (c.numeric ? { key: c.key, label: c.label, sortable: true, numeric: true, className: "text-right" } : { key: c.key, label: c.label }));
  const rows: StaticRow[] = t.rows.map((r, i) => {
    const row: StaticRow = { id: `${t.id}-${i}` };
    for (const c of t.columns) {
      const v = r[c.key];
      row[c.key] = c.numeric ? (typeof v === "number" ? { text: v.toLocaleString("en-GB"), v } : { text: v == null ? "n/a" : String(v), v: -1, muted: v == null }) : (v ?? "");
    }
    return row;
  });
  return (
    <div id={t.id} className="mt-6 card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h3 className="font-semibold">{t.title}</h3>
        <span className="text-xs text-muted">{t.caption}</span>
      </div>
      <StaticTable rows={rows} columns={columns} noun="rows" />
      <p className="mt-3 text-xs text-muted">
        {t.note} Source{t.sources.length > 1 ? "s" : ""}:{" "}
        {t.sources.map((s, i) => <span key={s.url}>{i > 0 ? "; " : ""}<a href={s.url} className="underline" rel="noopener">{s.label}</a></span>)}.
      </p>
    </div>
  );
}

function Grid({ items }: { items: Entity[] }) {
  if (!items.length) return <p className="text-sm text-muted">Nothing recorded yet.</p>;
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map((e) => <EntityCard key={e.id} e={e} compact />)}</div>;
}

export function CountryDeepDive({ dive }: { dive: CountryDive }) {
  const g = graph();
  const pick = (ids: string[], kind: Kind): Entity[] => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e && e.kind === kind);
  const institutions = pick(dive.institutions, "institution");
  const companies = pick(dive.companies, "company");
  const drugs = pick(dive.drugs, "drug");
  const trials = pick(dive.trials, "trial");
  const papers = pick(dive.papers, "paper");
  const people = pick(dive.people, "person");
  const allInstitutions = g.kind("institution").filter((i) => i.country === dive.iso2).length;
  const allCompanies = g.kind("company").filter((c) => c.country === dive.iso2).length;

  // Approvals: a national row where the matrix has one (Australia), otherwise the EU row for EU members, and the US
  // row for Puerto Rico, where FDA approval is what puts a medicine on the market.
  const EU = new Set(["ES", "SE", "FR", "IT", "NL", "DE", "PL", "RO", "BE", "PT", "GR", "CZ", "HU", "AT", "DK", "FI", "IE", "BG", "SK", "HR", "LT", "SI", "LV"]);
  const US_TERRITORY = new Set(["PR"]);
  const region: Region | undefined = dive.iso2 in REGION_META ? (dive.iso2 as Region) : EU.has(dive.iso2) ? "EU" : US_TERRITORY.has(dive.iso2) ? "US" : undefined;
  const approved = region ? g.kind("drug").filter((d) => { const r = regionalApprovals[d.id]?.[region]; return r && (r.status === "approved" || r.status === "conditional"); }).length : 0;

  const profile = sitesForCountry(GLOBOCAN, dive.iso3);
  const all = profile ? GLOBOCAN.countries[dive.iso3]?.data?.["39"] : undefined;
  const topSites = profile ? profile.sites.filter((s) => s.cases !== null && s.label !== "Non-melanoma skin cancer").slice(0, 12) : [];
  const siteRows: StaticRow[] = topSites.map((s) => ({
    id: String(s.code),
    site: s.label,
    cases: num(s.cases), deaths: num(s.deaths), incAsr: num(s.incAsr, 1), mortAsr: num(s.mortAsr, 1),
    pages: s.oncoIds.map((id) => g.get(id)).filter((e): e is Entity => !!e).map((e) => ({ text: e.name, href: routeFor(e), className: "underline" })),
  }));

  const nav: Array<[string, string]> = [
    ...dive.sections.map((s) => [`#${s.id}`, s.nav] as [string, string]),
    ["#institutions", "Institutions"], ["#companies", "Companies"], ["#recruiting", "Recruiting here"], ["#trials", "Trials and papers"], ["#people", "People"], ["#gaps", "Gaps"],
  ];

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title={`${dive.flag} Cancer in ${dive.name}`}
        lede={`${dive.lede} This page gathers ${institutions.length} institutions, ${companies.length} companies, ${trials.length} trials, ${papers.length} key papers and ${people.length} people from the corpus around them. Facts checked ${dive.asOf}; every card links its sources.`}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {nav.map(([h, l]) => <a key={h} href={h} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        {dive.sections.map((s) => (
          <Section key={s.id} id={s.id} title={s.title} aside={s.aside ? <a href={s.aside.url} className="text-sm underline" rel="noopener">{s.aside.label} →</a> : undefined}>
            <Cards cards={s.cards} />
            {(s.tables ?? []).map((t) => <HandTable key={t.id} t={t} />)}
            {s.id === "profile" && profile && all && (
              <div className="mt-6 card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h3 className="font-semibold">Leading cancers in {dive.name}, GLOBOCAN {GLOBOCAN.year}</h3>
                  <span className="text-xs text-muted">All cancers (C00-97): {fmt(all[0])} new cases, {fmt(all[2])} deaths; age-standardised incidence {fmt1(all[1])} and mortality {fmt1(all[3])} per 100,000; cumulative risk to 74: {fmt1(all[4])}%.</span>
                </div>
                <StaticTable rows={siteRows} columns={SITE_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
                <p className="mt-3 text-xs text-muted">Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>. ASR = age-standardised rate per 100,000 (World standard). {dive.globocanNote} Compare countries on the <Link href="/cases/" className="underline">cases by country</Link> page.</p>
              </div>
            )}
            {s.id === "regulator" && region && (
              <p className="mt-3 text-sm text-muted">{approved} products in the corpus carry a sourced {REGION_META[region].label} authorisation row; see the <Link href="/regulatory/regions/" className="underline">approvals by region</Link> matrix. Absent means not yet researched, not &ldquo;not approved&rdquo;.</p>
            )}
            {s.id === "regulator" && drugs.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Products discovered or developed in {dive.name}</h3>
                <Grid items={drugs} />
              </div>
            )}
          </Section>
        ))}

        <Section id="institutions" title="Research institutions, cancer centres and public bodies" aside={<span className="text-sm text-muted">{allInstitutions} institutions in {dive.name} in the corpus · <Link href="/institutions/" className="underline">map and ranking</Link></span>}>
          <Grid items={institutions} />
        </Section>

        <Section id="companies" title="Companies and trial groups" aside={<span className="text-sm text-muted">{allCompanies} companies in {dive.name} in the corpus · <Link href="/companies/" className="underline">all companies</Link></span>}>
          <Grid items={companies} />
        </Section>

        <CountryTrialsSection iso2={dive.iso2} />

        <Section id="trials" title="Notable trials and key papers">
          <h3 className="font-semibold mb-2">Trials</h3>
          <Grid items={trials} />
          <h3 className="font-semibold mt-6 mb-2">Key papers</h3>
          <Grid items={papers} />
        </Section>

        <Section id="people" title="People">
          <Grid items={people} />
        </Section>

        <Section id="gaps" title="What we could not source">
          <Cards cards={dive.gaps} />
        </Section>

        <section className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this page is built</h2>
            <p>{dive.how} The entity lists are pulled live from the corpus by id, so a record added anywhere in OnCo appears here once listed in <code>src/data/country-{dive.iso2.toLowerCase()}.ts</code>.</p>
          </div>
          <div className="card p-5 space-y-2 border-amber-300/60 dark:border-amber-700/50">
            <h2 className="font-semibold text-base">Verify before relying on it</h2>
            <p>{dive.verify} Check{" "}{dive.verifyLinks.map((l, i) => <span key={l.url}>{i > 0 ? (i === dive.verifyLinks.length - 1 ? " and " : ", ") : ""}<a href={l.url} className="underline" rel="noopener">{l.label}</a></span>)}{" "}before acting on anything here, and ask the treating team. Corrections are welcome through the <Link href="/suggest/" className="underline">suggest an edit</Link> form.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
