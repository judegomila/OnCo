import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MZ_DIVE } from "@/data/country-mz";

export const metadata: Metadata = pageMeta({ title: MZ_DIVE.title, description: MZ_DIVE.description, path: "/countries/mz/" });

export default function MozambiquePage() {
  return <CountryDeepDive dive={MZ_DIVE} />;
}
