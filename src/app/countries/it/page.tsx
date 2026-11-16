import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Entity, type Kind } from "@/lib/schema";
import { CountryTrialsSection } from "@/components/TrialsHere";
import { Container, EntityCard, GroupKicker, PageHeader, Section } from "@/components/ui";
import { GLOBOCAN, sitesForCountry } from "@/lib/globocan";
import { countryExtras } from "@/data/country-extras";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";
import {
  IT_ASOF, IT_COMPANIES, IT_DOING, IT_DRUGS, IT_GAPS, IT_INSTITUTIONS, IT_PAPERS, IT_PAYING, IT_PEOPLE, IT_PROFILE,
  IT_REGISTRY, IT_REGULATOR, IT_SITES, IT_TRIALS, IT_TRIAL_STARTS, IT_TRIAL_TOTAL, type CountryCard,
} from "@/data/country-it";

export const metadata: Metadata = pageMeta({
  title: "Cancer in Italy",
  description: "Italy deep dive read from Italian sources: what the AIRTUM registries count and why the national figure is a projection, the regional national health service and its essential levels of care, AIFA's single commission, its innovative medicines fund and payment-by-result registries, law 648, the 2023 right to be forgotten, CNAO's carbon ions, and the Milan trials.",
  path: "/countries/it/",
});

const fmt = (n: number | null) => (n === null ? "n/a" : n.toLocaleString("en-GB"));
const fmt1 = (n: number | null) => (n === null ? "n/a" : n.toFixed(1));
const num = (n: number | null, d = 0) => (n === null ? { text: "n/a", v: -1, muted: true } : { text: d ? n.toFixed(d) : n.toLocaleString("en-GB"), v: n });

const SITE_COLUMNS: StaticColumn[] = [
  { key: "site", label: "Site" },
  { key: "cases", label: "New cases", sortable: true, numeric: true, className: "text-right" },
  { key: "deaths", label: "Deaths", sortable: true, numeric: true, className: "text-right" },
  { key: "incAsr", label: "Incidence ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "mortAsr", label: "Mortality ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "pages", label: "OnCo cancer page" },
];

const NATIONAL_COLUMNS: StaticColumn[] = [
  { key: "site", label: "Site" },
  { key: "cases", label: "New cases, 2024 (projected)", sortable: true, numeric: true, className: "text-right" },
  { key: "deaths", label: "Deaths, 2022 (estimated)", sortable: true, numeric: true, className: "text-right" },
  { key: "survival", label: "Five-year net survival" },
  { key: "living", label: "Living after diagnosis", sortable: true, numeric: true, className: "text-right" },
];

