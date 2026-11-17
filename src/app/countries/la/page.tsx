import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { LA_DIVE } from "@/data/country-la";

export const metadata: Metadata = pageMeta({ title: LA_DIVE.title, description: LA_DIVE.description, path: "/countries/la/" });

export default function LaosPage() {
  return <CountryDeepDive dive={LA_DIVE} />;
}
