import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BF_DIVE } from "@/data/country-bf";

export const metadata: Metadata = pageMeta({ title: BF_DIVE.title, description: BF_DIVE.description, path: "/countries/bf/" });

export default function BurkinaFasoPage() {
  return <CountryDeepDive dive={BF_DIVE} />;
}
