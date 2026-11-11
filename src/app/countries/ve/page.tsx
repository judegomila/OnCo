import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { VE_DIVE } from "@/data/country-ve";

export const metadata: Metadata = pageMeta({ title: VE_DIVE.title, description: VE_DIVE.description, path: "/countries/ve/" });

export default function VenezuelaPage() {
  return <CountryDeepDive dive={VE_DIVE} />;
}
