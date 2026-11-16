import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SA_DIVE } from "@/data/country-sa";

export const metadata: Metadata = pageMeta({ title: SA_DIVE.title, description: SA_DIVE.description, path: "/countries/sa/" });

export default function SaudiArabiaPage() {
  return <CountryDeepDive dive={SA_DIVE} />;
}
