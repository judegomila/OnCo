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
  CA_ASOF, CA_COMPANIES, CA_DOING, CA_GAPS, CA_INSTITUTIONS, CA_PAPERS, CA_PAYING, CA_PEOPLE, CA_PROFILE, CA_REGISTRY,
  CA_REGULATOR, CA_SNAPSHOT, CA_TRIALS, type CountryCard,
} from "@/data/country-ca";

export const metadata: Metadata = pageMeta({
  title: "Cancer in Canada",
  description: "Canada deep dive read from Canadian sources: the 2026 national projections and what the Canadian Cancer Registry does and does not yet count, why a cancer tablet is paid for differently from province to province, the four steps from Health Canada's licence through Canada's Drug Agency and the pan-Canadian Pharmaceutical Alliance to a provincial listing, Quebec's own review by INESSS, Project Orbis and conditional licences, the Canadian Cancer Trials Group and the Marathon of Hope network.",
  path: "/countries/ca/",
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

const SNAPSHOT_COLUMNS: StaticColumn[] = [
  { key: "site", label: "Cancer" },
  { key: "cases", label: "Projected cases, 2026", sortable: true, numeric: true, className: "text-right" },
  { key: "deaths", label: "Projected deaths, 2026", sortable: true, numeric: true, className: "text-right" },
  { key: "survival", label: "Five-year net survival, %", sortable: true, numeric: true, className: "text-right" },
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

export default function CanadaPage() {
  const g = graph();
  const pick = (ids: string[], kind?: Kind): Entity[] => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e && (!kind || e.kind === kind));
  const institutions = pick(CA_INSTITUTIONS, "institution");
  const companies = pick(CA_COMPANIES, "company");
  const trials = pick(CA_TRIALS, "trial");
  const papers = pick(CA_PAPERS, "paper");
  const people = pick(CA_PEOPLE, "person");
  const cancerPages = (ids: string[]) => pick(ids, "cancer").map((e) => ({ text: e.name, href: routeFor(e), className: "underline" }));

  const allInstitutions = g.kind("institution").filter((i) => i.country === "CA").length;
  const allCompanies = g.kind("company").filter((c) => c.country === "CA").length;

  const profile = sitesForCountry(GLOBOCAN, "CAN");
  const all = profile ? GLOBOCAN.countries.CAN?.data?.["39"] : undefined;
  const topSites = profile ? profile.sites.filter((s) => s.cases !== null).slice(0, 14) : [];
  const extra = countryExtras.CA;
  const siteRows: StaticRow[] = topSites.map((s) => ({
    id: String(s.code),
    site: s.label,
    cases: num(s.cases), deaths: num(s.deaths), incAsr: num(s.incAsr, 1), mortAsr: num(s.mortAsr, 1),
    pages: s.oncoIds.map((id) => g.get(id)).filter((e): e is Entity => !!e).map((e) => ({ text: e.name, href: routeFor(e), className: "underline" })),
  }));
  const snapshotRows: StaticRow[] = CA_SNAPSHOT.map((r) => ({
    id: r.id,
    site: { text: r.site, strong: r.id === "all" },
    cases: num(r.cases), deaths: num(r.deaths), survival: num(r.survival),
    pages: cancerPages(r.cancerIds),
  }));

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title="🇨🇦 Cancer in Canada"
        lede={`A country of about ${extra.population.toLocaleString("en-GB")} million people where health care is run by ten provinces and three territories, so that a cancer tablet is paid for by the cancer agency in Vancouver and goes through the provincial drug plan in Toronto; where a licensed cancer drug passes a national value review and a joint price negotiation before any province pays for it; and where one academic trials group has enrolled more than 113,000 patients since 1980. Written from the national cancer statistics, Statistics Canada's registry documentation, Health Canada's guidance, INESSS's pages in French and peer-reviewed studies of the drug review system. Facts checked ${CA_ASOF}; every card links its sources, and what could not be read is listed at the end.`}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {[["#profile", "Cancer profile"], ["#registry", "The registry"], ["#paying", "Paying for care"], ["#regulator", "Regulator"], ["#doing", "What Canada does"], ["#recruiting", "Recruiting here"], ["#institutions", "Institutions"], ["#corpus", "In the corpus"], ["#gaps", "Gaps"]].map(([h, l]) => <a key={h} href={h} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        <Section id="profile" title="Cancer profile" aside={<span className="text-sm text-muted">Canadian Cancer Statistics in the cards and the first table; GLOBOCAN {GLOBOCAN.year} for comparison</span>}>
          <Cards cards={CA_PROFILE} />
          <div className="mt-6 card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h3 className="font-semibold">Projected cancers and deaths in Canada, 2026, with five-year survival</h3>
              <span className="text-xs text-muted">Both sexes · {CA_SNAPSHOT.length - 2} cancer types plus all cancers and all others</span>
            </div>
            <StaticTable rows={snapshotRows} columns={SNAPSHOT_COLUMNS} noun="cancers" defaultSort={{ key: "cases", dir: -1 }} />
            <p className="mt-3 text-xs text-muted">Source: Canadian Cancer Society, <a href="https://cdn.cancer.ca/-/media/files/research/cancer-statistics/2026-cmaj/2026_cancer-specific_en.pdf" className="underline" rel="noopener">Cancer-specific stats 2026</a>. Cases and deaths are the projections in Brenner et al., CMAJ 2026, rounded as published; survival is predicted five-year net survival for people diagnosed in 2015 to 2017, Canada excluding Quebec, from Canadian Cancer Statistics 2025 Table 3.1. &ldquo;All cancers&rdquo; excludes non-melanoma skin cancer. The news release gives lung cancer deaths as 19,200 where this table gives 19,300.</p>
          </div>
          {profile && all && (
            <div className="mt-6 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Leading cancers in Canada, GLOBOCAN {GLOBOCAN.year}</h3>
                <span className="text-xs text-muted">All cancers including non-melanoma skin cancer (C00-97): {fmt(all[0])} new cases, {fmt(all[2])} deaths; age-standardised incidence {fmt1(all[1])} and mortality {fmt1(all[3])} per 100,000; cumulative risk to 74: {fmt1(all[4])}%.</span>
              </div>
              <StaticTable rows={siteRows} columns={SITE_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
              <p className="mt-3 text-xs text-muted">Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>. ASR = age-standardised rate per 100,000 (World standard). These are modelled estimates for {GLOBOCAN.year} on the world standard population, and their all-cancers total includes non-melanoma skin cancer, which the Canadian figures above exclude. The Canadian figures also use the 2021 Canadian standard population, and the two sets of rates cannot be compared directly. Compare countries on the <Link href="/cases/" className="underline">cases by country</Link> page.</p>
            </div>
          )}
        </Section>

        <Section id="registry" title="The registry: thirteen registries, one custodian, and the provinces missing from the count">
          <Cards cards={CA_REGISTRY} />
        </Section>

        <Section id="paying" title="Who pays, and how a licensed cancer drug becomes a funded one">
          <Cards cards={CA_PAYING} />
        </Section>

        <Section id="regulator" title="Health Canada: review targets, conditional licences and Project Orbis">
          <Cards cards={CA_REGULATOR} />
        </Section>

        <Section id="doing" title="What Canada does that others do not">
          <Cards cards={CA_DOING} />
        </Section>

        <CountryTrialsSection iso2="CA" />

        <Section id="institutions" title="The institutions">
          <Grid items={institutions} />
          <p className="mt-3 text-sm text-muted">{allInstitutions} Canadian institutions in the corpus · <Link href="/institutions/" className="underline">map and ranking</Link></p>
        </Section>

        <Section id="corpus" title="Companies, trials, papers and people in the corpus" aside={<span className="text-sm text-muted">{allCompanies} Canadian companies · <Link href="/companies/" className="underline">all companies</Link></span>}>
          <h3 className="font-semibold mb-2">Companies and trials groups</h3>
          <Grid items={companies} />
          <h3 className="font-semibold mt-6 mb-2">Trials</h3>
          <Grid items={trials} />
          <h3 className="font-semibold mt-6 mb-2">Key papers</h3>
          <Grid items={papers} />
          <h3 className="font-semibold mt-6 mb-2">People</h3>
          <Grid items={people} />
        </Section>

        <Section id="gaps" title="Gaps, named">
          <Cards cards={CA_GAPS} />
        </Section>

        <section className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this page is built</h2>
            <p>The cards are hand-written from the linked sources and dated {CA_ASOF}. French-language sources from Quebec are cited in French. The entity lists are pulled live from the corpus by id, so a Canadian trial, company or person added anywhere in OnCo appears here once listed in <code>src/data/country-ca.ts</code>. The 2026 table is copied from the Canadian Cancer Society&apos;s published PDF; the comparison table comes from the GLOBOCAN {GLOBOCAN.year} data file used across the site.</p>
          </div>
          <div className="card p-5 space-y-2 border-amber-300/60 dark:border-amber-700/50">
            <h2 className="font-semibold text-base">Verify before relying on it</h2>
            <p>What a province pays for changes often and differs between provinces. Check your provincial cancer agency or drug plan, <a href="https://www.cda-amc.ca/" className="underline" rel="noopener">Canada&apos;s Drug Agency</a>, <a href="https://www.inesss.qc.ca/" className="underline" rel="noopener">INESSS</a> in Quebec and the treating hospital before acting on anything here. Corrections are welcome through the <Link href="/suggest/" className="underline">suggest an edit</Link> form.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
