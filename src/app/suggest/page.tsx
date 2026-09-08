import type { Metadata } from "next";
import Link from "next/link";
import { Container, GroupKicker, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Suggest an edit", description: "How anyone, including the organisations described, can correct or extend an OnCo record." };

export default function SuggestPage() {
  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Suggest an edit" lede="Every record has a form. Propose a change with a source, say who you are, declare any conflict, and it becomes a GitHub issue a maintainer can turn into a merged edit. Organisations can update their own records the same way." />
      <Container className="pb-16 max-w-3xl prose-onco text-[15px] leading-relaxed space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">Three ways in</h2>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li><strong>The form on any page.</strong> Open “Suggest an edit” in the sidebar, choose the field, paste the proposed value and a source URL, add your name and a way to verify you. It opens a prefilled GitHub issue; you submit it with a free GitHub account.</li>
            <li><strong>Edit the record directly.</strong> The same box links to the exact line in the repository. GitHub will fork and open a pull request for you. Run <code>npm test</code> if you can; the build fails on a bad id or a missing source.</li>
            <li><strong>Email is not a channel.</strong> Everything goes through the public issue tracker so the discussion and the source are visible.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">For companies and institutions</h2>
          <p>You may update your own record: website, headquarters, products and their stage, programmes, links. Facts only; no promotional language, no unsourced superlatives, no removing negative trials or withdrawals (those belong in the record and in the <Link href="/failures/">Failure museum</Link>). Identity is verified by a message from your official domain or an official account. The merged record names your organisation in its provenance line so readers know who wrote it.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">What happens next</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Triage within a week. If a source is missing we ask for one; unsourced changes are not merged.</li>
            <li>The issue is assigned a review track (clinical, scientific, regulatory, patient advocate, organisation self-edit). Tracks are listed in <a href="https://github.com/judegomila/OnCo/blob/main/.github/REVIEWERS.md" rel="noopener">REVIEWERS.md</a>.</li>
            <li>Merged changes appear on the site at the next deploy and in the <Link href="/changelog/">changelog</Link>. Factual corrections are also logged in <code>CORRECTIONS.md</code>.</li>
            <li>Conflicts of interest are displayed next to review badges and in provenance lines.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Licence</h2>
          <p>Contributions are published under CC BY 4.0 (data) and MIT (code). Submitting the form confirms you agree.</p>
        </section>
      </Container>
    </>
  );
}
