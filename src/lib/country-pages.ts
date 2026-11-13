import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "./graph";
import { GLOBOCAN, sitesForCountry, CONTINENT, type Cell, type CountrySite } from "./globocan";
import { methodMeaning } from "./globocan-methods";
import type { Entity, Trial } from "./schema";
import { CTGOV_COUNTRY, DISPLAY_NAME, EU_MEMBERS, ISO3_TO_ISO2, PART_OF } from "@/data/country-codes";
import { countryExtras, type CountryExtra } from "@/data/country-extras";
import { regionalApprovals } from "@/data/regional-approvals";

/**
 * Every country in GLOBOCAN gets a page at /countries/<iso2>/. Some have a deep dive written by hand
 * (src/app/countries/<iso2>/page.tsx, each with a search line in COUNTRY_PAGES below); the rest are generated here from data the corpus already holds, with no
 * hand-written claim: IARC's GLOBOCAN estimates, the trials whose ClinicalTrials.gov capture lists a site in the
 * country, the institutions, companies and people recorded there, the approvals rows that cover it, its
 * country-extras row, and the screening, vaccination and law records named for it. Server-only (it reads the app
 * directory and the coverage proposal from disk at build time, as src/lib/sitemap-urls.ts does).
 *
 * A deep dive always wins: the dynamic route (src/app/countries/[iso]/page.tsx) generates only the codes with no
 * folder of their own, so adding a deep dive removes the automatic page in the same build.
 */

const COUNTRIES_DIR = join(process.cwd(), "src", "app", "countries");

/** Upper-case alpha-2 codes of the hand-written deep dives: the two-letter folders under src/app/countries with a page. */
export function deepDiveCodes(dir = COUNTRIES_DIR): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name) && existsSync(join(dir, d.name, "page.tsx")))
    .map((d) => d.name.toUpperCase()).sort();
}

export const countryRoute = (iso2: string) => `/countries/${iso2.toLowerCase()}/`;

/** Anchor of a GLOBOCAN entry shown inside another country's page (France's overseas departments on /countries/fr/). */
export const partAnchor = (iso2: string) => `overseas-${iso2.toLowerCase()}`;

/** Where a country's page lives: its own route, or the section of the page it belongs to (PART_OF). */
export function countryPageFor(iso2: string): string {
  const code = iso2.toUpperCase();
  const parent = PART_OF[code];
  return parent ? `${countryRoute(parent)}#${partAnchor(code)}` : countryRoute(code);
}

/** The GLOBOCAN entries shown as a section of a parent country's page, in name order. */
export function partsOf(parentIso2: string): string[] {
  return Object.entries(PART_OF).filter(([, p]) => p === parentIso2).map(([c]) => c).sort((a, b) => countryName(a).localeCompare(countryName(b), "en"));
}

