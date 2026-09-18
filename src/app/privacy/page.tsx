import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { WebPageJsonLd } from "@/components/JsonLd";
import { buildDate, ISSUES_URL, LegalMeta, LegalSection, LegalToc, Placeholder, REPO_URL, Term, type LegalSectionDef } from "@/components/LegalPage";

/**
 * Privacy policy, written from the code. Sources for each claim:
 *  - hosting and analytics: src/app/layout.tsx (static export on Vercel; gtag.js with G-2TTJ25WSN8, plain config call)
 *  - accounts: src/lib/account.ts (WorkOS PKCE in the browser; Supabase fallback only when its keys are set)
 *  - choices on the device: src/lib/profile.ts, src/components/WelcomeStep.tsx, src/components/AccountMenu.tsx
 *  - saved items: src/lib/watchlist.ts, src/lib/saved-views.ts, src/lib/prep.ts, src/lib/prep-sheet.ts
 *  - newsletter box: src/components/SignupForm.tsx (posts to NEXT_PUBLIC_SIGNUP_ACTION when set)
 *  - storage keys: the KEY constants in the files above plus ThemeToggle, layer.ts, region.tsx, CommandPalette,
 *    not-found-query.ts, GitHubStars, TranslateOffer; service worker caches: public/sw.js
 *  - other hosts the browser contacts: ctgov.ts, ctgov-geo.ts, europepmc.ts, GitHubStars.tsx, WorldMap.tsx
 */
const TITLE = "Privacy policy";
const DESCRIPTION = "What OnCo collects and where it lives, from the code: static pages on Vercel, Google Analytics visit counts, sign-in through WorkOS, and every choice you make kept in your own browser. No advertising, no sale of data.";
export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/privacy/" });

