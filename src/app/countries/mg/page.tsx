import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MG_DIVE } from "@/data/country-mg";

export const metadata: Metadata = pageMeta({ title: MG_DIVE.title, description: MG_DIVE.description, path: "/countries/mg/" });

export default function MadagascarPage() {
  return <CountryDeepDive dive={MG_DIVE} />;
}
