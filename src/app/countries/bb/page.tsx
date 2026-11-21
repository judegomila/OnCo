import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BB_DIVE } from "@/data/country-bb";

export const metadata: Metadata = pageMeta({ title: BB_DIVE.title, description: BB_DIVE.description, path: "/countries/bb/" });

export default function BarbadosPage() {
  return <CountryDeepDive dive={BB_DIVE} />;
}
