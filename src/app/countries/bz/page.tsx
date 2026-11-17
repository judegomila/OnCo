import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BZ_DIVE } from "@/data/country-bz";

export const metadata: Metadata = pageMeta({ title: BZ_DIVE.title, description: BZ_DIVE.description, path: "/countries/bz/" });

export default function BelizePage() {
  return <CountryDeepDive dive={BZ_DIVE} />;
}
