import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CD_DIVE } from "@/data/country-cd";

export const metadata: Metadata = pageMeta({ title: CD_DIVE.title, description: CD_DIVE.description, path: "/countries/cd/" });

export default function DrCongoPage() {
  return <CountryDeepDive dive={CD_DIVE} />;
}