/** The flag emoji for an alpha-2 code, built from the two regional-indicator letters. */
export const flagOf = (iso2: string) => String.fromCodePoint(...[...iso2.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

const ISO2_TO_ISO3: Record<string, string> = Object.fromEntries(Object.entries(ISO3_TO_ISO2).map(([a3, a2]) => [a2, a3]));

/** Reading name: the short form where IARC's is formal or inverted, otherwise IARC's own. */
export function countryName(iso2: string): string {
  const iso3 = ISO2_TO_ISO3[iso2];
  return DISPLAY_NAME[iso2] ?? (iso3 ? GLOBOCAN.countries[iso3]?.name : undefined) ?? countryExtras[iso2]?.name ?? iso2;
}

export type CountryRef = { iso2: string; iso3?: string; name: string; region: string; deepDive: boolean; route: string; cases: number | null; /** Entries shown on this page rather than their own (France's overseas departments). */ parts?: Array<{ iso2: string; name: string; route: string }> };

let indexCache: CountryRef[] | null = null;
/** Every country with a page: the GLOBOCAN countries (less the PART_OF entries, listed under their parent) and any deep dive outside GLOBOCAN (Taiwan), by name. */
export function countryIndex(): CountryRef[] {
  if (indexCache) return indexCache;
  const dives = new Set(deepDiveCodes());
  const out: CountryRef[] = [];
  for (const [iso3, c] of Object.entries(GLOBOCAN.countries)) {
    if (iso3 === "WORLD") continue;
    const iso2 = ISO3_TO_ISO2[iso3];
    if (!iso2 || PART_OF[iso2]) continue;
    out.push({ iso2, iso3, name: countryName(iso2), region: CONTINENT[c.region] ?? c.region, deepDive: dives.has(iso2), route: countryRoute(iso2), cases: c.data["39"]?.[0] ?? null });
  }
  const seen = new Set(out.map((r) => r.iso2));
  // A deep dive with no GLOBOCAN row (Taiwan) is listed under Asia, where IARC's regions would put it.
  for (const iso2 of dives) if (!seen.has(iso2)) out.push({ iso2, name: countryName(iso2), region: "Asia", deepDive: true, route: countryRoute(iso2), cases: null });
  for (const r of out) { const parts = partsOf(r.iso2); if (parts.length) r.parts = parts.map((x) => ({ iso2: x, name: countryName(x), route: countryPageFor(x) })); }
  indexCache = out.sort((a, b) => a.name.localeCompare(b.name, "en"));
  return indexCache;
}

/** Alpha-2 codes of the GLOBOCAN countries that have no deep dive: the automatic pages. */
export function autoCountryCodes(): string[] {
  return countryIndex().filter((c) => !c.deepDive && c.iso3).map((c) => c.iso2);
}

// ---------------------------------------------------------------- trials

let trialsByCountry: Map<string, Trial[]> | null = null;
/** Trial records whose ClinicalTrials.gov capture lists at least one site in the country, keyed by alpha-2. */
export function trialsIn(iso2: string): Trial[] {
  if (!trialsByCountry) {
    trialsByCountry = new Map();
    for (const t of graph().kind("trial")) {
      const codes = new Set<string>();
      for (const p of t.participation ?? []) for (const n of p.countries ?? []) { const c = CTGOV_COUNTRY[n]; if (c) codes.add(c); }
      for (const c of codes) { const list = trialsByCountry.get(c) ?? []; list.push(t); trialsByCountry.set(c, list); }
    }
    const recruiting = (t: Trial) => (t.participation ?? []).some((p) => p.overallStatus === "RECRUITING");
    const updated = (t: Trial) => (t.participation ?? []).map((p) => p.lastUpdatePosted ?? "").sort().at(-1) ?? "";
    for (const list of trialsByCountry.values()) list.sort((a, b) => Number(recruiting(b)) - Number(recruiting(a)) || updated(b).localeCompare(updated(a)) || a.name.localeCompare(b.name));
  }
  return trialsByCountry.get(iso2) ?? [];
}

// ---------------------------------------------------------------- programmes and laws

/** Phrases that contain a country name without being about that country. */
const NOT_THE_COUNTRY = ["Northern Ireland", "New Mexico", "Papua New Guinea", "Equatorial Guinea", "Guinea-Bissau"];

/** Every name a record could use for the country: the reading name, IARC's name and ClinicalTrials.gov's. */
export function countryAliases(iso2: string): string[] {
  const iso3 = ISO2_TO_ISO3[iso2];
  const names = [countryName(iso2), iso3 ? GLOBOCAN.countries[iso3]?.name : undefined, ...Object.entries(CTGOV_COUNTRY).filter(([, c]) => c === iso2).map(([n]) => n), countryExtras[iso2]?.name];
  // "Turkey (Türkiye)" is ClinicalTrials.gov's; records write either word.
  const extra = iso2 === "TR" ? ["Turkey", "Türkiye"] : [];
  return [...new Set([...names, ...extra].filter((n): n is string => !!n))];
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Does a record name mention the country as a whole word, outside the phrases that only contain its name? */
export function namesCountry(name: string, iso2: string): boolean {
  let text = name;
  for (const p of NOT_THE_COUNTRY) if (!countryAliases(iso2).includes(p)) text = text.split(p).join(" ");
  return countryAliases(iso2).some((a) => new RegExp(`(?<![\\p{L}])${escape(a)}(?![\\p{L}])`, "u").test(text));
}

const PROGRAMME_TAGS = ["screening-programme", "vaccination-programme"] as const;
/**
 * Screening and vaccination programme records and law records named for one country. The census fill rounds name
 * each national record for its country ("Cervical cancer screening programme in Myanmar"); the records that cover
 * many countries at once are named "by country" and are left out.
 */
export function countryRecords(iso2: string): { programmes: Entity[]; laws: Entity[] } {
  const g = graph();
  const pick = (tags: readonly string[]) => g.entities.filter((e) => e.kind === "term" && e.tags.some((t) => tags.includes(t)) && !/\bby country\b/i.test(e.name) && namesCountry(e.name, iso2));
  return { programmes: pick(PROGRAMME_TAGS), laws: pick(["law"]) };
}

// ---------------------------------------------------------------- the deep-dive queue

export const QUEUE_DOC = "docs/proposals/country-coverage-2026-11.md";
export const QUEUE_URL = `https://github.com/judegomila/OnCo/blob/main/${QUEUE_DOC}`;

let queueCache: { ranks: Map<string, number>; size: number } | null = null;
/** Ranks from the coverage proposal's table of countries without a page (its "Rank" and "ISO" columns). */
export function deepDiveQueue(): { ranks: Map<string, number>; size: number } {
  if (queueCache) return queueCache;
  const ranks = new Map<string, number>();
  const file = join(process.cwd(), QUEUE_DOC);
  if (existsSync(file)) {
    const text = readFileSync(file, "utf8");
    const start = text.indexOf("## The 60 highest-ranked countries without a page");
    const end = start < 0 ? -1 : text.indexOf("\n## ", start + 4);
    const section = start < 0 ? "" : text.slice(start, end < 0 ? undefined : end);
    for (const m of section.matchAll(/^\|\s*(\d+)\s*\|[^|]+\|\s*([A-Z]{2})\s*\|/gm)) ranks.set(m[2], Number(m[1]));
  }
  queueCache = { ranks, size: ranks.size };
  return queueCache;
}

// ---------------------------------------------------------------- the page

export type MethodNote = { code?: string; meaning: string | null; neighbours: boolean };

export type AutoCountry = {
  iso2: string; iso3: string; name: string; globocanName: string; flag: string;
  region: string; area: string; hdi?: string; income?: string; whoRegion?: string; pop?: number;
  /** All cancers (code 39): [new cases, incidence ASR, deaths, mortality ASR, cumulative risk to 74]. */
  all: Cell | null;
  methodInc: MethodNote; methodMort: MethodNote;
  byIncidence: CountrySite[]; byMortality: CountrySite[];
  trials: Trial[]; recruiting: number;
  institutions: Entity[]; companies: Entity[]; people: Entity[];
  /** Products with an EU centralised authorisation row (approved or conditional), for EU member states. */
  euApproved: number | null;
  extras: CountryExtra | null;
  programmes: Entity[]; laws: Entity[];
  queueRank: number | null; queueSize: number;
};

/** IARC method codes built from other countries' data: incidence 5 (neighbours' rates) and 3b (neighbours' registries). */
const NEIGHBOUR_CODES = new Set(["5", "3b"]);

const TOP = 10;

export function autoCountry(iso2: string): AutoCountry | null {
  const code = iso2.toUpperCase();
  const iso3 = ISO2_TO_ISO3[code];
  const c = iso3 ? GLOBOCAN.countries[iso3] : undefined;
  if (!iso3 || !c) return null;
  const g = graph();
  const profile = sitesForCountry(GLOBOCAN, iso3);
  const sites = (profile?.sites ?? []).filter((s) => s.label !== "Non-melanoma skin cancer");
  const byIncidence = sites.filter((s) => (s.cases ?? 0) > 0).slice(0, TOP);
  const byMortality = sites.filter((s) => (s.deaths ?? 0) > 0).sort((a, b) => (b.deaths ?? 0) - (a.deaths ?? 0)).slice(0, TOP);
  const trials = trialsIn(code);
  const institutions = g.kind("institution").filter((e) => e.country === code);
  const companies = g.kind("company").filter((e) => e.country === code);
  const people = g.kind("person").filter((p) => { const id = (p as { institutionId?: string }).institutionId; const a = id ? (g.get(id) as { country?: string } | undefined) : undefined; return a?.country === code; });
  const euApproved = EU_MEMBERS.has(code) ? g.kind("drug").filter((d) => { const r = regionalApprovals[d.id]?.EU; return !!r && (r.status === "approved" || r.status === "conditional"); }).length : null;
  const { programmes, laws } = countryRecords(code);
  const queue = deepDiveQueue();
  const note = (metric: "inc" | "mort", m?: string): MethodNote => ({ code: m || undefined, meaning: methodMeaning(metric, m || undefined, GLOBOCAN.year), neighbours: !!m && NEIGHBOUR_CODES.has(m) });
  return {
    iso2: code, iso3, name: countryName(code), globocanName: c.name, flag: flagOf(code),
    region: CONTINENT[c.region] ?? c.region, area: c.area, hdi: c.hdi, income: c.income, whoRegion: c.whoRegion, pop: c.pop,
    all: c.data["39"] ?? null,
    methodInc: note("inc", c.methodInc), methodMort: note("mort", c.methodMort),
    byIncidence, byMortality,
    trials, recruiting: trials.filter((t) => (t.participation ?? []).some((p) => p.overallStatus === "RECRUITING")).length,
    institutions, companies, people,
    euApproved,
    extras: countryExtras[code] ?? null,
    programmes, laws,
    queueRank: queue.ranks.get(code) ?? null, queueSize: queue.size,
  };
}

/** The machine-readable twin of an automatic page, written to /api/v1/countries/<iso2>.json by scripts/build-api.ts. */
export function autoCountryJson(iso2: string) {
  const a = autoCountry(iso2);
  if (!a) return null;
  const site = (s: CountrySite) => ({ code: s.code, label: s.label, newCases: s.cases, incidenceAsr: s.incAsr, deaths: s.deaths, mortalityAsr: s.mortAsr, oncoCancers: s.oncoIds });
  const ref = (e: Entity) => ({ id: e.id, kind: e.kind, name: e.name });
  return {
    iso2: a.iso2, iso3: a.iso3, name: a.name, route: countryRoute(a.iso2), deepDive: false,
    globocan: {
      edition: GLOBOCAN.year, name: a.globocanName, citation: GLOBOCAN.citation, source: GLOBOCAN.sourceUrl, fetched: GLOBOCAN.fetched,
      population: a.pop ?? null, region: a.region, area: a.area, hdi: a.hdi ?? null, income: a.income ?? null,
      allCancers: a.all ? { newCases: a.all[0], incidenceAsr: a.all[1], deaths: a.all[2], mortalityAsr: a.all[3], cumulativeRisk74: a.all[4] } : null,
      method: { incidence: a.methodInc, mortality: a.methodMort },
      topByIncidence: a.byIncidence.map(site), topByMortality: a.byMortality.map(site),
    },
    trials: { count: a.trials.length, recruitingOverall: a.recruiting, ids: a.trials.map((t) => t.id) },
    institutions: a.institutions.map(ref), companies: a.companies.map(ref), people: a.people.map(ref),
    euCentralisedApprovals: a.euApproved,
    countryExtras: a.extras,
    programmes: a.programmes.map(ref), laws: a.laws.map(ref),
    deepDiveQueue: { rank: a.queueRank, of: a.queueSize, source: QUEUE_URL },
  };
}

/** /api/v1/countries.json: every country with a page, deep dive or automatic. */
export function countryIndexJson() {
  return { edition: GLOBOCAN.year, countries: countryIndex().map((c) => ({ iso2: c.iso2, iso3: c.iso3 ?? null, name: c.name, region: c.region, deepDive: c.deepDive, route: c.route, newCases: c.cases, json: c.deepDive ? null : `/api/v1/countries/${c.iso2.toLowerCase()}.json`, parts: c.parts ?? [] })) };
}

// ---------------------------------------------------------------- the deep dives' search lines

/**
 * One line per country deep dive (/countries/<code>/), so a search for a country's name reaches its page. The search
 * index (src/lib/search-index.ts) reads this; the site menu does not. The menu used to list every deep dive with this
 * line under it, and because the menu is in the root layout, about 37 KB of country descriptions shipped with every
 * page on the site and grew with each country added. The menu now has one "Countries" entry; /countries/ lists every
 * country with a name filter and a deep-dives-only switch. Keep this module out of the layout's imports: it also
 * reads the disk and the graph.
 *
 * Add a new country page's line at the end; src/lib/country-pages.test.ts fails if a country page has no line here.
 */
export type CountryPage = { href: string; label: string; blurb: string };

export const COUNTRY_PAGES: CountryPage[] = [
  { href: "/countries/us/", label: "United States deep dive", blurb: "What the United States is up to: who pays and what it costs a person, the FDA, why coverage is not approval, the NCI trial network, and the disparities." },
  { href: "/countries/in/", label: "India deep dive", blurb: "What India is up to: cancer profile, paying for care, CDSCO, institutions, companies, trials and people." },
  { href: "/countries/cn/", label: "China deep dive", blurb: "What China is up to: cancer profile, the NMPA, national insurance listing, institutions, companies, trials and people." },
  { href: "/countries/de/", label: "Germany deep dive", blurb: "What Germany does differently: reimbursement from day one and the benefit assessment that follows, certified cancer centres, mandatory clinical cancer registration, institutions, companies, trials and people." },
  { href: "/countries/il/", label: "Israel deep dive", blurb: "What Israel is up to: the public committee that decides each year which drugs the state pays for, the four health funds, founder genetics and population testing, and the trial and device industry." },
  { href: "/countries/gb/", label: "United Kingdom deep dive", blurb: "What the UK does: four health services under one name, who pays, NICE and the SMC, the trials and the genomics, and what the figures say it does badly." },
  { href: "/countries/fr/", label: "France deep dive", blurb: "What France does: cancer paid in full as a long-term condition, early access before a price is agreed, HAS ratings with no cost-per-QALY threshold, licensed cancer hospitals, the right to be forgotten, national genome sequencing, and a national registry created in 2025." },
  { href: "/countries/ca/", label: "Canada deep dive", blurb: "What Canada does: thirteen provincial and territorial health systems, why a cancer tablet is paid for differently by province, Health Canada, Canada's Drug Agency and joint price negotiation, the national trials group and the registry's gaps." },
  { href: "/countries/it/", label: "Italy deep dive", blurb: "What Italy does: a tax-funded health service run region by region, AIFA's fund for innovative medicines and pay-for-results registries, the 2023 right to be forgotten after cancer, carbon-ion therapy at CNAO, and the Milan trials." },
  { href: "/countries/nl/", label: "Netherlands deep dive", blurb: "What the Netherlands does: a registry read from hospital records, the €20,000 to €80,000 per QALY reference values, the lock that holds expensive cancer drugs until the price falls, DRUP and whole-genome sequencing, and one hospital for every child with cancer." },
  { href: "/countries/kr/", label: "South Korea deep dive", blurb: "What South Korea does: a national cancer registry, one public insurer and a 5 per cent co-payment for cancer, HIRA's value test without a written threshold, endoscopy screening every two years from 40, and the thyroid cancer surge and its reversal." },
  { href: "/countries/au/", label: "Australia deep dive", blurb: "What Australia does: Medicare and the capped PBS script, the PBAC and the TGA, four free screening programmes including lung, the HPV vaccine and venetoclax, institutions, trials and people." },
  { href: "/countries/es/", label: "Spain deep dive", blurb: "What Spain does: a national health service run by the regions, the pricing commission and the 2026 assessment decree, academic CAR-T made by the public system, a trial-heavy country, institutions and people." },
  { href: "/countries/br/", label: "Brazil deep dive", blurb: "What Brazil does: a free public system with private plans for a quarter of people, the 60-day treatment law, CONITEC and the courts, ANVISA's deadlines, mobile screening and a public CAR-T." },
  { href: "/countries/se/", label: "Sweden deep dive", blurb: "What Sweden does: 21 regions and a cap on what a patient pays, TLV and the NT council, a maximum wait for every suspected cancer, linked national registers and screening trials." },
  { href: "/countries/ch/", label: "Switzerland deep dive", blurb: "What Switzerland does: compulsory insurance with a capped share, the Spezialitätenliste and case-by-case payment, Swissmedic's speed, a national registry since 2020, and Basel's drug industry." },
  { href: "/countries/id/", label: "Indonesia deep dive", blurb: "What Indonesia does: national insurance for about 285 million members, a 2024 to 2034 cancer plan, a registry still short of IARC's quality bar, BPOM's 90-day reliance route, screening coverage and the trials." },
  { href: "/countries/pk/", label: "Pakistan deep dive", blurb: "What Pakistan does: seventeen registries and a 2025 law for a national one, the health card schemes, the atomic energy commission's cancer hospitals, DRAP's reliance route and price rules, the HPV campaign and CAR-T made at home." },
  { href: "/countries/tr/", label: "Türkiye deep dive", blurb: "What Türkiye does: a registry in all 81 provinces, one public insurer that charges no extra fee for cancer treatment, confidential reimbursement deals, the regulator's 210-day clock, 318 screening centres and a national HPV test programme." },
  { href: "/countries/bd/", label: "Bangladesh deep dive", blurb: "What Bangladesh does: a hospital registry at the national cancer institute, care paid mostly by households, a drug industry that makes most of the country's own medicines, cervical and breast screening, and why its trials are few." },
  { href: "/countries/ir/", label: "Iran deep dive", blurb: "What Iran does: a national population-based registry, insurers that cap a patient's share of a hospital bill, a fund for hard-to-treat diseases, approval times behind the United States, antibody copies made under sanctions, and free bowel and breast checks." },
  { href: "/countries/mx/", label: "Mexico deep dive", blurb: "What Mexico does: a registry in law since 2017 with no national count yet, free care through IMSS-Bienestar, the national formulary and its economic evaluation, COFEPRIS's 45-day reliance route, and how many women screening reaches." },
  { href: "/countries/eg/", label: "Egypt deep dive", blurb: "What Egypt does: universal health insurance in six governorates with no charge for cancer care, treatment at state expense, one authority buying medicines, a research law limiting foreign drugs to late-phase trials, and mass hepatitis C testing." },
  { href: "/countries/pl/", label: "Poland deep dive", blurb: "What Poland does: a national registry, cancer medicines free to the patient, the fast-track cancer card and the National Oncology Network, the assessment agency, emergency access to unreimbursed medicines, and new lung screening." },
  { href: "/countries/ng/", label: "Nigeria deep dive", blurb: "What Nigeria does: a 2022 law making health insurance compulsory while most cancer care is paid out of pocket, the Cancer Health Fund, NAFDAC's reliance route, HPV-based cervical screening and 15 working radiotherapy machines." },
  { href: "/countries/th/", label: "Thailand deep dive", blurb: "What Thailand does: the gold card and Cancer Anywhere, the R2 list for expensive cancer medicines, cost-effectiveness evidence behind the national medicines list, liver and bile duct cancer in the north-east, and free bowel and cervical screening." },
  { href: "/countries/vn/", label: "Viet Nam deep dive", blurb: "What Viet Nam does: social health insurance for more than 95 per cent of people, a medicines list that asks for cost-effectiveness evidence, a 2026 screening plan built on HPV testing, and HPV vaccine in national immunisation from July 2026." },
  { href: "/countries/ph/", label: "Philippines deep dive", blurb: "What the Philippines does: a 2019 cancer law that makes cancer notifiable and gives people with cancer the rights of persons with disabilities, PhilHealth packages for five cancers, and outpatient screening tests paid for since 2025." },
  { href: "/countries/et/", label: "Ethiopia deep dive", blurb: "What Ethiopia does: one city registry behind the national estimate, chemotherapy at 30 hospitals under the 2025 to 2029 plan, cervical screen-and-treat in more than 1,500 facilities, and community insurance covering about 65 million people." },
  { href: "/countries/za/", label: "South Africa deep dive", blurb: "What South Africa does: counts cancer through laboratory reports linked to HIV test records, obliges medical schemes to pay for listed cancer care, and waits on the courts for national health insurance." },
  { href: "/countries/co/", label: "Colombia deep dive", blurb: "What Colombia does: an audited insurers' cancer cohort showing lower survival in the subsidised regime, MIPRES and the tutela for care outside the benefit plan, price ceilings for medicines, and imatinib declared a matter of public interest." },
  { href: "/countries/ar/", label: "Argentina deep dive", blurb: "What Argentina does: insurers must pay in full for cancer medicines under approved protocols, a public drug bank supplies people with public cover only, a 2022 law gives children with cancer full cover, and deaths, not new cases, are counted nationally." },
  { href: "/countries/ua/", label: "Ukraine deep dive", blurb: "What Ukraine does: keeps a national cancer registry running through the war and says what it can no longer count, buys expensive cancer medicines centrally under confidential price deals, and fast-tracks medicines approved by trusted regulators." },
  { href: "/countries/ro/", label: "Romania deep dive", blurb: "What Romania does: a cancer plan passed as a law, with rights to psycho-oncology, fertility support and a food allowance, a points scale tying reimbursement to other countries' decisions, and a 2023 national registry that has yet to publish." },
  { href: "/countries/my/", label: "Malaysia deep dive", blurb: "What Malaysia does: one national registry, public hospital care for a nominal fee with medicines set by one formulary, reliance routes at the regulator, and a cancer drug list for private insurance. Of staged cancers, 64.8 per cent are found at stage III or IV." },
  { href: "/countries/dz/", label: "Algeria deep dive", blurb: "What Algeria does: registries that counted 51,095 new cancers in 2022, free care in public hospitals, social security paying in full for cancer as a long-term illness, specialised anti-cancer centres, and radiotherapy waits patients' groups still call long." },
  { href: "/countries/tw/", label: "Taiwan deep dive", blurb: "What Taiwan does: a registry made compulsory by the 2003 Cancer Control Act, no co-payments for cancer under a catastrophic illness certificate, a 2025 fund for new cancer medicines, and low-dose CT screening for people with a family history of lung cancer." },
  { href: "/countries/be/", label: "Belgium deep dive", blurb: "What Belgium does: a national registry that counted 78,697 new cancers in 2024, compulsory insurance with a yearly cap on what a household pays, an early access route opened in 2026, three regional screening systems with very different coverage, and complex cancer surgery concentrated in reference centres." },
  { href: "/countries/ma/", label: "Morocco deep dive", blurb: "What Morocco does: city registries behind the national estimate, two national cancer plans from the health ministry and the Fondation Lalla Salma, health cover widened to about 89 per cent of people, a new medicines agency, and an HPV vaccine introduced in 2022." },
  { href: "/countries/iq/", label: "Iraq deep dive", blurb: "What Iraq does: a national registry kept by the Iraqi Cancer Board, a 2020 health insurance law that exempts people with cancer from every fee and co-payment, a fast-track route for medicines approved by trusted regulators, and a separate medicines agency in the Kurdistan Region." },
  { href: "/countries/pe/", label: "Peru deep dive", blurb: "What Peru does: a 2021 cancer law that enrols any uninsured cancer patient in the public insurer, a fund that pays for seven cancers from diagnosis, a 45-day route for medicines registered in high-surveillance countries, HPV-test cervical screening and HPV vaccine for boys and girls." },
  { href: "/countries/mm/", label: "Myanmar deep dive", blurb: "What Myanmar has: two regional registries behind the national estimate, households paying about 71 per cent of health spending out of pocket, single-dose HPV vaccination of girls since 2020, nine radiotherapy centres, and what the conflict since 2021 has done to reaching care." },
  { href: "/countries/cl/", label: "Chile deep dive", blurb: "What Chile does: GES guarantees with maximum waits for 17 cancers, the Ricarte Soto law for high-cost treatment, a 2020 cancer law and a right to be forgotten, a three-month route for medicines approved by stringent regulators, and preventive gallbladder surgery as a guarantee." },
  { href: "/countries/pt/", label: "Portugal deep dive", blurb: "What Portugal does: one national cancer registry since 2018, cancer care free in the national health service, a mean 748 days from EU approval to a funding decision for sampled cancer medicines, three screening programmes with very different reach, and a cancer strategy to 2030." },
  { href: "/countries/gr/", label: "Greece deep dive", blurb: "What Greece does: a registry of cancer patients founded in 2024 that has yet to publish figures, one public insurer with about a third of health spending paid out of pocket, more than 550 days from EU authorisation to reimbursement, and free screening by text message under Prolamvano since 2024." },
  { href: "/countries/ke/", label: "Kenya deep dive", blurb: "What Kenya does: two city registries behind the national estimate, a 2012 law that makes cancer notifiable, a Social Health Authority oncology package of up to KES 400,000 a year at certified centres, single-dose HPV vaccination of girls, and ten radiotherapy centres." },
  { href: "/countries/cz/", label: "Czechia deep dive", blurb: "What Czechia does: a national registry that counted 102,027 cancers in 2024, a yearly cap on medicine co-payments, temporary reimbursement for highly innovative medicines, 16 comprehensive cancer centres, and screening for five cancers including lung and prostate." },
  { href: "/countries/sd/", label: "Sudan deep dive", blurb: "What Sudan does: one published registry report, for Khartoum in 2009 and 2010; cancer care broken by the war since April 2023; radiotherapy down to one working centre by September 2025; IAEA equipment to restore it; and no HPV vaccine yet." },
  { href: "/countries/cd/", label: "DR Congo deep dive", blurb: "What the Democratic Republic of the Congo does: no cancer registry, so IARC estimates from neighbouring countries; a national cancer centre created in 2020; one private radiotherapy centre and a public one being financed; the regulator ACOREP; and HPV vaccine planned for 2026." },
  { href: "/countries/hu/", label: "Hungary deep dive", blurb: "What Hungary does: a national registry that counted 69,058 new cancers in 2023, one public insurer with a case-by-case route to medicines it does not reimburse, a medicines authority reorganised in November 2026, and low-dose CT lung screening." },
  { href: "/countries/at/", label: "Austria deep dive", blurb: "What Austria does: a national registry that counted 48,360 new cancers in 2024, a cancer framework programme for 2026 to 2035, a national board for costly hospital medicines, organised breast screening, and ion therapy at MedAustron." },
  { href: "/countries/tz/", label: "Tanzania deep dive", blurb: "What Tanzania does: five population-based registries that counted 16,516 cancers in 2019 to 2023, a 2023 universal health insurance law, a regulator at WHO maturity level 3, single-dose HPV vaccination, and radiotherapy beyond Dar es Salaam." },
  { href: "/countries/uz/", label: "Uzbekistan deep dive", blurb: "What Uzbekistan does: one national oncology service with 14 regional branches, state medical insurance paying for cancer care from 2027, HPV vaccine coverage of nine in ten girls or more, and radiotherapy machines up from 5 to 19." },
  { href: "/countries/sa/", label: "Saudi Arabia deep dive", blurb: "What Saudi Arabia does: a national registry that reported 27,771 new cancers in 2024 and published its first survival report, free government care for citizens, mammography and FIT screening at 40 to 69, and HPV vaccination since 2022." },
  { href: "/countries/ug/", label: "Uganda deep dive", blurb: "What Uganda does: the Kampala Cancer Registry, counting since 1951, behind the national estimate; the Uganda Cancer Institute and its rebuilt radiotherapy; no national health insurance; a 2026 medicines law; and HPV vaccination since 2015." },
  { href: "/countries/ve/", label: "Venezuela deep dive", blurb: "What Venezuela does: no national count of new cancers since 2014, a 2017 mortality yearbook dated April 2026, free cancer medicines through social security pharmacies set beside reports of shortages, and no HPV vaccine yet." },
  { href: "/countries/lk/", label: "Sri Lanka deep dive", blurb: "What Sri Lanka does: a national registry that counted 35,855 new cancers in 2022, mouth cancer the commonest in men, free state cancer care, and the 2022 economic crisis that left 150 essential medicines out of stock." },
  { href: "/countries/gh/", label: "Ghana deep dive", blurb: "What Ghana does: national health insurance that pays for breast, cervical and four childhood cancers, a trust fund paying for other cancer care from 2026, four radiotherapy machines in the 2026 review, one city registry in Kumasi, and a first nationwide HPV vaccine campaign in October 2025." },
  { href: "/countries/dk/", label: "Denmark deep dive", blurb: "What Denmark does: a cancer registry since 1943, a legal maximum wait of 14 days to investigation with the right to go elsewhere, cancer pathways 80 per cent on time in early 2026, Medicinrådet's risk-sharing deals for hospital cancer drugs, and HPV vaccination back near 90 per cent." },
  { href: "/countries/np/", label: "Nepal deep dive", blurb: "What Nepal does: three population registries in nine districts since 2018, a NPR 100,000 grant for poor patients that goes to more people with cancer than with any of the other seven diseases it covers, free childhood cancer medicines through a WHO platform, and about ten radiotherapy machines against a need of about 30." },
  { href: "/countries/kz/", label: "Kazakhstan deep dive", blurb: "What Kazakhstan does: one electronic register for every cancer patient and a yearly national report (37,038 new cancers in 2023), cancer treatment paid by the state, tests for suspected cancer within 18 working days, free breast, cervical and bowel screening, and HPV vaccine since 2024." },
  { href: "/countries/ec/", label: "Ecuador deep dive", blurb: "What Ecuador does: a Quito cancer registry run by SOLCA since 1984, a 2026 cancer law with a right to be forgotten after cancer, a 0.5% levy on private bank credit that helps fund SOLCA, and HPV vaccination for girls since 2014 and boys since 2024." },
  { href: "/countries/cu/", label: "Cuba deep dive", blurb: "What Cuba does: a national cancer registry since 1964, care free of charge under the Constitution, cancer vaccines and antibodies made at home, HPV vaccination for girls from 2025, and a cervical screening programme that fell from 826,663 women in 2019 to 218,286 in 2024." },
  { href: "/countries/ye/", label: "Yemen deep dive", blurb: "What Yemen does: national figures modelled on neighbouring countries, registries kept in Aden and Hadhramout, cancer care in Sana'a run on WHO and donor medicines, households paying 69% of health spending, no HPV vaccine yet, and a national cancer strategy announced for 2025 to 2030." },
  { href: "/countries/by/", label: "Belarus deep dive", blurb: "What Belarus does: cancer registration dating back to 1953 behind IARC's estimate, tax-funded care free at the point of use, registry studies of thyroid cancer before and after Chernobyl, CAR T-cell therapy made in Belarus, and HPV vaccination from 2025." },
  { href: "/countries/rs/", label: "Serbia deep dive", blurb: "What Serbia does: a national registry that counted 41,472 new cancers in 2024, cancer treatment paid in full by law, 8 of 56 recent cancer medicines available through the insurance fund, some only in limited quantities, free HPV vaccine for girls and boys, and 75 trials in our records with sites in Serbia." },
  { href: "/countries/sy/", label: "Syria deep dive", blurb: "What Syria does: cancer care centred on one public university hospital near Damascus, humanitarian cancer services across lines of control in the northwest, care for refugees in neighbouring countries, and since 2025 an IAEA programme building Syria's first full brachytherapy suite." },
  { href: "/countries/af/", label: "Afghanistan deep dive", blurb: "What is known about cancer in Afghanistan: a first population registry in Kabul from 2018, an assessment finding no national cancer plan, no screening and no radiotherapy, households paying about three quarters of health costs, and the gaps no source could fill." },
  { href: "/countries/bg/", label: "Bulgaria deep dive", blurb: "What Bulgaria does: a national registry rooted in 1952, one public insurer paying for hospital cancer medicines outside the pathway price, a council for the positive drug list, many international trial sites, and HPV vaccination at 14 per cent of girls." },
  { href: "/countries/no/", label: "Norway deep dive", blurb: "What Norway does: a registry since 1952, a yearly cap on patient charges, Nye metoder deciding nationally on each new hospital medicine, cancer pathways with time targets, bowel screening from 55, and HPV vaccination above 90 per cent." },
  { href: "/countries/fi/", label: "Finland deep dive", blurb: "What Finland does: a registry since 1953, 21 wellbeing services counties with a yearly charge ceiling, Kela's medicine reimbursement and annual cap, FICAN's five regional cancer centres, and a national cancer strategy for 2026 to 2035." },
  { href: "/countries/kp/", label: "North Korea deep dive", blurb: "What can be said about cancer in North Korea: IARC's modelled estimate of 70,520 new cancers in 2024, and an account of everything no primary source could verify." },
  { href: "/countries/kh/", label: "Cambodia deep dive", blurb: "What Cambodia does: no population registry, so IARC models its figures; liver cancer first; households paying about 61 per cent of health costs; most cervical cancers found late; and HPV vaccination at 85 per cent of girls since 2023." },
  { href: "/countries/ie/", label: "Ireland deep dive", blurb: "What Ireland does: a national registry since 1994, eight designated cancer centres, the NCPE's rapid review and full assessment of new medicines, a monthly cap on pharmacy medicines, free screening, and a cancer warning on alcohol due from 2028." },
  { href: "/countries/zw/", label: "Zimbabwe deep dive", blurb: "What Zimbabwe does: a registry in Harare since 1985 that records HIV status, cervical cancer as the commonest cancer, HPV vaccination at 90 per cent of girls in 2025, and a medicines regulator at WHO maturity level 3." },
  { href: "/countries/ao/", label: "Angola deep dive", blurb: "What Angola does: a hospital registry at the national cancer institute in Luanda, a population registry in Lubango from 2022, breast and cervical cancer leading, oncology being built outside the capital, and HPV vaccination first reported in 2025." },
  { href: "/countries/tn/", label: "Tunisia deep dive", blurb: "What Tunisia does: regional registries behind the national estimate, the northern registry's projection that colorectal cancer will more than double by 2040, lung and bladder cancer in men, and HPV vaccination first reported in 2025." },
  { href: "/countries/sk/", label: "Slovakia deep dive", blurb: "What Slovakia does: a cancer registry whose confirmed counts stop at 2016, with expected counts from insurers' claims since, three public health insurers, medicines paid for once categorised after a pharmacoeconomic analysis, a National Oncology Institute running the cancer programme, and OnkoKontrola screening." },
  { href: "/countries/nz/", label: "New Zealand deep dive", blurb: "What New Zealand does: a cancer agency that reports on the whole system and on the gaps for Māori and Pacific peoples, Pharmac deciding which medicines are funded within a fixed budget, HPV self-testing for cervical screening, and a plan to eliminate cervical cancer by 2040." },
  { href: "/countries/hr/", label: "Croatia deep dive", blurb: "What Croatia does: a national cancer registry since 1959 that counted 26,736 new cancers in 2023, medicines covered through HZZO's lists with hospital committees for exceptions, national breast, bowel and cervical screening, and a national low-dose CT lung screening programme." },
  { href: "/countries/mz/", label: "Mozambique deep dive", blurb: "What Mozambique does: city cancer registries in Maputo and Beira as its only direct counts, cervical cancer and Kaposi sarcoma as the commonest cancers, a medicines regulator rated at WHO maturity level 3, and health spending more than half paid by donors." },
  { href: "/countries/mw/", label: "Malawi deep dive", blurb: "What Malawi does: a city registry in Blantyre as its direct count, cervical cancer as more than a quarter of all cancers, VIA screen-and-treat, HPV vaccine coverage of 82% in 2025, cancer work tied to HIV care, and health spending two thirds paid by donors." },
  { href: "/countries/mg/", label: "Madagascar deep dive", blurb: "What Madagascar does: no cancer registry, so IARC estimates from neighbours' data, cervical cancer as the commonest cancer, about 17 US dollars a person spent on health, radiotherapy and chemotherapy reported as not generally available in 2021, and HPV vaccine coverage of 77% in 2025, the first year WHO reports." },
  { href: "/countries/do/", label: "Dominican Republic deep dive", blurb: "What the Dominican Republic does: no national count of new cancers, a national cancer institute that publishes its own hospital registry, prostate cancer as the commonest cancer and cause of cancer death, and technology assessment before medicines join the family health insurance." },
  { href: "/countries/gt/", label: "Guatemala deep dive", blurb: "What Guatemala does: no cancer registry, liver cancer as the leading cause of cancer death with aflatoxin found in every adult tested, households paying 57% of health spending, and free treatment for children with cancer at UNOP." },
  { href: "/countries/ci/", label: "Côte d'Ivoire deep dive", blurb: "What Côte d'Ivoire does: an Abidjan registry whose latest readable results are from the 1990s, breast cancer as the commonest cancer and cause of cancer death, HPV vaccine coverage rising from 6% in 2019 to 90% in 2025, and VIA cervical screening." },
  { href: "/countries/sg/", label: "Singapore deep dive", blurb: "What Singapore does: a national registry since 1968, a Cancer Drug List since 2022 that decides which outpatient cancer treatments MediShield Life pays for, a verification route for medicines approved by two trusted regulators, and subsidised screening for $5 or less." },
  { href: "/countries/td/", label: "Chad deep dive", blurb: "What Chad does: a 50-bed national cancer centre in N'Djamena whose foundation stone was laid in June 2025 with Kuwaiti financing, a pathology department opened in 2024, and a 2019 universal health coverage law, while households pay about half of all health spending." },
  { href: "/countries/lb/", label: "Lebanon deep dive", blurb: "What Lebanon does: a national registry that counted 17,483 cancers in 2024, free mammography all year in government hospitals for women over 40, and a Ministry programme that paid for high-cost medicines for 5,865 cancer patients in 2024, through economic crisis and war." },
  { href: "/countries/bo/", label: "Bolivia deep dive", blurb: "What Bolivia does: free public care through the SUS and a 2019 cancer law, radiotherapy run by the national nuclear energy agency, and the highest estimated gallbladder cancer rate of any country in GLOBOCAN 2024." },
  { href: "/countries/zm/", label: "Zambia deep dive", blurb: "What Zambia does: nurse-led cervical screen-and-treat built on its HIV programme in 278 clinics, single-dose HPV vaccination since 2023, and compulsory national health insurance since 2018 whose benefit package lists cancer services." },
  { href: "/countries/pr/", label: "Puerto Rico deep dive", blurb: "What Puerto Rico does: a central cancer registry in the CDC's national programme, FDA approval as in the states alongside its own medicines register, cancer in the Government Health Plan's special coverage, and the HPV vaccine required for school since 2018." },
  { href: "/countries/uy/", label: "Uruguay deep dive", blurb: "What Uruguay does: one national registry whose data IARC rates class A, a single national fund paying for high-cost cancer medicines since 2005, a paid day off for screening, and tobacco laws upheld against Philip Morris in 2016." },
  { href: "/countries/lt/", label: "Lithuania deep dive", blurb: "What Lithuania does: four screening programmes paid by compulsory insurance, PSA testing among them since 2006, a Green Corridor for newly diagnosed patients since 2023, and a national registry with records back to 1978." },
  { href: "/countries/ne/", label: "Niger deep dive", blurb: "What Niger does: care for women's cancers made free in public facilities by a 2007 decree, a pathology-based registry in Niamey since 1992, and no national HPV vaccination yet, while households pay about half of all health spending." },
  { href: "/countries/cm/", label: "Cameroon deep dive", blurb: "What Cameroon does: cancer counted without a working population registry, radiotherapy from two machines in Douala, a national childhood cancer network around two hub hospitals since 2023, and universal health coverage that does not yet include cancer." },
  { href: "/countries/ge/", label: "Georgia deep dive", blurb: "What Georgia does: a national registry since 2015 linked to its hepatitis C elimination programme, four state screening programmes since 2011, and a universal cancer care package open to every resident since November 2023." },
  { href: "/countries/az/", label: "Azerbaijan deep dive", blurb: "What Azerbaijan does: 15,144 newly diagnosed cancers registered in 2025, a written fast track for registering cancer medicines, insurance that pays for breast cancer diagnosis, ten radiotherapy machines in three centres, and a children's cancer clinic in Baku." },
  { href: "/countries/ba/", label: "Bosnia and Herzegovina deep dive", blurb: "What Bosnia and Herzegovina does: two entity registries and insurers, a Federation Solidarity Fund paying for cancer medicines in every canton, one state medicines agency, 20 radiotherapy machines, and weekly cytostatic stock notices in Sarajevo." },
  { href: "/countries/ht/", label: "Haiti deep dive", blurb: "What Haiti does: a national estimate modelled for want of a registry, no radiotherapy centre in the IAEA's database, households paying 52% of health spending, and free cancer care at Mirebalais and one children's cancer unit." },
  { href: "/countries/sn/", label: "Senegal deep dive", blurb: "What Senegal does: a national estimate made without a registry, cervical and breast cancer commonest and liver cancer the deadliest, chemotherapy declared free from 2019, the ARP regulator, four radiotherapy machines, and HPV vaccination of girls since 2018." },
  { href: "/countries/si/", label: "Slovenia deep dive", blurb: "What Slovenia does: a national cancer registry kept since 1950, one public insurer covering the basket of care in full since complementary insurance ended in 2024, three national screening programmes, cervical screening moving to HPV tests, and 12 linear accelerators." },
  { href: "/countries/ml/", label: "Mali deep dive", blurb: "What Mali does: a Bamako cancer registry running since 1986, a universal health insurance law of 2018, state-funded cancer medicines with stock-outs at one Bamako hospital, one radiotherapy centre, free weekend cervical screening, and HPV vaccination of girls." },
  { href: "/countries/pg/", label: "Papua New Guinea deep dive", blurb: "What Papua New Guinea does: a national estimate modelled for want of a registry, oral cancer tied to betel nut, one radiotherapy centre in Lae with two cobalt machines, same-day HPV screen-and-treat, and HPV vaccination begun in 2026." },
  { href: "/countries/bf/", label: "Burkina Faso deep dive", blurb: "What Burkina Faso does: a national estimate made without a registry, free screening and treatment of precancerous lesions since 2016, the RAMU universal insurance scheme, the new Faso FDA regulator, two radiotherapy machines, and HPV vaccination of girls since 2022." },
  { href: "/countries/cr/", label: "Costa Rica deep dive", blurb: "What Costa Rica does: a national tumour registry kept since 1976, public cancer care through the CCSS and its official medicines list, a faster route for medicines already approved by WHO-listed regulators, and the Guanacaste trials of a single HPV vaccine dose." },
  { href: "/countries/py/", label: "Paraguay deep dive", blurb: "What Paraguay does: a 2018 law that made cancer notifiable and funds care partly from tobacco and alcohol taxes, a national incidence modelled from deaths for want of a registry, 11 radiotherapy machines in six centres, and HPV vaccination that fell to 42%." },
  { href: "/countries/rw/", label: "Rwanda deep dive", blurb: "What Rwanda does: a national cancer registry re-established in 2018, community insurance covering 89% of people that its cancer plan says would add cancer medicines from July 2025, one radiotherapy centre with two machines, and HPV vaccination of girls since 2011." },
  { href: "/countries/gn/", label: "Guinea deep dive", blurb: "What Guinea has: one cancer registry, in Conakry since 1990, behind IARC's national estimate; cervical screening by visual inspection offered opportunistically; more than half of health spending paid out of pocket; and no trial in OnCo's records with a site in the country." },
  { href: "/countries/md/", label: "Moldova deep dive", blurb: "What Moldova does: 11,238 new cancers registered in 2024, a cancer programme for 2026 to 2030 drafted as part of EU accession and costed at about 2.6 billion lei, HPV vaccination of girls at 43% against a 60% target, and 22 trials in OnCo's records, most of them early phase." },
  { href: "/countries/lv/", label: "Latvia deep dive", blurb: "What Latvia does: a national registry that counted 11,584 new cancers in 2025, a Green Corridor for suspected cancer that a state audit found did not speed diagnosis, four free screening programmes, and new cancer medicines reaching public cover more than 1,100 days after European approval." },
  { href: "/countries/hn/", label: "Honduras deep dive", blurb: "What Honduras has: an IARC estimate built on a subnational registry, with leukaemia the third commonest cancer; no national breast or cervical screening programme in WHO's 2020 profile; HPV vaccination of girls at 73%; and more than half of health spending paid out of pocket." },
  { href: "/countries/am/", label: "Armenia deep dive", blurb: "What Armenia has: an IARC estimate made without national incidence data, with lung cancer causing nearly a quarter of cancer deaths; about 80% of health spending paid out of pocket; HPV vaccination of girls at 47% in 2025; and a national oncology centre in Yerevan with its own brachytherapy department." },
  { href: "/countries/so/", label: "Somalia deep dive", blurb: "What Somalia has: no information on a cancer registry and no death registration coverage in WHO's 2020 profile, so IARC estimates its cancers from neighbouring countries' rates; no radiotherapy recorded; health spending of about USD 22 a person; and no HPV vaccination figures at WHO." },
  { href: "/countries/jo/", label: "Jordan deep dive", blurb: "What Jordan does: a population-based registry WHO rated high quality, the King Hussein Cancer Center with six linear accelerators, breast screening from age 40 but no cervical screening programme in WHO's 2020 profile, and 13 trials in OnCo's records with a site in Jordan." },
  { href: "/countries/sv/", label: "El Salvador deep dive", blurb: "What El Salvador has: an IARC estimate made without national incidence data, stomach cancer the commonest cause of cancer death, more cancer deaths among women than men, HPV vaccination of girls and boys, and one trial in OnCo's records with a site in the country." },
  { href: "/countries/jp/", label: "Japan deep dive", blurb: "Japan deep dive, written from Japanese sources: the national cancer registry and the stomach and liver burden, the screening programme and what its evidence says, universal insurance and the high-cost medical expense ceiling, PMDA and the drug lag, carbon-ion therapy and endoscopic resection, JCOG, and where Japanese evidence diverges from Western practice." },
  { href: "/countries/ru/", label: "Russia deep dive", blurb: "Russia deep dive read from Russian sources: the Herzen institute's national cancer statistics and what they do and do not count, compulsory medical insurance and the vital and essential medicines list, registration under federal law 61-FZ and the Eurasian Economic Union route, the collapse in new international trials since 2022, Biocad and domestic manufacture, and the Blokhin, Herzen, Petrov, Rogachev and Tomsk institutes." },
  { href: "/countries/pa/", label: "Panama deep dive", blurb: "What Panama does: a national cancer institute that saw 5,273 cancer patients in 2024, almost half of them referred by the social security fund, a hospital cancer registry since 2012, HPV vaccination of girls and boys, and 19 trials in OnCo's records with a site in Panama." },
];
