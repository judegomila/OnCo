import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CY_DIVE } from "@/data/country-cy";

export const metadata: Metadata = pageMeta({ title: CY_DIVE.title, description: CY_DIVE.description, path: "/countries/cy/" });

export default function CyprusPage() {
  return <CountryDeepDive dive={CY_DIVE} />;
}