const GA_ID = "G-2TTJ25WSN8";

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
  { name: "_ga, _ga_*", where: "Cookie (set by Google)", holds: "Google Analytics visitor and session identifiers, so repeat visits can be told apart." },
  { name: "onco:theme", where: "Local storage", holds: "Light, dark, high-contrast or system theme." },
  { name: "onco.layer", where: "Local storage", holds: "Reading level (technical, plain, simple) and site language." },
  { name: "onco:region", where: "Local storage", holds: "The region you chose for approvals and access." },
  { name: "onco:profile:v1", where: "Local storage", holds: "Your browser profile for For me and the hubs: cancer, stage, biomarkers, treatments had, country or postcode if you typed one, and reading mode." },
  { name: "onco:account-profile:v1:<your user id>", where: "Local storage", holds: "The role you chose after signing in, your optional cancer choice and the time you agreed to the welcome step. One entry per signed-in user of this browser." },
  { name: "onco:session:v1", where: "Local storage", holds: "Your sign-in session: access and refresh tokens, expiry, your user id, email address and name from WorkOS. Removed when you sign out." },
  { name: "onco:pkce, onco:return-to", where: "Session storage", holds: "A sign-in in progress (a one-time code verifier and the page to return to). Removed as soon as the sign-in completes; gone when the tab closes." },
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
        lede="What OnCo collects, where it lives and what never leaves your device, written from the code that runs the site. The site is open source, so every statement here can be checked against the file it describes."
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
            <li>The site is a set of <Term tip="Pages built once, in advance, and served as plain files. There is no database or programme of ours running when you read them.">static pages</Term> served by Vercel. OnCo runs no server and no database of its own.</li>
            <li>Google Analytics counts visits and page views. It is the only analytics on the site.</li>
            <li>If you sign in, WorkOS handles it and holds your email address and the name you give. Nothing else about you is held by OnCo or WorkOS.</li>
            <li>Everything you choose on the site (who you are, your cancer, watched pages, saved views, appointment notes, theme, language, region) stays in your own browser and is never sent to us.</li>
            <li>No advertising, no advertising trackers, no sale or sharing of personal data for marketing.</li>
          </ul>
        </LegalSection>

        <LegalSection {...S.hosting}>
          <p>The site is built as a static export and served by <a href="https://vercel.com" rel="noopener">Vercel</a>. Like any web host, Vercel logs each request (the address requested, the time, your IP address and browser type) for security and performance, and uses that log to run and protect the service. We add nothing to those logs and do not use them to identify visitors. See <a href="https://vercel.com/legal/privacy-policy" rel="noopener">Vercel&apos;s privacy policy</a> for how long they are kept.</p>
        </LegalSection>

        <LegalSection {...S.analytics}>
          <p>Every page loads <a href="https://marketingplatform.google.com/about/analytics/" rel="noopener">Google Analytics</a> (gtag.js, property <code>{GA_ID}</code>) once the page is interactive. We use it for one thing: to see which pages are read and how often, so we know what to build next.</p>
          <p>What the code does, exactly: it is the standard Google loader followed by a plain <code>gtag(&apos;config&apos;)</code> call. No advertising features are switched on, no extra parameters are passed (the snippet sets no IP anonymisation option; how Google Analytics 4 handles IP addresses is described in <a href="https://support.google.com/analytics/answer/12017362" rel="noopener">Google&apos;s documentation</a>), and there is no consent banner or gate: the script runs for every visitor. Through it Google receives the pages you view, the time, the page you came from, your device, browser and language, and a rough location derived from your IP address, and it sets the <code>_ga</code> cookies listed below so that repeat visits can be told apart.</p>
          <p>To opt out, block <code>googletagmanager.com</code> with a content or tracker blocker, use your browser&apos;s tracking protection, or install Google&apos;s own <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">opt-out add-on</a>. How Google uses data from sites that use its services is at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com/technologies/partner-sites</a>, and Google&apos;s privacy policy is at <a href="https://policies.google.com/privacy" rel="noopener">policies.google.com/privacy</a>.</p>
        </LegalSection>

        <LegalSection {...S.accounts}>
          <p>Signing in is optional. When it is switched on, sign-in is handled by <a href="https://workos.com" rel="noopener">WorkOS</a> AuthKit as our <Term tip="A company that handles personal data on our behalf and on our instructions, rather than for its own purposes.">processor</Term>. Your browser talks to <code>api.workos.com</code> directly, using a one-time code that never passes through any server of ours. WorkOS stores your email address, the name you give, the sign-in method you use and a record of your sessions. Your browser keeps the resulting session (tokens, your user id, email and name) in local storage under <code>onco:session:v1</code>; signing out removes it and tells WorkOS to end the session. See <a href="https://workos.com/privacy" rel="noopener">WorkOS&apos;s privacy policy</a>.</p>
          <p>The code also contains an alternative sign-in and watchlist sync through <a href="https://supabase.com" rel="noopener">Supabase</a> (an emailed link plus a watchlist table). It is used only if OnCo configures its keys; in that case Supabase would hold your email address and the pages you watch, and this policy will say so before it is switched on.</p>
        </LegalSection>

        <LegalSection {...S["on-your-device"]}>
          <p><strong>Who you are.</strong> After your first sign-in, the welcome step asks whether you are a patient, a caregiver, a researcher or a medical provider, and offers an optional cancer choice. Your answer, the cancer and the time you agreed are written to <Term tip="A small store inside your browser that a website can write to. Only that website, on that device, can read it; nothing in it is sent anywhere unless the site's code sends it, and OnCo's does not.">local storage</Term> under <code>onco:account-profile:v1:&lt;your user id&gt;</code>. They are keyed to your WorkOS user id so two people sharing a browser do not overwrite each other, and they are never sent to OnCo, to WorkOS or to anyone else. The cancer is also written to the browser profile (<code>onco:profile:v1</code>) that <Link href="/for-me/">For me</Link>, the cancer hubs and the header chip read.</p>
          <p><strong>Saved items.</strong> Watched pages, saved table views and appointment preparation notes are browser-only as well. The <Link href="/saved/">Saved</Link> page checks for changes by fetching OnCo&apos;s own static data files for the pages on your list; the list itself is not sent.</p>
          <p><strong>Clearing.</strong> Open the account menu and choose <em>Clear my choices</em> to forget your role, your cancer and your reading mode, or <em>Change who you are</em> to pick again. Your browser&apos;s site data controls remove everything in the table below.</p>
        </LegalSection>

        <LegalSection {...S.newsletter}>
          <p>The email box on <Link href="/signup/">Stay in the loop</Link> behaves in one of three ways, decided by the site&apos;s configuration at build time. With sign-in switched on, the box is the account sign-in described above. With sign-in off and a mailing-list provider configured (a Buttondown or Listmonk form address), the address you type is posted from your browser straight to that provider, tagged <code>onco.cc</code>, and that provider&apos;s privacy policy applies; OnCo never receives it. With neither configured, the page says that sign-up is not yet active and stores nothing. The newsletter issues themselves are static pages with no scripts and no tracking.</p>
        </LegalSection>

        <LegalSection {...S.storage}>
          <p>OnCo&apos;s own code sets no <Term tip="A small piece of text a website asks your browser to keep and send back on later visits.">cookies</Term>; the only cookies come from Google Analytics. Everything else is local storage, <Term tip="Like local storage, but emptied when the tab or window closes.">session storage</Term> or the <Term tip="A script your browser runs in the background for this site that keeps copies of pages so they open offline and load faster.">service worker</Term> cache, all of it on your device.</p>
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
          <p>To clear any of it, use your browser&apos;s site data or cookie controls for onco.cc, or the <em>Clear my choices</em> button in the account menu for your role and cancer.</p>
        </LegalSection>

        <LegalSection {...S.health}>
          <p>Any cancer type, stage, biomarker, treatment or role you choose on OnCo is sensitive information about health. It is kept only on your device, in the storage listed above, and is never sent to OnCo, WorkOS or Google. You can clear it at any time from the account menu.</p>
          <p>Two limits are outside our control and worth knowing. First, the address of a page you read (for example a page about one cancer) is part of an ordinary page view, so it is visible to Vercel in its request log and to Google Analytics as a page view. Second, if you type a condition, a drug or a place into a tool that queries ClinicalTrials.gov, Europe PMC or OpenStreetMap, that query goes to that service from your browser (next section).</p>
        </LegalSection>

        <LegalSection {...S["third-parties"]}>
          <p>Besides Vercel, Google and WorkOS, some features fetch from other services directly from your browser, only when you use them:</p>
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
          <p>Because almost everything is on your device, most of these you can do yourself:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Your choices and saved items:</strong> use <em>Clear my choices</em> in the account menu, or clear the site&apos;s data in your browser.</li>
            <li><strong>Your account:</strong> to see or delete what WorkOS holds, <a href="#contact">contact us</a> and we will have it removed.</li>
            <li><strong>Analytics:</strong> use the opt-out routes in the <a href="#analytics">analytics section</a>; Google&apos;s controls are at <a href="https://myaccount.google.com/data-and-privacy" rel="noopener">myaccount.google.com</a>.</li>
            <li><strong>Anything else:</strong> open an issue at <a href={ISSUES_URL} rel="noopener">GitHub</a> or email <Placeholder>[contact email]</Placeholder>. We answer within the time the law allows, normally one month.</li>
          </ul>
        </LegalSection>

        <LegalSection {...S.children}>
          <p>OnCo is not directed at children under 16 and we do not knowingly collect personal data from them. If you believe a child has created an account, <a href="#contact">contact us</a> and we will have it removed.</p>
        </LegalSection>

        <LegalSection {...S.transfers}>
          <p>Vercel, WorkOS and Google are companies based in the United States, so request logs, account records and analytics data may be processed there. Each publishes the legal safeguards it relies on for data moved out of the EU, the UK and other places with transfer rules; we cannot verify those arrangements for you here, so please see <a href="https://vercel.com/legal/privacy-policy" rel="noopener">Vercel&apos;s</a>, <a href="https://workos.com/privacy" rel="noopener">WorkOS&apos;s</a> and <a href="https://policies.google.com/privacy" rel="noopener">Google&apos;s</a> policies for the current terms.</p>
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
