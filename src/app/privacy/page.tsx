import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { WebPageJsonLd } from "@/components/JsonLd";
import { buildDate, ISSUES_URL, LegalMeta, LegalSection, LegalToc, Placeholder, REPO_URL, Term, type LegalSectionDef } from "@/components/LegalPage";
import { AnalyticsChoice } from "@/components/AnalyticsConsent";

/**
 * Privacy policy, written from the code. Sources for each claim:
 *  - hosting: src/app/layout.tsx (static export on Vercel)
 *  - analytics: src/lib/analytics-consent.ts and src/components/AnalyticsConsent.tsx (gtag.js with G-2TTJ25WSN8, plain
 *    config call, inserted only after Allow; Global Privacy Control read as No thanks)
 *  - accounts: none on this site; the header's Sign in/up is a link to the separate signed-in site me.onco.cc
 *    (src/components/AccountMenu.tsx), which has its own privacy notice
 *  - the browser-only choices: src/lib/profile.ts, src/lib/use-my-cancer.ts
 *  - saved items: src/lib/watchlist.ts, src/lib/saved-views.ts, src/lib/prep.ts, src/lib/prep-sheet.ts
 *  - newsletter box: src/components/SignupForm.tsx (posts to NEXT_PUBLIC_SIGNUP_ACTION when set)
 *  - storage keys: the KEY constants in the files above plus ThemeToggle, layer.ts, region.tsx, CommandPalette,
 *    not-found-query.ts, GitHubStars, TranslateOffer; service worker caches: public/sw.js
 *  - other hosts the browser contacts: ctgov.ts, ctgov-geo.ts, europepmc.ts, GitHubStars.tsx, WorldMap.tsx
 */
const TITLE = "Privacy policy";
const DESCRIPTION = "What OnCo collects and where it lives, from the code: static pages on Vercel, Google Analytics visit counts only after you allow them, and every choice you make kept in your own browser. onco.cc holds no account data; accounts live on the separate signed-in site me.onco.cc under its own privacy notice. No advertising, no sale of data.";
export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/privacy/" });

const GA_ID = "G-2TTJ25WSN8";
/** The separate signed-in site, where accounts live; it has its own privacy notice at /privacy/. */
const ME = "https://me.onco.cc/";

const SECTIONS: readonly LegalSectionDef[] = [
  { id: "who", title: "Who runs this site", icon: "building" },
  { id: "summary", title: "The short version", icon: "list" },
  { id: "hosting", title: "Hosting", icon: "server" },
  { id: "analytics", title: "Analytics", icon: "chart" },
  { id: "accounts", title: "Accounts", icon: "key" },
  { id: "on-your-device", title: "Your choices and saved items", icon: "user" },
  { id: "newsletter", title: "Email sign-up", icon: "mail" },
  { id: "storage", title: "Cookies and browser storage", icon: "cookie" },
  { id: "health", title: "Health information", icon: "heart" },
  { id: "third-parties", title: "Other services your browser may contact", icon: "globe" },
  { id: "no-ads", title: "No advertising, no sale of data", icon: "ban" },
  { id: "rights", title: "Your rights", icon: "hand" },
  { id: "children", title: "Children", icon: "child" },
  { id: "transfers", title: "International transfers", icon: "plane" },
  { id: "changes", title: "Changes to this policy", icon: "refresh" },
  { id: "contact", title: "Contact", icon: "mail" },
];
const S = Object.fromEntries(SECTIONS.map((s, i) => [s.id, { def: s, index: i + 1 }])) as Record<string, { def: LegalSectionDef; index: number }>;

