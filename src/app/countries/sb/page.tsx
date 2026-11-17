import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SB_DIVE } from "@/data/country-sb";

export const metadata: Metadata = pageMeta({ title: SB_DIVE.title, description: SB_DIVE.description, path: "/countries/sb/" });

export default function SolomonIslandsPage() {
  return <CountryDeepDive dive={SB_DIVE} />;
}
