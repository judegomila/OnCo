import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Entity, type Kind } from "@/lib/schema";
import { Container, EntityCard, GroupKicker, PageHeader, Section } from "@/components/ui";
import { GLOBOCAN, sitesForCountry } from "@/lib/globocan";
import { countryExtras } from "@/data/country-extras";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";
import {
  RU_ASOF, RU_COMPANIES, RU_DRUGS, RU_GAPS, RU_INSTITUTIONS, RU_INSTITUTIONS_CARDS, RU_MAKING, RU_PAPERS, RU_PAYING,
  RU_PEOPLE, RU_PROFILE, RU_REGISTRY, RU_REGULATOR, RU_TRIALS, RU_TRIAL_SPONSORS, RU_TRIAL_STARTS, type CountryCard,
} from "@/data/country-ru";

export const metadata: Metadata = pageMeta({
  title: "Cancer in Russia",
  description: "Russia deep dive read from Russian sources: the Herzen institute's national cancer statistics and what they do and do not count, compulsory medical insurance and the vital and essential medicines list, registration under federal law 61-FZ and the Eurasian Economic Union route, the collapse in new international trials since 2022, Biocad and domestic manufacture, and the Blokhin, Herzen, Petrov, Rogachev and Tomsk institutes.",
  path: "/countries/ru/",
});

const fmt = (n: number | null) => (n === null ? "n/a" : n.toLocaleString("en-GB"));
const fmt1 = (n: number | null) => (n === null ? "n/a" : n.toFixed(1));

const SITE_COLUMNS: StaticColumn[] = [
  { key: "site", label: "Site" },
  { key: "cases", label: "New cases", sortable: true, numeric: true, className: "text-right" },
  { key: "deaths", label: "Deaths", sortable: true, numeric: true, className: "text-right" },
  { key: "incAsr", label: "Incidence ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "mortAsr", label: "Mortality ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "pages", label: "OnCo cancer page" },
];
const num = (n: number | null, d = 0) => (n === null ? { text: "n/a", v: -1, muted: true } : { text: d ? n.toFixed(d) : n.toLocaleString("en-GB"), v: n });