/** Every key the site writes to the browser, from the KEY constants in the code, with the plain meaning of each. */
const STORAGE: ReadonlyArray<{ name: string; where: string; holds: string }> = [
  { name: "_ga, _ga_*", where: "Cookie (set by Google, only after you press Allow)", holds: "Google Analytics visitor and session identifiers, so repeat visits can be told apart. Not set while your analytics choice is No thanks or unmade." },
  { name: "onco:analytics", where: "Local storage", holds: "Your analytics choice: granted or denied. Absent until you choose." },
  { name: "onco:theme", where: "Local storage", holds: "Light, dark, high-contrast or system theme." },
  { name: "onco.layer", where: "Local storage", holds: "Reading level (technical, plain, simple) and site language." },
  { name: "onco:region", where: "Local storage", holds: "The region you chose for approvals and access." },
  { name: "onco:profile:v1", where: "Local storage", holds: "Your browser profile for For me and the hubs: cancer, stage, biomarkers, treatments had, country or postcode if you typed one, and reading mode." },
  { name: "onco:watchlist:v1", where: "Local storage", holds: "Pages you pressed Watch on, with the dates you last saw them." },
  { name: "onco:saved-views:v1", where: "Local storage", holds: "Table views you saved: a name and the address that reproduces the filters." },
  { name: "onco:prep:v1, onco:prep-sheet:v1", where: "Local storage", holds: "Ticks, questions and notes on the appointment preparation pages." },
  { name: "onco:shortcuts:v1", where: "Local storage", holds: "Whether keyboard shortcuts are on or off." },
  { name: "onco:missed-paths", where: "Local storage", holds: "The last fifty addresses this browser asked for that did not exist, so the not-found page can suggest where you meant to go." },
  { name: "onco:stars", where: "Local storage", holds: "The GitHub star count shown in the header, cached for an hour." },
  { name: "onco.translate-offer.dismissed", where: "Local storage", holds: "That you dismissed the offer to switch language." },
  { name: "onco-v3-pages, -shell, -assets, -data, -media", where: "Cache storage (service worker)", holds: "Copies of pages you have visited (up to 200), the site's scripts and styles, its data files and images, so the site works offline." },
];

