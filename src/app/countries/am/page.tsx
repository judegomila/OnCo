import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { AM_DIVE } from "@/data/country-am";

export const metadata: Metadata = pageMeta({ title: AM_DIVE.title, description: AM_DIVE.description, path: "/countries/am/" });

export default function ArmeniaPage() {
  return <CountryDeepDive dive={AM_DIVE} />;
}
