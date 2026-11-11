import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MW_DIVE } from "@/data/country-mw";

export const metadata: Metadata = pageMeta({ title: MW_DIVE.title, description: MW_DIVE.description, path: "/countries/mw/" });

export default function MalawiPage() {
  return <CountryDeepDive dive={MW_DIVE} />;
}