export default function PrivacyPage() {
  const date = buildDate();
  return (
    <>
      <WebPageJsonLd path="/privacy/" name={`${TITLE} · OnCo`} description={DESCRIPTION} dateModified={date.iso} />
      <PageHeader
        kicker={<GroupKicker id="learn"><span className="kicker">·</span><Link href="/terms-of-use/" className="kicker hover:underline">Terms of use</Link><span className="kicker">·</span><Link href="/about/" className="kicker hover:underline">About and methodology</Link></GroupKicker>}
        title={TITLE}
        lede="What OnCo collects, where it lives and what leaves your device and where it goes, written from the code that runs the site. The site is open source, so every statement here can be checked against the file it describes."
        right={<Link href="/terms-of-use/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:border-accent/50 hover:text-accent">Terms of use →</Link>}
      />
      <Container className="pb-16 prose-onco text-[15px] leading-relaxed max-w-3xl space-y-10">
        <LegalToc sections={SECTIONS} />
        <LegalMeta date={date} siblings={[{ href: "/terms-of-use/", label: "Terms of use" }, { href: `${REPO_URL}/commits/main/src/app/privacy/page.tsx`, label: "History of this page" }]} />

        <LegalSection {...S.who}>
          <p>OnCo (<Placeholder>[legal entity and address]</Placeholder>) runs onco.cc and is the <Term tip="The organisation that decides why and how personal data is used, and answers for it under data protection law.">controller</Term> for the small amount of <Term tip="Any information about a living person who can be identified from it, such as an email address or an IP address.">personal data</Term> the site touches. The code that this policy describes is public at <a href={REPO_URL} rel="noopener">{REPO_URL.replace("https://", "")}</a>.</p>
        </LegalSection>

        <LegalSection {...S.summary}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>The site is a set of <Term tip="Pages built once, in advance, and served as plain files. There is no programme of ours running when you read them.">static pages</Term> served by Vercel. OnCo runs no server and no database for onco.cc.</li>
            <li>Google Analytics counts visits and page views, but only after you press <em>Allow</em> on the bar at the foot of the page. Until then, and if you choose <em>No thanks</em>, it is not loaded at all. It is the only analytics on the site.</li>
            <li>onco.cc has no accounts and holds no account data. <em>Sign in/up</em> in the header takes you to the separate signed-in site, <a href={ME} rel="noopener">me.onco.cc</a>, which has its own <a href={`${ME}privacy/`} rel="noopener">privacy notice</a>.</li>
            <li>Everything you choose on this site (your cancer, For me details such as stage, biomarkers and treatments, watched pages, saved views, appointment notes) stays in your own browser and is never sent to us.</li>
            <li>No advertising, no advertising trackers, no sale or sharing of personal data for marketing.</li>
          </ul>
        </LegalSection>

        <LegalSection {...S.hosting}>
          <p>The site is built as a static export and served by <a href="https://vercel.com" rel="noopener">Vercel</a>. Like any web host, Vercel logs each request (the address requested, the time, your IP address and browser type) for security and performance, and uses that log to run and protect the service. We add nothing to those logs and do not use them to identify visitors. See <a href="https://vercel.com/legal/privacy-policy" rel="noopener">Vercel&apos;s privacy policy</a> for how long they are kept.</p>
        </LegalSection>

        <LegalSection {...S.analytics}>
          <p>The site can use <a href="https://marketingplatform.google.com/about/analytics/" rel="noopener">Google Analytics</a> (gtag.js, property <code>{GA_ID}</code>) for one thing: to see which pages are read and how often, so we know what to build next. It is gated behind your choice. The pages we publish contain no Google script at all; the first time you visit, a small bar at the foot of the page asks whether to count your visit, with two answers, <em>Allow</em> and <em>No thanks</em>. Until you answer, nothing is loaded and no cookie is set.</p>
          <p>If you press <em>Allow</em>, the browser writes <code>onco:analytics</code> = <code>granted</code> to local storage and inserts the standard Google loader followed by a plain <code>gtag(&apos;config&apos;)</code> call, then and on every later visit while that choice stands. No advertising features are switched on and no extra parameters are passed (the snippet sets no IP anonymisation option; how Google Analytics 4 handles IP addresses is described in <a href="https://support.google.com/analytics/answer/12017362" rel="noopener">Google&apos;s documentation</a>). Through it Google receives the pages you view, the time, the page you came from, your device, browser and language, and a rough location derived from your IP address, and it sets the <code>_ga</code> cookies listed below so that repeat visits can be told apart.</p>
          <p>If you press <em>No thanks</em>, the browser writes <code>denied</code>, the loader is never inserted and no cookie is set. If your browser sends the <a href="https://globalprivacycontrol.org" rel="noopener">Global Privacy Control</a> signal, we read it as <em>No thanks</em> and do not show the bar at all; a choice you make on the site afterwards takes precedence. Changing from <em>Allow</em> to <em>No thanks</em> stops further measurement on the spot (Google&apos;s <code>ga-disable</code> flag) and expires the <code>_ga</code> cookies the page can reach.</p>
          <p>You can change your choice at any time here, or with the <em>Analytics choice</em> link in the footer of every page, which brings the bar back:</p>
          <AnalyticsChoice variant="panel" />
          <p>Beyond that, you can block <code>googletagmanager.com</code> with a content or tracker blocker, use your browser&apos;s tracking protection, or install Google&apos;s own <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">opt-out add-on</a>. How Google uses data from sites that use its services is at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com/technologies/partner-sites</a>, and Google&apos;s privacy policy is at <a href="https://policies.google.com/privacy" rel="noopener">policies.google.com/privacy</a>.</p>
        </LegalSection>

        <LegalSection {...S.accounts}>
          <p>onco.cc is the public, signed-out site. It has no sign-in of its own, keeps no session and holds no account data, neither in your browser nor on any server. The <em>Sign in/up</em> control in the header is a plain link to the separate signed-in site, <a href={ME} rel="noopener">me.onco.cc</a>, carrying the address of the page you were on so you can come back to it. Nothing about you travels with that link beyond the page address itself.</p>
          <p>me.onco.cc is a different application with its own sign-in and its own database; that is where a role, a cancer type and case details can be stored on an account. What it collects and how it is kept are set out in its own <a href={`${ME}privacy/`} rel="noopener">privacy notice</a>, which applies from the moment you arrive there. This policy covers onco.cc only.</p>
        </LegalSection>

        <LegalSection {...S["on-your-device"]}>
          <p><strong>Your cancer and reading mode.</strong> <Link href="/for-me/">For me</Link> lets you choose a cancer, a stage, biomarkers, treatments you have had, a country or postcode and whether you read as a patient, caregiver or clinician. All of it is written to <Term tip="A small store inside your browser that a website can write to. Only that website, on that device, can read it.">local storage</Term> under <code>onco:profile:v1</code>, on this device only, and read back by For me, the cancer hubs, the trials list and search. It is never sent to OnCo or anyone else and does not follow you to another browser or device.</p>
          <p><strong>Saved items.</strong> The pages you press Watch on, the table views you save and your appointment preparation notes are browser-only in the same way. The <Link href="/saved/">Saved</Link> page checks for changes by fetching OnCo&apos;s own static data files for the pages on your list; export and import move the lists between browsers as a file you keep.</p>
          <p><strong>Clearing.</strong> Change or clear your cancer and reading mode on <Link href="/for-me/">For me</Link>, remove watched pages and saved views on <Link href="/saved/">Saved</Link>, or use your browser&apos;s site data controls for onco.cc to remove everything in the table below from the device.</p>
        </LegalSection>

        <LegalSection {...S.newsletter}>
          <p>The email box on <Link href="/signup/">Stay in the loop</Link> is a newsletter box, nothing more. With a mailing-list provider configured (a Buttondown or Listmonk form address, set at build time), the address you type is posted from your browser straight to that provider, tagged <code>onco.cc</code>, and that provider&apos;s privacy policy applies; OnCo never receives it. With no provider configured, the page says that sign-up is not yet active and stores nothing. The newsletter issues themselves are static pages with no scripts and no tracking.</p>
        </LegalSection>

        <LegalSection {...S.storage}>
          <p>OnCo&apos;s own code sets no <Term tip="A small piece of text a website asks your browser to keep and send back on later visits.">cookies</Term>; the only cookies come from Google Analytics, and only once you have pressed <em>Allow</em>. Everything else is local storage, <Term tip="Like local storage, but emptied when the tab or window closes.">session storage</Term> or the <Term tip="A script your browser runs in the background for this site that keeps copies of pages so they open offline and load faster.">service worker</Term> cache, all of it on your device.</p>
          <div className="not-prose overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-card text-start">
                <tr><th scope="col" className="px-3 py-2 text-start font-semibold">Name</th><th scope="col" className="px-3 py-2 text-start font-semibold">Where</th><th scope="col" className="px-3 py-2 text-start font-semibold">What it holds</th></tr>
              </thead>
              <tbody>
                {STORAGE.map((r) => (
                  <tr key={r.name} className="border-t border-border align-top">
                    <td className="px-3 py-2 font-mono text-xs whitespace-nowrap">{r.name}</td>
                    <td className="px-3 py-2 text-muted whitespace-nowrap">{r.where}</td>
                    <td className="px-3 py-2">{r.holds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>To clear any of it, use your browser&apos;s site data or cookie controls for onco.cc; the cancer and reading mode can also be changed or cleared on <Link href="/for-me/">For me</Link>.</p>
        </LegalSection>

        <LegalSection {...S.health}>
          <p>Any cancer type, stage, biomarker, treatment or reading mode you choose on OnCo is sensitive information about health. All of it is kept only on your device, in the storage listed above, and is never sent to OnCo or to Google. No health information leaves your device through onco.cc. Anything you choose to store on an account at <a href={ME} rel="noopener">me.onco.cc</a> is governed by that site&apos;s privacy notice.</p>
          <p>Two limits are outside our control and worth knowing. First, the address of a page you read (for example a page about one cancer) is part of an ordinary page view, so it is visible to Vercel in its request log and, if you have allowed analytics, to Google Analytics as a page view. Second, if you type a condition, a drug or a place into a tool that queries ClinicalTrials.gov, Europe PMC or OpenStreetMap, that query goes to that service from your browser (next section).</p>
        </LegalSection>

        <LegalSection {...S["third-parties"]}>
          <p>Besides Vercel and Google, some features fetch from other services directly from your browser, only when you use them:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><a href="https://clinicaltrials.gov" rel="noopener">ClinicalTrials.gov</a>: the trial finders send the condition, drug and place you enter to its public API.</li>
            <li><a href="https://nominatim.openstreetmap.org" rel="noopener">OpenStreetMap Nominatim</a>: the trials-near-you finder turns the place name you type into coordinates.</li>
            <li><a href="https://europepmc.org" rel="noopener">Europe PMC</a> (ebi.ac.uk): the latest-papers panels query it for a record&apos;s name.</li>
            <li><a href="https://api.github.com" rel="noopener">GitHub</a>: the header fetches the repository&apos;s star count about once an hour.</li>
            <li><a href="https://www.jsdelivr.com" rel="noopener">jsDelivr</a>: the maps load public country outlines from this content network.</li>
          </ul>
          <p>Each of these sees your IP address and the request, as any website you visit does, and each has its own privacy policy. Links that leave onco.cc open in a new tab; those sites&apos; policies apply once you are there.</p>
        </LegalSection>

        <LegalSection {...S["no-ads"]}>
          <p>OnCo shows no advertising, loads no advertising trackers and does not sell, rent or share personal data for marketing or any other purpose. The only measurement is Google Analytics as described above. Nothing about you is used to train models or shared with data brokers.</p>
        </LegalSection>

        <LegalSection {...S.rights}>
          <p>Under the EU General Data Protection Regulation and the UK GDPR you can ask to see the personal data an organisation holds about you, have it corrected or deleted, restrict or object to its use, receive a copy in a common format (<Term tip="The right to get your data in a machine-readable form so you can take it to another service.">portability</Term>), and complain to your <Term tip="The public body that enforces data protection law where you live, for example the ICO in the United Kingdom.">supervisory authority</Term>. Under the California Consumer Privacy Act you can ask what is collected, have it deleted or corrected, opt out of sale or sharing (we do neither), and not be treated differently for asking.</p>
          <p>Most of these you can do yourself:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Your choices and saved items:</strong> they are only in your browser, so clearing the site&apos;s data there, or using the controls on <Link href="/for-me/">For me</Link> and <Link href="/saved/">Saved</Link>, deletes them completely; we hold no copy to delete or hand over.</li>
            <li><strong>Your account:</strong> onco.cc has none. For an account on <a href={ME} rel="noopener">me.onco.cc</a>, use that site&apos;s controls and the routes in its <a href={`${ME}privacy/`} rel="noopener">privacy notice</a>.</li>
            <li><strong>Analytics:</strong> change your choice with the control in the <a href="#analytics">analytics section</a> or the <em>Analytics choice</em> link in the footer; Google&apos;s controls are at <a href="https://myaccount.google.com/data-and-privacy" rel="noopener">myaccount.google.com</a>.</li>
            <li><strong>Anything else:</strong> open an issue at <a href={ISSUES_URL} rel="noopener">GitHub</a> or email <Placeholder>[contact email]</Placeholder>. We answer within the time the law allows, normally one month.</li>
          </ul>
        </LegalSection>

        <LegalSection {...S.children}>
          <p>OnCo is not directed at children under 16 and we do not knowingly collect personal data from them. If you believe we hold any, <a href="#contact">contact us</a> and we will have it removed.</p>
        </LegalSection>

        <LegalSection {...S.transfers}>
          <p>Vercel and Google are companies based in the United States, so request logs and analytics data may be processed there. Each publishes the legal safeguards it relies on for data moved out of the EU, the UK and other places with transfer rules; we cannot verify those arrangements for you here, so please see <a href="https://vercel.com/legal/privacy-policy" rel="noopener">Vercel&apos;s</a> and <a href="https://policies.google.com/privacy" rel="noopener">Google&apos;s</a> policies for the current terms.</p>
        </LegalSection>

        <LegalSection {...S.changes}>
          <p>This policy changes when the code changes. The date at the top of the page is the date this page was last built, and every earlier version is in the <a href={`${REPO_URL}/commits/main/src/app/privacy/page.tsx`} rel="noopener">page&apos;s history</a> on GitHub.</p>
        </LegalSection>

        <LegalSection {...S.contact}>
          <p>Open an issue at <a href={ISSUES_URL} rel="noopener">{ISSUES_URL.replace("https://", "")}</a> or write to <Placeholder>[contact email]</Placeholder>. Security matters are covered in the repository&apos;s <a href={`${REPO_URL}/blob/main/SECURITY.md`} rel="noopener">security policy</a>.</p>
        </LegalSection>
      </Container>
    </>
  );
}
