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
  NL_ASOF, NL_COMPANIES, NL_DOING, NL_DRUGS, NL_GAPS, NL_INSTITUTIONS, NL_PAPERS, NL_PAYING, NL_PEOPLE, NL_PROFILE,
  NL_REFERENCE_VALUES, NL_REGISTRY, NL_REGULATOR, NL_SCREENING, NL_STAGE_SURVIVAL, NL_TRIALS, type CountryCard,
} from "@/data/country-nl";

export const metadata: Metadata = pageMeta({
  title: "Cancer in the Netherlands",
  description: "Netherlands deep dive read from Dutch sources: the Netherlands Cancer Registry and how it counts, compulsory insurance and the Zorginstituut's €20,000 to €80,000 per QALY reference values, the lock that holds expensive cancer drugs out of the package until the price falls, the CBG inside the European system, TIL therapy's reimbursement and its end, DRUP and whole-genome sequencing, centralised children's cancer care and volume norms, and the screening programmes.",
  path: "/countries/nl/",
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
const STAGE_COLUMNS: StaticColumn[] = [
  { key: "stage", label: "Stage at diagnosis" },
  { key: "then", label: "1990-1994", sortable: true, numeric: true, className: "text-right" },
  { key: "now", label: "2020-2024", sortable: true, numeric: true, className: "text-right" },
];
const SCREEN_COLUMNS: StaticColumn[] = [
  { key: "programme", label: "Programme" },
  { key: "who", label: "Who is invited" },
  { key: "interval", label: "How often" },
  { key: "test", label: "Test" },
];
const REF_COLUMNS: StaticColumn[] = [
  { key: "burden", label: "Disease burden (proportional shortfall)" },
  { key: "max", label: "Maximum extra cost per QALY" },
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

export default function NetherlandsPage() {
  const g = graph();
  const pick = (ids: string[], kind?: Kind): Entity[] => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e && (!kind || e.kind === kind));
  const institutions = pick(NL_INSTITUTIONS, "institution");
  const companies = pick(NL_COMPANIES, "company");
  const drugs = pick(NL_DRUGS, "drug");
  const trials = pick(NL_TRIALS, "trial");
  const papers = pick(NL_PAPERS, "paper");
  const people = pick(NL_PEOPLE, "person");

  const allInstitutions = g.kind("institution").filter((i) => i.country === "NL").length;
  const allCompanies = g.kind("company").filter((c) => c.country === "NL").length;

  const profile = sitesForCountry(GLOBOCAN, "NLD");
  const all = profile ? GLOBOCAN.countries.NLD?.data?.["39"] : undefined;
  const topSites = profile ? profile.sites.filter((s) => s.cases !== null).slice(0, 14) : [];
  const siteRows: StaticRow[] = topSites.map((s) => ({
    id: String(s.code),
    site: s.label,
    cases: num(s.cases), deaths: num(s.deaths), incAsr: num(s.incAsr, 1), mortAsr: num(s.mortAsr, 1),
    pages: s.oncoIds.map((id) => g.get(id)).filter((e): e is Entity => !!e).map((e) => ({ text: e.name, href: routeFor(e), className: "underline" })),
  }));
  const stageRows: StaticRow[] = NL_STAGE_SURVIVAL.map((r) => ({ id: r.id, stage: r.stage, then: { text: `${r.then}%`, v: r.then }, now: { text: `${r.now}%`, v: r.now } }));
  const screenRows: StaticRow[] = NL_SCREENING.map((r) => ({ id: r.id, programme: r.programme, who: r.who, interval: r.interval, test: r.test }));
  const refRows: StaticRow[] = NL_REFERENCE_VALUES.map((r) => ({ id: r.id, burden: r.burden, max: r.max }));

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title="🇳🇱 Cancer in the Netherlands"
        lede={`A country of about ${countryExtras.NL.population} million people that registers roughly 135,000 new cancers a year in a registry its own staff read from every hospital record, pays for care through compulsory private insurance with one basic package, prices new drugs against a published scale of €20,000 to €80,000 per year of healthy life, and holds the most expensive ones in a lock until the price comes down. It hosts the European Medicines Agency, treats every child with cancer in one hospital, and runs a national trial for the off-label use of approved cancer drugs. Written from Dutch sources: IKNL and the Netherlands Cancer Registry, the Zorginstituut, the CBG, RIVM, SONCOS and the institutions' own pages. Facts checked ${NL_ASOF}; every card links its sources, and what could not be sourced is listed at the end.`}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {[["#profile", "Cancer profile"], ["#registry", "The registry"], ["#paying", "Paying for care"], ["#regulator", "Regulator"], ["#doing", "What it does differently"], ["#recruiting", "Recruiting here"], ["#institutions", "Institutions"], ["#corpus", "In the corpus"], ["#gaps", "Gaps"]].map(([h, l]) => <a key={h} href={h} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        <Section id="profile" title="Cancer profile" aside={<span className="text-sm text-muted">Registry figures in the cards; GLOBOCAN {GLOBOCAN.year} estimates in the table</span>}>
          <Cards cards={NL_PROFILE} />
          <div className="mt-6 card p-5">
            <h3 className="font-semibold mb-3">Five-year relative survival by stage at diagnosis</h3>
            <StaticTable rows={stageRows} columns={STAGE_COLUMNS} noun="stages" defaultSort={{ key: "now", dir: -1 }} />
            <p className="mt-3 text-xs text-muted">Source: IKNL, Netherlands Cancer Registry, release of 30 June 2026. Solid tumours with a TNM stage, excluding lymphoma. Better detection of spread over time moves patients into higher stages, which can flatter survival within each stage.</p>
          </div>
          {profile && all && (
            <div className="mt-6 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Leading cancers in the Netherlands, GLOBOCAN {GLOBOCAN.year}</h3>
                <span className="text-xs text-muted">All cancers, C00-97, including non-melanoma skin cancer: {fmt(all[0])} new cases, {fmt(all[2])} deaths; age-standardised incidence {fmt1(all[1])} and mortality {fmt1(all[3])} per 100,000; cumulative risk to 74: {fmt1(all[4])}%.</span>
              </div>
              <StaticTable rows={siteRows} columns={SITE_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
              <p className="mt-3 text-xs text-muted">Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>. ASR = age-standardised rate per 100,000 (World standard). These are modelled estimates for {GLOBOCAN.year}, not the Dutch registry&apos;s counts: the registry recorded 134,800 diagnoses in 2025 (preliminary), counts squamous cell skin cancer, which it ranks first, and leaves out basal cell skin cancer. Compare countries on the <Link href="/cases/" className="underline">cases by country</Link> page.</p>
            </div>
          )}
        </Section>

        <Section id="registry" title="The registry: what it counts and how">
          <Cards cards={NL_REGISTRY} />
        </Section>

        <Section id="paying" title="Who pays, and how a new cancer drug gets into the package">
          <Cards cards={NL_PAYING} />
          <div className="mt-6 card p-5">
            <h3 className="font-semibold mb-3">The Zorginstituut&apos;s reference values</h3>
            <StaticTable rows={refRows} columns={REF_COLUMNS} noun="bands" />
            <p className="mt-3 text-xs text-muted">Source: Zorginstituut Nederland, Beoordelingskader kosteneffectiviteit van zorg (26 November 2024), Table 1. Burden is the share of remaining healthy life the disease takes away, from 0 to 1. The values are ceilings, not targets.</p>
          </div>
        </Section>

        <Section id="regulator" title="Regulator: the CBG inside the European system">
          <Cards cards={NL_REGULATOR} />
        </Section>

        <Section id="doing" title="What the Netherlands does that others do not">
          <Cards cards={NL_DOING} />
          <div className="mt-6 card p-5">
            <h3 className="font-semibold mb-3">National screening programmes</h3>
            <StaticTable rows={screenRows} columns={SCREEN_COLUMNS} noun="programmes" />
            <p className="mt-3 text-xs text-muted">Source: RIVM pages for each programme, checked {NL_ASOF}. There is no national programme for prostate or lung cancer.</p>
          </div>
          {drugs.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Dutch-developed products in the corpus</h3>
              <Grid items={drugs} />
            </div>
          )}
        </Section>

        <CountryTrialsSection iso2="NL" />

        <Section id="institutions" title="The institutions">
          <Grid items={institutions} />
          <p className="mt-3 text-sm text-muted">{allInstitutions} Dutch institutions in the corpus · <Link href="/institutions/" className="underline">map and ranking</Link></p>
        </Section>

        <Section id="corpus" title="Companies, trials, papers and people in the corpus" aside={<span className="text-sm text-muted">{allCompanies} Dutch companies and groups · <Link href="/companies/" className="underline">all companies</Link></span>}>
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
          <Cards cards={NL_GAPS} />
        </Section>

        <section className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this page is built</h2>
            <p>The cards are hand-written from the linked sources and dated {NL_ASOF}. Dutch-language sources are cited with an English gloss, because a reader will find them again in Dutch. The entity lists are pulled live from the corpus by id, so a Dutch trial, company or person added anywhere in OnCo appears here once listed in <code>src/data/country-nl.ts</code>. The burden table comes from the GLOBOCAN {GLOBOCAN.year} data file used across the site; the registry&apos;s own figures differ and are quoted with their year and release.</p>
          </div>
          <div className="card p-5 space-y-2 border-amber-300/60 dark:border-amber-700/50">
            <h2 className="font-semibold text-base">Verify before relying on it</h2>
            <p>Which medicines sit in the lock, the deductible and the screening intervals change every year. Check the <a href="https://www.zorginstituutnederland.nl" className="underline" rel="noopener">Zorginstituut</a>, <a href="https://nkr-cijfers.iknl.nl/" className="underline" rel="noopener">NKR Cijfers</a>, <a href="https://www.rivm.nl" className="underline" rel="noopener">RIVM</a>, your insurer and the treating hospital before acting on anything here. Corrections are welcome through the <Link href="/suggest/" className="underline">suggest an edit</Link> form.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
