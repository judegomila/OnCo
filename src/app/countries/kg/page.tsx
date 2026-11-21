import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { KG_DIVE } from "@/data/country-kg";

export const metadata: Metadata = pageMeta({ title: KG_DIVE.title, description: KG_DIVE.description, path: "/countries/kg/" });

export default function KyrgyzstanPage() {
  return <CountryDeepDive dive={KG_DIVE} />;
}
