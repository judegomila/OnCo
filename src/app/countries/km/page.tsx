import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { KM_DIVE } from "@/data/country-km";

export const metadata: Metadata = pageMeta({ title: KM_DIVE.title, description: KM_DIVE.description, path: "/countries/km/" });

export default function ComorosPage() {
  return <CountryDeepDive dive={KM_DIVE} />;
}
