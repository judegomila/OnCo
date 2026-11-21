import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BN_DIVE } from "@/data/country-bn";

export const metadata: Metadata = pageMeta({ title: BN_DIVE.title, description: BN_DIVE.description, path: "/countries/bn/" });

export default function BruneiPage() {
  return <CountryDeepDive dive={BN_DIVE} />;
}
