import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { DISCUSSIONS_URL, issueUrl, REPO, type IssueTemplate } from "@/lib/issue-links";

export const metadata: Metadata = pageMeta({ title: "Suggest an edit", description: "How anyone, including the organisations described, can correct or extend an OnCo record: one gate, an issue form with a source, reviewed and validated before it goes live.", path: "/suggest/" });

const FORMS: Array<{ t: IssueTemplate; label: string; when: string; title: string }> = [
  { t: "suggest-edit", label: "Suggest an edit", when: "A field on a record is wrong or missing and you have a source.", title: "edit: " },
  { t: "fact-correction", label: "Fact correction", when: "Text on a page states something false; quote it and say what it should say.", title: "correction: " },
  { t: "stale-fact", label: "Stale fact", when: "It was true, and events have overtaken it (a readout, a withdrawal, a new guideline).", title: "stale: " },
  { t: "trial-readout", label: "Trial readout", when: "A trial has reported, been updated or been stopped.", title: "readout: " },
  { t: "regional-approval", label: "Regional approval", when: "A product was approved, filed, rejected or withdrawn in a region we do not show.", title: "approval: " },
  { t: "new-object", label: "New object", when: "A cancer, product, target, trial, company, institution, person or idea is missing.", title: "add: " },
  { t: "translation-fix", label: "Translation fix", when: "A translated TL;DR is wrong or reads badly in your language.", title: "translation: " },
  { t: "translation-review", label: "Translation review", when: "You speak the language and want to sign off a batch of translations.", title: "translation review: " },
  { t: "review", label: "Review this page", when: "You are a clinician, scientist, regulatory specialist or patient advocate and have checked a page against its sources.", title: "review: " },
  { t: "accessibility", label: "Accessibility", when: "Something does not work with a screen reader, keyboard, zoom or high contrast.", title: "a11y: " },
  { t: "bug", label: "Bug report", when: "Something on the site is broken (not a factual error).", title: "bug: " },
];

export default function SuggestPage() {
  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Suggest an edit" lede="Every record has a form. Propose a change with a source, say who you are, declare any conflict, and it becomes a GitHub issue that a maintainer safety-checks, validates and turns into a merged edit. Organisations can update their own records the same way. Nothing on OnCo is edited directly." />
      <Container className="pb-16 max-w-3xl prose-onco text-[15px] leading-relaxed space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">One gate</h2>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li><strong>The form on any page.</strong> Open &ldquo;Suggest an edit&rdquo; in the sidebar, name the field, paste the proposed value and a source URL, add your name and a way to verify you. It opens a prefilled GitHub issue; you submit it with a free GitHub account.</li>
            <li><strong>No direct edits, by design.</strong> There is no link that edits a record in place, and pull requests that change data must reference a triaged issue. Every change passes through the same gate so it can be checked for sourcing, safety (no patient data, no medical advice, no promotional claims) and validity (the build fails on a bad id or a missing source) before anyone sees it. Contributors who can code say so in the issue and are pointed at the file.</li>
            <li><strong>Discussion is separate from change.</strong> Questions, interpretations and &ldquo;is anyone working on this&rdquo; belong in the <a href={DISCUSSIONS_URL} rel="noopener">Discussions</a> thread that the <em>Discuss</em> link on each page finds or starts. A discussion that ends in a fact becomes an issue.</li>
            <li><strong>Email is not a channel.</strong> Everything goes through the public issue tracker so the discussion and the source are visible.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Which form</h2>
          <p>The page&apos;s sidebar offers the forms that fit its kind; all of them are here.</p>
          <ul className="list-disc pl-5 space-y-1.5">
            {FORMS.map((f) => <li key={f.t}><a href={issueUrl(f.t, {}, { title: f.title })} rel="noopener"><strong>{f.label}</strong></a>: {f.when}</li>)}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">For companies and institutions</h2>
          <p>You may update your own record: website, headquarters, products and their stage, programmes, links. Facts only; no promotional language, no unsourced superlatives, no removing negative trials or withdrawals (those belong in the record and in the <Link href="/failures/">Failure museum</Link>). Identity is verified by a message from your official domain or an official account. The merged record names your organisation in its provenance line so readers know who wrote it.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">What happens next</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Triage within a week. If a source is missing we ask for one; unsourced changes are not merged.</li>
            <li>The issue is assigned a review track (clinical, scientific, regulatory, patient advocate, organisation self-edit). Tracks are listed in <a href={`${REPO}/blob/main/.github/REVIEWERS.md`} rel="noopener">REVIEWERS.md</a>; the pages most in need of review are at <Link href="/review/">/review/</Link>.</li>
            <li>A maintainer makes the edit, runs the checks, and merges. Merged changes appear on the site at the next deploy, in the <Link href="/changelog/">changelog</Link> and in the <Link href="/newsletter/">weekly issue</Link>. Factual corrections are also logged in <code>CORRECTIONS.md</code>.</li>
            <li>Conflicts of interest are displayed next to review badges and in provenance lines. Contributors are credited at <Link href="/contributors/">/contributors/</Link>.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Licence</h2>
          <p>Contributions are published as part of the OnCo corpus under CC BY-NC 4.0 (data, free for non-commercial use, commercial use licensed by OnCo) and MIT (code). Submitting the form confirms you agree.</p>
        </section>
      </Container>
    </>
  );
}
