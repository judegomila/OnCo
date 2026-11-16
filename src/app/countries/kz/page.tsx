import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { KZ_DIVE } from "@/data/country-kz";

export const metadata: Metadata = pageMeta({ title: KZ_DIVE.title, description: KZ_DIVE.description, path: "/countries/kz/" });

export default function KazakhstanPage() {
  return <CountryDeepDive dive={KZ_DIVE} />;
}
