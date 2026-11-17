import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SR_DIVE } from "@/data/country-sr";

export const metadata: Metadata = pageMeta({ title: SR_DIVE.title, description: SR_DIVE.description, path: "/countries/sr/" });

export default function SurinamePage() {
  return <CountryDeepDive dive={SR_DIVE} />;
}
