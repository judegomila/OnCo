import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { WebPageJsonLd } from "@/components/JsonLd";
import { buildDate, ISSUES_URL, LegalMeta, LegalSection, LegalToc, Placeholder, REPO_URL, Term, type LegalSectionDef } from "@/components/LegalPage";

/**
 * Terms of use. Lives at /terms-of-use/ because /terms/ is the glossary (kind "term"). Every statement about the
 * service is taken from the code: static export on Vercel, sign-in through WorkOS in the browser (src/lib/account.ts),
 * choices kept in localStorage (src/lib/profile.ts), licences as in LICENSE and LICENSE-DATA.
 */
const TITLE = "Terms of use";
const DESCRIPTION = "The rules for using OnCo in plain words: an information resource, not medical advice; accuracy not guaranteed; accounts, licences, external links, liability, changes and how to contact us.";
export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/terms-of-use/" });

const SECTIONS: readonly LegalSectionDef[] = [
  { id: "purpose", title: "What OnCo is for", icon: "compass" },
  { id: "not-medical-advice", title: "Not medical advice", icon: "stethoscope" },
  { id: "accuracy", title: "Accuracy and completeness", icon: "check" },
  { id: "your-responsibilities", title: "Your responsibilities", icon: "user" },
  { id: "accounts", title: "Accounts", icon: "key" },
  { id: "licences", title: "Licences, copyright and trademarks", icon: "book" },
  { id: "external-links", title: "External links and third-party services", icon: "link" },
  { id: "liability", title: "No warranty and limitation of liability", icon: "shield" },
  { id: "changes", title: "Changes to these terms", icon: "refresh" },
  { id: "governing-law", title: "Governing law", icon: "scale" },
  { id: "contact", title: "Contact", icon: "mail" },
];
const S = Object.fromEntries(SECTIONS.map((s, i) => [s.id, { def: s, index: i + 1 }])) as Record<string, { def: LegalSectionDef; index: number }>;

