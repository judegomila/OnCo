import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { EC_DIVE } from "@/data/country-ec";

export const metadata: Metadata = pageMeta({ title: EC_DIVE.title, description: EC_DIVE.description, path: "/countries/ec/" });

export default function EcuadorPage() {
  return <CountryDeepDive dive={EC_DIVE} />;
}
