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
  KR_ASOF, KR_COMPANIES, KR_DOING, KR_DRUGS, KR_GAPS, KR_INCIDENCE, KR_INSTITUTIONS, KR_PAPERS, KR_PAYING, KR_PEOPLE,
  KR_PROFILE, KR_REGISTRY, KR_REGULATOR, KR_SCREENING, KR_SURVIVAL, KR_TRIALS, KR_TRIAL_APPROVALS, type CountryCard,
} from "@/data/country-kr";

export const metadata: Metadata = pageMeta({
  title: "Cancer in South Korea",
  description: "South Korea deep dive read from Korean sources: the national cancer registry's 2023 figures, the thyroid cancer surge and its reversal, stomach and liver cancer falling fastest, the 5 per cent co-payment for registered cancer patients, HIRA's unwritten cost-effectiveness threshold and published range, risk-sharing contracts, MFDS and trial approvals, and national screening with endoscopy every two years from 40.",
  path: "/countries/kr/",
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
const INCIDENCE_COLUMNS: StaticColumn[] = [
  { key: "site", label: "Site" },
  { key: "cases", label: "New cases, 2023", sortable: true, numeric: true, className: "text-right" },
  { key: "share", label: "Share %", sortable: true, numeric: true, className: "text-right" },
  { key: "asr", label: "Rate (Korean standard)", sortable: true, numeric: true, className: "text-right" },
  { key: "pages", label: "OnCo cancer page" },
];
const SURVIVAL_COLUMNS: StaticColumn[] = [
  { key: "site", label: "Site" },
  { key: "s9395", label: "1993-95", sortable: true, numeric: true, className: "text-right" },
  { key: "s0105", label: "2001-05", sortable: true, numeric: true, className: "text-right" },
  { key: "s1923", label: "2019-23", sortable: true, numeric: true, className: "text-right" },
  { key: "loc", label: "Localised: share / survival", sortable: true, numeric: true, className: "text-right" },
  { key: "dist", label: "Distant: share / survival", sortable: true, numeric: true, className: "text-right" },
];
const SCREENING_COLUMNS: StaticColumn[] = [
  { key: "cancer", label: "Cancer" },
  { key: "who", label: "Who is invited" },
  { key: "interval", label: "How often" },
  { key: "test", label: "Test" },
];
const TRIAL_COLUMNS: StaticColumn[] = [
  { key: "year", label: "Year", sortable: true, numeric: true },
  { key: "total", label: "All drug trials approved", sortable: true, numeric: true, className: "text-right" },
  { key: "oncology", label: "Anticancer", sortable: true, numeric: true, className: "text-right" },
  { key: "multinational", label: "Multinational", sortable: true, numeric: true, className: "text-right" },
  { key: "investigator", label: "Investigator-led", sortable: true, numeric: true, className: "text-right" },
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

export default function SouthKoreaPage() {
  const g = graph();
  const pick = (ids: string[], kind?: Kind): Entity[] => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e && (!kind || e.kind === kind));
  const institutions = pick(KR_INSTITUTIONS, "institution");
  const companies = pick(KR_COMPANIES, "company");
  const drugs = pick(KR_DRUGS, "drug");
  const trials = pick(KR_TRIALS, "trial");
  const papers = pick(KR_PAPERS, "paper");
  const people = pick(KR_PEOPLE, "person");
  const pages = (ids: string[]) => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e).map((e) => ({ text: e.name, href: routeFor(e), className: "underline" }));

  const allInstitutions = g.kind("institution").filter((i) => i.country === "KR").length;
  const allCompanies = g.kind("company").filter((c) => c.country === "KR").length;

  const profile = sitesForCountry(GLOBOCAN, "KOR");
  const all = profile ? GLOBOCAN.countries.KOR?.data?.["39"] : undefined;
  const topSites = profile ? profile.sites.filter((s) => s.cases !== null).slice(0, 14) : [];
  const extra = countryExtras.KR;
  const siteRows: StaticRow[] = topSites.map((s) => ({
    id: String(s.code),
    site: s.label,
    cases: num(s.cases), deaths: num(s.deaths), incAsr: num(s.incAsr, 1), mortAsr: num(s.mortAsr, 1),
    pages: pages(s.oncoIds),
  }));

  const incidenceRows: StaticRow[] = KR_INCIDENCE.map((r) => ({
    id: r.id, site: r.site, cases: num(r.cases), share: num(r.share, 1), asr: num(r.asrKorea, 1), pages: pages(r.cancerIds),
  }));
  const survivalRows: StaticRow[] = KR_SURVIVAL.map((r) => ({
    id: r.id, site: r.site, s9395: num(r.s9395, 1), s0105: num(r.s0105, 1), s1923: num(r.s1923, 1),
    loc: { text: `${r.locShare.toFixed(1)}% / ${r.locSurv.toFixed(1)}%`, v: r.locSurv },
    dist: { text: `${r.distShare.toFixed(1)}% / ${r.distSurv.toFixed(1)}%`, v: r.distSurv },
  }));
  const screeningRows: StaticRow[] = KR_SCREENING.map((r) => ({ id: r.id, cancer: r.cancer, who: r.who, interval: r.interval, test: r.test }));
  const maxTrials = Math.max(...KR_TRIAL_APPROVALS.map((r) => r.oncology));
  const trialRows: StaticRow[] = KR_TRIAL_APPROVALS.map((r) => ({
    id: String(r.year),
    year: { text: String(r.year), v: r.year },
    total: num(r.total), oncology: num(r.oncology), multinational: num(r.multinational), investigator: num(r.investigator),
    bar: [{ text: "▉".repeat(Math.max(1, Math.round((r.oncology / maxTrials) * 20))), className: "text-accent" }],
  }));

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title="🇰🇷 Cancer in South Korea"
        lede={`A country of about ${extra.population.toLocaleString("en-GB")} million people with a national cancer registry since 1999, one public insurer, a 5 per cent co-payment for anyone with a registered cancer, and free screening that offers every adult from 40 a stomach endoscopy every two years. Its thyroid cancer rate rose by 22 per cent a year to 2011 with screening and then fell, and its registry reports the lowest ratio of deaths to diagnoses among major high-income countries for stomach, bowel and breast cancer. This page was written from Korean sources: the National Cancer Center's statistics, the insurer's and the regulator's own pages, and the registry's annual paper. Facts checked ${KR_ASOF}; every card links its sources, and what could not be sourced is listed at the end.`}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {[["#profile", "Cancer profile"], ["#registry", "The registry"], ["#paying", "Paying for care"], ["#regulator", "Regulator and trials"], ["#doing", "What Korea does differently"], ["#recruiting", "Recruiting here"], ["#institutions", "Institutions"], ["#corpus", "In the corpus"], ["#gaps", "Gaps"]].map(([h, l]) => <a key={h} href={h} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        <Section id="profile" title="Cancer profile" aside={<span className="text-sm text-muted">Korea Central Cancer Registry figures in the cards and first two tables; GLOBOCAN {GLOBOCAN.year} estimates in the last</span>}>
          <Cards cards={KR_PROFILE} />
          <div className="mt-6 card p-5">
            <h3 className="font-semibold mb-3">The ten commonest cancers in Korea, 2023 (national registry)</h3>
            <StaticTable rows={incidenceRows} columns={INCIDENCE_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
            <p className="mt-3 text-xs text-muted">Source: National Cancer Center, <a href="https://www.cancer.go.kr/lay1/S1T639C641/contents.do" className="underline" rel="noopener">암종별 발생 현황</a>. All malignant cancers: 288,613; excluding thyroid: 253,173. The rate is per 100,000, age-standardised to Korea&apos;s 2020 population, so it is higher than and not comparable with the world-standard rates in the GLOBOCAN table below.</p>
          </div>
          <div className="mt-6 card p-5">
            <h3 className="font-semibold mb-3">Five-year relative survival (%), by period of diagnosis and by stage</h3>
            <StaticTable rows={survivalRows} columns={SURVIVAL_COLUMNS} noun="sites" defaultSort={{ key: "s1923", dir: -1 }} />
            <p className="mt-3 text-xs text-muted">Source: National Cancer Center, <a href="https://www.cancer.go.kr/lay1/S1T648C650/contents.do" className="underline" rel="noopener">5년 상대생존율</a> and <a href="https://www.cancer.go.kr/lay1/S1T648C652/contents.do" className="underline" rel="noopener">요약병기별 생존율</a>. Stage columns are for cases diagnosed 2019 to 2023: the share of cases found localised or with distant spread, and the five-year relative survival of each. Relative survival above 100 per cent means survival no different from, or slightly above, people of the same age without the cancer.</p>
          </div>
          {profile && all && (
            <div className="mt-6 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Leading cancers in South Korea, GLOBOCAN {GLOBOCAN.year}</h3>
                <span className="text-xs text-muted">All cancers, C00-97, including non-melanoma skin: {fmt(all[0])} new cases, {fmt(all[2])} deaths; age-standardised incidence {fmt1(all[1])} and mortality {fmt1(all[3])} per 100,000; cumulative risk to 74: {fmt1(all[4])}%.</span>
              </div>
              <StaticTable rows={siteRows} columns={SITE_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
              <p className="mt-3 text-xs text-muted">Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>. ASR = age-standardised rate per 100,000 (World standard). These are modelled estimates for {GLOBOCAN.year}, not the Korean registry&apos;s counts: the registry counted 281,317 new cancers in 2022 and 288,613 in 2023, and a world-standard rate of 288.6 for 2023. Compare countries on the <Link href="/cases/" className="underline">cases by country</Link> page.</p>
            </div>
          )}
        </Section>

        <Section id="registry" title="The registry: what it counts and how to read it">
          <Cards cards={KR_REGISTRY} />
        </Section>

        <Section id="paying" title="Who pays: one insurer, 5 per cent for cancer, and a value test without a written threshold">
          <Cards cards={KR_PAYING} />
        </Section>

        <Section id="regulator" title="The regulator and the trials">
          <Cards cards={KR_REGULATOR} />
          <div className="mt-6 card p-5">
            <h3 className="font-semibold mb-3">Drug trials approved by MFDS, 2021 to 2025</h3>
            <StaticTable rows={trialRows} columns={TRIAL_COLUMNS} noun="years" defaultSort={{ key: "year", dir: 1 }} />
            <p className="mt-3 text-xs text-muted">Source: MFDS press releases of <a href="https://www.mfds.go.kr/brd/m_99/view.do?seq=48944" className="underline" rel="noopener">28 March 2025</a> and <a href="https://www.mfds.go.kr/brd/m_99/view.do?seq=49738" className="underline" rel="noopener">6 March 2026</a>, read from their attached PDFs. Bioequivalence studies excluded. The bar is the anticancer count.</p>
          </div>
        </Section>

        <Section id="doing" title="What Korea does that others do not">
          <Cards cards={KR_DOING} />
          <div className="mt-6 card p-5">
            <h3 className="font-semibold mb-3">The National Cancer Screening Program</h3>
            <StaticTable rows={screeningRows} columns={SCREENING_COLUMNS} noun="cancers" />
            <p className="mt-3 text-xs text-muted">Source: National Cancer Center, <a href="https://www.cancer.go.kr/lay1/S1T261C262/contents.do" className="underline" rel="noopener">국가 암 검진사업</a>. Invitations are sent by the National Health Insurance Service. Thyroid cancer is not part of the programme.</p>
          </div>
          {drugs.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Korean-developed products in the corpus</h3>
              <Grid items={drugs} />
            </div>
          )}
        </Section>

        <CountryTrialsSection iso2="KR" />

        <Section id="institutions" title="The institutions">
          <Grid items={institutions} />
          <p className="mt-3 text-sm text-muted">{allInstitutions} South Korean institutions in the corpus · <Link href="/institutions/" className="underline">map and ranking</Link></p>
        </Section>

        <Section id="corpus" title="Companies, trials, papers and people in the corpus" aside={<span className="text-sm text-muted">{allCompanies} South Korean companies · <Link href="/companies/" className="underline">all companies</Link></span>}>
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
          <Cards cards={KR_GAPS} />
        </Section>

        <section className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this page is built</h2>
            <p>The cards are hand-written from the linked sources and dated {KR_ASOF}. Korean-language sources are cited with their Korean titles and an English gloss, because that is how a reader will find them again. The entity lists are pulled live from the corpus by id, so a new Korean trial, company or person added anywhere in OnCo appears here once listed in <code>src/data/country-kr.ts</code>. Burden figures in the last profile table come from the GLOBOCAN {GLOBOCAN.year} data file used across the site; the Korean registry&apos;s own figures differ and are quoted with their year and standard population.</p>
          </div>
          <div className="card p-5 space-y-2 border-amber-300/60 dark:border-amber-700/50">
            <h2 className="font-semibold text-base">Verify before relying on it</h2>
            <p>Co-payment rules, reimbursement criteria and screening eligibility change. Check the <a href="https://www.nhis.or.kr" className="underline" rel="noopener">National Health Insurance Service</a>, <a href="https://www.hira.or.kr" className="underline" rel="noopener">HIRA</a>, the <a href="https://www.cancer.go.kr" className="underline" rel="noopener">national cancer information centre</a> (1577-8899) and the treating hospital before acting on anything here. Corrections are welcome through the <Link href="/suggest/" className="underline">suggest an edit</Link> form.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