export default function TermsOfUsePage() {
  const date = buildDate();
  return (
    <>
      <WebPageJsonLd path="/terms-of-use/" name={`${TITLE} · OnCo`} description={DESCRIPTION} dateModified={date.iso} />
      <PageHeader
        kicker={<GroupKicker id="learn"><span className="kicker">·</span><Link href="/privacy/" className="kicker hover:underline">Privacy policy</Link><span className="kicker">·</span><Link href="/about/" className="kicker hover:underline">About and methodology</Link></GroupKicker>}
        title={TITLE}
        lede="The rules for using OnCo, written in plain words. They apply to onco.cc and to everything it publishes: the website, the API, the feeds, the downloads and the text files for language models. By using them you agree to these terms; if you do not agree, please do not use the site."
        right={<Link href="/privacy/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:border-accent/50 hover:text-accent">Privacy policy →</Link>}
      />
      <Container className="pb-16 prose-onco text-[15px] leading-relaxed max-w-3xl space-y-10">
        <LegalToc sections={SECTIONS} />
        <LegalMeta date={date} siblings={[{ href: "/privacy/", label: "Privacy policy" }, { href: `${REPO_URL}/commits/main/src/app/terms-of-use/page.tsx`, label: "History of this page" }]} />

        <LegalSection {...S.purpose}>
          <p>OnCo is a public, cited map of oncology: cancers, treatments, targets, trials, companies, institutions, people, pathways and ideas, one page each, built in the open and linked to primary sources. It exists so that a patient, a carer, a clinician, a researcher, an investor or a policymaker can see the current state of the art, the history and what is coming for any cancer, and follow the links to check it for themselves.</p>
          <p>The site is run by OnCo (<Placeholder>[legal entity and address]</Placeholder>). The code and the data are published at <a href={REPO_URL} rel="noopener">{REPO_URL.replace("https://", "")}</a>, so you can read how every page is made. How the site is built and its rules for facts are on the <Link href="/about/">About page</Link>.</p>
        </LegalSection>

        <LegalSection {...S["not-medical-advice"]}>
          <p><strong>OnCo is an information resource. It is not medical advice, diagnosis or treatment, and it does not know your case.</strong> Nothing here replaces a conversation with a qualified clinician who knows your history, your test results and your wishes. Using the site does not create a doctor and patient relationship, or any other professional relationship, between you and OnCo or anyone who contributes to it.</p>
          <p>Never delay, stop or change care because of something you read here. If you think you have an emergency, call your local emergency services or go to the nearest emergency department.</p>
          <p>Dose figures, regimens, calculators, staging tools, side-effect guides, appointment preparation sheets and trial matching on this site are reference material for a discussion with your care team. They are not instructions, and they cannot take account of your kidneys, your liver, your other medicines or anything else about you.</p>
        </LegalSection>

        <LegalSection {...S.accuracy}>
          <p>Content is built and checked in the open, mostly from public sources, and much of it has not yet been reviewed by a named expert; pages that have been reviewed carry a badge naming the reviewer and the date. Facts may be incomplete, out of date or wrong. Oncology changes weekly: trial results, approvals, labels and guidelines move faster than any single page.</p>
          <p>We do not guarantee accuracy, completeness or currency. Verify anything that matters to you at the primary source linked from the page (the publication, the label, the registry, the regulator or the guideline). If you find an error, use <em>Suggest an edit</em> on the page or open a <a href={`${REPO_URL}/issues/new/choose`} rel="noopener">fact correction</a>; confirmed errors are logged at <Link href="/corrections/">Corrections</Link>.</p>
        </LegalSection>

        <LegalSection {...S["your-responsibilities"]}>
          <p>When you use OnCo you agree to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>use the site and its data lawfully and in line with the licences below;</li>
            <li>fetch data through the <Link href="/api/">open API and downloads</Link> rather than crawling the pages at a rate that harms the service for others;</li>
            <li>not present OnCo content as medical advice, or as endorsed by OnCo, and keep the attribution when you reuse the data;</li>
            <li>not attempt to break the sign-in, to access another person&apos;s account, or to interfere with the site or the services it uses;</li>
            <li>not submit content you have no right to share, including any other person&apos;s health information, whether through GitHub or any other route;</li>
            <li>follow the repository&apos;s <a href={`${REPO_URL}/blob/main/CODE_OF_CONDUCT.md`} rel="noopener">code of conduct</a> and <a href={`${REPO_URL}/blob/main/CONTRIBUTING.md`} rel="noopener">contribution guide</a> when you propose changes. Contributions accepted into the corpus are licensed to OnCo on the same terms as the rest of the data.</li>
          </ul>
        </LegalSection>

        <LegalSection {...S.accounts}>
          <p>Signing in is optional. When it is switched on, sign-in is handled by <a href="https://workos.com" rel="noopener">WorkOS</a> AuthKit: a code sent to your email, a password, Google or a <Term tip="A way to sign in built into your phone or computer, using its lock screen instead of a password.">passkey</Term>. Your browser talks to WorkOS directly; OnCo runs no server for it, and OnCo keeps your email address and the name you give, nothing else. What happens to that information is in the <Link href="/privacy/#accounts">privacy policy</Link>.</p>
          <p>Keep your sign-in details and your device safe. You are responsible for what is done under your account. The role and the cancer you choose after signing in stay in your browser and can be changed or cleared from the account menu at any time.</p>
          <p>We may suspend or remove an account that abuses the service or other people, that tries to break the site, or that we are required by law to remove. You can sign out at any time from the account menu. To have your account deleted, <a href="#contact">contact us</a>.</p>
        </LegalSection>

        <LegalSection {...S.licences}>
          <p><strong>Content.</strong> The OnCo corpus (the text, structure, curation and derived files under <code>src/data/</code>) is copyright OnCo and its contributors and is licensed under <a href="https://creativecommons.org/licenses/by-nc/4.0/" rel="noopener">Creative Commons Attribution-NonCommercial 4.0</a> (<Term tip="You may copy, share and adapt the material for non-commercial purposes as long as you credit the source. Commercial use needs a separate agreement.">CC BY-NC 4.0</Term>). It is free for individual, educational, academic, charitable and other non-profit use with the attribution “Data from OnCo (onco.cc)” and a link to <Link href="/">onco.cc</Link>. Commercial use, for example inside a paid product or service, advertising-funded redistribution or a company data pipeline, must contact us to pay for the data: ask through a <a href={`${REPO_URL}/issues/new?labels=licensing&title=Commercial+licence+request`} rel="noopener">licensing request</a>. The full terms are in <a href={`${REPO_URL}/blob/main/LICENSE-DATA`} rel="noopener">LICENSE-DATA</a>.</p>
          <p><strong>Code.</strong> The software that builds and serves the site is licensed under the <Term tip="A short permissive open-source licence: you may use, copy, change and redistribute the code, including commercially, as long as you keep the copyright and licence notice.">MIT licence</Term>, as stated in the repository&apos;s <a href={`${REPO_URL}/blob/main/LICENSE`} rel="noopener">LICENSE</a> file.</p>
          <p><strong>Third-party material.</strong> Facts are not copyrightable; the licence covers OnCo&apos;s selection, arrangement, wording and derived files. Logos, portraits and anything ingested from upstream sources keep their own licences, recorded per file in the repository and shown on the pages that display them. <Term tip="A name, logo or sign that identifies a company's goods or services and belongs to that company.">Trademarks</Term> belong to their owners. Drug, product, trial, company and institution names are used descriptively, to identify the thing being written about; their use implies no affiliation with, sponsorship by or endorsement from the owner.</p>
        </LegalSection>

        <LegalSection {...S["external-links"]}>
          <p>Pages link out to publications, registries, regulators, company and hospital websites, Wikipedia and other sources, and some tools query <a href="https://clinicaltrials.gov" rel="noopener">ClinicalTrials.gov</a>, <a href="https://europepmc.org" rel="noopener">Europe PMC</a> and <a href="https://www.openstreetmap.org" rel="noopener">OpenStreetMap</a> live from your browser. We do not control those sites or services, a link is not an endorsement, and we are not responsible for their content or availability. Their own terms and privacy policies apply when you use them.</p>
        </LegalSection>

        <LegalSection {...S.liability}>
          <p>OnCo is provided free of charge, <Term tip="You take the site as you find it. We make no promises about its quality or that it will suit your purpose.">“as is”</Term> and “as available”, without any <Term tip="A promise about quality or performance. We make none here, whether written down or implied by law.">warranty</Term>, express or implied, including any warranty of accuracy, completeness, currency, fitness for a particular purpose, non-infringement or uninterrupted availability.</p>
          <p>To the fullest extent permitted by law, OnCo, its maintainers and its contributors are not <Term tip="Legally responsible for paying for a loss.">liable</Term> for any loss or damage, direct or indirect, arising from your use of, or inability to use, the site or its content, including decisions made in reliance on it. Nothing in these terms limits or excludes liability that cannot be limited or excluded by law, including for death or personal injury caused by negligence, or takes away rights you have as a consumer where you live.</p>
        </LegalSection>

        <LegalSection {...S.changes}>
          <p>We may change these terms as the site changes. The current version is always at this address; the date at the top of the page is when it was last built, and every earlier version is in the <a href={`${REPO_URL}/commits/main/src/app/terms-of-use/page.tsx`} rel="noopener">page&apos;s history</a> on GitHub. Continuing to use the site after a change means you accept the new terms.</p>
        </LegalSection>

        <LegalSection {...S["governing-law"]}>
          <p>These terms are governed by the law of <Placeholder>[jurisdiction]</Placeholder>, and the courts of <Placeholder>[jurisdiction]</Placeholder> have <Term tip="The authority of a court to hear a dispute.">jurisdiction</Term> over any dispute about them, without taking away any mandatory consumer protection you have under the law of the country where you live.</p>
        </LegalSection>

        <LegalSection {...S.contact}>
          <p>Questions, corrections, licensing and account requests: open an issue at <a href={ISSUES_URL} rel="noopener">{ISSUES_URL.replace("https://", "")}</a> or write to <Placeholder>[contact email]</Placeholder>. Security matters are covered in the repository&apos;s <a href={`${REPO_URL}/blob/main/SECURITY.md`} rel="noopener">security policy</a>.</p>
        </LegalSection>
      </Container>
    </>
  );
}
