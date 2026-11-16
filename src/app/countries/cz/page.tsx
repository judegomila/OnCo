import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CZ_DIVE } from "@/data/country-cz";

export const metadata: Metadata = pageMeta({ title: CZ_DIVE.title, description: CZ_DIVE.description, path: "/countries/cz/" });

export default function CzechiaPage() {
  return <CountryDeepDive dive={CZ_DIVE} />;
}
