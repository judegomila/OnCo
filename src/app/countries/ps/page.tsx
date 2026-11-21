import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { PS_DIVE } from "@/data/country-ps";

export const metadata: Metadata = pageMeta({ title: PS_DIVE.title, description: PS_DIVE.description, path: "/countries/ps/" });

export default function GazaStripAndWestBankPage() {
  return <CountryDeepDive dive={PS_DIVE} />;
}
