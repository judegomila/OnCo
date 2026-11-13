import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CR_DIVE } from "@/data/country-cr";

export const metadata: Metadata = pageMeta({ title: CR_DIVE.title, description: CR_DIVE.description, path: "/countries/cr/" });

export default function CostaRicaPage() {
  return <CountryDeepDive dive={CR_DIVE} />;
}