const TRIAL_COLUMNS: StaticColumn[] = [
  { key: "year", label: "Start year", sortable: true, numeric: true },
  { key: "studies", label: "Interventional cancer studies", sortable: true, numeric: true, className: "text-right" },
  { key: "bar", label: "" },
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
          <ul className="mt-auto pt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
            {s.links.map((l) => (
              l.url.startsWith("/")
                ? <li key={l.url}><Link href={l.url} className="underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{l.label}</Link></li>
                : <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{l.label}</a></li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function Grid({ items, compact = true }: { items: Entity[]; compact?: boolean }) {
  if (!items.length) return <p className="text-sm text-muted">Nothing recorded yet.</p>;
  return <div className={`grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>{items.map((e) => <EntityCard key={e.id} e={e} compact={compact} />)}</div>;
}

function SponsorList({ title, period, total, rows }: { title: string; period: string; total: number; rows: Array<[string, number]> }) {
  const max = Math.max(...rows.map((r) => r[1]), 1);
  return (
    <div className="card p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-xs text-muted">{period} · {total} studies in total · largest lead sponsors</p>
      <ol className="mt-3 space-y-1.5 text-sm">
        {rows.map(([name, n]) => (
          <li key={name} className="grid grid-cols-[1fr_auto] items-baseline gap-2">
            <span className="truncate" title={name}>{name}</span>
            <span className="flex items-center gap-2"><span aria-hidden className="inline-block h-1.5 rounded bg-accent-soft" style={{ width: `${Math.round((n / max) * 64) + 6}px` }} /><span className="tabular-nums text-muted w-6 text-right">{n}</span></span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function RussiaPage() {
  const g = graph();
  const pick = (ids: string[], kind?: Kind): Entity[] => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e && (!kind || e.kind === kind));
  const institutions = pick(RU_INSTITUTIONS, "institution");
  const companies = pick(RU_COMPANIES, "company");
  const drugs = pick(RU_DRUGS, "drug");
  const trials = pick(RU_TRIALS, "trial");
  const papers = pick(RU_PAPERS, "paper");
  const people = pick(RU_PEOPLE, "person");

  const allInstitutions = g.kind("institution").filter((i) => i.country === "RU").length;
  const allCompanies = g.kind("company").filter((c) => c.country === "RU").length;

  const profile = sitesForCountry(GLOBOCAN, "RUS");
  const all = profile ? GLOBOCAN.countries.RUS?.data?.["39"] : undefined;
  const topSites = profile ? profile.sites.filter((s) => s.cases !== null).slice(0, 14) : [];
  const extra = countryExtras.RU;
  const siteRows: StaticRow[] = topSites.map((s) => ({
    id: String(s.code),
    site: s.label,
    cases: num(s.cases), deaths: num(s.deaths), incAsr: num(s.incAsr, 1), mortAsr: num(s.mortAsr, 1),
    pages: s.oncoIds.map((id) => g.get(id)).filter((e): e is Entity => !!e).map((e) => ({ text: e.name, href: routeFor(e), className: "underline" })),
  }));

  const maxStarts = Math.max(...RU_TRIAL_STARTS.map((r) => r.studies));
  const trialRows: StaticRow[] = RU_TRIAL_STARTS.map((r) => ({
    id: String(r.year),
    year: { text: String(r.year), v: r.year },
    studies: { text: String(r.studies), v: r.studies },
    bar: [{ text: "▉".repeat(Math.max(1, Math.round((r.studies / maxStarts) * 24))), className: "text-accent" }],
  }));

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title="🇷🇺 Cancer in Russia"
        lede={`A country of about ${extra.population.toLocaleString("en-GB")} million people whose cancer service registers more than 700,000 new cancers a year, publishes its own annual statistical volumes in Russian, approves medicines on a Eurasian rather than a European track, and now makes much of its own immunotherapy. OnCo held almost nothing Russian before this page was written, which was a fact about our reading rather than about Russian oncology; it was written from the Herzen institute's reports, the Russian medicines law and registers, and the companies' and institutes' own pages. Facts checked ${RU_ASOF}; every card links its sources, and what could not be sourced is listed at the end.`}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {[["#profile", "Cancer profile"], ["#registry", "The registry"], ["#paying", "Paying for care"], ["#regulator", "Regulator"], ["#trials", "Trials since 2022"], ["#making", "Domestic manufacture"], ["#institutions", "Institutions"], ["#corpus", "In the corpus"], ["#gaps", "Gaps"]].map(([h, l]) => <a key={h} href={h} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        <Section id="profile" title="Cancer profile" aside={<span className="text-sm text-muted">Russian registry figures in the cards; GLOBOCAN {GLOBOCAN.year} estimates in the table</span>}>
          <Cards cards={RU_PROFILE} />
          {profile && all && (
            <div className="mt-6 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Leading cancers in Russia, GLOBOCAN {GLOBOCAN.year}</h3>
                <span className="text-xs text-muted">All cancers, C00-97: {fmt(all[0])} new cases, {fmt(all[2])} deaths; age-standardised incidence {fmt1(all[1])} and mortality {fmt1(all[3])} per 100,000; cumulative risk to 74: {fmt1(all[4])}%.</span>
              </div>
              <StaticTable rows={siteRows} columns={SITE_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
              <p className="mt-3 text-xs text-muted">Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>. ASR = age-standardised rate per 100,000 (World standard). These are modelled estimates for 2022, not the Russian registry&apos;s counts: the registry recorded 698,693 cases in 2024 and 721,690 in 2025, and ranks skin cancer other than melanoma first, where GLOBOCAN estimates about a quarter as many such cancers. Read the registry cards above before comparing this table with another country&apos;s. Compare countries on the <Link href="/cases/" className="underline">cases by country</Link> page.</p>
            </div>
          )}
        </Section>

        <Section id="registry" title="The registry: what it counts and how it is judged">
          <Cards cards={RU_REGISTRY} />
        </Section>

        <Section id="paying" title="Who pays, and what happens if the drug is not on the list">
          <Cards cards={RU_PAYING} />
        </Section>

        <Section id="regulator" title="Registration: the Ministry of Health and the Eurasian route">
          <Cards cards={RU_REGULATOR} />
        </Section>

        <Section id="trials" title="Cancer trials with a Russian site, by start year" aside={<span className="text-sm text-muted">OnCo&apos;s own count from the ClinicalTrials.gov API, {RU_ASOF}</span>}>
          <div className="card p-5">
            <StaticTable rows={trialRows} columns={TRIAL_COLUMNS} noun="years" defaultSort={{ key: "year", dir: 1 }} />
            <p className="mt-3 text-xs text-muted">Interventional studies with the condition query <code>cancer</code> and at least one site in the Russian Federation, grouped by start date. 2026 is a partial year. The all-years total on the same query was 1,628. Method and query in <code>src/data/country-ru.ts</code>; re-runnable against the <a href="https://clinicaltrials.gov/data-api/api" className="underline" rel="noopener">ClinicalTrials.gov API v2</a>.</p>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <SponsorList title="Before" period={RU_TRIAL_SPONSORS.before.period} total={RU_TRIAL_SPONSORS.before.total} rows={RU_TRIAL_SPONSORS.before.rows} />
            <SponsorList title="After" period={RU_TRIAL_SPONSORS.after.period} total={RU_TRIAL_SPONSORS.after.total} rows={RU_TRIAL_SPONSORS.after.rows} />
          </div>
        </Section>

        <Section id="making" title="Domestic manufacture">
          <Cards cards={RU_MAKING} />
          {drugs.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Russian-developed products in the corpus</h3>
              <Grid items={drugs} />
            </div>
          )}
        </Section>

        <Section id="institutions" title="The institutions">
          <Cards cards={RU_INSTITUTIONS_CARDS} />
          <div className="mt-6">
            <Grid items={institutions} />
          </div>
          <p className="mt-3 text-sm text-muted">{allInstitutions} Russian institutions in the corpus · <Link href="/institutions/" className="underline">map and ranking</Link></p>
        </Section>

        <Section id="corpus" title="Companies, trials, papers and people in the corpus" aside={<span className="text-sm text-muted">{allCompanies} Russian companies · <Link href="/companies/" className="underline">all companies</Link></span>}>
          <h3 className="font-semibold mb-2">Companies</h3>
          <Grid items={companies} />
          <h3 className="font-semibold mt-6 mb-2">Trials</h3>
          <Grid items={trials} />
          <h3 className="font-semibold mt-6 mb-2">Key papers</h3>
          <Grid items={papers} />
          <h3 className="font-semibold mt-6 mb-2">People</h3>
          <Grid items={people} />
        </Section>

        <Section id="gaps" title="Gaps, named">
          <Cards cards={RU_GAPS} />
        </Section>

        <section className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this page is built</h2>
            <p>The cards are hand-written from the linked sources and dated {RU_ASOF}. Russian-language sources are cited in Russian with an English gloss, because that is how a reader will find them again. The entity lists are pulled live from the corpus by id, so a new Russian trial, company or person added anywhere in OnCo appears here once listed in <code>src/data/country-ru.ts</code>. Burden figures in the table come from the GLOBOCAN {GLOBOCAN.year} data file used across the site; the Russian registry&apos;s own figures differ and are quoted with their year and their volume. The trial counts are OnCo&apos;s own, made against the ClinicalTrials.gov API with the query recorded in the data file.</p>
          </div>
          <div className="card p-5 space-y-2 border-amber-300/60 dark:border-amber-700/50">
            <h2 className="font-semibold text-base">Verify before relying on it</h2>
            <p>Registration status, the vital and essential medicines list and the state guarantees programme change every year. Check the <a href="https://grls.rosminzdrav.ru/" className="underline" rel="noopener">state medicines register</a>, the <a href="https://glavonco.ru/cancer_register/" className="underline" rel="noopener">Herzen institute&apos;s annual volumes</a> and the treating hospital before acting on anything here. Corrections are welcome through the <Link href="/suggest/" className="underline">suggest an edit</Link> form.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
