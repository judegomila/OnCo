import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SG_DIVE } from "@/data/country-sg";

export const metadata: Metadata = pageMeta({ title: SG_DIVE.title, description: SG_DIVE.description, path: "/countries/sg/" });

export default function SingaporePage() {
  return <CountryDeepDive dive={SG_DIVE} />;
}
