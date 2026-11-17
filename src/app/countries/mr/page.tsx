import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MR_DIVE } from "@/data/country-mr";

export const metadata: Metadata = pageMeta({ title: MR_DIVE.title, description: MR_DIVE.description, path: "/countries/mr/" });

export default function MauritaniaPage() {
  return <CountryDeepDive dive={MR_DIVE} />;
}
