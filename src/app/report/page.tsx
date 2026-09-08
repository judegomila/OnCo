import type { Metadata } from "next";
import Link from "next/link";
import { Container, GroupKicker, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Annual reports", description: "The state of the war on cancer, year by year, generated from the OnCo corpus." };

/** Index of annual reports. Add a folder per year under /report/. */
const YEARS = [2026];

export default function Reports() {
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="The state of the war on cancer" lede="One report per year, generated from the corpus: approvals, trial results, roadmap progress, open problems, and a short narrative. Earlier years are added as the corpus grows backwards." />
      <Container className="pb-16">
        <ul className="grid gap-3 sm:grid-cols-3">
          {YEARS.map((y) => <li key={y}><Link href={`/report/${y}/`} className="card p-5 block hover:shadow-md transition"><div className="text-3xl font-semibold tabular-nums">{y}</div><div className="text-sm text-muted mt-1">Read the {y} report →</div></Link></li>)}
        </ul>
      </Container>
    </>
  );
}
