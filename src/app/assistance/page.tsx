import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { AssistanceBrowser, type AccessRow, type PatientOrg } from "@/components/AssistanceBrowser";
import { assistanceSchemes } from "@/data/assistance-schemes";

export const metadata: Metadata = pageMeta({ title: "Financial help and assistance navigator", description: "Every manufacturer assistance programme, reimbursement decision and generic recorded for cancer products, by country and product, with national schemes and patient organisations that help pay. Print a one-page list.", path: "/assistance/" });

export default function AssistancePage() {
  const g = graph();
  const rows: AccessRow[] = g.kind("drug").filter((d) => d.access.length).flatMap((d) => d.access.map((a) => ({
    drugId: d.id, drug: d.name, route: routeFor(d), modality: d.modality, country: a.country,
    listPrice: a.listPrice, reimbursement: a.reimbursement, assistance: a.assistance, generic: a.generic, source: a.source, asOf: a.asOf,
  })));
  const orgs: PatientOrg[] = g.kind("collection").filter((c) => c.tags.includes("patient-org")).map((c) => ({ id: c.id, name: c.name, tldr: c.tldr, route: routeFor(c), url: c.url }));
  const products = new Set(rows.map((r) => r.drugId)).size;

  return (
    <>
      <PageHeader kicker={<GroupKicker id="live" />} title="Financial help and assistance navigator"
        lede={`Where the money can come from. OnCo records access and cost information on ${products} products: manufacturer assistance programmes, reimbursement decisions and whether a generic exists, country by country. This page gathers all of it in one place, adds the national schemes and charities that pay for care or living costs in each country, and the patient organisations that run copay and travel funds. Filter to your country and your treatments, then print the list.`} />
      <Container className="pb-16">
        <AssistanceBrowser rows={rows} schemes={assistanceSchemes} orgs={orgs} />
      </Container>
    </>
  );
}
