import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Entity, type Kind } from "@/lib/schema";
import { Container, EntityCard, GroupKicker, PageHeader, Section } from "@/components/ui";
import { GLOBOCAN, sitesForCountry } from "@/lib/globocan";
import { countryExtras } from "@/data/country-extras";
import { regionalApprovals, REGION_META } from "@/data/regional-approvals";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";
import openalex from "../../../../public/openalex/countries.json";
import {
  JP_ASOF, JP_CEILINGS, JP_COMPANIES, JP_DIVERGENCE, JP_DOING, JP_GAPS, JP_INSTITUTIONS, JP_PAPERS, JP_PAYING,
  JP_PEOPLE, JP_PROFILE, JP_REGULATOR, JP_SCREENING, JP_SCREENING_PROGRAMME, JP_STAGE, JP_TRIALS, type CountryCard,
} from "@/data/country-jp";

export const metadata: Metadata = pageMeta({
  title: "Cancer in Japan",
  description: "Japan deep dive, written from Japanese sources: the national cancer registry and the stomach and liver burden, the screening programme and what its evidence says, universal insurance and the high-cost medical expense ceiling, PMDA and the drug lag, carbon-ion therapy and endoscopic resection, JCOG, and where Japanese evidence diverges from Western practice.",
  path: "/countries/jp/",
});

