import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { HU_DIVE } from "@/data/country-hu";

export const metadata: Metadata = pageMeta({ title: HU_DIVE.title, description: HU_DIVE.description, path: "/countries/hu/" });

export default function HungaryPage() {
  return <CountryDeepDive dive={HU_DIVE} />;
}
