import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SV_DIVE } from "@/data/country-sv";

export const metadata: Metadata = pageMeta({ title: SV_DIVE.title, description: SV_DIVE.description, path: "/countries/sv/" });

export default function ElSalvadorPage() {
  return <CountryDeepDive dive={SV_DIVE} />;
}