const TRIAL_COLUMNS: StaticColumn[] = [
  { key: "year", label: "Start year", sortable: true, numeric: true },
  { key: "studies", label: "Interventional cancer studies", sortable: true, numeric: true, className: "text-right" },
  { key: "industry", label: "Industry-led", sortable: true, numeric: true, className: "text-right" },
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
          <ul className="mt-auto pt-2 flex flex-wrap gap-x-3 text-xs">
            {s.links.map((l) => (
              l.url.startsWith("/")
                ? <li key={l.url}><Link href={l.url} className="inline-block py-1 underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{l.label}</Link></li>
                : <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-block py-1 underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{l.label}</a></li>
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

export default function ItalyPage() {
  const g = graph();
  const pick = (ids: string[], kind?: Kind): Entity[] => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e && (!kind || e.kind === kind));
  const institutions = pick(IT_INSTITUTIONS, "institution");
  const companies = pick(IT_COMPANIES, "company");
  const drugs = pick(IT_DRUGS, "drug");
  const trials = pick(IT_TRIALS, "trial");
  const papers = pick(IT_PAPERS, "paper");
  const people = pick(IT_PEOPLE, "person");

  const allInstitutions = g.kind("institution").filter((i) => i.country === "IT").length;
  const allCompanies = g.kind("company").filter((c) => c.country === "IT").length;

  const profile = sitesForCountry(GLOBOCAN, "ITA");
  const all = profile ? GLOBOCAN.countries.ITA?.data?.["39"] : undefined;
  const topSites = profile ? profile.sites.filter((s) => s.cases !== null).slice(0, 14) : [];
  const extra = countryExtras.IT;
  const siteRows: StaticRow[] = topSites.map((s) => ({
    id: String(s.code),
    site: s.label,
    cases: num(s.cases), deaths: num(s.deaths), incAsr: num(s.incAsr, 1), mortAsr: num(s.mortAsr, 1),
    pages: s.oncoIds.map((id) => g.get(id)).filter((e): e is Entity => !!e).map((e) => ({ text: e.name, href: routeFor(e), className: "underline" })),
  }));

  const nationalRows: StaticRow[] = IT_SITES.map((r) => {
    const c = g.get(r.cancerId);
    return {
      id: r.id,
      site: c ? [{ text: r.site, href: routeFor(c), className: "underline" }] : r.site,
      cases: num(r.newCases), deaths: num(r.deaths), survival: r.survival, living: num(r.living),
    };
  });

  const maxStarts = Math.max(...IT_TRIAL_STARTS.map((r) => r.studies));
  const trialRows: StaticRow[] = IT_TRIAL_STARTS.map((r) => ({
    id: String(r.year),
    year: { text: String(r.year), v: r.year },
    studies: { text: String(r.studies), v: r.studies },
    industry: { text: `${r.industry} (${Math.round((r.industry / r.studies) * 100)}%)`, v: r.industry },
    bar: [{ text: "▉".repeat(Math.max(1, Math.round((r.studies / maxStarts) * 24))), className: "text-accent" }],
  }));

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title="🇮🇹 Cancer in Italy"
        lede={`A country of about ${extra.population.toLocaleString("en-GB")} million people with a tax-funded health service delivered region by region, a medicines agency that pays for innovation from a ring-fenced fund and charges companies back when a drug fails, and the Milan trials behind breast-conserving surgery and adjuvant chemotherapy. It was written from Italian sources: the annual national report I numeri del cancro in Italia, the laws on Normattiva, AIFA's own pages and lists, and the institutions' sites. Facts checked ${IT_ASOF}; every card links its sources, and what could not be sourced is listed at the end.`}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {[["#profile", "Cancer profile"], ["#registry", "The registry"], ["#paying", "Paying for care"], ["#regulator", "Regulator"], ["#doing", "What Italy does differently"], ["#trials", "Trials"], ["#recruiting", "Recruiting here"], ["#institutions", "Institutions"], ["#corpus", "In the corpus"], ["#gaps", "Gaps"]].map(([h, l]) => <a key={h} href={h} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        <Section id="profile" title="Cancer profile" aside={<span className="text-sm text-muted">Italian registry projections in the cards; GLOBOCAN {GLOBOCAN.year} estimates in the second table</span>}>
          <Cards cards={IT_PROFILE} />
          <div className="mt-6 card p-5">
            <h3 className="font-semibold mb-3">Five cancers in Italy&apos;s national report</h3>
            <StaticTable rows={nationalRows} columns={NATIONAL_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
            <p className="mt-3 text-xs text-muted">Source: the site chapters of <a href="https://www.aiom.it/wp-content/uploads/2025/12/2025_NDC_web.pdf" className="underline" rel="noopener">I numeri del cancro in Italia 2025</a>. New cases are AIRTUM projections for 2024 excluding non-melanoma skin cancer; deaths are the 2022 estimates the volume prints, stating that estimates for 2023 were not available. Five-year net survival and the number of people living after the diagnosis are as the volume gives them, without a stated reference year for every site.</p>
          </div>
          {profile && all && (
            <div className="mt-6 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Leading cancers in Italy, GLOBOCAN {GLOBOCAN.year}</h3>
                <span className="text-xs text-muted">All cancers, C00-97: {fmt(all[0])} new cases, {fmt(all[2])} deaths; age-standardised incidence {fmt1(all[1])} and mortality {fmt1(all[3])} per 100,000; cumulative risk to 74: {fmt1(all[4])}%.</span>
              </div>
              <StaticTable rows={siteRows} columns={SITE_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
              <p className="mt-3 text-xs text-muted">Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>. ASR = age-standardised rate per 100,000 (World standard). These are IARC&apos;s modelled estimates for {GLOBOCAN.year} and include non-melanoma skin cancer, so the total is not comparable with the AIRTUM projection of 360,000 to 390,000 for 2024, which excludes it. Without its 28,698 non-melanoma skin cancers, GLOBOCAN 2024&apos;s total is 400,997, still above the AIRTUM range; the 2025 edition of the national report says AIRTUM&apos;s projections run about 20,000 cases a year below IARC&apos;s. Compare countries on the <Link href="/cases/" className="underline">cases by country</Link> page.</p>
            </div>
          )}
        </Section>

        <Section id="registry" title="The registry: a network still waiting for its national regulation">
          <Cards cards={IT_REGISTRY} />
        </Section>

        <Section id="paying" title="Who pays, and how a new drug gets paid for">
          <Cards cards={IT_PAYING} />
        </Section>

        <Section id="regulator" title="The regulator: AIFA, and how fast medicines arrive">
          <Cards cards={IT_REGULATOR} />
        </Section>

        <Section id="doing" title="What Italy does that others do not">
          <Cards cards={IT_DOING} />
          {drugs.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Cancer medicines from Italian companies in the corpus</h3>
              <Grid items={drugs} />
            </div>
          )}
        </Section>

        <Section id="trials" title="Cancer trials with an Italian site, by start year" aside={<span className="text-sm text-muted">OnCo&apos;s own count from the ClinicalTrials.gov API, {IT_ASOF}</span>}>
          <div className="card p-5">
            <StaticTable rows={trialRows} columns={TRIAL_COLUMNS} noun="years" defaultSort={{ key: "year", dir: 1 }} />
            <p className="mt-3 text-xs text-muted">Interventional studies with the condition query <code>cancer</code> and at least one site in Italy, grouped by start date; the industry column counts studies whose lead sponsor ClinicalTrials.gov classes as industry. The all-years total on the same query was {IT_TRIAL_TOTAL.toLocaleString("en-GB")}. Since 2023 trials in the European Union are registered in CTIS and many academic ones never reach ClinicalTrials.gov, so this undercounts Italian academic research. Method and query in <code>src/data/country-it.ts</code>; re-runnable against the <a href="https://clinicaltrials.gov/data-api/api" className="underline" rel="noopener">ClinicalTrials.gov API v2</a>.</p>
          </div>
        </Section>

        <CountryTrialsSection iso2="IT" />

        <Section id="institutions" title="The institutions">
          <Grid items={institutions} />
          <p className="mt-3 text-sm text-muted">{allInstitutions} Italian institutions in the corpus · <Link href="/institutions/" className="underline">map and ranking</Link></p>
        </Section>

        <Section id="corpus" title="Companies, trials, papers and people in the corpus" aside={<span className="text-sm text-muted">{allCompanies} Italian companies and cooperative groups · <Link href="/companies/" className="underline">all companies</Link></span>}>
          <h3 className="font-semibold mb-2">Companies and cooperative groups</h3>
          <Grid items={companies} />
          <h3 className="font-semibold mt-6 mb-2">Trials</h3>
          <Grid items={trials} />
          <h3 className="font-semibold mt-6 mb-2">Key papers</h3>
          <Grid items={papers} />
          <h3 className="font-semibold mt-6 mb-2">People</h3>
          <Grid items={people} />
        </Section>

        <Section id="gaps" title="Gaps, named">
          <Cards cards={IT_GAPS} />
        </Section>

        <section className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this page is built</h2>
            <p>The cards are hand-written from the linked sources and dated {IT_ASOF}. Italian sources are cited with an English gloss, because that is how a reader will find them again. The entity lists are pulled live from the corpus by id, so a new Italian trial, company or person added anywhere in OnCo appears here once listed in <code>src/data/country-it.ts</code>. The GLOBOCAN table uses the data file used across the site; the national report&apos;s figures differ and are quoted with their year. The trial counts are OnCo&apos;s own.</p>
          </div>
          <div className="card p-5 space-y-2 border-amber-300/60 dark:border-amber-700/50">
            <h2 className="font-semibold text-base">Verify before relying on it</h2>
            <p>Reimbursement, innovativeness and law 648 listings change through the year. Check <a href="https://www.aifa.gov.it/farmaci-innovativi" className="underline" rel="noopener">AIFA&apos;s lists</a>, your region&apos;s hospital formulary and the treating hospital before acting on anything here. Corrections are welcome through the <Link href="/suggest/" className="underline">suggest an edit</Link> form.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
