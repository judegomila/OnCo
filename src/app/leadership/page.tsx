import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { trialLeadership } from "@/lib/trial-leadership";
import { TrialLeadership } from "@/components/TrialLeadership";
import { Container, GroupKicker, PageHeader } from "@/components/ui";

export const metadata: Metadata = pageMeta({ title: "Trial leadership", description: "Which institutions and cooperative groups are attached to the pivotal trials, products, and technologies in OnCo.", path: "/leadership/" });

export default function Leadership() {
  const rows = trialLeadership();
  return (
    <>
      <PageHeader kicker={<GroupKicker id="who" />} title="Trial leadership"
        lede="Publication counts reward volume. This index rewards presence in the evidence that changed practice: the trials, products, and technologies recorded in OnCo that an institution or cooperative group is linked to. It is disclosed, simple, and only as complete as the corpus."
        right={<div className="flex gap-2"><Link href="/institutions/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">Map & ranking</Link><Link href="/universities/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">Research output</Link></div>} />
      <Container className="pb-16">
        <div className="card p-4 mb-6 text-sm text-muted">
          score = 3 × linked trials + 2 × linked products + linked technologies + linked targets, counting distinct OnCo objects connected in either direction. Cooperative groups (SWOG, NRG, Alliance, BIG…) are included because they, not single hospitals, run most academic phase 3 trials. To move an institution up, document the trial it led and link it.
        </div>
        <TrialLeadership rows={rows} />
      </Container>
    </>
  );
}
