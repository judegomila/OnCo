import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BI_DIVE } from "@/data/country-bi";

export const metadata: Metadata = pageMeta({ title: BI_DIVE.title, description: BI_DIVE.description, path: "/countries/bi/" });

export default function BurundiPage() {
  return <CountryDeepDive dive={BI_DIVE} />;
}
