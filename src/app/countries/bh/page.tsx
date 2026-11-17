import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BH_DIVE } from "@/data/country-bh";

export const metadata: Metadata = pageMeta({ title: BH_DIVE.title, description: BH_DIVE.description, path: "/countries/bh/" });

export default function BahrainPage() {
  return <CountryDeepDive dive={BH_DIVE} />;
}
