import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CF_DIVE } from "@/data/country-cf";

export const metadata: Metadata = pageMeta({ title: CF_DIVE.title, description: CF_DIVE.description, path: "/countries/cf/" });

export default function CentralAfricanRepublicPage() {
  return <CountryDeepDive dive={CF_DIVE} />;
}
