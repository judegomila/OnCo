import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { PF_DIVE } from "@/data/country-pf";

export const metadata: Metadata = pageMeta({ title: PF_DIVE.title, description: PF_DIVE.description, path: "/countries/pf/" });

export default function FrenchPolynesiaPage() {
  return <CountryDeepDive dive={PF_DIVE} />;
}
