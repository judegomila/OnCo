import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { DK_DIVE } from "@/data/country-dk";

export const metadata: Metadata = pageMeta({ title: DK_DIVE.title, description: DK_DIVE.description, path: "/countries/dk/" });

export default function DenmarkPage() {
  return <CountryDeepDive dive={DK_DIVE} />;
}