const fmt = (n: number | null) => (n === null ? "n/a" : n.toLocaleString("en-GB"));
const fmt1 = (n: number | null) => (n === null ? "n/a" : n.toFixed(1));
const ORDINALS = ["", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"];
const ordinal = (n: number) => ORDINALS[n] ?? `${n}th`;
const num = (n: number | null, d = 0) => (n === null ? { text: "n/a", v: -1, muted: true } : { text: d ? n.toFixed(d) : n.toLocaleString("en-GB"), v: n });

const SITE_COLUMNS: StaticColumn[] = [
  { key: "site", label: "Site" },
  { key: "cases", label: "New cases", sortable: true, numeric: true, className: "text-right" },
  { key: "deaths", label: "Deaths", sortable: true, numeric: true, className: "text-right" },
  { key: "incAsr", label: "Incidence ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "mortAsr", label: "Mortality ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "pages", label: "OnCo cancer page" },
];

const SCREEN_COLUMNS: StaticColumn[] = [
  { key: "cancer", label: "Cancer" },
  { key: "test", label: "Test" },
  { key: "age", label: "Age offered" },
  { key: "interval", label: "Interval" },
  { key: "uptake", label: "Uptake, 2022 survey" },
  { key: "pages", label: "OnCo cancer page" },
];

const STAGE_COLUMNS: StaticColumn[] = [
  { key: "site", label: "Site" },
  { key: "localPct", label: "Localised, % of cases", sortable: true, numeric: true, className: "text-right" },
  { key: "localSurv", label: "Localised, 5-year survival", sortable: true, numeric: true, className: "text-right" },
  { key: "regionalPct", label: "Regional, %", sortable: true, numeric: true, className: "text-right", hide: "hidden md:table-cell" },
  { key: "regionalSurv", label: "Regional, survival", sortable: true, numeric: true, className: "text-right", hide: "hidden md:table-cell" },
  { key: "distantPct", label: "Distant, %", sortable: true, numeric: true, className: "text-right" },
  { key: "distantSurv", label: "Distant, survival", sortable: true, numeric: true, className: "text-right" },
  { key: "pages", label: "OnCo cancer page", hide: "hidden lg:table-cell" },
];

const CEILING_COLUMNS: StaticColumn[] = [
  { key: "band", label: "Household income" },
  { key: "now", label: "Monthly ceiling now" },
  { key: "multi", label: "From the 4th month in 12" },
  { key: "from2026", label: "Monthly ceiling from August 2026" },
  { key: "annual2026", label: "New annual cap" },
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
            {s.links.map((l) => <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{l.label}</a></li>)}
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

type OpenAlex = { years: number[]; countries: Record<string, { works: Record<string, number>; total: number; citedHigh: number; oa: number; trials?: number }> };

export default function JapanPage() {
  const g = graph();
  const pick = (ids: string[], kind?: Kind): Entity[] => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e && (!kind || e.kind === kind));
  const institutions = pick(JP_INSTITUTIONS, "institution");
  const companies = pick(JP_COMPANIES, "company");
  const trials = pick(JP_TRIALS, "trial");
  const papers = pick(JP_PAPERS, "paper");
  const people = pick(JP_PEOPLE, "person");

  const allInstitutions = g.kind("institution").filter((i) => i.country === "JP").length;
  const allCompanies = g.kind("company").filter((c) => c.country === "JP").length;
  const jpApproved = g.kind("drug").filter((d) => { const r = regionalApprovals[d.id]?.JP; return r && (r.status === "approved" || r.status === "conditional"); });

  // The measurement trap, computed rather than asserted: our own ranks against Japan's indexed output.
  const oa = openalex as OpenAlex;
  const lastYear = String(oa.years[oa.years.length - 1]);
  const firstYear = String(oa.years[0]);
  const worksRank = Object.entries(oa.countries).sort((a, b) => (b[1].works[lastYear] ?? 0) - (a[1].works[lastYear] ?? 0)).findIndex(([c]) => c === "JP") + 1;
  const jpOa = oa.countries.JP;
  const instRank = [...new Set(g.kind("institution").map((i) => i.country))]
    .map((c) => [c, g.kind("institution").filter((i) => i.country === c).length] as const)
    .sort((a, b) => b[1] - a[1]).findIndex(([c]) => c === "JP") + 1;

  const profile = sitesForCountry(GLOBOCAN, "JPN");
  const all = profile ? GLOBOCAN.countries.JPN?.data?.["39"] : undefined;
  const topSites = profile ? profile.sites.filter((s) => s.cases !== null && s.label !== "Non-melanoma skin cancer").slice(0, 12) : [];
  const extra = countryExtras.JP;
  const meta = REGION_META.JP;

  const pages = (ids: string[]) => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e).map((e) => ({ text: e.name, href: routeFor(e), className: "underline" }));
  const siteRows: StaticRow[] = topSites.map((s) => ({
    id: String(s.code),
    site: s.label,
    cases: num(s.cases), deaths: num(s.deaths), incAsr: num(s.incAsr, 1), mortAsr: num(s.mortAsr, 1),
    pages: pages(s.oncoIds),
  }));
  const screenRows: StaticRow[] = JP_SCREENING_PROGRAMME.map((r) => ({ id: r.id, cancer: { text: r.cancer, strong: true }, test: r.test, age: r.age, interval: r.interval, uptake: r.uptake, pages: pages(r.cancerIds) }));
  const stageRows: StaticRow[] = JP_STAGE.map((r) => ({
    id: r.id,
    site: { text: r.site, strong: r.id === "all" },
    localPct: num(r.localPct, 1), localSurv: num(r.localSurv, 1),
    regionalPct: num(r.regionalPct, 1), regionalSurv: num(r.regionalSurv, 1),
    distantPct: num(r.distantPct, 1), distantSurv: num(r.distantSurv, 1),
    pages: pages(r.cancerIds),
  }));
  const ceilingRows: StaticRow[] = JP_CEILINGS.map((r) => ({ id: r.id, band: { text: r.band, strong: true }, now: r.now, multi: r.multi, from2026: r.from2026, annual2026: r.annual2026 }));

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title={`${meta.flag} Cancer in Japan`}
        lede={`A country of about ${extra.population.toLocaleString("en-GB")} million people with the world's oldest population, a cancer mix built around stomach and liver, a national screening programme decades old, a monthly ceiling on what any illness can cost a household, and 25 particle therapy centres. This page was written from Japanese sources: the national cancer registry, the health ministry's screening guidance and insurance rules, the PMDA's own performance report and JCOG's evaluation slides. It gathers ${institutions.length} institutions, ${companies.length} companies, ${trials.length} trials, ${papers.length} key papers and ${people.length} people from the corpus around them. Facts checked ${JP_ASOF}; every card links its sources.`}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {[["#profile", "Cancer profile"], ["#screening", "Screening"], ["#paying", "Paying for care"], ["#regulator", "Regulator and the drug lag"], ["#doing", "What Japan does"], ["#divergence", "Where the evidence diverges"], ["#institutions", "Institutions"], ["#companies", "Companies"], ["#trials", "Trials and papers"], ["#people", "People"], ["#gaps", "Gaps"]].map(([h, l]) => <a key={h} href={h} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        <Section id="profile" title="Cancer profile" aside={<span className="text-sm text-muted">Japan&apos;s own registry first; GLOBOCAN {GLOBOCAN.year} for comparison</span>}>
          <Cards cards={JP_PROFILE} />
          <div className="mt-6 card p-5">
            <h3 className="font-semibold">Why our ranking of Japan is wrong, in numbers</h3>
            <p className="mt-2 text-sm leading-relaxed">
              The corpus holds {allInstitutions} Japanese institutions, which puts Japan {ordinal(instRank)} in our own count, and {allCompanies} Japanese companies. OpenAlex, which indexes English-language
              journals most completely, still puts Japan {ordinal(worksRank)} in the world for oncology works in {lastYear} with {jpOa.works[lastYear].toLocaleString("en-GB")}. The gap between those two
              numbers is our reading, not Japan&apos;s output. Three parts of the ranking formula on the <Link href="/countries/" className="underline">countries page</Link> then push Japan further down: its indexed output is flat
              ({jpOa.works[firstYear].toLocaleString("en-GB")} works in {firstYear} against {jpOa.works[lastYear].toLocaleString("en-GB")} in {lastYear}, so the growth term scores zero), its highly cited share is
              {" "}{((jpOa.citedHigh / jpOa.total) * 100).toFixed(2)} percent, and the trial term counts ClinicalTrials.gov registrations ({jpOa.trials?.toLocaleString("en-GB")}) while Japan&apos;s investigator-initiated trials register in jRCT and UMIN-CTR.
            </p>
          </div>
          {profile && all && (
            <div className="mt-6 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Leading cancers in Japan, {GLOBOCAN.year}</h3>
                <span className="text-xs text-muted">All cancers (C00-97): {fmt(all[0])} new cases, {fmt(all[2])} deaths; age-standardised incidence {fmt1(all[1])} and mortality {fmt1(all[3])} per 100,000; cumulative risk to 74: {fmt1(all[4])}%.</span>
              </div>
              <StaticTable rows={siteRows} columns={SITE_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
              <p className="mt-3 text-xs text-muted">Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>. ASR = age-standardised rate per 100,000 (World standard). These are IARC estimates for 2022; the registry counts quoted in the cards above are Japan&apos;s own for 2023 and differ. Compare countries on the <Link href="/cases/" className="underline">cases by country</Link> page.</p>
            </div>
          )}
        </Section>

        <Section id="screening" title="A screened population" aside={<a href="https://www.mhlw.go.jp/content/10900000/001642974.pdf" className="text-sm underline" rel="noopener">The ministry&apos;s screening guidance →</a>}>
          <Cards cards={JP_SCREENING} />
          <div className="mt-6 card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h3 className="font-semibold">The five national screening programmes</h3>
              <span className="text-xs text-muted">Test, age and interval from the guidance revised 24 December 2025; uptake from the 2022 Comprehensive Survey of Living Conditions</span>
            </div>
            <StaticTable rows={screenRows} columns={SCREEN_COLUMNS} noun="programmes" />
            <p className="mt-3 text-xs text-muted">Municipalities deliver these; the ministry sets the specification. Uptake is self-reported and includes workplace and opportunistic screening, so it runs above the municipal programme&apos;s own figure. Sources: <a href="https://www.mhlw.go.jp/content/10900000/001642974.pdf" className="underline" rel="noopener">MHLW guidance (PDF)</a> and <a href="https://www.mhlw.go.jp/toukei/saikin/hw/k-tyosa/k-tyosa22/dl/04.pdf" className="underline" rel="noopener">the 2022 survey (PDF)</a>.</p>
          </div>
          <div className="mt-6 card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h3 className="font-semibold">What screening buys: stage at diagnosis and survival, 2018 cohort</h3>
              <span className="text-xs text-muted">Five-year relative survival by clinical extent, both sexes, national cancer registry</span>
            </div>
            <StaticTable rows={stageRows} columns={STAGE_COLUMNS} noun="sites" />
            <p className="mt-3 text-xs text-muted">Localised means confined to the organ of origin; regional means regional nodes or direct invasion of an adjacent organ; distant means metastasis. The three shares do not sum to 100 because extent is unknown in 5 to 17 percent of cases depending on the site. Death-certificate-only cases, second primaries, in-situ disease and cases of unknown age or address are excluded. Source: <a href="https://ganjoho.jp/reg_stat/statistics/data/dl/excel/cancer_survivalNCR(2016-2018).xlsx" className="underline" rel="noopener">全国がん登録生存率データ (2016-2018), National Cancer Center</a>.</p>
          </div>
        </Section>

        <Section id="paying" title="Health system and paying for care">
          <Cards cards={JP_PAYING} />
          <div className="mt-6 card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h3 className="font-semibold">Monthly out-of-pocket ceilings, people under 70</h3>
              <span className="text-xs text-muted">Yen per month, whatever the treatment costs</span>
            </div>
            <StaticTable rows={ceilingRows} columns={CEILING_COLUMNS} noun="income bands" />
            <p className="mt-3 text-xs text-muted">Hospital meals, the charge for a private room and treatments outside insurance are not counted towards the ceiling. People aged 70 and over have their own table with a separate outpatient-only ceiling. Sources: <a href="https://www.mhlw.go.jp/content/000333280.pdf" className="underline" rel="noopener">MHLW leaflet, rules from August 2018 (PDF)</a> and <a href="https://www.mhlw.go.jp/content/001726232.pdf" className="underline" rel="noopener">the December 2025 reform paper (PDF)</a>.</p>
          </div>
          <p className="mt-3 text-sm text-muted">For comparison, <Link href="/assistance/" className="underline">Financial help</Link> collects the schemes patients use elsewhere and <Link href="/countries/" className="underline">Countries</Link> ranks research output rather than care.</p>
        </Section>

        <Section id="regulator" title={`Regulator: ${meta.regulator}`} aside={<a href={meta.url} className="text-sm underline" rel="noopener">PMDA list of approved drugs</a>}>
          <Cards cards={JP_REGULATOR} />
          <div className="mt-4 card p-5">
            <h3 className="font-semibold">Products with a sourced Japanese approval in the corpus ({jpApproved.length})</h3>
            <p className="mt-1 text-sm text-muted">Rows traced to the PMDA list, a company release or a primary paper in the <Link href="/regulatory/regions/" className="underline">approvals by region</Link> matrix. Absent means not yet researched, not &ldquo;not approved&rdquo;.</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
              {jpApproved.map((d) => { const r = regionalApprovals[d.id].JP!; return <li key={d.id} className="flex flex-col"><span><Link href={routeFor(d)} className="font-medium underline">{d.name}</Link>{d.brand ? <span className="text-muted"> ({d.brand})</span> : null}{r.year ? <span className="text-muted"> · {r.year}</span> : null}</span>{(r.indication || r.note) && <span className="text-xs text-muted">{[r.indication, r.note].filter(Boolean).join(". ")}</span>}</li>; })}
            </ul>
          </div>
        </Section>

        <Section id="doing" title="What Japan does that others do not">
          <Cards cards={JP_DOING} />
        </Section>

        <Section id="divergence" title="Where Japanese evidence diverges from Western practice" aside={<span className="text-sm text-muted">Read this before reading a Japanese trial on another page</span>}>
          <Cards cards={JP_DIVERGENCE} />
        </Section>

        <Section id="institutions" title="Research institutions and cancer centres" aside={<span className="text-sm text-muted">{allInstitutions} Japanese institutions in the corpus · <Link href="/institutions/" className="underline">map and ranking</Link></span>}>
          <Grid items={institutions} />
        </Section>

        <Section id="companies" title="Companies" aside={<span className="text-sm text-muted">{allCompanies} Japanese companies in the corpus · <Link href="/companies/" className="underline">all companies</Link></span>}>
          <Grid items={companies} />
        </Section>

        <Section id="trials" title="Notable trials and key papers">
          <h3 className="font-semibold mb-2">Trials</h3>
          <Grid items={trials} />
          <h3 className="font-semibold mt-6 mb-2">Key papers</h3>
          <Grid items={papers} />
        </Section>

        <Section id="people" title="People">
          <Grid items={people} />
        </Section>

        <Section id="gaps" title="What is missing">
          <Cards cards={JP_GAPS} />
        </Section>

        <section className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this page is built</h2>
            <p>The cards and the three hand-built tables are written from the linked Japanese sources and dated {JP_ASOF}. The entity lists are pulled live from the corpus by id, so a new Japanese trial, company or person added anywhere in OnCo appears here once listed in <code>src/data/country-jp.ts</code>. Registry incidence is for diagnoses in 2023, deaths are from the 2024 vital statistics, and survival is for the 2018 diagnosis cohort; GLOBOCAN&apos;s 2022 estimates are given separately because they are estimates on a different basis. Crude rates from ganjoho are labelled as such: Japan&apos;s population is the oldest in the world and its crude rates run far above its age-standardised ones.</p>
          </div>
          <div className="card p-5 space-y-2 border-amber-300/60 dark:border-amber-700/50">
            <h2 className="font-semibold text-base">Verify before relying on it</h2>
            <p>Approvals, insurance ceilings and the indications covered for particle therapy all change, and the high-cost medical expense ceilings are being revised in August 2026. Check the <a href={meta.url} className="underline" rel="noopener">PMDA approved drugs list</a>, the <a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html" className="underline" rel="noopener">ministry&apos;s high-cost benefit page</a> and the treating hospital before acting on anything here. Corrections are welcome through the <Link href="/suggest/" className="underline">suggest an edit</Link> form.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
